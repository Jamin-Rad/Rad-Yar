import React,{useEffect,useState} from 'react';
import {useCourse} from './CourseContext';
import {extraChapterPractice} from './chapterPractice.js';
import {findSourceChunk} from './sourceChapters.js';
import {nextReview} from './exam.js';
import {Empty,HighlightText,Icon,PdfLink} from './ui.jsx';

export function Question({q,lesson,data}){
 const [reveal,setReveal]=useState(false);
 return <article className="question"><div className="question-meta"><span>سؤال خود جزوه · {q.id}</span></div>
 <p className="de question-text official" lang="de" dir="ltr"><HighlightText strong text={q.text} blockId={`q-${q.id}`} data={data} vocabulary={lesson.vocabulary}/></p>
 <p className="translation official" lang="fa" dir="rtl"><HighlightText strong text={q.fa} blockId={`q-${q.id}-fa`} data={data}/></p>
 <button className="outline reveal" onClick={()=>setReveal(!reveal)} aria-expanded={reveal}>{reveal?'بستن پاسخ رسمی':'نمایش پاسخ رسمی · Antwort anzeigen'}<Icon name="chevron" size={16}/></button>
 {reveal?<div className="answer"><h4>پاسخ رسمی جزوه · Originalantwort</h4><div className="bilingual-pair"><p className="source-answer de" lang="de" dir="ltr"><HighlightText text={q.officialAnswer} blockId={`official-answer-${q.id}`} data={data} vocabulary={lesson.vocabulary}/></p><p className="source-answer fa" lang="fa" dir="rtl"><HighlightText text={q.officialAnswerFa||'ترجمهٔ این پاسخ هنوز در نسخهٔ منابع موجود نیست.'} blockId={`official-answer-${q.id}-fa`} data={data}/></p></div><PdfLink file={lesson.solutions}>فایل پاسخ رسمی با نمودارها</PdfLink></div>:null}
 </article>;
}

