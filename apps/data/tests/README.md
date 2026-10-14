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

`home.spec.ts` veri sayfasının hero'sunu, hizmetler panosunu, çalışma kartlarını, süzgeci ve ortak iletişim bölümünü denetler. Panoda altı hizmetin sırası, adları ve hizmet sayfalarına giden adresleri, süzgeçte onay kutularıyla seçim, adresten gelen kategori ve her kategorinin yanındaki çalışma sayısının iki dilde ekran okuyucuya okunuşu ölçülür. Beklenen adresler ve hizmet sırası iki sitenin ortak `expected.ts` dosyasında elle yazılıdır. Süzgeç testleri kutunun kendisine değil etiketine tıklar, çünkü ziyaretçi de etikete tıklar ve Playwright etiket yerine oturana kadar bekler. Adreste `?tag=` ile gelen kategorinin seçili ve panelin açık geldiği altı kategorinin her biri için, bilinmeyen bir değerin yok sayıldığı da burada ölçülür. Üç test listedeki çalışmalara bağlıdır ve koşulu yoksa kendiliğinden atlanır. Kart logolarının adlarıyla okunduğunu ölçen test yalnızca öne çıkan kartta logo olduğu için öne çıkan bir çalışma ister. Aynı satırdaki kartların metin kutularının aynı hizadan başladığını ölçen test en az üç normal kart ister. Çalışması olmayan bir etiketin uyarı gösterdiğini ölçen test, her etiketin en az bir çalışması varsa atlanır. Hartwell & Finch öne çıkan çalışma olduğundan logoların okunuşu ölçülüyor ve öne çıkan kart veri sayfasının görsel referanslarında duruyor. Listede iki çalışma olduğu sürece en az üç normal kart isteyen test atlanır, her etiketin en az bir çalışması olduğu için uyarı testi de atlanır. `layout.spec.ts` hero'nun yerleşimini, yani metnin ve çizimin üst barın altındaki alanın dikey ortasında durmasını, başlıkla çizim arasındaki boşluğu ve yatay taşmayı eşiklerin iki yanında ve iki dilde ölçer.

`routes.spec.ts` adresleri ve bulunamadı sayfasını, `scroll.spec.ts` site içi geçişlerde, bölüm adresleri doğrudan açıldığında ve sayfa baştan yüklendiğinde kaydırma konumunu denetler. Baştan yükleme testleri hizmet sayfasının Sonraki bağlantısıyla yeni sayfanın en üstten açıldığını, geri düğmesinde, yenilemede kalınan yere dönüldüğünü ve aynı adrese yeniden gelindiğinde sayfanın en üstten açıldığını ölçer. Bölüm testleri fontları bilerek geciktirir.

`service.spec.ts` altı hizmet sayfasını iki dilde denetler: iki satıra bölünen başlığın ekran okuyucuda kelimeleri ayrı okunan tek bir ad olması, hizmetin disiplin içindeki sırası, künye, bölümlerin sırası, teslim bölümünün beş kutusu, iki çizim alanı, kapaktaki ve kapanıştaki bağlantıların adresleri, önceki ve sonraki hizmetin döngü halinde kurulması, bilinmeyen bir hizmetin bulunamadı sayfasına düşmesi, panodan sayfa yeniden yüklenmeden geçiş ve geri çalışma listesine dönüş, eşiklerin iki yanında yatay taşma. Taşma testi en uzun tek kelimelik ad olan Görselleştirme ile yapılır. Adresler ortak `expected.ts` dosyasında elle yazılıdır.

`study.spec.ts` çalışma detay sayfasını, `source.spec.ts` kod ve veri sayfasını Demo Veri üzerinden denetler, bu testler Demo Veri yayından kalkınca Hartwell & Finch'e taşınacak: bölüm sırası, veri dili seçimi, açılır kutular, kopyalama, indirme ve bağlantılar. `data.spec.ts` tarayıcı açmadan iki dilin CSV'lerini ve kod dosyalarını karşılaştırır. Sorgu sonucunun CSV'deki sütunlarının şemada var olduğunu, her bölümün çağırdığı dosyanın iki dilde var olduğunu ve parçaların kendi içinde tutarlı olduğunu ("block contents are consistent" testi: tablo satırlarının hücre sayısı, şekil bölgeleri ve eksen sınırları, çizgi serilerinin nokta sayısı, bileşim ve pasta yüzdelerinin toplamı, ısı ve korelasyon tablolarının boyutu, karar tablosunun kareliği, adım adım hesabın sonuç satırı, şemanın bağları ve yerleşimi, hesap tablosu hücre adresi, takvim aralığı) ölçer. `assetFiles.ts`'teki Vite glob deseninin ve yol ifadesinin dil kodlarının brand'deki `languages` listesiyle aynı kaldığını da denetler, çünkü bu iki yer statik yazılmak zorundadır. `highlight.spec.ts` kod renklendiricisini küçük örneklerle denetler.

