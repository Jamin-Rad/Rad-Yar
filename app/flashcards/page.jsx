'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { FLASHCARD_TOPICS, FLASHCARDS, getCardById, getFlashcardTopic } from '@/data/flashcards'
import { LEITNER_STEPS, formatDueDate, isDue, loadLeitnerState, getBoxLabel } from '@/utils/leitnerStorage'
import { loadSettings } from '@/utils/settingsStorage'
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
    addNew: 'Neue Flashcards hinzufügen',
    addLead: 'Wähle wie im Lernen-Menü ein Thema. Beim Lesen werden die Karten automatisch in deine Flashcard-Verwaltung übernommen.',
    tocTitle: 'Inhaltsverzeichnis durchsuchen',
    tocSub: 'Wähle ein Fachgebiet und Thema im Lernen-Bereich. Beim Durcharbeiten der Flashcards eines Themas werden die Karten automatisch hier in deiner Verwaltung gesammelt.',
    tocCta: 'Zum Inhaltsverzeichnis →',
    progress: 'Leitner-Boxen',
    progressHint: 'Klicke auf eine Box, um Hauptgruppen zu sehen und ohne Zählung zu üben.',
    dueInBox: 'fällig',
    inactiveBox: 'Inaktiv',
    activateInProfile: 'Im Profil aktivieren →',
    open: 'Öffnen →',
    cards: 'Karten',
    boxModalTitle: 'Karten in',
    boxModalLead: 'Hauptgruppen in dieser Leitner-Box. Die Übung hier verändert keinen Fortschritt und wird nicht gezählt.',
    mainGroups: 'Hauptgruppen',
    cardsInBox: 'Karten in dieser Box',
    practiceNoCount: 'Ohne Zählung wiederholen',
    close: 'Schließen',
    noCardsInBox: 'In dieser Box sind aktuell keine Karten.',
  },
  en: {
    kicker: 'Leitner system',
    title: 'Flashcards',
    lead: 'All flashcards you have already studied are collected here and reviewed using the classic Leitner system. Your progress is stored locally in this browser.',
    due: 'Due today',
    studied: 'Studied cards',
    mastered: 'Completed',
    weak: 'Back in box 1',
    addNew: 'Add new flashcards',
    addLead: 'Choose a topic like in the Learn menu. When you study cards, they are automatically added to your flashcard management.',
    tocTitle: 'Browse the table of contents',
    tocSub: 'Pick a specialty and topic in the Learn section. While working through a topic\'s flashcards, the cards are automatically collected here in your management.',
    tocCta: 'Go to table of contents →',
    progress: 'Leitner boxes',
    progressHint: 'Click a box to see main groups and practice without counting.',
    dueInBox: 'due',
    inactiveBox: 'Inactive',
    activateInProfile: 'Enable in profile →',
    open: 'Open →',
    cards: 'cards',
    boxModalTitle: 'Cards in',
    boxModalLead: 'Main groups in this Leitner box. Practice here does not change progress and is not counted.',
    mainGroups: 'Main groups',
    cardsInBox: 'Cards in this box',
    practiceNoCount: 'Review without counting',
    close: 'Close',
    noCardsInBox: 'There are currently no cards in this box.',
  },
  fa: {
    kicker: 'سیستم لایتنر',
    title: 'فلش‌کارت‌ها',
    lead: 'اینجا همه فلش‌کارت‌هایی که خوانده شده‌اند به صورت خودکار جمع می‌شوند و با سیستم قدیمی لایتنر مرور می‌شوند. اطلاعات فقط در همین مرورگر ذخیره می‌شود.',
    due: 'امروز برای مرور',
    studied: 'کارت‌های خوانده‌شده',
    mastered: 'تمام‌شده',
    weak: 'برگشته به جعبه ۱',
    addNew: 'اضافه کردن فلش‌کارت جدید',
    addLead: 'مثل منوی Lernen یک موضوع را انتخاب کن. هنگام خواندن، کارت‌ها خودکار وارد مدیریت فلش‌کارت می‌شوند.',
    tocTitle: 'مرور فهرست مطالب',
    tocSub: 'یک تخصص و موضوع را در بخش Lernen انتخاب کن. هنگام مرور فلش‌کارت‌های یک موضوع، کارت‌ها خودکار اینجا در مدیریت تو جمع می‌شوند.',
    tocCta: 'به فهرست مطالب ←',
    progress: 'جعبه‌های لایتنر',
    progressHint: 'روی یک جعبه بزن تا گروه‌های اصلی را ببینی و بدون شمارش تمرین کنی.',
    dueInBox: 'مقرر',
    inactiveBox: 'غیرفعال',
    activateInProfile: 'فعال‌سازی در پروفایل ←',
    open: 'باز کردن ←',
    cards: 'کارت',
    boxModalTitle: 'کارت‌های',
    boxModalLead: 'گروه‌های اصلی این جعبه لایتنر. تمرین از اینجا پیشرفت را تغییر نمی‌دهد و شمارش نمی‌شود.',
    mainGroups: 'گروه‌های اصلی',
    cardsInBox: 'کارت‌های این جعبه',
    practiceNoCount: 'مرور بدون شمارش',
    close: 'بستن',
    noCardsInBox: 'در این جعبه فعلاً کارتی وجود ندارد.',
  },
}

function localize(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || ''
}

function firstPracticeHref(cards, box, lang) {
  const topicId = cards[0]?.topicId || 'meniskus'
  const base = `/flashcards/${topicId}?mode=practice&box=${box}`
  return lang === 'de' ? base : `${base}&lang=${lang}`
}

