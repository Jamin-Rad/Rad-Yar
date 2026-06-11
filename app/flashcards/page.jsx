'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { FLASHCARD_TOPICS, FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import { CURRICULUM, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
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
    dueClickHint: 'Klicken zum Lernen (zufällige Reihenfolge)',
    addNew: 'Neue Flashcards hinzufügen',
    addLead: 'Wähle ein Kapitel – im Pop-up siehst du alle Themen dieses Kapitels, die bereits Flashcards haben.',
    progress: 'Leitner-Boxen',
    progressHint: 'Klicke auf eine Box, um die heute fälligen Karten zu lernen.',
    dueInBox: 'fällig',
    inactiveBox: 'Inaktiv',
    open: 'Öffnen →',
    cards: 'Karten',
    topicSingular: 'Thema',
    topicPlural: 'Themen',
    chapterModalLead: 'Themen in diesem Kapitel mit verfügbaren Flashcards.',
    noFlashcardsYet: 'Noch keine Flashcards in diesem Kapitel.',
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
    dueClickHint: 'Click to learn (random order)',
    addNew: 'Add new flashcards',
    addLead: 'Pick a chapter – the pop-up shows all topics in that chapter that already have flashcards.',
    progress: 'Leitner boxes',
    progressHint: 'Click a box to learn the cards due today.',
    dueInBox: 'due',
    inactiveBox: 'Inactive',
    open: 'Open →',
    cards: 'cards',
    topicSingular: 'topic',
    topicPlural: 'topics',
    chapterModalLead: 'Topics in this chapter with available flashcards.',
    noFlashcardsYet: 'No flashcards in this chapter yet.',
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
    dueClickHint: 'برای یادگیری کلیک کن (ترتیب تصادفی)',
    addNew: 'اضافه کردن فلش‌کارت جدید',
    addLead: 'یک فصل را انتخاب کن — در پنجره بازشده همه موضوعات این فصل که فلش‌کارت دارند نشان داده می‌شوند.',
    progress: 'جعبه‌های لایتنر',
    progressHint: 'روی یک جعبه بزن تا کارت‌های امروزِ آن را یاد بگیری.',
    dueInBox: 'مقرر',
    inactiveBox: 'غیرفعال',
    open: 'باز کردن ←',
    cards: 'کارت',
    topicSingular: 'موضوع',
    topicPlural: 'موضوع',
    chapterModalLead: 'موضوعات این فصل که فلش‌کارت دارند.',
    noFlashcardsYet: 'هنوز فلش‌کارتی در این فصل نیست.',
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

// Sammelt alle Themen (+ Unterthemen) eines Kapitels, die bereits Flashcards haben
function flashcardThemenInKapitel(kapitel) {
  const items = []
  kapitel.themen.forEach(thema => {
    if (thema.flashcardLink) items.push(thema)
    ;(thema.sub || []).forEach(sub => { if (sub.flashcardLink) items.push(sub) })
  })
  return items
}

// Entfernt führende Kapitel-Nummern wie "3. " – wie auf der Lektion-Seite
function withoutLeadingNumber(title) {
  return title.replace(/^[\d۰-۹٠-٩]+[.)،.]?\s*/, '')
}

// Gruppiert Themen anhand thema.group – wie auf der Lektion-Seite
function groupFlashcardThemen(themen) {
  const sections = []
  let current = null
  for (const th of themen) {
    const key = th.group ? th.group.join(' / ') : ''
    if (!current || current.key !== key) {
      current = { key, items: [] }
      sections.push(current)
    }
    current.items.push(th)
  }
  return sections
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
    return CURRICULUM
      .filter(fach => fach.kapitel.length > 0)
      .map(fach => ({
        fach,
        kapitel: fach.kapitel.map(kapitel => {
          const flashThemen = flashcardThemenInKapitel(kapitel)
          const cardCount = flashThemen.reduce((sum, th) => {
            const topic = FLASHCARD_TOPICS.find(ft => ft.href === th.flashcardLink)
            return sum + (topic ? FLASHCARDS.filter(c => c.topicId === topic.id).length : 0)
          }, 0)
          return { kapitel, themenCount: flashThemen.length, cardCount }
        }),
      }))
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
          {dueRemaining > 0 ? (
            <Link href={withLang('/flashcards/faellig')} className={`${styles.heroPanel} ${styles.heroPanelClickable}`} title={t.dueClickHint}>
              <div className={styles.heroPanelStat}>
                <strong>{dueTotal}</strong>
                <span>{t.due}</span>
              </div>
              <div className={styles.heroPanelDivider} />
              <div className={styles.heroPanelStat}>
                <strong>{dueRemaining}</strong>
                <span>{t.dueRemaining}</span>
              </div>
            </Link>
          ) : (
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
          )}
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
          {chapterGroups.map(({ fach, kapitel }) => (
            <div key={fach.id} className={styles.fachGroup}>
              <h3 className={styles.fachGroupTitle}>
                <span className={styles.fachGroupIcon}>{fach.icon}</span>
                {getFachTitle(fach, lang)}
              </h3>
              <div className={styles.topicGrid}>
                {kapitel.map(({ kapitel: k, themenCount, cardCount }) => (
                  <button key={k.id} type="button" className={`${styles.topicCard} ${styles.topicCardLarge} ${styles.topicCardBtn}`} onClick={() => setSelectedChapter({ fach, kapitel: k })}>
                    <span className={styles.topicIcon}>{k.icon || fach.icon}</span>
                    <span className={styles.topicText}>
                      <strong>{withoutLeadingNumber(getKapitelTitle(k, lang))}</strong>
                      <small>
                        {themenCount > 0
                          ? `${themenCount} ${themenCount === 1 ? t.topicSingular : t.topicPlural} · ${cardCount} ${t.cards}`
                          : t.noFlashcardsYet}
                      </small>
                    </span>
                    <span className={styles.topicArrow}>{t.open}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
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

      {selectedChapter && (() => {
        const sections = groupFlashcardThemen(flashcardThemenInKapitel(selectedChapter.kapitel))
        return (
          <div className={styles.boxModalOverlay} onClick={() => setSelectedChapter(null)}>
            <div className={styles.boxModal} onClick={event => event.stopPropagation()}>
              <button type="button" className={styles.boxModalClose} onClick={() => setSelectedChapter(null)} aria-label={t.close}>×</button>
              <div className={styles.boxModalHeader}>
                <span className={styles.kicker}>{getFachTitle(selectedChapter.fach, lang)}</span>
                <h2>{withoutLeadingNumber(getKapitelTitle(selectedChapter.kapitel, lang))}</h2>
                <p>{t.chapterModalLead}</p>
              </div>

              {sections.length === 0 ? (
                <div className={styles.empty}>{t.noFlashcardsYet}</div>
              ) : (
                <div className={styles.modalSections}>
                  {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      {section.key && <div className={styles.modalGroupHeading}>{section.key}</div>}
                      <div className={styles.dueTopicList}>
                        {section.items.map(thema => {
                          const topic = FLASHCARD_TOPICS.find(ft => ft.href === thema.flashcardLink)
                          if (!topic) return null
                          return (
                            <Link key={thema.id} href={withLang(topic.href)} className={styles.dueTopicRow}>
                              <span className={styles.dueTopicInfo}>
                                <strong>{getThemaTitle(thema, lang)}</strong>
                                <small>{FLASHCARDS.filter(c => c.topicId === topic.id).length} {t.cards}</small>
                              </span>
                              <span className={styles.topicArrow}>{t.open}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })()}
    </main>
  )
}
