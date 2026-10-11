/*
file: contact.spec.ts

Iletisim sayfasini kontrol eder: iki dilde baslik ve metinler, adim adim
ilerleme, her adimin cizimi, son ekranin denetimleri, servise giden mesajin
sekli, basarili ve basarisiz gonderim ve yatay tasma. Gonderim gercek servise
gitmez, /api/contact her testte taklit edilir. Servisin kendi testleri
services/contact-api/tests altindadir.

description: Landing'in iletisim sayfasindaki adim adim formu ve gonderimini olcen testler.
*/

import { expect, test } from '@playwright/test'
import type { Page, Route } from '@playwright/test'

import { contactPath, dict, languages, openContact } from './support'

// Formun ilk uc adimini verilen secimlerle gecer. Secimler etiketleriyle
// bulunur, radio gorunmez oldugu icin force ile isaretlenir.
async function answer(page: Page, labels: string[], next: RegExp) {
  for (const label of labels) {
    await page.getByRole('radio', { name: label, exact: true }).check({ force: true })
    await page.getByRole('button', { name: next }).click()
  }
}

// Gelen istegi kaydeder ve verilen kodla cevap verir.
function fakeApi(page: Page, status: number) {
  const bodies: unknown[] = []
  return page
    .route('**/api/contact', async (route: Route) => {
      bodies.push(route.request().postDataJSON())
      await route.fulfill({ status })
    })
    .then(() => bodies)
}

const step = (lang: 'tr' | 'en') => dict[lang].contactPage

for (const lang of languages) {
  test(`${lang}: the page opens on the first question`, async ({ page }) => {
    await openContact(page, lang)
    const t = step(lang)

    await expect(page).toHaveTitle(t.meta.title)
    await expect(page.locator('html')).toHaveAttribute('lang', lang)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.title)
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(t.questions.area.title)
    await expect(page.getByRole('radio')).toHaveCount(4)
    await expect(page.getByRole('button', { name: new RegExp(t.actions.next) })).toBeDisabled()
  })

  // Mesajin sekli servisteki schema.py ile ayni olmali. Kimlikler bilerek
  // elle yazili, questions.ts'ten okunmaz.
  test(`${lang}: a full answer reaches the service in the expected shape`, async ({ page }) => {
    const bodies = await fakeApi(page, 204)
    await openContact(page, lang)
    const t = step(lang)
    const next = new RegExp(t.actions.next)

    await answer(
      page,
      [t.questions.area.options.web.label, t.questions.stage.options.idea.label, t.questions.timing.options.days.label],
      next,
    )
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(t.details.title)
    await page.getByLabel(t.details.name).fill('  Ayşe Yılmaz ')
    await page.getByLabel(t.details.email).fill('ayse@ornek.com')
    await page.getByLabel(t.details.message).fill('Bir panel istiyoruz.')
    await page.getByRole('button', { name: new RegExp(t.actions.send) }).click()

    await expect(page.getByRole('heading', { level: 2 })).toHaveText(t.sent.title)
    expect(bodies).toEqual([
      {
        answers: { area: 'web', stage: 'idea', timing: 'days' },
        name: '  Ayşe Yılmaz ',
        email: 'ayse@ornek.com',
        company: '',
        message: 'Bir panel istiyoruz.',
        language: lang,
        website: '',
      },
    ])
  })
}

test('each step shows its own drawing and back keeps the choice', async ({ page }) => {
  await openContact(page, 'tr')
  const t = step('tr')
  const art = page.locator('main img')
  const next = new RegExp(t.actions.next)

  await expect(art).toHaveAttribute('src', /iletisim-alan/)
  await answer(page, [t.questions.area.options.data.label], next)
  await expect(art).toHaveAttribute('src', /iletisim-durum/)
  await answer(page, [t.questions.stage.options.plan.label], next)
  await expect(art).toHaveAttribute('src', /iletisim-zaman/)
  await answer(page, [t.questions.timing.options.month.label], next)
  await expect(art).toHaveAttribute('src', /iletisim-siz/)

  await page.getByRole('button', { name: new RegExp(t.actions.back) }).click()
  await expect(page.getByRole('radio', { name: t.questions.timing.options.month.label })).toBeChecked()
  // ekran degisince odak yeni sorunun basligina gider
  await expect(page.getByRole('heading', { level: 2 })).toBeFocused()
})

