'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { NOVEMBER_MODES as ALL_MODES, NOVEMBER_WORDS } from '@/lib/mobinEnglishNovember'
import { isTypedAnswerCorrect } from '@/lib/mobinEnglish'
import { readEnglishHistory, saveEnglishHistory } from '@/lib/mobinEnglishProgress'
import { loadEnglishHistory, syncEnglishHistory } from '@/lib/mobinEnglishOnline'
import { mergeEnglishHistory, normalizeEnglishHistory, stampEnglishHistory } from '@/lib/mobinEnglishSync'
import { bindProgressSaveQueue, createProgressSaveQueue } from '../../../progressSaveQueue'
import base from '../../english.module.css'
import styles from './november.module.css'

const NOVEMBER_MODES = ALL_MODES.filter(m => m.id.startsWith('nov18-quick-'))
const newRun = (reviewIds) => ({ id: crypto.randomUUID(), startedAt: new Date().toISOString(), results: [], index: 0, draft: '', reviewOnly: Boolean(reviewIds), questionIds: reviewIds || [] })

export default function NovemberClient() {
  const [history, setHistory] = useState({})
  const latest = useRef({})
  const queue = useRef(null)
  const [ready, setReady] = useState(false)
  const [saveStatus, setSaveStatus] = useState('Lade deinen Lernstand …')
  const [view, setView] = useState('home')
  const input = useRef(null)
  const heading = useRef(null)

  useEffect(() => {
    let alive = true
    latest.current = normalizeEnglishHistory(readEnglishHistory())
    setHistory(latest.current)
    queue.current = createProgressSaveQueue(async state => {
      try {
        const remote = await syncEnglishHistory(state)
        if (alive) {
          latest.current = mergeEnglishHistory(remote, latest.current)
          setHistory(latest.current)
          setSaveStatus('Im Konto gespeichert')
        }
      } catch (error) {
        if (alive) setSaveStatus('Auf diesem Gerät gespeichert · Kontosync beim nächsten Verbindungsaufbau')
        throw error
      }
    })
    const unbind = bindProgressSaveQueue(queue.current)
    loadEnglishHistory().then(remote => {
      if (!alive) return
      latest.current = mergeEnglishHistory(remote, latest.current)
      setHistory(latest.current)
      setSaveStatus('Im Konto gespeichert')
    }).catch(() => {
      if (alive) setSaveStatus('Auf diesem Gerät gespeichert · Kontosync beim nächsten Verbindungsaufbau')
    }).finally(() => { if (alive) setReady(true) })
    return () => { alive = false; unbind() }
  }, [])

  const mode = NOVEMBER_MODES.find(m => m.id === view)
  const entry = mode ? history[mode.id] : null
  const run = entry?.run
  const questions = mode ? run?.reviewOnly ? mode.questions.filter(q => run.questionIds.includes(q.id)) : mode.questions : []
  const results = run?.results || []
  const index = run?.index || 0
  const finished = Boolean(run && questions.length && results.length === questions.length && index >= questions.length)
  const question = questions[index]
  const feedback = results[index]

  useEffect(() => {
    if (mode && !finished && !feedback) input.current?.focus()
    else heading.current?.focus()
  }, [view, index, finished, Boolean(feedback)]) // eslint-disable-line react-hooks/exhaustive-deps

  function persist(id, value, flush = false) {
    const next = stampEnglishHistory(latest.current, { ...latest.current, [id]: value })
    latest.current = next
    setHistory(next)
    const saved = saveEnglishHistory(next)
    setSaveStatus(saved ? 'Auf diesem Gerät gespeichert · Kontosync folgt' : 'Lokaler Speicher nicht verfügbar · Kontosync folgt')
    queue.current?.enqueue(next)
    if (flush) void queue.current?.flush()
  }
  function navigate(next) {
    void queue.current?.flush()
    setView(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function openMode(m, review = false, restart = false) {
    const old = latest.current[m.id] || {}
    navigate(m.id)
    if (review || restart || !old.run) persist(m.id, { ...old, run: newRun(review ? old.missedIds : null) })
  }
  function submit(value) {
    if (!question || feedback || !value.trim()) return
    const answer = { id: question.id, chosen: value.trim(), correct: isTypedAnswerCorrect(question, value) }
    const nextResults = [...results, answer]
    const last = nextResults.length === questions.length
    const nextIndex = last || mode.kind === 'test' && !run.reviewOnly ? index + 1 : index
    const next = { ...entry, run: { ...run, results: nextResults, index: nextIndex, draft: '' } }
    if (last) {
      const score = nextResults.filter(r => r.correct).length
      next.missedIds = nextResults.filter(r => !r.correct).map(r => r.id)
      if (!run.reviewOnly) Object.assign(next, { completed: true, last: score, best: Math.max(entry?.best || 0, score), date: new Date().toISOString() })
    }
    persist(mode.id, next, last)
  }
  const incorrect = results.filter(r => !r.correct)

  return <main className={base.shell} lang="de">
    <div className={base.page}>
      <nav className={base.topbar} aria-label="Navigation">
        {view === 'home' ? <Link className={base.backLink} href="/mobin/fach/englisch">← English</Link> : <button className={styles.back} onClick={() => navigate('home')}>← Testvorbereitung</button>}
        <span className={base.dateTicket}>18. NOVEMBER 2026</span>
      </nav>
      <p className={styles.sync} role="status">{saveStatus}</p>
      {view === 'home' && <>
        <header className={base.hero}>
          <div className={base.heroCopy}><span className={base.heroEyebrow}>UNIT 2 · LONDON · KLASSE 6</span><h1>Ready for<br />your test<span>?</span></h1><p>Wortschatz, Rechtschreibung und Grammatik für den 18. November.</p></div>
          <div className={base.skyline} aria-hidden="true" />
        </header>
        <section className={styles.section} aria-labelledby="tests-title"><h2 id="tests-title">Bereit für einen Probetest?</h2><p>Zwei gemischte Tests mit je 30 Fragen und ein mittelschwerer Rechtschreibtest mit 15 Fragen. Immer vier Antwortmöglichkeiten; die Auswertung erscheint am Ende.</p><div className={styles.testCards}>{NOVEMBER_MODES.filter(m => m.kind === 'test').map(m => <ModeCard key={m.id} mode={m} entry={history[m.id]} ready={ready} onOpen={() => openMode(m)} />)}</div></section>
      </>}
      {view === 'words' && <section className={styles.paper}>
        <span className={styles.eyebrow}>DEINE BEIDEN WORTSCHATZSEITEN</span><h1 ref={heading} tabIndex={-1}>Wörter zum Nachschlagen</h1><p>Britisches Englisch · Bedeutung und Schreibweise gehören zusammen. Die zusätzlichen Formen „fought“ und die Themenüberschriften werden mitgeübt.</p>
        {['London', 'Transport', 'Station 1'].map(group => <section key={group}><h2>{group}</h2><div className={styles.wordGrid}>{NOVEMBER_WORDS.filter(w => w.group === group).map(w => <div key={w.id}><strong>{w.en}{w.accept.some(a => !w.en.startsWith(`to ${a}`)) && <small>auch: {w.accept.filter(a => !w.en.startsWith(`to ${a}`)).join(' / ')}</small>}</strong><span>{w.de}</span></div>)}</div></section>)}
        <button className={styles.primary} disabled={!ready} onClick={() => openMode(NOVEMBER_MODES[1])}>Schreibweise üben →</button>
      </section>}
      {view === 'rules' && <section className={styles.paper}>
        <span className={styles.eyebrow}>BUCHSEITEN 41–43</span><h1 ref={heading} tabIndex={-1}>Grammatik auf einen Blick</h1>
        <div className={styles.ruleGrid}><article><h2>Going to: Pläne</h2><p><strong>am / is / are + going to + Grundform</strong></p><p>I am going to visit the market.<br />She is not going to take the bus.<br />They are going to travel by train.</p><h3>Fragen & Kurzantworten</h3><p>Are you going to come? → Yes, I am. / No, I’m not.<br />Is she going to come? → Yes, she is. / No, she isn’t.<br />Where are they going to stay?</p><p>Das Verb <strong>be</strong> steht vor dem Subjekt. Nach going to kommt kein -s und kein -ing.</p></article>
        <article><h2>Comparative & superlative</h2><p><strong>Vergleich + than</strong> · <strong>the + höchste Stufe</strong></p><p>high → higher → the highest<br />nice → nicer → the nicest<br />big → bigger → the biggest<br />easy → easier → the easiest<br />beautiful → more beautiful → the most beautiful<br />good → better → the best<br />bad → worse → the worst</p><p>Kurze Adjektive meist mit -er/-est, lange mit more/most. Bei <strong>as … as / not as … as</strong> bleibt die Grundform: not as expensive as.</p></article></div>
        <button className={styles.primary} disabled={!ready} onClick={() => openMode(NOVEMBER_MODES[2])}>Grammatik üben →</button>
      </section>}
      {mode && run && !finished && question && <section className={styles.workbench} aria-label={mode.title}>
        <div className={styles.sessionTop}><span className={styles.eyebrow}>{run.reviewOnly ? 'FEHLER WIEDERHOLEN' : mode.kind === 'test' ? 'PROBETEST' : 'TRAINING'}</span><span>Frage {index + 1} / {questions.length}</span></div>
        <progress className={styles.progress} max={questions.length} value={results.length} aria-label="Beantwortete Fragen" />
        <div className={styles.questionBody}><span className={styles.tag}>{question.group}</span><h1 ref={heading} tabIndex={-1}>{question.prompt}</h1>
          {question.options ? <div className={styles.options}>{question.options.map(option => <button key={option} disabled={Boolean(feedback)} aria-pressed={feedback?.chosen === option} onClick={() => submit(option)}>{option}</button>)}</div> : <form onSubmit={event => {event.preventDefault(); submit(run.draft || '')}}>
            <label htmlFor="november-answer">Deine Antwort</label>
            <input ref={input} id="november-answer" type="text" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} maxLength={500} disabled={Boolean(feedback)} value={feedback?.chosen ?? run.draft ?? ''} onChange={event => persist(mode.id, { ...entry, run: { ...run, draft: event.target.value } })} />
            <p className={styles.hint}>Ohne Autokorrektur oder Rechtschreibhilfe. Satzzeichen am Satzende sind bei ganzen Sätzen optional.</p>
            {!feedback && <button className={styles.primary} disabled={!run.draft?.trim()}>{mode.kind === 'test' && !run.reviewOnly ? 'Antwort speichern →' : 'Antwort prüfen →'}</button>}
          </form>}
          {feedback && <div className={feedback.correct ? styles.correct : styles.incorrect} role="status"><strong>{feedback.correct ? 'Richtig!' : 'Noch nicht richtig.'}</strong><p>{question.explain}</p><button className={styles.primary} onClick={() => persist(mode.id, { ...entry, run: { ...run, index: index + 1, draft: '' } })}>Nächste Frage →</button></div>}
        </div>
      </section>}
      {mode && finished && <section className={styles.paper}>
        <span className={styles.eyebrow}>{run.reviewOnly ? 'FEHLERRUNDE ABGESCHLOSSEN' : `${mode.title.toUpperCase()} · ABGESCHLOSSEN`}</span>
        <h1 ref={heading} tabIndex={-1}>Geschafft<span className={styles.accent}>.</span></h1><p className={styles.score}>{results.filter(r => r.correct).length}<span> / {questions.length} richtig</span></p><p>{incorrect.length === 1 ? 'Eine Antwort kannst du gezielt wiederholen.' : incorrect.length ? `${incorrect.length} Antworten kannst du gezielt wiederholen.` : 'Alle Antworten richtig. Sehr gut!'}</p>
        <div className={styles.actions}>{incorrect.length > 0 && <button className={styles.primary} onClick={() => openMode(mode, true)}>Fehler wiederholen ({incorrect.length})</button>}<button className={styles.secondary} onClick={() => navigate('home')}>Zur Übersicht</button><button className={styles.secondary} onClick={() => openMode(mode, false, true)}>Neue Runde starten</button></div>
        <h2>Deine Antworten</h2><div className={styles.answerList}>{results.map((r, i) => <details key={r.id} open={!r.correct}><summary><span className={r.correct ? styles.ok : styles.bad}>{r.correct ? '✓' : '×'}</span><span>{i + 1}. {questions[i].prompt}</span></summary><div><p><strong>Deine Antwort:</strong> {r.chosen}</p><p><strong>Lösung:</strong> {questions[i].answer}</p><p>{questions[i].explain}</p></div></details>)}</div>
      </section>}
    </div>
  </main>
}

function ModeCard({ mode, entry, ready, onOpen }) {
  const answered = entry?.run?.results?.length || 0
  const finished = entry?.run && answered === (entry.run.reviewOnly ? entry.run.questionIds.length : mode.questions.length) && entry.run.index >= answered
  return <article className={styles.card}><span className={styles.eyebrow}>{mode.questions.length} AUFGABEN</span><h3>{mode.title}</h3><p>{mode.description}</p><div className={styles.cardBottom}><span>{finished ? `Letzte Runde: ${entry.run.results.filter(r => r.correct).length} / ${answered}` : answered ? `${answered} beantwortet · gespeichert` : 'Noch nicht begonnen'}</span><button disabled={!ready} onClick={onOpen}>{finished ? 'Ergebnis ansehen' : entry?.run ? 'Fortsetzen' : 'Starten'} <span aria-hidden="true">→</span></button></div></article>
}
