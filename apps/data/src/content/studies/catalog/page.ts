/*
file: page.ts
importable: catalog, catalogChapters

Blok katalogunun icerigi. Her parca turu icin bir bolum, bolumun icinde o
parcanin ornek verilerle doldurulmus hali. Katalog bir calisma degildir,
calisma listesinde durmaz, yalnizca /blocks sayfasinda gorunur. Dosya okuyan
parcalar, yani hesap tablosu, veri dosyasi, kod ve terminal ciktisi, bu
klasorun kendi data ve code dosyalarini kullanir, hicbir calismaya bagli
degildir.

Yeni bir parca turu blocks.ts'e eklendiginde buraya da bir bolum yazilir,
yazilmazsa derleme durur.

description: Blok katalogunda her parca turunu ornek verilerle gosteren bolumler.
*/

// NOTE: Ornek dosyalar 2026-10-14'te Demo Veri'den kopyalandi. Demo Veri
// yayindan kalktiginda bu kopyalar burada kalir, katalog etkilenmez.

import type { Block } from '../blocks'
import type { Chapter } from '../types'
import { schema } from './schema'

// Bolumun etiketi parcanin kumesidir, Sekil ya da Veri gibi. Tur adi
// etikete yazilmaz, Turkce sayfada buyuk harfe cevrilince line kelimesindeki
// i noktali buyuk I olurdu. Tur adi girisin sonunda yazar.
//
// Anahtarlar Block birlesiminin butun turleridir. Bir tur eksik kalirsa ya da
// fazladan bir anahtar yazilirsa TypeScript derlemeyi durdurur. Bolumler
// buradaki sirayla, yazim rehberindeki sirayla gosterilir. Bolumun id'si
// parcanin turudur, data testi her bolumun kendi turunden bir parca
// tasidigini ayrica denetler.
export const catalog: Record<Block['type'], Omit<Chapter, 'id'>> = {
  paragraph: {
    label: { tr: 'Metin', en: 'Text' },
    title: { tr: 'Paragraf', en: 'Paragraph' },
    lede: {
      tr: 'Bölüm girişinden sonra gelen ara anlatım, örneğin iki tablodan önce onları tanıtan cümle. İçerik dosyasındaki adı paragraph.',
      en: 'Running text after the chapter intro, for example the sentence that introduces the next two tables. Its name in the content file is paragraph.',
    },
    blocks: [
      {
        type: 'paragraph',
        text: {
          tr: 'Aşağıdaki iki tablo aynı kayıtların temizlikten önceki ve sonraki halidir. Satırların sırası aynıdır, böylece her kaydın nasıl değiştiği yan yana okunabilir.',
          en: 'The two tables below are the same records before and after cleaning. The rows keep the same order, so each record can be read side by side.',
        },
      },
    ],
  },
  list: {
    label: { tr: 'Metin', en: 'Text' },
    title: { tr: 'Liste', en: 'List' },
    lede: {
      tr: 'Kısa maddeler. Yan yana numaralı görünüm birkaç etkiyi bir bakışta, alt alta görünüm biraz daha uzun anlatılan sınırları gösterir. İçerik dosyasındaki adı list.',
      en: 'Short items. The numbered side by side view shows a few effects at a glance, the stacked view shows limits that need a little more text. Its name in the content file is list.',
    },
    blocks: [
      {
        type: 'list',
        view: 'columns',
        items: [
          { title: { tr: 'Tek liste', en: 'One list' }, text: { tr: 'Dört kaynaktaki aynı ürün tek bir kartta toplandı.', en: 'The same product from four sources was gathered into one card.' } },
          { title: { tr: 'Yan yana fiyat', en: 'Prices side by side' }, text: { tr: 'Tedarikçi fiyatları aynı birimde karşılaştırılabiliyor.', en: 'Supplier prices can be compared in the same unit.' } },
          { title: { tr: 'Her gece', en: 'Every night' }, text: { tr: 'Yeni kayıtlar sabaha eşleşmiş olarak hazır.', en: 'New records are matched and ready by morning.' } },
        ],
      },
      {
        type: 'list',
        view: 'stack',
        title: { tr: 'Bilinen sınırlar', en: 'Known limits' },
        items: [
          { title: { tr: 'Kısa adlar', en: 'Short names' }, text: { tr: 'Üç kelimeden kısa ve barkodu olmayan kayıtlar çoğu zaman incelemeye düşer.', en: 'Records shorter than three words and without a barcode usually end up in review.' } },
          { title: { tr: 'Yeni birimler', en: 'New units' }, text: { tr: 'Sözlükte olmayan bir birim gelirse kayıt karantinaya alınır, sözlüğe elle eklenir.', en: 'A unit missing from the dictionary sends the record to quarantine until it is added by hand.' } },
        ],
      },
    ],
  },
  details: {
    label: { tr: 'Düzen', en: 'Layout' },
    title: { tr: 'Açılır kutu', en: 'Expandable box' },
    lede: {
      tr: 'Ayrıntıyı ilk katmandan ayırır. Kapalı gelir, okur isterse açar. İçine başka parçalar konabilir. İçerik dosyasındaki adı details.',
      en: 'Keeps detail out of the first layer. It starts closed and opens when the reader wants. Other blocks can go inside. Its name in the content file is details.',
    },
    blocks: [
      {
        type: 'details',
        meta: { tr: 'Profil', en: 'Profile' },
        title: { tr: 'Birim alanındaki farklı yazımlar', en: 'Different spellings in the unit field' },
        blocks: [
          {
            type: 'paragraph',
            text: {
              tr: 'Adet, ad, AD., pcs ve PK gibi yazımlar tek bir birim sözlüğüyle ortak bir biçime çevrildi.',
              en: 'Spellings such as pc, pcs, PC. and PK were turned into one form with a single unit dictionary.',
            },
          },
        ],
      },
    ],
  },
  sheet: {
    label: { tr: 'Veri', en: 'Data' },
    title: { tr: 'Hesap tablosu', en: 'Spreadsheet' },
    lede: {
      tr: 'Ham veri, hesap tablosu programlarına yakın bir görünümle. Kaynak kusurları düzeltilmeden durur ve altındaki notta açıklanır. İçerik dosyasındaki adı sheet.',
      en: 'Raw data in a view close to spreadsheet programs. Source flaws stay unfixed and are explained in the note below. Its name in the content file is sheet.',
    },
    blocks: [
      {
        type: 'sheet',
        csv: 'raw-sample',
        name: { tr: 'ham_kayitlar_ornek.xlsx', en: 'raw_records_sample.xlsx' },
        tabs: { tr: ['ham', 'ERP', 'TED-A'], en: ['raw', 'ERP', 'SUP-A'] },
        cell: 'C3',
        numbers: ['F'],
        notes: [
          {
            tr: 'ERP satırlarındaki Ý ve Þ harfleri dosyanın eski bir karakter kodlamasıyla kaydedilmesinden geliyor.',
            en: 'In the Turkish export the ERP rows carry broken letters, because the file was saved in an old character encoding.',
          },
        ],
      },
    ],
  },
  table: {
    label: { tr: 'Veri', en: 'Data' },
    title: { tr: 'Düz tablo', en: 'Plain table' },
    lede: {
      tr: 'Sitenin diliyle yazılan kısa bir karşılaştırma. Bir hücre oran taşıyorsa küçük bir çubukla çizilir. İçerik dosyasındaki adı table.',
      en: 'A short comparison written in the language of the site. A cell holding a share is drawn with a small bar. Its name in the content file is table.',
    },
    blocks: [
      {
        type: 'table',
        head: [
          { tr: 'Kaynak', en: 'Source' },
          { tr: 'Biçim', en: 'Format' },
          { tr: 'Barkod dolu', en: 'Barcode filled' },
        ],
        rows: [
          [{ tr: 'ERP', en: 'ERP' }, { tr: 'CSV', en: 'CSV' }, { meter: 34 }],
          [{ tr: 'Tedarikçi A', en: 'Supplier A' }, { tr: 'Excel', en: 'Excel' }, { meter: 71 }],
          [{ tr: 'Tedarikçi C', en: 'Supplier C' }, { tr: 'PDF', en: 'PDF' }, { meter: 12 }],
        ],
      },
    ],
  },
  stations: {
    label: { tr: 'Süreç', en: 'Process' },
    title: { tr: 'İstasyon hattı', en: 'Station line' },
    lede: {
      tr: 'Sırayla geçilen adımlar. Her adımın ayrıntısı alt kenarında açılan bir şeritte durur. İçerik dosyasındaki adı stations.',
      en: 'Steps passed in order. The detail of each step sits in a strip that opens at its bottom edge. Its name in the content file is stations.',
    },
    blocks: [
      {
        type: 'stations',
        items: [
          {
            title: { tr: 'Doğrulama', en: 'Validation' },
            text: { tr: 'Her kayıt önce bir dizi kuraldan geçer.', en: 'Every record first goes through a set of rules.' },
            details: [{ tr: 'Kuraldan geçemeyen kayıt düzeltilmez, nedeniyle kaynağına döner.', en: 'A record that fails is not fixed, it goes back to its source with the reason.' }],
          },
          {
            title: { tr: 'Normalizasyon', en: 'Normalisation' },
            text: { tr: 'Ürün adı parçalarına ayrılır: ne olduğu, ölçüsü ve kaplaması.', en: 'The product name is split into parts: what it is, its size and its finish.' },
          },
        ],
      },
    ],
  },
  chart: {
    label: { tr: 'Şekil', en: 'Figure' },
    title: { tr: 'Çubuk şekli', en: 'Bar chart' },
    lede: {
      tr: 'Tek bir soruya cevap veren dikey ya da yatay çubuklar. Eksen sıfırdan başlar, değer çubuğun ucunda yazar. İçerik dosyasındaki adı chart.',
      en: 'Vertical or horizontal bars answering one question. The axis starts at zero and the value sits at the end of the bar. Its name in the content file is chart.',
    },
    blocks: [
      {
        type: 'chart',
        direction: 'horizontal',
        label: { tr: 'Şekil 1', en: 'Figure 1' },
        title: { tr: 'Kaynağa göre kaçırılan eşleşme oranı', en: 'Share of missed matches, by source' },
        reading: { tr: 'Tedarikçi C diğer kaynakların üç katı eşleşme kaçırdı.', en: 'Supplier C missed three times as many matches as the other sources.' },
        unit: 'percent',
        decimals: 1,
        max: 8,
        ticks: [0, 2, 4, 6, 8],
        bars: [
          { label: { tr: 'ERP', en: 'ERP' }, value: 1.9 },
          { label: { tr: 'Tedarikçi A', en: 'Supplier A' }, value: 2.0 },
          { label: { tr: 'Tedarikçi C', en: 'Supplier C' }, value: 6.2, highlight: true },
        ],
      },
    ],
  },
  line: {
    label: { tr: 'Şekil', en: 'Figure' },
    title: { tr: 'Çizgi şekli', en: 'Line chart' },
    lede: {
      tr: 'Bir değerin zaman içinde nasıl değiştiğini gösterir. Her çizginin sonunda değeri ve adı yazar, ayrı bir renk açıklaması aranmaz. İçerik dosyasındaki adı line.',
      en: 'Shows how a value changes over time. Each line ends with its value and name, so no colour key is needed. Its name in the content file is line.',
    },
    blocks: [
      {
        type: 'line',
        label: { tr: 'Şekil 2', en: 'Figure 2' },
        title: { tr: 'Aylara göre iade oranı', en: 'Return rate by month' },
        reading: {
          tr: 'Mağaza iadesi yıl boyunca yüzde 3 civarında kaldı, internet satışlarında ise her ay biraz arttı ve yıl sonunda neredeyse iki katına çıktı.',
          en: 'Store returns stayed around 3 percent all year, while online returns rose a little every month and almost doubled by the end of the year.',
        },
        unit: 'percent',
        decimals: 1,
        max: 12,
        ticks: [0, 4, 8, 12],
        points: [
          { tr: 'Oca', en: 'Jan' },
          { tr: 'Şub', en: 'Feb' },
          { tr: 'Mar', en: 'Mar' },
          { tr: 'Nis', en: 'Apr' },
          { tr: 'May', en: 'May' },
          { tr: 'Haz', en: 'Jun' },
          { tr: 'Tem', en: 'Jul' },
          { tr: 'Ağu', en: 'Aug' },
          { tr: 'Eyl', en: 'Sep' },
          { tr: 'Eki', en: 'Oct' },
          { tr: 'Kas', en: 'Nov' },
          { tr: 'Ara', en: 'Dec' },
        ],
        series: [
          { label: { tr: 'İnternet', en: 'Online' }, values: [6.1, 6.4, 6.0, 6.8, 7.2, 7.9, 8.4, 9.1, 9.6, 10.2, 10.8, 11.3], highlight: true },
          { label: { tr: 'Mağaza', en: 'Store' }, values: [3.2, 3.0, 3.4, 3.1, 3.3, 3.5, 3.2, 3.4, 3.3, 3.6, 3.4, 3.5] },
        ],
      },
    ],
  },
  composition: {
    label: { tr: 'Şekil', en: 'Figure' },
    title: { tr: 'Bileşim çubuğu', en: 'Composition bar' },
    lede: {
      tr: 'Birkaç bütünün parçalara nasıl bölündüğünü alt alta kıyaslar. Her satır yüzde yüzdür, dar dilimlerin değeri açılır kutuda verilir. İçerik dosyasındaki adı composition.',
      en: 'Compares how several wholes split into parts, one under another. Each row is a hundred percent, narrow slices get their value in the box below. Its name in the content file is composition.',
    },
    blocks: [
      {
        type: 'composition',
        label: { tr: 'Şekil 3', en: 'Figure 3' },
        title: { tr: 'Kaynağa göre kayıtların akıbeti', en: 'What happened to the records, by source' },
        reading: {
          tr: "Her kaynakta kayıtların çoğu başka bir kayıtla birleşti. Tedarikçi C'de karantinaya alınan pay diğerlerinin üç katı.",
          en: 'In every source most records merged with another record. Supplier C sent three times as many records to quarantine as the others.',
        },
        parts: [
          { label: { tr: 'Birleşti', en: 'Merged' }, style: 'ink' },
          { label: { tr: 'Tek kaldı', en: 'Stayed single' }, style: 'light' },
          { label: { tr: 'İncelemeye gitti', en: 'Went to review' }, style: 'gold' },
          { label: { tr: 'Karantina', en: 'Quarantine' }, style: 'hatched' },
        ],
        rows: [
          { label: { tr: 'ERP', en: 'ERP' }, values: [62, 29, 6, 3] },
          { label: { tr: 'Tedarikçi A', en: 'Supplier A' }, values: [58, 31, 7, 4] },
          { label: { tr: 'Tedarikçi B', en: 'Supplier B' }, values: [66, 26, 5, 3] },
          { label: { tr: 'Tedarikçi C', en: 'Supplier C' }, values: [49, 30, 10, 11] },
        ],
        blocks: [
          {
            type: 'details',
            meta: { tr: 'Şekil 3 · Veri', en: 'Figure 3 · Data' },
            title: { tr: 'Bütün yüzdeler', en: 'All percentages' },
            blocks: [
              {
                type: 'table',
                head: [
                  { tr: 'Kaynak', en: 'Source' },
                  { tr: 'Birleşti', en: 'Merged' },
                  { tr: 'Tek kaldı', en: 'Single' },
                  { tr: 'İnceleme', en: 'Review' },
                  { tr: 'Karantina', en: 'Quarantine' },
                ],
                rows: [
                  [{ tr: 'ERP', en: 'ERP' }, { meter: 62 }, { meter: 29 }, { meter: 6 }, { meter: 3 }],
                  [{ tr: 'Tedarikçi C', en: 'Supplier C' }, { meter: 49 }, { meter: 30 }, { meter: 10 }, { meter: 11 }],
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  pie: {
    label: { tr: 'Şekil', en: 'Figure' },
    title: { tr: 'Pasta grafiği', en: 'Pie chart' },
    lede: {
      tr: 'Tek bir bütünün az sayıda parçaya bölünüşü. En fazla beş dilim, en büyüğü saat on ikiden başlar. İçerik dosyasındaki adı pie.',
      en: 'One whole split into a few parts. Five slices at most, the largest starts at twelve o’clock. Its name in the content file is pie.',
    },
    blocks: [
      {
        type: 'pie',
        label: { tr: 'Şekil 4', en: 'Figure 4' },
        title: { tr: 'İnternet iadelerinin nedenleri', en: 'Reasons for online returns' },
        reading: {
          tr: 'İadelerin üçte birinden fazlası ölçü ya da beden uymadığı için geldi. Hasarlı gelen ürünler ikinci sırada.',
          en: 'More than a third of returns came back because the size did not fit. Damaged goods come second.',
        },
        slices: [
          { label: { tr: 'Ölçü ya da beden uymadı', en: 'Size did not fit' }, value: 38 },
          { label: { tr: 'Hasarlı geldi', en: 'Arrived damaged' }, value: 24 },
          { label: { tr: 'Beklentiyi karşılamadı', en: 'Did not meet expectations' }, value: 19 },
          { label: { tr: 'Yanlış ürün gönderildi', en: 'Wrong item sent' }, value: 11 },
          { label: { tr: 'Diğer', en: 'Other' }, value: 8 },
        ],
      },
    ],
  },
  heat: {
    label: { tr: 'Tablo', en: 'Table' },
    title: { tr: 'Isı tablosu', en: 'Heat table' },
    lede: {
      tr: 'İki boyutlu bir sorunun cevabını tek bakışta verir. Hücrenin koyuluğu değeri gösterir, sayı hücrenin içinde yazar. İçerik dosyasındaki adı heat.',
      en: 'Answers a two-way question at a glance. The darkness of a cell shows its value and the number is written inside. Its name in the content file is heat.',
    },
    blocks: [
      {
        type: 'heat',
        label: { tr: 'Şekil 5', en: 'Figure 5' },
        title: { tr: 'Kaynağa ve alana göre doluluk', en: 'Fill rate by source and field' },
        reading: {
          tr: "Ad ve fiyat her kaynakta dolu. Asıl boşluk barkod ve ölçüde, en çok da Tedarikçi C'de.",
          en: 'Name and price are filled in every source. The real gaps are in barcode and size, most of all at Supplier C.',
        },
        unit: 'percent',
        decimals: 0,
        max: 100,
        columns: [
          { tr: 'Ad', en: 'Name' },
          { tr: 'Fiyat', en: 'Price' },
          { tr: 'Marka', en: 'Brand' },
          { tr: 'Ölçü', en: 'Size' },
          { tr: 'Barkod', en: 'Barcode' },
        ],
        rows: [
          { label: { tr: 'ERP', en: 'ERP' }, values: [100, 100, 92, 61, 34] },
          { label: { tr: 'Tedarikçi A', en: 'Supplier A' }, values: [100, 100, 97, 48, 71] },
          { label: { tr: 'Tedarikçi B', en: 'Supplier B' }, values: [100, 99, 100, 88, 88] },
          { label: { tr: 'Tedarikçi C', en: 'Supplier C' }, values: [100, 96, 63, 22, 12] },
        ],
      },
    ],
  },
  correlation: {
    label: { tr: 'Şekil', en: 'Figure' },
    title: { tr: 'Korelasyon tablosu', en: 'Correlation table' },
    lede: {
      tr: 'Birkaç değişkenin ikişer ikişer ne kadar birlikte hareket ettiğini gösterir. Yalnızca alt üçgen çizilir. İçerik dosyasındaki adı correlation.',
      en: 'Shows how strongly several variables move together, pair by pair. Only the lower triangle is drawn. Its name in the content file is correlation.',
    },
    blocks: [
      {
        type: 'correlation',
        label: { tr: 'Şekil 6', en: 'Figure 6' },
        title: { tr: 'Ürün özellikleri ve iade oranı arasındaki ilişki', en: 'How product features relate to the return rate' },
        reading: {
          tr: 'İadeyle en güçlü ilişki ürün puanında, puan düştükçe iade artıyor. İndirim oranı ve uzun teslim de iadeyle birlikte artıyor, fiyatın etkisi zayıf.',
          en: 'The strongest link to returns is the product rating, returns rise as the rating falls. Discount and long delivery also rise with returns, price has little effect.',
        },
        variables: [
          { tr: 'Fiyat', en: 'Price' },
          { tr: 'İndirim oranı', en: 'Discount' },
          { tr: 'Teslim süresi', en: 'Delivery time' },
          { tr: 'Ürün puanı', en: 'Rating' },
          { tr: 'İade oranı', en: 'Return rate' },
        ],
        values: [[], [0.12], [0.08, -0.05], [0.21, -0.1, -0.34], [0.15, 0.41, 0.38, -0.62]],
      },
    ],
  },
  matrix: {
    label: { tr: 'Sonuç', en: 'Result' },
    title: { tr: 'Doğru ve yanlış kararlar', en: 'Right and wrong decisions' },
    lede: {
      tr: 'Bir modelin ya da kuralın kararlarını gerçekle karşılaştırır. Toplamlar kendiliğinden hesaplanır, hatalı kutular altın zeminle ayrılır. İçerik dosyasındaki adı matrix.',
      en: 'Compares the decisions of a model or a rule with the truth. Totals are calculated on their own and wrong cells stand out in gold. Its name in the content file is matrix.',
    },
    blocks: [
      {
        type: 'matrix',
        label: { tr: 'Şekil 7', en: 'Figure 7' },
        title: { tr: 'Test setindeki 1.600 çiftte modelin kararları', en: 'The model’s decisions on 1,600 test pairs' },
        reading: {
          tr: "Model 1.600 çiftin 1.578'inde doğru karar verdi. Yanıldığı 22 çiftin 18'i kaçırılan eşleşme, yanlış birleştirdiği yalnızca 4 çift var.",
          en: 'The model was right on 1,578 of 1,600 pairs. Of the 22 it got wrong, 18 were missed matches and only 4 were wrongly merged.',
        },
        actual: { tr: 'Gerçekte', en: 'Actually' },
        decided: { tr: 'Modelin kararı', en: 'Model decided' },
        classes: [
          { tr: 'Aynı ürün', en: 'Same product' },
          { tr: 'Farklı ürün', en: 'Different product' },
        ],
        cells: [
          [
            { value: 612, text: { tr: 'Birleştirildi', en: 'Merged' } },
            { value: 18, text: { tr: 'Kaçırıldı, ayrı kaldı', en: 'Missed, left apart' } },
          ],
          [
            { value: 4, text: { tr: 'Yanlışlıkla birleştirildi', en: 'Merged by mistake' } },
            { value: 966, text: { tr: 'Ayrı tutuldu', en: 'Kept apart' } },
          ],
        ],
        key: [
          {
            title: { tr: 'Kaçırılan', en: 'Missed' },
            text: { tr: 'İki kayıt aynı üründü ama model ayırdı. Listede aynı ürün iki kez kalır, zararı küçüktür.', en: 'The two records were the same product but the model kept them apart. The product stays in the list twice, which does little harm.' },
          },
          {
            title: { tr: 'Yanlış birleşen', en: 'Wrongly merged' },
            text: { tr: 'İki kayıt farklı üründü ama model birleştirdi. İki ürünün fiyatı karışır, bu yüzden daha pahalı hatadır.', en: 'The two records were different products but the model merged them. Their prices get mixed, which makes it the costlier mistake.' },
          },
        ],
      },
    ],
  },
  record: {
    label: { tr: 'Veri', en: 'Data' },
    title: { tr: 'Tek kayıt, önce ve sonra', en: 'One record, before and after' },
    lede: {
      tr: 'Bir işin tek bir kayda ne yaptığını alan alan gösterir. Değerler verinin dilini izler, değişen alanlar kendiliğinden işaretlenir. İçerik dosyasındaki adı record.',
      en: 'Shows field by field what a job did to one record. Values follow the data language and changed fields are marked on their own. Its name in the content file is record.',
    },
    blocks: [
      {
        type: 'record',
        before: { tr: 'Kaynakta', en: 'In the source' },
        after: { tr: 'Normalizasyondan sonra', en: 'After normalisation' },
        fields: [
          { name: 'name', before: { tr: 'VİDA YHB 4X40 ÇİNKO 100LÜ', en: 'SCREW PH 4X40 ZINC 100PC' }, after: { tr: 'Vida, yıldız başlı', en: 'Screw, Phillips head' } },
          { name: 'size', after: { tr: '4 × 40 mm', en: '4 × 40 mm' } },
          { name: 'finish', after: { tr: 'Çinko', en: 'Zinc' } },
          { name: 'pack_qty', before: { tr: 'PKT', en: 'PKT' }, after: { tr: '100 adet', en: '100 pieces' } },
          { name: 'barcode', before: { tr: '8691234500127', en: '8691234500127' }, after: { tr: '8691234500127', en: '8691234500127' } },
        ],
        note: {
          tr: 'Ölçü, kaplama ve paketteki adet adın içinden ayrıştırıldı. Barkod değişmedi.',
          en: 'Size, finish and pack quantity were parsed out of the name. The barcode did not change.',
        },
      },
    ],
  },
  calc: {
    label: { tr: 'Gerekçe', en: 'Reasoning' },
    title: { tr: 'Adım adım hesap', en: 'Step by step calculation' },
    lede: {
      tr: 'Bir sayının nereden çıktığını satır satır gösterir. Son satır sonuçtur ve altın zeminde yazar. İçerik dosyasındaki adı calc.',
      en: 'Shows line by line where a number comes from. The last line is the result, written on gold. Its name in the content file is calc.',
    },
    blocks: [
      {
        type: 'calc',
        label: { tr: 'Hesap 1', en: 'Calculation 1' },
        title: { tr: 'İnceleme bandının ekibe yükü', en: 'The review load on the team' },
        reading: { tr: 'Bant geniş tutulduğunda bile yük günde üç saati geçmiyor.', en: 'Even with a wide band the load stays under three hours a day.' },
        steps: [
          { label: { tr: 'İncelemeye giden çift', en: 'Pairs sent to review' }, detail: { tr: '0,55 ile 0,92 arası skor alanlar', en: 'scored between 0.55 and 0.92' }, value: { tr: '14.000', en: '14,000' } },
          { op: '×', label: { tr: 'Bir çifte bakma süresi', en: 'Time to check one pair' }, detail: { tr: 'ekibin ilk haftasındaki ortalama', en: 'team average in the first week' }, value: { tr: '6 sn', en: '6 s' } },
          { op: '=', label: { tr: 'Toplam süre', en: 'Total time' }, value: { tr: '23,3 saat', en: '23.3 hours' } },
          { op: '÷', label: { tr: 'İş günü', en: 'Working days' }, detail: { tr: 'devirden önceki iki hafta', en: 'the two weeks before handover' }, value: { tr: '9', en: '9' } },
          { op: '=', label: { tr: 'Günlük yük', en: 'Daily load' }, value: { tr: '2,6 saat', en: '2.6 hours' } },
        ],
      },
    ],
  },
  acceptance: {
    label: { tr: 'Sonuç', en: 'Result' },
    title: { tr: 'Kabul ölçütleri', en: 'Acceptance criteria' },
    lede: {
      tr: 'İşin başındaki hedefleri ve teslimde ölçülen sonuçları yan yana koyar. Tutmayan bir hedef de saklanmaz. İçerik dosyasındaki adı acceptance.',
      en: 'Puts the targets agreed at the start next to the results measured at handover. A missed target is not hidden. Its name in the content file is acceptance.',
    },
    blocks: [
      {
        type: 'acceptance',
        rows: [
          { criterion: { tr: 'Kaçırılan eşleşme, bütün kaynaklar', en: 'Missed matches, all sources' }, target: { tr: "%3'ün altı", en: 'under 3%' }, result: { tr: '%2,4', en: '2.4%' }, met: true },
          { criterion: { tr: 'Yanlış birleşme', en: 'Wrong merges' }, target: { tr: "%0,5'in altı", en: 'under 0.5%' }, result: { tr: '%0,25', en: '0.25%' }, met: true },
          { criterion: { tr: 'Gecelik çalışma süresi', en: 'Nightly run time' }, target: { tr: '60 dk altı', en: 'under 60 min' }, result: { tr: '41 dk', en: '41 min' }, met: true },
          { criterion: { tr: 'Kaçırılan eşleşme, Tedarikçi C', en: 'Missed matches, Supplier C' }, target: { tr: "%3'ün altı", en: 'under 3%' }, result: { tr: '%6,2', en: '6.2%' }, met: false },
        ],
      },
    ],
  },
  schema: {
    label: { tr: 'Kod', en: 'Code' },
    title: { tr: 'Veritabanı şeması', en: 'Database schema' },
    lede: {
      tr: 'Kurulan veritabanının tablolarını ve bağlarını gösterir. İki görünüşü var: çizim levhası ve ortadaki tablo. Çizgiler yerleşimden kendiliğinden hesaplanır. İçerik dosyasındaki adı schema.',
      en: 'Shows the tables of a delivered database and how they link. It has two views: the drawing sheet and the central table. Lines are worked out from the layout on their own. Its name in the content file is schema.',
    },
    blocks: [
      {
        type: 'schema',
        view: 'plate',
        schema,
        layout: ['brand product review_decision', 'supplier supplier_item price_history'],
        label: { tr: 'Şema 1', en: 'Schema 1' },
        title: { tr: 'Teslim edilen veritabanının yapısı', en: 'Structure of the delivered database' },
        reading: {
          tr: 'Ürün kartı merkezde durur. Kaynaklardan gelen her satır bir ürüne bağlanır, fiyatlar ve inceleme kararları bu satırların etrafında birikir.',
          en: 'The product card sits at the centre. Every row from the sources links to a product, and prices and review decisions gather around these rows.',
        },
        blocks: [
          {
            type: 'details',
            meta: { tr: 'Şema 1 · Ayrıntı', en: 'Schema 1 · Detail' },
            title: { tr: 'Tabloların bütün sütunları', en: 'Every column of every table' },
            blocks: schema.tables.map((table) => ({ type: 'dbtable', view: 'columns', schema, table: table.name }) as const),
          },
        ],
      },
      {
        type: 'schema',
        view: 'center',
        schema,
        main: 'product',
        layout: [
          'brand product review_decision',
          'brand product review_decision',
          'supplier supplier_item price_history',
        ],
        label: { tr: 'Şema 2', en: 'Schema 2' },
        title: { tr: 'Aynı veritabanı, ürün kartı ortada', en: 'The same database, product card in the middle' },
        reading: {
          tr: 'Ortadaki görünüş tek bir tablonun etrafında dönen şemalar için. Merkezi belli olmayan bir şemada çizim levhası seçilir.',
          en: 'The central view suits schemas that turn around one table. For a schema without a clear centre, the drawing sheet is used.',
        },
      },
    ],
  },
  dbtable: {
    label: { tr: 'Veri', en: 'Data' },
    title: { tr: 'Veritabanı tablosu', en: 'Database table' },
    lede: {
      tr: 'Hesap tablosunun veritabanındaki karşılığı. Bir tablonun sütun yapısını ya da bir sorgunun sonucunu gösterir. İçerik dosyasındaki adı dbtable.',
      en: 'The database counterpart of the spreadsheet. Shows the columns of a table or the result of a query. Its name in the content file is dbtable.',
    },
    blocks: [
      { type: 'dbtable', view: 'columns', schema, table: 'supplier_item' },
      { type: 'dbtable', view: 'rows', schema, table: 'supplier_item', csv: 'supplier-items' },
      {
        type: 'paragraph',
        text: {
          tr: 'Aynı vida dört kaynakta dört ayrı adla geçiyor. Tedarikçi C tek tek satıyor ve kendi kodunu vermiyor, fiyatı bu yüzden paket fiyatıyla yan yana konamazdı.',
          en: 'The same screw appears under four names in four sources. Supplier C sells single pieces and gives no code of its own, so its price could not sit next to the pack prices.',
        },
      },
    ],
  },
  decisions: {
    label: { tr: 'Gerekçe', en: 'Reasoning' },
    title: { tr: 'Karar listesi', en: 'Decision list' },
    lede: {
      tr: 'Teknik okurun soracağı "neden böyle" sorularının cevabı. Her cevap bir deneme ya da ölçüme dayanır. İçerik dosyasındaki adı decisions.',
      en: 'Answers to the "why this way" questions a technical reader will ask. Every answer rests on a trial or a measurement. Its name in the content file is decisions.',
    },
    blocks: [
      {
        type: 'decisions',
        items: [
          {
            title: { tr: 'Neden barkodu doğrudan anahtar yapmadık', en: 'Why we did not use the barcode as the key' },
            text: { tr: 'Barkod bir kaynakta yüzde 12, başka birinde yüzde 34 doluydu. Modelin özelliklerinden biri yaptık.', en: 'The barcode was 12 percent filled in one source and 34 in another. We made it one of the model features.' },
          },
        ],
      },
    ],
  },
  timeline: {
    label: { tr: 'Süreç', en: 'Process' },
    title: { tr: 'Zaman çizelgesi', en: 'Timeline' },
    lede: {
      tr: 'Bir işin takvimi. Altın çubuklar ayrı bir tarafın işini gösterir, altında anlamı yazar. İçerik dosyasındaki adı timeline.',
      en: 'The schedule of a job. Gold bars show the work of another party, their meaning is written below. Its name in the content file is timeline.',
    },
    blocks: [
      {
        type: 'timeline',
        periods: 4,
        periodLabel: { tr: 'H', en: 'W' },
        tasks: [
          { label: { tr: 'Denetim', en: 'Audit' }, start: 1, length: 1 },
          { label: { tr: 'Etiketleme', en: 'Labelling' }, start: 2, length: 1, highlight: true },
          { label: { tr: 'Model ve teslim', en: 'Model and handover' }, start: 2.5, length: 2.5 },
        ],
        legend: { tr: 'Altın çubuk müşterinin ekibinin çalıştığı hafta.', en: 'The gold bar is the week the client team worked.' },
      },
    ],
  },
  tree: {
    label: { tr: 'Kod', en: 'Code' },
    title: { tr: 'Dosya ağacı', en: 'File tree' },
    lede: {
      tr: 'Teslim edilen bir deponun ya da veritabanının yapısı, kod görünümünde. İçerik dosyasındaki adı tree.',
      en: 'The structure of a delivered repository or database, in a code view. Its name in the content file is tree.',
    },
    blocks: [
      {
        type: 'tree',
        label: { tr: 'Teslim edilen depo yapısı', en: 'Structure of the delivered repository' },
        groups: [
          {
            root: 'matcher/',
            items: [
              { name: 'pipeline/', note: { tr: 'altı istasyon', en: 'six stations' } },
              { name: 'rules/', items: [{ name: 'catalog.py', highlight: true }] },
              { name: 'tests/', note: { tr: 'paylaşılmadı', en: 'not shared' }, muted: true },
            ],
          },
        ],
      },
    ],
  },
  compare: {
    label: { tr: 'Sonuç', en: 'Result' },
    title: { tr: 'Önce ve sonra', en: 'Before and after' },
    lede: {
      tr: 'Bir işin öncesini ve sonrasını ölçü ölçü karşılaştırır. İçerik dosyasındaki adı compare.',
      en: 'Compares the before and after of a job, measure by measure. Its name in the content file is compare.',
    },
    blocks: [
      {
        type: 'compare',
        rows: [
          {
            label: { tr: 'Bulunan gerçek eşleşme', en: 'Real matches found' },
            before: { tr: 'Yüzde 18', en: '18 percent' },
            lead: { tr: 'Yüzde 97,2', en: '97.2 percent' },
            after: { tr: ', test setinde', en: ', on the test set' },
          },
        ],
      },
    ],
  },
  note: {
    label: { tr: 'Metin', en: 'Text' },
    title: { tr: 'Not kutusu', en: 'Note box' },
    lede: {
      tr: 'Akışın dışında kalan ama bilinmesi gereken kısa bir not. Bir sayfada az kullanılır. İçerik dosyasındaki adı note.',
      en: 'A short note outside the flow that the reader should know. Used sparingly on a page. Its name in the content file is note.',
    },
    blocks: [
      {
        type: 'note',
        label: { tr: 'Erişim', en: 'Access' },
        text: { tr: 'Kodun tamamı müşterinin deposunda duruyor, burada yalnızca kural dosyası paylaşıldı.', en: 'The full code lives in the client repository, only the rules file is shared here.' },
      },
    ],
  },
  code: {
    label: { tr: 'Kod', en: 'Code' },
    title: { tr: 'Kod dosyası', en: 'Code file' },
    lede: {
      tr: 'Çalışmanın code klasöründeki bir dosya, satır numaraları ve kopyalama düğmesiyle. İçerik dosyasındaki adı code.',
      en: 'A file from the code folder of a study, with line numbers and a copy button. Its name in the content file is code.',
    },
    blocks: [{ type: 'code', path: 'rules/catalog.py' }],
  },
  output: {
    label: { tr: 'Kod', en: 'Code' },
    title: { tr: 'Terminal çıktısı', en: 'Terminal output' },
    lede: {
      tr: 'Bir komutun çıktısı. Sayılar sayfadaki tablolar ve şekillerle aynı olmalıdır. İçerik dosyasındaki adı output.',
      en: 'The output of a command. Its numbers must match the tables and figures on the page. Its name in the content file is output.',
    },
    blocks: [{ type: 'output', path: 'out/evaluate.txt' }],
  },
  datafile: {
    label: { tr: 'Veri', en: 'Data' },
    title: { tr: 'Veri dosyası', en: 'Data file' },
    lede: {
      tr: 'İndirilebilir bir veri dosyası, tam önizlemesi ve altında bir notla. İçerik dosyasındaki adı datafile.',
      en: 'A downloadable data file, with a full preview and a note below. Its name in the content file is datafile.',
    },
    blocks: [
      {
        type: 'datafile',
        csv: 'raw-sample',
        name: { tr: 'ham_kayitlar_ornek.csv', en: 'raw_records_sample.csv' },
        note: { tr: 'Dört kaynaktan alınmış ham kayıtlar, dosyalardan geldiği gibi.', en: 'Raw records from four sources, as they came in the files.' },
      },
    ],
  },
}

// Bolum listesi, sayfanin ve testlerin kullandigi hali. id parcanin turudur.
export const catalogChapters: Chapter[] = Object.entries(catalog).map(([id, chapter]) => ({ id, ...chapter }))
