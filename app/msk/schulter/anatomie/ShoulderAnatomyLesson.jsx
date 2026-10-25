'use client'

import { useMemo, useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources } from '@/components/lesson-template/StandardLessonShell'
import { SHOULDER_COPY as copy, SHOULDER_MEDIA as media, SHOULDER_OVERVIEW, SHOULDER_LANDMARKS, SHOULDER_VIEWS, SHOULDER_CHECKS, SHOULDER_SUMMARY, SHOULDER_REFERENCES } from '@/data/shoulderAnatomyLesson'
import styles from './page.module.css'

const pick = (value, lang) => typeof value === 'string' ? value : value[lang]
const ICONS = { start:'◉', landmarks:'⌂', views:'↗', quiz:'◇', summary:'✦' }
const MODES = ['anatomy','xr','mr']
function Icon({ name }) { return <span aria-hidden="true">{ICONS[name] || '◉'}</span> }

function ImageStudy({ image, lang, point, show = true, targetLabel }) {
  const t = value => pick(value, lang)
  const [x,y,w,h] = image.crop || [0,0,image.width,image.height]
  const alt = `${t(image.label)}${targetLabel ? ` · ${targetLabel}` : ''}`
  return <figure className={styles.figure}>
    <div className={styles.imageMeta}>{t(image.label)}</div>
    <div className={`${styles.imageFrame} ${image.kind === 'illustration' ? styles.illustration : ''}`}>
      <svg viewBox={`${x} ${y} ${w} ${h}`} role="img" aria-label={alt} className={styles.study} data-study={image.src}>
        <title>{alt}</title>
        <image href={image.src} width={image.width} height={image.height} />
        {show && point ? <g data-teaching-marker pointerEvents="none">
          <circle cx={x+w*point[0]/100} cy={y+h*point[1]/100} r={w*.025} fill="none" stroke="#111" strokeWidth={w*.014}/>
          <circle cx={x+w*point[0]/100} cy={y+h*point[1]/100} r={w*.025} fill="none" stroke="#ffd779" strokeWidth={w*.007}/>
        </g> : null}
      </svg>
    </div>
    {show && point && targetLabel ? <p className={styles.targetLabel} aria-live="polite">◉ {targetLabel}</p> : null}
    <figcaption>
      {image.kind === 'ct' ? <span>{t(copy.ct)}</span> : null}
      {image.kind === 'mr' || image.kind === 'ct' ? <span>{t(copy.original)}</span> : null}
      <span dir={image.kind === 'illustration' ? undefined : 'ltr'}>{t(image.credit)}</span>
    </figcaption>
  </figure>
}

function LandmarkStage({ step, lang, showParagraphs = true }) {
  const t=value=>pick(value,lang)
  const [mode,setMode]=useState('anatomy')
  const [targetId,setTargetId]=useState(step.targets[0].id)
  const [show,setShow]=useState(true)
  const target=step.targets.find(item=>item.id===targetId) || step.targets[0]
  return <div className={styles.stage} data-landmark-stage={step.id}>
    {showParagraphs ? <div className={styles.explanation}>{step.paragraphs.map((p,i)=><p key={i}>{t(p)}</p>)}</div> : null}
    <div className={styles.targetChoices} role="group" aria-label={t(copy.choose)}>{step.targets.map(item=><button type="button" key={item.id} aria-pressed={item.id===target.id} onClick={()=>{setTargetId(item.id);setShow(true)}}>{t(item.label)}</button>)}</div>
    <div className={styles.viewer}>
      <div className={styles.modeChoices} role="group" aria-label={t(copy.views)}>{MODES.map(key=><button type="button" key={key} aria-pressed={mode===key} data-mode={key} onClick={()=>setMode(key)}>{t(copy[key])}</button>)}</div>
      <ImageStudy image={media[step.media[mode]]} lang={lang} point={target.points[mode]} show={show} targetLabel={t(target.label)} />
      {!target.points[mode] ? <p className={styles.note} role="status">{t(copy.absent)}</p> : <button type="button" className={styles.reveal} aria-pressed={show} onClick={()=>setShow(value=>!value)}>{t(show?copy.hide:copy.reveal)}</button>}
    </div>
    <p className={styles.note}>{t(step.key)}</p>
  </div>
}

function Landmarks({lang}) {
  const [index,setIndex]=useState(0)
  const t=value=>pick(value,lang), step=SHOULDER_LANDMARKS[index]
  const change=next=>setIndex(Math.max(0,Math.min(SHOULDER_LANDMARKS.length-1,next)))
  return <div data-landmarks>
    <p>{t(copy.landmarkIntro)}</p>
    <div className={styles.stepChoices} role="group" aria-label={t(copy.landmarks)}>{SHOULDER_LANDMARKS.map((item,i)=><button type="button" key={item.id} aria-pressed={i===index} onClick={()=>change(i)}>{t(item.title)}</button>)}</div>
    <div className={styles.stepHeading}><h3>{t(step.title)}</h3><span><bdi dir="ltr">{index+1} / {SHOULDER_LANDMARKS.length}</bdi></span></div>
    <LandmarkStage key={step.id} step={step} lang={lang}/>
    <div className={styles.stepNavigation}><button type="button" onClick={()=>change(index-1)} disabled={index===0}>{t(copy.previous)}</button><button type="button" onClick={()=>change(index+1)} disabled={index===SHOULDER_LANDMARKS.length-1}>{t(copy.next)}</button></div>
  </div>
}

