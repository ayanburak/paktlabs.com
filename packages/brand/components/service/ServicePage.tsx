/*
file: ServicePage.tsx
importable: ServicePage, ServiceLink

Butun disiplinlerin hizmet sayfalarinin ortak sablonu. Sayfa bes bolumden
olusur: kapak, kapsam, surec, teslim ve kapanis. Bilesen adres bilmez,
sitenin rotasi hizmeti bulur, komsu hizmetlerin adresini kurar ve hazir
degerlerle cagirir. Sekme basligini ve ust bari
sitenin kendi Page cercevesi verir.

    <Page title={title} description={service.lede[language]}>
      <ServicePage
        discipline="Veri" number="01" total="06" title="Veri Hazirlama"
        service={service} scopeArt={<ArtSlot ... />} stepsArt={<ArtSlot ... />}
        backHref="/#services" worksHref="/?tag=preparation#works"
        prev={prev} next={next}
      />
    </Page>

scopeArt kapsam bolumunun yanindaki, stepsArt surec bolumunun yanindaki
cizimdir. Ikisi de bolumun icinde dikeyde ortada, havada durur. Cizim gelene
kadar site oraya kendi yer tutucusunu verir, cizim hazir oldugunda tek bir
img verir.

description: Bir hizmeti kapak, kapsam, surec, teslim ve kapanis bolumleriyle anlatan ortak sayfa sablonu.
*/

// NOTE: Baglantilar duz a etiketi, cunku brand router bilmiyor. data gibi
// tek sayfali bir sitede onceki ve sonraki hizmete gecis
// sayfayi bastan yukler. Hizmet sayfasi kisa ve hafif oldugu icin bu kabul
// edildi, calisma listesi de suzgeci zaten yalnizca ilk acilista okuyor.

import type { ReactNode } from 'react'

import type { Service } from '../../content/service'

import { Closing } from './Closing'
import { Hero } from './Hero'
import { Outcomes } from './Outcomes'
import { Scope } from './Scope'
import { Steps } from './Steps'

// Kapanistaki onceki ve sonraki hizmete giden baglanti. number hizmetin
// disiplin icindeki sirasi.
export interface ServiceLink {
  name: string
  href: string
  number: string
}

interface ServicePageProps {
  discipline: string
  number: string
  total: string
  title: string
  service: Service
  scopeArt: ReactNode
  stepsArt: ReactNode
  backHref: string
  worksHref: string
  prev: ServiceLink
  next: ServiceLink
}

// Bolumler sirayla dizilir, her bolum yalnizca kendi ihtiyac duydugu
// parcayi alir.
export function ServicePage(props: ServicePageProps) {
  const { service } = props

  return (
    <>
      <Hero
        discipline={props.discipline}
        number={props.number}
        total={props.total}
        title={props.title}
        lede={service.lede}
        facts={service.facts}
        backHref={props.backHref}
        worksHref={props.worksHref}
      />
      <Scope rows={service.scope} art={props.scopeArt} />
      <Steps rows={service.steps} art={props.stepsArt} />
      <Outcomes outcomes={service.outcomes} />
      <Closing worksHref={props.worksHref} prev={props.prev} next={props.next} />
    </>
  )
}
