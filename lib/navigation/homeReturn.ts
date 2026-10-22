// Estado em memória: sobrevive à navegação client-side (home → produto → voltar)
// e é descartado em qualquer carregamento completo da página.
let saved: { path: string; y: number } | null = null
let restorePending = false

/** Chamado ao clicar no card da home: guarda a posição e o produto de destino. */
export function rememberHomeScroll(path: string, y: number) {
  saved = { path, y }
  restorePending = false
}

/** O histórico anterior é a home somente se o produto atual foi aberto pelo card. */
export function canGoBackHome(currentPath: string): boolean {
  return saved?.path === currentPath
}

/** Agenda a restauração apenas quando o destino da navegação é a home. */
export function requestRestore(destinationPath: string) {
  if (destinationPath === '/' && saved) restorePending = true
}

/** Chamado ao montar a home: retorna a posição se houve retorno; sempre limpa o estado. */
export function consumeRestore(): number | null {
  const y = restorePending && saved ? saved.y : null
  saved = null
  restorePending = false
  return y
}
