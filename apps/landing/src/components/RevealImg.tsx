/*
file: RevealImg.tsx
importable: RevealImg

Sayfadaki alti dekoratif illustrasyonun (hero, disc-art, uc band-art, contact-art)
hepsi ayni sekilde davranir: ekrana girince belirir, kendisi tiklanamaz, ekran
okuyucuya okunmaz. Mockup'ta bu davranis her yerde ayri bir sarmalayici div +
data-reveal ozniteligiyle tekrarlaniyordu, burada tek bir img etiketine
toplandi cunku position/aspect-ratio gibi CSS ozellikleri dogrudan img
uzerinde de calisiyor, ayri bir sarmalayici div'e gerek yok.

description: Gorunur alana girince beliren, tiklanamaz, dekoratif bir img bileseni.
*/

import type { CSSProperties } from 'react'

import { useReveal } from '@/hooks/useReveal'
import { cx } from '@/lib/cx'

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
