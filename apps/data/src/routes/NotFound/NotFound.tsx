/*
file: NotFound.tsx
importable: NotFound

description: Bilinmeyen bir adreste ya da bulunamayan bir calismada gosterilen sayfa.
*/

import { NotFound as NotFoundSection } from '@paktlabs/brand/components/NotFound'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'

import { Page } from '@/components/Page'

// Icerik ve metinler brand'deki ortak bulunamadi sayfasindan gelir, burada
// yalnizca data'nin cercevesine konur. Calisma rotasi da bilinmeyen bir slug
// gordugunde bu bileseni gosterir, bu yuzden ayri bir rota bileseni degil,
// her yerden cagrilabilen bir sayfa. Sunucu SPA fallback ile index.html
// dondugu icin HTTP durumu 200 kalir, sayfa yalnizca tarayicida bulunamadi der.
export function NotFound() {
  const { notFound } = useBrandDict()

  return (
    <Page title={notFound.meta.title} description={notFound.meta.description}>
      <NotFoundSection />
    </Page>
  )
}
