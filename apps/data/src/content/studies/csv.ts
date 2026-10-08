/*
file: csv.ts
importable: parseCsv

Calismalarin veri dosyalarini okur. Dosyalar Turkce Excel'in disa aktarimi
gibi noktali virgulle ayrilir, cunku Turkce sayilarda virgul ondalik
ayracidir. Hucre tirnak icindeyse icindeki noktali virgul ve tirnak cifti
metnin parcasi sayilir.

description: Noktali virgulle ayrilmis CSV metnini satir ve hucrelere ayiran yardimci.
*/

// Tirnak yalnizca hucrenin basinda acilirsa ozel anlam tasir, 2,5" gibi bir
// olcudeki tirnak duz karakter olarak kalir. Satir sonu Windows'ta ve Linux'ta
// farkli yazildigi icin ikisi de kabul edilir, dosya sonundaki bos satir atilir.
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (char === '"') {
        quoted = false
      } else {
        cell += char
      }
    } else if (char === '"' && cell === '') {
      quoted = true
    } else if (char === ';') {
      row.push(cell)
      cell = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') i++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += char
    }
  }
  if (cell !== '' || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }
  return rows
}
