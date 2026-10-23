export const BRAND_IDS = ['gree', 'midea', 'lg', 'samsung', 'elgin', 'daikin'] as const
export type BrandId = (typeof BRAND_IDS)[number]

export const TYPE_IDS = ['hi-wall', 'piso-teto', 'cassete', 'mini-vrf'] as const
export type TypeId = (typeof TYPE_IDS)[number]

export interface Brand {
  id: BrandId
  name: string
  /** Preenchido no servidor por lib/catalog/assets.ts quando o arquivo existe. */
  logo?: string
}

export interface CapacityVariant {
  btu: number
  /** Código do fabricante, ex. "GWC12AGA-D6NNA1A" */
  model?: string
  voltage?: string
  /** Classificação Procel/INMETRO, ex. "A" */
  energyLabel?: string
  /** Ruído da unidade interna em dB(A) */
  noiseDb?: number
  /** Só quando informado pelo fabricante */
  areaM2?: [number, number]
}

export interface ProductLine {
  type: TypeId
  brand: BrandId
  name: string
  inverter: boolean
  refrigerant?: string
  wifi?: boolean
  highlights: string[]
  /** URL da página do fabricante usada como fonte */
  source: string
  variants: CapacityVariant[]
  /** Preenchido no servidor por lib/catalog/assets.ts quando o arquivo existe. */
  image?: string
}

export interface ProductType {
  id: TypeId
  label: string
  badge?: string
  accent: string
  bg: string
  summary: string
  idealFor: string[]
  installation: string
  /** Foto de ambiente do card da home. Preenchido no servidor por lib/catalog/assets.ts quando o arquivo existe. */
  cover?: string
}

export interface Selection {
  btu: number
  brand: BrandId
}
