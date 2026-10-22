'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@/components/ui/Modal'
import { ChipGroup, FieldError, SubmitWhatsApp, inputClass } from '@/components/services/fields'
import {
  ACCESS_OPTIONS,
  INVERTER_OPTIONS,
  QUANTITY_OPTIONS,
  SYMPTOMS,
  buildMaintenanceMessage,
  isCorrective,
  maintenanceSchema,
  type MaintenanceInfo,
  type SymptomId,
} from '@/lib/services/maintenance'
import { BRAND_OPTIONS, CAPACITY_OPTIONS, EQUIPMENT_TYPE_OPTIONS } from '@/lib/services/options'
import { openWhatsApp } from '@/lib/whatsapp'
import { cn } from '@/lib/utils/cn'

const reveal = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  className: 'overflow-hidden flex flex-col gap-5',
}

export function MaintenanceModal({
  open,
  onClose,
  initialSymptom,
}: {
  open: boolean
  onClose: () => void
  initialSymptom?: SymptomId
}) {
  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm<MaintenanceInfo>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: { symptoms: [], otherDescription: '', errorCode: '', quantity: '1', capacity: '' },
  })
  const symptoms = useWatch({ control, name: 'symptoms' }) ?? []
  const corrective = isCorrective(symptoms)

  useEffect(() => {
    if (open && initialSymptom) setValue('symptoms', [initialSymptom])
  }, [open, initialSymptom, setValue])

  function submit(d: MaintenanceInfo) {
    openWhatsApp(buildMaintenanceMessage(d))
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Orçamento de manutenção" summary="Conte o que está acontecendo para o técnico já chegar preparado" onExited={() => reset()}>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5" noValidate>
        <ChipGroup
          legend="O que o aparelho precisa ou apresenta? *"
          options={SYMPTOMS}
          type="checkbox"
          registration={register('symptoms')}
          error={errors.symptoms?.message}
        >
          {symptoms.includes('outro') && (
            <div>
              <textarea
                {...register('otherDescription')}
                rows={2}
                placeholder="Descreva o sintoma (ex.: controle não responde, cheiro de queimado…)"
                className={cn(inputClass, 'resize-y', errors.otherDescription && 'border-red-400')}
              />
              <FieldError message={errors.otherDescription?.message} />
            </div>
          )}
          {symptoms.includes('nao-liga') && (
            <input {...register('errorCode')} placeholder="Código de erro no display (opcional, ex.: E5)" className={inputClass} />
          )}
        </ChipGroup>

        <AnimatePresence initial={false}>
          {symptoms.length > 0 && (
            <motion.div key="device" {...reveal}>
              <div className="border-t border-gray-100 pt-4 text-[12px] font-bold uppercase tracking-[0.1em] text-gray-400">Sobre o aparelho</div>
              <ChipGroup legend="Quantos aparelhos?" options={QUANTITY_OPTIONS} registration={register('quantity')} />
              <ChipGroup
                legend="Tipo *"
                options={EQUIPMENT_TYPE_OPTIONS}
                registration={register('equipmentType')}
                error={errors.equipmentType?.message}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mnt-capacity" className="text-[13px] font-semibold text-gray-700">Capacidade *</label>
                  <select id="mnt-capacity" {...register('capacity')} className={cn(inputClass, 'bg-white', errors.capacity && 'border-red-400')}>
                    <option value="">Selecione…</option>
                    {CAPACITY_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <FieldError message={errors.capacity?.message} />
                </div>
                {corrective && (
                  <div>
                    <label htmlFor="mnt-brand" className="text-[13px] font-semibold text-gray-700">Marca *</label>
                    <select id="mnt-brand" {...register('brand')} className={cn(inputClass, 'bg-white', errors.brand && 'border-red-400')}>
                      <option value="">Selecione…</option>
                      {BRAND_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <FieldError message={errors.brand?.message} />
                  </div>
                )}
              </div>
              {corrective && (
                <ChipGroup legend="É inverter? *" options={INVERTER_OPTIONS} registration={register('inverter')} error={errors.inverter?.message} />
              )}
              <ChipGroup
                legend="Acesso à condensadora (unidade externa) *"
                options={ACCESS_OPTIONS}
                registration={register('access')}
                error={errors.access?.message}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <SubmitWhatsApp />
      </form>
    </Modal>
  )
}
