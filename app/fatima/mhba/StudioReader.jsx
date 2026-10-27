import React,{useState} from 'react';
import {HighlightText,Icon,PdfLink} from './ui.jsx';
import {StudioIcon,StudioToolbar} from './StudioTools.jsx';
import {statements} from './exam.js';
import {statementTranslations,explanationsDe} from './statementTranslations.js';
import {extraChapterPractice} from './chapterPractice.js';

function QuickRecall({lesson,chapter,navigate}){
 const [index,setIndex]=useState(0);const [choice,setChoice]=useState(null);
 const questions=[...chapter.statementIds.map(i=>({...statements[lesson.id][i],fa:statementTranslations[lesson.id][i],whyDe:explanationsDe[lesson.id][i]})),...(extraChapterPractice[`${lesson.id}:${chapter.id}`]||[])];
 if(!questions.length)return null;
 const q=questions[index%questions.length];
 return <div className="studio-quick-check"><div className="studio-quick-heading"><span><StudioIcon name="spark"/>یک مکث برای یادگیری</span><small>{index%questions.length+1} / {questions.length}</small></div><p className="de" lang="de" dir="ltr">{q.text}</p><p lang="fa" className="studio-quick-fa">{q.fa}</p><div className="studio-quick-options">{[[true,'Richtig · صحیح'],[false,'Falsch · غلط']].map(([value,label])=><button key={label} disabled={choice!==null} aria-pressed={choice===value} className={choice===value?'is-active':''} onClick={()=>setChoice(value)}>{label}</button>)}</div>{choice!==null?<div className={`studio-feedback ${choice===q.answer?'correct':'incorrect'}`} role="status"><strong>{choice===q.answer?'درست به یاد آوردی.':'یک بار دیگر مرور کن.'}</strong><p className="de" lang="de" dir="ltr">{q.whyDe}</p><p>{q.why}</p><div><button onClick={()=>{setIndex(i=>i+1);setChoice(null);}}>گزارهٔ بعدی<StudioIcon name="next" size={14}/></button><button onClick={()=>navigate(`lesson/1/exam/${chapter.id}`)}>تمرین کامل این فصل</button></div></div>:null}</div>;
}

function ChapterSummary({lesson,chapter,data,navigate,completed,toggleComplete}){
 const [recall,setRecall]=useState(false);
 const hasPractice=chapter.statementIds.length||extraChapterPractice[`${lesson.id}:${chapter.id}`]?.length;
 return <section className="studio-summary" aria-label="خلاصهٔ پایان بخش"><div className="studio-summary-heading"><h3><Icon name="book" size={22}/>خلاصهٔ این بخش</h3>{hasPractice?<button className="studio-recall-button" aria-expanded={recall} onClick={()=>setRecall(v=>!v)}><StudioIcon name="spark"/>{recall?'بستن تمرین کوتاه':'خودت را امتحان کن'}<StudioIcon name="next" size={15}/></button>:null}</div><div className="studio-summary-pair"><ul className="de" lang="de" dir="ltr">{chapter.summary.de.map((text,i)=><li key={i}><HighlightText text={text} blockId={`summary-${lesson.id}-${chapter.id}-de-${i}`} data={data} vocabulary={lesson.vocabulary}/></li>)}</ul><ul lang="fa" dir="rtl">{chapter.summary.fa.map((text,i)=><li key={i}><HighlightText text={text} blockId={`summary-${lesson.id}-${chapter.id}-fa-${i}`} data={data}/></li>)}</ul></div>{recall?<QuickRecall key={chapter.id} lesson={lesson} chapter={chapter} navigate={navigate}/>:null}{/^1\./.test(chapter.id)?<button className={`studio-complete-button ${completed?'is-complete':''}`} aria-pressed={completed} onClick={toggleComplete}><span>{completed?<Icon name="check" size={14}/>:null}</span>{completed?'این بخش را مرور کرده‌ام':'این بخش را مرور کردم'}</button>:null}</section>;
}

