'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import LessonHero from '@/components/LessonHero'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { AVM_LESSON, AVM_QUESTIONS } from '@/data/avm'
import TopicAssessment from '@/components/lesson-template/TopicAssessment'
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
    caseSource: 'Fall mit freundlicher Genehmigung von Radiopaedia.org',
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
    caseSource: 'کیس با اجازه از Radiopaedia.org',
  },
}

function Section({ id, icon, title, lead, children, open, onToggle }) {
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={onToggle} aria-expanded={open}>
        <h2><span aria-hidden="true">{icon}</span> {title}</h2>
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
  const [openSection, setOpenSection] = useState('grundlagen')
  const [zoomed, setZoomed] = useState(null)
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const fall = AVM_LESSON.fall

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.slice(1)
      if (sections.some(section => section.id === id)) {
        setActive(id)
        setOpenSection(id)
      }
    }
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    window.addEventListener('popstate', syncFromHash)
    const observers = sections.map(section => {
      const el = document.getElementById(section.id)
      if (!el) return null
      const obs = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            setActive(section.id)
            setOpenSection(section.id)
            window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${section.id}`)
          }
        },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => {
      observers.forEach(o => o?.disconnect())
      window.removeEventListener('hashchange', syncFromHash)
      window.removeEventListener('popstate', syncFromHash)
    }
  }, [sections])

  const toggleSection = id => {
    const next = openSection === id ? '' : id
    setOpenSection(next)
    setActive(next)
    const path = `${window.location.pathname}${window.location.search}${next ? `#${next}` : ''}`
    window.history.pushState(null, '', path)
  }

  const navigateSection = id => {
    setOpenSection(id)
    setActive(id)
    window.history.pushState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

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
    <LegacyLessonMigration lessonRoute="/gehirn/vaskulaer/avm-zns" lessonId="/gehirn/vaskulaer/avm-zns" lang={lang}>
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
            <LessonHero title={c(AVM_LESSON.title)} lang={lang} imageSrc="/avm/hero-generated.webp" imageAlt={c(AVM_LESSON.grundlagen.heroAlt)} />
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=avm-zns&from=${encodeURIComponent(withLang('/gehirn/vaskulaer/avm-zns'))}`)}>
                🎯 {copy.actionMcq}
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/avm-zns?from=${encodeURIComponent(withLang('/gehirn/vaskulaer/avm-zns'))}`)}>
                🧠 {copy.actionFlash}
              </Link>
            </div>
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
              onClick={() => navigateSection(section.id)}
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
          <Section migrationChapter id="grundlagen" icon={sections[0].icon} title={c(AVM_LESSON.grundlagen.title)} lead={c(AVM_LESSON.grundlagen.lead)} open={openSection === 'grundlagen'} onToggle={() => toggleSection('grundlagen')}>
            <h3>{c({ de: 'Lernziele', en: 'Learning objectives', fa: 'اهداف یادگیری' })}</h3>
            <ul>{AVM_LESSON.learningObjectives.map(goal => <li key={c(goal)}>{c(goal)}</li>)}</ul>
            <figure style={{ margin: '0 0 20px', padding: 16, borderRadius: 14, background: 'rgba(124,58,237,.06)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avm/flow-path.svg" alt={c(AVM_LESSON.grundlagen.visualAlt)} style={{ display: 'block', width: '100%', maxWidth: 720, margin: '0 auto' }} />
              <div dir="ltr" aria-label={c({ de: 'Blutfluss durch die AVM', en: 'Blood flow through the AVM', fa: 'جریان خون در AVM' })} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 9, marginTop: 10 }}>
                <strong>{c({ de: 'Feeder-Arterie', en: 'Feeding artery', fa: 'شریان تغذیه‌کننده' })}</strong><span aria-hidden="true">→</span>
                <strong>{c({ de: 'Nidus', en: 'Nidus', fa: 'نیدوس' })}</strong><span aria-hidden="true">→</span>
                <strong>{c({ de: 'drainierende Vene', en: 'draining vein', fa: 'ورید تخلیه‌کننده' })}</strong>
              </div>
              <figcaption dir={rtl ? 'rtl' : 'ltr'} style={{ textAlign: 'center', marginTop: 8, opacity: .8 }}>{c({ de: 'Das Schema erklärt die Komponenten und ersetzt keine Angiographie.', en: 'This diagram explains the components; it does not replace angiography.', fa: 'این شماتیک اجزا را توضیح می‌دهد و جایگزین آنژیوگرافی نیست.' })}</figcaption>
            </figure>
            <Cards items={AVM_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(AVM_LESSON.keyLabel)}>{c(AVM_LESSON.grundlagen.key)}</Callout>
          </Section>

          {/* Klinik */}
          <Section migrationChapter id="klinik" icon={sections[1].icon} title={c(AVM_LESSON.klinik.title)} lead={c(AVM_LESSON.klinik.lead)} open={openSection === 'klinik'} onToggle={() => toggleSection('klinik')}>
            <Table headers={AVM_LESSON.klinik.headers.map(c)} rows={rows(AVM_LESSON.klinik.rows)} />
            <p>{c(AVM_LESSON.klinik.assessment)}</p>
            <Callout label={c(AVM_LESSON.caveLabel)} cave>{c(AVM_LESSON.klinik.cave)}</Callout>
          </Section>

          {/* Spetzler-Martin */}
          <Section migrationChapter id="spetzler" icon={sections[2].icon} title={c(AVM_LESSON.spetzler.title)} lead={c(AVM_LESSON.spetzler.lead)} open={openSection === 'spetzler'} onToggle={() => toggleSection('spetzler')}>
            <h3 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {c({ de: 'Kriterienpunkte', en: 'Scoring criteria', fa: 'معیارهای امتیازدهی' })}
            </h3>
            <Table headers={AVM_LESSON.spetzler.headers.map(c)} rows={rows(AVM_LESSON.spetzler.rows)} />
            <h3 style={{ margin: '20px 0 10px', fontSize: 14, fontWeight: 700, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {c({ de: 'Graduierung & operative Risikoklasse', en: 'Grade & operative risk class', fa: 'درجه و رده خطر جراحی' })}
            </h3>
            <Table headers={AVM_LESSON.spetzler.summary.headers.map(c)} rows={rows(AVM_LESSON.spetzler.summary.rows)} />
            <Callout label={c(AVM_LESSON.keyLabel)}>{c(AVM_LESSON.spetzler.key)}</Callout>
            <TopicAssessment key={`avm-09-${lang}`} question={AVM_QUESTIONS[lang]?.find(q => q.id === `avm-zns-${lang}-09`)} topic="avm-zns" lang={lang} fach="gehirn" returnTo={withLang('/gehirn/vaskulaer/avm-zns')} />
          </Section>

          {/* Bildgebung */}
          <Section migrationChapter id="bildgebung" icon={sections[3].icon} title={c(AVM_LESSON.bildgebung.title)} lead={c(AVM_LESSON.bildgebung.lead)} open={openSection === 'bildgebung'} onToggle={() => toggleSection('bildgebung')}>
            <Table headers={AVM_LESSON.bildgebung.headers.map(c)} rows={rows(AVM_LESSON.bildgebung.rows)} />
            <Callout label={c(AVM_LESSON.keyLabel)}>{c(AVM_LESSON.bildgebung.key)}</Callout>
            <TopicAssessment key={`avm-08-${lang}`} question={AVM_QUESTIONS[lang]?.find(q => q.id === `avm-zns-${lang}-08`)} topic="avm-zns" lang={lang} fach="gehirn" returnTo={withLang('/gehirn/vaskulaer/avm-zns')} />
          </Section>

          {/* Fallbeispiel */}
          <Section migrationChapter id="fall" icon={sections[4].icon} title={c(fall.title)} lead={c(fall.lead)} open={openSection === 'fall'} onToggle={() => toggleSection('fall')}>
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
                      }}>{c(image.label)}</span>
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
          <Section migrationChapter id="differenzial" icon={sections[5].icon} title={c(AVM_LESSON.differenzial.title)} lead={c(AVM_LESSON.differenzial.lead)} open={openSection === 'differenzial'} onToggle={() => toggleSection('differenzial')}>
            <Table headers={AVM_LESSON.differenzial.headers.map(c)} rows={rows(AVM_LESSON.differenzial.rows)} />
          </Section>

          {/* Management */}
          <Section migrationChapter id="management" icon={sections[6].icon} title={c(AVM_LESSON.management.title)} lead={c(AVM_LESSON.management.lead)} open={openSection === 'management'} onToggle={() => toggleSection('management')}>
            <Cards items={AVM_LESSON.management.items} lang={lang} />
            <Callout label={c(AVM_LESSON.caveLabel)} cave>{c(AVM_LESSON.management.cave)}</Callout>
            <TopicAssessment key={`avm-10-${lang}`} question={AVM_QUESTIONS[lang]?.find(q => q.id === `avm-zns-${lang}-10`)} topic="avm-zns" lang={lang} fach="gehirn" returnTo={withLang('/gehirn/vaskulaer/avm-zns')} />
          </Section>

          {/* Take-Home */}
          <Section migrationChapter id="takehome" icon={sections[7].icon} title={c(AVM_LESSON.takehome.title)} lead={c(AVM_LESSON.takehome.lead)} open={openSection === 'takehome'} onToggle={() => toggleSection('takehome')}>
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

          <footer aria-label={c({ de: 'Quellen', en: 'Sources', fa: 'منابع' })} style={{ marginTop: 24 }}>
            <h3>{c({ de: 'Quellen', en: 'Sources', fa: 'منابع' })}</h3>
            <ul>{AVM_LESSON.references.map(ref => <li key={ref.label}>{ref.url ? <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.label}</a> : ref.label}</li>)}</ul>
          </footer>
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
              <strong>{c(zoomedImage.label)}</strong> — {c(zoomedImage.caption)}
            </p>
            <p style={{ textAlign: 'center', marginTop: 4, opacity: 0.5, fontSize: 11 }}>
              {copy.caseSource} ·{' '}
              <a href={fall.attribution.caseUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                rID: {fall.attribution.caseId}
              </a>
              {fall.images.length > 1 && <span> · ← → {c({ de: 'zum Blättern', en: 'to navigate', fa: 'برای ناوبری' })}</span>}
            </p>
          </div>
        </div>
      )}
    </main>
    </LegacyLessonMigration>
  )
}
