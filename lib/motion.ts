import type { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export function staggerContainer(stagger = 0.1): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  }
}
