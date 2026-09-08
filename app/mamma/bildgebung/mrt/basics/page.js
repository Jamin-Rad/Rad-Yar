'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'
import { BPE_CATEGORIES, FGT_CATEGORIES, INDICATIONS, SECTIONS, SEQUENCES, WORKFLOW, translate } from './content'

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

const SECTION_ICON_PATHS = {
  target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M22 12h-3M12 22v-3M2 12h3"/></>,
  layers: <><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/></>,
  workflow: <><path d="M4 5h7M4 12h11M4 19h15"/><circle cx="16" cy="5" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="22" cy="19" r="2"/></>,
  compare: <><path d="M4 7h16M7 4v6M17 4v6M4 17h16M10 14v6M14 14v6"/></>,
  check: <><path d="M12 3 20 7v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
}

function SectionIcon({ name }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{SECTION_ICON_PATHS[name]}</svg>
}


function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={base.readControl}>
      <button type="button" className={`${base.readButton} ${styles.readButton} ${isRead ? `${base.readButtonActive} ${styles.readButtonActive}` : ''}`} onClick={onClick}>
        <span className={`${base.readCheck} ${styles.readCheck}`} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={base.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Section({ id, title, children }) {
  useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(false), [id])
  return (
    <section id={id} className={`${base.section} ${styles.section}`}>
      <button className={`${base.sectionHeader} ${styles.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <span className={styles.sectionHeading}><span className={styles.sectionIcon}><SectionIcon name={SECTIONS.find(section => section.id === id)?.icon} /></span><h2>{title}</h2></span>
        <span className={styles.sectionToggle}>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={`${base.sectionBody} ${styles.sectionBody}`}>{children}</div>}
    </section>
  )
}

function Callout({ cave = false, label, children }) {
  return <div className={`${base.callout} ${styles.callout} ${cave ? styles.cave : ''}`}><strong>{label}</strong><p>{children}</p></div>
}

function ZoomFigure({ figureClassName, src, width, height, alt, sizes, loading, caption, zoomLabel, ariaLabel }) {
  const [open, setOpen] = useState(false)
  return (
    <figure className={figureClassName}>
      <button type="button" className={styles.zoomTrigger} onClick={() => setOpen(true)} aria-label={ariaLabel || zoomLabel}>
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} loading={loading} />
      </button>
      <figcaption>{caption}<span>{zoomLabel}</span></figcaption>
      {open && (
        <div className={base.strokeImageModal} role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className={base.strokeImageModalContent} onClick={event => event.stopPropagation()}>
            <button type="button" className={base.strokeImageModalClose} onClick={() => setOpen(false)} aria-label={zoomLabel}>×</button>
            <img src={src} alt={alt} />
          </div>
        </div>
      )}
    </figure>
  )
}

export default function MammaMrtBasicsPage() {
  const { lang } = useLanguage()
  const tx = value => translate(lang, value)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('mamma-mrt-basics')
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const lessonPath = '/mamma/bildgebung/mrt/basics'
  const sectionIds = useMemo(() => SECTIONS.map(section => section.id), [])

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
    <main className={`${base.page} ${styles.page} ${lang === 'fa' ? styles.rtl : ''}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
      <header className={base.header}>
        <nav className={`${base.breadcrumb} ${styles.breadcrumb}`} aria-label={tx('Inhaltsverzeichnis')}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/mamma')}>{tx('Mamma')}</Link><span>›</span>
          <Link href={withLang('/lernen/mamma')}>{tx('Bildgebung')}</Link><span>›</span>
          <span>{tx('Mamma-MRT')}</span><span>›</span><strong>{tx('Basics')}</strong>
        </nav>

        <div className={base.hero}>
          <div className={`${base.heroText} ${styles.heroText}`}>
            <span className={`${base.sourceBadge} ${styles.sourceBadge}`}>Dr. Zia</span>
            <h1>{tx('Mamma-MRT')}:<br />{tx('Basics')}</h1>
            <p>{tx('Indikationen, Sequenzen und ein systematischer Einstieg in die Befundung.')}</p>
            <div className={base.actions}>
              <Link className={`${base.actionBtn} ${styles.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=10&themen=mamma-mrt-basics&from=${encodeURIComponent(withLang(lessonPath))}`)}>🎯 MCQ</Link>
              <Link className={`${base.actionBtn} ${styles.actionBtn}`} href={withLang(`/flashcards/mamma-mrt-basics?from=${encodeURIComponent(withLang(lessonPath))}`)}>🧠 {tx('Flashcards')}</Link>
            </div>
          </div>
          <div className={base.heroStats}>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>T1 post KM</strong><span>{tx('Kernsequenz')}</span><small>{tx('Enhancement beurteilen.')}</small></div>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>ADC ↓ ≠ Krebs</strong><span>{tx('Nur Zusatzbaustein')}</span><small>{tx('Nie isoliert bewerten.')}</small></div>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>MIP</strong><span>{tx('Suchen, nicht entscheiden')}</span><small>{tx('Schneller Überblick.')}</small></div>
          </div>
        </div>
      </header>

      <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

      <div className={base.layout}>
        <aside className={`${base.sidebar} ${styles.sidebar}`}>
          <div className={base.sideTitle}>{tx('Inhaltsverzeichnis')}</div>
          {SECTIONS.map(section => (
            <button key={section.id} type="button" className={`${base.sideItem} ${styles.sideItem} ${activeId === section.id ? `${base.sideItemActive} ${styles.sideItemActive}` : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <span className={styles.sideNumber}><SectionIcon name={section.icon} /></span><strong>{tx(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={base.main}>
          <Section id="indikationen" title={tx('Indikationen')}>
            <p className={styles.lead}>{tx('Die Mamma-MRT ist die')} <strong>{tx('sensitivste bildgebende Methode')}</strong> {tx('zum Nachweis eines Mammakarzinoms. Ihre hohe Sensitivität beruht vor allem auf der Darstellung der')} <strong>{tx('Tumorvaskularisation und Kontrastmittelaufnahme')}</strong>. {tx('Gleichzeitig ist die Spezifität begrenzt: Auch zahlreiche benigne Veränderungen können Kontrastmittel aufnehmen.')}</p>
            <div className={styles.indicationGrid}>{INDICATIONS.map(item => <article className={styles.indicationCard} key={item.title}><span>{tx(item.tag)}</span><h3>{tx(item.title)}</h3><p>{tx(item.text)}</p></article>)}</div>
            <div className={styles.problemBox}><div><span>{tx('Problem Solving · Beispiele')}</span><h3>{tx('Wenn die konventionelle Diagnostik unklar bleibt')}</h3></div><ul><li>{tx('nicht sicher erklärbare Asymmetrie')}</li><li>{tx('unklare Architekturstörung')}</li><li>{tx('diskrepante Befunde zwischen Mammographie und Sonographie')}</li><li>{tx('schwer beurteilbare postoperative Veränderungen')}</li></ul></div>
            <Callout cave label={tx('Wichtig')}>{tx('Die MRT sollte nicht dazu verwendet werden, eine indizierte Biopsie eines suspekten Befundes zu vermeiden. Ein klar suspekter und bioptisch zugänglicher Befund sollte in der Regel histologisch abgeklärt werden.')}</Callout>
          </Section>

          <Section id="sequenzen" title={tx('Welche Sequenzen brauchen wir?')}>
            <div className={styles.sequenceGrid}>{SEQUENCES.map(sequence => (
              <article className={`${styles.sequenceCard} ${styles[sequence.accent]}`} key={sequence.key}>
                <div className={styles.sequenceTop}><strong>{sequence.key}</strong><span>{tx(sequence.role)}</span></div>
                <p className={styles.sequenceIntro}>{tx(sequence.intro)}</p>
                <ul>{sequence.points.map(point => <li key={point}>{tx(point)}</li>)}</ul>
                <div className={styles.sequenceNotes}>
                  {sequence.note && <p>{tx(sequence.note)}</p>}
                  {sequence.followUp && <p>{tx(sequence.followUp)}</p>}
                </div>
              </article>
            ))}</div>
            <div className={styles.sequenceSummary}>
              <span>{tx('Merke')}</span>
              <ul>
                <li><strong>{tx('T1 nach Kontrastmittel ist einer der wichtigsten Teile der Mamma-MRT.')}</strong></li>
                <li><strong>{tx('Ein niedriger ADC bedeutet nicht automatisch Krebs.')}</strong></li>
                <li><strong>{tx('Die MIP ist perfekt zum Suchen, aber nicht zur endgültigen Beurteilung.')}</strong></li>
              </ul>
            </div>
          </Section>

          <Section id="systematik" title={tx('Wie liest man eine Mamma-MRT systematisch?')}>
            <p className={styles.lead}>{tx('Ein fester Ablauf hilft, nichts zu übersehen.')}</p>
            <ol className={styles.workflow}>{WORKFLOW.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{tx(step.title)}</h3>
                  <p>{tx(step.text)}{step.inlineEmphasis && <> <strong className={styles.workflowInlineEmphasis}>{tx(step.inlineEmphasis)}</strong></>}</p>
                  {step.detail && <p className={styles.workflowDetail}>{tx(step.detail)}</p>}
                  {step.categories && (
                    <ul className={styles.workflowTypes}>
                      {step.categories.map((category) => <li key={category.title}><strong>{category.title}</strong><span>{tx(category.text)}</span></li>)}
                    </ul>
                  )}
                  {step.showEnhancementImage && (
                    <ZoomFigure
                      figureClassName={`${styles.enhancementMedia} ${styles.workflowMedia}`}
                      src="/mamma/mrt/enhancement-types.png"
                      width={1536}
                      height={1024}
                      alt={tx('MRT-Beispiele für Mass und Non-Mass Enhancement')}
                      sizes="(max-width: 900px) calc(100vw - 48px), 860px"
                      caption={<strong>Mass · Non-Mass Enhancement</strong>}
                      zoomLabel={tx('Zum Vergrößern Bild öffnen')}
                      ariaLabel={tx('Enhancement-Typen in voller Größe öffnen')}
                    />
                  )}
                </div>
              </li>
            ))}</ol>
          </Section>

          <Section id="fgt-bpe" title={tx('FGT und BPE')}>
            <div className={styles.compareGrid}>
              <article className={styles.fgtCard}>
                <div className={styles.compareHeading}><span className={styles.term}>FGT</span><div><small>{tx('Fibroglanduläres Gewebe')}</small><h3>Fibroglandular Tissue</h3></div></div>
                <p className={styles.definition}>{tx('FGT beschreibt die')} <strong>{tx('Menge des fibroglandulären Brustgewebes')}</strong> {tx('– unabhängig davon, wie stark dieses nach Kontrastmittelgabe anreichert.')}</p>
                <ZoomFigure
                  figureClassName={styles.teachingMedia}
                  src="/mamma/mrt/fgt-categories-abcd.png"
                  width={2170}
                  height={725}
                  alt={tx('Vier MRT-Beispiele der FGT-Kategorien von fast vollständig fettig bis extrem fibroglandulär')}
                  sizes="(max-width: 900px) calc(100vw - 64px), 820px"
                  loading="eager"
                  caption={<strong>{tx('FGT a–d im MRT')}</strong>}
                  zoomLabel={tx('Zum Vergrößern Bild öffnen')}
                  ariaLabel={tx('FGT-Kategorien in voller Größe öffnen')}
                />
                <p className={styles.categoryIntro}>{tx('Nach BI-RADS wird das FGT qualitativ in vier Kategorien eingeteilt:')}</p>
                <div className={styles.categoryList}>
                  {FGT_CATEGORIES.map((category) => (
                    <div key={category.key} className={styles.categoryItem}>
                      <span>{category.key}</span><div><h4>{tx(category.title)}</h4><p>{tx(category.text)}</p></div>
                    </div>
                  ))}
                </div>
                <div className={styles.modalityNote}>
                  <strong>{tx('FGT ist nicht dasselbe wie mammographische Brustdichte')}</strong>
                  <p>{tx('Beide beschreiben zwar die Zusammensetzung der Brust, werden jedoch mit unterschiedlichen Modalitäten beurteilt. Die MRT-Kategorie beschreibt die sichtbare Menge des fibroglandulären Gewebes in der MRT.')}</p>
                </div>
              </article>

              <article className={styles.bpeCard}>
                <div className={styles.compareHeading}><span className={`${styles.term} ${styles.termBpe}`}>BPE</span><div><small>{tx('Normales Parenchym')}</small><h3>Background Parenchymal Enhancement</h3></div></div>
                <p className={styles.definition}>{tx('BPE beschreibt, wie stark das')} <strong>{tx('normale fibroglanduläre Brustgewebe nach Kontrastmittelgabe anreichert')}</strong>.</p>
                <ZoomFigure
                  figureClassName={styles.teachingMedia}
                  src="/mamma/mrt/bpe-categories.png"
                  width={1811}
                  height={868}
                  alt={tx('Vier MRT-Beispiele der BPE-Kategorien minimal, mild, moderate und marked')}
                  sizes="(max-width: 900px) calc(100vw - 64px), 820px"
                  loading="eager"
                  caption={<strong>{tx('BPE minimal–marked im MRT')}</strong>}
                  zoomLabel={tx('Zum Vergrößern Bild öffnen')}
                  ariaLabel={tx('BPE-Kategorien in voller Größe öffnen')}
                />
                <p className={styles.categoryIntro}>{tx('BI-RADS unterscheidet vier Kategorien:')}</p>
                <div className={styles.categoryList}>
                  {BPE_CATEGORIES.map((category) => (
                    <div key={category.key} className={styles.categoryItem}>
                      <span>{category.key}</span><div><h4>{category.title}</h4><p>{tx(category.text)}</p></div>
                    </div>
                  ))}
                </div>
                <div className={`${styles.modalityNote} ${styles.bpeNote}`}>
                  <strong>{tx('Visuelle Beurteilung')}</strong>
                  <p>{tx('Diese Einteilung erfolgt visuell. BI-RADS empfiehlt keine starre prozentuale Einteilung.')}</p>
                </div>
              </article>
            </div>
            <div className={styles.contrastBlock}>
              <span className={styles.contrastEyebrow}>{tx('Das wichtigste Prinzip')}</span>
              <h3>{tx('FGT und BPE nicht verwechseln')}</h3>
              <div className={styles.memoryLine}>
                <div><strong>{tx('FGT beantwortet:')}</strong><span>{tx('Wie viel Drüsengewebe ist vorhanden?')}</span></div>
                <i>≠</i>
                <div><strong>{tx('BPE beantwortet:')}</strong><span>{tx('Wie stark nimmt dieses normale Drüsengewebe Kontrastmittel auf?')}</span></div>
              </div>
              <p className={styles.exampleLead}>{tx('Daher können beispielsweise beide Konstellationen auftreten:')}</p>
              <div className={styles.examplePair}><strong>{tx('viel FGT + minimales BPE')}</strong><span>{tx('oder')}</span><strong>{tx('wenig FGT + relativ deutliches BPE')}</strong></div>
              <p className={styles.centerNote}>{tx('Die beiden Parameter sind miteinander verbunden, aber nicht identisch.')}</p>
            </div>
            <aside className={styles.bpeImportance}>
              <div><span>{tx('Interpretation')}</span><h3>{tx('Warum ist BPE wichtig?')}</h3></div>
              <div>
                <p>{tx('Starkes BPE kann kleine Läsionen schwieriger erkennbar machen und die Interpretation erschweren.')}</p>
                <p>{tx('BPE kann asymmetrisch oder fokal ausgeprägt sein und dadurch eine Läsion imitieren. Sein Ausmaß wird unter anderem durch hormonelle Faktoren beeinflusst.')}</p>
                <strong>{tx('Ein scheinbares Enhancement deshalb immer im Kontext des gesamten Parenchyms beurteilen.')}</strong>
              </div>
            </aside>
          </Section>

          <Section id="prinzip" title={tx('Take-Home Message')}>
            <div className={styles.takeHomeAlgorithm}>
              <div className={styles.takeHomeQuestion}>
                <span>{tx('Auch bei auffälligem Enhancement')}</span>
                <h3>{tx('„Ist das Krebs?“')}</h3>
                <p>{tx('Diese Frage lässt sich nicht sofort beantworten.')}</p>
              </div>
              <ol className={styles.diagnosticPath}>
                <li><span>01</span><div><small>{tx('Zuerst klären')}</small><strong>{tx('BPE oder echter Befund?')}</strong></div></li>
                <li><span>02</span><div><small>{tx('Dann einordnen')}</small><strong>Mass · Non-Mass Enhancement</strong></div></li>
                <li><span>03</span><div><small>{tx('Erst danach beurteilen')}</small><strong>{tx('Morphologie · T2 · DWI · Kinetik · Begleitbefunde')}</strong></div></li>
              </ol>
            </div>
          </Section>

          <div className={base.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
