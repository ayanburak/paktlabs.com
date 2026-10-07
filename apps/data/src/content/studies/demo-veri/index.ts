/*
file: index.ts
importable: demoVeri

description: Demo Veri calismasinin dilden bagimsiz alanlarini ve iki dilin metnini birlestiren modul.
*/

import type { Study } from '../types'

import { en, sourceEn } from './en'
import { sourceTr, tr } from './tr'

export const demoVeri: Study = {
  slug: 'demo-veri',
  number: '01',
  year: 2026,
  tags: ['quality', 'machineLearning'],
  text: { tr, en },
  source: { tr: sourceTr, en: sourceEn },
}
