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

import { Body } from './sections/Body'
import { Cover } from './sections/Cover'
import { readingMinutes } from './sections/readingMinutes'
import { Summary } from './sections/Summary'

// Sekme basligi calismanin basligi ve sitenin basligindan olusur, mockup'taki
// "baslik · Veri · PaktLabs" bicimi. Sitenin basligi veri sayfasinin kendi
// basligidir, ayrica bir anahtar tutulmaz. Sayfa bolumleri sections altinda
// durur ve sirayla dizilir.
export function Study() {
  const { slug = '' } = useParams()
  const { language } = useLanguage()
  const { home } = useDict()
  const study = findStudy(slug)

  if (!study) return <NotFound />

  const title = study.title[language]

  return (
    <Page title={`${title} · ${home.meta.title}`} description={study.page.lede[language]}>
      <Cover study={study} />
      <Summary summary={study.page.summary} />
      <Body chapters={study.page.chapters} minutes={readingMinutes(study.page, language)} />
    </Page>
  )
}
