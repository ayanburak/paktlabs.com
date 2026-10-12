/*
file: index.ts
importable: demoData

Demo Veri calismasinin tanim dosyasi. Listede gorunen bilgileri, verinin
orijinal dilini ve kodun yerini tasir. Detay sayfasini ve kod sayfasini kendi
dosyalarindan yalnizca sayfa acilirken yukler, metinleri ana pakete girmez.

description: Demo Veri calismasini veri sayfasindaki listeye ve detay sayfasina veren modul.
*/

import { works } from '@paktlabs/brand/content/works'

import type { Study } from '../types'

// Ad, slug ve yazar brand'deki calisma listesinden gelir, profil sayfasi da
// ayni kaydi okuyor. Burada yalnizca data'ya ozel kisim yazilir.
export const demoData: Study = {
  ...works.demoData,
  number: '01',
  year: 2026,
  tags: ['quality', 'machineLearning'],
  card: {
    lead: {
      tr: 'ERP ile üç tedarikçinin fiyat listesinde aynı ürünü bulup tek bir ürün kartında topladık.',
      en: 'We found the same product across the ERP and three supplier price lists and gathered it into a single product card.',
    },
    body: [
      {
        tr: 'Listelerde ortak bir ürün kodu yoktu, aynı vida her kaynakta başka bir adla ve başka bir birimle geçiyordu. Kayıtları ortak bir biçime çeviren ve olası eşleşmeleri bir makine öğrenmesi modeliyle puanlayan bir hat kurduk.',
        en: 'The lists shared no product code, and the same screw appeared in every source under a different name and unit. We built a pipeline that brings the records into a common format and scores possible matches with a machine learning model.',
      },
      {
        tr: 'Yaklaşık 184 bin kayıt 86 bin ürüne indi. Modelin emin olmadığı çiftleri satın alma ekibi onayladı, hat yeni kayıtları her gece kendiliğinden eşleştiriyor.',
        en: 'About 184 thousand records came down to 86 thousand products. The purchasing team approved the pairs the model was unsure about, and the pipeline now matches new records on its own every night.',
      },
    ],
  },
  dataLanguage: 'tr',
  code: { kind: 'page', page: () => import('./source').then((module) => module.source) },
  page: () => import('./page').then((module) => module.page),
}
