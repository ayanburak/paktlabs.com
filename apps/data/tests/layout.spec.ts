/*
file: layout.spec.ts

Veri sayfasinin yerlesiminde kirilmamasi gereken iliskileri DOM olcumuyle
kontrol eder. Hero icin landing'in layout.spec.ts dosyasindaki olcumun data
karsiligidir, iki sitenin hero'su brand'deki ayni ortak yerlesimi kullanir.
Gorsel icin img kutusu olculur, SVG icinde bos kalan seffaf alan da cizim
gibi sayilir. Gorselin kendisi bu testte karsilastirilmaz.

description: Veri sayfasinda yatay tasmanin ve hero metni ile ciziminin yerlesim testleri.
*/

import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

import { languages, openPage } from './support'

// CSS'teki sayilar, her biri anlamini soyleyen adla burada toplanir.
// Bu genislik ve altinda mobil duzen gecerli, CSS max-width: 768px
const MOBILE_MAX_WIDTH = 768
// Hero basligi ile cizimi arasinda masaustunde en az bu kadar bosluk kalir
const HERO_MIN_GAP = 24
// Piksel yuvarlamasindan gelen kabul edilen sapma
const PIXEL_TOLERANCE = 1

// 768/769 CSS'teki tek mobil esigin iki yani, digerleri yaygin tablet ve
// masaustu olculeri
const sizes = [
  [390, 844],
  [768, 1024],
  [769, 1024],
  [1024, 1366],
  [1366, 1024],
  [1440, 900],
  [1680, 1050],
  [1920, 1080],
] as const

// Tum olcumler tek evaluate icinde toplanir. Yerlesim olcum sirasinda
// degismesin diye sayfa hareket azaltma tercihiyle acilir.
async function measure(page: Page) {
  return page.evaluate(() => {
    type Box = { left: number; right: number; top: number; bottom: number }
    const box = (el: Element): Box => el.getBoundingClientRect()
    const overlaps = (a: Box, b: Box) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom
    const centerOf = (b: Box) => (b.top + b.bottom) / 2
    // Beklenen eleman yoksa sessizce NaN olcmek yerine neyin eksik oldugunu soyler.
    const need = <T,>(value: T | null | undefined, what: string): T => {
      if (value == null) throw new Error(`olcum icin ${what} bulunamadi`)
      return value
    }

    const hero = need(document.querySelector('main > section'), 'hero')
    const title = need(hero.querySelector('h1'), 'hero basligi')
    const cta = need(hero.querySelector('.cta'), 'hero dugmesi')
    const art = box(need(hero.querySelector('figure img'), 'hero cizimi'))

    // ortalama alani header payindan sonra baslar, alt cizgiden once biter.
    // Iki deger de sayi olarak yazilmaz, hero'nun hesaplanmis stilinden
    // okunur. Header'in yuksekligi degisirse test kendiliginden ona uyar
    const heroStyle = getComputedStyle(hero)
    const heroBox = box(hero)
    const areaCenter =
      (heroBox.top + parseFloat(heroStyle.paddingTop) + heroBox.bottom - parseFloat(heroStyle.borderBottomWidth)) / 2

    // basligin kutusu yazinin kendisinden genis olabilir, cizime olan mesafe
    // yazinin sag kenarindan olculsun diye Range kutusu kullanilir
    const titleText = document.createRange()
    titleText.selectNodeContents(title)

    return {
      overflowX: document.documentElement.scrollWidth - innerWidth,
      gap: art.left - titleText.getBoundingClientRect().right,
      ctaHit: overlaps(art, box(cta)),
      artCenter: centerOf(art) - areaCenter,
      // metin blogu ise eleman kutulariyla olculur. Basligin satir yuksekligi
      // fontun yazi alanindan kucuk oldugu icin Range kutusu eleman kutusunun
      // disina tasar, ortalamayi ise CSS eleman kutularina gore yapar
      textCenter: (box(title).top + box(cta).bottom) / 2 - areaCenter,
    }
  })
}

test.describe('responsive layout', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const lang of languages) {
    for (const [width, height] of sizes) {
      test(`${lang} ${width}x${height}`, async ({ page }) => {
        await page.setViewportSize({ width, height })
        await openPage(page, '/', lang)
        const m = await measure(page)

        expect(m.overflowX, 'yatay tasma').toBeLessThanOrEqual(0)

        // mobilde cizim metnin altina iner ve ortalama yoktur, bu iliskiler
        // yalniz masaustu duzeninde aranir
        if (width > MOBILE_MAX_WIDTH) {
          expect(m.gap, 'hero basligi ile cizim arasi').toBeGreaterThanOrEqual(HERO_MIN_GAP)
          expect(m.ctaHit, 'hero dugmesi cizimle cakisiyor').toBe(false)
          expect(Math.abs(m.artCenter), 'hero cizimi alanin dikey ortasinda').toBeLessThanOrEqual(PIXEL_TOLERANCE)
          expect(Math.abs(m.textCenter), 'hero metni alanin dikey ortasinda').toBeLessThanOrEqual(PIXEL_TOLERANCE)
        }
      })
    }
  }
})
