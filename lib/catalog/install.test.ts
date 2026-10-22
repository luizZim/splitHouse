import { describe, it, expect } from 'vitest'
import { installSchema } from './install'

const base = { heatAppliances: false, manyWindows: false }

function errorsOf(input: unknown): Record<string, string> {
  const r = installSchema.safeParse(input)
  if (r.success) return {}
  return Object.fromEntries(r.error.issues.map((i) => [i.path.join('.'), i.message]))
}

describe('installSchema', () => {
  it('aceita casa + quarto', () => {
    expect(installSchema.safeParse({ ...base, property: 'casa', room: 'quarto' }).success).toBe(true)
  })

  it('exige imóvel e local', () => {
    const e = errorsOf({ ...base })
    expect(e.property).toBe('Selecione o tipo de imóvel')
    expect(e.room).toBe('Selecione o local')
  })

  it('apartamento exige andar numérico', () => {
    expect(errorsOf({ ...base, property: 'apartamento', room: 'sala', floor: '' }).floor).toBe(
      'Informe o andar (somente números)'
    )
    expect(errorsOf({ ...base, property: 'apartamento', room: 'sala', floor: '8º' }).floor).toBe(
      'Informe o andar (somente números)'
    )
    expect(installSchema.safeParse({ ...base, property: 'apartamento', room: 'sala', floor: '8' }).success).toBe(true)
    expect(installSchema.safeParse({ ...base, property: 'apartamento', room: 'sala', floor: '0' }).success).toBe(true)
  })

  it('"Outro" exige descrição (imóvel e local)', () => {
    const e = errorsOf({ ...base, property: 'outro', propertyOther: '  ', room: 'outro', roomOther: '' })
    expect(e.propertyOther).toBe('Descreva o tipo de imóvel')
    expect(e.roomOther).toBe('Descreva o local')
  })
})
