'use client'
import {useState} from 'react'
import Link from 'next/link'
import useLatinProgress from '../endungen/useLatinProgress'
import {probeRounds} from '../endungen/probeQuestions'
import {isCorrect} from '../endungen/questions'
import s from '../endungen/endungen.module.css'
import ui from './probe.module.css'
export default function Probe(){
 const p=useLatinProgress(),[mode,setMode]=useState(null),[feedback,setFeedback]=useState(false)
 const ids=Object.keys(probeRounds).filter(id=>!id.endsWith('-review'))
 if(p.status==='loading')return <main className={ui.root}><p role="status">Lernstand wird geladen …</p></main>
 const original=mode?.replace('-review',''), first=p.results.find(r=>r.mode===original), second=p.results.find(r=>r.mode===`${original}-review`)
 const review=mode?.endsWith('-review'), round=probeRounds[mode], result=review?second:first
 const indices=round?(review?first?.mistakes||[]:round.questions.map((_,i)=>i)):[]
 const draft=p.drafts[mode]?.draft||{index:indices[0]??0,answers:{},checked:{}}
 const at=indices.indexOf(draft.index),question=round?.questions[draft.index],answer=draft.answers[draft.index]||''
 function save(value){p.saveDraft(mode,{...draft,answers:{...draft.answers,[draft.index]:value}})}
 function submit(e){e.preventDefault();if(!answer.trim())return
 if(round.kind==='training'&&!review&&!feedback&&!draft.checked[draft.index]){p.saveDraft(mode,{...draft,checked:{...draft.checked,[draft.index]:true}});setFeedback(true);return}
 const next=indices[at+1]
 if(next!==undefined){p.saveDraft(mode,{...draft,index:next});setFeedback(false)}else{p.saveResult(mode,indices.filter(i=>!isCorrect(round.questions[i],draft.answers[i]||'')),0,draft.answers);void p.flush();setFeedback(false)}
 }
 function open(id){setMode(id);setFeedback(false)}
 return <main className={ui.root}><div className={s.wrap} lang="de"><Link href="/mobin/fach/latein">← Latein</Link><h1>Probe-KA · 24. November</h1><p>Endungen und Römisches Reich · Fünf Übungen, danach zwei Prüfungen. Jede Runde ist nur einmal lösbar. Fehler dürfen einmal wiederholt werden. Ergebnisse bleiben erhalten. Zusätzlich gibt es eine freiwillige Übung mit 15 Anwendungsaufgaben.</p><p role="status">{p.status==='offline'?'Lokal gespeichert · Kontosync momentan nicht erreichbar':p.status==='saving'?'Lokal gespeichert · Kontosync folgt':'Im Mobin-Konto gespeichert'}</p>
 {!mode?<section>{ids.map((id,i)=><p key={id}><button disabled={i>=5&&ids.slice(0,5).some(key=>!p.results.some(r=>r.mode===key))} onClick={()=>open(id)}>{probeRounds[id].title} · {probeRounds[id].questions.length} Aufgaben · {p.results.some(r=>r.mode===id)?'Ergebnis öffnen':p.drafts[id]?.draft?'Fortsetzen':'Starten'}</button></p>)}</section>:<section className={s.panel}><button onClick={()=>{void p.flush();open(null)}}>← Übersicht</button><h2>{round.title}</h2>
 {result?<><h3>Ergebnis 1: {round.questions.length-first.mistakes.length}/{round.questions.length}</h3>{second&&<h3>Ergebnis 2 · Fehlerwiederholung: {first.mistakes.length-second.mistakes.length}/{first.mistakes.length}</h3>}
 {!second&&first.mistakes.length>0&&<button onClick={()=>open(`${original}-review`)}>Fehler einmal wiederholen</button>}<p>Der erste Versuch ist abgeschlossen und gesperrt.{second?' Auch die Fehlerwiederholung ist abgeschlossen.':''}</p>
 {(review?second:first).mistakes.map(i=><article key={i}><h3>{round.questions[i].prompt}</h3><p>{round.questions[i].example}</p><p>Deine Antwort: {result.answers?.[i]}</p><strong>Richtig: {round.questions[i].answer}</strong><p>{round.questions[i].explanation}</p></article>)}</>:question&&<form onSubmit={submit}><p>Aufgabe {at+1}/{indices.length}</p><h3>{question.prompt}</h3><p>{question.example}</p>{question.options?<fieldset disabled={feedback||draft.checked[draft.index]}><legend>Deine Antwort</legend>{question.options.map(o=><label key={o} style={{display:'block',padding:12}}><input type="radio" name="answer" checked={answer===o} onChange={()=>save(o)}/>{o}</label>)}</fieldset>:<label>Deine Antwort<input value={answer} disabled={feedback||draft.checked[draft.index]} onChange={e=>save(e.target.value)} maxLength={240} autoComplete="off" autoCorrect="off" spellCheck={false}/></label>}
 {(feedback||draft.checked[draft.index])&&<div role="status"><strong>{isCorrect(question,answer)?'Richtig!':'Noch nicht richtig.'}</strong><p>{question.explanation}</p></div>}
 <button disabled={!answer.trim()} onClick={()=>{if(draft.checked[draft.index])setFeedback(true)}}>{round.kind==='training'&&!review&&!feedback&&!draft.checked[draft.index]?'Antwort prüfen':at===indices.length-1?'Ergebnis anzeigen':'Weiter'}</button></form>}
 </section>}</div></main>
}