export default function StudioReader({lesson,chapter,current,position,data,patch,go,completed,toggleComplete,navigate}){
 const [showPersian,setShowPersian]=useState(true);
 const original=lesson.pages[current.page-1];
 const lastInChapter=current.key===chapter.chunks.at(-1).key;
 const official=chapter.id==='fragen';
 const font=data.fontSize||19;
 return <div className="studio-reader" style={{'--studio-reading-size':font+'px'}}>
  <article className="studio-paper"><div className="studio-paper-heading"><div><h2 className="de" lang="de" dir="ltr">{chapter.title}</h2><p>{chapter.fa}</p></div><div className="studio-page-controls"><button aria-label="صفحهٔ قبل" disabled={position===0} onClick={()=>go(position-1)}><StudioIcon name="prev"/></button><label>صفحه <select aria-label="صفحهٔ جزوه" value={current.key} onChange={e=>go(lesson.chunks.findIndex(c=>c.key===e.target.value))}>{lesson.chunks.map(c=><option key={c.key} value={c.key}>{c.page} · {c.chapterId==='intro'?'مقدمه':c.chapterId==='fragen'?'سؤال‌ها':c.chapterId==='literatur'?'منابع':c.chapterId}</option>)}</select> از ۴۵</label><button aria-label="صفحهٔ بعد" disabled={position===lesson.chunks.length-1} onClick={()=>go(position+1)}><StudioIcon name="next"/></button></div></div>
   <StudioToolbar data={data} patch={patch} showPersian={showPersian} onLanguage={()=>setShowPersian(v=>!v)}/>
   <div className={`studio-source-pair ${showPersian?'':'studio-german-only'}`}>
    <section className="studio-source studio-source-de" lang="de" dir="ltr" aria-label="متن اصلی آلمانی"><h3>DEUTSCH · ORIGINAL</h3><div className="de"><HighlightText reflow text={current.text} strong={official} blockId={`original-1-${current.page}`} offset={current.deStart} sourceLength={original.text.length} data={data} vocabulary={lesson.vocabulary}/></div></section>
    {showPersian?<section className="studio-source studio-source-fa" lang="fa" dir="rtl" aria-label="ترجمهٔ کامل فارسی"><h3>فارسی · ترجمهٔ کامل</h3><div><HighlightText reflow text={current.fa} strong={official} blockId={`original-1-${current.page}-fa`} offset={current.faStart} sourceLength={original.fa.length} data={data}/></div></section>:null}
   </div>
   <div className="studio-paper-footer"><span>معنی واژه‌های خط‌چین‌دار با مکث یا لمس</span><div className="studio-font-controls"><button aria-label="کوچک کردن متن" disabled={font<=17} onClick={()=>patch({fontSize:Math.max(17,font-1)})}>A−</button><button aria-label="بزرگ کردن متن" disabled={font>=25} onClick={()=>patch({fontSize:Math.min(25,font+1)})}>A+</button></div><PdfLink file={lesson.pdf} page={current.page}>PDF همین صفحه</PdfLink></div>
  </article>
  {lastInChapter?<ChapterSummary key={chapter.id} lesson={lesson} chapter={chapter} data={data} navigate={navigate} completed={completed} toggleComplete={toggleComplete}/>:null}
  <nav className="studio-page-footer" aria-label="ادامهٔ مطالعه"><button disabled={position===0} onClick={()=>go(position-1)}><StudioIcon name="prev"/><span>صفحهٔ قبل<small>{position>0?lesson.chunks[position-1].chapterId:''}</small></span></button><button onClick={()=>navigate('home')}><StudioIcon name="list"/><span>بازگشت به فهرست درس‌ها</span></button><button disabled={position===lesson.chunks.length-1} onClick={()=>go(position+1)}><span>{lastInChapter?'بخش بعد':'ادامهٔ مطالعه'}<small>{position<lesson.chunks.length-1?lesson.chapters.find(c=>c.id===lesson.chunks[position+1].chapterId)?.fa:''}</small></span><StudioIcon name="next"/></button></nav>
 </div>;
}
