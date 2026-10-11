/*
file: Toc.tsx
importable: Toc

Calisma sayfalarinin icindekileri. Masaustunde solda sabit duran numarali bir
liste, 1100 pikselin altinda sayfanin ustune yapisan ince bir bar. Ikisi ayni
oge, yalnizca ekran genisligine gore gorunusu degisir. Okunan bolumu ve okuma
ilerlemesini useReadingProgress'ten alir. Listenin altinda sayfanin verdigi
kisa bir not durur, detay sayfasinda okuma suresi.

description: Bolumleri listeleyen, okunan bolumu ve okuma ilerlemesini gosteren icindekiler.
*/

import { type CSSProperties, type RefObject, useEffect, useMemo, useRef, useState } from 'react'

import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import styles from './Toc.module.css'
import { useReadingProgress } from './useReadingProgress'

// Icindekilerde bir satir. Numara ve ad govdeden secili dilde hazir gelir,
// boylece icerik bolumleriyle veri dili bolumu ayni listede durabilir.
export interface TocEntry {
  id: string
  number: string
  label: string
}

interface TocProps {
  entries: TocEntry[]
  chaptersRef: RefObject<HTMLElement | null>
  note: string
}

// Okuma ilerlemesi CSS'e --p degiskeniyle verilir, cizginin ne kadar
// dolacagini stil dosyasi hesaplar. Bar yalnizca dar ekranda gorunur, liste
// orada bara dokununca acilir. Bir bolum secilince ya da Escape'e basilinca
// kapanir, Escape'te odak bara doner ki klavyeyle gezen okur yerini kaybetmesin.
// Not sayfadan hazir gelir, burada yalnizca gosterilir.
export function Toc({ entries, chaptersRef, note }: TocProps) {
  const { study } = useDict()
  const ids = useMemo(() => entries.map((entry) => entry.id), [entries])
  const { current, progress } = useReadingProgress(ids, chaptersRef)
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      button.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Sayfa en az bir bolumle gelir, bos liste cizilecek bir sey tasimaz.
  const active = entries[current]
  if (!active) return null

  return (
    <nav
      className={cx(styles.toc, open && styles.open)}
      aria-label={study.toc.title}
      style={{ '--p': progress } as CSSProperties}
    >
      <button
        ref={button}
        type="button"
        className={styles.bar}
        aria-expanded={open}
        aria-controls="toc-list"
        onClick={() => setOpen(!open)}
      >
        <span className={styles.number}>{active.number}</span>
        <span>{active.label}</span>
        <span className={styles.caret} aria-hidden="true">
          ↓
        </span>
      </button>
      <span className={cx('eyebrow', styles.title)}>{study.toc.title}</span>
      <ol id="toc-list" className={styles.list}>
        {entries.map((entry, index) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={index === current ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={styles.number}>{entry.number}</span>
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
      <p className={styles.time}>{note}</p>
    </nav>
  )
}
