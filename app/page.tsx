import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { SimuladorSection } from '@/components/sections/SimuladorSection'
import { DiagnosticSection } from '@/components/sections/DiagnosticSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CTASection } from '@/components/sections/CTASection'
import { ScrollRestorer } from '@/components/layout/ScrollRestorer'
import { BRANDS } from '@/lib/data/catalog'
import { withBrandLogos } from '@/lib/catalog/assets'

export const metadata: Metadata = {
  title: 'Split House — Instalação e Manutenção de Ar Condicionado em Cascavel',
}

export default function HomePage() {
  return (
    <>
      <ScrollRestorer />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <SimuladorSection />
      <DiagnosticSection />
      <ProductsSection brands={withBrandLogos(BRANDS)} />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
    </>
  )
}
