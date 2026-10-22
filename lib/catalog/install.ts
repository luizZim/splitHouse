import { z } from 'zod'

export const PROPERTY_OPTIONS = [
  { value: 'casa', label: 'Casa térrea (parede com parede)' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'condominio', label: 'Condomínio' },
  { value: 'outro', label: 'Outro' },
] as const

export const ROOM_OPTIONS = [
  { value: 'quarto', label: 'Quarto' },
  { value: 'sala', label: 'Sala' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'escritorio', label: 'Escritório' },
  { value: 'outro', label: 'Outro' },
] as const

export const installSchema = z
  .object({
    property: z.enum(['casa', 'apartamento', 'condominio', 'outro'], {
      errorMap: () => ({ message: 'Selecione o tipo de imóvel' }),
    }),
    floor: z.string().trim().optional(),
    propertyOther: z.string().trim().optional(),
    room: z.enum(['quarto', 'sala', 'cozinha', 'escritorio', 'outro'], {
      errorMap: () => ({ message: 'Selecione o local' }),
    }),
    roomOther: z.string().trim().optional(),
    heatAppliances: z.boolean(),
    manyWindows: z.boolean(),
  })
  .superRefine((d, ctx) => {
    if (d.property === 'apartamento' && !/^\d{1,3}$/.test(d.floor ?? '')) {
      ctx.addIssue({ code: 'custom', path: ['floor'], message: 'Informe o andar (somente números)' })
    }
    if (d.property === 'outro' && !d.propertyOther) {
      ctx.addIssue({ code: 'custom', path: ['propertyOther'], message: 'Descreva o tipo de imóvel' })
    }
    if (d.room === 'outro' && !d.roomOther) {
      ctx.addIssue({ code: 'custom', path: ['roomOther'], message: 'Descreva o local' })
    }
  })

export type InstallInfo = z.infer<typeof installSchema>

export function labelOf(options: ReadonlyArray<{ value: string; label: string }>, value: string): string {
  return options.find((o) => o.value === value)?.label ?? value
}
