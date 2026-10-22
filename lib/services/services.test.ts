import { describe, it, expect } from 'vitest'
import { installServiceSchema, buildInstallServiceMessage } from './installService'
import { maintenanceSchema, buildMaintenanceMessage, isCorrective } from './maintenance'
import { solarCleaningSchema, buildSolarCleaningMessage } from './solarCleaning'

function errorsOf(schema: { safeParse: (v: unknown) => any }, input: unknown): Record<string, string> {
  const r = schema.safeParse(input)
  if (r.success) return {}
  return Object.fromEntries(r.error.issues.map((i: any) => [i.path.join('.'), i.message]))
}

const install = { property: 'casa', room: 'quarto', heatAppliances: false, manyWindows: true } as const

describe('instalação (serviço)', () => {
  it('exige saber se já tem o aparelho, além dos dados do local', () => {
    const e = errorsOf(installServiceSchema, { equipmentType: 'hi-wall', capacity: '12000' })
    expect(e.hasEquipment).toBe('Informe se já tem o aparelho')
    expect(e.property).toBe('Selecione o tipo de imóvel')
  })

  it('monta a mensagem com aparelho e local', () => {
    const data = installServiceSchema.parse({ ...install, hasEquipment: 'sim', equipmentType: 'hi-wall', capacity: '12000' })
    expect(buildInstallServiceMessage(data)).toBe(
      [
        'Olá! Gostaria de um orçamento de *instalação*.',
        '',
        '*Aparelho*',
        '• Já tenho o aparelho',
        '• Tipo: Split Hi-Wall · Capacidade: 12.000 BTU',
        '',
        '*Local da instalação*',
        '• Imóvel: Casa térrea (parede com parede)',
        '• Local: Quarto',
        '• Muitos eletrodomésticos que geram calor: Não',
        '• Muitos vidros/sol direto: Sim',
      ].join('\n')
    )
  })

  it('sem aparelho e sem saber a capacidade', () => {
    const data = installServiceSchema.parse({ ...install, hasEquipment: 'nao', equipmentType: 'nao-sei', capacity: 'nao-sei' })
    const msg = buildInstallServiceMessage(data)
    expect(msg).toContain('• Ainda não tenho o aparelho (quero indicação)')
    expect(msg).toContain('• Tipo: não sei · Capacidade: não sei')
  })
})

const device = { quantity: '1', equipmentType: 'hi-wall', capacity: '12000', access: 'facil' } as const

