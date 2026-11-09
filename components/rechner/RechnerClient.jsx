'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { GROUPS, TOOLS, directoryHref, filterTools, pick, toolHref } from './catalog'
import { COPY } from './copy'
import Icon from './Icons'
import styles from './rechner.module.css'

const CalculatorEngine = dynamic(() => import('./CalculatorEngine'), { loading: () => <div className={styles.loading} aria-busy="true">•••</div> })

function Brand() {
  return <Link className={styles.brand} href="/" aria-label="RadYar"><span aria-hidden="true"><i/><i/><i/><i/></span><strong>RadYar</strong></Link>
}

function ToolRow({ tool, lang }) {
  return <Link href={toolHref(tool, lang)} className={styles.toolRow}>
    <span className={styles.toolIcon}><Icon name={tool.icon}/></span>
    <span className={styles.toolCopy}><strong>{pick(tool.name, lang)}</strong><small>{pick(tool.description, lang)}</small></span>
    <Icon name="arrow" className={styles.arrow}/>
  </Link>
}

function Featured({ lang, ui }) {
  return <section className={styles.featured} aria-labelledby="featured-title">
    <h2 id="featured-title">{ui.featured}</h2>
    <div className={styles.featureGrid}>
      {['prostata-psa', 'pi-rads'].map((id, index) => {
        const tool = TOOLS.find(item => item.id === id)
        return <Link key={id} href={toolHref(tool, lang)} className={`${styles.featureCard} ${index === 1 ? styles.featureDark : ''}`}>
          <div className={styles.featureCopy}><h3>{pick(tool.name, lang)}</h3><p>{index === 0 ? ui.psa : ui.pirads}</p><span>{ui.open}<Icon name="arrow"/></span></div>
          {index === 0 ? <svg className={styles.ellipsoids} viewBox="0 0 150 90" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><ellipse cx="40" cy="45" rx="21" ry="34" transform="rotate(30 40 45)"/><ellipse cx="70" cy="45" rx="22" ry="37" transform="rotate(20 70 45)"/><ellipse cx="102" cy="45" rx="22" ry="35" transform="rotate(15 102 45)"/></svg> : <span className={styles.scoreMotif} aria-hidden="true">{[1, 2, 3, 4, 5].map(value => <i key={value}>{value}</i>)}</span>}
        </Link>
      })}
    </div>
  </section>
}

function Directory({ group, query, lang, ui }) {
  const searchRef = useRef(null)
  const category = GROUPS.find(item => item.id === group)
  const filtered = filterTools(group, query)
  const title = query ? ui.results : category ? pick(category.name, lang) : ui.all
  function changeQuery(value) {
    window.history.replaceState(null, '', directoryHref({ group, query: value, lang }))
  }
  useEffect(() => {
    const focusSearch = event => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return
      event.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])
  return <>
    <div className={styles.intro}><h1>{ui.title} <em>{ui.titleAccent}</em></h1><p>{ui.subtitle}</p></div>
    <div className={styles.searchBox} role="search">
      <Icon name="search"/>
      <input ref={searchRef} type="search" value={query} onChange={event => changeQuery(event.target.value)} placeholder={ui.search} aria-label={ui.search} autoComplete="off"/>
      {query ? <button type="button" onClick={() => { changeQuery(''); searchRef.current?.focus() }} aria-label={ui.clear}><Icon name="close"/></button> : <kbd aria-hidden="true">/</kbd>}
    </div>
    {group === 'all' && !query ? <Featured lang={lang} ui={ui}/> : null}
    <section className={styles.directory} aria-labelledby="directory-title">
      <div className={styles.sectionHeading}><h2 id="directory-title">{title}</h2><span/><small aria-live="polite">{filtered.length} {ui.tools}</small></div>
      <p className={styles.sectionHint}>{query ? `“${query}”` : ui.allHint}</p>
      {filtered.length ? <div className={styles.toolList}>{filtered.map(tool => <ToolRow key={tool.id} tool={tool} lang={lang}/>)}</div> : <div className={styles.empty}>
        <Icon name="search"/><h3>{ui.empty}</h3><p>{ui.emptyHint}</p><Link href={directoryHref({ lang })}>{ui.clearFilters}<Icon name="arrow"/></Link>
      </div>}
    </section>
  </>
}

