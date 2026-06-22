'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from '@/app/abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { contents: 'Inhalte', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', zoom: 'Bild vergrößern', close: 'Bildansicht schließen', source: 'Radiopaedia öffnen', takehome: 'Take Home Message', cave: 'Cave' },
  en: { contents: 'Contents', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', zoom: 'Enlarge image', close: 'Close image preview', source: 'Open Radiopaedia', takehome: 'Take Home Message', cave: 'Caution' },
  fa: { contents: 'فهرست', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'خوانده شد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', source: 'باز کردن رادیوپدیا', takehome: 'پیام نهایی', cave: 'هشدار' },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return <section id={id} className={styles.section}>
    <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}>
      <h2>{title}</h2><span>{open ? '−' : '+'}</span>
    </button>
    {open && <div className={styles.sectionBody}><p className={styles.lead}>{lead}</p>{children}</div>}
  </section>
}

function ReadButton({ isRead, toggleRead, authError, copy }) {
  return <div className={styles.readControl}>
    <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}>
      <span className={styles.readCheck}>{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span>
    </button>
    {authError && <div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
  </div>
}

function ImageCard({ image, lang, copy }) {
  const [open, setOpen] = useState(false)
  const caption = L(image.caption, lang)
  return <figure className={styles.hrctImageCard}>
    <button type="button" onClick={() => setOpen(true)} aria-label={`${copy.zoom}: ${caption}`}>
      <img src={image.src} alt={caption} />
    </button>
    <figcaption>
      <span>{caption}</span>
      {image.radiopaediaUrl && <a href={image.radiopaediaUrl} target="_blank" rel="noopener noreferrer">{copy.source} ↗</a>}
    </figcaption>
    {open && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
      <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
        <button type="button" className={styles.strokeImageModalClose} onClick={() => setOpen(false)} aria-label={copy.close}>×</button>
        <img src={image.src} alt={caption} />
      </div>
    </div>}
  </figure>
}

export default function HrctPatternLesson({ lesson }) {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const route = `/thorax/hrct/${lesson.slug}`
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const { isRead, toggleRead, authError } = useLessonReadStatus(lesson.id)
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = [...lesson.sections.map(section => section.id), 'takehome']
    const observers = ids.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setActive(id) }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [lesson])

  return <main className={`${styles.page} ${styles.hrctPage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <InProgressBanner lang={lang} />
    <header className={styles.header}>
      <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/thorax')}>Thorax</Link><span>›</span><span>HRCT</span></div>
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.sourceBadge}>Dr. Zia</span>
          <h1>{c(lesson.title)}</h1>
          <p>{c(lesson.definition)}</p>
          <div className={styles.actions}>
            <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=thorax&n=12&themen=${lesson.id}&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link>
            <Link className={styles.actionBtn} href={withLang(`/flashcards/${lesson.id}?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link>
          </div>
        </div>
        <div className={styles.heroStats}>{lesson.heroCards.map(card => <div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div>
      </div>
    </header>

    <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sideTitle}>{copy.contents}</div>
        {lesson.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}><span>{section.icon}</span><strong>{c(section.title)}</strong></button>)}
        <button type="button" className={`${styles.sideItem} ${active === 'takehome' ? styles.sideItemActive : ''}`} onClick={() => document.getElementById('takehome')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontWeight: 950 }}><span>🏁</span><strong>{copy.takehome}</strong></button>
      </aside>
      <div className={styles.main}>
        {lesson.sections.map(section => <Section id={section.id} title={c(section.title)} lead={c(section.lead)} key={section.id}>
          {section.cards?.length > 0 && <div className={styles.cardsGrid}>{section.cards.map(card => <article className={styles.infoCard} key={c(card.title)}><h3>{c(card.title)}</h3><p>{c(card.text)}</p></article>)}</div>}
          {section.images?.length > 0 && <div className={styles.hrctGallery}>{section.images.map(image => <ImageCard key={image.src} image={image} lang={lang} copy={copy} />)}</div>}
          {section.cave && <div className={`${styles.callout} ${styles.cave}`}><strong>⚠️ {copy.cave}</strong><p>{c(section.cave)}</p></div>}
        </Section>)}
        <Section id="takehome" title={copy.takehome} lead={c(lesson.definition)}>
          <div className={styles.takeHomeGrid}>{lesson.takehome.map((item, index) => <div className={styles.takeHomeItem} key={index}><span>{String(index + 1).padStart(2, '0')}</span><div><p>{c(item)}</p></div></div>)}</div>
        </Section>
        <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
      </div>
    </div>
  </main>
}
