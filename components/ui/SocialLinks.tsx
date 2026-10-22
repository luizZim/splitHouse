import { Facebook, Instagram } from 'lucide-react'
import { SOCIAL } from '@/lib/site'
import { cn } from '@/lib/utils/cn'

const LINKS = [
  { href: SOCIAL.instagram, label: 'Instagram da Split House', icon: Instagram },
  { href: SOCIAL.facebook, label: 'Facebook da Split House', icon: Facebook },
]

/** Ícones das redes sociais. `variant="dark"` para fundos escuros. */
export function SocialLinks({ variant = 'dark', className }: { variant?: 'dark' | 'light'; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {LINKS.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200',
            variant === 'dark'
              ? 'bg-white/10 border border-white/15 text-white/80 hover:bg-white hover:text-brand'
              : 'bg-[#EEF0FC] text-brand hover:bg-brand hover:text-white'
          )}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  )
}
