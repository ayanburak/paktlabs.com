/*
file: route.ts
importable: routePlate, routeCenter, PlateInput, CenterInput, Drawing, RowBox, Box

Veritabani semasindaki baglarin cizgilerini hesaplar. Sayfa tablolari
yerlestirip olcer, olculeri buraya verir, buradan cizilecek yollar,
birlesme noktalari, numaralar ve 1 etiketleri doner. Fonksiyonlar DOM
bilmez, ayni olculer ayni cizimi verir.

    const drawing = routePlate({ links, columnOf, row, gap })

routePlate cizim levhasi icindir: kirik cizgiler, seritler ve kopruler.
routeCenter ortadaki tablo gorunusu icindir: karttan karta duz cizgiler.

description: Sema baglarinin cizgilerini olculmus tablo kutularindan hesaplayan saf fonksiyonlar.
*/

// NOTE: routePlate bir bagi yalnizca yan yana iki sutun arasinda ya da ayni
// sutun icinde cizer. Iki sutun atlayan bir bag ilk bosluktan gecer ve
// arada kalan tablonun ustunden cizilir, yerlesim buna gore yazilmali. Rehber
// bunu soyluyor, data testi bu durumu ayrica yakalar.

// Bir tablo satirinin sol ve sag kenari ve dikey ortasi, kapsayiciya gore.
export interface RowBox {
  l: number
  r: number
  y: number
}

// Bir kartin dort kenari, kapsayiciya gore.
export interface Box {
  l: number
  r: number
  t: number
  b: number
}

// Cizilecek her sey. lines kartlarin altindaki katmana, marks ustteki
// katmana cizilir: numaralar ve 1 etiketleri kartlarin kenarina biner.
export interface Drawing {
  lines: string[]
  joints: { x: number; y: number }[]
  badges: { x: number; y: number; n: number }[]
  labels: { x: number; y: number; text: string; anchor: 'start' | 'end' }[]
}

// Bir bag: FK satirindan PK satirina, tablo ve sutun adiyla.
export interface LinkEnds {
  from: [string, string]
  to: [string, string]
}

export interface PlateInput {
  links: LinkEnds[]
  columns: number
  columnOf: (table: string) => number
  row: (table: string, column: string) => RowBox
  // Bir sutundaki kartlarin sag ya da sol kenari, bosluklarin siniri.
  edge: (column: number, side: 'l' | 'r') => number
}

// Bir bagin kirik cizgisi icin gereken her sey. key ayni PK satirina ayni
// yandan giren baglari ayni seride toplar.
interface Leg {
  n: number
  gap: number
  ya: number
  yb: number
  x1: number
  x2: number
  key: string
}

interface Segment {
  horizontal: boolean
  at: number
  a: number
  b: number
  key: string
}

// Bir bagin uc parcasi: FK'dan seride yatay, serit boyunca dikey, seritten
// PK'ya yatay.
function segments(legs: Leg[], lane: Record<string, number>): Segment[] {
  return legs.flatMap((leg) => {
    const x = lane[leg.key] ?? 0
    return [
      { horizontal: true, at: leg.ya, a: Math.min(leg.x1, x), b: Math.max(leg.x1, x), key: leg.key },
      { horizontal: false, at: x, a: Math.min(leg.ya, leg.yb), b: Math.max(leg.ya, leg.yb), key: leg.key },
      { horizontal: true, at: leg.yb, a: Math.min(leg.x2, x), b: Math.max(leg.x2, x), key: leg.key },
    ]
  })
}

// Yatay ve dikey bir parca birbirini uclarinin disinda kesiyor mu.
function crosses(h: Segment, v: Segment): boolean {
  return v.at > h.a + 6 && v.at < h.b - 6 && h.at > v.a + 2 && h.at < v.b - 2
}

