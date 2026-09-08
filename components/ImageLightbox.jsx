'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './ImageLightbox.module.css'

const MIN_SCALE = 1
const MAX_SCALE = 6
const MIN_SIZE = 56

function isExcluded(img) {
  if (img.closest('[data-no-zoom]')) return true
  if (img.closest('nav, header, footer')) return true
  if (img.getAttribute('aria-hidden') === 'true') return true
  if (img.getAttribute('role') === 'presentation') return true
  if (img.closest('[class*="logo" i], [class*="icon" i], [class*="avatar" i]')) return true
  const link = img.closest('a[href]')
  if (link) {
    const href = link.getAttribute('href')
    if (href && href !== '#' && !href.startsWith('javascript:')) return true
  }
  const rect = img.getBoundingClientRect()
  if (rect.width < MIN_SIZE || rect.height < MIN_SIZE) return true
  return false
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function ImageLightbox() {
  const [image, setImage] = useState(null)
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const viewportRef = useRef(null)
  const dragRef = useRef(null)
  const pinchRef = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      const img = event.target.closest && event.target.closest('img')
      if (!img || !document.body.contains(img)) return
      if (isExcluded(img)) return

      event.preventDefault()
      event.stopPropagation()
      if (event.stopImmediatePropagation) event.stopImmediatePropagation()

      setScale(1)
      setPos({ x: 0, y: 0 })
      setImage({ src: img.currentSrc || img.src, alt: img.alt || '' })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  const close = useCallback(() => setImage(null), [])

  useEffect(() => {
    if (!image) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleKey(event) {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [image, close])

  const zoomAt = useCallback((factor, clientX, clientY) => {
    const el = viewportRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setScale(prevScale => {
      const nextScale = clamp(prevScale * factor, MIN_SCALE, MAX_SCALE)
      if (nextScale === prevScale) return prevScale
      const cx = clientX - rect.left - rect.width / 2
      const cy = clientY - rect.top - rect.height / 2
      setPos(prevPos => {
        const nx = cx - (cx - prevPos.x) * (nextScale / prevScale)
        const ny = cy - (cy - prevPos.y) * (nextScale / prevScale)
        return nextScale === MIN_SCALE ? { x: 0, y: 0 } : { x: nx, y: ny }
      })
      return nextScale
    })
  }, [])

  const handleWheel = event => {
    event.preventDefault()
    const factor = event.deltaY < 0 ? 1.2 : 1 / 1.2
    zoomAt(factor, event.clientX, event.clientY)
  }

  const handleDoubleClick = event => {
    if (scale > 1) {
      setScale(1)
      setPos({ x: 0, y: 0 })
    } else {
      zoomAt(2.5, event.clientX, event.clientY)
    }
  }

  const handlePointerDown = event => {
    if (event.pointerType === 'touch') return
    if (scale <= 1) return
    dragRef.current = { startX: event.clientX, startY: event.clientY, origin: pos }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const handlePointerMove = event => {
    if (!dragRef.current) return
    const { startX, startY, origin } = dragRef.current
    setPos({ x: origin.x + (event.clientX - startX), y: origin.y + (event.clientY - startY) })
  }
  const handlePointerUp = () => { dragRef.current = null }

  const distance = (t1, t2) => Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)

  const handleTouchStart = event => {
    if (event.touches.length === 2) {
      pinchRef.current = { dist: distance(event.touches[0], event.touches[1]), scale }
    } else if (event.touches.length === 1 && scale > 1) {
      const t = event.touches[0]
      dragRef.current = { startX: t.clientX, startY: t.clientY, origin: pos }
    }
  }
  const handleTouchMove = event => {
    if (event.touches.length === 2 && pinchRef.current) {
      event.preventDefault()
      const newDist = distance(event.touches[0], event.touches[1])
      const factor = newDist / pinchRef.current.dist
      const nextScale = clamp(pinchRef.current.scale * factor, MIN_SCALE, MAX_SCALE)
      setScale(nextScale)
      if (nextScale === MIN_SCALE) setPos({ x: 0, y: 0 })
    } else if (event.touches.length === 1 && dragRef.current) {
      const t = event.touches[0]
      const { startX, startY, origin } = dragRef.current
      setPos({ x: origin.x + (t.clientX - startX), y: origin.y + (t.clientY - startY) })
    }
  }
  const handleTouchEnd = event => {
    if (event.touches.length < 2) pinchRef.current = null
    if (event.touches.length < 1) dragRef.current = null
  }

  if (!image) return null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={image.alt || 'Bild'} onClick={close}>
      <button type="button" className={styles.close} onClick={close} aria-label="Schließen">×</button>

      <div className={styles.controls} onClick={event => event.stopPropagation()}>
        <button type="button" onClick={() => zoomAt(1 / 1.4, window.innerWidth / 2, window.innerHeight / 2)} aria-label="Verkleinern">−</button>
        <button type="button" onClick={() => { setScale(1); setPos({ x: 0, y: 0 }) }} aria-label="Zurücksetzen">{Math.round(scale * 100)}%</button>
        <button type="button" onClick={() => zoomAt(1.4, window.innerWidth / 2, window.innerHeight / 2)} aria-label="Vergrößern">+</button>
      </div>

      <div
        ref={viewportRef}
        className={styles.viewport}
        onClick={event => event.stopPropagation()}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          draggable={false}
          className={styles.image}
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transition: dragRef.current ? 'none' : 'transform 0.08s ease-out',
          }}
        />
      </div>
    </div>
  )
}
