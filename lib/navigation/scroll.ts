export const NAVBAR_OFFSET = 96

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

/** Rola suavemente até a seção (ou ao topo se `id` for null), descontando o menu fixo. */
export function scrollToId(id: string | null, onDone?: () => void) {
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
