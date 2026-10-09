/*
file: StudySource.tsx
importable: StudySource

/work/:slug/source adresindeki kod ve veri sayfasi. Calisma yoksa ya da
calismanin kodu sitede degil GitHub'daysa bulunamadi sayfasi gosterilir.

description: Bir calismanin paylasilan kod ve veri orneklerini gosteren sayfayi olusturan bilesen.
*/

import { useLanguage } from '@paktlabs/brand/i18n/language'

import { Page } from '@/components/Page'
import { useDict } from '@/i18n'
import { NotFound } from '@/routes/NotFound/NotFound'
import { useSourceRoute } from '@/routes/studyLoader'

// Sekme basligi calisma sayfasiyla ayni bicimde kurulur. Kapak, dosya agaci,
// kod dosyalari ve veri ornekleri Faz 5'in altinci paketinde gelecek, su an
// sayfada yalnizca baslik var. Calisma yoksa ya da kodu GitHub'daysa rota
// yukleyicisi bir sey yuklemez, adres bilinmeyen bir adres gibi davranir.
export function StudySource() {
  const route = useSourceRoute()
  const { language } = useLanguage()
  const { home } = useDict()

  if (!route) return <NotFound />

  const title = route.source.title[language]

  return (
    <Page title={`${title} · ${home.meta.title}`} description={route.source.lede[language]}>
      <h1>{title}</h1>
    </Page>
  )
}
