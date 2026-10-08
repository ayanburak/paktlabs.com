/*
file: studyData.ts
importable: StudyDataContext, StudyDataValue, useStudyData

Detay sayfasinda verinin hangi dilde gosterildigini ve calismanin CSV
dosyalarini tasir. Hesap tablolari, kac kutunun icinde olurlarsa olsunlar,
bunu useStudyData ile dogrudan okur. Kapaktaki not verinin dilini buradan
degistirir. Deger StudyDataProvider tarafindan verilir.

description: Detay sayfasindaki veri dilini ve CSV dosyalarini tasiyan context ve hook.
*/

// Provider bir .tsx dosyasi oldugu icin context ve hook brand'deki dil
// katmanindaki gibi ayri bir .ts dosyasinda duruyor.

import { createContext, useContext } from 'react'

import type { Language } from '@paktlabs/brand/i18n/language'

import type { Localized } from '@/content/studies/types'

export interface StudyDataValue {
  original: Language
  language: Language
  setLanguage: (language: Language) => void
  csv: Localized<Record<string, string>>
}

export const StudyDataContext = createContext<StudyDataValue | null>(null)

// Provider disinda sessizce bos donmek yerine hata verir, eksik provider ilk
// render'da fark edilir.
export function useStudyData(): StudyDataValue {
  const ctx = useContext(StudyDataContext)
  if (!ctx) throw new Error('useStudyData, StudyDataProvider disinda cagrildi')
  return ctx
}
