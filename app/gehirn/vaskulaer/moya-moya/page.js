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
import { MOYAMOYA_LESSON } from '@/data/moyamoya'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value

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
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={`${r}-${c}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Cards({ items, lang }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={L(item.title, lang)}>
          {item.icon && <span style={{ fontSize: 20, marginBottom: 4, display: 'block' }}>{item.icon}</span>}
          <h3>{L(item.title, lang)}</h3>
          <p>{L(item.text, lang)}</p>
        </div>
      ))}
    </div>
  )
}

function Callout({ label, cave = false, children }) {
  return (
    <div className={`${styles.callout} ${cave ? styles.cave : ''}`}>
      <strong>{cave ? '⚠️' : '💡'} {label}</strong>
      <p>{children}</p>
    </div>
  )
}

function ReadButton({ isRead, toggleRead, authError, copy }) {
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}>
        <span className={styles.readCheck}>{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Figure({ src, alt, onZoom, copy }) {
  return (
    <figure style={{ margin: '22px 0 0', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 16, background: '#0f172a' }}>
      <button type="button" className={styles.strokeZoomButton} onClick={() => onZoom({ src, alt })} aria-label={copy.zoom}>
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </button>
    </figure>
  )
}

function CaseViewer({ frames, initial = 0, alt, copy, onZoom }) {
  const [index, setIndex] = useState(initial)
  const move = delta => setIndex(v => Math.min(frames.length - 1, Math.max(0, v + delta)))
  const btnStyle = { width: 38, height: 34, border: '1px solid rgba(255,255,255,.22)', borderRadius: 9, color: '#fff', background: '#172033', cursor: 'pointer', fontSize: 24 }
  return (
    <div
      tabIndex={0}
      onWheel={e => { e.preventDefault(); move(e.deltaY > 0 ? 1 : -1) }}
      onKeyDown={e => { if (['ArrowRight', 'ArrowDown'].includes(e.key)) move(1); if (['ArrowLeft', 'ArrowUp'].includes(e.key)) move(-1) }}
      style={{ background: '#020617', outline: 'none' }}
    >
      <div className={styles.caseImage}>
        <button type="button" className={styles.strokeCaseZoom} onClick={() => onZoom({ src: frames[index], alt, frames, index })} aria-label={copy.zoom}>
          <Image src={frames[index]} alt={alt} width={610} height={610} className={styles.caseImageAsset} />
        </button>
        <span style={{ position: 'absolute', right: 10, bottom: 10, padding: '5px 8px', borderRadius: 999, color: '#fff', background: 'rgba(2,6,23,.78)', fontSize: 11, fontWeight: 800 }}>
          {copy.image(index + 1, frames.length)}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '38px minmax(0,1fr) 38px', gap: 10, alignItems: 'center', padding: '10px 12px 4px' }}>
        <button type="button" style={btnStyle} onClick={() => move(-1)} disabled={!index} aria-label={copy.previous}>‹</button>
        <input type="range" min="0" max={frames.length - 1} value={index} onChange={e => setIndex(Number(e.target.value))} style={{ width: '100%', accentColor: '#7c3aed' }} />
        <button type="button" style={btnStyle} onClick={() => move(1)} disabled={index === frames.length - 1} aria-label={copy.next}>›</button>
      </div>
      <small style={{ display: 'block', padding: '3px 12px 11px', color: '#94a3b8', textAlign: 'center' }}>{copy.scroll}</small>
    </div>
  )
}

// ── Case image arrays ────────────────────────────────────────────────────────
// Case 1: Pediatric Moya-Moya – MRI (T2 flow voids + Gd-FLAIR ivy sign + TOF-MRA)
// → Radiopaedia rID: 56820 or similar — place images in public/moyamoya/case-1/
const CASE1_FRAMES = Array.from({ length: 5 }, (_, i) => `/moyamoya/case-1/${String(i + 1).padStart(2, '0')}.jpg`)

// Case 2: Adult Moya-Moya – DSA "puff of smoke" + MRA
// → Radiopaedia rID: 13285 or similar — place images in public/moyamoya/case-2/
const CASE2_FRAMES = Array.from({ length: 5 }, (_, i) => `/moyamoya/case-2/${String(i + 1).padStart(2, '0')}.jpg`)

export default function MoyaMoyaPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = MOYAMOYA_LESSON.sections
  const [active, setActive] = useState(sections[0].id)
  const [preview, setPreview] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('moya-moya')
  const path = '/gehirn/vaskulaer/moya-moya'
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const ids = useMemo(() => sections.map(s => s.id), [sections])

  useEffect(() => {
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(id), { rootMargin: '-18% 0px -72% 0px', threshold: .01 })
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [ids])

  useEffect(() => {
    if (!preview) return
    const old = document.body.style.overflow
    const handleKey = e => {
      if (e.key === 'Escape') { setPreview(null); return }
      if (!preview.frames?.length) return
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) setPreview(v => { const i = Math.min(v.frames.length - 1, v.index + 1); return { ...v, index: i, src: v.frames[i] } })
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) setPreview(v => { const i = Math.max(0, v.index - 1); return { ...v, index: i, src: v.frames[i] } })
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', handleKey) }
  }, [preview])

  const movePreview = delta => setPreview(v => {
    if (!v?.frames?.length) return v
    const i = Math.min(v.frames.length - 1, Math.max(0, v.index + delta))
    return { ...v, index: i, src: v.frames[i] }
  })

  const rows = value => value.map(row => row.map(c))

  const cases = [
    {
      frames: CASE1_FRAMES,
      initial: 1,
      url: 'https://radiopaedia.org/cases/56820',
      credit: 'Radiopaedia.org · rID-56820 · CC BY-NC-SA 3.0',
      label: 'MRI',
      meta: c({ de: 'Pädiatrische Moya-Moya: T2 Flow Voids in den Basalganglien (kollaterale Moya-Moya-Gefäße), Ivy Sign auf Gd-FLAIR entlang der Sulci, TOF-MRA mit Stenose der supraklinoidalen ICA.', en: 'Paediatric Moyamoya: T2 flow voids in basal ganglia (collateral Moya-Moya vessels), ivy sign on Gd-FLAIR along sulci, TOF-MRA with stenosis of supraclinoid ICA.', fa: 'Moya-Moya در کودک: Flow voids در T2 در بازال گانگلیا (عروق کولاترال Moya-Moya)، Ivy sign در Gd-FLAIR در امتداد sulci، TOF-MRA با تنگی ICA سوپراکلینوئید.' }),
    },
    {
      frames: CASE2_FRAMES,
      initial: 2,
      url: 'https://radiopaedia.org/cases/13285',
      credit: 'Radiopaedia.org · rID-13285 · CC BY-NC-SA 3.0',
      label: 'DSA / MRA',
      meta: c({ de: 'Erwachsene Moya-Moya: DSA zeigt das charakteristische „Puff of smoke"-Bild mit kollateralen Basalgangliengefäßen. Stenose der supraklinoidalen ICA beidseits. MRA: fehlende ACA/MCA-Signale.', en: 'Adult Moyamoya: DSA shows the characteristic "puff of smoke" appearance with collateral basal ganglia vessels. Bilateral supraclinoid ICA stenosis. MRA: absent ACA/MCA signals.', fa: 'Moya-Moya در بزرگسال: DSA تصویر مشخصه «پف دود» با عروق کولاترال بازال گانگلیا را نشان می‌دهد. تنگی دوطرفه ICA سوپراکلینوئید. MRA: غیاب سیگنال ACA/MCA.' }),
    },
  ]

  return <>
    <Navbar />
    <InProgressBanner lang={lang} />
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(MOYAMOYA_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{MOYAMOYA_LESSON.sourceLabel}</span>
            <h1>{c(MOYAMOYA_LESSON.title)}</h1>
            <p>{c(MOYAMOYA_LESSON.subtitle)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=13&themen=moya-moya&from=${encodeURIComponent(withLang(path))}`)}>
                🎯 MCQ
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/moya-moya?from=${encodeURIComponent(withLang(path))}`)}>
                🧠 {c({ de: 'Flashcards', en: 'Flashcards', fa: 'فلش‌کارت' })}
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {MOYAMOYA_LESSON.heroCards.map(card => (
              <div className={styles.heroStat} key={c(card.value)}>
                <strong>{c(card.value)}</strong>
                <span>{c(card.label)}</span>
                <small>{c(card.text)}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.readBar}>
        <ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} />
      </div>

      <div className={styles.layout}>
        {/* ── Sidebar TOC ──────────────────────────────────────────────── */}
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{c(MOYAMOYA_LESSON.toc)}</div>
          {sections.map(s => (
            <button
              type="button"
              key={s.id}
              className={`${styles.sideItem} ${active === s.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>{s.icon}</span>
              <strong>{c(s.label)}</strong>
            </button>
          ))}
        </aside>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className={styles.main}>

          {/* 1 – Grundlagen */}
          <Section id="grundlagen" title={c(MOYAMOYA_LESSON.grundlagen.title)} lead={c(MOYAMOYA_LESSON.grundlagen.lead)}>
            <Cards items={MOYAMOYA_LESSON.grundlagen.items} lang={lang} />
          </Section>

          {/* 2 – Pathophysiologie */}
          <Section id="pathophysio" title={c(MOYAMOYA_LESSON.pathophysio.title)} lead={c(MOYAMOYA_LESSON.pathophysio.lead)}>
            <Table headers={MOYAMOYA_LESSON.pathophysio.headers.map(c)} rows={rows(MOYAMOYA_LESSON.pathophysio.rows)} />
            <Figure src="/moyamoya/suzuki-grading.svg" alt={c(MOYAMOYA_LESSON.pathophysio.imageAlt)} onZoom={setPreview} copy={copy} />
          </Section>

          {/* 3 – Klinik */}
          <Section id="klinik" title={c(MOYAMOYA_LESSON.klinik.title)} lead={c(MOYAMOYA_LESSON.klinik.lead)}>
            <Table headers={MOYAMOYA_LESSON.klinik.headers.map(c)} rows={rows(MOYAMOYA_LESSON.klinik.rows)} />
            <h3 style={{ marginTop: 24, marginBottom: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{c(MOYAMOYA_LESSON.klinik.associationsItems?.[0] ? { de: 'Assoziierte Erkrankungen (Moya-Moya-Syndrom)', en: 'Associated conditions (Moyamoya syndrome)', fa: 'بیماری‌های مرتبط (سندرم Moya-Moya)' } : {})}</h3>
            <Cards items={MOYAMOYA_LESSON.klinik.associationsItems} lang={lang} />
            <Callout label={c(MOYAMOYA_LESSON.keyLabel)}>{c(MOYAMOYA_LESSON.klinik.key)}</Callout>
          </Section>

          {/* 4 – CT & MRT */}
          <Section id="bildgebung" title={c(MOYAMOYA_LESSON.bildgebung.title)} lead={c(MOYAMOYA_LESSON.bildgebung.lead)}>
            <h3 style={{ marginTop: 4, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CT</h3>
            <Cards items={MOYAMOYA_LESSON.bildgebung.ctItems} lang={lang} />
            <h3 style={{ marginTop: 22, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MRT / MRI</h3>
            <Table headers={MOYAMOYA_LESSON.bildgebung.mriHeaders.map(c)} rows={rows(MOYAMOYA_LESSON.bildgebung.mriRows)} />
            <Callout label={c({ de: 'Ivy Sign', en: 'Ivy sign', fa: 'Ivy Sign' })}>{c(MOYAMOYA_LESSON.bildgebung.ivyKey)}</Callout>
          </Section>

          {/* 5 – MRA, CTA & DSA */}
          <Section id="dsa" title={c(MOYAMOYA_LESSON.dsa.title)} lead={c(MOYAMOYA_LESSON.dsa.lead)}>
            <Table headers={MOYAMOYA_LESSON.dsa.modesHeaders.map(c)} rows={rows(MOYAMOYA_LESSON.dsa.modesRows)} />
            <h3 style={{ marginTop: 24, marginBottom: 10, fontSize: '0.95rem', color: 'var(--text)', fontWeight: 700 }}>{c(MOYAMOYA_LESSON.dsa.suzukiTitle)}</h3>
            <Table headers={MOYAMOYA_LESSON.dsa.suzukiHeaders.map(c)} rows={rows(MOYAMOYA_LESSON.dsa.suzukiRows)} />
            <Figure src="/moyamoya/suzuki-grading.svg" alt={c(MOYAMOYA_LESSON.dsa.suzukiImageAlt)} onZoom={setPreview} copy={copy} />
            <Callout label={c(MOYAMOYA_LESSON.keyLabel)}>{c(MOYAMOYA_LESSON.dsa.key)}</Callout>
          </Section>

          {/* 6 – Therapie */}
          <Section id="therapie" title={c(MOYAMOYA_LESSON.therapie.title)} lead={c(MOYAMOYA_LESSON.therapie.lead)}>
            <Cards items={MOYAMOYA_LESSON.therapie.items} lang={lang} />
            <Callout cave label={c(MOYAMOYA_LESSON.caveLabel)}>{c(MOYAMOYA_LESSON.therapie.cave)}</Callout>
          </Section>

          {/* 7 – Fallbeispiele */}
          <Section id="fallbeispiele" title={c(MOYAMOYA_LESSON.cases.title)} lead={c(MOYAMOYA_LESSON.cases.lead)}>
            <div className={styles.caseGrid}>
              {cases.map((item, idx) => (
                <article className={styles.caseCardLink} key={item.url}>
                  <CaseViewer
                    frames={item.frames}
                    initial={item.initial}
                    alt={`${c(MOYAMOYA_LESSON.cases.title)} ${idx + 1}`}
                    copy={copy}
                    onZoom={setPreview}
                  />
                  <div className={styles.caseBody}>
                    <div className={styles.caseLabelRow}><span className={styles.caseLabel}>{item.label}</span></div>
                    <h3>{c({ de: 'Fallbeispiel', en: 'Case', fa: 'نمونه کیس' })} {idx + 1}</h3>
                    <p>{item.meta}</p>
                    <small>{item.credit}</small>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>
                      {c(MOYAMOYA_LESSON.cases.open)} ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          {/* 8 – Take-home */}
          <Section id="takehome" title={c(MOYAMOYA_LESSON.takehome.title)} lead={c(MOYAMOYA_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {MOYAMOYA_LESSON.takehome.items.map((item, i) => (
                <div className={styles.takeHomeItem} key={c(item.title)}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{c(item.title)}</h3>
                    <p>{c(item.text)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}>
            <ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} />
          </div>
        </div>
      </div>

      {/* ── Image Modal ──────────────────────────────────────────────────── */}
      {preview && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={copy.zoom} onClick={() => setPreview(null)}>
          <div
            className={styles.strokeImageModalContent}
            onClick={e => e.stopPropagation()}
            onWheel={e => { if (!preview.frames?.length) return; e.preventDefault(); movePreview(e.deltaY > 0 ? 1 : -1) }}
          >
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setPreview(null)} aria-label={copy.close}>×</button>
            <img src={preview.src} alt={preview.alt} />
            {preview.frames?.length > 1 && (
              <div style={{ width: 'min(720px, 92%)', display: 'grid', gridTemplateColumns: '42px minmax(0,1fr) 42px', gap: 12, alignItems: 'center', marginTop: 12 }}>
                <button type="button" onClick={() => movePreview(-1)} disabled={preview.index === 0} aria-label={copy.previous}>‹</button>
                <input
                  type="range" min="0" max={preview.frames.length - 1} value={preview.index}
                  onChange={e => { const i = Number(e.target.value); setPreview(v => ({ ...v, index: i, src: v.frames[i] })) }}
                  aria-label={copy.image(preview.index + 1, preview.frames.length)}
                  style={{ width: '100%', accentColor: '#7c3aed' }}
                />
                <button type="button" onClick={() => movePreview(1)} disabled={preview.index === preview.frames.length - 1} aria-label={copy.next}>›</button>
              </div>
            )}
            {preview.frames?.length > 1 && (
              <small style={{ color: '#cbd5e1', marginTop: 7 }}>
                {copy.image(preview.index + 1, preview.frames.length)} · {copy.scroll}
              </small>
            )}
          </div>
        </div>
      )}
    </main>
    <Footer />
  </>
}
