'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const REGION_GROUPS = [
  { id: 'general', threshold: 10, icon: 'body' },
  { id: 'specific', threshold: null, icon: 'target' },
]

const SPECIAL_REGIONS = [
  { id: 'inguinal', threshold: 15, de: 'Inguinal', en: 'Inguinal' },
  { id: 'facial', threshold: 5, de: 'Fazial', en: 'Facial' },
  { id: 'parotid', threshold: 5, de: 'Parotideal', en: 'Parotid' },
  { id: 'retroauricular', threshold: 5, de: 'Retroaurikulär', en: 'Retroauricular' },
  { id: 'occipital', threshold: 5, de: 'Okzipital', en: 'Occipital' },
  { id: 'retropharyngeal', threshold: 5, de: 'Retropharyngeal', en: 'Retropharyngeal' },
  { id: 'anterior-jugular', threshold: 5, de: 'Anterior-jugulär', en: 'Anterior jugular' },
  { id: 'retrocrural', threshold: 5, de: 'Retrokrural', en: 'Retrocrural' },
  { id: 'cardiophrenic', threshold: 5, de: 'Kardiophrenisch', en: 'Cardiophrenic' },
  { id: 'mesenteric', threshold: 5, de: 'Mesenterial', en: 'Mesenteric' },
  { id: 'obturator', threshold: 5, de: 'Obturatorisch', en: 'Obturator' },
  { id: 'mesorectal', threshold: 5, de: 'Mesorektal', en: 'Mesorectal' },
]

