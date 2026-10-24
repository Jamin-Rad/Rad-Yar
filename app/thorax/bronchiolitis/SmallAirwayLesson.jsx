'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import styles from './page.module.css'
const L=(de,en,fa)=>({de,en,fa})
const labels={contents:L('Lektionsinhalt','Lesson contents','محتوای درس'),path:L('Lernpfad','Learning path','مسیر یادگیری'),progress:L('gelesen','read','خوانده‌شده'),continue:L('Lektion fortsetzen','Continue lesson','ادامهٔ درس'),completeLesson:L('Ganze Lektion als gelesen markieren','Mark whole lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),lessonCompleted:L('Ganze Lektion gelesen','Whole lesson read','کل درس خوانده شد'),complete:L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'),completed:L('Als gelesen markiert','Marked as read','خوانده‌شده'),open:L('Abschnitt öffnen','Open section','بازکردن بخش'),close:L('Schließen','Close','بستن'),chapter:L('Thorax','Thorax','قفسهٔ سینه'),sources:L('Quellen','Sources','منابع'),practice:L('Wissen prüfen','Check your knowledge','دانش خود را بسنجید'),cards:L('Karteikarten','Flashcards','فلش‌کارت‌ها'),source:L('Thorax.pdf · S. 19 (gedruckt 18) · Radiopaedia rID','Thorax.pdf · p. 19 (printed 18) · Radiopaedia rID','Thorax.pdf · صفحهٔ ۱۹ (چاپی ۱۸) · Radiopaedia rID'),pattern:L('Beobachtung','Observation','مشاهده'),meaning:L('Einordnung','Interpretation','تفسیر'),check:L('Kurz prüfen','Quick check','خودآزمایی کوتاه')}
function Icon({name}) {
 const paths={airway:'M12 3v9m0 0L5 19m7-7 7 7M8 16l-4-1m12 1 4-1',branch:'M12 21V11m0 0L5 5m7 6 7-6M5 5v4m0-4h4m10 0h-4m4 0v4',layers:'m3 7 9-4 9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4',scope:'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5M8 12h8m-4-4v8',summary:'M5 6h14M5 12h14M5 18h14'}
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.airway}/></svg>
}
function Check({item,lang,lessonId}) {
 const [choice,setChoice]=useState(null),id=`${lessonId}-${item.slug}-check`
 return <div className={styles.check}><h3>{labels.check[lang]}</h3><p id={id}>{item.question[lang]}</p><div className={styles.options} role="group" aria-labelledby={id}>{item.options.map((option,i)=><button type="button" key={i} aria-pressed={choice===i} onClick={()=>setChoice(i)}><b dir="ltr">{'ABCD'[i]}.</b><span>{option[lang]}</span></button>)}</div><p role="status" aria-live="polite" className={choice!==null?styles.feedback:undefined}>{choice!==null?item.feedback[choice][lang]:''}</p></div>
}
function HpPatternDiagram({lang}) {
 const text={title:L('Dichte und Atemphase unterscheiden','Distinguish attenuation and respiratory phase','تمایز دانسیته و فاز تنفسی'),normal:L('Normal','Normal','طبیعی'),ggo:L('Milchglas','Ground glass','شیشه‌مات'),low:L('Verminderte Dichte','Low attenuation','دانسیتهٔ کاهش‌یافته'),inspiration:L('Inspiration','Inspiration','دم'),expiration:L('Exspiration','Expiration','بازدم'),expected:L('Obere Reihe: normal — kleiner und dichter','Upper row: normal — smaller and denser','ردیف بالا: طبیعی — کوچک‌تر و متراکم‌تر'),trapped:L('Untere Reihe: Air-Trapping — unzureichende Änderung','Lower row: air trapping — insufficient change','ردیف پایین: حبس هوا — تغییر ناکافی'),note:L('Schematische Lobuli, kein CT und keine Messskala. Oben: drei gleichzeitig sichtbare Dichten in Inspiration. Unten: normale Exspirationsreaktion gegenüber Luftretention; Air-Trapping lässt sich erst durch die Atemphasen beurteilen.','Schematic lobules, not CT or a measurement scale. Above: three coexisting attenuations on inspiration. Below: normal expiratory response versus retained air; air trapping requires assessment of respiratory phases.','لوبول‌های شماتیک؛ CT یا مقیاس اندازه‌گیری نیست. بالا: سه دانسیتهٔ هم‌زمان در دم. پایین: پاسخ طبیعی بازدم در برابر باقی‌ماندن هوا؛ ارزیابی حبس هوا به بررسی فازهای تنفسی نیاز دارد.')}
 const t=k=>text[k][lang]
 const lobule=(x,y,size,fill,smallVessel=false)=><g><path d={`M${x+size*.2} ${y}h${size*.6}l${size*.2} ${size*.5}-${size*.2} ${size*.5}h-${size*.6}l-${size*.2}-${size*.5}Z`} fill={fill} stroke="#839198" strokeWidth="2"/><path d={`M${x+size*.5} ${y+size*.18}v${size*.5}m0-${size*.3}-${size*.2} ${size*.22}m${size*.2}-${size*.22} ${size*.2} ${size*.22}`} fill="none" stroke="#f4f4f2" strokeWidth={smallVessel?2:5}/></g>
 return <figure className={styles.diagram}><h3>{t('title')}</h3><div className={styles.diagramLabels}><b>{t('normal')}</b><b>{t('ggo')}</b><b>{t('low')}</b></div><svg viewBox="0 0 480 132" aria-hidden="true">{lobule(30,10,110,'#747d82')}{lobule(185,10,110,'#cbd0d2')}{lobule(340,10,110,'#263036',true)}</svg>
 <div className={styles.phaseLabels}><span>{t('inspiration')}</span><span>{t('expiration')}</span></div><svg viewBox="0 0 480 250" aria-hidden="true">{lobule(55,12,100,'#747d82')}<path d="M205 62h70m-12-9 12 9-12 9" fill="none" stroke="currentColor" strokeWidth="3"/>{lobule(335,27,70,'#bcc4c8')}{lobule(55,138,100,'#263036',true)}<path d="M205 188h70m-12-9 12 9-12 9" fill="none" stroke="currentColor" strokeWidth="3"/>{lobule(320,138,100,'#263036',true)}</svg><ul><li>{t('expected')}</li><li>{t('trapped')}</li></ul><figcaption>{t('note')}</figcaption></figure>
}
export default function SmallAirwayLesson({lesson}) {
 const {lang}=useLanguage(),t=value=>value?.[lang]||value?.de||value
 const local=path=>`${path}${path.includes('?')?'&':'?'}lang=${lang}`
 const returnTo=local(lesson.path)
 const sections=lesson.chapters.map(c=>({...c,label:t(c.title)}))
 return <StandardLessonShell lessonId={lesson.id} lang={lang} title={t(lesson.title)} author="Dr. Zia" syncHashNavigation
 breadcrumbs={[{label:'RadYar',href:local('/')},{label:t(labels.chapter),href:local('/lernen/thorax')},{label:t(lesson.title)}]} sections={sections} labels={Object.fromEntries(Object.entries(labels).map(([k,v])=>[k,t(v)]))} renderIcon={name=><Icon name={name}/>}
 actions={{mcq:{label:t(labels.practice),href:local(`/ueben/quiz?fach=thorax&n=2&themen=${lesson.id}&from=${encodeURIComponent(returnTo)}`)},flashcards:{label:t(labels.cards),href:local(`/flashcards/${lesson.id}?from=${encodeURIComponent(returnTo)}`)}}}
 theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:lesson.hero,heroImageOpacity:.64,accent:'#477e85',accentStrong:'#285a64',accentSoft:'#e6f1f3',secondary:'#a17b96',secondaryStrong:'#69566d',heroBase:'#142a37'}} heroImageAlt={t(lesson.heroAlt)} className={styles.page}
 sources={<LessonSources title={t(labels.sources)} note={t(lesson.scope)} items={lesson.sources.map(s=>({...s,tag:'Thorax'}))}/> }>
 <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>{lesson.chapters.map(section=><LessonSection key={section.id} id={section.id} icon={section.icon} title={t(section.title)}>
 {section.paragraphs?.map((p,i)=><p key={i}>{t(p)}</p>)}
 {section.image&&<figure className={styles.figure}><Image src={section.image.src} alt={t(section.image.alt)} width={section.image.width} height={section.image.height} sizes="(max-width: 700px) 90vw, 560px"/><figcaption>{t(section.image.caption)}<a href={`https://radiopaedia.org/cases/${section.image.rid}`} target="_blank" rel="noopener noreferrer">{t(labels.source)} {section.image.rid}</a></figcaption></figure>}
 {section.rows&&<div className={styles.tableWrap} role="region" aria-label={t(section.title)} tabIndex={0}><table><thead><tr><th>{t(labels.pattern)}</th><th>{t(labels.meaning)}</th></tr></thead><tbody>{section.rows.map((row,i)=><tr key={i}><th scope="row">{t(row[0])}</th><td>{t(row[1])}</td></tr>)}</tbody></table></div>}
 {section.cave&&<aside className={styles.cave}>{t(section.cave)}</aside>}
 {lesson.id==='hypersensitivitaetspneumonitis' && section.id==='fibrose-air-trapping' && <HpPatternDiagram lang={lang}/>}
 {section.checks?.map(i=><Check key={`${lang}-${i}`} item={lesson.checks[i]} lang={lang} lessonId={lesson.id}/>)}
 {section.takeaways&&<TakeHomeList items={section.takeaways.map(item=>({title:t(item.title),detail:t(item.detail)}))}/>}
 </LessonSection>)}</div>
 </StandardLessonShell>
}
