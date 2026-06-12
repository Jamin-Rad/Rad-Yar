'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { CURRICULUM, getThemaTitle } from '@/data/curriculum'
import { MCQ_TOPIC_GROUPS, countQuestions, getAvailableQuestionTopicIds } from '@/data/questions'
import { useLanguage } from '@/providers/LanguageProvider'
import { isSubscriptionActive, isTechnikKapitelLocked, FREE_TOPIC_LIMIT, FREE_ITEM_LIMIT, TECHNIK_FACH_ID } from '@/utils/subscription'
import styles from './page.module.css'

const FACH_DISPLAY = {
  de: { gehirn:'Kopf', wirbelsaeule:'Wirbelsäule', hals:'Hals', thorax:'Thorax',
        mamma:'Mamma', abdomen:'Abdomen', 'becken-f':'Becken – Frau', 'becken-m':'Becken – Mann',
        msk:'Muskuloskelettales', technik:'Technik & Physik', 'gefaesse-ir':'Gefäße' },
  en: { gehirn:'Head', wirbelsaeule:'Spine', hals:'Neck', thorax:'Thorax',
        mamma:'Breast', abdomen:'Abdomen', 'becken-f':'Pelvis – Female', 'becken-m':'Pelvis – Male',
        msk:'Musculoskeletal', technik:'Physics & Tech', 'gefaesse-ir':'Vascular' },
  fa: { gehirn:'سر', wirbelsaeule:'ستون فقرات', hals:'گردن', thorax:'توراکس',
        mamma:'پستان', abdomen:'شکم', 'becken-f':'لگن – زنان', 'becken-m':'لگن – مردان',
        msk:'اسکلتی-عضلانی', technik:'تکنیک و فیزیک', 'gefaesse-ir':'عروق' },
}

