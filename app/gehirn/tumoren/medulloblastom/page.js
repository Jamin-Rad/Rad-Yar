'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { MEDULLO_CHAPTERS as CHAPTERS, MEDULLO_COPY as COPY, MEDULLO_CHECK as CHECK, MEDULLO_PATH as PATH } from '@/data/medulloblastomLesson'
import reference from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const IDS = CHAPTERS.map(chapter => chapter.id)
const pick = (value, lang) => typeof value === 'string' ? value : value[lang]
function Icon({ name }) {
  const paths = { brain: 'M12 5a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V5m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V5', bone: 'M7 5a3 3 0 1 0-4 4l10 10a3 3 0 1 0 4-4L7 5Z', scan: 'M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5M7 12h10M12 7v10', compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4', check: 'm4 12 5 5L20 6', arrow: 'M4 12h16m-6-6 6 6-6 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.bone} /></svg>
}
function Table({ headers, rows, lang }) {
  return <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={pick(headers[1], lang)}><table><thead><tr>{headers.map((header, i) => <th scope="col" key={i}>{pick(header, lang)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{pick(cell, lang)}</th> : <td key={j}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <section className={styles.quiz} aria-labelledby="medulloblastom-check"><h3 id="medulloblastom-check">{pick(CHAPTERS[2].title, lang)}</h3><p>{pick(CHECK.question, lang)}</p><div className={styles.answers}>{CHECK.options.map((option, index) => <button type="button" key={index} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer !== null && <p className={styles.feedback}>{pick(CHECK.feedback[answer], lang)}</p>}</div></section>
}
function Chapter({ id, lang }) {
  const c = value => pick(value, lang)
  if (id === 'location') return <><p className={reference.lead}>{c(COPY.basics)}</p><p>{c(COPY.location)}</p><p>{c(COPY.obstruction)}</p></>
  if (id === 'pattern') return <><p className={reference.lead}>{c(COPY.patternIntro)}</p><figure className={styles.diagram}><img src="/educational/medulloblastom/source-mri.png" alt={c(COPY.figureAlt)} width="1340" height="550" /><figcaption>{c(COPY.figureCaption)}{' '}<a href="https://radiopaedia.org/cases/10997" target="_blank" rel="noopener noreferrer">{c(COPY.sourceLabel)}</a></figcaption></figure><Table headers={COPY.patternHeaders} rows={COPY.patternRows} lang={lang} /><details className={styles.sources}><summary>{c(COPY.ctTitle)}</summary><p>{c(COPY.ct)}</p></details></>
  if (id === 'extent') return <><p className={reference.lead}>{c(COPY.extentIntro)}</p><p>{c(COPY.limit)}</p><SelfCheck lang={lang} /></>
  return <ul className={styles.summary}>{COPY.summary.map((rule, i) => <li key={i}><Icon name="check" /><span>{c(rule)}</span></li>)}</ul>
}
export default function MedulloblastomaPage() {
  const { lang } = useLanguage()
  const c = value => pick(value, lang)
  const status = useLessonReadStatus('medulloblastom')
  const [read, setRead] = usePersistedSectionProgress('medulloblastom', IDS, status.isRead)
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
  const nav = () => CHAPTERS.map(chapter => <button key={chapter.id} type="button" aria-current={open === chapter.id ? 'location' : undefined} className={open === chapter.id ? reference.activeSideItem : ''} onClick={() => select(chapter.id)}><span className={reference.sideIcon}><Icon name={chapter.icon} /></span><strong>{c(chapter.title)}{read.has(chapter.id) ? <span aria-label={c(COPY.marked)}> ✓</span> : null}</strong></button>)
  return <main className={`${reference.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true" data-disable-lesson-explorer="true">
    <header className={reference.header}>
      <nav className={reference.breadcrumb} aria-label={c({ de: 'Seitennavigation', en: 'Breadcrumb', fa: 'مسیر صفحه' })}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{c({ de: 'Gehirn', en: 'Brain', fa: 'مغز' })}</Link><span>/</span><strong>{c(COPY.title)}</strong></nav>
      <LessonHero title={c(COPY.title)} imageSrc="/educational/medulloblastom/hero.svg" imageAlt={c(COPY.heroAlt)} lang={lang} />
      <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => select('takehome')}><Icon name="check" />{c(CHAPTERS[3].title)}</button><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=gehirn&n=2&themen=medulloblastom&from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.quiz)}<Icon name="arrow" /></Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/medulloblastom?from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.cards)}</Link></div>
      <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuemin={0} aria-valuemax={IDS.length} aria-valuenow={read.size}><i style={{ width: `${100 * read.size / IDS.length}%` }} /></div><span>{read.size}/{IDS.length} {c(COPY.read)}</span><div className={reference.progressActions}><button type="button" className={reference.lessonCompleteButton} aria-pressed={status.isRead} onClick={markAll}><Icon name="check" />{c(status.isRead ? COPY.allRead : COPY.all)}</button><button type="button" className={reference.continueButton} disabled={active === IDS.length - 1} onClick={() => select(IDS[active + 1])}>{c(COPY.next)}<Icon name="arrow" /></button></div></div>
      {status.authError && <p role="status">{c(COPY.auth)} <Link href={withLang('/sign-in')}>{c(COPY.login)}</Link></p>}
    </header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.path)}</h2><nav aria-label={c(COPY.path)}>{nav()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(chapter => <section id={chapter.id} key={chapter.id} className={`${reference.section} ${open === chapter.id ? reference.sectionOpen : ''}`}><h2 className={styles.heading}><button type="button" className={reference.sectionHeader} aria-expanded={open === chapter.id} aria-controls={`${chapter.id}-panel`} onClick={() => select(chapter.id, true)}><span className={reference.sectionIcon}><Icon name={chapter.icon} /></span><strong>{c(chapter.title)}</strong><span className={reference.toggle} aria-hidden="true">{open === chapter.id ? '−' : '+'}</span></button></h2><div id={`${chapter.id}-panel`} className={reference.sectionBody} hidden={open !== chapter.id}><Chapter id={chapter.id} lang={lang} /><button type="button" className={`${reference.readButton} ${read.has(chapter.id) ? reference.readButtonDone : ''}`} aria-pressed={read.has(chapter.id)} onClick={() => mark(chapter.id)}><Icon name="check" />{c(read.has(chapter.id) ? COPY.marked : COPY.mark)}</button></div></section>)}<details className={styles.sources}><summary>{c(COPY.sources)}</summary><p>Gehirn.pdf · PDF 43–44 / {c({ de: 'gedruckte Seiten 42–43', en: 'printed pages 42–43', fa: 'صفحات چاپی ۴۲–۴۳' })}</p><ul>{[['https://pubmed.ncbi.nlm.nih.gov/24831600/', 'Perreault et al. · 2014 · DOI 10.3174/ajnr.A3990'], ['https://pubmed.ncbi.nlm.nih.gov/23521467/', 'Yeom et al. · 2013 · DOI 10.2214/AJR.12.9249'], ['https://pubmed.ncbi.nlm.nih.gov/29545246/', 'Mata-Mbemba et al. · 2018 · DOI 10.3174/ajnr.A5578'], ['https://pubmed.ncbi.nlm.nih.gov/34185076/', 'Louis et al. · 2021 · WHO CNS5']].map(([url,label]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></details></article></div>
    <div className={styles.mobile}><button type="button" aria-expanded={mobile} aria-controls="medulloblastom-mobile-path" onClick={() => setMobile(value => !value)}>{c(COPY.path)} · {read.size}/{IDS.length}</button><nav id="medulloblastom-mobile-path" className={reference.sidebar} aria-label={c(COPY.path)} hidden={!mobile}>{nav()}</nav></div>
  </main>
}
