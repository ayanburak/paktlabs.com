/*
file: lastPublished.ts
importable: lastPublished

Veri sayfasinin hero'sunda gun, ay ve yil olarak gorunen son yayin tarihi.
Yeni bir calisma yayinlandiginda bu tarih elle guncellenir.

description: Son yayinlanan calismanin tarihini YYYY-AA-GG biciminde tutan modul.
*/

// Tarih elle yaziliyor, calismalarin facts alanindan hesaplanmiyor. Facts alanlarinda
// yalnizca yil var, gun ve ay icin her calismaya ayri bir alan acmak bugun
// tek bir kutu icin fazla olurdu. Tarih dilden
// bagimsiz oldugu icin sozlukte degil burada, degisince tek dosya degisir.
export const lastPublished = '2026-10-11'
