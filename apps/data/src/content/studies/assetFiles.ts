/*
file: assetFiles.ts
importable: assetFiles

StudyFiles'in bugunku somut hali. Calismalarin dosyalari derleme sirasinda
ayri statik dosyalar olarak yayinlanir, ana JS'e gomulmez. Bir calismanin
dosyalari ancak o calismanin sayfasi acilirken indirilir, indirme
baglantilari da ayni dosyalari gosterir. Yeni bir calismanin dosyalari
buradan kendiliginden bulunur, ayrica baglanti kurulmaz.

description: Calisma dosyalarini derlemeyle yayinlanan statik dosyalardan indiren kaynak.
*/

// NOTE: import.meta.glob yalnizca Vite derlemesinde calisir. Testler calisma
// dosyalarini Node'da diskten okur, bu modulu kullanmaz.

import { fileKey, type FileKind, type StudyFileSet, type StudyFiles } from './files'

// Anahtar dosyanin yolu, ornegin ./demo-veri/code/en/rules/catalog.py, deger
// derlenen sitedeki adresi. no-inline olmadan Vite kucuk dosyalari adres
// yerine metnin kendisiyle ana JS'e gomer, bu modulun amaci tam tersi.
const urls = import.meta.glob<string>('./*/{data,code}/{tr,en}/**/*', {
  query: '?url&no-inline',
  import: 'default',
  eager: true,
})

// Yol uc parcaya ayrilir: calisma, tur ve dil, geri kalani dosyanin calisma
// icindeki yolu. Yollar glob kalibindan geldigi icin bu kalip her zaman tutar.
const PATH = /^\.\/([^/]+)\/(data|code)\/(tr|en)\/(.+)$/

// Sayfa ileri geri gezilirken ayni calismanin dosyalari yeniden istenmesin
// diye yukleme sonucu calisma basina bir kez tutulur. Hata veren yukleme
// tutulmaz, bir sonraki ziyarette yeniden denenir.
const cache = new Map<string, Promise<StudyFileSet>>()

// Sunucu dosya yerine hata sayfasi donerse onu dosyanin metni sanmamak icin
// cevabin durumu denetlenir.
async function fetchText(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url} indirilemedi: ${response.status}`)
  return response.text()
}

async function loadStudy(slug: string): Promise<StudyFileSet> {
  const set: StudyFileSet = { tr: {}, en: {} }
  await Promise.all(
    Object.entries(urls).map(async ([path, url]) => {
      const match = path.match(PATH)
      if (!match || match[1] !== slug) return
      const [, , kind, language, rest] = match as unknown as [string, string, FileKind, 'tr' | 'en', string]
      set[language][fileKey(kind, rest)] = { text: await fetchText(url), url }
    }),
  )
  return set
}

export const assetFiles: StudyFiles = {
  load(slug) {
    let pending = cache.get(slug)
    if (!pending) {
      pending = loadStudy(slug)
      pending.catch(() => cache.delete(slug))
      cache.set(slug, pending)
    }
    return pending
  },
}
