'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircle, X } from 'lucide-react'
import { installSchema, PROPERTY_OPTIONS, ROOM_OPTIONS, type InstallInfo } from '@/lib/catalog/install'
import { WA_BASE, WA_SIZES } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

interface Props {
  open: boolean
  summary: string
  onClose: () => void
  onSubmit: (info: InstallInfo) => void
}

const chip =
  'cursor-pointer select-none px-3.5 py-2 rounded-lg border-[1.5px] border-gray-200 text-[13px] font-medium text-gray-700 transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40'
const input =
  'w-full px-3.5 py-2.5 text-[14px] border-[1.5px] border-gray-300 rounded-lg outline-none focus:border-brand mt-2'
const errorText = 'text-[11px] text-red-500 mt-1'

export function InstallModal({ open, summary, onClose, onSubmit }: Props) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<InstallInfo>({
    resolver: zodResolver(installSchema),
    defaultValues: { floor: '', propertyOther: '', roomOther: '', heatAppliances: false, manyWindows: false },
  })
  const property = useWatch({ control, name: 'property' })
  const room = useWatch({ control, name: 'room' })

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) {
      reset()
      return
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFirst = requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus()
    })

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = dialogRef.current.querySelectorAll<HTMLElement>('input, button, textarea, select')
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(focusFirst)
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, reset])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#0b0d33]/55 backdrop-blur-sm p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white w-full sm:max-w-[520px] max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,.25)] p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 id="install-title" className="text-lg font-bold text-[#1A1A2E]">Dados para a instalação</h2>
                <p className="text-[12px] text-gray-500 mt-0.5">{summary}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Fechar" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              <fieldset>
                <legend className="text-[13px] font-semibold text-gray-700 mb-2">Tipo de instalação *</legend>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_OPTIONS.map((o) => (
                    <label key={o.value} className={chip}>
                      <input type="radio" value={o.value} {...register('property')} className="sr-only" />
                      {o.label}
                    </label>
                  ))}
                </div>
                {errors.property && <p className={errorText}>{errors.property.message}</p>}
                {property === 'apartamento' && (
                  <div>
                    <input {...register('floor')} inputMode="numeric" placeholder="Andar (ex.: 8 — use 0 para térreo)" className={cn(input, errors.floor && 'border-red-400')} />
                    {errors.floor && <p className={errorText}>{errors.floor.message}</p>}
                  </div>
                )}
                {property === 'outro' && (
                  <div>
                    <input {...register('propertyOther')} placeholder="Descreva (ex.: sobrado, galpão)" className={cn(input, errors.propertyOther && 'border-red-400')} />
                    {errors.propertyOther && <p className={errorText}>{errors.propertyOther.message}</p>}
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className="text-[13px] font-semibold text-gray-700 mb-2">Local *</legend>
                <div className="flex flex-wrap gap-2">
                  {ROOM_OPTIONS.map((o) => (
                    <label key={o.value} className={chip}>
                      <input type="radio" value={o.value} {...register('room')} className="sr-only" />
                      {o.label}
                    </label>
                  ))}
                </div>
                {errors.room && <p className={errorText}>{errors.room.message}</p>}
                {room === 'outro' && (
                  <div>
                    <input {...register('roomOther')} placeholder="Descreva o local" className={cn(input, errors.roomOther && 'border-red-400')} />
                    {errors.roomOther && <p className={errorText}>{errors.roomOther.message}</p>}
                  </div>
                )}
              </fieldset>

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

              <button type="submit" className={cn(WA_BASE, WA_SIZES.md, 'w-full mt-1')}>
                <MessageCircle size={17} /> Enviar pelo WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
