'use client'

import { MATH_QUESTION_MAP, MATH_TOPIC_MAP } from '@/data/mobinMathExam'
import { formatMathAnswer, gradeMathResponse, sessionStudySeconds } from '@/lib/mobinMath'
import { MathText, NumberLine, Solution } from './MathQuestion'
import journey from './journey.module.css'
import styles from './page.module.css'

export const MODE_NAMES = { practice: 'Aufgaben üben', exam: 'Probeprüfung', review: 'Fehler wiederholen' }
export function duration(seconds) {
  const minutes = Math.floor(seconds / 60)
  return minutes ? `${minutes} min ${String(seconds % 60).padStart(2, '0')} s` : `${seconds} s`
}

export default function MathResults({ session, onExit, onReview }) {
  const questions = session.questionIds.map(id => MATH_QUESTION_MAP.get(id))
  const wrong = questions.filter(question => !gradeMathResponse(question, session.responses[question.id].value).correct)
  const correct = questions.length - wrong.length
  return <main className={`${journey.quizPage} ${styles.resultsPage}`} lang="de" dir="ltr">
    <header className={styles.resultsHeader}>
      <span className={styles.eyebrow}>{MODE_NAMES[session.mode]} · Abgeschlossen</span><h1>Dein Ergebnis</h1>
      <p>{correct} von {questions.length} Aufgaben richtig · Lernzeit {duration(sessionStudySeconds(session))}</p>
      <div className={styles.resultScore} style={{ '--score-angle': `${correct / questions.length * 360}deg` }} aria-label={`${Math.round(correct / questions.length * 100)} Prozent richtig`}><strong>{Math.round(correct / questions.length * 100)}<small>%</small></strong></div>
      <p>{wrong.length ? `${wrong.length} ${wrong.length === 1 ? 'Aufgabe wartet' : 'Aufgaben warten'} auf deine nächste Übungsrunde. Jeder verstandene Fehler bringt dich weiter.` : 'Stark! Alle Aufgaben dieser Runde sind richtig gelöst.'}</p>
      <div className={styles.resultActions}><button className={styles.primaryButton} type="button" onClick={onExit}>Zurück zum Mathe-Weg</button>{wrong.length ? <button className={styles.secondaryButton} type="button" onClick={() => onReview(wrong.map(q => q.id))}>Diese Fehler üben</button> : null}</div>
    </header>
    <section className={styles.resultDetails} aria-label="Auswertung aller Aufgaben">
      <h2>Deine Antworten & Lösungswege</h2>
      {questions.map((question, index) => {
        const response = session.responses[question.id], result = gradeMathResponse(question, response.value)
        const selected = question.type === 'choice' ? question.options.find(option => option.id === response.value)?.value : response.value
        return <details className={styles.resultQuestion} key={question.id}>
          <summary><span className={result.correct ? styles.resultCorrect : styles.resultWrong}>{result.correct ? '✓ Richtig' : '↻ Wiederholen'}</span><span>Aufgabe {index + 1} · {MATH_TOPIC_MAP.get(question.topicId).title}</span></summary>
          <div><h3><MathText>{question.prompt}</MathText></h3>{question.diagram ? <NumberLine diagram={question.diagram} /> : null}
            <p>Deine Antwort: <strong><MathText>{formatMathAnswer(selected)}</MathText>{question.unit ? ` ${question.unit}` : ''}</strong></p>
            <p>Richtiges Ergebnis: <strong><MathText>{formatMathAnswer(question.answer)}</MathText>{question.unit ? ` ${question.unit}` : ''}</strong></p>
            <Solution question={question} response={response} />
          </div>
        </details>
      })}
    </section>
  </main>
}
