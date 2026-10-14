/*
file: Contact.tsx
importable: Contact

Butun PaktLabs sitelerinin ana sayfasini kapatan iletisim bolumu. Prop almaz,
metinler ortak sozlukte, adresler content/contact.ts'te durur, bu yuzden her
sitede birebir ayni gorunur.

    <main>
      ...
      <Contact />
    </main>

Bolumde form yok, tek dugme ziyaretciyi ana sitenin iletisim sayfasina
goturur. Dogrudan yazmak isteyen icin e-posta adresi altta durur. Bolumun
kimligi contact, sayfa icinden bu bolume baglanti verilebilir.

description: Iletisim sayfasina giden dugmeyi, e-posta adresini ve telefon figurunu yan yana gosteren ortak kapanis bolumu.
*/

import { contactEmail, contactPageUrl } from '../content/contact'
import { useReveal } from '../hooks/useReveal'
import { useBrandDict } from '../i18n/useBrandDict'
import { cx } from '../lib/cx'
import phoneUrl from '../assets/phone.svg'
import { emptyImage, RevealImg } from './RevealImg'

import styles from './Contact.module.css'

// Mobilde telefon gorseli yok. Bos img sayesinde masaustu SVG'si yalnizca
// source eslesince iner, dar ekranda hic indirilmez.
export function Contact() {
  const { contact } = useBrandDict()
  const main = useReveal<HTMLDivElement>()

  return (
    <section id="contact" className={cx('full-bleed', styles.contact)}>
      <div className={styles.inner}>
        <div ref={main.ref} className={cx('reveal', main.visible && 'in', styles.main)}>
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
          <p className={styles.lead}>{contact.lead}</p>

          <a className={styles.action} href={contactPageUrl}>
            {contact.action}
          </a>

          <div className={styles.direct}>
            <a className={styles.mail} href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
        </div>

        <picture className={styles.art}>
          <source media="(min-width: 769px)" srcSet={phoneUrl} />
          <RevealImg src={emptyImage} />
        </picture>
      </div>
    </section>
  )
}
