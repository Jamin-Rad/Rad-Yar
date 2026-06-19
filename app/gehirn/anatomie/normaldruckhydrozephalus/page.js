'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { NPH_LESSON } from '@/data/normaldruckhydrozephalus'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value

const UI = {
  de: {
    zoom: 'Bild vergrößern', close: 'Bildansicht schließen',
    previous: 'Vorheriges Bild', next: 'Nächstes Bild',
    imageOf: (current, total) => `Bild ${current} von ${total}`,
    scroll: 'Mit Mausrad, Slider oder Pfeilen durch die Sequenz scrollen.',
    openCase: 'Fall in Radiopaedia öffnen',
    mark: 'Als gelesen markieren', read: 'Als gelesen markiert',
    signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',
    actionMcq: 'MCQ', actionFlash: 'Flashcards',
  },
  en: {
    zoom: 'Enlarge image', close: 'Close image preview',
    previous: 'Previous image', next: 'Next image',
    imageOf: (current, total) => `Image ${current} of ${total}`,
    scroll: 'Scroll through the sequence with the mouse wheel, slider or arrows.',
    openCase: 'Open case in Radiopaedia',
    mark: 'Mark as read', read: 'Marked as read',
    signIn: 'Sign in', auth: 'Please sign in to save your learning progress.',
    actionMcq: 'MCQ', actionFlash: 'Flashcards',
  },
  fa: {
    zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر',
    previous: 'تصویر قبلی', next: 'تصویر بعدی',
    imageOf: (current, total) => `تصویر ${current} از ${total}`,
    scroll: 'با چرخ ماوس، اسلایدر یا فلش‌ها در توالی تصاویر حرکت کنید.',
    openCase: 'باز کردن کیس در Radiopaedia',
    mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد',
    signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.',
    actionMcq: 'MCQ', actionFlash: 'فلش‌کارت',
  },
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
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
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
          <h3>{L(item.title, lang)}</h3><p>{L(item.text, lang)}</p>
        </div>
      ))}
    </div>
  )
}

function Callout({ label, cave = false, children }) {
  return <div className={`${styles.callout} ${cave ? styles.cave : ''}`}><strong>{cave ? '⚠️' : '💡'} {label}</strong><p>{children}</p></div>
}

function ReadButton({ isRead, toggleRead, authError, copy }) {
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}>
        <span className={styles.readCheck}>{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function CaseSequenceViewer({ fall, lang, copy, onZoom }) {
  const [frameIndex, setFrameIndex] = useState(0)
  const move = direction => setFrameIndex(index => Math.min(fall.frames.length - 1, Math.max(0, index + direction)))
  const label = L(fall.frameLabels[frameIndex], lang)

  return (
    <div
      className={styles.caseSequenceViewer}
      tabIndex={0}
      onWheel={event => { event.preventDefault(); move(event.deltaY > 0 ? 1 : -1) }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') move(1)
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') move(-1)
      }}
    >
      <div className={styles.caseSequenceImage}>
        <button type="button" className={styles.caseSequenceZoom} onClick={() => onZoom(frameIndex)} aria-label={`${copy.zoom}: ${label}`}>
          <Image src={fall.frames[frameIndex]} alt={`${L(fall.imageAlt, lang)} – ${label}`} width={650} height={650} className={styles.caseImageAsset} />
        </button>
        <span className={styles.caseSequenceCounter}>{copy.imageOf(frameIndex + 1, fall.frames.length)}</span>
        <strong className={styles.caseSequenceCaption}>{label}</strong>
      </div>
      <div className={styles.caseSequenceControls}>
        <button type="button" onClick={() => move(-1)} disabled={frameIndex === 0} aria-label={copy.previous}>‹</button>
        <input type="range" min="0" max={fall.frames.length - 1} value={frameIndex} onChange={event => setFrameIndex(Number(event.target.value))} aria-label={copy.imageOf(frameIndex + 1, fall.frames.length)} />
        <button type="button" onClick={() => move(1)} disabled={frameIndex === fall.frames.length - 1} aria-label={copy.next}>›</button>
      </div>
      <small className={styles.caseSequenceHint}>{copy.scroll}</small>
    </div>
  )
}

export default function NormaldruckhydrozephalusPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = NPH_LESSON.sections
  const { isRead, toggleRead, authError } = useLessonReadStatus('normaldruckhydrozephalus')
  const [active, setActive] = useState('')
  const [zoomed, setZoomed] = useState(null)
  const withLang = href => lang === 'de' ? href : `/${lang}${href}`
  const route = '/gehirn/anatomie/normaldruckhydrozephalus'
  const rows = value => value.map(row => row.map(c))

  useEffect(() => {
    const observers = sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) setActive(section.id)
      }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sections])

  useEffect(() => {
    if (zoomed === null) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = event => {
      if (event.key === 'Escape') setZoomed(null)
      if (event.key === 'ArrowRight') setZoomed(value => (value + 1) % NPH_LESSON.fall.frames.length)
      if (event.key === 'ArrowLeft') setZoomed(value => (value - 1 + NPH_LESSON.fall.frames.length) % NPH_LESSON.fall.frames.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', handleKey) }
  }, [zoomed])

  const zoomLabel = zoomed === null ? '' : c(NPH_LESSON.fall.frameLabels[zoomed])

  return (
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link><span>›</span>
          <span>{c(NPH_LESSON.breadcrumb)}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{NPH_LESSON.sourceLabel}</span>
            <h1>{c(NPH_LESSON.title)}</h1><p>{c(NPH_LESSON.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=normaldruckhydrozephalus&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.actionMcq}</Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/normaldruckhydrozephalus?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {NPH_LESSON.heroCards.map(card => <div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{c(NPH_LESSON.toc)}</div>
          {sections.map(section => (
            <button
              type="button" key={section.id}
              className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={section.emphasis ? { color: '#f59e0b', border: '1px solid rgba(245, 158, 11, .48)', background: 'rgba(245, 158, 11, .12)', fontWeight: 950, boxShadow: '0 8px 20px rgba(245, 158, 11, .10)' } : undefined}
            ><span>{section.icon}</span><strong>{c(section.label)}</strong></button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={c(NPH_LESSON.grundlagen.title)} lead={c(NPH_LESSON.grundlagen.lead)}>
            <Cards items={NPH_LESSON.grundlagen.items} lang={lang} /><Callout label={c(NPH_LESSON.keyLabel)}>{c(NPH_LESSON.grundlagen.key)}</Callout>
          </Section>
          <Section id="klinik" title={c(NPH_LESSON.klinik.title)} lead={c(NPH_LESSON.klinik.lead)}>
            <Table headers={NPH_LESSON.klinik.headers.map(c)} rows={rows(NPH_LESSON.klinik.rows)} /><Callout label={c(NPH_LESSON.caveLabel)} cave>{c(NPH_LESSON.klinik.cave)}</Callout>
          </Section>
          <Section id="morphologie" title={c(NPH_LESSON.morphologie.title)} lead={c(NPH_LESSON.morphologie.lead)}>
            <Cards items={NPH_LESSON.morphologie.items} lang={lang} /><Callout label={c(NPH_LESSON.keyLabel)}>{c(NPH_LESSON.morphologie.key)}</Callout>
          </Section>
          <Section id="messungen" title={c(NPH_LESSON.messungen.title)} lead={c(NPH_LESSON.messungen.lead)}>
            <Table headers={NPH_LESSON.messungen.headers.map(c)} rows={rows(NPH_LESSON.messungen.rows)} /><Callout label={c(NPH_LESSON.caveLabel)} cave>{c(NPH_LESSON.messungen.cave)}</Callout>
          </Section>
          <Section id="mrt" title={c(NPH_LESSON.mrt.title)} lead={c(NPH_LESSON.mrt.lead)}>
            <Table headers={NPH_LESSON.mrt.headers.map(c)} rows={rows(NPH_LESSON.mrt.rows)} /><Callout label={c(NPH_LESSON.keyLabel)}>{c(NPH_LESSON.mrt.key)}</Callout>
          </Section>
          <Section id="differenzial" title={c(NPH_LESSON.differenzial.title)} lead={c(NPH_LESSON.differenzial.lead)}>
            <Table headers={NPH_LESSON.differenzial.headers.map(c)} rows={rows(NPH_LESSON.differenzial.rows)} />
          </Section>
          <Section id="fall" title={c(NPH_LESSON.fall.title)} lead={c(NPH_LESSON.fall.lead)}>
            <div className={styles.caseGrid}>
              <article className={`${styles.caseCardLink} ${styles.cadasilCaseCard}`}>
                <CaseSequenceViewer fall={NPH_LESSON.fall} lang={lang} copy={copy} onZoom={setZoomed} />
                <div className={styles.caseBody}>
                  <div className={styles.caseLabelRow}>{NPH_LESSON.fall.tags.map(tag => <span className={styles.caseLabel} key={tag}>{tag}</span>)}</div>
                  <h3>{c(NPH_LESSON.fall.caseTitle)}</h3><p>{c(NPH_LESSON.fall.meta)}</p><small>{NPH_LESSON.fall.credit}</small>
                  <a href={NPH_LESSON.fall.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{copy.openCase} ↗</a>
                </div>
              </article>
            </div>
            <h3 className={styles.subsectionTitle}>{c(NPH_LESSON.fall.findingsTitle)}</h3>
            <div className={styles.cardsGrid}>{NPH_LESSON.fall.findings.map((finding, index) => <div className={styles.infoCard} key={c(finding)}><span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span><p>{c(finding)}</p></div>)}</div>
            <Callout label={c({ de: 'Diagnose', en: 'Diagnosis', fa: 'تشخیص' })}>{c(NPH_LESSON.fall.diagnosis)}</Callout>
          </Section>
          <Section id="diagnostik" title={c(NPH_LESSON.diagnostik.title)} lead={c(NPH_LESSON.diagnostik.lead)}>
            <Cards items={NPH_LESSON.diagnostik.items} lang={lang} /><Callout label={c(NPH_LESSON.caveLabel)} cave>{c(NPH_LESSON.diagnostik.cave)}</Callout>
          </Section>
          <Section id="takehome" title={c(NPH_LESSON.takehome.title)} lead={c(NPH_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>{NPH_LESSON.takehome.items.map((item, index) => <div className={styles.takeHomeItem} key={c(item.title)}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div>
          </Section>
          <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
        </div>
      </div>

      {zoomed !== null && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={zoomLabel} onClick={() => setZoomed(null)}>
          <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setZoomed(null)} aria-label={copy.close}>×</button>
            <img src={NPH_LESSON.fall.frames[zoomed]} alt={`${c(NPH_LESSON.fall.imageAlt)} – ${zoomLabel}`} /><p>{zoomLabel}</p>
          </div>
        </div>
      )}
    </main>
  )
}
