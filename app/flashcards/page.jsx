'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { FLASHCARD_TOPICS, FLASHCARDS, getCardById } from '@/data/flashcards'
import { LEITNER_STEPS, formatDueDate, isDue, loadLeitnerState, resetLeitnerState } from '@/utils/leitnerStorage'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const TEXT = {
  de: {
    kicker: 'Leitner-System',
    title: 'Flashcards',
    lead: 'Hier werden alle bereits gelesenen Flashcards automatisch gesammelt und nach dem klassischen Leitner-System wiederholt. Die Daten bleiben lokal in deinem Browser gespeichert.',
    due: 'Heute fällig',
    studied: 'Gelesene Karten',
    mastered: 'Abgeschlossen',
    weak: 'Zurück in Box 1',
    startReview: 'Wiederholung starten',
    addNew: 'Neue Flashcards hinzufügen',
    addLead: 'Wähle wie im Lernen-Menü ein Thema. Beim Lesen werden die Karten automatisch in deine Flashcard-Verwaltung übernommen.',
    progress: 'Leitner-Boxen',
    nextDue: 'Nächste Wiederholung',
    emptyTitle: 'Noch keine Flashcards fällig.',
    emptyText: 'Lies zuerst Flashcards aus einem Thema oder warte bis zum nächsten Wiederholungsdatum.',
    tableCard: 'Karte',
    tableBox: 'Box',
    tableDue: 'Fällig',
    tableStatus: 'Status',
    reset: 'Fortschritt löschen',
    resetAsk: 'Möchtest du wirklich den lokalen Flashcard-Fortschritt löschen?',
    open: 'Öffnen →',
    active: 'aktiv',
    done: 'gelernt',
    cards: 'Karten',
  },
  en: {
    kicker: 'Leitner system',
    title: 'Flashcards',
    lead: 'All flashcards you have already studied are collected here and reviewed using the classic Leitner system. Your progress is stored locally in this browser.',
    due: 'Due today',
    studied: 'Studied cards',
    mastered: 'Completed',
    weak: 'Back in box 1',
    startReview: 'Start review',
    addNew: 'Add new flashcards',
    addLead: 'Choose a topic like in the Learn menu. When you study cards, they are automatically added to your flashcard management.',
    progress: 'Leitner boxes',
    nextDue: 'Next review',
    emptyTitle: 'No flashcards are due.',
    emptyText: 'Study cards from a topic first or wait until the next review date.',
    tableCard: 'Card',
    tableBox: 'Box',
    tableDue: 'Due',
    tableStatus: 'Status',
    reset: 'Delete progress',
    resetAsk: 'Do you really want to delete local flashcard progress?',
    open: 'Open →',
    active: 'active',
    done: 'learned',
    cards: 'cards',
  },
  fa: {
    kicker: 'سیستم لایتنر',
    title: 'فلش‌کارت‌ها',
    lead: 'اینجا همه فلش‌کارت‌هایی که خوانده شده‌اند به صورت خودکار جمع می‌شوند و با سیستم قدیمی لایتنر مرور می‌شوند. اطلاعات فقط در همین مرورگر ذخیره می‌شود.',
    due: 'امروز برای مرور',
    studied: 'کارت‌های خوانده‌شده',
    mastered: 'تمام‌شده',
    weak: 'برگشته به جعبه ۱',
    startReview: 'شروع مرور',
    addNew: 'اضافه کردن فلش‌کارت جدید',
    addLead: 'مثل منوی Lernen یک موضوع را انتخاب کن. هنگام خواندن، کارت‌ها خودکار وارد مدیریت فلش‌کارت می‌شوند.',
    progress: 'جعبه‌های لایتنر',
    nextDue: 'مرور بعدی',
    emptyTitle: 'فعلاً فلش‌کارتی برای مرور نیست.',
    emptyText: 'اول از یک موضوع فلش‌کارت بخوان یا تا زمان مرور بعدی صبر کن.',
    tableCard: 'کارت',
    tableBox: 'جعبه',
    tableDue: 'زمان مرور',
    tableStatus: 'وضعیت',
    reset: 'حذف پیشرفت',
    resetAsk: 'آیا واقعاً می‌خواهی پیشرفت فلش‌کارت‌ها از حافظه مرورگر پاک شود؟',
    open: 'باز کردن ←',
    active: 'فعال',
    done: 'یادگرفته‌شده',
    cards: 'کارت',
  },
}

function localize(value, lang) {
  if (!value) return ''
  return value[lang] || value.de || ''
}

