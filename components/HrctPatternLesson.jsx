'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import TopicAssessment from '@/components/lesson-template/TopicAssessment'
import { ATELECTASIS_QUESTIONS } from '@/data/thoraxAtelectasisAssessment'
import styles from '@/app/abdomen/gi/divertikulitis/page.module.css'
import localStyles from './HrctPatternLesson.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { contents: 'Inhalte', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', zoom: 'Bild vergrößern', close: 'Bildansicht schließen', source: 'Radiopaedia öffnen', takehome: 'Take Home Message', cave: 'Cave', provenance: 'Bildquelle und Nachweis', pdf: 'Abgeglichen mit Thorax.pdf, PDF-Seite', printed: 'Druckseite', case: 'Radiopaedia rID', provenanceNote: 'Visueller Abgleich mit dem PDF; Beitragende, Studie und Einzelbild sind nicht separat verifiziert.', answer: 'Antwort auswählen', correct: 'Richtig.', incorrect: 'Noch einmal prüfen.', check: 'Kurz selbst prüfen' },
  en: { contents: 'Contents', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', zoom: 'Enlarge image', close: 'Close image preview', source: 'Open Radiopaedia', takehome: 'Take Home Message', cave: 'Caution', provenance: 'Image source and notes', pdf: 'Matched to Thorax.pdf, PDF page', printed: 'printed page', case: 'Radiopaedia case ID', provenanceNote: 'Visually matched to the PDF; contributor, study and frame have not been independently verified.', answer: 'Select an answer', correct: 'Correct.', incorrect: 'Review this once more.', check: 'Quick self-check' },
  fa: { contents: 'فهرست', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'خوانده شد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', source: 'باز کردن رادیوپدیا', takehome: 'پیام نهایی', cave: 'هشدار', provenance: 'منبع و توضیحات تصویر', pdf: 'تطبیق با Thorax.pdf، صفحه PDF', printed: 'صفحه چاپی', case: 'شناسه Radiopaedia', provenanceNote: 'تطبیق بصری با PDF انجام شده؛ مشارکت‌کننده، مطالعه و فریم جداگانه تأیید نشده‌اند.', answer: 'یک پاسخ را انتخاب کنید', correct: 'درست است.', incorrect: 'یک‌بار دیگر بررسی کنید.', check: 'خودآزمایی کوتاه' },
}

function Section({ id, title, lead, children, open, onToggle }) {
  return <section id={id} className={styles.section}>
    <button type="button" className={styles.sectionHeader} onClick={onToggle} aria-expanded={open} aria-controls={`${id}-body`}>
      <h2>{title}</h2><span>{open ? '−' : '+'}</span>
    </button>
    {open && <div id={`${id}-body`} className={styles.sectionBody}>{lead ? <p className={styles.lead}>{lead}</p> : null}{children}</div>}
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
  const alt = L(image.alt, lang) || caption
  const source = image.pdfSource
  return <figure className={styles.hrctImageCard}>
    <button type="button" onClick={() => setOpen(true)} aria-label={`${copy.zoom}: ${caption}`}>
      <img src={image.src} alt={alt} />
    </button>
    <figcaption>
      <span>{caption}</span>
      {(source || image.radiopaediaUrl) && <details className={localStyles.imageSource}>
        <summary>{copy.provenance}</summary>
        {source && <p>{copy.pdf} {source.page} ({copy.printed} {source.printedPage}); {copy.case} {source.radiopaediaId}. {copy.provenanceNote}</p>}
        {image.radiopaediaUrl && <a href={image.radiopaediaUrl} target="_blank" rel="noopener noreferrer">{copy.source} ↗</a>}
      </details>}
    </figcaption>
    {open && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
      <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
        <button type="button" className={styles.strokeImageModalClose} onClick={() => setOpen(false)} aria-label={copy.close}>×</button>
        <img src={image.src} alt={alt} />
      </div>
    </div>}
  </figure>
}

