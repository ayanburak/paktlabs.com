/*
file: Hero.tsx
importable: Hero

description: Sayfanin tam ekran acilis bolumu, sag alta yaslanan hero.svg ve dort satirlik slogan/cta.
*/

import heroSvg from '@/assets/illustrations/hero.svg'
import { useReveal } from '@/hooks/useReveal'
import { useDict } from '@/i18n'
import { cx } from '@/lib/cx'

import styles from './Hero.module.css'

export function Hero() {
  const { hero } = useDict()
  const art = useReveal<HTMLImageElement>()

  return (
    <section className={styles.hero}>
      {/* top ve bottom ayni anda verildigi icin img'a degil, boyutu cozen
          bu cerceve div'e ihtiyac var, bkz. Hero.module.css'teki not */}
      <div className={styles.artFrame}>
        <img
          ref={art.ref}
          src={heroSvg}
          alt=""
          aria-hidden="true"
          className={cx('reveal', art.visible && 'in')}
        />
      </div>
      <div className={styles.inner}>
        <h1 className={styles.slogan}>
          {hero.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <a className={`cta ${styles.cta}`} href="#iletisim">
          {hero.cta}
        </a>
      </div>
    </section>
  )
}
