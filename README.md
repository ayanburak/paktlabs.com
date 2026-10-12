# PaktLabs

PaktLabs bağımsız bir yazılım stüdyosudur. Bu repo, PaktLabs'ın vitrin sitelerinin kaynağıdır: `paktlabs.com` adresindeki landing sayfası ve disiplin subdomain'leri. Siteler React ve Vite ile yazılmış statik uygulamalardır, derlenen çıktı nginx tarafından sunulur. Tek backend, landing'in iletişim formunu alan küçük bir servistir ve `services/contact-api` altında durur.

Siteler npm workspaces ile tek repoda durur, çünkü aynı stüdyonun parçalarıdır ve ziyaretçi bir siteden ötekine geçtiğinde aynı görünümle karşılaşmalıdır. Ortak üst bar, alt bilgi, renkler ve dil davranışı `packages/brand` paketindedir, ayrıntısı `packages/brand/README.md` içinde anlatılır. Her site `apps` altında kendi klasöründedir: landing `apps/landing`, veri disiplininin sitesi `apps/data`, web ve otomasyon disiplinlerinin yapım aşamasındaki siteleri `apps/web` ve `apps/automation`. data sitesinin sayfa türleri ve içerik kuralları `apps/data/README.md` içinde anlatılır. Bu belgenin geri kalanı landing'i anlatır.

Çalışan uygulamalar bu repoya girmez. Python servisleri, veritabanları ve gecelik işler kendi repolarında yazılır, sunucuda kendi servisleri olarak çalışır ve vitrin sitelerinden yalnızca bağlantıyla açılır. Böylece bir uygulamanın yayını vitrinin yayınına bağlanmaz, her uygulama da müşteriye kendi temiz reposuyla gösterilebilir. Tek istisna iletişim servisidir. O bir portföy uygulaması değil vitrinin parçasıdır, landing'in formu onsuz çalışmaz. Form ile servis aynı mesaj şeklini konuştuğu için aynı repoda durur ve aynı commit'te değişir.

## Kapsam

Landing alan bağımsızdır. Disiplin bağlantıları ayrı subdomain'lere gider:

- `https://web.paktlabs.com`
- `https://automation.paktlabs.com`
- `https://data.paktlabs.com`

Bu adresler `packages/brand/content/disciplines.ts` içinde tek yerde tutulur. Landing'in üst menüsü, mobil menüsü, disiplin kartları, iş kapsamı bantları ve alt menüsü ile disiplin sitelerinin üst barı aynı kaynağı kullanır. Adres değiştiğinde yalnızca bu dosya güncellenir. Veri bandının altı satırı ayrıca data sitesinin çalışma kategorileridir ve her biri data'daki o kategorinin hizmet sayfasını açar, örneğin `https://data.paktlabs.com/services/quality`. Hizmet sayfası işi anlatır, oradan o kategorideki çalışmalara geçilir. Kategorilerin kimlikleri, sırası ve iki dildeki adları iki sitenin ortak kaynağı olan brand paketinde durur, böylece landing'deki satırlar data'nın süzgecinden ayrışamaz. Otomasyon ve Web bantlarının satırları düz yazıdır. Subdomain'lerin DNS ve sertifika kurulumu bu reponun işi değildir, sunucu tarafında belgelenir.

