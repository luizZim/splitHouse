import type { BTUFormData, BTUResult } from '@/types'
import { formatBtu } from '@/lib/catalog/select'
import { HEAT_OPTIONS, SUN_OPTIONS } from '@/lib/calculations/btu'
import { PROPERTY_OPTIONS, ROOM_OPTIONS, labelOf, type InstallInfo } from '@/lib/catalog/install'

export const WHATSAPP_NUMBER = '5545991166730'

export function openWhatsApp(message?: string) {
  const text = message || 'Olá! Vim pelo site da Split House e gostaria de um orçamento.'
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

function formatNumber(n: number, digits = 1): string {
  return n.toLocaleString('pt-BR', { maximumFractionDigits: digits })
}

export function buildSimuladorMessage(form: BTUFormData, result: BTUResult): string {
  const sun = SUN_OPTIONS.find((o) => o.value === form.sol)
  const heat = HEAT_OPTIONS.filter((h) => form.calor.includes(h.value)).map((h) => h.label)

  const lines = [
    'Olá! Fiz a simulação de BTU no site e gostaria de um orçamento.',
    '',
    '*Ambiente*',
    `• Área: ${formatNumber(form.area)} m² · pé-direito ${formatNumber(form.altura)} m`,
    `• Sol: ${sun ? sun.label : 'Não recebe sol'}`,
  ]
  if (heat.length) lines.push(`• Aquece o ambiente: ${heat.join(', ')}`)
  lines.push(
    '',
    result.btu === null
      ? '*Resultado*: acima de 60.000 BTU/h — preciso de uma avaliação técnica'
      : `*Resultado*: ${formatBtu(result.btu)} BTU/h (área efetiva considerada: ${formatNumber(result.effectiveArea)} m²)`
  )
  return lines.join('\n')
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

  lines.push('*Instalação*: Sim', ...installLines(install))
  return lines.join('\n')
}

/** Linhas com os dados do local de instalação (imóvel, cômodo, calor, vidros). */
export function installLines(install: InstallInfo): string[] {
  return [
    `• Imóvel: ${propertyText(install)}`,
    `• Local: ${roomText(install)}`,
    `• Muitos eletrodomésticos que geram calor: ${yesNo(install.heatAppliances)}`,
    `• Muitos vidros/sol direto: ${yesNo(install.manyWindows)}`,
  ]
}
