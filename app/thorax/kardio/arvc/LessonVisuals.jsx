'use client'

import { useId, useState } from 'react'
import { PHENOTYPES, PROTOCOL } from './lessonContent'
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

// Each tab has its own mounted, labelled panel and keyboard navigation.
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

export function ChamberDiagram({ phenotype = 'rv' }) {
  const rv = phenotype !== 'lv', lv = phenotype !== 'rv'
  return <svg viewBox="0 0 360 310" className={styles.chambers} role="img" aria-label={`Schematischer Vierkammerblick: ${phenotype === 'rv' ? 'rechte Kammer' : phenotype === 'lv' ? 'linke Kammer' : 'beide Kammern'} hervorgehoben`}>
    <path d="M57 135C30 91 66 38 116 53c30 8 44 38 43 67M195 119c-7-48 20-78 64-71 40 6 59 47 36 84" fill="#c7dfe7" stroke="#517789" strokeWidth="2"/>
    <path d="M60 132c-12 62 21 116 111 147 5-44 2-100-9-149Z" fill="#edf4f7" stroke={rv ? '#167f9e' : '#9bb5c0'} strokeWidth={rv ? '11' : '6'}/>
    <path d="M192 132c50-15 97 2 101 52 3 39-25 84-109 99 13-61 14-109 8-151Z" fill="#edf4f7" stroke={lv ? '#167f9e' : '#9bb5c0'} strokeWidth="20"/>
    <path d="M171 128q15 72 6 150" fill="none" stroke={lv ? '#167f9e' : '#9bb5c0'} strokeWidth="16"/>
    <path d="m72 135 39 20 45-20M195 136l45 19 42-18" fill="none" stroke="#648594" strokeWidth="3"/>
    <text x="93" y="207" textAnchor="middle">RV</text><text x="241" y="207" textAnchor="middle">LV</text>
    <text x="106" y="95" textAnchor="middle" className={styles.diagramSmall}>rechter Vorhof</text><text x="247" y="92" textAnchor="middle" className={styles.diagramSmall}>linker Vorhof</text>
    <circle cx="76" cy="295" r="5" fill="#167f9e"/><text x="89" y="300" className={styles.diagramSmall}>hervorgehobene Beteiligung</text>
  </svg>
}

export function PhenotypeExplorer() {
  const [selected, setSelected] = useState(0)
  const current = PHENOTYPES[selected]
  return <>
    <div className={styles.explorer}>
      <Tabs label="ACM-Phänotyp auswählen" items={PHENOTYPES} selected={selected} onChange={setSelected} idPrefix="phenotype"/>
      <div id="phenotype-panel" role="tabpanel" aria-labelledby={`phenotype-tab-${selected}`} className={styles.phenotypePanel}>
        <figure><ChamberDiagram phenotype={current.id}/><figcaption>Schematische Verteilung, kein MRT. RV = rechte, LV = linke Herzkammer.</figcaption></figure>
        <div><span className={styles.term}>{current.name}</span><h3>{current.title}</h3><p>{current.text}</p><dl className={styles.details}><div><dt>Im MRT gezielt prüfen</dt><dd>{current.focus}</dd></div><div><dt>Typischer Denkfehler</dt><dd>{current.trap}</dd></div></dl></div>
      </div>
    </div>
    <TeachingTable caption="Drei Phänotypen – drei Schwerpunkte" headers={['Frage', 'RV-dominant', 'Biventrikulär', 'LV-dominant']} rows={[
      ['Verteilung', 'RV im Vordergrund', 'RV und LV betroffen', 'LV im Vordergrund; RV kann unauffällig sein'],
      ['MRT-Schwerpunkt', 'Regionale Bewegung + RV-Volumen / EF', 'Funktion und LGE beider Kammern', 'Nichtischämisches LV-LGE + Funktion'],
      ['Für die Einordnung', 'Klassische ARVC-Kriterien prüfen', 'LV-Beteiligung ausdrücklich erfassen', 'Genetik und Narbenursachen abklären'],
    ]}/>
  </>
}

