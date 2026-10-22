'use client'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { installSchema, type InstallInfo } from '@/lib/catalog/install'
import { Modal } from '@/components/ui/Modal'
import { InstallFields, SubmitWhatsApp } from '@/components/services/fields'

interface Props {
  open: boolean
  summary: string
  onClose: () => void
  onSubmit: (info: InstallInfo) => void
}

export function InstallModal({ open, summary, onClose, onSubmit }: Props) {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<InstallInfo>({
    resolver: zodResolver(installSchema),
    defaultValues: { floor: '', propertyOther: '', roomOther: '', heatAppliances: false, manyWindows: false },
  })
  const property = useWatch({ control, name: 'property' })
  const room = useWatch({ control, name: 'room' })

  return (
    <Modal open={open} onClose={onClose} title="Dados para a instalação" summary={summary} onExited={() => reset()}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <InstallFields register={register} errors={errors} property={property} room={room} />
        <SubmitWhatsApp />
      </form>
    </Modal>
  )
}
