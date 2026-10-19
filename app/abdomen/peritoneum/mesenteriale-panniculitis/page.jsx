'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { PANNICULITIS_LESSON as lesson } from '@/data/panniculitisLesson'
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
  const d = { fat: 'M4 17c4-9 5-12 8-12s4 3 8 12M12 5v15M8 12l-4 3m12-3 4 3', nodes: 'M10 3v18m4-18v18M4 5h3v5H4zm13 9h3v5h-3z', context: 'M4 5h16v14H4zM7 9h10M7 13h6', summary: 'M5 5h14M5 12h14M5 19h14' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={d}/></svg>
}
function CTFeatures({ lang }) {
  return <div className={styles.tableWrap}><table><caption>{pick(L('Drei CT-Beobachtungen gemeinsam lesen', 'Read three CT observations together', 'سه مشاهدهٔ CT را با هم بررسی کنید'), lang)}</caption><thead><tr><th scope="col">{pick(L('Merkmal', 'Feature', 'ویژگی'), lang)}</th><th scope="col">{pick(L('Bedeutung und Grenze', 'Meaning and limit', 'معنا و محدودیت'), lang)}</th></tr></thead><tbody>{lesson.ctRows.map(([name, text]) => <tr key={name.de}><th scope="row">{pick(name, lang)}</th><td>{pick(text, lang)}</td></tr>)}</tbody></table></div>
}
function SourceFigure({ figure, lang, compact = false }) {
  return <figure className={`${styles.figure} ${compact ? styles.compactFigure : ''}`}><a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={pick(L('CT-Quellenbild in voller Größe öffnen', 'Open the source CT image at full size', 'تصویر CT منبع را در اندازهٔ کامل باز کنید'), lang)}><Image src={figure.src} width={figure.width} height={figure.height} alt={pick(figure.alt, lang)} sizes={compact ? '(max-width: 580px) 100vw, 440px' : '(max-width: 760px) 100vw, 730px'}/></a><figcaption>{pick(figure.caption, lang)}{' '}<a href={figure.sourceUrl} target="_blank" rel="noopener noreferrer">{pick(figure.sourceLabel, lang)}</a></figcaption></figure>
}
function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = lesson.question
  return <div className={styles.decision}><h3>{pick(L('Ein erhaltener Fett-ring — Entwarnung?', 'Does a preserved fat ring reassure?', 'حلقهٔ چربی حفظ‌شده، اطمینان‌بخش است؟'), lang)}</h3><p>{pick(question.question, lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ را انتخاب کنید'), lang)}</legend>{question.options.map((option, index) => <label key={index}><input type="radio" name="panniculitis-decision" checked={answer === index} onChange={() => setAnswer(index)}/><span>{pick(option, lang)}</span></label>)}</fieldset>{answer !== null && <p className={styles.feedback} role="status"><strong>{pick(answer === question.answer ? L('Richtig. ', 'Correct. ', 'درست است. ') : L('Noch einmal prüfen. ', 'Review this once more. ', 'دوباره بررسی کنید. '), lang)}</strong>{pick(question.feedback, lang)}</p>}</div>
}
export default function PanniculitisPage() {
  const { lang } = useLanguage()
  const labels = Object.fromEntries(Object.entries(LABELS).map(([key, value]) => [key, pick(value, lang)]))
  const sections = [...lesson.chapters.map(chapter => ({ id: chapter.id, label: pick(chapter.title, lang), icon: chapter.icon })), { id: 'take-home', label: labels.takeHome, icon: 'summary', emphasis: true }]
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const sources = [
    { tag: 'CT', title: 'Al-Omari et al. 2019 · CT findings with and without malignancy', href: 'https://www.dovepress.com/getfile.php?fileID=47238', citation: 'Clin Exp Gastroenterol. 2019;12:1–8. DOI 10.2147/CEG.S182513.' },
    { tag: 'CT', title: 'Grégory et al. 2022 · CT features associated with underlying malignancy', href: 'https://pubmed.ncbi.nlm.nih.gov/35843840/', citation: 'Diagn Interv Imaging. 2022;103:394–400. DOI 10.1016/j.diii.2022.06.009.' },
    { tag: pick(L('Verlauf', 'Course', 'سیر'), lang), title: 'van Putte-Katier et al. 2014 · Five-year follow-up', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4243199/', citation: 'Br J Radiol. 2014;87:20140451. DOI 10.1259/bjr.20140451.' },
    { tag: pick(L('Empfehlung', 'Guidance', 'توصیه'), lang), title: 'Bird et al. 2026 · CAR Recommendations: Incidental Findings of the Spleen and Nodes in Adults', href: 'https://journals.sagepub.com/doi/10.1177/08465371251346732', citation: 'Can Assoc Radiol J. 2026;77:40–49 (online 2025). DOI 10.1177/08465371251346732.' },
    { tag: pick(L('Therapie', 'Treatment', 'درمان'), lang), title: 'Cortés et al. 2022 · Treatment of sclerosing mesenteritis: a retrospective study', href: 'https://mayoclinic.elsevierpure.com/en/publications/colchicine-as-an-alternative-first-line-treatment-of-sclerosing-m/', citation: 'Dig Dis Sci. 2022;67:2403–2412. DOI 10.1007/s10620-021-07081-4.' },
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title, lang)} author="Dr. Zia"
    heroImageAlt={pick(lesson.heroAlt, lang)} syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: pick(L('Abdomen', 'Abdomen', 'شکم'), lang), href: langHref('/lernen/abdomen') }, { label: pick(L('Peritoneum & Mesenterium', 'Peritoneum & mesentery', 'پریتوئن و مزانتر'), lang) }]}
    sections={sections} labels={labels} renderIcon={id => <Icon id={id}/>}
    actions={{ mcq: { label: pick(L('Prüfungsfrage', 'Practice question', 'سؤال تمرینی'), lang), href: langHref('/ueben/quiz?fach=abdomen&n=1&themen=mesenteriale-panniculitis') } }}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/abdomen/panniculitis/hero.svg', heroImageOpacity: .9, accent: '#c9b273', accentStrong: '#75602c', accentSoft: '#f3eedc', secondary: '#69aeb1', secondaryStrong: '#286c70', heroBase: '#172f35' }}
    className={styles.page}
    sources={<LessonSources title={pick(L('Quellen', 'Sources', 'منابع'), lang)} items={sources} note={pick(L('Themen und Fallbilder: bereitgestelltes Abdomen.pdf, PDF S.98 / Druck S.97. Zwei unterschiedliche Quellenfälle werden verglichen. Ausgewählte CT-Ansichten ersetzen weder die vollständige Untersuchung noch die klinische Einordnung.', 'Topics and case images: supplied Abdomen.pdf, PDF p.98 / printed p.97. Two different source cases are compared. Selected CT views replace neither the full examination nor clinical assessment.', 'مباحث و تصاویر کیس: Abdomen.pdf ارائه‌شده، صفحهٔ PDF ۹۸ / چاپی ۹۷. دو کیس منبع جداگانه مقایسه می‌شوند. نماهای منتخب CT جایگزین مطالعهٔ کامل یا بررسی بالینی نیستند.'), lang)}/>}
  >
    {lesson.chapters.map(chapter => <LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={pick(chapter.title, lang)} bodyClassName={styles.body}>
      {chapter.paragraphs.map((paragraph, index) => <p key={index}>{pick(paragraph, lang)}</p>)}
      {chapter.id === 'fat-pattern' && <><CTFeatures lang={lang}/><p className={styles.task}>{pick(chapter.task, lang)}</p><SourceFigure figure={lesson.figures.pattern} lang={lang}/></>}
      {chapter.id === 'lymphoma-mimic' && <SourceFigure figure={lesson.figures.lymphoma} lang={lang} compact/>}
      {chapter.id === 'clinical-context' && <><Decision lang={lang}/><div className={styles.cards}><h3>{pick(L('Drei kurze Abruffragen', 'Three quick retrieval prompts', 'سه پرسش کوتاه برای یادآوری'), lang)}</h3>{lesson.cards.map(([front, back]) => <details key={front.de}><summary>{pick(front, lang)}</summary><p>{pick(back, lang)}</p></details>)}</div></>}
    </LessonSection>)}
    <LessonSection id="take-home" icon="summary" title={labels.takeHome}><ol className={styles.rules}>{lesson.summary.map(rule => <li key={rule.de}>{pick(rule, lang)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
