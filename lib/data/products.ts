import type { ProductCategory, Product } from '@/types'

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'hi-wall',
    label: 'Split Hi-Wall',
    badge: 'Mais vendido',
    bg: 'from-[#EEF0FC] to-[#D4D8F7]',
    accent: '#2E3192',
    desc: '9.000–30.000 BTU · Alta eficiência energética',
  },
  {
    id: 'mini-vrf',
    label: 'Mini VRF',
    badge: 'Comercial',
    bg: 'from-[#E8F7FD] to-[#C3EAFB]',
    accent: '#29ABE2',
    desc: 'A partir de 3TR · Escritórios e lojas',
  },
  {
    id: 'piso-teto',
    label: 'Piso Teto',
    badge: '',
    bg: 'from-[#FFF5E8] to-[#FFE4C0]',
    accent: '#F7941D',
    desc: '24.000–60.000 BTU · Instalação flexível',
  },
  {
    id: 'cassete',
    label: 'Cassete',
    badge: '',
    bg: 'from-[#EEF0FC] to-[#A9B1EF]',
    accent: '#5462DF',
    desc: '18.000–60.000 BTU · Distribuição uniforme',
  },
  {
    id: 'splitao',
    label: 'Splitão',
    badge: 'Industrial',
    bg: 'from-[#EEF0FC] to-[#7E89E7]',
    accent: '#2E3192',
    desc: '36.000–60.000 BTU · Alta capacidade',
  },
]

export const PRODUCTS: Record<string, Product[]> = {
  'hi-wall': [
    { id: 'hw1', name: 'Split Hi-Wall Inverter 9000', brand: 'Electrolux', btu: '9.000', type: 'Residencial', use: 'Quartos e salas pequenas até 15m²', energy: 'A', categoryId: 'hi-wall' },
    { id: 'hw2', name: 'Split Hi-Wall Inverter 12000', brand: 'Daikin', btu: '12.000', type: 'Residencial', use: 'Salas até 20m² e quartos médios', energy: 'A', categoryId: 'hi-wall' },
    { id: 'hw3', name: 'Split Hi-Wall Inverter 18000', brand: 'Samsung', btu: '18.000', type: 'Residencial/Comercial', use: 'Salas até 28m² e ambientes médios', energy: 'A', categoryId: 'hi-wall' },
    { id: 'hw4', name: 'Split Hi-Wall Inverter 24000', brand: 'Midea', btu: '24.000', type: 'Residencial/Comercial', use: 'Salas grandes e ambientes comerciais', energy: 'A', categoryId: 'hi-wall' },
    { id: 'hw5', name: 'Split Hi-Wall Inverter 30000', brand: 'LG', btu: '30.000', type: 'Comercial', use: 'Escritórios e lojas de médio porte', energy: 'A', categoryId: 'hi-wall' },
  ],
  'mini-vrf': [
    { id: 'mvrf1', name: 'Mini VRF 3TR', brand: 'Samsung', btu: '36.000', type: 'Comercial', use: 'Escritórios e pequenas lojas', energy: 'A', categoryId: 'mini-vrf' },
    { id: 'mvrf2', name: 'Mini VRF 4TR', brand: 'LG', btu: '48.000', type: 'Comercial', use: 'Lojas e clínicas de médio porte', energy: 'A', categoryId: 'mini-vrf' },
    { id: 'mvrf3', name: 'Mini VRF 5TR', brand: 'Daikin', btu: '60.000', type: 'Comercial', use: 'Restaurantes e academias', energy: 'A', categoryId: 'mini-vrf' },
  ],
  'piso-teto': [
    { id: 'pt1', name: 'Piso Teto 24000', brand: 'Carrier', btu: '24.000', type: 'Comercial', use: 'Lojas, salas de reunião', energy: 'A', categoryId: 'piso-teto' },
    { id: 'pt2', name: 'Piso Teto 36000', brand: 'Midea', btu: '36.000', type: 'Comercial', use: 'Restaurantes e showrooms', energy: 'A', categoryId: 'piso-teto' },
    { id: 'pt3', name: 'Piso Teto 48000', brand: 'LG', btu: '48.000', type: 'Comercial/Industrial', use: 'Galpões e grandes lojas', energy: 'A', categoryId: 'piso-teto' },
    { id: 'pt4', name: 'Piso Teto 60000', brand: 'Daikin', btu: '60.000', type: 'Industrial', use: 'Armazéns e espaços industriais', energy: 'A', categoryId: 'piso-teto' },
  ],
  'cassete': [
    { id: 'cas1', name: 'Cassete 4 Vias 18000', brand: 'Daikin', btu: '18.000', type: 'Comercial', use: 'Escritórios e salas de reunião', energy: 'A', categoryId: 'cassete' },
    { id: 'cas2', name: 'Cassete 4 Vias 24000', brand: 'Carrier', btu: '24.000', type: 'Comercial', use: 'Salas comerciais e lojas', energy: 'A', categoryId: 'cassete' },
    { id: 'cas3', name: 'Cassete 4 Vias 36000', brand: 'Mitsubishi', btu: '36.000', type: 'Comercial', use: 'Grandes salas e halls', energy: 'A', categoryId: 'cassete' },
    { id: 'cas4', name: 'Cassete 4 Vias 60000', brand: 'Samsung', btu: '60.000', type: 'Industrial', use: 'Supermercados e galpões', energy: 'A', categoryId: 'cassete' },
  ],
  'splitao': [
    { id: 'sp1', name: 'Splitão 36000', brand: 'Electrolux', btu: '36.000', type: 'Comercial/Industrial', use: 'Oficinas e pequenos galpões', energy: 'B', categoryId: 'splitao' },
    { id: 'sp2', name: 'Splitão 48000', brand: 'Samsung', btu: '48.000', type: 'Industrial', use: 'Galpões e fábricas', energy: 'B', categoryId: 'splitao' },
    { id: 'sp3', name: 'Splitão 60000', brand: 'LG', btu: '60.000', type: 'Industrial', use: 'Grandes instalações industriais', energy: 'B', categoryId: 'splitao' },
  ],
}
