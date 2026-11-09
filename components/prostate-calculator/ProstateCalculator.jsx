'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { combinePirads } from '@/lib/prostatePirads.mjs'
import { RULES, DWI_CRITERIA, T2_CRITERIA } from '@/lib/prostatePiradsCopy'
import { parseMeasurement, prostateVolume, psaDensity } from '@/lib/prostatePsa.mjs'
import { COPY, LIKELIHOOD } from './copy'
import base from './calculator-shell.module.css'
import styles from './prostate.module.css'

const ACR = 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/PI-RADS'
const EAU = 'https://uroweb.org/guidelines/prostatecancer/chapter/diagnostic-evaluation'
const SCORE_COLORS = ['#24836b', '#42825b', '#a57718', '#cd633c', '#b54445']

function Options({ title, value, onChange, options, hint, scores = false }) {
  return <fieldset className={styles.group}>
    <legend>{title}</legend>
    {hint ? <p className={styles.hint}>{hint}</p> : null}
    <div className={scores ? styles.scoreChoices : styles.choices}>
      {options.map(option => <button key={String(option.value)} type="button" aria-pressed={value === option.value}
        onClick={() => onChange(option.value)} className={value === option.value ? styles.selected : ''}>
        {option.mark ? <span className={styles.choiceMark} dir="ltr">{option.mark}</span> : null}
        <span><strong>{option.label}</strong>{option.hint ? <small>{option.hint}</small> : null}</span>
        <i aria-hidden="true">{value === option.value ? '✓' : ''}</i>
      </button>)}
    </div>
  </fieldset>
}

function Measurement({ id, label, unit, value, onChange, allowZero = false, ui }) {
  const number = parseMeasurement(value)
  const invalid = value.trim() !== '' && (number === null || (!allowZero && number <= 0))
  return <label className={styles.field} htmlFor={id}>
    <span>{label}</span>
    <span className={`${styles.inputWrap} ${invalid ? styles.invalid : ''}`}>
      <input id={id} type="text" inputMode="decimal" autoComplete="off" dir="ltr" placeholder="—"
        value={value} onChange={event => onChange(event.target.value)} aria-invalid={invalid}
        aria-describedby={invalid ? `${id}-error` : undefined} />
      <span dir="ltr">{unit}</span>
    </span>
    {invalid ? <small id={`${id}-error`} className={styles.error}>{ui.invalid}</small> : null}
  </label>
}

function Result({ ui, label, value, unit, color = '#078996', children, empty }) {
  return <aside className={`${base.resultPanel} ${styles.result}`} style={{ '--result-color': value == null ? '#8c989e' : color }} aria-live="polite" aria-atomic="true">
    <span className={base.resultEyebrow}>{ui.result}</span>
    <div className={`${base.resultValue} ${styles.resultValue}`}>
      <small>{label}</small><strong dir="ltr" data-testid="primary-result">{value ?? '—'}</strong>{unit ? <small dir="ltr">{unit}</small> : null}
    </div>
    {value == null ? <p className={base.resultEmpty}>{empty}</p> : null}
    {children}
    <p className={styles.disclaimer}>{ui.disclaimer}</p>
  </aside>
}

