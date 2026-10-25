'use client'

import { Children, Fragment, isValidElement } from 'react'
import StandardLessonShell, { LessonSection, TakeHomeList } from './StandardLessonShell'
import styles from './LegacyLessonMigration.module.css'
import LessonHero from '@/components/LessonHero'
import LessonTakeHome from '@/components/LessonTakeHome'
import LessonKeyPoints from '@/components/LessonKeyPoints'

const COPY = {
  de: { contents:'Inhalte', path:'Lernpfad', progress:'gelesen', continue:'Weiterlernen', close:'Schließen', complete:'Abschnitt als gelesen markieren', completed:'Als gelesen markiert', completeLesson:'Ganze Lektion als gelesen markieren', lessonCompleted:'Ganze Lektion gelesen', takeHome:'Take Home Message', quiz:'Wissen prüfen', cards:'Karteikarten', source:'Quellen' },
  en: { contents:'Contents', path:'Learning path', progress:'read', continue:'Continue', close:'Close', complete:'Mark section as read', completed:'Marked as read', completeLesson:'Mark lesson as read', lessonCompleted:'Lesson marked as read', takeHome:'Take Home Message', quiz:'Test your knowledge', cards:'Flashcards', source:'Sources' },
  fa: { contents:'محتوا', path:'مسیر یادگیری', progress:'خوانده‌شده', continue:'ادامهٔ درس', close:'بستن', complete:'علامت‌گذاری بخش به‌عنوان خوانده‌شده', completed:'خوانده شد', completeLesson:'علامت‌گذاری کل درس به‌عنوان خوانده‌شده', lessonCompleted:'کل درس خوانده شد', takeHome:'نکات کلیدی', quiz:'دانش خود را بسنجید', cards:'فلش‌کارت‌ها', source:'منابع' },
}
const REGIONS = {
  abdomen: { de:'Abdomen', en:'Abdomen', fa:'شکم' },
  gehirn: { de:'Gehirn', en:'Brain', fa:'مغز' },
  msk: { de:'MSK', en:'MSK', fa:'اسکلتی‌عضلانی' },
  thorax: { de:'Thorax', en:'Chest', fa:'قفسهٔ سینه' },
  wirbelsaeule: { de:'Wirbelsäule', en:'Spine', fa:'ستون فقرات' },
  mamma: { de:'Mamma', en:'Breast', fa:'پستان' },
  gefaesse: { de:'Gefäße', en:'Vessels', fa:'عروق' },
  technik: { de:'Technik', en:'Imaging techniques', fa:'تکنیک‌های تصویربرداری' },
  lunge: { de:'Lunge', en:'Lung', fa:'ریه' },
}
const summaryPattern = /take[- ]?home|summary|نکات کلیدی|پیام نهایی|خلاصه/i
const sourcePattern = /^(?:sources?|quellen|references|further-reading)$/i
const text = node => Children.toArray(node).map(child => typeof child === 'string' || typeof child === 'number' ? String(child) : isValidElement(child) ? text(child.props.children) : '').join(' ').replace(/\s+/g,' ').trim()
const walk = (nodes, callback) => Children.forEach(nodes, node => { if (!isValidElement(node)) return; if (callback(node) !== false) walk(node.props.children, callback) })
const first = (nodes, match) => { let found; walk(nodes, node => { if (!found && match(node)) { found=node; return false } return !found }); return found }
const cleanPanel = nodes => Children.toArray(nodes).flatMap(node => {
  if (!isValidElement(node)) return [node]
  if (node.props['data-legacy-section-read'])return []
  if (node.type==='button' && (first(node.props.children,e=>e.type==='h2') || /sectionHeader|cardHeader|readButton|sectionRead/.test(node.props.className||'') || String(node.props['aria-controls']||'').endsWith('-panel')) || node.type==='h2' && first(node.props.children,e=>e.type==='button')) return []
  if (node.props.hidden !== undefined || /sectionBody|chapterBody/.test(node.props.className || '')) return cleanPanel(node.props.children)
  return [node]
})

