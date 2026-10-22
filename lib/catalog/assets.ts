import fs from 'node:fs'
import path from 'node:path'
import type { Brand, ProductLine } from './types'

const EXTS = ['.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg']

export function findPublicAsset(base: string): string | undefined {
  for (const ext of EXTS) {
    const rel = `${base}${ext}`
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return rel
  }
  return undefined
}

export function withLineImages(lines: ProductLine[]): ProductLine[] {
  return lines.map((l) => ({ ...l, image: findPublicAsset(`/catalog/${l.type}/${l.brand}`) }))
}

export function withBrandLogos(brands: Brand[]): Brand[] {
  return brands.map((b) => ({ ...b, logo: findPublicAsset(`/brands/${b.id}`) }))
}
