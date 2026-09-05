'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import AdcAssessment from './AdcAssessment'
import styles from './page.module.css'

const COPY = {
  de: {
    brand: 'KAISER SCORE', atlas: 'Atlas', hero: 'Die Läsion lesen. Dem Pfad folgen.',
    intro: 'Wenige MRT-Merkmale führen zu einer reproduzierbaren Einschätzung.',
    progress: 'Diagnostischer Pfad', current: 'Aktuelle Frage', help: 'Hilfestellung anzeigen', hideHelp: 'Hilfestellung schließen',
    questions: {
      root: { title: 'Spikulierte Ausläufer?', text: 'Zeigt die Läsion mindestens einen spikulierten, wurzelartigen Ausläufer?', help: 'Schon eine einzelne Spikula zählt als positiver Root Sign – auch bei ansonsten umschriebener Läsion.' },
      curve: { title: 'Kurventyp', text: 'Wie verhält sich das Signal zwischen frühem bzw. maximalem und spätem Zeitpunkt?', help: 'Die frühe Phase am Peak beurteilen. Persistierend: weiterer Anstieg. Plateau: stabil. Wash-out: Signalabfall.' },
      margin: { title: 'Rand', text: 'Wie ist der Läsionsrand im kontrastmittelverstärkten Bild abgrenzbar?', help: 'Das verdächtigste Randmerkmal verwenden. Diese Abfrage gilt auch für Non-mass Enhancement.' },
      enhancement: { title: 'Internes Enhancement', text: 'Welches interne Kontrastmittelmuster überwiegt?', help: 'Heterogen umfasst auch Rim Enhancement und Clustered-ring Enhancement.' },
      edema: { title: 'Perifokales Ödem', text: 'Liegt ein suspektes T2-hyperintenses Ödem vor?', help: 'Positiv sind perifokales oder diffuses ipsilaterales Ödem. Diffuses bilaterales Ödem gilt hier als negativ.' },
    },
    options: {
      no: ['Nein', 'Keine spikulierten Ausläufer'], yes: ['Ja', 'Mindestens eine Spikula erkennbar'],
      persistent: ['Persistierend', 'Kontinuierlicher Signalanstieg'], plateau: ['Plateau', 'Spätphase annähernd stabil'], washout: ['Wash-out', 'Signalabfall in der Spätphase'],
      circumscribed: ['Umschrieben', 'Scharf begrenzter Rand'], irregular: ['Irregulär', 'Unregelmäßig oder unscharf'],
      homogeneous: ['Homogen', 'Gleichmäßige interne Kontrastaufnahme'], heterogeneous: ['Heterogen oder Rim', 'Inklusive Clustered-ring Enhancement'],
      absent: ['Nicht vorhanden', 'Kein suspektes perifokales oder ipsilaterales Ödem'], present: ['Vorhanden', 'Perifokal oder diffus ipsilateral'],
    },
    reportOptions: {
      no: 'keine spikulierten Ausläufer', yes: 'spikulierte Ausläufer', persistent: 'einen persistierenden Kurvenverlauf', plateau: 'einen Plateauverlauf', washout: 'einen Wash-out-Verlauf', circumscribed: 'einen umschriebenen Rand', irregular: 'einen irregulären Rand', homogeneous: 'homogenes internes Enhancement', heterogeneous: 'heterogenes oder randständiges internes Enhancement', absent: 'kein suspektes perifokales Ödem', present: 'perifokales oder diffuses ipsilaterales Ödem',
    },
    pathLabels: { root: 'Root Sign', curve: 'Kurve', margin: 'Rand', enhancement: 'Enhancement', edema: 'Ödem' },
    waiting: 'Pfad beginnen', waitingText: 'Der Score erscheint, sobald ein Endpunkt des Entscheidungsbaums erreicht ist.',
    ladder: 'Wahrscheinlichkeits-Skala', low: 'Niedrige Wahrscheinlichkeit', intermediate: 'Intermediäre Wahrscheinlichkeit', high: 'Hohe Wahrscheinlichkeit',
    result: 'Ergebnis', corresponds: 'Entspricht', recommendation: 'Empfehlung', biopsy: 'Histologische Abklärung empfohlen', clinical: 'Klinisch-bildgebende Korrelation',
    resultText: { low: 'Kaiser 1–4 wird üblicherweise BI-RADS 2/3 zugeordnet.', intermediate: 'Kaiser 5–7 entspricht einer suspekten Läsion (BI-RADS 4).', high: 'Kaiser 8–11 entspricht einer hochsuspekten Läsion (BI-RADS 5).' },
    report: 'Befundtext', reportPreview: 'Vorschau', copy: 'Befundtext kopieren', copied: 'Kopiert', copyLink: 'Link kopieren', linkCopied: 'Link kopiert',
    decision: 'Entscheidungsübersicht', back: 'Zurück', restart: 'Neu beginnen', continue: 'Antwort übernehmen',
    disclaimer: 'Entscheidungshilfe für anreichernde Läsionen in der kontrastmittelverstärkten Mamma-MRT · kein Ersatz für die ärztliche Gesamtbeurteilung.',
    source: 'Baltzer et al. · European Radiology · 2018', by: 'Ein Tool von', developed: 'Entwickelt von Dr. Zia',
    atlasInfo: 'Kaiser 1–4: BI-RADS 2/3 · Kaiser 5–7: BI-RADS 4 · Kaiser 8–11: BI-RADS 5',
    findingLead: 'In der Mamma-MRT zeigt die anreichernde Läsion', assessmentLead: 'Nach dem Kaiser-Entscheidungsbaum ergibt sich',
  },
  en: {
    brand: 'KAISER SCORE', atlas: 'Atlas', hero: 'Read the lesion. Follow the path.',
    intro: 'A few MRI features lead to a reproducible assessment.',
    progress: 'Diagnostic path', current: 'Current question', help: 'Show guidance', hideHelp: 'Hide guidance',
    questions: {
      root: { title: 'Spiculated extensions?', text: 'Does the lesion show at least one spiculated, root-like extension?', help: 'A single spicule is enough for a positive root sign, even if the remainder of the lesion is circumscribed.' },
      curve: { title: 'Curve type', text: 'How does the signal change between the early or peak and delayed phase?', help: 'Assess the early phase at peak enhancement. Persistent: continued increase. Plateau: stable. Wash-out: signal decrease.' },
      margin: { title: 'Margin', text: 'How is the lesion margin defined on contrast-enhanced images?', help: 'Use the most suspicious margin feature. Margin assessment also applies to non-mass enhancement.' },
      enhancement: { title: 'Internal enhancement', text: 'Which internal enhancement pattern predominates?', help: 'Heterogeneous includes rim enhancement and clustered-ring enhancement.' },
      edema: { title: 'Perifocal edema', text: 'Is suspicious T2-hyperintense edema present?', help: 'Perifocal or diffuse ipsilateral edema is positive. Diffuse bilateral edema is considered negative here.' },
    },
    options: {
      no: ['No', 'No spiculated extensions'], yes: ['Yes', 'At least one spicule is visible'],
      persistent: ['Persistent', 'Continuous signal increase'], plateau: ['Plateau', 'Delayed phase remains stable'], washout: ['Wash-out', 'Signal decreases in the delayed phase'],
      circumscribed: ['Circumscribed', 'Sharply defined margin'], irregular: ['Irregular', 'Irregular or ill-defined margin'],
      homogeneous: ['Homogeneous', 'Uniform internal enhancement'], heterogeneous: ['Heterogeneous or rim', 'Includes clustered-ring enhancement'],
      absent: ['Absent', 'No suspicious perifocal or ipsilateral edema'], present: ['Present', 'Perifocal or diffuse ipsilateral'],
    },
    reportOptions: {
      no: 'no spiculated extensions', yes: 'spiculated extensions', persistent: 'a persistent enhancement curve', plateau: 'a plateau enhancement curve', washout: 'a wash-out enhancement curve', circumscribed: 'a circumscribed margin', irregular: 'an irregular margin', homogeneous: 'homogeneous internal enhancement', heterogeneous: 'heterogeneous or rim internal enhancement', absent: 'no suspicious perifocal edema', present: 'perifocal or diffuse ipsilateral edema',
    },
    pathLabels: { root: 'Root sign', curve: 'Curve', margin: 'Margin', enhancement: 'Enhancement', edema: 'Edema' },
    waiting: 'Start the path', waitingText: 'The score appears as soon as a terminal node of the decision tree is reached.',
    ladder: 'Probability scale', low: 'Low likelihood', intermediate: 'Intermediate likelihood', high: 'High likelihood',
    result: 'Result', corresponds: 'Corresponds to', recommendation: 'Recommendation', biopsy: 'Histological verification recommended', clinical: 'Clinical and imaging correlation',
    resultText: { low: 'Kaiser 1–4 is generally assigned to BI-RADS 2/3.', intermediate: 'Kaiser 5–7 represents a suspicious lesion (BI-RADS 4).', high: 'Kaiser 8–11 represents a highly suspicious lesion (BI-RADS 5).' },
    report: 'Report text', reportPreview: 'Preview', copy: 'Copy report text', copied: 'Copied', copyLink: 'Copy link', linkCopied: 'Link copied',
    decision: 'Decision summary', back: 'Back', restart: 'Start again', continue: 'Use answer',
    disclaimer: 'Decision aid for enhancing lesions on contrast-enhanced breast MRI · not a substitute for integrated physician assessment.',
    source: 'Baltzer et al. · European Radiology · 2018', by: 'A tool by', developed: 'Developed by Dr. Zia',
    atlasInfo: 'Kaiser 1–4: BI-RADS 2/3 · Kaiser 5–7: BI-RADS 4 · Kaiser 8–11: BI-RADS 5',
    findingLead: 'On breast MRI, the enhancing lesion demonstrates', assessmentLead: 'Following the Kaiser decision tree, the result is',
  },
}

