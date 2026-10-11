/*
file: LanguageProvider.tsx
importable: LanguageProvider

Aktif dili tutar, tercihi butun paktlabs.com sitelerinin okudugu pl_lang
cerezine ve localStorage'a yazar, html lang ozniteligini gunceller. Landing'de
secilen dil disiplin sitelerinde de gecerli olur. Sekme basligi ve aciklama buradan degil, her sayfanin kendi
useDocumentMeta cagrisindan gelir, cunku bir sitede birden fazla rota olabilir.
Bu dosya sadece bilesen export eder, dil tipi ve context language.ts'te durur.

description: Aktif dili ve dil degistirme fonksiyonunu bilesen agacina dagitan provider.
*/

// NOTE: sunucu tarafi geoip yonlendirmesi ve dil rotasi kurulmadi, ilk
// ziyarette varsayilan tr cunku tasarim tr uzerinden yapildi. Gercek rota
// altyapisi gelirse varsayilan dil sunucudan gelen bilgiyle degismeli.
//
// NOTE: asil kayit cerez. localStorage 2026-10-11'e kadar tek kayitti, o
// gunden once dil secmis ziyaretcinin tercihi kaybolmasin diye cerez yoksa
// hala okunuyor ve yazilmaya devam ediyor. Uzun vadeli dil planindaki nginx
// yonlendirmesi de ayni pl_lang cerezine bakacak, adi bu yuzden degismemeli.

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { mainSiteHost } from '../content/site'
import { LanguageContext } from './language'
import type { Language } from './language'

const STORAGE_KEY = 'pl_lang'
const DEFAULT_LANGUAGE: Language = 'tr'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // bir yil, saniye

function isLanguage(value: string | null | undefined): value is Language {
  return value === 'tr' || value === 'en'
}

// Cerez butun paktlabs.com alt alan adlarina Domain ile acilir. Yerelde ve
// testlerde adres localhost oldugu icin Domain verilmez, cerez o adreste
// kalir. Secure yalnizca https'te eklenir, yerel http sunucusunda da yazilabilsin.
function cookieAttributes(): string {
  const { hostname, protocol } = location
  const shared = hostname === mainSiteHost || hostname.endsWith(`.${mainSiteHost}`)
  return [
    `Max-Age=${COOKIE_MAX_AGE}`,
    'Path=/',
    'SameSite=Lax',
    shared && `Domain=${mainSiteHost}`,
    protocol === 'https:' && 'Secure',
  ]
    .filter(Boolean)
    .join('; ')
}

function readCookie(): string | undefined {
  return document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${STORAGE_KEY}=`))
    ?.slice(STORAGE_KEY.length + 1)
}

// Once cerez, yoksa eski localStorage kaydi, o da yoksa varsayilan. Tarayici
// depolamayi engellese de ilk render devam etmeli. Cerez engellendiginde
// tarayici hata vermez, okuma bos doner, bu yuzden onun icin try yok.
function readStoredLanguage(): Language {
  const fromCookie = readCookie()
  if (isLanguage(fromCookie)) return fromCookie
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

// Ikisine birden yazar. localStorage yazilamazsa cerez yine de tercihi tasir.
function storeLanguage(next: Language) {
  document.cookie = `${STORAGE_KEY}=${next}; ${cookieAttributes()}`
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Cerez yazildiysa secim yine kalicidir, yazilamadiysa bellekte kalir.
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  // Ekrandaki dil, tercihin kalici olarak kaydedilebilmesine bagli degil.
  // Depolama engellendiginde de kullanici bu oturumda dil degistirebilir.
  function setLanguage(next: Language) {
    setLanguageState(next)
    storeLanguage(next)
  }

  // html lang aktif dile uymali, ekran okuyucular telaffuzu buna gore secer.
  // index.html ilk yuklemede tr ile gelir, JS calistirmayan botlar yalnizca onu gorur.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(() => ({ language, setLanguage }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
