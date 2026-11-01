"""
file: test_api.py

Servisin iki adresini denetler: gecerli mesajin kaydedilip bildirildigini,
denetimden gecmeyen mesajin reddedildigini, tuzak alanin mesaji sessizce
dusurdugunu ve posta sunucusu cevap vermezse mesajin kayitta kaldigini.

description: Iletisim servisinin adreslerini ve mesaj denetimlerini sinayan testler.
"""

import pytest
from fastapi.testclient import TestClient

from app.mailer import compose
from app.main import create_app
from app.schema import ContactIn
from app.settings import Settings
from app.store import MessageStore

from .conftest import FakeMailer, valid_payload


def test_health(client: TestClient) -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

# Yayin script'i yeni surumu bu adrese bakarak dogrular, cevabin sekli
# degismemeli.

# TestClient arka plan islerini cevaptan hemen sonra calistirir, bildirim
# bu yuzden test icinde gorunur.
def test_valid_message_is_stored_and_mailed(client: TestClient, store: MessageStore, mailer: FakeMailer) -> None:
    response = client.post("/api/contact", json=valid_payload())

    assert response.status_code == 204
    assert len(mailer.sent) == 1
    message_id, contact = mailer.sent[0]
    assert contact.name == "Ayse Yilmaz"
    assert contact.answers.timing == "month"
    assert store.unmailed() == []
    assert message_id == 1


def test_text_is_trimmed(client: TestClient, mailer: FakeMailer) -> None:
    payload = valid_payload() | {"name": "  Ayse  ", "email": " ayse@ornek.com "}
    assert client.post("/api/contact", json=payload).status_code == 204
    assert mailer.sent[0][1].name == "Ayse"
    assert mailer.sent[0][1].email == "ayse@ornek.com"
# Bastaki ve sondaki bosluklar silinir, kopyala yapistirla gelen bir bosluk
# gecerli bir adresi reddettirmesin.


def test_company_is_optional(client: TestClient) -> None:
    payload = valid_payload()
    del payload["company"]
    assert client.post("/api/contact", json=payload).status_code == 204

# Sirket alani formda bos birakilabilir, govdede hic olmamasi da gecerli.

# Her satir gecerli govdenin tek bir alanini bozar. Hicbiri kaydedilmemeli.
@pytest.mark.parametrize(
    "change",
    [
        {"answers": {"area": "games", "stage": "plan", "timing": "month"}},
        {"answers": {"area": "data", "stage": "plan"}},
        {"answers": {"area": "data", "stage": "plan", "timing": "month", "budget": "1k"}},
        {"name": ""},
        {"name": "   "},
        {"name": "Ayse\nBcc: biri@ornek.com"},
        {"name": "Ayse\u2028Bcc: biri@ornek.com"},
        {"name": "Ayse\x85Bcc: biri@ornek.com"},
        {"name": "a" * 101},
        {"email": "ayse"},
        {"email": "ayse@ornek"},
        {"email": "ayse yilmaz@ornek.com"},
        {"message": ""},
        {"message": "a" * 4001},
        {"language": "de"},
        {"extra": "alan"},
    ],
)
def test_invalid_message_is_rejected(client: TestClient, store: MessageStore, mailer: FakeMailer, change: dict) -> None:
    response = client.post("/api/contact", json=valid_payload() | change)

    assert response.status_code == 422
    assert mailer.sent == []
    assert store.unmailed() == []


def test_honeypot_is_accepted_but_dropped(client: TestClient, store: MessageStore, mailer: FakeMailer) -> None:
    response = client.post("/api/contact", json=valid_payload() | {"website": "https://spam.example"})

    assert response.status_code == 204
    assert mailer.sent == []
# Tuzak alan doluysa bot yakalandigini anlamasin diye ayni 204 doner ama
# hicbir sey kaydedilmez ve iletilmez.
    assert store.unmailed() == []


# Ziyaretci yine basari gorur, mesaj kayitta isaretsiz kalir ve gece
# bakimi onu yeniden dener.
def test_failed_mail_keeps_the_message(settings: Settings, store: MessageStore) -> None:
    client = TestClient(create_app(settings, store, FakeMailer(fail=True)))

    assert client.post("/api/contact", json=valid_payload()).status_code == 204
    waiting = store.unmailed()
    assert len(waiting) == 1
    assert waiting[0].contact.email == "ayse@ornek.com"


def test_only_post_is_served(client: TestClient) -> None:
    assert client.get("/api/contact").status_code == 405
    assert client.get("/docs").status_code == 404
    assert client.get("/openapi.json").status_code == 404


# Bildirimin Yanitla adresi ziyaretcidir, konu ve govde Turkce harfleri
# bozmadan tasir.
def test_notification_mail_shape() -> None:
    mail = compose(ContactIn(**(valid_payload() | {"name": "Ayşe Yılmaz"})), 7, "info@paktlabs.com", "info@paktlabs.com")

    assert mail["Reply-To"] == "ayse@ornek.com"
    assert mail["From"] == "info@paktlabs.com"
    assert mail["Subject"] == "Yeni iletişim #7: Ayşe Yılmaz · data"
    body = mail.get_content()
    assert "Zaman:    month" in body
    assert "Şirket:   Ornek Lojistik" in body
# Iletisim adresine GET 405 alir. Belge sayfalari kapali oldugu icin docs ve
# openapi 404 doner.
