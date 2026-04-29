export interface ProductCategory {
  id: string
  label: string
  badge?: string
  bg: string
  accent: string
  desc: string
}

export interface Product {
  id: string
  name: string
  brand: string
  btu: string
  type: string
  use: string
  energy: 'A' | 'B'
  categoryId: string
}

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

export interface BTUFormData {
  area: number
  altura: number
  pessoas: number
  sol: 'baixo' | 'medio' | 'alto'
  equipamentos: number
}

export interface BTUResult {
  btu: number
  range: [number, number]
  raw: number
}

export interface ContactFormData {
  nome: string
  telefone: string
  mensagem: string
}

export interface NavItem {
  label: string
  href: string
}
