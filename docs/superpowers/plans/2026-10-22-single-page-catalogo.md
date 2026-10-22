# Single page, catálogo configurável e orçamento WhatsApp — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o site em single page com uma tela por tipo de aparelho (seleção capacidade + marca), orçamento via WhatsApp com dados de instalação e navegação rápida/suave.

**Architecture:** Next.js 16 App Router. Home (`/`) concentra todas as seções; única rota extra é `/produtos/[tipo]` (estática). Dados do catálogo ficam em `lib/data/catalog.ts`; lógica pura (seleção, área, mensagem, validação) fica em `lib/catalog/*` e `lib/whatsapp`, coberta por Vitest. Imagens/logos são resolvidas no servidor por convenção de nome de arquivo — se o arquivo não existir, a UI usa fallback.

**Tech Stack:** Next.js 16.2, React 19, TypeScript, Tailwind 3.4, framer-motion 11, react-hook-form 7 + zod 3, lucide-react, Vitest (novo).

**Spec:** `docs/superpowers/specs/2026-10-22-single-page-catalogo-design.md`

## Global Constraints

- Idioma de toda UI e mensagens: português do Brasil.
- Sem preços em nenhum lugar do catálogo.
- Marcas: Gree, Midea, LG, Samsung, Elgin, Daikin (ids `gree`, `midea`, `lg`, `samsung`, `elgin`, `daikin`, nesta ordem).
- Tipos: `hi-wall`, `piso-teto`, `cassete`, `mini-vrf`, `splitao`. Uma linha (`ProductLine`) por marca por tipo; marca que não fabrica o tipo não tem linha.
- Dado não encontrado na fonte oficial do fabricante fica `undefined` e não é exibido — nunca inventar.
- Imagens: `public/catalog/<tipo>/<marca>.(webp|png|jpg|jpeg|svg)`; logos: `public/brands/<marca>.(svg|webp|png|jpg|jpeg)`.
- Número WhatsApp existente: `WHATSAPP_NUMBER` em `lib/whatsapp/index.ts` (não alterar).
- Seguir o estilo atual: Tailwind inline, cores `brand`, `accent`, `surface`, `whatsapp`; componentes com `'use client'` só quando necessário; imports com alias `@/`.
- Commits terminam com: `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`

## Review Focus

1. URL manipulada (`?btu=abc&marca=xyz`, capacidade inexistente, marca sem aquela capacidade) → tela abre com seleção padrão válida, sem erro. Teste em Task 3.
2. Apartamento sem andar, "Outro" sem descrição (imóvel ou local) → envio bloqueado com mensagem de erro clara. Teste em Task 4.
3. Mensagem nunca contém `undefined`/linhas vazias quando modelo, tensão ou selo faltam. Teste em Task 4.
4. Tipo com uma única marca (ex.: Splitão) → seletor funciona, marca única selecionada. Teste em Task 3.
5. Imagem/logo ainda não enviados → fallback (ilustração / nome da marca), sem ícone de imagem quebrada nem 404 no console. Verificação manual em Task 8.

---

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| `app/globals.css` | remover `scroll-behavior: smooth`; `scroll-margin-top` nas seções |
| `components/layout/Navbar.tsx` | rolagem mais curta e suave |
| `components/sections/ServicesSection.tsx` | cards de serviço com accordion (migrado de `/servicos`) |
| `components/sections/CTASection.tsx` | CTA + infos de contato + `ContatoForm` |
| `components/sections/AboutSection.tsx` | remove link `/sobre` |
| `components/layout/Footer.tsx` | sem botão WhatsApp; links para âncoras e `/produtos/[tipo]` |
| `vitest.config.ts` | config de testes com alias `@` |
| `lib/catalog/types.ts` | tipos do catálogo + `BRAND_IDS`, `TYPE_IDS` |
| `lib/catalog/select.ts` | funções puras: capacidades, marcas, seleção, área, formatação |
| `lib/catalog/install.ts` | schema zod + opções do formulário de instalação |
| `lib/catalog/assets.ts` | (servidor) resolve imagem/logo por convenção |
| `lib/whatsapp/index.ts` | `buildQuoteMessage` (+ remove `buildProductMessage`) |
| `lib/data/catalog.ts` | dados: `BRANDS`, `PRODUCT_TYPES`, `PRODUCT_LINES` |
| `lib/navigation/homeReturn.ts` | sessionStorage para voltar à posição da home |
| `components/layout/ScrollRestorer.tsx` | restaura scroll da home ao voltar |
| `components/sections/ProductsSection.tsx` | cards de tipo com faixa de BTU e logos |
| `app/produtos/[tipo]/page.tsx` | página do tipo (server) |
| `app/produtos/[tipo]/template.tsx` | transição de entrada |
| `components/catalog/BackButton.tsx` | botão voltar inteligente |
| `components/catalog/BrandLogo.tsx` | logo ou nome da marca |
| `components/catalog/ProductConfigurator.tsx` | seleção capacidade/marca + painel |
| `components/catalog/QuoteFlow.tsx` | botão + popover Sim/Não |
| `components/catalog/InstallModal.tsx` | modal com formulário de instalação |
| `docs/catalogo-imagens.md` | lista de imagens/logos para o usuário |

Removidos: `app/servicos/`, `app/sobre/`, `app/contato/`, `app/simulador/`, `app/produtos/page.tsx`, `app/produtos/loading.tsx`, `app/produtos/[categoria]/`, `lib/data/products.ts`, tipos `Product`/`ProductCategory` em `types/index.ts`, `components/ui/Skeleton.tsx` (se ficar sem uso).

---

### Task 1: Navegação rápida e suave

**Files:**
- Modify: `app/globals.css:9-11`
- Modify: `components/layout/Navbar.tsx:28-66`

**Interfaces:**
- Consumes: nada.
- Produces: seções com `id` passam a ter `scroll-margin-top: 96px` (usado pela navegação nativa para `/#produtos` na Task 6).

**Causa raiz:** `html { scroll-behavior: smooth }` faz cada `window.scrollTo` por frame da animação JS virar uma rolagem suave nativa (as duas brigam → lento/travado) e faz o Next 16 animar a rolagem ao topo em toda troca de rota.

- [ ] **Step 1: Ajustar CSS**

Em `app/globals.css`, substituir:
```css
html {
  scroll-behavior: smooth;
}
```
por:
```css
section[id] {
  scroll-margin-top: 96px;
}
```

- [ ] **Step 2: Ajustar animação do Navbar**

Em `components/layout/Navbar.tsx`, substituir o bloco de `const SCROLL_DURATION = 1100` até o fim de `scrollToId` por:
```ts
const SCROLL_DURATION = 600

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function animateScrollTo(targetY: number, onDone?: () => void) {
  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 2) {
    onDone?.()
    return
  }
  const duration = Math.min(SCROLL_DURATION, 250 + Math.abs(distance) * 0.15)
  const startTime = performance.now()

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: 'instant' })
    if (progress < 1) requestAnimationFrame(step)
    else onDone?.()
  }

  requestAnimationFrame(step)
}

function scrollToId(id: string | null, onDone?: () => void) {
  if (!id) {
    animateScrollTo(0, onDone)
    return
  }
  const el = document.getElementById(id)
  if (!el) {
    onDone?.()
    return
  }
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  animateScrollTo(top, onDone)
}
```
E no `useEffect` que trata `pendingScroll` (após `router.push('/')`), envolver a chamada em um frame para a home já estar pintada:
```ts
  useEffect(() => {
    if (isHome && pendingScroll.current) {
      const raw = pendingScroll.current
      pendingScroll.current = null
      const target = raw === 'top' ? null : raw
      requestAnimationFrame(() => scrollToId(target))
    }
  }, [isHome])
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully` e nenhum erro de TypeScript.

- [ ] **Step 4: Commit**
```bash
git add app/globals.css components/layout/Navbar.tsx
git commit -m "perf: remove smooth scroll CSS conflitante e acelera rolagem do menu"
```

---

### Task 2: Single page — migrar conteúdo e remover páginas separadas

**Files:**
- Modify: `components/sections/ServicesSection.tsx` (reescrever)
- Modify: `components/sections/CTASection.tsx` (reescrever)
- Modify: `components/sections/AboutSection.tsx:4,9,87-92`
- Modify: `components/layout/Footer.tsx` (reescrever)
- Delete: `app/servicos/`, `app/sobre/`, `app/contato/`, `app/simulador/`

**Interfaces:**
- Consumes: `SERVICES` (`lib/data/services.ts`), `buildServiceMessage` (`lib/whatsapp`), `ContatoForm`, `WhatsAppButton`.
- Produces: âncoras `#servicos`, `#contato` continuam existindo na home. Footer aponta produtos para `/produtos/<id>` com ids `hi-wall`, `piso-teto`, `cassete`, `mini-vrf`, `splitao`.

- [ ] **Step 1: ServicesSection com accordion**