Landing içinde `/web`, `/automation` veya `/data` gibi alt sayfalar tanımlanmaz, disiplinler kendi subdomain'lerindedir. Landing çok sayfalı bir derlemedir: her sayfa kendi HTML dosyası ve kendi küçük JS dosyasıyla gelir. Ana sayfa `index.html`, iletişim sayfası `contact/index.html`, profil sayfaları `profiles/<kimlik>/index.html` ve bulunamadı sayfası `404.html`'dir. Tek sayfalık bir uygulama yerine bu yol seçildi, çünkü öyle olsaydı nginx bilinmeyen her adreste ana sayfayı 200 koduyla verirdi ve bulunamadı sayfası gerçek 404 olmazdı. Ayrı dosyalarla her sayfanın Türkçe başlığı JS çalışmadan önce de yazılıdır ve bir sayfa ötekinin JS'ini indirmez. nginx `contact/index.html`'i ayrı bir ayar gerektirmeden `/contact/` adresinde sunar. `/contact` adresi klasör olduğu için nginx onu sondaki eğik çizgiyle `/contact/`'a kalıcı olarak yönlendirir, sayfa her iki adreste de açılır. Bilinmeyen her adreste `404.html` gerçek 404 koduyla döner. Bu dosya brand paketindeki ortak bulunamadı sayfasını landing'in üst barı ve alt bilgisiyle gösterir, böylece ziyaretçi sunucunun kendi hata sayfasını görmez. Vite de `appType: 'mpa'` ile aynı davranır, geliştirme sunucusunda bilinmeyen adres ana sayfayı açmaz. Yerelde iletişim sayfası sonda eğik çizgiyle, `/contact/` olarak açılır. Bütün sayfalar üst bar, içerik ve alt bilgiyi brand'deki ortak `Page` çerçevesiyle kurar. Giriş dosyaları (`src/main.tsx`, `src/contact.tsx`, `src/profile.tsx`, `src/notFound.tsx`) sayfayı brand'deki `lib/mount.tsx` içindeki `mount` ile açar, bu yardımcı StrictMode ve dil sağlayıcısını kurar; router yoktur. `global.css` her giriş dosyasında sayfa import'larından sonra import edilir, `mount.tsx` CSS import etmez. Klasör kuralı: bir bölümün kendi parçaları o bölümün klasöründe (`routes/Home/sections/Work/` gibi), iki bölümün paylaştığı parçalar `src/components/` altında durur. Derleme birden fazla giriş taşıdığı halde CSS tek dosya olarak üretilir, çünkü Vite ortak stilleri ayrı bir parçaya ayırdığında global stiller bileşen stillerinden önce yüklenir ve brand'in istediği sıra bozulur. Ana sayfa, bütün PaktLabs sitelerinde ortak olan iletişim bölümüyle kapanır. Bölümde form bulunmaz, tek düğme ana sitenin `/contact` adresindeki iletişim sayfasına gider, altında e-posta adresi durur. Hero'daki ve üst bardaki İletişim bağlantıları da aynı adrese gider.

### Yapım aşamasındaki siteler

`web.paktlabs.com` ve `automation.paktlabs.com` kendi vitrinleri hazırlanana kadar tek bir yer tutucu sayfa gösterir. Sayfada boş bir yapı tabelası ve merdivenin üstünde tabelanın son vidasını sıkan Ada durur. Başlık, açıklama ve iki düğme bu tabelanın içine yazılır: biri yayındaki Veri sitesine, öteki iletişim sayfasına gider. Sayfa ortak iletişim bölümüyle kapanmaz, çünkü kendi düğmesi zaten iletişim sayfasına gider. Düzen, çizim ve düğme metinleri brand'deki `UnderConstruction` bileşenindedir, iki sitede yalnızca başlık ve açıklama farklıdır, bunlar sitenin kendi sözlüğündedir.

İki adres tek bir derlemeyi paylaşmaz, her biri `apps/web` ve `apps/automation` altında kendi uygulamasıdır. Gerçek siteler ileride bu klasörlerde büyüyeceği için sunucudaki klasörler, nginx blokları ve yayın komutları bir kez kurulur ve gerçek site geldiğinde değişmez. Üst barda işaretlenen disiplin ve JS çalışmadan önce görünen Türkçe başlık da böylece her sitede kendine aittir. İkisi de landing gibi çok sayfalıdır: ana sayfa `index.html`, bulunamadı sayfası `404.html`. Yerelde web 5175, automation 5176 portunda açılır.