function PsaCalculator({ ui, lang }) {
  const [mode, setMode] = useState('dimensions')
  const [unit, setUnit] = useState('mm')
  const [values, setValues] = useState({ length: '', width: '', height: '', volume: '', psa: '' })
  const set = (key, value) => setValues(previous => ({ ...previous, [key]: value }))
  const volume = mode === 'dimensions' ? prostateVolume({ ...values, unit }) : parseMeasurement(values.volume)
  const validVolume = volume !== null && volume > 0 ? volume : null
  const density = psaDensity(values.psa, validVolume)
  const format = (value, digits) => value == null ? null : new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
  function changeUnit(next) {
    if (unit === next) return
    setValues(previous => Object.fromEntries(Object.entries(previous).map(([key, value]) => {
      if (!['length', 'width', 'height'].includes(key) || parseMeasurement(value) === null) return [key, value]
      return [key, String(Number((parseMeasurement(value) * (next === 'cm' ? 0.1 : 10)).toFixed(8)))]
    })))
    setUnit(next)
  }
  const reset = () => { setValues({ length: '', width: '', height: '', volume: '', psa: '' }); setUnit('mm'); setMode('dimensions') }
  return <>
    <WorkspaceHeader title={ui.psaTitle} intro={ui.psaIntro} reset={reset} ui={ui} />
    <div className={base.calculatorBody}>
      <div className={`${base.controls} ${styles.controls}`}>
        <Options title={`01 · ${ui.method}`} value={mode} onChange={setMode} options={[
          { value: 'dimensions', label: ui.dimensions, mark: '×' }, { value: 'volume', label: ui.known, mark: 'ml' },
        ]} />
        {mode === 'dimensions' ? <>
          <div className={styles.measureHeader}><strong>{ui.volume}</strong><div className={styles.unitSwitch} aria-label={ui.unit} role="group">{['mm', 'cm'].map(item => <button key={item} type="button" aria-pressed={unit === item} onClick={() => changeUnit(item)}>{item}</button>)}</div></div>
          <div className={styles.measurements}>{['length', 'width', 'height'].map(key => <Measurement key={key} id={`psa-${key}`} label={ui[key]} unit={unit} value={values[key]} onChange={value => set(key, value)} ui={ui} />)}</div>
          <p className={styles.hint}>{ui.measureHint}</p>
          <div className={styles.formula}><span>{ui.formula}</span><strong dir="ltr">L × B × H × 0.523{unit === 'mm' ? ' ÷ 1000' : ''}</strong></div>
        </> : <Measurement id="psa-volume" label={ui.volume} unit="ml" value={values.volume} onChange={value => set('volume', value)} ui={ui} />}
        <div className={styles.psaInput}><h2>02 · {ui.psa}</h2><Measurement id="psa-total" label={ui.psa} unit="ng/ml" value={values.psa} onChange={value => set('psa', value)} allowZero ui={ui} /><p className={styles.hint}>{ui.psaHint}</p></div>
      </div>
      <Result ui={ui} label={ui.density} value={format(density, 3)} unit="ng/ml²" empty={ui.emptyPsa}>
        <dl className={styles.summary}>
          <div><dt>{ui.volume}</dt><dd dir="ltr" data-testid="volume-result">{format(validVolume, 1) ?? '—'} ml</dd></div>
          <div><dt>{ui.psa}</dt><dd dir="ltr">{format(parseMeasurement(values.psa), 2) ?? '—'} ng/ml</dd></div>
        </dl>
        <p className={styles.equation} dir="ltr">PSA ÷ V = PSA-D</p>
        <p className={styles.context}>{ui.context}</p>
      </Result>
    </div>
  </>
}

function PiradsCalculator({ ui, lang }) {
  const [quality, setQuality] = useState(null)
  const [zone, setZone] = useState(null)
  const [t2, setT2] = useState(null)
  const [dwi, setDwi] = useState(null)
  const [dce, setDce] = useState(null)
  const pick = value => value[lang] || value.de
  const ready = quality === true && zone && dwi && (zone !== 'TZ' || t2) && (zone !== 'PZ' || dwi !== 3 || dce)
  const result = ready ? combinePirads({ zone, t2, dwi, dce: dce || 'unavailable' }) : null
  const reset = () => { setQuality(null); setZone(null); setT2(null); setDwi(null); setDce(null) }
  const changeZone = value => { setZone(value); setT2(null); setDwi(null); setDce(null) }
  const scoreOptions = criteria => criteria.map((description, index) => ({ value: index + 1, mark: String(index + 1), label: pick(description) }))
  return <>
    <WorkspaceHeader title="PI-RADS v2.1" intro={ui.piradsIntro} reset={reset} ui={ui} />
    <div className={base.calculatorBody}>
      <div className={`${base.controls} ${styles.controls}`}>
        <Options title={`01 · ${ui.quality}`} hint={ui.qualityQuestion} value={quality} onChange={setQuality} options={[{ value: true, label: ui.yes }, { value: false, label: ui.no }]} />
        {quality === false ? <p className={styles.qualityStop} role="status">{ui.qualityStop}</p> : null}
        {quality === true ? <>
          <Options title={`02 · ${ui.zone}`} value={zone} onChange={changeZone} options={[
            { value: 'PZ', label: ui.pz, hint: ui.pzHint, mark: 'PZ' }, { value: 'TZ', label: ui.tz, hint: ui.tzHint, mark: 'TZ' },
          ]} />
          {zone === 'TZ' ? <Options title={`03 · ${ui.t2}`} hint={ui.scoreHint} value={t2} onChange={setT2} options={scoreOptions(T2_CRITERIA)} scores /> : null}
          {zone ? <Options title={`${zone === 'TZ' ? '04' : '03'} · ${ui.dwi}`} hint={ui.scoreHint} value={dwi} onChange={value => { setDwi(value); setDce(null) }} options={scoreOptions(DWI_CRITERIA)} scores /> : null}
          {zone === 'PZ' && dwi === 3 ? <Options title="04 · DCE" hint={ui.dceHint} value={dce} onChange={setDce} options={[
            { value: 'negative', label: ui.negative }, { value: 'positive', label: ui.positive }, { value: 'unavailable', label: ui.unavailable },
          ]} /> : null}
        </> : null}
      </div>
      <Result ui={ui} label="PI-RADS" value={result?.score} color={result ? SCORE_COLORS[result.score - 1] : undefined} empty={quality === false ? ui.qualityStop : ui.emptyPirads}>
        {result ? <>
          <div className={styles.likelihood}><small>{ui.probability}</small><strong>{pick(LIKELIHOOD[result.score - 1])}</strong></div>
          <div className={styles.scale} aria-hidden="true">{[1, 2, 3, 4, 5].map(score => <span key={score} style={{ '--score-color': SCORE_COLORS[score - 1] }} data-active={score === result.score}>{score}</span>)}</div>
          <div className={styles.reason}><strong>{ui.reasoning}</strong><p>{pick(RULES[result.rule])}</p></div>
        </> : null}
      </Result>
    </div>
  </>
}

