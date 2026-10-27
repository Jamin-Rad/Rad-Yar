import React,{lazy,Suspense,useEffect,useState} from 'react';
import Link from 'next/link';
import {findSourceChunk} from './sourceChapters.js';
import {Question,Original} from './Study.jsx';
import {Icon,GlossaryProvider} from './ui.jsx';
import StudioReader from './StudioReader.jsx';
import StudioCards from './StudioCards.jsx';
import {StudioIcon,StudioToolbar} from './StudioTools.jsx';
const Exam=lazy(()=>import('./Exam.jsx'));
const tabs=[['read','مطالعه'],['questions','سؤال‌های جزوه'],['exam','صحیح / غلط'],['review','فلش‌کارت‌ها']];
const fa=value=>value.toLocaleString('fa-IR');

export default function LessonStudio({lesson,mode,route,data,patch,navigate,pick,storageError,backup}){
 const saved=data.read[1]||{};
 const [position,setPosition]=useState(()=>findSourceChunk(lesson.chunks,saved.page||4,saved.chapterId,saved.offset,saved.language));
 const [focus,setFocus]=useState(false);
 const [mapOpen,setMapOpen]=useState(false);
 const [theoryOpen,setTheoryOpen]=useState(()=>String(saved.chapterId||'').startsWith('1.7'));
 useEffect(()=>{setPosition(findSourceChunk(lesson.chunks,saved.page||4,saved.chapterId,saved.offset,saved.language));},[saved.page,saved.chapterId,saved.offset,saved.language,lesson.chunks]);
 useEffect(()=>{const escape=e=>{if(e.key==='Escape'){setFocus(false);setMapOpen(false);}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[]);
 const current=lesson.chunks[position];
 const chapter=lesson.chapters.find(c=>c.id===current.chapterId);
 useEffect(()=>{if(chapter.id.startsWith('1.7'))setTheoryOpen(true);},[chapter.id]);
 const studyChapters=lesson.chapters.filter(c=>/^1\./.test(c.id));
 const completed=(saved.completedChapters||[]).filter(id=>studyChapters.some(c=>c.id===id));
 const readProgress=Math.round(completed.length/studyChapters.length*100);
 function go(index){
  const target=lesson.chunks[Math.max(0,Math.min(lesson.chunks.length-1,index))];
  setPosition(lesson.chunks.indexOf(target));setMapOpen(false);
  patch(p=>({...p,lastLesson:1,read:{...p.read,1:{...p.read[1],page:target.page,chapterId:target.chapterId,offset:undefined,language:undefined}}}));
  if(mode!=='read')navigate('lesson/1/read');
  window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 function toggleComplete(){patch(p=>{const previous=p.read[1]||{};const list=previous.completedChapters||[];return{...p,read:{...p.read,1:{...previous,completedChapters:list.includes(chapter.id)?list.filter(id=>id!==chapter.id):[...list,chapter.id]}}};});}
 return <GlossaryProvider tone="studio"><div className={`mhba-scope mhba-studio ${focus?'studio-focus':''} ${mapOpen?'studio-map-open':''}`} lang="fa" dir="rtl" data-mhba-learning data-deutsch-learning>
  <a className="skip-link" href="#studio-content" onClick={e=>{e.preventDefault();document.getElementById('studio-content')?.focus();}}>رفتن به محتوای درس</a>
  <header className="studio-header"><button className="studio-brand mbh-wordmark" aria-label="صفحهٔ اصلی MBH" onClick={()=>navigate('home')}>MBH</button><nav aria-label="بخش‌های درس اول">{tabs.map(([to,label])=><button key={to} aria-current={mode===to?'page':undefined} className={mode===to?'is-active':''} onClick={()=>{setMapOpen(false);navigate(`lesson/1/${to}`);}}>{label}</button>)}</nav><Link href="/fatima" className="studio-account"><span className="studio-avatar">F</span><span>صفحهٔ فاطمه</span><StudioIcon name="next" size={14}/></Link></header>
  <div className="studio-layout">
   <aside className="studio-rail" aria-label="مسیر یادگیری درس اول"><div className="studio-rail-heading"><h2>مسیر یادگیری</h2><p>مدول ۱ · درس ۱</p><button className="studio-map-close" onClick={()=>setMapOpen(false)} aria-label="بستن فهرست"><Icon name="close"/></button></div>
    <div className="studio-progress"><p>{fa(completed.length)} از {fa(studyChapters.length)} بخش مرور شده</p><div role="progressbar" aria-label="بخش‌های مرورشده" aria-valuenow={completed.length} aria-valuemin={0} aria-valuemax={studyChapters.length}><span style={{width:readProgress+'%'}}/></div></div>
    <nav className="studio-chapters" aria-label="فصل‌های جزوه">{lesson.chapters.filter(c=>theoryOpen||c.id.split('.').length<3).map(c=><div className="studio-chapter-row" key={c.id}><button className={`studio-chapter-link ${c.id===chapter.id?'is-active':''} ${completed.includes(c.id)?'is-complete':''} ${c.id.split('.').length>2?'is-subchapter':''} ${c.id==='1.7'?'has-children':''}`} aria-current={c.id===chapter.id?'step':undefined} onClick={()=>go(lesson.chunks.findIndex(part=>part.chapterId===c.id))}><span className="studio-path-dot">{completed.includes(c.id)?<Icon name="check" size={10}/>:null}</span><span className="studio-chapter-id" dir="ltr">{/^1\./.test(c.id)?c.id:''}</span><span>{c.fa}</span></button>{c.id==='1.7'?<button className="studio-theory-toggle" aria-label="زیربخش‌های نظریه‌های اقتصادی" aria-expanded={theoryOpen} onClick={()=>setTheoryOpen(v=>!v)}><StudioIcon name="prev" size={14}/></button>:null}</div>)}</nav>
    <div className="studio-rail-bottom"><button onClick={()=>navigate('home')}><StudioIcon name="list" size={17}/>صفحهٔ اصلی</button><button onClick={backup}><Icon name="download" size={16}/>پشتیبان</button></div>
   </aside>
   <main className="studio-main" id="studio-content" tabIndex={-1} onPointerUp={pick} onKeyUp={e=>{if(e.key==='Shift')pick();}}>
    <div className="studio-intro"><div className="studio-title"><h1 className="de" lang="de" dir="ltr">Wirtschaftswissenschaften</h1><p>مبانی اقتصاد، به زبان ساده‌تر</p></div><div className="studio-intro-actions"><button className="studio-breadcrumb" onClick={()=>navigate('home')}>مدول یک / درس اول<StudioIcon name="prev" size={16}/></button><div><button className="studio-map-toggle" aria-expanded={mapOpen} onClick={()=>setMapOpen(v=>!v)}><StudioIcon name="list"/>فهرست فصل‌ها</button><button className={`studio-focus-toggle ${focus?'is-active':''}`} aria-pressed={focus} onClick={()=>setFocus(v=>!v)}><StudioIcon name="focus"/>{focus?'خروج از تمرکز':'حالت تمرکز'}</button></div></div></div>
    {storageError?<p className="notice" role="alert">ذخیره در مرورگر ممکن نشد؛ برای حفظ یادداشت‌ها پشتیبان بگیر.</p>:null}
    {mode==='read'?<StudioReader lesson={lesson} chapter={chapter} current={current} position={position} data={data} patch={patch} go={go} completed={completed.includes(chapter.id)} toggleComplete={toggleComplete} navigate={navigate}/>:mode==='questions'?<section className="studio-secondary studio-questions"><div className="studio-section-heading"><div><h2>سؤال‌های خود جزوه</h2><p>۱۰ سؤال اصلی با پاسخ کامل آلمانی و فارسی</p></div><Icon name="book" size={27}/></div><StudioToolbar data={data} patch={patch}/>{lesson.questions.map(q=><Question key={q.id} q={q} lesson={lesson} data={data}/>)}</section>:mode==='exam'?<div className="studio-secondary"><Suspense fallback={<p>در حال باز کردن تمرین…</p>}><Exam key={route} lesson={lesson} chapterId={route.split('/')[3]} data={data} patch={patch}/></Suspense></div>:mode==='review'?<StudioCards lesson={lesson} data={data} patch={patch}/>:<div className="studio-secondary"><Original lesson={lesson} initialPage={Number(route.split('/')[3])||current.page}/></div>}
    <footer className="studio-footer"><span>MBH</span><span>جزوهٔ اصلی MHBA · مدول ۱ · درس ۱</span><button onClick={backup}>یادداشت‌ها در همین مرورگر ذخیره می‌شوند <Icon name="download" size={12}/></button></footer>
   </main>
  </div>
 </div></GlossaryProvider>;
}
