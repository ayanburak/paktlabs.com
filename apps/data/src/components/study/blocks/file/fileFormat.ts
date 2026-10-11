/*
file: fileFormat.ts
importable: fileText, formatSize

description: Kod ve veri dosyalarinin ekranda gosterilen metnini ve boyutunu hazirlayan yardimcilar.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

import { localeFor } from '../format'

// Dosyanin ekranda gosterilen metni. Windows satir sonlari tek satir sonuna
// cevrilir, dosyanin sonundaki satir sonu atilir, yoksa satir numaralari son
// bos satiri da sayardi. Satir sayisi bu metinden cikar.
export function fileText(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/\n$/, '')
}

// Dosya boyutu, bin yirmi dort baytin altinda bayt olarak, ustunde tek ondalikli
// KB olarak yazilir: 503 bayt, 1,2 KB. bytesWord sozlukten gelir.
export function formatSize(bytes: number, language: Language, bytesWord: string): string {
  if (bytes < 1024) return `${bytes} ${bytesWord}`
  const value = new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(bytes / 1024)
  return `${value} KB`
}
