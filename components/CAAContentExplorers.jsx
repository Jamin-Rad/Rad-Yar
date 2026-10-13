'use client'

import { useId, useState } from 'react'
import { BrainFigure, TFNETimeline, ToolHeader, Tabs } from './CAALearningTools'
import shared from './CAALearningTools.module.css'
import styles from './CAAContentExplorers.module.css'
import { CAA_FOCUSED_COPY as COPY } from '@/data/caaFocusedCopy'

const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de
function Paragraphs({ values, lang }) {
  return values.map((value, index) => <p key={index}>{pick(value, lang)}</p>)
}

function ConceptFigure({ kind, lang }) {
  const title = COPY[kind + 'Caption']
  if (kind === 'age') return <figure className={styles.concept}>
    <div className={styles.ageBand}><span>{pick(COPY.sporadic, lang)}</span><strong><bdi dir="ltr">&gt;60</bdi></strong></div>
    <div className={styles.ageBand}><span>{pick(COPY.hereditary, lang)}</span><strong className={styles.earlierOnset}>{pick(COPY.earlier, lang)}</strong><p>{pick(COPY.appMutation, lang)}</p></div>
    </figure>
  if (kind === 'sex') return <figure className={styles.concept}>
    <div className={styles.sexSchema}><span>{pick(COPY.men,lang)}</span><strong aria-hidden="true">≈</strong><span>{pick(COPY.women,lang)}</span></div>
    <figcaption>{pick(COPY.sexCaption,lang)}</figcaption>
  </figure>
  if (kind === 'amyloid') return <figure className={styles.concept}>
    <svg viewBox="0 0 380 230" role="img" aria-label={pick(title, lang)} data-no-zoom>
      <circle cx="100" cy="100" r="62" fill="#b598bf" stroke="#765287" strokeWidth="3" /><circle cx="100" cy="100" r="38" fill="#b94059" />
      {Array.from({length:16},(_,i) => <circle key={i} cx={100+Math.cos(i*Math.PI/8)*50} cy={100+Math.sin(i*Math.PI/8)*50} r="5" fill="#e6ba64" />)}
      <path d="M248 40q36-24 72 0l17 120q-59 37-105 0Z" fill="var(--caa-brain)" stroke="var(--caa-outline)" strokeWidth="3" />
      {[[266,75],[303,92],[278,129]].map(([cx,cy],i)=><g key={i}><circle cx={cx} cy={cy} r="14" fill="#e6ba64" opacity=".4" /><circle cx={cx} cy={cy} r="7" fill="#b98632" /></g>)}
    </svg><div className={styles.figureLabels}><span>{pick(COPY.wall, lang)}</span><span>{pick(COPY.plaques, lang)}</span></div><figcaption>{pick(title, lang)}</figcaption>
  </figure>
  if (kind === 'down') return <figure className={styles.concept}>
    <svg viewBox="0 0 360 200" role="img" aria-label={pick(title,lang)} data-no-zoom>
      {[90,180,270].map((x,i)=><g key={i}><path d={'M'+(x-17)+' 38l34 100M'+(x+17)+' 38l-34 100'} stroke="var(--caa-outline)" strokeWidth="15" strokeLinecap="round" /><circle cx={x} cy="86" r="10" fill="#e6ba64" /><text x={x} y="172" textAnchor="middle" fill="var(--ink)" fontSize="18">APP</text></g>)}
    </svg><div className={styles.figureLabels}><span>{pick(COPY.chromosome,lang)}</span><strong>{pick(COPY.moreAmyloid,lang)}</strong></div><figcaption>{pick(title,lang)}</figcaption>
  </figure>
  if (kind === 'cognition') return <figure className={styles.concept}>
    <div className={styles.contributors}><span>{pick(COPY.vascular,lang)}</span><span>{pick(COPY.alzheimer,lang)}</span></div>
    <svg viewBox="0 0 360 72" aria-hidden="true"><path d="M90 8v22l90 30 90-30V8M180 58v10" fill="none" stroke="var(--caa-outline)" strokeWidth="3" /><path d="m169 58 11 10 11-10" fill="none" stroke="var(--caa-outline)" strokeWidth="3" /></svg>
    <strong className={styles.cognitionTarget}>{pick(COPY.cognition,lang)}</strong><figcaption>{pick(title,lang)}</figcaption>
  </figure>
  if (kind === 'seizure') return <figure className={styles.concept}>
    <svg viewBox="0 0 360 220" role="img" aria-label={pick(title,lang)} data-no-zoom>
      <path d="M165 25C97 4 42 62 59 110C37 158 99 198 165 169M195 25C263 4 318 62 301 110C323 158 261 198 195 169M126 52q-50 12-33 49M99 126q8 38 43 28M234 52q50 12 33 49M261 126q-8 38-43 28" fill="var(--caa-brain)" stroke="var(--caa-outline)" strokeWidth="3" />
      <path d="M33 106h65l10-17 12 42 13-73 15 71 11-24h33l10-16 12 31 14-65 15 67 11-16h63" fill="none" stroke="#c9536c" strokeWidth="4" strokeLinejoin="round" />
    </svg><strong>{pick(COPY.irritation,lang)}</strong><figcaption>{pick(title,lang)}</figcaption>
  </figure>
  return <figure className={styles.concept}>
    <svg viewBox="0 0 360 220" role="img" aria-label={pick(COPY.headacheCaption,lang)} data-no-zoom>
      <path d="M135 180v-25C81 131 78 66 113 35C151 0 227 20 242 65l24 42-23 9-7 41h-44v29" fill="var(--caa-brain)" stroke="var(--caa-outline)" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="157" cy="70" r="24" fill="#df81934d" stroke="#c9536c" strokeWidth="3" /><path d="m154 52-9 19 14-4-6 21" fill="none" stroke="#c9536c" strokeWidth="3" />
    </svg><strong>{pick(COPY.nonspecific,lang)}</strong><figcaption>{pick(COPY.headacheCaption,lang)}</figcaption>
  </figure>
}

