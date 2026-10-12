'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  KANGURU_GRADE_GROUPS,
  KANGURU_PARTS,
  KANGURU_PLANNED_YEARS,
  KANGURU_QUESTIONS,
  questionsForExam,
  questionsForGradeGroup,
} from '@/data/kanguruQuestions'
import styles from './page.module.css'
import { berlinDay, streakSummary } from '@/lib/kanguruStreak'
import { normalizeProgress, mergeProgress } from '@/lib/kanguruProgress'

const STORAGE_KEY = 'andarun_kaenguru_progress_v1'
// Keep the legacy browser key so moving the page does not lose existing answers.
const EMPTY_PROGRESS = { version: 3, gradeGroup: '5-6', attempts: {}, practiceDays: [], updatedAt: null }
const DRAW_COLORS = ['#ef4444', '#f97316', '#2563eb', '#111827']
const LEHR_LABELS = {
  mode: 'Lehr-Mode', hint: 'Aufgabe besprechen, markieren und skizzieren',
  cursor: 'Bedienen', pen: 'Stift', marker: 'Marker', eraser: 'Radierer',
  undo: 'Rückgängig', clear: 'Alles löschen', board: 'Whiteboard',
  closeBoard: 'Whiteboard schließen', addPage: 'Seite hinzufügen', page: 'Seite',
  resetHint: 'Notizen werden bei der nächsten Aufgabe automatisch gelöscht.',
}
const STATS_METRICS = {
  solved: { label: 'Gelöst', icon: '✓', hint: 'Alle bearbeiteten Aufgaben' },
  open: { label: 'Offen', icon: '⚡', hint: 'Deine nächsten Herausforderungen' },
  review: { label: 'Zu wiederholen', icon: '↻', hint: 'Aufgaben für deine nächste Runde' },
}
const DAY_FORMATTER = new Intl.DateTimeFormat('de-DE', {
  weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Europe/Berlin',
})

function DrawIcon({ name }) {
  const paths = {
    cursor: <path d="m5 3 8 8-4 .8-2 3.2L5 3Z" />,
    pen: <path d="m4 14 2.7-.6 7-7-2.1-2.1-7 7L4 14Zm6.6-8.7 2.1 2.1" />,
    marker: <path d="m5 11 6.8-6.8 2 2L7 13H5v-2Zm1.5 2H14" />,
    eraser: <path d="m5.2 12.8-2-2 6.5-6.5a1.4 1.4 0 0 1 2 0l2 2a1.4 1.4 0 0 1 0 2l-4.5 4.5h-4Zm4-5.5 3.5 3.5" />,
    undo: <path d="M6.5 5 3 8.5 6.5 12M3.5 8.5H10a4 4 0 0 1 4 4" />,
    trash: <path d="M5.5 6v8h7V6M4 6h10M7 6V4h4v2" />,
    board: <><rect x="2.5" y="3" width="13" height="10" rx="1.5"/><path d="M6 16h6M9 13v3"/></>,
  }
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function AnnotationSurface({ children, title, blank = false, resetKey, enabled = true }) {
  const canvasRef = useRef(null)
  const stageRef = useRef(null)
  const strokesRef = useRef([])
  const drawingRef = useRef(null)
  const [tool, setTool] = useState(blank ? 'pen' : 'cursor')
  const [color, setColor] = useState(DRAW_COLORS[0])
  const [revision, setRevision] = useState(0)

  const redraw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    const ratio = window.devicePixelRatio || 1
    context.save()
    context.scale(ratio, ratio)
    strokesRef.current.forEach(stroke => {
      if (stroke.points.length < 2) return
      context.beginPath()
      context.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over'
      context.globalAlpha = stroke.tool === 'marker' ? .28 : 1
      context.strokeStyle = stroke.color
      context.lineWidth = stroke.tool === 'eraser' ? 24 : stroke.tool === 'marker' ? 18 : 3
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.moveTo(stroke.points[0].x, stroke.points[0].y)
      stroke.points.slice(1).forEach(point => context.lineTo(point.x, point.y))
      context.stroke()
    })
    context.restore()
  }

  useEffect(() => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return undefined
    const resize = () => {
      const box = stage.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.round(box.width * ratio))
      canvas.height = Math.max(1, Math.round(box.height * ratio))
      canvas.style.width = `${box.width}px`
      canvas.style.height = `${box.height}px`
      redraw()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(stage)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision])

  useEffect(() => {
    strokesRef.current = []
    drawingRef.current = null
    setTool(blank ? 'pen' : 'cursor')
    setRevision(value => value + 1)
  }, [resetKey])

  const pointFromEvent = event => {
    const box = canvasRef.current.getBoundingClientRect()
    return { x: event.clientX - box.left, y: event.clientY - box.top }
  }
  const startDrawing = event => {
    if (tool === 'cursor') return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const stroke = { tool, color, points: [pointFromEvent(event)] }
    strokesRef.current.push(stroke)
    drawingRef.current = stroke
  }
  const moveDrawing = event => {
    if (!drawingRef.current) return
    event.preventDefault()
    drawingRef.current.points.push(pointFromEvent(event))
    redraw()
  }
  const stopDrawing = event => {
    if (!drawingRef.current) return
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    drawingRef.current = null
    setRevision(value => value + 1)
  }
  const undo = () => {
    strokesRef.current.pop()
    setRevision(value => value + 1)
  }
  const clear = () => {
    strokesRef.current = []
    setRevision(value => value + 1)
  }

  if (!enabled) return children

  return (
    <section className={`${styles.annotationSurface} ${blank ? styles.whiteboardSurface : ''}`}>
      <div className={styles.annotationToolbar} aria-label={title}>
        <strong>{title}</strong>
        <div className={styles.annotationTools}>
          {['cursor', 'pen', 'marker', 'eraser'].map(name => blank && name === 'cursor' ? null : (
            <button key={name} type="button" className={tool === name ? styles.annotationToolActive : ''} onClick={() => setTool(name)} title={LEHR_LABELS[name]} aria-label={LEHR_LABELS[name]}><DrawIcon name={name} /><span>{LEHR_LABELS[name]}</span></button>
          ))}
          <div className={styles.colorChoices} aria-label="Farbe">
            {DRAW_COLORS.map(value => <button key={value} type="button" className={color === value ? styles.colorActive : ''} style={{ '--draw-color': value }} onClick={() => setColor(value)} aria-label={value} />)}
          </div>
          <button type="button" onClick={undo} title={LEHR_LABELS.undo} aria-label={LEHR_LABELS.undo}><DrawIcon name="undo" /></button>
          <button type="button" onClick={clear} title={LEHR_LABELS.clear} aria-label={LEHR_LABELS.clear}><DrawIcon name="trash" /></button>
        </div>
      </div>
      <div ref={stageRef} className={`${styles.annotationStage} ${blank ? styles.whiteboardCanvas : ''}`}>
        {children}
        <canvas ref={canvasRef} className={`${styles.drawingCanvas} ${tool === 'cursor' ? styles.canvasPassive : ''}`} onPointerDown={startDrawing} onPointerMove={moveDrawing} onPointerUp={stopDrawing} onPointerCancel={stopDrawing} />
      </div>
    </section>
  )
}

