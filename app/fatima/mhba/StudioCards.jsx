import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {useCourse} from './CourseContext';
import {intervals,nextReview} from './exam.js';
import {createReviewQueue} from './reviewQueue.js';
import {StudioIcon} from './StudioTools.jsx';
import {Icon} from './ui.jsx';
const fa=n=>n.toLocaleString('fa-IR');
const date=t=>new Intl.DateTimeFormat('fa-IR',{month:'long',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(t);

export default function StudioCards({lesson,data,patch,reviewOnly=false}){
 const lessons=useCourse();
 const [module,setModule]=useState('all');const [lessonId,setLessonId]=useState(lesson?String(lesson.id):'all');
 const [type,setType]=useState('all');const [onlyDue,setOnlyDue]=useState(reviewOnly);const [round,setRound]=useState(0);
 const choices=Object.values(lessons).filter(l=>(!lesson||l.id===lesson.id)&&(module==='all'||(l.id<=10?'1':'2')===module));
 const cards=choices.filter(l=>lessonId==='all'||String(l.id)===lessonId).flatMap(l=>l.cards).filter(c=>type==='all'||c.source===type);
 return <section className="mbh-deck"><div className="mbh-deck-heading"><h1>{reviewOnly?'مرور':'فلش‌کارت‌ها'}</h1><button className="mbh-text-control" onClick={()=>setRound(r=>r+1)}><Icon name="review" size={16}/>تازه‌سازی صف</button></div>
  <div className="mbh-deck-filters">{!lesson?<><label>مدول<select aria-label="مدول فلش‌کارت" value={module} onChange={e=>{setModule(e.target.value);setLessonId('all');}}><option value="all">همهٔ مدول‌ها</option><option value="1">مدول ۱</option><option value="2">مدول ۲</option></select></label><label>درس<select aria-label="درس فلش‌کارت" value={lessonId} onChange={e=>setLessonId(e.target.value)}><option value="all">همهٔ درس‌ها</option>{choices.map(l=><option key={l.id} value={l.id}>{l.id} · {l.fa}</option>)}</select></label></>:null}<label>نوع کارت<select aria-label="نوع فلش‌کارت" value={type} onChange={e=>setType(e.target.value)}>{[['all','همهٔ انواع'],['official','سؤال‌های جزوه'],['concept','نکات مهم'],['vocabulary','واژه‌ها']].map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><label>زمان مرور<select aria-label="زمان مرور" value={onlyDue?'due':'all'} onChange={e=>setOnlyDue(e.target.value==='due')}><option value="all">همهٔ کارت‌ها</option><option value="due">مرورهای امروز</option></select></label></div>
  <CardSession key={`${module}:${lessonId}:${type}:${onlyDue}:${round}`} cards={cards} data={data} patch={patch} onlyDue={onlyDue} showAll={()=>setOnlyDue(false)}/>
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
 function record(known){if(!card||!flipped||grade)return;const scheduled=nextReview(data.review[card.id],known);patch(p=>({...p,review:{...p.review,[card.id]:scheduled}}));setGrades(g=>({...g,[card.id]:{...scheduled,known}}));}
 if(!card)return <div className="mbh-deck-empty"><Icon name="check" size={34}/><h2>{cards.length?'مرورهای این نوبت تمام شده‌اند.':'برای این انتخاب هنوز کارتی آماده نشده است.'}</h2>{onlyDue&&cards.length?<button onClick={showAll}>مشاهدهٔ همهٔ کارت‌ها</button>:null}</div>;
 const knownDays=intervals[Math.min((card.priorReview?.level??-1)+1,intervals.length-1)];
 const source=({official:'سؤال خود جزوه',concept:'نکتهٔ مهم',vocabulary:'واژهٔ کلیدی'})[card.source];
 return <><div className="mbh-deck-count" aria-live="polite" aria-label={`کارت ${fa(position+1)} از ${fa(deck.length)}؛ ${fa(Object.keys(grades).length)} کارت ارزیابی شده`}><span>{fa(position+1)} / {fa(deck.length)}</span><small>{fa(Object.keys(grades).length)} کارت ارزیابی شده</small></div>
  <div className="mbh-flip-layout"><button className="mbh-card-direction" aria-label="کارت قبلی" disabled={position===0} onClick={()=>move(-1)}><span><StudioIcon name="next" size={31}/></span><b>قبلی</b><small>←</small></button>
   <div className={`mbh-flip-stage ${flipped?'is-flipped':''}`} style={{height}}>
    <div className="mbh-flip-rotor"><article ref={front} className="mbh-card-face mbh-card-front" aria-hidden={flipped}><div className="mbh-face-label">{source} · {card.official?card.id:`درس ${fa(card.lessonId)}`}</div><div className="mbh-front-content"><h2 className={`de ${card.official?'official':''}`} lang="de" dir="ltr">{card.text}</h2><span className="mbh-card-rule"/><p className={card.official?'official':''} lang="fa" dir="rtl">{card.fa}</p></div><button type="button" className="mbh-flip-hint" tabIndex={flipped?-1:0} aria-label="چرخاندن کارت" onClick={()=>setFlipped(true)}><StudioIcon name="flip"/>چرخاندن کارت</button></article>
     <article ref={back} className="mbh-card-face mbh-card-back" aria-hidden={!flipped}><div className="mbh-face-label">پاسخ · {source}</div><div className="mbh-back-content"><section lang="de" dir="ltr"><h3>Deutsch</h3><div className="mbh-german-answer">{card.model.split(/\n[ \t]*\n+/).map((part,i)=><p key={i} className="de">{part}</p>)}</div></section><section lang="fa" dir="rtl"><h3>فارسی</h3><p>{card.modelFa}</p></section></div><button type="button" className="mbh-flip-hint" tabIndex={flipped?0:-1} onClick={()=>setFlipped(false)}><StudioIcon name="flip"/>بازگشت به روی کارت</button></article></div>
   </div>
   <button className="mbh-card-direction next" aria-label="کارت بعدی" disabled={position===deck.length-1} onClick={()=>move(1)}><span><StudioIcon name="prev" size={31}/></span><b>بعدی</b><small>→</small></button>
  </div>
  <div className="mbh-grade-actions"><button disabled={!flipped||!!grade} className="mbh-unknown" onClick={()=>record(false)}><Icon name="close" size={22}/><span>بلد نبودم<small>۱۰ دقیقهٔ دیگر</small></span></button><button disabled={!flipped||!!grade} className="mbh-known" onClick={()=>record(true)}><Icon name="check" size={22}/><span>بلد بودم<small>{fa(knownDays)} روز دیگر</small></span></button></div>
  <div className="mbh-review-status" role="status">{grade?<><Icon name="check" size={16}/>{grade.known?'بلد بودم':'بلد نبودم'} ثبت شد · مرور بعدی: {date(grade.due)}</>:<><Icon name="clock" size={16}/>مرتب‌شده بر اساس زمان مرور</>}</div>
 </>;
}
