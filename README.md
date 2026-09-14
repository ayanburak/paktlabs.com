# PaktLabs

PaktLabs bağımsız bir yazılım stüdyosudur. Bu repo, `paktlabs.com` adresinde yayınlanan landing sayfasının kaynağıdır. Sayfa React ve Vite ile yazılmış statik bir uygulamadır, derlenen çıktı nginx tarafından sunulur. Şu an bir backend bulunmaz.

## Kapsam

Repo yalnızca landing sayfasını içerir. Disiplin bağlantıları ayrı subdomain'lere gider:

- `https://web.paktlabs.com`
- `https://automation.paktlabs.com`
- `https://data.paktlabs.com`

Bu adresler `frontend/src/content/disciplines.ts` içinde tek yerde tutulur. Üst menü, mobil menü, disiplin kartları, iş kapsamı bantları ve alt menü aynı kaynağı kullanır. Adres değiştiğinde yalnızca bu dosya güncellenir. Subdomain'lerin DNS, sertifika ve uygulama kurulumu bu reponun işi değildir.

Landing içinde `/web`, `/automation` veya `/data` gibi alt sayfalar tanımlanmaz. Uygulamada tek bir rota vardır. İletişim formu bir backend'e bağlı değildir, gönder düğmesi bilinçli olarak işlem yapmaz. Doğrudan iletişim için sayfadaki e-posta bağlantısı kullanılır.

## Dil

Arayüz Türkçe ve İngilizcedir. Metinler `frontend/src/i18n/tr.json` ve `en.json` dosyalarında durur. İki sözlüğün aynı şekle sahip olması TypeScript tarafından denetlenir, bir dilde eksik anahtar derleme hatası verir.

İlk ziyarette dil Türkçedir. Değiştiriciyle yapılan seçim tarayıcının `localStorage` alanına `pl_lang` anahtarıyla yazılır. Tarayıcı depolamayı engellese veya depolama dolu olsa da dil değiştirme çalışır, yalnızca seçim bir sonraki ziyarete taşınmaz. Cookie, IP tabanlı dil seçimi ve dile özel URL henüz kurulmamıştır. `localStorage` origin'e bağlı olduğu için landing'de yapılan seçim subdomain'lere otomatik geçmez.

Sayfa başlığı ve açıklaması `index.html` içinde Türkçe olarak yazılıdır. Dil değiştiğinde başlık, açıklama ve `html lang` JavaScript ile güncellenir. Ayrı bir İngilizce adres olmadığı için arama motorlarının İngilizce metni ayrıca indekslediği varsayılmaz. Bu nedenle `hreflang`, sitemap ve Open Graph görseli eklenmemiştir. Türkçe başlık veya açıklama değiştirildiğinde hem `index.html` hem `tr.json` güncellenir.

## Tasarım kararları

Bütün stiller elle yazılmıştır, utility CSS framework'ü kullanılmaz. Ortak renk ve boşluklar `frontend/src/styles/tokens.css`, taban stiller `global.css`, bileşene özel stiller bileşenin yanındaki `.module.css` dosyalarında durur.

İllüstrasyonların zemin çizgileri bölüm sınırlarına göre elle hizalanmıştır. İş kapsamı bantlarındaki görsellerin zemin kaydırması `translate`, belirme animasyonu ise ayrı `transform` özelliğiyle taşınır. Böylece animasyon kaldırılsa da yerleşim değişmez. Figürlerin bölüm çizgisinin altına taşan ayak gibi parçaları kırpılacak fazlalık değildir.

Küçük soluk metinler için kullanılan `--faint` rengi, sayfanın açık zeminlerinin hepsinde en az 4.5 kontrast oranı verecek şekilde koyulaştırılmıştır. Otomasyon ve Web bantlarının büyük başlıkları marka renginde bırakılmıştır. Ölçülen oranlar sırasıyla 1.54 ve 2.56'dır, büyük metin için önerilen 3 değerinin altındadır. Bu bilinen ve kabul edilmiş bir tasarım istisnasıdır.

## Tarayıcı desteği

Doğrulamalar Linux üzerinde Chromium ile yapılmıştır. Firefox, Safari ve gerçek iPad veya telefon üzerinde test yapılmamıştır.

Medya sorguları klasik `min-width` ve `max-width` biçiminde yazılır. `(768px < width <= 1900px)` gibi range sözdizimi Safari 16.4, Chrome 104 ve Firefox 63 öncesinde desteklenmez, desteklenmeyen tarayıcıda kuralın tamamı sessizce yok sayılır. Aynı nedenle `frontend/vite.config.ts` içinde `build.cssMinify` kapalıdır, çünkü varsayılan minifier klasik sorguları derleme sırasında range sözdizimine çevirir.

## Geliştirme

Komutlar `frontend` klasöründe çalıştırılır. Node.js 24 kullanılır.

```bash
cd frontend
npm ci
npm run dev          # http://localhost:5173
npm run lint
npm run typecheck
npm run build        # dist/ klasörüne üretim derlemesi
```

## Testler

Testler Playwright ile üretim derlemesine karşı çalışır. Davranış testleri dil seçimini, bağlantıları, erişilebilirlik davranışlarını, görsel dosya seçimini ve responsive yerleşimi kapsar. Görsel testler onaylı görünümün tam sayfa ekran görüntüleriyle karşılaştırılmasıdır.

```bash
cd frontend
npx playwright install chromium   # yalnızca ilk kurulumda
npm test
npm run test:visual
```

Test koşulları, toleranslar ve testlerin neyi kanıtlamadığı `frontend/tests/README.md` içinde anlatılır.

GitHub Actions her push ve pull request'te lint, tip kontrolü ve davranış testlerini çalıştırır. Görsel testler CI'da çalıştırılmaz, çünkü referans görüntüler yerel font çizimiyle alınmıştır ve farklı bir runner'da yanlış alarm üretir.

`docs/visual-baseline/` klasörü, responsive düzeltmelerden önceki durumun `257ed79` commit'inden alınmış arşiv kaydıdır. Güncel referanslar `frontend/tests/visual.spec.ts-snapshots/` altında durur. Arşiv yeni görüntülerle değiştirilmez.

Dile özel illüstrasyon dosyalarının nasıl ekleneceği `docs/illustrations.md` içinde anlatılır.

## Dağıtım

Üretim derlemesi sunucuda `/var/www/paktlabs` dizinine kopyalanır ve nginx tarafından sunulur. Sunucu kurulumu ve dağıtım adımları ayrı bir altyapı reposunda belgelenir. GitHub'a push yapılması canlı sitenin güncellendiği anlamına gelmez, canlıya alım ayrı ve elle yapılan bir adımdır. Mevcut dağıtım atomik değildir, sıkıştırma ve geri dönüşü olan bir yayın düzeni henüz kurulmamıştır.
