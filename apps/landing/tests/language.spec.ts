/*
file: language.spec.ts

Dil tercihinin okunmasi ve yazilmasi. Tercih pl_lang cerezinde, eski
ziyaretciler icin localStorage'da da durur, cerez once okunur. Tarayici
depolamayi ya da cerezi engellediginde veya depolama doldugunda sayfa acilmali
ve dil degistirici calismaya devam etmeli. Sayfa basligi, aciklama ve html
lang da aktif dili izlemeli.

description: Dil secimi, cerez ve localStorage hata durumlari ve sayfa bilgileri testleri.
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

// Testler localhost'ta calistigi icin cerez Domain'siz, yalnizca bu adrese yazilir.
async function storedCookie(page: Page) {
  return (await page.context().cookies()).find((cookie) => cookie.name === 'pl_lang')
}

// Cerezi engellenmis bir tarayici gibi davranir: okuma bos doner, yazma sessizce yok sayilir.
async function blockCookies(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(Document.prototype, 'cookie', {
      configurable: true,
      get: () => '',
      set: () => {},
    })
  })
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

  test('prefers the cookie over the older localStorage value', async ({ page, baseURL }) => {
    await page.context().addCookies([{ name: 'pl_lang', value: 'en', url: baseURL! }])
    await openHome(page, 'tr')
    await expectLanguage(page, 'en')
  })

  test('falls back to localStorage when the cookie is invalid', async ({ page, baseURL }) => {
    await page.context().addCookies([{ name: 'pl_lang', value: 'de', url: baseURL! }])
    await openHome(page, 'en')
    await expectLanguage(page, 'en')
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
    const cookie = await storedCookie(page)
    expect(cookie?.value).toBe('en')
    expect(cookie?.domain).toBe('localhost')
    expect(cookie?.sameSite).toBe('Lax')
    // bir yil, birkac saniyelik pay ile
    expect(cookie!.expires - Date.now() / 1000).toBeGreaterThan(365 * 24 * 3600 - 60)
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

  test('keeps the choice in the cookie when localStorage is full', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new DOMException('full', 'QuotaExceededError')
      }
    })
    await openHome(page)
    await switchTo(page, 'en')
    await expectLanguage(page, 'en')
    await page.reload()
    await expectLanguage(page, 'en')
  })

  test('still switches when cookies are blocked and keeps the choice in localStorage', async ({ page }) => {
    await blockCookies(page)
    await openHome(page)
    await switchTo(page, 'en')
    await expectLanguage(page, 'en')
    await page.reload()
    await expectLanguage(page, 'en')
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

  test('keeps the older stored value when cookies and new writes are blocked', async ({ page }) => {
    await blockCookies(page)
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
