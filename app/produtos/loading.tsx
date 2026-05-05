import { PageHeader } from '@/components/ui/PageHeader'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
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
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
