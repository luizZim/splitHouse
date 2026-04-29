import type { BTUFormData, BTUResult } from '@/types'

export const WHATSAPP_NUMBER = '5545999990000'

const SOL_LABELS: Record<string, string> = {
  baixo: 'Baixa (sombra/norte)',
  medio: 'Média (meia-sombra)',
  alto: 'Alta (sol direto)',
}

export function openWhatsApp(message?: string) {
  const text = message || 'Olá! Vim pelo site da Split House e gostaria de um orçamento.'
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function buildSimuladorMessage(form: BTUFormData, result: BTUResult): string {
  return `Olá, fiz uma simulação no site e gostaria de um orçamento.

Ambiente:
- Área: ${form.area} m²
- Altura do teto: ${form.altura} m
- Pessoas: ${form.pessoas}
- Incidência solar: ${SOL_LABELS[form.sol] ?? form.sol}
- Equipamentos eletrônicos: ${form.equipamentos}

Resultado sugerido:
${result.btu.toLocaleString('pt-BR')} BTUs (faixa: ${result.range[0].toLocaleString('pt-BR')}–${result.range[1].toLocaleString('pt-BR')})

Pode me ajudar com um orçamento?`
}

export function buildContatoMessage(nome: string, telefone: string, mensagem: string): string {
  return `Olá! Meu nome é ${nome}${telefone ? `, telefone ${telefone}` : ''}.

${mensagem}`
}

export function buildProductMessage(productName: string, btu: string): string {
  return `Olá! Tenho interesse no ${productName} (${btu} BTU). Gostaria de um orçamento com instalação.`
}

export function buildServiceMessage(serviceName: string): string {
  return `Olá! Gostaria de um orçamento para o serviço de ${serviceName.toLowerCase()}.`
}
