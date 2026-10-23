import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/ui/PageHeader'
import { BackButton } from '@/components/catalog/BackButton'
import { ProductConfigurator } from '@/components/catalog/ProductConfigurator'
import { BRANDS, PRODUCT_TYPES, getType, linesForType } from '@/lib/data/catalog'
import { withBrandLogos, withLineImages } from '@/lib/catalog/assets'

interface Props {
  params: Promise<{ tipo: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return PRODUCT_TYPES.map((t) => ({ tipo: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tipo } = await params
  const type = getType(tipo)
  return {
    title: type && `Ar Condicionado ${type.label}`,
    description: type?.summary,
    alternates: { canonical: `/produtos/${tipo}` },
  }
}

export default async function TipoPage({ params }: Props) {
  const { tipo } = await params
  const type = getType(tipo)
  const lines = linesForType(tipo)
  if (!type || lines.length === 0) notFound()

  return (
    <div>
      <PageHeader label="Catálogo" title={type.label} subtitle={type.summary} />
      <section className="bg-surface py-12">
        <div className="container mx-auto px-6">
          <BackButton />
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <ProductConfigurator type={type} lines={withLineImages(lines)} brands={withBrandLogos(BRANDS)} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
