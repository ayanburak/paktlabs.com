"""
file: pipeline/normalize.py
importable: tr_lower, normalize_unit, parse_dims, find_kind

Ham ürün adından tür, ölçü ve birim bilgisini çıkarır. Eş anlamlar ve birim yazımları
dictionaries klasöründeki CSV dosyalarından okunur, kod içinde sabit tutulmaz.

description: Farklı kaynaklardan gelen ürün kayıtlarını ortak alanlara çeviren normalizasyon adımı.
"""

# FIXME: Boyu çaptan önce yazan kayıtlarda, örneğin L40 Ø4 biçiminde olanlarda,
# parse_dims iki değeri ters okuyor. Yirmi civarında kayıt etkileniyor, şimdilik
# inceleme kuyruğunda elle düzeltiliyor.
#
# NOTE: Sözlükler her gece yeniden okunur. İnceleme ekibinin eklediği yeni yazımlar
# bir sonraki çalışmada devreye girer.

import re

import pandas as pd

# --- Harf ve birim ---

# str.lower büyük İ harfini i ve üstünde ayrı duran bir nokta işaretine çevirir. Bu
# yüzden VİDASI küçültülünce vidası ile eşleşmiyor. Önce iki harfi elle çeviriyoruz.
TR_LOWER = str.maketrans("Iİ", "ıi")


def tr_lower(text: str) -> str:
    return text.translate(TR_LOWER).lower()


# units.csv iki sütunlu, ham yazım ve karşılığı. Anahtarlar küçük harfle ve sondaki
# nokta atılmış halde tutulur, AD ile ad. aynı satıra düşer.
UNITS = pd.read_csv("dictionaries/units.csv", sep=";").set_index("raw")["unit"].to_dict()


def normalize_unit(raw: str) -> str | None:
    """Ham birim yazımının sözlükteki karşılığını döndürür, bulamazsa None döndürür."""
    return UNITS.get(tr_lower(raw).strip().rstrip("."))


# --- Ölçü ---

# 4x40, 4,0*40, 4.0 x 40 mm, Ø4 x L40 ve 4/40 yazımlarını yakalar. Ondalık ayıraç nokta
# da virgül de olabilir, iki sayı arasındaki işaret x, ×, * ya da / olabilir.
DIMS = re.compile(
    r"(?:ø\s*)?(\d+(?:[.,]\d+)?)\s*(?:mm)?\s*[x×*/]\s*(?:l\s*)?(\d+(?:[.,]\d+)?)",
    re.IGNORECASE,
)


def parse_dims(name: str) -> tuple[float, float] | None:
    """Ürün adındaki iki boyutlu ölçüyü okur.

    Args:
        name: Ham ürün adı.

    Returns:
        Çap ve boy, adın içinde ölçü yoksa None.
    """
    m = DIMS.search(name)
    if m is None:
        return None
    return tuple(float(g.replace(",", ".")) for g in m.groups())


# --- Tür ---

# Tür, adın eş anlam sözlüğünde aranmasıyla bulunur. En uzun ifade önce denenir, böylece
# yonga levha vidası, tek başına vida sözcüğünden önce yakalanır.
KINDS = pd.read_csv("dictionaries/kinds.csv", sep=";")
KINDS = KINDS.iloc[KINDS.phrase.str.len().argsort()[::-1]]


def find_kind(name: str) -> str | None:
    text = tr_lower(name)
    for phrase, kind in zip(KINDS.phrase, KINDS.kind):
        if phrase in text:
            return kind
    return None