### Profil sayfaları

Ekipteki her kişinin landing'de bir profil sayfası vardır, bugün yalnızca `paktlabs.com/profiles/ayanburak`. data'daki çalışma sayfalarının yazar kutusu buraya bağlanır. Sayfada kişinin adı, unvanı, kısa tanıtımı, LinkedIn, GitHub ve kişisel siteye giden üç düğme, üstten bir askıyla sarkan fotoğraflı ekip kartı, yazdığı çalışmaların listesi ve en altta kişinin kendi e-posta adresi bulunur. Kişinin adresi stüdyonun info@ adresinden bilerek ayrı durur: info@ stüdyonun adresidir ve kişinin adresi gibi gösterilmez, müşteri kişiye doğrudan da yazabilir. Stüdyonun adresi ve iletişim sayfası aynı bantta ayrı bir kutudadır. Sayfa ortak iletişim bölümüyle kapanmaz, çünkü kendi iletişim bandı vardır.

Kişinin dilden bağımsız bilgisi, yani adı, e-postası, kullanıcı adları ve disiplinleri, brand'deki `content/profiles.ts`'te, fotoğrafı `content/profilePhotos.ts` ve `assets/profiles/` altında durur. Unvan ve tanıtım gibi metinler landing sözlüğünde `profilePage.people.<kimlik>` altındadır. Çalışma listesi brand'deki `content/works.ts`'ten yazara göre süzülür, her satır çalışmanın kendi disiplin sitesindeki sayfasına gider. Bu bilgiler brand'de durur, çünkü landing data'yı import edemez ve yazar kutusu ile profil aynı kaynaktan okumalıdır.

Her kişinin kendi HTML girişi vardır, arama motoru başlığı JS çalışmadan görsün diye. Bütün girişler aynı `src/profile.tsx` dosyasını yükler, kişiyi root elemanındaki `data-profile` söyler. Yeni bir kişi için `profiles.ts`'e ve `profilePhotos.ts`'e bir satır, sözlüğe bir kayıt, `profiles/<kimlik>/index.html` ve `vite.config.ts`'e bir giriş eklenir. `/profiles` adresi henüz bir liste göstermez, nginx onu geçici yönlendirmeyle, 302 ile, `/profiles/ayanburak/`'a gönderir. İkinci bir kişi geldiğinde burada bir liste sayfası yazılır ve yönlendirme kalkar.

## İletişim sayfası

İletişim sayfası ziyaretçiye işini dört kısa soruyla anlattırır. İlk üç soru seçmelidir: hangi alanda bir iş olduğu, elde ne olduğu ve ne zamana lazım olduğu. Son ekranda ad, e-posta, isteğe bağlı şirket ve kısa bir açıklama istenir. Her soru tek bir ekrandır, üstte adım sayısı ve dört parçalı bir ilerleme çizgisi durur. Seçim yapılmadan ilerlenmez, Geri önceki soruya döner ve seçimi korur. Seçenekler gerçek radio düğmeleri olduğu için klavyede ok tuşlarıyla değişir, Enter ilerletir, ekran değişince odak yeni sorunun başlığına gider. Formun bir anket gibi değil, bir iş konuşmasının ilk adımı gibi hissettirmesi istendi, sorular bu yüzden az ve seçmelidir.

