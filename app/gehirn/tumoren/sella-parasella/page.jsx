'use client'
import LessonTakeHome from '@/components/LessonTakeHome'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { SELLA_COPY as COPY, SELLA_CHAPTERS as CHAPTERS } from '@/data/gehirnSellaParasellaLesson'
import reference from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

const summaryLabel = lang => lang === "fa" ? "پیام نهایی" : "Take Home Message"
const IDS = CHAPTERS.map(item => item.id)
const c = (value, lang) => value[lang]
function Icon({ name }) {
  const paths = { scan: 'M3 7V3h4m10 0h4v4m0 10v4h-4M7 21H3v-4m2-5h14M12 5v14', compare: 'M3 7h18m-4-4 4 4-4 4M21 17H3m4-4-4 4 4 4', brain: 'M12 4a4 4 0 0 0-7 3 4 4 0 0 0-1 7 4 4 0 0 0 7 4V4m2 0a4 4 0 0 1 7 3 4 4 0 0 1 1 7 4 4 0 0 1-7 4V4', check: 'm4 12 5 5L20 6' }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>
}
function Table({ lang }) {
  return <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={lang === 'de' ? 'Mustervergleich' : lang === 'en' ? 'Pattern comparison' : 'مقایسه الگوها'}><table><thead><tr><th scope="col">{lang === 'de' ? 'Entität' : lang === 'en' ? 'Entity' : 'موجودیت'}</th><th scope="col">{lang === 'de' ? 'Lage und Zusammensetzung' : lang === 'en' ? 'Location and composition' : 'محل و ترکیب'}</th></tr></thead><tbody>{COPY.rows.map((row, index) => <tr key={index}><th scope="row">{c(row[0], lang)}</th><td>{c(row[1], lang)}</td></tr>)}</tbody></table></div>
}
function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  return <section className={styles.quiz} aria-labelledby="sella-self-check"><h3 id="sella-self-check">{c(COPY.quiz, lang)}</h3><p>{c(COPY.check.question, lang)}</p><div className={styles.answers}>{COPY.check.options.map((option, index) => <button type="button" key={index} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{c(option, lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer !== null && <p className={styles.feedback}>{c(COPY.check.feedback[answer], lang)}</p>}</div></section>
}
function ChapterContent({ id, lang }) {
  const text = value => c(value, lang)
  if (id === 'orientation') return <><p className={reference.lead}>{text(COPY.intro)}</p><p>{text(COPY.anatomy)}</p><figure className={styles.diagram}><img src="/educational/sella-parasella/hero.svg" alt={text(COPY.heroAlt)} width="840" height="520"/><figcaption>{text(COPY.caption)}</figcaption><div className={styles.legend}><strong>{text(COPY.diagramLegendTitle)}</strong><ol>{COPY.diagramLegend.map((item, index) => <li key={index}>{text(item)}</li>)}</ol></div></figure></>
  if (id === 'patterns') return <><p className={reference.lead}>{lang === 'de' ? 'MRT-Befund systematisch nach Zentrum, Flüssigkeits-/Gewebeanteilen und Kontrastmittelaufnahme vergleichen.' : lang === 'en' ? 'Compare MRI descriptors systematically by centre, fluid/tissue components and enhancement.' : 'توصیف MRI را بر اساس مرکز، اجزای مایع/بافت و enhancement به‌صورت منظم مقایسه کنید.'}</p><Table lang={lang}/><p className={styles.note}>{text(COPY.size)}</p></>
  if (id === 'limits') return <><p className={reference.lead}>{text(COPY.protocol)}</p><aside className={reference.warning}><span className={reference.calloutLabel}>{lang === 'de' ? 'CAVE' : lang === 'en' ? 'Caution' : 'هشدار'}</span><p>{text(COPY.caution)}</p></aside><SelfCheck lang={lang}/></>
  return <LessonTakeHome points={COPY.summary.map(rule => ({ title: c(rule, lang), detail: "" }))} lang={lang} idPrefix="sella-parasella-take-home" />
}

export default function SellaParasellaPage() {
  const { lang } = useLanguage()
  const status = useLessonReadStatus('sella-parasellaere-region-anatomie')
  const [read, setRead] = usePersistedSectionProgress('sella-parasellaere-region-anatomie', IDS, status.isRead)
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
  const nav = () => CHAPTERS.map(section => <button key={section.id} type="button" aria-current={open === section.id ? 'location' : undefined} className={open === section.id ? reference.activeSideItem : ''} onClick={() => select(section.id)}><span className={reference.sideIcon}><Icon name={section.icon}/></span><strong>{(section.id === "takehome" ? summaryLabel(lang) : c(section.title, lang))}{read.has(section.id) ? ' ✓' : ''}</strong></button>)
  return <main className={`${reference.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang} data-lesson-progress-managed="true" data-disable-lesson-explorer="true">
    <header className={reference.header}>
      <nav className={reference.breadcrumb} aria-label={lang === 'de' ? 'Seitennavigation' : lang === 'en' ? 'Breadcrumb' : 'مسیر صفحه'}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/gehirn')}>{lang === 'de' ? 'Gehirn' : lang === 'en' ? 'Brain' : 'مغز'}</Link><span>/</span><strong>{c(COPY.title, lang)}</strong></nav>
      <LessonHero title={c(COPY.title, lang)} imageSrc="/educational/sella-parasella/hero.svg" imageAlt={c(COPY.heroAlt, lang)} lang={lang}/>
      <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => select('takehome')}><Icon name="check"/>{summaryLabel(lang)}</button><button type="button" className={reference.primaryAction} onClick={() => select('limits')}>{c(COPY.quiz, lang)}<Icon name="check"/></button></div>
      <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.path, lang)} aria-valuemin={0} aria-valuemax={IDS.length} aria-valuenow={read.size}><i style={{width:`${100 * read.size / IDS.length}%`}}/></div><span>{read.size}/{IDS.length} {c(COPY.read, lang)}</span><div className={reference.progressActions}><button type="button" className={reference.lessonCompleteButton} aria-pressed={status.isRead} onClick={markAll}><Icon name="check"/>{c(status.isRead ? COPY.allRead : COPY.all, lang)}</button><button type="button" className={reference.continueButton} disabled={active === IDS.length - 1} onClick={() => select(IDS[active + 1])}>{c(COPY.next, lang)}<Icon name="check"/></button></div></div>
      {status.authError && <p role="status">{lang === 'de' ? 'Lesestatus kann nicht gespeichert werden.' : lang === 'en' ? 'Reading status could not be saved.' : 'وضعیت مطالعه ذخیره نشد.'} <Link href={withLang('/sign-in')}>{lang === 'de' ? 'Anmelden' : lang === 'en' ? 'Sign in' : 'ورود'}</Link></p>}
    </header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.path, lang)}</h2><nav aria-label={c(COPY.path, lang)}>{nav()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(section => <section id={section.id} key={section.id} className={`${reference.section} ${open === section.id ? reference.sectionOpen : ''} ${section.id === "takehome" ? reference.takeHomeSection : ''}`}><h2 className={styles.heading}><button type="button" className={reference.sectionHeader} aria-expanded={open === section.id} aria-controls={`${section.id}-panel`} onClick={() => select(section.id, true)}><span className={reference.sectionIcon}><Icon name={section.icon}/></span><strong>{(section.id === "takehome" ? summaryLabel(lang) : c(section.title, lang))}</strong><span className={reference.toggle} aria-hidden="true">{open === section.id ? '−' : '+'}</span></button></h2><div id={`${section.id}-panel`} className={reference.sectionBody} hidden={open !== section.id}><ChapterContent id={section.id} lang={lang}/><button type="button" className={`${reference.readButton} ${read.has(section.id) ? reference.readButtonDone : ''}`} aria-pressed={read.has(section.id)} onClick={() => mark(section.id)}><Icon name="check"/>{c(read.has(section.id) ? COPY.marked : COPY.mark, lang)}</button></div></section>)}<details className={styles.sources}><summary>{c(COPY.sources, lang)}</summary><p>{lang === 'de' ? 'Gehirn.pdf · PDF-S. 49 (gedruckte S. 48): Themenüberschriften ohne ausgeführten Lehrtext. Die folgenden Bildmuster werden durch die verlinkten Fachquellen ergänzt.' : lang === 'en' ? 'Gehirn.pdf · PDF p. 49 (printed p. 48): topic headings without developed teaching text. The imaging patterns below are supplemented from the linked specialist sources.' : 'Gehirn.pdf · صفحهٔ PDF ۴۹ (صفحهٔ چاپی ۴۸): فقط عنوان موضوع‌ها آمده و متن آموزشی تفصیلی ندارد. الگوهای تصویربرداری زیر با منابع تخصصی پیوندشده تکمیل شده‌اند.'}</p><ul><li><a href="https://doi.org/10.1038/s41574-025-01134-8" target="_blank" rel="noopener noreferrer">Fleseriu et al. · Pituitary Society international consensus · 2025</a></li><li><a href="https://doi.org/10.3174/ajnr.A4387" target="_blank" rel="noopener noreferrer">Park et al. · MRI model for cystic adenoma vs Rathke cleft cyst · AJNR 2015</a></li><li><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7963600/" target="_blank" rel="noopener noreferrer">Prieto et al. · Craniopharyngioma topography on MRI · AJNR 2017</a></li><li><a href="https://doi.org/10.1007/s00234-023-03120-1" target="_blank" rel="noopener noreferrer">Ugga et al. · Sellar-region imaging/pathology review · 2023</a></li></ul></details></article></div>
    <div className={styles.mobile}><button type="button" aria-expanded={mobile} aria-controls="sella-mobile-path" onClick={() => setMobile(value => !value)}>{c(COPY.path, lang)} · {read.size}/{IDS.length}</button><nav id="sella-mobile-path" className={reference.sidebar} aria-label={c(COPY.path, lang)} hidden={!mobile}>{nav()}</nav></div>
  </main>
}
