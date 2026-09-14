/*
file: Home.tsx
importable: Home

description: Anasayfayi olusturan bolumleri sirasiyla dizen bilesen.
*/

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Disciplines } from './sections/Disciplines'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'

export function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Disciplines />
      <Work />
      <Contact />
      <Footer />
    </>
  )
}
