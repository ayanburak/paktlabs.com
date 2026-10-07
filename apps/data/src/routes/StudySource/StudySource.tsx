/*
file: StudySource.tsx
importable: StudySource

/work/:slug/source adresindeki kod ve veri sayfasi. Calisma yoksa ya da
calismanin paylasilan bir kodu yoksa bulunamadi sayfasi gosterilir.

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
  const source = findStudy(slug)?.source

  if (!source) return <NotFound />

  const text = source[language]

  return (
    <Page title={`${text.title} · ${home.meta.title}`} description={text.lede}>
      <h1>{text.title}</h1>
    </Page>
  )
}
