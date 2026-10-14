'use client'

import { Fragment, useId, useState } from 'react'
import { CAA_INTERACTION_COPY as COPY } from '@/data/caaInteractions'
import styles from './CAALearningTools.module.css'
import CAAWhiteMatterMRI from './CAAWhiteMatterMRI'

const pick = (value, lang) => typeof value === 'string' ? value : value[lang] || value.de
const corticalDots = [[141, 59], [263, 65], [84, 109], [313, 118], [61, 172], [331, 188], [65, 246], [329, 254], [105, 311], [288, 320], [148, 360], [250, 360]]
const deepDots = [[151, 178], [249, 178], [173, 214], [227, 214]]
const sulci = ['M111 77Q86 88 101 107Q118 125 94 136', 'M70 174Q91 181 82 201Q77 214 103 220', 'M288 89Q314 100 297 119Q282 129 305 147']

export function ToolHeader({ title, hint, lang, as: Heading = 'h3', headingClassName }) {
  return <header className={styles.toolHeader}><Heading className={headingClassName}>{pick(title, lang)}</Heading>{hint && <p>{pick(hint, lang)}</p>}</header>
}

export function Tabs({ items, value, onChange, id, label, lang }) {
  const select = (event, index) => {
    const delta = lang === 'fa' ? -1 : 1
    let next = index
    if (event.key === 'ArrowRight') next = (index + delta + items.length) % items.length
    else if (event.key === 'ArrowLeft') next = (index - delta + items.length) % items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = items.length - 1
    else return
    event.preventDefault()
    onChange(next)
    event.currentTarget.parentElement.children[next].focus()
  }
  return <div className={styles.tabs} role="tablist" aria-label={pick(label, lang)}>
    {items.map((item, index) => <button type="button" key={index} role="tab" id={id + '-tab-' + index}
      aria-selected={value === index} aria-controls={id + '-panel'} tabIndex={value === index ? 0 : -1}
      onClick={() => onChange(index)} onKeyDown={event => select(event, index)}>{pick(item, lang)}</button>)}
  </div>
}

function Legend({ items, lang }) {
  return <div className={styles.legend}>{items.map(([label, color], index) => <span key={index}><i style={{ background: color }} />{pick(label, lang)}</span>)}</div>
}

export function BrainFigure({ pattern, caption, lang, lesionCount }) {
  const lobar = ['cmb', 'lobar', 'mixed'].includes(pattern)
  const deep = ['deep', 'mixed'].includes(pattern)
  return <figure className={styles.figure} data-pattern={pattern}>
    <svg viewBox="0 0 400 400" role="img" aria-label={pick(caption || COPY.schematic, lang)} data-no-zoom>
      <image href="/educational/caa-axial-anatomy-v1.webp" width="400" height="400" />
      {pattern === 'ich' && <path d="M91 123C68 125 66 153 79 170C91 182 110 169 114 149C119 135 105 118 91 123Z" fill="#d94856" stroke="#8f2547" strokeWidth="3" />}
      {lobar && corticalDots.slice(0, lesionCount ?? corticalDots.length).map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="4.7" fill="#53205f" stroke="#f0c2f0" strokeWidth="1.2" />)}
      {deep && deepDots.map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="5.7" fill="#087e88" stroke="#bceeee" strokeWidth="1.2" />)}
      {pattern === 'avm' && <g fill="none" strokeLinecap="round">
        <path d="M63 142Q104 124 87 160Q65 182 113 175Q136 145 99 137Q72 133 107 187Q136 199 141 161" stroke="#bb4460" strokeWidth="6" />
        <path d="M92 135Q114 104 137 91M117 184Q151 194 163 227" stroke="#367a99" strokeWidth="5" />
      </g>}
      {pattern === 'cavernoma' && <g>
        <path d="M74 146Q68 123 87 116Q103 105 118 118Q139 124 132 145Q139 164 119 171Q101 185 86 171Q65 166 74 146Z" fill="#542556" stroke="#281331" strokeWidth="5" />
        {[[86,132,'#dd7887'],[106,124,'#b79a73'],[119,141,'#f1b2b8'],[101,152,'#943c59'],[85,157,'#b87f74'],[116,163,'#caa276']].map(([cx,cy,fill],i)=><circle key={i} cx={cx} cy={cy} r="9" fill={fill}/>)}
      </g>}
      {pattern === 'tumour' && <g>
        {[[91,143,20],[290,287,14]].map(([cx,cy,r],i)=><g key={i}><circle cx={cx} cy={cy} r={r+19} fill="#8fb7d5" opacity=".55"/><circle cx={cx} cy={cy} r={r} fill="#ac456c" stroke="#efafba" strokeWidth="4"/><circle cx={cx-3} cy={cy+2} r={r/2} fill="#622550"/></g>)}
      </g>}
      {['csah', 'css'].includes(pattern) && sulci.map((d, index) => <path key={index} d={d} fill="none" stroke={pattern === 'csah' ? '#df4557' : '#512454'} strokeWidth={pattern === 'csah' ? 7 : 4} strokeLinecap="round" />)}
    </svg>
    <figcaption>{pick(caption || COPY.schematic, lang)}</figcaption>
  </figure>
}

