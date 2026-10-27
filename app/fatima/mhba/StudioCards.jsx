import React,{useState} from 'react';
import {nextReview} from './exam.js';
import {StudioIcon} from './StudioTools.jsx';
import {Empty,Icon} from './ui.jsx';

export default function StudioCards({lesson,data,patch}){
 const [type,setType]=useState('all');const [showAll,setShowAll]=useState(false);const [done,setDone]=useState([]);const [flipped,setFlipped]=useState(false);
 const personal=data.highlights.filter(h=>h.lessonId===1&&h.reviewEnabled).map(h=>({id:`highlight-${h.id}`,text:h.cue,fa:'هایلایت شخصی',model:h.text,modelFa:h.note||'',source:'highlight'}));
 const cards=[...lesson.cards,...personal].filter(c=>(type==='all'||c.source===type)&&!done.includes(c.id)&&(showAll||!data.review[c.id]||data.review[c.id].due<=Date.now()));
 const card=cards[0];
 function grade(known){patch(p=>({...p,review:{...p.review,[card.id]:nextReview(p.review[card.id],known)}}));setDone(d=>[...d,card.id]);setFlipped(false);}
 function filter(value){setType(value);setFlipped(false);}
 return <section className="studio-card-view"><div className="studio-section-heading"><div><h2>هر بار، کمی ماندگارتر.</h2><p>اول به یاد بیاور؛ بعد کارت را برگردان.</p></div><button className="outline" onClick={()=>{setShowAll(v=>!v);setDone([]);setFlipped(false);}}>{showAll?'مرورهای امروز':'همهٔ کارت‌ها'}</button></div>
  <div className="studio-card-filters" role="group" aria-label="نوع فلش‌کارت">{[['all','همه'],['official','سؤال‌های جزوه'],['concept','نکات مهم'],['vocabulary','واژه‌ها'],['highlight','هایلایت‌های من']].map(([value,label])=><button key={value} aria-pressed={type===value} className={type===value?'is-active':''} onClick={()=>filter(value)}>{label}</button>)}</div>
  <div className="studio-card-count"><span>{done.length.toLocaleString('fa-IR')} کارت مرور شد</span><span>{cards.length.toLocaleString('fa-IR')} کارت در صف</span></div>
  {card?<><article key={card.id} className={`studio-flashcard ${flipped?'is-flipped':''}`}><div className="studio-card-top"><span>{({official:'سؤال اصلی جزوه',concept:'نکتهٔ مهم فصل',vocabulary:'واژهٔ کلیدی',highlight:'هایلایت شخصی'})[card.source]}</span><StudioIcon name={flipped?'check':'flip'} size={22}/></div><div className="studio-card-content" key={String(flipped)}>{!flipped?<><h3 className={`de ${card.official?'official':''}`} lang="de" dir="ltr">{card.text}</h3><p className={card.official?'official':''} lang="fa">{card.fa}</p></>:<div className="studio-card-answer"><section lang="de" dir="ltr"><h4>ANTWORT</h4><p className="de">{card.model}</p></section><section lang="fa" dir="rtl"><h4>پاسخ فارسی</h4><p>{card.modelFa}</p></section></div>}</div><button className="studio-flip-button" aria-expanded={flipped} onClick={()=>setFlipped(v=>!v)}><StudioIcon name="flip"/>{flipped?'بازگشت به سؤال':'برگرداندن کارت و دیدن پاسخ'}</button></article><div className="studio-card-grade" aria-label="ارزیابی یادآوری">{flipped?<><button className="outline" onClick={()=>grade(false)}>نیاز به مرور دارم<small>۱۰ دقیقهٔ دیگر</small></button><button className="primary" onClick={()=>grade(true)}>بلد بودم <Icon name="check" size={17}/><small>مرور بعدی با فاصله</small></button></>:<p>پاسخ را با صدای ذهن خودت بگو؛ عجله‌ای نیست.</p>}</div></>:<Empty title="مرور این نوبت تمام شد.">کارت‌های سخت ده دقیقهٔ دیگر برمی‌گردند. برای ادامه، «همهٔ کارت‌ها» را انتخاب کن.</Empty>}
 </section>;
}
