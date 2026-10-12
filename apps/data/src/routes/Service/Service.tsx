/*
file: Service.tsx
importable: Service

/services/:slug adresindeki hizmet sayfasi. Adresteki ad bir kategoriye
karsilik gelmiyorsa bulunamadi sayfasi gosterilir. Sayfanin kendisi brand'deki
ortak hizmet sablonudur, bu rota hizmeti bulur, adresleri kurar ve sablonu
cagirir.

description: Adresteki hizmeti bulup brand'deki hizmet sablonunu data'nin adresleriyle cagiran rota.
*/

import { useParams } from 'react-router-dom'

import { ArtSlot } from '@paktlabs/brand/components/ArtSlot'
import { ServicePage, type ServiceLink } from '@paktlabs/brand/components/service/ServicePage'
import { dataServicePath, dataTagSlugs, dataTags, type DataTag } from '@paktlabs/brand/content/dataTags'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { sequenceNumber } from '@paktlabs/brand/lib/sequenceNumber'

import { Page } from '@/components/Page'
import { services } from '@/content/services'
import { useDict } from '@/i18n'
import { dataTagFromSlug, servicesPath, worksPath } from '@/routes/links'
import { NotFound } from '@/routes/NotFound/NotFound'

export function Service() {
  const { slug = '' } = useParams()
  const tag = dataTagFromSlug(slug)
  if (!tag) return <NotFound />
  return <ServiceView tag={tag} />
}

// Hizmet bulunduktan sonraki kisim ayri bir bilesen, cunku hook'lar bulunamadi
// kontrolunden once kosulsuz cagrilmali. Komsu hizmetler dongu halinde
// kurulur, ilk hizmetin oncesi sonuncusu, sonuncunun sonrasi ilkidir.
// Cizimler gelene kadar kesikli yer tutucular durur, kutunun etiketi cizimin
// dosya adini ve oranini soyler. Kapsam cizimi her hizmete ozel, surec
// cizimi alti hizmette ayni.
function ServiceView({ tag }: { tag: DataTag }) {
  const { language } = useLanguage()
  const { home, serviceArt } = useDict()
  const { dataTags: names, nav } = useBrandDict()
  const service = services[tag]
  const index = dataTags.indexOf(tag)
  const title = names[tag]

  const artLabel = (file: string) => `${serviceArt.label} · ${file}.svg · ${serviceArt.ratio}`
  const link = (other: DataTag): ServiceLink => ({
    name: names[other],
    href: dataServicePath(other),
    number: sequenceNumber(dataTags.indexOf(other)),
  })
  const neighbor = (offset: number) => link(dataTags[(index + offset + dataTags.length) % dataTags.length] ?? tag)

  return (
    <Page title={`${title} · ${home.meta.title}`} description={service.lede[language]}>
      <ServicePage
        discipline={nav.data}
        number={sequenceNumber(index)}
        total={sequenceNumber(dataTags.length - 1)}
        title={title}
        service={service}
        scopeArt={<ArtSlot floating label={artLabel(`service-${dataTagSlugs[tag]}`)} note={service.art[language]} />}
        stepsArt={<ArtSlot floating label={artLabel('service-steps')} note={serviceArt.steps} />}
        backHref={servicesPath}
        worksHref={worksPath(tag)}
        prev={neighbor(-1)}
        next={neighbor(1)}
      />
    </Page>
  )
}
