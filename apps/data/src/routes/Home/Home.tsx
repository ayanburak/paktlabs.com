/*
file: Home.tsx
importable: Home

description: data.paktlabs.com'un giris sayfasi olan veri sayfasini olusturan bilesen.
*/

import { Page } from '@/components/Page'
import { useDict } from '@/i18n'

// Bolumler Faz 3'te tek tek eklenecek: hero, teknoloji seridi, calisma listesi
// ve iletisim.
export function Home() {
  const { home } = useDict()

  return <Page title={home.meta.title} description={home.meta.description} />
}
