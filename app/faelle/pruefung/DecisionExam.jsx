'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import CaseStackViewer from './CaseStackViewer'
import { decisionOutcome } from '@/data/caaStoryCases.mjs'
import styles from './DecisionExam.module.css'

const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const COPY = {
  de: { back:'Fallauswahl', title:'Fallprüfung', case:'Fall', round:'Entscheidung', examiner:'Der Prüfer fragt', followUp:'Der Prüfer hakt nach', confirm:'Antwort festlegen', continue:'Weiter im Fall', follow:'Rückfrage beantworten', selected:'Ihre Antwort', saved:'Antwort gespeichert.', choose:'Wählen Sie eine Antwort, bevor Sie fortfahren.', history:'Bisherige Fallinformationen', clinical:'Klinische Ausgangslage', images:'Bildmaterial', compare:'Publizierte Vergleichsabbildung · kein vollständiger Datensatz', enlarge:'Bild vergrößern', close:'Schließen', summary:'Ihre Entscheidungen im Überblick', independent:'Selbstständig richtig', supported:'Mit Rückfrage geklärt', missed:'Noch offen', unanswered:'Nicht beantwortet', solution:'Begründung', answer:'Richtige Antwort', nextCase:'Nächster Fall', finish:'Gesamtergebnis', retry:'Erneut prüfen', result:'Prüfung abgeschlossen', timed:'Zeitprüfung', learning:'Falltraining', time:'Restzeit', expired:'Die Prüfungszeit ist abgelaufen.', observation:'Befund erkennen', investigation:'Untersuchung wählen', interpretation:'Befunde einordnen', diagnosis:'Diagnose begründen', intro:'Eine Entscheidung nach der anderen. Der Prüfer greift Ihre Auswahl auf.', original:'Bildquelle', followAnswer:'Antwort auf die Rückfrage', recorded:'Sie haben gewählt:', noImage:'Welche Untersuchung hilft jetzt weiter?', noImageText:'Das Bildmaterial erscheint, sobald es im Fall vorliegt.', supportedNote:'Rückfragen ändern die erste Wertung nicht.', completed:'Abgeschlossene Entscheidungen', newInfo:'Neue Fallinformation', noNotes:'Noch keine weiteren Befunde.' },
  en: { back:'Case selection',title:'Case examination',case:'Case',round:'Decision',examiner:'The examiner asks',followUp:'The examiner follows up',confirm:'Commit to answer',continue:'Continue case',follow:'Answer follow-up',selected:'Your answer',saved:'Answer recorded.',choose:'Choose an answer before continuing.',history:'Case information so far',clinical:'Clinical presentation',images:'Imaging',compare:'Published comparison figure · not a complete examination',enlarge:'Enlarge image',close:'Close',summary:'Your decisions at a glance',independent:'Correct independently',supported:'Resolved with follow-up',missed:'Needs review',unanswered:'Unanswered',solution:'Reasoning',answer:'Correct answer',nextCase:'Next case',finish:'Overall result',retry:'Try again',result:'Examination complete',timed:'Timed exam',learning:'Case training',time:'Time left',expired:'Examination time has elapsed.',observation:'Recognise findings',investigation:'Choose investigation',interpretation:'Interpret findings',diagnosis:'Justify diagnosis',intro:'One decision at a time. The examiner follows up on your choice.',original:'Image source',followAnswer:'Follow-up answer',recorded:'You selected:',noImage:'Which investigation helps next?',noImageText:'Imaging appears when it becomes available in the case.',supportedNote:'Follow-ups do not change the initial score.',completed:'Completed decisions',newInfo:'New case information',noNotes:'No further findings yet.' },
  fa: { back:'انتخاب کیس',title:'آزمون کیس',case:'کیس',round:'تصمیم',examiner:'پرسش ممتحن',followUp:'پرسش پیگیری ممتحن',confirm:'ثبت پاسخ',continue:'ادامهٔ کیس',follow:'پاسخ به پرسش پیگیری',selected:'پاسخ شما',saved:'پاسخ ثبت شد.',choose:'برای ادامه یک پاسخ انتخاب کنید.',history:'اطلاعات کیس تا این مرحله',clinical:'شرح‌حال اولیه',images:'تصاویر',compare:'تصویر مقایسه‌ای منتشرشده؛ جایگزین کل بررسی نیست',enlarge:'بزرگ‌نمایی تصویر',close:'بستن',summary:'مرور تصمیم‌های شما',independent:'درست و مستقل',supported:'با پرسش پیگیری حل شد',missed:'نیازمند مرور',unanswered:'بدون پاسخ',solution:'استدلال',answer:'پاسخ درست',nextCase:'کیس بعدی',finish:'نتیجهٔ کلی',retry:'تلاش دوباره',result:'آزمون تمام شد',timed:'آزمون زمان‌دار',learning:'تمرین کیس',time:'زمان باقی‌مانده',expired:'زمان آزمون تمام شد.',observation:'تشخیص یافته',investigation:'انتخاب بررسی',interpretation:'تفسیر یافته‌ها',diagnosis:'استدلال تشخیص',intro:'هر بار یک تصمیم؛ ممتحن انتخاب شما را پیگیری می‌کند.',original:'منبع تصویر',followAnswer:'پاسخ پرسش پیگیری',recorded:'انتخاب شما:',noImage:'اکنون کدام بررسی کمک می‌کند؟',noImageText:'تصاویر هنگامی که در مسیر کیس در دسترس باشند نمایش داده می‌شوند.',supportedNote:'پرسش پیگیری، امتیاز پاسخ اول را تغییر نمی‌دهد.',completed:'تصمیم‌های ثبت‌شده',newInfo:'اطلاعات جدید کیس',noNotes:'هنوز یافتهٔ دیگری ارائه نشده است.' },
}
const DOMAINS = ['observation','investigation','interpretation','diagnosis']

