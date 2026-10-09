'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  KANGURU_PARTS,
  KANGURU_PLANNED_YEARS,
  KANGURU_QUESTIONS,
  questionsForExam,
  questionsForGrade,
} from '@/data/kanguruQuestions'
import styles from './page.module.css'

const STORAGE_KEY = 'andarun_kaenguru_progress_v1'
const EMPTY_PROGRESS = { version: 1, grade: 5, attempts: {}, updatedAt: null }

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

function normalizeProgress(value) {
  const state = value && typeof value === 'object' ? value : {}
  return {
    version: 1,
    grade: Number(state.grade) === 6 ? 6 : 5,
    attempts: state.attempts && typeof state.attempts === 'object' ? state.attempts : {},
    updatedAt: typeof state.updatedAt === 'string' ? state.updatedAt : null,
  }
}

function mergeProgress(localState, remoteState) {
  const local = normalizeProgress(localState)
  const remote = normalizeProgress(remoteState)
  const attempts = { ...remote.attempts }
  for (const [id, attempt] of Object.entries(local.attempts)) {
    const remoteAttempt = attempts[id]
    if (!remoteAttempt || String(attempt?.lastAnsweredAt || '') > String(remoteAttempt?.lastAnsweredAt || '')) {
      attempts[id] = attempt
    }
  }
  const localIsNewer = String(local.updatedAt || '') > String(remote.updatedAt || '')
  return { version: 1, grade: localIsNewer ? local.grade : remote.grade, attempts, updatedAt: localIsNewer ? local.updatedAt : remote.updatedAt }
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

function JourneyMap({ progressPercent }) {
  return (
    <div className={styles.map} aria-label={`Fortschritt: ${progressPercent} Prozent`}>
      <div className={styles.sun} />
      <div className={`${styles.cloud} ${styles.cloudOne}`} />
      <div className={`${styles.cloud} ${styles.cloudTwo}`} />
      <svg className={styles.landscape} viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.backMountain} d="M0 176 120 88l85 72 120-94 122 111 100-77 105 78 96-92 92 92 98-113 182 142v153H0Z" />
        <path className={styles.frontMountain} d="M0 226 122 154l99 64 122-57 119 76 123-83 128 83 118-73 102 65 129-98 158 112v117H0Z" />
        <path className={styles.hill} d="M0 278c130-82 240-31 339-2 120 36 199-47 328-20 145 31 217-40 329-1 69 24 131 33 204-4v109H0Z" />
        <path className={styles.routeBase} d="M112 286c131-4 135-86 269-42s186 35 281-20c106-62 162 42 276-10 62-28 98-89 154-113" />
        <path className={styles.routeDash} d="M112 286c131-4 135-86 269-42s186 35 281-20c106-62 162 42 276-10 62-28 98-89 154-113" />
        <path className={styles.routeDone} pathLength="100" strokeDasharray={`${progressPercent} 100`} d="M112 286c131-4 135-86 269-42s186 35 281-20c106-62 162 42 276-10 62-28 98-89 154-113" />
      </svg>
      <Image className={styles.mascot} src="/kanguru/kangaroo-explorer.png" alt="Känguru mit Rucksack und Karte" width={1024} height={1536} priority />
      <div className={`${styles.mapMarker} ${styles.markerStart}`}><b>Start</b><span /></div>
      <div className={`${styles.mapMarker} ${styles.markerMiddle}`}><b>Unterwegs</b><span /></div>
      <div className={`${styles.mapMarker} ${styles.markerFinish}`}><b>Geschafft</b><span /></div>
    </div>
  )
}

function ActionStation({ tone, icon, title, text, count, disabled, onClick }) {
  return (
    <button className={`${styles.station} ${styles[tone]}`} type="button" onClick={onClick} aria-disabled={disabled || undefined}>
      <span className={styles.stationIcon}>{icon}</span>
      <span className={styles.stationCopy}>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <span className={styles.stationMeta}>{count}</span>
      <ArrowIcon />
    </button>
  )
}

