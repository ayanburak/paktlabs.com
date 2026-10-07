/*
file: en.ts
importable: en, sourceEn

Demo Veri calismasinin Ingilizce metni. Turkce metinle ayni yapidadir, sayilar
Ingilizce yazim kuralina gore binlik ayraci virgulle yazilir.

description: Demo Veri calismasinin ve kod sayfasinin Ingilizce basligini, aciklamasini ve kunyesini tasiyan modul.
*/

import type { SourceText, StudyText } from '../types'

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

export const sourceEn: SourceText = {
  title: 'Demo Data: code and data samples',
  lede: 'Code excerpts and data samples from the product catalog deduplication work that were approved for sharing. The code is shortened for reading, the full files in the repository are longer.',
  kunye: [
    { label: 'Language', value: 'Python 3.12, SQL' },
    { label: 'Libraries', value: 'pandas, scikit-learn, rapidfuzz, networkx' },
    { label: 'Database', value: 'PostgreSQL 16' },
    { label: 'Shared', value: '8 code files, 5 data files' },
  ],
}
