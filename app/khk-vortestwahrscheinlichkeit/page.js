'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const CALCULATOR_URL = 'https://www.rad-yar.com/khk-vortestwahrscheinlichkeit'

const PTP = {
  '30-39': { typical: { female: 31, male: 52 }, atypical: { female: 14, male: 29 }, nonanginal: { female: 14, male: 28 }, other: { female: 12, male: 25 } },
  '40-49': { typical: { female: 38, male: 59 }, atypical: { female: 19, male: 36 }, nonanginal: { female: 18, male: 35 }, other: { female: 15, male: 31 } },
  '50-59': { typical: { female: 45, male: 66 }, atypical: { female: 24, male: 43 }, nonanginal: { female: 23, male: 42 }, other: { female: 20, male: 38 } },
  '60-69': { typical: { female: 52, male: 72 }, atypical: { female: 30, male: 51 }, nonanginal: { female: 29, male: 49 }, other: { female: 25, male: 45 } },
  '70+': { typical: { female: 60, male: 78 }, atypical: { female: 37, male: 58 }, nonanginal: { female: 36, male: 57 }, other: { female: 32, male: 52 } },
}

const COPY = {
  de: {
    brand: 'KHK VORTESTWAHRSCHEINLICHKEIT', by: 'Ein Tool von', steps: ['Patient', 'Beschwerden', 'Ergebnis'],
    patientTitle: 'Wer wird eingeschätzt?', patientText: 'Alter und Geschlecht bestimmen gemeinsam mit der Beschwerdecharakteristik die Vortestwahrscheinlichkeit.',
    age: 'Alter', years: 'Jahre', modelAge: 'Altersgruppe im Modell', sex: 'Geschlecht im Modell', female: 'Weiblich', male: 'Männlich',
    symptomTitle: 'Wie sind die Beschwerden?', symptomText: 'Markieren Sie jedes zutreffende Angina-pectoris-Kriterium.',
    symptomLocation: 'Einengende Beschwerden', symptomLocationHint: 'Retrosternal oder in Nacken, Schulter, Kiefer oder Arm lokalisiert',
    symptomExertion: 'Durch Belastung provoziert', symptomExertionHint: 'Verstärkung durch körperliche Belastung oder emotionalen Stress',
    symptomRelief: 'Rasche Besserung', symptomReliefHint: 'Besserung durch Ruhe und/oder Nitrat innerhalb von fünf Minuten',
    yes: 'Trifft zu', no: 'Trifft nicht zu', matched: 'Zutreffende Kriterien',
    resultTitle: 'Geschätzte Vortestwahrscheinlichkeit', resultText: 'Für eine stenosierende koronare Herzkrankheit bei stabiler Brustschmerz-Symptomatik.',
    low: 'Niedrige Vortestwahrscheinlichkeit', intermediate: 'Mittlere Vortestwahrscheinlichkeit',
    lowAdvice: 'Nach NVL sollte primär kein diagnostisches Verfahren zum Nachweis einer stenosierenden KHK eingesetzt und eine andere Ursache der Beschwerden erwogen werden.',
    intermediateAdvice: 'Nach NVL sollten zur weiteren Eingrenzung nicht-invasive Verfahren erwogen werden. Die Wahl richtet sich nach klinischem Gesamtbild, Testeignung, Risiken und lokaler Expertise.',
    inputs: 'Grundlage', classification: 'Beschwerdeklasse', typical: 'Typische Angina pectoris', atypical: 'Atypische Angina pectoris', nonanginal: 'Nicht-anginöser Brustschmerz', other: 'Andere Brustbeschwerden',
    report: 'Zusammenfassung', reportLead: 'Bei {age} Jahren und {sex} ergibt sich für die Beschwerdeklasse „{class}“ nach dem DISCHARGE-Kalkulator eine Vortestwahrscheinlichkeit von {risk}% für eine stenosierende KHK.',
    femaleReport: 'weiblichem Geschlecht im Modell', maleReport: 'männlichem Geschlecht im Modell', copy: 'Zusammenfassung kopieren', copied: 'Kopiert',
    next: 'Weiter', back: 'Zurück', restart: 'Neu beginnen', required: 'Bitte beantworten Sie alle Angaben.',
    acuteTitle: 'Nicht für akute Beschwerden', acuteText: 'Bei neu aufgetretenem oder anhaltendem Brustschmerz, Luftnot, Kaltschweißigkeit oder Kreislaufproblemen ist eine sofortige medizinische Abklärung erforderlich.',
    scope: 'Für stabile Brustschmerzen in der spezialfachärztlichen Versorgung; nicht bei bekannter KHK und nicht zum Ausschluss eines akuten Koronarsyndroms.',
    modelNote: 'Tabellenwerte repräsentieren Schätzwerte für 35, 45, 55, 65 bzw. 75 Jahre. Grenzwerte sind Orientierungspunkte und keine starren Therapieentscheidungen.',
    source: 'NVL Chronische KHK · Version 7.0 · 2024', sourceLabel: 'Originalleitlinie', recommend: 'Weiterempfehlen', shareText: 'Direktlink oder QR-Code mit Kolleginnen und Kollegen teilen.', whatsapp: 'Über WhatsApp teilen', copyLink: 'Link kopieren', linkCopied: 'Link kopiert', developerCredit: 'Entwickelt von Dr. Zia',
  },
  en: {
    brand: 'CAD PRE-TEST PROBABILITY', by: 'A tool by', steps: ['Patient', 'Symptoms', 'Result'],
    patientTitle: 'Who is being assessed?', patientText: 'Age and model sex combine with chest-pain characteristics to determine pre-test probability.',
    age: 'Age', years: 'years', modelAge: 'Model age group', sex: 'Sex in the model', female: 'Female', male: 'Male',
    symptomTitle: 'What are the symptoms like?', symptomText: 'Mark each angina criterion that applies.',
    symptomLocation: 'Constricting discomfort', symptomLocationHint: 'Retrosternal or located in the neck, shoulder, jaw or arm',
    symptomExertion: 'Provoked by exertion', symptomExertionHint: 'Worse with physical exertion or emotional stress',
    symptomRelief: 'Prompt relief', symptomReliefHint: 'Relieved by rest and/or nitrate within five minutes',
    yes: 'Applies', no: 'Does not apply', matched: 'Criteria met',
    resultTitle: 'Estimated pre-test probability', resultText: 'For obstructive coronary artery disease in patients with stable chest pain.',
    low: 'Low pre-test probability', intermediate: 'Intermediate pre-test probability',
    lowAdvice: 'The German NVL recommends initially considering another cause rather than testing for obstructive CAD.',
    intermediateAdvice: 'The German NVL recommends non-invasive testing for further clarification. Test selection depends on the overall clinical picture, suitability, risks and local expertise.',
    inputs: 'Basis', classification: 'Symptom class', typical: 'Typical angina', atypical: 'Atypical angina', nonanginal: 'Non-anginal chest pain', other: 'Other chest discomfort',
    report: 'Summary', reportLead: 'At age {age}, with {sex}, {class} gives a {risk}% pre-test probability of obstructive CAD using the DISCHARGE calculator.',
    femaleReport: 'female sex in the model', maleReport: 'male sex in the model', copy: 'Copy summary', copied: 'Copied',
    next: 'Continue', back: 'Back', restart: 'Start again', required: 'Please complete every item.',
    acuteTitle: 'Not for acute symptoms', acuteText: 'New or persistent chest pain, shortness of breath, cold sweats or circulatory symptoms require immediate medical assessment.',
    scope: 'For stable chest pain in specialist care; not for known CAD and not to rule out acute coronary syndrome.',
    modelNote: 'Table values represent estimates at ages 35, 45, 55, 65 and 75. Thresholds are guides, not rigid treatment decisions.',
    source: 'German NVL Chronic CAD · Version 7.0 · 2024', sourceLabel: 'Original guideline', recommend: 'Recommend', shareText: 'Share the direct link or QR code with colleagues.', whatsapp: 'Share via WhatsApp', copyLink: 'Copy link', linkCopied: 'Link copied', developerCredit: 'Developed by Dr. Zia',
  },
}

