'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { InstallModal } from '@/components/catalog/InstallModal'
import { WA_BASE, WA_SIZES } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { formatBtu } from '@/lib/catalog/select'
import type { InstallInfo } from '@/lib/catalog/install'
import { buildQuoteMessage, openWhatsApp, type QuoteSelection } from '@/lib/whatsapp'

type Step = 'idle' | 'ask' | 'form'

export function QuoteFlow({ selection }: { selection: QuoteSelection }) {
  const [step, setStep] = useState<Step>('idle')
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (step !== 'ask') return
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setStep('idle')
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setStep('idle')
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [step])

  const close = useCallback(() => setStep('idle'), [])

  function sendWithoutInstall() {
    openWhatsApp(buildQuoteMessage(selection))
    setStep('idle')
  }

  function sendWithInstall(info: InstallInfo) {
    openWhatsApp(buildQuoteMessage(selection, info))
    setStep('idle')
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setStep((s) => (s === 'ask' ? 'idle' : 'ask'))}
        aria-haspopup="dialog"
        aria-expanded={step === 'ask'}
        className={cn(WA_BASE, WA_SIZES.md, 'w-full')}
      >
        <MessageCircle size={17} /> Solicitar orçamento
      </button>

      <AnimatePresence>
        {step === 'ask' && (
          <motion.div
            role="dialog"
            aria-label="Orçamento de instalação"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-3 left-0 right-0 sm:left-auto sm:w-[340px] z-30 bg-white rounded-xl shadow-[0_12px_40px_rgba(46,49,146,.2)] border border-brand/10 p-4 origin-bottom"
          >
            <p className="text-[14px] font-semibold text-[#1A1A2E] mb-3">
              Deseja solicitar também o orçamento de instalação?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setStep('form')}
                className="flex-1 h-10 rounded-lg bg-brand text-white text-[13px] font-semibold hover:bg-brand-dark transition-colors"
              >
                Sim
              </button>
              <button
                type="button"
                onClick={sendWithoutInstall}
                className="flex-1 h-10 rounded-lg bg-[#EEF0FC] text-brand text-[13px] font-semibold hover:bg-brand hover:text-white transition-colors"
              >
                Não, só o aparelho
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InstallModal
        open={step === 'form'}
        summary={`${selection.brandName} ${selection.lineName} · ${formatBtu(selection.btu)} BTU`}
        onClose={close}
        onSubmit={sendWithInstall}
      />
    </div>
  )
}
