/*
file: Hero.tsx
importable: Hero

description: Veri sayfasinin acilis bolumu, disiplin adi, kisa aciklama, uc kisa olcu, calismalara giden dugme ve figur.
*/

import { RevealImg } from '@paktlabs/brand/components/RevealImg'
import { cx } from '@paktlabs/brand/lib/cx'

import heroSvg from '@/assets/illustrations/hero.svg'
import { useDict } from '@/i18n'

import styles from './Hero.module.css'

// Metinler mockup'taki gibi lorem. Acilistaki hareket landing'in hero'sundan
// gelir: metinler sirayla yukselir, cizim belirir. Hareket konuma dokunmaz.
// Olculer sozlukten gelir, gercek icerik geldiginde yalnizca sozluk degisir.
// Her olcu bir terim ve aciklama cifti oldugu icin dl ile yazilir. Gorselde
// deger ustte, etiket altta durur, siralamayi CSS degistirir.
//
// Figur dekoratiftir, alt metni bos oldugu icin RevealImg onu ekran
// okuyucudan gizler. Landing'in hero figuruyle ayni karar.
export function Hero() {
  const { home } = useDict()

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={cx('rise', styles.title)}>{home.hero.title}</h1>
        <p className={cx('rise', styles.lead)}>{home.hero.lead}</p>
        <dl className={cx('rise', styles.counts)}>
          {home.hero.counts.map((count) => (
            <div key={count.label}>
              <dt>{count.label}</dt>
              <dd>{count.value}</dd>
            </div>
          ))}
        </dl>
        <a className={cx('cta primary rise', styles.cta)} href="#calismalar">
          {home.hero.cta}
        </a>
      </div>
      <figure className={styles.art}>
        <RevealImg src={heroSvg} />
      </figure>
    </section>
  )
}