const SYMPTOMS = [
  ['symptomLocation', 'symptomLocationHint'],
  ['symptomExertion', 'symptomExertionHint'],
  ['symptomRelief', 'symptomReliefHint'],
]

function getAgeBand(age) {
  if (age < 40) return '30-39'
  if (age < 50) return '40-49'
  if (age < 60) return '50-59'
  if (age < 70) return '60-69'
  return '70+'
}

function getSymptomClass(answers) {
  const count = answers.filter(Boolean).length
  return count === 3 ? 'typical' : count === 2 ? 'atypical' : count === 1 ? 'nonanginal' : 'other'
}

function HeartVisual({ risk, ui, ageBand }) {
  return <aside className={styles.visualPanel} aria-hidden="true">
    <div className={styles.grid}/>
    <svg className={styles.heart} viewBox="0 0 420 520">
      <defs><linearGradient id="heartGlow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff856e"/><stop offset="1" stopColor="#7e1932"/></linearGradient></defs>
      <path d="M205 468C144 405 68 343 55 245 46 176 79 116 139 106c37-6 62 11 77 35 16-38 50-64 90-60 67 7 103 73 91 143-17 101-105 179-192 244Z" fill="url(#heartGlow)" fillOpacity=".22" stroke="#ff8b72" strokeWidth="2"/>
      <path d="M218 145c-7 59 6 112 42 153 23 26 49 44 70 72M190 154c-35 61-40 132-10 198 14 31 34 58 58 82M130 213c36 12 76 9 107-12M171 309c39 5 77-7 105-35" fill="none" stroke="#ffb095" strokeWidth="5" strokeLinecap="round" opacity=".72"/>
      <path d="M215 143c-6-56-4-96 7-120M249 151c19-54 36-81 62-112M184 151c-24-45-42-68-72-84" fill="none" stroke="#ff987e" strokeWidth="15" strokeLinecap="round" opacity=".3"/>
      <circle cx="239" cy="202" r="7" fill="#ffe2d8"/><circle cx="239" cy="202" r="18" fill="none" stroke="#ffb39b" opacity=".45"/>
    </svg>
    <div className={styles.visualResult}><small>{ui.resultTitle}</small><strong>{risk === null ? '—' : `${risk}%`}</strong><span>{ageBand || 'DISCHARGE / COME-CCT'}</span></div>
    <div className={styles.visualFooter}><i/>{ui.source}</div>
  </aside>
}

