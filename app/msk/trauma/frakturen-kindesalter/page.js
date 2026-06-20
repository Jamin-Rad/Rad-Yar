'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { FRAKTUR_KINDER_LESSON } from '@/data/frakturen-kindesalter'
import styles from '../../../abdomen/gi/divertikulitis/page.module.css'

const L = (v, l) => v?.[l] || v?.de || v
const UI = {
  de: { zoom: 'Bild vergrößern', close: 'Bildansicht schließen', mark: 'Als gelesen markieren', read: 'Als gelesen markiert', signIn: 'Anmelden', auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', mcq: 'MCQ', flash: 'Flashcards', prev: 'Vorheriges Bild', next: 'Nächstes Bild', radiopaedia: 'Auf Radiopaedia öffnen' },
  en: { zoom: 'Enlarge image', close: 'Close image preview', mark: 'Mark as read', read: 'Marked as read', signIn: 'Sign in', auth: 'Please sign in to save your learning progress.', mcq: 'MCQ', flash: 'Flashcards', prev: 'Previous image', next: 'Next image', radiopaedia: 'Open on Radiopaedia' },
  fa: { zoom: 'بزرگ‌نمایی', close: 'بستن تصویر', mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'علامت خورد', signIn: 'ورود', auth: 'برای ذخیره پیشرفت وارد شوید.', mcq: 'MCQ', flash: 'فلش‌کارت', prev: 'تصویر قبلی', next: 'تصویر بعدی', radiopaedia: 'باز کردن در رادیوپدیا' },
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
        <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

function Cards({ items, lang }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={L(item.title, lang)}>
          <span className={styles.cardIcon}>{item.icon}</span>
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

function ImageModal({ images, index, onClose, onPrev, onNext, copy, radiopaediaUrl }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  const img = images[index]
  return (
    <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={styles.strokeImageModalContent} onClick={e => e.stopPropagation()}>
        <button type="button" className={styles.strokeImageModalClose} onClick={onClose} aria-label={copy.close}>×</button>
        <img src={img.src} alt={img.caption} style={{ maxHeight: '75vh', maxWidth: '100%', objectFit: 'contain' }} />
        <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem', opacity: 0.8 }}>{img.caption}</p>
        {images.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="button" onClick={onPrev} aria-label={copy.prev} style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', color: 'inherit', cursor: 'pointer' }}>‹</button>
            <span style={{ opacity: 0.6, alignSelf: 'center' }}>{index + 1} / {images.length}</span>
            <button type="button" onClick={onNext} aria-label={copy.next} style={{ padding: '0.4rem 1rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', color: 'inherit', cursor: 'pointer' }}>›</button>
          </div>
        )}
        {radiopaediaUrl && (
          <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            <a href={radiopaediaUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', opacity: 0.7, textDecoration: 'underline' }}>{copy.radiopaedia} ↗</a>
          </div>
        )}
      </div>
    </div>
  )
}

function CaseGallery({ title, images, radiopaediaUrl, copy, lang }) {
  const [modalIndex, setModalIndex] = useState(null)
  const open = (i) => setModalIndex(i)
  const close = () => setModalIndex(null)
  const prev = useCallback(() => setModalIndex(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setModalIndex(i => (i + 1) % images.length), [images.length])

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{title}</h4>
        {radiopaediaUrl && (
          <a href={radiopaediaUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', opacity: 0.65, textDecoration: 'none', border: '1px solid currentColor', borderRadius: '4px', padding: '0.15rem 0.5rem' }}>Radiopaedia ↗</a>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {images.map((img, i) => (
          <button key={i} type="button" onClick={() => open(i)} aria-label={`${copy.zoom}: ${img.caption}`}
            style={{ border: '1px solid rgba(255,255,255,0.18)', borderRadius: '8px', padding: 0, cursor: 'zoom-in', overflow: 'hidden', background: 'rgba(255,255,255,0.06)', flex: '1 1 140px', maxWidth: '220px' }}>
            <img src={img.src} alt={img.caption} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
            <p style={{ fontSize: '0.72rem', padding: '0.35rem 0.5rem', margin: 0, opacity: 0.75, lineHeight: 1.3 }}>{img.caption}</p>
          </button>
        ))}
      </div>
      {modalIndex !== null && (
        <ImageModal images={images} index={modalIndex} onClose={close} onPrev={prev} onNext={next} copy={copy} radiopaediaUrl={radiopaediaUrl} />
      )}
    </div>
  )
}

function SchemaImage({ src, alt, copy }) {
  const [zoomed, setZoomed] = useState(false)
  return (
    <div style={{ margin: '1.25rem 0' }}>
      <button type="button" onClick={() => setZoomed(true)} aria-label={`${copy.zoom}: ${alt}`}
        style={{ border: '1px solid rgba(255,255,255,0.18)', borderRadius: '8px', padding: 0, cursor: 'zoom-in', overflow: 'hidden', background: 'rgba(255,255,255,0.04)', display: 'block', width: '100%', maxWidth: '640px' }}>
        <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </button>
      <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.4rem' }}>{alt}</p>
      {zoomed && (
        <div className={styles.strokeImageModal} role="dialog" aria-modal="true" onClick={() => setZoomed(false)}>
          <div className={styles.strokeImageModalContent} onClick={e => e.stopPropagation()}>
            <button type="button" className={styles.strokeImageModalClose} onClick={() => setZoomed(false)} aria-label={copy.close}>×</button>
            <img src={src} alt={alt} style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function FrakturenKindesalterPage() {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  const c = v => L(v, lang)
  const rtl = lang === 'fa'
  const { isRead, toggleRead, authError } = useLessonReadStatus('frakturen-kindesalter')
  const [active, setActive] = useState('')
  const route = '/msk/trauma/frakturen-kindesalter'
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const rows = v => v.map(r => r.map(c))
  const D = FRAKTUR_KINDER_LESSON

  useEffect(() => {
    const os = D.sections.map(s => {
      const el = document.getElementById(s.id)
      if (!el) return null
      const o = new IntersectionObserver(es => { if (es[0].isIntersecting) setActive(s.id) }, { rootMargin: '-30% 0px -60% 0px' })
      o.observe(el)
      return o
    })
    return () => os.forEach(o => o?.disconnect())
  }, [])

  return (
    <main className={`${styles.page} ${styles.mskTraumaPage}`} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />

      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/msk')}>MSK</Link>
          <span>›</span>
          <span>{c(D.breadcrumb)}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{D.sourceLabel}</span>
            <h1>{c(D.title)}</h1>
            <p>{c(D.definition)}</p>
            <div className={styles.actions}>
              <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=msk&n=12&themen=frakturen-kindesalter&from=${encodeURIComponent(withLang(route))}`)}> 🎯 {copy.mcq}</Link>
              <Link className={styles.actionBtn} href={withLang(`/flashcards/frakturen-kindesalter?from=${encodeURIComponent(withLang(route))}`)}> 🧠 {copy.flash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {D.heroCards.map(card => (
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
          <div className={styles.sideTitle}>{c(D.toc)}</div>
          {D.sections.map(s => (
            <button type="button" key={s.id}
              className={`${styles.sideItem} ${active === s.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={s.emphasis ? { color: '#d97706', border: '1px solid rgba(217,119,6,.48)', background: 'rgba(217,119,6,.12)', fontWeight: 950 } : undefined}>
              <span>{s.icon}</span>
              <strong>{c(s.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>

          {/* GRUNDLAGEN */}
          <Section id="grundlagen" title={c(D.grundlagen.title)} lead={c(D.grundlagen.lead)}>
            <Cards items={D.grundlagen.items} lang={lang} />
            <Callout label={c(D.keyLabel)}>{c(D.grundlagen.key)}</Callout>
          </Section>

          {/* SALTER-HARRIS */}
          <Section id="salter-harris" title={c(D.salterHarris.title)} lead={c(D.salterHarris.lead)}>
            <SchemaImage src={D.salterHarris.schema.src} alt={c(D.salterHarris.schema.alt)} copy={copy} />
            <Table headers={D.salterHarris.headers.map(c)} rows={rows(D.salterHarris.rows)} />
            <Callout label={c(D.keyLabel)}>{c(D.salterHarris.key)}</Callout>
            <Callout label={c(D.caveLabel)} cave>{c(D.salterHarris.cave)}</Callout>
          </Section>

          {/* SCHAFTSFRAKTUREN */}
          <Section id="schaft" title={c(D.schaft.title)} lead={c(D.schaft.lead)}>
            <SchemaImage src={D.schaft.schema.src} alt={c(D.schaft.schema.alt)} copy={copy} />
            <Table headers={D.schaft.headers.map(c)} rows={rows(D.schaft.rows)} />
            <CaseGallery
              title={c(D.schaft.wulstCase.title)}
              images={D.schaft.wulstCase.images.map(img => ({ ...img, caption: c(img.caption) }))}
              radiopaediaUrl={D.schaft.wulstCase.radiopaediaUrl}
              copy={copy}
              lang={lang}
            />
            <CaseGallery
              title={c(D.schaft.gruenholzCase.title)}
              images={D.schaft.gruenholzCase.images.map(img => ({ ...img, caption: c(img.caption) }))}
              radiopaediaUrl={D.schaft.gruenholzCase.radiopaediaUrl}
              copy={copy}
              lang={lang}
            />
            <Callout label={c(D.keyLabel)}>{c(D.schaft.key)}</Callout>
          </Section>

          {/* TODDLER */}
          <Section id="toddler" title={c(D.toddler.title)} lead={c(D.toddler.lead)}>
            <Cards items={D.toddler.items} lang={lang} />
            <CaseGallery
              title={c(D.toddler.caseTitle)}
              images={D.toddler.images.map(img => ({ ...img, caption: c(img.caption) }))}
              radiopaediaUrl={D.toddler.radiopaediaUrl}
              copy={copy}
              lang={lang}
            />
            <Callout label={c(D.caveLabel)} cave>{c(D.toddler.cave)}</Callout>
          </Section>

          {/* ÜBERGANGSFRAKTUREN */}
          <Section id="uebergang" title={c(D.uebergang.title)} lead={c(D.uebergang.lead)}>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#d97706' }}>{c(D.uebergang.tillaux.title)}</h3>
              <p style={{ marginBottom: '0.75rem' }}>{c(D.uebergang.tillaux.text)}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.75 }}>
                <strong>{c({ de: 'Alter:', en: 'Age:', fa: 'سن:' })}</strong> {c(D.uebergang.tillaux.age)} &nbsp;|&nbsp;
                <strong>{c({ de: 'Bildgebung:', en: 'Imaging:', fa: 'تصویربرداری:' })}</strong> {c(D.uebergang.tillaux.imaging)}
              </p>
              <CaseGallery
                title={c(D.uebergang.tillaux.caseTitle)}
                images={D.uebergang.tillaux.images.map(img => ({ ...img, caption: c(img.caption) }))}
                radiopaediaUrl={D.uebergang.tillaux.radiopaediaUrl}
                copy={copy}
                lang={lang}
              />
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#d97706' }}>{c(D.uebergang.triplane.title)}</h3>
              <p style={{ marginBottom: '0.75rem' }}>{c(D.uebergang.triplane.text)}</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.75 }}>
                <strong>{c({ de: 'Alter:', en: 'Age:', fa: 'سن:' })}</strong> {c(D.uebergang.triplane.age)}
              </p>
              <SchemaImage src={D.uebergang.triplane.schema.src} alt={c(D.uebergang.triplane.schema.alt)} copy={copy} />
              <CaseGallery
                title={c(D.uebergang.triplane.caseTitle)}
                images={D.uebergang.triplane.images.map(img => ({ ...img, caption: c(img.caption) }))}
                radiopaediaUrl={D.uebergang.triplane.radiopaediaUrl}
                copy={copy}
                lang={lang}
              />
            </div>

            <Callout label={c(D.caveLabel)} cave>{c(D.uebergang.cave)}</Callout>
          </Section>

          {/* TAKE-HOME */}
          <Section id="takehome" title={c(D.takehome.title)} lead={c(D.takehome.lead)}>
            <div className={styles.takeHomeGrid}>
              {D.takehome.items.map((item, i) => (
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
