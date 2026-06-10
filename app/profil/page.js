'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/providers/LanguageProvider'
import { loadLeitnerState, LEITNER_STEPS, getBoxLabel, isDue } from '@/utils/leitnerStorage'
import { CURRICULUM, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import styles from './page.module.css'

/* ── Übersetzungen ─────────────────────────────────── */
const T = {
  de: {
    greetMorning:   'Guten Morgen',
    greetDay:       'Hallo',
    greetEvening:   'Guten Abend',
    todayLabel:     'Dein Tagesplan',
    todayDue:       (n) => `${n} Karte${n !== 1 ? 'n' : ''} heute fällig`,
    todayZero:      'Keine Karten fällig — du bist up to date!',
    todaySub:       'Lerne täglich, auch nur 5 Minuten — der Unterschied ist enorm.',
    startCards:     'Karten wiederholen →',
    exploreLernen:  'Thema erkunden →',
    lernpfadTitle:  'Lernpfad · Lektionen',
    lernpfadSub:    'Klicke auf ein Fachgebiet um den Fortschritt je Kapitel zu sehen.',
    flashTitle:     'Flashcard-Fortschritt',
    streakTitle:    'Lernserie',
    streakCurrent:  'Aktuelle Serie',
    streakBest:     'Beste Serie',
    days:           'Tage',
    mastered:       'Beherrscht',
    editTitle:      'Profil bearbeiten',
    spitzname:      'Spitzname',
    fach:           'Fachrichtung',
    stufe:          'Ausbildungsstufe',
    select:         '– Bitte wählen –',
    save:           'Speichern',
    saving:         'Wird gespeichert…',
    saved:          '✓ Gespeichert',
    notLoggedTitle: 'Bitte anmelden',
    notLoggedSub:   'Um dein Profil zu sehen, melde dich an.',
    signIn:         'Jetzt anmelden',
    dueToday:       'Heute fällig',
    totalCards:     'Karten gesamt',
    streakLabel:    'Tage-Serie',
    noContent:      'Kein Inhalt',
    complete:       'Fertig',
    emptyDash:      '–',
    mcqLabel:       'MCQ',
    mcqScore:       (c, a) => `${c} / ${a} richtig`,
    mcqNone:        '–',
    chaptersOf:     (r, t) => `${r} / ${t} gelesen`,
    readTopicsTitle: 'Gelesene Themen',
    readTopicsSub:  'Alle Themen, die du als gelesen markiert hast — über alle Fachgebiete hinweg.',
    readTopicsEmpty: 'Du hast noch keine Themen als gelesen markiert.',
  },
  en: {
    greetMorning:   'Good morning',
    greetDay:       'Hello',
    greetEvening:   'Good evening',
    todayLabel:     'Your daily plan',
    todayDue:       (n) => `${n} card${n !== 1 ? 's' : ''} due today`,
    todayZero:      'No cards due — you\'re up to date!',
    todaySub:       'Study daily, even just 5 minutes — the difference is huge.',
    startCards:     'Review cards →',
    exploreLernen:  'Explore topic →',
    lernpfadTitle:  'Learning path · Lessons',
    lernpfadSub:    'Click a specialty to see chapter-by-chapter progress.',
    flashTitle:     'Flashcard progress',
    streakTitle:    'Learning streak',
    streakCurrent:  'Current streak',
    streakBest:     'Best streak',
    days:           'days',
    mastered:       'Mastered',
    editTitle:      'Edit profile',
    spitzname:      'Nickname',
    fach:           'Specialty',
    stufe:          'Training level',
    select:         '– Please select –',
    save:           'Save',
    saving:         'Saving…',
    saved:          '✓ Saved',
    notLoggedTitle: 'Please sign in',
    notLoggedSub:   'Sign in to view your profile.',
    signIn:         'Sign in now',
    dueToday:       'Due today',
    totalCards:     'Total cards',
    streakLabel:    'Day streak',
    noContent:      'No content',
    complete:       'Complete',
    emptyDash:      '–',
    mcqLabel:       'MCQ',
    mcqScore:       (c, a) => `${c} / ${a} correct`,
    mcqNone:        '–',
    chaptersOf:     (r, t) => `${r} / ${t} read`,
    readTopicsTitle: 'Topics read',
    readTopicsSub:  'All topics you have marked as read — across all specialties.',
    readTopicsEmpty: "You haven't marked any topics as read yet.",
  },
  fa: {
    greetMorning:   'صبح بخیر',
    greetDay:       'سلام',
    greetEvening:   'عصر بخیر',
    todayLabel:     'برنامه امروز',
    todayDue:       (n) => `${n} کارت امروز مقرر`,
    todayZero:      'هیچ کارتی مقرر نیست — آپ‌تودیت هستی!',
    todaySub:       'هر روز بخوان، حتی ۵ دقیقه — تفاوت بزرگیه.',
    startCards:     'مرور کارت‌ها ←',
    exploreLernen:  'کاوش موضوع ←',
    lernpfadTitle:  'مسیر یادگیری · درس‌ها',
    lernpfadSub:    'روی یک تخصص کلیک کن تا پیشرفت فصل‌ها را ببینی.',
    flashTitle:     'پیشرفت فلش‌کارت',
    streakTitle:    'رشته یادگیری',
    streakCurrent:  'رشته فعلی',
    streakBest:     'بهترین رشته',
    days:           'روز',
    mastered:       'تسلط',
    editTitle:      'ویرایش پروفایل',
    spitzname:      'اسم مستعار',
    fach:           'تخصص',
    stufe:          'مرحله تحصیلی',
    select:         '– انتخاب کن –',
    save:           'ذخیره',
    saving:         'در حال ذخیره…',
    saved:          '✓ ذخیره شد',
    notLoggedTitle: 'لطفاً وارد شو',
    notLoggedSub:   'برای دیدن پروفایلت وارد شو.',
    signIn:         'ورود',
    dueToday:       'امروز مقرر',
    totalCards:     'کل کارت‌ها',
    streakLabel:    'رشته روز',
    noContent:      'بدون محتوا',
    complete:       'تمام',
    emptyDash:      '–',
    mcqLabel:       'MCQ',
    mcqScore:       (c, a) => `${c} از ${a} درست`,
    mcqNone:        '–',
    chaptersOf:     (r, t) => `${r} از ${t} خوانده`,
    readTopicsTitle: 'موضوعات خوانده‌شده',
    readTopicsSub:  'تمام موضوعاتی که به‌عنوان خوانده‌شده علامت زده‌ای — در همه تخصص‌ها.',
    readTopicsEmpty: 'هنوز هیچ موضوعی را خوانده‌شده علامت نزده‌ای.',
  },
}

const FACH_OPTS = {
  de: ['Radiologie','Allgemeinmedizin','Chirurgie','Innere Medizin','Neurologie','Pädiatrie','Andere'],
  en: ['Radiology','General Medicine','Surgery','Internal Medicine','Neurology','Paediatrics','Other'],
  fa: ['رادیولوژی','پزشکی عمومی','جراحی','داخلی','نورولوژی','اطفال','سایر'],
}
const STUFE_OPTS = {
  de: ['Medizinstudent/in','PJ','Assistenzarzt/-ärztin','Facharzt/-ärztin','Oberarzt/-ärztin','Andere'],
  en: ['Medical student','Final year (PJ)','Resident','Specialist','Senior physician','Other'],
  fa: ['دانشجوی پزشکی','کارآموز (PJ)','دستیار','متخصص','فوق تخصص','سایر'],
}

/* ── Helpers ───────────────────────────────────────── */

function getGreeting(lang) {
  const h = new Date().getHours()
  const k = h < 12 ? 'greetMorning' : h < 18 ? 'greetDay' : 'greetEvening'
  return (T[lang] ?? T.de)[k]
}

function calcStreak(state) {
  const dates = Object.values(state)
    .filter(r => r.lastReviewedAt)
    .map(r => new Date(r.lastReviewedAt).toDateString())
  const unique = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a))
  if (!unique.length) return { current: 0, best: 0 }
  const today     = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  let cur = 0, prev = null
  for (const d of unique) {
    if (!prev) {
      if (d === today || d === yesterday) { cur = 1; prev = d }
      else break
    } else {
      if ((new Date(prev) - new Date(d)) / 86400000 === 1) { cur++; prev = d }
      else break
    }
  }
  let best = 1, run = 1
  for (let i = 1; i < unique.length; i++) {
    if ((new Date(unique[i-1]) - new Date(unique[i])) / 86400000 === 1) { run++; if (run > best) best = run }
    else run = 1
  }
  return { current: cur, best: Math.max(cur, best) }
}

