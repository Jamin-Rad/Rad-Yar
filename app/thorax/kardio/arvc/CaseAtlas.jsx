'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { localizeArvcTree } from './lessonTranslations'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CASES } from './lessonContent'
import { Icon, Tabs } from './LessonVisuals'
import styles from './page.module.css'

const CASE_DIAGNOSES = {
  '57972': 'Rechtsbetonte arrhythmogene Kardiomyopathie (ARVC).',
  '194915': 'Arrhythmogene Kardiomyopathie mit Beteiligung beider Ventrikel, im Originalfall als sehr wahrscheinlich eingestuft.',
}

function SelectedCase({ item }) {
  const { lang: _arvcLang } = useLanguage()

  const [view, setView] = useState(0)
  const dialog = useRef(null)
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [playError, setPlayError] = useState(false)
  const image = item.views[view]
  const prefix = `case-${item.id}`
  useEffect(() => {
    if (image.type !== 'video' || !video.current) return
    const element = video.current
    const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) element.pause() })
    observer.observe(element)
    return () => { observer.disconnect(); element.pause() }
  }, [image.type])
  return localizeArvcTree(<div className={styles.selectedCase}>
    <header className={styles.caseHeader}><div><small>Radiopaedia · rID {item.id}</small><h3>{item.title}</h3><p>{item.age}</p></div><a href={item.study} target="_blank" rel="noreferrer">Originalserie <Icon name="external"/></a></header>
    <p className={styles.caseClinical}><strong>Anamnese</strong><br/>{item.clinical}</p>
    <Tabs label={`Ansichten für Fall ${item.id}`} items={item.views} selected={view} onChange={setView} idPrefix={prefix}/>
    <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-tab-${view}`}>
      <figure className={styles.mriFigure}>
        {image.type === 'video' ? <video ref={video} key={image.src} controls loop playsInline preload="metadata" aria-label={image.alt} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlayError(true)}><source src={image.src} type="video/mp4"/><p>Das Video kann nicht wiedergegeben werden. <a href={item.study}>Originalserie öffnen</a>.</p></video> : <button type="button" className={styles.imageButton} onClick={() => dialog.current?.showModal()} aria-label={`${image.label} vergrößern`}><Image data-no-zoom unoptimized src={image.src} alt={image.alt} width={1024} height={800} sizes="(max-width:760px) 95vw, 720px" loading="lazy"/><span><Icon name="scan"/>Vergrößern</span></button>}
        <figcaption>{image.sequence}</figcaption>
      </figure>
      {image.type === 'video' ? <div className={styles.videoToolbar}><button type="button" onClick={() => { if (video.current?.paused) video.current.play().catch(() => setPlayError(true)); else video.current?.pause() }}><Icon name="activity"/>{playing ? 'Cine pausieren' : 'Cine abspielen'}</button><label>Tempo<select defaultValue="1" onChange={e => { if (video.current) video.current.playbackRate = Number(e.target.value) }}><option value="0.5">0,5×</option><option value="1">1×</option></select></label>{playError ? <a href={item.study} target="_blank" rel="noreferrer">Cine in der Originalserie öffnen</a> : null}</div> : null}
    </div>
    <dl className={styles.mriSequenceSummary}>
      <div><dt>MRT-Befund</dt><dd>{item.look} {item.values.map(([name, value]) => `${name} ${value}`).join(' · ')}</dd></div>
      <div><dt>Diagnose im Originalfall</dt><dd>{CASE_DIAGNOSES[item.id] || item.certainty}</dd></div>
    </dl>
    <footer className={styles.caseCredit}><p>Case courtesy of {item.creator}, <a href={item.url} target="_blank" rel="noreferrer">Radiopaedia.org · rID {item.id}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 3.0</a>. Originalaufnahmen unverändert.</p></footer>
    {image.type !== 'video' ? <dialog ref={dialog} className={styles.imageDialog} aria-label={`${item.title}: ${image.label}`} onClick={event => { if (event.target === dialog.current) dialog.current.close() }}><button type="button" autoFocus onClick={() => dialog.current?.close()}>Schließen ×</button><Image data-no-zoom unoptimized src={image.src} width={1200} height={1000} sizes="95vw" alt={image.alt}/><p>{image.sequence} · {item.creator} · Radiopaedia rID {item.id}</p></dialog> : null}
  </div>, _arvcLang)
}

export default function CaseAtlas() {
  const { lang: _arvcLang } = useLanguage()

  const [selected, setSelected] = useState(0)
  const cases = CASES.filter(item => Object.hasOwn(CASE_DIAGNOSES, item.id))
  const caseTabs = cases.map((item, index) => ({ id: item.id, label: index === 0 ? 'Fall 1' : 'Fall 2' }))
  return localizeArvcTree(<>
    <div className={styles.atlas}>
      <Tabs label="MRT-Beispiele" items={caseTabs} selected={selected} onChange={setSelected} idPrefix="mri-cases"/>
      <div id="mri-cases-panel" role="tabpanel" aria-labelledby={`mri-cases-tab-${selected}`} tabIndex={0}>
        <SelectedCase key={cases[selected].id} item={cases[selected]}/>
      </div>
    </div>
  </>, _arvcLang)
}
