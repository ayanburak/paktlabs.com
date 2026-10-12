/*
file: expected.ts
importable: mainSite, disciplineUrls, contactPage, contactEmail, contactMailto, authorProfile, profileLinks, personalMailto, demoDataWork, services

Testlerin bekledigi adresler ve hizmet listesi. Bu degerler bilerek elle yazili,
uygulamanin kendi dosyalarindan (disciplines.ts, contact.ts, dataTags.ts, profiles.ts, works.ts) okunmaz.
Okunsaydi yanlis yazilmis bir adres testi de gecirirdi. Bir adres degisirse
burasi tek yerdir, iki sitenin butun testleri buradan okur.

description: Iki sitenin testlerinin ortak kullandigi, elle yazili beklenen adresler ve hizmet listesi.
*/

export const mainSite = 'https://paktlabs.com'

export const disciplineUrls = {
  web: 'https://web.paktlabs.com',
  automation: 'https://automation.paktlabs.com',
  data: 'https://data.paktlabs.com',
}

export const contactPage = 'https://paktlabs.com/contact'
export const contactEmail = 'info@paktlabs.com'
export const contactMailto = `mailto:${contactEmail}`
export const authorProfile = 'https://paktlabs.com/profiles/ayanburak'

// Profil sayfasinin dugmeleri, kisisel adresi ve calisma satirinin hedefi.
// Kisisel adres studyonun info@ adresinden bilerek ayri.
export const profileLinks = {
  linkedin: 'https://www.linkedin.com/in/ayanburak/',
  github: 'https://github.com/ayanburak',
  website: 'https://ayanburak.com',
}
export const personalMailto = 'mailto:contact@ayanburak.com'
export const demoDataWork = 'https://data.paktlabs.com/work/demo-data'

// Veri hizmetleri, ekrandaki sirayla. tag sozluk anahtaridir (dataTags),
// slug data sitesindeki /services/<slug> adresidir.
export const services = [
  { tag: 'preparation', slug: 'preparation' },
  { tag: 'database', slug: 'database' },
  { tag: 'quality', slug: 'quality' },
  { tag: 'analysis', slug: 'analysis' },
  { tag: 'visualization', slug: 'visualization' },
  { tag: 'machineLearning', slug: 'machine-learning' },
] as const
