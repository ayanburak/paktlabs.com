/*
file: css.spec.ts

Derlenmis CSS in eski tarayicilarda calisacak bicimde kaldigini kontrol eder.
Eski Safari range syntax i ve container sorgularini gecersiz sayip kuralin
tamamini sessizce yok sayar, mobil yerlesim bu yuzden hicbir hata vermeden
kaybolur. Test stylesheet leri dosya sisteminden degil sayfadan okur, boylece
canliya giden dosyalara bakar ve LIVE_URL ile yayindan sonra da calisir.

description: Sayfanin yukledigi CSS lerde range syntax ve container sorgusu olmadigini olcen test.
*/

import { expect, test } from '@playwright/test'

// width ya da height in yanina konan karsilastirma isareti range syntax tir.
// min-width gibi klasik yazimlarda isaretten once iki nokta gelir ve eslesmez.
const rangeQuery = /(?:\b(?:width|height)\s*[<>]|[<>]=?\s*(?:width|height)\b)/
const containerQuery = /@container\b/

test('the built stylesheets use only classic media queries', async ({ page }) => {
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
})
