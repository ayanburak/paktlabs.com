/*
file: StudySource.tsx
importable: StudySource

/work/:slug/source adresindeki kod ve veri sayfasi. Calisma yoksa ya da
calismanin kodu sitede degil GitHub'daysa bulunamadi sayfasi gosterilir.

description: Bir calismanin paylasilan kod ve veri orneklerini gosteren sayfayi olusturan bilesen.
*/

import { useParams } from 'react-router-dom'

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { Page } from '@/components/Page'
import { findStudy } from '@/content/studies'
import { useDict } from '@/i18n'
import { NotFound } from '@/routes/NotFound/NotFound'

// Sekme basligi calisma sayfasiyla ayni bicimde kurulur. Kapak, dosya agaci,
// kod dosyalari ve veri ornekleri Faz 5'te gelecek, su an sayfada yalnizca
// baslik var.
export function StudySource() {
  const { slug = '' } = useParams()
  const { language } = useLanguage()
  const { home } = useDict()
  const code = findStudy(slug)?.code

  // Kodu GitHub'da olan calismanin Meraklisina karti depoya gider, sitede kod
  // sayfasi yoktur. Bu adres de bilinmeyen bir adres gibi davranir.
  if (code?.kind !== 'page') return <NotFound />

  const title = code.page.title[language]

  return (
    <Page title={`${title} · ${home.meta.title}`} description={code.page.lede[language]}>
      <h1>{title}</h1>
    </Page>
  )
}
