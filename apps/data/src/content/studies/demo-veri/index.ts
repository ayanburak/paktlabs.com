/*
file: index.ts
importable: demoVeri

Demo Veri calismasinin kunye dosyasi. Listede gorunen bilgileri, verinin
orijinal dilini ve kodun yerini tasir. Detay sayfasini ve kod sayfasini kendi
dosyalarindan yalnizca sayfa acilirken yukler, metinleri ana pakete girmez.

description: Demo Veri calismasini veri sayfasindaki listeye ve detay sayfasina veren modul.
*/

// NOTE: Kart metni mockup'taki 01 numarali kartin lorem metni, veri sayfasinin
// tasarimi canlida sinanirken yerinde duruyor. Lorem'in cevirisi olmadigi
// icin iki dilde ayni metin yazili.

import type { Study } from '../types'

export const demoVeri: Study = {
  slug: 'demo-veri',
  number: '01',
  year: 2026,
  tags: ['quality', 'machineLearning'],
  title: {
    tr: 'Demo Veri: ürün kataloğu tekilleştirme',
    en: 'Demo Data: product catalog deduplication',
  },
  card: {
    lead: {
      tr: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      en: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    body: [
      {
        tr: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        en: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        tr: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        en: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
      },
    ],
  },
  author: 'ayanburak',
  dataLanguage: 'tr',
  code: { kind: 'page', page: () => import('./source').then((module) => module.source) },
  page: () => import('./page').then((module) => module.page),
}
