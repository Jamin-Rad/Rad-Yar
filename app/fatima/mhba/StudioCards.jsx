import React,{useEffect,useReducer,useRef,useState} from 'react';
import {useCourse} from './CourseContext';
import {boxDays,scheduleCard,selectBoxCards} from './leitner.js';
import {createReviewQueue} from './reviewQueue.js';
import {studyCards} from './flashcards.js';
import {initialCardSession,limitSession,reduceCardSession} from './flashcardSession.js';
import {StudioIcon} from './StudioTools.jsx';
import {Icon} from './ui.jsx';
const fa=n=>n.toLocaleString('fa-IR');

export default function StudioCards({lesson,data,patch}){
 const lessons=useCourse();const choices=Object.values(lessons).filter(l=>!lesson||l.id===lesson.id);
 const [selected,setSelected]=useState(()=>choices.filter(l=>lesson||[1,4,5].includes(l.id)).map(l=>l.id));const [content,setContent]=useState('core');const [limit,setLimit]=useState('10');const [mode,setMode]=useState('new');const [session,setSession]=useState(null);
 const cards=choices.filter(l=>selected.includes(l.id)).flatMap(studyCards).filter(c=>content==='all'||(content==='vocabulary'?c.source==='vocabulary':c.source!=='vocabulary'));const review=data.review||{};
 function start(m){const deck=limitSession(createReviewQueue(selectBoxCards(cards,review,m),review,false),limit);setMode(m);setSession({cards:deck,key:Date.now()});window.scrollTo({top:0,behavior:'instant'});}
 return <section className={`mbh-deck leitner-dashboard ${session?'has-recall-session':''}`}><div className="hub-page-heading"><div><h1>فلش‌کارت‌ها</h1><p>هر کارت، یک نکته · نوبت‌های کوتاه برای یادآوری فعال</p></div>{session?<button className="hub-outline" onClick={()=>setSession(null)}>بازگشت به جعبه‌ها</button>:null}</div>
 {session?<><h2 className="deck-session-title">{mode==='new'?'کارت‌های جدید':mode==='today'?'مرور امروز':`جعبهٔ ${fa(Number(mode))}`}</h2><CardSession key={session.key} cards={session.cards} data={data} patch={patch} showAll={()=>setSession(null)}/>{!session.cards.length?<button className="hub-primary" onClick={()=>setSession(null)}>انتخاب کارت‌ها</button>:null}</>:<>
 <div className="hub-lesson-selection"><h2>درس‌های این نوبت</h2><div>{choices.map(l=><label key={l.id}><input type="checkbox" checked={selected.includes(l.id)} onChange={()=>setSelected(s=>s.includes(l.id)?s.filter(id=>id!==l.id):[...s,l.id])}/><span>{l.fa}<small lang="de" dir="ltr">{l.de}</small></span></label>)}</div></div>
 <div className="recall-options"><label>محتوای کارت‌ها<select aria-label="محتوای کارت‌ها" value={content} onChange={e=>setContent(e.target.value)}><option value="core">مفاهیم و سؤال‌های جزوه</option><option value="vocabulary">واژه‌های کلیدی</option><option value="all">همهٔ کارت‌ها</option></select></label><label>اندازهٔ هر نوبت<select aria-label="اندازهٔ هر نوبت" value={limit} onChange={e=>setLimit(e.target.value)}><option value="10">۱۰ کارت</option><option value="20">۲۰ کارت</option><option value="all">همهٔ کارت‌های انتخاب‌شده</option></select></label></div>
 <div className="leitner-start"><button disabled={!selected.length} onClick={()=>start('new')}><span>کارت‌های جدید</span><strong>{fa(selectBoxCards(cards,review,'new').length)}</strong><small>انتخاب کن، بخوان، وارد جعبهٔ ۱ کن</small><StudioIcon name="next"/></button><button disabled={!selected.length} onClick={()=>start('today')}><span>مرور امروز</span><strong>{fa(selectBoxCards(cards,review,'today').length)}</strong><small>کارت‌هایی که زمان مرورشان رسیده</small><Icon name="clock"/></button></div>
 <div className="leitner-box-heading"><h2>جعبه‌های تو</h2><p>بلد بودم: یک جعبه جلوتر · بلد نبودم: بازگشت به جعبهٔ ۱</p></div>
 <div className="leitner-boxes">{boxDays.map((days,i)=>{const count=selectBoxCards(cards,review,String(i+1)).length;const due=selectBoxCards(cards,review,String(i+1)).filter(c=>review[c.id].due<=Date.now()).length;return <button key={days} disabled={!count} onClick={()=>start(String(i+1))} style={{'--box-tone':i}}><span className="box-paper"/><span className="box-paper second"/><span className="box-number">{fa(i+1)}</span><b>جعبهٔ {fa(i+1)}</b><strong>{fa(count)} کارت</strong><small>{fa(due)} برای امروز · فاصلهٔ {fa(days)} روز</small></button>;})}</div>
 <p className="hub-storage-note">پیشرفت و زمان مرور خودکار در همین مرورگر ذخیره می‌شود. برای انتقال به دستگاه دیگر، نسخهٔ پشتیبان بگیر.</p>
 </>}
 </section>;
}

