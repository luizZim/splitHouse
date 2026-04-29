import { MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export function TestimonialsSection() {
  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Depoimentos"
          title="O que nossos clientes dizem"
          subtitle="Atendimento direto, confiança e qualidade — clientes que recomendam."
        />
        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="min-w-[280px] max-w-[320px] flex-shrink-0 bg-white rounded-xl p-5.5 shadow-[0_2px_12px_rgba(46,49,146,.08)]"
            >
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full mb-3">
                <MessageCircle size={10} /> Via WhatsApp
              </span>
              <div className="text-accent text-sm tracking-[2px] mb-2.5">★★★★★</div>
              <p className="text-[13px] text-gray-700 leading-relaxed italic mb-3.5">
                <span className="text-accent text-xl leading-none align-[-6px] mr-0.5">"</span>
                {t.text}
              </p>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#1A1A2E] leading-tight">{t.name}</div>
                  <div className="text-[11px] text-gray-400">{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
