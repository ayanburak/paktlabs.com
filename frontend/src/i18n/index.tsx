/*
file: index.tsx
importable: LanguageProvider, useLanguage, useDict

İki dilli icerigi tasiyan kucuk bir context, react-i18next gibi bir
kutuphaneye gerek yok cunku CLAUDE.md'nin kendi kurali boyle: az metinli
yerlerde elle yazilmis kucuk bir context yeterli sayiliyor. tr.json ve
en.json ayni sekle sahip olmak zorunda, biri digerinden farkli bir alan
eksigi/fazlaligiyla degisirse TypeScript derleme hatasi verir cunku Dict
tipi tr.json'dan cikariliyor.

description: Aktif dili ve o dile ait sozlugu bilesen agacina dagitan context ve iki kucuk hook.
*/

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import en from './en.json'
import tr from './tr.json'

export type Language = 'tr' | 'en'
type Dict = typeof tr

const dictionaries: Record<Language, Dict> = { tr, en }

// sunucu tarafi geoip yonlendirmesi henuz kurulmadi, bu yuzden ilk ziyarette
// varsayilan tr: mockup da zaten tr uzerinden tasarlandi. gercek geoip/rota
// altyapisi kurulunca bu varsayilan degil, sunucudan gelen dil kullanilacak.
const STORAGE_KEY = 'pl_lang'
const DEFAULT_LANGUAGE: Language = 'tr'

function readStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'tr' || stored === 'en' ? stored : DEFAULT_LANGUAGE
}

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  // hem state hem localStorage guncellenir, boylece sonraki ziyarette
  // manuel secim gecirisi cookie/localStorage'a yazilir kurali karsilanir
  function setLanguage(next: Language) {
    localStorage.setItem(STORAGE_KEY, next)
    setLanguageState(next)
  }

  // <html lang> ekran okuyucu ve arama motorlari icin dogru dili gormeli
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage, LanguageProvider disinda cagrildi')
  return ctx
}

// bilesenler tek tek key cozmek yerine dogrudan aktif dilin tum sozlugunu
// alir, ic ice alanlari kendi destructuring'iyle secer (ornek: const { hero } = useDict())
export function useDict(): Dict {
  const { language } = useLanguage()
  return dictionaries[language]
}
