import { z } from 'zod'
import { installSchema } from '@/lib/catalog/install'
import { installLines } from '@/lib/whatsapp'
import { CAPACITY_OPTIONS, EQUIPMENT_TYPE_OPTIONS, labelOf, lowerUnknown } from './options'

export const HAS_EQUIPMENT_OPTIONS = [
  { value: 'sim', label: 'Sim, já tenho' },
  { value: 'nao', label: 'Não, preciso comprar' },
] as const

export const installServiceSchema = z
  .object({
    hasEquipment: z.enum(['sim', 'nao'], { errorMap: () => ({ message: 'Informe se já tem o aparelho' }) }),
    equipmentType: z.enum(['hi-wall', 'piso-teto', 'cassete', 'nao-sei'], {
      errorMap: () => ({ message: 'Selecione o tipo' }),
    }),
    capacity: z.string({ required_error: 'Selecione a capacidade' }).min(1, 'Selecione a capacidade'),
  })
  .and(installSchema)

export type InstallServiceInfo = z.infer<typeof installServiceSchema>

export function buildInstallServiceMessage(d: InstallServiceInfo): string {
  return [
    'Olá! Gostaria de um orçamento de *instalação*.',
    '',
    '*Aparelho*',
    d.hasEquipment === 'sim' ? '• Já tenho o aparelho' : '• Ainda não tenho o aparelho (quero indicação)',
    `• Tipo: ${lowerUnknown(labelOf(EQUIPMENT_TYPE_OPTIONS, d.equipmentType))} · Capacidade: ${lowerUnknown(
      labelOf(CAPACITY_OPTIONS, d.capacity)
    )}`,
    '',
    '*Local da instalação*',
    ...installLines(d),
  ].join('\n')
}
