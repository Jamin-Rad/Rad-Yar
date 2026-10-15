'use client'

import { useId, useState } from 'react'
import MriTeaching from './MriTeaching'
import styles from './page.module.css'

export function Icon({ name, className }) {
  const paths = {
    heart: <><path d="M20.5 5.5a5 5 0 0 0-7.1 0L12 7l-1.4-1.5a5 5 0 0 0-7.1 7.1L12 21l8.5-8.4a5 5 0 0 0 0-7.1Z"/><path d="M3 12h5l2-4 3 8 2-4h6"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5"/></>,
    activity: <><path d="M2 12h5l3-8 4 16 3-8h5"/></>,
    case: <><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5"/></>,
    table: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16"/></>,
    branch: <><path d="M12 3v6M5 17v-5h14v5M12 9v8"/><circle cx="5" cy="20" r="2"/><circle cx="12" cy="20" r="2"/><circle cx="19" cy="20" r="2"/></>,
    scan: <><path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/><circle cx="12" cy="12" r="5"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/></>,
    spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
    external: <><path d="M14 3h7v7M21 3 10 14"/><path d="M10 4H4v16h16v-6"/></>,
  }
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.heart}</svg>
}

export function Note({ title = 'Merke', children, caution = false }) {
  return <aside className={`${styles.note} ${caution ? styles.caution : ''}`}><strong>{title}</strong><div>{children}</div></aside>
}

export function TeachingTable({ caption, headers, rows }) {
  return <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={caption}><table className={styles.table}><caption>{caption}</caption><thead><tr>{headers.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, col) => col === 0 ? <th scope="row" key={col}>{cell}</th> : <td key={col}>{cell}</td>)}</tr>)}</tbody></table></div>
}