const COPY = {
  de: {
    brand: 'NODE-RADS', by: 'Ein Tool von', steps: ['Region', 'Größe', 'Konfiguration', 'Ergebnis'],
    regionTitle: 'Wo liegt der Lymphknoten?', regionText: 'Wählen Sie die Region, um den korrekten Größenschwellenwert festzulegen.',
    regions: {
      general: { title: 'Allgemein', desc: 'Für die meisten Lymphknotenregionen' },
      specific: { title: 'Besondere Region', desc: 'Inguinal oder Region mit 5-mm-Grenzwert' },
    },
    specialTitle: 'Welche besondere Region?', regionalThreshold: 'Grenzwert nach Auswahl', shortAxis: 'Kurzachse', currentThreshold: 'Aktueller Schwellenwert',
    sizeTitle: 'Wie groß ist der Lymphknoten?', sizeText: 'Messen Sie die kurze Achse axial. Für Bulk zählt die längste Achse in jeder Ebene.',
    shortValue: 'Kurze Achse', longestValue: 'Längste Achse', millimetres: 'Millimeter', growth: 'Zunahme ≥ 2 mm im Verlauf', growthHint: 'Gilt als vergrößert, auch unterhalb des regionalen Grenzwerts.',
    sizeNormal: 'Normal groß', sizeEnlarged: 'Vergrößert', sizeBulk: 'Bulk', anyAxis: 'beliebige Achse',
    configTitle: 'Wie ist der Lymphknoten konfiguriert?', configText: 'Wählen Sie je ein Merkmal für Textur, Rand und Form.',
    texture: 'Textur', border: 'Rand', shape: 'Form', configScore: 'Konfigurationsscore',
    textures: ['Homogen', 'Heterogen', 'Fokale Nekrose', 'Grobe oder neue Nekrose', 'Entitätsspezifischer Befund'],
    entitySpecificInfo: 'Entitätsspezifische Befunde: zystische Textur bei Plattenepithelkarzinomen, Verkalkungen beim Schilddrüsenkarzinom oder muzinöse Textur bei muzinösen Adenokarzinomen.',
    borders: ['Glatt', 'Unregelmäßig oder unscharf'],
    shapes: ['Jede Form bei erhaltenem Fetthilus', 'Nierenförmig / oval ohne Fetthilus', 'Rund ohne Fetthilus'],
    resultTitle: 'Ihre Node-RADS Einstufung', resultText: 'Größe und Konfiguration werden nach Node-RADS 1.0 zusammengeführt.',
    levels: ['Sehr geringe Wahrscheinlichkeit', 'Geringe Wahrscheinlichkeit', 'Unklar / äquivokal', 'Hohe Wahrscheinlichkeit', 'Sehr hohe Wahrscheinlichkeit'],
    sizeCategory: 'Größenkategorie', report: 'Strukturierter Befundtext', copy: 'Befundtext kopieren', copied: 'Kopiert',
    next: 'Weiter', back: 'Zurück', restart: 'Neu beginnen', required: 'Bitte treffen Sie eine Auswahl.', invalidMeasurement: 'Die längste Achse muss mindestens so groß wie die kurze Achse sein.',
    info: 'Node-RADS ist für die Beurteilung von Lymphknoten in kontrastverstärkter CT oder MRT konzipiert.',
    disclaimer: 'Orientierungshilfe nach Node-RADS 1.0 · ersetzt nicht die ärztliche Gesamtbeurteilung oder tumorspezifische TNM-Kriterien.',
    source: 'Elsholtz et al. · European Radiology · 2021',
  },
  en: {
    brand: 'NODE-RADS', by: 'A tool by', steps: ['Region', 'Size', 'Configuration', 'Result'],
    regionTitle: 'Where is the lymph node located?', regionText: 'Choose the region to apply the correct size threshold.',
    regions: {
      general: { title: 'General', desc: 'For most lymph-node regions' },
      specific: { title: 'Special region', desc: 'Inguinal or a region with a 5 mm threshold' },
    },
    specialTitle: 'Which special region?', regionalThreshold: 'Threshold after selection', shortAxis: 'short axis', currentThreshold: 'Current threshold',
    sizeTitle: 'How large is the lymph node?', sizeText: 'Measure the short axis axially. Bulk is based on the longest axis in any plane.',
    shortValue: 'Short axis', longestValue: 'Longest axis', millimetres: 'Millimetres', growth: 'Interval increase ≥ 2 mm', growthHint: 'Counts as enlarged even below the regional threshold.',
    sizeNormal: 'Normal size', sizeEnlarged: 'Enlarged', sizeBulk: 'Bulk', anyAxis: 'any axis',
    configTitle: 'What is the node configuration?', configText: 'Select one feature each for texture, border and shape.',
    texture: 'Texture', border: 'Border', shape: 'Shape', configScore: 'Configuration score',
    textures: ['Homogeneous', 'Heterogeneous', 'Focal necrosis', 'Gross or new necrosis', 'Entity-specific finding'],
    entitySpecificInfo: 'Entity-specific findings: cystic texture in squamous cell carcinoma, calcification in thyroid carcinoma, or mucinous texture in mucinous adenocarcinoma.',
    borders: ['Smooth', 'Irregular or ill-defined'],
    shapes: ['Any shape with preserved fatty hilum', 'Kidney-bean / oval without fatty hilum', 'Spherical without fatty hilum'],
    resultTitle: 'Your Node-RADS assessment', resultText: 'Size and configuration are combined according to Node-RADS 1.0.',
    levels: ['Very low likelihood', 'Low likelihood', 'Equivocal', 'High likelihood', 'Very high likelihood'],
    sizeCategory: 'Size category', report: 'Structured report text', copy: 'Copy report text', copied: 'Copied',
    next: 'Continue', back: 'Back', restart: 'Start again', required: 'Please make a selection.', invalidMeasurement: 'The longest axis must be at least as large as the short axis.',
    info: 'Node-RADS is designed for lymph-node assessment on contrast-enhanced CT or MRI.',
    disclaimer: 'Decision aid based on Node-RADS 1.0 · does not replace integrated physician assessment or tumour-specific TNM criteria.',
    source: 'Elsholtz et al. · European Radiology · 2021',
  },
}

const SIZE_LABEL_KEY = { normal: 'sizeNormal', enlarged: 'sizeEnlarged', bulk: 'sizeBulk' }
const RESULT_COLORS = ['#59c69a', '#63c7dd', '#e2bd5f', '#ed8a50', '#ef5f65']
const TEXTURE_SCORES = [0, 1, 2, 3, 3]

