'use client'
import { useId, useState } from 'react'
import Link from 'next/link'
import { evaluateBoston } from '@/lib/caaBoston.mjs'
import { CAA_COPY } from '@/data/caaLesson'
import { CAA_INTERACTION_COPY } from '@/data/caaInteractions'
import { BOSTON_CALCULATOR_COPY as COPY, BOSTON_SOURCE } from '@/data/bostonReference'
import styles from './BostonCalculator.module.css'
const initial = { age:'', clinical:false, lobar:0, pvs:false, wmh:false, deep:false, alternative:false }
const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de
export default function BostonCalculator({lang = 'de'}) {
  const [findings, setFindings] = useState(initial)
  const id = useId()
  const c = value => pick(value,lang)
  const result = evaluateBoston(findings)
  const update = (key,value) => setFindings(previous => ({...previous,[key]:value}))
  const check = (key,label,help) => <div className={styles.option}><label><input type="checkbox" checked={findings[key]} onChange={event => update(key,event.target.checked)} aria-describedby={help ? id+'-'+key : undefined}/><span>{c(label)}</span></label>{help && <p id={id+'-'+key}>{c(help)}</p>}</div>
  const withLang = href => lang === 'de' ? href : href.split('#')[0]+'?lang='+lang+'#'+href.split('#')[1]
  return <section className={styles.calculator} data-boston-calculator dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <p className={styles.intro}>{c(COPY.prompt)}</p>
    <fieldset><legend>1 · {c(CAA_COPY.eligibilityTitle)}</legend>
      <label className={styles.age} htmlFor={id+'-age'}>{c(COPY.age)}<input id={id+'-age'} type="number" min="1" step="1" inputMode="numeric" value={findings.age} onChange={event => update('age',event.target.value)}/></label>
      {check('clinical',COPY.clinical)}
    </fieldset>
    <fieldset><legend>2 · {c(CAA_INTERACTION_COPY.markers)}</legend>
      <label className={styles.age} htmlFor={id+'-lobar'}>{c(COPY.count)}<select id={id+'-lobar'} value={findings.lobar} onChange={event => update('lobar',Number(event.target.value))}><option value="0">0</option><option value="1">1</option><option value="2">≥2</option></select></label>
      <p className={styles.help}>{c(CAA_INTERACTION_COPY.countHelp)} {c(CAA_COPY.eligibility[1].paragraphs[1])}</p>
      {check('pvs',CAA_COPY.wm[0].title,CAA_COPY.wm[0].facts[2].text)}
      <p className={styles.help}>{c(CAA_COPY.wm[0].facts[0].text)} · {c(CAA_COPY.wm[0].facts[1].text)}</p>
      {check('wmh',CAA_COPY.wm[1].title,CAA_COPY.wm[1].facts[2].text)}
      <p className={styles.help}>{c(CAA_COPY.wm[1].facts[0].text)} · {c(CAA_COPY.wm[1].facts[1].text)}</p>
    </fieldset>
    <fieldset><legend>3 · {c(CAA_INTERACTION_COPY.exclusions)}</legend>
      {check('deep',COPY.deep)}{check('alternative',COPY.alternative)}
    </fieldset>
    <div className={styles.result} role="status" aria-live="polite" aria-atomic="true" data-category={result.category} data-reason={result.reason}>
      <span>{c({de:'MRT-Einstufung',en:'MRI classification',fa:'طبقه‌بندی MRI'})}</span><strong>{c(CAA_INTERACTION_COPY.resultTitles[result.category])}</strong><p>{c(CAA_INTERACTION_COPY.reasons[result.reason])}</p>
    </div>
    <aside className={styles.cave}><strong>Cave</strong><p>{c(COPY.cave)}</p></aside>
    <div className={styles.actions}><button type="button" onClick={() => setFindings(initial)}>{c(COPY.reset)}</button><Link href={withLang('/gehirn/vaskulaer/caa#boston')}>{c(COPY.lesson)} →</Link></div>
    <a className={styles.source} href={BOSTON_SOURCE} target="_blank" rel="noopener noreferrer">Charidimou et al. · Boston v2.0 · 2022 ↗</a>
  </section>
}
