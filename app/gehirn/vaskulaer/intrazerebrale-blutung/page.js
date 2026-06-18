'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { ICB_LEARNING_CASES, ICB_LESSON } from '@/data/icb'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const IMAGE_UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen' },
  en: { zoom: 'Enlarge image', close: 'Close image preview' },
  fa: { zoom: 'بزرگ‌نمایی تصویر', close: 'بستن نمایش تصویر' },
}

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

function LearningFigure({ src, alt, onZoom, zoomLabel }) {
  return (
    <figure style={{ margin: '22px 0 0', border: '1px solid var(--border)', borderRadius: 22, overflow: 'hidden', background: 'var(--bg-card)' }}>
      <button type="button" className={styles.strokeZoomButton} onClick={() => onZoom({ src, alt })} aria-label={zoomLabel}>
        <Image src={src} alt={alt} width={900} height={520} style={{ display: 'block', width: '100%', height: 'auto' }} />
      </button>
    </figure>
  )
}

function CaseCard({ item, lang, openCase, onZoom, zoomLabel }) {
  return (
    <article className={styles.caseCardLink}>
      <figure className={styles.caseImage}>
        <button type="button" className={styles.strokeCaseZoom} onClick={() => onZoom({ src: item.image, alt: localize(item.alt, lang) })} aria-label={zoomLabel}>
          <Image src={item.image} alt={localize(item.alt, lang)} width={800} height={580} className={styles.caseImageAsset} />
        </button>
      </figure>
      <div className={styles.caseBody}>
        <div className={styles.caseLabelRow}>
          <span className={styles.caseLabel}>{localize(item.label, lang)}</span>
        </div>
        <h3>{localize(item.title, lang)}</h3>
        <p>{localize(item.text, lang)}</p>
        <small>{item.credit}</small>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{openCase} ↗</a>
      </div>
    </article>
  )
}

