/*
file: illustrations.spec.ts

Ekrana uygun SVG'nin secilip digerinin hic indirilmedigini ag istekleri uzerinden
kontrol eder. Build ciktisindaki dosya adlari hero-mobile-AbC12345.svg gibi
hash tasir, karsilastirma hash'siz taban ad uzerinden yapilir. Ekran veya dil
degisince yeni gereken dosyanin inmesi beklenen davranistir, hata degildir.

description: Hero, disiplinler ve iletisim gorsellerinin ekran genisligine gore dogru dosyayi yukledigi testler.
*/

import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

// sayfa acilmadan once dinlemeye baslar, yuklenen her illustrasyonun taban adini toplar
function recordSvgRequests(page: Page) {
  const names = new Set<string>()
  page.on('request', (request) => {
    const match = new URL(request.url()).pathname.match(/\/assets\/(.+)-[\w-]{8}\.svg$/)
    if (match?.[1]) names.add(match[1])
  })
  return names
}

const cases = [
  {
    width: 390,
    height: 844,
    loads: ['hero-mobile', 'disciplines-mobile'],
    skips: ['hero', 'disciplines', 'phone', 'phone-mobile'],
  },
  {
    width: 1024,
    height: 1366,
    loads: ['hero', 'disciplines-mobile', 'phone'],
    skips: ['hero-mobile', 'disciplines', 'phone-mobile'],
  },
  {
    width: 1366,
    height: 1024,
    loads: ['hero', 'disciplines-mobile', 'phone'],
    skips: ['hero-mobile', 'disciplines', 'phone-mobile'],
  },
  {
    width: 1920,
    height: 1080,
    loads: ['hero', 'disciplines', 'phone'],
    skips: ['hero-mobile', 'disciplines-mobile', 'phone-mobile'],
  },
]

for (const { width, height, loads, skips } of cases) {
  test(`${width}x${height}: cold load requests only the matching illustrations`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    const names = recordSvgRequests(page)
    await page.goto('/', { waitUntil: 'networkidle' })

    for (const name of [...loads, 'data', 'auto', 'web']) expect(names, `${name} yuklenmeli`).toContain(name)
    for (const name of skips) expect(names, `${name} yuklenmemeli`).not.toContain(name)
  })
}

test('crossing the mobile threshold loads the mobile hero', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  const names = recordSvgRequests(page)
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(names).not.toContain('hero-mobile')

  await page.setViewportSize({ width: 390, height: 844 })
  await expect.poll(() => names.has('hero-mobile')).toBe(true)
  await expect(page.locator('#contact img:visible')).toHaveCount(0)
  expect(names).not.toContain('phone-mobile')
})
