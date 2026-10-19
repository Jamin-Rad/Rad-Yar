'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { ABDOMEN_LIVER_VESSELS_LESSON as lesson } from '@/data/abdomenLiverVesselsLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const icons = { clinical: 'M12 3v18M5 8h14M7 16h10', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[id] || icons.imaging}/></svg> }
function Table({ rows, lang }) {
  const t = value => pick(value, lang)
  return <div className={styles.tableWrap}><table><thead><tr><th scope="col">{t(L('Weg', 'Pathway', 'مسیر'))}</th><th scope="col">{t(L('Verbindung', 'Connection', 'ارتباط'))}</th></tr></thead><tbody>{rows.map(([label, value]) => <tr key={label.de}><th scope="row">{t(label)}</th><td>{t(value)}</td></tr>)}</tbody></table></div>
}
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const item = lesson.check
  const t = value => pick(value, lang)
  return <div className={styles.quiz}><h3>{t(item.title)}</h3><p>{t(item.prompt)}</p>{item.options.map((option, index) => <button key={index} type="button" aria-pressed={answer === index} className={answer === index ? styles.selected : ''} onClick={() => setAnswer(index)}>{t(option)}</button>)}{answer !== null ? <p className={answer === item.answer ? styles.correct : styles.feedback} role="status" aria-live="polite">{t(answer === item.answer ? item.good : item.retry)}</p> : null}</div>
}

export default function LiverVesselsPage() {
  const { lang } = useLanguage()
  const t = value => pick(value, lang)
  const local = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const text = {
    path: t(L('Lernpfad', 'Learning path', 'مسیر یادگیری')), progress: t(L('Fortschritt', 'Progress', 'پیشرفت')),
    continue: t(L('Weiter', 'Continue', 'ادامه')), complete: t(L('Abschnitt als gelesen markieren', 'Mark section as read', 'علامت‌گذاری بخش به‌عنوان خوانده‌شده')),
    completed: t(L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده')), open: t(L('Abschnitt öffnen', 'Open section', 'بازکردن بخش')),
    close: t(L('Schließen', 'Close', 'بستن')), completeLesson: t(L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده')),
    lessonCompleted: t(L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد')), sources: t(L('Quelle und Umfang', 'Source and scope', 'منبع و دامنه')),
    takeHome: t(L('Drei Orientierungsregeln', 'Three orientation rules', 'سه قاعدهٔ جهت‌یابی')),
  }
  const sectionDefs = [...lesson.sections.map(section => ({ id: section.id, label: t(section.title), icon: section.icon })),
    { id: 'self-check', label: t(lesson.check.title), icon: 'check' }, { id: 'take-home', label: text.takeHome, icon: 'summary', emphasis: true }]
  const refs = lesson.references.map(reference => ({ ...reference, title: t(reference.title), citation: t(reference.citation) }))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: t(L('Abdomen', 'Abdomen', 'شکم')), href: local('/lernen/abdomen') }, { label: t(L('Leber', 'Liver', 'کبد')), href: local('/abdomen/leber/haemangiom') }, { label: t(lesson.title) }]}
    sections={sectionDefs} labels={text} actions={{}} renderIcon={id => <Icon id={id}/>} theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: lesson.hero, heroImageOpacity: .95, accent: '#55a5b4', accentStrong: '#185967', accentSoft: '#e1f3f4', secondary: '#d69553', secondaryStrong: '#784316', heroBase: '#101b2d' }}
    heroImageAlt={t(L('Nichtdiagnostische Skizze: Pfortader und Leberarterie führen zur Leber; Lebervenen drainieren in die Vena cava inferior.', 'Non-diagnostic schematic: the portal vein and hepatic artery enter the liver; hepatic veins drain into the inferior vena cava.', 'شماتیک غیرتشخیصی: ورید پورت و شریان کبدی وارد کبد می‌شوند؛ وریدهای کبدی به ورید اجوف تحتانی تخلیه می‌شوند.'))}
    sources={<LessonSources title={text.sources} items={refs} note={t(lesson.sourceNote)}/> }>
    {lesson.sections.map(section => <LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p><Table rows={section.rows} lang={lang}/>
      <figure className={styles.figure}><img src={section.image.src} alt={t(section.image.alt)} loading="lazy"/><figcaption>{t(section.image.caption)}</figcaption></figure>
    </LessonSection>)}
    <LessonSection id="self-check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><Check lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={text.takeHome} bodyClassName={styles.body} emphasis><ol className={styles.summary}>{lesson.summary.map(item => <li key={item.de}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
