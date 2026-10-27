import React from 'react';
import {Icon} from './ui.jsx';

export function StudioIcon({name,size=18}){
 const paths={eraser:<><path d="m16 3 5 5-11 13H6L2 17 16 3Z"/><path d="m8 11 7 7M10 21h12"/></>,check:<path d="m5 12 4 4L19 6"/>,heart:<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/>,focus:<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>,list:<><path d="M9 6h12M9 12h12M9 18h12"/><circle cx="3" cy="6" r=".7"/><circle cx="3" cy="12" r=".7"/><circle cx="3" cy="18" r=".7"/></>,spark:<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z"/>,next:<path d="m14 6-6 6 6 6"/>,prev:<path d="m10 6 6 6-6 6"/>,underline:<><path d="M6 3v7a6 6 0 0 0 12 0V3M4 21h16"/></>,cursor:<path d="m4 3 6 18 3-8 8-3L4 3Z"/>,flip:<><path d="M3 9a9 9 0 0 1 16-4M21 15a9 9 0 0 1-16 4M19 1v4h-4M5 23v-4h4"/></>};
 return <svg width={size} height={size} viewBox="0 0 24 24" fill={name==='heart'?'currentColor':'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]||paths.spark}</svg>;
}

export function StudioToolbar({data,patch,showPersian,onLanguage}){
 const annotation=data.annotation||{tool:'highlight',color:'yellow'};
 return <div className="studio-toolbar" role="toolbar" aria-label="ابزار مطالعه و علامت‌گذاری">
  <div className="studio-mark-tools" role="group" aria-label="نوع علامت‌گذاری">{[['highlight','هایلایت','pen'],['underline','زیرخط','underline'],['select','فقط انتخاب','cursor'],['erase','پاک‌کن','eraser']].map(([tool,label,icon])=><button key={tool} title={label} aria-label={label} aria-pressed={annotation.tool===tool} className={annotation.tool===tool?'is-active':''} onClick={()=>patch({annotation:{...annotation,tool}})}>{icon==='pen'?<Icon name="pen" size={17}/>:<StudioIcon name={icon}/>}<span>{label}</span></button>)}</div>
  <div className="studio-swatches" role="group" aria-label="رنگ علامت">{[['yellow','زرد'],['pink','صورتی'],['green','سبز']].map(([color,label])=><button key={color} aria-label={`رنگ ${label}`} aria-pressed={annotation.color===color} className={`studio-swatch highlight-${color} ${annotation.color===color?'is-active':''}`} onClick={()=>patch({annotation:{...annotation,tool:annotation.tool==='underline'?'underline':'highlight',color}})}>{annotation.color===color?<Icon name="check" size={13}/>:null}</button>)}</div>
  {onLanguage?<button role="switch" aria-checked={showPersian} className="studio-language-switch" onClick={onLanguage}><span className="studio-switch"/><span>ترجمهٔ فارسی</span><small dir="ltr">DE ↔ FA</small></button>:null}

 </div>;
}
