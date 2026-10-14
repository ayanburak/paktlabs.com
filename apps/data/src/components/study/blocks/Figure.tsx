/*
file: Figure.tsx
importable: Figure

Seklin ortak cercevesi: ustte kucuk etiket, soru ve tek cumlelik okuma,
ortada sekil, altta istege bagli parcalar, genellikle verisini tasiyan
acilir kutu. Cubuk, cizgi, bilesim ve pasta sekilleri ayni cerceveyle durur,
boylece bir sayfada art arda gelen farkli sekiller ayni hizada ve ayni
olcude okunur.

    <Figure label={...} title={...} reading={...} description={...} blocks={block.blocks}>
      <div>...sekil</div>
    </Figure>

description: Bir seklin etiketini, sorusunu, okumasini ve altindaki parcalari ceviren ortak cerceve.
*/

import type { ReactNode } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import type { Block } from '@/content/studies/blocks'

import { BlockView } from './BlockView'
import styles from './Figure.module.css'

interface FigureProps {
  label: string
  title: string
  reading: string
  description: string
  after?: ReactNode
  blocks?: Block[]
  children: ReactNode
}

// Sekil ekran okuyucuya tek bir gorsel olarak tanitilir, description butun
// degerleriyle okunan aciklamadir. Aciklamayi her sekil kendi verisinden
// uretir, elle yazilmaz, boylece sekil degisince aciklama eskimez. after
// seklin hemen altinda duran metindir, ornegin bir not ya da hata turlerinin
// aciklamasi. Gorselin disinda kalir ki ekran okuyucu onu da okusun.
export function Figure({ label, title, reading, description, after, blocks, children }: FigureProps) {
  const { ref, visible } = useReveal<HTMLElement>()

  return (
    <figure ref={ref} className={cx('reveal', visible && 'in', styles.figure)}>
      <figcaption>
        <span className="eyebrow">{label}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.reading}>{reading}</p>
      </figcaption>
      <div role="img" aria-label={description}>
        {children}
      </div>
      {after}
      {blocks?.map((inner, index) => (
        <BlockView key={index} block={inner} />
      ))}
    </figure>
  )
}
