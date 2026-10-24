'use client'
import LessonTakeHome from '@/components/LessonTakeHome'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { RECIST_CHAPTERS as CHAPTERS, RECIST_COPY as COPY, RECIST_CHECK as CHECK, RECIST_PATH as PATH } from '@/data/recist11Lesson'
import reference from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const summaryLabel = lang => lang === "fa" ? "پیام نهایی" : "Take Home Message"
const IDS = CHAPTERS.map(chapter => chapter.id)
const pick = (value, lang) => typeof value === 'string' ? value : value[lang]
function Icon({ name }) {
  const paths = { chart: 'M4 3v18h17M7 14l5-5 4 3 5-7', brain: 'M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5', bone: 'M7 5a3 3 0 1 0-4 4l10 10a3 3 0 1 0 4-4L7 5Z', scan: 'M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5M7 12h10M12 7v10', compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4', check: 'm4 12 5 5L20 6', arrow: 'M4 12h16m-6-6 6 6-6 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.bone} /></svg>
}
function Table({ headers, rows, lang }) {
  return <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={pick(headers[1], lang)}><table><thead><tr>{headers.map((header, i) => <th scope="col" key={i}>{pick(header, lang)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{pick(cell, lang)}</th> : <td key={j}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <section className={styles.quiz} aria-labelledby="recist-1-1-check"><h3 id="recist-1-1-check">{pick(CHAPTERS[2].title, lang)}</h3><p>{pick(CHECK.question, lang)}</p><div className={styles.answers}>{CHECK.options.map((option, index) => <button type="button" key={index} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer !== null && <p className={styles.feedback}>{pick(CHECK.feedback[answer], lang)}</p>}</div></section>
}
function Chapter({ id, lang }) {
  const c = value => pick(value, lang)
  if (id === 'selection') return <><p className={reference.lead}>{c(COPY.basics)}</p><p>{c(COPY.targets)}</p><Table headers={COPY.selectionHeaders} rows={COPY.selectionRows} lang={lang} /><details className={styles.sources}><summary>{c(COPY.scopeTitle)}</summary><Table headers={COPY.scopeHeaders} rows={COPY.scopeRows} lang={lang} /></details></>
  if (id === 'reference') return <><p className={reference.lead}>{c(COPY.referenceIntro)}</p><Table headers={COPY.responseHeaders} rows={COPY.responseRows} lang={lang} /><figure className={styles.diagram}><img src="/educational/recist-1-1-schematic.svg" alt={c(COPY.heroAlt)} width="840" height="520" /><figcaption>{c(COPY.diagramCaption)}</figcaption></figure></>
  if (id === 'overall') return <><p className={reference.lead}>{c(COPY.overallIntro)}</p><Table headers={COPY.overallHeaders} rows={COPY.overallRows} lang={lang} /><SelfCheck lang={lang} /></>
  return <LessonTakeHome points={COPY.summary.map(rule => ({ title: pick(rule, lang), detail: "" }))} lang={lang} idPrefix="recist-1-1-take-home" />
}
export default function RecistPage() {
  const { lang } = useLanguage()
  const c = value => pick(value, lang)
  const status = useLessonReadStatus('recist-1-1')
  const [read, setRead] = usePersistedSectionProgress('recist-1-1', IDS, status.isRead)
  const [open, setOpen] = useState(IDS[0])
  const [mobile, setMobile] = useState(false)
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  useEffect(() => {
    const sync = () => setOpen(IDS.includes(location.hash.slice(1)) ? location.hash.slice(1) : IDS[0])
    sync()
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync) }
  }, [])
  const select = (id, collapse = false) => {
    const next = collapse && open === id ? null : id
    setOpen(next); setMobile(false)
    const url = new URL(location.href); url.hash = next || ''; history.replaceState(null, '', url)
    if (next) requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }))
  }
  const mark = id => {
    if (status.isRead) status.toggleRead()
    setRead(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next })
  }
  const markAll = () => { if (status.toggleRead()) setRead(status.isRead ? new Set() : new Set(IDS)) }
  const active = IDS.indexOf(open)
  const nav = () => CHAPTERS.map(chapter => <button key={chapter.id} type="button" aria-current={open === chapter.id ? 'location' : undefined} className={open === chapter.id ? reference.activeSideItem : ''} onClick={() => select(chapter.id)}><span className={reference.sideIcon}><Icon name={chapter.icon} /></span><strong>{(chapter.id === "takehome" ? summaryLabel(lang) : c(chapter.title))}{read.has(chapter.id) ? <span aria-label={c(COPY.marked)}> ✓</span> : null}</strong></button>)
  return <><main className={`${reference.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true" data-disable-lesson-explorer="true">
    <header className={reference.header}>
      <nav className={reference.breadcrumb} aria-label={c({ de: 'Seitennavigation', en: 'Breadcrumb', fa: 'مسیر صفحه' })}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/technik')}>{c({ de: 'Technik', en: 'Technique', fa: 'تکنیک' })}</Link><span>/</span><strong>{c(COPY.title)}</strong></nav>
      <LessonHero title={c(COPY.title)} imageSrc="/educational/recist-1-1-schematic.svg" imageAlt={c(COPY.heroAlt)} lang={lang} />
      <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => select('takehome')}><Icon name="check" />{summaryLabel(lang)}</button><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=technik&n=3&themen=recist-1-1&from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.quiz)}<Icon name="arrow" /></Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/recist-1-1?from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.cards)}</Link></div>
      <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuemin={0} aria-valuemax={IDS.length} aria-valuenow={read.size}><i style={{ width: `${100 * read.size / IDS.length}%` }} /></div><span>{read.size}/{IDS.length} {c(COPY.read)}</span><div className={reference.progressActions}><button type="button" className={reference.lessonCompleteButton} aria-pressed={status.isRead} onClick={markAll}><Icon name="check" />{c(status.isRead ? COPY.allRead : COPY.all)}</button><button type="button" className={reference.continueButton} disabled={active === IDS.length - 1} onClick={() => select(IDS[active + 1])}>{c(COPY.next)}<Icon name="arrow" /></button></div></div>
      {status.authError && <p role="status">{c(COPY.auth)} <Link href={withLang('/sign-in')}>{c(COPY.login)}</Link></p>}
    </header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.path)}</h2><nav aria-label={c(COPY.path)}>{nav()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(chapter => <section id={chapter.id} key={chapter.id} className={`${reference.section} ${open === chapter.id ? reference.sectionOpen : ''} ${chapter.id === "takehome" ? reference.takeHomeSection : ''}`}><h2 className={styles.heading}><button type="button" className={reference.sectionHeader} aria-expanded={open === chapter.id} aria-controls={`${chapter.id}-panel`} onClick={() => select(chapter.id, true)}><span className={reference.sectionIcon}><Icon name={chapter.icon} /></span><strong>{(chapter.id === "takehome" ? summaryLabel(lang) : c(chapter.title))}</strong><span className={reference.toggle} aria-hidden="true">{open === chapter.id ? '−' : '+'}</span></button></h2><div id={`${chapter.id}-panel`} className={reference.sectionBody} hidden={open !== chapter.id}><Chapter id={chapter.id} lang={lang} /><button type="button" className={`${reference.readButton} ${read.has(chapter.id) ? reference.readButtonDone : ''}`} aria-pressed={read.has(chapter.id)} onClick={() => mark(chapter.id)}><Icon name="check" />{c(read.has(chapter.id) ? COPY.marked : COPY.mark)}</button></div></section>)}<details className={styles.sources}><summary>{c(COPY.sources)}</summary><p>Technik.pdf · PDF 74–75 / {c({ de: 'gedruckte Seiten 73–74', en: 'printed pages 73–74', fa: 'صفحات چاپی ۷۳–۷۴' })}</p><p><a href="https://recist.eortc.org/recist/wp-content/uploads/sites/14/2025/12/RECISTGuidelines.pdf" target="_blank" rel="noopener noreferrer">Eisenhauer et al. · RECIST 1.1 · 2009 · §§3.1–3.2, 4.2–4.4 · DOI 10.1016/j.ejca.2008.10.026</a></p></details></article></div>
    <div className={styles.mobile}><button type="button" aria-expanded={mobile} aria-controls="recist-1-1-mobile-path" onClick={() => setMobile(value => !value)}>{c(COPY.path)} · {read.size}/{IDS.length}</button><nav id="recist-1-1-mobile-path" className={reference.sidebar} aria-label={c(COPY.path)} hidden={!mobile}>{nav()}</nav></div>
  </main><Footer /></>
}
