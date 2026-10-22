# Imagens do catálogo

## Pendências (22/10/2026)

Todas as fotos dos aparelhos e logos estão presentes.

**Capas dos cards da home** (`public/catalog/<tipo>/capa.jpg`, foto de ambiente, horizontal, ~1920 px)
- Todas presentes. Piso Teto usa foto de produto; se tiver uma foto de instalação própria (loja/restaurante), substitua `public/catalog/piso-teto/capa.jpg`.

**Trocar por foto com evaporadora + condensadora** (hoje só mostram a unidade interna)
- Hi-Wall: Gree, LG, Samsung, Daikin
- Piso Teto: Gree, Midea, Elgin
- Cassete: Gree, LG, Samsung, Elgin, Daikin

**Já mostram as duas unidades:** Hi-Wall Midea, Hi-Wall Elgin, Cassete Midea.

**Ajustes de qualidade (opcional)**
- Hi-Wall LG: tem faixa de ícones embaixo da foto
- Cassete Midea: tem selo "Nº1" sobre a foto
- Mini VRF Gree: tem selo laranja "R410A / Inverter"
- Logo Midea: tem fundo azul (o ideal é fundo transparente)

Mini VRF e Splitão: a unidade externa sozinha é o padrão de mercado (a interna varia por projeto).

Coloque cada arquivo **exatamente** no caminho indicado. Não é preciso mexer no código: o site detecta o arquivo sozinho. Depois de adicionar as imagens, rode `npm run build` (ou reinicie o `npm run dev`).

Enquanto a imagem não existir, o site mostra a ilustração padrão (aparelho) ou o nome da marca (logo).

## Recomendações

- **Aparelhos:** `.webp` (preferido), `.png` ou `.jpg` · cerca de 1200×900 px · fundo transparente ou branco · aparelho centralizado, sem textos/preços.
- **Logos:** `.svg` (preferido) ou `.png` com fundo transparente · versão colorida horizontal.
- Use a imagem da unidade interna (evaporadora). Uma imagem por linha vale para todas as capacidades.

## Aparelhos (19)

| Tipo | Marca | Linha | Arquivo | Página de referência |
|---|---|---|---|---|
| Split Hi-Wall | Gree | G-Top Auto Inverter | `public/catalog/hi-wall/gree.webp` | https://gree.com.br/produto/g-top-auto-inverter/ |
| Split Hi-Wall | Midea | AI Ecomaster | `public/catalog/hi-wall/midea.webp` | https://www.midea.com.br/ar-condicionado-split-12000-btus-inverter-ai-ecomaster-frio-midea/p |
| Split Hi-Wall | LG | AI Dual Inverter Voice | `public/catalog/hi-wall/lg.webp` | https://www.lg.com/br/ar-condicionado-residencial/dual-inverter-split/s3-w12ja31a-1/ |
| Split Hi-Wall | Samsung | WindFree AI | `public/catalog/hi-wall/samsung.webp` | https://www.samsung.com/br/air-conditioners/wall-mount/kit-air-conditioner-split-inverter-windfree-connect-ai-9000-btus-cold-white-220v-f-ar09dyfaawk/ |
| Split Hi-Wall | Elgin | Eco Inverter Pro | `public/catalog/hi-wall/elgin.webp` | https://www.elgin.com.br/ar-condicionado-split-high-wall-eco-inverter-pro-12000-btus-frio-wifi-220v/p |
| Split Hi-Wall | Daikin | Split Hi Wall Full Inverter | `public/catalog/hi-wall/daikin.webp` | https://www.daikin.com.br/produto/split-hi-wall-full-inverter |
| Piso Teto | Gree | G-Prime Inverter Compact | `public/catalog/piso-teto/gree.webp` | https://gree.com.br/produto/g-prime-inverter-compact-piso-teto/ |
| Piso Teto | Midea | Split Teto Inverter | `public/catalog/piso-teto/midea.webp` | https://www.midea.com.br/ar-condicionado-split-teto-36000-btu-inverter-frio-midea/p |
| Piso Teto | Elgin | Inverter Wi-Fi PX | `public/catalog/piso-teto/elgin.webp` | https://www.elgin.com.br/ar-condicionado/ar-condicionado-piso-teto |
| Cassete | Gree | G-Prime Inverter Compact | `public/catalog/cassete/gree.webp` | https://gree.com.br/produto/g-prime-inverter-compact-cassete/ |
| Cassete | Midea | Split Cassete Inverter 4 Vias | `public/catalog/cassete/midea.webp` | https://www.midea.com.br/ar-condicionado-split-cassete-36-000-btus-inverter-frio-midea-4-vias/p |
| Cassete | LG | Cassete Inverter | `public/catalog/cassete/lg.webp` | https://www.lg.com/br/ar-condicionado-comercial-leve/at-w24gplp1/ |
| Cassete | Samsung | WindFree Cassete 4 Vias | `public/catalog/cassete/samsung.webp` | https://shop.samsung.com/br/ar-condicionado-cassete-4-vias-inverter-samsung-windfree-48000-btus-quente-frio-220v/p |
| Cassete | Elgin | Cassete Inverter Wi-Fi KX | `public/catalog/cassete/elgin.webp` | https://www.elgin.com.br/ar-condicionado-cassete-inverter-wi-fi-kx-36000-btuh-frio-220v/p |
| Cassete | Daikin | SkyAir R-32 Cassete Round Flow 4 Vias | `public/catalog/cassete/daikin.webp` | https://www.daikin.com.br/produto/skyair-r32 |
| Mini VRF | Gree | GMV Mini | `public/catalog/mini-vrf/gree.webp` | https://gree.com.br/produto/gmv-mini-slim/ |
| Mini VRF | Midea | ATOM | `public/catalog/mini-vrf/midea.webp` | https://carrierdobrasil.com.br/blog/produtos/mini-vrf-atom-midea-carrier |
| Mini VRF | LG | Multi V S | `public/catalog/mini-vrf/lg.webp` | https://www.lg.com/br/business/multi-v-s |
| Mini VRF | Daikin | VRV S | `public/catalog/mini-vrf/daikin.webp` | https://www.daikin.com.br/produto/vrv-s-alta-eficiencia-sazonal |
| Splitão | Elgin | Splitão | `public/catalog/splitao/elgin.webp` | https://elgin.com.br/ar-condicionado/ar-condicionado-splitao |

> Para Mini VRF e Splitão, a imagem mais representativa é a da **unidade externa (condensadora)**.

## Logos (6)

| Marca | Arquivo |
|---|---|
| Gree | `public/brands/gree.svg` |
| Midea | `public/brands/midea.svg` |
| LG | `public/brands/lg.svg` |
| Samsung | `public/brands/samsung.svg` |
| Elgin | `public/brands/elgin.svg` |
| Daikin | `public/brands/daikin.svg` |

## Marcas sem linha em alguns tipos

Não encontramos linha atual no site oficial brasileiro para:

- **Piso Teto:** LG, Samsung, Daikin
- **Mini VRF:** Samsung, Elgin
- **Splitão:** Gree, Midea, LG, Samsung, Daikin

Se você trabalha com alguma dessas, envie o modelo que adicionamos ao catálogo.
