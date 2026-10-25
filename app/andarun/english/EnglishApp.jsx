'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { lessons, lessonMap, categories } from './courseContent'
import { activeMistakes, startSession } from './courseEngine'
import useEnglishProgress from './useEnglishProgress'
import LessonView from './LessonView'
import QuizView from './QuizView'
import Flashcards from './Flashcards'
import styles from './page.module.css'
const date=n=>new Intl.DateTimeFormat('fa-IR',{timeZone:'Europe/Berlin',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(n)
const syncLabels={loading:'در حال اتصال…',saving:'در حال همگام‌سازی…',saved:'آنلاین · ذخیره شد',pending:'تغییرهای تازه در صف ذخیره',offline:'آنلاین در دسترس نیست · تلاش دوباره خودکار'}
export default function EnglishApp() {
 const {state,update,loaded,syncStatus,storageWarning,sync}=useEnglishProgress()
 const [lessonId,setLessonId]=useState('b1-01'),[screen,setScreen]=useState('lesson'),[now,setNow]=useState(0),[pending,setPending]=useState(null)
 const main=useRef(null),restored=useRef(false)
 const lesson=lessonMap[lessonId],session=state.session
 useEffect(()=>{
   const query=new URLSearchParams(window.location.search).get('lesson')
   if(lessonMap[query])setLessonId(query)
   setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),30000)
   return ()=>clearInterval(timer)
 },[])
 useEffect(()=>{
   if(!loaded||restored.current)return
   restored.current=true
   if(!new URLSearchParams(window.location.search).has('lesson')&&session&&session.index<session.ids.length){setLessonId(session.lessonId);setScreen('quiz')}
 },[loaded,session])
 useEffect(()=>{main.current?.focus()},[screen,lessonId,session?.index])
 function selectLesson(id){setLessonId(id);setScreen('lesson');setPending(null);const url=new URL(window.location.href);url.searchParams.set('lesson',id);window.history.replaceState(window.history.state,'',url)}
 function begin(mode,category){
   const config={mode,category,lessonId}
   if(session&&session.index<session.ids.length){setPending(config);return}
   update(p=>startSession(p,config));setScreen('quiz')
 }
 function resume(){setLessonId(session.lessonId);setScreen('quiz');setPending(null)}
 const mistakes=activeMistakes(state,lessonId)
 return <main className={styles.app} dir="rtl" lang="fa"><div className={styles.shell}>
   <header className={styles.header}><Link href="/andarun" className={styles.back}>بازگشت به یامینوا</Link><div className={styles.brand} dir="ltr" lang="en"><svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 10C17 6 10 6 5 8v30c6-2 13-2 19 2 6-4 13-4 19-2V8c-5-2-12-2-19 2Zm0 0v30"/></svg><span><strong>English</strong><small>JAMINOVA</small></span></div></header>
   <div className={styles.lessonPicker} aria-label="انتخاب درس">{lessons.map((l,i)=><button key={l.id} className={lessonId===l.id?styles.selectedLesson:''} aria-pressed={lessonId===l.id} onClick={()=>selectLesson(l.id)}>درس {i+1} · {l.title}</button>)}</div>
   <nav className={styles.nav} aria-label="بخش‌های درس"><button aria-current={screen==='lesson'?'page':undefined} onClick={()=>setScreen('lesson')}>متن و آزمون‌ها</button><button aria-current={screen==='cards'?'page':undefined} onClick={()=>setScreen('cards')}>فلش‌کارت‌ها</button><button aria-current={screen==='review'?'page':undefined} onClick={()=>setScreen('review')}>مرور اشتباهات ({mistakes.length})</button>{session?<button aria-current={screen==='quiz'?'page':undefined} onClick={resume}>{session.index<session.ids.length?'ادامهٔ آزمون ذخیره‌شده':'آخرین نتیجه'}</button>:null}</nav>
   <div className={styles.syncBar}><span role="status">{syncLabels[syncStatus]}</span><button className={styles.textButton} onClick={sync}>همگام‌سازی</button></div>
   {syncStatus==='offline'?<p className={styles.notice}>ذخیرهٔ آنلاین هنوز تأیید نشده است. پیشرفت در این مرورگر نگه داشته می‌شود و با اتصال دوباره، ارسال مجدد انجام می‌شود.</p>:null}
   {storageWarning?<p className={styles.notice} role="status">{storageWarning}</p>:null}
   {pending?<section className={styles.notice}><p>یک آزمون نیمه‌تمام داری. می‌توانی آن را ادامه بدهی یا آزمون تازه را جایگزین کنی. اشتباهات و نتیجه‌های ثبت‌شده حفظ می‌شوند.</p><div className={styles.actions}><button className={styles.primary} onClick={resume}>ادامهٔ آزمون قبلی</button><button className={styles.secondary} onClick={()=>{update(p=>startSession(p,pending));setScreen('quiz');setPending(null)}}>جایگزینی با آزمون تازه</button><button className={styles.textButton} onClick={()=>setPending(null)}>انصراف</button></div></section>:null}
   <div tabIndex={-1} ref={main} className={styles.content}>
    {!loaded?<p role="status">در حال آماده‌سازی درس‌ها…</p>:screen==='lesson'?<LessonView key={lessonId} lesson={lesson} state={state} begin={begin}/>
    :screen==='cards'?<><section className={styles.intro}><h1>فلش‌کارت · {lesson.title}</h1></section><Flashcards key={lessonId} lesson={lesson} state={state} update={update} now={now}/></>
    :screen==='review'?<>
     <section className={styles.intro}><h1>مرور اشتباهات · {lesson.title}</h1><p>بعد از یک پاسخ درست، مرور برای روز بعد ذخیره می‌شود. پاسخ درست در موعد روز بعد، نکته را از فهرست خارج می‌کند. تمرین زودتر از موعد مرحله را جلو نمی‌برد.</p></section>
     <section className={styles.paper}><div className={styles.testGrid}>{Object.entries(categories).map(([category,label])=>{const entries=activeMistakes(state,lessonId,category);return <div className={styles.testCard} key={category}><h2>{label}</h2><p>{entries.length} نکته · {entries.filter(q=>state.mistakes[q.id].due<=now).length} آمادهٔ مرور</p><button className={styles.primary} disabled={!entries.length} onClick={()=>begin('review',category)}>مرور {label}</button></div>})}</div><ul className={styles.reviewList}>{mistakes.map(q=><li key={q.id}><span>{categories[q.category]} · <bdi lang="en">{q.variants[0].prompt}</bdi></span><small>{state.mistakes[q.id].streak?'مرور بعد: '+date(state.mistakes[q.id].due):'نیاز به تمرین'}</small></li>)}</ul>{!mistakes.length?<p>فعلاً اشتباهی برای مرور این درس نداری.</p>:null}</section>
     <section className={styles.paper}><h2>نتیجه‌های اخیر این درس</h2>{state.history.filter(h=>h.lessonId===lessonId).slice(-12).reverse().map(h=><p key={h.id}>{categories[h.category]||'ترکیبی'} · {h.mode==='review'?'مرور':'آزمون'} · {h.correct} از {h.total} · {date(h.at)}</p>)}</section>
    </>:<QuizView state={state} update={update} lesson={lessonMap[session?.lessonId]||lesson} begin={begin} goLesson={()=>setScreen('lesson')}/>}
   </div>
   <footer className={styles.footer}>وضعیت بالای صفحه تأیید ذخیرهٔ آنلاین را نشان می‌دهد. نسخهٔ محلی برای ادامهٔ تمرین هنگام قطع اتصال نگه داشته می‌شود.</footer>
 </div></main>
}