function summaryItems(nodes, lang) {
  const pick=value=>typeof value==='string'?value:value?.[lang]||value?.de||''
  const rows=[]
  walk(nodes, node => {
    if (node.type===LessonTakeHome && node.props.points) {
      rows.push(...node.props.points.map(point=>({title:pick(point.title),detail:pick(point.detail)})))
      return false
    }
    if (Array.isArray(node.props.items) && node.props.items.every(item=>typeof item==='string'||item?.title && (item.detail||item.text))) { rows.push(...node.props.items.map(item=>typeof item==='string'?{title:item,detail:item}:{title:item.title,detail:item.detail||item.text}));return false }
    if (node.props.markdown) {
      const lines=node.props.markdown.split('\n').map(line=>line.replace(/^\s*(?:[-*]|\d+[.)])\s+/,'').replace(/\*\*/g,'').trim()).map(line=>line.replace(/^#+\s*/,''))
        .filter(line=>line && !/^(?:Take-Home Messages|Radyar Memory Box)$/i.test(line) && !line.startsWith('|'))
      rows.push(...lines.map(line=>({title:line,detail:line})));return false
    }
    if (node.type==='p') {const value=text(node.props.children);if(value)rows.push({title:value,detail:value});return false}
    if (node.type==='li') { const value=text(node.props.children); if(value) rows.push({title:value,detail:value}); return false }
    const heading=first(node.props.children,e=>e.type==='h3'||e.type==='h4')||first(node.props.children,e=>e.type==='strong'&&!/^\d+$/.test(text(e.props.children)))
    const paragraph=first(node.props.children, e=>e.type==='p')
    let headingCount=0;walk(node.props.children,e=>{if(['h3','h4'].includes(e.type))headingCount+=1})
    if (heading && paragraph && headingCount<=1 && ['article','div'].includes(node.type) && !first(node.props.children,e=>e.type==='article')) {
      const title=text(heading.props.children),detail=text(paragraph.props.children)
      if (title && detail) { rows.push({title,detail});return false }
    }
  })
  const unique=[...new Map(rows.map(row=>[`${row.title}|${row.detail}`,row])).values()]
  return unique
}

function Icon({name}) {
  const paths={summary:'M12 3l2.5 6 6.5 3-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-3z',case:'M5 4h14v17H5zM8 9h8M8 13h8M8 17h5',scan:'M4 4h16v16H4zM7 12h10M12 7v10',map:'M4 5l5-2 6 2 5-2v16l-5 2-6-2-5 2zM9 3v16M15 5v16'}
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]||paths.map}/></svg>
}

