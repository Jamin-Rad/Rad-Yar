'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { SAB_LESSON } from '@/data/sab'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InProgressBanner from '@/components/InProgressBanner'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

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

function FisherTable({ headers, rows, lang }) {
  const RISK_COLORS = { '~0 %': '#6b7280', '~6 %': '#16a34a', '~14 %': '#d97706', '~12 %': '#ea580c', '~28 %': '#dc2626' }
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const riskCell = row[3]
            const color = RISK_COLORS[riskCell] || 'inherit'
            return (
              <tr key={rowIndex}>
                <td><strong style={{ fontSize: 18 }}>{row[0]}</strong></td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td><strong style={{ color }}>{riskCell}</strong></td>
                <td>{row[4]}</td>
              </tr>
            )
          })}
        </tbody>
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

export default function SubarachnoidalblutungPage() {
  const { lang } = useLanguage()
  const c = value => localize(value, lang)
  const isRTL = lang === 'fa'
  const sections = SAB_LESSON.sections.map(section => ({ ...section, label: c(section.label) }))
  const [activeId, setActiveId] = useState(sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('subarachnoidalblutung')
  const lessonPath = '/gehirn/vaskulaer/subarachnoidalblutung'
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
      <InProgressBanner lang={lang} />
      <main className={`${styles.page} ${styles.strokePage}`} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href={withLang('/')}>RadYar</Link><span>›</span>
            <Link href={withLang('/lernen/gehirn')}>{c(SAB_LESSON.breadcrumbArea)}</Link><span>›</span>
            <span>{c(SAB_LESSON.breadcrumbCurrent)}</span>
          </div>
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <span className={styles.sourceBadge}>{SAB_LESSON.sourceLabel}</span>
              <h1>{c(SAB_LESSON.title)}</h1>
              <p>{c(SAB_LESSON.subtitle)}</p>
              <div className={styles.actions}>
                <Link href={withLang(`/ueben/quiz?fach=gehirn&n=15&themen=subarachnoidalblutung&from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>🎯 {SAB_LESSON.actionMcq}</Link>
                <Link href={withLang(`/flashcards/subarachnoidalblutung?from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>🧠 {c(SAB_LESSON.actionFlash)}</Link>
              </div>
            </div>
            <div className={styles.heroStats}>
              {SAB_LESSON.heroCards.map(card => (
                <div className={styles.heroStat} key={c(card.label)}>
                  <strong>{card.value}</strong>
                  <span>{c(card.label)}</span>
                  <small>{c(card.text)}</small>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className={styles.readBar}>
          <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} />
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sideTitle}>{c(SAB_LESSON.toc)}</div>
            {sections.map(section => (
              <button
                type="button"
                key={section.id}
                data-section-id={section.id}
                className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                <span>{section.icon}</span><strong>{section.label}</strong>
              </button>
            ))}
          </aside>

          <div className={styles.main}>

            {/* ── 1. Klinik & Ätiologie ──────────────────────────────────── */}
            <Section id="klinik" title={c(SAB_LESSON.klinik.title)} lead={c(SAB_LESSON.klinik.lead)}>
              <Cards items={localizedItems(SAB_LESSON.klinik.definitionItems, lang)} />
              <Table
                headers={SAB_LESSON.klinik.aetiologyHeaders.map(c)}
                rows={localizedRows(SAB_LESSON.klinik.aetiologyRows, lang)}
              />
              <Callout type="cave" label={c(SAB_LESSON.caveLabel)}>{c(SAB_LESSON.klinik.cave)}</Callout>
              <Callout label={c(SAB_LESSON.keyLabel)}>{c(SAB_LESSON.klinik.key)}</Callout>
            </Section>

            {/* ── 2. CT-Diagnostik ─────────────────────────────────────────── */}
            <Section id="ct" title={c(SAB_LESSON.ct.title)} lead={c(SAB_LESSON.ct.lead)}>
              <Table
                headers={SAB_LESSON.ct.stagesHeaders.map(c)}
                rows={localizedRows(SAB_LESSON.ct.stagesRows, lang)}
              />
              <h3 style={{ margin: '32px 0 12px', fontSize: 15, fontWeight: 700 }}>
                {c({ de: 'CT- und MRT-Zeichen der SAB', en: 'CT and MRI signs of SAH', fa: 'علائم CT و MRI در SAB' })}
              </h3>
              <Cards items={localizedItems(SAB_LESSON.ct.signItems, lang)} />
              <Callout type="cave" label={c(SAB_LESSON.caveLabel)}>{c(SAB_LESSON.ct.key)}</Callout>
            </Section>

            {/* ── 3. Modifizierte Fisher-Skala ────────────────────────────── */}
            <Section id="fisher" title={c(SAB_LESSON.fisher.title)} lead={c(SAB_LESSON.fisher.lead)}>
              <FisherTable
                headers={SAB_LESSON.fisher.tableHeaders.map(c)}
                rows={localizedRows(SAB_LESSON.fisher.tableRows, lang)}
                lang={lang}
              />
              <h3 style={{ margin: '32px 0 12px', fontSize: 15, fontWeight: 700 }}>
                {c(SAB_LESSON.fisher.comparisonTitle)}
              </h3>
              <Cards items={localizedItems(SAB_LESSON.fisher.comparisonItems, lang)} />
              <Callout type="cave" label={c(SAB_LESSON.caveLabel)}>{c(SAB_LESSON.fisher.cave)}</Callout>
              <Callout label={c(SAB_LESSON.keyLabel)}>{c(SAB_LESSON.fisher.key)}</Callout>
            </Section>

            {/* ── 4. Gefäßdarstellung ───────────────────────────────────────── */}
            <Section id="gefaesse" title={c(SAB_LESSON.gefaesse.title)} lead={c(SAB_LESSON.gefaesse.lead)}>
              <Cards items={localizedItems(SAB_LESSON.gefaesse.imagingItems, lang)} />
              <Callout label={c(SAB_LESSON.keyLabel)}>{c(SAB_LESSON.gefaesse.key)}</Callout>
            </Section>

            {/* ── 5. Komplikationen ─────────────────────────────────────────── */}
            <Section id="komplikationen" title={c(SAB_LESSON.komplikationen.title)} lead={c(SAB_LESSON.komplikationen.lead)}>
              <Cards items={localizedItems(SAB_LESSON.komplikationen.compItems, lang)} />
              <Callout type="cave" label={c(SAB_LESSON.caveLabel)}>{c(SAB_LESSON.komplikationen.cave)}</Callout>
              <Callout label={c(SAB_LESSON.keyLabel)}>{c(SAB_LESSON.komplikationen.key)}</Callout>
            </Section>

            {/* ── 6. Take home ─────────────────────────────────────────────── */}
            <Section id="takehome" title={c(SAB_LESSON.takehome.title)} lead={c(SAB_LESSON.takehome.lead)}>
              <div className={styles.takeHomeGrid}>
                {localizedItems(SAB_LESSON.takehome.items, lang).map((item, index) => (
                  <div className={styles.takeHomeItem} key={item.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </div>
                ))}
              </div>
            </Section>

            <div className={styles.readBarBottom}>
              <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
