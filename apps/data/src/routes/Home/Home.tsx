/*
file: Home.tsx
importable: Home

description: data.paktlabs.com'un giris sayfasi olan veri sayfasini olusturan bilesen.
*/

import { Page } from '@/components/Page'
import { useDict } from '@/i18n'

import { Hero } from './sections/Hero'
import { TechRail } from './sections/TechRail'

// Bolumler mockup'taki sirayla eklenir: hero, teknoloji seridi, calisma
// listesi ve iletisim. Su an hero ve teknoloji seridi var.
export function Home() {
  const { home } = useDict()

  return (
    <Page title={home.meta.title} description={home.meta.description}>
      <Hero />
      <TechRail />
    </Page>
  )
}
