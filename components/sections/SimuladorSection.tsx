import { SectionHeader } from '@/components/ui/SectionHeader'
import { SimuladorForm } from '@/components/forms/SimuladorForm'

export function SimuladorSection() {
  return (
    <section className="bg-white py-24" id="simulador">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Calculadora"
          title="Simulador de BTU"
          subtitle="Descubra a capacidade ideal para o seu ambiente e receba um orçamento personalizado."
        />
        <SimuladorForm />
      </div>
    </section>
  )
}
