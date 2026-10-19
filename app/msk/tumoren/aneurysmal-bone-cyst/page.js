'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { MSK_ABC_LESSON as lesson } from '@/data/mskAneurysmalBoneCystLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] ?? value?.de ?? ''
const labels = {
  path: L('Lernweg', 'Learning path', 'مسیر یادگیری'), progress: L('gelesen', 'read', 'خوانده‌شده'), continue: L('Weiterlernen', 'Continue learning', 'ادامهٔ یادگیری'),
  completeLesson: L('Ganze Lektion als gelesen markieren', 'Mark full lesson as read', 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'), lessonCompleted: L('Ganze Lektion gelesen', 'Full lesson marked as read', 'کل درس خوانده شد'),
  complete: L('Abschnitt als gelesen markieren', 'Mark section as read', 'این بخش را خواندم'), completed: L('Als gelesen markiert', 'Marked as read', 'خوانده‌شده'), open: L('Abschnitt öffnen', 'Open section', 'بازکردن بخش'), close: L('Schließen', 'Close', 'بستن'),
  takeHome: L('Drei Regeln mitnehmen', 'Three rules to remember', 'سه نکته برای یادآوری'), sources: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
}
const iconPaths = { pattern: 'M4 18h16M6 15l3-5 3 3 5-8 2 3', imaging: 'M4 5h16v14H4zM7 15l3-4 2 2 3-5 3 7', differential: 'M12 3v5m0 4v9M5 8h14M5 16h14', check: 'M4 4h16v16H4zM8 9h8m-8 4h5', summary: 'M5 5h14M5 12h14M5 19h14' }
function Icon({ id }) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[id] || iconPaths.pattern} /></svg> }
function Matrix({ rows, lang }) { return <div className={styles.tableWrap} role="region" tabIndex={0} aria-label={pick(L('Befundtabelle','Findings table','جدول یافته‌ها'),lang)}><table><caption>{pick(L('Bildmuster und Einordnung','Imaging pattern and interpretation','الگوی تصویربرداری و تفسیر'),lang)}</caption><thead><tr><th scope="col">{pick(L('Sequenz / Frage','Sequence / question','توالی / پرسش'),lang)}</th><th scope="col">{pick(L('Befund','Finding','یافته'),lang)}</th></tr></thead><tbody>{rows.map(([a,b],i)=><tr key={i}><th scope="row">{pick(a,lang)}</th><td>{pick(b,lang)}</td></tr>)}</tbody></table></div> }
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null); const c = lesson.check
  return <div className={styles.decision}><h3>{pick(c.title,lang)}</h3><p>{pick(c.prompt,lang)}</p><fieldset><legend>{pick(L('Eine Antwort auswählen','Choose one answer','یک پاسخ را انتخاب کن'),lang)}</legend>{c.options.map((o,i)=><label key={i}><input type="radio" name="abc-self-check" checked={answer===i} onChange={()=>setAnswer(i)}/><span>{pick(o,lang)}</span></label>)}</fieldset>{answer!==null?<p className={styles.feedback} role="status"><strong>{pick(answer===c.answer?L('Richtig. ','Correct. ','درست است. '):L('Noch einmal prüfen. ','Review the pattern. ','الگو را دوباره بررسی کن. '),lang)}</strong>{pick(answer===c.answer?c.explanation:c.retry,lang)}</p>:null}</div>
}

export default function AneurysmalBoneCystPage() {
  const { lang } = useLanguage(); const t = value => pick(value,lang); const translated = Object.fromEntries(Object.entries(labels).map(([key,value])=>[key,t(value)])); const langPath = path => lang==='de'?path:`${path}?lang=${lang}`
  const sections = [...lesson.sections.map(section=>({id:section.id,label:t(section.title),icon:section.icon})),{id:'check',label:t(lesson.check.title),icon:'check'},{id:'take-home',label:translated.takeHome,icon:'summary',emphasis:true}]
  const sources = lesson.sources.map(source=>({...source,tag:t(source.tag),title:t(source.title),citation:t(source.citation)}))
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="RadYar" syncHashNavigation
    heroImageAlt={t(L('Nichtdiagnostische Schemazeichnung einer expansilen Knochenzyste mit internen Septen und Flüssigkeitsspiegeln.','Non-diagnostic schematic of an expansile bone cyst with internal septa and fluid levels.','شماتیک غیرتشخیصی کیست استخوانی گسترش‌یابنده با سپتاهای داخلی و سطح مایع.'))}
    breadcrumbs={[{label:'RadYar',href:langPath('/')},{label:'MSK',href:langPath('/lernen/msk')},{label:t(lesson.title)}]}
    sections={sections} labels={translated} actions={{}} renderIcon={id=><Icon id={id}/>}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:lesson.hero,heroImageOpacity:.95,accent:'#779ba8',accentStrong:'#315b69',accentSoft:'#e6eff1',secondary:'#d29a68',secondaryStrong:'#80522f',heroBase:'#203842'}} className={styles.page}
    sources={<LessonSources title={translated.sources} items={sources} note={t(lesson.sourceNote)}/>}
  >
    {lesson.sections.map(section=><LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)} bodyClassName={styles.body}>
      <p>{t(section.lead)}</p>
      {section.points?<ul className={styles.points}>{section.points.map((point,i)=><li key={i}>{t(point)}</li>)}</ul>:null}
      {section.rows?<Matrix rows={section.rows} lang={lang}/>:null}
      {section.id==='mri'?<figure className={styles.caseFigure}><div className={styles.caseGrid}>{[
        ['t2-fat-sat',L('Axial T2 fat-sat','Axial T2 fat-sat','T2 fat-sat محوری')],['pd-fat-sat',L('PD fat-sat','PD fat-sat','PD fat-sat')],['t1',L('Koronare T1','Coronal T1','T1 کرونال')],['t1-c-plus-fat-sat',L('T1 nach Kontrastmittel, fat-sat','Post-contrast T1 fat-sat','T1 پس از مادهٔ حاجب، fat-sat')]
      ].map(([file,label])=><div className={styles.imagePanel} key={file}><img src={`/educational/aneurysmal-bone-cyst/${file}.jpg`} alt={`${t(label)} — ${t(section.imageAlt)}`} loading="lazy"/><span>{t(label)}</span></div>)}</div><figcaption>{t(section.imageCaption)}</figcaption></figure>:null}
      {section.note?<aside className={styles.note}>{t(section.note)}</aside>:null}
    </LessonSection>)}
    <LessonSection id="check" icon="check" title={t(lesson.check.title)} bodyClassName={styles.body}><SelfCheck lang={lang}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={translated.takeHome} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item,i)=><li key={i}>{t(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
