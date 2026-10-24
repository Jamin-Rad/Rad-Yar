'use client'
import LessonTakeHome from '@/components/LessonTakeHome'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { BONE_INFARCT_CHAPTERS as CHAPTERS, BONE_INFARCT_COPY as COPY, BONE_INFARCT_CHECK as CHECK, BONE_INFARCT_PATH as PATH } from '@/data/knocheninfarktLesson'
import reference from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const summaryLabel = lang => lang === "fa" ? "پیام نهایی" : "Take Home Message"
const IDS = CHAPTERS.map(chapter => chapter.id)
const pick = (value, lang) => typeof value === 'string' ? value : value[lang]
function Icon({ name }) {
  const paths = { bone: 'M7 5a3 3 0 1 0-4 4l10 10a3 3 0 1 0 4-4L7 5Z', scan: 'M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5M7 12h10M12 7v10', compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4', check: 'm4 12 5 5L20 6', arrow: 'M4 12h16m-6-6 6 6-6 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.bone} /></svg>
}
function Table({ headers, rows, lang }) {
  return <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={pick(headers[1], lang)}><table><thead><tr>{headers.map((header, i) => <th scope="col" key={i}>{pick(header, lang)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{pick(cell, lang)}</th> : <td key={j}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <section className={styles.quiz} aria-labelledby="infarct-check"><h3 id="infarct-check">{pick(CHAPTERS[2].title, lang)}</h3><p>{pick(CHECK.question, lang)}</p><div className={styles.answers}>{CHECK.options.map((option, index) => <button type="button" key={index} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer !== null && <p className={styles.feedback}>{pick(CHECK.feedback[answer], lang)}</p>}</div></section>
}
function Chapter({ id, lang }) {
  const c = value => pick(value, lang)
  if (id === 'location') return <><p className={reference.lead}>{c(COPY.basics)}</p><Table headers={COPY.locationHeaders} rows={COPY.locationRows} lang={lang} /><p>{c(COPY.risks)}</p></>
  if (id === 'pattern') return <><p className={reference.lead}>{c(COPY.patternIntro)}</p><Table headers={COPY.patternHeaders} rows={COPY.patternRows} lang={lang} /><figure className={styles.sourceCase}><p><strong>{c(COPY.imageTask)}</strong></p><div className={styles.radiographs}>{['Image1261', 'Image1262'].map((image, index) => <img key={image} className={index === 1 ? styles.sourceMirror : undefined} src={`/educational/knocheninfarkt/pdf-p123-${image}.jpg`} alt={c(COPY.imageAlt[index])} width={index ? 371 : 270} height={index ? 475 : 497} loading="lazy" />)}</div><figcaption>{c(COPY.imageCaption)}</figcaption></figure></>
  if (id === 'mimics') return <><p className={reference.lead}>{c(COPY.mimicIntro)}</p><Table headers={COPY.mimicHeaders} rows={COPY.mimicRows} lang={lang} /><aside className={reference.warning}><span className={reference.calloutLabel}>{c(COPY.caution)}</span><p>{c(COPY.warning)}</p></aside><p>{c(COPY.report)}</p><SelfCheck lang={lang} /></>
  return <LessonTakeHome points={COPY.summary.map(rule => ({ title: pick(rule, lang), detail: "" }))} lang={lang} idPrefix="knocheninfarkt-take-home" />
}
export default function BoneInfarctPage() {
  const { lang } = useLanguage()
  const c = value => pick(value, lang)
  const status = useLessonReadStatus('knocheninfarkt')
  const [read, setRead] = usePersistedSectionProgress('knocheninfarkt', IDS, status.isRead)
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
  return <main className={`${reference.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true" data-disable-lesson-explorer="true">
    <header className={reference.header}>
      <nav className={reference.breadcrumb} aria-label={c({ de: 'Seitennavigation', en: 'Breadcrumb', fa: 'مسیر صفحه' })}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/msk')}>MSK</Link><span>/</span><strong>{c(COPY.title)}</strong></nav>
      <LessonHero title={c(COPY.title)} imageSrc="/educational/knocheninfarkt-schematic.svg" imageAlt={c(COPY.heroAlt)} lang={lang} />
      <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => select('takehome')}><Icon name="check" />{summaryLabel(lang)}</button><Link className={reference.primaryAction} href={withLang(`/ueben/quiz?fach=msk&n=3&themen=knocheninfarkt&from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.quiz)}<Icon name="arrow" /></Link><Link className={reference.secondaryAction} href={withLang(`/flashcards/knocheninfarkt?from=${encodeURIComponent(withLang(PATH))}`)}>{c(COPY.cards)}</Link></div>
      <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path)} aria-valuemin={0} aria-valuemax={IDS.length} aria-valuenow={read.size}><i style={{ width: `${100 * read.size / IDS.length}%` }} /></div><span>{read.size}/{IDS.length} {c(COPY.read)}</span><div className={reference.progressActions}><button type="button" className={reference.lessonCompleteButton} aria-pressed={status.isRead} onClick={markAll}><Icon name="check" />{c(status.isRead ? COPY.allRead : COPY.all)}</button><button type="button" className={reference.continueButton} disabled={active === IDS.length - 1} onClick={() => select(IDS[active + 1])}>{c(COPY.next)}<Icon name="arrow" /></button></div></div>
      {status.authError && <p role="status">{c(COPY.auth)} <Link href={withLang('/sign-in')}>{c(COPY.login)}</Link></p>}
    </header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.path)}</h2><nav aria-label={c(COPY.path)}>{nav()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(chapter => <section id={chapter.id} key={chapter.id} className={`${reference.section} ${open === chapter.id ? reference.sectionOpen : ''} ${chapter.id === "takehome" ? reference.takeHomeSection : ''}`}><h2 className={styles.heading}><button type="button" className={reference.sectionHeader} aria-expanded={open === chapter.id} aria-controls={`${chapter.id}-panel`} onClick={() => select(chapter.id, true)}><span className={reference.sectionIcon}><Icon name={chapter.icon} /></span><strong>{(chapter.id === "takehome" ? summaryLabel(lang) : c(chapter.title))}</strong><span className={reference.toggle} aria-hidden="true">{open === chapter.id ? '−' : '+'}</span></button></h2><div id={`${chapter.id}-panel`} className={reference.sectionBody} hidden={open !== chapter.id}><Chapter id={chapter.id} lang={lang} /><button type="button" className={`${reference.readButton} ${read.has(chapter.id) ? reference.readButtonDone : ''}`} aria-pressed={read.has(chapter.id)} onClick={() => mark(chapter.id)}><Icon name="check" />{c(read.has(chapter.id) ? COPY.marked : COPY.mark)}</button></div></section>)}<details className={styles.sources}><summary>{c(COPY.sources)}</summary><p>MSK.pdf · PDF 122–123 / 121–122 · rID 99068</p><ul>{[['8508844', 'Duda et al. · 1993 · Double-line sign'], ['10745133', 'Umans et al. · 2000 · Infarct / osteomyelitis'], ['9754342', 'Champsaur & Laredo · 1997 · Infarct / chondroma'], ['30944730', 'Barakat et al. · 2019 · Early MRI appearance']].map(([id, label]) => <li key={id}><a href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></details></article></div>
    <div className={styles.mobile}><button type="button" aria-expanded={mobile} aria-controls="infarct-mobile-path" onClick={() => setMobile(value => !value)}>{c(COPY.path)} · {read.size}/{IDS.length}</button><nav id="infarct-mobile-path" className={reference.sidebar} aria-label={c(COPY.path)} hidden={!mobile}>{nav()}</nav></div>
  </main>
}