function Arrow() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg> }

const UPCOMING = { de:'Später', en:'Later', fa:'بعداً' }

function scene(item, question, lang) {
  const stage=item.stages[question.stage]
  return { narrative:pick(stage?.narrative || item.vignette,lang) }
}

export function DecisionReview({ item, records = {}, lang }) {
  const ui=COPY[lang] || COPY.de
  return <div className={styles.review}>
    <h2>{ui.summary}</h2>
    <div className={styles.domains}>{DOMAINS.map(domain=>{
      const questions=item.decisionExam.filter(q=>q.domain===domain)
      const correct=questions.filter(q=>decisionOutcome(q,records[q.id]?.answer)==='independent').length
      return <div key={domain}><span>{ui[domain]}</span><strong><bdi>{correct} / {questions.length}</bdi></strong></div>
    })}</div>
    {item.decisionExam.map((question,index)=>{
      const record=records[question.id] || {}
      const outcome=decisionOutcome(question,record.answer,record.followUpAnswer)
      const chosen=question.options.find(option=>option.id===record.answer)
      return <details key={question.id} className={styles.reviewRow}>
        <summary><span className={styles.number}>{String(index+1).padStart(2,'0')}</span><span>{pick(question.prompt,lang)}</span><strong data-outcome={outcome}>{ui[outcome]}</strong></summary>
        <div className={styles.reviewBody}>
          <p>{ui.selected}: {chosen ? pick(chosen.text,lang) : ui.unanswered}</p>
          <p><strong>{ui.answer}: {pick(question.options.find(option=>option.id===question.correct).text,lang)}</strong></p>
          <p>{pick(question.explanation,lang)}</p>
          {record.followUpAnswer && <><hr/><p>{pick(question.followUp.prompt,lang)}</p><p>{ui.followAnswer}: {pick(question.followUp.options.find(option=>option.id===record.followUpAnswer)?.text,lang)}</p><p>{pick(question.followUp.explanation,lang)}</p></>}
        </div>
      </details>
    })}
    <details className={styles.sources}><summary>{ui.original}</summary><p>{pick(item.scenarioNote,lang)}</p><a href={item.source} target="_blank" rel="noreferrer">{pick(item.sourceLabel,lang)}</a><p>{item.credit}</p>{item.references?.map(reference=><p key={reference.url}><a href={reference.url} target="_blank" rel="noreferrer">{reference.label}</a></p>)}</details>
  </div>
}

