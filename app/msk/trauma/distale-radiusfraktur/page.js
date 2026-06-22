'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { DISTALE_RADIUS_LESSON } from '@/data/distale-radiusfraktur'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', report: 'Beispielbefund', radiopaedia: 'Auf Radiopaedia öffnen' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', report: 'Sample report', radiopaedia: 'Open on Radiopaedia' },
  fa: { zoom: 'بزرگ‌نمایی', close: 'بستن تصویر', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', report: 'نمونه گزارش', radiopaedia: 'باز کردن در رادیوپدیا' },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return <section id={id} className={styles.section}>
    <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}><h2>{title}</h2><span>{open ? '−' : '+'}</span></button>
    {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
  </section>
}

function Table({ headers, rows }) {
  return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function Cards({ items, lang }) {
  return <div className={styles.cardsGrid}>{items.map(item => <div className={styles.infoCard} key={L(item.title, lang)}><span className={styles.cardIcon}>{item.icon}</span><h3>{L(item.title, lang)}</h3><p>{L(item.text, lang)}</p></div>)}</div>
}

function Callout({ label, cave = false, children }) {
  return <div className={`${styles.callout} ${cave ? styles.cave : ''}`}><strong>{cave ? '⚠️' : '💡'} {label}</strong><p>{children}</p></div>
}

function ReadButton({ isRead, toggleRead, authError, copy }) {
  return <div className={styles.readControl}>
    <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}><span className={styles.readCheck}>{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span></button>
    {authError && <div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
  </div>
}

function ZoomImage({ src, alt, copy }) {
  const [open, setOpen] = useState(false)
  return <div style={{ margin: '1.25rem 0' }}>
    <button type="button" onClick={() => setOpen(true)} aria-label={`${copy.zoom}: ${alt}`} style={{ display: 'block', width: '100%', maxWidth: '720px', margin: '0 auto', padding: 0, overflow: 'hidden', border: '1px solid rgba(148,163,184,.3)', borderRadius: '12px', background: '#050505', cursor: 'zoom-in' }}><img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '680px', objectFit: 'contain' }} /></button>
    <p style={{ textAlign: 'center', fontSize: '.78rem', opacity: .68 }}>{alt}</p>
    {open && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={() => setOpen(false)}><div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}><button type="button" className={styles.strokeImageModalClose} onClick={() => setOpen(false)} aria-label={copy.close}>×</button><img src={src} alt={alt} style={{ maxHeight: '82vh', maxWidth: '100%', objectFit: 'contain' }} /></div></div>}
  </div>
}

function CaseGallery({ title, image, radiopaediaUrl, copy }) {
  const [open, setOpen] = useState(false)
  return <div style={{ margin: '1.3rem 0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.8rem', flexWrap: 'wrap' }}><h3>{title}</h3><a href={radiopaediaUrl} target="_blank" rel="noopener noreferrer">Radiopaedia ↗</a></div>
    <button type="button" onClick={() => setOpen(true)} aria-label={`${copy.zoom}: ${image.caption}`} style={{ display: 'block', width: '100%', maxWidth: '520px', padding: 0, overflow: 'hidden', border: '1px solid rgba(148,163,184,.3)', borderRadius: '12px', background: '#050505', color: 'inherit', cursor: 'zoom-in' }}><img src={image.src} alt={image.caption} style={{ display: 'block', width: '100%', height: 'auto' }} /><p style={{ margin: 0, padding: '.7rem', fontSize: '.8rem', opacity: .78 }}>{image.caption}</p></button>
    {open && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={() => setOpen(false)}><div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}><button type="button" className={styles.strokeImageModalClose} onClick={() => setOpen(false)} aria-label={copy.close}>×</button><img src={image.src} alt={image.caption} style={{ maxHeight: '76vh', maxWidth: '100%', objectFit: 'contain' }} /><p style={{ textAlign: 'center' }}>{image.caption}</p><p style={{ textAlign: 'center' }}><a href={radiopaediaUrl} target="_blank" rel="noopener noreferrer">{copy.radiopaedia} ↗</a></p></div></div>}
  </div>
}

export default function DistaleRadiusfrakturPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const data = DISTALE_RADIUS_LESSON
  const rtl = lang === 'fa'
  const route = '/msk/trauma/distale-radiusfraktur'
  const { isRead, toggleRead, authError } = useLessonReadStatus('distale-radiusfraktur')
  const [active, setActive] = useState('')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const rows = value => value.map(row => row.map(c))

  useEffect(() => {
    const observers = data.sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setActive(section.id) }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [data.sections])

  return <main className={`${styles.page} ${styles.mskTraumaPage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <InProgressBanner lang={lang} />
    <header className={styles.header}>
      <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/msk')}>MSK</Link><span>›</span><span>{c(data.breadcrumb)}</span></div>
      <div className={styles.hero}>
        <div className={styles.heroText}><span className={styles.sourceBadge}>{data.sourceLabel}</span><h1>{c(data.title)}</h1><p>{c(data.definition)}</p><div className={styles.actions}><Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=msk&n=12&themen=distale-radiusfraktur&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link><Link className={styles.actionBtn} href={withLang(`/flashcards/distale-radiusfraktur?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link></div></div>
        <div className={styles.heroStats}>{data.heroCards.map(card => <div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div>
      </div>
    </header>
    <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><div className={styles.sideTitle}>{c(data.toc)}</div>{data.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })} style={section.emphasis ? { color: '#f97316', border: '1px solid rgba(249,115,22,.5)', background: 'rgba(249,115,22,.12)', fontWeight: 950 } : undefined}><span>{section.icon}</span><strong>{c(section.label)}</strong></button>)}</aside>
      <div className={styles.main}>
        <Section id="diagnostik" title={c(data.diagnostik.title)} lead={c(data.diagnostik.lead)}><Table headers={data.diagnostik.headers.map(c)} rows={rows(data.diagnostik.rows)} /><Callout label="CT">{c(data.diagnostik.ct)}</Callout></Section>
        <Section id="muster" title={c(data.muster.title)} lead={c(data.muster.lead)}><ZoomImage src={data.muster.imageSrc} alt={c(data.muster.imageAlt)} copy={copy} /><Cards items={data.muster.items} lang={lang} /><Callout label={c(data.caveLabel)} cave>{c(data.muster.cave)}</Callout></Section>
        <Section id="fernandez" title={c(data.fernandez.title)} lead={c(data.fernandez.lead)}><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}><ZoomImage src={data.fernandez.schemaSrc} alt={c(data.fernandez.schemaAlt)} copy={copy} /><ZoomImage src={data.fernandez.xraySrc} alt={c(data.fernandez.xrayAlt)} copy={copy} /></div><Table headers={data.fernandez.headers.map(c)} rows={rows(data.fernandez.rows)} /><Callout label={c(data.keyLabel)}>{c(data.fernandez.key)}</Callout></Section>
        <Section id="sonderformen" title={c(data.sonderformen.title)} lead={c(data.sonderformen.lead)}><Cards items={data.sonderformen.items} lang={lang} /></Section>
        <Section id="begleitverletzungen" title={c(data.begleitverletzungen.title)} lead={c(data.begleitverletzungen.lead)}><CaseGallery title={c(data.begleitverletzungen.caseTitle)} image={{ ...data.begleitverletzungen.images[0], caption: c(data.begleitverletzungen.images[0].caption) }} radiopaediaUrl={data.begleitverletzungen.radiopaediaUrl} copy={copy} /><Cards items={data.begleitverletzungen.items} lang={lang} /><Callout label={c(data.caveLabel)} cave>{c(data.begleitverletzungen.cave)}</Callout></Section>
        <Section id="befund" title={c(data.befund.title)} lead={c(data.befund.lead)}><Cards items={data.befund.items} lang={lang} /><div className={styles.fractureReportTemplate}><strong>{copy.report}</strong><p>{c(data.befund.sample)}</p></div></Section>
        <Section id="therapie" title={c(data.therapie.title)} lead={c(data.therapie.lead)}><Cards items={data.therapie.items} lang={lang} /></Section>
        <Section id="takehome" title={c(data.takehome.title)} lead={c(data.takehome.lead)}><div className={styles.takeHomeGrid}>{data.takehome.items.map((item, index) => <div className={styles.takeHomeItem} key={c(item.title)}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div></Section>
        <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
      </div>
    </div>
  </main>
}
