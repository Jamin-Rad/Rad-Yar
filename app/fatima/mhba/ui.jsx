import React,{createContext,useContext,useEffect,useState} from 'react';
import {annotationRuns,glossaryParts} from './annotations.js';
const GlossaryContext=createContext(null);
export function GlossaryProvider({children}){
 const [tip,setTip]=useState(null);
 const hide=()=>setTip(null);
 useEffect(()=>{window.addEventListener('scroll',hide,true);window.addEventListener('resize',hide);window.addEventListener('hashchange',hide);return()=>{window.removeEventListener('scroll',hide,true);window.removeEventListener('resize',hide);window.removeEventListener('hashchange',hide);};},[]);
 const show=(target,meaning)=>{const rect=target.getBoundingClientRect();const width=Math.min(240,window.innerWidth-32);const below=rect.top<140;setTip({meaning,width,left:Math.max(16,Math.min(window.innerWidth-width-16,rect.left+rect.width/2-width/2)),top:below?rect.bottom+10:rect.top-10,below});};
 return <GlossaryContext.Provider value={{show,hide}}>{children}{tip?<div className="mhba-word-tooltip" id="mhba-word-tip" role="tooltip" lang="fa" dir="rtl" style={{left:tip.left,top:tip.top,width:tip.width,transform:tip.below?'none':'translateY(-100%)'}}>{tip.meaning}</div>:null}</GlossaryContext.Provider>;
}
export function Icon({name,size=20,...props}){
 const paths={book:<><path d="M12 5c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Z"/><path d="M12 5v14"/></>,review:<><path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/></>,bookmark:<path d="M6 3h12v18l-6-4-6 4V3Z"/>,arrow:<><path d="m10 5-7 7 7 7M3 12h18"/></>,chevron:<path d="m9 5 7 7-7 7"/>,check:<path d="m5 12 4 4L19 6"/>,pen:<><path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14v6Z"/></>,download:<><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,volume:<><path d="m11 4-6 5H2v6h3l6 5V4ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></>,close:<path d="m6 6 12 12M6 18 18 6"/>,clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,search:<><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,external:<><path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7"/></>};
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]||paths.book}</svg>;
}
export function Empty({title,children}){return <div className="empty"><Icon name="bookmark" size={36}/><h2>{title}</h2><p>{children}</p></div>;}
export function HighlightText({text='',blockId,data,strong=false,vocabulary=[],offset=0,sourceLength,...props}){
 const tooltip=useContext(GlossaryContext);
 const Tag=strong?'strong':'span';
 return <Tag data-highlight-root={blockId} data-highlight-offset={offset} data-source-length={sourceLength} {...props}>{annotationRuns(text,blockId,data.highlights,offset,sourceLength).map(run=>{
   const highlight=run.annotations.filter(h=>(h.tool||'highlight')==='highlight').at(-1);
   const underline=run.annotations.some(h=>h.tool==='underline');
   const content=glossaryParts(run.text,vocabulary).map((part,i)=>part.meaning?<span key={i} className="glossary-term" tabIndex={0} data-meaning={part.meaning} aria-label={`${part.text}: ${part.meaning}`} aria-describedby="mhba-word-tip" onMouseEnter={e=>tooltip?.show(e.currentTarget,part.meaning)} onMouseLeave={()=>tooltip?.hide()} onFocus={e=>tooltip?.show(e.currentTarget,part.meaning)} onBlur={()=>tooltip?.hide()} onClick={e=>tooltip?.show(e.currentTarget,part.meaning)}>{part.text}</span>:part.text);
   if(!highlight&&!underline)return <React.Fragment key={run.start}>{content}</React.Fragment>;
   return <mark key={run.start} className={`${highlight?'highlight-'+(highlight.color||'yellow'):'annotation-clear'} ${underline?'annotation-underline':''}`} title={run.annotations.map(h=>h.note).filter(Boolean).join(' · ')||undefined}>{content}</mark>;
 })}</Tag>;
}
export function PdfLink({file,page,children}){return <a className="text-link" href={`/fatima/mhba/materials/${file}${page?`#page=${page}`:''}`} target="_blank" rel="noreferrer"><Icon name="external" size={15}/>{children||'جزوهٔ اصلی PDF'}</a>;}
