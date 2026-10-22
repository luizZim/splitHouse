'use client'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@/components/ui/Modal'
import { ChipGroup, FieldError, SubmitWhatsApp, inputClass } from '@/components/services/fields'
import {
  LAST_CLEANING_OPTIONS,
  ROOF_OPTIONS,
  SOLAR_LOCATION_OPTIONS,
  buildSolarCleaningMessage,
  solarCleaningSchema,
  type SolarCleaningInfo,
} from '@/lib/services/solarCleaning'
import { openWhatsApp } from '@/lib/whatsapp'
import { cn } from '@/lib/utils/cn'

export function SolarCleaningModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<SolarCleaningInfo>({
    resolver: zodResolver(solarCleaningSchema),
    defaultValues: { panels: '', city: 'Cascavel' },
  })
  const location = useWatch({ control, name: 'location' })

  function submit(d: SolarCleaningInfo) {
    openWhatsApp(buildSolarCleaningMessage(d))
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Limpeza de placas solares" summary="Informações para o orçamento prévio" onExited={() => reset()}>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="solar-panels" className="text-[13px] font-semibold text-gray-700">Quantidade de placas *</label>
            <input id="solar-panels" {...register('panels')} inputMode="numeric" placeholder="Ex.: 20" className={cn(inputClass, errors.panels && 'border-red-400')} />
            <FieldError message={errors.panels?.message} />
          </div>
          <div>
            <label htmlFor="solar-city" className="text-[13px] font-semibold text-gray-700">Cidade *</label>
            <input id="solar-city" {...register('city')} className={cn(inputClass, errors.city && 'border-red-400')} />
            <FieldError message={errors.city?.message} />
          </div>
        </div>

        <ChipGroup legend="Onde estão as placas? *" options={SOLAR_LOCATION_OPTIONS} registration={register('location')} error={errors.location?.message} />
        {location?.startsWith('telhado') && (
          <ChipGroup legend="Tipo de telhado *" options={ROOF_OPTIONS} registration={register('roof')} error={errors.roof?.message} />
        )}
        <ChipGroup legend="Última limpeza *" options={LAST_CLEANING_OPTIONS} registration={register('lastCleaning')} error={errors.lastCleaning?.message} />

        <SubmitWhatsApp />
      </form>
    </Modal>
  )
}
