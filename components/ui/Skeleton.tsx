import { cn } from '@/lib/utils/cn'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded bg-gray-200',
        className
      )}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}
