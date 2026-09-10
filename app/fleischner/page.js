'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const SOURCE_URL = 'https://pubs.rsna.org/doi/10.1148/radiol.2017161659'

const COPY = {
  de: {
    brand: 'FLEISCHNER', steps: ['Anwendbarkeit', 'Rundherd', 'Messung', 'Empfehlung'],
    intro: 'Management inzidenteller Lungenrundherde nach den Empfehlungen der Fleischner Society 2017.',
    scopeTitle: 'Ist die Leitlinie anwendbar?', scopeText: 'Die Fleischner-Empfehlungen gelten nur für inzidentell entdeckte Rundherde bei Erwachsenen.',
    age: 'Patientin oder Patient ist mindestens 35 Jahre alt', incidental: 'Inzidenteller Befund außerhalb eines Lungenkrebs-Screenings',
    immune: 'Keine Immunsuppression', cancer: 'Keine bekannte aktive Primärtumorerkrankung',
    scopeInfo: 'Alle vier Voraussetzungen müssen erfüllt sein. Bei Ausschlusskonstellationen ist ein individuelles, klinisch-onkologisches Vorgehen erforderlich.',
    noduleTitle: 'Wie ist der relevante Rundherd beschaffen?', noduleText: 'Bei multiplen Herden wird der suspekteste – nicht zwingend der größte – Herd vermessen.',
    density: 'Dichte', count: 'Anzahl', solid: 'Solide', ggo: 'Reines Milchglas', partSolid: 'Part-solid', single: 'Solitär', multiple: 'Multipel',
    solidHint: 'Vollständig weichgewebsdicht', ggoHint: 'Gefäße bleiben durchscheinend', partHint: 'Milchglas mit solider Komponente',
    measurementTitle: 'Wie groß ist der Rundherd?', measurementText: 'Lange und kurze Achse in derselben Ebene messen. Der Rechner bildet den Mittelwert und rundet auf den nächsten Millimeter.',
    longAxis: 'Lange Achse', shortAxis: 'Kurze Achse', solidPart: 'Solide Komponente', millimetres: 'Millimeter',
    calculatedMean: 'Leitliniengröße', formula: '(lange + kurze Achse) ÷ 2, gerundet', suspiciousLead: 'Suspektester Herd',
    riskTitle: 'Wie ist das Gesamtrisiko?', riskText: 'Das Risikoprofil beeinflusst die Empfehlung für solide Rundherde. Morphologie und Lokalisation gehören in die Gesamtabwägung.',
    low: 'Niedrigeres Risiko', high: 'Höheres Risiko', lowHint: 'z. B. jung, geringe/keine Rauchexposition, glatter Rand, kein Oberlappenfokus',
    highHint: 'z. B. höheres Alter, starke Rauchexposition, Spikulation, Oberlappenlage, Emphysem/Fibrose',
    resultTitle: 'Fleischner-Empfehlung', resultText: 'Die Eingaben wurden nach den 2017er-Empfehlungen zusammengeführt.',
    notApplicable: 'Fleischner nicht anwendbar', notApplicableText: 'Für diese Konstellation soll keine standardisierte Fleischner-Follow-up-Empfehlung ausgegeben werden. Vorgehen anhand der klinischen Situation, Grunderkrankung und ggf. multidisziplinär festlegen.',
    primaryRec: 'Empfohlenes Vorgehen', context: 'Einordnung', report: 'Befundbaustein', copy: 'Text kopieren', copied: 'Kopiert',
    next: 'Weiter', back: 'Zurück', restart: 'Neu beginnen', required: 'Bitte vervollständigen Sie die Angaben.',
    axisError: 'Die lange Achse muss mindestens so groß wie die kurze Achse sein.', solidError: 'Die solide Komponente muss zwischen 1 mm und der Gesamtgröße des Herdes liegen.',
    disclaimer: 'Medizinische Orientierungshilfe nach Fleischner 2017 · ersetzt nicht die ärztliche Gesamtbeurteilung. Morphologie, Voraufnahmen und Patientenpräferenz können das Intervall verändern.',
    source: 'MacMahon et al. · Radiology 2017', by: 'Ein Tool von', developed: 'Entwickelt von Dr. Zia',
    sizeBand: ['< 6 mm', '6–8 mm', '> 8 mm'],
  },
  en: {
    brand: 'FLEISCHNER', steps: ['Eligibility', 'Nodule', 'Measurement', 'Recommendation'],
    intro: 'Management of incidental pulmonary nodules according to the 2017 Fleischner Society recommendations.',
    scopeTitle: 'Do the guidelines apply?', scopeText: 'Fleischner recommendations apply only to incidentally detected nodules in adults.',
    age: 'Patient is at least 35 years old', incidental: 'Incidental finding outside lung cancer screening', immune: 'No immunosuppression', cancer: 'No known active primary cancer',
    scopeInfo: 'All four criteria must be met. Excluded scenarios require individual clinical and oncological management.',
    noduleTitle: 'What is the relevant nodule type?', noduleText: 'With multiple nodules, measure the most suspicious nodule, which is not necessarily the largest.',
    density: 'Attenuation', count: 'Number', solid: 'Solid', ggo: 'Pure ground-glass', partSolid: 'Part-solid', single: 'Single', multiple: 'Multiple',
    solidHint: 'Completely soft-tissue attenuation', ggoHint: 'Underlying vessels remain visible', partHint: 'Ground-glass with a solid component',
    measurementTitle: 'How large is the nodule?', measurementText: 'Measure long and short axes in the same plane. The calculator averages both and rounds to the nearest millimetre.',
    longAxis: 'Long axis', shortAxis: 'Short axis', solidPart: 'Solid component', millimetres: 'Millimetres',
    calculatedMean: 'Guideline size', formula: '(long + short axis) ÷ 2, rounded', suspiciousLead: 'Most suspicious nodule',
    riskTitle: 'What is the overall risk?', riskText: 'Risk changes recommendations for solid nodules. Morphology and location remain part of the overall assessment.',
    low: 'Lower risk', high: 'Higher risk', lowHint: 'e.g. younger age, little/no smoking, smooth margin, non-upper-lobe location',
    highHint: 'e.g. older age, heavy smoking, spiculation, upper-lobe location, emphysema/fibrosis',
    resultTitle: 'Fleischner recommendation', resultText: 'The entries were combined according to the 2017 recommendations.',
    notApplicable: 'Fleischner not applicable', notApplicableText: 'No standard Fleischner follow-up should be generated for this scenario. Determine management from the clinical context, underlying disease and, where appropriate, multidisciplinary review.',
    primaryRec: 'Recommended management', context: 'Interpretation', report: 'Report text', copy: 'Copy text', copied: 'Copied',
    next: 'Continue', back: 'Back', restart: 'Start again', required: 'Please complete the required information.',
    axisError: 'The long axis must be at least as large as the short axis.', solidError: 'The solid component must be between 1 mm and the overall nodule size.',
    disclaimer: 'Clinical decision aid based on Fleischner 2017 · does not replace integrated physician assessment. Morphology, prior imaging and patient preference may alter the interval.',
    source: 'MacMahon et al. · Radiology 2017', by: 'A tool by', developed: 'Developed by Dr. Zia',
    sizeBand: ['< 6 mm', '6–8 mm', '> 8 mm'],
  },
}

