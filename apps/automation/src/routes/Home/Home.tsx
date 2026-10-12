/*
file: Home.tsx
importable: Home

description: automation sitesinin yapim asamasindaki ana sayfasi, ortak yer tutucu bolum ve iletisim bolumu.
*/

import { ArtSlot } from '@paktlabs/brand/components/ArtSlot'
import { Contact } from '@paktlabs/brand/components/Contact'
import { Page } from '@paktlabs/brand/components/Page'
import { UnderConstruction } from '@paktlabs/brand/components/UnderConstruction'
import { mainSiteUrl } from '@paktlabs/brand/content/site'

import { useDict } from '@/i18n'

// Sayfanin duzeni ve ortak metinleri brand'de, burada yalnizca bu sitenin
// basligi, aciklamasi ve cizimi var. Cizim gelene kadar kesikli yer tutucu
// duruyor, gelince ArtSlot'un yerine tek bir img konur. Gercek site
// kurulurken bu dosya sitenin kendi bolumleriyle yeniden yazilir.
export function Home() {
  const { meta, home } = useDict()

  return (
    <Page title={meta.title} description={meta.description} current="automation" homeHref={mainSiteUrl}>
      <UnderConstruction
        discipline="automation"
        title={home.title}
        lead={home.lead}
        art={<ArtSlot label={home.art.label} note={home.art.note} />}
      />
      <Contact />
    </Page>
  )
}
