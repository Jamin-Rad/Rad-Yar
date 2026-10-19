'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_PVL_LESSON as lesson } from '@/data/gehirnPvlLesson'
import styles from './page.module.css'

const pick = (item, lang) => item?.[lang] || item?.de || ''
const labels = {
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' },
  progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' },
  completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' },
  complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Als gelesen markiert', en: 'Marked as read', fa: 'خوانده‌شده' },
  open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' },
  close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Kernaussagen', en: 'Key points', fa: 'نکات کلیدی' },
  sources: { de: 'Quellen und Umfang', en: 'Sources and scope', fa: 'منابع و دامنه' },
}
const icons = {
  where: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/></svg>,
  evolution: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17h5l3-10 4 10h6"/><path d="M3 21h18"/></svg>,
  modality: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v14H4zM14 5h6v14h-6z"/><path d="M7 9h1m9 0h1"/></svg>,
  summary: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z"/></svg>,
}

function PvlTimeline({ lang }) {
  const steps = lang === 'fa'
    ? ['سونوگرافی: اکوژنیسیته', 'ممکن است کیست دیده شود', 'کاهش حجم / تغییر شکل بطن']
    : lang === 'en'
      ? ['Ultrasound: echogenicity', 'Cysts may appear', 'Volume loss / ventricular change']
      : ['Sonographie: Echogenität', 'Zysten können auftreten', 'Volumenverlust / Ventrikelumbau']
  const aria = steps.join(' → ')
  return <figure className={styles.timeline}>
    <svg viewBox="0 0 720 160" role="img" aria-label={aria}>
      <path d="M90 49H630" className={styles.track} />
      {steps.map((step, i) => {
        const x = 100 + i * 260
        return <g key={step}>
          <circle cx={x} cy="49" r="22" className={i === 1 ? styles.middleNode : styles.node} />
          <text x={x} y="54" textAnchor="middle" className={styles.number}>{i + 1}</text>
          <foreignObject x={x - 105} y="82" width="210" height="58"><div xmlns="http://www.w3.org/1999/xhtml" className={styles.stepLabel}>{step}</div></foreignObject>
        </g>
      })}
    </svg>
    <figcaption>{lang === 'fa' ? 'توالی شماتیک و غیراختصاصی است؛ همهٔ موارد این مراحل را طی نمی‌کنند.' : lang === 'en' ? 'Conceptual, non-specific sequence; not every case passes through every step.' : 'Schematischer, unspezifischer Verlauf; nicht jeder Fall durchläuft alle Schritte.'}</figcaption>
  </figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.assessment
  const resultLabel = lang === 'fa' ? 'بازخورد' : lang === 'en' ? 'Feedback' : 'Rückmeldung'
  return <div className={styles.check}>
    <p className={styles.lead}>{pick(item.question, lang)}</p>
    <div className={styles.options}>{item.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div>
    {answer !== null && <p role="status" className={styles.feedback}><strong>{resultLabel}:</strong> {pick(answer === item.correctIndex ? item.feedback : item.retry, lang)}</p>}
  </div>
}

function CaseFrames({ lang }) {
  const frames = [
    { src: '/educational/pvl/axial-flair-a.jpg', title: { de: 'Axiale FLAIR-Aufnahme A', en: 'Axial FLAIR image A', fa: 'تصویر FLAIR محوری A' }, alt: { de: 'Axiale FLAIR-Aufnahme aus der Quelle mit periventrikulärem Marklagerverlust', en: 'Axial FLAIR source image showing periventricular white-matter loss', fa: 'تصویر FLAIR محوری منبع با کاهش مادهٔ سفید پیرابطنی' } },
    { src: '/educational/pvl/axial-flair-b.jpg', title: { de: 'Axiale FLAIR-Aufnahme B', en: 'Axial FLAIR image B', fa: 'تصویر FLAIR محوری B' }, alt: { de: 'Zweite axiale FLAIR-Aufnahme aus derselben Quellenmontage', en: 'Second axial FLAIR image from the same source montage', fa: 'دومین تصویر FLAIR محوری از همان مجموعهٔ منبع' } },
    { src: '/educational/pvl/sagittal-t1.jpg', title: { de: 'Sagittale T1-Aufnahme', en: 'Sagittal T1 image', fa: 'تصویر T1 ساژیتال' }, alt: { de: 'Sagittale T1-Aufnahme mit Darstellung der Ventrikelkonfiguration', en: 'Sagittal T1 image showing ventricular configuration', fa: 'تصویر T1 ساژیتال با نمایش آرایش بطن‌ها' } },
  ]
  return <figure className={styles.caseFigure}>
    <div className={styles.frames}>{frames.map(frame => <div key={frame.src} className={styles.frame}><img src={frame.src} alt={pick(frame.alt, lang)} /><strong>{pick(frame.title, lang)}</strong></div>)}</div>
    <figcaption>{lang === 'fa' ? 'منبع: Gehirn.pdf، صفحهٔ PDF ۸۱ (شمارهٔ چاپی ۸۰)، مونتاژ MRI با برچسب rID 89973. تصاویر یافتهٔ انتهایی را نشان می‌دهند و نمونهٔ تصویربرداری نوزاد در فاز حاد نیستند.' : lang === 'en' ? 'Source: Gehirn.pdf, PDF p. 81 (printed p. 80), MRI montage labelled rID 89973. These images show end-stage findings; they are not acute neonatal imaging examples.' : 'Quelle: Gehirn.pdf, PDF S. 81 (Druckseite 80), MRT-Montage mit Kennzeichnung rID 89973. Die Bilder zeigen Endstadien und keine akute neonatale Bildgebung.'}</figcaption>
  </figure>
}

export default function PvlLessonPage() {
  const { lang } = useLanguage()
  const text = (de, en, fa) => pick({ de, en, fa }, lang)
  const path = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const sections = [
    ...lesson.chapters.map((chapter, index) => ({ id: chapter.id, label: pick(chapter.title, lang), icon: ['where', 'evolution', 'modality'][index] })),
    { id: 'take-home', label: pick(labels.takeHome, lang), icon: 'summary', emphasis: true },
  ]
  const sources = lesson.references.filter(item => item.href).map(item => ({ href: item.href, title: item.label, tag: item.href.includes('10.53347') ? 'Radiopaedia case' : text('Fachquelle', 'Clinical reference', 'منبع علمی'), citation: text('Zur Kontextualisierung; fachliche Einordnung der Lektion bleibt unabhängig zu prüfen.', 'For context; the lesson’s clinical interpretation still requires independent review.', 'برای زمینه؛ تفسیر علمی درس هنوز به بازبینی مستقل نیاز دارد.'), scope: '' }))
  const takeaways = lesson.takeaways.map(item => ({ title: pick(item.title, lang), detail: pick(item.detail, lang) }))
  const rubric = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: path('/') }, { label: text('Gehirn', 'Brain', 'مغز'), href: path('/lernen/gehirn') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={rubric} actions={{}} renderIcon={id => icons[id] || icons.where}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/pvl/temporal-course.svg', heroImageOpacity: .92, accent: '#5ca7b7', accentStrong: '#245a69', accentSoft: '#e3f3f5', secondary: '#c88d54', secondaryStrong: '#714621', heroBase: '#142a38' }}
    className={styles.page} heroImageAlt={pick(lesson.diagramAlt, lang)} syncHashNavigation
    sources={<LessonSources title={pick(labels.sources, lang)} items={sources} note={`${pick(lesson.media, lang)} ${pick(lesson.sourceConflict, lang)} ${pick(lesson.reviewStatus, lang)}`} />}>
    <div lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {lesson.chapters.map((chapter, index) => <LessonSection key={chapter.id} id={chapter.id} title={pick(chapter.title, lang)} icon={['where', 'evolution', 'modality'][index]}>
        {index === 0 && <p className={styles.lead}>{pick(lesson.objective, lang)}</p>}
        {pick(chapter.text, lang).split('\n\n').map((paragraph, paragraphIndex) => <p key={paragraphIndex} className={paragraphIndex > 0 && index === 2 ? styles.cave : undefined}>{paragraph}</p>)}
        {index === 1 && <><PvlTimeline lang={lang} /><CaseFrames lang={lang} /></>}
        {index === 2 && <SelfCheck lang={lang} />}
      </LessonSection>)}
      <LessonSection id="take-home" title={pick(labels.takeHome, lang)} icon="summary" emphasis><TakeHomeList items={takeaways} /></LessonSection>
    </div>
  </StandardLessonShell>
}
