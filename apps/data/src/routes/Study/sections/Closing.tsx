/*
file: Closing.tsx
importable: Closing

Detay sayfasini kapatan bolum: calismanin sorusu, butun calismalara donus
karti, varsa sonraki calismanin karti, iletisim adresi ve cizilmemis figurun
yeri. Veri sayfasinin iletisim bolumuyle ayni zemin ve olculerde durur.

description: Calisma detay sayfasini sonraki calismaya ve iletisime baglayan kapanis bolumu.
*/

import { Link } from 'react-router-dom'

import { contactEmail } from '@paktlabs/brand/content/contact'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { cx } from '@paktlabs/brand/lib/cx'

import { ArtSlot } from '@/components/ArtSlot'
import { studies } from '@/content/studies'
import type { Study, StudyPage } from '@/content/studies/types'
import { useDict } from '@/i18n'

import styles from './Closing.module.css'

interface ClosingProps {
  study: Study
  closing: StudyPage['closing']
}

// Sonraki calisma listede bu calismadan sonra gelen calismadir, liste bitince
// basa doner. Baska calisma yoksa yalnizca donus karti kalir.
function nextStudy(current: Study): Study | undefined {
  if (studies.length < 2) return undefined
  return studies[(studies.indexOf(current) + 1) % studies.length]
}

export function Closing({ study, closing }: ClosingProps) {
  const { language } = useLanguage()
  const { home, study: dict } = useDict()
  const copy = useReveal<HTMLDivElement>()
  const next = nextStudy(study)

  return (
    <section className={styles.closing}>
      <div className={styles.inner}>
        <div ref={copy.ref} className={cx('reveal', copy.visible && 'in', styles.copy)}>
          <span className="eyebrow">{dict.closing.label}</span>
          <h2>{closing.title[language]}</h2>
          <nav className={styles.next} aria-label={dict.closing.nav}>
            <a href="/#calismalar" className={styles.back}>
              <span className={cx(styles.box, styles.head)}>
                <span className="eyebrow">{dict.closing.all.label}</span>
                <h3>{dict.closing.all.title}</h3>
              </span>
              <span className={cx(styles.box, styles.panel)}>
                <span>{dict.closing.all.text}</span>
                <span className={styles.go}>{dict.closing.all.go}</span>
              </span>
            </a>
            {next && (
              <Link to={`/work/${next.slug}`}>
                <span className={cx(styles.box, styles.head)}>
                  <span className="eyebrow">
                    {next.number} · {dict.closing.next.label}
                  </span>
                  <h3>{next.title[language]}</h3>
                </span>
                <span className={cx(styles.box, styles.panel)}>
                  <span>{next.tags.map((tag) => home.works.tags[tag]).join(', ')}</span>
                  <span className={styles.go}>{dict.closing.next.go}</span>
                </span>
              </Link>
            )}
          </nav>
          <a className={styles.mail} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </div>
        <figure className={styles.art}>
          <ArtSlot label={closing.art.label[language]} note={closing.art.note[language]} />
        </figure>
      </div>
    </section>
  )
}
