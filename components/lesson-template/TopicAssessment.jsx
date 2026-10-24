'use client'

import { useState } from 'react'

const labels = {
  de: { check: 'Kurz prüfen', quiz: 'MC-Frage üben', cards: 'Flashcard wiederholen' },
  en: { check: 'Quick check', quiz: 'Practise the MCQ', cards: 'Review flashcard' },
  fa: { check: 'خودآزمایی کوتاه', quiz: 'تمرین سؤال چندگزینه‌ای', cards: 'مرور فلش‌کارت' },
}

// The registry question is also the inline check, keeping feedback in sync.
export default function TopicAssessment({ question, topic, lang = 'de', returnTo, fach = 'technik' }) {
  const [choice, setChoice] = useState(null)
  if (!question) return null
  const text = labels[lang] || labels.de
  const context = new URLSearchParams({ lang, from: returnTo })
  return <section aria-label={text.check} style={{ marginBlock: 24, padding: 18, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--surface-soft)' }}>
    <h4>{text.check}</h4>
    <p>{question.question}</p>
    <div style={{ display: 'grid', gap: 10 }}>
      {question.options.map(option => <button key={option.id} type="button" aria-pressed={choice === option.id}
        onClick={() => setChoice(option.id)} style={{ font: 'inherit', textAlign: 'start', whiteSpace: 'normal', overflowWrap: 'anywhere', padding: 12, borderRadius: 8, border: choice === option.id ? '2px solid var(--accent, #29818f)' : '1px solid var(--border)', color: 'var(--text)', background: 'var(--surface)' }}>
        <b dir="ltr">{option.id}.</b> {option.text}
      </button>)}
    </div>
    <p role="status" aria-live="polite">{choice ? (choice === question.correct ? question.explanation : question.wrongExplanations[choice]) : ''}</p>
    <nav aria-label={text.check} style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
      <a href={`/ueben/quiz?fach=${encodeURIComponent(fach)}&n=1&themen=${topic}&${context}`}>{text.quiz}</a>
      <a href={`/flashcards/${topic}?${context}`}>{text.cards}</a>
    </nav>
  </section>
}