function roundGuidelineSize(longAxis, shortAxis) {
  const a = Number(longAxis)
  const b = Number(shortAxis)
  if (!(a > 0) || !(b > 0)) return null
  return Math.round((a + b) / 2)
}

function recommendation({ applicable, density, count, size, risk, solidComponent, lang }) {
  const de = lang === 'de'
  if (!applicable) return { tone: 'stop', title: de ? 'Individuelles Vorgehen erforderlich' : 'Individual management required', text: COPY[lang].notApplicableText, context: de ? 'Die 2017er-Tabelle ist in dieser Situation nicht validiert.' : 'The 2017 table is not validated in this setting.' }
  if (density === 'solid') {
    if (size < 6) return { tone: risk === 'high' ? 'watch' : 'quiet', title: risk === 'high' ? (de ? 'Optionales CT nach 12 Monaten' : 'Optional CT at 12 months') : (de ? 'Keine Routinekontrolle' : 'No routine follow-up'), text: risk === 'high' ? (de ? 'Eine Verlaufskontrolle nach 12 Monaten kann erwogen werden, besonders bei suspekter Morphologie oder Oberlappenlage.' : 'A follow-up CT at 12 months may be considered, especially with suspicious morphology or upper-lobe location.') : (de ? 'Nach Fleischner ist keine routinemäßige Bildgebung erforderlich.' : 'No routine imaging is required under Fleischner.'), context: de ? `${count === 'single' ? 'Solitärer' : 'Multipler'} solider Rundherd < 6 mm · ${risk === 'high' ? 'höheres' : 'niedrigeres'} Risiko.` : `${count === 'single' ? 'Single' : 'Multiple'} solid nodule < 6 mm · ${risk === 'high' ? 'higher' : 'lower'} risk.` }
    if (count === 'single' && size <= 8) return { tone: 'watch', title: de ? 'CT nach 6–12 Monaten' : 'CT at 6–12 months', text: risk === 'high' ? (de ? 'Anschließend CT nach 18–24 Monaten.' : 'Then CT at 18–24 months.') : (de ? 'Anschließend CT nach 18–24 Monaten erwägen.' : 'Then consider CT at 18–24 months.'), context: de ? `Solitärer solider Rundherd 6–8 mm · ${risk === 'high' ? 'höheres' : 'niedrigeres'} Risiko.` : `Single solid nodule 6–8 mm · ${risk === 'high' ? 'higher' : 'lower'} risk.` }
    if (count === 'single') return { tone: 'action', title: de ? 'Abklärung nach etwa 3 Monaten' : 'Evaluation at about 3 months', text: de ? 'CT, PET/CT oder Gewebesicherung erwägen; Auswahl nach Morphologie, klinischem Risiko und Komorbidität.' : 'Consider CT, PET/CT or tissue sampling; select according to morphology, clinical risk and comorbidity.', context: de ? 'Solitärer solider Rundherd > 8 mm.' : 'Single solid nodule > 8 mm.' }
    return { tone: 'watch', title: de ? 'CT nach 3–6 Monaten' : 'CT at 3–6 months', text: risk === 'high' ? (de ? 'Anschließend CT nach 18–24 Monaten. Das Management richtet sich nach dem suspektesten Herd.' : 'Then CT at 18–24 months. Management is guided by the most suspicious nodule.') : (de ? 'Anschließend CT nach 18–24 Monaten erwägen. Das Management richtet sich nach dem suspektesten Herd.' : 'Then consider CT at 18–24 months. Management is guided by the most suspicious nodule.'), context: de ? `Multiple solide Rundherde ${size <= 8 ? '6–8 mm' : '> 8 mm'} · ${risk === 'high' ? 'höheres' : 'niedrigeres'} Risiko.` : `Multiple solid nodules ${size <= 8 ? '6–8 mm' : '> 8 mm'} · ${risk === 'high' ? 'higher' : 'lower'} risk.` }
  }
  if (count === 'multiple') {
    if (size < 6) return { tone: 'watch', title: de ? 'CT nach 3–6 Monaten' : 'CT at 3–6 months', text: de ? 'Bei Stabilität CT nach 2 und 4 Jahren erwägen. Das weitere Vorgehen richtet sich nach dem suspektesten Herd.' : 'If stable, consider CT at 2 and 4 years. Subsequent management is guided by the most suspicious nodule.', context: de ? 'Multiple subsolide Rundherde < 6 mm.' : 'Multiple subsolid nodules < 6 mm.' }
    return { tone: 'watch', title: de ? 'CT nach 3–6 Monaten' : 'CT at 3–6 months', text: de ? 'Das weitere Vorgehen richtet sich nach dem suspektesten Rundherd und dessen Morphologie.' : 'Subsequent management is based on the most suspicious nodule and its morphology.', context: de ? 'Multiple subsolide Rundherde ≥ 6 mm.' : 'Multiple subsolid nodules ≥ 6 mm.' }
  }
  if (density === 'ggo') {
    if (size < 6) return { tone: 'quiet', title: de ? 'Keine Routinekontrolle' : 'No routine follow-up', text: de ? 'Bei besonders suspekter Morphologie oder einem Herd nahe 6 mm kann eine Kontrolle nach 2 und 4 Jahren erwogen werden.' : 'For particularly suspicious morphology or a nodule close to 6 mm, follow-up at 2 and 4 years may be considered.', context: de ? 'Solitärer reiner Milchglasrundherd < 6 mm.' : 'Single pure ground-glass nodule < 6 mm.' }
    return { tone: 'watch', title: de ? 'CT nach 6–12 Monaten' : 'CT at 6–12 months', text: de ? 'Persistenz bestätigen; bei Persistenz CT alle 2 Jahre bis insgesamt 5 Jahre.' : 'Confirm persistence; if persistent, CT every 2 years until 5 years.', context: de ? 'Solitärer reiner Milchglasrundherd ≥ 6 mm.' : 'Single pure ground-glass nodule ≥ 6 mm.' }
  }
  if (size < 6) return { tone: 'quiet', title: de ? 'Keine Routinekontrolle' : 'No routine follow-up', text: de ? 'Sehr kleine part-solide Herde werden wie reine Milchglasherde gleicher Größe behandelt.' : 'Very small part-solid nodules are managed like pure ground-glass nodules of the same size.', context: de ? 'Solitärer part-solider Rundherd < 6 mm.' : 'Single part-solid nodule < 6 mm.' }
  if (solidComponent >= 6) return { tone: 'action', title: de ? 'Hoch suspekter Befund' : 'Highly suspicious finding', text: de ? 'Nach kurzfristiger Bestätigung der Persistenz weiterführende diagnostische Abklärung erwägen; ein solider Anteil ≥ 6 mm ist hoch suspekt.' : 'After short-term confirmation of persistence, consider further diagnostic evaluation; a solid component ≥ 6 mm is highly suspicious.', context: de ? `Solitärer part-solider Rundherd ≥ 6 mm mit solider Komponente ${solidComponent} mm.` : `Single part-solid nodule ≥ 6 mm with a ${solidComponent} mm solid component.` }
  return { tone: 'watch', title: de ? 'CT nach 3–6 Monaten' : 'CT at 3–6 months', text: de ? 'Persistenz bestätigen; bleibt der solide Anteil < 6 mm, anschließend jährliches CT für 5 Jahre.' : 'Confirm persistence; if the solid component remains < 6 mm, annual CT for 5 years.', context: de ? `Solitärer part-solider Rundherd ≥ 6 mm mit solider Komponente < 6 mm.` : 'Single part-solid nodule ≥ 6 mm with a solid component < 6 mm.' }
}

