/*
file: Toc.tsx
importable: Toc

Detay sayfasinin icindekileri. Masaustunde solda sabit duran numarali bir
liste, 1100 pikselin altinda sayfanin ustune yapisan ince bir bar. Ikisi ayni
oge, yalnizca ekran genisligine gore gorunusu degisir. Okunan bolumu ve okuma
ilerlemesini useReadingProgress'ten alir.

description: Bolumleri listeleyen, okunan bolumu ve okuma ilerlemesini gosteren icindekiler.
*/

import { type CSSProperties, type RefObject, useEffect, useMemo, useRef, useState } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import type { Chapter } from '@/content/studies/types'
import { useDict } from '@/i18n'

import { chapterNumber } from './chapterNumber'
import styles from './Toc.module.css'
import { useReadingProgress } from './useReadingProgress'

interface TocProps {
  chapters: Chapter[]
  chaptersRef: RefObject<HTMLElement | null>
  minutes: number
}

// Okuma ilerlemesi CSS'e --p degiskeniyle verilir, cizginin ne kadar
// dolacagini stil dosyasi hesaplar. Bar yalnizca dar ekranda gorunur, liste
// orada bara dokununca acilir. Bir bolum secilince ya da Escape'e basilinca
// kapanir, Escape'te odak bara doner ki klavyeyle gezen okur yerini kaybetmesin.
// Okuma suresi disaridan hesaplanmis gelir, burada yalnizca gosterilir.
export function Toc({ chapters, chaptersRef, minutes }: TocProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const ids = useMemo(() => chapters.map((chapter) => chapter.id), [chapters])
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
        <span className={styles.number}>{chapterNumber(current)}</span>
        <span>{chapters[current].label[language]}</span>
        <span className={styles.caret} aria-hidden="true">
          ↓
        </span>
      </button>
      <span className={cx('eyebrow', styles.title)}>{study.toc.title}</span>
      <ol id="toc-list" className={styles.list}>
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              aria-current={index === current ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              <span className={styles.number}>{chapterNumber(index)}</span>
              {chapter.label[language]}
            </a>
          </li>
        ))}
      </ol>
      <p className={styles.time}>
        {study.toc.readingTime.before} {minutes} {study.toc.readingTime.after}
      </p>
    </nav>
  )
}
