"""
file: pipeline/candidates.py
importable: key_candidates, nearest_candidates, build_candidates

Her kaydı diğer bütün kayıtlarla karşılaştırmak yerine aynı ürün olma ihtimali olan
çiftleri seçer. İki ayrı yol kullanılır, sonuçları birleştirilir. Çıktıdaki her satır
bir çifttir ve a sütunundaki kimlik her zaman b sütunundakinden küçüktür.

description: Eşleştirme modelinin puanlayacağı aday kayıt çiftlerini üreten adım.
"""

# XXX: nearest_candidates her kategori için ayrı bir benzerlik uzayı kuruyor. En kalabalık
# kategori olan vidada yaklaşık otuz bin kayıt var ve bellek kullanımı orada sekiz
# gigabayta yaklaşıyor. Kategori büyürse bu adım parçalara bölünmeli.

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# --- Anahtar ile ---

# Kategori, ölçü ve marka aynıysa çift adaydır. Ölçüsü okunamayan kayıtlar bu yoldan
# hiç aday çıkaramaz, onları ikinci yol yakalıyor.
def key_candidates(df: pd.DataFrame) -> pd.DataFrame:
    keyed = df.dropna(subset=["d1", "d2"])
    key = (
        keyed.category_l2 + "|" + keyed.d1.astype(str) + "|"
        + keyed.d2.astype(str) + "|" + keyed.brand.fillna("")
    )
    side = keyed.assign(key=key)[["record_id", "key"]]
    pairs = side.merge(side, on="key", suffixes=("_a", "_b"))
    pairs = pairs[pairs.record_id_a < pairs.record_id_b]
    return pairs.rename(columns={"record_id_a": "a", "record_id_b": "b"})[["a", "b"]]


# --- Ad benzerliği ile ---

# Adlar karakter üçlü ve dörtlülerine bölünür. Kelime yerine karakter kullanmak, 4x40
# ile 4,0x40 gibi yazımların birbirine yakın düşmesini sağlıyor.
def nearest_candidates(df: pd.DataFrame, k: int = 20) -> pd.DataFrame:
    """Her kayda, aynı kategoride adı en çok benzeyen k kaydı aday olarak ekler.

    Args:
        df: record_id, category_l2 ve name_norm sütunlarını taşıyan kayıtlar.
        k: Kayıt başına getirilecek komşu sayısı.

    Returns:
        a ve b sütunlarından oluşan, tekrarsız çiftler.
    """
    found = []
    for _, group in df.groupby("category_l2"):
        vec = TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 4), min_df=2)
        X = vec.fit_transform(group.name_norm)
        nn = NearestNeighbors(n_neighbors=min(k, len(group)), metric="cosine").fit(X)
        _, idx = nn.kneighbors(X)
        ids = group.record_id.to_numpy()
        found.append(pd.DataFrame({"a": ids.repeat(idx.shape[1]), "b": ids[idx.ravel()]}))
    pairs = pd.concat(found)
    lo, hi = pairs.min(axis=1), pairs.max(axis=1)
    pairs = pd.DataFrame({"a": lo, "b": hi})
    return pairs[pairs.a != pairs.b].drop_duplicates()


# --- Birleştirme ---

# Aynı çift iki yoldan da gelebilir, tekrarlar burada atılıyor.
def build_candidates(df: pd.DataFrame) -> pd.DataFrame:
    both = pd.concat([key_candidates(df), nearest_candidates(df)])
    return both.drop_duplicates(ignore_index=True)
