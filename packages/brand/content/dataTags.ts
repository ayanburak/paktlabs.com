/*
file: dataTags.ts
importable: dataTags, DataTag, isDataTag, dataTagParam, dataTagUrl

Veri disiplininin calisma kategorileri ve sirasi. data sitesinin suzgeci ve
kartlari ile landing'deki Veri bandi ayni listeyi kullanir. Kategorilerin
ekranda gorunen adlari brand sozlugunde dataTags altinda durur. Yeni bir
kategori yalnizca buraya eklenir, adi iki dilin sozlugune yazilir, sozlukte
adi eksik kalirsa derleme hata verir.

Bir kategoriye dogrudan baglanmak icin dataTagUrl kullanilir, adres data'nin
calismalar bolumunu o kategori secili olarak acar:

    dataTagUrl('quality')  // https://data.paktlabs.com/?tag=quality#calismalar

description: Veri calismalarinin kategori kimliklerini, sitelerde goruldukleri sirayi ve kategoriye giden adresi tutan modul.
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

// Adresten gelen deger disaridan gelen bir metin, listede olmayan ya da
// yanlis yazilmis bir deger burada elenir.
export function isDataTag(value: string): value is DataTag {
  return (dataTags as readonly string[]).includes(value)
}

// Adresteki anahtarin adi. Landing bu adla yazar, data bu adla okur, ikisi
// ayri yerlerde yazilsaydi biri degisince baglantilar sessizce bozulurdu.
export const dataTagParam = 'tag'

// calismalar data'nin calisma bolumunun kimligi, Works.tsx'te duruyor. Bolum
// adi orada degisirse buradaki de degismeli, yoksa sayfa en ustten acilir ama
// suzgec yine secili gelir.
export function dataTagUrl(tag: DataTag): string {
  return `${disciplineUrls.data}/?${dataTagParam}=${tag}#calismalar`
}