export function VesselExplorer({ lang, headingLevel = 'h3', description }) {
  const [stage, setStage] = useState(0)
  const id = 'caa-vessel-' + useId().replaceAll(':', '')
  const item = COPY.vesselStages[stage]
  return <div className={styles.panel} data-learning-tool="vessel">
    <ToolHeader title={COPY.vesselTitle} hint={description} lang={lang} as={headingLevel} />
    <Tabs items={COPY.vesselStages.map(item => item.title)} value={stage} onChange={setStage} id={id} label={COPY.vesselTitle} lang={lang} />
    <div id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + stage} className={styles.explorerBody}>
      <figure className={styles.figure} data-vessel-stage={stage}>
        <svg viewBox="0 0 400 300" role="img" aria-label={pick(item.title, lang)} data-no-zoom>
          <circle cx="200" cy="150" r="97" fill="#b598bf" stroke="#7a5789" strokeWidth="3" />
          <circle cx="200" cy="150" r={stage ? 55 : 65} fill="#b94059" stroke="#f8a6b2" strokeWidth="4" />
          <circle cx="183" cy="130" r="10" fill="#e16b80" /><circle cx="215" cy="167" r="11" fill="#e16b80" />
          <circle cx="180" cy="172" r="8" fill="#e16b80" />
          {stage > 0 && Array.from({ length: 22 }, (_, index) => {
            const angle = index * Math.PI * 2 / 22
            return <circle key={index} cx={200 + Math.cos(angle) * 78} cy={150 + Math.sin(angle) * 78} r={index % 3 === 0 ? 8 : 6} fill="#e6ba64" stroke="#a87329" strokeWidth="1" />
          })}
          {stage === 2 && <><path d="M253 98l-6 16 18 11-8 15 28 11-12 18 16 12" fill="none" stroke="#fff5ed" strokeWidth="8" strokeLinejoin="round" />
            <path d="M294 164q29 10 43 36" fill="none" stroke="#c7465b" strokeWidth="6" strokeLinecap="round" />
            <circle cx="340" cy="210" r="10" fill="#d94f64" /><circle cx="314" cy="221" r="7" fill="#d94f64" /></>}
        </svg><figcaption>{pick(COPY.vesselCaption, lang)}</figcaption>
      </figure>
      <div className={styles.copy}><h4>{pick(item.title, lang)}</h4><p>{pick(item.text, lang)}</p>
        <Legend items={[[COPY.wall, '#b598bf'], [COPY.blood, '#b94059'], ...(stage ? [[COPY.amyloid, '#e6ba64']] : [])]} lang={lang} />
      </div>
    </div>
  </div>
}

