/*
file: Curious.tsx
importable: Curious

Meraklisina karti. Bolumler bittikten sonra kodu ve veriyi gormek isteyen
okuru bir sonraki katmana goturur. Firma koda izin verdiyse kart yalnizca
GitHub'daki depoya, vermediyse sitedeki kod ve veri sayfasina baglanir. Kart
her detay sayfasinda bulunur.

description: Calismanin koduna ve verisine giden iki kutulu kart.
*/

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import type { Study } from '@/content/studies/types'
import { useDict } from '@/i18n'

import styles from './Curious.module.css'

interface CuriousProps {
  study: Study
}

// Metin kodun nerede durduguna gore sozlukten secilir, calismaya ozel degil.
// Kod sayfasi site ici oldugu icin Link, depo baska bir site oldugu icin duz
// baglanti. Kartin tamami tek bir baglantidir.
export function Curious({ study }: CuriousProps) {
  const { study: dict } = useDict()
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const text = dict.curious[study.code.kind]
  const className = cx('reveal', visible && 'in', styles.card)

  const content: ReactNode = (
    <>
      <span className={cx(styles.box, styles.head)}>
        <span className="eyebrow">{dict.curious.label}</span>
        <h3>{text.title}</h3>
      </span>
      <span className={cx(styles.box, styles.panel)}>
        <span className={styles.text}>{text.text}</span>
        <span className={styles.go}>{text.go}</span>
      </span>
    </>
  )

  return study.code.kind === 'page' ? (
    <Link ref={ref} to={`/work/${study.slug}/source`} className={className}>
      {content}
    </Link>
  ) : (
    <a ref={ref} href={study.code.url} className={className}>
      {content}
    </a>
  )
}
