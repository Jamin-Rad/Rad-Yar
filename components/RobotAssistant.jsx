'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth, useUser } from '@clerk/nextjs'
import { useLanguage } from '@/providers/LanguageProvider'
import { getThemaTitle } from '@/data/curriculum'
import { getDueFlashcardCount, hasMcqToday, getRandomRecentTopic } from '@/utils/recommendations'
import styles from './RobotAssistant.module.css'

const T = {
  de: {
    morning: 'Guten Morgen', afternoon: 'Guten Tag', evening: 'Guten Abend',
    due: n => `${n} Karteikarte${n === 1 ? '' : 'n'} heute fällig`,
    dueCta: 'Wiederholen →',
    mcqTodo: 'Heute noch keine MCQs geübt',
    mcqCta: 'Quiz starten →',
    newTopicLabel: 'Neu für dich',
    openCta: 'Ansehen →',
    allDone: 'Alles erledigt für heute – weiter so! 🎉',
    close: 'Schließen',
    toggle: 'Assistent öffnen',
  },
  en: {
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
    due: n => `${n} flashcard${n === 1 ? '' : 's'} due today`,
    dueCta: 'Review →',
    mcqTodo: 'No MCQs done today yet',
    mcqCta: 'Start quiz →',
    newTopicLabel: 'New for you',
    openCta: 'Open →',
    allDone: "You're all caught up for today! 🎉",
    close: 'Close',
    toggle: 'Open assistant',
  },
  fa: {
    morning: 'صبح بخیر', afternoon: 'ظهر بخیر', evening: 'عصر بخیر',
    due: n => `${n} فلش‌کارت امروز سررسید دارد`,
    dueCta: '← مرور',
    mcqTodo: 'امروز هنوز MCQ نزده‌ای',
    mcqCta: '← شروع کوئیز',
    newTopicLabel: 'جدید برای تو',
    openCta: '← مشاهده',
    allDone: 'برای امروز همه‌چیز انجام شده! 🎉',
    close: 'بستن',
    toggle: 'باز کردن دستیار',
  },
}

function greetingKey() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}

const withLang = (href, lang) => (lang === 'de' || !href ? href : `${href}?lang=${lang}`)

export default function RobotAssistant() {
  const { lang } = useLanguage()
  const { userId } = useAuth()
  const { user } = useUser()
  const t = T[lang] || T.de
  const isRTL = lang === 'fa'

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    setMounted(true)
    setInfo({
      due: getDueFlashcardCount(userId),
      mcqDone: hasMcqToday(),
      newTopic: getRandomRecentTopic(30),
    })

    if (!sessionStorage.getItem('radyar_assistant_seen')) {
      const timer = setTimeout(() => {
        setOpen(true)
        sessionStorage.setItem('radyar_assistant_seen', '1')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [userId])

  if (!mounted) return null

  const greeting = `${t[greetingKey()]}${user?.firstName ? `, ${user.firstName}` : ''}!`
  const hasReco = info && (info.due > 0 || !info.mcqDone || info.newTopic)

  return (
    <div className={styles.wrap} dir={isRTL ? 'rtl' : 'ltr'}>
      {open && (
        <div className={styles.bubble}>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label={t.close}>×</button>
          <p className={styles.greeting}>{greeting}</p>
          {hasReco ? (
            <ul className={styles.recoList}>
              {info.due > 0 && (
                <li>
                  <span className={styles.recoIcon}>🔁</span>
                  <span className={styles.recoText}>
                    {t.due(info.due)}
                    <Link href="/flashcards" className={styles.recoLink}>{t.dueCta}</Link>
                  </span>
                </li>
              )}
              {!info.mcqDone && (
                <li>
                  <span className={styles.recoIcon}>📝</span>
                  <span className={styles.recoText}>
                    {t.mcqTodo}
                    <Link href="/ueben" className={styles.recoLink}>{t.mcqCta}</Link>
                  </span>
                </li>
              )}
              {info.newTopic && (
                <li>
                  <span className={styles.recoIcon}>✨</span>
                  <span className={styles.recoText}>
                    {t.newTopicLabel}: {getThemaTitle(info.newTopic.thema, lang)}
                    <Link href={withLang(info.newTopic.thema.link, lang)} className={styles.recoLink}>{t.openCta}</Link>
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <p className={styles.allDone}>{t.allDone}</p>
          )}
        </div>
      )}
      <button className={styles.fab} onClick={() => setOpen(o => !o)} aria-label={t.toggle}>
        🤖
      </button>
    </div>
  )
}
