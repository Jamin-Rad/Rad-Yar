'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { FIRST_RIB_LESSON as lesson, L } from '@/data/firstRibPseudoarticulation'
import styles from './page.module.css'

const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
function Icon({ id }) {
  const paths = { pattern: 'M3 18 9 8l4 6 3-4 5 8M4 4h16', check: 'M5 12h14M12 5v14', summary: 'M5 5h14M5 12h14M5 19h14' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.check}>
    <h3>{pick(lesson.check.title, lang)}</h3><p>{pick(lesson.check.prompt, lang)}</p>
    <fieldset><legend>{pick(L('Eine Antwort wählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>
      {lesson.check.options.map((option, i) => <label key={i}><input type="radio" name="first-rib-check" checked={answer === i} onChange={() => setAnswer(i)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null && <div role="status" className={styles.feedback}><strong>{pick(answer === lesson.check.answerIndex ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Try again. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(answer === lesson.check.answerIndex ? lesson.check.correct : lesson.check.retry, lang)}{answer !== lesson.check.answerIndex && <button type="button" onClick={() => setAnswer(null)}>{pick(L('Erneut versuchen', 'Try again', 'تلاش دوباره'), lang)}</button>}</div>}
  </div>
}
export default function FirstRibPseudoarticulationPage() {
  const { lang } = useLanguage()
  const labels = Object.fromEntries(Object.entries(lesson.labels).map(([key, value]) => [key, pick(value, lang)]))
  const local = href => lang === 'de' ? href : `${href}?lang=${lang}`
  const sections = lesson.chapters.map(item => ({ ...item, label: pick(item.title, lang) }))
  const sources = [
    { tag: pick(L('Quelle · Thorax-PDF', 'Source · Thorax PDF', 'منبع · PDF قفسهٔ سینه'), lang), title: pick(L('Thorax.pdf. PDF-Seite 10 (Druckseite 9): „Akzessorische Artikulation der 1. Rippe“.', 'Thorax.pdf. PDF page 10 (printed page 9): “Accessory articulation of the first rib.”', 'Thorax.pdf. صفحهٔ PDF شمارهٔ ۱۰ (صفحهٔ چاپی ۹): «اتصال مفصلی اضافی دندهٔ اول».'), lang), citation: pick(lesson.imageCaption, lang) },
    { tag: pick(L('Fallbericht · CT', 'Case report · CT', 'گزارش مورد · CT'), lang), title: 'Paling MR, Dwyer AD. The first rib as the cause of a “pulmonary nodule” on chest computed tomography. J Comput Assist Tomogr. 1980;4(6):847–848. doi:10.1097/00004728-198012000-00019.', href: 'https://pubmed.ncbi.nlm.nih.gov/7217428/', citation: pick(L('Fallbericht: ein Vorsprung der 1. Rippe kann im CT einen Lungenrundherd vortäuschen. Er belegt nicht die Häufigkeit oder jede radiographische Erscheinungsform der hier gezeigten Pseudoartikulation.', 'Case report: a first-rib protuberance can simulate a pulmonary nodule on CT. It does not establish prevalence or every radiographic appearance of the pseudoarticulation shown here.', 'گزارش مورد: برجستگی دندهٔ اول می‌تواند در CT نمای ندول ریه ایجاد کند. این گزارش فراوانی یا همهٔ شکل‌های رادیوگرافیک شبه‌مفصل نشان‌داده‌شده را ثابت نمی‌کند.'), lang) },
  ]
  const langTitle = pick(lesson.title, lang)
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={langTitle} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: pick(L('Thorax', 'Thorax', 'قفسهٔ سینه'), lang), href: local('/lernen/thorax') }, { label: langTitle }]}
    sections={sections} labels={labels} actions={{}} renderIcon={id => <Icon id={id}/>} syncHashNavigation
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/first-rib-pseudoarticulation-p10.png', heroImageOpacity: .72, accent: '#70bdc8', accentStrong: '#216a78', accentSoft: '#e1f3f5', secondary: '#9678c5', secondaryStrong: '#63428e', heroBase: '#172c3b' }}
    heroImageAlt={pick(lesson.imageAlt, lang)} className={styles.page}
    sources={<LessonSources title={pick(L('Quellen und Geltungsbereich', 'Sources and scope', 'منابع و محدوده'), lang)} items={sources} note={pick(L('Eng begrenzte Lektion zum einzelnen Lehrbeispiel auf Thorax.pdf S. 10. Bildausschnitt aus dem vom Nutzer bereitgestellten PDF; für die Verwendung freigegeben. Kein vollständiger Überblick über Rippenvarianten, Frakturen oder Lungennodulmanagement.', 'A narrowly scoped lesson on the teaching example on Thorax.pdf p. 10. Image crop from the user-supplied PDF, authorised for use. This is not a comprehensive review of rib variants, fractures or pulmonary nodule management.', 'درس محدود به نمونهٔ آموزشی Thorax.pdf صفحهٔ ۱۰ است. برش تصویر از PDF ارائه‌شده توسط کاربر و مجاز برای استفاده است. این درس مرور جامع واریانت‌های دنده، شکستگی یا مدیریت ندول ریه نیست.'), lang)}/>}
  >
    <LessonSection id="pattern" icon="pattern" title={pick(lesson.chapters[0].title, lang)}><div className={styles.body}>
      <p className={styles.lead}>{pick(lesson.lead, lang)}</p>
      <figure className={styles.figure}><img src="/educational/first-rib-pseudoarticulation-p10.png" alt={pick(lesson.imageAlt, lang)}/><figcaption>{pick(lesson.imageCaption, lang)}</figcaption></figure>
      <h3>{pick(lesson.mechanismHeading, lang)}</h3><p>{pick(lesson.mechanism, lang)}</p>
    </div></LessonSection>
    <LessonSection id="check" icon="check" title={pick(lesson.chapters[1].title, lang)}><div className={styles.body}>
      <h3>{pick(lesson.nextHeading, lang)}</h3><ol>{lesson.nextSteps.map((step, i) => <li key={i}>{pick(step, lang)}</li>)}</ol>
      <aside className={styles.cave}>{pick(L('Wichtige Grenze: Eine plausible knöcherne Überlagerung ist keine Ausschlussdiagnose für einen Lungenherd.', 'Important limit: a plausible bony overlap does not rule out a pulmonary lesion.', 'محدودیت مهم: هم‌پوشانی استخوانی محتمل، تشخیصِ ردکنندهٔ ضایعهٔ ریوی نیست.'), lang)}</aside>
      <Check lang={lang}/>
    </div></LessonSection>
    <LessonSection id="summary" icon="summary" title={pick(lesson.chapters[2].title, lang)}><ol className={styles.rules}>{lesson.summary.map((item, i) => <li key={i}>{pick(item, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
