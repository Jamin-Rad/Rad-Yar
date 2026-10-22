'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import InProgressBanner from '@/components/InProgressBanner'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import { CONTRAST_GROUPS, getContrastGroup } from '@/data/contrastMedia'
import { CONTRAST_LESSONS, CONTRAST_UI, localizeContrast } from '@/data/contrastLessons'
import styles from './page.module.css'

const SOURCES = [
  { label: 'ESUR Contrast Media Safety Guidelines 2026', href: 'https://www.esur.org/esur-guidelines-2026/' },
  { label: 'ACR Manual on Contrast Media', href: 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual' },
  { label: 'EMA: Gadolinium contrast agents', href: 'https://www.ema.europa.eu/en/medicines/human/referrals/gadolinium-containing-contrast-agents' },
]

function ReadButton({ isRead, toggleRead, authError, ui, withLang }) {
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={toggleRead}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? ui.read : ui.mark}</span>
      </button>
      {authError && <div className={styles.authError} role="alert"><span>{ui.auth}</span><Link href={withLang('/sign-in')}>{ui.signIn}</Link></div>}
    </div>
  )
}

function TableBlock({ block, lang }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{block.headers.map((header, index) => <th key={`${index}-${localizeContrast(header, lang)}`}>{localizeContrast(header, lang)}</th>)}</tr></thead>
        <tbody>{block.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{localizeContrast(cell, lang)}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
  )
}

function SelfCheckBlock({ block, lang }) {
  const [selected, setSelected] = useState(null)
  const correct = selected === block.correct
  return (
    <div className={styles.selfCheck}>
      <h3>{localizeContrast(block.title, lang)}</h3>
      <p>{localizeContrast(block.question, lang)}</p>
      <div className={styles.selfCheckOptions}>
        {block.options.map((option, index) => (
          <button type="button" key={index} aria-pressed={selected === index} className={`${styles.selfCheckOption} ${selected === index ? (correct ? styles.selfCheckCorrect : styles.selfCheckIncorrect) : ''}`} onClick={() => setSelected(index)}>
            {localizeContrast(option, lang)}
          </button>
        ))}
      </div>
      {selected !== null ? <p className={styles.selfCheckFeedback} role="status"><strong>{correct ? localizeContrast(block.correctLabel, lang) : localizeContrast(block.reviewLabel, lang)}</strong> {localizeContrast(block.feedback, lang)}</p> : null}
    </div>
  )
}

function CardBlock({ block, lang }) {
  return (
    <div className={`${styles.cardsGrid} ${block.columns === 2 ? styles.cardsTwo : ''}`}>
      {block.items.map((item, index) => (
        <article className={styles.infoCard} key={`${index}-${localizeContrast(item.title, lang)}`}>
          <h3>{localizeContrast(item.title, lang)}</h3>
          {item.text ? <p>{localizeContrast(item.text, lang)}</p> : null}
          {item.bullets?.length ? <ul>{item.bullets.map((bullet, bulletIndex) => <li key={bulletIndex}>{localizeContrast(bullet, lang)}</li>)}</ul> : null}
        </article>
      ))}
    </div>
  )
}

function ImageGallery({ block, lang, ui, onOpen }) {
  return (
    <div className={`${styles.imageGallery} ${block.images.length === 1 ? styles.imageGallerySingle : ''}`}>
      {block.images.map(item => {
        const alt = localizeContrast(item.alt, lang)
        return (
          <figure className={styles.imageCard} key={item.src}>
            <button type="button" onClick={() => onOpen({ src: item.src, alt })} aria-label={`${ui.openImage}: ${alt}`}>
              <Image src={item.src} alt={alt} width={520} height={520} sizes={block.images.length === 1 ? '(max-width: 760px) 100vw, 860px' : '(max-width: 760px) 100vw, 33vw'} />
            </button>
            <figcaption>
              <span>{alt}</span>
              {item.caption ? <small>{localizeContrast(item.caption, lang)}</small> : null}
            </figcaption>
          </figure>
        )
      })}
    </div>
  )
}

