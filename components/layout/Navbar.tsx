'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { openWhatsApp } from '@/lib/whatsapp'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Simulador', href: '/#simulador' },
  { label: 'Produtos', href: '/#produtos' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
]

const NAVBAR_OFFSET = 96

function getHashId(href: string) {
  return href.includes('#') ? href.split('#')[1] : null
}

const SCROLL_DURATION = 1100

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4)
}

function animateScrollTo(targetY: number, onDone?: () => void) {
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / SCROLL_DURATION, 1)
    window.scrollTo(0, startY + distance * easeOutQuart(progress))
    if (progress < 1) requestAnimationFrame(step)
    else onDone?.()
  }

  requestAnimationFrame(step)
}

function scrollToId(id: string | null, onDone?: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!id) {
        animateScrollTo(0, onDone)
        return
      }
      const el = document.getElementById(id)
      if (!el) {
        onDone?.()
        return
      }
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
      animateScrollTo(top, onDone)
    })
  })
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pendingScroll = useRef<string | 'top' | null>(null)

  useEffect(() => {
    if (!isHome) setActiveSection(null)
  }, [isHome])

  useEffect(() => {
    if (isHome && pendingScroll.current) {
      const raw = pendingScroll.current
      pendingScroll.current = null
      const target = raw === 'top' ? null : raw
      scrollToId(target)
    }
  }, [isHome])

  function handleNavClick(e: React.MouseEvent, href: string) {
    e.preventDefault()
    const id = getHashId(href)
    setMenuOpen(false)
    setHovered(null)
    setActiveSection(id)

    if (isHome) {
      scrollToId(id)
      window.history.replaceState(null, '', id ? `/#${id}` : '/')
    } else {
      pendingScroll.current = id ?? 'top'
      router.push('/')
    }
  }

  const overlay = isHome && !scrolled && !menuOpen
  const activeHref = !isHome ? undefined : activeSection ? `/#${activeSection}` : '/'
  const pillTarget = hovered ?? activeHref

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[88px] flex items-center transition-all duration-500',
        overlay
          ? 'bg-transparent'
          : 'bg-white/75 backdrop-blur-xl border-b border-brand/[0.07] shadow-[0_1px_20px_rgba(46,49,146,.05)]'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="h-full flex items-center group">
          <Image
            src="/logo-only.png"
            alt="Split House"
            width={1066}
            height={315}
            className={cn(
              'h-[48px] w-auto object-contain transition-all duration-300 group-hover:scale-105',
              overlay ? 'brightness-[10]' : ''
            )}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div
          className={cn(
            'hidden md:flex items-center gap-1 rounded-full p-1.5 border transition-colors duration-500',
            overlay ? 'bg-white/10 border-white/15 backdrop-blur-sm' : 'bg-brand/[0.04] border-brand/10'
          )}
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === activeHref
            const showPill = item.href === pillTarget

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'relative px-4 py-2 rounded-full text-[14px] font-medium transition-colors duration-200 flex items-center gap-1.5',
                  isActive
                    ? 'text-white'
                    : overlay
                      ? 'text-white/75 hover:text-white'
                      : 'text-gray-600 hover:text-brand'
                )}
              >
                {showPill && (
                  <motion.span
                    layoutId="navPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className={cn(
                      'absolute inset-0 rounded-full -z-10',
                      isActive
                        ? 'bg-brand'
                        : overlay
                          ? 'bg-white/15'
                          : 'bg-white shadow-[0_2px_10px_rgba(46,49,146,.14)]'
                    )}
                  />
                )}
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openWhatsApp()}
            className="hidden sm:inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white text-sm font-semibold rounded-full px-5 h-[44px] transition-colors duration-200 shadow-[0_4px_16px_rgba(37,211,102,.3)] hover:shadow-[0_6px_20px_rgba(37,211,102,.4)]"
          >
            <MessageCircle size={15} />
            Fale no WhatsApp
          </motion.button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              'md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200',
              overlay ? 'text-white hover:bg-white/10' : 'text-brand hover:bg-brand/[0.06]'
            )}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute top-[88px] left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-brand/10 shadow-[0_12px_32px_rgba(46,49,146,.10)] px-6 py-5 flex flex-col gap-1 md:hidden"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === activeHref
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'flex items-center gap-2 text-[15px] font-medium py-3 px-3 rounded-lg transition-colors duration-200',
                    isActive ? 'bg-brand/[0.06] text-brand' : 'text-gray-600 hover:bg-brand/[0.04] hover:text-brand'
                  )}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  {item.label}
                </Link>
              )
            })}
            <button
              onClick={() => { openWhatsApp(); setMenuOpen(false) }}
              className="mt-3 flex items-center justify-center gap-2 bg-whatsapp text-white text-sm font-semibold rounded-full px-4 py-3.5"
            >
              <MessageCircle size={17} /> Falar no WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
