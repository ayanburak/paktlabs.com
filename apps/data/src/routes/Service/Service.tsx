/*
file: Service.tsx
importable: Service

/services/:slug adresindeki hizmet sayfasi. Adresteki ad bir kategoriye
karsilik gelmiyorsa bulunamadi sayfasi gosterilir. Sayfa calisma sayfalarinin
kapagini ve numarali bolumlerini kullanir, icindekiler, ozet bandi ve yazar
kutusu yoktur, sayfa kisadir. Kapanista o kategorideki calismalara ve
iletisim sayfasina giden iki kart durur.

description: Bir veri hizmetini kapsam, surec ve teslim bolumleriyle anlatan sayfa.
*/

import { useParams } from 'react-router-dom'

import { contactPageUrl } from '@paktlabs/brand/content/contact'
import { dataTagFromSlug, dataTagPath, dataTags, type DataTag } from '@paktlabs/brand/content/dataTags'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'

import { Page } from '@/components/Page'
import { BlockView } from '@/components/study/blocks/BlockView'
import { sequenceNumber } from '@/components/study/blocks/format'
import { Chapter } from '@/components/study/Chapter'
import { Cover } from '@/components/study/Cover'
import { LinkCard } from '@/components/study/LinkCard'
import { services } from '@/content/services'
import type { Block } from '@/content/studies/blocks'
import { useDict } from '@/i18n'
import { NotFound } from '@/routes/NotFound/NotFound'

import styles from './Service.module.css'

export function Service() {
  const { slug = '' } = useParams()
  const tag = dataTagFromSlug(slug)
  if (!tag) return <NotFound />
  return <ServiceView tag={tag} />
}

// Hizmet bulunduktan sonraki kisim ayri bir bilesen, cunku hook'lar bulunamadi
// kontrolunden once kosulsuz cagrilmali. Uc bolumun adlari sozlukten, metni
// hizmetin icerik dosyasindan gelir. Bolumlerin govdesi calisma sayfalarinin
// parcalariyla cizilir: kapsam ve teslim liste, surec istasyon hatti.
function ServiceView({ tag }: { tag: DataTag }) {
  const { language } = useLanguage()
  const { home, service: dict } = useDict()
  const { dataTags: names } = useBrandDict()
  const service = services[tag]
  const title = names[tag]

  const chapters: { id: string; text: { label: string; title: string }; lede: string; block: Block }[] = [
    {
      id: 'kapsam',
      text: dict.chapters.scope,
      lede: service.scope.lede[language],
      block: { type: 'list', view: 'stack', items: service.scope.items },
    },
    {
      id: 'surec',
      text: dict.chapters.steps,
      lede: service.steps.lede[language],
      block: { type: 'stations', items: service.steps.items },
    },
    {
      id: 'teslim',
      text: dict.chapters.delivery,
      lede: service.delivery.lede[language],
      block: { type: 'list', view: 'columns', items: service.delivery.items },
    },
  ]

  return (
    <Page title={`${title} · ${home.meta.title}`} description={service.lede[language]}>
      <Cover
        crumb={{ href: '/#hizmetler', back: dict.back, current: sequenceNumber(dataTags.indexOf(tag)) }}
        tags={[dict.tag]}
        title={title}
        lede={service.lede[language]}
        kunye={[
          { label: dict.kunye.input, value: service.kunye.input[language] },
          { label: dict.kunye.output, value: service.kunye.output[language] },
          { label: dict.kunye.tools, value: service.kunye.tools },
        ]}
      />
      <div className={styles.body}>
        {chapters.map((chapter, i) => (
          <Chapter
            key={chapter.id}
            id={chapter.id}
            number={sequenceNumber(i)}
            label={chapter.text.label}
            title={chapter.text.title}
            lede={chapter.lede}
          >
            <BlockView block={chapter.block} />
          </Chapter>
        ))}
      </div>
      <section className={styles.closing}>
        <div className={styles.inner}>
          <span className="eyebrow">{dict.closing.label}</span>
          <h2>{dict.closing.title}</h2>
          <nav className={styles.next} aria-label={dict.closing.nav}>
            <LinkCard to={dataTagPath(tag)} {...dict.closing.works} />
            <LinkCard href={contactPageUrl} {...dict.closing.contact} />
          </nav>
        </div>
      </section>
    </Page>
  )
}
