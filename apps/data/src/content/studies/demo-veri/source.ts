/*
file: source.ts
importable: source

Demo Veri calismasinin kod ve veri sayfasi. Calismanin kodu GitHub'da degil,
bu sayfada paylasiliyor. Kod parcalari, dosya agaci ve veri ornekleri Faz 5'te
eklenecek, su an yalnizca kapagin metinleri var.

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
}
