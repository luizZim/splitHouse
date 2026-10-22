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
