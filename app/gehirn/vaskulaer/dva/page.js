'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { DVA_LESSON } from '@/data/dva'
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
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
  },
  en: {
    zoom: 'Enlarge image',
    close: 'Close image preview',
    mark: 'Mark as read',
    read: 'Marked as read',
    signIn: 'Sign in',
    auth: 'Please sign in to save your learning progress.',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
  },
  fa: {
    zoom: 'بزرگ‌نمایی تصویر',
    close: 'بستن تصویر',
    mark: 'علامت‌گذاری به‌عنوان خوانده‌شده',
    read: 'به‌عنوان خوانده‌شده علامت خورد',
    signIn: 'ورود',
    auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.',
    actionMcq: 'MCQ',
    actionFlash: 'فلش‌کارت',
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

function CaseGallery({ fall, lang, copy, onZoom }) {
  return (
    <div className={styles.caseGrid}>
      <article className={`${styles.caseCardLink} ${styles.cadasilCaseCard}`}>
        <div className={`${styles.caseImages} ${styles.cadasilCaseImages}`}>
          {fall.images.map((image, index) => (
          <button
            type="button"
            className={styles.strokeCaseZoom}
            onClick={() => onZoom(index)}
            aria-label={`${copy.zoom}: ${L(image.alt, lang)}`}
            key={image.src}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.caseImageAsset} src={image.src} alt={L(image.alt, lang)} />
          </button>
          ))}
        </div>
        <div className={styles.caseBody}>
          <div className={styles.caseLabelRow}>
            <span className={styles.caseLabel}>{L(fall.caseLabel, lang)}</span>
            <span className={styles.caseLabel}>MRT</span>
            <span className={styles.caseLabel}>FLAIR</span>
          </div>
          <h3>{L(fall.caseTitle, lang)}</h3>
          <p>{L(fall.caseMeta, lang)}</p>
        </div>
      </article>
    </div>
  )
}

export default function DvaPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = DVA_LESSON.sections
  const { isRead, toggleRead, authError } = useLessonReadStatus('dva')
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
      if (event.key === 'ArrowRight') setZoomed(value => (value + 1) % DVA_LESSON.fall.images.length)
      if (event.key === 'ArrowLeft') setZoomed(value => (value - 1 + DVA_LESSON.fall.images.length) % DVA_LESSON.fall.images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', handleKey)
    }
  }, [zoomed])

  const rows = value => value.map(row => row.map(c))
  const zoomedImage = zoomed === null ? null : DVA_LESSON.fall.images[zoomed]

  return (
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(DVA_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{DVA_LESSON.sourceLabel}</span>
            <h1>{c(DVA_LESSON.title)}</h1>
            <p>{c(DVA_LESSON.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=dva&from=${encodeURIComponent(withLang('/gehirn/vaskulaer/dva'))}`)}>
                🎯 {copy.actionMcq}
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/dva?from=${encodeURIComponent(withLang('/gehirn/vaskulaer/dva'))}`)}>
                🧠 {copy.actionFlash}
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {DVA_LESSON.heroCards.map(card => (
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
          <div className={styles.sideTitle}>{c(DVA_LESSON.toc)}</div>
          {sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={section.emphasis ? {
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, .48)',
                background: 'rgba(245, 158, 11, .12)',
                fontWeight: 950,
                boxShadow: '0 8px 20px rgba(245, 158, 11, .10)',
              } : undefined}
            >
              <span>{section.icon}</span>
              <strong>{c(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={c(DVA_LESSON.grundlagen.title)} lead={c(DVA_LESSON.grundlagen.lead)}>
            <Cards items={DVA_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(DVA_LESSON.keyLabel)}>{c(DVA_LESSON.grundlagen.key)}</Callout>
          </Section>

          <Section id="anatomie" title={c(DVA_LESSON.anatomie.title)} lead={c(DVA_LESSON.anatomie.lead)}>
            <Table headers={DVA_LESSON.anatomie.headers.map(c)} rows={rows(DVA_LESSON.anatomie.rows)} />
            <Callout label={c(DVA_LESSON.keyLabel)}>{c(DVA_LESSON.anatomie.key)}</Callout>
          </Section>

          <Section id="bildgebung" title={c(DVA_LESSON.bildgebung.title)} lead={c(DVA_LESSON.bildgebung.lead)}>
            <Table headers={DVA_LESSON.bildgebung.headers.map(c)} rows={rows(DVA_LESSON.bildgebung.rows)} />
          </Section>

          <Section id="assoziationen" title={c(DVA_LESSON.assoziationen.title)} lead={c(DVA_LESSON.assoziationen.lead)}>
            <Cards items={DVA_LESSON.assoziationen.items} lang={lang} />
            <Callout label={c(DVA_LESSON.caveLabel)} cave>{c(DVA_LESSON.assoziationen.cave)}</Callout>
          </Section>

          <Section id="komplikationen" title={c(DVA_LESSON.komplikationen.title)} lead={c(DVA_LESSON.komplikationen.lead)}>
            <Table headers={DVA_LESSON.komplikationen.headers.map(c)} rows={rows(DVA_LESSON.komplikationen.rows)} />
          </Section>

          <Section id="differenzial" title={c(DVA_LESSON.differenzial.title)} lead={c(DVA_LESSON.differenzial.lead)}>
            <Table headers={DVA_LESSON.differenzial.headers.map(c)} rows={rows(DVA_LESSON.differenzial.rows)} />
          </Section>

          <Section id="fall" title={c(DVA_LESSON.fall.title)} lead={c(DVA_LESSON.fall.lead)}>
            <CaseGallery fall={DVA_LESSON.fall} lang={lang} copy={copy} onZoom={setZoomed} />

            <h3 style={{ margin: '24px 0 12px' }}>{c(DVA_LESSON.fall.findingsTitle)}</h3>
            <div className={styles.cardsGrid}>
              {DVA_LESSON.fall.findings.map((finding, index) => (
                <div className={styles.infoCard} key={c(finding)}>
                  <span style={{ display: 'block', marginBottom: 6, color: '#7c3aed', fontWeight: 900 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{c(finding)}</p>
                </div>
              ))}
            </div>

            <Callout label={c({ de: 'Diagnose', en: 'Diagnosis', fa: 'تشخیص' })}>{c(DVA_LESSON.fall.diagnosis)}</Callout>
          </Section>

          <Section id="management" title={c(DVA_LESSON.management.title)} lead={c(DVA_LESSON.management.lead)}>
            <Cards items={DVA_LESSON.management.items} lang={lang} />
            <Callout label={c(DVA_LESSON.caveLabel)} cave>{c(DVA_LESSON.management.cave)}</Callout>
          </Section>

          <Section id="takehome" title={c(DVA_LESSON.takehome.title)} lead={c(DVA_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {DVA_LESSON.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={c(item.title)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
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
