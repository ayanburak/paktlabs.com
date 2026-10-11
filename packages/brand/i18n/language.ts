/*
file: language.ts
importable: Language, languages, locales, LanguageContext, LanguageContextValue, useLanguage

Aktif dil LanguageProvider tarafindan tutulur, bilesenler onu useLanguage ile
okur ve degistirir. Provider disinda cagrilan useLanguage hata verir.

description: PaktLabs sitelerinin desteklenen dillerini ve aktif dil context'ini tanimlayan modul.
*/

// Provider bir .tsx dosyasi oldugu icin context ve hook burada, ayri bir .ts
// dosyasinda duruyor. Bilesen disinda bir sey export eden .tsx dosyasinda Fast
// Refresh tam calismiyor, lint de bunu uyariyor.

import { createContext, useContext } from 'react'

// Desteklenen diller, sitelerin tek kaynagi. Ucuncu bir dil buraya eklenir,
// Language tipi, locales, dil degistirici ve provider bu listeden turer.
export const languages = ['tr', 'en'] as const
export type Language = (typeof languages)[number]

// Intl'in bekledigi yerel ayar kodu. Dil eklenince burada karsiligi yazilmazsa
// derleme hata verir, sessizce baska bir bicime dusmez.
export const locales: Record<Language, string> = { tr: 'tr-TR', en: 'en-US' }

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

// Varsayilan null, provider disinda cagrilan hook bunu gorup acik bir hata versin diye
export const LanguageContext = createContext<LanguageContextValue | null>(null)

// Provider disinda sessizce null donmek yerine hata verir, boylece eksik
// provider ilk render'da fark edilir.
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage, LanguageProvider disinda cagrildi')
  return ctx
}
