'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

const HIGHLIGHTS = [
  'Atendimento direto com quem executa',
  'Mais de 13 anos de experiência',
  'Orçamento transparente e sem surpresas',
  'Garantia em todos os serviços',
]

export function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-white py-24" id="sobre" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative flex justify-center"
          >
            <div className="bg-gradient-to-br from-[#EEF0FC] to-[#D4D8F7] rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative w-full">
              <Image
                src="/mascot.png"
                alt="Técnico Split House"
                width={260}
                height={310}
                className="w-[260px] h-auto object-contain"
              />
              <div className="absolute bottom-4 right-4 bg-accent rounded-full px-4 py-2 text-[13px] font-bold text-white">
                13+ anos
              </div>
            </div>
            <div className="absolute top-[-12px] left-[-12px] bg-brand text-white rounded-xl px-3.5 py-2.5 text-xs font-semibold shadow-[0_4px_16px_rgba(46,49,146,.2)]">
              Cascavel e região
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent mb-2.5">
              Sobre nós
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.4rem)] font-extrabold text-[#1A1A2E] tracking-tight mb-4">
              Você fala direto com{' '}
              <span className="text-brand">quem executa o serviço</span>
            </h2>
            <p className="text-[15px] text-gray-500 leading-[1.8] mb-6">
              Com mais de 13 anos de experiência em climatização, a Split House nasceu do compromisso com a qualidade e o atendimento direto. Não há intermediários — você fala, negocia e é atendido pelo próprio profissional.
            </p>
            <div className="flex flex-col gap-2.5 mb-7">
              {HIGHLIGHTS.map((h) => (
                <div key={h} className="flex items-center gap-2.5">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#EEF0FC] flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={12} className="text-brand" />
                  </div>
                  <span className="text-[14px] text-gray-700 font-medium">{h}</span>
                </div>
              ))}
            </div>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 bg-brand text-white text-[14px] font-semibold rounded-lg px-6 py-3 hover:bg-brand-dark transition-colors"
            >
              Conheça nossa história <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
