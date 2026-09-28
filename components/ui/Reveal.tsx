'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { staggerContainer } from '@/lib/motion'

interface RevealProps extends HTMLMotionProps<'div'> {
  stagger?: number
  amount?: number
}

export function Reveal({ stagger = 0.1, amount = 0.2, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '-80px' }}
      variants={staggerContainer(stagger)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
