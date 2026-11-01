"""
file: conftest.py
importable: FakeMailer, valid_payload

Testlerin ortak parcalari. Her test kendi gecici veritabanini ve kendi sahte
gondericisini alir, boylece testler birbirinin kayitlarini gormez ve hicbiri
gercek e-posta gondermez.

description: Iletisim servisi testlerinin ortak fixture'lari ve yardimcilari.
"""

from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.mailer import Mailer
from app.main import create_app
from app.schema import ContactIn
from app.settings import Settings
from app.store import MessageStore


# Gonderilen bildirimleri bir listede tutar. fail True verilirse her
# gonderimde hata firlatir, posta sunucusunun cevap vermedigi durumu taklit
# eder.
class FakeMailer(Mailer):
    # sent, testlerin gonderilen bildirimleri sirasiyla okudugu liste.
    def __init__(self, fail: bool = False) -> None:
        self.fail = fail
        self.sent: list[tuple[int, ContactIn]] = []

    # ConnectionError, gercek SMTP'nin ag hatasina en yakin tur.
    def send(self, contact: ContactIn, message_id: int) -> None:
        if self.fail:
            raise ConnectionError("posta sunucusu yok")
        self.sent.append((message_id, contact))


# Formun Gonder'e basildiginda yolladigi govdenin aynisi. Testler bunu
# kopyalayip tek bir alani bozar.
def valid_payload() -> dict:
    return {
        "answers": {"area": "data", "stage": "plan", "timing": "month"},
        "name": "Ayse Yilmaz",
        "email": "ayse@ornek.com",
        "company": "Ornek Lojistik",
        "message": "Stok kayitlarimizi tek bir rapora baglamak istiyoruz.",
        "language": "tr",
        "website": "",
    }


# console ayarli, testler SMTP ayarina hic dokunmaz. Veritabani her testin
# kendi gecici klasorunde durur.
@pytest.fixture
def settings(tmp_path: Path) -> Settings:
    return Settings(
        db_path=tmp_path / "messages.sqlite3",
        mail_to="info@paktlabs.com",
        keep_days=730,
        daily_limit=50,
        mailer="console",
        smtp_host=None,
        smtp_port=465,
        smtp_user=None,
        smtp_password=None,
    )


# settings ile ayni dosyayi acar, testler depoya dogrudan da bakabilir.
@pytest.fixture
def store(settings: Settings) -> MessageStore:
    return MessageStore(settings.db_path)


# Basarili sahte gonderici. Hata isteyen testler FakeMailer'i fail ile kendisi
# kurar.
@pytest.fixture
def mailer() -> FakeMailer:
    return FakeMailer()


# Uygulama ayni depo ve gondericiyle kurulur, testler istegin sonucunu
# ikisinden de okuyabilir.
@pytest.fixture
def client(settings: Settings, store: MessageStore, mailer: FakeMailer) -> TestClient:
    return TestClient(create_app(settings, store, mailer))
