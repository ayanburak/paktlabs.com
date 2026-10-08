/*
file: Paragraph.tsx
importable: Paragraph

Bolum govdesindeki duz metin paragrafi. Bolum girisinden sonra gelen ara
anlatim icin, ornegin bir tabloyu tanitan cumle. Parcalar arasindaki bosluk
burada degil bolum cercevesinde verilir.

description: Bolum icindeki duz metin paragrafini gosteren parca.
*/

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { ParagraphBlock } from '@/content/studies/blocks'

import styles from './Paragraph.module.css'

interface ParagraphProps {
  block: ParagraphBlock
}

// Mockup'ta bolumdeki her parca ekrana girerken belirir, paragraf da oyle.
export function Paragraph({ block }: ParagraphProps) {
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLParagraphElement>()

  return (
    <p ref={ref} className={cx('reveal', visible && 'in', styles.paragraph)}>
      {block.text[language]}
    </p>
  )
}
