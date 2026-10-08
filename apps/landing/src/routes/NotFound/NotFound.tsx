/*
file: NotFound.tsx
importable: NotFound

Landing'in bulunamadi sayfasi. App'in bir rotasi degil, 404.html'in kendi
girisi olan notFound.tsx tarafindan acilir. nginx bilinmeyen her adreste bu
dosyayi 404 koduyla dondurur.

description: Ust bar, ortak bulunamadi bolumu ve alt bilgiden olusan landing 404 sayfasi.
*/

import { Footer } from '@paktlabs/brand/components/Footer'
import { Header } from '@paktlabs/brand/components/Header'
import { NotFound as NotFoundSection } from '@paktlabs/brand/components/NotFound'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { useDocumentMeta } from '@paktlabs/brand/i18n/useDocumentMeta'

// Icerik ve metinler brand'deki ortak bulunamadi sayfasindan gelir, data da
// ayni bolumu kendi cercevesinde gosterir. Cerceve Home'daki ust bar, main ve
// alt bilgi sirasiyla ayni.
export function NotFound() {
  const { notFound } = useBrandDict()
  useDocumentMeta(notFound.meta.title, notFound.meta.description)

  return (
    <>
      <Header />
      <main>
        <NotFoundSection />
      </main>
      <Footer />
    </>
  )
}
