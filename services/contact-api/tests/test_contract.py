"""
file: test_contract.py

Formun gonderdigi secimlerle servisin kabul ettigi secimlerin ayni kaldigini
denetler. Secimler landing'de questions.ts'te, metin uzunluk sinirlari
limits.ts'te, dil listesi brand'in language.ts dosyasinda, serviste hepsi
schema.py'de durur, iki dil farkli oldugu icin
ortak tek bir dosya yok. Birine eklenen bir secenek ya da degisen bir sinir
otekinde yoksa bu test kirilir.

description: Landing'deki form secimleri ve brand'deki dil listesiyle servisin secimlerini karsilastiran test.
"""

import re
from pathlib import Path
from typing import get_args

from annotated_types import MaxLen

from app.schema import Area, ContactIn, Stage, Timing

CONTACT = Path(__file__).resolve().parents[3] / "apps/landing/src/routes/Contact"
QUESTIONS = CONTACT / "questions.ts"
LIMITS = CONTACT / "limits.ts"
LANGUAGES = Path(__file__).resolve().parents[3] / "packages/brand/i18n/language.ts"


# questions.ts'teki her satir { id: 'area', options: [...] } biciminde.
# Dosyanin bu bicimi degisirse once buradaki okuma bozulur, test o zaman
# sessizce gecmez, secim bulunamadi diye kirilir.
def read_questions() -> dict[str, list[str]]:
    text = QUESTIONS.read_text(encoding="utf-8")
    found = re.findall(r"\{ id: '(\w+)', options: \[([^\]]*)\] \}", text)
    return {qid: re.findall(r"'(\w+)'", options) for qid, options in found}


# Formun secimleri ile servisin kabul ettikleri ayni sirada ve ayni
# kimliklerle durmali.
def test_choices_match_the_form() -> None:
    assert read_questions() == {
        "area": list(get_args(Area)),
        "stage": list(get_args(Stage)),
        "timing": list(get_args(Timing)),
    }


# limits.ts'teki her satir name: 100, biciminde. Bicim degisirse okuma
# bos doner ve test sinir bulunamadi diye kirilir.
def read_limits() -> dict[str, int]:
    text = LIMITS.read_text(encoding="utf-8")
    return {name: int(value) for name, value in re.findall(r"^\s+(\w+): (\d+),$", text, re.MULTILINE)}


# Formdaki uzunluk sinirlari servisinkilerle ayni olmali, yoksa formun
# gecirdigi bir mesaj 422 alirdi.
def test_limits_match_the_form() -> None:
    limits = read_limits()
    assert set(limits) == {"name", "email", "company", "message"}
    for name, expected in limits.items():
        (max_len,) = [m for m in ContactIn.model_fields[name].metadata if isinstance(m, MaxLen)]
        assert max_len.max_length == expected, name


# language.ts'teki liste export const languages = ['tr', 'en'] as const
# biciminde. Bicim degisirse okuma bos doner ve test dil listesi bulunamadi
# diye kirilir.
def read_languages() -> list[str]:
    text = LANGUAGES.read_text(encoding="utf-8")
    found = re.search(r"export const languages = \[([^\]]*)\] as const", text)
    assert found, "language.ts icinde languages listesi bulunamadi"
    return re.findall(r"'(\w+)'", found.group(1))


# Servisin kabul ettigi diller sitelerin dil listesiyle ayni olmali.
def test_languages_match_the_sites() -> None:
    language = ContactIn.model_fields["language"].annotation
    assert read_languages() == list(get_args(language))
