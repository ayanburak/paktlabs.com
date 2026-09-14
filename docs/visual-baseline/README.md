# Görsel başlangıç kaydı

Bu kayıt, responsive ve mimari düzeltmeler öncesindeki görünümün karşılaştırılabilmesi için hazırlanmıştır. Kaynak sürüm 257ed7929ada14c9e6f12aac5ddcaccce8b9773e commit'idir. Görüntüler mevcut uygulamanın kaydıdır. Bütün ekranlarda tasarımın doğru olduğuna dair bir kabul oluşturmaz.

## Referans seçimi

Mobilde 390×844 ve masaüstünde 1920×1080 CSS pikselindeki Türkçe görüntüler, 14 Eylül 2026 tarihinde korunacak tasarım olarak onaylanmıştır. İngilizce görüntüler aynı ölçülerde dil değişiminin kontrolü için tutulur. Masaüstünde 1600×900 ek karşılaştırma kaydıdır.

Her ölçü Türkçe ve İngilizce olarak kaydedilmiştir. Dil değişince oluşan satır kırılımları kendi dilindeki görüntüyle karşılaştırılır.

| Kullanım | Ölçü | Türkçe | İngilizce |
|---|---|---|---|
| Onaylı mobil ölçüsü | 390×844 | [Görüntü](images/mobile-tr-390x844.png) | [Görüntü](images/mobile-en-390x844.png) |
| Onaylı masaüstü ölçüsü | 1920×1080 | [Görüntü](images/desktop-tr-1920x1080.png) | [Görüntü](images/desktop-en-1920x1080.png) |
| Ek masaüstü kaydı | 1600×900 | [Görüntü](images/desktop-alt-tr-1600x900.png) | [Görüntü](images/desktop-alt-en-1600x900.png) |

## Bilinen hata kayıtları

Tablet ve kırılım sınırı görüntüleri mevcut davranışı belgelemek için saklanır. Bu görüntülerdeki bozuk yerleşimler sonraki çalışmalarda korunacak hedef değildir. Düzeltmeden sonra yeni bir kabul görüntüsü ayrı olarak oluşturulur, başlangıç kaydı sessizce değiştirilmez.

| Durum | Ölçü | İzlenecek davranış | Türkçe | İngilizce |
|---|---|---|---|---|
| Dikey tablet | 1024×1366 | Hero kırpılması, başlıkla çakışma ve disiplinler figürünün kaybolması | [Görüntü](images/tablet-portrait-tr-1024x1366.png) | [Görüntü](images/tablet-portrait-en-1024x1366.png) |
| Yatay tablet | 1366×1024 | Hero kompozisyonu ve sol kenardaki disiplinler figürünün kırpılması | [Görüntü](images/tablet-landscape-tr-1366x1024.png) | [Görüntü](images/tablet-landscape-en-1366x1024.png) |
| Mobil düzenin son genişliği | 768×900 | Tek sütun düzeni ve mobil SVG seçimi | [Görüntü](images/breakpoint-below-tr-768x900.png) | [Görüntü](images/breakpoint-below-en-768x900.png) |
| Masaüstü düzenine ilk geçiş | 769×900 | Web bandında metin ve butonun örtülmesi, Hero kırpılması ve disiplinler figürünün kaybolması | [Görüntü](images/breakpoint-above-tr-769x900.png) | [Görüntü](images/breakpoint-above-en-769x900.png) |

## Korunacak görsel ilişkiler

Masaüstü Hero görselinin zemini bölümün alt çizgisine bağlıdır. Görselin alt kenarındaki küçük taşma, çizgiyle birleşmenin parçasıdır. Mobil Hero farklı bir kompozisyon kullanır ve bölüm çizgisinden önce bilinçli bir boşluk bırakır. Bu iki davranış birbirine eşitlenmez.

Veri, otomasyon ve web figürlerinin kendi zemin çizgileri bölüm sınırına oturur. Figürlerin bölümün altına taşan ayakları, boya kutusu veya diğer parçaları kırpılacak fazlalık olarak değerlendirilmez. SVG dosyasının alt kenarı ile çizimin zemin çizgisi aynı yer değildir.

| Figür | Mevcut zemin kaydırması | Masaüstü konumu | Mobil konumu |
|---|---|---|---|
| Veri | %32,91 | Sağ kenar | Listenin altında, sağda |
| Otomasyon | %1,77 | Sol kenar | Listenin altında, solda |
| Web | %12,31 | Sağ kenar | Listenin altında, sağda |

Disiplinler bölümünde masaüstü figürü kartların solundadır, mobil figür kartların üstündedir. Telefon figürü masaüstünde iletişim bölümünün alt sınırındadır. Mobilde farklı telefon görseli gönderme düğmesinin yanında durur.

