/*
file: page.ts
importable: page

Hartwell & Finch calismasinin detay sayfasi. Gercek bir musteri isidir,
sayilar teslim edilen veritabanindan ve yonetim hesaplarina kapanan
tablolardan gelir. Ingilizce metinler Turkce metnin cevirisidir.

description: Hartwell & Finch calismasinin detay sayfasindaki metinleri iki dilde tasiyan modul.
*/

import type { StudyPage } from '../types'
import { schema } from './schema'

export const page: StudyPage = {
  lede: {
    tr: "Cirosu bir yılda %41 artan ama kârı yerinde sayan bir mobilya üreticisinde kârın nereye gittiğini, bir yıl sonra iki ERP'yi, pazar yerlerini ve maliyet faturalarını tek bir veritabanında birleştirerek bulan geriye dönük bir inceleme.",
    en: 'A look back at a furniture maker whose turnover grew 41% in a year while profit stood still. A year later its two ERPs, marketplaces and cost invoices were brought into one database to find where the profit went.',
  },
  facts: [
    {
      label: { tr: 'Sektör', en: 'Sector' },
      value: { tr: 'Mobilya üretimi', en: 'Furniture manufacturing' },
    },
    {
      label: { tr: 'Süre', en: 'Duration' },
      value: { tr: '6 hafta', en: '6 weeks' },
    },
    {
      label: { tr: 'Girdi', en: 'Input' },
      value: { tr: '11 klasörde 1.425 ham dosya', en: '1,425 raw files in 11 folders' },
    },
    {
      label: { tr: 'Teslim', en: 'Delivered' },
      value: { tr: 'Veritabanı, kâr analizi, rapor ve aylık göstergeler', en: 'Database, profit analysis, report and monthly indicators' },
    },
  ],
  summary: {
    problem: {
      tr: "Mart 2025'te kapanan mali yılda ciro %41 arttı, kâr yalnızca %16 arttı ve kâr marjı düştü. Şirketin sistemleri kârı kanal, müşteri ya da sipariş bazında gösteremiyordu. Bir yıl sonra şirket, kaybın kaynağının geriye dönük bir araştırmayla bulunmasını istedi.",
      en: 'In the financial year to March 2025 turnover rose 41%, profit rose only 16% and the profit margin fell. The company’s systems could not show profit by channel, customer or order. A year later the company asked for a look back to find the source of the loss.',
    },
    approach: {
      tr: 'Ham dosyalar tek bir veritabanında birleştirildi, pazar yeri satışları sipariş bazında yeniden kuruldu ve her taşıma, gümrük ve garanti maliyeti bir siparişe bağlandı. Her tablo şirketin yönetim hesaplarına kapatıldı.',
      en: 'The raw files were brought into one database, marketplace sales were rebuilt order by order and every freight, customs and warranty cost was linked to an order. Every table was closed to the company’s management accounts.',
    },
    result: {
      tr: "Kasım 2023 ile Mayıs 2024 arasında alınan beş yönetim kararının Mart 2025'te kapanan yıldaki maliyeti 2,09 milyon sterlin çıktı, o yılın kârından fazla. Önerilen değişikliklerin yıllık değeri yaklaşık 2,5 milyon sterlin.",
      en: 'Five management decisions taken between November 2023 and May 2024 cost 2.09 million pounds in the year to March 2025, more than that year’s profit. The recommended changes are worth about 2.5 million pounds a year.',
    },
  },
  chapters: [
    {
      id: 'problem',
      label: { tr: 'Sorun', en: 'Problem' },
      title: { tr: 'Rekor ciro, yerinde sayan kâr', en: 'Record turnover, flat profit' },
      lede: {
        tr: "Mart 2025'te kapanan mali yıl şirketin en yüksek cirosuyla kapandı ama kâr neredeyse yerinde kaldı. Bir yıl sonra şirket, o yıl kârın neden bu kadar az arttığının ve kaybın nereden geldiğinin geriye dönük olarak araştırılmasını istedi. Bu çalışma, bu istek doğrultusunda geçmişe yönelik yapılan veri analizi çalışmalarını kapsamaktadır.",
        en: 'The financial year that ended in March 2025 closed with the highest turnover in the company’s history, but profit barely moved. A year later the company asked for a look back at why profit had grown so little that year and where the loss came from. This study covers the retrospective data analysis carried out in response to that request.',
      },
      blocks: [
        {
          type: 'table',
          head: [
            { tr: '', en: '' },
            { tr: "Mart 2024'te kapanan yıl", en: 'Year to March 2024' },
            { tr: "Mart 2025'te kapanan yıl", en: 'Year to March 2025' },
          ],
          rows: [
            [{ tr: 'Ciro', en: 'Turnover' }, { tr: '19,53 milyon sterlin', en: '19.53 million pounds' }, { tr: '27,49 milyon sterlin', en: '27.49 million pounds' }],
            [{ tr: 'Kâr', en: 'Profit' }, { tr: '1,44 milyon sterlin', en: '1.44 million pounds' }, { tr: '1,67 milyon sterlin', en: '1.67 million pounds' }],
            [{ tr: 'Kâr marjı', en: 'Profit margin' }, { tr: '%7,4', en: '7.4%' }, { tr: '%6,1', en: '6.1%' }],
            [{ tr: 'Bütçedeki kâr', en: 'Budgeted profit' }, { tr: '–', en: '–' }, { tr: '5,31 milyon sterlin', en: '5.31 million pounds' }],
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "Kâr derken burada faiz, vergi ve amortisman düşülmeden önceki faaliyet kârı kastediliyor, şirketin o dönemki kredi şartı da bu rakama bakıyordu. Ciro üçte birden fazla büyümüştü, kâr ise ancak %16 arttı ve ciroya oranı düştü. İnceleme 2026'da yapıldı, kullanılan bütün veri Ocak 2021 ile Haziran 2025 arasına ait.",
            en: 'Profit here means operating profit before interest, tax and depreciation, the figure the company’s loan covenant looked at in that period. Turnover had grown by more than a third, profit rose only 16% and fell as a share of turnover. The review was carried out in 2026, and all the data used dates from January 2021 to June 2025.',
          },
        },
      ],
    },
    {
      id: 'data',
      label: { tr: 'Eldeki veri', en: 'The data' },
      title: { tr: '11 klasörde 1.425 dosya', en: '1,425 files in 11 folders' },
      lede: {
        tr: "Dosyalar bilerek temizlenmeden, oldukları gibi istendi: iki ERP'nin yedekleri, pazar yeri raporları, taşıyıcı ve gümrük faturaları, iade logları, üretim kayıtları ve yazışmalar.",
        en: 'The files were requested as they were, deliberately uncleaned: backups of two ERPs, marketplace reports, carrier and customs invoices, returns logs, production records and correspondence.',
      },
      blocks: [
        {
          type: 'tree',
          label: { tr: 'Teslim alınan klasörler ve dosya sayıları', en: 'Folders received and their file counts' },
          groups: [
            {
              root: 'job/',
              items: [
                { name: '00_engagement/', note: { tr: '10 dosya · iş tanımı, görüşme notları', en: '10 files · scope, interview notes' } },
                { name: '01_server_backup/', note: { tr: '22 dosya · iki ERP yedeği', en: '22 files · backups of two ERPs' } },
                { name: '02_finance/', note: { tr: '13 dosya · yönetim hesapları, bütçe', en: '13 files · management accounts, budget' } },
                { name: '03_sales/', note: { tr: '543 dosya · siparişler, fiyat listeleri', en: '543 files · orders, price lists' } },
                { name: '04_marketplaces/', note: { tr: '390 dosya · pazar yeri raporları', en: '390 files · marketplace reports' } },
                { name: '05_production/', note: { tr: '146 dosya · ürün ağacı, mesai, planlar', en: '146 files · bill of materials, hours, plans' } },
                { name: '06_warehouse_logistics/', note: { tr: '169 dosya · taşıyıcı faturaları, sayımlar', en: '169 files · carrier invoices, stocktakes' } },
                { name: '07_returns_service/', note: { tr: '36 dosya · iade logları, destek talepleri', en: '36 files · returns logs, support tickets' } },
                { name: '08_export_customs/', note: { tr: '43 dosya · gümrük ekstreleri, beyannameler', en: '43 files · customs statements, declarations' } },
                { name: '09_purchasing/', note: { tr: '6 dosya · tedarikçi listesi ve mektupları', en: '6 files · supplier list and letters' } },
                { name: '10_misc/', note: { tr: '45 dosya · e-postalar, yazışmalar', en: '45 files · emails, chats' } },
              ],
            },
          ],
        },
        {
          type: 'note',
          label: { tr: 'Gizlilik', en: 'Privacy' },
          text: {
            tr: 'Firma çalışmanın kendi adıyla yayınlanmasına ve bu sayfadaki dosyaların paylaşılmasına izin verdi. Kesitlerde yalnızca kişisel bilgiler değiştirildi: özel müşterilerin adı yerine Özel müşteri yazıldı, posta kodlarının yalnızca ilk kısmı bırakıldı, çalışan adları ve kullanıcı adları rolleriyle değiştirildi. Bunun dışındaki her değer kaynaktaki gibidir.',
            en: 'The company agreed to the work being published under its own name and to the files on this page being shared. Only personal details were changed in the excerpts: private customers’ names became Private customer, only the first part of each postcode was kept, and staff and user names were replaced with their roles. Every other value is as in the source.',
          },
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Kod yazılmadan önce her klasör tek tek açıldı. Her dosyanın sütunları, tarih aralığı, kodlaması ve örnek satırları incelendi, yönetim hesapları, e-postalar ve görüşme notları baştan sona okundu. Sorunlar ilk bakışta görünüyordu.',
            en: 'Before any code was written every folder was opened one by one. Each file’s columns, date range, encoding and sample rows were examined, and the management accounts, the emails and the interview notes were read from start to finish. The problems were visible at first glance.',
          },
        },
        {
          type: 'table',
          head: [
            { tr: 'Kaynak', en: 'Source' },
            { tr: 'Bulunan sorun', en: 'What was found' },
          ],
          rows: [
            [{ tr: 'İki ERP', en: 'The two ERPs' }, { tr: 'Ürün kodları, müşteri hesapları ve belge numaraları farklı. İkisini bağlayan eşleme tablosu yarım.', en: 'Different item codes, customer accounts and document numbers. The table linking them is half finished.' }],
            [{ tr: 'Business Central yedeği', en: 'Business Central backup' }, { tr: 'Veritabanı yerine her tablo SQL Server komutları olarak dışa aktarılmış, bazı satırlar iki kez yazılmış.', en: 'Instead of a database, each table was exported as SQL Server statements, and some rows were written twice.' }],
            [{ tr: 'Sage 200 dışa aktarımı', en: 'Sage 200 export' }, { tr: 'Eski Windows kodlamasında. Son haftanın faturaları dışarıda kalmış.', en: 'In an old Windows encoding. The invoices of the last week are missing.' }],
            [{ tr: 'Wayfair İngiltere', en: 'Wayfair UK' }, { tr: 'Tarihler Amerikan biçiminde, önce ay sonra gün.', en: 'Dates in US format, month before day.' }],
            [{ tr: 'Amazon İngiltere ve Almanya', en: 'Amazon UK and Germany' }, { tr: 'Ondalık ayracı virgül, fiyatlar vergi dahil.', en: 'Comma as the decimal separator, prices include VAT.' }],
            [{ tr: 'Shopify', en: 'Shopify' }, { tr: 'Üç aylık dosyalar birbirine taşıyor, 511 sipariş iki dosyada da var.', en: 'The quarterly files overlap, 511 orders appear in two files.' }],
            [{ tr: 'EuroLink faturaları', en: 'EuroLink invoices' }, { tr: 'Sütun adları Hollandaca.', en: 'Column names in Dutch.' }],
            [{ tr: 'Taşıyıcı faturaları', en: 'Carrier invoices' }, { tr: 'Referans alanı bazen fatura numarası, bazen sipariş numarası, bazen yalnızca bir kişinin adı.', en: 'The reference field is sometimes an invoice number, sometimes an order number, sometimes only a person’s name.' }],
            [{ tr: 'Kur tablosu', en: 'Exchange rate sheet' }, { tr: 'Bir ayın euro kuru 1,15 yerine 1,70 yazılmış.', en: 'One month’s euro rate is typed as 1.70 instead of 1.15.' }],
            [{ tr: 'Yönetim hesapları', en: 'Management accounts' }, { tr: 'Bir yıl bin sterlin cinsinden, öteki yıllar sterlin.', en: 'One year in thousands of pounds, the other years in pounds.' }],
          ],
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 1 · ham veri', en: 'Table 1 · raw data' },
          title: { tr: 'Bir taşıyıcı faturasının referans alanı', en: 'The reference field of a carrier invoice' },
          blocks: [
            {
              type: 'sheet',
              csv: 'panther-invoice',
              name: { tr: 'Panther 2024-11.xlsx', en: 'Panther 2024-11.xlsx' },
              tabs: { tr: ['Sevkiyatlar'], en: ['Consignments'] },
              cell: 'C4',
              numbers: ['F', 'G', 'H', 'I', 'J'],
              rows: 865,
              notes: [
                {
                  tr: 'Kasım 2024 faturasının 865 satırından seçilmiş 20 satır. Müşteri referansı alanında web siparişi, Amazon ve Wayfair sipariş numaraları, fatura numaraları, garanti ve iade kayıtları, telefonla alınmış siparişler ve 18 karakterde kesilmiş firma adları aynı sütunda duruyor.',
                  en: 'Twenty of the 865 lines on the November 2024 invoice. The customer ref field holds web order numbers, Amazon and Wayfair order numbers, invoice numbers, warranty and return records, phone orders and company names cut at 18 characters, all in the same column.',
                },
                {
                  tr: 'Referansı yalnızca bir kişinin adı olan satırlarda ad yerine Özel müşteri yazıldı, posta kodlarının yalnızca ilk kısmı bırakıldı. Geri kalan her şey faturadaki gibidir.',
                  en: 'Where the reference is only a person’s name, Private customer was written instead of the name, and only the first part of each postcode was kept. Everything else is as on the invoice.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'consolidation',
      label: { tr: 'Birleştirme', en: 'Consolidation' },
      title: { tr: 'Ürün kodları, müşteriler ve siparişler', en: 'Item codes, customers and orders' },
      lede: {
        tr: 'İki ERP farklı ürün kodları, farklı müşteri hesapları ve farklı belge numaraları kullanıyordu. Birleştirmenin özü bir ekleme değil, bir dizi eşleme kuralıydı.',
        en: 'The two ERPs used different item codes, different customer accounts and different document numbers. The heart of the consolidation was a set of mapping rules, not an append.',
      },
      blocks: [
        {
          type: 'stations',
          items: [
            {
              title: { tr: 'ERP yedeğinin okunması', en: 'Reading the ERP backup' },
              text: {
                tr: "Business Central'ın 16 tablosu SQL Server komutları olarak gelmişti. Bunları okuyan küçük bir ayrıştırıcı yazıldı.",
                en: 'Business Central’s 16 tables came as SQL Server statements. A small parser was written to read them.',
              },
              details: [
                {
                  tr: "Komutlar doğrudan SQLite'a yüklenemiyordu: tarihler dönüşüm ifadelerinin içinde, metinler Unicode önekiyle yazılmıştı. Değerleri virgülden bölmek de işe yaramıyordu, çünkü virgül hem metinlerin hem sayı tanımlarının içinde geçiyordu. Boş tarih olarak saklanan 1753 yılı boş değere çevrildi, iki kez yazılmış satırlar atıldı ve sayıları veri kalitesi loguna yazıldı.",
                  en: 'The statements could not be loaded into SQLite directly: dates sat inside conversion expressions and text carried a Unicode prefix. Splitting values on commas did not work either, because commas appeared inside both text and number definitions. The year 1753, which BC stores as an empty date, was turned into an empty value, the rows written twice were dropped and their number was recorded in the data quality log.',
                },
              ],
            },
            {
              title: { tr: 'Ürün kodları', en: 'Item codes' },
              text: {
                tr: "Sage'deki ASH01-LG ile Business Central'daki HF-ASH-SOF2-LG aynı ürün. Eşleme tablosu yerine kodun kendi yapısı kural olarak kullanıldı.",
                en: 'ASH01-LG in Sage and HF-ASH-SOF2-LG in Business Central are the same item. The structure of the code itself was used as the rule instead of the mapping table.',
              },
              details: [
                {
                  tr: "İki kod da koleksiyonu, ürün tipini ve kaplamayı taşıyor. Sage'deki iki haneli tip numarası Business Central'daki dört harfli tip koduna birebir karşılık geliyor: 01 ikili kanepe, 04 berjer, 15 altı kişilik yemek masası. Kural Sage'deki her ürün açıklamasıyla karşılaştırıldı, tek bir çelişki çıkmadı. Eşleme tablosu 1.032 ürünün yalnızca 518'ini kapsıyordu ve 9 satırı yanlıştı. Amazon ajansının HF_ASH_SOF2_LG ya da ASH01-LG-AMZ gibi kodları da önce bu yapıya çevrildi.",
                  en: 'Both codes carry the collection, the product type and the finish. The two-digit type number in Sage maps one to one to the four-letter type code in Business Central: 01 is a two-seater sofa, 04 an armchair, 15 a six-seater dining table. The rule was checked against every item description in Sage and no conflict was found. The mapping table covered only 518 of 1,032 items and 9 of its rows were wrong. Codes the Amazon agency used, such as HF_ASH_SOF2_LG or ASH01-LG-AMZ, were first turned into this structure.',
                },
              ],
            },
            {
              title: { tr: 'Müşteriler', en: 'Customers' },
              text: {
                tr: 'İki sistemdeki müşteri hesapları üç kademede eşlendi: önce eski hesap numarası, sonra sadeleştirilmiş ad ve şehir, en son aynı şehir içinde benzer ad.',
                en: 'Customer accounts across the two systems were matched in three steps: first the old account number, then the cleaned name and city, last a similar name within the same city.',
              },
              details: [
                {
                  tr: "Eski hesap numarası alanı 152 hesabı bağladı. Ad ve şehir eşlemesi ile %85 benzerlik eşiği 24 hesabı daha ekledi. Eşiği şehirle sınırlamak önemliydi, aynı zincirin farklı şehirlerdeki mağazaları birbirine çok benzeyen adlar taşıyordu. Business Central'da aynı müşteri için iki kez açılmış 6 kart bulundu. Faturalar iki karta da kesildiği için kartlar silinmedi, asıl karta bağlandı.",
                  en: 'The old account number field linked 152 accounts. Name and city matching with an 85% similarity threshold added 24 more. Limiting the threshold to the same city mattered, stores of the same chain in different cities had very similar names. 6 customers set up twice in Business Central were found. Invoices had been posted to both cards, so the cards were kept and each was linked to the original.',
                },
              ],
            },
            {
              title: { tr: 'Satışlar', en: 'Sales' },
              text: {
                tr: 'İki sistemin fatura ve iade satırları tek tabloda birleştirildi: Ocak 2021 ile Haziran 2025 arasında yaklaşık 78 bin satır.',
                en: 'The invoice and credit note lines of both systems were combined in one table: about 78 thousand lines between January 2021 and June 2025.',
              },
            },
            {
              title: { tr: 'Pazar yerleri', en: 'Marketplaces' },
              text: {
                tr: 'Muhasebede aylık tek fatura olan pazar yeri satışları Amazon, Wayfair, Shopify ve eBay raporlarından sipariş bazında yeniden kuruldu: 26.785 sipariş satırı.',
                en: 'Marketplace sales, a single invoice a month in the books, were rebuilt order by order from the Amazon, Wayfair, Shopify and eBay reports: 26,785 order lines.',
              },
              details: [
                {
                  tr: "Amazon ödeme dosyalarında her dönemin satır toplamı dosya başındaki ödeme tutarına kuruşu kuruşuna kapandı. Bu, işaretlerin ve ondalık ayraçlarının doğru okunduğunu gösteriyordu. Fiyatlar İngiltere ve Almanya'da vergi dahil, ABD'de vergi hariç geliyordu, gelir her platformda vergiden arındırıldı. Bu şekilde kurulan gelir, muhasebedeki aylık özet faturalarla her ay birebir tuttu.",
                  en: 'In the Amazon settlement files the line total of every period closed to the payout amount at the top of the file to the penny. This showed that signs and decimal separators had been read correctly. Prices came with tax included in the UK and Germany and without tax in the US, so tax was taken out of revenue on every platform. Revenue rebuilt this way matched the monthly summary invoices in the books every month.',
                },
              ],
            },
            {
              title: { tr: 'Taşıma ve gümrük', en: 'Freight and customs' },
              text: {
                tr: 'Dört taşıyıcıdan ve gümrük temsilcisinden gelen yaklaşık 52 bin maliyet satırı bir siparişe, müşteriye ya da kanala bağlandı.',
                en: 'About 52 thousand cost lines from four carriers and the customs agent were linked to an order, a customer or a channel.',
              },
              details: [
                {
                  tr: 'Referans alanında 11 farklı kalıp bulundu: iki sistemin fatura numaraları, web, Amazon, Wayfair ve eBay sipariş numaraları, büyük zincirlerin EDI referansları, garanti ve iade kayıtları, depolama satırları ve serbest metin. Önce referans doğrudan siparişe bağlandı. Bağlanamayanlar müşteri adı olarak arandı, taşıyıcının adları 18 karakterde kestiği fark edilince adın başıyla eşleme de eklendi. Hiçbir şeye bağlanamayan satırlar aynı taşıyıcı, aynı hizmet ve aynı aydaki bağlanmış satırların dağılımına göre paylaştırıldı.',
                  en: 'Eleven different patterns were found in the reference field: invoice numbers from both systems, web, Amazon, Wayfair and eBay order numbers, EDI references from the large chains, warranty and return records, storage lines and free text. First the reference was linked directly to an order. What did not link was searched as a customer name, and once it was noticed that the carrier cut names at 18 characters, matching on the start of the name was added. Lines that linked to nothing were shared out by the mix of linked lines for the same carrier, service and month.',
                },
              ],
            },
            {
              title: { tr: 'Ürün maliyeti', en: 'Product cost' },
              text: {
                tr: "Business Central'daki maliyetler iki yıldır güncellenmemişti. Maliyet ürün ağacından, gerçek alış fiyatlarından ve işçilik saatlerinden yeniden kuruldu.",
                en: 'The costs in Business Central had not been updated for two years. Cost was rebuilt from the bill of materials, actual purchase prices and labour hours.',
              },
            },
            {
              title: { tr: 'Kanal kâr tablosu', en: 'Channel profit table' },
              text: {
                tr: 'Hepsi on iki satış kanalının her biri için ayrı bir kâr tablosunda birleştirildi. Hiçbir kanala ait olmayan giderler ayrı bir merkez satırında durur.',
                en: 'Everything was brought together in a separate profit table for each of twelve sales channels. Costs that belong to no channel sit in a separate central line.',
              },
            },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Aşağıda bir taşıyıcı satırının bağlanmadan önceki ve sonraki hali var. Taşıyıcı referansa yalnızca müşterinin adını yazmış ve adı 18 karakterde kesmiş. Ad, müşteri listesinde aranıp hesabına ve satış kanalına bağlandı.',
            en: 'Below is one carrier line before and after linking. The carrier wrote only the customer’s name in the reference and cut it at 18 characters. The name was looked up in the customer list and linked to the account and its sales channel.',
          },
        },
        {
          type: 'record',
          before: { tr: 'Taşıyıcı faturasında', en: 'On the carrier invoice' },
          after: { tr: 'Bağlandıktan sonra', en: 'After linking' },
          fields: [
            { name: 'ref', before: { tr: 'Ingram Furniture L', en: 'Ingram Furniture L' }, after: { tr: 'Ingram Furniture L', en: 'Ingram Furniture L' } },
            { name: 'service', before: { tr: '2MAN-TRADE', en: '2MAN-TRADE' }, after: { tr: '2MAN-TRADE', en: '2MAN-TRADE' } },
            { name: 'cost_gbp', before: { tr: '188,16', en: '188.16' }, after: { tr: '188,16', en: '188.16' } },
            { name: 'ref_kind', after: { tr: 'name', en: 'name' } },
            { name: 'cust_no', after: { tr: 'C10016', en: 'C10016' } },
            { name: 'channel', after: { tr: 'UK Trade', en: 'UK Trade' } },
            { name: 'match', after: { tr: 'customer', en: 'customer' } },
            { name: 'purpose', after: { tr: 'Outbound', en: 'Outbound' } },
          ],
          note: {
            tr: 'Kasım 2024 Panther faturasından bir satır. Kanal ve amaç alanlarının değerleri veritabanındaki kodlardır.',
            en: 'One line from the November 2024 Panther invoice. The channel and purpose values are the codes used in the database.',
          },
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 2 · ham veri', en: 'Table 2 · raw data' },
          title: { tr: "Business Central'daki ürün eşleme tablosu", en: 'The item mapping table in Business Central' },
          blocks: [
            {
              type: 'sheet',
              csv: 'item-mapping',
              name: { tr: 'HF Ürün Eşleme.xlsx', en: 'HF Item Mapping.xlsx' },
              tabs: { tr: ['HF Ürün Eşleme'], en: ['HF Item Mapping'] },
              cell: 'B5',
              rows: 518,
              notes: [
                {
                  tr: "518 satırlık tablodan 18 satır: 9'u kod yapısıyla çelişen satırların hepsi, 9'u doğru eşlenmiş örnek. Çelişen satırlarda eski kodun ilk üç harfi ile yeni kodun koleksiyonu tutmuyor, örneğin COT08-LG bir Ashby pufuna eşlenmiş.",
                  en: '18 of the 518 rows: all 9 rows that contradict the code structure and 9 correctly mapped examples. In the contradicting rows the first three letters of the old code do not match the collection of the new code, for example COT08-LG is mapped to an Ashby footstool.',
                },
                {
                  tr: 'Açıklama sütunu okunsun diye ürün tablosundan eklendi. Eşleyen sütunundaki kullanıcı adlarının yerine roller yazıldı.',
                  en: 'The description column was added from the item table for readability. The user names in the mapped by column were replaced with roles.',
                },
              ],
            },
          ],
        },
        {
          type: 'composition',
          label: { tr: 'Şekil 1', en: 'Figure 1' },
          title: { tr: "Mart 2025'te kapanan yılın taşıma maliyeti nereye bağlandı", en: 'Where freight cost in the year to March 2025 was linked' },
          reading: {
            tr: "Taşıma maliyetinin %73,8'i doğrudan bir siparişe ya da müşteriye bağlandı. ABD'ye giden konteynerler yapıları gereği siparişe bağlanamaz, o ayki ABD siparişlerine göre paylaştırıldı.",
            en: '73.8% of freight cost was linked directly to an order or a customer. Containers to the US cannot be tied to an order by nature, they were shared by that month’s US orders.',
          },
          parts: [
            { label: { tr: 'Siparişe bağlandı', en: 'Linked to an order' }, style: 'ink' },
            { label: { tr: 'Müşteriye bağlandı', en: 'Linked to a customer' }, style: 'gold' },
            { label: { tr: 'Paylaştırıldı', en: 'Shared out' }, style: 'hatched' },
          ],
          rows: [
            { label: { tr: 'Panther, İngiltere', en: 'Panther, UK' }, values: [68.0, 10.1, 21.9] },
            { label: { tr: 'EuroLink, Avrupa', en: 'EuroLink, Europe' }, values: [76.9, 13.3, 9.8] },
            { label: { tr: 'Atlantic, ABD deposu', en: 'Atlantic, US warehouse' }, values: [68.5, 0, 31.5] },
            { label: { tr: 'Meridian, ABD konteyneri', en: 'Meridian, US containers' }, values: [0, 0, 100] },
            { label: { tr: 'Hepsi', en: 'All' }, values: [66.1, 7.7, 26.2] },
          ],
          blocks: [
            {
              type: 'details',
              meta: { tr: 'Şekil 1 · veri', en: 'Figure 1 · data' },
              title: { tr: 'Taşıyıcıya göre tutarlar', en: 'Amounts by carrier' },
              blocks: [
                {
                  type: 'table',
                  head: [
                    { tr: 'Taşıyıcı', en: 'Carrier' },
                    { tr: 'Siparişe', en: 'To an order' },
                    { tr: 'Müşteriye', en: 'To a customer' },
                    { tr: 'Paylaştırılan', en: 'Shared out' },
                    { tr: 'Toplam', en: 'Total' },
                  ],
                  rows: [
                    [{ tr: 'Panther', en: 'Panther' }, { tr: '816.175 £', en: '£816,175' }, { tr: '121.624 £', en: '£121,624' }, { tr: '262.812 £', en: '£262,812' }, { tr: '1.200.611 £', en: '£1,200,611' }],
                    [{ tr: 'EuroLink', en: 'EuroLink' }, { tr: '510.970 £', en: '£510,970' }, { tr: '88.103 £', en: '£88,103' }, { tr: '65.735 £', en: '£65,735' }, { tr: '664.808 £', en: '£664,808' }],
                    [{ tr: 'Atlantic', en: 'Atlantic' }, { tr: '462.134 £', en: '£462,134' }, { tr: '0 £', en: '£0' }, { tr: '213.000 £', en: '£213,000' }, { tr: '675.134 £', en: '£675,134' }],
                    [{ tr: 'Meridian', en: 'Meridian' }, { tr: '0 £', en: '£0' }, { tr: '0 £', en: '£0' }, { tr: '167.339 £', en: '£167,339' }, { tr: '167.339 £', en: '£167,339' }],
                    [{ tr: 'Hepsi', en: 'All' }, { tr: '1.789.279 £', en: '£1,789,279' }, { tr: '209.727 £', en: '£209,727' }, { tr: '708.886 £', en: '£708,886' }, { tr: '2.707.892 £', en: '£2,707,892' }],
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'database',
      label: { tr: 'Veritabanı', en: 'Database' },
      title: { tr: 'Her çalıştırmada sıfırdan kurulan veritabanı', en: 'A database rebuilt from scratch on every run' },
      lede: {
        tr: 'Bütün kaynaklar tek bir SQLite dosyasında, ham, ana, olay ve analiz katmanlarında duruyor. Aylık güncelleme yeni dosyaları aynı klasörlere bırakıp komutu yeniden çalıştırmaktan ibaret.',
        en: 'Every source sits in a single SQLite file, in raw, master, event and analysis layers. A monthly refresh means dropping the new files into the same folders and running the command again.',
      },
      blocks: [
        {
          type: 'paragraph',
          text: {
            tr: 'Veritabanında 56 tablo var ve dört katmanda duruyor. İlk katman ERP yedeğinin olduğu gibi yüklenmiş 16 tablosu. İkincisi ürün, müşteri, maliyet ve kur gibi ana tablolar. Üçüncüsü satış, sipariş, taşıma, gümrük, garanti ve üretim gibi olay tabloları. Dördüncüsü kanal kâr tablosu, kâr dökümü ve kararların etkisi gibi analiz tabloları. Aşağıdaki şema bunların çekirdeğini, yedi tabloyu gösteriyor.',
            en: 'The database has 56 tables in four layers. The first layer is the 16 tables of the ERP backup, loaded as they are. The second holds master tables such as items, customers, costs and exchange rates. The third holds event tables such as sales, orders, freight, customs, warranty and production. The fourth holds analysis tables such as the channel profit table, the profit breakdown and the effect of the decisions. The schema below shows their core, seven tables.',
          },
        },
        {
          type: 'schema',
          view: 'plate',
          schema,
          layout: [
            'fact_channel_line dim_item dim_item_cost',
            'fact_sales dim_customer fact_logistics',
            'fact_sales dim_customer fact_customs',
          ],
          label: { tr: 'Şema 1', en: 'Schema 1' },
          title: { tr: 'Teslim edilen veritabanının çekirdeği', en: 'The core of the delivered database' },
          reading: {
            tr: 'Ürün ve müşteri tabloları ortada durur. Satış satırları, pazar yeri siparişleri, taşıma ve gümrük satırları bu iki tabloya bağlanır, kanal kârı bu bağlardan hesaplanır.',
            en: 'The item and customer tables sit in the middle. Sales lines, marketplace orders, freight and customs lines link to these two tables, and channel profit is calculated from these links.',
          },
          blocks: [
            {
              type: 'details',
              meta: { tr: 'Şema 1 · sütunlar', en: 'Schema 1 · columns' },
              title: { tr: 'Yedi tablonun bütün sütunları', en: 'Every column of the seven tables' },
              blocks: schema.tables.map((table) => ({ type: 'dbtable', view: 'columns', schema, table: table.name }) as const),
            },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Aşağıda taşıma tablosuna yapılan bir sorgunun sonucu var: aynı Panther faturasından dört sevkiyat. İlki müşteri adından, son ikisi sipariş ve garanti numarasından bağlandı. Aradaki sevkiyatın referansında yalnızca bir kişinin adı vardı ve hiçbir şeye bağlanamadı, maliyeti aynı ay ve aynı hizmetteki bağlanmış satırların dağılımına göre üç platforma bölündü.',
            en: 'Below is the result of a query on the freight table: four consignments from the same Panther invoice. The first was linked through the customer name, the last two through an order and a warranty number. The consignment in between had only a person’s name as its reference and could not be linked to anything, so its cost was split across three platforms by the mix of linked lines in the same month and service.',
          },
        },
        { type: 'dbtable', view: 'rows', schema, table: 'fact_logistics', csv: 'logistics-sample' },
      ],
    },
    {
      id: 'reconciliation',
      label: { tr: 'Mutabakat', en: 'Reconciliation' },
      title: { tr: 'Her tablo yönetim hesaplarına kapanır', en: 'Every table closes to the management accounts' },
      lede: {
        tr: 'Bu tür bir işte güvenin tek ölçüsü rakamların şirketin kendi muhasebesine kapanmasıdır. Her adımın sonunda bu denetlendi, kapanmayan bir fark da saklanmadı.',
        en: 'In this kind of work the only measure of trust is that the figures close to the company’s own accounts. This was checked at the end of every step, and the one gap that would not close was not hidden.',
      },
      blocks: [
        {
          type: 'paragraph',
          text: {
            tr: 'Aşağıdaki her satır, kurulan bir tablonun şirketin kendi rakamlarına kapanıp kapanmadığını gösteriyor. Kontroller her çalıştırmada kendiliğinden yapılıyor, tutmayan bir fark veri kalitesi loguna yazılıyor.',
            en: 'Each row below shows whether a table that was built closes to the company’s own figures. The checks run automatically on every run, and any gap that does not close is written to the data quality log.',
          },
        },
        {
          type: 'acceptance',
          rows: [
            {
              criterion: { tr: 'Gelir, yönetim hesaplarına', en: 'Revenue to the accounts' },
              target: { tr: 'Her satır, her yıl', en: 'Every line, every year' },
              result: { tr: 'En büyük fark 677 £', en: 'Largest gap £677' },
              met: true,
            },
            {
              criterion: { tr: 'Web ve pazar yeri geliri, platformlara', en: 'Web and marketplace revenue to the platforms' },
              target: { tr: 'Her yıl', en: 'Every year' },
              result: { tr: 'En büyük fark 68 £', en: 'Largest gap £68' },
              met: true,
            },
            {
              criterion: { tr: 'Taşıma faturaları, muhasebeye', en: 'Freight invoices to the books' },
              target: { tr: 'Her yıl', en: 'Every year' },
              result: { tr: 'Kuruşu kuruşuna', en: 'To the penny' },
              met: true,
            },
            {
              criterion: { tr: 'Kanal kârları, şirketin kârına', en: 'Channel profits to company profit' },
              target: { tr: 'Her yıl', en: 'Every year' },
              result: { tr: 'Fark yok', en: 'No gap' },
              met: true,
            },
            {
              criterion: { tr: 'Kâr dökümü', en: 'Profit breakdown' },
              target: { tr: 'Kalan yok', en: 'No remainder' },
              result: { tr: 'Kalan yok', en: 'No remainder' },
              met: true,
            },
            {
              criterion: { tr: 'İadeler, kredi notlarına', en: 'Returns to credit notes' },
              target: { tr: 'Her yıl', en: 'Every year' },
              result: { tr: '533 bin £ belgesiz', en: '£533k undocumented' },
              met: false,
            },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Son satırdaki fark muhasebeye elle girilmiş kayıtlardan geliyor ve bu kayıtların belgesi verilmedi. Farkın Wayfair kesintilerinden geldiği düşünülüp denendi, tutmadı. Fark kanallara dağıtılmadı, kanal kâr tablosunda ayrı bir satır olarak gösterildi ve muhasebe defterinin istenmesi önerildi.',
            en: 'The gap in the last row comes from entries made by hand in the books, and the documents behind them were not provided. The idea that the gap came from Wayfair deductions was tested and did not hold. The gap was not spread over the channels, it was shown as a separate line in the channel profit table and asking for the ledger detail was recommended.',
          },
        },
        {
          type: 'decisions',
          items: [
            {
              title: { tr: "Sage'de iki kez yazılmış 102 satır neden silinmedi", en: 'Why the 102 lines written twice in Sage were not deleted' },
              text: {
                tr: 'İlk bakışta silinmesi gereken kopyalar gibi duruyorlardı. Ama yönetim hesaplarıyla karşılaştırıldığında iki yılın kanal toplamları ancak bu satırlar dahil edildiğinde tuttu, yani satırlar muhasebeye de iki kez girmişti. Satırlar işaretlenip bırakıldı ve finans ekibine sorulmak üzere loga yazıldı. Sezgiyle yapılan bir temizlik rakamları muhasebeden koparırdı.',
                en: 'At first glance they looked like copies to delete. But when compared with the management accounts, the channel totals of two years only matched with these lines included, so they had gone into the books twice as well. The lines were flagged, kept and written to the log to ask the finance team. A clean-up by instinct would have pulled the figures away from the accounts.',
              },
            },
            {
              title: { tr: 'Web gelirinde neden Shopify esas alındı', en: 'Why web revenue was taken from Shopify' },
              text: {
                tr: "Eski sistemdeki haftalık özet faturalar ay sınırlarında kayıyordu ve yönetim hesaplarından bir yıl 25 bin £ farklı çıktı. Shopify'dan sipariş sipariş kurulan gelir ise her yıl birkaç sterlin içinde tuttu. Yönetim hesaplarının web gelirini Shopify'dan aldığı böylece anlaşıldı.",
                en: 'The weekly summary invoices in the old system slipped across month ends and were £25k away from the management accounts in one year. Revenue rebuilt order by order from Shopify matched within a few pounds every year. This showed that the management accounts took web revenue from Shopify.',
              },
            },
            {
              title: { tr: 'Veritabanı neden her seferinde sıfırdan kuruluyor', en: 'Why the database is rebuilt from scratch every time' },
              text: {
                tr: 'Aylık güncellemenin yeni dosyaları aynı klasörlere bırakıp tek komutu yeniden çalıştırmaktan ibaret kalması istendi. Birkaç dakika süren bir çalıştırmada eski bir çalıştırmadan kalan bozuk bir durum sonuçlara karışamaz.',
                en: 'The monthly refresh was meant to be nothing more than dropping the new files into the same folders and running the single command again. In a run that takes a few minutes, no broken state from an earlier run can leak into the results.',
              },
            },
          ],
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 3 · teslim', en: 'Table 3 · delivered' },
          title: { tr: 'Veri kalitesi logunun tamamı', en: 'The whole data quality log' },
          blocks: [
            {
              type: 'sheet',
              csv: 'data-quality-log',
              name: { tr: 'HF_02_Data_Quality_Log.xlsx', en: 'HF_02_Data_Quality_Log.xlsx' },
              tabs: { tr: ['Veri kalitesi logu'], en: ['Data quality log'] },
              cell: 'C47',
              numbers: ['D', 'F'],
              notes: [
                {
                  tr: "Birleştirme sırasında bulunan her sorun, etkilediği satır sayısı, mümkünse sterlin etkisi ve nasıl ele alındığıyla. Seçili hücre, kapanmayan 533 bin £'lık farkın kaydı. Kişi adları ve bir kişiye işaret eden bir açıklama değiştirildi.",
                  en: 'Every issue found during consolidation, with the number of rows it affected, its effect in pounds where possible and how it was treated. The selected cell is the entry for the £533k gap that does not close. Person names and one wording that pointed to a person were changed.',
                },
              ],
            },
          ],
        },
        {
          type: 'note',
          label: { tr: 'Yakalanan hata', en: 'Error caught' },
          text: {
            tr: "Maliyet modeli Nisan ile Haziran 2025 arasındaki üç aylık veriyle kalibre edildiğinde ürün marjı bir anda %50'ye çıktı. Sebebi Haziran alışlarının çok düşük olmasıydı, yarım bir yılın alışları tüketimi temsil etmiyordu. Kısmi yıllarda son tam yılın katsayısı kullanıldı, aradaki fark ayrı bir satırda gösterildi.",
            en: 'When the cost model was calibrated with the three months of data from April to June 2025, product margin suddenly jumped to 50%. June purchases were very low, and the purchases of a partial year did not reflect consumption. For partial years the factor of the last full year was used and the difference was shown on a separate line.',
          },
        },
      ],
    },
    {
      id: 'bridge',
      label: { tr: 'Kârın dökümü', en: 'Profit breakdown' },
      title: { tr: 'İki mali yıl arasında', en: 'Between two financial years' },
      lede: {
        tr: 'Hacim ve fiyat artışları kâra 2,4 milyon sterlin ekledi. Meşe, AB gümrüğü, yeni pazar yerleri ve genel giderler bunun büyük kısmını geri aldı.',
        en: 'Volume and price increases added 2.4 million pounds to profit. Oak, EU customs, the new marketplaces and overheads took most of it back.',
      },
      blocks: [
        {
          type: 'calc',
          label: { tr: 'Hesap 1', en: 'Calculation 1' },
          title: { tr: 'Bir mali yılın kârından ötekine', en: 'From one financial year’s profit to the next' },
          reading: {
            tr: "Mart 2024 ve Mart 2025'te kapanan iki mali yıl. Kalemler gruplanmış, ayrıntısı teslim edilen kâr analizinde.",
            en: 'The two financial years ending March 2024 and March 2025. Items are grouped, the detail is in the delivered profit analysis.',
          },
          steps: [
            { label: { tr: "Mart 2024'te kapanan yılın kârı", en: 'Profit, year to March 2024' }, value: { tr: '1.439 bin £', en: '£1,439k' } },
            { op: '+', label: { tr: 'Satış hacmi, mevcut kanallar', en: 'Sales volume, existing channels' }, detail: { tr: "Her kanalın Mart 2024'te kapanan yıldaki kâr oranıyla", en: 'At each channel’s profit rate in the year to March 2024' }, value: { tr: '1.586 bin £', en: '£1,586k' } },
            { op: '+', label: { tr: 'Liste fiyatı artışları', en: 'List price increases' }, detail: { tr: 'Eylül 2024 ve Ocak 2025 listeleri', en: 'The September 2024 and January 2025 lists' }, value: { tr: '827 bin £', en: '£827k' } },
            { op: '+', label: { tr: 'Sabit üretim giderinin daha çok ürüne yayılması', en: 'Fixed production cost spread over more units' }, value: { tr: '388 bin £', en: '£388k' } },
            { op: '+', label: { tr: 'Kumaş fiyatı ve malzeme verimi', en: 'Fabric price and material yield' }, detail: { tr: 'Kadife tasarrufu dahil', en: 'Including the velvet saving' }, value: { tr: '317 bin £', en: '£317k' } },
            { op: '−', label: { tr: 'AB gümrüğü ve ithalat vergisi', en: 'EU customs and import VAT' }, value: { tr: '582 bin £', en: '£582k' } },
            { op: '−', label: { tr: 'Meşe fiyatı', en: 'Oak price' }, value: { tr: '564 bin £', en: '£564k' } },
            { op: '−', label: { tr: 'Genel giderler', en: 'Overheads' }, value: { tr: '540 bin £', en: '£540k' } },
            { op: '−', label: { tr: 'Yeni pazar yerleri', en: 'New marketplaces' }, detail: { tr: 'Amazon Almanya ve ABD, Wayfair ABD', en: 'Amazon Germany and US, Wayfair US' }, value: { tr: '450 bin £', en: '£450k' } },
            { op: '−', label: { tr: 'İade, garanti ve yeniden üretim', en: 'Returns, warranty and remakes' }, value: { tr: '336 bin £', en: '£336k' } },
            { op: '−', label: { tr: 'İskonto ve bölgesel primler', en: 'Discounts and regional rebates' }, value: { tr: '153 bin £', en: '£153k' } },
            { op: '−', label: { tr: 'Diğer kalemler', en: 'Other items' }, detail: { tr: 'Taşıma fiyatı, komisyonlar, belgesiz kayıtlar ve küçük kalemler', en: 'Freight rates, commissions, undocumented entries and small items' }, value: { tr: '262 bin £', en: '£262k' } },
            { op: '=', label: { tr: "Mart 2025'te kapanan yılın kârı", en: 'Profit, year to March 2025' }, value: { tr: '1.670 bin £', en: '£1,670k' } },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Dökümün olumsuz kalemlerinin çoğu tek tek bakıldığında makul görünen beş karara dayanıyordu. Bu kararlar Kasım 2023 ile Mayıs 2024 arasında alınmıştı ve hiçbiri uçtan uca maliyetlendirilmemişti. Her kararın etkisi, karar hiç alınmasaydı ne olacağıyla karşılaştırılarak ayrıca hesaplandı. Döküm iki yılı karşılaştırdığı için aşağıdaki tutarlar yukarıdaki kalemlerle birebir aynı değildir, örneğin AB gümrüğü dökümde 582, kararın maliyeti olarak 712 bin sterlin.',
            en: 'Most of the negative items in the breakdown went back to five decisions that each looked reasonable on its own. They were taken between November 2023 and May 2024 and none had been costed end to end. The effect of each decision was calculated separately, against what would have happened without it. The breakdown compares two years, so the amounts below are not the same as the items above, for example EU customs is 582 in the breakdown and 712 thousand pounds as the cost of the decision.',
          },
        },
        {
          type: 'chart',
          direction: 'horizontal',
          label: { tr: 'Şekil 2', en: 'Figure 2' },
          title: { tr: "Beş kararın Mart 2025'te kapanan yıldaki maliyeti, bin sterlin", en: 'What five decisions cost in the year to March 2025, thousand pounds' },
          reading: {
            tr: 'Toplam 2.090 bin sterlin, o yılın kârından fazla. En büyüğü AB müşterilerinin teslim şartının değiştirilmesi.',
            en: 'In total 2,090 thousand pounds, more than that year’s profit. The largest is the change in delivery terms for EU customers.',
          },
          unit: 'count',
          decimals: 0,
          max: 800,
          ticks: [0, 200, 400, 600, 800],
          bars: [
            { label: { tr: 'AB müşterileri gümrüklü teslime geçirildi', en: 'EU customers moved to duty paid delivery' }, value: 712, highlight: true },
            { label: { tr: 'Amazon Almanya, ABD ve Wayfair ABD açıldı', en: 'Amazon Germany, US and Wayfair US launched' }, value: 493 },
            { label: { tr: "Fiyat artışı Nisan'dan Eylül'e ertelendi", en: 'Price increase held from April to September' }, value: 414 },
            { label: { tr: 'Bir bölgede onaysız iskonto ve prim', en: 'Unapproved discounts and rebates in one region' }, value: 293 },
            { label: { tr: 'Kadife tedarikçisi değiştirildi', en: 'Velvet supplier changed' }, value: 179 },
          ],
          blocks: [
            {
              type: 'details',
              meta: { tr: 'Şekil 2 · veri', en: 'Figure 2 · data' },
              title: { tr: 'Kararlar, tarihleri ve kanıtları', en: 'The decisions, their dates and evidence' },
              blocks: [
                {
                  type: 'table',
                  head: [
                    { tr: 'Karar', en: 'Decision' },
                    { tr: 'Tarih', en: 'Date' },
                    { tr: 'Maliyet', en: 'Cost' },
                    { tr: 'Kanıt', en: 'Evidence' },
                  ],
                  rows: [
                    [{ tr: 'AB müşterileri gümrüklü teslime geçirildi', en: 'EU customers moved to duty paid delivery' }, { tr: 'Şubat 2024', en: 'February 2024' }, { tr: '712 bin £', en: '£712k' }, { tr: 'Gümrük ekstresinin dipnotu, ithalat vergisi satırları', en: 'Footnote of the customs statement, import VAT lines' }],
                    [{ tr: 'Üç yeni pazar yeri açıldı', en: 'Three new marketplaces launched' }, { tr: 'Mart ve Mayıs 2024', en: 'March and May 2024' }, { tr: '493 bin £', en: '£493k' }, { tr: 'Sipariş bazında kurulan kâr', en: 'Profit rebuilt order by order' }],
                    [{ tr: 'Fiyat artışı ertelendi', en: 'Price increase held' }, { tr: 'Şubat 2024', en: 'February 2024' }, { tr: '414 bin £', en: '£414k' }, { tr: 'Faturaların hangi fiyat listesinden kesildiği', en: 'Which price list each invoice line was priced from' }],
                    [{ tr: 'Onaysız iskonto ve prim', en: 'Unapproved discounts and rebates' }, { tr: 'Kasım 2023', en: 'November 2023' }, { tr: '293 bin £', en: '£293k' }, { tr: 'İskonto matrisiyle karşılaştırma, pazarlama kodlu kredi notları', en: 'Comparison with the discount matrix, credit notes coded to marketing' }],
                    [{ tr: 'Kadife tedarikçisi değiştirildi', en: 'Velvet supplier changed' }, { tr: 'Mart 2024', en: 'March 2024' }, { tr: '179 bin £', en: '£179k' }, { tr: 'Tedarikçi teknik föyleri, şikayet ve yeniden üretim kayıtları', en: 'Supplier data sheets, complaint and remake records' }],
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'channels',
      label: { tr: 'Kanallar', en: 'Channels' },
      title: { tr: 'Para nerede kazanılıyor', en: 'Where the money is made' },
      lede: {
        tr: 'Şirketin çekirdek kanalları büyüdü ve katkısını artırdı. Üç yeni pazar yeri ve AB ihracatı ise her siparişte para kaybediyordu.',
        en: 'The company’s core channels grew and increased their contribution. Three new marketplaces and EU export were losing money on every order.',
      },
      blocks: [
        {
          type: 'paragraph',
          text: {
            tr: "Kanal katkısı, net gelirden ürün maliyeti, taşıma, ABD deposu, gümrük, pazar yeri komisyonu, reklam ve garanti düşüldükten sonra kalan tutar. Genel giderler, pazarlama ve belgesiz kayıtlar hiçbir kanala ait olmadığı için burada yok. Mali yıl Nisan'da başlar, 2024-25 Mart 2025'te kapanan yıldır.",
            en: 'Channel contribution is what remains of net revenue after product cost, freight, the US warehouse, customs, marketplace commission, advertising and warranty. Overheads, marketing and undocumented entries belong to no channel and are left out here. The financial year starts in April, 2024-25 is the year to March 2025.',
          },
        },
        {
          type: 'table',
          head: [
            { tr: 'Kanal', en: 'Channel' },
            { tr: 'Katkı, 2023-24', en: 'Contribution, 2023-24' },
            { tr: 'Katkı, 2024-25', en: 'Contribution, 2024-25' },
            { tr: 'Katkı oranı, 2024-25', en: 'Contribution rate, 2024-25' },
          ],
          rows: [
            [{ tr: 'İngiltere mağazaları', en: 'UK stockists' }, { tr: '1.908 bin £', en: '£1,908k' }, { tr: '2.321 bin £', en: '£2,321k' }, { tr: '%29,8', en: '29.8%' }],
            [{ tr: 'Büyük zincirler', en: 'Key accounts' }, { tr: '764 bin £', en: '£764k' }, { tr: '1.126 bin £', en: '£1,126k' }, { tr: '%24,5', en: '24.5%' }],
            [{ tr: 'Proje müşterileri', en: 'Contract customers' }, { tr: '126 bin £', en: '£126k' }, { tr: '250 bin £', en: '£250k' }, { tr: '%21,9', en: '21.9%' }],
            [{ tr: 'AB dışı ihracat', en: 'Export outside the EU' }, { tr: '500 bin £', en: '£500k' }, { tr: '737 bin £', en: '£737k' }, { tr: '%36,1', en: '36.1%' }],
            [{ tr: 'Web sitesi', en: 'Website' }, { tr: '1.699 bin £', en: '£1,699k' }, { tr: '2.128 bin £', en: '£2,128k' }, { tr: '%51,4', en: '51.4%' }],
            [{ tr: 'Amazon İngiltere', en: 'Amazon UK' }, { tr: '256 bin £', en: '£256k' }, { tr: '314 bin £', en: '£314k' }, { tr: '%23,8', en: '23.8%' }],
            [{ tr: 'Wayfair İngiltere', en: 'Wayfair UK' }, { tr: '224 bin £', en: '£224k' }, { tr: '314 bin £', en: '£314k' }, { tr: '%31,8', en: '31.8%' }],
            [{ tr: 'AB ihracatı', en: 'EU export' }, { tr: '248 bin £', en: '£248k' }, { tr: '−90 bin £', en: '−£90k' }, { tr: '−%3,2', en: '−3.2%' }],
            [{ tr: 'Amazon Almanya', en: 'Amazon Germany' }, { tr: '−1 bin £', en: '−£1k' }, { tr: '−241 bin £', en: '−£241k' }, { tr: '−%22,5', en: '−22.5%' }],
            [{ tr: 'Amazon ABD', en: 'Amazon US' }, { tr: '−39 bin £', en: '−£39k' }, { tr: '−206 bin £', en: '−£206k' }, { tr: '−%17,4', en: '−17.4%' }],
            [{ tr: 'Wayfair ABD', en: 'Wayfair US' }, { tr: '−3 bin £', en: '−£3k' }, { tr: '−46 bin £', en: '−£46k' }, { tr: '−%10,7', en: '−10.7%' }],
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "Amazon Almanya ve ABD Mart 2024'te, Wayfair ABD Mayıs 2024'te açıldı, 2023-24 yılında neredeyse hiç satışları yoktu. AB ihracatının satışları %67 artarken katkısı zarara döndü, nedeni bir sonraki bölümde. Pazar yerleri sipariş sipariş kurulduğu için bir siparişin ekonomisi de görülebildi.",
            en: 'Amazon Germany and US launched in March 2024 and Wayfair US in May 2024, so they had almost no sales in 2023-24. EU export sales grew 67% while its contribution turned into a loss, the reason is in the next chapter. Because the marketplaces were rebuilt order by order, the economics of a single order could be seen too.',
          },
        },
        {
          type: 'calc',
          label: { tr: 'Hesap 2', en: 'Calculation 2' },
          title: { tr: 'Ortalama bir Amazon Almanya siparişi', en: 'An average Amazon Germany order' },
          reading: {
            tr: "Mart 2025'te kapanan yılın 1.038 siparişinin ortalaması.",
            en: 'Average of 1,038 orders in the year to March 2025.',
          },
          steps: [
            { label: { tr: 'Net gelir', en: 'Net revenue' }, detail: { tr: 'Alman satış vergisi düşülmüş', en: 'German VAT taken out' }, value: { tr: '1.031,87 £', en: '£1,031.87' } },
            { op: '−', label: { tr: 'Ürün maliyeti', en: 'Product cost' }, detail: { tr: 'Yeniden üretim dahil', en: 'Including remakes' }, value: { tr: '394,85 £', en: '£394.85' } },
            { op: '−', label: { tr: 'Taşıma ve iade toplama', en: 'Freight and return collection' }, detail: { tr: "Almanya'da iki kişilik ev teslimatı", en: 'Two-person home delivery in Germany' }, value: { tr: '280,04 £', en: '£280.04' } },
            { op: '−', label: { tr: 'İthalat vergisi ve gümrük işlemi', en: 'Import VAT and customs clearance' }, value: { tr: '238,59 £', en: '£238.59' } },
            { op: '−', label: { tr: 'Komisyon ve reklam', en: 'Commission and advertising' }, detail: { tr: '%15 komisyon', en: '15% commission' }, value: { tr: '348,54 £', en: '£348.54' } },
            { op: '−', label: { tr: 'Garanti', en: 'Warranty' }, value: { tr: '1,85 £', en: '£1.85' } },
            { op: '=', label: { tr: 'Sipariş başına katkı', en: 'Contribution per order' }, value: { tr: '−232,00 £', en: '−£232.00' } },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "E-ticaret müdürünün baktığı satıcı panelindeki rakamlar kendi içinde doğruydu, ama taşıma, iade, gümrük ve ABD deposu maliyetlerinin hiçbiri o panelde görünmüyordu. ABD'de konteyner, depo ve son teslimat bir siparişe ortalama 546 £ tutuyordu. Amazon İngiltere ve Wayfair İngiltere ise kârlıydı.",
            en: 'The figures on the seller dashboard the e-commerce manager watched were right as far as they went, but none of the freight, returns, customs or US warehouse costs appeared there. In the US the container, the warehouse and the last mile cost about £546 per order. Amazon UK and Wayfair UK, on the other hand, were profitable.',
          },
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 4 · teslim', en: 'Table 4 · delivered' },
          title: { tr: 'Altı platformda sipariş başına ekonomi', en: 'Economics per order on six platforms' },
          blocks: [
            {
              type: 'sheet',
              csv: 'order-economics',
              name: { tr: 'HF_03_Margin_Analysis.xlsx', en: 'HF_03_Margin_Analysis.xlsx' },
              tabs: { tr: ['Sipariş ekonomisi'], en: ['Order economics FY25'] },
              cell: 'I4',
              numbers: ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
              notes: [
                {
                  tr: "Teslim edilen kâr analizi dosyasının sipariş ekonomisi sayfasından, sipariş başına sütunlar. Tutarlar sterlin, Mart 2025'te kapanan yıl.",
                  en: 'From the order economics sheet of the delivered profit analysis file, the per order columns. Amounts in pounds, year to March 2025.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'decisions',
      label: { tr: 'Kararların maliyeti', en: 'Cost of the decisions' },
      title: { tr: 'Gümrük, fiyat ve iskonto', en: 'Customs, pricing and discounts' },
      lede: {
        tr: 'Her karar tek başına makul görünüyordu ama hiçbiri uçtan uca maliyetlendirilmemişti. En büyüğü, AB müşterilerinin teslim şartı değişikliği, tek bir gümrük ekstresinin dipnotunda saklıydı.',
        en: 'Each decision looked reasonable on its own, but none had been costed end to end. The largest, the change in delivery terms for EU customers, was hidden in the footnote of a customs statement.',
      },
      blocks: [
        {
          type: 'paragraph',
          text: {
            tr: "Şubat 2024'ten itibaren AB ve İrlanda'daki mağazalara fiyat değişmeden gümrüklü teslim yapılmaya başlandı. Gümrük vergisini ve ithalat vergisini artık şirket ödüyordu, Rotterdam'daki gümrük temsilcisi bunları şirket adına yatırıyordu. Finans direktörü ithalat vergisinin bir şekilde geri geldiğini varsayıp tutarı taşıma gideri olarak kaydediyordu. Temsilcinin her aylık ekstresinin en altında küçük bir not vardı.",
            en: 'From February 2024 the stores in the EU and Ireland were moved to duty paid delivery at unchanged prices. The company now paid the duty and the import VAT, and the customs agent in Rotterdam paid them on its behalf. The finance director assumed the VAT somehow came back and booked the amount as freight. At the bottom of every monthly statement from the agent there was a small note.',
          },
        },
        {
          type: 'note',
          label: { tr: 'Gümrük ekstresinin dipnotu', en: 'Footnote of the customs statement' },
          text: {
            tr: "Sizin adınıza ödenen ithalat vergisi yalnızca ithalatçının AB'de vergi kaydı varsa geri alınabilir. Şirketin AB'de vergi kaydı yoktu.",
            en: 'Import VAT paid on your behalf is recoverable only via EU VAT registration of the importer of record. The company had no EU VAT registration.',
          },
        },
        {
          type: 'calc',
          label: { tr: 'Hesap 3', en: 'Calculation 3' },
          title: { tr: 'AB mağazalarına satışların gümrük maliyeti', en: 'Customs cost of sales to EU stores' },
          reading: {
            tr: "Mart 2025'te kapanan yıl, 559 gümrük beyanı.",
            en: 'Year to March 2025, 559 customs entries.',
          },
          steps: [
            { label: { tr: 'Geri alınamayan ithalat vergisi', en: 'Import VAT that cannot be recovered' }, value: { tr: '655 bin £', en: '£655k' } },
            { op: '+', label: { tr: 'Gümrük vergisi', en: 'Duty' }, detail: { tr: '148 beyanda menşe beyanı eksik sayıldı', en: 'Origin statement treated as missing on 148 entries' }, value: { tr: '27 bin £', en: '£27k' } },
            { op: '+', label: { tr: 'Gümrük işlem ücreti', en: 'Clearance fees' }, value: { tr: '30 bin £', en: '£30k' } },
            { op: '=', label: { tr: 'Toplam', en: 'Total' }, value: { tr: '712 bin £', en: '£712k' } },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "Gümrük vergisi aslında hiç ödenmemeliydi. İngiltere ile AB arasındaki anlaşmaya göre İngiltere'de üretilen mobilya AB'ye vergisiz girer ve şirketin ticari faturalarında menşe beyanı vardı, bu tutar geri istenebilir. Amazon Almanya'da durum daha da ilginçti. Amazon her satışın Alman satış vergisini zaten kesip ödüyordu, temsilci ise ürün Almanya'ya girerken ithalat vergisini bir kez daha ödüyordu. Aynı kanepe için vergi iki kez ödeniyordu, bir yılda 224 bin £. Vergi işin kapsamı dışında olduğu için çözüm yolunun şirketin vergi danışmanıyla teyit edilmesi önerildi.",
            en: 'The duty should never have been paid. Under the agreement between the UK and the EU, furniture made in the UK enters the EU duty free, and the company’s commercial invoices carried the origin statement, so this amount can be claimed back. Amazon Germany was more curious still. Amazon already collected and paid the German VAT on every sale, while the agent paid import VAT once more as the goods entered Germany. VAT was paid twice on the same sofa, £224k in a year. Tax was outside the scope of the work, so confirming the route with the company’s tax adviser was recommended.',
          },
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 5 · ham veri', en: 'Table 5 · raw data' },
          title: { tr: 'Bir aylık gümrük ekstresi', en: 'One month of the customs statement' },
          blocks: [
            {
              type: 'sheet',
              csv: 'clearpath-statement',
              name: { tr: 'ClearPath statement 2025-02.xlsx', en: 'ClearPath statement 2025-02.xlsx' },
              tabs: { tr: ['Ekstre'], en: ['Statement'] },
              cell: 'L9',
              numbers: ['F', 'G', 'H', 'I', 'J', 'K'],
              rows: 226,
              notes: [
                {
                  tr: 'Şubat 2025 ekstresinin 226 satırından 16 satır. Amazon Almanya siparişlerinin alıcısı özel müşteriler, adları yerine Özel müşteri yazıldı. Menşe beyanı sütununda eksik yazan beş satırda gümrük vergisi ödenmiş.',
                  en: '16 of the 226 lines on the February 2025 statement. The consignees of Amazon Germany orders are private customers, Private customer was written instead of their names. On the five lines marked missing in the origin statement column, duty was paid.',
                },
                {
                  tr: "Ekstrenin en altındaki not: Import VAT paid on your behalf is recoverable only via EU VAT registration of the importer of record.",
                  en: 'The note at the bottom of the statement: Import VAT paid on your behalf is recoverable only via EU VAT registration of the importer of record.',
                },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "Bütçe 1 Nisan 2024'te %6'lık bir fiyat artışı varsayıyordu. Artış, mağazaların bahar broşürleri ve fuarlar bozulmasın diye Eylül'e ertelendi. Faturaların hangi fiyat listesinden kesildiği satır satır kontrol edildi: 1 Nisan'dan sonra eski listeden kesilen 5.163 fatura satırı ve aynı gecikmeyi yaşayan web sitesi, yeni listeyle 414 bin £ daha fazla gelir getirecekti. Erteleme en kötü zamana denk geldi, çünkü meşe tedarikçisi Ocak'ta %25, Temmuz'da %8 daha zam yapmıştı.",
            en: 'The budget assumed a 6% price increase on 1 April 2024. The increase was held to September so that stores’ spring brochures and the trade shows would not be disturbed. Which price list each invoice was priced from was checked line by line: the 5,163 invoice lines priced off the old list after 1 April, together with the website, which had the same delay, would have brought £414k more revenue at the new list. The delay came at the worst time, because the oak supplier had raised prices by 25% in January and by another 8% in July.',
          },
        },
        {
          type: 'line',
          label: { tr: 'Şekil 3', en: 'Figure 3' },
          title: { tr: 'Meşenin m³ başına ortalama alış fiyatı, üç aylık, sterlin', en: 'Average purchase price of oak per m³, by quarter, pounds' },
          reading: {
            tr: "Fiyat Ocak 2024'te başlayan çeyrekte 924 £'dan 1.131 £'a çıktı, Temmuz'da bir kez daha arttı. Bu artış yılın hacminde 564 bin £ maliyet yarattı.",
            en: 'The price rose from £924 to £1,131 in the quarter starting January 2024 and rose again in July. On the year’s volumes this cost £564k.',
          },
          unit: 'count',
          decimals: 0,
          max: 1400,
          ticks: [0, 350, 700, 1050, 1400],
          points: [{ tr: 'Tem 23', en: 'Jul 23' }, { tr: 'Eki 23', en: 'Oct 23' }, { tr: 'Oca 24', en: 'Jan 24' }, { tr: 'Nis 24', en: 'Apr 24' }, { tr: 'Tem 24', en: 'Jul 24' }, { tr: 'Eki 24', en: 'Oct 24' }, { tr: 'Oca 25', en: 'Jan 25' }, { tr: 'Nis 25', en: 'Apr 25' }],
          series: [{ label: { tr: 'Meşe', en: 'Oak' }, values: [911, 924, 1131, 1129, 1220, 1190, 1223, 1227], highlight: true }],
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Bir bölgedeki 16 mağaza, onaylı iskonto matrisinin 5 ile 6 puan üstünde fatura iskontosu alıyordu. Ayrıca her çeyrek pazarlama desteği adıyla bir prim alıyorlardı. Primler pazarlama gideri olarak kaydedildiği için hiçbir kâr raporunda görünmüyordu ve imzalı bir anlaşmaları yoktu. Bir yılda fazladan iskonto 104 bin £, primler 189 bin £ tuttu. Kanal kâr tablosunda primler gelirden indirim olarak yeniden sınıflandırıldı.',
            en: 'Sixteen stores in one region received invoice discounts 5 to 6 points above the approved discount matrix. Every quarter they also received a rebate under the name of marketing support. The rebates were booked as marketing expense, so they appeared in no profit report, and there were no signed agreements behind them. In one year the extra discount came to £104k and the rebates to £189k. In the channel profit table the rebates were reclassified as a deduction from revenue.',
          },
        },
        {
          type: 'paragraph',
          text: {
            tr: 'Satış direktörü kârın fabrikada, yeniden üretimlerde ve fazla mesaide kaybolduğunu düşünüyordu. Fazla mesai ve ajans işçiliği gerçekten çok artmıştı, ama veri başka bir şey gösterdi.',
            en: 'The sales director believed the profit was lost in the factory, in remakes and overtime. Overtime and agency labour had indeed risen a lot, but the data showed something else.',
          },
        },
        {
          type: 'compare',
          rows: [
            { label: { tr: 'Fazla mesai primi', en: 'Overtime premium' }, before: { tr: '161 bin £', en: '£161k' }, lead: { tr: '326 bin £', en: '£326k' }, after: { tr: '', en: '' } },
            { label: { tr: 'Ajans işçiliği', en: 'Agency labour' }, before: { tr: '171 bin £', en: '£171k' }, lead: { tr: '768 bin £', en: '£768k' }, after: { tr: '', en: '' } },
            { label: { tr: 'Standart saat başına işçilik maliyeti', en: 'Labour cost per standard hour' }, before: { tr: '24,61 £', en: '£24.61' }, lead: { tr: '24,55 £', en: '£24.55' }, after: { tr: ', neredeyse aynı', en: ', almost unchanged' } },
            { label: { tr: 'Yeniden üretimin tükettiği saat', en: 'Hours used by remakes' }, before: { tr: '–', en: '–' }, lead: { tr: '3.610 saat', en: '3,610 hours' }, after: { tr: ', ek mesainin 40.286 saatine karşı', en: ', against 40,286 extra hours' } },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "Ek saatlerin büyük kısmı satılan adetteki %32'lik artıştan geliyordu. Fabrika büyümeyi pahalı saatlerle karşılamıştı, ama ürün başına verimsizleşmemişti.",
            en: 'Most of the extra hours came from the 32% rise in units sold. The factory had met the growth with expensive hours, but it had not become less efficient per unit.',
          },
        },
      ],
    },
    {
      id: 'velvet',
      label: { tr: 'Kadife', en: 'Velvet' },
      title: { tr: 'Ucuz kumaşın pahalı faturası', en: 'The expensive bill for a cheaper fabric' },
      lede: {
        tr: 'Kadife tedarikçisi metre fiyatı daha düşük olduğu için değiştirildi. Yeni kumaşın ilk topları üretime girdikten sonra kumaş kaynaklı şikayetler ayda üçten yüzün üstüne çıktı.',
        en: 'The velvet supplier was changed because its price per metre was lower. Once the first rolls of the new fabric went into production, fabric complaints rose from three a month to over a hundred.',
      },
      blocks: [
        {
          type: 'paragraph',
          text: {
            tr: "Mart 2024'te kadife, metresi 4,10 euro daha ucuz olduğu için eski tedarikçiden yenisine geçirildi. İki kumaşın teknik föyleri karşılaştırıldı. Eski kumaş 50.000 sürtünme dayanımındaydı ve ağır ev kullanımı ile otel projeleri için öneriliyordu. Yeni kumaş 25.000 dayanımındaydı ve föyünde ağır kullanım ile proje işleri için önerilmediği açıkça yazıyordu. Yeni kumaşın ilk topları Mayıs 2024'te üretime girdi.",
            en: 'In March 2024 velvet was moved from the old supplier to a new one because it was 4.10 euros a metre cheaper. The data sheets of the two fabrics were compared. The old fabric was rated at 50,000 rubs and recommended for heavy domestic use and hotel projects. The new fabric was rated at 25,000 and its data sheet said plainly that it was not recommended for heavy use or contract work. The first rolls of the new fabric went into production in May 2024.',
          },
        },
        {
          type: 'line',
          label: { tr: 'Şekil 4', en: 'Figure 4' },
          title: { tr: 'Bin ürün başına şikayet, üç aylık', en: 'Complaints per thousand units, by quarter' },
          reading: {
            tr: "Kadifede kumaş kaynaklı şikayetler bin ürün başına 3 civarındayken Nisan ile Haziran 2025 arasında 110'a çıktı. Bütün ürünlerde aynı dönemde 18'den 54'e çıktı.",
            en: 'Fabric complaints on velvet went from about 3 per thousand units to 110 between April and June 2025. Across all units they went from 18 to 54 over the same period.',
          },
          unit: 'count',
          decimals: 0,
          max: 120,
          ticks: [0, 30, 60, 90, 120],
          points: [{ tr: 'Tem 23', en: 'Jul 23' }, { tr: 'Eki 23', en: 'Oct 23' }, { tr: 'Oca 24', en: 'Jan 24' }, { tr: 'Nis 24', en: 'Apr 24' }, { tr: 'Tem 24', en: 'Jul 24' }, { tr: 'Eki 24', en: 'Oct 24' }, { tr: 'Oca 25', en: 'Jan 25' }, { tr: 'Nis 25', en: 'Apr 25' }],
          series: [
            { label: { tr: 'Kadife, kumaş kaynaklı', en: 'Velvet, fabric faults' }, values: [2.8, 3.4, 3.3, 9.9, 54.2, 66.7, 79.3, 109.5], highlight: true },
            { label: { tr: 'Bütün ürünler, bütün şikayetler', en: 'All units, all complaints' }, values: [17.6, 16.2, 17.7, 21.1, 35.7, 33.8, 41.5, 54.1] },
          ],
        },
        {
          type: 'calc',
          label: { tr: 'Hesap 4', en: 'Calculation 4' },
          title: { tr: 'Kadife değişikliğinin net etkisi', en: 'Net effect of the velvet change' },
          reading: {
            tr: "Mart 2025'te kapanan yıl, bir önceki yıla göre. Haziran 2025'e kadarki hızla yıllık kayıp 638 bin £.",
            en: 'Year to March 2025, against the year before. At the pace up to June 2025 the yearly loss is £638k.',
          },
          steps: [
            { label: { tr: 'Kumaş fiyatından tasarruf', en: 'Saving on fabric price' }, value: { tr: '259 bin £', en: '£259k' } },
            { op: '−', label: { tr: 'Dar top yüzünden fazla kumaş', en: 'Extra fabric from the narrower roll' }, detail: { tr: 'Kadifede kullanım %7 arttı', en: 'Velvet usage up 7%' }, value: { tr: '57 bin £', en: '£57k' } },
            { op: '−', label: { tr: 'Ek yeniden üretim', en: 'Extra remakes' }, value: { tr: '137 bin £', en: '£137k' } },
            { op: '−', label: { tr: 'Ek garanti iadeleri', en: 'Extra warranty credit notes' }, value: { tr: '63 bin £', en: '£63k' } },
            { op: '−', label: { tr: 'Ek tamir ziyaretleri', en: 'Extra repair visits' }, value: { tr: '83 bin £', en: '£83k' } },
            { op: '−', label: { tr: 'Ek garanti taşımaları', en: 'Extra warranty freight' }, value: { tr: '42 bin £', en: '£42k' } },
            { op: '−', label: { tr: 'Ek fire ve tekrar iş saatleri', en: 'Extra scrap and rework hours' }, value: { tr: '56 bin £', en: '£56k' } },
            { op: '=', label: { tr: 'Net etki', en: 'Net effect' }, value: { tr: '−179 bin £', en: '−£179k' } },
          ],
        },
        {
          type: 'details',
          meta: { tr: 'Tablo 6 · ham veri', en: 'Table 6 · raw data' },
          title: { tr: 'Operasyon müdürünün ürün ağacı sayfası', en: 'The operations manager’s bill of materials sheet' },
          blocks: [
            {
              type: 'sheet',
              csv: 'bom-master',
              name: { tr: 'BOM master DR Nov24.xlsx', en: 'BOM master DR Nov24.xlsx' },
              tabs: { tr: ['Tipe göre ürün ağacı'], en: ['BOM by type'] },
              cell: 'F2',
              numbers: ['C', 'D', 'E', 'F', 'G', 'H', 'I'],
              notes: [
                {
                  tr: "Sayfanın tamamı, 21 ürün tipi. ERP'deki ürün ağacı güncellenmediği için operasyon müdürü gerçek tüketimi kendi tutuyordu. Kadifeli ürünlerde kumaş kullanımı %7 fazla, notlarda yeni kumaşın dar topu yazıyor. Meşe ürünlerinde de yeni meşe kalitesinin verimi düşük.",
                  en: 'The whole sheet, 21 product types. The ERP bill of materials had not been updated, so the operations manager kept actual usage in a separate sheet. Fabric usage is 7% higher on velvet items, and the notes mention the narrower roll of the new fabric. On oak items the yield of the new oak grade is lower too.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'result',
      label: { tr: 'Sonuç ve sınırlar', en: 'Result and limits' },
      title: { tr: 'Teslim edilenler ve öneriler', en: 'What was delivered and recommended' },
      lede: {
        tr: 'Altı haftalık incelemenin sonunda veritabanı, dört Excel dosyası, bulgu raporu, yönetim kurulu sunumu ve aylık bir gösterge paketi teslim edildi. Önerilen beş değişikliğin çoğu yatırım değil, bir politika değişikliği.',
        en: 'At the end of the six-week review the database, four Excel files, a findings report, a board presentation and a monthly indicator pack were delivered. Most of the five recommended changes are policy changes, not investments.',
      },
      blocks: [
        {
          type: 'timeline',
          periods: 7,
          periodLabel: { tr: 'H', en: 'W' },
          tasks: [
            { label: { tr: 'Veri talebi ve saha ziyareti', en: 'Data request and site visit' }, start: 1, length: 1, highlight: true },
            { label: { tr: 'Birleştirme ve mutabakat', en: 'Consolidation and reconciliation' }, start: 2, length: 2 },
            { label: { tr: 'Kâr analizi', en: 'Profit analysis' }, start: 4, length: 2 },
            { label: { tr: 'Yönetimle bulgu toplantısı', en: 'Findings workshop with management' }, start: 6, length: 1, highlight: true },
            { label: { tr: 'Rapor ve gösterge paketi', en: 'Report and indicator pack' }, start: 7, length: 1 },
          ],
          legend: { tr: 'Altın çubuklar şirketin yönetimiyle birlikte yapılan işler.', en: 'Gold bars are work done together with the company’s management.' },
        },
        {
          type: 'tree',
          label: { tr: 'Teslim edilen dosyalar', en: 'Delivered files' },
          groups: [
            {
              root: 'solution/',
              items: [
                { name: 'data/hf.sqlite', note: { tr: 'veritabanı, 56 tablo', en: 'database, 56 tables' }, highlight: true },
                { name: 'out/HF_01_Consolidated_Dataset.xlsx', note: { tr: 'veri ve eşleme kuralları', en: 'data and mapping rules' } },
                { name: 'out/HF_02_Data_Quality_Log.xlsx', note: { tr: '50 kayıtlık kalite logu', en: 'quality log, 50 entries' } },
                { name: 'out/HF_03_Margin_Analysis.xlsx', note: { tr: 'kâr dökümü ve analizler', en: 'profit breakdown and analyses' } },
                { name: 'out/HF_04_KPI_Pack.xlsx', note: { tr: '20 aylık gösterge', en: '20 monthly indicators' } },
                { name: 'out/HF_Findings_Report.html', note: { tr: 'bulgu raporu', en: 'findings report' } },
                { name: 'out/HF_Board_Presentation.html', note: { tr: 'yönetim kurulu sunumu', en: 'board presentation' } },
                { name: 'out/HF_KPI_Dashboard.html', note: { tr: 'gösterge panosu', en: 'indicator dashboard' } },
                { name: 'run.py', note: { tr: 'hepsini tek komutla yeniden üretir', en: 'rebuilds everything with one command' }, highlight: true },
              ],
            },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "Gösterge paketi her ay aynı veritabanından üretilebilecek şekilde kuruldu. Paket geriye doğru hesaplandığında, 2024'te var olsaydı kadife şikayetlerini, ithalat vergisini, matris dışı iskontoyu ve pazar yeri sipariş başı katkısını her karardan sonra iki ay içinde göstereceği görüldü. Örneğin bin kadife ürün başına şikayet 2023'te 1 ile 6 arasındayken Nisan 2025'te 116'ya çıkmıştı.",
            en: 'The indicator pack was built so that it can be produced from the same database every month. When it was calculated backwards, it turned out that had the pack existed in 2024 it would have shown velvet complaints, import VAT, off-matrix discounts and marketplace contribution per order within two months of each decision. For example, complaints per thousand velvet units were between 1 and 6 in 2023 and had reached 116 by April 2025.',
          },
        },
        {
          type: 'list',
          view: 'stack',
          title: { tr: 'Öneriler ve yıllık değerleri', en: 'Recommendations and their value a year' },
          items: [
            {
              title: { tr: 'Gümrüklü teslimin vergi yükünü kaldırmak.', en: 'Remove the tax burden of duty paid delivery.' },
              text: {
                tr: "Hollanda'da vergi kaydı açmak ya da gümrüksüz teslime dönmek, yersiz ödenen gümrük vergisini geri istemek. Yılda yaklaşık 682 bin £.",
                en: 'Register for VAT in the Netherlands or return to non duty paid delivery, and reclaim the duty paid in error. About £682k a year.',
              },
            },
            {
              title: { tr: 'Eski kadifeye dönmek.', en: 'Go back to the old velvet.' },
              text: { tr: 'Kanepe, berjer ve proje siparişlerinde eski tedarikçinin kumaşını kullanmak. Yılda yaklaşık 638 bin £.', en: 'Use the old supplier’s fabric for sofas, armchairs and contract orders. About £638k a year.' },
            },
            {
              title: { tr: 'Yeni pazar yerlerinde ağır ürünleri durdurmak.', en: 'Stop heavy items on the new marketplaces.' },
              text: { tr: "Amazon Almanya, ABD ve Wayfair ABD'de kanepe ve gardırop gibi ağır ürünlerin satışını durdurmak. Yılda yaklaşık 493 bin £.", en: 'Stop selling heavy items such as sofas and wardrobes on Amazon Germany, US and Wayfair US. About £493k a year.' },
            },
            {
              title: { tr: 'Fiyatı her yıl aynı gün değiştirmek.', en: 'Change prices on the same day every year.' },
              text: { tr: "Fiyatları her yıl 1 Nisan'da, maliyet endeksine bağlı olarak değiştirmek. Yılda yaklaşık 414 bin £.", en: 'Change prices every 1 April, tied to a cost index. About £414k a year.' },
            },
            {
              title: { tr: 'Onaysız iskontoları bitirmek.', en: 'End unapproved discounts.' },
              text: { tr: "İskonto matrisini ERP'de zorunlu yapmak, imzalı anlaşması olmayan primleri durdurmak. Yılda yaklaşık 292 bin £.", en: 'Enforce the discount matrix in the ERP and stop rebates without a signed agreement. About £292k a year.' },
            },
          ],
        },
        {
          type: 'paragraph',
          text: {
            tr: "Değerler birbirini iki kez saymayacak şekilde ayrıldı, toplamı yılda yaklaşık 2,5 milyon sterlin. Bunlara ek olarak aylık kanal kâr tablosu, ERP'de üç ayda bir maliyet güncellemesi, ay sonu stok düzeltmesi ve her taşıma kaydında zorunlu sipariş referansı önerildi.",
            en: 'The values were separated so that none is counted twice, in total about 2.5 million pounds a year. On top of these a monthly channel profit table, a cost update in the ERP every three months, a month-end stock adjustment and a mandatory order reference on every freight record were recommended.',
          },
        },
        {
          type: 'list',
          view: 'stack',
          title: { tr: 'Yol boyunca ortaya çıkanlar', en: 'What came to light along the way' },
          items: [
            {
              title: { tr: 'Vergisiz girmesi gereken mallara gümrük vergisi ödendi.', en: 'Duty was paid on goods that should have entered duty free.' },
              text: {
                tr: "İngiltere ile AB arasındaki anlaşmaya göre İngiltere'de üretilen mobilya AB'ye vergisiz girer ve şirketin ticari faturalarında menşe beyanı vardı. Buna rağmen Mart 2025'te kapanan yılda 148 beyanda menşe beyanı eksik sayıldı ve 27 bin £ gümrük vergisi ödendi.",
                en: 'Under the agreement between the UK and the EU, furniture made in the UK enters the EU duty free, and the company’s commercial invoices carried the origin statement. Even so, in the year to March 2025 the origin statement was treated as missing on 148 entries and £27k of duty was paid.',
              },
            },
            {
              title: { tr: 'Aynı kanepe için vergi iki kez ödendi.', en: 'Tax was paid twice on the same sofa.' },
              text: {
                tr: "Amazon Almanya'da satış vergisini Amazon kesip ödüyordu, gümrük temsilcisi ise ürün Almanya'ya girerken ithalat vergisini ayrıca ödüyordu. Bir yılda 224 bin £.",
                en: 'On Amazon Germany, Amazon collected and paid the sales VAT, while the customs agent paid import VAT separately as the goods entered Germany. £224k in a year.',
              },
            },
            {
              title: { tr: 'Bir kanepe kodu karyolaya eşlenmişti.', en: 'A sofa code was mapped to a bed.' },
              text: {
                tr: "ERP'deki eşleme tablosunun 9 satırı eski kodu başka bir koleksiyonun başka bir ürününe bağlıyordu. Örneğin bir ikili kanepenin eski kodu bir çift kişilik karyolaya eşlenmişti.",
                en: 'Nine rows of the mapping table in the ERP linked an old code to a different product of a different collection. For example, the old code of a two-seater sofa was mapped to a double bed frame.',
              },
            },
            {
              title: { tr: 'İki kez yazılmış satırlar muhasebeye de iki kez girmişti.', en: 'Lines written twice had gone into the books twice as well.' },
              text: {
                tr: "Eski ERP'nin dışa aktarımında aynı faturada birebir tekrar eden 102 satır, yaklaşık 94 bin £ vardı. Yönetim hesapları ancak bu satırlarla tutuyordu.",
                en: 'The old ERP export had 102 lines repeated exactly within the same invoice, about £94k. The management accounts only matched with these lines included.',
              },
            },
            {
              title: { tr: 'Kur tablosunda bir ayın euro kuru yanlış yazılmıştı.', en: 'One month’s euro rate was mistyped in the rate sheet.' },
              text: {
                tr: 'Finans ekibinin aylık kur dosyasında Kasım 2023 için euro kuru 1,15 yerine 1,70 yazılmıştı. Değer, komşu aylarla karşılaştıran bir kontrolle yakalandı.',
                en: 'In the finance team’s monthly rate file the euro rate for November 2023 was typed as 1.70 instead of 1.15. The value was caught by a check that compares it with the neighbouring months.',
              },
            },
            {
              title: { tr: 'Aynı konteyner iki kez faturalanmış olabilir.', en: 'The same container may have been invoiced twice.' },
              text: {
                tr: "ABD'ye giden konteynerlerin faturalarında aynı referans iki ayrı iş numarasıyla geçiyordu, yaklaşık 8 bin £. Tutar düşülmedi, depo müdürüne sorulmak üzere işaretlendi.",
                en: 'In the invoices for containers to the US the same reference appeared under two job numbers, about £8k. The amount was not deducted, it was flagged to ask the warehouse manager.',
              },
            },
          ],
        },
        {
          type: 'list',
          view: 'stack',
          title: { tr: 'Bilinen sınırlar', en: 'Known limits' },
          items: [
            {
              title: { tr: 'Muhasebe defteri verilmedi.', en: 'The ledger was not provided.' },
              text: { tr: 'Defter ve stok hareketi kayıtları olmadan ürün seviyesindeki kâr, kanal toplamlarından daha belirsizdir.', en: 'Without the ledger and stock movement records, profit at item level is less certain than the channel totals.' },
            },
            {
              title: { tr: 'Malzeme satırı alışı gösteriyor.', en: 'The materials line shows purchases.' },
              text: { tr: 'Yönetim hesaplarındaki malzeme satırı tüketimi değil alışı gösterdiği için aylık brüt kâr güvenilir değil. Yıllık değerler stok seviyesi sabit kaldığı için sağlam.', en: 'The materials line in the accounts shows purchases, not consumption, so monthly gross profit is not reliable. Yearly values hold because stock levels stayed flat.' },
            },
            {
              title: { tr: 'Taşımanın bir kısmı paylaştırıldı.', en: 'Part of freight was shared out.' },
              text: { tr: 'Referansı kullanılamayan taşıma satırları izlenmedi, bağlanmış satırların dağılımına göre paylaştırıldı.', en: 'Freight lines with an unusable reference were not traced, they were shared by the mix of linked lines.' },
            },
            {
              title: { tr: 'Vergiyle ilgili gözlemler vergi tavsiyesi değil.', en: 'The tax findings are not tax advice.' },
              text: { tr: 'Belgelerin gösterdiğini aktarır, izlenecek yol şirketin vergi danışmanıyla teyit edilmeli.', en: 'They report what the documents show, the route to take should be confirmed with the company’s tax adviser.' },
            },
          ],
        },
      ],
    },
  ],
  closing: {
    title: { tr: 'Sizin de cironuz büyürken kârınız yerinde mi sayıyor?', en: 'Is your profit standing still while turnover grows?' },
  },
}
