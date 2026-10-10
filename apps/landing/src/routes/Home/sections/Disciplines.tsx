/*
file: Disciplines.tsx
importable: Disciplines

description: Gold bant icinde figur ve uc disiplin kartini bir arada gosteren bolum.
*/

import { RevealImg } from '@paktlabs/brand/components/RevealImg'
import { disciplineOrder, disciplineUrls } from '@paktlabs/brand/content/disciplines'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import type { Language } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import inceleyinMobileSvg from '@/assets/illustrations/inceleyin-mobile.svg'
import inceleyinSvg from '@/assets/illustrations/inceleyin.svg'
import { DisciplineCard } from '@/components/DisciplineCard'
import { useDict } from '@/i18n'

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
          {/* Kartlarin sirasi ust bar ve alt bilgiyle ayni listeden gelir. */}
          {disciplineOrder.map((key) => (
            <DisciplineCard
              key={key}
              title={disciplines.items[key].title}
              description={disciplines.items[key].desc}
              go={disciplines.go}
              href={disciplineUrls[key]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
