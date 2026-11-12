'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { combinePirads } from '@/lib/prostatePirads.mjs'
import { RULES, DWI_CRITERIA, T2_CRITERIA } from '@/lib/prostatePiradsCopy'
import { parseMeasurement, prostateVolume, psaDensity } from '@/lib/prostatePsa.mjs'
import { COPY, LIKELIHOOD } from './copy'
import kaiser from '@/app/kaiser-score/page.module.css'
import styles from './prostate.module.css'

const ACR = 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Reporting-and-Data-Systems/PI-RADS'
const EAU = 'https://uroweb.org/guidelines/prostatecancer/chapter/diagnostic-evaluation'
const SCORE_COLORS = ['#24836b', '#42825b', '#a57718', '#cd633c', '#b54445']

function Options({ title, label, value, onChange, options, hint, scores = false }) {
  return <fieldset className={styles.group} aria-label={label}>
    {title ? <legend>{title}</legend> : null}
    {hint ? <p className={styles.hint}>{hint}</p> : null}
    <div className={scores ? styles.scoreChoices : kaiser.options} data-count={options.length} data-question={scores ? undefined : 'quality'}>
      {options.map(option => <button key={String(option.value)} type="button" aria-pressed={value === option.value}
        onClick={() => onChange(option.value)} className={value === option.value ? (scores ? styles.selected : kaiser.optionSelected) : ''}>
        <span className={styles.choiceMark} dir="ltr" aria-hidden="true">{option.mark || '·'}</span>
        <span className={kaiser.optionCopy}><strong>{option.label}</strong>{option.hint ? <small>{option.hint}</small> : null}</span>
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
  return <section className={styles.result} style={{ '--result-color': value == null ? 'var(--muted)' : color }} aria-live="polite" aria-atomic="true">
    <span className={styles.resultEyebrow}>{ui.result}</span>
    <div className={styles.resultValue}>
      <small>{label}</small><strong dir="ltr" data-testid="primary-result">{value ?? '—'}</strong>{unit ? <small dir="ltr">{unit}</small> : null}
    </div>
    {value == null ? <p className={styles.hint}>{empty}</p> : null}
    {children}
    <p className={styles.disclaimer}>{ui.disclaimer}</p>
  </section>
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
    <div className={styles.calculatorBody}>
      <div className={styles.controls}>
        <Options title={ui.method} value={mode} onChange={setMode} options={[
          { value: 'dimensions', label: ui.dimensions, mark: '×' }, { value: 'volume', label: ui.known, mark: 'ml' },
        ]} />
        {mode === 'dimensions' ? <>
          <div className={styles.measureHeader}><strong>{ui.volume}</strong><div className={styles.unitSwitch} aria-label={ui.unit} role="group">{['mm', 'cm'].map(item => <button key={item} type="button" aria-pressed={unit === item} onClick={() => changeUnit(item)}>{item}</button>)}</div></div>
          <div className={styles.measurements}>{['length', 'width', 'height'].map(key => <Measurement key={key} id={`psa-${key}`} label={ui[key]} unit={unit} value={values[key]} onChange={value => set(key, value)} ui={ui} />)}</div>
          <p className={styles.hint}>{ui.measureHint}</p>
          <div className={styles.formula}><span>{ui.formula}</span><strong dir="ltr">L × B × H × 0.523{unit === 'mm' ? ' ÷ 1000' : ''}</strong></div>
        </> : <Measurement id="psa-volume" label={ui.volume} unit="ml" value={values.volume} onChange={value => set('volume', value)} ui={ui} />}
        <div className={styles.psaInput}><Measurement id="psa-total" label={ui.psa} unit="ng/ml" value={values.psa} onChange={value => set('psa', value)} allowZero ui={ui} /><p className={styles.hint}>{ui.psaHint}</p></div>
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
  const [step, setStep] = useState(0)
  const stepHeading = useRef(null)
  const moved = useRef(false)
  const pick = value => value[lang] || value.de
  const scoreOptions = criteria => criteria.map((description, index) => ({
    value: index + 1, mark: String(index + 1), label: pick(description),
  }))

  const steps = [{
    title: ui.qualityQuestion, value: quality, onChange: setQuality, options: [
      { value: false, label: ui.no, mark: '×' },
      { value: true, label: ui.yes, mark: '✓' },
    ],
  }]
  if (quality === true) {
    steps.push({
      title: ui.zone, value: zone, onChange: value => {
        if (value === zone) return
        setZone(value)
        setT2(null)
        setDwi(null)
        setDce(null)
      },
      options: [
        { value: 'PZ', label: ui.pz, hint: ui.pzHint, mark: 'PZ' },
        { value: 'TZ', label: ui.tz, hint: ui.tzHint, mark: 'TZ' },
      ],
    })
    if (zone === 'TZ') {
      steps.push({ title: ui.t2, hint: ui.scoreHint, value: t2, onChange: setT2, options: scoreOptions(T2_CRITERIA), scores: true })
    }
    if (zone) {
      steps.push({
        title: ui.dwi, hint: ui.scoreHint, value: dwi, options: scoreOptions(DWI_CRITERIA), scores: true,
        onChange: value => {
          if (value !== dwi) setDce(null)
          setDwi(value)
        },
      })
    }
    if (zone === 'PZ' && dwi === 3) {
      steps.push({
        title: 'DCE', hint: ui.dceHint, value: dce, onChange: setDce,
        options: [
          { value: 'negative', label: ui.negative, mark: '−' },
          { value: 'positive', label: ui.positive, mark: '+' },
          { value: 'unavailable', label: ui.unavailable, mark: '—' },
        ],
      })
    }
  }

  const current = steps[step]
  const result = !current && quality === true
    ? combinePirads({ zone, t2, dwi, dce: dce || 'unavailable' })
    : null

  useEffect(() => {
    if (moved.current) stepHeading.current?.focus()
  }, [step])

  function navigate(next) {
    moved.current = true
    setStep(next)
  }

  function reset() {
    setQuality(null)
    setZone(null)
    setT2(null)
    setDwi(null)
    setDce(null)
    navigate(0)
  }

  return <>
    <WorkspaceHeader title="PI-RADS v2.1" intro={ui.piradsIntro} reset={reset} ui={ui} />
    <section className={`${kaiser.question} ${styles.question}`} key={step}>
      <h2 ref={stepHeading} tabIndex={-1} className={styles.stepTitle}>
        {current?.title ?? (result ? ui.category : ui.quality)}
      </h2>
      {current ? <Options {...current} title={undefined} label={current.title} />
        : result ? <Result ui={ui} label="PI-RADS" value={result.score} color={SCORE_COLORS[result.score - 1]}>
          <div className={styles.likelihood}><small>{ui.probability}</small><strong>{pick(LIKELIHOOD[result.score - 1])}</strong></div>
          <div className={styles.scale} aria-hidden="true">
            {SCORE_COLORS.map((color, index) => <span key={color} style={{ '--score-color': color }} data-active={index + 1 === result.score}>{index + 1}</span>)}
          </div>
          <div className={styles.reason}><strong>{ui.reasoning}</strong><p>{pick(RULES[result.rule])}</p></div>
        </Result> : <p className={styles.qualityStop} role="status">{ui.qualityStop}</p>}
    </section>
    <div className={`${kaiser.actions} ${styles.actions}`}>
      <button type="button" className={kaiser.backButton} onClick={() => navigate(step - 1)} disabled={step === 0}>{ui.previous}</button>
      {current ? <button type="button" className={kaiser.nextButton} onClick={() => navigate(step + 1)} disabled={current.value == null}>{ui.next}</button>
        : <button type="button" className={kaiser.nextButton} onClick={reset}>{ui.reset}</button>}
    </div>
  </>
}

function WorkspaceHeader({ title, intro, reset, ui }) {
  return <header className={`${kaiser.intro} ${styles.intro}`}>
    <div><h1>{title}</h1><p>{intro}</p></div>
    <button type="button" className={styles.reset} onClick={reset} aria-label={ui.reset} title={ui.reset}>
      <span aria-hidden="true">↺</span><span>{ui.reset}</span>
    </button>
  </header>
}

function ThemeIcon() {
  return <>
    <svg className={kaiser.sunIcon} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>
    <svg className={kaiser.moonIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 15.2A8.7 8.7 0 0 1 8.8 3.9 8.8 8.8 0 1 0 20.1 15.2Z"/></svg>
  </>
}

export default function ProstateCalculator({ tool }) {
  const { lang, setLang } = useLanguage()
  const { toggleTheme } = useTheme()
  const ui = Object.fromEntries(Object.entries(COPY).map(([key, value]) => [key, value[lang] || value.de]))
  const suffix = `?lang=${lang}`
  const isPsa = tool === 'psa'
  return <main className={`${kaiser.page} ${styles.page}`} dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={`${kaiser.topbar} ${styles.topbar}`}>
      <Link href={`/rechner${suffix}`} className={kaiser.brand}>
        <img src="/images/rechner/pirads-icon.webp" width="42" height="42" alt="" />
        <span>{ui.brand}</span>
      </Link>
      <nav aria-label={ui.settings}>
        <button type="button" className={kaiser.themeToggle} onClick={toggleTheme} aria-label={ui.theme}><ThemeIcon /></button>
        <div className={kaiser.languages} dir="ltr">
          {['de', 'en', 'fa'].map(language => <button key={language} type="button" onClick={() => setLang(language)} aria-pressed={lang === language} className={lang === language ? kaiser.langActive : ''}>{language === 'fa' ? 'فا' : language.toUpperCase()}</button>)}
        </div>
      </nav>
    </header>
    <div className={`${kaiser.shell} ${styles.shell}`}>
      <div className={`${kaiser.workspace} ${styles.workspace}`}>
        <nav className={styles.toolNav} aria-label={ui.brand}>
          <Link href={`/rechner${suffix}`}>{ui.back}</Link>
          <Link href={`/prostata-psa${suffix}`} aria-current={isPsa ? 'page' : undefined}>{ui.psaTitle}</Link>
          <Link href={`/pi-rads${suffix}`} aria-current={!isPsa ? 'page' : undefined}>PI-RADS v2.1</Link>
        </nav>
        {isPsa ? <PsaCalculator ui={ui} lang={lang} /> : <PiradsCalculator ui={ui} lang={lang} />}
      </div>
      <aside className={kaiser.visualStage} aria-hidden="true"><div className={styles.anatomy} /></aside>
    </div>
    <footer className={`${kaiser.disclaimer} ${styles.footer}`}>
      <p>{ui.disclaimer}</p>
      <p>{ui.privacy}</p>
      <a href={ACR} target="_blank" rel="noreferrer">ACR · PI-RADS v2.1 ↗</a>
      {isPsa ? <a href={EAU} target="_blank" rel="noreferrer">EAU · PSA-D ↗</a> : null}
      <Link href={`/becken-m/prostata/prostatakarzinom${suffix}`}>{ui.learn} ↗</Link>
      <Link href={`/${suffix}`}>RadYar</Link>
    </footer>
  </main>
}