describe('manutenção', () => {
  it('exige ao menos um sintoma', () => {
    expect(errorsOf(maintenanceSchema, { ...device, symptoms: [] }).symptoms).toBe('Selecione pelo menos um item')
  })

  it('"Outro" exige descrição', () => {
    expect(errorsOf(maintenanceSchema, { ...device, symptoms: ['outro'], otherDescription: ' ' }).otherDescription).toBe(
      'Descreva o que o aparelho apresenta'
    )
  })

  it('marca e inverter só são exigidos em problema corretivo', () => {
    expect(maintenanceSchema.safeParse({ ...device, symptoms: ['limpeza'] }).success).toBe(true)
    const e = errorsOf(maintenanceSchema, { ...device, symptoms: ['nao-gela'] })
    expect(e.brand).toBe('Selecione a marca')
    expect(e.inverter).toBe('Informe se é inverter')
    expect(isCorrective(['limpeza'])).toBe(false)
    expect(isCorrective(['limpeza', 'vazando'])).toBe(true)
  })

  it('formulário em branco com sintoma corretivo mostra todos os erros de uma vez', () => {
    const e = errorsOf(maintenanceSchema, {
      symptoms: ['nao-gela'],
      quantity: '1',
      equipmentType: null,
      capacity: '',
      brand: '',
      inverter: null,
      access: null,
    })
    expect(Object.keys(e).sort()).toEqual(['access', 'brand', 'capacity', 'equipmentType', 'inverter'])
  })

  it('placa solar em telhado sem tipo de telhado e sem última limpeza mostra os dois erros', () => {
    const e = errorsOf(solarCleaningSchema, { panels: '5', location: 'telhado-alto', roof: null, lastCleaning: null, city: 'Cascavel' })
    expect(Object.keys(e).sort()).toEqual(['lastCleaning', 'roof'])
  })

  it('campos vazios do formulário (radio null, select "") geram mensagens em português', () => {
    const e = errorsOf(maintenanceSchema, { ...device, symptoms: ['nao-gela'], brand: '', inverter: null })
    expect(e.brand).toBe('Selecione a marca')
    expect(e.inverter).toBe('Informe se é inverter')
    const s = errorsOf(solarCleaningSchema, { panels: '5', location: 'telhado-alto', roof: null, lastCleaning: 'nunca', city: 'Cascavel' })
    expect(s.roof).toBe('Selecione o tipo de telhado')
  })

  it('mensagem lista sintomas, causas sem repetição e dados do aparelho', () => {
    const data = maintenanceSchema.parse({
      ...device,
      symptoms: ['nao-gela', 'gelo'],
      brand: 'lg',
      inverter: 'sim',
    })
    const msg = buildMaintenanceMessage(data)
    expect(msg).toContain('• Não gela ou gela pouco')
    expect(msg).toContain('• Gelo na tubulação ou na serpentina')
    expect(msg).toContain('*Possíveis causas para avaliação*: Falta de gás (vazamento), Capacitor, Filtros ou serpentina sujos')
    expect(msg.match(/Falta de gás/g)).toHaveLength(1)
    expect(msg).toContain('• Quantidade: 1 · Tipo: Split Hi-Wall · Capacidade: 12.000 BTU')
    expect(msg).toContain('• Marca: LG · Inverter: Sim')
    expect(msg).toContain('• Condensadora: Fácil acesso')
  })

  it('preventiva não mostra marca/inverter nem causas', () => {
    const msg = buildMaintenanceMessage(maintenanceSchema.parse({ ...device, symptoms: ['limpeza'], quantity: '3' }))
    expect(msg).toContain('• Limpeza / higienização preventiva')
    expect(msg).not.toContain('Possíveis causas')
    expect(msg).not.toContain('Marca')
    expect(msg).toContain('• Quantidade: 3')
  })

  it('inclui "Outro" e código de erro quando informados', () => {
    const msg = buildMaintenanceMessage(
      maintenanceSchema.parse({
        ...device,
        symptoms: ['nao-liga', 'outro'],
        otherDescription: 'Controle não responde',
        errorCode: 'E5',
        brand: 'nao-sei',
        inverter: 'nao-sei',
      })
    )
    expect(msg).toContain('• Outro: Controle não responde')
    expect(msg).toContain('• Código de erro: E5')
    expect(msg).toContain('• Marca: não sei · Inverter: não sei')
  })
})

describe('limpeza de placa solar', () => {
  const base = { panels: '20', location: 'laje', lastCleaning: 'nunca', city: 'Cascavel' } as const

  it('valida quantidade de placas', () => {
    expect(errorsOf(solarCleaningSchema, { ...base, panels: '0' }).panels).toBe('Informe a quantidade de placas')
    expect(errorsOf(solarCleaningSchema, { ...base, panels: 'abc' }).panels).toBe('Informe a quantidade de placas')
  })

  it('tipo de telhado só é exigido quando está em telhado', () => {
    expect(solarCleaningSchema.safeParse(base).success).toBe(true)
    expect(errorsOf(solarCleaningSchema, { ...base, location: 'telhado-terreo' }).roof).toBe('Selecione o tipo de telhado')
  })

  it('monta a mensagem', () => {
    const data = solarCleaningSchema.parse({ ...base, location: 'telhado-terreo', roof: 'ceramica' })
    expect(buildSolarCleaningMessage(data)).toBe(
      [
        'Olá! Gostaria de um orçamento de *limpeza de placas solares*.',
        '',
        '• Quantidade de placas: 20',
        '• Onde estão: Telhado de casa térrea',
        '• Tipo de telhado: Cerâmica',
        '• Última limpeza: Nunca foi limpa',
        '• Cidade: Cascavel',
      ].join('\n')
    )
  })
})
