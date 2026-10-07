/*
file: TechRail.tsx
importable: TechRail

description: Kullanilan araclarin logolarinin soldan saga aktigi, uzerine gelinen logonun adini gosteren serit.
*/

import { cx } from '@paktlabs/brand/lib/cx'

import { techStack } from '@/content/techStack'
import { useDict } from '@/i18n'

import styles from './TechRail.module.css'

// Bolumun basligi ekran okuyucu icin ayri bir h2, gorunen etiket ise ekran
// okuyucudan gizli, ayni metin iki kez okunmasin diye. Aracin adi ekran
// okuyucuya img'nin alt metninden ulasir, isim kutusu yalnizca gorseldir.
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
            techStack.map((tech) => (
              <li
                key={`${copy}-${tech.name}`}
                className={cx(styles.tile, copy && styles.copy)}
                aria-hidden={copy || undefined}
              >
                <img src={tech.logo} alt={copy ? '' : tech.name} />
                <span className={styles.tip} lang="en" aria-hidden="true">
                  {tech.name}
                </span>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  )
}
