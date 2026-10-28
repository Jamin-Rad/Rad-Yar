import StudyNotes from './StudyNotes.jsx';
import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {useCourse} from './CourseContext';
import {boxDays,scheduleCard,selectBoxCards} from './leitner.js';
import {createReviewQueue} from './reviewQueue.js';
import {StudioIcon} from './StudioTools.jsx';
import {Icon} from './ui.jsx';
const fa=n=>n.toLocaleString('fa-IR');
const date=t=>new Intl.DateTimeFormat('fa-IR',{month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(t);

export default function StudioCards({lesson,data,patch}){
 const lessons=useCourse();const choices=Object.values(lessons).filter(l=>!lesson||l.id===lesson.id);
 const [selected,setSelected]=useState(()=>choices.map(l=>l.id));const [mode,setMode]=useState('new');const [session,setSession]=useState(null);
 const cards=choices.filter(l=>selected.includes(l.id)).flatMap(l=>l.cards);const review=data.review||{};
 function start(m){const deck=selectBoxCards(cards,review,m);setMode(m);setSession({cards:deck,key:Date.now()});}
 return <section className="mbh-deck leitner-dashboard"><div className="hub-page-heading"><div><h1>فلش‌کارت‌ها</h1><p>کارت‌های جدید، مرور امروز و جعبه‌های یادگیری</p></div>{session?<button className="hub-outline" onClick={()=>setSession(null)}>بازگشت به جعبه‌ها</button>:null}</div>
 {session?<><h2 className="deck-session-title">{mode==='new'?'کارت‌های جدید':mode==='today'?'مرور امروز':`جعبهٔ ${fa(Number(mode))}`}</h2><CardSession key={session.key} cards={session.cards} data={data} patch={patch} onlyDue={false} showAll={()=>setSession(null)}/>{!session.cards.length?<button className="hub-primary" onClick={()=>setSession(null)}>انتخاب کارت‌ها</button>:null}</>:<>
 <div className="hub-lesson-selection"><h2>درس‌های این نوبت</h2><div>{choices.map(l=><label key={l.id}><input type="checkbox" checked={selected.includes(l.id)} onChange={()=>setSelected(s=>s.includes(l.id)?s.filter(id=>id!==l.id):[...s,l.id])}/><span>{l.fa}<small lang="de" dir="ltr">{l.de}</small></span></label>)}</div></div>
 <div className="leitner-start"><button disabled={!selected.length} onClick={()=>start('new')}><span>کارت‌های جدید</span><strong>{fa(selectBoxCards(cards,review,'new').length)}</strong><small>انتخاب کن، بخوان، وارد جعبهٔ ۱ کن</small><StudioIcon name="next"/></button><button disabled={!selected.length} onClick={()=>start('today')}><span>مرور امروز</span><strong>{fa(selectBoxCards(cards,review,'today').length)}</strong><small>کارت‌هایی که زمان مرورشان رسیده</small><Icon name="clock"/></button></div>
 <div className="leitner-box-heading"><h2>جعبه‌های تو</h2><p>بلد بودم: یک جعبه جلوتر · بلد نبودم: بازگشت به جعبهٔ ۱</p></div>
 <div className="leitner-boxes">{boxDays.map((days,i)=>{const count=selectBoxCards(cards,review,String(i+1)).length;const due=selectBoxCards(cards,review,String(i+1)).filter(c=>review[c.id].due<=Date.now()).length;return <button key={days} disabled={!count} onClick={()=>start(String(i+1))} style={{'--box-tone':i}}><span className="box-paper"/><span className="box-paper second"/><span className="box-number">{fa(i+1)}</span><b>جعبهٔ {fa(i+1)}</b><strong>{fa(count)} کارت</strong><small>{fa(due)} برای امروز · فاصلهٔ {fa(days)} روز</small></button>;})}</div>
 <p className="hub-storage-note">پیشرفت و زمان مرور خودکار در همین مرورگر ذخیره می‌شود. برای انتقال به دستگاه دیگر، نسخهٔ پشتیبان بگیر.</p>
 </>}
 </section>;
}

function CardSession({cards,data,patch,onlyDue,showAll}){
 const [deck]=useState(()=>createReviewQueue(cards,data.review,onlyDue));
 const [position,setPosition]=useState(0);const [flipped,setFlipped]=useState(false);const [grades,setGrades]=useState({});
 const front=useRef(null);const back=useRef(null);const [height,setHeight]=useState(350);
 const card=deck[position];const grade=card&&grades[card.id];
 const move=direction=>{setPosition(p=>Math.max(0,Math.min(deck.length-1,p+direction)));setFlipped(false);};
 useLayoutEffect(()=>{
  const measure=()=>{const face=flipped?back.current:front.current;if(face)setHeight(Math.max(330,face.scrollHeight));};
  measure();const observer=new ResizeObserver(measure);if(front.current)observer.observe(front.current);if(back.current)observer.observe(back.current);return()=>observer.disconnect();
 },[card?.id,flipped]);
 useEffect(()=>{const key=e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,select,textarea,[contenteditable=true]'))return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[deck.length]);
 function record(known){if(!card||!flipped||grade)return;const scheduled=scheduleCard(data.review?.[card.id],known);patch(p=>({...p,review:{...p.review,[card.id]:scheduled}}));setGrades(g=>({...g,[card.id]:{...scheduled,known}}));}
 if(!card)return <div className="mbh-deck-empty"><Icon name="check" size={34}/><h2>در این بخش کارتی برای مطالعه نیست.</h2>{onlyDue&&cards.length?<button onClick={showAll}>مشاهدهٔ همهٔ کارت‌ها</button>:null}</div>;
 const knownDays=boxDays[scheduleCard(card.priorReview,true).box-1];
 const source=({official:'سؤال خود جزوه',concept:'نکتهٔ مهم',vocabulary:'واژهٔ کلیدی'})[card.source];
 return <><div className="mbh-deck-count" aria-live="polite" aria-label={`کارت ${fa(position+1)} از ${fa(deck.length)}؛ ${fa(Object.keys(grades).length)} کارت ارزیابی شده`}><span>{fa(position+1)} / {fa(deck.length)}</span><small>{fa(Object.keys(grades).length)} کارت ارزیابی شده</small></div>
  <div className="mbh-flip-layout"><button className="mbh-card-direction" aria-label="کارت قبلی" disabled={position===0} onClick={()=>move(-1)}><span><StudioIcon name="next" size={31}/></span><b>قبلی</b><small>←</small></button>
   <div className={`mbh-flip-stage ${flipped?'is-flipped':''}`} style={{height}}>
    <div className="mbh-flip-rotor"><article ref={front} className="mbh-card-face mbh-card-front" aria-hidden={flipped} inert={flipped}><div className="mbh-face-label">{source} · {card.official?card.id:`درس ${fa(card.lessonId)}`}</div><div className="mbh-front-content"><h2 className={`de ${card.official?'official':''}`} lang="de" dir="ltr">{card.text}</h2><span className="mbh-card-rule"/><p className={card.official?'official':''} lang="fa" dir="rtl">{card.fa}</p></div><button type="button" className="mbh-flip-hint" tabIndex={flipped?-1:0} aria-label="چرخاندن کارت" onClick={()=>setFlipped(true)}><StudioIcon name="flip"/>چرخاندن کارت</button></article>
     <article ref={back} className="mbh-card-face mbh-card-back" aria-hidden={!flipped} inert={!flipped}><div className="mbh-face-label">پاسخ · {source}</div><div className="mbh-back-content"><section lang="de" dir="ltr"><h3>Deutsch</h3><div className="mbh-german-answer">{card.model.split(/\n[ \t]*\n+/).map((part,i)=><p key={i} className="de">{part}</p>)}</div></section><section lang="fa" dir="rtl"><h3>فارسی</h3><p>{card.modelFa}</p></section></div><StudyNotes notes={card.studyNotes}/><button type="button" className="mbh-flip-hint" tabIndex={flipped?0:-1} onClick={()=>setFlipped(false)}><StudioIcon name="flip"/>بازگشت به روی کارت</button></article></div>
   </div>
   <button className="mbh-card-direction next" aria-label="کارت بعدی" disabled={position===deck.length-1} onClick={()=>move(1)}><span><StudioIcon name="prev" size={31}/></span><b>بعدی</b><small>→</small></button>
  </div>
  <div className="mbh-grade-actions"><button disabled={!flipped||!!grade} className="mbh-unknown" onClick={()=>record(false)}><Icon name="close" size={22}/><span>بلد نبودم<small>۱۰ دقیقهٔ دیگر</small></span></button><button disabled={!flipped||!!grade} className="mbh-known" onClick={()=>record(true)}><Icon name="check" size={22}/><span>بلد بودم<small>{fa(knownDays)} روز دیگر</small></span></button></div>
  <div className="mbh-review-status" role="status">{grade?<><Icon name="check" size={16}/>{grade.known?'بلد بودم':'بلد نبودم'} ثبت شد · مرور بعدی: {date(grade.due)}</>:<><Icon name="clock" size={16}/>برای دیدن پاسخ، کارت را بچرخان</>}</div>
 </>;
}