export default function FlashcardsPage() {
  const { lang } = useLanguage()
  const { userId } = useAuth()
  const t = TEXT[lang] || TEXT.de
  const isRTL = lang === 'fa'
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const [state, setState] = useState({})
  const [settings, setSettings] = useState({ longBoxesEnabled: false })
  const [selectedBox, setSelectedBox] = useState(null)

  const refresh = () => {
    setState(loadLeitnerState(userId))
    setSettings(loadSettings())
  }

  useEffect(() => {
    refresh()
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const records = useMemo(() => Object.values(state), [state])
  const validRows = useMemo(() => records
    .map(record => ({ record, card: getCardById(record.id) }))
    .filter(row => row.card), [records])

  const dueRecords = useMemo(() => records.filter(isDue), [records])
  const mastered = records.filter(r => r.status === 'mastered').length
  const weak = records.filter(r => r.status !== 'mastered' && r.box === 1 && (r.wrongCount || 0) > 0).length

  const boxCounts = LEITNER_STEPS.map(step => {
    const boxRecords = records.filter(r => r.status !== 'mastered' && r.box === step.box)
    return {
      ...step,
      count: boxRecords.length,
      due: boxRecords.filter(isDue).length,
    }
  })

  const selectedBoxCards = useMemo(() => {
    if (!selectedBox) return []
    return validRows.filter(({ record }) => record.status !== 'mastered' && record.box === selectedBox.box)
  }, [selectedBox, validRows])

  const selectedBoxGroups = useMemo(() => {
    const map = new Map()
    selectedBoxCards.forEach(({ card }) => {
      const label = localize(card.category, lang) || '—'
      map.set(label, (map.get(label) || 0) + 1)
    })
    return [...map.entries()].map(([label, count]) => ({ label, count }))
  }, [selectedBoxCards, lang])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={styles.inner}>
        <section className={styles.hero}>
          <div>
            <span className={styles.kicker}>{t.kicker}</span>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.lead}>{t.lead}</p>
          </div>
          <div className={styles.heroPanel}>
            <strong>{dueRecords.length}</strong>
            <span>{t.due}</span>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>{t.progress}</h2>
              <p className={styles.sectionSub}>{t.progressHint}</p>
            </div>
          </div>
          <div className={styles.boxGrid}>
            {boxCounts.map(box => {
              const locked = box.box > 5 && !settings.longBoxesEnabled
              if (locked) {
                return (
                  <div key={box.box} className={`${styles.boxCard} ${styles.boxCardLocked}`}>
                    <strong className={styles.boxCardLockIcon}>🔒</strong>
                    <span>{getBoxLabel(box.box, lang)}</span>
                    <small className={styles.boxInactiveLabel}>{t.inactiveBox}</small>
                    <Link href={withLang('/profil#settings')} className={styles.boxCardUnlockLink}>{t.activateInProfile}</Link>
                  </div>
                )
              }
              return (
                <button key={box.box} type="button" className={styles.boxCard} onClick={() => setSelectedBox(box)}>
                  <strong>{box.count}</strong>
                  <span>{getBoxLabel(box.box, lang)}</span>
                  {box.due > 0 && <small className={styles.boxDue}>{box.due} {t.dueInBox}</small>}
                </button>
              )
            })}
          </div>
        </section>

        <div className={styles.statsGrid}>
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
            <Link href={withLang('/lernen')} className={`${styles.topicCard} ${styles.topicCardLarge} ${styles.tocCard}`}>
              <span className={styles.topicIcon}>📚</span>
              <span className={styles.topicText}>
                <strong>{t.tocTitle}</strong>
                <small>{t.tocSub}</small>
              </span>
              <span className={styles.topicArrow}>{t.tocCta}</span>
            </Link>
            {FLASHCARD_TOPICS.map(topic => (
              <Link key={topic.id} href={withLang(topic.href)} className={`${styles.topicCard} ${styles.topicCardLarge}`}>
                <span className={styles.topicIcon}>
                  {topic.iconImage ? <Image src={topic.iconImage} alt={localize(topic.title, lang)} width={54} height={54} style={{ objectFit: 'contain' }} /> : topic.icon}
                </span>
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
      </div>

      {selectedBox && (
        <div className={styles.boxModalOverlay} onClick={() => setSelectedBox(null)}>
          <div className={styles.boxModal} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.boxModalClose} onClick={() => setSelectedBox(null)} aria-label={t.close}>×</button>
            <div className={styles.boxModalHeader}>
              <span className={styles.kicker}>{t.boxModalTitle} {getBoxLabel(selectedBox.box, lang)}</span>
              <h2>{getBoxLabel(selectedBox.box, lang)}</h2>
              <p>{t.boxModalLead}</p>
            </div>

            {selectedBoxCards.length === 0 ? (
              <div className={styles.empty}>{t.noCardsInBox}</div>
            ) : (
              <>
                <div className={styles.groupPreviewBlock}>
                  <strong>{t.mainGroups}</strong>
                  <div className={styles.groupPills}>
                    {selectedBoxGroups.map(group => (
                      <span key={group.label} className={styles.groupPill}>{group.label} · {group.count}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.boxCardList}>
                  <strong>{t.cardsInBox}</strong>
                  {selectedBoxCards.slice(0, 8).map(({ card, record }) => {
                    const topic = getFlashcardTopic(card.topicId)
                    return (
                      <div key={card.id} className={styles.boxCardRow}>
                        <span>{localize(card.category, lang)}</span>
                        <p>{localize(card.front, lang)}</p>
                        <small>{localize(topic?.title, lang)} · {formatDueDate(record, lang)}</small>
                      </div>
                    )
                  })}
                </div>

                <Link href={firstPracticeHref(selectedBoxCards.map(row => row.card), selectedBox.box, lang)} className={styles.practiceBtn}>
                  🧠 {t.practiceNoCount}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
