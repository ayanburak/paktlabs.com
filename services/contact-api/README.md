# contact-api

Bu servis, `paktlabs.com/contact` adresindeki iletişim formundan gelen mesajları alır, denetler, saklar ve info@paktlabs.com adresine bildirim olarak iletir. PaktLabs vitrininin tek backend'idir. Bir portföy uygulaması olmadığı için ayrı bir repoda değil landing'le aynı repoda durur: form ile servis aynı mesaj şeklini konuşur, biri değişince öteki aynı commit'te değişir.

Servis FastAPI ile yazılmıştır ve mesajları tek bir SQLite dosyasında tutar. Ayrı bir veritabanı sunucusu kurulmaz, çünkü trafik bir iletişim formununkidir ve tek bir dosya hem yedeklemeyi hem taşımayı kolaylaştırır.

## Adresler

Servis dışarıya iki adres açar. `POST /api/contact` formdan gelen mesajı alır, başarıda gövdesiz 204 döner. Mesaj denetimden geçmezse 422 döner. `GET /api/health` servisin ayakta olduğunu söyler, yayın script'i yeni sürümden sonra buna bakar. FastAPI'nin belge sayfaları kapalıdır.

Mesajın şekli `app/schema.py` içindedir. Üç seçim, yani alan, durum ve zaman, landing'deki `apps/landing/src/routes/Contact/questions.ts` ile aynı kimlikleri taşır. İki dil farklı olduğu için ortak tek bir dosya yoktur, bunun yerine `tests/test_contract.py` iki listenin aynı kaldığını denetler. Landing'e yeni bir seçenek eklenip servise eklenmezse bu test kırılır. Ad, e-posta ve açıklama uzunluklarıyla, e-posta da landing'deki kuralla denetlenir. Ad ve e-posta bildirim e-postasının başlıklarına girdiği için satır sonu taşıyan değer reddedilir. Tanımlanmamış bir alan isteği reddettirir, böylece form ile servis arasındaki anlaşma sessizce kaymaz.

Formda insanın göremediği bir tuzak alan, `website`, bulunur. Formları otomatik dolduran botlar onu doldurur. Dolu gelirse servis yine 204 döner ki bot yakalandığını anlamasın, ama mesaj kaydedilmez ve iletilmez.

## Kayıt ve bildirim

Geçerli mesaj önce veritabanına yazılır, sonra cevap döner, bildirim cevaptan sonra arka planda gönderilir. Böylece ziyaretçi posta sunucusunu beklemez. Bildirim gönderilemezse mesaj kayıtta işaretsiz kalır ve gece bakımında yeniden denenir, hiçbir mesaj posta sunucusunun bir anlık sorunu yüzünden kaybolmaz.

Bildirimi gönderen parça `app/mailer.py` içindeki `Mailer` soyut sınıfıdır. Sunucuda `SmtpMailer` Hostinger'ın posta sunucusuna 465 portundan SSL ile bağlanır ve info@paktlabs.com hesabıyla gönderir. Bildirimin Reply-To adresi ziyaretçinin e-postasıdır, gelen bildirimde Yanıtla'ya basmak doğrudan ziyaretçiye yazar. SMTP ayarı verilmediğinde `ConsoleMailer` bildirimi yalnızca kayda yazar, yerelde ve testlerde bu kullanılır. Seçimler bildirimde kimlik olarak yazılır, Türkçe adlarının ikinci bir kopyası serviste tutulmaz.

Ziyaretçinin IP adresi kaydedilmez. Gönderim sınırını nginx tutar, servisin IP'ye ihtiyacı yoktur ve saklanan kişisel veri azalır. Ziyaretçiye otomatik bir yanıt e-postası gönderilmez, çünkü forma başkasının adresini yazan biri o adrese istenmeyen posta yollatabilirdi.

## Gece bakımı

