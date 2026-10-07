# PaktLabs

PaktLabs bağımsız bir yazılım stüdyosudur. Bu repo, `paktlabs.com` adresinde yayınlanan landing sayfasının kaynağıdır. Sayfa React ve Vite ile yazılmış statik bir uygulamadır, derlenen çıktı nginx tarafından sunulur. Şu an bir backend bulunmaz.

## Kapsam

Repo yalnızca landing sayfasını içerir. Disiplin bağlantıları ayrı subdomain'lere gider:

- `https://web.paktlabs.com`
- `https://automation.paktlabs.com`
- `https://data.paktlabs.com`

Bu adresler `packages/brand/content/disciplines.ts` içinde tek yerde tutulur. Landing'in üst menüsü, mobil menüsü, disiplin kartları, iş kapsamı bantları ve alt menüsü ile disiplin sitelerinin üst barı aynı kaynağı kullanır. Adres değiştiğinde yalnızca bu dosya güncellenir. Subdomain'lerin DNS, sertifika ve uygulama kurulumu bu reponun işi değildir.

Landing içinde `/web`, `/automation` veya `/data` gibi alt sayfalar tanımlanmaz. Uygulamada tek bir rota vardır. İletişim formu bir backend'e bağlı değildir, gönder düğmesi bilinçli olarak işlem yapmaz. Doğrudan iletişim için sayfadaki e-posta bağlantısı kullanılır.

## Dil

Arayüz Türkçe ve İngilizcedir. Metinler iki katmanda durur. Üst bar, alt bilgi ve menü etiketleri gibi bütün PaktLabs sitelerinde aynı kalan metinler `packages/brand/i18n/tr.json` ve `en.json` dosyalarındadır. Landing'e özel metinler `apps/landing/src/i18n/tr.json` ve `en.json` dosyalarındadır. Böylece ortak bir menü etiketi tek yerde değişir, her site yalnızca kendi sayfalarının metnini taşır. Her katmanda iki sözlüğün aynı şekle sahip olması TypeScript tarafından denetlenir, bir dilde eksik anahtar derleme hatası verir.

İlk ziyarette dil Türkçedir. Değiştiriciyle yapılan seçim tarayıcının `localStorage` alanına `pl_lang` anahtarıyla yazılır. Tarayıcı depolamayı engellese veya depolama dolu olsa da dil değiştirme çalışır, yalnızca seçim bir sonraki ziyarete taşınmaz. Cookie, IP tabanlı dil seçimi ve dile özel URL henüz kurulmamıştır. `localStorage` origin'e bağlı olduğu için landing'de yapılan seçim subdomain'lere otomatik geçmez.

Sayfa başlığı ve açıklaması `index.html` içinde Türkçe olarak yazılıdır. Dil değiştiğinde başlık, açıklama ve `html lang` JavaScript ile güncellenir. Ayrı bir İngilizce adres olmadığı için arama motorlarının İngilizce metni ayrıca indekslediği varsayılmaz. Bu nedenle `hreflang`, sitemap ve Open Graph görseli eklenmemiştir. Türkçe başlık veya açıklama değiştirildiğinde hem `index.html` hem landing'in `tr.json` dosyası güncellenir.

## Tasarım kararları

Bütün stiller elle yazılmıştır, utility CSS framework'ü kullanılmaz. Bütün PaktLabs sitelerinin paylaştığı renk ve boşluklar `packages/brand/styles/tokens.css`, taban stiller aynı klasördeki `global.css` dosyasında durur. Böylece landing ve disiplin subdomain'leri tek bir tasarım kaynağından beslenir, bir renk değiştiğinde bütün siteler birlikte değişir. Bileşene özel stiller bileşenin yanındaki `.module.css` dosyalarında durur.

İllüstrasyonların zemin çizgileri bölüm sınırlarına göre elle hizalanmıştır. İş kapsamı bantlarındaki görsellerin zemin kaydırması `translate`, belirme animasyonu ise ayrı `transform` özelliğiyle taşınır. Böylece animasyon kaldırılsa da yerleşim değişmez. Figürlerin bölüm çizgisinin altına taşan ayak gibi parçaları kırpılacak fazlalık değildir.

Küçük soluk metinler için kullanılan `--faint` rengi, sayfanın açık zeminlerinin hepsinde en az 4.5 kontrast oranı verecek şekilde koyulaştırılmıştır. Otomasyon ve Web bantlarının büyük başlıkları marka renginde bırakılmıştır. Ölçülen oranlar sırasıyla 1.54 ve 2.56'dır, büyük metin için önerilen 3 değerinin altındadır. Bu bilinen ve kabul edilmiş bir tasarım istisnasıdır.

## Tarayıcı desteği

Doğrulamalar Linux üzerinde Chromium ile yapılmıştır. Firefox, Safari ve gerçek iPad veya telefon üzerinde test yapılmamıştır.

