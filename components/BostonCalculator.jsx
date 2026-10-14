'use client'
import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { evaluateBoston } from '@/lib/caaBoston.mjs'
import { CAA_COPY } from '@/data/caaLesson'
import { CAA_INTERACTION_COPY } from '@/data/caaInteractions'
import { BOSTON_CALCULATOR_COPY as COPY, BOSTON_WIZARD_COPY as WIZARD, BOSTON_SOURCE } from '@/data/bostonReference'
import styles from './BostonCalculator.module.css'
const initial = { age:null, clinical:null, lobar:null, pvs:null, wmh:null, deep:null, alternative:null }
const stepKeys = [['age','clinical','deep','alternative'], ['lobar'], ['pvs','wmh']]
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de
function Question({ id, name, title, hint, value, choices, onChange, lang }) {
  return <fieldset className={styles.question} data-question={name}>
    <legend>{pick(title,lang)}</legend>
    {hint && <p id={id+'-help'} className={styles.help}>{pick(hint,lang)}</p>}
    <div className={styles.choices}>{choices.map(choice => <label key={String(choice.value)} data-selected={value === choice.value}>
      <input type="radio" name={id} value={String(choice.value)} checked={value === choice.value} aria-describedby={hint ? id+'-help' : undefined} onChange={() => onChange(name,choice.value)} />
      <span>{pick(choice.label,lang)}</span>
    </label>)}</div>
  </fieldset>
}
export default function BostonCalculator({lang = 'de'}) {
  const [findings, setFindings] = useState(initial)
  const [step, setStep] = useState(0)
  const [visited, setVisited] = useState(0)
  const heading = useRef(null)
  const calculator = useRef(null)
  const id = useId()
  const c = value => pick(value,lang)
  useEffect(() => { heading.current?.focus({preventScroll:true}); calculator.current?.scrollIntoView({block:'start',behavior:'instant'}) }, [step])
  const update = (key,value) => setFindings(previous => ({...previous,[key]:value}))
  const ready = step < 3 && stepKeys[step].every(key => findings[key] !== null)
  const result = step === 3 ? evaluateBoston({...findings, age:findings.age ? 50 : 49}) : null
  const yesNo = [{value:true,label:WIZARD.yes},{value:false,label:WIZARD.no}]
  const question = (key,title,hint,choices = yesNo) => <Question key={key} id={id+'-'+key} name={key} title={title} hint={hint} value={findings[key]} choices={choices} onChange={update} lang={lang} />
  const next = () => { if (!ready) return; setVisited(previous => Math.max(previous,Math.min(step+1,2))); setStep(step+1) }
  const reset = () => {setFindings(initial);setStep(0);setVisited(0)}
  const lessonHref = '/gehirn/vaskulaer/caa'+(lang === 'de' ? '' : '?lang='+lang)+'#boston'
  return <section ref={calculator} className={styles.calculator} data-boston-calculator data-stage={step === 3 ? 'result' : String(step+1)} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <nav aria-label={c(WIZARD.progress)}><ol className={styles.progress}>{WIZARD.steps.map((title,index) => <li key={index}>
      <button type="button" onClick={() => setStep(index)} disabled={index > visited} aria-current={step === index ? 'step' : undefined} data-done={index < step}><span>{index+1}</span><strong>{c(title)}</strong></button>
    </li>)}</ol></nav>
    <h3 className={styles.heading} ref={heading} tabIndex={-1}>{c(step === 3 ? WIZARD.result : WIZARD.steps[step])}</h3>
    {step === 0 && <div className={styles.stage}>
      {question('age',COPY.age)}
      {question('clinical',WIZARD.clinicalTitle,COPY.clinical)}
      <div className={styles.exclusions}><h4>{c(CAA_INTERACTION_COPY.exclusions)}</h4>
        {question('deep',COPY.deep)}{question('alternative',COPY.alternative,CAA_COPY.eligibility[2].paragraphs[0])}
      </div>
    </div>}
    {step === 1 && <div className={styles.stage}>
      {question('lobar',COPY.count,CAA_INTERACTION_COPY.countHelp,[{value:0,label:WIZARD.none},{value:1,label:'1'},{value:2,label:'≥2'}])}
      <p className={styles.help}>{c(CAA_COPY.eligibility[1].paragraphs[1])}</p>
    </div>}
    {step === 2 && <div className={styles.stage}>
      {CAA_COPY.wm.map((marker,index) => <div key={index}>
        {question(index === 0 ? 'pvs' : 'wmh',marker.title,marker.facts[2].text)}
        <p className={styles.help}>{c(marker.facts[0].text)} · {c(marker.facts[1].text)}</p>
      </div>)}
    </div>}
    {result && <>
      <div className={styles.result} role="status" aria-live="polite" aria-atomic="true" data-category={result.category} data-reason={result.reason}>
        <strong>{c(CAA_INTERACTION_COPY.resultTitles[result.category])}</strong><p>{c(CAA_INTERACTION_COPY.reasons[result.reason])}</p>
      </div>
      <details className={styles.review}><summary>{c(WIZARD.reviewed)}</summary><dl>{Object.keys(initial).map(key => <div key={key}><dt>{c({age:COPY.age,clinical:WIZARD.clinicalTitle,lobar:COPY.count,pvs:CAA_COPY.wm[0].title,wmh:CAA_COPY.wm[1].title,deep:COPY.deep,alternative:COPY.alternative}[key])}</dt><dd>{key === 'lobar' ? findings.lobar === 2 ? '≥2' : findings.lobar : c(findings[key] ? WIZARD.yes : WIZARD.no)}</dd></div>)}</dl></details>
      <aside className={styles.cave}><strong>Cave</strong><p>{c(COPY.cave)}</p></aside>
    </>}
    {step < 3 && !ready && <p className={styles.answerHint}>{c(WIZARD.answerAll)}</p>}
    <div className={styles.controls}>
      {step > 0 && <button type="button" onClick={() => setStep(step-1)}>{c(WIZARD.back)}</button>}
      <button type="button" onClick={reset}>{c(COPY.reset)}</button>
      {step < 3 && <button type="button" className={styles.next} disabled={!ready} onClick={next}>{c(step === 2 ? WIZARD.show : WIZARD.next)} →</button>}
    </div>
    <Link className={styles.lessonLink} href={lessonHref}>{c(COPY.lesson)} →</Link>
    <a className={styles.source} href={BOSTON_SOURCE} target="_blank" rel="noopener noreferrer">Charidimou et al. · Boston v2.0 · 2022 ↗</a>
  </section>
}
