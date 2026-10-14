/*
file: index.ts
importable: studies, findStudy, CATALOG_SLUG

Sitedeki butun calismalarin tek listesi. Veri sayfasindaki kartlar ve detay
sayfasindaki sonraki calisma baglantisi bu listeyi okur. Yeni bir calisma kendi
klasorunde yazilir ve buradaki listeye eklenir.

description: Calismalarin listesini ve slug ile calisma bulan fonksiyonu disari acan modul.
*/

import { demoData } from './demo-data'
import { hartwellFinch } from './hartwell-finch'
import type { Study } from './types'

// Liste numaraya gore siralanir. Kartlar ve sonraki calisma baglantisi bu
// sirayi oldugu gibi kullanir.
//
// NOTE: 2026-10-11'e kadar listede mockup'tan tasinan lorem yer tutucular da
// vardi, Burak'in karariyla kaldirildi. 00 numarasi one cikan calismaya
// ayrildi, ilk gercek calisma Hartwell & Finch bu numarayla ve feature
// alaniyla listenin en ustunde duruyor.
export const studies: Study[] = [hartwellFinch, demoData].sort((a, b) => a.number.localeCompare(b.number))

// Blok katalogunun ornek dosyalari da bu klasorde, kendi alt klasorunde
// durur ve calisma dosyalari gibi bu adla yuklenir. Katalog bir calisma
// degildir, yukaridaki listeye girmez, /work adresinden acilmaz.
export const CATALOG_SLUG = 'catalog'

// Adresteki slug her zaman bir calismaya karsilik gelmeyebilir, eski ya da
// yanlis yazilmis bir baglanti olabilir. O durumda undefined doner ve rota
// bulunamadi sayfasini gosterir.
export function findStudy(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug)
}
