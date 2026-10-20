'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { RENAL_TRAUMA_LESSON as lesson } from '@/data/renalTraumaLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'),
  continue: L('Lektion fortsetzen', 'Continue lesson', 'ادامهٔ درس'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'),
  open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه قاعده برای یادآوری'),
  sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
  selfCheck: L('Selbstcheck: Welche CT-Phase?', 'Self-check: Which CT phase?', 'خودآزمایی: کدام فاز CT؟'),
  choose: L('Eine Antwort auswählen', 'Choose one answer', 'یک پاسخ انتخاب کنید'),
  correct: L('Richtig. ', 'Correct. ', 'درست است. '), retry: L('Noch einmal prüfen. ', 'Review this once more. ', 'یک‌بار دیگر بررسی کنید. '),
  diagramTitle: L('CT-Phasen und Hauptsuchziel bei Nierenverletzung', 'CT phases and primary target in renal injury', 'فازهای CT و هدف اصلی در آسیب کلیه'),
  diagramLabels: [L('Arteriell', 'Arterial', 'شریانی'), L('Nephrographisch', 'Nephrographic', 'نفروگرافیک'), L('Verzögert', 'Delayed', 'تأخیری')],
  diagramTargets: [L('Gefäße · aktive Blutung', 'Vessels · active bleeding', 'عروق · خونریزی فعال'), L('Parenchym · Lazeration', 'Parenchyma · laceration', 'پارانشیم · پارگی'), L('Sammelsystem · Urinleck', 'Collecting system · urine leak', 'سیستم جمع‌کننده · نشت ادرار')],
  diagramCaption: L('Die Phasen beantworten verschiedene Fragen. Ein unauffälliger verzögerter Scan in Hypovolämie schließt eine Leckage nicht zuverlässig aus.', 'The phases answer different questions. A negative delayed scan in hypovolaemia does not reliably exclude a leak.', 'فازها به پرسش‌های متفاوت پاسخ می‌دهند. CT تأخیری منفی در هیپوولمی، نشت را با اطمینان رد نمی‌کند.'),
  imageTitle: L('PDF-Beispiel: Urinkontrast außerhalb des Sammelsystems', 'PDF example: urinary contrast outside the collecting system', 'نمونهٔ PDF: ماده حاجب ادراری خارج از سیستم جمع‌کننده'),
}

