/*
file: tr.ts
importable: tr, sourceTr

Demo Veri calismasinin Turkce metni. Is kurgusaldir, mockup asamasinda sayfa
tasarimini sinamak icin yazildi. Sayilar birbirini tutar ama gercek bir
musteriden gelmez, sayfa bu yuzden Demo Veri adiyla yayinlanir.

description: Demo Veri calismasinin ve kod sayfasinin Turkce basligini, aciklamasini ve kunyesini tasiyan modul.
*/

import type { SourceText, StudyText } from '../types'

export const tr: StudyText = {
  title: 'Demo Veri: ürün kataloğu tekilleştirme',
  lede: 'Bir yapı malzemesi distribütörünün ERP kayıtları ile üç tedarikçi kataloğunda aynı ürünü bulan, birleştiren ve her gece kendini güncelleyen bir eşleştirme hattı.',
  kunye: [
    { label: 'Sektör', value: 'Yapı malzemesi ve hırdavat dağıtımı' },
    { label: 'Süre', value: '7 hafta' },
    { label: 'Girdi', value: '4 kaynak, 184.312 kayıt' },
    { label: 'Teslim', value: 'Gecelik hat ve inceleme ekranı' },
  ],
}

export const sourceTr: SourceText = {
  title: 'Demo Veri: kod ve veri örnekleri',
  lede: 'Ürün kataloğu tekilleştirme işinden, paylaşılmasına onay verilen kod parçaları ve veri örnekleri. Kod parçaları okunabilsin diye kısaltıldı, depodaki tam halleri daha uzun.',
  kunye: [
    { label: 'Dil', value: 'Python 3.12, SQL' },
    { label: 'Kütüphaneler', value: 'pandas, scikit-learn, rapidfuzz, networkx' },
    { label: 'Veritabanı', value: 'PostgreSQL 16' },
    { label: 'Paylaşılan', value: '8 kod dosyası, 5 veri dosyası' },
  ],
}
