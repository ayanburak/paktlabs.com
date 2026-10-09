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
import { Author } from '@/components/study/Author'
import { Body } from '@/components/study/Body'
import { Cover } from '@/components/study/Cover'
import { DataLanguageProvider } from '@/components/study/DataLanguageProvider'
import { StudyFilesContext } from '@/components/study/studyFiles'
import { useStudyTags } from '@/components/useStudyTags'
import { findStudy } from '@/content/studies'
import type { StudyFileSet } from '@/content/studies/files'
import type { Study as StudyContent } from '@/content/studies/types'
import { useDict } from '@/i18n'
import { NotFound } from '@/routes/NotFound/NotFound'
import { useStudyFileSet } from '@/routes/studyLoader'

import { Closing } from './sections/Closing'
import { Curious } from './sections/Curious'
import { readingMinutes } from './sections/readingMinutes'
import { Summary } from './sections/Summary'

// Sekme basligi calismanin basligi ve sitenin basligindan olusur, mockup'taki
// "baslik · Veri · PaktLabs" bicimi. Sitenin basligi veri sayfasinin kendi
// basligidir, ayrica bir anahtar tutulmaz. Kapak, govde ve yazar kutusu kod
// sayfasiyla ortak, ozet bandi, Meraklisina karti ve kapanis bu sayfaya ozel.
// Calismanin dosyalari rota yukleyicisinden hazir gelir, calisma yoksa
// yukleyici bir sey yuklemez.
export function Study() {
  const { slug = '' } = useParams()
  const study = findStudy(slug)
  const files = useStudyFileSet()

  if (!study || !files) return <NotFound />
  return <StudyView study={study} files={files} />
}

interface StudyViewProps {
  study: StudyContent
  files: StudyFileSet
}

// Calisma bulunduktan sonraki kisim ayri bir bilesen, cunku etiketlerin
// metni bir hook'la kuruluyor ve hook'lar bulunamadi kontrolunden once
// kosulsuz cagrilmali. Donus baglantisi veri sayfasindaki listeye gider,
// bulunamadi sayfasindaki donus dugmesiyle ayni adres.
function StudyView({ study, files }: StudyViewProps) {
  const { language } = useLanguage()
  const { home, study: dict } = useDict()
  const tags = useStudyTags(study)
  const title = study.title[language]
  const minutes = readingMinutes(study.page, language)

  return (
    <Page title={`${title} · ${home.meta.title}`} description={study.page.lede[language]}>
      <DataLanguageProvider key={study.slug} original={study.dataLanguage}>
        <StudyFilesContext.Provider value={files}>
          <Cover
            crumb={{ href: '/#calismalar', back: dict.cover.back, current: study.number }}
            tags={tags}
            title={title}
            lede={study.page.lede[language]}
            kunye={study.page.kunye}
          />
          <Summary summary={study.page.summary} />
          <Body
            chapters={study.page.chapters}
            tocNote={`${dict.toc.readingTime.before} ${minutes} ${dict.toc.readingTime.after}`}
            afterChapters={
              <>
                <Curious study={study} />
                <Author id={study.author} />
              </>
            }
          />
        </StudyFilesContext.Provider>
      </DataLanguageProvider>
      <Closing study={study} />
    </Page>
  )
}
