'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { loadLeitnerState, LEITNER_STEPS, getBoxLabel, isDue } from '@/utils/leitnerStorage'
import styles from './page.module.css'

/* ── Daten ─────────────────────────────────────────── */
const FACHRICHTUNGEN = {
  de: ['Radiologie','Allgemeinmedizin','Chirurgie','Innere Medizin','Neurologie','Pädiatrie','Andere'],
  en: ['Radiology','General Medicine','Surgery','Internal Medicine','Neurology','Paediatrics','Other'],
  fa: ['رادیولوژی','پزشکی عمومی','جراحی','داخلی','نورولوژی','اطفال','سایر'],
}
const STUFEN = {
  de: ['Medizinstudent/in','PJ (Praktisches Jahr)','Assistenzarzt/-ärztin','Facharzt/-ärztin','Oberarzt/-ärztin','Andere'],
  en: ['Medical student','Final year (PJ)','Resident','Specialist','Senior physician','Other'],
  fa: ['دانشجوی پزشکی','کارآموز (PJ)','دستیار','متخصص','فوق تخصص','سایر'],
}

const MCQ_KEY = 'radyar_mcq_stats'

/* ── Übersetzungen ─────────────────────────────────── */
const T = {
  de: {
    title:        'Mein Profil',
    editBtn:      'Bearbeiten',
    saveBtn:      'Speichern',
    saving:       'Wird gespeichert…',
    saved:        'Gespeichert ✓',
    spitzname:    'Spitzname',
    fach:         'Fachrichtung',
    stufe:        'Ausbildungsstufe',
    select:       '– Bitte wählen –',
    todayTitle:   'Heutiger Tagesplan',
    todayDue:     'Karten heute fällig',
    todayZero:    'Heute keine Karten fällig — gut gemacht!',
    startBtn:     'Jetzt lernen →',
    leitnerTitle: 'Leitner-Fortschritt',
    streakTitle:  'Lernserie',
    streakCur:    'Aktuelle Serie',
    streakBest:   'Beste Serie',
    streakDays:   'Tage',
    mcqTitle:     'MCQ-Statistik',
    mcqTotal:     'Beantwortet',
    mcqCorrect:   'Richtig',
    mcqWrong:     'Falsch',
    mcqRate:      'Quote',
    mcqEmpty:     'Noch keine MCQs beantwortet.',
    mastered:     'Beherrscht',
    total:        'Gesamt',
    notLoggedIn:  'Bitte anmelden',
  },
  en: {
    title:        'My Profile',
    editBtn:      'Edit',
    saveBtn:      'Save',
    saving:       'Saving…',
    saved:        'Saved ✓',
    spitzname:    'Nickname',
    fach:         'Specialty',
    stufe:        'Training level',
    select:       '– Please select –',
    todayTitle:   'Today\'s plan',
    todayDue:     'cards due today',
    todayZero:    'No cards due today — well done!',
    startBtn:     'Start learning →',
    leitnerTitle: 'Leitner progress',
    streakTitle:  'Learning streak',
    streakCur:    'Current streak',
    streakBest:   'Best streak',
    streakDays:   'days',
    mcqTitle:     'MCQ statistics',
    mcqTotal:     'Answered',
    mcqCorrect:   'Correct',
    mcqWrong:     'Wrong',
    mcqRate:      'Rate',
    mcqEmpty:     'No MCQs answered yet.',
    mastered:     'Mastered',
    total:        'Total',
    notLoggedIn:  'Please sign in',
  },
  fa: {
    title:        'پروفایل من',
    editBtn:      'ویرایش',
    saveBtn:      'ذخیره',
    saving:       'در حال ذخیره…',
    saved:        'ذخیره شد ✓',
    spitzname:    'اسم مستعار',
    fach:         'تخصص',
    stufe:        'مرحله تحصیلی',
    select:       '– انتخاب کن –',
    todayTitle:   'برنامه امروز',
    todayDue:     'کارت برای امروز',
    todayZero:    'امروز کارتی نداری — آفرین!',
    startBtn:     'شروع یادگیری →',
    leitnerTitle: 'پیشرفت لایتنر',
    streakTitle:  'رشته یادگیری',
    streakCur:    'رشته فعلی',
    streakBest:   'بهترین رشته',
    streakDays:   'روز',
    mcqTitle:     'آمار MCQ',
    mcqTotal:     'پاسخ داده',
    mcqCorrect:   'درست',
    mcqWrong:     'اشتباه',
    mcqRate:      'درصد',
    mcqEmpty:     'هنوز MCQ جواب ندادی.',
    mastered:     'تسلط',
    total:        'کل',
    notLoggedIn:  'لطفاً وارد شو',
  },
}

