'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MATH_CHAPTERS, MATH_EXAM_COLLECTIONS, MATH_QUESTIONS, MATH_QUESTION_MAP, MATH_TOPICS, MATH_TOPIC_MAP } from '@/data/mobinMathExam'
import { createMathSession, finishMathSession, gradeMathResponse, MATH_SESSION_KEY, recordMathResponse, sessionStudySeconds, summarizeMathProgress } from '@/lib/mobinMath'
import MathQuestion, { ArrowIcon } from './MathQuestion'
import MathResults, { MODE_NAMES, duration } from './MathResults'
import { useMathProgress } from './useMathProgress'
import { useStudyClock } from './useStudyClock'
import journey from './journey.module.css'
import styles from './page.module.css'

const MODES = [
  { id: 'practice', text: 'Eine Aufgabe nach der anderen. Mit Tipps und verständlichen Lösungswegen.', tone: 'coral', path: 'm7 25 2-7L22 5l5 5-13 13-7 2ZM19 8l5 5M9 18l5 5' },
  { id: 'exam', text: 'Ohne Tipps testen. Auswertung und Lösungen gibt es erst am Ende.', tone: 'blue', path: 'M8 4h11l6 6v18H8ZM19 4v7h6M12 16h9M12 21h9' },
  { id: 'review', text: 'Falsche und gemerkte Aufgaben gezielt noch einmal lösen.', tone: 'review', path: 'M25 11A10 10 0 0 0 8 9l-2 3M6 6v6h6M7 21a10 10 0 0 0 17 2l2-3M26 26v-6h-6' },
]
const dateLabel = value => new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))

