"""
file: hfa/items.py
importable: build_items, Canon, TYPE_BY_NUM

Ürün ana tablosunu dim_item olarak kurar ve her kaynaktaki farklı yazılmış ürün
kodlarını tek bir BC koduna, HF-AAA-TTTT-FF biçimine, çeviren Canon sınıfını
sağlar. Canon şu biçimleri tanır:

    ASH01-LG            Sage eski kodu
    HF-ASH-SOF2-LG      BC kodu
    HF_ASH_SOF2_LG      Amazon ajansının alt çizgili hali
    HF-ASHBY-SOF2-LG    aile adının tamamı yazılmış hali
    ASH01-LG-AMZ        Amazon'a özel son ek
    ASHBY 2 SEATER SOFA - LINEN DOVE GREY   sadece açıklama varsa

description: Ürün ana tablosu ve kaynaklar arası ürün kodu eşleme kuralları.
"""

# NOTE: HF Item Mapping tablosu eksik ve içinde tutarsız satırlar var, örneğin
# 01 numaralı tip normalde 2 Seater Sofa iken bazı satırlarda yatak gibi
# eşlenmiş. Burada kural tabanlı eşleme esas alınır, tablo ile kural
# çeliştiğinde kural kazanır ve çelişki dq_log'a düşer. Kuralı doğrulayan şey
# Sage StockItems açıklamaları ile BC açıklamalarının birebir tutması.
#
# NOTE: Sage tarafında M kodu, ürün değil, elle girilmiş tutar satırı demektir,
# kredi notlarında kullanılır. Bunlar ürüne eşlenmez, kind=adjustment olur.

import re
import sqlite3

import pandas as pd

from .db import JOB, write_df

# Sage'deki iki haneli tip numarası ile BC'deki dört harfli tip kodu. Numara
# sırası Sage'in eski katalog sırasından geliyor, mapping tablosunun büyük
# çoğunluğu ve Sage açıklamaları bu sırayı doğruluyor.
TYPE_BY_NUM = {
    "01": "SOF2", "02": "SOF3", "03": "SOFC", "04": "ARMC", "05": "FTST", "06": "DCHR",
    "07": "BEDD", "08": "BEDK", "09": "BEDS", "10": "WRD2", "11": "WRD3", "12": "CHST",
    "13": "BSDT", "14": "DTB4", "15": "DTB6", "16": "DTB8", "17": "SDBD", "18": "COFT",
    "19": "TVUN", "20": "BKCS", "21": "DESK",
}
NUM_BY_TYPE = {v: k for k, v in TYPE_BY_NUM.items()}

VELVET = {"VE", "VN", "VO", "VR"}

# Kumaş ve kaplama kodlarını malzeme grubuna toplar. Velvet ayrı tutulur çünkü
# tedarikçi değişikliği sadece bu gruba dokunuyor.
FINISH_GROUP = {
    "VE": "Velvet", "VN": "Velvet", "VO": "Velvet", "VR": "Velvet",
    "LG": "Linen", "LO": "Linen", "BI": "Boucle", "LT": "Leather",
    "WC": "Weave", "WS": "Weave",
}


# Ürün açıklamasını ailesi, tipi ve kaplaması olarak üçe böler. Açıklamalar
# Aile Tip - Kaplama düzeninde, aile tek kelime.
def _split_desc(d: str) -> tuple[str, str, str]:
    left, _, fin = d.partition(" - ")
    fam, _, typ = left.strip().partition(" ")
    return fam.strip().title(), typ.strip(), fin.strip()


# Kaynaklardan gelen her kod biçimini BC koduna çevirir. Eşleme sözlükleri
# build_items içinde bir kez kurulur, sonra her kaynak loader'ı bunu kullanır.
class Canon:
    """Herhangi bir kaynaktaki ürün kodunu veya açıklamasını BC ürün koduna çevirir."""

    def __init__(self, items: pd.DataFrame) -> None:
        self.valid = set(items["item_no"])
        self.fam_by_name = {r.family_name.upper(): r.family for r in
                            items[["family", "family_name"]].drop_duplicates().itertuples()}
        self.by_desc = {self._key(d): i for d, i in zip(items["description"], items["item_no"])}

    @staticmethod
    def _key(desc: str) -> str:
        return re.sub(r"[^A-Z0-9]", "", str(desc).upper())

    def __call__(self, code, desc=None) -> str | None:
        """Kodu BC ürün koduna çevirir, çeviremezse açıklamaya bakar.

        Args:
            code: Kaynaktaki ürün kodu, boş olabilir.
            desc: Kaynaktaki ürün açıklaması, kod tanınmazsa yedek olarak kullanılır.

        Returns:
            Geçerli bir BC ürün kodu veya bulunamazsa None.
        """
        if code is not None and not (isinstance(code, float) and pd.isna(code)):
            c = str(code).strip().upper().replace("_", "-")
            c = re.sub(r"-AMZ$", "", c)
            m = re.fullmatch(r"([A-Z]{3})(\d{2})-([A-Z]{2})", c)
            if m and m.group(2) in TYPE_BY_NUM:
                c = f"HF-{m.group(1)}-{TYPE_BY_NUM[m.group(2)]}-{m.group(3)}"
            m = re.fullmatch(r"HF-([A-Z]{4,})-([A-Z0-9]{4})-([A-Z]{2})", c)
            if m and m.group(1) in self.fam_by_name:
                c = f"HF-{self.fam_by_name[m.group(1)]}-{m.group(2)}-{m.group(3)}"
            if c in self.valid:
                return c
        if desc is not None and not (isinstance(desc, float) and pd.isna(desc)):
            return self.by_desc.get(self._key(desc))
        return None


