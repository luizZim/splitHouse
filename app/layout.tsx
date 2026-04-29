import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FABWhatsApp } from '@/components/layout/FABWhatsApp'
import { MainContent } from '@/components/layout/MainContent'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Split House — Instalação e Manutenção de Ar Condicionado em Cascavel',
  description:
    'Mais de 13 anos instalando e mantendo sistemas de ar condicionado em Cascavel e região do Paraná. Atendimento direto, orçamento grátis.',
  keywords: 'ar condicionado, instalação, manutenção, split, Cascavel, Paraná',
  openGraph: {
    title: 'Split House — Climatização com Qualidade em Cascavel',
    description: 'Instalação, manutenção e revenda de ar condicionado. +13 anos, atendimento direto.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="font-sans">
        <Navbar />
        <MainContent>{children}</MainContent>
        <Footer />
        <FABWhatsApp />
      </body>
    </html>
  )
}
