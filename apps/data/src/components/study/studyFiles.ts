/*
file: studyFiles.ts
importable: StudyFilesContext, useStudyFile

Calisma sayfalarinda calismanin dosyalarini parcalara dagitir. Sayfa
dosyalari rota yukleyicisinden hazir alir ve StudyFilesContext ile verir.
Parcalar dosyayi tur ve yoluyla ister, dosya o an secili veri dilinde
gelir. Parca dosyalarin nereden geldigini de veri dilinin nasil secildigini
de bilmez.

    const file = useStudyFile('data', 'raw-records.csv')

description: Calisma dosyalarini secili veri dilinde parcalara veren context ve hook.
*/

import { createContext, useContext } from 'react'

import { fileKey, type FileKind, type StudyFile, type StudyFileSet } from '@/content/studies/files'

import { useDataLanguage } from './dataLanguageContext'

export const StudyFilesContext = createContext<StudyFileSet | null>(null)

// Cagrilan dosya yoksa bos donmek yerine hata verir. Eksik bir dosya icerik
// dosyasinda yanlis yazilmis bir yoldur, sayfada sessizce bos bir tablo
// olarak kalmamali. data testi her parcanin cagirdigi dosyanin iki dilde de
// var oldugunu ayrica denetler.
export function useStudyFile(kind: FileKind, path: string): StudyFile {
  const files = useContext(StudyFilesContext)
  const { language } = useDataLanguage()
  if (!files) throw new Error('useStudyFile, StudyFilesContext disinda cagrildi')
  const file = files[language][fileKey(kind, path)]
  if (!file) throw new Error(`${language} dilinde ${fileKey(kind, path)} dosyasi yok`)
  return file
}
