/*
file: layout.spec.ts

Responsive yerlesimin kirilmamasi gereken iliskileri DOM olcumuyle kontrol eder.
Eleman kutusu ile gercek cizim ayni sey degildir: metin icin Range kutusu, gorsel
icin img kutusu kullanilir, SVG icinde bos kalan seffaf alan cakisma gibi gorunebilir.
Zemin hesabi CSS modelini olcer, SVG icindeki cizgiyi piksel olarak bulmaz.
Gorsel sonucun kendisi visual.spec.ts'te ayrica karsilastirilir.

description: Tasma, hero metni ile cizimin yerlesimi, disiplin figuru ve is bandi figurlerinin yerlesim testleri.
*/

import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

import { languages, openHome } from './support'

// CSS'teki sayilar. Bunlar degisirse testin korudugu yer de degisir, o yuzden
// her biri anlamini soyleyen adla burada toplanir.
// Bu genislik ve altinda mobil duzen gecerli, CSS max-width: 768px
const MOBILE_MAX_WIDTH = 768
// Hero basligi ile cizimi arasinda masaustunde en az bu kadar bosluk kalir
const HERO_MIN_GAP = 24
// Disiplin figuru kartlarin bu kadar ustunde durur, bu genisligin ustunde
// sayfa --maxw ile sinirli oldugu icin bu iliski aranmaz
const DISCIPLINE_ART_GAP = 28
const DISCIPLINE_ART_GAP_MAX_WIDTH = 1680
// Piksel yuvarlamasindan gelen kabul edilen sapma
const PIXEL_TOLERANCE = 1

// 768/769, 1680/1681 ve 1900/1901 CSS'teki esiklerin iki yani
const sizes = [
  [390, 844],
  [768, 900],
  [769, 900],
  [1024, 1366],
  [1366, 1024],
  [1680, 900],
  [1681, 900],
  [1900, 900],
  [1901, 900],
  [1920, 1080],
] as const

// Tum olcumler tek evaluate icinde toplanir. Yerlesim olcum sirasinda
// degismesin diye sayfa hareket azaltma tercihiyle acilir.
async function measure(page: Page) {
  return page.evaluate(() => {
    type Box = { left: number; right: number; top: number; bottom: number }
    const box = (el: Element): Box => el.getBoundingClientRect()
    const textBox = (el: Element): Box => {
      const range = document.createRange()
      range.selectNodeContents(el)
      return range.getBoundingClientRect()
    }
    const overlaps = (a: Box, b: Box) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom

    // Beklenen eleman yoksa sessizce NaN olcmek yerine neyin eksik oldugunu soyler.
    const need = <T,>(value: T | null | undefined, what: string): T => {
      if (value == null) throw new Error(`olcum icin ${what} bulunamadi`)
      return value
    }

    const hero = need(document.querySelector('main > section'), 'hero')
    const heroFrame = need(hero.querySelector('picture'), 'hero cizimi')
    const heroTitle = need(hero.querySelector('h1'), 'hero basligi')
    const heroCta = need(hero.querySelector('.cta'), 'hero dugmesi')
    // hero'nun ortalama alani header payindan sonra baslar, alt cizgiden once biter.
    // Iki deger de sayi olarak yazilmaz, hero'nun hesaplanmis stilinden okunur
    const heroStyle = getComputedStyle(hero)
    const heroBox = box(hero)
    const heroAreaCenter =
      (heroBox.top + parseFloat(heroStyle.paddingTop) + heroBox.bottom - parseFloat(heroStyle.borderBottomWidth)) / 2
    const centerOf = (b: Box) => (b.top + b.bottom) / 2
    const discArt = need(document.querySelector('#disciplines picture img'), 'disiplin cizimi')
    const cards = need(need(document.querySelector('#disciplines a'), 'disiplin karti').parentElement, 'kart listesi')

    const bands = [...document.querySelectorAll('#work h3')].map((title) => {
      const band = need(title.closest('#work > div'), 'bant')
      const art = need(band.querySelector(':scope > img'), 'bant cizimi')
      const word = need(title.parentElement, 'bant basligi kutusu')
      const artBox = box(art)
      const groundOffset = parseFloat(getComputedStyle(art).getPropertyValue('--ground-offset')) / 100
      const texts = [title, need(word.querySelector('p'), 'bant aciklamasi'), ...band.querySelectorAll('li')].map(textBox)
      return {
        title: title.textContent,
        // gorselin zemin cizgisi ile bandin alt kenari arasindaki fark
        ground: artBox.bottom - (artBox.bottom - artBox.top) * groundOffset - box(band).bottom,
        hitsText: texts.some((t) => overlaps(artBox, t)),
        hitsButton: overlaps(artBox, box(need(word.querySelector('a'), 'bant dugmesi'))),
        insideX: artBox.left >= 0 && artBox.right <= innerWidth,
      }
    })

    return {
      overflowX: document.documentElement.scrollWidth - innerWidth,
      heroGap: box(heroFrame).left - textBox(heroTitle).right,
      heroCtaHit: overlaps(box(heroFrame), box(heroCta)),
      heroArtCenter: centerOf(box(heroFrame)) - heroAreaCenter,
      // metin blogu eleman kutulariyla olculur. Baslik satir yuksekligi fontun
      // yazi alanindan kucuk oldugu icin Range kutusu eleman kutusunun disina
      // tasar, ortalamayi ise CSS eleman kutularina gore yapar
      heroTextCenter: (box(heroTitle).top + box(heroCta).bottom) / 2 - heroAreaCenter,
      discArt: {
        opacity: getComputedStyle(discArt).opacity,
        left: box(discArt).left,
        right: box(discArt).right,
        gapToCards: box(cards).top - box(discArt).bottom,
      },
      bands,
    }
  })
}