export function MarkerAtlas({ copy, lang, headingLevel = 'h3', headingClassName }) {
  const [marker, setMarker] = useState(0)
  const id = 'caa-marker-' + useId().replaceAll(':', '')
  const row = copy.markerRows[marker]
  return <div className={styles.panel} data-learning-tool="atlas">
    <ToolHeader title={COPY.atlasTitle} lang={lang} as={headingLevel} headingClassName={headingClassName} />
    <Tabs items={COPY.markerTabs} value={marker} onChange={setMarker} id={id} label={COPY.atlasTitle} lang={lang} />
    <div id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + marker} className={styles.explorerBody}>
      <BrainFigure pattern={['ich', 'cmb', 'csah', 'css'][marker]} lang={lang} />
      <div className={styles.copy}><h4>{pick(row[0], lang)}</h4><dl className={styles.facts}>
        <div><dt>{pick(COPY.location, lang)}</dt><dd>{pick(row[1][0], lang)}</dd></div>
        <div><dt>{pick(COPY.sequence, lang)}</dt><dd><bdi>{pick(row[1][1], lang)}</bdi></dd></div>
        <div><dt>{pick(COPY.appearance, lang)}</dt><dd>{row[2].map((value, index) => <p key={index}>{pick(value, lang)}</p>)}</dd></div>
      </dl></div>
    </div>
  </div>
}

export function WhiteMatterMarkers({ items, lang, title }) {
  const [selected, setSelected] = useState(0)
  const id = 'caa-wm-' + useId().replaceAll(':', '')
  const item = items[selected]
  return <div className={styles.wmRows} data-learning-tool="wm">
    <Tabs items={items.map(item => item.tab)} value={selected} onChange={setSelected} id={id} label={title} lang={lang} />
    <div className={styles.wmBody} id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + selected}>
      <CAAWhiteMatterMRI marker={selected === 0 ? 'pvs' : 'wmh'} lang={lang} />
      <div className={styles.wmCopy}>
        <h5>{pick(item.title, lang)}</h5>
        {item.paragraphs.map((text, index) => <p key={index}>{pick(text, lang)}</p>)}
      </div>
    </div>
  </div>
}

function WhiteMatterRules({ items, lang, attention }) {
  return <div className={styles.wmRules} data-learning-tool="wm-rules">{items.map((item, index) =>
    <section key={index} className={styles.wmRule} aria-labelledby={`caa-wm-rule-${index}`}>
      <h5 id={`caa-wm-rule-${index}`}>{pick(item.title, lang)}</h5>
      <dl className={styles.wmFacts}>{item.facts.map((fact, i) => <div key={i}><dt>{pick(fact.label, lang)}</dt><dd><bdi>{pick(fact.text, lang)}</bdi></dd></div>)}</dl>
      <p className={styles.wmNote}><strong>{pick(attention, lang)}:</strong> {pick(item.note, lang)}</p>
    </section>
  )}</div>
}

export function BostonCountingGuide({ copy, lang }) {
  const [selected, setSelected] = useState(0)
  const id = 'caa-counting-' + useId().replaceAll(':', '')
  return <div className={styles.countingGuide} data-learning-tool="counting">
    <Tabs items={copy.countingTabs} value={selected} onChange={setSelected} id={id} label={copy.countingGuideTitle} lang={lang} />
    <div className={styles.countingPanel} id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + selected} data-counting-kind={selected === 0 ? 'bleeding' : 'wm'}>
      {selected === 0 ? copy.counting.map((text, index) => <p key={index}>{pick(text, lang)}</p>) : <WhiteMatterRules items={copy.wm} lang={lang} attention={copy.attention} />}
    </div>
  </div>
}

