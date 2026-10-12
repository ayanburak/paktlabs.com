/*
file: Curious.tsx
importable: Curious

Meraklisina karti. Bolumler bittikten sonra kodu ve veriyi gormek isteyen
okuru bir sonraki katmana goturur. Firma koda izin verdiyse kart yalnizca
GitHub'daki depoya, vermediyse sitedeki kod ve veri sayfasina baglanir. Kart
her detay sayfasinda bulunur.

description: Calismanin koduna ve verisine giden iki kutulu kart.
*/

import { workPath } from '@paktlabs/brand/content/works'

import { LinkCard } from '@/components/study/LinkCard'
import type { Study } from '@/content/studies/types'
import { useDict } from '@/i18n'

interface CuriousProps {
  study: Study
}

// Metin kodun nerede durduguna gore sozlukten secilir, calismaya ozel degil.
// Kod sayfasi site ici bir adres, depo ise baska bir site.
export function Curious({ study }: CuriousProps) {
  const { study: dict } = useDict()
  const text = dict.curious[study.code.kind]
  const target =
    study.code.kind === 'page' ? { to: `${workPath(study.slug)}/source` } : { href: study.code.url }

  return <LinkCard {...target} label={dict.curious.label} title={text.title} text={text.text} go={text.go} />
}
