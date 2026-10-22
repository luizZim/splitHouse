import { describe, it, expect } from 'vitest'
import { buildSimuladorMessage } from './index'
import { calcBTU } from '@/lib/calculations/btu'
import type { BTUFormData } from '@/types'

describe('buildSimuladorMessage', () => {
  it('ambiente com sol e fontes de calor', () => {
    const form: BTUFormData = { area: 15, altura: 2.7, sol: 'tarde', calor: ['fogao'] }
    expect(buildSimuladorMessage(form, calcBTU(form))).toBe(
      [
        'Olá! Fiz a simulação de BTU no site e gostaria de um orçamento.',
        '',
        '*Ambiente*',
        '• Área: 15 m² · pé-direito 2,7 m',
        '• Sol: Sol à tarde',
        '• Aquece o ambiente: Fogão / forno',
        '',
        '*Resultado*: 12.000 BTU/h (área efetiva considerada: 18,8 m²)',
      ].join('\n')
    )
  })

  it('sem sol e sem fontes de calor', () => {
    const form: BTUFormData = { area: 12, altura: 2.7, sol: 'nao', calor: [] }
    const msg = buildSimuladorMessage(form, calcBTU(form))
    expect(msg).toContain('• Sol: Não recebe sol')
    expect(msg).not.toContain('Aquece o ambiente')
    expect(msg).toContain('*Resultado*: 9.000 BTU/h')
  })

  it('acima de 60.000 BTU pede avaliação técnica', () => {
    const form: BTUFormData = { area: 200, altura: 2.7, sol: 'nao', calor: [] }
    expect(buildSimuladorMessage(form, calcBTU(form))).toContain(
      '*Resultado*: acima de 60.000 BTU/h — preciso de uma avaliação técnica'
    )
  })
})
