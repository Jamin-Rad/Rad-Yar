'use client'
import {useEffect,useRef,useState} from 'react'
import Link from 'next/link'
import useLatinProgress from '../endungen/useLatinProgress'
import {probeRounds} from '../endungen/probeQuestions'
import {isCorrect} from '../endungen/questions'
import s from '../endungen/endungen.module.css'
import ui from './probe.module.css'
export default function Probe(){
 const p=useLatinProgress(),[mode,setMode]=useState(null),[feedback,setFeedback]=useState(false)
 const form=useRef(null)
 const hasAttempt = id => Boolean(p.drafts[id]?.draft || p.results.some(r=>r.mode===id))
 const practice = [13,14,15,16,17].map(number=>'probe24-'+number)
 const previous = [1,2,3,4,5,6,7].map(number=>'probe24-'+number).filter(hasAttempt)
 const sections = [
  ['Prüfungen','Direkt starten · Je 6 Fragen zu Vokabeln und 6 zu Grammatik und Landeskunde.',['probe24-11','probe24-12']],
  ['Wortschatz','Lektion 3 · Wörter erkennen und selbst schreiben.',['probe24-9','probe24-10']],
  ['Personalendungen','Verbformen im Präsens.',practice.slice(0,2)],
  ['Nominativ und Akkusativ','Singular und Plural der a- und o-Deklination.',practice.slice(2,4)],
  ['Reich und Anwendung','Landeskunde und Formen im Zusammenhang.',[practice[4],'probe24-8']],
  ...(previous.length ? [['Bisherige Runden','Deine früheren Aufgaben und Ergebnisse.',previous]] : []),
 ]
 const original=mode?.replace('-review',''), first=p.results.find(r=>r.mode===original), second=p.results.find(r=>r.mode===`${original}-review`)
 const review=mode?.endsWith('-review'), round=probeRounds[mode], result=review?second:first
 const indices=round?(review?first?.mistakes||[]:round.questions.map((_,i)=>i)):[]
 const draft=p.drafts[mode]?.draft||{index:indices[0]??0,answers:{},checked:{}}
 const at=indices.indexOf(draft.index),question=round?.questions[draft.index],answer=draft.answers[draft.index]||''
 useEffect(()=>{
  function keydown(e){
   if(e.repeat||e.isComposing||e.ctrlKey||e.metaKey||e.altKey||!question||result||!form.current)return
   const typing=e.target instanceof HTMLElement&&(e.target.matches('input:not([type=radio]),textarea,select')||e.target.isContentEditable)
   const key='۱۲۳۴'.includes(e.key)?String('۱۲۳۴'.indexOf(e.key)+1):e.key
   if(!typing&&/^[1-4]$/.test(key)&&question.options&&!feedback&&!draft.checked[draft.index]){
    const option=question.options[Number(key)-1];if(option){e.preventDefault();save(option);form.current.querySelectorAll('input[type=radio]')[Number(key)-1]?.focus()}
   }else if(e.key==='Enter'&&answer.trim()){
    if(e.target instanceof HTMLElement&&e.target.closest('button,a')&&!form.current.contains(e.target))return
    e.preventDefault();form.current.requestSubmit()
   }
  }
  window.addEventListener('keydown',keydown)
  return()=>window.removeEventListener('keydown',keydown)
 })
 useEffect(()=>{
  if(p.status==='loading'||result||!question)return
  const frame=requestAnimationFrame(()=>{
   const input=form.current?.querySelector('input[type=text]')
   if(input&&!input.disabled)input.focus({preventScroll:true})
   form.current?.scrollIntoView({block:'start',behavior:'instant'})
  })
  return()=>cancelAnimationFrame(frame)
 },[mode,draft.index,p.status==='loading',Boolean(result),Boolean(question?.options),Boolean(draft.checked[draft.index])])
 if(p.status==='loading')return <main className={ui.root}><p role="status">Lernstand wird geladen …</p></main>
 function save(value){p.saveDraft(mode,{...draft,answers:{...draft.answers,[draft.index]:value}})}
 function submit(e){e.preventDefault();if(!answer.trim())return
 if(round.kind==='training'&&!review&&!feedback&&!draft.checked[draft.index]){p.saveDraft(mode,{...draft,checked:{...draft.checked,[draft.index]:true}});setFeedback(true);return}
 const next=indices[at+1]
 if(next!==undefined){p.saveDraft(mode,{...draft,index:next});setFeedback(false)}else{p.saveResult(mode,indices.filter(i=>!isCorrect(round.questions[i],draft.answers[i]||'')),0,draft.answers);void p.flush();setFeedback(false)}
 }
 function open(id){setMode(id);setFeedback(false)}
 return <main className={`${ui.root} ${mode?ui.inSession:''}`}><div className={s.wrap} lang="de"><Link href="/mobin/fach/latein">← Latein</Link><header className={ui.hero}><div><span>DEIN LATEIN-STUDIO</span><h1>{mode?'Probe-KA · 24. November':<>Bereit für die<br/>Probe-KA?</>}</h1><p>24. November · Wortschatz · Endungen · Römisches Reich</p></div><aside><strong>Einmal lösen.<br/>Gezielt verbessern.</strong><p>Dein Lernstand und beide Ergebnisse bleiben in deinem Konto.</p></aside></header><p>Jede Runde: ein Versuch und eine Fehlerwiederholung. Danach bleiben beide Ergebnisse sichtbar.</p><p role="status">{p.status==='offline'?'Lokal gespeichert · Kontosync momentan nicht erreichbar':p.status==='saving'?'Lokal gespeichert · Kontosync folgt':'Im Mobin-Konto gespeichert'}</p>
 {!mode?<div className={ui.overview}>{sections.map(([title,detail,list])=><section key={title} data-section={title==='Prüfungen'?'tests':title.startsWith('Extra')?'extra':'practice'}><h2>{title}</h2><p>{detail}</p><div className={ui.cards}>{list.map(id=>{
 const r=probeRounds[id],done=p.results.find(x=>x.mode===id),again=p.results.find(x=>x.mode===id+'-review'),d=p.drafts[id]?.draft
 return <button className={ui.roundCard} key={id} onClick={()=>open(id)}><span className={ui.cardMeta}>{r.questions.length} Aufgaben · {done?'Abgeschlossen':d?'In Bearbeitung':'Bereit'}</span><strong>{r.title}</strong><span>{done?'Ergebnis 1: '+(r.questions.length-done.mistakes.length)+'/'+r.questions.length:r.kind==='training'?'Mit Erklärungen nach jeder Antwort':'Ohne Hinweise während der Prüfung'}</span>{again&&<span>Ergebnis 2: {done.mistakes.length-again.mistakes.length}/{done.mistakes.length}</span>}<b>{done?'Ergebnisse ansehen':d?'Fortsetzen':'Starten'} →</b></button>
 })}</div></section>)}</div>:<section className={s.panel}><button onClick={()=>{void p.flush();open(null)}}>← Übersicht</button><h2>{round.title}</h2>
 {result?<><h3>Ergebnis 1: {round.questions.length-first.mistakes.length}/{round.questions.length}</h3>{second&&<h3>Ergebnis 2 · Fehlerwiederholung: {first.mistakes.length-second.mistakes.length}/{first.mistakes.length}</h3>}
 {!second&&first.mistakes.length>0&&<button onClick={()=>open(`${original}-review`)}>Fehler einmal wiederholen</button>}<p>Der erste Versuch ist abgeschlossen und gesperrt.{second?' Auch die Fehlerwiederholung ist abgeschlossen.':''}</p>
 {(review?second:first).mistakes.map(i=><article key={i}><h3>{round.questions[i].prompt}</h3><p>{round.questions[i].example}</p><p>Deine Antwort: {result.answers?.[i]}</p><strong>Richtig: {round.questions[i].answer}</strong><p>{round.questions[i].explanation}</p></article>)}</>:question&&<form ref={form} onSubmit={submit} className={ui.quiz}><div className={ui.quizTop}><span>{question.topic}</span><strong>Aufgabe {at+1} / {indices.length}</strong></div><progress max={indices.length} value={at} aria-label="Fortschritt"/><div className={ui.questionIntro}><span>{question.options?'Auswahlfrage':'Schreibaufgabe'}</span><h3>{question.prompt}</h3><p>{question.example}</p><small>{review?'Fehlerwiederholung · ein Versuch':round.kind==='training'?'Prüfe deine Antwort und lies die Erklärung.':'Die Lösungen erscheinen nach der Abgabe.'}</small></div><div className={ui.answerArea}>{question.options?<fieldset disabled={feedback||draft.checked[draft.index]}><legend>Deine Antwort · Taste 1–4 zum Auswählen</legend>{question.options.map((o,i)=><label key={o} className={answer===o?ui.selected:undefined}><kbd>{i+1}</kbd><input type="radio" name="answer" checked={answer===o} onChange={()=>save(o)}/>{o}</label>)}</fieldset>:<label>Deine Antwort<input key={`${mode}-${draft.index}`} type="text" autoFocus value={answer} disabled={feedback||draft.checked[draft.index]} onChange={e=>save(e.target.value)} maxLength={240} autoComplete="off" autoCorrect="off" spellCheck={false}/></label>}
 {(feedback||draft.checked[draft.index])&&<div className={isCorrect(question,answer)?ui.correct:ui.incorrect} role="status"><strong>{isCorrect(question,answer)?'Richtig!':'Noch nicht richtig.'}</strong><p>{question.explanation}</p></div>}
 <p className={ui.keyboardHint}>{question.options?'1–4 · Auswählen   ':''}Enter · {round.kind==='training'&&!review&&!draft.checked[draft.index]?'Antwort prüfen':at===indices.length-1?'Abgeben':'Weiter'}</p><button className={ui.primary} disabled={!answer.trim()} onClick={()=>{if(draft.checked[draft.index])setFeedback(true)}}>{round.kind==='training'&&!review&&!feedback&&!draft.checked[draft.index]?'Antwort prüfen':at===indices.length-1?'Ergebnis anzeigen':'Weiter'}</button></div></form>}
 </section>}</div></main>
}
