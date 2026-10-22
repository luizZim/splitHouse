'use client'

import Link from 'next/link'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '@/components/ui/Modal'
import { ChipGroup, FieldError, InstallFields, SubmitWhatsApp, inputClass } from '@/components/services/fields'
import { buildInstallServiceMessage, HAS_EQUIPMENT_OPTIONS, installServiceSchema, type InstallServiceInfo } from '@/lib/services/installService'
import { CAPACITY_OPTIONS, EQUIPMENT_TYPE_OPTIONS } from '@/lib/services/options'
import { openWhatsApp } from '@/lib/whatsapp'
import { cn } from '@/lib/utils/cn'

export function InstallServiceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<InstallServiceInfo>({
    resolver: zodResolver(installServiceSchema),
    defaultValues: { floor: '', propertyOther: '', roomOther: '', heatAppliances: false, manyWindows: false, capacity: '' },
  })
  const [hasEquipment, property, room] = useWatch({ control, name: ['hasEquipment', 'property', 'room'] })

  function submit(d: InstallServiceInfo) {
    openWhatsApp(buildInstallServiceMessage(d))
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Orçamento de instalação" summary="Leva menos de 1 minuto" onExited={() => reset()}>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5" noValidate>
        <ChipGroup
          legend="Já tem o aparelho? *"
          options={HAS_EQUIPMENT_OPTIONS}
          registration={register('hasEquipment')}
          error={errors.hasEquipment?.message}
        >
          {hasEquipment === 'nao' && (
            <p className="text-[12px] text-gray-500 mt-2">
              Sem problema: indicamos o modelo ideal no orçamento. Se preferir, veja os modelos no{' '}
              <Link href="/#produtos" onClick={onClose} className="text-brand font-semibold underline">
                catálogo
              </Link>
              .
            </p>
          )}
        </ChipGroup>

        <ChipGroup
          legend="Tipo de aparelho *"
          options={EQUIPMENT_TYPE_OPTIONS}
          registration={register('equipmentType')}
          error={errors.equipmentType?.message}
        />

        <div>
          <label htmlFor="install-capacity" className="text-[13px] font-semibold text-gray-700">Capacidade *</label>
          <select id="install-capacity" {...register('capacity')} className={cn(inputClass, 'bg-white', errors.capacity && 'border-red-400')}>
            <option value="">Selecione…</option>
            {CAPACITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <FieldError message={errors.capacity?.message} />
        </div>

        <InstallFields register={register} errors={errors} property={property} room={room} />
        <SubmitWhatsApp />
      </form>
    </Modal>
  )
}
