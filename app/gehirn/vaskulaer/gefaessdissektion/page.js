'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { DISSECTION_LESSON } from '@/data/dissection'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const CASE_28441 = Array.from({ length: 8 }, (_, i) => `/dissection/case-28441/${String(i + 1).padStart(2, '0')}.jpg`)
const CASE_58286 = Array.from({ length: 20 }, (_, i) => `/dissection/case-58286/${String(i + 1).padStart(2, '0')}.png`)
const localize = (value, lang) => value?.[lang] || value?.de || value

const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', previous: 'Vorheriges Bild', next: 'Nächstes Bild', image: (a, b) => `Bild ${a} von ${b}`, scroll: 'Im Bild scrollen oder Slider/Pfeile verwenden.', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', key: 'Merke', cave: 'CAVE' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', previous: 'Previous image', next: 'Next image', image: (a, b) => `Image ${a} of ${b}`, scroll: 'Scroll over the image or use the slider/arrows.', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', key: 'Key point', cave: 'Caution' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', previous: 'تصویر قبلی', next: 'تصویر بعدی', image: (a, b) => `تصویر ${a} از ${b}`, scroll: 'روی تصویر اسکرول کنید یا از slider و فلش‌ها استفاده کنید.', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.', key: 'نکته مهم', cave: 'احتیاط' },
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
  return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={`${r}-${c}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function Cards({ items, lang }) {
  return <div className={styles.cardsGrid}>{items.map(item => <div className={styles.infoCard} key={localize(item.title, lang)}><h3>{localize(item.title, lang)}</h3><p>{localize(item.text, lang)}</p></div>)}</div>
}

function Callout({ label, cave, children }) {
  return <div className={`${styles.callout} ${cave ? styles.cave : ''}`}><strong>{cave ? '⚠️' : '💡'} {label}</strong><p>{children}</p></div>
}

function ReadButton({ isRead, toggleRead, authError, copy }) {
  return <div className={styles.readControl}>
    <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}><span className={styles.readCheck}>{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span></button>
    {authError && <div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
  </div>
}

function LearningFigure({ src, alt, onZoom, copy }) {
  return <figure style={{ margin: '22px 0 0', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 22, background: '#07101f' }}>
    <button type="button" className={styles.strokeZoomButton} onClick={() => onZoom({ src, alt })} aria-label={copy.zoom}><Image src={src} alt={alt} width={1200} height={600} style={{ display: 'block', width: '100%', height: 'auto' }} /></button>
  </figure>
}

function CaseViewer({ frames, initial, alt, copy, onZoom }) {
  const [index, setIndex] = useState(initial)
  const move = delta => setIndex(value => Math.min(frames.length - 1, Math.max(0, value + delta)))
  const control = { width: 38, height: 34, border: '1px solid rgba(255,255,255,.22)', borderRadius: 9, color: '#fff', background: '#172033', cursor: 'pointer', fontSize: 24 }
  return <div tabIndex={0} onWheel={event => { event.preventDefault(); move(event.deltaY > 0 ? 1 : -1) }} onKeyDown={event => { if (['ArrowRight', 'ArrowDown'].includes(event.key)) move(1); if (['ArrowLeft', 'ArrowUp'].includes(event.key)) move(-1) }} style={{ background: '#020617', outline: 'none' }}>
    <div className={styles.caseImage}>
      <button type="button" className={styles.strokeCaseZoom} onClick={() => onZoom({ src: frames[index], alt, frames, index })} aria-label={copy.zoom}><Image src={frames[index]} alt={alt} width={610} height={610} className={styles.caseImageAsset} /></button>
      <span style={{ position: 'absolute', right: 10, bottom: 10, padding: '5px 8px', borderRadius: 999, color: '#fff', background: 'rgba(2,6,23,.78)', fontSize: 11, fontWeight: 800 }}>{copy.image(index + 1, frames.length)}</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '38px minmax(0,1fr) 38px', gap: 10, alignItems: 'center', padding: '10px 12px 4px' }}>
      <button type="button" style={control} onClick={() => move(-1)} disabled={index === 0} aria-label={copy.previous}>‹</button>
      <input type="range" min="0" max={frames.length - 1} value={index} onChange={event => setIndex(Number(event.target.value))} style={{ width: '100%', accentColor: '#7c3aed' }} />
      <button type="button" style={control} onClick={() => move(1)} disabled={index === frames.length - 1} aria-label={copy.next}>›</button>
    </div>
    <small style={{ display: 'block', padding: '3px 12px 11px', color: '#94a3b8', textAlign: 'center' }}>{copy.scroll}</small>
  </div>
}

export default function GefaessdissektionPage() {
  const { lang } = useLanguage()
  const c = value => localize(value, lang)
  const copy = UI[lang] || UI.de
  const rtl = lang === 'fa'
  const [active, setActive] = useState(DISSECTION_LESSON.sections[0].id)
  const [preview, setPreview] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('gefaessdissektion-hirn')
  const path = '/gehirn/vaskulaer/gefaessdissektion'
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const ids = useMemo(() => DISSECTION_LESSON.sections.map(section => section.id), [])

  useEffect(() => {
    const observers = ids.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(id), { rootMargin: '-18% 0px -72% 0px', threshold: .01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [ids])

  useEffect(() => {
    if (!preview) return
    const old = document.body.style.overflow
    const handleKey = event => {
      if (event.key === 'Escape') setPreview(null)
      if (!preview.frames?.length) return
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) movePreview(1)
      if (['ArrowLeft', 'ArrowUp'].includes(event.key)) movePreview(-1)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', handleKey) }
  }, [preview])

  const movePreview = delta => setPreview(value => {
    if (!value?.frames?.length) return value
    const index = Math.min(value.frames.length - 1, Math.max(0, value.index + delta))
    return { ...value, index, src: value.frames[index] }
  })
  const rows = data => data.map(row => row.map(c))
  const cases = [
    { frames: CASE_28441, initial: 4, url: 'https://radiopaedia.org/cases/28441', credit: 'Case courtesy of Ian Bickle, Radiopaedia.org · rID-28441 · CC BY-NC-SA 3.0', meta: c({ de: 'Sichelförmig T1-hyperintenses Wandhämatom der rechten ACI auf T1 fat-sat (Crescent sign) mit korrespondierender Konturunregelmäßigkeit in der MRA.', en: 'Crescentic T1-hyperintense mural haematoma of the right ICA on T1 fat-sat (crescent sign), with corresponding contour irregularity on MRA.', fa: 'mural hematoma هلالی و T1-hyperintense در ICA راست روی T1 fat-sat (Crescent sign) همراه با نامنظمی متناظر در MRA.' }) },
    { frames: CASE_58286, initial: 10, url: 'https://radiopaedia.org/cases/58286', credit: 'Case courtesy of Heather Pascoe, Radiopaedia.org · rID-58286 · CC BY-NC-SA 3.0', meta: c({ de: 'Rechtsseitige ACI-Dissektion unterhalb der Schädelbasis mit medial projizierendem Pseudoaneurysma bis 1,2 cm; Wandhämatom bis in den Karotiskanal und multiple akute rechtshemisphärische Infarkte.', en: 'Right ICA dissection below the skull base with a medially projecting pseudoaneurysm up to 1.2 cm; mural haematoma extends into the carotid canal with multiple acute right hemispheric infarcts.', fa: 'ICA dissection راست زیر قاعده جمجمه با pseudoaneurysm مدیال تا ۱٫۲ سانتی‌متر؛ mural hematoma تا carotid canal ادامه دارد و چند انفارکت حاد در همی‌سفر راست دیده می‌شود.' }) },
  ]

  return <>
    <Navbar />
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link><span>›</span><span>{c(DISSECTION_LESSON.breadcrumb)}</span></div>
        <div className={styles.hero}>
          <div className={styles.heroText}><span className={styles.sourceBadge}>Dr. Zia</span><h1>{c(DISSECTION_LESSON.title)}</h1><p>{c(DISSECTION_LESSON.subtitle)}</p>
            <div className={styles.actions}><Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=gefaessdissektion-hirn&from=${encodeURIComponent(withLang(path))}`)}>🎯 MCQ</Link><Link className={styles.actionBtn} href={withLang(`/flashcards/gefaessdissektion-hirn?from=${encodeURIComponent(withLang(path))}`)}>🧠 {c({ de: 'Flashcards', en: 'Flashcards', fa: 'فلش‌کارت' })}</Link></div>
          </div>
          <div className={styles.heroStats}>{DISSECTION_LESSON.heroCards.map(card => <div className={styles.heroStat} key={card.value}><strong>{card.value}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div>
        </div>
      </header>
      <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}><div className={styles.sideTitle}>{c(DISSECTION_LESSON.toc)}</div>{DISSECTION_LESSON.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}><span>{section.icon}</span><strong>{c(section.label)}</strong></button>)}</aside>
        <div className={styles.main}>
          <Section id="grundlagen" title={c(DISSECTION_LESSON.basics.title)} lead={c(DISSECTION_LESSON.basics.lead)}><Cards items={DISSECTION_LESSON.basics.items} lang={lang} /><Callout cave label={copy.cave}>{c(DISSECTION_LESSON.basics.cave)}</Callout></Section>
          <Section id="patho" title={c(DISSECTION_LESSON.patho.title)} lead={c(DISSECTION_LESSON.patho.lead)}><LearningFigure src="/dissection/dissection-pathway.svg" alt={c(DISSECTION_LESSON.patho.imageAlt)} onZoom={setPreview} copy={copy} /><Callout label={copy.key}>{c(DISSECTION_LESSON.patho.key)}</Callout></Section>
          <Section id="cta" title={c(DISSECTION_LESSON.cta.title)} lead={c(DISSECTION_LESSON.cta.lead)}><Table headers={DISSECTION_LESSON.cta.headers.map(c)} rows={rows(DISSECTION_LESSON.cta.rows)} /><LearningFigure src="/dissection/imaging-signs.svg" alt={c(DISSECTION_LESSON.cta.imageAlt)} onZoom={setPreview} copy={copy} /><Callout cave label={copy.cave}>{c(DISSECTION_LESSON.cta.cave)}</Callout></Section>
          <Section id="mrt" title={c(DISSECTION_LESSON.mri.title)} lead={c(DISSECTION_LESSON.mri.lead)}><Table headers={DISSECTION_LESSON.mri.headers.map(c)} rows={rows(DISSECTION_LESSON.mri.rows)} /><Callout cave label={copy.cave}>{c(DISSECTION_LESSON.mri.cave)}</Callout></Section>
          <Section id="komplikationen" title={c(DISSECTION_LESSON.complications.title)} lead={c(DISSECTION_LESSON.complications.lead)}><Cards items={DISSECTION_LESSON.complications.items} lang={lang} /><Callout cave label={copy.cave}>{c(DISSECTION_LESSON.complications.cave)}</Callout></Section>
          <Section id="befund" title={c(DISSECTION_LESSON.report.title)} lead={c(DISSECTION_LESSON.report.lead)}><Cards items={DISSECTION_LESSON.report.items} lang={lang} /></Section>
          <Section id="fallbeispiele" title={c(DISSECTION_LESSON.cases.title)} lead={c(DISSECTION_LESSON.cases.lead)}><div className={styles.caseGrid}>{cases.map((item, index) => <article className={styles.caseCardLink} key={item.url}><CaseViewer frames={item.frames} initial={item.initial} alt={`${c(DISSECTION_LESSON.cases.title)} ${index + 1}`} copy={copy} onZoom={setPreview} /><div className={styles.caseBody}><div className={styles.caseLabelRow}><span className={styles.caseLabel}>{index ? 'CTA' : 'MRI'}</span></div><h3>{c({ de: 'Fallbeispiel', en: 'Case', fa: 'نمونه کیس' })}</h3><p>{item.meta}</p><small>{item.credit}</small><a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{c(DISSECTION_LESSON.cases.open)} ↗</a></div></article>)}</div></Section>
          <Section id="takehome" title={c(DISSECTION_LESSON.takehome.title)} lead={c(DISSECTION_LESSON.takehome.lead)}><div className={styles.takeHomeGrid}>{DISSECTION_LESSON.takehome.items.map((item, index) => <div className={styles.takeHomeItem} key={c(item.title)}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div></Section>
          <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
        </div>
      </div>
      {preview && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={copy.zoom} onClick={() => setPreview(null)}><div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()} onWheel={event => { if (!preview.frames?.length) return; event.preventDefault(); movePreview(event.deltaY > 0 ? 1 : -1) }}><button type="button" className={styles.strokeImageModalClose} onClick={() => setPreview(null)} aria-label={copy.close}>×</button><img src={preview.src} alt={preview.alt} />{preview.frames?.length > 1 && <><div style={{ width: 'min(720px,92%)', display: 'grid', gridTemplateColumns: '42px minmax(0,1fr) 42px', gap: 12, alignItems: 'center', marginTop: 12 }}><button type="button" onClick={() => movePreview(-1)} disabled={preview.index === 0}>‹</button><input type="range" min="0" max={preview.frames.length - 1} value={preview.index} onChange={event => { const index = Number(event.target.value); setPreview(value => ({ ...value, index, src: value.frames[index] })) }} style={{ width: '100%', accentColor: '#8b5cf6' }} /><button type="button" onClick={() => movePreview(1)} disabled={preview.index === preview.frames.length - 1}>›</button></div><small style={{ color: '#cbd5e1', marginTop: 7 }}>{copy.image(preview.index + 1, preview.frames.length)} · {copy.scroll}</small></>}</div></div>}
    </main>
    <Footer />
  </>
}