Başlık üstte, altında soruya ait çizim ile form yan yana durur. Dört çizimde Ada aynı boyda ve aynı gölgenin üstündedir, sayfa hepsini aynı yükseklikte gösterir, böylece adım değişince yalnızca Ada'nın elindekiler değişir. Çizimin alanı sabit ölçüdedir: yüksekliği ortak, genişliği en geniş çizimin oranı, çizimler alanın sol alt köşesine yaslanır. Alan çizimin genişliğini alsaydı çizim inene kadar sıfır genişlikte kalırdı ve blok ortalandığı için form her adım geçişinde yerinden zıplardı. Öteki üç çizim sayfa yüklendikten sonra arka planda indirilir, ziyaretçi ilk soruyu cevaplayana kadar hazır olur. Yeni çizim tamamen inip çizilmeye hazır olmadan gösterilmez, o ana kadar önceki çizim yerinde kalır, belirme animasyonu boş bir alanın üstünde oynamaz. Çizimlerle formun alt kenarları aynı çizgidedir, blok üst barın altında kalan alanın dikey ortasında durur. Ekran yüksekliği 920 pikselin altındayken boşluklar ve kutular sıkışır ki blok 1366×768 gibi kısa ekranlara sığsın. Dar ekranda çizim gösterilmez, başlıktan hemen sonra form gelir.

Soruların ve seçeneklerin kimlikleri `src/routes/Contact/questions.ts`'te, metinleri sözlükte `contactPage` altında durur. Son ekranın alanları Gönder'e basılınca denetlenir, uyarılar sitenin dilinde çıkar. Formda insanın göremediği bir tuzak alan vardır, otomatik doldurulan formları ayırmak için. Mesaj, sayfaya dışarıdan verilen bir gönderici ile `/api/contact`'a gider. Sayfa mesajın nereye gittiğini bilmez, gönderici `src/contact.tsx`'te seçilir. Gönderim başarısız olursa yazılanlar korunur ve doğrudan yazılabilecek e-posta adresi gösterilir.

Mesajı alan servis `services/contact-api` altındadır ve kendi README'sinde anlatılır. Yerelde servis 8001 portunda çalışır, Vite'ın geliştirme sunucusu `/api` isteklerini oraya aktarır, canlıda aynı işi nginx yapar.

## Dil

Arayüz Türkçe ve İngilizcedir. Metinler iki katmanda durur. Üst bar, alt bilgi ve menü etiketleri gibi bütün PaktLabs sitelerinde aynı kalan metinler `packages/brand/i18n/tr.json` ve `en.json` dosyalarındadır. Landing'e özel metinler `apps/landing/src/i18n/tr.json` ve `en.json` dosyalarındadır. Böylece ortak bir menü etiketi tek yerde değişir, her site yalnızca kendi sayfalarının metnini taşır. Her katmanda iki sözlüğün aynı şekle sahip olması TypeScript tarafından denetlenir, bir dilde eksik anahtar derleme hatası verir.

