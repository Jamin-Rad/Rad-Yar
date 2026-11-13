'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { GROUPS, TOOLS, directoryHref, pick, toolHref } from './catalog'
import { COPY } from './copy'
import Icon from './Icons'
import styles from './rechner.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import OrbitDirectory from './OrbitDirectory'

const CalculatorEngine = dynamic(() => import('./CalculatorEngine'), { loading: () => <div className={styles.loading} aria-busy="true">•••</div> })

function ToolRow({ tool, lang }) {
  return <Link href={toolHref(tool, lang)} className={styles.toolRow}>
    <span className={styles.toolIcon}><Icon name={tool.icon}/></span>
    <span className={styles.toolCopy}><strong>{pick(tool.name, lang)}</strong><small>{pick(tool.description, lang)}</small></span>
    <Icon name="arrow" className={styles.arrow}/>
  </Link>
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
  const { lang } = useLanguage()
  const ui = COPY[lang] || COPY.de
  const params = useSearchParams()
  const tool = TOOLS.find(item => item.id === toolId)
  return <>
    {tool && <Navbar/>}
    <div style={{paddingTop:64}}>
      {tool ? <div className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        <main className={styles.main}><ToolWorkspace key={tool.id} tool={tool} lang={lang} ui={ui}/></main>
      </div> : <OrbitDirectory lang={lang} ui={ui} initialGroup={params.get('group') || 'urogenital'} initialQuery={params.get('q') || ''}/>}
    </div>
    <Footer/>
  </>
}
