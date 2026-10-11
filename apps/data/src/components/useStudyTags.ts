/*
file: useStudyTags.ts
importable: useStudyTags

Bir calismanin etiketlerini ve yilini TagList'in gosterecegi metinlere
cevirir. Veri sayfasindaki kart ve detay sayfasinin kapagi kullanir.

description: Calismanin etiketlerini ve yilini secili dilde metin listesine ceviren hook.
*/

import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'

import type { StudyListing } from '@/content/studies/types'

// Etiketlerin ekranda gorunen adlari brand sozlugunde, filtrenin ve
// landing'in Veri bandinin kullandigi adlarla ayni yerden gelir. Yil son
// kutucuk olarak etiketlerle ayni gorunur.
export function useStudyTags(study: StudyListing): string[] {
  const { dataTags } = useBrandDict()
  return [...study.tags.map((tag) => dataTags[tag]), String(study.year)]
}
