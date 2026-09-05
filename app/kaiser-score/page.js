'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTheme } from '@/providers/ThemeProvider'
import AdcAssessment from './AdcAssessment'
import styles from './page.module.css'

const COPY = {
  de: {
    brand: 'KAISER SCORE', hero: 'Beurteilung eines anreichernden Herdes in der Mamma-MRT nach dem Kaiser-Score',
    questions: {
      quality: { title: 'Anreichernder Herd im MRT bei guter Bildqualität?', text: 'Sind Morphologie und Kontrastmittelkinetik zuverlässig beurteilbar?' },
      root: { title: 'Spikulierte Ausläufer?', text: 'Zeigt die Läsion mindestens einen spikulierten, wurzelartigen Ausläufer?', help: 'Schon eine einzelne Spikula zählt als positiver Root Sign – auch bei ansonsten umschriebener Läsion.' },
      curve: { title: 'Kurventyp', text: 'Wie verhält sich das Signal zwischen frühem bzw. maximalem und spätem Zeitpunkt?', help: 'Die frühe Phase am Peak beurteilen. Persistierend: weiterer Anstieg. Plateau: stabil. Wash-out: Signalabfall.' },
      margin: { title: 'Rand', text: 'Wie ist der Läsionsrand im kontrastmittelverstärkten Bild abgrenzbar?', help: 'Das verdächtigste Randmerkmal verwenden. Diese Abfrage gilt auch für Non-mass Enhancement.' },
      enhancement: { title: 'Internes Enhancement', text: 'Welches interne Kontrastmittelmuster überwiegt?', help: 'Heterogen umfasst auch Rim Enhancement und Clustered-ring Enhancement.' },
      edema: { title: 'Perifokales Ödem', text: 'Liegt ein suspektes T2-hyperintenses Ödem vor?', help: 'Positiv sind perifokales oder diffuses ipsilaterales Ödem. Diffuses bilaterales Ödem gilt hier als negativ.' },
    },
    options: {
      qualityNo: ['Nein', 'Diagnostische Bildqualität nicht ausreichend'], qualityYes: ['Ja', 'Morphologie und Kinetik sind beurteilbar'],
      no: ['Nein', 'Keine spikulierten Ausläufer'], yes: ['Ja', 'Mindestens eine Spikula erkennbar'],
      persistent: ['Persistierend', 'Kontinuierlicher Signalanstieg'], plateau: ['Plateau', 'Spätphase annähernd stabil'], washout: ['Wash-out', 'Signalabfall in der Spätphase'],
      circumscribed: ['Umschrieben', 'Scharf begrenzter Rand'], irregular: ['Irregulär', 'Unregelmäßig oder unscharf'],
      homogeneous: ['Homogen', 'Gleichmäßige interne Kontrastaufnahme'], heterogeneous: ['Heterogen oder Rim', 'Inklusive Clustered-ring Enhancement'],
      absent: ['Nicht vorhanden', 'Kein suspektes perifokales oder ipsilaterales Ödem'], present: ['Vorhanden', 'Perifokal oder diffus ipsilateral'],
    },
    reportOptions: {
      no: 'keine spikulierten Ausläufer', yes: 'spikulierte Ausläufer', persistent: 'einen persistierenden Kurvenverlauf', plateau: 'einen Plateauverlauf', washout: 'einen Wash-out-Verlauf', circumscribed: 'einen umschriebenen Rand', irregular: 'einen irregulären Rand', homogeneous: 'homogenes internes Enhancement', heterogeneous: 'heterogenes oder randständiges internes Enhancement', absent: 'kein suspektes perifokales Ödem', present: 'perifokales oder diffuses ipsilaterales Ödem',
    },
    pathLabels: { quality: 'Bildqualität', root: 'Root Sign', curve: 'Kurve', margin: 'Rand', enhancement: 'Enhancement', edema: 'Ödem' },
    ladder: 'Wahrscheinlichkeits-Skala', low: 'Niedrige Wahrscheinlichkeit', intermediate: 'Intermediäre Wahrscheinlichkeit', high: 'Hohe Wahrscheinlichkeit',
    result: 'Ergebnis', corresponds: 'Entspricht', recommendation: 'Empfehlung', biopsy: 'Histologische Abklärung empfohlen', clinical: 'Klinisch-bildgebende Korrelation',
    resultText: { low: 'Kaiser 1–4 wird üblicherweise BI-RADS 2/3 zugeordnet.', intermediate: 'Kaiser 5–7 entspricht einer suspekten Läsion (BI-RADS 4).', high: 'Kaiser 8–11 entspricht einer hochsuspekten Läsion (BI-RADS 5).' },
    report: 'Befundtext', finding: 'Befund', assessment: 'Beurteilung', copy: 'Befundtext kopieren', copied: 'Kopiert',
    back: 'Zurück', restart: 'Neu beginnen', continue: 'Weiter',
    qualityStop: 'Keine verlässliche Kaiser-Score-Berechnung möglich', qualityStopText: 'Der Kaiser-Score setzt eine diagnostisch ausreichende Bildqualität sowie zuverlässig beurteilbare Morphologie und Kontrastmittelkinetik voraus.',
    disclaimer: 'Entscheidungshilfe für anreichernde Läsionen in der kontrastmittelverstärkten Mamma-MRT · kein Ersatz für die ärztliche Gesamtbeurteilung.',
    source: 'Baltzer et al. · European Radiology · 2018', by: 'Ein Tool von', developed: 'Entwickelt von Dr. Zia',
    atlasInfo: 'Kaiser 1–4: BI-RADS 2/3 · Kaiser 5–7: BI-RADS 4 · Kaiser 8–11: BI-RADS 5',
    findingLead: 'In der Mamma-MRT zeigt die anreichernde Läsion', assessmentLead: 'Nach dem Kaiser-Entscheidungsbaum ergibt sich',
    theme: 'Hell-/Dunkelmodus wechseln',
  },
  en: {
    brand: 'KAISER SCORE', hero: 'Assessment of an enhancing lesion on breast MRI using the Kaiser Score',
    questions: {
      quality: { title: 'Enhancing lesion on MRI with good image quality?', text: 'Can morphology and enhancement kinetics be assessed reliably?' },
      root: { title: 'Spiculated extensions?', text: 'Does the lesion show at least one spiculated, root-like extension?', help: 'A single spicule is enough for a positive root sign, even if the remainder of the lesion is circumscribed.' },
      curve: { title: 'Curve type', text: 'How does the signal change between the early or peak and delayed phase?', help: 'Assess the early phase at peak enhancement. Persistent: continued increase. Plateau: stable. Wash-out: signal decrease.' },
      margin: { title: 'Margin', text: 'How is the lesion margin defined on contrast-enhanced images?', help: 'Use the most suspicious margin feature. Margin assessment also applies to non-mass enhancement.' },
      enhancement: { title: 'Internal enhancement', text: 'Which internal enhancement pattern predominates?', help: 'Heterogeneous includes rim enhancement and clustered-ring enhancement.' },
      edema: { title: 'Perifocal edema', text: 'Is suspicious T2-hyperintense edema present?', help: 'Perifocal or diffuse ipsilateral edema is positive. Diffuse bilateral edema is considered negative here.' },
    },
    options: {
      qualityNo: ['No', 'Diagnostic image quality is insufficient'], qualityYes: ['Yes', 'Morphology and kinetics are assessable'],
      no: ['No', 'No spiculated extensions'], yes: ['Yes', 'At least one spicule is visible'],
      persistent: ['Persistent', 'Continuous signal increase'], plateau: ['Plateau', 'Delayed phase remains stable'], washout: ['Wash-out', 'Signal decreases in the delayed phase'],
      circumscribed: ['Circumscribed', 'Sharply defined margin'], irregular: ['Irregular', 'Irregular or ill-defined margin'],
      homogeneous: ['Homogeneous', 'Uniform internal enhancement'], heterogeneous: ['Heterogeneous or rim', 'Includes clustered-ring enhancement'],
      absent: ['Absent', 'No suspicious perifocal or ipsilateral edema'], present: ['Present', 'Perifocal or diffuse ipsilateral'],
    },
    reportOptions: {
      no: 'no spiculated extensions', yes: 'spiculated extensions', persistent: 'a persistent enhancement curve', plateau: 'a plateau enhancement curve', washout: 'a wash-out enhancement curve', circumscribed: 'a circumscribed margin', irregular: 'an irregular margin', homogeneous: 'homogeneous internal enhancement', heterogeneous: 'heterogeneous or rim internal enhancement', absent: 'no suspicious perifocal edema', present: 'perifocal or diffuse ipsilateral edema',
    },
    pathLabels: { quality: 'Image quality', root: 'Root sign', curve: 'Curve', margin: 'Margin', enhancement: 'Enhancement', edema: 'Edema' },
    ladder: 'Probability scale', low: 'Low likelihood', intermediate: 'Intermediate likelihood', high: 'High likelihood',
    result: 'Result', corresponds: 'Corresponds to', recommendation: 'Recommendation', biopsy: 'Histological verification recommended', clinical: 'Clinical and imaging correlation',
    resultText: { low: 'Kaiser 1–4 is generally assigned to BI-RADS 2/3.', intermediate: 'Kaiser 5–7 represents a suspicious lesion (BI-RADS 4).', high: 'Kaiser 8–11 represents a highly suspicious lesion (BI-RADS 5).' },
    report: 'Report text', finding: 'Findings', assessment: 'Assessment', copy: 'Copy report text', copied: 'Copied',
    back: 'Back', restart: 'Start again', continue: 'Next',
    qualityStop: 'A reliable Kaiser Score cannot be calculated', qualityStopText: 'The Kaiser Score requires diagnostic image quality with reliably assessable morphology and enhancement kinetics.',
    disclaimer: 'Decision aid for enhancing lesions on contrast-enhanced breast MRI · not a substitute for integrated physician assessment.',
    source: 'Baltzer et al. · European Radiology · 2018', by: 'A tool by', developed: 'Developed by Dr. Zia',
    atlasInfo: 'Kaiser 1–4: BI-RADS 2/3 · Kaiser 5–7: BI-RADS 4 · Kaiser 8–11: BI-RADS 5',
    findingLead: 'On breast MRI, the enhancing lesion demonstrates', assessmentLead: 'Following the Kaiser decision tree, the result is',
    theme: 'Toggle light and dark theme',
  },
}