function ContentBlock({ block, lang, ui, withLang, onOpen }) {
  if (block.type === 'selfCheck') return <SelfCheckBlock block={block} lang={lang} />
  if (block.type === 'cards') return <CardBlock block={block} lang={lang} />
  if (block.type === 'table') return <TableBlock block={block} lang={lang} />
  if (block.type === 'imageGallery') return <ImageGallery block={block} lang={lang} ui={ui} onOpen={onOpen} />
  if (block.type === 'callout') return (
    <div className={`${styles.callout} ${block.variant === 'cave' ? styles.calloutCave : ''}`}>
      <strong>{localizeContrast(block.title, lang) || (block.variant === 'cave' ? ui.cave : ui.key)}</strong>
      <p>{localizeContrast(block.text, lang)}</p>
    </div>
  )
  if (block.type === 'prose') return (
    <div className={styles.proseBlock}>
      {block.title ? <h3>{localizeContrast(block.title, lang)}</h3> : null}
      {block.paragraphs.map((paragraph, index) => <p key={index}>{localizeContrast(paragraph, lang)}</p>)}
    </div>
  )
  if (block.type === 'list') return (
    <div className={styles.listBlock}>
      <h3>{localizeContrast(block.title, lang)}</h3>
      <ul>{block.items.map((item, index) => <li key={index}>{localizeContrast(item, lang)}</li>)}</ul>
    </div>
  )
  if (block.type === 'steps') return (
    <ol className={styles.steps}>
      {block.items.map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{localizeContrast(item.title, lang)}</h3><p>{localizeContrast(item.text, lang)}</p></div></li>)}
    </ol>
  )
  if (block.type === 'takehome') return (
    <div className={styles.takeHomeGrid}>
      {block.items.map((item, index) => <div className={styles.takeHomeItem} key={index}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{localizeContrast(item.title, lang)}</h3><p>{localizeContrast(item.text, lang)}</p></div></div>)}
    </div>
  )
  if (block.type === 'lessonLink') return <Link className={styles.lessonLink} href={withLang(`/technik/kontrastmittel/${block.target}`)}>{localizeContrast(block.label, lang)} <span aria-hidden="true">→</span></Link>
  if (block.type === 'sourceLink') return <p className={styles.sourceLink}><a href={block.href} target="_blank" rel="noreferrer">{localizeContrast(block.label, lang)} ↗</a></p>
  return null
}

function LessonSection({ section, lang, ui, withLang, onOpen }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)

  useEffect(() => setOpen(false), [section.id])

  return (
    <section id={section.id} className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <span className={styles.sectionHeading}><span className={styles.sectionIcon}>{section.icon}</span><h2>{localizeContrast(section.title, lang)}</h2></span>
        <span className={styles.sectionToggle}>{open ? '−' : '+'}</span>
      </button>
      {open ? <div className={styles.sectionBody}>
        {section.lead ? <p className={styles.lead}>{localizeContrast(section.lead, lang)}</p> : null}
        {section.blocks.map((block, index) => <ContentBlock block={block} lang={lang} ui={ui} withLang={withLang} onOpen={onOpen} key={`${section.id}-${block.type}-${index}`} />)}
      </div> : null}
    </section>
  )
}

