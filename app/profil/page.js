'use client'

import { useEffect, useMemo, useState } from 'react'
import { useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { useLanguage } from '@/providers/LanguageProvider'
import { resetLeitnerState, isDue, pullLeitnerStateFromServer } from '@/utils/leitnerStorage'
import { syncLocalProgressToServer } from '@/utils/syncProgressToServer'
import { loadSettings, saveSettings } from '@/utils/settingsStorage'
import { CURRICULUM, getFachTitle, getKapitelTitle, getThemaTitle } from '@/data/curriculum'
import { MCQ_TOPIC_GROUPS } from '@/data/questions'
import { getActivitySummary } from '@/utils/activityStorage'
import { getSubscription, isSubscriptionActive } from '@/utils/subscription'
import styles from './page.module.css'

const localDateKey = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

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
    learningAreasSub: 'Fachgebiet öffnen, um Fortschritt und nächste Schritte nach Hauptthema zu sehen.',
    recentTopics: 'Zuletzt gelernte Lektionen',
    recentTopicsEmpty: 'Noch keine Lektion abgeschlossen. Starte mit deinem ersten Thema.',
    activity: 'Aktivität der letzten 14 Tage', activitySub: 'Aktive Lernzeit pro Tag und Lernbereich',
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
    problemTypes: ['Technisches Problem', 'Fehler im Lerninhalt', 'Problem mit meinem Konto', 'Abonnement aktivieren', 'Idee oder Verbesserung', 'Sonstiges'],
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
    streak: 'Tage in Folge', activeTime: 'Aktive Lernzeit', visitedDays: 'Besuchstage',
    chapterProgress: 'Fortschritt nach Hauptthema', learnedLessons: 'Zuletzt gelernte Lektionen',
    unreadLessons: 'Verfügbar, noch nicht gelernt', openLesson: 'Lernen',
    dailyGoal: 'Tägliches MCQ-Ziel', dailyGoalHint: 'Wie viele MCQs möchtest du pro Tag bearbeiten?',
    todayDone: 'Heute geschafft', goalReached: 'Tagesziel erreicht', startGoal: 'MCQs starten',
    wrongQuestions: 'Falsche MCQs wiederholen', wrongQuestionsHint: 'Diese Fragen wurden zuletzt falsch beantwortet.',
    repeatWrong: 'Fehler lernen', unlearnedMcq: 'Noch nicht geübte MCQ-Themen', practiceNow: 'Jetzt üben',
    flashReport: 'Flashcard-Bericht', flashSeen: 'begonnen', flashWrong: 'nicht gewusst',
    flashDue: 'heute fällig', toFlashcards: 'Zur Flashcard-Seite',
    flashThirtyDays: '30 Tage erreicht', flashThirtyDaysHint: 'Karten ab der 30-Tage-Stufe',
    lessonsActivity: 'Lernen', practiceActivity: 'MCQ + Fallprüfung', flashActivity: 'Flashcards',
    totalActivity: 'Gesamt', activityTrackingHint: 'Die Aufteilung nach Lernbereich wird ab jetzt erfasst; ältere Aktivität bleibt unter Gesamt erhalten.',
    readAvailable: 'verfügbare Themen gelesen', flashProgress: 'Flashcards auf 30-Tage-Stufe',
    mcqCorrect: 'MCQs richtig', noMcqYet: 'noch keine MCQs', nextStep: 'Nächster Schritt',
    openArea: 'Details anzeigen', closeArea: 'Details schließen',
    recommendations: 'Empfehlungen', learnMcq: 'MCQs üben', learnFlash: 'Flashcards lernen',
    clerkData: 'Anmeldedaten', clerkDataHint: 'E-Mail-Adresse, Anmeldeart und letzte Anmeldung.',
    primaryEmail: 'Primäre E-Mail', username: 'Benutzername', loginOrigin: 'Anmeldung über',
    lastSignIn: 'Letzte Anmeldung', noValue: 'Nicht angegeben',
    subscriptionTitle: 'Abonnement', subscriptionActiveUntil: 'Aktiv bis',
    subscriptionInactive: 'Kein aktives Abonnement',
    subscriptionPromoBanner: '🎉 Die ersten 1000 aktivierten Abonnements erhalten 5 Monate kostenfrei!',
    subscriptionManualHint: 'Die Aktivierung erfolgt derzeit manuell. Kontaktiere uns über das Formular unten, um dein Abonnement freischalten zu lassen.',
    subscriptionActivateCta: 'Abonnement anfragen', subscriptionPromoBadge: 'Promo',
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
    learningAreasSub: 'Open a specialty to see progress and next steps by main topic.',
    recentTopics: 'Recently learned lessons', recentTopicsEmpty: 'No lesson completed yet. Start with your first topic.',
    activity: 'Activity over the last 14 days', activitySub: 'Active learning time per day and learning area',
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
    problemTypes: ['Technical problem', 'Learning content error', 'Account problem', 'Activate subscription', 'Idea or improvement', 'Other'],
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
    streak: 'Day streak', activeTime: 'Active learning time', visitedDays: 'Visit days',
    chapterProgress: 'Progress by main topic', learnedLessons: 'Recently learned lessons',
    unreadLessons: 'Available, not learned yet', openLesson: 'Learn',
    dailyGoal: 'Daily MCQ goal', dailyGoalHint: 'How many MCQs do you want to complete each day?',
    todayDone: 'Completed today', goalReached: 'Daily goal reached', startGoal: 'Start MCQs',
    wrongQuestions: 'Review wrong MCQs', wrongQuestionsHint: 'These questions were answered incorrectly most recently.',
    repeatWrong: 'Review errors', unlearnedMcq: 'MCQ topics not practised yet', practiceNow: 'Practice now',
    flashReport: 'Flashcard report', flashSeen: 'started', flashWrong: 'missed',
    flashDue: 'due today', toFlashcards: 'Go to flashcards',
    flashThirtyDays: '30 days reached', flashThirtyDaysHint: 'Cards at or beyond the 30-day stage',
    lessonsActivity: 'Lessons', practiceActivity: 'MCQ + case exam', flashActivity: 'Flashcards',
    totalActivity: 'Total', activityTrackingHint: 'The breakdown by learning area is tracked from now on; earlier activity remains available under Total.',
    readAvailable: 'available topics read', flashProgress: 'flashcards at 30-day stage',
    mcqCorrect: 'MCQs correct', noMcqYet: 'no MCQs yet', nextStep: 'Next step',
    openArea: 'Show details', closeArea: 'Hide details',
    recommendations: 'Recommendations', learnMcq: 'Practice MCQs', learnFlash: 'Study flashcards',
    clerkData: 'Sign-in details', clerkDataHint: 'Email address, sign-in method and latest sign-in.',
    primaryEmail: 'Primary email', username: 'Username', loginOrigin: 'Signed in with',
    lastSignIn: 'Last sign-in', noValue: 'Not provided',
    subscriptionTitle: 'Subscription', subscriptionActiveUntil: 'Active until',
    subscriptionInactive: 'No active subscription',
    subscriptionPromoBanner: '🎉 The first 1000 activated subscriptions get 5 months free!',
    subscriptionManualHint: 'Activation is currently handled manually. Contact us using the form below to get your subscription activated.',
    subscriptionActivateCta: 'Request subscription', subscriptionPromoBadge: 'Promo',
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
    learningAreasSub: 'برای مشاهده پیشرفت و گام بعدی در هر موضوع اصلی، تخصص را باز کنید.',
    recentTopics: 'آخرین درس‌های آموخته‌شده', recentTopicsEmpty: 'هنوز درسی تکمیل نشده است.',
    activity: 'فعالیت ۱۴ روز گذشته', activitySub: 'زمان فعال روزانه در هر بخش آموزشی',
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
    problemTypes: ['مشکل فنی', 'خطا در محتوای آموزشی', 'مشکل حساب', 'فعال‌سازی اشتراک', 'ایده یا پیشنهاد', 'سایر'],
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
    streak: 'روز متوالی', activeTime: 'زمان فعال یادگیری', visitedDays: 'روزهای بازدید',
    chapterProgress: 'پیشرفت موضوعات اصلی', learnedLessons: 'آخرین درس‌های آموخته‌شده',
    unreadLessons: 'موجود و هنوز مطالعه‌نشده', openLesson: 'مطالعه',
    dailyGoal: 'هدف روزانه MCQ', dailyGoalHint: 'روزانه چند MCQ می‌خواهید پاسخ دهید؟',
    todayDone: 'انجام‌شده امروز', goalReached: 'هدف روزانه تکمیل شد', startGoal: 'شروع MCQ',
    wrongQuestions: 'مرور MCQهای اشتباه', wrongQuestionsHint: 'این سؤال‌ها آخرین بار اشتباه پاسخ داده شدند.',
    repeatWrong: 'مرور اشتباه‌ها', unlearnedMcq: 'موضوعات MCQ تمرین‌نشده', practiceNow: 'تمرین',
    flashReport: 'گزارش فلش‌کارت', flashSeen: 'شروع‌شده', flashWrong: 'بلد نبود',
    flashDue: 'مقرر امروز', toFlashcards: 'رفتن به فلش‌کارت‌ها',
    flashThirtyDays: 'رسیدن به ۳۰ روز', flashThirtyDaysHint: 'کارت‌های مرحله ۳۰ روز یا بالاتر',
    lessonsActivity: 'درس‌ها', practiceActivity: 'MCQ و آزمون بالینی', flashActivity: 'فلش‌کارت',
    totalActivity: 'مجموع', activityTrackingHint: 'تفکیک زمان بر اساس بخش آموزشی از این پس ثبت می‌شود؛ فعالیت قبلی در مجموع باقی می‌ماند.',
    readAvailable: 'موضوع موجود مطالعه‌شده', flashProgress: 'فلش‌کارت در مرحله ۳۰ روز',
    mcqCorrect: 'پاسخ صحیح MCQ', noMcqYet: 'هنوز MCQ ندارد', nextStep: 'گام بعدی',
    openArea: 'نمایش جزئیات', closeArea: 'بستن جزئیات',
    recommendations: 'پیشنهادها', learnMcq: 'تمرین MCQ', learnFlash: 'مطالعه فلش‌کارت',
    clerkData: 'اطلاعات ورود', clerkDataHint: 'ایمیل، روش ورود و آخرین ورود.',
    primaryEmail: 'ایمیل اصلی', username: 'نام کاربری', loginOrigin: 'ورود از طریق',
    lastSignIn: 'آخرین ورود', noValue: 'ثبت نشده',
    subscriptionTitle: 'اشتراک', subscriptionActiveUntil: 'فعال تا',
    subscriptionInactive: 'اشتراک فعالی وجود ندارد',
    subscriptionPromoBanner: '🎉 اولین ۱۰۰۰ اشتراک فعال‌شده، ۵ ماه رایگان دریافت می‌کنند!',
    subscriptionManualHint: 'فعال‌سازی در حال حاضر به‌صورت دستی انجام می‌شود. از طریق فرم زیر با ما در تماس باشید تا اشتراک شما فعال شود.',
    subscriptionActivateCta: 'درخواست اشتراک', subscriptionPromoBadge: 'پروموشن',
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
    const chapters = fach.kapitel.map(kapitel => {
      const chapterTopics = getAvailableTopics({ ...fach, kapitel: [kapitel] })
      const chapterRead = chapterTopics.filter(({ thema }) => Number(readArticles[thema.id] || 0) >= 1).length
      return {
        kapitel,
        read: chapterRead,
        total: chapterTopics.length,
        pct: chapterTopics.length ? Math.round((chapterRead / chapterTopics.length) * 100) : 0,
      }
    }).filter(chapter => chapter.total > 0)
    return { fach, topics, chapters, read, total: topics.length, pct: topics.length ? Math.round((read / topics.length) * 100) : 0 }
  }).filter(area => area.total > 0)
  const topics = areas.flatMap(area => area.topics)
  const readTopics = topics.filter(({ thema }) => Number(readArticles[thema.id] || 0) >= 1)
  const unreadTopics = topics.filter(({ thema }) => Number(readArticles[thema.id] || 0) < 1)
  const nextTopic = topics.find(({ thema }) => Number(readArticles[thema.id] || 0) < 1) || topics[0] || null
  return { areas, topics, readTopics, unreadTopics, nextTopic }
}

