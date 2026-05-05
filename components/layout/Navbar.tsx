'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, MessageCircle } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { openWhatsApp } from '@/lib/whatsapp'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Simulador', href: '/#simulador' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export function Navbar() {
  const pathname = usePathname()
  const transparent = pathname === '/'
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)

  const isDark = transparent && !scrolled
  const isGlass = transparent && !scrolled && !menuOpen

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300',
        isGlass
          ? 'bg-transparent shadow-none'
          : 'bg-white shadow-[0_2px_16px_rgba(46,49,146,.10)]'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="h-full flex items-center justify-center">
          <Image
            src="/logo-only.png"
            alt="Split House"
            width={64}
            height={64}
            className={cn(
              'h-16 w-auto object-contain translate-y-[2px] transition-all duration-300',
              isDark ? 'brightness-[10]' : ''
            )}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors duration-200 border-b-2 pb-0.5',
                isDark
                  ? 'text-white/80 hover:text-white border-transparent hover:border-accent'
                  : 'text-gray-500 hover:text-brand border-transparent hover:border-accent'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openWhatsApp()}
            className="hidden sm:inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white text-sm font-semibold rounded-lg px-4 h-[42px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(37,211,102,.35)]"
          >
            <MessageCircle size={15} />
            Fale no WhatsApp
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-1"
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={22} color={isDark ? '#fff' : '#2E3192'} />
            ) : (
              <Menu size={22} color={isDark ? '#fff' : '#2E3192'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white shadow-[0_8px_24px_rgba(46,49,146,.12)] px-6 py-4 flex flex-col gap-1 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[15px] font-medium text-brand-dark py-2.5 border-b border-gray-100 last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { openWhatsApp(); setMenuOpen(false) }}
            className="mt-3 flex items-center gap-2 bg-whatsapp text-white text-sm font-semibold rounded-lg px-4 py-3"
          >
            <MessageCircle size={17} /> Falar no WhatsApp
          </button>
        </div>
      )}
    </nav>
  )
}
