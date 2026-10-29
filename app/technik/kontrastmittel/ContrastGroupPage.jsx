'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import StandardLessonShell, { LessonSection, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { CONTRAST_GROUPS, CONTRAST_QUESTIONS, getContrastGroup } from '@/data/contrastMedia'
import { CONTRAST_LESSONS, CONTRAST_UI, localizeContrast } from '@/data/contrastLessons'
import styles from './page.module.css'
import design from './standard-design.module.css'

const SOURCES = [
  { label: 'ESUR Contrast Media Safety Guidelines 2026', href: 'https://www.esur.org/esur-guidelines-2026/' },
  { label: 'ACR Manual on Contrast Media 2026', href: 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual' },
  { label: 'EMA: Gadolinium contrast agents', href: 'https://www.ema.europa.eu/en/medicines/human/referrals/gadolinium-containing-contrast-agents' },
]

function ReadButton({ isRead, toggleRead, authError, ui, withLang }) {
  return (
    <div className={styles.readControl} data-book-ignore>
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
    <div className={styles.tableWrap} data-book-atomic>
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
    <div className={styles.selfCheck} data-book-question>
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
    <div className={`${styles.cardsGrid} ${block.columns === 2 ? styles.cardsTwo : ''}`} data-book-group>
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
          <figure className={styles.imageCard} key={item.src} data-book-image>
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
    <div className={`${styles.callout} ${block.variant === 'cave' ? styles.calloutCave : ''}`} data-book-note>
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
    <ol className={styles.steps} data-book-group>
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

export default function ContrastGroupPage({ groupId }) {
  const group = getContrastGroup(groupId)
  const lesson = CONTRAST_LESSONS[groupId]
  const { lang } = useLanguage()
  const ui = CONTRAST_UI[lang] || CONTRAST_UI.de
  const isRTL = lang === 'fa'
  const [lightbox, setLightbox] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus(group.readId)
  const pagePath = `/technik/kontrastmittel/${group.id}`
  const topicIds = group.topicIds.join(',')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const heroImage = groupId === 'roentgen'
    ? {
        src: '/educational/xray-contrast-attenuation.svg', width: 280, height: 220,
        alt: { de: 'Schema: Jod schwächt Röntgenstrahlen stärker als Weichteilgewebe.', en: 'Schematic: iodine attenuates X-rays more strongly than soft tissue.', fa: 'طرح شماتیک: ید پرتو ایکس را بیش از بافت نرم تضعیف می‌کند.' },
        caption: { de: 'Jodkontrast durch stärkere Röntgenabsorption', en: 'Iodine contrast through stronger X-ray attenuation', fa: 'کنتراست ید به‌دلیل جذب بیشتر پرتو ایکس' },
        legend: <><span><i className={styles.softTissueLegend} aria-hidden="true" />{localizeContrast({ de: 'Weichteilgewebe', en: 'Soft tissue', fa: 'بافت نرم' }, lang)}</span><span><i className={styles.iodineLegend} aria-hidden="true" />{localizeContrast({ de: 'Jodhaltiges KM', en: 'Iodinated contrast', fa: 'مادهٔ حاجب یددار' }, lang)}</span></>,
      }
    : groupId === 'nierenfunktion'
      ? {
          src: '/educational/renal-contrast-pass.svg', width: 300, height: 200,
          alt: { de: 'Konzeptdiagramm: intravenöses Kontrastmittel erreicht die Niere nach dem Kreislauf; bei einer arteriellen Erstpassage gelangt es direkt über die Nierenarterie dorthin.', en: 'Conceptual diagram: intravenous contrast reaches the kidneys after systemic circulation; with an arterial first pass it reaches them directly through the renal artery.', fa: 'طرح مفهومی: مادهٔ حاجب وریدی پس از گردش سیستمیک به کلیه می‌رسد؛ در عبور اول شریانی، مستقیماً از شریان کلیوی وارد می‌شود.' },
          caption: { de: 'Applikationsweg und renale Erstpassage', en: 'Administration route and renal first pass', fa: 'مسیر تزریق و عبور اول کلیوی' },
          legend: <><span><i className={styles.ivRouteLegend} aria-hidden="true" />{localizeContrast({ de: 'IV: Kreislauf → Niere', en: 'IV: circulation → kidney', fa: 'وریدی: کلیه ← گردش خون' }, lang)}</span><span><i className={styles.iaRouteLegend} aria-hidden="true" />{localizeContrast({ de: 'IA-Erstpass: direkt zur Niere', en: 'IA first pass: direct to kidney', fa: 'عبور اول شریانی: کلیه ← مسیر مستقیم شریانی' }, lang)}</span></>,
        }
      : groupId === 'mrt'
        ? {
            src: '/educational/gadolinium-chelate.svg', width: 280, height: 160,
            alt: { de: 'Konzeptschema: ein linearer Ligand umgibt Gadolinium offen; ein makrozyklischer Ligand bildet einen geschlossenen Ring. Nicht maßstabsgetreu und keine Molekülstruktur.', en: 'Concept schematic: a linear ligand loosely surrounds gadolinium, while a macrocyclic ligand forms a closed ring. Not to scale and not a molecular structure.', fa: 'طرح مفهومی: لیگاند خطی گادولینیوم را به‌صورت باز احاطه می‌کند و لیگاند ماکروسیکلیک حلقه‌ای بسته می‌سازد. مقیاس‌دار یا ساختار مولکولی دقیق نیست.' },
            caption: { de: 'Chelatgeometrie: offene Kette und geschlossener Ring', en: 'Chelate geometry: open chain and closed ring', fa: 'هندسهٔ شلات: زنجیرهٔ باز و حلقهٔ بسته' },
            legend: <><span><i className={styles.linearLegend} aria-hidden="true" />{localizeContrast({ de: 'Linear, schematisch', en: 'Linear, schematic', fa: 'خطی، شماتیک' }, lang)}</span><span><i className={styles.macrocyclicLegend} aria-hidden="true" />{localizeContrast({ de: 'Makrozyklisch, schematisch', en: 'Macrocyclic, schematic', fa: 'ماکروسیکلیک، شماتیک' }, lang)}</span></>,
          }
        : groupId === 'schwangerschaft' ? {
            src: '/educational/pregnancy-contrast-pathways.svg', width: 300, height: 169,
            alt: { de: 'Konzeptschema, nicht anatomisch: zwei getrennte Wege der Exposition – Plazentaübertritt während der Schwangerschaft und begrenzter Übertritt in die Muttermilch nach der Geburt.', en: 'Conceptual, non-anatomical diagram of two separate exposure routes: placental transfer during pregnancy and limited transfer into breast milk after birth.', fa: 'طرح مفهومی و غیرآناتومیک از دو مسیر جداگانهٔ مواجهه: عبور از جفت در بارداری و انتقال محدود به شیر مادر پس از تولد.' },
            caption: { de: 'Schwangerschaft: Plazentapassage · Stillzeit: Übertritt in die Milch', en: 'Pregnancy: placental transfer · Lactation: transfer into milk', fa: 'بارداری: عبور از جفت · شیردهی: انتقال به شیر' },
            legend: <><span><i className={styles.iodineLegend} aria-hidden="true" />{localizeContrast({ de: 'In utero: fetale Exposition', en: 'In utero: fetal exposure', fa: 'در رحم: مواجههٔ جنین' }, lang)}</span><span><i className={styles.macrocyclicLegend} aria-hidden="true" />{localizeContrast({ de: 'Nach Geburt: Milchtransfer', en: 'After birth: milk transfer', fa: 'پس از تولد: انتقال به شیر' }, lang)}</span></>,
          } : null

  useEffect(() => {
    if (!lightbox) return undefined
    const close = event => { if (event.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [lightbox])

  const sectionLabels = {
    de: { contents: 'Seitenpfad', path: 'Lernpfad', progress: 'gelesen', continue: 'Weiterlernen', complete: 'Abschnitt als gelesen markieren', completed: 'Als gelesen markiert', completeLesson: 'Gesamte Lektion als gelesen markieren', lessonCompleted: 'Alle Kapitel gelesen', open: 'Öffnen', close: 'Schließen', takeHome: 'Take Home Message' },
    en: { contents: 'Breadcrumb', path: 'Learning path', progress: 'read', continue: 'Continue', complete: 'Mark section as read', completed: 'Marked as read', completeLesson: 'Mark the entire lesson as read', lessonCompleted: 'All chapters read', open: 'Open', close: 'Close', takeHome: 'Take Home Message' },
    fa: { contents: 'مسیر صفحه', path: 'مسیر یادگیری', progress: 'خوانده‌شده', continue: 'ادامهٔ درس', complete: 'علامت‌گذاری بخش به‌عنوان خوانده‌شده', completed: 'خوانده شد', completeLesson: 'علامت‌گذاری کل درس به‌عنوان خوانده‌شده', lessonCompleted: 'همهٔ فصل‌ها خوانده شده‌اند', open: 'باز کردن', close: 'بستن', takeHome: 'پیام نهایی' },
  }[lang] || {}
  const sections = lesson.sections.map(section => ({ id: section.id, label: localizeContrast(section.title, lang), icon: section.id === 'takehome' ? 'summary' : 'content', emphasis: section.id === 'takehome' }))
  const renderIcon = name => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={name === 'summary' ? 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z' : 'M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4zM13 7a3 3 0 0 1 3-3h5v15h-4a4 4 0 0 0-4 2'} /></svg>

  return <>
    <StandardLessonShell lessonId={group.readId} heroLessonId={pagePath} lang={lang} title={localizeContrast(lesson.title, lang)} author={lesson.sourceLabel}
      sections={sections} labels={sectionLabels} syncHashNavigation renderIcon={renderIcon} heroImageAlt={localizeContrast(lesson.title, lang)} presentationQuestions={CONTRAST_QUESTIONS[lang] || CONTRAST_QUESTIONS.de}
      breadcrumbs={[{ label: 'RadYar', href: withLang('/') }, { label: ui.breadcrumb, href: withLang('/lernen/technik') }, { label: localizeContrast(lesson.title, lang) }]}
      actions={{ mcq: { label: ui.mcq, href: withLang(`/ueben/quiz?fach=technik&n=10&themen=${topicIds}&from=${encodeURIComponent(pagePath)}`) }, flashcards: { label: ui.flashcards, href: withLang(`/flashcards/${group.flashcardId}?from=${encodeURIComponent(pagePath)}`) } }}
      theme={{ backgroundImage: '/andarun-galaxy-v3.png', accent: '#8c6a9b', accentStrong: '#573763', accentSoft: '#efe5f3', secondary: '#68a5ac', secondaryStrong: '#2f6670', heroBase: '#201829' }}
      sources={<aside className={design.sources}><h2>{ui.sources}</h2><p>{ui.sourceNote}</p>{SOURCES.map(source => <p key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a></p>)}<h3>{ui.otherLessons}</h3><nav aria-label={ui.otherLessons}>{CONTRAST_GROUPS.filter(item => item.id !== group.id).map(item => <Link href={withLang(`/technik/kontrastmittel/${item.id}`)} key={item.id}>{localizeContrast(item.title, lang)} →</Link>)}</nav><ReadButton isRead={isRead} toggleRead={toggleRead} authError={authError} ui={ui} withLang={withLang} /></aside>}>
      {lesson.sections.map((section, index) => <LessonSection id={section.id} key={section.id} bodyClassName={design.content}>
        {index === 0 ? <><dl className={design.orientation} data-book-overview>{lesson.stats.map(stat => <div key={localizeContrast(stat.value, lang)}><dt>{localizeContrast(stat.value, lang)} · {localizeContrast(stat.label, lang)}</dt><dd>{localizeContrast(stat.text, lang)}</dd></div>)}</dl>{heroImage ? <figure className={design.diagram}><Image src={heroImage.src} alt={localizeContrast(heroImage.alt, lang)} width={heroImage.width} height={heroImage.height} /><figcaption>{localizeContrast(heroImage.caption, lang)}</figcaption><div className={styles.heroVisualLegend}>{heroImage.legend}</div></figure> : null}</> : null}
        {section.lead ? <p className={design.lead}>{localizeContrast(section.lead, lang)}</p> : null}
        {section.blocks.map((block, blockIndex) => block.type === 'takehome' ? <TakeHomeList key={blockIndex} items={block.items.map(item => ({ title: localizeContrast(item.title, lang), detail: localizeContrast(item.text, lang) }))} /> : <ContentBlock block={block} lang={lang} ui={ui} withLang={withLang} onOpen={setLightbox} key={`${section.id}-${block.type}-${blockIndex}`} />)}
      </LessonSection>)}
    </StandardLessonShell>
    {lightbox ? <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}><div className={styles.lightboxContent} onClick={event => event.stopPropagation()}><button type="button" onClick={() => setLightbox(null)} aria-label={ui.closeImage}>×</button><Image src={lightbox.src} alt={lightbox.alt} width={1200} height={1200} priority /><p>{lightbox.alt}</p></div></div> : null}
  </>
}
