'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { CADASIL_LESSON } from '@/data/cadasil'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value

const UI = {
  de: {
    zoom: 'Bild vergrößern',
    close: 'Bildansicht schließen',
    mark: 'Als gelesen markieren',
    read: 'Als gelesen markiert',
    signIn: 'Anmelden',
    auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',
    source: 'Originalfall öffnen',
    references: 'Quellen & Vertiefung',
  },
  en: {
    zoom: 'Enlarge image',
    close: 'Close image preview',
    mark: 'Mark as read',
    read: 'Marked as read',
    signIn: 'Sign in',
    auth: 'Please sign in to save your learning progress.',
    source: 'Open original case',
    references: 'Sources & further reading',
  },
  fa: {
    zoom: 'بزرگ‌نمایی تصویر',
    close: 'بستن تصویر',
    mark: 'علامت‌گذاری به‌عنوان خوانده‌شده',
    read: 'به‌عنوان خوانده‌شده علامت خورد',
    signIn: 'ورود',
    auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.',
    source: 'باز کردن مورد اصلی',
    references: 'منابع و مطالعه بیشتر',
  },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)

  useEffect(() => setOpen(!mobile), [mobile, id])

  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
        </div>
      )}
    </section>
  )
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Cards({ items, lang }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={L(item.title, lang)}>
          {item.icon && <span style={{ display: 'block', marginBottom: 4, fontSize: 20 }}>{item.icon}</span>}
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
      {authError && (
        <div className={styles.readError}>
          <span>{copy.auth}</span>
          <Link href="/sign-in">{copy.signIn}</Link>
        </div>
      )}
    </div>
  )
}

