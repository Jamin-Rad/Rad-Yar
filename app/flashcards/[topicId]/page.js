'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import { useLanguage } from '@/providers/LanguageProvider'
import { FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import { getLessonLinkForFlashcard } from '@/data/curriculum'
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
    tapBack: 'Antippen, um die Frage wieder zu sehen',
    questionLabel: 'Frage',
    answerLabel: 'Kurze Antwort',
    explanationLabel: 'Erklärung',
    diagramLabel: 'Mini-Diagramm',
    know: 'Gewusst ✓',
    dontKnow: 'Nicht gewusst ✗',
    practiceKnow: 'Weiter ✓',
    practiceDontKnow: 'Nochmal üben ✗',
    practiceMode: 'Üben ohne Zählen',
    practiceNote: 'Diese Wiederholung verändert keine Leitner-Box und wird nicht gezählt.',
    done: 'Sitzung beendet!',
    doneSub: 'Alle Karten für diese Sitzung wiederholt.',
    correct: 'Gewusst',
    wrong: 'Nochmal',
    total: 'Gesamt',
    backLink: '← Zurück zur Übersicht',
    emptyTitle: 'Keine Karten in dieser Auswahl.',
    emptySub: 'Wähle eine andere Box oder starte das Thema normal.',
    lessonLinkLabel: 'Zur Lektion (neuer Tab)',
  },
  en: {
    back: '← Overview',
    cardOf: (i, n) => `Card ${i} of ${n}`,
    tap: 'Tap card to reveal answer',
    tapBack: 'Tap to see the question again',
    questionLabel: 'Question',
    answerLabel: 'Short answer',
    explanationLabel: 'Explanation',
    diagramLabel: 'Mini-diagram',
    know: 'Got it ✓',
    dontKnow: 'Missed it ✗',
    practiceKnow: 'Next ✓',
    practiceDontKnow: 'Review again ✗',
    practiceMode: 'Practice without counting',
    practiceNote: 'This review does not change any Leitner box and is not counted.',
    done: 'Session complete!',
    doneSub: 'All cards in this session have been reviewed.',
    correct: 'Got it',
    wrong: 'Again',
    total: 'Total',
    backLink: '← Back to overview',
    emptyTitle: 'No cards in this selection.',
    emptySub: 'Choose another box or start the topic normally.',
    lessonLinkLabel: 'Open lesson (new tab)',
  },
  fa: {
    back: '← مرور کلی',
    cardOf: (i, n) => `کارت ${i} از ${n}`,
    tap: 'برای دیدن جواب روی کارت بزن',
    tapBack: 'برای دیدن دوباره سؤال روی کارت بزن',
    questionLabel: 'سؤال',
    answerLabel: 'جواب کوتاه',
    explanationLabel: 'توضیح',
    diagramLabel: 'دیاگرام کوتاه',
    know: 'بلدم ✓',
    dontKnow: 'بلد نبودم ✗',
    practiceKnow: 'بعدی ✓',
    practiceDontKnow: 'دوباره تمرین ✗',
    practiceMode: 'تمرین بدون شمارش',
    practiceNote: 'این مرور جعبه لایتنر را تغییر نمی‌دهد و در آمار حساب نمی‌شود.',
    done: 'سشن تمام شد!',
    doneSub: 'همه کارت‌های این سشن مرور شدند.',
    correct: 'بلدم',
    wrong: 'دوباره',
    total: 'کل',
    backLink: '← برگشت به مرور کلی',
    emptyTitle: 'در این انتخاب کارتی وجود ندارد.',
    emptySub: 'یک جعبه دیگر انتخاب کن یا موضوع را به صورت عادی شروع کن.',
    lessonLinkLabel: 'باز کردن درس (تب جدید)',
  },
}

// Synthetisches "Thema" für die zufällige Wiederholung aller heute fälligen Karten
const DUE_TOPIC_TITLE = { de: 'Heute fällig', en: 'Due today', fa: 'امروز برای مرور' }

function localize(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || ''
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}


