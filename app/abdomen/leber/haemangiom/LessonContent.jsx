'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LessonHero from '@/components/LessonHero'
import LessonTakeHome from '@/components/LessonTakeHome'
import { HEMANGIOMA_CHAPTERS as CHAPTERS, HEMANGIOMA_COPY as COPY } from '@/data/haemangiomaLesson'
import reference from '@/app/andarun/test/page.module.css'
import typography from '@/components/LessonTypography.module.css'
import styles from './page.module.css'

const summaryLabel = lang => lang === "fa" ? "پیام نهایی" : "Take Home Message"
const PATH='/abdomen/leber/haemangiom'
const TRACKED=CHAPTERS.filter(chapter=>chapter.id!=='takehome').map(chapter=>chapter.id)
const L=(de,en,fa)=>({de,en,fa})
const pick=(value,lang)=>typeof value==='string'?value:value[lang]||value.de
const ALIASES={grundlagen:'muster',sono:'muster',ct:'dynamik',fallbeispiele:'dynamik'}
const resolve=hash=>CHAPTERS.some(chapter=>chapter.id===hash)?hash:ALIASES[hash]

function Icon({name}) {
 const paths={pattern:'M4 8c3-5 13-5 16 0v9c-4 4-12 4-16 0z M8 10h8 M8 14h5',scan:'M4 4h16v16H4z M8 8h8v8H8z',flow:'M3 12h18 M15 6l6 6-6 6 M6 5v14',compare:'M12 3v18 M4 6h16 M7 6l-4 8h8z M17 6l-4 8h8z',case:'M7 3h10v18H7z M10 8h4 M10 12h4 M10 16h4',spark:'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',check:'M5 12l4 4L19 6',arrow:'M4 12h16 M14 6l6 6-6 6',warning:'M12 3L2 21h20z M12 9v5 M12 17v1'}
 const aliases={vessel:'flow',chart:'compare',brain:'pattern'}
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths[aliases[name]]||paths.pattern}/></svg>
}
function Note({block,lang}) {
 const warning=block.tone==='warning'
 return <aside className={warning?reference.warning:reference.rememberNote}><span className={`${reference.calloutLabel} ${typography.handwritten}`}><Icon name={warning?'warning':'spark'}/>{pick(COPY.ui[warning?'warning':'key'],lang)}</span><p className={styles.noteText}>{pick(block.text,lang)}</p></aside>
}
const PHASES=[
 {title:L('Nativ','Unenhanced','بدون کنتراست'),text:L('Die Läsion ist hypodens. Das allein ist unspezifisch.','The lesion is hypoattenuating. This alone is nonspecific.','ضایعه هیپودنس است؛ این یافته به‌تنهایی اختصاصی نیست.')},
 {title:L('Arteriell','Arterial','شریانی'),text:L('Einzelne kräftige Knötchen am Rand: diskontinuierlich, kein glatter Ring.','Separate bright peripheral nodules: discontinuous, not a smooth rim.','ندول‌های روشن و جدا از هم در حاشیه؛ ناپیوسته، نه یک حلقه صاف.')},
 {title:L('Portalvenös','Portal venous','پورتال‌ونوس'),text:L('Die anreichernden Areale werden größer und füllen nach innen auf.','The enhancing regions enlarge and progressively fill toward the centre.','نواحی دارای تقویت بزرگ‌تر می‌شوند و به‌تدریج به سمت مرکز پیش می‌روند.')},
 {title:L('Verzögert','Delayed','تأخیری'),text:L('Die Anreicherung bleibt blutpoolähnlich; bei großen Hämangiomen kann die Mitte unvollständig gefüllt bleiben.','Enhancement remains blood-pool-like; large haemangiomas can retain an unfilled centre.','تقویت مشابه حوضچه خون باقی می‌ماند؛ مرکز همانژیوم بزرگ ممکن است کامل پر نشود.')},
]
function PhaseDiagram({lang}) {
 const [phase,setPhase]=useState(1)
 return <figure className={styles.phaseFigure}><figcaption className={styles.figureTitle}>{pick(L('Vom Rand zur Mitte','From the edge inward','از حاشیه به مرکز'),lang)}</figcaption><div className={styles.phaseControls} role="group" aria-label={pick(L('Kontrastmittelphase wählen','Choose contrast phase','انتخاب فاز کنتراست'),lang)}>{PHASES.map((item,index)=><button type="button" key={index} aria-pressed={phase===index} onClick={()=>setPhase(index)}>{pick(item.title,lang)}</button>)}</div><div className={styles.phaseCanvas}><svg viewBox="0 0 360 180" role="img" aria-label={pick(L('Schema der zunehmenden zentripetalen Auffüllung','Schematic of progressive centripetal fill-in','شماتیک پرشدگی تدریجی مرکزگرا'),lang)}><rect width="360" height="180" rx="14" fill="var(--canvas)"/><path d="M35 70Q70 15 170 36Q226 19 319 65L301 139Q225 165 165 138L66 150Q29 129 35 70Z" fill="var(--liver-fill)" stroke="var(--muted)" strokeWidth="1.5"/><circle cx="115" cy="93" r="47" fill="var(--lesion-empty)" stroke="var(--muted)"/>{phase>=1?[[91,61],[145,69],[151,112],[106,130],[77,100]].map(([cx,cy],index)=><circle key={index} cx={cx} cy={cy} r={phase===1?9:phase===2?17:23} fill="var(--enhancement)"/>):null}{phase===3?<circle cx="115" cy="93" r="44" fill="var(--enhancement)"/>:null}<circle cx="245" cy="93" r="15" fill={phase?'var(--enhancement)':'var(--lesion-empty)'} stroke="var(--muted)"/><path d="M237 92h16" stroke="var(--ink)"/></svg><p aria-live="polite">{pick(PHASES[phase].text,lang)}</p></div><small>{pick(L('Lehrschema, keine CT. Kreis rechts: Gefäß als Blutpool-Referenz. Typischer Verlauf ohne feste Zeitskala.','Teaching schematic, not CT. Circle on the right: a vessel as blood-pool reference. Typical progression without a fixed time scale.','شماتیک آموزشی، نه CT. دایره سمت راست: رگ به‌عنوان مرجع حوضچه خون. روند تیپیک، بدون زمان‌بندی ثابت.'),lang)}</small></figure>
}
function TeachingCase({lang}) {
 const phases = [
  { src:'/haemangiom/case-10052-arterial-ct.jpg', width:442, height:310, title:L('Arteriell','Arterial','شریانی'), alt:L('Segment-VII-Läsion in der arteriellen Phase mit kleiner peripherer Anreicherung','Segment VII lesion in the arterial phase with a tiny peripheral enhancing focus','ضایعه سگمان ۷ در فاز شریانی، با کانون کوچک جذب کنتراست در محیط') },
  { src:'/haemangiom/case-10052-portal-venous-ct.jpg', width:442, height:324, title:L('Portalvenös','Portal venous','پورتال‌ونوس'), alt:L('Diskontinuierliche periphere noduläre Anreicherung derselben Läsion','Discontinuous peripheral nodular enhancement of the same lesion','جذب ندولار محیطی و ناپیوسته در همان ضایعه') },
  { src:'/haemangiom/case-10052-delayed-ct.jpg', width:442, height:318, title:L('Spätphase','Delayed','تأخیری'), alt:L('Teilweises zentripetales Fill-in derselben Läsion','Partial centripetal fill-in of the same lesion','پرشدن نسبی همان ضایعه از محیط به‌سمت مرکز') },
 ]
 return <figure className={styles.realCase}>
  <div className={styles.caseHeading}><span className={styles.caseBadge}>CT</span><h3>{pick(L('Erst das typische Muster sehen','See the typical pattern first','اول الگوی تیپیک را ببینید'),lang)}</h3></div>
  <p>{pick(L('Verfolge dieselbe Läsion in Segment VII durch drei beschriftete Phasen. Achte darauf, wann die peripheren Kontrastknoten sichtbar werden und wie weit sie sich später nach innen ausbreiten.','Follow the same segment VII lesion through three labelled phases. Note when the peripheral enhancing nodules become visible and how far they extend inward later.','همان ضایعهٔ سگمان ۷ را در سه فاز برچسب‌خورده دنبال کنید. ببینید ندول‌های محیطی از چه زمانی دیده می‌شوند و بعد تا کجا به سمت مرکز گسترش می‌یابند.'),lang)}</p>
  <div className={styles.casePhaseGrid}>
   {phases.map(phase=><div className={styles.casePhase} key={phase.src}>
    <strong className={styles.casePhaseLabel}>{pick(phase.title,lang)}</strong>
    <a href={phase.src} target="_blank" rel="noopener noreferrer" data-no-zoom aria-label={pick(L(`${phase.title.de} CT in voller Größe öffnen`,`Open ${phase.title.en.toLowerCase()} CT at full size`,`بازکردن CT ${phase.title.fa} در اندازهٔ کامل`),lang)}>
     <Image src={phase.src} width={phase.width} height={phase.height} alt={pick(phase.alt,lang)} sizes="(max-width:760px) calc(100vw - 64px), 30vw"/>
    </a>
   </div>)}
  </div>
  <figcaption className={styles.caseSource}><strong>{pick(L('Diskontinuierliche Randknötchen → partielles zentripetales Fill-in.','Discontinuous peripheral nodules → partial centripetal fill-in.','ندول‌های ناپیوستهٔ محیطی ← پرشدن نسبی به‌سمت مرکز.'),lang)}</strong>
   <a href="https://radiopaedia.org/cases/10052/play" target="_blank" rel="noopener noreferrer">{pick(L('Case courtesy of Hani M. Al Salam · Radiopaedia.org · Fall 10052 · CC BY-NC-SA 3.0','Case courtesy of Hani M. Al Salam · Radiopaedia.org · case 10052 · CC BY-NC-SA 3.0','با مشارکت Hani M. Al Salam · Radiopaedia.org · مورد 10052 · CC BY-NC-SA 3.0'),lang)} ↗</a>
   <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noopener noreferrer">{pick(L('Lizenztext ↗','License terms ↗','متن مجوز ↗'),lang)}</a>
  </figcaption>
 </figure>
}
function DwiDiagram({lang}) {
 return <figure className={styles.dwiFigure}><figcaption className={styles.figureTitle}>{pick(L('DWI immer zusammen mit ADC lesen','Always read DWI together with ADC','DWI را همیشه همراه ADC بخوانید'),lang)}</figcaption><div className={styles.signalGrid}>{['T2','DWI','ADC'].map(label=><div key={label}><svg viewBox="0 0 120 100" role="img" aria-label={pick(L(`${label}: schematisch hohes Signal`,`${label}: schematic high signal`,`${label}: سیگنال بالا در شماتیک`),lang)}><rect width="120" height="100" rx="10" fill="#11151e"/><ellipse cx="60" cy="50" rx="45" ry="34" fill="#424b58"/><circle cx="72" cy="42" r="15" fill="#edf4fa"/></svg><strong dir="ltr">{label}</strong></div>)}</div><p>{pick(L('DWI hell + ADC hoch: T2-shine-through. Für echte Restriktion müsste der ADC erniedrigt sein.','Bright DWI + high ADC: T2 shine-through. True restriction requires reduced ADC.','DWI روشن + ADC بالا: اثر T2 shine-through. محدودیت واقعی انتشار با ADC کاهش‌یافته همراه است.'),lang)}</p><small>{pick(L('Lehrschema, keine Patientenbilder. DWI/ADC allein sichern keine Diagnose.','Teaching schematic, not patient images. DWI/ADC alone do not establish a diagnosis.','شماتیک آموزشی است، نه تصویر بیمار. DWI و ADC به‌تنهایی تشخیص را تعیین نمی‌کنند.'),lang)}</small></figure>
}
function SelfCheck({lang}) {
 const [answer,setAnswer]=useState(null),quiz=COPY.quiz
 return <section className={styles.quiz} aria-labelledby="haemangioma-check-title"><h3 id="haemangioma-check-title">{pick(quiz.title,lang)}</h3><p>{pick(quiz.stem,lang)}</p><div className={styles.answers}>{quiz.options.map((option,index)=><button type="button" key={index} aria-pressed={answer===index} onClick={()=>setAnswer(index)}>{pick(option,lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer!==null?<p className={styles.feedback}><strong>{pick(answer===quiz.correct?L('Richtig.','Correct.','درست است.'):L('Noch einmal prüfen.','Review your choice.','انتخابتان را دوباره بررسی کنید.'),lang)}</strong> {pick(quiz.feedback[answer],lang)}</p>:null}</div></section>
}
function Block({block,lang}) {
 const c=value=>pick(value,lang)
 switch(block.type) {
  case 'text':return <p className={styles.bodyText}>{c(block.text)}</p>
  case 'note':return <Note block={block} lang={lang}/>
  case 'phaseDiagram':return <PhaseDiagram lang={lang}/>
  case 'dwiDiagram':return <DwiDiagram lang={lang}/>
  case 'cases':return <TeachingCase lang={lang}/>
  case 'quiz':return <SelfCheck lang={lang}/>
  case 'report':return <aside className={styles.report}><h3>{c(block.title)}</h3><blockquote>{c(block.text)}</blockquote></aside>
  case 'summary':return <LessonTakeHome points={block.items.map(item => ({ title: c(item), detail: '' }))} lang={lang} idPrefix="haemangioma-take-home" />
  case 'table':return <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={c(block.headers[0])}><table className={styles.table}><thead><tr>{block.headers.map((cell,index)=><th scope="col" key={index}>{c(cell)}</th>)}</tr></thead><tbody>{block.rows.map((row,index)=><tr key={index}>{row.map((cell,j)=>j===0?<th scope="row" key={j}>{c(cell)}</th>:<td key={j}>{c(cell)}</td>)}</tr>)}</tbody></table></div>
  default:throw new Error(`Unknown lesson block: ${block.type}`)
 }
}
export default function HaemangiomaLesson({lang='de',readSections,setReadSections,isRead,toggleRead,authError}) {
 const c=value=>pick(value,lang),ui=COPY.ui
 const [openId,setOpenId]=useState(CHAPTERS[0].id),[mobileOpen,setMobileOpen]=useState(false)
 const withLang=href=>lang==='de'?href:`${href}${href.includes('?')?'&':'?'}lang=${lang}`
 useEffect(()=>{const sync=()=>setOpenId(resolve(window.location.hash.slice(1))||CHAPTERS[0].id);sync();window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync)}},[])
 const select=(id,collapse=false)=>{const next=collapse&&id===openId?null:id;setOpenId(next);setMobileOpen(false);const url=new URL(window.location.href);url.hash=next||'';window.history.replaceState(null,'',url);if(next)requestAnimationFrame(()=>document.getElementById(next)?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}))}
 const markSection=id=>{if(isRead)toggleRead();setReadSections(previous=>{const next=new Set(previous);if(next.has(id))next.delete(id);else next.add(id);return next})}
 const markAll=()=>{if(toggleRead())setReadSections(isRead?new Set():new Set(TRACKED))}
 const activeIndex=CHAPTERS.findIndex(chapter=>chapter.id===openId)
 const nav=()=>CHAPTERS.map(chapter=><button type="button" key={chapter.id} aria-current={openId===chapter.id?'location':undefined} className={openId===chapter.id?reference.activeSideItem:undefined} onClick={()=>select(chapter.id)}><span className={reference.sideIcon}><Icon name={chapter.icon}/></span><strong>{(chapter.emphasis || chapter.id === "takehome" ? summaryLabel(lang) : c(chapter.title))}{readSections.has(chapter.id)?<span className={styles.readTick} aria-label={c(ui.marked)}> ✓</span>:null}</strong></button>)
 return <main className={`${reference.page} ${styles.page}`} lang={lang} dir={lang==='fa'?'rtl':'ltr'} data-lesson-progress-managed="true" data-disable-lesson-explorer="true"><header className={reference.header}><div className={reference.topline}><nav className={reference.breadcrumb} aria-label={c(ui.breadcrumb)}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/abdomen')}>{c(L('Abdomen','Abdomen','شکم'))}</Link><span>/</span><strong>{c(COPY.title)}</strong></nav><span className={`${reference.author} ${typography.handwritten}`}>Dr. Zia</span></div><LessonHero title={c(COPY.title)} imageSrc="/educational/haemangioma-hero-v1.webp" imageAlt={c(COPY.heroAlt)} lang={lang}/><div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={()=>select('takehome')}><Icon name="spark"/>{summaryLabel(lang)}</button><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=abdomen&n=8&themen=haemangiom&from=${encodeURIComponent(withLang(PATH))}`)}>{c(ui.mcq)}<Icon name="arrow"/></Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/haemangiom?from=${encodeURIComponent(withLang(PATH))}`)}><Icon name="case"/>{c(ui.flashcards)}</Link></div><div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(ui.path)} aria-valuemin={0} aria-valuemax={TRACKED.length} aria-valuenow={readSections.size}><i style={{width:`${readSections.size/TRACKED.length*100}%`}}/></div><span>{readSections.size} / {TRACKED.length} {c(ui.read)}</span><div className={reference.progressActions}><button type="button" className={`${reference.lessonCompleteButton} ${isRead?reference.lessonCompleteButtonDone:''}`} aria-pressed={isRead} onClick={markAll}><Icon name="check"/>{c(isRead?ui.fullMarked:ui.fullMark)}</button><button type="button" className={reference.continueButton} disabled={activeIndex===CHAPTERS.length-1} onClick={()=>select(CHAPTERS[activeIndex+1].id)}>{c(ui.continue)}<Icon name="arrow"/></button></div></div>{authError?<p className={styles.auth} role="status">{c(ui.auth)} <Link href={withLang('/sign-in')}>{c(ui.login)}</Link></p>:null}</header><div className={reference.layout}><aside className={reference.sidebar}><h2>{c(ui.path)}</h2><nav aria-label={c(ui.path)}>{nav()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(chapter=><section id={chapter.id} key={chapter.id} className={`${reference.section} ${openId===chapter.id?reference.sectionOpen:''} ${chapter.id==='takehome'?reference.takeHomeSection:''}`}><h2 className={styles.chapterHeading}><button type="button" className={reference.sectionHeader} aria-expanded={openId===chapter.id} aria-controls={`${chapter.id}-panel`} onClick={()=>select(chapter.id,true)}><span className={reference.sectionIcon}><Icon name={chapter.icon}/></span><span><strong>{(chapter.emphasis || chapter.id === "takehome" ? summaryLabel(lang) : c(chapter.title))}</strong></span><span className={reference.toggle} aria-hidden="true">{openId===chapter.id?'−':'+'}</span></button></h2><div id={`${chapter.id}-panel`} className={reference.sectionBody} hidden={openId!==chapter.id}>{chapter.lead?<p className={reference.lead}>{c(chapter.lead)}</p>:null}{chapter.blocks.map((block,index)=><Block key={index} block={block} lang={lang}/>)}{chapter.id!=='takehome'?<button type="button" className={`${reference.readButton} ${readSections.has(chapter.id)?reference.readButtonDone:''}`} aria-pressed={readSections.has(chapter.id)} onClick={()=>markSection(chapter.id)}><Icon name="check"/>{c(readSections.has(chapter.id)?ui.marked:ui.mark)}</button>:null}</div></section>)}<details className={styles.sources}><summary>{c(ui.sources)}</summary><p>{c(L('Grundlage: dreiseitige Zusammenfassung von Dr. Zia; präzisiert anhand folgender Quellen.','Based on Dr. Zia’s three-page summary, with clarifications from these sources.','بر پایه خلاصه سه‌صفحه‌ای Dr. Zia، با دقیق‌سازی نکات بر اساس منابع زیر.'))}</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7206317/" target="_blank" rel="noopener noreferrer">EASL 2016 · Benign liver tumours (reproduced 2020) ↗</a><a href="https://doi.org/10.14309/ajg.0000000000002857" target="_blank" rel="noopener noreferrer">ACG 2024 · Focal Liver Lesions ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2760589/" target="_blank" rel="noopener noreferrer">Vossen et al. 2008 · Enhancement & diffusion ↗</a><a href="https://doi.org/10.1007/s11604-021-01139-z" target="_blank" rel="noopener noreferrer">Jia et al. 2021 · Sclerosing / sclerosed haemangioma ↗</a><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9668265/" target="_blank" rel="noopener noreferrer">Takinoshita et al. 2022 · Restricted diffusion case report ↗</a></details></article></div><div className={styles.mobilePath}><button type="button" className={styles.mobileTrigger} aria-expanded={mobileOpen} aria-controls="haemangioma-mobile-path" onClick={()=>setMobileOpen(value=>!value)}><Icon name="pattern"/><strong>{c(ui.path)}</strong><span>{readSections.size} / {TRACKED.length}</span></button><nav id="haemangioma-mobile-path" className={`${reference.sidebar} ${styles.mobilePanel}`} hidden={!mobileOpen} aria-label={c(ui.path)}>{nav()}</nav></div></main>
}