const UE = {
  de: { home:'RadYar', crumb:'Üben',
        title:'MCQ-Training', sub:'Wähle eine oder mehrere Körperregionen, dann Themen und Anzahl der Fragen.',
        step1:'Körperregion(en) wählen', step2:'Themen wählen', step3:'Anzahl der Fragen',
        allSel:'Alle', noneSel:'Keine', start:'Quiz starten',
        questions:'Fragen', topics:'Themen', selected:'Ausgewählt',
        noFach:'Wähle zuerst eine verfügbare Körperregion.', noTopics:'Für diesen Bereich sind noch keine Fragen verfügbar.',
        wholeChapter:'Ganzes Kapitel wählen', chapterSelected:'Ganzes Kapitel ausgewählt',
        random:'Zufällige Auswahl', available:'Fragen verfügbar',
        timedLabel:'Mit Zeitlimit üben', timedHint:'60 Sekunden pro Frage – die Zeit läuft für den ganzen Durchgang.',
        signInGateTitle:'Bitte melde dich an, um MCQs zu üben',
        signInGateText:'Ohne Anmeldung kannst du MCQs direkt über die Lernseiten nutzen (bis zu 5 Fragen pro Thema). Melde dich kostenlos an, um hier eigene Übungssets zusammenzustellen.',
        signIn:'Anmelden', signUp:'Registrieren', browseTopics:'Lerninhalte ansehen',
        topicLimitHint:'Kostenlose Konten können bis zu 2 Themen auswählen. Mit Abo unbegrenzt viele Themen.',
        lockedHint:'Nur mit Abo verfügbar', anzahlLockedHint:'Kostenlose Konten: max. 5 Fragen pro Durchgang. Mit Abo unbegrenzt.',
        upgradeLink:'Mehr erfahren' },
  en: { home:'RadYar', crumb:'Practice',
        title:'MCQ Training', sub:'Choose one or more body regions, then topics and number of questions.',
        step1:'Choose body region(s)', step2:'Choose topics', step3:'Number of questions',
        allSel:'All', noneSel:'None', start:'Start quiz',
        questions:'questions', topics:'topics', selected:'Selected',
        noFach:'Choose a body region first.', noTopics:'No topics are available for this area yet.',
        wholeChapter:'Select whole chapter', chapterSelected:'Whole chapter selected',
        random:'Random selection', available:'Questions available',
        timedLabel:'Practice with time limit', timedHint:'60 seconds per question – the timer runs for the whole session.',
        signInGateTitle:'Please sign in to practice MCQs',
        signInGateText:'Without an account you can use MCQs directly from the lesson pages (up to 5 questions per topic). Sign in for free to build your own practice sets here.',
        signIn:'Sign in', signUp:'Sign up', browseTopics:'Browse lessons',
        topicLimitHint:'Free accounts can select up to 2 topics. With a subscription, unlimited topics.',
        lockedHint:'Subscription required', anzahlLockedHint:'Free accounts: max. 5 questions per session. Unlimited with a subscription.',
        upgradeLink:'Learn more' },
  fa: { home:'RadYar', crumb:'تمرین',
        title:'تمرین MCQ', sub:'یک یا چند ناحیه بدن انتخاب کنید، سپس موضوعات و تعداد سؤالات.',
        step1:'انتخاب ناحیه(ها)', step2:'انتخاب موضوعات', step3:'تعداد سؤالات',
        allSel:'همه', noneSel:'هیچ', start:'شروع آزمون',
        questions:'سؤال', topics:'موضوع', selected:'انتخاب شده',
        noFach:'ابتدا یک ناحیه انتخاب کنید.', noTopics:'هنوز موضوعی برای این بخش موجود نیست.',
        wholeChapter:'انتخاب کل فصل', chapterSelected:'کل فصل انتخاب شده',
        random:'انتخاب تصادفی', available:'سؤال موجود است',
        timedLabel:'تمرین با محدودیت زمانی', timedHint:'۶۰ ثانیه برای هر سؤال — زمان برای کل آزمون اجرا می‌شود.',
        signInGateTitle:'برای تمرین MCQ وارد شوید',
        signInGateText:'بدون ورود می‌توانید از طریق صفحات درسی تا ۵ سؤال در هر موضوع تمرین کنید. برای ساختن مجموعه تمرینی شخصی، رایگان وارد شوید.',
        signIn:'ورود', signUp:'ثبت‌نام', browseTopics:'مشاهده درس‌ها',
        topicLimitHint:'حساب‌های رایگان می‌توانند تا ۲ موضوع انتخاب کنند. با اشتراک، بدون محدودیت.',
        lockedHint:'فقط با اشتراک', anzahlLockedHint:'حساب رایگان: حداکثر ۵ سؤال در هر دور. با اشتراک نامحدود.',
        upgradeLink:'بیشتر بدانید' },
}

const ANZAHL_OPTIONS = [5, 10, 25, 50]
const fachIcon = id => `/fach/${id}.png`

