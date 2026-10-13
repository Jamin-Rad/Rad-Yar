'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cameraErrorMessage, clampCameraPosition, stopCameraStream } from '../utils/lehrCamera'
import styles from './LehrRecordingTools.module.css'

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{name === 'camera'
    ? <><rect x="3" y="6" width="13" height="12" rx="3" /><path d="m16 10 5-3v10l-5-3" /></>
    : name === 'ready' ? <><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5" /></>
    : <path d="M6 6l12 12M18 6 6 18" />}</svg>
}

function visibleViewport() {
  const viewport = window.visualViewport
  return { left: viewport?.offsetLeft || 0, top: viewport?.offsetTop || 0, width: viewport?.width || window.innerWidth, height: viewport?.height || window.innerHeight }
}

function pageFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null
}

async function requestPageFullscreen() {
  const root = document.documentElement
  const request = root.requestFullscreen || root.webkitRequestFullscreen
  if (!request) return false
  await request.call(root)
  return true
}

async function exitPageFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen
  if (pageFullscreenElement() && exit) await exit.call(document)
}

export default function LehrRecordingTools({ ready, onReadyChange }) {
  const [cameraOn, setCameraOn] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [paused, setPaused] = useState(false)
  const [large, setLarge] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [fullscreenActive, setFullscreenActive] = useState(false)
  const streamRef = useRef(null)
  const requestRef = useRef(0)
  const mountedRef = useRef(false)
  const panelRef = useRef(null)
  const videoRef = useRef(null)
  const positionRef = useRef(null)
  const dragRef = useRef(null)
  const wasFullscreenRef = useRef(false)

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
      exitPageFullscreen().catch(() => {})
    }
  }, [stopCamera])

  useEffect(() => {
    const syncFullscreen = () => {
      const next = Boolean(pageFullscreenElement())
      setFullscreenActive(next)
      if (wasFullscreenRef.current && !next) onReadyChange(false)
      wasFullscreenRef.current = next
    }
    syncFullscreen()
    document.addEventListener('fullscreenchange', syncFullscreen)
    document.addEventListener('webkitfullscreenchange', syncFullscreen)
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreen)
      document.removeEventListener('webkitfullscreenchange', syncFullscreen)
    }
  }, [onReadyChange])

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
        video: {
          facingMode: { ideal: 'user' },
          width: { ideal: 720 },
          height: { ideal: 900 },
          aspectRatio: { ideal: 0.8 },
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

  const toggleRecordingView = async () => {
    setError('')
    setShowGuide(!ready)
    if (ready) {
      onReadyChange(false)
      try { await exitPageFullscreen() } catch {}
      return
    }

    onReadyChange(true)
    try {
      const supported = await requestPageFullscreen()
      if (!supported) setError('Dieser Browser unterstützt kein echtes Vollbild. Die störungsfreie Aufnahmeansicht ist stattdessen aktiv.')
    } catch {
      setError('Vollbild konnte nicht geöffnet werden. Die störungsfreie Aufnahmeansicht ist trotzdem aktiv.')
    }
  }

  return <>
    <button type="button" className={`${styles.control} ${cameraOn ? styles.selected : ''}`} aria-label={cameraOn ? 'Frontkamera ausschalten' : pending ? 'Kamera wird gestartet' : 'Frontkamera einschalten'} title={cameraOn ? 'Frontkamera ausschalten' : 'Frontkamera einschalten'} aria-pressed={cameraOn} aria-busy={pending} onClick={() => cameraOn ? stopCamera() : startCamera()} disabled={pending}>
      <Icon name="camera" /><span>{pending ? 'Kamera …' : 'Frontkamera'}</span>
    </button>
    <button type="button" className={`${styles.control} ${ready ? styles.selected : ''}`} aria-label={ready ? 'Vollbild verlassen' : 'Vollbild für Aufnahme'} title={ready ? 'Vollbild verlassen' : 'Vollbild für Aufnahme'} aria-pressed={ready} onClick={toggleRecordingView}>
      <Icon name="ready" /><span>{ready ? 'Vollbild verlassen' : 'Vollbild'}</span>
    </button>
    {(cameraOn || error || (ready && showGuide)) && createPortal(<div className={styles.overlays} data-lehr-ui dir="ltr">
      {error && <div className={styles.notice} role="alert"><p>{error}</p><button type="button" onClick={() => setError('')} aria-label="Kamerahinweis schließen">×</button></div>}
      {ready && showGuide && <section className={styles.guide} aria-label="Aufnahme vorbereiten">
        <strong>{fullscreenActive ? 'Vollbild ist bereit — noch keine Aufnahme' : 'Aufnahmeansicht ist bereit — noch keine Aufnahme'}</strong>
        <p>iPad: Kontrollzentrum öffnen → Bildschirmaufnahme gedrückt halten → Mikrofon einschalten → Aufnahme starten.</p>
        <p>Das Video wird in Fotos gespeichert. Prüfe zuerst mit einem kurzen Test, ob Kamera und Ton im Video enthalten sind.</p>
        <button type="button" onClick={() => setShowGuide(false)}>Verstanden · Hinweis ausblenden</button>
      </section>}
      {cameraOn && <section ref={panelRef} className={`${styles.camera} ${large ? styles.large : ''}`} aria-label="Frontkamera-Vorschau">
        <header>
          <button type="button" className={styles.grip} aria-label="Kamerafenster verschieben" title="Ziehen oder mit Pfeiltasten verschieben" onPointerDown={beginDrag} onPointerMove={drag} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { dragRef.current = null }} onKeyDown={moveWithKeyboard}>⠿ <span>Kamera</span></button>
          <button type="button" onClick={() => setLarge(value => !value)} aria-label={large ? 'Kamerafenster verkleinern' : 'Kamerafenster vergrößern'} title={large ? 'Verkleinern' : 'Vergrößern'}>{large ? '↙' : '↗'}</button>
          <button type="button" onClick={() => stopCamera()} aria-label="Frontkamera ausschalten">×</button>
        </header>
        <div className={styles.videoFrame}>
          <video ref={attachVideo} autoPlay muted playsInline aria-label="Livebild der Frontkamera" onPlaying={() => setPaused(false)} onPause={() => { if (streamRef.current) setPaused(true) }} />
          {paused && <button type="button" className={styles.resume} onClick={playVideo}>Kamerabild fortsetzen</button>}
        </div>
      </section>}
    </div>, document.body)}
  </>
}
