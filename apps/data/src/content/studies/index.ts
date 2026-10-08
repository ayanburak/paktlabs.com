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
import type { PlaceholderStudy, Study } from './types'

// Liste numaraya gore siralanir. Kartlar ve sonraki calisma baglantisi bu
// sirayi oldugu gibi kullanir. Yer tutucular gercek calismalarla ayni listede
// durur, cunku veri sayfasinda onlarla ayni yerde gorunurler. Kartlar
// ikisinin de tasidigi liste katini okur.
export const studies: (Study | PlaceholderStudy)[] = [demoVeri, ...placeholders].sort((a, b) => a.number.localeCompare(b.number))

// Adresteki slug her zaman bir calismaya karsilik gelmeyebilir, eski ya da
// yanlis yazilmis bir baglanti olabilir. Yer tutucularin da detay sayfasi
// yoktur. Her iki durumda undefined doner ve rota bulunamadi sayfasini gosterir.
// Donen deger her zaman gercek bir calismadir, detay sayfasi icerigin var
// oldugundan emin olabilir.
export function findStudy(slug: string): Study | undefined {
  return studies.find((study): study is Study => study.slug === slug && !('placeholder' in study))
}
