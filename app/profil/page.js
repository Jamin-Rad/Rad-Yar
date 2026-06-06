'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/providers/LanguageProvider'
import { loadLeitnerState, LEITNER_STEPS, getBoxLabel, isDue } from '@/utils/leitnerStorage'
import styles from './page.module.css'

/* ── Fachgebiete für den Lernpfad ─────────────────── */
const FACHGEBIETE = [
  { id: 'msk',          icon: '🦴', href: '/lernen/msk',          title: { de: 'MSK',               en: 'MSK',               fa: 'MSK' } },
  { id: 'technik',      icon: '⚙️',  href: '/technik',             title: { de: 'Technik',            en: 'Technique',         fa: 'تکنیک' } },
  { id: 'thorax',       icon: '🫁', href: '/lernen/thorax',        title: { de: 'Thorax',             en: 'Chest',             fa: 'توراکس' } },
  { id: 'abdomen',      icon: '🫀', href: '/lernen/abdomen',       title: { de: 'Abdomen',            en: 'Abdomen',           fa: 'شکم' } },
  { id: 'gehirn',       icon: '🧠', href: '/lernen/gehirn',        title: { de: 'Neuroradiologie',    en: 'Neuroradiology',    fa: 'نوروراد' } },
  { id: 'becken',       icon: '🦴', href: '/lernen/becken',        title: { de: 'Becken',             en: 'Pelvis',            fa: 'لگن' } },
  { id: 'mamma',        icon: '🏥', href: '/lernen/mamma',         title: { de: 'Mamma',              en: 'Breast',            fa: 'ماما' } },
  { id: 'wirbelsaeule', icon: '🦷', href: '/lernen/wirbelsaeule',  title: { de: 'Wirbelsäule',        en: 'Spine',             fa: 'ستون فقرات' } },
]

const STORAGE_PROGRESS_KEY = 'radyar_curriculum_progress'

