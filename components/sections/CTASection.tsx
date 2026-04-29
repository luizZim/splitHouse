import Link from 'next/link'
import { WhatsAppButton } from '@/components/ui/Button'

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-brand-dark via-brand to-[#3d52c4] py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-tight mb-4">
          Pronto para respirar ar<br />mais limpo e fresco?
        </h2>
        <p className="text-[1.1rem] text-white/65 mb-9 max-w-[500px] mx-auto">
          Fale diretamente com o profissional. Orçamento grátis, sem compromisso. Atendimento em Cascavel e região do Paraná.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <WhatsAppButton size="lg">Falar no WhatsApp agora</WhatsAppButton>
          <Link
            href="/#simulador"
            className="inline-flex items-center gap-2 bg-transparent text-white text-[15px] font-semibold border-[1.5px] border-white/35 rounded-lg px-6 h-14 hover:bg-white/10 transition-all duration-200"
          >
            Simular meu BTU
          </Link>
        </div>
      </div>
    </section>
  )
}
