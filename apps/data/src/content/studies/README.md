# Çalışma yazım rehberi

Bu belge data.paktlabs.com'a yeni bir çalışmanın nasıl yazılacağını ve çalışma sayfalarında kullanılabilen parçaları anlatır. Belge, içerik yazılırken açık duracak yerde, çalışma klasörlerinin ve parça tiplerinin tutulduğu `blocks.ts` dosyasının yanında durur. Sitenin sayfa türleri, içerik ilkeleri ve tasarım dili `apps/data/README.md` içinde anlatılır, burada yazılan her şey o ilkelere uyar.

Detay sayfası her çalışmada aynı iskeletle kurulur: kapak ve künye, Sorun, Yaklaşım ve Sonuç bandı, içindekiler, numaralı bölümler, Meraklısına kartı, yazar kutusu ve kapanış. İskeletin içeriği çalışmanın `page.ts` dosyasında yazılır. Bölümlerin içi ise serbesttir. Her bölüm `blocks` listesinde sırayla dizilen parçalardan oluşur. Bir parça içeriği bilmez, adını hikâyeden değil biçimden alır. Hangi parçanın hangi sırayla ve kaç kez kullanılacağı serbesttir, böylece iki çalışmanın sayfası birbirine benzemek zorunda kalmaz. Yeni bir anlatım biçimi gerektiğinde `src/content/studies/blocks.ts` içine yeni bir parça tipi, `src/components/study/blocks/` altına bileşeni eklenir. Eski sayfalara dokunulmaz. Kod, çıktı ve veri dosyası parçalarının ortak bileşenleri `blocks/file/` altında durur. Başka parça taşıyan bir parça eklenirse `childBlocks` içine karşılığı yazılır, parça ağacını gezen her yer `flattenBlocks` ile gezer. Yanlış ya da eksik yazılmış bir parça derleme hatası verir. `tests/data.spec.ts` ayrıca parçaların içeriğini denetler: tablo satırlarının hücre sayısı, şekil bölgeleri ve eksen sınırları, çizgi serilerinin nokta sayısı, bileşim ve pasta yüzdelerinin toplamı, ısı ve korelasyon tablolarının boyutu, karar tablosunun kareliği, adım adım hesabın sonuç satırı, hesap tablosu hücre adresi ve takvim aralığı.

Her metin iki dili yan yana taşır. Aşağıdaki örneklerde kısalık için yalnızca bir iki alan gösterilir.

Buradaki bloklar her çalışmada kullanılmak zorunda değildir. Çalışmanın türüne ve ihtiyacına göre katalogdan seçilip kullanılır. Katalog genişlemeye devam edecektir, bu yüzden katalogdaki her bloğun her çalışmada kullanılması beklenmez. Bir blok yalnızca o çalışmanın anlatımı ona gerçekten ihtiyaç duyduğunda kullanılır.

## Blok kataloğu

Bütün parçalar `data.paktlabs.com/blocks` adresindeki katalogda, bir çalışma sayfasında duracakları gibi örnek verilerle görülebilir. Her parça türü kendi numaralı bölümündedir, solda içindekiler durur. Yeni bir çalışma yazılırken parça buradan seçilir, alanlarının nasıl doldurulacağı bu rehberdeki başlığında okunur. Katalog ziyaretçi için değil ekip içindir. Sitede hiçbir yerden bağlantı verilmez, sunucuda nginx'in şifre korumasıyla kapalıdır ve arama motorlarına dizine eklenmemesi söylenir. Sayfanın JS dosyası sitenin öteki dosyaları gibi indirilebilir, katalogda gizli bir bilgi olmadığı için bunun sakıncası yoktur.

Katalogun içeriği `catalog/page.ts` dosyasındadır, örnek dosyaları `catalog/data` ve `catalog/code` altında bir çalışmanın klasör düzeniyle durur. Hiçbir çalışmaya bağlı değildir, bir çalışma yayından kalksa da katalog etkilenmez. Katalog parça türlerinin listesiyle tiplenir: `blocks.ts`'e yeni bir parça türü eklenip katalogda örneği yazılmazsa derleme durur. Böylece katalog hiçbir zaman eksik kalmaz. `tests/data.spec.ts` katalogun dosyalarını ve parçalarını çalışmalarla aynı denetimlerden geçirir, `tests/blocks.spec.ts` sayfanın iki dilde hatasız açıldığını ölçer ve her bölümün görsel referansını ayrı tutar.

