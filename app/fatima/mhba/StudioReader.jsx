import SourceTable from './SourceTable.jsx';
import StudyNotes from './StudyNotes.jsx';
import {lesson4PageNotes} from './lesson4Audit.js';
import {lesson8PageNotes} from './lesson8Audit.js';
import {lesson7PageNotes} from './lesson7Audit.js';
import {lesson5PageNotes} from './lesson5Audit.js';
import React,{useEffect,useMemo,useRef,useState} from 'react';
import useReaderInput from './useReaderInput.js';
import {HighlightText,Icon,PdfLink} from './ui.jsx';
import {StudioIcon,StudioToolbar} from './StudioTools.jsx';
import {parallelRows} from './parallelText.js';
import {figuresForRow} from './sourceFigures.js';
import SourceFigure from './SourceFigure.jsx';
import LegalFormsMap from './LegalFormsMap.jsx';

function ChapterSummary({lesson,chapter,data,completed,toggleComplete}){
 return <section className="studio-summary" dir="rtl" aria-label="خلاصهٔ پایان بخش"><div className="studio-summary-heading"><h3><Icon name="book" size={22}/>خلاصهٔ این بخش</h3></div><div className="summary-aligned">{chapter.summary.de.map((text,i)=><div className="summary-aligned-row" key={i}><p lang="de" dir="ltr"><HighlightText text={text} blockId={`summary-${lesson.id}-${chapter.id}-de-${i}`} data={data} vocabulary={lesson.vocabulary}/></p><p lang="fa" dir="rtl"><HighlightText text={chapter.summary.fa[i]} blockId={`summary-${lesson.id}-${chapter.id}-fa-${i}`} data={data}/></p></div>)}</div>{lesson.id===5&&chapter.id==='5.1'?<LegalFormsMap/>:null}{/^\d+\./.test(chapter.id)?<button className={`studio-complete-button ${completed?'is-complete':''}`} aria-pressed={completed} onClick={toggleComplete}><span>{completed?<Icon name="check" size={14}/>:null}</span>{completed?'این بخش را مرور کرده‌ام':'این بخش را مرور کردم'}</button>:null}</section>;
}

