'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { INGUINAL_FEMORAL_HERNIA_LESSON as lesson } from '@/data/inguinalFemoralHerniaLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || ''
const labels = {
  takeHome: L('Vier Regeln mitnehmen', 'Four rules to remember', 'چهار قاعده برای یادآوری'),
  sources: L('Quelle und Umfang', 'Source and scope', 'منبع و دامنه'),
  check: L('Landmarken kombinieren', 'Combine the landmarks', 'نشانه‌های آناتومیک را ترکیب کنید'),
  choose: L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'),
  correct: L('Richtig. ', 'Correct. ', 'درست است. '),
  retry: L('Noch einmal prüfen. ', 'Review the landmarks. ', 'نشانه‌ها را دوباره بررسی کنید. '),
  legend: L('Farblegende der Orientierungsskizze', 'Colour key for the orientation schematic', 'راهنمای رنگی شماتیک جهت‌یابی'),
}
function Icon({ id }) {
  const paths = {
    map: 'M4 5l5-2 6 2 5-2v16l-5 2-6-2-5 2zM9 3v16m6-14v16',
    route: 'M5 19V5h6v14m2-10h6m-3-3 3 3-3 3',
    vessels: 'M6 3v18m5-18v18m3-14h5m-3-3 3 3-3 3',
    scan: 'M4 5h16v14H4zM8 9c2-3 6-3 8 0s-1 6-4 6-6-2-4-6z',
    summary: 'M5 5h14M5 12h14M5 19h14',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.map}/></svg>
}
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.check
  return <div className={styles.check}>
    <h3>{pick(labels.check, lang)}</h3>
    <p>{pick(question.prompt, lang)}</p>
    <fieldset><legend>{pick(labels.choose, lang)}</legend>{question.options.map((option, index) => <label key={index}>
      <input type="radio" name="inguinal-femoral-check" checked={answer === index} onChange={() => setAnswer(index)}/>
      <span>{pick(option, lang)}</span>
    </label>)}</fieldset>
    {answer !== null && <p className={styles.feedback} role="status"><strong>{pick(answer === question.answer ? labels.correct : labels.retry, lang)}</strong>{pick(question.feedback, lang)}</p>}
  </div>
}
function MapLegend({ lang }) {
  const items = [
    ['#6f8292', L('Leistenband', 'Inguinal ligament', 'رباط اینگوینال')],
    ['#c74f63', L('Inferiore epigastrische Gefäße', 'Inferior epigastric vessels', 'عروق اپی‌گاستریک تحتانی')],
    ['#8f62bd', L('Tiefer Ring und indirekter Weg: lateral der Gefäße (in der Skizze links)', 'Deep ring and indirect path: lateral to the vessels (left in the schematic)', 'حلقهٔ عمقی و مسیر غیرمستقیم: لترال عروق (در شکل سمت چپ)')],
    ['#9b6a4b', L('Direkter Weg: medial der Gefäße (in der Skizze rechts)', 'Direct path: medial to the vessels (right in the schematic)', 'مسیر مستقیم: مدیال عروق (در شکل سمت راست)')],
    ['#4279a4', L('Vena femoralis', 'Femoral vein', 'ورید فمورال')],
    ['#e2a449', L('Femoralhernie medial der Vene', 'Femoral hernia medial to the vein', 'فتق فمورال در مدیال ورید')],
  ]
  return <div className={styles.legend}><h3>{pick(labels.legend, lang)}</h3><ul>{items.map(([color, text]) => <li key={color}><span style={{ '--swatch': color }} aria-hidden="true"/>{pick(text, lang)}</li>)}</ul></div>
}

export default function InguinalFemoralHerniaPage() {
  const { lang } = useLanguage()
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key, value]) => [key, pick(value, lang)]))
  const langHref = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const langQuery = lang === 'de' ? '' : `&lang=${lang}`
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })), { id: 'take-home', label: localizedLabels.takeHome, icon: 'summary', emphasis: true }]
  const source = [{ id: 'abdomen-p93-p94', tag: 'PDF', title: 'Abdomen.pdf · Leistenhernie', citation: 'PDF pp.93–94 · printed pp.92–93' }]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('Abdomen', 'Abdomen', 'شکم'), lang), href: langHref('/lernen/abdomen') }, { label: pick(L('Hernien', 'Hernias', 'فتق‌ها'), lang), href: langHref('/lernen/abdomen') }]}
    sections={sections} labels={{ ...localizedLabels, path: pick(L('Lernpfad', 'Learning path', 'مسیر یادگیری'), lang), progress: pick(L('gelesen', 'read', 'خوانده‌شده'), lang), continue: pick(L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'), lang), complete: pick(L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), lang), completed: pick(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), lang), open: pick(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), lang), close: pick(L('Schließen', 'Close', 'بستن'), lang), completeLesson: pick(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lang), lessonCompleted: pick(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'), lang) }} actions={{ mcq: { label: pick(L('Quiz zu Leistenhernien', 'Groin hernia quiz', 'آزمون فتق‌های کشالهٔ ران'), lang), href: `/ueben/quiz?fach=abdomen&n=2&themen=inguinalhernie,femoralhernie${langQuery}` }, flashcards: { label: pick(L('Flashcards zu Leisten- und Schenkelhernie', 'Inguinal and femoral hernia flashcards', 'فلش‌کارت‌های فتق اینگوینال و فمورال'), lang), href: `/flashcards/inguinal-femoral-hernia${lang === 'de' ? '' : `?lang=${lang}`}` } }} renderIcon={id => <Icon id={id}/>}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.visual.src, heroImageOpacity: .92, accent: '#7b5cab', accentStrong: '#48336d', accentSoft: '#eee8f7', secondary: '#4c8398', secondaryStrong: '#315e70', heroBase: '#172332' }}
    heroImageAlt={pick(lesson.visual.alt, lang)} className={styles.page}
    sources={<LessonSources title={localizedLabels.sources} items={source} note={pick(lesson.sourceNote, lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {chapter.id === 'map' && <figure className={styles.map}><Image src={lesson.visual.src} width={720} height={420} alt={pick(lesson.visual.alt, lang)} sizes="(max-width: 760px) 100vw, 760px"/><figcaption>{pick(chapter.visualNote, lang)}</figcaption><MapLegend lang={lang}/></figure>}
      {chapter.id === 'imaging' && <Check lang={lang}/>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={localizedLabels.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