function formatDuration(seconds, lang) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) return lang === 'fa' ? `${hours} ساعت ${minutes} دقیقه` : `${hours} h ${minutes} min`
  return lang === 'fa' ? `${minutes} دقیقه` : `${minutes} min`
}

function formatCompactDuration(seconds, lang) {
  const minutes = Math.round(Number(seconds || 0) / 60)
  if (minutes < 60) return lang === 'fa' ? `${minutes} د` : `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return lang === 'fa' ? `${hours} س ${rest} د` : `${hours} h ${rest} min`
}

function getActivity(daysByDate, lang) {
  const locale = lang === 'fa' ? 'fa-IR' : lang === 'en' ? 'en-GB' : 'de-DE'
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() - (13 - index))
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    const stored = daysByDate[key] || {}
    return {
      date,
      key,
      label: new Intl.DateTimeFormat(locale, { weekday: 'short', day: '2-digit', month: '2-digit' }).format(date),
      total: Number(stored.activeSeconds || 0),
      lessons: Number(stored.categories?.lessons || 0),
      practice: Number(stored.categories?.practice || 0),
      flashcards: Number(stored.categories?.flashcards || 0),
    }
  })
}

function getAreaLearningData(progress, leitner, mcqScores) {
  const readTopicIds = new Set(progress.readTopics.map(item => item.thema.id))

  return progress.areas.map(area => {
    const chapters = area.chapters.map(chapter => {
      const chapterTopics = area.topics.filter(item => item.kapitel.id === chapter.kapitel.id)
      const flashTopicIds = [...new Set(chapterTopics
        .map(item => item.thema.flashcardLink?.split('/').filter(Boolean).at(-1))
        .filter(Boolean))]
      const cardRecords = Object.entries(leitner)
        .filter(([cardId]) => flashTopicIds.some(topicId => cardId.startsWith(`${topicId}-`)))
        .map(([, record]) => record)
      const startedCards = cardRecords.filter(record => Number(record.seenCount || 0) > 0)
      const thirtyDayCards = startedCards.filter(record => record.status === 'mastered' || Number(record.box || 0) >= 5)
      const mcqTopicIds = MCQ_TOPIC_GROUPS
        .filter(group => group.fachId === area.fach.id && group.kapitelId === chapter.kapitel.id)
        .flatMap(group => group.topics.map(topic => topic.id))
      const mcqResults = mcqTopicIds.map(topicId => mcqScores[topicId]).filter(Boolean)
      const attempted = mcqResults.reduce((sum, score) => sum + Number(score.attempted || 0), 0)
      const correct = mcqResults.reduce((sum, score) => sum + Number(score.correct || 0), 0)
      const nextTopic = chapterTopics.find(({ thema }) => !readTopicIds.has(thema.id))

      return {
        ...chapter,
        flashStarted: startedCards.length,
        flashThirtyDays: thirtyDayCards.length,
        flashPct: startedCards.length ? Math.round((thirtyDayCards.length / startedCards.length) * 100) : 0,
        mcqAttempted: attempted,
        mcqCorrect: correct,
        mcqPct: attempted ? Math.round((correct / attempted) * 100) : 0,
        nextTopic,
      }
    })
    const flashStarted = chapters.reduce((sum, chapter) => sum + chapter.flashStarted, 0)
    const flashThirtyDays = chapters.reduce((sum, chapter) => sum + chapter.flashThirtyDays, 0)
    const mcqAttempted = chapters.reduce((sum, chapter) => sum + chapter.mcqAttempted, 0)
    const mcqCorrect = chapters.reduce((sum, chapter) => sum + chapter.mcqCorrect, 0)
    return {
      ...area,
      chapters,
      flashStarted,
      flashThirtyDays,
      flashPct: flashStarted ? Math.round((flashThirtyDays / flashStarted) * 100) : 0,
      mcqAttempted,
      mcqCorrect,
      mcqPct: mcqAttempted ? Math.round((mcqCorrect / mcqAttempted) * 100) : 0,
    }
  })
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
  const [learningHistory, setLearningHistory] = useState([])
  const [activitySummary, setActivitySummary] = useState({ totalSeconds: 0, streak: 0, visitedDays: 0, days: {} })
  const [settings, setSettings] = useState({ longBoxesEnabled: false })
  const [spitzname, setSpitzname] = useState('')
  const [fach, setFach] = useState('')
  const [stufe, setStufe] = useState('')
  const [saveState, setSaveState] = useState('idle')
  const [resetMsg, setResetMsg] = useState('')
  const [contact, setContact] = useState({ type: '', subject: '', message: '' })
  const [contactState, setContactState] = useState('idle')
  const [isAdmin, setIsAdmin] = useState(false)
  const [openAreaId, setOpenAreaId] = useState(null)

  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => setIsAdmin(!!data.isAdmin))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!isLoaded || !user) return
    setSpitzname(user.firstName ?? '')
    setFach(user.unsafeMetadata?.fachrichtung ?? '')
    setStufe(user.unsafeMetadata?.ausbildungsstufe ?? '')
    setSettings(loadSettings())
    let localReadArticles = {}
    let localMcqScores = {}
    let localLearningHistory = []
    try {
      localReadArticles = JSON.parse(localStorage.getItem('radyar_read_articles') || '{}')
      localMcqScores = JSON.parse(localStorage.getItem('radyar_mcq_scores') || '{}')
      localLearningHistory = JSON.parse(localStorage.getItem('radyar_learning_history') || '[]')
    } catch {}
    setReadArticles(localReadArticles)
    setMcqScores(localMcqScores)
    setLearningHistory(localLearningHistory)
    setActivitySummary(getActivitySummary(user.id))

    // Einmalig: bestehende localStorage-Daten in Supabase übernehmen (Geräte-Sync)
    syncLocalProgressToServer(user.id)

    pullLeitnerStateFromServer(user.id).then(setLeitner)

    // Lesefortschritt vom Server holen und mergen (Server gewinnt bei "gelesen")
    fetch('/api/progress/read-status')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!data) return
        const mergedRead = { ...localReadArticles }
        for (const [id, read] of Object.entries(data.read || {})) {
          if (read) mergedRead[id] = 1
        }
        setReadArticles(mergedRead)
        const historyById = new Map(localLearningHistory.map(item => [item.topicId, item]))
        for (const item of data.history || []) {
          historyById.set(item.topicId, item)
        }
        setLearningHistory([...historyById.values()])
      })
      .catch(() => {})

    // MCQ-Ergebnisse vom Server holen und mergen (neuerer lastDate gewinnt)
    fetch('/api/progress/mcq-results')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (!data) return
        const merged = { ...localMcqScores }
        for (const [themaId, serverResult] of Object.entries(data.scores || {})) {
          const localResult = merged[themaId]
          if (!localResult || new Date(serverResult.lastDate) > new Date(localResult.lastDate || 0)) {
            merged[themaId] = serverResult
          }
        }
        setMcqScores(merged)
      })
      .catch(() => {})
  }, [isLoaded, user])

  useEffect(() => {
    if (!user) return
    const refreshActivity = () => setActivitySummary(getActivitySummary(user.id))
    window.addEventListener('radyar:activity-updated', refreshActivity)
    return () => window.removeEventListener('radyar:activity-updated', refreshActivity)
  }, [user])

  const progress = useMemo(() => getProgressData(readArticles), [readArticles])
  const areaLearningData = useMemo(
    () => getAreaLearningData(progress, leitner, mcqScores),
    [progress, leitner, mcqScores]
  )
  const activity = useMemo(() => getActivity(activitySummary.days || {}, lang), [activitySummary.days, lang])

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

  const subscription = getSubscription(user)
  const subscriptionActive = isSubscriptionActive(user)
  const records = Object.values(leitner)
  const dueToday = records.filter(isDue).length
  const thirtyDayCards = records.filter(record =>
    Number(record.seenCount || 0) > 0 && (record.status === 'mastered' || Number(record.box || 0) >= 5)
  ).length
  const totalAttempted = Object.values(mcqScores).reduce((sum, score) => sum + Number(score.attempted || 0), 0)
  const totalCorrect = Object.values(mcqScores).reduce((sum, score) => sum + Number(score.correct || 0), 0)
  const mcqAccuracy = totalAttempted ? Math.round((totalCorrect / totalAttempted) * 100) : 0
  const overallPct = progress.topics.length ? Math.round((progress.readTopics.length / progress.topics.length) * 100) : 0
  const todayKey = localDateKey()
  const todayAttempted = Object.values(mcqScores).reduce(
    (sum, score) => sum + Number(score.daily?.[todayKey]?.attempted || (score.lastDate?.slice(0, 10) === todayKey ? score.lastSessionAttempted || 0 : 0)),
    0
  )
  const dailyGoal = Number(settings.mcqDailyGoal || 10)
  const dailyGoalPct = Math.min(100, Math.round((todayAttempted / dailyGoal) * 100))
  const wrongQuestionIds = [...new Set(Object.values(mcqScores).flatMap(score => score.wrongQuestionIds || []))]
  const startedCards = records.filter(record => Number(record.seenCount || 0) > 0).length
  const unpractisedMcq = MCQ_TOPIC_GROUPS.flatMap(group =>
    group.topics.map(topic => ({ ...topic, fachId: group.fachId }))
  ).filter(topic => !mcqScores[topic.id]).slice(0, 4)
  const topicLookup = new Map(progress.topics.map(item => [item.thema.id, item]))
  const recentTopics = learningHistory
    .slice()
    .sort((a, b) => new Date(b.learnedAt) - new Date(a.learnedAt))
    .map(item => topicLookup.get(item.topicId))
    .filter(Boolean)
    .slice(0, 10)
  const displayedRecentTopics = (recentTopics.length ? recentTopics : progress.readTopics.slice().reverse()).slice(0, 10)
  const connectedProviders = user.externalAccounts?.map(account => account.provider).filter(Boolean) || []
  const thirtyDayPct = startedCards ? Math.round((thirtyDayCards / startedCards) * 100) : 0
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
    try { localStorage.removeItem('radyar_learning_history') } catch {}
    setReadArticles({})
    setLearningHistory([])
    setResetMsg(t.resetDone)
  }

  function selectView(nextView) {
    setView(nextView)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function scrollToSubscriptionContact() {
    setContact(prev => ({ ...prev, type: t.problemTypes[3] }))
    document.getElementById('problem-type')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
              {isAdmin && (
                <Link href="/admin" className={styles.adminLink}>
                  <span aria-hidden="true">⚙</span>Admin-Dashboard
                </Link>
              )}
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
                  <article className={styles.metricCard}><span className={styles.metricIndex}>02</span><strong>{activitySummary.streak}</strong><p>{t.streak}</p></article>
                  <article className={styles.metricCard}><span className={styles.metricIndex}>03</span><strong>{formatDuration(activitySummary.totalSeconds, lang)}</strong><p>{t.activeTime}</p></article>
                  <article className={styles.metricCard}><span className={styles.metricIndex}>04</span><strong>{activitySummary.visitedDays}</strong><p>{t.visitedDays}</p></article>
                  <article className={styles.metricCard}><span className={styles.metricIndex}>05</span><strong>{mcqAccuracy}<small>%</small></strong><p>{t.mcqAccuracy}</p></article>
                </section>

                <section className={`${styles.card} ${styles.areaCard}`}>
                  <div className={styles.sectionHeading}>
                    <div><h2>{t.learningAreas}</h2><p>{t.learningAreasSub}</p></div>
                    <Link href="/lernen">{t.browseTopics} →</Link>
                  </div>
                  <div className={styles.areaList}>
                    {areaLearningData.map(area => {
                      const isOpen = openAreaId === area.fach.id
                      return (
                        <div className={`${styles.areaBlock} ${isOpen ? styles.areaBlockOpen : ''}`} key={area.fach.id}>
                          <button
                            type="button"
                            className={styles.areaRow}
                            onClick={() => setOpenAreaId(isOpen ? null : area.fach.id)}
                            aria-expanded={isOpen}
                          >
                            <div className={styles.areaIdentity}>
                              <span className={styles.areaIcon}>
                                <Image src={`/fach/${area.fach.imageId || area.fach.id}.png`} alt="" width={28} height={28} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                              </span>
                              <div>
                                <strong>{getFachTitle(area.fach, lang)}</strong>
                                <small>{area.read} {t.completed} · {area.total} {t.available}</small>
                              </div>
                            </div>
                            <div className={styles.areaSummary}>
                              <span>{area.pct}% {t.readAvailable}</span>
                              <span>{area.flashThirtyDays}/{area.flashStarted} {t.flashThirtyDays}</span>
                              <span>{area.mcqAttempted ? `${area.mcqPct}% ${t.mcqCorrect}` : t.noMcqYet}</span>
                            </div>
                            <div className={styles.areaProgress}>
                              <div className={styles.areaBar}><span style={{ width: `${area.pct}%` }} /></div>
                              <strong>{area.pct}%</strong>
                            </div>
                            <span className={`${styles.areaChevron} ${isOpen ? styles.areaChevronOpen : ''}`} aria-label={isOpen ? t.closeArea : t.openArea}>›</span>
                          </button>
                          {isOpen && (
                            <div className={styles.areaDetails}>
                              {area.chapters.map(chapter => (
                                <article className={styles.chapterDetail} key={chapter.kapitel.id}>
                                  <div className={styles.chapterDetailHeading}>
                                    <div>
                                      <strong>{getKapitelTitle(chapter.kapitel, lang)}</strong>
                                      <small>{chapter.read}/{chapter.total} {t.readAvailable}</small>
                                    </div>
                                    <b>{chapter.pct}%</b>
                                  </div>
                                  <div className={styles.chapterDetailBar}><span style={{ width: `${chapter.pct}%` }} /></div>
                                  <div className={styles.chapterStats}>
                                    <span><b>{chapter.pct}%</b>{t.readAvailable}</span>
                                    <span><b>{chapter.flashThirtyDays}/{chapter.flashStarted}</b>{t.flashProgress}</span>
                                    <span><b>{chapter.mcqAttempted ? `${chapter.mcqPct}%` : '–'}</b>{chapter.mcqAttempted ? `${chapter.mcqCorrect}/${chapter.mcqAttempted} ${t.mcqCorrect}` : t.noMcqYet}</span>
                                  </div>
                                  {chapter.nextTopic && (
                                    <Link className={styles.nextStepLink} href={chapter.nextTopic.thema.link}>
                                      <span>{t.nextStep}</span>
                                      <strong>{getThemaTitle(chapter.nextTopic.thema, lang)} →</strong>
                                    </Link>
                                  )}
                                </article>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>

                <section className={`${styles.card} ${styles.activityCard}`}>
                  <div className={styles.sectionHeading}><div><h2>{t.activity}</h2><p>{t.activitySub}</p></div></div>
                  <div className={styles.activityLegend}>
                    <span><i className={styles.legendLessons} />{t.lessonsActivity}</span>
                    <span><i className={styles.legendPractice} />{t.practiceActivity}</span>
                    <span><i className={styles.legendFlash} />{t.flashActivity}</span>
                  </div>
                  <div className={styles.activityTable}>
                    <div className={`${styles.activityRow} ${styles.activityHeader}`}>
                      <strong />
                      <span>{t.lessonsActivity}</span>
                      <span>{t.practiceActivity}</span>
                      <span>{t.flashActivity}</span>
                      <b>{t.totalActivity}</b>
                    </div>
                    {activity.map(day => (
                      <div className={styles.activityRow} key={day.key}>
                        <strong>{day.label}</strong>
                        <span className={styles.activityTime}><i className={styles.legendLessons} />{formatCompactDuration(day.lessons, lang)}</span>
                        <span className={styles.activityTime}><i className={styles.legendPractice} />{formatCompactDuration(day.practice, lang)}</span>
                        <span className={styles.activityTime}><i className={styles.legendFlash} />{formatCompactDuration(day.flashcards, lang)}</span>
                        <b>{formatCompactDuration(day.total, lang)}</b>
                      </div>
                    ))}
                  </div>
                  <p className={styles.activityHint}>{t.activityTrackingHint}</p>
                </section>

                <section className={styles.dashboardTwoCol}>
                  <div className={styles.card}>
                    <div className={styles.sectionHeading}><div><h2>{t.flashReport}</h2><p>{t.flashThirtyDaysHint}</p></div><Link href="/flashcards">{t.toFlashcards} →</Link></div>
                    <div className={styles.flashReportGrid}>
                      <div><strong>{startedCards}</strong><span>{t.flashSeen}</span></div>
                      <div><strong>{dueToday}</strong><span>{t.flashDue}</span></div>
                      <div><strong>{thirtyDayCards} <small>({thirtyDayPct}%)</small></strong><span>{t.flashThirtyDays}</span></div>
                    </div>
                  </div>

                  <div className={styles.card}>
                    <div className={styles.sectionHeading}><div><h2>{t.dailyGoal}</h2><p>{todayAttempted} / {dailyGoal} · {t.todayDone}</p></div></div>
                    <div className={styles.goalBar}><span style={{ width: `${dailyGoalPct}%` }} /></div>
                    <div className={styles.goalActions}>
                      <strong>{todayAttempted >= dailyGoal ? `✓ ${t.goalReached}` : `${dailyGoal - todayAttempted} MCQs`}</strong>
                      <Link href="/ueben">{t.startGoal} →</Link>
                    </div>
                    {wrongQuestionIds.length > 0 && (
                      <div className={styles.practiceCallout}>
                        <div><strong>{t.wrongQuestions}</strong><small>{wrongQuestionIds.length} · {t.wrongQuestionsHint}</small></div>
                        <Link href={`/ueben/quiz?fragen=${wrongQuestionIds.join(',')}&n=${wrongQuestionIds.length}&from=${encodeURIComponent('/profil')}`}>{t.repeatWrong} →</Link>
                      </div>
                    )}
                    {unpractisedMcq.length > 0 && (
                      <div className={styles.unpractisedList}>
                        <strong>{t.unlearnedMcq}</strong>
                        {unpractisedMcq.map(topic => (
                          <Link key={topic.id} href={`/ueben/quiz?fach=${topic.fachId}&n=10&themen=${topic.id}&from=${encodeURIComponent('/profil')}`}>
                            <span>{topic.title[lang] || topic.title.de}</span><b>{t.practiceNow} →</b>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </section>

                <section className={styles.lessonColumns}>
                  <div className={styles.card}>
                    <div className={styles.sectionHeading}><div><h2>{t.recentTopics}</h2></div></div>
                    {displayedRecentTopics.length ? (
                      <div className={styles.lessonList}>
                        {displayedRecentTopics.map(({ fach: area, kapitel, thema }) => (
                          <Link key={thema.id} href={thema.link}><span>✓</span><div><strong>{getThemaTitle(thema, lang)}</strong><small>{getFachTitle(area, lang)} · {getKapitelTitle(kapitel, lang)}</small></div></Link>
                        ))}
                      </div>
                    ) : <p className={styles.emptyState}>{t.recentTopicsEmpty}</p>}
                  </div>
                  <div className={styles.card}>
                    <div className={styles.sectionHeading}><div><h2>{t.unreadLessons}</h2></div></div>
                    <div className={styles.lessonList}>
                      {progress.unreadTopics.slice(0, 10).map(({ fach: area, thema }) => (
                        <Link key={thema.id} href={thema.link}><span>○</span><div><strong>{getThemaTitle(thema, lang)}</strong><small>{getFachTitle(area, lang)} · {t.openLesson}</small></div></Link>
                      ))}
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <div className={styles.settingsView}>
                <div className={styles.settingsHeader}><span>{t.profileLabel}</span><h1>{t.settings}</h1></div>
                <section className={styles.card}>
                  <div className={styles.sectionHeading}><div><h2>{t.clerkData}</h2><p>{t.clerkDataHint}</p></div></div>
                  <div className={styles.accountDataGrid}>
                    <div><span>{t.primaryEmail}</span><strong>{user.primaryEmailAddress?.emailAddress || t.noValue}</strong></div>
                    <div><span>{t.username}</span><strong>{user.username || t.noValue}</strong></div>
                    <div><span>{t.loginOrigin}</span><strong>{connectedProviders.length ? connectedProviders.join(', ') : 'E-Mail / Passwort'}</strong></div>
                    <div><span>{t.lastSignIn}</span><strong>{user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : t.noValue}</strong></div>
                  </div>
                  <div className={styles.clerkAction}>
                    <button type="button" className={styles.outlineBtn} onClick={() => openUserProfile()}>{t.manageAccount}</button>
                  </div>
                </section>

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
                  <div className={styles.sectionHeading}><div><h2>{t.subscriptionTitle}</h2></div></div>
                  <div className={styles.settingsRow}>
                    <div className={styles.settingsText}>
                      {subscriptionActive ? (
                        <strong>
                          {t.subscriptionActiveUntil} {subscription.until ? new Date(subscription.until).toLocaleDateString(lang === 'fa' ? 'fa-IR' : lang === 'en' ? 'en-GB' : 'de-DE') : '—'}
                          {subscription.promo && <span className={styles.badge} style={{ marginInlineStart: 8 }}>{t.subscriptionPromoBadge}</span>}
                        </strong>
                      ) : (
                        <strong>{t.subscriptionInactive}</strong>
                      )}
                      <p>{t.subscriptionManualHint}</p>
                    </div>
                    {!subscriptionActive && (
                      <button type="button" className={styles.outlineBtn} onClick={scrollToSubscriptionContact}>{t.subscriptionActivateCta}</button>
                    )}
                  </div>
                  {!subscriptionActive && (
                    <>
                      <div className={styles.settingsDivider} />
                      <div className={styles.badges}>
                        <span className={styles.badge}>{t.subscriptionPromoBanner}</span>
                      </div>
                    </>
                  )}
                </section>

                <section className={styles.card}>
                  <div className={styles.sectionHeading}><div><h2>{t.appSettings}</h2></div></div>
                  <div className={styles.settingsRow}>
                    <div className={styles.settingsText}><strong>{t.dailyGoal}</strong><p>{t.dailyGoalHint}</p></div>
                    <select
                      className={styles.goalSelect}
                      value={settings.mcqDailyGoal || 10}
                      onChange={event => {
                        const next = { ...settings, mcqDailyGoal: Number(event.target.value) }
                        setSettings(next); saveSettings(next)
                      }}
                    >
                      {[5, 10, 15, 20, 30, 50].map(value => <option key={value} value={value}>{value} MCQs</option>)}
                    </select>
                  </div>
                  <div className={styles.settingsDivider} />
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
                      <select id="problem-type" className={styles.select} required value={contact.type} onChange={event => {
                        const value = event.target.value
                        const isOther = value === t.problemTypes[t.problemTypes.length - 1]
                        setContact(prev => ({ ...prev, type: value, subject: isOther ? prev.subject : '' }))
                      }}>
                        <option value="">{t.select}</option>{t.problemTypes.map(option => <option key={option}>{option}</option>)}
                      </select>
                    </div>
                    {contact.type === t.problemTypes[t.problemTypes.length - 1] && (
                      <div className={styles.fieldGroup}>
                        <label className={styles.label} htmlFor="subject">{t.subject}</label>
                        <input id="subject" className={styles.input} required maxLength={120} placeholder={t.subjectPlaceholder} value={contact.subject} onChange={event => setContact({ ...contact, subject: event.target.value })} />
                      </div>
                    )}
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
