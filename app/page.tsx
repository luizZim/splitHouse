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

export const metadata: Metadata = {
  title: 'Split House — Instalação e Manutenção de Ar Condicionado em Cascavel',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <SimuladorSection />
      <DiagnosticSection />
      <ProductsSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
    </>
  )
}
