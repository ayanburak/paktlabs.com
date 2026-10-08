/*
file: BlockView.tsx
importable: BlockView

Bir bolum parcasini turune bakip dogru bilesenle gosterir. Bolum cercevesi
parcalari her zaman bunun uzerinden gosterir, bu yuzden yeni bir parca turu
eklendiginde cerceveye dokunulmaz, yalnizca buraya bir satir eklenir.

description: Bolum parcasini turune gore ilgili bilesene yonlendiren dagitici.
*/

import type { ReactElement } from 'react'

import type { Block } from '@/content/studies/blocks'

import { Paragraph } from './Paragraph'

interface BlockViewProps {
  block: Block
}

// Donus tipi acikca yaziliyor. Block birlesimine yeni bir tur eklenip burada
// karsiligi yazilmazsa fonksiyonun bir yolu hicbir sey dondurmez ve TypeScript
// derlemeyi durdurur. Boylece unutulan bir parca sayfada sessizce bos kalmaz.
export function BlockView({ block }: BlockViewProps): ReactElement {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph block={block} />
  }
}
