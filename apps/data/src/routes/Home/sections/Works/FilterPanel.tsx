/*
file: FilterPanel.tsx
importable: FilterPanel

Baslik satirindaki Filtrele dugmesinin actigi etiket kutulari. Hangi
etiketlerin secili oldugunu bilmez, secimi Works tutar ve buraya verir.

description: Calisma etiketlerini sirali kutular halinde gosterip secimi degistiren acilir panel.
*/

import type { CSSProperties } from 'react'

import { cx } from '@paktlabs/brand/lib/cx'

import type { StudyTag } from '@/content/studies/types'
import { useDict } from '@/i18n'

import styles from './FilterPanel.module.css'

// Kutularin sirasi mockup'taki sira. Etiket kimlikleri sozlukteki adlarla
// eslesir, sira burada tutulur cunku sozluk nesnesinin anahtar sirasina
// guvenilmez.
const order: StudyTag[] = ['preparation', 'database', 'quality', 'analysis', 'visualization', 'machineLearning']

interface FilterPanelProps {
  id: string
  open: boolean
  picked: ReadonlySet<StudyTag>
  onToggle: (tag: StudyTag) => void
}

// Kapaliyken panel inert, icindeki dugmeler klavyeyle de secilemez. Panel
// yalnizca gorsel olarak kuculmus olsaydi Tab ile gorunmeyen dugmelere
// gidilebilirdi.
export function FilterPanel({ id, open, picked, onToggle }: FilterPanelProps) {
  const { home } = useDict()

  return (
    <div id={id} className={cx(styles.panel, open && styles.open)} inert={!open}>
      <div className={styles.inner}>
        <ul className={styles.grid} aria-label={home.works.filter.tagsLabel}>
          {order.map((tag, i) => (
            <li key={tag} style={{ '--i': i } as CSSProperties}>
              <button
                type="button"
                className={styles.box}
                aria-pressed={picked.has(tag)}
                onClick={() => onToggle(tag)}
              >
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.label}>{home.works.tags[tag]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