Yeni bir parça türü eklenirken sırası şöyledir: `blocks.ts`'e tip yazılır ve `Block` birleşimine katılır, `src/components/study/blocks/` altına bileşeni ve stili eklenir, `BlockView`'a bir satır yazılır, başka parça taşıyorsa `childBlocks`'a karşılığı yazılır, katalogda bir bölüm açılır, bu rehbere bir başlık eklenir ve parçanın tiplerin yakalayamadığı kuralları varsa `data.spec.ts`'teki `blockProblems`'a denetimi yazılır.

## Sayfa iskeleti

`page.ts` iskeletin içeriğini taşır. `lede` kapaktaki tek cümlelik açıklama ve sekmenin açıklamasıdır. `facts` kapağın sağındaki satırlardır. `summary` Sorun, Yaklaşım ve Sonuç bandıdır. `chapters` numaralı bölümlerdir. `closing` kapanış bölümünün sorusu ve yanındaki çizimin yeridir, çizim gelene kadar alanın içinde hangi çizimin istendiği yazar. Yazar `works.ts`'teki kayıtta kimliğiyle anılır, adı, e-postası ve profil adresi brand'deki `content/profiles.ts`'te, fotoğrafı `content/profilePhotos.ts`'te durur. Meraklısına kartının metni çalışmaya değil sitenin sözlüğüne aittir ve kodun yerine göre seçilir.

```ts
closing: {
  title: { tr: 'Benzer bir dağınıklık sizde de var mı?', en: '…' },
  art: { label: { tr: 'Svg alanı · D2 · detay-teslim.svg · üçe dört', en: '…' }, note: { tr: '…', en: '…' } },
}
```

## Bölüm

Bölümün `id`'si adresteki parçadır, içindekiler bölüme onunla atlar. Sayfada tekil olmalı ve dilden bağımsız yazılmalıdır. Numara yazılmaz, bölümün sırasından çıkar. `label` hem başlığın üstünde hem içindekilerde görünen kısa addır. `lede` okurun yalnızca onu okusa bile hikâyeyi alacağı giriş paragrafıdır.

```ts
{
  id: 'problem',
  label: { tr: 'Sorun', en: 'Problem' },
  title: { tr: 'Aynı vida, dört farklı stok kartı', en: 'One screw, four different stock cards' },
  lede: { tr: '…', en: '…' },
  blocks: [],
}
```

## Paragraf

Bölüm girişinden sonra gelen ara anlatım içindir, örneğin bir tabloyu tanıtan cümle. Girişten daha küçük ve soluk yazılır.

```ts
{ type: 'paragraph', text: { tr: '…', en: '…' } }
```

## Liste

Kısa maddelerden oluşur, her maddenin kalın bir baş cümlesi ve açıklaması vardır. `columns` görünüşü maddeleri numaralı ve yan yana dizer, birkaç kısa etkiyi bir bakışta göstermek için. `stack` görünüşü maddeleri alt alta ve aralarında çizgiyle dizer, biraz daha uzun anlatılan sınırlar ya da uyarılar için. `title` verilirse listenin üstünde küçük bir başlık olarak durur.

```ts
{
  type: 'list',
  view: 'stack',
  title: { tr: 'Bilinen sınırlar', en: 'Known limits' },
  items: [{ title: { tr: 'Model yaşlanır.', en: 'The model ages.' }, text: { tr: '…', en: '…' } }],
}
```

## Açılır kutu

Ayrıntıyı ilk katmandan ayırır, okur isterse açar. Kapalıyken üstte küçük bir etiket ve başlık görünür. İçine başka parçalar konur, en sık hesap tablosu. Kapalı kutunun başlığında sayı kullanılmaz, çünkü o başlık da okurun karşısına kendiliğinden çıkar.

```ts
{
  type: 'details',
  meta: { tr: 'Tablo 1 · önce', en: 'Table 1 · before' },
  title: { tr: 'Ham veri: dört kaynaktan gelen kayıtlar', en: 'Raw data: records from four sources' },
  blocks: [/* hesap tablosu */],
}
```

