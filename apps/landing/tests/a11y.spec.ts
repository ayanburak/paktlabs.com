/*
file: a11y.spec.ts

Erisilebilirlik davranislari: menu etiketleri, dil dugmelerinin secili durumu,
mobil menunun klavye davranisi, baslik sirasi, landmark yapisi ve klavye
odaginin her elemanda gorunur olmasi. Otomatik bir kural tarayicisi degil,
ekran okuyucuyla gercek test yerine gecmez.

description: Header, mobil menu, sayfa yapisi ve klavye odagi erisilebilirlik testleri.
*/

import { expect, test } from '@playwright/test'

import { dict, languages, openHome } from './support'

for (const lang of languages) {
  const { a11y } = dict[lang]
  const other = lang === 'tr' ? 'en' : 'tr'

  test(`${lang}: menu labels and language buttons`, async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await openHome(page, lang)

    const navs = page.locator('header nav')
    await expect(navs).toHaveCount(2)
    for (const nav of await navs.all()) await expect(nav).toHaveAttribute('aria-label', a11y.mainMenu)
    await expect(page.locator('footer nav')).toHaveAttribute('aria-label', a11y.footerMenu)

    const desktopNav = navs.first()
    await expect(desktopNav.getByRole('button', { name: lang.toUpperCase() })).toHaveAttribute('aria-pressed', 'true')
    await expect(desktopNav.getByRole('button', { name: other.toUpperCase() })).toHaveAttribute('aria-pressed', 'false')

    // ayrac gorunuyor ama ekran okuyucu agacinda metin olarak yer almamali
    expect(await desktopNav.ariaSnapshot()).not.toMatch(/- text: \//)

    await desktopNav.getByRole('button', { name: other.toUpperCase() }).click()
    await expect(desktopNav).toHaveAttribute('aria-label', dict[other].a11y.mainMenu)
    await expect(page.locator('footer nav')).toHaveAttribute('aria-label', dict[other].a11y.footerMenu)
    await expect(desktopNav.getByRole('button', { name: other.toUpperCase() })).toHaveAttribute('aria-pressed', 'true')
  })

  test(`${lang}: mobile menu keyboard behaviour`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await openHome(page, lang)

    const burger = page.locator('header button[aria-expanded]')
    const panelId = await burger.getAttribute('aria-controls')
    const panel = page.locator(`[id="${panelId}"]`)
    await expect(panel).toHaveCount(1)
    await expect(burger).toHaveAttribute('aria-label', a11y.openMenu)

    // kapali paneldeki linkler Tab sirasina girmemeli: logodan sonra hamburger gelir
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

    await page.keyboard.press('Escape')
    await expect(burger).toHaveAttribute('aria-expanded', 'false')

    // Paneldeki butun baglantilar artik sayfanin disina gidiyor. Tarayicinin
    // gitmesi durdurulur, React'in tiklama isleyicisi yine calisir ve panelin
    // kapandigi gorulur.
    await burger.click()
    await panel.evaluate((el) => el.addEventListener('click', (event) => event.preventDefault()))
    await panel.locator('a[href="https://paktlabs.com/contact"]').click()
    await expect(burger).toHaveAttribute('aria-expanded', 'false')
  })
}

test('heading order and landmarks', async ({ page }) => {
  await openHome(page)
  const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) => els.map((el) => el.tagName))
  // hero, biz kimiz, ne yapiyoruz ve kartlari, kabul ettigimiz isler ve bantlari, iletisim
  expect(levels).toEqual(['H1', 'H2', 'H2', 'H3', 'H3', 'H3', 'H2', 'H3', 'H3', 'H3', 'H2'])

  await expect(page.locator('main')).toHaveCount(1)
  await expect(page.locator('main :is(h1, h2, h3)')).toHaveCount(levels.length)
  await expect(page.locator('body header, body footer')).toHaveCount(2)
  await expect(page.locator('main header, main footer')).toHaveCount(0)

  await expect(page.locator('#disiplinler picture img')).toHaveAttribute('alt', dict.tr.disciplines.artAlt)
  for (const img of await page.locator('main img:not(#disiplinler img)').all()) {
    await expect(img).toHaveAttribute('alt', '')
    await expect(img).toHaveAttribute('aria-hidden', 'true')
  }
})

test('keyboard focus is visible on every focusable element', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await openHome(page)

  const focused: string[] = []
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab')
    if (await page.evaluate(() => document.activeElement === document.body)) break

    // odak ekrana kaydirinca reveal animasyonu baslar, bitince eleman gorunur olmali.
    // header linkleri tasarimda 0.7 opaklikta duruyor, esik bu yuzden 0.7
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
      const rect = el.getBoundingClientRect()
      return {
        label: (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().split('\n')[0],
        outline: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2,
        inView: rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
      }
    })
    expect(info.outline, `${info.label} odak cercevesi`).toBe(true)
    expect(info.inView, `${info.label} ekranda`).toBe(true)
    focused.push(info.label)
  }
  // dongu erken kirilmadi, sayfanin sonundaki footer linkine kadar gelindi
  expect(focused.at(-1)).toBe(dict.tr.nav.web)
})
