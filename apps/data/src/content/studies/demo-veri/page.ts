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
          type: 'paragraph',
          text: {
            tr: 'Aşağıdaki iki tablo aynı ürün grubunun eşleştirmeden önceki ve sonraki halini gösterir. Satırlar firmanın dosyalarından alınmış bir kesit gibi, olduğu gibi bırakıldı.',
            en: 'The two tables below show the same group of products before and after matching. The rows are left exactly as they were, like an excerpt taken from the company’s files.',
          },
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
      blocks: [],
    },
    {
      id: 'hat',
      label: { tr: 'Çözüm hattı', en: 'The pipeline' },
      title: { tr: 'Altı istasyonlu bir eşleştirme hattı', en: 'A matching pipeline with six stations' },
      lede: {
        tr: 'Her kayıt aynı altı adımdan sırayla geçer. Her adımın tek bir işi var. Ayrıntısını merak ettiğiniz adımı açabilirsiniz.',
        en: 'Every record passes through the same six steps in order. Each step has a single job. You can open any step to see its details.',
      },
      blocks: [],
    },
    {
      id: 'esik',
      label: { tr: 'Model ve eşik', en: 'Model and thresholds' },
      title: { tr: 'Otomatik karar ve insan incelemesi', en: 'Automatic decisions and human review' },
      lede: {
        tr: 'Model her çifte, iki kaydın aynı ürün olma olasılığını gösteren bir skor verir. Skor çok yüksekse çift otomatik birleşir, çok düşükse reddedilir, aradaki bantta kalan çiftlere satın alma ekibi bakar. Aşağıdaki şekiller bu kararların, modelin hiç görmediği ve ekibin elle işaretlediği 1.600 çiftte nasıl sonuç verdiğini gösterir.',
        en: 'The model gives every pair a score showing how likely the two records are to be the same product. If the score is very high the pair is merged automatically, if it is very low it is rejected, and the purchasing team looks at the pairs in the band between. The figures below show how these decisions turned out on 1,600 pairs that the model had never seen and the team had labelled by hand.',
      },
      blocks: [],
    },
    {
      id: 'kararlar',
      label: { tr: 'Kararlar', en: 'Decisions' },
      title: { tr: 'Neyi seçtik, neyi bilerek seçmedik', en: 'What we chose, and what we chose not to' },
      lede: {
        tr: 'Teknik bir okurun ilk soracağı soruların cevabı burada. Her biri bir deneme ya da ölçümle verildi.',
        en: 'These are the answers to the first questions a technical reader would ask. Each one was settled by a trial or a measurement.',
      },
      blocks: [],
    },
    {
      id: 'teslim',
      label: { tr: 'Teslim ve takvim', en: 'Delivery and schedule' },
      title: { tr: 'Yedi haftada ne teslim edildi', en: 'What was delivered in seven weeks' },
      lede: {
        tr: 'Teslim bir rapor değil, firmanın kendi sunucusunda her gece çalışan bir hat. Yeni ya da değişen kayıtlar gece ikide hatta girer, mevcut ürünlerle eşleşir, belirsiz olanlar sabah inceleme ekranında bekler.',
        en: 'The delivery is not a report but a pipeline that runs every night on the company’s own server. New or changed records enter the pipeline at two in the morning, are matched against existing products, and the uncertain ones wait on the review screen in the morning.',
      },
      blocks: [],
    },
    {
      id: 'sonuc',
      label: { tr: 'Sonuç ve sınırlar', en: 'Results and limits' },
      title: { tr: 'Ne değişti, nerede hâlâ dikkat lazım', en: 'What changed, and where care is still needed' },
      lede: {
        tr: 'Aynı ürün artık tek kartta duruyor ve tedarikçi fiyatları yan yana. Hat yeni bir tedarikçi listesini bir günlük tanımla içeri alabiliyor.',
        en: 'The same product now sits on a single card and supplier prices sit side by side. The pipeline can take in a new supplier list with one day of setup.',
      },
      blocks: [],
    },
  ],
}
