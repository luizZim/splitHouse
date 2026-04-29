'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, CheckCircle, AlertCircle } from 'lucide-react'
import { calcBTU } from '@/lib/calculations/btu'
import { buildSimuladorMessage, WHATSAPP_NUMBER } from '@/lib/whatsapp'
import { ClientWhatsAppButton } from '@/components/ui/ClientWhatsAppButton'
import type { BTUResult } from '@/types'

const schema = z.object({
  area: z.number({ required_error: 'Informe a área' }).min(1, 'Área mínima: 1m²').max(500),
  altura: z.number().min(1.8).max(6).default(2.7),
  pessoas: z.number().min(1).max(50).default(1),
  sol: z.enum(['baixo', 'medio', 'alto']).default('medio'),
  equipamentos: z.number().min(0).max(20).default(0),
})

type FormData = z.infer<typeof schema>

const SOL_OPTIONS = [
  { value: 'baixo', label: 'Baixa (sombra/norte)' },
  { value: 'medio', label: 'Média (meia-sombra)' },
  { value: 'alto', label: 'Alta (sol direto)' },
] as const

const inputClass =
  'w-full px-3.5 py-3 font-sans text-[14px] border-[1.5px] border-gray-300 rounded-lg outline-none text-[#1A1A2E] bg-white transition-colors focus:border-brand'
const labelClass = 'block text-[13px] font-semibold text-gray-700 mb-1.5'

export function SimuladorForm() {
  const [result, setResult] = useState<BTUResult | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { altura: 2.7, pessoas: 1, sol: 'medio', equipamentos: 0 },
  })

  const solValue = watch('sol')

  const onSubmit = (data: FormData) => {
    const r = calcBTU(data)
    setResult(r)
  }

  const handleWhatsApp = () => {
    if (!result) return
    const formData = watch()
    const msg = buildSimuladorMessage(formData, result)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="max-w-[780px] mx-auto">
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(46,49,146,.10)] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-dark to-brand px-8 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center">
            <Calculator size={20} className="text-white" />
          </div>
          <div>
            <div className="text-base font-bold text-white">Calculadora de BTU</div>
            <div className="text-xs text-white/60">Preencha os dados do seu ambiente</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Area */}
            <div>
              <label className={labelClass}>Área do ambiente (m²) *</label>
              <input
                type="number"
                placeholder="Ex: 20"
                {...register('area', { valueAsNumber: true })}
                className={`${inputClass} ${errors.area ? 'border-red-500' : ''}`}
              />
              {errors.area && (
                <span className="flex items-center gap-1 text-[11px] text-red-500 mt-1">
                  <AlertCircle size={11} /> {errors.area.message}
                </span>
              )}
            </div>

            {/* Height */}
            <div>
              <label className={labelClass}>Altura do teto (m)</label>
              <input
                type="number"
                placeholder="Ex: 2.7"
                step="0.1"
                {...register('altura', { valueAsNumber: true })}
                className={inputClass}
              />
            </div>

            {/* People */}
            <div>
              <label className={labelClass}>Número de pessoas</label>
              <input
                type="number"
                placeholder="Ex: 2"
                {...register('pessoas', { valueAsNumber: true })}
                className={inputClass}
              />
            </div>

            {/* Solar */}
            <div>
              <label className={labelClass}>Incidência solar</label>
              <select {...register('sol')} className={`${inputClass} cursor-pointer`}>
                {SOL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Electronics */}
            <div className="sm:col-span-2">
              <label className={labelClass}>Equipamentos eletrônicos</label>
              <div className="flex gap-2.5 flex-wrap">
                {[
                  { v: 0, l: 'Nenhum' },
                  { v: 2, l: 'Poucos (TV, notebook)' },
                  { v: 5, l: 'Muitos (servidores, etc.)' },
                ].map((opt) => {
                  const current = watch('equipamentos')
                  const active = current === opt.v
                  return (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setValue('equipamentos', opt.v)}
                      className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg border-[1.5px] text-[13px] font-sans text-center transition-all duration-200 ${
                        active
                          ? 'border-brand bg-[#EEF0FC] text-brand font-semibold'
                          : 'border-gray-300 bg-white text-gray-500'
                      }`}
                    >
                      {opt.l}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 h-[52px] bg-brand text-white font-sans font-bold text-[15px] rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
          >
            <Calculator size={18} />
            Calcular BTU recomendado
          </button>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-gradient-to-br from-[#EEF0FC] to-[#D4D8F7] rounded-xl p-6 border-[1.5px] border-[#A9B1EF]"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div className="text-[15px] font-bold text-brand">Resultado da simulação</div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 mb-4">
                  <div className="flex-1 bg-white rounded-xl p-4 text-center shadow-[0_2px_8px_rgba(46,49,146,.08)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1">BTU recomendado</div>
                    <div className="text-[2rem] font-extrabold text-brand tracking-tight">
                      {result.btu.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-500">BTU/h</div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-4 text-center shadow-[0_2px_8px_rgba(46,49,146,.08)]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1">Faixa sugerida</div>
                    <div className="text-[1.4rem] font-bold text-[#1A1A2E] tracking-tight">
                      {result.range[0].toLocaleString('pt-BR')}–{result.range[1].toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-500">BTU/h</div>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/30 rounded-lg px-3.5 py-2.5 text-xs text-[#9F4B04] mb-4">
                  Este valor é uma estimativa. O orçamento pode variar após análise no local.
                </div>

                <ClientWhatsAppButton onClick={handleWhatsApp} className="w-full">
                  Solicitar orçamento com base nesse cálculo
                </ClientWhatsAppButton>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}