Bu ilişkiler, mevcut metinler, SVG içerikleri ve renkler üzerinden kaydedilmiştir. Erişilebilirlik için ileride kararlaştırılacak renk değişiklikleri ayrı bir tasarım değişikliği olarak değerlendirilir.

## Ölçümlerin anlamı

[baseline.json](baseline.json), her ekran için bölüm, başlık ve görsel kutularını CSS pikseli cinsinden saklar. Gizli görsellerin display ve opacity değerleri de kaydedilir. Böylece bir görselin ekran dışında olması ile animasyon nedeniyle görünmemesi ayırt edilebilir.

İş bantlarının zemin konumu şu şekilde hesaplanmıştır:

```text
zemin = görsel kutusunun alt kenarı − görsel yüksekliği × zemin yüzdesi
sapma = hesaplanan zemin − bölümün alt kenarı
```

Bu hesap, mevcut CSS yerleşim modelini ölçer. SVG içindeki gerçek çizgi piksellerinin bağımsız olarak tespit edildiği anlamına gelmez. Çizimin bölüm sınırıyla görsel birleşmesi ekran görüntüsünden ayrıca incelenir.

## Kayıt koşulları

Kayıt, Linux üzerinde mevcut Playwright ve Chromium kurulumu kullanılarak alınmıştır. Tarayıcının tam sürümü, kayıt zamanı, derleme dosyalarının SHA-256 değerleri ve yüklenen font kaynaklarının SHA-256 değerleri baseline.json içinde bulunur. Yeni paket kurulmamıştır.

Ekran ölçüleri tarayıcının içerik alanıdır. Cihaz piksel oranı 1 olarak sabitlenmiştir. Bu ölçüler belirli bir fiziksel cihazın emülasyonu değildir. Retina ekranlar, mobil tarayıcı araç çubukları ve işletim sistemine bağlı font çizimi bu kaydın kapsamına girmez.

Normal hareket tercihi kullanılmıştır. Görseller ve fontlar yüklendikten sonra sayfa yarım ekranlık adımlarla kaydırılmış, başa dönülmüş ve animasyonların bitmesi beklenmiştir. Reveal sınıfları elle görünür yapılmamıştır. Bu nedenle görünürlük eşiğini geçemeyen figürler hata kayıtlarında gizli kalır.

Uygulama yereldeki üretim derlemesinden, tarayıcı istekleri bellekten karşılanarak açılmıştır. Kayıttan önce dosyalara yazmadan yeniden derleme yapılmış ve çıktıların mevcut dist ile birebir eşleştiği doğrulanmıştır. Google Fonts kaynakları ağ üzerinden yüklenmiştir. Font dosyaları bu klasöre dahil edilmemiştir.

## Tarayıcı kapsamı

Önerilen hedef güncel Chrome, Edge, Firefox ve Safari ile Android ve iOS/iPadOS tarayıcılarıdır. Eski sürüm desteği için alt sürüm sınırları ayrıca belirlenir. Bu öneri henüz kesinleştirilmiş bir destek politikası değildir.

Bu aşamada yalnızca Chromium üzerinde görüntü ve ölçüm kaydı alınmıştır. Firefox, WebKit ve gerçek Safari üzerinde test yapıldığı iddia edilmez. Hedef tarayıcı kapsamının tamamı responsive düzeltmelerin doğrulamasında ayrıca kontrol edilir.

## Sonraki karşılaştırmalar

Yerleşimi etkileyen değişikliklerde aynı ekran, dil, font ve tarayıcı koşullarıyla yeni görüntü alınır. Önce bölüm sınırları, SVG konumları ve metin kutuları karşılaştırılır. Ardından görüntüdeki değişiklik incelenir. Farklı tarayıcı veya işletim sistemleri arasındaki font çizimi farkları doğrudan yerleşim hatası sayılmaz.

Referans olarak kabul edilen ekranlarda açıklanmayan konum, boyut ve satır kırılımı değişikliği olmaması beklenir. Tablet hata kayıtlarında ise çakışmanın giderilmesi ve tasarımın zemin ilişkilerinin korunması aranır. Animasyon kapalıyken de aynı nihai yerleşimin elde edilmesi ikinci aşamanın kontrolüdür.

Bu klasör statik başlangıç kaydıdır ve değiştirilmez. Güncel onaylı görünümün otomatik karşılaştırması `frontend/tests/visual.spec.ts` ile yapılır, referansları `frontend/tests/visual.spec.ts-snapshots/` altında durur ve `npm run test:visual` ile çalıştırılır. Yerleşim ölçümleri `frontend/tests/layout.spec.ts` içindedir. GitHub Actions davranış testlerini çalıştırır, görsel testleri çalıştırmaz. Koşullar `frontend/tests/README.md` içinde anlatılır.
