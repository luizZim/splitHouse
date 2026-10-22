import type { Brand, BrandId, ProductLine, ProductType } from '@/lib/catalog/types'

export const BRANDS: Brand[] = [
  { id: 'gree', name: 'Gree' },
  { id: 'midea', name: 'Midea' },
  { id: 'lg', name: 'LG' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'elgin', name: 'Elgin' },
  { id: 'daikin', name: 'Daikin' },
]

export const PRODUCT_TYPES: ProductType[] = [
  {
    id: 'hi-wall',
    label: 'Split Hi-Wall',
    badge: 'Mais vendido',
    accent: '#2E3192',
    bg: 'from-[#EEF0FC] to-[#D4D8F7]',
    summary:
      'O modelo mais comum: unidade interna fixada no alto da parede, silenciosa e econômica, ideal para residências e pequenos comércios.',
    idealFor: ['Quartos', 'Salas', 'Escritórios pequenos', 'Consultórios'],
    installation:
      'Unidade interna na parede e condensadora externa, ligadas por tubulação de cobre. Em casas térreas costuma ser parede com parede; em apartamentos pode exigir acesso pela fachada.',
  },
  {
    id: 'piso-teto',
    label: 'Piso Teto',
    accent: '#F7941D',
    bg: 'from-[#FFF5E8] to-[#FFE4C0]',
    summary:
      'Unidade robusta instalada no teto ou na parte baixa da parede, com jato de ar de longo alcance para ambientes amplos.',
    idealFor: ['Lojas', 'Restaurantes', 'Salões e igrejas', 'Salas comerciais'],
    installation:
      'Fixada no teto ou na parede próxima ao piso, sem necessidade de forro. Exige ponto de dreno e circuito elétrico dedicado.',
  },
  {
    id: 'cassete',
    label: 'Cassete',
    accent: '#5462DF',
    bg: 'from-[#EEF0FC] to-[#A9B1EF]',
    summary:
      'Embutido no forro, distribui o ar em até 4 direções de forma uniforme e discreta — só a grelha fica aparente.',
    idealFor: ['Escritórios', 'Clínicas', 'Lojas com forro', 'Salas de reunião'],
    installation:
      'Embutido em forro (gesso ou modular) com espaço livre acima. Usa bomba de dreno e exige planejamento do forro.',
  },
  {
    id: 'mini-vrf',
    label: 'Mini VRF',
    badge: 'Comercial',
    accent: '#29ABE2',
    bg: 'from-[#E8F7FD] to-[#C3EAFB]',
    summary:
      'Uma única condensadora atende vários ambientes, cada um com controle independente — mais economia e menos equipamentos na fachada.',
    idealFor: ['Escritórios com várias salas', 'Clínicas', 'Casas de alto padrão', 'Pequenos edifícios'],
    installation:
      'Projeto dimensionado por técnico: uma condensadora externa ligada a várias evaporadoras (hi-wall, cassete ou dutada).',
  },
  {
    id: 'splitao',
    label: 'Splitão',
    badge: 'Industrial',
    accent: '#2E3192',
    bg: 'from-[#EEF0FC] to-[#7E89E7]',
    summary:
      'Sistema de alta capacidade com distribuição por dutos, para grandes áreas que precisam de climatização central.',
    idealFor: ['Galpões', 'Supermercados', 'Auditórios', 'Indústrias'],
    installation:
      'Instalado com rede de dutos e área técnica ou casa de máquinas; requer projeto e visita técnica.',
  },
]

