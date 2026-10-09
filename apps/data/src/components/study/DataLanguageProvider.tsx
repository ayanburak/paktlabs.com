/*
file: DataLanguageProvider.tsx
importable: DataLanguageProvider

Calisma sayfalarinda verinin dilini tutar. Sayfa acildiginda verinin dili
sitenin dilidir, okur her zaman okuyabildigi hali gorur. 00 numarali veri
dili bolumu onu calismanin orijinal diline cevirebilir. Secim hicbir yere
kaydedilmez.

description: Calisma sayfalarinin veri dilini alt bilesenlere dagitan provider.
*/

import { type ReactNode, useEffect, useMemo, useState } from 'react'

import { type Language, useLanguage } from '@paktlabs/brand/i18n/language'

import { DataLanguageContext } from './dataLanguageContext'

interface DataLanguageProviderProps {
  original: Language
  children: ReactNode
}

// Secim hangi site dilinde yapildigiyla birlikte tutulur ve site dili her
// degistiginde silinir. Yalnizca saklamak yetmiyordu: okur siteyi baska dile
// alip geri dondugunde eski secim yeniden gecerli sayiliyordu. Silinene kadar
// gecen tek cizimde de eski secim site diliyle eslesmedigi icin kullanilmaz.
// Baska bir calismaya gecildiginde sayfa provider'i calismanin slug'iyla
// yeniden kurar, secim orada da sifirlanir.
export function DataLanguageProvider({ original, children }: DataLanguageProviderProps) {
  const { language: site } = useLanguage()
  const [choice, setChoice] = useState<{ site: Language; data: Language } | null>(null)

  useEffect(() => setChoice(null), [site])

  const language = choice?.site === site ? choice.data : site
  const value = useMemo(
    () => ({ original, language, setLanguage: (data: Language) => setChoice({ site, data }) }),
    [original, language, site],
  )

  return <DataLanguageContext.Provider value={value}>{children}</DataLanguageContext.Provider>
}
