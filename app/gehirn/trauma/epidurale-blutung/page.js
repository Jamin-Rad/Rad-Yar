'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { EDH_LEARNING_CASES, EDH_LESSON } from '@/data/edh'
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
      {authError && <div className={shared.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className={shared.tableWrap}>
      <table className={shared.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Cards({ items }) {
  return <div className={shared.cardsGrid}>{items.map(item => <article className={shared.infoCard} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
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
        <h2 className={titleClassName}>{title}</h2><span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className={shared.sectionBody}>{lead && <p className={shared.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function CaseCard({ item, lang, imageUi, onZoom, openLabel }) {
  return (
    <article className={local.caseCard}>
      <div className={local.caseScroller} aria-label={imageUi.scroll} tabIndex="0">
        {item.images.map((src, index) => (
          <button type="button" className={local.caseImageButton} key={src} onClick={() => onZoom({ src, alt: `${localize(item.alt, lang)} ${index + 1}` })} aria-label={`${imageUi.zoom}: ${index + 1}`}>
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

export default function EpiduralhaematomPage() {
  const { lang } = useLanguage()
  const c = value => localize(value, lang)
  const isRTL = lang === 'fa'
  const imageUi = IMAGE_UI[lang] || IMAGE_UI.de
  const sections = EDH_LESSON.sections.map(section => ({ ...section, label: c(section.label) }))
  const sectionIds = useMemo(() => sections.map(section => section.id), [sections])
  const [activeId, setActiveId] = useState(sectionIds[0])
  const [previewImage, setPreviewImage] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('epidurale-blutung')
  const lessonPath = '/gehirn/trauma/epidurale-blutung'
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
          <div className={`${shared.breadcrumb} ${local.breadcrumb}`}>
            <Link href={withLang('/')}>RadYar</Link><span>›</span>
            <Link href={withLang('/lernen/gehirn')}>{c(EDH_LESSON.breadcrumbArea)}</Link><span>›</span>
            <span>{c(EDH_LESSON.breadcrumbCurrent)}</span>
          </div>
          <div className={shared.hero}>
            <div className={`${shared.heroText} ${local.heroText}`}>
              <span className={`${shared.sourceBadge} ${local.sourceBadge}`}>{EDH_LESSON.sourceLabel}</span>
              <h1>{c(EDH_LESSON.title)}</h1>
              <p>{c(EDH_LESSON.subtitle)}</p>
              <div className={shared.actions}>
                <Link href={withLang(`/ueben/quiz?fach=gehirn&n=10&themen=epidurale-blutung&from=${encodeURIComponent(withLang(lessonPath))}`)} className={`${shared.actionBtn} ${local.actionBtn}`}>🎯 {EDH_LESSON.actionMcq}</Link>
                <Link href={withLang(`/flashcards/epidurale-blutung?from=${encodeURIComponent(withLang(lessonPath))}`)} className={`${shared.actionBtn} ${local.actionBtn}`}>🧠 {c(EDH_LESSON.actionFlash)}</Link>
              </div>
            </div>
            <div className={shared.heroStats}>
              {EDH_LESSON.heroCards.map((card, index) => <div className={`${shared.heroStat} ${local[`heroStat${index + 1}`]}`} key={c(card.label)}><strong>{card.value}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small></div>)}
            </div>
          </div>
        </header>

        <div className={shared.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} lang={lang} /></div>

        <div className={shared.layout}>
          <aside className={`${shared.sidebar} ${local.desktopToc}`}>
            <div className={shared.sideTitle}>{c(EDH_LESSON.toc)}</div>
            {sections.map(section => (
              <button type="button" key={section.id} className={`${shared.sideItem} ${activeId === section.id ? shared.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                <span>{section.icon}</span><strong>{section.label}</strong>
              </button>
            ))}
          </aside>

          <div className={shared.main}>
            <Section id="grundlagen" title={c(EDH_LESSON.basics.title)} lead={c(EDH_LESSON.basics.lead)}>
              <Cards items={localizedItems(EDH_LESSON.basics.items, lang)} />
              <Callout label={c(EDH_LESSON.keyLabel)}>{c(EDH_LESSON.basics.key)}</Callout>
            </Section>

            <Section id="pathomechanismus" title={c(EDH_LESSON.mechanism.title)} lead={c(EDH_LESSON.mechanism.lead)}>
              <Table headers={EDH_LESSON.mechanism.headers.map(c)} rows={localizedRows(EDH_LESSON.mechanism.rows, lang)} />
              <Callout label={c(EDH_LESSON.keyLabel)}>{c(EDH_LESSON.mechanism.key)}</Callout>
            </Section>

            <Section id="ct" title={c(EDH_LESSON.ct.title)} lead={c(EDH_LESSON.ct.lead)}>
              <Table headers={EDH_LESSON.ct.headers.map(c)} rows={localizedRows(EDH_LESSON.ct.rows, lang)} />
              <Callout label={c(EDH_LESSON.keyLabel)}>{c(EDH_LESSON.ct.key)}</Callout>
            </Section>

            <Section id="fraktur" title={c(EDH_LESSON.fracture.title)} lead={c(EDH_LESSON.fracture.lead)}>
              <Cards items={localizedItems(EDH_LESSON.fracture.items, lang)} />
              <Callout type="cave" label={c(EDH_LESSON.caveLabel)}>{c(EDH_LESSON.fracture.cave)}</Callout>
            </Section>

            <Section id="blutungszeichen" title={c(EDH_LESSON.bleeding.title)} lead={c(EDH_LESSON.bleeding.lead)}>
              <Cards items={localizedItems(EDH_LESSON.bleeding.items, lang)} />
              <Callout type="cave" label={c(EDH_LESSON.caveLabel)}>{c(EDH_LESSON.bleeding.cave)}</Callout>
            </Section>

            <Section id="notfall" title={c(EDH_LESSON.emergency.title)} lead={c(EDH_LESSON.emergency.lead)}>
              <Table headers={EDH_LESSON.emergency.headers.map(c)} rows={localizedRows(EDH_LESSON.emergency.rows, lang)} />
              <Callout type="cave" label={c(EDH_LESSON.caveLabel)}>{c(EDH_LESSON.emergency.cave)}</Callout>
            </Section>

            <Section id="differenzialdiagnosen" title={c(EDH_LESSON.differential.title)} lead={c(EDH_LESSON.differential.lead)}>
              <Table headers={EDH_LESSON.differential.headers.map(c)} rows={localizedRows(EDH_LESSON.differential.rows, lang)} />
              <Callout label={c(EDH_LESSON.keyLabel)}>{c(EDH_LESSON.differential.key)}</Callout>
            </Section>

            <Section id="befundung" title={c(EDH_LESSON.reporting.title)} lead={c(EDH_LESSON.reporting.lead)}>
              <Cards items={localizedItems(EDH_LESSON.reporting.reportItems, lang)} />
              <Table headers={EDH_LESSON.reporting.criteriaHeaders.map(c)} rows={localizedRows(EDH_LESSON.reporting.criteriaRows, lang)} />
              <Callout type="cave" label={c(EDH_LESSON.caveLabel)}>{c(EDH_LESSON.reporting.cave)}</Callout>
            </Section>

            <Section id="faelle" title={c(EDH_LESSON.cases.title)} lead={c(EDH_LESSON.cases.lead)}>
              <div className={local.caseGrid}>
                {EDH_LEARNING_CASES.map(item => <CaseCard key={item.id} item={item} lang={lang} imageUi={imageUi} onZoom={setPreviewImage} openLabel={c(EDH_LESSON.openCase)} />)}
              </div>
            </Section>

            <Section id="takehome" title={EDH_LESSON.takehome.title} lead={c(EDH_LESSON.takehome.lead)} titleClassName={local.takeHomeTitle}>
              <div className={local.takeHomeGrid}>
                {localizedItems(EDH_LESSON.takehome.items, lang).map(item => <article className={local.takeHomeItem} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
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
