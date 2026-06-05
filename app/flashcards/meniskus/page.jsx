'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { getCardsByTopic, getFlashcardTopic } from '@/data/flashcards'
import { answerCard, ensureCardStarted, loadLeitnerState } from '@/lib/leitnerStorage'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from '../flashcards.module.css'

const TEXT = {
  de: { back: '← Flashcards', kicker: 'Neue Flashcards', title: 'Meniskus-Flashcards', lead: 'Lies die Karten zu diesem Thema. Sobald eine Karte angezeigt wurde, erscheint sie automatisch in der Flashcard-Verwaltung.', show: 'Antwort zeigen', knew: 'Gewusst', didnt: 'Nicht gewusst', finished: 'Alle Meniskus-Flashcards wurden gelesen.', manage: 'Zur Verwaltung', progress: 'Karte' },
  en: { back: '← Flashcards', kicker: 'New flashcards', title: 'Meniscus flashcards', lead: 'Study the cards for this topic. Once a card is shown, it is automatically added to flashcard management.', show: 'Show answer', knew: 'Known', didnt: 'Not known', finished: 'All meniscus flashcards have been studied.', manage: 'Go to management', progress: 'Card' },
  fa: { back: '← فلش‌کارت‌ها', kicker: 'فلش‌کارت جدید', title: 'فلش‌کارت منیسک', lead: 'کارت‌های این موضوع را بخوان. به محض اینکه یک کارت نمایش داده شود، خودکار وارد بخش مدیریت فلش‌کارت می‌شود.', show: 'نمایش جواب', knew: 'بلد بودم', didnt: 'بلد نبودم', finished: 'همه فلش‌کارت‌های منیسک خوانده شدند.', manage: 'رفتن به مدیریت', progress: 'کارت' },
}

function localize(value, lang) {
  return value?.[lang] || value?.de || ''
}

export default function MeniskusFlashcardsPage() {
  const { lang } = useLanguage()
  const t = TEXT[lang] || TEXT.de
  const isRTL = lang === 'fa'
  const withLang = (href) => lang === 'de' ? href : `${href}?lang=${lang}`
  const topic = getFlashcardTopic('meniskus')
  const cards = useMemo(() => getCardsByTopic('meniskus'), [])
  const [index, setIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [state, setState] = useState({})

  const card = cards[index]

  useEffect(() => {
    setState(loadLeitnerState())
  }, [])

  useEffect(() => {
    if (!card) return
    const nextState = ensureCardStarted(card.id)
    setState(nextState)
    setShowAnswer(false)
  }, [card])

  const respond = (knew) => {
    if (!card) return
    const nextState = answerCard(card.id, knew)
    setState(nextState)
    setIndex(i => i + 1)
    setShowAnswer(false)
  }

  const currentRecord = card ? state[card.id] : null

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={`${styles.inner} ${styles.reviewShell}`}>
        <div className={styles.sessionTop}>
          <Link href={withLang('/flashcards')} className={styles.softBtn}>{t.back}</Link>
          <span className={styles.progressText}>{t.progress} {Math.min(index + 1, cards.length)} / {cards.length}</span>
        </div>

        <section className={styles.hero} style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <span className={styles.kicker}>{t.kicker}</span>
            <h1 className={styles.title}>{localize(topic.title, lang) || t.title}</h1>
            <p className={styles.lead}>{t.lead}</p>
          </div>
        </section>

        <section className={styles.section}>
          {!card ? (
            <div className={styles.empty}>
              <strong>{t.finished}</strong>
              <div className={styles.actions}><Link href={withLang('/flashcards')} className={styles.primaryBtn}>{t.manage}</Link></div>
            </div>
          ) : (
            <div className={styles.cardStage}>
              <article className={styles.flashcard}>
                <div>
                  <div className={styles.cardMeta}>
                    <span className={styles.badge}>{localize(card.category, lang)}</span>
                    <span className={`${styles.badge} ${styles.badgeOrange}`}>{currentRecord?.status === 'mastered' ? '✓' : `Box ${currentRecord?.box || 1}`}</span>
                  </div>
                  {!showAnswer ? (
                    <h2 className={styles.question}>{localize(card.front, lang)}</h2>
                  ) : (
                    <p className={styles.answer}>{localize(card.back, lang)}</p>
                  )}
                </div>
                <div className={styles.cardControls}>
                  {!showAnswer ? (
                    <button type="button" className={styles.showBtn} onClick={() => setShowAnswer(true)}>{t.show}</button>
                  ) : (
                    <>
                      <button type="button" className={styles.dontKnowBtn} onClick={() => respond(false)}>{t.didnt}</button>
                      <button type="button" className={styles.knowBtn} onClick={() => respond(true)}>{t.knew}</button>
                    </>
                  )}
                </div>
              </article>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
