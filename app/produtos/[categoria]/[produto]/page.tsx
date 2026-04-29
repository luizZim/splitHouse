import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { WhatsAppButton } from '@/components/ui/Button'
import { PRODUCT_CATEGORIES, PRODUCTS } from '@/lib/data/products'

interface Props {
  params: Promise<{ categoria: string; produto: string }>
}

export async function generateStaticParams() {
  return PRODUCT_CATEGORIES.flatMap((cat) =>
    (PRODUCTS[cat.id] ?? []).map((p) => ({ categoria: cat.id, produto: p.id }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria, produto } = await params
  const model = (PRODUCTS[categoria] ?? []).find((p) => p.id === produto)
  return { title: model ? `${model.name} — Split House` : 'Produto' }
}

export default async function ProdutoPage({ params }: Props) {
  const { categoria, produto } = await params
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === categoria)
  const model = (PRODUCTS[categoria] ?? []).find((p) => p.id === produto)

  if (!cat || !model) notFound()

  const specs = [
    { label: 'Capacidade', value: `${model.btu} BTU/h` },
    { label: 'Tipo', value: model.type },
    { label: 'Marca', value: model.brand },
    { label: 'Eficiência', value: `Classificação ${model.energy}` },
    { label: 'Indicação', value: model.use },
    { label: 'Atendimento', value: 'Cascavel e região do Paraná' },
  ]

  return (
    <div>
      <PageHeader label={cat.label} title={model.name} />

      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <Link
            href={`/produtos/${cat.id}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand mb-8"
          >
            <ChevronLeft size={16} /> Voltar à categoria
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
            {/* Image */}
            <div
              className={`bg-gradient-to-br ${cat.bg} rounded-2xl aspect-[4/3] flex items-center justify-center relative overflow-hidden`}
            >
              <ACIllustration color={cat.accent} size={100} />
              <div className="absolute top-4 right-4 bg-green-600/90 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                Eficiência {model.energy}
              </div>
            </div>

            {/* Details */}
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1"
                style={{ color: cat.accent }}
              >
                {model.brand}
              </div>
              <h1 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-[#1A1A2E] tracking-tight mb-2">
                {model.name}
              </h1>
              <div className="text-[1.5rem] font-bold text-brand mb-5">{model.btu} BTU/h</div>
              <p className="text-[14px] text-gray-500 leading-[1.7] mb-6">
                <strong className="text-[#1A1A2E]">Indicação de uso:</strong> {model.use}
              </p>

              {/* Specs table */}
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-6">
                {specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex px-5 py-3.5 ${i < specs.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-[13px] text-gray-500 flex-[0_0_140px]">{s.label}</span>
                    <span className="text-[13px] font-semibold text-[#1A1A2E] flex-1">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <WhatsAppButton
                  message={`Olá! Tenho interesse no ${model.name} (${model.btu} BTU). Gostaria de um orçamento completo com instalação.`}
                  className="w-full"
                  size="md"
                >
                  Solicitar orçamento com instalação
                </WhatsAppButton>
                <WhatsAppButton
                  message={`Olá! Tenho interesse no ${model.name}. Pode me informar mais detalhes?`}
                  className="w-full bg-[#EEF0FC] text-brand hover:bg-brand hover:text-white"
                  size="md"
                >
                  Tirar dúvidas antes de comprar
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
