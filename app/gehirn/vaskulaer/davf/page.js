'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { DAVF_LESSON } from '@/data/davf'
import LessonHero from '@/components/LessonHero'
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
  const section = DAVF_LESSON.sections.find(item => item.id === id)

  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2><span aria-hidden="true">{section?.icon} </span>{title}</h2>
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
        <thead><tr>{headers.map((header, i) => <th key={i}>{header}</th>)}</tr></thead>
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

export default function DavfPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const sections = DAVF_LESSON.sections
  const { isRead, toggleRead, authError } = useLessonReadStatus('davf')
  const [active, setActive] = useState('')
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

  const rows = value => value.map(row => row.map(c))

  return (
    <LegacyLessonMigration lessonRoute="/gehirn/vaskulaer/davf" lessonId="/gehirn/vaskulaer/davf" lang={lang}>
    <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/gehirn')}>{c({ de: 'Kopf', en: 'Head', fa: 'سر' })}</Link>
          <span>›</span>
          <span>{c(DAVF_LESSON.breadcrumb)}</span>
        </div>

        <LessonHero title={c(DAVF_LESSON.title)} imageSrc="/davf/hero.svg" imageAlt={c({ de: 'Schema einer duralen AV-Fistel mit duralem Sinus und venösem Abfluss.', en: 'Diagram of a dural AV fistula with dural sinus and venous outflow.', fa: 'طرح‌واره فیستول دورال AV با سینوس دورال و خروج وریدی.' })} />
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=davf&from=${encodeURIComponent(withLang('/gehirn/vaskulaer/davf'))}`)}>
                🎯 {copy.actionMcq}
              </Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/davf?from=${encodeURIComponent(withLang('/gehirn/vaskulaer/davf'))}`)}>
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
          <div className={styles.sideTitle}>{c(DAVF_LESSON.toc)}</div>
          {sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={section.emphasis ? {
                color: '#dc2626',
                border: '1px solid rgba(220, 38, 38, .48)',
                background: 'rgba(220, 38, 38, .12)',
                fontWeight: 950,
                boxShadow: '0 8px 20px rgba(220, 38, 38, .10)',
              } : undefined}
            >
              <span>{section.icon}</span>
              <strong>{c(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section migrationChapter id="grundlagen" title={c(DAVF_LESSON.grundlagen.title)} lead={c(DAVF_LESSON.grundlagen.lead)}>
            <Cards items={DAVF_LESSON.grundlagen.items} lang={lang} />
            <Callout label={c(DAVF_LESSON.keyLabel)}>{c(DAVF_LESSON.grundlagen.key)}</Callout>
          </Section>

          <Section migrationChapter id="klinik" title={c(DAVF_LESSON.klinik.title)} lead={c(DAVF_LESSON.klinik.lead)}>
            <Table headers={DAVF_LESSON.klinik.headers.map(c)} rows={rows(DAVF_LESSON.klinik.rows)} />
            <Callout label={c(DAVF_LESSON.caveLabel)} cave>{c(DAVF_LESSON.klinik.cave)}</Callout>
          </Section>

          <Section migrationChapter id="cognard" title={c(DAVF_LESSON.cognard.title)} lead={c(DAVF_LESSON.cognard.lead)}>
            <Table headers={DAVF_LESSON.cognard.headers.map(c)} rows={rows(DAVF_LESSON.cognard.rows)} />
            <figure style={{ margin: '1.5rem 0', padding: '1rem', borderRadius: 16, background: 'rgba(127, 127, 127, .07)' }}>
              <Image src="/davf/drainage-patterns.svg" alt={c({ de: 'Zwei schematische Abflussmuster: links antegrader Abfluss in den Sinus, rechts Reflux in eine kortikale Vene.', en: 'Two schematic drainage patterns: antegrade flow into the sinus on the left and reflux into a cortical vein on the right.', fa: 'دو الگوی شماتیک درناژ: در چپ جریان آنتروگراد به سینوس و در راست رفلاکس به ورید کورتیکال.' })} width={900} height={360} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <figcaption style={{ marginTop: 12, lineHeight: 1.8 }}>
                <div>{c({ de: '1 · Antegrader Sinusabfluss ohne CVD. 2 · Reflux in kortikale Venen = CVD (Cognard IIb, IIa+b, III oder IV).', en: '1 · Antegrade sinus drainage without CVD. 2 · Reflux into cortical veins = CVD (Cognard IIb, IIa+b, III or IV).', fa: '۱ · درناژ آنتروگراد به سینوس بدون CVD. ۲ · رفلاکس به وریدهای کورتیکال = CVD (Cognard IIb، IIa+b، III یا IV).' })}</div>
                <div>{c({ de: 'Rot: arterieller Feeder · Blau: Sinusabfluss · Violett: kortikaler Reflux', en: 'Red: arterial feeder · Blue: sinus drainage · Purple: cortical reflux', fa: 'قرمز: تغذیه‌کننده شریانی · آبی: درناژ سینوسی · بنفش: رفلاکس کورتیکال' })}</div>
              </figcaption>
            </figure>
            <Callout label={c(DAVF_LESSON.keyLabel)}>{c(DAVF_LESSON.cognard.key)}</Callout>
          </Section>

          <Section migrationChapter id="bildgebung" title={c(DAVF_LESSON.bildgebung.title)} lead={c(DAVF_LESSON.bildgebung.lead)}>
            <Table headers={DAVF_LESSON.bildgebung.headers.map(c)} rows={rows(DAVF_LESSON.bildgebung.rows)} />
            <Callout label={c(DAVF_LESSON.keyLabel)}>{c(DAVF_LESSON.bildgebung.key)}</Callout>
          </Section>

          <Section migrationChapter id="differenzial" title={c(DAVF_LESSON.differenzial.title)} lead={c(DAVF_LESSON.differenzial.lead)}>
            <Table headers={DAVF_LESSON.differenzial.headers.map(c)} rows={rows(DAVF_LESSON.differenzial.rows)} />
          </Section>

          <Section migrationChapter id="management" title={c(DAVF_LESSON.management.title)} lead={c(DAVF_LESSON.management.lead)}>
            <Cards items={DAVF_LESSON.management.items} lang={lang} />
            <Callout label={c(DAVF_LESSON.caveLabel)} cave>{c(DAVF_LESSON.management.cave)}</Callout>
          </Section>

          <Section migrationChapter id="takehome" title={c(DAVF_LESSON.takehome.title)} lead={c(DAVF_LESSON.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {DAVF_LESSON.takehome.items.map((item, index) => (
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
    </main>
    </LegacyLessonMigration>
  )
}
