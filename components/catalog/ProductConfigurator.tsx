'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { BrandLogo } from '@/components/catalog/BrandLogo'
import { QuoteFlow } from '@/components/catalog/QuoteFlow'
import { cn } from '@/lib/utils/cn'
import {
  areaFor,
  brandsFor,
  capacitiesFor,
  findVariant,
  formatArea,
  formatBtu,
  resolveSelection,
} from '@/lib/catalog/select'
import type { Brand, BrandId, ProductLine, ProductType } from '@/lib/catalog/types'
import type { QuoteSelection } from '@/lib/whatsapp'

interface Props {
  type: ProductType
  lines: ProductLine[]
  brands: Brand[]
}

export function ProductConfigurator({ type, lines, brands }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [sel, setSel] = useState(() =>
    resolveSelection(lines, Number(params.get('btu')) || undefined, params.get('marca') ?? undefined)
  )

  const capacities = capacitiesFor(lines)
  const available = brandsFor(lines, sel.btu)
  const typeBrands = brands.filter((b) => lines.some((l) => l.brand === b.id))
  const found = findVariant(lines, sel)!
  const { line, variant } = found
  const brand = brands.find((b) => b.id === sel.brand)!
  const area = formatArea(areaFor(variant.btu, variant.areaM2))

  function update(next: { btu?: number; brand?: BrandId }) {
    const r = resolveSelection(lines, next.btu ?? sel.btu, next.brand ?? sel.brand)
    setSel(r)
    router.replace(`?btu=${r.btu}&marca=${r.brand}`, { scroll: false })
  }

  const quote: QuoteSelection = {
    typeLabel: type.label,
    brandName: brand.name,
    lineName: line.name,
    btu: variant.btu,
    model: variant.model,
    voltage: variant.voltage,
    energyLabel: variant.energyLabel,
  }

  const specs = [
    { label: 'Capacidade', value: `${formatBtu(variant.btu)} BTU/h` },
    { label: 'Área indicada*', value: area },
    { label: 'Tecnologia', value: line.inverter ? 'Inverter' : 'Convencional (on/off)' },
    variant.energyLabel && { label: 'Selo de eficiência', value: `Classe ${variant.energyLabel}` },
    variant.voltage && { label: 'Tensão', value: variant.voltage },
    line.refrigerant && { label: 'Gás refrigerante', value: line.refrigerant },
    variant.noiseDb !== undefined && { label: 'Ruído (unid. interna)', value: `${variant.noiseDb} dB(A)` },
    line.wifi !== undefined && { label: 'Wi-Fi', value: line.wifi ? 'Sim' : 'Não' },
    variant.model && { label: 'Modelo', value: variant.model },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 items-start">
      {/* Imagem */}
      <div className="lg:sticky lg:top-[112px]">
        <div className={`bg-gradient-to-br ${type.bg} rounded-2xl aspect-[4/3] relative overflow-hidden flex items-center justify-center`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sel.brand}-${sel.btu}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {line.image ? (
                <Image
                  src={line.image}
                  alt={`${brand.name} ${line.name}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <ACIllustration color={type.accent} size={100} />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-2 shadow-sm">
            <BrandLogo brand={brand} className="text-brand" />
          </div>
        </div>
      </div>

      {/* Seleção + detalhes */}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2.5">Capacidade</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {capacities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update({ btu: c })}
              aria-pressed={c === sel.btu}
              className={cn(
                'px-4 h-10 rounded-lg text-[13px] font-semibold border-[1.5px] transition-colors',
                c === sel.btu ? 'bg-brand text-white border-brand' : 'bg-white text-gray-700 border-gray-200 hover:border-brand hover:text-brand'
              )}
            >
              {formatBtu(c)} BTU
            </button>
          ))}
        </div>

        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2.5">Marca</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {typeBrands.map((b) => {
            const enabled = available.includes(b.id)
            const active = b.id === sel.brand
            return (
              <button
                key={b.id}
                type="button"
                disabled={!enabled}
                onClick={() => update({ brand: b.id })}
                aria-pressed={active}
                title={enabled ? b.name : `Indisponível em ${formatBtu(sel.btu)} BTU`}
                className={cn(
                  'px-4 h-11 rounded-lg border-[1.5px] flex items-center transition-colors',
                  active && 'border-brand bg-[#EEF0FC] text-brand',
                  !active && enabled && 'border-gray-200 bg-white text-gray-700 hover:border-brand',
                  !enabled && 'border-dashed border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed opacity-60'
                )}
              >
                <BrandLogo brand={b} />
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${sel.brand}-${sel.btu}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: type.accent }}>
              {brand.name}
            </div>
            <h2 className="text-[clamp(1.3rem,2.6vw,1.8rem)] font-extrabold text-[#1A1A2E] tracking-tight mb-1">
              {line.name}
            </h2>
            <div className="text-[1.3rem] font-bold text-brand mb-5">{formatBtu(variant.btu)} BTU/h</div>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-5">
              {specs.map((s, i) => (
                <div key={s.label} className={cn('flex px-5 py-3', i < specs.length - 1 && 'border-b border-gray-100')}>
                  <span className="text-[13px] text-gray-500 flex-[0_0_160px]">{s.label}</span>
                  <span className="text-[13px] font-semibold text-[#1A1A2E] flex-1">{s.value}</span>
                </div>
              ))}
            </div>

            {line.highlights.length > 0 && (
              <ul className="space-y-2 mb-5">
                {line.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[13px] text-gray-700">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" /> {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mb-6 text-[13px] text-gray-600 leading-relaxed">
          <p className="mb-1.5">
            <strong className="text-[#1A1A2E]">Ideal para:</strong> {type.idealFor.join(', ')}.
          </p>
          <p>
            <strong className="text-[#1A1A2E]">Instalação:</strong> {type.installation}
          </p>
        </div>

        <QuoteFlow selection={quote} />

        <p className="text-[11px] text-gray-400 mt-3">
          * Área aproximada de referência. Para um cálculo preciso, use o{' '}
          <a href="/#simulador" className="underline hover:text-brand">simulador de BTU</a>.
        </p>
      </div>
    </div>
  )
}
