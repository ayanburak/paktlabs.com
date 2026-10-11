"""
file: maintenance.py
importable: run

Gece bakimi. Sunucuda systemd zamanlayicisi her gece calistirir:

    python -m app.maintenance

Sirasiyla saklama suresini gecen mesajlari siler, veritabaninin bir kopyasini
data/backups altina yazar ve en son bildirimi gonderilememis mesajlari
yeniden dener. Son on dort gunun kopyalari kalir.

description: Iletisim mesajlarinin gece bakimini yapan komut.
"""

# NOTE: Ilk iki is yereldir, ag gerektirmez. Posta tarafinin cokmesi silmeyi
# ve yedegi engellemesin diye yeniden deneme en sona konur. Silme iki yillik
# saklama sozunun kendisidir. Yeniden deneme basarisiz olursa bakim bitince
# hata firlatilir, boylece systemd servisi basarisiz gorunur.
#
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
BACKUP_DAYS = 14


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
    for old in sorted(folder.glob("messages-*.sqlite3"))[:-BACKUP_DAYS]:
        old.unlink()


# main.py ile ayni ayarlari ve ayni gondericiyi kullanir. Gonderici kurulumu ve
# yeniden deneme kendi icinde yakalanip loglanir, silme ve yedek her durumda
# calisir.
def run(settings: Settings | None = None, mailer: Mailer | None = None, today: date | None = None) -> None:
    """Gece bakiminin uc isini sirayla yapar.

    Raises:
        RuntimeError: Gonderici kurulamadiysa ya da yeniden deneme coktuyse,
            silme ve yedek yine de yapilmis olarak.
    """
    settings = settings or load_settings()
    store = MessageStore(settings.db_path)
    purged = store.purge(settings.keep_days)
    backup(store, settings.db_path.parent / "backups", today or date.today())
    try:
        sent = retry(store, mailer or build_mailer(settings))
    except Exception as error:
        log.exception("bildirimler yeniden denenemedi")
        raise RuntimeError("bakimin yeniden deneme adimi basarisiz oldu") from error
    log.info("bakim bitti: %s mesaj silindi, %s bildirim gonderildi", purged, sent)


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    run()
