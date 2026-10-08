/*
file: page.ts
importable: page

Demo Veri calismasinin detay sayfasi. Is kurgusaldir, sayfa sistemini butun
parcalariyla sinamak icin yazildi. Sayilar birbirini tutar ama gercek bir
musteriden gelmez, sayfa bu yuzden Demo Veri adiyla yayinlanir. Ingilizce
metinler Turkce metnin cevirisidir.

description: Demo Veri calismasinin detay sayfasindaki metinleri iki dilde tasiyan modul.
*/

import type { StudyPage } from '../types'

export const page: StudyPage = {
  lede: {
    tr: 'Bir yapı malzemesi distribütörünün ERP kayıtları ile üç tedarikçi kataloğunda aynı ürünü bulan, birleştiren ve her gece kendini güncelleyen bir eşleştirme hattı.',
    en: 'A matching pipeline that finds the same product across a building materials distributor’s ERP records and three supplier catalogs, merges it, and updates itself every night.',
  },
  kunye: [
    {
      label: { tr: 'Sektör', en: 'Sector' },
      value: { tr: 'Yapı malzemesi ve hırdavat dağıtımı', en: 'Building materials and hardware distribution' },
    },
    {
      label: { tr: 'Süre', en: 'Duration' },
      value: { tr: '7 hafta', en: '7 weeks' },
    },
    {
      label: { tr: 'Girdi', en: 'Input' },
      value: { tr: '4 kaynak, 184.312 kayıt', en: '4 sources, 184,312 records' },
    },
    {
      label: { tr: 'Teslim', en: 'Delivered' },
      value: { tr: 'Gecelik hat ve inceleme ekranı', en: 'Nightly pipeline and review screen' },
    },
  ],
  summary: {
    problem: {
      tr: "Firma ürünlerini ERP'de, üç tedarikçi de kendi fiyat listelerinde tutuyordu. Ortak bir ürün kodu yoktu, aynı ürün her listede başka bir adla geçiyordu. Stok bölünüyor, tedarikçi fiyatları yan yana konamıyordu.",
      en: 'The company kept its products in its ERP, and each of its three suppliers kept them in its own price list. There was no shared product code, and the same product appeared under a different name in every list. Stock was split across cards and supplier prices could not be put side by side.',
    },
    approach: {
      tr: 'Kayıtları doğrulayıp ortak bir biçime çeviren, olası eşleşmeleri bir makine öğrenmesi modeliyle puanlayan ve aynı ürünü tek kartta toplayan bir hat kurduk. Modelin emin olmadığı çiftleri satın alma ekibi bir inceleme ekranından onayladı.',
      en: 'We built a pipeline that validates the records and brings them into a common format, scores possible matches with a machine learning model and gathers the same product into a single card. The purchasing team approved the pairs the model was unsure about on a review screen.',
    },
    result: {
      tr: 'Dört listedeki yaklaşık 184 bin kayıt 86 bin ürüne indi. Hat yeni gelen kayıtları her gece kendiliğinden eşleştiriyor. En az iki tedarikçide bulunan 38 bin ürünün fiyatı artık yan yana görülebiliyor.',
      en: 'About 184 thousand records across the four lists came down to 86 thousand products. The pipeline matches new records on its own every night. Prices for the 38 thousand products sold by at least two suppliers can now be seen side by side.',
    },
  },
  chapters: [
    {
      id: 'sorun',
      label: { tr: 'Sorun', en: 'Problem' },
      title: { tr: 'Aynı vida, dört farklı stok kartı', en: 'One screw, four different stock cards' },
      lede: {
        tr: "Firma ürünlerini kendi ERP'sinde tutuyor, üç tedarikçiden de ayrı fiyat listeleri alıyordu. Hiçbir listede ortak bir ürün kodu yoktu. Aynı ürün her kaynakta başka bir adla, başka bir birimle ve çoğu zaman barkodsuz geliyordu.",
        en: 'The company kept its products in its own ERP and received a separate price list from each of three suppliers. None of the lists shared a product code. The same product arrived from every source under a different name, in a different unit and often without a barcode.',
      },
      blocks: [
        {
          type: 'list',
          view: 'columns',
          items: [
            {
              title: { tr: 'Stok bölünüyordu', en: 'Stock was split' },
              text: {
                tr: 'Aynı ürün için en fazla beş ayrı kart açılmıştı. Depoda duran mal, raporda iki üç parçaya dağılıyordu.',
                en: 'Up to five separate cards had been opened for the same product. Goods sitting in the warehouse were spread across two or three lines in the reports.',
              },
            },
            {
              title: { tr: 'Fiyat karşılaştırılamıyordu', en: 'Prices could not be compared' },
              text: {
                tr: "Üç tedarikçinin aynı ürüne verdiği fiyat yan yana konamıyor, karşılaştırma elle ve Excel'de yapılıyordu.",
                en: 'The prices the three suppliers gave for the same product could not be put side by side, so comparisons were made by hand in Excel.',
              },
            },
            {
              title: { tr: 'Mevcut yöntem kaçırıyordu', en: 'The existing method missed most pairs' },
              text: {
                tr: "Ad üzerinden yapılan tam eşleşme, gerçekte aynı olan kayıt çiftlerinin yalnızca yüzde 18'ini buluyordu.",
                en: 'Exact matching on the name found only 18 percent of the record pairs that were actually the same.',
              },
            },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Aşağıdaki iki tablo aynı ürün grubunun eşleştirmeden önceki ve sonraki halini gösterir. Satırlar firmanın dosyalarından alınmış bir kesit gibi, olduğu gibi bırakıldı.',
            en: 'The two tables below show the same group of products before and after matching. The rows are left exactly as they were, like an excerpt taken from the company’s files.',
          },
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 1 · önce', en: 'Table 1 · before' },
          title: { tr: 'Ham veri: dört kaynaktan gelen 15 kayıt', en: 'Raw data: 15 records from four sources' },
          blocks: [
            {
              type: 'sheet',
              csv: 'raw-records',
              name: { tr: 'birlesik_ham_kayitlar.xlsx', en: 'combined_raw_records.xlsx' },
              tabs: { tr: ['birlesik_ham', 'ERP', 'TED-A', 'TED-B', 'TED-C'], en: ['combined_raw', 'ERP', 'SUP-A', 'SUP-B', 'SUP-C'] },
              cell: 'C6',
              numbers: ['F'],
              notes: [
                {
                  tr: "ERP dosyası Windows-1254 ile kaydedildiği için İ ve Ş harfleri Ý ve Þ olarak görünüyor. Tedarikçi B ondalık ayıracı olarak nokta, diğerleri virgül kullanıyor. Tedarikçi C'nin listesi PDF'ten çevrildiği için ürün kodu yok. 9. satır, 8. satırdaki vidanın beyaz kaplamalı varyantı, yani başka bir ürün.",
                  en: "The ERP file was saved as Windows-1254, so the letters İ and Ş show up as Ý and Þ. Supplier B uses a different decimal separator from the others. Supplier C's list was converted from a PDF, so it has no product codes. Row 9 is the white zinc variant of the screw in row 8, which makes it a different product.",
                },
              ],
            },
          ],
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 2 · sonra', en: 'Table 2 · after' },
          title: { tr: 'Eşleştirme sonrası: aynı kayıtlardan 5 ürün', en: 'After matching: 5 products from the same records' },
          blocks: [
            {
              type: 'sheet',
              csv: 'product-table',
              name: { tr: 'urun_tablosu.xlsx', en: 'product_table.xlsx' },
              tabs: { tr: ['urun', 'urun_kaynak', 'karantina'], en: ['product', 'product_source', 'quarantine'] },
              cell: 'H2',
              formula: { tr: '0,27990', en: '0.27990' },
              numbers: ['E', 'H'],
              notes: [
                {
                  tr: 'On beş kaydın on üçü beş ürüne indi. Barkod ve kaynak kayıtlar urun_kaynak sayfasında duruyor. Fiyatlar paket içi adede bölünüp karşılaştırıldı. ERP fiyatı satış fiyatı olduğu için karşılaştırmaya girmedi. Ham tablonun 15. satırı barkodun kontrol hanesi tutmadığı, 16. satırı fiyatı sıfır olduğu için karantinaya gitti.',
                  en: 'Thirteen of the fifteen records came down to five products. Barcodes and source records sit on the product_source sheet. Prices were divided by the number of pieces in the pack before comparing. The ERP price is a sales price, so it was left out of the comparison. Row 15 of the raw table went to quarantine because its barcode check digit failed, and row 16 because its price was zero.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'veri',
      label: { tr: 'Eldeki veri', en: 'The data' },
      title: { tr: 'Dört kaynak, dört ayrı yazım alışkanlığı', en: 'Four sources, four ways of writing' },
      lede: {
        tr: 'Kaynakların hiçbiri hatalı değildi, her biri kendi içinde tutarlıydı. Sorun, dördünün aynı ürünü farklı dillerde anlatmasıydı. Barkod ise kaynaklarda çok farklı oranlarda doluydu, tek başına anahtar olamazdı.',
        en: 'None of the sources was wrong, each was consistent within itself. The problem was that all four described the same product in different languages. Barcodes were filled in at very different rates across the sources, so they could not serve as a key on their own.',
      },
      blocks: [
        {
          type: 'table',
          head: [
            { tr: 'Kaynak', en: 'Source' },
            { tr: 'Biçim', en: 'Format' },
            { tr: 'Barkod dolu', en: 'Barcode filled' },
            { tr: 'Öne çıkan sorun', en: 'Main problem' },
          ],
          rows: [
            [
              { tr: 'ERP stok kartları', en: 'ERP stock cards' },
              { tr: 'CSV, noktalı virgülle ayrılmış', en: 'CSV, separated by semicolons' },
              { meter: 34 },
              { tr: 'Adlar büyük harf ve kısaltmalı, kategori ağacı üç seviye', en: 'Names in capitals and abbreviated, three-level category tree' },
            ],
            [
              { tr: 'Tedarikçi A', en: 'Supplier A' },
              { tr: 'Excel, birleştirilmiş başlık satırları', en: 'Excel, merged header rows' },
              { meter: 71 },
              { tr: 'Ölçü adın içinde, birim paket bazında', en: 'Size inside the name, unit per pack' },
            ],
            [
              { tr: 'Tedarikçi B', en: 'Supplier B' },
              { tr: 'Gecelik XML ürün akışı', en: 'Nightly XML product feed' },
              { meter: 88 },
              { tr: 'Aynı ürün renk varyantıyla ayrı satırda', en: 'The same product on separate rows for each colour' },
            ],
            [
              { tr: 'Tedarikçi C', en: 'Supplier C' },
              { tr: "PDF'ten dönüştürülmüş CSV, ondalık virgül", en: 'CSV converted from PDF, decimal comma' },
              { meter: 12 },
              { tr: 'Barkod neredeyse yok, adlar serbest yazım', en: 'Almost no barcodes, names written freely' },
            ],
          ],
        },
        {
          type: 'details',
          meta: { tr: 'Profil', en: 'Profile' },
          title: { tr: 'Birim alanı tek başına yirmi üç farklı yazım taşıyordu', en: 'The unit field alone had twenty-three different spellings' },
          blocks: [
            {
              type: 'sheet',
              csv: 'unit-dictionary',
              name: { tr: 'birim_sozlugu.xlsx', en: 'unit_dictionary.xlsx' },
              tabs: { tr: ['sozluk', 'ham_birimler'], en: ['dictionary', 'raw_units'] },
              cell: 'B2',
              numbers: ['B'],
              notes: [
                {
                  tr: 'Denetimin ilk gününde her alanın değer dağılımını çıkardık. En dağınık alan birimdi: aynı anlama gelen yirmi üç yazım altı birime toplandı. En çok yazım adet için vardı, çünkü her kaynak onu farklı kısaltıyordu.',
                  en: 'On the first day of the audit we listed the values of every field. The messiest field was the unit: twenty-three spellings with the same meaning were gathered into six units. Piece had the most spellings, because every source abbreviated it differently.',
                },
                {
                  tr: "Diğer bulgular: Tedarikçi A'nın dosyasında ilk dört satır birleştirilmiş başlık hücreleriydi ve her ay yeri değişiyordu. Tedarikçi C'de ondalık ayraç virgül, binlik ayraç noktaydı, yani 1.250 bazen bin iki yüz elli, bazen bir virgül iki beş anlamına geliyordu. ERP dışa aktarımı Windows-1254 ile kodlanmıştı, UTF-8 okununca İ, ş ve ğ harfleri bozuluyordu.",
                  en: "Other findings: in Supplier A's file the first four rows were merged header cells, and they moved every month. Supplier C used a comma as the decimal separator and a dot for thousands, so 1.250 sometimes meant one thousand two hundred and fifty and sometimes one point two five. The ERP export was encoded as Windows-1254, and the letters İ, ş and ğ broke when it was read as UTF-8.",
                },
              ],
            },
          ],
        },
        {
          type: 'details',
          meta: { tr: 'Karantina', en: 'Quarantine' },
          title: { tr: 'Eşleştirmeye alınmayan kayıtlar ve nedenleri', en: 'Records kept out of matching, and why' },
          blocks: [
            {
              type: 'sheet',
              csv: 'quarantine-summary',
              name: { tr: 'karantina_ozet.xlsx', en: 'quarantine_summary.xlsx' },
              tabs: { tr: ['ozet', 'kayitlar'], en: ['summary', 'records'] },
              cell: 'C6',
              formula: { tr: '=TOPLA(C2:C5)', en: '=SUM(C2:C5)' },
              numbers: ['C', 'D'],
              total: true,
              notes: [
                {
                  tr: "Dört kaynaktaki kayıtların yüzde 2,1'i doğrulama kurallarından geçemedi. Kural adları koddaki doğrulama fonksiyonlarının adlarıyla aynı.",
                  en: '2.1 percent of the records across the four sources failed the validation rules. The rule names are the same as the names of the validation functions in the code.',
                },
                {
                  tr: 'Karantinadaki bir kayıt düzeltilmez, tahminle doldurulmaz. Kaynağına nedeniyle birlikte geri gider. Kaynak düzeltince bir sonraki gece kendiliğinden hatta girer.',
                  en: 'A record in quarantine is not corrected or filled in with a guess. It goes back to its source together with the reason. Once the source fixes it, it enters the pipeline on its own the next night.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'hat',
      label: { tr: 'Çözüm hattı', en: 'The pipeline' },
      title: { tr: 'Altı istasyonlu bir eşleştirme hattı', en: 'A matching pipeline with six stations' },
      lede: {
        tr: 'Her kayıt aynı altı adımdan sırayla geçer. Her adımın tek bir işi var. Ayrıntısını merak ettiğiniz adımı açabilirsiniz.',
        en: 'Every record passes through the same six steps in order. Each step has a single job. You can open any step to see its details.',
      },
      blocks: [
        {
          type: 'stations',
          items: [
            {
              title: { tr: 'Doğrulama', en: 'Validation' },
              text: {
                tr: 'Her kayıt önce bir dizi kuraldan geçer: barkod geçerli mi, fiyat sıfırdan büyük mü, birim tanınıyor mu, ürün adı dolu mu. Kurallardan geçemeyen kayıt düzeltilmez, nedeniyle birlikte kaynağına geri gönderilir.',
                en: 'Every record first passes a set of rules: is the barcode valid, is the price above zero, is the unit known, is the product name filled in. A record that fails is not corrected but sent back to its source with the reason.',
              },
              details: [
                {
                  tr: "Kurallar dört grupta, toplam otuz bir tane. Her biri tek bir şeyi kontrol eder ve ayrı ayrı test edilir. Doğrulama 184.312 kaydın 3.947'sini, yani yüzde 2,1'ini karantinaya aldı. En büyük pay bozuk barkodlarındı.",
                  en: 'There are thirty-one rules in four groups. Each checks a single thing and is tested on its own. Validation sent 3,947 of the 184,312 records, 2.1 percent, to quarantine. Broken barcodes made up the largest share.',
                },
                {
                  tr: 'Kurallar veriyi düzeltmeye çalışmaz. Bozuk bir barkodu tahmin etmek yerine kaydı geri göndermeyi seçtik, çünkü yanlış tahmin edilmiş tek bir barkod iki farklı ürünü birbirine bağlayabilirdi.',
                  en: 'The rules do not try to fix the data. We chose to send the record back rather than guess a broken barcode, because a single wrongly guessed barcode could tie two different products together.',
                },
              ],
            },
            {
              title: { tr: 'Normalizasyon', en: 'Normalisation' },
              text: {
                tr: 'Ürün adı parçalarına ayrılır: ne olduğu, ölçüsü, kaplaması, markası ve paketteki adet. Böylece dört kaynağın farklı yazdığı aynı ürün, aynı alanlarda aynı değerleri taşır hale gelir.',
                en: 'The product name is split into its parts: what it is, its size, finish, brand and the number of pieces in the pack. The same product written differently by four sources then carries the same values in the same fields.',
              },
              details: [
                {
                  tr: 'Ölçü için ayrı bir okuyucu yazdık. 4x40, 4,0*40 ve Ø4 x L40 gibi yazımların hepsi aynı 4,0 × 40 değerine iner. Ürün türleri için bir eş anlam sözlüğü kurduk, sunta vidası ile yonga levha vidası bu sözlükte aynı türdür. Sözlükte 412 tür kaydı var, markaların kısaltma ve yazım hataları için ayrıca 61 kayıt tutuluyor.',
                  en: 'We wrote a separate reader for sizes. Spellings such as 4x40, 4,0*40 and Ø4 x L40 all come down to the same 4.0 × 40. We built a synonym dictionary for product kinds, in which two different names for a chipboard screw are the same kind. The dictionary has 412 kind entries, plus 61 entries for brand abbreviations and misspellings.',
                },
                {
                  tr: 'Ölçüyü bilerek ayrı bir alan yaptık. 4x40 ile 4x45 yazı olarak neredeyse aynıdır ama ürün olarak tamamen farklıdır. Bu farkı yazı benzerliğinden tahmin ettirmek yerine doğrudan okuduk.',
                  en: 'We made the size a separate field on purpose. 4x40 and 4x45 are nearly the same as text but completely different as products. We read that difference directly instead of leaving it to text similarity.',
                },
                {
                  tr: 'Türkçe harfler de ayrı bir iş çıkardı. Büyük İ harfini küçültmek bazı araçlarda beklenmedik bir sonuç verir ve VİDASI ile vidası birbirini tutmaz. Bunun için kendi harf dönüşüm tablomuzu kullandık.',
                  en: 'Turkish letters were a job of their own. Lowercasing the capital İ gives unexpected results in some tools, so VİDASI and vidası do not match. We used our own letter conversion table for this.',
                },
              ],
            },
            {
              title: { tr: 'Aday seçimi', en: 'Candidate selection' },
              text: {
                tr: 'Her kaydı diğer bütün kayıtlarla karşılaştırmak çok uzun sürerdi. Bu yüzden önce aynı ürün olma ihtimali olan kayıt çiftleri seçilir, yalnızca onlar karşılaştırılır.',
                en: 'Comparing every record with every other record would take far too long. So the pairs of records that might be the same product are picked first, and only they are compared.',
              },
              details: [
                {
                  tr: 'Yüz seksen bin kayıtta olası çift sayısı on altı milyarı geçiyor. Seçimi iki yoldan yaptık: aynı kategori, ölçü ve markayı paylaşan kayıtlar ve adları birbirine en çok benzeyen kayıtlar. İkinci yol, ölçüsü adında hiç yazmayan kayıtları yakalamak için gerekiyordu. Sonunda yaklaşık 2,1 milyon çift kaldı.',
                  en: 'With a hundred and eighty thousand records the number of possible pairs passes sixteen billion. We picked pairs in two ways: records that share a category, size and brand, and records whose names are most alike. The second way was needed to catch records with no size in their name. About 2.1 million pairs were left in the end.',
                },
                {
                  tr: "Bu adımda kaçan bir eşleşme sonradan hiçbir şekilde geri gelmez. Bu yüzden burada hızdan çok kapsama baktık. Elle işaretlenmiş gerçek eşleşmelerin yüzde 99,1'i seçilen çiftlerin içinde kaldı.",
                  en: 'A match lost at this step never comes back later. That is why we cared more about coverage than speed here. 99.1 percent of the hand-labelled true matches stayed among the selected pairs.',
                },
              ],
            },
            {
              title: { tr: 'Eşleştirme modeli', en: 'Matching model' },
              text: {
                tr: 'Seçilen her çift için iki kaydın ne kadar benzediğini ölçen bir dizi özellik hesaplanır. Bir makine öğrenmesi modeli bu özelliklerden çiftin aynı ürün olma olasılığını çıkarır.',
                en: 'For every selected pair a set of features measuring how alike the two records are is calculated. A machine learning model turns these features into the probability that the pair is the same product.',
              },
              details: [
                {
                  tr: 'Özellikler on dört ölçüden oluşuyor: ölçünün tutup tutmadığı, adların benzerliği, barkodun aynı, çelişkili ya da eksik olması, marka, kaplama ve adet başı fiyat oranı bunların başlıcaları.',
                  en: 'The features are fourteen measures. The main ones are whether the sizes agree, how alike the names are, whether the barcode is the same, conflicting or missing, the brand, the finish and the ratio of the unit prices.',
                },
                {
                  tr: 'Modeli eğitmek için firmanın satın alma ekibinden iki kişi 6.400 çifti tek tek aynı ya da farklı diye işaretledi. 400 çifti ikisi de ayrı ayrı işaretledi ve büyük ölçüde aynı kararları verdiler, bu da işaretlerin güvenilir olduğunu gösterdi. Çiftlerin dörtte biri, modelin hiç görmediği bir test için ayrıldı.',
                  en: "To train the model, two people from the company's purchasing team labelled 6,400 pairs one by one as same or different. Both of them labelled 400 of the pairs separately and largely made the same decisions, which showed the labels could be trusted. A quarter of the pairs was set aside for a test the model never saw.",
                },
                {
                  tr: 'Karar ağaçlarına dayanan, yaygın kullanılan bir model seçtik. Elimizdeki işaretli veri bunun için yeterliydi, model sıradan bir sunucuda dakikalar içinde eğitiliyor ve her kararın hangi özellikten geldiği görülebiliyor. Modelin verdiği olasılıkları ayrıca gerçek oranlara göre ayarladık. Yüzde doksan diyen bir skor, gerçekten de yaklaşık yüzde doksan oranında haklı çıkıyor. Bir sonraki bölümdeki eşikler bu ayar sayesinde seçilebildi.',
                  en: "We chose a widely used model built on decision trees. The labelled data we had was enough for it, the model trains in minutes on an ordinary server and it is possible to see which feature each decision came from. We also calibrated the model's probabilities against the real rates. A score that says ninety percent turns out to be right about ninety percent of the time. The thresholds in the next chapter could be chosen thanks to this calibration.",
                },
              ],
            },
            {
              title: { tr: 'Kümeleme', en: 'Clustering' },
              text: {
                tr: 'Model çiftler hakkında karar verir. Aynı ürün olduğuna karar verilen çiftler birleştirilerek ürün grupları kurulur.',
                en: 'The model decides about pairs. Pairs judged to be the same product are joined to form product groups.',
              },
              details: [
                {
                  tr: "Bunun bilinen bir tuzağı var. A, B'ye, B de C'ye benziyorsa A ile C aynı gruba düşer, oysa A 4x40, C 4x45 olabilir. Bu yüzden her grupta bir çelişki kontrolü çalışır: grubun içinde ölçüsü ya da markası çelişen iki kayıt varsa grup en zayıf bağlantılarından bölünür. 1.212 grup bu şekilde bölündü, sekiz kayıttan büyük gruplar ise otomatik kabul edilmeden incelemeye gitti.",
                  en: 'There is a well-known trap here. If A looks like B and B looks like C, A and C end up in the same group, even though A may be 4x40 and C 4x45. So a conflict check runs on every group: if two records in a group disagree on size or brand, the group is split at its weakest links. 1,212 groups were split this way, and groups larger than eight records went to review instead of being accepted automatically.',
                },
              ],
            },
            {
              title: { tr: 'Tek ürün kartı', en: 'Single product card' },
              text: {
                tr: 'Her gruptan tek bir ürün kartı çıkar. Kartın her alanı, o alan için en güvenilir kaynaktan alınır.',
                en: 'Each group produces a single product card. Every field of the card is taken from the most reliable source for that field.',
              },
              details: [
                {
                  tr: "Ad ERP'de varsa ERP'den, barkod geçerli barkodların çoğunluğundan, ölçü ve kaplama ayrıştırılmış değerlerden gelir. Her alan hangi kaynaktan geldiğini yanında taşır, bir değer yanlış çıkarsa nereden geldiği görülür.",
                  en: 'The name comes from the ERP if it is there, the barcode from the majority of valid barcodes, and the size and finish from the parsed values. Every field carries its source next to it, so if a value turns out wrong it is clear where it came from.',
                },
                {
                  tr: 'Tedarikçi fiyatlarını bilerek birleştirmedik. Her tedarikçinin fiyatı ayrı satırda ve adet başına çevrilmiş olarak durur, çünkü firmanın asıl istediği bu karşılaştırmaydı.',
                  en: "We deliberately did not merge supplier prices. Each supplier's price sits on its own row converted to a price per piece, because this comparison is what the company really wanted.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'esik',
      label: { tr: 'Model ve eşik', en: 'Model and thresholds' },
      title: { tr: 'Otomatik karar ve insan incelemesi', en: 'Automatic decisions and human review' },
      lede: {
        tr: 'Model her çifte, iki kaydın aynı ürün olma olasılığını gösteren bir skor verir. Skor çok yüksekse çift otomatik birleşir, çok düşükse reddedilir, aradaki bantta kalan çiftlere satın alma ekibi bakar. Aşağıdaki şekiller bu kararların, modelin hiç görmediği ve ekibin elle işaretlediği 1.600 çiftte nasıl sonuç verdiğini gösterir.',
        en: 'The model gives every pair a score showing how likely the two records are to be the same product. If the score is very high the pair is merged automatically, if it is very low it is rejected, and the purchasing team looks at the pairs in the band between. The figures below show how these decisions turned out on 1,600 pairs that the model had never seen and the team had labelled by hand.',
      },
      blocks: [
        {
          type: 'chart',
          direction: 'vertical',
          label: { tr: 'Şekil 1', en: 'Figure 1' },
          title: { tr: 'Skora göre gerçekten aynı ürün olan çiftlerin oranı', en: 'Share of pairs that really are the same product, by score' },
          reading: {
            tr: "Skor düşükken çiftler neredeyse hiç aynı ürün değil, 0,92'nin üstünde neredeyse hep aynı ürün. Arada kalan bantta oran yarı yarıya, bu yüzden o bant insana bırakıldı.",
            en: 'When the score is low the pairs are almost never the same product, above 0.92 they almost always are. In the band between the rate is about half, so that band was left to people.',
          },
          unit: 'percent',
          decimals: 1,
          max: 100,
          ticks: [0, 25, 50, 75, 100],
          bars: [
            { label: { tr: '0 – 0,10', en: '0 – 0.10' }, value: 0.1, zone: 'reject' },
            { label: { tr: '0,10 – 0,30', en: '0.10 – 0.30' }, value: 1.4, zone: 'reject' },
            { label: { tr: '0,30 – 0,55', en: '0.30 – 0.55' }, value: 18.3, zone: 'reject' },
            { label: { tr: '0,55 – 0,92', en: '0.55 – 0.92' }, value: 44.6, zone: 'review' },
            { label: { tr: '0,92 – 1', en: '0.92 – 1' }, value: 99.3, zone: 'auto' },
          ],
          zones: [
            { id: 'reject', label: { tr: 'Reddedilir', en: 'Rejected' }, style: 'none' },
            { id: 'review', label: { tr: 'İncelemeye gider', en: 'Goes to review' }, style: 'hatched' },
            { id: 'auto', label: { tr: 'Otomatik birleşir', en: 'Merged automatically' }, style: 'shaded' },
          ],
          blocks: [
            {
              type: 'details',
              meta: { tr: 'Şekil 1 · veri ve ayrıntı', en: 'Figure 1 · data and details' },
              title: { tr: 'Test seti, eşikler ve belirsizlik', en: 'Test set, thresholds and uncertainty' },
              blocks: [
                {
                  type: 'sheet',
                  csv: 'score-bands',
                  name: { tr: 'skor_dilimleri.xlsx', en: 'score_bands.xlsx' },
                  tabs: { tr: ['dilimler', 'test_cifleri'], en: ['bands', 'test_pairs'] },
                  cell: 'F6',
                  formula: { tr: '=D6/C6', en: '=D6/C6' },
                  numbers: ['C', 'D', 'E', 'F'],
                  total: true,
                  notes: [
                    {
                      tr: 'Test seti, ekibin elle işaretlediği 6.400 çiftin dörtte biri. Model bu çiftleri eğitim sırasında hiç görmedi. Zor örnekler, yani adı benzeyen ama farklı olan ürünler, bilerek fazla seçildi. Bu yüzden orta skorlardaki farklı ürün oranı gerçek veride olduğundan yüksek görünür.',
                      en: 'The test set is a quarter of the 6,400 pairs the team labelled by hand. The model never saw these pairs during training. Hard examples, products with similar names that are actually different, were picked on purpose. That is why the share of different products in the middle scores looks higher than it is in the real data.',
                    },
                    {
                      tr: "Otomatik birleşen 581 çiftin 577'si gerçekten aynı üründü, yani yüzde 99,3. Bu kadar çiftle ölçülen bir oranın gerçek değeri büyük olasılıkla yüzde 98,2 ile 99,7 arasında. Reddedilen 918 çiftin 18'i ise gerçekte aynı üründü, bunlar Şekil 3'te ayrıca inceleniyor.",
                      en: 'Of the 581 pairs merged automatically, 577 really were the same product, which is 99.3 percent. With this many pairs the true value of the rate is most likely between 98.2 and 99.7 percent. Of the 918 rejected pairs, 18 were actually the same product, and Figure 3 looks at them separately.',
                    },
                    {
                      tr: 'Aynı eşikler 2,1 milyon aday çiftin tamamına uygulandığında yaklaşık 132 bin çift otomatik birleşti, yaklaşık 14,5 bin çift incelemeye gitti. Bu iki sayı test setindeki oranlardan yapılmış tahminler, tam sayımlar değil.',
                      en: 'When the same thresholds were applied to all 2.1 million candidate pairs, about 132 thousand pairs were merged automatically and about 14.5 thousand went to review. These two numbers are estimates made from the rates in the test set, not exact counts.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'chart',
          direction: 'horizontal',
          label: { tr: 'Şekil 2', en: 'Figure 2' },
          title: { tr: 'Kaynağa göre kaçırılan eşleşme oranı', en: 'Share of missed matches, by source' },
          reading: {
            tr: "Model gerçek eşleşmelerin küçük bir kısmını kaçırdı. Bu pay Tedarikçi C'de diğer kaynakların üç katı.",
            en: 'The model missed a small part of the true matches. For Supplier C this share is three times that of the other sources.',
          },
          unit: 'percent',
          decimals: 1,
          max: 8,
          ticks: [0, 2, 4, 6, 8],
          bars: [
            { label: { tr: 'ERP stok kartları', en: 'ERP stock cards' }, value: 1.9 },
            { label: { tr: 'Tedarikçi A', en: 'Supplier A' }, value: 2.0 },
            { label: { tr: 'Tedarikçi B', en: 'Supplier B' }, value: 2.3 },
            { label: { tr: 'Tedarikçi C', en: 'Supplier C' }, value: 6.2, highlight: true },
          ],
          blocks: [
            {
              type: 'details',
              meta: { tr: 'Şekil 2 · veri ve ayrıntı', en: 'Figure 2 · data and details' },
              title: { tr: 'Tedarikçi C neden geride kaldı', en: 'Why Supplier C fell behind' },
              blocks: [
                {
                  type: 'sheet',
                  csv: 'by-source',
                  name: { tr: 'kaynak_bazinda.xlsx', en: 'by_source.xlsx' },
                  tabs: { tr: ['kaynak', 'test_cifleri'], en: ['source', 'test_pairs'] },
                  cell: 'E5',
                  formula: { tr: '=D5/B5', en: '=D5/B5' },
                  numbers: ['B', 'C', 'D', 'E'],
                  notes: [
                    {
                      tr: 'Bir çift iki kayıttan oluştuğu için aynı çift iki kaynağın satırında da sayılır. Satırların toplamı bu yüzden test setindeki gerçek eşleşme sayısından büyüktür.',
                      en: 'A pair is made of two records, so the same pair is counted in the rows of both sources. That is why the rows add up to more than the number of true matches in the test set.',
                    },
                    {
                      tr: "Tedarikçi C'nin listesi PDF'ten çevrilmişti. Kayıtların yalnızca yüzde 12'sinde barkod vardı ve ürün adları kısa, serbest yazılmıştı. Model barkod ve ölçü gibi kesin bilgilere en çok dayandığı için, bu bilgiler eksik olduğunda eşleşmeleri daha sık kaçırdı. Firma Tedarikçi C'den barkodlu bir liste istedi, liste geldiğinde bu oranın yeniden ölçülmesi planlandı.",
                      en: "Supplier C's list had been converted from a PDF. Only 12 percent of its records had a barcode, and the product names were short and written freely. The model relies most on exact facts such as the barcode and the size, so it missed matches more often when those were missing. The company asked Supplier C for a list with barcodes, and the rate will be measured again when it arrives.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'chart',
          direction: 'horizontal',
          label: { tr: 'Şekil 3', en: 'Figure 3' },
          title: { tr: 'Modelin yanıldığı yerler', en: 'Where the model went wrong' },
          reading: {
            tr: 'Yanlış birleşmelerin çoğu adı ve ölçüsü aynı olan renk varyantlarından, kaçırılanlar ise eksik ya da çok kısa yazılmış kayıtlardan geldi.',
            en: 'Most wrong merges came from colour variants with the same name and size, and most missed pairs from records that were incomplete or written very briefly.',
          },
          unit: 'count',
          decimals: 0,
          max: 8,
          ticks: [0, 2, 4, 6, 8],
          bars: [
            { label: { tr: 'Renk ya da kaplama varyantı', en: 'Colour or finish variant' }, value: 3, group: { tr: 'Yanlış birleşen · 4 çift', en: 'Merged by mistake · 4 pairs' } },
            { label: { tr: 'Paketteki adet farkı', en: 'Different pack size' }, value: 1 },
            { label: { tr: 'Ölçü adda yazmıyor', en: 'Size missing from the name' }, value: 7, group: { tr: 'Kaçırılan · 18 çift', en: 'Missed · 18 pairs' } },
            { label: { tr: 'Ad çok kısa, barkod yok', en: 'Name too short, no barcode' }, value: 6 },
            { label: { tr: 'Tür sözlükte yoktu', en: 'Kind not in the dictionary' }, value: 5 },
          ],
          blocks: [
            {
              type: 'details',
              meta: { tr: 'Şekil 3 · veri ve ayrıntı', en: 'Figure 3 · data and details' },
              title: { tr: 'Hatalı çiftlerden örnekler ve yapılan düzeltme', en: 'Examples of wrong pairs and the fix' },
              blocks: [
                {
                  type: 'sheet',
                  csv: 'error-pairs',
                  name: { tr: 'hatali_ciftler.xlsx', en: 'error_pairs.xlsx' },
                  tabs: { tr: ['ornekler', 'tum_hatalar'], en: ['examples', 'all_errors'] },
                  cell: 'D2',
                  numbers: ['D'],
                  notes: [
                    {
                      tr: 'Tabloda yanlış birleşen dört çiftin hepsi, kaçırılan on sekiz çiftten de üç örnek var.',
                      en: 'The table shows all four pairs that were merged by mistake and three examples of the eighteen missed pairs.',
                    },
                    {
                      tr: "Yanlış birleşen dört çiftin üçü aynı ürünün renk ya da kaplama varyantıydı. Adları ve ölçüleri birebir aynı olduğu için model bunları yüksek skorla eşleştirdi. Kümeleme adımındaki çelişki kontrolüne kaplama ve rengi de ekledik. Aynı test setinde otomatik birleşen yanlış çift sayısı dörtten bire indi. Kalan tek hata paket farkı, 100'lü ve 1000'li paket ayrı ürün olarak satılıyor.",
                      en: 'Three of the four wrong merges were colour or finish variants of the same product. Their names and sizes were identical, so the model matched them with a high score. We added finish and colour to the conflict check in the clustering step. On the same test set the number of wrong automatic merges fell from four to one. The one error left is a pack difference, packs of 100 and 1000 are sold as separate products.',
                    },
                    {
                      tr: "Kaçırılanların çoğu Tedarikçi C'den geldi. Tür sözlüğünde olmayan beş yazım, inceleme kararlarından öğrenilerek sözlüğe eklendi.",
                      en: 'Most of the missed pairs came from Supplier C. Five spellings that were not in the kind dictionary were learned from review decisions and added to it.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'kararlar',
      label: { tr: 'Kararlar', en: 'Decisions' },
      title: { tr: 'Neyi seçtik, neyi bilerek seçmedik', en: 'What we chose, and what we chose not to' },
      lede: {
        tr: 'Teknik bir okurun ilk soracağı soruların cevabı burada. Her biri bir deneme ya da ölçümle verildi.',
        en: 'These are the answers to the first questions a technical reader would ask. Each one was settled by a trial or a measurement.',
      },
      blocks: [
        {
          type: 'decisions',
          items: [
            {
              title: { tr: 'Neden bir dil modeli ya da derin öğrenme değil', en: 'Why not a language model or deep learning' },
              text: {
                tr: 'Çok dilli bir cümle gömme modelini ek özellik olarak denedik. Kesinlik ve duyarlılık eğrisinin altındaki alana yalnızca 0,003 ekledi, gecelik çalışmaya ise kırk dakika. Hatanın çoğu ölçü ve kaplama gibi kesin alanlardan geliyordu, onları da metni anlamak değil doğru ayrıştırmak çözdü. Gömme özelliğini teslimde kapalı ama hazır bıraktık.',
                en: 'We tried a multilingual sentence embedding model as an extra feature. It added only 0.003 to the area under the precision and recall curve, and forty minutes to the nightly run. Most errors came from exact fields such as size and finish, and those were solved by parsing correctly, not by understanding the text. We delivered the embedding feature switched off but ready.',
              },
            },
            {
              title: { tr: 'Neden hazır bir kayıt eşleştirme kütüphanesi değil', en: 'Why not an off-the-shelf record linkage library' },
              text: {
                tr: 'Fellegi Sunter tabanlı araçlar, özelliklerin birbirinden bağımsız olduğunu varsayar. Bizim özelliklerimiz güçlü biçimde bağlıydı: ölçü hem adın içinde hem ayrı bir alanda geçiyordu. Türkçe normalizasyonu da her durumda kendimiz yazmak zorundaydık. Aday üretme ve kümelemede kendi kontrolümüzün olması, çelişki kuralını eklemeyi de kolaylaştırdı.',
                en: 'Tools based on Fellegi Sunter assume the features are independent of each other. Ours were strongly linked: the size appeared both inside the name and in a separate field. We would have had to write the Turkish normalisation ourselves in any case. Having our own control over candidate generation and clustering also made it easy to add the conflict rule.',
              },
            },
            {
              title: { tr: 'Neden barkodu doğrudan anahtar yapmadık', en: 'Why we did not use the barcode as the key' },
              text: {
                tr: "Barkod Tedarikçi C'de yüzde 12, ERP'de yüzde 34 doluydu. Dolu olanların da yüzde 2'si kontrol hanesinden geçmedi. Ayrıca bazı tedarikçiler koli ve tekil ürün için aynı barkodu kullanıyordu. Barkodu kesin bir anahtar değil, modelin özelliklerinden biri yaptık: aynı, çelişkili ya da eksik.",
                en: "The barcode was filled in for 12 percent of Supplier C's records and 34 percent of the ERP's. Of those filled in, 2 percent failed the check digit. Some suppliers also used the same barcode for a carton and a single item. We made the barcode one of the model's features instead of a hard key: same, conflicting or missing.",
              },
            },
            {
              title: { tr: 'Neden inceleme bandını daha dar tutmadık', en: 'Why we did not make the review band narrower' },
              text: {
                tr: 'Bandı 0,60 ile 0,95 arasına çekmek kesinliği artırır ama kuyruğu 23.833 çifte çıkarır. 0,50 ile 0,90 arası ise kuyruğu biraz küçültür ama otomatik kararlardaki yanlışı artırır. Firmanın ekibi bir çifte ortalama altı saniye bakıyordu, 14 bin çift yaklaşık 24 saatlik iş demekti. Dokuz iş gününe yayılabilecek bir yük olarak birlikte karar verdik.',
                en: "Moving the band to between 0.60 and 0.95 raises precision but grows the queue to 23,833 pairs. Between 0.50 and 0.90 shrinks the queue a little but adds wrong automatic decisions. The company's team spent about six seconds on each pair, so 14 thousand pairs meant about 24 hours of work. We decided together that this was a load that could be spread over nine working days.",
              },
            },
            {
              title: { tr: 'Neden tedarikçi fiyatlarını tek fiyata indirmedik', en: 'Why we did not reduce supplier prices to one price' },
              text: {
                tr: 'Çünkü işin asıl amacı buydu. Ürünü tekilleştirmek, fiyatları yan yana koyabilmek içindi. Altın kayıt fiyat taşımaz, fiyat her tedarikçinin ayrı satırında adet başına çevrilmiş olarak durur.',
                en: "Because that was the real point of the work. Deduplicating the products was a way to put prices side by side. The golden record carries no price, the price stays on each supplier's own row, converted to a price per piece.",
              },
            },
          ],
        },
      ],
    },
    {
      id: 'teslim',
      label: { tr: 'Teslim ve takvim', en: 'Delivery and schedule' },
      title: { tr: 'Yedi haftada ne teslim edildi', en: 'What was delivered in seven weeks' },
      lede: {
        tr: 'Teslim bir rapor değil, firmanın kendi sunucusunda her gece çalışan bir hat. Yeni ya da değişen kayıtlar gece ikide hatta girer, mevcut ürünlerle eşleşir, belirsiz olanlar sabah inceleme ekranında bekler.',
        en: 'The delivery is not a report but a pipeline that runs every night on the company’s own server. New or changed records enter the pipeline at two in the morning, are matched against existing products, and the uncertain ones wait on the review screen in the morning.',
      },
      blocks: [
        {
          type: 'timeline',
          periods: 7,
          periodLabel: { tr: 'H', en: 'W' },
          tasks: [
            { label: { tr: 'Denetim ve profil', en: 'Audit and profiling' }, start: 1, length: 1 },
            { label: { tr: 'Kurallar ve normalizasyon', en: 'Rules and normalisation' }, start: 1.6, length: 1.6 },
            { label: { tr: 'Etiketleme', en: 'Labelling' }, start: 3, length: 1.2, highlight: true },
            { label: { tr: 'Aday üretme ve model', en: 'Candidates and model' }, start: 3.6, length: 1.6 },
            { label: { tr: 'Kümeleme ve altın kayıt', en: 'Clustering and golden record' }, start: 5, length: 1 },
            { label: { tr: 'Gecelik hat ve testler', en: 'Nightly pipeline and tests' }, start: 5.6, length: 1.4 },
            { label: { tr: 'İnceleme ve devir', en: 'Review and handover' }, start: 6, length: 2, highlight: true },
          ],
          legend: { tr: 'Altın çubuklar firmanın ekibinin çalıştığı haftalar: etiketleme ve inceleme kuyruğu.', en: "Gold bars are the weeks when the company's team worked: labelling and the review queue." },
        },
        {
          type: 'tree',
          label: { tr: 'Teslim edilen depo yapısı', en: 'Structure of the delivered repository' },
          groups: [
            {
              root: 'matcher/',
              items: [
                { name: 'pipeline/', note: { tr: 'altı istasyon, her biri tek modül', en: 'six stations, one module each' } },
                { name: 'rules/', note: { tr: '31 doğrulama kuralı', en: '31 validation rules' } },
                { name: 'dictionaries/', note: { tr: '412 eş anlam, 61 marka takma adı', en: '412 synonyms, 61 brand aliases' } },
                { name: 'review/', note: { tr: 'inceleme ekranı, FastAPI + düz HTML', en: 'review screen, FastAPI and plain HTML' } },
                { name: 'sql/', note: { tr: 'şema ve hazır sorgular', en: 'schema and ready-made queries' } },
                { name: 'tests/', note: { tr: '214 test', en: '214 tests' } },
                { name: 'docs/', note: { tr: 'veri sözlüğü ve devir notu', en: 'data dictionary and handover note' } },
              ],
            },
            {
              root: 'PostgreSQL',
              items: [
                { name: 'product', note: { tr: '85.850 altın kayıt', en: '85,850 golden records' } },
                { name: 'product_source', note: { tr: 'kaynak kayıt ↔ ürün', en: 'source record ↔ product' } },
                { name: 'product_offer', note: { tr: 'tedarikçi fiyatları', en: 'supplier prices' } },
                { name: 'match_decision', note: { tr: 'her kararın izi', en: 'a trace of every decision' } },
                { name: 'quarantine', note: { tr: 'nedeniyle reddedilenler', en: 'rejected records and why' } },
              ],
            },
            {
              root: 'cron',
              items: [
                { name: '0 2 * * *', note: { tr: 'her gece artımlı çalışma, ~6 dk', en: 'nightly incremental run, ~6 min' } },
                { name: '0 3 * * 0', note: { tr: 'pazar tam çalışma, 2 sa 40 dk', en: 'full run on Sundays, 2 h 40 min' } },
              ],
            },
          ],
        },
        {
          type: 'details',
          meta: { tr: 'İnceleme', en: 'Review' },
          title: { tr: 'İnceleme kuyruğu ve karar kaydı', en: 'The review queue and decision log' },
          blocks: [
            {
              type: 'sheet',
              csv: 'review-decisions',
              name: { tr: 'match_decision_disa_aktarim.xlsx', en: 'match_decision_export.xlsx' },
              tabs: { tr: ['kararlar', 'ozet'], en: ['decisions', 'summary'] },
              cell: 'E2',
              numbers: ['D', 'G'],
              rows: 14486,
              notes: [
                {
                  tr: 'Tablo, inceleme kararlarının tutulduğu tablodan alınmış bir kesit. Ekran her seferinde tek bir çift gösteriyordu, karar tek tuşla veriliyor ve sıradaki çift hemen geliyordu. Emin olunamayan çift atlanıp sona bırakılabiliyordu.',
                  en: 'The table is an excerpt from the table where review decisions are kept. The screen showed one pair at a time, a decision took a single key press and the next pair came up at once. A pair the reviewer was unsure about could be skipped and left for the end.',
                },
                {
                  tr: "İki kişi kuyruğu dokuz iş gününde bitirdi, bir çifte ortalama altı saniyeye yakın bakıldı. Her karar, kimin, ne zaman ve hangi skorla verdiğiyle birlikte kaydedildi. Bu kararlar aynı zamanda modelin bir sonraki eğitimi için yeni işaretli veri oldu. İlk kuyruk bittiğinde işaretli çift sayısı 6.400'den 20.886'ya çıktı.",
                  en: "Two people finished the queue in nine working days, spending close to six seconds on each pair. Every decision was logged with who made it, when and at what score. The decisions also became new labelled data for the model's next training. When the first queue was done, the number of labelled pairs had grown from 6,400 to 20,886.",
                },
              ],
            },
          ],
        },
        {
          type: 'note',
          label: { tr: 'Erişim', en: 'Access' },
          text: {
            tr: 'Hat firmanın kendi sunucusunda çalışıyor. Devirden sonra bizim sunucuya erişimimiz kapatıldı, bakım ve yeniden eğitim firmanın ekibinde.',
            en: "The pipeline runs on the company's own server. Our access to the server was closed after the handover, and maintenance and retraining are with the company's team.",
          },
        },
      ],
    },
    {
      id: 'sonuc',
      label: { tr: 'Sonuç ve sınırlar', en: 'Results and limits' },
      title: { tr: 'Ne değişti, nerede hâlâ dikkat lazım', en: 'What changed, and where care is still needed' },
      lede: {
        tr: 'Aynı ürün artık tek kartta duruyor ve tedarikçi fiyatları yan yana. Hat yeni bir tedarikçi listesini bir günlük tanımla içeri alabiliyor.',
        en: 'The same product now sits on a single card and supplier prices sit side by side. The pipeline can take in a new supplier list with one day of setup.',
      },
      blocks: [
        {
          type: 'compare',
          rows: [
            {
              label: { tr: 'Aynı ürünün kart sayısı', en: 'Cards for the same product' },
              before: { tr: 'Bir ile beş arası', en: 'Between one and five' },
              lead: { tr: 'Bir', en: 'One' },
              after: { tr: ', kaynakları altında listeli', en: ', with its sources listed under it' },
            },
            {
              label: { tr: 'Bulunan gerçek eşleşme', en: 'True matches found' },
              before: { tr: 'Yüzde 18, ad üzerinden tam eşleşme', en: '18 percent, exact match on the name' },
              lead: { tr: 'Yüzde 97,2', en: '97.2 percent' },
              after: { tr: ', inceleme sonrası test setinde', en: ', on the test set after review' },
            },
            {
              label: { tr: 'Tedarikçi fiyat karşılaştırması', en: 'Supplier price comparison' },
              before: { tr: "Elle, Excel'de, ürün ürün", en: 'By hand, in Excel, product by product' },
              lead: { tr: '38.420 ürün', en: '38,420 products' },
              after: { tr: 'için hazır sorgu', en: 'with a ready-made query' },
            },
            {
              label: { tr: 'Yeni tedarikçi listesi', en: 'A new supplier list' },
              before: { tr: 'Yaklaşık iki haftalık elle eşleştirme', en: 'About two weeks of manual matching' },
              lead: { tr: 'Bir günlük', en: 'One day' },
              after: { tr: 'kaynak tanımı, sonra gecelik hat', en: 'of source setup, then the nightly pipeline' },
            },
          ],
        },
        {
          type: 'list',
          view: 'stack',
          title: { tr: 'Bilinen sınırlar', en: 'Known limits' },
          items: [
            {
              title: { tr: 'Set ve kit ürünler kapsam dışında.', en: 'Sets and kits are out of scope.' },
              text: {
                tr: 'Birden fazla ürünü bir arada satan kayıtlar, örneğin vida ve dübel seti, tek bir ürünle eşleştirilmiyor. Bu kayıtlar ayrı bir etiketle işaretlenip olduğu gibi bırakılıyor.',
                en: 'Records that sell several products together, such as a set of screws and wall plugs, are not matched to a single product. They are marked with a separate label and left as they are.',
              },
            },
            {
              title: { tr: "Tedarikçi C'de duyarlılık daha düşük.", en: 'Recall is lower for Supplier C.' },
              text: {
                tr: 'Barkod neredeyse hiç olmadığı için bu kaynakta bulunan eşleşme oranı yüzde 93,8, diğer kaynaklarda yüzde 97,9.',
                en: 'Because this source has almost no barcodes, the share of matches found is 93.8 percent here and 97.9 percent in the other sources.',
              },
            },
            {
              title: { tr: 'Alt eşiğin altında kalanlar kayboluyor.', en: 'Pairs below the lower threshold are lost.' },
              text: {
                tr: "Gerçek eşleşmelerin yüzde 2,5'i 0,55 altında kalıyor ve kimse görmüyor. Bu pay, rastgele seçilen bir örneklemle her ay yeniden ölçülüyor.",
                en: 'Of the true matches, 2.5 percent score below 0.55 and nobody ever sees them. This share is measured again every month on a random sample.',
              },
            },
            {
              title: { tr: 'Model yaşlanır.', en: 'The model ages.' },
              text: {
                tr: 'Tedarikçiler yazım alışkanlıklarını değiştirdikçe skorlar kayar. İnceleme kararları yeni etiket olarak birikiyor, altı ayda bir yeniden eğitim ve kalibrasyon öneriyoruz.',
                en: 'Scores drift as suppliers change the way they write. Review decisions keep piling up as new labels, and we recommend retraining and recalibrating every six months.',
              },
            },
          ],
        },
      ],
    },
  ],
  closing: {
    title: { tr: 'Benzer bir dağınıklık sizde de var mı?', en: 'Is there a similar mess on your side?' },
    art: {
      label: { tr: 'Svg alanı · D2 · detay-teslim.svg · üçe dört', en: 'Svg area · D2 · detay-teslim.svg · three by four' },
      note: {
        tr: 'Karakter tek ve düzgün bir koliyi iki eliyle önüne doğru uzatıyor, kolinin üstünde tek bir etiket var. Arkasında yere bırakılmış dört dağınık koli. Hikaye: dört kaynak, tek liste. Ayaklar alt çizgiye otursun.',
        en: 'The character holds out a single neat box with both hands, with one label on top. Behind it, four messy boxes left on the floor. Story: four sources, one list. The feet should rest on the bottom line.',
      },
    },
  },
}
