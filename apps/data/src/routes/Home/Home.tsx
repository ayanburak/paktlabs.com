/*
file: Home.tsx
importable: Home

description: data.paktlabs.com'un giris sayfasi olan veri sayfasini olusturan bilesen.
*/

import { Footer } from '@paktlabs/brand/components/Footer'
import { Header } from '@paktlabs/brand/components/Header'
import { useDocumentMeta } from '@paktlabs/brand/i18n/useDocumentMeta'

import { useDict } from '@/i18n'

// Bolumler Faz 3'te tek tek eklenecek: hero, teknoloji seridi, calisma listesi
// ve iletisim. Su an yalnizca ust bar ve alt bilgi var, ortak katmanin data'da
// dogru baglandigini gostermek icin.
export function Home() {
  const { home } = useDict()
  useDocumentMeta(home.meta.title, home.meta.description)

  return (
    <>
      <Header current="data" homeHref="https://paktlabs.com" />
      <main />
      <Footer homeHref="https://paktlabs.com" />
    </>
  )
}
