/*
file: Cover.tsx
importable: Cover, CoverCrumb, CoverRow

Calisma sayfalarinin acilis yuzu. Solda bir donus baglantisi, etiketler,
baslik ve tek cumlelik aciklama, sagda facts durur. Detay sayfasi, kod
sayfasi ve hizmet sayfalari ayni kapagi kullanir, yalnizca icerigi degisir. Landing ve veri
sayfasindaki hero'lar gibi ekrani kaplar ama ortak hero yerlesimini
kullanmaz, cunku burada cizim yok, ikinci sutunda facts var.

description: Calisma sayfalarinin kapagini ve facts alanini gosteren bolum.
*/

import { Link } from 'react-router-dom'

import { TagList } from '@/components/TagList'
import { useDict } from '@/i18n'

import styles from './Cover.module.css'

// Kapagin ustundeki konum satiri. href donus baglantisinin adresi, back onun
// yazisi, current bulunulan yerin adi, ornegin calismanin numarasi.
export interface CoverCrumb {
  href: string
  back: string
  current: string
}

interface CoverProps {
  crumb: CoverCrumb
  tags: string[]
  title: string
  lede: string
  facts: CoverRow[]
}

// Facts alaninin bir satiri, secili dilde.
export interface CoverRow {
  label: string
  value: string
}

// Butun metinler, facts dahil, secili dilde hazir gelir, kapak dil bilmez.
// Facts satirlarini sayfa kendi icerigine gore kurar. Konum satirindaki ad
// baglanti degildir. Facts satirlarinin sayisi ve adlari sayfadan gelir, her
// satir bir terim ve aciklama cifti oldugu icin dl ile yazilir.
export function Cover({ crumb, tags, title, lede, facts }: CoverProps) {
  const { study: dict } = useDict()

  return (
    <section className={styles.cover}>
      <div className={styles.inner}>
        <div>
          <nav className={styles.crumb} aria-label={dict.cover.crumb}>
            <Link to={crumb.href}>{crumb.back}</Link>
            <span aria-hidden="true">/</span>
            <span>{crumb.current}</span>
          </nav>
          <TagList items={tags} label={dict.cover.tags} className={styles.tags} />
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lede}>{lede}</p>
        </div>
        <dl className={styles.facts}>
          {facts.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
