import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WhatsAppButton } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Sobre a Split House — 13 anos de climatização em Cascavel',
}

const DIFERENCIAIS = [
  { icon: '🤝', title: 'Atendimento direto', desc: 'Você fala diretamente com quem vai executar o serviço. Sem intermediários, sem surpresas.' },
  { icon: '🏆', title: '13+ anos de experiência', desc: 'Mais de uma década dedicada à climatização em Cascavel e região, com clientes fiéis.' },
  { icon: '📋', title: 'Orçamento transparente', desc: 'Clareza total nos valores antes de começar. Sem taxas ocultas ou cobranças inesperadas.' },
  { icon: '✅', title: 'Garantia em tudo', desc: 'Todos os serviços têm garantia. A nossa reputação é construída serviço a serviço.' },
  { icon: '📍', title: 'Cascavel e região', desc: 'Cobrimos Cascavel, Toledo, Marechal Cândido Rondon, Foz do Iguaçu e toda a região oeste.' },
  { icon: '⚡', title: 'Agilidade', desc: 'Atendimento rápido para urgências. Sabemos que calor não espera.' },
]

export default function SobrePage() {
  return (
    <div>
      <PageHeader
        label="Nossa história"
        title="Sobre a Split House"
        subtitle="Mais de 13 anos levando conforto térmico para Cascavel e região."
      />

      {/* Story */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="bg-gradient-to-br from-[#EEF0FC] to-[#D4D8F7] rounded-2xl aspect-[4/3] flex flex-col items-center justify-center p-8 relative">
              <Image
                src="/mascot.png"
                alt="Técnico Split House"
                width={220}
                height={260}
                className="w-[220px] h-auto object-contain"
              />
              <div className="absolute bottom-5 left-5 right-5 flex gap-2 justify-center">
                <span className="bg-white rounded-full px-3.5 py-1.5 text-xs font-semibold text-brand shadow-sm">
                  Cascavel, PR
                </span>
                <span className="bg-accent rounded-full px-3.5 py-1.5 text-xs font-semibold text-white">
                  Desde 2011
                </span>
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-accent mb-2.5">
                Nossa história
              </span>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-[#1A1A2E] tracking-tight mb-4">
                De um técnico apaixonado ao referencial em climatização na região
              </h2>
              <p className="text-[15px] text-gray-500 leading-[1.8] mb-4">
                A Split House nasceu da paixão por climatização e do compromisso com a qualidade. Começou como um serviço técnico individual e cresceu organicamente — sem anúncios, apenas com a força das recomendações de clientes satisfeitos.
              </p>
              <p className="text-[15px] text-gray-500 leading-[1.8] mb-6">
                Com mais de 13 anos de atuação em Cascavel e região, construímos uma reputação sólida baseada na confiança, no atendimento direto e na qualidade que cada serviço merece.
              </p>
              <blockquote className="bg-[#EEF0FC] rounded-xl px-5 py-4 border-l-4 border-brand">
                <p className="text-[15px] font-semibold text-brand italic">
                  "Você fala direto com quem executa o serviço. Essa é a nossa maior diferença."
                </p>
              </blockquote>
            </div>
          </div>

          {/* Diferenciais */}
          <SectionHeader
            label="Por que nos escolher"
            title="Nossos diferenciais"
            subtitle="O que torna a Split House a melhor escolha para o seu conforto térmico."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFERENCIAIS.map((d) => (
              <div
                key={d.title}
                className="bg-surface rounded-xl p-6 border border-gray-200"
              >
                <div className="text-[28px] mb-3">{d.icon}</div>
                <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-2">{d.title}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-dark to-brand py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold text-white mb-4">
            Vamos trabalhar juntos?
          </h2>
          <p className="text-[15px] text-white/65 mb-8 max-w-[400px] mx-auto">
            Entre em contato e conheça o atendimento que faz a diferença.
          </p>
          <WhatsAppButton size="lg">Falar agora no WhatsApp</WhatsAppButton>
        </div>
      </section>
    </div>
  )
}
