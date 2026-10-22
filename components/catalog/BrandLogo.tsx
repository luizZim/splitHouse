import Image from 'next/image'
import type { Brand } from '@/lib/catalog/types'
import { cn } from '@/lib/utils/cn'

export function BrandLogo({ brand, className }: { brand: Brand; className?: string }) {
  if (!brand.logo) {
    return <span className={cn('text-[12px] font-bold uppercase tracking-wide', className)}>{brand.name}</span>
  }
  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={96}
      height={32}
      className={cn('h-5 w-auto object-contain', className)}
    />
  )
}
