'use client'

import { useRef, useState } from 'react'
import { MIGRAINE_IMAGE, MIGRAINE_CASES, MIGRAINE_SECTIONS, MIGRAINE_SOURCES } from '@/data/migraine'
import { MIGRAINE_HOTSPOTS, MIGRAINE_PEARLS, MIGRAINE_PROTOCOL_SCENARIOS } from '@/data/migraineInteractive'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de

export function PracticalPearl({ id, lang }) {
  if (!MIGRAINE_PEARLS[id]) return null
  return <aside className={styles.practicalPearl} data-practical-pearl={id}><strong>{pick(L('Für die Praxis', 'In practice', 'در عمل'), lang)}</strong><p>{pick(MIGRAINE_PEARLS[id], lang)}</p></aside>
}

export function MriHotspots({ lang }) {
  const [selected, setSelected] = useState(0)
  const [annotations, setAnnotations] = useState(true)
  const viewport = useRef(null)
  const c = value => pick(value, lang)
  const active = MIGRAINE_HOTSPOTS[selected]
  const select = index => {
    setSelected(index)
    const container = viewport.current
    if (container) container.scrollTo({ left: container.scrollWidth * MIGRAINE_HOTSPOTS[index].x / 100 - container.clientWidth / 2, behavior: 'instant' })
  }
  return <figure className={styles.imagingFigure} data-mri-hotspots>
    <h4>{c(MIGRAINE_IMAGE.title)}</h4>
    <p className={styles.paragraph}>{c(L('Wähle einen Punkt oder einen der vier Bildhinweise. Die gelben Pfeile gehören zur Originalabbildung.', 'Select a point or one of the four image guides. Yellow arrows belong to the original figure.', 'یک نقطه یا یکی از چهار راهنمای تصویر را انتخاب کنید. پیکان‌های زرد بخشی از شکل اصلی‌اند.'))}</p>
    <div className={styles.imageToolbar}><button type="button" className={styles.checkButton} aria-pressed={annotations} onClick={() => setAnnotations(value => !value)}>{c(annotations ? L('Lernpunkte ausblenden', 'Hide learning points', 'پنهان کردن نقاط آموزشی') : L('Lernpunkte einblenden', 'Show learning points', 'نمایش نقاط آموزشی'))}</button><a href={MIGRAINE_IMAGE.src} target="_blank" rel="noopener noreferrer">{c(L('Original in voller Größe ↗', 'Full-size original ↗', 'تصویر اصلی در اندازه کامل ↗'))}</a></div>
    <div className={styles.imageViewport} ref={viewport} dir="ltr" tabIndex={0} role="region" aria-label={c(L('MRT-Abbildung; auf schmalen Bildschirmen horizontal verschiebbar', 'MRI figure; scroll horizontally on narrow screens', 'تصویر MRI؛ در صفحه باریک قابل حرکت افقی'))}>
      <div className={styles.hotspotCanvas}><img src={MIGRAINE_IMAGE.src} width={MIGRAINE_IMAGE.width} height={MIGRAINE_IMAGE.height} alt={c(MIGRAINE_IMAGE.alt)} loading="lazy" decoding="async" />{annotations ? MIGRAINE_HOTSPOTS.map((point, index) => <button type="button" key={point.id} className={`${styles.hotspot} ${selected === index ? styles.hotspotActive : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} aria-label={`${index + 1}: ${c(point.label)}`} aria-pressed={selected === index} aria-controls="migraine-image-detail" onClick={() => select(index)}><span>{index + 1}</span></button>) : null}</div>
    </div>
    <p className={styles.imageHint}>{c(L('Auf dem Handy: Bild seitlich bewegen oder einen Hinweis wählen.', 'On mobile: swipe the image sideways or select a guide.', 'در موبایل: تصویر را افقی حرکت دهید یا یک راهنما انتخاب کنید.'))}</p>
    <div className={styles.segmented} role="group" aria-label={c(L('Bildhinweise', 'Image guides', 'راهنماهای تصویر'))}>{MIGRAINE_HOTSPOTS.map((point, index) => <button type="button" key={point.id} aria-pressed={selected === index} aria-controls="migraine-image-detail" onClick={() => select(index)}><bdi>{index + 1}</bdi> {c(point.label)}</button>)}</div>
    <div id="migraine-image-detail" className={styles.interactiveDetail} aria-live="polite"><strong>{c(active.label)}</strong><p>{c(active.text)}</p></div>
    <figcaption><p>{c(MIGRAINE_IMAGE.caption)}</p><p>{c(L('Zusätzliche Lernpunkte als separate Oberfläche; Originaldatei unverändert.', 'Learning points are a separate overlay; the original image file is unchanged.', 'نقاط آموزشی در لایه‌ای جدا اضافه شده‌اند؛ فایل تصویر اصلی تغییری نکرده است.'))}</p><a href={MIGRAINE_IMAGE.source} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{MIGRAINE_IMAGE.credit}</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></figcaption>
  </figure>
}

export function AuraComparison({ lang }) {
  const [feature, setFeature] = useState(0)
  const [answer, setAnswer] = useState(null)
  const c = value => pick(value, lang)
  const section = MIGRAINE_SECTIONS.find(item => item.id === 'stroke-mimic')
  const row = section.rows[feature]
  return <div className={styles.interactiveTool} data-aura-comparison>
    <div className={styles.toolHeader}><h4>{c(L('Aura und Ischämie im direkten Vergleich', 'Compare aura and ischaemia', 'مقایسه مستقیم اورا و ایسکمی'))}</h4><p>{c(L('Wechsle zwischen Verlauf, Diffusion und Perfusion. Dies sind typische Muster mit Überschneidungen, keine Ausschlussregeln.', 'Switch between course, diffusion and perfusion. These are overlapping patterns, not exclusion rules.', 'بین سیر علائم، انتشار و پرفیوژن جابه‌جا شوید. این الگوها هم‌پوشانی دارند و قواعد قطعی رد تشخیص نیستند.'))}</p></div>
    <div className={styles.segmented} role="group" aria-label={c(L('Vergleichsmerkmal', 'Comparison feature', 'ویژگی مقایسه'))}>{section.rows.map((item, index) => <button type="button" key={index} aria-pressed={feature === index} aria-controls="migraine-comparison-detail" onClick={() => setFeature(index)}>{c(item[0])}</button>)}</div>
    <div id="migraine-comparison-detail" className={styles.comparisonGrid} aria-live="polite"><div><span>{c(section.headers[1])}</span><h4>{c(row[0])}</h4><p>{c(row[1])}</p></div><div><span>{c(section.headers[2])}</span><h4>{c(row[0])}</h4><p>{c(row[2])}</p></div></div>
    <fieldset className={styles.quickDecision}><legend>{c(L('Transferfrage: neue Hemiparese, frühe DWI negativ. Was jetzt?', 'Apply it: new hemiparesis, early DWI negative. What next?', 'کاربرد: همی‌پارزی جدید و DWI زودرس منفی. گام بعدی چیست؟'))}</legend><div className={styles.segmented}>{[L('Als Aura abschließen', 'Conclude aura', 'نتیجه‌گیری به نفع اورا'), L('Stroke-Pfad fortführen', 'Continue stroke pathway', 'ادامه مسیر سکته')].map((option, index) => <button key={index} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)}>{c(option)}</button>)}</div></fieldset>
    {answer !== null ? <div className={`${styles.feedback} ${answer === 0 ? styles.feedbackWrong : ''}`} role="status"><strong>{c(answer === 1 ? L('Richtig: Akutabklärung fortführen.', 'Correct: continue acute assessment.', 'درست: بررسی حاد را ادامه دهید.') : L('Noch nicht: Die DWI ist kein sicherer Ausschlusstest.', 'Not quite: DWI is not a reliable exclusion test.', 'درست نیست: DWI آزمون قطعی رد سکته نیست.'))}</strong><p>{c(section.warning)}</p></div> : null}
  </div>
}

export function ProtocolTrainer({ lang }) {
  const [scenarioId, setScenarioId] = useState('stable')
  const [stepIndex, setStepIndex] = useState(0)
  const [choice, setChoice] = useState(null)
  const [complete, setComplete] = useState(false)
  const c = value => pick(value, lang)
  const scenario = MIGRAINE_PROTOCOL_SCENARIOS.find(item => item.id === scenarioId)
  const original = MIGRAINE_CASES.find(item => item.id === scenario.caseId)
  const step = scenario.steps[stepIndex]
  const reset = (id = scenarioId) => { setScenarioId(id); setStepIndex(0); setChoice(null); setComplete(false) }
  return <div className={styles.interactiveTool} data-protocol-trainer>
    <div className={styles.toolHeader}><h4>{c(L('Protokoll schrittweise wählen', 'Choose the protocol step by step', 'انتخاب مرحله‌ای پروتکل'))}</h4><p>{c(L('Zuerst die Dringlichkeit, dann die passende Untersuchung. Lehrfälle, kein Entscheidungsrechner.', 'Choose urgency first, then the examination. Teaching cases, not a decision calculator.', 'ابتدا فوریت، سپس بررسی مناسب را انتخاب کنید. این‌ها کیس آموزشی‌اند، نه ابزار محاسبه تصمیم.'))}</p></div>
    <fieldset className={styles.caseChoices}><legend className={styles.srOnly}>{c(L('Protokollfall wählen', 'Choose protocol scenario', 'انتخاب سناریوی پروتکل'))}</legend>{MIGRAINE_PROTOCOL_SCENARIOS.map(item => <label key={item.id} className={scenarioId === item.id ? styles.caseSelected : ''}><input type="radio" name="migraine-protocol-case" checked={scenarioId === item.id} onChange={() => reset(item.id)} /><span>{c(item.label || MIGRAINE_CASES.find(entry => entry.id === item.caseId).label)}</span></label>)}</fieldset>
    <p className={styles.caseStory}>{c(scenario.story || original.story)}</p>
    {complete ? <div className={styles.interactiveDetail} role="status"><strong>{c(L('Beide Schritte begründet', 'Both decisions explained', 'هر دو تصمیم با دلیل انجام شد'))}</strong><p>{c(step.explanation)}</p><button type="button" className={styles.checkButton} onClick={() => reset()}>{c(L('Fall erneut üben', 'Retry this scenario', 'تمرین دوباره سناریو'))}</button></div> : <div className={styles.protocolStep}>
      <p className={styles.stepCounter}>{c(L('Entscheidung', 'Decision', 'تصمیم'))} <bdi dir="ltr">{stepIndex + 1} / {scenario.steps.length}</bdi></p>
      <fieldset className={styles.quickDecision}><legend>{c(step.question)}</legend><div className={styles.options}>{step.options.map((option, index) => <label key={`${scenarioId}-${stepIndex}-${index}`} className={choice === index ? styles.optionSelected : ''}><input type="radio" name={`protocol-${scenarioId}-${stepIndex}`} checked={choice === index} onChange={() => setChoice(index)} /><span>{c(option)}</span></label>)}</div></fieldset>
      {choice !== null ? <div className={`${styles.feedback} ${choice !== step.correct ? styles.feedbackWrong : ''}`} role="status"><strong>{c(choice === step.correct ? L('Richtig.', 'Correct.', 'درست است.') : L('Noch einmal überlegen.', 'Reconsider your choice.', 'دوباره فکر کنید.'))}</strong><p>{c(step.explanation)}</p></div> : null}
      <div className={styles.stepActions}>{stepIndex > 0 ? <button type="button" className={styles.checkButton} onClick={() => { setStepIndex(index => index - 1); setChoice(null) }}>{c(L('Zurück', 'Back', 'قبلی'))}</button> : null}<button type="button" className={styles.checkButton} disabled={choice !== step.correct} onClick={() => { if (stepIndex === scenario.steps.length - 1) setComplete(true); else { setStepIndex(index => index + 1); setChoice(null) } }}>{c(stepIndex === scenario.steps.length - 1 ? L('Fall abschließen', 'Finish scenario', 'پایان سناریو') : L('Zur Untersuchung', 'Choose examination', 'انتخاب بررسی'))}</button></div>
    </div>}
    <div className={styles.citations}><span>{c(L('Quellen', 'Sources', 'منابع'))}:</span>{scenario.sources.map(id => { const source = MIGRAINE_SOURCES.find(item => item.id === id); return <a key={id} href={source.url} target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">{source.title}</a> })}</div>
  </div>
}
