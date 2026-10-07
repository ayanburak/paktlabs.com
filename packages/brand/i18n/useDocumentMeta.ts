/*
file: useDocumentMeta.ts
importable: useDocumentMeta

Sayfanin baslik ve aciklamasini sayfanin kendisi bildirir, dil degisince
yeni metinler gelir ve hook belgeyi gunceller.

description: Sekme basligini ve meta aciklamasini verilen metinlerle guncelleyen hook.
*/

import { useEffect } from 'react'

// index.html ilk yuklemede tr basligi ve aciklamasini tasiyor, JS calistirmayan
// botlar yalnizca onu gorur. Ayri bir /en adresi olmadigi icin en metni
// indekslenecek diye varsayilmamali.
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
