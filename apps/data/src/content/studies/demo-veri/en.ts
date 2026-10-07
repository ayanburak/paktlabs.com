/*
file: en.ts
importable: en

Demo Veri calismasinin Ingilizce metni. Turkce metinle ayni yapidadir, sayilar
Ingilizce yazim kuralina gore binlik ayraci virgulle yazilir.

description: Demo Veri calismasinin Ingilizce basligini, aciklamasini ve kunyesini tasiyan modul.
*/

import type { StudyText } from '../types'

export const en: StudyText = {
  title: 'Demo Data: product catalog deduplication',
  lede: 'A matching pipeline that finds the same product across a building materials distributor’s ERP records and three supplier catalogs, merges it, and updates itself every night.',
  kunye: [
    { label: 'Sector', value: 'Building materials and hardware distribution' },
    { label: 'Duration', value: '7 weeks' },
    { label: 'Input', value: '4 sources, 184,312 records' },
    { label: 'Delivered', value: 'Nightly pipeline and review screen' },
  ],
}
