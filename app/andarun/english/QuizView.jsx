import { categories, questionMap, lessonMap } from './courseContent'
import { activeMistakes, currentQuestion, optionOrder, answer, advance, result } from './courseEngine'
import { LessonText } from './LessonView'
import styles from './page.module.css'
export default function QuizView({state,update,begin,goLesson}) {
 const s=state.session,q=currentQuestion(s)
 if(!s)return <button className={styles.primary} onClick={goLesson}>Back to English home</button>
 const scope=s.lessonId==='all'?'All lessons':lessonMap[s.lessonId]?.titleEn
 const label=s.mode==='random'?'Random practice':s.mode==='review'?'Mistake review':'Practice'
 if(s.index===s.ids.length){
   const score=result(s),wrong=activeMistakes(state,s.lessonId,s.category==='mixed'?null:s.category)
   return <>
    <section className={styles.intro}><h1>{label}: {categories[s.category]||'Mixed skills'}</h1><p>{scope}</p></section>
    <section className={styles.paper}><div className={styles.score}><strong>{Math.round(score.correct/score.total*100)}%</strong><span>{score.correct} correct out of {score.total}</span></div><div className={styles.results}>{Object.entries(score.rows).map(([key,r])=><div key={key}><span>{categories[key]}</span><strong>{r.correct} / {r.total}</strong></div>)}</div><p>Only your first answer to each question counts. Review practice does not change an earlier test score.</p><div className={styles.actions}>{wrong.length?<button className={styles.primary} onClick={()=>begin('review',s.category,s.lessonId)}>Review these mistakes</button>:null}{s.category!=='mixed'?<button className={styles.secondary} onClick={()=>begin(s.lessonId==='all'?'random':'test',s.category,s.lessonId)}>{s.lessonId==='all'?'Try another random set':'Try this test again'}</button>:null}<button className={styles.textButton} onClick={goLesson}>{s.lessonId==='all'?'Back to English home':'Back to lesson'}</button></div></section>
    <section className={styles.paper}><h2>Answers & explanations</h2>{s.ids.map(id=>{const item=questionMap[id].variants[s.variants?.[id]??s.variant];return <details className={styles.answerDetail} key={id}><summary><span>{s.answers[id]===item.answer?'Correct':'Needs review'}</span><span lang="en" dir="ltr">{item.prompt}</span></summary><p lang="en" dir="ltr">Your answer: {item.options[s.answers[id]]}</p><p lang="en" dir="ltr">Correct answer: {item.options[item.answer]}</p><p className={styles.persian} lang="fa" dir="rtl">{item.explanation}</p></details>})}</section>
   </>
 }
 const selected=s.answers[q.id]
 return <section className={styles.exercise}>
   <div className={styles.sectionHead}><span>{label} · {categories[q.category]}<small className={styles.questionSource}>{lessonMap[q.lessonId].titleEn}</small></span><button className={styles.textButton} onClick={goLesson}>{s.lessonId==='all'?'English home':'Back to lesson'}</button></div>
   <progress value={s.index} max={s.ids.length} aria-label="Test progress"/>
   <p className={styles.muted}>Question {s.index+1} of {s.ids.length}</p>
   <h1 className={styles.prompt} lang="en" dir="ltr">{q.prompt}</h1>
   <fieldset className={styles.options} disabled={selected!==undefined}><legend className={styles.srOnly}>Choose one answer</legend>{optionOrder(s).map((index,pos)=><button data-option={index} key={index} className={`${styles.option} ${selected!==undefined&&index===q.answer?styles.correct:''} ${selected===index&&index!==q.answer?styles.wrong:''}`} onClick={()=>update(p=>answer(p,index))}><span className={styles.optionNumber}>{pos+1}</span><span lang="en" dir="ltr">{q.options[index]}</span>{selected!==undefined&&index===q.answer?<small>Correct answer</small>:selected===index?<small>Your choice</small>:null}</button>)}</fieldset>
   {selected!==undefined?<div className={styles.feedback} role="status"><strong>{selected===q.answer?'Correct.':'Saved for review.'}</strong><p className={styles.persian} lang="fa" dir="rtl">{q.explanation}</p><button className={styles.primary} onClick={()=>update(p=>advance(p))}>{s.index+1===s.ids.length?'See results':'Next question'}</button></div>:<p className={styles.muted}>Choose an answer to see the explanation.</p>}
   {q.category==='reading'?<details className={styles.textReference}><summary>Read the plain lesson text</summary><LessonText lesson={lessonMap[q.lessonId]} plain/></details>:null}
 </section>
}
