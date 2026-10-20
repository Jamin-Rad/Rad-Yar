'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { TECHNIK_INTERVENTIONELLE_RADIOLOGIE_LESSON as lesson } from '@/data/technikInterventionelleRadiologieLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] || value?.de || ''
const labels = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'), sources: L('Quellen und Aussagebereich', 'Sources and scope', 'منابع و محدودهٔ گزاره‌ها'),
}
const iconPaths = { path: 'M4 7h6l3 5h7m-4-4 4 4-4 4', devices: 'M4 5h16v14H4zM7 9h4m-4 4h8m-8 3h5', vessel: 'M4 12h5l2-4 3 8 2-4h4', occlusion: 'M5 5l14 14M19 5 5 19M4 12h3m10 0h3', check: 'M4 12.5l5 5L20 6.5', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[id] || iconPaths.path}/></svg> }

function Matrix({ rows, lang }) { return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={pick(L('Übersichtstabelle','Overview table','جدول مرور'),lang)}><table><caption>{pick(L('Begriffe und Lernpunkte','Terms and learning points','اصطلاحات و نکات آموزشی'),lang)}</caption><thead><tr><th scope="col">{pick(L('Begriff','Concept','مفهوم'),lang)}</th><th scope="col">{pick(L('Einordnung','Interpretation','توضیح'),lang)}</th></tr></thead><tbody>{rows.map(([term,description],index)=><tr key={index}><th scope="row">{pick(term,lang)}</th><td>{pick(description,lang)}</td></tr>)}</tbody></table></div> }
function ScopeNote({ text }) { return <aside className={styles.note}>{text}</aside> }
function RetrievalCheck({ lang }) {
  const [answer,setAnswer]=useState(null); const c=lesson.check
  return <div className={styles.check}><h3>{pick(c.title,lang)}</h3><p>{pick(c.prompt,lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen','Choose one answer','یک پاسخ را انتخاب کنید'),lang)}</legend>{c.options.map((option,index)=><label key={index}><input type="radio" name="ir-material-check" checked={answer===index} onChange={()=>setAnswer(index)}/><span>{pick(option,lang)}</span></label>)}</fieldset>{answer!==null?<p className={styles.feedback} role="status"><strong>{pick(answer===c.answer?L('Richtig. ','Correct. ','درست است. '):L('Noch einmal prüfen. ','Review the material functions. ','کارکرد مواد را دوباره بررسی کن. '),lang)}</strong>{pick(answer===c.answer?c.feedback:c.retry,lang)}</p>:null}</div>
}
function DsaSequence({ lang, caption }) {
  const labels = {
    de: { alt:'DSA-Beispiel aus Technik.pdf, Druckseite 61, Abb. a–c: Füllungsbild, natives Bild und subtrahiertes Angiogramm eines Basilariskopfaneurysmas.' },
    en: { alt:'DSA example from Technik.pdf, printed page 61, panels a–c: contrast-filled frame, native frame and subtracted angiogram of a basilar tip aneurysm.' },
    fa: { alt:'نمونهٔ DSA از Technik.pdf، صفحهٔ چاپی ۶۱، پنل‌های a تا c: تصویر پُرشدن با کنتراست، تصویر بومی و آنژیوگرام تفریق‌شدهٔ آنوریسم نوک بازیلار.' },
  }[lang] || null
  if (!labels) return null
  return <figure className={styles.sequence} role="group" aria-label={labels.alt}><img src="/technik/interventionelle-radiologie/dsa-triptych-p62.png" alt={labels.alt} loading="lazy"/><figcaption>{caption}<br/><span>sourceRef: Technik.pdf#page=62 · printed p. 61 · panels a–c</span></figcaption></figure>
}

export default function InterventionalRadiologyPage() {
  const { lang } = useLanguage(); const t = value => pick(value,lang); const l = path => lang==='de'?path:`${path}?lang=${lang}`
  const localizedLabels = Object.fromEntries(Object.entries(labels).map(([key,value])=>[key,t(value)]))
  const sections = [...lesson.chapters.map(chapter=>({id:chapter.id,label:t(chapter.title),icon:chapter.icon})),{id:'check',label:t(lesson.check.title),icon:'check'},{id:'take-home',label:localizedLabels.takeHome,icon:'summary',emphasis:true}]
  const sources=lesson.sources.map(source=>({...source,tag:t(source.tag),title:t(source.title),citation:t(source.citation)}))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostisches Schema: Katheter im kontrastgefüllten Gefäß unter C-Bogen-Fluoroskopie.','Non-diagnostic schematic: catheter in a contrast-filled vessel under C-arm fluoroscopy.','شماتیک غیرتشخیصی: کاتتر در رگ حاوی مادهٔ حاجب زیر فلوروسکوپی C-arm.'))}
    breadcrumbs={[{label:'RadYar',href:l('/')},{label:t(L('Technik & Physik','Technique & Physics','تکنیک و فیزیک')),href:l('/lernen/technik')},{label:t(lesson.title)}]}
    sections={sections} labels={localizedLabels} actions={{}} renderIcon={id=><Icon id={id}/>}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:lesson.hero,heroImageOpacity:.94,accent:'#60b6c5',accentStrong:'#245d68',accentSoft:'#e8f5f7',secondary:'#c69a54',secondaryStrong:'#75531f',heroBase:'#132b35'}} className={styles.page}
    sources={<LessonSources title={localizedLabels.sources} items={sources} note={t(lesson.sourceNote)}/>}
  >
    {lesson.chapters.map(chapter=><LessonSection key={chapter.id} id={chapter.id} icon={chapter.icon} title={t(chapter.title)} bodyClassName={styles.body}>
      <p>{t(chapter.lead)}</p><Matrix rows={chapter.rows} lang={lang}/>{chapter.id==='dsa-grundlagen'?<DsaSequence lang={lang} caption={t(chapter.visualCaption)}/>:null}
      {chapter.note?<ScopeNote text={t(chapter.note)}/>:null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><RetrievalCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={localizedLabels.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((rule,index)=><li key={index}>{t(rule)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
