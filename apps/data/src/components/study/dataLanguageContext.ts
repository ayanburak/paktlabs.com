/*
file: dataLanguageContext.ts
importable: DataLanguageContext, DataLanguageValue, useDataLanguage

Calisma sayfalarinda verinin hangi dilde gosterildigini tasir. Veri dili
calismanin dosyalarini, yani hesap tablolarini, kod dosyalarini ve terminal
ciktilarini belirler, sayfanin metni sitenin dilini izler. Deger
DataLanguageProvider tarafindan verilir, 00 numarali veri dili bolumu onu
degistirir.

description: Calisma sayfalarindaki veri dilini tasiyan context ve hook.
*/

// Provider bir .tsx dosyasi oldugu icin context ve hook brand'deki dil
// katmanindaki gibi ayri bir .ts dosyasinda duruyor.

import { createContext, useContext } from 'react'

import type { Language } from '@paktlabs/brand/i18n/language'

// original calismanin verisinin aslen yazildigi dil, language o an
// gosterilen dil.
export interface DataLanguageValue {
  original: Language
  language: Language
  setLanguage: (language: Language) => void
}

export const DataLanguageContext = createContext<DataLanguageValue | null>(null)

// Provider disinda sessizce bos donmek yerine hata verir, eksik provider ilk
// render'da fark edilir.
export function useDataLanguage(): DataLanguageValue {
  const ctx = useContext(DataLanguageContext)
  if (!ctx) throw new Error('useDataLanguage, DataLanguageProvider disinda cagrildi')
  return ctx
}
