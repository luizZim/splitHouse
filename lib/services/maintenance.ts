import { z } from 'zod'
import { BRAND_OPTIONS, CAPACITY_OPTIONS, EQUIPMENT_TYPE_OPTIONS, labelOf, lowerUnknown } from './options'

export const SYMPTOMS = [
  { value: 'limpeza', label: 'Limpeza / higienização preventiva', causes: [] },
  { value: 'nao-gela', label: 'Não gela ou gela pouco', causes: ['Falta de gás (vazamento)', 'Capacitor', 'Filtros ou serpentina sujos'] },
  { value: 'vazando', label: 'Vazando água', causes: ['Dreno entupido', 'Instalação fora de nível', 'Filtros ou serpentina sujos'] },
  { value: 'barulho', label: 'Barulho ou vibração', causes: ['Fixação ou suporte solto', 'Ventilador sujo ou desbalanceado', 'Compressor'] },
  { value: 'mau-cheiro', label: 'Mau cheiro', causes: ['Fungos e bactérias (higienização)', 'Dreno entupido'] },
  { value: 'nao-liga', label: 'Não liga, pisca luz ou mostra código de erro', causes: ['Placa eletrônica', 'Sensor', 'Capacitor', 'Alimentação elétrica'] },
  { value: 'desliga', label: 'Liga e desliga sozinho', causes: ['Sensor de temperatura', 'Capacitor', 'Falta de gás (vazamento)'] },
  { value: 'gelo', label: 'Gelo na tubulação ou na serpentina', causes: ['Falta de gás (vazamento)', 'Filtros ou serpentina sujos'] },
  { value: 'outro', label: 'Outro problema', causes: [] },
] as const

export type SymptomId = (typeof SYMPTOMS)[number]['value']
const SYMPTOM_IDS = SYMPTOMS.map((s) => s.value) as [SymptomId, ...SymptomId[]]

export const QUANTITY_OPTIONS = ['1', '2', '3', '4+'].map((v) => ({ value: v, label: v }))

export const INVERTER_OPTIONS = [
  { value: 'sim', label: 'Sim' },
  { value: 'nao', label: 'Não' },
  { value: 'nao-sei', label: 'Não sei' },
] as const

export const ACCESS_OPTIONS = [
  { value: 'facil', label: 'Fácil acesso' },
  { value: 'escada', label: 'Precisa de escada' },
  { value: 'fachada', label: 'Na fachada (precisa de cadeirinha/andaime)' },
] as const

export function isCorrective(symptoms: readonly string[]): boolean {
  return symptoms.some((s) => s !== 'limpeza')
}

export interface MaintenanceInfo {
  symptoms: SymptomId[]
  otherDescription?: string
  errorCode?: string
  quantity: '1' | '2' | '3' | '4+'
  equipmentType: 'hi-wall' | 'piso-teto' | 'cassete' | 'nao-sei'
  capacity: string
  brand?: string
  inverter?: 'sim' | 'nao' | 'nao-sei'
  access: 'facil' | 'escada' | 'fachada'
}

// Campos tolerantes a vazio (radio sem marcar = null, select = ""): todas as
// obrigatoriedades ficam no superRefine para que os erros apareçam juntos.
const optionalEnum = <T extends [string, ...string[]]>(values: T) => z.enum(values).nullable().optional()

export const maintenanceSchema = z
  .object({
    symptoms: z.preprocess((v) => (Array.isArray(v) ? v : []), z.array(z.enum(SYMPTOM_IDS))),
    otherDescription: z.string().trim().optional(),
    errorCode: z.string().trim().optional(),
    quantity: optionalEnum(['1', '2', '3', '4+']),
    equipmentType: optionalEnum(['hi-wall', 'piso-teto', 'cassete', 'nao-sei']),
    capacity: z.string().nullable().optional(),
    brand: z.string().nullable().optional(),
    inverter: optionalEnum(['sim', 'nao', 'nao-sei']),
    access: optionalEnum(['facil', 'escada', 'fachada']),
  })
  .superRefine((d, ctx) => {
    const require = (ok: unknown, path: string, message: string) => {
      if (!ok) ctx.addIssue({ code: 'custom', path: [path], message })
    }
    require(d.symptoms.length, 'symptoms', 'Selecione pelo menos um item')
    if (d.symptoms.includes('outro')) require(d.otherDescription, 'otherDescription', 'Descreva o que o aparelho apresenta')
    require(d.equipmentType, 'equipmentType', 'Selecione o tipo')
    require(d.capacity, 'capacity', 'Selecione a capacidade')
    if (isCorrective(d.symptoms)) {
      require(d.brand, 'brand', 'Selecione a marca')
      require(d.inverter, 'inverter', 'Informe se é inverter')
    }
    require(d.access, 'access', 'Informe o acesso à condensadora')
  })
  .transform((d) => ({ ...d, quantity: d.quantity ?? '1' }) as MaintenanceInfo)

export function buildMaintenanceMessage(d: MaintenanceInfo): string {
  const selected = SYMPTOMS.filter((s) => d.symptoms.includes(s.value))
  const causes = [...new Set(selected.flatMap((s) => s.causes))]

  const lines = ['Olá! Preciso de *manutenção* no ar-condicionado.', '', '*O que está acontecendo*']
  for (const s of selected) {
    lines.push(s.value === 'outro' ? `• Outro: ${d.otherDescription}` : `• ${s.label}`)
  }
  if (d.symptoms.includes('nao-liga') && d.errorCode) lines.push(`• Código de erro: ${d.errorCode}`)
  if (causes.length) lines.push('', `*Possíveis causas para avaliação*: ${causes.join(', ')}`)

  lines.push(
    '',
    '*Aparelho*',
    `• Quantidade: ${d.quantity} · Tipo: ${lowerUnknown(labelOf(EQUIPMENT_TYPE_OPTIONS, d.equipmentType))} · Capacidade: ${lowerUnknown(
      labelOf(CAPACITY_OPTIONS, d.capacity)
    )}`
  )
  if (isCorrective(d.symptoms) && d.brand && d.inverter) {
    lines.push(
      `• Marca: ${lowerUnknown(labelOf(BRAND_OPTIONS, d.brand))} · Inverter: ${lowerUnknown(labelOf(INVERTER_OPTIONS, d.inverter))}`
    )
  }
  lines.push(`• Condensadora: ${labelOf(ACCESS_OPTIONS, d.access)}`)
  return lines.join('\n')
}
