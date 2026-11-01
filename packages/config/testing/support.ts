/*
file: support.ts
importable: Language, languages, required, waitForAssets, expectClassicMediaQueries

Iki sitenin testlerinin ortak yardimcilari. dict gibi sozluk birlestirme ve
sayfa acma yardimcilari sitelere ozel kalir, cunku sitelerin kendi sozlukleri ve
rotalari var.

description: Iki sitenin testlerinin ortak dil listesi, varlik bekleme ve eski tarayici CSS denetimi.
*/

import { expect } from '@playwright/test'
import type { Page } from '@playwright/test'

export const languages = ['tr', 'en'] as const
export type Language = (typeof languages)[number]

// null ya da undefined donebilen bir degerin testte mutlaka var olmasi gerektigi
// yerde kullanilir. Yoksa neyin eksik oldugunu soyleyen bir hata verir, `!`
// ile susturmaz.
export function required<T>(value: T | null | undefined, what: string): T {
  if (value == null) throw new Error(`${what} bulunamadi`)
  return value
}

// Font ve SVG'ler yuklenmeden alinan olcum veya goruntu satir kirilimina ve
// gorsel yuksekligine gore degisebilir, o yuzden ikisi de acikca beklenir.
export async function waitForAssets(page: Page) {
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))))
}

// width ya da height in yanina konan karsilastirma isareti range syntax tir.
// min-width gibi klasik yazimlarda isaretten once iki nokta gelir ve eslesmez.
const rangeQuery = /(?:\b(?:width|height)\s*[<>]|[<>]=?\s*(?:width|height)\b)/
const containerQuery = /@container\b/

// Ana sayfanin yukledigi sitenin kendi stylesheet lerinde range syntax ve
// container sorgusu olmadigini denetler. Stylesheet ler dosya sisteminden degil
// sayfadan okunur, boylece canliya giden dosyalara bakilir ve LIVE_URL ile
// yayindan sonra da calisir.
export async function expectClassicMediaQueries(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' })

  // Google Fonts gibi baska bir kaynaktan gelen stylesheet ler sitenin kendi
  // CSS i degil, yalnizca ayni kaynaktakiler okunur
  const hrefs = await page.locator('link[rel="stylesheet"]').evaluateAll((links) =>
    links.map((link) => (link as HTMLLinkElement).href).filter((href) => new URL(href).origin === location.origin),
  )
  expect(hrefs.length).toBeGreaterThan(0)

  let mediaCount = 0
  for (const href of hrefs) {
    const response = await page.request.get(href)
    expect(response.ok(), href).toBe(true)
    const css = await response.text()

    mediaCount += css.split('@media').length - 1
    expect(css, `${href} has a range media query`).not.toMatch(rangeQuery)
    expect(css, `${href} has a container query`).not.toMatch(containerQuery)
  }
  // Hic media sorgusu okunmadiysa asil CSS i degil bos bir sey okunmus demektir
  expect(mediaCount).toBeGreaterThan(0)
}
