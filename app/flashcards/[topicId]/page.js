'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useLanguage } from '@/providers/LanguageProvider'
import { FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import {
  loadLeitnerState, answerCard, ensureCardStarted,
  isDue, LEITNER_STEPS, getBoxLabel,
} from '@/utils/leitnerStorage'
import AuthBanner from '@/components/AuthBanner'
import styles from './page.module.css'

/* ── Übersetzungen ─────────────────────────────────── */
const T = {
  de: {
    back:     '← Übersicht',
    cardOf:   (i, n) => `Karte ${i} von ${n}`,
    tap:      'Karte antippen zum Umdrehen',
    know:     'Gewusst ✓',
    dontKnow: 'Nicht gewusst ✗',
    done:     'Sitzung beendet!',
    doneSub:  'Alle Karten für heute wiederholt.',
    correct:  'Richtig',
    wrong:    'Falsch',
    total:    'Gesamt',
    backLink: '← Zurück zur Übersicht',
  },
  en: {
    back:     '← Overview',
    cardOf:   (i, n) => `Card ${i} of ${n}`,
    tap:      'Tap card to reveal answer',
    know:     'Got it ✓',
    dontKnow: 'Missed it ✗',
    done:     'Session complete!',
    doneSub:  'All cards reviewed for today.',
    correct:  'Correct',
    wrong:    'Missed',
    total:    'Total',
    backLink: '← Back to overview',
  },
  fa: {
    back:     '← مرور کلی',
    cardOf:   (i, n) => `کارت ${i} از ${n}`,
    tap:      'برای دیدن جواب روی کارت بزن',
    know:     'بلدم ✓',
    dontKnow: 'بلد نبودم ✗',
    done:     'سشن تموم شد!',
    doneSub:  'همه کارت‌ها مرور شدند.',
    correct:  'درست',
    wrong:    'اشتباه',
    total:    'کل',
    backLink: '← برگشت به مرور کلی',
  },
}

function sortCards(cards, state) {
  const due = [], fresh = [], future = []
  cards.forEach(c => {
    const r = state[c.id]
    if (!r)                       fresh.push(c)
    else if (r.status === 'mastered') future.push(c)
    else if (isDue(r))            due.push(c)
    else                          future.push(c)
  })
  return [...due, ...fresh, ...future]
}

export default function FlashcardReviewPage({ params }) {
  const { lang } = useLanguage()
  const { userId } = useAuth()          // null wenn nicht angemeldet
  const t   = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  const { topicId = 'meniskus' } = await params
  const topic    = getFlashcardTopic(topicId)
  const allCards = useMemo(() => FLASHCARDS.filter(c => c.topicId === topicId), [topicId])

  const [leitnerState, setLeitnerState] = useState({})
  const [cards, setCards]               = useState([])
  const [index, setIndex]               = useState(0)
  const [flipped, setFlipped]           = useState(false)
  const [exiting, setExiting]           = useState(false)
  const [done, setDone]                 = useState(false)
  const [stats, setStats]               = useState({ correct: 0, wrong: 0 })

  // State laden — userId-aware
  useEffect(() => {
    const state = loadLeitnerState(userId)
    setLeitnerState(state)
    setCards(sortCards(allCards, state))
  }, [allCards, userId])

  // Tastatursteuerung
  useEffect(() => {
    function onKey(e) {
      if (done) return
      if ((e.code === 'Space' || e.code === 'ArrowUp') && !flipped) {
        e.preventDefault(); handleFlip()
      }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') handleAnswer(true)
        if (e.code === 'ArrowLeft')  handleAnswer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, done, exiting]) // eslint-disable-line

  const current  = cards[index]
  const record   = current ? leitnerState[current.id] : null
  const boxNum   = record?.box ?? 1
  const boxLabel = getBoxLabel(boxNum, lang)
  const progress = cards.length > 0 ? (index / cards.length) * 100 : 0

  const handleFlip = useCallback(() => {
    if (flipped || exiting || !current) return
    const newState = ensureCardStarted(current.id, userId)
    setLeitnerState(newState)
    setFlipped(true)
  }, [flipped, exiting, current, userId])

  const handleAnswer = useCallback((knew) => {
    if (!flipped || exiting || !current) return
    setExiting(true)
    const newState = answerCard(current.id, knew, userId)
    setLeitnerState(newState)
    setStats(s => ({ correct: s.correct + (knew?1:0), wrong: s.wrong + (knew?0:1) }))
    setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      if (index + 1 >= cards.length) setDone(true)
      else setIndex(i => i + 1)
    }, 280)
  }, [flipped, exiting, current, index, cards.length, userId])

  if (!topic) return null

  /* ABSCHLUSS */
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
            <div className={styles.doneStat}><strong>{stats.correct+stats.wrong}</strong><span>{t.total}</span></div>
          </div>
          <Link href="/flashcards" className={styles.backLink}>{t.backLink}</Link>
        </div>
      </div>
    </div>
  )

  if (!current) return null

  /* REVIEW */
  return (
    <div className={styles.page} dir={dir}>

      {/* Banner für nicht angemeldete User */}
      <AuthBanner lang={lang} />

      {/* Top Bar */}
      <header className={styles.topBar}>
        <Link href="/flashcards" className={styles.backBtn}>{t.back}</Link>
        <div className={styles.topCenter}>
          <span className={styles.topicName}>{topic.title?.[lang]}</span>
          <span className={styles.cardCount}>{t.cardOf(index+1, cards.length)}</span>
        </div>
        <div className={styles.boxPill}>{boxLabel}</div>
      </header>

      {/* Fortschrittsbalken */}
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <main className={styles.main}>
        {/* Kategorie */}
        <div className={styles.categoryRow}>
          <span className={styles.catBadge}>{current.category?.[lang]}</span>
        </div>

        {/* 3D FLIP KARTE */}
        <div
          className={`${styles.stage} ${exiting ? styles.exiting : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={t.tap}
          onKeyDown={e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); handleFlip() } }}
        >
          <div className={`${styles.flipper} ${flipped ? styles.flipped : ''}`}>
            {/* Vorderseite */}
            <div className={styles.cardFront}>
              <p className={styles.question}>{current.front?.[lang]}</p>
              <div className={styles.tapHint}>
                <span className={styles.tapHintIcon}>↕</span>
                {t.tap}
              </div>
            </div>
            {/* Rückseite */}
            <div className={styles.cardBack}>
              <p className={styles.answer}>{current.back?.[lang]}</p>
            </div>
          </div>
        </div>

        {/* Antwort-Buttons */}
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