function Views({lang}) {
  const [index,setIndex]=useState(0),view=SHOULDER_VIEWS[index]
  const t=value=>pick(value,lang)
  return <div data-view-comparison>
    <div className={styles.stepChoices} role="group" aria-label={t(copy.views)}>{SHOULDER_VIEWS.map((item,i)=><button type="button" key={item.media} aria-pressed={index===i} onClick={()=>setIndex(i)}>{t(media[item.media].label)}</button>)}</div>
    <p className={styles.note} aria-live="polite">{t(view.text)}</p>
    <ImageStudy image={media[view.media]} lang={lang} show={false}/>
  </div>
}

function KnowledgeCheck({item,lang}) {
  const [answer,setAnswer]=useState(null),t=value=>pick(value,lang)
  const result=lang==='fa'?(answer===item.answer?'درست است. ':'دوباره محل را بررسی کن. '):lang==='en'?(answer===item.answer?'Correct. ':'Review the location. '):(answer===item.answer?'Richtig. ':'Prüfe die Lage erneut. ')
  return <div className={styles.check} data-check={item.id}>
    <ImageStudy image={media[item.media]} point={item.point} lang={lang} targetLabel={t(copy.point)} />
    <fieldset><legend>{t(item.question)}</legend>{item.options.map((option,i)=><label key={i} className={answer===i?styles.selected:''}><input type="radio" name={item.id} checked={answer===i} onChange={()=>setAnswer(i)}/><span>{t(option)}</span></label>)}</fieldset>
    {answer!==null ? <p className={styles.feedback} role="status">{result}{t(item.explanation)}</p> : null}
  </div>
}

export default function ShoulderAnatomyLesson() {
  const {lang}=useLanguage(),t=value=>pick(value,lang)
  const sections=useMemo(()=>[
    {id:'start',label:pick(copy.start,lang),icon:'start'},
    {id:'landmarks',label:pick(copy.landmarks,lang),icon:'landmarks'},
    {id:'views',label:pick(copy.views,lang),icon:'views'},
    {id:'quiz',label:pick(copy.quiz,lang),icon:'quiz'},
    {id:'take-home',label:pick(copy.summary,lang),icon:'summary',emphasis:true},
  ],[lang])
  const href=path=>lang==='de'?path:`${path}?lang=${lang}`
  return <StandardLessonShell lessonId="schulter-anatomie" lang={lang} title={t(copy.title)} author="RadYar" sections={sections} syncHashNavigation
    heroImageSrc={media.overview.src} heroImageAlt={t(copy.heroAlt)} renderIcon={name=><Icon name={name}/>}
    breadcrumbs={[{label:'RadYar',href:href('/')},{label:lang==='fa'?'اسکلتی‌عضلانی':'MSK',href:href('/lernen/msk')},{label:lang==='fa'?'شانه':lang==='en'?'Shoulder':'Schulter',href:href('/lernen/msk')+'#msk-schulter'},{label:lang==='fa'?'آناتومی':lang==='en'?'Anatomy':'Anatomie'}]}
    actions={{mcq:{label:t(copy.quiz),onClick:()=>{window.location.hash='quiz'}}}}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:media.overview.src,heroImageOpacity:.28,accent:'#5baea4',accentStrong:'#245f5d',accentSoft:'#e1f1ec',secondary:'#d4a864',secondaryStrong:'#84612c',heroBase:'#122c2d'}}
    className={styles.page}
    sources={<LessonSources title={t(copy.sources)} lang={lang} items={SHOULDER_REFERENCES} note={t(copy.review)}/>}
  >
    <LessonSection id="start" bodyClassName={styles.body}><LandmarkStage step={SHOULDER_OVERVIEW} lang={lang}/></LessonSection>
    <LessonSection id="landmarks" bodyClassName={styles.body}><Landmarks lang={lang}/></LessonSection>
    <LessonSection id="views" bodyClassName={styles.body}><Views lang={lang}/></LessonSection>
    <LessonSection id="quiz" bodyClassName={styles.body}>{SHOULDER_CHECKS.map(item=><KnowledgeCheck key={item.id} item={item} lang={lang}/>)}</LessonSection>
    <LessonSection id="take-home" bodyClassName={styles.body}><ul className={styles.summary}>{SHOULDER_SUMMARY.map((item,i)=><li key={i}>{t(item)}</li>)}</ul></LessonSection>
  </StandardLessonShell>
}
