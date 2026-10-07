/*
file: Study.tsx
importable: Study

/work/:slug adresindeki calisma detay sayfasi. Slug bir calismaya karsilik
gelmiyorsa bulunamadi sayfasi gosterilir.

description: Adresteki slug'a ait calismanin detay sayfasini olusturan bilesen.
*/

import { useParams } from 'react-router-dom'

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { Page } from '@/components/Page'
import { findStudy } from '@/content/studies'
import { useDict } from '@/i18n'
import { NotFound } from '@/routes/NotFound/NotFound'

// Sekme basligi calismanin basligi ve sitenin basligindan olusur, mockup'taki
// "baslik · Veri · PaktLabs" bicimi. Sitenin basligi veri sayfasinin kendi
// basligidir, ayrica bir anahtar tutulmaz. Kapak, kunye ve bolumler Faz 4'te
// gelecek, su an sayfada yalnizca baslik var.
export function Study() {
  const { slug = '' } = useParams()
  const { language } = useLanguage()
  const { home } = useDict()
  const study = findStudy(slug)

  if (!study) return <NotFound />

  const text = study.text[language]

  return (
    <Page title={`${text.title} · ${home.meta.title}`} description={text.lede}>
      <h1>{text.title}</h1>
    </Page>
  )
}
