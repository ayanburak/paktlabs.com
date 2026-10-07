/*
file: hooks.ts
importable: useLanguage, useDict

description: Bilesenlerin aktif dili ve o dilin sozlugunu okudugu iki kucuk hook.
*/

import { useContext } from 'react'

import { dictionaries, LanguageContext } from './context'
import type { Dict, LanguageContextValue } from './context'

// Provider disinda sessizce null donmek yerine hata verir, boylece eksik
// provider ilk render'da fark edilir.
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage, LanguageProvider disinda cagrildi')
  return ctx
}

// Bilesenler tek tek anahtar cozmek yerine aktif dilin tum sozlugunu alir ve
// ihtiyac duydugu alani kendisi secer, ornegin const { hero } = useDict() gibi.
export function useDict(): Dict {
  const { language } = useLanguage()
  return dictionaries[language]
}
