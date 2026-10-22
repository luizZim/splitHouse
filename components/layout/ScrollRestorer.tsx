'use client'

import { useEffect } from 'react'
import { consumeRestore } from '@/lib/navigation/homeReturn'

export function ScrollRestorer() {
  useEffect(() => {
    const y = consumeRestore()
    if (y === null) return
    requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }))
  }, [])
  return null
}