function RegionIcon({ type }) {
  if (type === 'pelvis') return <svg viewBox="0 0 44 44" aria-hidden="true"><path d="M10 8c3 8 3 14 1 24M34 8c-3 8-3 14-1 24M11 24c6 1 9 5 11 12M33 24c-6 1-9 5-11 12"/><circle cx="15" cy="24" r="2"/><circle cx="29" cy="24" r="2"/></svg>
  if (type === 'body') return <svg viewBox="0 0 44 44" aria-hidden="true"><path d="M16 8c0 4 2 6 6 6s6-2 6-6M22 14v21M12 38l4-20 6-4 6 4 4 20M16 20l-7 10M28 20l7 10"/><circle cx="22" cy="8" r="4"/></svg>
  return <svg viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="13"/><circle cx="22" cy="22" r="5"/><path d="M22 3v8M22 33v8M3 22h8M33 22h8"/></svg>
}

function ArrowIcon({ back = false }) {
  return <svg viewBox="0 0 20 20" aria-hidden="true" className={back ? styles.arrowBack : ''}><path d="M3 10h13M11 5l5 5-5 5"/></svg>
}

function Stepper({ step, setStep, ui, completed }) {
  return <ol className={styles.stepper} aria-label="Progress">
    {ui.steps.map((label, index) => <li key={label} className={index === step ? styles.stepActive : index < step ? styles.stepDone : ''}>
      <button type="button" disabled={index > completed} onClick={() => setStep(index)} aria-current={index === step ? 'step' : undefined}>
        <span>{index < step ? '✓' : index + 1}</span><small>{label}</small>
      </button>
    </li>)}
  </ol>
}

function Choice({ selected, onClick, children, detail, icon }) {
  return <button type="button" className={`${styles.choice} ${selected ? styles.choiceSelected : ''}`} onClick={onClick} aria-pressed={selected}>
    {icon ? <span className={styles.choiceIcon}><RegionIcon type={icon}/></span> : null}
    <span className={styles.choiceText}>{children}{detail ? <small>{detail}</small> : null}</span>
    <span className={styles.choiceState}>{selected ? '✓' : ''}</span>
  </button>
}

function RegionStep({ region, setRegion, specialRegion, setSpecialRegion, ui, lang }) {
  return <div className={styles.stepContent}>
    <header><h1>{ui.regionTitle}</h1><p>{ui.regionText}</p></header>
    <div className={styles.regionList}>
      {REGION_GROUPS.map(item => <Choice key={item.id} selected={region === item.id} icon={item.icon} onClick={() => { setRegion(item.id); if (item.id !== 'specific') setSpecialRegion('') }} detail={ui.regions[item.id].desc}>
        <strong>{ui.regions[item.id].title}</strong><em>{item.threshold ? <>normal &lt; {item.threshold} mm</> : ui.regionalThreshold}</em>
      </Choice>)}
    </div>
    {region === 'specific' ? <div className={styles.specialRegions}>
      <h2>{ui.specialTitle}</h2>
      <div>{SPECIAL_REGIONS.map(item => <button type="button" key={item.id} className={specialRegion === item.id ? styles.specialActive : ''} onClick={() => setSpecialRegion(item.id)} aria-pressed={specialRegion === item.id}><strong>{item[lang] || item.de}</strong><span>normal &lt; {item.threshold} mm</span></button>)}</div>
    </div> : null}
    <div className={styles.infoNote}><span>i</span><p>{ui.info}</p></div>
  </div>
}

