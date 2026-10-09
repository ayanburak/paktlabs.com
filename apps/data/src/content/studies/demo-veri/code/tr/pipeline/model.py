"""
file: pipeline/model.py
importable: FEATURES, LOW, HIGH, train, decide, evaluate

Aday çiftlerin özelliklerinden aynı ürün olma olasılığını veren modeli eğitir ve
skoru üç karara çevirir: ret, inceleme ve otomatik birleşme. Eşikler LOW ve HIGH
sabitlerinde durur, değiştirmeden önce evaluate çıktısına bakılmalı.

description: Eşleştirme modelinin eğitimi, skorun karara çevrilmesi ve test setinde ölçülmesi.
"""

# NOTE: Eğitim ve test bölmesi ürün kümesine göre yapılıyor. Aynı ürüne ait çiftler
# hem eğitimde hem testte bulunursa model ezberini ölçeriz ve sonuç olduğundan iyi görünür.

import numpy as np
import pandas as pd
from sklearn.calibration import CalibratedClassifierCV
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import average_precision_score
from sklearn.model_selection import GroupKFold
from statsmodels.stats.proportion import proportion_confint  # oran için güven aralığı

FEATURES = [
    "dims_match", "name_tfidf", "name_token_set", "name_jw", "ean_status",
    "brand_match", "finish_match", "unit_price_ratio", "pack_ratio",
    "unit_match", "category_depth", "supplier_code_sim", "len_diff", "source_pair",
]

# Kuyruğun ekibin dokuz iş gününe sığması hedeflendi. Bant genişletilirse kesinlik
# artıyor ama inceleme yükü hızla büyüyor.
LOW, HIGH = 0.55, 0.92

# --- Eğitim ---

# Kalibrasyon olmadan skor sıralama için iyiydi ama eşik seçmek için güvenilmezdi,
# yüzde doksan diyen skor gerçekte daha az haklı çıkıyordu.
def train(pairs: pd.DataFrame) -> CalibratedClassifierCV:
    """Etiketli çiftlerle eşleştirme modelini eğitir.

    Args:
        pairs: FEATURES sütunlarını, label ve cluster_id sütununu taşıyan çiftler.

    Returns:
        Olasılıkları ayarlanmış, predict_proba ile kullanılabilen model.
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


# --- Karar ve ölçüm ---

# Sınır değer üst banda yazılır, skoru tam HIGH olan çift otomatik birleşir.
def decide(score: np.ndarray) -> np.ndarray:
    return np.select([score >= HIGH, score >= LOW], ["auto", "review"], "reject")


# Detay sayfasındaki birinci şekil ve karar tablosu bu fonksiyonun çıktısından çizildi.
def evaluate(model: CalibratedClassifierCV, test: pd.DataFrame) -> pd.DataFrame:
    """Test setinde her karar için kaç çiftin gerçekten aynı ürün olduğunu sayar.

    Args:
        model: train ile eğitilmiş model.
        test: Modelin eğitimde görmediği etiketli çiftler.

    Returns:
        Satırları karar, sütunları gerçek etiket olan sayım tablosu.
    """
    score = model.predict_proba(test[FEATURES])[:, 1]
    table = pd.crosstab(decide(score), test.label, rownames=["decision"])
    table = table.reindex(["reject", "review", "auto"])
    auto = table.loc["auto"]
    lo, hi = proportion_confint(auto[1], auto.sum(), method="wilson")
    print(f"otomatik kesinlik: {auto[1] / auto.sum():.4f}  [{lo:.4f}, {hi:.4f}]")
    print(f"pr_auc: {average_precision_score(test.label, score):.3f}")
    return table