// A declarative bridge for preserved authored JSX, never a DOM rewrite. Chapters,
// questions and clinical figures remain React children inside the maintained shell.
export default function LegacyLessonMigration({children, lessonRoute, lessonId, lang='de', summaryFallback=[], summarySectionId, lessonRead=false, ...original}) {
  const c=COPY[lang]||COPY.de
  const header=first(children,node=>node.type==='header')
  const heading=first(header?.props.children||children,node=>node.type==='h1'||node.type===LessonHero)
  const title=heading?.props.title||heading?.props.children||lessonRoute.split('/').at(-1)
  const chapters=[],sources=[],auxiliary=[],footers=[],retainedIntro=[],readControls=[]
  const ids=new Set()
  walk(children,node=>{
    if (node.props.role==='dialog' || /lightbox|imageModal/.test(node.props.className||'')) { auxiliary.push(node);return false }
    if(node.props.migrationReadControl || Object.hasOwn(node.props,'data-migration-read-control') || /readControl|readBar/.test(node.props.className||'')) {if(!readControls.length)readControls.push(node);return false}
    if(/visualIntro|pillarLab|questionLab/.test(node.props.className||'')) {retainedIntro.push(node);return false}
    if(node.type==='section' && /source|reference|further-reading/i.test(node.props['aria-labelledby']||'')) {footers.push(node);return false}
    if(/^https?:/.test(node.props.href||'')) {footers.push(node);return false}
    if(node.type==='p' && first(node.props.children,e=>/^https?:/.test(e.props.href||''))) {footers.push(node);return false}
    if(node.type==='details' && /source|reference/i.test(node.props.className||'')) {footers.push(node);return false}
    if(node.type==='footer') {footers.push(node);return false}
    if (node.type==='header' || node.type==='aside') return false
    const id=node.props.id||node.props.section?.id
    const custom=Boolean(node.props.migrationChapter)
    const native=node.type==='section' && id && first(node.props.children,e=>e.type==='button' || e.type==='h2')
    if (!custom && !native) return
    if (!id || ids.has(id)) return false
    ids.add(id)
    const localHeading=first(node.props.children,e=>e.type==='h2'||e.type==='strong')
    const label=node.props.title||node.props.section?.title||localHeading?.props.children||id
    const chapter={id,label,icon:summaryPattern.test(id+' '+text(label))?'summary':/fall|case|bild/i.test(id)?'case':'map',body:<>{node.props.lead?<p>{node.props.lead}</p>:null}{custom?node.props.children:cleanPanel(node.props.children)}</>,summaryBody:custom?node.props.children:cleanPanel(node.props.children)}
    if(sourcePattern.test(id))sources.push(chapter);else chapters.push(chapter)
    return false
  })
  // Compact lessons without accordion components provide explicit section blocks.
  if(!chapters.length) {
    walk(children,node=>{
      if(node.type!=='section')return
      const heading=first(node.props.children,e=>e.type==='h2')
      chapters.push({id:`content-${chapters.length+1}`,label:heading?.props.children||title,icon:'map',body:node.props.children});return false
    })
  }
  const summary=chapters.find(chapter=>chapter.id===summarySectionId||summaryPattern.test(chapter.id+' '+text(chapter.label)))
  const content=chapters.filter(chapter=>chapter!==summary)
  const summaryId=summary?.id||'takehome'
  let points=summaryFallback.length?summaryFallback:summaryItems(summary?.summaryBody||summary?.body,lang)
  const summaryExtras=[]
  const pointText=points.map(point=>text(point.title)+' '+text(point.detail)).join(' ')
  walk(summary?.body,node=>{if(['h3','h4','p'].includes(node.type)){const value=text(node.props.children);if(value&&!pointText.includes(value))summaryExtras.push(node);return false}})
  const headerIntro=[...retainedIntro]
  const preserveHeader = nodes => Children.forEach(nodes,node=>{
    if(!isValidElement(node))return
    if(node.type===LessonHero) {if(node.props.visual&&node.props.visualCaption)headerIntro.push(<figure className={styles.retainedDiagram} key="authored-header-diagram">{node.props.visual}<figcaption>{node.props.visualCaption}</figcaption></figure>);return}
    if(node.type==='h1'||node.type==='nav'||node.type==='button'||/breadcrumb|sourceBadge|eyebrow/.test(node.props.className||''))return
    if(node.props.href) {if(!/\/ueben\/quiz|\/flashcards\/|^\/$|^\/lernen(?:\/|$)/.test(node.props.href))headerIntro.push(node);return}
    const hasTitle=first(node.props.children,e=>e.type==='h1'||e.type===LessonHero)
    if(!hasTitle&&(node.type==='aside'||node.type==='article'||node.type===LessonKeyPoints||/heroStats/.test(node.props.className||'')||first(node.props.children,e=>e.type==='h3')&&first(node.props.children,e=>e.type==='p'))) {headerIntro.push(node);return}
    if(node.type==='p'){headerIntro.push(node);return}
    preserveHeader(node.props.children)
  })
  preserveHeader(header?.props.children)
  const actionNodes=[]
  walk(children,node=>{if(node.props.href && /(?:\/ueben\/quiz|\/flashcards\/)/.test(node.props.href))actionNodes.push(node)})
  const quiz=actionNodes.find(node=>node.props.href.includes('/ueben/quiz'))
  const cards=actionNodes.find(node=>node.props.href.includes('/flashcards/'))
  const region=lessonRoute.split('/')[1]
  const regionLabel=REGIONS[region]?.[lang]||REGIONS[region]?.de||region
  const regionCourse=region==='lunge'?'thorax':region==='gefaesse'?'gefaesse-ir':region
  const locale=href=>`${href}${href.includes('?')?'&':'?'}lang=${lang}`
  const globalRead=first(readControls,node=>node.props.migrationReadControl||Object.hasOwn(node.props,'data-migration-read-control')||node.props.isRead!==undefined)
  const serverRead=Boolean(globalRead?.props.isRead||lessonRead)
  // Headings can contain styled React fragments; navigation needs a text label
  // because the shared shell also uses it in the accessible button name.
  const sections=[...content.map(({id,label,icon})=>({id,label:text(label),icon})),{id:summaryId,label:c.takeHome,icon:'summary',emphasis:true}]
  return <StandardLessonShell lessonRead={serverRead} lessonId={lessonId||lessonRoute} heroLessonId={lessonRoute} lang={lang} title={title} author="Dr. Zia" heroImageAlt={text(title)} syncHashNavigation
    breadcrumbs={[{label:'RadYar',href:locale('/')},{label:regionLabel,href:locale(`/lernen/${regionCourse}`)},{label:text(title)}]}
    sections={sections} labels={c} renderIcon={name=><Icon name={name}/>} actions={{mcq:quiz?{href:quiz.props.href,label:text(quiz.props.children)||c.quiz}:null,flashcards:cards?{href:cards.props.href,label:text(cards.props.children)||c.cards}:null}}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',accent:'#417e89',accentStrong:'#24515b',accentSoft:'#e4f1f1',secondary:'#bb8a5b',secondaryStrong:'#785032',heroBase:'#122630'}}>
    {content.map((chapter,index)=><LessonSection key={chapter.id} id={chapter.id} title={chapter.label} icon={chapter.icon}><div className={styles.content}>{index===0&&headerIntro.length?<div className={styles.intro}>{headerIntro}</div>:null}{index===0&&readControls.length?<div className={styles.legacyRead}>{readControls}</div>:null}{chapter.body}</div></LessonSection>)}
    {footers.length?<aside className={styles.sources}>{footers}</aside>:null}
    {sources.length?<aside className={styles.sources}>{sources.map(source=><details key={source.id} id={source.id}><summary>{source.label}</summary><div className={styles.content}>{source.body}</div></details>)}</aside>:null}
    <LessonSection id={summaryId} title={c.takeHome} icon="summary">{summaryExtras.length?<div className={styles.summaryPrelude}>{summaryExtras}</div>:null}{points.length?<div data-migration-summary-rules={points.length}><TakeHomeList items={points}/></div>:null}{summary&&!points.length?<div className={styles.content}>{summary.body}</div>:null}</LessonSection>
    {auxiliary}
  </StandardLessonShell>
}
