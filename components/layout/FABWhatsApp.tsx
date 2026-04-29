'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

export function FABWhatsApp() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-2">
      {hovered && (
        <div className="bg-brand-darker text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          Fale no WhatsApp
        </div>
      )}
      <button
        onClick={() => openWhatsApp()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Abrir WhatsApp"
        className="w-[58px] h-[58px] rounded-full bg-whatsapp flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,.6)] hover:scale-110 transition-all duration-200 border-0"
      >
        <MessageCircle size={26} color="#fff" />
      </button>
    </div>
  )
}
