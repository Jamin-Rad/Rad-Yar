'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { CHONDROKALZINOSE_LESSON as lesson } from '@/data/chondrokalzinoseLesson'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (x, lang) => typeof x === 'string' ? x : x?.[lang] || x?.de || ''
const shellLabels = {
  path:L('Lernweg','Learning path','مسیر یادگیری'), progress:L('gelesen','read','خوانده‌شده'),
  continue:L('Weiterlernen','Continue learning','ادامهٔ یادگیری'),
  completeLesson:L('Ganze Lektion als gelesen markieren','Mark full lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted:L('Ganze Lektion gelesen','Full lesson marked as read','کل درس خوانده شد'),
  complete:L('Abschnitt als gelesen markieren','Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed:L('Als gelesen markiert','Marked as read','علامت‌گذاری شد'),
  open:L('Abschnitt öffnen','Open section','بازکردن بخش'), close:L('Schließen','Close','بستن'),
  takeHome:L('Vier Regeln mitnehmen','Four rules to remember','چهار نکته برای یادآوری'),
  sources:L('Quellen und Umfang','Sources and scope','منابع و دامنه'),
}
const UI = {
  de:{title:'Chondrokalzinose am Knie',start:'Orientierung und Lernziele',content:'Röntgen- und MRT-Muster',check:'Selbstprüfung',summary:'Vier Regeln mitnehmen',choose:'Wähle die beste Antwort.',correct:'Richtig. ',incorrect:'Noch einmal prüfen. ',scope:'Abdeckung: MSK.pdf, PDF-Seite 56 / Druckseite 55. Diese kurze Lektion behandelt die dort gezeigten meniskalen Verkalkungen und die PD-MRT-Falle; sie ist keine vollständige CPPD-Leitlinie.'},
  en:{title:'Knee chondrocalcinosis',start:'Orientation and learning goals',content:'Radiographic and MRI pattern',check:'Self-check',summary:'Four rules to remember',choose:'Choose the best answer.',correct:'Correct. ',incorrect:'Review the pattern and context again. ',scope:'Coverage: MSK.pdf, PDF p. 56 / printed p. 55. This concise lesson covers the meniscal calcification and PD MRI pitfall shown there; it is not a complete CPPD guideline.'},
  fa:{title:'کندروکلسی‌نوز زانو',start:'مرور و هدف‌های یادگیری',content:'الگوی رادیوگرافی و MRI',check:'خودآزمایی',summary:'چهار نکته برای یادآوری',choose:'بهترین پاسخ را انتخاب کنید.',correct:'درست است. ',incorrect:'الگو و زمینه را دوباره بررسی کنید. ',scope:'دامنه: MSK.pdf، صفحهٔ PDF ۵۶ / صفحهٔ چاپی ۵۵. این درس کوتاه کلسیفیکاسیون منیسک و دام MRI با توالی PD را که در آن صفحه آمده پوشش می‌دهد؛ راهنمای کامل CPPD نیست.'},
}

function Icon({ id }) {
  const paths={start:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2',content:'M4 5h16v14H4z M7 15l3-4 2 2 3-5 3 7',check:'M4 4h16v16H4z M8 9h8m-8 4h5',summary:'M5 5h14M5 12h14M5 19h14'}
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id]||paths.content}/></svg>
}

function SelfCheck({ lang, labels }) {
  const [answer,setAnswer]=useState(null)
  const correct=answer===lesson.check.answer
  return <div className={styles.decision}>
    <p>{pick(lesson.check.question,lang)}</p>
    <fieldset><legend>{labels.choose}</legend>{lesson.check.options.map((option,i)=><label key={i}><input type="radio" name="chondro-check" checked={answer===i} onChange={()=>setAnswer(i)}/><span>{pick(option,lang)}</span></label>)}</fieldset>
    {answer!==null?<p className={styles.feedback} role="status"><strong>{correct?labels.correct:labels.incorrect}</strong>{pick(correct?lesson.check.explanation:lesson.check.incorrectExplanation,lang)}</p>:null}
  </div>
}

export default function ChondrokalzinosePage() {
  const {lang='de'}=useLanguage()
  const c=x=>pick(x,lang)
  const ui=UI[lang]||UI.de
  const labels=Object.fromEntries(Object.entries(shellLabels).map(([key,value])=>[key,c(value)]))
  const sections=useMemo(()=>[
    {id:'start',label:ui.start,icon:'start'},
    {id:'content',label:ui.content,icon:'content'},
    {id:'check',label:ui.check,icon:'check'},
    {id:'take-home',label:ui.summary,icon:'summary',emphasis:true},
  ],[ui])
  const refs=[
    {tag:'MSK.pdf · PDF p. 56 / printed p. 55',title:'Source image · rID 22147',citation:c(lesson.radiograph.caption)},
    {tag:'EULAR · 2023',title:'Imaging recommendations for crystal-induced arthropathies',href:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11103298/',citation:c(L('Leitlinienquelle zur Einordnung von Röntgen, Ultraschall und klinischem Kontext.','Guideline reference for radiography, ultrasound and clinical context.','منبع راهنما برای رادیوگرافی، سونوگرافی و زمینهٔ بالینی.'))},
    {tag:'AJR · 2001;177(4):905–909 · PMID 11566703',title:'Kaushik et al. · Effect of chondrocalcinosis on the MR imaging of knee menisci',href:'https://doi.org/10.2214/ajr.177.4.1770905',citation:c(L('Primärstudie zum Einfluss der Chondrokalzinose auf die MRT-Beurteilung von Meniskusrissen.','Primary study on the effect of chondrocalcinosis on MRI assessment of meniscal tears.','مطالعهٔ اولیه دربارهٔ تأثیر کندروکلسی‌نوز بر ارزیابی پارگی منیسک در MRI.'))},
    {tag:'AJR · 2002',title:'Resnick & Kang · The Meniscus: Recent Advances in MR Imaging of the Knee',href:'https://doi.org/10.2214/ajr.179.5.1791115',citation:c(L('Übersichtsarbeit zu MRT-Signal und Meniskusrisskriterien.','Review of MRI signal and meniscal tear criteria.','مقالهٔ مروری دربارهٔ سیگنال MRI و معیارهای پارگی منیسک.'))},
  ]
  return <StandardLessonShell lessonId={lesson.id} lang={lang} title={ui.title} author="RadYar" heroImageAlt={c(lesson.alt)} syncHashNavigation
    breadcrumbs={[{label:'RadYar',href:lang==='de'?'/':'/?lang='+lang},{label:c(L('MSK','MSK','اسکلتی‌عضلانی')),href:lang==='de'?'/lernen/msk':'/lernen/msk?lang='+lang},{label:ui.title}]}
    sections={sections} labels={labels} actions={{}} renderIcon={id=><Icon id={id}/>}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/educational/chondrokalzinose-knee.svg',heroImageOpacity:.95,accent:'#67cbd8',accentStrong:'#245b69',accentSoft:'#e2f5f7',secondary:'#e4ba70',secondaryStrong:'#72521d',heroBase:'#102d39'}}
    className={styles.page} sources={<LessonSources title={labels.sources} items={refs} note={ui.scope}/>}>
    <LessonSection id="start" icon="start" title={ui.start} bodyClassName={styles.body}>
      <p>{c(lesson.intro)}</p><h3>{c(L('Lernziele','Learning goals','هدف‌های یادگیری'))}</h3><ul>{lesson.goals.map((goal,i)=><li key={i}>{c(goal)}</li>)}</ul>
    </LessonSection>
    <LessonSection id="content" icon="content" title={ui.content} bodyClassName={styles.body}>
      <h3>{c(lesson.content.xrayTitle)}</h3><p>{c(lesson.content.xray)}</p>
      <figure className={styles.figure}>
        <Image src={lesson.radiograph.src} alt={c(lesson.radiograph.alt)} width={604} height={990} sizes="(max-width: 760px) 100vw, 480px"/>
        <figcaption>{c(lesson.radiograph.caption)}</figcaption>
      </figure>
      <figure className={styles.detailFigure}>
        <Image src={lesson.radiograph.detailSrc} alt={c(L('Vergrößerter Ausschnitt des Gelenkspalts aus derselben AP-Aufnahme; die Meniskusregion ist hervorgehoben, eine einzelne Verkalkung wird nicht als sicher markiert.','Magnified joint-line crop from the same AP image; the meniscal region is highlighted, without marking an individual calcification as definite.','بزرگ‌نمایی فضای مفصلی از همان نمای AP؛ محدودهٔ منیسک برجسته شده، اما کلسیفیکاسیون مشخصی قطعی علامت‌گذاری نشده است.'))} width={980} height={420} sizes="(max-width: 760px) 100vw, 760px"/>
        <figcaption>{c(L('Vergrößerung der Meniskusregion: Sie dient der Orientierung in der Quelle; einzelne Verkalkungen sind in dieser Aufnahme nicht sicher isolierbar.','Magnified meniscal region: this helps orient the source image; individual deposits are not confidently separable on this radiograph.','بزرگ‌نمایی محدودهٔ منیسک برای جهت‌یابی در تصویر منبع است؛ رسوب منفرد در این رادیوگرافی به‌طور مطمئن قابل تفکیک نیست.'))}</figcaption>
      </figure>
      <h3>{c(lesson.content.mriTitle)}</h3><p>{c(lesson.content.mri)}</p>
      <aside className={styles.note}><strong>{c(lesson.content.caveTitle)}</strong><p>{c(lesson.content.cave)}</p></aside>
    </LessonSection>
    <LessonSection id="check" icon="check" title={ui.check} bodyClassName={styles.body}><SelfCheck lang={lang} labels={{choose:c(L('Eine Antwort auswählen','Choose one answer','یک پاسخ را انتخاب کنید')),correct:c(L('Richtig. ','Correct. ','درست است. ')),incorrect:c(L('Noch einmal prüfen. ','Review once more. ','دوباره بررسی کنید. '))}}/></LessonSection>
    <LessonSection id="take-home" icon="summary" title={ui.summary} bodyClassName={styles.body}><ol className={styles.summary}>{lesson.summary.map((item,i)=><li key={i}>{c(item)}</li>)}</ol></LessonSection>
  </StandardLessonShell>
}
