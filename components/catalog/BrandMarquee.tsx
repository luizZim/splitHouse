import { BrandLogo } from '@/components/catalog/BrandLogo'
import type { Brand } from '@/lib/catalog/types'

/** Repetições por metade, para a faixa cobrir telas largas sem "buraco" no loop. */
const REPEAT = 3

/** Faixa discreta com os logos das marcas, rolando em loop (pausa no hover). */
export function BrandMarquee({ brands }: { brands: Brand[] }) {
  const half = Array.from({ length: REPEAT }, () => brands).flat()

  return (
    <div className="mb-12">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-4">
        Marcas que trabalhamos
      </p>
      <div
        className="group relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-label={`Marcas: ${brands.map((b) => b.name).join(', ')}`}
        role="img"
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center gap-14 pr-14">
              {half.map((b, i) => (
                <li
                  key={`${b.id}-${i}`}
                  className="flex items-center h-8 grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
                >
                  <BrandLogo brand={b} className="h-7 text-[13px] text-gray-500" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
