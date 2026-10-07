/*
file: Home.tsx
importable: Home

description: Anasayfayi olusturan bolumleri sirasiyla dizen bilesen.
*/

import { useDocumentMeta } from '@paktlabs/brand/i18n/useDocumentMeta'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { useDict } from '@/i18n'

import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Disciplines } from './sections/Disciplines'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'

// main, ekran okuyucuda menuyu atlayip dogrudan icerige gecmeyi sagliyor.
// Bolumler full-bleed hesabini ebeveyn genisligine gore yapiyor, main de
// #root kadar genis bir blok oldugu icin yerlesim degismiyor.
export function Home() {
  const { meta } = useDict()
  useDocumentMeta(meta.title, meta.description)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Disciplines />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
