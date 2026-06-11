'use client'

import { useEffect, useMemo, useState } from 'react'
import { useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/providers/LanguageProvider'
import { loadLeitnerState, resetLeitnerState, isDue } from '@/utils/leitnerStorage'
import { loadSettings, saveSettings } from '@/utils/settingsStorage'
import { CURRICULUM, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import styles from './page.module.css'

const T = {
  de: {
    overview: 'Übersicht', settings: 'Einstellungen', profileLabel: 'Dein Profil',
    account: 'Konto', signOut: 'Abmelden', memberSince: 'Mitglied seit',
    greetMorning: 'Guten Morgen', greetDay: 'Hallo', greetEvening: 'Guten Abend',
    dashboardEyebrow: 'Dein Lernfortschritt',
    dashboardTitle: 'Heute zählt der nächste sinnvolle Schritt.',
    dashboardSub: 'Sieh auf einen Blick, wo du stehst und womit du am besten weitermachst.',
    continueLearning: 'Weiterlernen', browseTopics: 'Themen entdecken', reviewCards: 'Karten wiederholen',
    overallProgress: 'Gesamtfortschritt', lessonsRead: 'Lektionen gelesen',
    mcqAccuracy: 'MCQ-Genauigkeit', cardsMastered: 'Karten beherrscht', dueToday: 'heute fällig',
    learningAreas: 'Fortschritt nach Fachgebiet',
    learningAreasSub: 'Nur Fachgebiete mit bereits verfügbaren Lerninhalten werden angezeigt.',
    recentTopics: 'Zuletzt gelernt',
    recentTopicsEmpty: 'Noch keine Lektion abgeschlossen. Starte mit deinem ersten Thema.',
    activity: 'Aktivität der letzten 7 Tage', activitySub: 'Flashcard-Wiederholungen und MCQ-Aktivität',
    profileSection: 'Profil bearbeiten', nickname: 'Spitzname', specialty: 'Fachrichtung',
    level: 'Ausbildungsstufe', select: '– Bitte wählen –', save: 'Speichern',
    saving: 'Wird gespeichert…', saved: 'Gespeichert',
    appSettings: 'Lerneinstellungen', longBoxesLabel: 'Langzeit-Boxen (3 / 6 / 12 Monate)',
    longBoxesHint: 'Zeigt zusätzliche Leitner-Boxen für langfristige Wiederholungen.',
    accountSettings: 'Konto und Sicherheit',
    accountSettingsHint: 'E-Mail-Adresse, Passwort, Profilbild und Sicherheitsoptionen verwalten.',
    manageAccount: 'Konto verwalten', contactTitle: 'Problem melden',
    contactSub: 'Beschreibe kurz, was nicht funktioniert. Deine Nachricht wird direkt per E-Mail an RadYar gesendet.',
    problemType: 'Worum geht es?',
    problemTypes: ['Technisches Problem', 'Fehler im Lerninhalt', 'Problem mit meinem Konto', 'Idee oder Verbesserung', 'Sonstiges'],
    subject: 'Betreff', message: 'Nachricht', subjectPlaceholder: 'Kurze Zusammenfassung',
    messagePlaceholder: 'Was ist passiert? Auf welcher Seite? Was hast du erwartet?',
    send: 'Nachricht senden', sending: 'Wird gesendet…',
    sent: 'Danke. Deine Nachricht wurde gesendet.',
    sendError: 'Die Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.',
    dangerZone: 'Fortschritt zurücksetzen', dangerHint: 'Diese Aktionen können nicht rückgängig gemacht werden.',
    resetFlashcards: 'Flashcard-Fortschritt löschen', resetLearning: 'Gelesene Lektionen löschen',
    resetFlashcardsAsk: 'Wirklich den gesamten Flashcard-Fortschritt löschen?',
    resetLearningAsk: 'Wirklich alle als gelesen markierten Lektionen zurücksetzen?',
    resetDone: 'Fortschritt wurde gelöscht.', notLoggedTitle: 'Bitte anmelden',
    notLoggedSub: 'Um dein Profil zu sehen, melde dich an.', signIn: 'Jetzt anmelden',
    available: 'verfügbar', completed: 'abgeschlossen',
  },
  en: {
    overview: 'Overview', settings: 'Settings', profileLabel: 'Your profile',
    account: 'Account', signOut: 'Sign out', memberSince: 'Member since',
    greetMorning: 'Good morning', greetDay: 'Hello', greetEvening: 'Good evening',
    dashboardEyebrow: 'Your learning progress',
    dashboardTitle: 'Today is about the next useful step.',
    dashboardSub: 'See where you stand and what to focus on next.',
    continueLearning: 'Continue learning', browseTopics: 'Browse topics', reviewCards: 'Review cards',
    overallProgress: 'Overall progress', lessonsRead: 'Lessons read',
    mcqAccuracy: 'MCQ accuracy', cardsMastered: 'Cards mastered', dueToday: 'due today',
    learningAreas: 'Progress by specialty',
    learningAreasSub: 'Only specialties with available learning content are shown.',
    recentTopics: 'Recently learned', recentTopicsEmpty: 'No lesson completed yet. Start with your first topic.',
    activity: 'Activity over the last 7 days', activitySub: 'Flashcard reviews and MCQ activity',
    profileSection: 'Edit profile', nickname: 'Nickname', specialty: 'Specialty',
    level: 'Training level', select: '– Please select –', save: 'Save',
    saving: 'Saving…', saved: 'Saved', appSettings: 'Learning settings',
    longBoxesLabel: 'Long-term boxes (3 / 6 / 12 months)',
    longBoxesHint: 'Show additional Leitner boxes for long-term review.',
    accountSettings: 'Account and security',
    accountSettingsHint: 'Manage email, password, profile image and security options.',
    manageAccount: 'Manage account', contactTitle: 'Report a problem',
    contactSub: 'Tell us briefly what is not working. Your message is sent directly to RadYar by email.',
    problemType: 'What is this about?',
    problemTypes: ['Technical problem', 'Learning content error', 'Account problem', 'Idea or improvement', 'Other'],
    subject: 'Subject', message: 'Message', subjectPlaceholder: 'Short summary',
    messagePlaceholder: 'What happened? On which page? What did you expect?',
    send: 'Send message', sending: 'Sending…', sent: 'Thank you. Your message has been sent.',
    sendError: 'The message could not be sent. Please try again later.',
    dangerZone: 'Reset progress', dangerHint: 'These actions cannot be undone.',
    resetFlashcards: 'Delete flashcard progress', resetLearning: 'Delete read lessons',
    resetFlashcardsAsk: 'Delete all flashcard progress?', resetLearningAsk: 'Reset all lessons marked as read?',
    resetDone: 'Progress has been deleted.', notLoggedTitle: 'Please sign in',
    notLoggedSub: 'Sign in to view your profile.', signIn: 'Sign in now',
    available: 'available', completed: 'completed',
  },
  fa: {
    overview: 'نمای کلی', settings: 'تنظیمات', profileLabel: 'پروفایل شما',
    account: 'حساب کاربری', signOut: 'خروج', memberSince: 'عضو از',
    greetMorning: 'صبح بخیر', greetDay: 'سلام', greetEvening: 'عصر بخیر',
    dashboardEyebrow: 'پیشرفت یادگیری شما', dashboardTitle: 'امروز، قدم مفید بعدی مهم است.',
    dashboardSub: 'ببینید کجا هستید و بهتر است روی چه چیزی تمرکز کنید.',
    continueLearning: 'ادامه یادگیری', browseTopics: 'مشاهده موضوعات', reviewCards: 'مرور کارت‌ها',
    overallProgress: 'پیشرفت کلی', lessonsRead: 'درس خوانده‌شده', mcqAccuracy: 'دقت آزمون',
    cardsMastered: 'کارت مسلط‌شده', dueToday: 'مقرر امروز', learningAreas: 'پیشرفت بر اساس تخصص',
    learningAreasSub: 'فقط تخصص‌های دارای محتوای آموزشی نمایش داده می‌شوند.',
    recentTopics: 'آخرین مطالب آموخته‌شده', recentTopicsEmpty: 'هنوز درسی تکمیل نشده است.',
    activity: 'فعالیت ۷ روز گذشته', activitySub: 'مرور فلش‌کارت و فعالیت آزمون',
    profileSection: 'ویرایش پروفایل', nickname: 'نام مستعار', specialty: 'تخصص',
    level: 'مرحله آموزشی', select: '– انتخاب کنید –', save: 'ذخیره', saving: 'در حال ذخیره…',
    saved: 'ذخیره شد', appSettings: 'تنظیمات یادگیری',
    longBoxesLabel: 'جعبه‌های بلندمدت (۳ / ۶ / ۱۲ ماه)',
    longBoxesHint: 'جعبه‌های اضافی لایتنر برای مرور بلندمدت را نمایش می‌دهد.',
    accountSettings: 'حساب و امنیت',
    accountSettingsHint: 'ایمیل، رمز عبور، تصویر پروفایل و امنیت را مدیریت کنید.',
    manageAccount: 'مدیریت حساب', contactTitle: 'گزارش مشکل',
    contactSub: 'مشکل را کوتاه توضیح دهید. پیام مستقیماً با ایمیل ارسال می‌شود.',
    problemType: 'موضوع چیست؟',
    problemTypes: ['مشکل فنی', 'خطا در محتوای آموزشی', 'مشکل حساب', 'ایده یا پیشنهاد', 'سایر'],
    subject: 'عنوان', message: 'پیام', subjectPlaceholder: 'خلاصه کوتاه',
    messagePlaceholder: 'چه اتفاقی افتاد؟ در کدام صفحه؟ چه انتظاری داشتید؟',
    send: 'ارسال پیام', sending: 'در حال ارسال…', sent: 'متشکریم. پیام شما ارسال شد.',
    sendError: 'پیام ارسال نشد. لطفاً بعداً دوباره تلاش کنید.',
    dangerZone: 'بازنشانی پیشرفت', dangerHint: 'این اقدامات قابل بازگشت نیستند.',
    resetFlashcards: 'حذف پیشرفت فلش‌کارت', resetLearning: 'حذف درس‌های خوانده‌شده',
    resetFlashcardsAsk: 'تمام پیشرفت فلش‌کارت حذف شود؟',
    resetLearningAsk: 'همه درس‌های خوانده‌شده بازنشانی شوند؟',
    resetDone: 'پیشرفت حذف شد.', notLoggedTitle: 'لطفاً وارد شوید',
    notLoggedSub: 'برای مشاهده پروفایل وارد شوید.', signIn: 'ورود',
    available: 'موجود', completed: 'تکمیل‌شده',
  },
}

const FACH_OPTS = {
  de: ['Radiologie', 'Allgemeinmedizin', 'Chirurgie', 'Innere Medizin', 'Neurologie', 'Pädiatrie', 'Andere'],
  en: ['Radiology', 'General Medicine', 'Surgery', 'Internal Medicine', 'Neurology', 'Paediatrics', 'Other'],
  fa: ['رادیولوژی', 'پزشکی عمومی', 'جراحی', 'داخلی', 'نورولوژی', 'اطفال', 'سایر'],
}
const STUFE_OPTS = {
  de: ['Medizinstudent/in', 'PJ', 'Assistenzarzt/-ärztin', 'Facharzt/-ärztin', 'Oberarzt/-ärztin', 'Andere'],
  en: ['Medical student', 'Final year (PJ)', 'Resident', 'Specialist', 'Senior physician', 'Other'],
  fa: ['دانشجوی پزشکی', 'کارآموز (PJ)', 'دستیار', 'متخصص', 'فوق تخصص', 'سایر'],
}

function getGreeting(lang) {
  const hour = new Date().getHours()
  const key = hour < 12 ? 'greetMorning' : hour < 18 ? 'greetDay' : 'greetEvening'
  return (T[lang] ?? T.de)[key]
}

function getAvailableTopics(fach) {
  return fach.kapitel.flatMap(kapitel =>
    kapitel.themen.flatMap(thema => [
      ...(thema.link ? [{ fach, kapitel, thema }] : []),
      ...(thema.sub || []).filter(item => item.link).map(item => ({ fach, kapitel, thema: item })),
    ])
  )
}

function getProgressData(readArticles) {
  const areas = CURRICULUM.map(fach => {
    const topics = getAvailableTopics(fach)
    const read = topics.filter(({ thema }) => Number(readArticles[thema.id] || 0) >= 1).length
    return { fach, topics, read, total: topics.length, pct: topics.length ? Math.round((read / topics.length) * 100) : 0 }
  }).filter(area => area.total > 0)
  const topics = areas.flatMap(area => area.topics)
  const readTopics = topics.filter(({ thema }) => Number(readArticles[thema.id] || 0) >= 1)
  const nextTopic = topics.find(({ thema }) => Number(readArticles[thema.id] || 0) < 1) || topics[0] || null
  return { areas, topics, readTopics, nextTopic }
}

function getActivity(leitner, mcqScores, lang) {
  const locale = lang === 'fa' ? 'fa-IR' : lang === 'en' ? 'en-GB' : 'de-DE'
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - (6 - index))
    return { date, count: 0, label: new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date) }
  })
  Object.values(leitner).forEach(record => {
    if (!record.lastReviewedAt) return
    const day = days.find(item => item.date.toDateString() === new Date(record.lastReviewedAt).toDateString())
    if (day) day.count += 1
  })
  Object.values(mcqScores).forEach(score => {
    if (!score.lastDate) return
    const day = days.find(item => item.date.toDateString() === new Date(score.lastDate).toDateString())
    if (day) day.count += Number(score.attempted || 0)
  })
  return days
}