function ArchitecturalPatternDiagram({ lang }) {
  const labels = {
    de: ['Honeycombing', 'Mosaik', 'Crazy Paving'],
    en: ['Honeycombing', 'Mosaic', 'Crazy paving'],
    fa: ['هانی‌کومبینگ', 'موزائیک', 'کریزی‌پیونگ'],
  }[lang] || ['Honeycombing', 'Mosaic', 'Crazy paving']
  const description = {
    de: 'Drei schematische HRCT-Muster: subpleurale Zysten, mosaikartige Dichte und Milchglas mit Septen.',
    en: 'Three schematic HRCT patterns: subpleural cysts, mosaic attenuation, and ground glass with septa.',
    fa: 'سه الگوی شماتیک HRCT: کیست‌های ساب‌پلورال، دانسیته موزائیک و شیشه‌مات همراه سپتا.',
  }[lang] || 'Three schematic HRCT patterns.'
  return <svg className={localStyles.patternDiagram} viewBox="0 0 520 230" role="img" aria-label={description} xmlns="http://www.w3.org/2000/svg">
    <title>{description}</title>
    <rect x="2" y="2" width="516" height="226" rx="22" fill="#fff" stroke="#cbd5e1" strokeWidth="2" />
    {[16, 188, 360].map((x) => <rect key={x} x={x} y="18" width="144" height="190" rx="14" fill="#f1f5f9" stroke="#cbd5e1" />)}
    <g fill="#020617" stroke="#94a3b8" strokeWidth="4">
      <circle cx="51" cy="69" r="14"/><circle cx="79" cy="69" r="14"/><circle cx="107" cy="69" r="14"/>
      <circle cx="51" cy="97" r="14"/><circle cx="79" cy="97" r="14"/><circle cx="107" cy="97" r="14"/>
    </g>
    <g>
      <path d="M210 55h47v43h-47zM273 55h42v43h-42zM210 108h42v42h-42z" fill="#94a3b8" />
      <path d="M257 108h58v42h-58z" fill="#e2e8f0" />
      <path d="M235 57v90m55-88v90" stroke="#dc2626" strokeWidth="3" />
    </g>
    <g fill="#cbd5e1">
      <path d="M382 44h100v116H382z" />
      <path d="M382 82h100M382 121h100M415 44v116M451 44v116" stroke="#64748b" strokeWidth="6" fill="none" />
    </g>
    <g fill="#0f172a" fontSize="15" fontWeight="700" textAnchor="middle">
      <text x="88" y="187">{labels[0]}</text><text x="260" y="187">{labels[1]}</text><text x="432" y="187">{labels[2]}</text>
    </g>
  </svg>
}

