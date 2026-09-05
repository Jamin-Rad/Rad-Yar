'use client'

import { useMemo, useState } from 'react'
import styles from './adc.module.css'

const INITIAL = {
  quality: '', lesionType: '', t2: '', restricted: '', adc: '', note: '',
  curve: '', morphology: '', cystic: '', ductal: '', t1Ducts: '', rim: '',
}

const COPY = {
  de: {
    title: 'DWI / ADC Ergänzende Beurteilung',
    kicker: 'Komplementär · verändert Kaiser nicht',
    intro: 'ADC ist kein Bestandteil des ursprünglichen Kaiser Scores. Diese separate Einordnung ergänzt Morphologie und Kinetik, ohne den Zahlenwert zu verändern. Es wird kein universeller ADC-Grenzwert verwendet.',
    quality: 'Technische Qualität', qualityHint: 'Ist die MRT diagnostisch verwertbar?',
    lesionType: 'Läsionstyp', mass: 'Masse / fokale Anreicherung', nme: 'Non-mass Enhancement (NME)',
    t2: 'T2-Phänotyp', t2Question: 'Fibroadenom-ähnliches T2-Korrelat?',
    restricted: 'Diffusionsrestriktion', adc: 'ADC-Wert', adcHelp: 'Dezimalwert, z. B. 1,24', note: 'Optionale DWI/ADC-Notiz', notePlaceholder: 'Sequenzqualität, ROI-Lage oder weitere Beobachtungen …',
    context: 'Kontextmerkmale', curve: 'Kurve', morphology: 'Morphologie', cystic: 'Zystisches Korrelat', ductal: 'Duktale / verzweigte Verteilung', t1Ducts: 'T1-hyperintense Gänge', rim: 'Peripheres / Rim Enhancement',
    yes: 'Ja', no: 'Nein', unclear: 'Unklar', t2Yes: 'Fibroadenomähnlich', t2No: 'Nicht fibroadenomähnlich', washout: 'Wash-out', plateau: 'Plateau', persistent: 'Persistierend', regular: 'Regelmäßig', irregular: 'Irregulär', present: 'Vorhanden', absent: 'Nicht vorhanden',
    assessment: 'ADC-Einordnung', benign: 'Unterstützt Benignität', indeterminate: 'Unbestimmt', malignant: 'Unterstützt Malignitätsverdacht', incomplete: 'Angaben ergänzen', unreliable: 'Technisch nicht belastbar',
    summaries: {
      incomplete: 'Läsionstyp, diagnostische Bildqualität, Diffusionsrestriktion und ADC-Wert angeben. Bei einer Masse ist zusätzlich der T2-Phänotyp erforderlich.',
      unreliable: 'Bei nicht diagnostischer oder unklarer Bildqualität ist eine algorithmische ADC-Einordnung nicht zuverlässig.',
      benign: 'Die ADC-Befunde unterstützen Benignität. Die Aussage bleibt komplementär und muss mit Morphologie und Kinetik plausibilisiert werden.',
      indeterminate: 'Die ADC-Befunde sind unbestimmt und müssen gemeinsam mit Morphologie, Kinetik und multimodaler Korrelation beurteilt werden.',
      malignant: 'Die ADC-Befunde unterstützen den Malignitätsverdacht. Ein niedriger ADC-Wert allein beweist jedoch kein Karzinom.',
    },
    rows: { lesion: 'Läsionstyp', phenotype: 'T2-Phänotyp', diffusion: 'Diffusionsrestriktion', value: 'ADC-Wert', threshold: 'Phänotypbezogene Orientierung', kaiser: 'Kaiser Score' },
    unchanged: 'unverändert', notApplicable: 'Nicht anwendbar', noUniversal: 'Kein universeller Grenzwert', approximately: 'ca.',
    disclaimer: 'ADC ist ein ergänzendes Kriterium und kein Bestandteil des ursprünglichen Kaiser Scores. Die endgültige BI-RADS-Kategorisierung erfordert eine integrierte radiologische Beurteilung.',
    notesTitle: 'Wichtige Interpretationshinweise', notesIntro: 'Kurzreferenz für Plausibilitätsprüfung und Fallstricke',
    notes: [
      ['Technische Validität zuerst', 'Vor jeder Interpretation die diagnostische Bildqualität prüfen. Bei eingeschränkter Qualität wird jede algorithmische Unterstützung weniger zuverlässig.'],
      ['Massen: zuerst den T2-Phänotyp prüfen', 'Ohne fibroadenomähnliches T2-Korrelat gilt eine Masse grundsätzlich als suspekt, bis das Gegenteil belegt ist. Bei passendem T2-Korrelat lautet die wichtige Differenzialdiagnose Fibroadenom versus aggressives Karzinom.'],
      ['Physiologie ist entscheidend', 'Beim fibroadenomähnlichen Phänotyp sprechen Wash-out und niedriger ADC für Malignität; persistierende Kinetik und höherer ADC unterstützen Benignität.'],
      ['Non-mass Enhancement', 'NME als strukturiert/proliferativ versus reaktiv/nicht strukturiert einordnen. Starke Vaskularisierung, ausgeprägte Heterogenität und niedriger ADC kennzeichnen häufig einen aggressiveren Phänotyp.'],
      ['Duktale Pathologie', 'Bei duktaler oder verzweigter NME an DCIS, Papillom und periduktale Mastitis denken. T1-hyperintense Gänge und peripheres/Rim Enhancement können für periduktale Mastitis sprechen.'],
      ['Mammographische Korrelation', 'Bei duktalen oder verzweigten Läsionen auf Verkalkungen achten. Polymorphe Morphologie begünstigt Malignität; bei vermuteten Kalzifikationen ist die mammographische Korrelation essenziell.'],
      ['Hilfreiche benigne Korrelate', 'NME mit zystischem Korrelat ist häufig benigne. Zystische oder regressive Veränderungen treten auch bei Fibroadenomen auf; residuale Laktationsveränderungen können Enhancement imitieren.'],
      ['ADC-Limitationen und Ausnahmen', 'Niedriger ADC bedeutet nicht automatisch Karzinom. Narbe, Fibrose sowie entzündliche oder komplex benigne Prozesse können ebenfalls niedrige Werte zeigen. Ausnahmen umfassen muzinöses Karzinom, DCIS, Papillom, Narbe/Fibrose und Abszess/Eiter.'],
      ['Karzinome können wenig aggressiv erscheinen', 'Nicht jedes Karzinom zeigt klassische aggressive Merkmale. Persistierendes Enhancement und ein breites Morphologiespektrum sind möglich; architektonische Distorsion kann bei luminalen Karzinomen typisch sein.'],
      ['Einzelkriterien reichen nicht', 'Ein einzelnes benignes Kriterium belegt keine Benignität. Ein einzelnes suspektes Kriterium kann bereits BI-RADS 4 rechtfertigen. Alter, Morphologie, Kinetik, ADC, Mammographie/Sonographie und Klinik integrieren.'],
      ['Praktische Faustregel', 'Solide anreichernde Massen sind meist besorgniserregender als inzidentelle NME. Inzidentelle NME mit Kaiser Score < 5 ist häufig benigne – nur als unterstützende, nicht absolute Regel verwenden.'],
    ],
    caution: 'Medizinischer Hinweis', cautionText: 'Dieses Tool dient nur der Entscheidungsunterstützung. DWI/ADC muss immer zusammen mit Morphologie, Enhancementkinetik, T2-Phänotyp und multimodaler Korrelation interpretiert werden. Niedriger ADC allein beweist keine Malignität; aus einem isolierten Merkmal darf keine Benignität abgeleitet werden.',
  },
  en: {
    title: 'DWI / ADC Complementary Assessment', kicker: 'Complementary · does not change Kaiser',
    intro: 'ADC is not part of the original Kaiser Score. This separate assessment complements morphology and kinetics without changing the numeric result. No universal ADC cutoff is applied.',
    quality: 'Technical quality', qualityHint: 'Is the MRI study diagnostically adequate?', lesionType: 'Lesion type', mass: 'Mass / focal enhancing lesion', nme: 'Non-mass enhancement (NME)',
    t2: 'T2 phenotype', t2Question: 'Fibroadenoma-like T2 correlate?', restricted: 'Restricted diffusion', adc: 'ADC value', adcHelp: 'Decimal value, e.g. 1.24', note: 'Optional DWI/ADC note', notePlaceholder: 'Sequence quality, ROI position, or additional observations …',
    context: 'Contextual descriptors', curve: 'Curve', morphology: 'Morphology', cystic: 'Cystic correlate', ductal: 'Ductal / branching distribution', t1Ducts: 'T1-hyperintense ducts', rim: 'Peripheral / rim enhancement',
    yes: 'Yes', no: 'No', unclear: 'Unclear', t2Yes: 'Fibroadenoma-like', t2No: 'Not fibroadenoma-like', washout: 'Wash-out', plateau: 'Plateau', persistent: 'Persistent', regular: 'Regular', irregular: 'Irregular', present: 'Present', absent: 'Absent',
    assessment: 'ADC interpretation', benign: 'Supports benignity', indeterminate: 'Indeterminate', malignant: 'Supports suspicion of malignancy', incomplete: 'Complete the inputs', unreliable: 'Technically unreliable',
    summaries: {
      incomplete: 'Enter lesion type, diagnostic image quality, restricted diffusion, and ADC value. A mass also requires the T2 phenotype.', unreliable: 'Algorithmic ADC interpretation is unreliable when image quality is non-diagnostic or unclear.', benign: 'ADC findings support benignity. This remains complementary and requires a plausibility check against morphology and kinetics.', indeterminate: 'ADC findings are indeterminate and should be interpreted together with morphology, kinetics, and multimodality correlation.', malignant: 'ADC findings support suspicion of malignancy. Low ADC alone, however, does not prove carcinoma.',
    },
    rows: { lesion: 'Lesion type', phenotype: 'T2 phenotype', diffusion: 'Restricted diffusion', value: 'ADC value', threshold: 'Phenotype-specific guide', kaiser: 'Kaiser Score' },
    unchanged: 'unchanged', notApplicable: 'Not applicable', noUniversal: 'No universal cutoff', approximately: 'approx.',
    disclaimer: 'ADC is a complementary criterion and is not part of the original Kaiser Score. Final BI-RADS categorization requires integrated radiologic interpretation.',
    notesTitle: 'Key Interpretive Notes', notesIntro: 'Compact reference for plausibility checks and pitfalls',
    notes: [
      ['Technical validity first', 'Confirm diagnostic image quality before interpretation. If quality is poor, all algorithmic support becomes less reliable.'],
      ['Mass lesions: check T2 phenotype first', 'A mass without a fibroadenoma-like T2 correlate is generally suspicious until proven otherwise. With that correlate, the key differential is fibroadenoma versus aggressive carcinoma.'],
      ['Physiologic criteria are crucial', 'In fibroadenoma-like lesions, washout and low ADC support malignancy; persistent kinetics and higher ADC support benignity.'],
      ['Non-mass enhancement', 'Consider NME as structured/proliferative versus reactive/non-structured. Strong vascularization, marked heterogeneity, and low ADC often accompany an aggressive phenotype.'],
      ['Ductal pathology', 'For ductal or branching NME consider DCIS, papilloma, and periductal mastitis. T1-hyperintense ducts and peripheral/rim enhancement can favor periductal mastitis.'],
      ['Correlate with mammography', 'Assess ductal or branching lesions for calcifications. Polymorph morphology favors malignancy; suspected calcifications require mammographic correlation.'],
      ['Helpful benign correlates', 'NME with a cystic correlate is usually benign. Cystic/regressive changes occur in fibroadenomas, and residual lactational change can mimic enhancement.'],
      ['ADC limitations and exceptions', 'Low ADC does not automatically mean carcinoma. Scar, fibrosis, inflammatory, and complex benign processes can also show low values. Exceptions include mucinous carcinoma, DCIS, papilloma, scar/fibrosis, and abscess/pus.'],
      ['Some carcinomas look less aggressive', 'Not every carcinoma has classic aggressive features. Persistent enhancement and a broad morphology spectrum occur; architectural distortion may be typical of some luminal carcinomas.'],
      ['Single criteria are not enough', 'A single benign criterion does not establish benignity. One suspicious criterion may already justify BI-RADS 4. Integrate age, morphology, kinetics, ADC, mammographic/sonographic correlation, and clinical context.'],
      ['Practical rule of thumb', 'Solid enhancing masses are generally more concerning than incidental NME. Incidental NME with Kaiser Score < 5 is often benign—use this only as supportive, not absolute, guidance.'],
    ],
    caution: 'Medical caution', cautionText: 'This tool provides decision support only. DWI/ADC findings must be interpreted with morphology, enhancement kinetics, T2 phenotype, and multimodality correlation. Low ADC alone does not prove malignancy, and benignity must not be concluded from a single isolated feature.',
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
  if (!values.quality || !values.lesionType || !values.restricted || !Number.isFinite(adc) || adc <= 0 || needsT2) return { state: 'incomplete', adc: Number.isFinite(adc) ? adc : null, threshold: null }
  if (values.quality !== 'yes') return { state: 'unreliable', adc, threshold: null }

  if (values.lesionType === 'mass' && values.t2 === 'yes') {
    const low = adc <= 1.0
    if (low || values.curve === 'washout') return { state: 'malignant', adc, threshold: 1.0 }
    if (values.curve && adc > 1.0) return { state: 'benign', adc, threshold: 1.0 }
    return { state: 'indeterminate', adc, threshold: 1.0 }
  }
  if (values.lesionType === 'mass' && values.t2 === 'no') {
    if (adc <= 1.2 || values.curve === 'washout') return { state: 'malignant', adc, threshold: 1.2 }
    if (values.morphology === 'regular' && values.curve !== 'washout') return { state: 'benign', adc, threshold: 1.2 }
    return { state: 'indeterminate', adc, threshold: 1.2 }
  }
  if (values.lesionType === 'mass') return { state: 'indeterminate', adc, threshold: null }

  if (adc > 1.5) return { state: 'benign', adc, threshold: 1.5 }
  const suspiciousContext = values.restricted === 'yes' && ['washout', 'irregular', 'present'].some(value => value === values.curve || value === values.morphology || value === values.rim || value === values.ductal)
  return { state: suspiciousContext ? 'malignant' : 'indeterminate', adc, threshold: 1.5 }
}

function Segmented({ name, value, options, onChange, ui }) {
  return <div className={styles.segmented} data-count={options.length}>
    {options.map(option => <button type="button" key={option} className={value === option ? styles.selected : ''} onClick={() => onChange(name, option)} aria-pressed={value === option}>{ui[option]}</button>)}
  </div>
}

function Field({ label, hint, children, wide = false }) {
  return <div className={`${styles.field} ${wide ? styles.wide : ''}`}><header><strong>{label}</strong>{hint ? <span>{hint}</span> : null}</header>{children}</div>
}

export default function AdcAssessment({ score, lang }) {
  const ui = COPY[lang] || COPY.de
  const [values, setValues] = useState(INITIAL)
  const result = useMemo(() => getResult(values), [values])
  const setValue = (name, value) => setValues(current => ({ ...current, [name]: current[name] === value ? '' : value, ...(name === 'lesionType' && value === 'nme' ? { t2: '' } : {}) }))
  const lesionLabel = values.lesionType ? ui[values.lesionType] : '—'
  const phenotypeLabel = values.lesionType === 'nme' ? ui.notApplicable : values.t2 ? (values.t2 === 'yes' ? ui.t2Yes : values.t2 === 'no' ? ui.t2No : ui.unclear) : '—'

  return <section className={styles.module} aria-labelledby="adc-title">
    <header className={styles.moduleHeader}>
      <div><h2 id="adc-title">{ui.title}</h2><p>{ui.intro}</p></div>
      <span>{ui.kicker}</span>
    </header>

    <div className={styles.assessmentGrid}>
      <form className={styles.form} onSubmit={event => event.preventDefault()}>
        <h3>{lang === 'en' ? 'Input parameters' : 'Eingabeparameter'}</h3>
        <div className={styles.fields}>
          <Field label={ui.quality} hint={ui.qualityHint} wide><Segmented name="quality" value={values.quality} options={OPTIONS.quality} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.lesionType} wide><Segmented name="lesionType" value={values.lesionType} options={OPTIONS.lesionType} onChange={setValue} ui={ui}/></Field>
          {values.lesionType === 'mass' ? <Field label={ui.t2} hint={ui.t2Question} wide><Segmented name="t2" value={values.t2} options={OPTIONS.t2} onChange={setValue} ui={ui}/></Field> : null}
          <Field label={ui.restricted}><Segmented name="restricted" value={values.restricted} options={OPTIONS.restricted} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.adc} hint={ui.adcHelp}>
            <label className={styles.adcInput}><input name="adc" inputMode="decimal" type="text" value={values.adc} onChange={event => setValue('adc', event.target.value)} placeholder="1.24" aria-label={ui.adc}/><span>×10⁻³ mm²/s</span></label>
          </Field>
        </div>

        <h3 className={styles.contextTitle}>{ui.context}<small>{lang === 'en' ? 'Optional · explanatory only' : 'Optional · nur erläuternd'}</small></h3>
        <div className={styles.contextFields}>
          <Field label={ui.curve}><Segmented name="curve" value={values.curve} options={OPTIONS.curve} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.morphology}><Segmented name="morphology" value={values.morphology} options={OPTIONS.morphology} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.cystic}><Segmented name="cystic" value={values.cystic} options={OPTIONS.cystic} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.ductal}><Segmented name="ductal" value={values.ductal} options={OPTIONS.ductal} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.t1Ducts}><Segmented name="t1Ducts" value={values.t1Ducts} options={OPTIONS.t1Ducts} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.rim}><Segmented name="rim" value={values.rim} options={OPTIONS.rim} onChange={setValue} ui={ui}/></Field>
          <Field label={ui.note} wide><textarea value={values.note} maxLength={500} onChange={event => setValue('note', event.target.value)} placeholder={ui.notePlaceholder}/></Field>
        </div>
      </form>

      <aside className={styles.output} data-state={result.state} aria-live="polite">
        <span className={styles.outputLabel}>{ui.assessment}</span>
        <div className={styles.outputTitle}><i>{result.state === 'benign' ? '✓' : result.state === 'malignant' ? '!' : 'i'}</i><h3>{ui[result.state]}</h3></div>
        <p>{ui.summaries[result.state]}</p>
        <dl>
          <div><dt>{ui.rows.kaiser}</dt><dd>{score} · {ui.unchanged}</dd></div>
          <div><dt>{ui.rows.lesion}</dt><dd>{lesionLabel}</dd></div>
          <div><dt>{ui.rows.phenotype}</dt><dd>{phenotypeLabel}</dd></div>
          <div><dt>{ui.rows.diffusion}</dt><dd>{values.restricted ? ui[values.restricted] : '—'}</dd></div>
          <div><dt>{ui.rows.value}</dt><dd>{result.adc ? `${result.adc.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US')} ×10⁻³ mm²/s` : '—'}</dd></div>
          <div><dt>{ui.rows.threshold}</dt><dd>{result.threshold ? `${ui.approximately} > ${result.threshold.toLocaleString(lang === 'de' ? 'de-DE' : 'en-US', { minimumFractionDigits: 1 })} ×10⁻³ mm²/s` : ui.noUniversal}</dd></div>
        </dl>
        {values.note ? <blockquote>{values.note}</blockquote> : null}
        <small>{ui.disclaimer}</small>
      </aside>
    </div>

    <div className={styles.notesSection}>
      <header><div><h3>{ui.notesTitle}</h3><p>{ui.notesIntro}</p></div><span>11</span></header>
      <div className={styles.notesList}>{ui.notes.map(([title, body], index) => <details key={title}><summary><i>{String(index + 1).padStart(2, '0')}</i><span>{title}</span><b>+</b></summary><p>{body}</p></details>)}</div>
    </div>

    <aside className={styles.caution}><i>!</i><div><strong>{ui.caution}</strong><p>{ui.cautionText}</p></div></aside>
  </section>
}