function DiagramView({ text }) {
  const lines = String(text || '').split('\n').map(line => line.trim()).filter(Boolean)
  return (
    <div className={styles.diagramFlow}>
      {lines.map((line, lineIndex) => {
        const parts = line.split('→').map(part => part.trim()).filter(Boolean)
        return (
          <div key={`${line}-${lineIndex}`} className={styles.diagramChain}>
            {parts.map((part, partIndex) => (
              <div key={`${part}-${partIndex}`} className={styles.diagramStep}>
                <div className={styles.diagramNode}>{part}</div>
                {partIndex < parts.length - 1 && <div className={styles.diagramArrowDown} aria-hidden="true">↓</div>}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
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

export default function FlashcardReviewPage({ params, searchParams }) {
  const { lang } = useLanguage()
  const { userId } = useAuth()
  const t = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'

  const topicId = params?.topicId ?? 'meniskus'
  const isDueMode = topicId === 'faellig'
  const topic = isDueMode ? { id: 'faellig', title: DUE_TOPIC_TITLE, href: null } : getFlashcardTopic(topicId)
  const lessonLink = !isDueMode && topic ? getLessonLinkForFlashcard(topic.href) : null
  const allCards = useMemo(() => isDueMode ? FLASHCARDS : FLASHCARDS.filter(c => c.topicId === topicId), [topicId, isDueMode])
  const practiceMode = searchParams?.mode === 'practice'
  const boxFilter = searchParams?.box ? Number(searchParams.box) : null
  const fromParam = typeof searchParams?.from === 'string' ? searchParams.from : null
  const backHref = fromParam || (lang === 'de' ? '/flashcards' : `/flashcards?lang=${lang}`)

  const [leitnerState, setLeitnerState] = useState({})
  const [cards, setCards] = useState([])
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [exitDir, setExitDir] = useState(null)
  const [done, setDone] = useState(false)
  const [stats, setStats] = useState({ correct: 0, wrong: 0 })

  useEffect(() => {
    const state = loadLeitnerState(userId)
    let selectedCards = allCards

    if (isDueMode) {
      selectedCards = shuffle(allCards.filter(card => isDue(state[card.id])))
    } else if (practiceMode && boxFilter) {
      selectedCards = allCards.filter(card => {
        const record = state[card.id]
        return record && record.status !== 'mastered' && Number(record.box) === boxFilter
      })
    } else if (boxFilter) {
      selectedCards = allCards.filter(card => {
        const record = state[card.id]
        return record && isDue(record) && Number(record.box) === boxFilter
      })
    }

    setLeitnerState(state)
    setCards(isDueMode || practiceMode ? selectedCards : sortCards(selectedCards, state))
    setIndex(0)
    setFlipped(false)
    setDone(false)
    setStats({ correct: 0, wrong: 0 })
  }, [allCards, userId, practiceMode, boxFilter, isDueMode])

  const current = cards[index]
  const record = current ? leitnerState[current.id] : null
  const boxNum = practiceMode && boxFilter ? boxFilter : (record?.box ?? 1)
  const boxLabel = getBoxLabel(boxNum, lang)
  const progress = cards.length > 0 ? (index / cards.length) * 100 : 0

  const handleFlip = useCallback(() => {
    if (exiting || !current) return
    if (!flipped && !practiceMode) {
      const newState = ensureCardStarted(current.id, userId)
      setLeitnerState(newState)
    }
    setFlipped(value => !value)
  }, [flipped, exiting, current, userId, practiceMode])

  const handleAnswer = useCallback((knew) => {
    if (!flipped || exiting || !current) return
    setExiting(true)
    setExitDir(knew ? 'right' : 'left')

    if (!practiceMode) {
      const newState = answerCard(current.id, knew, userId)
      setLeitnerState(newState)
    }

    setStats(s => ({ correct: s.correct + (knew ? 1 : 0), wrong: s.wrong + (knew ? 0 : 1) }))
    setTimeout(() => {
      setFlipped(false)
      setExiting(false)
      setExitDir(null)
      if (index + 1 >= cards.length) setDone(true)
      else setIndex(i => i + 1)
    }, 320)
  }, [flipped, exiting, current, index, cards.length, userId, practiceMode])

  useEffect(() => {
    function onKey(e) {
      if (done) return
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        handleFlip()
      }
      if (flipped && !exiting) {
        if (e.code === 'ArrowRight') handleAnswer(true)
        if (e.code === 'ArrowLeft') handleAnswer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipped, done, exiting, handleFlip, handleAnswer])

  if (!topic) return null

  if (done) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>🎉</span>
          <h1 className={styles.doneTitle}>{t.done}</h1>
          <p className={styles.doneSub}>{t.doneSub}</p>
          {practiceMode && <p className={styles.practiceDoneNote}>{t.practiceNote}</p>}
          <div className={styles.doneStats}>
            <div className={styles.doneStat}><strong>{stats.correct}</strong><span>{t.correct}</span></div>
            <div className={styles.doneStat}><strong>{stats.wrong}</strong><span>{t.wrong}</span></div>
            <div className={styles.doneStat}><strong>{stats.correct + stats.wrong}</strong><span>{t.total}</span></div>
          </div>
          <Link href={backHref} className={styles.backLink}>{t.backLink}</Link>
        </div>
      </div>
    </div>
  )

  if (!current) return (
    <div className={styles.page} dir={dir}>
      <div className={styles.doneWrap}>
        <div className={styles.doneCard}>
          <span className={styles.doneEmoji}>🗂️</span>
          <h1 className={styles.doneTitle}>{t.emptyTitle}</h1>
          <p className={styles.doneSub}>{t.emptySub}</p>
          <Link href={backHref} className={styles.backLink}>{t.backLink}</Link>
        </div>
      </div>
    </div>
  )

  const answer = localize(current.answer, lang) || localize(current.back, lang)
  const explanation = localize(current.explanation, lang)
  const diagram = localize(current.diagram, lang)

  return (
    <div className={styles.page} dir={dir}>
      <AuthBanner lang={lang} />

      <header className={styles.topBar}>
        <Link href={backHref} className={styles.backBtn}>{t.back}</Link>
        <div className={styles.topCenter}>
          <span className={styles.cardCount}>{t.cardOf(index + 1, cards.length)}</span>
        </div>
        <div className={styles.topRight}>
          {lessonLink && (
            <a
              href={lang === 'de' ? lessonLink : `${lessonLink}?lang=${lang}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.lessonLink}
              aria-label={t.lessonLinkLabel}
              title={t.lessonLinkLabel}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          <div className={styles.boxPill}>{practiceMode ? t.practiceMode : boxLabel}</div>
        </div>
      </header>

      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>

      <main className={styles.main}>
        <div className={styles.categoryRow}>
          <span className={styles.catBadge}>{localize(current.category, lang)}</span>
          {practiceMode && <span className={styles.practiceBadge}>{boxLabel} · {t.practiceNote}</span>}
        </div>

        <div
          className={`${styles.stage} ${exiting ? styles.exiting : ''} ${exitDir === 'right' ? styles.exitRight : exitDir === 'left' ? styles.exitLeft : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={flipped ? t.tapBack : t.tap}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFlip() } }}
        >
          <div key={index} className={`${styles.flipper} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.cardFront}>
              <p className={styles.question}>{localize(current.front, lang)}</p>
              <div className={styles.tapHint}>
                <span className={styles.tapHintIcon}>↕</span>
                {t.tap}
              </div>
            </div>

            <div className={styles.cardBack}>
              <div className={styles.backContent}>
                <div className={styles.answerBlock}>
                  <span className={styles.answerLabel}>{t.answerLabel}</span>
                  <p className={styles.answerShort}>{answer}</p>
                </div>

                {explanation && (
                  <div className={styles.explanationBlock}>
                    <span className={styles.explanationLabel}>{t.explanationLabel}</span>
                    <p className={styles.answer}>{explanation}</p>
                  </div>
                )}

                {diagram && (
                  <div className={styles.diagramBlock}>
                    <span>{t.diagramLabel}</span>
                    <DiagramView text={diagram} />
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
            {practiceMode ? t.practiceDontKnow : t.dontKnow}
          </button>
          <button className={styles.knowBtn} onClick={() => handleAnswer(true)}>
            {practiceMode ? t.practiceKnow : t.know}
          </button>
        </div>
      </main>
    </div>
  )
}
