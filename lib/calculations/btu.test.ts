import { describe, it, expect } from 'vitest'
import { calcBTU } from './btu'
import type { BTUFormData } from '@/types'

function calc(over: Partial<BTUFormData>) {
  return calcBTU({ area: 20, altura: 2.7, sol: 'nao', calor: [], ...over })
}

describe('calcBTU — cenários aprovados (margem 25% sobre a área das marcas)', () => {
  it.each([
    ['quarto 12 m² sem sol', { area: 12 }, 9000],
    ['quarto 18 m² sem sol', { area: 18 }, 9000],
    ['quarto 20 m² sol tarde', { area: 20, sol: 'tarde' }, 12000],
    ['quarto 20 m² sol o dia todo', { area: 20, sol: 'dia-todo' }, 12000],
    ['quarto 20 m² sol tarde + vidros', { area: 20, sol: 'tarde', calor: ['vidros'] }, 12000],
    ['cozinha 15 m² fogão + sol tarde', { area: 15, sol: 'tarde', calor: ['fogao'] }, 12000],
    ['sala 25 m² sol tarde', { area: 25, sol: 'tarde' }, 18000],
    ['sala 35 m² sol tarde + vidros', { area: 35, sol: 'tarde', calor: ['vidros'] }, 24000],
    ['salão 60 m² sol tarde + churrasqueira', { area: 60, sol: 'tarde', calor: ['churrasqueira'] }, 48000],
  ] as const)('%s → %i BTU', (_, over, expected) => {
    const r = calc(over as Partial<BTUFormData>)
    expect(r.btu).toBe(expected)
    expect(r.exceedsMax).toBe(false)
  })

  it('TV/notebook comuns não somam: quarto 20 m² sem fontes de calor fica em 12k', () => {
    expect(calc({ area: 20 }).btu).toBe(12000)
  })

  it('acima de 125 m² efetivos indica que passa de 60.000 BTU', () => {
    const r = calc({ area: 200 })
    expect(r.exceedsMax).toBe(true)
    expect(r.btu).toBeNull()
  })

  it('pé-direito acima de 3,5 m aplica ×1,3', () => {
    const r = calc({ area: 20, altura: 3.6 })
    expect(r.effectiveArea).toBeCloseTo(26)
    expect(r.btu).toBe(18000)
    expect(r.adjustments).toContainEqual({ label: 'Pé-direito alto', pct: 30 })
  })

  it('soma de adicionais é limitada a +50%', () => {
    const r = calc({ area: 20, sol: 'dia-todo', calor: ['fogao', 'churrasqueira', 'eletronicos', 'vidros', 'pessoas'] })
    expect(r.effectiveArea).toBeCloseTo(30)
  })

  it('lista os adicionais aplicados', () => {
    const r = calc({ area: 15, sol: 'tarde', calor: ['fogao'] })
    expect(r.adjustments).toEqual([
      { label: 'Sol à tarde', pct: 10 },
      { label: 'Fogão / forno', pct: 15 },
    ])
    expect(r.effectiveArea).toBeCloseTo(18.75)
  })
})
