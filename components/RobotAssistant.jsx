'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
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
    lessonRead: 'Gut gemacht! Ich habe deinen Fortschritt gespeichert. Wir greifen dieses Thema später wieder auf, damit es besser im Gedächtnis bleibt.',
    close: 'Schließen',
    toggle: 'Assistent öffnen',
    assistant: 'RadYar Lernassistent',
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
    lessonRead: "Well done! I've saved your progress. We'll revisit this topic later to help it stay in your memory.",
    close: 'Close',
    toggle: 'Open assistant',
    assistant: 'RadYar learning assistant',
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
    lessonRead: 'آفرین! پیشرفتت را ذخیره کردم. بعداً دوباره به این موضوع برمی‌گردیم تا بهتر در ذهنت بماند.',
    close: 'بستن',
    toggle: 'باز کردن دستیار',
    assistant: 'دستیار یادگیری رادیار',
  },
}

function greetingKey() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  return 'evening'
}

const withLang = (href, lang) => (lang === 'de' || !href ? href : `${href}?lang=${lang}`)

function AssistantImage({ className, size }) {
  return <Image className={className} src="/roboter.png" alt="" width={size} height={size} aria-hidden="true" />
}

export default function RobotAssistant() {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const { user, isLoaded, isSignedIn } = useUser()
  const t = T[lang] || T.de
  const isRTL = lang === 'fa'

  if (
    pathname?.startsWith('/admin/budget')
    || pathname?.startsWith('/admin/health')
    || pathname?.startsWith('/andarun')
    || pathname?.startsWith('/mobin')
  ) return null

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState(null)
  const [reaction, setReaction] = useState('')

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return

    setMounted(true)
    setInfo({
      due: getDueFlashcardCount(user.id),
      mcqDone: hasMcqToday(),
      newTopic: getRandomRecentTopic(30),
    })

    const seenKey = `radyar_assistant_seen:${user.id}`
    if (!sessionStorage.getItem(seenKey)) {
      const timer = setTimeout(() => {
        setOpen(true)
        sessionStorage.setItem(seenKey, '1')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, isSignedIn, user?.id])

  useEffect(() => {
    if (!isSignedIn) return

    const showLessonReaction = () => {
      setReaction(t.lessonRead)
      setOpen(true)
    }
    window.addEventListener('radyar:lesson-read', showLessonReaction)
    return () => window.removeEventListener('radyar:lesson-read', showLessonReaction)
  }, [isSignedIn, t.lessonRead])

  if (!mounted || !isLoaded || !isSignedIn) return null

  const greeting = `${t[greetingKey()]}${user?.firstName ? `, ${user.firstName}` : ''}!`
  let recommendation = null
  if (info?.due > 0) {
    recommendation = { icon: '🔁', text: t.due(info.due), href: '/flashcards', cta: t.dueCta }
  } else if (info && !info.mcqDone) {
    recommendation = { icon: '📝', text: t.mcqTodo, href: '/ueben', cta: t.mcqCta }
  } else if (info?.newTopic) {
    recommendation = {
      icon: '✨',
      text: `${t.newTopicLabel}: ${getThemaTitle(info.newTopic.thema, lang)}`,
      href: withLang(info.newTopic.thema.link, lang),
      cta: t.openCta,
    }
  }

  return (
    <div className={styles.wrap} dir={isRTL ? 'rtl' : 'ltr'}>
      {open && (
        <section className={styles.bubble} id="radyar-assistant-message" aria-label={t.assistant}>
          <button className={styles.closeBtn} onClick={() => {
            setOpen(false)
            setReaction('')
          }} aria-label={t.close}>×</button>
          {reaction ? (
            <div className={styles.reaction}>
              <span className={styles.assistantAvatar}><AssistantImage className={styles.avatarImage} size={38} /></span>
              <p>{reaction}</p>
            </div>
          ) : (
            <>
              <div className={styles.bubbleHeader}>
                <span className={styles.assistantAvatar}><AssistantImage className={styles.avatarImage} size={38} /></span>
                <div>
                  <span className={styles.assistantName}>{t.assistant}</span>
                  <p className={styles.greeting}>{greeting}</p>
                </div>
              </div>
              {recommendation ? (
                <div className={styles.recommendation}>
                  <span className={styles.recoIcon}>{recommendation.icon}</span>
                  <p>{recommendation.text}</p>
                  <Link href={recommendation.href} className={styles.recoLink}>{recommendation.cta}</Link>
                </div>
              ) : (
                <p className={styles.allDone}>{t.allDone}</p>
              )}
            </>
          )}
        </section>
      )}
      <button className={styles.fab} onClick={() => {
        if (open) setReaction('')
        setOpen(o => !o)
      }} aria-label={open ? t.close : t.toggle} aria-expanded={open} aria-controls="radyar-assistant-message" title={t.assistant}>
        <AssistantImage className={styles.fabImage} size={52} />
      </button>
    </div>
  )
}