export default function UebenPage() {
  const { lang } = useLanguage()
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()
  const subscriptionActive = isSubscriptionActive(user)
  const t = UE[lang] || UE.de
  const display = FACH_DISPLAY[lang] || FACH_DISPLAY.de
  const availableTopicIds = useMemo(() => getAvailableQuestionTopicIds(), [])
  const availableGroups = useMemo(() => MCQ_TOPIC_GROUPS
    .map(group => ({
      ...group,
      topics: group.topics.filter(topic => availableTopicIds.has(topic.id)),
    }))
    .filter(group => group.topics.length > 0), [availableTopicIds])
  const availableFachIds = useMemo(
    () => new Set(availableGroups.map(group => group.fachId)),
    [availableGroups]
  )

  // ── State ──────────────────────────────────────
  const [selFach, setSelFach]     = useState(new Set())   // multiple fach
  const [selThemen, setSelThemen] = useState(new Set())   // selected thema ids
  const [anzahl, setAnzahl]       = useState(10)
  const [timed, setTimed]         = useState(false)
  const [openTopicGroups, setOpenTopicGroups] = useState(new Set())

  const allThemenFromSel = useMemo(() => {
    return availableGroups
      .filter(group => selFach.has(group.fachId))
      .flatMap(group => group.topics)
  }, [availableGroups, selFach])

  const toggleFach = (id) => {
    if (!availableFachIds.has(id)) return
    setSelFach(prev => {
      const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s
    })
    // Beim Hinzufügen einer Körperregion bleibt zunächst kein Thema ausgewählt.
    // Beim Entfernen einer Körperregion werden nur deren eventuell gewählte Themen entfernt.
    if (selFach.has(id)) {
      setSelThemen(prev => {
        const s = new Set(prev)
        availableGroups
          .filter(group => group.fachId === id)
          .forEach(group => group.topics.forEach(topic => s.delete(topic.id)))
        return s
      })
    }
  }

  const toggleThema = (id) => setSelThemen(prev => {
    const s = new Set(prev)
    if (s.has(id)) { s.delete(id); return s }
    if (!subscriptionActive && s.size >= FREE_TOPIC_LIMIT) return s
    s.add(id); return s
  })
  const toggleKapitel = (themen) => {
    if (!subscriptionActive) return
    setSelThemen(prev => {
      const next = new Set(prev)
      const ids = themen.map(thema => thema.id)
      const allSelected = ids.every(id => next.has(id))
      ids.forEach(id => allSelected ? next.delete(id) : next.add(id))
      return next
    })
  }
  const toggleTopicGroup = (id) => setOpenTopicGroups(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const selectAll  = () => setSelThemen(subscriptionActive
    ? new Set(allThemenFromSel.map(t => t.id))
    : new Set(allThemenFromSel.slice(0, FREE_TOPIC_LIMIT).map(t => t.id)))
  const selectNone = () => setSelThemen(prev => {
    const s = new Set(prev)
    allThemenFromSel.forEach(t => s.delete(t.id))
    return s
  })

  const availableQuestions = countQuestions([...selThemen])
  const canStart = selFach.size > 0 && selThemen.size > 0 && availableQuestions > 0

  // Kostenlose Konten: max. FREE_ITEM_LIMIT Fragen pro Durchgang
  useEffect(() => {
    if (isLoaded && !subscriptionActive && anzahl > FREE_ITEM_LIMIT) setAnzahl(FREE_ITEM_LIMIT)
  }, [isLoaded, subscriptionActive, anzahl])

  const start = () => {
    if (!canStart) return
    const effectiveAnzahl = subscriptionActive ? anzahl : Math.min(anzahl, FREE_ITEM_LIMIT)
    const params = new URLSearchParams({
      fach: [...selFach].join(','),
      n: String(Math.min(effectiveAnzahl, availableQuestions)),
      themen: [...selThemen].join(','),
    })
    if (timed) params.set('timed', '1')
    router.push(`/ueben/quiz?${params.toString()}`)
  }

  const groupedBySel = useMemo(() => {
    return availableGroups
      .filter(group => selFach.has(group.fachId))
      .map(group => {
        const fach = CURRICULUM.find(item => item.id === group.fachId)
        return {
          fachId: group.fachId,
          fachColor: fach?.color || '#f97316',
          kapitelId: group.kapitelId,
          kapitelTitle: getThemaTitle(group, lang),
          themen: group.topics,
        }
      })
  }, [availableGroups, lang, selFach])

  if (isLoaded && !isSignedIn) {
    return (
      <div className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <div className={styles.gateBox}>
          <h2>{t.signInGateTitle}</h2>
          <p>{t.signInGateText}</p>
          <div className={styles.gateActions}>
            <Link href="/sign-in" className={`${styles.gateBtn} ${styles.gatePrimary}`}>{t.signIn}</Link>
            <Link href="/sign-up" className={`${styles.gateBtn} ${styles.gateSecondary}`}>{t.signUp}</Link>
            <Link href="/lernen" className={`${styles.gateBtn} ${styles.gateSecondary}`}>{t.browseTopics}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={styles.layout}>

        {/* ── LEFT PANEL ── */}
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              <Link href="/" className={styles.crumbLink}>{t.home}</Link>
              <span className={styles.sep}>›</span>
              <span className={styles.crumbCurrent}>{t.crumb}</span>
            </div>
            <h1 className={styles.title}>{t.title}</h1>
            <p className={styles.sub}>{t.sub}</p>
          </div>

          {/* STEP 1: FACH (multiselect) */}
          <section className={styles.section}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>1</span>{t.step1}
            </div>
            <div className={styles.fachGrid}>
              {CURRICULUM.filter(f => availableFachIds.has(f.id)).map(f => {
                const active = selFach.has(f.id)
                return (
                  <button key={f.id}
                    className={`${styles.fachCard} ${active ? styles.fachCardActive : ''}`}
                    style={active ? { borderColor: f.color, background: f.color + '12' } : {}}
                    onClick={() => toggleFach(f.id)}>
                    <span className={styles.fachIcon}><Image src={fachIcon(f.id)} alt={display[f.id]} width={54} height={54} style={{ objectFit: 'contain' }} /></span>
                    <span className={styles.fachName} style={active ? { color: f.color } : {}}>
                      {display[f.id]}
                    </span>
                    <small>{t.available}</small>
                    {active && <span className={styles.fachCheck} style={{ background: f.color }}>✓</span>}
                  </button>
                )
              })}
            </div>
          </section>

          {/* STEP 2: THEMEN */}
          <section className={styles.section}>
            <div className={styles.stepRow}>
              <div className={styles.stepLabel}>
                <span className={styles.stepNum}>2</span>{t.step2}
              </div>
              {selFach.size > 0 && (
                <div className={styles.bulkBtns}>
                  <button className={styles.bulkBtn} onClick={selectAll}>{t.allSel}</button>
                  <button className={styles.bulkBtn} onClick={selectNone}>{t.noneSel}</button>
                </div>
              )}
            </div>

            {!subscriptionActive && <div className={styles.limitNote}>{t.topicLimitHint}</div>}

            {selFach.size === 0 ? (
              <div className={styles.hint}>{t.noFach}</div>
            ) : groupedBySel.length === 0 ? (
              <div className={styles.hint}>{t.noTopics}</div>
            ) : (
              <div className={styles.kapitelList}>
                {groupedBySel.map(({ fachId, fachColor, kapitelId, kapitelTitle, themen }) => {
                  const groupKey = fachId + '-' + kapitelId
                  const isOpen = openTopicGroups.has(groupKey)
                  const selectedCount = themen.filter(th => selThemen.has(th.id)).length
                  const wholeChapterSelected = themen.length > 0 && selectedCount === themen.length
                  const kapitelLocked = fachId === TECHNIK_FACH_ID && isTechnikKapitelLocked(kapitelId, user)
                  const topicLimitReached = !subscriptionActive && selThemen.size >= FREE_TOPIC_LIMIT
                  return (
                    <div key={groupKey} className={`${styles.kapitelBlock} ${isOpen ? styles.kapitelBlockOpen : ''} ${kapitelLocked ? styles.kapitelBlockLocked : ''}`}>
                      <button className={styles.kapitelHeaderBtn} onClick={() => toggleTopicGroup(groupKey)}>
                        <span className={styles.kapitelIconWrap}>
                          <Image src={fachIcon(fachId)} alt={display[fachId] || fachId} width={26} height={26} style={{ objectFit: 'contain' }} />
                        </span>
                        <span className={styles.kapitelTitle}>{display[fachId] || fachId} · {kapitelTitle}</span>
                        {kapitelLocked && <span className={styles.kapitelLockBadge}>🔒 {t.lockedHint}</span>}
                        <span className={styles.kapitelMeta} style={{ color: fachColor, background: fachColor + '12' }}>
                          {selectedCount}/{themen.length}
                        </span>
                        <span className={styles.kapitelChevron} style={{ color: isOpen ? fachColor : undefined }}>{isOpen ? '−' : '+'}</span>
                      </button>
                      {isOpen && (
                        <div className={styles.kapitelContent}>
                          <button
                            className={`${styles.chapterSelect} ${wholeChapterSelected ? styles.chapterSelectActive : ''} ${(!subscriptionActive || kapitelLocked) ? styles.chapterSelectLocked : ''}`}
                            style={wholeChapterSelected ? { borderColor: fachColor, color: fachColor, background: fachColor + '12' } : {}}
                            disabled={!subscriptionActive || kapitelLocked}
                            onClick={() => toggleKapitel(themen)}
                          >
                            <span className={styles.chapterSelectCheck}>{wholeChapterSelected ? '✓' : ''}</span>
                            <span>{wholeChapterSelected ? t.chapterSelected : t.wholeChapter}</span>
                            <small>{themen.length}</small>
                          </button>
                          <div className={styles.chips}>
                            {themen.map(th => {
                              const selected = selThemen.has(th.id)
                              const chipLocked = kapitelLocked || (!selected && topicLimitReached)
                              return (
                                <button key={th.id}
                                  className={`${styles.chip} ${selected ? styles.chipActive : ''} ${th._sub ? styles.chipSub : ''} ${chipLocked ? styles.chipLocked : ''}`}
                                  style={selected ? { borderColor: fachColor, color: fachColor, background: fachColor + '12' } : {}}
                                  disabled={chipLocked}
                                  onClick={() => toggleThema(th.id)}>
                                  {getThemaTitle(th, lang)}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* STEP 3: ANZAHL */}
          <section className={styles.section}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>3</span>{t.step3}
            </div>
            <div className={styles.anzahlRow}>
              {ANZAHL_OPTIONS.map(n => {
                const locked = !subscriptionActive && n > FREE_ITEM_LIMIT
                return (
                  <button key={n}
                    className={`${styles.anzahlBtn} ${anzahl === n ? styles.anzahlBtnActive : ''} ${locked ? styles.anzahlBtnLocked : ''}`}
                    disabled={locked}
                    onClick={() => setAnzahl(n)}>
                    {locked && <span className={styles.lockIcon}>🔒</span>}{n}
                  </button>
                )
              })}
            </div>
            {!subscriptionActive && <div className={styles.limitNote}>{t.anzahlLockedHint}</div>}
          </section>

          {/* TIMER TOGGLE */}
          <section className={styles.section}>
            <button
              type="button"
              className={`${styles.timedToggle} ${timed ? styles.timedToggleActive : ''}`}
              onClick={() => setTimed(v => !v)}
              role="switch"
              aria-checked={timed}
            >
              <span className={styles.timedSwitch}><span className={styles.timedKnob} /></span>
              <span className={styles.timedTextWrap}>
                <span className={styles.timedLabel}>⏱ {t.timedLabel}</span>
                <small className={styles.timedHint}>{t.timedHint}</small>
              </span>
            </button>
          </section>
        </div>

        {/* ── RIGHT PANEL: selected summary ── */}
        <div className={styles.rightPanel}>
          <div className={styles.rightInner}>
            <div className={styles.summaryTitle}>{t.selected}</div>

            {selFach.size === 0 ? (
              <div className={styles.summaryEmpty}>{t.noFach}</div>
            ) : (
              <>
                <div className={styles.summaryFach}>
                  {[...selFach].map(id => {
                    const f = CURRICULUM.find(c => c.id === id)
                    return (
                      <div key={id} className={styles.summaryFachTag} style={{ borderColor: f?.color + '44', color: f?.color }}>
                        <Image src={fachIcon(id)} alt={display[id] || id} width={18} height={18} style={{ objectFit: 'contain' }} /> {display[id] || id}
                      </div>
                    )
                  })}
                </div>

                <div className={styles.summaryStats}>
                  <div className={styles.statBox}>
                    <div className={styles.statNum}>{selThemen.size}</div>
                    <div className={styles.statLbl}>{t.topics}</div>
                  </div>
                  <div className={styles.statBox}>
                    <div className={styles.statNum}>{Math.min(anzahl, availableQuestions)}</div>
                    <div className={styles.statLbl}>{t.questions}</div>
                  </div>
                </div>

                <div className={styles.summaryNote}>{t.random}</div>

                <button className={styles.startBtn} onClick={start} disabled={!canStart}>
                  {t.start}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
