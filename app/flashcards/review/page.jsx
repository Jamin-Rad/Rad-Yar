'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { FLASHCARDS, getCardById } from '@/data/flashcards'
import { answerCard, formatDueDate, isDue, loadLeitnerState } from '@/lib/leitnerStorage'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from '../flashcards.module.css'

const TEXT = {
  de: { back: '← Verwaltung', kicker: 'Fällige Wiederholung', title: 'Leitner-Review', lead: 'Hier erscheinen alle fälligen Flashcards aus allen bereits gelesenen Themen – unabhängig vom ursprünglichen Lernkapitel.', show: 'Antwort zeigen', knew: 'Gewusst', didnt: 'Nicht gewusst', empty: 'Heute sind keine Flashcards fällig.', add: 'Neue Flashcards lesen', done: 'Review beendet.', progress: 'Fällig', due: 'fällig' },
  en: { back: '← Management', kicker: 'Due review', title: 'Leitner review', lead: 'All due flashcards from all previously studied topics appear here, independent of the original learning chapter.', show: 'Show answer', knew: 'Known', didnt: 'Not known', empty: 'No flashcards are due today.', add: 'Study new flashcards', done: 'Review completed.', progress: 'Due', due: 'due' },
  fa: { back: '← مدیریت', kicker: 'مرور زمان‌دار', title: 'مرور لایتنر', lead: 'اینجا همه فلش‌کارت‌های موعددار از همه موضوعات خوانده‌شده نمایش داده می‌شوند، بدون وابستگی به فصل اصلی.', show: 'نمایش جواب', knew: 'بلد بودم', didnt: 'بلد نبودم', empty: 'امروز فلش‌کارتی برای مرور نیست.', add: 'خواندن فلش‌کارت جدید', done: 'مرور تمام شد.', progress: 'موعددار', due: 'موعد' },
}

function localize(value, lang) {
  return value?.[lang] || value?.de || ''
}

export default function FlashcardReviewPage() {
  const { lang } = useLanguage()
  const t = TEXT[lang] || TEXT.de
  const isRTL = lang === 'fa'
  const withLang = (href) => lang === 'de' ? href : `${href}?lang=${lang}`
  const [state, setState] = useState({})
  const [queueIds, setQueueIds] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const loaded = loadLeitnerState()
    setState(loaded)
    const dueIds = Object.values(loaded)
      .filter(isDue)
      .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))
      .map(record => record.id)
    setQueueIds(dueIds)
  }, [])

  const card = useMemo(() => getCardById(queueIds[0]), [queueIds])
  const record = card ? state[card.id] : null

  const respond = (knew) => {
    if (!card) return
    const nextState = answerCard(card.id, knew)
    setState(nextState)
    setQueueIds(ids => ids.slice(1))
    setShowAnswer(false)
  }

  const studiedCount = Object.keys(state).length
  const availableNew = FLASHCARDS.length - studiedCount

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={`${styles.inner} ${styles.reviewShell}`}>
        <div className={styles.sessionTop}>
          <Link href={withLang('/flashcards')} className={styles.softBtn}>{t.back}</Link>
          <span className={styles.progressText}>{t.progress}: {queueIds.length}</span>
        </div>

        <section className={styles.hero} style={{ gridTemplateColumns: '1fr' }}>
          <div>
            <span className={styles.kicker}>{t.kicker}</span>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.lead}>{t.lead}</p>
          </div>
        </section>

        <section className={styles.section}>
          {!card ? (
            <div className={styles.empty}>
              <strong>{studiedCount ? t.done : t.empty}</strong><br />
              {availableNew > 0 ? <span>{availableNew} neue Karten verfügbar.</span> : null}
              <div className={styles.actions}><Link href={withLang('/flashcards/meniskus')} className={styles.primaryBtn}>{t.add}</Link></div>
            </div>
          ) : (
            <div className={styles.cardStage}>
              <article className={styles.flashcard}>
                <div>
                  <div className={styles.cardMeta}>
                    <span className={styles.badge}>{localize(card.category, lang)}</span>
                    <span className={`${styles.badge} ${styles.badgeOrange}`}>Box {record?.box || 1}</span>
                    <span className={styles.badge}>{t.due}: {formatDueDate(record, lang)}</span>
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
