'use client'

import { useMemo, useState } from 'react'
import styles from './adc.module.css'

const INITIAL = {
  quality: '', lesionType: '', t2: '', restricted: '', adc: '', note: '',
  curve: '', morphology: '', cystic: '', ductal: '', t1Ducts: '', rim: '',
}

const COPY = {
  de: {
    title: 'DWI / ADC – ergänzende Einordnung', unchangedTop: 'ändert den Kaiser Score nicht',
    intro: 'Kurze Plausibilitätsprüfung nach der Kaiser-Berechnung. Die Einordnung ist komplementär und verwendet keinen universellen ADC-Grenzwert.',
    steps: [['Läsion', 'Typ & T2-Phänotyp'], ['Diffusion', 'DWI & ADC'], ['Kontext', 'gezielt ergänzen']],
    quality: 'Bildqualität', qualityHint: 'DWI und ADC diagnostisch verwertbar?',
    lesionHeading: 'Läsion einordnen', lesionType: 'Läsionstyp', mass: 'Masse / fokaler Herd', nme: 'Non-mass Enhancement (NME)',
    t2: 'T2-Phänotyp', t2Question: 'Fibroadenomähnliches T2-Korrelat?',
    diffusionHeading: 'Diffusion beurteilen', restricted: 'Diffusionsrestriktion', adc: 'ADC-Wert', adcHelp: 'Dezimalwert, z. B. 1,24',
    context: 'Kontext gezielt ergänzen', contextHint: 'Optional – nur relevante Merkmale',
    curve: 'Kurve', morphology: 'Morphologie', cystic: 'Zystisches Korrelat', ductal: 'Duktale / verzweigte Verteilung', t1Ducts: 'T1-hyperintense Gänge', rim: 'Peripheres / Rim Enhancement',
    note: 'Kurze DWI/ADC-Notiz', notePlaceholder: 'Sequenzqualität, ROI-Lage oder weitere Beobachtungen …',
    yes: 'Ja', no: 'Nein', unclear: 'Unklar', t2Yes: 'Fibroadenomähnlich', t2No: 'Nicht fibroadenomähnlich', washout: 'Wash-out', plateau: 'Plateau', persistent: 'Persistierend', regular: 'Regelmäßig', irregular: 'Irregulär', present: 'Vorhanden', absent: 'Nicht vorhanden',
    live: 'Live-Einordnung', complementary: 'komplementär', next: 'Als Nächstes',
    assessment: { benign: 'Unterstützt Benignität', indeterminate: 'Unbestimmt', malignant: 'Unterstützt Malignitätsverdacht', incomplete: 'Kernangaben ergänzen', unreliable: 'Technisch nicht belastbar' },
    summaries: {
      incomplete: 'Die Einordnung erscheint automatisch, sobald die Kernangaben vollständig sind.',
      unreliable: 'DWI/ADC ist bei nicht diagnostischer oder unklarer Bildqualität nicht zuverlässig einzuordnen.',
      benign: 'Die Diffusionsbefunde stützen eine benigne Einordnung – immer mit Morphologie und Kinetik plausibilisieren.',
      indeterminate: 'Die Diffusionsbefunde sind nicht eindeutig und müssen integriert beurteilt werden.',
      malignant: 'Die Diffusionsbefunde stützen den Malignitätsverdacht. Ein niedriger ADC allein beweist kein Karzinom.',
    },
    missing: { quality: 'Bildqualität beurteilen', lesionType: 'Läsionstyp auswählen', t2: 'T2-Phänotyp angeben', restricted: 'Diffusionsrestriktion angeben', adc: 'ADC-Wert eingeben' },
    evidence: 'Evidenz auf einen Blick', phenotype: 'T2-Phänotyp', value: 'ADC-Wert', orientation: 'Phänotypbezogene Orientierung', kaiser: 'Kaiser Score', unchanged: 'unverändert', notApplicable: 'Nicht anwendbar', noUniversal: 'nach Phänotyp', approximately: 'ca.',
    low: 'niedrig', high: 'oberhalb der Orientierung', restrictionYes: 'nachgewiesen', restrictionNo: 'nicht nachgewiesen', restrictionUnclear: 'unklar',
    ruler: 'ADC-Orientierung', rulerLow: 'niedriger ADC', rulerHigh: 'höherer ADC', current: 'Messwert',
    important: 'Was jetzt wichtig ist', importantHint: 'auf diesen Läsionstyp fokussiert', allNotes: 'Weitere Fallstricke und Hinweise',
    topics: {
      technical: ['Technische Validität zuerst', 'ROI vollständig in der Läsion platzieren, Nekrose und Partialvolumen vermeiden. DWI-Signal immer mit der ADC-Karte abgleichen.'],
      massT2: ['T2-Phänotyp richtig einordnen', 'Bei einer Masse ist das fibroadenomähnliche T2-Korrelat der erste Filter. Ohne dieses Korrelat bleibt die Läsion grundsätzlich suspekt.'],
      physiology: ['Physiologie entscheidet mit', 'Fibroadenomähnlich plus persistierende Kinetik und höherer ADC stützt Benignität; Wash-out oder niedriger ADC stützt Malignitätsverdacht.'],
      nme: ['NME strukturiert beurteilen', 'Bei NME proliferative/strukturierte Muster von reaktiven Veränderungen trennen; ein klar hoher ADC kann Benignität deutlich stützen.'],
      ductal: ['Duktale Verteilung korrelieren', 'Bei duktaler oder verzweigter NME an DCIS, Papillom und periduktale Mastitis denken und bei Verkalkungsverdacht mammographisch korrelieren.'],
      limits: ['ADC-Ausnahmen im Blick behalten', 'Narbe, Fibrose, Entzündung und Abszess können niedrige ADC-Werte zeigen; muzinöses Karzinom oder DCIS können vom erwarteten Muster abweichen.'],
      integration: ['Einzelkriterien reichen nicht', 'Alter, Morphologie, Kinetik, ADC, Sonographie/Mammographie und Klinik gemeinsam bewerten. Ein einzelnes benignes Merkmal beweist keine Benignität.'],
    },
    caution: 'Komplementäres Tool – ersetzt nicht die integrierte radiologische Gesamtbeurteilung. Die finale BI-RADS-Kategorie bleibt eine medizinische Entscheidung.',
  },
  en: {
    title: 'DWI / ADC – complementary interpretation', unchangedTop: 'does not change the Kaiser Score',
    intro: 'A focused plausibility check after Kaiser calculation. This interpretation is complementary and uses no universal ADC cutoff.',
    steps: [['Lesion', 'type & T2 phenotype'], ['Diffusion', 'DWI & ADC'], ['Context', 'add selectively']],
    quality: 'Image quality', qualityHint: 'Are DWI and ADC diagnostically adequate?', lesionHeading: 'Classify the lesion', lesionType: 'Lesion type', mass: 'Mass / focal lesion', nme: 'Non-mass enhancement (NME)', t2: 'T2 phenotype', t2Question: 'Fibroadenoma-like T2 correlate?', diffusionHeading: 'Assess diffusion', restricted: 'Restricted diffusion', adc: 'ADC value', adcHelp: 'Decimal value, e.g. 1.24',
    context: 'Add targeted context', contextHint: 'Optional – relevant features only', curve: 'Curve', morphology: 'Morphology', cystic: 'Cystic correlate', ductal: 'Ductal / branching distribution', t1Ducts: 'T1-hyperintense ducts', rim: 'Peripheral / rim enhancement', note: 'Short DWI/ADC note', notePlaceholder: 'Sequence quality, ROI position, or other observations …',
    yes: 'Yes', no: 'No', unclear: 'Unclear', t2Yes: 'Fibroadenoma-like', t2No: 'Not fibroadenoma-like', washout: 'Wash-out', plateau: 'Plateau', persistent: 'Persistent', regular: 'Regular', irregular: 'Irregular', present: 'Present', absent: 'Absent',
    live: 'Live interpretation', complementary: 'complementary', next: 'Next', assessment: { benign: 'Supports benignity', indeterminate: 'Indeterminate', malignant: 'Supports suspicion of malignancy', incomplete: 'Complete core inputs', unreliable: 'Technically unreliable' },
    summaries: { incomplete: 'The interpretation appears automatically when the core inputs are complete.', unreliable: 'DWI/ADC cannot be interpreted reliably when image quality is non-diagnostic or unclear.', benign: 'Diffusion findings support benignity—always check plausibility against morphology and kinetics.', indeterminate: 'Diffusion findings are not definitive and require integrated assessment.', malignant: 'Diffusion findings support suspicion of malignancy. Low ADC alone does not prove carcinoma.' },
    missing: { quality: 'Assess image quality', lesionType: 'Select lesion type', t2: 'Enter T2 phenotype', restricted: 'Enter diffusion restriction', adc: 'Enter ADC value' },
    evidence: 'Evidence at a glance', phenotype: 'T2 phenotype', value: 'ADC value', orientation: 'Phenotype-specific guide', kaiser: 'Kaiser Score', unchanged: 'unchanged', notApplicable: 'Not applicable', noUniversal: 'by phenotype', approximately: 'approx.', low: 'low', high: 'above guide', restrictionYes: 'present', restrictionNo: 'absent', restrictionUnclear: 'unclear', ruler: 'ADC guide', rulerLow: 'lower ADC', rulerHigh: 'higher ADC', current: 'Measured',
    important: 'What matters now', importantHint: 'focused on this lesion type', allNotes: 'More pitfalls and guidance',
    topics: { technical: ['Technical validity first', 'Place the ROI fully within the lesion, avoid necrosis and partial volume, and always correlate DWI signal with the ADC map.'], massT2: ['Classify the T2 phenotype correctly', 'For a mass, a fibroadenoma-like T2 correlate is the first filter. Without it, the lesion generally remains suspicious.'], physiology: ['Physiology adds context', 'Fibroadenoma-like plus persistent kinetics and higher ADC supports benignity; wash-out or lower ADC supports malignancy suspicion.'], nme: ['Assess NME structurally', 'For NME, distinguish proliferative/structured patterns from reactive change; clearly high ADC can strongly support benignity.'], ductal: ['Correlate ductal distribution', 'For ductal or branching NME consider DCIS, papilloma and periductal mastitis, with mammographic correlation when calcification is suspected.'], limits: ['Keep ADC exceptions in mind', 'Scar, fibrosis, inflammation and abscess can show low ADC; mucinous carcinoma or DCIS may deviate from expected patterns.'], integration: ['Single criteria are not enough', 'Integrate age, morphology, kinetics, ADC, ultrasound/mammography and clinical context. One benign feature does not prove benignity.'] },
    caution: 'Complementary tool – does not replace integrated radiological assessment. The final BI-RADS category remains a medical decision.',
  },
}

