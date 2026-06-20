'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { CAA_LESSON } from '@/data/caa'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value

const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.' },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(v => !v)} aria-expanded={open}>
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
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={`${r}-${c}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Cards({ items, lang }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={L(item.title, lang)}>
          {item.icon && <span style={{ fontSize: 20, marginBottom: 4, display: 'block' }}>{item.icon}</span>}
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
      {authError && <div className={styles.readError}><span>{copy.auth}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function SubHeading({ children }) {
  return (
    <h3 style={{ marginTop: 24, marginBottom: 10, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
      {children}
    </h3>
  )
}

export default function CAAPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = CAA_LESSON.sections
  const path = '/gehirn/vaskulaer/caa'

  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const { isRead, toggleRead, authError } = useLessonReadStatus('caa')
  const [active, setActive] = useState('')

  useEffect(() => {
    const observers = sections.map(s => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setActive(s.id) }, { rootMargin: '-30% 0px -60% 0px' })
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sections])

  const rows = value => value.map(row => row.map(c))

  return (
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(CAA_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{CAA_LESSON.sourceLabel}</span>
            <h1>{c(CAA_LESSON.title)}</h1>
            <p>{c(CAA_LESSON.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=8&themen=caa&from=${encodeURIComponent(withLang(path))}`)}>
                🎯 MCQ
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/caa?from=${encodeURIComponent(withLang(path))}`)}>
                🧠 {c({ de: 'Flashcards', en: 'Flashcards', fa: 'فلش‌کارت' })}
              </Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {CAA_LESSON.heroCards.map(card => (
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
        {/* ── Sidebar TOC ──────────────────────────────────────────────── */}
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{c(CAA_LESSON.toc)}</div>
          {sections.map(s => (
            <button
              type="button"
              key={s.id}
              className={`${styles.sideItem} ${active === s.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>{s.icon}</span>
              <strong>{c(s.label)}</strong>
            </button>
          ))}
        </aside>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className={styles.main}>

          {/* 1 – Grundlagen */}
          <Section id="grundlagen" title={c(CAA_LESSON.grundlagen.title)} lead={c(CAA_LESSON.grundlagen.lead)}>
            <Cards items={CAA_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(CAA_LESSON.keyLabel)}>{c(CAA_LESSON.grundlagen.key)}</Callout>
          </Section>

          {/* 2 – Pathophysiologie */}
          <Section id="pathophysio" title={c(CAA_LESSON.pathophysio.title)} lead={c(CAA_LESSON.pathophysio.lead)}>
            <Table headers={CAA_LESSON.pathophysio.headers.map(c)} rows={rows(CAA_LESSON.pathophysio.rows)} />
            <Callout label={c(CAA_LESSON.keyLabel)}>{c(CAA_LESSON.pathophysio.key)}</Callout>
          </Section>

          {/* 3 – Lokalisation & Klinik */}
          <Section id="lokalisation" title={c(CAA_LESSON.lokalisation.title)} lead={c(CAA_LESSON.lokalisation.lead)}>
            <Table headers={CAA_LESSON.lokalisation.lokHeaders.map(c)} rows={rows(CAA_LESSON.lokalisation.lokRows)} />

            <SubHeading>{c(CAA_LESSON.lokalisation.klinikAkutTitle)}</SubHeading>
            <Cards items={CAA_LESSON.lokalisation.klinikAkutItems} lang={lang} />

            <SubHeading>{c(CAA_LESSON.lokalisation.klinikChronTitle)}</SubHeading>
            <Cards items={CAA_LESSON.lokalisation.klinikChronItems} lang={lang} />

            <Callout label={c(CAA_LESSON.keyLabel)}>{c(CAA_LESSON.lokalisation.key)}</Callout>
          </Section>

          {/* 4 – Boston-Kriterien v2.0 */}
          <Section id="boston" title={c(CAA_LESSON.boston.title)} lead={c(CAA_LESSON.boston.lead)}>
            <Table headers={CAA_LESSON.boston.criteriaHeaders.map(c)} rows={rows(CAA_LESSON.boston.criteriaRows)} />

            <SubHeading>{c(CAA_LESSON.boston.voraussTitle)}</SubHeading>
            <Cards items={CAA_LESSON.boston.voraussItems} lang={lang} />

            <Callout label={c(CAA_LESSON.keyLabel)}>{c(CAA_LESSON.boston.key)}</Callout>
          </Section>

          {/* 5 – MRT-Definitionen */}
          <Section id="mrt-def" title={c(CAA_LESSON.mrtDef.title)} lead={c(CAA_LESSON.mrtDef.lead)}>
            <SubHeading>{c({ de: 'Strikt lobäre hämorrhagische Läsionen', en: 'Strictly lobar haemorrhagic lesions', fa: 'ضایعات هموراژیک دقیقاً لوبار' })}</SubHeading>
            <Table headers={CAA_LESSON.mrtDef.lobHeaders.map(c)} rows={rows(CAA_LESSON.mrtDef.lobRows)} />

            <SubHeading>{c({ de: 'White-Matter-Marker', en: 'White Matter Markers', fa: 'نشانگرهای ماده سفید' })}</SubHeading>
            <Table headers={CAA_LESSON.mrtDef.wmHeaders.map(c)} rows={rows(CAA_LESSON.mrtDef.wmRows)} />

            <Callout label={c(CAA_LESSON.keyLabel)}>{c(CAA_LESSON.mrtDef.key)}</Callout>
          </Section>

          {/* 6 – Differenzialdiagnose */}
          <Section id="differenzial" title={c(CAA_LESSON.differenzial.title)} lead={c(CAA_LESSON.differenzial.lead)}>
            <Table headers={CAA_LESSON.differenzial.ddHeaders.map(c)} rows={rows(CAA_LESSON.differenzial.ddRows)} />
            <Callout label={c(CAA_LESSON.keyLabel)}>{c(CAA_LESSON.differenzial.key)}</Callout>
          </Section>

          {/* 7 – Take-home */}
          <Section id="takehome" title={c(CAA_LESSON.takehome.title)} lead={c(CAA_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {CAA_LESSON.takehome.items.map((item, i) => (
                <div className={styles.takeHomeItem} key={c(item.title)}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
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
    </main>
  )
}
