'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { FLASHCARD_TOPICS, FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import { LEITNER_STEPS, isDue, loadLeitnerState, getBoxLabel, getBoxInterval } from '@/utils/leitnerStorage'
import { loadSettings } from '@/utils/settingsStorage'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const TEXT = {
  de: {
    kicker: 'Leitner-System',
    title: 'Flashcards',
    lead: 'Hier werden alle bereits gelesenen Flashcards automatisch gesammelt und nach dem klassischen Leitner-System wiederholt. Die Daten bleiben lokal in deinem Browser gespeichert.',
    due: 'Heute fällig',
    dueRemaining: 'noch zu lernen',
    addNew: 'Neue Flashcards hinzufügen',
    addLead: 'Wähle ein Kapitel und darin ein verfügbares Thema – die Flashcards öffnen sich direkt hier, nicht im Lernen-Bereich.',
    progress: 'Leitner-Boxen',
    progressHint: 'Klicke auf eine Box, um die heute fälligen Karten zu lernen.',
    dueInBox: 'fällig',
    inactiveBox: 'Inaktiv',
    open: 'Öffnen →',
    cards: 'Karten',
    topicSingular: 'Thema',
    topicPlural: 'Themen',
    chapterModalLead: 'Verfügbare Themen in diesem Kapitel.',
    boxModalLead: 'Heute fällige Karten in dieser Box.',
    noDueInBox: 'Keine fälligen Karten heute in dieser Box. ✓',
    learnNow: 'Jetzt lernen →',
    close: 'Schließen',
  },
  en: {
    kicker: 'Leitner system',
    title: 'Flashcards',
    lead: 'All flashcards you have already studied are collected here and reviewed using the classic Leitner system. Your progress is stored locally in this browser.',
    due: 'Due today',
    dueRemaining: 'still to learn',
    addNew: 'Add new flashcards',
    addLead: 'Pick a chapter, then an available topic inside it – the flashcards open directly here, not in the Learn section.',
    progress: 'Leitner boxes',
    progressHint: 'Click a box to learn the cards due today.',
    dueInBox: 'due',
    inactiveBox: 'Inactive',
    open: 'Open →',
    cards: 'cards',
    topicSingular: 'topic',
    topicPlural: 'topics',
    chapterModalLead: 'Available topics in this chapter.',
    boxModalLead: 'Cards due today in this box.',
    noDueInBox: 'No cards due today in this box. ✓',
    learnNow: 'Learn now →',
    close: 'Close',
  },
  fa: {
    kicker: 'سیستم لایتنر',
    title: 'فلش‌کارت‌ها',
    lead: 'اینجا همه فلش‌کارت‌هایی که خوانده شده‌اند به صورت خودکار جمع می‌شوند و با سیستم قدیمی لایتنر مرور می‌شوند. اطلاعات فقط در همین مرورگر ذخیره می‌شود.',
    due: 'امروز برای مرور',
    dueRemaining: 'هنوز یاد نگرفته',
    addNew: 'اضافه کردن فلش‌کارت جدید',
    addLead: 'یک فصل و سپس یک موضوع موجود در آن را انتخاب کن — فلش‌کارت‌ها همین‌جا باز می‌شوند، نه در بخش Lernen.',
    progress: 'جعبه‌های لایتنر',
    progressHint: 'روی یک جعبه بزن تا کارت‌های امروزِ آن را یاد بگیری.',
    dueInBox: 'مقرر',
    inactiveBox: 'غیرفعال',
    open: 'باز کردن ←',
    cards: 'کارت',
    topicSingular: 'موضوع',
    topicPlural: 'موضوع',
    chapterModalLead: 'موضوعات موجود در این فصل.',
    boxModalLead: 'کارت‌های امروزِ این جعبه.',
    noDueInBox: 'امروز کارتی در این جعبه برای مرور نیست. ✓',
    learnNow: 'الان یاد بگیر ←',
    close: 'بستن',
  },
}

function localize(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || ''
}

