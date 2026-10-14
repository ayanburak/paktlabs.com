/*
file: Schema.tsx
importable: Schema

Veritabani semasi parcasi. Etiket, soru, okuma ve altindaki parcalar ortak
Figure cercevesinden gelir. Iki gorunusu var. plate teknik bir cizim
levhasidir: cift cerceve, sag altta antet, kirik cizgilerle baglar, her
bagin ciktigi satirda bir numara ve levhanin altinda numarali bag cumleleri.
center bir tabloyu ortada butun sutunlariyla gosterir, otekiler etrafinda
durur, baglar karttan karta duz gider.

Tablolar CSS grid ile yerlesimdeki yerlerine konur, cizgiler yerlesim
bittikten sonra kartlarin olculerinden hesaplanir. Cizgiler kartlarin
altindaki, numaralar ve etiketler ustundeki katmana cizilir. Dar ekranda
sema kendi alaninda yana kaydirilir.

description: Veritabani tablolarini ve aralarindaki baglari levha ya da merkez gorunusuyle cizen parca.
*/

// NOTE: Cizgiler ilk cizimde yoktur, kartlar yerlesip olculunce gelir.
// Fontlar sonradan yuklenip kartlarin boyu degisirse ya da ekran genisligi
// degisirse yeniden hesaplanir.

import { type CSSProperties, useLayoutEffect, useRef, useState } from 'react'

import { useLanguage } from '@paktlabs/brand/i18n/language'

import type { SchemaBlock } from '@/content/studies/blocks'
import { layoutColumn, type SchemaLink, schemaLinks } from '@/content/studies/dbschema'
import { useDict } from '@/i18n'

import { Figure } from '../Figure'
import { formatValue } from '../format'
import { type Box, type Drawing, routeCenter, routePlate } from './route'
import styles from './Schema.module.css'
import { TableCard } from './TableCard'

// Kapsayiciya gore bir elemanin kutusu.
function boxOf(root: HTMLElement, element: Element | null): Box {
  const outer = root.getBoundingClientRect()
  const inner = element?.getBoundingClientRect() ?? outer
  return { l: inner.left - outer.left, r: inner.right - outer.left, t: inner.top - outer.top, b: inner.bottom - outer.top }
}

// Cizimi kartlar yerlestikten sonra hesaplar, kapsayicinin boyu ya da
// fontlar degisince yeniden hesaplar. compute DOM'u olcup cizimi dondurur.
function useDrawing(compute: (root: HTMLElement) => Drawing, key: unknown) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawing, setDrawing] = useState<Drawing | null>(null)
  // Olcum etkisi yalnizca blok degisince yeniden kurulur, compute her
  // cizimde yeni bir fonksiyon oldugu icin en sonuncusu ayri tutulur.
  const latest = useRef(compute)
  useLayoutEffect(() => {
    latest.current = compute
  })

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const draw = () => setDrawing(latest.current(root))
    const observer = new ResizeObserver(draw)
    observer.observe(root)
    void document.fonts.ready.then(draw)
    return () => observer.disconnect()
  }, [key])

  return { ref, drawing }
}