const OPTIONS = {
  quality: ['yes', 'no', 'unclear'], lesionType: ['mass', 'nme'], t2: ['yes', 'no', 'unclear'],
  restricted: ['yes', 'no', 'unclear'], curve: ['washout', 'plateau', 'persistent'], morphology: ['regular', 'irregular'],
  cystic: ['present', 'absent'], ductal: ['present', 'absent'], t1Ducts: ['present', 'absent'], rim: ['present', 'absent'],
}

function getResult(values) {
  const adc = Number.parseFloat(String(values.adc).replace(',', '.'))
  const needsT2 = values.lesionType === 'mass' && !values.t2
  if (!values.quality || !values.lesionType || !values.restricted || !Number.isFinite(adc) || adc <= 0 || needsT2) return { state: 'incomplete', adc: Number.isFinite(adc) && adc > 0 ? adc : null, threshold: null }
  if (values.quality !== 'yes') return { state: 'unreliable', adc, threshold: null }
  if (values.lesionType === 'mass' && values.t2 === 'yes') {
    if (adc <= 1 || values.curve === 'washout') return { state: 'malignant', adc, threshold: 1 }
    if (values.curve && adc > 1) return { state: 'benign', adc, threshold: 1 }
    return { state: 'indeterminate', adc, threshold: 1 }
  }
  if (values.lesionType === 'mass' && values.t2 === 'no') {
    if (adc <= 1.2 || values.curve === 'washout') return { state: 'malignant', adc, threshold: 1.2 }
    if (values.morphology === 'regular' && values.curve !== 'washout') return { state: 'benign', adc, threshold: 1.2 }
    return { state: 'indeterminate', adc, threshold: 1.2 }
  }
  if (values.lesionType === 'mass') return { state: 'indeterminate', adc, threshold: null }
  if (adc > 1.5) return { state: 'benign', adc, threshold: 1.5 }
  const suspicious = values.restricted === 'yes' && ['washout', 'irregular', 'present'].some(value => value === values.curve || value === values.morphology || value === values.rim || value === values.ductal)
  return { state: suspicious ? 'malignant' : 'indeterminate', adc, threshold: 1.5 }
}

