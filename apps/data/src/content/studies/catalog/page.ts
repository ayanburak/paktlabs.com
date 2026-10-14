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

// Anahtarlar Block birlesiminin butun turleridir. Bir tur eksik kalirsa ya da
// fazladan bir anahtar yazilirsa TypeScript derlemeyi durdurur. Bolumler
// buradaki sirayla, yazim rehberindeki sirayla gosterilir. Bolumun id'si
// parcanin turudur, data testi her bolumun kendi turunden bir parca
// tasidigini ayrica denetler.
export const catalog: Record<Block['type'], Omit<Chapter, 'id'>> = {
  paragraph: {
    label: { tr: 'paragraph', en: 'paragraph' },
    title: { tr: 'Paragraf', en: 'Paragraph' },
    lede: {
      tr: 'Bölüm girişinden sonra gelen ara anlatım, örneğin iki tablodan önce onları tanıtan cümle.',
      en: 'Running text after the chapter intro, for example the sentence that introduces the next two tables.',
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
    label: { tr: 'list', en: 'list' },
    title: { tr: 'Liste', en: 'List' },
    lede: {
      tr: 'Kısa maddeler. Yan yana numaralı görünüm birkaç etkiyi bir bakışta, alt alta görünüm biraz daha uzun anlatılan sınırları gösterir.',
      en: 'Short items. The numbered side by side view shows a few effects at a glance, the stacked view shows limits that need a little more text.',
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
    label: { tr: 'details', en: 'details' },
    title: { tr: 'Açılır kutu', en: 'Expandable box' },
    lede: {
      tr: 'Ayrıntıyı ilk katmandan ayırır. Kapalı gelir, okur isterse açar. İçine başka parçalar konabilir.',
      en: 'Keeps detail out of the first layer. It starts closed and opens when the reader wants. Other blocks can go inside.',
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
    label: { tr: 'sheet', en: 'sheet' },
    title: { tr: 'Hesap tablosu', en: 'Spreadsheet' },
    lede: {
      tr: 'Ham veri, hesap tablosu programlarına yakın bir görünümle. Kaynak kusurları düzeltilmeden durur ve altındaki notta açıklanır.',
      en: 'Raw data in a view close to spreadsheet programs. Source flaws stay unfixed and are explained in the note below.',
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
    label: { tr: 'table', en: 'table' },
    title: { tr: 'Düz tablo', en: 'Plain table' },
    lede: {
      tr: 'Sitenin diliyle yazılan kısa bir karşılaştırma. Bir hücre oran taşıyorsa küçük bir çubukla çizilir.',
      en: 'A short comparison written in the language of the site. A cell holding a share is drawn with a small bar.',
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
    label: { tr: 'stations', en: 'stations' },
    title: { tr: 'İstasyon hattı', en: 'Station line' },
    lede: {
      tr: 'Sırayla geçilen adımlar. Her adımın ayrıntısı alt kenarında açılan bir şeritte durur.',
      en: 'Steps passed in order. The detail of each step sits in a strip that opens at its bottom edge.',
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
    label: { tr: 'chart', en: 'chart' },
    title: { tr: 'Çubuk şekli', en: 'Bar chart' },
    lede: {
      tr: 'Tek bir soruya cevap veren dikey ya da yatay çubuklar. Eksen sıfırdan başlar, değer çubuğun ucunda yazar.',
      en: 'Vertical or horizontal bars answering one question. The axis starts at zero and the value sits at the end of the bar.',
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
  decisions: {
    label: { tr: 'decisions', en: 'decisions' },
    title: { tr: 'Karar listesi', en: 'Decision list' },
    lede: {
      tr: 'Teknik okurun soracağı "neden böyle" sorularının cevabı. Her cevap bir deneme ya da ölçüme dayanır.',
      en: 'Answers to the "why this way" questions a technical reader will ask. Every answer rests on a trial or a measurement.',
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
    label: { tr: 'timeline', en: 'timeline' },
    title: { tr: 'Zaman çizelgesi', en: 'Timeline' },
    lede: {
      tr: 'Bir işin takvimi. Altın çubuklar ayrı bir tarafın işini gösterir, altında anlamı yazar.',
      en: 'The schedule of a job. Gold bars show the work of another party, their meaning is written below.',
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
    label: { tr: 'tree', en: 'tree' },
    title: { tr: 'Dosya ağacı', en: 'File tree' },
    lede: {
      tr: 'Teslim edilen bir deponun ya da veritabanının yapısı, kod görünümünde.',
      en: 'The structure of a delivered repository or database, in a code view.',
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
    label: { tr: 'compare', en: 'compare' },
    title: { tr: 'Önce ve sonra', en: 'Before and after' },
    lede: {
      tr: 'Bir işin öncesini ve sonrasını ölçü ölçü karşılaştırır.',
      en: 'Compares the before and after of a job, measure by measure.',
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
    label: { tr: 'note', en: 'note' },
    title: { tr: 'Not kutusu', en: 'Note box' },
    lede: {
      tr: 'Akışın dışında kalan ama bilinmesi gereken kısa bir not. Bir sayfada az kullanılır.',
      en: 'A short note outside the flow that the reader should know. Used sparingly on a page.',
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
    label: { tr: 'code', en: 'code' },
    title: { tr: 'Kod dosyası', en: 'Code file' },
    lede: {
      tr: 'Çalışmanın code klasöründeki bir dosya, satır numaraları ve kopyalama düğmesiyle.',
      en: 'A file from the code folder of a study, with line numbers and a copy button.',
    },
    blocks: [{ type: 'code', path: 'rules/catalog.py' }],
  },
  output: {
    label: { tr: 'output', en: 'output' },
    title: { tr: 'Terminal çıktısı', en: 'Terminal output' },
    lede: {
      tr: 'Bir komutun çıktısı. Sayılar sayfadaki tablolar ve şekillerle aynı olmalıdır.',
      en: 'The output of a command. Its numbers must match the tables and figures on the page.',
    },
    blocks: [{ type: 'output', path: 'out/evaluate.txt' }],
  },
  datafile: {
    label: { tr: 'datafile', en: 'datafile' },
    title: { tr: 'Veri dosyası', en: 'Data file' },
    lede: {
      tr: 'İndirilebilir bir veri dosyası, tam önizlemesi ve altında bir notla.',
      en: 'A downloadable data file, with a full preview and a note below.',
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
