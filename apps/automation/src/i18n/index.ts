/*
file: index.ts
importable: useDict

automation sitesine ozel metinlerin sozlugu. Ust bar, alt bilgi, yapim asamasinda
bolumunun ortak metinleri ve bulunamadi sayfasi burada degil, @paktlabs/brand
icindeki useBrandDict'te durur. Burada yalnizca sitenin sekme basligi, ana
sayfanin basligi, aciklamasi ve cizim tarifi var.

description: automation sitesinin iki dilli sozlugunden aktif dile gore sozluk donduren useDict hook'u.
*/

import { createDictHook } from '@paktlabs/brand/i18n/createDictHook'

import en from './en.json'
import tr from './tr.json'

export const useDict = createDictHook({ tr, en })