export default function StudioReader({lesson,chapter,current,position,data,patch,go,completed,toggleComplete,navigate,eraseSelection,annotateRange}){
 const font=data.fontSize||19;const [showPersian,setShowPersian]=useState(true);
 const rows=useMemo(()=>parallelRows(current,lesson.id),[current,lesson.id]);
 const readerRef=useRef(null);const previewRef=useRef(null);
 const original=lesson.pages[current.page-1];const lastInChapter=current.key===chapter.chunks.at(-1).key;const official=chapter.id==='fragen';
 function flip(direction){
  const next=position+direction;
  if(next>=0&&next<lesson.chunks.length)go(next,{preserveScroll:true});
 }
 useEffect(()=>{const key=e=>{if(document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,select,textarea,[contenteditable=true]')||window.getSelection()?.toString())return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();flip(e.key==='ArrowRight'?1:-1);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[current.key,position]);
 const input=useReaderInput({readerRef,previewRef,annotation:data.annotation||{tool:'highlight',color:'yellow'},annotateRange,flip,contentKey:current.key});
 return <div className="studio-reader" style={{'--studio-reading-size':font+'px'}}>
  <article className="studio-paper"><div className="studio-paper-heading"><div><h2 className="de" lang="de" dir="ltr">{chapter.title}</h2><p lang="fa" dir="rtl">{chapter.fa}</p></div><div className="studio-page-controls"><button aria-label="Zurück" disabled={position===0} onClick={()=>go(position-1,{preserveScroll:true})}><StudioIcon name="next"/></button><label lang="de">Seite <select aria-label="Skriptseite" value={current.key} onChange={e=>go(lesson.chunks.findIndex(c=>c.key===e.target.value))}>{lesson.chunks.map(c=><option key={c.key} value={c.key}>{c.page} · {c.chapterId==='intro'?'Einführung':c.chapterId==='fragen'?'Fragen':c.chapterId==='literatur'?'Literatur':c.chapterId}</option>)}</select> von {lesson.pages.length}</label><button aria-label="Weiter" disabled={position===lesson.chunks.length-1} onClick={()=>go(position+1,{preserveScroll:true})}><StudioIcon name="prev"/></button></div></div>
   <StudioToolbar data={data} patch={patch} eraseSelection={eraseSelection} showPersian={showPersian} onLanguage={()=>setShowPersian(v=>!v)}/>
   <div ref={readerRef} data-reader-tool={data.annotation?.tool||'highlight'} className={`parallel-reader ${showPersian?'':'german-only'}`} {...input}>
    <div className="parallel-language-headings"><span>DEUTSCH · ORIGINAL</span>{showPersian?<span>فارسی · ترجمهٔ کامل</span>:null}</div>
    <div key={current.key} className="source-content">
    {rows.map(row=><div className={`parallel-row ${row.de.margin?'source-margin-row':''}`} key={row.de.start}>
     <section className="parallel-de" lang="de" dir="ltr" aria-label="متن اصلی آلمانی">{figuresForRow(lesson.id,current.page,row).map(figure=><SourceFigure key={figure.id} figure={figure} pdf={lesson.pdf}/>)}<SourceParagraphs collapsed={figuresForRow(lesson.id,current.page,row).some(f=>lesson.tables?.[f.id])} part={row.de} blockId={`original-${lesson.id}-${current.page}`} sourceLength={original.text.length} data={data} vocabulary={lesson.vocabulary} official={official}/></section>
     {showPersian?<section className="parallel-fa" lang="fa" dir="rtl" aria-label="ترجمهٔ همان بند">{figuresForRow(lesson.id,current.page,row).filter(f=>lesson.tables?.[f.id]).map(f=><SourceTable key={f.id} table={lesson.tables[f.id]} label={f.label}/>)}<SourceParagraphs collapsed={figuresForRow(lesson.id,current.page,row).some(f=>lesson.tables?.[f.id])} part={row.fa} blockId={`original-${lesson.id}-${current.page}-fa`} sourceLength={original.fa.length} data={data} official={official}/></section>:null}
    </div>)}
    {[4,5,7,8].includes(lesson.id)?<StudyNotes compact notes={({4:lesson4PageNotes,5:lesson5PageNotes,7:lesson7PageNotes,8:lesson8PageNotes})[lesson.id](current.page)}/>:null}
    </div>
    <div ref={previewRef} className="reader-pen-preview" aria-hidden="true"/>
   </div>
   <div className="studio-paper-footer"><span>معنی واژه‌های خط‌چین‌دار با مکث یا لمس</span><div className="studio-font-controls"><button aria-label="کوچک کردن متن" disabled={font<=17} onClick={()=>patch({fontSize:Math.max(17,font-1)})}>A−</button><button aria-label="بزرگ کردن متن" disabled={font>=25} onClick={()=>patch({fontSize:Math.min(25,font+1)})}>A+</button></div><PdfLink file={lesson.pdf} page={current.page}>PDF همین صفحه</PdfLink></div>
  </article>
  {lastInChapter?<ChapterSummary key={chapter.id} lesson={lesson} chapter={chapter} data={data} completed={completed} toggleComplete={toggleComplete}/>:null}
  <nav className="studio-page-footer" lang="de" dir="ltr" aria-label="Seitennavigation"><button disabled={position===0} onClick={()=>go(position-1,{preserveScroll:true})}><StudioIcon name="next"/><span>Zurück</span></button><button onClick={()=>navigate('home')}><StudioIcon name="list"/><span>Zur Übersicht</span></button><button disabled={position===lesson.chunks.length-1} onClick={()=>go(position+1,{preserveScroll:true})}><span>Weiter</span><StudioIcon name="prev"/></button></nav>
 </div>;
}

function SourceParagraphs({part,blockId,sourceLength,data,vocabulary,official,collapsed=false}){
 // Keep all source characters and offsets, but distinguish headings and list items visually.
 const boundaries=[0];for(const m of part.text.matchAll(/\n[ \t]*\n+|\n(?=[ \t]*[*•]\s)/g))boundaries.push(m.index+m[0].length);boundaries.push(part.text.length);
 const paragraphs=boundaries.slice(0,-1).map((start,i)=>{const text=part.text.slice(start,boundaries[i+1]);if(!text.length)return null;const heading=/^\s*(?:[\d۰-۹]+(?:\.[\d۰-۹]+)+\.?\s|[a-z]\)\s)/.test(text)&&text.trim().length<180;return <div key={start} className={`source-paragraph ${heading?'source-heading':''} ${/^\s*[*•]/.test(text)?'source-list-item':''}`}><HighlightText text={text} strong={official||heading} blockId={blockId} offset={part.start+start} sourceLength={sourceLength} data={data} vocabulary={vocabulary}/></div>;});
 return collapsed?<details className="source-table-transcript"><summary>متن قابل انتخاب جدول</summary>{paragraphs}</details>:paragraphs;
}
