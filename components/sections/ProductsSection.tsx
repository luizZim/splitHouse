'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { Reveal } from '@/components/ui/Reveal'
import { fadeUp } from '@/lib/motion'
import { PRODUCT_CATEGORIES } from '@/lib/data/products'

function ProductCard({ cat }: { cat: typeof PRODUCT_CATEGORIES[0] }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/produtos/${cat.id}`}
        className="block bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(46,49,146,.08)] hover:shadow-[0_8px_32px_rgba(46,49,146,.14)] hover:-translate-y-0.5 border-[1.5px] border-transparent hover:border-[#EEF0FC] transition-all duration-250"
      >
        <div className={`h-[140px] bg-gradient-to-br ${cat.bg} flex items-center justify-center relative`}>
          <ACIllustration color={cat.accent} />
          {cat.badge && (
            <span className="absolute top-2.5 left-2.5 bg-brand/90 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
              {cat.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1 text-brand">
            {cat.label}
          </div>
          <div className="text-xs text-gray-400 mb-3">{cat.desc}</div>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
            Ver modelos <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProductsSection() {
  return (
    <section className="bg-white py-24" id="produtos">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Catálogo"
          title="Equipamentos para cada necessidade"
          subtitle="Residencial, comercial ou industrial — temos a solução certa para o seu espaço."
        />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCT_CATEGORIES.map((cat) => (
            <ProductCard key={cat.id} cat={cat} />
          ))}
        </Reveal>
        <div className="text-center mt-10">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 text-brand font-semibold text-[14px] border-[1.5px] border-brand rounded-lg px-6 py-3 hover:bg-brand hover:text-white transition-all duration-200"
          >
            Ver catálogo completo <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