export default function HrctPatternLesson({ lesson }) {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const route = `/thorax/hrct/${lesson.slug}`
  const withLang = href => {
    const [path, hash] = href.split('#')
    const translated = lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
    return hash ? `${translated}#${hash}` : translated
  }
  const { isRead, toggleRead, authError } = useLessonReadStatus(lesson.id)
  const [active, setActive] = useState('')
  const [picked, setPicked] = useState(null)
  const [openSection, setOpenSection] = useState(lesson.sections[0]?.id || null)
  const navigateSection = id => {
    setOpenSection(id)
    setActive(id)
    window.history.pushState(null, '', id ? `#${id}` : `${window.location.pathname}${window.location.search}`)
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
  }
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1)
      const target = lesson.sections.some(section => section.id === id) || id === 'takehome' ? id : lesson.sections[0]?.id || null
      setOpenSection(target)
      setActive(target || '')
    }
    setPicked(null)
    syncHash()
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
    }
  }, [lesson])
  const architectureLesson = lesson.id === 'hrct-architekturmuster'

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
      {architectureLesson ? <div className={localStyles.architectureHero}>
        <LessonHero title={c(lesson.title)} lang={lang} visual={<ArchitecturalPatternDiagram lang={lang} />} visualCaption={L({ de: 'Schematische Bausteine: Zysten, Dichtewechsel und Septen — keine Patientendarstellung.', en: 'Schematic components: cysts, attenuation changes and septa — not patient imaging.', fa: 'اجزای شماتیک: کیست‌ها، تغییر دانسیته و سپتا؛ تصویر بیمار نیست.' }, lang)} />
        <div className={localStyles.architectureActions}>
          <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=thorax&n=12&themen=${lesson.id}&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link>
          <Link className={styles.actionBtn} href={withLang(`/flashcards/${lesson.id}?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link>
        </div>
        <div className={styles.heroStats}>{lesson.heroCards.map(card => <div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div>
      </div> : <div className={styles.hero}>
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
      </div>}
    </header>

    <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sideTitle}>{copy.contents}</div>
        {lesson.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`} onClick={() => navigateSection(section.id)}><span>{section.icon}</span><strong>{c(section.title)}</strong></button>)}
        <button type="button" className={`${styles.sideItem} ${active === 'takehome' ? styles.sideItemActive : ''}`} onClick={() => navigateSection('takehome')} style={{ fontWeight: 950 }}><span>🏁</span><strong>{copy.takehome}</strong></button>
      </aside>
      <div className={styles.main}>
        {lesson.sections.map(section => <Section id={section.id} title={c(section.title)} lead={c(section.lead)} key={section.id} open={openSection === section.id} onToggle={() => navigateSection(openSection === section.id ? null : section.id)}>
          {section.cards?.length > 0 && <div className={styles.cardsGrid}>{section.cards.map(card => <article className={styles.infoCard} key={c(card.title)}><h3>{c(card.title)}</h3><p>{c(card.text)}</p></article>)}</div>}
          {section.images?.length > 0 && <div className={styles.hrctGallery}>{section.images.map(image => <ImageCard key={image.src} image={image} lang={lang} copy={copy} />)}</div>}
          {section.cave && <div className={`${styles.callout} ${styles.cave}`}><strong>⚠️ {copy.cave}</strong><p>{c(section.cave)}</p></div>}
          {lesson.id === 'hrct-dichteanhebung' && section.id === 'atelektase' && <TopicAssessment key={lang} question={ATELECTASIS_QUESTIONS[lang]?.[0] || ATELECTASIS_QUESTIONS.de[0]} topic="atelektase" fach="thorax" lang={lang} returnTo={withLang(`${route}#atelektase`)} />}
        </Section>)}
        {lesson.selfCheck && <section className={localStyles.selfCheck} aria-labelledby="hrct-self-check-title">
          <h2 id="hrct-self-check-title">{copy.check}</h2>
          <p>{c(lesson.selfCheck.question)}</p>
          <fieldset>
            <legend>{copy.answer}</legend>
            {lesson.selfCheck.options.map((option, index) => <label key={index} className={picked === index ? localStyles.selected : ''}>
              <input type="radio" name="hrct-self-check" checked={picked === index} onChange={() => setPicked(index)} />{c(option)}
            </label>)}
          </fieldset>
          {picked !== null && <div className={`${localStyles.feedback} ${picked === lesson.selfCheck.answer ? localStyles.correct : localStyles.incorrect}`} role="status">
            <strong>{picked === lesson.selfCheck.answer ? copy.correct : copy.incorrect}</strong> {c(lesson.selfCheck.explanation)}
          </div>}
        </section>}
        <Section id="takehome" title={copy.takehome} open={openSection === 'takehome'} onToggle={() => navigateSection(openSection === 'takehome' ? null : 'takehome')}>
          <div className={styles.takeHomeGrid}>{lesson.takehome.map((item, index) => <div className={styles.takeHomeItem} key={index}><span>{String(index + 1).padStart(2, '0')}</span><div><p>{c(item)}</p></div></div>)}</div>
        </Section>
        <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
      </div>
    </div>
  </main>
}
