'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import styles from './HomeScene.module.css'

export default function HomeScene() {
  const pathname = usePathname()
  if (pathname !== '/' && pathname !== '/rechner') return null

  return <div className={styles.background} data-home-scene aria-hidden="true">
    <GalaxyAtom />
    <div className={styles.grid} />
  </div>
}


function GalaxyAtom() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0, h = 0, dpr = 1

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // Stars
    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + 0.2,
      base: Math.random() * 0.55 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.0004 + Math.random() * 0.0008,
    }))

    // Stream bezier control points (relative to w,h)
    // from galaxy (left-bottom) to atom (right-center)
    const STREAM_DEFS = [
      { cp1: [0.22, 0.9],  cp2: [0.55, 0.15], color: [100,160,255], width: 0.9 },
      { cp1: [0.18, 0.82], cp2: [0.60, 0.30], color: [120,140,255], width: 0.7 },
      { cp1: [0.28, 0.78], cp2: [0.52, 0.50], color: [80,190,255],  width: 0.8 },
      { cp1: [0.14, 0.95], cp2: [0.65, 0.55], color: [150,110,255], width: 0.6 },
    ]

    // Particles per stream
    const streamParticles = STREAM_DEFS.flatMap((s, si) =>
      Array.from({ length: 10 }, (_, i) => ({
        si, t: i / 10,
        speed: 0.00016 + Math.random() * 0.00012,
        r: Math.random() * 1.3 + 0.6,
      }))
    )

    // Electron orbits around atom
    const ORBITS = [
      { rx: 0.088, ry: 0.046, tilt: 0.0,  speed: 0.00095, phase: 0.0 },
      { rx: 0.072, ry: 0.058, tilt: 1.15, speed: 0.00070, phase: 2.1 },
      { rx: 0.100, ry: 0.034, tilt:-0.65, speed: 0.00115, phase: 4.3 },
    ]

    const bezPt = (t, x0,y0, cx1,cy1, cx2,cy2, x1,y1) => {
      const u = 1-t
      return {
        x: u*u*u*x0 + 3*u*u*t*cx1 + 3*u*t*t*cx2 + t*t*t*x1,
        y: u*u*u*y0 + 3*u*u*t*cy1 + 3*u*t*t*cy2 + t*t*t*y1,
      }
    }

    const drawGalaxy = (gx, gy, time) => {
      const pulse = (Math.sin(time * 0.00038) + 1) / 2

      // Outer haze
      const haze = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.22)
      haze.addColorStop(0,   `rgba(160,100,255,${0.18 + pulse*0.06})`)
      haze.addColorStop(0.45,'rgba(80,60,200,0.07)')
      haze.addColorStop(1,   'rgba(40,20,140,0)')
      ctx.fillStyle = haze
      ctx.fillRect(0, 0, w, h)

      // Spiral arms
      for (let arm = 0; arm < 3; arm++) {
        const offset = (arm / 3) * Math.PI * 2
        ctx.beginPath()
        let first = true
        for (let i = 0; i <= 260; i++) {
          const u = i / 260
          const angle = offset + u * Math.PI * 2.8 + time * 0.000038
          const r = u * w * 0.14
          const x = gx + Math.cos(angle) * r * 1.5
          const y = gy + Math.sin(angle) * r * 0.45
          first ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          first = false
        }
        const ag = ctx.createLinearGradient(gx, gy, gx + w*0.14, gy)
        ag.addColorStop(0,   `rgba(255,200,140,${0.28 + pulse*0.12})`)
        ag.addColorStop(0.5, `rgba(150,90,255,0.14)`)
        ag.addColorStop(1,   'rgba(70,50,200,0)')
        ctx.strokeStyle = ag
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // Core
      const core = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.048)
      core.addColorStop(0,   `rgba(255,225,170,${0.9 + pulse*0.1})`)
      core.addColorStop(0.35,`rgba(230,150,255,0.45)`)
      core.addColorStop(1,   'rgba(100,50,200,0)')
      ctx.fillStyle = core
      ctx.beginPath(); ctx.arc(gx, gy, w * 0.048, 0, Math.PI*2); ctx.fill()
    }

    const drawStreams = (gx, gy, ax, ay, time) => {
      STREAM_DEFS.forEach((s, si) => {
        const [cx1,cy1] = [s.cp1[0]*w, s.cp1[1]*h]
        const [cx2,cy2] = [s.cp2[0]*w, s.cp2[1]*h]
        const [r,g,b] = s.color
        ctx.beginPath()
        ctx.moveTo(gx, gy)
        ctx.bezierCurveTo(cx1,cy1, cx2,cy2, ax, ay)
        ctx.strokeStyle = `rgba(${r},${g},${b},0.06)`
        ctx.lineWidth = s.width
        ctx.stroke()
      })

      streamParticles.forEach(p => {
        if (!reducedMotion) p.t = (p.t + p.speed) % 1
        const s = STREAM_DEFS[p.si]
        const [cx1,cy1] = [s.cp1[0]*w, s.cp1[1]*h]
        const [cx2,cy2] = [s.cp2[0]*w, s.cp2[1]*h]
        const pos = bezPt(p.t, gx,gy, cx1,cy1, cx2,cy2, ax,ay)
        const alpha = Math.sin(p.t * Math.PI) * 0.75
        const [r,g,b] = s.color
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`
        ctx.shadowBlur = 5
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    const drawAtom = (ax, ay, time) => {
      const pulse = (Math.sin(time * 0.00065) + 1) / 2

      // Nucleus glow
      const ng = ctx.createRadialGradient(ax, ay, 0, ax, ay, w * 0.055)
      ng.addColorStop(0,   `rgba(170,130,255,${0.65+pulse*0.2})`)
      ng.addColorStop(0.5, `rgba(110,80,230,0.28)`)
      ng.addColorStop(1,   'rgba(80,50,190,0)')
      ctx.fillStyle = ng; ctx.beginPath(); ctx.arc(ax, ay, w*0.055, 0, Math.PI*2); ctx.fill()

      // Nucleus spheres
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + time * 0.00015
        const nr = i % 2 === 0 ? 7 : 3.5
        const nx = ax + Math.cos(a) * nr, ny = ay + Math.sin(a) * nr * 0.8
        const sg = ctx.createRadialGradient(nx, ny, 0, nx, ny, 5)
        sg.addColorStop(0, `rgba(200,170,255,${0.85+pulse*0.1})`)
        sg.addColorStop(1, 'rgba(140,100,255,0)')
        ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(nx, ny, 5, 0, Math.PI*2); ctx.fill()
      }

      // Electron orbits
      ORBITS.forEach(orb => {
        const rx = orb.rx * w, ry = orb.ry * h
        ctx.save(); ctx.translate(ax, ay); ctx.rotate(orb.tilt)
        // orbit ring
        ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI*2)
        ctx.strokeStyle = 'rgba(110,170,255,0.16)'; ctx.lineWidth = 0.9; ctx.stroke()
        // electron
        const ea = orb.phase + time * orb.speed
        const ex = Math.cos(ea) * rx, ey = Math.sin(ea) * ry
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 9)
        eg.addColorStop(0, 'rgba(180,215,255,0.95)')
        eg.addColorStop(1, 'rgba(100,160,255,0)')
        ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex, ey, 9, 0, Math.PI*2); ctx.fill()
        ctx.beginPath(); ctx.arc(ex, ey, 2.5, 0, Math.PI*2)
        ctx.fillStyle = '#e8f4ff'; ctx.fill()
        ctx.restore()
      })
    }

    let animId
    const draw = (time = 0) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#070c1d'; ctx.fillRect(0, 0, w, h)

      // Stars
      stars.forEach(star => {
        const a = star.base * (0.55 + 0.45 * Math.sin(star.phase + time * star.speed))
        ctx.beginPath(); ctx.arc(star.x*w, star.y*h, star.r, 0, Math.PI*2)
        ctx.fillStyle = `rgba(200,218,255,${a})`; ctx.fill()
      })

      const gx = w * 0.24, gy = h * 0.68
      const ax = w * 0.76, ay = h * 0.40

      drawGalaxy(gx, gy, time)
      drawStreams(gx, gy, ax, ay, time)
      drawAtom(ax, ay, time)

      if (!reducedMotion) animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className={styles.canvas} />
}
