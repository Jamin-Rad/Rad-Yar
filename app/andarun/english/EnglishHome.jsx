import Link from 'next/link'
import { lessons, flashcards } from './courseContent'
import styles from './home.module.css'

export function Arrow(){return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>}
const statusLabels={loading:'Connecting',saving:'Syncing',saved:'Online',pending:'Saving changes',offline:'Offline · Retry'}
export default function EnglishHome({selectLesson,openCards,beginRandom,state,syncStatus,sync}) {
 const unfinished=state.session&&state.session.index<state.session.ids.length
 return <div className={styles.home} lang="en" dir="ltr">
  <header className={styles.header}><div className={styles.wordmark}>English<small>JAMINOVA</small></div><nav aria-label="English navigation"><a href="#your-lessons">Lessons</a><button onClick={openCards}>Flashcards</button><a href="#random-practice">Practice</a><Link href="/andarun" className={styles.back}>Back to Jaminova</Link></nav></header>
  <section className={styles.hero}><div><h1>Small steps.<br/>Real conversations.</h1><p>Your B1 space for everyday life and work.</p><button className={styles.primary} onClick={()=>selectLesson('b1-03')}>Start lesson 3 <Arrow/></button>{unfinished?<button className={styles.resume} onClick={()=>beginRandom('resume')}>Continue your saved practice <Arrow/></button>:null}</div><div className={styles.typeArt} aria-hidden="true"><span>Aa</span><em>Make it part of your day.</em></div></section>
  <div className={styles.learningGrid}>
   <section className={styles.lessonList} id="your-lessons"><h2>Your lessons</h2><p className={styles.count}>B1 · {lessons.length} lessons</p><div>{lessons.map((lesson,i)=><button className={i===lessons.length-1?styles.latest:''} key={lesson.id} onClick={()=>selectLesson(lesson.id)}><span className={styles.number}>{String(i+1).padStart(2,'0')}</span><span><strong>{lesson.titleEn}</strong><small>{lesson.grammarEn}</small></span><Arrow/></button>)}</div></section>
   <section className={styles.practice} id="random-practice"><h2>Mix it up.</h2><p>A fresh set of 10 questions from every lesson.</p><div><button onClick={()=>beginRandom('grammar')}>Random grammar <Arrow/></button><button onClick={()=>beginRandom('vocabulary')}>Random vocabulary <Arrow/></button></div><small>New sentences. Instant feedback.</small></section>
  </div>
  <section className={styles.flashBand}><svg aria-hidden="true" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="12" y="14" width="72" height="65" rx="4" transform="rotate(-14 48 46)"/><rect x="45" y="29" width="68" height="62" rx="4" transform="rotate(8 79 60)" fill="#e5e9df"/></svg><div><h2>Words worth keeping.</h2><p>Review all {flashcards.length} flashcards, or just the ones due today.</p></div><button className={styles.primary} onClick={openCards}>Open flashcards <Arrow/></button></section>
  <footer className={styles.footer}><span>Progress syncs across your devices.</span><button onClick={sync}><span className={syncStatus==='saved'?styles.online:styles.pending}/>{statusLabels[syncStatus]}</button></footer>
 </div>
}
