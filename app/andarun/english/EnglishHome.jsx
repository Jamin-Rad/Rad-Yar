import Link from 'next/link'
import { lessons, flashcards, categories } from './courseContent'
import { activeMistakes } from './courseEngine'
import styles from './home.module.css'

export function Arrow(){return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>}
function Icon({name}){
 const paths={
 home:<><path d="m3 10 9-7 9 7v11h-6v-7H9v7H3Z"/></>,
 lessons:<><path d="M12 5C8 3 5 3 2 4v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-6-1-10 1Zm0 0v16"/></>,
 cards:<><rect x="8" y="7" width="13" height="15" rx="2"/><path d="M16 3H5a2 2 0 0 0-2 2v12"/></>,
 practice:<><path d="m4 16 11-11 4 4L8 20l-5 1Zm9-9 4 4M3 21l1-5M17 3l4 4"/></>,
 mistakes:<><path d="m12 3 10 18H2Zm0 6v5m0 3v1"/></>,
 grammar:<><path d="M5 2h10l4 4v16H5Zm10 0v5h4M8 11h8M8 15h6M8 19h4"/></>,
 vocabulary:<><path d="M21 11a9 9 0 0 1-9 9H8l-6 2 2-6a9 9 0 1 1 17-5Z"/></>,
 sync:<><path d="M3 9a9 9 0 0 1 15-5l3 3M21 3v4h-4M21 15a9 9 0 0 1-15 5l-3-3M3 21v-4h4"/></>,
 cloud:<><path d="M6 19a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5 5 0 0 1 0 11Z"/></>
 }
 return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]||paths.lessons}</svg>
}
const statusLabels={loading:'Connecting',saving:'Syncing',saved:'Online',pending:'Saving changes',offline:'Offline'}
export default function EnglishHome({selectLesson,openCards,openReview,beginRandom,state,syncStatus,sync}) {
 const newest=lessons.at(-1),unfinished=state.session&&state.session.index<state.session.ids.length
 const mistakes=activeMistakes(state),due=mistakes.filter(q=>state.mistakes[q.id].due<=Date.now()).length
 function completed(id){return Object.keys(state.completedTests?.[id]||{}).length}
 return <div className={styles.home} lang="en" dir="ltr">
  <aside className={styles.sidebar}>
   <div className={styles.wordmark}>English<small>JAMINOVA</small></div>
   <nav aria-label="English navigation">
    <a href="#studio-top" className={styles.active} aria-current="page"><Icon name="home"/>Home</a>
    <a href="#your-lessons"><Icon name="lessons"/>Lessons</a>
    <button onClick={openCards}><Icon name="cards"/>Flashcards</button>
    <a href="#random-practice"><Icon name="practice"/>Practice</a>
    <button onClick={openReview}><Icon name="mistakes"/>Mistakes</button>
   </nav>
   <Link href="/andarun" className={styles.back}><span><Arrow/></span>Back to Jaminova</Link>
  </aside>
  <div className={styles.workspace}>
   <header className={styles.header} id="studio-top"><div><h1>Your learning studio</h1><p>Everyday English. One useful lesson at a time.</p></div><div className={styles.connection}><span role="status"><i className={syncStatus==='saved'?styles.online:styles.waiting}/>{statusLabels[syncStatus]}</span><button onClick={sync}><Icon name="sync"/>Sync</button></div></header>
   {unfinished?<div className={styles.resume}><span>Continue your saved {categories[state.session.category]?.toLowerCase()||'English'} practice.</span><button onClick={()=>beginRandom('resume')}>Resume practice <Arrow/></button></div>:null}
   <div className={styles.bodyGrid}>
    <div className={styles.learning}>
     <section className={styles.featured}><div className={styles.featureCopy}><h2>{newest.titleEn}</h2><p>{newest.goalEn}</p><p className={styles.grammar}><strong>Grammar:</strong> {newest.grammarEn}</p><button className={styles.primary} onClick={()=>selectLesson(newest.id)}>Open lesson {lessons.length} <Arrow/></button></div><img src="/english/home/headphones.webp" width="1456" height="1088" alt="" aria-hidden="true" className={styles.headphones} fetchpriority="high"/></section>
     <section className={styles.library} id="your-lessons"><h2>Your lessons</h2><p>B1 · {lessons.length} lessons</p><div className={styles.lessonGrid}>{lessons.map((lesson,i)=>{
      const count=completed(lesson.id)
      return <button key={lesson.id} className={`${styles.lessonTile} ${i===lessons.length-1?styles.latest:''}`} onClick={()=>selectLesson(lesson.id)} aria-label={`Open lesson ${i+1}: ${lesson.titleEn}. ${count} of 4 tests completed`}>
       <span className={styles.tileTop}><span className={styles.number} data-number={i+1}>{i+1}</span><span><strong>{lesson.titleEn}</strong><small>{lesson.grammarEn}</small></span></span>
       <span className={styles.tileBottom}><span><span className={styles.progressTrack}><span style={{width:count*25+'%'}}/></span><small>{count} of 4 tests completed</small></span><span className={styles.openIcon}><Arrow/></span></span>
      </button>
     })}</div></section>
    </div>
    <div className={styles.tools}>
     <section className={styles.quickPractice} id="random-practice"><h2>Quick practice</h2>{['grammar','vocabulary'].map(category=><button className={styles.practiceAction} aria-label={`Random ${category}`} key={category} onClick={()=>beginRandom(category)}><span className={styles.toolIcon}><Icon name={category}/></span><span><strong>Random {category}</strong><small>10 questions · all lessons</small></span><Arrow/></button>)}</section>
     <section className={styles.flashPanel}><h2>Keep the words.</h2><p>{flashcards.length} flashcards from your lessons.</p><img src="/english/home/cards.webp" width="1280" height="1280" loading="lazy" alt="" aria-hidden="true"/><button className={styles.primary} onClick={openCards}>Review flashcards <Arrow/></button></section>
     <section className={styles.mistakesPanel}><h2>Turn mistakes into progress.</h2><p>{mistakes.length?`${mistakes.length} saved mistakes · ${due} due now.`:'Your saved mistakes will appear here.'}</p><img src="/english/home/mistakes.webp" width="1280" height="1280" loading="lazy" alt="" aria-hidden="true"/><button className={styles.secondary} onClick={openReview}>Open mistake review <Arrow/></button></section>
    </div>
   </div>
   <footer className={styles.footer}><Icon name="cloud"/><span>{syncStatus==='saved'?'Your progress is saved online.':syncStatus==='offline'?'Your local copy is kept. Reconnect to sync.':'Your progress is waiting to sync.'}</span></footer>
  </div>
 </div>
}