const todayStart = () => {
  const d = new Date(); d.setHours(0, 0, 0, 0); return d
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
  const [selectedChapter, setSelectedChapter] = useState(null)

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

  const dueRecords = useMemo(() => records.filter(isDue), [records])
  const reviewedTodayCount = useMemo(() => {
    const start = todayStart().getTime()
    return records.filter(r => r.lastReviewedAt && new Date(r.lastReviewedAt).getTime() >= start).length
  }, [records])
  const dueRemaining = dueRecords.length
  const dueTotal = dueRemaining + reviewedTodayCount

  const boxCounts = LEITNER_STEPS.map(step => {
    const boxRecords = records.filter(r => r.status !== 'mastered' && r.box === step.box)
    return {
      ...step,
      count: boxRecords.length,
      due: boxRecords.filter(isDue).length,
    }
  })

  const selectedBoxDueByTopic = useMemo(() => {
    if (!selectedBox) return []
    const map = new Map()
    records
      .filter(r => r.status !== 'mastered' && r.box === selectedBox.box && isDue(r))
      .forEach(record => {
        const card = FLASHCARDS.find(c => c.id === record.id)
        if (!card) return
        const topic = getFlashcardTopic(card.topicId)
        if (!topic) return
        if (!map.has(topic.id)) map.set(topic.id, { topic, count: 0 })
        map.get(topic.id).count += 1
      })
    return [...map.values()]
  }, [selectedBox, records])

  const chapterGroups = useMemo(() => {
    const map = new Map()
    FLASHCARD_TOPICS.forEach(topic => {
      const key = `${topic.area}__${topic.chapter}`
      if (!map.has(key)) {
        map.set(key, {
          key,
          area: topic.area,
          chapter: topic.chapter,
          icon: topic.icon,
          iconImage: topic.iconImage,
          topics: [],
        })
      }
      map.get(key).topics.push(topic)
    })
    return [...map.values()]
  }, [])

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
            <div className={styles.heroPanelStat}>
              <strong>{dueTotal}</strong>
              <span>{t.due}</span>
            </div>
            <div className={styles.heroPanelDivider} />
            <div className={styles.heroPanelStat}>
              <strong>{dueRemaining}</strong>
              <span>{t.dueRemaining}</span>
            </div>
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
              const interval = getBoxInterval(box.box, lang)
              if (locked) {
                return (
                  <div key={box.box} className={`${styles.boxCard} ${styles.boxCardLocked}`}>
                    <div className={styles.boxCardTitle}>
                      <strong className={styles.boxCardLockIcon}>🔒</strong>
                      <strong>{getBoxLabel(box.box, lang)}</strong>
                    </div>
                    <span className={styles.boxInactiveLabel}>{t.inactiveBox}</span>
                  </div>
                )
              }
              return (
                <button key={box.box} type="button" className={styles.boxCard} onClick={() => setSelectedBox(box)}>
                  <div className={styles.boxCardTitle}>
                    <strong>{getBoxLabel(box.box, lang)}</strong>
                    {interval && <span className={styles.boxCardMeaning}>({interval})</span>}
                  </div>
                  <span className={`${styles.boxDue} ${box.due === 0 ? styles.boxDueZero : ''}`}>{box.due} {t.dueInBox}</span>
                  <span className={styles.boxTotal}>{box.count} {t.cards}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>{t.addNew}</h2>
              <p className={styles.sectionSub}>{t.addLead}</p>
            </div>
          </div>
          <div className={styles.topicGrid}>
            {chapterGroups.map(group => {
              const cardCount = group.topics.reduce((sum, topic) => sum + FLASHCARDS.filter(c => c.topicId === topic.id).length, 0)
              return (
                <button key={group.key} type="button" className={`${styles.topicCard} ${styles.topicCardLarge} ${styles.topicCardBtn}`} onClick={() => setSelectedChapter(group)}>
                  <span className={styles.topicIcon}>
                    {group.iconImage ? <Image src={group.iconImage} alt={group.chapter} width={54} height={54} style={{ objectFit: 'contain' }} /> : group.icon}
                  </span>
                  <span className={styles.topicText}>
                    <strong>{group.chapter}</strong>
                    <small>{group.area} · {group.topics.length} {group.topics.length === 1 ? t.topicSingular : t.topicPlural} · {cardCount} {t.cards}</small>
                  </span>
                  <span className={styles.topicArrow}>{t.open}</span>
                </button>
              )
            })}
          </div>
        </section>
      </div>

      {selectedBox && (
        <div className={styles.boxModalOverlay} onClick={() => setSelectedBox(null)}>
          <div className={styles.boxModal} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.boxModalClose} onClick={() => setSelectedBox(null)} aria-label={t.close}>×</button>
            <div className={styles.boxModalHeader}>
              <span className={styles.kicker}>
                {getBoxLabel(selectedBox.box, lang)}
                {getBoxInterval(selectedBox.box, lang) ? ` · ${getBoxInterval(selectedBox.box, lang)}` : ''}
              </span>
              <h2>{getBoxLabel(selectedBox.box, lang)}</h2>
              <p>{t.boxModalLead}</p>
            </div>

            {selectedBoxDueByTopic.length === 0 ? (
              <div className={styles.empty}>{t.noDueInBox}</div>
            ) : (
              <div className={styles.dueTopicList}>
                {selectedBoxDueByTopic.map(({ topic, count }) => (
                  <Link key={topic.id} href={withLang(`/flashcards/${topic.id}?box=${selectedBox.box}`)} className={styles.dueTopicRow}>
                    <span className={styles.dueTopicInfo}>
                      <strong>{localize(topic.title, lang)}</strong>
                      <small>{count} {t.dueInBox}</small>
                    </span>
                    <span className={styles.topicArrow}>{t.learnNow}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedChapter && (
        <div className={styles.boxModalOverlay} onClick={() => setSelectedChapter(null)}>
          <div className={styles.boxModal} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.boxModalClose} onClick={() => setSelectedChapter(null)} aria-label={t.close}>×</button>
            <div className={styles.boxModalHeader}>
              <span className={styles.kicker}>{selectedChapter.area}</span>
              <h2>{selectedChapter.chapter}</h2>
              <p>{t.chapterModalLead}</p>
            </div>

            <div className={styles.dueTopicList}>
              {selectedChapter.topics.map(topic => (
                <Link key={topic.id} href={withLang(topic.href)} className={styles.dueTopicRow}>
                  <span className={styles.dueTopicInfo}>
                    <strong>{localize(topic.title, lang)}</strong>
                    <small>{localize(topic.subtitle, lang)} · {FLASHCARDS.filter(c => c.topicId === topic.id).length} {t.cards}</small>
                  </span>
                  <span className={styles.topicArrow}>{t.open}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
