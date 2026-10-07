/*
file: tr.ts
importable: tr

Demo Veri calismasinin Turkce metni. Is kurgusaldir, mockup asamasinda sayfa
tasarimini sinamak icin yazildi. Sayilar birbirini tutar ama gercek bir
musteriden gelmez, sayfa bu yuzden Demo Veri adiyla yayinlanir.

description: Demo Veri calismasinin Turkce basligini, aciklamasini ve kunyesini tasiyan modul.
*/

import type { StudyText } from '../types'

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
