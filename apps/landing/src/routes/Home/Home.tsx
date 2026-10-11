/*
file: Home.tsx
importable: Home

description: Anasayfayi olusturan bolumleri sirasiyla dizen bilesen.
*/

import { Contact } from '@paktlabs/brand/components/Contact'

import { Page } from '@/components/Page'
import { useDict } from '@/i18n'

import { About } from './sections/About'
import { Disciplines } from './sections/Disciplines'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'

// Sayfa ortak iletisim bolumuyle kapanir, bolumdeki dugme iletisim
// sayfasina gider.
export function Home() {
  const { meta } = useDict()

  return (
    <Page title={meta.title} description={meta.description}>
      <Hero />
      <About />
      <Disciplines />
      <Work />
      <Contact />
    </Page>
  )
}
