'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useLanguage } from '@/providers/LanguageProvider'
import { FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import {
  loadLeitnerState, answerCard, ensureCardStarted,
  isDue, getBoxLabel,
} from '@/utils/leitnerStorage'
import AuthBanner from '@/components/AuthBanner'
import styles from './page.module.css'

const T = {
  de: {
    back: '← Übersicht',
    cardOf: (i, n) => `Karte ${i} von ${n}`,
    tap: 'Karte antippen zum Umdrehen',
    tapBack: 'Antippen, um die Frage erneut zu sehen',
    questionAgain: 'Frage',
    answerLabel: 'Kurze Antwort',
    explanationLabel: 'Erklärung',
    diagramLabel: 'Mini-Diagramm',
    know: 'Gewusst ✓',
    dontKnow: 'Nicht gewusst ✗',
    done: 'Sitzung beendet!',
    doneSub: 'Alle Karten für heute wiederholt.',
    correct: 'Richtig',
    wrong: 'Falsch',
    total: 'Gesamt',
    backLink: '← Zurück zur Übersicht',
  },
  en: {
    back: '← Overview',
    cardOf: (i, n) => `Card ${i} of ${n}`,
    tap: 'Tap card to reveal answer',
    tapBack: 'Tap to see the question again',
    questionAgain: 'Question',
    answerLabel: 'Short answer',
    explanationLabel: 'Explanation',
    diagramLabel: 'Mini diagram',
    know: 'Got it ✓',
    dontKnow: 'Missed it ✗',
    done: 'Session complete!',
    doneSub: 'All cards reviewed for today.',
    correct: 'Correct',
    wrong: 'Missed',
    total: 'Total',
    backLink: '← Back to overview',
  },
  fa: {
    back: '← مرور کلی',
    cardOf: (i, n) => `کارت ${i} از ${n}`,
    tap: 'برای دیدن جواب روی کارت بزن',
    tapBack: 'برای دیدن دوباره سؤال روی کارت بزن',
    questionAgain: 'سؤال',
    answerLabel: 'پاسخ کوتاه',
    explanationLabel: 'توضیح',
    diagramLabel: 'دیاگرام کوچک',
    know: 'بلدم ✓',
    dontKnow: 'بلد نبودم ✗',
    done: 'سشن تموم شد!',
    doneSub: 'همه کارت‌ها مرور شدند.',
    correct: 'درست',
    wrong: 'اشتباه',
    total: 'کل',
    backLink: '← برگشت به مرور کلی',
  },
}

function localize(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || ''
}

function sortCards(cards, state) {
  const due = [], fresh = [], future = []
  cards.forEach(c => {
    const r = state[c.id]
    if (!r) fresh.push(c)
    else if (r.status === 'mastered') future.push(c)
    else if (isDue(r)) due.push(c)
    else future.push(c)
  })
  return [...due, ...fresh, ...future]
}

export default function FlashcardReviewPage({ params }) {
  const { lang } = useLanguage()
  const { userId } = useAuth()
  const t = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  const topicId = params?.topicId ?? 'meniskus'
  const topic = getFlashcardTopic(topicId)
  const allCards = useMemo(() => FLASHCARDS.filter(c => c.topicId === topicId), [topicId])

  const [leitnerState, setLeitnerState] = useState({})
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const [stats, setStats] = useState({ correct: 0, wrong: 0 })

  useEffect(() => {
    const state = loadLeitnerState(userId)
    setLeitnerState(state)
    setCards(sortCards(allCards, state))
  }, [allCards, userId])

  const current = cards[index]
  const record = current ? leitnerState[current.id] : null
  const boxNum = record?.box ?? 1
  const boxLabel = getBoxLabel(boxNum, lang)
  const progress = cards.length > 0 ? (index / cards.length) * 100 : 0

  const handleCardClick = useCallback(() => {
    if (exiting || !current) return
    if (flipped) {
      setFlipped(false)
      return
    }
    const newState = ensureCardStarted(current.id, userId)
    setLeitnerState(newState)
    setFlipped(true)
  }, [flipped, exiting, current, userId])

  const handleAnswer = useCallback((knew) => {
    if (!flipped || exiting || !current) return
    setExiting(true)
    const newState = answerCard(current.id, knew, userId)
    setLeitnerState(newState)
    setStats(s => ({ correct: s.correct + (knew ? 1 : 0), wrong: s.wrong + (knew ? 0 : 1) }))
    setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      if (index + 1 >= cards.length) setDone(true)
      else setIndex(i => i + 1)
    }, 280)
  }, [flipped, exiting, current, index, cards.length, userId])

  useEffect(() => {
    function onKey(e) {
      if (done) return
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        handleCardClick()
      }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') handleAnswer(true)
        if (e.code === 'ArrowLeft') handleAnswer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, done, exiting, handleCardClick, handleAnswer])

  if (!topic) return null

  if (done) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>🎉</span>
          <h1 className={styles.doneTitle}>{t.done}</h1>
          <p className={styles.doneSub}>{t.doneSub}</p>
          <div className={styles.doneStats}>
            <div className={styles.doneStat}><strong>{stats.correct}</strong><span>{t.correct}</span></div>
            <div className={styles.doneStat}><strong>{stats.wrong}</strong><span>{t.wrong}</span></div>
            <div className={styles.doneStat}><strong>{stats.correct + stats.wrong}</strong><span>{t.total}</span></div>
          </div>
          <Link href="/flashcards" className={styles.backLink}>{t.backLink}</Link>
        </div>
      </div>
    </div>
  )

  if (!current) return null

  const frontText = localize(current.front, lang)
  const answerText = localize(current.answer, lang) || localize(current.back, lang)
  const explanationText = localize(current.explanation, lang)
  const diagramText = localize(current.diagram, lang)

  return (
    <div className={styles.page} dir={dir}>
      <AuthBanner lang={lang} />

      <header className={styles.topBar}>
        <Link href="/flashcards" className={styles.backBtn}>{t.back}</Link>
        <div className={styles.topCenter}>
          <span className={styles.topicName}>{topic.title?.[lang] || topic.title?.de}</span>
          <span className={styles.cardCount}>{t.cardOf(index + 1, cards.length)}</span>
        </div>
        <div className={styles.boxPill}>{boxLabel}</div>
      </header>

      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <main className={styles.main}>
        <div className={styles.categoryRow}>
          <span className={styles.catBadge}>{current.category?.[lang] || current.category?.de}</span>
        </div>

        <div
          className={`${styles.stage} ${exiting ? styles.exiting : ''}`}
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          aria-label={flipped ? t.tapBack : t.tap}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick() } }}
        >
          <div className={`${styles.flipper} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.cardFront}>
              <p className={styles.question}>{frontText}</p>
              <div className={styles.tapHint}>
                <span className={styles.tapHintIcon}>↕</span>
                {t.tap}
              </div>
            </div>

            <div className={styles.cardBack}>
              <div className={styles.answerWrap}>
                <div className={styles.backQuestionBlock}>
                  <span className={styles.backMiniLabel}>{t.questionAgain}</span>
                  <p className={styles.backQuestion}>{frontText}</p>
                </div>
                <div>
                  <span className={styles.backMiniLabel}>{t.answerLabel}</span>
                  <p className={styles.answer}>{answerText}</p>
                </div>
                {explanationText && (
                  <div className={styles.explanationBlock}>
                    <span className={styles.backMiniLabel}>{t.explanationLabel}</span>
                    <p>{explanationText}</p>
                  </div>
                )}
                {diagramText && (
                  <div className={styles.diagramBlock}>
                    <span className={styles.backMiniLabel}>{t.diagramLabel}</span>
                    <pre>{diagramText}</pre>
                  </div>
                )}
              </div>
              <div className={styles.tapHint}>
                <span className={styles.tapHintIcon}>↕</span>
                {t.tapBack}
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.answerRow} ${flipped ? styles.answerVisible : ''}`}>
          <button className={styles.dontKnowBtn} onClick={() => handleAnswer(false)}>
            {t.dontKnow}
          </button>
          <button className={styles.knowBtn} onClick={() => handleAnswer(true)}>
            {t.know}
          </button>
        </div>
      </main>
    </div>
  )
}
