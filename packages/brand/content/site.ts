/*
file: site.ts
importable: mainSiteUrl

description: PaktLabs ana sitesinin adresini tutan modul.
*/

// Disiplin siteleri logoda ve alt bilgide ana siteye bu adresle doner, adres
// degisirse yalnizca burasi degisir. Ana site bir disiplin olmadigi icin
// disciplines.ts'te degil kendi dosyasinda duruyor. Landing'in logosu kendi
// kokune gider, landing bu adresi yalnizca contact.ts'teki iletisim sayfasi
// adresi uzerinden kullanir.
export const mainSiteUrl = 'https://paktlabs.com'
