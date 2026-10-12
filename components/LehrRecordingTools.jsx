'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cameraErrorMessage, clampCameraPosition, stopCameraStream } from '../utils/lehrCamera'
import styles from './LehrRecordingTools.module.css'

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{name === 'camera'
    ? <><rect x="3" y="6" width="13" height="12" rx="3" /><path d="m16 10 5-3v10l-5-3" /></>
    : name === 'ready' ? <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="m8 10 3 3 5-5M8 21h8" /></>
    : <path d="M6 6l12 12M18 6 6 18" />}</svg>
}

function visibleViewport() {
  const viewport = window.visualViewport
  return { left: viewport?.offsetLeft || 0, top: viewport?.offsetTop || 0, width: viewport?.width || window.innerWidth, height: viewport?.height || window.innerHeight }
}

export default function LehrRecordingTools({ ready, onToggleReady }) {
  const [cameraOn, setCameraOn] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [paused, setPaused] = useState(false)
  const [large, setLarge] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const streamRef = useRef(null)
  const requestRef = useRef(0)
  const mountedRef = useRef(false)
  const panelRef = useRef(null)
  const videoRef = useRef(null)
  const positionRef = useRef(null)
  const dragRef = useRef(null)

  const stopCamera = useCallback((update = true) => {
    requestRef.current += 1
    const stream = streamRef.current
    streamRef.current = null
    stopCameraStream(stream)
    if (videoRef.current) videoRef.current.srcObject = null
    dragRef.current = null
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
        video: { facingMode: { ideal: 'user' }, width: { ideal: 640 }, height: { ideal: 480 } },
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

  useEffect(() => {
    if (!cameraOn) return undefined
    const fit = () => {
      const viewport = visibleViewport()
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
  }, [cameraOn, moveTo])

  const beginDrag = event => {
    if (event.button !== 0 || !panelRef.current) return
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
    <button type="button" className={`${styles.control} ${ready ? styles.selected : ''}`} aria-label={ready ? 'Aufnahmeansicht verlassen' : 'Bereit zur Aufnahme'} title={ready ? 'Aufnahmeansicht verlassen' : 'Bereit zur Aufnahme'} aria-pressed={ready} onClick={() => { onToggleReady(); setShowGuide(!ready) }}>
      <Icon name="ready" /><span>{ready ? 'Ansicht verlassen' : 'Bereit zur Aufnahme'}</span>
    </button>
    {(cameraOn || error || (ready && showGuide)) && createPortal(<div className={styles.overlays} data-lehr-ui dir="ltr">
      {error && <div className={styles.notice} role="alert"><p>{error}</p><button type="button" onClick={() => setError('')} aria-label="Kamerahinweis schließen">×</button></div>}
      {ready && showGuide && <section className={styles.guide} aria-label="Aufnahme vorbereiten">
        <strong>Ansicht bereit — noch keine Aufnahme</strong>
        <p>iPad: Kontrollzentrum öffnen → Bildschirmaufnahme gedrückt halten → Mikrofon einschalten → Aufnahme starten.</p>
        <p>Das Video wird in Fotos gespeichert. Prüfe zuerst mit einem kurzen Test, ob Kamera und Ton im Video enthalten sind.</p>
        <button type="button" onClick={() => setShowGuide(false)}>Verstanden · Hinweis ausblenden</button>
      </section>}
      {cameraOn && <section ref={panelRef} className={`${styles.camera} ${large ? styles.large : ''}`} aria-label="Frontkamera-Vorschau">
        <header>
          <button type="button" className={styles.grip} aria-label="Kamerafenster verschieben" title="Ziehen oder mit Pfeiltasten verschieben" onPointerDown={beginDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { dragRef.current = null }} onKeyDown={moveWithKeyboard}>⠿ <span>Kamera</span></button>
          <button type="button" onClick={() => setLarge(value => !value)} aria-label={large ? 'Kamerafenster verkleinern' : 'Kamerafenster vergrößern'}>{large ? '−' : '+'}</button>
          <button type="button" onClick={() => stopCamera()} aria-label="Frontkamera ausschalten">×</button>
        </header>
        <video ref={attachVideo} autoPlay muted playsInline aria-label="Livebild der Frontkamera" onPlaying={() => setPaused(false)} onPause={() => { if (streamRef.current) setPaused(true) }} />
        {paused && <button type="button" className={styles.resume} onClick={playVideo}>Kamerabild fortsetzen</button>}
      </section>}
    </div>, document.body)}
  </>
}
