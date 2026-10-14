/*
file: playwright.ts
importable: siteTestConfig

Sitelerin ortak Playwright ayari. Her site kendi playwright.config.ts dosyasinda
bunu cagirir.

    export default siteTestConfig({ port: 4174 })

description: Production build e karsi calisan, LIVE_URL verilince canliya donen ortak test ayari.
*/

import { defineConfig } from '@playwright/test'

interface TestOptions {
  port: number
}

// Testler dev sunucusuna degil production build e karsi calisir, canliya giden
// CSS ve asset isimleriyle ayni sartlarda olculsun diye. port, sitenin dev
// sunucusuyla cakismayan bir portta durur ve sitelerin testleri ayni anda
// calisabilir. Eski bir preview acik kalmissa eski build i test etmemek icin
// var olan sunucu yeniden kullanilmaz, port doluysa test baslamaz.
//
// LIVE_URL verilirse testler build almadan o adrese karsi calisir. Yayindan
// sonra canliyi dogrulamak icin var, eskiden bunun icin her seferinde gecici
// bir config dosyasi yazilip siliniyordu. Canli sunucuyu yormamak icin bu
// modda yeniden deneme bir, paralel is sayisi iki olur.
export function siteTestConfig({ port }: TestOptions) {
  const liveUrl = process.env.LIVE_URL

  return defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: liveUrl ? 1 : process.env.CI ? 1 : 0,
    workers: liveUrl ? 2 : undefined,
    reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
    use: {
      baseURL: liveUrl ?? `http://localhost:${port}`,
      browserName: 'chromium',
      deviceScaleFactor: 1,
      trace: 'retain-on-failure',
      // data'nin blok katalogu canlida nginx'in sifre korumasinin arkasinda.
      // Ikisi de verilirse tarayici sifre soruldugunda bunlari gonderir,
      // verilmezse katalog testleri kendiliginden atlanir. Sifre hicbir
      // dosyaya yazilmaz, yalnizca komutu calistiran kisinin ortaminda durur.
      httpCredentials:
        process.env.BLOCKS_USER && process.env.BLOCKS_PASSWORD
          ? { username: process.env.BLOCKS_USER, password: process.env.BLOCKS_PASSWORD }
          : undefined,
    },
    expect: {
      toHaveScreenshot: { animations: 'disabled', maxDiffPixelRatio: 0 },
    },
    webServer: liveUrl
      ? undefined
      : {
          command: `npx vite build && npx vite preview --port ${port} --strictPort`,
          url: `http://localhost:${port}`,
          reuseExistingServer: false,
          timeout: 180_000,
        },
  })
}
