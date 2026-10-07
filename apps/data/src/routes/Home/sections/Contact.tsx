/*
file: Contact.tsx
importable: Contact

description: Veri sayfasini kapatan, e-posta baglantisi ve cizilmemis figurun yerini tasiyan iletisim bolumu.
*/

import { contactEmail } from '@paktlabs/brand/content/contact'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import { ArtSlot } from '@/components/ArtSlot'
import { useDict } from '@/i18n'

import styles from './Contact.module.css'

// Mockup'taki landing formuna giden dugme yok. O formun gonder dugmesi ortak
// iletisim servisi kurulana kadar islem yapmaz, ziyaretciyi oraya gondermek
// calismayan bir dugmeye goturur. Ust bardaki Iletisim baglantisi bu bolumun
// kimligine gelir.
export function Contact() {
  const { home } = useDict()
  const copy = useReveal<HTMLDivElement>()

  return (
    <section id="iletisim" className={styles.contact}>
      <div className={styles.inner}>
        <div ref={copy.ref} className={cx('reveal', copy.visible && 'in', styles.copy)}>
          <span className="eyebrow">{home.contact.eyebrow}</span>
          <h2>{home.contact.title}</h2>
          <p className={styles.lead}>{home.contact.lead}</p>
          <div className={styles.direct}>
            <a className={styles.mail} href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>
        </div>
        <figure className={styles.art}>
          <ArtSlot label={home.contact.slot.label} note={home.contact.slot.note} />
        </figure>
      </div>
    </section>
  )
}