export default function IntrazerebraleBluturngPage() {
  const { lang } = useLanguage()
  const c = value => localize(value, lang)
  const imageUi = IMAGE_UI[lang] || IMAGE_UI.de
  const isRTL = lang === 'fa'
  const sections = ICB_LESSON.sections.map(section => ({ ...section, label: c(section.label) }))
  const [activeId, setActiveId] = useState(sections[0].id)
  const [previewImage, setPreviewImage] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('intrazerebrale-blutung')
  const lessonPath = '/gehirn/vaskulaer/intrazerebrale-blutung'
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
      <main className={`${styles.page} ${styles.strokePage}`} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        <header className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href={withLang('/')}>RadYar</Link><span>›</span>
            <Link href={withLang('/lernen/gehirn')}>{c(ICB_LESSON.breadcrumbArea)}</Link><span>›</span>
            <span>{c(ICB_LESSON.breadcrumbCurrent)}</span>
          </div>
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <span className={styles.sourceBadge}>{ICB_LESSON.sourceLabel}</span>
              <h1>{c(ICB_LESSON.title)}</h1>
              <p>{c(ICB_LESSON.subtitle)}</p>
              <div className={styles.actions}>
                <Link href={withLang(`/ueben/quiz?fach=gehirn&n=15&themen=intrazerebrale-blutung&from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>🎯 {ICB_LESSON.actionMcq}</Link>
                <Link href={withLang(`/flashcards/intrazerebrale-blutung?from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>🧠 {c(ICB_LESSON.actionFlash)}</Link>
              </div>
            </div>
            <div className={styles.heroStats}>
              {ICB_LESSON.heroCards.map(card => (
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
            <div className={styles.sideTitle}>{c(ICB_LESSON.toc)}</div>
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
            <Section id="klinik" title={c(ICB_LESSON.klinik.title)} lead={c(ICB_LESSON.klinik.lead)}>
              <Cards items={localizedItems(ICB_LESSON.klinik.definitionItems, lang)} />
              <Table
                headers={ICB_LESSON.klinik.aetiologyHeaders.map(c)}
                rows={localizedRows(ICB_LESSON.klinik.aetiologyRows, lang)}
              />
              <Callout type="cave" label={c(ICB_LESSON.caveLabel)}>{c(ICB_LESSON.klinik.cave)}</Callout>
              <Callout label={c(ICB_LESSON.keyLabel)}>{c(ICB_LESSON.klinik.key)}</Callout>
            </Section>

            {/* ── 2. CT-Diagnostik ─────────────────────────────────────────── */}
            <Section id="ct" title={c(ICB_LESSON.ct.title)} lead={c(ICB_LESSON.ct.lead)}>
              <Table
                headers={ICB_LESSON.ct.stagesHeaders.map(c)}
                rows={localizedRows(ICB_LESSON.ct.stagesRows, lang)}
              />
              <LearningFigure
                src="/icb/ct-akut.svg"
                alt={c({ de: 'CT schema ICB Putamen hyperdens akut', en: 'CT schema ICB putamen hyperattenuating acute', fa: 'اسکیمای CT ICB پوتامن هایپردنس حاد' })}
                onZoom={setPreviewImage}
                zoomLabel={imageUi.zoom}
              />
              <h3 style={{ margin: '32px 0 12px', fontSize: 15, fontWeight: 700 }}>{c(ICB_LESSON.ct.signsTitle)}</h3>
              <Cards items={localizedItems(ICB_LESSON.ct.signs, lang)} />
              <LearningFigure
                src="/icb/ct-swirl.svg"
                alt={c({ de: 'CT schema Swirl Sign hypodense Areale im Hämatom', en: 'CT schema swirl sign hypodense areas in haematoma', fa: 'اسکیمای CT Swirl Sign مناطق هیپودنس در هماتوم' })}
                onZoom={setPreviewImage}
                zoomLabel={imageUi.zoom}
              />
              <Callout label={c(ICB_LESSON.keyLabel)}>{c(ICB_LESSON.ct.key)}</Callout>
            </Section>

            {/* ── 3. MRT-Signalverhalten ───────────────────────────────────── */}
            <Section id="mrt" title={c(ICB_LESSON.mrt.title)} lead={c(ICB_LESSON.mrt.lead)}>
              <Cards items={localizedItems(ICB_LESSON.mrt.pathophysItems, lang)} />
              <LearningFigure
                src="/icb/mrt-signal.svg"
                alt={c(ICB_LESSON.mrt.imageAlt)}
                onZoom={setPreviewImage}
                zoomLabel={imageUi.zoom}
              />
              <Callout type="cave" label={c(ICB_LESSON.caveLabel)}>{c(ICB_LESSON.mrt.cave)}</Callout>
              <Callout label={c(ICB_LESSON.keyLabel)}>{c(ICB_LESSON.mrt.key)}</Callout>
            </Section>

            {/* ── 4. Sequenzen & Praxis ─────────────────────────────────────── */}
            <Section id="sequenzen" title={c(ICB_LESSON.sequenzen.title)} lead={c(ICB_LESSON.sequenzen.lead)}>
              <Cards items={localizedItems(ICB_LESSON.sequenzen.items, lang)} />
              <h3 style={{ margin: '32px 0 12px', fontSize: 15, fontWeight: 700 }}>
                {c({ de: 'Differenzialdiagnosen', en: 'Differential diagnoses', fa: 'تشخیص‌های افتراقی' })}
              </h3>
              <Cards items={localizedItems(ICB_LESSON.sequenzen.ddItems, lang)} />
              <Callout label={c(ICB_LESSON.keyLabel)}>{c(ICB_LESSON.sequenzen.key)}</Callout>
            </Section>

            {/* ── 5. Fallbeispiele ──────────────────────────────────────────── */}
            <Section id="faelle" title={c(ICB_LESSON.cases.title)} lead={c(ICB_LESSON.cases.lead)}>
              <div className={styles.caseGrid}>
                {ICB_LEARNING_CASES.map(item => (
                  <CaseCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    openCase={c(ICB_LESSON.openCase)}
                    onZoom={setPreviewImage}
                    zoomLabel={imageUi.zoom}
                  />
                ))}
              </div>
            </Section>

            {/* ── 6. Take home ─────────────────────────────────────────────── */}
            <Section id="takehome" title={c(ICB_LESSON.takehome.title)} lead={c(ICB_LESSON.takehome.lead)}>
              <div className={styles.takeHomeGrid}>
                {localizedItems(ICB_LESSON.takehome.items, lang).map((item, index) => (
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

      {previewImage && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" aria-label={imageUi.zoom} onClick={() => setPreviewImage(null)}>
          <div className={styles.strokeImageModalContent} onClick={event => event.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setPreviewImage(null)} aria-label={imageUi.close}>×</button>
            <img src={previewImage.src} alt={previewImage.alt} />
          </div>
        </div>
      )}
    </>
  )
}
