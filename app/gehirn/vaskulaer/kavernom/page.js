'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { KAVERNOM_LESSON } from '@/data/kavernom'
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

export default function KavernomPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = KAVERNOM_LESSON.sections
  const { isRead, toggleRead, authError } = useLessonReadStatus('kavernom')
  const [active, setActive] = useState('')
  const [zoomed, setZoomed] = useState(null)
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

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
      if (event.key === 'ArrowRight') setZoomed(value => (value + 1) % KAVERNOM_LESSON.fall.images.length)
      if (event.key === 'ArrowLeft') setZoomed(value => (value - 1 + KAVERNOM_LESSON.fall.images.length) % KAVERNOM_LESSON.fall.images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', handleKey)
    }
  }, [zoomed])

  const rows = value => value.map(row => row.map(c))
  const zoomedImage = zoomed === null ? null : KAVERNOM_LESSON.fall.images[zoomed]

  return (
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(KAVERNOM_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{KAVERNOM_LESSON.sourceLabel}</span>
            <h1>{c(KAVERNOM_LESSON.title)}</h1>
            <p>{c(KAVERNOM_LESSON.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=kavernom&from=${encodeURIComponent(withLang('/gehirn/vaskulaer/kavernom'))}`)}>
                🎯 {copy.actionMcq}
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/kavernom?from=${encodeURIComponent(withLang('/gehirn/vaskulaer/kavernom'))}`)}>
                🧠 {copy.actionFlash}
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {KAVERNOM_LESSON.heroCards.map(card => (
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
          <div className={styles.sideTitle}>{c(KAVERNOM_LESSON.toc)}</div>
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
          <Section id="grundlagen" title={c(KAVERNOM_LESSON.grundlagen.title)} lead={c(KAVERNOM_LESSON.grundlagen.lead)}>
            <Cards items={KAVERNOM_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(KAVERNOM_LESSON.keyLabel)}>{c(KAVERNOM_LESSON.grundlagen.key)}</Callout>
          </Section>

          <Section id="klinik" title={c(KAVERNOM_LESSON.klinik.title)} lead={c(KAVERNOM_LESSON.klinik.lead)}>
            <Table headers={KAVERNOM_LESSON.klinik.headers.map(c)} rows={rows(KAVERNOM_LESSON.klinik.rows)} />
            <Callout label={c(KAVERNOM_LESSON.caveLabel)} cave>{c(KAVERNOM_LESSON.klinik.cave)}</Callout>
          </Section>

          <Section id="mrt" title={c(KAVERNOM_LESSON.mrt.title)} lead={c(KAVERNOM_LESSON.mrt.lead)}>
            <Table headers={KAVERNOM_LESSON.mrt.headers.map(c)} rows={rows(KAVERNOM_LESSON.mrt.rows)} />
            <h3 style={{ margin: '24px 0 12px' }}>{c(KAVERNOM_LESSON.mrt.teachingTitle)}</h3>
            <div className={styles.caseGrid}>
              <article className={`${styles.caseCardLink} ${styles.cadasilCaseCard}`}>
                <div className={styles.kavernomTeachingImages}>
                  {KAVERNOM_LESSON.mrt.teachingImages.map(image => (
                    <figure key={image.src} style={{ margin: 0, minWidth: 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={styles.caseImageAsset} src={image.src} alt={`${image.label} Kavernom`} />
                      <figcaption style={{ padding: '8px 10px', textAlign: 'center', fontWeight: 900 }}>{image.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            </div>
          </Section>

          <Section id="zabramski" title={c(KAVERNOM_LESSON.zabramski.title)} lead={c(KAVERNOM_LESSON.zabramski.lead)}>
            <Table headers={KAVERNOM_LESSON.zabramski.headers.map(c)} rows={rows(KAVERNOM_LESSON.zabramski.rows)} />
          </Section>

          <Section id="assoziation" title={c(KAVERNOM_LESSON.assoziation.title)} lead={c(KAVERNOM_LESSON.assoziation.lead)}>
            <Cards items={KAVERNOM_LESSON.assoziation.items} lang={lang} />
            <Callout label={c(KAVERNOM_LESSON.caveLabel)} cave>{c(KAVERNOM_LESSON.assoziation.cave)}</Callout>
          </Section>

          <Section id="differenzial" title={c(KAVERNOM_LESSON.differenzial.title)} lead={c(KAVERNOM_LESSON.differenzial.lead)}>
            <Table headers={KAVERNOM_LESSON.differenzial.headers.map(c)} rows={rows(KAVERNOM_LESSON.differenzial.rows)} />
          </Section>

          <Section id="fall" title={c(KAVERNOM_LESSON.fall.title)} lead={c(KAVERNOM_LESSON.fall.lead)}>
            <CaseGallery fall={KAVERNOM_LESSON.fall} lang={lang} copy={copy} onZoom={setZoomed} />

            <h3 style={{ margin: '24px 0 12px' }}>{c(KAVERNOM_LESSON.fall.findingsTitle)}</h3>
            <div className={styles.cardsGrid}>
              {KAVERNOM_LESSON.fall.findings.map((finding, index) => (
                <div className={styles.infoCard} key={c(finding)}>
                  <span style={{ display: 'block', marginBottom: 6, color: '#7c3aed', fontWeight: 900 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{c(finding)}</p>
                </div>
              ))}
            </div>

            <Callout label={c({ de: 'Diagnose', en: 'Diagnosis', fa: 'تشخیص' })}>{c(KAVERNOM_LESSON.fall.diagnosis)}</Callout>
          </Section>

          <Section id="management" title={c(KAVERNOM_LESSON.management.title)} lead={c(KAVERNOM_LESSON.management.lead)}>
            <Cards items={KAVERNOM_LESSON.management.items} lang={lang} />
            <Callout label={c(KAVERNOM_LESSON.caveLabel)} cave>{c(KAVERNOM_LESSON.management.cave)}</Callout>
          </Section>

          <Section id="takehome" title={c(KAVERNOM_LESSON.takehome.title)} lead={c(KAVERNOM_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {KAVERNOM_LESSON.takehome.items.map((item, index) => (
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
