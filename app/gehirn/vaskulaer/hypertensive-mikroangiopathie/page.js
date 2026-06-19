'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { HMA_LESSON } from '@/data/hypertensive-mikroangiopathie'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value

const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.' },
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

function Figure({ src, alt, caption, onZoom }) {
  return (
    <figure style={{ margin: '22px 0 0', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 16, background: '#020617' }}>
      <button
        type="button"
        style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'zoom-in' }}
        onClick={() => onZoom?.({ src, alt })}
        aria-label={alt}
      >
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </button>
      {caption && (
        <figcaption style={{ padding: '10px 16px', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function FigureRow({ images }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: 12, marginTop: 22 }}>
      {images.map(img => (
        <Figure key={img.src} src={img.src} alt={img.alt} caption={img.caption} onZoom={img.onZoom} />
      ))}
    </div>
  )
}

export default function HypertensiveMikroangiopathiePage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = HMA_LESSON.sections
  const path = '/gehirn/vaskulaer/hypertensive-mikroangiopathie'

  const withLang = href => lang === 'de' ? href : `/${lang}${href}`

  const { isRead, toggleRead, authError } = useLessonReadStatus('hypertensive-mikroangiopathie')
  const [active, setActive] = useState('')
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const observers = sections.map(s => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setActive(s.id) }, { rootMargin: '-30% 0px -60% 0px' })
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sections])

  useEffect(() => {
    if (!preview) return
    const handleKey = e => { if (e.key === 'Escape') setPreview(null) }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', handleKey) }
  }, [preview])

  const rows = value => value.map(row => row.map(c))

  return (
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(HMA_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{HMA_LESSON.sourceLabel}</span>
            <h1>{c(HMA_LESSON.title)}</h1>
            <p>{c(HMA_LESSON.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=hypertensive-mikroangiopathie&from=${encodeURIComponent(withLang(path))}`)}>
                🎯 MCQ
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/hypertensive-mikroangiopathie?from=${encodeURIComponent(withLang(path))}`)}>
                🧠 {c({ de: 'Flashcards', en: 'Flashcards', fa: 'فلش‌کارت' })}
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {HMA_LESSON.heroCards.map(card => (
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
          <div className={styles.sideTitle}>{c(HMA_LESSON.toc)}</div>
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
          <Section id="grundlagen" title={c(HMA_LESSON.grundlagen.title)} lead={c(HMA_LESSON.grundlagen.lead)}>
            <Cards items={HMA_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(HMA_LESSON.keyLabel)}>{c(HMA_LESSON.grundlagen.key)}</Callout>
          </Section>

          {/* 2 – Pathophysiologie */}
          <Section id="pathophysio" title={c(HMA_LESSON.pathophysio.title)} lead={c(HMA_LESSON.pathophysio.lead)}>
            <Table headers={HMA_LESSON.pathophysio.headers.map(c)} rows={rows(HMA_LESSON.pathophysio.rows)} />
            <Callout label={c(HMA_LESSON.keyLabel)}>{c(HMA_LESSON.pathophysio.key)}</Callout>
          </Section>

          {/* 3 – CCT & CTA */}
          <Section id="cct" title={c(HMA_LESSON.cct.title)} lead={c(HMA_LESSON.cct.lead)}>
            <h3 style={{ marginTop: 4, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {c(HMA_LESSON.cct.morphTitle)}
            </h3>
            <Table headers={HMA_LESSON.cct.morphHeaders.map(c)} rows={rows(HMA_LESSON.cct.morphRows)} />

            <h3 style={{ marginTop: 24, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {c(HMA_LESSON.cct.locTitle)}
            </h3>
            <Table headers={HMA_LESSON.cct.locHeaders.map(c)} rows={rows(HMA_LESSON.cct.locRows)} />

            {/* A vs B comparison images from document */}
            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {c(HMA_LESSON.cct.imageAlt)}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <Figure
                  src="/hypertensive-mikroangiopathie/image1.png"
                  alt={c(HMA_LESSON.cct.imageCaptionA)}
                  caption={c(HMA_LESSON.cct.imageCaptionA)}
                  onZoom={setPreview}
                />
                <Figure
                  src="/hypertensive-mikroangiopathie/image2.png"
                  alt={c(HMA_LESSON.cct.imageCaptionB)}
                  caption={c(HMA_LESSON.cct.imageCaptionB)}
                  onZoom={setPreview}
                />
                <Figure
                  src="/hypertensive-mikroangiopathie/image3.png"
                  alt={c(HMA_LESSON.cct.imageAlt)}
                  caption={c({ de: 'Weitere Schicht — typische Befundkonstellation', en: 'Additional slice — typical imaging constellation', fa: 'برش اضافی — آرایش تصویربرداری معمول' })}
                  onZoom={setPreview}
                />
              </div>
            </div>

            <h3 style={{ marginTop: 24, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {c(HMA_LESSON.cct.spotTitle)}
            </h3>
            <Table headers={HMA_LESSON.cct.spotHeaders.map(c)} rows={rows(HMA_LESSON.cct.spotRows)} />
            <Callout label={c(HMA_LESSON.keyLabel)}>{c(HMA_LESSON.cct.key)}</Callout>
          </Section>

          {/* 4 – MRT */}
          <Section id="mrt" title={c(HMA_LESSON.mrt.title)} lead={c(HMA_LESSON.mrt.lead)}>
            <Table headers={HMA_LESSON.mrt.seqHeaders.map(c)} rows={rows(HMA_LESSON.mrt.seqRows)} />
            <h3 style={{ marginTop: 24, marginBottom: 10, fontSize: '0.95rem', color: 'var(--text)', fontWeight: 700 }}>
              {c(HMA_LESSON.mrt.fazekasTitle)}
            </h3>
            <Table headers={HMA_LESSON.mrt.fazekasHeaders.map(c)} rows={rows(HMA_LESSON.mrt.fazekasRows)} />
            <Callout label={c(HMA_LESSON.keyLabel)}>{c(HMA_LESSON.mrt.key)}</Callout>
          </Section>

          {/* 5 – Klinik */}
          <Section id="klinik" title={c(HMA_LESSON.klinik.title)} lead={c(HMA_LESSON.klinik.lead)}>
            <h3 style={{ marginTop: 4, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {c(HMA_LESSON.klinik.lacunarTitle)}
            </h3>
            <Cards items={HMA_LESSON.klinik.lacunarItems} lang={lang} />
            <Callout label={c(HMA_LESSON.caveLabel)} cave>{c(HMA_LESSON.klinik.key)}</Callout>
          </Section>

          {/* 6 – Differenzialdiagnose */}
          <Section id="differenzial" title={c(HMA_LESSON.differenzial.title)} lead={c(HMA_LESSON.differenzial.lead)}>
            <Table headers={HMA_LESSON.differenzial.ddHeaders.map(c)} rows={rows(HMA_LESSON.differenzial.ddRows)} />
            <Callout label={c(HMA_LESSON.keyLabel)}>{c(HMA_LESSON.differenzial.key)}</Callout>
          </Section>

          {/* 7 – Therapie */}
          <Section id="therapie" title={c(HMA_LESSON.therapie.title)} lead={c(HMA_LESSON.therapie.lead)}>
            <Cards items={HMA_LESSON.therapie.items} lang={lang} />
            <Callout label={c(HMA_LESSON.caveLabel)} cave>{c(HMA_LESSON.therapie.cave)}</Callout>
          </Section>

          {/* 8 – Take-home */}
          <Section id="takehome" title={c(HMA_LESSON.takehome.title)} lead={c(HMA_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {HMA_LESSON.takehome.items.map((item, i) => (
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
          <div className={styles.strokeImageModalContent} onClick={e => e.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setPreview(null)} aria-label={copy.close}>×</button>
            <img src={preview.src} alt={preview.alt} />
          </div>
        </div>
      )}
    </main>
  )
}
