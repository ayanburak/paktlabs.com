"""
file: test_maintenance.py

Gece bakiminin uc isini denetler: gonderilememis bildirimleri yeniden
denemesi, saklama suresini gecen mesajlari silmesi ve yedekleri on dort
gunle sinirlamasi.

description: Iletisim servisinin gece bakimini sinayan testler.
"""

import sqlite3
from contextlib import closing
from dataclasses import replace
from datetime import date, timedelta
from pathlib import Path

import pytest

from app import maintenance
from app.schema import ContactIn
from app.settings import Settings
from app.store import MessageStore

from .conftest import FakeMailer, valid_payload


# Her test ayni gecerli mesaji kullanir, bu testlerin konusu mesajin icerigi
# degil.
def contact() -> ContactIn:
    return ContactIn(**valid_payload())


# Isaretli mesaj yeniden gonderilmez, yalnizca bekleyen gider.
def test_retry_sends_waiting_messages(store: MessageStore) -> None:
    first = store.add(contact())
    store.add(contact())
    store.mark_mailed(first)
    mailer = FakeMailer()

    assert maintenance.retry(store, mailer) == 1
    assert store.unmailed() == []


# Posta sunucusu yoksa mesaj isaretsiz kalir ve sonraki gece yine denenir.
def test_retry_keeps_messages_when_mail_fails(store: MessageStore) -> None:
    store.add(contact())
    assert maintenance.retry(store, FakeMailer(fail=True)) == 0
    assert len(store.unmailed()) == 1


# Kaydin zamani dogrudan veritabaninda geriye cekilir, saklama suresi
# beklenmeden sinanir.
def test_purge_removes_old_messages(store: MessageStore) -> None:
    old = store.add(contact())
    store.add(contact())
    with closing(sqlite3.connect(store.path)) as db, db:
        db.execute("UPDATE messages SET received_at = '2020-01-01T00:00:00+00:00' WHERE id = ?", (old,))

    assert store.purge(730) == 1
    assert [item.id for item in store.unmailed()] == [old + 1]


# Yirmi gunluk yedekten en yeni on dordu kalir, en yeni yedek de veritabaninin
# gercek bir kopyasidir.
def test_backup_keeps_fourteen_days(settings: Settings, store: MessageStore) -> None:
    store.add(contact())
    folder: Path = settings.db_path.parent / "backups"
    start = date(2026, 10, 1)
    for day in range(20):
        maintenance.backup(store, folder, start + timedelta(days=day))

    backups = sorted(folder.glob("messages-*.sqlite3"))
    assert len(backups) == 14
    assert backups[-1].name == "messages-2026-10-20.sqlite3"
    with closing(sqlite3.connect(backups[-1])) as db:
        assert db.execute("SELECT COUNT(*) FROM messages").fetchone()[0] == 1


# Bakim bekleyen bildirimi gonderir ve gunun yedegini o gunun adiyla yazar.
def test_run_does_all_three(settings: Settings, store: MessageStore) -> None:
    store.add(contact())
    mailer = FakeMailer()
    maintenance.run(settings, mailer, date(2026, 10, 11))

    assert len(mailer.sent) == 1
    assert (settings.db_path.parent / "backups" / "messages-2026-10-11.sqlite3").exists()


# Gonderici kurulamazsa bakim hata verir ama silme ve yedek once yapilmistir.
def test_run_purges_and_backs_up_when_mailer_cannot_be_built(settings: Settings, store: MessageStore) -> None:
    old = store.add(contact())
    with closing(sqlite3.connect(store.path)) as db, db:
        db.execute("UPDATE messages SET received_at = '2020-01-01T00:00:00+00:00' WHERE id = ?", (old,))
    broken = replace(settings, mailer="smtp", smtp_host=None)

    with pytest.raises(RuntimeError):
        maintenance.run(broken, None, date(2026, 10, 11))

    assert store.unmailed() == []
    assert (settings.db_path.parent / "backups" / "messages-2026-10-11.sqlite3").exists()


# Dogrulamadan gecemeyen eski bir kayit listeyi cokertmez, digerleri gonderilir.
def test_unmailed_skips_row_that_no_longer_validates(store: MessageStore) -> None:
    first = store.add(contact())
    with closing(sqlite3.connect(store.path)) as db, db:
        db.execute("UPDATE messages SET name = ? WHERE id = ?", ("Ayse Yilmaz", first))
    second = store.add(contact())
    mailer = FakeMailer()

    assert [item.id for item in store.unmailed()] == [second]
    assert maintenance.retry(store, mailer) == 1
