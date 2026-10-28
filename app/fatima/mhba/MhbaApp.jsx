import {migrateSourceAnnotations,SOURCE_REVISION} from './sourceRevisions.js';
import React,{Suspense,lazy,useEffect,useMemo,useRef,useState} from 'react';
import Link from 'next/link';
import {catalog,createLessons} from './course.js';
import {CourseContext,useCourse} from './CourseContext';
import {useNotebook} from './store.js';
import {Reader,Original,Question} from './Study.jsx';
import {Icon,PdfLink,GlossaryProvider} from './ui.jsx';
import {addAnnotation,eraseAnnotations} from './annotations.js';
import LessonStudio from './LessonStudio.jsx';
import LearningPortal from './LearningPortal.jsx';
import StudioCards from './StudioCards.jsx';

const Exam=lazy(()=>import('./Exam.jsx'));
const parseRoute=()=>location.hash.slice(1)||'home';
export default function MhbaApp({materials}){
 const lessons=useMemo(()=>createLessons(materials),[materials]);
 return <CourseContext.Provider value={lessons}><GlossaryProvider><NotebookApp/></GlossaryProvider></CourseContext.Provider>;
}
function NotebookApp(){
 const lessons=useCourse();
 const [route,setRoute]=useState(parseRoute);const [data,patch,storageError]=useNotebook();const [module,setModule]=useState(1);const [toast,setToast]=useState('');const importRef=useRef(null);
 const id=Number(route.split('/')[1]);const lesson=lessons[id];const mode=route.split('/')[2]||'read';
 useEffect(()=>{const change=()=>{setRoute(parseRoute());window.scrollTo(0,0);};window.addEventListener('hashchange',change);return()=>window.removeEventListener('hashchange',change);},[]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),3500);return()=>clearTimeout(t);},[toast]);
 useEffect(()=>{if(lesson)patch(p=>({...p,lastLesson:lesson.id,read:{...p.read,[lesson.id]:p.read[lesson.id]||{section:0}}}));},[lesson?.id]);
 useEffect(()=>{document.title=lesson?`${lesson.fa} | MHBA`:'MHBA';},[lesson]);
 function navigate(to){setRoute(to);if(location.hash.slice(1)!==to)location.hash=to;window.scrollTo(0,0);}
 const annotation=data.annotation||{tool:'highlight',color:'yellow'};
 function pick(event,tool=annotation.tool){
  if(tool==='select'||!lesson)return;
  const sel=window.getSelection();
  if(tool==='erase'&&(!sel||sel.isCollapsed)){
   const mark=event?.target.closest('mark[data-annotation-start]');const root=mark?.closest('[data-highlight-root]');
   if(root){const page=lesson.pages[Number(root.dataset.highlightRoot.match(/^original-\d+-(\d+)/)?.[1])-1];const sourceText=page?(root.dataset.highlightRoot.endsWith('-fa')?page.fa:page.text):root.textContent;
    if(sourceText)patch(p=>({...p,highlights:eraseAnnotations(p.highlights,{lessonId:lesson.id,blockId:root.dataset.highlightRoot,start:Number(mark.dataset.annotationStart),end:Number(mark.dataset.annotationEnd),sourceText})}));}
   return;
  }
  if(!sel||sel.isCollapsed||!sel.rangeCount)return;
  const range=sel.getRangeAt(0);const element=range.startContainer.nodeType===1?range.startContainer:range.startContainer.parentElement;
  const root=element?.closest('[data-highlight-root]');if(!root||!root.contains(range.endContainer))return;
  const prefix=range.cloneRange();prefix.selectNodeContents(root);prefix.setEnd(range.startContainer,range.startOffset);
  const start=Number(root.dataset.highlightOffset||0)+prefix.toString().length;const text=range.toString();if(text.trim().length<2)return;
  const originalBlock=root.dataset.highlightRoot.match(/^original-(\d+)-(\d+)(-fa)?$/);
  const sourceText=originalBlock?lesson.pages[Number(originalBlock[2])-1][originalBlock[3]?'fa':'text']:root.textContent;
  const next={id:crypto.randomUUID(),sourceRevision:SOURCE_REVISION,lessonId:lesson.id,blockId:root.dataset.highlightRoot,start,end:start+text.length,text,sourceText,tool,color:annotation.color,note:'',created:Date.now()};
  const marked=data.highlights.some(h=>h.lessonId===lesson.id&&h.blockId===next.blockId&&(h.tool||'highlight')===tool&&h.start<=next.start&&h.end>=next.end);
  if(tool!=='erase'&&marked)return;
  patch(p=>({...p,highlights:tool==='erase'?eraseAnnotations(p.highlights,next):addAnnotation(p.highlights,next)}));
  sel.removeAllRanges();
 }
 useEffect(()=>{
  // Mobile selection handles may move after pointerup; debounce until they settle.
  let timer;const changed=()=>{clearTimeout(timer);if(window.getSelection()?.isCollapsed)return;timer=setTimeout(pick,700);};
  document.addEventListener('selectionchange',changed);
  return()=>{clearTimeout(timer);document.removeEventListener('selectionchange',changed);};
 },[lesson?.id,annotation.tool,annotation.color,data.highlights]);
 function backup(){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mhba-notebook.json';a.click();URL.revokeObjectURL(url);setToast('نسخهٔ پشتیبان دفتر دانلود شد.');}
 async function restore(e){try{const file=e.target.files?.[0];if(!file)return;if(file.size>5000000)throw Error();const v=migrateSourceAnnotations(JSON.parse(await file.text()));if(v.version!==1||!Array.isArray(v.highlights)||!v.review||typeof v.review!=='object')throw Error();const safe=v.highlights.filter(h=>typeof h.text==='string'&&typeof h.blockId==='string'&&Number.isInteger(h.start)&&Number.isInteger(h.end)&&h.end>h.start&&lessons[h.lessonId]);patch(p=>({...p,highlights:[...p.highlights,...safe.filter(h=>!p.highlights.some(x=>x.id===h.id))],review:{...p.review,...v.review},answers:{...p.answers,...v.answers},read:{...p.read,...v.read},practice:{...p.practice,...v.practice},...(v.customExam&&Array.isArray(v.customExam.topics)&&['binary','questions','mixed','official','written'].includes(v.customExam.type)&&v.customExam.answers&&typeof v.customExam.answers==='object'?{customExam:v.customExam}:{})}));setToast('یادداشت‌ها و مرورها به دفتر اضافه شدند.');}catch{setToast('فایل پشتیبان معتبر نیست.');}e.target.value='';}
 const due=Object.values(lessons).flatMap(l=>l.cards).filter(q=>!data.review[q.id]||data.review[q.id].due<=Date.now()).length;
 const active=route==='highlights'?'highlights':route==='review'?'review':'home';
 if(['home','cards','review','exam','official','highlights'].includes(route)||route.endsWith('/notes'))return <LearningPortal view={['cards','review','exam','official'].includes(route)?route:'home'} data={data} patch={patch} navigate={navigate} backup={backup} restore={restore} toast={toast} storageError={storageError}/>;
 if(lesson)return <LessonStudio key={lesson.id} lesson={lesson} mode={mode} route={route} data={data} patch={patch} navigate={navigate} pick={pick} eraseSelection={()=>pick(null,'erase')} storageError={storageError} backup={backup}/>;
 return <div className="mhba-scope" lang="fa" dir="rtl" data-mhba-learning data-deutsch-learning><a href="#main-content" className="skip-link" onClick={e=>{e.preventDefault();document.getElementById('main-content')?.focus();}}>رفتن به محتوای اصلی</a><header className="topbar"><button className="brand" onClick={()=>navigate('home')}>MHBA</button><nav aria-label="ناوبری اصلی">{[['home','مدول‌ها'],['review','مرور'],['cards','فلش‌کارت‌ها'],['exam','آزمون']].map(([to,label])=><button key={to} className={active===to?'active':''} onClick={()=>navigate(to)}>{label}</button>)}</nav><Link className="fatima-home" href="/fatima">بازگشت به صفحهٔ فاطمه</Link></header>
 <div className="app-shell"><aside className="sidebar"><div className="sidebar-main">{[['home','book','مدول‌ها'],['cards','book','فلش‌کارت‌ها'],['exam','check','آزمون']].map(([to,icon,label])=><button key={to} className={active===to?'selected':''} onClick={()=>navigate(to)}><Icon name={icon}/><span>{label}</span>{to==='review'?<span className="count">{due}</span>:null}</button>)}</div><div className="sidebar-modules"><p>ترم اول</p><button className={route==='catalog'&&module===1?'module-active':''} onClick={()=>{setModule(1);navigate('catalog');}}>مدول ۱ <span>درس‌های ۱ تا ۱۰</span></button><button className={route==='catalog'&&module===2?'module-active':''} onClick={()=>{setModule(2);navigate('catalog');}}>مدول ۲ <span>درس‌های ۱۱ تا ۲۰</span></button></div><div className="notebook-tools"><p>یادداشت‌ها در همین مرورگر ذخیره می‌شوند.</p><button className="text-button" onClick={backup}><Icon name="download" size={16}/> پشتیبان دفتر</button><button className="text-button" onClick={()=>importRef.current?.click()}>بازیابی پشتیبان</button><input type="file" accept="application/json,.json" ref={importRef} onChange={restore} hidden/></div></aside>
 <main id="main-content" tabIndex={-1} className={'main '+(lesson?'lesson-main':'')} onPointerUp={pick} onKeyUp={e=>{if(e.key==='Shift')pick();}}>
 {storageError?<p className="notice" role="alert">ذخیره در مرورگر ممکن نشد. برای حفظ یادداشت‌ها نسخهٔ پشتیبان بگیر.</p>:null}
 {lesson?<><button className="breadcrumb" onClick={()=>navigate('home')}><Icon name="chevron" size={15}/> درس‌ها / مدول ۱ / درس {lesson.id}</button><div className="lesson-heading"><h1 className="de" dir="ltr">{lesson.de}</h1><p>{lesson.subtitle}</p></div><nav className="lesson-tabs" aria-label="بخش‌های درس">{[['read','مطالعهٔ جزوه'],['questions','سؤال‌های جزوه'],['exam','صحیح / غلط'],['review','فلش‌کارت‌ها'],['original','نمای PDF']].map(([to,title])=><button key={to} className={mode===to?'active':''} onClick={()=>navigate(`lesson/${lesson.id}/${to}`)}>{title}</button>)}</nav>
 {['read','questions'].includes(mode)?<div className="annotation-toolbar" role="toolbar" aria-label="ابزار علامت‌گذاری متن">
 <div className="annotation-modes">{[['highlight','هایلایت'],['underline','زیرخط'],['select','فقط انتخاب']].map(([tool,label])=><button key={tool} className={annotation.tool===tool?'outline active':'outline'} aria-pressed={annotation.tool===tool} onClick={()=>patch({annotation:{...annotation,tool}})}>{label}</button>)}</div>
 <div className="color-choices">{[['yellow','زرد'],['green','سبز'],['pink','صورتی']].map(([color,label])=><button key={color} className={`swatch highlight-${color} ${annotation.color===color?'selected':''}`} aria-label={`رنگ ${label}`} aria-pressed={annotation.color===color} onClick={()=>patch({annotation:{...annotation,color}})}>{annotation.color===color?<Icon name="check" size={15}/>:null}</button>)}</div><span className="auto-save-label" aria-label="ذخیرهٔ خودکار"><span className="autosave-prefix">ذخیرهٔ </span>خودکار</span>
 </div>:null}
 {mode==='read'?<Reader key={lesson.id} lesson={lesson} data={data} patch={patch}/>:mode==='questions'?<section className="questions-view"><div className="section-top"><div><h2>۱۰ سؤال خود جزوه</h2><p className="muted">سؤال‌های رسمی به آلمانی و فارسی؛ پاسخ کامل دانشگاه را زیر هر سؤال باز کن.</p></div><PdfLink file={lesson.solutions}>پاسخ‌های رسمی PDF</PdfLink></div>{lesson.questions.map(q=><Question key={q.id} q={q} lesson={lesson} data={data} patch={patch}/>)}</section>:mode==='exam'?<Suspense fallback={<p>در حال باز کردن تمرین…</p>}><Exam key={`${lesson.id}-${route.split('/')[3]||'all'}`} lesson={lesson} chapterId={route.split('/')[3]} data={data} patch={patch}/></Suspense>:mode==='review'?<StudioCards key={lesson.id} lesson={lesson} data={data} patch={patch}/>:<Original key={`${lesson.id}-${route.split('/')[3]||1}`} lesson={lesson} data={data} initialPage={Number(route.split('/')[3])||data.read[lesson.id]?.page||3}/>}</>:<Home module={module} setModule={setModule} data={data} navigate={navigate}/>}
 <div className="mobile-backup"><span>ذخیره در همین مرورگر</span><button className="text-button" onClick={backup}>پشتیبان دفتر</button><button className="text-button" onClick={()=>importRef.current?.click()}>بازیابی</button></div><footer className="page-footer"><span>MHBA</span><span>بر اساس جزوه‌های MHBA · ورودی ۲۰۲۶</span><a href="https://www.mhba.de/faq/" target="_blank" rel="noreferrer">راهنمای رسمی امتحان</a></footer>
 </main></div>
 {toast?<div className="toast" role="status">{toast}</div>:null}</div>;
}
function Home({module,setModule,data,navigate}){
 const lessons=useCourse();
 const current=lessons[data.lastLesson]||lessons[1];const [search,setSearch]=useState('');const rows=catalog.filter(l=>l.module===module&&`${l.de} ${l.fa}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
 return <div className="home"><div className="welcome"><h1>درس‌ها</h1></div><section className="continue-band"><div><span>مدول ۱ · درس {current.id}</span><h2 className="de" dir="ltr">{current.de}</h2><p>{current.fa}</p></div><button onClick={()=>navigate(`lesson/${current.id}/read`)}>ادامهٔ مطالعه <Icon name="arrow"/></button></section>
 <div className="catalog-toolbar"><div className="module-tabs" role="tablist" aria-label="مدول‌ها"><button role="tab" aria-selected={module===1} className={module===1?'active':''} onClick={()=>{setModule(1);setSearch('');}}>مدول ۱</button><button role="tab" aria-selected={module===2} className={module===2?'active':''} onClick={()=>{setModule(2);setSearch('');}}>مدول ۲</button></div><label className="search"><Icon name="search" size={17}/><input aria-label="جست‌وجوی درس‌ها" placeholder="جست‌وجوی درس…" value={search} onChange={e=>setSearch(e.target.value)}/></label></div>
 <div className="course-list">{rows.map(l=><button className={'course-row '+(!l.ready?'not-ready':'')} key={l.id} disabled={!l.ready} onClick={()=>navigate(`lesson/${l.id}/read`)}><span className="lesson-number">{String(l.id).padStart(2,'0')}</span><div className="course-name"><h3 className="de" dir="ltr">{l.de}</h3><p>{l.fa}</p></div><span className="row-state">{l.ready?(data.read[l.id]?.complete?'مطالعه‌شده':data.read[l.id]?'ادامهٔ مطالعه':'آمادهٔ مطالعه'):'هنوز ساخته نشده'}</span>{l.ready?<Icon name="arrow"/>:<span className="row-dash">—</span>}</button>)}</div>
 {rows.length===0?<p className="empty">درسی با این نام پیدا نشد.</p>:null}
 <div className="catalog-note"><p>در این نسخه، درس‌های ۱ و ۲ مدول اول برای مطالعه آماده‌اند. عنوان همهٔ درس‌ها از پنل رسمی گرفته شده است.</p>{module===1?<a href="https://www.mhba.de/mein-studium/lehre/lehrtexte-modul-1/0-einfuehrung/" target="_blank" rel="noreferrer">مقدمهٔ دوره در سایت دانشگاه <Icon name="external" size={14}/></a>:null}</div>
 <section className="exam-note"><Icon name="pen" size={24}/><div><h3>برای امتحان کتبی آماده شو.</h3><p>تمرین هر فصل فقط شامل گزاره‌های صحیح و غلط است. سؤال‌های خود جزوه در مطالعه و فلش‌کارت‌ها <b>بولد</b> هستند.</p></div><button className="text-button" onClick={()=>navigate('lesson/1/exam')}>تمرین درس اول <Icon name="arrow" size={17}/></button></section></div>;
}
