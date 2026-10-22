# Single page, catálogo configurável e orçamento via WhatsApp — Design

Data: 2026-10-22
Status: aprovado em conversa, aguardando revisão da spec

## Objetivo

1. Navegação mais rápida e suave.
2. Site em página única (home), com uma única tela separada por tipo de aparelho; "voltar" sempre retorna à home na seção de produtos (sem ciclo de páginas).
3. Catálogo sem preço onde o cliente escolhe **capacidade + marca** e vê imagem, modelo e especificações.
4. Orçamento enviado ao WhatsApp com dados do aparelho e, opcionalmente, dados para orçamento de instalação.
5. Remover botão de contato do rodapé.

Fora de escopo: preços, carrinho, backend, CMS.

## Entrega em 3 etapas

| Etapa | Conteúdo |
|---|---|
| 1 | Navegação + single page + remoções |
| 2 | Tela do catálogo + fluxo de orçamento (com dados provisórios) |
| 3 | Pesquisa de modelos nos sites dos fabricantes + lista de imagens para o usuário |

---

## Etapa 1 — Navegação e single page

### Rotas finais
- `/` — home com todas as seções.
- `/produtos/[tipo]` — `tipo ∈ {hi-wall, piso-teto, cassete, mini-vrf, splitao}`, gerado estaticamente (`generateStaticParams`), `notFound()` para tipo inválido.

### Removidos
- `app/servicos`, `app/sobre`, `app/contato`, `app/simulador`, `app/produtos/page.tsx`, `app/produtos/loading.tsx`, `app/produtos/[categoria]/loading.tsx`, `app/servicos/loading.tsx`, `app/produtos/[categoria]/[produto]`.
- Botão WhatsApp do rodapé (`FooterWhatsAppBtn`).
- Botão "Ver catálogo completo" da `ProductsSection`.
- Link "saiba mais" para `/sobre` na `AboutSection`; link `/contato` da `CTASection`.
- Links do rodapé passam a apontar para âncoras da home (`/#servicos`) e para `/produtos/[tipo]`.

### Conteúdo migrado para a home
- **Serviços**: cada card da `ServicesSection` expande (accordion animado) mostrando "quando contratar" e "etapas" (dados já existentes em `lib/data/services.ts`). Sem navegação.
- **Contato**: `ContatoForm` passa a ser renderizado na seção final (`id="contato"`), ao lado do CTA.
- **Sobre**: texto extra da página `/sobre` é descartado.

### Velocidade e suavidade
- `Navbar`: duração da rolagem de 1100 ms → ~600 ms, easing `easeInOutCubic`; remover duplo `requestAnimationFrame` quando já está na home.
- Vindo de `/produtos/[tipo]` para uma âncora: navegar para `/#id` e rolar ao montar a home (comportamento atual mantido, mais rápido).
- Links para `/produtos/[tipo]` com prefetch padrão do `next/link` (rota estática).
- Botão "Voltar" da tela de produto: se a navegação anterior foi a home do mesmo site (flag em `sessionStorage` setada ao clicar no card), usa `router.back()` (restaura scroll); caso contrário, `router.push('/#produtos')`.
- Transição de entrada da tela de produto: fade/slide de ~200 ms via `app/produtos/[tipo]/template.tsx`.
- Comparações de desempenho devem usar `npm run build && npm start`.

---

## Etapa 2 — Catálogo e orçamento

### Modelo de dados — `lib/data/catalog.ts`

```ts
type BrandId = 'gree' | 'midea' | 'lg' | 'samsung' | 'elgin' | 'daikin'
type TypeId = 'hi-wall' | 'piso-teto' | 'cassete' | 'mini-vrf' | 'splitao'

interface Brand { id: BrandId; name: string; logo: string }   // logo: /brands/<id>.svg

interface CapacityVariant {
  btu: number                 // 12000
  model?: string              // código do fabricante, ex. "GWC12AGA-D6NNA1A"
  voltage: string             // "220V"
  energyLabel?: string        // "A" (Procel/INMETRO)
  noiseDb?: number            // unidade interna
  areaM2?: [number, number]   // só se informado pelo fabricante
}

interface ProductLine {
  type: TypeId
  brand: BrandId
  name: string                // "G-Top Inverter"
  image: string               // /catalog/<type>/<brand>.webp
  inverter: boolean
  refrigerant?: string        // "R-32"
  wifi?: boolean
  highlights: string[]        // 3–4 diferenciais
  source: string              // URL da página do fabricante
  variants: CapacityVariant[]
}

interface ProductType {
  id: TypeId
  label: string; badge?: string; accent: string; bg: string
  summary: string             // texto curto
  idealFor: string[]          // locais indicados
  installation: string        // tipo de instalação
}
```

