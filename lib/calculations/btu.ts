import type { BTUFormData, BTUResult, HeatSource, SunExposure } from '@/types'
import { areaFor } from '@/lib/catalog/select'

/** Capacidades comerciais, da menor para a maior. */
const CAPACITIES = [9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000]

/** Margem técnica sobre a área máxima indicada pelas marcas. */
const TOLERANCE = 1.25

/** Teto da soma dos adicionais percentuais. */
const MAX_EXTRA = 0.5

export const SUN_OPTIONS: { value: Exclude<SunExposure, 'nao'>; label: string; pct: number }[] = [
  { value: 'manha', label: 'Sol de manhã', pct: 5 },
  { value: 'tarde', label: 'Sol à tarde', pct: 10 },
  { value: 'dia-todo', label: 'Sol o dia todo', pct: 15 },
]

export const HEAT_OPTIONS: { value: HeatSource; label: string; pct: number }[] = [
  { value: 'fogao', label: 'Fogão / forno', pct: 15 },
  { value: 'churrasqueira', label: 'Churrasqueira', pct: 20 },
  { value: 'eletronicos', label: 'Muitos eletrônicos (computadores, servidores)', pct: 10 },
  { value: 'vidros', label: 'Muitos vidros / portas de vidro com sol', pct: 10 },
  { value: 'pessoas', label: 'Muitas pessoas ao mesmo tempo (loja, escritório)', pct: 10 },
]

function heightPct(altura: number): number {
  if (altura <= 3.0) return 0
  if (altura <= 3.5) return 15
  return 30
}

export function calcBTU(form: BTUFormData): BTUResult {
  const adjustments: BTUResult['adjustments'] = []

  const sun = SUN_OPTIONS.find((o) => o.value === form.sol)
  if (sun) adjustments.push({ label: sun.label, pct: sun.pct })
  for (const h of HEAT_OPTIONS) {
    if (form.calor.includes(h.value)) adjustments.push({ label: h.label, pct: h.pct })
  }
  const extra = Math.min(MAX_EXTRA, adjustments.reduce((s, a) => s + a.pct, 0) / 100)

  const hPct = heightPct(form.altura)
  if (hPct) adjustments.push({ label: 'Pé-direito alto', pct: hPct })

  const effectiveArea = form.area * (1 + hPct / 100) * (1 + extra)
  const btu = CAPACITIES.find((cap) => effectiveArea < areaFor(cap)[1] * TOLERANCE) ?? null

  return { btu, effectiveArea, adjustments, exceedsMax: btu === null }
}
