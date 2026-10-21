'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import LessonHero from '@/components/LessonHero'
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
  const [open, setOpen] = useState(id === 'grundlagen')

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
      <InProgressBanner lang={lang} />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(CADASIL_LESSON.breadcrumb)}</span>
        </div>

        <LessonHero
          title={c(CADASIL_LESSON.title)}
          imageSrc="/cadasil/hero.svg"
          imageAlt={c({ de: 'Schematische Verteilung der CADASIL-Läsionen in Marklager, Temporalpol, Capsula externa und Corpus callosum.', en: 'Schematic distribution of CADASIL lesions in white matter, temporal poles, external capsules and corpus callosum.', fa: 'نمای شماتیک توزیع ضایعات CADASIL در ماده سفید، قطب تمپورال، کپسول خارجی و جسم پینه‌ای.' })}
          lang={lang}
        />
        <div className={styles.actions}>
          <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=13&themen=cadasil&from=${encodeURIComponent(withLang('/gehirn/vaskulaer/cadasil'))}`)}>🎯 {copy.actionMcq}</Link>
          <Link className={styles.actionBtn} href={withLang(`/flashcards/cadasil?from=${encodeURIComponent(withLang('/gehirn/vaskulaer/cadasil'))}`)}>🧠 {copy.actionFlash}</Link>
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
            <p className={styles.lead}>{c({ de: 'Schematische Übersicht der beteiligten Marklagerregionen; sie ersetzt nicht die Beurteilung der individuellen MRT-Verteilung.', en: 'Schematic overview of involved white-matter regions; it does not replace assessment of the individual MRI distribution.', fa: 'نمای شماتیک نواحی درگیر ماده سفید؛ جایگزین ارزیابی توزیع MRI در هر بیمار نیست.' })}</p>
            <img src="/cadasil/distribution.svg" alt={c({ de: 'Schematischer axialer Überblick mit relativer kortikaler Aussparung und beispielhaften Läsionen im Marklager, frontoparietalen Marklager, Corpus callosum und an den anterioren Temporalpolen.', en: 'Schematic axial overview with relative cortical sparing and example lesions in white matter, frontal-parietal white matter, corpus callosum and anterior temporal poles.', fa: 'نمای محوری شماتیک با حفظ نسبی قشر و نمونه ضایعات در ماده سفید، ماده سفید فرونتوپاریتال، جسم پینه‌ای و قطب‌های قدامی تمپورال.' })} style={{ display: 'block', width: 'min(100%, 620px)', height: 'auto', margin: '20px auto' }} />
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', justifyContent: 'center', listStyle: 'none', padding: 0, margin: '-10px auto 20px', fontSize: '0.9rem' }}>
              {[
                { color: '#1687ae', text: c({ de: 'Beispielhafte Marklagerherde', en: 'Example white-matter lesions', fa: 'نمونه ضایعات ماده سفید' }) },
                { color: '#42a9c6', text: c({ de: 'Frontoparietales Marklager', en: 'Frontal-parietal white matter', fa: 'ماده سفید فرونتوپاریتال' }) },
                { color: '#e2b555', text: c({ de: 'Corpus callosum', en: 'Corpus callosum', fa: 'جسم پینه‌ای' }) },
                { color: '#d27a68', text: c({ de: 'Anteriore Temporalpole', en: 'Anterior temporal poles', fa: 'قطب‌های قدامی تمپورال' }) },
              ].map(item => <li key={item.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span aria-hidden="true" style={{ width: 11, height: 11, borderRadius: '50%', background: item.color, display: 'inline-block' }} />{item.text}</li>)}
            </ul>
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
            <CaseGallery fall={CADASIL_LESSON.fall} lang={lang} copy={copy} onZoom={setZoomed} />

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
