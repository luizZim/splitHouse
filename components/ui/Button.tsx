import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/whatsapp'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'whatsapp' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer border-0 font-sans'

  const variants = {
    primary: 'bg-accent text-white hover:shadow-[0_8px_32px_rgba(247,148,29,.45)] hover:-translate-y-0.5',
    whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark hover:shadow-[0_8px_28px_rgba(37,211,102,.5)] hover:-translate-y-0.5',
    outline: 'bg-transparent text-brand border-2 border-brand hover:bg-brand hover:text-white',
    ghost: 'bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/15',
  }

  const sizes = {
    sm: 'text-[13px] h-10 px-4',
    md: 'text-[15px] h-[52px] px-7',
    lg: 'text-[16px] h-14 px-8',
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

export const WA_BASE =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg bg-whatsapp text-white hover:bg-whatsapp-dark hover:shadow-[0_8px_28px_rgba(37,211,102,.5)] hover:-translate-y-0.5 transition-all duration-200 font-sans'

export const WA_SIZES = {
  sm: 'text-[13px] h-10 px-4',
  md: 'text-[15px] h-[52px] px-7',
  lg: 'text-[16px] h-14 px-8',
} as const

export const WA_ICON_SIZE = { sm: 15, md: 17, lg: 20 } as const

function buildWAUrl(message?: string) {
  const text = message || 'Olá! Vim pelo site da Split House e gostaria de um orçamento.'
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

// Server-safe link version — works in Server Components and Client Components
export function WhatsAppButton({
  children,
  message,
  className,
  size = 'md',
}: {
  children?: ReactNode
  message?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <a
      href={buildWAUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(WA_BASE, WA_SIZES[size], className)}
    >
      <MessageCircle size={WA_ICON_SIZE[size]} />
      {children ?? 'Falar no WhatsApp'}
    </a>
  )
}