export function AssociationExplorer({ title, items, lang }) {
  const [association, setAssociation] = useState(0)
  const id = 'caa-associations-' + useId().replaceAll(':', '')
  return <div className={shared.panel + ' ' + styles.focused} data-learning-tool="associations">
    <ToolHeader title={title} lang={lang} as="h4" />
    <Tabs items={COPY.backgroundTabs.slice(2)} value={association} onChange={setAssociation} id={id} label={title} lang={lang} />
    <div id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + association} className={shared.explorerBody}>
      <ConceptFigure kind={association === 0 ? 'amyloid' : 'down'} lang={lang} />
      <div className={shared.copy}><h5 className={styles.associationTitle}>{pick(items[association].title, lang)}</h5><Paragraphs values={items[association].paragraphs} lang={lang} /></div>
    </div>
  </div>
}

export function BackgroundExplorer({ title, items, lang, showTitle = true }) {
  const [topic,setTopic]=useState(0)
  const id='caa-background-'+useId().replaceAll(':','')
  return <div className={shared.panel + ' ' + styles.focused} data-learning-tool="background">
    {showTitle && <ToolHeader title={title} lang={lang} />}
    <div className={styles.demographicTabs}><Tabs items={COPY.demographicTabs} value={topic} onChange={setTopic} id={id} label={title} lang={lang} /></div>
    <div id={id+'-panel'} role="tabpanel" aria-labelledby={id+'-tab-'+topic} className={shared.explorerBody}>
      {topic === 0 ? <BrainFigure pattern="lobar" lang={lang} /> : <ConceptFigure kind={topic === 1 ? 'age' : 'sex'} lang={lang} />}
      <div className={shared.copy}><h4>{pick(items[topic].title,lang)}</h4><Paragraphs values={items[topic].paragraphs} lang={lang} /></div>
    </div>
  </div>
}

