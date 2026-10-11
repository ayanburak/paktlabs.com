"""
file: pipeline/features.py
importable: pair_features

Aday çiftin iki kaydını yan yana koyup modelin kullandığı özellikleri hesaplar. Bu
dosyada on dört özelliğin yedisi var, geri kalanı aynı kalıpla yazıldı.

description: Aday kayıt çiftleri için benzerlik özelliklerini hesaplayan modül.
"""

import numpy as np
import pandas as pd
from rapidfuzz import fuzz  # hızlı metin benzerliği, C ile yazılmış
from rapidfuzz.distance import JaroWinkler

# --- Özellikler ---

# a ve b aynı uzunlukta ve aynı sırada olmalı, satır satır eşleşiyorlar. Ölçüsü
# okunamayan çiftlerde dims_match eksi bir alır. Model bunu ayrı bir durum olarak
# öğreniyor, sıfır verilse ölçüsü bilinmeyen ile ölçüsü tutmayan karışırdı.
def pair_features(a: pd.DataFrame, b: pd.DataFrame) -> pd.DataFrame:
    """Çiftin iki kaydından özellik tablosunu kurar.

    Args:
        a: Çiftlerin ilk kayıtları.
        b: Çiftlerin ikinci kayıtları, a ile aynı sırada.

    Returns:
        Her çift için bir satır taşıyan özellik tablosu.
    """
    out = pd.DataFrame(index=a.index)
    known = a.d1.notna() & b.d1.notna()
    same_dims = (a.d1 == b.d1) & (a.d2 == b.d2)
    out["dims_match"] = np.where(known, same_dims.astype(int), -1)
    out["name_token_set"] = [fuzz.token_set_ratio(x, y) / 100 for x, y in zip(a.name_norm, b.name_norm)]
    out["name_jw"] = [JaroWinkler.similarity(x, y) for x, y in zip(a.name_norm, b.name_norm)]
    out["ean_status"] = np.select(
        [a.ean.isna() | b.ean.isna(), a.ean == b.ean], ["missing", "same"], "conflict"
    )
    out["brand_match"] = (a.brand == b.brand).astype(int)
    out["finish_match"] = (a.finish == b.finish).astype(int)
    out["unit_price_ratio"] = np.abs(np.log(a.unit_price / b.unit_price))
    return out
