/*
file: TechRail.tsx
importable: TechRail

description: Kullanilan araclarin logolarinin soldan saga aktigi, uzerine gelinen logonun adini gosteren serit.
*/

import { cx } from '@paktlabs/brand/lib/cx'

import { TechLogo } from '@/components/TechLogo'
import { techNames } from '@/content/techNames'
import { useDict } from '@/i18n'

import styles from './TechRail.module.css'

// Bolumun basligi ekran okuyucu icin ayri bir h2, gorunen etiket ise ekran
// okuyucudan gizli, ayni metin iki kez okunmasin diye. Aracin adi ekran
// okuyucuya TechLogo'nun etiketinden ulasir, isim kutusu yalnizca gorseldir.
// Logo normalde komur rengindedir, kare uzerine gelinince koyulasir ve
// logo altina doner, renkler TechRail.module.css'te.
//
// Liste kesintisiz tur icin iki kez yazilir. Ikinci kopyanin her seyi ekran
// okuyucudan gizlenir, boylece her arac bir kez okunur.
export function TechRail() {
  const { home } = useDict()

  return (
    <section className={styles.stack} aria-labelledby="stack-title">
      <h2 className="sr" id="stack-title">
        {home.stack.title}
      </h2>
      <div className={styles.head} aria-hidden="true">
        <span className="eyebrow">{home.stack.title}</span>
      </div>
      <div className={styles.rail}>
        <ul className={styles.track}>
          {[false, true].map((copy) =>
            techNames.map((name) => (
              <li
                key={`${copy}-${name}`}
                className={cx(styles.tile, copy && styles.copy)}
                aria-hidden={copy || undefined}
              >
                <TechLogo name={name} decorative={copy} className={styles.logo} />
                <span className={styles.tip} lang="en" aria-hidden="true">
                  {name}
                </span>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  )
}
