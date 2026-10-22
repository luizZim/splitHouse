import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { SimuladorSection } from '@/components/sections/SimuladorSection'
import { DiagnosticSection } from '@/components/sections/DiagnosticSection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CTASection } from '@/components/sections/CTASection'
import { ScrollRestorer } from '@/components/layout/ScrollRestorer'
import { ServiceModalsProvider } from '@/components/services/ServiceModals'
import { BRANDS, PRODUCT_TYPES } from '@/lib/data/catalog'
import { withBrandLogos, withTypeCovers } from '@/lib/catalog/assets'
import { scanGallery } from '@/lib/gallery/scan'

export const metadata: Metadata = {
  title: 'Split House — Instalação e Manutenção de Ar Condicionado em Cascavel',
}

export default function HomePage() {
  const gallery = scanGallery()
  const galleryTags = [...new Set(gallery.map((i) => i.tag))]

  return (
    <ServiceModalsProvider>
      <ScrollRestorer />
      <HeroSection />
      <StatsSection />
      <ServicesSection galleryTags={galleryTags} />
      <SimuladorSection />
      <DiagnosticSection />
      <ProductsSection types={withTypeCovers(PRODUCT_TYPES)} brands={withBrandLogos(BRANDS)} />
      <GallerySection items={gallery} />
      <AboutSection />
      <CTASection />
    </ServiceModalsProvider>
  )
}