## Hesap tablosu

Ham veriyi hesap tablosu programlarına benzeyen bir görünümle gösterir. Hücreler `csv` kimliğiyle çağrılan dosyadan gelir, buradaki alanlar yalnızca görünümü ayarlar. `name`, `tabs` ve `formula` verinin parçası sayılır ve verinin dilini izler: Türkçe veride `=TOPLA(C2:C5)`, İngilizce veride `=SUM(C2:C5)` yazılır. `cell` seçili hücredir, `formula` verilmezse formül çubuğu bu hücrenin değerini gösterir. `numbers` sağa yaslanan sayı sütunlarının harfleridir. `total` son satırın toplam satırı olduğunu söyler, `rows` dosya gerçek tablonun bir kesitiyse gerçek satır sayısını verir. `notes` tablonun altındaki açıklamalardır, sitenin dilini izler ve kaynak kusurlarını burada açıklar.

```ts
{
  type: 'sheet',
  csv: 'quarantine-summary',
  name: { tr: 'karantina_ozet.xlsx', en: 'quarantine_summary.xlsx' },
  tabs: { tr: ['ozet', 'kayitlar'], en: ['summary', 'records'] },
  cell: 'C6',
  formula: { tr: '=TOPLA(C2:C5)', en: '=SUM(C2:C5)' },
  numbers: ['C', 'D'],
  total: true,
  notes: [{ tr: '…', en: '…' }],
}
```

## Düz tablo

Kısa bir karşılaştırma içindir, hesap tablosu görünümü taşımaz ve sitenin dilini izler. İlk sütun satırın adıdır ve kalın yazılır. Bir hücre ya iki dilli bir metin ya da `{ meter: 34 }` gibi yüzde olarak bir orandır. Oran hücresine küçük bir çubuk ve yanında değeri çizilir.

```ts
{
  type: 'table',
  head: [{ tr: 'Kaynak', en: 'Source' }, { tr: 'Barkod dolu', en: 'Barcode filled' }],
  rows: [[{ tr: 'Tedarikçi A', en: 'Supplier A' }, { meter: 71 }]],
}
```

## İstasyon hattı

Sırayla geçilen adımlar içindir. İstasyonlar soldaki numaralı bir hattın üzerinde alt alta durur, numaralar sıradan çıkar. Her istasyonun adı ve ne yaptığını anlatan kısa bir metni vardır. `details` verilirse istasyonun alt kenarında "Ayrıntı" şeridi çıkar ve paragraflar okur açınca görünür.

```ts
{
  type: 'stations',
  items: [{ title: { tr: 'Doğrulama', en: 'Validation' }, text: { tr: '…', en: '…' }, details: [{ tr: '…', en: '…' }] }],
}
```

## Çubuk şekli

Tek bir soruya cevap verir. `label` şeklin üstündeki küçük etikettir, örneğin Şekil 1, `title` soru, `reading` tek cümlelik okuması. `direction` çubukların dikey mi yatay mı duracağını seçer. Eksen sıfırdan `max`'a uzanır ve kesilmez, `ticks` eksende yazan değerlerdir. `unit` ve `decimals` değerlerin nasıl yazılacağını söyler, yüzdeler sitenin diline göre %0,1 ya da 0.1% yazılır. Bir çubuğa `highlight` verilirse altın çizilir. `group` verilirse çubuğun üstünde yeni bir grup başlığı açılır. `zones` verilirse çubukların `zone` alanıyla bağlandığı bölgeler adlandırılır ve dikey şekilde çubukların altında bir bant olarak durur, `style` bölgenin zeminini seçer: `none`, `hatched` ya da `shaded`. `blocks` şeklin altına konan parçalardır, genellikle verisini taşıyan açılır kutu. Ekran okuyucunun okuduğu açıklama elle yazılmaz, çubuklardan üretilir.

```ts
{
  type: 'chart',
  direction: 'horizontal',
  label: { tr: 'Şekil 2', en: 'Figure 2' },
  title: { tr: 'Kaynağa göre kaçırılan eşleşme oranı', en: 'Share of missed matches, by source' },
  reading: { tr: '…', en: '…' },
  unit: 'percent',
  decimals: 1,
  max: 8,
  ticks: [0, 2, 4, 6, 8],
  bars: [{ label: { tr: 'Tedarikçi C', en: 'Supplier C' }, value: 6.2, highlight: true }],
  blocks: [/* açılır kutu ve hesap tablosu */],
}
```

