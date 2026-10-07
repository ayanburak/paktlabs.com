/*
file: LanguageProvider.tsx
importable: LanguageProvider

Aktif dili tutar, tercihi localStorage'a yazar ve html lang ozniteligini
gunceller. Sekme basligi ve aciklama buradan degil, her sayfanin kendi
useDocumentMeta cagrisindan gelir, cunku bir sitede birden fazla rota olabilir.
Bu dosya sadece bilesen export eder, dil tipi ve context language.ts'te durur.

description: Aktif dili ve dil degistirme fonksiyonunu bilesen agacina dagitan provider.
*/

// NOTE: sunucu tarafi geoip yonlendirmesi ve dil rotasi kurulmadi, ilk
// ziyarette varsayilan tr cunku tasarim tr uzerinden yapildi. Gercek rota
// altyapisi gelirse varsayilan dil sunucudan gelen bilgiyle degismeli.
//
// NOTE: tercih localStorage'da tutuldugu icin origin'e bagli. Landing'de
// secilen dil disiplin subdomainlerine gecmez, her site kendi kaydini tutar.

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { LanguageContext } from './language'
import type { Language } from './language'

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

  // html lang aktif dile uymali, ekran okuyucular telaffuzu buna gore secer.
  // index.html ilk yuklemede tr ile gelir, JS calistirmayan botlar yalnizca onu gorur.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
