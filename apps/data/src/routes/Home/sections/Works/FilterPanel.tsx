/*
file: FilterPanel.tsx
importable: FilterPanel

Baslik satirindaki Filtrele dugmesinin actigi kategori listesi. Her kategori
gercek bir onay kutusudur, yaninda o kategorideki calisma sayisi durur.
Hangi kategorilerin secili oldugunu ve sayilari bilmez, ikisini de Works
verir.

description: Calisma kategorilerini onay kutulu bir liste halinde gosterip secimi degistiren acilir panel.
*/

import type { CSSProperties } from 'react'

import { dataTags, type DataTag } from '@paktlabs/brand/content/dataTags'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import styles from './FilterPanel.module.css'

interface FilterPanelProps {
  id: string
  open: boolean
  picked: ReadonlySet<DataTag>
  counts: Readonly<Record<DataTag, number>>
  onToggle: (tag: DataTag) => void
}

// Kapaliyken panel inert, icindeki kutular klavyeyle de secilemez. Panel
// yalnizca gorsel olarak kuculmus olsaydi Tab ile gorunmeyen kutulara
// gidilebilirdi.
//
// Gorunen sayi ekran okuyucudan gizlidir, yerine sayi ve kelimesi birlikte
// okunur. Kelimenin tekil ya da cogul hali dilin kendi kuralindan secilir,
// Turkcede ikisi ayni, Ingilizcede 1 study ve 2 studies.
export function FilterPanel({ id, open, picked, counts, onToggle }: FilterPanelProps) {
  const { home } = useDict()
  const { dataTags: names } = useBrandDict()
  const { language } = useLanguage()
  const plural = new Intl.PluralRules(language)
  const studies = (n: number) => `${n} ${home.works.filter.studies[plural.select(n) === 'one' ? 'one' : 'other']}`

  return (
    <div id={id} className={cx(styles.panel, open && styles.open)} inert={!open}>
      <div className={styles.inner}>
        <ul className={styles.list} aria-label={home.works.filter.tagsLabel}>
          {dataTags.map((tag, i) => (
            <li key={tag} style={{ '--i': i } as CSSProperties}>
              <label className={styles.option}>
                <input
                  className={styles.input}
                  type="checkbox"
                  checked={picked.has(tag)}
                  onChange={() => onToggle(tag)}
                />
                <span className={styles.box} aria-hidden="true" />
                <span className={styles.label}>{names[tag]}</span>
                <span className={styles.count} aria-hidden="true">
                  {counts[tag]}
                </span>
                <span className="sr">{studies(counts[tag])}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