function LungMark({ density = 'solid', compact = false }) {
  return <svg className={compact ? styles.lungCompact : styles.lungMark} viewBox="0 0 240 260" aria-hidden="true">
    <path d="M118 28v79M118 70 87 91M118 70l33 21" className={styles.airways}/>
    <path d="M106 75c-21 0-51 20-65 59-18 51-8 94 22 100 25 5 45-17 45-48V81c0-4-1-6-2-6Z"/><path d="M132 75c21 0 51 20 65 59 18 51 8 94-22 100-25 5-45-17-45-48V81c0-4 1-6 2-6Z"/>
    <circle cx="169" cy="151" r={density === 'ggo' ? 16 : 11} className={`${styles.nodule} ${styles[density]}`}/>{density === 'partSolid' ? <circle cx="169" cy="151" r="6" className={styles.solidCore}/> : null}
  </svg>
}

function Stepper({ step, completed, labels, onStep }) {
  return <ol className={styles.stepper} aria-label="Progress">{labels.map((label, index) => <li key={label} className={index === step ? styles.active : index < step ? styles.done : ''}><button type="button" disabled={index > completed} onClick={() => onStep(index)} aria-current={index === step ? 'step' : undefined}><span>{index < step ? '✓' : index + 1}</span><small>{label}</small></button></li>)}</ol>
}

