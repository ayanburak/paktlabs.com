/*
file: useStudyTags.ts
importable: useStudyTags

Bir calismanin etiketlerini ve yilini TagList'in gosterecegi metinlere
cevirir. Veri sayfasindaki kart ve detay sayfasinin kapagi kullanir.

description: Calismanin etiketlerini ve yilini secili dilde metin listesine ceviren hook.
*/

import type { StudyListing } from '@/content/studies/types'
import { useDict } from '@/i18n'

// Etiketlerin ekranda gorunen adlari sozlukte, filtrenin kullandigi adlarla
// ayni yerden gelir. Yil son kutucuk olarak etiketlerle ayni gorunur.
export function useStudyTags(study: StudyListing): string[] {
  const { home } = useDict()
  return [...study.tags.map((tag) => home.works.tags[tag]), String(study.year)]
}
