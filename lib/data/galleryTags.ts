/** Rótulos das pastas de public/galeria/<tag>/<subtag>/. A ordem define a ordem dos filtros. */
export const GALLERY_TAGS: Record<string, { label: string; subtags: Record<string, string> }> = {
  instalacao: {
    label: 'Instalação',
    subtags: {
      'hi-wall': 'Hi-Wall',
      'piso-teto': 'Piso Teto',
      cassete: 'Cassete',
      infra: 'Infra (tubulação embutida)',
      condensadora: 'Condensadora',
    },
  },
  manutencao: {
    label: 'Manutenção',
    subtags: {
      higienizacao: 'Higienização',
      'troca-de-gas': 'Troca de gás',
      'limpeza-de-linha': 'Limpeza de linha',
      'troca-de-pecas': 'Troca de peças',
      'placa-eletronica': 'Placa eletrônica',
    },
  },
  'mini-vrf': {
    label: 'Mini VRF',
    subtags: {
      infra: 'Infra (tubulação embutida)',
      condensadora: 'Condensadora',
      evaporadoras: 'Evaporadoras',
    },
  },
  'placa-solar': {
    label: 'Limpeza de placa solar',
    subtags: { residencial: 'Residencial', comercial: 'Comercial' },
  },
}

export function humanize(slug: string): string {
  const s = slug.replace(/[-_]+/g, ' ').trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}
