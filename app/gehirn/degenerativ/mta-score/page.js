'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { MTA_LESSON } from '@/data/mta-score'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value

const UI = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.' },
  en: { mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.' },
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

export default function MtaScorePage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = MTA_LESSON.sections
  const path = '/gehirn/degenerativ/mta-score'

  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const { isRead, toggleRead, authError } = useLessonReadStatus('mta-score')
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

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(MTA_LESSON.breadcrumb)}</span>
        </div>

        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{MTA_LESSON.sourceLabel}</span>
            <h1>{c(MTA_LESSON.title)}</h1>
            <p>{c(MTA_LESSON.definition)}</p>
          </div>
          <div className={styles.heroStats}>
            {MTA_LESSON.heroCards.map(card => (
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
          <div className={styles.sideTitle}>{c(MTA_LESSON.toc)}</div>
          {sections.map(s => (
            <button
              type="button"
              key={s.id}
              className={`${styles.sideItem} ${active === s.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={s.emphasis ? { color: '#f59e0b', border: '1px solid rgba(245,158,11,.48)', background: 'rgba(245,158,11,.12)', fontWeight: 950, boxShadow: '0 8px 20px rgba(245,158,11,.10)' } : undefined}
            >
              <span>{s.icon}</span>
              <strong>{c(s.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>

          <Section id="grundlagen" title={c(MTA_LESSON.grundlagen.title)} lead={c(MTA_LESSON.grundlagen.lead)}>
            <Cards items={MTA_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(MTA_LESSON.keyLabel)}>{c(MTA_LESSON.grundlagen.key)}</Callout>
          </Section>

          <Section id="technik" title={c(MTA_LESSON.technik.title)} lead={c(MTA_LESSON.technik.lead)}>
            <Table headers={MTA_LESSON.technik.headers.map(c)} rows={rows(MTA_LESSON.technik.rows)} />
            <Callout label={c(MTA_LESSON.keyLabel)}>{c(MTA_LESSON.technik.key)}</Callout>
          </Section>

          <Section id="score" title={c(MTA_LESSON.score.title)} lead={c(MTA_LESSON.score.lead)}>
            <Table headers={MTA_LESSON.score.headers.map(c)} rows={rows(MTA_LESSON.score.rows)} />
            <Callout label={c(MTA_LESSON.keyLabel)}>{c(MTA_LESSON.score.key)}</Callout>
          </Section>

          <Section id="grenzwerte" title={c(MTA_LESSON.grenzwerte.title)} lead={c(MTA_LESSON.grenzwerte.lead)}>
            <Table headers={MTA_LESSON.grenzwerte.headers.map(c)} rows={rows(MTA_LESSON.grenzwerte.rows)} />
            <Callout label={c(MTA_LESSON.caveLabel)} cave>{c(MTA_LESSON.grenzwerte.cave)}</Callout>
          </Section>

          <Section id="interpretation" title={c(MTA_LESSON.interpretation.title)} lead={c(MTA_LESSON.interpretation.lead)}>
            <Cards items={MTA_LESSON.interpretation.items} lang={lang} />
            <Callout label={c(MTA_LESSON.keyLabel)}>{c(MTA_LESSON.interpretation.key)}</Callout>
          </Section>

          <Section id="takehome" title={c(MTA_LESSON.takehome.title)} lead={c(MTA_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {MTA_LESSON.takehome.items.map((item, i) => (
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
