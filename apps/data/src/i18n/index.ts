/*
file: index.ts
importable: useDict

data sitesine ozel metinlerin sozlugu. Ust bar, alt bilgi ve menu etiketleri
burada degil, @paktlabs/brand icindeki useBrandDict'te durur. Sozluk sayfa
sayfa bolunur, her rota kendi anahtarinin altindaki metinleri okur.

description: data sitesinin iki dilli sozlugunden aktif dile gore sozluk donduren useDict hook'u.
*/

import { createDictHook } from '@paktlabs/brand/i18n/createDictHook'

import en from './en.json'
import tr from './tr.json'

export const useDict = createDictHook({ tr, en })