İlk ziyarette dil Türkçedir. Değiştiriciyle yapılan seçim `pl_lang` adlı bir çereze yazılır. Çerez `paktlabs.com` alan adına ve onun bütün alt alan adlarına açılır, bir yıl geçerlidir. Böylece landing'de seçilen dil disiplin sitelerinde de geçerli olur, ziyaretçi siteler arasında geçerken dil değişmez. Aynı seçim tarayıcının `localStorage` alanına da yazılır. 2026-10-11'den önce seçim yalnızca orada tutuluyordu, çerezi olmayan eski ziyaretçinin tercihi bu kayıttan okunur. Sayfa açılırken önce çereze, o yoksa `localStorage`'a bakılır, ikisi de yoksa dil Türkçedir. Tarayıcı çerezi ya da depolamayı engellese veya depolama dolu olsa da dil değiştirme çalışır, ikisinden biri yazılabildiği sürece seçim bir sonraki ziyarete taşınır. Yerelde ve testlerde adres `localhost` olduğu için çerez yalnızca o adrese yazılır. IP tabanlı dil seçimi ve dile özel URL henüz kurulmamıştır.

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
npm run lint         # bütün uygulamaları ve ortak paketleri tek seferde tarar
npm run typecheck    # brand, config ve bütün sitelerin tip kontrolü
cd apps/landing
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # dist/ klasörüne üretim derlemesi
```

Lint kökte çalışır ve tek bir `.oxlintrc.json` kullanır, böylece hiçbir uygulamanın import etmediği ortak paket dosyaları da taranır. Kökteki `npm run typecheck` her workspace'in kendi `typecheck` komutunu sırayla çalıştırır, böylece brand ve config paketleri de sitelerin yanında denetlenir.

### Ortak yapılandırma

`packages/config`, sitelerin aynı tuttuğu yapılandırmanın tek kaynağıdır ve `@paktlabs/config` adıyla workspace olarak kurulur. İçinde TypeScript tabanları, `siteConfig` ile Vite ayarı ve `siteTestConfig` ile Playwright ayarı bulunur. Bir sitenin `vite.config.ts` ve `playwright.config.ts` dosyaları bu fonksiyonları portla çağırır, sitenin kendine özel ayarları `mergeConfig` ile üstüne eklenir. `tsconfig` dosyaları tabanları `extends` ile alır ve yalnızca dosyaya göreli olanları tutar. Yeni bir site kurulurken bu dosyalar kopyalanmaz, ince birer çağrı yazılır.

Paketin kökte değil `packages` altında durmasının sebebi paketleme script'idir. `scripts/build-release.sh` `git archive` ile yalnızca kökteki `package.json` ve `package-lock.json` dosyalarını, `packages` ve `apps` klasörlerini alır. Kökte açılacak yeni bir klasör pakete girmez ve sunucuya giden paketteki derleme kırılırdı.

## Testler

Testler Playwright ile üretim derlemesine karşı çalışır. Davranış testleri dil seçimini, bağlantıları, erişilebilirlik davranışlarını, görsel dosya seçimini ve responsive yerleşimi kapsar. Görsel testler onaylı görünümün tam sayfa ekran görüntüleriyle karşılaştırılmasıdır.

```bash
cd apps/landing
npx playwright install chromium   # yalnızca ilk kurulumda
npm test
npm run test:visual
```

Yayından sonra aynı davranış testleri canlı siteye karşı da çalıştırılır. `npm run test:live` build almaz ve yerel sunucu açmaz, `LIVE_URL` ortam değişkeniyle verilen adrese bağlanır. Landing için `https://paktlabs.com`, data için `https://data.paktlabs.com`, web ve automation için kendi adresleri hazır yazılıdır. Görsel testler dışarıda kalır, çünkü referanslar yerel font çizimiyle alınmıştır. Canlıyı yormamak için bu kipte yeniden deneme bir, paralel çalışma iki ile sınırlanır.

```bash
cd apps/landing
npm run test:live
```

Test koşulları, toleranslar ve testlerin neyi kanıtlamadığı `apps/landing/tests/README.md` içinde anlatılır.

GitHub Actions her push ve pull request'te üç iş çalıştırır: bütün repo için lint ile brand'in tip kontrolü, bir matrisle landing, data, web ve automation için ayrı ayrı tip kontrolü ile davranış testleri ve iletişim servisinin Python 3.10 ile pytest testleri. Yeni bir site eklemek matristeki `app` listesine bir ad eklemekten ibarettir. Görsel testler CI'da çalıştırılmaz, çünkü referans görüntüler yerel font çizimiyle alınmıştır ve farklı bir runner'da yanlış alarm üretir.

`docs/visual-baseline/` klasörü, responsive düzeltmelerden önceki durumun `257ed79` commit'inden alınmış arşiv kaydıdır. Güncel referanslar `apps/landing/tests/visual.spec.ts-snapshots/` altında durur. Arşiv yeni görüntülerle değiştirilmez.

Dile özel illüstrasyon dosyalarının nasıl ekleneceği `docs/illustrations.md` içinde anlatılır.

## Dağıtım

GitHub'a push yapılması canlı sitenin güncellendiği anlamına gelmez. Canlıya alım ayrı ve elle çalıştırılan iki adımdır: paketleme ve yayınlama. Üç script de ilk argüman olarak uygulamanın adını alır. Her uygulamanın paket adı öneki, sunucudaki klasörleri ve canlı adresi `scripts/apps.sh` içinde tek yerde durur. Landing'in değerleri atomik yayın düzeni kurulduğundan beri aynıdır: paketler `paktlabs-` ile başlar, sürümler `/var/www/paktlabs-releases` altında durur.

