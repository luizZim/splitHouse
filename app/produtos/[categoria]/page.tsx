import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { WhatsAppButton } from '@/components/ui/Button'
import { PRODUCT_CATEGORIES, PRODUCTS } from '@/lib/data/products'
import { buildProductMessage } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ categoria: string }>
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((cat) => ({ categoria: cat.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === categoria)
  return { title: cat ? `${cat.label} — Split House` : 'Produto' }
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === categoria)
  if (!cat) notFound()

  const models = PRODUCTS[cat.id] ?? []

  return (
    <div>
      <PageHeader label="Catálogo" title={cat.label} subtitle={cat.desc} />

      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand mb-8"
          >
            <ChevronLeft size={16} /> Voltar aos produtos
          </Link>

          <div className="flex flex-col gap-4">
            {models.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-xl p-5 md:p-6 shadow-[0_2px_12px_rgba(46,49,146,.08)] flex items-center gap-5 flex-wrap"
              >
                <div
                  className={`w-18 h-18 rounded-xl bg-gradient-to-br ${cat.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <ACIllustration color={cat.accent} size={40} />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div
                    className="text-[11px] font-bold uppercase tracking-[0.08em] mb-0.5"
                    style={{ color: cat.accent }}
                  >
                    {m.brand}
                  </div>
                  <div className="text-base font-bold text-[#1A1A2E] mb-1">{m.name}</div>
                  <div className="flex gap-3 flex-wrap text-[12px] text-gray-500">
                    <span>{m.btu} BTU</span>
                    <span>·</span>
                    <span>{m.type}</span>
                    <span>·</span>
                    <span className="text-green-600 font-semibold">Eficiência {m.energy}</span>
                  </div>
                </div>
                <div className="flex gap-2.5 flex-shrink-0">
                  <Link
                    href={`/produtos/${cat.id}/${m.id}`}
                    className="inline-flex items-center gap-1.5 bg-[#EEF0FC] text-brand text-[13px] font-semibold rounded-lg px-4 py-2.5 hover:bg-brand hover:text-white transition-colors"
                  >
                    Ver detalhes
                  </Link>
                  <WhatsAppButton
                    message={buildProductMessage(m.name, m.btu)}
                    size="sm"
                  >
                    Orçamento
                  </WhatsAppButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