Uma linha por marca por tipo. Marcas que não fabricam um tipo simplesmente não têm linha nele.

### Área indicada
`areaFor(btu)` usa tabela padrão de mercado; se `variant.areaM2` existir, prevalece. Exibido com aviso "referência aproximada" e link para `/#simulador`.

| BTU | Área |
|---|---|
| 9.000 | até 15 m² |
| 12.000 | 15–20 m² |
| 18.000 | 20–30 m² |
| 22.000–24.000 | 30–40 m² |
| 30.000 | 40–50 m² |
| 36.000 | 50–60 m² |
| 48.000 | 60–80 m² |
| 55.000–60.000 | 80–100 m² |

(Valores para Mini VRF/Splitão com capacidades maiores seguem a mesma progressão ~600 BTU/m².)

### Home — `ProductsSection`
5 cards de tipo, cada um com faixa de BTU (derivada dos dados), logos das marcas disponíveis e link para `/produtos/[tipo]`.

### Tela `/produtos/[tipo]`
- Server component carrega o tipo; componente cliente `ProductConfigurator` cuida da seleção.
- Seletores: **Capacidade** (união das capacidades de todas as marcas do tipo) e **Marca**.
- Estado inicial: `?btu=&marca=` da URL; senão a menor capacidade e a primeira marca que a possui.
- Marca sem a capacidade selecionada: botão desabilitado com dica "indisponível em X BTU". Ao trocar capacidade, se a marca atual não tiver, seleciona a primeira marca disponível.
- Seleção sincronizada na URL com `router.replace` (sem nova entrada no histórico, `scroll: false`).
- Painel: imagem (fallback `ACIllustration` se não houver imagem), logo, nome da linha, BTU, área indicada, selo, inverter, tensão, gás, ruído, Wi-Fi, diferenciais, "ideal para" e instalação do tipo. Troca com fade ~150 ms.
- Botão único **Solicitar orçamento**.

### Fluxo de orçamento
1. Clique → popover ancorado ao botão: "Deseja também o orçamento de instalação?" **Sim / Não**. Fecha com Esc/clique fora.
2. **Não** → `openWhatsApp(buildQuoteMessage(selection))`.
3. **Sim** → modal central:
   - **Tipo de imóvel** (obrigatório): Casa térrea (parede com parede) · Apartamento → campo **Andar** (obrigatório, número) · Condomínio · Outro → campo texto (obrigatório).
   - **Local** (obrigatório): Quarto · Sala · Cozinha · Escritório · Outro → campo texto.
   - Checkbox: "Muitos eletrodomésticos que geram calor no local".
   - Checkbox: "Muitos vidros / sol direto".
   - **Enviar pelo WhatsApp** → `openWhatsApp(buildQuoteMessage(selection, install))`.
   - Validação com `react-hook-form` + `zod` (já instalados). Modal acessível (foco preso, Esc fecha, `aria-modal`).

### Mensagem — `buildQuoteMessage` em `lib/whatsapp/index.ts`
```
Olá! Vim pelo site e gostaria de um orçamento:

*Aparelho*
• Split Hi-Wall — Gree G-Top Inverter
• Capacidade: 12.000 BTU · 220V · Selo A
• Modelo: GWC12AGA-D6NNA1A

*Instalação*: Sim
• Imóvel: Apartamento — 8º andar
• Local: Quarto
• Muitos eletrodomésticos que geram calor: Não
• Muitos vidros/sol direto: Sim
```
Sem instalação: bloco `*Instalação*: Não, apenas o aparelho`. Campos opcionais ausentes são omitidos.

---

## Etapa 3 — Pesquisa de dados
- Para cada tipo × marca, buscar no site oficial brasileiro do fabricante a linha atual mais representativa (lançamentos 2025–2026 quando houver) e preencher `catalog.ts`, com `source` apontando para a página consultada.
- Dado não encontrado na fonte oficial fica `undefined` (não exibido) — nada inventado.
- Entregar ao usuário uma tabela: tipo · marca · linha · arquivo de imagem esperado (`public/catalog/<tipo>/<marca>.webp`) · URL de referência; e lista de logos (`public/brands/<marca>.svg`).

---

## Testes
- Adicionar **Vitest** (dev dependency) com script `npm test`.
- Testes unitários:
  - `buildQuoteMessage`: sem instalação; com apartamento + andar; com "Outro" texto; omissão de campos opcionais.
  - Seleção do catálogo: capacidades do tipo, marcas disponíveis por capacidade, fallback de marca ao trocar capacidade, `areaFor`.
- Verificação final: `npm run build` sem erros e teste manual no navegador (Playwright) do ciclo home → produto → trocar seleção → orçamento → voltar (deve retornar a `#produtos`).
