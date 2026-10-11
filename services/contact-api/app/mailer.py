"""
file: mailer.py
importable: Mailer, SmtpMailer, ConsoleMailer, compose, build_mailer

Yeni bir mesaj geldiginde bildirimi ileten parca. Servis Mailer soyut
sinifina baglidir, sunucuda SmtpMailer gercek e-posta gonderir, lokalde ve
testlerde ConsoleMailer bildirimi yalnizca kayda yazar. Hangisinin
kullanilacagi ayarlardaki SMTP_HOST'a gore build_mailer ile secilir, servis
ve gece bakimi ayni secimi kullanir.

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

    def __init__(self, host: str, port: int, user: str, password: str, recipient: str) -> None:
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.recipient = recipient

    def send(self, contact: ContactIn, message_id: int) -> None:
        mail = compose(contact, message_id, self.user, self.recipient)
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(self.host, self.port, context=context, timeout=20) as smtp:
            smtp.login(self.user, self.password)
            smtp.send_message(mail)


# Lokalde e-posta ayari verilmediginde bildirim terminalde gorunur. Gercek
# e-postanin govdesi kodlanmis gider, burada okunabilsin diye basliklar ve
# govde duz metin olarak yazilir.
class ConsoleMailer(Mailer):
    """Bildirimi gondermez, kayda yazar."""

    def __init__(self, recipient: str) -> None:
        self.recipient = recipient

    def send(self, contact: ContactIn, message_id: int) -> None:
        mail = compose(contact, message_id, "contact-api@localhost", self.recipient)
        headers = "\n".join(f"{key}: {mail[key]}" for key in ("To", "Reply-To", "Subject"))
        log.info("bildirim gonderilmedi, SMTP ayari yok:\n%s\n\n%s", headers, mail.get_content())


# Ayarlarda SMTP sunucusu yoksa bildirim terminale yazilir. Sunucu varsa
# kullanici ve sifre de olmali, eksikse servis acilirken hata verir ki eksik
# ayar canlida sessizce kalmasin.
def build_mailer(settings: Settings) -> Mailer:
    """Ayarlara gore gondericiyi secer.

    Raises:
        ValueError: SMTP sunucusu verilmis ama kullanici ya da sifre eksikse.
    """
    if not settings.smtp_host:
        return ConsoleMailer(settings.mail_to)
    if not settings.smtp_user or not settings.smtp_password:
        raise ValueError("SMTP_HOST verilmis ama SMTP_USER ya da SMTP_PASSWORD eksik")
    return SmtpMailer(settings.smtp_host, settings.smtp_port, settings.smtp_user, settings.smtp_password, settings.mail_to)
