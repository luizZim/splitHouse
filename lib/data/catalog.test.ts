import { describe, it, expect } from 'vitest'
import { BRAND_IDS, TYPE_IDS } from '@/lib/catalog/types'
import { BRANDS, PRODUCT_LINES, PRODUCT_TYPES, linesForType } from './catalog'

describe('catálogo', () => {
  it('tem as 6 marcas e os 5 tipos', () => {
    expect(BRANDS.map((b) => b.id)).toEqual([...BRAND_IDS])
    expect(PRODUCT_TYPES.map((t) => t.id)).toEqual([...TYPE_IDS])
  })

  it('todo tipo tem ao menos uma linha', () => {
    for (const t of TYPE_IDS) expect(linesForType(t).length, t).toBeGreaterThan(0)
  })

  it('no máximo uma linha por marca por tipo', () => {
    const keys = PRODUCT_LINES.map((l) => `${l.type}/${l.brand}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('linhas válidas: variantes únicas e positivas, fonte https, 1–4 diferenciais', () => {
    for (const l of PRODUCT_LINES) {
      const id = `${l.type}/${l.brand}`
      expect(l.variants.length, id).toBeGreaterThan(0)
      const btus = l.variants.map((v) => v.btu)
      expect(new Set(btus).size, id).toBe(btus.length)
      for (const b of btus) expect(b, id).toBeGreaterThan(0)
      expect(l.source, id).toMatch(/^https:\/\//)
      expect(l.highlights.length, id).toBeGreaterThanOrEqual(1)
      expect(l.highlights.length, id).toBeLessThanOrEqual(4)
    }
  })
})
