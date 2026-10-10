'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import styles from './LehrMode.module.css'

const ADMIN_EMAIL = 'drbenjaminzia@gmail.com'
const TOGGLE_EVENT = 'radyar:lehr-mode-toggle'
const STATE_EVENT = 'radyar:lehr-mode-state'
const TOOLS = {
  pen: { label: 'Stift', color: '#ff5c35', width: 4, alpha: 1 },
  highlighter: { label: 'Textmarker', color: '#ffe45c', width: 22, alpha: 0.34 },
  arrow: { label: 'Zeiger', color: '#ff6b00', width: 0, alpha: 1 },
  eraser: { label: 'Radierer', color: '#ffffff', width: 42, alpha: 1 },
}

function ToolIcon({ name }) {
  if (name === 'pen') return <path d="M5 19l3.9-1 9.8-9.8a2.1 2.1 0 0 0-3-3L5.9 15 5 19zm9-12 3 3" />
  if (name === 'highlighter') return <><path d="M7 15l-2 4 4-2L19 7l-3-3L7 15z" /><path d="M5 20h14" /></>
  if (name === 'arrow') return <path d="M5 3l14 9-7 1-3 7L5 3z" />
  return <><path d="M8 18l-4-4L14 4l6 6-8 8H8z" /><path d="M11 18h9" /></>
}

function ToolbarButton({ name, active, onClick }) {
  const tool = TOOLS[name]
  return (
    <button
      type="button"
      className={`${styles.toolButton} ${active ? styles.activeTool : ''}`}
      onClick={onClick}
      aria-label={tool.label}
      aria-pressed={active}
      title={tool.label}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><ToolIcon name={name} /></svg>
      <span>{tool.label}</span>
    </button>
  )
}

function strokeTouchesPoint(stroke, point, radius) {
  const limit = radius * radius
  return stroke.points.some(candidate => {
    const dx = candidate.x - point.x
    const dy = candidate.y - point.y
    return (dx * dx) + (dy * dy) <= limit
  })
}

