/*
file: index.ts
importable: studies, findStudy

Sitedeki butun calismalarin tek listesi. Veri sayfasindaki kartlar ve detay
sayfasindaki sonraki calisma baglantisi bu listeyi okur. Yeni bir calisma kendi
klasorunde yazilir ve buradaki listeye eklenir.

description: Calismalarin listesini ve slug ile calisma bulan fonksiyonu disari acan modul.
*/

import { demoVeri } from './demo-veri'
import type { Study } from './types'

// Liste numaraya gore siralanir. Kartlar ve sonraki calisma baglantisi bu
// sirayi oldugu gibi kullanir.
//
// NOTE: 2026-10-11'e kadar listede mockup'tan tasinan lorem yer tutucular da
// vardi, Burak'in karariyla kaldirildi. 00 numarasi one cikan calismaya
// ayrilmisti, bugun hicbir calismada feature alani yok ve one cikan kart
// gorunmuyor. Kartin tasarimi StudyCard'da duruyor, bir calismanin kunyesine
// feature yazilinca yeniden gorunur.
export const studies: Study[] = [demoVeri].sort((a, b) => a.number.localeCompare(b.number))

// Adresteki slug her zaman bir calismaya karsilik gelmeyebilir, eski ya da
// yanlis yazilmis bir baglanti olabilir. O durumda undefined doner ve rota
// bulunamadi sayfasini gosterir.
export function findStudy(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug)
}
