'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { HIV_COPY as COPY, HIV_CHAPTERS as CHAPTERS } from '@/data/gehirnHivEnzephalopathieLesson'
import reference from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const IDS = CHAPTERS.map(section => section.id)
const c = (value, lang) => value[lang]
function Icon({ name }) {
  const path = { scan: 'M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z', brain: 'M12 4a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V4m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V4', compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4', check: 'm4 12 5 5L20 6' }[name]
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path}/></svg>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const question = COPY.check
  return <section className={styles.quiz} aria-labelledby="hiv-check"><h3 id="hiv-check">{c(CHAPTERS[2].title, lang)}</h3><p>{c(question.question, lang)}</p><div className={styles.answers}>{question.options.map((option, index) => <button type="button" key={index} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{c(option, lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer !== null && <p className={styles.feedback}>{c(question.feedback[answer], lang)}</p>}</div></section>
}
function LessonContent({ id, lang }) {
  const strings = value => c(value, lang)
  if (id === 'approach') return <><p className={reference.lead}>{strings(COPY.intro)}</p><p>{strings(COPY.scope)}</p><p className={styles.prompt}>{strings(COPY.questions)}</p><figure className={styles.diagram}><img src="/educational/hiv-enzephalopathie/hero.svg" alt={strings(COPY.heroAlt)} width="840" height="520"/><figcaption>{strings(COPY.diagramCaption)}</figcaption></figure></>
  if (id === 'findings') return <><div className={styles.findings}>{COPY.findings.map((item, index) => <section key={index}><h3>{strings(item.title)}</h3><p>{strings(item.text)}</p></section>)}</div><figure className={styles.case}><img src="/educational/hiv-enzephalopathie/pdf-case.png" alt={strings(COPY.caseCaption)} width="590" height="620"/><figcaption>{strings(COPY.caseCaption)}</figcaption></figure></>
  if (id === 'limits') return <><aside className={reference.warning}><span className={reference.calloutLabel}>{lang === 'de' ? 'CAVE' : lang === 'en' ? 'Caution' : 'هشدار'}</span><p>{strings(COPY.warning)}</p></aside><SelfCheck lang={lang}/></>
  return <ul className={styles.summary}>{COPY.summary.map((rule, index) => <li key={index}><Icon name="check"/><span>{strings(rule)}</span></li>)}</ul>
}

export default function HivEncephalopathyPage() {
  const { lang } = useLanguage()
  const status = useLessonReadStatus('hiv-enzephalopathie')
  const [read, setRead] = usePersistedSectionProgress('hiv-enzephalopathie', IDS, status.isRead)
  const [open, setOpen] = useState(IDS[0])
  const [mobile, setMobile] = useState(false)
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  useEffect(() => {
    const sync = () => setOpen(IDS.includes(location.hash.slice(1)) ? location.hash.slice(1) : IDS[0])
    sync(); window.addEventListener('hashchange', sync); window.addEventListener('popstate', sync)
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync) }
  }, [])
  const select = (id, collapse = false) => {
    const next = collapse && open === id ? null : id
    setOpen(next); setMobile(false)
    const url = new URL(location.href); url.hash = next || ''; history.replaceState(null, '', url)
    if (next) requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }))
  }
  const mark = id => { if (status.isRead) status.toggleRead(); setRead(previous => { const next = new Set(previous); next.has(id) ? next.delete(id) : next.add(id); return next }) }
  const markAll = () => { if (status.toggleRead()) setRead(status.isRead ? new Set() : new Set(IDS)) }
  const active = IDS.indexOf(open)
  const nav = () => CHAPTERS.map(section => <button key={section.id} type="button" aria-current={open === section.id ? 'location' : undefined} className={open === section.id ? reference.activeSideItem : ''} onClick={() => select(section.id)}><span className={reference.sideIcon}><Icon name={section.icon}/></span><strong>{c(section.title, lang)}{read.has(section.id) ? ' ✓' : ''}</strong></button>)
  return <main className={`${reference.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true" data-disable-lesson-explorer="true">
    <header className={reference.header}>
      <nav className={reference.breadcrumb} aria-label={lang === 'de' ? 'Seitennavigation' : lang === 'en' ? 'Breadcrumb' : 'مسیر صفحه'}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{lang === 'de' ? 'Gehirn' : lang === 'en' ? 'Brain' : 'مغز'}</Link><span>/</span><strong>{c(COPY.title, lang)}</strong></nav>
      <LessonHero title={c(COPY.title, lang)} imageSrc="/educational/hiv-enzephalopathie/hero.svg" imageAlt={c(COPY.heroAlt, lang)} lang={lang}/>
      <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => select('takehome')}><Icon name="check"/>{c(CHAPTERS[3].title, lang)}</button><button type="button" className={reference.primaryAction} onClick={() => select('limits')}>{c(COPY.quiz, lang)}<Icon name="check"/></button></div>
      <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path, lang)} aria-valuemin={0} aria-valuemax={IDS.length} aria-valuenow={read.size}><i style={{width:`${100 * read.size / IDS.length}%`}}/></div><span>{read.size}/{IDS.length} {c(COPY.read, lang)}</span><div className={reference.progressActions}><button type="button" className={reference.lessonCompleteButton} aria-pressed={status.isRead} onClick={markAll}><Icon name="check"/>{c(status.isRead ? COPY.allRead : COPY.all, lang)}</button><button type="button" className={reference.continueButton} disabled={active === IDS.length - 1} onClick={() => select(IDS[active + 1])}>{c(COPY.next, lang)}<Icon name="check"/></button></div></div>
      {status.authError && <p role="status">{lang === 'de' ? 'Lesestatus kann nicht gespeichert werden.' : lang === 'en' ? 'Reading status could not be saved.' : 'وضعیت مطالعه ذخیره نشد.'} <Link href={withLang('/sign-in')}>{lang === 'de' ? 'Anmelden' : lang === 'en' ? 'Sign in' : 'ورود'}</Link></p>}
    </header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.path, lang)}</h2><nav aria-label={c(COPY.path, lang)}>{nav()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(section => <section id={section.id} key={section.id} className={`${reference.section} ${open === section.id ? reference.sectionOpen : ''}`}><h2 className={styles.heading}><button type="button" className={reference.sectionHeader} aria-expanded={open === section.id} aria-controls={`${section.id}-panel`} onClick={() => select(section.id, true)}><span className={reference.sectionIcon}><Icon name={section.icon}/></span><strong>{c(section.title, lang)}</strong><span className={reference.toggle} aria-hidden="true">{open === section.id ? '−' : '+'}</span></button></h2><div id={`${section.id}-panel`} className={reference.sectionBody} hidden={open !== section.id}><LessonContent id={section.id} lang={lang}/><button type="button" className={`${reference.readButton} ${read.has(section.id) ? reference.readButtonDone : ''}`} aria-pressed={read.has(section.id)} onClick={() => mark(section.id)}><Icon name="check"/>{c(read.has(section.id) ? COPY.marked : COPY.mark, lang)}</button></div></section>)}<details className={styles.sources}><summary>{c(COPY.sources, lang)}</summary><p>{lang === 'de' ? 'Gehirn.pdf · PDF-S. 63–64.' : lang === 'en' ? 'Gehirn.pdf · PDF pp. 63–64.' : 'Gehirn.pdf · صفحات PDF ۶۳–۶۴.'}</p><ul><li><a href="https://link.springer.com/article/10.1186/s42466-026-00519-y" target="_blank" rel="noopener noreferrer">Hahn et al. · DGN-Leitlinie HIV-1-assoziierte neurologische Erkrankungen · 2026</a></li><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5619320/" target="_blank" rel="noopener noreferrer">Haziot et al. · Neuroimaging of HIV-associated neurocognitive disorders · 2015</a></li></ul></details></article></div>
    <div className={styles.mobile}><button type="button" aria-expanded={mobile} aria-controls="hiv-mobile-path" onClick={() => setMobile(value => !value)}>{c(COPY.path, lang)} · {read.size}/{IDS.length}</button><nav id="hiv-mobile-path" className={reference.sidebar} aria-label={c(COPY.path, lang)} hidden={!mobile}>{nav()}</nav></div>
  </main>
}
