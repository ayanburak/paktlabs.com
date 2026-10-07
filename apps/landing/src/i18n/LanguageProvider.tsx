/*
file: LanguageProvider.tsx
importable: LanguageProvider

Aktif dili tutar, tercihi localStorage'a yazar ve sayfanin dil bilgilerini
gunceller. Bu dosya sadece bilesen export eder, ortak tip ve sozlukler
context.ts'te durur.

description: Aktif dili ve dil degistirme fonksiyonunu bilesen agacina dagitan provider.
*/

// NOTE: sunucu tarafi geoip yonlendirmesi ve dil rotasi kurulmadi, ilk
// ziyarette varsayilan tr cunku tasarim tr uzerinden yapildi. Gercek rota
// altyapisi gelirse varsayilan dil sunucudan gelen bilgiyle degismeli.

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { dictionaries, LanguageContext } from './context'
import type { Language } from './context'

const STORAGE_KEY = 'pl_lang'
const DEFAULT_LANGUAGE: Language = 'tr'

// Tarayici depolamayi engellese de ilk render devam etmeli.
// Tercih okunamadiginda mevcut varsayilan dil kullanilir.
function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'tr' || stored === 'en' ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  // Ekrandaki dil, tercihin kalici olarak kaydedilebilmesine bagli degil.
  // Depolama engellendiginde de kullanici bu oturumda dil degistirebilir.
  function setLanguage(next: Language) {
    setLanguageState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Secim bellekte kalir. Sonraki ziyarette eski kayit veya varsayilan kullanilir.
    }
  }

  // <html lang>, sekme basligi ve aciklama aktif dile uymali. index.html ilk
  // yuklemede tr metnini tasiyor, JS calistirmayan botlar yalnizca onu gorur.
  // Ayri bir /en adresi olmadigi icin en metni indekslenecek diye varsayilmamali.
  useEffect(() => {
    const { meta } = dictionaries[language]
    document.documentElement.lang = language
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