İletişim servisi aynı script'lerle `api` adıyla yayınlanır. Paketi Python kodudur, sunucuda `/opt/paktlabs-api/releases` altına açılır, sürümün kendi Python ortamı orada kurulur, `/opt/paktlabs-api/current` symlink'i çevrilir ve systemd servisi yeniden başlatılır. Servis sağlık adresine cevap vermezse script kendiliğinden önceki sürüme döner. Ayrıntısı servisin README'sindedir.

Paket, commit'lenmiş kaynaktan üretilir. Script `git archive` ile verilen commit'ten yalnızca kökteki `package.json` ve `package-lock.json` dosyalarını, ortak `packages` klasörünü, yani brand ve config paketlerini, ve `apps` klasörünü çıkarır, temiz bir ortamda `npm ci` ve yalnızca seçilen uygulamanın build komutunu çalıştırır. Bütün `apps` klasörünün alınmasının nedeni kilit dosyasının bütün uygulamaları listelemesidir, eksik bir uygulama klasörüyle `npm ci` kilitle uyuşmaz. Çalışma ağacındaki commit'lenmemiş bir değişiklik bu yüzden pakete giremez. HTML, JS, CSS ve SVG dosyalarının, data'da çalışmaların CSV, kod ve çıktı dosyalarının yanına önceden sıkıştırılmış `.gz` kopyaları eklenir, her dosyanın SHA256 özeti ve kaynak commit pakete yazılır.

```bash
scripts/build-release.sh landing            # HEAD'den release/paktlabs-<zaman>-<commit>.tar.gz üretir
scripts/build-release.sh landing <commit>   # belirli bir commit'ten üretir
```

Yayınlama, paketi sunucuda uygulamanın sürüm klasörüne, landing için `/var/www/paktlabs-releases/<sürüm>/` altına açar ve özetleri doğrular. Paketin adı uygulamanın önekiyle başlamıyorsa script durur, böylece bir sitenin paketi yanlışlıkla başka bir sitenin canlı dizinine geçemez. Nginx'in kök dizini olan `/var/www/paktlabs` bir symlink'tir. Yeni sürüme geçiş bu symlink'in tek bir rename işlemiyle çevrilmesidir, ziyaretçi hiçbir anda yarım kopyalanmış bir dizin görmez. Önceki sürümler yerinde kalır. Script son olarak canlı `index.html`'in yeni paketteki dosyaları gösterdiğini kontrol eder, göstermiyorsa nedenini yazıp hata verir. Özet doğrulaması ya da kurulum geçişten önce hata verirse yarım açılmış sürüm klasörü silinir, aynı paket düzeltildikten sonra yeniden yüklenebilir.

```bash
scripts/deploy-release.sh landing release/paktlabs-<zaman>-<commit>.tar.gz
```

Geri dönüşte symlink eski bir sürüme çevrilir, dosya kopyalanmaz ve hiçbir sürüm silinmez.

```bash
scripts/rollback-release.sh landing            # sürümleri ve aktif olanı listeler
scripts/rollback-release.sh landing <sürüm>    # o sürüme döner
```

Nginx `.gz` kopyalarını `gzip_static` ile hazır sunar. Hash'li dosyalar bir yıl ve değişmez olarak önbelleğe alınır, `index.html` her ziyarette yeniden doğrulanır. Böylece yeni bir sürüm, eski önbellekle karışmadan ilk yenilemede görünür. Eski sürümler birikince elle temizlenir, aktif sürüm ve geri dönüş için en az bir önceki sürüm saklanır. Sunucu tarafındaki kurulum ayrı bir altyapı belgesinde tutulur.
