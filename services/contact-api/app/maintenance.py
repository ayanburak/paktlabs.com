"""
file: maintenance.py
importable: run

Gece bakimi. Sunucuda systemd zamanlayicisi her gece calistirir:

    python -m app.maintenance

Sirasiyla bildirimi gonderilememis mesajlari yeniden dener, saklama suresini
gecen mesajlari siler ve veritabaninin bir kopyasini data/backups altina
yazar. Son on dort gunun kopyalari kalir.

description: Iletisim mesajlarinin gece bakimini yapan komut.
"""

# NOTE: Yedekler de kisisel veri tasir. Silinen bir mesaj en fazla on dort
# gun daha eski bir yedekte kalir, sonra o yedek de silinir.

import logging
from datetime import date
from pathlib import Path

from .mailer import Mailer, build_mailer
from .settings import Settings, load_settings
from .store import MessageStore

log = logging.getLogger("contact")

# Iki haftalik yedek, bir sorun fark edilene kadar gecebilecek sureye yeter
# ve kisisel verinin yedeklerde uzun kalmasini onler.
YEDEK_GUNU = 14


# Bir mesajin gonderimi basarisiz olursa digerleri yine denenir.
def retry(store: MessageStore, mailer: Mailer) -> int:
    """Bildirimi gonderilmemis mesajlari yeniden dener.

    Returns:
        Bu calismada gonderilebilen mesaj sayisi.
    """
    sent = 0
    for item in store.unmailed():
        try:
            mailer.send(item.contact, item.id)
        except Exception:
            log.exception("mesaj %s yine bildirilemedi", item.id)
            continue
        store.mark_mailed(item.id)
        sent += 1
    return sent


# Yedek dosyasinin adinda tarih var, ayni gun ikinci calisma ayni dosyanin
# ustune yazar.
def backup(store: MessageStore, folder: Path, today: date) -> None:
    """Gunun yedegini alir ve on dort gunden eski yedekleri siler."""
    store.backup(folder / f"messages-{today.isoformat()}.sqlite3")
    for old in sorted(folder.glob("messages-*.sqlite3"))[:-YEDEK_GUNU]:
        old.unlink()


# main.py ile ayni ayarlari ve ayni gondericiyi kullanir.
def run(settings: Settings | None = None, mailer: Mailer | None = None, today: date | None = None) -> None:
    """Gece bakiminin uc isini sirayla yapar."""
    settings = settings or load_settings()
    store = MessageStore(settings.db_path)
    sent = retry(store, mailer or build_mailer(settings))
    purged = store.purge(settings.keep_days)
    backup(store, settings.db_path.parent / "backups", today or date.today())
    log.info("bakim bitti: %s bildirim gonderildi, %s mesaj silindi", sent, purged)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run()
