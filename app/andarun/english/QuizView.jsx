import { categories, questionMap } from './courseContent'
import { activeMistakes, currentQuestion, optionOrder, answer, advance, result } from './courseEngine'
import { LessonText } from './LessonView'
import styles from './page.module.css'
const fa=n=>new Intl.NumberFormat('fa-IR').format(n)
export default function QuizView({state,update,lesson,begin,goLesson}) {
 const s=state.session,q=currentQuestion(s)
 if(!s)return <button className={styles.primary} onClick={goLesson}>بازگشت به درس</button>
 if(s.index===s.ids.length){
   const score=result(s),wrong=activeMistakes(state,s.lessonId,s.category==='mixed'?null:s.category)
   return <>
    <section className={styles.intro}><h1>نتیجهٔ {s.mode==='test'?'آزمون':'مرور'} {categories[s.category]||'ترکیبی'}</h1><p>{lesson.title}</p></section>
    <section className={styles.paper}><div className={styles.score}><strong>{fa(Math.round(score.correct/score.total*100))}٪</strong><span>{fa(score.correct)} پاسخ درست از {fa(score.total)}</span></div><div className={styles.results}>{Object.entries(score.rows).map(([key,r])=><div key={key}><span>{categories[key]}</span><strong>{fa(r.correct)} از {fa(r.total)}</strong></div>)}</div><p>نمره مربوط به اولین پاسخ هر سؤال در همین نوبت است. مرور اشتباهات نمرهٔ آزمون قبلی را تغییر نمی‌دهد.</p><div className={styles.actions}>{wrong.length?<button className={styles.primary} onClick={()=>begin('review',s.category)}>مرور اشتباهات این بخش</button>:null}{s.category!=='mixed'?<button className={styles.secondary} onClick={()=>begin('test',s.category)}>آزمون دوبارهٔ این بخش</button>:null}<button className={styles.textButton} onClick={goLesson}>بازگشت به درس</button></div></section>
    <section className={styles.paper}><h2>پاسخ‌ها و توضیح‌ها</h2>{s.ids.map(id=>{const item=questionMap[id].variants[s.variants?.[id]??s.variant];return <details className={styles.answerDetail} key={id}><summary><span>{s.answers[id]===item.answer?'درست':'نیاز به مرور'}</span><span lang="en" dir="ltr">{item.prompt}</span></summary><p lang="en" dir="ltr">Your answer: {item.options[s.answers[id]]}</p><p lang="en" dir="ltr">Correct answer: {item.options[item.answer]}</p><p>{item.explanation}</p></details>})}</section>
   </>
 }
 const selected=s.answers[q.id]
 return <section className={styles.exercise}>
   <div className={styles.sectionHead}><span>{s.mode==='test'?'آزمون':'مرور'} {categories[q.category]} · {lesson.title}</span><button className={styles.textButton} onClick={goLesson}>بازگشت به درس</button></div>
   <progress value={s.index} max={s.ids.length} aria-label="پیشرفت آزمون"/>
   <p className={styles.muted}>سؤال {fa(s.index+1)} از {fa(s.ids.length)}</p>
   <h1 className={styles.prompt} lang="en" dir="ltr">{q.prompt}</h1>
   <fieldset className={styles.options} disabled={selected!==undefined}><legend className={styles.srOnly}>یک پاسخ انتخاب کن</legend>{optionOrder(s).map((index,pos)=><button data-option={index} key={index} className={`${styles.option} ${selected!==undefined&&index===q.answer?styles.correct:''} ${selected===index&&index!==q.answer?styles.wrong:''}`} onClick={()=>update(p=>answer(p,index))}><span className={styles.optionNumber}>{fa(pos+1)}</span><span lang="en" dir="ltr">{q.options[index]}</span>{selected!==undefined&&index===q.answer?<small>پاسخ درست</small>:selected===index?<small>انتخاب تو</small>:null}</button>)}</fieldset>
   {selected!==undefined?<div className={styles.feedback} role="status"><strong>{selected===q.answer?'درست بود.':'این نکته برای مرور ذخیره شد.'}</strong><p>{q.explanation}</p><button className={styles.primary} onClick={()=>update(p=>advance(p))}>{s.index+1===s.ids.length?'دیدن نتیجه':'سؤال بعدی'}</button></div>:<p className={styles.muted}>بعد از انتخاب، پاسخ نهایی می‌شود و توضیح فارسی را می‌بینی.</p>}
   {q.category==='reading'?<details className={styles.textReference}><summary>دیدن متن درس بدون بولد</summary><LessonText lesson={lesson} plain/></details>:null}
 </section>
}
