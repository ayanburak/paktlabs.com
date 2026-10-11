/*
file: dataTags.ts
importable: dataTags, DataTag, dataTagSlugs, dataServicePath, dataServiceUrl

Veri disiplininin calisma kategorileri ve sirasi. data sitesinin suzgeci ve
kartlari ile landing'deki Veri bandi ayni listeyi kullanir. Kategorilerin
ekranda gorunen adlari brand sozlugunde dataTags altinda durur. Yeni bir
kategori yalnizca buraya eklenir, adi iki dilin sozlugune yazilir, sozlukte
adi eksik kalirsa derleme hata verir.

Her kategorinin data'da bir hizmet sayfasi vardir. Landing'in Veri bandi
kategorilere dataServiceUrl ile baglanir, data'nin icinden yol icin
dataServicePath kullanilir, adresteki adi dataTagSlugs tutar:

    dataServiceUrl('machineLearning')  // https://data.paktlabs.com/services/machine-learning

description: Veri calismalarinin kategori kimliklerini, sitelerde goruldukleri sirayi ve hizmet sayfalarinin adresini tutan modul.
*/

import { disciplineUrls } from './disciplines'

// Sira Burak'in verdigi siradir, data'nin suzgecinde de landing'in Veri
// bandinda da ayni kalir. Adlar sozlukte durdugu ve sozluk nesnesinin anahtar
// sirasina guvenilmedigi icin sira burada tutuluyor. Kimlikler adreste de
// gectigi icin degistirilirse eski baglantilar suzgecsiz, butun calismalarla
// acilir.
export const dataTags = [
  'preparation',
  'database',
  'quality',
  'analysis',
  'visualization',
  'machineLearning',
] as const

export type DataTag = (typeof dataTags)[number]

// Hizmet sayfasinin adresindeki kategori adi. Kimlik kodda camelCase, adres
// kucuk harf ve tireli yazilir. Record oldugu icin yeni bir kategori
// eklendiginde adi yazilmazsa derleme hata verir. Adresler disaridan
// baglanabildigi icin degistirilirse eski baglantilar bulunamadi sayfasina
// duser.
export const dataTagSlugs: Record<DataTag, string> = {
  preparation: 'preparation',
  database: 'database',
  quality: 'quality',
  analysis: 'analysis',
  visualization: 'visualization',
  machineLearning: 'machine-learning',
}

// data sitesinin icinden hizmet sayfasina giden yol. Landing tam adresi
// disciplineUrls.data ile birlestirerek kurar. Yol data sitesinin panosunda, tam
// adres landing sitesinde kullanilir, ikisi de adres semasinin parcasi oldugu icin
// bu modulde kalir.
export function dataServicePath(tag: DataTag): string {
  return `/services/${dataTagSlugs[tag]}`
}

// Hizmet sayfasinin tam adresi, landing'in Veri bandi kullanir.
export function dataServiceUrl(tag: DataTag): string {
  return `${disciplineUrls.data}${dataServicePath(tag)}`
}
