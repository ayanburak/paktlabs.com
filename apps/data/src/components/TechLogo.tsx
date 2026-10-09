/*
file: TechLogo.tsx
importable: TechLogo

Bir aracin logosunu sitenin rengiyle cizer. Logo dosyasi yalnizca seklin
kalibidir, rengi bulundugu yerin yazi rengidir. Kullanan yer rengi color ile,
boyutu ve kenar boslugunu className ile verir. Bilesen hover'i ya da hangi
renge donecegini bilmez.

    <TechLogo name="Python" className={styles.logo} />
    .logo { color: var(--ink); padding: 19%; }
    .tile:hover .logo { color: var(--gold); }

decorative verilirse ekran okuyucudan gizlenir, ayni logo sayfada ikinci kez
gorunuyorsa kullanilir. Verilmezse ekran okuyucu aracin adini okur.

description: Bir aracin tek renkli logosunu bulundugu yerin rengiyle cizen bilesen.
*/

// NOTE: logo img degil maskeli bir span. img icindeki SVG sayfanin CSS'ini
// goremedigi icin rengi disaridan verilemiyordu, mockup bu yuzden her logoyu
// komur ve altin olarak iki dosyada tasiyordu. Maske ayni dosyayi kalip
// yapar, renk tokens.css'ten gelir. 2026-10-09'da 18 logoda iki dosyali
// yontemle piksel olarak karsilastirildi, fark yok.

import type { CSSProperties } from 'react'

import { cx } from '@paktlabs/brand/lib/cx'

import { techLogos } from '@/content/techStack'
import type { TechName } from '@/content/techNames'

import styles from './TechLogo.module.css'

interface TechLogoProps {
  name: TechName
  decorative?: boolean
  className?: string
}

// Ad ekran okuyucuya role img ve aria-label ile verilir, img'nin alt metninin
// karsiligi. lang en cunku urun adlari iki dilde de Ingilizce yazilir.
export function TechLogo({ name, decorative = false, className }: TechLogoProps) {
  const style = { '--logo': `url("${techLogos[name]}")` } as CSSProperties

  return (
    <span
      className={cx(styles.logo, className)}
      style={style}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative || undefined}
      lang="en"
    />
  )
}
