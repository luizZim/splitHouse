import type { BTUFormData, BTUResult } from '@/types'
import { formatBtu } from '@/lib/catalog/select'
import { PROPERTY_OPTIONS, ROOM_OPTIONS, labelOf, type InstallInfo } from '@/lib/catalog/install'

export const WHATSAPP_NUMBER = '5545991166730'

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

export interface QuoteSelection {
  typeLabel: string
  brandName: string
  lineName: string
  btu: number
  model?: string
  voltage?: string
  energyLabel?: string
}

function yesNo(v: boolean) {
  return v ? 'Sim' : 'Não'
}

function propertyText(i: InstallInfo): string {
  if (i.property === 'apartamento') {
    return i.floor === '0' ? 'Apartamento — térreo' : `Apartamento — ${i.floor}º andar`
  }
  if (i.property === 'outro') return `Outro — ${i.propertyOther}`
  return labelOf(PROPERTY_OPTIONS, i.property)
}

function roomText(i: InstallInfo): string {
  return i.room === 'outro' ? (i.roomOther ?? 'Outro') : labelOf(ROOM_OPTIONS, i.room)
}

export function buildQuoteMessage(sel: QuoteSelection, install?: InstallInfo): string {
  const capacity = [`${formatBtu(sel.btu)} BTU`, sel.voltage, sel.energyLabel && `Selo ${sel.energyLabel}`]
    .filter(Boolean)
    .join(' · ')

  const lines = [
    'Olá! Vim pelo site e gostaria de um orçamento:',
    '',
    '*Aparelho*',
    `• ${sel.typeLabel} — ${sel.brandName} ${sel.lineName}`,
    `• Capacidade: ${capacity}`,
  ]
  if (sel.model) lines.push(`• Modelo: ${sel.model}`)
  lines.push('')

  if (!install) {
    lines.push('*Instalação*: Não, apenas o aparelho')
    return lines.join('\n')
  }

  lines.push(
    '*Instalação*: Sim',
    `• Imóvel: ${propertyText(install)}`,
    `• Local: ${roomText(install)}`,
    `• Muitos eletrodomésticos que geram calor: ${yesNo(install.heatAppliances)}`,
    `• Muitos vidros/sol direto: ${yesNo(install.manyWindows)}`
  )
  return lines.join('\n')
}
