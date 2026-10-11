/*
file: Page.tsx
importable: Page

data sitesindeki her sayfanin cercevesi. Brand in ortak Page bilesenini Veri
baglantisi isaretli ve ana siteye donus adresi verilmis olarak sarar.

    <Page title={meta.title} description={meta.description}>
      ...bolumler
    </Page>

description: Brand in sayfa cercevesine data sitesinin disiplinini ve ana site adresini veren ince sarmal.
*/

import type { ComponentProps } from 'react'

import { Page as BrandPage } from '@paktlabs/brand/components/Page'
import { mainSiteUrl } from '@paktlabs/brand/content/site'

// Bu sarmal cok sayfa tarafindan cagriliyor ve hepsi ayni iki degeri,
// current ve homeHref, tekrar yazmasin diye duruyor. Cerceve brand te,
// burada yalnizca data a ozel iki deger var.
export function Page(props: Omit<ComponentProps<typeof BrandPage>, 'current' | 'homeHref'>) {
  return <BrandPage {...props} current="data" homeHref={mainSiteUrl} />
}
