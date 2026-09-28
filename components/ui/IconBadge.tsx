import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface IconBadgeProps {
  icon: LucideIcon
  active?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function IconBadge({ icon: Icon, active, size = 'md', className }: IconBadgeProps) {
  const box = size === 'md' ? 'w-[52px] h-[52px]' : 'w-9 h-9'
  const iconSize = size === 'md' ? 22 : 17

  return (
    <div
      className={cn(
        box,
        'rounded-xl flex items-center justify-center shrink-0',
        'bg-[#EEF0FC] text-brand transition-colors duration-200',
        'group-hover:bg-brand group-hover:text-white',
        active && 'bg-brand text-white',
        className
      )}
    >
      <Icon size={iconSize} />
    </div>
  )
}
