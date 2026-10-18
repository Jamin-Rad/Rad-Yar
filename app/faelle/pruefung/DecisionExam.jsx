'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import CaseStackViewer from './CaseStackViewer'
import { decisionOutcome } from '@/data/caaStoryCases.mjs'
import styles from './DecisionExam.module.css'

const pick = (value, lang) => typeof value === 'string' ? value : value?.[lang] || value?.de || ''
const COPY = {
  de: { back:'Fallauswahl', title:'Fallprüfung', case:'Fall', round:'Entscheidung', examiner:'Der Prüfer fragt', followUp:'Der Prüfer hakt nach', confirm:'Antwort festlegen', continue:'Weiter im Fall', follow:'Rückfrage beantworten', selected:'Ihre Antwort', saved:'Antwort gespeichert.', choose:'Wählen Sie eine Antwort, bevor Sie fortfahren.', clinical:'Klinische Ausgangslage', images:'Bildmaterial', compare:'Publizierte Vergleichsabbildung · kein vollständiger Datensatz', enlarge:'Bild vergrößern', close:'Schließen', summary:'Ihre Entscheidungen im Überblick', independent:'Selbstständig richtig', supported:'Mit Rückfrage geklärt', missed:'Noch offen', unanswered:'Nicht beantwortet', solution:'Begründung', answer:'Richtige Antwort', nextCase:'Nächster Fall', finish:'Gesamtergebnis', retry:'Erneut prüfen', repeatCase:'Diesen Fall wiederholen', result:'Prüfung abgeschlossen', timed:'Zeitprüfung', learning:'Falltraining', time:'Restzeit', expired:'Die Prüfungszeit ist abgelaufen.', observation:'Befund erkennen', investigation:'Untersuchung wählen', interpretation:'Befunde einordnen', diagnosis:'Diagnose begründen', intro:'Eine Entscheidung nach der anderen. Der Prüfer greift Ihre Auswahl auf.', original:'Bildquelle', followAnswer:'Antwort auf die Rückfrage', recorded:'Sie haben gewählt:', noImage:'Welche Untersuchung hilft jetzt weiter?', noImageText:'Das Bildmaterial erscheint, sobald es im Fall vorliegt.', supportedNote:'Rückfragen ändern die erste Wertung nicht.', completed:'Abgeschlossene Entscheidungen', newInfo:'Neue Fallinformation', noNotes:'Noch keine weiteren Befunde.', casePicker:'Fall auswählen', casePickerHint:'Wählen Sie einen der drei CAA-Fälle. Ihr Bearbeitungsstand wird gespeichert.', caseList:'Zur Fallübersicht', openCase:'Fall öffnen', resumeCase:'Fall fortsetzen', reviewCase:'Fall ansehen', caseDone:'Abgeschlossen · gespeichert', caseStarted:'In Bearbeitung · gespeichert', caseNotStarted:'Noch nicht begonnen' },
  en: { back:'Case selection',title:'Case examination',case:'Case',round:'Decision',examiner:'The examiner asks',followUp:'The examiner follows up',confirm:'Commit to answer',continue:'Continue case',follow:'Answer follow-up',selected:'Your answer',saved:'Answer recorded.',choose:'Choose an answer before continuing.',clinical:'Clinical presentation',images:'Imaging',compare:'Published comparison figure · not a complete examination',enlarge:'Enlarge image',close:'Close',summary:'Your decisions at a glance',independent:'Correct independently',supported:'Resolved with follow-up',missed:'Needs review',unanswered:'Unanswered',solution:'Reasoning',answer:'Correct answer',nextCase:'Next case',finish:'Overall result',retry:'Try again',repeatCase:'Repeat this case',result:'Examination complete',timed:'Timed exam',learning:'Case training',time:'Time left',expired:'Examination time has elapsed.',observation:'Recognise findings',investigation:'Choose investigation',interpretation:'Interpret findings',diagnosis:'Justify diagnosis',intro:'One decision at a time. The examiner follows up on your choice.',original:'Image source',followAnswer:'Follow-up answer',recorded:'You selected:',noImage:'Which investigation helps next?',noImageText:'Imaging appears when it becomes available in the case.',supportedNote:'Follow-ups do not change the initial score.',completed:'Completed decisions',newInfo:'New case information',noNotes:'No further findings yet.',casePicker:'Choose a case',casePickerHint:'Select one of the three CAA cases. Your progress is saved.',caseList:'Case overview',openCase:'Open case',resumeCase:'Resume case',reviewCase:'Review case',caseDone:'Completed · saved',caseStarted:'In progress · saved',caseNotStarted:'Not started' },
  fa: { back:'بازگشت به انتخاب کیس',title:'آزمون کیس',case:'کیس',round:'تصمیم',examiner:'پرسش ممتحن',followUp:'پرسش پیگیری ممتحن',confirm:'ثبت پاسخ',continue:'ادامهٔ کیس',follow:'پاسخ به پرسش پیگیری',selected:'پاسخ شما',saved:'پاسخ ثبت شد.',choose:'برای ادامه یک پاسخ انتخاب کنید.',clinical:'شرح‌حال اولیه',images:'تصاویر',compare:'تصویر مقایسه‌ای منتشرشده؛ جایگزین کل بررسی نیست',enlarge:'بزرگ‌نمایی تصویر',close:'بستن',summary:'مرور تصمیم‌های شما',independent:'درست و مستقل',supported:'با پرسش پیگیری حل شد',missed:'نیازمند مرور',unanswered:'بدون پاسخ',solution:'استدلال',answer:'پاسخ درست',nextCase:'کیس بعدی',finish:'نتیجهٔ کلی',retry:'تلاش دوباره',repeatCase:'تکرار همین کیس',result:'آزمون تمام شد',timed:'آزمون زمان‌دار',learning:'تمرین کیس',time:'زمان باقی‌مانده',expired:'زمان آزمون تمام شد.',observation:'تشخیص یافته',investigation:'انتخاب بررسی',interpretation:'تفسیر یافته‌ها',diagnosis:'استدلال تشخیص',intro:'هر بار یک تصمیم؛ ممتحن انتخاب شما را پیگیری می‌کند.',original:'منبع تصویر',followAnswer:'پاسخ پرسش پیگیری',recorded:'انتخاب شما:',noImage:'اکنون کدام بررسی کمک می‌کند؟',noImageText:'تصاویر هنگامی که در مسیر کیس در دسترس باشند نمایش داده می‌شوند.',supportedNote:'پرسش پیگیری، امتیاز پاسخ اول را تغییر نمی‌دهد.',completed:'تصمیم‌های ثبت‌شده',newInfo:'اطلاعات جدید کیس',noNotes:'هنوز یافتهٔ دیگری ارائه نشده است.',casePicker:'انتخاب کیس',casePickerHint:'یکی از سه کیس CAA را انتخاب کنید. وضعیت پیشرفت شما ذخیره می‌شود.',caseList:'بازگشت به فهرست کیس‌ها',openCase:'ورود به کیس',resumeCase:'ادامهٔ کیس',reviewCase:'مرور کیس',caseDone:'کامل شده · ذخیره‌شده',caseStarted:'در حال انجام · ذخیره‌شده',caseNotStarted:'شروع نشده' },
}
const DOMAINS = ['observation','investigation','interpretation','diagnosis']
const STORAGE_VERSION = 'v1'

