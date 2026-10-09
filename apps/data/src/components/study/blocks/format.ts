/*
file: format.ts
importable: formatValue, sequenceNumber, fileText, formatSize

description: Sekil ve tablolardaki sayilari, sira numaralarini ve dosya bilgilerini yazan yardimcilar.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

// Turkcede yuzde isareti sayidan once gelir ve ondalik ayrac virguldur,
// Ingilizcede isaret sonra gelir ve ayrac noktadir: %0,1 ve 0.1%. decimals
// verilen sayi kadar ondalik hane yazilir, boylece ayni seride 2,0 ile 1,9
// ayni genislikte durur.
export function formatValue(value: number, unit: 'percent' | 'count', decimals: number, language: Language): string {
  const number = new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
  if (unit === 'count') return number
  return language === 'tr' ? `%${number}` : `${number}%`
}

// Bolumler, icindekiler ve kararlar ayni iki haneli numarayi gosterir, bicim
// burada tek yerde durur ki birbirinden ayrismasinlar. Sira sifirdan baslar,
// numara birden: ilk oge 01.
export function sequenceNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}

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
  const value = new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(bytes / 1024)
  return `${value} KB`
}