function Stepper({ step, completed, labels, onSelect }) {
  return <ol className={styles.stepper} aria-label="Progress">
    {labels.map((label, index) => <li key={label} className={index === step ? styles.active : index < step ? styles.done : ''}>
      <button type="button" disabled={index > completed} onClick={() => onSelect(index)} aria-current={index === step ? 'step' : undefined}><span>{index < step ? '✓' : index + 1}</span><small>{label}</small></button>
    </li>)}
  </ol>
}

function Choice({ selected, onClick, title, detail, icon }) {
  return <button type="button" className={`${styles.choice} ${selected ? styles.selected : ''}`} onClick={onClick} aria-pressed={selected}>
    <span className={styles.choiceIcon}>{icon}</span><span><strong>{title}</strong>{detail ? <small>{detail}</small> : null}</span><i>{selected ? '✓' : ''}</i>
  </button>
}

function PatientStep({ age, setAge, sex, setSex, ui }) {
  const band = getAgeBand(age)
  return <section className={styles.stepContent}>
    <header><p className={styles.eyebrow}>01 · DISCHARGE</p><h1>{ui.patientTitle}</h1><p>{ui.patientText}</p></header>
    <div className={styles.ageCard}>
      <div className={styles.ageHeading}><span>{ui.age}</span><strong>{age}<small>{ui.years}</small></strong></div>
      <input type="range" min="30" max="90" step="1" value={age} onChange={event => setAge(Number(event.target.value))} aria-label={ui.age} style={{ '--progress': `${(age - 30) / 60 * 100}%` }}/>
      <div className={styles.ageScale}><span>30</span><em>{ui.modelAge}: {band}</em><span>90+</span></div>
    </div>
    <fieldset className={styles.fieldset}><legend>{ui.sex}</legend><div className={styles.choiceGrid}>
      <Choice selected={sex === 'female'} onClick={() => setSex('female')} title={ui.female} icon="♀"/>
      <Choice selected={sex === 'male'} onClick={() => setSex('male')} title={ui.male} icon="♂"/>
    </div></fieldset>
    <div className={styles.alert}><span>!</span><p><strong>{ui.acuteTitle}</strong>{ui.acuteText}</p></div>
  </section>
}

