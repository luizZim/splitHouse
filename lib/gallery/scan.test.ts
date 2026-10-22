import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { scanGallery } from './scan'

let root: string

function touch(rel: string) {
  const file = path.join(root, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, '')
}

beforeAll(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'galeria-'))
  touch('galeria/placa-solar/comercial/antes-depois-01.jpg')
  touch('galeria/manutencao/higienizacao/b.webp')
  touch('galeria/manutencao/higienizacao/a.png')
  touch('galeria/manutencao/foto-solta.jpg')
  touch('galeria/instalacao/infra/c.avif')
  touch('galeria/instalacao/infra/leia-me.txt')
  touch('galeria/obra-especial/x.jpeg')
})

afterAll(() => fs.rmSync(root, { recursive: true, force: true }))

describe('scanGallery', () => {
  it('lê tag/subtag das pastas, ignora não-imagens e ordena por tag conhecida e nome', () => {
    const items = scanGallery(root)
    expect(items.map((i) => i.src)).toEqual([
      '/galeria/instalacao/infra/c.avif',
      '/galeria/manutencao/foto-solta.jpg',
      '/galeria/manutencao/higienizacao/a.png',
      '/galeria/manutencao/higienizacao/b.webp',
      '/galeria/placa-solar/comercial/antes-depois-01.jpg',
      '/galeria/obra-especial/x.jpeg',
    ])
  })

  it('usa rótulos conhecidos e gera rótulo para pastas novas', () => {
    const items = scanGallery(root)
    const solar = items.find((i) => i.tag === 'placa-solar')!
    expect(solar.tagLabel).toBe('Limpeza de placa solar')
    expect(solar.subtagLabel).toBe('Comercial')
    const infra = items.find((i) => i.subtag === 'infra')!
    expect(infra.subtagLabel).toBe('Infra (tubulação embutida)')
    const loose = items.find((i) => i.src.endsWith('foto-solta.jpg'))!
    expect(loose.subtag).toBeUndefined()
    expect(items.find((i) => i.tag === 'obra-especial')!.tagLabel).toBe('Obra especial')
  })

  it('sem pasta galeria retorna lista vazia', () => {
    expect(scanGallery(path.join(root, 'nao-existe'))).toEqual([])
  })
})
