import React,{useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {catalog} from './course.js';
import {Icon} from './ui.jsx';
import {StudioIcon} from './StudioTools.jsx';
import StudioCards from './StudioCards.jsx';
import CustomExam from './CustomExam.jsx';
const fa=n=>n.toLocaleString('fa-IR');

export default function LearningPortal({view='home',data,patch,navigate,backup,restore,toast,storageError}){
 const [modal,setModal]=useState(null);
 const dialog=useRef(null);const importRef=useRef(null);

 useEffect(()=>{if(modal&&!dialog.current.open)dialog.current.showModal();else if(!modal&&dialog.current.open)dialog.current.close();},[modal]);
 function close(){setModal(null);if(view==='exam')navigate('home');}
 const isDeck=view==='cards'||view==='review';
 function openLesson(id){setModal(null);navigate(`lesson/${id}/read`);}
 const rows=catalog.filter(l=>l.module===modal?.module);
 return <div className="mhba-scope mhba-studio mbh-portal" lang="fa" dir="rtl" data-mhba-learning data-deutsch-learning><header className="mbh-portal-header"><button className="mbh-wordmark" onClick={()=>navigate('home')} aria-label="صفحهٔ اصلی MHBA">MHBA</button><Link href="/fatima" className="mbh-profile"><span>F</span>صفحهٔ فاطمه</Link></header>
  <main className={isDeck?'mbh-portal-main mbh-portal-cards':'mbh-portal-main'}>{storageError?<p className="notice" role="alert">ذخیره در مرورگر ممکن نشد؛ نسخهٔ پشتیبان بگیر.</p>:null}{view!=='home'?<button className="hub-back" onClick={()=>navigate('home')}><StudioIcon name="prev" size={18}/>صفحهٔ اصلی</button>:null}{view==='exam'||view==='official'?<CustomExam key={view} official={view==='official'} data={data} patch={patch}/>:isDeck?<StudioCards key={view} data={data} patch={patch} reviewOnly={view==='review'}/>:<><section className="mhba-hero"><img src="/fatima/mhba-study-hero-v2.webp" alt="کتاب، گل رز و قهوه در فضای روشن مطالعه" fetchPriority="high"/><div className="mhba-hero-copy" dir="ltr"><h1>MHBA</h1><p>Master of Health<br/>Business Administration</p></div></section><div className="hub-section-title"><h2>مدول‌ها</h2><span>انتخاب درس و ادامهٔ مطالعه</span></div><div className="mbh-modules">{[1,2].map(module=><button key={module} className={`mbh-module mbh-module-${module}`} aria-label={`مدول ${fa(module)} — مشاهدهٔ درس‌ها`} onClick={()=>setModal({type:'module',module})}><div><h2>مدول {fa(module)}</h2><p>{fa(catalog.filter(l=>l.module===module).length)} درس</p><span className="mbh-module-cta">مشاهدهٔ درس‌ها<StudioIcon name="next" size={20}/></span></div><span className="mbh-module-number" aria-hidden="true" dir="ltr">0{module}</span></button>)}</div>
    <div className="mbh-home-actions">{[['cards','فلش‌کارت‌ها','کارت‌های جدید · مرور امروز · جعبه‌های یادگیری','cards'],['official','سؤال‌های خود جزوه','پرسش‌های اصلی · پاسخ کامل آلمانی و فارسی','book'],['exam','تمرین و آزمون','تشریحی · صحیح / غلط · انتخاب چند درس','exam']].map(([to,title,description,icon])=><button key={to} onClick={()=>navigate(to)}><span className="mbh-action-icon">{icon==='book'?<Icon name="book" size={31}/>:icon==='exam'?<span className="mbh-check-circle"><Icon name="check" size={23}/></span>:<svg viewBox="0 0 32 32" width="31" height="31" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="6" y="7" width="20" height="23" rx="4" transform="rotate(-9 6 7)"/><path d="M9 4h15a4 4 0 0 1 4 4v18"/></svg>}</span><span className="mbh-action-copy"><h2>{title}</h2><p>{description}</p><StudioIcon name="next" size={22}/></span></button>)}</div></>}
  </main><footer className="mbh-portal-footer"><span dir="ltr">MHBA</span><div><button onClick={backup}><Icon name="download" size={16}/>تهیهٔ نسخهٔ پشتیبان</button><button onClick={()=>importRef.current?.click()}>بازیابی پشتیبان</button><input hidden type="file" accept="application/json,.json" ref={importRef} onChange={restore}/></div></footer>
  {toast?<div className="mbh-portal-toast" role="status">{toast}</div>:null}
  <dialog className="mbh-dialog" ref={dialog} aria-labelledby="mbh-dialog-heading" onCancel={e=>{e.preventDefault();close();}} onClose={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}}}>
   <div className="mbh-dialog-heading"><div><h2 id="mbh-dialog-heading">{modal?.type==='module'?`مدول ${fa(modal.module)}`:'آزمون'}</h2>{modal?.type==='module'?<p>{fa(rows.length)} درس</p>:null}</div><button aria-label="بستن پنجره" onClick={close}><Icon name="close" size={22}/></button></div>
   <div className="mbh-modal-lessons">{rows.map(l=><button key={l.id} disabled={!l.ready} onClick={()=>openLesson(l.id)}><span className="mbh-modal-number">{fa(l.id)}</span><span className="mbh-modal-lesson-title"><strong lang="de" dir="ltr">{l.de}</strong><span>{l.fa}</span>{!l.ready?<small>هنوز آماده نشده</small>:null}</span>{l.ready?<StudioIcon name="next" size={18}/>:<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></svg>}</button>)}</div>
  </dialog>
 </div>;
}
