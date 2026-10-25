'use client'
import { useState } from 'react'
import { flashcards, flashcardMap } from './courseContent'
import { dueCards, rateCard } from './courseEngine'
import styles from './page.module.css'

export default function Flashcards({lesson,state,update,now}) {
 const [queue,setQueue]=useState([]),[index,setIndex]=useState(0),[flipped,setFlipped]=useState(false)
 const [running,setRunning]=useState(false),[notice,setNotice]=useState('')
 const scope=lesson?.id||'all',deck=flashcards.filter(c=>scope==='all'||c.lessonId===scope)
 const due=dueCards(state,scope,now),card=flashcardMap[queue[index]]
 function begin(all=false){setQueue((all?deck:due).map(c=>c.id));setIndex(0);setFlipped(false);setRunning(true);setNotice('')}
 function rate(remembered){
   const next=rateCard(state,card.id,remembered,Date.now());update(next)
   setNotice(next===state?'Early practice: your review date stays the same.':remembered?'Saved for your next review.':'Saved for another review in 10 minutes.')
   setFlipped(false);setIndex(i=>i+1)
 }
 function speak(){
   if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){setNotice('Speech is unavailable in this browser.');return}
   window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(card.term);u.lang='en-GB';u.rate=0.85;window.speechSynthesis.speak(u)
 }
 return <section className={styles.paper}>
   <h2>Words worth keeping.</h2><p>Reveal the meaning, then choose how well you remembered it.</p>
   <p>{due.length} cards due · Review after 1, 3, 7, 14 and 30 days. “Again” brings the card back in 10 minutes.</p>
   {!running?<div className={styles.actions}><button className={styles.primary} disabled={!due.length} onClick={()=>begin()}>Review due cards</button><button className={styles.secondary} onClick={()=>begin(true)}>Practice all {deck.length} cards</button></div>
   :card?<div className={styles.flashcard}>
     <p className={styles.muted}>Card {index+1} of {queue.length}</p>
     <h3 lang="en" dir="ltr">{card.term}</h3><button className={styles.textButton} onClick={speak}>Listen</button>
     {flipped?<><p className={styles.cardMeaning+' '+styles.persian} lang="fa" dir="rtl">{card.meaning}</p><p lang="en" dir="ltr" className={styles.example}>{card.example}</p><div className={styles.actions}><button className={styles.secondary} onClick={()=>rate(false)}>Again</button><button className={styles.primary} onClick={()=>rate(true)}>Remembered</button></div></>:<button className={styles.primary} onClick={()=>setFlipped(true)}>Reveal meaning</button>}
   </div>:<div role="status"><h3>Review complete.</h3><button className={styles.secondary} onClick={()=>setRunning(false)}>Back to cards</button></div>}
   {notice?<p className={styles.muted} role="status">{notice}</p>:null}
 </section>
}
