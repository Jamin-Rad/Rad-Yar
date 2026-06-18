'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { HIE_LEARNING_CASES, HIE_LESSON } from '@/data/hie'
import shared from '../../../abdomen/gi/divertikulitis/page.module.css'
import local from './page.module.css'

const IMAGE_UI = {
  de: { zoom: 'Bild vergrößern', close: 'Großansicht schließen', scroll: 'Bildserie horizontal scrollen' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', scroll: 'Scroll through image series' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن نمای بزرگ', scroll: 'مرور افقی مجموعه تصاویر' },
}

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده ثبت شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function localize(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('de' in value || 'en' in value || 'fa' in value)) {
    return value[lang] || value.de
  }
  return value
}

function localizedItems(items, lang) {
  return items.map(item => ({ ...item, title: localize(item.title, lang), text: localize(item.text, lang) }))
}

function localizedRows(rows, lang) {
  return rows.map(row => row.map(cell => localize(cell, lang)))
}

function ReadButton({ isRead, onClick, authError, lang }) {
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={shared.readControl}>
      <button type="button" className={`${shared.readButton} ${isRead ? shared.readButtonActive : ''}`} onClick={onClick}>
        <span className={shared.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && (
        <div className={shared.readError} role="alert">
          <span>{copy.error}</span>
          <Link href="/sign-in">{copy.signIn}</Link>
        </div>
      )}
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className={shared.tableWrap}>
      <table className={shared.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Cards({ items }) {
  return (
    <div className={shared.cardsGrid}>
      {items.map(item => <article className={shared.infoCard} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return <div className={`${shared.callout} ${type === 'cave' ? shared.cave : ''}`}><strong>{label}</strong><p>{children}</p></div>
}

function Section({ id, title, lead, titleClassName = '', children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)

  useEffect(() => setOpen(!isMobile), [isMobile, id])

  return (
    <section id={id} className={shared.section}>
      <button className={shared.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2 className={titleClassName}>{title}</h2>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className={shared.sectionBody}>{lead && <p className={shared.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function Timeline({ items }) {
  return (
    <div className={local.timeline}>
      {items.map((item, index) => (
        <article className={local.timelineItem} key={item.title}>
          <span className={local.timelineDot} aria-hidden="true">{index + 1}</span>
          <div><h3>{item.title}</h3><p>{item.text}</p></div>
        </article>
      ))}
    </div>
  )
}

function CaseCard({ item, lang, imageUi, onZoom, openLabel }) {
  return (
    <article className={local.caseCard}>
      <div className={local.caseScroller} aria-label={imageUi.scroll} tabIndex="0">
        {item.images.map((src, index) => (
          <button
            type="button"
            className={local.caseImageButton}
            key={src}
            onClick={() => onZoom({ src, alt: `${localize(item.alt, lang)} ${index + 1}` })}
            aria-label={`${imageUi.zoom}: ${index + 1}`}
          >
            <Image src={src} alt={`${localize(item.alt, lang)} ${index + 1}`} width={760} height={760} className={local.caseImage} />
            <span className={local.zoomBadge} aria-hidden="true">⌕</span>
          </button>
        ))}
      </div>
      <div className={local.caseBody}>
        <span className={local.caseLabel}>{localize(item.label, lang)}</span>
        <h3>{localize(item.title, lang)}</h3>
        <p>{localize(item.text, lang)}</p>
        <small>{item.credit}</small>
        <a href={item.url} target="_blank" rel="noopener noreferrer">{openLabel} ↗</a>
      </div>
    </article>
  )
}

export default function HypoxischIschaemischeHirnschaedigungPage() {
  const { lang } = useLanguage()
  const c = value => localize(value, lang)
  const isRTL = lang === 'fa'
  const imageUi = IMAGE_UI[lang] || IMAGE_UI.de
  const sections = HIE_LESSON.sections.map(section => ({ ...section, label: c(section.label) }))
  const sectionIds = useMemo(() => sections.map(section => section.id), [sections])
  const [activeId, setActiveId] = useState(sectionIds[0])
  const [previewImage, setPreviewImage] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('hypoxisch-ischaemische-hirnschaedigung')
  const lessonPath = '/gehirn/vaskulaer/hypoxisch-ischaemische-hirnschaedigung'
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

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

  useEffect(() => {
    if (!previewImage) return undefined
    const closeOnEscape = event => {
      if (event.key === 'Escape') setPreviewImage(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [previewImage])

  return (
    <>
      <main className={`${shared.page} ${shared.strokePage} ${local.page}`} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        <InProgressBanner lang={lang} />

        <header className={shared.header}>
          <div className={shared.breadcrumb}>
            <Link href={withLang('/')}>RadYar</Link><span>›</span>
            <Link href={withLang('/lernen/gehirn')}>{c(HIE_LESSON.breadcrumbArea)}</Link><span>›</span>
            <span>{c(HIE_LESSON.breadcrumbCurrent)}</span>
          </div>
          <div className={shared.hero}>
            <div className={shared.heroText}>
              <span className={shared.sourceBadge}>{HIE_LESSON.sourceLabel}</span>
              <h1>{c(HIE_LESSON.title)}</h1>
              <p>{c(HIE_LESSON.subtitle)}</p>
              <div className={shared.actions}>
                <Link href={withLang(`/ueben/quiz?fach=gehirn&n=10&themen=hypoxisch-ischaemische-hirnschaedigung&from=${encodeURIComponent(withLang(lessonPath))}`)} className={shared.actionBtn}>🎯 {HIE_LESSON.actionMcq}</Link>
                <Link href={withLang(`/flashcards/hypoxisch-ischaemische-hirnschaedigung?from=${encodeURIComponent(withLang(lessonPath))}`)} className={shared.actionBtn}>🧠 {c(HIE_LESSON.actionFlash)}</Link>
              </div>
            </div>
            <div className={shared.heroStats}>
              {HIE_LESSON.heroCards.map(card => (
                <div className={shared.heroStat} key={c(card.label)}>
                  <strong>{card.value}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className={shared.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>

        <div className={shared.layout}>
          <aside className={`${shared.sidebar} ${local.desktopToc}`}>
            <div className={shared.sideTitle}>{c(HIE_LESSON.toc)}</div>
            {sections.map(section => (
              <button
                type="button"
                key={section.id}
                className={`${shared.sideItem} ${activeId === section.id ? shared.sideItemActive : ''}`}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                <span>{section.icon}</span><strong>{section.label}</strong>
              </button>
            ))}
          </aside>

          <div className={shared.main}>
            <Section id="grundlagen" title={c(HIE_LESSON.basics.title)} lead={c(HIE_LESSON.basics.lead)}>
              <Cards items={localizedItems(HIE_LESSON.basics.items, lang)} />
              <Table headers={[c({ de: 'Phase', en: 'Phase', fa: 'مرحله' }), c({ de: 'Klinik', en: 'Clinical features', fa: 'تظاهرات بالینی' })]} rows={localizedRows(HIE_LESSON.basics.clinical, lang)} />
              <Callout label={c(HIE_LESSON.keyLabel)}>{c(HIE_LESSON.basics.key)}</Callout>
            </Section>

            <Section id="vulnerabilitaet" title={c(HIE_LESSON.vulnerability.title)} lead={c(HIE_LESSON.vulnerability.lead)}>
              <Table headers={HIE_LESSON.vulnerability.headers.map(c)} rows={localizedRows(HIE_LESSON.vulnerability.rows, lang)} />
              <Callout label={c(HIE_LESSON.keyLabel)}>{c(HIE_LESSON.vulnerability.key)}</Callout>
            </Section>

            <Section id="muster" title={c(HIE_LESSON.patterns.title)} lead={c(HIE_LESSON.patterns.lead)}>
              <Cards items={localizedItems(HIE_LESSON.patterns.items, lang)} />
              <Callout type="cave" label={c(HIE_LESSON.caveLabel)}>{c(HIE_LESSON.patterns.cave)}</Callout>
            </Section>

            <Section id="ct" title={c(HIE_LESSON.ct.title)} lead={c(HIE_LESSON.ct.lead)}>
              <Table headers={HIE_LESSON.ct.headers.map(c)} rows={localizedRows(HIE_LESSON.ct.rows, lang)} />
              <Callout type="cave" label={c(HIE_LESSON.caveLabel)}>{c(HIE_LESSON.ct.cave)}</Callout>
            </Section>

            <Section id="mrt" title={c(HIE_LESSON.mri.title)} lead={c(HIE_LESSON.mri.lead)}>
              <Table headers={HIE_LESSON.mri.headers.map(c)} rows={localizedRows(HIE_LESSON.mri.rows, lang)} />
              <Callout label={c(HIE_LESSON.keyLabel)}>{c(HIE_LESSON.mri.key)}</Callout>
            </Section>

            <Section id="zeitverlauf" title={c(HIE_LESSON.timeline.title)} lead={c(HIE_LESSON.timeline.lead)}>
              <Timeline items={localizedItems(HIE_LESSON.timeline.items, lang)} />
              <Callout label={c(HIE_LESSON.keyLabel)}>{c(HIE_LESSON.timeline.key)}</Callout>
            </Section>

            <Section id="sonderformen" title={c(HIE_LESSON.special.title)} lead={c(HIE_LESSON.special.lead)}>
              <Table headers={HIE_LESSON.special.headers.map(c)} rows={localizedRows(HIE_LESSON.special.rows, lang)} />
              <Callout type="cave" label={c(HIE_LESSON.caveLabel)}>{c(HIE_LESSON.special.cave)}</Callout>
            </Section>

            <Section id="prognose" title={c(HIE_LESSON.prognosis.title)} lead={c(HIE_LESSON.prognosis.lead)}>
              <Cards items={localizedItems(HIE_LESSON.prognosis.reportItems, lang)} />
              <Callout type="cave" label={c(HIE_LESSON.caveLabel)}>{c(HIE_LESSON.prognosis.guideline)}</Callout>
            </Section>

            <Section id="faelle" title={c(HIE_LESSON.cases.title)} lead={c(HIE_LESSON.cases.lead)}>
              <div className={local.caseGrid}>
                {HIE_LEARNING_CASES.map(item => <CaseCard key={item.id} item={item} lang={lang} imageUi={imageUi} onZoom={setPreviewImage} openLabel={c(HIE_LESSON.openCase)} />)}
              </div>
            </Section>

            <Section id="takehome" title={HIE_LESSON.takehome.title} lead={c(HIE_LESSON.takehome.lead)} titleClassName={local.takeHomeTitle}>
              <div className={local.takeHomeGrid}>
                {localizedItems(HIE_LESSON.takehome.items, lang).map(item => (
                  <article className={local.takeHomeItem} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>
                ))}
              </div>
            </Section>

            <div className={shared.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>
          </div>
        </div>
      </main>

      {previewImage && (
        <div className={shared.strokeImageModal} role="dialog" aria-modal="true" aria-label={imageUi.zoom} onClick={() => setPreviewImage(null)}>
          <div className={shared.strokeImageModalContent} onClick={event => event.stopPropagation()}>
            <button type="button" className={shared.strokeImageModalClose} onClick={() => setPreviewImage(null)} aria-label={imageUi.close}>×</button>
            <img src={previewImage.src} alt={previewImage.alt} />
          </div>
        </div>
      )}
    </>
  )
}