/* ── Progress helpers ──────────────────────────────── */

/** Alle Themen mit Link in einem Kapitel */
function getKapitelAvailable(kapitel) {
  const ids = []
  for (const t of kapitel.themen) {
    if (t.link) ids.push(t.id)
    if (t.sub) for (const s of t.sub) if (s.link) ids.push(s.id)
  }
  return ids
}

/** Prozent gelesen für ein Kapitel (0–100). Kein Inhalt → 100 */
function kapitelPct(kapitel, readArticles) {
  const ids = getKapitelAvailable(kapitel)
  if (ids.length === 0) return 100
  const sum = ids.reduce((s, id) => s + (readArticles[id] || 0), 0)
  return Math.round((sum / ids.length) * 100)
}

/** Prozent gelesen für ein Fachgebiet */
function fachPct(fach, readArticles) {
  let total = 0, sum = 0
  for (const k of fach.kapitel) {
    const ids = getKapitelAvailable(k)
    total += ids.length
    sum   += ids.reduce((s, id) => s + (readArticles[id] || 0), 0)
  }
  if (total === 0) return 100
  return Math.round((sum / total) * 100)
}

/** Anzahl gelesen / verfügbar für ein Kapitel */
function kapitelReadCount(kapitel, readArticles) {
  const ids = getKapitelAvailable(kapitel)
  const read = ids.filter(id => (readArticles[id] || 0) >= 1).length
  return { read, total: ids.length }
}

