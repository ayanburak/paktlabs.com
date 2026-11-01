"""
file: test_settings.py

Ayarlarin ortam degiskenlerinden okunmasini ve gondericinin ayarlara gore
secilmesini denetler. Sunucuda SMTP ayari kaybolursa servisin acilista hata
vermesi bu testlerin asil amacidir.

description: Iletisim servisinin ayar okuma ve gonderici secimini sinayan testler.
"""

from dataclasses import replace
from pathlib import Path

import pytest

from app.mailer import ConsoleMailer, SmtpMailer, build_mailer
from app.settings import Settings, load_settings


# Eksiksiz bir SMTP ayari. Testler bundan bir alani silerek ya da degistirerek
# turetir.
def smtp_settings() -> Settings:
    return Settings(
        db_path=Path("data/messages.sqlite3"),
        mail_to="info@paktlabs.com",
        keep_days=730,
        mailer="smtp",
        smtp_host="smtp.ornek.com",
        smtp_port=465,
        smtp_user="info@ornek.com",
        smtp_password="gizli",
    )


def test_defaults_choose_smtp() -> None:
# Ortam bos olsa da servis smtp ile acilmaya calisir, console yalnizca acikca
# istenince secilir.
    settings = load_settings({})

    assert settings.mailer == "smtp"
    assert settings.keep_days == 730
    assert settings.smtp_port == 465
    assert settings.smtp_host is None


def test_mailer_can_be_set_to_console() -> None:
    assert load_settings({"CONTACT_MAILER": "console"}).mailer == "console"
# Lokalde verilmesi gereken tek ayar budur.


def test_unknown_mailer_is_rejected() -> None:
    with pytest.raises(ValueError, match="CONTACT_MAILER"):
# Yanlis yazilmis bir gonderici adi sessizce smtp'ye dusmez, servis acilirken
# hata verir.
        load_settings({"CONTACT_MAILER": "sendgrid"})


def test_console_needs_no_smtp_settings() -> None:
    settings = replace(smtp_settings(), mailer="console", smtp_host=None, smtp_user=None, smtp_password=None)
# console secildiginde SMTP ayarlarinin eksik olmasi sorun degil, lokal
# calisma ayar istemez.
    assert isinstance(build_mailer(settings), ConsoleMailer)


# SmtpMailer kurulurken ag baglantisi acmaz, baglanti ilk gonderimde kurulur.
def test_smtp_with_all_settings_builds_smtp_mailer() -> None:
    assert isinstance(build_mailer(smtp_settings()), SmtpMailer)


@pytest.mark.parametrize("missing", ["smtp_host", "smtp_user", "smtp_password"])
def test_smtp_with_a_missing_setting_fails(missing: str) -> None:
# Uc zorunlu ayardan biri eksikse hata mesaji eksik olanin adini soyler.
    settings = replace(smtp_settings(), **{missing: None})

    with pytest.raises(ValueError, match=missing.upper()):
        build_mailer(settings)
