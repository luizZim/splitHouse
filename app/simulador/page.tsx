import type { Metadata } from 'next'
import { PageHeader } from '@/components/ui/PageHeader'
import { SimuladorForm } from '@/components/forms/SimuladorForm'

export const metadata: Metadata = {
  title: 'Simulador de BTU — Split House',
  description: 'Calcule a capacidade de ar condicionado ideal para o seu ambiente.',
}

export default function SimuladorPage() {
  return (
    <div>
      <PageHeader
        label="Ferramenta gratuita"
        title="Simulador de BTU"
        subtitle="Descubra a capacidade ideal para o seu ambiente."
      />
      <section className="bg-surface py-16">
        <div className="container mx-auto px-6">
          <SimuladorForm />
        </div>
      </section>
    </div>
  )
}
