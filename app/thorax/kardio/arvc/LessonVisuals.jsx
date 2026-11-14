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

const MRI_STEPS = [
  {
    id: 'motion',
    label: 'Wandbewegung',
    sequence: 'Cine im Vierkammerblick und in einer zweiten Ebene',
    search: 'Die freie RV-Wand über Diastole und Systole verfolgen. Eine auffällige Stelle in einer zweiten Ebene überprüfen.',
    finding: 'Ein Wandabschnitt bewegt sich in der Systole nicht (Akinesie) oder wölbt sich nach außen (Dyskinesie).',
    meaning: 'Für das MRT-Kriterium der TFC 2010 muss zur regionalen Bewegungsstörung ein erhöhtes RVEDVi oder eine reduzierte RVEF hinzukommen.',
    context: 'Bekannte ARVC; Untersuchung nach einer früheren Ablation. Die Bewegung über den ganzen Herzzyklus beurteilen.',
  },
  {
    id: 'function',
    label: 'RV-Volumen und EF',
    sequence: 'Cine-Schnittstapel vom Herzansatz bis zur Spitze',
    search: 'Das RV-Volumen am Ende der Diastole und der Systole bestimmen. Das enddiastolische Volumen auf die Körperoberfläche beziehen (RVEDVi). Die RVEF gibt den ausgeworfenen Anteil des enddiastolischen Volumens an.',
    finding: 'Im gezeigten Cine-Fall beträgt das RVEDVi 115 ml/m², die RVEF 41 %. Diese Werte stammen aus der vollständigen Untersuchung.',
    meaning: 'Beim erwachsenen Mann erreicht das RVEDVi hier den Major-Grenzwert (≥ 110 ml/m²). Die RVEF von 41 % liegt im Minor-Bereich. Mit der dokumentierten Dyskinesie ergibt das insgesamt ein Major-MRT-Kriterium nach TFC 2010.',
  },
  {
    id: 'scar',
    label: 'Narben · LGE',
    sequence: 'Spätaufnahmen nach Gadolinium (LGE) in zwei orthogonalen Ebenen',
    search: 'Die Wand beider Ventrikel prüfen. Beim LV auf die Lage achten: am Außenrand (subepikardial), in der Wandmitte (intramural) oder am Rand zur Kammerhöhle (subendokardial).',
    finding: 'Im gezeigten Fall beschreibt die Originaluntersuchung LGE in beiden Kammern. Im LV können bei ACM subepikardiale oder intramurale Streifen auffallen.',
    meaning: 'Die Padua-Kriterien berücksichtigen definierte LGE-Muster. In den TFC 2010 ist LGE kein MRT-Kriterium. Fehlendes LGE schließt ARVC nicht aus.',
  },
]

export function MrtOverview() {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState(0)
  const [shortAxis, setShortAxis] = useState(false)
  const step = MRI_STEPS[selected]

  return localizeArvcTree(<>
    <p className={styles.lead}>Im Cine beurteilst du Bewegung, Größe und Funktion der rechten Kammer. Im LGE suchst du nach Narben in beiden Kammern.</p>
    <div className={styles.mriWorkspace}>
      <Tabs label="MRT-Befund auswählen" items={MRI_STEPS} selected={selected} onChange={setSelected} idPrefix="mri-overview"/>
      <div className={styles.mriWorkspacePanel} id="mri-overview-panel" role="tabpanel" aria-labelledby={`mri-overview-tab-${selected}`} tabIndex={0}>
        <p className={styles.mriSequenceLine}>{step.sequence}</p>
        {step.id === 'scar' && <div className={styles.mriPlaneToggle} role="group" aria-label="LGE-Ebene">
          <button type="button" aria-pressed={!shortAxis} onClick={() => setShortAxis(false)}>Vierkammerblick</button>
          <button type="button" aria-pressed={shortAxis} onClick={() => setShortAxis(true)}>Kurze Achse</button>
        </div>}
        <div className={styles.mriWorkspaceGrid}>
          <div className={styles.mriWorkspaceMedia}>
            {step.id === 'motion' && <MriTeaching scene="cine" compact/>}
            {step.id === 'function' && <CinePhaseIllustration/>}
            {step.id === 'scar' && <MriTeaching key={String(shortAxis)} scene={shortAxis ? 'lgesax' : 'lge4ch'} compact/>}
          </div>
          <dl className={styles.mriReadout}>
            <div><dt>Worauf achten?</dt><dd>{step.search}</dd></div>
            <div><dt>Was ist auffällig?</dt><dd>{step.finding}</dd></div>
            <div><dt>Was bedeutet das?</dt><dd>{step.meaning}</dd></div>
          </dl>
        </div>
        {step.context && <p className={styles.caption}>{step.context}</p>}
        {step.id !== 'function' && <details className={styles.mrtDetails} key={step.id}>
          <summary>{step.id === 'motion' ? 'Dyskinesie im Schema ansehen' : 'LGE-Muster vergleichen'}</summary>
          {step.id === 'motion' ? <figure className={styles.acmIllustration}>
            <Image src="/thorax/kardio/arvc/acm-rv-dyskinesia.webp" width={1200} height={600} sizes="(max-width: 760px) 90vw, 720px" alt=""/>
            <figcaption><p>Schema einer RV-Dyskinesie. Rechts zeigt der Pfeil die lokale Auswärtsbewegung in der Systole.</p></figcaption>
          </figure> : <><ScarDepthIllustration/><LgePatternFigure/></>}
        </details>}
      </div>
    </div>
  </>, lang)
}
