/*
file: FilterPanel.tsx
importable: FilterPanel

Baslik satirindaki Filtrele dugmesinin actigi etiket kutulari. Hangi
etiketlerin secili oldugunu bilmez, secimi Works tutar ve buraya verir.

description: Calisma etiketlerini sirali kutular halinde gosterip secimi degistiren acilir panel.
*/

import type { CSSProperties } from 'react'

import { dataTags, type DataTag } from '@paktlabs/brand/content/dataTags'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import styles from './FilterPanel.module.css'

interface FilterPanelProps {
  id: string
  open: boolean
  picked: ReadonlySet<DataTag>
  onToggle: (tag: DataTag) => void
}

// Kapaliyken panel inert, icindeki dugmeler klavyeyle de secilemez. Panel
// yalnizca gorsel olarak kuculmus olsaydi Tab ile gorunmeyen dugmelere
// gidilebilirdi.
export function FilterPanel({ id, open, picked, onToggle }: FilterPanelProps) {
  const { home } = useDict()
  const { dataTags: names } = useBrandDict()

  return (
    <div id={id} className={cx(styles.panel, open && styles.open)} inert={!open}>
      <div className={styles.inner}>
        <ul className={styles.grid} aria-label={home.works.filter.tagsLabel}>
          {dataTags.map((tag, i) => (
            <li key={tag} style={{ '--i': i } as CSSProperties}>
              <button
                type="button"
                className={styles.box}
                aria-pressed={picked.has(tag)}
                onClick={() => onToggle(tag)}
              >
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.label}>{names[tag]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
