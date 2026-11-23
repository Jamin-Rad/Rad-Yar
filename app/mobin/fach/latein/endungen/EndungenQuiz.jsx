'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isCorrect, rounds } from './questions'
import styles from './endungen.module.css'
import useLatinProgress from './useLatinProgress'

const base = '/mobin/fach/latein/endungen'
const roundUrl = (mode) => base + (rounds[mode].kind === 'training' ? '/uebung/' : '/test/') + mode
const marks = { training: '↗', extra: '+', quick: '◷', medium: '✓', hard: '✦' }
const resultDate = new Intl.DateTimeFormat('de-DE', { dateStyle: 'medium', timeStyle: 'short' })
const emptyDraft = { index: 0, answers: {}, checked: {} }

const rows = [
  ['a-Deklination', 'amica', 'a', 'am', 'ae', 'as'],
  ['o-Deklination (m.)', 'amicus', 'us', 'um', 'i', 'os'],
  ['o-Deklination (n.)', 'donum', 'um', 'um', 'a', 'a'],
]

function Reference({ expanded = false, topic }) {
  const cases = topic === 'Nominativ & Akkusativ'
  return (
    <details className={styles.reference} open={expanded || undefined}>
      <summary>{expanded ? 'Merkhilfe' : 'Merkhilfe öffnen'}</summary>
      <div className={styles.referenceBody}>
        {(!topic || !cases) && <table>
          <thead><tr><th>Person</th><th>Endung</th><th><i lang="la">esse</i></th></tr></thead>
          <tbody>
            {[
              ['ich', '-o', 'sum'], ['du', '-s', 'es'], ['er / sie / es', '-t', 'est'],
              ['wir', '-mus', 'sumus'], ['ihr', '-tis', 'estis'], ['sie (Plural)', '-nt', 'sunt'],
            ].map(([person, ending, form]) => (
              <tr key={person}><th scope="row">{person}</th><td>{ending}</td><td lang="la">{form}</td></tr>
            ))}
          </tbody>
        </table>}
        {(!topic || cases) && <div>
          <table className={styles.caseTable}>
            <thead><tr><th>Beispiel</th><th>Nom. Sg.</th><th>Akk. Sg.</th><th>Nom. Pl.</th><th>Akk. Pl.</th></tr></thead>
            <tbody>
              {rows.map(([label, noun, ...endings]) => (
                <tr key={noun}>
                  <th scope="row"><i lang="la">{noun}</i><small>{label}</small></th>
                  {endings.map((ending, index) => <td key={index}>-{ending}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p>Subjekt: Wer oder was? Akkusativobjekt: Wen oder was? Beim Neutrum haben beide Fälle dieselbe Form. Schau darauf, welche Aufgabe das Wort im Satz hat.</p>
        </div>}
      </div>
    </details>
  )
}

function AnswerFeedback({ question, answer }) {
  const correct = isCorrect(question, answer)
  return (
    <div className={styles.feedback} data-correct={correct}>
      <strong>{correct ? '✓ Richtig!' : 'Richtige Lösung: ' + question.answer}</strong>
      <p>{question.explanation}</p>
    </div>
  )
}

function Round({ mode, subset, initialDraft, onDraft, onExit, onResult, syncStatus }) {
  const round = rounds[mode]
  const questions = subset ? subset.map((index) => round.questions[index]) : round.questions
  const title = subset ? 'Fehler wiederholen' : round.title
  const training = round.kind === 'training' || Boolean(subset)
  const [draft, setDraft] = useState(initialDraft ?? emptyDraft)
  const { index, answers, checked } = draft


  const heading = useRef(null)
  const answerInput = useRef(null)
  const question = questions[index]
  const answer = answers[index] ?? ''
  const marked = Boolean(checked[index])
  const done = training ? Object.keys(checked).length : Object.values(answers).filter((value) => value.trim()).length
  const total = questions.length
  useEffect(() => {
    if (!marked && answerInput.current) answerInput.current.focus({ preventScroll: true })
    else heading.current?.focus({ preventScroll: true })
  }, [index, marked])

  function updateDraft(changes) {
    const updated = { ...draft, ...changes }
    setDraft(updated)
    if (!subset) onDraft(mode, updated)
  }

  function setIndex(number) {
    updateDraft({ index: number })
  }

  function finish() {
    const wrong = questions.flatMap((item, number) =>
      answers[number]?.trim() && !isCorrect(item, answers[number]) ? [subset?.[number] ?? number] : [])
    const unanswered = questions.filter((_, number) => !answers[number]?.trim()).length
    onResult(mode, wrong, unanswered, answers, subset)
    if (!subset) onDraft(mode, null)
  }

  function submitTest() {
    if (done === total || window.confirm(`Test mit ${total - done} offenen Aufgaben abgeben?`)) finish()
  }

  function next(event) {
    event.preventDefault()
    if (!answer.trim()) return
    if (training && !marked) {
      updateDraft({ checked: { ...checked, [index]: true } })
      if (done + 1 === total) finish()
      return
    }
    if (index < total - 1) {
      setIndex(index + 1)
      return
    }
    if (done === total) {
      finish()
      return
    }
    setIndex(questions.findIndex((_, number) => !answers[number]?.trim()))
  }

  return (
    <section className={styles.workspace} aria-label={title}>
      <div className={styles.workspaceHeader}>
        <div><p className={styles.kicker}>Latein · Endungen</p><h1>{title}</h1></div>
        <div><button className={styles.textButton} onClick={onExit}>← Speichern und zurück</button>{syncStatus}</div>
      </div>
      <div className={styles.workspaceGrid}>
      <div className={styles.questionPane}>
        <div className={styles.roundBar}>
          <strong>Aufgabe {index + 1}/{total}</strong>
          <span>{done} von {total} {training ? 'geprüft' : 'beantwortet'}</span>
        </div>
        <progress className={styles.progress} value={done} max={total} aria-label="Fortschritt" />
        <p className={styles.eyebrow}>
          {round.kind === 'training' && !subset ? (index < 10 ? 'Mittel' : 'Schwer') + ' · ' : ''}{question.topic}
        </p>
        <h2 ref={heading} tabIndex={-1}>{question.prompt}</h2>
        <p className={styles.example}>{question.example}</p>
        <form onSubmit={next}>
          {question.options ? (
            <fieldset className={styles.options} key={index} disabled={marked}>
              <legend className={styles.srOnly}>Wähle eine Antwort</legend>
              {question.options.map((option, optionIndex) => (
                <label key={option} className={styles.option} data-selected={answer === option}
                  data-solution={marked && option === question.answer}>
                  <input data-mobin-option={optionIndex + 1} aria-keyshortcuts={String(optionIndex + 1)} type="radio" name="latin-answer" value={option} checked={answer === option}
                    onChange={() => updateDraft({ answers: { ...answers, [index]: option } })} />
                  <b>{optionIndex + 1} · </b>{option}
                </label>
              ))}
            </fieldset>
          ) : (
            <label className={styles.inputLabel}>
              Deine Antwort
              <input ref={answerInput} key={`${mode}-${index}`} type="text" autoFocus={!marked} className={styles.input} value={answer}
                onChange={(event) => updateDraft({ answers: { ...answers, [index]: event.target.value } })}
                readOnly={marked} maxLength={240} autoComplete="off" autoCapitalize="none" spellCheck={false} />
            </label>
          )}
          <div aria-live="polite">{marked && <AnswerFeedback question={question} answer={answer} />}</div>
          <div className={styles.controls}>
            {index > 0 && <button className={styles.secondary} type="button" onClick={() => setIndex(index - 1)}>← Zurück</button>}
            {(training || index < total - 1 || done < total) && <button data-mobin-enter aria-keyshortcuts="Enter" className={styles.primary} disabled={!answer.trim()}>
              {training && !marked ? 'Antwort prüfen' : index < total - 1 ? 'Weiter →'
                : done < total ? 'Zur offenen Aufgabe →' : 'Auswertung anzeigen'}
            </button>}
          </div>
        </form>
      </div>
      <aside className={styles.sidePane}>
        {training ? <Reference expanded topic={question.topic} /> : <>
          <h2>Aufgaben</h2>
          <nav className={styles.steps} aria-label="Aufgaben">
            {questions.map((_, number) => (
              <button key={number} type="button" aria-label={`Aufgabe ${number + 1}${answers[number]?.trim() ? ', beantwortet' : ''}`}
                aria-current={index === number ? 'step' : undefined} data-answered={Boolean(answers[number]?.trim())}
                onClick={() => setIndex(number)}>{number + 1}</button>
            ))}
          </nav>
          <button data-mobin-enter={done === total ? true : undefined} aria-keyshortcuts={done === total ? "Enter" : undefined} type="button" className={styles.secondary} disabled={done === 0} onClick={submitTest}>
            {done < total ? 'Vorzeitig abgeben' : 'Test abgeben'}
          </button>
        </>}
      </aside>
      </div>
    </section>
  )
}

function Result({ result, onRepeat, onRestart }) {
  const { mode, mistakes, unanswered = 0, answers, subset } = result
  const questions = subset ? subset.map((index) => rounds[mode].questions[index]) : rounds[mode].questions
  const total = questions.length
  const score = total - mistakes.length - unanswered
  return (
    <div className={styles.resultGrid}>
      <section className={styles.workspace}>
        <p className={styles.kicker}>{subset ? 'Fehler wiederholen' : rounds[mode].title}</p>
        <h1>Auswertung</h1>
        <div className={styles.score}><strong>{score}<span> / {total}</span></strong><span>richtige Antworten</span></div>
        <p>{mistakes.length} Fehler{unanswered > 0 ? ` · ${unanswered} offen` : ''}</p>
        <div className={styles.resultActions}>
          {mistakes.length > 0 && <button className={styles.primary} onClick={() => onRepeat(mode, mistakes)}>Fehler wiederholen</button>}
          <button className={styles.secondary} onClick={onRestart}>Runde wiederholen</button>
        </div>
      </section>
      <section className={styles.workspace} aria-labelledby="latein-answers">
        <h2 id="latein-answers">Antworten</h2>
        <ol className={styles.answerList}>
          {questions.map((item, index) => {
            const wrong = mistakes.includes(subset?.[index] ?? index)
            const answer = answers?.[index]?.trim()
            if (!answers && !wrong) return null
            return (
              <li key={index}>
                <details open={wrong || undefined} data-wrong={wrong}>
                  <summary>Aufgabe {index + 1} · {wrong ? 'Falsch' : answer ? 'Richtig' : 'Offen'}</summary>
                  <div className={styles.answerDetail}>
                    <h3>{item.prompt}</h3>
                    <p>{item.example}</p>
                    <dl className={styles.answerComparison}>
                      <div><dt>Deine Antwort</dt><dd>{answer || (answers ? 'Nicht beantwortet' : 'Nicht gespeichert')}</dd></div>
                      <div><dt>Richtige Antwort</dt><dd>{item.answer}</dd></div>
                    </dl>
                    <p>{item.explanation}</p>
                  </div>
                </details>
              </li>
            )
          })}
        </ol>
        {!answers && mistakes.length === 0 && <p>Für diese frühere Runde ist die Punktzahl gespeichert.</p>}
      </section>
    </div>
  )
}

export default function EndungenQuiz() {
  const pathname = usePathname()
  const [view, id] = pathname.slice(base.length + 1).split('/')
  const { results, drafts, status, saveDraft, saveResult, refresh, flush } = useLatinProgress()
  const [retry, setRetry] = useState(null)
  const [retryResult, setRetryResult] = useState(null)
  const [opening, setOpening] = useState(false)
  const mode = id === 'fehler' ? retry?.mode : id
  const activeRound = Object.hasOwn(rounds, mode) && (view === 'uebung' || view === 'test')
  const result = view === 'auswertung' ? results.find((item) => item.id === id)
    ?? (retryResult?.id === id ? retryResult : null) : null

  function go(url, replace = false) {
    if (replace) window.history.replaceState(null, '', url)
    else window.history.pushState(null, '', url)
    window.scrollTo(0, 0)
  }

  function exit() {
    void flush()
    go(base)
  }

  function repeat(mode, subset) {
    setRetry({ mode, subset, id: crypto.randomUUID() })
    go(base + '/uebung/fehler')
  }

  async function openRound(mode) {
    setOpening(true)
    await refresh()
    go(roundUrl(mode))
    setOpening(false)
  }

  function complete(mode, mistakes, unanswered, answers, subset) {
    const result = subset
      ? { id: crypto.randomUUID(), mode, mistakes, unanswered, answers, subset }
      : saveResult(mode, mistakes, unanswered, answers)
    if (subset) setRetryResult(result)
    go(base + '/auswertung/' + result.id, true)
  }

  const syncStatus = <div className={styles.roundBar}>
    <p className={styles.testNote} role="status">{{
      loading: 'Lernstand wird geladen …',
      saving: 'Lernstand wird synchronisiert …',
      saved: 'Im Mobin-Konto gespeichert',
      offline: 'Online-Speicher nicht erreichbar. Lernstand bleibt vorerst in diesem Browser.',
    }[status]}</p>
    {status === 'offline' && <button type="button" className={styles.textButton} onClick={refresh}>Erneut synchronisieren</button>}
  </div>

  if (view) {
    return (
      <main className={styles.screen} lang="de">
        <div className={styles.screenWrap}>
          <button className={styles.screenBack} onClick={exit}>← Endungen</button>
          {activeRound && status !== 'loading' ? (
            <Round key={id === 'fehler' ? retry.id : mode} mode={mode} subset={id === 'fehler' ? retry.subset : null}
              initialDraft={id === 'fehler' ? null : drafts[mode]?.draft} onDraft={saveDraft}
              onExit={exit} onResult={complete} syncStatus={syncStatus} />
          ) : result ? (
            <>
              <Result result={result} onRepeat={repeat} onRestart={() => result.subset ? repeat(result.mode, result.subset) : openRound(result.mode)} />
              {syncStatus}
            </>
          ) : status === 'loading' ? syncStatus : (
            <section className={styles.workspace}>
              <h1>Runde nicht verfügbar</h1>
              {syncStatus}
            </section>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className={styles.screen} lang="de">
      <div className={styles.wrap}>
        <Link className={styles.screenBack} href="/mobin/fach/latein">← Latein</Link>
        <header className={styles.topicHero}>
          <p className={styles.kicker}>Latein · Cursus A, Lektion 3</p>
          <h1>Endungen im Griff</h1>
          <p>Personalendungen, <i lang="la">esse</i> und Nominativ &amp; Akkusativ</p>
        </header>
      {[['training', 'Üben'], ['test', 'Tests']].map(([kind, label]) => (
      <section className={styles.roundGroup} key={kind} aria-labelledby={`latein-${kind}`}>
        <h2 id={`latein-${kind}`}>{label}</h2>
        <div className={styles.rounds}>
        {Object.entries(rounds).filter(([key]) => !key.startsWith('probe24-')).filter(([, round]) => (round.kind ?? 'test') === kind).map(([key, round]) => (
          <button className={styles.roundCard} data-mode={key} key={key} disabled={status === 'loading' || opening} onClick={() => openRound(key)}>
            <span className={styles.badge} aria-hidden="true">{marks[key]}</span>
            <span className={styles.detail}>{round.detail}</span>
            <strong>{round.title}</strong>
            <span>{round.description}</span>
            <span className={styles.start} data-draft={Boolean(drafts[key]?.draft)}>{drafts[key]?.draft ? 'Fortsetzen' : round.kind === 'training' ? 'Training starten' : 'Test starten'} <span aria-hidden="true">→</span></span>
          </button>
        ))}
        </div>
      </section>
      ))}
      <p className={styles.testNote}>Die Probetests zeigen Lösungen und Punktzahl erst nach der Abgabe.</p>
      {syncStatus}
      {results.length > 0 && (
        <section className={styles.panel} aria-labelledby="latin-results">
          <h2 id="latin-results">Deine Ergebnisse</h2>
          <ul className={styles.review}>
            {results.filter(r => !r.mode.startsWith('probe24-')).map(({ id, mode, date, mistakes, unanswered = 0 }) => {
              const total = rounds[mode].questions.length
              return <li className={styles.resultRow} key={id}>
                <div><button className={styles.textButton} onClick={() => go(base + '/auswertung/' + id)}>{rounds[mode].title} · {total - mistakes.length - unanswered}/{total}</button>
                  <small>{resultDate.format(date)}{unanswered > 0 ? ` · ${unanswered} offen bei Abgabe` : ''}</small></div>
                {mistakes.length > 0
                  ? <button className={styles.secondary} onClick={() => repeat(mode, mistakes)}>Fehler wiederholen</button>
                  : <span>{unanswered > 0 ? 'Keine falschen Antworten' : 'Alles richtig'}</span>}
              </li>
            })}
          </ul>
        </section>
      )}
      <Reference />
      </div>
    </main>
  )
}
