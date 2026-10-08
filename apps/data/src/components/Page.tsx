/*
file: Page.tsx
importable: Page

data sitesindeki her sayfanin ortak cercevesi. Ust bar, sayfanin icerigi ve
alt bilgi her rotada ayni sirayla gelir, sayfa yalnizca kendi bolumlerini ve
sekme basligini verir.

    <Page title={meta.title} description={meta.description}>
      ...bolumler
    </Page>

description: Ust bar, icerik alani ve alt bilgiyi kurup sekme basligini guncelleyen sayfa cercevesi.
*/

import type { ReactNode } from 'react'

import { Footer } from '@paktlabs/brand/components/Footer'
import { Header } from '@paktlabs/brand/components/Header'
import { mainSiteUrl } from '@paktlabs/brand/content/site'
import { useDocumentMeta } from '@paktlabs/brand/i18n/useDocumentMeta'

interface PageProps {
  title: string
  description: string
  children?: ReactNode
}

// main, ekran okuyucuda menuyu atlayip dogrudan icerige gecmeyi sagliyor.
// Landing'in Home bileseniyle ayni yapi, bolumlerin full-bleed hesabi bu
// yuzden iki sitede de ayni ebeveyn genisligine gore yapiliyor.
export function Page({ title, description, children }: PageProps) {
  useDocumentMeta(title, description)

  return (
    <>
      <Header current="data" homeHref={mainSiteUrl} />
      <main>{children}</main>
      <Footer homeHref={mainSiteUrl} />
    </>
  )
}
