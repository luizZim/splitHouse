import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FABWhatsApp } from '@/components/layout/FABWhatsApp'
import { MainContent } from '@/components/layout/MainContent'
import { scanGallery } from '@/lib/gallery/scan'
import { SITE_URL, SOCIAL } from '@/lib/site'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Split House | Ar Condicionado em Cascavel – Instalação e Manutenção',
    template: '%s | Split House Cascavel',
  },
  description:
    'Mais de 13 anos instalando e mantendo sistemas de ar condicionado em Cascavel e região do Paraná. Atendimento direto, orçamento grátis.',
  keywords: 'ar condicionado, instalação, manutenção, split, Cascavel, Paraná',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Split House — Climatização com Qualidade em Cascavel',
    description: 'Instalação, manutenção e revenda de ar condicionado. +13 anos, atendimento direto.',
    url: SITE_URL,
    siteName: 'Split House',
    locale: 'pt_BR',
    type: 'website',
  },
}

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  name: 'Split House',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.png`,
  image: `${SITE_URL}/logo-full.png`,
  telephone: '+55-45-99116-6730',
  address: { '@type': 'PostalAddress', addressLocality: 'Cascavel', addressRegion: 'PR', addressCountry: 'BR' },
  areaServed: { '@type': 'City', name: 'Cascavel' },
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-12:00'],
  sameAs: [SOCIAL.instagram, SOCIAL.facebook],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        <Navbar hasGallery={scanGallery().length > 0} />
        <MainContent>{children}</MainContent>
        <Footer />
        <FABWhatsApp />
      </body>
    </html>
  )
}
