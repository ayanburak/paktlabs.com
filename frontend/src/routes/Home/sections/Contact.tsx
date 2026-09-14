/*
file: Contact.tsx
importable: Contact

Form henuz gercek bir backend'e baglanmiyor, gonder butonu su an tiklaninca
hicbir sey yapmiyor. CLAUDE.md'nin plani geregi backend/ altinda kurulacak
minik FastAPI servisiyle baglanacak, o gelene kadar bu bilerek boyle birakildi.

description: Iletisim formu ve telefon figurunu yan yana gosteren kapanis bolumu.
*/

import phoneMobileSvg from '@/assets/illustrations/phone-mobile.svg'
import phoneSvg from '@/assets/illustrations/phone.svg'
import { RevealImg } from '@/components/RevealImg'
import { useReveal } from '@/hooks/useReveal'
import { useDict } from '@/i18n'
import { cx } from '@/lib/cx'

import styles from './Contact.module.css'

// Iki kompozisyon formun farkli yerlerinde durur. Gizli konumdaki img
// ag istegi yapmadan gecerli kalir, asil SVG yalnizca source eslesince iner.
const emptyImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E'

export function Contact() {
  const { contact } = useDict()
  const main = useReveal<HTMLDivElement>()

  return (
    <section id="iletisim" className={cx('full-bleed', styles.contact)}>
      <div className={styles.inner}>
        <div ref={main.ref} className={cx('reveal', main.visible && 'in', styles.main)}>
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
          <p className={styles.lead}>{contact.lead}</p>

          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="ad">{contact.form.name}</label>
              <input id="ad" name="ad" type="text" autoComplete="name" />
            </div>
            <div className={styles.field}>
              <label htmlFor="eposta">{contact.form.email}</label>
              <input id="eposta" name="eposta" type="email" autoComplete="email" />
            </div>
            <div className={cx(styles.field, styles.fieldWide)}>
              <label htmlFor="mesaj">{contact.form.message}</label>
              <textarea id="mesaj" name="mesaj" />
            </div>
            <div className={styles.sendRow}>
              <button className={styles.send} type="button">
                {contact.form.send}
              </button>
              {/* source esikleri CSS ile ayni kalmali, iki SVG birlikte indirilmez. */}
              <picture className={styles.sendArt}>
                <source media="(max-width: 768px)" srcSet={phoneMobileSvg} />
                <RevealImg src={emptyImage} />
              </picture>
            </div>
          </form>

          <div className={styles.direct}>
            <a className={styles.mail} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </div>

        <picture className={styles.art}>
          <source media="(width > 768px)" srcSet={phoneSvg} />
          <RevealImg src={emptyImage} />
        </picture>
      </div>
    </section>
  )
}