export function ClinicalExplorer({ title, items, kind, lang, showTitle = true }) {
  const [symptom,setSymptom]=useState(0)
  const id='caa-'+kind+'-'+useId().replaceAll(':','')
  const acute=kind==='acute'
  const tfne=acute&&symptom===1
  return <div className={shared.panel + ' ' + styles.focused} data-learning-tool={kind}>
    {showTitle && <ToolHeader title={title} lang={lang} />}
    <Tabs items={acute?COPY.acuteTabs:COPY.otherTabs} value={symptom} onChange={setSymptom} id={id} label={title} lang={lang} />
    <div id={id+'-panel'} role="tabpanel" aria-labelledby={id+'-tab-'+symptom}>
      {acute&&<div hidden={!tfne}>
        <div className={shared.copy + ' ' + styles.tfneDefinition}><h4>{pick(items[1].title,lang)}</h4><Paragraphs values={items[1].paragraphs} lang={lang}/></div>
        <TFNETimeline lang={lang} embedded />
      </div>}
      <div className={shared.explorerBody + ' ' + styles.clinicalVisual} hidden={tfne}>
        {acute?<BrainFigure pattern="ich" lang={lang}/>:<ConceptFigure kind={['cognition','seizure','headache'][symptom]} lang={lang}/>}
        <div className={shared.copy}><h4>{pick(items[symptom].title,lang)}</h4><Paragraphs values={items[symptom].paragraphs} lang={lang}/></div>
      </div>
    </div>
  </div>
}

function DiagnosisPane({ row, pattern, lang, findings, reference, id }) {
  return <section className={styles.diagnosisPane + (reference?' '+styles.referencePane:'')} aria-labelledby={id}>
    <h4 id={id}>{pick(row[0],lang)}</h4><BrainFigure pattern={findings?pattern:'none'} lang={lang}/>
    <dl className={shared.facts}>
      <div><dt>{pick(COPY.distribution,lang)}</dt><dd>{pick(row[1],lang)}</dd></div>
      <div><dt>{pick(COPY.distinction,lang)}</dt><dd>{pick(row[2],lang)}</dd></div>
    </dl>
  </section>
}

export function DifferentialComparison({ rows, lang }) {
  const [diagnosis,setDiagnosis]=useState(1)
  const [findings,setFindings]=useState(true)
  const id='caa-dd-'+useId().replaceAll(':','')
  return <div className={shared.panel} data-learning-tool="differentials">
    <ToolHeader title={COPY.ddTitle} hint={COPY.ddHint} lang={lang}/>
    <div className={styles.comparisonControls}>
      <label htmlFor={id+'-select'}>{pick(COPY.compareWith,lang)}<select id={id+'-select'} value={diagnosis} onChange={event=>setDiagnosis(Number(event.target.value))} aria-controls={id+'-comparison'}>
        {rows.slice(1).map((row,index)=><option key={index} value={index+1}>{pick(row[0],lang)}</option>)}
      </select></label>
      <label className={styles.findingsToggle}><input type="checkbox" checked={findings} onChange={event=>setFindings(event.target.checked)}/><span>{pick(COPY.showFindings,lang)}</span></label>
    </div>
    <p className={styles.keyDifference}>{pick(COPY.ddCues[diagnosis-1],lang)}</p>
    <div className={styles.comparisonGrid} id={id+'-comparison'} data-comparison={diagnosis}>
      <DiagnosisPane row={rows[0]} pattern="lobar" lang={lang} findings={findings} reference id={id+'-reference'}/>
      <DiagnosisPane row={rows[diagnosis]} pattern={['none','deep','avm','cavernoma','tumour'][diagnosis]} lang={lang} findings={findings} id={id+'-selected'}/>
    </div>
  </div>
}
