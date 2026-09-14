/*
file: index.ts
importable: LanguageProvider, useLanguage, useDict, Language

Iki dilli icerik icin kucuk, elle yazilmis bir context. Landing az metinli
oldugu icin react-i18next gibi bir kutuphaneye gerek gorulmedi. Bilesenler
hep bu dosyadan import eder, context.ts, LanguageProvider.tsx ve hooks.ts
olarak bolunmesi disariya yansimaz.

description: Dil saglayicisini ve dil hook'larini disari acan giris dosyasi.
*/

export { LanguageProvider } from './LanguageProvider'
export { useDict, useLanguage } from './hooks'
export type { Language } from './context'
