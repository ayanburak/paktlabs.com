"""
file: test_contract.py

Formun gonderdigi secimlerle servisin kabul ettigi secimlerin ayni kaldigini
denetler. Secimler landing'de questions.ts'te, serviste schema.py'de durur,
iki dil farkli oldugu icin ortak tek bir dosya yok. Birine eklenen bir
secenek otekine eklenmezse bu test kirilir.

description: Landing'deki form secimleriyle servisin secimlerini karsilastiran test.
"""

import re
from pathlib import Path
from typing import get_args

from app.schema import Area, Stage, Timing

QUESTIONS = Path(__file__).resolve().parents[3] / "apps/landing/src/routes/Contact/questions.ts"


# questions.ts'teki her satir { id: 'area', options: [...] } biciminde.
# Dosyanin bu bicimi degisirse once buradaki okuma bozulur, test o zaman
# sessizce gecmez, secim bulunamadi diye kirilir.
def read_questions() -> dict[str, list[str]]:
    text = QUESTIONS.read_text(encoding="utf-8")
    found = re.findall(r"\{ id: '(\w+)', options: \[([^\]]*)\] \}", text)
    return {qid: re.findall(r"'(\w+)'", options) for qid, options in found}


def test_choices_match_the_form() -> None:
    assert read_questions() == {
        "area": list(get_args(Area)),
        "stage": list(get_args(Stage)),
        "timing": list(get_args(Timing)),
    }
