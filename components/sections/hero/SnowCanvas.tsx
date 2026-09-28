'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
}

export function SnowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let isMounted = true
    let rafId = 0
    let particles: Particle[] = []
    let width = 0
    let height = 0

    const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const seed = () => {
      const count = isDesktop() ? 60 : 30
      particles = Array.from({ length: count }, () => makeParticle(true))
    }

    const makeParticle = (spreadAcross: boolean): Particle => {
      const r = 1 + Math.random() * 3
      const speedFactor = 1 - (r - 1) / 3
      return {
        x: spreadAcross ? Math.random() * width : -r - Math.random() * 40,
        y: Math.random() * height,
        r,
        vx: 0.3 + speedFactor * 1.1,
        vy: -0.3 + Math.random() * 0.35,
        alpha: 0.3 + Math.random() * 0.4,
      }
    }

    const step = () => {
      if (!isMounted) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x > width + p.r) {
          const fresh = makeParticle(false)
          p.x = fresh.x
          p.y = Math.random() * height
          p.r = fresh.r
          p.vx = fresh.vx
          p.vy = fresh.vy
          p.alpha = fresh.alpha
        }
        if (p.y < -p.r) p.y = height + p.r
        if (p.y > height + p.r) p.y = -p.r
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
        ctx.fill()
      }
      rafId = requestAnimationFrame(step)
    }

    const start = () => {
      if (rafId) return
      rafId = requestAnimationFrame(step)
    }
    const stop = () => {
      if (!rafId) return
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    resize()
    seed()
    start()

    const ro = new ResizeObserver(() => {
      resize()
      seed()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start()
          else stop()
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      isMounted = false
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      particles = []
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
