import { BRANDS } from '@/lib/data/catalog'

export { labelOf } from '@/lib/catalog/install'

export const EQUIPMENT_TYPE_OPTIONS = [
  { value: 'hi-wall', label: 'Split Hi-Wall' },
  { value: 'piso-teto', label: 'Piso Teto' },
  { value: 'cassete', label: 'Cassete' },
  { value: 'nao-sei', label: 'Não sei' },
] as const

export const CAPACITY_OPTIONS = [
  ...[9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000].map((b) => ({
    value: String(b),
    label: `${b.toLocaleString('pt-BR')} BTU`,
  })),
  { value: 'nao-sei', label: 'Não sei' },
]

export const BRAND_OPTIONS = [
  ...BRANDS.map((b) => ({ value: b.id as string, label: b.name })),
  { value: 'outra', label: 'Outra' },
  { value: 'nao-sei', label: 'Não sei' },
]

/** "Não sei" vira texto minúsculo dentro da frase. */
export function lowerUnknown(label: string): string {
  return label === 'Não sei' ? 'não sei' : label
}
