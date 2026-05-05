import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div>
      <div className="bg-gradient-to-br from-brand-dark to-brand py-14 pt-20">
        <div className="container mx-auto px-6">
          <Skeleton className="h-3 w-24 mb-3 bg-white/10" />
          <Skeleton className="h-10 w-64 mb-3 bg-white/10" />
          <Skeleton className="h-4 w-96 bg-white/10" />
        </div>
      </div>
      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <Skeleton className="h-4 w-40 mb-8" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 md:p-6 shadow-[0_2px_12px_rgba(46,49,146,.08)] flex items-center gap-5 flex-wrap"
              >
                <Skeleton className="w-20 h-20 rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-[200px] space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-56" />
                  <Skeleton className="h-3 w-72" />
                </div>
                <div className="flex gap-2.5 flex-shrink-0">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
