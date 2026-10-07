/*
file: Home.tsx
importable: Home

description: data.paktlabs.com'un giris sayfasi olan veri sayfasini olusturan bilesen.
*/

import { Page } from '@/components/Page'
import { useDict } from '@/i18n'

import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { TechRail } from './sections/TechRail'
import { Works } from './sections/Works/Works'

// Bolumler mockup'taki sirayla dizilir: hero, teknoloji seridi, calisma
// listesi ve iletisim.
export function Home() {
  const { home } = useDict()

  return (
    <Page title={home.meta.title} description={home.meta.description}>
      <Hero />
      <TechRail />
      <Works />
      <Contact />
    </Page>
  )
}
