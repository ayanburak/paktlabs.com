/*
file: source.ts
importable: source

Hartwell & Finch calismasinin kod ve veri sayfasi. Firma butun kodun
paylasilmasini istemedi, 17 modulun dordu bu sayfada gosterilir. Kod
dosyalari code klasorunde, veri kesitleri data klasorunde iki dilde durur,
burada yalnizca yollari ve kimlikleri yazar.

description: Hartwell & Finch calismasinin kod ve veri sayfasindaki metinleri iki dilde tasiyan modul.
*/

import type { SourcePage } from '../types'

export const source: SourcePage = {
  title: {
    tr: 'Hartwell & Finch: kod ve veri örnekleri',
    en: 'Hartwell & Finch: code and data samples',
  },
  lede: {
    tr: 'Kârlılık ve veri incelemesinden, paylaşılmasına izin verilen dört kod dosyası ve altı veri kesiti. Kod dosyaları teslim edildikleri gibi duruyor, yalnızca yorumlardaki kişi adları rollerle değiştirildi.',
    en: 'Four code files and six data excerpts from the profitability and data review that were approved for sharing. The code files are as delivered, only the personal names in the comments were replaced with roles.',
  },
  tags: ['Python', 'pandas', 'SQLite', 'openpyxl'],
  facts: [
    {
      label: { tr: 'Dil', en: 'Language' },
      value: { tr: 'Python 3.12, SQL', en: 'Python 3.12, SQL' },
    },
    {
      label: { tr: 'Kütüphaneler', en: 'Libraries' },
      value: { tr: 'pandas, openpyxl', en: 'pandas, openpyxl' },
    },
    {
      label: { tr: 'Veritabanı', en: 'Database' },
      value: { tr: 'SQLite, 56 tablo', en: 'SQLite, 56 tables' },
    },
    {
      label: { tr: 'Paylaşılan', en: 'Shared' },
      value: { tr: '4 kod dosyası, 6 veri dosyası', en: '4 code files, 6 data files' },
    },
  ],
  chapters: [
    {
      id: 'repository',
      label: { tr: 'Depo yapısı', en: 'Repository' },
      title: { tr: 'Teslim edilen paketin yapısı', en: 'Structure of the delivered package' },
      lede: {
        tr: 'Bu sayfada gösterilen dosyalar altınla işaretli. Diğer modüller firmaya özel maliyet ve fiyat kuralları içerdiği için paylaşılmadı.',
        en: 'The files shown on this page are marked in gold. The other modules were not shared because they hold cost and pricing rules specific to the company.',
      },
      blocks: [
        {
          type: 'tree',
          label: { tr: 'Teslim edilen paket, paylaşılan dosyalar işaretli', en: 'Delivered package, shared files marked' },
          groups: [
            {
              root: 'solution/',
              items: [
                { name: 'run.py', highlight: true, note: { tr: 'tek giriş noktası', en: 'single entry point' } },
                {
                  name: 'hfa/',
                  items: [
                    { name: 'db.py', muted: true, note: { tr: 'bağlantı, yollar, kalite logu', en: 'connection, paths, quality log' } },
                    { name: 'bc.py', highlight: true, note: { tr: 'ERP yedeğinin okunması', en: 'reading the ERP backup' } },
                    { name: 'items.py', highlight: true, note: { tr: 'ürün kodları', en: 'item codes' } },
                    { name: 'customers.py', muted: true, note: { tr: 'müşteri eşleme', en: 'customer matching' } },
                    { name: 'sales.py', muted: true, note: { tr: 'satış satırları', en: 'sales lines' } },
                    { name: 'ma.py', muted: true, note: { tr: 'yönetim hesapları', en: 'management accounts' } },
                    { name: 'fx.py', muted: true, note: { tr: 'kurlar', en: 'exchange rates' } },
                    { name: 'channels.py', muted: true, note: { tr: 'pazar yerleri', en: 'marketplaces' } },
                    { name: 'costs.py', muted: true, note: { tr: 'taşıma ve gümrük', en: 'freight and customs' } },
                    { name: 'pricing.py', muted: true, note: { tr: 'fiyat ve iskonto', en: 'pricing and discounts' } },
                    { name: 'quality.py', muted: true, note: { tr: 'iade ve üretim kayıtları', en: 'returns and production records' } },
                    { name: 'costing.py', highlight: true, note: { tr: 'ürün maliyeti', en: 'product cost' } },
                    { name: 'margin.py', muted: true, note: { tr: 'kanal kârı ve kâr dökümü', en: 'channel profit and breakdown' } },
                    { name: 'kpi.py', muted: true, note: { tr: 'aylık göstergeler', en: 'monthly indicators' } },
                    { name: 'excel.py', muted: true, note: { tr: 'Excel dosyaları', en: 'Excel files' } },
                    { name: 'charts.py', muted: true, note: { tr: 'şekiller', en: 'charts' } },
                    { name: 'pages.py', muted: true, note: { tr: 'rapor, sunum ve pano', en: 'report, presentation and dashboard' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'bc',
      label: { tr: 'ERP yedeği', en: 'ERP backup' },
      title: { tr: 'SQL Server komutlarını okuyan ayrıştırıcı', en: 'A parser for SQL Server statements' },
      lede: {
        tr: "Business Central tabloları veritabanı yedeği yerine INSERT komutları olarak geldi. Bu dosya her komutu düzenli ifadelerle parçalara ayırıp değerleri Python türlerine çeviriyor ve tabloları SQLite'a yazıyor.",
        en: 'The Business Central tables came as INSERT statements instead of a database backup. This file breaks every statement into tokens with regular expressions, turns the values into Python types and writes the tables to SQLite.',
      },
      blocks: [{ type: 'code', path: 'hfa/bc.py' }],
    },
    {
      id: 'items',
      label: { tr: 'Ürün kodları', en: 'Item codes' },
      title: { tr: 'Her kaynaktaki kodu tek koda çeviren kural', en: 'The rule that turns every source code into one' },
      lede: {
        tr: 'Canon sınıfı Sage kodlarını, Amazon ajansının yazımlarını ve yalnızca açıklaması olan satırları Business Central koduna çeviriyor. build_items kuralı eşleme tablosuyla ve Sage açıklamalarıyla karşılaştırıp çelişkileri kalite loguna yazıyor.',
        en: 'The Canon class turns Sage codes, the Amazon agency’s spellings and lines that only carry a description into the Business Central code. build_items compares the rule with the mapping table and the Sage descriptions and writes the conflicts to the quality log.',
      },
      blocks: [{ type: 'code', path: 'hfa/items.py' }],
    },
    {
      id: 'costing',
      label: { tr: 'Ürün maliyeti', en: 'Product cost' },
      title: { tr: 'Yönetim hesaplarına kalibre edilen maliyet modeli', en: 'A cost model calibrated to the management accounts' },
      lede: {
        tr: 'Malzeme maliyeti ürün ağacından ve o yılın gerçek alış fiyatlarından, işçilik standart saatlerden hesaplanıyor. İki bileşen her yıl yönetim hesaplarındaki toplamlara eşitleniyor, yarım yıllarda son tam yılın katsayısı kullanılıyor.',
        en: 'Material cost comes from the bill of materials and the year’s actual purchase prices, labour from the standard hours. Both components are set equal to the totals in the management accounts every year, and partial years use the factor of the last full year.',
      },
      blocks: [{ type: 'code', path: 'hfa/costing.py' }],
    },
    {
      id: 'run',
      label: { tr: 'Çalıştırma', en: 'Running' },
      title: { tr: 'Hepsi tek komutla', en: 'All with one command' },
      lede: {
        tr: 'run.py modülleri bağımlılık sırasıyla çağırıyor ve veritabanını her seferinde sıfırdan kuruyor. Aşağıdaki çıktı, paket teslim edilen ham dosyalar üzerinde yeniden çalıştırıldığında alındı. Çıkan analiz tabloları teslim edilenlerle birebir aynı.',
        en: 'run.py calls the modules in dependency order and builds the database from scratch every time. The output below was taken when the package was run again on the delivered raw files. The analysis tables it produced are identical to the delivered ones.',
      },
      blocks: [
        { type: 'code', path: 'run.py' },
        { type: 'output', path: 'out/run.txt' },
      ],
    },
    {
      id: 'samples',
      label: { tr: 'Veri örnekleri', en: 'Data samples' },
      title: { tr: 'Paylaşılan veri kesitleri', en: 'Shared data excerpts' },
      lede: {
        tr: 'Çalışma sayfasındaki tabloların ham halleri. Her dosya bir kaynağın ya da bir teslim tablosunun kesiti, kişisel bilgiler dışında kaynaktaki gibidir.',
        en: 'The raw versions of the tables on the study page. Each file is an excerpt of a source or a delivered table and is as in the source apart from personal details.',
      },
      blocks: [
        {
          type: 'datafile',
          csv: 'panther-invoice',
          name: { tr: 'panther_2024-11_kesit.csv', en: 'panther_2024-11_excerpt.csv' },
          note: { tr: 'Taşıyıcı faturasından 20 satır. Özel müşteri adları ve posta kodlarının ikinci kısmı çıkarıldı.', en: '20 lines of a carrier invoice. Private customer names and the second part of postcodes were removed.' },
        },
        {
          type: 'datafile',
          csv: 'item-mapping',
          name: { tr: 'hf_urun_esleme_kesit.csv', en: 'hf_item_mapping_excerpt.csv' },
          note: { tr: "ERP'deki eşleme tablosundan 18 satır, kod yapısıyla çelişen 9 satırın hepsi dahil.", en: '18 rows of the mapping table in the ERP, including all 9 rows that contradict the code structure.' },
        },
        {
          type: 'datafile',
          csv: 'clearpath-statement',
          name: { tr: 'clearpath_2025-02_kesit.csv', en: 'clearpath_2025-02_excerpt.csv' },
          note: { tr: 'Gümrük ekstresinden 16 satır, menşe beyanı eksik sayılan beş satır dahil.', en: '16 lines of the customs statement, including five lines where the origin statement was treated as missing.' },
        },
        {
          type: 'datafile',
          csv: 'bom-master',
          name: { tr: 'urun_agaci_tip.csv', en: 'bom_by_type.csv' },
          note: { tr: 'Operasyon müdürünün ürün ağacı sayfasının tamamı.', en: 'The whole bill of materials sheet of the operations manager.' },
        },
        {
          type: 'datafile',
          csv: 'order-economics',
          name: { tr: 'siparis_ekonomisi.csv', en: 'order_economics.csv' },
          note: { tr: 'Teslim edilen kâr analizinden, altı platformda sipariş başına tutarlar.', en: 'From the delivered profit analysis, amounts per order on six platforms.' },
        },
        {
          type: 'datafile',
          csv: 'logistics-sample',
          name: { tr: 'fact_logistics_sorgu.csv', en: 'fact_logistics_query.csv' },
          note: { tr: 'Taşıma tablosuna yapılan bir sorgunun sonucu, altı satır.', en: 'The result of a query on the freight table, six rows.' },
        },
      ],
    },
  ],
}