test('the last step checks the fields before sending', async ({ page }) => {
  const bodies = await fakeApi(page, 204)
  await openContact(page, 'tr')
  const t = step('tr')
  await answer(page, ['Veri', 'Bir fikir', 'Acelesi yok'], new RegExp(t.actions.next))
  const send = page.getByRole('button', { name: new RegExp(t.actions.send) })

  await send.click()
  await expect(page.getByText(t.invalid.required)).toHaveCount(3)
  await expect(page.getByLabel(t.details.name)).toBeFocused()
  await expect(page.getByLabel(t.details.name)).toHaveAttribute('aria-invalid', 'true')

  await page.getByLabel(t.details.name).fill('Ayşe')
  await page.getByLabel(t.details.email).fill('ayse@ornek')
  await page.getByLabel(t.details.message).fill('Merhaba')
  await send.click()
  await expect(page.getByText(t.invalid.email)).toBeVisible()
  await expect(page.getByLabel(t.details.email)).toBeFocused()
  expect(bodies).toEqual([])
})

// Basarisiz gonderimde ziyaretci yazdiklarini kaybetmez ve dogrudan
// yazabilecegi adresi gorur.
test('a failed send keeps the answers and offers the email address', async ({ page }) => {
  await fakeApi(page, 500)
  await openContact(page, 'tr')
  const t = step('tr')
  await answer(page, ['Veri', 'Bir fikir', 'Acelesi yok'], new RegExp(t.actions.next))
  await page.getByLabel(t.details.name).fill('Ayşe')
  await page.getByLabel(t.details.email).fill('ayse@ornek.com')
  await page.getByLabel(t.details.message).fill('Merhaba')
  await page.getByRole('button', { name: new RegExp(t.actions.send) }).click()

  await expect(page.getByRole('alert')).toContainText(t.error)
  await expect(page.getByRole('alert').getByRole('link')).toHaveAttribute('href', 'mailto:info@paktlabs.com')
  await expect(page.getByLabel(t.details.message)).toHaveValue('Merhaba')
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(t.details.title)
})

// Mesaj alanina maxLength verilmez, yapistirilan uzun metin sessizce kesilmesin.
// Uzunluk servisteki gibi kod noktasi olarak sayilir, bu yuzden sinirdaki
// emojili mesaj gider ve bir kod noktasi fazlasi gitmez.
test('a message over the limit is warned about and not sent', async ({ page }) => {
  const bodies = await fakeApi(page, 204)
  await openContact(page, 'tr')
  const t = step('tr')
  await answer(page, ['Veri', 'Bir fikir', 'Acelesi yok'], new RegExp(t.actions.next))
  const send = page.getByRole('button', { name: new RegExp(t.actions.send) })
  await page.getByLabel(t.details.name).fill('Ayşe')
  await page.getByLabel(t.details.email).fill('ayse@ornek.com')

  await page.getByLabel(t.details.message).fill('a'.repeat(4001))
  await send.click()
  await expect(page.getByText(t.invalid.tooLong)).toBeVisible()
  await expect(page.getByLabel(t.details.message)).toBeFocused()
  expect(bodies).toEqual([])

  await page.getByLabel(t.details.message).fill('😀'.repeat(4000))
  await expect(page.getByText(t.invalid.tooLong)).toBeHidden()
  await send.click()
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(t.sent.title)
  expect(bodies).toHaveLength(1)
})

// Kisa alanlarda maxLength vardir, yapistirilan fazlalik kesilir.
test('the name field stops at one hundred characters', async ({ page }) => {
  await openContact(page, 'tr')
  const t = step('tr')
  await answer(page, ['Veri', 'Bir fikir', 'Acelesi yok'], new RegExp(t.actions.next))
  const name = page.getByLabel(t.details.name)

  await name.fill('a'.repeat(150))
  await expect(name).toHaveValue('a'.repeat(100))
})

