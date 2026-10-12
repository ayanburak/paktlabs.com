/*
file: profiles.ts
importable: profiles, ProfileId, Profile, profilePagePath, profilePageUrl

PaktLabs ekibindeki kisiler. Profil sayfasi landing'de, calismalarin yazar
kutusu data'da durdugu icin kisinin adi, e-postasi ve sayfasinin adresi iki
sitenin de okuyabildigi bu pakette tutulur. Profil sayfasinin uzun metinleri,
unvan ve tanitim gibi, landing'in sozlugundedir, burada yalnizca dilden
bagimsiz bilgiler var:

    profilePageUrl('ayanburak')  // https://paktlabs.com/profiles/ayanburak

description: Ekipteki kisilerin adini, kisisel e-postasini ve profil sayfasinin adresini tutan modul.
*/

import type { Discipline } from './disciplines'
import { mainSiteUrl } from './site'

// email kisinin kendi adresidir, studyonun ortak adresi contact.ts'teki
// info@ adresidir. Musteri kisiye dogrudan da ulasabilsin diye ikisi ayri
// tutuluyor, kisisel adres studyonun adresi yerine kullanilmaz. github
// ve linkedin kullanici adidir, adresleri profil sayfasinda kurulur, website
// kisinin kendi sitesinin tam adresidir. disciplines kisinin calistigi
// alanlardir, profildeki kartta disciplineOrder sirasiyla gorunur. Fotograf
// burada degil profilePhotos.ts'te durur, nedeni orada yazili.
export interface Profile {
  name: string
  email: string
  github: string
  linkedin: string
  website: string
  disciplines: readonly Discipline[]
}

// Kimlik adreste de gecer, degistirilirse eski baglantilar bulunamadi
// sayfasina duser. Yeni bir kisi buraya, landing'de profiles/<kimlik>/index.html
// girisine ve sozlukteki profilePage altina eklenir.
export const profiles = {
  ayanburak: {
    name: 'Burak Ayan',
    email: 'contact@ayanburak.com',
    github: 'ayanburak',
    linkedin: 'ayanburak',
    website: 'https://ayanburak.com',
    disciplines: ['data', 'automation', 'web'],
  },
} as const satisfies Record<string, Profile>

export type ProfileId = keyof typeof profiles

// Sayfa derlemede profiles/<kimlik>/index.html olur. Adres iletisim sayfasi
// gibi sondaki egik cizgisiz yazilir, nginx onu 301 ile egik cizgili adrese
// tasir. Landing'in kendi icinden giden baglantilar bu yolu kullanir.
export function profilePagePath(id: ProfileId): string {
  return `/profiles/${id}`
}

// Disiplin sitelerinden profile giden tam adres, data'daki yazar kutusu kullanir.
export function profilePageUrl(id: ProfileId): string {
  return `${mainSiteUrl}${profilePagePath(id)}`
}