function ToolWorkspace({ tool, lang, ui }) {
  const [revision, setRevision] = useState(0)
  const group = GROUPS.find(item => item.id === tool.group)
  const related = TOOLS.filter(item => item.id !== tool.id && (item.group === tool.group || item.alsoIn?.includes(tool.group)))
  return <>
    <Link className={styles.back} href={directoryHref({ group: tool.group, lang })}><Icon name="arrow"/>{ui.back}</Link>
    <div className={styles.detailHeading}><div><span>{pick(group.name, lang)}</span><h1>{pick(tool.name, lang)}</h1><p>{pick(tool.description, lang)}</p></div><span className={styles.detailIcon}><Icon name={tool.icon}/></span></div>
    <section className={styles.calculatorWorkspace} aria-label={pick(tool.name, lang)}>
      <div className={styles.workspaceToolbar}><span>{ui.directory}</span><button onClick={() => setRevision(value => value + 1)} type="button"><Icon name="reset"/>{ui.reset}</button></div>
      <div className={styles.engine}><CalculatorEngine key={`${tool.id}-${revision}`} id={tool.id} lang={lang}/></div>
      <p className={styles.privacy}>{ui.privacy}</p>
    </section>
    {related.length ? <section className={styles.related}><h2>{ui.related}</h2><div className={styles.toolList}>{related.map(item => <ToolRow key={item.id} tool={item} lang={lang}/>)}</div></section> : null}
  </>
}

export default function RechnerClient({ toolId }) {
  const { lang, setLang } = useLanguage()
  const ui = COPY[lang] || COPY.de
  const params = useSearchParams()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const tool = TOOLS.find(item => item.id === toolId)
  const requestedGroup = params.get('group')
  const group = tool?.group || (GROUPS.some(item => item.id === requestedGroup) ? requestedGroup : 'all')
  const query = params.get('q') || ''
  useEffect(() => { setMenuOpen(false) }, [pathname, group])
  useEffect(() => {
    const close = event => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])
  const allLink = directoryHref({ lang })
  return <div className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <a href="#calculator-main" className={styles.skip}>{ui.directory}</a>
    <aside className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ''}`}>
      <Brand/>
      <div className={styles.menuLabel}>{ui.directory}</div>
      <nav id="calculator-navigation" aria-label={ui.menu}>
        <Link href={allLink} className={group === 'all' ? styles.navActive : ''} aria-current={group === 'all' ? 'page' : undefined} onClick={() => setMenuOpen(false)}><Icon name="calculator"/><span>{ui.all}</span></Link>
        {GROUPS.map(item => <Link key={item.id} href={directoryHref({ group: item.id, lang })} className={group === item.id ? styles.navActive : ''} aria-current={group === item.id ? 'page' : undefined} onClick={() => setMenuOpen(false)}><Icon name={item.icon}/><span>{pick(item.name, lang)}</span></Link>)}
      </nav>
      <Link className={styles.home} href="/"><Icon name="home"/>{ui.home}</Link>
    </aside>
    <div className={styles.mainColumn}>
      <header className={styles.header}>
        <button ref={menuButton} className={styles.menuButton} type="button" onClick={() => setMenuOpen(value => !value)} aria-controls="calculator-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? ui.closeMenu : ui.menu}><Icon name={menuOpen ? 'close' : 'menu'}/></button>
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">RadYar</Link><span>/</span><Link href={allLink} aria-current={!tool ? 'page' : undefined}>{ui.directory}</Link>{tool ? <><span>/</span><span aria-current="page">{pick(tool.name, lang)}</span></> : null}</nav>
        <div className={styles.languages} aria-label="Language" dir="ltr">{['de', 'en', 'fa'].map(value => <button key={value} type="button" onClick={() => setLang(value)} aria-pressed={lang === value}>{value === 'fa' ? 'فا' : value.toUpperCase()}</button>)}</div>
      </header>
      <main className={styles.main} id="calculator-main" tabIndex={-1}>
        {tool ? <ToolWorkspace key={tool.id} tool={tool} lang={lang} ui={ui}/> : <Directory group={group} query={query} lang={lang} ui={ui}/>}
        <footer className={styles.footer}><span>RadYar</span><p>{ui.disclaimer}</p><Link href="/ueber-radyar">{lang === 'fa' ? 'درباره رادیار' : lang === 'en' ? 'About RadYar' : 'Über RadYar'}<Icon name="arrow"/></Link></footer>
      </main>
    </div>
  </div>
}
