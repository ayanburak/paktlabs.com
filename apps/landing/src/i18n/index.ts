/*
file: index.ts
importable: useDict

Landing'e ozel metinlerin sozlugu. Ust bar, alt bilgi ve menu etiketleri gibi
butun sitelerde ortak olan metinler burada degil, @paktlabs/brand icindeki
useBrandDict'te durur. Dil secimi de paketteki LanguageProvider'dan gelir.
Landing az metinli oldugu icin react-i18next gibi bir kutuphaneye gerek
gorulmedi.

description: Landing'in iki dilli sozlugunden aktif dile gore sozluk donduren useDict hook'u.
*/

import { createDictHook } from '@paktlabs/brand/i18n/createDictHook'

import en from './en.json'
import tr from './tr.json'

export const useDict = createDictHook({ tr, en })
