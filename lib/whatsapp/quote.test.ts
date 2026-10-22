import { describe, it, expect } from 'vitest'
import { buildQuoteMessage, type QuoteSelection } from './index'

const SEL: QuoteSelection = {
  typeLabel: 'Split Hi-Wall',
  brandName: 'Gree',
  lineName: 'G-Top Inverter',
  btu: 12000,
  model: 'GWC12AGA-D6NNA1A',
  voltage: '220V',
  energyLabel: 'A',
}

describe('buildQuoteMessage', () => {
  it('sem instalação', () => {
    expect(buildQuoteMessage(SEL)).toBe(
      [
        'Olá! Vim pelo site e gostaria de um orçamento:',
        '',
        '*Aparelho*',
        '• Split Hi-Wall — Gree G-Top Inverter',
        '• Capacidade: 12.000 BTU · 220V · Selo A',
        '• Modelo: GWC12AGA-D6NNA1A',
        '',
        '*Instalação*: Não, apenas o aparelho',
      ].join('\n')
    )
  })

  it('com instalação em apartamento', () => {
    const msg = buildQuoteMessage(SEL, {
      property: 'apartamento',
      floor: '8',
      room: 'quarto',
      heatAppliances: false,
      manyWindows: true,
    })
    expect(msg).toContain('*Instalação*: Sim')
    expect(msg).toContain('• Imóvel: Apartamento — 8º andar')
    expect(msg).toContain('• Local: Quarto')
    expect(msg).toContain('• Muitos eletrodomésticos que geram calor: Não')
    expect(msg).toContain('• Muitos vidros/sol direto: Sim')
  })

  it('apartamento no térreo', () => {
    const msg = buildQuoteMessage(SEL, {
      property: 'apartamento', floor: '0', room: 'sala', heatAppliances: false, manyWindows: false,
    })
    expect(msg).toContain('• Imóvel: Apartamento — térreo')
  })

  it('textos livres em "Outro"', () => {
    const msg = buildQuoteMessage(SEL, {
      property: 'outro', propertyOther: 'Sobrado', room: 'outro', roomOther: 'Academia', heatAppliances: true, manyWindows: false,
    })
    expect(msg).toContain('• Imóvel: Outro — Sobrado')
    expect(msg).toContain('• Local: Academia')
    expect(msg).toContain('• Muitos eletrodomésticos que geram calor: Sim')
  })

  it('casa térrea e condomínio usam rótulo', () => {
    const casa = buildQuoteMessage(SEL, { property: 'casa', room: 'cozinha', heatAppliances: true, manyWindows: true })
    expect(casa).toContain('• Imóvel: Casa térrea (parede com parede)')
    expect(casa).toContain('• Local: Cozinha')
    const cond = buildQuoteMessage(SEL, { property: 'condominio', room: 'escritorio', heatAppliances: false, manyWindows: false })
    expect(cond).toContain('• Imóvel: Condomínio')
    expect(cond).toContain('• Local: Escritório')
  })

  it('omite campos opcionais ausentes, sem "undefined"', () => {
    const msg = buildQuoteMessage({ typeLabel: 'Cassete', brandName: 'LG', lineName: 'Cassete Inverter', btu: 36000 })
    expect(msg).toContain('• Capacidade: 36.000 BTU')
    expect(msg).not.toContain('Modelo')
    expect(msg).not.toContain('undefined')
    expect(msg).not.toContain(' · ')
  })
})