// Tuzak alan insan ziyaretciye gorunmez ve klavyeyle ona gelinmez.
test('the trap field stays out of reach', async ({ page }) => {
  await openContact(page, 'tr')
  await answer(page, ['Veri', 'Bir fikir', 'Acelesi yok'], new RegExp(step('tr').actions.next))
  const trap = page.locator('input[name="website"]')

  await expect(trap).toHaveAttribute('tabindex', '-1')
  const box = await trap.boundingBox()
  expect(box!.x + box!.width).toBeLessThan(0)
  await expect(page.getByRole('textbox')).toHaveCount(4)
})

test('the html carries the turkish title before js runs', async ({ request }) => {
  const html = await (await request.get(contactPath)).text()
  expect(html).toContain(`<title>${dict.tr.contactPage.meta.title}</title>`)
  expect(html).toContain(`content="${dict.tr.contactPage.meta.description}"`)
})

for (const width of [390, 768, 769, 900, 901, 1366]) {
  test(`${width}: the contact page does not overflow sideways`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await openContact(page, 'tr')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}

// Secenekler gercek radio dugmeleridir. Odak cercevesi gorunmeyen radio'da
// degil yanindaki kutuda cizilir, bu yuzden landing'in genel odak testi
// burada kutuyu olcmez, bu test olcer. Ok tusu secimi degistirir, Enter
// ilerletir.
test('the form works with the keyboard', async ({ page }) => {
  await openContact(page, 'tr')
  const t = step('tr')
  const first = page.getByRole('radio', { name: t.questions.area.options.data.label })

  await first.focus()
  await page.keyboard.press('Space')
  await expect(first).toBeChecked()
  const outline = await first.evaluate((el) => {
    const face = getComputedStyle(el.nextElementSibling!)
    return face.outlineStyle !== 'none' && parseFloat(face.outlineWidth) >= 2
  })
  expect(outline).toBe(true)

  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('radio', { name: t.questions.area.options.automation.label })).toBeChecked()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(t.questions.stage.title)
})

test('headings, landmarks and the decorative drawing', async ({ page }) => {
  await openContact(page, 'tr')

  const levels = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((els) => els.map((el) => el.tagName))
  expect(levels).toEqual(['H1', 'H2'])
  await expect(page.locator('main')).toHaveCount(1)
  await expect(page.locator('body header, body footer')).toHaveCount(2)
  await expect(page.locator('main img')).toHaveAttribute('alt', '')
  await expect(page.locator('main img')).toHaveAttribute('aria-hidden', 'true')
})

// Cizimler yavas gelse de form yerinden oynamaz ve yeni cizim inmeden onceki
// cizim yerinde kalir. Her cizim bilerek 800 ms geciktirilir. Oteki cizimler
// sayfa acilinca arka planda indirildigi icin gecikme ilk acilista odenir,
// bu yuzden ilk adima hizli gecilip onceki cizimin kaldigi da olculur.
test('slow drawings neither move the form nor leave the slot empty', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.route('**/iletisim-*.svg', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    await route.continue()
  })
  await page.addInitScript(() => localStorage.setItem('pl_lang', 'tr'))
  await page.goto(contactPath)
  const t = step('tr')
  const art = page.locator('main img')
  const formLeft = () => page.locator('main h2').evaluate((el) => Math.round(el.getBoundingClientRect().left))

  await expect(art).toHaveAttribute('src', /iletisim-alan/)
  const left = await formLeft()
  await answer(page, [t.questions.area.options.data.label], new RegExp(t.actions.next))

  // ikinci cizim henuz inmediyse ilki yerinde kalir, alan hic bos kalmaz
  await expect(art).toHaveCount(1)
  expect(await formLeft()).toBe(left)
  await expect(art).toHaveAttribute('src', /iletisim-durum/)
  await answer(page, [t.questions.stage.options.plan.label, t.questions.timing.options.month.label], new RegExp(t.actions.next))
  await expect(art).toHaveAttribute('src', /iletisim-siz/)
  expect(await formLeft()).toBe(left)
})
