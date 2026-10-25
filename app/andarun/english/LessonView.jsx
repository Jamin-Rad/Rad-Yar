import { categories, questions } from './courseContent'
import LessonAudio from './LessonAudio'
import styles from './page.module.css'
import { useState } from 'react'

export function LessonText({lesson,plain=false,active=-1}) {
 return <div className={styles.reading} lang="en" dir="ltr">{lesson.paragraphs.map((p,i)=><p key={i} className={active===i?styles.activeParagraph:undefined}>{plain?p.replaceAll('**',''):p.split(/(\*\*.*?\*\*)/g).map((part,j)=>part.startsWith('**')?<strong key={j}>{part.slice(2,-2)}</strong>:part)}</p>)}</div>
}
export default function LessonView({lesson,state,begin}) {
 const [active,setActive]=useState(-1)
 const lessonQuestions=questions.filter(q=>q.lessonId===lesson.id)
 return <>
   <section className={styles.intro}><span className={styles.kicker}>B1 · درس {lesson.id==='b1-01'?'۱':'۲'} از مسیر ۲۰ درسی</span><h1>{lesson.title}</h1><p>{lesson.goal}</p><p className={styles.muted}>دو درس آماده · تمرین‌ها جداگانه و چهارگزینه‌ای · بدون نوشتن جمله</p></section>
   <div className={styles.studyGrid}>
    <article className={styles.paper}><span className={styles.kicker}>۱ · متن درس</span><h2 lang="en" dir="ltr">{lesson.subtitle}</h2><LessonAudio lesson={lesson} onActive={setActive}/><LessonText lesson={lesson} active={active}/></article>
    <aside className={styles.side}><div className={styles.darkPanel}><span className={styles.kicker}>تمرین امروز</span><h2>هر مهارت، یک آزمون.</h2><p>درک مطلب، گرامر، لغت و مکالمه را جدا تمرین کن. متن در آزمون گرامر و لغت نمایش داده نمی‌شود.</p><p className={styles.fine}>تمرکز گرامر: {lesson.grammar}</p><a className={styles.lightButton} href="#lesson-tests">رفتن به آزمون‌ها</a></div><div className={styles.sideNote}><strong>انتقال یادگیری</strong><p>گرامر و واژگان را در موقعیت‌های تازه مثل سفر، خانه، خرید و محیط کار هم امتحان می‌کنی.</p></div></aside>
   </div>
   <section className={styles.paper}><span className={styles.kicker}>۲ · عبارت‌های کاربردی</span><h2>۱۰ عبارت تازه</h2><div className={styles.wordGrid}>{lesson.words.map(([term,meaning,example])=><div className={styles.word} key={term}><strong lang="en" dir="ltr">{term}</strong><span>{meaning}</span><p lang="en" dir="ltr">{example}</p></div>)}</div></section>
   <section className={styles.paper}><span className={styles.kicker}>۳ · گرامر کوتاه</span><h2>{lesson.grammar}</h2><div className={styles.grammarGrid}>{lesson.grammarNotes.map(([title,body,example])=><div key={title}><h3>{title}</h3><p>{body}</p><p className={styles.example} lang="en" dir="ltr">{example}</p></div>)}</div></section>
   <section className={styles.paper} id="lesson-tests"><span className={styles.kicker}>۴ · آزمون‌های مستقل</span><h2>انتخاب بخش تمرین</h2><div className={styles.testGrid}>{Object.entries(categories).map(([category,label])=>{
     const count=lessonQuestions.filter(q=>q.category===category).length
     const last=state.history.filter(h=>h.lessonId===lesson.id&&h.category===category&&h.mode==='test').at(-1)
     return <div className={styles.testCard} key={category}><h3>{label}</h3><p>{count} سؤال چهارگزینه‌ای</p><p className={styles.muted}>{['grammar','vocabulary'].includes(category)?'شامل جمله‌ها و موقعیت‌های جدید خارج از متن':category==='reading'?'متن بدون بولد در دسترس است':'انتخاب پاسخ مناسب در موقعیت واقعی'}</p>{last?<p>آخرین نمره: {last.correct} از {last.total}</p>:null}<button className={styles.primary} onClick={()=>begin('test',category)}>شروع {label}</button></div>
   })}</div></section>
 </>
}
