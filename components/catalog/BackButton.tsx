'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { canGoBackHome, requestRestore } from '@/lib/navigation/homeReturn'

export function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onPop = () => requestRestore(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function goBack() {
    if (canGoBackHome(pathname)) {
      requestRestore('/')
      router.back()
    } else {
      router.push('/#produtos')
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand mb-8 hover:gap-2.5 transition-all"
    >
      <ChevronLeft size={16} /> Voltar aos produtos
    </button>
  )
}
