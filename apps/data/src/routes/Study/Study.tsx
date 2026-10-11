/*
file: Study.tsx
importable: Study

/work/:slug adresindeki calisma detay sayfasi. Slug bir calismaya karsilik
gelmiyorsa bulunamadi sayfasi gosterilir.

description: Adresteki slug'a ait calismanin detay sayfasini olusturan bilesen.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { Page } from '@/components/Page'
import { StudyLayout } from '@/components/study/StudyLayout'
import { useStudyTags } from '@/components/useStudyTags'
import { useDict } from '@/i18n'
import { worksPath } from '@/routes/links'
import { NotFound } from '@/routes/NotFound/NotFound'
import { type StudyRoute, useStudyRoute } from '@/routes/studyLoader'

import { Closing } from './sections/Closing'
import { Curious } from './sections/Curious'
import { readingMinutes } from './sections/readingMinutes'
import { Summary } from './sections/Summary'

// Sekme basligi calismanin basligi ve sitenin basligindan olusur, mockup'taki
// "baslik · Veri · PaktLabs" bicimi. Sitenin basligi veri sayfasinin kendi
// basligidir, ayrica bir anahtar tutulmaz. Kapak, govde ve yazar kutusu kod
// sayfasiyla ortak ve StudyLayout'ta, ozet bandi, Meraklisina karti ve kapanis bu sayfaya ozel.
// Calismanin metni ve dosyalari rota yukleyicisinden hazir gelir, calisma
// yoksa yukleyici bir sey yuklemez.
export function Study() {
  const route = useStudyRoute()

  if (!route) return <NotFound />
  return <StudyView {...route} />
}

// Calisma bulunduktan sonraki kisim ayri bir bilesen, cunku etiketlerin
// metni bir hook'la kuruluyor ve hook'lar bulunamadi kontrolunden once
// kosulsuz cagrilmali. Donus baglantisi veri sayfasindaki listeye gider,
// bulunamadi sayfasindaki donus dugmesiyle ayni adres.
function StudyView({ study, page, files }: StudyRoute) {
  const { language } = useLanguage()
  const { home, study: dict } = useDict()
  const tags = useStudyTags(study)
  const title = study.title[language]
  const minutes = readingMinutes(page, language)

  return (
    <Page title={`${title} · ${home.meta.title}`} description={page.lede[language]}>
      <StudyLayout
        study={study}
        files={files}
        crumb={{ href: worksPath(), back: dict.cover.back, current: study.number }}
        tags={tags}
        title={title}
        lede={page.lede[language]}
        facts={page.facts}
        chapters={page.chapters}
        tocNote={`${dict.toc.readingTime.before} ${minutes} ${dict.toc.readingTime.after}`}
        dataLanguage={dict.dataLanguage}
        beforeAuthor={<Curious study={study} />}
      >
        <Summary summary={page.summary} />
      </StudyLayout>
      <Closing study={study} closing={page.closing} />
    </Page>
  )
}
