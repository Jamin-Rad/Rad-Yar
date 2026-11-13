'use client'
import { useEffect, useInsertionEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GROUPS, filterTools, pick, toolHref, directoryHref } from './catalog'
import Icon from './Icons'
import Navbar from '../Navbar'
import { HOME_ANATOMY_SRC, HOME_MOTION_DURATION, HOME_MOTION_EASING, captureHomeReturn, isPlainNavigation, takeHomeArrival } from './homeArrival'
import styles from './orbit.module.css'

const ASSETS = ['brain','thorax','mamma','abdomen','urogenital','onko','spine']
const SLOTS = [[29,20],[58,15],[85,29],[85,61],[54,84],[22,77],[9,46]]

function useHomeArrival(anatomy, orbit, panel) {
  const arrivalRef = useRef(undefined)

  useLayoutEffect(() => {
    arrivalRef.current ??= takeHomeArrival()
    const arrival = arrivalRef.current
    if (!arrival || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!orbit.current?.animate) return

    const easing = HOME_MOTION_EASING
    const animations = [
      orbit.current.animate([
        { transform: 'translateX(24vw)', opacity: 0 },
        { transform: 'none', opacity: 1 },
      ], { duration: HOME_MOTION_DURATION, delay: 100, easing, fill: 'backwards' }),
      panel.current.animate([
        { transform: 'translateY(14px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 },
      ], { duration: 750, delay: 450, easing, fill: 'backwards' }),
    ]

    if (arrival.bounds && anatomy.current) {
      const from = arrival.bounds
      const to = anatomy.current.getBoundingClientRect()
      if (to.width && to.height) {
        animations.push(anatomy.current.animate([
          {
            transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`,
            opacity: 1,
          },
          { transform: 'none', opacity: getComputedStyle(anatomy.current).opacity },
        ], { duration: HOME_MOTION_DURATION, easing }))
      }
    }

    return () => animations.forEach(animation => animation.cancel())
  }, [anatomy, orbit, panel])
}

export default function OrbitDirectory({ lang, ui, initialGroup = 'urogenital', initialQuery = '' }) {
  const router = useRouter()
  const [selected, setSelected] = useState(GROUPS.some(g=>g.id===initialGroup) ? initialGroup : 'urogenital')
  const [searching, setSearching] = useState(Boolean(initialQuery))
  const [query, setQuery] = useState(initialQuery)
  const start = useRef(null)
  const dragged = useRef(false)
  const input = useRef(null)
  const searchButton = useRef(null)
  const anatomy = useRef(null)
  const orbit = useRef(null)
  const panel = useRef(null)
  const dock = useRef(null)
  const shell = useRef(null)
  const homeHref = `/?lang=${lang}`
  useHomeArrival(anatomy, orbit, panel)

  function returnHome(event) {
    if (!isPlainNavigation(event) || !prepareHomeReturn()) return
    event.preventDefault()
    router.push(homeHref)
  }

  function prepareHomeReturn() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !orbit.current?.animate || !anatomy.current) return false

    captureHomeReturn(anatomy.current)
    document.querySelector('[data-rechner-exit]')?.remove()
    // Keep the outgoing menu visible while the router swaps the page underneath it.
    const overlay = shell.current.cloneNode(false)
    overlay.classList.add(styles.exitOverlay)
    overlay.dataset.rechnerExit = ''
    overlay.inert = true
    overlay.setAttribute('aria-hidden', 'true')
    const copies = [orbit.current, panel.current, dock.current].map(element => {
      const bounds = element.getBoundingClientRect()
      const copy = element.cloneNode(true)
      Object.assign(copy.style, {
        position: 'absolute', inset: 'auto', margin: '0',
        left: `${bounds.left}px`, top: `${bounds.top}px`,
        width: `${bounds.width}px`, height: `${bounds.height}px`,
        opacity: getComputedStyle(element).opacity,
      })
      overlay.append(copy)
      return copy
    })
    document.body.append(overlay)
    const animations = copies.map((copy, index) => copy.animate([
      { transform: 'none' },
      { transform: index === 0 ? 'translateX(32vw)' : 'translateY(12px)', opacity: 0 },
    ], { duration: index === 0 ? HOME_MOTION_DURATION : 700, easing: HOME_MOTION_EASING, fill: 'forwards' }))
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => overlay.remove())
    return true
  }

  useInsertionEffect(() => {
    const onHistoryNavigation = () => {
      if (window.location.pathname === '/') prepareHomeReturn()
    }
    window.addEventListener('popstate', onHistoryNavigation, { capture: true })
    return () => {
      window.removeEventListener('popstate', onHistoryNavigation, true)
      if (window.location.pathname === '/' && shell.current?.isConnected &&
          !document.querySelector('[data-rechner-exit]')) prepareHomeReturn()
    }
  }, [])
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
  function startOrbitDrag(event) {
    dragged.current = false
    const bounds = orbit.current.getBoundingClientRect()
    const { clientX, clientY } = event
    const insideOrbit = clientX >= bounds.left && clientX <= bounds.right &&
      clientY >= bounds.top && clientY <= bounds.bottom
    start.current = insideOrbit && !event.target.closest('button, a') ? clientX : null
  }

  function finishOrbitDrag(event) {
    const from = start.current
    start.current = null
    if (from === null || Math.abs(event.clientX - from) <= 60) return
    dragged.current = true
    move(event.clientX < from ? 1 : -1)
  }
  useEffect(() => {
    const key = e => {
      if (e.key === 'Escape' && searching) { e.preventDefault(); closeSearch() }
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.target.isContentEditable) { e.preventDefault(); setSearching(true) }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [searching])
  useEffect(() => { if (searching) input.current?.focus() }, [searching])
  return <><Navbar onHomeClick={returnHome}/><main ref={shell} className={styles.shell} dir={lang === 'fa' ? 'rtl' : 'ltr'}
    onPointerDown={startOrbitDrag} onPointerUp={finishOrbitDrag} onPointerCancel={() => { start.current = null }}>
    <Link href={homeHref} onClick={returnHome} className={styles.homeAnatomy}
      aria-label={label('Zur Startseite', 'Back to homepage', 'بازگشت به صفحهٔ اصلی')}>
      <img ref={anatomy} src={HOME_ANATOMY_SRC} alt="" width="842" height="1672" draggable="false"/>
    </Link>
    <h1 className={styles.srOnly}>{ui.directory}</h1>
    <div className={styles.layout}>
      <section ref={orbit} className={styles.orbit} aria-label={ui.menu} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}}>
        <div className={styles.ring} aria-hidden="true"/>
        <div className={styles.center}><h2>{pick(category.name, lang)}</h2><span>{filterTools(selected, '').length} {ui.tools}</span><div className={styles.rotation}><button type="button" onClick={() => move(-1)} aria-label={label('Vorheriges Fachgebiet','Previous specialty','دسته قبلی')}><Icon name="arrow"/></button><button type="button" onClick={() => move(1)} aria-label={label('Nächstes Fachgebiet','Next specialty','دسته بعدی')}><Icon name="arrow"/></button></div><small>{label('Ziehen zum Entdecken','Drag to explore','برای مرور بکشید')}</small></div>
        {GROUPS.map((g,i) => {const [x,y]=SLOTS[(i-selectedIndex+4+7)%7]; return <button type="button" key={g.id} className={`${styles.organ} ${selected===g.id?styles.active:''}`} style={{'--x':`${x}%`,'--y':`${y}%`}} onClick={()=>{if(!dragged.current)choose(g.id)}} aria-pressed={selected===g.id}><img className={styles.art} src={`/images/rechner/${ASSETS[i]}.webp`} alt="" draggable="false" width="512" height="512"/><span className={styles.caption}>{pick(g.name,lang)}</span></button>})}
      </section>
      <section ref={panel} className={styles.results} aria-label={searching ? ui.results : pick(category.name,lang)}>
        {searching ? <div className={styles.search}><Icon name="search"/><input ref={input} type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={ui.search} aria-label={ui.search}/><button type="button" onClick={closeSearch} aria-label={ui.closeMenu}><Icon name="close"/></button></div> : <h2>{pick(category.name,lang)}</h2>}
        <div className={styles.accent}/>
        <div className={styles.list} aria-live="polite">{tools.map(tool => <Link key={tool.id} href={toolHref(tool,lang)} className={styles.tool}><img src={`/images/rechner/${tool.id === 'prostata-psa' ? 'psa-icon' : tool.id === 'pi-rads' ? 'pirads-icon' : ASSETS[GROUPS.findIndex(g=>g.id===tool.group)]}.webp`} width="70" height="90" alt=""/><span><strong>{pick(tool.name,lang)}</strong><small>{pick(tool.description,lang)}</small><span className={styles.open}>{ui.open}<Icon name="arrow"/></span></span><Icon name="arrow"/></Link>)}{!tools.length && <p>{ui.empty}</p>}</div>
      </section>
    </div>
    <nav ref={dock} className={styles.dock} aria-label={ui.directory}><button type="button" aria-pressed={!searching} onClick={()=>setSearching(false)}><Icon name="lungs"/>{ui.menu}</button><button type="button" ref={searchButton} aria-pressed={searching} onClick={()=>setSearching(true)}><Icon name="search"/>{label('Suche','Search','جستجو')}</button></nav>
  </main></>
}