// Iki SVG katmani. Alttaki cizgileri ve birlesme noktalarini, ustteki
// numaralari ve 1 ya da n etiketlerini tasir.
function Layers({ drawing }: { drawing: Drawing | null }) {
  return (
    <>
      <svg className={styles.under}>
        {drawing?.lines.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {drawing?.joints.map((joint, i) => (
          <circle key={i} cx={joint.x} cy={joint.y} r="3.5" />
        ))}
      </svg>
      <svg className={styles.over}>
        {drawing?.badges.map((badge) => (
          <g key={badge.n}>
            <circle cx={badge.x} cy={badge.y} r="8.5" />
            <text x={badge.x} y={badge.y}>
              {badge.n}
            </text>
          </g>
        ))}
        {drawing?.labels.map((label, i) => (
          <text key={i} x={label.x} y={label.y} textAnchor={label.anchor} className={styles.end}>
            {label.text}
          </text>
        ))}
      </svg>
    </>
  )
}

interface ViewProps {
  block: SchemaBlock
  links: SchemaLink[]
}

const areas = (layout: string[]) => ({ gridTemplateAreas: layout.map((row) => `"${row}"`).join(' ') }) as CSSProperties

function Plate({ block, links }: ViewProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const columns = block.layout[0]?.split(/\s+/).length ?? 1

  const { ref, drawing } = useDrawing(
    (root) =>
      routePlate({
        links,
        columns,
        columnOf: (table) => layoutColumn(block.layout, table),
        row: (table, column) => {
          const box = boxOf(root, root.querySelector(`[data-table="${table}"] [data-column="${column}"]`))
          return { l: box.l, r: box.r, y: (box.t + box.b) / 2 }
        },
        edge: (column, side) => {
          const boxes = block.schema.tables
            .filter((table) => layoutColumn(block.layout, table.name) === column)
            .map((table) => boxOf(root, root.querySelector(`[data-table="${table.name}"]`)))
          return side === 'r' ? Math.max(...boxes.map((box) => box.r)) : Math.min(...boxes.map((box) => box.l))
        },
      }),
    block,
  )

  return (
    <div className={styles.scroll}>
      <div className={styles.plate}>
        <div ref={ref} className={styles.sheet} style={{ ...areas(block.layout), gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          <Layers drawing={drawing} />
          {block.schema.tables.map((table) => (
            <TableCard key={table.name} table={table} view="brief" />
          ))}
          <dl className={styles.antet}>
            <div>
              <dt>{study.schema.sheet}</dt>
              <dd>{block.label[language]}</dd>
            </div>
            <div>
              <dt>{study.schema.engine}</dt>
              <dd>{block.schema.engine}</dd>
            </div>
            <div>
              <dt>{study.schema.tables}</dt>
              <dd>{formatValue(block.schema.tables.length, 'count', 0, language)}</dd>
            </div>
            <div>
              <dt>{study.schema.links}</dt>
              <dd>{formatValue(links.length, 'count', 0, language)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

function Center({ block, links }: ViewProps) {
  const { ref, drawing } = useDrawing(
    (root) => routeCenter({ links, card: (table) => boxOf(root, root.querySelector(`[data-table="${table}"]`)) }),
    block,
  )
  // Ortadaki tablonun sutunu otekilerden genis, butun sutunlari orada yazar.
  const columns = block.layout[0]?.split(/\s+/).length ?? 1
  const mainColumn = block.main ? layoutColumn(block.layout, block.main) : -1
  const widths = Array.from({ length: columns }, (_, i) => (i === mainColumn ? 'minmax(0, 1.3fr)' : 'minmax(0, 1fr)')).join(' ')

  return (
    <div className={styles.scroll}>
      <div ref={ref} className={styles.center} style={{ ...areas(block.layout), gridTemplateColumns: widths }}>
        <Layers drawing={drawing} />
        {block.schema.tables.map((table) => (
          <TableCard key={table.name} table={table} view={table.name === block.main ? 'full' : 'keys'} main={table.name === block.main} />
        ))}
      </div>
    </div>
  )
}

interface SchemaProps {
  block: SchemaBlock
}

// Ekran okuyucuya tablolar ve her bagin cumlesi okunur. Levhanin altindaki
// numarali bag listesi gorselin disindadir, ekran okuyucu onu da okur.
export function Schema({ block }: SchemaProps) {
  const { language } = useLanguage()
  const { study } = useDict()
  const links = schemaLinks(block.schema)
  const sentences = links.map((link) => link.text?.[language] ?? '')
  const description = [
    block.title[language],
    block.schema.tables.map((table) => table.name).join(', '),
    ...sentences,
  ].join('. ')

  return (
    <Figure
      label={block.label[language]}
      title={block.title[language]}
      reading={block.reading[language]}
      description={description}
      after={
        block.view === 'plate' && (
          <div className={styles.legend}>
            <ol className={styles.links}>
              {links.map((link, i) => (
                <li key={link.from.join('.')}>
                  <b aria-hidden="true">{i + 1}</b>
                  <span>
                    {link.text?.[language]}
                    <code>
                      {link.from.join('.')} → {link.to.join('.')}
                    </code>
                  </span>
                </li>
              ))}
            </ol>
            <p className={styles.ends}>{study.schema.ends}</p>
          </div>
        )
      }
      blocks={block.blocks}
    >
      {block.view === 'plate' ? <Plate block={block} links={links} /> : <Center block={block} links={links} />}
    </Figure>
  )
}