function validRecords(saved, cases) {
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {}
  return Object.fromEntries(cases.flatMap(item => {
    const caseRecord=saved[item.id]
    if (!caseRecord || typeof caseRecord !== 'object') return []
    const questions=Object.fromEntries(item.decisionExam.flatMap(question => {
      const record=caseRecord[question.id]
      if (!record || typeof record !== 'object') return []
      const answer=question.options.some(option=>option.id===record.answer) ? record.answer : undefined
      const followUpAnswer=question.followUp?.options.some(option=>option.id===record.followUpAnswer) ? record.followUpAnswer : undefined
      return answer || followUpAnswer ? [[question.id,{...(answer?{answer}:{}),...(followUpAnswer?{followUpAnswer}:{})}]] : []
    }))
    return Object.keys(questions).length ? [[item.id,questions]] : []
  }))
}

function Arrow() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg> }

function scene(item, question, lang) {
  const stage=item.stages[question.stage]
  return { narrative:pick(stage?.narrative || item.vignette,lang) }
}

export function DecisionReview({ item, records = {}, lang }) {
  const ui=COPY[lang] || COPY.de
  const domains=DOMAINS.filter(domain=>item.decisionExam.some(q=>q.domain===domain))
  return <div className={styles.review}>
    <h2>{ui.summary}</h2>
    <div className={styles.domains} style={{'--domain-count':domains.length}}>{domains.map(domain=>{
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
  const [caseSelected,setCaseSelected]=useState(cases.length<=1)
  const [round,setRound]=useState(0)
  const [choice,setChoice]=useState(null)
  const [locked,setLocked]=useState(false)
  const [followUp,setFollowUp]=useState(false)
  const [records,setRecords]=useState({})
  const [review,setReview]=useState(false)
  const [complete,setComplete]=useState(false)
  const [seconds,setSeconds]=useState(cases.length*480)
  const [restored,setRestored]=useState(false)
  const heading=useRef(null)
  const storageKey=`radyar:caa-decision-exam:${STORAGE_VERSION}:${timed?'timed':'learning'}:${cases.map(entry=>entry.id).sort().join(',')}`
  const item=cases[caseIndex]
  const question=item.decisionExam[round]
  const currentQuestion=followUp ? question.followUp : question
  const currentRecords=records[item.id] || {}
  const record=currentRecords[question.id] || {}
  const evidence=scene(item,question,lang)
  const stageSeries=item.stages[question.stage].series || []
  const hasEvidenceColumn=stageSeries.length>0
  const parentTimed=timed && Number.isFinite(timeRemaining)
  const remaining=parentTimed ? timeRemaining : seconds
  const expired=timed && remaining===0
  useEffect(()=>{
    try {
      const saved=JSON.parse(window.localStorage.getItem(storageKey) || 'null')
      if(saved?.version===1) {
        const restoredRecords=validRecords(saved.records,cases)
        setRecords(restoredRecords)
        const restoredCase=cases.findIndex(entry=>entry.id===saved.caseId)
        const nextCaseIndex=restoredCase>=0?restoredCase:0
        const targetCase=cases[nextCaseIndex]
        const restoredRound=targetCase.decisionExam.findIndex(entry=>entry.id===saved.questionId)
        const nextRound=restoredRound>=0?restoredRound:0
        const targetQuestion=targetCase.decisionExam[nextRound]
        const targetRecord=restoredRecords[targetCase.id]?.[targetQuestion.id]
        const restoreFollowUp=Boolean(saved.followUp && targetQuestion.followUp && targetRecord?.answer && targetRecord.answer!==targetQuestion.correct)
        setCaseIndex(nextCaseIndex)
        setRound(nextRound)
        setFollowUp(restoreFollowUp)
        const restoredChoice=restoreFollowUp ? targetRecord?.followUpAnswer : targetRecord?.answer
        setChoice(restoredChoice || null)
        setLocked(Boolean(restoredChoice))
      }
    } catch {}
    setRestored(true)
  },[storageKey,cases])
  useEffect(()=>{
    if(!restored) return
    try {
      window.localStorage.setItem(storageKey,JSON.stringify({version:1,records,caseId:item.id,questionId:question.id,followUp}))
    } catch {}
  },[storageKey,records,caseIndex,round,followUp,restored,item.id,question.id])
  useEffect(()=>{
    if(!timed || parentTimed || complete || !caseSelected) return
    const deadline=Date.now()+seconds*1000
    const timer=window.setInterval(()=>setSeconds(Math.max(0,Math.ceil((deadline-Date.now())/1000))),1000)
    return ()=>window.clearInterval(timer)
  // A fixed deadline prevents timer drift when the tab is in the background.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[timed,parentTimed,complete,caseSelected])
  useEffect(()=>{ if(expired) { setComplete(true);setReview(true) } },[expired])
  useEffect(()=>{ heading.current?.focus({preventScroll:true}) },[round,followUp,caseIndex,review,complete])

  const confirm=()=>{
    if(!choice || locked || expired) return
    const nextRecords={...records,[item.id]:{...records[item.id],[question.id]:{...records[item.id]?.[question.id],[followUp?'followUpAnswer':'answer']:choice}}}
    setRecords(nextRecords)
    onProgress?.(nextRecords)
    setLocked(true)
  }
  const goToQuestion=(index)=>{
    const target=item.decisionExam[index]
    if(!target) return
    const saved=currentRecords[target.id] || {}
    setRound(index);setFollowUp(false);setChoice(saved.answer || null);setLocked(Boolean(saved.answer));setReview(false)
  }
  const openCase=(index)=>{
    const targetCase=cases[index]
    if(!targetCase) return
    const targetRecords=records[targetCase.id] || {}
    const firstPending=targetCase.decisionExam.findIndex(entry=>{
      const saved=targetRecords[entry.id]
      return !saved?.answer || (entry.followUp && saved.answer!==entry.correct && !saved.followUpAnswer)
    })
    const targetRound=firstPending<0?targetCase.decisionExam.length-1:firstPending
    const targetQuestion=targetCase.decisionExam[targetRound]
    const targetRecord=targetRecords[targetQuestion.id] || {}
    const isFinished=firstPending<0
    setCaseIndex(index);setRound(targetRound);setFollowUp(false);setChoice(targetRecord.answer || null);setLocked(Boolean(targetRecord.answer))
    setReview(isFinished);setComplete(false);setCaseSelected(true)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const showCaseList=()=>{
    setCaseSelected(false);setReview(false);setComplete(false)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const next=()=>{
    if(!locked || expired) return
    if(!followUp && record.answer!==question.correct && question.followUp){
      if(record.followUpAnswer){setFollowUp(true);setChoice(record.followUpAnswer);setLocked(true)}
      else {setFollowUp(true);setChoice(null);setLocked(false)}
    }
    else if(round+1<item.decisionExam.length){goToQuestion(round+1)}
    else {setReview(true)}
    window.scrollTo({top:0,behavior:'instant'})
  }
  const advance=()=>{
    if(cases.length>1){showCaseList();return}
    if(caseIndex+1<cases.length){
      const nextCaseIndex=caseIndex+1
      const nextItem=cases[nextCaseIndex]
      const nextQuestion=nextItem.decisionExam[0]
      const savedAnswer=records[nextItem.id]?.[nextQuestion.id]?.answer
      setCaseIndex(nextCaseIndex);setRound(0);setFollowUp(false);setReview(false);setChoice(savedAnswer || null);setLocked(Boolean(savedAnswer))
    }
    else if(onFinish){onFinish(records)}
    else {setComplete(true)}
    window.scrollTo({top:0,behavior:'instant'})
  }
  const retry=()=>{setCaseIndex(0);setRound(0);setChoice(null);setLocked(false);setFollowUp(false);setRecords({});setReview(false);setComplete(false);setCaseSelected(cases.length<=1);setSeconds(cases.length*480)}
  const repeatCurrentCase=()=>{
    const nextRecords={...records}
    delete nextRecords[item.id]
    setRecords(nextRecords)
    onProgress?.(nextRecords)
    setRound(0);setChoice(null);setLocked(false);setFollowUp(false);setReview(false);setComplete(false);setCaseSelected(true)
    if(!parentTimed) setSeconds(cases.length*480)
    window.scrollTo({top:0,behavior:'instant'})
  }
  const backHref=lang==='de'?'/faelle':`/faelle?lang=${lang}`
  return <main className={styles.page} dir={lang==='fa'?'rtl':'ltr'} lang={lang}>
    <header className={styles.topbar}><Link href={backHref}>{ui.back}</Link><span>{ui.title} {caseSelected && cases.length>1 && <bdi>{String(caseIndex+1).padStart(2,'0')} / {String(cases.length).padStart(2,'0')}</bdi>}</span><span className={styles.mode}>{timed ? <>{ui.time} <bdi>{Math.floor(remaining/60)}:{String(remaining%60).padStart(2,'0')}</bdi></> : ui.learning}</span>{caseSelected && cases.length>1 && <button type="button" className={styles.caseListButton} onClick={showCaseList}>{ui.caseList}</button>}</header>
    {!caseSelected ? <section className={styles.casePicker}>
      <div className={styles.heading}><div><p className={styles.eyebrow}>{ui.title}</p><h1>{ui.casePicker}</h1><p className={styles.casePickerHint}>{ui.casePickerHint}</p></div><p className={styles.round}><bdi>{cases.length}</bdi> {lang==='fa'?'کیس':lang==='en'?'cases':'Fälle'}</p></div>
      <div className={styles.casePickerGrid}>{cases.map((caseItem,index)=>{
        const saved=records[caseItem.id] || {}
        const completedCount=caseItem.decisionExam.filter(entry=>{
          const answer=saved[entry.id]
          return Boolean(answer?.answer) && (!entry.followUp || answer.answer===entry.correct || Boolean(answer.followUpAnswer))
        }).length
        const started=caseItem.decisionExam.some(entry=>Boolean(saved[entry.id]?.answer))
        const finished=completedCount===caseItem.decisionExam.length
        const status=finished?ui.caseDone:started?ui.caseStarted:ui.caseNotStarted
        return <button type="button" key={caseItem.id} className={styles.caseCard} data-finished={finished} data-started={started} onClick={()=>openCase(index)}>
          <span className={styles.caseCardNumber}>{ui.case} <bdi>{String(index+1).padStart(2,'0')}</bdi></span>
          <strong>{pick(caseItem.title,lang)}</strong>
          <span className={styles.caseCardProgress}><span>{completedCount} / {caseItem.decisionExam.length}</span> {ui.completed}</span>
          <span className={styles.caseCardStatus}>{status}</span>
          <span className={styles.caseCardAction}>{finished?ui.reviewCase:started?ui.resumeCase:ui.openCase}<Arrow/></span>
        </button>
      })}</div>
    </section> : (review || complete) ? <section className={styles.result}>
      <p className={styles.eyebrow}>{complete?ui.result:ui.case+' '+(caseIndex+1)}</p>
      <h1 ref={heading} tabIndex={-1}>{complete?ui.result:pick(item.title,lang)}</h1>
      {expired && <p role="status">{ui.expired}</p>}
      {(complete?cases:[item]).map(reviewItem=><section key={reviewItem.id} className={styles.caseReview}>{complete && <h2>{pick(reviewItem.title,lang)}</h2>}<DecisionReview item={reviewItem} records={records[reviewItem.id]} lang={lang}/></section>)}
      <div className={styles.resultActions}>{!complete && <button type="button" className={styles.primary} onClick={advance}>{cases.length>1?ui.caseList:caseIndex+1<cases.length?ui.nextCase:ui.finish}<Arrow/></button>}{!complete && <button type="button" className={styles.repeatCaseButton} onClick={repeatCurrentCase}>{ui.repeatCase}<Arrow/></button>}{complete && onFinish && <button type="button" className={styles.primary} onClick={()=>onFinish(records)}>{ui.finish}<Arrow/></button>}{complete && <button type="button" className={styles.primary} onClick={retry}>{ui.retry}</button>}<Link href={backHref}>{ui.back}</Link></div>
    </section> : <>
      <div className={styles.heading}><div><p className={styles.eyebrow}>{ui.case} <bdi>{String(caseIndex+1).padStart(2,'0')}</bdi></p><h1>{pick(item.title,lang)}</h1></div><p className={styles.round}>{ui.round} <bdi>{round+1} / {item.decisionExam.length}</bdi></p></div>
      <div className={[styles.layout,!hasEvidenceColumn && styles.textOnlyLayout].filter(Boolean).join(' ')}>
        {hasEvidenceColumn && <aside className={styles.evidence} aria-label={ui.images}>
          <CaseStackViewer key={`${item.id}:${question.stage}`} series={stageSeries} lang={lang} credit={item.credit}/>
        </aside>}
        <section className={styles.questionPanel} aria-label={ui.examiner}>
          <section className={styles.newInformation}><h2>{pick(item.stages[question.stage].title,lang)}</h2><p>{evidence.narrative}</p></section>
          {followUp && <p className={styles.previousChoice}>{ui.recorded} „{pick(question.options.find(option=>option.id===record.answer)?.text,lang)}“</p>}
          <h2 ref={heading} tabIndex={-1} className={styles.question}>{pick(currentQuestion.prompt,lang)}</h2>
          <div className={styles.options} role="group" aria-label={pick(currentQuestion.prompt,lang)}>{currentQuestion.options.map(option=>{
            const isCorrect=locked && option.id===currentQuestion.correct
            const isWrong=locked && choice===option.id && option.id!==currentQuestion.correct
            const optionClass=[styles.option,isCorrect&&styles.optionCorrect,isWrong&&styles.optionWrong].filter(Boolean).join(' ')
            return <button key={option.id} type="button" className={optionClass} aria-pressed={choice===option.id} disabled={locked} onClick={()=>setChoice(option.id)}><span className={styles.optionLetter}>{option.id}</span><span>{pick(option.text,lang)}</span></button>
          })}</div>
          <div className={styles.actions}>{!locked ? <button type="button" className={styles.primary} onClick={confirm} disabled={!choice}>{ui.confirm}<Arrow/></button> : <><p role="status" className={styles.saved}>{ui.saved}</p>{!timed && <section className={styles.feedback} aria-label={ui.solution} data-correct={choice===currentQuestion.correct}><h3>{choice===currentQuestion.correct ? (lang==='fa'?'پاسخ درست است':lang==='en'?'Correct':'Richtig') : (lang==='fa'?'پاسخ درست':lang==='en'?'Correct answer':'Richtige Antwort')}{choice!==currentQuestion.correct && <>: {currentQuestion.correct}</>}</h3>{choice!==currentQuestion.correct && <p><strong>{pick(currentQuestion.options.find(option=>option.id===currentQuestion.correct).text,lang)}</strong></p>}<p>{pick(currentQuestion.explanation,lang)}</p></section>}<button type="button" className={styles.primary} onClick={next}>{round+1===item.decisionExam.length?ui.summary:ui.continue}<Arrow/></button></>}</div>
        </section>
      </div>
    </>}
  </main>
}