export default function LehrMode() {
  const pathname = usePathname()
  const { isLoaded, user } = useUser()
  const isAdmin = isLoaded && canonicalUserEmail(user) === ADMIN_EMAIL
  const isExcluded = pathname === '/andarun' || pathname?.startsWith('/andarun/')
  const [active, setActive] = useState(false)
  const [tool, setTool] = useState('pen')
  const [canUndo, setCanUndo] = useState(false)
  const canvasRef = useRef(null)
  const arrowRef = useRef(null)
  const strokesRef = useRef([])
  const historyRef = useRef([])
  const activePointerRef = useRef(null)
  const eraseSessionRef = useRef(null)
  const frameRef = useRef(null)
  const toolRef = useRef(tool)

  const renderCanvas = useCallback(() => {
    frameRef.current = null
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = window.innerWidth
    const height = window.innerHeight
    const pixelWidth = Math.round(width * dpr)
    const pixelHeight = Math.round(height * dpr)
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }

    const context = canvas.getContext('2d')
    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.clearRect(0, 0, width, height)
    context.lineCap = 'round'
    context.lineJoin = 'round'

    for (const stroke of strokesRef.current) {
      const points = stroke.points
      if (!points.length) continue
      context.save()
      context.strokeStyle = stroke.color
      context.globalAlpha = stroke.alpha
      context.lineWidth = stroke.width
      context.beginPath()
      const startX = points[0].x - window.scrollX
      const startY = points[0].y - window.scrollY
      context.moveTo(startX, startY)
      if (points.length === 1) {
        context.lineTo(startX + 0.01, startY + 0.01)
      } else {
        for (let index = 1; index < points.length - 1; index += 1) {
          const point = points[index]
          const next = points[index + 1]
          context.quadraticCurveTo(
            point.x - window.scrollX,
            point.y - window.scrollY,
            ((point.x + next.x) / 2) - window.scrollX,
            ((point.y + next.y) / 2) - window.scrollY,
          )
        }
        const last = points[points.length - 1]
        context.lineTo(last.x - window.scrollX, last.y - window.scrollY)
      }
      context.stroke()
      context.restore()
    }
  }, [])

  const scheduleRender = useCallback(() => {
    if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(renderCanvas)
  }, [renderCanvas])

  const deactivate = useCallback(() => {
    setActive(false)
    strokesRef.current = []
    historyRef.current = []
    activePointerRef.current = null
    eraseSessionRef.current = null
    setCanUndo(false)
  }, [])

  const undo = useCallback(() => {
    const previous = historyRef.current.pop()
    if (!previous) return
    strokesRef.current = previous
    setCanUndo(historyRef.current.length > 0)
    scheduleRender()
  }, [scheduleRender])

  useEffect(() => {
    toolRef.current = tool
    if (active) document.documentElement.dataset.lehrTool = tool
  }, [active, tool])

  useEffect(() => {
    if (!isAdmin || isExcluded) deactivate()
  }, [deactivate, isAdmin, isExcluded])

  useEffect(() => {
    function toggleMode() {
      if (isAdmin && !isExcluded) setActive(value => !value)
    }
    window.addEventListener(TOGGLE_EVENT, toggleMode)
    return () => window.removeEventListener(TOGGLE_EVENT, toggleMode)
  }, [isAdmin, isExcluded])

  useEffect(() => {
    document.documentElement.classList.toggle('lehr-mode-active', active)
    if (active) {
      document.documentElement.dataset.lehrTool = toolRef.current
      scheduleRender()
    } else {
      delete document.documentElement.dataset.lehrTool
    }
    window.dispatchEvent(new CustomEvent(STATE_EVENT, { detail: { active } }))
    return () => {
      document.documentElement.classList.remove('lehr-mode-active')
      delete document.documentElement.dataset.lehrTool
    }
  }, [active, scheduleRender])

  useEffect(() => {
    if (!active) return undefined

    let suppressClick = false
    let clickResetTimer = null

    const pointFromEvent = event => ({
      x: event.clientX + window.scrollX,
      y: event.clientY + window.scrollY,
      pressure: event.pressure || 0.5,
    })
    const isToolbarEvent = event => event.target instanceof Element && event.target.closest('[data-lehr-ui]')
    const canDrawWith = event => event.pointerType === 'pen' || (event.pointerType === 'mouse' && event.button === 0)

    function onPointerDown(event) {
      if (isToolbarEvent(event) || !canDrawWith(event) || toolRef.current === 'arrow') return
      event.preventDefault()
      event.stopPropagation()
      suppressClick = true
      event.target?.setPointerCapture?.(event.pointerId)
      activePointerRef.current = event.pointerId
      const point = pointFromEvent(event)

      if (toolRef.current === 'eraser') {
        eraseSessionRef.current = { snapshot: strokesRef.current.slice(), changed: false }
        return
      }

      const selected = TOOLS[toolRef.current]
      historyRef.current.push(strokesRef.current.slice())
      strokesRef.current = [...strokesRef.current, {
        tool: toolRef.current,
        color: selected.color,
        width: selected.width,
        alpha: selected.alpha,
        points: [point],
      }]
      setCanUndo(true)
      scheduleRender()
    }

    function onPointerMove(event) {
      const arrow = arrowRef.current
      if (toolRef.current === 'arrow' && event.pointerType !== 'touch' && !isToolbarEvent(event)) {
        arrow?.style.setProperty('transform', `translate3d(${event.clientX}px, ${event.clientY}px, 0)`)
        arrow?.classList.add(styles.arrowVisible)
      } else {
        arrow?.classList.remove(styles.arrowVisible)
      }

      if (activePointerRef.current !== event.pointerId) return
      event.preventDefault()
      event.stopPropagation()
      const coalescedEvents = event.getCoalescedEvents?.()
      const events = coalescedEvents?.length ? coalescedEvents : [event]

      if (toolRef.current === 'eraser') {
        const session = eraseSessionRef.current
        for (const moveEvent of events) {
          const point = pointFromEvent(moveEvent)
          const remaining = strokesRef.current.filter(stroke => !strokeTouchesPoint(stroke, point, TOOLS.eraser.width / 2))
          if (remaining.length !== strokesRef.current.length) {
            if (!session.changed) {
              historyRef.current.push(session.snapshot)
              session.changed = true
              setCanUndo(true)
            }
            strokesRef.current = remaining
          }
        }
      } else {
        const strokes = strokesRef.current
        const current = strokes[strokes.length - 1]
        if (current) current.points.push(...events.map(pointFromEvent))
      }
      scheduleRender()
    }

    function finishPointer(event) {
      if (activePointerRef.current !== event.pointerId) return
      event.preventDefault()
      event.stopPropagation()
      activePointerRef.current = null
      eraseSessionRef.current = null
      event.target?.releasePointerCapture?.(event.pointerId)
      clickResetTimer = window.setTimeout(() => {
        suppressClick = false
      }, 0)
    }

    function onClick(event) {
      if (!suppressClick || isToolbarEvent(event)) return
      event.preventDefault()
      event.stopPropagation()
      suppressClick = false
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') deactivate()
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        undo()
      }
      if (event.ctrlKey || event.metaKey || event.altKey || event.target?.matches?.('input, textarea, [contenteditable="true"]')) return
      const shortcut = { p: 'pen', h: 'highlighter', a: 'arrow', e: 'eraser' }[event.key.toLowerCase()]
      if (shortcut) setTool(shortcut)
    }

    function hideArrow() {
      arrowRef.current?.classList.remove(styles.arrowVisible)
    }

    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: false })
    document.addEventListener('pointermove', onPointerMove, { capture: true, passive: false })
    document.addEventListener('pointerup', finishPointer, { capture: true, passive: false })
    document.addEventListener('pointercancel', finishPointer, { capture: true, passive: false })
    document.addEventListener('click', onClick, { capture: true })
    document.addEventListener('pointerleave', hideArrow)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', scheduleRender)
    window.addEventListener('scroll', scheduleRender, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', onPointerDown, { capture: true })
      document.removeEventListener('pointermove', onPointerMove, { capture: true })
      document.removeEventListener('pointerup', finishPointer, { capture: true })
      document.removeEventListener('pointercancel', finishPointer, { capture: true })
      document.removeEventListener('click', onClick, { capture: true })
      document.removeEventListener('pointerleave', hideArrow)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', scheduleRender)
      window.removeEventListener('scroll', scheduleRender)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
      if (clickResetTimer !== null) window.clearTimeout(clickResetTimer)
      frameRef.current = null
    }
  }, [active, deactivate, scheduleRender, undo])

  if (!isAdmin || isExcluded || !active) return null

  return (
    <div className={styles.layer} aria-label="Lehr-Mode">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div ref={arrowRef} className={styles.arrowPointer} aria-hidden="true">
        <svg viewBox="0 0 68 68"><path d="M7 5l52 33-24 4-10 22L7 5z" /></svg>
      </div>
      <div className={styles.toolbar} data-lehr-ui role="toolbar" aria-label="Lehr-Mode Werkzeuge">
        <div className={styles.modeLabel}><span />Lehr-Mode</div>
        <div className={styles.tools}>
          {Object.keys(TOOLS).map(name => (
            <ToolbarButton key={name} name={name} active={tool === name} onClick={() => setTool(name)} />
          ))}
        </div>
        <button type="button" className={styles.actionButton} onClick={undo} disabled={!canUndo} aria-label="Rückgängig" title="Rückgängig (⌘/Ctrl+Z)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7l-5 5 5 5" /><path d="M5 12h8a6 6 0 0 1 6 6" /></svg>
        </button>
        <button type="button" className={`${styles.actionButton} ${styles.closeButton}`} onClick={deactivate} aria-label="Lehr-Mode beenden" title="Lehr-Mode beenden">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div className={styles.hint} data-lehr-ui>
        Apple Pencil oder Maus zum Zeichnen · Finger zum Scrollen
      </div>
    </div>
  )
}
