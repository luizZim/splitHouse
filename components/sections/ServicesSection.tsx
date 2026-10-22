'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Images,
  ListChecks,
  MessageCircle,
  PlugZap,
  ShoppingBag,
  Sun,
  Target,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal } from '@/components/ui/Reveal'
import { WA_BASE, WA_SIZES } from '@/components/ui/Button'
import { useOpenServiceModal } from '@/components/services/ServiceModals'
import { GALLERY_FILTER_EVENT } from '@/components/sections/GallerySection'
import { fadeUp } from '@/lib/motion'
import { scrollToId } from '@/lib/navigation/scroll'
import { cn } from '@/lib/utils/cn'
import { SERVICES } from '@/lib/data/services'
import type { Service } from '@/types'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  instalacao: PlugZap,
  manutencao: Wrench,
  revenda: ShoppingBag,
  'mini-vrf': Building2,
  'limpeza-solar': Sun,
}

function ServiceCard({
  service,
  open,
  onToggle,
  hasPhotos,
}: {
  service: Service
  open: boolean
  onToggle: () => void
  hasPhotos: boolean
}) {
  const openModal = useOpenServiceModal()
  const action = service.action
  return (
    <motion.div
      variants={fadeUp}
      layout
      className={`bg-white rounded-xl shadow-[0_2px_12px_rgba(46,49,146,.08)] border-[1.5px] transition-shadow duration-250 ${
        open ? 'border-[#EEF0FC] shadow-[0_12px_40px_rgba(46,49,146,.14)] sm:col-span-2 lg:col-span-3' :'border-transparent hover:shadow-[0_8px_32px_rgba(46,49,146,.14)]'
      }`}
    >
      <button type="button" onClick={onToggle} aria-expanded={open} className="w-full text-left p-7 flex items-start gap-4">
        <div className="flex-1">
          <IconBadge icon={SERVICE_ICONS[service.id] ?? PlugZap} className="mb-4" />
          <div className="w-8 h-0.5 bg-accent rounded-full mb-3" />
          <h3 className="text-base font-bold text-[#1A1A2E] mb-2">{service.title}</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">{service.desc}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-[#EEF0FC] text-brand flex items-center justify-center flex-shrink-0"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 pt-5 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-gray-700 mb-3">
                    <Target size={14} style={{ color: service.color }} /> Quando contratar
                  </p>
                  <ul className="space-y-2">
                    {service.when.map((w) => (
                      <li key={w} className="text-[13px] text-gray-700 leading-relaxed flex gap-2">
                        <span style={{ color: service.color }}>✓</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-gray-700 mb-3">
                    <ListChecks size={14} style={{ color: service.color }} /> Como funciona
                  </p>
                  <ol className="space-y-2">
                    {service.steps.map((st, i) => (
                      <li key={st} className="flex items-start gap-2.5 text-[13px] text-gray-700 leading-relaxed">
                        <span
                          className="w-[22px] h-[22px] rounded-full text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                          style={{ background: service.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {'modal' in action ? (
                  <button type="button" onClick={() => openModal(action.modal)} className={cn(WA_BASE, WA_SIZES.sm)}>
                    <MessageCircle size={15} /> Solicitar orçamento
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => scrollToId(action.section)}
                    className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-brand text-white text-[13px] font-semibold hover:bg-brand-dark transition-colors"
                  >
                    {action.label} <ArrowRight size={15} />
                  </button>
                )}
                {hasPhotos && (
                  <button
                    type="button"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent(GALLERY_FILTER_EVENT, { detail: service.galleryTag }))
                      scrollToId('galeria')
                    }}
                    className="inline-flex items-center gap-1.5 h-10 px-3 text-[13px] font-semibold text-brand hover:underline"
                  >
                    <Images size={15} /> Ver fotos
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ServicesSection({ galleryTags = [] }: { galleryTags?: string[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="bg-surface py-24" id="servicos">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="O que fazemos"
          title="Serviços completos em climatização"
          subtitle="Do residencial ao industrial — atendimento direto com o profissional, garantia em todos os serviços."
        />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense gap-5">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              hasPhotos={!!s.galleryTag && galleryTags.includes(s.galleryTag)}
              open={openId === s.id}
              onToggle={() => setOpenId((cur) => (cur === s.id ? null : s.id))}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
