/*
file: scroll.spec.ts

Site ici gecislerde kaydirma konumunu kontrol eder. Konumu React Router'in
ScrollRestoration'i kurar. Calisma sayfalarinin dosyalari rota
yukleyicisinde indirildigi icin konum ancak sayfa tam boyuyla cizildikten
sonra kurulmalidir. Ileri gidilen sayfa en ustten acilmali, geri donulen
sayfa kalinan yere donmeli, bolum baglantilari ister ayni sayfada ister
dogrudan acilan bir adreste olsun bolume gitmeli. Dosyalar sayfa cizildikten
sonra gelmeye baslarsa ilk kirilacak olanlar geri donus ve dogrudan bolum
testleridir.

description: data sitesinde sayfa gecislerindeki kaydirma konumu testleri.
*/

import { expect, type Page, test } from '@playwright/test'
import { required } from '@paktlabs/config/testing/support'

import { openPage } from './support'

// Atlanan bolumun ust kenari, ust bar payi dahil, ekranin ustunden en fazla
// bu kadar piksel asagida durmali.
const CHAPTER_TOP_MAX = 100

test.use({ reducedMotion: 'reduce' })

test('a study opened from a card starts at the top and back returns to the card', async ({ page }) => {
  await openPage(page, '/', 'tr')
  const card = page.locator('a[href="/work/demo-data"]').first()
  await card.scrollIntoViewIfNeeded()
  const before = await page.evaluate(() => window.scrollY)
  expect(before).toBeGreaterThan(0)

  await card.click()
  await expect(page).toHaveURL('/work/demo-data')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

  await page.goBack()
  await expect(page).toHaveURL('/')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(before)
})

test('a contents link still moves to its chapter on the same page', async ({ page }) => {
  await openPage(page, '/work/demo-data', 'tr')
  const link = page.locator('nav a[href^="#"]').nth(2)
  const id = required(await link.getAttribute('href'), 'icindekiler linkinin href i').slice(1)

  await link.click()
  await expect(page).toHaveURL(`/work/demo-data#${id}`)
  await expect
    .poll(() => chapterTop(page, id))
    .toBeLessThan(CHAPTER_TOP_MAX)
})

// Fontlar bilerek geciktirilir. Bolume ilk kaydirma fontlar gelmeden olur,
// fontlar gelince ustteki metinler yeniden dizilir. Root'taki hizalama
// olmasa baslik ekranin ustune tasar.
async function slowFonts(page: Page) {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    await route.continue()
  })
}

function chapterTop(page: Page, id: string) {
  return page.evaluate((target) => {
    const chapter = document.getElementById(target)
    if (!chapter) throw new Error(`${target} bolumu bulunamadi`)
    return Math.round(chapter.getBoundingClientRect().top)
  }, id)
}

test('a study address with a chapter opens at that chapter, even when the fonts arrive late', async ({ page }) => {
  await slowFonts(page)
  await openPage(page, '/work/demo-data#decisions', 'tr')
  await page.evaluate(() => document.fonts.ready)
  await expect.poll(() => chapterTop(page, 'decisions')).toBeGreaterThanOrEqual(0)
  await expect.poll(() => chapterTop(page, 'decisions')).toBeLessThan(CHAPTER_TOP_MAX)
})

// Okur fontlar gelmeden kendisi kaydirirsa sayfa onu bolume geri cekmemeli.
test('the chapter alignment stops once the reader scrolls', async ({ page }) => {
  await slowFonts(page)
  await page.addInitScript(() => localStorage.setItem('pl_lang', 'tr'))
  await page.goto('/work/demo-data#decisions', { waitUntil: 'domcontentloaded' })
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000)
  await page.mouse.move(600, 400)
  await page.mouse.wheel(0, -1500)
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  await expect.poll(() => chapterTop(page, 'decisions')).toBeGreaterThan(800)
})

// Calisma sayfasinin ortasindan kod sayfasina gecilir ve geri donulur. Iki
// sayfa da dosyalarini yukleyicide aldigi icin geri donuste sayfa yeniden
// yuklenir, konum ancak sayfa tam boyuna ulastiginda dogru kurulabilir.
test('back from the source page returns to the same place on the study page', async ({ page }) => {
  await openPage(page, '/work/demo-data', 'tr')
  const card = page.locator('a[href="/work/demo-data/source"]')
  await card.scrollIntoViewIfNeeded()
  const before = await page.evaluate(() => window.scrollY)
  expect(before).toBeGreaterThan(2000)

  await card.click()
  await expect(page).toHaveURL('/work/demo-data/source')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

  await page.goBack()
  await expect(page).toHaveURL('/work/demo-data')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(before)
})
