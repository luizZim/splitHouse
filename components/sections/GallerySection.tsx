'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Modal } from '@/components/ui/Modal'
import { cn } from '@/lib/utils/cn'
import type { GalleryItem } from '@/lib/gallery/scan'

export const GALLERY_FILTER_EVENT = 'gallery:filter'

const chip = (active: boolean) =>
  cn(
    'px-4 h-9 rounded-full text-[13px] font-semibold border-[1.5px] transition-colors',
    active ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'
  )

export function GallerySection({ items }: { items: GalleryItem[] }) {
  const [tag, setTag] = useState<string | null>(null)
  const [subtag, setSubtag] = useState<string | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  const tags = useMemo(() => [...new Map(items.map((i) => [i.tag, i.tagLabel])).entries()], [items])
  const subtags = useMemo(
    () =>
      tag
        ? [...new Map(items.filter((i) => i.tag === tag && i.subtag).map((i) => [i.subtag!, i.subtagLabel!])).entries()]
        : [],
    [items, tag]
  )
  const visible = items.filter((i) => (!tag || i.tag === tag) && (!subtag || i.subtag === subtag))

  useEffect(() => {
    function onFilter(e: Event) {
      const t = (e as CustomEvent<string>).detail
      setTag(items.some((i) => i.tag === t) ? t : null)
      setSubtag(null)
    }
    window.addEventListener(GALLERY_FILTER_EVENT, onFilter)
    return () => window.removeEventListener(GALLERY_FILTER_EVENT, onFilter)
  }, [items])

  useEffect(() => {
    if (open === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % visible.length))
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + visible.length) % visible.length))
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, visible.length])

  if (items.length === 0) return null
  const current = open !== null ? visible[open] : null

  function selectTag(t: string | null) {
    setTag(t)
    setSubtag(null)
  }

  return (
    <section className="bg-surface py-24" id="galeria">
      <div className="container mx-auto px-6">
        <SectionHeader
          label="Galeria"
          title="Nossos trabalhos"
          subtitle="Fotos reais dos serviços da Split House. Filtre pelo tipo de serviço."
        />

        {tags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            <button type="button" onClick={() => selectTag(null)} className={chip(tag === null)}>
              Todos
            </button>
            {tags.map(([t, label]) => (
              <button key={t} type="button" onClick={() => selectTag(t)} className={chip(tag === t)}>
                {label}
              </button>
            ))}
          </div>
        )}
        {subtags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            <button type="button" onClick={() => setSubtag(null)} className={cn(chip(subtag === null), 'h-8 text-[12px]')}>
              Todas
            </button>
            {subtags.map(([s, label]) => (
              <button key={s} type="button" onClick={() => setSubtag(s)} className={cn(chip(subtag === s), 'h-8 text-[12px]')}>
                {label}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="flex flex-wrap justify-center gap-5 mt-8">
          <AnimatePresence initial={false}>
            {visible.map((item, i) => (
              <motion.button
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                type="button"
                onClick={() => setOpen(i)}
                className="group relative aspect-video w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] rounded-xl overflow-hidden bg-gray-200 shadow-[0_2px_12px_rgba(46,49,146,.08)] text-left"
                aria-label={`Ampliar foto: ${item.tagLabel}${item.subtagLabel ? ` — ${item.subtagLabel}` : ''}`}
              >
                <Image
                  src={item.src}
                  alt={`${item.tagLabel}${item.subtagLabel ? ` — ${item.subtagLabel}` : ''} — Split House`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute left-3 bottom-3 flex flex-wrap gap-1.5">
                  <span className="bg-brand/90 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    {item.tagLabel}
                  </span>
                  {item.subtagLabel && (
                    <span className="bg-white/90 text-brand text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                      {item.subtagLabel}
                    </span>
                  )}
                </div>
                <Expand size={18} className="absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Modal
        open={current !== null}
        onClose={() => setOpen(null)}
        title={current?.tagLabel ?? ''}
        summary={current?.subtagLabel}
        className="sm:max-w-[1100px]"
      >
        {current && (
          <div className="relative">
            <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <Image src={current.src} alt={`${current.tagLabel} — Split House`} fill sizes="100vw" className="object-contain" />
            </div>
            {visible.length > 1 && (
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setOpen((i) => (i! - 1 + visible.length) % visible.length)}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
                >
                  <ChevronLeft size={16} /> Anterior
                </button>
                <span className="text-[12px] text-gray-400">
                  {open! + 1} / {visible.length}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen((i) => (i! + 1) % visible.length)}
                  className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
                >
                  Próxima <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  )
}