function MeasurementField({ label, value, onChange, ui }) {
  const numericValue = Number(value) || 2
  const changeBy = delta => onChange(String(Math.min(35, Math.max(2, value ? numericValue + delta : 2))))
  return <div className={styles.measureField}>
    <div className={styles.measureHeading}><span>{label}</span><em>{ui.millimetres}</em></div>
    <div className={styles.pickerControl}>
      <button type="button" onClick={() => changeBy(-1)} disabled={!value || numericValue <= 2} aria-label={`${label} − 1 mm`}>−</button>
      <strong>{value || '—'}<small>mm</small></strong>
      <button type="button" onClick={() => changeBy(1)} disabled={numericValue >= 35} aria-label={`${label} + 1 mm`}>+</button>
    </div>
    <input className={styles.sizeSlider} type="range" min="2" max="35" step="1" value={numericValue} onChange={event => onChange(event.target.value)} aria-label={label} style={{ '--picker-progress': `${(numericValue - 2) / 33 * 100}%` }}/>
    <div className={styles.pickerScale}><span>2</span><span>20</span><span>35 mm</span></div>
  </div>
}

function SizeStep({ shortAxis, setShortAxis, longAxis, setLongAxis, growth, setGrowth, sizeCategory, threshold, ui, invalid }) {
  return <div className={styles.stepContent}>
    <header><h1>{ui.sizeTitle}</h1><p>{ui.sizeText}</p></header>
    <div className={styles.measureGrid}>
      <MeasurementField label={ui.shortValue} value={shortAxis} onChange={setShortAxis} ui={ui}/>
      <MeasurementField label={ui.longestValue} value={longAxis} onChange={setLongAxis} ui={ui}/>
    </div>
    {invalid ? <p className={styles.errorText}>{ui.invalidMeasurement}</p> : null}
    <button type="button" className={`${styles.growthToggle} ${growth ? styles.growthActive : ''}`} onClick={() => setGrowth(value => !value)} aria-pressed={growth}>
      <span>{growth ? '✓' : ''}</span><span><strong>{ui.growth}</strong><small>{ui.growthHint}</small></span>
    </button>
    <div className={styles.sizeScale}>
      <div className={styles.scaleTrack}><span style={{ '--threshold-position': `${Math.min(threshold / 30 * 100, 76)}%` }}/><i/></div>
      <div className={styles.scaleLabels}><span>0</span><strong>{threshold} mm</strong><em>30 mm</em></div>
      <div className={styles.liveCategory} data-category={sizeCategory || 'empty'}><span>{ui.sizeCategory}</span><strong>{sizeCategory ? ui[SIZE_LABEL_KEY[sizeCategory]] : '—'}</strong></div>
    </div>
  </div>
}

function ScoreChoices({ title, items, scores, value, setValue }) {
  return <fieldset className={styles.scoreGroup}><legend>{title}</legend><div>{items.map((label, index) => <button type="button" key={label} onClick={() => setValue(index)} className={value === index ? styles.scoreActive : ''} aria-pressed={value === index}><span>{scores[index] > 0 ? `+${scores[index]}` : '0'}</span><strong>{label}</strong><i>{value === index ? '✓' : ''}</i></button>)}</div></fieldset>
}

function ConfigStep({ texture, setTexture, border, setBorder, shape, setShape, ui }) {
  const sum = (TEXTURE_SCORES[texture] ?? 0) + (border ?? 0) + (shape === 2 ? 1 : 0)
  return <div className={styles.stepContent}>
    <header><h1>{ui.configTitle}</h1><p>{ui.configText}</p></header>
    <ScoreChoices title={`1 · ${ui.texture}`} items={ui.textures} scores={TEXTURE_SCORES} value={texture} setValue={setTexture}/>
    <div className={styles.entityNote}><span>i</span><p>{ui.entitySpecificInfo}</p></div>
    <div className={styles.configPair}>
      <ScoreChoices title={`2 · ${ui.border}`} items={ui.borders} scores={[0,1]} value={border} setValue={setBorder}/>
      <ScoreChoices title={`3 · ${ui.shape}`} items={ui.shapes} scores={[0,0,1]} value={shape} setValue={setShape}/>
    </div>
    <div className={styles.configTotal}><span>{ui.configScore}</span><strong>{sum} / 5</strong></div>
  </div>
}