/* ── Streak berechnen ──────────────────────────────── */
function calcStreak(leitnerState) {
  const dates = Object.values(leitnerState)
    .filter(r => r.lastReviewedAt)
    .map(r => new Date(r.lastReviewedAt).toDateString())
  const unique = [...new Set(dates)].sort((a, b) => new Date(b) - new Date(a))
  if (!unique.length) return { current: 0, best: 0 }
  let current = 0, best = 0, streak = 0
  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()
  let prev = null
  for (const d of unique) {
    if (!prev) {
      if (d === today || d === yesterday) { streak = 1; prev = d; continue }
      else break
    }
    const diff = (new Date(prev) - new Date(d)) / 86400000
    if (diff === 1) { streak++; prev = d }
    else break
  }
  current = streak
  // Best streak
  streak = 1
  for (let i = 1; i < unique.length; i++) {
    const diff = (new Date(unique[i-1]) - new Date(unique[i])) / 86400000
    if (diff === 1) { streak++; if (streak > best) best = streak }
    else { streak = 1 }
  }
  if (current > best) best = current
  return { current, best }
}

/* ── MCQ Stats laden ───────────────────────────────── */
function loadMcqStats(userId) {
  if (typeof window === 'undefined') return null
  try {
    const key = userId ? `${MCQ_KEY}_${userId}` : MCQ_KEY
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

/* ═══════════════════════════════════════════════════════
   SEITE
═══════════════════════════════════════════════════════ */
export default function ProfilPage() {
  const { lang } = useLanguage()
  const t   = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'
  const { user, isLoaded } = useUser()

  const [editing,      setEditing]      = useState(false)
  const [spitzname,    setSpitzname]    = useState('')
  const [fachrichtung, setFachrichtung] = useState('')
  const [stufe,        setStufe]        = useState('')
  const [saveState,    setSaveState]    = useState('idle') // idle | saving | saved

  const [leitnerState, setLeitnerState] = useState({})
  const [mcqStats,     setMcqStats]     = useState(null)
  const [streak,       setStreak]       = useState({ current: 0, best: 0 })

  // Daten laden
  useEffect(() => {
    if (!isLoaded || !user) return
    setSpitzname(user.firstName ?? '')
    setFachrichtung(user.unsafeMetadata?.fachrichtung ?? '')
    setStufe(user.unsafeMetadata?.ausbildungsstufe ?? '')

    const state = loadLeitnerState(user.id)
    setLeitnerState(state)
    setStreak(calcStreak(state))
    setMcqStats(loadMcqStats(user.id))
  }, [isLoaded, user])

  if (!isLoaded) return null
  if (!user) return (
    <div className={styles.page}>
      <div className={styles.inner} style={{ textAlign: 'center', paddingTop: 80 }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>{t.notLoggedIn}</p>
        <Link href="/sign-in" style={{ color: 'var(--orange)', fontWeight: 700 }}>Sign in</Link>
      </div>
    </div>
  )

  // Leitner Stats
  const records = Object.values(leitnerState)
  const totalCards = records.length
  const mastered   = records.filter(r => r.status === 'mastered').length
  const dueToday   = records.filter(r => isDue(r)).length

  const boxCounts = LEITNER_STEPS.map(step => ({
    label: getBoxLabel(step.box, lang),
    count: records.filter(r => r.box === step.box && r.status !== 'mastered').length,
  }))
  const maxCount = Math.max(...boxCounts.map(b => b.count), 1)

  // MCQ
  const mcqTotal   = mcqStats?.total   ?? 0
  const mcqCorrect = mcqStats?.correct ?? 0
  const mcqWrong   = mcqTotal - mcqCorrect
  const mcqRate    = mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0

  // Speichern
  async function handleSave() {
    setSaveState('saving')
    try {
      await user.update({
        firstName: spitzname,
        unsafeMetadata: {
          ...user.unsafeMetadata,
          fachrichtung,
          ausbildungsstufe: stufe,
        },
      })
      setSaveState('saved')
      setEditing(false)
      setTimeout(() => setSaveState('idle'), 2500)
    } catch (err) {
      console.error(err)
      setSaveState('idle')
    }
  }

  const fachList  = FACHRICHTUNGEN[lang] ?? FACHRICHTUNGEN.de
  const stufeList = STUFEN[lang] ?? STUFEN.de
  const initials  = (user.firstName?.[0] ?? user.emailAddresses?.[0]?.emailAddress?.[0] ?? '?').toUpperCase()

  return (
    <div className={styles.page} dir={dir}>
      <div className={styles.inner}>

        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.headerInfo}>
            <h1 className={styles.userName}>{user.firstName ?? user.emailAddresses?.[0]?.emailAddress}</h1>
            <div className={styles.userMeta}>
              {fachrichtung && <span className={styles.metaBadge}>{fachrichtung}</span>}
              {stufe        && <span className={styles.metaBadge}>{stufe}</span>}
            </div>
          </div>
          <button className={styles.editBtn} onClick={() => setEditing(e => !e)}>
            {editing ? '✕' : t.editBtn}
          </button>
        </div>

        {/* ── GRID ── */}
        <div className={styles.grid}>

          {/* Tagesplan */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📅 {t.todayTitle}</h2>
            {dueToday > 0 ? (
              <div className={styles.todayRow}>
                <div className={styles.todayNum}>{dueToday}</div>
                <div className={styles.todayInfo}>
                  <strong>{t.todayDue}</strong>
                  <span>{mastered} / {totalCards} {t.mastered}</span>
                </div>
                <Link href="/flashcards" className={styles.startBtn}>{t.startBtn}</Link>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{t.todayZero}</p>
            )}
          </div>

          {/* Streak */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>🔥 {t.streakTitle}</h2>
            <div className={styles.streakRow}>
              <div className={styles.streakStat}>
                <span className={styles.streakNum}>{streak.current}</span>
                <span className={styles.streakLabel}>{t.streakCur}</span>
                <span className={styles.streakLabel}>{t.streakDays}</span>
              </div>
              <div className={styles.streakStat}>
                <span className={styles.streakNum}>{streak.best}</span>
                <span className={styles.streakLabel}>{t.streakBest}</span>
                <span className={styles.streakLabel}>{t.streakDays}</span>
              </div>
            </div>
          </div>

          {/* Leitner */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>🗂 {t.leitnerTitle}</h2>
            <div className={styles.boxList}>
              {boxCounts.map((b, i) => (
                <div key={i} className={styles.boxRow}>
                  <span className={styles.boxName}>{b.label}</span>
                  <div className={styles.boxBarWrap}>
                    <div
                      className={styles.boxBar}
                      style={{ width: `${(b.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className={styles.boxCount}>{b.count}</span>
                </div>
              ))}
              <div className={styles.boxRow}>
                <span className={styles.boxName} style={{ color: '#10b981' }}>✓ {t.mastered}</span>
                <div className={styles.boxBarWrap}>
                  <div className={styles.boxBar} style={{ width: `${(mastered / maxCount) * 100}%`, background: '#10b981' }} />
                </div>
                <span className={styles.boxCount}>{mastered}</span>
              </div>
            </div>
          </div>

          {/* MCQ */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>🎯 {t.mcqTitle}</h2>
            {mcqTotal > 0 ? (
              <>
                <div className={styles.mcqTotal}>
                  <div className={styles.mcqStat}>
                    <strong>{mcqTotal}</strong><span>{t.mcqTotal}</span>
                  </div>
                  <div className={styles.mcqStat}>
                    <strong style={{ color: '#10b981' }}>{mcqCorrect}</strong><span>{t.mcqCorrect}</span>
                  </div>
                  <div className={styles.mcqStat}>
                    <strong style={{ color: '#ef4444' }}>{mcqWrong}</strong><span>{t.mcqWrong}</span>
                  </div>
                  <div className={styles.mcqStat}>
                    <strong>{mcqRate}%</strong><span>{t.mcqRate}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className={styles.mcqEmpty}>{t.mcqEmpty}</p>
            )}
          </div>

          {/* Persönliche Daten bearbeiten */}
          {editing && (
            <div className={`${styles.card} ${styles.gridFull}`}>
              <h2 className={styles.cardTitle}>✏️ {t.editBtn}</h2>
              <div className={styles.form}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.spitzname}</label>
                  <input className={styles.input} type="text" value={spitzname}
                    onChange={e => setSpitzname(e.target.value)} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.fach}</label>
                  <select className={styles.select} value={fachrichtung}
                    onChange={e => setFachrichtung(e.target.value)}>
                    <option value="">{t.select}</option>
                    {fachList.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>{t.stufe}</label>
                  <select className={styles.select} value={stufe}
                    onChange={e => setStufe(e.target.value)}>
                    <option value="">{t.select}</option>
                    {stufeList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <button className={styles.saveBtn} onClick={handleSave}
                  disabled={saveState === 'saving'}>
                  {saveState === 'saving' ? t.saving : t.saveBtn}
                </button>
                {saveState === 'saved' && <p className={styles.successMsg}>{t.saved}</p>}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
