'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { copy, sections, cases, takehome } from './content'
import styles from './page.module.css'

const labels = {
  cases: { de: '07 · Prüfe deine Entscheidung', en: '07 · Test your decision', fa: '۰۷ · تصمیم خود را بسنجید' },
  summary: { de: '08 · Das bleibt hängen', en: '08 · Take-home points', fa: '۰۸ · نکات کلیدی' },
  sources: { de: '09 · Originalquellen', en: '09 · Original sources', fa: '۰۹ · منابع اصلی' },
  schema: { de: 'Schematische Dichtemuster · keine CT-Bilder', en: 'Schematic attenuation patterns · not CT images', fa: 'الگوهای شماتیک دانسیته · تصاویر CT نیستند' },
}

function LearningCase({ item, index, c }) {
  const [open, setOpen] = useState(false)
  const answerId = `answer-${index}`
  return <article className={styles.case}>
    <span className={styles.caseNumber}>{String(index + 1).padStart(2, '0')}</span>
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

export default function FleischnerPage() {
  const { lang } = useLanguage()
  const c = value => typeof value === 'string' ? value : value[lang] || value.de
  const { isRead, toggleRead, authError } = useLessonReadStatus('fleischner-kriterien')
  const withLang = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const nav = [...sections, ...['cases', 'summary', 'sources'].map(id => ({ id, title: labels[id] }))]

  return <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label={c(copy.back)}><Link href={withLang('/lernen')}>RadYar</Link><span aria-hidden="true">/</span><Link href={withLang('/lernen/thorax')}>{c(copy.back)}</Link><span aria-hidden="true">/</span><span>{c(copy.title)}</span></nav>
      <header className={styles.hero}>
        <div><span className={styles.badge}>{c(copy.badge)}</span><h1>{c(copy.title)}</h1><p className={styles.subtitle}>{c(copy.subtitle)}</p><p>{c(copy.intro)}</p><a className={styles.primary} href="#solide">{c(sections[3].title).replace(/^\S+ · /, '')} ↓</a></div>
        <div className={styles.thresholds} aria-hidden="true"><div><strong>6<span> mm</span></strong><small>{c({ de: 'Kontrollschwelle', en: 'Follow-up threshold', fa: 'آستانه پیگیری' })}</small></div><div><strong>8<span> mm</span></strong><small>{c({ de: 'Solide Herde einordnen', en: 'Classify solid nodules', fa: 'طبقه‌بندی ندول جامد' })}</small></div><div><strong>5<span> {c({ de: 'Jahre', en: 'years', fa: 'سال' })}</span></strong><small>{c({ de: 'Subsolide langfristig denken', en: 'Think long term for subsolid nodules', fa: 'نگاه بلندمدت به نیمه‌جامد' })}</small></div></div>
      </header>
      <div className={styles.layout}>
        <aside className={styles.sidebar}><nav aria-label={c(copy.toc)}><h2>{c(copy.toc)}</h2>{nav.map(item => <a key={item.id} href={`#${item.id}`}>{c(item.title)}</a>)}</nav></aside>
        <div className={styles.article}>
          {sections.map(section => <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{c(section.title)}</h2>
            {section.lead && <p>{c(section.lead)}</p>}
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
          </section>)}
          <section id="cases" className={styles.section}><h2>{c(labels.cases)}</h2><p>{c(copy.casesIntro)}</p><div className={styles.cases}>{cases.map((item, index) => <LearningCase key={index} item={item} index={index} c={c} />)}</div></section>
          <section id="summary" className={styles.section}><h2>{c(labels.summary)}</h2><ol className={styles.takehome}>{takehome.map((item, index) => <li key={index}>{c(item)}</li>)}</ol>
            <button className={styles.primary} type="button" aria-pressed={isRead} onClick={toggleRead}>{isRead ? '✓ ' : ''}{c(isRead ? copy.done : copy.read)}</button>
            {authError && <p role="alert">{c(copy.auth)} <Link href={withLang('/sign-in')}>{c(copy.login)}</Link></p>}
          </section>
          <section id="sources" className={styles.section}><h2>{c(labels.sources)}</h2><p>{c(copy.sourceNote)}</p><ol className={styles.sources}>
            <li>MacMahon H et al. <a href="https://doi.org/10.1148/radiol.2017161659" target="_blank" rel="noreferrer">Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society 2017.</a> Radiology. 2017;284:228–243.</li>
            <li>Bankier AA et al. <a href="https://doi.org/10.1148/radiol.2017162894" target="_blank" rel="noreferrer">Recommendations for Measuring Pulmonary Nodules at CT: A Statement from the Fleischner Society.</a> Radiology. 2017;285:584–600.</li>
          </ol><Link href={withLang('/lernen/thorax')}>← {c(copy.back)}</Link></section>
        </div>
      </div>
    </div>
  </main>
}
