import { describe, it, expect } from 'vitest'
import type { ProductLine } from './types'
import {
  capacitiesFor,
  brandsFor,
  resolveSelection,
  findVariant,
  areaFor,
  formatArea,
  formatBtu,
  visibleCapacities,
  isBeyondLimit,
} from './select'

function line(brand: ProductLine['brand'], btus: number[]): ProductLine {
  return {
    type: 'hi-wall',
    brand,
    name: `Linha ${brand}`,
    inverter: true,
    highlights: [],
    source: 'https://example.com',
    variants: btus.map((btu) => ({ btu })),
  }
}

// LG listada antes de Gree de propósito: ordem deve vir de BRAND_IDS
const LINES = [line('lg', [9000, 12000, 18000]), line('gree', [12000, 18000, 24000])]

describe('capacitiesFor', () => {
  it('une capacidades de todas as marcas, ordenadas e sem duplicatas', () => {
    expect(capacitiesFor(LINES)).toEqual([9000, 12000, 18000, 24000])
  })
})

describe('brandsFor', () => {
  it('retorna marcas que têm a capacidade, na ordem de BRAND_IDS', () => {
    expect(brandsFor(LINES, 12000)).toEqual(['gree', 'lg'])
    expect(brandsFor(LINES, 9000)).toEqual(['lg'])
    expect(brandsFor(LINES, 7000)).toEqual([])
  })
})

describe('resolveSelection', () => {
  it('sem parâmetros: menor capacidade e primeira marca que a possui', () => {
    expect(resolveSelection(LINES)).toEqual({ btu: 9000, brand: 'lg' })
  })

  it('mantém seleção válida', () => {
    expect(resolveSelection(LINES, 18000, 'gree')).toEqual({ btu: 18000, brand: 'gree' })
  })

  it('marca sem a capacidade troca para primeira marca disponível', () => {
    expect(resolveSelection(LINES, 24000, 'lg')).toEqual({ btu: 24000, brand: 'gree' })
  })

  it('capacidade inválida com marca válida usa a menor capacidade da marca', () => {
    expect(resolveSelection(LINES, 5000, 'gree')).toEqual({ btu: 12000, brand: 'gree' })
  })

  it('parâmetros lixo (URL manipulada) caem no padrão', () => {
    expect(resolveSelection(LINES, Number('abc'), 'xyz')).toEqual({ btu: 9000, brand: 'lg' })
  })

  it('tipo com uma única marca funciona', () => {
    const single = [line('daikin', [36000, 48000])]
    expect(resolveSelection(single, 48000, 'gree')).toEqual({ btu: 48000, brand: 'daikin' })
  })
})

describe('findVariant', () => {
  it('encontra linha e variante da seleção', () => {
    const found = findVariant(LINES, { btu: 12000, brand: 'gree' })
    expect(found?.line.brand).toBe('gree')
    expect(found?.variant.btu).toBe(12000)
  })

  it('retorna undefined quando não existe', () => {
    expect(findVariant(LINES, { btu: 9000, brand: 'gree' })).toBeUndefined()
  })
})

describe('areaFor / formatArea', () => {
  it('usa tabela padrão', () => {
    expect(areaFor(9000)).toEqual([0, 15])
    expect(areaFor(12000)).toEqual([15, 20])
    expect(areaFor(24000)).toEqual([30, 40])
    expect(areaFor(60000)).toEqual([80, 100])
  })

  it('capacidade entre faixas usa a faixa menor mais próxima', () => {
    expect(areaFor(22000)).toEqual([30, 40])
    expect(areaFor(9500)).toEqual([0, 15])
  })

  it('acima de 60.000 usa ~600–750 BTU/m²', () => {
    expect(areaFor(96000)).toEqual([128, 160])
  })

  it('override do fabricante prevalece', () => {
    expect(areaFor(12000, [12, 18])).toEqual([12, 18])
  })

  it('formata área', () => {
    expect(formatArea([0, 15])).toBe('até 15 m²')
    expect(formatArea([15, 20])).toBe('15–20 m²')
  })
})

describe('visibleCapacities', () => {
  const MANY = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => n * 10000)

  it('até 5 capacidades: mostra todas, sem botão', () => {
    const caps = MANY.slice(0, 5)
    expect(visibleCapacities(caps, 10000, false)).toEqual({ visible: caps, hiddenCount: 0, collapsible: false })
  })

  it('mais de 5 e recolhido: mostra as 5 primeiras e conta as escondidas', () => {
    expect(visibleCapacities(MANY, 20000, false)).toEqual({
      visible: [10000, 20000, 30000, 40000, 50000],
      hiddenCount: 3,
      collapsible: true,
    })
  })

  it('expandido: mostra todas', () => {
    expect(visibleCapacities(MANY, 20000, true)).toEqual({ visible: MANY, hiddenCount: 0, collapsible: true })
  })

  it('recolhido com a selecionada além das 5: ela continua visível', () => {
    expect(visibleCapacities(MANY, 70000, false)).toEqual({
      visible: [10000, 20000, 30000, 40000, 50000, 70000],
      hiddenCount: 2,
      collapsible: true,
    })
  })
})

describe('isBeyondLimit', () => {
  it('indica se a capacidade ficaria escondida', () => {
    const MANY = [1, 2, 3, 4, 5, 6].map((n) => n * 10000)
    expect(isBeyondLimit(MANY, 50000)).toBe(false)
    expect(isBeyondLimit(MANY, 60000)).toBe(true)
  })
})

describe('formatBtu', () => {
  it('usa separador de milhar pt-BR', () => {
    expect(formatBtu(12000)).toBe('12.000')
    expect(formatBtu(9000)).toBe('9.000')
  })
})