function SymptomsStep({ answers, setAnswer, ui }) {
  const answeredCount = answers.filter(value => value !== null).length
  const positiveCount = answers.filter(Boolean).length
  return <section className={styles.stepContent}>
    <header><p className={styles.eyebrow}>02 · DIAMOND-KRITERIEN</p><h1>{ui.symptomTitle}</h1><p>{ui.symptomText}</p></header>
    <div className={styles.symptomList}>{SYMPTOMS.map(([title, hint], index) => <article key={title} className={answers[index] !== null ? styles.answered : ''}>
      <span className={styles.symptomNumber}>{index + 1}</span><div><strong>{ui[title]}</strong><p>{ui[hint]}</p></div>
      <div className={styles.binary}><button type="button" className={answers[index] === false ? styles.binaryActive : ''} onClick={() => setAnswer(index, false)}>{ui.no}</button><button type="button" className={answers[index] === true ? styles.binaryActive : ''} onClick={() => setAnswer(index, true)}>{ui.yes}</button></div>
    </article>)}</div>
    <div className={styles.liveClass}><span>{ui.matched}</span><strong>{answeredCount === 3 ? `${positiveCount} / 3 · ${ui[getSymptomClass(answers)]}` : `${answeredCount} / 3`}</strong></div>
  </section>
}