// Tabs share a labelled panel and support keyboard navigation.
export function Tabs({ label, items, selected, onChange, idPrefix }) {
  const uid = useId().replaceAll(':', '')
  const prefix = idPrefix || uid
  const keyDown = (event, index) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % items.length : event.key === 'ArrowLeft' ? (index - 1 + items.length) % items.length : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : null
    if (next === null) return
    event.preventDefault(); onChange(next); event.currentTarget.parentElement.children[next].focus()
  }
  return <div className={styles.tabs} role="tablist" aria-label={label}>{items.map((item, index) => <button type="button" role="tab" key={item.id || item.label} id={`${prefix}-tab-${index}`} aria-controls={`${prefix}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => onChange(index)} onKeyDown={event => keyDown(event, index)}>{item.label}</button>)}</div>
}

const PROTOCOL_STEPS = [
  { id: 'cine', label: 'Cine', question: 'Wie bewegt sich die Wand?', sequence: 'Bewegte bSSFP-Aufnahmen im Vierkammerblick, in kurzen Achsen und in passenden RV-Ebenen.', look: 'Freie RV-Wand und Herzspitze über den ganzen Herzzyklus verfolgen. Bewegt sich ein Abschnitt nicht oder paradox nach außen?', trap: 'Ein Standbild zeigt keine Bewegung. Arrhythmie und Bewegung aus der Ebene können eine Störung vortäuschen.' },
  { id: 'function', label: 'Volumen & EF', question: 'Wie groß, wie kräftig?', sequence: 'Vollständiger Cine-Stapel von der Herzbasis bis zur Spitze, mit enddiastolischen und endsystolischen Konturen.', look: 'RV und LV messen und vergleichen. EDVi bedeutet enddiastolisches Volumen bezogen auf die Körperoberfläche; EF ist der ausgeworfene Volumenanteil.', trap: 'Die RV-Größe allein reicht nicht. Messung und Referenzwerte müssen zur Person passen; Kinder und Sportler gesondert einordnen.' },
  { id: 'lge', label: 'LGE', question: 'Wo liegt eine Narbe?', sequence: 'Aufnahmen nach Kontrastmittel, zum Beispiel mit Inversion Recovery oder PSIR, in kurzen und langen Achsen.', look: 'Anreicherung in der RV- und LV-Wand suchen. Beim LV sind subepikardiale oder intramurale Muster relevant; Ort und Verteilung beschreiben.', trap: 'Die dünne RV-Wand ist schwierig zu beurteilen. Auffälligkeiten in einer zweiten Ebene bestätigen; nicht jede helle Stelle ist eine Narbe.' },
]

export function ProtocolOverview() {
  const [selected, setSelected] = useState(0)
  const step = PROTOCOL_STEPS[selected]
  return <>
    <ol className={styles.workflow}>{PROTOCOL_STEPS.map((item, index) => <li key={item.id}><button type="button" aria-pressed={selected === index} aria-controls="protocol-reading" onClick={() => setSelected(index)}><span>{index + 1}</span><strong>{item.label}</strong><small>{item.question}</small></button></li>)}</ol>
    <div className={styles.protocolDetail} id="protocol-reading" aria-live="polite"><Icon name="layers"/><div><h3>{step.question}</h3><dl className={styles.details}><div><dt>Welche Aufnahmen?</dt><dd>{step.sequence}</dd></div><div><dt>Worauf achten?</dt><dd>{step.look}</dd></div><div><dt>Häufiger Fehler</dt><dd>{step.trap}</dd></div></dl></div></div>
    <p className={styles.caption}>T1-/T2-Mapping kann bei einer zusätzlichen Gewebefrage ergänzen. Für den ersten Überblick bleiben Cine, Kammerfunktion und LGE die drei Grundbausteine.</p>
  </>
}

const MRI_VIEWS = [
  { id: 'cine', label: 'Bewegung · Cine', scene: 'cine' },
  { id: 'lge', label: 'Narben · LGE', scene: 'lge4ch' },
  { id: 'sax', label: 'LGE · zweite Ebene', scene: 'lgesax' },
]

export function MrtOverview() {
  const [selected, setSelected] = useState(0)
  return <>
    <div className={styles.explorer}>
      <Tabs label="MRT-Beispiele auswählen" items={MRI_VIEWS} selected={selected} onChange={setSelected} idPrefix="mri-overview"/>
      <div id="mri-overview-panel" role="tabpanel" aria-labelledby={`mri-overview-tab-${selected}`}><MriTeaching key={MRI_VIEWS[selected].id} scene={MRI_VIEWS[selected].scene}/></div>
    </div>
    <h3 className={styles.subheading}>Wandbewegung: die Begriffe auseinanderhalten</h3>
    <TeachingTable caption="Was bedeutet die Bewegung im Cine?" headers={['Begriff', 'Einfach erklärt']} rows={[
      ['Hypokinesie', 'Ein Wandabschnitt zieht sich schwächer zusammen. Allein reicht das nicht als regionale RV-Störung für den MRT-Baustein der TFC 2010.'],
      ['Akinesie', 'Ein Wandabschnitt kontrahiert nicht. Im vollständigen Cine und in einer weiteren Ebene überprüfen.'],
      ['Dyskinesie', 'Ein Wandabschnitt wölbt sich in der Systole nach außen, während sich die übrige Kammer zusammenzieht.'],
    ]}/>
    <h3 className={styles.subheading}>LGE: die Lage in der Wand ist wichtig</h3>
    <p className={styles.bodyText}><strong>LGE</strong> bedeutet Late Gadolinium Enhancement: eine Aufnahme nach Kontrastmittel, die bei der Beurteilung von Narben hilft. Im LV können bei ACM streifenförmige Veränderungen außen in der Wand (subepikardial) oder in der Wandmitte (intramural) auftreten. Eine relativ erhaltene LVEF schließt diese Beteiligung nicht aus.</p>
    <TeachingTable caption="Das Narbenmuster einordnen" headers={['Muster', 'Was bedeutet das?']} rows={[
      ['Subepikardial / intramural', 'Nichtischämisches Muster. Kann zu ACM passen, kommt aber auch bei anderen Erkrankungen wie Myokarditis vor.'],
      ['Subendokardial bis transmural', 'Bei passender Verteilung in einem Koronarterritorium eine ischämische Ursache prüfen.'],
      ['Nur an septalen RV-Insertionspunkten', 'Dieses isolierte Muster zählt nach Padua nicht als LV-LGE-Kriterium.'],
    ]}/>
    <Note title="Was die Originalbilder zeigen">Die beiden PSIR-Ansichten gehören zum selben Patienten. Die Orientierungspunkte zeigen die Kammerhöhlen, nicht die Ausdehnung einer Narbe. Das vollständige Muster in den Originalserien beurteilen.</Note>
  </>
}
