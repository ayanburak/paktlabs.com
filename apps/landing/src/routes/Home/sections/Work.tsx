/*
file: Work.tsx
importable: Work

Veri bandinin listesi sozlukten degil brand'deki dataTags'ten gelir, her
satir data'nin calismalar bolumune o kategori secili olarak gider. Otomasyon
ve web listeleri landing'in sozlugunde duz yazi olarak durur.

description: Kabul ettigimiz isler basligi ve veri/otomasyon/web seritlerini sirayla dizen bolum.
*/

import { dataTagUrl, dataTags } from '@paktlabs/brand/content/dataTags'
import { disciplineUrls } from '@paktlabs/brand/content/disciplines'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { cx } from '@paktlabs/brand/lib/cx'

import autoSvg from '@/assets/illustrations/auto.svg'
import dataSvg from '@/assets/illustrations/data.svg'
import webSvg from '@/assets/illustrations/web.svg'
import { useDict } from '@/i18n'

import styles from './Work.module.css'
import { Band } from './Work/Band'

// Sira ve adlar data'nin suzgeciyle ayni kaynaktan gelir, iki site
// birbirinden ayrilamaz.
export function Work() {
  const { work } = useDict()
  const { dataTags: tagNames } = useBrandDict()
  const head = useReveal<HTMLDivElement>()
  const dataList = dataTags.map((tag) => ({ label: tagNames[tag], href: dataTagUrl(tag) }))
  const plain = (list: readonly string[]) => list.map((label) => ({ label }))

  return (
    <section id="isler" className={cx('full-bleed', styles.work)}>
      <div ref={head.ref} className={cx('reveal', head.visible && 'in', styles.head)}>
        <span className="eyebrow">{work.eyebrow}</span>
        <h2>{work.title}</h2>
      </div>

      <Band
        tone="data"
        flip
        tightTop
        index={work.bands.data.index}
        title={work.bands.data.title}
        desc={work.bands.data.desc}
        href={disciplineUrls.data}
        goLabel={work.go}
        list={dataList}
        artSrc={dataSvg}
        artSide="right"
        groundOffset="32.91%"
        artWidth="clamp(236px, 23.6vw, 378px)"
      />

      <Band
        tone="auto"
        flip={false}
        index={work.bands.automation.index}
        title={work.bands.automation.title}
        desc={work.bands.automation.desc}
        href={disciplineUrls.automation}
        goLabel={work.go}
        list={plain(work.bands.automation.list)}
        artSrc={autoSvg}
        artSide="left"
        groundOffset="1.77%"
        artWidth="clamp(200px, 20vw, 320px)"
      />

      <Band
        tone="web"
        flip
        index={work.bands.web.index}
        title={work.bands.web.title}
        desc={work.bands.web.desc}
        href={disciplineUrls.web}
        goLabel={work.go}
        list={plain(work.bands.web.list)}
        artSrc={webSvg}
        artSide="right"
        groundOffset="12.31%"
        artWidth="clamp(200px, 20vw, 320px)"
      />
    </section>
  )
}
