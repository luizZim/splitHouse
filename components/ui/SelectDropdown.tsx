'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface Option {
  value: string
  label: string
}

interface SelectDropdownProps {
  options: readonly Option[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SelectDropdown({ options, value, onChange, className }: SelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 pl-3.5 pr-3 py-3 font-sans text-[14px] border-[1.5px] border-gray-300 rounded-lg outline-none text-[#1A1A2E] bg-white transition-colors focus:border-brand cursor-pointer"
      >
        {selected?.label}
        <ChevronDown
          size={18}
          className={cn('text-brand transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-20 mt-1.5 w-full bg-white rounded-lg shadow-[0_8px_32px_rgba(46,49,146,.14)] border border-gray-200 overflow-hidden py-1"
          >
            {options.map((o) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 text-[14px] font-sans cursor-pointer transition-colors',
                  o.value === value ? 'bg-[#EEF0FC] text-brand font-semibold' : 'text-gray-600 hover:bg-surface'
                )}
              >
                {o.label}
                {o.value === value && <Check size={15} />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
