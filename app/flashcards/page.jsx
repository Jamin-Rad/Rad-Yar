'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { FLASHCARD_TOPICS, FLASHCARDS, getFlashcardTopic } from '@/data/flashcards'
import { CURRICULUM, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import { LEITNER_STEPS, isDue, loadLeitnerState, filterLeitnerState, getBoxLabel, getBoxInterval, pullLeitnerStateFromServer } from '@/utils/leitnerStorage'
import { loadSettings } from '@/utils/settingsStorage'
import { useLanguage } from '@/providers/LanguageProvider'
import { hasFullAccess, isFlashcardTrialActive, FREE_TOPIC_LIMIT } from '@/utils/subscription'
import styles from './page.module.css'

const TEXT = {
  de: {
    kicker: 'Leitner-System',
    title: 'Flashcards',
    lead: 'Hier werden alle bereits gelesenen Flashcards automatisch gesammelt und nach dem klassischen Leitner-System wiederholt. Die Daten bleiben lokal in deinem Browser gespeichert.',
    due: 'Heute fällig',
    reviewedToday: 'heute wiederholt',
    dueClickHint: 'Klicken zum Lernen (zufällige Reihenfolge)',
    addNew: 'Neue Flashcards hinzufügen',
    addLead: 'Wähle ein Fachgebiet, dann ein Kapitel mit verfügbaren Lektionen – im Pop-up siehst du die Themen.',
    progress: 'Leitner-Boxen',
    progressHint: 'Klicke auf eine Box, um die heute fälligen Karten zu lernen.',
    dueInBox: 'fällig',
    inactiveBox: 'Inaktiv',
    open: 'Öffnen →',
    cards: 'Karten',
    topicSingular: 'Thema',
    topicPlural: 'Themen',
    chapterSingular: 'Kapitel',
    chapterPlural: 'Kapitel',
    noChaptersYet: 'Noch nichts verfügbar',
    chapterPickLead: 'Wähle ein Kapitel mit verfügbaren Lektionen.',
    backToChapters: '← Kapitel',
    chapterModalLead: 'Themen in diesem Kapitel – wähle eines mit Flashcards.',
    noFlashcardsYet: 'Noch keine Flashcards',
    boxModalLead: 'Heute fällige Karten in dieser Box.',
    noDueInBox: 'Keine fälligen Karten heute in dieser Box. ✓',
    learnNow: 'Jetzt lernen →',
    close: 'Schließen',
    signInGateTitle: 'Bitte melde dich an, um Flashcards zu lernen',
    signInGateText: 'Ohne Anmeldung kannst du Flashcards direkt über die Lernseiten nutzen (bis zu 5 Karten pro Thema). Melde dich kostenlos an, um dein Leitner-System hier zu verwalten.',
    signIn: 'Anmelden', signUp: 'Registrieren', browseTopics: 'Lerninhalte ansehen',
    dueLockedTitle: 'Wiederholungsfunktion', dueLockedHint: 'Die „Heute fällig"-Wiederholung ist nur mit Abo verfügbar.',
    topicLimitTitle: 'Themenlimit erreicht',
    topicLimitHint: `Kostenlose Konten können bis zu ${FREE_TOPIC_LIMIT} Themen gleichzeitig lernen. Mit Abo unbegrenzt viele Themen.`,
    trialHint: 'Du nutzt gerade den kostenlosen Testzeitraum für Flashcards (10 Tage ab Registrierung). Danach gelten die Limits für kostenlose Konten.',
    upgradeLink: 'Mehr erfahren →',
  },
  en: {
    kicker: 'Leitner system',
    title: 'Flashcards',
    lead: 'All flashcards you have already studied are collected here and reviewed using the classic Leitner system. Your progress is stored locally in this browser.',
    due: 'Due today',
    reviewedToday: 'reviewed today',
    dueClickHint: 'Click to learn (random order)',
    addNew: 'Add new flashcards',
    addLead: 'Choose a specialty, then a chapter with available lessons – the pop-up shows the topics.',
    progress: 'Leitner boxes',
    progressHint: 'Click a box to learn the cards due today.',
    dueInBox: 'due',
    inactiveBox: 'Inactive',
    open: 'Open →',
    cards: 'cards',
    topicSingular: 'topic',
    topicPlural: 'topics',
    chapterSingular: 'chapter',
    chapterPlural: 'chapters',
    noChaptersYet: 'Nothing available yet',
    chapterPickLead: 'Choose a chapter with available lessons.',
    backToChapters: '← Chapters',
    chapterModalLead: 'Topics in this chapter – choose one with flashcards.',
    noFlashcardsYet: 'No flashcards yet',
    boxModalLead: 'Cards due today in this box.',
    noDueInBox: 'No cards due today in this box. ✓',
    learnNow: 'Learn now →',
    close: 'Close',
    signInGateTitle: 'Please sign in to study flashcards',
    signInGateText: 'Without an account you can use flashcards directly from the lesson pages (up to 5 cards per topic). Sign in for free to manage your Leitner system here.',
    signIn: 'Sign in', signUp: 'Sign up', browseTopics: 'Browse lessons',
    dueLockedTitle: 'Review feature', dueLockedHint: 'The "due today" review is only available with a subscription.',
    topicLimitTitle: 'Topic limit reached',
    topicLimitHint: `Free accounts can study up to ${FREE_TOPIC_LIMIT} topics at the same time. With a subscription, unlimited topics.`,
    trialHint: 'You are currently using the free flashcard trial (10 days after registration). After that, the free-account limits apply.',
    upgradeLink: 'Learn more →',
  },
  fa: {
    kicker: 'سیستم لایتنر',
    title: 'فلش‌کارت‌ها',
    lead: 'اینجا همه فلش‌کارت‌هایی که خوانده شده‌اند به صورت خودکار جمع می‌شوند و با سیستم قدیمی لایتنر مرور می‌شوند. اطلاعات فقط در همین مرورگر ذخیره می‌شود.',
    due: 'امروز برای مرور',
    reviewedToday: 'امروز مرور شده',
    dueClickHint: 'برای یادگیری کلیک کن (ترتیب تصادفی)',
    addNew: 'اضافه کردن فلش‌کارت جدید',
    addLead: 'یک تخصص را انتخاب کن، سپس یک فصل با درس‌های موجود — در پنجره بازشده موضوعات نشان داده می‌شوند.',
    progress: 'جعبه‌های لایتنر',
    progressHint: 'روی یک جعبه بزن تا کارت‌های امروزِ آن را یاد بگیری.',
    dueInBox: 'مقرر',
    inactiveBox: 'غیرفعال',
    open: 'باز کردن ←',
    cards: 'کارت',
    topicSingular: 'موضوع',
    topicPlural: 'موضوع',
    chapterSingular: 'فصل',
    chapterPlural: 'فصل',
    noChaptersYet: 'هنوز چیزی موجود نیست',
    chapterPickLead: 'یک فصل با درس‌های موجود انتخاب کن.',
    backToChapters: '← فصل‌ها',
    chapterModalLead: 'موضوعات این فصل — یکی با فلش‌کارت انتخاب کن.',
    noFlashcardsYet: 'هنوز فلش‌کارتی نیست',
    boxModalLead: 'کارت‌های امروزِ این جعبه.',
    noDueInBox: 'امروز کارتی در این جعبه برای مرور نیست. ✓',
    learnNow: 'الان یاد بگیر ←',
    close: 'بستن',
    signInGateTitle: 'برای مطالعه فلش‌کارت‌ها وارد شوید',
    signInGateText: 'بدون ورود می‌توانید از طریق صفحات درسی تا ۵ کارت در هر موضوع استفاده کنید. برای مدیریت سیستم لایتنر خود، رایگان وارد شوید.',
    signIn: 'ورود', signUp: 'ثبت‌نام', browseTopics: 'مشاهده درس‌ها',
    dueLockedTitle: 'قابلیت مرور', dueLockedHint: 'مرور «امروزِ» فقط با اشتراک در دسترس است.',
    topicLimitTitle: 'محدودیت موضوعات',
    topicLimitHint: `حساب‌های رایگان می‌توانند حداکثر ${FREE_TOPIC_LIMIT} موضوع را همزمان مطالعه کنند. با اشتراک، بدون محدودیت.`,
    trialHint: 'شما در حال استفاده از دوره آزمایشی رایگان فلش‌کارت هستید (۱۰ روز پس از ثبت‌نام). پس از آن، محدودیت‌های حساب رایگان اعمال می‌شود.',
    upgradeLink: 'بیشتر بدانید ←',
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

// Ein Thema gilt als "verfügbar", wenn es (oder eine Variante) eine Lektion hat – wie auf der Lektion-Seite
function isAvailable(th) {
  return !!th.link || !!th.sub?.some(s => s.link)
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
  const { user, isLoaded, isSignedIn } = useUser()
  const fullAccess = hasFullAccess(user)
  const trialActive = isFlashcardTrialActive(user)
  const t = TEXT[lang] || TEXT.de
  const isRTL = lang === 'fa'
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const [state, setState] = useState({})
  const [settings, setSettings] = useState({ longBoxesEnabled: false })
  const [selectedBox, setSelectedBox] = useState(null)
  const [picker, setPicker] = useState(null)

  const refresh = () => {
    setState(loadLeitnerState(userId))
    setSettings(loadSettings())
  }

  useEffect(() => {
    refresh()
    if (userId) {
      pullLeitnerStateFromServer(userId).then(state => setState(state))
    }
    const onFocus = () => refresh()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const currentState = useMemo(() => filterLeitnerState(state, FLASHCARDS), [state])
  const records = useMemo(() => Object.values(currentState), [currentState])

  const dueRecords = useMemo(() => records.filter(isDue), [records])
  const reviewedTodayCount = useMemo(() => {
    const start = todayStart().getTime()
    return records.filter(r => r.lastReviewedAt && new Date(r.lastReviewedAt).getTime() >= start).length
  }, [records])
  const dueRemaining = dueRecords.length

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

  // Alle Fachgebiete, je mit den Kapiteln, die mindestens ein verfügbares Thema haben
  const fachEntries = useMemo(() => {
    return CURRICULUM.map(fach => {
      const kapitel = fach.kapitel
        .map(k => ({ kapitel: k, themen: k.themen.filter(isAvailable) }))
        .filter(({ themen }) => themen.length > 0)
      return { fach, kapitel }
    })
  }, [])

  const startedTopicIds = useMemo(() => {
    const set = new Set()
    records.forEach(r => {
      const card = FLASHCARDS.find(c => c.id === r.id)
      if (card) set.add(card.topicId)
    })
    return set
  }, [records])
  const topicLimitReached = isSignedIn && !fullAccess && startedTopicIds.size >= FREE_TOPIC_LIMIT
  const isTopicLocked = (topicId) => topicLimitReached && !startedTopicIds.has(topicId)

  const openFach = (entry) => setPicker({ fach: entry.fach, kapitelList: entry.kapitel, selected: null })
  const openKapitel = (entry) => setPicker(p => ({ ...p, selected: entry }))
  const backToKapitelList = () => setPicker(p => ({ ...p, selected: null }))
  const closePicker = () => setPicker(null)

  if (isLoaded && !isSignedIn) {
    return (
      <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        <div className={styles.inner}>
          <div className={styles.gateBox}>
            <h2>{t.signInGateTitle}</h2>
            <p>{t.signInGateText}</p>
            <div className={styles.gateActions}>
              <Link href={withLang('/sign-in')} className={`${styles.gateBtn} ${styles.gatePrimary}`}>{t.signIn}</Link>
              <Link href={withLang('/sign-up')} className={`${styles.gateBtn} ${styles.gateSecondary}`}>{t.signUp}</Link>
              <Link href={withLang('/lernen')} className={`${styles.gateBtn} ${styles.gateSecondary}`}>{t.browseTopics}</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={styles.inner}>
        <section className={styles.hero}>
          <div>
            <span className={styles.kicker}>{t.kicker}</span>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.lead}>{t.lead}</p>
          </div>
          {dueRemaining > 0 && fullAccess ? (
            <Link href={withLang('/flashcards/faellig')} className={`${styles.heroPanel} ${styles.heroPanelClickable}`} title={t.dueClickHint}>
              <div className={styles.heroPanelStat}>
                <strong>{dueRemaining}</strong>
                <span>{t.due}</span>
              </div>
              <div className={styles.heroPanelDivider} />
              <div className={styles.heroPanelStat}>
                <strong>{reviewedTodayCount}</strong>
                <span>{t.reviewedToday}</span>
              </div>
            </Link>
          ) : dueRemaining > 0 && !fullAccess ? (
            <div className={`${styles.heroPanel} ${styles.heroPanelLocked}`} title={t.dueLockedHint}>
              <span className={styles.heroLockBadge}>🔒 {t.dueLockedTitle}</span>
              <div className={styles.heroPanelStat}>
                <strong>{dueRemaining}</strong>
                <span>{t.due}</span>
              </div>
              <div className={styles.heroPanelDivider} />
              <div className={styles.heroPanelStat}>
                <strong>{reviewedTodayCount}</strong>
                <span>{t.reviewedToday}</span>
              </div>
            </div>
          ) : (
            <div className={styles.heroPanel}>
              <div className={styles.heroPanelStat}>
                <strong>{dueRemaining}</strong>
                <span>{t.due}</span>
              </div>
              <div className={styles.heroPanelDivider} />
              <div className={styles.heroPanelStat}>
                <strong>{reviewedTodayCount}</strong>
                <span>{t.reviewedToday}</span>
              </div>
            </div>
          )}
        </section>

        {!fullAccess && (
          <div className={trialActive ? styles.trialBanner : styles.limitNote}>
            {trialActive ? t.trialHint : t.topicLimitHint}{' '}
            <Link href={withLang('/profil')}>{t.upgradeLink}</Link>
          </div>
        )}

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
            {fachEntries.map(entry => (
              <button key={entry.fach.id} type="button" className={`${styles.topicCard} ${styles.topicCardLarge} ${styles.topicCardBtn}`} onClick={() => openFach(entry)}>
                <span className={styles.topicIcon}>
                  <Image src={`/fach/${entry.fach.imageId || entry.fach.id}.png`} alt="" width={40} height={40} style={{ objectFit: 'contain', width: '70%', height: '70%' }} />
                </span>
                <span className={styles.topicText}>
                  <strong>{getFachTitle(entry.fach, lang)}</strong>
                  <small>
                    {entry.kapitel.length > 0
                      ? `${entry.kapitel.length} ${entry.kapitel.length === 1 ? t.chapterSingular : t.chapterPlural}`
                      : t.noChaptersYet}
                  </small>
                </span>
                <span className={styles.topicArrow}>{t.open}</span>
              </button>
            ))}
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

      {picker && (
        <div className={styles.boxModalOverlay} onClick={closePicker}>
          <div className={styles.boxModal} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.boxModalClose} onClick={closePicker} aria-label={t.close}>×</button>

            {!picker.selected ? (
              <>
                <div className={styles.boxModalHeader}>
                  <span className={styles.kicker}>{getFachTitle(picker.fach, lang)}</span>
                  <h2>{getFachTitle(picker.fach, lang)}</h2>
                  <p>{t.chapterPickLead}</p>
                </div>

                {picker.kapitelList.length === 0 ? (
                  <div className={styles.empty}>{t.noChaptersYet}</div>
                ) : (
                  <div className={styles.dueTopicList}>
                    {picker.kapitelList.map(entry => (
                      <button key={entry.kapitel.id} type="button" className={`${styles.dueTopicRow} ${styles.dueTopicRowBtn}`} onClick={() => openKapitel(entry)}>
                        <span className={styles.dueTopicInfo}>
                          <strong>{withoutLeadingNumber(getKapitelTitle(entry.kapitel, lang))}</strong>
                          <small>{entry.themen.length} {entry.themen.length === 1 ? t.topicSingular : t.topicPlural}</small>
                        </span>
                        <span className={styles.topicArrow}>{t.open}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (() => {
              const sections = groupFlashcardThemen(picker.selected.themen)
              return (
                <>
                  <div className={styles.boxModalHeader}>
                    <button type="button" className={styles.modalBackBtn} onClick={backToKapitelList}>{t.backToChapters}</button>
                    <span className={styles.kicker}>{getFachTitle(picker.fach, lang)}</span>
                    <h2>{withoutLeadingNumber(getKapitelTitle(picker.selected.kapitel, lang))}</h2>
                    <p>{t.chapterModalLead}</p>
                  </div>

                  <div className={styles.modalSections}>
                    {sections.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        {section.key && <div className={styles.modalGroupHeading}>{section.key}</div>}
                        <div className={styles.dueTopicList}>
                          {section.items.map(thema => {
                            const topic = FLASHCARD_TOPICS.find(ft => ft.href === thema.flashcardLink)
                            if (topic) {
                              if (isTopicLocked(topic.id)) {
                                return (
                                  <div key={thema.id} className={`${styles.dueTopicRow} ${styles.dueTopicRowLocked}`} title={t.topicLimitHint}>
                                    <span className={styles.dueTopicInfo}>
                                      <strong>{getThemaTitle(thema, lang)}</strong>
                                      <small>🔒 {t.topicLimitTitle}</small>
                                    </span>
                                  </div>
                                )
                              }
                              return (
                                <Link key={thema.id} href={withLang(topic.href)} className={styles.dueTopicRow}>
                                  <span className={styles.dueTopicInfo}>
                                    <strong>{getThemaTitle(thema, lang)}</strong>
                                    <small>{FLASHCARDS.filter(c => c.topicId === topic.id).length} {t.cards}</small>
                                  </span>
                                  <span className={styles.topicArrow}>{t.open}</span>
                                </Link>
                              )
                            }
                            return (
                              <div key={thema.id} className={`${styles.dueTopicRow} ${styles.dueTopicRowDisabled}`}>
                                <span className={styles.dueTopicInfo}>
                                  <strong>{getThemaTitle(thema, lang)}</strong>
                                  <small>{t.noFlashcardsYet}</small>
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </main>
  )
}
