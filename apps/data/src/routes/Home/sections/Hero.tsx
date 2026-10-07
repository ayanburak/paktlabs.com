/*
file: Hero.tsx
importable: Hero

description: Veri sayfasinin acilis bolumu, disiplin adi, kisa aciklama, calismalara giden dugme ve figur.
*/

import { RevealImg } from '@paktlabs/brand/components/RevealImg'

import readingSvg from '@/assets/illustrations/reading.svg'
import { useDict } from '@/i18n'

import styles from './Hero.module.css'

// Figur dekoratiftir, ekran okuyucuya okunmaz. Landing'in hero figuruyle ayni
// karar. Konumu cerceve tasir, belirme hareketi icindeki img'de durur, boylece
// animasyon kaldirilsa da figur zemin cizgisinden kaymaz.
export function Hero() {
  const { home } = useDict()

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.title}>{home.hero.title}</h1>
        <p className={styles.lead}>{home.hero.lead}</p>
        <a className={`cta primary ${styles.cta}`} href="#calismalar">
          {home.hero.cta}
        </a>
      </div>
      <div className={styles.artFrame}>
        <RevealImg src={readingSvg} />
      </div>
    </section>
  )
}