`app/maintenance.py` her gece 03:30'da çalışır. Önce bildirimi gönderilememiş mesajları yeniden dener, sonra saklama süresini geçen mesajları siler, en son veritabanının tutarlı bir kopyasını `data/backups` altına yazar. Saklama süresi iki yıldır, formun altındaki bilgilendirme metni bu süreyi söyler. Yedeklerin son on dördü kalır, böylece silinen bir mesaj en fazla iki hafta daha bir yedekte durur.

## Ayarlar

Ayarlar ortam değişkenlerinden okunur, hangi değişkenlerin olduğu `.env.example` içinde görülür. Sunucuda systemd bunları `/opt/paktlabs-api/.env` dosyasından yükler. Bu dosya e-posta şifresini taşır, repoya girmez ve yalnızca root ile servisin kullanıcısı okuyabilir. Yerelde hiçbir ayar verilmeden de çalışılır: veritabanı `data/messages.sqlite3` olur, bildirim terminale yazılır.

## Yerelde çalıştırma

Python ortamı servisin klasöründe kurulur. Sunucuda Python 3.10 vardır, kod bu sürümle uyumlu yazılır.

```bash
cd services/contact-api
python3 -m venv .venv
.venv/bin/pip install -r requirements-dev.txt
.venv/bin/uvicorn app.main:create_app --factory --reload --port 8001
```

Landing'in geliştirme sunucusu `/api` isteklerini 8001 portuna aktarır. İki terminalde servis ve `apps/landing` içinde `npm run dev` çalıştırıldığında form yerelde baştan sona denenir, gelen mesajın bildirimi servisin terminalinde görünür.

## Testler

```bash
.venv/bin/python -m pytest -q
```

Testler her seferinde geçici bir veritabanı ve sahte bir gönderici kullanır, hiçbiri gerçek e-posta göndermez. Geçerli mesajın kaydı ve bildirimi, reddedilen mesajlar, tuzak alan, posta sunucusu cevap vermediğinde mesajın kayıtta kalması, gece bakımının üç işi, bildirim e-postasının şekli ve landing'le seçimlerin aynı kalması denetlenir. CI testleri sunucudaki sürümle, Python 3.10 ile çalıştırır. Landing'in Playwright testleri servisi çalıştırmaz, `/api/contact` cevabını kendileri taklit eder.

## Sunucu ve yayın

Servis sunucuda `/opt/paktlabs-api` altında, giriş yapamayan `paktlabs-api` kullanıcısıyla, systemd'nin `paktlabs-api` servisi olarak çalışır ve yalnızca `127.0.0.1:8001` adresini dinler. Diskte yalnızca `data` klasörüne yazabilir. nginx `paktlabs.com` bloğunda yalnızca `/api/contact` ve `/api/health` adreslerini servise aktarır, aynı IP adresinden dakikada beşten fazla gönderimi 429 ile keser ve 16 KB'tan büyük istekleri kabul etmez. systemd ve nginx dosyalarının kaynağı `deploy/` klasöründedir, sunucudaki kurulum ayrı altyapı belgesinde anlatılır.

Yayın sitelerle aynı script'lerle yapılır, uygulamanın adı `api`'dir. Paket commit'lenmiş koddan üretilir ve yalnızca `app` klasörünü ve `requirements.txt`'yi taşır. Sunucuda sürüm klasörüne açılır, sürümün kendi Python ortamı kurulur, `current` symlink'i yeni sürüme çevrilir ve servis yeniden başlatılır. Servis sağlık adresine cevap vermezse script önceki sürüme kendiliğinden döner ve hata verir. Her sürüm kendi Python ortamını taşıdığı için eski bir sürüme dönüldüğünde onun paketleri de geri gelir.

```bash
scripts/build-release.sh api
scripts/deploy-release.sh api release/api-<zaman>-<commit>.tar.gz
scripts/rollback-release.sh api            # sürümleri listeler
scripts/rollback-release.sh api <sürüm>    # o sürüme döner ve servisi yeniden başlatır
```
