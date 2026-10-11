/*
file: StudySource.tsx
importable: StudySource

/work/:slug/source adresindeki kod ve veri sayfasi. Detay sayfasiyla ayni
iskeleti kullanir: kapak, icindekiler, numarali bolumler ve yazar kutusu.
Ozet bandi ve kapanis yoktur, sayfa calismaya donus kartiyla biter.
Calisma yoksa ya da calismanin kodu sitede degil GitHub'daysa bulunamadi
sayfasi gosterilir.

description: Bir calismanin paylasilan kod ve veri orneklerini gosteren sayfayi olusturan bilesen.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { Page } from '@/components/Page'
import { LinkCard } from '@/components/study/LinkCard'
import { StudyLayout } from '@/components/study/StudyLayout'
import { useDict } from '@/i18n'
import { NotFound } from '@/routes/NotFound/NotFound'
import { useSourceRoute } from '@/routes/studyLoader'

// Calismanin kod sayfasinin metni ve dosyalari rota yukleyicisinden hazir
// gelir. Calisma yoksa ya da kodu GitHub'daysa yukleyici bir sey yuklemez,
// adres bilinmeyen bir adres gibi davranir.
//
// Sekme basligi detay sayfasiyla ayni bicimde kurulur. Kapaktaki donus
// baglantisi ve sondaki kart calismanin detay sayfasina gider. Kapaktaki
// etiketler calismanin konu etiketleri degil, kodun yazildigi araclardir.
// Kod ve veri sayfada acik durdugu icin icindekilerin altinda okuma suresi
// yerine bunu soyleyen bir not durur.
export function StudySource() {
  const route = useSourceRoute()
  const { language } = useLanguage()
  const { home, source: dict } = useDict()

  if (!route) return <NotFound />

  const { study, source, files } = route
  const title = source.title[language]
  const studyPath = `/work/${study.slug}`

  return (
    <Page title={`${title} · ${home.meta.title}`} description={source.lede[language]}>
      <StudyLayout
        study={study}
        files={files}
        crumb={{ href: studyPath, back: dict.crumb.back, current: `${study.number} · ${dict.crumb.current}` }}
        tags={source.tags}
        title={title}
        lede={source.lede[language]}
        facts={source.facts}
        chapters={source.chapters}
        tocNote={dict.toc.note}
        dataLanguage={dict.dataLanguage}
        afterAuthor={
          <LinkCard
            to={studyPath}
            label={dict.back.label}
            title={study.title[language]}
            text={dict.back.text}
            go={dict.back.go}
          />
        }
      />
    </Page>
  )
}
