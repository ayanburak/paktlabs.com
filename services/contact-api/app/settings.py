"""
file: settings.py
importable: Settings, load_settings

Servisin butun ayarlari ortam degiskenlerinden okunur. Sunucuda systemd
bunlari /opt/paktlabs-api/.env dosyasindan yukler, lokalde hic biri
verilmese de servis calisir: veritabani klasordeki data altina yazilir,
e-posta gonderilmez, terminale yazilir.

    CONTACT_DB_PATH      veritabani dosyasi, varsayilan data/messages.sqlite3
    CONTACT_MAIL_TO      bildirimin gidecegi adres, varsayilan info@paktlabs.com
    CONTACT_KEEP_DAYS    mesajlarin kac gun saklanacagi, varsayilan 730
    SMTP_HOST            verilmezse e-posta gonderilmez
    SMTP_PORT            varsayilan 465, SSL ile baglanilir
    SMTP_USER            gonderen hesap, From adresi de budur
    SMTP_PASSWORD

description: Iletisim servisinin ayarlarini ortam degiskenlerinden okuyan modul.
"""

import os
from collections.abc import Mapping
from dataclasses import dataclass
from pathlib import Path

# Iki yil. Formun altindaki bilgilendirme metni bu sureyi soyler, degisirse
# metin de degismeli.
VARSAYILAN_SAKLAMA_GUNU = 730


# Ayarlar bir kez okunur ve degismez, servis calisirken bir ayar degisirse
# servis yeniden baslatilir.
@dataclass(frozen=True)
class Settings:
    """Servisin calisma ayarlari.

    smtp_host bos ise e-posta gonderilmez, bildirim terminale yazilir.
    """

    db_path: Path
    mail_to: str
    keep_days: int
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
    """
    return Settings(
        db_path=Path(env.get("CONTACT_DB_PATH", "data/messages.sqlite3")),
        mail_to=env.get("CONTACT_MAIL_TO", "info@paktlabs.com"),
        keep_days=int(env.get("CONTACT_KEEP_DAYS", VARSAYILAN_SAKLAMA_GUNU)),
        smtp_host=env.get("SMTP_HOST") or None,
        smtp_port=int(env.get("SMTP_PORT", "465")),
        smtp_user=env.get("SMTP_USER") or None,
        smtp_password=env.get("SMTP_PASSWORD") or None,
    )
