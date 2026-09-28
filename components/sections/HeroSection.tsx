'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { MapPin, CheckCircle, ChevronRight } from 'lucide-react'
import { WhatsAppButton } from '@/components/ui/Button'

const SnowCanvas = dynamic(
  () => import('./hero/SnowCanvas').then((m) => m.SnowCanvas),
  { ssr: false }
)

const STATS = [
  { num: '13', suffix: '+', label: 'Anos de experiência' },
  { num: '500', suffix: '+', label: 'Clientes atendidos' },
  { num: '100', suffix: '%', label: 'Atendimento direto' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-brand-darker via-brand-dark to-brand relative overflow-hidden pt-[88px]">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-[80%] bg-[radial-gradient(ellipse_80%_70%_at_60%_50%,rgba(41,171,226,.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Snow particles (wind) */}
      <SnowCanvas />

      <div className="container mx-auto px-6 relative z-10 w-full flex items-center justify-between gap-8 py-20">
        {/* Content */}
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-[580px] flex-1 relative z-10"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6">
              <MapPin size={12} />
              Cascavel e região do Paraná
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold text-white leading-[1.08] tracking-tight mb-5"
          >
            Instalação e Manutenção de Ar Condicionado{' '}
            <span className="text-accent">Sem Complicação</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1.1rem] text-white/70 leading-relaxed mb-9 max-w-[480px]"
          >
            Atendimento em Cascavel e região • +13 anos de experiência • Você fala direto com quem executa o serviço.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-3.5 flex-wrap mb-16"
          >
            <WhatsAppButton size="md">Falar no WhatsApp</WhatsAppButton>

            <Link
              href="/#simulador"
              className="inline-flex items-center gap-2 bg-white/10 text-white text-[15px] font-semibold border border-white/25 rounded-lg px-6 h-[52px] backdrop-blur-sm hover:bg-white/15 transition-all duration-200"
            >
              Simular BTU grátis
              <ChevronRight size={16} />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, delay: 0.6 }} className="flex gap-9">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-[2rem] font-extrabold text-white tracking-tight leading-none">
                  {s.num}
                  <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="text-xs text-white/55 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex flex-shrink-0 items-center justify-center relative z-10"
        >
          <div className="relative">
            <div className="absolute inset-[-20%] rounded-full bg-[radial-gradient(circle,rgba(41,171,226,.2)_0%,transparent_70%)] pointer-events-none" />
            <Image
              src="/mascot.png"
              alt="Técnico Split House"
              width={320}
              height={380}
              className="w-80 h-auto object-contain drop-shadow-2xl"
              priority
            />
            {/* Service badge */}
            <div className="absolute bottom-10 left-[-24px] z-20 bg-white rounded-xl px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,.2)] flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1A1A2E]">Serviço garantido</div>
                <div className="text-[11px] text-gray-500">Qualidade verificada</div>
              </div>
            </div>
            {/* Years badge */}
            <div className="absolute top-5 right-[-20px] z-20 bg-accent rounded-xl px-3.5 py-2 shadow-[0_4px_16px_rgba(247,148,29,.4)]">
              <div className="text-[13px] font-extrabold text-white">13+</div>
              <div className="text-[10px] text-white/85">anos</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
