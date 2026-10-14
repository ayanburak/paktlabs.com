"""
file: hfa/items.py
importable: build_items, Canon, TYPE_BY_NUM

Builds the item master as dim_item and provides the Canon class, which turns
item codes written differently in each source into a single BC code of the
form HF-AAA-TTTT-FF. Canon recognises these forms:

    ASH01-LG            old Sage code
    HF-ASH-SOF2-LG      BC code
    HF_ASH_SOF2_LG      the Amazon agency's underscored form
    HF-ASHBY-SOF2-LG    form with the full family name
    ASH01-LG-AMZ        Amazon-only suffix
    ASHBY 2 SEATER SOFA - LINEN DOVE GREY   description only

description: Item master and the item code mapping rules across sources.
"""

# NOTE: the HF Item Mapping table is incomplete and has inconsistent rows, for
# example type 01 is normally a 2 Seater Sofa but some rows map it like a
# bed. The rule based mapping is used here, where table and rule disagree the
# rule wins and the conflict goes to dq_log. What proves the rule is that the
# Sage StockItems descriptions match the BC descriptions one to one.
#
# NOTE: on the Sage side the code M is not an item but a hand-entered amount
# line, used in credit notes. These are not mapped to an item, kind=adjustment.

import re
import sqlite3

import pandas as pd

from .db import JOB, write_df

# Sage's two-digit type number and BC's four-letter type code. The number
# order comes from Sage's old catalogue order, most of the mapping table and
# the Sage descriptions confirm it.
TYPE_BY_NUM = {
    "01": "SOF2", "02": "SOF3", "03": "SOFC", "04": "ARMC", "05": "FTST", "06": "DCHR",
    "07": "BEDD", "08": "BEDK", "09": "BEDS", "10": "WRD2", "11": "WRD3", "12": "CHST",
    "13": "BSDT", "14": "DTB4", "15": "DTB6", "16": "DTB8", "17": "SDBD", "18": "COFT",
    "19": "TVUN", "20": "BKCS", "21": "DESK",
}
NUM_BY_TYPE = {v: k for k, v in TYPE_BY_NUM.items()}

VELVET = {"VE", "VN", "VO", "VR"}

# Groups fabric and finish codes into material groups. Velvet is kept apart
# because the supplier change only touches this group.
FINISH_GROUP = {
    "VE": "Velvet", "VN": "Velvet", "VO": "Velvet", "VR": "Velvet",
    "LG": "Linen", "LO": "Linen", "BI": "Boucle", "LT": "Leather",
    "WC": "Weave", "WS": "Weave",
}


# Splits an item description into family, type and finish. Descriptions follow
# the Family Type - Finish layout, the family is one word.
def _split_desc(d: str) -> tuple[str, str, str]:
    left, _, fin = d.partition(" - ")
    fam, _, typ = left.strip().partition(" ")
    return fam.strip().title(), typ.strip(), fin.strip()


# Turns every code form coming from the sources into a BC code. The lookup
# dictionaries are built once in build_items, then every source loader uses it.
class Canon:
    """Turns an item code or description from any source into a BC item code."""

    def __init__(self, items: pd.DataFrame) -> None:
        self.valid = set(items["item_no"])
        self.fam_by_name = {r.family_name.upper(): r.family for r in
                            items[["family", "family_name"]].drop_duplicates().itertuples()}
        self.by_desc = {self._key(d): i for d, i in zip(items["description"], items["item_no"])}

    @staticmethod
    def _key(desc: str) -> str:
        return re.sub(r"[^A-Z0-9]", "", str(desc).upper())

    def __call__(self, code, desc=None) -> str | None:
        """Turns the code into a BC item code, falls back to the description if it cannot.

        Args:
            code: Item code in the source, may be empty.
            desc: Item description in the source, used as a fallback when the code is not recognised.

        Returns:
            A valid BC item code, or None if none is found.
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
    """Builds dim_item from BC Item, Sage StockItems and the mapping table.

    Args:
        con: Connection with raw_bc_item and raw_bc_hf_item_mapping loaded.
        log: DQ recorder.

    Returns:
        The dim_item table and a Canon object built on it.
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

    # A few items have a blank category, it is derived from the type code.
    cat_by_type = it[it.category != "UNKNOWN"].groupby("type_code")["category"].agg(lambda s: s.mode()[0])
    miss = it.category == "UNKNOWN"
    if miss.any():
        log("BC Item", "Item Category Code blank", miss.sum(), ", ".join(it.loc[miss, "item_no"]))
        it.loc[miss, "category"] = it.loc[miss, "type_code"].map(cat_by_type)

    # Does the BC Legacy Code field contradict the rule
    filled = it[it.bc_legacy_code != ""]
    bad = filled[filled.bc_legacy_code != filled.legacy_code]
    log("BC Item", "Legacy Code field blank", (it.bc_legacy_code == "").sum(), "", action="filled from the code rule")
    if len(bad):
        log("BC Item", "Legacy Code field contradicts the code structure", len(bad),
            "; ".join(f"{a}->{b}" for a, b in zip(bad.item_no.head(5), bad.bc_legacy_code.head(5))), action="code rule used")

    # Comparing the mapping table with the rule
    mp = pd.read_sql("select * from raw_bc_hf_item_mapping", con)
    rule = mp["legacy_code"].map(lambda c: f"HF-{c[:3]}-{TYPE_BY_NUM.get(c[3:5], '????')}-{c[-2:]}")
    wrong = mp[rule != mp["item_no"]]
    log("BC HF Item Mapping", "Mapping contradicts the code structure (type number mapped to the wrong product)", len(wrong),
        "; ".join(f"{a}->{b}" for a, b in zip(wrong.legacy_code.head(6), wrong.item_no.head(6))), action="code rule used")
    log("BC HF Item Mapping", "Mapping table incomplete; covers only part of the range",
        len(it) - len(mp), f"{len(mp)} mappings / {len(it)} items", action="completed from the code rule")

    # Do the Sage StockItems descriptions confirm the rule
    st = pd.read_csv(JOB / "01_server_backup/sage200_legacy_export/StockItems.csv", encoding="cp1252")
    st["item_no"] = st["Code"].map(lambda c: f"HF-{c[:3]}-{TYPE_BY_NUM.get(c[3:5], '????')}-{c[-2:]}")
    chk = st.merge(it[["item_no", "description"]], on="item_no", how="left")
    # Sage names come as ASHBY 2 Seater Sofa Weave Charcoal or BROMPTON King Size Bed Frame PC,
    # the finish part is inconsistent. Only the family and type parts are compared.
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
