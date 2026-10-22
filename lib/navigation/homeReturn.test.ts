import { describe, it, expect, beforeEach } from 'vitest'
import { canGoBackHome, consumeRestore, rememberHomeScroll, requestRestore } from './homeReturn'

beforeEach(() => {
  consumeRestore()
})

describe('retorno à home', () => {
  it('card → produto → voltar restaura a posição', () => {
    rememberHomeScroll('/produtos/hi-wall', 3379)
    expect(canGoBackHome('/produtos/hi-wall')).toBe(true)
    requestRestore('/')
    expect(consumeRestore()).toBe(3379)
  })

  it('produto aberto por outro caminho (rodapé) não volta pelo histórico', () => {
    rememberHomeScroll('/produtos/hi-wall', 3379)
    expect(canGoBackHome('/produtos/cassete')).toBe(false)
  })

  it('sem card clicado (link direto / nova carga) não volta pelo histórico', () => {
    expect(canGoBackHome('/produtos/cassete')).toBe(false)
  })

  it('voltar do navegador para outro produto não agenda restauração', () => {
    rememberHomeScroll('/produtos/hi-wall', 3379)
    requestRestore('/produtos/hi-wall')
    expect(consumeRestore()).toBeNull()
  })

  it('home montada sem retorno pedido descarta a posição salva', () => {
    rememberHomeScroll('/produtos/hi-wall', 3379)
    expect(consumeRestore()).toBeNull()
    requestRestore('/')
    expect(consumeRestore()).toBeNull()
    expect(canGoBackHome('/produtos/hi-wall')).toBe(false)
  })
})
