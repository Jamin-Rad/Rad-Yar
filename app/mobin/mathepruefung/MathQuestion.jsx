'use client'

import { useEffect, useRef, useState } from 'react'
import { MATH_TOPIC_MAP } from '@/data/mobinMathExam'
import { formatMathAnswer, gradeMathResponse } from '@/lib/mobinMath'
import journey from './journey.module.css'
import styles from './page.module.css'

export function ArrowIcon({ back = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={back ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'} /></svg>
}

export function MathText({ children }) {
  return String(children).split(/([−-]?\d+\/\d+)/g).map((part, index) => {
    const match = part.match(/^([−-]?\d+)\/(\d+)$/)
    return match ? <span className={styles.fraction} role="math" aria-label={`${match[1]} geteilt durch ${match[2]}`} key={index}><span aria-hidden="true">{match[1]}</span><span aria-hidden="true">{match[2]}</span></span> : part
  })
}

export function NumberLine({ diagram }) {
  const x = index => 45 + index * (510 / diagram.divisions)
  return <figure className={styles.numberLine}>
    <svg viewBox="0 0 600 155" role="img" aria-label={`Zahlengerade von ${diagram.from} bis ${diagram.to} mit ${diagram.divisions} gleich großen Abschnitten. P liegt ${diagram.point} Abschnitte rechts vom linken Endpunkt.`}>
      <line x1="25" y1="75" x2="580" y2="75" stroke="#08245f" strokeWidth="3" />
      <path d="m571 69 10 6-10 6" fill="none" stroke="#08245f" strokeWidth="3" />
      {Array.from({ length: diagram.divisions + 1 }, (_, index) => <line x1={x(index)} x2={x(index)} y1="64" y2="86" stroke="#08245f" strokeWidth="2" key={index} />)}
      <circle cx={x(diagram.point)} cy="75" r="9" fill="#ff6548" stroke="white" strokeWidth="3" />
      <text x={x(diagram.point)} y="43" textAnchor="middle" fill="#ba3f29" fontSize="24" fontWeight="800">P</text>
      <text x="45" y="121" textAnchor="middle" fill="#08245f" fontSize="23">{diagram.from}</text>
      <text x="555" y="121" textAnchor="middle" fill="#08245f" fontSize="23">{diagram.to}</text>
    </svg>
    <figcaption>Jeder Abschnitt ist gleich lang.</figcaption>
  </figure>
}

export function Solution({ question, response }) {
  const result = gradeMathResponse(question, response.value)
  return <div className={styles.solutionBody}>
    <p><MathText>{result.explanation}</MathText></p>
    <h3>Schritt für Schritt</h3>
    <ol>{question.steps.map((step, index) => <li key={index}><MathText>{step}</MathText></li>)}</ol>
    {question.type === 'choice' ? <details className={styles.optionReasons}>
      <summary>Alle Antwortmöglichkeiten erklärt</summary>
      <ul>{question.options.map(option => <li key={option.id}><strong>{option.id} · <MathText>{formatMathAnswer(option.value)}</MathText></strong><span><MathText>{option.explanation}</MathText></span></li>)}</ul>
    </details> : null}
  </div>
}

export default function MathQuestion({ question, response, mode, number, total, marked, onSubmit, onNext, onBookmark }) {
  const [value, setValue] = useState(response?.value || '')
  const [hint, setHint] = useState(false)
  const [error, setError] = useState('')
  const headingRef = useRef(null), feedbackRef = useRef(null)
  const result = response ? gradeMathResponse(question, response.value) : null
  const checked = Boolean(response) && mode !== 'exam'
  const topic = MATH_TOPIC_MAP.get(question.topicId)

  useEffect(() => { headingRef.current?.focus() }, [])
  useEffect(() => { if (checked) feedbackRef.current?.focus() }, [checked])

  function submit(event) {
    event.preventDefault()
    const grade = gradeMathResponse(question, value)
    if (!grade.valid) { setError(grade.explanation); return }
    setError('')
    onSubmit(value, hint)
  }

  return <article className={`${journey.questionCard} ${styles.questionCard}`}>
    <header className={journey.questionHeading}>
      <strong>Aufgabe {number} von {total}</strong>
      <div className={journey.questionMeta}><span className={question.difficulty === 'hard' ? styles.hard : ''}>{question.difficulty === 'hard' ? 'Schwer' : 'Mittel'}</span><span>{topic.title}</span><span>Buch S. {topic.page}</span></div>
    </header>
    <div className={styles.questionLayout}>
      <section className={styles.promptPanel} aria-labelledby="question-title">
        <h1 id="question-title" ref={headingRef} tabIndex={-1}><MathText>{question.prompt}</MathText></h1>
        {question.diagram ? <NumberLine diagram={question.diagram} /> : null}
        {mode !== 'exam' && !response ? <div className={styles.hintArea}>
          <button type="button" onClick={() => setHint(current => !current)} aria-expanded={hint} aria-controls="question-hint">{hint ? 'Tipp ausblenden' : 'Kleiner Tipp'}</button>
          {hint ? <p id="question-hint"><MathText>{question.hint}</MathText></p> : null}
        </div> : null}
        {mode === 'exam' ? <p className={styles.examNote}>Probeprüfung: Erst selbst rechnen. Die Lösungen bleiben bis zur Abgabe verborgen.</p> : <p className={styles.scratchNote}>Nimm dir Papier und einen Stift. Ein eigener Rechenweg hilft dir beim Verstehen.</p>}
      </section>
      <form className={styles.answerForm} onSubmit={submit}>
        {question.type === 'choice' ? <fieldset className={styles.optionGroup} disabled={Boolean(response)}>
          <legend>Welche Antwort stimmt?</legend>
          {question.options.map(option => {
            const selected = value === option.id, correctOption = checked && gradeMathResponse(question, option.id).correct
            const color = correctOption ? styles.choiceCorrect : checked && selected ? styles.choiceWrong : selected ? styles.choiceSelected : ''
            return <label className={`${styles.optionLabel} ${color}`} key={option.id}>
              <input type="radio" name={`answer-${question.id}`} value={option.id} checked={selected} onChange={() => { setValue(option.id); setError('') }} />
              <b aria-hidden="true">{option.id}</b><span><MathText>{formatMathAnswer(option.value)}</MathText>{question.unit ? ` ${question.unit}` : ''}{checked && (correctOption || selected) ? <small>{correctOption ? 'Richtig' : 'Deine Antwort'}</small> : null}</span>
            </label>
          })}
        </fieldset> : <div className={styles.writtenAnswer}>
          <label htmlFor="math-answer">Dein Ergebnis</label>
          <div className={styles.answerInputRow}><input id="math-answer" type="text" inputMode="text" value={value} onChange={event => { setValue(event.target.value); setError('') }} maxLength={64} autoComplete="off" spellCheck={false} disabled={Boolean(response)} aria-describedby="answer-format" aria-invalid={Boolean(error) || undefined} />{question.unit ? <span>{question.unit}</span> : null}</div>
          <p id="answer-format">{question.format === 'reducedFraction' ? 'Als vollständig gekürzten Bruch eingeben, z. B. 3/4.' : 'Bruch oder Dezimalzahl eingeben. Komma und Punkt sind beide möglich.'}</p>
        </div>}
        {error ? <p className={styles.inputError} role="alert">{error}</p> : null}
        {!response ? <button className={journey.checkButton} type="submit" disabled={!value.trim()}>{mode === 'exam' ? number === total ? 'Prüfung abgeben' : 'Antwort speichern & weiter' : 'Antwort prüfen'}</button> : mode === 'exam' ? <button className={journey.checkButton} type="button" onClick={onNext}>{number === total ? 'Prüfung abgeben' : 'Weiter zur nächsten Aufgabe'}</button> : null}
      </form>
    </div>
    {checked ? <section ref={feedbackRef} tabIndex={-1} className={`${styles.feedback} ${result.correct ? styles.feedbackCorrect : styles.feedbackWrong}`} aria-labelledby="feedback-title">
      <header><div><span className={styles.feedbackIcon} aria-hidden="true">{result.correct ? '✓' : '↻'}</span><h2 id="feedback-title">{result.correct ? 'Richtig gelöst!' : 'Noch nicht richtig – schau dir den Weg an.'}</h2></div><p>Richtiges Ergebnis: <strong><MathText>{formatMathAnswer(question.answer)}</MathText>{question.unit ? ` ${question.unit}` : ''}</strong></p></header>
      <Solution question={question} response={response} />
      <div className={styles.feedbackActions}><button className={journey.nextButton} type="button" onClick={onNext}>{number === total ? 'Ergebnis anzeigen' : 'Nächste Aufgabe'}<ArrowIcon /></button>{result.correct ? <button className={styles.bookmarkButton} type="button" aria-pressed={marked} onClick={onBookmark}>{marked ? 'Gemerkt – aus Merkliste entfernen' : 'Trotzdem für später merken'}</button> : <p>Zum Wiederholen gespeichert.</p>}</div>
    </section> : null}
  </article>
}