Medya sorguları klasik `min-width` ve `max-width` biçiminde yazılır. `(768px < width <= 1900px)` gibi range sözdizimi Safari 16.4, Chrome 104 ve Firefox 63 öncesinde desteklenmez, desteklenmeyen tarayıcıda kuralın tamamı sessizce yok sayılır. Aynı nedenle `apps/landing/vite.config.ts` içinde `build.cssMinify` kapalıdır, çünkü varsayılan minifier klasik sorguları derleme sırasında range sözdizimine çevirir.

## Geliştirme

Repo npm workspaces ile kurulur. Bağımlılıklar kökte tek bir `package-lock.json` ile kilitlenir ve kökteki tek `node_modules` altına kurulur, bu yüzden `npm ci` kökte çalıştırılır. Uygulama komutları uygulamanın kendi klasöründe çalıştırılır. Node.js 24 kullanılır.

```bash
npm ci
cd apps/landing
npm run dev          # http://localhost:5173
npm run lint
npm run typecheck
npm run build        # dist/ klasörüne üretim derlemesi
```

## Testler

Testler Playwright ile üretim derlemesine karşı çalışır. Davranış testleri dil seçimini, bağlantıları, erişilebilirlik davranışlarını, görsel dosya seçimini ve responsive yerleşimi kapsar. Görsel testler onaylı görünümün tam sayfa ekran görüntüleriyle karşılaştırılmasıdır.

```bash
cd apps/landing
npx playwright install chromium   # yalnızca ilk kurulumda
npm test
npm run test:visual
```

Test koşulları, toleranslar ve testlerin neyi kanıtlamadığı `apps/landing/tests/README.md` içinde anlatılır.

GitHub Actions her push ve pull request'te lint, tip kontrolü ve davranış testlerini çalıştırır. Görsel testler CI'da çalıştırılmaz, çünkü referans görüntüler yerel font çizimiyle alınmıştır ve farklı bir runner'da yanlış alarm üretir.

`docs/visual-baseline/` klasörü, responsive düzeltmelerden önceki durumun `257ed79` commit'inden alınmış arşiv kaydıdır. Güncel referanslar `apps/landing/tests/visual.spec.ts-snapshots/` altında durur. Arşiv yeni görüntülerle değiştirilmez.

Dile özel illüstrasyon dosyalarının nasıl ekleneceği `docs/illustrations.md` içinde anlatılır.

## Dağıtım

GitHub'a push yapılması canlı sitenin güncellendiği anlamına gelmez. Canlıya alım ayrı ve elle çalıştırılan iki adımdır: paketleme ve yayınlama.

Paket, commit'lenmiş kaynaktan üretilir. Script `git archive` ile verilen commit'ten yalnızca kökteki `package.json` ve `package-lock.json` dosyalarını, ortak `packages` klasörünü ve `apps/landing` klasörünü çıkarır, temiz bir ortamda `npm ci` ve landing'in build komutunu çalıştırır. Çalışma ağacındaki commit'lenmemiş bir değişiklik bu yüzden pakete giremez. HTML, JS, CSS ve SVG dosyalarının yanına önceden sıkıştırılmış `.gz` kopyaları eklenir, her dosyanın SHA256 özeti ve kaynak commit pakete yazılır.

```bash
scripts/build-release.sh            # HEAD'den release/paktlabs-<zaman>-<commit>.tar.gz üretir
scripts/build-release.sh <commit>   # belirli bir commit'ten üretir
```

Yayınlama, paketi sunucuda `/var/www/paktlabs-releases/<sürüm>/` altına açar ve özetleri doğrular. Nginx'in kök dizini olan `/var/www/paktlabs` bir symlink'tir. Yeni sürüme geçiş bu symlink'in tek bir rename işlemiyle çevrilmesidir, ziyaretçi hiçbir anda yarım kopyalanmış bir dizin görmez. Önceki sürümler yerinde kalır. Script son olarak canlı `index.html`'in yeni paketteki dosyaları gösterdiğini kontrol eder.

```bash
scripts/deploy-release.sh release/paktlabs-<zaman>-<commit>.tar.gz
```

Geri dönüşte symlink eski bir sürüme çevrilir, dosya kopyalanmaz ve hiçbir sürüm silinmez.

```bash
scripts/rollback-release.sh            # sürümleri ve aktif olanı listeler
scripts/rollback-release.sh <sürüm>    # o sürüme döner
```

Nginx `.gz` kopyalarını `gzip_static` ile hazır sunar. Hash'li dosyalar bir yıl ve değişmez olarak önbelleğe alınır, `index.html` her ziyarette yeniden doğrulanır. Böylece yeni bir sürüm, eski önbellekle karışmadan ilk yenilemede görünür. Eski sürümler birikince elle temizlenir, aktif sürüm ve geri dönüş için en az bir önceki sürüm saklanır. Sunucu tarafındaki kurulum ayrı bir altyapı belgesinde tutulur.
