# Çalışma yazım rehberi

Bu belge data.paktlabs.com'a yeni bir çalışmanın nasıl yazılacağını ve çalışma sayfalarında kullanılabilen parçaları anlatır. Belge, içerik yazılırken açık duracak yerde, çalışma klasörlerinin ve parça tiplerinin tutulduğu `blocks.ts` dosyasının yanında durur. Sitenin sayfa türleri, içerik ilkeleri ve tasarım dili `apps/data/README.md` içinde anlatılır, burada yazılan her şey o ilkelere uyar.

Detay sayfası her çalışmada aynı iskeletle kurulur: kapak ve künye, Sorun, Yaklaşım ve Sonuç bandı, içindekiler, numaralı bölümler, Meraklısına kartı, yazar kutusu ve kapanış. İskeletin içeriği çalışmanın `page.ts` dosyasında yazılır. Bölümlerin içi ise serbesttir. Her bölüm `blocks` listesinde sırayla dizilen parçalardan oluşur. Bir parça içeriği bilmez, adını hikâyeden değil biçimden alır. Hangi parçanın hangi sırayla ve kaç kez kullanılacağı serbesttir, böylece iki çalışmanın sayfası birbirine benzemek zorunda kalmaz. Yeni bir anlatım biçimi gerektiğinde `src/content/studies/blocks.ts` içine yeni bir parça tipi, `src/components/study/blocks/` altına bileşeni eklenir. Eski sayfalara dokunulmaz. Kod, çıktı ve veri dosyası parçalarının ortak bileşenleri `blocks/file/` altında durur. Başka parça taşıyan bir parça eklenirse `childBlocks` içine karşılığı yazılır, parça ağacını gezen her yer `flattenBlocks` ile gezer. Yanlış ya da eksik yazılmış bir parça derleme hatası verir. `tests/data.spec.ts` ayrıca parçaların içeriğini denetler: tablo satırlarının hücre sayısı, şekil bölgeleri ve eksen sınırları, hesap tablosu hücre adresi ve takvim aralığı.

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
