/*
file: index.ts
importable: studies, findStudy

Sitedeki butun calismalarin tek listesi. Veri sayfasindaki kartlar ve detay
sayfasindaki sonraki calisma baglantisi bu listeyi okur. Yeni bir calisma kendi
klasorunde yazilir ve buradaki listeye eklenir.

description: Calismalarin listesini ve slug ile calisma bulan fonksiyonu disari acan modul.
*/

import { demoVeri } from './demo-veri'
import { placeholders } from './placeholders'
import type { Study } from './types'

// Liste numaraya gore siralanir. Kartlar ve sonraki calisma baglantisi bu
// sirayi oldugu gibi kullanir. Yer tutucular gercek calismalarla ayni listede
// durur, cunku veri sayfasinda onlarla ayni yerde gorunurler.
export const studies: Study[] = [demoVeri, ...placeholders].sort((a, b) => a.number.localeCompare(b.number))

// Adresteki slug her zaman bir calismaya karsilik gelmeyebilir, eski ya da
// yanlis yazilmis bir baglanti olabilir. Yer tutucularin da detay sayfasi
// yoktur. Her iki durumda undefined doner ve rota bulunamadi sayfasini gosterir.
export function findStudy(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug && !study.placeholder)
}
