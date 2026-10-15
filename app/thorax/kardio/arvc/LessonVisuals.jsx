'use client'

import { useId, useState } from 'react'
import { PHENOTYPES, PROTOCOL } from './lessonContent'
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
    <div className={styles.protocolImage}>{selected < 3 ? <MriTeaching key={current.id} scene={['morphology', 'measure', 'lge4ch'][selected]}/> : <Note title="Mapping ergänzt die Gewebebeurteilung">T1 und T2 quantitativ auswerten und mit sequenz- sowie gerätespezifischen Referenzwerten vergleichen. Ein LGE-Bild ist keine T1- oder T2-Map.</Note>}</div>
    <TeachingTable caption="MRT-Protokoll auf einen Blick" headers={['Baustein', 'Was liefert er?', 'Was liefert er allein nicht?']} rows={PROTOCOL.map(step => [step.label, step.look, step.pitfall])}/>
  </>
}

const LGE_VIEWS = [
  { id: '4ch', label: 'LGE · 4-Kammer', scene: 'lge4ch' },
  { id: 'sax', label: 'Derselbe Fall · kurze Achse', scene: 'lgesax' },
  { id: 'negative', label: 'Anderer Fall · ohne LGE', scene: 'negative' },
]

export function PatternExplorer() {
  const [lge, setLge] = useState(0)
  return <>
    <div className={styles.patternModule}>
      <header><span>01 · Bewegung im echten MRT</span><h3>Was macht die Wand in der Systole?</h3><p>Original-Cine starten und den RV über den gesamten Herzzyklus verfolgen.</p></header>
      <MriTeaching scene="cine"/>
      <TeachingTable caption="Bewegungsbegriffe direkt zum Cine" headers={['Begriff', 'Was bedeutet er?', 'Für die TFC 2010']} rows={[
        ['Hypokinesie', 'Die Einwärtsbewegung ist vermindert.', 'Allein keine ausreichende regionale RV-Störung.'],
        ['Akinesie', 'Ein Wandabschnitt kontrahiert nicht.', 'Zusammen mit globaler RV-Veränderung ein möglicher MRT-Baustein.'],
        ['Dyskinesie', 'Paradoxe Auswärtsbewegung während der Systole.', 'Im Cine und in einer weiteren Ebene bestätigen; dann mit Volumen / EF verbinden.'],
      ]}/>
    </div>
    <div className={styles.patternModule}>
      <header><span>02 · Gewebe im echten MRT</span><h3>Die Narbe suchen – nicht nur eine helle Stelle</h3><p>Zwei Ebenen desselben LGE-Falls vergleichen. Das dritte Bild stammt aus einer anderen Untersuchung ohne auffälliges LGE.</p></header>
      <Tabs label="Echte LGE-Aufnahmen vergleichen" items={LGE_VIEWS} selected={lge} onChange={setLge} idPrefix="lge"/>
      <div id="lge-panel" role="tabpanel" aria-labelledby={`lge-tab-${lge}`}><MriTeaching key={LGE_VIEWS[lge].id} scene={LGE_VIEWS[lge].scene}/></div>
      <TeachingTable caption="LGE-Muster einordnen" headers={['Lage', 'Was heißt das?', 'Woran denken?']} rows={[
        ['Subepikardial', 'Außen in der LV-Wand', 'Kann zu ACM passen, auch bei Myokarditis.'],
        ['Intramural', 'In der Mitte der LV-Wand', 'Nichtischämisches Muster; andere Narbenursachen abklären.'],
        ['Subendokardial / transmural', 'Von der Innenseite ausgehend', 'Bei Verteilung in einem Koronarterritorium eine ischämische Ursache prüfen.'],
        ['Septale RV-Insertionspunkte', 'An den RV-Ansatzstellen', 'Isoliert vom LV-LGE-Kriterium nach Padua ausgenommen.'],
      ]}/>
      <Note title="Bild und Begriff zusammenbringen">Die Tabelle erklärt verschiedene Muster. Die gezeigten Radiopaedia-Aufnahmen sind Beispiele für die beschriebenen Fälle, keine Bildsammlung sämtlicher LGE-Muster.</Note>
    </div>
  </>
}
