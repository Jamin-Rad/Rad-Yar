'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { normalizeExamMedia } from '@/utils/examMedia'
import styles from './MedicalSequenceViewer.module.css'

const COPY = {
  de: { choose: 'Sequenz auswählen', slice: 'Schicht', hint: 'Mausrad oder Pfeiltasten', source: 'Originalfall ansehen', expand: 'Bild vergrößern', close: 'Großansicht schließen' },
  en: { choose: 'Choose sequence', slice: 'Slice', hint: 'Mouse wheel or arrow keys', source: 'View original case', expand: 'Enlarge image', close: 'Close enlarged view' },
  fa: { choose: 'انتخاب سکانس', slice: 'برش', hint: 'اسکرول ماوس یا کلیدهای جهت', source: 'مشاهده کیس اصلی', expand: 'بزرگ‌نمایی تصویر', close: 'بستن نمای بزرگ' },
}

function ArrowIcon({ direction }) {
  const transform = direction === 'previous' ? 'rotate(180 10 10)' : undefined
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.25 4.75 12.5 10l-5.25 5.25" transform={transform} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function MedicalSequenceViewer({ media, language = 'de', compact = false, priority = false, expandable = false }) {
  const normalized = useMemo(() => normalizeExamMedia(media), [media])
  const [seriesIndex, setSeriesIndex] = useState(0)
  const activeSeries = normalized?.series[Math.min(seriesIndex, Math.max(0, normalized.series.length - 1))]
  const [frameIndex, setFrameIndex] = useState(activeSeries?.initialFrame || 0)
  const [expanded, setExpanded] = useState(false)
  const copy = COPY[language] || COPY.de

  useEffect(() => {
    setSeriesIndex(0)
  }, [normalized?.title])

  useEffect(() => {
    setFrameIndex(activeSeries?.initialFrame || 0)
  }, [activeSeries?.id, activeSeries?.initialFrame])

  useEffect(() => {
    if (!expanded) return undefined
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = event => {
      if (event.key === 'Escape') setExpanded(false)
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') setFrameIndex(index => Math.min((activeSeries?.frames.length || 1) - 1, index + 1))
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') setFrameIndex(index => Math.max(0, index - 1))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeSeries?.frames.length, expanded])

  if (!normalized || !activeSeries) return null

  const frameCount = activeSeries.frames.length
  const safeFrameIndex = Math.min(frameIndex, frameCount - 1)
  const move = direction => setFrameIndex(index => Math.min(frameCount - 1, Math.max(0, index + direction)))
  const thumbnailIndexes = Array.from({ length: Math.min(7, frameCount) }, (_, offset) => {
    const start = Math.min(Math.max(0, safeFrameIndex - 3), Math.max(0, frameCount - 7))
    return start + offset
  })

  return (
    <section className={`${styles.viewer} ${compact ? styles.compact : ''}`} aria-label={normalized.title || copy.choose}>
      {normalized.series.length > 1 ? (
        <div className={styles.seriesBar}>
          <span>{copy.choose}</span>
          <div role="tablist" aria-label={copy.choose}>
            {normalized.series.map((series, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={index === seriesIndex}
                className={index === seriesIndex ? styles.seriesActive : styles.seriesButton}
                onClick={() => setSeriesIndex(index)}
                key={series.id}
              >
                {series.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div
        className={`${styles.viewport} ${expandable ? styles.viewportExpandable : ''}`}
        tabIndex={0}
        aria-label={expandable ? copy.expand : undefined}
        onClick={expandable ? event => {
          if (event.target.closest('button, input')) return
          setExpanded(true)
        } : undefined}
        onWheel={frameCount > 1 ? event => {
          event.preventDefault()
          move(event.deltaY > 0 ? 1 : -1)
        } : undefined}
        onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowDown') move(1)
          if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') move(-1)
          if (expandable && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            setExpanded(true)
          }
        }}
      >
        <Image
          src={activeSeries.frames[safeFrameIndex]}
          alt={normalized.title || ''}
          fill
          priority={priority}
          sizes={compact ? '(max-width: 700px) 100vw, 620px' : '(max-width: 900px) 100vw, 760px'}
          className={styles.image}
        />
        <div className={styles.overlayTop}>
          <span>{activeSeries.plane || normalized.plane}</span>
          <strong>{copy.slice} {safeFrameIndex + 1} / {frameCount}</strong>
        </div>
        {frameCount > 1 ? (
          <>
            <button type="button" className={`${styles.frameArrow} ${styles.previousArrow}`} onClick={() => move(-1)} disabled={safeFrameIndex === 0} aria-label="Previous slice"><ArrowIcon direction="previous" /></button>
            <button type="button" className={`${styles.frameArrow} ${styles.nextArrow}`} onClick={() => move(1)} disabled={safeFrameIndex === frameCount - 1} aria-label="Next slice"><ArrowIcon direction="next" /></button>
            <span className={styles.wheelHint}>{copy.hint}</span>
          </>
        ) : null}
        {expandable ? <span className={styles.expandHint}>{copy.expand}</span> : null}
      </div>

      {frameCount > 1 ? (
        <>
          {!compact ? (
            <div className={styles.filmstrip}>
              {thumbnailIndexes.map(index => (
                <button type="button" className={index === safeFrameIndex ? styles.thumbnailActive : styles.thumbnail} onClick={() => setFrameIndex(index)} key={index} aria-label={`${copy.slice} ${index + 1}`}>
                  <Image src={activeSeries.frames[index]} alt="" fill sizes="82px" />
                  <span>{index + 1}</span>
                </button>
              ))}
            </div>
          ) : null}
          <div className={styles.scrubber}>
            <span>1</span>
            <input type="range" min="0" max={frameCount - 1} value={safeFrameIndex} onChange={event => setFrameIndex(Number(event.target.value))} aria-label={`${copy.slice} ${safeFrameIndex + 1} / ${frameCount}`} />
            <span>{frameCount}</span>
            <strong>{copy.slice} {safeFrameIndex + 1} / {frameCount}</strong>
          </div>
        </>
      ) : null}

      {(normalized.credit || normalized.source) ? (
        <footer className={styles.credit}>
          <span>{normalized.credit}</span>
          {normalized.source ? <a href={normalized.source} target="_blank" rel="noopener noreferrer">{copy.source} ↗</a> : null}
        </footer>
      ) : null}

      {expanded ? createPortal(
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={copy.expand} onClick={event => {
          if (event.target === event.currentTarget) setExpanded(false)
        }}>
          <div className={styles.lightboxToolbar}>
            <div>
              <strong>{activeSeries.label}</strong>
              <span>{activeSeries.plane || normalized.plane}</span>
            </div>
            <button type="button" onClick={() => setExpanded(false)} aria-label={copy.close}>×</button>
          </div>
          <div className={styles.lightboxStage}>
            <Image
              src={activeSeries.frames[safeFrameIndex]}
              alt={normalized.title || activeSeries.label || ''}
              fill
              priority
              sizes="100vw"
              className={styles.lightboxImage}
            />
            {frameCount > 1 ? (
              <>
                <button type="button" className={`${styles.lightboxArrow} ${styles.lightboxPrevious}`} onClick={() => move(-1)} disabled={safeFrameIndex === 0} aria-label="Previous slice"><ArrowIcon direction="previous" /></button>
                <button type="button" className={`${styles.lightboxArrow} ${styles.lightboxNext}`} onClick={() => move(1)} disabled={safeFrameIndex === frameCount - 1} aria-label="Next slice"><ArrowIcon direction="next" /></button>
              </>
            ) : null}
          </div>
          <div className={styles.lightboxFooter}>
            <span>{copy.hint}</span>
            <strong>{copy.slice} {safeFrameIndex + 1} / {frameCount}</strong>
          </div>
        </div>,
        document.body
      ) : null}
    </section>
  )
}
