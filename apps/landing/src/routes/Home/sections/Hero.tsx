/*
file: Hero.tsx
importable: Hero

description: Açılış bölümündeki sloganı, iletişim bağlantısını ve ekrana uygun illüstrasyonu gösterir.
*/

import { contactPageUrl } from '@paktlabs/brand/content/contact'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'
import layout from '@paktlabs/brand/styles/HeroLayout.module.css'

import heroMobileSvg from '@/assets/illustrations/hero-mobile.svg'
import heroSvg from '@/assets/illustrations/hero.svg'
import { useDict } from '@/i18n'

import styles from './Hero.module.css'

export function Hero() {
  const { hero } = useDict()
  const art = useReveal<HTMLImageElement>()

  return (
    <section className={cx(layout.hero, styles.hero)}>
      {/* Çerçeve görselin alanını ve konumunu belirler, içindeki
          img yalnızca belirme hareketini taşır. source eşiği CSS ile
          aynı kalmalı, tarayıcı yalnızca seçilen kompozisyonu indirir. */}
      <picture className={cx(layout.art, styles.artFrame)}>
        <source media="(max-width: 768px)" srcSet={heroMobileSvg} />
        <img
          ref={art.ref}
          src={heroSvg}
          alt=""
          aria-hidden="true"
          className={cx('reveal', art.visible && 'in')}
        />
      </picture>
      <div className={cx(layout.copy, styles.inner)}>
        <h1 className={styles.slogan}>
          {hero.lines.map((line) => (
            <span key={line} className="rise">
              {line}
            </span>
          ))}
        </h1>
        <a className={`cta rise ${styles.cta}`} href={contactPageUrl}>
          {hero.cta}
        </a>
      </div>
    </section>
  )
}