export default function ContrastGroupPage({ groupId }) {
  const group = getContrastGroup(groupId)
  const lesson = CONTRAST_LESSONS[groupId]
  const { lang } = useLanguage()
  const ui = CONTRAST_UI[lang] || CONTRAST_UI.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(lesson.sections[0].id)
  const [lightbox, setLightbox] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus(group.readId)
  const pagePath = `/technik/kontrastmittel/${group.id}`
  const topicIds = group.topicIds.join(',')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => lesson.sections.map(section => section.id), [lesson.sections])

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
    if (!lightbox) return undefined
    const close = event => { if (event.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [lightbox])

  return (
    <>
      <Navbar />
      <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        <InProgressBanner lang={lang} />
        <header className={styles.header}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={withLang('/')}>RadYar</Link><span>›</span>
            <Link href={withLang('/lernen/technik')}>{ui.breadcrumb}</Link><span>›</span>
            <span>{localizeContrast(lesson.title, lang)}</span>
          </nav>
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <span className={styles.sourceBadge}>{lesson.sourceLabel}</span>
              <h1>{localizeContrast(lesson.title, lang)}</h1>
              <div className={styles.actions}>
                <Link className={styles.actionBtn} href={withLang(`/ueben/quiz?fach=technik&n=10&themen=${topicIds}&from=${encodeURIComponent(pagePath)}`)}>{ui.mcq}</Link>
                <Link className={styles.actionBtn} href={withLang(`/flashcards/${group.flashcardId}?from=${encodeURIComponent(pagePath)}`)}>{ui.flashcards}</Link>
              </div>
            </div>
            {groupId === 'roentgen' ? <figure className={styles.heroVisual}>
              <Image src="/educational/xray-contrast-attenuation.svg" alt={localizeContrast({ de: 'Schema: Jod schwächt Röntgenstrahlen stärker als Weichteilgewebe.', en: 'Schematic: iodine attenuates X-rays more strongly than soft tissue.', fa: 'طرح شماتیک: ید پرتو ایکس را بیش از بافت نرم تضعیف می‌کند.' }, lang)} width={280} height={220} priority />
              <figcaption>{localizeContrast({ de: 'Jodkontrast durch stärkere Röntgenabsorption', en: 'Iodine contrast through stronger X-ray attenuation', fa: 'کنتراست ید به‌دلیل جذب بیشتر پرتو ایکس' }, lang)}</figcaption>
              <div className={styles.heroVisualLegend}>
                <span><i className={styles.softTissueLegend} aria-hidden="true" />{localizeContrast({ de: 'Weichteilgewebe', en: 'Soft tissue', fa: 'بافت نرم' }, lang)}</span>
                <span><i className={styles.iodineLegend} aria-hidden="true" />{localizeContrast({ de: 'Jodhaltiges KM', en: 'Iodinated contrast', fa: 'مادهٔ حاجب یددار' }, lang)}</span>
              </div>
            </figure> : groupId === 'nierenfunktion' ? <figure className={styles.heroVisual}>
              <Image src="/educational/renal-contrast-pass.svg" alt={localizeContrast({ de: 'Konzeptdiagramm: intravenöses Kontrastmittel erreicht die Niere nach dem Kreislauf; bei einer arteriellen Erstpassage gelangt es direkt über die Nierenarterie dorthin.', en: 'Conceptual diagram: intravenous contrast reaches the kidneys after systemic circulation; with an arterial first pass it reaches them directly through the renal artery.', fa: 'طرح مفهومی: مادهٔ حاجب وریدی پس از گردش سیستمیک به کلیه می‌رسد؛ در عبور اول شریانی، مستقیماً از شریان کلیوی وارد می‌شود.' }, lang)} width={300} height={200} priority />
              <figcaption>{localizeContrast({ de: 'Applikationsweg und renale Erstpassage', en: 'Administration route and renal first pass', fa: 'مسیر تزریق و عبور اول کلیوی' }, lang)}</figcaption>
              <div className={styles.heroVisualLegend}>
                <span><i className={styles.ivRouteLegend} aria-hidden="true" />{localizeContrast({ de: 'IV: Kreislauf → Niere', en: 'IV: circulation → kidney', fa: 'وریدی: کلیه ← گردش خون' }, lang)}</span>
                <span><i className={styles.iaRouteLegend} aria-hidden="true" />{localizeContrast({ de: 'IA-Erstpass: direkt zur Niere', en: 'IA first pass: direct to kidney', fa: 'عبور اول شریانی: کلیه ← مسیر مستقیم شریانی' }, lang)}</span>
              </div>
            </figure> : groupId === 'mrt' ? <figure className={styles.heroVisual}>
              <Image src="/educational/gadolinium-chelate.svg" alt={localizeContrast({ de: 'Konzeptschema: ein linearer Ligand umgibt Gadolinium offen; ein makrozyklischer Ligand bildet einen geschlossenen Ring. Nicht maßstabsgetreu und keine Molekülstruktur.', en: 'Concept schematic: a linear ligand loosely surrounds gadolinium, while a macrocyclic ligand forms a closed ring. Not to scale and not a molecular structure.', fa: 'طرح مفهومی: لیگاند خطی گادولینیوم را به‌صورت باز احاطه می‌کند و لیگاند ماکروسیکلیک حلقه‌ای بسته می‌سازد. مقیاس‌دار یا ساختار مولکولی دقیق نیست.' }, lang)} width={280} height={160} priority />
              <figcaption>{localizeContrast({ de: 'Chelatgeometrie: offene Kette und geschlossener Ring', en: 'Chelate geometry: open chain and closed ring', fa: 'هندسهٔ شلات: زنجیرهٔ باز و حلقهٔ بسته' }, lang)}</figcaption>
              <div className={styles.heroVisualLegend}>
                <span><i className={styles.linearLegend} aria-hidden="true" />{localizeContrast({ de: 'Linear, schematisch', en: 'Linear, schematic', fa: 'خطی، شماتیک' }, lang)}</span>
                <span><i className={styles.macrocyclicLegend} aria-hidden="true" />{localizeContrast({ de: 'Makrozyklisch, schematisch', en: 'Macrocyclic, schematic', fa: 'ماکروسیکلیک، شماتیک' }, lang)}</span>
              </div>
            </figure> : null}
            <div className={styles.heroStats}>{lesson.stats.map(stat => (
              <div className={styles.heroStat} key={stat.value}><strong>{stat.value}</strong><span>{localizeContrast(stat.label, lang)}</span><small>{localizeContrast(stat.text, lang)}</small></div>
            ))}</div>
          </div>
        </header>

        <div className={styles.readBar}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} ui={ui} withLang={withLang} /></div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.sideTitle}>{ui.toc}</div>
            {lesson.sections.map(section => (
              <button type="button" key={section.id} className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                <span>{section.icon}</span><strong>{localizeContrast(section.nav, lang)}</strong>
              </button>
            ))}
            <div className={styles.otherLessons}><h3>{ui.otherLessons}</h3>{CONTRAST_GROUPS.filter(item => item.id !== group.id).map(item => <Link href={withLang(`/technik/kontrastmittel/${item.id}`)} key={item.id}><span>{item.icon}</span>{localizeContrast(item.title, lang)}</Link>)}</div>
          </aside>

          <div className={styles.main}>
            {lesson.sections.map(section => <LessonSection section={section} lang={lang} ui={ui} withLang={withLang} onOpen={setLightbox} key={section.id} />)}
            <section className={styles.sources}><h2>{ui.sources}</h2><p>{ui.sourceNote}</p><div>{SOURCES.map(source => <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>{source.label} ↗</a>)}</div></section>
            <div className={styles.readBarBottom}><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} ui={ui} withLang={withLang} /></div>
          </div>
        </div>

        {lightbox ? <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxContent} onClick={event => event.stopPropagation()}>
            <button type="button" onClick={() => setLightbox(null)} aria-label={ui.closeImage}>×</button>
            <Image src={lightbox.src} alt={lightbox.alt} width={1200} height={1200} priority />
            <p>{lightbox.alt}</p>
          </div>
        </div> : null}
      </main>
    </>
  )
}
