'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { lessons, lessonMap } from './courseContent'
import { startSession } from './courseEngine'
import useEnglishProgress from './useEnglishProgress'
import EnglishHome from './EnglishHome'
import LessonView from './LessonView'
import QuizView from './QuizView'
import ReviewView from './ReviewView'
import Flashcards from './Flashcards'
import styles from './page.module.css'
const syncLabels={loading:'Connecting…',saving:'Syncing…',saved:'Online · Saved',pending:'Changes waiting to sync',offline:'Offline · Retrying automatically'}
export default function EnglishApp() {
 const {state,update,loaded,syncStatus,storageWarning,sync}=useEnglishProgress()
 const [lessonId,setLessonId]=useState('all'),[screen,setScreen]=useState('home'),[now,setNow]=useState(0),[pending,setPending]=useState(null)
 const main=useRef(null),session=state.session
 useEffect(()=>{
   function readUrl(){
     const params=new URLSearchParams(window.location.search),id=params.get('lesson'),view=params.get('view')
     const valid=id&&Object.hasOwn(lessonMap,id)
     setLessonId(valid?id:'all')
     setScreen(view==='practice'?'quiz':view==='cards'?'cards':view==='review'?'review':valid?'lesson':'home')
     setPending(null)
   }
   readUrl();setNow(Date.now())
   const timer=setInterval(()=>setNow(Date.now()),30000)
   window.addEventListener('popstate',readUrl)
   return ()=>{clearInterval(timer);window.removeEventListener('popstate',readUrl)}
 },[])
 useEffect(()=>{main.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'})},[screen,lessonId,session?.index])
 function navigate(next,id='all'){
   setScreen(next);setLessonId(id);setPending(null)
   const url=new URL(window.location.href);url.hash='';url.searchParams.delete('lesson');url.searchParams.delete('view')
   if(id!=='all')url.searchParams.set('lesson',id)
   if(next!=='lesson'&&next!=='home')url.searchParams.set('view',next==='quiz'?'practice':next)
   window.history.pushState(window.history.state,'',url)
 }
 function selectLesson(id){navigate('lesson',id)}
 function kickoff(config){update(p=>startSession(p,config));navigate('quiz',config.lessonId)}
 function begin(mode,category,scope=lessonId){
   const config={mode,category,lessonId:scope}
   if(session&&session.index<session.ids.length){setPending(config);return}
   kickoff(config)
 }
 function resume(){if(session)navigate('quiz',session.lessonId)}
 function goBack(){if(session?.lessonId==='all')navigate('home');else selectLesson(session?.lessonId||lessonId)}
 function random(category){if(category==='resume')resume();else begin('random',category,'all')}
 const lesson=lessonMap[lessonId],isHome=screen==='home'
 return <main className={`${styles.app} ${isHome?styles.homeApp:''}`} dir="ltr" lang="en"><div className={`${styles.shell} ${isHome?styles.homeShell:''}`}>
   {!isHome?<><header className={styles.header}><button className={styles.brand} onClick={()=>navigate('home')} aria-label="English home" dir="ltr" lang="en"><span><strong>English</strong><small>JAMINOVA</small></span></button><Link href="/andarun" className={styles.back}>Back to Jaminova</Link></header>
   <nav className={styles.nav} aria-label="Study navigation"><button onClick={()=>navigate('home')}>English home</button>{lesson?<button aria-current={screen==='lesson'?'page':undefined} onClick={()=>selectLesson(lessonId)}>Lesson</button>:null}<button aria-current={screen==='cards'?'page':undefined} onClick={()=>navigate('cards',lessonId)}>Flashcards</button><button aria-current={screen==='review'?'page':undefined} onClick={()=>navigate('review',lessonId)}>Mistakes</button>{session?<button aria-current={screen==='quiz'?'page':undefined} onClick={resume}>{session.index<session.ids.length?'Resume practice':'Last result'}</button>:null}</nav>
   <div className={styles.syncBar}><span role="status">{syncLabels[syncStatus]}</span><button className={styles.textButton} onClick={sync}>Sync now</button></div></>:null}
   {syncStatus==='offline'?<p className={styles.notice}>Online save has not been confirmed. Your local copy is kept and will sync when the connection returns.</p>:null}
   {storageWarning?<p className={styles.notice} role="status">{storageWarning}</p>:null}
   {pending?<section className={styles.notice}><p>You have unfinished practice. Continue it, or start a new session. Recorded mistakes and completed scores are kept.</p><div className={styles.actions}><button className={styles.primary} onClick={resume}>Continue saved practice</button><button className={styles.secondary} onClick={()=>kickoff(pending)}>Start new session</button><button className={styles.textButton} onClick={()=>setPending(null)}>Cancel</button></div></section>:null}
   <div tabIndex={-1} ref={main} className={styles.content}>
    {!loaded?<p role="status">Loading your English space…</p>:isHome?<EnglishHome selectLesson={selectLesson} openCards={()=>navigate('cards','all')} openReview={()=>navigate('review','all')} beginRandom={random} state={state} syncStatus={syncStatus} sync={sync}/>
    :screen==='lesson'&&lesson?<LessonView key={lessonId} lesson={lesson} state={state} begin={begin}/>
    :screen==='cards'?<><section className={styles.intro}><h1>Flashcards</h1><p>{lesson?.titleEn||'All lessons'}</p><label className={styles.deckSelect}>Deck<select aria-label="Flashcard deck" value={lessonId} onChange={e=>navigate('cards',e.target.value)}><option value="all">All lessons</option>{lessons.map(l=><option key={l.id} value={l.id}>{l.titleEn}</option>)}</select></label></section><Flashcards key={lessonId} lesson={lesson} state={state} update={update} now={now}/></>
    :screen==='review'?<ReviewView state={state} scope={lessonId} now={now} begin={begin}/>
    :session?<QuizView state={state} update={update} begin={begin} goLesson={goBack}/>:<section className={styles.paper}><p>No saved practice found on this device yet.</p><button className={styles.primary} onClick={()=>navigate('home')}>English home</button></section>}
   </div>
   {!isHome?<footer className={styles.footer}>Your progress syncs online. A local copy keeps practice available when your connection drops.</footer>:null}
 </div></main>
}
