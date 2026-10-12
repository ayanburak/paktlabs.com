/*
file: NotFound.tsx
importable: NotFound

web sitesinin bulunamadi sayfasi. 404.html'in kendi girisi olan
notFound.tsx tarafindan acilir.

description: Ust bar, ortak bulunamadi bolumu ve alt bilgiden olusan web 404 sayfasi.
*/

import { NotFound as NotFoundSection } from '@paktlabs/brand/components/NotFound'
import { Page } from '@paktlabs/brand/components/Page'
import { mainSiteUrl } from '@paktlabs/brand/content/site'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'

// Icerik ve metinler brand'deki ortak bulunamadi sayfasindan gelir. Cerceve
// ana sayfadakiyle ayni, ust barda bu sitenin disiplini isaretli durur.
export function NotFound() {
  const { notFound } = useBrandDict()

  return (
    <Page title={notFound.meta.title} description={notFound.meta.description} current="web" homeHref={mainSiteUrl}>
      <NotFoundSection />
    </Page>
  )
}
