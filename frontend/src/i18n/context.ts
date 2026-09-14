/*
file: context.ts
importable: Language, Dict, dictionaries, LanguageContext, LanguageContextValue

Provider ile hook'larin ortak kullandigi parcalar. Ayri bir .ts dosyasinda
durmasinin sebebi Fast Refresh: bir .tsx dosyasi bilesen disinda bir sey
export ederse o dosyada hot reload tam calismiyor, lint de bunu uyariyor.

tr.json ve en.json ayni sekle sahip olmak zorunda. Dict tipi tr.json'dan
cikariliyor, en.json'da eksik ya da fazla bir alan olursa TypeScript derleme
hatasi verir.

description: Dil tipini, iki dilin sozlugunu ve dil context nesnesini tanimlayan modul.
*/

import { createContext } from 'react'

import en from './en.json'
import tr from './tr.json'

export type Language = 'tr' | 'en'
export type Dict = typeof tr

export const dictionaries: Record<Language, Dict> = { tr, en }

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

// Varsayilan null, provider disinda cagrilan hook bunu gorup acik bir hata versin diye
export const LanguageContext = createContext<LanguageContextValue | null>(null)