/* ── Übersetzungen ─────────────────────────────────── */
const T = {
  de: {
    greetMorning: 'Guten Morgen',
    greetDay:     'Hallo',
    greetEvening: 'Guten Abend',
    todayLabel:   'Dein Tagesplan',
    todayDue:     (n) => `${n} Karte${n !== 1 ? 'n' : ''} heute fällig`,
    todayZero:    'Keine Karten fällig — du bist up to date!',
    todaySub:     'Lerne täglich, auch nur 5 Minuten — der Unterschied ist enorm.',
    startCards:   'Karten wiederholen →',
    exploreLernen:'Thema erkunden →',
    lernpfadTitle:'Lernpfad',
    lernpfadSub:  'Alle Fachgebiete',
    flashTitle:   'Flashcard-Fortschritt',
    streakTitle:  'Lernserie',
    streakCurrent:'Aktuelle Serie',
    streakBest:   'Beste Serie',
    days:         'Tage',
    mastered:     'Beherrscht',
    editTitle:    'Profil bearbeiten',
    spitzname:    'Spitzname',
    fach:         'Fachrichtung',
    stufe:        'Ausbildungsstufe',
    select:       '– Bitte wählen –',
    save:         'Speichern',
    saving:       'Wird gespeichert…',
    saved:        '✓ Gespeichert',
    notLoggedTitle: 'Bitte anmelden',
    notLoggedSub:   'Um dein Profil zu sehen, melde dich an.',
    signIn:         'Jetzt anmelden',
    dueToday:       'Heute fällig',
    totalCards:     'Karten gesamt',
    streakLabel:    'Tage-Serie',
    started:        'Gestartet',
    notStarted:     'Noch nicht begonnen',
  },
  en: {
    greetMorning: 'Good morning',
    greetDay:     'Hello',
    greetEvening: 'Good evening',
    todayLabel:   'Your daily plan',
    todayDue:     (n) => `${n} card${n !== 1 ? 's' : ''} due today`,
    todayZero:    'No cards due — you\'re up to date!',
    todaySub:     'Study daily, even just 5 minutes — the difference is huge.',
    startCards:   'Review cards →',
    exploreLernen:'Explore topic →',
    lernpfadTitle:'Learning path',
    lernpfadSub:  'All specialties',
    flashTitle:   'Flashcard progress',
    streakTitle:  'Learning streak',
    streakCurrent:'Current streak',
    streakBest:   'Best streak',
    days:         'days',
    mastered:     'Mastered',
    editTitle:    'Edit profile',
    spitzname:    'Nickname',
    fach:         'Specialty',
    stufe:        'Training level',
    select:       '– Please select –',
    save:         'Save',
    saving:       'Saving…',
    saved:        '✓ Saved',
    notLoggedTitle: 'Please sign in',
    notLoggedSub:   'Sign in to view your profile.',
    signIn:         'Sign in now',
    dueToday:       'Due today',
    totalCards:     'Total cards',
    streakLabel:    'Day streak',
    started:        'Started',
    notStarted:     'Not started',
  },
  fa: {
    greetMorning: 'صبح بخیر',
    greetDay:     'سلام',
    greetEvening: 'عصر بخیر',
    todayLabel:   'برنامه امروز',
    todayDue:     (n) => `${n} کارت امروز مقرر`,
    todayZero:    'هیچ کارتی مقرر نیست — آپ‌تودیت هستی!',
    todaySub:     'هر روز بخوان، حتی ۵ دقیقه — تفاوت بزرگیه.',
    startCards:   'مرور کارت‌ها ←',
    exploreLernen:'کاوش موضوع ←',
    lernpfadTitle:'مسیر یادگیری',
    lernpfadSub:  'همه تخصص‌ها',
    flashTitle:   'پیشرفت فلش‌کارت',
    streakTitle:  'رشته یادگیری',
    streakCurrent:'رشته فعلی',
    streakBest:   'بهترین رشته',
    days:         'روز',
    mastered:     'تسلط',
    editTitle:    'ویرایش پروفایل',
    spitzname:    'اسم مستعار',
    fach:         'تخصص',
    stufe:        'مرحله تحصیلی',
    select:       '– انتخاب کن –',
    save:         'ذخیره',
    saving:       'در حال ذخیره…',
    saved:        '✓ ذخیره شد',
    notLoggedTitle: 'لطفاً وارد شو',
    notLoggedSub:   'برای دیدن پروفایلت وارد شو.',
    signIn:         'ورود',
    dueToday:       'امروز مقرر',
    totalCards:     'کل کارت‌ها',
    streakLabel:    'رشته روز',
    started:        'شروع شده',
    notStarted:     'شروع نشده',
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
  let cur = 0
  let prev = null
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

function loadCurriculumProgress(userId) {
  if (typeof window === 'undefined') return {}
  try {
    const key = userId ? `${STORAGE_PROGRESS_KEY}_${userId}` : STORAGE_PROGRESS_KEY
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

/* ═══════════════════════════════════════════════════════ */
export default function ProfilPage() {
  const { lang } = useLanguage()
  const t   = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'
  const { user, isLoaded } = useUser()

  const [leitner,      setLeitner]      = useState({})
  const [streak,       setStreak]       = useState({ current: 0, best: 0 })
  const [currProgress, setCurrProgress] = useState({})
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
    setCurrProgress(loadCurriculumProgress(user.id))
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

        {/* ── WELCOME HEADER ── */}
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

        {/* ── MAIN GRID ── */}
        <div className={styles.mainGrid}>

          {/* LINKE SPALTE — Lernpfad */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🗺 {t.lernpfadTitle}</h2>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.lernpfadSub}</span>
            </div>
            <div className={styles.fachList}>
              {FACHGEBIETE.map(f => {
                const pct = currProgress[f.id] ?? 0
                const started = pct > 0
                return (
                  <Link key={f.id} href={f.href} className={styles.fachRow}>
                    <span className={styles.fachIcon}>{f.icon}</span>
                    <div className={styles.fachInfo}>
                      <span className={styles.fachName}>{f.title[lang] ?? f.title.de}</span>
                      <div className={styles.fachProgress}>
                        <div className={styles.progressBar}>
                          <div
                            className={`${styles.progressFill} ${pct >= 100 ? styles.progressFillDone : ''}`}
                            style={{ width: `${Math.max(pct, 0)}%` }}
                          />
                        </div>
                        <span className={styles.progressPct}>
                          {started ? `${pct}%` : '–'}
                        </span>
                      </div>
                    </div>
                    <span className={styles.fachArrow}>›</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* RECHTE SPALTE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

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
    </div>
  )
}
