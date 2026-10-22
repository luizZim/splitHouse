import { BRAND_IDS, type BrandId, type CapacityVariant, type ProductLine, type Selection } from './types'

const AREA_TABLE: Array<[number, [number, number]]> = [
  [9000, [0, 15]],
  [12000, [15, 20]],
  [18000, [20, 30]],
  [22000, [30, 40]],
  [30000, [40, 50]],
  [36000, [50, 60]],
  [48000, [60, 80]],
  [55000, [80, 100]],
]

export function capacitiesFor(lines: ProductLine[]): number[] {
  const set = new Set(lines.flatMap((l) => l.variants.map((v) => v.btu)))
  return [...set].sort((a, b) => a - b)
}

export function brandsFor(lines: ProductLine[], btu: number): BrandId[] {
  return BRAND_IDS.filter((id) =>
    lines.some((l) => l.brand === id && l.variants.some((v) => v.btu === btu))
  )
}

export function resolveSelection(lines: ProductLine[], btu?: number, brand?: string): Selection {
  const caps = capacitiesFor(lines)
  const brandLine = lines.find((l) => l.brand === brand)

  let chosenBtu: number
  if (btu !== undefined && caps.includes(btu)) chosenBtu = btu
  else if (brandLine) chosenBtu = Math.min(...brandLine.variants.map((v) => v.btu))
  else chosenBtu = caps[0]

  const available = brandsFor(lines, chosenBtu)
  const chosenBrand = available.find((id) => id === brand) ?? available[0]
  return { btu: chosenBtu, brand: chosenBrand }
}

export function findVariant(
  lines: ProductLine[],
  sel: Selection
): { line: ProductLine; variant: CapacityVariant } | undefined {
  const line = lines.find((l) => l.brand === sel.brand)
  const variant = line?.variants.find((v) => v.btu === sel.btu)
  return line && variant ? { line, variant } : undefined
}

export const CAPACITY_LIMIT = 5

export function isBeyondLimit(caps: number[], btu: number): boolean {
  return caps.indexOf(btu) >= CAPACITY_LIMIT
}

/** Capacidades visíveis no seletor: as primeiras N (+ a selecionada) quando recolhido. */
export function visibleCapacities(
  caps: number[],
  selected: number,
  expanded: boolean
): { visible: number[]; hiddenCount: number; collapsible: boolean } {
  if (caps.length <= CAPACITY_LIMIT) return { visible: caps, hiddenCount: 0, collapsible: false }
  if (expanded) return { visible: caps, hiddenCount: 0, collapsible: true }
  const visible = caps.filter((c, i) => i < CAPACITY_LIMIT || c === selected)
  return { visible, hiddenCount: caps.length - visible.length, collapsible: true }
}

export function areaFor(btu: number, override?: [number, number]): [number, number] {
  if (override) return override
  if (btu > 60000) return [Math.round(btu / 750), Math.round(btu / 600)]
  let result = AREA_TABLE[0][1]
  for (const [min, area] of AREA_TABLE) {
    if (btu >= min) result = area
  }
  return result
}

export function formatArea([min, max]: [number, number]): string {
  return min === 0 ? `até ${max} m²` : `${min}–${max} m²`
}

export function formatBtu(btu: number): string {
  return btu.toLocaleString('pt-BR')
}