function ResultStep({ score, sizeCategory, configScore, regionLabel, shortAxis, longAxis, ui, lang, copied, setCopied }) {
  const color = RESULT_COLORS[score - 1]
  const level = ui.levels[score - 1]
  const sizeLabel = ui[SIZE_LABEL_KEY[sizeCategory]]
  const reportText = `Node-RADS ${score} (${level}); ${regionLabel}; ${shortAxis} mm ${ui.shortAxis}; ${longAxis} mm ${ui.longestValue}; ${sizeLabel}${sizeCategory === 'bulk' ? '' : `; ${ui.configScore} ${configScore}/5`}.`
  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }
  return <div className={`${styles.stepContent} ${styles.resultStep}`} style={{ '--score-color': color }}>
    <header><h1>{ui.resultTitle}</h1><p>{ui.resultText}</p></header>
    <div className={styles.scoreReveal}><div className={styles.scoreOrbit}><span>NODE-RADS</span><strong>{score}</strong></div><h2>{level}</h2></div>
    <dl className={styles.resultFacts}>
      <div><dt>{ui.currentThreshold}</dt><dd>{regionLabel}</dd></div>
      <div><dt>{ui.sizeCategory}</dt><dd>{sizeLabel}</dd></div>
      {sizeCategory !== 'bulk' ? <div><dt>{ui.configScore}</dt><dd>{configScore} / 5</dd></div> : null}
    </dl>
    <div className={styles.reportBox}><span>{ui.report}</span><p>{reportText}</p><button type="button" onClick={copyReport}>{copied ? ui.copied : ui.copy}<span>{copied ? '✓' : '⧉'}</span></button></div>
  </div>
}

function getSizeCategory(shortAxis, longAxis, threshold, growth) {
  const short = Number(shortAxis)
  const longest = Number(longAxis)
  if (!short || !longest) return null
  if (longest >= 30) return 'bulk'
  if (growth || short >= threshold) return 'enlarged'
  return 'normal'
}

function getNodeRads(sizeCategory, configScore) {
  if (sizeCategory === 'bulk') return 5
  if (sizeCategory === 'normal') return configScore === 0 ? 1 : configScore === 1 ? 2 : configScore === 2 ? 3 : 4
  return configScore === 0 ? 2 : configScore === 1 ? 3 : configScore === 2 ? 4 : 5
}

