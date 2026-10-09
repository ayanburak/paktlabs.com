/*
file: Chapter.tsx
importable: Chapter

Calisma sayfalarinin numarali bir bolumunun cercevesi: numara kutusu, kisa
etiket, baslik ve giris paragrafi. Altina ne konacagini disaridan alir.
Icerik bolumlerinde calismanin parcalari, veri dili bolumunde dil secicisi
gelir, ikisi de ayni gorunusle durur.

description: Calisma sayfalarindaki bir bolumu numarasi, basligi ve girisiyle cizen cerceve.
*/

import type { ReactNode } from 'react'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import styles from './Chapter.module.css'

interface ChapterProps {
  id: string
  number: string
  label: string
  title: string
  lede: string
  children: ReactNode
}

// Metinler secili dilde hazir gelir, cerceve dil bilmez. Ekran okuyucu
// numarayi atlar, bolumu basligiyla tanitir. id adresteki parca oldugu icin
// icindekiler ve #sorun gibi bir baglanti dogrudan buraya gelir. Baslik satiri
// ve giris ekrana girerken ayri ayri belirir.
export function Chapter({ id, number, label, title, lede, children }: ChapterProps) {
  const head = useReveal<HTMLElement>()
  const intro = useReveal<HTMLParagraphElement>()
  const headingId = `h-${id}`

  return (
    <section id={id} className={styles.chapter} aria-labelledby={headingId}>
      <header ref={head.ref} className={cx('reveal', head.visible && 'in', styles.head)}>
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        <div>
          <span className="eyebrow">{label}</span>
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
        </div>
      </header>
      <p ref={intro.ref} className={cx('reveal', intro.visible && 'in', styles.lede)}>
        {lede}
      </p>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
