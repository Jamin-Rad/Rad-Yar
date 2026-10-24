'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { ORMOND_LESSON as lesson } from '@/data/ormondLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value[lang] || value.de
const LABELS = {
  contents: L('Lektionsinhalt', 'Lesson content', 'محتوای درس'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'),
  progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
}
function Icon({ id }) {
  const d = { mantle: 'M10 3v8l-5 9m5-9 5 9M7 6h8v9H7z', ureters: 'M6 4c-4 0-4 7 0 7s4-7 0-7m12 0c-4 0-4 7 0 7s4-7 0-7M6 11v9m12-9v9', activity: 'M3 12h4l3-7 4 14 3-7h4', mimics: 'M4 5h6v6H4zM14 13h6v6h-6zM15 4l5 5m0-5-5 5M4 17h6', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function Comparison({ rows, lang, heading }) {
  return <div className={styles.tableWrap}><table><caption>{heading}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Einordnung', 'Interpretation', 'تفسیر'), lang)}</th></tr></thead><tbody>{rows.map(([name, text]) => <tr key={name.de}><th scope="row">{pick(name, lang)}</th><td>{pick(text, lang)}</td></tr>)}</tbody></table></div>
}
function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.question
  return <div className={styles.decision}><h3>{pick(L('Den Quellenfall einordnen', 'Interpret the source case', 'کیس منبع را تفسیر کنید'), lang)}</h3><p>{pick(question.question, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{question.options.map((option, index) => <label key={index}><input type="radio" name="ormond-decision" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null && <p className={styles.feedback} role="status"><strong>{pick(answer === question.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(question.feedback, lang)}</p>}</div>
}
export default function OrmondPage() {
  const { lang } = useLanguage()
  const labels = Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })), { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true }]
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = [
    { tag: 'DWI', title: 'Kamper et al. 2014 · Diffusion-weighted MRI findings of treated and untreated retroperitoneal fibrosis', href: 'https://doi.org/10.5152/dir.2014.14027', citation: 'Diagn Interv Radiol. 2014;20:459–463.' },
    { tag: 'CT / MRI', title: 'Cohan et al. 2018 · Imaging appearance of fibrosing diseases of the retroperitoneum', href: 'https://pubmed.ncbi.nlm.nih.gov/28849414/', citation: 'Abdom Radiol. 2018;43:1204–1214.' },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('Abdomen', 'Abdomen', 'شکم'), lang), href: langHref('/lernen/abdomen') }, { label: pick(L('Retroperitoneum', 'Retroperitoneum', 'رتروپریتوئن'), lang) }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id}/>}
    actions={{ mcq: { label: pick(L('Prüfungsfrage', 'Practice question', 'سؤال تمرینی'), lang), href: langHref(`/ueben/quiz?fach=abdomen&n=1&themen=morbus-ormond&from=${encodeURIComponent(langHref('/abdomen/retroperitoneum/morbus-ormond'))}`) }, flashcards: { label: pick(L('Karteikarten', 'Flashcards', 'فلش‌کارت‌ها'), lang), href: langHref(`/flashcards/morbus-ormond?from=${encodeURIComponent(langHref('/abdomen/retroperitoneum/morbus-ormond'))}`) } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/abdomen/ormond/hero.svg', heroImageOpacity: .85, accent: '#dfa66f', accentStrong: '#854b29', accentSoft: '#f7e5d6', secondary: '#6ea6c5', secondaryStrong: '#34627a', heroBase: '#152937' }}
    className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sources} note={pick(L('Bild und Themenbasis: bereitgestelltes Abdomen.pdf, PDF S.95–96 / Druck S.94–95. Die Fallmontage zeigt nur ausgewählte Ansichten.', 'Image and topic source: supplied Abdomen.pdf, PDF pp.95–96 / printed pp.94–95. The case montage shows selected views only.', 'منبع تصویر و مباحث: Abdomen.pdf ارائه‌شده، صفحه‌های PDF ۹۵–۹۶ / چاپی ۹۴–۹۵. مونتاژ کیس فقط نماهای منتخب را نشان می‌دهد.'), lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {chapter.id === 'mantle' && <><p className={styles.task}>{pick(chapter.task, lang)}</p><figure className={styles.figure}><Image src={lesson.figure.src} width={1420} height={1010} alt={pick(lesson.figure.alt, lang)} sizes="(max-width: 760px) 100vw, 780px"/><figcaption>{pick(lesson.figure.caption, lang)}{' '}<a href={lesson.figure.sourceUrl} target="_blank" rel="noopener noreferrer">{pick(lesson.figure.sourceLabel, lang)}</a></figcaption></figure></>}
      {chapter.id === 'activity' && <Comparison rows={lesson.modalityRows} lang={lang} heading={pick(L('Signal und Kontrastierung als Hinweise', 'Signal and enhancement as clues', 'سیگنال و جذب مادهٔ حاجب به‌عنوان سرنخ'), lang)}/>}
      {chapter.id === 'mimics' && <><Comparison rows={lesson.differentialRows} lang={lang} heading={pick(L('Ähnliche Erscheinung, andere Ursache', 'Similar appearance, different causes', 'ظاهر مشابه، علت‌های متفاوت'), lang)}/><Decision lang={lang}/><div className={styles.cards}><h3>{pick(L('Drei kurze Abruffragen', 'Three quick retrieval prompts', 'سه پرسش کوتاه برای یادآوری'), lang)}</h3>{lesson.cards.map(([front, back]) => <details key={front.de}><summary>{pick(front, lang)}</summary><p>{pick(back, lang)}</p></details>)}</div></>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labels.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
