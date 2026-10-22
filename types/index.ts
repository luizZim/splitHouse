/** Ação do botão do card: abrir um pop-up de orçamento ou rolar até uma seção. */
export type ServiceAction = { modal: 'install' | 'maintenance' | 'solar' } | { section: string; label: string }

export interface Service {
  id: string
  title: string
  color: string
  desc: string
  when: string[]
  steps: string[]
  action: ServiceAction
  /** Pasta em public/galeria/ com fotos deste serviço. */
  galleryTag?: string
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
