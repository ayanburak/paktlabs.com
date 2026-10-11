/*
file: format.ts
importable: localeFor, formatValue

description: Sekil ve tablolardaki sayilari yazan ve dile gore yerel ayari secen yardimcilar.
*/

import type { Language } from '@paktlabs/brand/i18n/language'

// Intl'in bekledigi yerel ayar kodu. Sayi bicimi bunu kullanan her yerde
// ayni kalsin diye dilden yerel ayara gecis burada tek yerde durur.
export function localeFor(language: Language): string {
  return language === 'tr' ? 'tr-TR' : 'en-US'
}

// Turkcede yuzde isareti sayidan once gelir ve ondalik ayrac virguldur,
// Ingilizcede isaret sonra gelir ve ayrac noktadir: %0,1 ve 0.1%. decimals
// verilen sayi kadar ondalik hane yazilir, boylece ayni seride 2,0 ile 1,9
// ayni genislikte durur.
export function formatValue(value: number, unit: 'percent' | 'count', decimals: number, language: Language): string {
  const number = new Intl.NumberFormat(localeFor(language), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
  if (unit === 'count') return number
  return language === 'tr' ? `%${number}` : `${number}%`
}