const OPTION_SETS = {
  quality: ['qualityNo', 'qualityYes'],
  root: ['no', 'yes'], curve: ['persistent', 'plateau', 'washout'], margin: ['circumscribed', 'irregular'],
  enhancement: ['homogeneous', 'heterogeneous'], edema: ['absent', 'present'],
}

function resolvePath(answers) {
  if (!answers.quality) return { question: 'quality' }
  if (answers.quality === 'qualityNo') return { qualityIssue: true }
  if (!answers.root) return { question: 'root' }
  if (!answers.curve) return { question: 'curve' }
  if (answers.root === 'no') {
    if (answers.curve === 'persistent') return answers.margin ? { score: answers.margin === 'irregular' ? 3 : 1 } : { question: 'margin' }
    if (answers.curve === 'plateau') return answers.margin ? { score: answers.margin === 'irregular' ? 5 : 2 } : { question: 'margin' }
    return answers.enhancement ? { score: answers.enhancement === 'heterogeneous' ? 8 : 4 } : { question: 'enhancement' }
  }
  if (answers.curve === 'persistent') return { score: 6 }
  if (!answers.edema) return { question: 'edema' }
  return { score: answers.curve === 'plateau' ? (answers.edema === 'present' ? 10 : 7) : (answers.edema === 'present' ? 11 : 9) }
}

