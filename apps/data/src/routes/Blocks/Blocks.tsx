/*
file: Blocks.tsx
importable: Component

/blocks adresindeki blok katalogu. Calisma sayfalarinda kullanilabilen her
parca turunu ornek verilerle, bir calisma sayfasindaki gorunusuyle gosterir:
kapak, solda icindekiler, her parca turu icin numarali bir bolum. Sayfa
ziyaretci icin degil, calisma yazan ekip icindir. Sunucuda sifreyle
korunur, sitede hicbir yerden baglanti verilmez.

    { path: '/blocks', loader: () => assetFiles.load(CATALOG_SLUG), lazy: () => import('./routes/Blocks/Blocks') }

description: Butun parca turlerini ornek verilerle gosteren, ekibe ozel katalog sayfasi.
*/

// NOTE: Sifre korumasi nginx'te, /blocks adresine konur. Bu sayfanin JS
// dosyasi sitenin butun JS dosyalari gibi /assets altindan indirilebilir.
// Katalogda gizli bir bilgi olmadigi icin bunun sakincasi yok, amac sayfayi
// ziyaretcinin ve arama motorlarinin gozunden uzak tutmak.

import { useLoaderData } from 'react-router-dom'

import { Page } from '@/components/Page'
import { Body } from '@/components/study/Body'
import { Cover } from '@/components/study/Cover'
import { DataLanguageProvider } from '@/components/study/DataLanguageProvider'
import { StudyFilesContext } from '@/components/study/studyFiles'
import { catalogChapters } from '@/content/studies/catalog/page'
import type { StudyFileSet } from '@/content/studies/files'
import { useDict } from '@/i18n'

// Router'in lazy rotasi Component adini arar, sayfa kodu ana pakete girmez,
// yalnizca /blocks acilinca indirilir. Ornek dosyalar rotanin yukleyicisinden
// hazir gelir, orijinal dilleri Turkce.
export function Component() {
  const files = useLoaderData() as StudyFileSet
  const { home, study, catalog: dict } = useDict()

  return (
    <Page title={`${dict.title} · ${home.meta.title}`} description={dict.lede}>
      <DataLanguageProvider original="tr">
        <StudyFilesContext.Provider value={files}>
          <Cover
            crumb={{ href: '/', back: dict.crumb.back, current: dict.crumb.current }}
            tags={[]}
            title={dict.title}
            lede={dict.lede}
            facts={[
              { label: dict.facts.count, value: String(catalogChapters.length) },
              { label: dict.facts.guide, value: 'apps/data/src/content/studies/README.md' },
              { label: dict.facts.access, value: dict.facts.accessValue },
            ]}
          />
          <Body
            chapters={catalogChapters}
            tocNote={dict.tocNote}
            dataLanguage={study.dataLanguage}
            afterChapters={null}
          />
        </StudyFilesContext.Provider>
      </DataLanguageProvider>
    </Page>
  )
}