function SetupDialog({ type, grade, attempts, onClose, onStart }) {
  const [count, setCount] = useState(5)
  const [year, setYear] = useState(KANGURU_PLANNED_YEARS[0])
  const [part, setPart] = useState('A')
  const gradeQuestions = useMemo(() => questionsForGrade(grade), [grade])
  const newQuestions = useMemo(() => gradeQuestions.filter(question => !attempts[question.id]), [attempts, gradeQuestions])
  const reviewQuestions = useMemo(() => gradeQuestions.filter(question => attempts[question.id]?.needsReview), [attempts, gradeQuestions])
  const weaknesses = useMemo(() => buildWeaknesses(gradeQuestions, attempts), [attempts, gradeQuestions])
  const examQuestions = useMemo(() => questionsForExam({ grade, year, part }), [grade, part, year])

  const config = {
    new: {
      title: 'Neue Aufgaben',
      text: `Für Klasse ${grade} sind ${newQuestions.length} noch nicht gelöste Aufgaben verfügbar.`,
      questions: shuffled(newQuestions).slice(0, count),
      label: 'Neue Aufgaben',
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
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Schließen"><CloseIcon /></button>
        <h2 id="dialog-title">{config.title}</h2>
        <p>{config.text}</p>

        {type === 'new' ? (
          <div className={styles.dialogControl}>
            <span>Anzahl der Aufgaben</span>
            <div className={styles.choiceRow}>
              {[5, 10, 15].map(value => <button type="button" className={count === value ? styles.choiceActive : ''} onClick={() => setCount(value)} key={value}>{value}</button>)}
            </div>
          </div>
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
          <button className={styles.dialogPrimary} type="button" onClick={() => onStart(type, config.label, config.questions)}>
            {config.questions.length} Aufgaben starten <ArrowIcon />
          </button>
        ) : (
          <div className={styles.emptyNotice}>
            <strong>Noch keine passenden Aufgaben</strong>
            <span>Mit dem ersten Aufgabensatz von 2026 beginnt dein Weg hier.</span>
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
  const question = questions[index]

  if (!question) return null

  const correct = checked && selected === question.correct
  const marked = Boolean(attempts[question.id]?.needsReview)
  const score = answers.filter(answer => answer.correct).length

  const checkAnswer = () => {
    if (!selected || checked) return
    const isCorrect = selected === question.correct
    setChecked(true)
    setAnswers(previous => [...previous, { id: question.id, selected, correct: isCorrect }])
    onRecord(question, selected, isCorrect, session.mode)
  }

  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true)
      return
    }
    setIndex(value => value + 1)
    setSelected('')
    setChecked(false)
  }

  if (finished) return (
    <main className={styles.quizPage}>
      <section className={styles.resultCard}>
        <span className={styles.resultRing}>{score}<small>/{questions.length}</small></span>
        <h1>Dein Ergebnis</h1>
        <p>{score === questions.length
          ? 'Stark – alle Aufgaben sind richtig.'
          : questions.length - score === 1
            ? 'Eine Aufgabe kannst du später noch einmal wiederholen.'
            : `${questions.length - score} Aufgaben kannst du später noch einmal wiederholen.`}</p>
        <button type="button" onClick={onExit}>Zurück zum Känguru-Weg</button>
      </section>
    </main>
  )

  return (
    <main className={styles.quizPage}>
      <header className={styles.quizHeader}>
        <button type="button" onClick={onExit}><ArrowIcon direction="left" /> Übersicht</button>
        <strong>{session.label}</strong>
        <span>{index + 1} / {questions.length}</span>
      </header>
      <div className={styles.quizProgress}><span style={{ width: `${((index + (checked ? 1 : 0)) / questions.length) * 100}%` }} /></div>
      <article className={styles.questionCard}>
        <div className={styles.questionMeta}><span>Klasse {question.grade}</span><span>{question.year} · Teil {question.part}</span><span>{question.topic}</span></div>
        <h1>{question.question}</h1>
        {question.image ? <Image className={styles.questionImage} src={question.image} alt={question.imageAlt || ''} width={900} height={520} /> : null}
        <div className={styles.options}>
          {question.options.map(option => {
            const isSelected = selected === option.id
            const stateClass = checked
              ? option.id === question.correct ? styles.optionCorrect : isSelected ? styles.optionWrong : ''
              : isSelected ? styles.optionSelected : ''
            return <button type="button" disabled={checked} className={stateClass} onClick={() => setSelected(option.id)} key={option.id}><b>{option.id}</b><span>{option.text}</span></button>
          })}
        </div>

        {!checked ? (
          <button className={styles.checkButton} type="button" disabled={!selected} onClick={checkAnswer}>Antwort prüfen</button>
        ) : (
          <section className={`${styles.solution} ${correct ? styles.solutionCorrect : styles.solutionWrong}`}>
            <header><span>{correct ? <CheckIcon /> : <CloseIcon />}</span><div><strong>{correct ? 'Richtig gelöst' : 'Noch nicht richtig'}</strong><small>Die richtige Antwort ist {question.correct}.</small></div></header>
            <h2>Lösungsweg</h2>
            {Array.isArray(question.solutionSteps) ? <ol>{question.solutionSteps.map((step, stepIndex) => <li key={stepIndex}>{step}</li>)}</ol> : <p>{question.solution}</p>}
            {correct ? (
              <button className={`${styles.reviewToggle} ${marked ? styles.reviewMarked : ''}`} type="button" onClick={() => onToggleReview(question.id, !marked)}>
                <RepeatIcon /> {marked ? 'Aus Fehlerliste entfernen' : 'Trotzdem zum Wiederholen merken'}
              </button>
            ) : <p className={styles.savedForReview}>Diese Aufgabe wurde zum Wiederholen gespeichert.</p>}
            <button className={styles.nextButton} type="button" onClick={next}>{index === questions.length - 1 ? 'Ergebnis anzeigen' : 'Nächste Aufgabe'} <ArrowIcon /></button>
          </section>
        )}
      </article>
    </main>
  )
}

export default function KanguruPage() {
  const [progress, setProgress] = useState(EMPTY_PROGRESS)
  const [ready, setReady] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    let active = true
    const local = readLocalProgress()
    setProgress(local)
    fetch('/api/andarun/kaenguru')
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(payload => {
        if (active) setProgress(mergeProgress(local, payload.state))
      })
      .catch(() => {})
      .finally(() => active && setReady(true))
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!ready) return undefined
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    const timer = window.setTimeout(() => {
      fetch('/api/andarun/kaenguru', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ state: progress }),
      }).catch(() => {})
    }, 450)
    return () => window.clearTimeout(timer)
  }, [progress, ready])

  const grade = progress.grade
  const gradeQuestions = useMemo(() => questionsForGrade(grade), [grade])
  const attemptedCount = gradeQuestions.filter(question => progress.attempts[question.id]).length
  const openCount = Math.max(0, gradeQuestions.length - attemptedCount)
  const reviewCount = gradeQuestions.filter(question => progress.attempts[question.id]?.needsReview).length
  const progressPercent = percent(attemptedCount, gradeQuestions.length)
  const weaknesses = useMemo(() => buildWeaknesses(gradeQuestions, progress.attempts), [gradeQuestions, progress.attempts])

  const chooseGrade = nextGrade => setProgress(current => ({ ...current, grade: nextGrade, updatedAt: new Date().toISOString() }))
  const startSession = (mode, label, questions) => {
    setSession({ mode, label, ids: questions.map(question => question.id) })
    setDialog(null)
  }
  const recordAttempt = (question, selected, correct, mode) => {
    setProgress(current => {
      const previous = current.attempts[question.id] || { history: [], needsReview: false }
      const needsReview = correct && mode === 'review' ? false : correct ? previous.needsReview : true
      return {
        ...current,
        attempts: {
          ...current.attempts,
          [question.id]: {
            ...previous,
            topic: question.topic,
            needsReview,
            lastAnsweredAt: new Date().toISOString(),
            history: [...(previous.history || []), { selected, correct, mode, at: new Date().toISOString() }].slice(-30),
          },
        },
        updatedAt: new Date().toISOString(),
      }
    })
  }
  const toggleReview = (questionId, needsReview) => setProgress(current => ({
    ...current,
    attempts: { ...current.attempts, [questionId]: { ...(current.attempts[questionId] || { history: [] }), needsReview } },
    updatedAt: new Date().toISOString(),
  }))

  if (session) return <QuizView session={session} attempts={progress.attempts} onRecord={recordAttempt} onToggleReview={toggleReview} onExit={() => setSession(null)} />

  return (
    <main className={styles.page} lang="de">
      <header className={styles.header}>
        <strong>Känguru</strong>
        <Link href="/andarun"><ArrowIcon direction="left" /> Zurück zu Andarun</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.titleBlock}>
          <h1>Dein Känguru-Weg</h1>
          <p>Jede Aufgabe bringt dich ein Stück weiter.</p>
        </div>
        <div className={styles.gradeSwitch} aria-label="Klasse wählen">
          {[5, 6].map(value => <button key={value} type="button" aria-pressed={grade === value} onClick={() => chooseGrade(value)}>Klasse {value}</button>)}
        </div>
      </section>

      <JourneyMap progressPercent={progressPercent} />

      <section className={styles.stations} aria-label="Übungsarten">
        <ActionStation tone="coral" icon={<PencilIcon />} title="Neue Aufgaben" text="Nur Aufgaben, die du noch nicht gelöst hast" count={openCount} onClick={() => setDialog('new')} />
        <ActionStation tone="blue" icon={<PaperIcon />} title="Jahresprüfung" text="Wähle ein Jahr und einen Aufgabenteil" count={gradeQuestions.length} onClick={() => setDialog('year')} />
        <ActionStation tone="mint" icon={<RepeatIcon />} title="Fehler wiederholen" text="Teste dich mit deinen gemerkten Fehlern" count={reviewCount} disabled={!reviewCount} onClick={() => setDialog('review')} />
      </section>

      <section className={styles.progressPanel}>
        <div className={styles.progressMain}>
          <div className={styles.progressHeading}><h2>Dein Fortschritt</h2><strong>{progressPercent} %</strong></div>
          <div className={styles.progressTrack}><span style={{ width: `${progressPercent}%` }} /></div>
          <p>{gradeQuestions.length ? `Klasse ${grade}: ${attemptedCount} von ${gradeQuestions.length} Aufgaben bearbeitet.` : 'Mit dem ersten Aufgabensatz von 2026 beginnt dein Weg hier.'}</p>
        </div>
        <dl className={styles.stats}>
          <div><dt>Gelöst</dt><dd>{attemptedCount}</dd></div>
          <div><dt>Offen</dt><dd>{openCount}</dd></div>
          <div><dt>Zu wiederholen</dt><dd>{reviewCount}</dd></div>
        </dl>
        <button className={styles.weaknessButton} type="button" onClick={() => setDialog('weak')} aria-disabled={!weaknesses.length || undefined}>
          <TargetIcon /><span><strong>Prüfung aus deinen Schwächen</strong><small>{weaknesses.length ? weaknesses[0].topic : 'Wird nach deinen ersten Antworten verfügbar'}</small></span><ArrowIcon />
        </button>
      </section>

      {dialog ? <SetupDialog type={dialog} grade={grade} attempts={progress.attempts} onClose={() => setDialog(null)} onStart={startSession} /> : null}
    </main>
  )
}
