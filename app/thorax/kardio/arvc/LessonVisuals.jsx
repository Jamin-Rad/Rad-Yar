'use client'

import Image from 'next/image'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import { useId } from 'react'
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

export function MrtOverview() {
  const { lang } = useLanguage()
  return localizeArvcTree(<>
    <h3 className={styles.subheading}>Welche Sequenzen schauen wir an?</h3>
    <dl className={styles.mriSequenceSummary}>
      <div>
        <dt>Cine</dt>
        <dd>Im Vierkammerblick und in einer zweiten Ebene die freie RV-Wand verfolgen. In der Systole kann ein Abschnitt unbeweglich bleiben (Akinesie) oder sich nach außen wölben (Dyskinesie). Aus dem vollständigen Cine-Stapel bestimmen wir RV-Volumen und RVEF.</dd>
      </div>
      <div>
        <dt>LGE</dt>
        <dd>In den Spätaufnahmen nach Gadolinium die Wände beider Kammern prüfen. Narben können hell erscheinen. Im LV liegt das LGE bei ACM häufig außen oder in der Wandmitte. Auffälligkeiten in einer zweiten Ebene bestätigen.</dd>
      </div>
    </dl>

    <h3 className={styles.subheading}>Von der Herzwand zum MRT-Befund</h3>
    <p className={styles.bodyText}>Bei ACM kann Herzmuskel durch Bindegewebe und zum Teil durch Fett ersetzt werden. Betroffene Wandabschnitte können sich dadurch in der Systole schlechter oder paradox bewegen. Fett allein ist kein ARVC-Kriterium.</p>
    <div className={styles.mriSchematicGrid}>
      <figure className={styles.acmIllustration}>
        <Image src="/thorax/kardio/arvc/acm-heart.png" width={1145} height={1374} sizes="(max-width: 760px) 90vw, 320px" alt=""/>
        <figcaption><p>Herzschema zur Orientierung. Die freie Wand des rechten Ventrikels liegt im Bild links.</p></figcaption>
      </figure>
      <figure className={styles.acmIllustration}>
        <Image src="/thorax/kardio/arvc/acm-rv-dyskinesia.webp" width={1200} height={600} sizes="(max-width: 760px) 90vw, 480px" alt=""/>
        <figcaption><p>Schema einer RV-Dyskinesie. Rechts zeigt der Pfeil die lokale Auswärtsbewegung in der Systole.</p></figcaption>
      </figure>
      <figure className={styles.acmIllustration}>
        <Image src="/thorax/kardio/arvc/acm-lge-symbol.webp" width={1200} height={902} sizes="(max-width: 760px) 90vw, 320px" alt=""/>
        <figcaption><p>Stilisiertes LGE-Schema ohne Patientenbezug. Der helle Streifen liegt am Außenrand der linken Kammerwand.</p></figcaption>
      </figure>
    </div>
  </>, lang)
}