/** Alle als gelesen markierten Themen über das gesamte Curriculum */
function getReadTopics(readArticles) {
  const result = []
  for (const fach of CURRICULUM) {
    for (const k of fach.kapitel) {
      for (const th of k.themen) {
        if ((readArticles[th.id] || 0) >= 1) result.push({ fach, kapitel: k, thema: th })
        if (th.sub) for (const s of th.sub) {
          if ((readArticles[s.id] || 0) >= 1) result.push({ fach, kapitel: k, thema: s })
        }
      }
    }
  }
  return result
}

/** MCQ-Stats für ein Fachgebiet */
function fachMcqStats(fach, mcqScores) {
  let attempted = 0, correct = 0
  for (const val of Object.values(mcqScores)) {
    if ((val.fach || '') === fach.id) {
      attempted += val.attempted || 0
      correct   += val.correct   || 0
    }
  }
  return { attempted, correct }
}

/* ── Lernpfad Accordion ────────────────────────────── */
function LernpfadAccordion({ readArticles, mcqScores, lang, t }) {
  const [openFach, setOpenFach] = useState(null)

  return (
    <div className={styles.accordion}>
      {CURRICULUM.map(fach => {
        const title   = getFachTitle(fach, lang)
        const pct     = fachPct(fach, readArticles)
        const isOpen  = openFach === fach.id
        const mcq     = fachMcqStats(fach, mcqScores)
        const hasMcq  = mcq.attempted > 0

        // Gesamtzahl verfügbarer Artikel im Fach
        let totalAvail = 0
        for (const k of fach.kapitel) totalAvail += getKapitelAvailable(k).length
        const isEmpty = totalAvail === 0

        return (
          <div key={fach.id} className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}>
            {/* ── Fach-Header ── */}
            <button
              className={styles.fachBtn}
              onClick={() => setOpenFach(isOpen ? null : fach.id)}
            >
              <span className={styles.fachBtnIcon}>{fach.icon}</span>
              <span className={styles.fachBtnName}>{title}</span>
              <div className={styles.fachBtnRight}>
                {hasMcq && (
                  <span className={styles.mcqPill}>
                    {t.mcqLabel} {Math.round((mcq.correct / mcq.attempted) * 100)}%
                  </span>
                )}
                <div className={styles.fachBtnBar}>
                  <div className={styles.miniBar}>
                    <div
                      className={`${styles.miniBarFill} ${isEmpty ? styles.miniBarEmpty : pct >= 100 ? styles.miniBarDone : ''}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className={styles.miniPct}>
                    {isEmpty ? t.emptyDash : `${pct}%`}
                  </span>
                </div>
                <span className={`${styles.accordionChevron} ${isOpen ? styles.accordionChevronOpen : ''}`}>›</span>
              </div>
            </button>

            {/* ── Kapitel-Liste ── */}
            {isOpen && (
              <div className={styles.kapitelList}>
                {fach.kapitel.map(k => {
                  const kPct  = kapitelPct(k, readArticles)
                  const { read, total } = kapitelReadCount(k, readArticles)
                  const kEmpty = total === 0

                  return (
                    <div key={k.id} className={styles.kapitelRow}>
                      <span className={styles.kapitelIcon}>{k.icon}</span>
                      <span className={styles.kapitelName}>{getKapitelTitle(k, lang)}</span>
                      <div className={styles.kapitelBarWrap}>
                        <div className={styles.kapitelBar}>
                          <div
                            className={`${styles.kapitelBarFill} ${kEmpty ? styles.kapitelBarEmpty : kPct >= 100 ? styles.kapitelBarDone : ''}`}
                            style={{ width: `${kPct}%` }}
                          />
                        </div>
                        <span className={styles.kapitelPct}>
                          {kEmpty ? t.emptyDash : t.chaptersOf(read, total)}
                        </span>
                      </div>
                    </div>
                  )
                })}

                {/* MCQ Row */}
                {hasMcq && (
                  <div className={`${styles.kapitelRow} ${styles.kapitelRowMcq}`}>
                    <span className={styles.kapitelIcon}>📝</span>
                    <span className={styles.kapitelName}>{t.mcqLabel}</span>
                    <span className={styles.mcqStatLine}>
                      {t.mcqScore(mcq.correct, mcq.attempted)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════ */
export default function ProfilPage() {
  const { lang } = useLanguage()
  const t   = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'
  const { user, isLoaded } = useUser()

  const [leitner,      setLeitner]      = useState({})
  const [streak,       setStreak]       = useState({ current: 0, best: 0 })
  const [readArticles, setReadArticles] = useState({})
  const [mcqScores,    setMcqScores]    = useState({})
  const [editOpen,     setEditOpen]     = useState(false)
  const [spitzname,    setSpitzname]    = useState('')
  const [fach,         setFach]         = useState('')
  const [stufe,        setStufe]        = useState('')
  const [saveState,    setSaveState]    = useState('idle')

  useEffect(() => {
    if (!isLoaded || !user) return
    setSpitzname(user.firstName ?? '')
    setFach(user.unsafeMetadata?.fachrichtung ?? '')
    setStufe(user.unsafeMetadata?.ausbildungsstufe ?? '')
    const state = loadLeitnerState(user.id)
    setLeitner(state)
    setStreak(calcStreak(state))
    try {
      setReadArticles(JSON.parse(localStorage.getItem('radyar_read_articles') || '{}'))
      setMcqScores(JSON.parse(localStorage.getItem('radyar_mcq_scores') || '{}'))
    } catch {}
  }, [isLoaded, user])

  if (!isLoaded) return <div className={styles.page}><Navbar /></div>

  if (!user) return (
    <div className={styles.page} dir={dir}>
      <Navbar />
      <div className={styles.inner}>
        <div className={styles.notLoggedIn}>
          <span style={{ fontSize: 48 }}>🔒</span>
          <h2>{t.notLoggedTitle}</h2>
          <p>{t.notLoggedSub}</p>
          <Link href="/sign-in" className={styles.primaryBtn}>{t.signIn}</Link>
        </div>
      </div>
    </div>
  )

  /* Stats */
  const readTopics = getReadTopics(readArticles)
  const records    = Object.values(leitner)
  const totalCards = records.length
  const dueToday   = records.filter(r => isDue(r)).length
  const mastered   = records.filter(r => r.status === 'mastered').length
  const maxBox     = Math.max(...LEITNER_STEPS.map(s =>
    records.filter(r => r.box === s.box && r.status !== 'mastered').length), 1)

  const initials = (user.firstName?.[0] ?? user.emailAddresses?.[0]?.emailAddress?.[0] ?? '?').toUpperCase()

  async function handleSave() {
    setSaveState('saving')
    try {
      await user.update({
        firstName: spitzname,
        unsafeMetadata: { ...user.unsafeMetadata, fachrichtung: fach, ausbildungsstufe: stufe },
      })
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
    } catch { setSaveState('idle') }
  }

  return (
    <div className={styles.page} dir={dir}>
      <Navbar />
      <div className={styles.inner}>

        {/* ── WELCOME ── */}
        <div className={styles.welcome}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>{initials}</div>
          </div>
          <div>
            <p className={styles.greeting}>{getGreeting(lang)},</p>
            <h1 className={styles.welcomeName}>
              {user.firstName ?? user.emailAddresses?.[0]?.emailAddress}
            </h1>
            <div className={styles.badges}>
              {fach  && <span className={styles.badge}>{fach}</span>}
              {stufe && <span className={styles.badge}>{stufe}</span>}
            </div>
          </div>
          <div className={styles.welcomeStats}>
            <div className={styles.wStat}>
              <strong>{dueToday}</strong>
              <span>{t.dueToday}</span>
            </div>
            <div className={styles.wStat}>
              <strong>{totalCards}</strong>
              <span>{t.totalCards}</span>
            </div>
            <div className={styles.wStat}>
              <strong>{streak.current}</strong>
              <span>{t.streakLabel}</span>
            </div>
          </div>
        </div>

        {/* ── TAGESPLAN ── */}
        <div className={styles.todayCard}>
          <div className={styles.todayLeft}>
            <p className={styles.todayLabel}>📅 {t.todayLabel}</p>
            <h2 className={styles.todayTitle}>
              {dueToday > 0 ? t.todayDue(dueToday) : t.todayZero}
            </h2>
            <p className={styles.todaySub}>{t.todaySub}</p>
          </div>
          <div className={styles.todayActions}>
            {dueToday > 0 && (
              <Link href="/flashcards" className={styles.primaryBtn}>
                🗂 {t.startCards}
              </Link>
            )}
            <Link href="/lernen" className={styles.secondaryBtn}>
              📖 {t.exploreLernen}
            </Link>
          </div>
        </div>

        {/* ── LERNPFAD ACCORDION ── */}
        <div className={styles.card} style={{ marginBottom: 16 }}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>🗺 {t.lernpfadTitle}</h2>
          </div>
          <p className={styles.cardSub}>{t.lernpfadSub}</p>
          <LernpfadAccordion
            readArticles={readArticles}
            mcqScores={mcqScores}
            lang={lang}
            t={t}
          />
        </div>

        {/* ── GELESENE THEMEN ── */}
        <div className={styles.card} style={{ marginBottom: 16 }}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>✅ {t.readTopicsTitle}</h2>
          </div>
          <p className={styles.cardSub}>{t.readTopicsSub}</p>
          {readTopics.length === 0 ? (
            <p className={styles.cardSub} style={{ margin: 0 }}>{t.readTopicsEmpty}</p>
          ) : (
            <div className={styles.kapitelList} style={{ borderTop: 'none', padding: 0 }}>
              {readTopics.map(({ fach: rfach, kapitel: rkapitel, thema }) => {
                const row = (
                  <>
                    <span className={styles.kapitelIcon}>{rfach.icon}</span>
                    <span className={styles.kapitelName}>
                      {getThemaTitle(thema, lang)}
                      <span className={styles.readTopicMeta}>{getFachTitle(rfach, lang)} · {getKapitelTitle(rkapitel, lang)}</span>
                    </span>
                  </>
                )
                return thema.link ? (
                  <Link key={thema.id} href={thema.link} className={`${styles.kapitelRow} ${styles.readTopicLink}`}>
                    {row}
                  </Link>
                ) : (
                  <div key={thema.id} className={styles.kapitelRow}>{row}</div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── UNTERE KARTEN ── */}
        <div className={styles.mainGrid}>

          {/* Streak */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🔥 {t.streakTitle}</h2>
            </div>
            <div className={styles.streakRow}>
              <div className={styles.streakStat}>
                <span className={styles.streakNum}>{streak.current}</span>
                <span className={styles.streakLabel}>{t.streakCurrent}</span>
                <span className={styles.streakLabel}>{t.days}</span>
              </div>
              <div className={styles.streakStat}>
                <span className={styles.streakNum}>{streak.best}</span>
                <span className={styles.streakLabel}>{t.streakBest}</span>
                <span className={styles.streakLabel}>{t.days}</span>
              </div>
            </div>
          </div>

          {/* Flashcard Fortschritt */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🗂 {t.flashTitle}</h2>
              <Link href="/flashcards" className={styles.cardLink}>→</Link>
            </div>
            <div className={styles.boxList}>
              {LEITNER_STEPS.map(step => {
                const count = records.filter(r => r.box === step.box && r.status !== 'mastered').length
                return (
                  <div key={step.box} className={styles.boxRow}>
                    <span className={styles.boxLabel}>{getBoxLabel(step.box, lang)}</span>
                    <div className={styles.boxBarWrap}>
                      <div className={styles.boxBar} style={{ width: `${(count / maxBox) * 100}%` }} />
                    </div>
                    <span className={styles.boxCount}>{count}</span>
                  </div>
                )
              })}
              <div className={styles.boxRow}>
                <span className={styles.boxLabel} style={{ color: '#10b981' }}>✓ {t.mastered}</span>
                <div className={styles.boxBarWrap}>
                  <div className={`${styles.boxBar} ${styles.boxBarMastered}`} style={{ width: `${(mastered / maxBox) * 100}%` }} />
                </div>
                <span className={styles.boxCount}>{mastered}</span>
              </div>
            </div>
          </div>

          {/* Profil bearbeiten */}
          <div className={styles.card}>
            <button className={styles.editToggle} onClick={() => setEditOpen(o => !o)}>
              <span className={styles.editToggleTitle}>✏️ {t.editTitle}</span>
              <span className={`${styles.editToggleIcon} ${editOpen ? styles.open : ''}`}>▾</span>
            </button>
            {editOpen && (
              <div className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.spitzname}</label>
                  <input className={styles.input} type="text" value={spitzname}
                    onChange={e => setSpitzname(e.target.value)} />
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>{t.fach}</label>
                    <select className={styles.select} value={fach} onChange={e => setFach(e.target.value)}>
                      <option value="">{t.select}</option>
                      {(FACH_OPTS[lang] ?? FACH_OPTS.de).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>{t.stufe}</label>
                    <select className={styles.select} value={stufe} onChange={e => setStufe(e.target.value)}>
                      <option value="">{t.select}</option>
                      {(STUFE_OPTS[lang] ?? STUFE_OPTS.de).map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <button className={styles.saveBtn} onClick={handleSave} disabled={saveState === 'saving'}>
                  {saveState === 'saving' ? t.saving : t.save}
                </button>
                {saveState === 'saved' && <p className={styles.saveSuccess}>{t.saved}</p>}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
