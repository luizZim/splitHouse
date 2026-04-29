import type { Service } from '@/types'

export const SERVICES: Service[] = [
  {
    id: 'instalacao',
    title: 'Instalação',
    color: '#2E3192',
    desc: 'Instalação profissional de aparelhos residenciais e comerciais. Trabalhamos com splits Hi-Wall, cassete, piso teto e mini VRF.',
    when: [
      'Novo imóvel ou reforma',
      'Primeiro ar condicionado',
      'Troca de equipamento antigo',
      'Expansão do sistema',
    ],
    steps: [
      'Visita técnica gratuita para avaliação',
      'Emissão do orçamento detalhado',
      'Agendamento conforme sua disponibilidade',
      'Instalação com mão de obra qualificada',
      'Teste e entrega com garantia',
    ],
  },
  {
    id: 'manutencao',
    title: 'Manutenção',
    color: '#1478AA',
    desc: 'Manutenção preventiva e corretiva para garantir eficiência e vida útil do seu equipamento. Limpeza, higienização, revisão de gás e mais.',
    when: [
      'A cada 6 meses (preventiva)',
      'Aparelho parou de gelar',
      'Fazendo barulho incomum',
      'Vazando água',
      'Consumo de energia aumentou',
    ],
    steps: [
      'Diagnóstico completo do sistema',
      'Limpeza e higienização dos filtros',
      'Verificação de gás refrigerante',
      'Limpeza das serpentinas',
      'Relatório de condições do equipamento',
    ],
  },
  {
    id: 'revenda',
    title: 'Revenda',
    color: '#F7941D',
    desc: 'Venda e distribuição de equipamentos das principais marcas. Compramos de distribuidor e repassamos com preço justo.',
    when: [
      'Precisa comprar um ar condicionado',
      'Quer instalar e já ter o equipamento',
      'Busca marcas específicas',
      'Projeto comercial ou industrial',
    ],
    steps: [
      'Consulta sobre a necessidade do ambiente',
      'Indicação do modelo ideal',
      'Fornecimento do equipamento',
      'Instalação profissional inclusa',
      'Garantia do produto e do serviço',
    ],
  },
  {
    id: 'mini-vrf',
    title: 'Mini VRF',
    color: '#5462DF',
    desc: 'Instalação de sistemas multi-split Mini VRF para escritórios, lojas e edifícios comerciais de pequeno e médio porte.',
    when: [
      'Escritórios com múltiplas salas',
      'Lojas e clínicas',
      'Pequenos edifícios comerciais',
      'Projetos com 2 a 8 ambientes',
    ],
    steps: [
      'Visita técnica para levantamento',
      'Dimensionamento do sistema',
      'Instalação das unidades internas e externas',
      'Conexão e teste do sistema',
      'Entrega com garantia e orientações',
    ],
  },
]