export function Reader({lesson,data,patch}){
 const saved=data.read[lesson.id]||{};
 const [position,setPosition]=useState(()=>findSourceChunk(lesson.chunks,saved.page||3,saved.chapterId,saved.offset,saved.language));
 const [language,setLanguage]=useState('both');
 useEffect(()=>{if(saved.page)setPosition(findSourceChunk(lesson.chunks,saved.page,saved.chapterId,saved.offset,saved.language));},[saved.page,saved.chapterId,saved.offset,saved.language,lesson.chunks]);
 const current=lesson.chunks[position];
 const page=current.page;
 const originalPage=lesson.pages[page-1];
 const chapter=lesson.chapters.find(c=>c.id===current.chapterId);
 const lastInChapter=current.key===chapter.chunks.at(-1).key;
 const font=data.fontSize||19;
 function go(value){const index=Math.max(0,Math.min(lesson.chunks.length-1,value));const target=lesson.chunks[index];setPosition(index);patch(p=>({...p,lastLesson:lesson.id,read:{...p.read,[lesson.id]:{...p.read[lesson.id],page:target.page,chapterId:target.chapterId,offset:undefined,language:undefined,section:lesson.chapters.findIndex(c=>c.id===target.chapterId),complete:index===lesson.chunks.length-1}}}));document.querySelector('.annotation-toolbar')?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}

 const official=chapter.id==='fragen';
 return <div className="source-reader">
  <div className="source-navigation"><label>فصل جزوه <select aria-label="فصل جزوه" value={chapter.id} onChange={e=>go(lesson.chunks.findIndex(c=>c.chapterId===e.target.value))}>{lesson.chapters.map(c=><option value={c.id} key={c.id}>{c.id==='intro'?'':c.id+' · '}{c.fa}</option>)}</select></label><label>صفحه <select aria-label="صفحهٔ جزوه" value={current.key} onChange={e=>go(lesson.chunks.findIndex(c=>c.key===e.target.value))}>{lesson.chunks.map(c=><option key={c.key} value={c.key}>{c.page} · {c.chapterId==='intro'?'مقدمه':c.chapterId==='literatur'?'منابع':c.chapterId==='fragen'?'سؤال‌ها':c.chapterId}</option>)}</select> از {lesson.pages.length}</label><PdfLink file={lesson.pdf} page={page}>PDF همین صفحه با نمودارها</PdfLink></div>
  <div className="reading-paper original-paper" style={{'--reading-size':font+'px'}}>
   <div className="reading-tools"><div className="language-options" role="group" aria-label="زبان مطالعه">{[['both','آلمانی + فارسی'],['de','Deutsch'],['fa','فارسی']].map(([value,label])=><button className={language===value?'outline active':'outline'} aria-pressed={language===value} key={value} onClick={()=>setLanguage(value)}>{label}</button>)}</div><div className="font-controls"><button onClick={()=>patch({fontSize:Math.max(17,font-1)})} aria-label="کوچک کردن متن">A−</button><button onClick={()=>patch({fontSize:Math.min(25,font+1)})} aria-label="بزرگ کردن متن">A+</button></div></div>
   <div className="chapter-heading"><span className="chapter-index">{chapter.id==='intro'?'':chapter.id}</span><h2 className="de" lang="de" dir="ltr">{chapter.title}</h2><p>{chapter.fa}</p></div>
   <p className="source-caption">صفحهٔ {page} از جزوه · معنی واژه‌ها با مکث یا لمس</p>
   <div className={`bilingual-pair language-${language}`}>
    {language!=='fa'?<section className="source-column" lang="de" dir="ltr" aria-label="متن اصلی آلمانی"><h3 className="source-language">Deutsch · Original</h3><div className={'source-text de '+(official?'official':'')}><HighlightText text={current.text} strong={official} blockId={`original-${lesson.id}-${page}`} offset={current.deStart} sourceLength={originalPage.text.length} data={data} vocabulary={lesson.vocabulary}/></div></section>:null}
    {language!=='de'?<section className="source-column" lang="fa" dir="rtl" aria-label="ترجمهٔ کامل فارسی"><h3 className="source-language">فارسی · ترجمهٔ متن</h3><div className={'source-text fa '+(official?'official':'')}><HighlightText text={current.fa||'ترجمهٔ این صفحه هنوز در نسخهٔ منابع موجود نیست.'} strong={official} blockId={`original-${lesson.id}-${page}-fa`} offset={current.faStart} sourceLength={originalPage.fa.length} data={data}/></div></section>:null}
   </div>
   {lastInChapter?<section className="chapter-summary" aria-label="خلاصهٔ پایان فصل"><h3>خلاصهٔ این بخش · Zusammenfassung</h3><div className="bilingual-pair"><ul lang="de" dir="ltr" className="de">{chapter.summary.de.map((text,i)=><li key={i}><HighlightText text={text} blockId={`summary-${lesson.id}-${chapter.id}-de-${i}`} data={data} vocabulary={lesson.vocabulary}/></li>)}</ul><ul lang="fa" dir="rtl">{chapter.summary.fa.map((text,i)=><li key={i}><HighlightText text={text} blockId={`summary-${lesson.id}-${chapter.id}-fa-${i}`} data={data}/></li>)}</ul></div><div className="summary-actions"><a className="outline" href={`#lesson/${lesson.id}/review`}>فلش‌کارت‌های درس</a>{(chapter.statementIds.length||extraChapterPractice[`${lesson.id}:${chapter.id}`]?.length)?<a className="primary" href={`#lesson/${lesson.id}/exam/${chapter.id}`}>صحیح / غلط همین فصل</a>:null}</div></section>:null}
   <div className="chapter-footer"><button className="outline" disabled={position===0} onClick={()=>go(position-1)}>صفحهٔ قبل</button><span>{page} / {lesson.pages.length}</span><button className="primary" disabled={position===lesson.chunks.length-1} onClick={()=>go(position+1)}>{lastInChapter?'فصل بعد':'صفحهٔ بعد'} <Icon name="arrow" size={16}/></button></div>
  </div>
 </div>;
}