function ArrowIcon({ direction = 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={direction === 'left' ? styles.flipIcon : undefined}>
      <path d="M5 12h14M14 6l6 6-6 6" />
    </svg>
  )
}

function PencilIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m7 25 2-7L22 5l5 5-13 13-7 2Z"/><path d="m19 8 5 5M9 18l5 5"/></svg>
}

function PaperIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 4h11l6 6v18H8Z"/><path d="M19 4v7h6M12 16h9M12 21h9"/></svg>
}

function RepeatIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M25 11a10 10 0 0 0-17-2l-2 3"/><path d="M6 6v6h6M7 21a10 10 0 0 0 17 2l2-3"/><path d="M26 26v-6h-6"/></svg>
}

function LockIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8" y="14" width="16" height="14" rx="3"/><path d="M11 14V9a5 5 0 0 1 10 0v5"/></svg>
}

function TargetIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11"/><circle cx="16" cy="16" r="5"/><path d="m16 16 10-10M21 6h5v5"/></svg>
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>
}

function readLocalProgress() {
  if (typeof window === 'undefined') return EMPTY_PROGRESS
  try {
    return normalizeProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'))
  } catch {
    return EMPTY_PROGRESS
  }
}

function shuffled(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swap]] = [result[swap], result[index]]
  }
  return result
}

function percent(value, total) {
  return total ? Math.round((value / total) * 100) : 0
}

function buildWeaknesses(questions, attempts) {
  const topics = new Map()
  for (const question of questions) {
    const attempt = attempts[question.id]
    if (!attempt) continue
    const topic = question.topic || 'Weitere Themen'
    const entry = topics.get(topic) || { topic, attempted: 0, wrong: 0, ids: [] }
    entry.attempted += 1
    entry.wrong += (attempt.history || []).filter(item => !item.correct).length
    entry.ids.push(question.id)
    topics.set(topic, entry)
  }
  return [...topics.values()].sort((a, b) => (b.wrong / b.attempted) - (a.wrong / a.attempted))
}

function formatAttemptDay(value) {
  if (!value) return 'Noch nicht bearbeitet'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Datum unbekannt' : DAY_FORMATTER.format(date)
}

