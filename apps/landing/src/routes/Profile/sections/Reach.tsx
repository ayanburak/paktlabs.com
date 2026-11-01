/*
file: Reach.tsx
importable: Reach

Profili kapatan murekkep zeminli bant. Buyuk harflerle kisinin kendi e-posta
adresi ve GitHub hesabi, yaninda ayri bir notta studyonun adresi ve iletisim
sayfasi durur.

description: Profil sayfasinda kisinin kisisel adresini ve studyonun iletisim yollarini gosteren kapanis bolumu.
*/

import { contactEmail, contactPageUrl } from '@paktlabs/brand/content/contact'
import { profiles, type ProfileId } from '@paktlabs/brand/content/profiles'

import { useDict } from '@/i18n'

import styles from './Reach.module.css'

interface ReachProps {
  id: ProfileId
}

// Kisisel adres ile studyonun adresi bilerek ayri kutularda. info@
// studyonun adresidir, kisinin adresi gibi gosterilmez, kisiye dogrudan
// yazmak isteyen musteri de kendi adresini bulur.
export function Reach({ id }: ReachProps) {
  const { reach: dict } = useDict().profilePage
  const profile = profiles[id]

  return (
    <section className={styles.reach}>
      <div className={styles.inner}>
        <div className={styles.personal}>
          <span className="eyebrow">{dict.eyebrow}</span>
          <a className={styles.mail} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <p className={styles.lead}>{dict.lead}</p>
          <a className={`${styles.github} mono`} href={`https://github.com/${profile.github}`}>
            github.com/{profile.github} ↗
          </a>
        </div>
        <aside className={styles.studio}>
          <span className="eyebrow">{dict.studio}</span>
          <p>{dict.studioLead}</p>
          <a className={styles.studioMail} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
          <a className={`${styles.studioLink} mono`} href={contactPageUrl}>
            {dict.contactPage} →
          </a>
        </aside>
      </div>
    </section>
  )
}
