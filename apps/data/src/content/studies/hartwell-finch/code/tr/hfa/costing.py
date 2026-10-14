"""
file: hfa/costing.py
importable: build_costing, RM_FY

Ürün birim maliyetini mali yıl bazında hesaplar, dim_item_cost tablosuna yazar.
BC'deki standart maliyetler Mayıs 2023'ten beri güncellenmediği için
kullanılmaz, maliyet sıfırdan kurulur:

    malzeme   BOM miktarı x (1 + fire) x o yılın ortalama hammadde alış fiyatı
    dönüşüm   Operasyon müdürünün tip bazındaki standart işçilik saati x o yılın saat maliyeti

İki bileşen her yıl kalibre edilir. Satılan ve yeniden üretilen birimlerin
teorik malzeme toplamı MA'daki 5000 Materials satırına, standart saat toplamı
5100 ve 5200 satırlarının toplamına eşitlenir. Kalibrasyon katsayısı k_mat
teorik ile gerçek tüketim arasındaki farkı, fire, verim kaybı ve stok
değişimi, gösterir ve kendisi bir göstergedir.

description: Hammadde fiyatları, BOM ve standart saatlerden MA'ya kalibre edilmiş ürün maliyeti.
"""

# NOTE: MA'daki Materials satırı stok değişimi düzeltmesi olmadan doğrudan alış
# faturalarının toplamı. Yıllık bazda stok seviyesi sabit kaldığı için, sayımlarda
# bitmiş ürün 1.150 ile 1.420 adet arası, kalibrasyon bunu kabul edilebilir
# hatayla taşır. Aylık bazda bu yaklaşım kullanılamaz.
#
# NOTE: FY24'ün ilk üç ayında, Temmuz 2023 öncesi, BC üretim emri yok. O
# dönemin yeniden üretim adedi Temmuz 2023 - Mart 2024 oranıyla tahmin edilir.
#
# TODO: Cila, boya ve sarf malzemesi BOM'da yok, k_mat içinde kalıyor. BOM'a
# eklenince kalibrasyon katsayısı bire yaklaşmalı.

import sqlite3

import openpyxl
import pandas as pd

from .db import JOB, fy, write_df

VELVET_RM = ["RM-FAB-VE", "RM-FAB-VN", "RM-FAB-VO", "RM-FAB-VR"]
RM_FY: pd.DataFrame | None = None


def _rm_prices(con, fx) -> pd.DataFrame:
    sg = pd.read_csv(JOB / "01_server_backup/sage200_legacy_export/POP_Invoice_Lines_2021-2023.csv", encoding="cp1252")
    sg["date"] = pd.to_datetime(sg["InvoiceDate"], dayfirst=True).dt.strftime("%Y-%m-%d")
    sg["cur"] = sg["Currency"].map({"£": "GBP", "€": "EUR", "$": "USD"})
    sg["gbp"] = fx.gbp(sg["LineTotal"], sg["date"].str[:7], sg["cur"])
    a = sg.rename(columns={"ItemCode": "rm", "Qty": "qty", "SupplierName": "supplier"})[["date", "rm", "qty", "gbp", "supplier"]]
    bc = pd.read_sql("""select h.posting_date date, l.no rm, l.quantity qty, l.amount/case when h.currency_factor>0
                        then h.currency_factor else 1 end gbp, h.pay_to_name supplier
                        from raw_bc_purch_inv_header h join raw_bc_purch_inv_line l on l.document_no=h.no where l.type=2""", con)
    p = pd.concat([a, bc], ignore_index=True)
    p["fy"] = fy(p["date"])
    write_df(con, "fact_rm_purchase", p)
    return p


def _std_hours() -> pd.Series:
    ws = openpyxl.load_workbook(JOB / "05_production/BOM master DR Nov24.xlsx", data_only=True).worksheets[0]
    rows = list(ws.iter_rows(values_only=True))[3:]
    return pd.DataFrame([dict(type_code=r[0], std_hrs=r[7], act_hrs_2024=r[8], oak_erp=r[2], oak_act=r[3],
                              fab_erp=r[4], fab_act=r[5], note=r[9]) for r in rows if r[0]]).set_index("type_code")


