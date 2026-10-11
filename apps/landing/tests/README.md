# Landing testleri

Testler Playwright ile yazılmıştır ve gerçek bir Chromium tarayıcısında çalışır. Dil depolama hataları, ağ istekleri, klavye odağı ve yerleşim ölçümleri gerçek tarayıcı davranışına bağlı olduğu için jsdom tabanlı bir birim test ortamı kullanılmamıştır.

## Çalıştırma

Komutlar `apps/landing` klasöründe çalıştırılır, bağımlılıklar önce repo kökünde `npm ci` ile kurulur. Tarayıcı ilk kurulumda bir kez indirilir.

```bash
npx playwright install chromium
npm test                    # davranış testleri
npm run test:visual         # tam sayfa görsel karşılaştırma
npm run test:visual:update  # onaylı bir tasarım değişikliğinden sonra referansları yeniler
```

Playwright her çalıştırmada önce `vite build` ile üretim derlemesi alır, ardından derlemeyi `vite preview` ile 4173 portunda sunar. Testler geliştirme sunucusuna bağlı değildir, canlıya giden CSS ve dosya adlarıyla aynı çıktıyı ölçer. 4173 portunda başka bir sunucu açıksa eski bir derlemenin test edilmemesi için çalıştırma başlamaz. Açık kalan `vite preview` kapatılıp komut tekrar çalıştırılır.

Başarısız bir testte izleme dosyası `test-results/` altına yazılır ve şu komutla açılır:

```bash
npx playwright show-trace test-results/<test-klasörü>/trace.zip
```

## Dosyalar

`language.spec.ts` dil tercihinin okunmasını ve yazılmasını kontrol eder. Kayıt yokken, geçerli ve geçersiz kayıtta, `getItem` hata verdiğinde ve `localStorage` hiç erişilemediğinde sayfanın doğru dilde açıldığına bakar. Çerezin `localStorage`'daki eski kayda üstün geldiği, geçersiz bir çerezde eski kayda dönüldüğü ve seçimin bir yıllık `pl_lang` çerezine yazıldığı ölçülür. Depolama dolu, çerez engelli ya da ikisi birden engelliyken dil değiştirmenin yine çalıştığı, yenilemede hangi kaydın geldiği ölçülür. Çerez testlerde `localhost`'a yazıldığı için siteler arası geçiş burada değil canlıda doğrulanır. Başlık, açıklama ve `html lang` her durumda aktif dille birlikte kontrol edilir.

`links.spec.ts` disiplin bağlantılarının üst menü, mobil panel, kartlar, bantlar ve alt menüde doğru subdomain'e gittiğini iki dilde kontrol eder. Beklenen adresler test içinde elle yazılıdır, uygulamanın kendi adres dosyasından okunmaz. Böylece yanlış yazılmış bir adres testi de geçirmez. Veri bandının altı satırının data'nın süzgecine doğru kategoriyle gittiği, adlarının ok işareti olmadan okunduğu ve Otomasyon ile Web bantlarında bağlantılı satır olmadığı da burada denetlenir. Kategori kimlikleri ve adresin biçimi testte elle yazılıdır. Uzak adreslerin gerçekten yanıt verdiği, DNS ve sertifikaların hazır olduğu bu testin kapsamında değildir.

`a11y.spec.ts` menü etiketlerini, dil düğmelerinin seçili durumunu, mobil menünün klavyeyle açılıp Escape ile kapanmasını, başlık sırasını, landmark yapısını ve Tab ile gezilen her elemanda odak çerçevesinin görünmesini kontrol eder. Sayfa odaktaki elemana yumuşak kaydığı için elemanın ekranda olup olmadığı kayma bitene kadar tekrar ölçülür. 2026-10-11'de disiplin kartlarının belirmesi kısalınca kart, sayfa henüz kayarken ölçülmeye başlamıştı ve test ara ara düşüyordu. Otomatik bir erişilebilirlik tarayıcısı değildir, ekran okuyucuyla yapılan gerçek bir testin yerine geçmez.