function CaseGallery({ images, lang, copy, onZoom }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
        gap: 14,
        margin: '18px 0',
      }}
    >
      {images.map((image, index) => (
        <article className={styles.caseCardLink} key={image.src}>
          <button
            type="button"
            className={styles.strokeCaseZoom}
            onClick={() => onZoom(index)}
            aria-label={`${copy.zoom}: ${L(image.alt, lang)}`}
            style={{ height: 310 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.caseImageAsset} src={image.src} alt={L(image.alt, lang)} />
          </button>
          <div className={styles.caseBody}>
            <div className={styles.caseLabelRow}>
              <span className={styles.caseLabel}>{L(image.label, lang)}</span>
              <span className={styles.caseLabel}>FLAIR</span>
            </div>
            <p>{L(image.caption, lang)}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function CadasilPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = CADASIL_LESSON.sections
  const { isRead, toggleRead, authError } = useLessonReadStatus('cadasil')
  const [active, setActive] = useState('')
  const [zoomed, setZoomed] = useState(null)
  const withLang = href => lang === 'de' ? href : `/${lang}${href}`

  useEffect(() => {
    const observers = sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) setActive(section.id)
        },
        { rootMargin: '-30% 0px -60% 0px' }
      )
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
      if (event.key === 'ArrowRight') setZoomed(value => (value + 1) % CADASIL_LESSON.fall.images.length)
      if (event.key === 'ArrowLeft') setZoomed(value => (value - 1 + CADASIL_LESSON.fall.images.length) % CADASIL_LESSON.fall.images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', handleKey)
    }
  }, [zoomed])

  const rows = value => value.map(row => row.map(c))
  const zoomedImage = zoomed === null ? null : CADASIL_LESSON.fall.images[zoomed]

  return (
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(CADASIL_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{CADASIL_LESSON.sourceLabel}</span>
            <h1>{c(CADASIL_LESSON.title)}</h1>
            <p>{c(CADASIL_LESSON.definition)}</p>
          </div>
          <div className={styles.heroStats}>
            {CADASIL_LESSON.heroCards.map(card => (
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
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{c(CADASIL_LESSON.toc)}</div>
          {sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>{section.icon}</span>
              <strong>{c(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={c(CADASIL_LESSON.grundlagen.title)} lead={c(CADASIL_LESSON.grundlagen.lead)}>
            <Cards items={CADASIL_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(CADASIL_LESSON.keyLabel)}>{c(CADASIL_LESSON.grundlagen.key)}</Callout>
          </Section>

          <Section id="klinik" title={c(CADASIL_LESSON.klinik.title)} lead={c(CADASIL_LESSON.klinik.lead)}>
            <Table headers={CADASIL_LESSON.klinik.headers.map(c)} rows={rows(CADASIL_LESSON.klinik.rows)} />
            <Callout label={c(CADASIL_LESSON.caveLabel)} cave>{c(CADASIL_LESSON.klinik.cave)}</Callout>
          </Section>

          <Section id="mrt" title={c(CADASIL_LESSON.mrt.title)} lead={c(CADASIL_LESSON.mrt.lead)}>
            <Table headers={CADASIL_LESSON.mrt.headers.map(c)} rows={rows(CADASIL_LESSON.mrt.rows)} />
            <Callout label={c(CADASIL_LESSON.keyLabel)}>{c(CADASIL_LESSON.mrt.key)}</Callout>
          </Section>

          <Section id="diagnostik" title={c(CADASIL_LESSON.diagnostik.title)} lead={c(CADASIL_LESSON.diagnostik.lead)}>
            <Cards items={CADASIL_LESSON.diagnostik.steps} lang={lang} />
            <Callout label={c(CADASIL_LESSON.caveLabel)} cave>{c(CADASIL_LESSON.diagnostik.cave)}</Callout>
          </Section>

          <Section id="differenzial" title={c(CADASIL_LESSON.differenzial.title)} lead={c(CADASIL_LESSON.differenzial.lead)}>
            <Table headers={CADASIL_LESSON.differenzial.headers.map(c)} rows={rows(CADASIL_LESSON.differenzial.rows)} />
          </Section>

          <Section id="fall" title={c(CADASIL_LESSON.fall.title)} lead={c(CADASIL_LESSON.fall.lead)}>
            <CaseGallery images={CADASIL_LESSON.fall.images} lang={lang} copy={copy} onZoom={setZoomed} />

            <h3 style={{ margin: '24px 0 12px' }}>{c(CADASIL_LESSON.fall.findingsTitle)}</h3>
            <div className={styles.cardsGrid}>
              {CADASIL_LESSON.fall.findings.map((finding, index) => (
                <div className={styles.infoCard} key={c(finding)}>
                  <span style={{ display: 'block', marginBottom: 6, color: '#7c3aed', fontWeight: 900 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{c(finding)}</p>
                </div>
              ))}
            </div>

            <Callout label={c({ de: 'Diagnose', en: 'Diagnosis', fa: 'تشخیص' })}>{c(CADASIL_LESSON.fall.diagnosis)}</Callout>
            <p style={{ marginTop: 14, color: 'var(--text-muted)', fontSize: 12 }}>
              {c(CADASIL_LESSON.fall.source)}{' '}
              <a className={styles.caseExternalLink} href={CADASIL_LESSON.fall.sourceUrl} target="_blank" rel="noreferrer">
                {copy.source} ↗
              </a>
            </p>
          </Section>

          <Section id="management" title={c(CADASIL_LESSON.management.title)} lead={c(CADASIL_LESSON.management.lead)}>
            <Cards items={CADASIL_LESSON.management.items} lang={lang} />
            <Callout label={c(CADASIL_LESSON.caveLabel)} cave>{c(CADASIL_LESSON.management.cave)}</Callout>
          </Section>

          <Section id="takehome" title={c(CADASIL_LESSON.takehome.title)} lead={c(CADASIL_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {CADASIL_LESSON.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={c(item.title)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{c(item.title)}</h3>
                    <p>{c(item.text)}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ margin: '28px 0 12px' }}>{copy.references}</h3>
            <div className={styles.cardsGrid}>
              {CADASIL_LESSON.references.map(reference => (
                <a
                  className={styles.infoCard}
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  key={reference.href}
                  style={{ textDecoration: 'none' }}
                >
                  <h3>{reference.label} ↗</h3>
                  <p>{reference.href}</p>
                </a>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}>
            <ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} />
          </div>
        </div>
      </div>

      {zoomedImage && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={c(zoomedImage.alt)} onClick={() => setZoomed(null)}>
          <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setZoomed(null)} aria-label={copy.close}>×</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomedImage.src} alt={c(zoomedImage.alt)} />
            <p>{c(zoomedImage.caption)}</p>
          </div>
        </div>
      )}
    </main>
  )
}
