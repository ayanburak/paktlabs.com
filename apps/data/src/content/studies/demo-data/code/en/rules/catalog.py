"""
file: rules/catalog.py
importable: Rule, RULES, is_valid_ean, run_rules

Catalog records pass through these rules before they enter matching. Each rule takes a
DataFrame and gives a mask that is True or False for every row. A row that comes back
False is not deleted, run_rules writes it to the quarantine table along with its reason.

description: Rule set that validates raw catalog records and moves the failing ones to quarantine.
"""

# NOTE: This file holds only the four general rules. The full list in the repository has
# thirty one, the source specific ones live in separate files under rules/sources.

from dataclasses import dataclass
from typing import Callable

import pandas as pd

# --- Rule definition ---

# The rule name is written as is to the reason column of the quarantine table. If the name
# changes, comparisons with older quarantine records break, so it should not be changed.
@dataclass(frozen=True)
class Rule:
    """A single validation rule.

    Args:
        name: Name of the rule, shows up as the reason in a quarantine record.
        check: Function that takes a DataFrame and returns True for the rows that pass.
    """

    name: str
    check: Callable[[pd.DataFrame], pd.Series]


# The last digit of a barcode comes from multiplying the first twelve digits by one and
# three in turn and adding them up. The digit that rounds the sum up to ten is the check digit.
def is_valid_ean(code: str) -> bool:
    """Returns whether the barcode has thirteen digits and its check digit holds."""
    if len(code) != 13 or not code.isdigit():
        return False
    total = sum(int(d) * (3 if i % 2 else 1) for i, d in enumerate(code[:12]))
    return (10 - total % 10) % 10 == int(code[12])


# --- Rules ---

# A record with an empty barcode passes the first rule. An empty barcode is missing
# information rather than an error, the model treats it as a separate case.
RULES = [
    Rule("ean_checksum", lambda df: df.ean.isna() | df.ean.fillna("").map(is_valid_ean)),
    Rule("price_positive", lambda df: df.list_price > 0),
    Rule("unit_known", lambda df: df.unit_norm.notna()),
    Rule("name_present", lambda df: df.name.fillna("").str.strip().str.len() > 0),
]


# A row can fail more than one rule, quarantine records the name of the first rule it
# failed. That is why the order matters, the most common problem comes first.
def run_rules(df: pd.DataFrame, rules: list[Rule] = RULES) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Runs the records through the rules, returns the passing ones and the quarantine separately.

    Args:
        df: Records read from the source, with their unit normalised.
        rules: Rules to apply, tried in the order given.

    Returns:
        Records that passed the rules and quarantine records with an added reason column.
    """
    reason = pd.Series(pd.NA, index=df.index, dtype="string")
    for rule in rules:
        failed = ~rule.check(df) & reason.isna()
        reason[failed] = rule.name
    quarantine = df[reason.notna()].assign(reason=reason.dropna())
    return df[reason.isna()], quarantine
