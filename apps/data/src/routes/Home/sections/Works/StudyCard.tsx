/*
file: StudyCard.tsx
importable: StudyCard

Calisma listesindeki tek bir kart. Calismanin feature alani varsa kart tam
satir tutan one cikan hale gecer ve teknik detaylarla araclari da gosterir.
Kartin tamami calismanin detay sayfasina giden tek bir baglantidir.

description: Bir calismayi veri sayfasindaki listede normal ya da one cikan kart olarak gosteren bilesen.
*/

import { Link } from 'react-router-dom'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import { TagList } from '@/components/TagList'
import { TechLogo } from '@/components/TechLogo'
import type { StudyListing } from '@/content/studies/types'
import { useDict } from '@/i18n'

import styles from './StudyCard.module.css'

interface StudyCardProps {
  study: StudyListing
}

// Site ici gecis oldugu icin duz a yerine Link kullaniliyor, sayfa yeniden
// yuklenmeden detay sayfasina gecilir. One cikan kartta etiket satiri yok,
// mockup'ta da yok, yerini teknik detaylar aliyor. Kart yalnizca liste katini
// okur, boylece gercek calismayi da yer tutucuyu da ayni sekilde gosterir.
export function StudyCard({ study }: StudyCardProps) {
  const { language } = useLanguage()
  const { home } = useDict()
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const { title, card, feature } = study

  return (
    <Link
      ref={ref}
      to={`/work/${study.slug}`}
      className={cx('reveal', visible && 'in', styles.card, feature && styles.feature)}
    >
      <div className={cx(styles.box, styles.head)}>
        <span className="eyebrow mono">
          {feature ? `${study.number} · ${home.works.featured}` : study.number}
        </span>
        <h3>{title[language]}</h3>
      </div>

      <div className={cx(styles.box, styles.panel)}>
        <div className={styles.body}>
          <p className={styles.lead}>{card.lead[language]}</p>
          {card.body.map((paragraph) => (
            <p key={paragraph[language]}>{paragraph[language]}</p>
          ))}
        </div>
        {!feature && <TagList tags={study.tags} year={study.year} />}
        <span className={styles.go}>{home.works.go}</span>
      </div>

      {feature && (
        <div className={cx(styles.box, styles.detail)}>
          <span className="eyebrow">{home.works.details}</span>
          <ul className={styles.facts}>
            {feature.facts.map((row) => (
              <li key={row.label[language]}>
                <span className={styles.label}>{row.label[language]}</span>
                {row.value[language]}
              </li>
            ))}
          </ul>
          <div className={styles.tools}>
            <span className={styles.label}>{home.works.tools}</span>
            <span className={styles.mini}>
              {feature.tools.map((name) => (
                <span key={name} className={styles.tool}>
                  <TechLogo name={name} className={styles.toolLogo} />
                </span>
              ))}
            </span>
          </div>
        </div>
      )}
    </Link>
  )
}