function StatsDialog({ metric, onMetricChange, questions, attempts, gradeGroup, onClose }) {
  const rows = useMemo(() => questions.map(question => {
    const attempt = attempts[question.id]
    const history = Array.isArray(attempt?.history) ? attempt.history : []
    const latest = history[history.length - 1]
    return {
      question,
      attempt,
      latest,
      answeredAt: attempt?.lastAnsweredAt || latest?.at || null,
    }
  }), [attempts, questions])
  const metricRows = useMemo(() => rows.filter(row => {
    if (metric === 'open') return !row.attempt
    if (metric === 'review') return Boolean(row.attempt?.needsReview)
    return Boolean(row.attempt)
  }).sort((a, b) => {
    if (a.answeredAt || b.answeredAt) return String(b.answeredAt || '').localeCompare(String(a.answeredAt || ''))
    return (b.question.year - a.question.year) || a.question.part.localeCompare(b.question.part) || a.question.number - b.question.number
  }), [metric, rows])
  const yearCounts = useMemo(() => KANGURU_PLANNED_YEARS.map(year => ({
    year,
    count: metricRows.filter(row => row.question.year === year).length,
  })).filter(item => item.count > 0), [metricRows])
  const dayCounts = useMemo(() => {
    const totals = new Map()
    metricRows.forEach(row => {
      if (!row.answeredAt) return
      const day = formatAttemptDay(row.answeredAt)
      totals.set(day, (totals.get(day) || 0) + 1)
    })
    return [...totals.entries()].map(([day, count]) => ({ day, count })).slice(0, 8)
  }, [metricRows])
  const active = STATS_METRICS[metric]

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className={styles.statsBackdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={styles.statsDialog} role="dialog" aria-modal="true" aria-labelledby="stats-dialog-title" lang="de" dir="ltr">
        <button className={styles.statsClose} type="button" onClick={onClose} aria-label="Statistik schließen"><CloseIcon /></button>
        <header className={`${styles.statsHero} ${styles[`statsHero_${metric}`]}`}>
          <span className={styles.statsHeroIcon}>{active.icon}</span>
          <div><small>DEIN KÄNGURU-CHECK</small><h2 id="stats-dialog-title">{active.label}</h2><p>{active.hint} · Klassen {gradeGroup.replace('-', '/')}</p></div>
          <strong>{metricRows.length}</strong>
        </header>

        <div className={styles.statsTabs} role="tablist" aria-label="Statistik auswählen">
          {Object.entries(STATS_METRICS).map(([key, item]) => {
            const count = rows.filter(row => key === 'open' ? !row.attempt : key === 'review' ? row.attempt?.needsReview : row.attempt).length
            return <button key={key} type="button" role="tab" aria-selected={metric === key} className={metric === key ? styles.statsTabActive : ''} onClick={() => onMetricChange(key)}><span>{item.icon}</span>{item.label}<b>{count}</b></button>
          })}
        </div>

        <div className={styles.statsBreakdown}>
          <section>
            <h3>Nach Jahr</h3>
            <div className={styles.yearBubbles}>{yearCounts.length ? yearCounts.map(item => <div key={item.year}><strong>{item.count}</strong><span>{item.year}</span></div>) : <p>Noch keine Einträge.</p>}</div>
          </section>
          <section>
            <h3>{metric === 'open' ? 'Level' : 'Aktive Tage'}</h3>
            {metric === 'open' ? <div className={styles.levelCard}><strong>Klassen {gradeGroup.replace('-', '/')}</strong><span>{metricRows.length} Aufgaben warten auf dich</span></div> : <div className={styles.dayChips}>{dayCounts.length ? dayCounts.map(item => <span key={item.day}><b>{item.count}</b>{item.day}</span>) : <p>Noch keine Aktivität.</p>}</div>}
          </section>
        </div>

        <section className={styles.statsQuestionList} aria-label={`${active.label} Aufgaben`}>
          <div className={styles.statsListHeading}><h3>Aufgaben im Detail</h3><span>{metricRows.length} Einträge</span></div>
          {metricRows.length ? metricRows.map(row => (
            <article key={row.question.id} className={styles.statsQuestionRow}>
              <span className={styles.statsQuestionBadge}>{row.question.part}{row.question.number}</span>
              <div><strong>{row.question.topic}</strong><small>{row.question.year} · Klassen {row.question.gradeGroup.replace('-', '/')} · {row.question.points} Punkte</small></div>
              <div className={styles.statsQuestionResult}>
                {row.attempt ? <span className={metric !== 'review' && row.latest?.correct ? styles.resultGood : styles.resultReview}>{metric !== 'review' && row.latest?.correct ? 'Richtig' : 'Wiederholen'}</span> : <span className={styles.resultOpen}>Offen</span>}
                <time dateTime={row.answeredAt || undefined}>{formatAttemptDay(row.answeredAt)}</time>
              </div>
            </article>
          )) : <div className={styles.statsEmpty}><span>★</span><strong>Hier ist gerade alles leer.</strong><p>Dein nächstes Ergebnis erscheint automatisch an dieser Stelle.</p></div>}
        </section>
      </section>
    </div>
  )
}

