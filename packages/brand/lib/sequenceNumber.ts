/*
file: sequenceNumber.ts
importable: sequenceNumber

description: Sitelerin bolumlerde, icindekilerde, kararlarda ve hizmet sayfalarinda gosterdigi iki haneli sira numarasini yazan yardimci.
*/

// Sira sifirdan baslar, numara birden: ilk oge 01. Bicim burada tek yerde
// durur ki bolumler, icindekiler, kararlar ve hizmet sayfalari birbirinden
// ayrismasin.
export function sequenceNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}