// Bir serit siralamasinin bedeli. Farkli seritlerden iki parcanin ust uste
// binmesi en pahali, cunku okur iki cizgiyi tek cizgi sanar. Kesisme ucuz,
// kopruyle okunur kalir.
function cost(parts: Segment[]): number {
  let total = 0
  parts.forEach((p, i) =>
    parts.slice(i + 1).forEach((q) => {
      if (p.key === q.key) return
      if (p.horizontal === q.horizontal && Math.abs(p.at - q.at) < 4 && Math.min(p.b, q.b) - Math.max(p.a, q.a) > 2) total += 100
      if (p.horizontal && !q.horizontal && crosses(p, q)) total += 1
      if (!p.horizontal && q.horizontal && crosses(q, p)) total += 1
    }),
  )
  return total
}

// Bir dizinin butun siralamalari. Bir bosluktan gecen serit sayisi bes alti
// tabloluk bir semada dordu gecmez, yirmi dort siralamayi denemek ucuz.
function permutations<T>(items: T[]): T[][] {
  if (items.length < 2) return [items]
  return items.flatMap((item, i) => permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest]))
}

// Yatay bir parcayi cizer, baska bir seridin dikey cizgisini kestigi yerde
// dort piksellik bir kopruyle ustunden atlar. Kopru her zaman yukari bakar.
function horizontal(x0: number, x1: number, y: number, key: string, verticals: Segment[]): string {
  const dir = x1 > x0 ? 1 : -1
  const hits = verticals
    .filter((v) => v.key !== key && crosses({ horizontal: true, at: y, a: Math.min(x0, x1), b: Math.max(x0, x1), key }, v))
    .map((v) => v.at)
    .sort((a, b) => dir * (a - b))
  return hits.map((x) => `H${x - dir * 4} A4 4 0 0 ${dir > 0 ? 1 : 0} ${x + dir * 4} ${y}`).join(' ') + ` H${x1}`
}

// Cizim levhasinin baglari. Her bag FK satirindan cikar, iki sutun arasindaki
// boslukta bir seritte doner ve PK satirina girer. Ayni PK satirina ayni yandan
// giden baglar tek seridi paylasir ve govde gibi birlesir, birlestikleri yerde
// bir nokta durur. Bir bosluktaki seritlerin sirasi butun siralamalar denenip
// en ucuzu secilerek bulunur. Bagin numarasi ciktigi satirda, tablonun
// kenarinda durur, orada baska bir sey olmadigi icin hicbir seye carpmaz.
export function routePlate({ links, columns, columnOf, row, edge }: PlateInput): Drawing {
  const legs: Leg[] = links.map((link, i) => {
    const ca = columnOf(link.from[0])
    const cb = columnOf(link.to[0])
    const gap = ca === cb ? (ca < columns - 1 ? ca : ca - 1) : Math.min(ca, cb)
    const a = row(...link.from)
    const b = row(...link.to)
    const targetSide = cb <= gap ? 'r' : 'l'
    return { n: i + 1, gap, ya: a.y, yb: b.y, x1: ca <= gap ? a.r : a.l, x2: targetSide === 'r' ? b.r : b.l, key: link.to.join('.') + targetSide }
  })

  const lane: Record<string, number> = {}
  for (let gap = 0; gap < columns - 1; gap++) {
    const inGap = legs.filter((leg) => leg.gap === gap)
    const keys = [...new Set(inGap.map((leg) => leg.key))]
    const left = edge(gap, 'r')
    const right = edge(gap + 1, 'l')
    let best: { cost: number; lane: Record<string, number> } | null = null
    for (const order of permutations(keys)) {
      const trial: Record<string, number> = {}
      order.forEach((key, j) => (trial[key] = left + ((right - left) * (j + 1)) / (order.length + 1)))
      const c = cost(segments(inGap, trial))
      if (!best || c < best.cost) best = { cost: c, lane: trial }
    }
    Object.assign(lane, best?.lane)
  }

  const verticals = segments(legs, lane).filter((part) => !part.horizontal)
  const drawing: Drawing = { lines: [], joints: [], badges: [], labels: [] }
  const groups = new Map<string, Leg[]>()
  for (const leg of legs) groups.set(leg.key, [...(groups.get(leg.key) ?? []), leg])

  for (const leg of legs) {
    const x = lane[leg.key] ?? 0
    drawing.lines.push(`M${leg.x1} ${leg.ya} ${horizontal(leg.x1, x, leg.ya, leg.key, verticals)} V${leg.yb}`)
    drawing.badges.push({ x: leg.x1, y: leg.ya, n: leg.n })
  }
  for (const group of groups.values()) {
    const first = group[0]
    if (!first) continue
    const x = lane[first.key] ?? 0
    const side = first.x2 < x ? 1 : -1
    drawing.lines.push(`M${x} ${first.yb} ${horizontal(x, first.x2, first.yb, first.key, verticals)}`)
    drawing.labels.push({ x: first.x2 + side * 7, y: first.yb - 5, text: '1', anchor: side > 0 ? 'start' : 'end' })
    // govdenin ortasina katilan baglarin birlesme noktalari
    const ys = group.flatMap((leg) => [leg.ya, leg.yb])
    const low = Math.min(...ys)
    const high = Math.max(...ys)
    for (const leg of group) if (leg.ya > low + 1 && leg.ya < high - 1) drawing.joints.push({ x, y: leg.ya })
  }
  return drawing
}