def build_costing(con: sqlite3.Connection, fx, log) -> pd.DataFrame:
    """dim_item_cost ve an_cost_calibration tablolarını kurar.

    Returns:
        item_no, fy, mat_theory, mat_cost, conv_cost, unit_cost kolonlu tablo.
    """
    global RM_FY
    p = _rm_prices(con, fx)
    price = p.groupby(["rm", "fy"]).apply(lambda d: d.gbp.sum() / d.qty.sum()).rename("gbp_per_unit").reset_index()
    RM_FY = price
    write_df(con, "an_rm_price", price)

    bom = pd.read_sql("select production_bom_no item_no, no rm, quantity_per q, scrap from raw_bc_production_bom_line", con)
    bom["q_eff"] = bom.q * (1 + bom.scrap / 100)
    items = pd.read_sql("select item_no, type_code, is_velvet, category from dim_item", con)
    nobom = set(items.item_no) - set(bom.item_no)
    if nobom:
        log("BC Production BOM", "Item without a production BOM", len(nobom), ", ".join(sorted(nobom)[:6]), action="no cost computed")
    hrs = _std_hours()
    write_df(con, "an_bom_master_dr", hrs.reset_index())

    fys = sorted(set(price.fy) & {2022, 2023, 2024, 2025, 2026})
    rows = []
    for y in fys:
        pr = price[price.fy == y].set_index("rm")["gbp_per_unit"]
        b = bom.assign(px=bom.rm.map(pr))
        theo = (b.q_eff * b.px).groupby(b.item_no).sum()
        oak = (b.q_eff * b.px).where(b.rm.str.startswith("RM-OAK")).groupby(b.item_no).sum()
        fab = (b.q_eff * b.px).where(b.rm.str.startswith("RM-FAB")).groupby(b.item_no).sum()
        for it, v in theo.items():
            rows.append(dict(item_no=it, fy=y, mat_theory=v, oak_theory=oak.get(it, 0.0), fabric_theory=fab.get(it, 0.0)))
    cost = pd.DataFrame(rows).merge(items, on="item_no", how="left")
    cost["std_hrs"] = cost.type_code.map(hrs["std_hrs"])

    # Kalibrasyon: satılan adet ve yeniden üretilen adet
    sold = pd.read_sql("""select fy, item_no, sum(qty) q from fact_sales where doc_type='INV' and item_no is not null group by 1,2""", con)
    repl = pd.read_sql("""select fy, item_no, sum(quantity) q from fact_production where order_type in ('REPLACEMENT','REWORK') group by 1,2""", con)
    # FY24'ün BC öncesi üç ayı için ölçekleme
    repl.loc[repl.fy == 2024, "q"] *= 12 / 9
    ma = pd.read_sql("select fy, code, sum(value) v from ma_pl where code in ('5000','5100','5200') group by 1,2", con)
    ma = ma.pivot(index="fy", columns="code", values="v")
    cal = []
    for y in fys:
        if y not in ma.index:
            continue
        c = cost[cost.fy == y].set_index("item_no")
        u = sold[sold.fy == y].set_index("item_no")["q"].add(repl[repl.fy == y].set_index("item_no")["q"], fill_value=0)
        u = u[u.index.isin(c.index)]
        mat = (u * c.mat_theory.reindex(u.index)).sum()
        hr = (u * c.std_hrs.reindex(u.index)).sum()
        months = 3 if y == 2026 else 12
        cal.append(dict(fy=y, months=months, units=u.sum(), mat_theory=mat, ma_materials=ma.loc[y, "5000"],
                        k_mat=ma.loc[y, "5000"] / mat, std_hours=hr, ma_conversion=ma.loc[y, "5100"] + ma.loc[y, "5200"],
                        rate_per_std_hr=(ma.loc[y, "5100"] + ma.loc[y, "5200"]) / hr,
                        labour_per_std_hr=ma.loc[y, "5100"] / hr, overhead_per_std_hr=ma.loc[y, "5200"] / hr))
    cal = pd.DataFrame(cal)
    # Kısmi yılda, FY26 sadece üç ay, alışlar tüketimi temsil etmiyor, Haziran
    # alışı çok düşük. Malzeme katsayısı son tam yıldan alınır, aradaki fark
    # kanal P&L'de Production cost not absorbed satırına düşer.
    cal["k_mat_actual"] = cal["k_mat"]
    last_full = cal[cal.months == 12].iloc[-1]
    cal.loc[cal.months < 12, "k_mat"] = last_full.k_mat
    write_df(con, "an_cost_calibration", cal)
    cost = cost.merge(cal[["fy", "k_mat", "rate_per_std_hr", "labour_per_std_hr"]], on="fy", how="left")
    cost["mat_cost"] = cost.mat_theory * cost.k_mat
    cost["conv_cost"] = cost.std_hrs * cost.rate_per_std_hr
    cost["unit_cost"] = cost.mat_cost + cost.conv_cost
    write_df(con, "dim_item_cost", cost)
    return cost