function WorkspaceHeader({ title, intro, reset, ui }) {
  return <div className={base.workspaceHeader}><div><h1>{title}</h1><p>{intro}</p></div><button type="button" className={base.reset} onClick={reset} aria-label={ui.reset} title={ui.reset}><span aria-hidden="true">↺</span>{ui.reset}</button></div>
}

export default function ProstateCalculator({ tool }) {
  const { lang, setLang } = useLanguage()
  const ui = Object.fromEntries(Object.entries(COPY).map(([key, value]) => [key, value[lang] || value.de]))
  const suffix = lang === 'de' ? '' : `?lang=${lang}`
  return <main className={`${base.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={base.header}>
      <Link className={base.wordmark} href={`/?ref=rechner${lang === 'de' ? '' : `&lang=${lang}`}`}>{ui.brand}</Link>
      <div className={base.headerActions}><Link href="/" className={base.radyarLink}><strong>RadYar</strong><span aria-hidden="true">↗</span></Link><div className={base.languages} aria-label="Language">{['de', 'en', 'fa'].map(language => <button key={language} type="button" onClick={() => setLang(language)} aria-pressed={lang === language} className={lang === language ? base.languageActive : ''}>{language === 'fa' ? 'فا' : language.toUpperCase()}</button>)}</div></div>
    </header>
    <div className={`${base.stage} ${styles.stage}`}>
      <div className={`${base.workspace} ${styles.workspace}`}>
        <nav className={`${base.toolNav} ${styles.nav}`} aria-label={ui.brand}>
          <Link href={`/?ref=rechner${lang === 'de' ? '' : `&lang=${lang}`}`}><span aria-hidden="true">↗</span>{ui.back}</Link>
          <Link href={`/prostata-psa${suffix}`} className={tool === 'psa' ? base.navActive : ''} aria-current={tool === 'psa' ? 'page' : undefined}>{ui.psaTitle}</Link>
          <Link href={`/pi-rads${suffix}`} className={tool === 'pirads' ? base.navActive : ''} aria-current={tool === 'pirads' ? 'page' : undefined}>PI-RADS v2.1</Link>
        </nav>
        {tool === 'psa' ? <PsaCalculator ui={ui} lang={lang} /> : <PiradsCalculator ui={ui} lang={lang} />}
        <footer className={styles.footer}><div><strong>{ui.sources}</strong><a href={ACR} target="_blank" rel="noreferrer">ACR · PI-RADS v2.1 ↗</a>{tool === 'psa' ? <a href={EAU} target="_blank" rel="noreferrer">EAU · PSA-D ↗</a> : null}<Link href={`/becken-m/prostata/prostatakarzinom${suffix}`}>{ui.learn} ↗</Link></div><p>{ui.privacy}</p></footer>
      </div>
    </div>
  </main>
}
