/*
file: Works.tsx
importable: Works

Kisinin yazdigi calismalarin listesi. Liste brand'deki works.ts'ten yazara
gore suzulur, her satir calismanin kendi disiplin sitesindeki sayfasina gider.
Satirda disiplinin rengi, adi ve calismanin basligi durur.

description: Profil sayfasinda kisinin yayinladigi calismalari disiplinleriyle listeleyen bolum.
*/

import type { CSSProperties } from 'react'

import type { ProfileId } from '@paktlabs/brand/content/profiles'
import { workUrl, works } from '@paktlabs/brand/content/works'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { useLanguage } from '@paktlabs/brand/i18n/language'
import { useBrandDict } from '@paktlabs/brand/i18n/useBrandDict'
import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import styles from './Works.module.css'

interface WorksProps {
  id: ProfileId
}

// Sayi iki haneli yazilir, data'daki calisma numaralari gibi. Satirlar ekrana
// girince sirayla belirir, --i sira gecikmesini verir. Kisinin hic calismasi
// yoksa bolum hic cizilmez, bos bir baslik birakmaz.
export function Works({ id }: WorksProps) {
  const { works: dict } = useDict().profilePage
  const { nav } = useBrandDict()
  const { language } = useLanguage()
  const { ref, visible } = useReveal<HTMLOListElement>()
  const list = Object.values(works).filter((work) => work.author === id)

  if (list.length === 0) return null

  return (
    <section className={styles.works}>
      <div className={styles.head}>
        <div>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className={styles.title}>{dict.title}</h2>
          <p className={styles.lead}>{dict.lead}</p>
        </div>
        <p className={`${styles.count} mono`}>
          <span>{String(list.length).padStart(2, '0')}</span> {dict.published}
        </p>
      </div>
      <ol ref={ref} className={styles.list}>
        {list.map((work, index) => (
          <li
            key={work.slug}
            className={cx('reveal', visible && 'in', styles.row)}
            style={{ '--i': index } as CSSProperties}
          >
            <a href={workUrl(work)} data-tone={work.discipline}>
              <span className={`${styles.discipline} mono`}>{nav[work.discipline]}</span>
              <span className={styles.workTitle}>{work.title[language]}</span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
