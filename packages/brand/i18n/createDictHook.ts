/*
file: createDictHook.ts
importable: createDictHook

Her site kendi tr ve en sozlugunu bu fonksiyona verir, donen hook'u
bilesenlerde useDict olarak kullanir. Sozlugun tipi tr'den cikarilir, en'de
eksik ya da farkli tipte bir alan olursa TypeScript derleme hatasi verir.

    export const useDict = createDictHook({ tr, en })
    const { hero } = useDict()

description: Bir sitenin iki dilli sozlugunden aktif dile gore sozluk donduren hook'u ureten fonksiyon.
*/

import { useLanguage } from './language'

// NoInfer, tipin yalnizca tr'den cikarilmasini sagliyor. Olmasa TypeScript
// iki sozlugun ortak tipini arar ve en'deki eksik bir alani hata yerine
// istege bagli bir alan gibi kabul edebilir.
export function createDictHook<Dict>(dictionaries: { tr: Dict; en: NoInfer<Dict> }) {
  return function useDict(): Dict {
    const { language } = useLanguage()
    return dictionaries[language]
  }
}
