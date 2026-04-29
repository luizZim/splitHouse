'use client'

import { ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const waBase =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg bg-whatsapp text-white hover:bg-whatsapp-dark hover:shadow-[0_8px_28px_rgba(37,211,102,.5)] hover:-translate-y-0.5 transition-all duration-200 font-sans cursor-pointer border-0'

const waSizes = {
  sm: 'text-[13px] h-10 px-4',
  md: 'text-[15px] h-[52px] px-7',
  lg: 'text-[16px] h-14 px-8',
}

const WA_SIZES = { sm: 15, md: 17, lg: 20 } as const

export function ClientWhatsAppButton({
  children,
  onClick,
  className,
  size = 'md',
}: {
  children?: ReactNode
  onClick: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(waBase, waSizes[size], className)}
    >
      <MessageCircle size={WA_SIZES[size]} />
      {children ?? 'Falar no WhatsApp'}
    </button>
  )
}
