'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { CASES, SECTIONS, SECTION_IDS, SOURCES } from './lessonContent'
import styles from './page.module.css'

function Note({ title, children, copper = false }) {
  return <aside className={`${styles.note} ${copper ? styles.copper : ''}`}><strong>{title}</strong><div>{children}</div></aside>
}

function Source({ indices }) {
  return <p className={styles.sourceLine}>Nach {indices.map((index, i) => <span key={index}>{i ? ' · ' : ''}<a href={SOURCES[index].url} target="_blank" rel="noreferrer">{SOURCES[index].label} ↗</a></span>)}</p>
}

function Chambers({ variant }) {
  return <svg className={styles.chambers} viewBox="0 0 112 124" role="img" aria-label={`Schematische Kammerdarstellung: ${variant === 'rv' ? 'rechte' : variant === 'lv' ? 'linke' : 'beide'} Kammer${variant === 'both' ? 'n' : ''} betont`}>
    <path d="M50 23 49 10q-9-6-12 3l-3 14C8 37 8 68 24 93c9 15 20 22 34 23 19 1 33-15 36-34 4-25-9-43-25-49V18q-4-8-11-2l-1 12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M43 37C19 40 17 59 24 78c6 16 16 25 28 29L49 61Z" fill={variant === 'rv' || variant === 'both' ? '#89b3b0' : '#f4f7f6'} stroke="currentColor"/>
    <path d="M59 43c24 9 32 27 25 44-5 13-15 21-25 21L55 65Z" fill={variant === 'lv' || variant === 'both' ? '#89b3b0' : '#f4f7f6'} stroke="currentColor"/>
    <text x="29" y="69" fontSize="10" fill="#173e43">RV</text><text x="63" y="80" fontSize="10" fill="#173e43">LV</text>
  </svg>
}

function Definition() {
  return <>
    <p className={styles.lead}>Bei der <strong>arrhythmogenen Kardiomyopathie (ACM)</strong> geht Herzmuskelgewebe verloren und wird durch Narbengewebe, teilweise auch durch Fett, ersetzt. Diese Veränderungen können die elektrische Erregung stören: Es entstehen gefährliche Rhythmusstörungen aus den Herzkammern.</p>
    <p>Die Erkrankung ist häufig erblich. Eine ausgeprägte Pumpschwäche muss noch nicht vorliegen, damit Rhythmusstörungen auftreten können.</p>
    <div className={styles.definitionBand}><span>Früher: vor allem die rechte Kammer</span><b aria-hidden="true">→</b><span>Heute: das gesamte Herz betrachten</span></div>
    <p>Die Erkrankung wurde zunächst als <strong>arrhythmogene rechtsventrikuläre Kardiomyopathie (ARVC)</strong> beschrieben. Heute wissen wir: Auch der linke Ventrikel kann beteiligt sein – bei manchen Formen sogar überwiegend. Diese LV-Beteiligung ist für die Diagnose und die Einschätzung des weiteren Verlaufs wichtig.</p>
    <div className={styles.phenotypes}>
      {[
        ['rv', 'Rechtsbetont', 'Klassische ARVC', 'Die rechte Kammer steht im Vordergrund. Größe, Pumpfunktion und regionale Bewegung des RV beurteilen.'],
        ['both', 'Beide Kammern', 'Biventrikuläre ACM', 'RV und LV sind beteiligt. Die Gewebeveränderungen beider Kammern gehören zur Einordnung.'],
        ['lv', 'Linksbetont', 'Linksdominante ACM / ALVC', 'Die linke Kammer steht im Vordergrund. Ein unauffälliger RV schließt diese Form nicht aus.'],
      ].map(([variant, title, subtitle, text]) => <div className={styles.phenotype} key={variant}><Chambers variant={variant}/><div><h3>{title}</h3><small>{subtitle}</small><p>{text}</p></div></div>)}
    </div>
    <p className={styles.caption}>Schematische Darstellung der Verteilung, keine diagnostischen MRT-Bilder. RV = rechte, LV = linke Herzkammer.</p>
    <Note title="Ein Begriff, den du dir merken solltest">ACM ist der Oberbegriff. ARVC bezeichnet die rechtsbetonte Form. Im MRT deshalb immer <strong>beide Kammern und das Myokardgewebe</strong> beurteilen.</Note>
    <Source indices={[4, 2, 6]}/>
  </>
}

