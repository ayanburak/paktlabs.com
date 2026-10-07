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

import type { Study } from '@/content/studies/types'
import { techLogos } from '@/content/techStack'
import { useDict } from '@/i18n'

import styles from './StudyCard.module.css'

interface StudyCardProps {
  study: Study
}

// Site ici gecis oldugu icin duz a yerine Link kullaniliyor, sayfa yeniden
// yuklenmeden detay sayfasina gecilir. One cikan kartta etiket satiri yok,
// mockup'ta da yok, yerini teknik detaylar aliyor.
export function StudyCard({ study }: StudyCardProps) {
  const { language } = useLanguage()
  const { home } = useDict()
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const text = study.text[language]
  const { feature } = study

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
        <h3>{text.title}</h3>
      </div>

      <div className={cx(styles.box, styles.panel)}>
        <div className={styles.body}>
          <p className={styles.lead}>{text.card.lead}</p>
          {text.card.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {!feature && (
          <ul className={styles.tags}>
            {study.tags.map((tag) => (
              <li key={tag}>{home.works.tags[tag]}</li>
            ))}
            <li>{study.year}</li>
          </ul>
        )}
        <span className={styles.go}>{home.works.go}</span>
      </div>

      {feature && (
        <div className={cx(styles.box, styles.detail)}>
          <span className="eyebrow">{home.works.details}</span>
          <ul className={styles.facts}>
            {feature.facts[language].map((row) => (
              <li key={row.label}>
                <span className={styles.label}>{row.label}</span>
                {row.value}
              </li>
            ))}
          </ul>
          <div className={styles.tools}>
            <span className={styles.label}>{home.works.tools}</span>
            <span className={styles.mini}>
              {feature.tools.map((name) => (
                <img key={name} src={techLogos[name]} alt={name} />
              ))}
            </span>
          </div>
        </div>
      )}
    </Link>
  )
}
