/*
file: StudyDataProvider.tsx
importable: StudyDataProvider

Detay sayfasinda verinin dilini tutar. Sayfa acildiginda verinin dili
sitenin dilidir, okur her zaman okuyabildigi hali gorur. Kapaktaki not onu
calismanin orijinal diline cevirebilir. Secim hicbir yere kaydedilmez.

description: Detay sayfasinin veri dilini ve CSV dosyalarini alt bilesenlere dagitan provider.
*/

import { type ReactNode, useMemo, useState } from 'react'

import { type Language, useLanguage } from '@paktlabs/brand/i18n/language'

import { studyData } from '@/content/studies/data'

import { StudyDataContext } from './studyData'

interface StudyDataProviderProps {
  slug: string
  original: Language
  children: ReactNode
}

// Secim hangi site dilinde yapildigiyla birlikte tutulur. Okur sitenin dilini
// degistirirse kayitli secim eskir ve veri dili yeni site diline doner. Baska
// bir calismaya gecildiginde provider calismanin slug'iyla yeniden kurulur,
// secim orada da sifirlanir.
export function StudyDataProvider({ slug, original, children }: StudyDataProviderProps) {
  const { language: site } = useLanguage()
  const [choice, setChoice] = useState<{ site: Language; data: Language } | null>(null)
  const csv = useMemo(() => studyData(slug), [slug])

  const language = choice?.site === site ? choice.data : site
  const value = useMemo(
    () => ({ original, language, setLanguage: (data: Language) => setChoice({ site, data }), csv }),
    [original, language, site, csv],
  )

  return <StudyDataContext.Provider value={value}>{children}</StudyDataContext.Provider>
}
