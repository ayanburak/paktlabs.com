/*
file: Band.tsx
importable: Band

Veri, otomasyon ve web seritlerinin ucu de bu bilesenin ayni sekle sahip uc
somut kullanimi, tone ve figurun hangi kenara oturdugu disardan verilir.
Figur sagdaysa bant ters dizilir, ayri bir prop yoktur.
Listenin bir satirina href verilirse satirin tamami baglanti olur ve sag
ucunda bir ok durur. Bugun yalnizca Veri bandinin satirlari data'nin
suzgecine baglanir, otomasyon ve web satirlari duz yazidir.

description: Isler bolumundeki tek bir disiplin seridi, buyuk sozcuk/aciklama sutunu, liste ve kose figuru.
*/

import type { CSSProperties } from 'react'

import { RevealImg } from '@paktlabs/brand/components/RevealImg'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import styles from './Band.module.css'

// Listenin tek satiri. href yoksa satir duz yazi olarak kalir.
export interface BandItem {
  label: string
  href?: string
}

interface BandProps {
  tone: 'data' | 'auto' | 'web'
  tightTop?: boolean
  index: string
  title: string
  desc: string
  href: string
  goLabel: string
  list: readonly BandItem[]
  artSrc: string
  artSide: 'left' | 'right'
  /** Görselin alt kenarı ile kendi zemin çizgisi arasındaki yüzde mesafesi.
      Band.module.css bu değeri kalıcı translate kaydırması için kullanır. */
  groundOffset: string
  artWidth: string
}

// Uc disiplin seridini ayni bilesen cizer, farki proplar verir. tone rengi,
// artSide cizimin hangi yanda duracagini, groundOffset ile artWidth cizimin
// zemine nasil oturacagini belirler. Listede href'i olan satir baglantiya
// donusur.
export function Band({
  tone,
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
        artSide === 'right' && styles.flip,
        tightTop && styles.tightTop,
      )}
      style={rootStyle}
    >
      <div className={styles.inner}>
        <div ref={word.ref} className={cx('reveal', word.visible && 'in', styles.word)}>
          <span className="eyebrow">{index}</span>
          {/* Gorselde bolum basligindan buyuk ama anlamda Kabul ettigimiz isler'in alt basligi */}
          <h3>{title}</h3>
          <p className={styles.desc}>{desc}</p>
          <a className={styles.go} href={href}>
            {goLabel}
          </a>
        </div>
        <ol ref={listReveal.ref} className={cx('reveal', listReveal.visible && 'in', styles.list)}>
          {/* Baglantili satirda dolgu li'den a'ya gecer, boylece satirin
              tamami tiklanir ve odak cercevesi butun satiri cevreler. */}
          {list.map((item) => (
            <li key={item.label} className={cx(item.href && styles.linked)}>
              {item.href ? (
                <a className={styles.row} href={item.href}>
                  <span className={styles.ix} aria-hidden="true" />
                  {item.label}
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              ) : (
                <>
                  <span className={styles.ix} aria-hidden="true" />
                  {item.label}
                </>
              )}
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
