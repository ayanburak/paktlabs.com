/*
file: Hero.tsx
importable: Hero

description: Açılış bölümündeki sloganı, iletişim bağlantısını ve ekrana uygun illüstrasyonu gösterir.
*/

import heroMobileSvg from '@/assets/illustrations/hero-mobile.svg'
import heroSvg from '@/assets/illustrations/hero.svg'
import { useReveal } from '@/hooks/useReveal'
import { useDict } from '@/i18n'
import { cx } from '@/lib/cx'

import styles from './Hero.module.css'

export function Hero() {
  const { hero } = useDict()
  const art = useReveal<HTMLImageElement>()
  const artMobile = useReveal<HTMLImageElement>()

  return (
    <section className={styles.hero}>
      {/* Çerçeve görselin alanını ve zemin konumunu belirler, içindeki
          img yalnızca belirme hareketini taşır. Mobil ve masaüstü
          kompozisyonları arasındaki seçimi CSS yapar. */}
      <div className={styles.artFrame}>
        <img
          ref={art.ref}
          src={heroSvg}
          alt=""
          aria-hidden="true"
          className={cx('reveal', art.visible && 'in', styles.artDesktop)}
        />
        <img
          ref={artMobile.ref}
          src={heroMobileSvg}
          alt=""
          aria-hidden="true"
          className={cx('reveal', artMobile.visible && 'in', styles.artMobile)}
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