export function ProtocolExplorer() {
  const [selected, setSelected] = useState(0)
  const current = PROTOCOL[selected]
  return <>
    <ol className={styles.workflow}>{PROTOCOL.map((step, index) => <li key={step.id}><button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step.label}</strong><small>{step.question}</small></button>{index < 3 ? <Icon name="arrow"/> : null}</li>)}</ol>
    <div className={styles.protocolDetail} aria-live="polite"><Icon name="layers"/><div><h3>{current.question}</h3><dl className={styles.details}><div><dt>Sequenz & Ebenen</dt><dd>{current.sequence}. {current.planes}.</dd></div><div><dt>Darauf achten</dt><dd>{current.look}</dd></div><div><dt>Fallstrick</dt><dd>{current.pitfall}</dd></div></dl></div></div>
    <TeachingTable caption="MRT-Protokoll auf einen Blick" headers={['Baustein', 'Was liefert er?', 'Was liefert er allein nicht?']} rows={PROTOCOL.map(step => [step.label, step.look, step.pitfall])}/>
  </>
}

const MOTION = [
  { id: 'normal', label: 'Normal', title: 'Die Wand bewegt sich nach innen', text: 'In der Systole wird die Kammer kleiner. Der markierte Wandabschnitt folgt der übrigen Kontraktion.', delta: -32 },
  { id: 'hypo', label: 'Hypokinesie', title: 'Die Einwärtsbewegung ist vermindert', text: 'Ein Abschnitt kontrahiert schwächer. Isolierte Hypokinesie genügt nicht für das regionale RV-MRT-Kriterium der TFC 2010.', delta: -12 },
  { id: 'akinetic', label: 'Akinesie', title: 'Der Abschnitt bewegt sich nicht', text: 'Der markierte Abschnitt bleibt in der Systole stehen. Mit globaler RV-Vergrößerung oder Dysfunktion kann dies den TFC-MRT-Baustein erfüllen.', delta: 0 },
  { id: 'dyskinetic', label: 'Dyskinesie', title: 'Die Wand bewegt sich nach außen', text: 'Während die übrige Kammer kontrahiert, wölbt sich der markierte Abschnitt nach außen. Im echten Cine und in einer zweiten Ebene bestätigen.', delta: 36 },
]
const LGE = [
  { id: 'epi', label: 'Subepikardial', title: 'Außen in der LV-Wand', text: 'Ein streifenförmiges subepikardiales Muster kann zu ACM passen, kommt aber auch bei Myokarditis vor. Klinik, Genetik und Verteilung ergänzen.' },
  { id: 'mid', label: 'Intramural', title: 'In der Mitte der LV-Wand', text: 'Auch intramurales, nichtischämisches LGE kann relevant sein. Nach Padua in mindestens einem Segment und zwei orthogonalen Ebenen bestätigen.' },
  { id: 'ischemic', label: 'Subendokardial', title: 'Von der Innenseite ausgehend', text: 'Ein subendokardiales bis transmurales Muster in einem Koronarterritorium lenkt den Blick auf eine ischämische Schädigung.' },
  { id: 'insertion', label: 'Insertionspunkte', title: 'Nicht mit LV-Streifen-LGE verwechseln', text: 'Isoliertes LGE an den septalen RV-Insertionspunkten ist nach Padua vom LV-LGE-Kriterium ausgenommen.' },
]

