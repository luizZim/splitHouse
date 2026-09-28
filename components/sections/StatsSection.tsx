'use client'

import { useCountUp } from '@/hooks/useCountUp'

const STATS = [
  { target: 13, suffix: '+', label: 'Anos de experiência' },
  { target: 7000, suffix: '+', label: 'Serviços realizados' },
  { target: 6, suffix: '', label: 'Tipos de equipamentos' },
  { target: 100, suffix: '%', label: 'Atendimento direto' },
]

function StatItem({ stat, last }: { stat: typeof STATS[0]; last: boolean }) {
  const { count, ref } = useCountUp(stat.target)
  return (
    <div
      ref={ref}
      className={`text-center py-8 px-4 ${!last ? 'border-r border-white/[.08]' : ''}`}
    >
      <div className="text-[3.5rem] font-extrabold text-white tracking-[-0.04em] leading-none">
        {count}
        <span className="text-accent">{stat.suffix}</span>
      </div>
      <div className="text-[13px] text-white/50 mt-1.5 font-medium">{stat.label}</div>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="bg-[#13165C] py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
          {STATS.map((s, i) => (
            <StatItem key={s.label} stat={s} last={i === STATS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
