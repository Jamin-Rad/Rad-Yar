'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { TELEANGIEKTASIE_LESSON } from '@/data/kapillaere-teleangiektasie'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', openCase: 'Fall in Radiopaedia öffnen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', openCase: 'Open case in Radiopaedia', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', openCase: 'باز کردن کیس در Radiopaedia', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت' },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return <section id={id} className={styles.section}>
    <button type="button" className={styles.sectionHeader} onClick={() => setOpen(v => !v)} aria-expanded={open}><h2>{title}</h2><span>{open ? '−' : '+'}</span></button>
    {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
  </section>
}

function Table({ headers, rows }) {
  return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={`${i}-${j}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function Cards({ items, lang }) {
  return <div className={styles.cardsGrid}>{items.map(item => <div className={styles.infoCard} key={L(item.title, lang)}><span className={styles.cardIcon}>{item.icon}</span><h3>{L(item.title, lang)}</h3><p>{L(item.text, lang)}</p></div>)}</div>
}

function Callout({ label, cave = false, children }) {
  return <div className={`${styles.callout} ${cave ? styles.cave : ''}`}><strong>{cave ? '⚠️' : '💡'} {label}</strong><p>{children}</p></div>
}

function ReadButton({ isRead, toggleRead, authError, copy }) {
  return <div className={styles.readControl}><button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}><span className={styles.readCheck}>{isRead ? '✓' : ''}</span><span>{isRead ? copy.read : copy.mark}</span></button>{authError && <div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}</div>
}

export default function KapillaereTeleangiektasiePage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const lesson = TELEANGIEKTASIE_LESSON
  const { isRead, toggleRead, authError } = useLessonReadStatus('kapillaere-teleangiektasie')
  const [active, setActive] = useState('')
  const [zoomed, setZoomed] = useState(null)
  const route = '/gehirn/vaskulaer/kapillaere-teleangiektasie'
  const withLang = href => lang === 'de' ? href : `/${lang}${href}`
  const rows = value => value.map(row => row.map(c))

  useEffect(() => {
    const observers = lesson.sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setActive(section.id) }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [lesson.sections])

  useEffect(() => {
    if (zoomed === null) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = event => { if (event.key === 'Escape') setZoomed(null) }
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', key) }
  }, [zoomed])

  const zoomedCase = zoomed === null ? null : lesson.fall.cases[zoomed]
  return <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <InProgressBanner lang={lang} />
    <header className={styles.header}>
      <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link><span>›</span><span>{c(lesson.breadcrumb)}</span></div>
      <div className={styles.hero}>
        <div className={styles.heroText}><span className={styles.sourceBadge}>{lesson.sourceLabel}</span><h1>{c(lesson.title)}</h1><p>{c(lesson.definition)}</p>
          <div className={styles.actions}>
            <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=kapillaere-teleangiektasie&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link>
            <Link className={styles.actionBtn} href={withLang(`/flashcards/kapillaere-teleangiektasie?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link>
          </div>
        </div>
        <div className={styles.heroStats}>{lesson.heroCards.map(card => <div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div>
      </div>
    </header>
    <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><div className={styles.sideTitle}>{c(lesson.toc)}</div>{lesson.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })} style={section.emphasis ? { color: '#f59e0b', border: '1px solid rgba(245,158,11,.48)', background: 'rgba(245,158,11,.12)', fontWeight: 950, boxShadow: '0 8px 20px rgba(245,158,11,.10)' } : undefined}><span>{section.icon}</span><strong>{c(section.label)}</strong></button>)}</aside>
      <div className={styles.main}>
        <Section id="grundlagen" title={c(lesson.grundlagen.title)} lead={c(lesson.grundlagen.lead)}><Cards items={lesson.grundlagen.items} lang={lang} /><Callout label={c(lesson.keyLabel)}>{c(lesson.grundlagen.key)}</Callout></Section>
        <Section id="klinik" title={c(lesson.klinik.title)} lead={c(lesson.klinik.lead)}><Table headers={lesson.klinik.headers.map(c)} rows={rows(lesson.klinik.rows)} /><Callout label={c(lesson.caveLabel)} cave>{c(lesson.klinik.cave)}</Callout></Section>
        <Section id="bildgebung" title={c(lesson.bildgebung.title)} lead={c(lesson.bildgebung.lead)}><Table headers={lesson.bildgebung.headers.map(c)} rows={rows(lesson.bildgebung.rows)} /><Callout label={c(lesson.keyLabel)}>{c(lesson.bildgebung.key)}</Callout></Section>
        <Section id="trias" title={c(lesson.trias.title)} lead={c(lesson.trias.lead)}><Cards items={lesson.trias.items} lang={lang} /><Callout label={c(lesson.keyLabel)}>{c(lesson.trias.key)}</Callout></Section>
        <Section id="differenzial" title={c(lesson.differenzial.title)} lead={c(lesson.differenzial.lead)}><Table headers={lesson.differenzial.headers.map(c)} rows={rows(lesson.differenzial.rows)} /></Section>
        <Section id="fall" title={c(lesson.fall.title)} lead={c(lesson.fall.lead)}>
          <div className={styles.caseGrid}>{lesson.fall.cases.map((item, index) => <article className={styles.caseCardLink} key={item.url}>
            <div className={styles.teleangiectasiaCaseImage}><button type="button" className={styles.strokeCaseZoom} onClick={() => setZoomed(index)} aria-label={`${copy.zoom}: ${c(item.alt)}`}><Image src={item.image} alt={c(item.alt)} width={650} height={650} className={styles.caseImageAsset} /></button></div>
            <div className={styles.caseBody}><div className={styles.caseLabelRow}>{item.tags.map(tag => <span className={styles.caseLabel} key={tag}>{tag}</span>)}</div><h3>{c(item.title)}</h3><p>{c(item.meta)}</p><small>{item.credit}</small><a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{copy.openCase} ↗</a></div>
          </article>)}</div>
          <h3 className={styles.subsectionTitle}>{c(lesson.fall.findingsTitle)}</h3><div className={styles.cardsGrid}>{lesson.fall.findings.map((finding, index) => <div className={styles.infoCard} key={c(finding)}><span className={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span><p>{c(finding)}</p></div>)}</div><Callout label={c({ de: 'Diagnose', en: 'Diagnosis', fa: 'تشخیص' })}>{c(lesson.fall.diagnosis)}</Callout>
        </Section>
        <Section id="management" title={c(lesson.management.title)} lead={c(lesson.management.lead)}><Cards items={lesson.management.items} lang={lang} /><Callout label={c(lesson.caveLabel)} cave>{c(lesson.management.cave)}</Callout></Section>
        <Section id="befundung" title={c(lesson.befundung.title)} lead={c(lesson.befundung.lead)}><Cards items={lesson.befundung.items} lang={lang} /></Section>
        <Section id="takehome" title={c(lesson.takehome.title)} lead={c(lesson.takehome.lead)}><div className={styles.takeHomeGrid}>{lesson.takehome.items.map((item, index) => <div className={styles.takeHomeItem} key={c(item.title)}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div></Section>
        <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
      </div>
    </div>
    {zoomedCase && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={c(zoomedCase.alt)} onClick={() => setZoomed(null)}><div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}><button type="button" className={styles.strokeImageModalClose} onClick={() => setZoomed(null)} aria-label={copy.close}>×</button><img src={zoomedCase.image} alt={c(zoomedCase.alt)} /><p>{c(zoomedCase.title)}</p></div></div>}
  </main>
}
