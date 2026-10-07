/*
file: Disciplines.tsx
importable: Disciplines

description: Gold bant icinde figur ve uc disiplin kartini bir arada gosteren bolum.
*/

import { RevealImg } from '@paktlabs/brand/components/RevealImg'
import { disciplineUrls } from '@paktlabs/brand/content/disciplines'
import { cx } from '@paktlabs/brand/lib/cx'

import inceleyinMobileSvg from '@/assets/illustrations/inceleyin-mobile.svg'
import inceleyinSvg from '@/assets/illustrations/inceleyin.svg'
import { DisciplineCard } from '@/components/DisciplineCard'
import { useDict, useLanguage } from '@/i18n'
import type { Language } from '@/i18n'

import styles from './Disciplines.module.css'

// Dile ozel dosyalar hazir olana kadar iki dil de mevcut gorselleri kullanir.
const illustrations = {
  tr: { desktop: inceleyinSvg, mobile: inceleyinMobileSvg },
  en: { desktop: inceleyinSvg, mobile: inceleyinMobileSvg },
} satisfies Record<Language, { desktop: string; mobile: string }>

export function Disciplines() {
  const { disciplines } = useDict()
  const { language } = useLanguage()
  const illustration = illustrations[language]
  const cards = [
    { key: 'data', ...disciplines.items.data },
    { key: 'automation', ...disciplines.items.automation },
    { key: 'web', ...disciplines.items.web },
  ] as const

  return (
    <section id="disiplinler" className={cx('full-bleed', styles.disciplines)}>
      <div className={styles.wrap}>
        {/* Tasarimda bu bandin gorunen basligi yok. Kartlarin h3'leri bir ust
            bolumun basligina bagli kalmasin diye baslik sadece ekran okuyucuya var. */}
        <h2 className="sr">{disciplines.eyebrow}</h2>
        {/* Esik CSS ile ayni kalmali, tarayici yalnizca yerlesime uygun dosyayi indirir. */}
        <picture className={styles.art}>
          <source media="(max-width: 1680px)" srcSet={illustration.mobile} />
          <RevealImg src={illustration.desktop} alt={disciplines.artAlt} />
        </picture>
        <div className={styles.grid}>
          {cards.map((item) => (
            <DisciplineCard
              key={item.key}
              title={item.title}
              description={item.desc}
              go={disciplines.go}
              href={disciplineUrls[item.key]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
