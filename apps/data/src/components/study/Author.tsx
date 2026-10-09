/*
file: Author.tsx
importable: Author

Calismayi hazirlayan kisinin kutusu: adi, e-postasi ve profil fotografinin
yeri. Kutunun tamami ana sitedeki profil sayfasina baglanir. Fotograf gelene
kadar yerinde kesikli bir cerceve durur.

description: Calisma sayfalarinda calismanin yazarini gosteren ve profiline baglanan kutu.
*/

import { mainSiteUrl } from '@paktlabs/brand/content/site'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import { type AuthorId, authors } from '@/content/authors'
import { useDict } from '@/i18n'

import styles from './Author.module.css'

interface AuthorProps {
  id: AuthorId
}

// NOTE: profil sayfasi henuz yok, baglanti simdilik bos bir sayfaya gider.
// Burak bunu kabul etti, sayfa ileride ana sitede yazilacak.
//
// Adres ana sitenin adresinden turetilir, sabit yazilmaz. Kutu baglanti
// oldugu icin e-posta ayrica tiklanabilir degil, metin olarak durur.
export function Author({ id }: AuthorProps) {
  const { study } = useDict()
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const author = authors[id]

  return (
    <a ref={ref} href={`${mainSiteUrl}/profiles/${id}`} className={cx('reveal', visible && 'in', styles.author)}>
      <span>
        <span className="eyebrow">{study.author.label}</span>
        <span className={styles.name}>{author.name}</span>
        <span className={styles.mail}>{author.email}</span>
      </span>
      <span className={styles.photo} aria-hidden="true">
        {study.author.photo}
      </span>
    </a>
  )
}
