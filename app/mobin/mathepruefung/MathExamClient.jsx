'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MATH_CHAPTERS, MATH_EXAM_COLLECTIONS, MATH_QUESTIONS, MATH_QUESTION_MAP, MATH_TOPICS, MATH_TOPIC_MAP } from '@/data/mobinMathExam'
import { createMathSession, finishMathSession, gradeMathResponse, MATH_SESSION_KEY, recordMathResponse, sessionStudySeconds, summarizeMathProgress } from '@/lib/mobinMath'
import MathQuestion, { ArrowIcon } from './MathQuestion'
import MathResults, { MODE_NAMES, duration } from './MathResults'
import { useMathProgress } from './useMathProgress'
import { useStudyClock } from './useStudyClock'
import journey from './journey.module.css'
import styles from './page.module.css'
import SchoolTests, { useSchoolTests } from '../SchoolTests'
import learning from '../learning.module.css'
import SubjectHeader from '../SubjectHeader'

const MODES = ['practice', 'exam', 'review']
const dateLabel = value => new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))

export default function MathExamClient() {
  const { progress, setProgress, ready, status, localAvailable, retrySync } = useMathProgress()
  const [active, setActive] = useState(null)
  const [menu, setMenu] = useState(null)
  const menuRef = useRef(null)
  const tests = useSchoolTests('Mathe')
  const [examSelection, setExamSelection] = useState(['new'])
  const [addingExam, setAddingExam] = useState(false)
  useEffect(() => {
    if (!menu) return
    const dialog = menuRef.current
    dialog?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = previous }
  }, [menu])
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
  const examIds = new Set(MATH_EXAM_COLLECTIONS
    .filter(item => examSelection.includes(item.id)).flatMap(item => item.questionIds))
  const selectedTopics = new Set(tests.tests
    .filter(test => examSelection.includes(test.id)).flatMap(test => test.topics ?? []))
  const examQuestions = MATH_QUESTIONS.filter(question =>
    examIds.has(question.id) || selectedTopics.has(question.topicId))
  const menuIds = menu === 'practice' ? practiceIds : menu === 'review' ? reviewIds : examQuestions.map(q => q.id)

  const start = useCallback((mode, ids) => {
    if (!ready || !ids.length) return
    const next = createMathSession(`math-${crypto.randomUUID()}`, mode, ids)
    setProgress(current => ({ ...current, sessions: { ...current.sessions, [next.id]: next } }))
    setMenu(null); setActive({ id: next.id, index: 0 }); window.scrollTo({ top: 0 })
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
    <section className={learning.subjectWrap} data-subject="math" aria-label="Mathe">
      <SubjectHeader title="Mathe" mark="±" />
      <div className={learning.subjectActions} aria-label="Übungsarten">
        {MODES.map(mode => <button className={learning.subjectAction} key={mode} type="button"
          disabled={!ready} onClick={() => setMenu(mode)}>
          {MODE_NAMES[mode]}<span aria-hidden="true">›</span>
        </button>)}
      </div>
    </section>

    <dialog ref={menuRef} className={styles.setupDialog} onClose={() => setMenu(null)} onClick={event => { if (event.target === event.currentTarget) setMenu(null) }} aria-labelledby="selection-title">
      <div className={styles.setupContent}>
        <header className={styles.setupHeader}><div><span className={styles.eyebrow}>Deine nächste Runde</span><h2 id="selection-title">{MODE_NAMES[menu] || 'Training auswählen'}</h2></div><button type="button" className={styles.setupClose} onClick={() => setMenu(null)} aria-label="Schließen">×</button></header>
        <div className={styles.setupBody}>
          {menu === 'exam' ? <>
            <fieldset className={styles.setupGroup}><legend>Prüfungen auswählen</legend>
              <div className={styles.examChoices}>{[...MATH_EXAM_COLLECTIONS.filter(item => item.id !== 'all'), ...tests.tests].map(item =>
                <label key={item.id}><input type="checkbox" checked={examSelection.includes(item.id)}
                  onChange={event => setExamSelection(current => event.target.checked
                    ? [...current, item.id] : current.filter(id => id !== item.id))} />
                  <span>{item.title}{item.date && <small>{item.date.split('-').reverse().join('.')} · {item.period}. Stunde{!item.topics?.length && ' · keine Übungsthemen zugeordnet'}</small>}</span>
                </label>)}</div>
            </fieldset>
            <button type="button" className={styles.secondaryButton} onClick={() => setAddingExam(!addingExam)}>＋ Prüfung hinzufügen</button>
            {addingExam && <SchoolTests state={tests} kind="exam" topics={MATH_TOPICS} onDone={() => setAddingExam(false)} />}
          </> : <>
          <fieldset className={styles.setupGroup}><legend>Aufgabensammlung</legend><div className={styles.collectionChoices}>{MATH_EXAM_COLLECTIONS.map(item => <button type="button" key={item.id} aria-pressed={collection === item.id} onClick={() => setCollection(item.id)}>{item.title}</button>)}</div></fieldset>
          <fieldset className={styles.setupGroup}><legend>Schwierigkeit</legend><div className={styles.choiceRow}>{[['all', 'Mittel & schwer'], ['medium', 'Mittel'], ['hard', 'Schwer']].map(([value, label]) => <button type="button" key={value} aria-pressed={level === value} onClick={() => setLevel(value)}>{label}</button>)}</div></fieldset>
          {menu === 'practice' && <fieldset className={styles.setupGroup}><legend>Wie viele Aufgaben?</legend><div className={styles.choiceRow}>{[['5', 'Bis zu 5'], ['10', 'Bis zu 10'], ['all', 'Alle']].map(([value, label]) => <button type="button" key={value} aria-pressed={count === value} onClick={() => setCount(value)}>{label}</button>)}</div></fieldset>}
          <details className={styles.topicPicker}><summary>Themen auswählen <span>{scope === 'all' ? 'Alle 14 Themen' : MATH_TOPIC_MAP.get(scope)?.title || `Kapitel ${MATH_CHAPTERS.find(c => c.id === scope)?.number}`}</span></summary>
            <div className={styles.topicChoices}><button type="button" aria-pressed={scope === 'all'} onClick={() => setScope('all')}>Alle Themen</button>{MATH_CHAPTERS.map(chapter => <fieldset className={styles.setupGroup} key={chapter.id}><legend>Kapitel {chapter.number} · {chapter.title}</legend><button type="button" aria-pressed={scope === chapter.id} onClick={() => setScope(chapter.id)}>Ganzes Kapitel</button>{MATH_TOPICS.filter(topic => topic.chapter === chapter.id).map(topic => <button type="button" key={topic.id} aria-pressed={scope === topic.id} onClick={() => setScope(topic.id)}>{topic.title}</button>)}</fieldset>)}</div>
          </details>
          </>}
          {!menuIds.length && <p className={styles.setupEmpty} role="status">{menu === 'review' ? 'Keine Fehler in dieser Auswahl. Wähle eine andere Sammlung oder übe neue Aufgaben.' : 'Keine passenden Aufgaben. Ändere die Sammlung, das Thema oder die Schwierigkeit.'}</p>}
        </div>
        <footer className={styles.setupFooter}><p aria-live="polite"><strong>{menuIds.length} Aufgaben</strong><span>{menu === 'exam' ? 'Lösungen nach der Abgabe' : menu === 'review' ? 'Fehler gezielt verstehen' : 'Mit Tipps und Lösungswegen'}</span></p><button className={styles.primaryButton} type="button" disabled={!ready || !menuIds.length} onClick={() => start(menu, menuIds)}>{menu === 'exam' ? 'Prüfung starten' : menu === 'review' ? 'Fehler üben' : 'Üben starten'}<ArrowIcon /></button></footer>
      </div>
    </dialog>

    <div className={styles.dashboard}>
      <SchoolTests state={tests} topics={MATH_TOPICS} />
      <section className={styles.quickPractice}>
        <div><strong>Kurze Übungsrunde</strong><p>Fünf Aufgaben, mit Tipps und Lösungswegen.</p></div>
        <button type="button" className={styles.primaryButton} disabled={!ready}
          onClick={() => start('practice', [...MATH_QUESTIONS]
            .sort((a, b) => Number(Boolean(summary.latest[a.id])) - Number(Boolean(summary.latest[b.id])))
            .slice(0, 5).map(question => question.id))}>5 Aufgaben starten<ArrowIcon /></button>
      </section>
      {unfinished ? <section className={styles.resumePanel}><div><strong>Du hast eine Runde begonnen.</strong><p>{MODE_NAMES[unfinished.mode]} · {Object.keys(unfinished.responses).length} von {unfinished.questionIds.length} Antworten gespeichert</p></div><button className={styles.secondaryButton} type="button" onClick={() => resume(unfinished)}>Fortsetzen<ArrowIcon /></button></section> : null}
      <section className={styles.summaryPanel} aria-labelledby="progress-title">
        <div className={styles.summaryHeading}><h2 id="progress-title">Dein Fortschritt</h2><span>{ready ? `${summary.attempted} / ${MATH_QUESTIONS.length} bearbeitet` : 'Wird geladen …'}</span></div><div className={journey.progressTrack} role="progressbar" aria-label="Bearbeitete Aufgaben" aria-valuenow={summary.attempted} aria-valuemin={0} aria-valuemax={MATH_QUESTIONS.length}><span style={{ width: `${summary.attempted / MATH_QUESTIONS.length * 100}%` }} /></div>
        <dl className={styles.summaryStats}><div><dt>Zuletzt richtig</dt><dd>{summary.correct}</dd></div><div><dt>Zum Wiederholen</dt><dd>{summary.reviewIds.length}</dd></div><div><dt>Aktive Lernzeit</dt><dd>{duration(summary.seconds)}</dd></div><div><dt>Runden abgeschlossen</dt><dd>{summary.completed}</dd></div></dl><p className={styles.selectionNote}>Ein richtig gelöstes Fehlertraining entfernt die Aufgabe aus der Fehlerliste. Abgebrochene Probeprüfungen werden erst nach der Abgabe ausgewertet.</p>
      </section>
      <section className={styles.curriculum} aria-labelledby="topics-title"><span className={styles.eyebrow}>Dein Stoff für die Klassenarbeit</span><h2 id="topics-title">Zwei Kapitel. Dein nächster Schritt.</h2><p>48 eigene Übungsaufgaben passend zu deinem Inhaltsverzeichnis. Die neue Runde ergänzt 20 mittlere bis schwere Aufgaben zu allen 14 Themen.</p>
        <div className={styles.chapterGrid}>{MATH_CHAPTERS.map(chapter => <section className={styles.chapterCard} key={chapter.id}><header><span>{chapter.number}</span><h3>{chapter.title}</h3></header><ul>{summary.topics.filter(topic => topic.chapter === chapter.id).map(topic => <li key={topic.id}><button className={scope === topic.id ? styles.topicSelected : ''} type="button" aria-pressed={scope === topic.id} onClick={() => { setCollection('all'); setScope(topic.id); setLevel('all'); setMenu('practice') }}><span><strong>{topic.title}</strong><small>Buch S. {topic.page} · {topic.correct}/{topic.total} zuletzt richtig{topic.review ? ` · ${topic.review} zum Wiederholen` : ''}</small></span><span className={styles.topicArrow} aria-hidden="true">↗</span></button></li>)}</ul></section>)}</div>
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