export default function DecisionExam({ cases, lang, timed = false, onFinish, onProgress, timeRemaining = null }) {
  const ui=COPY[lang] || COPY.de
  const [caseIndex,setCaseIndex]=useState(0)
  const [round,setRound]=useState(0)
  const [choice,setChoice]=useState(null)
  const [locked,setLocked]=useState(false)
  const [followUp,setFollowUp]=useState(false)
  const [records,setRecords]=useState({})
  const [review,setReview]=useState(false)
  const [complete,setComplete]=useState(false)
  const [seconds,setSeconds]=useState(cases.length*480)
  const heading=useRef(null)
  const item=cases[caseIndex]
  const question=item.decisionExam[round]
  const currentQuestion=followUp ? question.followUp : question
  const currentRecords=records[item.id] || {}
  const record=currentRecords[question.id] || {}
  const evidence=scene(item,question,lang)
  const stageSeries=item.stages[question.stage].series || []
  const parentTimed=timed && Number.isFinite(timeRemaining)
  const remaining=parentTimed ? timeRemaining : seconds
  const expired=timed && remaining===0
  useEffect(()=>{
    if(!timed || parentTimed || complete) return
    const deadline=Date.now()+seconds*1000
    const timer=window.setInterval(()=>setSeconds(Math.max(0,Math.ceil((deadline-Date.now())/1000))),1000)
    return ()=>window.clearInterval(timer)
  // A fixed deadline prevents timer drift when the tab is in the background.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[timed,parentTimed,complete])
  useEffect(()=>{ if(expired) { setComplete(true);setReview(true) } },[expired])
  useEffect(()=>{ heading.current?.focus({preventScroll:true}) },[round,followUp,caseIndex,review,complete])

  const confirm=()=>{
    if(!choice || locked || expired) return
    const nextRecords={...records,[item.id]:{...records[item.id],[question.id]:{...records[item.id]?.[question.id],[followUp?'followUpAnswer':'answer']:choice}}}
    setRecords(nextRecords)
    onProgress?.(nextRecords)
    setLocked(true)
  }
  const next=()=>{
    if(!locked || expired) return
    if(!followUp && record.answer!==question.correct && question.followUp){setFollowUp(true)}
    else if(round+1<item.decisionExam.length){setRound(value=>value+1);setFollowUp(false)}
    else {setReview(true)}
    setChoice(null);setLocked(false)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const advance=()=>{
    if(caseIndex+1<cases.length){setCaseIndex(value=>value+1);setRound(0);setFollowUp(false);setReview(false);setChoice(null);setLocked(false)}
    else if(onFinish){onFinish(records)}
    else {setComplete(true)}
    window.scrollTo({top:0,behavior:'instant'})
  }
  const retry=()=>{setCaseIndex(0);setRound(0);setChoice(null);setLocked(false);setFollowUp(false);setRecords({});setReview(false);setComplete(false);setSeconds(cases.length*480)}
  const backHref=lang==='de'?'/faelle':`/faelle?lang=${lang}`
  return <main className={styles.page} dir={lang==='fa'?'rtl':'ltr'} lang={lang}>
    <header className={styles.topbar}><Link href={backHref}>{ui.back}</Link><span>{ui.title} <bdi>{String(caseIndex+1).padStart(2,'0')} / {String(cases.length).padStart(2,'0')}</bdi></span><span className={styles.mode}>{timed ? <>{ui.time} <bdi>{Math.floor(remaining/60)}:{String(remaining%60).padStart(2,'0')}</bdi></> : ui.learning}</span></header>
    {(review || complete) ? <section className={styles.result}>
      <p className={styles.eyebrow}>{complete?ui.result:ui.case+' '+(caseIndex+1)}</p>
      <h1 ref={heading} tabIndex={-1}>{complete?ui.result:pick(item.title,lang)}</h1>
      {expired && <p role="status">{ui.expired}</p>}
      {(complete?cases:[item]).map(reviewItem=><section key={reviewItem.id} className={styles.caseReview}>{complete && <h2>{pick(reviewItem.title,lang)}</h2>}<DecisionReview item={reviewItem} records={records[reviewItem.id]} lang={lang}/></section>)}
      <div className={styles.resultActions}>{!complete && <button type="button" className={styles.primary} onClick={advance}>{caseIndex+1<cases.length?ui.nextCase:ui.finish}<Arrow/></button>}{complete && onFinish && <button type="button" className={styles.primary} onClick={()=>onFinish(records)}>{ui.finish}<Arrow/></button>}{complete && <button type="button" className={styles.primary} onClick={retry}>{ui.retry}</button>}<Link href={backHref}>{ui.back}</Link></div>
    </section> : <>
      <div className={styles.heading}><div><p className={styles.eyebrow}>{ui.case} <bdi>{String(caseIndex+1).padStart(2,'0')}</bdi></p><h1>{pick(item.title,lang)}</h1></div><p className={styles.round}>{ui.round} <bdi>{round+1} / {item.decisionExam.length}</bdi></p></div>
      <ol className={styles.progress} aria-label={ui.completed}>{item.decisionExam.map((q,index)=><li key={q.id} data-state={index<round?'done':index===round?'current':'waiting'} aria-current={index===round?'step':undefined}><span>{index+1}</span><strong>{index>round ? (UPCOMING[lang] || UPCOMING.de) : pick(item.stages[q.stage].shortTitle,lang)}</strong></li>)}</ol>
      <div className={styles.layout}>
        <aside className={styles.evidence} aria-label={ui.images}>
          {stageSeries.length>0 ? <CaseStackViewer key={`${item.id}:${question.stage}`} series={stageSeries} lang={lang} credit={item.credit}/> : <div className={styles.clinical}><span className={styles.eyebrow}>{ui.clinical}</span><p>{pick(item.vignette,lang)}</p></div>}
          <details className={styles.caseFile}><summary>{ui.history}</summary>{[...new Set(item.decisionExam.slice(0,round).map(q=>scene(item,q,lang).narrative))].map((text,index)=><p key={index}>{text}</p>)}{round===0 && <p>{ui.noNotes}</p>}<p className={styles.muted}>{pick(item.scenarioNote,lang)}</p></details>
        </aside>
        <section className={styles.questionPanel} aria-label={ui.examiner}>
          <section className={styles.newInformation}><h2>{pick(item.stages[question.stage].title,lang)}</h2><p>{evidence.narrative}</p></section>
          {followUp && <p className={styles.previousChoice}>{ui.recorded} „{pick(question.options.find(option=>option.id===record.answer)?.text,lang)}“</p>}
          <h2 ref={heading} tabIndex={-1} className={styles.question}>{pick(currentQuestion.prompt,lang)}</h2>
          <div className={styles.options} role="group" aria-label={pick(currentQuestion.prompt,lang)}>{currentQuestion.options.map(option=><button key={option.id} type="button" className={styles.option} aria-pressed={choice===option.id} disabled={locked} onClick={()=>setChoice(option.id)}><span className={styles.optionLetter}>{option.id}</span><span>{pick(option.text,lang)}</span></button>)}</div>
          <div className={styles.actions}>{!locked ? <button type="button" className={styles.primary} onClick={confirm} disabled={!choice}>{ui.confirm}<Arrow/></button> : <><p role="status" className={styles.saved}>{ui.saved}</p>{!timed && <section className={styles.feedback} aria-label={ui.solution} data-correct={choice===currentQuestion.correct}><h3>{choice===currentQuestion.correct ? (lang==='fa'?'پاسخ درست است':lang==='en'?'Correct':'Richtig') : (lang==='fa'?'پاسخ درست':lang==='en'?'Correct answer':'Richtige Antwort')}{choice!==currentQuestion.correct && <>: {currentQuestion.correct}</>}</h3>{choice!==currentQuestion.correct && <p><strong>{pick(currentQuestion.options.find(option=>option.id===currentQuestion.correct).text,lang)}</strong></p>}<p>{pick(currentQuestion.explanation,lang)}</p></section>}<button type="button" className={styles.primary} onClick={next}>{round+1===item.decisionExam.length?ui.summary:ui.continue}<Arrow/></button></>}</div>
        </section>
      </div>
    </>}
  </main>
}
