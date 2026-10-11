"""
file: schema.py
importable: Area, Stage, Timing, Answers, ContactIn

Formdan gelen mesajin sekli ve kontrolleri. Secimler landing'deki
apps/landing/src/routes/Contact/questions.ts ile ayni kimlikleri tasir,
tests/test_contract.py iki listenin ayni kaldigini denetler. Listede olmayan
bir secim, bicimi bozuk bir e-posta, bos ya da cok uzun bir metin ve
tanimlanmamis bir alan istegi reddettirir.

description: Iletisim formundan gelen mesajin alanlarini ve kurallarini tanimlayan modul.
"""

# NOTE: website alani formda gorunmeyen tuzak alandir. Insan onu goremez,
# formu otomatik dolduran botlar doldurur. Dolu gelirse servis mesaji almis
# gibi cevap verir ama kaydetmez ve iletmez, bu karar main.py'de verilir.

import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

# Landing'deki questions.ts ile ayni sirada ve ayni kimliklerle durur.
Area = Literal["data", "automation", "web", "unsure"]
Stage = Literal["idea", "plan", "unfinished", "running"]
Timing = Literal["days", "month", "months", "flexible"]

# Landing'deki DetailsStep.tsx ile ayni basit kural: bosluksuz bir ad, bir @
# ve noktali bir alan adi. Adresin gercekten var olup olmadigini yalnizca
# gonderilen e-posta soyler.
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


# Ekstra bir alan gelirse istek reddedilir, form ile servis arasindaki
# anlasma sessizce kaymasin diye.
class Answers(BaseModel):
    """Formun secmeli sorularinin cevaplari."""

    model_config = ConfigDict(extra="forbid")

    area: Area
    stage: Stage
    timing: Timing


# Metinlerin bas ve sonundaki bosluklar silinir, sonra uzunluk denetlenir.
# Uzunluk sinirlari kotu niyetli cok buyuk istekleri keser, gercek bir
# ziyaretci bunlara yaklasmaz.
class ContactIn(BaseModel):
    """Iletisim formundan gelen tek bir mesaj."""

    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    answers: Answers
    name: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=3, max_length=254)
    company: str = Field(default="", max_length=120)
    message: str = Field(min_length=1, max_length=4000)
    language: Literal["tr", "en"]
    website: str = Field(default="", max_length=200)

    # Ad ve e-posta bildirim e-postasinin basliklarina girer. Email modulu
    # str.splitlines metodunun tanidigi her ayiriciyi basliklarda reddeder,
    # satir sonunun yani sira U+2028, U+2029 ve \x85 gibi ayiricilar da buna
    # dahildir. Bu yuzden ayni olcut kullanilir. Bos deger gecer, sonda
    # ayirici tasiyan deger tek satirlik sayilmaz.
    @field_validator("name", "email", "company")
    @classmethod
    def single_line(cls, value: str) -> str:
        if value and value.splitlines() != [value]:
            raise ValueError("tek satir olmali")
        return value

    # Bicim denetimi landing'deki ile ayni kurali kullanir, form gecirdigi
    # bir adresi servis reddetmesin diye.
    @field_validator("email")
    @classmethod
    def email_shape(cls, value: str) -> str:
        if not EMAIL_PATTERN.match(value):
            raise ValueError("gecerli bir e-posta adresi degil")
        return value
