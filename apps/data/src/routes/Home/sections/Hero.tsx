/*
file: Hero.tsx
importable: Hero

description: Veri sayfasinin acilis bolumu, disiplin adi, kisa aciklama, uc kisa olcu, calismalara giden dugme ve figur.
*/

import readingSvg from '@/assets/illustrations/reading.svg'
import { useDict } from '@/i18n'

import styles from './Hero.module.css'

// Gorunum mockup'taki hero'nun aynisi, metinler de mockup'taki gibi lorem.
// Olculer sozlukten gelir, gercek icerik geldiginde yalnizca sozluk degisir.
// Her olcu bir terim ve aciklama cifti oldugu icin dl ile yazilir. Gorselde
// deger ustte, etiket altta durur, siralamayi CSS degistirir.
//
// Figur dekoratiftir, ekran okuyucuya okunmaz. Landing'in hero figuruyle ayni
// karar.
export function Hero() {
  const { home } = useDict()

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.title}>{home.hero.title}</h1>
        <p className={styles.lead}>{home.hero.lead}</p>
        <dl className={styles.counts}>
          {home.hero.counts.map((count) => (
            <div key={count.label}>
              <dt>{count.label}</dt>
              <dd>{count.value}</dd>
            </div>
          ))}
        </dl>
        <a className={`cta primary ${styles.cta}`} href="#calismalar">
          {home.hero.cta}
        </a>
      </div>
      <figure className={styles.art}>
        <img src={readingSvg} alt="" aria-hidden="true" />
      </figure>
    </section>
  )
}
