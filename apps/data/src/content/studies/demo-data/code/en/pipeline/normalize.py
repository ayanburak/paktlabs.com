"""
file: pipeline/normalize.py
importable: tr_lower, normalize_unit, parse_dims, find_kind

Pulls the kind, the dimensions and the unit out of a raw product name. Synonyms and unit
spellings are read from the CSV files in the dictionaries folder, not kept in the code.

description: Normalisation step that turns product records from different sources into shared fields.
"""

# FIXME: In records that write the length before the diameter, such as L40 Ø4,
# parse_dims reads the two values the wrong way round. About twenty records are affected,
# for now they are fixed by hand in the review queue.
#
# NOTE: The dictionaries are read again every night. New spellings added by the review
# team take effect on the next run.

import re

import pandas as pd

# --- Letters and units ---

# str.lower turns the capital İ into i and a separate combining dot above it. That
# is why VİDASI does not match vidası once lowered. We map the two letters by hand first.
TR_LOWER = str.maketrans("Iİ", "ıi")


def tr_lower(text: str) -> str:
    return text.translate(TR_LOWER).lower()


# units.csv has two columns, the raw spelling and its meaning. Keys are kept lower case and
# without a trailing dot, so PC and pc. land on the same row.
UNITS = pd.read_csv("dictionaries/units.csv", sep=";").set_index("raw")["unit"].to_dict()


def normalize_unit(raw: str) -> str | None:
    """Returns the dictionary meaning of a raw unit spelling, or None if there is none."""
    return UNITS.get(tr_lower(raw).strip().rstrip("."))


# --- Dimensions ---

# Catches the spellings 4x40, 4,0*40, 4.0 x 40 mm, Ø4 x L40 and 4/40. The decimal separator
# can be a dot or a comma, the sign between the two numbers can be x, ×, * or /.
DIMS = re.compile(
    r"(?:ø\s*)?(\d+(?:[.,]\d+)?)\s*(?:mm)?\s*[x×*/]\s*(?:l\s*)?(\d+(?:[.,]\d+)?)",
    re.IGNORECASE,
)


def parse_dims(name: str) -> tuple[float, float] | None:
    """Reads the two part dimensions in a product name.

    Args:
        name: Raw product name.

    Returns:
        Diameter and length, None if the name holds no dimensions.
    """
    m = DIMS.search(name)
    if m is None:
        return None
    return tuple(float(g.replace(",", ".")) for g in m.groups())


# --- Kind ---

# The kind is found by looking the name up in the synonym dictionary. The longest phrase
# is tried first, so yonga levha vidası is caught before the plain word vida.
KINDS = pd.read_csv("dictionaries/kinds.csv", sep=";")
KINDS = KINDS.iloc[KINDS.phrase.str.len().argsort()[::-1]]


def find_kind(name: str) -> str | None:
    text = tr_lower(name)
    for phrase, kind in zip(KINDS.phrase, KINDS.kind):
        if phrase in text:
            return kind
    return None
