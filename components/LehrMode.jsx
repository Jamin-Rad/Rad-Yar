'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import { exitPageFullscreen, pageFullscreenElement, requestPageFullscreen } from '@/utils/lehrFullscreen'
import LehrRecordingTools from './LehrRecordingTools'
import styles from './LehrMode.module.css'

const ADMIN_EMAIL = 'drbenjaminzia@gmail.com'
const TOGGLE_EVENT = 'radyar:lehr-mode-toggle'
const STATE_EVENT = 'radyar:lehr-mode-state'
const CLEAR_EVENT = 'radyar:lehr-mode-clear'
const TOOLS = {
  pen: { label: 'Stift', color: '#ff5c35', width: 4, alpha: 1 },
  highlighter: { label: 'Textmarker', color: '#ffe45c', width: 22, alpha: 0.34 },
  eraser: { label: 'Radierer', color: '#ffffff', width: 42, alpha: 1 },
}
const COLOR_PALETTES = {
  pen: [
    { label: 'Orange', value: '#ff5c35' },
    { label: 'Rot', value: '#ef4444' },
    { label: 'Blau', value: '#2563eb' },
    { label: 'Grün', value: '#16a34a' },
    { label: 'Violett', value: '#7c3aed' },
    { label: 'Schwarz', value: '#111827' },
    { label: 'Weiß', value: '#ffffff' },
  ],
  highlighter: [
    { label: 'Gelb', value: '#ffe45c' },
    { label: 'Orange', value: '#fb923c' },
    { label: 'Rosa', value: '#f9a8d4' },
    { label: 'Grün', value: '#86efac' },
    { label: 'Türkis', value: '#67e8f9' },
    { label: 'Violett', value: '#c4b5fd' },
  ],
}
const INITIAL_TOOL_COLORS = { pen: TOOLS.pen.color, highlighter: TOOLS.highlighter.color }

function ToolIcon({ name }) {
  if (name === 'pen') return <path d="M5 19l3.9-1 9.8-9.8a2.1 2.1 0 0 0-3-3L5.9 15 5 19zm9-12 3 3" />
  if (name === 'highlighter') return <><path d="M7 15l-2 4 4-2L19 7l-3-3L7 15z" /><path d="M5 20h14" /></>
  return <><path d="M8 18l-4-4L14 4l6 6-8 8H8z" /><path d="M11 18h9" /></>
}

