/*
file: Hero.tsx
importable: Hero

description: Veri sayfasinin acilis bolumu, disiplin adi, kisa aciklama, son yayin tarihi, calismalara giden dugme ve figur.
*/

import { RevealImg } from '@paktlabs/brand/components/RevealImg'
import { cx } from '@paktlabs/brand/lib/cx'
import layout from '@paktlabs/brand/styles/HeroLayout.module.css'

import heroSvg from '@/assets/illustrations/hero.svg'
import { lastPublished } from '@/content/lastPublished'
import { useDict } from '@/i18n'

import styles from './Hero.module.css'

// Acilistaki hareket landing'in hero'sundan gelir: metinler sirayla yukselir,
// cizim belirir. Hareket konuma dokunmaz.
//
// Son yayin tarihi bir terim ve deger cifti oldugu icin dl ile yazilir.
// Etiket ustte, tarih altta durur, DOM sirasiyla ayni. Tarih
// mockup'taki uc olcu kutusunun yerini aldi. Gun, ay ve yil aralarinda
// soluk egik cizgilerle yazilir, landing bantlarindaki 01 / 03 numarasi gibi.
// Cizgiler gizlenmez, ekran okuyucu tarihi oldugu gibi okur, dateTime
// makineler icin. Siralama iki dilde de gun, ay, yil.
//
// Figur dekoratiftir, alt metni bos oldugu icin RevealImg onu ekran
// okuyucudan gizler. Landing'in hero figuruyle ayni karar.
export function Hero() {
  const { home } = useDict()
  const [year, month, day] = lastPublished.split('-')

  return (
    <section className={cx(layout.hero, styles.hero)}>
      <div className={cx(layout.copy, styles.copy)}>
        <h1 className={cx('rise', styles.title)}>{home.hero.title}</h1>
        <p className={cx('rise', styles.lead)}>{home.hero.lead}</p>
        <dl className={cx('rise', styles.counts)}>
          <div>
            <dt>{home.hero.latest}</dt>
            <dd>
              <time dateTime={lastPublished}>
                {day} <span className={styles.sep}>/</span> {month} <span className={styles.sep}>/</span> {year}
              </time>
            </dd>
          </div>
        </dl>
        <a className={cx('cta primary rise', styles.cta)} href="#calismalar">
          {home.hero.cta}
        </a>
      </div>
      <figure className={cx(layout.art, styles.art)}>
        <RevealImg src={heroSvg} />
      </figure>
    </section>
  )
}
