'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, PlugZap, ShoppingBag, Wrench, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal } from '@/components/ui/Reveal'
import { fadeUp } from '@/lib/motion'

const SERVICE_CARDS = [
  { icon: PlugZap, title: 'Instalação', desc: 'Instalação profissional de splits residenciais e comerciais com garantia total do serviço.' },
  { icon: Wrench, title: 'Manutenção', desc: 'Preventiva e corretiva. Limpeza, higienização e revisão completa para máxima eficiência.' },
  { icon: ShoppingBag, title: 'Revenda', desc: 'Venda e distribuição de equipamentos das melhores marcas com preço de distribuidor.' },
  { icon: Building2, title: 'Mini VRF', desc: 'Instalação de sistemas multi-split Mini VRF para escritórios, lojas e edifícios comerciais.' },
]

function ServiceCard({ service }: { service: typeof SERVICE_CARDS[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group bg-white rounded-xl p-7 shadow-[0_2px_12px_rgba(46,49,146,.08)] hover:shadow-[0_8px_32px_rgba(46,49,146,.14)] hover:-translate-y-0.5 border-[1.5px] border-transparent hover:border-[#EEF0FC] transition-all duration-250 cursor-pointer"
    >
      <Link href="/servicos" className="block">
        <IconBadge icon={service.icon} className="mb-4" />
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
    <section className="bg-surface py-24" id="servicos">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="O que fazemos"
          title="Serviços completos em climatização"
          subtitle="Do residencial ao industrial — atendimento direto com o profissional, garantia em todos os serviços."
        />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_CARDS.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
