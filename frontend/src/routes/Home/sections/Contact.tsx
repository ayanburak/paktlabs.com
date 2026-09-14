/*
file: Contact.tsx
importable: Contact

Form henuz gercek bir backend'e baglanmiyor, gonder butonu su an tiklaninca
hicbir sey yapmiyor. CLAUDE.md'nin plani geregi backend/ altinda kurulacak
minik FastAPI servisiyle baglanacak, o gelene kadar bu bilerek boyle birakildi.

description: Iletisim formu ve telefon figurunu yan yana gosteren kapanis bolumu.
*/

import phoneSvg from '@/assets/illustrations/phone.svg'
import { RevealImg } from '@/components/RevealImg'
import { useReveal } from '@/hooks/useReveal'
import { useDict } from '@/i18n'
import { cx } from '@/lib/cx'

import styles from './Contact.module.css'

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
            <button className={styles.send} type="button">
              {contact.form.send}
            </button>
          </form>

          <div className={styles.direct}>
            <a className={styles.mail} href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </div>

        <RevealImg src={phoneSvg} className={styles.art} />
      </div>
    </section>
  )
}
