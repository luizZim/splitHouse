'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { Reveal } from '@/components/ui/Reveal'
import { BrandLogo } from '@/components/catalog/BrandLogo'
import { fadeUp } from '@/lib/motion'
import { rememberHomeScroll } from '@/lib/navigation/homeReturn'
import { capacitiesFor, formatBtu } from '@/lib/catalog/select'
import { linesForType } from '@/lib/data/catalog'
import type { Brand, ProductType } from '@/lib/catalog/types'

function TypeCard({ type, brands }: { type: ProductType; brands: Brand[] }) {
  const lines = linesForType(type.id)
  const caps = capacitiesFor(lines)
  const typeBrands = brands.filter((b) => lines.some((l) => l.brand === b.id))

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/produtos/${type.id}`}
        onClick={() => rememberHomeScroll(`/produtos/${type.id}`, window.scrollY)}
        className="group block bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(46,49,146,.08)] hover:shadow-[0_8px_32px_rgba(46,49,146,.14)] hover:-translate-y-0.5 border-[1.5px] border-transparent hover:border-[#EEF0FC] transition-all duration-250"
      >
        <div className={`h-[180px] bg-gradient-to-br ${type.bg} flex items-center justify-center relative overflow-hidden`}>
          {type.cover ? (
            <>
              <Image
                src={type.cover}
                alt={`${type.label} instalado — ${type.idealFor.slice(0, 2).join(', ').toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
            </>
          ) : (
            <ACIllustration color={type.accent} />
          )}
          {type.badge && (
            <span className="absolute top-2.5 left-2.5 bg-brand/90 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
              {type.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1 text-brand">{type.label}</div>
          <div className="text-xs text-gray-400 mb-3">
            {formatBtu(caps[0])}–{formatBtu(caps[caps.length - 1])} BTU
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4 text-gray-500">
            {typeBrands.map((b) => (
              <BrandLogo key={b.id} brand={b} className="h-4 text-[10px]" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
            Escolher modelo <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProductsSection({ types, brands }: { types: ProductType[]; brands: Brand[] }) {
  return (
    <section className="bg-white py-24" id="produtos">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Catálogo"
          title="Equipamentos para cada necessidade"
          subtitle="Escolha o tipo, a capacidade e a marca — e peça seu orçamento direto no WhatsApp."
        />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map((t) => (
            <TypeCard key={t.id} type={t} brands={brands} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
