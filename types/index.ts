export interface Service {
  id: string
  title: string
  color: string
  desc: string
  when: string[]
  steps: string[]
}

export interface Testimonial {
  name: string
  loc: string
  initial: string
  color: string
  text: string
}

export type SunExposure = 'nao' | 'manha' | 'tarde' | 'dia-todo'
export type HeatSource = 'fogao' | 'churrasqueira' | 'eletronicos' | 'vidros' | 'pessoas'

export interface BTUFormData {
  area: number
  altura: number
  sol: SunExposure
  calor: HeatSource[]
}

export interface BTUResult {
  /** null quando o ambiente passa de 60.000 BTU */
  btu: number | null
  effectiveArea: number
  adjustments: { label: string; pct: number }[]
  exceedsMax: boolean
}

export interface NavItem {
  label: string
  href: string
}
