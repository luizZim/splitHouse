'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppButton } from '@/components/ui/Button'
import { buildServiceMessage } from '@/lib/whatsapp'

const PROBLEMS = [
  {
    id: 'gelando',
    label: 'Não está gelando',
    icon: '🧊',
    causes: [
      'Gás refrigerante baixo ou vazio — precisa de recarga',
      'Filtros sujos bloqueando a circulação de ar',
      'Evaporador ou condensador com acúmulo de sujeira',
      'Problema no compressor ou no termostato',
    ],
  },
  {
    id: 'agua',
    label: 'Vazando água',
    icon: '💧',
    causes: [
      'Dreno de condensado entupido ou dobrado',
      'Filtros muito sujos causando congelamento',
      'Instalação fora de nível (inclinação errada)',
      'Bandeja de dreno com problema ou rachada',
    ],
  },
  {
    id: 'barulho',
    label: 'Fazendo barulho',
    icon: '🔊',
    causes: [
      'Suporte de fixação frouxo ou vibrando',
      'Peças internas soltas (tampas, parafusos)',
      'Acúmulo de sujeira nas pás do ventilador',
      'Compressor com desgaste — precisa de avaliação',
    ],
  },
]

export function DiagnosticSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const sel = PROBLEMS.find((p) => p.id === selected)

  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Diagnóstico"
          title="Seu ar condicionado está com problema?"
          subtitle="Clique no sintoma e veja as possíveis causas. Depois fale com a gente."
        />

        <div className="max-w-[720px] mx-auto">
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            {PROBLEMS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full border-2 text-[14px] font-semibold transition-all duration-200 font-sans ${
                  selected === p.id
                    ? 'border-brand bg-[#EEF0FC] text-brand shadow-[0_4px_16px_rgba(46,49,146,.12)]'
                    : 'border-gray-300 bg-white text-gray-500 hover:border-brand/40'
                }`}
              >
                <span className="text-xl">{p.icon}</span> {p.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {sel && (
              <motion.div
                key={sel.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(46,49,146,.10)] border-[1.5px] border-[#EEF0FC]"
              >
                <div className="text-[15px] font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                  <span className="text-[22px]">{sel.icon}</span>
                  Possíveis causas — {sel.label}
                </div>
                <div className="flex flex-col gap-2.5 mb-6">
                  {sel.causes.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 px-4 py-3 bg-surface rounded-lg border-l-[3px] border-brand"
                    >
                      <CheckCircle size={16} className="text-brand mt-0.5 flex-shrink-0" />
                      <span className="text-[14px] text-gray-700 leading-relaxed">{c}</span>
                    </div>
                  ))}
                </div>
                <WhatsAppButton
                  message={`Olá! Meu ar condicionado está com um problema: ${sel.label.toLowerCase()}. Preciso de ajuda.`}
                  className="w-full"
                >
                  Falar com técnico agora
                </WhatsAppButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
