"""
file: store.py
importable: MessageStore, StoredMessage

Mesajlarin saklandigi tek SQLite dosyasi. Tablo ilk acilista kendiliginden
kurulur. Bildirimi gonderilen mesaj isaretlenir, gonderilemeyenler gece
bakiminda yeniden denenir. Saklama suresini gecen mesajlar purge ile,
dosyanin kopyasi backup ile alinir.

    store = MessageStore(Path("data/messages.sqlite3"))
    message_id = store.add(contact)
    store.mark_mailed(message_id)

description: Iletisim mesajlarini SQLite dosyasina yazan, okuyan ve silen modul.
"""

# NOTE: Her islem kendi baglantisini acip kapatir. FastAPI senkron
# fonksiyonlari ayri thread'lerde calistirir, sqlite3 baglantisi thread'ler
# arasinda paylasilamaz. Trafik dusuk oldugu icin baglanti acmanin maliyeti
# onemsiz.

import logging
import sqlite3
from contextlib import closing
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path

from pydantic import ValidationError

from .schema import Answers, ContactIn

log = logging.getLogger("contact")

SCHEMA = """
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY,
    received_at TEXT NOT NULL,
    area TEXT NOT NULL,
    stage TEXT NOT NULL,
    timing TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    message TEXT NOT NULL,
    language TEXT NOT NULL,
    mailed_at TEXT
)
"""


# Zamanlar UTC ve ISO bicimde metin olarak tutulur, boylece metin olarak
# karsilastirmak zaman olarak karsilastirmakla ayni sonucu verir.
def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# Veritabanindan okunan bir mesaj. Bildirim yeniden denenirken ContactIn'e
# geri cevrilir.
@dataclass(frozen=True)
class StoredMessage:
    """Kayitli bir mesaj ve kimligi."""

    id: int
    received_at: str
    contact: ContactIn


# Dosyanin bulundugu klasor yoksa kurulur, lokalde ilk calistirmada data
# klasoru elle acilmasin diye.
class MessageStore:
    """Iletisim mesajlarini tek bir SQLite dosyasinda saklayan depo."""

    def __init__(self, path: Path) -> None:
        self.path = path
        path.parent.mkdir(parents=True, exist_ok=True)
        with closing(self._connect()) as db, db:
            db.execute(SCHEMA)

    # timeout, gece bakimi dosyayi kopyalarken gelen bir mesajin hemen hata
    # vermeyip kisa bir sure beklemesi icin.
    def _connect(self) -> sqlite3.Connection:
        return sqlite3.connect(self.path, timeout=10)

    # Tuzak alan kaydedilmez, o alan dolu bir mesaj buraya hic gelmez.
    def add(self, contact: ContactIn) -> int:
        """Mesaji kaydeder.

        Args:
            contact: Denetimden gecmis mesaj.

        Returns:
            Kaydin kimligi, bildirim gonderilince mark_mailed bununla cagrilir.
        """
        with closing(self._connect()) as db, db:
            cursor = db.execute(
                "INSERT INTO messages (received_at, area, stage, timing, name, email, company, message, language)"
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    _now(),
                    contact.answers.area,
                    contact.answers.stage,
                    contact.answers.timing,
                    contact.name,
                    contact.email,
                    contact.company,
                    contact.message,
                    contact.language,
                ),
            )
            return int(cursor.lastrowid)

    # Yalnizca bildirim gercekten iletildikten sonra cagrilir.
    def mark_mailed(self, message_id: int) -> None:
        """Mesajin bildiriminin gonderildigini isaretler."""
        with closing(self._connect()) as db, db:
            db.execute("UPDATE messages SET mailed_at = ? WHERE id = ?", (_now(), message_id))

    # Gece bakimi bunlari yeniden gondermeyi dener. Satir ContactIn'e geri
    # cevrilirken ayni denetimlerden gecer. Sema sonradan sikilasirsa eski
    # bir kayit gecemeyebilir, bu satir atlanir ve yalnizca kimligi loglanir
    # ki tek bozuk kayit digerlerinin bildirimini engellemesin.
    def unmailed(self) -> list[StoredMessage]:
        """Bildirimi henuz gonderilmemis mesajlari eskiden yeniye dondurur.

        Denetimden gecemeyen satirlar listeye girmez.
        """
        with closing(self._connect()) as db:
            rows = db.execute(
                "SELECT id, received_at, area, stage, timing, name, email, company, message, language"
                " FROM messages WHERE mailed_at IS NULL ORDER BY id"
            ).fetchall()
        messages = []
        for row in rows:
            try:
                contact = ContactIn(
                    answers=Answers(area=row[2], stage=row[3], timing=row[4]),
                    name=row[5],
                    email=row[6],
                    company=row[7],
                    message=row[8],
                    language=row[9],
                )
            except ValidationError:
                log.error("mesaj %s denetimden gecemedi, atlandi", row[0])
                continue
            messages.append(StoredMessage(id=row[0], received_at=row[1], contact=contact))
        return messages

    # Silinen mesaj geri gelmez, yedekler de ayni sureyle doner.
    def purge(self, keep_days: int) -> int:
        """Saklama suresini gecen mesajlari siler.

        Args:
            keep_days: Bir mesajin en fazla kac gun saklanacagi.

        Returns:
            Silinen mesaj sayisi.
        """
        limit = (datetime.now(timezone.utc) - timedelta(days=keep_days)).isoformat(timespec="seconds")
        with closing(self._connect()) as db, db:
            return db.execute("DELETE FROM messages WHERE received_at < ?", (limit,)).rowcount

    # sqlite3'un kendi yedekleme yolu kullanilir. Dosyayi duz kopyalamak bir
    # yazma aninda tutarsiz bir kopya uretebilirdi.
    def backup(self, target: Path) -> None:
        """Veritabaninin tutarli bir kopyasini verilen dosyaya yazar."""
        target.parent.mkdir(parents=True, exist_ok=True)
        with closing(self._connect()) as source, closing(sqlite3.connect(target)) as copy:
            source.backup(copy)
