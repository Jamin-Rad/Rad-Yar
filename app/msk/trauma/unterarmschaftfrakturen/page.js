'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { UNTERARM_LESSON } from '@/data/unterarmschaftfrakturen'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', prev: 'Vorheriges Bild', next: 'Nächstes Bild', radiopaedia: 'Auf Radiopaedia öffnen', report: 'Beispielbefund' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', prev: 'Previous image', next: 'Next image', radiopaedia: 'Open on Radiopaedia', report: 'Sample report' },
  fa: { zoom: 'بزرگ‌نمایی', close: 'بستن تصویر', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', prev: 'تصویر قبلی', next: 'تصویر بعدی', radiopaedia: 'باز کردن در رادیوپدیا', report: 'نمونه گزارش' },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}>
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
        <thead><tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Cards({ items, lang }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={L(item.title, lang)}>
          <span className={styles.cardIcon}>{item.icon}</span>
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

function ImageModal({ images, index, copy, radiopaediaUrl, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = event => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  const image = images[index]
  return (
    <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
        <button type="button" className={styles.strokeImageModalClose} onClick={onClose} aria-label={copy.close}>×</button>
        <img src={image.src} alt={image.caption} style={{ maxHeight: '75vh', maxWidth: '100%', objectFit: 'contain' }} />
        <p style={{ textAlign: 'center', marginTop: '.6rem', fontSize: '.875rem', opacity: .82 }}>{image.caption}</p>
        {images.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
            <button type="button" onClick={onPrev} aria-label={copy.prev} className={styles.actionBtn}>‹</button>
            <span style={{ opacity: .65 }}>{index + 1} / {images.length}</span>
            <button type="button" onClick={onNext} aria-label={copy.next} className={styles.actionBtn}>›</button>
          </div>
        )}
        <p style={{ textAlign: 'center', marginTop: '.8rem' }}>
          <a href={radiopaediaUrl} target="_blank" rel="noopener noreferrer">{copy.radiopaedia} ↗</a>
        </p>
      </div>
    </div>
  )
}

function CaseGallery({ title, images, radiopaediaUrl, copy }) {
  const [modalIndex, setModalIndex] = useState(null)
  const previous = useCallback(() => setModalIndex(index => (index - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setModalIndex(index => (index + 1) % images.length), [images.length])
  return (
    <div style={{ marginTop: '1.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.8rem', flexWrap: 'wrap', marginBottom: '.8rem' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <a href={radiopaediaUrl} target="_blank" rel="noopener noreferrer">Radiopaedia ↗</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem' }}>
        {images.map((image, index) => (
          <button key={image.src} type="button" onClick={() => setModalIndex(index)} aria-label={`${copy.zoom}: ${image.caption}`}
            style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(148,163,184,.28)', borderRadius: '12px', background: 'rgba(255,255,255,.04)', cursor: 'zoom-in', color: 'inherit' }}>
            <img src={image.src} alt={image.caption} style={{ display: 'block', width: '100%', height: '300px', objectFit: 'contain', background: '#050505' }} />
            <p style={{ margin: 0, padding: '.65rem .8rem', fontSize: '.78rem', lineHeight: 1.45, opacity: .78 }}>{image.caption}</p>
          </button>
        ))}
      </div>
      {modalIndex !== null && <ImageModal images={images} index={modalIndex} copy={copy} radiopaediaUrl={radiopaediaUrl} onClose={() => setModalIndex(null)} onPrev={previous} onNext={next} />}
    </div>
  )
}

function ZoomImage({ src, alt, copy }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ margin: '1.3rem 0' }}>
      <button type="button" onClick={() => setOpen(true)} aria-label={`${copy.zoom}: ${alt}`}
        style={{ display: 'block', width: '100%', maxWidth: '760px', margin: '0 auto', padding: 0, border: '1px solid rgba(148,163,184,.3)', borderRadius: '12px', overflow: 'hidden', cursor: 'zoom-in', background: '#f8fafc' }}>
        <img src={src} alt={alt} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </button>
      <p style={{ textAlign: 'center', fontSize: '.78rem', opacity: .68 }}>{alt}</p>
      {open && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setOpen(false)} aria-label={copy.close}>×</button>
            <img src={src} alt={alt} style={{ maxHeight: '82vh', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function UnterarmschaftfrakturenPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const data = UNTERARM_LESSON
  const rtl = lang === 'fa'
  const route = '/msk/trauma/unterarmschaftfrakturen'
  const { isRead, toggleRead, authError } = useLessonReadStatus('unterarmschaftfrakturen')
  const [active, setActive] = useState('')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const rows = value => value.map(row => row.map(c))

  useEffect(() => {
    const observers = data.sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) setActive(section.id)
      }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [data.sections])

  return (
    <main className={`${styles.page} ${styles.mskTraumaPage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/msk')}>MSK</Link><span>›</span>
          <span>{c(data.breadcrumb)}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{data.sourceLabel}</span>
            <h1>{c(data.title)}</h1>
            <p>{c(data.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=msk&n=12&themen=unterarmschaftfrakturen&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/unterarmschaftfrakturen?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {data.heroCards.map(card => <div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{c(data.toc)}</div>
          {data.sections.map(section => (
            <button type="button" key={section.id}
              className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={section.emphasis ? { color: '#f97316', border: '1px solid rgba(249,115,22,.5)', background: 'rgba(249,115,22,.12)', fontWeight: 950 } : undefined}>
              <span>{section.icon}</span><strong>{c(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={c(data.grundlagen.title)} lead={c(data.grundlagen.lead)}>
            <Cards items={data.grundlagen.items} lang={lang} />
            <Callout label={c(data.keyLabel)}>{c(data.grundlagen.key)}</Callout>
          </Section>

          <Section id="bildgebung" title={c(data.bildgebung.title)} lead={c(data.bildgebung.lead)}>
            <Table headers={data.bildgebung.headers.map(c)} rows={rows(data.bildgebung.rows)} />
            <Callout label={c(data.caveLabel)} cave>{c(data.bildgebung.cave)}</Callout>
          </Section>

          <Section id="monteggia" title={c(data.monteggia.title)} lead={c(data.monteggia.lead)}>
            <ZoomImage src={data.monteggia.schemaSrc} alt={c(data.monteggia.schemaAlt)} copy={copy} />
            <Table headers={data.monteggia.headers.map(c)} rows={rows(data.monteggia.rows)} />
            <Callout label={c(data.keyLabel)}>{c(data.monteggia.key)}</Callout>
            <Callout label={c(data.caveLabel)} cave>{c(data.monteggia.cave)}</Callout>
          </Section>

          <Section id="galeazzi" title={c(data.galeazzi.title)} lead={c(data.galeazzi.lead)}>
            <CaseGallery title={c(data.galeazzi.caseTitle)} images={data.galeazzi.images.map(image => ({ ...image, caption: c(image.caption) }))} radiopaediaUrl={data.galeazzi.radiopaediaUrl} copy={copy} />
            <div style={{ marginTop: '1.4rem' }}><Cards items={data.galeazzi.signs} lang={lang} /></div>
            <Callout label={c(data.keyLabel)}>{c(data.galeazzi.key)}</Callout>
          </Section>

          <Section id="befund" title={c(data.befund.title)} lead={c(data.befund.lead)}>
            <Cards items={data.befund.items} lang={lang} />
            <div className={styles.fractureReportTemplate}>
              <strong>{copy.report}</strong>
              <p>{c(data.befund.sample)}</p>
            </div>
          </Section>

          <Section id="therapie" title={c(data.therapie.title)} lead={c(data.therapie.lead)}>
            <Cards items={data.therapie.items} lang={lang} />
            <Callout label={c(data.caveLabel)} cave>{c(data.therapie.cave)}</Callout>
          </Section>

          <Section id="takehome" title={c(data.takehome.title)} lead={c(data.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {data.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={c(item.title)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
        </div>
      </div>
    </main>
  )
}
