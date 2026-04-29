import { cn } from '@/lib/utils/cn'

interface SectionHeaderProps {
  label: string
  title: string
  subtitle?: string
  light?: boolean
  className?: string
}

export function SectionHeader({ label, title, subtitle, light = false, className }: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-14', className)}>
      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent mb-2.5">
        {label}
      </span>
      <h2
        className={cn(
          'text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-3.5',
          light ? 'text-white' : 'text-[#1A1A2E]'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-base leading-relaxed max-w-[520px] mx-auto',
            light ? 'text-white/60' : 'text-gray-500'
          )}
        >
          {subtitle}
        </p>
      )}
      <span className="block w-10 h-1 bg-accent rounded-full mx-auto mt-3" />
    </div>
  )
}
