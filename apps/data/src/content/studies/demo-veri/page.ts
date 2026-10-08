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
}
