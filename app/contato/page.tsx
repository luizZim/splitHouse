import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { WhatsAppButton } from '@/components/ui/Button'
import { ContatoForm } from '@/components/forms/ContatoForm'

export const metadata: Metadata = {
  title: 'Contato — Split House',
}

const CONTACT_INFO = [
  { label: 'Localização', value: 'Cascavel, Paraná, Brasil' },
  { label: 'Atendimento', value: 'Cascavel e região do Paraná' },
  { label: 'Horário', value: 'Seg – Sáb: 8h às 18h' },
  { label: 'Telefone', value: '(45) 9 9999-0000' },
]

export default function ContatoPage() {
  return (
    <div>
      <PageHeader
        label="Fale conosco"
        title="Contato"
        subtitle="Atendimento em Cascavel e região do Paraná."
      />

      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: WhatsApp + Info */}
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(46,49,146,.08)] border-2 border-whatsapp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#1A1A2E]">WhatsApp</div>
                    <div className="text-[13px] text-gray-500">Resposta rápida</div>
                  </div>
                </div>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                  A forma mais rápida de falar conosco. Atendemos de segunda a sábado, das 8h às 18h. Urgências são atendidas o mais rápido possível.
                </p>
                <WhatsAppButton className="w-full" size="md">
                  Falar no WhatsApp agora
                </WhatsAppButton>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(46,49,146,.08)]">
                {CONTACT_INFO.map((c, i) => (
                  <div
                    key={c.label}
                    className={`flex gap-4 py-3 ${i < CONTACT_INFO.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-gray-400 flex-[0_0_100px] mt-0.5">
                      {c.label}
                    </span>
                    <span className="text-[14px] text-[#1A1A2E] font-medium">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <ContatoForm />
          </div>
        </div>
      </section>
    </div>
  )
}
