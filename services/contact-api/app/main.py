"""
file: main.py
importable: create_app

Iletisim servisinin kendisi. Iki adres sunar: POST /api/contact formdan
gelen mesaji alir, GET /api/health servisin ayakta oldugunu soyler.
Sunucuda ve lokalde uvicorn uygulamayi create_app'i cagirarak kurar, testler
create_app'e kendi deposunu ve gondericisini verir.

    uvicorn app.main:create_app --factory --port 8001

    POST /api/contact   204 alindi, 422 mesaj denetimden gecmedi
    GET  /api/health    200 {"status": "ok"}

description: Iletisim formunun mesajlarini alip kaydeden ve bildiren FastAPI uygulamasi.
"""

# NOTE: Bildirim cevaptan sonra arka planda gonderilir, ziyaretci posta
# sunucusunu beklemez. Gonderim basarisiz olursa mesaj kayitta kalir ve
# isaretlenmez, maintenance.py gece yeniden dener.
#
# NOTE: Belge sayfalari, yani docs ve openapi, kapali. Disariya acik tek sey
# bu iki adres.

import logging

from fastapi import BackgroundTasks, FastAPI, Response

from .mailer import Mailer, build_mailer
from .schema import ContactIn
from .settings import Settings, load_settings
from .store import MessageStore

log = logging.getLogger("contact")


# Depo ve gonderici disaridan verilebilir, verilmezse ayarlardan kurulur.
# Testler sahte bir gonderici ve gecici bir veritabani verir.
def create_app(settings: Settings | None = None, store: MessageStore | None = None, mailer: Mailer | None = None) -> FastAPI:
    """Servisi kurar.

    Args:
        settings: Ayarlar, verilmezse ortam degiskenlerinden okunur.
        store: Mesaj deposu, verilmezse ayarlardaki dosyayla kurulur.
        mailer: Gonderici, verilmezse ayarlara gore secilir.

    Returns:
        Calismaya hazir FastAPI uygulamasi.
    """
    # Servisin kendi kayitlari, bildirim hatalari gibi, uvicorn'un
    # kayitlariyla ayni yere yazilir. Daha once kurulmussa dokunmaz.
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    settings = settings or load_settings()
    store = store or MessageStore(settings.db_path)
    mailer = mailer or build_mailer(settings)
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

    # Hata disari tasmaz, cevap zaten donmus durumda. Kayit isaretlenmeden
    # kalir ve gece yeniden denenir.
    def notify(message_id: int, contact: ContactIn) -> None:
        try:
            mailer.send(contact, message_id)
        except Exception:
            log.exception("mesaj %s bildirilemedi, gece yeniden denenecek", message_id)
            return
        store.mark_mailed(message_id)

    # Tuzak alan dolu gelirse bot oldugu varsayilir. Ayni 204 doner ki bot
    # yakalandigini anlamasin, ama mesaj kaydedilmez.
    @app.post("/api/contact", status_code=204)
    def contact(message: ContactIn, tasks: BackgroundTasks) -> Response:
        if message.website:
            log.info("tuzak alan dolu, mesaj kaydedilmedi")
            return Response(status_code=204)
        message_id = store.add(message)
        tasks.add_task(notify, message_id, message)
        return Response(status_code=204)

    # Yayin script'i yeni surumden sonra buraya bakar.
    @app.get("/api/health")
    def health() -> dict[str, str]:
        return {"status": "ok"}

    return app
