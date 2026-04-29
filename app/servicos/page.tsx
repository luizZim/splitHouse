'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { WhatsAppButton } from '@/components/ui/Button'
import { SERVICES } from '@/lib/data/services'
import { buildServiceMessage } from '@/lib/whatsapp'

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(46,49,146,.08)]">
      <div
        className="flex items-start gap-5 p-7 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-[26px]"
          style={{ background: service.color + '18' }}
        >
          {service.id === 'instalacao' ? '⚡' : service.id === 'manutencao' ? '🔧' : service.id === 'revenda' ? '📦' : '🏢'}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">{service.title}</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">{service.desc}</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 flex-shrink-0 mt-1"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 border-t border-gray-100 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3">
                    Quando contratar
                  </p>
                  {service.when.map((w) => (
                    <div key={w} className="flex items-start gap-2 mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={service.color} strokeWidth="3" className="flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-[13px] text-gray-700 leading-relaxed">{w}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-3">
                    Como funciona
                  </p>
                  {service.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-2.5 mb-2">
                      <div
                        className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: service.color }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[13px] text-gray-700 leading-relaxed">{st}</span>
                    </div>
                  ))}
                </div>
              </div>
              <WhatsAppButton message={buildServiceMessage(service.title)} size="sm">
                Solicitar {service.title}
              </WhatsAppButton>
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
          <div className="flex flex-col gap-8">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
