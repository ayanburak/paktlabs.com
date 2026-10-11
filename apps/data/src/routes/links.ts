/*
file: links.ts
importable: worksAnchor, servicesAnchor, tagParam, isDataTag, dataTagFromSlug, worksPath, servicesPath

Veri sitesinin kendi icindeki adres parcalari. Ana sayfadaki calismalar ve
hizmetler bolumlerinin kimligi, kategori anahtarinin adi ve bu parcalardan
kurulan yollar burada durur. Bolum kimliklerini ve yollari kullanan her yer
buradan alir:

    worksPath()          // /#works
    worksPath('quality') // /?tag=quality#works

description: Veri sitesinin bolum kimliklerini, kategori anahtarini ve bunlardan kurulan sayfa ici yollari tutan modul.
*/

import { dataTags, dataTagSlugs, type DataTag } from '@paktlabs/brand/content/dataTags'

// Bu adresler yalnizca data sitesinin kendi sayfa yapisini bilir. Landing ya
// da baska bir site bolum kimliklerine ihtiyac duymadigi icin brand paketine
// degil buraya yazildi. Hizmetlerin adres sablonu ise landing de kullandigi
// icin brand paketindeki dataTags dosyasinda kaldi.

// Ana sayfadaki iki bolumun kimligi. Bolum kimligi, hero dugmesi ve geri
// donus baglantilari ayni degeri okur. Deger degisirse eski baglantilar
// sayfayi en ustten acar.
export const worksAnchor = 'works'
export const servicesAnchor = 'services'

// Adresteki kategori anahtarinin adi. Calisma listesi bu adla okur, yolu
// worksPath bu adla kurar, ikisi ayri yerlerde yazilsaydi biri degisince
// baglantilar sessizce bozulurdu.
export const tagParam = 'tag'

// Adresten gelen deger disaridan gelen bir metin, listede olmayan ya da
// yanlis yazilmis bir deger burada elenir.
export function isDataTag(value: string): value is DataTag {
  return (dataTags as readonly string[]).includes(value)
}

// Hizmet sayfasinin adresindeki addan kategoriyi bulur, hizmet sayfasi
// kullanir. Bilinmeyen bir ad undefined doner, sayfa o zaman bulunamadi
// sayfasini gosterir.
export function dataTagFromSlug(slug: string): DataTag | undefined {
  return dataTags.find((tag) => dataTagSlugs[tag] === slug)
}

// Calisma listesine giden yol. Kategori verilirse liste o kategori secili
// acilir, verilmezse sayfa listenin basindan acilir. Bolum kimligi
// degisirse sayfa en ustten acilir ama suzgec yine secili gelir.
export function worksPath(tag?: DataTag): string {
  const query = tag === undefined ? '' : `?${tagParam}=${tag}`
  return `/${query}#${worksAnchor}`
}

// Hizmetler panosuna giden yol, hizmet sayfasinin geri baglantisi kullanir.
export const servicesPath = `/#${servicesAnchor}`
