import type { BTUFormData, BTUResult } from '@/types'

const BTU_STANDARDS = [7500, 9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000]

const HEIGHT_FACTOR: [number, number][] = [
  [2.4, 0.9],
  [2.8, 1.0],
  [3.2, 1.1],
  [Infinity, 1.2],
]

const SOLAR_FACTOR: Record<BTUFormData['sol'], number> = {
  baixo: 1.0,
  medio: 1.1,
  alto: 1.2,
}

export function calcBTU(form: BTUFormData): BTUResult {
  let base = form.area * 600

  const hf = HEIGHT_FACTOR.find(([max]) => form.altura <= max)?.[1] ?? 1.2
  base *= hf

  base *= SOLAR_FACTOR[form.sol]

  base += Math.max(0, form.pessoas - 1) * 600

  base += form.equipamentos * 600

  const raw = Math.round(base)
  const ideal = BTU_STANDARDS.find((b) => b >= raw) ?? 60000
  const idx = BTU_STANDARDS.indexOf(ideal)
  const range: [number, number] = [
    ideal,
    BTU_STANDARDS[Math.min(idx + 1, BTU_STANDARDS.length - 1)],
  ]

  return { btu: ideal, range, raw }
}