export default function ProfilPage() {
  const { lang } = useLanguage()
  const t = T[lang] ?? T.de
  const dir = lang === 'fa' ? 'rtl' : 'ltr'
  const { user, isLoaded } = useUser()
  const { openUserProfile, signOut } = useClerk()
  const [view, setView] = useState('overview')
  const [leitner, setLeitner] = useState({})
  const [readArticles, setReadArticles] = useState({})
  const [mcqScores, setMcqScores] = useState({})
  const [settings, setSettings] = useState({ longBoxesEnabled: false })
  const [spitzname, setSpitzname] = useState('')
  const [fach, setFach] = useState('')
  const [stufe, setStufe] = useState('')
  const [saveState, setSaveState] = useState('idle')
  const [resetMsg, setResetMsg] = useState('')
  const [contact, setContact] = useState({ type: '', subject: '', message: '' })
  const [contactState, setContactState] = useState('idle')

  useEffect(() => {
    if (!isLoaded || !user) return
    setSpitzname(user.firstName ?? '')
    setFach(user.unsafeMetadata?.fachrichtung ?? '')
    setStufe(user.unsafeMetadata?.ausbildungsstufe ?? '')
    setLeitner(loadLeitnerState(user.id))
    setSettings(loadSettings())
    try {
      setReadArticles(JSON.parse(localStorage.getItem('radyar_read_articles') || '{}'))
      setMcqScores(JSON.parse(localStorage.getItem('radyar_mcq_scores') || '{}'))
    } catch {}
  }, [isLoaded, user])

  const progress = useMemo(() => getProgressData(readArticles), [readArticles])
  const activity = useMemo(() => getActivity(leitner, mcqScores, lang), [leitner, mcqScores, lang])

  if (!isLoaded) return <div className={styles.page}><Navbar /></div>
  if (!user) return (
    <div className={styles.page} dir={dir}>
      <Navbar />
      <div className={styles.inner}>
        <div className={styles.notLoggedIn}>
          <h2>{t.notLoggedTitle}</h2><p>{t.notLoggedSub}</p>
          <Link href="/sign-in" className={styles.primaryBtn}>{t.signIn}</Link>
        </div>
      </div>
    </div>
  )

  const records = Object.values(leitner)
  const dueToday = records.filter(isDue).length
  const mastered = records.filter(record => record.status === 'mastered').length
  const totalAttempted = Object.values(mcqScores).reduce((sum, score) => sum + Number(score.attempted || 0), 0)
  const totalCorrect = Object.values(mcqScores).reduce((sum, score) => sum + Number(score.correct || 0), 0)
  const mcqAccuracy = totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0
  const overallPct = progress.topics.length ? Math.round((progress.readTopics.length / progress.topics.length) * 100) : 0
  const maxActivity = Math.max(...activity.map(day => day.count), 1)
  const initials = (user.firstName?.[0] ?? user.emailAddresses?.[0]?.emailAddress?.[0] ?? '?').toUpperCase()
  const displayName = user.firstName || user.username || user.emailAddresses?.[0]?.emailAddress
  const memberSince = user.createdAt
    ? new Intl.DateTimeFormat(lang === 'fa' ? 'fa-IR' : lang === 'en' ? 'en-GB' : 'de-DE', { month: 'long', year: 'numeric' }).format(new Date(user.createdAt))
    : null

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

  async function handleContact(event) {
    event.preventDefault()
    setContactState('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, page: window.location.href, lang }),
      })
      if (!response.ok) throw new Error('Request failed')
      setContact({ type: '', subject: '', message: '' })
      setContactState('sent')
    } catch { setContactState('error') }
  }

  function handleResetFlashcards() {
    if (!window.confirm(t.resetFlashcardsAsk)) return
    resetLeitnerState(user.id)
    setLeitner({})
    setResetMsg(t.resetDone)
  }

  function handleResetLearning() {
    if (!window.confirm(t.resetLearningAsk)) return
    try { localStorage.removeItem('radyar_read_articles') } catch {}
    setReadArticles({})
    setResetMsg(t.resetDone)
  }

  function selectView(nextView) {
    setView(nextView)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.page} dir={dir}>
      <Navbar />
      <div className={styles.inner}>
        <div className={styles.dashboardShell}>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarIdentity}>
              {user.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className={styles.sidebarAvatar} src={user.imageUrl} alt="" />
              ) : <div className={styles.sidebarAvatarFallback}>{initials}</div>}
              <span className={styles.sidebarEyebrow}>{t.profileLabel}</span>
              <strong className={styles.sidebarName}>{displayName}</strong>
              <span className={styles.sidebarEmail}>{user.emailAddresses?.[0]?.emailAddress}</span>
              {memberSince && <span className={styles.memberSince}>{t.memberSince} {memberSince}</span>}
            </div>
            <nav className={styles.profileNav} aria-label={t.profileLabel}>
              <button type="button" className={`${styles.profileNavLink} ${view === 'overview' ? styles.profileNavLinkActive : ''}`} onClick={() => selectView('overview')}>
                <span aria-hidden="true">01</span>{t.overview}
              </button>
              <button type="button" className={`${styles.profileNavLink} ${view === 'settings' ? styles.profileNavLinkActive : ''}`} onClick={() => selectView('settings')}>
                <span aria-hidden="true">02</span>{t.settings}
              </button>
            </nav>
            <div className={styles.accountActions}>
              <span className={styles.accountLabel}>{t.account}</span>
              <button type="button" className={styles.signOutButton} onClick={() => signOut({ redirectUrl: '/' })}>
                <span aria-hidden="true">↪</span>{t.signOut}
              </button>
            </div>
          </aside>

          <main className={styles.dashboardMain}>
            {view === 'overview' ? (
              <>
                <section className={styles.progressHero}>
                  <div className={styles.heroCopy}>
                    <p className={styles.heroEyebrow}>{getGreeting(lang)}, {displayName}</p>
                    <h1>{t.dashboardTitle}</h1><p>{t.dashboardSub}</p>
                    <div className={styles.heroActions}>
                      {progress.nextTopic
                        ? <Link href={progress.nextTopic.thema.link} className={styles.primaryBtn}>{t.continueLearning}</Link>
                        : <Link href="/lernen" className={styles.primaryBtn}>{t.browseTopics}</Link>}
                      {dueToday > 0 && <Link href="/flashcards" className={styles.heroSecondary}>{t.reviewCards} ({dueToday})</Link>}
                    </div>
                  </div>
                  <div className={styles.progressRing} style={{ '--progress': `${overallPct * 3.6}deg` }}>
                    <div><strong>{overallPct}%</strong><span>{t.overallProgress}</span></div>
                  </div>
                </section>

                <section className={styles.metricGrid} aria-label={t.dashboardEyebrow}>
                  <article className={styles.metricCard}><span className={styles.metricIndex}>01</span><strong>{progress.readTopics.length}<small> / {progress.topics.length}</small></strong><p>{t.lessonsRead}</p></article>
                  <article className={styles.metricCard}><span className={styles.metricIndex}>02</span><strong>{mcqAccuracy}<small>%</small></strong><p>{t.mcqAccuracy}</p></article>
                  <article className={styles.metricCard}>
                    <span className={styles.metricIndex}>03</span><strong>{mastered}<small> / {records.length}</small></strong><p>{t.cardsMastered}</p>
                    {dueToday > 0 && <span className={styles.metricNote}>{dueToday} {t.dueToday}</span>}
                  </article>
                </section>

                <section className={styles.contentGrid}>
                  <div className={`${styles.card} ${styles.areaCard}`}>
                    <div className={styles.sectionHeading}>
                      <div><h2>{t.learningAreas}</h2><p>{t.learningAreasSub}</p></div>
                      <Link href="/lernen">{t.browseTopics} →</Link>
                    </div>
                    <div className={styles.areaList}>
                      {progress.areas.map(({ fach: area, read, total, pct }) => (
                        <div className={styles.areaRow} key={area.id}>
                          <div className={styles.areaIdentity}>
                            <span className={styles.areaIcon}>{area.icon}</span>
                            <div><strong>{getFachTitle(area, lang)}</strong><small>{read} {t.completed} · {total} {t.available}</small></div>
                          </div>
                          <div className={styles.areaProgress}>
                            <div className={styles.areaBar}><span style={{ width: `${pct}%` }} /></div><strong>{pct}%</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.sideStack}>
                    <div className={styles.card}>
                      <div className={styles.sectionHeading}><div><h2>{t.activity}</h2><p>{t.activitySub}</p></div></div>
                      <div className={styles.activityChart}>
                        {activity.map(day => (
                          <div className={styles.activityDay} key={day.date.toISOString()}>
                            <div className={styles.activityTrack}><span style={{ height: day.count ? `${Math.max((day.count / maxActivity) * 100, 10)}%` : '3px' }} /></div>
                            <small>{day.label}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.card}>
                      <div className={styles.sectionHeading}><div><h2>{t.recentTopics}</h2></div></div>
                      {progress.readTopics.length ? (
                        <div className={styles.recentList}>
                          {progress.readTopics.slice(-4).reverse().map(({ fach: area, kapitel, thema }) => (
                            <Link href={thema.link} key={thema.id} className={styles.recentItem}>
                              <span>{area.icon}</span>
                              <div><strong>{getThemaTitle(thema, lang)}</strong><small>{getFachTitle(area, lang)} · {getKapitelTitle(kapitel, lang)}</small></div><b>→</b>
                            </Link>
                          ))}
                        </div>
                      ) : <p className={styles.emptyState}>{t.recentTopicsEmpty}</p>}
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <div className={styles.settingsView}>
                <div className={styles.settingsHeader}><span>{t.profileLabel}</span><h1>{t.settings}</h1></div>
                <section className={styles.card}>
                  <div className={styles.sectionHeading}><div><h2>{t.profileSection}</h2></div></div>
                  <div className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="nickname">{t.nickname}</label>
                      <input id="nickname" className={styles.input} value={spitzname} onChange={event => setSpitzname(event.target.value)} />
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="specialty">{t.specialty}</label>
                        <select id="specialty" className={styles.select} value={fach} onChange={event => setFach(event.target.value)}>
                          <option value="">{t.select}</option>
                          {(FACH_OPTS[lang] ?? FACH_OPTS.de).map(option => <option key={option}>{option}</option>)}
                        </select>
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="level">{t.level}</label>
                        <select id="level" className={styles.select} value={stufe} onChange={event => setStufe(event.target.value)}>
                          <option value="">{t.select}</option>
                          {(STUFE_OPTS[lang] ?? STUFE_OPTS.de).map(option => <option key={option}>{option}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className={styles.formFooter}>
                      {saveState === 'saved' && <span className={styles.successText}>{t.saved}</span>}
                      <button type="button" className={styles.saveBtn} onClick={handleSave} disabled={saveState === 'saving'}>{saveState === 'saving' ? t.saving : t.save}</button>
                    </div>
                  </div>
                </section>

                <section className={styles.card}>
                  <div className={styles.sectionHeading}><div><h2>{t.appSettings}</h2></div></div>
                  <div className={styles.settingsRow}>
                    <div className={styles.settingsText}><strong>{t.longBoxesLabel}</strong><p>{t.longBoxesHint}</p></div>
                    <button type="button" className={`${styles.toggleSwitch} ${settings.longBoxesEnabled ? styles.toggleSwitchActive : ''}`}
                      onClick={() => {
                        const next = { ...settings, longBoxesEnabled: !settings.longBoxesEnabled }
                        setSettings(next); saveSettings(next)
                      }} role="switch" aria-checked={settings.longBoxesEnabled}>
                      <span className={styles.toggleKnob} />
                    </button>
                  </div>
                  <div className={styles.settingsDivider} />
                  <div className={styles.settingsRow}>
                    <div className={styles.settingsText}><strong>{t.accountSettings}</strong><p>{t.accountSettingsHint}</p></div>
                    <button type="button" className={styles.outlineBtn} onClick={() => openUserProfile()}>{t.manageAccount}</button>
                  </div>
                </section>

                <section className={`${styles.card} ${styles.contactCard}`}>
                  <div className={styles.sectionHeading}><div><h2>{t.contactTitle}</h2><p>{t.contactSub}</p></div></div>
                  <form className={styles.form} onSubmit={handleContact}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="problem-type">{t.problemType}</label>
                      <select id="problem-type" className={styles.select} required value={contact.type} onChange={event => setContact({ ...contact, type: event.target.value })}>
                        <option value="">{t.select}</option>{t.problemTypes.map(option => <option key={option}>{option}</option>)}
                      </select>
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="subject">{t.subject}</label>
                      <input id="subject" className={styles.input} required maxLength={120} placeholder={t.subjectPlaceholder} value={contact.subject} onChange={event => setContact({ ...contact, subject: event.target.value })} />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="message">{t.message}</label>
                      <textarea id="message" className={styles.textarea} required minLength={10} maxLength={3000} placeholder={t.messagePlaceholder} value={contact.message} onChange={event => setContact({ ...contact, message: event.target.value })} />
                    </div>
                    <div className={styles.formFooter}>
                      {contactState === 'sent' && <span className={styles.successText}>{t.sent}</span>}
                      {contactState === 'error' && <span className={styles.errorText}>{t.sendError}</span>}
                      <button className={styles.saveBtn} disabled={contactState === 'sending'}>{contactState === 'sending' ? t.sending : t.send}</button>
                    </div>
                  </form>
                </section>

                <section className={`${styles.card} ${styles.dangerCard}`}>
                  <div className={styles.sectionHeading}><div><h2>{t.dangerZone}</h2><p>{t.dangerHint}</p></div></div>
                  <div className={styles.dangerActions}>
                    <button type="button" className={styles.dangerBtn} onClick={handleResetFlashcards}>{t.resetFlashcards}</button>
                    <button type="button" className={styles.dangerBtn} onClick={handleResetLearning}>{t.resetLearning}</button>
                  </div>
                  {resetMsg && <p className={styles.successText}>{resetMsg}</p>}
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
