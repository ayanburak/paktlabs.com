/*
file: site.ts
importable: mainSiteUrl

description: PaktLabs ana sitesinin adresini tutan modul.
*/

// Disiplin siteleri logoda ve alt bilgide ana siteye bu adresle doner, adres
// degisirse yalnizca burasi degisir. Ana site bir disiplin olmadigi icin
// disciplines.ts'te degil kendi dosyasinda duruyor. Landing'in kendisi bu
// adresi kullanmaz, onun logosu zaten kendi kokune gider.
export const mainSiteUrl = 'https://paktlabs.com'
