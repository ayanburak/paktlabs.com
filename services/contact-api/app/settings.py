"""
file: settings.py
importable: Settings, load_settings

Servisin butun ayarlari ortam degiskenlerinden okunur. Sunucuda systemd
bunlari /opt/paktlabs-api/.env dosyasindan yukler. Lokalde yalnizca
CONTACT_MAILER=console vermek yeter: veritabani klasordeki data altina
yazilir, e-posta gonderilmez, terminale yazilir. Varsayilan smtp oldugu
icin SMTP ayari eksik bir servis acilirken hata verir.

    CONTACT_DB_PATH      veritabani dosyasi, varsayilan data/messages.sqlite3
    CONTACT_MAIL_TO      bildirimin gidecegi adres, varsayilan info@paktlabs.com
    CONTACT_KEEP_DAYS    mesajlarin kac gun saklanacagi, varsayilan 730
    CONTACT_MAILER       smtp ya da console, varsayilan smtp
    SMTP_HOST            smtp iken zorunlu
    SMTP_PORT            varsayilan 465, SSL ile baglanilir
    SMTP_USER            smtp iken zorunlu, gonderen hesap, From adresi de budur
    SMTP_PASSWORD        smtp iken zorunlu

description: Iletisim servisinin ayarlarini ortam degiskenlerinden okuyan modul.
"""

import os
from collections.abc import Mapping
from dataclasses import dataclass
from pathlib import Path
from typing import Literal, get_args

# Iki yil. Formun altindaki bilgilendirme metni bu sureyi soyler, degisirse
# metin de degismeli.
DEFAULT_KEEP_DAYS = 730

MailerKind = Literal["smtp", "console"]


# Ayarlar bir kez okunur ve degismez, servis calisirken bir ayar degisirse
# servis yeniden baslatilir.
@dataclass(frozen=True)
class Settings:
    """Servisin calisma ayarlari.

    mailer console ise e-posta gonderilmez, bildirim terminale yazilir.
    smtp ise smtp_host, smtp_user ve smtp_password build_mailer tarafindan
    zorunlu tutulur.
    """

    db_path: Path
    mail_to: str
    keep_days: int
    mailer: MailerKind
    smtp_host: str | None
    smtp_port: int
    smtp_user: str | None
    smtp_password: str | None


# env parametresi testlerde sahte ortam vermek icin var, varsayilan gercek
# ortam degiskenleridir.
def load_settings(env: Mapping[str, str] = os.environ) -> Settings:
    """Ortam degiskenlerinden ayarlari okur.

    Args:
        env: Okunacak degiskenler, verilmezse surecin kendi ortami.

    Returns:
        Okunan ayarlar, eksik olanlar varsayilan degerleriyle.

    Raises:
        ValueError: CONTACT_MAILER smtp ya da console degilse.
    """
    mailer = env.get("CONTACT_MAILER", "smtp")
    if mailer not in get_args(MailerKind):
        raise ValueError(f"CONTACT_MAILER smtp ya da console olmali, gelen: {mailer!r}")
    return Settings(
        db_path=Path(env.get("CONTACT_DB_PATH", "data/messages.sqlite3")),
        mail_to=env.get("CONTACT_MAIL_TO", "info@paktlabs.com"),
        keep_days=int(env.get("CONTACT_KEEP_DAYS", DEFAULT_KEEP_DAYS)),
        mailer=mailer,
        smtp_host=env.get("SMTP_HOST") or None,
        smtp_port=int(env.get("SMTP_PORT", "465")),
        smtp_user=env.get("SMTP_USER") or None,
        smtp_password=env.get("SMTP_PASSWORD") or None,
    )