Substituir todo `components/sections/ServicesSection.tsx` por:
```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, PlugZap, ShoppingBag, Wrench, ChevronDown, Target, ListChecks, type LucideIcon } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IconBadge } from '@/components/ui/IconBadge'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppButton } from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'
import { SERVICES } from '@/lib/data/services'
import { buildServiceMessage } from '@/lib/whatsapp'
import type { Service } from '@/types'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  instalacao: PlugZap,
  manutencao: Wrench,
  revenda: ShoppingBag,
  'mini-vrf': Building2,
}

function ServiceCard({ service, open, onToggle }: { service: Service; open: boolean; onToggle: () => void }) {
  return (
    <motion.div
      variants={fadeUp}
      layout
      className={`bg-white rounded-xl shadow-[0_2px_12px_rgba(46,49,146,.08)] border-[1.5px] transition-shadow duration-250 ${
        open ? 'border-[#EEF0FC] shadow-[0_12px_40px_rgba(46,49,146,.14)] sm:col-span-2 lg:col-span-4' : 'border-transparent hover:shadow-[0_8px_32px_rgba(46,49,146,.14)]'
      }`}
    >
      <button type="button" onClick={onToggle} aria-expanded={open} className="w-full text-left p-7 flex items-start gap-4">
        <div className="flex-1">
          <IconBadge icon={SERVICE_ICONS[service.id] ?? PlugZap} className="mb-4" />
          <div className="w-8 h-0.5 bg-accent rounded-full mb-3" />
          <h3 className="text-base font-bold text-[#1A1A2E] mb-2">{service.title}</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed">{service.desc}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-[#EEF0FC] text-brand flex items-center justify-center flex-shrink-0"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 pt-5 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-gray-700 mb-3">
                    <Target size={14} style={{ color: service.color }} /> Quando contratar
                  </p>
                  <ul className="space-y-2">
                    {service.when.map((w) => (
                      <li key={w} className="text-[13px] text-gray-700 leading-relaxed flex gap-2">
                        <span style={{ color: service.color }}>✓</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-gray-700 mb-3">
                    <ListChecks size={14} style={{ color: service.color }} /> Como funciona
                  </p>
                  <ol className="space-y-2">
                    {service.steps.map((st, i) => (
                      <li key={st} className="flex items-start gap-2.5 text-[13px] text-gray-700 leading-relaxed">
                        <span
                          className="w-[22px] h-[22px] rounded-full text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0"
                          style={{ background: service.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <WhatsAppButton message={buildServiceMessage(service.title)} size="sm">
                Solicitar orçamento
              </WhatsAppButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="bg-surface py-24" id="servicos">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="O que fazemos"
          title="Serviços completos em climatização"
          subtitle="Do residencial ao industrial — atendimento direto com o profissional, garantia em todos os serviços."
        />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              open={openId === s.id}
              onToggle={() => setOpenId((cur) => (cur === s.id ? null : s.id))}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: CTASection com contato e formulário**

Substituir todo `components/sections/CTASection.tsx` por:
```tsx
import Link from 'next/link'
import { WhatsAppButton } from '@/components/ui/Button'
import { ContatoForm } from '@/components/forms/ContatoForm'

