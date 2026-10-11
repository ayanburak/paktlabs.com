"""
file: rules/catalog.py
importable: Rule, RULES, is_valid_ean, run_rules

Katalog kayıtları eşleştirmeye girmeden önce bu kurallardan geçer. Her kural bir
DataFrame alır ve satır başına True ya da False dönen bir maske verir. False dönen
satır silinmez, run_rules onu karantina tablosuna nedeniyle birlikte yazar.

description: Ham katalog kayıtlarını doğrulayıp geçemeyenleri karantinaya ayıran kural kümesi.
"""

# NOTE: Bu dosyada yalnızca dört genel kural var. Depodaki tam listede otuz bir kural
# bulunuyor, kaynağa özel olanlar rules/sources altında ayrı dosyalarda duruyor.

from dataclasses import dataclass
from typing import Callable

import pandas as pd

# --- Kural tanımı ---

# Kuralın adı karantina tablosundaki reason sütununa olduğu gibi yazılır. Ad değişirse
# eski karantina kayıtlarıyla yapılan karşılaştırmalar bozulur, değiştirilmemeli.
@dataclass(frozen=True)
class Rule:
    """Tek bir doğrulama kuralı.

    Args:
        name: Kuralın adı, karantina kaydında neden olarak görünür.
        check: DataFrame alıp geçen satırlar için True dönen fonksiyon.
    """

    name: str
    check: Callable[[pd.DataFrame], pd.Series]


# Barkodun son hanesi, ilk on iki hanenin sırayla bir ve üç ile çarpılıp toplanmasından
# gelir. Toplamı bir sonraki ona tamamlayan sayı kontrol hanesidir.
def is_valid_ean(code: str) -> bool:
    """Barkodun on üç haneli olup olmadığını ve kontrol hanesinin tuttuğunu döndürür."""
    if len(code) != 13 or not code.isdigit():
        return False
    total = sum(int(d) * (3 if i % 2 else 1) for i, d in enumerate(code[:12]))
    return (10 - total % 10) % 10 == int(code[12])


# --- Kurallar ---

# Barkodu boş olan kayıt ilk kuraldan geçer. Boş barkod hata değil eksik bilgidir,
# modelde ayrı bir durum olarak ele alınıyor.
RULES = [
    Rule("ean_checksum", lambda df: df.ean.isna() | df.ean.fillna("").map(is_valid_ean)),
    Rule("price_positive", lambda df: df.list_price > 0),
    Rule("unit_known", lambda df: df.unit_norm.notna()),
    Rule("name_present", lambda df: df.name.fillna("").str.strip().str.len() > 0),
]


# Bir satır birden fazla kurala takılabilir, karantinaya ilk takıldığı kuralın adı
# yazılır. Kural sırası bu yüzden önemli, en sık görülen sorun başta duruyor.
def run_rules(df: pd.DataFrame, rules: list[Rule] = RULES) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Kayıtları kurallardan geçirir, geçenleri ve karantinayı ayrı döndürür.

    Args:
        df: Kaynaktan okunmuş, birimi normalize edilmiş kayıtlar.
        rules: Uygulanacak kurallar, verildiği sırayla denenir.

    Returns:
        Kurallardan geçen kayıtlar ve reason sütunu eklenmiş karantina kayıtları.
    """
    reason = pd.Series(pd.NA, index=df.index, dtype="string")
    for rule in rules:
        failed = ~rule.check(df) & reason.isna()
        reason[failed] = rule.name
    quarantine = df[reason.notna()].assign(reason=reason.dropna())
    return df[reason.isna()], quarantine
