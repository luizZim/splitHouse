import { PageHeader } from '@/components/ui/PageHeader'
import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div>
      <PageHeader
        label="O que fazemos"
        title="Nossos Serviços"
        subtitle="Atendimento completo em climatização — do residencial ao industrial."
      />
      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(46,49,146,.08)]"
              >
                <Skeleton className="h-1 w-full rounded-none" />
                <div className="flex items-start gap-5 p-7">
                  <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-3 w-full max-w-[480px]" />
                    <Skeleton className="h-3 w-full max-w-[360px]" />
                  </div>
                  <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
