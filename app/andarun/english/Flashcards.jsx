'use client'
import { useState } from 'react'
import { flashcards, flashcardMap } from './courseContent'
import { dueCards, rateCard } from './courseEngine'
import styles from './page.module.css'

export default function Flashcards({lesson,state,update,now}) {
 const [queue,setQueue]=useState([]),[index,setIndex]=useState(0),[flipped,setFlipped]=useState(false)
 const [running,setRunning]=useState(false),[notice,setNotice]=useState('')
 const due=dueCards(state,lesson.id,now)
 const card=flashcardMap[queue[index]]
 function begin(all=false){
   setQueue((all?flashcards.filter(c=>c.lessonId===lesson.id):due).map(c=>c.id));setIndex(0);setFlipped(false);setRunning(true);setNotice('')
 }
 function rate(remembered){
   const next=rateCard(state,card.id,remembered,Date.now())
   update(next)
   setNotice(next===state?'تمرین زودتر از موعد بود؛ زمان مرور بعدی تغییر نکرد.':remembered?'برای مرور بعدی ذخیره شد.':'برای مرور دوباره در ۱۰ دقیقه ذخیره شد.')
   setFlipped(false);setIndex(i=>i+1)
 }
 function speak(){
   if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){setNotice('پخش گفتار در این مرورگر موجود نیست.');return}
   window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(card.term);u.lang='en-GB';u.rate=0.85;window.speechSynthesis.speak(u)
 }
 return <section className={styles.paper}>
   <h2>فلش‌کارت‌های درس</h2><p>عبارت را ببین، معنی را آشکار کن و میزان یادآوری را مشخص کن. نوشتن لازم نیست.</p>
   <p>{due.length} کارت آمادهٔ مرور · فاصله‌ها: ۱، ۳، ۷، ۱۴ و ۳۰ روز؛ «دوباره» یعنی ۱۰ دقیقه بعد.</p>
   {!running?<div className={styles.actions}><button className={styles.primary} disabled={!due.length} onClick={()=>begin()}>مرور کارت‌های آماده</button><button className={styles.secondary} onClick={()=>begin(true)}>تمرین همهٔ ۱۰ کارت</button></div>
   :card?<div className={styles.flashcard}>
     <p className={styles.muted}>کارت {index+1} از {queue.length}</p>
     <h3 lang="en" dir="ltr">{card.term}</h3><button className={styles.textButton} onClick={speak}>شنیدن عبارت</button>
     {flipped?<><p className={styles.cardMeaning}>{card.meaning}</p><p lang="en" dir="ltr" className={styles.example}>{card.example}</p><div className={styles.actions}><button className={styles.secondary} onClick={()=>rate(false)}>دوباره</button><button className={styles.primary} onClick={()=>rate(true)}>یادم بود</button></div></>:<button className={styles.primary} onClick={()=>setFlipped(true)}>نمایش معنی</button>}
   </div>:<div role="status"><h3>مرور این نوبت تمام شد.</h3><button className={styles.secondary} onClick={()=>setRunning(false)}>بازگشت به کارت‌ها</button></div>}
   {notice?<p className={styles.muted} role="status">{notice}</p>:null}
 </section>
}
