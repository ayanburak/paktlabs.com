/*
file: Home.tsx
importable: Home

description: data.paktlabs.com'un giris sayfasi olan veri sayfasini olusturan bilesen.
*/

import { Contact } from '@paktlabs/brand/components/Contact'

import { Page } from '@/components/Page'
import { useDict } from '@/i18n'

import { Hero } from './sections/Hero'
import { Services } from './sections/Services/Services'
import { Works } from './sections/Works/Works'

// Bolumler sirayla dizilir: hero, hizmetler panosu, calisma listesi ve
// iletisim.
export function Home() {
  const { home } = useDict()

  return (
    <Page title={home.meta.title} description={home.meta.description}>
      <Hero />
      <Services />
      <Works />
      <Contact />
    </Page>
  )
}