function DailyStreak({ progress }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000)
    return () => window.clearInterval(timer)
  }, [])
  const summary = streakSummary(progress, now)
  const goal = [3, 7, 14, 30, 60, 100].find(value => value > summary.current) || Math.ceil((summary.current + 1) / 100) * 100
  return (
    <section className={styles.streakPanel} aria-label="Tägliche Lernserie">
      <div className={styles.streakHeadline}>
        <span className={`${styles.streakFlame} ${summary.practicedToday ? styles.streakFlameActive : ''}`} aria-hidden="true">
          <svg viewBox="0 0 24 28" fill="none"><path d="M13 2c1 6-5 7-4 12 2-1 4-3 5-5 5 4 7 8 5 12-3 7-14 6-16 0C1 15 7 10 7 6c1 3 2 4 3 4 2-2 2-5 3-8Z" fill="currentColor"/><path d="M12 16c0 3-3 4-3 6 0 4 6 4 6 0 0-2-2-4-3-6Z" fill="#ffedba"/></svg>
        </span>
        <div><h2>{`${summary.current} ${summary.current === 1 ? 'Tag' : 'Tage'} in Folge`}</h2><p role="status">{summary.practicedToday ? 'Heute geschafft! Dein Känguru-Weg wächst weiter.' : 'Prüfe heute eine Antwort und halte deine Serie am Leben.'}</p></div>
      </div>
      <ol className={styles.streakWeek} aria-label="Deine letzten sieben Tage">
        {summary.week.map(({ day, active, today }) => (
          <li key={day} className={`${active ? styles.streakDayActive : ''} ${today ? styles.streakDayToday : ''}`} aria-label={`${day}: ${active ? 'geübt' : 'noch nicht geübt'}${today ? ' · heute' : ''}`}>
            <span>{new Intl.DateTimeFormat('de-DE', { weekday: 'short', timeZone: 'UTC' }).format(new Date(`${day}T12:00:00Z`))}</span>
            <b aria-hidden="true">{active ? '✓' : '·'}</b><small>{day.slice(-2)}</small>
          </li>
        ))}
      </ol>
      <div className={styles.streakMilestone}>
        <div><strong>Nächstes Ziel: {goal} Tage</strong><span>Rekord: {summary.best} · Lerntage: {summary.total}</span></div>
        <progress value={summary.current} max={goal} aria-label={`${summary.current} von ${goal} Tagen bis zum nächsten Ziel`} />
      </div>
    </section>
  )
}

function JourneyMap({ progressPercent }) {
  return (
    <div className={styles.map} aria-label={`Fortschritt: ${progressPercent} Prozent`}>
      <Image className={styles.mascot} src="/kanguru/kangaroo-explorer.png" alt="Känguru mit Rucksack und Karte" width={1024} height={1536} priority />
      <div className={`${styles.mapMarker} ${styles.markerStart}`}><b>Start</b><span /></div>
      <div className={`${styles.mapMarker} ${styles.markerMiddle}`}><b>Unterwegs</b><span /></div>
      <div className={`${styles.mapMarker} ${styles.markerFinish}`}><b>Geschafft</b><span /></div>
    </div>
  )
}

function ActionStation({ tone, icon, title, text, count, disabled, onClick }) {
  return (
    <button className={`${styles.station} ${styles[tone]}`} type="button" onClick={onClick} aria-disabled={disabled || undefined} aria-label={`${title}: ${count}`}>
      <span className={styles.stationIcon}>{icon}</span>
      <span className={styles.stationButton}><strong>{title}</strong><ArrowIcon /></span>
      <small>{text}</small>
      {disabled ? <span className={styles.stationNotice}>Aktuell keine Aufgaben zum Wiederholen.</span> : null}
    </button>
  )
}