export function PatternExplorer() {
  const [motion, setMotion] = useState(0)
  const [phase, setPhase] = useState(100)
  const [lge, setLge] = useState(0)
  const current = MOTION[motion]
  const p = phase / 100, controlX = 90 - current.delta * p
  return <>
    <div className={styles.patternModule}>
      <header><span>01 · Cine verstehen</span><h3>Was macht die Wand in der Systole?</h3><p>Muster wählen und den Herzzyklus mit dem Regler vergleichen.</p></header>
      <Tabs label="Wandbewegung auswählen" items={MOTION} selected={motion} onChange={setMotion} idPrefix="motion"/>
      <div className={styles.patternPanel} id="motion-panel" role="tabpanel" aria-labelledby={`motion-tab-${motion}`}>
        <div><svg viewBox="0 0 360 260" role="img" aria-label={`Schema der ${current.label} bei ${phase} Prozent des schematischen Herzzyklus`}><path d="M170 45C75 45 65 190 170 225c98-31 103-167 0-180Z" fill="none" stroke="#b9cbd5" strokeWidth="3" strokeDasharray="5 5"/><path d={`M170 45Q${200 + (1-p)*60} 130 170 225Q${60 + p*32} 187 83 150`} fill="none" stroke="#7f9dad" strokeWidth="9"/><path d={`M110 66Q${controlX} 96 ${80 + (current.delta * -p)} 145`} fill="none" stroke="#e5ac55" strokeWidth="12" strokeLinecap="round"/><text x="168" y="137" textAnchor="middle" fill="#dcebf2" fontSize="18">RV</text><path d="M250 75h55m-7-6 7 6-7 6" fill="none" stroke="#e5ac55" strokeWidth="2"/><text x="247" y="106" fill="#b8cedb" fontSize="11">markierter Abschnitt</text></svg><label className={styles.rangeLabel} htmlFor="cardiac-phase"><span>Diastole</span><span>Systole</span></label><input id="cardiac-phase" type="range" min="0" max="100" value={phase} onChange={e => setPhase(Number(e.target.value))} aria-label="Herzphase: Diastole bis Systole"/><p className={styles.diagramCaption}>Vereinfachtes Bewegungsschema, keine gemessene Cine-Kurve.</p></div>
        <div><h4>{current.title}</h4><p>{current.text}</p><Note title="Im echten Cine">Nicht nur einen Frame vergleichen. Auf Schnittführung, Arrhythmieartefakte und Bewegung aus der Ebene achten.</Note></div>
      </div>
    </div>
    <div className={styles.patternModule}>
      <header><span>02 · Gewebe verstehen</span><h3>Wo liegt das LGE in der Wand?</h3><p>Ein helles Areal ist erst mit seiner Lage und Verteilung interpretierbar.</p></header>
      <Tabs label="LGE-Muster auswählen" items={LGE} selected={lge} onChange={setLge} idPrefix="lge"/>
      <div className={styles.patternPanel} id="lge-panel" role="tabpanel" aria-labelledby={`lge-tab-${lge}`}>
        <figure><svg viewBox="0 0 360 270" role="img" aria-label={`Schematischer LV-Querschnitt mit ${LGE[lge].label}-LGE`}><circle cx="172" cy="130" r="77" fill="none" stroke="#668493" strokeWidth="36"/><circle cx="172" cy="130" r="55" fill="#152b38" stroke="#bdced7" strokeWidth="1"/>{lge === 3 ? <><circle cx="120" cy="78" r="8" fill="#f6d28b"/><circle cx="120" cy="182" r="8" fill="#f6d28b"/></> : <circle cx="172" cy="130" r={lge === 0 ? '93' : lge === 1 ? '77' : '60'} fill="none" stroke="#f6d28b" strokeWidth={lge === 2 ? '12' : '7'} strokeDasharray="120 650" transform="rotate(-40 172 130)"/>}<text x="172" y="137" textAnchor="middle" fill="#dcebf2" fontSize="19">LV</text><text x="172" y="251" textAnchor="middle" fill="#b8cedb" fontSize="12">Gelb = schematisches LGE</text></svg><figcaption className={styles.diagramCaption}>Kurze Achse, stark vereinfacht. Kein diagnostisches MRT.</figcaption></figure>
        <div><h4>{LGE[lge].title}</h4><p>{LGE[lge].text}</p><Note title="Wichtig">Das Muster allein beweist keine ACM. Nichtischämische Narben haben mehrere mögliche Ursachen.</Note></div>
      </div>
    </div>
  </>
}