export default function FlashcardsPage() {
  const { lang } = useLanguage()
  const t = TEXT[lang] || TEXT.de
  const isRTL = lang === 'fa'
  const withLang = (href) => lang === 'de' ? href : `${href}?lang=${lang}`
  const [state, setState] = useState({})

  const refresh = () => setState(loadLeitnerState())

  useEffect(() => {
    refresh()
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])

  const records = useMemo(() => Object.values(state), [state])
  const dueRecords = useMemo(() => records.filter(isDue), [records])
  const mastered = records.filter(r => r.status === 'mastered').length
  const weak = records.filter(r => r.status !== 'mastered' && r.box === 1 && (r.wrongCount || 0) > 0).length
  const nextDue = records
    .filter(r => r.status !== 'mastered' && r.dueAt)
    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))[0]

  const boxCounts = LEITNER_STEPS.map(step => ({
    ...step,
    count: records.filter(r => r.status !== 'mastered' && r.box === step.box).length,
  }))

  const studiedRows = records
    .map(record => ({ record, card: getCardById(record.id) }))
    .filter(row => row.card)
    .sort((a, b) => new Date(a.record.dueAt || '2999-01-01') - new Date(b.record.dueAt || '2999-01-01'))
    .slice(0, 10)

  const reset = () => {
    if (window.confirm(t.resetAsk)) {
      resetLeitnerState()
      refresh()
    }
  }

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={styles.inner}>
        <section className={styles.hero}>
          <div>
            <span className={styles.kicker}>{t.kicker}</span>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.lead}>{t.lead}</p>
            <div className={styles.actions}>
              <Link href={withLang('/flashcards/review')} className={styles.primaryBtn}>🧠 {t.startReview}</Link>
              <button type="button" className={styles.dangerBtn} onClick={reset}>🗑️ {t.reset}</button>
            </div>
          </div>
          <div className={styles.heroPanel}>
            <strong>{nextDue ? formatDueDate(nextDue, lang) : '—'}</strong>
            <span>{t.nextDue}</span>
          </div>
        </section>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}><strong>{dueRecords.length}</strong><span>{t.due}</span></div>
          <div className={styles.statCard}><strong>{records.length}</strong><span>{t.studied}</span></div>
          <div className={styles.statCard}><strong>{mastered}</strong><span>{t.mastered}</span></div>
          <div className={styles.statCard}><strong>{weak}</strong><span>{t.weak}</span></div>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>{t.addNew}</h2>
              <p className={styles.sectionSub}>{t.addLead}</p>
            </div>
          </div>
          <div className={styles.topicGrid}>
            {FLASHCARD_TOPICS.map(topic => (
              <Link key={topic.id} href={withLang(topic.href)} className={styles.topicCard}>
                <span className={styles.topicIcon}>{topic.icon}</span>
                <span className={styles.topicText}>
                  <strong>{localize(topic.title, lang)}</strong>
                  <small>{topic.area} · {topic.chapter} · {FLASHCARDS.filter(card => card.topicId === topic.id).length} {t.cards}</small>
                  <small>{localize(topic.subtitle, lang)}</small>
                </span>
                <span className={styles.topicArrow}>{t.open}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>{t.progress}</h2>
              <p className={styles.sectionSub}>1 Tag → 3 Tage → 7 Tage → 14 Tage → 30 Tage → 3 / 6 / 12 Monate</p>
            </div>
          </div>
          <div className={styles.boxGrid}>
            {boxCounts.map(box => (
              <div key={box.box} className={styles.boxCard}>
                <strong>{box.count}</strong>
                <span>{box.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>{t.due}</h2>
              <p className={styles.sectionSub}>{records.length ? t.studied : t.emptyText}</p>
            </div>
            {dueRecords.length > 0 && <Link href={withLang('/flashcards/review')} className={styles.secondaryBtn}>{t.startReview}</Link>}
          </div>

          {studiedRows.length === 0 ? (
            <div className={styles.empty}><strong>{t.emptyTitle}</strong><br />{t.emptyText}</div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.listTable}>
                <thead>
                  <tr>
                    <th>{t.tableCard}</th>
                    <th>{t.tableBox}</th>
                    <th>{t.tableDue}</th>
                    <th>{t.tableStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {studiedRows.map(({ record, card }) => (
                    <tr key={record.id}>
                      <td>{localize(card.front, lang)}</td>
                      <td>{record.status === 'mastered' ? '✓' : record.box}</td>
                      <td>{formatDueDate(record, lang)}</td>
                      <td>{record.status === 'mastered' ? t.done : t.active}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
