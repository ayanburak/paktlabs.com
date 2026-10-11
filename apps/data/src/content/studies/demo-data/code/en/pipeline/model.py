"""
file: pipeline/model.py
importable: FEATURES, LOW, HIGH, train, decide, evaluate

Trains the model that gives the probability of a candidate pair being the same product and
turns the score into three decisions: reject, review and automatic merge. The thresholds
live in the LOW and HIGH constants, check the evaluate output before changing them.

description: Training of the matching model, turning the score into a decision and measuring it on the test set.
"""

# NOTE: The train and test split is made by product cluster. If pairs of the same product
# were in both training and test, we would measure what the model memorised and it would look better than it is.

import numpy as np
import pandas as pd
from sklearn.calibration import CalibratedClassifierCV
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import average_precision_score
from sklearn.model_selection import GroupKFold
from statsmodels.stats.proportion import proportion_confint  # confidence interval for a rate

FEATURES = [
    "dims_match", "name_tfidf", "name_token_set", "name_jw", "ean_status",
    "brand_match", "finish_match", "unit_price_ratio", "pack_ratio",
    "unit_match", "category_depth", "supplier_code_sim", "len_diff", "source_pair",
]

# The aim was to fit the queue into nine working days of the team. A wider band raises
# precision but the review load grows quickly.
LOW, HIGH = 0.55, 0.92

# --- Training ---

# Without calibration the score was fine for ranking but unreliable for picking thresholds,
# a score that said ninety percent turned out right less often than that.
def train(pairs: pd.DataFrame) -> CalibratedClassifierCV:
    """Trains the matching model on labelled pairs.

    Args:
        pairs: Pairs with the FEATURES columns, a label column and a cluster_id column.

    Returns:
        Model with calibrated probabilities, usable through predict_proba.
    """
    X, y = pairs[FEATURES], pairs.label
    folds = GroupKFold(n_splits=5).split(X, y, groups=pairs.cluster_id)
    base = HistGradientBoostingClassifier(
        max_iter=400,
        learning_rate=0.05,
        max_leaf_nodes=31,
        categorical_features=["ean_status", "source_pair"],
    )
    model = CalibratedClassifierCV(base, method="isotonic", cv=list(folds))
    return model.fit(X, y)


# --- Decision and measurement ---

# A boundary value goes to the upper band, a pair scoring exactly HIGH is merged automatically.
def decide(score: np.ndarray) -> np.ndarray:
    return np.select([score >= HIGH, score >= LOW], ["auto", "review"], "reject")


# The first figure and the decision table on the study page were drawn from this output.
def evaluate(model: CalibratedClassifierCV, test: pd.DataFrame) -> pd.DataFrame:
    """Counts, for each decision on the test set, how many pairs really were the same product.

    Args:
        model: Model trained with train.
        test: Labelled pairs the model did not see in training.

    Returns:
        Count table with decisions as rows and the true label as columns.
    """
    score = model.predict_proba(test[FEATURES])[:, 1]
    table = pd.crosstab(decide(score), test.label, rownames=["decision"])
    table = table.reindex(["reject", "review", "auto"])
    auto = table.loc["auto"]
    lo, hi = proportion_confint(auto[1], auto.sum(), method="wilson")
    print(f"auto precision: {auto[1] / auto.sum():.4f}  [{lo:.4f}, {hi:.4f}]")
    print(f"pr_auc: {average_precision_score(test.label, score):.3f}")
    return table
