'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { EPIPLOICA_LESSON as lesson } from '@/data/epiploicaLesson'
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
  const d = { fat: 'M8 3v5c0 4 8 4 8 8a4 4 0 0 1-8 0M5 3h14M8 9l-4 5m12-5 4 5', ct: 'M4 4h16v16H4zM8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0', bowel: 'M8 3c-4 0-4 6 0 6h8c4 0 4 6 0 6H8c-4 0-4 6 0 6h8', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function CTFeatures({ lang }) {
  return <div className={styles.tableWrap}><table><caption>{pick(L('Drei Beobachtungen im CT', 'Three CT observations', 'سه مشاهده در CT'), lang)}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Bedeutung', 'Meaning', 'معنا'), lang)}</th></tr></thead><tbody>{lesson.ctRows.map(([name, text]) => <tr key={name.de}><th scope="row">{pick(name, lang)}</th><td>{pick(text, lang)}</td></tr>)}</tbody></table></div>
}
function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.question
  return <div className={styles.decision}><h3>{pick(L('Fehlt ein Zeichen — fehlt die Diagnose?', 'Does a missing sign exclude the diagnosis?', 'نبود یک نشانه، تشخیص را رد می‌کند؟'), lang)}</h3><p>{pick(question.question, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{question.options.map((option, index) => <label key={index}><input type="radio" name="epiploica-decision" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null && <p className={styles.feedback} role="status"><strong>{pick(answer === question.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(question.feedback, lang)}</p>}</div>
}
export default function EpiploicaPage() {
  const { lang } = useLanguage()
  const labels = Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })), { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true }]
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = [
    { tag: 'CT', title: 'Singh et al. 2004 · CT appearance of acute appendagitis', href: 'https://pubmed.ncbi.nlm.nih.gov/15505294/', citation: 'AJR. 2004;183:1303–1307. DOI 10.2214/ajr.183.5.1831303.' },
    { tag: 'CT', title: 'Jalaguier et al. 2010 · Primary epiploic appendagitis versus diverticulitis-associated secondary appendagitis', href: 'https://pubmed.ncbi.nlm.nih.gov/19517148/', citation: 'Emerg Radiol. 2010;17:51–56. DOI 10.1007/s10140-009-0822-x.' },
    { tag: pick(L('Verlauf', 'Course', 'سیر'), lang), title: 'Tan et al. 2021 · Diagnosis and management of epiploic appendagitis: a single-institution 10-year experience', href: 'https://pubmed.ncbi.nlm.nih.gov/36169532/', citation: 'Pol Przegl Chir. 2021;93:20–24. DOI 10.5604/01.3001.0014.8912.' },
    { tag: pick(L('Verlauf', 'Course', 'سیر'), lang), title: 'Erdoğrul et al. 2024 · Efficacy of medical treatment in primary appendagitis epiploica', href: 'https://jarem.org/articles/efficacy-of-medical-treatment-in-primary-appendagitis-epiploica/jarem.galenos.2024.79307', citation: 'J Acad Res Med. 2024;14:121–124. DOI 10.4274/jarem.galenos.2024.79307.' },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    heroImageAlt={pick(lesson.heroAlt, lang)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('Abdomen', 'Abdomen', 'شکم'), lang), href: langHref('/lernen/abdomen') }, { label: pick(L('Peritoneum & Mesenterium', 'Peritoneum & mesentery', 'پریتوئن و مزانتر'), lang) }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id}/>}
    actions={{ mcq: { label: pick(L('Prüfungsfrage', 'Practice question', 'سؤال تمرینی'), lang), href: langHref('/ueben/quiz?fach=abdomen&n=1&themen=appendicitis-epiploica') } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/abdomen/epiploica/hero.svg', heroImageOpacity: .9, accent: '#d7aa62', accentStrong: '#795321', accentSoft: '#f7eddb', secondary: '#69aeb1', secondaryStrong: '#286c70', heroBase: '#152c35' }}
    className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sources} note={pick(L('Bild und Themenbasis: bereitgestelltes Abdomen.pdf, PDF S.97 / Druck S.96. Die vier Fallbilder sind ausgewählte axiale Ansichten. Therapieaussagen gelten für das unkomplizierte primäre Muster und ersetzen nicht die Beurteilung des gesamten Befunds.', 'Image and topic source: supplied Abdomen.pdf, PDF p.97 / printed p.96. The four case images are selected axial views. Management statements concern the uncomplicated primary pattern and do not replace assessment of the complete examination.', 'منبع تصویر و مباحث: Abdomen.pdf ارائه‌شده، صفحهٔ PDF ۹۷ / چاپی ۹۶. چهار تصویر کیس، نماهای محوری منتخب‌اند. نکات درمانی مربوط به الگوی اولیه و بدون عارضه‌اند و جایگزین بررسی کامل یافته‌ها نیستند.'), lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {chapter.id === 'ct-pattern' && <><CTFeatures lang={lang}/><p className={styles.task}>{pick(chapter.task, lang)}</p><figure className={styles.figure}><a href={lesson.figure.src} target="_blank" rel="noopener noreferrer" aria-label={pick(L('CT-Montage in voller Größe öffnen', 'Open the CT montage at full size', 'مونتاژ CT را در اندازهٔ کامل باز کنید'), lang)}><Image src={lesson.figure.src} width={lesson.figure.width} height={lesson.figure.height} alt={pick(lesson.figure.alt, lang)} sizes="(max-width: 760px) 100vw, 900px"/></a><figcaption>{pick(lesson.figure.caption, lang)}{' '}<a href={lesson.figure.sourceUrl} target="_blank" rel="noopener noreferrer">{pick(lesson.figure.sourceLabel, lang)}</a></figcaption></figure></>}
      {chapter.id === 'bowel-context' && <><Decision lang={lang}/><div className={styles.cards}><h3>{pick(L('Drei kurze Abruffragen', 'Three quick retrieval prompts', 'سه پرسش کوتاه برای یادآوری'), lang)}</h3>{lesson.cards.map(([front, back]) => <details key={front.de}><summary>{pick(front, lang)}</summary><p>{pick(back, lang)}</p></details>)}</div></>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labels.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
