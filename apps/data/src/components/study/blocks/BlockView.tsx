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

import { Acceptance } from './Acceptance'
import { Calc } from './Calc'
import { Chart } from './Chart'
import { Compare } from './Compare'
import { Composition } from './Composition'
import { Correlation } from './Correlation'
import { DbTable } from './DbTable'
import { Decisions } from './Decisions'
import { Details } from './Details'
import { Code } from './file/Code'
import { DataFile } from './file/DataFile'
import { Output } from './file/Output'
import { Heat } from './Heat'
import { Line } from './Line'
import { List } from './List'
import { Matrix } from './Matrix'
import { Note } from './Note'
import { Paragraph } from './Paragraph'
import { Pie } from './Pie'
import { Schema } from './schema/Schema'
import { Sheet } from './Sheet'
import { SingleRecord } from './SingleRecord'
import { Stations } from './Stations'
import { Table } from './Table'
import { Timeline } from './Timeline'
import { Tree } from './Tree'

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
    case 'list':
      return <List block={block} />
    case 'details':
      return <Details block={block} />
    case 'sheet':
      return <Sheet block={block} />
    case 'table':
      return <Table block={block} />
    case 'stations':
      return <Stations block={block} />
    case 'chart':
      return <Chart block={block} />
    case 'line':
      return <Line block={block} />
    case 'composition':
      return <Composition block={block} />
    case 'pie':
      return <Pie block={block} />
    case 'heat':
      return <Heat block={block} />
    case 'correlation':
      return <Correlation block={block} />
    case 'matrix':
      return <Matrix block={block} />
    case 'record':
      return <SingleRecord block={block} />
    case 'calc':
      return <Calc block={block} />
    case 'acceptance':
      return <Acceptance block={block} />
    case 'schema':
      return <Schema block={block} />
    case 'dbtable':
      return <DbTable block={block} />
    case 'decisions':
      return <Decisions block={block} />
    case 'timeline':
      return <Timeline block={block} />
    case 'tree':
      return <Tree block={block} />
    case 'compare':
      return <Compare block={block} />
    case 'note':
      return <Note block={block} />
    case 'code':
      return <Code block={block} />
    case 'output':
      return <Output block={block} />
    case 'datafile':
      return <DataFile block={block} />
  }
}
