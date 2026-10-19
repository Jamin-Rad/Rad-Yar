'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PERITONEAL_LESSON as lesson } from '@/data/peritonealCarcinomatosisLesson'
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
  const d = { surface: 'M5 4h14v16H5zM9 8h6M9 12h2m2 4h2', pattern: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z', extent: 'M4 8V4h4m8 0h4v4m0 8v4h-4M8 20H4v-4M8 12h8', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function CTFeatures({ lang }) {
  return <div className={styles.tableWrap}><table><caption>{pick(L('Muster und Bedeutung im CT', 'CT patterns and their meaning', 'الگوهای CT و معنای آن‌ها'), lang)}</caption><thead><tr><th scope="col">{pick(L('Muster', 'Pattern', 'الگو'), lang)}</th><th scope="col">{pick(L('Beobachtung und Grenze', 'Observation and limit', 'مشاهده و محدودیت'), lang)}</th></tr></thead><tbody>{lesson.ctRows.map(([name, text]) => <tr key={name.de}><th scope="row">{pick(name, lang)}</th><td>{pick(text, lang)}</td></tr>)}</tbody></table></div>
}
function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.question
  return <div className={styles.decision}><h3>{pick(L('Nicht sichtbar — sicher nicht vorhanden?', 'Not visible — safely absent?', 'دیده نمی‌شود؛ پس با اطمینان وجود ندارد؟'), lang)}</h3><p>{pick(question.question, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{question.options.map((option, index) => <label key={index}><input type="radio" name="peritoneal-decision" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null && <p className={styles.feedback} role="status"><strong>{pick(answer === question.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(question.feedback, lang)}</p>}</div>
}
export default function PeritonealPage() {
  const { lang } = useLanguage()
  const labels = Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })), { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true }]
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = [
    { tag: pick(L('Empfehlung', 'Guidance', 'توصیه'), lang), title: 'Vandecaveye et al. 2025 · Joint ESGAR/ESUR/PSOGI/EANM recommendations', href: 'https://link.springer.com/content/pdf/10.1007/s00330-024-11124-5.pdf', citation: 'Eur Radiol. 2025;35:2712–2722 (online 2024). DOI 10.1007/s00330-024-11124-5.' },
    { tag: 'CT', title: 'Liang et al. 2016 · Mesothelioma versus peritoneal carcinomatosis', href: 'https://pubmed.ncbi.nlm.nih.gov/26645426/', citation: 'J Gastroenterol Hepatol. 2016;31:709–715. DOI 10.1111/jgh.13260.' },
    { tag: 'CT / MRI', title: 'Chia et al. 2022 · Prospective MRI versus CT comparison', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9264985/', citation: 'Cancers. 2022;14:3179. DOI 10.3390/cancers14133179.' },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    heroImageAlt={pick(lesson.heroAlt, lang)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('Abdomen', 'Abdomen', 'شکم'), lang), href: langHref('/lernen/abdomen') }, { label: pick(L('Peritoneum & Mesenterium', 'Peritoneum & mesentery', 'پریتوئن و مزانتر'), lang) }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id}/>}
    actions={{ mcq: { label: pick(L('Prüfungsfrage', 'Practice question', 'سؤال تمرینی'), lang), href: langHref(`/ueben/quiz?fach=abdomen&n=1&themen=peritonealkarzinose&from=${encodeURIComponent(langHref('/abdomen/peritoneum/peritonealkarzinose'))}`) } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/abdomen/peritoneal-carcinomatosis/hero.svg', heroImageOpacity: .9, accent: '#d3a884', accentStrong: '#825434', accentSoft: '#f7ebdf', secondary: '#80b4bb', secondaryStrong: '#356f79', heroBase: '#1a3039' }}
    className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sources} note={pick(L('Themen und axiales Fallbild: bereitgestelltes Abdomen.pdf, PDF S.99 / Druck S.98. Das ausgewählte Bild zeigt Omentumverdickung und Flüssigkeit. Die ergänzende Empfehlung zur Ausdehnungsdiagnostik bezieht sich auf Ovarial- und kolorektale Tumoren.', 'Topics and axial case image: supplied Abdomen.pdf, PDF p.99 / printed p.98. The selected image shows omental thickening and fluid. The supplementary staging guidance concerns ovarian and colorectal tumours.', 'مباحث و تصویر محوری کیس: Abdomen.pdf ارائه‌شده، صفحهٔ PDF ۹۹ / چاپی ۹۸. تصویر منتخب، ضخیم‌شدن امنتوم و مایع را نشان می‌دهد. توصیهٔ تکمیلی بررسی وسعت مربوط به تومورهای تخمدان و کولورکتال است.'), lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {chapter.id === 'surface-spread' && <><p className={styles.task}>{pick(chapter.task, lang)}</p><figure className={styles.figure}><a href={lesson.figure.src} target="_blank" rel="noopener noreferrer" aria-label={pick(L('CT-Quellenbild in voller Größe öffnen', 'Open the source CT image at full size', 'تصویر CT منبع را در اندازهٔ کامل باز کنید'), lang)}><Image src={lesson.figure.src} width={lesson.figure.width} height={lesson.figure.height} alt={pick(lesson.figure.alt, lang)} sizes="(max-width: 760px) 100vw, 620px"/></a><figcaption>{pick(lesson.figure.caption, lang)}{' '}<a href={lesson.figure.sourceUrl} target="_blank" rel="noopener noreferrer">{pick(lesson.figure.sourceLabel, lang)}</a></figcaption></figure></>}
      {chapter.id === 'ct-patterns' && <CTFeatures lang={lang}/>}
      {chapter.id === 'extent-limits' && <><Decision lang={lang}/><div className={styles.cards}><h3>{pick(L('Drei kurze Abruffragen', 'Three quick retrieval prompts', 'سه پرسش کوتاه برای یادآوری'), lang)}</h3>{lesson.cards.map(([front, back]) => <details key={front.de}><summary>{pick(front, lang)}</summary><p>{pick(back, lang)}</p></details>)}</div></>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labels.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
