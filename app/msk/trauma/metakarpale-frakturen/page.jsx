'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { METAKARPALE_FRAKTUREN_LESSON as lesson } from '@/data/metakarpale-frakturen'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || value
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Vier Muster merken', 'Remember four patterns', 'چهار الگو را به خاطر بسپارید'),
}
function Icon({ id }) {
  const d = { pattern: 'M5 18 12 5l7 13M8 13h8', compare: 'M4 5h16M4 12h16M4 19h16', decision: 'M4 12h16m-7-7 7 7-7 7', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function Decision({ lang, section }) {
  const [answer, setAnswer] = useState(null)
  const c = (de, en, fa) => pick(L(de, en, fa), lang)
  return <div className={styles.decision}>
    <h3>{c('Selbstprüfung', 'Self-check', 'خودآزمایی')}</h3>
    <p>{pick(section.task, lang)}</p>
    <fieldset><legend>{c('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید')}</legend>
      {section.options.map((option, index) => <label key={index}><input type="radio" name={`metacarpal-${section.id}`} checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}
    </fieldset>
    {answer !== null ? <p className={`${styles.feedback} ${answer === section.answer ? styles.correct : ''}`} role="status"><strong>{answer === section.answer ? c('Richtig. ', 'Correct. ', 'درست است. ') : c('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. ')}</strong>{pick(section.feedback[answer], lang)}</p> : null}
  </div>
}
export default function MetakarpaleFrakturenPage() {
  const { lang } = useLanguage()
  const t = key => pick(LABELS[key], lang)
  const sections = [...lesson.sections.map(section => ({ id: section.id, label: pick(section.title, lang), icon: section.id })), { id: 'take-home', label: t('takeHome'), icon: 'summary', emphasis: true }]
  const langHref = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = [
    { tag: 'MSK.pdf · PDF S.21', title: L('MSK.pdf · Basisfrakturen Os metacarpale I', 'MSK.pdf · First metacarpal base fractures', 'MSK.pdf · شکستگی‌های قاعدهٔ متاکارپ اول'), citation: L('PDF S.21 (gedruckte S.20), Abschnitt „OS Metakarpale I – Basisfrakturen“; Text und vergleichende Illustration geprüft.', 'PDF p.21 (printed p.20), “First metacarpal base fractures”; text and comparative illustration inspected.', 'صفحهٔ PDF ۲۱ (چاپی ۲۰)، بخش «شکستگی‌های قاعدهٔ متاکارپ اول»؛ متن و تصویر مقایسه‌ای بررسی شد.') },
    { tag: 'MSK.pdf · PDF S.24', title: L('MSK.pdf · Subkapitale Fraktur Metakarpale V', 'MSK.pdf · Subcapital fifth metacarpal fracture', 'MSK.pdf · شکستگی ساب‌کاپیتال متاکارپ پنجم'), citation: L('PDF S.24 (gedruckte S.23), Abschnitt „OS metacarpale V, subkapital – Boxer-Fraktur“; Text und beide Röntgenansichten geprüft. Die Seite nennt keine individuelle Fall- oder Urheberangabe.', 'PDF p.24 (printed p.23), “Fifth metacarpal, subcapital – boxer fracture”; text and both radiographic views inspected. The page gives no individual case or contributor attribution.', 'صفحهٔ PDF ۲۴ (چاپی ۲۳)، بخش «متاکارپ پنجم، ساب‌کاپیتال ـ شکستگی بوکسور»؛ متن و هر دو نمای رادیوگرافی بررسی شد. صفحه نام کیس یا مشارکت‌کننده را ذکر نمی‌کند.') },
    { tag: 'Peer-reviewed review · 2016', title: L('Bildgebung und Frakturmorphologie', 'Imaging and fracture morphology', 'تصویربرداری و مورفولوژی شکستگی'), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5078834/', citation: L('Carter et al., „Metacarpal Neck Fractures: A Review of Surgical Indications and Techniques“, Hand (N Y), 2016: Mechanismus, Halslokalisation, dorsaler Scheitelwinkel und PA-/laterale/schräge Projektionen.', 'Carter et al., “Metacarpal Neck Fractures: A Review of Surgical Indications and Techniques,” Hand (N Y), 2016: mechanism, neck location, dorsal-apex angulation, and PA/lateral/oblique views.', 'Carter و همکاران، «مروری بر شکستگی‌های گردن متاکارپ»، Hand (N Y)، ۲۰۱۶: سازوکار، محل گردن، زاویهٔ قله‌دورسال و نماهای PA، لترال و مایل.') },
    { tag: 'Guideline · ACR', title: L('Akutes Handtrauma: geeignete Erstbildgebung', 'Acute hand trauma: appropriate initial imaging', 'ترومای حاد دست: تصویربرداری اولیهٔ مناسب'), href: 'https://acsearch.acr.org/docs/69418/Narrative/', citation: L('American College of Radiology, Acute Hand and Wrist Trauma: Röntgen ist die initiale Bildgebung bei vermutetem Handtrauma; eine Standard-Handserie umfasst drei Projektionen.', 'American College of Radiology, Acute Hand and Wrist Trauma: radiography is the initial imaging for suspected hand trauma; a standard hand series uses three projections.', 'انجمن رادیولوژی آمریکا، ترومای حاد دست و مچ: در شک به ترومای دست، رادیوگرافی تصویربرداری اولیه است و سری استاندارد دست سه نما دارد.') },
    { tag: 'Peer-reviewed study · 2026', title: L('Projektionsabhängige Winkelbeurteilung', 'Projection-dependent angle assessment', 'ارزیابی زاویه وابسته به نما'), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13571598/', citation: L('Qiu et al., 2026, Hand: radiografische Winkelmessung hängt von Projektion und Positionierung ab; die Studie untersucht die schräge Projektion in einer ausgewählten Kohorte. Daher keine Winkelgrenze aus einer Einzelaufnahme abgeleitet.', 'Qiu et al., 2026, Hand: radiographic angulation measurement depends on projection and positioning; the study evaluates an oblique projection in a selected cohort. No angle threshold is inferred from a single view.', 'Qiu و همکاران، ۲۰۲۶، Hand: اندازه‌گیری زاویه به نما و وضعیت‌دهی وابسته است؛ مطالعه نمای مایل را در گروهی انتخاب‌شده بررسی می‌کند. بنابراین از یک نمای منفرد آستانهٔ زاویه‌ای استنباط نمی‌شود.') },
  ].map(source => ({ ...source, title: pick(source.title, lang), citation: pick(source.citation, lang) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('MSK', 'MSK', 'عضلانی‌اسکلتی'), lang), href: langHref('/lernen/msk') }, { label: pick(lesson.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))} renderIcon={id => <Icon id={id}/>}
    actions={{ mcq: { label: pick(L('Quiz zu Basisfrakturen', 'Base-fracture quiz', 'آزمون شکستگی قاعده'), lang), href: langHref('/ueben/quiz?fach=msk&n=1&themen=metakarpale-frakturen') } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .72, accent: '#65c9be', accentStrong: '#176c68', accentSoft: '#d8f2ed', secondary: '#9fb4c0', secondaryStrong: '#476273', heroBase: '#172d3a' }}
    heroImageAlt={pick(lesson.heroAlt, lang)} className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sources} note={pick(lesson.scope, lang)}/>}
  >
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.id} title={pick(section.title, lang)} bodyClassName={styles.body}>
      <p>{pick(section.lead, lang)}</p>
      {section.paragraphs?.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {section.rows ? <div className={styles.tableWrap}><table><caption>{pick(L('Bildmorphologie an der Basis von Metakarpale I', 'Imaging morphology at the base of metacarpal I', 'مورفولوژی تصویربرداری در قاعدهٔ متاکارپ اول'), lang)}</caption><thead><tr><th scope="col">{pick(L('Muster', 'Pattern', 'الگو'), lang)}</th><th scope="col">{pick(L('Merkmale', 'Features', 'ویژگی‌ها'), lang)}</th></tr></thead><tbody>{section.rows.map((row, index) => <tr key={index}><th scope="row">{pick(row[0], lang)}</th><td>{pick(row[1], lang)}</td></tr>)}</tbody></table></div> : null}
      {section.image ? <figure className={styles.figure}><Image src={section.image} width={section.imageWidth || 1209} height={section.imageHeight || 431} alt={pick(section.imageAlt, lang)} sizes="(max-width: 760px) 100vw, 850px"/><figcaption>{pick(section.imageCaption, lang)}</figcaption></figure> : null}
      {section.task ? <><Decision lang={lang} section={section}/><p className={styles.scopeNote}>{pick(section.scopeNote, lang)}</p></> : null}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={t('takeHome')}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
