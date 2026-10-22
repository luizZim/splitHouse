'use client'

import type { ReactNode } from 'react'
import type { FieldErrors, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'
import { MessageCircle } from 'lucide-react'
import { PROPERTY_OPTIONS, ROOM_OPTIONS } from '@/lib/catalog/install'
import { WA_BASE, WA_SIZES } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

export const chipClass =
  'cursor-pointer select-none px-3.5 py-2 rounded-lg border-[1.5px] border-gray-200 text-[13px] font-medium text-gray-700 transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40'
export const inputClass =
  'w-full px-3.5 py-2.5 text-[14px] border-[1.5px] border-gray-300 rounded-lg outline-none focus:border-brand mt-2'

export function FieldError({ message }: { message?: string }) {
  return message ? <p className="text-[11px] text-red-500 mt-1">{message}</p> : null
}

/** Grupo de chips (radio ou checkbox) ligado ao react-hook-form. */
export function ChipGroup({
  legend,
  options,
  registration,
  type = 'radio',
  error,
  children,
}: {
  legend: string
  options: ReadonlyArray<{ value: string; label: string }>
  registration: UseFormRegisterReturn
  type?: 'radio' | 'checkbox'
  error?: string
  children?: ReactNode
}) {
  return (
    <fieldset>
      <legend className="text-[13px] font-semibold text-gray-700 mb-2">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className={chipClass}>
            <input type={type} value={o.value} {...registration} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
      <FieldError message={error} />
      {children}
    </fieldset>
  )
}

export function SubmitWhatsApp({ children = 'Enviar pelo WhatsApp' }: { children?: ReactNode }) {
  return (
    <button type="submit" className={cn(WA_BASE, WA_SIZES.md, 'w-full mt-1')}>
      <MessageCircle size={17} /> {children}
    </button>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Campos do local de instalação (imóvel, cômodo, calor, vidros). */
export function InstallFields({
  register,
  errors,
  property,
  room,
}: {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  property?: string
  room?: string
}) {
  const msg = (k: string) => errors[k]?.message as string | undefined
  return (
    <>
      <ChipGroup legend="Tipo de instalação *" options={PROPERTY_OPTIONS} registration={register('property')} error={msg('property')}>
        {property === 'apartamento' && (
          <div>
            <input {...register('floor')} inputMode="numeric" placeholder="Andar (ex.: 8 — use 0 para térreo)" className={cn(inputClass, msg('floor') && 'border-red-400')} />
            <FieldError message={msg('floor')} />
          </div>
        )}
        {property === 'outro' && (
          <div>
            <input {...register('propertyOther')} placeholder="Descreva (ex.: sobrado, galpão)" className={cn(inputClass, msg('propertyOther') && 'border-red-400')} />
            <FieldError message={msg('propertyOther')} />
          </div>
        )}
      </ChipGroup>

      <ChipGroup legend="Local *" options={ROOM_OPTIONS} registration={register('room')} error={msg('room')}>
        {room === 'outro' && (
          <div>
            <input {...register('roomOther')} placeholder="Descreva o local" className={cn(inputClass, msg('roomOther') && 'border-red-400')} />
            <FieldError message={msg('roomOther')} />
          </div>
        )}
      </ChipGroup>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="text-[13px] font-semibold text-gray-700 mb-2">O local tem:</legend>
        <label className="flex items-center gap-2.5 text-[13px] text-gray-700 cursor-pointer">
          <input type="checkbox" {...register('heatAppliances')} className="w-4 h-4 accent-[#2E3192]" />
          Muitos eletrodomésticos que geram calor (fogão, forno, churrasqueira)
        </label>
        <label className="flex items-center gap-2.5 text-[13px] text-gray-700 cursor-pointer">
          <input type="checkbox" {...register('manyWindows')} className="w-4 h-4 accent-[#2E3192]" />
          Muitos vidros / sol direto
        </label>
      </fieldset>
    </>
  )
}
