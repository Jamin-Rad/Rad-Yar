'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import InProgressBanner from '@/components/InProgressBanner'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'
import { BPE_CATEGORIES, FGT_CATEGORIES, INDICATIONS, SECTIONS, SEQUENCES, WORKFLOW, translate } from './content'

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
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

function Section({ id, title, eyebrow, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return (
    <section id={id} className={`${base.section} ${styles.section}`}>
      <button className={`${base.sectionHeader} ${styles.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <span className={styles.sectionHeading}><small>{eyebrow}</small><h2>{title}</h2></span>
        <span className={styles.sectionToggle}>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={`${base.sectionBody} ${styles.sectionBody}`}>{children}</div>}
    </section>
  )
}

function Callout({ cave = false, label, children }) {
  return <div className={`${base.callout} ${styles.callout} ${cave ? styles.cave : ''}`}><strong>{label}</strong><p>{children}</p></div>
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
      <InProgressBanner lang={lang} />
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
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>DCE-MRT</strong><span>{tx('Höchste Sensitivität')}</span><small>{tx('Tumorvaskularisation und Kontrastmittelaufnahme sichtbar machen.')}</small></div>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>T2 · T1 · DWI</strong><span>{tx('Multiparametrisch')}</span><small>{tx('Jede Sequenz beantwortet eine andere diagnostische Frage.')}</small></div>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>Focus · Mass · NME</strong><span>{tx('Erst klassifizieren')}</span><small>{tx('Dann Morphologie, Diffusion und Kinetik bewerten.')}</small></div>
          </div>
        </div>
      </header>

      <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

      <div className={base.layout}>
        <aside className={`${base.sidebar} ${styles.sidebar}`}>
          <div className={base.sideTitle}>{tx('Inhaltsverzeichnis')}</div>
          {SECTIONS.map(section => (
            <button key={section.id} type="button" className={`${base.sideItem} ${styles.sideItem} ${activeId === section.id ? `${base.sideItemActive} ${styles.sideItemActive}` : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <span className={styles.sideNumber}>{section.icon}</span><strong>{tx(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={base.main}>
          <Section id="indikationen" eyebrow={tx('01 · Wann einsetzen?')} title={tx('Indikationen')}>
            <p className={styles.lead}>{tx('Die Mamma-MRT ist die')} <strong>{tx('sensitivste bildgebende Methode')}</strong> {tx('zum Nachweis eines Mammakarzinoms. Ihre hohe Sensitivität beruht vor allem auf der Darstellung der')} <strong>{tx('Tumorvaskularisation und Kontrastmittelaufnahme')}</strong>. {tx('Gleichzeitig ist die Spezifität begrenzt: Auch zahlreiche benigne Veränderungen können Kontrastmittel aufnehmen.')}</p>
            <div className={styles.indicationGrid}>{INDICATIONS.map(item => <article className={styles.indicationCard} key={item.title}><span>{tx(item.tag)}</span><h3>{tx(item.title)}</h3><p>{tx(item.text)}</p></article>)}</div>
            <div className={styles.problemBox}><div><span>{tx('Problem Solving · Beispiele')}</span><h3>{tx('Wenn die konventionelle Diagnostik unklar bleibt')}</h3></div><ul><li>{tx('nicht sicher erklärbare Asymmetrie')}</li><li>{tx('unklare Architekturstörung')}</li><li>{tx('diskrepante Befunde zwischen Mammographie und Sonographie')}</li><li>{tx('schwer beurteilbare postoperative Veränderungen')}</li></ul></div>
            <Callout cave label={tx('Wichtig')}>{tx('Die MRT sollte nicht dazu verwendet werden, eine indizierte Biopsie eines suspekten Befundes zu vermeiden. Ein klar suspekter und bioptisch zugänglicher Befund sollte in der Regel histologisch abgeklärt werden.')}</Callout>
          </Section>

          <Section id="sequenzen" eyebrow={tx('02 · Protokoll')} title={tx('Welche Sequenzen brauchen wir?')}>
            <p className={styles.lead}>{tx('Ein typisches Mamma-MRT-Protokoll besteht aus mehreren Sequenzen. Jede beantwortet eine andere Frage.')}</p>
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

          <Section id="systematik" eyebrow={tx('03 · Workflow')} title={tx('Wie liest man eine Mamma-MRT systematisch?')}>
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
                </div>
              </li>
            ))}</ol>
          </Section>

          <Section id="fgt-bpe" eyebrow={tx('04 · Nicht verwechseln')} title={tx('FGT und BPE')}>
            <div className={styles.compareGrid}>
              <article className={styles.fgtCard}>
                <div className={styles.compareHeading}><span className={styles.term}>FGT</span><div><small>{tx('Fibroglanduläres Gewebe')}</small><h3>Fibroglandular Tissue</h3></div></div>
                <p className={styles.definition}>{tx('FGT beschreibt die')} <strong>{tx('Menge des fibroglandulären Brustgewebes')}</strong> {tx('– unabhängig davon, wie stark dieses nach Kontrastmittelgabe anreichert.')}</p>
                <figure className={styles.teachingMedia}>
                  <a href="/mamma/mrt/fgt-categories-abcd.png" target="_blank" rel="noreferrer" aria-label={tx('FGT-Kategorien in voller Größe öffnen')}>
                    <Image src="/mamma/mrt/fgt-categories-abcd.png" alt={tx('Vier MRT-Beispiele der FGT-Kategorien von fast vollständig fettig bis extrem fibroglandulär')} width={2170} height={725} sizes="(max-width: 900px) calc(100vw - 64px), 820px" loading="eager" />
                  </a>
                  <figcaption><strong>{tx('FGT a–d im MRT')}</strong><span>{tx('Zum Vergrößern Bild öffnen')}</span></figcaption>
                </figure>
                <p className={styles.categoryIntro}>{tx('Nach BI-RADS wird das FGT qualitativ in vier Kategorien eingeteilt:')}</p>
                <div className={styles.categoryList}>
                  {FGT_CATEGORIES.map((category) => (
                    <div key={category.key} className={styles.categoryItem}>
                      <span>{category.key}</span><div><h4>{category.title}</h4><p>{tx(category.text)}</p></div>
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
                <figure className={styles.teachingMedia}>
                  <a href="/mamma/mrt/bpe-categories.png" target="_blank" rel="noreferrer" aria-label={tx('BPE-Kategorien in voller Größe öffnen')}>
                    <Image src="/mamma/mrt/bpe-categories.png" alt={tx('Vier MRT-Beispiele der BPE-Kategorien minimal, mild, moderate und marked')} width={1811} height={868} sizes="(max-width: 900px) calc(100vw - 64px), 820px" loading="eager" />
                  </a>
                  <figcaption><strong>{tx('BPE minimal–marked im MRT')}</strong><span>{tx('Zum Vergrößern Bild öffnen')}</span></figcaption>
                </figure>
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

          <Section id="enhancement" eyebrow={tx('05 · BI-RADS-Logik')} title={tx('Die drei wichtigsten Enhancement-Typen')}>
            <div className={styles.enhancementGrid}>
              <article>
                <div className={`${styles.enhancementSketch} ${styles.focusSketch}`}><i /></div><span>01</span><h3>Focus, Foci</h3>
                <ul className={styles.enhancementFacts}><li><strong>&lt; 5 mm</strong></li><li>{tx('Zu klein für eine zuverlässige morphologische Charakterisierung.')}</li></ul>
              </article>
              <article>
                <div className={`${styles.enhancementSketch} ${styles.massSketch}`}><i /></div><span>02</span><h3>Mass</h3>
                <ul className={styles.enhancementFacts}><li>{tx('Eine echte dreidimensionale Läsion.')}</li><li>{tx('Form, Rand und internes Enhancement können beurteilt werden.')}</li></ul>
              </article>
              <article>
                <div className={`${styles.enhancementSketch} ${styles.nmeSketch}`}><i /><i /><i /><i /><i /></div><span>03</span><h3>Non-Mass Enhancement</h3>
                <p>{tx('Ein')} <strong>Non-Mass Enhancement</strong> {tx('ist ein kontrastmittelaufnehmender Bereich, der:')}</p>
                <ul className={styles.enhancementFacts}><li>{tx('vom normalen BPE abgrenzbar ist,')}</li><li>{tx('aber keine dreidimensionale Mass bildet')}</li><li>{tx('und nicht lediglich einen kleinen Focus darstellt.')}</li></ul>
              </article>
            </div>
          </Section>

          <Section id="prinzip" eyebrow={tx('06 · Take home')} title={tx('Take-Home Message')}>
            <div className={styles.takeHomePanel}>
              <div className={styles.dontAsk}><span>{tx('Nicht sofort fragen')}</span><p>{tx('„Ist das Krebs?“')}</p></div>
              <div className={styles.decisionFlow} dir="ltr"><div><small>{tx('Schritt 1')}</small><strong>{tx('BPE oder echter Befund?')}</strong></div><i className={styles.flowArrow} aria-hidden="true" /><div><small>{tx('Schritt 2')}</small><strong>{tx('Focus, Mass oder NME?')}</strong></div><i className={styles.flowArrow} aria-hidden="true" /><div><small>{tx('Schritt 3')}</small><strong>{tx('Morphologie · T2 · DWI · Kinetik · Begleitbefunde')}</strong></div></div>
            </div>
          </Section>

          <div className={base.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