function riskFor(score) {
  if (!score) return null
  if (score <= 4) return { key: 'low', birads: 'BI-RADS 2/3' }
  if (score <= 7) return { key: 'intermediate', birads: 'BI-RADS 4' }
  return { key: 'high', birads: 'BI-RADS 5' }
}

function ArrowIcon({ reverse = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={reverse ? styles.reverse : ''}><path d="M4 12h16M14 6l6 6-6 6"/></svg>
}

function ThemeIcons() {
  return <>
    <svg className={styles.sunIcon} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></svg>
    <svg className={styles.moonIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 15.2A8.7 8.7 0 0 1 8.8 3.9 8.8 8.8 0 1 0 20.1 15.2Z"/></svg>
  </>
}

function OptionSchematic({ question, option }) {
  if (question === 'curve') {
    const paths = {
      persistent: 'M13 54 C27 51 30 35 43 31 S65 17 83 12',
      plateau: 'M13 54 C27 49 29 26 44 22 S65 23 83 22',
      washout: 'M13 54 C26 49 30 22 45 18 S65 29 83 39',
    }
    return <svg className={styles.schematic} viewBox="0 0 96 68" aria-hidden="true">
      <path className={styles.schematicGuide} d="M10 8v50h78" />
      <path className={styles.schematicMain} d={paths[option]} />
      <circle className={styles.schematicNode} cx="13" cy="54" r="2.5" />
      <circle className={styles.schematicNode} cx="83" cy={option === 'persistent' ? 12 : option === 'plateau' ? 22 : 39} r="2.5" />
    </svg>
  }

  if (question === 'root') {
    return <svg className={styles.schematic} viewBox="0 0 96 68" aria-hidden="true">
      {option === 'yes' ? <>
        <path className={styles.schematicSoft} d="M31 21 24 12M29 29 14 27M33 39 22 50M43 44 42 60M54 42 65 54M60 33 78 35M57 23 70 12" />
        <path className={styles.schematicMain} d="M31 21c7-9 21-9 28 1 7 9 4 20-5 24-10 5-22 1-26-9-2-6-1-11 3-16Z" />
        <circle className={styles.schematicFill} cx="44" cy="32" r="8" />
      </> : <>
        <ellipse className={styles.schematicSoft} cx="48" cy="34" rx="29" ry="21" />
        <ellipse className={styles.schematicMain} cx="48" cy="34" rx="22" ry="16" />
        <circle className={styles.schematicFill} cx="48" cy="34" r="8" />
      </>}
    </svg>
  }

  if (question === 'margin') {
    return <svg className={styles.schematic} viewBox="0 0 96 68" aria-hidden="true">
      <circle className={styles.schematicSoft} cx="48" cy="34" r="25" />
      {option === 'circumscribed'
        ? <ellipse className={styles.schematicMain} cx="48" cy="34" rx="21" ry="17" />
        : <path className={styles.schematicMain} d="M27 30 34 22 41 23 47 16 54 23 63 21 66 30 72 36 64 43 61 51 51 49 43 53 36 47 27 45 29 37Z" />}
    </svg>
  }

  if (question === 'enhancement') {
    return <svg className={styles.schematic} viewBox="0 0 96 68" aria-hidden="true">
      <circle className={styles.schematicSoft} cx="48" cy="34" r="25" />
      {option === 'homogeneous' ? <>
        <circle className={styles.schematicMain} cx="48" cy="34" r="19" />
        <circle className={styles.schematicFill} cx="48" cy="34" r="13" />
      </> : <>
        <circle className={styles.schematicMain} cx="48" cy="34" r="20" />
        <circle className={styles.schematicRing} cx="48" cy="34" r="14" />
        <circle className={styles.schematicNode} cx="39" cy="29" r="3" /><circle className={styles.schematicNode} cx="54" cy="25" r="2.5" /><circle className={styles.schematicNode} cx="56" cy="40" r="3.5" /><circle className={styles.schematicNode} cx="42" cy="43" r="2" />
      </>}
    </svg>
  }

  return <svg className={styles.schematic} viewBox="0 0 96 68" aria-hidden="true">
    {option === 'present' ? <><circle className={styles.schematicSoft} cx="48" cy="34" r="28" /><circle className={styles.schematicRing} cx="48" cy="34" r="22" /></> : null}
    <circle className={styles.schematicMain} cx="48" cy="34" r="12" />
    <circle className={styles.schematicFill} cx="48" cy="34" r="7" />
  </svg>
}

function Question({ question, selected, setSelected, ui }) {
  const content = ui.questions[question]
  return <section className={styles.question} key={question}>
    <header><h1>{content.title}</h1><p>{content.text}</p></header>
    <div className={styles.options} data-count={OPTION_SETS[question].length} data-question={question}>
      {OPTION_SETS[question].map(key => <button type="button" key={key} className={selected === key ? styles.optionSelected : ''} onClick={() => setSelected(key)} aria-pressed={selected === key}>
        <i>{selected === key ? '✓' : ''}</i>
        {question === 'quality' ? <span className={styles.qualityOptionIcon} aria-hidden="true">{key === 'qualityYes' ? '✓' : '×'}</span> : <span className={styles.optionVisual}><OptionSchematic question={question} option={key}/></span>}
        <span className={styles.optionCopy}><strong>{ui.options[key][0]}</strong><small>{ui.options[key][1]}</small></span>
      </button>)}
    </div>
  </section>
}

function ResultPanel({ score, risk, history, ui, copied, onCopy }) {
  const scorePosition = `${((score - 1) / 10) * 100}%`
  const report = buildReport(history, score, risk, ui)
  return <section className={styles.resultPanel} id="score-result" data-risk={risk.key}>
    <div className={styles.resultHero}>
      <div className={styles.riskTrack} aria-label={`Kaiser Score ${score}`}>
        <div className={styles.gradientArrow}>
          <span className={styles.scoreMarker} style={{ '--score-position': scorePosition }}><small>KAISER</small><b>{score}</b></span>
        </div>
        <div className={styles.scaleNumbers} aria-hidden="true">
          {Array.from({ length: 11 }, (_, index) => index + 1).map(value => <span key={value} className={value === score ? styles.scaleNumberActive : ''}>{value}</span>)}
        </div>
        <div className={styles.probabilityLegend} aria-hidden="true"><span>{ui.low}</span><span>{ui.intermediate}</span><span>{ui.high}</span></div>
      </div>
      <div className={styles.resultClassification}><span>{ui.corresponds}</span><strong>{risk.birads}</strong><p>{ui.resultText[risk.key]}</p></div>
    </div>
    <p className={styles.recommendation}>{score >= 5 ? ui.biopsy : ui.clinical}</p>
    <div className={styles.reportBox}><header><strong>{ui.report}</strong></header><div className={styles.reportSection}><span>{ui.finding}</span><p>{report.finding}</p></div><div className={styles.reportSection}><span>{ui.assessment}</span><p>{report.assessment}</p></div><button type="button" onClick={onCopy}>{copied ? ui.copied : ui.copy}<span>{copied ? '✓' : '⧉'}</span></button></div>
  </section>
}

function buildReport(history, score, risk, ui) {
  const features = history.filter(item => item.key !== 'quality').map(item => ui.reportOptions[item.value]).join(', ')
  return {
    finding: `${ui.findingLead} ${features}.`,
    assessment: `${ui.assessmentLead} Kaiser Score ${score}, entsprechend ${risk.birads}. ${score >= 5 ? ui.biopsy : ui.clinical}.`,
  }
}

function QualityNotice({ ui }) {
  return <section className={styles.qualityNotice}><span aria-hidden="true">!</span><h1>{ui.qualityStop}</h1><p>{ui.qualityStopText}</p></section>
}

export default function KaiserScorePage() {
  const { lang, setLang } = useLanguage()
  const { toggleTheme } = useTheme()
  const activeLang = lang === 'en' ? 'en' : 'de'
  const ui = COPY[activeLang]
  const [answers, setAnswers] = useState({})
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)
  const resolution = useMemo(() => resolvePath(answers), [answers])
  const score = resolution.score || null
  const current = resolution.question || null
  const qualityIssue = Boolean(resolution.qualityIssue)
  const risk = riskFor(score)

  const commitAnswer = () => {
    if (!current || !selected) return
    setAnswers(value => ({ ...value, [current]: selected }))
    setHistory(value => [...value, { key: current, value: selected }])
    setSelected(null)
  }
  const goBack = () => {
    if (!history.length) return
    const previous = history[history.length - 1]
    setAnswers(value => { const next = { ...value }; delete next[previous.key]; return next })
    setHistory(value => value.slice(0, -1))
    setSelected(previous.value)
  }
  const restart = () => { setAnswers({}); setHistory([]); setSelected(null); setCopied(false) }
  const copyReport = async () => {
    const report = buildReport(history, score, risk, ui)
    try { await navigator.clipboard.writeText(`${ui.finding}:\n${report.finding}\n\n${ui.assessment}:\n${report.assessment}`); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }

  return <main className={styles.page} lang={activeLang} dir="ltr">
    <header className={styles.topbar}>
      <Link href="/kaiser-score" className={styles.brand}>
        <Image src="/kaiser-score/kaiser-score-icon-192.png" alt="" width={42} height={42} priority/>
        <span>{ui.brand}</span>
      </Link>
      <nav>
        <button type="button" className={styles.themeToggle} onClick={toggleTheme} aria-label={ui.theme}><ThemeIcons/></button>
        <div className={styles.languages}>{['de','en'].map(code => <button type="button" key={code} onClick={() => setLang(code)} className={activeLang === code ? styles.langActive : ''} aria-pressed={activeLang === code}>{code.toUpperCase()}</button>)}</div>
      </nav>
    </header>
    <div className={styles.shell}>
      <section className={styles.workspace}>
        <div className={styles.intro}><h2>{ui.hero}</h2></div>
        {current ? <Question question={current} selected={selected} setSelected={setSelected} ui={ui}/> : score ? <ResultPanel score={score} risk={risk} history={history} ui={ui} copied={copied} onCopy={copyReport}/> : <QualityNotice ui={ui}/>}
        <footer className={`${styles.actions} ${score || qualityIssue ? styles.actionsComplete : ''}`}>
          <button type="button" className={styles.backButton} onClick={goBack} disabled={!history.length}><ArrowIcon reverse/>{ui.back}</button>
          {current ? <button type="button" className={styles.nextButton} onClick={commitAnswer} disabled={!selected}>{ui.continue}<ArrowIcon/></button> : <button type="button" className={styles.nextButton} onClick={restart}>{ui.restart}<ArrowIcon/></button>}
        </footer>
      </section>
    </div>
    {score ? <AdcAssessment key={`${score}-${activeLang}`} score={score} lang={activeLang}/> : null}
    <footer className={styles.disclaimer}><span>i</span><p>{ui.disclaimer}</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5990997/" target="_blank" rel="noreferrer">{ui.source} ↗</a><small><Link href="/">{ui.by} <strong>RadYar</strong></Link> · {ui.developed}</small></footer>
  </main>
}
