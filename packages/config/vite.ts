/*
file: vite.ts
importable: siteConfig

Sitelerin ortak Vite ayari. Her site kendi vite.config.ts dosyasinda bunu cagirir,
kendine ozel ayarlari mergeConfig ile ustune ekler.

    export default siteConfig({ root: import.meta.dirname, port: 5174 })

    export default mergeConfig(
      siteConfig({ root: import.meta.dirname, port: 5173 }),
      { appType: 'mpa' },
    )

description: React eklentisini, src alias ini, sabit dev portunu ve CSS minify ayarini kuran ortak site ayari.
*/

import path from 'node:path'

import react from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'

interface SiteOptions {
  root: string
  port: number
}

// root sitenin kendi klasoru, alias src altini gosterir. port sitenin dev
// sunucusu icindir. Siteler ayni anda acik gelistirilebilsin diye her site
// ayri bir port alir, strictPort da port doluysa sunucunun sessizce bir
// sonrakine kaymasini engeller, yoksa iki site ayni porta oturup birbirini
// ezerdi.
export function siteConfig({ root, port }: SiteOptions): UserConfig {
  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(root, 'src') },
    },
    server: { port, strictPort: true },
    build: {
      // esbuild css minify i klasik media sorgularini range syntax a cevirir,
      // yani max-width: X yerine width<=X yazar. Safari 16.4 oncesi gibi eski
      // tarayicilar bunu gecersiz sayip kuralin tamamini sessizce yok sayar.
      // Sitelerin butun responsive kurallari klasik sorgularla yazildigi icin
      // minify acilirsa mobil ve tablet yerlesimi o tarayicilarda tamamen
      // kaybolur. Bunu hicbir davranis testi gormez, tests klasorundeki
      // css.spec.ts derlenmis CSS i okuyup bu yuzden range syntax a bakar.
      cssMinify: false,
    },
  }
}
