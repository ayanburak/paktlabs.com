/*
file: Band.tsx
importable: Band

Veri, otomasyon ve web seritlerinin ucu de bu bilesenin ayni sekle sahip uc
somut kullanimi, tone ve figurun hangi kenara oturdugu disardan verilir.

description: Isler bolumundeki tek bir disiplin seridi, buyuk sozcuk/aciklama sutunu, liste ve kose figuru.
*/

import type { CSSProperties } from 'react'

import { RevealImg } from '@/components/RevealImg'
import { useReveal } from '@/hooks/useReveal'
import { cx } from '@/lib/cx'

import styles from './Band.module.css'

interface BandProps {
  tone: 'data' | 'auto' | 'web'
  flip: boolean
  tightTop?: boolean
  index: string
  title: string
  desc: string
  href: string
  goLabel: string
  list: readonly string[]
  artSrc: string
  artSide: 'left' | 'right'
  /** Görselin alt kenarı ile kendi zemin çizgisi arasındaki yüzde mesafesi.
      Band.module.css bu değeri kalıcı translate kaydırması için kullanır. */
  groundOffset: string
  artWidth: string
}

export function Band({
  tone,
  flip,
  tightTop,
  index,
  title,
  desc,
  href,
  goLabel,
  list,
  artSrc,
  artSide,
  groundOffset,
  artWidth,
}: BandProps) {
  const word = useReveal<HTMLDivElement>()
  const listReveal = useReveal<HTMLOListElement>()

  const rootStyle = { '--tone': `var(--tone-${tone})` } as CSSProperties
  const artStyle = { '--ground-offset': groundOffset, '--art-width': artWidth } as CSSProperties

  return (
    <div
      className={cx(
        styles.band,
        tone === 'web' && styles.web,
        flip && styles.flip,
        tightTop && styles.tightTop,
      )}
      style={rootStyle}
    >
      <div className={styles.inner}>
        <div ref={word.ref} className={cx('reveal', word.visible && 'in', styles.word)}>
          <span className="eyebrow">{index}</span>
          <h2>{title}</h2>
          <p className={styles.desc}>{desc}</p>
          <a className={styles.go} href={href}>
            {goLabel}
          </a>
        </div>
        <ol ref={listReveal.ref} className={cx('reveal', listReveal.visible && 'in', styles.list)}>
          {list.map((item) => (
            <li key={item}>
              <span className={styles.ix} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ol>
      </div>
      <RevealImg
        src={artSrc}
        className={cx(styles.art, artSide === 'left' ? styles.artLeft : styles.artRight)}
        style={artStyle}
      />
    </div>
  )
}
