/*
file: source.ts
importable: source

Demo Veri calismasinin kod ve veri sayfasi. Calismanin kodu GitHub'da degil,
bu sayfada paylasiliyor. Bolumler detay sayfasindaki adimlarin sirasini
izler: depo yapisi, her adimin kod dosyasi, veritabani ve en sonda veri
ornekleri. Kod dosyalari code klasorunde, veri dosyalari data klasorunde iki
dilde durur, burada yalnizca yollari ve kimlikleri yazar.

description: Demo Veri calismasinin kod ve veri sayfasindaki metinleri iki dilde tasiyan modul.
*/

import type { SourcePage } from '../types'

export const source: SourcePage = {
  title: {
    tr: 'Demo Veri: kod ve veri örnekleri',
    en: 'Demo Data: code and data samples',
  },
  lede: {
    tr: 'Ürün kataloğu tekilleştirme işinden, paylaşılmasına onay verilen kod parçaları ve veri örnekleri. Kod parçaları okunabilsin diye kısaltıldı, depodaki tam halleri daha uzun.',
    en: 'Code excerpts and data samples from the product catalog deduplication work that were approved for sharing. The code is shortened for reading, the full files in the repository are longer.',
  },
  tags: ['Python', 'SQL', 'CSV'],
  kunye: [
    {
      label: { tr: 'Dil', en: 'Language' },
      value: { tr: 'Python 3.12, SQL', en: 'Python 3.12, SQL' },
    },
    {
      label: { tr: 'Kütüphaneler', en: 'Libraries' },
      value: { tr: 'pandas, scikit-learn, rapidfuzz, networkx', en: 'pandas, scikit-learn, rapidfuzz, networkx' },
    },
    {
      label: { tr: 'Veritabanı', en: 'Database' },
      value: { tr: 'PostgreSQL 16', en: 'PostgreSQL 16' },
    },
    {
      label: { tr: 'Paylaşılan', en: 'Shared' },
      value: { tr: '8 kod dosyası, 5 veri dosyası', en: '8 code files, 5 data files' },
    },
  ],
  chapters: [
    {
      id: 'depo',
      label: { tr: 'Depo yapısı', en: 'Repository' },
      title: { tr: 'Teslim edilen deponun yapısı', en: 'Structure of the delivered repository' },
      lede: {
        tr: 'Bu sayfada parçaları gösterilen dosyalar altınla işaretli. Diğer dosyalar firmaya özel kurallar ve sözlükler içerdiği için paylaşılmadı.',
        en: 'The files shown in part on this page are marked in gold. The other files were not shared because they hold rules and dictionaries specific to the company.',
      },
      blocks: [
        {
          type: 'tree',
          label: { tr: 'Teslim edilen depo, paylaşılan dosyalar işaretli', en: 'Delivered repository, shared files marked' },
          groups: [
            {
              root: 'matcher/',
              items: [
                {
                  name: 'pipeline/',
                  items: [
                    { name: 'normalize.py', highlight: true, note: { tr: 'ad, ölçü ve birim ayrıştırma', en: 'parsing names, sizes and units' } },
                    { name: 'candidates.py', highlight: true, note: { tr: 'aday çift seçimi', en: 'choosing candidate pairs' } },
                    { name: 'features.py', highlight: true, note: { tr: 'çift özellikleri', en: 'pair features' } },
                    { name: 'model.py', highlight: true, note: { tr: 'eğitim, karar ve ölçüm', en: 'training, decision and measurement' } },
                    { name: 'cluster.py', highlight: true, note: { tr: 'ürün kümeleri', en: 'product clusters' } },
                    { name: 'golden.py', muted: true, note: { tr: 'ürün kartı', en: 'product card' } },
                  ],
                },
                {
                  name: 'rules/',
                  items: [
                    { name: 'catalog.py', highlight: true, note: { tr: 'genel kurallar', en: 'general rules' } },
                    { name: 'sources/', note: { tr: 'kaynağa özel kurallar', en: 'source specific rules' } },
                  ],
                },
                {
                  name: 'dictionaries/',
                  items: [
                    { name: 'units.csv', highlight: true, note: { tr: 'birim yazımları', en: 'unit spellings' } },
                    { name: 'kinds.csv', muted: true, note: { tr: 'tür eş anlamları', en: 'kind synonyms' } },
                    { name: 'brands.csv', muted: true, note: { tr: 'marka takma adları', en: 'brand aliases' } },
                  ],
                },
                { name: 'review/', note: { tr: 'inceleme ekranı', en: 'review screen' } },
                {
                  name: 'sql/',
                  items: [
                    { name: 'schema.sql', highlight: true },
                    { name: 'price_compare.sql', highlight: true },
                  ],
                },
                { name: 'tests/', note: { tr: '214 test', en: '214 tests' } },
                { name: 'docs/', note: { tr: 'veri sözlüğü ve devir notu', en: 'data dictionary and handover note' } },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'dogrulama',
      label: { tr: 'Doğrulama', en: 'Validation' },
      title: { tr: 'Doğrulama kuralları', en: 'Validation rules' },
      lede: {
        tr: 'Detay sayfasındaki ilk adım. Dört genel kural ve karantinayı ayıran fonksiyon.',
        en: 'The first step on the study page. Four general rules and the function that separates the quarantine.',
      },
      blocks: [{ type: 'code', path: 'rules/catalog.py' }],
    },
    {
      id: 'normalizasyon',
      label: { tr: 'Normalizasyon', en: 'Normalisation' },
      title: { tr: 'Ad, ölçü ve birim ayrıştırma', en: 'Parsing names, sizes and units' },
      lede: {
        tr: 'Türkçe harf dönüşümü, birim sözlüğü ve ölçü okuyucusu. Ölçü okuyucusunun bilinen bir hatası dosyanın başındaki notta yazıyor.',
        en: 'Turkish letter conversion, the unit dictionary and the size reader. A known bug of the size reader is written in the note at the top of the file.',
      },
      blocks: [{ type: 'code', path: 'pipeline/normalize.py' }],
    },
    {
      id: 'aday',
      label: { tr: 'Aday seçimi', en: 'Candidate selection' },
      title: { tr: 'Aday çiftlerin seçilmesi', en: 'Choosing candidate pairs' },
      lede: {
        tr: 'İki yol: aynı kategori, ölçü ve markayı paylaşan kayıtlar ve adları birbirine en çok benzeyen kayıtlar.',
        en: 'Two routes: records that share the same category, size and brand, and records whose names are most alike.',
      },
      blocks: [{ type: 'code', path: 'pipeline/candidates.py' }],
    },
    {
      id: 'model',
      label: { tr: 'Eşleştirme modeli', en: 'Matching model' },
      title: { tr: 'Özellikler, eğitim ve ölçüm', en: 'Features, training and measurement' },
      lede: {
        tr: 'Özelliklerin bir kısmı, modelin eğitimi ve test setinde ölçülmesi. En alttaki çıktı, detay sayfasındaki şekillerin dayandığı sayılar.',
        en: 'Some of the features, the training of the model and its measurement on the test set. The output at the bottom holds the numbers the figures on the study page are based on.',
      },
      blocks: [
        { type: 'code', path: 'pipeline/features.py' },
        { type: 'code', path: 'pipeline/model.py' },
        { type: 'output', path: 'out/evaluate.txt' },
      ],
    },
    {
      id: 'kume',
      label: { tr: 'Kümeleme', en: 'Clustering' },
      title: { tr: 'Ürün kümelerinin kurulması', en: 'Building product clusters' },
      lede: {
        tr: 'Eşleşen çiftlerden ürün kümeleri ve çelişkili kümelerin bölünmesi.',
        en: 'Product clusters from matched pairs, and splitting the clusters that conflict.',
      },
      blocks: [{ type: 'code', path: 'pipeline/cluster.py' }],
    },
    {
      id: 'veritabani',
      label: { tr: 'Veritabanı', en: 'Database' },
      title: { tr: 'Tablolar ve fiyat karşılaştırma sorgusu', en: 'Tables and the price comparison query' },
      lede: {
        tr: 'Ürün kartı, kaynak bağı ve tedarikçi fiyatları üç ayrı tabloda. Fiyat sorgusu firmanın her gün kullandığı rapora dönüştü.',
        en: 'The product card, the source link and supplier prices sit in three separate tables. The price query became the report the company uses every day.',
      },
      blocks: [
        { type: 'code', path: 'sql/schema.sql' },
        { type: 'code', path: 'sql/price_compare.sql' },
      ],
    },
    {
      id: 'veri',
      label: { tr: 'Veri örnekleri', en: 'Data samples' },
      title: { tr: 'İndirilebilir veri örnekleri', en: 'Downloadable data samples' },
      lede: {
        tr: 'Detay sayfasındaki tabloların ham halleri. Dosyalar noktalı virgülle ayrılmış, UTF-8 kodlu. Tedarikçi adları ve fiyatlar firmanın isteğiyle değiştirildi.',
        en: 'The raw versions of the tables on the study page. The files are separated by semicolons and encoded in UTF-8. Supplier names and prices were changed at the request of the company.',
      },
      blocks: [
        {
          type: 'datafile',
          csv: 'raw-sample',
          name: { tr: 'ham_kayitlar_ornek.csv', en: 'raw_records_sample.csv' },
          note: {
            tr: 'Dört kaynaktan alınmış on beş ham kayıt, dosyalardan geldiği gibi. ERP satırlarındaki Ý ve Þ harfleri, dosyanın eski bir karakter kodlamasıyla kaydedilmesinden geliyor ve bilerek düzeltilmeden bırakıldı.',
            en: 'Fifteen raw records from four sources, as they came in the files. In the original Turkish export the ERP rows carry broken letters such as Ý and Þ, because the file was saved in an old character encoding. They were left unfixed on purpose.',
          },
        },
        {
          type: 'datafile',
          csv: 'labelled-pairs',
          name: { tr: 'etiketli_ciftler_ornek.csv', en: 'labelled_pairs_sample.csv' },
          note: {
            tr: 'Satın alma ekibinin işaretlediği çiftlerden on tanesi. label sütununda 1 aynı ürün, 0 farklı ürün demek. Kodu olmayan Tedarikçi C kayıtları satır numarasıyla anılıyor.',
            en: 'Ten of the pairs marked by the purchasing team. In the label column 1 means the same product and 0 a different one. Supplier C records have no code and are referred to by their row number.',
          },
        },
        {
          type: 'datafile',
          csv: 'product-sample',
          name: { tr: 'urun_tablosu_ornek.csv', en: 'product_table_sample.csv' },
          note: {
            tr: 'Ham kayıtlardan çıkan beş ürün kartı. Adet başı fiyat en ucuz tedarikçinin fiyatı.',
            en: 'Five product cards that came out of the raw records. The unit price is the price of the cheapest supplier.',
          },
        },
        {
          type: 'datafile',
          csv: 'units',
          name: { tr: 'units.csv', en: 'units.csv' },
          note: {
            tr: 'Birim sözlüğünün tamamı. Anahtarlar küçük harfle ve sondaki nokta atılmış halde tutuluyor, bu yüzden AD ile ad. tek satıra düşüyor.',
            en: 'The whole unit dictionary. Keys are kept lower case and without a trailing dot, so PC and pc. land on the same row.',
          },
        },
        {
          type: 'datafile',
          csv: 'quarantine-sample',
          name: { tr: 'karantina_ornek.csv', en: 'quarantine_sample.csv' },
          note: {
            tr: 'Ham kayıtlardan doğrulamaya takılan iki satır ve takıldıkları kural.',
            en: 'The two raw records that failed validation, and the rule each one failed.',
          },
        },
      ],
    },
  ],
}
