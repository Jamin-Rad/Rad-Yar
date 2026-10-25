import { categories, questions, lessons } from './courseContent'
import LessonAudio from './LessonAudio'
import styles from './page.module.css'
import { useState } from 'react'

export function LessonText({lesson,plain=false,active=-1}) {
 return <div className={styles.reading} lang="en" dir="ltr">{lesson.paragraphs.map((p,i)=><p key={i} className={active===i?styles.activeParagraph:undefined}>{plain?p.replaceAll('**',''):p.split(/(\*\*.*?\*\*)/g).map((part,j)=>part.startsWith('**')?<strong key={j}>{part.slice(2,-2)}</strong>:part)}</p>)}</div>
}
const noteTitles={
 'b1-01':['Routines & facts','Temporary situations','Read the situation'],
 'b1-02':['Completed events','Actions in progress','Two actions, one story'],
 'b1-03':['Will: decisions & promises','Going to: intentions & evidence','Arranged future plans'],
 'b1-04':['Experience without a finished time','Finished time, finished event','Duration & recent actions']
}
export default function LessonView({lesson,state,begin}) {
 const [active,setActive]=useState(-1)
 const lessonQuestions=questions.filter(q=>q.lessonId===lesson.id)
 return <>
   <section className={styles.intro}><span className={styles.kicker}>B1 · Lesson {lessons.findIndex(l=>l.id===lesson.id)+1}</span><h1>{lesson.titleEn}</h1><p>{lesson.goalEn}</p><p className={styles.muted}>Read. Listen. Choose. Review.</p></section>
   <div className={styles.studyGrid}>
    <article className={styles.paper}><span className={styles.kicker}>01 · Read & listen</span><h2 lang="en" dir="ltr">{lesson.subtitle}</h2><LessonAudio lesson={lesson} onActive={setActive}/><LessonText lesson={lesson} active={active}/></article>
    <aside className={styles.side}><div className={styles.darkPanel}><span className={styles.kicker}>Your practice</span><h2>One skill at a time.</h2><p>Separate tests for reading, vocabulary, grammar and conversation. Grammar and vocabulary include new situations beyond the text.</p><p className={styles.fine}>{lesson.grammarEn}</p><a className={styles.lightButton} href="#lesson-tests">Choose a test</a></div><div className={styles.sideNote}><strong>Make it useful.</strong><p>Try these expressions in situations from work, travel and everyday life.</p></div></aside>
   </div>
   <section className={styles.paper}><span className={styles.kicker}>02 · Vocabulary</span><h2>10 expressions to keep</h2><div className={styles.wordGrid}>{lesson.words.map(([term,meaning,example])=><div className={styles.word} key={term}><strong lang="en" dir="ltr">{term}</strong><span className={styles.persian} lang="fa" dir="rtl">{meaning}</span><p lang="en" dir="ltr">{example}</p></div>)}</div></section>
   <section className={styles.paper}><span className={styles.kicker}>03 · Grammar</span><h2>{lesson.grammarEn}</h2><div className={styles.grammarGrid}>{lesson.grammarNotes.map(([,body,example],i)=><div key={i}><h3>{noteTitles[lesson.id][i]}</h3><p className={styles.persian} lang="fa" dir="rtl">{body}</p><p className={styles.example} lang="en" dir="ltr">{example}</p></div>)}</div></section>
   <section className={styles.paper} id="lesson-tests"><span className={styles.kicker}>04 · Practice</span><h2>Choose your test</h2><div className={styles.testGrid}>{Object.entries(categories).map(([category,label])=>{
     const count=lessonQuestions.filter(q=>q.category===category).length
     const last=state.history.filter(h=>h.lessonId===lesson.id&&h.category===category&&h.mode==='test').at(-1)
     return <div className={styles.testCard} key={category}><h3>{label}</h3><p>{count} multiple-choice questions</p><p className={styles.muted}>{['grammar','vocabulary'].includes(category)?'Fresh sentences beyond the lesson text.':category==='reading'?'The plain text is available during the test.':'Choose a natural response to a real situation.'}</p>{last?<p>Last score: {last.correct} / {last.total}</p>:null}<button className={styles.primary} onClick={()=>begin('test',category)}>Start {label.toLowerCase()}</button></div>
   })}</div></section>
 </>
}