`illustrations.spec.ts` ağ isteklerine bakarak ekran genişliğine uygun SVG'nin indirildiğini, diğer kompozisyonun hiç istenmediğini kontrol eder. Derleme çıktısında dosya adları hash taşıdığı için karşılaştırma hash'siz taban adla yapılır. Ekran genişliği eşiği geçtiğinde yeni dosyanın inmesi beklenen davranıştır.

`layout.spec.ts` responsive eşiklerin iki yanındaki ölçülerde, iki dilde yerleşim ilişkilerini ölçer. Yatay taşma, masaüstü Hero başlığı ile çizim arasındaki boşluk, Hero çiziminin ve metninin header'ın altında kalan alanın dikey ortasında durması, disiplin figürünün ekran içinde ve kartların üstünde durması, iş bantlarında çizimin başlık, açıklama, liste ve düğmeye değmemesi ve zemin çizgisinin bant sınırında kalması kontrol edilir. Ayrıca belirme animasyonları bittikten sonra görsellerin, hareket azaltma tercihindeki konumla aynı yerde durduğu doğrulanır.

`visual.spec.ts` ana sayfanın ve iletişim sayfasının ilk ekranının onaylı görünümünü Türkçe ve İngilizce, 390×844, 1024×1366, 1366×1024 ve 1920×1080 ölçülerinde tam sayfa görüntüsüyle referansla karşılaştırır. Referanslar `visual.spec.ts-snapshots/` altında commit'lenir.

`notFound.spec.ts` bulunamadı sayfasının iki dilde ortak metinleri gösterdiğini, `404.html`'in JS çalışmadan önce de Türkçe başlık taşıdığını, geri dön düğmesinin siteden gelen ziyaretçiyi önceki sayfaya, adresi doğrudan açanı ana sayfaya götürdüğünü ve eşiklerin iki yanında yatay taşma olmadığını kontrol eder. Sayfa `/404.html` adresinden açılır, çünkü `vite preview` bilinmeyen bir adreste bu dosyayı döndürmez. Canlıda nginx'in bu dosyayı 404 koduyla döndürdüğü yayından sonra ayrıca denetlenir. Chromium Navigation API'yi desteklediği için düğmenin bu API olmayan tarayıcılardaki yedek yolu test edilmez.

`contact.spec.ts` iletişim sayfasını denetler: iki dilde başlık ve ilk soru, JS çalışmadan önce HTML'de duran Türkçe başlık, adım adım ilerleme, Geri'nin seçimi koruması, her adımın kendi çizimi, son ekranın boş ve hatalı alan uyarıları, servise giden mesajın birebir şekli, başarısız gönderimde yazılanların korunması, 4000 kod noktasından uzun mesajın uyarıyla durdurulması ve ad alanının 100 karakterde kesilmesi, tuzak alanın erişilemezliği, klavyeyle kullanım, başlık sırası ve yatay taşma. Gönderim gerçek servise gitmez, `/api/contact` her testte taklit edilir. Mesajın şekli testte elle yazılıdır, servisin kabul ettiği şekille aynı olmalıdır, servisin kendi testleri `services/contact-api/tests` altındadır. Seçenek kutularında odak çerçevesi görünmeyen radio'da değil yanındaki kutuda çizilir, bu yüzden genel odak testi bu sayfayı değil bu dosya ölçer.

`support.ts` sayfayı istenen dil tercihiyle açan ve fontlarla görsellerin yüklenmesini bekleyen ortak yardımcıları taşır.

## Koşullar ve toleranslar

Bütün testlerde cihaz piksel oranı 1'dir. Ölçüler tarayıcının içerik alanıdır, belirli bir telefonun veya tabletin emülasyonu değildir. Retina ekranlar, mobil tarayıcı araç çubukları ve sayfa yakınlaştırması bu testlerin kapsamına girmez.

Yerleşim ve görsel testleri hareket azaltma tercihiyle çalışır. Bu tercihte bütün belirme animasyonları baştan açık gelir ve ölçüm animasyon zamanlamasına bağlı kalmaz. Normal hareketle aynı son yerleşime ulaşıldığı ayrı bir testte kontrol edilir.

