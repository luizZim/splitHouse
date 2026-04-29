import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { WhatsAppButton } from '@/components/ui/Button'
import { PRODUCT_CATEGORIES, PRODUCTS } from '@/lib/data/products'

export const metadata: Metadata = {
  title: 'Produtos — Split House',
}

export default function ProdutosPage() {
  return (
    <div>
      <PageHeader
        label="Catálogo completo"
        title="Nossos Produtos"
        subtitle="Equipamentos para cada tipo de ambiente — residencial, comercial e industrial."
      />

      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/produtos/${cat.id}`}
                className="block bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(46,49,146,.08)] hover:shadow-[0_8px_32px_rgba(46,49,146,.14)] hover:-translate-y-0.5 transition-all duration-250"
              >
                <div className={`h-40 bg-gradient-to-br ${cat.bg} flex items-center justify-center relative`}>
                  <ACIllustration color={cat.accent} size={64} />
                  {cat.badge && (
                    <span className="absolute top-3 left-3 bg-brand/90 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {cat.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 pb-6">
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1"
                    style={{ color: cat.accent }}
                  >
                    {cat.label}
                  </div>
                  <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-brand flex items-center gap-1">
                      Ver modelos <ArrowRight size={14} />
                    </span>
                    <span className="text-[11px] text-gray-400">
                      {(PRODUCTS[cat.id] ?? []).length} modelos
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-12 bg-gradient-to-br from-[#EEF0FC] to-[#D4D8F7] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-base font-bold text-brand mb-1.5">Não encontrou o que procura?</p>
              <p className="text-[14px] text-gray-500">
                Fale conosco — trabalhamos com todas as marcas e podemos conseguir qualquer modelo.
              </p>
            </div>
            <WhatsAppButton
              message="Olá! Gostaria de informações sobre produtos de ar condicionado."
              className="flex-shrink-0"
            >
              Consultar disponibilidade
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </div>
  )
}
