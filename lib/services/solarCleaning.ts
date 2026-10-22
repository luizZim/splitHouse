import { z } from 'zod'
import { labelOf } from './options'

export const SOLAR_LOCATION_OPTIONS = [
  { value: 'telhado-terreo', label: 'Telhado de casa térrea' },
  { value: 'telhado-alto', label: 'Telhado de sobrado ou prédio' },
  { value: 'laje', label: 'Laje' },
  { value: 'solo', label: 'No solo / estrutura' },
] as const

export const ROOF_OPTIONS = [
  { value: 'ceramica', label: 'Cerâmica' },
  { value: 'fibrocimento', label: 'Fibrocimento' },
  { value: 'metalico', label: 'Metálico' },
] as const

export const LAST_CLEANING_OPTIONS = [
  { value: 'nunca', label: 'Nunca foi limpa' },
  { value: '6m', label: 'Menos de 6 meses' },
  { value: '12m', label: 'Entre 6 meses e 1 ano' },
  { value: 'mais-1a', label: 'Mais de 1 ano' },
] as const

export interface SolarCleaningInfo {
  panels: string
  location: 'telhado-terreo' | 'telhado-alto' | 'laje' | 'solo'
  roof?: 'ceramica' | 'fibrocimento' | 'metalico'
  lastCleaning: 'nunca' | '6m' | '12m' | 'mais-1a'
  city: string
}

// Campos tolerantes a vazio; obrigatoriedades no superRefine para os erros aparecerem juntos.
export const solarCleaningSchema = z
  .object({
    panels: z.string().trim().nullable().optional(),
    location: z.enum(['telhado-terreo', 'telhado-alto', 'laje', 'solo']).nullable().optional(),
    roof: z.enum(['ceramica', 'fibrocimento', 'metalico']).nullable().optional(),
    lastCleaning: z.enum(['nunca', '6m', '12m', 'mais-1a']).nullable().optional(),
    city: z.string().trim().nullable().optional(),
  })
  .superRefine((d, ctx) => {
    const require = (ok: unknown, path: string, message: string) => {
      if (!ok) ctx.addIssue({ code: 'custom', path: [path], message })
    }
    require(/^[1-9]\d{0,3}$/.test(d.panels ?? ''), 'panels', 'Informe a quantidade de placas')
    require(d.location, 'location', 'Selecione onde estão as placas')
    if (d.location?.startsWith('telhado')) require(d.roof, 'roof', 'Selecione o tipo de telhado')
    require(d.lastCleaning, 'lastCleaning', 'Selecione a última limpeza')
    require((d.city ?? '').length >= 2, 'city', 'Informe a cidade')
  })
  .transform((d) => d as SolarCleaningInfo)

export function buildSolarCleaningMessage(d: SolarCleaningInfo): string {
  const lines = [
    'Olá! Gostaria de um orçamento de *limpeza de placas solares*.',
    '',
    `• Quantidade de placas: ${d.panels}`,
    `• Onde estão: ${labelOf(SOLAR_LOCATION_OPTIONS, d.location)}`,
  ]
  if (d.location.startsWith('telhado') && d.roof) lines.push(`• Tipo de telhado: ${labelOf(ROOF_OPTIONS, d.roof)}`)
  lines.push(`• Última limpeza: ${labelOf(LAST_CLEANING_OPTIONS, d.lastCleaning)}`, `• Cidade: ${d.city}`)
  return lines.join('\n')
}
