'use client'

import Image from 'next/image'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import { useId, useState } from 'react'
import MriTeaching from './MriTeaching'
import { CinePhaseIllustration, ScarDepthIllustration } from './AcmIllustrations'
import { LgePatternFigure } from './PublishedMriFigures'
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
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<aside className={`${styles.note} ${caution ? styles.caution : ''}`}><strong>{title}</strong><div>{children}</div></aside>, _arvcLang)
}

export function TeachingTable({ caption, headers, rows }) {
  const { lang: _arvcLang } = useLanguage()

  return localizeArvcTree(<div className={styles.tableScroll} tabIndex={0} role="region" aria-label={caption}><table className={styles.table}><caption>{caption}</caption><thead><tr>{headers.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, col) => col === 0 ? <th scope="row" key={col}>{cell}</th> : <td key={col}>{cell}</td>)}</tr>)}</tbody></table></div>, _arvcLang)
}

// Tabs share a labelled panel and support keyboard navigation.
export function Tabs({ label, items, selected, onChange, idPrefix }) {
  const { lang: _arvcLang } = useLanguage()

  const uid = useId().replaceAll(':', '')
  const prefix = idPrefix || uid
  const keyDown = (event, index) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % items.length : event.key === 'ArrowLeft' ? (index - 1 + items.length) % items.length : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : null
    if (next === null) return
    event.preventDefault(); onChange(next); event.currentTarget.parentElement.children[next].focus()
  }
  return localizeArvcTree(<div className={styles.tabs} role="tablist" aria-label={label}>{items.map((item, index) => <button type="button" role="tab" key={item.id || item.label} id={`${prefix}-tab-${index}`} aria-controls={`${prefix}-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => onChange(index)} onKeyDown={event => keyDown(event, index)}>{item.label}</button>)}</div>, _arvcLang)
}

const MRI_VIEWS = [
  { id: 'cine', label: 'Bewegung · Cine', scene: 'cine' },
  { id: 'lge', label: 'Narben · LGE', scene: 'lge4ch' },
  { id: 'sax', label: 'LGE · zweite Ebene', scene: 'lgesax' },
]

export function MrtOverview() {
  const { lang: _arvcLang } = useLanguage()

  const [selected, setSelected] = useState(0)
  return localizeArvcTree(<>
    <p className={styles.lead}>
      <strong>Bei klassischer ARVC steht die rechte Herzkammer (RV) im Vordergrund.</strong>
      <span className={styles.mriIntroLine}>Cine-Aufnahmen zeigen Wandbewegung und Pumpfunktion.</span>
      <span className={styles.mriIntroLine}>Späte Kontrastaufnahmen (LGE) zeigen Hinweise auf Narben.</span>
    </p>
    <dl className={styles.readingGuide}>
      <div>
        <dt>Wandbewegungsstörung</dt>
        <dd>In der Systole zeigt ein Abschnitt der freien RV-Wand keine Bewegung (Akinesie) oder wölbt sich nach außen (Dyskinesie).</dd>
      </div>
      <div>
        <dt>RV-Dilatation und EF</dt>
        <dd>Typische Befunde sind ein erhöhtes enddiastolisches RV-Volumen und/oder eine verminderte rechtsventrikuläre Ejektionsfraktion (RVEF). Beide Werte werden aus der vollständigen Cine-Serie bestimmt.</dd>
      </div>
      <div>
        <dt>Narben im LGE</dt>
        <dd>Im LGE können Narben als helle Areale in der Wand beider Ventrikel sichtbar sein. Fehlendes LGE schließt eine ARVC nicht aus.</dd>
      </div>
    </dl>
    <div className={styles.mriSchematicGrid}>
      <figure className={styles.acmIllustration}>
        <Image src="/thorax/kardio/arvc/acm-rv-dyskinesia.webp" width={1200} height={600} sizes="(max-width: 760px) 90vw, 480px" alt=""/>
        <figcaption><p>Schema einer RV-Dyskinesie. Rechts zeigt der Pfeil die lokale Auswärtsbewegung in der Systole.</p></figcaption>
      </figure>
      <CinePhaseIllustration/>
      <ScarDepthIllustration/>
    </div>
    <div className={styles.explorer}>
      <Tabs label="MRT-Beispiele auswählen" items={MRI_VIEWS} selected={selected} onChange={setSelected} idPrefix="mri-overview"/>
      <div id="mri-overview-panel" role="tabpanel" aria-labelledby={`mri-overview-tab-${selected}`}><MriTeaching key={MRI_VIEWS[selected].id} scene={MRI_VIEWS[selected].scene}/></div>
    </div>
    <details className={styles.mrtDetails}>
      <summary>Bewegung und Narben genauer ansehen</summary>
      <h3 className={styles.subheading}>Wandbewegung: die Begriffe auseinanderhalten</h3>
    <TeachingTable caption="Was bedeutet die Bewegung im Cine?" headers={['Begriff', 'Einfach erklärt']} rows={[
      ['Hypokinesie', 'Ein Wandabschnitt zieht sich schwächer zusammen. Allein reicht das nicht als regionale RV-Störung für den MRT-Baustein der TFC 2010.'],
      ['Akinesie', 'Ein Wandabschnitt kontrahiert nicht. Im vollständigen Cine und in einer weiteren Ebene überprüfen.'],
      ['Dyskinesie', 'Ein Wandabschnitt wölbt sich in der Systole nach außen, während sich die übrige Kammer zusammenzieht.'],
    ]}/>
    <h3 className={styles.subheading}>LGE: die Lage in der Wand ist wichtig</h3>
    <p className={styles.bodyText}><strong>LGE</strong> bedeutet Late Gadolinium Enhancement: eine Aufnahme nach Kontrastmittel, die bei der Beurteilung von Narben hilft. Im LV können bei ACM streifenförmige Veränderungen außen in der Wand (subepikardial) oder in der Wandmitte (intramural) auftreten. Eine relativ erhaltene LVEF schließt diese Beteiligung nicht aus.</p>
    <LgePatternFigure/>
    <TeachingTable caption="Das Narbenmuster einordnen" headers={['Muster', 'Was bedeutet das?']} rows={[
      ['Subepikardial / intramural', 'Nichtischämisches Muster. Kann zu ACM passen, kommt aber auch bei anderen Erkrankungen wie Myokarditis vor.'],
      ['Subendokardial bis transmural', 'Bei passender Verteilung in einem Koronarterritorium eine ischämische Ursache prüfen.'],
      ['Nur an septalen RV-Insertionspunkten', 'Dieses isolierte Muster zählt nach Padua nicht als LV-LGE-Kriterium.'],
    ]}/>
    <Note title="Was die Originalbilder zeigen">Die beiden PSIR-Ansichten gehören zum selben Patienten. Die Orientierungspunkte zeigen die Kammerhöhlen, nicht die Ausdehnung einer Narbe. Das vollständige Muster in den Originalserien beurteilen.</Note>
    </details>
  </>, _arvcLang)
}