export interface CenterInput {
  links: LinkEnds[]
  card: (table: string) => Box
}

// Ortadaki tablo gorunusunun baglari. Iki kart yan yana bir yukseklik
// paylasiyorsa yatay, ust uste bir genislik paylasiyorsa dikey bir cizgi,
// ortak araligin ortasindan. FK tarafinda nokta ve n, PK tarafinda 1 yazar.
// Ayni noktaya giren baglarin 1 etiketi bir kez yazilir.
export function routeCenter({ links, card }: CenterInput): Drawing {
  const drawing: Drawing = { lines: [], joints: [], badges: [], labels: [] }
  const ones = new Set<string>()
  for (const link of links) {
    const a = card(link.from[0])
    const b = card(link.to[0])
    const overlapY = [Math.max(a.t, b.t), Math.min(a.b, b.b)] as const
    const overlapX = [Math.max(a.l, b.l), Math.min(a.r, b.r)] as const
    let start: [number, number]
    let end: [number, number]
    if (overlapY[1] - overlapY[0] > 20) {
      const y = (overlapY[0] + overlapY[1]) / 2
      start = [a.r < b.l ? a.r : a.l, y]
      end = [a.r < b.l ? b.l : b.r, y]
    } else {
      const x = (overlapX[0] + overlapX[1]) / 2
      start = [x, a.b < b.t ? a.b : a.t]
      end = [x, a.b < b.t ? b.t : b.b]
    }
    const dx = Math.sign(end[0] - start[0])
    const dy = Math.sign(end[1] - start[1])
    drawing.lines.push(`M${start[0]} ${start[1]} L${end[0]} ${end[1]}`)
    drawing.joints.push({ x: start[0], y: start[1] })
    drawing.labels.push(
      dx !== 0
        ? { x: start[0] + dx * 7, y: start[1] - 6, text: 'n', anchor: dx > 0 ? 'start' : 'end' }
        : { x: start[0] + 7, y: start[1] + dy * 14, text: 'n', anchor: 'start' },
    )
    const key = end.join(',')
    if (ones.has(key)) continue
    ones.add(key)
    drawing.labels.push(
      dx !== 0
        ? { x: end[0] - dx * 7, y: end[1] - 6, text: '1', anchor: dx > 0 ? 'end' : 'start' }
        : { x: end[0] + 7, y: end[1] - dy * (dy < 0 ? 20 : 6), text: '1', anchor: 'start' },
    )
  }
  return drawing
}
