# PaktLabs

PaktLabs bağımsız bir yazılım stüdyosudur. Bu repo, PaktLabs'ın vitrin sitelerinin kaynağıdır: `paktlabs.com` adresindeki landing sayfası ve disiplin subdomain'leri. Siteler React ve Vite ile yazılmış statik uygulamalardır, derlenen çıktı nginx tarafından sunulur. Şu an bir backend bulunmaz.

Siteler npm workspaces ile tek repoda durur, çünkü aynı stüdyonun parçalarıdır ve ziyaretçi bir siteden ötekine geçtiğinde aynı görünümle karşılaşmalıdır. Ortak üst bar, alt bilgi, renkler ve dil davranışı `packages/brand` paketindedir, ayrıntısı `packages/brand/README.md` içinde anlatılır. Her site `apps` altında kendi klasöründedir: landing `apps/landing`, veri disiplininin sitesi `apps/data`. data sitesinin sayfa türleri ve içerik kuralları `apps/data/README.md` içinde anlatılır. Bu belgenin geri kalanı landing'i anlatır.

Çalışan uygulamalar bu repoya girmez. Python servisleri, veritabanları ve gecelik işler kendi repolarında yazılır, sunucuda kendi servisleri olarak çalışır ve vitrin sitelerinden yalnızca bağlantıyla açılır. Böylece bir uygulamanın yayını vitrinin yayınına bağlanmaz, her uygulama da müşteriye kendi temiz reposuyla gösterilebilir.

## Kapsam

Landing alan bağımsızdır. Disiplin bağlantıları ayrı subdomain'lere gider:

- `https://web.paktlabs.com`
- `https://automation.paktlabs.com`
- `https://data.paktlabs.com`

Bu adresler `packages/brand/content/disciplines.ts` içinde tek yerde tutulur. Landing'in üst menüsü, mobil menüsü, disiplin kartları, iş kapsamı bantları ve alt menüsü ile disiplin sitelerinin üst barı aynı kaynağı kullanır. Adres değiştiğinde yalnızca bu dosya güncellenir. Subdomain'lerin DNS ve sertifika kurulumu bu reponun işi değildir, sunucu tarafında belgelenir. `web` ve `automation` subdomain'lerinin henüz sitesi ve DNS kaydı yoktur.

Landing içinde `/web`, `/automation` veya `/data` gibi alt sayfalar tanımlanmaz. Uygulamada tek bir rota vardır. Bunun dışında kalan her adreste sunucu, derlemenin ayrı bir girişi olan `404.html` dosyasını gerçek 404 koduyla döndürür. Bu dosya brand paketindeki ortak bulunamadı sayfasını landing'in üst barı ve alt bilgisiyle gösterir, böylece ziyaretçi sunucunun kendi hata sayfasını görmez. Derleme iki giriş taşıdığı halde CSS tek dosya olarak üretilir, çünkü Vite ortak stilleri ayrı bir parçaya ayırdığında global stiller bileşen stillerinden önce yüklenir ve brand'in istediği sıra bozulur. Sayfa, bütün PaktLabs sitelerinde ortak olan iletişim bölümüyle kapanır. Bölümde form bulunmaz, tek düğme ana sitenin `/contact` adresindeki iletişim sayfasına gider, altında e-posta adresi durur. Hero'daki ve üst bardaki İletişim bağlantıları da aynı adrese gider. İletişim sayfası henüz yazılmadığı için bu adres şimdilik bulunamadı sayfasını açar.

## Dil

Arayüz Türkçe ve İngilizcedir. Metinler iki katmanda durur. Üst bar, alt bilgi ve menü etiketleri gibi bütün PaktLabs sitelerinde aynı kalan metinler `packages/brand/i18n/tr.json` ve `en.json` dosyalarındadır. Landing'e özel metinler `apps/landing/src/i18n/tr.json` ve `en.json` dosyalarındadır. Böylece ortak bir menü etiketi tek yerde değişir, her site yalnızca kendi sayfalarının metnini taşır. Her katmanda iki sözlüğün aynı şekle sahip olması TypeScript tarafından denetlenir, bir dilde eksik anahtar derleme hatası verir.

İlk ziyarette dil Türkçedir. Değiştiriciyle yapılan seçim tarayıcının `localStorage` alanına `pl_lang` anahtarıyla yazılır. Tarayıcı depolamayı engellese veya depolama dolu olsa da dil değiştirme çalışır, yalnızca seçim bir sonraki ziyarete taşınmaz. Cookie, IP tabanlı dil seçimi ve dile özel URL henüz kurulmamıştır. `localStorage` origin'e bağlı olduğu için landing'de yapılan seçim subdomain'lere otomatik geçmez.

