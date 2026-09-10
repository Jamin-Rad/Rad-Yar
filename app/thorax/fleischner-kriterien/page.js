'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LessonIcon, MeasurementIllustration } from './Illustrations'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { copy, sections, cases, takehome } from './content'
import styles from './page.module.css'

const labels = {
  cases: { de: '07 · Prüfe deine Entscheidung', en: '07 · Test your decision', fa: '۰۷ · تصمیم خود را بسنجید' },
  summary: { de: '08 · Das bleibt hängen', en: '08 · Take-home points', fa: '۰۸ · نکات کلیدی' },
  sources: { de: 'Quellen', en: 'Sources', fa: 'منابع' },
  schema: { de: 'Schematische Dichtemuster · keine CT-Bilder', en: 'Schematic attenuation patterns · not CT images', fa: 'الگوهای شماتیک دانسیته · تصاویر CT نیستند' },
}

function LearningCase({ item, index, c }) {
  const [open, setOpen] = useState(false)
  const answerId = `answer-${index}`
  return <article className={styles.case}>
    <span className={styles.caseNumber}><LessonIcon id="cases"/></span>
    <h3>{c(item[0])}</h3><p>{c(item[1])}</p>
    <button type="button" aria-expanded={open} aria-controls={answerId} onClick={() => setOpen(value => !value)}>{c(open ? copy.hide : copy.solution)}</button>
    <div id={answerId} hidden={!open} className={styles.answer}>{c(item[2])}</div>
  </article>
}

function DensityDiagram({ type }) {
  return <svg viewBox="0 0 180 100" aria-hidden="true" className={styles.diagram}>
    <rect x="1" y="1" width="178" height="98" rx="14" fill="#102536" />
    <path d="M20 75 L140 22 M56 59 L60 22 M94 42 L153 68" fill="none" stroke="#829cad" strokeWidth="4" />
    <circle cx="90" cy="50" r="30" fill="#e0f2fe" opacity={type === 0 ? 1 : 0.35} />
    {type === 2 && <circle cx="97" cy="53" r="13" fill="#e0f2fe" />}
  </svg>
}

function LessonSection({ id, title, active, onSelect, children }) {
  const open = active === id
  return <section id={id} className={styles.section} data-open={open} aria-labelledby={id + '-title'}>
    <h2 id={id + '-title'}><button type="button" className={styles.sectionToggle} aria-expanded={open} aria-controls={id + '-body'} onClick={() => onSelect(open ? null : id)}><span className={styles.sectionSymbol}><LessonIcon id={id}/></span><span>{title}</span><span className={styles.chevron} aria-hidden="true">{open ? '−' : '+'}</span></button></h2>
    <div id={id + '-body'} hidden={!open} className={styles.sectionBody}>{children}</div>
  </section>
}

