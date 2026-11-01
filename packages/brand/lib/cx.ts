/*
file: cx.ts
importable: cx

description: Bosluk, false, undefined gibi degerleri eleyip class isimlerini tek bir string'de birlestiren kucuk yardimci.
*/

// Kosullu siniflar icin. Bos string de elenir, sonucta fazladan bosluk
// kalmaz.
export function cx(...classNames: Array<string | false | undefined | null>): string {
  return classNames.filter(Boolean).join(' ')
}
