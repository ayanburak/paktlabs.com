"""
file: run.py
importable: yok, doğrudan çalıştırılır

Pipeline'ı baştan sona çalıştırır: ham kaynakları yükler, ana tabloları ve
fact tablolarını kurar, analizleri hesaplar, teslim dosyalarını out/ altına
yazar. Her çalıştırma data/hf.sqlite dosyasını sıfırdan kurar.

    python run.py

description: Hartwell & Finch veri pipeline'ının tek giriş noktası.
"""

import time

from hfa import bc, channels, costing, costs, customers, excel, fx, items, ma, margin, pages, pricing, quality, sales
from hfa.db import DQ, JOB, connect, write_df


def main() -> None:
    t0 = time.time()
    con = connect(fresh=True)
    dq = DQ()

    print("1/ BC script-out yükleniyor")
    bc.load_bc(JOB / "01_server_backup/bc_script_out", con, dq)
    print("2/ ana tablolar: ürün, müşteri")
    item_df, canon = items.build_items(con, dq)
    cust, s2b = customers.build_customers(con, dq)
    print("3/ satışlar ve yönetim hesapları")
    sales.build_sales(con, canon, s2b, cust, dq)
    ma.load_ma(con, dq)
    ma.load_budget(con)
    rates = fx.build_fx(con, dq)
    print("4/ kanal verisi: Amazon, Wayfair, Shopify, eBay")
    channels.build_channels(con, canon, rates, dq)
    print("5/ lojistik, gümrük, dış hizmetler")
    cidx = customers.CustomerIndex(cust)
    costs.build_logistics(con, rates, cidx, cust, dq)
    costs.build_customs(con, rates, dq)
    costs.build_services(con, dq)
    print("6/ fiyat ve iskonto")
    pricing.build_pricing(con, canon, dq)
    print("7/ kalite, üretim, işçilik")
    quality.build_quality(con, canon, cidx, dq)
    print("8/ ürün maliyet modeli")
    costing.build_costing(con, rates, dq)
    print("9/ kanal P&L, marj köprüsü, karar etkileri")
    margin.build_margin(con, dq)

    log = dq.frame()
    write_df(con, "dq_log", log[log.rows_affected > 0])
    print("10/ teslim dosyaları: Excel, rapor, sunum, dashboard")
    for name in excel.build_workbooks(con) + pages.build_pages(con):
        print("   out/" + name)
    con.close()
    print(f"bitti, {time.time() - t0:.0f} sn")


if __name__ == "__main__":
    main()
