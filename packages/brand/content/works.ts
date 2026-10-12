/*
file: works.ts
importable: works, WorkId, Work, workPath, workUrl

Butun disiplinlerde yayinlanan calismalarin ortak listesi: adi, adresi ve
yazari. Calismanin kendisi, yani karti, detay sayfasi ve kodu, disiplinin
kendi sitesinde durur, burada yalnizca baska sitelerin de bilmesi gereken
kisim var. Profil sayfasi bir kisinin calismalarini bu listeden bulur:

    workUrl(works.demoData)  // https://data.paktlabs.com/work/demo-data

Yeni bir calisma once buraya, sonra disiplin sitesindeki kendi klasorune
yazilir. data'nin tanim dosyasi buradaki kaydi kendi icine acar, ad ve slug
iki yerde ayri ayri yazilmaz.

description: Calismalarin adini, adresini ve yazarini butun sitelerin okuyabilecegi tek yerde tutan modul.
*/

import type { Localized } from '../i18n/language'

import { disciplineUrls, type Discipline } from './disciplines'
import type { ProfileId } from './profiles'

// slug adresteki addir, degistirilirse eski baglantilar bulunamadi sayfasina
// duser. title kartta, detay sayfasinda, sekme basliginda ve profilde aynidir.
export interface Work {
  discipline: Discipline
  slug: string
  author: ProfileId
  title: Localized
}

// Listenin sirasi profil sayfasindaki sirasidir, yeni calisma en uste yazilir.
// Disiplin sitesi kendi listesini kendi numarasina gore ayrica siralar.
export const works = {
  demoData: {
    discipline: 'data',
    slug: 'demo-data',
    author: 'ayanburak',
    title: {
      tr: 'Demo Veri: ürün kataloğu tekilleştirme',
      en: 'Demo Data: product catalog deduplication',
    },
  },
} as const satisfies Record<string, Work>

export type WorkId = keyof typeof works

// Calisma sayfasinin disiplin sitesi icindeki yolu. data'nin rotalari ve kart
// baglantilari bunu kullanir, adres semasi tek yerde kalsin diye. web ve
// automation siteleri calisma yayinlamaya baslayinca ayni semayi izler.
export function workPath(slug: string): string {
  return `/work/${slug}`
}

// Baska bir siteden calismaya giden tam adres, profil sayfasi kullanir.
export function workUrl(work: Work): string {
  return `${disciplineUrls[work.discipline]}${workPath(work.slug)}`
}
