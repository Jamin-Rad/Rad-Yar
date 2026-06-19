'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { SDH_LESSON } from '@/data/sdh'
import InProgressBanner from '@/components/InProgressBanner'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const ACUTE_FRAMES = ['01', '02', '04', '05', '07', '09', '10', '12', '13', '14', '15', '16'].map(number => `/subdural/case-acute/${number}.jpg`)
const CHRONIC_FRAMES = Array.from({ length: 26 }, (_, i) => `/subdural/case-acute-on-chronic/${String(i + 1).padStart(2, '0')}.jpg`)

const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', previous: 'Vorheriges Bild', next: 'Nächstes Bild', image: (a, b) => `Bild ${a} von ${b}`, scroll: 'Im Bild scrollen oder Slider/Pfeile verwenden.', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', previous: 'Previous image', next: 'Next image', image: (a, b) => `Image ${a} of ${b}`, scroll: 'Scroll over the image or use the slider/arrows.', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', previous: 'تصویر قبلی', next: 'تصویر بعدی', image: (a, b) => `تصویر ${a} از ${b}`, scroll: 'روی تصویر اسکرول کنید یا از slider و فلش‌ها استفاده کنید.', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.' },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <h2>{title}</h2><span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function Table({ headers, rows }) {
  return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={`${r}-${c}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function Cards({ items, lang }) {
  return <div className={styles.cardsGrid}>{items.map(item => <div className={styles.infoCard} key={L(item.title, lang)}><h3>{L(item.title, lang)}</h3><p>{L(item.text, lang)}</p></div>)}</div>
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

function Figure({ src, alt, onZoom, copy }) {
  return <figure style={{ margin: '22px 0 0', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 22, background: '#020617' }}>
    <button type="button" className={styles.strokeZoomButton} onClick={() => onZoom({ src, alt })} aria-label={copy.zoom}>
      <Image src={src} alt={alt} width={1536} height={1024} style={{ display: 'block', width: '100%', height: 'auto' }} />
    </button>
  </figure>
}

function CaseViewer({ frames, initial = 0, alt, copy, onZoom }) {
  const [index, setIndex] = useState(initial)
  const move = delta => setIndex(value => Math.min(frames.length - 1, Math.max(0, value + delta)))
  const controlStyle = { width: 38, height: 34, border: '1px solid rgba(255,255,255,.22)', borderRadius: 9, color: '#fff', background: '#172033', cursor: 'pointer', fontSize: 24 }
  return <div tabIndex={0} onWheel={e => { e.preventDefault(); move(e.deltaY > 0 ? 1 : -1) }} onKeyDown={e => { if (['ArrowRight', 'ArrowDown'].includes(e.key)) move(1); if (['ArrowLeft', 'ArrowUp'].includes(e.key)) move(-1) }} style={{ background: '#020617', outline: 'none' }}>
    <div className={styles.caseImage}>
      <button type="button" className={styles.strokeCaseZoom} onClick={() => onZoom({ src: frames[index], alt, frames, index })} aria-label={copy.zoom}>
        <Image src={frames[index]} alt={alt} width={610} height={610} className={styles.caseImageAsset} />
      </button>
      <span style={{ position: 'absolute', right: 10, bottom: 10, padding: '5px 8px', borderRadius: 999, color: '#fff', background: 'rgba(2,6,23,.78)', fontSize: 11, fontWeight: 800 }}>{copy.image(index + 1, frames.length)}</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '38px minmax(0,1fr) 38px', gap: 10, alignItems: 'center', padding: '10px 12px 4px' }}>
      <button type="button" style={controlStyle} onClick={() => move(-1)} disabled={!index} aria-label={copy.previous}>‹</button>
      <input type="range" min="0" max={frames.length - 1} value={index} onChange={e => setIndex(Number(e.target.value))} style={{ width: '100%', accentColor: '#7c3aed' }} />
      <button type="button" style={controlStyle} onClick={() => move(1)} disabled={index === frames.length - 1} aria-label={copy.next}>›</button>
    </div>
    <small style={{ display: 'block', padding: '3px 12px 11px', color: '#94a3b8', textAlign: 'center' }}>{copy.scroll}</small>
  </div>
}

export default function SubduralhaematomPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = SDH_LESSON.sections
  const [active, setActive] = useState(sections[0].id)
  const [preview, setPreview] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('subdurale-blutung')
  const path = '/gehirn/vaskulaer/subduralhaematom'
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const ids = useMemo(() => sections.map(s => s.id), [sections])

  useEffect(() => {
    const observers = ids.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(id), { rootMargin: '-18% 0px -72% 0px', threshold: .01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [ids])

  useEffect(() => {
    if (!preview) return
    const old = document.body.style.overflow
    const handleKey = e => {
      if (e.key === 'Escape') setPreview(null)
      if (!preview.frames?.length) return
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        setPreview(value => {
          const index = Math.min(value.frames.length - 1, value.index + 1)
          return { ...value, index, src: value.frames[index] }
        })
      }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        setPreview(value => {
          const index = Math.max(0, value.index - 1)
          return { ...value, index, src: value.frames[index] }
        })
      }
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

  const rows = value => value.map(row => row.map(c))
  const cases = [
    { frames: ACUTE_FRAMES, initial: 5, url: 'https://radiopaedia.org/cases/45541', credit: 'Case courtesy of Ian Bickle, Radiopaedia.org · rID-45541 · CC BY-NC-SA 3.0', meta: c({ de: 'Dünnes akutes rechtsseitiges SDH mit Sulcuseffacement ohne Mittellinienverlagerung; zusätzliche parafalcine und tentorielle Blutauflagerung.', en: 'Thin acute right SDH with sulcal effacement but no midline shift; additional parafalcine and tentorial blood.', fa: 'SDH حاد نازک در سمت راست با محو sulci بدون midline shift؛ خون اضافی parafalcine و tentorial.' }) },
    { frames: CHRONIC_FRAMES, initial: 16, url: 'https://radiopaedia.org/cases/31461', credit: 'Case courtesy of Abdel-Rahman Abdel-Halim, Radiopaedia.org · rID-31461 · CC BY-NC-SA 3.0', meta: c({ de: 'Großes linksseitiges SDH mit akuten und chronischen Anteilen, 16 mm Dicke, Sulcuseffacement, Ventrikelkompression und kontralateralem Shift.', en: 'Large left SDH with acute and chronic components, 16 mm thick, with sulcal effacement, ventricular compression and contralateral shift.', fa: 'SDH بزرگ سمت چپ با اجزای حاد و مزمن، ضخامت ۱۶ میلی‌متر، محو sulci، فشار بطن و shift به سمت مقابل.' }) },
  ]

  return <>
    <Navbar />
    <InProgressBanner lang={lang} />
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link><span>›</span><span>{c(SDH_LESSON.breadcrumb)}</span></div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>Dr. Zia</span>
            <h1>{c(SDH_LESSON.title)}</h1><p>{c(SDH_LESSON.subtitle)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=subdurale-blutung&from=${encodeURIComponent(withLang(path))}`)}>🎯 MCQ</Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/subdurale-blutung?from=${encodeURIComponent(withLang(path))}`)}>🧠 {c({ de: 'Flashcards', en: 'Flashcards', fa: 'فلش‌کارت' })}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>{SDH_LESSON.heroCards.map(card => <div className={styles.heroStat} key={card.value}><strong>{card.value}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div>
        </div>
      </header>
      <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}><div className={styles.sideTitle}>{c(SDH_LESSON.toc)}</div>{sections.map(s => <button type="button" key={s.id} className={`${styles.sideItem} ${active === s.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}><span>{s.icon}</span><strong>{c(s.label)}</strong></button>)}</aside>
        <div className={styles.main}>
          <Section id="grundlagen" title={c(SDH_LESSON.basics.title)} lead={c(SDH_LESSON.basics.lead)}><Cards items={SDH_LESSON.basics.items} lang={lang} /><Callout cave label="CAVE">{c(SDH_LESSON.basics.cave)}</Callout></Section>
          <Section id="ct" title={c(SDH_LESSON.ct.title)} lead={c(SDH_LESSON.ct.lead)}><Table headers={SDH_LESSON.ct.headers.map(c)} rows={rows(SDH_LESSON.ct.rows)} /><Callout label={c({ de: 'Merke', en: 'Key point', fa: 'نکته مهم' })}>{c(SDH_LESSON.ct.key)}</Callout></Section>
          <Section id="zeit" title={c(SDH_LESSON.timeline.title)} lead={c(SDH_LESSON.timeline.lead)}><Table headers={SDH_LESSON.timeline.headers.map(c)} rows={rows(SDH_LESSON.timeline.rows)} /><Figure src="/subdural/sdh-density-timeline.png" alt={c(SDH_LESSON.timeline.imageAlt)} onZoom={setPreview} copy={copy} /><Callout cave label="CAVE">{c(SDH_LESSON.timeline.cave)}</Callout></Section>
          <Section id="dd" title={c(SDH_LESSON.dd.title)} lead={c(SDH_LESSON.dd.lead)}><Table headers={SDH_LESSON.dd.headers.map(c)} rows={rows(SDH_LESSON.dd.rows)} /></Section>
          <Section id="befund" title={c(SDH_LESSON.report.title)} lead={c(SDH_LESSON.report.lead)}><Cards items={SDH_LESSON.report.items} lang={lang} /><Callout cave label="CAVE">{c(SDH_LESSON.report.cave)}</Callout></Section>
          <Section id="fallbeispiele" title={c(SDH_LESSON.cases.title)} lead={c(SDH_LESSON.cases.lead)}>
            <div className={styles.caseGrid}>{cases.map((item, index) => <article className={styles.caseCardLink} key={item.url}>
              <CaseViewer frames={item.frames} initial={item.initial} alt={`${c(SDH_LESSON.cases.title)} ${index + 1}`} copy={copy} onZoom={setPreview} />
              <div className={styles.caseBody}><div className={styles.caseLabelRow}><span className={styles.caseLabel}>CT</span></div><h3>{c({ de: 'Fallbeispiel', en: 'Case', fa: 'نمونه کیس' })}</h3><p>{item.meta}</p><small>{item.credit}</small><a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{c(SDH_LESSON.cases.open)} ↗</a></div>
            </article>)}</div>
          </Section>
          <Section id="takehome" title={c(SDH_LESSON.takehome.title)} lead={c(SDH_LESSON.takehome.lead)}><div className={styles.takeHomeGrid}>{SDH_LESSON.takehome.items.map((item, i) => <div className={styles.takeHomeItem} key={c(item.title)}><span>{String(i + 1).padStart(2, '0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div></Section>
          <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
        </div>
      </div>
      {preview && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={copy.zoom} onClick={() => setPreview(null)}>
        <div
          className={styles.strokeImageModalContent}
          onClick={e => e.stopPropagation()}
          onWheel={e => {
            if (!preview.frames?.length) return
            e.preventDefault()
            movePreview(e.deltaY > 0 ? 1 : -1)
          }}
        >
          <button type="button" className={styles.strokeImageModalClose} onClick={() => setPreview(null)} aria-label={copy.close}>×</button>
          <img src={preview.src} alt={preview.alt} />
          {preview.frames?.length > 1 && <div style={{ width: 'min(720px, 92%)', display: 'grid', gridTemplateColumns: '42px minmax(0, 1fr) 42px', gap: 12, alignItems: 'center', marginTop: 12 }}>
            <button type="button" onClick={() => movePreview(-1)} disabled={preview.index === 0} aria-label={copy.previous}>‹</button>
            <input
              type="range"
              min="0"
              max={preview.frames.length - 1}
              value={preview.index}
              onChange={e => {
                const index = Number(e.target.value)
                setPreview(value => ({ ...value, index, src: value.frames[index] }))
              }}
              aria-label={copy.image(preview.index + 1, preview.frames.length)}
              style={{ width: '100%', accentColor: '#8b5cf6' }}
            />
            <button type="button" onClick={() => movePreview(1)} disabled={preview.index === preview.frames.length - 1} aria-label={copy.next}>›</button>
          </div>}
          {preview.frames?.length > 1 && <small style={{ color: '#cbd5e1', marginTop: 7 }}>{copy.image(preview.index + 1, preview.frames.length)} · {copy.scroll}</small>}
        </div>
      </div>}
    </main>
    <Footer />
  </>
}
