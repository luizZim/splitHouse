'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

const SERVICES_LINKS = ['Instalação', 'Manutenção', 'Revenda', 'Mini VRF']
const PRODUCT_LINKS = ['Split Hi-Wall', 'Mini VRF', 'Piso Teto', 'Cassete', 'Splitão']

export function Footer() {
  return (
    <footer className="bg-brand-darker pt-18 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/logo-full.png"
              alt="Split House"
              width={160}
              height={80}
              className="h-20 w-auto object-contain mb-2.5 brightness-[10]"
            />
            <p className="text-sm text-white/50 leading-relaxed max-w-[260px] mb-5">
              Mais de 13 anos instalando e mantendo sistemas de ar condicionado em Cascavel e região do Paraná.
            </p>
            <FooterWhatsAppBtn />
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Serviços</p>
            {SERVICES_LINKS.map((s) => (
              <Link
                key={s}
                href="/servicos"
                className="block text-[13px] text-white/55 mb-2.5 hover:text-accent transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>

          {/* Products */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Produtos</p>
            {PRODUCT_LINKS.map((p) => (
              <Link
                key={p}
                href="/produtos"
                className="block text-[13px] text-white/55 mb-2.5 hover:text-accent transition-colors"
              >
                {p}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Contato</p>
            {[
              { icon: '📍', text: 'Cascavel, Paraná, Brasil' },
              { icon: '⏰', text: 'Seg – Sáb: 8h às 18h' },
              { icon: '📞', text: '(45) 9 9999-0000' },
            ].map((c) => (
              <div key={c.text} className="flex items-start gap-2 text-[13px] text-white/55 mb-2.5">
                <span className="text-xs mt-0.5">{c.icon}</span>
                {c.text}
              </div>
            ))}
            <span className="inline-flex items-center gap-1 bg-white/[.06] border border-white/10 rounded-full px-3 py-1 text-[11px] text-white/40 mt-3">
              Cascavel e região
            </span>
          </div>
        </div>

        <hr className="border-white/[.07] mb-7" />

        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-xs text-white/25">© 2026 Split House. Todos os direitos reservados.</p>
          <p className="text-xs text-white/25">Cascavel – PR · Climatização com qualidade</p>
        </div>
      </div>
    </footer>
  )
}

function FooterWhatsAppBtn() {
  return (
    <button
      onClick={() => openWhatsApp()}
      className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white text-[13px] font-semibold rounded-lg px-4 py-2.5 transition-colors"
    >
      <MessageCircle size={14} /> (45) 9 9999-0000
    </button>
  )
}