## Çizgi şekli

Bir değerin zaman içinde nasıl değiştiğini gösterir: aylar, haftalar, sürümler. Kategorileri karşılaştırmak için değil, eğilimi göstermek için kullanılır, kategoriler için çubuk şekli seçilir. Üstteki etiket, soru, okuma ve altındaki parçalar çubuk şekliyle aynıdır. `points` yatay eksendeki noktaların adlarıdır, `series` çizgilerdir ve her serinin `values` listesi noktalar kadar değer taşır. Eksen sıfırdan `max`'a uzanır ve kesilmez, `ticks` eksende yazan değerlerdir. Her çizginin son değeri ve adı çizginin ucunda yazar, okur ayrı bir renk açıklaması aramaz. Uç etiketleri birbirine çok yakın düşerse kendiliğinden aralanır. `highlight` bir seriyi altın çizer. Vurgusuz ilk seri mürekkep, ondan sonrakiler gri çizilir. En fazla üç seri kullanılır, daha fazlası okunmaz. Sekizden fazla nokta dar ekranda yan yana sığmadığı için orada noktaların adları birer atlanarak yazılır. Ara değerler ekran okuyucuya okunmaz, onlar şeklin altındaki açılır kutudaki tabloda verilir.

```ts
{
  type: 'line',
  label: { tr: 'Şekil 2', en: 'Figure 2' },
  title: { tr: 'Aylara göre iade oranı', en: 'Return rate by month' },
  reading: { tr: '…', en: '…' },
  unit: 'percent',
  decimals: 1,
  max: 12,
  ticks: [0, 4, 8, 12],
  points: [{ tr: 'Oca', en: 'Jan' }, { tr: 'Şub', en: 'Feb' } /* … */],
  series: [{ label: { tr: 'İnternet', en: 'Online' }, values: [6.1, 6.4 /* … */], highlight: true }],
}
```

## Bileşim çubuğu

Birkaç bütünün parçalara nasıl bölündüğünü alt alta kıyaslar: kaynaklara göre kayıtların akıbeti, yıllara göre bütçenin dağılımı. Her satır ayrı bir bütündür ve yüzde yüzdür. Tek bir bütün anlatılacaksa pasta grafiği seçilir. `parts` parçaların adları ve zeminleridir, en fazla dört parça kullanılır. `style` zemini seçer: `ink` mürekkep, `light` açık gri, `gold` altın, `hatched` taramalı. Altın okurun gözünü tek bir parçaya çekmek için bir kez kullanılır. `rows` satırlardır, her satırın `values` listesi parçalarla aynı sırada yüzdeler taşır ve toplamı yüzdür. Yüzde 8'in altındaki dilimin değeri çubuğun içine sığmadığı için yazılmaz, kesin değerler altındaki açılır kutuda verilir. Ekran okuyucuya bütün değerler okunur.

```ts
{
  type: 'composition',
  label: { tr: 'Şekil 3', en: 'Figure 3' },
  title: { tr: 'Kaynağa göre kayıtların akıbeti', en: '…' },
  reading: { tr: '…', en: '…' },
  parts: [{ label: { tr: 'Birleşti', en: 'Merged' }, style: 'ink' }, { label: { tr: 'Karantina', en: 'Quarantine' }, style: 'hatched' }],
  rows: [{ label: { tr: 'Tedarikçi C', en: 'Supplier C' }, values: [89, 11] }],
}
```

## Pasta grafiği

Tek bir bütünün az sayıda parçaya bölünüşünü bir bakışta gösterir: iade nedenleri, bütçe kalemleri. En fazla beş dilim kullanılır, daha fazlası küçük dilimlerde okunmaz ve "Diğer" diye birleştirilir. Dilimler büyükten küçüğe yazılır, en büyüğü saat on ikiden başlar ve saat yönünde küçülür. Renkler sıradan gelir: mürekkep, altın, gri, açık gri, taramalı. Yüzdeler dilimin üstünde ve sağdaki listede yazar, yüzde 8'in altındaki dilimde yalnızca listede. Dilimlerin toplamı yüzdür. Dar ekranda liste dairenin altına iner.