export function BostonCategories({ copy, lang }) {
  const [category, setCategory] = useState(0)
  const id = 'caa-categories-' + useId().replaceAll(':', '')
  const routes = category === 0
    ? [{ value: '≥2', label: copy.hemorrhages }, { value: '1 + 1', label: copy.combination }]
    : [{ value: '1', label: copy.hemorrhageSingle }, { value: '1', label: copy.wmTitle }]
  return <div className={styles.categories} data-learning-tool="categories">
    <div className={styles.categoryTabs}><Tabs items={[copy.probable, copy.possible]} value={category} onChange={setCategory} id={id} label={copy.categoryTitle} lang={lang} /></div>
    <div className={styles.categoryPanel} id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + category} data-category={category === 0 ? 'probable' : 'possible'}>
      <p className={styles.categoryLead}>{pick(copy.categoryLeads[category], lang)}</p>
      <div className={styles.categoryRoutes}>{routes.map((route, index) => <Fragment key={route.value + index}>
        {index > 0 && <span className={styles.categoryOr}>{pick(copy.or, lang)}</span>}
        <div className={styles.categoryRoute}><strong><bdi dir="ltr">{route.value}</bdi></strong><p>{pick(route.label, lang)}</p></div>
      </Fragment>)}</div>
    </div>
  </div>
}

export function TFNETimeline({ lang, embedded = false }) {
  const [stage, setStage] = useState(0)
  const id = 'caa-tfne-' + useId().replaceAll(':', '')
  return <div className={embedded ? styles.embedded : styles.panel} data-learning-tool="tfne">
    <Tabs items={COPY.tfneStages.map(item => item.title)} value={stage} onChange={setStage} id={id} label={COPY.tfneTitle} lang={lang} />
    <div id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + stage} className={styles.tfneBody}>
      <figure className={styles.figure} data-tfne-stage={stage}><svg viewBox="0 0 600 400" role="img" aria-label={pick(COPY.tfneStages[stage].title, lang)} data-no-zoom>
        <image href="/educational/caa-tfne-anatomy-v1.webp" width="600" height="400" />
        <circle cx="154" cy="115" r="7" fill="#ef637c" stroke="#ffd5dc" strokeWidth="2" />
        {stage < 2 && <ellipse cx="518" cy="90" rx="28" ry="54" fill="#39c9c24a" stroke="#42d6cd" strokeWidth="3" />}
        {stage === 1 && <g fill="none" stroke="#43d6cc" strokeLinecap="round">
          {[27, 48, 70].map(radius => <circle key={radius} cx="154" cy="115" r={radius} strokeWidth="2" opacity={1 - radius / 110} />)}
          <path d="M510 151Q493 202 465 248L450 291" strokeWidth="10" opacity=".6" />
          <path d="m443 276 7 18 17-12" strokeWidth="4" />
        </g>}
      </svg><figcaption>{pick(COPY.tfneCaption, lang)}</figcaption></figure>
      <div className={styles.copy}><h4>{pick(COPY.tfneStages[stage].title, lang)}</h4><p>{pick(COPY.tfneStages[stage].text, lang)}</p>
        <Legend items={[[COPY.superficialBlood, '#ef637c'], [COPY.spreading, '#43d6cc']]} lang={lang} />
      </div>
    </div>
  </div>
}

export function PatternExplorer({ lang }) {
  const [pattern, setPattern] = useState(0)
  const id = 'caa-pattern-' + useId().replaceAll(':', '')
  return <div className={styles.panel} data-learning-tool="distribution">
    <ToolHeader title={COPY.distributionTitle} hint={COPY.distributionHint} lang={lang} />
    <Tabs items={COPY.distributionTabs} value={pattern} onChange={setPattern} id={id} label={COPY.distributionTitle} lang={lang} />
    <div id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + pattern} className={styles.explorerBody}>
      <BrainFigure pattern={['lobar', 'deep', 'mixed'][pattern]} lang={lang} />
      <div className={styles.copy}><h4>{pick(COPY.distributionTitles[pattern], lang)}</h4><p>{pick(COPY.distributionText[pattern], lang)}</p>
        <Legend items={[[COPY.distributionTabs[0], '#53205f'], [COPY.distributionTabs[1], '#087e88']]} lang={lang} />
      </div>
    </div>
  </div>
}
