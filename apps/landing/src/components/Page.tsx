/*
file: Page.tsx
importable: Page

Landing'deki her sayfanin ortak cercevesi. Ust bar, sayfanin icerigi ve alt
bilgi her sayfada ayni sirayla gelir, sayfa yalnizca kendi bolumlerini ve
sekme basligini verir.

    <Page title={meta.title} description={meta.description}>
      ...bolumler
    </Page>

description: Ust bar, icerik alani ve alt bilgiyi kurup sekme basligini guncelleyen sayfa cercevesi.
*/

import type { ReactNode } from 'react'

import { Footer } from '@paktlabs/brand/components/Footer'
import { Header } from '@paktlabs/brand/components/Header'
import { useDocumentMeta } from '@paktlabs/brand/i18n/useDocumentMeta'

interface PageProps {
  title: string
  description: string
  children?: ReactNode
}

// main, ekran okuyucuda menuyu atlayip dogrudan icerige gecmeyi sagliyor.
// Bolumler full-bleed hesabini ebeveyn genisligine gore yapiyor, main de
// #root kadar genis bir blok oldugu icin yerlesim degismiyor. data'daki
// Page ile ayni yapi, landing ana siteye dondugu icin header ve footer'a
// prop vermiyor.
export function Page({ title, description, children }: PageProps) {
  useDocumentMeta(title, description)

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
