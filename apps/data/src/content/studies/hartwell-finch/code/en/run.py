"""
file: run.py
importable: none, run directly

Runs the pipeline end to end: loads the raw sources, builds the master and
fact tables, computes the analyses and writes the deliverables under out/.
Every run builds data/hf.sqlite from scratch.

    python run.py

description: Single entry point of the Hartwell & Finch data pipeline.
"""

import time

from hfa import bc, channels, costing, costs, customers, excel, fx, items, ma, margin, pages, pricing, quality, sales
from hfa.db import DQ, JOB, connect, write_df


def main() -> None:
    t0 = time.time()
    con = connect(fresh=True)
    dq = DQ()

    print("1/ loading the BC script-out")
    bc.load_bc(JOB / "01_server_backup/bc_script_out", con, dq)
    print("2/ master tables: items, customers")
    item_df, canon = items.build_items(con, dq)
    cust, s2b = customers.build_customers(con, dq)
    print("3/ sales and management accounts")
    sales.build_sales(con, canon, s2b, cust, dq)
    ma.load_ma(con, dq)
    ma.load_budget(con)
    rates = fx.build_fx(con, dq)
    print("4/ channel data: Amazon, Wayfair, Shopify, eBay")
    channels.build_channels(con, canon, rates, dq)
    print("5/ logistics, customs, outside services")
    cidx = customers.CustomerIndex(cust)
    costs.build_logistics(con, rates, cidx, cust, dq)
    costs.build_customs(con, rates, dq)
    costs.build_services(con, dq)
    print("6/ pricing and discounts")
    pricing.build_pricing(con, canon, dq)
    print("7/ quality, production, labour")
    quality.build_quality(con, canon, cidx, dq)
    print("8/ product cost model")
    costing.build_costing(con, rates, dq)
    print("9/ channel P&L, margin bridge, decision impacts")
    margin.build_margin(con, dq)

    log = dq.frame()
    write_df(con, "dq_log", log[log.rows_affected > 0])
    print("10/ deliverables: Excel, report, presentation, dashboard")
    for name in excel.build_workbooks(con) + pages.build_pages(con):
        print("   out/" + name)
    con.close()
    print(f"done, {time.time() - t0:.0f} s")


if __name__ == "__main__":
    main()