Yerleşim ölçümlerinde konum ve zemin karşılaştırmaları için 1 CSS pikseli tolerans kullanılır. Metin için elemanın kutusu değil metnin kendi Range kutusu ölçülür, çünkü bir paragraf kutusu metnin kapladığından geniş olabilir. Görsel için img kutusu ölçülür. SVG içindeki şeffaf alan çizim gibi sayılır, bu yüzden bir çakışma uyarısı gerçek bir çizim çakışması olmayabilir ve görüntüden ayrıca incelenir. Zemin hesabı CSS modelini ölçer, SVG içindeki çizgiyi piksel olarak bulmaz:

```text
zemin sapması = görsel alt kenarı − görsel yüksekliği × zemin yüzdesi − bant alt kenarı
```

Görsel karşılaştırmada piksel başına Playwright'ın varsayılan renk eşiği kullanılır, farklı piksel oranı sıfırdır. Fontlar Google Fonts üzerinden ağdan yüklenir. Font sürümü, işletim sistemi veya font çizimi değiştiğinde çıkan fark önce görüntüden incelenir, doğrudan uygulama hatası sayılmaz. Referanslar Linux üzerinde Chromium 153 ile alınmıştır.

## Canlıya karşı çalıştırma

`npm run test:live` aynı davranış testlerini build almadan, `LIVE_URL` ile verilen adrese karşı çalıştırır. Görsel testler dışarıda kalır. Yayından sonra canlının beklendiği gibi davrandığını görmek için kullanılır, canlı sunucuyu yormamak için bu kipte yeniden deneme bir, paralel çalışma iki olur. Yerel bir önizlemeye karşı da denenebilir: `LIVE_URL=http://localhost:4173 npx playwright test --grep-invert @visual`.

## Derlenmiş CSS denetimi

`css.spec.ts` sayfanın yüklediği, kendi kaynağından gelen bütün stylesheet'leri `request` ile çeker ve içlerinde range sözdizimli medya sorgusu ya da `@container` bulunmadığını doğrular. Vite'ın CSS minify'ı klasik sorguları range sözdizimine çevirdiği için, `cssMinify: false` ayarı kaybolursa eski Safari'de mobil yerleşim hata vermeden kaybolur ve başka hiçbir test bunu görmez. Dosya sisteminden değil sayfadan okunduğu için test canlıda da çalışır. Bu ayar `packages/config` içindedir. Ayar geçici olarak açıldığında testin kırıldığı elle doğrulanmıştır.

## Referansların yenilenmesi

Onaylı bir görsel değişiklikten sonra referanslar `npm run test:visual:update` ile yenilenir. Yenilenen görüntüler commit'lenmeden önce eski halleriyle yan yana incelenir. Açıklanamayan konum, boyut veya satır kırılımı farkı varsa referans güncellenmez, değişikliğin kendisi incelenir.

Bir listeye yeni bir metin girdiğinde aynı fontla yazılmış başka yazılarda da gözle görülmeyen bir ton farkı çıkabilir. 2026-10-11'de Veri bandının satırları değiştiğinde İngilizce 1366 görüntüsünde Otomasyon ve Web listelerinin yazıları 255 üzerinden en fazla 47 tonluk farkla, bazı satırların sağ kenarı bir piksel kısa çizildi. Değişiklik parça parça geri alınarak denendi, bağlantı ve CSS değil Veri listesinin yeni metni farkı üretiyordu, eski metinle fark kayboldu. Yazıların yeri ve satır kırılımı değişmedi. Böyle bir fark ortaya çıktığında önce bu yolla sebebi ayrılır, sonra referans yenilenir.

## Kapsam dışında kalanlar

Firefox, WebKit ve gerçek cihaz testi yoktur. Eski Safari sürümlerinin range sözdizimini yok sayması gibi motor farkları bu testlerle yakalanamaz, yalnızca derlenmiş CSS'te böyle bir sözdiziminin bulunmadığı denetlenir. Canlı sunucunun sıkıştırma, önbellek ve TLS ayarları da bu testlerin kapsamında değildir.
