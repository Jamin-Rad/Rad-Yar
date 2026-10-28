import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {HighlightText,Icon,PdfLink} from './ui.jsx';
import {StudioIcon,StudioToolbar} from './StudioTools.jsx';
import {packBookRows} from './bookPagination.js';
import {parallelRows} from './parallelText.js';
import {figuresForRow} from './sourceFigures.js';
import SourceFigure from './SourceFigure.jsx';
import LegalFormsMap from './LegalFormsMap.jsx';

function ChapterSummary({lesson,chapter,data,completed,toggleComplete}){
 return <section className="studio-summary" aria-label="خلاصهٔ پایان بخش"><div className="studio-summary-heading"><h3><Icon name="book" size={22}/>خلاصهٔ این بخش</h3></div><div className="summary-aligned">{chapter.summary.de.map((text,i)=><div className="summary-aligned-row" key={i}><p lang="de" dir="ltr"><HighlightText text={text} blockId={`summary-${lesson.id}-${chapter.id}-de-${i}`} data={data} vocabulary={lesson.vocabulary}/></p><p lang="fa" dir="rtl"><HighlightText text={chapter.summary.fa[i]} blockId={`summary-${lesson.id}-${chapter.id}-fa-${i}`} data={data}/></p></div>)}</div>{lesson.id===5&&chapter.id==='5.1'?<LegalFormsMap/>:null}{/^\d+\./.test(chapter.id)?<button className={`studio-complete-button ${completed?'is-complete':''}`} aria-pressed={completed} onClick={toggleComplete}><span>{completed?<Icon name="check" size={14}/>:null}</span>{completed?'این بخش را مرور کرده‌ام':'این بخش را مرور کردم'}</button>:null}</section>;
}

