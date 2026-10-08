/*
file: data.ts
importable: studyData

Butun calismalarin veri dosyalarini derleme sirasinda toplar. Her calismanin
klasorunde data/tr ve data/en altinda ayni kimlikli CSV'ler durur, ornegin
data/tr/raw-records.csv. Yeni bir calismanin dosyalari buradan kendiliginden
bulunur, ayrica baglanti kurulmaz.

description: Calismalarin CSV dosyalarini dile ve kimlige gore donduren modul.
*/

// NOTE: import.meta.glob yalnizca Vite derlemesinde calisir. Bu yuzden toplama
// isi calismanin kendi index.ts'inde degil burada duruyor, testler calisma
// dosyalarini Node'da dogrudan okuyabilsin diye.

import type { Localized } from './types'

// Derleme sirasinda dosyalarin metni sayfaya katilir. Anahtar dosyanin yolu,
// ornegin ./demo-veri/data/tr/raw-records.csv
const files = import.meta.glob<string>('./*/data/*/*.csv', { query: '?raw', import: 'default', eager: true })

// Bir calismanin CSV'leri dile ve kimlige gore. Dosyasi olmayan bir dil bos
// kalir, iki dilin ayni dosyalari tasidigini data testi denetler.
export function studyData(slug: string): Localized<Record<string, string>> {
  const data: Localized<Record<string, string>> = { tr: {}, en: {} }
  for (const [path, text] of Object.entries(files)) {
    const match = path.match(/^\.\/([^/]+)\/data\/(tr|en)\/([^/]+)\.csv$/)
    if (match && match[1] === slug) data[match[2] as 'tr' | 'en'][match[3]] = text
  }
  return data
}
