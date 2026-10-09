/*
file: LinkCard.tsx
importable: LinkCard

Iki kutulu bir baglanti karti: ustte kucuk bir etiket ve baslik, altta kisa
bir aciklama ve gecis yazisi. Kartin tamami tek bir baglantidir. Detay
sayfasindaki Meraklisina karti ve kod sayfasindaki calismaya donus karti
bunu kullanir, ikisi ayni gorunur.

    <LinkCard to="/work/demo-veri/source" label="Meraklisina" title="..." text="..." go="Koda git →" />

description: Calisma sayfalarinda baska bir sayfaya goturen iki kutulu kart.
*/

import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useReveal } from '@paktlabs/brand/hooks/useReveal'
import { cx } from '@paktlabs/brand/lib/cx'

import styles from './LinkCard.module.css'

// Hedef ya site ici bir adres ya da baska bir sitedir, ikisi birden
// verilemez. Site ici adres sayfayi yeniden yuklemeden acilir.
type Target = { to: string; href?: never } | { href: string; to?: never }

type LinkCardProps = Target & {
  label: string
  title: string
  text: string
  go: string
}

// Metinler secili dilde hazir gelir, kart dil bilmez. Kart ekrana girerken
// belirir.
export function LinkCard({ label, title, text, go, ...target }: LinkCardProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>()
  const className = cx('reveal', visible && 'in', styles.card)

  const content: ReactNode = (
    <>
      <span className={cx(styles.box, styles.head)}>
        <span className="eyebrow">{label}</span>
        <h3>{title}</h3>
      </span>
      <span className={cx(styles.box, styles.panel)}>
        <span className={styles.text}>{text}</span>
        <span className={styles.go}>{go}</span>
      </span>
    </>
  )

  return target.to !== undefined ? (
    <Link ref={ref} to={target.to} className={className}>
      {content}
    </Link>
  ) : (
    <a ref={ref} href={target.href} className={className}>
      {content}
    </a>
  )
}
