'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { NAVBAR_OFFSET, scrollToId } from '@/lib/navigation/scroll'
import { activeSectionAt } from '@/lib/navigation/scrollSpy'
import { cn } from '@/lib/utils/cn'

const BASE_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Simulador', href: '/#simulador' },
  { label: 'Produtos', href: '/#produtos' },
  { label: 'Galeria', href: '/#galeria' },
  { label: 'Contato', href: '/#contato' },
]

function getHashId(href: string) {
  return href.includes('#') ? href.split('#')[1] : null
}

export function Navbar({ hasGallery = false }: { hasGallery?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pendingScroll = useRef<string | 'top' | null>(null)
  /** Pausa o scroll-spy enquanto a rolagem disparada por clique acontece. */
  const spyLocked = useRef(false)

  const NAV_ITEMS = BASE_ITEMS.filter((i) => hasGallery || i.href !== '/#galeria')
  const sectionIds = NAV_ITEMS.map((i) => getHashId(i.href)).filter((id): id is string => !!id)
  const sectionKey = sectionIds.join(',')

  useEffect(() => {
    if (!isHome) setActiveSection(null)
  }, [isHome])

  useEffect(() => {
    if (!isHome) return
    const ids = sectionKey.split(',')
    let frame = 0
    function update() {
      frame = 0
      if (spyLocked.current) return
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }))
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      setActiveSection(activeSectionAt(sections, NAVBAR_OFFSET + window.innerHeight * 0.25, atBottom))
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isHome, sectionKey])

  function scrollLocked(id: string | null) {
    spyLocked.current = true
    scrollToId(id, () => {
      spyLocked.current = false
    })
  }

  useEffect(() => {
    if (isHome && pendingScroll.current) {
      const raw = pendingScroll.current
      pendingScroll.current = null
      const target = raw === 'top' ? null : raw
      setActiveSection(target)
      requestAnimationFrame(() => scrollLocked(target))
    }
  }, [isHome])

  function handleNavClick(e: React.MouseEvent, href: string) {
    e.preventDefault()
    const id = getHashId(href)
    setMenuOpen(false)
    setHovered(null)
    setActiveSection(id)

    if (isHome) {
      scrollLocked(id)
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

        {/* Hamburger (mobile) / espaçador que mantém o menu centralizado */}
        <div className="flex items-center gap-3 md:w-[120px] md:justify-end">
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
