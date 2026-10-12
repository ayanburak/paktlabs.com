/*
file: Author.tsx
importable: Author

Calismayi hazirlayan kisinin kutusu: adi, e-postasi ve fotografi. Kutunun
tamami ana sitedeki profil sayfasina baglanir.

description: Calisma sayfalarinda calismanin yazarini gosteren ve profiline baglanan kutu.
*/

import { profilePhotos } from '@paktlabs/brand/content/profilePhotos'
import { profilePageUrl, profiles, type ProfileId } from '@paktlabs/brand/content/profiles'
import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import { useDict } from '@/i18n'

import styles from './Author.module.css'

interface AuthorProps {
  id: ProfileId
}

// Kisinin adi, e-postasi ve profil adresi brand'den gelir, profil sayfasi
// landing'de oldugu icin bilgi iki sitenin ortak paketinde duruyor. Kutu baglanti
// oldugu icin e-posta ayrica tiklanabilir degil, metin olarak durur.
export function Author({ id }: AuthorProps) {
  const { study } = useDict()
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const author = profiles[id]

  return (
    <a ref={ref} href={profilePageUrl(id)} className={cx('reveal', visible && 'in', styles.author)}>
      <span>
        <span className="eyebrow">{study.author.label}</span>
        <span className={styles.name}>{author.name}</span>
        <span className={styles.mail}>{author.email}</span>
      </span>
      <img className={styles.photo} src={profilePhotos[id]} alt="" width="600" height="600" />
    </a>
  )
}
