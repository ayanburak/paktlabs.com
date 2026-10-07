/*
file: language.spec.ts

Dil tercihinin okunmasi ve yazilmasi. Tarayici depolamayi engellediginde veya
depolama doldugunda sayfa acilmali ve dil degistirici calismaya devam etmeli.
Sayfa basligi, aciklama ve html lang da aktif dili izlemeli.

description: Dil secimi, localStorage hata durumlari ve sayfa bilgileri testleri.
*/

import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

import { dict, languages, openHome } from './support'
import type { Language } from './support'

// Ekranda gercekten o dilin gorundugunu, html lang'in ve sayfa bilgilerinin
// ayni dile uydugunu birlikte kontrol eder.
async function expectLanguage(page: Page, lang: Language) {
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
  await expect(page.locator('h1')).toContainText(dict[lang].hero.lines[0])
  await expect(page).toHaveTitle(dict[lang].meta.title)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', dict[lang].meta.description)
  await expect(page.locator('meta[name="description"]')).toHaveCount(1)
}

async function switchTo(page: Page, lang: Language) {
  await page.locator('header nav').first().getByRole('button', { name: lang.toUpperCase() }).click()
}

test.describe('reading the stored language', () => {
  test('falls back to tr when nothing is stored', async ({ page }) => {
    await openHome(page)
    await expectLanguage(page, 'tr')
  })

  for (const lang of languages) {
    test(`uses stored ${lang}`, async ({ page }) => {
      await openHome(page, lang)
      await expectLanguage(page, lang)
    })
  }

  test('ignores an invalid stored value', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('pl_lang', 'de'))
    await openHome(page)
    await expectLanguage(page, 'tr')
  })

  test('opens in tr when getItem throws', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.getItem = () => {
        throw new DOMException('blocked', 'SecurityError')
      }
    })
    await openHome(page)
    await expectLanguage(page, 'tr')
  })

  test('opens in tr when localStorage itself is not accessible', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('blocked', 'SecurityError')
        },
      })
    })
    await openHome(page)
    await expectLanguage(page, 'tr')
  })
})

test.describe('writing the language choice', () => {
  test('persists the choice across reloads', async ({ page }) => {
    await openHome(page)
    await switchTo(page, 'en')
    await expectLanguage(page, 'en')
    expect(await page.evaluate(() => localStorage.getItem('pl_lang'))).toBe('en')
    await page.reload()
    await expectLanguage(page, 'en')
  })

  test('switches back and forth without losing sync', async ({ page }) => {
    await openHome(page)
    for (const lang of ['en', 'tr', 'en', 'tr'] as const) {
      await switchTo(page, lang)
      await expectLanguage(page, lang)
    }
  })

  test('still switches when storage is full, choice is lost on reload', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new DOMException('full', 'QuotaExceededError')
      }
    })
    await openHome(page)
    await switchTo(page, 'en')
    await expectLanguage(page, 'en')
    await page.reload()
    await expectLanguage(page, 'tr')
  })

  test('still switches when all storage access is blocked', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('blocked', 'SecurityError')
        },
      })
    })
    await openHome(page)
    await switchTo(page, 'en')
    await expectLanguage(page, 'en')
  })

  test('keeps the older stored value when a new write is blocked', async ({ page }) => {
    await openHome(page)
    await page.evaluate(() => localStorage.setItem('pl_lang', 'en'))
    await page.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new DOMException('blocked', 'SecurityError')
      }
    })
    await page.reload()
    await expectLanguage(page, 'en')
    await switchTo(page, 'tr')
    await expectLanguage(page, 'tr')
    await page.reload()
    await expectLanguage(page, 'en')
  })

  test('switches from the mobile panel', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openHome(page)
    await page.locator('header button[aria-expanded]').click()
    const panel = page.locator('header > nav')
    await panel.getByRole('button', { name: 'EN' }).click()
    await expectLanguage(page, 'en')
    await page.reload()
    await expectLanguage(page, 'en')
  })
})

test('static html carries the default tr metadata before JS runs', async ({ request }) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('<html lang="tr">')
  expect(html).toContain(`<title>${dict.tr.meta.title}</title>`)
  expect(html).toContain(`content="${dict.tr.meta.description}"`)
})