function Mrt() {
  return <>
    <p className={styles.lead}>Drei Fragen führen durch die Untersuchung: <strong>Wie bewegt sich die Wand? Wie groß und leistungsfähig sind die Kammern? Wo liegt eine Narbe?</strong></p>
    <div className={styles.steps}>
      <article><span>01</span><div><h3>Cine: Bewegung sehen</h3><p>EKG-getriggerte bSSFP-Cines in kurzen Achsen, im Vierkammerblick und in RV-spezifischen Ebenen einschließlich RV-Ausflusstrakt aufnehmen. Einen verdächtigen Wandabschnitt über den gesamten Herzzyklus und in einer zweiten Ebene verfolgen.</p><dl><dt>Akinesie</dt><dd>Ein Abschnitt bewegt sich während der Kontraktion nicht.</dd><dt>Dyskinesie</dt><dd>Ein Abschnitt bewegt sich während der Kontraktion nach außen.</dd><dt>Hypokinesie</dt><dd>Ein Abschnitt bewegt sich weniger. Das allein erfüllt das regionale RV-Kriterium der TFC nicht.</dd></dl></div></article>
      <article><span>02</span><div><h3>Cine-Stapel: Volumen und Funktion messen</h3><p>RV und LV vollständig von der Basis bis zum Apex erfassen. Enddiastolisches Volumen auf die Körperoberfläche beziehen (EDVi, ml/m²) und Ejektionsfraktion (EF, %) bestimmen. Ein großer RV im Einzelbild ersetzt diese Messung nicht.</p></div></article>
      <article><span>03</span><div><h3>LGE: Narbenmuster erkennen</h3><p>Nach Kontrastmittelgabe mit T1-gewichteten Inversion-Recovery- oder PSIR-Sequenzen untersuchen. LGE bedeutet „späte Gadoliniumanreicherung“ und macht veränderten Extrazellulärraum, hier insbesondere Fibrose, sichtbar. Beim LV auf subepikardiale oder intramurale Streifen achten. Ein ringförmiges Muster kann hinweisend sein, beweist die Ursache aber nicht.</p></div></article>
      <article><span>04</span><div><h3>T1-/T2-Mapping: ergänzend einordnen</h3><p>T2 kann bei einer entzündlichen „Hot Phase“ erhöht sein. T1/ECV können Gewebeveränderungen unterstützen. Mapping-Werte sind keine eigenständigen TFC-2010- oder Padua-2020-Kriterien. Fettsequenzen können ergänzen; Fett allein beweist keine ACM.</p></div></article>
    </div>
    <Note copper title="Hier passieren leicht Fehler">Die dünne RV-Wand, Partialvolumen und Bewegung aus der Bildebene erschweren die Beurteilung. Eine scheinbare Ausbuchtung oder unsicheres RV-LGE immer in einer zweiten Ebene prüfen. Sportherz, Shunt, pulmonale Hypertonie, Myokarditis und Sarkoidose können Teilbefunde imitieren.</Note>
    <Source indices={[3, 4, 2]}/>
  </>
}

