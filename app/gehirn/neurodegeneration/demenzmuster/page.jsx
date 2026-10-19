'use client'

import { useState } from 'react'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { GEHIRN_DEMENZMUSTER_LESSON as C } from '@/data/gehirnDemenzMusterLesson'
import styles from './page.module.css'

const value = (item, lang) => item?.[lang] || item?.de || ''
const labels = {
  path: { de: 'Lernpfad', en: 'Learning path', fa: 'مسیر یادگیری' }, progress: { de: 'gelesen', en: 'read', fa: 'خوانده‌شده' },
  continue: { de: 'Lektion fortsetzen', en: 'Continue lesson', fa: 'ادامهٔ درس' }, completeLesson: { de: 'Ganze Lektion als gelesen markieren', en: 'Mark the whole lesson as read', fa: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده' },
  lessonCompleted: { de: 'Ganze Lektion gelesen', en: 'Full lesson marked as read', fa: 'کل درس خوانده شد' }, complete: { de: 'Abschnitt als gelesen markieren', en: 'Mark section as read', fa: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده' },
  completed: { de: 'Gelesen', en: 'Read', fa: 'خوانده شد' }, open: { de: 'Abschnitt öffnen', en: 'Open section', fa: 'بازکردن بخش' }, close: { de: 'Schließen', en: 'Close', fa: 'بستن' },
  takeHome: { de: 'Drei Regeln mitnehmen', en: 'Three takeaways', fa: 'سه نکتهٔ کلیدی' }, sources: { de: 'Quellen und Grenzen', en: 'Sources and scope', fa: 'منابع و محدوده' },
}
const icons = { hippocampus: 'M3 12c2-7 6-8 9-4 4-3 8 0 9 4-2 7-6 8-9 4-4 3-8 0-9-4zm5-2c2 1 2 3 0 4m8-4c-2 1-2 3 0 4', compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4', brain: 'M12 4a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V4m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V4', check: 'm4 12 5 5L20 6', summary: 'm12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z' }
function Icon({ name }) { return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={icons[name] || icons.brain} /></svg> }
function Paragraphs({ text }) { return text.split(/\n\s*\n/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>) }
function Check({ lang }) {
  const [answer, setAnswer] = useState(null)
  const t = lang === 'fa' ? 'خودآزمایی: الگوی غالب' : lang === 'en' ? 'Self-check: dominant pattern' : 'Selbstcheck: Verteilungsmuster'
  return <section className={styles.quiz} aria-labelledby="dementia-self-check"><h3 id="dementia-self-check">{t}</h3><p>{value(C.assessment.question, lang)}</p><div className={styles.options}>{C.assessment.options.map((o, i) => <button key={i} type="button" aria-pressed={answer === i} onClick={() => setAnswer(i)}>{value(o, lang)}</button>)}</div>{answer !== null && <p role="status" className={styles.feedback}>{value(answer === C.assessment.correctIndex ? C.assessment.feedback : C.assessment.retry, lang)}</p>}</section>
}
function EvidenceFigure({ figure, lang }) { return <figure id={figure.id} className={styles.caseFigure}><img src={figure.src} alt={value(figure.alt, lang)} width={figure.width} height={figure.height}/><figcaption>{value(figure.caption, lang)}</figcaption></figure> }

export default function DementiaPatternsPage() {
  const { lang } = useLanguage()
  const brain = value({ de: 'Gehirn', en: 'Brain', fa: 'مغز' }, lang)
  const sections = [...C.chapters.map(ch => ({ id: ch.id, label: value(ch.title, lang), icon: ch.icon })),
    { id: 'self-check', label: value(C.ui.selfCheck, lang), icon: 'check' }, { id: 'take-home', label: value(C.ui.takeHome, lang), icon: 'summary', emphasis: true }]
  const refs = C.references.map((ref, i) => ({ tag: i === 0 ? 'PDF · pp.72–74' : 'REFERENCE', title: ref.label, href: ref.href, citation: ref.citation, scope: ref.scope || '' }))
  return <StandardLessonShell lessonId={C.id} lang={lang} title={value(C.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: lang === 'de' ? '/' : `/?lang=${lang}` }, { label: brain, href: lang === 'de' ? '/lernen/gehirn' : `/lernen/gehirn?lang=${lang}` }, { label: value(C.title, lang) }]}
    sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([k, v]) => [k, value(v, lang)]))} actions={{}}
    renderIcon={name => <Icon name={name}/>} theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/demenzmuster/atrophy-distribution.svg', heroImageOpacity: .68, accent: '#58b5c2', accentStrong: '#185d69', accentSoft: '#e2f3f4', secondary: '#d18469', secondaryStrong: '#784632', heroBase: '#102734' }}
    className={styles.page} heroImageAlt={value(C.heroAlt, lang)} syncHashNavigation
    sources={<LessonSources title={value(C.ui.sources, lang)} items={refs} note={value(C.mediaNote, lang)}/> }>
    {C.chapters.map((chapter, index) => <LessonSection key={chapter.id} id={chapter.id} title={value(chapter.title, lang)} icon={chapter.icon}>
      {index === 0 && <p className={styles.lead}>{value(C.objective, lang)}</p>}
      <Paragraphs text={value(chapter.text, lang)}/>
      {chapter.figure && <EvidenceFigure figure={chapter.figure} lang={lang}/>}
    </LessonSection>)}
    <LessonSection id="self-check" title={value(C.ui.selfCheck, lang)} icon="check"><Check lang={lang}/></LessonSection>
    <LessonSection id="take-home" title={value(C.ui.takeHome, lang)} icon="summary"><TakeHomeList items={C.takeaways.map(item => ({ title: value(item.title, lang), detail: value(item.detail, lang) }))}/></LessonSection>
  </StandardLessonShell>
}
