/*
file: files.ts
importable: FileKind, StudyFile, StudyFileSet, StudyFiles, fileKey

Bir calismanin dosyalari: hesap tablolarinin CSV'leri, kod dosyalari ve
terminal ciktilari. Her dosya calismanin klasorunde <tur>/<dil>/<yol>
kalibiyla durur, ornegin data/tr/raw-records.csv ya da
code/en/rules/catalog.py. Iki dilin dosyalari ayni yollarda bulunur.

Dosyalarin nereden geldigini StudyFiles soyut sinifi saklar. Sayfalar
dosyalari ondan bir kerede alir, parcalar dosyayi tur ve yoluyla ister:

    const files = await assetFiles.load('demo-data')
    files.tr[fileKey('data', 'raw-records.csv')].text

description: Calisma dosyalarinin tiplerini ve onlari veren soyut sinifi tanimlayan modul.
*/

import type { Localized } from './types'

// data hesap tablolarinin ve indirilen veri dosyalarinin, code kod
// dosyalarinin ve terminal ciktilarinin klasoru.
export type FileKind = 'data' | 'code'

// Dosyanin metni ve indirme adresi. Onizleme ile indirme ayni dosyadan
// gelsin diye ikisi birlikte tasinir.
export interface StudyFile {
  text: string
  url: string
}

// Bir calismanin butun dosyalari, dile ve fileKey ile kurulan anahtara gore.
export type StudyFileSet = Localized<Record<string, StudyFile>>

// Dosyalarin kaynagi. Bugun derlemeyle birlikte yayinlanan statik dosyalar,
// ileride bir sunucu da olabilir. Sayfalar bu soyut sinifa baglidir, somut
// kaynak degisirse parcalara dokunulmaz.
export interface StudyFiles {
  // Bir calismanin iki dildeki butun dosyalarini yukler. Calismanin hic
  // dosyasi yoksa iki dil de bos doner. Bir dosya indirilemezse hata verir,
  // yarim bir dosya seti sayfaya gecmez.
  load(slug: string): Promise<StudyFileSet>
}

// Dosya anahtari tur ve yoldan kurulur, data/raw-records.csv gibi. Tur
// anahtarin icinde tutulur, boylece bir CSV ile ayni adli bir kod dosyasi
// birbirine karismaz.
export function fileKey(kind: FileKind, path: string): string {
  return `${kind}/${path}`
}
