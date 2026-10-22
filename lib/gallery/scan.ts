import fs from 'node:fs'
import path from 'node:path'
import { GALLERY_TAGS, humanize } from '@/lib/data/galleryTags'

export interface GalleryItem {
  src: string
  tag: string
  tagLabel: string
  subtag?: string
  subtagLabel?: string
}

const IMAGE = /\.(jpe?g|png|webp|avif)$/i
const TAG_ORDER = Object.keys(GALLERY_TAGS)

function dirs(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
}

function images(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && IMAGE.test(d.name))
    .map((d) => d.name)
    .sort()
}

/** Lê public/galeria/<tag>/[<subtag>/]<foto> (no build). */
export function scanGallery(publicDir: string = path.join(process.cwd(), 'public')): GalleryItem[] {
  const root = path.join(publicDir, 'galeria')
  if (!fs.existsSync(root)) return []

  const tags = dirs(root).sort((a, b) => {
    const ia = TAG_ORDER.indexOf(a)
    const ib = TAG_ORDER.indexOf(b)
    return (ia < 0 ? Infinity : ia) - (ib < 0 ? Infinity : ib) || a.localeCompare(b)
  })

  const items: GalleryItem[] = []
  for (const tag of tags) {
    const known = GALLERY_TAGS[tag]
    const tagLabel = known?.label ?? humanize(tag)
    const tagDir = path.join(root, tag)
    for (const file of images(tagDir)) {
      items.push({ src: `/galeria/${tag}/${file}`, tag, tagLabel })
    }
    for (const subtag of dirs(tagDir).sort()) {
      const subtagLabel = known?.subtags[subtag] ?? humanize(subtag)
      for (const file of images(path.join(tagDir, subtag))) {
        items.push({ src: `/galeria/${tag}/${subtag}/${file}`, tag, tagLabel, subtag, subtagLabel })
      }
    }
  }
  return items
}
