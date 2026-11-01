/*
file: Composition.tsx
importable: Composition

Bir butunun parcalara nasil bolundugunu gosteren yuzde yuzluk cubuklar.
Her satir ayri bir butundur ve satirlar alt alta kiyaslanir. Etiket, soru,
okuma ve altindaki parcalar ortak Figure cercevesinden gelir. Parcalarin
adlari cubuklarin altinda bir kez yazar.

description: Birkac butunun parcalara bolunusunu alt alta kiyaslayan sekil parcasi.
*/

import type { CSSProperties } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { CompositionBlock } from '@/content/studies/blocks'

import styles from './Composition.module.css'
import { Figure } from './Figure'
import { formatValue } from './format'

// Bu yuzdenin altindaki dilimin degeri cubugun icine yazilmaz, sigmazdi.
// Kesin degerler seklin altindaki acilir kutuda verilir.
const MIN_LABEL = 8

interface CompositionProps {
  block: CompositionBlock
}

// Her satir yuzde yuzluk tek bir cubuk, parcalar her satirda ayni sirayla
// soldan saga dizilir. Cizilen kisim ekran okuyucudan gizli, onun yerine
// Figure'e verilen aciklama okunur.
export function Composition({ block }: CompositionProps) {
  const { language } = useLanguage()
  const percent = (n: number) => formatValue(n, 'percent', 0, language)

  // Ekran okuyucuya her satir butun parcalariyla okunur, dar dilimler dahil.
  const description = [
    block.title[language],
    ...block.rows.map(
      (row) =>
        `${row.label[language]}: ${block.parts.map((part, i) => `${part.label[language]} ${percent(row.values[i] ?? 0)}`).join(', ')}`,
    ),
  ].join('. ')

  return (
    <Figure
      label={block.label[language]}
      title={block.title[language]}
      reading={block.reading[language]}
      description={description}
      blocks={block.blocks}
    >
      <div aria-hidden="true">
        {block.rows.map((row) => (
          <div key={row.label.en} className={styles.row}>
            <span className={styles.name}>{row.label[language]}</span>
            <span className={styles.bar}>
              {block.parts.map((part, i) => {
                // sifir payli parca cizilmez, yoksa iki cizgi yan yana kalirdi
                const share = row.values[i] ?? 0
                if (share === 0) return null
                return (
                  <span
                    key={part.label.en}
                    className={cx(styles.part, styles[part.style])}
                    style={{ '--w': `${share}%` } as CSSProperties}
                  >
                    {share >= MIN_LABEL && percent(share)}
                  </span>
                )
              })}
            </span>
          </div>
        ))}
        <div className={styles.legend}>
          {block.parts.map((part) => (
            <span key={part.label.en}>
              <i className={styles[part.style]} />
              {part.label[language]}
            </span>
          ))}
        </div>
      </div>
    </Figure>
  )
}
