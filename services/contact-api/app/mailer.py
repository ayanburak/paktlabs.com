"""
file: mailer.py
importable: Mailer, SmtpMailer, ConsoleMailer, compose, build_mailer

Yeni bir mesaj geldiginde bildirimi ileten parca. Servis Mailer soyut
sinifina baglidir, sunucuda SmtpMailer gercek e-posta gonderir, lokalde ve
testlerde ConsoleMailer bildirimi yalnizca kayda yazar. Hangisinin
kullanilacagi ayarlardaki CONTACT_MAILER'a gore build_mailer ile secilir,
servis ve gece bakimi ayni secimi kullanir.

description: Iletisim mesajinin bildirim e-postasini kuran ve ileten modul.
"""

# NOTE: Bildirimin Reply-To adresi ziyaretcinin e-postasidir, gelen
# bildirimde Yanitla'ya basmak dogrudan ziyaretciye yazar. From adresi
# gonderen hesabin kendisidir, baska bir adresle gondermek SPF ve DKIM
# denetiminden gecmezdi.

import logging
import smtplib
import ssl
from abc import ABC, abstractmethod
from email.message import EmailMessage

from .schema import ContactIn
from .settings import Settings

log = logging.getLogger("contact")


# Secimler kimlik olarak yazilir, Turkce adlari landing'in sozlugunde durur
# ve burada ikinci bir kopyasi tutulmaz.
def compose(contact: ContactIn, message_id: int, sender: str, recipient: str) -> EmailMessage:
    """Bir mesajdan bildirim e-postasini kurar.

    Args:
        contact: Gelen mesaj.
        message_id: Mesajin veritabanindaki kimligi, konuya yazilir.
        sender: From adresi.
        recipient: Bildirimin gidecegi adres.

    Returns:
        Gonderilmeye hazir e-posta.
    """
    mail = EmailMessage()
    mail["From"] = sender
    mail["To"] = recipient
    mail["Reply-To"] = contact.email
    mail["Subject"] = f"Yeni iletişim #{message_id}: {contact.name} · {contact.answers.area}"
    mail.set_content(
        "\n".join(
            [
                f"Alan:     {contact.answers.area}",
                f"Durum:    {contact.answers.stage}",
                f"Zaman:    {contact.answers.timing}",
                "",
                f"Ad:       {contact.name}",
                f"E-posta:  {contact.email}",
                f"Şirket:   {contact.company or '-'}",
                f"Dil:      {contact.language}",
                "",
                contact.message,
            ]
        )
    )
    return mail


# Bir hata disari firlatilir, cagiran taraf mesajin bildirilmedigini bilir
# ve kaydi isaretlemez, gece bakimi yeniden dener.
class Mailer(ABC):
    """Yeni bir mesajin bildirimini ileten parcanin soyut hali."""

    # Somut gondericiler hatayi yutmaz, yakalamak cagiran tarafin isidir.
    @abstractmethod
    def send(self, contact: ContactIn, message_id: int) -> None:
        """Mesajin bildirimini iletir.

        Raises:
            Exception: Bildirim iletilemezse.
        """


# Hostinger 465 portunda dogrudan SSL bekliyor. timeout, posta sunucusu
# cevap vermezse servisin arka plan isinin sonsuza kadar beklemesini onler.
class SmtpMailer(Mailer):
    """Bildirimi SMTP ile e-posta olarak gonderir."""

    # Kurulurken aga cikilmaz, baglanti ilk gonderimde acilir. Ayarlarin eksik
    # olup olmadigina build_mailer bakar.
    def __init__(self, host: str, port: int, user: str, password: str, recipient: str) -> None:
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.recipient = recipient

    # Her bildirim kendi baglantisini acip kapatir. Trafik dusuk, acik tutulan
    # bir baglanti arada zaman asimina ugrayip bir sonraki gonderimi bozardi.
    def send(self, contact: ContactIn, message_id: int) -> None:
        mail = compose(contact, message_id, self.user, self.recipient)
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(self.host, self.port, context=context, timeout=20) as smtp:
            smtp.login(self.user, self.password)
            smtp.send_message(mail)


# Lokalde CONTACT_MAILER=console verildiginde bildirim terminalde gorunur. Gercek
# e-postanin govdesi kodlanmis gider, burada okunabilsin diye basliklar ve
# govde duz metin olarak yazilir.
class ConsoleMailer(Mailer):
    """Bildirimi gondermez, kayda yazar."""

    # recipient yalnizca kayittaki To basliginda gorunsun diye tutulur.
    def __init__(self, recipient: str) -> None:
        self.recipient = recipient

    # compose gercek gondericiyle ayni, lokalde gorulen e-posta canlida
    # gidenin aynisidir.
    def send(self, contact: ContactIn, message_id: int) -> None:
        mail = compose(contact, message_id, "contact-api@localhost", self.recipient)
        headers = "\n".join(f"{key}: {mail[key]}" for key in ("To", "Reply-To", "Subject"))
        log.info("bildirim gonderilmedi, gonderici console:\n%s\n\n%s", headers, mail.get_content())


# Console yalnizca ayarda acikca istenirse secilir. smtp iken uc SMTP ayari
# da zorunludur, biri eksikse servis acilirken hata verir ki eksik ayar
# canlida bildirimleri sessizce yutmasin.
def build_mailer(settings: Settings) -> Mailer:
    """Ayarlara gore gondericiyi secer.

    Raises:
        ValueError: Gonderici smtp iken SMTP_HOST, SMTP_USER ya da SMTP_PASSWORD eksikse.
    """
    if settings.mailer == "console":
        return ConsoleMailer(settings.mail_to)
    missing = [
        name
        for name, value in (
            ("SMTP_HOST", settings.smtp_host),
            ("SMTP_USER", settings.smtp_user),
            ("SMTP_PASSWORD", settings.smtp_password),
        )
        if not value
    ]
    if missing:
        raise ValueError(f"CONTACT_MAILER smtp iken eksik ayar: {', '.join(missing)}")
    return SmtpMailer(settings.smtp_host, settings.smtp_port, settings.smtp_user, settings.smtp_password, settings.mail_to)