test.describe('responsive layout', () => {
  test.use({ reducedMotion: 'reduce' })

  for (const lang of languages) {
    for (const [width, height] of sizes) {
      test(`${lang} ${width}x${height}`, async ({ page }) => {
        await page.setViewportSize({ width, height })
        await openHome(page, lang)
        const m = await measure(page)

        expect(m.overflowX, 'yatay tasma').toBeLessThanOrEqual(0)

        // mobilde hero cizimi bilerek metnin arkasinda durur, bu iliski yalniz masaustu duzeninde aranir
        if (width > MOBILE_MAX_WIDTH) {
          expect(m.heroGap, 'hero basligi ile cizim arasi').toBeGreaterThanOrEqual(HERO_MIN_GAP)
          expect(m.heroCtaHit, 'hero dugmesi cizimle cakisiyor').toBe(false)
          expect(Math.abs(m.heroArtCenter), 'hero cizimi alanin dikey ortasinda').toBeLessThanOrEqual(PIXEL_TOLERANCE)
          expect(Math.abs(m.heroTextCenter), 'hero metni alanin dikey ortasinda').toBeLessThanOrEqual(PIXEL_TOLERANCE)
        }

        expect(m.discArt.opacity).toBe('1')
        expect(m.discArt.left).toBeGreaterThanOrEqual(0)
        expect(m.discArt.right).toBeLessThanOrEqual(width)
        if (width <= DISCIPLINE_ART_GAP_MAX_WIDTH) {
          expect(
            Math.abs(m.discArt.gapToCards - DISCIPLINE_ART_GAP),
            `figur kartlarin ${DISCIPLINE_ART_GAP}px ustunde`,
          ).toBeLessThanOrEqual(PIXEL_TOLERANCE)
        }

        for (const band of m.bands) {
          expect(Math.abs(band.ground), `${band.title} zemin`).toBeLessThanOrEqual(PIXEL_TOLERANCE)
          expect(band.hitsText, `${band.title} cizimi metne degiyor`).toBe(false)
          expect(band.hitsButton, `${band.title} cizimi dugmeye degiyor`).toBe(false)
          expect(band.insideX, `${band.title} cizimi ekran disinda`).toBe(true)
        }
      })
    }
  }
})

// Belirme animasyonu yalnizca transform ve opacity tasir. Animasyonlar bittiginde
// gorsellerin konumu hareket azaltma tercihindeki konumla ayni olmali.
for (const [width, height] of [
  [390, 844],
  [1920, 1080],
] as const) {
  test(`${width}x${height}: reveal animations end in the reduced-motion layout`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    const imageBoxes = () =>
      page.evaluate(() =>
        [...document.querySelectorAll('main img')].map((img) => {
          // cizilmeyen gorselin kutusu yok, top + scrollY kaydirma miktarini
          // konum gibi gosterirdi
          if (img.getClientRects().length === 0) return null
          const r = img.getBoundingClientRect()
          return [r.left, r.top + scrollY, r.width, r.height].map(Math.round)
        }),
      )

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openHome(page)
    const expected = await imageBoxes()

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.reload({ waitUntil: 'networkidle' })
    await openHome(page)
    // yarim ekran adimlarla asagi inip her reveal'in tetiklenmesini saglar
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y <= scrollHeight; y += Math.floor(height / 2)) {
      await page.evaluate((top) => window.scrollTo(0, top), y)
      await page.waitForTimeout(60)
    }
    // Iletisim bolumunde o ekrana ait olmayan telefon gorselinin picture'i
    // display:none, hic kesismedigi icin in almaz. Sadece cizilen elemanlar sayilir.
    await expect
      .poll(() =>
        page.locator('.reveal:not(.in)').evaluateAll((els) => els.filter((el) => el.getClientRects().length > 0).length),
      )
      .toBe(0)
    await expect.poll(imageBoxes, { timeout: 5000 }).toEqual(expected)
  })
}
