'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { STROKE_LEARNING_CASES, STROKE_LESSON } from '@/data/stroke'
import InProgressBanner from '@/components/InProgressBanner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const IMAGE_UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen' },
  en: { zoom: 'Enlarge image', close: 'Close image preview' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن نمایش تصویر' },
}

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function localize(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('de' in value || 'en' in value || 'fa' in value)) {
    return value[lang] || value.de
  }
  return value
}

function localizedItems(items, lang) {
  return items.map(item => ({
    ...item,
    title: localize(item.title, lang),
    text: localize(item.text, lang),
  }))
}

function localizedRows(rows, lang) {
  return rows.map(row => row.map(cell => localize(cell, lang)))
}

function ReadButton({ isRead, onClick, authError, lang }) {
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={onClick}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}><strong>{label}</strong><p>{children}</p></div>
}

function Cards({ items }) {
  return <div className={styles.cardsGrid}>{items.map(item => <div className={styles.infoCard} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
}

function ClinicalBasics({ lesson, lang, localizeValue }) {
  const rows = localizedRows(lesson.rows, lang)
  const headers = lesson.headers.map(localizeValue)
  const notes = localizedItems(lesson.items, lang)
  const introCards = lesson.introGroups.flatMap(group => group.items.map(item => ({
    title: localizeValue(item.text),
    text: localizeValue(item.detail),
  })))

  return (
    <div>
      <p className={styles.lead}>{localizeValue(lesson.introTitle)}</p>
      <Cards items={introCards} />

      <h3 style={{ margin: '28px 0 14px', color: 'var(--text-strong)' }}>{localizeValue(lesson.territoriesTitle)}</h3>
      <Table headers={headers} rows={rows} />
      <Callout label={localizeValue('Definition')}>{localizeValue(lesson.footnote)}</Callout>

      <Cards items={notes} />
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2><span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function LearningFigure({ src, alt, onZoom, zoomLabel }) {
  return (
    <figure style={{ margin: '22px 0 0', border: '1px solid var(--border)', borderRadius: 22, overflow: 'hidden', background: 'var(--bg-card)' }}>
      <button type="button" className={styles.strokeZoomButton} onClick={() => onZoom({ src, alt })} aria-label={zoomLabel}>
        <Image src={src} alt={alt} width={1536} height={1024} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </button>
    </figure>
  )
}

function CaseCard({ item, lang, openCase, onZoom, zoomLabel }) {
  const images = item.images || [item.image]
  return (
    <article className={styles.caseCardLink}>
      <figure className={styles.caseImage} style={images.length > 1 ? { display: 'grid', gridTemplateColumns: '1fr 1fr' } : undefined}>
        {images.map(src => (
          <button type="button" className={styles.strokeCaseZoom} key={src} onClick={() => onZoom({ src, alt: localize(item.alt, lang) })} aria-label={zoomLabel}>
            <Image src={src} alt={localize(item.alt, lang)} width={612} height={612} className={styles.caseImageAsset} style={{ minWidth: 0 }} />
          </button>
        ))}
      </figure>
      <div className={styles.caseBody}>
        <div className={styles.caseLabelRow}><span className={styles.caseLabel}>{localize(item.label, lang)}</span><span className={styles.caseLabel}>{images.length > 1 ? 'CT · DWI' : 'CT'}</span></div>
        <h3>{localize(item.title, lang)}</h3>
        <p>{localize(item.text, lang)}</p>
        <small>{item.credit}</small>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{openCase} ↗</a>
      </div>
    </article>
  )
}

export default function IschaemischerSchlaganfallPage() {
  const { lang } = useLanguage()
  const c = value => localize(value, lang)
  const imageUi = IMAGE_UI[lang] || IMAGE_UI.de
  const isRTL = lang === 'fa'
  const sections = STROKE_LESSON.sections.map(section => ({ ...section, label: c(section.label) }))
  const [activeId, setActiveId] = useState(sections[0].id)
  const [previewImage, setPreviewImage] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('ischaemischer-schlaganfall')
  const lessonPath = '/gehirn/vaskulaer/isch-aemischer-schlaganfall'
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => sections.map(section => section.id), [sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <>
      <Navbar />
      <main className={`${styles.page} ${styles.strokePage}`} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c(STROKE_LESSON.breadcrumbArea)}</Link><span>›</span>
          <span>{c(STROKE_LESSON.breadcrumbCurrent)}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{STROKE_LESSON.sourceLabel}</span>
            <h1>{c(STROKE_LESSON.title)}</h1>
            <p>{c(STROKE_LESSON.subtitle)}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=gehirn&n=15&themen=ischaemischer-schlaganfall&from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>🎯 {STROKE_LESSON.actionMcq}</Link>
              <Link href={withLang(`/flashcards/ischaemischer-schlaganfall?from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>🧠 {c(STROKE_LESSON.actionFlash)}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {STROKE_LESSON.heroCards.map(card => <div className={styles.heroStat} key={c(card.label)}><strong>{card.value}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{c(STROKE_LESSON.toc)}</div>
          {sections.map(section => (
            <button type="button" key={section.id} data-section-id={section.id} className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <span>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={c(STROKE_LESSON.basics.title)}>
            <ClinicalBasics lesson={STROKE_LESSON.basics} lang={lang} localizeValue={c} />
            <Callout label={c(STROKE_LESSON.keyLabel)}>{c(STROKE_LESSON.basics.key)}</Callout>
          </Section>

          <Section id="akut-ct" title={c(STROKE_LESSON.acuteCt.title)} lead={c(STROKE_LESSON.acuteCt.lead)}>
            <Table headers={STROKE_LESSON.acuteCt.headers.map(c)} rows={localizedRows(STROKE_LESSON.acuteCt.rows, lang)} />
            <Cards items={localizedItems(STROKE_LESSON.acuteCt.earlySigns, lang)} />
            <Callout type="cave" label={c(STROKE_LESSON.caveLabel)}>{c(STROKE_LESSON.acuteCt.cave)}</Callout>
          </Section>

          <Section id="ctp" title={c(STROKE_LESSON.ctpInterpretation.title)} lead={c(STROKE_LESSON.ctpInterpretation.lead)}>
            <Cards items={localizedItems(STROKE_LESSON.ctpInterpretation.items, lang)} />
            <Cards items={localizedItems(STROKE_LESSON.ctpInterpretation.steps, lang)} />
            <Callout type="cave" label={c(STROKE_LESSON.caveLabel)}>{c(STROKE_LESSON.ctpInterpretation.cave)}</Callout>
          </Section>

          <Section id="aspects" title={c(STROKE_LESSON.aspects.title)} lead={c(STROKE_LESSON.aspects.lead)}>
            <Cards items={localizedItems(STROKE_LESSON.aspects.items, lang)} />
          </Section>

          <Section id="ct-verlauf" title={c(STROKE_LESSON.ctTimeline.title)} lead={c(STROKE_LESSON.ctTimeline.lead)}>
            <Cards items={localizedItems(STROKE_LESSON.ctTimeline.items, lang)} />
            <LearningFigure src="/stroke/ct-timeline.png" alt={c(STROKE_LESSON.ctTimeline.imageAlt)} onZoom={setPreviewImage} zoomLabel={imageUi.zoom} />
          </Section>

          <Section id="mrt" title={c(STROKE_LESSON.mri.title)} lead={c(STROKE_LESSON.mri.lead)}>
            <Table headers={STROKE_LESSON.mri.headers.map(c)} rows={localizedRows(STROKE_LESSON.mri.rows, lang)} />
            <Callout label={c(STROKE_LESSON.mri.mismatchTitle)}>{c(STROKE_LESSON.mri.mismatchText)}</Callout>
            <Callout type="cave" label={c(STROKE_LESSON.caveLabel)}>{c(STROKE_LESSON.mri.cave)}</Callout>
          </Section>

          <Section id="mrt-verlauf" title={c(STROKE_LESSON.mriTimeline.title)} lead={c(STROKE_LESSON.mriTimeline.lead)}>
            <LearningFigure src="/stroke/mri-timeline.png" alt={c(STROKE_LESSON.mriTimeline.imageAlt)} onZoom={setPreviewImage} zoomLabel={imageUi.zoom} />
          </Section>

          <Section id="verlauf" title={c(STROKE_LESSON.pitfalls.title)} lead={c(STROKE_LESSON.pitfalls.lead)}>
            <Cards items={localizedItems(STROKE_LESSON.pitfalls.items, lang)} />
            <Callout type="cave" label={c(STROKE_LESSON.caveLabel)}>{c(STROKE_LESSON.pitfalls.cave)}</Callout>
          </Section>

          <Section id="therapie" title={c(STROKE_LESSON.treatment.title)} lead={c(STROKE_LESSON.treatment.lead)}>
            <Cards items={localizedItems(STROKE_LESSON.treatment.items, lang)} />
            <Cards items={localizedItems(STROKE_LESSON.treatment.reportItems, lang)} />
            <Callout label={c(STROKE_LESSON.keyLabel)}>{c(STROKE_LESSON.treatment.key)}</Callout>
          </Section>

          <Section id="faelle" title={c(STROKE_LESSON.cases.title)} lead={c(STROKE_LESSON.cases.lead)}>
            <div className={styles.caseGrid}>{STROKE_LEARNING_CASES.map(item => <CaseCard key={item.id} item={item} lang={lang} openCase={c(STROKE_LESSON.openCase)} onZoom={setPreviewImage} zoomLabel={imageUi.zoom} />)}</div>
          </Section>

          <Section id="takehome" title={c(STROKE_LESSON.takehome.title)} lead={c(STROKE_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {localizedItems(STROKE_LESSON.takehome.items, lang).map((item, index) => <div className={styles.takeHomeItem} key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
        </div>
      </div>
      </main>
      <Footer />
      {previewImage && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={imageUi.zoom} onClick={() => setPreviewImage(null)}>
          <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setPreviewImage(null)} aria-label={imageUi.close}>×</button>
            <img src={previewImage.src} alt={previewImage.alt} />
          </div>
        </div>
      )}
    </>
  )
}