def build_items(con: sqlite3.Connection, log) -> tuple[pd.DataFrame, Canon]:
    """BC Item, Sage StockItems ve mapping tablosundan dim_item'ı kurar.

    Args:
        con: raw_bc_item ve raw_bc_hf_item_mapping tabloları yüklenmiş bağlantı.
        log: DQ kaydedici.

    Returns:
        dim_item tablosu ve bu tablo üzerinden kurulmuş Canon nesnesi.
    """
    bc = pd.read_sql("select * from raw_bc_item where no like 'HF-%'", con)
    parts = bc["description"].map(_split_desc)
    it = pd.DataFrame({
        "item_no": bc["no"],
        "description": bc["description"],
        "family": bc["no"].str[3:6],
        "family_name": [p[0] for p in parts],
        "type_code": bc["no"].str[7:11],
        "type_name": [p[1] for p in parts],
        "finish_code": bc["no"].str[-2:],
        "finish_name": [p[2] for p in parts],
        "category": bc["item_category_code"].replace("", "UNKNOWN"),
        "bc_unit_price": bc["unit_price"],
        "bc_std_cost": bc["standard_cost"],
        "weight_kg": bc["gross_weight"],
        "tariff": bc["tariff_no"],
        "blocked": bc["blocked"],
        "bc_legacy_code": bc["legacy_code"],
    })
    it["finish_group"] = it["finish_code"].map(FINISH_GROUP).fillna("Oak finish")
    it["is_velvet"] = it["finish_code"].isin(VELVET).astype(int)
    it["legacy_code"] = it["family"] + it["type_code"].map(NUM_BY_TYPE) + "-" + it["finish_code"]

    # Kategori boş olan birkaç ürün var, tip kodundan türetilir.
    cat_by_type = it[it.category != "UNKNOWN"].groupby("type_code")["category"].agg(lambda s: s.mode()[0])
    miss = it.category == "UNKNOWN"
    if miss.any():
        log("BC Item", "Item Category Code blank", miss.sum(), ", ".join(it.loc[miss, "item_no"]))
        it.loc[miss, "category"] = it.loc[miss, "type_code"].map(cat_by_type)

    # BC Legacy Code alanı ile kural çelişiyor mu
    filled = it[it.bc_legacy_code != ""]
    bad = filled[filled.bc_legacy_code != filled.legacy_code]
    log("BC Item", "Legacy Code field blank", (it.bc_legacy_code == "").sum(), "", action="filled from the code rule")
    if len(bad):
        log("BC Item", "Legacy Code field contradicts the code structure", len(bad),
            "; ".join(f"{a}->{b}" for a, b in zip(bad.item_no.head(5), bad.bc_legacy_code.head(5))), action="code rule used")

    # Mapping tablosu ile kural karşılaştırması
    mp = pd.read_sql("select * from raw_bc_hf_item_mapping", con)
    rule = mp["legacy_code"].map(lambda c: f"HF-{c[:3]}-{TYPE_BY_NUM.get(c[3:5], '????')}-{c[-2:]}")
    wrong = mp[rule != mp["item_no"]]
    log("BC HF Item Mapping", "Mapping contradicts the code structure (type number mapped to the wrong product)", len(wrong),
        "; ".join(f"{a}->{b}" for a, b in zip(wrong.legacy_code.head(6), wrong.item_no.head(6))), action="code rule used")
    log("BC HF Item Mapping", "Mapping table incomplete; covers only part of the range",
        len(it) - len(mp), f"{len(mp)} mappings / {len(it)} items", action="completed from the code rule")

    # Sage StockItems açıklamaları kuralı doğruluyor mu
    st = pd.read_csv(JOB / "01_server_backup/sage200_legacy_export/StockItems.csv", encoding="cp1252")
    st["item_no"] = st["Code"].map(lambda c: f"HF-{c[:3]}-{TYPE_BY_NUM.get(c[3:5], '????')}-{c[-2:]}")
    chk = st.merge(it[["item_no", "description"]], on="item_no", how="left")
    # Sage adı ASHBY 2 Seater Sofa Weave Charcoal veya BROMPTON King Size Bed Frame PC
    # gibi geliyor, kaplama kısmı tutarsız. Sadece aile ve tip kısmı karşılaştırılır.
    k = lambda s: s.fillna("").str.upper().str.replace(r"[^A-Z]", "", regex=True)
    head = chk.description.fillna("").str.split(" - ").str[0]
    nomatch = chk[chk.description.isna()]
    mism = chk[chk.description.notna() & ~pd.Series([b.startswith(a) for a, b in zip(k(head), k(chk.Name))], index=chk.index)]
    log("Sage StockItems", "Sage code has no BC item", len(nomatch), ", ".join(nomatch.Code.head(8)))
    log("Sage StockItems", "BC description differs from Sage for the rule-mapped item", len(mism),
        "; ".join(f"{a}|{b}" for a, b in zip(mism.Name.head(3), mism.description.head(3))))
    dup = st[st.Code.duplicated(keep=False)]
    if len(dup):
        log("Sage StockItems", "Same code defined twice", dup.Code.nunique(), ", ".join(dup.Code.unique()[:6]))
    it = it.merge(st.drop_duplicates("item_no")[["item_no", "StandardCost", "SellingPrice"]]
                  .rename(columns={"StandardCost": "sage_std_cost", "SellingPrice": "sage_sell_price"}), on="item_no", how="left")
    write_df(con, "dim_item", it)
    return it, Canon(it)