Sayfa başlığı ve açıklaması `index.html` içinde Türkçe olarak yazılıdır. Dil değiştiğinde başlık, açıklama ve `html lang` JavaScript ile güncellenir. Ayrı bir İngilizce adres olmadığı için arama motorlarının İngilizce metni ayrıca indekslediği varsayılmaz. Bu nedenle `hreflang`, sitemap ve Open Graph görseli eklenmemiştir. Türkçe başlık veya açıklama değiştirildiğinde hem `index.html` hem landing'in `tr.json` dosyası güncellenir.

## Tasarım kararları

Bütün stiller elle yazılmıştır, utility CSS framework'ü kullanılmaz. Bütün PaktLabs sitelerinin paylaştığı renk ve boşluklar `packages/brand/styles/tokens.css`, taban stiller aynı klasördeki `global.css` dosyasında durur. Böylece landing ve disiplin subdomain'leri tek bir tasarım kaynağından beslenir, bir renk değiştiğinde bütün siteler birlikte değişir. Bileşene özel stiller bileşenin yanındaki `.module.css` dosyalarında durur.

İllüstrasyonların zemin çizgileri bölüm sınırlarına göre elle hizalanmıştır. Masaüstü hero çizimi bunun dışındadır: zemine sabitlenmez, header'ın altında kalan alanın dikey ortasında havada durur ve sağ tarafa biraz yaklaştırılır. Bu masaüstü yerleşimi landing ile data hero'larında ortaktır ve `packages/brand/styles/HeroLayout.module.css` dosyasında bir kez yazılır. Siteler bu dosyayı hero bileşenlerinde import eder ve ortak sınıfları kendi sınıflarıyla birlikte verir, böylece ileride kurulacak web ve automation siteleri de aynı yerleşimle başlar ve iki hero birbirinden sessizce ayrışmaz. Çizimin en fazla yüksekliği `--hero-art-height`, sağa yaklaşma oranı `--hero-art-right-share` adıyla brand'in `tokens.css` dosyasında tutulur. Üst barın yüksekliği de aynı dosyada `--header-height` olarak durur ve hero'nun üst boşluğu bu değerden hesaplanır, üst bar değişirse hero'lar onunla birlikte kayar. Her site kendi `Hero.module.css` dosyasında yalnızca çiziminin oranını `--art-ratio` ile verir, çünkü her sitenin çizimi farklıdır. Mobil hero kendi kompozisyonuyla ayrıca yerleşir. İş kapsamı bantlarındaki görsellerin zemin kaydırması `translate`, belirme animasyonu ise ayrı `transform` özelliğiyle taşınır. Böylece animasyon kaldırılsa da yerleşim değişmez. Figürlerin bölüm çizgisinin altına taşan ayak gibi parçaları kırpılacak fazlalık değildir.

Küçük soluk metinler için kullanılan `--faint` rengi, sayfanın açık zeminlerinin hepsinde en az 4.5 kontrast oranı verecek şekilde koyulaştırılmıştır. Otomasyon ve Web bantlarının büyük başlıkları marka renginde bırakılmıştır. Ölçülen oranlar sırasıyla 1.54 ve 2.56'dır, büyük metin için önerilen 3 değerinin altındadır. Bu bilinen ve kabul edilmiş bir tasarım istisnasıdır.

## Tarayıcı desteği

Doğrulamalar Linux üzerinde Chromium ile yapılmıştır. Firefox, Safari ve gerçek iPad veya telefon üzerinde test yapılmamıştır.

Medya sorguları klasik `min-width` ve `max-width` biçiminde yazılır. `(768px < width <= 1900px)` gibi range sözdizimi Safari 16.4, Chrome 104 ve Firefox 63 öncesinde desteklenmez, desteklenmeyen tarayıcıda kuralın tamamı sessizce yok sayılır. Aynı nedenle `apps/landing/vite.config.ts` içinde `build.cssMinify` kapalıdır, çünkü varsayılan minifier klasik sorguları derleme sırasında range sözdizimine çevirir.

## Geliştirme

Repo npm workspaces ile kurulur. Bağımlılıklar kökte tek bir `package-lock.json` ile kilitlenir ve kökteki tek `node_modules` altına kurulur, bu yüzden `npm ci` kökte çalıştırılır. Uygulama komutları uygulamanın kendi klasöründe çalıştırılır. Node.js 24 kullanılır.

```bash
npm ci
npm run lint         # bütün uygulamaları ve ortak paketi tek seferde tarar
cd apps/landing
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # dist/ klasörüne üretim derlemesi
```

Lint kökte çalışır ve tek bir `.oxlintrc.json` kullanır, böylece hiçbir uygulamanın import etmediği ortak paket dosyaları da taranır. Ortak paketin tip kontrolü `packages/brand` içinde `npm run typecheck` ile ayrıca yapılır, aynı nedenle.

## Testler

