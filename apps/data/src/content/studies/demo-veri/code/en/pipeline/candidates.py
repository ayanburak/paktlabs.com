"""
file: pipeline/candidates.py
importable: key_candidates, nearest_candidates, build_candidates

Instead of comparing every record with every other record, picks the pairs that might be
the same product. Two separate routes are used and their results are merged. Every row of
the output is one pair, and the id in column a is always smaller than the one in column b.

description: Step that produces the candidate record pairs the matching model will score.
"""

# XXX: nearest_candidates builds a separate similarity space for every category. Screws,
# the most crowded category, hold about thirty thousand records and memory use there gets
# close to eight gigabytes. If the category grows this step should be split into chunks.

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# --- By key ---

# A pair is a candidate if category, dimensions and brand are the same. Records whose
# dimensions could not be read get no candidates from this route, the second one catches them.
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


# --- By name similarity ---

# Names are split into runs of three and four characters. Using characters instead of words
# lets spellings such as 4x40 and 4,0x40 land close to each other.
def nearest_candidates(df: pd.DataFrame, k: int = 20) -> pd.DataFrame:
    """Adds to every record the k records in its category with the most similar names.

    Args:
        df: Records with the record_id, category_l2 and name_norm columns.
        k: Number of neighbours to fetch for each record.

    Returns:
        Pairs without duplicates, made of the columns a and b.
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


# --- Merging ---

# The same pair can come from both routes, duplicates are dropped here.
def build_candidates(df: pd.DataFrame) -> pd.DataFrame:
    both = pd.concat([key_candidates(df), nearest_candidates(df)])
    return both.drop_duplicates(ignore_index=True)
