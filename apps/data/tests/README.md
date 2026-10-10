# data testleri

Testler landing'deki gibi Playwright ile yazılmıştır ve gerçek bir Chromium tarayıcısında, üretim derlemesine karşı çalışır. Kaydırma, font yüklemesi, panoya kopyalama ve dosya indirme gerçek tarayıcı davranışına bağlı olduğu için jsdom tabanlı bir ortam kullanılmamıştır.

## Çalıştırma

Komutlar `apps/data` klasöründe çalıştırılır, bağımlılıklar önce repo kökünde `npm ci` ile kurulur.

```bash
npx playwright install chromium   # yalnızca ilk kurulumda
npm test                    # davranış testleri
npm run test:visual         # tam sayfa görsel karşılaştırma
npm run test:visual:update  # onaylı bir tasarım değişikliğinden sonra referansları yeniler
```

Playwright önce `vite build` ile derleme alır ve onu `vite preview` ile 4174 portunda sunar. Landing 4173'ü kullandığı için iki sitenin testleri aynı anda çalışabilir. 4174'te başka bir sunucu açıksa eski bir derlemenin test edilmemesi için çalıştırma başlamaz, açık kalan önizleme kapatılıp komut tekrar çalıştırılır. CI her push'ta bu testleri çalıştırır.

## Dosyalar

`frame.spec.ts` üst barın Veri bağlantısını işaretlediğini, alt bilginin ana siteye döndüğünü, sekme başlığının ve açıklamanın iki dilde doğru geldiğini, detay ve kod sayfasında dil değiştirilince başlığın, açıklamanın ve sayfa dilinin yeni dile geçtiğini ve `index.html`'in JS çalışmadan önce Türkçe başlık taşıdığını denetler.

`home.spec.ts` veri sayfasının hero'sunu, teknoloji şeridini, çalışma kartlarını, süzgeci ve ortak iletişim bölümünü denetler. `layout.spec.ts` hero'nun yerleşimini, yani metnin ve çizimin üst barın altındaki alanın dikey ortasında durmasını, başlıkla çizim arasındaki boşluğu ve yatay taşmayı eşiklerin iki yanında ve iki dilde ölçer.

`routes.spec.ts` adresleri ve bulunamadı sayfasını, `scroll.spec.ts` site içi geçişlerde ve bölüm adresleri doğrudan açıldığında kaydırma konumunu denetler. Bu test fontları bilerek geciktirir.

`study.spec.ts` çalışma detay sayfasını, `source.spec.ts` kod ve veri sayfasını Demo Veri üzerinden denetler: bölüm sırası, veri dili seçimi, açılır kutular, kopyalama, indirme ve bağlantılar. `data.spec.ts` tarayıcı açmadan iki dilin CSV'lerini ve kod dosyalarını karşılaştırır, `highlight.spec.ts` kod renklendiricisini küçük örneklerle denetler.

`a11y.spec.ts` dört sayfa türünde tek bir h1 olduğunu, başlık seviyelerinin atlanmadığını, üst bar, ana içerik ve alt bilgi bölgelerinin birer kez bulunduğunu, üst bardaki adreslerin doğru yere gittiğini ve sayfada boş ya da yeni sekmede açılan bağlantı kalmadığını denetler. Ayrıca mobil menünün iki dilde klavyeyle açılıp Escape ile kapandığını ve dört sayfa türünde Tab ile gezilen her elemanda odak çerçevesinin görünüp elemanın ekrana geldiğini ölçer. Sayfa kaydırması yumuşak olduğu için elemanın konumu kayma bitene kadar tekrar ölçülür. Otomatik bir erişilebilirlik tarayıcısı değildir, ekran okuyucuyla yapılan gerçek bir testin yerine geçmez.

`visual.spec.ts` dört sayfa türünün onaylı görünümünü Türkçe ve İngilizce tam sayfa referanslarla karşılaştırır. Veri sayfası ve bulunamadı sayfası landing'deki gibi 390×844, 1024×1366, 1366×1024 ve 1920×1080 ölçülerinde çekilir. Detay ve kod sayfaları on iki ile on sekiz bin piksel boyunda olduğu için yalnızca 390×844 ve 1366×1024'te çekilir. Bu iki ölçü iki sayfanın telefon ve masaüstü düzenini kapsar, öteki ölçüler aynı düzenleri tekrar edip repoyu büyütüyordu. Detay sayfasındaki açılır kutular kapalı çekilir, tabloların içeriğini davranış testleri denetler. Referanslar `visual.spec.ts-snapshots/` altında commit'lenir, CI bu testleri çalıştırmaz.

`support.ts` sayfayı istenen dil tercihiyle açan ve fontların yüklenmesini bekleyen yardımcıları ve iki sitenin sözlüklerini birleştiren `dict`'i taşır. Beklenen adresler testlerde elle yazılıdır, uygulamanın kendi adres dosyasından okunmaz, böylece yanlış yazılmış bir adres testi de geçirmez.

## Kapsam dışında kalanlar

Veri sayfasındaki öne çıkan kartın teknik ayrıntılar listesi, tarayıcı her yeni açıldığında yaklaşık yirmide bir ihtimalle birkaç tonluk farkla çizilir. Logolar, bekleme süresi, giriş animasyonu, yazı kalınlığı ve satır hizası denendi, hiçbiri sebep çıkmadı, kesin sebep Chromium'un yazı çiziminde kalır. Fark ham bayt karşılaştırmasında görünür, Playwright'ın varsayılan renk eşiği ise onu sayfa farkı saymaz. Görsel testler bu yüzden landing'deki gibi sıfır farklı piksel oranıyla çalışabilir. Eşik düşürülürse bu testler ara ara sebepsiz kırılır.

Landing'deki depolama hatalarıyla ilgili dil testleri burada tekrarlanmaz, çünkü dil katmanı iki sitede ortaktır ve landing'de denetlenir. Firefox, WebKit ve gerçek cihaz testi yoktur.