function SetupDialog({ type, gradeGroup, attempts, onClose, onStart }) {
  const [count, setCount] = useState(5)
  const [difficulty, setDifficulty] = useState('all')
  const [year, setYear] = useState(KANGURU_PLANNED_YEARS[0])
  const [part, setPart] = useState('A')
  const gradeQuestions = useMemo(() => questionsForGradeGroup(gradeGroup), [gradeGroup])
  const newQuestions = useMemo(() => gradeQuestions.filter(question => (
    !attempts[question.id] && (difficulty === 'all' || question.part === difficulty)
  )), [attempts, difficulty, gradeQuestions])
  const reviewQuestions = useMemo(() => gradeQuestions.filter(question => attempts[question.id]?.needsReview), [attempts, gradeQuestions])
  const weaknesses = useMemo(() => buildWeaknesses(gradeQuestions, attempts), [attempts, gradeQuestions])
  const examQuestions = useMemo(() => questionsForExam({ gradeGroup, year, part }), [gradeGroup, part, year])

  const config = {
    new: {
      title: 'Neue Aufgaben',
      text: `Für die Klassen ${gradeGroup.replace('-', '/')} sind in dieser Auswahl ${newQuestions.length} noch nicht gelöste Aufgaben verfügbar.`,
      questions: shuffled(newQuestions).slice(0, count),
      label: difficulty === 'all' ? 'Neue Aufgaben' : `Neue Aufgaben · Teil ${difficulty}`,
    },
    year: {
      title: 'Jahresprüfung',
      text: 'Wähle Jahr und Aufgabenteil. Bereits gelöste Aufgaben dürfen hier erneut vorkommen.',
      questions: examQuestions,
      label: `${year} · Teil ${part}`,
    },
    review: {
      title: 'Fehler wiederholen',
      text: 'Eine richtig beantwortete Aufgabe verschwindet anschließend aus deiner Fehlerliste.',
      questions: shuffled(reviewQuestions),
      label: 'Fehler wiederholen',
    },
    weak: {
      title: 'Prüfung aus deinen Schwächen',
      text: weaknesses.length ? `Schwerpunkt: ${weaknesses.slice(0, 2).map(item => item.topic).join(' · ')}` : 'Sobald du Aufgaben bearbeitet hast, werden hier deine schwächeren Themen erkannt.',
      questions: weaknesses.length ? shuffled(gradeQuestions.filter(question => weaknesses.slice(0, 2).some(item => item.topic === question.topic))).slice(0, 10) : [],
      label: 'Schwächentraining',
    },
  }[type]

  return (
    <div className={styles.dialogBackdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="dialog-title" lang="de" dir="ltr">
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Schließen"><CloseIcon /></button>
        <h2 id="dialog-title">{config.title}</h2>
        <p>{config.text}</p>

        {type === 'new' ? (
          <>
            <div className={styles.dialogControl}>
              <span>Schwierigkeit</span>
              <div className={styles.choiceRow}>
                {[
                  ['all', 'Alle'], ['A', 'A · Leicht'], ['B', 'B · Mittel'], ['C', 'C · Schwer'],
                ].map(([value, label]) => <button type="button" className={difficulty === value ? styles.choiceActive : ''} onClick={() => setDifficulty(value)} key={value}>{label}</button>)}
              </div>
            </div>
            <div className={styles.dialogControl}>
              <span>Anzahl der Aufgaben</span>
              <div className={styles.choiceRow}>
                {[5, 10, 15].map(value => <button type="button" className={count === value ? styles.choiceActive : ''} onClick={() => setCount(value)} key={value}>{value}</button>)}
              </div>
            </div>
          </>
        ) : null}

        {type === 'year' ? (
          <>
            <div className={styles.dialogControl}>
              <span>Jahr</span>
              <div className={styles.choiceRow}>{KANGURU_PLANNED_YEARS.map(value => <button type="button" className={year === value ? styles.choiceActive : ''} onClick={() => setYear(value)} key={value}>{value}</button>)}</div>
            </div>
            <div className={styles.dialogControl}>
              <span>Aufgabenteil</span>
              <div className={styles.choiceRow}>{KANGURU_PARTS.map(value => <button type="button" className={part === value ? styles.choiceActive : ''} onClick={() => setPart(value)} key={value}>Teil {value}</button>)}</div>
            </div>
          </>
        ) : null}

        {config.questions.length ? (
          <div className={styles.dialogActions}>
            <button className={styles.dialogPrimary} type="button" onClick={() => onStart(type, config.label, config.questions, false)}>
              {config.questions.length} Aufgaben starten <ArrowIcon />
            </button>
            <button className={styles.dialogLehr} type="button" onClick={() => onStart(type, config.label, config.questions, true)}>
              <DrawIcon name="pen" /> Lehr-Mode
            </button>
          </div>
        ) : (
          <div className={styles.emptyNotice}>
            <strong>Noch keine passenden Aufgaben</strong>
            <span>Für diese Auswahl werden bald weitere Aufgaben ergänzt.</span>
          </div>
        )}
      </section>
    </div>
  )
}

function QuizView({ session, attempts, onRecord, onToggleReview, onExit }) {
  const questionsById = useMemo(() => new Map(KANGURU_QUESTIONS.map(question => [question.id, question])), [])
  const questions = useMemo(() => session.ids.map(id => questionsById.get(id)).filter(Boolean), [questionsById, session.ids])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [whiteboardOpen, setWhiteboardOpen] = useState(false)
  const [whiteboardPages, setWhiteboardPages] = useState([1])
  const [activeWhiteboardPage, setActiveWhiteboardPage] = useState(1)
  const question = questions[index]
  const teaching = Boolean(session.teaching)

  useEffect(() => {
    setWhiteboardPages([1])
    setActiveWhiteboardPage(1)
    window.scrollTo({ top: 0 })
  }, [index])

  const checkAnswer = useCallback(() => {
    if (!question || !selected || checked) return
    const isCorrect = selected === question.correct
    setChecked(true)
    setAnswers(previous => [...previous, { id: question.id, selected, correct: isCorrect }])
    if (!teaching) onRecord(question, selected, isCorrect, session.mode)
  }, [checked, onRecord, question, selected, session.mode, teaching])

  const next = useCallback(() => {
    if (index === questions.length - 1) {
      setFinished(true)
      return
    }
    setIndex(value => value + 1)
    setSelected('')
    setChecked(false)
  }, [index, questions.length])

  useEffect(() => {
    if (!question || finished) return undefined

    function handleKeyDown(event) {
      if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return
      const target = event.target
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]')) return

      const pressed = event.key.toUpperCase()
      const option = question.options.find((candidate, optionIndex) => (
        String(candidate.id).toUpperCase() === pressed || String(optionIndex + 1) === event.key
      ))
      if (option && !checked) {
        event.preventDefault()
        setSelected(option.id)
        return
      }

      if (event.key !== 'Enter' || (!checked && !selected)) return
      event.preventDefault()
      if (checked) next()
      else checkAnswer()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [checkAnswer, checked, finished, next, question, selected])

  if (!question) return null

  const correct = checked && selected === question.correct
  const marked = Boolean(attempts[question.id]?.needsReview)
  const score = answers.filter(answer => answer.correct).length
  const hasVisualOptions = question.options.some(option => option.image)

  const addWhiteboardPage = () => {
    const nextPage = Math.max(...whiteboardPages) + 1
    setWhiteboardPages(pages => [...pages, nextPage])
    setActiveWhiteboardPage(nextPage)
  }

  if (finished) return (
    <main className={styles.quizPage} lang="de" dir="ltr">
      <section className={styles.resultCard}>
        <span className={styles.resultRing}>{score}<small>/{questions.length}</small></span>
        <h1>{teaching ? 'Lehr-Mode beendet' : 'Dein Ergebnis'}</h1>
        <p>{teaching
          ? 'Alle Notizen und Whiteboards dieses Durchgangs wurden verworfen.'
          : score === questions.length
          ? 'Stark – alle Aufgaben sind richtig.'
          : questions.length - score === 1
            ? 'Eine Aufgabe kannst du später noch einmal wiederholen.'
            : `${questions.length - score} Aufgaben kannst du später noch einmal wiederholen.`}</p>
        <button type="button" onClick={onExit}>Zurück zum Känguru-Weg</button>
      </section>
    </main>
  )

  return (
    <main className={styles.quizPage} lang="de" dir="ltr">
      <header className={styles.quizHeader}>
        <button type="button" onClick={onExit}><ArrowIcon direction="left" /> Übersicht</button>
        <strong>{session.label}</strong>
        <span>{index + 1} / {questions.length}</span>
      </header>
      <div className={styles.quizProgress}><span style={{ width: `${((index + (checked ? 1 : 0)) / questions.length) * 100}%` }} /></div>
      <div className={`${styles.lehrBanner} ${teaching ? '' : styles.quizToolsBanner}`}>
        <div><strong>{teaching ? LEHR_LABELS.mode : 'Lösungsbereich'}</strong><span>{teaching ? LEHR_LABELS.hint : 'Schreibe direkt auf die Aufgabe oder nutze das Whiteboard. Zum Antworten „Bedienen“ wählen.'}</span></div>
        <span className={styles.keyboardHint}>Tastatur: A–E oder 1–5 · Enter: prüfen / weiter</span>
        <button type="button" className={whiteboardOpen ? styles.whiteboardToggleActive : ''} onClick={() => setWhiteboardOpen(value => !value)}><DrawIcon name="board" />{whiteboardOpen ? LEHR_LABELS.closeBoard : LEHR_LABELS.board}</button>
      </div>
      <AnnotationSurface title={teaching ? LEHR_LABELS.mode : 'Auf der Aufgabe lösen'} resetKey={question.id}>
        <article className={styles.questionCard}>
        <header className={styles.questionHeading}>
          <strong>Aufgabe {question.part}{question.number}</strong>
          <div className={styles.questionMeta}>
            <span>Klassen {question.gradeGroup.replace('-', '/')}</span>
            <span>{question.points} Punkte</span>
            <span>{question.topic}</span>
          </div>
        </header>

        <div className={`${styles.questionWorkspace} ${hasVisualOptions ? styles.workspaceVisual : ''} ${!question.image ? styles.workspaceTextOnly : ''}`}>
          <section className={styles.taskPanel} aria-labelledby="question-title">
            <h1 id="question-title" className={question.question.length > 220 ? styles.longQuestion : undefined}>{question.question}</h1>
            {question.image ? (
              <figure className={styles.questionFigure}>
                <Image className={styles.questionImage} src={question.image} alt={question.imageAlt || ''} width={900} height={520} sizes="(max-width: 760px) 92vw, 48vw" draggable={false} unoptimized />
              </figure>
            ) : null}
          </section>

          <section className={`${styles.answersPanel} ${checked && !correct ? styles.answersLocked : ''}`} aria-labelledby="answers-title">
            <h2 id="answers-title">Antwortmöglichkeiten</h2>
            <div className={`${styles.options} ${hasVisualOptions ? styles.visualOptions : ''}`} role="radiogroup" aria-label="Antwort auswählen">
              {question.options.map((option, optionIndex) => {
                const isSelected = selected === option.id
                const stateClass = checked
                  ? option.id === question.correct ? styles.optionCorrect : isSelected ? styles.optionWrong : ''
                  : isSelected ? styles.optionSelected : ''
                return (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Antwort ${option.id}: ${option.text}`}
                    aria-keyshortcuts={`${option.id} ${optionIndex + 1}`}
                    disabled={checked}
                    className={stateClass}
                    onClick={() => setSelected(option.id)}
                    key={option.id}
                  >
                    <b>{option.id}</b>
                    {option.image ? (
                      <Image className={styles.optionImage} src={option.image} alt={option.text} width={420} height={180} sizes="(max-width: 760px) 72vw, 34vw" draggable={false} unoptimized />
                    ) : <span>{option.text}</span>}
                  </button>
                )
              })}
            </div>

            {!checked ? (
              <button className={styles.checkButton} type="button" disabled={!selected} onClick={checkAnswer} aria-keyshortcuts="Enter">Antwort prüfen</button>
            ) : null}
          </section>
        </div>

        {checked ? (
          <section className={`${styles.solution} ${correct ? styles.solutionCorrect : styles.solutionWrong}`}>
            <div className={styles.solutionStatus}>
              <header><span>{correct ? <CheckIcon /> : <CloseIcon />}</span><div><strong>{correct ? 'Richtig gelöst' : 'Noch nicht richtig'}</strong><small>{correct ? `Antwort ${question.correct} ist richtig.` : `Deine Antwort: ${selected} · Richtige Antwort: ${question.correct}`}</small></div></header>
              {correct && !teaching ? (
                <button className={`${styles.reviewToggle} ${marked ? styles.reviewMarked : ''}`} type="button" onClick={() => onToggleReview(question.id, !marked)}>
                  <RepeatIcon /> {marked ? 'Aus Fehlerliste entfernen' : 'Trotzdem zum Wiederholen merken'}
                </button>
              ) : !correct && !teaching ? <p className={styles.savedForReview}>Antwort gesperrt · sicher unter „Zu wiederholen“ gespeichert.</p> : null}
            </div>
            <div className={styles.solutionSteps}>
              <h2>So geht&apos;s</h2>
              {Array.isArray(question.solutionSteps) ? <ol>{question.solutionSteps.map((step, stepIndex) => <li key={stepIndex}>{step}</li>)}</ol> : <p>{question.solution}</p>}
              <button className={styles.nextButton} type="button" onClick={next} aria-keyshortcuts="Enter">{index === questions.length - 1 ? 'Ergebnis anzeigen' : 'Nächste Aufgabe'} <ArrowIcon /></button>
            </div>
          </section>
        ) : null}
        </article>
      </AnnotationSurface>
      {whiteboardOpen ? (
        <section className={styles.whiteboardWrap}>
          <div className={styles.whiteboardTabs}>
            {whiteboardPages.map(page => <button key={page} type="button" className={activeWhiteboardPage === page ? styles.whiteboardTabActive : ''} onClick={() => setActiveWhiteboardPage(page)}>{LEHR_LABELS.page} {page}</button>)}
            <button type="button" className={styles.addWhiteboardPage} onClick={addWhiteboardPage}>＋ {LEHR_LABELS.addPage}</button>
          </div>
          {whiteboardPages.map(page => (
            <div key={`${question.id}-${page}`} className={activeWhiteboardPage === page ? styles.whiteboardPageActive : styles.whiteboardPageHidden}>
              <AnnotationSurface title={`${LEHR_LABELS.board} · ${LEHR_LABELS.page} ${page}`} blank resetKey={`${question.id}-${page}`} />
            </div>
          ))}
          <p className={styles.whiteboardHint}>{LEHR_LABELS.resetHint}</p>
        </section>
      ) : null}
    </main>
  )
}

export default function KanguruPage() {
  const [progress, setProgress] = useState(EMPTY_PROGRESS)
  const [ready, setReady] = useState(false)
  const [syncState, setSyncState] = useState('loading')
  const [dialog, setDialog] = useState(null)
  const [statsMetric, setStatsMetric] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    let active = true
    const local = readLocalProgress()
    setProgress(local)
    fetch('/api/mobin/kaenguru')
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(payload => {
        if (active) setProgress(current => mergeProgress(current, payload.state))
      })
      .catch(() => { if (active) setSyncState('local') })
      .finally(() => active && setReady(true))
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch { setSyncState('local') }
    const timer = window.setTimeout(() => {
      setSyncState('saving')
      fetch('/api/mobin/kaenguru', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ state: progress }),
      }).then(response => {
        if (!response.ok) throw new Error('Progress not synced')
        setSyncState('synced')
      }).catch(() => setSyncState('local'))
    }, 450)
    return () => window.clearTimeout(timer)
  }, [progress, ready])

  const gradeGroup = progress.gradeGroup
  const gradeQuestions = useMemo(() => questionsForGradeGroup(gradeGroup), [gradeGroup])
  const attemptedCount = gradeQuestions.filter(question => progress.attempts[question.id]).length
  const openCount = Math.max(0, gradeQuestions.length - attemptedCount)
  const reviewCount = gradeQuestions.filter(question => progress.attempts[question.id]?.needsReview).length
  const progressPercent = percent(attemptedCount, gradeQuestions.length)
  const weaknesses = useMemo(() => buildWeaknesses(gradeQuestions, progress.attempts), [gradeQuestions, progress.attempts])

  const chooseGradeGroup = nextGradeGroup => setProgress(current => ({ ...current, gradeGroup: nextGradeGroup, updatedAt: new Date().toISOString() }))
  const startSession = (mode, label, questions, teaching = false) => {
    setSession({ mode, label, teaching, ids: questions.map(question => question.id) })
    setDialog(null)
  }
  const recordAttempt = (question, selected, correct, mode) => {
    setProgress(current => {
      const previous = current.attempts[question.id] || { history: [], needsReview: false }
      const answeredAt = new Date().toISOString()
      const needsReview = correct ? (mode === 'review' ? false : Boolean(previous.needsReview)) : true
      return {
        ...current,
        practiceDays: [...new Set([...current.practiceDays, berlinDay(answeredAt)])].sort(),
        attempts: {
          ...current.attempts,
          [question.id]: {
            ...previous,
            topic: question.topic,
            needsReview,
            lastAnsweredAt: answeredAt,
            updatedAt: answeredAt,
            history: [...(previous.history || []), { selected, correct, mode, at: answeredAt }].slice(-30),
          },
        },
        updatedAt: new Date().toISOString(),
      }
    })
  }
  const toggleReview = (questionId, needsReview) => setProgress(current => ({
    ...current,
    attempts: { ...current.attempts, [questionId]: { ...(current.attempts[questionId] || { history: [] }), needsReview, updatedAt: new Date().toISOString() } },
    updatedAt: new Date().toISOString(),
  }))

  if (session) return <QuizView session={session} attempts={progress.attempts} onRecord={recordAttempt} onToggleReview={toggleReview} onExit={() => setSession(null)} />

  return (
    <main className={styles.page} lang="de" dir="ltr">
      <header className={styles.header}>
        <div className={styles.brandLockup}><Image className={styles.brandIcon} src="/kanguru/kanguru-app-icon.png" alt="" width={42} height={42} priority /><strong>Känguru</strong></div>
        <Link href="/mobin"><ArrowIcon direction="left" /> Zurück zu Mobin</Link>
      </header>

      <section className={styles.journeyStage}>
        <Image className={styles.journeyBackdrop} src="/kanguru/journey-landscape-v2.png" alt="" fill sizes="100vw" priority />
        <div className={styles.hero}>
          <div className={styles.titleBlock}>
            <h1>Dein Känguru-Weg</h1>
            <p>Jede Aufgabe bringt dich ein Stück weiter.</p>
          </div>
          <div className={styles.gradeSwitch} aria-label="Klassenstufe wählen">
            {KANGURU_GRADE_GROUPS.map(value => <button key={value} type="button" aria-pressed={gradeGroup === value} onClick={() => chooseGradeGroup(value)}>Klassen {value.replace('-', '/')}</button>)}
          </div>
        </div>

        <JourneyMap progressPercent={progressPercent} />

        <section className={styles.stations} aria-label="Übungsarten">
          <ActionStation tone="coral" icon={<PencilIcon />} title="Neue Aufgaben" text="Nur Aufgaben, die du noch nicht gelöst hast" count={openCount} onClick={() => setDialog('new')} />
          <ActionStation tone="blue" icon={<PaperIcon />} title="Jahresprüfung" text="Wähle ein Jahr und einen Aufgabenteil" count={gradeQuestions.length} onClick={() => setDialog('year')} />
          <ActionStation tone="muted" icon={reviewCount ? <RepeatIcon /> : <LockIcon />} title="Fehler wiederholen" text="Teste dich mit deinen gemerkten Fehlern" count={reviewCount} disabled={!reviewCount} onClick={() => setDialog('review')} />
        </section>
      </section>

      <DailyStreak progress={progress} />
      <p className={styles.syncStatus} role="status">{syncState === 'synced' ? 'Fortschritt und Lernserie gespeichert' : syncState === 'local' ? 'Auf diesem Gerät gespeichert · Cloud-Synchronisierung momentan nicht verfügbar' : syncState === 'saving' ? 'Fortschritt wird gespeichert …' : 'Fortschritt wird geladen …'}</p>
      <section className={styles.progressPanel}>
        <div className={styles.progressMain}>
          <div className={styles.progressHeading}><h2>Dein Fortschritt</h2><strong>{progressPercent} %</strong></div>
          <div className={styles.progressTrack}><span style={{ width: `${progressPercent}%` }} /></div>
          <p>{gradeQuestions.length ? `Klassen ${gradeGroup.replace('-', '/')}: ${attemptedCount} von ${gradeQuestions.length} Aufgaben bearbeitet.` : `Für die Klassen ${gradeGroup.replace('-', '/')} werden bald Aufgaben ergänzt.`}</p>
        </div>
        <div className={styles.stats} aria-label="Detaillierte Statistik öffnen">
          <button className={styles.statSolved} type="button" onClick={() => setStatsMetric('solved')}><span>Gelöst</span><strong>{attemptedCount}</strong><small>Details ansehen →</small></button>
          <button className={styles.statOpen} type="button" onClick={() => setStatsMetric('open')}><span>Offen</span><strong>{openCount}</strong><small>Details ansehen →</small></button>
          <button className={styles.statReview} type="button" onClick={() => setStatsMetric('review')}><span>Zu wiederholen</span><strong>{reviewCount}</strong><small>Details ansehen →</small></button>
        </div>
        <button className={styles.weaknessButton} type="button" onClick={() => setDialog('weak')} aria-disabled={!weaknesses.length || undefined}>
          <TargetIcon /><span><strong>Prüfung aus deinen Schwächen</strong><small>{weaknesses.length ? weaknesses[0].topic : 'Wird nach deinen ersten Antworten verfügbar'}</small></span><ArrowIcon />
        </button>
      </section>

      {dialog ? <SetupDialog type={dialog} gradeGroup={gradeGroup} attempts={progress.attempts} onClose={() => setDialog(null)} onStart={startSession} /> : null}
      {statsMetric ? <StatsDialog metric={statsMetric} onMetricChange={setStatsMetric} questions={gradeQuestions} attempts={progress.attempts} gradeGroup={gradeGroup} onClose={() => setStatsMetric(null)} /> : null}
    </main>
  )
}