function ResultStep({ age, sex, answers, ui }) {
  const [copied, setCopied] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const ageBand = getAgeBand(age)
  const symptomClass = getSymptomClass(answers)
  const risk = PTP[ageBand][symptomClass][sex]
  const level = risk < 15 ? 'low' : 'intermediate'
  const report = ui.reportLead.replace('{age}', age).replace('{sex}', ui[`${sex}Report`]).replace('{class}', ui[symptomClass]).replace('{risk}', risk)
  const copyReport = async () => {
    try { await navigator.clipboard.writeText(`${report}\n\n${ui[`${level}Advice`]}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(CALCULATOR_URL); setLinkCopied(true); window.setTimeout(() => setLinkCopied(false), 1800) } catch { setLinkCopied(false) }
  }
  const whatsAppText = encodeURIComponent(`KHK Vortestwahrscheinlichkeit · RadYar\n${CALCULATOR_URL}`)
  return <section className={`${styles.stepContent} ${styles.result}`}>
    <header><p className={styles.eyebrow}>03 · ERGEBNIS</p><h1>{ui.resultTitle}</h1><p>{ui.resultText}</p></header>
    <div className={styles.riskReveal} style={{ '--risk': `${risk}%`, '--risk-color': level === 'low' ? '#6fd0ad' : '#ff987e' }}>
      <div className={styles.riskCircle}><strong>{risk}</strong><span>%</span></div><h2>{ui[level]}</h2>
      <div className={styles.riskTrack}><i/><span/><em/><b/></div><div className={styles.riskLabels}><span>0</span><span>15%</span><span>50%</span><span>85%</span><span>100%</span></div>
    </div>
    <dl className={styles.resultFacts}><div><dt>{ui.age}</dt><dd>{age} · {ageBand}</dd></div><div><dt>{ui.sex}</dt><dd>{ui[sex]}</dd></div><div><dt>{ui.classification}</dt><dd>{ui[symptomClass]}</dd></div></dl>
    <div className={styles.reportBox}><strong>{ui.report}</strong><p>{report}</p><p className={styles.advice}>{ui[`${level}Advice`]}</p><button type="button" onClick={copyReport}>{copied ? '✓ ' + ui.copied : '⧉ ' + ui.copy}</button></div>
    <div className={styles.modelNote}><span>i</span><p>{ui.modelNote}</p></div>
    <section className={`${styles.shareCard} ${shareOpen ? styles.shareOpen : ''}`}><button type="button" className={styles.shareToggle} onClick={() => setShareOpen(value => !value)} aria-expanded={shareOpen}><span>↗</span><span><strong>{ui.recommend}</strong><small>{ui.shareText}</small></span><i>{shareOpen ? '−' : '+'}</i></button>
      {shareOpen ? <div className={styles.sharePanel}><div className={styles.qr}><QRCodeSVG value={CALCULATOR_URL} size={152} level="H" bgColor="#fff9f6" fgColor="#220c12" marginSize={2}/></div><div><strong>rad-yar.com/<br/>khk-vortestwahrscheinlichkeit</strong><a href={`https://wa.me/?text=${whatsAppText}`} target="_blank" rel="noreferrer">{ui.whatsapp}</a><button type="button" onClick={copyLink}>{linkCopied ? ui.linkCopied : ui.copyLink}</button></div></div> : null}
    </section>
  </section>
}

export default function KhkPretestPage() {
  const { lang, setLang } = useLanguage()
  const activeLang = lang === 'en' ? 'en' : 'de'
  const ui = COPY[activeLang]
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [age, setAge] = useState(55)
  const [sex, setSex] = useState(null)
  const [answers, setAnswers] = useState([null, null, null])
  const [error, setError] = useState('')
  const ageBand = getAgeBand(age)
  const ready = step === 0 ? Boolean(sex) : step === 1 ? answers.every(value => value !== null) : true
  const symptomClass = answers.every(value => value !== null) ? getSymptomClass(answers) : null
  const risk = sex && symptomClass ? PTP[ageBand][symptomClass][sex] : null

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [step])

  const setAnswer = (index, value) => setAnswers(current => current.map((answer, itemIndex) => itemIndex === index ? value : answer))
  const next = () => {
    if (!ready) { setError(ui.required); return }
    setError('')
    const nextStep = Math.min(step + 1, 2)
    setCompleted(current => Math.max(current, nextStep))
    setStep(nextStep)
  }
  const restart = () => { setStep(0); setCompleted(0); setAge(55); setSex(null); setAnswers([null, null, null]); setError('') }

  return <main className={styles.page} lang={activeLang} dir="ltr">
    <header className={styles.topbar}><Link href="/khk-vortestwahrscheinlichkeit" className={styles.brand}><span>♥</span>{ui.brand}</Link><div className={styles.languages}>{['de', 'en'].map(code => <button type="button" key={code} className={code === activeLang ? styles.langActive : ''} onClick={() => setLang(code)}>{code.toUpperCase()}</button>)}</div></header>
    <div className={styles.shell}><HeartVisual risk={risk} ui={ui} ageBand={ageBand}/><section className={styles.formPanel}>
      <Stepper step={step} completed={completed} labels={ui.steps} onSelect={(value) => { setError(''); setStep(value) }}/>
      <div className={styles.viewport} key={step}>{step === 0 ? <PatientStep age={age} setAge={setAge} sex={sex} setSex={setSex} ui={ui}/> : step === 1 ? <SymptomsStep answers={answers} setAnswer={setAnswer} ui={ui}/> : <ResultStep age={age} sex={sex} answers={answers} ui={ui}/>}</div>
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
      <footer className={styles.actions}>{step > 0 ? <button type="button" className={styles.back} onClick={() => { setError(''); setStep(value => value - 1) }}>← {ui.back}</button> : <span/>}{step < 2 ? <button type="button" className={styles.next} aria-disabled={!ready} onClick={next}>{ui.next} →</button> : <button type="button" className={styles.next} onClick={restart}>{ui.restart} ↻</button>}</footer>
    </section></div>
    <footer className={styles.disclaimer}><span>i</span><p>{ui.scope}</p><a href="https://www.leitlinien.de/themen/khk/pdf/khk-vers7-0.pdf" target="_blank" rel="noreferrer">{ui.sourceLabel} ↗</a><small><Link href="/">{ui.by} <strong>RadYar</strong></Link> · {ui.developerCredit}</small></footer>
  </main>
}
