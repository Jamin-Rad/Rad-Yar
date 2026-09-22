'use client'

import { useState } from 'react'
import styles from './adc.module.css'

const COPY = {
  de: {
    eyebrow: 'Optionale DWI-Ergänzung',
    title: 'ADC-Wert ergänzen',
    intro: 'Für Läsionen, die unabhängig vom Kaiser Score als BI-RADS 4 eingestuft wurden, untersuchten Clauser et al. einen einheitlichen ADC-Grenzwert von 1,5 × 10⁻³ mm²/s. Der Messwert ändert den Kaiser Score nicht.',
    quality: 'DWI/ADC diagnostisch verwertbar?',
    independent: 'Wurde die Läsion vor der ADC-Betrachtung unabhängig als BI-RADS 4 eingestuft?',
    yes: 'Ja', no: 'Nein / unklar',
    adc: 'Gemessener ADC-Wert', adcHelp: '× 10⁻³ mm²/s; gültige Messung mit der ADC-Karte abgleichen',
    show: 'Ergänzung anzeigen', back: 'Zurück zum Score',
    caution: 'Ein ADC-Wert allein stellt keine Diagnose und entscheidet nicht automatisch über eine Biopsie. Bei Non-mass Enhancement und abweichendem klinischem oder zeitlichem Verlauf besonders vorsichtig interpretieren.',
    source: 'Clauser et al., Clin Cancer Res 2021;27:1941–1948 · DOI 10.1158/1078-0432.CCR-20-3037',
  },
  en: {
    eyebrow: 'Optional DWI supplement',
    title: 'Add an ADC value',
    intro: 'For lesions independently assigned BI-RADS 4 before considering ADC, Clauser et al. investigated a single cutoff of 1.5 × 10⁻³ mm²/s. The measured value does not change the Kaiser Score.',
    quality: 'Are DWI and ADC diagnostically adequate?',
    independent: 'Was the lesion independently assigned BI-RADS 4 before ADC review?',
    yes: 'Yes', no: 'No / unclear',
    adc: 'Measured ADC value', adcHelp: '× 10⁻³ mm²/s; cross-check the measurement on the ADC map',
    show: 'Show supplement', back: 'Back to score',
    caution: 'ADC alone is not a diagnosis and does not automatically determine biopsy. Interpret non-mass enhancement and discordant clinical or temporal findings with particular care.',
    source: 'Clauser et al., Clin Cancer Res 2021;27:1941–1948 · DOI 10.1158/1078-0432.CCR-20-3037',
  },
}

export function Birads4AdcGate({ lang, onComplete, onBack }) {
  const ui = COPY[lang] || COPY.de
  const [quality, setQuality] = useState(null)
  const [independent, setIndependent] = useState(null)
  const [adc, setAdc] = useState('')
  const parsed = Number(String(adc).trim().replace(',', '.'))
  const valid = quality === true && independent === true && adc.trim() !== '' && Number.isFinite(parsed) && parsed > 0 && parsed <= 5

  const submit = event => {
    event.preventDefault()
    if (valid) onComplete({ adc: parsed, threshold: 1.5, aboveThreshold: parsed >= 1.5 })
  }

  return <section className={styles.gate} aria-labelledby="adc-gate-title">
    <header className={styles.gateHeader}>
      <span><i>A</i>{ui.eyebrow}</span>
      <h1 id="adc-gate-title">{ui.title}</h1>
      <p>{ui.intro}</p>
    </header>
    <form className={styles.gateForm} onSubmit={submit}>
      {[[ui.quality, quality, setQuality], [ui.independent, independent, setIndependent]].map(([label, value, change], index) =>
        <fieldset className={styles.gateStep} key={label}>
          <legend><i>{index + 1}</i>{label}</legend>
          <div className={styles.gateSegmented}>
            <button type="button" aria-pressed={value === true} onClick={() => change(true)}>{ui.yes}</button>
            <button type="button" aria-pressed={value === false} onClick={() => change(false)}>{ui.no}</button>
          </div>
        </fieldset>
      )}
      <fieldset className={styles.gateStep}>
        <legend><i>3</i>{ui.adc}</legend>
        <div className={styles.gateValueRow}>
          <label><span>{ui.adcHelp}</span><div><input type="text" inputMode="decimal" value={adc} onChange={event => setAdc(event.target.value)} placeholder={lang === 'en' ? '1.50' : '1,50'} aria-label={ui.adc}/><b>× 10⁻³ mm²/s</b></div></label>
        </div>
      </fieldset>
      <p className={styles.gateCaution}><i>!</i>{ui.caution}</p>
      <a href="https://pubmed.ncbi.nlm.nih.gov/33446565/" target="_blank" rel="noreferrer">{ui.source} ↗</a>
      <div className={styles.gateActions}>
        <button type="button" onClick={onBack} className={styles.gateBack}>← {ui.back}</button>
        <button type="submit" disabled={!valid} className={styles.gateSubmit}>{ui.show}<span>→</span></button>
      </div>
    </form>
  </section>
}
