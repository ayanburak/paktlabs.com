"""
file: pipeline/features.py
importable: pair_features

Puts the two records of a candidate pair side by side and computes the features the model
uses. This file holds seven of the fourteen features, the rest follow the same pattern.

description: Module that computes similarity features for candidate record pairs.
"""

import numpy as np
import pandas as pd
from rapidfuzz import fuzz  # fast text similarity, written in C
from rapidfuzz.distance import JaroWinkler

# --- Features ---

# a and b must have the same length and order, they are matched row by row. Pairs whose
# dimensions could not be read get minus one for dims_match. The model learns this as a
# separate case, with zero an unknown size and a mismatched size would be mixed up.
def pair_features(a: pd.DataFrame, b: pd.DataFrame) -> pd.DataFrame:
    """Builds the feature table from the two records of each pair.

    Args:
        a: First records of the pairs.
        b: Second records of the pairs, in the same order as a.

    Returns:
        Feature table with one row for each pair.
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