```ts
{
  type: 'pie',
  label: { tr: 'Şekil 4', en: 'Figure 4' },
  title: { tr: 'İnternet iadelerinin nedenleri', en: '…' },
  reading: { tr: '…', en: '…' },
  slices: [{ label: { tr: 'Ölçü ya da beden uymadı', en: 'Size did not fit' }, value: 38 } /* … */],
}
```

## Isı tablosu

İki boyutlu bir sorunun cevabını tek bakışta verir: hangi kaynakta hangi alanın ne kadar dolu olduğu, hangi ayda hangi bölgenin zayıf kaldığı. Üstteki etiket, soru, okuma ve altındaki parçalar öteki şekillerle aynıdır. `columns` sütunların, `rows` satırların adlarıdır, her satırın `values` listesi sütunlarla aynı sırada değerler taşır. Hücrenin zemini değerle beş kademede koyulaşır ve değer her zaman hücrenin içinde yazar, renk tek başına bir şey anlatmaz. Koyuluk sürekli artmaz, çünkü orta koyulukta ne koyu ne açık yazı yeterince okunurdu. İlk üç kademede yazı koyu, son ikisinde açık renklidir. `max` en koyu kademenin karşılığıdır, yüzdelerde genellikle 100. Altta kademeleri gösteren bir ölçek durur.

```ts
{
  type: 'heat',
  label: { tr: 'Şekil 5', en: 'Figure 5' },
  title: { tr: 'Kaynağa ve alana göre doluluk', en: '…' },
  reading: { tr: '…', en: '…' },
  unit: 'percent',
  decimals: 0,
  max: 100,
  columns: [{ tr: 'Ad', en: 'Name' }, { tr: 'Barkod', en: 'Barcode' }],
  rows: [{ label: { tr: 'Tedarikçi C', en: 'Supplier C' }, values: [100, 12] }],
}
```

## Korelasyon tablosu

Birkaç değişkenin ikişer ikişer ne kadar birlikte hareket ettiğini gösterir. Veri analizi ve makine öğrenmesi işlerinde modele hangi değişkenin girdiğini anlatmak için kullanılır. Yalnızca alt üçgen çizilir, üst yarı aynı sayıları tekrar ederdi. Köşegende kendisiyle ilişkiyi gösteren kesikli hücreler durur. `variables` değişkenlerin adlarıdır. `values` satır satır yazılır: ilk satır boştur, ikinci satır bir, üçüncü satır iki değer taşır. Her değer o satırın değişkeniyle soldaki değişkenlerden biri arasındaki katsayıdır, -1 ile 1 arasında. Artı katsayı mürekkebin beş kademesinde, eksi katsayı altına doğru koyulaşır. Katsayı her hücrede işaretiyle ve iki haneyle yazar. 0,3'ten güçlü ilişkilerin hücresi çerçeve alır, göz önce onlara gider. Tablonun altında katsayının neden sonuç göstermediğini söyleyen not sitenin sözlüğünden gelir, her tabloda aynıdır. Dar ekranda tablo kendi alanında yana kaydırılır.

```ts
{
  type: 'correlation',
  label: { tr: 'Şekil 6', en: 'Figure 6' },
  title: { tr: 'Ürün özellikleri ve iade oranı arasındaki ilişki', en: '…' },
  reading: { tr: '…', en: '…' },
  variables: [{ tr: 'Fiyat', en: 'Price' }, { tr: 'İndirim oranı', en: 'Discount' }, { tr: 'İade oranı', en: 'Return rate' }],
  values: [[], [0.12], [0.15, 0.41]],
}
```

## Doğru ve yanlış kararlar

