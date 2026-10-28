import React,{useRef} from 'react';
import {PdfLink} from './ui.jsx';

export default function SourceFigure({figure,pdf,measure=false}){
 const dialog=useRef(null);const src=`/fatima/mhba/figures/${figure.file}`;
 const picture=<img src={src} width={figure.width} height={figure.height} alt={`${figure.label}: ${figure.title}`} loading="eager" decoding="async"/>;
 return <figure data-no-zoom className={`source-figure ${figure.id.startsWith('table')?'is-table':''}`}>
  {measure?<div className="source-figure-picture">{picture}<span className="figure-zoom-label">↗ بزرگ‌نمایی</span></div>:<button className="source-figure-picture" aria-label={`بزرگ‌نمایی ${figure.label}`} onClick={()=>dialog.current?.showModal()}>{picture}<span className="figure-zoom-label">↗ بزرگ‌نمایی</span></button>}
  <figcaption dir="rtl"><strong>{figure.label}</strong><span>{figure.title}</span>{figure.de?<small lang="de" dir="ltr">{figure.de}</small>:null}</figcaption>
  {!measure?<dialog ref={dialog} className="source-figure-modal" aria-label={`نمای بزرگ ${figure.label}`} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close();}}><header><div><strong>{figure.label}</strong><p>{figure.title}</p></div><button onClick={()=>dialog.current.close()} aria-label="بستن تصویر">×</button></header><div className="source-figure-full">{picture}</div><footer><span>تصویر اصلی جزوه · صفحهٔ {figure.page}</span><PdfLink file={pdf} page={figure.page}>صفحهٔ کامل PDF</PdfLink></footer></dialog>:null}
 </figure>;
}
