/*
file: RevealImg.tsx
importable: RevealImg

PaktLabs sitelerindeki dekoratif illustrasyonlarin hepsi ayni sekilde
davranir: ekrana girince belirir, kendisi tiklanamaz, ekran okuyucuya okunmaz.
alt verilmezse gorsel ekran okuyucudan tamamen gizlenir, anlam tasiyan bir
gorselde alt metni mutlaka verilmeli. Konum ve boyut className ya da style ile
disaridan gelir, bilesen kendi yerlesimini bilmez.

description: Gorunur alana girince beliren, tiklanamaz, dekoratif bir img bileseni.
*/

// Mockup'ta bu davranis her yerde ayri bir sarmalayici div ve data-reveal
// ozniteligiyle tekrarlaniyordu. Burada tek bir img etiketine toplandi cunku
// position ve aspect-ratio gibi CSS ozellikleri dogrudan img uzerinde de
// calisiyor, ayri bir sarmalayici div'e gerek yok.

import type { CSSProperties } from 'react'

import { useReveal } from '../hooks/useReveal'
import { cx } from '../lib/cx'

// Dar ekranda indirilmesi istenmeyen gorseller icin picture icinde img'in
// yerini tutan 1x1 bos svg. Genis ekranda source eslesir ve asil gorsel iner.
export const emptyImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E'

interface RevealImgProps {
  src: string
  alt?: string
  className?: string
  style?: CSSProperties
}

export function RevealImg({ src, alt = '', className, style }: RevealImgProps) {
  const { ref, visible } = useReveal<HTMLImageElement>()

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      style={style}
      className={cx('reveal', visible && 'in', className)}
    />
  )
}