function SelectCard({ active, onClick, icon, title, text }) {
  return <button type="button" className={`${styles.selectCard} ${active ? styles.selected : ''}`} onClick={onClick} aria-pressed={active}>{icon}<span><strong>{title}</strong>{text ? <small>{text}</small> : null}</span><i>{active ? '✓' : ''}</i></button>
}

function Measurement({ label, value, onChange, max = 30 }) {
  const number = Number(value) || 1
  return <label className={styles.measure}><span>{label}<small>mm</small></span><div><button type="button" disabled={!value || number <= 1} onClick={() => onChange(String(Math.max(1, number - 1)))} aria-label={`${label} − 1 mm`}>−</button><strong>{value || '—'}<small>mm</small></strong><button type="button" onClick={() => onChange(String(value ? Math.min(max, number + 1) : 1))} aria-label={`${label} + 1 mm`}>+</button></div><input type="range" min="1" max={max} step="1" value={number} onChange={event => onChange(event.target.value)} style={{ '--progress': `${(number - 1) / (max - 1) * 100}%` }} aria-label={label}/><footer><span>1</span><span>{Math.round(max / 2)}</span><span>{max} mm</span></footer></label>
}

export default function FleischnerPage() {
  const { lang, setLang } = useLanguage()
  const activeLang = lang === 'en' ? 'en' : 'de'
  const ui = COPY[activeLang]
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [eligibility, setEligibility] = useState({ age: true, incidental: true, immune: true, cancer: true })
  const [density, setDensity] = useState('solid')
  const [count, setCount] = useState('single')
  const [longAxis, setLongAxis] = useState('')
  const [shortAxis, setShortAxis] = useState('')
  const [solidComponent, setSolidComponent] = useState('')
  const [risk, setRisk] = useState('low')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const applicable = Object.values(eligibility).every(Boolean)
  const meanSize = roundGuidelineSize(longAxis, shortAxis)
  const needsSolidComponent = density === 'partSolid' && count === 'single' && meanSize >= 6
  const solidSize = Number(solidComponent)
  const result = useMemo(() => recommendation({ applicable, density, count, size: meanSize, risk, solidComponent: solidSize, lang: activeLang }), [applicable, density, count, meanSize, risk, solidSize, activeLang])
  const reportText = applicable ? `${activeLang === 'de' ? 'Inzidenteller' : 'Incidental'} ${count === 'single' ? (activeLang === 'de' ? 'solitärer' : 'single') : (activeLang === 'de' ? 'multipler' : 'multiple')} ${density === 'solid' ? (activeLang === 'de' ? 'solider Lungenrundherd' : 'solid pulmonary nodule') : density === 'ggo' ? (activeLang === 'de' ? 'reiner Milchglasrundherd' : 'pure ground-glass nodule') : (activeLang === 'de' ? 'part-solider Lungenrundherd' : 'part-solid pulmonary nodule')} ${activeLang === 'de' ? 'mit einer mittleren Größe von' : 'with a mean diameter of'} ${meanSize} mm${needsSolidComponent && solidSize > 0 ? ` (${activeLang === 'de' ? 'solide Komponente' : 'solid component'} ${solidSize} mm)` : ''}. ${result.title}. ${result.text}` : result.text

  const axesValid = Number(longAxis) >= Number(shortAxis)
  const solidComponentValid = !needsSolidComponent || (solidSize > 0 && solidSize <= meanSize)
  const canContinue = step === 0 ? true : step === 1 ? Boolean(density && count) : step === 2 ? Boolean(meanSize && axesValid && solidComponentValid) : true
  const next = () => { if (!canContinue) { setError(step === 2 && meanSize && !axesValid ? ui.axisError : step === 2 && meanSize && !solidComponentValid ? ui.solidError : ui.required); return }; setError(''); const target = applicable ? Math.min(step + 1, 3) : 3; setCompleted(value => Math.max(value, target)); setStep(target) }
  const back = () => { setError(''); setStep(value => !applicable && value === 3 ? 0 : Math.max(0, value - 1)) }
  const restart = () => { setStep(0); setCompleted(0); setEligibility({ age: true, incidental: true, immune: true, cancer: true }); setDensity('solid'); setCount('single'); setLongAxis(''); setShortAxis(''); setSolidComponent(''); setRisk('low'); setError(''); setCopied(false) }
  const copyReport = async () => { try { await navigator.clipboard.writeText(reportText); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch {} }

  return <main className={styles.page} lang={activeLang} dir="ltr">
    <header className={styles.topbar}><Link href="/fleischner" className={styles.brand}><span><LungMark compact/></span>{ui.brand}</Link><nav><Link href="/">RadYar</Link><div>{['de','en'].map(code => <button type="button" key={code} onClick={() => setLang(code)} className={activeLang === code ? styles.langActive : ''} aria-pressed={activeLang === code}>{code.toUpperCase()}</button>)}</div></nav></header>
    <div className={styles.shell}>
      <aside className={styles.visual}><div className={styles.orbit}/><LungMark density={density}/><div className={styles.visualCopy}><span>2017 · FLEISCHNER SOCIETY</span><h1>{ui.intro}</h1><p>{meanSize ? `${ui.calculatedMean}: ${meanSize} mm` : ui.formula}</p></div><div className={styles.measureScale}><span/><i/><b style={{ '--position': `${meanSize ? Math.min(meanSize / 12 * 100, 100) : 0}%` }}/><footer>{ui.sizeBand.map(label => <small key={label}>{label}</small>)}</footer></div></aside>
      <section className={styles.workspace}>
        <Stepper step={step} completed={completed} labels={ui.steps} onStep={(target) => { setError(''); setStep(target) }}/>
        <div className={styles.viewport} key={step}>
          {step === 0 ? <div className={styles.step}><header><h2>{ui.scopeTitle}</h2><p>{ui.scopeText}</p></header><div className={styles.checkList}>{Object.keys(eligibility).map(key => <button type="button" key={key} className={eligibility[key] ? styles.checked : ''} onClick={() => setEligibility(values => ({ ...values, [key]: !values[key] }))} aria-pressed={eligibility[key]}><span>{eligibility[key] ? '✓' : '×'}</span><strong>{ui[key]}</strong></button>)}</div><div className={`${styles.note} ${!applicable ? styles.warning : ''}`}><i>i</i><p>{ui.scopeInfo}</p></div></div> : null}
          {step === 1 ? <div className={styles.step}><header><h2>{ui.noduleTitle}</h2><p>{ui.noduleText}</p></header><fieldset><legend>1 · {ui.density}</legend><div className={styles.densityGrid}><SelectCard active={density === 'solid'} onClick={() => setDensity('solid')} icon={<span className={`${styles.noduleIcon} ${styles.iconSolid}`}/>} title={ui.solid} text={ui.solidHint}/><SelectCard active={density === 'ggo'} onClick={() => setDensity('ggo')} icon={<span className={`${styles.noduleIcon} ${styles.iconGgo}`}/>} title={ui.ggo} text={ui.ggoHint}/><SelectCard active={density === 'partSolid'} onClick={() => setDensity('partSolid')} icon={<span className={`${styles.noduleIcon} ${styles.iconPart}`}><i/></span>} title={ui.partSolid} text={ui.partHint}/></div></fieldset><fieldset><legend>2 · {ui.count}</legend><div className={styles.countGrid}><SelectCard active={count === 'single'} onClick={() => setCount('single')} icon={<span className={styles.countIcon}>●</span>} title={ui.single}/><SelectCard active={count === 'multiple'} onClick={() => setCount('multiple')} icon={<span className={styles.countIcon}>● <i>●</i> ●</span>} title={ui.multiple}/></div></fieldset></div> : null}
          {step === 2 ? <div className={styles.step}><header><h2>{ui.measurementTitle}</h2><p>{ui.measurementText}</p></header>{count === 'multiple' ? <div className={styles.leadNote}><span>◎</span><p><strong>{ui.suspiciousLead}</strong>{ui.noduleText}</p></div> : null}<div className={styles.measureGrid}><Measurement label={ui.longAxis} value={longAxis} onChange={setLongAxis}/><Measurement label={ui.shortAxis} value={shortAxis} onChange={setShortAxis}/>{needsSolidComponent ? <Measurement label={ui.solidPart} value={solidComponent} onChange={setSolidComponent} max={Math.max(meanSize, 6)}/> : null}</div><div className={styles.meanResult}><span>{ui.calculatedMean}<small>{ui.formula}</small></span><strong>{meanSize ?? '—'}<small>mm</small></strong></div></div> : null}
          {step === 3 ? <div className={`${styles.step} ${styles.resultStep}`}><header><h2>{applicable ? ui.resultTitle : ui.notApplicable}</h2><p>{applicable ? ui.resultText : ui.notApplicableText}</p></header>{applicable && density === 'solid' ? <><div className={styles.riskIntro}><strong>{ui.riskTitle}</strong><p>{ui.riskText}</p></div><div className={styles.riskGrid}><SelectCard active={risk === 'low'} onClick={() => setRisk('low')} icon={<span className={styles.riskIcon}>↓</span>} title={ui.low} text={ui.lowHint}/><SelectCard active={risk === 'high'} onClick={() => setRisk('high')} icon={<span className={styles.riskIcon}>↑</span>} title={ui.high} text={ui.highHint}/></div></> : null}<article className={styles.recommendation} data-tone={result.tone}><header><span>{result.tone === 'quiet' ? '✓' : result.tone === 'stop' ? '!' : result.tone === 'action' ? '◆' : '◷'}</span><div><small>{ui.primaryRec}</small><h3>{result.title}</h3></div></header><p>{result.text}</p><footer><small>{ui.context}</small><strong>{result.context}</strong></footer></article><div className={styles.report}><div><small>{ui.report}</small><p>{reportText}</p></div><button type="button" onClick={copyReport}>{copied ? '✓' : '⧉'} {copied ? ui.copied : ui.copy}</button></div></div> : null}
        </div>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
        <footer className={styles.actions}>{step > 0 ? <button type="button" className={styles.back} onClick={back}>← {ui.back}</button> : <span/>}{step < 3 ? <button type="button" className={styles.next} onClick={next} aria-disabled={!canContinue}>{ui.next} →</button> : <button type="button" className={styles.next} onClick={restart}>{ui.restart} ↻</button>}</footer>
      </section>
    </div>
    <footer className={styles.disclaimer}><span>i</span><p>{ui.disclaimer}</p><a href={SOURCE_URL} target="_blank" rel="noreferrer">{ui.source} ↗</a><small><Link href="/">{ui.by} <strong>RadYar</strong></Link> · {ui.developed}</small></footer>
  </main>
}
