'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { SVT_LESSON } from '@/data/sinusvenenthrombose'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (value, lang) => value?.[lang] || value?.de || value
const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', imageTitle: 'Stadienabhängiges MRT-Signal' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', imageTitle: 'Stage-dependent MRI signal' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن تصویر', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت لطفاً وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', imageTitle: 'سیگنال MRI وابسته به مرحله' },
}

function Section({ id, title, lead, children }) {
  const mobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!mobile), [mobile, id])
  return <section id={id} className={styles.section}><button type="button" className={styles.sectionHeader} onClick={() => setOpen(v => !v)} aria-expanded={open}><h2>{title}</h2><span>{open ? '−' : '+'}</span></button>{open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}</section>
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

export default function SinusvenenthrombosePage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = value => L(value, lang)
  const rtl = lang === 'fa'
  const { isRead, toggleRead, authError } = useLessonReadStatus('sinusvenenthrombose')
  const [active, setActive] = useState('')
  const [zoomed, setZoomed] = useState(false)
  const route = '/gehirn/vaskulaer/sinusvenenthrombose'
  const withLang = href => lang === 'de' ? href : `/${lang}${href}`
  const rows = value => value.map(row => row.map(c))

  useEffect(() => {
    const observers = SVT_LESSON.sections.map(section => {
      const element = document.getElementById(section.id)
      if (!element) return null
      const observer = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setActive(section.id) }, { rootMargin: '-30% 0px -60% 0px' })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [])

  return <main className={`${styles.page} ${styles.strokePage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
    <InProgressBanner lang={lang} />
    <header className={styles.header}>
      <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/gehirn')}>{c({de:'Kopf',en:'Head',fa:'سر'})}</Link><span>›</span><span>{c(SVT_LESSON.breadcrumb)}</span></div>
      <div className={styles.hero}>
        <div className={styles.heroText}><span className={styles.sourceBadge}>{SVT_LESSON.sourceLabel}</span><h1>{c(SVT_LESSON.title)}</h1><p>{c(SVT_LESSON.definition)}</p><div className={styles.actions}><Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=gehirn&n=12&themen=sinusvenenthrombose&from=${encodeURIComponent(withLang(route))}`)}>🎯 {copy.mcq}</Link><Link className={styles.actionBtn} href={withLang(`/flashcards/sinusvenenthrombose?from=${encodeURIComponent(withLang(route))}`)}>🧠 {copy.flash}</Link></div></div>
        <div className={styles.heroStats}>{SVT_LESSON.heroCards.map(card => <div className={styles.heroStat} key={c(card.value)}><strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}</div>
      </div>
    </header>
    <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><div className={styles.sideTitle}>{c(SVT_LESSON.toc)}</div>{SVT_LESSON.sections.map(section => <button type="button" key={section.id} className={`${styles.sideItem} ${active === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({behavior:'smooth'})} style={section.emphasis ? {color:'#f59e0b',border:'1px solid rgba(245,158,11,.48)',background:'rgba(245,158,11,.12)',fontWeight:950,boxShadow:'0 8px 20px rgba(245,158,11,.10)'} : undefined}><span>{section.icon}</span><strong>{c(section.label)}</strong></button>)}</aside>
      <div className={styles.main}>
        <Section id="grundlagen" title={c(SVT_LESSON.grundlagen.title)} lead={c(SVT_LESSON.grundlagen.lead)}><Table headers={SVT_LESSON.grundlagen.headers.map(c)} rows={rows(SVT_LESSON.grundlagen.rows)} /><Callout label={c(SVT_LESSON.keyLabel)}>{c(SVT_LESSON.grundlagen.key)}</Callout></Section>
        <Section id="risiko" title={c(SVT_LESSON.risiko.title)} lead={c(SVT_LESSON.risiko.lead)}><Cards items={SVT_LESSON.risiko.items} lang={lang} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.risiko.cave)}</Callout></Section>
        <Section id="klinik" title={c(SVT_LESSON.klinik.title)} lead={c(SVT_LESSON.klinik.lead)}><Cards items={SVT_LESSON.klinik.items} lang={lang} /><Callout label={c(SVT_LESSON.keyLabel)}>{c(SVT_LESSON.klinik.key)}</Callout></Section>
        <Section id="pathophysiologie" title={c(SVT_LESSON.pathophysiologie.title)} lead={c(SVT_LESSON.pathophysiologie.lead)}><Cards items={SVT_LESSON.pathophysiologie.items} lang={lang} /></Section>
        <Section id="ct" title={c(SVT_LESSON.ct.title)} lead={c(SVT_LESSON.ct.lead)}><Table headers={SVT_LESSON.ct.headers.map(c)} rows={rows(SVT_LESSON.ct.rows)} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.ct.cave)}</Callout></Section>
        <Section id="mrt" title={c(SVT_LESSON.mrt.title)} lead={c(SVT_LESSON.mrt.lead)}>
          <Table headers={SVT_LESSON.mrt.headers.map(c)} rows={rows(SVT_LESSON.mrt.rows)} />
          <h3 className={styles.subsectionTitle}>{copy.imageTitle}</h3>
          <button type="button" className={styles.svtSignalImage} onClick={() => setZoomed(true)} aria-label={`${copy.zoom}: ${c(SVT_LESSON.mrt.imageAlt)}`}><Image src={SVT_LESSON.mrt.image} alt={c(SVT_LESSON.mrt.imageAlt)} width={1098} height={310} /></button>
          <Callout label={c(SVT_LESSON.keyLabel)}>{c(SVT_LESSON.mrt.key)}</Callout>
        </Section>
        <Section id="fallstricke" title={c(SVT_LESSON.fallstricke.title)} lead={c(SVT_LESSON.fallstricke.lead)}><Table headers={SVT_LESSON.fallstricke.headers.map(c)} rows={rows(SVT_LESSON.fallstricke.rows)} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.fallstricke.cave)}</Callout></Section>
        <Section id="therapie" title={c(SVT_LESSON.therapie.title)} lead={c(SVT_LESSON.therapie.lead)}><Cards items={SVT_LESSON.therapie.items} lang={lang} /><Callout label={c(SVT_LESSON.caveLabel)} cave>{c(SVT_LESSON.therapie.cave)}</Callout></Section>
        <Section id="takehome" title={c(SVT_LESSON.takehome.title)} lead={c(SVT_LESSON.takehome.lead)}><div className={styles.takeHomeGrid}>{SVT_LESSON.takehome.items.map((item,index)=><div className={styles.takeHomeItem} key={c(item.title)}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div></div>)}</div></Section>
        <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} copy={copy} /></div>
      </div>
    </div>
    {zoomed && <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={c(SVT_LESSON.mrt.imageAlt)} onClick={() => setZoomed(false)}><div className={styles.strokeImageModalContent} onClick={e => e.stopPropagation()}><button type="button" className={styles.strokeImageModalClose} onClick={() => setZoomed(false)} aria-label={copy.close}>×</button><img src={SVT_LESSON.mrt.image} alt={c(SVT_LESSON.mrt.imageAlt)} /><p>{copy.imageTitle}</p></div></div>}
  </main>
}