function ImageCases() {
  const [selected, setSelected] = useState(0)
  const dialog = useRef(null)
  const current = CASES[selected]
  return <>
    <p className={styles.lead}>Zwei originale Radiopaedia-Fälle und ein publiziertes LGE-Beispiel zeigen die unterschiedlichen Fragen an das MRT. Betrachte zuerst das Bild, dann die Erklärung.</p>
    <div className={styles.caseTabs} role="tablist" aria-label="MRT-Beispiele">{CASES.map((item, index) => <button type="button" role="tab" id={`tab-${item.id}`} aria-selected={selected === index} aria-controls={`case-${item.id}`} tabIndex={selected === index ? 0 : -1} key={item.id} onClick={() => setSelected(index)} onKeyDown={event => {
      const next = event.key === 'ArrowRight' ? (index + 1) % CASES.length : event.key === 'ArrowLeft' ? (index + CASES.length - 1) % CASES.length : event.key === 'Home' ? 0 : event.key === 'End' ? CASES.length - 1 : null
      if (next !== null) { event.preventDefault(); setSelected(next); document.getElementById(`tab-${CASES[next].id}`)?.focus() }
    }}>{item.label}</button>)}</div>
    <div id={`case-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} className={styles.casePanel}>
      <div className={styles.imageFrame}><button type="button" className={styles.imageButton} onClick={() => dialog.current?.showModal()} aria-label="MRT-Bild vergrößern"><Image unoptimized loading="eager" src={current.image} alt={current.alt} width={current.width} height={current.height} sizes="(max-width: 760px) 90vw, 740px"/><span>Bild vergrößern ↗</span></button><p>{current.sequence}</p></div>
      <div className={styles.caseExplanation}><h3>{current.title}</h3><p>{current.text}</p><h4>Darauf achten</h4><p>{current.look}</p><Note copper title="Was dieses Bild nicht beantworten kann">{current.limit}</Note></div>
      <p className={styles.imageCredit}>{current.credit}<br/><a href={current.url} target="_blank" rel="noreferrer">{current.id === 'lv-lge' ? 'Originalstudie' : 'Radiopaedia-Fall'} ↗</a><span> · </span><a href={current.publication} target="_blank" rel="noreferrer">Veröffentlichte Abbildung ↗</a></p>
    </div>
    <dialog ref={dialog} aria-label={current.title} className={styles.imageDialog} onClick={event => { if (event.target === dialog.current) dialog.current.close() }}><button type="button" autoFocus className={styles.closeDialog} onClick={() => dialog.current?.close()}>Schließen ×</button><Image unoptimized loading="eager" src={current.image} alt={current.alt} width={current.width} height={current.height} sizes="95vw"/><p>{current.sequence}</p></dialog>
    <Source indices={[5, 6]}/>
  </>
}

function CriteriaIntro() {
  return <div className={styles.criteriaIntro}><h3>Warum gibt es überhaupt Kriterien?</h3><p>Ein einzelner auffälliger MRT-Aspekt ist nicht zuverlässig genug. Die Diagnose setzt Hinweise aus <strong>sechs Bereichen</strong> zusammen. „Major“ bezeichnet einen stärker, „Minor“ einen schwächer gewichteten Hinweis.</p><ol className={styles.domains}><li>Form & Funktion</li><li>Gewebeveränderungen</li><li>Repolarisation im EKG</li><li>Depolarisation im EKG</li><li>Ventrikuläre Arrhythmien</li><li>Familie & Genetik</li></ol></div>
}

function Tfc() {
  return <>
    <p className={styles.lead}><strong>TFC</strong> steht für „Task Force Criteria“. Die revidierten Kriterien von <strong>2010</strong> wurden für die klassische, rechtsbetonte ARVC entwickelt. Sie verbinden Bildgebung mit EKG, Rhythmusdiagnostik, Gewebe und Familienanamnese.</p>
    <CriteriaIntro/>
    <h3 className={styles.subheading}>Der MRT-Baustein hat zwei Teile</h3>
    <div className={styles.formula}><div><b>A</b><strong>Regionale RV-Wandbewegungsstörung</strong><p>Akinesie, Dyskinesie oder dyssynchrone Kontraktion</p></div><span>UND</span><div><b>B</b><strong>RV-Vergrößerung oder reduzierte RV-EF</strong><p>Mindestens einer der folgenden Grenzwerte</p></div></div>
    <div className={styles.tableScroll} tabIndex="0" role="region" aria-label="MRT-Grenzwerte der TFC 2010"><table className={styles.table}><caption>TFC 2010 · MRT-Kriterien bei Erwachsenen; jeweils nur zusammen mit Teil A</caption><thead><tr><th scope="col">Messgröße</th><th scope="col">Major</th><th scope="col">Minor</th></tr></thead><tbody><tr><th scope="row">RVEDVi · Männer</th><td>≥ 110 ml/m²</td><td>≥ 100 bis &lt; 110 ml/m²</td></tr><tr><th scope="row">RVEDVi · Frauen</th><td>≥ 100 ml/m²</td><td>≥ 90 bis &lt; 100 ml/m²</td></tr><tr><th scope="row">RVEF · beide</th><td>≤ 40 %</td><td>&gt; 40 bis ≤ 45 %</td></tr></tbody></table></div>
    <p className={styles.caption}>RVEDVi = rechtsventrikuläres enddiastolisches Volumen / Körperoberfläche. RVEF = rechtsventrikuläre Ejektionsfraktion.</p>
    <Note title="So wendest du das an">Beispiel: Ein Mann hat eine sichere regionale RV-Dyskinesie und einen RVEDVi von 115 ml/m². Das erfüllt <strong>ein Major-Kriterium aus der Bildgebung</strong>. Ohne regionale Störung genügt derselbe Volumenwert nicht. Erhöhtes Volumen und reduzierte EF werden innerhalb dieser Kategorie nicht doppelt gezählt.</Note>
    <h3 className={styles.subheading}>Ein MRT-Kriterium ist noch keine gesicherte ARVC</h3>
    <p>Für eine gesicherte Diagnose nach TFC 2010 braucht es <strong>2 Major</strong> oder <strong>1 Major + 2 Minor</strong> oder <strong>4 Minor</strong> aus unterschiedlichen Kategorien. „Borderline“: 1 Major + 1 Minor oder 3 Minor. „Möglich“: 1 Major oder 2 Minor. Innerhalb einer Kategorie wird nicht mehrfach gezählt.</p>
    <Note copper title="Die Grenze der TFC 2010">LGE und spezifische LV-Kriterien sind darin nicht enthalten. Die TFC können deshalb linksbetonte Formen übersehen. Fett im MRT ist ebenfalls kein eigenständiges TFC-Kriterium.</Note>
    <Source indices={[0, 2]}/>
  </>
}

function Padua() {
  return <>
    <p className={styles.lead}>Die <strong>Padua-Kriterien von 2020</strong> erweitern die Beurteilung auf die rechte und linke Kammer. Die zentrale Neuerung ist die Einbeziehung der <strong>Narbenbildgebung mit LGE</strong>.</p>
    <div className={styles.tableScroll} tabIndex="0" role="region" aria-label="TFC und Padua im Vergleich"><table className={styles.table}><caption>Die Idee hinter dem Wechsel</caption><thead><tr><th scope="col">Frage</th><th scope="col">TFC 2010</th><th scope="col">Padua 2020</th></tr></thead><tbody><tr><th scope="row">Welche Kammer?</th><td>Fokus auf den RV</td><td>RV, LV oder beide</td></tr><tr><th scope="row">Welche MRT-Information?</th><td>Regionale Bewegung + globale Größe / Funktion</td><td>Zusätzlich Gewebeschäden durch LGE</td></tr><tr><th scope="row">Welche Referenzwerte?</th><td>Feste RV-Grenzwerte</td><td>Nomogramme für Alter, Geschlecht und Körpergröße</td></tr><tr><th scope="row">Grundvoraussetzung?</th><td>Kombination mehrerer Diagnosebereiche</td><td>Mindestens ein morphofunktionelles oder strukturelles Kriterium erforderlich</td></tr></tbody></table></div>
    <h3 className={styles.subheading}>Die MRT-Neuerungen, Schritt für Schritt</h3>
    <div className={styles.steps}>
      <article><span>01</span><div><h3>Rechts: Bewegung und globale Funktion trennen</h3><p>Regionale Akinesie, Dyskinesie oder systolische Ausbuchtung zusammen mit globaler RV-Dilatation oder globaler systolischer Dysfunktion: <strong>Major</strong>. Eine isolierte regionale RV-Akinesie, -Dyskinesie oder ein Aneurysma der freien RV-Wand: <strong>Minor</strong>. Die globalen Werte werden gegen geeignete Referenzkurven geprüft.</p></div></article>
      <article><span>02</span><div><h3>Rechts: LGE kommt hinzu</h3><p>Transmurales, streifenförmiges RV-LGE in mindestens einer Region (Einflussbahn, Ausflussbahn oder Apex), in zwei orthogonalen Ebenen bestätigt: <strong>strukturelles Major-Kriterium</strong>. Die dünne Wand macht die sichere Abgrenzung schwierig.</p></div></article>
      <article><span>03</span><div><h3>Links: Die Narbe kann vor der Pumpschwäche auffallen</h3><p>Streifenförmiges subepikardiales oder intramurales LV-LGE in mindestens einem Segment, in zwei orthogonalen Ebenen bestätigt: <strong>strukturelles Major-Kriterium</strong>. Isoliertes LGE an den septalen RV-Insertionspunkten zählt nicht. Globale LV-Dysfunktion mit oder ohne Dilatation sowie regionale LV-Hypo-/Akinesie sind morphofunktionelle Minor-Kriterien.</p></div></article>
      <article><span>04</span><div><h3>Linksdominant: Genetik und Differenzialdiagnosen sind entscheidend</h3><p>Ohne RV-Beteiligung reicht ein LV-LGE-Muster allein nicht zur Diagnose einer ALVC. Nach Padua ist dafür der Nachweis einer krankheitsverursachenden oder wahrscheinlich krankheitsverursachenden ACM-Genvariante erforderlich. Myokarditis, Sarkoidose und andere Narbenursachen aktiv abgrenzen.</p></div></article>
    </div>
    <Note copper title="Kriterien immer als vollständiges System anwenden">Padua behält sechs Kategorien und die Major-/Minor-Logik bei. Zahlen aus den TFC 2010 dürfen nicht in Padua übertragen und Kriterien beider Systeme nicht zu einer eigenen Punkteliste vermischt werden. EKG, Arrhythmien und Familie gehören weiterhin dazu.</Note>
    <p className={styles.caption}>Historische Einordnung: 2010 und 2020 sind zwei definierte Kriterienwerke. Die European Task Force hat danach weitere Kriterien vorgeschlagen (publiziert 2024). Padua 2020 ist deshalb hier bewusst mit Jahreszahl benannt.</p>
    <Source indices={[1, 2, 7]}/>
  </>
}

function TakeHome() {
  return <>
    <ol className={styles.takeHome}>
      <li><span>01</span><p><strong>ACM betrifft mehr als den RV.</strong> ARVC ist die rechtsbetonte Form; biventrikuläre und linksdominante Formen gehören zum Spektrum.</p></li>
      <li><span>02</span><p><strong>Cine + Messwerte + LGE zusammen lesen.</strong> Bewegung, Funktion und Gewebe beantworten unterschiedliche Fragen.</p></li>
      <li><span>03</span><p><strong>TFC 2010 verlangt regional UND global.</strong> Eine große rechte Kammer allein erfüllt das MRT-Kriterium nicht.</p></li>
      <li><span>04</span><p><strong>Padua 2020 ergänzt LV und LGE.</strong> Narbenmuster und Genetik helfen bei der Einordnung linksdominanter Formen.</p></li>
      <li><span>05</span><p><strong>Kein Einzelzeichen beweist die Diagnose.</strong> Klinik, EKG, Rhythmus, Familie, Genetik und Differenzialdiagnosen mitdenken.</p></li>
    </ol>
    <h3 className={styles.subheading}>Quellen zum Nachlesen</h3>
    <ul className={styles.sourceList}>{SOURCES.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><strong>{source.title}</strong><b aria-hidden="true">↗</b></a></li>)}</ul>
    <p className={styles.caption}>Deutschsprachige Fassung · inhaltlich neu aufgebaut am 15. Oktober 2026. Die MRT-Bilder sind echte publizierte Aufnahmen; Details zu Herkunft und Aussagegrenzen stehen direkt am jeweiligen Bild.</p>
  </>
}

const CONTENT = { definition: Definition, mrt: Mrt, bilder: ImageCases, tfc: Tfc, padua: Padua, merksaetze: TakeHome }

export default function ArvcLesson() {
  const [openId, setOpenId] = useState('definition')
  const { isRead, toggleRead, authError } = useLessonReadStatus('arvc')
  const [readSections, setReadSections] = usePersistedSectionProgress('arvc-de-v2', SECTION_IDS, isRead)
  const activeIndex = SECTIONS.findIndex(section => section.id === openId)

  useEffect(() => {
    const update = () => { const id = window.location.hash.slice(1); if (SECTION_IDS.includes(id)) setOpenId(id) }
    update(); window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  const select = (id, collapse = false) => {
    const next = collapse && openId === id ? null : id
    setOpenId(next)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${next ? `#${next}` : ''}`)
    if (next) requestAnimationFrame(() => document.getElementById(next)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const toggleSection = id => {
    if (isRead && !toggleRead()) return
    setReadSections(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next })
  }
  const toggleLesson = () => { if (toggleRead() && isRead) setReadSections(new Set()) }

  return <main className={styles.page} lang="de" dir="ltr">
    <header className={styles.header}>
      <div className={styles.topline}><nav aria-label="Brotkrumennavigation" className={styles.breadcrumb}><Link href="/lernen">Lernen</Link><span>/</span><Link href="/lernen/thorax">Thorax</Link><span>/</span><span>Kardio-MRT</span></nav><span className={styles.author}>von RadYar</span></div>
      <div className={styles.hero}><div><h1>Arrhythmogene<br/>Kardiomyopathie</h1><p>Das ganze Herz im Blick: ARVC, biventrikuläre und linksdominante ACM.</p></div><div className={styles.facts}><div><strong>RV + LV</strong><span>Beide Kammern<br/>prüfen</span></div><div><strong>Cine</strong><span>Bewegung<br/>verstehen</span></div><div><strong>LGE</strong><span>Narben<br/>erkennen</span></div></div></div>
      <div className={styles.progressRow}><div className={styles.progress} role="progressbar" aria-label="Gelesene Abschnitte" aria-valuemin={0} aria-valuemax={6} aria-valuenow={readSections.size}><span style={{ width: `${readSections.size / 6 * 100}%` }}/></div><span aria-live="polite">{readSections.size} von 6 gelesen</span><button type="button" aria-pressed={isRead} onClick={toggleLesson}>{isRead ? '✓ Lektion gelesen' : 'Lektion als gelesen markieren'}</button></div>
      {authError ? <p className={styles.authMessage} role="status">Zum Speichern der gesamten Lektion bitte anmelden. Die einzelnen Abschnitte werden auf diesem Gerät gespeichert.</p> : null}
    </header>
    <div className={styles.layout}>
      <aside className={styles.sidebar}><h2>Lernpfad</h2><nav aria-label="Lernpfad">{SECTIONS.map((section, index) => <button type="button" key={section.id} onClick={() => select(section.id)} aria-current={openId === section.id ? 'location' : undefined}><span>{String(index + 1).padStart(2, '0')}</span><strong>{section.short}</strong><i aria-label={readSections.has(section.id) ? 'gelesen' : undefined}>{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav></aside>
      <article className={styles.lesson}>{SECTIONS.map((section, index) => {
        const Content = CONTENT[section.id]
        return <section id={section.id} key={section.id} className={`${styles.section} ${openId === section.id ? styles.open : ''}`}><h2><button type="button" onClick={() => select(section.id, true)} aria-expanded={openId === section.id} aria-controls={`panel-${section.id}`}><span className={styles.sectionNumber}>{String(index + 1).padStart(2, '0')}</span><span>{section.title}</span><span className={styles.chevron} aria-hidden="true">{openId === section.id ? '−' : '+'}</span></button></h2><div id={`panel-${section.id}`} hidden={openId !== section.id} className={styles.sectionBody}><Content/><div className={styles.sectionActions}><button type="button" className={readSections.has(section.id) ? styles.readDone : ''} aria-pressed={readSections.has(section.id)} onClick={() => toggleSection(section.id)}>{readSections.has(section.id) ? '✓ Als gelesen markiert' : 'Abschnitt als gelesen markieren'}</button>{index < SECTIONS.length - 1 ? <button type="button" onClick={() => select(SECTIONS[index + 1].id)}>Weiter <span aria-hidden="true">→</span></button> : null}</div></div></section>
      })}</article>
    </div>
    <div className={styles.mobilePath}><label htmlFor="arvc-learning-path">Lernpfad</label><select id="arvc-learning-path" value={openId || ''} onChange={event => select(event.target.value)}><option value="" disabled>Abschnitt wählen</option>{SECTIONS.map((section, index) => <option key={section.id} value={section.id}>{String(index + 1).padStart(2, '0')} · {section.short}{readSections.has(section.id) ? ' ✓' : ''}</option>)}</select><span>{Math.max(0, activeIndex + 1)} / 6</span></div>
  </main>
}