export default function FleischnerPage() {
  const { lang } = useLanguage()
  const c = value => typeof value === 'string' ? value : value[lang] || value.de
  const { isRead, toggleRead, authError } = useLessonReadStatus('fleischner-kriterien')
  const withLang = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const nav = [...sections, ...['cases', 'summary'].map(id => ({ id, title: labels[id] }))]

  const [active, setActive] = useState('geltung')
  const title = value => c(value).replace(/^\S+ · /, '')
  const selectSection = id => {
    setActive(id)
    if (id) window.history.replaceState(null, '', '#' + id)
  }
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1)
      if ([...sections.map(section => section.id), 'cases', 'summary'].includes(id)) setActive(id)
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])
  useEffect(() => {
    if (!active || window.location.hash !== '#' + active) return
    const frame = requestAnimationFrame(() => document.getElementById(active)?.scrollIntoView({ block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [active])
  const lessonPath = '/thorax/fleischner-kriterien'
  const from = encodeURIComponent(withLang(lessonPath))
  const readControl = <div className={styles.readControl}><button className={styles.primary} type="button" aria-pressed={isRead} onClick={toggleRead}>{isRead ? '✓ ' : '○ '}{c(isRead ? copy.done : copy.read)}</button>{authError && <p role="alert">{c(copy.auth)} <Link href={withLang('/sign-in')}>{c(copy.login)}</Link></p>}</div>

  return <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label={c(copy.back)}><Link href={withLang('/lernen')}>RadYar</Link><span aria-hidden="true">/</span><Link href={withLang('/lernen/thorax')}>{c(copy.back)}</Link><span aria-hidden="true">/</span><span>{c(copy.title)}</span></nav>
      <header className={styles.hero}>
        <div className={styles.heroText}><span className={styles.badge}>Dr. Zia</span><h1>{c(copy.title)}</h1><div className={styles.learningActions}>
          <Link href={withLang(`/ueben/quiz?fach=thorax&n=10&themen=fleischner-kriterien&from=${from}`)}>🎯 MCQ</Link>
          <Link href={withLang(`/flashcards/fleischner-kriterien?from=${from}`)}>🧠 {c({ de: 'Flashcards', en: 'Flashcards', fa: 'فلش‌کارت' })}</Link>
          <Link className={styles.calculatorLink} href={withLang('/fleischner')}>⌘ {c({ de: 'Fleischner-Rechner', en: 'Fleischner calculator', fa: 'محاسبه‌گر Fleischner' })}</Link>
        </div></div>
        <aside className={styles.pitfalls} aria-label="Pitfalls">{[
          [c({ de: 'Screening ≠ Zufallsbefund', en: 'Screening ≠ incidental finding', fa: 'غربالگری ≠ یافته اتفاقی' }), c({ de: 'Im Screening gilt das jeweilige Screening-Protokoll, nicht Fleischner.', en: 'Use the screening protocol for screening findings, not Fleischner.', fa: 'برای یافته غربالگری از پروتکل مربوط استفاده کنید، نه Fleischner.' })],
          [c({ de: 'Der größte ist nicht immer der suspekteste', en: 'Largest does not mean most suspicious', fa: 'بزرگ‌ترین همیشه مشکوک‌ترین نیست' }), c({ de: 'Bei mehreren Herden führt der morphologisch suspekteste Befund.', en: 'With multiple nodules, the most suspicious morphology guides management.', fa: 'در ندول‌های متعدد، مشکوک‌ترین مورفولوژی تعیین‌کننده است.' })],
          [c({ de: 'Soliden Anteil nicht übersehen', en: 'Do not overlook the solid component', fa: 'جزء جامد را نادیده نگیرید' }), c({ de: 'Ein persistierender solider Anteil ≥6 mm ist hochgradig suspekt.', en: 'A persistent solid component ≥6 mm is highly suspicious.', fa: 'جزء جامد ماندگار ≥۶ میلی‌متر بسیار مشکوک است.' })],
        ].map(([heading, text]) => <div key={heading}><h3>{heading}</h3><p>{text}</p></div>)}</aside>
      </header>
      {readControl}
      <div className={styles.layout}>
        <aside className={styles.sidebar}><nav aria-label={c(copy.toc)}><h2>{c(copy.toc)}</h2>{nav.map(item => <a key={item.id} href={`#${item.id}`} className={active === item.id ? styles.activeLink : undefined} aria-current={active === item.id ? 'location' : undefined} onClick={event => { event.preventDefault(); selectSection(item.id) }}><LessonIcon id={item.id}/><span>{title(item.title)}</span></a>)}</nav></aside>
        <div className={styles.article}>
          {sections.map(section => <LessonSection key={section.id} id={section.id} title={title(section.title)} active={active} onSelect={selectSection}>
            {section.lead && <p>{c(section.lead)}</p>}
            {section.id === 'messen' && <MeasurementIllustration c={c}/>}
            {section.cards && <div className={styles.cards}>{section.cards.map((card, index) => <article key={index} className={styles.card}>
              {section.id === 'einordnen' && <DensityDiagram type={index} />}
              <h3>{c(card[0])}</h3><p>{c(card[1])}</p>
            </article>)}</div>}
            {section.id === 'einordnen' && <p className={styles.caption}>{c(labels.schema)}</p>}
            {section.rows && <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={c(section.title)}><table>
              <caption>{c(section.title).replace(/^\S+ · /, '')} · Fleischner 2017</caption>
              <thead><tr>{section.headers.map((cell, index) => <th key={index} scope="col"><bdi>{c(cell)}</bdi></th>)}</tr></thead>
              <tbody>{section.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{c(cell)}</th> : <td key={cellIndex}><bdi>{c(cell)}</bdi></td>)}</tr>)}</tbody>
            </table></div>}
            {section.note && <div className={styles.note}><strong>{c(copy.note)}</strong><p>{c(section.note)}</p></div>}
            {section.warning && <div className={styles.warning}><strong>{c({ de: 'Solide Komponente beachten', en: 'Check the solid component', fa: 'به جزء جامد توجه کنید' })}</strong><p>{c(section.warning)}</p></div>}
          </LessonSection>)}
          <LessonSection id="cases" title={title(labels.cases)} active={active} onSelect={selectSection}><p>{c(copy.casesIntro)}</p><div className={styles.cases}>{cases.map((item, index) => <LearningCase key={index} item={item} index={index} c={c} />)}</div></LessonSection>
          <LessonSection id="summary" title={title(labels.summary)} active={active} onSelect={selectSection}><ul className={styles.takehome}>{takehome.map((item, index) => <li key={index}>{c(item)}</li>)}</ul>
          </LessonSection>
        </div>
      </div>
      {readControl}
      <footer className={styles.sourceFooter}><span>{c(labels.sources)}: </span><a href="https://doi.org/10.1148/radiol.2017161659" target="_blank" rel="noreferrer">MacMahon et al. · Fleischner 2017</a><span> · </span><a href="https://doi.org/10.1148/radiol.2017162894" target="_blank" rel="noreferrer">Bankier et al. · Radiology 2017</a></footer>
    </div>
  </main>
}