// Dados das páginas oficiais dos fabricantes (Brasil), consultadas em 10/2026.
// Campos não publicados pelo fabricante ficam ausentes e não são exibidos.
export const PRODUCT_LINES: ProductLine[] = [
  // ── Split Hi-Wall ─────────────────────────────────────────────
  {
    type: 'hi-wall',
    brand: 'gree',
    name: 'G-Top Auto Inverter',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Conectividade inteligente com Wi-Fi e Bluetooth',
      'Auto Fast Cooling: resfriamento instantâneo',
      'Qualidade do ar com Multi Filtro e Auto Clean',
      'Conforto térmico até 45% mais rápido que splits convencionais',
    ],
    source: 'https://gree.com.br/produto/g-top-auto-inverter/',
    variants: [
      { btu: 9000, model: 'GWC09ATB-D6DNA1A', energyLabel: 'A' },
      { btu: 12000, model: 'GWC12ATC-D6DNA1B', energyLabel: 'A' },
      { btu: 18000, model: 'GWC18ATD-D6DNA1A', energyLabel: 'A' },
      { btu: 24000, model: 'GWC24ATE-D6DNA1A', energyLabel: 'A' },
      { btu: 30000, model: 'GWC30ATEXF-S6DNA1A', energyLabel: 'A' },
    ],
  },
  {
    type: 'hi-wall',
    brand: 'midea',
    name: 'AI Ecomaster',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Economia de energia extra de 30% com AI Ecomaster',
      'Controle de umidade por Inteligência Artificial',
      'Comando de voz via Alexa, Google Assistente e Siri',
    ],
    source: 'https://www.midea.com.br/ar-condicionado-split-12000-btus-inverter-ai-ecomaster-frio-midea/p',
    variants: [
      { btu: 9000, model: '42EZVCA09M5 / 38EZVCA09M5', voltage: '220V', energyLabel: 'A' },
      { btu: 12000, model: '42EZVCA12M5 / 38EZVCA12M5', voltage: '220V', energyLabel: 'A' },
      { btu: 18000, model: '42EZVCA18M5 / 38EZVCA18M5', voltage: '220V', energyLabel: 'A' },
      { btu: 24000, model: '42EZVCA24M5 / 38EZVCA24M5', voltage: '220V', energyLabel: 'A' },
    ],
  },
  {
    type: 'hi-wall',
    brand: 'lg',
    name: 'AI Dual Inverter Voice',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Compressor Dual Inverter: até 70% de economia de energia',
      'IA aprende seus hábitos e ajusta temperatura e ventilação',
      'Wi-Fi integrado, compatível com LG ThinQ, Google Assistente e Alexa',
      'Controle de Energia 4 em 1',
    ],
    source: 'https://www.lg.com/br/ar-condicionado-residencial/dual-inverter-split/s3-w12ja31a-1/',
    variants: [
      { btu: 9000, model: 'S3-W09AA31D', voltage: '220V', energyLabel: 'A', noiseDb: 22 },
      { btu: 12000, model: 'S3-W12JA31A', voltage: '220V', energyLabel: 'A', noiseDb: 22 },
      { btu: 18000, model: 'S3-W18KL31A', voltage: '220V', noiseDb: 32 },
      { btu: 24000, model: 'S3-W24K231A', voltage: '220V', noiseDb: 32 },
    ],
  },
  {
    type: 'hi-wall',
    brand: 'samsung',
    name: 'WindFree AI',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Modo WindFree™: refresca sem vento direto no corpo',
      'Filtro antibacteriano',
      'Até 77% de economia de energia',
      'Instalação 45% mais rápida',
    ],
    source:
      'https://www.samsung.com/br/air-conditioners/wall-mount/kit-air-conditioner-split-inverter-windfree-connect-ai-9000-btus-cold-white-220v-f-ar09dyfaawk/',
    variants: [
      { btu: 9000, model: 'F-AR09DYFAAWK', voltage: '220V', energyLabel: 'B', noiseDb: 21 },
      { btu: 12000, model: 'F-AR12DYFAAWK', voltage: '220V', energyLabel: 'B', noiseDb: 21 },
      { btu: 18000, model: 'F-AR18DYFAAWK', voltage: '220V', energyLabel: 'A', noiseDb: 25 },
      { btu: 24000, model: 'F-AR24DYFAAWK', voltage: '220V', energyLabel: 'A', noiseDb: 28 },
    ],
  },
  {
    type: 'hi-wall',
    brand: 'elgin',
    name: 'Eco Inverter Pro',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Classificação energética A',
      'Wi-Fi integrado para controle pelo app Elgin Smart',
      'Compatível com Amazon Alexa e Google Assistente',
      'Filtro de nylon + sistema de filtragem 4 em 1',
    ],
    source: 'https://www.elgin.com.br/ar-condicionado-split-high-wall-eco-inverter-pro-12000-btus-frio-wifi-220v/p',
    variants: [
      { btu: 9000, model: '45HDFC09C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 12000, model: '45HDFC12C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 18000, model: '45HDFC18C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 24000, model: '45HDFC24C2WACA', voltage: '220V', energyLabel: 'A' },
    ],
  },
  {
    type: 'hi-wall',
    brand: 'daikin',
    name: 'Split Hi Wall Full Inverter',
    inverter: true,
    refrigerant: 'R-32',
    highlights: [
      '100% inverter: compressor, válvula de expansão e motor do ventilador',
      'Dupla filtragem com ação antimicrobiana de íons de prata',
      'Flecha de ar de longo alcance',
      'Aletas Blue Fin e pintura eletrostática contra corrosão',
    ],
    source: 'https://www.daikin.com.br/produto/split-hi-wall-full-inverter',
    variants: [
      { btu: 9000, model: 'FTKC09T5VL' },
      { btu: 12000 },
      { btu: 18000 },
      { btu: 24000, model: 'FTKC24T5VL' },
    ],
  },

  // ── Piso Teto ─────────────────────────────────────────────────
  {
    type: 'piso-teto',
    brand: 'gree',
    name: 'G-Prime Inverter Compact',
    inverter: true,
    refrigerant: 'R-32',
    highlights: [
      'Eficiência e economia com tecnologia 100% Inverter',
      'Maior flecha de ar da categoria: 17 m',
      'Refrigeração 20% mais rápida',
      'Proteção durável com aletas GoldenFin',
    ],
    source: 'https://gree.com.br/produto/g-prime-inverter-compact-piso-teto/',
    variants: [
      { btu: 36000, model: 'GULD36ZD1/A-S', voltage: '220V', energyLabel: 'A' },
      { btu: 57000, model: 'GULD57ZD1/A-S', voltage: '220V', energyLabel: 'A' },
    ],
  },
  {
    type: 'piso-teto',
    brand: 'midea',
    name: 'Split Teto Inverter',
    inverter: true,
    refrigerant: 'R-32',
    highlights: [
      'Climatização de longo alcance: até 15 metros',
      'Controle por aplicativo, comando de voz e programação inteligente',
      'Alta durabilidade Prime Guard com Gold Fin',
    ],
    source: 'https://www.midea.com.br/ar-condicionado-split-teto-36000-btu-inverter-frio-midea/p',
    variants: [
      { btu: 36000, model: '42ZQVF36M5C / 38CCVF36515MM', voltage: '220V', energyLabel: 'C' },
      { btu: 60000, model: '42ZQVF60M5C / 38CCVF60515MM', voltage: '220V', energyLabel: 'C' },
    ],
  },
  {
    type: 'piso-teto',
    brand: 'elgin',
    name: 'Inverter Wi-Fi PX',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Conectividade Wi-Fi integrada',
      'Classificação energética A',
      'Gás ecológico R-32',
      'Serpentinas de cobre e aletas azuis',
    ],
    source: 'https://www.elgin.com.br/ar-condicionado/ar-condicionado-piso-teto',
    variants: [
      { btu: 24000, model: '45PXFC24C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 36000, model: '45PXFC36C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 48000, model: '45PXFC48C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 56000, model: '45PXFC60C2WACA', voltage: '220V', energyLabel: 'A' },
    ],
  },

  // ── Cassete ───────────────────────────────────────────────────
  {
    type: 'cassete',
    brand: 'gree',
    name: 'G-Prime Inverter Compact',
    inverter: true,
    refrigerant: 'R-32',
    wifi: false,
    highlights: [
      'Climatização 360° com 8 saídas de ar',
      'Eficiência máxima com tecnologia 100% Inverter',
      'Proteção contra corrosão com aletas GoldenFin',
      'Resfriamento 20% mais rápido',
    ],
    source: 'https://gree.com.br/produto/g-prime-inverter-compact-cassete/',
    variants: [
      { btu: 24000, model: 'GULD24T1/A-S', voltage: '220V', energyLabel: 'A' },
      { btu: 36000, model: 'GULD36T1/A-S', voltage: '220V', energyLabel: 'A' },
      { btu: 56000, model: 'GULD56T1/A-S', voltage: '220V', energyLabel: 'A' },
    ],
  },
  {
    type: 'cassete',
    brand: 'midea',
    name: 'Split Cassete Inverter 4 Vias',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Distribuição uniforme em 4 vias',
      'Conectividade Wi-Fi nativa',
      'Controle individual das quatro saídas de ar',
      'Economia e sustentabilidade com R-32 + Inverter',
    ],
    source: 'https://www.midea.com.br/ar-condicionado-split-cassete-36-000-btus-inverter-frio-midea-4-vias/p',
    variants: [
      { btu: 24000, model: '40KVQF24M5 / 38TVCF24515MM', voltage: '220V', energyLabel: 'A' },
      { btu: 36000, model: '40KVQE36M5 / 38CCVE36515MM', voltage: '220V', energyLabel: 'A' },
      { btu: 60000, model: '40KVQE60M5 / 38CCVE60515MM', voltage: '220V', energyLabel: 'A' },
    ],
  },
  {
    type: 'cassete',
    brand: 'lg',
    name: 'Cassete Inverter',
    inverter: true,
    refrigerant: 'R-410A',
    highlights: [
      'Design compacto',
      'Operação silenciosa',
      'Controle independente das aletas',
      'Serpentina Black Fin',
    ],
    source: 'https://www.lg.com/br/ar-condicionado-comercial-leve/at-w24gplp1/',
    variants: [
      { btu: 18000, model: 'AT-W18GPLP1', voltage: '220V', energyLabel: 'A', noiseDb: 49 },
      { btu: 24000, model: 'AT-W24GPLP1', voltage: '220V', energyLabel: 'A', noiseDb: 38 },
      { btu: 36000, model: 'AT-W36GNLP1', voltage: '220V', energyLabel: 'A', noiseDb: 40 },
      { btu: 48000, model: 'AT-W48GMLP1', voltage: '220V', energyLabel: 'A', noiseDb: 47 },
    ],
  },
  {
    type: 'cassete',
    brand: 'samsung',
    name: 'WindFree Cassete 4 Vias',
    inverter: true,
    highlights: [
      'Resfriamento sem vento direto',
      'Economia de energia',
      'Menor nível de ruído',
      'Compatível com SmartThings (módulo Wi-Fi vendido separadamente)',
    ],
    source:
      'https://shop.samsung.com/br/ar-condicionado-cassete-4-vias-inverter-samsung-windfree-48000-btus-quente-frio-220v/p',
    variants: [
      { btu: 36000, model: 'F-CAC-AC036DK', voltage: '220V' },
      { btu: 48000, model: 'F-CAC-AC048DK', voltage: '220V' },
    ],
  },
  {
    type: 'cassete',
    brand: 'elgin',
    name: 'Cassete Inverter Wi-Fi KX',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: [
      'Função Brisa Suave',
      'Conectividade Wi-Fi integrada',
      'Classe energética A e gás ecológico R-32',
      'Serpentina de cobre e aletas azuis',
    ],
    source: 'https://www.elgin.com.br/ar-condicionado-cassete-inverter-wi-fi-kx-36000-btuh-frio-220v/p',
    variants: [
      { btu: 24000, model: '45KXFC24C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 36000, model: '45KXFC36C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 48000, model: '45KXFC48C2WACA', voltage: '220V', energyLabel: 'A' },
      { btu: 57000, model: '45KXFC60C2WACA', voltage: '220V', energyLabel: 'A' },
    ],
  },
  {
    type: 'cassete',
    brand: 'daikin',
    name: 'SkyAir R-32 Cassete Round Flow 4 Vias',
    inverter: true,
    refrigerant: 'R-32',
    highlights: [
      'Maior fluxo de ar para mais conforto',
      'Função Teto Alto',
      '5 velocidades de ventilação',
      'Melhor distribuição do fluxo de ar com novo painel',
    ],
    source: 'https://www.daikin.com.br/produto/skyair-r32',
    variants: [{ btu: 30000 }, { btu: 35000 }],
  },

  // ── Mini VRF ──────────────────────────────────────────────────
  {
    type: 'mini-vrf',
    brand: 'gree',
    name: 'GMV Mini',
    inverter: true,
    highlights: [
      'Tamanho reduzido, ideal para residências e pequenos escritórios',
      'Compressores 100% inverter',
      'Proteção anticorrosiva GoldenFin',
    ],
    // capacidades/modelos: catálogo Gree 2025B (p. 39), convertidos de kW
    source: 'https://gree.com.br/produto/gmv-mini-slim/',
    variants: [
      { btu: 27000, model: 'GMV-80WL/C-T(B)', voltage: '220V' },
      { btu: 34000, model: 'GMV-100WL/C-T(B)', voltage: '220V' },
      { btu: 41000, model: 'GMV-121WL/C-T(B)', voltage: '220V' },
      { btu: 48000, model: 'GMV-141WL/C-T', voltage: '220V' },
    ],
  },
  {
    type: 'mini-vrf',
    brand: 'midea',
    name: 'ATOM',
    inverter: true,
    refrigerant: 'R-410A',
    highlights: [
      'O VRF mais fácil de instalar',
      'Uma unidade central atende de 1 a 9 unidades internas',
      'Até 130 m de comprimento total de tubulação',
      'Controle pelo app SmartHome (iOS e Android)',
    ],
    // página oficial Midea Carrier, linkada em midea.com.br/vrf-midea
    source: 'https://carrierdobrasil.com.br/blog/produtos/mini-vrf-atom-midea-carrier',
    variants: [
      { btu: 27000, model: '38ATQA28M5', voltage: '220V' },
      { btu: 34000, model: '38ATQB36M5', voltage: '220V' },
      { btu: 42000, model: '38ATQB42M5', voltage: '220V' },
      { btu: 47000, model: '38ATQA48M5', voltage: '220V' },
      { btu: 52000, model: '38ATQA56M5', voltage: '220V' },
      { btu: 59000, model: '38ATQA60M5', voltage: '220V' },
    ],
  },
  {
    type: 'mini-vrf',
    brand: 'lg',
    name: 'Multi V S',
    inverter: true,
    refrigerant: 'R-410A',
    highlights: [
      'Uma unidade externa climatiza até 20 ambientes',
      'Compressor R1 com 5 anos de garantia',
      'Aletas resistentes à corrosão, ideais para o litoral',
      'Controle à distância pelo aplicativo ThinQ',
    ],
    source: 'https://www.lg.com/br/business/multi-v-s',
    variants: [
      { btu: 41300, voltage: '220V' },
      { btu: 47800, voltage: '220V' },
      { btu: 52900, voltage: '220V' },
      { btu: 76400, model: 'ARUN080BSS0', voltage: '220V trifásico' },
      { btu: 95900, model: 'ARUN100BSS0', voltage: '220V trifásico' },
      { btu: 114700, model: 'ARUN120BSS0', voltage: '220V trifásico' },
    ],
  },
  {
    type: 'mini-vrf',
    brand: 'daikin',
    name: 'VRV S',
    inverter: true,
    refrigerant: 'R-410A',
    highlights: [
      'Alta eficiência sazonal',
      'Gabinete de menor altura (870 mm)',
      'Até 120 m de tubulação',
      'Até 14 evaporadoras em uma única condensadora',
    ],
    source: 'https://www.daikin.com.br/produto/vrv-s-alta-eficiencia-sazonal',
    variants: [
      { btu: 38200, model: 'RSUQ4AVM', voltage: '220V' },
      { btu: 47800, model: 'RSUQ5AVM', voltage: '220V' },
      { btu: 54600, model: 'RSUQ6AVM', voltage: '220V' },
      { btu: 68200, model: 'RSUQ7AYM', voltage: '380V' },
      { btu: 76400, model: 'RSUQ8AYM', voltage: '380V' },
      { btu: 81900, model: 'RSUQ9AYM', voltage: '380V' },
    ],
  },

  // ── Splitão ───────────────────────────────────────────────────
  {
    type: 'splitao',
    brand: 'elgin',
    name: 'Splitão',
    inverter: false,
    refrigerant: 'R-32',
    highlights: [
      'Fluido refrigerante ecológico R-32',
      'Filtro de ar G4',
      'Serpentina de cobre',
      'Instalação na posição vertical ou horizontal',
    ],
    source: 'https://elgin.com.br/ar-condicionado/ar-condicionado-splitao',
    variants: [
      { btu: 90000, model: '45SAFC090C3CVA', voltage: '220V trifásico' }, // 7,5 TR
      { btu: 120000, model: '45SAFC120C3CVA', voltage: '220V trifásico' }, // 10 TR
      { btu: 180000, model: '45SAFC180C3CVA', voltage: '220V trifásico' }, // 15 TR
      { btu: 240000, model: '45SAFC240C3CVA', voltage: '220V trifásico' }, // 20 TR
    ],
  },
]

export function getType(id: string): ProductType | undefined {
  return PRODUCT_TYPES.find((t) => t.id === id)
}

export function linesForType(id: string): ProductLine[] {
  return PRODUCT_LINES.filter((l) => l.type === id)
}

export function getBrand(id: BrandId): Brand {
  return BRANDS.find((b) => b.id === id)!
}
