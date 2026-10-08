/*
file: chapterNumber.ts
importable: chapterNumber

description: Bolumun sirasini ekranda gorunen iki haneli numaraya ceviren yardimci.
*/

// Bolum cercevesi ve icindekiler ayni numarayi gosterir, bicim burada tek
// yerde durur ki ikisi birbirinden ayrismasin. Sira sifirdan baslar, numara
// birden: ilk bolum 01.
export function chapterNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}
