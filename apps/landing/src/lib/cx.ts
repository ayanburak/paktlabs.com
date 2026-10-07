/*
file: cx.ts
importable: cx

description: Bosluk, false, undefined gibi degerleri eleyip class isimlerini tek bir string'de birlestiren kucuk yardimci.
*/

export function cx(...classNames: Array<string | false | undefined | null>): string {
  return classNames.filter(Boolean).join(' ')
}