const OPTION_SETS = {
  root: ['no', 'yes'], curve: ['persistent', 'plateau', 'washout'], margin: ['circumscribed', 'irregular'],
  enhancement: ['homogeneous', 'heterogeneous'], edema: ['absent', 'present'],
}

function resolvePath(answers) {
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

function PathRail({ history, current, ui, onJump }) {
  const items = [...history, ...(current ? [{ key: current, value: null }] : [])]
  return <div className={styles.pathWrap}>
    <span className={styles.pathCaption}>{ui.progress}</span>
    <ol className={styles.pathRail}>
      {items.map((item, index) => <li key={`${item.key}-${index}`} className={item.value ? styles.pathDone : styles.pathActive}>
        <button type="button" onClick={() => item.value && onJump(index)} disabled={!item.value}>
          <i>{item.value ? '✓' : index + 1}</i><span>{ui.pathLabels[item.key]}</span>
        </button>
      </li>)}
    </ol>
  </div>
}

function Question({ question, selected, setSelected, ui }) {
  const [helpOpen, setHelpOpen] = useState(false)
  const content = ui.questions[question]
  return <section className={styles.question} key={question}>
    <header><span>{ui.current}</span><h1>{content.title}</h1><p>{content.text}</p></header>
    <button className={styles.helpToggle} type="button" onClick={() => setHelpOpen(value => !value)} aria-expanded={helpOpen}>
      <span>i</span>{helpOpen ? ui.hideHelp : ui.help}<i>{helpOpen ? '−' : '+'}</i>
    </button>
    {helpOpen ? <p className={styles.helpText}>{content.help}</p> : null}
    <div className={styles.options} data-count={OPTION_SETS[question].length}>
      {OPTION_SETS[question].map(key => <button type="button" key={key} className={selected === key ? styles.optionSelected : ''} onClick={() => setSelected(key)} aria-pressed={selected === key}>
        <i>{selected === key ? '✓' : ''}</i><span><strong>{ui.options[key][0]}</strong><small>{ui.options[key][1]}</small></span>
      </button>)}
    </div>
  </section>
}

function ScoreLadder({ score, ui }) {
  return <section className={styles.atlas} id="score-atlas">
    <header><h2>{ui.ladder}</h2><span title={ui.atlasInfo}>i</span></header>
    <div className={styles.ladderBody}>
      <ol className={styles.ladder}>{Array.from({ length: 11 }, (_, index) => 11 - index).map(value => <li key={value} className={score === value ? styles.scoreActive : ''} data-zone={value >= 8 ? 'high' : value >= 5 ? 'intermediate' : 'low'}><span>{value}</span>{score === value ? <strong>{ui.result}</strong> : null}</li>)}</ol>
      <div className={styles.zones}>
        <div className={styles.zoneHigh}><strong>{ui.high}</strong><span>8–11 · BI-RADS 5</span></div>
        <div className={styles.zoneIntermediate}><strong>{ui.intermediate}</strong><span>5–7 · BI-RADS 4</span></div>
        <div className={styles.zoneLow}><strong>{ui.low}</strong><span>1–4 · BI-RADS 2/3</span></div>
      </div>
    </div>
  </section>
}

function ResultPanel({ score, risk, history, ui, copied, onCopy, linkCopied, onCopyLink }) {
  if (!score) return <section className={styles.emptyResult}><span>01—11</span><h2>{ui.waiting}</h2><p>{ui.waitingText}</p></section>
  return <section className={styles.resultPanel} data-risk={risk.key}>
    <div className={styles.resultHeadline}><div><span>{ui.result}</span><strong>KAISER {score}</strong></div><div><span>{ui.corresponds}</span><strong>{risk.birads}</strong></div></div>
    <p className={styles.recommendation}>{score >= 5 ? ui.biopsy : ui.clinical}</p>
    <p className={styles.resultExplanation}>{ui.resultText[risk.key]}</p>
    <h3>{ui.decision}</h3>
    <dl className={styles.decisionList}>{history.map((item, index) => <div key={`${item.key}-${index}`}><dt><i>✓</i>{ui.pathLabels[item.key]}</dt><dd>{ui.options[item.value][0]}</dd></div>)}</dl>
    <div className={styles.reportBox}><header><strong>{ui.report}</strong><span>{ui.reportPreview}</span></header><p>{buildReport(history, score, risk, ui)}</p><div><button type="button" onClick={onCopy}>{copied ? ui.copied : ui.copy}<span>{copied ? '✓' : '⧉'}</span></button><button type="button" onClick={onCopyLink}>{linkCopied ? ui.linkCopied : ui.copyLink}</button></div></div>
  </section>
}

function buildReport(history, score, risk, ui) {
  const features = history.map(item => ui.reportOptions[item.value]).join(', ')
  return `${ui.findingLead} ${features}. ${ui.assessmentLead} Kaiser Score ${score}, entsprechend ${risk.birads}. ${score >= 5 ? ui.biopsy : ui.clinical}.`
}

export default function KaiserScorePage() {
  const { lang, setLang } = useLanguage()
  const activeLang = lang === 'en' ? 'en' : 'de'
  const ui = COPY[activeLang]
  const [answers, setAnswers] = useState({})
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const resolution = useMemo(() => resolvePath(answers), [answers])
  const score = resolution.score || null
  const current = resolution.question || null
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
  const jumpTo = index => {
    const retained = history.slice(0, index)
    setAnswers(Object.fromEntries(retained.map(item => [item.key, item.value])))
    setHistory(retained)
    setSelected(history[index]?.value || null)
  }
  const restart = () => { setAnswers({}); setHistory([]); setSelected(null); setCopied(false) }
  const copyReport = async () => {
    try { await navigator.clipboard.writeText(buildReport(history, score, risk, ui)); setCopied(true); window.setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }
  const copyLink = async () => {
    try { await navigator.clipboard.writeText('https://www.rad-yar.com/kaiser-score'); setLinkCopied(true); window.setTimeout(() => setLinkCopied(false), 1800) } catch { setLinkCopied(false) }
  }

  return <main className={styles.page} lang={activeLang} dir="ltr">
    <header className={styles.topbar}>
      <Link href="/kaiser-score" className={styles.brand}><span>K</span>{ui.brand}</Link>
      <nav><a href="#score-atlas">{ui.atlas}</a><div className={styles.languages}>{['de','en'].map(code => <button type="button" key={code} onClick={() => setLang(code)} className={activeLang === code ? styles.langActive : ''} aria-pressed={activeLang === code}>{code.toUpperCase()}</button>)}</div></nav>
    </header>
    <div className={styles.shell}>
      <section className={styles.workspace}>
        <PathRail history={history} current={current} ui={ui} onJump={jumpTo}/>
        <div className={styles.intro}><h2>{ui.hero}</h2><p>{ui.intro}</p></div>
        {current ? <Question question={current} selected={selected} setSelected={setSelected} ui={ui}/> : <section className={styles.complete}><span>✓</span><h1>KAISER {score}</h1><p>{ui.resultText[risk.key]}</p></section>}
        <footer className={`${styles.actions} ${score ? styles.actionsComplete : ''}`}>
          <button type="button" className={styles.backButton} onClick={goBack} disabled={!history.length}><ArrowIcon reverse/>{ui.back}</button>
          {current ? <button type="button" className={styles.nextButton} onClick={commitAnswer} disabled={!selected}>{ui.continue}<ArrowIcon/></button> : <button type="button" className={styles.nextButton} onClick={restart}>{ui.restart}<ArrowIcon/></button>}
        </footer>
      </section>
      <aside className={styles.sidePanel}>
        <ScoreLadder score={score} ui={ui}/>
        <ResultPanel score={score} risk={risk} history={history} ui={ui} copied={copied} onCopy={copyReport} linkCopied={linkCopied} onCopyLink={copyLink}/>
      </aside>
    </div>
    {score ? <AdcAssessment key={`${score}-${activeLang}`} score={score} lang={activeLang}/> : null}
    <footer className={styles.disclaimer}><span>i</span><p>{ui.disclaimer}</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5990997/" target="_blank" rel="noreferrer">{ui.source} ↗</a><small><Link href="/">{ui.by} <strong>RadYar</strong></Link> · {ui.developed}</small></footer>
  </main>
}