function CardSession({cards,data,patch,showAll}){
 const [deck]=useState(()=>cards);
 const [state,dispatch]=useReducer((s,a)=>reduceCardSession(s,a,deck),initialCardSession);
 const stage=useRef(null);const ratingLock=useRef(false);const gesture=useRef(null);const quietClick=useRef(0);
 const card=deck[state.position];const rated=card&&Object.hasOwn(state.ratings,card.id);
 const count=Object.keys(state.ratings).length;
 function move(direction){dispatch({type:'move',direction});}
 function flip(){dispatch({type:'flip'});}
 function record(known){
  if(!card||!state.revealed||rated||ratingLock.current||state.done)return;
  ratingLock.current=true;
  const scheduled=scheduleCard(data.review?.[card.id],known);
  patch(p=>({...p,review:{...p.review,[card.id]:scheduled}}));
  dispatch({type:'rate',known});
 }
 useEffect(()=>{ratingLock.current=false;stage.current?.focus({preventScroll:true});},[card?.id,state.revealed,state.done]);
 useEffect(()=>{const key=e=>{
  if(state.done||e.repeat||document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,select,textarea,a,[contenteditable=true]'))return;
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}
  else if((e.code==='Space'||e.key==='Enter')&&!e.target.closest('button')){e.preventDefault();flip();}
  else if(['1','2','۱','۲'].includes(e.key)){e.preventDefault();record(e.key==='2'||e.key==='۲');}
 };window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[state,card?.id,data.review]);
 function swipeStart(e){if(e.pointerType!=='touch')return;if(!e.isPrimary){gesture.current=null;return;}gesture.current={id:e.pointerId,x:e.clientX,y:e.clientY};}
 function swipeEnd(e){const start=gesture.current;gesture.current=null;if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.8){quietClick.current=performance.now()+250;e.preventDefault();move(dx<0?1:-1);}}
 if(!card)return <div className="mbh-deck-empty"><Icon name="check" size={34}/><h2>در این بخش کارتی برای مطالعه نیست.</h2></div>;
 if(state.done){const known=Object.values(state.ratings).filter(Boolean).length;return <div className="recall-finished" role="status"><Icon name="check" size={34}/><h2>این نوبت تمام شد</h2><p>{fa(deck.length)} کارت مرور شد</p><div><span><strong>{fa(known)}</strong>بلد بودم</span><span><strong>{fa(deck.length-known)}</strong>نیاز به مرور</span></div><p>{known<deck.length?'کارت‌های سخت ۱۰ دقیقهٔ دیگر برای مرور آماده می‌شوند.':'زمان مرور بعدی در جعبه‌های یادگیری ثبت شد.'}</p><button className="hub-primary" onClick={showAll}>بازگشت به جعبه‌ها</button></div>;}
 const days=boxDays[scheduleCard(card.priorReview,true).box-1];
 const source=card.sourceQuestionId?`از سؤال جزوهٔ ${card.sourceQuestionId}`:card.source==='official'?'سؤال خود جزوه':card.source==='vocabulary'?'واژهٔ کلیدی':'یک نکتهٔ مهم';
 return <div className="recall-session">
  <div className="recall-progress" aria-live="polite"><span>کارت {fa(state.position+1)} از {fa(deck.length)}</span><small>{fa(count)} ارزیابی شده</small><div role="progressbar" aria-label="کارت‌های ارزیابی‌شده" aria-valuenow={count} aria-valuemin={0} aria-valuemax={deck.length}><i style={{width:`${count/deck.length*100}%`}}/></div></div>
  <div ref={stage} className={`recall-stage ${state.revealed?'is-revealed':''}`} role="button" tabIndex={0} aria-label={`${state.revealed?'پاسخ':'سؤال'}: ${state.revealed?card.model:card.text} — ${state.revealed?card.modelFa:card.fa}`} aria-describedby="recall-keys" onClick={()=>{if(performance.now()>=quietClick.current&&!window.getSelection()?.toString())flip();}} onPointerDown={swipeStart} onPointerUp={swipeEnd} onPointerCancel={()=>{gesture.current=null;}}>
   <div className="recall-rotor" key={card.id}>
    <article className="recall-face recall-front" aria-hidden={state.revealed} inert={state.revealed}>
     <div className="recall-meta"><span>درس {fa(card.lessonId)}</span><span>{source}</span></div>
     <div className="recall-face-body">
      {card.contextDe?<div className="recall-context"><p lang="de" dir="ltr">{card.contextDe}</p><p lang="fa" dir="rtl">{card.contextFa}</p></div>:null}
      <h2 lang="de" dir="ltr">{card.text}</h2><span className="recall-divider"/><p lang="fa" dir="rtl">{card.fa}</p>
     </div><span className="recall-face-hint"><StudioIcon name="flip" size={16}/>لمس برای دیدن پاسخ</span>
    </article>
    <article className="recall-face recall-back" aria-hidden={!state.revealed} inert={!state.revealed}>
     <div className="recall-meta"><span>پاسخ کوتاه</span><span>{source}</span></div>
     <div className="recall-face-body recall-answer"><p lang="de" dir="ltr">{card.model}</p><span className="recall-divider"/><p lang="fa" dir="rtl">{card.modelFa}</p></div>
     <span className="recall-face-hint"><StudioIcon name="flip" size={16}/>لمس برای برگشت به سؤال</span>
    </article>
   </div>
  </div>
  <div className="recall-actions">{!state.revealed?<button className="recall-reveal" onClick={flip}>نمایش پاسخ<small>اول پاسخ را به خاطر بیاور</small></button>:rated?<div className="recall-already" role="status"><Icon name="check" size={17}/>ارزیابی این کارت ثبت شده است</div>:<><button className="recall-again" aria-label="بلد نبودم" onClick={()=>record(false)}>بلد نبودم<small>۱۰ دقیقهٔ دیگر · کلید ۱</small></button><button className="recall-known" aria-label="بلد بودم" onClick={()=>record(true)}>بلد بودم<small>{fa(days)} روز دیگر · کلید ۲</small></button></>}</div>
  <nav className="recall-navigation" aria-label="جابه‌جایی فلش‌کارت"><button aria-label="کارت قبلی" disabled={state.position===0} onClick={()=>move(-1)}><StudioIcon name="next" size={18}/>قبلی</button><span>{card.chapterTitle||'بدون ارزیابی هم می‌توانی جابه‌جا شوی'}</span><button aria-label="کارت بعدی" disabled={state.position===deck.length-1} onClick={()=>move(1)}>بعدی<StudioIcon name="prev" size={18}/></button></nav>
  <p className="recall-key-hint" id="recall-keys"><span>لمس: چرخاندن · کشیدن افقی: قبلی و بعدی</span><span className="recall-keyboard-hint"> · Space: پاسخ · ۱ / ۲: ارزیابی</span></p>
 </div>;
}
