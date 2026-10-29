'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import LehrRecordingTools from './LehrRecordingTools'
import { createLehrInk } from '../utils/lehrInk'
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

function ColorPalettes({ toolColors, onSelect }) {
  return (
    <div className={styles.colorPalettes} aria-label="Stift- und Textmarkerfarben">
      {Object.entries(COLOR_PALETTES).map(([toolName, colors]) => (
        <div className={styles.colorRow} role="group" aria-label={`${TOOLS[toolName].label}-Farben`} key={toolName}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><ToolIcon name={toolName} /></svg>
          {colors.map(color => <button
            type="button"
            key={color.value}
            className={toolColors[toolName] === color.value ? styles.colorSelected : ''}
            style={{ '--palette-color': color.value }}
            onClick={() => onSelect(toolName, color.value)}
            aria-label={`${TOOLS[toolName].label}: ${color.label}`}
            aria-pressed={toolColors[toolName] === color.value}
            title={`${TOOLS[toolName].label}: ${color.label}`}
          />)}
        </div>
      ))}
    </div>
  )
}

export default function LehrMode() {
  const pathname = usePathname()
  const { isLoaded, user } = useUser()
  const isAdmin = isLoaded && canonicalUserEmail(user) === ADMIN_EMAIL
  const isExcluded = pathname === '/andarun' || pathname?.startsWith('/andarun/')
  const [active, setActive] = useState(false)
  const [tool, setTool] = useState('pen')
  const [toolColors, setToolColors] = useState(INITIAL_TOOL_COLORS)
  const [canUndo, setCanUndo] = useState(false)
  const inkRef = useRef(null)
  const arrowRef = useRef(null)
  const toolRef = useRef(tool)
  const activeRef = useRef(false)
  const toolColorsRef = useRef(INITIAL_TOOL_COLORS)

  const selectToolColor = useCallback((toolName, color) => {
    toolColorsRef.current = { ...toolColorsRef.current, [toolName]: color }
    setToolColors(toolColorsRef.current)
  }, [])

  const selectToolAndColor = useCallback((toolName, color) => {
    setTool(toolName)
    selectToolColor(toolName, color)
  }, [selectToolColor])

  const clearAnnotations = useCallback(() => {
    inkRef.current?.clear()
    setCanUndo(false)
  }, [])

  const deactivate = useCallback(() => {
    activeRef.current = false
    setActive(false)
    clearAnnotations()
  }, [clearAnnotations])

  const activate = useCallback(() => {
    activeRef.current = true
    setActive(true)
  }, [])

  const undo = useCallback(() => {
    inkRef.current?.undo()
  }, [])

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
  }, [active])

  useEffect(() => {
    if (!active) return undefined

    const ink = createLehrInk({ className: styles.inkSurface, onHistoryChange: setCanUndo })
    inkRef.current = ink
    let penClickUntil = 0
    let penTarget = null
    const isToolbarEvent = event => event.target instanceof Element && event.target.closest('[data-lehr-ui]')

    function onPointerDown(event) {
      if (isToolbarEvent(event) || event.pointerType !== 'pen' || ink.pointerId !== null) return
      event.preventDefault()
      event.stopPropagation()
      penClickUntil = performance.now() + 500
      penTarget = event.target
      const selected = TOOLS[toolRef.current]
      ink.start(event, { tool: toolRef.current, ...selected, color: toolColorsRef.current[toolRef.current] || selected.color })
    }

    function onPointerMove(event) {
      if (ink.pointerId === event.pointerId) {
        event.preventDefault()
        event.stopPropagation()
        ink.move(event)
        return
      }
      const arrow = arrowRef.current
      if (event.pointerType === 'mouse' && !isToolbarEvent(event)) {
        arrow?.style.setProperty('transform', `translate3d(${event.clientX}px, ${event.clientY}px, 0)`)
        arrow?.classList.add(styles.arrowVisible)
      } else arrow?.classList.remove(styles.arrowVisible)
    }

    function finishPointer(event) {
      if (ink.pointerId !== event.pointerId) return
      if (event.cancelable) event.preventDefault()
      event.stopPropagation()
      ink.finish(event)
      penClickUntil = performance.now() + 500
    }

    function onTouchStart(event) {
      if (isToolbarEvent(event)) return
      // Safari exposes Pencil contact as a stylus Touch. Cancel that contact
      // and palm touches during writing, while fingers retain native scrolling.
      if (ink.pointerId !== null || Array.from(event.changedTouches).some(touch => touch.touchType === 'stylus')) {
        if (event.cancelable) event.preventDefault()
      }
    }

    function onClick(event) {
      if (isToolbarEvent(event)) return
      const penClick = event.pointerType === 'pen'
        || (!event.pointerType && event.detail !== 0 && performance.now() < penClickUntil && penTarget?.contains(event.target))
      if (!penClick) return
      event.preventDefault()
      event.stopPropagation()
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

    document.addEventListener('pointerdown', onPointerDown, { capture: true, passive: false })
    document.addEventListener('pointermove', onPointerMove, { capture: true, passive: false })
    document.addEventListener('pointerup', finishPointer, { capture: true, passive: false })
    document.addEventListener('pointercancel', finishPointer, { capture: true, passive: false })
    document.addEventListener('click', onClick, { capture: true })
    document.addEventListener('touchstart', onTouchStart, { capture: true, passive: false })
    document.addEventListener('lostpointercapture', finishPointer, { capture: true })
    document.addEventListener('pointerleave', hideArrow)
    window.addEventListener('keydown', onKeyDown, { capture: true })
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, { capture: true })
      document.removeEventListener('pointermove', onPointerMove, { capture: true })
      document.removeEventListener('pointerup', finishPointer, { capture: true })
      document.removeEventListener('pointercancel', finishPointer, { capture: true })
      document.removeEventListener('click', onClick, { capture: true })
      document.removeEventListener('touchstart', onTouchStart, { capture: true })
      document.removeEventListener('lostpointercapture', finishPointer, { capture: true })
      document.removeEventListener('pointerleave', hideArrow)
      window.removeEventListener('keydown', onKeyDown, { capture: true })
      ink.dispose()
      if (inkRef.current === ink) inkRef.current = null
    }
  }, [active, deactivate, undo])

  if (!isAdmin || isExcluded || !active) return null

  return (
    <div className={styles.layer} aria-label="Lehr-Mode">
      <div ref={arrowRef} className={styles.arrowPointer} aria-hidden="true">
        <svg viewBox="0 0 88 88">
          <path className={styles.pointerBody} d="M9 6 77 47l-30 6-15 29L9 6Z" />
          <path className={styles.pointerAccent} d="m18 18 40 27" />
        </svg>
      </div>
      <div className={styles.toolbar} data-lehr-ui role="toolbar" aria-label="Lehr-Mode Werkzeuge">
        <div className={styles.recordingTools} aria-label="Lehr-Mode Einstellungen">
          <LehrRecordingTools key={pathname} />
        </div>
        <div className={styles.modeLabel}><span />Lehr-Mode</div>
        <div className={styles.tools}>
          {Object.keys(TOOLS).map(name => (
            <ToolbarButton
              key={name}
              name={name}
              active={tool === name}
              color={toolColors[name]}
              onClick={() => setTool(name)}
            />
          ))}
        </div>
        <ColorPalettes toolColors={toolColors} onSelect={selectToolAndColor} />
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