Bir modelin ya da kuralın kararlarını gerçekle karşılaştırır. Makine öğrenmesi ve veri kalitesi işleri için düşünüldü. Teknikte karışıklık matrisi denir ama sayfada bu terim kullanılmaz, her hücre ne olduğunu düz bir cümleyle söyler. Satırlar gerçekteki sınıf, sütunlar verilen karardır, ikisi de `classes` sırasındadır. `actual` ve `decided` eksenlerin adlarıdır, örneğin Gerçekte ve Modelin kararı. `cells` satır satır hücrelerdir, her hücre bir sayı ve ne anlama geldiğini söyleyen kısa bir metin taşır. Köşegendeki hücreler doğru kararlardır, gerisi hatadır ve altın zeminle ayrılır, Doğru ve Hata etiketleri buradan kendiliğinden çıkar. Satır ve sütun toplamları ile köşedeki genel toplam hesaplanır, elle yazılmaz. `key` verilirse tablonun altında hata türleri düz cümleyle anlatılır, örneğin hangisinin daha pahalı hata olduğu. İkiden fazla sınıf da yazılabilir, tablo kare kalmalıdır.

```ts
{
  type: 'matrix',
  label: { tr: 'Şekil 7', en: 'Figure 7' },
  title: { tr: 'Test setindeki 1.600 çiftte modelin kararları', en: '…' },
  reading: { tr: '…', en: '…' },
  actual: { tr: 'Gerçekte', en: 'Actually' },
  decided: { tr: 'Modelin kararı', en: 'Model decided' },
  classes: [{ tr: 'Aynı ürün', en: 'Same product' }, { tr: 'Farklı ürün', en: 'Different product' }],
  cells: [
    [{ value: 612, text: { tr: 'Birleştirildi', en: 'Merged' } }, { value: 18, text: { tr: 'Kaçırıldı, ayrı kaldı', en: '…' } }],
    [{ value: 4, text: { tr: 'Yanlışlıkla birleştirildi', en: '…' } }, { value: 966, text: { tr: 'Ayrı tutuldu', en: 'Kept apart' } }],
  ],
  key: [{ title: { tr: 'Kaçırılan', en: 'Missed' }, text: { tr: '…', en: '…' } }],
}
```

## Tek kayıt, önce ve sonra

Bir işin tek bir kayda ne yaptığını alan alan gösterir. Okur dönüşümü soyut bir anlatımdan değil somut bir satırdan görür. Hesap tablosu çok satırı, önce ve sonra parçası ölçüleri gösterir, bu parça tek bir kaydı yakından gösterir. `before` ve `after` iki sütunun başlıklarıdır, örneğin Kaynakta ve Normalizasyondan sonra, sitenin dilini izler. `fields` alanlardır. `name` alanın kendi adıdır, kod olduğu için iki dilde aynı yazılır. Alanın `before` ve `after` değerleri verinin parçasıdır ve hesap tablosu gibi verinin dilini izler, okur veri dilini değiştirince değerler de değişir. Değer yoksa yazılmaz, sayfada soluk bir boş yazar. Değişen alanın yeni değerinin solunda altın bir çizgi durur, değişmeyen alan soluk yazılır. İkisi de değerlerin kendisinden çıkar, elle işaretlenmez. `note` tablonun altındaki kısa açıklamadır.

```ts
{
  type: 'record',
  before: { tr: 'Kaynakta', en: 'In the source' },
  after: { tr: 'Normalizasyondan sonra', en: 'After normalisation' },
  fields: [
    { name: 'name', before: { tr: 'VİDA YHB 4X40 ÇİNKO 100LÜ', en: '…' }, after: { tr: 'Vida, yıldız başlı', en: '…' } },
    { name: 'size', after: { tr: '4 × 40 mm', en: '4 × 40 mm' } },
  ],
  note: { tr: '…', en: '…' },
}
```

## Adım adım hesap

Bir sayının nereden çıktığını satır satır gösterir: iş yükü, maliyet, kazanılan süre. Böyle bir hesap paragrafın içinde yazıldığında okur sayıları aklında tutmak zorunda kalır. `label`, `title` ve isteğe bağlı `reading` şekillerin üstündekiyle aynı ölçüdedir. `steps` satırlardır. İlk satırın işlemi yazılmaz, sonraki her satırın `op` alanı satırın önündeki işlemdir: `+`, `−`, `×`, `÷` ya da `=`. Son satır sonuçtur, `=` ile başlar ve değeri altın zeminde yazar. `detail` satırın altındaki kısa açıklamadır, sayının nereden geldiğini söyler. `value` değer birimiyle ve sitenin diline göre yazılmış haliyle yazılır, örneğin 23,3 saat ve 23.3 hours. Değerler hesaplanmaz, sayfadaki metinle aynı olmalıdır. Hesap şekil değil düz bir listedir, ekran okuyucu satırları tek tek okur.

