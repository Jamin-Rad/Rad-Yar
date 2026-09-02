'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import basics from '../basics/page.module.css'
import styles from './page.module.css'
import { COMPARISON_ROWS, COPY, INTRO_DIMENSIONS, REPORT_STEPS, SECTIONS, TUMOURS, pick } from './content'

const LESSON_ID = 'mamma-mrt-besondere-mammakarzinome'
const LESSON_PATH = '/mamma/bildgebung/mrt/besondere-mammakarzinome'

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError, lang }) {
  const copy = READ_COPY[lang] || READ_COPY.de
  return <div className={base.readControl}>
    <button type="button" className={`${base.readButton} ${basics.readButton} ${isRead ? `${base.readButtonActive} ${basics.readButtonActive}` : ''}`} onClick={onClick}>
      <span className={`${base.readCheck} ${basics.readCheck}`} aria-hidden="true">{isRead ? '✓' : ''}</span>
      <span>{isRead ? copy.read : copy.mark}</span>
    </button>
    {authError && <div className={base.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
  </div>
}

function Section({ id, eyebrow, title, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)

  useEffect(() => setOpen(!isMobile), [isMobile, id])

  return <section id={id} className={`${base.section} ${basics.section} ${styles.section}`}>
    <button className={`${base.sectionHeader} ${basics.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
      <span className={basics.sectionHeading}><small>{eyebrow}</small><h2>{title}</h2></span>
      <span className={basics.sectionToggle}>{open ? '−' : '+'}</span>
    </button>
    {open && <div className={`${base.sectionBody} ${basics.sectionBody} ${styles.sectionBody}`}>{children}</div>}
  </section>
}

function TumourLesson({ tumour, lang }) {
  const tx = value => pick(value, lang)
  return <>
    <div className={`${styles.tumourIntro} ${styles[tumour.tone]}`}>
      <span>{tx(tumour.short)}</span>
      <p>{tx(tumour.definition)}</p>
    </div>
    <div className={styles.lessonColumns}>
      <article className={styles.patternColumn}>
        <header><span aria-hidden="true">⌁</span><div><small>{tx({ de: 'MRT-Muster', en: 'MRI pattern', fa: 'الگوی MRI' })}</small><h3>{tx({ de: 'Typische Bildgebung', en: 'Typical imaging', fa: 'یافته‌های تیپیک' })}</h3></div></header>
        <ul>{tumour.pattern.map(item => <li key={tx(item)}>{tx(item)}</li>)}</ul>
      </article>
      <article className={styles.pitfallColumn}>
        <header><span aria-hidden="true">!</span><div><small>{tx({ de: 'Fallstricke', en: 'Pitfalls', fa: 'دام‌های تشخیصی' })}</small><h3>{tx({ de: 'Nicht übersehen', en: 'Do not miss', fa: 'از دست ندهید' })}</h3></div></header>
        <ul>{tumour.pitfalls.map(item => <li key={tx(item)}>{tx(item)}</li>)}</ul>
      </article>
    </div>
    <div className={styles.rememberLine}><span>{tx({ de: 'Merke', en: 'Remember', fa: 'نکته' })}</span><strong>{tx(tumour.remember)}</strong></div>
  </>
}

export default function BesondereMammakarzinomePage() {
  const { lang } = useLanguage()
  const tx = value => pick(value, lang)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus(LESSON_ID)
  const sectionIds = useMemo(() => SECTIONS.map(section => section.id), [])
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setActiveId(id), { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return <main className={`${base.page} ${basics.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={base.header}>
      <nav className={`${base.breadcrumb} ${basics.breadcrumb}`} aria-label={tx(COPY.contents)}>
        <Link href={withLang('/')}>RadYar</Link><span>›</span>
        <Link href={withLang('/lernen/mamma')}>{tx(COPY.mamma)}</Link><span>›</span>
        <Link href={withLang('/lernen/mamma')}>{tx(COPY.imaging)}</Link><span>›</span>
        <span>{tx(COPY.breastMri)}</span><span>›</span><strong>{tx(COPY.title)}</strong>
      </nav>
      <div className={base.hero}>
        <div className={`${base.heroText} ${basics.heroText} ${styles.heroText}`}>
          <h1>{tx(COPY.title)}</h1>
          <p>{tx(COPY.subtitle)}</p>
          <div className={base.actions}>
            <Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=8&themen=${LESSON_ID}&from=${encodeURIComponent(withLang(LESSON_PATH))}`)}>🎯 MCQ</Link>
            <Link className={`${base.actionBtn} ${basics.actionBtn}`} href={withLang(`/flashcards/${LESSON_ID}?from=${encodeURIComponent(withLang(LESSON_PATH))}`)}>🧠 {tx(COPY.flashcards)}</Link>
          </div>
        </div>
        <div className={`${base.heroStats} ${styles.heroStats}`}>
          <div className={`${base.heroStat} ${basics.heroStat}`}><strong>ILC</strong><span>{tx({ de: 'oft infiltrativ', en: 'often infiltrative', fa: 'اغلب نفوذی' })}</span><small>{tx({ de: 'Ausdehnung suchen', en: 'Map the extent', fa: 'تعیین وسعت' })}</small></div>
          <div className={`${base.heroStat} ${basics.heroStat}`}><strong>{tx({ de: 'Muzinös', en: 'Mucinous', fa: 'موسینوس' })}</strong><span>{tx({ de: 'häufig T2-hell', en: 'often T2 bright', fa: 'اغلب پرسیگنال T2' })}</span><small>{tx({ de: 'Benigne Mimik', en: 'Benign mimic', fa: 'تقلید ضایعه خوش‌خیم' })}</small></div>
          <div className={`${base.heroStat} ${basics.heroStat}`}><strong>TNBC</strong><span>{tx({ de: 'oft rund mit Nekrose', en: 'often round with necrosis', fa: 'اغلب گرد با نکروز' })}</span><small>{tx({ de: 'Biologie ≠ Form', en: 'Biology ≠ shape', fa: 'زیست‌شناسی ≠ شکل' })}</small></div>
        </div>
      </div>
    </header>

    <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
    <div className={base.layout}>
      <aside className={`${base.sidebar} ${basics.sidebar}`}>
        <div className={base.sideTitle}>{tx(COPY.contents)}</div>
        {SECTIONS.map(section => <button key={section.id} type="button" className={`${base.sideItem} ${basics.sideItem} ${activeId === section.id ? `${base.sideItemActive} ${basics.sideItemActive}` : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          <span className={basics.sideNumber}>{section.icon}</span><strong>{tx(section.label)}</strong>
        </button>)}
      </aside>

      <div className={base.main}>
        <Section id="warum" eyebrow={tx({ de: '01 · Orientierung', en: '01 · Orientation', fa: '۰۱ · جهت‌گیری' })} title={tx(SECTIONS[0].label)}>
          <p className={styles.lead}>{tx({
            de: 'Der histologische oder molekulare Subtyp lässt sich nicht sicher aus der MRT ablesen. Er erklärt aber, warum manche Karzinome typische Erwartungen durchbrechen – und genau diese Abweichungen sind diagnostisch wertvoll.',
            en: 'Histological or molecular subtype cannot be determined reliably from MRI alone. It does explain why some cancers break typical expectations, and those deviations are diagnostically valuable.',
            fa: 'نوع بافت‌شناختی یا مولکولی را نمی‌توان با اطمینان فقط از MRI تعیین کرد، اما این نوع توضیح می‌دهد چرا برخی کارسینوم‌ها برخلاف انتظار ظاهر می‌شوند؛ همین تفاوت‌ها ارزش تشخیصی دارند.'
          })}</p>
          <div className={styles.dimensionRail}>{INTRO_DIMENSIONS.map((item, index) => <article key={item.key}><span>{String(index + 1).padStart(2, '0')}</span><h3>{tx(item.title)}</h3><p>{tx(item.text)}</p></article>)}</div>
          <div className={styles.caution}><strong>{tx({ de: 'Leitprinzip', en: 'Guiding principle', fa: 'اصل راهنما' })}</strong><p>{tx({ de: 'Benigne Morphologie schließt aggressive Biologie nicht aus. Umgekehrt ist kein MRT-Zeichen histologiespezifisch.', en: 'Benign morphology does not exclude aggressive biology. Conversely, no MRI sign is histology-specific.', fa: 'مورفولوژی خوش‌خیم، زیست‌شناسی تهاجمی را رد نمی‌کند؛ در مقابل، هیچ علامت MRI اختصاصی یک نوع بافت‌شناختی نیست.' })}</p></div>
        </Section>

        <Section id="ilc" eyebrow="02 · ILC" title={tx(SECTIONS[1].label)}><TumourLesson tumour={TUMOURS.ilc} lang={lang} /></Section>
        <Section id="muzinoes" eyebrow={tx({ de: '03 · Muzinös', en: '03 · Mucinous', fa: '۰۳ · موسینوس' })} title={tx(SECTIONS[2].label)}><TumourLesson tumour={TUMOURS.muzinoes} lang={lang} /></Section>
        <Section id="tnbc" eyebrow="04 · TNBC" title={tx(SECTIONS[3].label)}><TumourLesson tumour={TUMOURS.tnbc} lang={lang} /></Section>
        <Section id="inflammatorisch" eyebrow="05 · IBC" title={tx(SECTIONS[4].label)}><TumourLesson tumour={TUMOURS.inflammatorisch} lang={lang} /></Section>
        <Section id="paget" eyebrow="06 · Paget" title={tx(SECTIONS[5].label)}><TumourLesson tumour={TUMOURS.paget} lang={lang} /></Section>
        <Section id="metaplastisch" eyebrow={tx({ de: '07 · Metaplastisch', en: '07 · Metaplastic', fa: '۰۷ · متاپلاستیک' })} title={tx(SECTIONS[6].label)}><TumourLesson tumour={TUMOURS.metaplastisch} lang={lang} /></Section>

        <Section id="vergleich" eyebrow={tx({ de: '08 · Integration', en: '08 · Integration', fa: '۰۸ · جمع‌بندی' })} title={tx(SECTIONS[7].label)}>
          <div className={styles.comparison} role="table" aria-label={tx({ de: 'Vergleich besonderer Mammakarzinome', en: 'Comparison of special breast carcinomas', fa: 'مقایسه کارسینوم‌های ویژه پستان' })}>
            <div className={styles.comparisonHeader} role="row"><strong role="columnheader">{tx({ de: 'Tumortyp', en: 'Tumour type', fa: 'نوع تومور' })}</strong><strong role="columnheader">{tx({ de: 'MRT-Muster', en: 'MRI pattern', fa: 'الگوی MRI' })}</strong><strong role="columnheader">{tx({ de: 'Fallstrick', en: 'Pitfall', fa: 'دام تشخیصی' })}</strong><strong role="columnheader">{tx({ de: 'Merke', en: 'Remember', fa: 'نکته' })}</strong></div>
            {COMPARISON_ROWS.map((row, index) => <div className={styles.comparisonRow} role="row" key={tx(row.tumour)}><span className={styles.rowNumber}>{String(index + 1).padStart(2, '0')}</span><strong role="cell">{tx(row.tumour)}</strong><span role="cell">{tx(row.pattern)}</span><span role="cell">{tx(row.pitfall)}</span><span role="cell">{tx(row.key)}</span></div>)}
          </div>
          <div className={styles.finalWarning}><span aria-hidden="true">!</span><div><strong>{tx({ de: 'Benigne Morphologie schließt aggressive Biologie nicht aus.', en: 'Benign morphology does not exclude aggressive biology.', fa: 'مورفولوژی خوش‌خیم، زیست‌شناسی تهاجمی را رد نمی‌کند.' })}</strong><p>{tx({ de: 'Klinik, Bildgebung und Pathologie immer integriert beurteilen.', en: 'Always integrate clinical findings, imaging and pathology.', fa: 'یافته‌های بالینی، تصویربرداری و پاتولوژی را همیشه یکپارچه ارزیابی کنید.' })}</p></div></div>
          <h3 className={styles.strategyTitle}>{tx({ de: 'Befundstrategie in vier Schritten', en: 'Four-step reporting strategy', fa: 'راهبرد گزارش در چهار مرحله' })}</h3>
          <ol className={styles.reportSteps}>{REPORT_STEPS.map((step, index) => <li key={tx(step.label)}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{tx(step.label)}</small><strong>{tx(step.text)}</strong></div></li>)}</ol>
        </Section>
      </div>
    </div>
  </main>
}