function ToolbarButton({ name, active, color, onClick }) {
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
      {color ? <i className={styles.toolColor} style={{ '--tool-color': color }} aria-hidden="true" /> : null}
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

function annotationViewport(target) {
  const targetRoot = target instanceof Element ? target.closest('[data-lehr-scroll-root]') : null
  const root = targetRoot || document.querySelector('[data-lehr-scroll-root]')
  if (root instanceof HTMLElement) {
    const rect = root.getBoundingClientRect()
    return {
      root,
      left: rect.left,
      top: rect.top,
      scrollLeft: root.scrollLeft,
      scrollTop: root.scrollTop,
    }
  }
  return { root: null, left: 0, top: 0, scrollLeft: window.scrollX, scrollTop: window.scrollY }
}

function setViewportScrollTop(root, value) {
  if (root instanceof HTMLElement) root.scrollTop = value
  else window.scrollTo({ top: value, behavior: 'auto' })
}

export default function LehrMode() {
  const pathname = usePathname()
  const { isLoaded, user } = useUser()
  const isAdmin = isLoaded && canonicalUserEmail(user) === ADMIN_EMAIL
  const isExcluded = pathname === '/andarun' || pathname?.startsWith('/andarun/')
  const [active, setActive] = useState(false)
  const [tool, setTool] = useState('pen')
  const [toolColors, setToolColors] = useState(INITIAL_TOOL_COLORS)
  const [colorMenuOpen, setColorMenuOpen] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const canvasRef = useRef(null)
  const arrowRef = useRef(null)
  const strokesRef = useRef([])
  const historyRef = useRef([])
  const activePointerRef = useRef(null)
  const eraseSessionRef = useRef(null)
  const frameRef = useRef(null)
  const toolRef = useRef(tool)
  const activeRef = useRef(false)
  const fullscreenRequestRef = useRef(0)
  const fullscreenPendingRef = useRef(false)
  const toolColorsRef = useRef(INITIAL_TOOL_COLORS)

  const selectToolColor = useCallback((toolName, color) => {
    toolColorsRef.current = { ...toolColorsRef.current, [toolName]: color }
    setToolColors(toolColorsRef.current)
  }, [])

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

    const viewport = annotationViewport()
    for (const stroke of strokesRef.current) {
      const points = stroke.points
      if (!points.length) continue
      context.save()
      context.strokeStyle = stroke.color
      context.globalAlpha = stroke.alpha
      context.lineWidth = stroke.width
      context.beginPath()
      const startX = points[0].x - viewport.scrollLeft + viewport.left
      const startY = points[0].y - viewport.scrollTop + viewport.top
      context.moveTo(startX, startY)
      if (points.length === 1) {
        context.lineTo(startX + 0.01, startY + 0.01)
      } else {
        for (let index = 1; index < points.length - 1; index += 1) {
          const point = points[index]
          const next = points[index + 1]
          context.quadraticCurveTo(
            point.x - viewport.scrollLeft + viewport.left,
            point.y - viewport.scrollTop + viewport.top,
            ((point.x + next.x) / 2) - viewport.scrollLeft + viewport.left,
            ((point.y + next.y) / 2) - viewport.scrollTop + viewport.top,
          )
        }
        const last = points[points.length - 1]
        context.lineTo(last.x - viewport.scrollLeft + viewport.left, last.y - viewport.scrollTop + viewport.top)
      }
      context.stroke()
      context.restore()
    }
  }, [])

  const scheduleRender = useCallback(() => {
    if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(renderCanvas)
  }, [renderCanvas])

  const clearAnnotations = useCallback(() => {
    strokesRef.current = []
    historyRef.current = []
    activePointerRef.current = null
    eraseSessionRef.current = null
    setCanUndo(false)
    scheduleRender()
  }, [scheduleRender])

  const ensureFullscreen = useCallback(() => {
    if (!activeRef.current || pageFullscreenElement() || fullscreenPendingRef.current) return Promise.resolve(false)

    fullscreenPendingRef.current = true
    const request = ++fullscreenRequestRef.current
    return requestPageFullscreen()
      .then(entered => {
        if (entered && (request !== fullscreenRequestRef.current || !activeRef.current)) {
          exitPageFullscreen().catch(() => {})
          return false
        }
        return entered
      })
      .catch(() => false)
      .finally(() => {
        if (request === fullscreenRequestRef.current) fullscreenPendingRef.current = false
      })
  }, [])

  const deactivate = useCallback(() => {
    const wasActive = activeRef.current
    activeRef.current = false
    fullscreenRequestRef.current += 1
    fullscreenPendingRef.current = false
    setActive(false)
    if (wasActive) exitPageFullscreen().catch(() => {})
    clearAnnotations()
  }, [clearAnnotations])

  const activate = useCallback(() => {
    activeRef.current = true
    setActive(true)
    ensureFullscreen()
  }, [ensureFullscreen])

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
      if (!isAdmin || isExcluded) return
      if (activeRef.current) deactivate()
      else activate()
    }
    window.addEventListener(TOGGLE_EVENT, toggleMode)
    return () => window.removeEventListener(TOGGLE_EVENT, toggleMode)
  }, [activate, deactivate, isAdmin, isExcluded])

  useEffect(() => {
    window.addEventListener(CLEAR_EVENT, clearAnnotations)
    return () => window.removeEventListener(CLEAR_EVENT, clearAnnotations)
  }, [clearAnnotations])

  useEffect(() => {
    document.documentElement.classList.toggle('lehr-mode-active', active)
    if (active) {
      document.documentElement.dataset.lehrTool = toolRef.current
      document.documentElement.dataset.lehrRecordingReady = 'true'
      scheduleRender()
    } else {
      delete document.documentElement.dataset.lehrTool
      delete document.documentElement.dataset.lehrRecordingReady
    }
    window.dispatchEvent(new CustomEvent(STATE_EVENT, { detail: { active } }))
    return () => {
      document.documentElement.classList.remove('lehr-mode-active')
      delete document.documentElement.dataset.lehrTool
      delete document.documentElement.dataset.lehrRecordingReady
    }
  }, [active, scheduleRender])

  useEffect(() => {
    if (!active) return undefined

    let suppressClick = false
    let clickResetTimer = null
    let touchScroll = null

    const pointFromEvent = event => {
      const viewport = annotationViewport(event.target)
      return {
        x: event.clientX - viewport.left + viewport.scrollLeft,
        y: event.clientY - viewport.top + viewport.scrollTop,
        pressure: event.pressure || 0.5,
      }
    }
    const isToolbarEvent = event => event.target instanceof Element && event.target.closest('[data-lehr-ui]')
    const canDrawWith = event => event.pointerType === 'pen'

    function onPointerDown(event) {
      // iPadOS may leave native fullscreen while showing camera permission UI.
      // Re-enter during this trusted gesture before handling Pencil, touch or toolbar input.
      ensureFullscreen()
      if (isToolbarEvent(event)) return
      if (event.pointerType === 'touch') {
        const viewport = annotationViewport(event.target)
        touchScroll = {
          pointerId: event.pointerId,
          target: event.target,
          root: viewport.root,
          startY: event.clientY,
          startScrollTop: viewport.scrollTop,
          moved: false,
        }
        event.target?.setPointerCapture?.(event.pointerId)
        return
      }
      if (!canDrawWith(event)) return

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
        color: toolColorsRef.current[toolRef.current] || selected.color,
        width: selected.width,
        alpha: selected.alpha,
        points: [point],
      }]
      setCanUndo(true)
      scheduleRender()
    }

    function onPointerMove(event) {
      if (touchScroll?.pointerId === event.pointerId) {
        const deltaY = touchScroll.startY - event.clientY
        if (!touchScroll.moved && Math.abs(deltaY) > 4) touchScroll.moved = true
        if (touchScroll.moved) {
          event.preventDefault()
          event.stopPropagation()
          setViewportScrollTop(touchScroll.root, touchScroll.startScrollTop + deltaY)
          scheduleRender()
        }
        return
      }

      const arrow = arrowRef.current
      if (event.pointerType === 'mouse' && !isToolbarEvent(event)) {
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
      if (touchScroll?.pointerId === event.pointerId) {
        if (touchScroll.moved) {
          event.preventDefault()
          event.stopPropagation()
          suppressClick = true
          clickResetTimer = window.setTimeout(() => {
            suppressClick = false
          }, 0)
        }
        touchScroll.target?.releasePointerCapture?.(event.pointerId)
        touchScroll = null
        return
      }
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
      if (event.key === 'Escape') {
        deactivate()
        return
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        undo()
      }
      if (event.ctrlKey || event.metaKey || event.altKey || event.target?.matches?.('input, textarea, [contenteditable="true"]')) return
      const shortcut = { p: 'pen', h: 'highlighter', e: 'eraser' }[event.key.toLowerCase()]
      if (shortcut) setTool(shortcut)
    }

    function hideArrow() {
      arrowRef.current?.classList.remove(styles.arrowVisible)
    }

    function keepFullscreenLocked() {
      if (!pageFullscreenElement()) ensureFullscreen()
    }

    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: false })
    document.addEventListener('pointermove', onPointerMove, { capture: true, passive: false })
    document.addEventListener('pointerup', finishPointer, { capture: true, passive: false })
    document.addEventListener('pointercancel', finishPointer, { capture: true, passive: false })
    document.addEventListener('click', onClick, { capture: true })
    document.addEventListener('pointerleave', hideArrow)
    document.addEventListener('fullscreenchange', keepFullscreenLocked)
    document.addEventListener('webkitfullscreenchange', keepFullscreenLocked)
    window.addEventListener('keydown', onKeyDown, { capture: true })
    window.addEventListener('resize', scheduleRender)
    document.addEventListener('scroll', scheduleRender, { capture: true, passive: true })

    return () => {
      document.removeEventListener('pointerdown', onPointerDown, { capture: true })
      document.removeEventListener('pointermove', onPointerMove, { capture: true })
      document.removeEventListener('pointerup', finishPointer, { capture: true })
      document.removeEventListener('pointercancel', finishPointer, { capture: true })
      document.removeEventListener('click', onClick, { capture: true })
      document.removeEventListener('pointerleave', hideArrow)
      document.removeEventListener('fullscreenchange', keepFullscreenLocked)
      document.removeEventListener('webkitfullscreenchange', keepFullscreenLocked)
      window.removeEventListener('keydown', onKeyDown, { capture: true })
      window.removeEventListener('resize', scheduleRender)
      document.removeEventListener('scroll', scheduleRender, { capture: true })
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
      if (clickResetTimer !== null) window.clearTimeout(clickResetTimer)
      frameRef.current = null
    }
  }, [active, deactivate, ensureFullscreen, scheduleRender, undo])

  if (!isAdmin || isExcluded || !active) return null

  return (
    <div className={styles.layer} aria-label="Lehr-Mode">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div ref={arrowRef} className={styles.arrowPointer} aria-hidden="true">
        <svg viewBox="0 0 88 88">
          <path className={styles.pointerBody} d="M9 6 77 47l-30 6-15 29L9 6Z" />
          <path className={styles.pointerAccent} d="m18 18 40 27" />
        </svg>
      </div>
      <div className={styles.toolbar} data-lehr-ui role="toolbar" aria-label="Lehr-Mode Werkzeuge">
        <div className={styles.recordingTools} aria-label="Lehr-Mode Einstellungen">
          <LehrRecordingTools key={pathname} ensureFullscreen={ensureFullscreen} />
        </div>
        <div className={styles.modeLabel}><span />Lehr-Mode</div>
        <div className={styles.tools}>
          {Object.keys(TOOLS).map(name => (
            <ToolbarButton
              key={name}
              name={name}
              active={tool === name}
              color={toolColors[name]}
              onClick={() => {
                setTool(name)
                if (name === 'eraser') setColorMenuOpen(false)
              }}
            />
          ))}
        </div>
        {COLOR_PALETTES[tool] ? <div className={styles.colorControl}>
          <button
            type="button"
            className={`${styles.colorTrigger} ${colorMenuOpen ? styles.colorTriggerOpen : ''}`}
            onClick={() => setColorMenuOpen(value => !value)}
            aria-label={`${TOOLS[tool].label}-Farbe wählen`}
            aria-expanded={colorMenuOpen}
            title="Farbe wählen"
          >
            <span style={{ '--tool-color': toolColors[tool] }} />
          </button>
          {colorMenuOpen ? <div className={styles.colorPalette} role="group" aria-label={`${TOOLS[tool].label}-Farben`}>
            {COLOR_PALETTES[tool].map(color => <button
              type="button"
              key={color.value}
              className={toolColors[tool] === color.value ? styles.colorSelected : ''}
              style={{ '--palette-color': color.value }}
              onClick={() => {
                selectToolColor(tool, color.value)
                setColorMenuOpen(false)
              }}
              aria-label={color.label}
              aria-pressed={toolColors[tool] === color.value}
              title={color.label}
            />)}
          </div> : null}
        </div> : null}
        <button type="button" className={styles.actionButton} onClick={undo} disabled={!canUndo} aria-label="Rückgängig" title="Rückgängig (⌘/Ctrl+Z)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7l-5 5 5 5" /><path d="M5 12h8a6 6 0 0 1 6 6" /></svg>
        </button>
        <button type="button" className={`${styles.actionButton} ${styles.closeButton}`} onClick={deactivate} aria-label="Lehr-Mode beenden" title="Lehr-Mode beenden">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>
  )
}
