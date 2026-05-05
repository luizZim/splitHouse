'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Target, ListChecks, ShieldCheck, Award, Clock, ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { WhatsAppButton } from '@/components/ui/Button'
import { SERVICES } from '@/lib/data/services'
import { buildServiceMessage } from '@/lib/whatsapp'

const SERVICE_BADGES = [
  { icon: ShieldCheck, label: 'Garantia inclusa' },
  { icon: Award, label: '13+ anos' },
  { icon: Clock, label: 'Visita gratuita' },
]

const SERVICE_EMOJI: Record<string, string> = {
  instalacao: '⚡',
  manutencao: '🔧',
  revenda: '📦',
  'mini-vrf': '🏢',
}

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(46,49,146,.08)] border-l-4 transition-all duration-300 ${
        open
          ? 'shadow-[0_12px_40px_rgba(46,49,146,.16)]'
          : 'border-l-transparent hover:shadow-[0_6px_24px_rgba(46,49,146,.12)] hover:-translate-y-0.5'
      }`}
      style={open ? { borderLeftColor: service.color } : undefined}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: service.color }} />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-start gap-5 p-7"
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-[30px] shadow-[inset_0_1px_2px_rgba(255,255,255,.6)]"
          style={{
            background: `linear-gradient(135deg, ${service.color}1a 0%, ${service.color}33 100%)`,
          }}
        >
          {SERVICE_EMOJI[service.id] ?? '🔹'}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">{service.title}</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed mb-4">{service.desc}</p>

          <div className="flex flex-wrap gap-2">
            {SERVICE_BADGES.map((b) => {
              const Icon = b.icon
              return (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 bg-[#EEF0FC] text-brand text-[11px] font-semibold rounded-full px-2.5 py-1"
                >
                  <Icon size={12} />
                  {b.label}
                </span>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-9 h-9 rounded-full bg-[#EEF0FC] text-brand flex items-center justify-center"
          >
            <ChevronDown size={18} />
          </motion.div>
          {!open && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[12px] font-semibold text-brand whitespace-nowrap">
              Ver detalhes <ArrowRight size={12} />
            </span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-7 pb-7 pt-6 border-t border-gray-100"
              style={{
                background: `linear-gradient(180deg, ${service.color}06 0%, transparent 100%)`,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-7">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: service.color + '22', color: service.color }}
                    >
                      <Target size={14} />
                    </div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-700">
                      Quando contratar
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {service.when.map((w) => (
                      <li key={w} className="flex items-start gap-2.5">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={service.color}
                          strokeWidth="3"
                          className="flex-shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[13px] text-gray-700 leading-relaxed">{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: service.color + '22', color: service.color }}
                    >
                      <ListChecks size={14} />
                    </div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-700">
                      Como funciona
                    </p>
                  </div>
                  <ol className="relative space-y-3">
                    {service.steps.map((st, i) => (
                      <li key={i} className="relative flex items-start gap-3">
                        {i < service.steps.length - 1 && (
                          <span
                            className="absolute left-[11px] top-6 bottom-[-8px] w-px border-l border-dashed"
                            style={{ borderColor: service.color + '55' }}
                          />
                        )}
                        <div
                          className="w-[22px] h-[22px] rounded-full text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 shadow-[0_2px_6px_rgba(0,0,0,.1)] z-10"
                          style={{ background: service.color }}
                        >
                          {i + 1}
                        </div>
                        <span className="text-[13px] text-gray-700 leading-relaxed pt-0.5">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div
                className="rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{ background: service.color + '0d', border: `1px solid ${service.color}26` }}
              >
                <div>
                  <p className="text-[14px] font-bold text-[#1A1A2E] mb-0.5">
                    Pronto para começar?
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Atendimento direto com quem executa — orçamento sem compromisso.
                  </p>
                </div>
                <WhatsAppButton
                  message={buildServiceMessage(service.title)}
                  size="md"
                  className="flex-shrink-0"
                >
                  Solicitar orçamento
                </WhatsAppButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ServicosPage() {
  return (
    <div>
      <PageHeader
        label="O que fazemos"
        title="Nossos Serviços"
        subtitle="Atendimento completo em climatização — do residencial ao industrial."
      />
      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