export default function NodeRadsPage() {
  const { lang, setLang } = useLanguage()
  const activeLang = lang === 'en' ? 'en' : 'de'
  const ui = COPY[activeLang]
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [region, setRegion] = useState('general')
  const [specialRegion, setSpecialRegion] = useState('')
  const [shortAxis, setShortAxis] = useState('')
  const [longAxis, setLongAxis] = useState('')
  const [growth, setGrowth] = useState(false)
  const [texture, setTexture] = useState(null)
  const [border, setBorder] = useState(null)
  const [shape, setShape] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const special = SPECIAL_REGIONS.find(item => item.id === specialRegion)
  const threshold = region === 'specific' ? special?.threshold || 10 : 10
  const thresholdDisplay = region === 'specific' && !special ? '—' : `< ${threshold} mm`
  const regionTitle = region === 'specific' && special ? special[activeLang] : ui.regions[region].title
  const regionLabel = region === 'specific' && special ? `${special[activeLang]} · < ${special.threshold} mm` : `${ui.regions.general.title} · < 10 mm`
  const invalidMeasurement = Number(shortAxis) > Number(longAxis) && Number(longAxis) > 0
  const sizeCategory = getSizeCategory(shortAxis, longAxis, threshold, growth)
  const configReady = texture !== null && border !== null && shape !== null
  const configScore = (TEXTURE_SCORES[texture] ?? 0) + (border ?? 0) + (shape === 2 ? 1 : 0)
  const score = sizeCategory ? getNodeRads(sizeCategory, configScore) : null

  const canContinue = step === 0 ? Boolean(region && (region !== 'specific' || specialRegion)) : step === 1 ? Boolean(sizeCategory && !invalidMeasurement) : step === 2 ? configReady : true
  const goNext = () => {
    if (!canContinue) { setError(step === 1 && invalidMeasurement ? ui.invalidMeasurement : ui.required); return }
    setError('')
    const next = step === 1 && sizeCategory === 'bulk' ? 3 : Math.min(step + 1, 3)
    setCompleted(value => Math.max(value, next))
    setStep(next)
  }
  const goBack = () => { setError(''); setStep(value => value === 3 && sizeCategory === 'bulk' ? 1 : Math.max(value - 1, 0)) }
  const restart = () => { setStep(0); setCompleted(0); setRegion('general'); setSpecialRegion(''); setShortAxis(''); setLongAxis(''); setGrowth(false); setTexture(null); setBorder(null); setShape(null); setError('') }

  return <main className={styles.page} dir="ltr" lang={activeLang}>
    <header className={styles.topbar}>
      <Link href="/node-rads" className={styles.brand}>{ui.brand}</Link>
      <div className={styles.topActions}><Link href="/" className={styles.radyar}><span>{ui.by}</span><strong>RadYar</strong> ↗</Link><div className={styles.languages}>{['de','en'].map(code => <button type="button" key={code} onClick={() => setLang(code)} className={activeLang === code ? styles.langActive : ''} aria-pressed={activeLang === code}>{code.toUpperCase()}</button>)}</div></div>
    </header>
    <div className={styles.appShell}>
      <aside className={styles.visualPanel}>
        <div className={styles.networkImage}/><div className={styles.pulseNode}><span/><i/></div>
        <div className={styles.thresholdCard}><small>{ui.currentThreshold}</small><strong>{thresholdDisplay}</strong><span>{ui.shortAxis}</span><h2>{regionTitle}</h2><p>{regionLabel}</p></div>
        <div className={styles.visualLegend}><span><i/>{regionTitle}</span><span><i/>{ui.source}</span></div>
      </aside>
      <section className={styles.formPanel}>
        <Stepper step={step} setStep={(next) => { setError(''); setStep(next) }} ui={ui} completed={completed}/>
        <div className={styles.stepViewport} key={step}>
          {step === 0 ? <RegionStep region={region} setRegion={setRegion} specialRegion={specialRegion} setSpecialRegion={setSpecialRegion} ui={ui} lang={activeLang}/> : null}
          {step === 1 ? <SizeStep shortAxis={shortAxis} setShortAxis={setShortAxis} longAxis={longAxis} setLongAxis={setLongAxis} growth={growth} setGrowth={setGrowth} sizeCategory={sizeCategory} threshold={threshold} ui={ui} invalid={invalidMeasurement}/> : null}
          {step === 2 ? <ConfigStep texture={texture} setTexture={setTexture} border={border} setBorder={setBorder} shape={shape} setShape={setShape} ui={ui}/> : null}
          {step === 3 && score ? <ResultStep score={score} sizeCategory={sizeCategory} configScore={configScore} regionLabel={regionLabel} shortAxis={shortAxis} longAxis={longAxis} ui={ui} lang={activeLang} copied={copied} setCopied={setCopied}/> : null}
        </div>
        {error ? <p className={styles.footerError} role="alert">{error}</p> : null}
        <footer className={styles.actionBar}>
          {step > 0 ? <button type="button" className={styles.backButton} onClick={goBack}><ArrowIcon back/>{ui.back}</button> : <span/>}
          {step < 3 ? <button type="button" className={styles.nextButton} onClick={goNext} aria-disabled={!canContinue}>{ui.next}<ArrowIcon/></button> : <button type="button" className={styles.nextButton} onClick={restart}>{ui.restart}<ArrowIcon/></button>}
        </footer>
      </section>
    </div>
    <footer className={styles.disclaimer}><span>i</span><p>{ui.disclaimer}</p><a href="https://doi.org/10.1007/s00330-020-07572-4" target="_blank" rel="noreferrer">{ui.source} ↗</a></footer>
  </main>
}
