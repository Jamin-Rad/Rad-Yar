'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import LessonHero from '@/components/LessonHero'
import { LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { STEATOSIS_CHAPTERS as CHAPTERS, STEATOSIS_COPY as COPY } from '@/data/steatosisLesson'
import reference from '@/app/andarun/test/page.module.css'
import typography from '@/components/LessonTypography.module.css'
import styles from './page.module.css'

const TRACKED = CHAPTERS.filter(chapter => chapter.id !== 'takehome').map(chapter => chapter.id)
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

function Icon({ name }) {
  const paths = {
    pattern: 'M4 8c3-5 13-5 16 0v9c-4 4-12 4-16 0z M8 10h8 M8 14h5', compare: 'M12 3v18 M4 6h16 M7 6l-4 8h8z M17 6l-4 8h8z',
    warning: 'M12 3L2 21h20z M12 9v5 M12 17v1', spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z', check: 'M5 12l4 4L19 6', arrow: 'M4 12h16 M14 6l6 6-6 6',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.pattern} /></svg>
}

function HeroDiagram({ lang }) {
  const alt = pick(COPY.heroAlt, lang)
  return <svg viewBox="0 0 420 250" role="img" aria-label={alt} className={styles.heroDiagram}>
    <rect x="10" y="10" width="400" height="230" rx="22" fill="var(--canvas)" />
    <path d="M57 88c35-47 115-55 178-36 37 11 71 6 122 26 17 7 25 23 21 45-7 42-41 68-89 77-67 13-127-4-179 6-33 6-69-5-78-34-10-29 2-58 25-84Z" fill="var(--fatty-liver)" stroke="var(--teal-700)" strokeWidth="3" />
    <path d="M84 119c47-16 105-12 157 1 47 11 84 10 127 3" fill="none" stroke="var(--teal-700)" strokeWidth="5" strokeLinecap="round" />
    <path d="M204 91c-10 22-10 48 0 71" fill="none" stroke="var(--teal-700)" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="335" cy="127" rx="31" ry="40" fill="var(--spared-liver)" stroke="var(--plum-700)" strokeWidth="3" />
    <path d="M337 170c-3 15-3 28 1 40" fill="none" stroke="var(--plum-700)" strokeWidth="3" strokeDasharray="6 5" />
    <text x="88" y="214" textAnchor="middle" fontSize="14" fill="var(--body)">{pick({ de: 'diffus verändertes Parenchym', en: 'diffusely altered parenchyma', fa: 'پارانشیم با تغییر منتشر' }, lang)}</text>
    <text x="334" y="218" textAnchor="middle" fontSize="14" fill="var(--body)">{pick({ de: 'fokale Aussparung', en: 'focal sparing', fa: 'ناحیه حفظ‌شده موضعی' }, lang)}</text>
  </svg>
}

function Callout({ block, lang }) {
  const warning = block.tone === 'warning'
  return <aside className={warning ? reference.warning : reference.rememberNote}><span className={`${reference.calloutLabel} ${typography.handwritten}`}><Icon name={warning ? 'warning' : 'spark'} />{pick(warning ? { de: 'CAVE', en: 'Caution', fa: 'احتیاط' } : { de: 'Merke', en: 'Key point', fa: 'نکته کلیدی' }, lang)}</span><p className={styles.bodyText}>{pick(block.text, lang)}</p></aside>
}

function Table({ block, lang }) {
  return <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={pick(block.headers[0], lang)}><table className={styles.table}><thead><tr>{block.headers.map((cell, index) => <th scope="col" key={index}>{pick(cell, lang)}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{pick(cell, lang)}</th> : <td key={j}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>
}

function Diagram({ lang }) {
  return <figure className={styles.diagram}><svg viewBox="0 0 500 220" role="img" aria-label={pick({ de: 'Lehrschema: diffuse Verfettung mit lokal ausgespartem Areal; Gefäße verlaufen ohne Verdrängung hindurch', en: 'Teaching schematic: diffuse fatty change with a locally spared area; vessels pass through without displacement', fa: 'شماتیک آموزشی: چربی منتشر با ناحیه موضعی حفظ‌شده؛ عروق بدون جابه‌جایی از آن عبور می‌کنند' }, lang)}>
    <rect width="500" height="220" rx="16" fill="var(--canvas)" />
    <path d="M58 75c43-49 135-47 207-27 63 18 109 4 153 26 22 12 27 44 7 71-31 42-95 45-158 34-67-12-115-4-165 6-41 8-76-4-83-39-4-25 12-54 39-71Z" fill="var(--fatty-liver)" stroke="var(--teal-700)" strokeWidth="3" />
    <ellipse cx="367" cy="119" rx="35" ry="42" fill="var(--spared-liver)" stroke="var(--plum-700)" strokeWidth="2" />
    <path d="M93 114c91-12 181 9 285 3M205 88c-7 26-7 52 2 78" fill="none" stroke="#227e9b" strokeWidth="5" strokeLinecap="round" />
    <text x="250" y="24" textAnchor="middle" fontSize="15" fill="var(--body)">{pick({ de: 'Gefäße ohne Verdrängung', en: 'Vessels without displacement', fa: 'عبور عروق بدون جابه‌جایی' }, lang)}</text>
    <text x="368" y="180" textAnchor="middle" fontSize="13" fill="var(--body)">{pick({ de: 'Aussparung', en: 'Sparing', fa: 'ناحیه حفظ‌شده' }, lang)}</text>
  </svg><figcaption>{pick({ de: 'Lehrschema, keine Patientenaufnahme. Eine typische Lage und durchziehende Gefäße stützen die Einordnung, ersetzen aber keine vollständige Beurteilung.', en: 'Teaching schematic, not a patient image. Typical location and traversing vessels support interpretation but do not replace full assessment.', fa: 'شماتیک آموزشی است، نه تصویر بیمار. محل تیپیک و عبور عروق به تفسیر کمک می‌کنند، اما جایگزین ارزیابی کامل نیستند.' }, lang)}</figcaption></figure>
}

function SelfCheck({ lang }) {
  const [answer, setAnswer] = useState(null)
  const quiz = COPY.quiz
  return <section className={styles.quiz} aria-labelledby="steatosis-check-title"><h3 id="steatosis-check-title">{pick(quiz.title, lang)}</h3><p>{pick(quiz.stem, lang)}</p><div className={styles.answers}>{quiz.options.map((option, index) => <button type="button" key={index} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer !== null ? <p className={styles.feedback}><strong>{pick(answer === quiz.correct ? { de: 'Richtig.', en: 'Correct.', fa: 'درست است.' } : { de: 'Bitte noch einmal prüfen.', en: 'Review your choice.', fa: 'انتخابتان را دوباره بررسی کنید.' }, lang)}</strong> {pick(quiz.feedback[answer], lang)}</p> : null}</div></section>
}

function Block({ block, lang }) {
  if (block.type === 'text') return <p className={styles.bodyText}>{pick(block.text, lang)}</p>
  if (block.type === 'note') return <Callout block={block} lang={lang} />
  if (block.type === 'table') return <Table block={block} lang={lang} />
  if (block.type === 'diagram') return <Diagram lang={lang} />
  if (block.type === 'quiz') return <SelfCheck lang={lang} />
  if (block.type === 'summary') return <ul className={styles.summary}>{block.items.map((item, index) => <li key={index}><Icon name="check" /><span>{pick(item, lang)}</span></li>)}</ul>
  return null
}

export default function SteatosisLesson({ lang = 'de', readSections = new Set(), setReadSections, isRead, toggleRead, authError }) {
  const c = value => pick(value, lang)
  const [openId, setOpenId] = useState(CHAPTERS[0].id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeIndex = CHAPTERS.findIndex(chapter => chapter.id === openId)
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const sourcesTitle = c({ de: 'Quellen', en: 'Sources', fa: 'منابع' })
  const sources = [
    { tag: c({ de: 'Leitlinie', en: 'Guideline', fa: 'راهنما' }), title: 'EASL–EASD–EASO Clinical Practice Guidelines on the management of MASLD. J Hepatol. 2024;81:492–542. doi:10.1016/j.jhep.2024.04.031.', href: 'https://doi.org/10.1016/j.jhep.2024.04.031', citation: c({ de: 'Aktuelle Einordnung von Steatose, MASLD und Krankheitsverlauf.', en: 'Current framing of steatosis, MASLD and disease course.', fa: 'چارچوب به‌روز استئاتوز، MASLD و سیر بیماری.' }) },
    { tag: c({ de: 'Bildgebungsleitlinie', en: 'Imaging guideline', fa: 'راهنمای تصویربرداری' }), title: 'EASL Clinical Practice Guidelines on non-invasive tests for evaluation of liver disease severity and prognosis: 2021 update. J Hepatol. 2021;75:659–689. doi:10.1016/j.jhep.2021.05.025.', href: 'https://doi.org/10.1016/j.jhep.2021.05.025', citation: c({ de: 'Ultraschall als verbreitete Erstlinienmethode; MRT-PDFF zur genauen nicht-invasiven Quantifizierung, mit Kosten- und Verfügbarkeitsgrenzen.', en: 'Ultrasound as a common first-line method; MRI-PDFF for accurate non-invasive quantification, with cost and availability limits.', fa: 'سونوگرافی به‌عنوان روش رایج خط اول؛ MRI-PDFF برای کمّی‌سازی دقیق و غیرتهاجمی، با محدودیت هزینه و دسترسی.' }) },
    { tag: c({ de: 'Bildgebungsreview', en: 'Imaging review', fa: 'مرور تصویربرداری' }), title: 'Vilgrain V, Lagadec M, Ronot M. Pitfalls in Liver Imaging. Radiology. 2016;278(1). doi:10.1148/radiol.2015142576.', href: 'https://doi.org/10.1148/radiol.2015142576', citation: c({ de: 'Anatomische Pseudoläsionen: die Gallenblasengrube wird den Segmenten IV/V zugeordnet.', en: 'Anatomic pseudolesions: the gallbladder fossa is assigned to segments IV/V.', fa: 'شبه‌ضایعات آناتومیک: حفرهٔ کیسهٔ صفرا به سگمان‌های IV/V نسبت داده می‌شود.' }) },
  ]
  useEffect(() => {
    const sync = () => setOpenId(CHAPTERS.some(chapter => chapter.id === location.hash.slice(1)) ? location.hash.slice(1) : CHAPTERS[0].id)
    sync(); window.addEventListener('hashchange', sync); window.addEventListener('popstate', sync)
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync) }
  }, [])
  const select = (id, collapse = false) => {
    const next = collapse && id === openId ? null : id
    setOpenId(next); setMobileOpen(false)
    const url = new URL(window.location.href); url.hash = next || ''; window.history.replaceState(null, '', url)
    if (next) requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView({ block: 'start', behavior: 'smooth' }))
  }
  const mark = id => setReadSections(previous => { const next = new Set(previous); next.has(id) ? next.delete(id) : next.add(id); return next })
  const markAll = () => { if (toggleRead()) setReadSections(isRead ? new Set() : new Set(TRACKED)) }
  const nav = () => CHAPTERS.map(chapter => <button type="button" key={chapter.id} aria-current={openId === chapter.id ? 'location' : undefined} className={openId === chapter.id ? reference.activeSideItem : undefined} onClick={() => select(chapter.id)}><span className={reference.sideIcon}><Icon name={chapter.icon} /></span><strong>{c(chapter.title)}{readSections.has(chapter.id) ? <span className={styles.readTick} aria-label={c(COPY.ui.marked)}> ✓</span> : null}</strong></button>)
  return <main className={`${reference.page} ${styles.page}`} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'} data-lesson-progress-managed="true" data-disable-lesson-explorer="true">
    <header className={reference.header}><div className={reference.topline}><nav className={reference.breadcrumb} aria-label={c(COPY.ui.breadcrumb)}><Link href={withLang('/')}>RadYar</Link><span>/</span><Link href={withLang('/lernen/abdomen')}>{c({ de: 'Abdomen', en: 'Abdomen', fa: 'شکم' })}</Link><span>/</span><strong>{c(COPY.title)}</strong></nav><span className={`${reference.author} ${typography.handwritten}`}>Dr. Zia</span></div>
      <LessonHero title={c(COPY.title)} visual={<HeroDiagram lang={lang} />} imageAlt={c(COPY.heroAlt)} lang={lang} />
      <div className={reference.actions}><button type="button" className={reference.takeHomeJump} onClick={() => select('takehome')}><Icon name="spark" />{c(COPY.ui.summary)}</button><button type="button" className={reference.primaryAction} onClick={() => select('fokal')}>{c(COPY.ui.mcq)}<Icon name="arrow" /></button></div>
      <div className={reference.progressBar}><div className={reference.progressTrack} role="progressbar" aria-label={c(COPY.ui.path)} aria-valuemin={0} aria-valuemax={TRACKED.length} aria-valuenow={readSections.size}><i style={{ width: `${readSections.size / TRACKED.length * 100}%` }} /></div><span>{readSections.size} / {TRACKED.length} {c(COPY.ui.read)}</span><div className={reference.progressActions}><button type="button" className={`${reference.lessonCompleteButton} ${isRead ? reference.lessonCompleteButtonDone : ''}`} aria-pressed={isRead} onClick={markAll}><Icon name="check" />{c(isRead ? COPY.ui.fullMarked : COPY.ui.fullMark)}</button><button type="button" className={reference.continueButton} disabled={activeIndex >= CHAPTERS.length - 1} onClick={() => select(CHAPTERS[activeIndex + 1].id)}>{c(COPY.ui.continue)}<Icon name="arrow" /></button></div></div>
      {authError ? <p className={styles.auth} role="status">{c({ de: 'Bitte anmelden, um den Lernfortschritt zu speichern.', en: 'Sign in to save learning progress.', fa: 'برای ذخیره پیشرفت یادگیری وارد شوید.' })} <Link href={withLang('/sign-in')}>{c({ de: 'Anmelden', en: 'Sign in', fa: 'ورود' })}</Link></p> : null}
    </header>
    <div className={reference.layout}><aside className={reference.sidebar}><h2>{c(COPY.ui.path)}</h2><nav aria-label={c(COPY.ui.path)}>{nav()}</nav></aside><article className={reference.lesson}>{CHAPTERS.map(chapter => <section id={chapter.id} key={chapter.id} className={`${reference.section} ${openId === chapter.id ? reference.sectionOpen : ''} ${chapter.id === 'takehome' ? reference.takeHomeSection : ''}`}><h2 className={styles.chapterHeading}><button type="button" className={reference.sectionHeader} aria-expanded={openId === chapter.id} aria-controls={`${chapter.id}-panel`} onClick={() => select(chapter.id, true)}><span className={reference.sectionIcon}><Icon name={chapter.icon} /></span><span><strong>{c(chapter.title)}</strong></span><span className={reference.toggle} aria-hidden="true">{openId === chapter.id ? '−' : '+'}</span></button></h2><div id={`${chapter.id}-panel`} className={reference.sectionBody} hidden={openId !== chapter.id}>{chapter.lead ? <p className={reference.lead}>{c(chapter.lead)}</p> : null}{chapter.blocks.map((block, index) => <Block key={index} block={block} lang={lang} />)}{chapter.id !== 'takehome' ? <button type="button" className={`${reference.readButton} ${readSections.has(chapter.id) ? reference.readButtonDone : ''}`} aria-pressed={readSections.has(chapter.id)} onClick={() => mark(chapter.id)}><Icon name="check" />{c(readSections.has(chapter.id) ? COPY.ui.marked : COPY.ui.mark)}</button> : null}</div></section>)}</article></div>
    <LessonSources title={sourcesTitle} items={sources} note={c({ de: 'Themen- und Bildbasis: bereitgestellte Abdomen.pdf, PDF S. 26–27 (Druck S. 25–26), visuell geprüft. Das Diagramm ist ein selbst erstelltes Lehrschema, keine Patientenaufnahme.', en: 'Topic and image source: supplied Abdomen.pdf, PDF pp. 26–27 (printed pp. 25–26), visually reviewed. The diagram is an original teaching schematic, not a patient image.', fa: 'منبع موضوع و تصاویر: Abdomen.pdf ارائه‌شده، صفحه‌های PDF ۲۶–۲۷ (چاپی ۲۵–۲۶)، بررسی‌شده به‌صورت دیداری. نمودار، شماتیک آموزشیِ ساخته‌شده برای درس است، نه تصویر بیمار.' })} />
    <div className={styles.mobilePath}><button type="button" className={styles.mobileTrigger} aria-expanded={mobileOpen} aria-controls="steatosis-mobile-path" onClick={() => setMobileOpen(value => !value)}><Icon name="pattern" /><strong>{c(COPY.ui.path)}</strong><span>{readSections.size} / {TRACKED.length}</span></button><nav id="steatosis-mobile-path" className={`${reference.sidebar} ${styles.mobilePanel}`} hidden={!mobileOpen} aria-label={c(COPY.ui.path)}>{nav()}</nav></div>
  </main>
}
