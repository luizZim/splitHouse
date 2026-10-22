import { describe, it, expect } from 'vitest'
import { activeSectionAt } from './scrollSpy'

// tops relativos à janela (getBoundingClientRect().top)
const at = (tops: number[]) => ['servicos', 'simulador', 'produtos', 'contato'].map((id, i) => ({ id, top: tops[i] }))

describe('activeSectionAt', () => {
  it('no topo da página (hero) nenhuma seção está ativa → Home', () => {
    expect(activeSectionAt(at([700, 1500, 2300, 3100]), 200, false)).toBeNull()
  })

  it('ativa a última seção cujo topo já passou da linha de referência', () => {
    expect(activeSectionAt(at([-50, 750, 1550, 2350]), 200, false)).toBe('servicos')
    expect(activeSectionAt(at([-900, 150, 950, 1750]), 200, false)).toBe('simulador')
    expect(activeSectionAt(at([-1700, -650, 120, 950]), 200, false)).toBe('produtos')
  })

  it('no fim da página ativa a última seção mesmo que o topo não tenha chegado à linha', () => {
    expect(activeSectionAt(at([-2500, -1700, -900, 400]), 200, true)).toBe('contato')
  })

  it('ignora a ordem do array (usa a posição)', () => {
    const sections = [
      { id: 'contato', top: 2350 },
      { id: 'servicos', top: -50 },
    ]
    expect(activeSectionAt(sections, 200, false)).toBe('servicos')
  })
})