```ts
{
  type: 'calc',
  label: { tr: 'Hesap 1', en: 'Calculation 1' },
  title: { tr: 'İnceleme bandının ekibe yükü', en: '…' },
  steps: [
    { label: { tr: 'İncelemeye giden çift', en: '…' }, value: { tr: '14.000', en: '14,000' } },
    { op: '×', label: { tr: 'Bir çifte bakma süresi', en: '…' }, value: { tr: '6 sn', en: '6 s' } },
    { op: '=', label: { tr: 'Toplam süre', en: 'Total time' }, value: { tr: '23,3 saat', en: '23.3 hours' } },
  ],
}
```

## Kabul ölçütleri

İşin başında müşteriyle konuşulan hedefleri ve teslimde ölçülen sonuçları yan yana koyar. Önce ve sonra parçası değişimi gösterir, bu parça verilen sözü gösterir. Her satırda `criterion` ölçüt, `target` hedef, `result` teslimdeki sonuçtur, `met` hedefin tutup tutmadığını söyler. Tutmayan bir hedef de yazılır ve durumu Karşılanmadı diye altın zeminde görünür. Bir işin yetersiz kaldığı yer saklanmaz, nedeni sayfanın Bilinen sınırlar bölümünde anlatılır. Sütun başlıkları ve durum etiketleri sitenin sözlüğünden gelir.

```ts
{
  type: 'acceptance',
  rows: [{ criterion: { tr: 'Gecelik çalışma süresi', en: '…' }, target: { tr: '60 dk altı', en: 'under 60 min' }, result: { tr: '41 dk', en: '41 min' }, met: true }],
}
```

## Karar listesi

Teknik okurun ilk soracağı "neden böyle" sorularının cevabı içindir. Her kararın sorusu başlık, cevabı paragraf olarak yazılır, üstünde "Karar 01" gibi numaralı bir etiket durur. Numara sıradan, etiketteki kelime sitenin sözlüğünden gelir. Her cevap bir deneme ya da ölçüme dayanmalıdır.

```ts
{
  type: 'decisions',
  items: [{ title: { tr: 'Neden barkodu doğrudan anahtar yapmadık', en: '…' }, text: { tr: '…', en: '…' } }],
}
```

## Zaman çizelgesi

Bir işin takvimini gösterir. `periods` dönem sayısı, `periodLabel` dönemlerin kısaltmasıdır, hafta için H ve W yazılırsa başlıklar H1, H2 diye çıkar. Her işin `start` başladığı dönem, `length` kaç dönem sürdüğüdür, yarım dönemler ondalıkla yazılır. `highlight` işi altın çizer, `legend` altın çubukların ne anlama geldiğini söyler.

```ts
{
  type: 'timeline',
  periods: 7,
  periodLabel: { tr: 'H', en: 'W' },
  tasks: [{ label: { tr: 'Etiketleme', en: 'Labelling' }, start: 3, length: 1.2, highlight: true }],
  legend: { tr: '…', en: '…' },
}
```

## Dosya ağacı

Teslim edilen bir deponun ya da veritabanının yapısını kod görünümünde gösterir. Her kolun bir kök adı ve altında öğeleri vardır. Öğe adları dosya ya da tablo adı olduğu için iki dilde aynı yazılır, yanındaki açıklama sitenin dilini izler. Bir öğeye `items` verilirse klasör olur ve altındaki öğeler bir kademe içeride çizilir. `highlight` öğeyi altınla, `muted` soluk çizer, kod sayfası paylaşılan ve paylaşılmayan dosyaları böyle ayırır. Ağaç çizgileri ve açıklamaların hizası kendiliğinden kurulur, boşlukla elle hizalama yapılmaz. `label` ekran okuyucunun ağacı tanıttığı addır.

```ts
{
  type: 'tree',
  label: { tr: 'Teslim edilen depo yapısı', en: 'Structure of the delivered repository' },
  groups: [{ root: 'matcher/', items: [{ name: 'rules/', items: [{ name: 'catalog.py', highlight: true }] }] }],
}
```

