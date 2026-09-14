import { defineConfig } from '@playwright/test'

// Testler dev sunucusuna degil production build'e karsi calisir, canliya giden
// CSS ve asset isimleriyle ayni sartlarda olculsun diye. 4173 dev sunucusunun
// 5173'uyle cakismaz. Eski bir preview acik kalmissa eski build'i test etmemek
// icin var olan sunucu yeniden kullanilmaz, port doluysa test baslamaz.
const port = 4173

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    browserName: 'chromium',
    deviceScaleFactor: 1,
    trace: 'retain-on-failure',
  },
  expect: {
    toHaveScreenshot: { animations: 'disabled', maxDiffPixelRatio: 0 },
  },
  webServer: {
    command: `npx vite build && npx vite preview --port ${port} --strictPort`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
    timeout: 180_000,
  },
})
