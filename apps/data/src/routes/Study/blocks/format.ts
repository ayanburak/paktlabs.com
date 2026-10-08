/*
file: format.ts
importable: formatValue

description: Sekil ve tablolardaki sayilari sitenin diline gore yazan yardimci.
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
