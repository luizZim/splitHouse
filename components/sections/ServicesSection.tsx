'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

function InstalacaoIcon({ color = '#2E3192' }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="8" width="22" height="14" rx="3" stroke={color} strokeWidth="2" fill="none" />
      <line x1="6" y1="12" x2="6" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10" y1="12" x2="10" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="14" y1="12" x2="14" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="19.5" cy="15" r="2" fill={color} opacity=".6" />
      <circle cx="6" cy="8" r="2" fill={color} />
      <circle cx="18" cy="8" r="2" fill={color} />
      <path d="M28 5 L24 15 L27 15 L23 27" stroke="#F7941D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ManutencaoIcon({ color = '#2E3192' }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="6" width="18" height="11" rx="2.5" stroke={color} strokeWidth="1.8" fill="none" />
      <line x1="5.5" y1="9.5" x2="5.5" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8.5" y1="9.5" x2="8.5" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11.5" y1="9.5" x2="11.5" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15.5" cy="11.5" r="1.5" fill={color} opacity=".5" />
      <path d="M3 20 Q8 18 13 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".5" />
      <g transform="translate(16, 14) rotate(-40)">
        <rect x="1.5" y="0" width="4" height="16" rx="2" fill="#F7941D" />
        <path d="M0 1.5 Q3.5 -3 7 1.5 Q5 3 3.5 3 Q2 3 0 1.5Z" fill="#F7941D" />
        <path d="M0.5 14.5 Q3.5 18.5 6.5 14.5 Q5 13 3.5 13 Q2 13 0.5 14.5Z" fill="#F7941D" />
      </g>
    </svg>
  )
}

function RevendaIcon({ color = '#2E3192' }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path d="M4 12 L16 6 L28 12 L28 26 L4 26 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <line x1="4" y1="12" x2="28" y2="12" stroke={color} strokeWidth="1.5" />
      <line x1="16" y1="6" x2="16" y2="12" stroke={color} strokeWidth="1.5" />
      <rect x="9" y="15" width="14" height="8" rx="2" fill={color} fillOpacity=".15" stroke={color} strokeWidth="1.5" />
      <line x1="11.5" y1="17" x2="11.5" y2="20.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="14" y1="17" x2="14" y2="20.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="27" cy="5" r="4.5" fill="#F7941D" />
      <text x="27" y="8.5" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="800">$</text>
    </svg>
  )
}

function MiniVRFIcon({ color = '#2E3192' }: { color?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect x="11" y="18" width="10" height="10" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="16" cy="23" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="23" r="1" fill={color} />
      <line x1="11" y1="20" x2="5" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="24" x2="5" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="20" x2="27" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="24" x2="27" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="18" x2="16" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="1" y="11" width="9" height="6" rx="1.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity=".1" />
      <line x1="3" y1="13" x2="3" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="13" x2="5" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <rect x="22" y="11" width="9" height="6" rx="1.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity=".1" />
      <line x1="24" y1="13" x2="24" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="26" y1="13" x2="26" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <rect x="11.5" y="4" width="9" height="6" rx="1.5" stroke="#F7941D" strokeWidth="1.5" fill="#F7941D" fillOpacity=".1" />
      <line x1="13.5" y1="6" x2="13.5" y2="8" stroke="#F7941D" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="15.5" y1="6" x2="15.5" y2="8" stroke="#F7941D" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

const SERVICE_CARDS = [
  { icon: InstalacaoIcon, title: 'Instalação', desc: 'Instalação profissional de splits residenciais e comerciais com garantia total do serviço.' },
  { icon: ManutencaoIcon, title: 'Manutenção', desc: 'Preventiva e corretiva. Limpeza, higienização e revisão completa para máxima eficiência.' },
  { icon: RevendaIcon, title: 'Revenda', desc: 'Venda e distribuição de equipamentos das melhores marcas com preço de distribuidor.' },
  { icon: MiniVRFIcon, title: 'Mini VRF', desc: 'Instalação de sistemas multi-split Mini VRF para escritórios, lojas e edifícios comerciais.' },
]

function ServiceCard({ service, index }: { service: typeof SERVICE_CARDS[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const IconComponent = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-white rounded-xl p-7 shadow-[0_2px_12px_rgba(46,49,146,.08)] hover:shadow-[0_8px_32px_rgba(46,49,146,.14)] hover:-translate-y-0.5 border-[1.5px] border-transparent hover:border-[#EEF0FC] transition-all duration-250 cursor-pointer"
    >
      <Link href="/servicos" className="block">
        <div className="w-[52px] h-[52px] rounded-xl bg-[#EEF0FC] group-hover:bg-brand flex items-center justify-center mb-4 transition-colors duration-200">
          <IconComponent color="#2E3192" />
        </div>
        <div className="w-8 h-0.5 bg-accent rounded-full mb-3" />
        <h3 className="text-base font-bold text-[#1A1A2E] mb-2">{service.title}</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed">{service.desc}</p>
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand mt-3.5 group-hover:gap-2 transition-all">
          Saiba mais <ArrowRight size={14} />
        </span>
      </Link>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="O que fazemos"
          title="Serviços completos em climatização"
          subtitle="Do residencial ao industrial — atendimento direto com o profissional, garantia em todos os serviços."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_CARDS.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