`a11y.spec.ts` beş sayfa türünde, yani veri, detay, kod, hizmet ve bulunamadı sayfalarında, tek bir h1 olduğunu, başlık seviyelerinin atlanmadığını, üst bar, ana içerik ve alt bilgi bölgelerinin birer kez bulunduğunu, üst bardaki adreslerin doğru yere gittiğini ve sayfada boş ya da yeni sekmede açılan bağlantı kalmadığını denetler. Ayrıca mobil menünün iki dilde klavyeyle açılıp Escape ile kapandığını ve beş sayfa türünde Tab ile gezilen her elemanda odak çerçevesinin görünüp elemanın ekrana geldiğini ölçer. Sayfa kaydırması yumuşak olduğu için elemanın konumu kayma bitene kadar tekrar ölçülür. Otomatik bir erişilebilirlik tarayıcısı değildir, ekran okuyucuyla yapılan gerçek bir testin yerine geçmez.

`visual.spec.ts` beş sayfa türünün onaylı görünümünü Türkçe ve İngilizce tam sayfa referanslarla karşılaştırır. Veri sayfası ve bulunamadı sayfası landing'deki gibi 390×844, 1024×1366, 1366×1024 ve 1920×1080 ölçülerinde çekilir. Hizmet sayfası altı hizmette aynı kalıbı kullandığı için yalnızca Veri Hazırlama örneğiyle çekilir. Hizmet, detay ve kod sayfaları uzun olduğu için (detay ve kod sayfaları on iki ile on sekiz bin piksel boyundadır) yalnızca 390×844 ve 1366×1024'te çekilir. Bu iki ölçü iki sayfanın telefon ve masaüstü düzenini kapsar, öteki ölçüler aynı düzenleri tekrar edip repoyu büyütüyordu. Detay sayfasındaki açılır kutular kapalı çekilir, tabloların içeriğini davranış testleri denetler. Referanslar `visual.spec.ts-snapshots/` altında commit'lenir, CI bu testleri çalıştırmaz.

`blocks.spec.ts` ekibe özel blok kataloğunu denetler: sayfa iki dilde hatasız açılmalı, katalogdaki her bölüm seçili dildeki adıyla çizilmeli. Her bölümün görsel referansı ayrı tutulur, 1440 ve 390 piksel genişlikte, yalnızca Türkçe. Bir parçanın görünüşü değişirse fark yalnızca o bölümün referansında görünür. Yeni bir parça henüz hiçbir çalışmada kullanılmıyorsa sitedeki tek görsel ölçümü bu referanslardır. Referanslar `blocks.spec.ts-snapshots/` altındadır. `a11y.spec.ts` kataloğun başlık sırasını ve sayfa bölgelerini de öteki sayfalar gibi ölçer.

`support.ts` sayfayı istenen dil tercihiyle açan `openPage`'i ve data ile brand sözlüklerini birleştiren `dict`'i taşır. `openPage` sayfa açıldıktan sonra fontların ve görsellerin yüklenmesini de bekler, böylece ölçüm ve görüntü yedek fontla alınmaz.

İki sitenin ortak yardımcıları `packages/config/testing/` altındadır. `expected.ts` beklenen adresleri ve hizmet listesini elle yazılı tek yerde tutar, uygulamanın kendi adres dosyasından okunmaz, böylece yanlış yazılmış bir adres testi de geçirmez. `support.ts` dil listesini, `waitForAssets`'i, `required`'ı (`null` dönebilen değeri `!` yerine açık hatayla alır) ve derlenmiş CSS denetimini taşır. Spec dosyaları bunları `@paktlabs/config/testing/expected` ve `@paktlabs/config/testing/support` yoluyla alır.

## Koşullar ve toleranslar

Bütün testlerde cihaz piksel oranı 1'dir. Ölçüler tarayıcının içerik alanıdır, belirli bir telefonun veya tabletin emülasyonu değildir. Retina ekranlar, mobil tarayıcı araç çubukları ve sayfa yakınlaştırması bu testlerin kapsamına girmez.

Yerleşim ve görsel testleri ile süzgeç ve kaydırma testlerinin bir kısmı hareket azaltma tercihiyle çalışır. Bu tercihte belirme animasyonları baştan açık gelir ve sayfa kaydırması anlık olur, ölçüm animasyon zamanlamasına bağlı kalmaz. Klavye odağı testi bunun tersine normal hareketle çalışır, çünkü okurun Tab ile bir kutuya geldiğinde kutunun belirdiğini görmesi ölçülen davranışın kendisidir. Bu testte sayfa kayarak ilerlediği için elemanın ekranda olduğu kayma bitene kadar tekrar ölçülür.

