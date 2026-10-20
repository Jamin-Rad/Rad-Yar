'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { OSTEOSYNTHESE_POSTOP as lesson } from '@/data/osteosynthesePostop'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? ''
const labels = {
  contents: L('Inhalt', 'Contents', 'فهرست'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'), completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
  diagram: L('Schematischer Überblick über die allgemeine Prüfreihenfolge', 'Schematic overview of the general review sequence', 'نمای شماتیک ترتیب بررسی عمومی'),
  checkTitle: L('Selbstcheck', 'Self-check', 'خودآزمایی'), choose: L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'), correct: L('Richtig. ', 'Correct. ', 'درست است. '), retry: L('Noch einmal prüfen. ', 'Review this once more. ', 'یک‌بار دیگر بررسی کنید.'),
}

function CheckDiagram({ lang }) {
  const steps = [L('Fragmente', 'Fragments', 'قطعات'), L('Achse · Länge', 'Alignment · length', 'محور · طول'), L('Material', 'Fixation material', 'وسیله'), L('Iatrogene Fraktur', 'Iatrogenic fracture', 'شکستگی حین عمل')].map(x => pick(x, lang))
  return <figure className={styles.figure}>
    <svg viewBox="0 0 820 180" role="img" aria-labelledby="postop-check-diagram" className={styles.diagram}>
      <title id="postop-check-diagram">{pick(labels.diagram, lang)}</title>
      <path d="M90 60H730" stroke="#78cbd0" strokeWidth="5"/>
      {steps.map((step, i) => <g key={step} transform={`translate(${90 + i * 213},60)`}>
        <circle r="17" fill={i < 3 ? '#176d78' : '#a65c34'} stroke="white" strokeWidth="3"/>
        <text y="58" textAnchor="middle" className={styles.diagramText}>{step}</text>
      </g>)}
      <path d="m714 47 16 13-16 13" fill="none" stroke="#78cbd0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <figcaption>{pick(L('Die Grafik ordnet nur die vier Punkte der PDF; sie ist kein Röntgenbild und bewertet keine Therapie.', 'The diagram only orders the four checks listed in the PDF; it is not a radiograph and does not assess treatment.', 'این نمودار فقط چهار نکتهٔ PDF را مرتب می‌کند؛ رادیوگرافی نیست و درمان را ارزیابی نمی‌کند.'), lang)}</figcaption>
  </figure>
}

function Rows({ rows, lang }) {
  return <dl className={styles.rows}>{rows.map((row, i) => <div key={i}><dt>{pick(row.label, lang)}</dt><dd>{pick(row.text, lang)}</dd></div>)}</dl>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const check = lesson.sections[2]
  return <div className={styles.check}>
    <h3>{pick(labels.checkTitle, lang)}</h3><p>{pick(check.question, lang)}</p>
    <fieldset><legend>{pick(labels.choose, lang)}</legend>{check.options.map((option, i) => <label key={i}><input type="radio" name="osteosynthesis-review-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}</fieldset>
    {answer !== null ? <p className={styles.feedback} role="status"><strong>{pick(answer === check.answer ? labels.correct : labels.retry, lang)}</strong>{answer === check.answer ? pick(check.feedback, lang) : pick(L('Prüfe zuerst die vier allgemeinen Punkte und trenne sie von der speziellen Schraubenlage am proximalen Femur.', 'Review the four general checks first and keep them separate from the specific proximal-femur screw-position check.', 'ابتدا چهار نکتهٔ عمومی را بررسی کنید و آن‌ها را از بررسی اختصاصی موقعیت پیچ در فمور پروگزیمال جدا نگه دارید.'), lang)}</p> : null}
  </div>
}

export default function OsteosynthesePostopPage() {
  const { lang } = useLanguage()
  const lessonSections = [
    { id: 'checklist', label: pick(lesson.sections[0].title, lang), icon: '✓' },
    { id: 'proximal-femur', label: pick(lesson.sections[1].title, lang), icon: '⌖' },
    { id: 'self-check', label: pick(lesson.sections[2].title, lang), icon: '?' },
    { id: 'take-home', label: pick(labels.takeHome, lang), icon: '✦', emphasis: true },
  ]
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: 'MSK', href: langHref('/lernen/msk') }, { label: pick(L('Postoperative Bildgebung', 'Postoperative imaging', 'تصویربرداری پس از عمل'), lang) }]}
    sections={lessonSections} labels={localizedLabels} renderIcon={name => <span aria-hidden="true">{name}</span>} syncHashNavigation actions={{}}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/osteosynthese-postop/hero.svg', heroImageOpacity: .9, accent: '#79cbd0', accentStrong: '#176d78', accentSoft: '#e2f3f4', secondary: '#efb580', secondaryStrong: '#8c4d2e', heroBase: '#173341' }}
    heroImageAlt={pick(L('Schematische Knochenzeichnung mit Osteosynthesematerial und einer kurzen Prüfreihenfolge; keine diagnostische Röntgenaufnahme.', 'Schematic bone drawing with fixation material and a short review sequence; not a diagnostic radiograph.', 'طرح شماتیک استخوان و وسیلهٔ فیکساسیون همراه با ترتیب کوتاه بررسی؛ رادیوگرافی تشخیصی نیست.'), lang)}
    sources={<LessonSources title={pick(labels.sources, lang)} items={[{ id: 'msk-p10', tag: 'MSK.pdf · S. 10 / printed p. 9', title: 'Post operative Röntgenkontrolle', citation: pick(L('PDF S. 10, gedruckte Seite 9. Die PDF enthält Text, aber keine diagnostische Fallabbildung.', 'PDF p. 10, printed page 9. The PDF contains text but no diagnostic case image.', 'PDF صفحهٔ ۱۰، شمارهٔ چاپی ۹. این صفحه متن دارد اما تصویر تشخیصی کیس ندارد.'), lang), scope: pick(L('Der 5-mm-Wert wurde nicht als allgemeiner Grenzwert übernommen. Operations- und Therapieentscheidungen sind nicht Teil dieser Lektion.', 'The 5 mm value was not adopted as a universal threshold. Surgical and treatment decisions are outside this lesson.', 'عدد ۵ میلی‌متر به‌عنوان آستانهٔ عمومی استفاده نشده است. تصمیم‌های جراحی و درمانی خارج از دامنهٔ این درس‌اند.'), lang) }]} /> }>
    <LessonSection id="checklist" icon="✓" title={pick(lesson.sections[0].title, lang)}>
      <p className={styles.lead}>{pick(lesson.sections[0].lead, lang)}</p><CheckDiagram lang={lang}/><Rows rows={lesson.sections[0].rows} lang={lang}/>
    </LessonSection>
    <LessonSection id="proximal-femur" icon="⌖" title={pick(lesson.sections[1].title, lang)}>
      <p className={styles.lead}>{pick(lesson.sections[1].lead, lang)}</p><Rows rows={lesson.sections[1].rows} lang={lang}/><aside className={styles.cave}><strong>{pick(L('Zahl aus der Quelle', 'Source-specific value', 'عدد ذکرشده در منبع'), lang)}</strong><p>{pick(lesson.sections[1].cave, lang)}</p></aside>
    </LessonSection>
    <LessonSection id="self-check" icon="?" title={pick(lesson.sections[2].title, lang)}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="✦" title={pick(labels.takeHome, lang)}><TakeHomeList items={lesson.takeHome.map((detail, index) => ({ title: pick(L(`Regel ${index + 1}`, `Rule ${index + 1}`, `قاعدهٔ ${index + 1}`), lang), detail: pick(detail, lang) }))}/></LessonSection>
  </StandardLessonShell>
}
