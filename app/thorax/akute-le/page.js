'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PULMONARY_INFARCT_LESSON as lesson } from '@/data/pulmonaryInfarctLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson contents', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Weiter', 'Continue', 'ادامه'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark the full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson read', 'کل درس خوانده شد'), complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده'), completed: L('Gelesen', 'Read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Abschnitt schließen', 'Close section', 'بستن بخش'), takeHome: L('Vier Regeln merken', 'Four rules to remember', 'چهار نکته برای یادآوری'),
}
const TITLE = L('Thorax', 'Thorax', 'قفسهٔ سینه')
function Icon({ id }) {
  const paths = { start: 'M12 3v18M3 12h18', pattern: 'M4 5h16v14H4zM4 13h6l2-5 3 8 2-3h3', ct: 'M3 5h18v14H3zM7 9h10M7 13h6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.check
  return <div className={styles.check}>
    <h3>{pick(item.title, lang)}</h3><p>{pick(item.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {item.options.map((option, i) => <label key={i}><input type="radio" name="pulmonary-infarct-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null && <div role="status" className={styles.feedback}><strong>{pick(answer === item.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Try again. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === item.answerIndex ? item.correct : item.retry, lang)}{answer !== item.answerIndex && <button type="button" onClick={() => setAnswer(null)}>{pick(L('Erneut versuchen', 'Try again', 'تلاش دوباره'), lang)}</button>}</div>}
  </div>
}
export default function AcutePulmonaryEmbolismPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const labels = Object.fromEntries(Object.keys(LABELS).map(key => [key, t(key)]))
  const path = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const sections = [{ id: 'start', label: pick(L('Infarkt und embolischer Verschluss', 'Infarction and embolic occlusion', 'انفارکت و انسداد آمبولیک'), lang), icon: 'start' }, ...lesson.chapters.map(c => ({ id: c.id, label: pick(c.title, lang), icon: c.icon })), { id: 'case', label: pick(lesson.check.title, lang), icon: 'pattern' }, { id: 'take-home', label: t('takeHome'), icon: 'pattern', emphasis: true }]
  const sources = lesson.references.map((item, i) => ({ tag: pick([L('PIOPED · Primärstudie', 'PIOPED · primary study', 'PIOPED · مطالعهٔ اولیه'), L('AHA/ACC · Leitlinie 2026', 'AHA/ACC · 2026 guideline', 'AHA/ACC · راهنمای ۲۰۲۶'), L('ESC / Fleischner · Konsensus 2025', 'ESC / Fleischner · 2025 consensus', 'ESC / Fleischner · اجماع ۲۰۲۵')][i], lang), title: pick(item.label, lang), href: item.url, citation: pick(L('Primärquelle / aktueller Leitlinien- oder Konsensusrahmen; Geltungsbereich beachten.', 'Primary source / current guideline or consensus framework; check scope.', 'منبع اولیه / چارچوب راهنما یا اجماع فعلی؛ محدودهٔ کاربرد را در نظر بگیرید.'), lang) }))
  sources.push({ id: 'pdf-thorax-p12', tag: pick(L('Kurs-PDF · Bildquelle', 'Course PDF · image source', 'PDF درسی · منبع تصویر'), lang), title: pick(L('Thorax.pdf, PDF S. 12 (Druckseite 11)', 'Thorax.pdf, PDF p. 12 (printed p. 11)', 'Thorax.pdf، صفحهٔ PDF ۱۲ (چاپی ۱۱)'), lang), citation: pick(L('Axiales CT mit Markierungen für Embolus und peripheres Infarktareal; die Folie zeigt den Identifier „rID:27283“. Externe Quelle und Contributor sind nicht unabhängig verifiziert.', 'Axial CT marked for embolus and peripheral infarct; the slide shows the identifier “rID:27283”. The external site and contributor have not been independently verified.', 'CT محوری با نشانه‌گذاری آمبولی و ناحیهٔ انفارکت محیطی؛ اسلاید شناسهٔ «rID:27283» را نشان می‌دهد. وب‌سایت بیرونی و مشارکت‌کننده مستقلاً تأیید نشده‌اند.'), lang) })
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: pick(TITLE, lang), href: path('/lernen/thorax') }]}
    sections={sections} labels={labels} actions={{ mcq: { label: pick(L('MC-Frage üben', 'Practise the MCQ', 'تمرین سؤال چندگزینه‌ای'), lang), href: `/ueben/quiz?fach=thorax&n=1&themen=${lesson.id}&lang=${lang}&from=${encodeURIComponent('/thorax/akute-le?lang=' + lang)}` }, flashcards: { label: pick(L('Flashcard wiederholen', 'Review flashcard', 'مرور فلش‌کارت'), lang), href: `/flashcards/${lesson.id}?lang=${lang}&from=${encodeURIComponent('/thorax/akute-le?lang=' + lang)}` } }} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.heroImage, heroImageOpacity: .74, accent: '#70bdc8', accentStrong: '#216a78', accentSoft: '#e1f3f5', secondary: '#9678c5', secondaryStrong: '#63428e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.alt, lang)} className={styles.page} syncHashNavigation
    sources={<LessonSources title={pick(L('Quellen und Umfang', 'Sources and scope', 'منابع و محدوده'), lang)} items={sources} note={pick(lesson.notice, lang)}/>}
  >
    <LessonSection id="start" icon="start" title={pick(L('Infarkt und embolischer Verschluss', 'Infarction and embolic occlusion', 'انفارکت و انسداد آمبولیک'), lang)}><div className={styles.body}><p>{pick(L('Dieser kurze Abschnitt ergänzt das Curriculum-Thema Akute LE um den Pulmonalinfarkt. Er behandelt das radiologische Muster und seine Grenzen, nicht die vollständige Diagnostik oder Behandlung der Embolie.', 'This focused section adds pulmonary infarction to the Acute PE curriculum topic. It teaches the imaging pattern and its limits, not the complete diagnosis or treatment of PE.', 'این بخش محدود، انفارکت ریه را به موضوع درسی آمبولی حاد اضافه می‌کند. الگوی تصویربرداری و محدودیت‌های آن را آموزش می‌دهد، نه تشخیص یا درمان کامل آمبولی را.'), lang)}<img className={styles.diagram} src={lesson.heroImage} alt={pick(lesson.alt, lang)}/></p></div></LessonSection>
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)}><div className={styles.body}><p>{pick(chapter.text, lang)}</p>{chapter.id === 'hampton' && <figure className={styles.caseFigure}><img src="/educational/pulmonary-infarct-pdf-case.png" alt={pick(L('Axiales kontrastverstärktes CT mit roten Markierungen: ein zentraler Pfeil kennzeichnet einen Embolus, ein Dreieck die periphere pleuranahe Verdichtung.', 'Axial contrast-enhanced CT with red annotations: a central arrow marks an embolus and a triangle marks the peripheral pleural-based opacity.', 'CT محوری کنتراست‌دار با نشانه‌گذاری قرمز: پیکان مرکزی آمبولی و مثلث کدورت محیطیِ مجاور پلور را نشان می‌دهد.'), lang)}/><figcaption>{pick(L('Thorax.pdf, PDF S. 12 / Druckseite 11, mit sichtbarem Identifier „rID:27283“. Externe Quelle/Contributor nicht unabhängig verifiziert. Dies ist ein CT-Beispiel, kein Hampton-hump-Röntgenbild.', 'Thorax.pdf, PDF p. 12 / printed p. 11, with visible identifier “rID:27283”. External site/contributor not independently verified. This is a CT example, not a Hampton-hump radiograph.', 'Thorax.pdf، صفحهٔ PDF ۱۲ / چاپی ۱۱ با شناسهٔ قابل مشاهدهٔ «rID:27283». وب‌سایت بیرونی/مشارکت‌کننده مستقلاً تأیید نشده‌اند. این نمونه CT است، نه رادیوگرافی Hampton hump.'), lang)}</figcaption></figure>}<p className={styles.scope}>{pick(chapter.note, lang)}</p></div></LessonSection>)}
    <LessonSection id="case" icon="pattern" title={pick(lesson.check.title, lang)}><Check key={lang} lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="pattern" title={t('takeHome')}><ol className={styles.rules}>{lesson.takeHome.map((item, i) => <li key={i}>{pick(item, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