Hero yerleşiminde metnin ve çizimin dikey ortası için 1 CSS pikseli tolerans, başlıkla çizim arası için en az 24 piksel kullanılır. Bu sayılar `layout.spec.ts` ve `scroll.spec.ts` başında anlamını söyleyen adlı sabitlerdir. Header payı ve alt çizgi kalınlığı testte sayı olarak yazılmaz, hesaplanmış stilden okunur. Metin bloğu eleman kutularıyla ölçülür, Range kutusuyla değil, çünkü başlığın satır yüksekliği fontun yazı alanından küçüktür. Kaydırma testi geç gelen fontların bölümü kaydırmasını sınamak için fontları 800 milisaniye geciktirir.

Görsel karşılaştırmada piksel başına Playwright'ın varsayılan renk eşiği kullanılır, farklı piksel oranı sıfırdır, landing'le aynı. Veri sayfasındaki öne çıkan kartın teknik ayrıntılar listesi, tarayıcı her yeni açıldığında yaklaşık yirmide bir ihtimalle birkaç tonluk farkla çizilir. Logolar, bekleme süresi, giriş animasyonu, yazı kalınlığı ve satır hizası denendi, hiçbiri sebep çıkmadı, kesin sebep Chromium'un yazı çiziminde kalır. Fark ham bayt karşılaştırmasında görünür, varsayılan renk eşiği ise onu sayfa farkı saymaz. Eşik düşürülürse bu testler ara ara sebepsiz kırılır.

Fontlar Google Fonts üzerinden ağdan yüklenir, görsel testler fontların ve görsellerin yüklenmesini bekler. Font sürümü, işletim sistemi veya font çizimi değiştiğinde çıkan fark önce görüntüden incelenir, doğrudan uygulama hatası sayılmaz. Referanslar Linux üzerinde Chromium 153 ile alınmıştır.

## Canlıya karşı çalıştırma

`npm run test:live` aynı davranış testlerini build almadan, `LIVE_URL` ile verilen adrese karşı çalıştırır. Görsel testler dışarıda kalır. Yayından sonra canlının beklendiği gibi davrandığını görmek için kullanılır, canlı sunucuyu yormamak için bu kipte yeniden deneme bir, paralel çalışma iki olur. Yerel bir önizlemeye karşı da denenebilir: `LIVE_URL=http://localhost:4173 npx playwright test --grep-invert @visual`.

Blok kataloğu canlıda şifreyle korunduğu için katalog testleri bu kipte varsayılan olarak atlanır. Şifre verilirse onlar da canlıya karşı çalışır: `BLOCKS_USER=<kullanıcı> BLOCKS_PASSWORD=<şifre> npm run test:live`. Şifre hiçbir dosyaya yazılmaz, yalnızca komutu çalıştıran kişinin terminalinde durur.

## Derlenmiş CSS denetimi

`css.spec.ts` ortak `expectClassicMediaQueries` yardımcısını çağırır. Yardımcı sayfanın yüklediği, kendi kaynağından gelen bütün stylesheet'leri `request` ile çeker ve içlerinde range sözdizimli medya sorgusu ya da `@container` bulunmadığını doğrular. Vite'ın CSS minify'ı klasik sorguları range sözdizimine çevirdiği için, `cssMinify: false` ayarı kaybolursa eski Safari'de mobil yerleşim hata vermeden kaybolur ve başka hiçbir test bunu görmez. Dosya sisteminden değil sayfadan okunduğu için test canlıda da çalışır. Bu ayar `packages/config` içindedir. Ayar geçici olarak açıldığında testin kırıldığı elle doğrulanmıştır.

## Referansların yenilenmesi

Onaylı bir görsel değişiklikten sonra referanslar `npm run test:visual:update` ile yenilenir. Yenilenen görüntüler commit'lenmeden önce eski halleriyle yan yana incelenir. Açıklanamayan konum, boyut veya satır kırılımı farkı varsa referans güncellenmez, değişikliğin kendisi incelenir. Brand paketindeki bir değişiklik iki sitenin görünümünü birlikte değiştirebileceği için o durumda landing'in görsel testleri de çalıştırılır.

## Kapsam dışında kalanlar

Landing'deki depolama hatalarıyla ilgili dil testleri burada tekrarlanmaz, çünkü dil katmanı iki sitede ortaktır ve landing'de denetlenir. Firefox, WebKit ve gerçek cihaz testi yoktur.