const CONTACT_INFO = [
  { label: 'Localização', value: 'Cascavel, Paraná, Brasil' },
  { label: 'Atendimento', value: 'Cascavel e região do Paraná' },
  { label: 'Horário', value: 'Seg – Sáb: 8h às 18h' },
  { label: 'Telefone', value: '(45) 99116-6730' },
]

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-brand-dark via-brand to-[#3d52c4] py-24 relative overflow-hidden" id="contato">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white tracking-tight mb-4">
            Pronto para respirar ar<br />mais limpo e fresco?
          </h2>
          <p className="text-[1.1rem] text-white/65 mb-8 max-w-[500px]">
            Fale diretamente com o profissional. Orçamento grátis, sem compromisso. Atendimento em Cascavel e região do Paraná.
          </p>
          <div className="flex gap-3.5 flex-wrap mb-10">
            <WhatsAppButton size="lg">Falar no WhatsApp agora</WhatsAppButton>
            <Link
              href="/#simulador"
              className="inline-flex items-center gap-2 bg-transparent text-white text-[15px] font-semibold border-[1.5px] border-white/35 rounded-lg px-6 h-14 hover:bg-white/10 transition-all duration-200"
            >
              Simular meu BTU
            </Link>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-[520px]">
            {CONTACT_INFO.map((c) => (
              <div key={c.label}>
                <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/40">{c.label}</dt>
                <dd className="text-[14px] text-white/85 font-medium mt-0.5">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ContatoForm />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: AboutSection sem link para /sobre**

Em `components/sections/AboutSection.tsx`: remover o `<Link href="/sobre" ...>...</Link>` (linhas 87-92), remover `import Link from 'next/link'` e trocar `import { CheckCircle, ArrowRight } from 'lucide-react'` por `import { CheckCircle } from 'lucide-react'`. Trocar `mb-7` da div de highlights por `mb-0`.

- [ ] **Step 4: Footer sem botão de contato**

Substituir todo `components/layout/Footer.tsx` por:
```tsx
import Link from 'next/link'
import Image from 'next/image'

const SERVICES_LINKS = ['Instalação', 'Manutenção', 'Revenda', 'Mini VRF']
const PRODUCT_LINKS = [
  { label: 'Split Hi-Wall', href: '/produtos/hi-wall' },
  { label: 'Piso Teto', href: '/produtos/piso-teto' },
  { label: 'Cassete', href: '/produtos/cassete' },
  { label: 'Mini VRF', href: '/produtos/mini-vrf' },
  { label: 'Splitão', href: '/produtos/splitao' },
]

export function Footer() {
  return (
    <footer className="bg-brand-darker pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] gap-12 mb-12">
          <div>
            <Image
              src="/logo-full.png"
              alt="Split House"
              width={160}
              height={80}
              className="h-20 w-auto object-contain mb-2.5 brightness-[10]"
            />
            <p className="text-sm text-white/50 leading-relaxed max-w-[260px]">
              Mais de 13 anos instalando e mantendo sistemas de ar condicionado em Cascavel e região do Paraná.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Serviços</p>
            {SERVICES_LINKS.map((s) => (
              <Link key={s} href="/#servicos" className="block text-[13px] text-white/55 mb-2.5 hover:text-accent transition-colors">
                {s}
              </Link>
            ))}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Produtos</p>
            {PRODUCT_LINKS.map((p) => (
              <Link key={p.href} href={p.href} className="block text-[13px] text-white/55 mb-2.5 hover:text-accent transition-colors">
                {p.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35 mb-4">Contato</p>
            {[
              { icon: '📍', text: 'Cascavel, Paraná, Brasil' },
              { icon: '⏰', text: 'Seg – Sáb: 8h às 18h' },
              { icon: '📞', text: '(45) 99116-6730' },
            ].map((c) => (
              <div key={c.text} className="flex items-start gap-2 text-[13px] text-white/55 mb-2.5">
                <span className="text-xs mt-0.5">{c.icon}</span>
                {c.text}
              </div>
            ))}
            <span className="inline-flex items-center gap-1 bg-white/[.06] border border-white/10 rounded-full px-3 py-1 text-[11px] text-white/40 mt-3">
              Cascavel e região
            </span>
          </div>
        </div>

        <hr className="border-white/[.07] mb-7" />

        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-xs text-white/25">© 2026 Split House. Todos os direitos reservados.</p>
          <p className="text-xs text-white/25">Cascavel – PR · Climatização com qualidade</p>
        </div>
      </div>
    </footer>
  )
}
```
(Links de produto apontam para rotas criadas na Task 6; até lá `hi-wall`, `piso-teto`, `cassete`, `mini-vrf`, `splitao` já existem na rota antiga `[categoria]`.)

- [ ] **Step 5: Remover páginas separadas**
```bash
git rm -r app/servicos app/sobre app/contato app/simulador
```

- [ ] **Step 6: Procurar referências órfãs**

Run (Grep): padrão `"/(servicos|sobre|contato|simulador)"` em `app/` e `components/`.
Expected: nenhum resultado (âncoras `/#...` são permitidas).

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: sucesso; a lista de rotas não contém `/servicos`, `/sobre`, `/contato`, `/simulador`.

- [ ] **Step 8: Commit**
```bash
git add -A components app
git commit -m "feat: single page — serviços e contato na home, remove páginas separadas e botão do rodapé"
```

---

### Task 3: Vitest + tipos do catálogo + lógica de seleção

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (script `test`, devDependency `vitest`)
- Create: `lib/catalog/types.ts`
- Create: `lib/catalog/select.ts`
- Test: `lib/catalog/select.test.ts`

**Interfaces:**
- Produces:
  - `BRAND_IDS`, `TYPE_IDS`, tipos `BrandId`, `TypeId`, `Brand`, `CapacityVariant`, `ProductLine`, `ProductType`, `Selection`
  - `capacitiesFor(lines: ProductLine[]): number[]` — ordenado crescente, sem duplicatas
  - `brandsFor(lines: ProductLine[], btu: number): BrandId[]` — na ordem de `BRAND_IDS`
  - `resolveSelection(lines: ProductLine[], btu?: number, brand?: string): Selection`
  - `findVariant(lines: ProductLine[], sel: Selection): { line: ProductLine; variant: CapacityVariant } | undefined`
  - `areaFor(btu: number, override?: [number, number]): [number, number]`
  - `formatArea(area: [number, number]): string`
  - `formatBtu(btu: number): string` — `12000 → "12.000"`

- [ ] **Step 1: Instalar Vitest e configurar**
```bash
npm install -D vitest@3.2.4
```
Em `package.json`, dentro de `"scripts"`, adicionar `"test": "vitest run"`.

Criar `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  test: {
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
  },
})
```

- [ ] **Step 2: Criar tipos**

`lib/catalog/types.ts`:
```ts
export const BRAND_IDS = ['gree', 'midea', 'lg', 'samsung', 'elgin', 'daikin'] as const
export type BrandId = (typeof BRAND_IDS)[number]

export const TYPE_IDS = ['hi-wall', 'piso-teto', 'cassete', 'mini-vrf', 'splitao'] as const
export type TypeId = (typeof TYPE_IDS)[number]

export interface Brand {
  id: BrandId
  name: string
  /** Preenchido no servidor por lib/catalog/assets.ts quando o arquivo existe. */
  logo?: string
}

export interface CapacityVariant {
  btu: number
  /** Código do fabricante, ex. "GWC12AGA-D6NNA1A" */
  model?: string
  voltage?: string
  /** Classificação Procel/INMETRO, ex. "A" */
  energyLabel?: string
  /** Ruído da unidade interna em dB(A) */
  noiseDb?: number
  /** Só quando informado pelo fabricante */
  areaM2?: [number, number]
}

export interface ProductLine {
  type: TypeId
  brand: BrandId
  name: string
  inverter: boolean
  refrigerant?: string
  wifi?: boolean
  highlights: string[]
  /** URL da página do fabricante usada como fonte */
  source: string
  variants: CapacityVariant[]
  /** Preenchido no servidor por lib/catalog/assets.ts quando o arquivo existe. */
  image?: string
}

export interface ProductType {
  id: TypeId
  label: string
  badge?: string
  accent: string
  bg: string
  summary: string
  idealFor: string[]
  installation: string
}

export interface Selection {
  btu: number
  brand: BrandId
}
```

- [ ] **Step 3: Escrever testes que falham**

`lib/catalog/select.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import type { ProductLine } from './types'
import {
  capacitiesFor,
  brandsFor,
  resolveSelection,
  findVariant,
  areaFor,
  formatArea,
  formatBtu,
} from './select'

function line(brand: ProductLine['brand'], btus: number[]): ProductLine {
  return {
    type: 'hi-wall',
    brand,
    name: `Linha ${brand}`,
    inverter: true,
    highlights: [],
    source: 'https://example.com',
    variants: btus.map((btu) => ({ btu })),
  }
}

// LG listada antes de Gree de propósito: ordem deve vir de BRAND_IDS
const LINES = [line('lg', [9000, 12000, 18000]), line('gree', [12000, 18000, 24000])]

describe('capacitiesFor', () => {
  it('une capacidades de todas as marcas, ordenadas e sem duplicatas', () => {
    expect(capacitiesFor(LINES)).toEqual([9000, 12000, 18000, 24000])
  })
})

describe('brandsFor', () => {
  it('retorna marcas que têm a capacidade, na ordem de BRAND_IDS', () => {
    expect(brandsFor(LINES, 12000)).toEqual(['gree', 'lg'])
    expect(brandsFor(LINES, 9000)).toEqual(['lg'])
    expect(brandsFor(LINES, 7000)).toEqual([])
  })
})

describe('resolveSelection', () => {
  it('sem parâmetros: menor capacidade e primeira marca que a possui', () => {
    expect(resolveSelection(LINES)).toEqual({ btu: 9000, brand: 'lg' })
  })

  it('mantém seleção válida', () => {
    expect(resolveSelection(LINES, 18000, 'gree')).toEqual({ btu: 18000, brand: 'gree' })
  })

  it('marca sem a capacidade troca para primeira marca disponível', () => {
    expect(resolveSelection(LINES, 24000, 'lg')).toEqual({ btu: 24000, brand: 'gree' })
  })

  it('capacidade inválida com marca válida usa a menor capacidade da marca', () => {
    expect(resolveSelection(LINES, 5000, 'gree')).toEqual({ btu: 12000, brand: 'gree' })
  })

  it('parâmetros lixo (URL manipulada) caem no padrão', () => {
    expect(resolveSelection(LINES, Number('abc'), 'xyz')).toEqual({ btu: 9000, brand: 'lg' })
  })

  it('tipo com uma única marca funciona', () => {
    const single = [line('daikin', [36000, 48000])]
    expect(resolveSelection(single, 48000, 'gree')).toEqual({ btu: 48000, brand: 'daikin' })
  })
})

describe('findVariant', () => {
  it('encontra linha e variante da seleção', () => {
    const found = findVariant(LINES, { btu: 12000, brand: 'gree' })
    expect(found?.line.brand).toBe('gree')
    expect(found?.variant.btu).toBe(12000)
  })

  it('retorna undefined quando não existe', () => {
    expect(findVariant(LINES, { btu: 9000, brand: 'gree' })).toBeUndefined()
  })
})

describe('areaFor / formatArea', () => {
  it('usa tabela padrão', () => {
    expect(areaFor(9000)).toEqual([0, 15])
    expect(areaFor(12000)).toEqual([15, 20])
    expect(areaFor(24000)).toEqual([30, 40])
    expect(areaFor(60000)).toEqual([80, 100])
  })

  it('capacidade entre faixas usa a faixa menor mais próxima', () => {
    expect(areaFor(22000)).toEqual([30, 40])
    expect(areaFor(9500)).toEqual([0, 15])
  })

  it('acima de 60.000 usa ~600–750 BTU/m²', () => {
    expect(areaFor(96000)).toEqual([128, 160])
  })

  it('override do fabricante prevalece', () => {
    expect(areaFor(12000, [12, 18])).toEqual([12, 18])
  })

  it('formata área', () => {
    expect(formatArea([0, 15])).toBe('até 15 m²')
    expect(formatArea([15, 20])).toBe('15–20 m²')
  })
})

describe('formatBtu', () => {
  it('usa separador de milhar pt-BR', () => {
    expect(formatBtu(12000)).toBe('12.000')
    expect(formatBtu(9000)).toBe('9.000')
  })
})
```

- [ ] **Step 4: Rodar e ver falhar**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "./select"`.

- [ ] **Step 5: Implementar**

`lib/catalog/select.ts`:
```ts
import { BRAND_IDS, type BrandId, type CapacityVariant, type ProductLine, type Selection } from './types'

const AREA_TABLE: Array<[number, [number, number]]> = [
  [9000, [0, 15]],
  [12000, [15, 20]],
  [18000, [20, 30]],
  [22000, [30, 40]],
  [30000, [40, 50]],
  [36000, [50, 60]],
  [48000, [60, 80]],
  [55000, [80, 100]],
]

export function capacitiesFor(lines: ProductLine[]): number[] {
  const set = new Set(lines.flatMap((l) => l.variants.map((v) => v.btu)))
  return [...set].sort((a, b) => a - b)
}

export function brandsFor(lines: ProductLine[], btu: number): BrandId[] {
  return BRAND_IDS.filter((id) =>
    lines.some((l) => l.brand === id && l.variants.some((v) => v.btu === btu))
  )
}

export function resolveSelection(lines: ProductLine[], btu?: number, brand?: string): Selection {
  const caps = capacitiesFor(lines)
  const brandLine = lines.find((l) => l.brand === brand)

  let chosenBtu: number
  if (btu !== undefined && caps.includes(btu)) chosenBtu = btu
  else if (brandLine) chosenBtu = Math.min(...brandLine.variants.map((v) => v.btu))
  else chosenBtu = caps[0]

  const available = brandsFor(lines, chosenBtu)
  const chosenBrand = available.find((id) => id === brand) ?? available[0]
  return { btu: chosenBtu, brand: chosenBrand }
}

export function findVariant(
  lines: ProductLine[],
  sel: Selection
): { line: ProductLine; variant: CapacityVariant } | undefined {
  const line = lines.find((l) => l.brand === sel.brand)
  const variant = line?.variants.find((v) => v.btu === sel.btu)
  return line && variant ? { line, variant } : undefined
}

export function areaFor(btu: number, override?: [number, number]): [number, number] {
  if (override) return override
  if (btu > 60000) return [Math.round(btu / 750), Math.round(btu / 600)]
  let result = AREA_TABLE[0][1]
  for (const [min, area] of AREA_TABLE) {
    if (btu >= min) result = area
  }
  return result
}

export function formatArea([min, max]: [number, number]): string {
  return min === 0 ? `até ${max} m²` : `${min}–${max} m²`
}

export function formatBtu(btu: number): string {
  return btu.toLocaleString('pt-BR')
}
```

- [ ] **Step 6: Rodar e ver passar**

Run: `npm test`
Expected: PASS em todos os testes de `select.test.ts`.

- [ ] **Step 7: Commit**
```bash
git add package.json package-lock.json vitest.config.ts lib/catalog
git commit -m "feat(catalogo): tipos e lógica de seleção capacidade/marca com testes"
```

---

### Task 4: Formulário de instalação (schema) e mensagem de orçamento

**Files:**
- Create: `lib/catalog/install.ts`
- Modify: `lib/whatsapp/index.ts` (adicionar `QuoteSelection`, `buildQuoteMessage`)
- Test: `lib/catalog/install.test.ts`, `lib/whatsapp/quote.test.ts`

**Interfaces:**
- Consumes: `formatBtu` (Task 3).
- Produces:
  - `PROPERTY_OPTIONS`, `ROOM_OPTIONS`: `ReadonlyArray<{ value: string; label: string }>`
  - `installSchema` (zod), `type InstallInfo = { property: 'casa'|'apartamento'|'condominio'|'outro'; floor?: string; propertyOther?: string; room: 'quarto'|'sala'|'cozinha'|'escritorio'|'outro'; roomOther?: string; heatAppliances: boolean; manyWindows: boolean }`
  - `interface QuoteSelection { typeLabel: string; brandName: string; lineName: string; btu: number; model?: string; voltage?: string; energyLabel?: string }`
  - `buildQuoteMessage(sel: QuoteSelection, install?: InstallInfo): string`

- [ ] **Step 1: Testes do schema (falhando)**

`lib/catalog/install.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { installSchema } from './install'

const base = { heatAppliances: false, manyWindows: false }

function errorsOf(input: unknown): Record<string, string> {
  const r = installSchema.safeParse(input)
  if (r.success) return {}
  return Object.fromEntries(r.error.issues.map((i) => [i.path.join('.'), i.message]))
}

describe('installSchema', () => {
  it('aceita casa + quarto', () => {
    expect(installSchema.safeParse({ ...base, property: 'casa', room: 'quarto' }).success).toBe(true)
  })

  it('exige imóvel e local', () => {
    const e = errorsOf({ ...base })
    expect(e.property).toBe('Selecione o tipo de imóvel')
    expect(e.room).toBe('Selecione o local')
  })

  it('apartamento exige andar numérico', () => {
    expect(errorsOf({ ...base, property: 'apartamento', room: 'sala', floor: '' }).floor).toBe(
      'Informe o andar (somente números)'
    )
    expect(errorsOf({ ...base, property: 'apartamento', room: 'sala', floor: '8º' }).floor).toBe(
      'Informe o andar (somente números)'
    )
    expect(installSchema.safeParse({ ...base, property: 'apartamento', room: 'sala', floor: '8' }).success).toBe(true)
    expect(installSchema.safeParse({ ...base, property: 'apartamento', room: 'sala', floor: '0' }).success).toBe(true)
  })

  it('"Outro" exige descrição (imóvel e local)', () => {
    const e = errorsOf({ ...base, property: 'outro', propertyOther: '  ', room: 'outro', roomOther: '' })
    expect(e.propertyOther).toBe('Descreva o tipo de imóvel')
    expect(e.roomOther).toBe('Descreva o local')
  })
})
```

- [ ] **Step 2: Testes da mensagem (falhando)**

`lib/whatsapp/quote.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { buildQuoteMessage, type QuoteSelection } from './index'

const SEL: QuoteSelection = {
  typeLabel: 'Split Hi-Wall',
  brandName: 'Gree',
  lineName: 'G-Top Inverter',
  btu: 12000,
  model: 'GWC12AGA-D6NNA1A',
  voltage: '220V',
  energyLabel: 'A',
}

describe('buildQuoteMessage', () => {
  it('sem instalação', () => {
    expect(buildQuoteMessage(SEL)).toBe(
      [
        'Olá! Vim pelo site e gostaria de um orçamento:',
        '',
        '*Aparelho*',
        '• Split Hi-Wall — Gree G-Top Inverter',
        '• Capacidade: 12.000 BTU · 220V · Selo A',
        '• Modelo: GWC12AGA-D6NNA1A',
        '',
        '*Instalação*: Não, apenas o aparelho',
      ].join('\n')
    )
  })

  it('com instalação em apartamento', () => {
    const msg = buildQuoteMessage(SEL, {
      property: 'apartamento',
      floor: '8',
      room: 'quarto',
      heatAppliances: false,
      manyWindows: true,
    })
    expect(msg).toContain('*Instalação*: Sim')
    expect(msg).toContain('• Imóvel: Apartamento — 8º andar')
    expect(msg).toContain('• Local: Quarto')
    expect(msg).toContain('• Muitos eletrodomésticos que geram calor: Não')
    expect(msg).toContain('• Muitos vidros/sol direto: Sim')
  })

  it('apartamento no térreo', () => {
    const msg = buildQuoteMessage(SEL, {
      property: 'apartamento', floor: '0', room: 'sala', heatAppliances: false, manyWindows: false,
    })
    expect(msg).toContain('• Imóvel: Apartamento — térreo')
  })

  it('textos livres em "Outro"', () => {
    const msg = buildQuoteMessage(SEL, {
      property: 'outro', propertyOther: 'Sobrado', room: 'outro', roomOther: 'Academia', heatAppliances: true, manyWindows: false,
    })
    expect(msg).toContain('• Imóvel: Outro — Sobrado')
    expect(msg).toContain('• Local: Academia')
    expect(msg).toContain('• Muitos eletrodomésticos que geram calor: Sim')
  })

  it('casa térrea e condomínio usam rótulo', () => {
    const casa = buildQuoteMessage(SEL, { property: 'casa', room: 'cozinha', heatAppliances: true, manyWindows: true })
    expect(casa).toContain('• Imóvel: Casa térrea (parede com parede)')
    expect(casa).toContain('• Local: Cozinha')
    const cond = buildQuoteMessage(SEL, { property: 'condominio', room: 'escritorio', heatAppliances: false, manyWindows: false })
    expect(cond).toContain('• Imóvel: Condomínio')
    expect(cond).toContain('• Local: Escritório')
  })

  it('omite campos opcionais ausentes, sem "undefined"', () => {
    const msg = buildQuoteMessage({ typeLabel: 'Cassete', brandName: 'LG', lineName: 'Cassete Inverter', btu: 36000 })
    expect(msg).toContain('• Capacidade: 36.000 BTU')
    expect(msg).not.toContain('Modelo')
    expect(msg).not.toContain('undefined')
    expect(msg).not.toContain(' · ')
  })
})
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `npm test`
Expected: FAIL — `./install` não encontrado e `buildQuoteMessage` não exportado.

- [ ] **Step 4: Implementar schema**

`lib/catalog/install.ts`:
```ts
import { z } from 'zod'

export const PROPERTY_OPTIONS = [
  { value: 'casa', label: 'Casa térrea (parede com parede)' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'condominio', label: 'Condomínio' },
  { value: 'outro', label: 'Outro' },
] as const

export const ROOM_OPTIONS = [
  { value: 'quarto', label: 'Quarto' },
  { value: 'sala', label: 'Sala' },
  { value: 'cozinha', label: 'Cozinha' },
  { value: 'escritorio', label: 'Escritório' },
  { value: 'outro', label: 'Outro' },
] as const

export const installSchema = z
  .object({
    property: z.enum(['casa', 'apartamento', 'condominio', 'outro'], {
      errorMap: () => ({ message: 'Selecione o tipo de imóvel' }),
    }),
    floor: z.string().trim().optional(),
    propertyOther: z.string().trim().optional(),
    room: z.enum(['quarto', 'sala', 'cozinha', 'escritorio', 'outro'], {
      errorMap: () => ({ message: 'Selecione o local' }),
    }),
    roomOther: z.string().trim().optional(),
    heatAppliances: z.boolean(),
    manyWindows: z.boolean(),
  })
  .superRefine((d, ctx) => {
    if (d.property === 'apartamento' && !/^\d{1,3}$/.test(d.floor ?? '')) {
      ctx.addIssue({ code: 'custom', path: ['floor'], message: 'Informe o andar (somente números)' })
    }
    if (d.property === 'outro' && !d.propertyOther) {
      ctx.addIssue({ code: 'custom', path: ['propertyOther'], message: 'Descreva o tipo de imóvel' })
    }
    if (d.room === 'outro' && !d.roomOther) {
      ctx.addIssue({ code: 'custom', path: ['roomOther'], message: 'Descreva o local' })
    }
  })

export type InstallInfo = z.infer<typeof installSchema>

export function labelOf(options: ReadonlyArray<{ value: string; label: string }>, value: string): string {
  return options.find((o) => o.value === value)?.label ?? value
}
```

- [ ] **Step 5: Implementar mensagem**

Em `lib/whatsapp/index.ts` (manter `buildProductMessage` por enquanto — ela é removida na Task 6), adicionar no topo os imports e no final o código:
```ts
import { formatBtu } from '@/lib/catalog/select'
import { PROPERTY_OPTIONS, ROOM_OPTIONS, labelOf, type InstallInfo } from '@/lib/catalog/install'
```
```ts
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
```

- [ ] **Step 6: Rodar e ver passar**

Run: `npm test`
Expected: PASS em `select.test.ts`, `install.test.ts`, `quote.test.ts`.

Run: `npm run build`
Expected: sucesso.

- [ ] **Step 7: Commit**
```bash
git add lib/catalog/install.ts lib/catalog/install.test.ts lib/whatsapp
git commit -m "feat(orcamento): schema de instalação e mensagem de orçamento WhatsApp com testes"
```

---

### Task 5: Dados do catálogo (pesquisa nos fabricantes) e lista de imagens

**Files:**
- Create: `lib/data/catalog.ts`
- Create: `lib/data/catalog.test.ts`
- Create: `docs/catalogo-imagens.md`

**Interfaces:**
- Consumes: tipos da Task 3.
- Produces:
  - `BRANDS: Brand[]` (sem `logo`), `PRODUCT_TYPES: ProductType[]`, `PRODUCT_LINES: ProductLine[]` (sem `image`)
  - `getType(id: string): ProductType | undefined`
  - `linesForType(id: string): ProductLine[]`
  - `getBrand(id: BrandId): Brand`

Ferramentas: WebSearch / WebFetch nos sites oficiais brasileiros (ex.: gree.com.br, midea.com.br, lg.com/br, samsung.com/br, elgin.com.br, daikin.com.br). Fontes de varejo só para confirmar código de modelo quando o site oficial não listar; registrar sempre a URL oficial em `source`.

- [ ] **Step 1: Criar esqueleto com tipos e marcas**

`lib/data/catalog.ts`:
```ts
import type { Brand, BrandId, ProductLine, ProductType } from '@/lib/catalog/types'

export const BRANDS: Brand[] = [
  { id: 'gree', name: 'Gree' },
  { id: 'midea', name: 'Midea' },
  { id: 'lg', name: 'LG' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'elgin', name: 'Elgin' },
  { id: 'daikin', name: 'Daikin' },
]

export const PRODUCT_TYPES: ProductType[] = [
  {
    id: 'hi-wall',
    label: 'Split Hi-Wall',
    badge: 'Mais vendido',
    accent: '#2E3192',
    bg: 'from-[#EEF0FC] to-[#D4D8F7]',
    summary:
      'O modelo mais comum: unidade interna fixada no alto da parede, silenciosa e econômica, ideal para residências e pequenos comércios.',
    idealFor: ['Quartos', 'Salas', 'Escritórios pequenos', 'Consultórios'],
    installation:
      'Unidade interna na parede e condensadora externa, ligadas por tubulação de cobre. Em casas térreas costuma ser parede com parede; em apartamentos pode exigir acesso pela fachada.',
  },
  {
    id: 'piso-teto',
    label: 'Piso Teto',
    accent: '#F7941D',
    bg: 'from-[#FFF5E8] to-[#FFE4C0]',
    summary:
      'Unidade robusta instalada no teto ou na parte baixa da parede, com jato de ar de longo alcance para ambientes amplos.',
    idealFor: ['Lojas', 'Restaurantes', 'Salões e igrejas', 'Salas comerciais'],
    installation:
      'Fixada no teto ou na parede próxima ao piso, sem necessidade de forro. Exige ponto de dreno e circuito elétrico dedicado.',
  },
  {
    id: 'cassete',
    label: 'Cassete',
    accent: '#5462DF',
    bg: 'from-[#EEF0FC] to-[#A9B1EF]',
    summary:
      'Embutido no forro, distribui o ar em até 4 direções de forma uniforme e discreta — só a grelha fica aparente.',
    idealFor: ['Escritórios', 'Clínicas', 'Lojas com forro', 'Salas de reunião'],
    installation:
      'Embutido em forro (gesso ou modular) com espaço livre acima. Usa bomba de dreno e exige planejamento do forro.',
  },
  {
    id: 'mini-vrf',
    label: 'Mini VRF',
    badge: 'Comercial',
    accent: '#29ABE2',
    bg: 'from-[#E8F7FD] to-[#C3EAFB]',
    summary:
      'Uma única condensadora atende vários ambientes, cada um com controle independente — mais economia e menos equipamentos na fachada.',
    idealFor: ['Escritórios com várias salas', 'Clínicas', 'Casas de alto padrão', 'Pequenos edifícios'],
    installation:
      'Projeto dimensionado por técnico: uma condensadora externa ligada a várias evaporadoras (hi-wall, cassete ou dutada).',
  },
  {
    id: 'splitao',
    label: 'Splitão',
    badge: 'Industrial',
    accent: '#2E3192',
    bg: 'from-[#EEF0FC] to-[#7E89E7]',
    summary:
      'Sistema de alta capacidade com distribuição por dutos, para grandes áreas que precisam de climatização central.',
    idealFor: ['Galpões', 'Supermercados', 'Auditórios', 'Indústrias'],
    installation:
      'Instalado com rede de dutos e área técnica ou casa de máquinas; requer projeto e visita técnica.',
  },
]

export const PRODUCT_LINES: ProductLine[] = [
  // preenchido no Step 2
]

export function getType(id: string): ProductType | undefined {
  return PRODUCT_TYPES.find((t) => t.id === id)
}

export function linesForType(id: string): ProductLine[] {
  return PRODUCT_LINES.filter((l) => l.type === id)
}

export function getBrand(id: BrandId): Brand {
  return BRANDS.find((b) => b.id === id)!
}
```

- [ ] **Step 2: Pesquisar e preencher `PRODUCT_LINES`**

Para cada tipo (5) × marca (6):
1. Buscar no site oficial BR a linha **atual** mais representativa do tipo (preferir lançamentos 2025–2026; para Hi-Wall preferir inverter).
2. Se a marca não vende o tipo no Brasil, pular (não criar linha).
3. Para cada capacidade publicada, registrar `btu` e, quando constar na fonte: `model` (código da unidade interna ou do conjunto), `voltage`, `energyLabel`, `noiseDb`, `areaM2`.
4. Na linha: `name` comercial, `inverter`, `refrigerant` (ex. "R-32"), `wifi`, `highlights` (3–4 diferenciais citados pelo fabricante, frases curtas em pt-BR), `source` (URL oficial consultada).
5. Nunca preencher campo sem fonte.

Formato de cada entrada (exemplo de estrutura — valores devem vir da pesquisa):
```ts
  {
    type: 'hi-wall',
    brand: 'gree',
    name: '<nome comercial da linha>',
    inverter: true,
    refrigerant: 'R-32',
    wifi: true,
    highlights: ['<diferencial 1>', '<diferencial 2>', '<diferencial 3>'],
    source: 'https://<site oficial>/<página da linha>',
    variants: [
      { btu: 9000, model: '<código>', voltage: '220V', energyLabel: 'A' },
      { btu: 12000, model: '<código>', voltage: '220V', energyLabel: 'A' },
    ],
  },
```
Ordenar `PRODUCT_LINES` por tipo (ordem de `TYPE_IDS`) e marca (ordem de `BRAND_IDS`).

- [ ] **Step 3: Teste de integridade dos dados**

`lib/data/catalog.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { BRAND_IDS, TYPE_IDS } from '@/lib/catalog/types'
import { BRANDS, PRODUCT_LINES, PRODUCT_TYPES, linesForType } from './catalog'

describe('catálogo', () => {
  it('tem as 6 marcas e os 5 tipos', () => {
    expect(BRANDS.map((b) => b.id)).toEqual([...BRAND_IDS])
    expect(PRODUCT_TYPES.map((t) => t.id)).toEqual([...TYPE_IDS])
  })

  it('todo tipo tem ao menos uma linha', () => {
    for (const t of TYPE_IDS) expect(linesForType(t).length, t).toBeGreaterThan(0)
  })

  it('no máximo uma linha por marca por tipo', () => {
    const keys = PRODUCT_LINES.map((l) => `${l.type}/${l.brand}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('linhas válidas: variantes únicas e positivas, fonte https, 1–4 diferenciais', () => {
    for (const l of PRODUCT_LINES) {
      const id = `${l.type}/${l.brand}`
      expect(l.variants.length, id).toBeGreaterThan(0)
      const btus = l.variants.map((v) => v.btu)
      expect(new Set(btus).size, id).toBe(btus.length)
      for (const b of btus) expect(b, id).toBeGreaterThan(0)
      expect(l.source, id).toMatch(/^https:\/\//)
      expect(l.highlights.length, id).toBeGreaterThanOrEqual(1)
      expect(l.highlights.length, id).toBeLessThanOrEqual(4)
    }
  })
})
```

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Lista de imagens para o usuário**

Criar `docs/catalogo-imagens.md` com:
- Instruções: formatos aceitos (`.webp` preferido, também `.png`/`.jpg`; logos `.svg` preferido), fundo transparente ou branco, imagem do aparelho ~1200×900, após adicionar arquivos rodar `npm run build`.
- Tabela **Aparelhos**: `Tipo | Marca | Linha | Arquivo | Página de referência` — uma linha por entrada de `PRODUCT_LINES`, arquivo `public/catalog/<tipo>/<marca>.webp`.
- Tabela **Logos**: `Marca | Arquivo` — `public/brands/<marca>.svg` para as 6 marcas.

- [ ] **Step 5: Commit**
```bash
git add lib/data/catalog.ts lib/data/catalog.test.ts docs/catalogo-imagens.md
git commit -m "feat(catalogo): dados das linhas atuais dos fabricantes e lista de imagens"
```

---

### Task 6: Home de produtos, página do tipo, configurador e "voltar"

**Files:**
- Create: `lib/catalog/assets.ts`
- Create: `lib/navigation/homeReturn.ts`
- Create: `components/layout/ScrollRestorer.tsx`
- Create: `components/catalog/BrandLogo.tsx`
- Create: `components/catalog/BackButton.tsx`
- Create: `components/catalog/ProductConfigurator.tsx`
- Create: `app/produtos/[tipo]/page.tsx`
- Create: `app/produtos/[tipo]/template.tsx`
- Modify: `components/sections/ProductsSection.tsx` (reescrever)
- Modify: `app/page.tsx`
- Modify: `types/index.ts` (remover `ProductCategory`, `Product`)
- Delete: `app/produtos/page.tsx`, `app/produtos/loading.tsx`, `app/produtos/[categoria]/`, `lib/data/products.ts`, `components/ui/Skeleton.tsx` (se sem uso)

**Interfaces:**
- Consumes: Task 3 (`capacitiesFor`, `brandsFor`, `resolveSelection`, `findVariant`, `areaFor`, `formatArea`, `formatBtu`, tipos), Task 5 (`BRANDS`, `PRODUCT_TYPES`, `getType`, `linesForType`, `getBrand`).
- Produces:
  - `withLineImages(lines: ProductLine[]): ProductLine[]`, `withBrandLogos(brands: Brand[]): Brand[]` (servidor)
  - `rememberHomeScroll()`, `requestRestore()`, `hasHomeScroll(): boolean`, `consumeRestore(): number | null`
  - `<ProductConfigurator type lines brands />` — nesta task o botão "Solicitar orçamento" envia direto `buildQuoteMessage(quote)` (sem instalação); a Task 7 troca esse botão por `<QuoteFlow selection={quote} />`.

- [ ] **Step 1: Resolver de assets (servidor)**

`lib/catalog/assets.ts`:
```ts
import fs from 'node:fs'
import path from 'node:path'
import type { Brand, ProductLine } from './types'

const EXTS = ['.webp', '.png', '.jpg', '.jpeg', '.svg']

export function findPublicAsset(base: string): string | undefined {
  for (const ext of EXTS) {
    const rel = `${base}${ext}`
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return rel
  }
  return undefined
}

export function withLineImages(lines: ProductLine[]): ProductLine[] {
  return lines.map((l) => ({ ...l, image: findPublicAsset(`/catalog/${l.type}/${l.brand}`) }))
}

export function withBrandLogos(brands: Brand[]): Brand[] {
  return brands.map((b) => ({ ...b, logo: findPublicAsset(`/brands/${b.id}`) }))
}
```

- [ ] **Step 2: Retorno à home**

`lib/navigation/homeReturn.ts`:
```ts
const SCROLL_KEY = 'sh:homeScroll'
const RESTORE_KEY = 'sh:restore'

export function rememberHomeScroll() {
  try {
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))
  } catch {}
}

export function requestRestore() {
  try {
    sessionStorage.setItem(RESTORE_KEY, '1')
  } catch {}
}

export function hasHomeScroll(): boolean {
  try {
    return sessionStorage.getItem(SCROLL_KEY) !== null
  } catch {
    return false
  }
}

/** Retorna a posição salva se um retorno foi solicitado; limpa as chaves. */
export function consumeRestore(): number | null {
  try {
    const requested = sessionStorage.getItem(RESTORE_KEY)
    sessionStorage.removeItem(RESTORE_KEY)
    const y = sessionStorage.getItem(SCROLL_KEY)
    if (!requested || y === null) return null
    sessionStorage.removeItem(SCROLL_KEY)
    return Number(y)
  } catch {
    return null
  }
}
```

`components/layout/ScrollRestorer.tsx`:
```tsx
'use client'

import { useEffect } from 'react'
import { consumeRestore } from '@/lib/navigation/homeReturn'

export function ScrollRestorer() {
  useEffect(() => {
    const y = consumeRestore()
    if (y === null) return
    requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }))
  }, [])
  return null
}
```

- [ ] **Step 3: BrandLogo e BackButton**

`components/catalog/BrandLogo.tsx`:
```tsx
import Image from 'next/image'
import type { Brand } from '@/lib/catalog/types'
import { cn } from '@/lib/utils/cn'

