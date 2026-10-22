/**
 * Seção ativa do menu: a mais abaixo cujo topo (relativo à janela) já passou de `probe`.
 * No fim da página, a última seção. `null` = topo da página (Home).
 */
export function activeSectionAt(
  sections: { id: string; top: number }[],
  probe: number,
  atBottom: boolean
): string | null {
  const sorted = [...sections].sort((a, b) => a.top - b.top)
  if (atBottom && sorted.length) return sorted[sorted.length - 1].id
  let active: string | null = null
  for (const s of sorted) {
    if (s.top <= probe) active = s.id
  }
  return active
}
