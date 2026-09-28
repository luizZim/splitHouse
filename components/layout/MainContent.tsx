'use client'

import { usePathname } from 'next/navigation'

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return (
    <main className={isHome ? '' : 'pt-[88px]'}>
      {children}
    </main>
  )
}
