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

// Liste numaraya gore sirali tutulur. Kartlar ve sonraki calisma baglantisi
// bu sirayi oldugu gibi kullanir, ayrica siralamaz.
export const studies: Study[] = [demoVeri]

// Adresteki slug her zaman bir calismaya karsilik gelmeyebilir, eski ya da
// yanlis yazilmis bir baglanti olabilir. Bu yuzden undefined donebilir ve rota
// o durumda bulunamadi sayfasini gosterir.
export function findStudy(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug)
}
