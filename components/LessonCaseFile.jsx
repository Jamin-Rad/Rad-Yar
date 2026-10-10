'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, useId } from 'react'
import { createSliceWheelController } from '@/lib/lessonSliceWheel.mjs'
import styles from './LessonTemplate.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

function Icon({ name, className = '' }) {
  const paths = {
    brain: <><path d="M12 5.3a3.4 3.4 0 0 0-6.1 2.1A3.5 3.5 0 0 0 4 13.8a3.8 3.8 0 0 0 4 4.9c1.1 0 2.1-.5 2.7-1.2V6.8A2.9 2.9 0 0 0 8.2 4c-1 0-1.8.5-2.3 1.3"/><path d="M12 5.3a3.4 3.4 0 0 1 6.1 2.1 3.5 3.5 0 0 1 1.9 6.4 3.8 3.8 0 0 1-4 4.9c-1.1 0-2.1-.5-2.7-1.2V6.8A2.9 2.9 0 0 1 15.8 4c1 0 1.8.5 2.3 1.3"/><path d="M7.2 9.2c1 .1 1.8.8 1.9 1.8M16.8 9.2c-1 .1-1.8.8-1.9 1.8M7.5 15.2c.8-.7 1.6-.9 2.4-.7M16.5 15.2c-.8-.7-1.6-.9-2.4-.7"/></>,
    scan: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5M3.5 10.5h2M10.5 3.5v2"/></>,
    vessel: <><path d="M12 21V11M12 11 7 6M12 11l5-5M7 6V3M17 6V3M8.5 14.5 5 18v3M15.5 14.5 19 18v3"/><circle cx="12" cy="10.5" r="1.2"/></>,
    chart: <><path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/><path d="m3 6 5 2 5-4 6 3"/></>,
    decision: <><circle cx="8" cy="7" r="2.2"/><circle cx="16" cy="7" r="2.2"/><path d="M3.5 19v-2.2A3.8 3.8 0 0 1 7.3 13h1.4a3.8 3.8 0 0 1 3.8 3.8V19M12.5 19v-2.2A3.8 3.8 0 0 1 16.3 13h.4a3.8 3.8 0 0 1 3.8 3.8V19"/></>,
    case: <><path d="M6 4h12v16H6zM9 4V2h6v2M9 9h6M9 13h6M9 17h4"/></>,
    quiz: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M7.2 9.1a2 2 0 1 1 2.8 1.8c-.9.4-1.4.9-1.4 1.8"/><circle cx="8.6" cy="16" r=".55" fill="currentColor" stroke="none"/><path d="M13.5 8.5h3.5M13.5 12h3.5M13.5 15.5h2.5"/></>,
    flashcards: <><rect x="7" y="5" width="13" height="15" rx="2"/><path d="M7 18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/><path d="M10 9h7M10 13h5"/></>,
    check: <><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/></>,
    spark: <><path d="M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z"/><path d="m18.5 15 .8 2.7L22 18.5l-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z"/></>,
    bookmark: <><path d="M6 3.5h12v17l-6-3.8-6 3.8z"/><path d="M9 8h6M9 11.5h4"/></>,
    external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6H5V6h6"/></>,
    previous: <><path d="m14.5 6-6 6 6 6"/></>,
    next: <><path d="m9.5 6 6 6-6 6"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function CaseSequence({ lang, caseData }) {
  const { frames, initialFrame, alt } = caseData
  const [frameIndex, setFrameIndex] = useState(initialFrame)
  const viewerRef = useRef(null)
  const frameIndexRef = useRef(initialFrame)
  const pointerStartRef = useRef(null)
  const decodedFramesRef = useRef(new Set())
  const loadAttemptRef = useRef(0)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [seriesReady, setSeriesReady] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)

  const selectFrame = useCallback(index => {
    const next = Math.min(frames.length - 1, Math.max(0, index))
    frameIndexRef.current = next
    setFrameIndex(next)
  }, [frames.length])

  const moveFrame = useCallback(delta => selectFrame(frameIndexRef.current + delta), [selectFrame])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return undefined
    const wheelStep = createSliceWheelController()
    const handleWheel = event => {
      if (event.ctrlKey || !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      // Keep the same gesture inside the viewer even at the first/last slice.
      // Otherwise trackpad momentum suddenly scrolls the document underneath.
      event.preventDefault()
      if (!seriesReady) return
      const step = wheelStep({ deltaY: event.deltaY, deltaX: event.deltaX, deltaMode: event.deltaMode, time: performance.now() })
      if (step) moveFrame(step)
    }
    viewer.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      viewer.removeEventListener('wheel', handleWheel)
    }
  }, [seriesReady, moveFrame])

  const handleFrameLoad = async (image, index, attempt) => {
    try {
      await image.decode()
      if (loadAttemptRef.current !== attempt) return
      decodedFramesRef.current.add(index)
      if (decodedFramesRef.current.size === frames.length) setSeriesReady(true)
    } catch {
      if (loadAttemptRef.current === attempt) setLoadFailed(true)
    }
  }

  const retrySeries = () => {
    decodedFramesRef.current.clear()
    setSeriesReady(false)
    setLoadFailed(false)
    loadAttemptRef.current += 1
    setLoadAttempt(loadAttemptRef.current)
  }

  const labels = {
    previous: pick(L('Vorherige Schicht', 'Previous slice', 'برش قبلی'), lang),
    next: pick(L('Nächste Schicht', 'Next slice', 'برش بعدی'), lang),
    slider: pick(L('Schicht auswählen', 'Select slice', 'انتخاب برش'), lang),
    loading: pick(L('Bildserie wird vorbereitet …', 'Preparing image series …', 'در حال آماده‌سازی سری تصاویر …'), lang),
    error: pick(L('Bildserie konnte nicht vollständig geladen werden.', 'The image series could not be fully loaded.', 'سری تصاویر کامل بارگذاری نشد.'), lang),
    retry: pick(L('Erneut laden', 'Retry loading', 'بارگذاری دوباره'), lang),
  }

  const handleKeyDown = event => {
    if (!seriesReady) return
    if (['ArrowRight', 'ArrowDown'].includes(event.key)) moveFrame(1)
    else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) moveFrame(-1)
    else if (event.key === 'Home') selectFrame(0)
    else if (event.key === 'End') selectFrame(frames.length - 1)
    else return
    event.preventDefault()
  }

  const handlePointerDown = event => {
    if (!seriesReady || !event.isPrimary || event.button !== 0) return
    pointerStartRef.current = { position: event.pointerType === 'touch' ? event.clientX : event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = event => {
    const start = pointerStartRef.current
    if (!start) return
    const position = event.pointerType === 'touch' ? event.clientX : event.clientY
    const steps = Math.trunc((start.position - position) / 36)
    if (!steps) return
    start.position = position
    moveFrame(steps)
  }

  const handlePointerEnd = event => {
    pointerStartRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return <div className={styles.caseViewer}>
    <div ref={viewerRef} className={styles.caseViewport} data-no-zoom data-lesson-print-case-viewport role="group" aria-busy={!seriesReady && !loadFailed} tabIndex={0} onKeyDown={handleKeyDown} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd} onLostPointerCapture={() => { pointerStartRef.current = null }} aria-label={pick(alt, lang)}>
      {frames.map((src, index) => <Image key={`${loadAttempt}-${src}`} src={src} alt={index === frameIndex ? `${pick(alt, lang)} · ${index + 1}/${frames.length}` : ''} aria-hidden={index !== frameIndex} style={{ visibility: index === frameIndex ? 'visible' : 'hidden' }} width={320} height={320} unoptimized loading="eager" draggable={false} onLoad={event => handleFrameLoad(event.currentTarget, index, loadAttempt)} onError={() => { if (loadAttemptRef.current === loadAttempt) setLoadFailed(true) }} />)}
      <div className={styles.caseImageMeta}><strong dir="ltr" aria-live="polite">{String(frameIndex + 1).padStart(2, '0')} <i>/ {frames.length}</i></strong></div>
      {!seriesReady || loadFailed ? <small className={styles.caseViewportHint} dir={lang === 'fa' ? 'rtl' : 'ltr'} role="status">{loadFailed ? <>{labels.error} <button type="button" onClick={retrySeries}>{labels.retry}</button></> : labels.loading}</small> : null}
      <div className={styles.caseControls} dir="ltr" onPointerDown={event => event.stopPropagation()} onPointerMove={event => event.stopPropagation()}>
        <button type="button" onClick={() => moveFrame(-1)} disabled={!seriesReady || frameIndex === 0} aria-label={labels.previous} title={labels.previous}><Icon name="previous" /></button>
        <div className={styles.caseRange}><input type="range" disabled={!seriesReady} min="0" max={frames.length - 1} step="1" value={frameIndex} onChange={event => selectFrame(Number(event.target.value))} aria-label={labels.slider} aria-valuetext={`${frameIndex + 1} / ${frames.length}`} /></div>
        <button type="button" onClick={() => moveFrame(1)} disabled={!seriesReady || frameIndex === frames.length - 1} aria-label={labels.next} title={labels.next}><Icon name="next" /></button>
      </div>
    </div>
  </div>
}

export default function RadiopaediaFile({ lang, caseData }) {
  const findingsId = useId()
  return <article className={styles.radiopaediaFile} data-lesson-print-case>
    <header className={styles.caseFileHeader} data-lesson-print-case-header>
      <span className={styles.caseFileIcon}><Icon name="case" /></span>
      <span className={styles.caseFileHeading}>
        <strong>{caseData.heading || pick(L('Fallbeispiel', 'Case example', 'نمونه کیس'), lang)}</strong>
      </span>
      <a href={caseData.url} target="_blank" rel="noopener noreferrer">{pick(L('Fall im Vollbild', 'Open case full screen', 'نمایش تمام‌صفحه کیس'), lang)} <Icon name="external" /></a>
    </header>
    <div className={styles.caseFileContent} data-lesson-print-case-content>
      <CaseSequence lang={lang} caseData={caseData} />
      <div className={styles.caseBody} data-lesson-print-case-body>
        <h3>{pick(caseData.title, lang)}</h3>
        <section className={styles.caseFindings} aria-labelledby={findingsId}>
          <h4 id={findingsId}>{pick(L('Was sehen wir?', 'What do we see?', 'چه می‌بینیم؟'), lang)}</h4>
          <ol>{caseData.findings.map((finding, index) => <li key={pick(finding, lang)}><span>{index + 1}</span><p>{pick(finding, lang)}</p></li>)}</ol>
          <div className={styles.caseInterpretation}>
            <strong>{pick(L('Entscheidender Befund', 'Key interpretation', 'یافته کلیدی'), lang)}</strong>
            <p>{pick(caseData.interpretation, lang)}</p>
          </div>
        </section>
      </div>
    </div>
    <footer className={styles.caseCredit} data-lesson-print-case-credit>{caseData.credit}</footer>
  </article>
}

