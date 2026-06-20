'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { AVM_LESSON } from '@/data/avm'
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
    caseSource: 'Case courtesy of Radiopaedia.org',
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
    caseSource: 'Case courtesy of Radiopaedia.org',
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
    caseSource: 'Case courtesy of Radiopaedia.org',
  },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(v => !v)} aria-expanded={open}>
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
        <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
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

export default function AvmPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = AVM_LESSON.sections
  const { isRead, toggleRead, authError } = useLessonReadStatus('avm-zns')
  const [active, setActive] = useState('')
  const [zoomed, setZoomed] = useState(null)
  const withLang = href => lang === 'de' ? href : `/${lang}${href}`
  const fall = AVM_LESSON.fall

  useEffect(() => {
    const observers = sections.map(section => {
      const el = document.getElementById(section.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        entries => { if (entries[0].isIntersecting) setActive(section.id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sections])

  useEffect(() => {
    if (zoomed === null) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = e => {
      if (e.key === 'Escape') setZoomed(null)
      if (e.key === 'ArrowRight') setZoomed(v => (v + 1) % fall.images.length)
      if (e.key === 'ArrowLeft') setZoomed(v => (v - 1 + fall.images.length) % fall.images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKey)
    }
  }, [zoomed, fall.images.length])

  const rows = value => value.map(row => row.map(c))
  const zoomedImage = zoomed === null ? null : fall.images[zoomed]

  return (
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(AVM_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{AVM_LESSON.sourceLabel}</span>
            <h1>{c(AVM_LESSON.title)}</h1>
            <p>{c(AVM_LESSON.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=avm-zns&from=${encodeURIComponent(withLang('/gehirn/vaskulaer/avm-zns'))}`)}>
                🎯 {copy.actionMcq}
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/avm-zns?from=${encodeURIComponent(withLang('/gehirn/vaskulaer/avm-zns'))}`)}>
                🧠 {copy.actionFlash}
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {AVM_LESSON.heroCards.map(card => (
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
          <div className={styles.sideTitle}>{c(AVM_LESSON.toc)}</div>
          {sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={section.emphasis ? {
                color: '#7c3aed',
                border: '1px solid rgba(124, 58, 237, .48)',
                background: 'rgba(124, 58, 237, .12)',
                fontWeight: 950,
                boxShadow: '0 8px 20px rgba(124, 58, 237, .10)',
              } : undefined}
            >
              <span>{section.icon}</span>
              <strong>{c(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          {/* Grundlagen */}
          <Section id="grundlagen" title={c(AVM_LESSON.grundlagen.title)} lead={c(AVM_LESSON.grundlagen.lead)}>
            <Cards items={AVM_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(AVM_LESSON.keyLabel)}>{c(AVM_LESSON.grundlagen.key)}</Callout>
          </Section>

          {/* Klinik */}
          <Section id="klinik" title={c(AVM_LESSON.klinik.title)} lead={c(AVM_LESSON.klinik.lead)}>
            <Table headers={AVM_LESSON.klinik.headers.map(c)} rows={rows(AVM_LESSON.klinik.rows)} />
            <Callout label={c(AVM_LESSON.caveLabel)} cave>{c(AVM_LESSON.klinik.cave)}</Callout>
          </Section>

          {/* Spetzler-Martin */}
          <Section id="spetzler" title={c(AVM_LESSON.spetzler.title)} lead={c(AVM_LESSON.spetzler.lead)}>
            <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {c({ de: 'Kriterienpunkte', en: 'Scoring criteria', fa: 'معیارهای امتیازدهی' })}
            </h3>
            <Table headers={AVM_LESSON.spetzler.headers.map(c)} rows={rows(AVM_LESSON.spetzler.rows)} />
            <h3 style={{ margin: '20px 0 10px', fontSize: 14, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {c({ de: 'Graduierung & Therapieempfehlung', en: 'Grading & treatment recommendation', fa: 'درجه‌بندی و توصیه درمانی' })}
            </h3>
            <Table headers={AVM_LESSON.spetzler.summary.headers.map(c)} rows={rows(AVM_LESSON.spetzler.summary.rows)} />
            <Callout label={c(AVM_LESSON.keyLabel)}>{c(AVM_LESSON.spetzler.key)}</Callout>
          </Section>

          {/* Bildgebung */}
          <Section id="bildgebung" title={c(AVM_LESSON.bildgebung.title)} lead={c(AVM_LESSON.bildgebung.lead)}>
            <Table headers={AVM_LESSON.bildgebung.headers.map(c)} rows={rows(AVM_LESSON.bildgebung.rows)} />
            <Callout label={c(AVM_LESSON.keyLabel)}>{c(AVM_LESSON.bildgebung.key)}</Callout>
          </Section>

          {/* Fallbeispiel */}
          <Section id="fall" title={c(fall.title)} lead={c(fall.lead)}>
            <div className={styles.caseGrid}>
              <article className={`${styles.caseCardLink} ${styles.cadasilCaseCard}`}>
                <div className={`${styles.caseImages} ${styles.cadasilCaseImages}`}>
                  {fall.images.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      className={styles.strokeCaseZoom}
                      onClick={() => setZoomed(index)}
                      aria-label={`${copy.zoom}: ${c(image.alt)}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={styles.caseImageAsset} src={image.src} alt={c(image.alt)} />
                      <span style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: 'rgba(0,0,0,.65)', color: '#fff',
                        fontSize: 11, fontWeight: 700, padding: '3px 6px', textAlign: 'center',
                      }}>{image.label}</span>
                    </button>
                  ))}
                </div>
                <div className={styles.caseBody}>
                  <div className={styles.caseLabelRow}>
                    <span className={styles.caseLabel}>{c(fall.caseLabel)}</span>
                    <span className={styles.caseLabel}>MRT</span>
                    <span className={styles.caseLabel}>rID 74111</span>
                  </div>
                  <h3>{c(fall.caseTitle)}</h3>
                  <p>{c(fall.caseMeta)}</p>
                  <p style={{ marginTop: 8, fontSize: 12, opacity: 0.6 }}>
                    {copy.caseSource} ·{' '}
                    <a href={fall.attribution.caseUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                      rID: {fall.attribution.caseId}
                    </a>
                  </p>
                </div>
              </article>
            </div>

            <h3 style={{ margin: '24px 0 12px' }}>{c(fall.findingsTitle)}</h3>
            <div className={styles.cardsGrid}>
              {fall.findings.map((finding, index) => (
                <div className={styles.infoCard} key={index}>
                  <span style={{ display: 'block', marginBottom: 6, color: '#7c3aed', fontWeight: 900 }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{c(finding)}</p>
                </div>
              ))}
            </div>
            <Callout label={c({ de: 'Diagnose', en: 'Diagnosis', fa: 'تشخیص' })}>{c(fall.diagnosis)}</Callout>
          </Section>

          {/* Differenzialdiagnose */}
          <Section id="differenzial" title={c(AVM_LESSON.differenzial.title)} lead={c(AVM_LESSON.differenzial.lead)}>
            <Table headers={AVM_LESSON.differenzial.headers.map(c)} rows={rows(AVM_LESSON.differenzial.rows)} />
          </Section>

          {/* Management */}
          <Section id="management" title={c(AVM_LESSON.management.title)} lead={c(AVM_LESSON.management.lead)}>
            <Cards items={AVM_LESSON.management.items} lang={lang} />
            <Callout label={c(AVM_LESSON.caveLabel)} cave>{c(AVM_LESSON.management.cave)}</Callout>
          </Section>

          {/* Take-Home */}
          <Section id="takehome" title={c(AVM_LESSON.takehome.title)} lead={c(AVM_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {AVM_LESSON.takehome.items.map((item, index) => (
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

      {/* Lightbox */}
      {zoomedImage && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={c(zoomedImage.alt)} onClick={() => setZoomed(null)}>
          <div className={styles.strokeImageModalContent} onClick={e => e.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setZoomed(null)} aria-label={copy.close}>×</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomedImage.src} alt={c(zoomedImage.alt)} />
            <p style={{ textAlign: 'center', marginTop: 10, opacity: 0.75, fontSize: 13 }}>
              <strong>{zoomedImage.label}</strong> — {c(zoomedImage.caption)}
            </p>
            <p style={{ textAlign: 'center', marginTop: 4, opacity: 0.5, fontSize: 11 }}>
              Case courtesy of Radiopaedia.org ·{' '}
              <a href={fall.attribution.caseUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                rID: {fall.attribution.caseId}
              </a>
              {fall.images.length > 1 && <span> · ← → {c({ de: 'zum Blättern', en: 'to navigate', fa: 'برای ناوبری' })}</span>}
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
