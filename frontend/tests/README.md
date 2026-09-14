# Landing testleri

Testler Playwright ile yazılmıştır ve gerçek bir Chromium tarayıcısında çalışır. Dil depolama hataları, ağ istekleri, klavye odağı ve yerleşim ölçümleri gerçek tarayıcı davranışına bağlı olduğu için jsdom tabanlı bir birim test ortamı kullanılmamıştır.

## Çalıştırma

Komutlar `frontend` klasöründe çalıştırılır. Tarayıcı ilk kurulumda bir kez indirilir.

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

`language.spec.ts` dil tercihinin okunmasını ve yazılmasını kontrol eder. Kayıt yokken, geçerli ve geçersiz kayıtta, `getItem` hata verdiğinde ve `localStorage` hiç erişilemediğinde sayfanın doğru dilde açıldığına bakar. Depolama dolu veya engelliyken dil değiştirmenin yine çalıştığı, yenilemede eski kaydın veya varsayılan dilin geldiği ölçülür. Başlık, açıklama ve `html lang` her durumda aktif dille birlikte kontrol edilir.

`links.spec.ts` disiplin bağlantılarının üst menü, mobil panel, kartlar, bantlar ve alt menüde doğru subdomain'e gittiğini iki dilde kontrol eder. Beklenen adresler test içinde elle yazılıdır, uygulamanın kendi adres dosyasından okunmaz. Böylece yanlış yazılmış bir adres testi de geçirmez. Uzak adreslerin gerçekten yanıt verdiği, DNS ve sertifikaların hazır olduğu bu testin kapsamında değildir.

`a11y.spec.ts` menü etiketlerini, dil düğmelerinin seçili durumunu, mobil menünün klavyeyle açılıp Escape ile kapanmasını, başlık sırasını, landmark yapısını ve Tab ile gezilen her elemanda odak çerçevesinin görünmesini kontrol eder. Otomatik bir erişilebilirlik tarayıcısı değildir, ekran okuyucuyla yapılan gerçek bir testin yerine geçmez.

`illustrations.spec.ts` ağ isteklerine bakarak ekran genişliğine uygun SVG'nin indirildiğini, diğer kompozisyonun hiç istenmediğini kontrol eder. Derleme çıktısında dosya adları hash taşıdığı için karşılaştırma hash'siz taban adla yapılır. Ekran genişliği eşiği geçtiğinde yeni dosyanın inmesi beklenen davranıştır.

`layout.spec.ts` responsive eşiklerin iki yanındaki ölçülerde, iki dilde yerleşim ilişkilerini ölçer. Yatay taşma, masaüstü Hero başlığı ile çizim arasındaki boşluk, Hero çiziminin bölüm çizgisine oturması, disiplin figürünün ekran içinde ve kartların üstünde durması, iş bantlarında çizimin başlık, açıklama, liste ve düğmeye değmemesi ve zemin çizgisinin bant sınırında kalması kontrol edilir. Ayrıca belirme animasyonları bittikten sonra görsellerin, hareket azaltma tercihindeki konumla aynı yerde durduğu doğrulanır.

`visual.spec.ts` onaylı görünümün Türkçe ve İngilizce, 390×844, 1024×1366, 1366×1024 ve 1920×1080 ölçülerinde tam sayfa görüntüsünü referansla karşılaştırır. Referanslar `visual.spec.ts-snapshots/` altında commit'lenir.

`support.ts` sayfayı istenen dil tercihiyle açan ve fontlarla görsellerin yüklenmesini bekleyen ortak yardımcıları taşır.

## Koşullar ve toleranslar

Bütün testlerde cihaz piksel oranı 1'dir. Ölçüler tarayıcının içerik alanıdır, belirli bir telefonun veya tabletin emülasyonu değildir. Retina ekranlar, mobil tarayıcı araç çubukları ve sayfa yakınlaştırması bu testlerin kapsamına girmez.

Yerleşim ve görsel testleri hareket azaltma tercihiyle çalışır. Bu tercihte bütün belirme animasyonları baştan açık gelir ve ölçüm animasyon zamanlamasına bağlı kalmaz. Normal hareketle aynı son yerleşime ulaşıldığı ayrı bir testte kontrol edilir.

Yerleşim ölçümlerinde konum ve zemin karşılaştırmaları için 1 CSS pikseli tolerans kullanılır. Metin için elemanın kutusu değil metnin kendi Range kutusu ölçülür, çünkü bir paragraf kutusu metnin kapladığından geniş olabilir. Görsel için img kutusu ölçülür. SVG içindeki şeffaf alan çizim gibi sayılır, bu yüzden bir çakışma uyarısı gerçek bir çizim çakışması olmayabilir ve görüntüden ayrıca incelenir. Zemin hesabı CSS modelini ölçer, SVG içindeki çizgiyi piksel olarak bulmaz:

```text
zemin sapması = görsel alt kenarı − görsel yüksekliği × zemin yüzdesi − bant alt kenarı
```

Görsel karşılaştırmada piksel başına Playwright'ın varsayılan renk eşiği kullanılır, farklı piksel oranı sıfırdır. Fontlar Google Fonts üzerinden ağdan yüklenir. Font sürümü, işletim sistemi veya font çizimi değiştiğinde çıkan fark önce görüntüden incelenir, doğrudan uygulama hatası sayılmaz. Referanslar Linux üzerinde Chromium 153 ile alınmıştır.

## Referansların yenilenmesi

Onaylı bir görsel değişiklikten sonra referanslar `npm run test:visual:update` ile yenilenir. Yenilenen görüntüler commit'lenmeden önce eski halleriyle yan yana incelenir. Açıklanamayan konum, boyut veya satır kırılımı farkı varsa referans güncellenmez, değişikliğin kendisi incelenir.

## Kapsam dışında kalanlar

Firefox, WebKit ve gerçek cihaz testi yoktur. Range sözdizimli medya sorgularının eski Safari sürümlerinde yok sayılması gibi motor farkları bu testlerle yakalanamaz. Canlı sunucunun sıkıştırma, önbellek ve TLS ayarları da bu testlerin kapsamında değildir.
