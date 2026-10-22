'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, CheckCircle, AlertCircle, ArrowRight, Info } from 'lucide-react'
import { calcBTU, HEAT_OPTIONS, SUN_OPTIONS } from '@/lib/calculations/btu'
import { formatBtu } from '@/lib/catalog/select'
import { buildSimuladorMessage, openWhatsApp } from '@/lib/whatsapp'
import { rememberHomeScroll } from '@/lib/navigation/homeReturn'
import { ClientWhatsAppButton } from '@/components/ui/ClientWhatsAppButton'
import { cn } from '@/lib/utils/cn'
import type { BTUFormData, BTUResult, HeatSource, SunExposure } from '@/types'

const inputClass =
  'w-full px-3.5 py-3 font-sans text-[14px] border-[1.5px] border-gray-300 rounded-lg outline-none text-[#1A1A2E] bg-white transition-colors focus:border-brand'
const labelClass = 'block text-[13px] font-semibold text-gray-700 mb-1.5'
const chip = (active: boolean) =>
  cn(
    'py-2.5 px-3.5 rounded-lg border-[1.5px] text-[13px] font-sans transition-all duration-200',
    active ? 'border-brand bg-[#EEF0FC] text-brand font-semibold' : 'border-gray-300 bg-white text-gray-500 hover:border-brand/50'
  )

function YesNo({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => onChange(false)} className={cn(chip(!value), 'min-w-[72px]')}>
        Não
      </button>
      <button type="button" onClick={() => onChange(true)} className={cn(chip(value), 'min-w-[72px]')}>
        Sim
      </button>
    </div>
  )
}

/** Tipo do catálogo onde a capacidade recomendada costuma ser encontrada. */
function catalogPathFor(btu: number) {
  return btu <= 30000 ? '/produtos/hi-wall' : '/produtos/piso-teto'
}

export function SimuladorForm() {
  const [area, setArea] = useState('')
  const [altura, setAltura] = useState('2.7')
  const [hasSun, setHasSun] = useState(false)
  const [sol, setSol] = useState<Exclude<SunExposure, 'nao'>>('tarde')
  const [hasHeat, setHasHeat] = useState(false)
  const [calor, setCalor] = useState<HeatSource[]>([])
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ form: BTUFormData; r: BTUResult } | null>(null)

  function toggleHeat(h: HeatSource) {
    setCalor((cur) => (cur.includes(h) ? cur.filter((x) => x !== h) : [...cur, h]))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const a = Number(area.replace(',', '.'))
    const h = Number(altura.replace(',', '.')) || 2.7
    if (!a || a < 1 || a > 1000) {
      setError('Informe a área do ambiente em m² (entre 1 e 1000).')
      return
    }
    setError(null)
    const form: BTUFormData = {
      area: a,
      altura: Math.min(Math.max(h, 2), 8),
      sol: hasSun ? sol : 'nao',
      calor: hasHeat ? calor : [],
    }
    setResult({ form, r: calcBTU(form) })
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
            <div className="text-xs text-white/60">Baseada nas áreas indicadas pelos fabricantes</div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="p-8 flex flex-col gap-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="sim-area" className={labelClass}>Área do ambiente (m²) *</label>
              <input
                id="sim-area"
                type="number"
                inputMode="decimal"
                placeholder="Ex: 20"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className={cn(inputClass, error && 'border-red-500')}
              />
              {error && (
                <span className="flex items-center gap-1 text-[11px] text-red-500 mt-1">
                  <AlertCircle size={11} /> {error}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="sim-altura" className={labelClass}>Altura do teto (m)</label>
              <input
                id="sim-altura"
                type="number"
                inputMode="decimal"
                step="0.1"
                placeholder="Ex: 2.7"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <p className={labelClass}>O local recebe sol?</p>
            <YesNo value={hasSun} onChange={setHasSun} />
            <AnimatePresence initial={false}>
              {hasSun && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-3">
                    {SUN_OPTIONS.map((o) => (
                      <button key={o.value} type="button" onClick={() => setSol(o.value)} className={chip(sol === o.value)}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <p className={labelClass}>Tem algo que aquece demais o ambiente?</p>
            <p className="text-[12px] text-gray-400 -mt-1 mb-2">
              Fogão, churrasqueira, muitos vidros com sol… TV e notebook comuns não contam.
            </p>
            <YesNo value={hasHeat} onChange={setHasHeat} />
            <AnimatePresence initial={false}>
              {hasHeat && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-3">
                    {HEAT_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={calor.includes(o.value)}
                        onClick={() => toggleHeat(o.value)}
                        className={chip(calor.includes(o.value))}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            className="w-full h-[52px] bg-brand text-white font-sans font-bold text-[15px] rounded-lg flex items-center justify-center gap-2 hover:bg-brand-dark transition-colors"
          >
            <Calculator size={18} />
            Calcular BTU recomendado
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-[#EEF0FC] to-[#D4D8F7] rounded-xl p-6 border-[1.5px] border-[#A9B1EF]"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div className="text-[15px] font-bold text-brand">Resultado da simulação</div>
                </div>

                <div className="bg-white rounded-xl p-5 text-center shadow-[0_2px_8px_rgba(46,49,146,.08)] mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-1">BTU recomendado</div>
                  {result.r.btu === null ? (
                    <div className="text-[1.4rem] font-extrabold text-brand">Acima de 60.000 BTU/h</div>
                  ) : (
                    <div className="text-[2rem] font-extrabold text-brand tracking-tight">
                      {formatBtu(result.r.btu)} <span className="text-base font-bold">BTU/h</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    Área efetiva considerada:{' '}
                    {result.r.effectiveArea.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} m²
                  </div>
                </div>

                {result.r.adjustments.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {result.r.adjustments.map((a) => (
                      <span key={a.label} className="text-[11px] font-semibold bg-white/80 text-brand rounded-full px-2.5 py-1">
                        {a.label} +{a.pct}%
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-lg px-3.5 py-2.5 text-xs text-[#9F4B04] mb-4">
                  <Info size={14} className="flex-shrink-0 mt-0.5" />
                  {result.r.btu === null
                    ? 'Para ambientes desse porte o ideal é mais de um aparelho ou um sistema Mini VRF / Splitão. Fale com o técnico para dimensionar.'
                    : 'Estimativa baseada nas áreas indicadas pelos fabricantes. A confirmação final é feita na visita técnica.'}
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  {result.r.btu !== null && (
                    <Link
                      href={`${catalogPathFor(result.r.btu)}?btu=${result.r.btu}`}
                      onClick={() => rememberHomeScroll(catalogPathFor(result.r.btu!), window.scrollY)}
                      className="flex-1 inline-flex items-center justify-center gap-2 h-[52px] rounded-lg bg-brand text-white text-[14px] font-semibold hover:bg-brand-dark transition-colors"
                    >
                      Ver aparelhos de {formatBtu(result.r.btu)} BTU <ArrowRight size={16} />
                    </Link>
                  )}
                  <ClientWhatsAppButton
                    onClick={() => openWhatsApp(buildSimuladorMessage(result.form, result.r))}
                    className="flex-1"
                  >
                    {result.r.btu === null ? 'Falar com o técnico' : 'Pedir orçamento'}
                  </ClientWhatsAppButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}
