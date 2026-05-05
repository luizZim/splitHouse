'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TESTIMONIALS } from '@/lib/data/testimonials'

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi])

  return (
    <section className="bg-surface py-24">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Depoimentos"
          title="O que nossos clientes dizem"
          subtitle="Atendimento direto, confiança e qualidade — clientes que recomendam."
        />

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 min-w-0"
                >
                  <div className="h-full bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(46,49,146,.08)] flex flex-col">
                    <span className="inline-flex self-start items-center gap-1.5 bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full mb-3">
                      <MessageCircle size={10} /> Via WhatsApp
                    </span>
                    <div className="text-accent text-sm tracking-[2px] mb-2.5">★★★★★</div>
                    <p className="text-[13px] text-gray-700 leading-relaxed italic mb-4 flex-1">
                      <span className="text-accent text-xl leading-none align-[-6px] mr-0.5">"</span>
                      {t.text}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
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
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Depoimento anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 w-11 h-11 rounded-full bg-white text-brand shadow-[0_4px_16px_rgba(46,49,146,.18)] flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Próximo depoimento"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 w-11 h-11 rounded-full bg-white text-brand shadow-[0_4px_16px_rgba(46,49,146,.18)] flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para depoimento ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-8 bg-brand' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
