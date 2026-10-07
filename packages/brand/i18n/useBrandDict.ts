/*
file: useBrandDict.ts
importable: useBrandDict

Ust bar, alt bilgi ve menu etiketleri gibi butun sitelerde ayni kalan metinler.
Sayfaya ozel metinler burada degil, sitenin kendi sozlugunde durur.

description: PaktLabs sitelerinin ortak metinlerini aktif dilde donduren hook.
*/

import { createDictHook } from './createDictHook'
import en from './en.json'
import tr from './tr.json'

export const useBrandDict = createDictHook({ tr, en })
