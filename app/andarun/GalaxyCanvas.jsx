'use client'
import { useEffect, useRef } from 'react'
import styles from './page.module.css'

const STAR_COUNT = 320

function newStar(W, H, near = false) {
  const angle = Math.random() * Math.PI * 2
  const dist = near ? Math.random() * 0.04 + 0.005 : Math.random() * 0.08 + 0.005
  const speed = Math.random() * 0.0055 + 0.003
  const hue = Math.random() < 0.6 ? 210 + Math.random() * 40 : 270 + Math.random() * 50
  return { angle, dist, speed, size: Math.random() * 1.6 + 0.4, hue }
}

export default function GalaxyCanvas({ active }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const starsRef = useRef([])
  const speedRef = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      starsRef.current = Array.from({ length: STAR_COUNT }, () => newStar(canvas.width, canvas.height))
    }

    function frame() {
      const W = canvas.width
      const H = canvas.height
      const cx = W / 2
      const cy = H / 2
      const R = Math.max(W, H)

      // Fade trail
      ctx.fillStyle = 'rgba(4,6,15,0.22)'
      ctx.fillRect(0, 0, W, H)

      // Central nebula glow
      const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.52)
      g1.addColorStop(0, 'rgba(160,180,255,0.13)')
      g1.addColorStop(0.35, 'rgba(100,60,255,0.07)')
      g1.addColorStop(0.7, 'rgba(180,60,255,0.035)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, W, H)

      // Ramp speed up to warp, then cruise
      speedRef.current = Math.min(speedRef.current + 0.012, 3.4)

      const stars = starsRef.current
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.dist += s.speed * speedRef.current

        const x  = cx + Math.cos(s.angle) * s.dist * R
        const y  = cy + Math.sin(s.angle) * s.dist * R * 0.62
        const tx = cx + Math.cos(s.angle) * Math.max(s.dist - s.speed * speedRef.current * 14, 0.001) * R
        const ty = cy + Math.sin(s.angle) * Math.max(s.dist - s.speed * speedRef.current * 14, 0.001) * R * 0.62

        const alpha = Math.min(s.dist * 4, 1) * 0.85
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(x, y)
        ctx.strokeStyle = `hsla(${s.hue},90%,88%,${alpha})`
        ctx.lineWidth = s.size * Math.min(speedRef.current * 0.5, 1.6)
        ctx.stroke()

        if (x < -8 || x > W + 8 || y < -8 || y > H + 8) {
          stars[i] = newStar(W, H, true)
        }
      }

      // Hot core flare
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.1)
      core.addColorStop(0, `rgba(240,248,255,${0.7 * Math.min(speedRef.current / 2, 1)})`)
      core.addColorStop(0.25, `rgba(140,160,255,${0.25 * Math.min(speedRef.current / 2, 1)})`)
      core.addColorStop(1, 'transparent')
      ctx.fillStyle = core
      ctx.fillRect(0, 0, W, H)

      rafRef.current = requestAnimationFrame(frame)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    frame()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.galaxyCanvas} aria-hidden="true" />
}
