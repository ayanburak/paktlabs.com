/*
file: Page.tsx
importable: Page

PaktLabs sitelerinin her sayfasinin ortak cercevesi. Ust bar, sayfanin icerigi
ve alt bilgi her sayfada ayni sirayla gelir, sayfa yalnizca kendi bolumlerini
ve sekme basligini verir.

    <Page title={meta.title} description={meta.description}>
      ...bolumler
    </Page>

Disiplin siteleri bulunduklari disiplini ve ana siteye donus adresini de verir.

    <Page title={meta.title} description={meta.description} current="data" homeHref="https://paktlabs.com">
      ...bolumler
    </Page>

description: Ust bar, icerik alani ve alt bilgiyi kurup sekme basligini guncelleyen sayfa cercevesi.
*/

import type { ReactNode } from 'react'

import type { Discipline } from '../content/disciplines'
import { useDocumentMeta } from '../i18n/useDocumentMeta'

import { Footer } from './Footer'
import { Header } from './Header'

interface PageProps {
  title: string
  description: string
  current?: Discipline
  homeHref?: string
  children?: ReactNode
}

// main, ekran okuyucuda menuyu atlayip dogrudan icerige gecmeyi sagliyor.
// Bolumler full-bleed hesabini ebeveyn genisligine gore yapiyor, main de
// #root kadar genis bir blok oldugu icin yerlesim degismiyor. Bu yuzden her
// sitede bolumlerin hesabi ayni ebeveyn genisligine gore yapiliyor. Landing
// ana siteye dondugu icin current ve homeHref vermiyor.
export function Page({ title, description, current, homeHref, children }: PageProps) {
  useDocumentMeta(title, description)

  return (
    <>
      <Header current={current} homeHref={homeHref} />
      <main>{children}</main>
      <Footer homeHref={homeHref} />
    </>
  )
}
