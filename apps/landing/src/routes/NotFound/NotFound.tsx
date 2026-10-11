/*
file: NotFound.tsx
importable: NotFound

Landing'in bulunamadi sayfasi. App'in bir rotasi degil, 404.html'in kendi
girisi olan notFound.tsx tarafindan acilir. nginx bilinmeyen her adreste bu
dosyayi 404 koduyla dondurur.

description: Ust bar, ortak bulunamadi bolumu ve alt bilgiden olusan landing 404 sayfasi.
*/

import { NotFound as NotFoundSection } from '@paktlabs/brand/components/NotFound'
import { Page } from '@paktlabs/brand/components/Page'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'

// Icerik ve metinler brand'deki ortak bulunamadi sayfasindan gelir, data da
// ayni bolumu kendi cercevesinde gosterir. Cerceve Home'daki ust bar, main ve
// alt bilgi sirasiyla ayni, ikisi de Page'i kullanir.
export function NotFound() {
  const { notFound } = useBrandDict()

  return (
    <Page title={notFound.meta.title} description={notFound.meta.description}>
      <NotFoundSection />
    </Page>
  )
}