Testler Playwright ile üretim derlemesine karşı çalışır. Davranış testleri dil seçimini, bağlantıları, erişilebilirlik davranışlarını, görsel dosya seçimini ve responsive yerleşimi kapsar. Görsel testler onaylı görünümün tam sayfa ekran görüntüleriyle karşılaştırılmasıdır.

```bash
cd apps/landing
npx playwright install chromium   # yalnızca ilk kurulumda
npm test
npm run test:visual
```

Test koşulları, toleranslar ve testlerin neyi kanıtlamadığı `apps/landing/tests/README.md` içinde anlatılır.

GitHub Actions her push ve pull request'te dört iş çalıştırır: bütün repo için lint, ortak paketin tip kontrolü, landing'in ve data'nın kendi tip kontrolü ile davranış testleri. Görsel testler CI'da çalıştırılmaz, çünkü referans görüntüler yerel font çizimiyle alınmıştır ve farklı bir runner'da yanlış alarm üretir.

`docs/visual-baseline/` klasörü, responsive düzeltmelerden önceki durumun `257ed79` commit'inden alınmış arşiv kaydıdır. Güncel referanslar `apps/landing/tests/visual.spec.ts-snapshots/` altında durur. Arşiv yeni görüntülerle değiştirilmez.

Dile özel illüstrasyon dosyalarının nasıl ekleneceği `docs/illustrations.md` içinde anlatılır.

## Dağıtım

GitHub'a push yapılması canlı sitenin güncellendiği anlamına gelmez. Canlıya alım ayrı ve elle çalıştırılan iki adımdır: paketleme ve yayınlama. Üç script de ilk argüman olarak uygulamanın adını alır. Her uygulamanın paket adı öneki, sunucudaki klasörleri ve canlı adresi `scripts/apps.sh` içinde tek yerde durur. Landing'in değerleri atomik yayın düzeni kurulduğundan beri aynıdır: paketler `paktlabs-` ile başlar, sürümler `/var/www/paktlabs-releases` altında durur.

Paket, commit'lenmiş kaynaktan üretilir. Script `git archive` ile verilen commit'ten yalnızca kökteki `package.json` ve `package-lock.json` dosyalarını, ortak `packages` klasörünü ve `apps` klasörünü çıkarır, temiz bir ortamda `npm ci` ve yalnızca seçilen uygulamanın build komutunu çalıştırır. Bütün `apps` klasörünün alınmasının nedeni kilit dosyasının bütün uygulamaları listelemesidir, eksik bir uygulama klasörüyle `npm ci` kilitle uyuşmaz. Çalışma ağacındaki commit'lenmemiş bir değişiklik bu yüzden pakete giremez. HTML, JS, CSS ve SVG dosyalarının, data'da çalışmaların CSV, kod ve çıktı dosyalarının yanına önceden sıkıştırılmış `.gz` kopyaları eklenir, her dosyanın SHA256 özeti ve kaynak commit pakete yazılır.

```bash
scripts/build-release.sh landing            # HEAD'den release/paktlabs-<zaman>-<commit>.tar.gz üretir
scripts/build-release.sh landing <commit>   # belirli bir commit'ten üretir
```

Yayınlama, paketi sunucuda uygulamanın sürüm klasörüne, landing için `/var/www/paktlabs-releases/<sürüm>/` altına açar ve özetleri doğrular. Paketin adı uygulamanın önekiyle başlamıyorsa script durur, böylece bir sitenin paketi yanlışlıkla başka bir sitenin canlı dizinine geçemez. Nginx'in kök dizini olan `/var/www/paktlabs` bir symlink'tir. Yeni sürüme geçiş bu symlink'in tek bir rename işlemiyle çevrilmesidir, ziyaretçi hiçbir anda yarım kopyalanmış bir dizin görmez. Önceki sürümler yerinde kalır. Script son olarak canlı `index.html`'in yeni paketteki dosyaları gösterdiğini kontrol eder.

```bash
scripts/deploy-release.sh landing release/paktlabs-<zaman>-<commit>.tar.gz
```

Geri dönüşte symlink eski bir sürüme çevrilir, dosya kopyalanmaz ve hiçbir sürüm silinmez.

```bash
scripts/rollback-release.sh landing            # sürümleri ve aktif olanı listeler
scripts/rollback-release.sh landing <sürüm>    # o sürüme döner
```

Nginx `.gz` kopyalarını `gzip_static` ile hazır sunar. Hash'li dosyalar bir yıl ve değişmez olarak önbelleğe alınır, `index.html` her ziyarette yeniden doğrulanır. Böylece yeni bir sürüm, eski önbellekle karışmadan ilk yenilemede görünür. Eski sürümler birikince elle temizlenir, aktif sürüm ve geri dönüş için en az bir önceki sürüm saklanır. Sunucu tarafındaki kurulum ayrı bir altyapı belgesinde tutulur.