export default function StudioReader({lesson,chapter,current,position,data,patch,go,completed,toggleComplete,navigate,focus=false,eraseSelection}){
 const font=data.fontSize||19;const [showPersian,setShowPersian]=useState(true);const [folio,setFolio]=useState(0);const [turn,setTurn]=useState('next');
 const pending=useRef(0);const touch=useRef(null);const rows=parallelRows(current,lesson.id);
 const keepTitle=rows.length>1&&/^\s*\d+(?:\.\d+)+\.?\s/.test(rows[0].de.text)&&rows[0].de.text.trim().length<180;
 const [pagination,setPagination]=useState(null);const paginationRef=useRef(null);const folioRef=useRef(null);const measureRef=useRef(null);const rowAnchor=useRef(null);
 let sheets=rows.map(row=>[row]);if(keepTitle)sheets.splice(0,2,[rows[0],rows[1]]);
 if(pagination?.key===current.key)sheets=pagination.groups.map(group=>group.map(i=>rows[i]).filter(Boolean));

 const index=Math.min(folio,sheets.length-1);
 rowAnchor.current=sheets[index]?.[0]?.de.start;
 useLayoutEffect(()=>{if(!focus)return;const fit=()=>{const content=folioRef.current,measure=measureRef.current;if(!content||!measure)return;const heights=[...measure.children].map(r=>r.getBoundingClientRect().height);const groups=packBookRows(heights,Math.max(100,content.clientHeight-24),keepTitle);const previous=paginationRef.current;if(previous?.key===current.key&&JSON.stringify(previous.groups)===JSON.stringify(groups))return;const anchor=rows.findIndex(row=>row.de.start===rowAnchor.current);if(previous?.key===current.key&&anchor>=0)setFolio(Math.max(0,groups.findIndex(group=>group.includes(anchor))));const next={key:current.key,groups};paginationRef.current=next;setPagination(next);};fit();const observer=new ResizeObserver(fit);observer.observe(folioRef.current);observer.observe(measureRef.current);return()=>observer.disconnect();},[focus,current.key,showPersian,font]);
 const original=lesson.pages[current.page-1];const lastInChapter=current.key===chapter.chunks.at(-1).key;const official=chapter.id==='fragen';
 useEffect(()=>{setFolio(Math.min(pending.current,sheets.length-1));pending.current=0;},[current.key]);
 function flip(direction){
  setTurn(direction>0?'next':'previous');
  if(!focus){if(position+direction>=0&&position+direction<lesson.chunks.length)go(position+direction,{preserveScroll:true});return;}
  if(index+direction>=0&&index+direction<sheets.length)setFolio(index+direction);
  else if(position+direction>=0&&position+direction<lesson.chunks.length){pending.current=direction<0?Infinity:0;go(position+direction,{preserveScroll:true});}
 }
 useEffect(()=>{const key=e=>{if(document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,select,textarea,[contenteditable=true]')||window.getSelection()?.toString())return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();flip(e.key==='ArrowRight'?1:-1);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[focus,index,current.key,position,pagination]);
 function turnBySwipe(e){const start=touch.current;touch.current=null;if(!start||window.getSelection()?.toString())return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>70&&Math.abs(dy)<45)flip(dx<0?1:-1);}
 const visible=focus?sheets[index]:rows;
 return <div className={`studio-reader ${focus?'reader-book-mode':''}`} style={{'--studio-reading-size':font+'px'}}>
  <article className="studio-paper"><div className="studio-paper-heading"><div><h2 className="de" lang="de" dir="ltr">{chapter.title}</h2><p>{chapter.fa}</p></div><div className="studio-page-controls"><button aria-label="صفحهٔ قبل" disabled={position===0} onClick={()=>go(position-1,{preserveScroll:true})}><StudioIcon name="prev"/></button><label>صفحه <select aria-label="صفحهٔ جزوه" value={current.key} onChange={e=>go(lesson.chunks.findIndex(c=>c.key===e.target.value))}>{lesson.chunks.map(c=><option key={c.key} value={c.key}>{c.page} · {c.chapterId==='intro'?'مقدمه':c.chapterId==='fragen'?'سؤال‌ها':c.chapterId==='literatur'?'منابع':c.chapterId}</option>)}</select> از {lesson.pages.length}</label><button aria-label="صفحهٔ بعد" disabled={position===lesson.chunks.length-1} onClick={()=>go(position+1,{preserveScroll:true})}><StudioIcon name="next"/></button></div></div>
   <StudioToolbar data={data} patch={patch} eraseSelection={eraseSelection} showPersian={showPersian} onLanguage={()=>setShowPersian(v=>!v)}/>
   {focus?<div className="folio-status" aria-live="polite"><span>برگهٔ {new Intl.NumberFormat('fa').format(index+1)} از {new Intl.NumberFormat('fa').format(sheets.length)} · صفحهٔ {current.page}</span><small>برای ورق‌زدن بکش یا از دکمه‌ها استفاده کن</small></div>:null}
   <div className={`parallel-reader ${showPersian?'':'german-only'}`} onPointerDown={e=>{if(e.target.closest('button,input,select,a'))return;touch.current={x:e.clientX,y:e.clientY};}} onPointerUp={turnBySwipe}>
    <div className="parallel-language-headings"><span>DEUTSCH · ORIGINAL</span>{showPersian?<span>فارسی · ترجمهٔ کامل</span>:null}</div>
    <div ref={folioRef} key={focus?`${current.key}:${index}`:current.key} className={`folio-content turn-${turn}`}>
    {visible.map((row,i)=><div className={`parallel-row ${row.de.margin?'source-margin-row':''}`} key={row.de.start}>
     <section className="parallel-de" lang="de" dir="ltr" aria-label="متن اصلی آلمانی">{figuresForRow(lesson.id,current.page,row).map(figure=><SourceFigure key={figure.id} figure={figure} pdf={lesson.pdf}/>)}<SourceParagraphs collapsed={figuresForRow(lesson.id,current.page,row).some(f=>lesson.tables?.[f.id])} part={row.de} blockId={`original-${lesson.id}-${current.page}`} sourceLength={original.text.length} data={data} vocabulary={lesson.vocabulary} official={official}/></section>
     {showPersian?<section className="parallel-fa" lang="fa" dir="rtl" aria-label="ترجمهٔ همان بند">{figuresForRow(lesson.id,current.page,row).filter(f=>lesson.tables?.[f.id]).map(f=><SourceTable key={f.id} table={lesson.tables[f.id]} label={f.label}/>)}<SourceParagraphs collapsed={figuresForRow(lesson.id,current.page,row).some(f=>lesson.tables?.[f.id])} part={row.fa} blockId={`original-${lesson.id}-${current.page}-fa`} sourceLength={original.fa.length} data={data} official={official}/></section>:null}
    </div>)}
    {focus&&lastInChapter&&index===sheets.length-1?<ChapterSummary key={chapter.id} lesson={lesson} chapter={chapter} data={data} completed={completed} toggleComplete={toggleComplete}/>:null}
    </div>
    {focus?<div className="book-measure" ref={measureRef} aria-hidden="true" inert>{rows.map(row=><div className={`parallel-row ${row.de.margin?'source-margin-row':''}`} key={row.de.start}><section className="parallel-de" lang="de" dir="ltr">{figuresForRow(lesson.id,current.page,row).map(figure=><SourceFigure measure key={figure.id} figure={figure} pdf={lesson.pdf}/>)}<SourceParagraphs measure collapsed={figuresForRow(lesson.id,current.page,row).some(f=>lesson.tables?.[f.id])} part={row.de} official={official}/></section>{showPersian?<section className="parallel-fa" lang="fa" dir="rtl">{figuresForRow(lesson.id,current.page,row).filter(f=>lesson.tables?.[f.id]).map(f=><SourceTable key={f.id} table={lesson.tables[f.id]} label={f.label}/>)}<SourceParagraphs measure collapsed={figuresForRow(lesson.id,current.page,row).some(f=>lesson.tables?.[f.id])} part={row.fa} official={official}/></section>:null}</div>)}</div>:null}
   </div>
   {focus?<nav className="folio-navigation" aria-label="ورق زدن"><button aria-label="برگهٔ قبل" disabled={position===0&&index===0} onClick={()=>flip(-1)}><StudioIcon name="prev"/>برگهٔ قبل</button><span>{index+1} / {sheets.length}</span><button aria-label="برگهٔ بعد" disabled={position===lesson.chunks.length-1&&index===sheets.length-1} onClick={()=>flip(1)}>برگهٔ بعد<StudioIcon name="next"/></button></nav>:null}
   <div className="studio-paper-footer"><span>معنی واژه‌های خط‌چین‌دار با مکث یا لمس</span><div className="studio-font-controls"><button aria-label="کوچک کردن متن" disabled={font<=17} onClick={()=>patch({fontSize:Math.max(17,font-1)})}>A−</button><button aria-label="بزرگ کردن متن" disabled={font>=25} onClick={()=>patch({fontSize:Math.min(25,font+1)})}>A+</button></div><PdfLink file={lesson.pdf} page={current.page}>PDF همین صفحه</PdfLink></div>
  </article>
  {lastInChapter&&!focus?<ChapterSummary key={chapter.id} lesson={lesson} chapter={chapter} data={data} completed={completed} toggleComplete={toggleComplete}/>:null}
  {!focus?<nav className="studio-page-footer" aria-label="ادامهٔ مطالعه"><button disabled={position===0} onClick={()=>go(position-1,{preserveScroll:true})}><StudioIcon name="prev"/><span>صفحهٔ قبل</span></button><button onClick={()=>navigate('home')}><StudioIcon name="list"/><span>بازگشت به فهرست درس‌ها</span></button><button disabled={position===lesson.chunks.length-1} onClick={()=>go(position+1,{preserveScroll:true})}><span>{lastInChapter?'بخش بعد':'ادامهٔ مطالعه'}</span><StudioIcon name="next"/></button></nav>:null}
 </div>;
}

function SourceParagraphs({part,blockId,sourceLength,data,vocabulary,official,measure=false,collapsed=false}){
 // Keep all source characters and offsets, but distinguish headings and list items visually.
 const boundaries=[0];for(const m of part.text.matchAll(/\n[ \t]*\n+|\n(?=[ \t]*[*•]\s)/g))boundaries.push(m.index+m[0].length);boundaries.push(part.text.length);
 const paragraphs=boundaries.slice(0,-1).map((start,i)=>{const text=part.text.slice(start,boundaries[i+1]);if(!text.length)return null;const heading=/^\s*(?:[\d۰-۹]+(?:\.[\d۰-۹]+)+\.?\s|[a-z]\)\s)/.test(text)&&text.trim().length<180;return <div key={start} className={`source-paragraph ${heading?'source-heading':''} ${/^\s*[*•]/.test(text)?'source-list-item':''}`}>{measure?(official||heading?<strong>{text}</strong>:<span>{text}</span>):<HighlightText text={text} strong={official||heading} blockId={blockId} offset={part.start+start} sourceLength={sourceLength} data={data} vocabulary={vocabulary}/>}</div>;});
 return collapsed?<details className="source-table-transcript"><summary>متن قابل انتخاب جدول</summary>{paragraphs}</details>:paragraphs;
}
function SourceTable({table,label}){return <div className="source-translated-table"><table><caption>{label} · ترجمهٔ جدول</caption><thead><tr>{table.head.map((cell,i)=><th scope="col" key={i}>{cell}</th>)}</tr></thead><tbody>{table.rows.map((cells,i)=><tr key={i}>{cells.map((cell,j)=>j===0?<th scope="row" key={j}>{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;}