## Önce ve sonra

Bir işin öncesini ve sonrasını satır satır karşılaştırır. Her satırda neyin ölçüldüğü, önceki ve sonraki hal yazılır. `lead` verilirse sonraki halin başında kalın durur, okurun gözü önce değişimin kendisine gitsin diye. Sütun başlıkları sitenin sözlüğünden gelir.

```ts
{
  type: 'compare',
  rows: [{ label: { tr: 'Bulunan gerçek eşleşme', en: '…' }, before: { tr: 'Yüzde 18', en: '…' }, lead: { tr: 'Yüzde 97,2', en: '…' }, after: { tr: ', test setinde', en: '…' } }],
}
```

## Not kutusu

Akışın dışında kalan ama okurun bilmesi gereken kısa bir not içindir, örneğin bir sınırlama ya da bir uyarı. Paragraflardan ayrılsın diye solunda altın bir çizgiyle çerçeveli bir kutuda durur. Bir sayfada az kullanılır, çok kullanılırsa vurgusu kaybolur.

```ts
{ type: 'note', label: { tr: 'Erişim', en: 'Access' }, text: { tr: '…', en: '…' } }
```

## Kod sayfası

Kodu sitede paylaşılan bir çalışmanın kod sayfası `source.ts` dosyasında yazılır. Künye dosyası onu `code: { kind: 'page', page: () => import('./source') }` biçiminde anar. Sayfa detay sayfasıyla aynı bölüm yapısını kullanır, bölümlere detay sayfasındaki bütün parçalar da konabilir. `tags` kapakta görünen araç adlarıdır ve iki dilde aynıdır. Kod sayfasında açılır kutu kullanılmaz, kod ve veri açık durur.

```ts
export const source: SourcePage = {
  title: { tr: '…', en: '…' },
  lede: { tr: '…', en: '…' },
  tags: ['Python', 'SQL', 'CSV'],
  facts: [{ label: { tr: 'Dil', en: 'Language' }, value: { tr: 'Python 3.12', en: 'Python 3.12' } }],
  chapters: [],
}
```

## Kod dosyası

Çalışmanın `code` klasöründeki bir dosyayı satır numaralarıyla, yoluyla ve kopyalama düğmesiyle gösterir. `path` dosyanın `code/tr/` ve `code/en/` altındaki yoludur, başlıkta da bu yol yazar. Satır sayısı dosyadan, dilin adı ve renklendirme kuralları uzantıdan gelir. Dil `src/components/study/blocks/file/languages.ts` kaydından seçilir. Yeni bir dil gerektiğinde oraya bir kayıt eklenir, renklendirici ve kod bileşeni değişmez. Kayıtlı olmayan bir uzantı hata verir.

```ts
{ type: 'code', path: 'rules/catalog.py' }
```

## Terminal çıktısı

Bir komutun çıktısını kod dosyalarından biraz daha koyu bir zeminde, satır numarasız ve renksiz gösterir. Metni `code` klasöründeki bir dosyadadır ve kod gibi verinin dilini izler. Çıktıdaki sayılar sayfadaki tablolar ve şekillerle aynı olmalıdır.

```ts
{ type: 'output', path: 'out/evaluate.txt' }
```

## Veri dosyası

İndirilebilir bir veri dosyasını tam önizlemesiyle, indirme bağlantısıyla ve altındaki notla gösterir. `csv` dosyanın `data` klasöründeki kimliğidir, hesap tablosundaki gibi. `name` indirilen ve başlıkta görünen dosya adıdır, verinin dilini izler. `note` sitenin dilini izler. Satır, sütun ve boyut dosyadan hesaplanır.

```ts
{
  type: 'datafile',
  csv: 'raw-sample',
  name: { tr: 'ham_kayitlar_ornek.csv', en: 'raw_records_sample.csv' },
  note: { tr: '…', en: '…' },
}
```

Okuma süresi elle yazılmaz. İçindekilerin altında görünen süre, sayfadaki düz metnin kelime sayısından dakikada yaklaşık iki yüz kelimeyle hesaplanır. Tablo hücreleri sayılmaz, okur onları okumaz, göz atar.
