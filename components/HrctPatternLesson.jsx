'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import StandardLessonShell, { LessonSection, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import TopicAssessment from '@/components/lesson-template/TopicAssessment'
import { ATELECTASIS_QUESTIONS } from '@/data/thoraxAtelectasisAssessment'
import { lessonCheckFeedback } from '@/lib/lessonCheckFeedback'
import styles from '@/app/abdomen/gi/divertikulitis/page.module.css'
import localStyles from './HrctPatternLesson.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { contents: 'Inhalte', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', zoom: 'Bild vergrößern', close: 'Bildansicht schließen', source: 'Radiopaedia öffnen', takehome: 'Take Home Message', cave: 'Cave', provenance: 'Bildquelle und Nachweis', pdf: 'Abgeglichen mit Thorax.pdf, PDF-Seite', printed: 'Druckseite', case: 'Radiopaedia rID', provenanceNote: 'Visueller Abgleich mit dem PDF; Beitragende, Studie und Einzelbild sind nicht separat verifiziert.', answer: 'Antwort auswählen', correct: 'Richtig.', incorrect: 'Noch einmal prüfen.', check: 'Kurz selbst prüfen' },
  en: { contents: 'Contents', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', zoom: 'Enlarge image', close: 'Close image preview', source: 'Open Radiopaedia', takehome: 'Take Home Message', cave: 'Caution', provenance: 'Image source and notes', pdf: 'Matched to Thorax.pdf, PDF page', printed: 'printed page', case: 'Radiopaedia case ID', provenanceNote: 'Visually matched to the PDF; contributor, study and frame have not been independently verified.', answer: 'Select an answer', correct: 'Correct.', incorrect: 'Review this once more.', check: 'Quick self-check' },
  fa: { contents: 'فهرست', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'خوانده شد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', source: 'باز کردن رادیوپدیا', takehome: 'پیام نهایی', cave: 'هشدار', provenance: 'منبع و توضیحات تصویر', pdf: 'تطبیق با Thorax.pdf، صفحه PDF', printed: 'صفحه چاپی', case: 'شناسه Radiopaedia', provenanceNote: 'تطبیق بصری با PDF انجام شده؛ مشارکت‌کننده، مطالعه و فریم جداگانه تأیید نشده‌اند.', answer: 'یک پاسخ را انتخاب کنید', correct: 'درست است.', incorrect: 'یک‌بار دیگر بررسی کنید.', check: 'خودآزمایی کوتاه' },
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

const SHELL_UI = {
  de: { contents: 'Seitenpfad', path: 'Lernpfad', progress: 'gelesen', complete: 'Abschnitt als gelesen markieren', completed: 'Als gelesen markiert', continue: 'Weiterlernen', completeLesson: 'Gesamte Lektion als gelesen markieren', lessonCompleted: 'Alle Kapitel gelesen', open: 'Öffnen', close: 'Schließen', takeHome: 'Take Home Message' },
  en: { contents: 'Breadcrumb', path: 'Learning path', progress: 'read', complete: 'Mark section as read', completed: 'Marked as read', continue: 'Continue', completeLesson: 'Mark the entire lesson as read', lessonCompleted: 'All chapters read', open: 'Open', close: 'Close', takeHome: 'Take Home Message' },
  fa: { contents: 'مسیر صفحه', path: 'مسیر یادگیری', progress: 'خوانده‌شده', complete: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده', completed: 'خوانده شد', continue: 'ادامهٔ درس', completeLesson: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده', lessonCompleted: 'همهٔ فصل‌ها خوانده شده‌اند', open: 'باز کردن', close: 'بستن', takeHome: 'پیام نهایی' },
}
function ChapterIcon({ name }) {
  const paths = {
    pattern: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
    check: 'M9 4H5v17h14V4h-4M9 3h6v4H9zM8 13l2 2 5-5',
    summary: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.pattern} /></svg>
}

export default function HrctPatternLesson({ lesson }) {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const labels = SHELL_UI[lang] || SHELL_UI.de
  const c = value => L(value, lang)
  const route = `/thorax/hrct/${lesson.slug}`
  const withLang = href => {
    const [path, hash] = href.split('#')
    const translated = lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
    return hash ? `${translated}#${hash}` : translated
  }
  const { isRead, toggleRead, authError } = useLessonReadStatus(lesson.id)
  const [picked, setPicked] = useState(null)
  useEffect(() => setPicked(null), [lang, lesson.id])
  const sections = [
    ...lesson.sections.map(section => ({ id: section.id, label: c(section.title), icon: 'pattern' })),
    ...(lesson.selfCheck ? [{ id: 'self-check', label: copy.check, icon: 'check' }] : []),
    { id: 'takehome', label: labels.takeHome, icon: 'summary', emphasis: true },
  ]

  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={c(lesson.title)} author="Dr. Zia" sections={sections} labels={labels} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: withLang('/') }, { label: 'Thorax', href: withLang('/lernen/thorax') }, { label: 'HRCT' }]}
    actions={{ mcq: { label: copy.mcq, href: withLang(`/ueben/quiz?fach=thorax&n=12&themen=${lesson.id}&from=${encodeURIComponent(withLang(route))}`) }, flashcards: { label: copy.flash, href: withLang(`/flashcards/${lesson.id}?from=${encodeURIComponent(withLang(route))}`) } }}
    renderIcon={name => <ChapterIcon name={name} />} heroImageAlt={c(lesson.title)}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', accent: '#4b8d9c', accentStrong: '#285a69', accentSoft: '#e4f1f4', secondary: '#b58d9b', secondaryStrong: '#725367', heroBase: '#102633' }}
    sources={<div>
      {lesson.clinicalReferences?.length > 0 && <ul>{lesson.clinicalReferences.map(reference => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer">{c(reference.title)}</a></li>)}</ul>}
      <div className={localStyles.readStatus}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
    </div>}>
    {lesson.sections.map((section, index) => <LessonSection id={section.id} key={section.id} bodyClassName={localStyles.content}>
      {index === 0 ? <><p className={localStyles.lead}>{c(lesson.definition)}</p>{lesson.heroCards?.length ? <dl className={localStyles.orientation}>{lesson.heroCards.map(card => <div key={c(card.value)}><dt>{c(card.value)} · {c(card.label)}</dt><dd>{c(card.text)}</dd></div>)}</dl> : null}</> : null}
      {section.lead ? <p className={localStyles.lead}>{c(section.lead)}</p> : null}
      {section.cards?.length > 0 && <div className={localStyles.cards}>{section.cards.map(card => <article key={c(card.title)}><h3>{c(card.title)}</h3><p>{c(card.text)}</p></article>)}</div>}
      {section.images?.length > 0 && <div className={styles.hrctGallery}>{section.images.map(image => <ImageCard key={image.src} image={image} lang={lang} copy={copy} />)}</div>}
      {section.cave && <aside className={localStyles.cave}><strong>{copy.cave}</strong><p>{c(section.cave)}</p></aside>}
      {lesson.id === 'hrct-dichteanhebung' && section.id === 'atelektase' && <TopicAssessment key={lang} question={ATELECTASIS_QUESTIONS[lang]?.[0] || ATELECTASIS_QUESTIONS.de[0]} topic="atelektase" fach="thorax" lang={lang} returnTo={withLang(`${route}#atelektase`)} />}
    </LessonSection>)}
    {lesson.selfCheck ? <LessonSection id="self-check"><div className={localStyles.selfCheck}>
      <p>{c(lesson.selfCheck.question)}</p><fieldset><legend>{copy.answer}</legend>{lesson.selfCheck.options.map((option, index) => <label key={index} className={picked === index ? localStyles.selected : ''}><input type="radio" name="hrct-self-check" checked={picked === index} onChange={() => setPicked(index)} />{c(option)}</label>)}</fieldset>
      {picked !== null && <div className={`${localStyles.feedback} ${picked === lesson.selfCheck.answer ? localStyles.correct : localStyles.incorrect}`} role="status"><strong>{picked === lesson.selfCheck.answer ? copy.correct : copy.incorrect}</strong> {c(lessonCheckFeedback(lesson.selfCheck, picked))}</div>}
    </div></LessonSection> : null}
    <LessonSection id="takehome"><TakeHomeList items={lesson.takehome.map(item => ({ title: c(item), detail: '' }))} /></LessonSection>
  </StandardLessonShell>
}
