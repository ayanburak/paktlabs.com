/*
file: Closing.tsx
importable: Closing

Detay sayfasini kapatan bolum: calismanin sorusu, butun calismalara donus
karti, varsa sonraki calismanin karti, iletisim adresi ve butun calismalarda
ortak olan cizim. Veri sayfasinin iletisim bolumuyle ayni zemin ve olculerde
durur.

description: Calisma detay sayfasini sonraki calismaya ve iletisime baglayan kapanis bolumu.
*/

import { Link } from 'react-router-dom'

import phoneUrl from '@paktlabs/brand/assets/phone.svg'
import { RevealImg, emptyImage } from '@paktlabs/brand/components/RevealImg'
import { contactEmail } from '@paktlabs/brand/content/contact'
import { workPath } from '@paktlabs/brand/content/works'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { cx } from '@paktlabs/brand/lib/cx'

import { studies } from '@/content/studies'
import type { Study, StudyPage } from '@/content/studies/types'
import { useDict } from '@/i18n'
import { worksPath } from '@/routes/links'

import styles from './Closing.module.css'

// NOTE: Ortak cizim simdilik iletisim bolumundeki telefon, gercek kapanis
// cizimi gelince yalnizca bu import degisir.
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

// Solda listeye donus karti, varsa sonraki calismanin karti ve iletisim
// adresi, sagda ortak cizim durur. Cizim dar ekranda bos svg ile yer tutar ve
// indirilmez.
export function Closing({ study, closing }: ClosingProps) {
  const { language } = useLanguage()
  const { study: dict } = useDict()
  const { dataTags } = useBrandDict()
  const copy = useReveal<HTMLDivElement>()
  const next = nextStudy(study)

  return (
    <section className={styles.closing}>
      <div className={styles.inner}>
        <div ref={copy.ref} className={cx('reveal', copy.visible && 'in', styles.copy)}>
          <span className="eyebrow">{dict.closing.label}</span>
          <h2>{closing.title[language]}</h2>
          <nav className={styles.next} aria-label={dict.closing.nav}>
            <Link to={worksPath()} className={styles.back}>
              <span className={cx(styles.box, styles.head)}>
                <span className="eyebrow">{dict.closing.all.label}</span>
                <h3>{dict.closing.all.title}</h3>
              </span>
              <span className={cx(styles.box, styles.panel)}>
                <span>{dict.closing.all.text}</span>
                <span className={styles.go}>{dict.closing.all.go}</span>
              </span>
            </Link>
            {next && (
              <Link to={workPath(next.slug)}>
                <span className={cx(styles.box, styles.head)}>
                  <span className="eyebrow">
                    {next.number} · {dict.closing.next.label}
                  </span>
                  <h3>{next.title[language]}</h3>
                </span>
                <span className={cx(styles.box, styles.panel)}>
                  <span>{next.tags.map((tag) => dataTags[tag]).join(', ')}</span>
                  <span className={styles.go}>{dict.closing.next.go}</span>
                </span>
              </Link>
            )}
          </nav>
          <a className={styles.mail} href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </div>
        <picture className={styles.art}>
          <source media="(min-width: 769px)" srcSet={phoneUrl} />
          <RevealImg src={emptyImage} />
        </picture>
      </div>
    </section>
  )
}
