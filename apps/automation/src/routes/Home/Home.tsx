/*
file: Home.tsx
importable: Home

description: automation sitesinin yapim asamasindaki ana sayfasi, ortak yer tutucu bolum ve iletisim bolumu.
*/

import { Page } from '@paktlabs/brand/components/Page'
import { UnderConstruction } from '@paktlabs/brand/components/UnderConstruction'
import { mainSiteUrl } from '@paktlabs/brand/content/site'

import { useDict } from '@/i18n'

// Sayfanin duzeni, cizimi ve ortak metinleri brand'de, burada yalnizca bu
// sitenin basligi ve aciklamasi var. Ortak iletisim bolumu bu sayfada yok,
// bolumun kendi dugmesi iletisim sayfasina gidiyor. Gercek site kurulurken bu dosya sitenin
// kendi bolumleriyle yeniden yazilir.
export function Home() {
  const { meta, home } = useDict()

  return (
    <Page title={meta.title} description={meta.description} current="automation" homeHref={mainSiteUrl}>
      <UnderConstruction title={home.title} lead={home.lead} />
    </Page>
  )
}