export function Original({lesson,initialPage=1}){
 return <div className="original"><div className="original-toolbar"><p className="small muted">نسخهٔ اصلی دانشگاه، شامل جدول‌ها و نمودارها. برای مطالعهٔ دوزبانه و علامت‌گذاری، تب «مطالعهٔ جزوه» را باز کن.</p><PdfLink file={lesson.pdf}/></div><iframe title="جزوهٔ اصلی دانشگاه با نمودارها" className="pdf-frame" src={`/fatima/mhba/materials/${lesson.pdf}#page=${initialPage}`}/></div>;
}

export function Review({data,patch,lessonId}){
 const lessons=useCourse();
 const [all,setAll]=useState(false);const [revealed,setRevealed]=useState(false);const [sessionDone,setDone]=useState([]);const [type,setType]=useState('all');
 const allQuestions=[...Object.values(lessons).filter(l=>!lessonId||l.id===lessonId).flatMap(l=>l.cards),...data.highlights.filter(h=>h.reviewEnabled&&(!lessonId||h.lessonId===lessonId)).map(h=>({id:`highlight-${h.id}`,text:h.cue,fa:'هایلایت شخصی شما',model:h.text,modelFa:h.note||'',rubric:'با متن هایلایت‌شدهٔ خودت مقایسه کن.',lessonId:h.lessonId,official:false,source:'highlight'}))];
 const queue=allQuestions.filter(q=>(type==='all'||q.source===type)&&!sessionDone.includes(q.id)&&(all||!data.review[q.id]||data.review[q.id].due<=Date.now()));
 const current=queue[0];
 function grade(known){patch(p=>({...p,review:{...p.review,[current.id]:nextReview(p.review[current.id],known)}}));setDone(d=>[...d,current.id]);setRevealed(false);}
 return <div className="review-view"><div className="section-top"><div><h2>فلش‌کارت‌ها · Lernkarten</h2><p className="muted">سؤال‌های اصلی، نکات فصل‌ها و واژه‌های کلیدی؛ پاسخ را از حافظه به یاد بیاور.</p></div><button className="outline" onClick={()=>{setAll(!all);setDone([]);setRevealed(false);}}>{all?'فقط مرورهای امروز':'همهٔ فلش‌کارت‌ها'}</button></div>
 <label className="card-filter">نوع کارت <select value={type} aria-label="نوع فلش‌کارت" onChange={e=>{setType(e.target.value);setRevealed(false);}}>{[['all','همه'],['official','سؤال‌های خود جزوه'],['concept','نکات مهم فصل‌ها'],['vocabulary','واژه‌ها'],['highlight','هایلایت‌های من']].map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
 <p className="small muted">{sessionDone.length} مرور انجام‌شده · {queue.length} کارت در صف</p>
 {current?<div className="review-card"><div className="question-meta"><span>{({official:'سؤال خود جزوه',concept:'نکتهٔ مهم',vocabulary:'واژهٔ کلیدی',highlight:'هایلایت من'})[current.source]} · درس {current.lessonId}</span></div><h3 className={'de '+(current.official?'official':'')} lang="de" dir={current.source==='highlight'?'auto':'ltr'}>{current.text}</h3><p className={current.official?'official':''} lang="fa" dir="rtl">{current.fa}</p>{!revealed?<button className="primary" onClick={()=>setRevealed(true)}>نمایش پاسخ · Antwort zeigen</button>:<><div className="answer bilingual-pair"><p className="de source-answer" lang="de" dir="ltr">{current.model}</p><p className="source-answer" lang="fa" dir="rtl">{current.modelFa}</p></div><p className="small muted">جوابت چطور بود؟</p><div className="recall-buttons"><button className="outline" onClick={()=>grade(false)}>سخت بود · ۱۰ دقیقه دیگر</button><button className="primary" onClick={()=>grade(true)}>بلد بودم · مرور با فاصله <Icon name="check" size={17}/></button></div></>}</div>:<Empty title="مرورهای این نوبت تمام شد.">مرورهای سخت، ۱۰ دقیقه بعد برمی‌گردند؛ کارت‌های بلدشده با فاصلهٔ ۱، ۳، ۷، ۱۴ و ۳۰ روز مرور می‌شوند.</Empty>}
 </div>;
}
export function Highlights({data,patch,navigate}){
 const lessons=useCourse();
 const [query,setQuery]=useState('');const list=data.highlights.filter(h=>`${h.text} ${h.note||''}`.includes(query));
 return <><div className="section-top"><div><h1>هایلایت‌های من</h1><p className="muted">همان قسمت‌هایی که خودت انتخاب کرده‌ای.</p></div><label className="search"><Icon name="search" size={18}/><input aria-label="جست‌وجوی هایلایت‌ها" placeholder="جست‌وجو در هایلایت‌ها…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
 {list.length?list.map(h=><article className="saved-highlight" key={h.id}><div className="question-meta"><button className="text-button" onClick={()=>{const l=lessons[h.lessonId];const section=l.sections.findIndex(c=>h.blockId.startsWith(c.id+'-'));if(section>=0)patch(p=>({...p,read:{...p.read,[l.id]:{...p.read[l.id],section}}}));const original=h.blockId.match(/^original-\d+-(\d+)(?:-fa)?$/);if(original)patch(p=>({...p,read:{...p.read,[l.id]:{...p.read[l.id],page:Number(original[1]),chapterId:undefined,offset:h.start,language:h.blockId.endsWith('-fa')?'fa':'de'}}}));navigate(`lesson/${l.id}/read`);}}>درس {h.lessonId} · {lessons[h.lessonId]?.fa}</button><button className="icon-button" aria-label="حذف هایلایت" onClick={()=>patch(p=>({...p,highlights:p.highlights.filter(x=>x.id!==h.id)}))}><Icon name="close" size={17}/></button></div><blockquote dir="auto" className={h.tool==='underline'?'annotation-clear annotation-underline':`highlight-${h.color}`} lang={/[\u0600-\u06ff]/.test(h.text)?'fa':'de'}>{h.text}</blockquote><textarea aria-label="یادداشت برای هایلایت" placeholder="یادداشت من…" value={h.note||''} onChange={e=>patch(p=>({...p,highlights:p.highlights.map(x=>x.id===h.id?{...x,note:e.target.value}:x)}))}/><div className="highlight-review"><button className="outline" onClick={()=>patch(p=>({...p,highlights:p.highlights.map(x=>x.id===h.id?{...x,reviewEnabled:!x.reviewEnabled,cue:x.cue||`دربارهٔ ${lessons[x.lessonId].fa} چه چیزی از این بخش به یاد داری؟`}:x)}))}>{h.reviewEnabled?'حذف از صف مرور':'به مرور اضافه کن'}<Icon name="review" size={16}/></button>{h.reviewEnabled?<label>پرسش روی کارت مرور<input aria-label="پرسش روی کارت مرور" value={h.cue||''} onChange={e=>patch(p=>({...p,highlights:p.highlights.map(x=>x.id===h.id?{...x,cue:e.target.value}:x)}))}/></label>:null}</div></article>):<Empty title={query?'نتیجه‌ای پیدا نشد.':'اولین هایلایتت را بساز.'}>در صفحهٔ درس، هایلایت یا زیرخط را از نوار بالا انتخاب کن و روی متن بکش؛ خودکار ذخیره می‌شود.</Empty>}</>;
}
