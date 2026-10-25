import { categories } from './courseContent'
import { activeMistakes } from './courseEngine'
import styles from './page.module.css'
const date=n=>new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(n)
export default function ReviewView({state,scope,now,begin}) {
 const mistakes=activeMistakes(state,scope)
 return <>
  <section className={styles.intro}><h1>Mistake review</h1><p>One correct review schedules the next one for tomorrow. Answer correctly when it is due to clear the item. Early practice does not advance the schedule.</p></section>
  <section className={styles.paper}><div className={styles.testGrid}>{Object.entries(categories).map(([category,label])=>{const entries=activeMistakes(state,scope,category);return <div className={styles.testCard} key={category}><h2>{label}</h2><p>{entries.length} items · {entries.filter(q=>state.mistakes[q.id].due<=now).length} due now</p><button className={styles.primary} disabled={!entries.length} onClick={()=>begin('review',category,scope)}>Review {label.toLowerCase()}</button></div>})}</div><ul className={styles.reviewList}>{mistakes.map(q=><li key={q.id}><span>{categories[q.category]} · {q.variants[0].prompt}</span><small>{state.mistakes[q.id].streak?'Next review: '+date(state.mistakes[q.id].due):'Ready to practise'}</small></li>)}</ul>{!mistakes.length?<p>No mistakes to review yet.</p>:null}</section>
  <section className={styles.paper}><h2>Recent practice</h2>{state.history.filter(h=>scope==='all'||h.lessonId===scope).slice(-12).reverse().map(h=><p key={h.id}>{categories[h.category]||'Mixed skills'} · {h.mode==='random'?'Random':h.mode==='review'?'Review':'Test'} · {h.correct} / {h.total} · {date(h.at)}</p>)}</section>
 </>
}