function Icon({ id }) {
  const paths = {
    phases: 'M4 7h16M4 12h16M4 17h16M8 4v6m8 4v6',
    pattern: 'M4 12c0-6 4-9 8-9s8 3 8 9-4 9-8 9-8-3-8-9Zm4 0h8',
    leak: 'M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11Zm-3 11a3 3 0 0 0 3 3',
    summary: 'M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.pattern}/></svg>
}

function PhaseDiagram({ lang }) {
  const phases = labels.diagramLabels.map(item => pick(item, lang))
  const targets = labels.diagramTargets.map(item => pick(item, lang))
  return <figure className={styles.figure}>
    <svg className={styles.phaseDiagram} viewBox="0 0 900 280" role="img" aria-labelledby="renal-phase-title" focusable="false">
      <title id="renal-phase-title">{pick(labels.diagramTitle, lang)}</title>
      <path d="M105 72H795" stroke="#79bfc6" strokeWidth="7" strokeLinecap="round"/>
      {[105,450,795].map((x,index)=><g key={x}>
        <circle cx={x} cy="72" r="22" fill={index===2?'#e8a36f':'#247785'} stroke="#fff" strokeWidth="5"/>
        <text x={x} y="132" textAnchor="middle" className={styles.phaseName}>{phases[index]}</text>
        <text x={x} y="176" textAnchor="middle" className={styles.phaseTarget}>{targets[index]}</text>
      </g>)}
      <path d="M780 40L795 72L780 104" fill="none" stroke="#79bfc6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <figcaption>{pick(labels.diagramCaption, lang)}</figcaption>
  </figure>
}

function Decision({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <div className={styles.decision}>
    <h3>{pick(labels.selfCheck, lang)}</h3>
    <p>{pick(lesson.check.question, lang)}</p>
    <fieldset><legend>{pick(labels.choose, lang)}</legend>
      {lesson.check.options.map((option,index)=><label key={index}><input type="radio" name="renal-trauma-phase-check" checked={answer===index} onChange={()=>setAnswer(index)}/><span>{pick(option,lang)}</span></label>)}
    </fieldset>
    {answer!==null?<p className={styles.feedback} role="status"><strong>{pick(answer===lesson.check.answer?labels.correct:labels.retry,lang)}</strong>{pick(answer===lesson.check.answer?lesson.check.explanation:lesson.check.retry,lang)}</p>:null}
  </div>
}

function LeakFigure({ lang }) {
  const image=lesson.figures.leak
  return <figure className={styles.figure}>
    <Image src={image.src} alt={pick(image.alt,lang)} width={image.width} height={image.height} sizes="(max-width: 700px) 100vw, 704px" />
    <figcaption><strong>{pick(labels.imageTitle,lang)}. </strong>{pick(image.caption,lang)}</figcaption>
  </figure>
}

export default function RenalTraumaPage() {
  const {lang}=useLanguage()
  const rtl=lang==='fa'
  const localizedLabels=Object.fromEntries(Object.entries(labels).map(([key,value])=>[key,Array.isArray(value)?value.map(item=>pick(item,lang)):pick(value,lang)]))
  const sections=[
    {id:'phases',label:pick(lesson.sections[0].title,lang),icon:'phases'},
    {id:'patterns',label:pick(lesson.sections[1].title,lang),icon:'pattern'},
    {id:'urine-leak',label:pick(lesson.sections[2].title,lang),icon:'leak'},
    {id:'take-home',label:localizedLabels.takeHome,icon:'summary',emphasis:true},
  ]
  const langHref=path=>lang==='de'?path:`${path}?lang=${lang}`
  const sources=[
    {id:'abdomen-p56-p57',tag:'PDF · 56–57 / printed 55–56',title:'Abdomen.pdf – Nierenverletzung / Fornixruptur',citation:pick(lesson.media,lang),scope:pick(lesson.sourceReview,lang)},
    {id:'eau-urological-trauma-2026',tag:'EAU · 2026',title:'EAU Guidelines on Urological Trauma',href:'https://uroweb.org/guidelines/urological-trauma/chapter/urogenital-trauma-guidelines',citation:pick(lesson.sections[0].implication,lang)},
    {id:'aast-renal-ois-2025',tag:'AAST · 2025',title:'Renal Trauma OIS revision – official AAST page',href:'https://www.aast.org/resources/trauma-tools/organ-injury-scale.html',citation:pick(lesson.sections[1].implication,lang)},
    {id:'aast-kidney-ois-2025-doi',tag:'J Trauma Acute Care Surg · 2025',title:'Kidney organ injury scaling: 2025 update',href:'https://doi.org/10.1097/TA.0000000000004509',citation:pick(L('Primärpublikation der AAST-Skalenrevision; für vollständige Kriterien die Originalfassung konsultieren.', 'Primary publication of the AAST scale revision; consult the original for full criteria.', 'مقالهٔ اصلی بازنگری مقیاس AAST؛ برای معیارهای کامل به متن اصلی مراجعه کنید.'),lang)},
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={pick(lesson.title,lang)} author="Dr. Zia"
    breadcrumbs={[{label:'RadYar',href:langHref('/')},{label:pick(L('Abdomen','Abdomen','شکم'),lang),href:langHref('/lernen/abdomen')},{label:pick(L('Niere','Kidney','کلیه'),lang),href:langHref('/lernen/abdomen')}]}
    sections={sections} labels={localizedLabels} renderIcon={id=><Icon id={id}/>} syncHashNavigation actions={{}}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/educational/nierentrauma/hero-v2.webp',heroImageOpacity:.92,accent:'#78d0d7',accentStrong:'#166c78',accentSoft:'#e1f3f4',secondary:'#b8a0cf',secondaryStrong:'#674c81',heroBase:'#173341'}}
    heroImageAlt={pick(L('Schematische Niere mit einer kortikalen Verletzung und kleinem Hämatom; keine diagnostische Aufnahme','Schematic kidney with a cortical injury and a small haematoma; not a diagnostic image','شماتیک کلیه با آسیب قشری و هماتوم کوچک؛ تصویر تشخیصی نیست'),lang)}
    className={styles.page} sources={<LessonSources title={localizedLabels.sources} items={sources} note={pick(lesson.sourceReview,lang)}/> }>
    <LessonSection id="phases" icon="phases" title={pick(lesson.sections[0].title,lang)}>
      <p className={styles.body}>{pick(lesson.sections[0].body,lang)}</p>
      <PhaseDiagram lang={lang}/>
      <p className={styles.note}>{pick(lesson.sections[0].implication,lang)}</p>
    </LessonSection>
    <LessonSection id="patterns" icon="pattern" title={pick(lesson.sections[1].title,lang)}>
      <p className={styles.body}>{pick(lesson.sections[1].body,lang)}</p>
      <p className={styles.note}>{pick(lesson.sections[1].implication,lang)}</p>
    </LessonSection>
    <LessonSection id="urine-leak" icon="leak" title={pick(lesson.sections[2].title,lang)}>
      <p className={styles.body}>{pick(lesson.sections[2].body,lang)}</p>
      <LeakFigure lang={lang}/>
      <p className={styles.note}>{pick(lesson.sections[2].implication,lang)}</p>
      <Decision lang={lang}/>
    </LessonSection>
    <LessonSection id="take-home" icon="summary" title={localizedLabels.takeHome}><TakeHomeList items={lesson.summary.map((detail,index)=>({title:pick(L(`Regel ${index+1}`,`Rule ${index+1}`,`قاعدهٔ ${index+1}`),lang),detail:pick(detail,lang)}))}/></LessonSection>
  </StandardLessonShell>
}