export default function MathExamClient() {
  const { progress, setProgress, ready, status, localAvailable, retrySync } = useMathProgress()
  const [active, setActive] = useState(null)
  const [collection, setCollection] = useState('new')
  const [scope, setScope] = useState('all'), [level, setLevel] = useState('all'), [count, setCount] = useState('5')
  const restored = useRef(false)
  const summary = useMemo(() => summarizeMathProgress(progress), [progress])
  const session = active && progress.sessions[active.id]
  const flushClock = useStudyClock(session && !session.finishedAt ? session.id : null, setProgress)

  useEffect(() => {
    if (!ready || restored.current) return
    restored.current = true
    try {
      const saved = JSON.parse(localStorage.getItem(MATH_SESSION_KEY) || 'null')
      if (saved && typeof saved.id === 'string' && Number.isInteger(saved.index) && saved.index >= 0 && saved.index < MATH_QUESTIONS.length) setActive(saved)
    } catch {}
  }, [ready])
  useEffect(() => {
    if (!ready || !restored.current) return
    try {
      if (active) localStorage.setItem(MATH_SESSION_KEY, JSON.stringify(active))
      else localStorage.removeItem(MATH_SESSION_KEY)
    } catch {}
  }, [active, ready])

  const filtered = useMemo(() => {
    const ids = new Set(MATH_EXAM_COLLECTIONS.find(item => item.id === collection).questionIds)
    return MATH_QUESTIONS.filter(question => {
      const topic = MATH_TOPIC_MAP.get(question.topicId)
      return ids.has(question.id) && (scope === 'all' || scope === question.topicId || scope === topic.chapter) && (level === 'all' || level === question.difficulty)
    })
  }, [collection, scope, level])
  const reviewIds = filtered.filter(question => summary.reviewIds.includes(question.id)).map(question => question.id)
  const practiceIds = [...filtered].sort((a, b) => Number(Boolean(summary.latest[a.id])) - Number(Boolean(summary.latest[b.id]))).slice(0, count === 'all' ? filtered.length : Number(count)).map(q => q.id)
  const unfinished = summary.sessions.find(item => !item.finishedAt)

  const start = useCallback((mode, ids) => {
    if (!ready || !ids.length) return
    const next = createMathSession(`math-${crypto.randomUUID()}`, mode, ids)
    setProgress(current => ({ ...current, sessions: { ...current.sessions, [next.id]: next } }))
    setActive({ id: next.id, index: 0 }); window.scrollTo({ top: 0 })
  }, [ready, setProgress])

  const resume = item => {
    const index = item.questionIds.findIndex(id => !item.responses[id])
    setActive({ id: item.id, index: index < 0 ? item.questionIds.length - 1 : index })
  }
  const syncNotice = <div className={`${styles.syncStatus} ${status === 'local' || !localAvailable ? styles.syncWarning : ''}`} role="status">
    {status === 'loading' ? 'Lernstand wird geladen …' : status === 'saving' ? 'Wird online gespeichert …' : status === 'local' ? localAvailable ? 'Auf diesem Gerät gespeichert. Online-Speicher gerade nicht erreichbar.' : 'Speichern gerade nicht möglich. Lass diese Seite geöffnet.' : localAvailable ? 'Auf diesem Gerät und online gespeichert.' : 'Online gespeichert. Gerätespeicher nicht verfügbar.'}
    {status === 'local' ? <button type="button" onClick={retrySync}>Erneut synchronisieren</button> : null}
  </div>

  function nextQuestion() {
    flushClock()
    if (active.index >= session.questionIds.length - 1) setProgress(current => finishMathSession(current, session.id))
    else setActive(current => ({ ...current, index: current.index + 1 }))
  }
  function submitAnswer(value, hintUsed) {
    flushClock()
    const qid = session.questionIds[active.index], now = new Date().toISOString()
    setProgress(current => {
      let next = recordMathResponse(current, session.id, qid, value, hintUsed, now)
      if (session.mode === 'review' && gradeMathResponse(MATH_QUESTION_MAP.get(qid), value).correct) next = { ...next, bookmarks: { ...next.bookmarks, [qid]: { active: false, at: now } } }
      if (session.mode === 'exam' && active.index === session.questionIds.length - 1) next = finishMathSession(next, session.id, now)
      return next
    })
    if (session.mode === 'exam' && active.index < session.questionIds.length - 1) setActive(current => ({ ...current, index: current.index + 1 }))
  }

  if (session?.finishedAt) return <><MathResults session={session} onExit={() => setActive(null)} onReview={ids => start('review', ids)} /><div className={styles.bottomSync}>{syncNotice}</div></>
  if (session) {
    const index = Math.min(active.index, session.questionIds.length - 1), question = MATH_QUESTION_MAP.get(session.questionIds[index])
    const answered = Object.keys(session.responses).length
    return <main className={journey.quizPage} lang="de" dir="ltr">
      <header className={journey.quizHeader}><button type="button" onClick={() => setActive(null)}><ArrowIcon back /> Pause & Übersicht</button><strong>{MODE_NAMES[session.mode]}</strong><span>{index + 1} / {session.questionIds.length}</span></header>
      <div className={journey.quizProgress} aria-label={`${answered} von ${session.questionIds.length} Antworten gespeichert`}><span style={{ width: `${answered / session.questionIds.length * 100}%` }} /></div>
      <div className={styles.quizStatus}><span>Lernzeit: {duration(sessionStudySeconds(session))}</span><span>Zählt bei aktivem Fenster; pausiert nach 2 Minuten ohne Aktivität.</span></div>
      <MathQuestion key={question.id} question={question} response={session.responses[question.id]} mode={session.mode} number={index + 1} total={session.questionIds.length} marked={Boolean(progress.bookmarks[question.id]?.active)} onSubmit={submitAnswer} onNext={nextQuestion} onBookmark={() => setProgress(current => ({ ...current, bookmarks: { ...current.bookmarks, [question.id]: { active: !current.bookmarks[question.id]?.active, at: new Date().toISOString() } } }))} />
      {syncNotice}
    </main>
  }

  return <main className={journey.page} lang="de" dir="ltr">
    <header className={`${journey.header} ${styles.header}`}><div className={journey.brandLockup}><span className={styles.brandMark} aria-hidden="true">M<span>+</span></span><strong>Mobins Matheprüfung</strong></div><Link href="/mobin"><ArrowIcon back /> Zurück zu Mobin</Link></header>
    <section className={journey.journeyStage} aria-labelledby="math-title">
      <Image className={journey.journeyBackdrop} src="/mobin/mathepruefung/journey-landscape-v2.png" alt="" fill sizes="100vw" priority />
      <div className={`${journey.hero} ${styles.hero}`}><div className={journey.titleBlock}><span className={styles.eyebrow}>Gymnasium · Klasse 6</span><h1 id="math-title">Dein Mathe-Weg</h1><p>Rationale Zahlen verstehen. Sicher in die Klassenarbeit.</p></div><div className={styles.collectionBadge}><span className={styles.badgeIcon}>{MATH_QUESTIONS.length}</span><span><strong>Dein Prüfungstraining</strong><small>14 Themen · Mittel bis schwer</small></span></div></div>
      <div className={journey.map} aria-hidden="true"><Image className={`${journey.mascot} ${styles.mascot}`} src="/mobin/mathepruefung/kangaroo-explorer.png" alt="" width={1024} height={1536} priority /><div className={`${journey.mapMarker} ${journey.markerStart}`}><b>Üben</b><span /></div><div className={`${journey.mapMarker} ${journey.markerMiddle}`}><b>Verstehen</b><span /></div><div className={`${journey.mapMarker} ${journey.markerFinish}`}><b>Sicher werden</b><span /></div></div>
      <div className={journey.stations} aria-label="Übungsarten">{MODES.map(mode => {
        const ids = mode.id === 'practice' ? practiceIds : mode.id === 'review' ? reviewIds : filtered.map(q => q.id)
        return <div className={`${journey.station} ${journey[mode.tone] || styles.review} ${styles.station}`} key={mode.id}><span className={journey.stationIcon}><svg viewBox="0 0 32 32" aria-hidden="true"><path d={mode.path} /></svg></span><button className={journey.stationButton} type="button" disabled={!ready || !ids.length} onClick={() => start(mode.id, ids)} aria-describedby={`${mode.id}-description`}><strong>{MODE_NAMES[mode.id]}</strong></button><small id={`${mode.id}-description`}>{mode.text}<span className={styles.modeCount}>{ids.length ? `${ids.length} ${ids.length === 1 ? 'Aufgabe' : 'Aufgaben'} in deiner Auswahl` : 'Aktuell keine Aufgaben in dieser Auswahl'}</span></small></div>
      })}</div>
    </section>

    <div className={styles.dashboard}>
      <section className={styles.filterPanel} aria-labelledby="selection-title">
        <div><span className={styles.eyebrow}>Deine nächste Runde</span><h2 id="selection-title">Was möchtest du üben?</h2></div>
        <div className={styles.filters}>
          <label>Aufgabensammlung<select value={collection} onChange={event => setCollection(event.target.value)}>{MATH_EXAM_COLLECTIONS.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label>
          <label>Themenauswahl<select value={scope} onChange={event => setScope(event.target.value)}><option value="all">Alle 14 Themen</option>{MATH_CHAPTERS.map(chapter => <optgroup label={`Kapitel ${chapter.number} · ${chapter.title}`} key={chapter.id}><option value={chapter.id}>Ganzes Kapitel {chapter.number}</option>{MATH_TOPICS.filter(topic => topic.chapter === chapter.id).map(topic => <option value={topic.id} key={topic.id}>{topic.title}</option>)}</optgroup>)}</select></label>
          <label>Schwierigkeit<select value={level} onChange={event => setLevel(event.target.value)}><option value="all">Mittel & schwer</option><option value="medium">Mittel</option><option value="hard">Schwer</option></select></label>
          <label>Übungsrunde<select value={count} onChange={event => setCount(event.target.value)}><option value="5">Bis zu 5 Aufgaben</option><option value="10">Bis zu 10 Aufgaben</option><option value="all">Alle ausgewählten Aufgaben</option></select></label>
        </div>
        <p className={styles.selectionNote}>Deine Auswahl enthält {filtered.length} Aufgaben. Sammlung, Thema und Schwierigkeit gelten auch für die Probeprüfung und das Fehlertraining. Beim Üben kommen unbearbeitete Aufgaben zuerst.</p><button className={styles.primaryButton} type="button" disabled={!ready || !practiceIds.length} onClick={() => start('practice', practiceIds)}>Übungsrunde starten<ArrowIcon /></button>
      </section>
      {unfinished ? <section className={styles.resumePanel}><div><strong>Du hast eine Runde begonnen.</strong><p>{MODE_NAMES[unfinished.mode]} · {Object.keys(unfinished.responses).length} von {unfinished.questionIds.length} Antworten gespeichert</p></div><button className={styles.secondaryButton} type="button" onClick={() => resume(unfinished)}>Fortsetzen<ArrowIcon /></button></section> : null}
      <section className={styles.summaryPanel} aria-labelledby="progress-title">
        <div className={styles.summaryHeading}><h2 id="progress-title">Dein Fortschritt</h2><span>{ready ? `${summary.attempted} / ${MATH_QUESTIONS.length} bearbeitet` : 'Wird geladen …'}</span></div><div className={journey.progressTrack} role="progressbar" aria-label="Bearbeitete Aufgaben" aria-valuenow={summary.attempted} aria-valuemin={0} aria-valuemax={MATH_QUESTIONS.length}><span style={{ width: `${summary.attempted / MATH_QUESTIONS.length * 100}%` }} /></div>
        <dl className={styles.summaryStats}><div><dt>Zuletzt richtig</dt><dd>{summary.correct}</dd></div><div><dt>Zum Wiederholen</dt><dd>{summary.reviewIds.length}</dd></div><div><dt>Aktive Lernzeit</dt><dd>{duration(summary.seconds)}</dd></div><div><dt>Runden abgeschlossen</dt><dd>{summary.completed}</dd></div></dl><p className={styles.selectionNote}>Ein richtig gelöstes Fehlertraining entfernt die Aufgabe aus der Fehlerliste. Abgebrochene Probeprüfungen werden erst nach der Abgabe ausgewertet.</p>
      </section>
      <section className={styles.curriculum} aria-labelledby="topics-title"><span className={styles.eyebrow}>Dein Stoff für die Klassenarbeit</span><h2 id="topics-title">Zwei Kapitel. Dein nächster Schritt.</h2><p>48 eigene Übungsaufgaben passend zu deinem Inhaltsverzeichnis. Die neue Runde ergänzt 20 mittlere bis schwere Aufgaben zu allen 14 Themen.</p>
        <div className={styles.chapterGrid}>{MATH_CHAPTERS.map(chapter => <section className={styles.chapterCard} key={chapter.id}><header><span>{chapter.number}</span><h3>{chapter.title}</h3></header><ul>{summary.topics.filter(topic => topic.chapter === chapter.id).map(topic => <li key={topic.id}><button className={scope === topic.id ? styles.topicSelected : ''} type="button" aria-pressed={scope === topic.id} onClick={() => { setCollection('all'); setScope(topic.id); setLevel('all'); document.getElementById('selection-title')?.scrollIntoView({ block: 'center', behavior: 'smooth' }) }}><span><strong>{topic.title}</strong><small>Buch S. {topic.page} · {topic.correct}/{topic.total} zuletzt richtig{topic.review ? ` · ${topic.review} zum Wiederholen` : ''}</small></span><span className={styles.topicArrow} aria-hidden="true">↗</span></button></li>)}</ul></section>)}</div>
      </section>
      <details className={styles.report}><summary>Lernbericht & Verlauf<span>Was du gelernt hast und wie es läuft</span></summary><div>
        <p>{summary.attempted ? `Beim ersten Versuch richtig: ${summary.firstCorrect} von ${summary.attempted} Aufgaben (${Math.round(summary.firstCorrect / summary.attempted * 100)} %). Zuletzt richtig: ${summary.correct} von ${summary.attempted}.` : 'Dein Bericht beginnt mit deiner ersten Antwort.'}</p>
        {summary.topics.some(topic => topic.review) ? <p><strong>Dein nächster Lernschritt:</strong> {summary.topics.filter(topic => topic.review).map(topic => topic.title).join(' · ')}</p> : summary.attempted ? <p>Aktuell keine offenen Fehler. Probiere als Nächstes die schweren Aufgaben oder eine Probeprüfung.</p> : null}
        {summary.sessions.length ? <><h3>Deine letzten 10 Runden</h3><div className={styles.sessionList}>{summary.sessions.slice(0, 10).map(item => {
          const answers = Object.entries(item.responses), correct = item.mode === 'exam' && !item.finishedAt ? null : answers.filter(([id, response]) => gradeMathResponse(MATH_QUESTION_MAP.get(id), response.value).correct).length
          return <article key={item.id}><div><strong>{MODE_NAMES[item.mode]}</strong><time dateTime={item.startedAt}>{dateLabel(item.startedAt)}</time></div><p>{item.finishedAt ? 'Abgeschlossen' : 'Pausiert'} · {answers.length}/{item.questionIds.length} beantwortet · {correct === null ? 'Auswertung nach Abgabe' : `${correct} richtig`} · {duration(sessionStudySeconds(item))}</p><button type="button" onClick={() => item.finishedAt ? setActive({ id: item.id, index: 0 }) : resume(item)}>{item.finishedAt ? 'Auswertung ansehen' : 'Runde fortsetzen'}</button></article>
        })}</div></> : null}
      </div></details>
      {syncNotice}
    </div>
  </main>
}
