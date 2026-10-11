/*
file: Work.tsx
importable: Work

Veri bandinin listesi sozlukten degil brand'deki dataTags'ten gelir, her
satir data'daki o kategorinin hizmet sayfasina gider. Otomasyon
ve web listeleri landing'in sozlugunde duz yazi olarak durur.

description: Kabul ettigimiz isler basligi ve veri/otomasyon/web seritlerini sirayla dizen bolum.
*/

import { dataServiceUrl, dataTags } from '@paktlabs/brand/content/dataTags'
import { disciplineUrls } from '@paktlabs/brand/content/disciplines'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { cx } from '@paktlabs/brand/lib/cx'

import autoSvg from '@/assets/illustrations/auto.svg'
import dataSvg from '@/assets/illustrations/data.svg'
import webSvg from '@/assets/illustrations/web.svg'
import { useDict } from '@/i18n'

import styles from './Work.module.css'
import { Band } from './Band'

// Her bandin sozluk anahtari, figuru ve figurun olculeri. Sira ekrandaki
// siradir, figur kenari bandin duzenini de belirler.
const bands = [
  {
    key: 'data',
    tone: 'data',
    artSrc: dataSvg,
    artSide: 'right',
    groundOffset: '32.91%',
    artWidth: 'clamp(236px, 23.6vw, 378px)',
    tightTop: true,
  },
  {
    key: 'automation',
    tone: 'auto',
    artSrc: autoSvg,
    artSide: 'left',
    groundOffset: '1.77%',
    artWidth: 'clamp(200px, 20vw, 320px)',
  },
  {
    key: 'web',
    tone: 'web',
    artSrc: webSvg,
    artSide: 'right',
    groundOffset: '12.31%',
    artWidth: 'clamp(200px, 20vw, 320px)',
  },
] as const

// Sira ve adlar data'nin suzgeciyle ayni kaynaktan gelir, iki site
// birbirinden ayrilamaz.
export function Work() {
  const { work } = useDict()
  const { dataTags: tagNames } = useBrandDict()
  const head = useReveal<HTMLDivElement>()
  const dataList = dataTags.map((tag) => ({ label: tagNames[tag], href: dataServiceUrl(tag) }))
  const plain = (list: readonly string[]) => list.map((label) => ({ label }))
  const lists = {
    data: dataList,
    automation: plain(work.bands.automation.list),
    web: plain(work.bands.web.list),
  }

  return (
    <section id="work" className={cx('full-bleed', styles.work)}>
      <div ref={head.ref} className={cx('reveal', head.visible && 'in', styles.head)}>
        <span className="eyebrow">{work.eyebrow}</span>
        <h2>{work.title}</h2>
      </div>

      {bands.map(({ key, ...figure }) => (
        <Band
          key={key}
          {...figure}
          index={work.bands[key].index}
          title={work.bands[key].title}
          desc={work.bands[key].desc}
          href={disciplineUrls[key]}
          goLabel={work.go}
          list={lists[key]}
        />
      ))}
    </section>
  )
}