function Segmented({ name, value, options, onChange, ui }) {
  return <div className={styles.segmented} data-count={options.length}>
    {options.map(option => {
      const label = name === 't2' ? (option === 'yes' ? ui.t2Yes : option === 'no' ? ui.t2No : ui.unclear) : ui[option]
      return <button type="button" key={option} className={value === option ? styles.selected : ''} onClick={() => onChange(name, option)} aria-pressed={value === option}>{label}</button>
    })}
  </div>
}

function Field({ label, hint, children, wide = false }) {
  return <div className={`${styles.field} ${wide ? styles.wide : ''}`}><header><strong>{label}</strong>{hint ? <span>{hint}</span> : null}</header>{children}</div>
}

function StepRail({ ui, activeStep }) {
  return <ol className={styles.stepRail}>
    {ui.steps.map(([title, text], index) => <li key={title} data-status={index + 1 < activeStep ? 'done' : index + 1 === activeStep ? 'active' : 'upcoming'}>
      <i>{index + 1 < activeStep ? '✓' : index + 1}</i><span><strong>{title}</strong><small>{text}</small></span>
    </li>)}
  </ol>
}

function AdcRuler({ result, ui, lang }) {
  const marker = result.adc ? Math.max(2, Math.min(98, (result.adc / 2.2) * 100)) : null
  const threshold = result.threshold ? Math.min(98, (result.threshold / 2.2) * 100) : null
  return <div className={styles.ruler}>
    <header><strong>{ui.ruler}</strong><span>×10⁻³ mm²/s</span></header>
    <div className={styles.rulerLabels}><span>0</span><span>0,5</span><span>1,0</span><span>1,5</span><span>2,0+</span></div>
    <div className={styles.rulerTrack}>
      {threshold ? <i className={styles.threshold} style={{ left: `${threshold}%` }}><span>{ui.approximately} {result.threshold.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US', { minimumFractionDigits: 1 })}</span></i> : null}
      {marker ? <b className={styles.marker} style={{ left: `${marker}%` }}><span>{result.adc.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')}</span></b> : null}
    </div>
    <footer><span>{ui.rulerLow}</span><span>{ui.rulerHigh}</span></footer>
  </div>
}

export default function AdcAssessment({ score, lang }) {
  const ui = COPY[lang] || COPY.de
  const [values, setValues] = useState(INITIAL)
  const [showAll, setShowAll] = useState(false)
  const result = useMemo(() => getResult(values), [values])
  const setValue = (name, value) => setValues(current => ({ ...current, [name]: current[name] === value ? '' : value, ...(name === 'lesionType' ? { t2: '', ductal: '', t1Ducts: '', rim: '' } : {}) }))
  const adcValid = Number.isFinite(Number.parseFloat(String(values.adc).replace(',', '.'))) && Number.parseFloat(String(values.adc).replace(',', '.')) > 0
  const missingKey = !values.quality ? 'quality' : !values.lesionType ? 'lesionType' : values.lesionType === 'mass' && !values.t2 ? 't2' : !values.restricted ? 'restricted' : !adcValid ? 'adc' : null
  const coreComplete = !missingKey
  const activeStep = !values.lesionType || (values.lesionType === 'mass' && !values.t2) ? 1 : !values.restricted || !adcValid ? 2 : 3
  const phenotype = values.lesionType === 'nme' ? ui.notApplicable : values.t2 === 'yes' ? ui.t2Yes : values.t2 === 'no' ? ui.t2No : values.t2 === 'unclear' ? ui.unclear : '—'
  const restriction = values.restricted ? ui[`restriction${values.restricted[0].toUpperCase()}${values.restricted.slice(1)}`] : '—'
  const primaryTopics = values.lesionType === 'nme' ? ['nme', 'ductal', 'limits'] : ['massT2', 'physiology', 'limits']
  const extraTopics = ['technical', 'integration']

  return <section className={styles.module} aria-labelledby="adc-title">
    <header className={styles.moduleHeader}>
      <div><h2 id="adc-title">{ui.title}</h2><p>{ui.intro}</p></div>
      <span><i>↔</i>{ui.unchangedTop}</span>
    </header>

    <StepRail ui={ui} activeStep={activeStep}/>

    <div className={styles.assessmentGrid}>
      <form className={styles.workflow} onSubmit={event => event.preventDefault()}>
        <div className={styles.qualityRow}>
          <div><strong>{ui.quality}</strong><span>{ui.qualityHint}</span></div>
          <Segmented name="quality" value={values.quality} options={OPTIONS.quality} onChange={setValue} ui={ui}/>
        </div>

        <section className={styles.workflowSection} data-complete={Boolean(values.lesionType && (values.lesionType !== 'mass' || values.t2))}>
          <header><i>01</i><h3>{ui.lesionHeading}</h3></header>
          <div className={styles.fields}>
            <Field label={ui.lesionType} wide><Segmented name="lesionType" value={values.lesionType} options={OPTIONS.lesionType} onChange={setValue} ui={ui}/></Field>
            {values.lesionType === 'mass' ? <Field label={ui.t2} hint={ui.t2Question} wide><Segmented name="t2" value={values.t2} options={OPTIONS.t2} onChange={setValue} ui={ui}/></Field> : null}
          </div>
        </section>

        <section className={styles.workflowSection} data-muted={!values.lesionType} data-complete={Boolean(values.restricted && adcValid)}>
          <header><i>02</i><h3>{ui.diffusionHeading}</h3></header>
          <div className={styles.fields}>
            <Field label={ui.restricted}><Segmented name="restricted" value={values.restricted} options={OPTIONS.restricted} onChange={setValue} ui={ui}/></Field>
            <Field label={ui.adc} hint={ui.adcHelp}>
              <label className={styles.adcInput}><input name="adc" inputMode="decimal" type="text" value={values.adc} onChange={event => setValue('adc', event.target.value)} placeholder="1.24" aria-label={ui.adc}/><span>×10⁻³ mm²/s</span></label>
            </Field>
          </div>
        </section>

        <details className={styles.contextPanel} open={coreComplete ? undefined : false}>
          <summary><i>03</i><span><strong>{ui.context}</strong><small>{ui.contextHint}</small></span><b>＋</b></summary>
          <div className={styles.contextFields}>
            <Field label={ui.curve}><Segmented name="curve" value={values.curve} options={OPTIONS.curve} onChange={setValue} ui={ui}/></Field>
            <Field label={ui.morphology}><Segmented name="morphology" value={values.morphology} options={OPTIONS.morphology} onChange={setValue} ui={ui}/></Field>
            <Field label={ui.cystic}><Segmented name="cystic" value={values.cystic} options={OPTIONS.cystic} onChange={setValue} ui={ui}/></Field>
            {values.lesionType === 'nme' ? <>
              <Field label={ui.ductal}><Segmented name="ductal" value={values.ductal} options={OPTIONS.ductal} onChange={setValue} ui={ui}/></Field>
              <Field label={ui.t1Ducts}><Segmented name="t1Ducts" value={values.t1Ducts} options={OPTIONS.t1Ducts} onChange={setValue} ui={ui}/></Field>
              <Field label={ui.rim}><Segmented name="rim" value={values.rim} options={OPTIONS.rim} onChange={setValue} ui={ui}/></Field>
            </> : null}
            <Field label={ui.note} wide><textarea value={values.note} maxLength={500} onChange={event => setValue('note', event.target.value)} placeholder={ui.notePlaceholder}/></Field>
          </div>
        </details>
      </form>

      <aside className={styles.output} data-state={result.state} aria-live="polite">
        <header className={styles.outputHeader}><span>{ui.live}</span><small>{ui.complementary}</small></header>
        <div className={styles.outputTitle}><i>{result.state === 'benign' ? '✓' : result.state === 'malignant' ? '!' : result.state === 'incomplete' ? '→' : 'i'}</i><div><small>{result.state === 'incomplete' && missingKey ? `${ui.next}: ${ui.missing[missingKey]}` : ui.assessment[result.state]}</small><h3>{ui.assessment[result.state]}</h3></div></div>
        <p className={styles.summary}>{ui.summaries[result.state]}</p>
        <AdcRuler result={result} ui={ui} lang={lang}/>
        <div className={styles.evidence}>
          <h4>{ui.evidence}</h4>
          <dl>
            <div><dt>{ui.phenotype}</dt><dd>{phenotype}</dd></div>
            <div><dt>{ui.restricted}</dt><dd>{restriction}</dd></div>
            <div><dt>{ui.value}</dt><dd>{result.adc ? `${result.adc.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')} ×10⁻³` : '—'}</dd></div>
            <div><dt>{ui.orientation}</dt><dd>{result.threshold ? `> ${result.threshold.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US', { minimumFractionDigits: 1 })} ×10⁻³` : ui.noUniversal}</dd></div>
          </dl>
        </div>
        <div className={styles.kaiserLock}><span>{ui.kaiser}</span><strong>{score}</strong><i>{ui.unchanged} · ⌁</i></div>
      </aside>
    </div>

    <section className={styles.notesSection}>
      <header><div><h3>{ui.important}</h3><p>{ui.importantHint}</p></div></header>
      <div className={styles.notesList}>{primaryTopics.map((key, index) => <details key={key} open={index === 0}><summary><i>{index === 0 ? '∿' : index === 1 ? 'DWI' : '!'}</i><span>{ui.topics[key][0]}</span><b>⌄</b></summary><p>{ui.topics[key][1]}</p></details>)}</div>
      <button type="button" className={styles.moreButton} onClick={() => setShowAll(value => !value)} aria-expanded={showAll}>{ui.allNotes}<span>{showAll ? '−' : '+'}</span></button>
      {showAll ? <div className={styles.extraNotes}>{extraTopics.map(key => <article key={key}><strong>{ui.topics[key][0]}</strong><p>{ui.topics[key][1]}</p></article>)}</div> : null}
    </section>

    <aside className={styles.caution}><i>!</i><p>{ui.caution}</p></aside>
  </section>
}
