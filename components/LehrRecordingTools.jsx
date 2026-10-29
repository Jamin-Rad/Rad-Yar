'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cameraErrorMessage, clampCameraPosition, clampCameraWidth, stopCameraStream } from '../utils/lehrCamera'
import styles from './LehrRecordingTools.module.css'

const DEFAULT_CAMERA_ZOOM = 0.5
const MIN_CAMERA_ZOOM = 0.25
const MAX_CAMERA_ZOOM = 2.4

function Icon({ name }) {
  let shape = <path d="M6 6l12 12M18 6 6 18" />
  if (name === 'camera') shape = <><rect x="3" y="6" width="13" height="12" rx="3" /><path d="m16 10 5-3v10l-5-3" /></>
  if (name === 'zoomOut') shape = <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5M7.5 10.5h6" /></>
  if (name === 'zoomIn') shape = <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5M7.5 10.5h6M10.5 7.5v6" /></>
  return <svg viewBox="0 0 24 24" aria-hidden="true">{shape}</svg>
}

function visibleViewport() {
  const viewport = window.visualViewport
  return { left: viewport?.offsetLeft || 0, top: viewport?.offsetTop || 0, width: viewport?.width || window.innerWidth, height: viewport?.height || window.innerHeight }
}

export default function LehrRecordingTools() {
  const [cameraOn, setCameraOn] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [paused, setPaused] = useState(false)
  const [zoom, setZoom] = useState(DEFAULT_CAMERA_ZOOM)
  const [aspectRatio, setAspectRatio] = useState(16 / 9)
  const streamRef = useRef(null)
  const requestRef = useRef(0)
  const mountedRef = useRef(false)
  const panelRef = useRef(null)
  const videoRef = useRef(null)
  const positionRef = useRef(null)
  const dragRef = useRef(null)
  const resizeRef = useRef(null)
  const widthRef = useRef(null)

  const stopCamera = useCallback((update = true) => {
    requestRef.current += 1
    const stream = streamRef.current
    streamRef.current = null
    stopCameraStream(stream)
    if (videoRef.current) videoRef.current.srcObject = null
    dragRef.current = null
    resizeRef.current = null
    if (update && mountedRef.current) {
      setCameraOn(false)
      setPending(false)
      setPaused(false)
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    const leavePage = () => stopCamera()
    window.addEventListener('pagehide', leavePage)
    return () => {
      mountedRef.current = false
      window.removeEventListener('pagehide', leavePage)
      stopCamera(false)
    }
  }, [stopCamera])

  const playVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.play()?.catch(() => {
      if (mountedRef.current && streamRef.current) setPaused(true)
    })
  }, [])

  const attachVideo = useCallback(node => {
    videoRef.current = node
    if (node) {
      node.srcObject = streamRef.current
      playVideo()
    }
  }, [playVideo])

  const updateVideoSize = event => {
    const { videoWidth, videoHeight } = event.currentTarget
    if (videoWidth && videoHeight) setAspectRatio(videoWidth / videoHeight)
  }

  const startCamera = async () => {
    if (pending || streamRef.current) return
    setError('')
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setError('Kamerazugriff benötigt HTTPS und einen unterstützten Browser. Öffne RadYar direkt in Safari.')
      return
    }
    const request = ++requestRef.current
    setPending(true)
    try {
      // Preview only: no microphone, recorder, upload or persistent video storage.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: 'user' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 16 / 9 },
        },
      })
      if (!mountedRef.current || request !== requestRef.current) {
        stopCameraStream(stream)
        return
      }
      streamRef.current = stream
      for (const track of stream.getVideoTracks()) {
        track.addEventListener('ended', () => {
          if (streamRef.current !== stream) return
          stopCamera()
          setError('Die Kamera wurde beendet. Du kannst sie erneut einschalten.')
        }, { once: true })
        track.addEventListener('mute', () => { if (streamRef.current === stream) setPaused(true) })
        track.addEventListener('unmute', () => { if (streamRef.current === stream) { setPaused(false); playVideo() } })
      }
      setPaused(false)
      setCameraOn(true)
    } catch (failure) {
      if (mountedRef.current && request === requestRef.current) setError(cameraErrorMessage(failure))
    } finally {
      if (mountedRef.current && request === requestRef.current) setPending(false)
    }
  }

  const moveTo = useCallback(next => {
    const panel = panelRef.current
    if (!panel) return
    const bounded = clampCameraPosition(next, panel.getBoundingClientRect(), visibleViewport())
    positionRef.current = bounded
    panel.style.left = `${bounded.x}px`
    panel.style.top = `${bounded.y}px`
  }, [])

  const resizeTo = useCallback((requestedWidth, corner) => {
    const panel = panelRef.current
    if (!panel) return
    widthRef.current = requestedWidth
    const width = clampCameraWidth(requestedWidth, aspectRatio, visibleViewport())
    panel.style.width = `${width}px`
    moveTo(corner ? { x: corner.right - width, y: corner.bottom - width / aspectRatio } : positionRef.current)
  }, [aspectRatio, moveTo])

  useEffect(() => {
    if (!cameraOn) return undefined
    const fit = () => {
      const panel = panelRef.current
      if (!panel) return
      const viewport = visibleViewport()
      const width = clampCameraWidth(widthRef.current ?? panel.getBoundingClientRect().width, aspectRatio, viewport)
      panel.style.width = `${width}px`
      moveTo(positionRef.current || { x: viewport.left + viewport.width, y: viewport.top + viewport.height })
    }
    fit()
    const observer = new ResizeObserver(fit)
    if (panelRef.current) observer.observe(panelRef.current)
    window.addEventListener('resize', fit)
    window.visualViewport?.addEventListener('resize', fit)
    window.visualViewport?.addEventListener('scroll', fit)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', fit)
      window.visualViewport?.removeEventListener('resize', fit)
      window.visualViewport?.removeEventListener('scroll', fit)
    }
  }, [aspectRatio, cameraOn, moveTo])

  const beginResize = event => {
    if (event.button !== 0 || !panelRef.current || dragRef.current) return
    event.preventDefault()
    event.currentTarget.focus({ preventScroll: true })
    const box = panelRef.current.getBoundingClientRect()
    resizeRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, width: box.width, right: box.right, bottom: box.bottom }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const resize = event => {
    const origin = resizeRef.current
    if (origin?.pointerId !== event.pointerId) return
    // Project movement onto the aspect-ratio diagonal, keeping the opposite corner fixed.
    const dx = event.clientX - origin.x
    const dy = event.clientY - origin.y
    const delta = -(dx + dy / aspectRatio) / (1 + 1 / aspectRatio ** 2)
    resizeTo(origin.width + delta, origin)
  }
  const endResize = event => {
    if (resizeRef.current?.pointerId !== event.pointerId) return
    resizeRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const resizeWithKeyboard = event => {
    const direction = { ArrowLeft: 1, ArrowUp: 1, ArrowRight: -1, ArrowDown: -1 }[event.key]
    if (!direction || !panelRef.current) return
    event.preventDefault()
    const box = panelRef.current.getBoundingClientRect()
    resizeTo(box.width + direction * (event.shiftKey ? 40 : 10), box)
  }

  const beginDrag = event => {
    if (event.button !== 0 || !panelRef.current || resizeRef.current) return
    event.preventDefault()
    event.currentTarget.focus({ preventScroll: true })
    const box = panelRef.current.getBoundingClientRect()
    dragRef.current = { pointerId: event.pointerId, x: event.clientX - box.left, y: event.clientY - box.top }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const drag = event => {
    const origin = dragRef.current
    if (origin?.pointerId === event.pointerId) moveTo({ x: event.clientX - origin.x, y: event.clientY - origin.y })
  }
  const endDrag = event => {
    if (dragRef.current?.pointerId !== event.pointerId) return
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const moveWithKeyboard = event => {
    const delta = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key]
    if (!delta || !panelRef.current) return
    event.preventDefault()
    const box = panelRef.current.getBoundingClientRect()
    const step = event.shiftKey ? 40 : 10
    moveTo({ x: box.left + delta[0] * step, y: box.top + delta[1] * step })
  }

  return <>
    <button type="button" className={`${styles.control} ${cameraOn ? styles.selected : ''}`} aria-label={cameraOn ? 'Frontkamera ausschalten' : pending ? 'Kamera wird gestartet' : 'Frontkamera einschalten'} title={cameraOn ? 'Frontkamera ausschalten' : 'Frontkamera einschalten'} aria-pressed={cameraOn} aria-busy={pending} onClick={() => cameraOn ? stopCamera() : startCamera()} disabled={pending}>
      <Icon name="camera" /><span>{pending ? 'Kamera …' : 'Frontkamera'}</span>
    </button>
    {(cameraOn || error) && createPortal(<div className={styles.overlays} data-lehr-ui dir="ltr">
      {error && <div className={styles.notice} role="alert"><p>{error}</p><button type="button" onClick={() => setError('')} aria-label="Kamerahinweis schließen">×</button></div>}
      {cameraOn && <section ref={panelRef} className={styles.camera} style={{ '--camera-aspect-ratio': aspectRatio }} aria-label="Frontkamera-Vorschau">
        <button type="button" className={styles.resizeHandle} aria-label="Kamerafenstergröße ändern" title="Ecke ziehen · ←/↑ größer, →/↓ kleiner" onPointerDown={beginResize} onPointerMove={resize} onPointerUp={endResize} onPointerCancel={endResize} onLostPointerCapture={() => { resizeRef.current = null }} onKeyDown={resizeWithKeyboard}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 14V5h9M5 5l13 13M18 12v6h-6" /></svg>
        </button>
        <header>
          <button type="button" className={styles.grip} aria-label="Kamerafenster verschieben" title="Ziehen oder mit Pfeiltasten verschieben" onPointerDown={beginDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { dragRef.current = null }} onKeyDown={moveWithKeyboard}>⠿</button>
          <button type="button" className={`${styles.iconButton} ${styles.closeButton}`} onClick={() => stopCamera()} aria-label="Frontkamera ausschalten" title="Kamera schließen"><Icon name="close" /></button>
        </header>
        <div className={styles.videoFrame}>
          {/* 50% fits the complete frame; lower values shrink it and higher values crop into it. */}
          <video ref={attachVideo} style={{ '--camera-zoom': zoom / DEFAULT_CAMERA_ZOOM }} autoPlay muted playsInline aria-label="Livebild der Frontkamera" onLoadedMetadata={updateVideoSize} onResize={updateVideoSize} onPlaying={() => setPaused(false)} onPause={() => { if (streamRef.current) setPaused(true) }} />
          {paused && <button type="button" className={styles.resume} onClick={playVideo}>Kamerabild fortsetzen</button>}
        </div>
        <div className={styles.zoomControl} aria-label="Kamera-Zoom">
          <Icon name="zoomOut" />
          <input
            type="range"
            min={MIN_CAMERA_ZOOM}
            max={MAX_CAMERA_ZOOM}
            step="0.05"
            value={zoom}
            onChange={event => setZoom(Number(event.target.value))}
            aria-label="Kamera-Zoom einstellen"
            aria-valuetext={`${Math.round(zoom * 100)} Prozent`}
          />
          <Icon name="zoomIn" />
          <button type="button" className={styles.zoomValue} onClick={() => setZoom(DEFAULT_CAMERA_ZOOM)} title="Zoom zurücksetzen" aria-label={`Zoom ${Math.round(zoom * 100)} Prozent; auf Standard zurücksetzen`}>
            {Math.round(zoom * 100)}%
          </button>
        </div>
      </section>}
    </div>, document.body)}
  </>
}
