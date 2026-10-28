import React,{useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {findSourceChunk} from './sourceChapters.js';
import {Icon,GlossaryProvider} from './ui.jsx';
import StudioReader from './StudioReader.jsx';
import {StudioIcon} from './StudioTools.jsx';
const fa=value=>value.toLocaleString('fa-IR');

export default function LessonStudio({lesson,mode,route,data,patch,navigate,pick,annotateRange,eraseSelection,storageError,backup}){
 const saved=data.read[lesson.id]||{};
 const [position,setPosition]=useState(()=>findSourceChunk(lesson.chunks,saved.page||4,saved.chapterId,saved.offset,saved.language));
 const [focus,setFocus]=useState(false);const scrollBeforeBook=useRef(0);const previousFocus=useRef(false);
 function toggleBook(){if(!focus)scrollBeforeBook.current=window.scrollY;setFocus(v=>!v);}
 useEffect(()=>{if(!focus&&previousFocus.current)requestAnimationFrame(()=>window.scrollTo(0,scrollBeforeBook.current));previousFocus.current=focus;},[focus]);
 const [mapOpen,setMapOpen]=useState(false);const mapDialog=useRef(null);
 useEffect(()=>{const d=mapDialog.current;if(mapOpen&&!d.open)d.showModal();else if(!mapOpen&&d.open)d.close();},[mapOpen]);
 const [theoryOpen,setTheoryOpen]=useState(()=>String(saved.chapterId||'').startsWith('1.7'));
 useEffect(()=>{setPosition(findSourceChunk(lesson.chunks,saved.page||4,saved.chapterId,saved.offset,saved.language));},[saved.page,saved.chapterId,saved.offset,saved.language,lesson.chunks]);
 useEffect(()=>{const escape=e=>{if(e.key==='Escape'){if(mapOpen)setMapOpen(false);else setFocus(false);}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[mapOpen]);
 useEffect(()=>{if(!focus&&!mapOpen)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=before;};},[focus,mapOpen]);
 const current=lesson.chunks[position];
 const chapter=lesson.chapters.find(c=>c.id===current.chapterId);
 useEffect(()=>{if(chapter.id.startsWith('1.7'))setTheoryOpen(true);},[chapter.id]);
 const studyChapters=lesson.chapters.filter(c=>/^\d+\./.test(c.id));
 const completed=(saved.completedChapters||[]).filter(id=>studyChapters.some(c=>c.id===id));
 const readProgress=Math.round(completed.length/studyChapters.length*100);
 function go(index,{preserveScroll=false}={}){
  const target=lesson.chunks[Math.max(0,Math.min(lesson.chunks.length-1,index))];
  setPosition(lesson.chunks.indexOf(target));setMapOpen(false);
  patch(p=>({...p,lastLesson:lesson.id,read:{...p.read,[lesson.id]:{...p.read[lesson.id],page:target.page,chapterId:target.chapterId,offset:undefined,language:undefined}}}));
  if(mode!=='read')navigate(`lesson/${lesson.id}/read`);
  if(!preserveScroll)window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }
 function toggleComplete(){patch(p=>{const previous=p.read[lesson.id]||{};const list=previous.completedChapters||[];return{...p,read:{...p.read,[lesson.id]:{...previous,completedChapters:list.includes(chapter.id)?list.filter(id=>id!==chapter.id):[...list,chapter.id]}}};});}
 function renderChapterLinks(){return <nav className="studio-chapters" aria-label="فصل‌های جزوه">{lesson.chapters.filter(c=>theoryOpen||!c.id.startsWith('1.7.')).map(c=><div className="studio-chapter-row" key={c.id}><button className={`studio-chapter-link ${c.id===chapter.id?'is-active':''} ${completed.includes(c.id)?'is-complete':''} ${c.id.split('.').length>2?'is-subchapter':''} ${c.id==='1.7'?'has-children':''}`} aria-current={c.id===chapter.id?'step':undefined} onClick={()=>go(lesson.chunks.findIndex(part=>part.chapterId===c.id))}><span className="studio-path-dot">{completed.includes(c.id)?<Icon name="check" size={10}/>:null}</span><span className="studio-chapter-id" dir="ltr">{/^\d+\./.test(c.id)?c.id:''}</span><span>{c.fa}</span></button>{c.id==='1.7'?<button className="studio-theory-toggle" aria-label="زیربخش‌های نظریه‌های اقتصادی" aria-expanded={theoryOpen} onClick={()=>setTheoryOpen(v=>!v)}><StudioIcon name="prev" size={14}/></button>:null}</div>)}</nav>;}
 return <GlossaryProvider tone="studio"><div className={`mhba-scope mhba-studio ${focus?'studio-focus':''}`} lang="fa" dir="rtl" data-mhba-learning data-deutsch-learning>
  <a className="skip-link" href="#studio-content" onClick={e=>{e.preventDefault();document.getElementById('studio-content')?.focus();}}>رفتن به محتوای درس</a>
  <header className="studio-header"><button className="studio-brand mbh-wordmark" aria-label="صفحهٔ اصلی MHBA" onClick={()=>navigate('home')}>MHBA</button><Link href="/fatima" className="studio-account"><span className="studio-avatar">F</span><span>صفحهٔ فاطمه</span><StudioIcon name="next" size={14}/></Link></header>
  <div className="studio-layout">
   <aside className="studio-rail" aria-label="مسیر یادگیری درس"><div className="studio-rail-heading"><h2>مسیر یادگیری</h2><p>مدول ۱ · درس {fa(lesson.id)}</p><button className="studio-map-close" onClick={()=>setMapOpen(false)} aria-label="بستن فهرست"><Icon name="close"/></button></div>
    <div className="studio-progress"><p>{fa(completed.length)} از {fa(studyChapters.length)} بخش مرور شده</p><div role="progressbar" aria-label="بخش‌های مرورشده" aria-valuenow={completed.length} aria-valuemin={0} aria-valuemax={studyChapters.length}><span style={{width:readProgress+'%'}}/></div></div>
    {renderChapterLinks()}

    <div className="studio-rail-bottom"><button onClick={()=>navigate('home')}><StudioIcon name="list" size={17}/>صفحهٔ اصلی</button><button onClick={backup}><Icon name="download" size={16}/>پشتیبان</button></div>
   </aside>
   <main className="studio-main" id="studio-content" tabIndex={-1} onPointerUp={pick} onKeyUp={e=>{if(e.key==='Shift')pick();}}>
    <div className="studio-intro"><div className="studio-title"><h1 className="de" lang="de" dir="ltr">{lesson.de}</h1><p>{lesson.fa}</p></div><div className="studio-intro-actions"><button className="studio-breadcrumb" onClick={()=>navigate('home')}>مدول ۱ / درس {fa(lesson.id)}<StudioIcon name="prev" size={16}/></button><div><button className="studio-map-toggle" lang={focus?'de':undefined} aria-haspopup="dialog" aria-expanded={mapOpen} onClick={()=>setMapOpen(true)}><StudioIcon name="list"/>{focus?'Kapitel':'فهرست فصل‌ها'}</button><button className={`studio-focus-toggle ${focus?'is-active':''}`} lang="de" aria-pressed={focus} onClick={toggleBook}><StudioIcon name="focus"/>{focus?'Buch schließen':'Buchansicht'}</button></div></div></div>
    {storageError?<p className="notice" role="alert">ذخیره در مرورگر ممکن نشد؛ برای حفظ یادداشت‌ها پشتیبان بگیر.</p>:null}
    <StudioReader lesson={lesson} chapter={chapter} current={current} position={position} data={data} patch={patch} go={go} focus={focus} annotateRange={annotateRange} eraseSelection={eraseSelection} completed={completed.includes(chapter.id)} toggleComplete={toggleComplete} navigate={navigate}/>

    <footer className="studio-footer"><span>MHBA</span><span>جزوهٔ اصلی MHBA · مدول ۱ · درس {fa(lesson.id)}</span><button onClick={backup}>پشتیبان مطالعه <Icon name="download" size={12}/></button></footer>
   </main>
  </div>
  <dialog ref={mapDialog} className="studio-chapter-dialog" aria-labelledby="chapter-dialog-title" onCancel={e=>{e.preventDefault();setMapOpen(false);}} onClose={()=>setMapOpen(false)} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setMapOpen(false);}}}><div className="chapter-dialog-heading"><div><h2 id="chapter-dialog-title">فهرست فصل‌ها</h2><p>مدول ۱ · درس {fa(lesson.id)}</p></div><button aria-label="بستن فهرست فصل‌ها" onClick={()=>setMapOpen(false)}><Icon name="close"/></button></div>{renderChapterLinks()}</dialog>
 </div></GlossaryProvider>;
}
