'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GROUPS, filterTools, pick, toolHref, directoryHref } from './catalog'
import Icon from './Icons'
import styles from './orbit.module.css'

const ASSETS = ['brain','thorax','mamma','abdomen','urogenital','onko','spine']
const SLOTS = [[29,20],[58,15],[85,29],[85,61],[54,84],[22,77],[9,46]]
export default function OrbitDirectory({ lang, ui, initialGroup = 'urogenital', initialQuery = '' }) {
  const [selected, setSelected] = useState(GROUPS.some(g=>g.id===initialGroup) ? initialGroup : 'urogenital')
  const [searching, setSearching] = useState(Boolean(initialQuery))
  const [query, setQuery] = useState(initialQuery)
  const start = useRef(null)
  const dragged = useRef(false)
  const input = useRef(null)
  const searchButton = useRef(null)
  const category = GROUPS.find(g => g.id === selected)
  const selectedIndex = GROUPS.indexOf(category)
  const tools = filterTools(searching ? 'all' : selected, searching ? query : '')
  const label = (de, en, fa) => lang === 'fa' ? fa : lang === 'en' ? en : de
  function choose(id) {
    setSelected(id); setSearching(false)
    window.history.replaceState(null,'',directoryHref({group:id,lang}))
  }
  function move(step) { choose(GROUPS[(selectedIndex + step + 7) % 7].id) }
  function closeSearch() { setSearching(false); searchButton.current?.focus() }
  useEffect(() => {
    const key = e => {
      if (e.key === 'Escape' && searching) { e.preventDefault(); closeSearch() }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.target.isContentEditable) { e.preventDefault(); setSearching(true) }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [searching])
  useEffect(() => { if (searching) input.current?.focus() }, [searching])
  return <main className={styles.shell} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <h1 className={styles.srOnly}>{ui.directory}</h1>
    <div className={styles.layout}>
      <section className={styles.orbit} aria-label={ui.menu} onPointerDown={e => { start.current = e.target.closest('button') ? null : e.clientX; dragged.current=false }} onPointerUp={e => { if (start.current !== null && Math.abs(e.clientX - start.current) > 60) { dragged.current=true; move(e.clientX < start.current ? 1 : -1) } start.current=null }} onPointerCancel={() => { start.current=null }} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}}>
        <div className={styles.ring} aria-hidden="true"/>
        <div className={styles.center}><h2>{pick(category.name, lang)}</h2><span>{filterTools(selected, '').length} {ui.tools}</span><div className={styles.rotation}><button type="button" onClick={() => move(-1)} aria-label={label('Vorheriges Fachgebiet','Previous specialty','دسته قبلی')}><Icon name="arrow"/></button><button type="button" onClick={() => move(1)} aria-label={label('Nächstes Fachgebiet','Next specialty','دسته بعدی')}><Icon name="arrow"/></button></div><small>{label('Ziehen zum Entdecken','Drag to explore','برای مرور بکشید')}</small></div>
        {GROUPS.map((g,i) => {const [x,y]=SLOTS[(i-selectedIndex+4+7)%7]; return <button type="button" key={g.id} className={`${styles.organ} ${selected===g.id?styles.active:''}`} style={{'--x':`${x}%`,'--y':`${y}%`}} onClick={()=>{if(!dragged.current)choose(g.id)}} aria-pressed={selected===g.id}><img className={styles.art} src={`/images/rechner/${ASSETS[i]}.webp`} alt="" draggable="false" width="512" height="512"/><span className={styles.caption}>{pick(g.name,lang)}</span></button>})}
      </section>
      <section className={styles.results} aria-label={searching ? ui.results : pick(category.name,lang)}>
        {searching ? <div className={styles.search}><Icon name="search"/><input ref={input} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={ui.search} aria-label={ui.search}/><button type="button" onClick={closeSearch} aria-label={ui.closeMenu}><Icon name="close"/></button></div> : <h2>{pick(category.name,lang)}</h2>}
        <div className={styles.accent}/>
        <div className={styles.list} aria-live="polite">{tools.map(tool => <Link key={tool.id} href={toolHref(tool,lang)} className={styles.tool}><img src={`/images/rechner/${tool.id === 'prostata-psa' ? 'psa-icon' : tool.id === 'pi-rads' ? 'pirads-icon' : ASSETS[GROUPS.findIndex(g=>g.id===tool.group)]}.webp`} width="70" height="90" alt=""/><span><strong>{pick(tool.name,lang)}</strong><small>{pick(tool.description,lang)}</small><span className={styles.open}>{ui.open}<Icon name="arrow"/></span></span><Icon name="arrow"/></Link>)}{!tools.length && <p>{ui.empty}</p>}</div>
      </section>
    </div>
    <nav className={styles.dock} aria-label={ui.directory}><button type="button" aria-pressed={!searching} onClick={()=>setSearching(false)}><Icon name="lungs"/>{ui.menu}</button><button type="button" ref={searchButton} aria-pressed={searching} onClick={()=>setSearching(true)}><Icon name="search"/>{label('Suche','Search','جستجو')}</button></nav>
  </main>
}
