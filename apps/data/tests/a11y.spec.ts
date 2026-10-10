/*
file: a11y.spec.ts

data'nin dort sayfa turunde, yani veri sayfasi, calisma detay sayfasi, kod
sayfasi ve bulunamadi sayfasinda, ekran okuyucunun dayandigi yapiyi ve
baglantilari denetler. Tek bir h1, atlanmayan baslik seviyeleri, tek main,
ust bar ve alt bilgi, ust bardaki adreslerin dogru yere gitmesi ve sayfada bos
ya da yeni sekmede acilan baglanti kalmamasi. Adresler bilerek elle yazili.
Ayrica mobil menunun klavyeyle acilip Escape ile kapanmasini ve Tab ile
gezilen her elemanda odak cercevesinin gorunmesini olcer. Otomatik bir kural
tarayicisi degil, ekran okuyucuyla gercek test yerine gecmez.

description: data sitesinin baslik sirasi, sayfa bolgeleri, baglanti ve klavye testleri.
*/

import { expect, test } from '@playwright/test'

import { dict, languages, openPage } from './support'

const pages = ['/', '/work/demo-veri', '/work/demo-veri/source', '/yok']

const headerLinks = [
  'https://web.paktlabs.com',
  'https://automation.paktlabs.com',
  'https://data.paktlabs.com',
  'https://paktlabs.com/contact',
]

for (const path of pages) {
  test(`${path}: headings, landmarks and links`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await openPage(page, path, 'tr')

    // Seviye bir onceki basliktan en fazla bir derin olabilir, h2'den h4'e
    // atlamak ekran okuyucuda bolum yapisini bozar.
    const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) =>
      els.map((el) => Number(el.tagName[1])),
    )
    expect(levels.filter((level) => level === 1)).toHaveLength(1)
    levels.reduce((prev, level) => {
      expect(level, `h${prev} sonrasi h${level}`).toBeLessThanOrEqual(prev + 1)
      return level
    })

    await expect(page.locator('main')).toHaveCount(1)
    // Bolumlerin kendi header etiketleri var, onlar sayfa bolgesi sayilmaz.
    // Sayilan ust bar ve alt bilginin rolleri.
    await expect(page.getByRole('banner')).toHaveCount(1)
    await expect(page.getByRole('contentinfo')).toHaveCount(1)

    const hrefs = await page.locator('header nav').first().locator('a').evaluateAll((els) =>
      els.map((el) => el.getAttribute('href')),
    )
    expect(hrefs).toEqual(headerLinks)

    await expect(page.locator('a:not([href]), a[href=""], a[href="#"]')).toHaveCount(0)
    await expect(page.locator('a[target="_blank"]')).toHaveCount(0)
  })
}

// Menu brand paketinden geliyor ve landing'de de olculuyor, ama data'da ust
// barin altinda kendi sayfa cercevesi var. Odak sirasinin ve panelin burada da
// ayni davrandigi ayrica gorulur.
for (const lang of languages) {
  const { a11y } = dict[lang]

  test(`${lang}: mobile menu keyboard behaviour`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openPage(page, '/', lang)

    const burger = page.locator('header button[aria-expanded]')
    const panel = page.locator(`[id="${await burger.getAttribute('aria-controls')}"]`)
    await expect(panel).toHaveCount(1)
    await expect(burger).toHaveAttribute('aria-label', a11y.openMenu)

    // kapali paneldeki linkler Tab sirasina girmemeli, logodan sonra hamburger gelir
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await expect(burger).toBeFocused()

    await page.keyboard.press('Enter')
    await expect(burger).toHaveAttribute('aria-expanded', 'true')
    await expect(burger).toHaveAttribute('aria-label', a11y.closeMenu)
    await page.keyboard.press('Tab')
    expect(await panel.evaluate((el) => el.contains(document.activeElement))).toBe(true)

    await page.keyboard.press('Escape')
    await expect(burger).toHaveAttribute('aria-expanded', 'false')
    await expect(panel).toBeHidden()
    await expect(burger).toBeFocused()
  })
}

// Detay sayfasinda icindekiler, acilir kutular ve bolum baglantilari, kod
// sayfasinda kopyalama ve indirme dugmeleri var. Her biri Tab ile gezildiginde
// odak cercevesi gorunmeli ve eleman ekrana gelmeli. Yapiskan icindekiler bari
// ya da ust bar odaklanan elemanin ustune binerse ekranda olcusu bunu yakalamaz,
// yalnizca elemanin goruntu alaninda oldugunu olcer.
for (const path of pages) {
  test(`${path}: keyboard focus is visible on every focusable element`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await openPage(page, path, 'tr')

    let last = ''
    for (let i = 0; i < 300; i++) {
      await page.keyboard.press('Tab')
      if (await page.evaluate(() => document.activeElement === document.body)) break

      // odak ekrana kaydirinca reveal animasyonu baslar, bitince eleman gorunur
      // olmali. Ust bar linkleri tasarimda 0.7 opaklikta duruyor, esik bu yuzden 0.7
      await expect
        .poll(() =>
          page.evaluate(() => {
            let opacity = 1
            for (let n = document.activeElement; n; n = n.parentElement) {
              opacity = Math.min(opacity, Number(getComputedStyle(n).opacity))
            }
            return opacity
          }),
        )
        .toBeGreaterThanOrEqual(0.7)

      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement
        const style = getComputedStyle(el)
        return {
          label: (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().split('\n')[0],
          outline: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2,
          inFooter: !!el.closest('footer'),
        }
      })
      expect(info.outline, `${info.label} odak cercevesi`).toBe(true)

      // brand'de sayfa kaydirmasi yumusak, tarayici odaklanan elemana kayarak
      // gider. Konum kayma bitene kadar tekrar olculur, tek seferlik bir olcum
      // elemani hala ekranin disinda yakalardi.
      await expect
        .poll(
          () =>
            page.evaluate(() => {
              const rect = document.activeElement!.getBoundingClientRect()
              return rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth
            }),
          { message: `${info.label} ekranda` },
        )
        .toBe(true)
      last = info.inFooter ? 'footer' : info.label
    }
    // dongu sinira takilmadi, sayfanin sonundaki alt bilgiye kadar gelindi
    expect(last).toBe('footer')
  })
}