export function BrandLogo({ brand, className }: { brand: Brand; className?: string }) {
  if (!brand.logo) {
    return <span className={cn('text-[12px] font-bold uppercase tracking-wide', className)}>{brand.name}</span>
  }
  return (
    <Image
      src={brand.logo}
      alt={brand.name}
      width={96}
      height={32}
      className={cn('h-5 w-auto object-contain', className)}
    />
  )
}
```

`components/catalog/BackButton.tsx`:
```tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { hasHomeScroll, requestRestore } from '@/lib/navigation/homeReturn'

export function BackButton() {
  const router = useRouter()

  useEffect(() => {
    const onPop = () => requestRestore()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function goBack() {
    if (hasHomeScroll()) {
      requestRestore()
      router.back()
    } else {
      router.push('/#produtos')
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand mb-8 hover:gap-2.5 transition-all"
    >
      <ChevronLeft size={16} /> Voltar aos produtos
    </button>
  )
}
```

- [ ] **Step 4: ProductConfigurator**

`components/catalog/ProductConfigurator.tsx`:
```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, MessageCircle } from 'lucide-react'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { BrandLogo } from '@/components/catalog/BrandLogo'
import { WA_BASE, WA_SIZES } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import {
  areaFor,
  brandsFor,
  capacitiesFor,
  findVariant,
  formatArea,
  formatBtu,
  resolveSelection,
} from '@/lib/catalog/select'
import type { Brand, BrandId, ProductLine, ProductType } from '@/lib/catalog/types'
import { buildQuoteMessage, openWhatsApp, type QuoteSelection } from '@/lib/whatsapp'

interface Props {
  type: ProductType
  lines: ProductLine[]
  brands: Brand[]
}

export function ProductConfigurator({ type, lines, brands }: Props) {
  const router = useRouter()
  const params = useSearchParams()
  const [sel, setSel] = useState(() =>
    resolveSelection(lines, Number(params.get('btu')) || undefined, params.get('marca') ?? undefined)
  )

  const capacities = capacitiesFor(lines)
  const available = brandsFor(lines, sel.btu)
  const typeBrands = brands.filter((b) => lines.some((l) => l.brand === b.id))
  const found = findVariant(lines, sel)!
  const { line, variant } = found
  const brand = brands.find((b) => b.id === sel.brand)!
  const area = formatArea(areaFor(variant.btu, variant.areaM2))

  function update(next: { btu?: number; brand?: BrandId }) {
    const r = resolveSelection(lines, next.btu ?? sel.btu, next.brand ?? sel.brand)
    setSel(r)
    router.replace(`?btu=${r.btu}&marca=${r.brand}`, { scroll: false })
  }

  const quote: QuoteSelection = {
    typeLabel: type.label,
    brandName: brand.name,
    lineName: line.name,
    btu: variant.btu,
    model: variant.model,
    voltage: variant.voltage,
    energyLabel: variant.energyLabel,
  }

  const specs = [
    { label: 'Capacidade', value: `${formatBtu(variant.btu)} BTU/h` },
    { label: 'Área indicada*', value: area },
    { label: 'Tecnologia', value: line.inverter ? 'Inverter' : 'Convencional (on/off)' },
    variant.energyLabel && { label: 'Selo de eficiência', value: `Classe ${variant.energyLabel}` },
    variant.voltage && { label: 'Tensão', value: variant.voltage },
    line.refrigerant && { label: 'Gás refrigerante', value: line.refrigerant },
    variant.noiseDb !== undefined && { label: 'Ruído (unid. interna)', value: `${variant.noiseDb} dB(A)` },
    line.wifi !== undefined && { label: 'Wi-Fi', value: line.wifi ? 'Sim' : 'Não' },
    variant.model && { label: 'Modelo', value: variant.model },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 items-start">
      {/* Imagem */}
      <div className="lg:sticky lg:top-[112px]">
        <div className={`bg-gradient-to-br ${type.bg} rounded-2xl aspect-[4/3] relative overflow-hidden flex items-center justify-center`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sel.brand}-${sel.btu}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {line.image ? (
                <Image
                  src={line.image}
                  alt={`${brand.name} ${line.name}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <ACIllustration color={type.accent} size={100} />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-2 shadow-sm">
            <BrandLogo brand={brand} className="text-brand" />
          </div>
        </div>
      </div>

      {/* Seleção + detalhes */}
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2.5">Capacidade</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {capacities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update({ btu: c })}
              aria-pressed={c === sel.btu}
              className={cn(
                'px-4 h-10 rounded-lg text-[13px] font-semibold border-[1.5px] transition-colors',
                c === sel.btu ? 'bg-brand text-white border-brand' : 'bg-white text-gray-700 border-gray-200 hover:border-brand hover:text-brand'
              )}
            >
              {formatBtu(c)} BTU
            </button>
          ))}
        </div>

        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2.5">Marca</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {typeBrands.map((b) => {
            const enabled = available.includes(b.id)
            const active = b.id === sel.brand
            return (
              <button
                key={b.id}
                type="button"
                disabled={!enabled}
                onClick={() => update({ brand: b.id })}
                aria-pressed={active}
                title={enabled ? b.name : `Indisponível em ${formatBtu(sel.btu)} BTU`}
                className={cn(
                  'px-4 h-11 rounded-lg border-[1.5px] flex items-center transition-colors',
                  active && 'border-brand bg-[#EEF0FC] text-brand',
                  !active && enabled && 'border-gray-200 bg-white text-gray-700 hover:border-brand',
                  !enabled && 'border-dashed border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed opacity-60'
                )}
              >
                <BrandLogo brand={b} />
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${sel.brand}-${sel.btu}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: type.accent }}>
              {brand.name}
            </div>
            <h2 className="text-[clamp(1.3rem,2.6vw,1.8rem)] font-extrabold text-[#1A1A2E] tracking-tight mb-1">
              {line.name}
            </h2>
            <div className="text-[1.3rem] font-bold text-brand mb-5">{formatBtu(variant.btu)} BTU/h</div>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 mb-5">
              {specs.map((s, i) => (
                <div key={s.label} className={cn('flex px-5 py-3', i < specs.length - 1 && 'border-b border-gray-100')}>
                  <span className="text-[13px] text-gray-500 flex-[0_0_160px]">{s.label}</span>
                  <span className="text-[13px] font-semibold text-[#1A1A2E] flex-1">{s.value}</span>
                </div>
              ))}
            </div>

            {line.highlights.length > 0 && (
              <ul className="space-y-2 mb-5">
                {line.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-[13px] text-gray-700">
                    <CheckCircle size={15} className="text-accent flex-shrink-0 mt-0.5" /> {h}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mb-6 text-[13px] text-gray-600 leading-relaxed">
          <p className="mb-1.5">
            <strong className="text-[#1A1A2E]">Ideal para:</strong> {type.idealFor.join(', ')}.
          </p>
          <p>
            <strong className="text-[#1A1A2E]">Instalação:</strong> {type.installation}
          </p>
        </div>

        <button
          type="button"
          onClick={() => openWhatsApp(buildQuoteMessage(quote))}
          className={cn(WA_BASE, WA_SIZES.md, 'w-full')}
        >
          <MessageCircle size={17} /> Solicitar orçamento
        </button>

        <p className="text-[11px] text-gray-400 mt-3">
          * Área aproximada de referência. Para um cálculo preciso, use o{' '}
          <a href="/#simulador" className="underline hover:text-brand">simulador de BTU</a>.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Página e template**

`app/produtos/[tipo]/page.tsx`:
```tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/ui/PageHeader'
import { BackButton } from '@/components/catalog/BackButton'
import { ProductConfigurator } from '@/components/catalog/ProductConfigurator'
import { BRANDS, PRODUCT_TYPES, getType, linesForType } from '@/lib/data/catalog'
import { withBrandLogos, withLineImages } from '@/lib/catalog/assets'

interface Props {
  params: Promise<{ tipo: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return PRODUCT_TYPES.map((t) => ({ tipo: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tipo } = await params
  const type = getType(tipo)
  return {
    title: type ? `${type.label} — Split House` : 'Produto — Split House',
    description: type?.summary,
  }
}

export default async function TipoPage({ params }: Props) {
  const { tipo } = await params
  const type = getType(tipo)
  const lines = linesForType(tipo)
  if (!type || lines.length === 0) notFound()

  return (
    <div>
      <PageHeader label="Catálogo" title={type.label} subtitle={type.summary} />
      <section className="bg-surface py-12">
        <div className="container mx-auto px-6">
          <BackButton />
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <ProductConfigurator type={type} lines={withLineImages(lines)} brands={withBrandLogos(BRANDS)} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
```

`app/produtos/[tipo]/template.tsx`:
```tsx
'use client'

import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 6: ProductsSection e home**

Substituir todo `components/sections/ProductsSection.tsx` por:
```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ACIllustration } from '@/components/ui/ACIllustration'
import { Reveal } from '@/components/ui/Reveal'
import { BrandLogo } from '@/components/catalog/BrandLogo'
import { fadeUp } from '@/lib/motion'
import { rememberHomeScroll } from '@/lib/navigation/homeReturn'
import { capacitiesFor, formatBtu } from '@/lib/catalog/select'
import { PRODUCT_TYPES, linesForType } from '@/lib/data/catalog'
import type { Brand, ProductType } from '@/lib/catalog/types'

function TypeCard({ type, brands }: { type: ProductType; brands: Brand[] }) {
  const lines = linesForType(type.id)
  const caps = capacitiesFor(lines)
  const typeBrands = brands.filter((b) => lines.some((l) => l.brand === b.id))

  return (
    <motion.div variants={fadeUp}>
      <Link
        href={`/produtos/${type.id}`}
        onClick={rememberHomeScroll}
        className="block bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(46,49,146,.08)] hover:shadow-[0_8px_32px_rgba(46,49,146,.14)] hover:-translate-y-0.5 border-[1.5px] border-transparent hover:border-[#EEF0FC] transition-all duration-250"
      >
        <div className={`h-[140px] bg-gradient-to-br ${type.bg} flex items-center justify-center relative`}>
          <ACIllustration color={type.accent} />
          {type.badge && (
            <span className="absolute top-2.5 left-2.5 bg-brand/90 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
              {type.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1 text-brand">{type.label}</div>
          <div className="text-xs text-gray-400 mb-3">
            {formatBtu(caps[0])}–{formatBtu(caps[caps.length - 1])} BTU
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4 text-gray-500">
            {typeBrands.map((b) => (
              <BrandLogo key={b.id} brand={b} className="h-4 text-[10px]" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
            Escolher modelo <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export function ProductsSection({ brands }: { brands: Brand[] }) {
  return (
    <section className="bg-white py-24" id="produtos">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Catálogo"
          title="Equipamentos para cada necessidade"
          subtitle="Escolha o tipo, a capacidade e a marca — e peça seu orçamento direto no WhatsApp."
        />
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCT_TYPES.map((t) => (
            <TypeCard key={t.id} type={t} brands={brands} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
```

Em `app/page.tsx`: adicionar imports
```tsx
import { ScrollRestorer } from '@/components/layout/ScrollRestorer'
import { BRANDS } from '@/lib/data/catalog'
import { withBrandLogos } from '@/lib/catalog/assets'
```
trocar `<ProductsSection />` por `<ProductsSection brands={withBrandLogos(BRANDS)} />` e adicionar `<ScrollRestorer />` como primeiro filho do fragmento.

- [ ] **Step 7: Remover rotas e dados antigos**
```bash
git rm app/produtos/page.tsx app/produtos/loading.tsx
git rm -r "app/produtos/[categoria]"
git rm lib/data/products.ts
```
Em `types/index.ts`, remover as interfaces `ProductCategory` e `Product`.
Em `lib/whatsapp/index.ts`, remover a função `buildProductMessage` (sem uso após remover `[categoria]`).
Grep por `Skeleton` em `app/` e `components/`; se só restar o próprio arquivo, `git rm components/ui/Skeleton.tsx`.

- [ ] **Step 8: Testes e build**

Run: `npm test`
Expected: PASS.

Run: `npm run build`
Expected: sucesso; rotas: `/`, `/_not-found`, `/produtos/[tipo]` com 5 caminhos (hi-wall, piso-teto, cassete, mini-vrf, splitao).

- [ ] **Step 9: Commit**
```bash
git add -A app components lib types
git commit -m "feat(catalogo): tela por tipo com seleção de capacidade e marca, voltar para a home"
```

---

### Task 7: Fluxo de orçamento (popover + modal de instalação)

**Files:**
- Create: `components/catalog/InstallModal.tsx`
- Create: `components/catalog/QuoteFlow.tsx`
- Modify: `components/catalog/ProductConfigurator.tsx` (trocar botão por `QuoteFlow`)

**Interfaces:**
- Consumes: `installSchema`, `PROPERTY_OPTIONS`, `ROOM_OPTIONS`, `InstallInfo` (Task 4); `buildQuoteMessage`, `openWhatsApp`, `QuoteSelection` (Task 4); `WA_BASE`, `WA_SIZES` (`components/ui/Button.tsx`).
- Produces: `<QuoteFlow selection={QuoteSelection} />`; `<InstallModal open summary onClose onSubmit />`.

- [ ] **Step 1: InstallModal**

`components/catalog/InstallModal.tsx`:
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageCircle, X } from 'lucide-react'
import { installSchema, PROPERTY_OPTIONS, ROOM_OPTIONS, type InstallInfo } from '@/lib/catalog/install'
import { WA_BASE, WA_SIZES } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

interface Props {
  open: boolean
  summary: string
  onClose: () => void
  onSubmit: (info: InstallInfo) => void
}

const chip =
  'cursor-pointer select-none px-3.5 py-2 rounded-lg border-[1.5px] border-gray-200 text-[13px] font-medium text-gray-700 transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand/40'
const input =
  'w-full px-3.5 py-2.5 text-[14px] border-[1.5px] border-gray-300 rounded-lg outline-none focus:border-brand mt-2'
const errorText = 'text-[11px] text-red-500 mt-1'

export function InstallModal({ open, summary, onClose, onSubmit }: Props) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<InstallInfo>({
    resolver: zodResolver(installSchema),
    defaultValues: { floor: '', propertyOther: '', roomOther: '', heatAppliances: false, manyWindows: false },
  })
  const property = useWatch({ control, name: 'property' })
  const room = useWatch({ control, name: 'room' })

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) {
      reset()
      return
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFirst = requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus()
    })

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = dialogRef.current.querySelectorAll<HTMLElement>('input, button, textarea, select')
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(focusFirst)
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, reset])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#0b0d33]/55 backdrop-blur-sm p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white w-full sm:max-w-[520px] max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,.25)] p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 id="install-title" className="text-lg font-bold text-[#1A1A2E]">Dados para a instalação</h2>
                <p className="text-[12px] text-gray-500 mt-0.5">{summary}</p>
              </div>
              <button type="button" onClick={onClose} aria-label="Fechar" className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
              <fieldset>
                <legend className="text-[13px] font-semibold text-gray-700 mb-2">Tipo de instalação *</legend>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_OPTIONS.map((o) => (
                    <label key={o.value} className={chip}>
                      <input type="radio" value={o.value} {...register('property')} className="sr-only" />
                      {o.label}
                    </label>
                  ))}
                </div>
                {errors.property && <p className={errorText}>{errors.property.message}</p>}
                {property === 'apartamento' && (
                  <div>
                    <input {...register('floor')} inputMode="numeric" placeholder="Andar (ex.: 8 — use 0 para térreo)" className={cn(input, errors.floor && 'border-red-400')} />
                    {errors.floor && <p className={errorText}>{errors.floor.message}</p>}
                  </div>
                )}
                {property === 'outro' && (
                  <div>
                    <input {...register('propertyOther')} placeholder="Descreva (ex.: sobrado, galpão)" className={cn(input, errors.propertyOther && 'border-red-400')} />
                    {errors.propertyOther && <p className={errorText}>{errors.propertyOther.message}</p>}
                  </div>
                )}
              </fieldset>

              <fieldset>
                <legend className="text-[13px] font-semibold text-gray-700 mb-2">Local *</legend>
                <div className="flex flex-wrap gap-2">
                  {ROOM_OPTIONS.map((o) => (
                    <label key={o.value} className={chip}>
                      <input type="radio" value={o.value} {...register('room')} className="sr-only" />
                      {o.label}
                    </label>
                  ))}
                </div>
                {errors.room && <p className={errorText}>{errors.room.message}</p>}
                {room === 'outro' && (
                  <div>
                    <input {...register('roomOther')} placeholder="Descreva o local" className={cn(input, errors.roomOther && 'border-red-400')} />
                    {errors.roomOther && <p className={errorText}>{errors.roomOther.message}</p>}
                  </div>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2.5">
                <legend className="text-[13px] font-semibold text-gray-700 mb-2">O local tem:</legend>
                <label className="flex items-center gap-2.5 text-[13px] text-gray-700 cursor-pointer">
                  <input type="checkbox" {...register('heatAppliances')} className="w-4 h-4 accent-[#2E3192]" />
                  Muitos eletrodomésticos que geram calor (fogão, forno, churrasqueira)
                </label>
                <label className="flex items-center gap-2.5 text-[13px] text-gray-700 cursor-pointer">
                  <input type="checkbox" {...register('manyWindows')} className="w-4 h-4 accent-[#2E3192]" />
                  Muitos vidros / sol direto
                </label>
              </fieldset>

              <button type="submit" className={cn(WA_BASE, WA_SIZES.md, 'w-full mt-1')}>
                <MessageCircle size={17} /> Enviar pelo WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
```

- [ ] **Step 2: QuoteFlow**

`components/catalog/QuoteFlow.tsx`:
```tsx
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { InstallModal } from '@/components/catalog/InstallModal'
import { WA_BASE, WA_SIZES } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { formatBtu } from '@/lib/catalog/select'
import type { InstallInfo } from '@/lib/catalog/install'
import { buildQuoteMessage, openWhatsApp, type QuoteSelection } from '@/lib/whatsapp'

type Step = 'idle' | 'ask' | 'form'

export function QuoteFlow({ selection }: { selection: QuoteSelection }) {
  const [step, setStep] = useState<Step>('idle')
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (step !== 'ask') return
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setStep('idle')
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setStep('idle')
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [step])

  const close = useCallback(() => setStep('idle'), [])

  function sendWithoutInstall() {
    openWhatsApp(buildQuoteMessage(selection))
    setStep('idle')
  }

  function sendWithInstall(info: InstallInfo) {
    openWhatsApp(buildQuoteMessage(selection, info))
    setStep('idle')
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setStep((s) => (s === 'ask' ? 'idle' : 'ask'))}
        aria-haspopup="dialog"
        aria-expanded={step === 'ask'}
        className={cn(WA_BASE, WA_SIZES.md, 'w-full')}
      >
        <MessageCircle size={17} /> Solicitar orçamento
      </button>

      <AnimatePresence>
        {step === 'ask' && (
          <motion.div
            role="dialog"
            aria-label="Orçamento de instalação"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-3 left-0 right-0 sm:left-auto sm:w-[340px] z-30 bg-white rounded-xl shadow-[0_12px_40px_rgba(46,49,146,.2)] border border-brand/10 p-4 origin-bottom"
          >
            <p className="text-[14px] font-semibold text-[#1A1A2E] mb-3">
              Deseja solicitar também o orçamento de instalação?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                autoFocus
                onClick={() => setStep('form')}
                className="flex-1 h-10 rounded-lg bg-brand text-white text-[13px] font-semibold hover:bg-brand-dark transition-colors"
              >
                Sim
              </button>
              <button
                type="button"
                onClick={sendWithoutInstall}
                className="flex-1 h-10 rounded-lg bg-[#EEF0FC] text-brand text-[13px] font-semibold hover:bg-brand hover:text-white transition-colors"
              >
                Não, só o aparelho
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InstallModal
        open={step === 'form'}
        summary={`${selection.brandName} ${selection.lineName} · ${formatBtu(selection.btu)} BTU`}
        onClose={close}
        onSubmit={sendWithInstall}
      />
    </div>
  )
}
```

- [ ] **Step 3: Ligar no configurador**

Em `components/catalog/ProductConfigurator.tsx`:
- Trocar o `<button ... onClick={() => openWhatsApp(buildQuoteMessage(quote))} ...>...</button>` por `<QuoteFlow selection={quote} />`.
- Imports: adicionar `import { QuoteFlow } from '@/components/catalog/QuoteFlow'`; trocar o import de `@/lib/whatsapp` por `import type { QuoteSelection } from '@/lib/whatsapp'`; remover `MessageCircle` do import de `lucide-react` e remover o import de `WA_BASE, WA_SIZES`.

- [ ] **Step 4: Testes, lint de tipos e build**

Run: `npm test`
Expected: PASS.

Run: `npm run build`
Expected: sucesso, sem erros de TypeScript.

- [ ] **Step 5: Commit**
```bash
git add components/catalog
git commit -m "feat(orcamento): popover de instalação e modal com dados do local"
```

---

### Task 8: Verificação final no navegador

**Files:** nenhum (correções pontuais se algo falhar, com commit próprio).

- [ ] **Step 1: Subir produção**

Run (background): `npm run build && npm start`
Expected: `Ready` em http://localhost:3000.

- [ ] **Step 2: Roteiro com Playwright (MCP)**

1. Abrir `/`; clicar no menu "Produtos" → seção `#produtos` visível sob o navbar (não coberta), rolagem rápida.
2. Clicar no card "Split Hi-Wall" → `/produtos/hi-wall` abre com fade; capacidade e marca pré-selecionadas; sem 404 de imagem no console (`browser_console_messages`).
3. Clicar numa capacidade em que a marca atual não existe → marca troca automaticamente; URL atualiza `?btu=...&marca=...`.
4. Marca indisponível aparece desabilitada.
5. Clicar "Voltar aos produtos" → volta para `/` na mesma posição da seção de produtos (não topo, não página intermediária).
6. Repetir 2 e usar o voltar do navegador (`browser_navigate_back`) → mesmo resultado.
7. Abrir `/produtos/cassete` direto em nova aba → "Voltar aos produtos" leva a `/#produtos`.
8. `/produtos/hi-wall?btu=abc&marca=xyz` → abre com seleção padrão.
9. "Solicitar orçamento" → popover; Esc fecha; "Não, só o aparelho" abre `wa.me` com mensagem do aparelho (verificar URL da nova aba com `browser_tabs`).
10. "Sim" → modal; enviar vazio mostra erros; Apartamento sem andar bloqueia; preencher Apartamento 8 + Quarto + vidros → abre `wa.me` com mensagem contendo "Apartamento — 8º andar".
11. Seção Serviços: clicar card expande etapas; seção Contato mostra formulário; rodapé sem botão WhatsApp.
12. Repetir 2–5 em viewport mobile (375×812).

- [ ] **Step 3: Encerrar servidor e reportar**

Parar o processo do `npm start`. Reportar ao usuário o resultado de cada item, e apontar `docs/catalogo-imagens.md` como a lista de imagens/logos a enviar.
