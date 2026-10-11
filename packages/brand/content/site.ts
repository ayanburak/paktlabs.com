/*
file: site.ts
importable: mainSiteHost, mainSiteUrl

description: PaktLabs ana sitesinin adresini tutan modul.
*/

// Disiplin siteleri logoda ve alt bilgide ana siteye bu adresle doner, adres
// degisirse yalnizca burasi degisir. Dil cerezinin Domain degeri ve alt
// bilgideki baglanti metni de ayni ana bilgisayar adindan okunur. Ana site bir disiplin olmadigi icin
// disciplines.ts'te degil kendi dosyasinda duruyor. Landing'in logosu kendi
// kokune gider, landing bu adresi yalnizca contact.ts'teki iletisim sayfasi
// adresi uzerinden kullanir.
export const mainSiteHost = 'paktlabs.com'
export const mainSiteUrl = `https://${mainSiteHost}`
