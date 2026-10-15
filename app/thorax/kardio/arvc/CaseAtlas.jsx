'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { CASES } from './lessonContent'
import { Icon, Note, Tabs } from './LessonVisuals'
import styles from './page.module.css'

function SelectedCase({ item }) {
  const [view, setView] = useState(0)
  const [hints, setHints] = useState(false)
  const dialog = useRef(null)
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [playError, setPlayError] = useState(false)
  const image = item.views[view]
  const prefix = `case-${item.id}`
  return <div className={styles.selectedCase}>
    <header className={styles.caseHeader}><div><small>Radiopaedia · rID {item.id}</small><h3>{item.title}</h3><p>{item.age}</p></div><a href={item.study} target="_blank" rel="noreferrer">Originalserie <Icon name="external"/></a></header>
    <p className={styles.caseClinical}>{item.clinical}</p>
    {item.values.length ? <dl className={styles.caseValues}>{item.values.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl> : null}
    <Tabs label={`Ansichten für Fall ${item.id}`} items={item.views} selected={view} onChange={setView} idPrefix={prefix}/>
    <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-tab-${view}`}>
      <figure className={styles.mriFigure}>
        {image.type === 'video' ? <video ref={video} key={image.src} controls loop playsInline preload="metadata" aria-label={image.alt} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlayError(true)}><source src={image.src} type="video/mp4"/><p>Das Video kann nicht wiedergegeben werden. <a href={item.study}>Originalserie öffnen</a>.</p></video> : <button type="button" className={styles.imageButton} onClick={() => dialog.current?.showModal()} aria-label={`${image.label} vergrößern`}><Image data-no-zoom unoptimized src={image.src} alt={image.alt} width={1024} height={800} sizes="(max-width:760px) 95vw, 720px" loading="lazy"/><span><Icon name="scan"/>Vergrößern</span></button>}
        <figcaption>{image.sequence}</figcaption>
      </figure>
      {image.type === 'video' ? <div className={styles.videoToolbar}><button type="button" onClick={() => { if (video.current?.paused) video.current.play().catch(() => setPlayError(true)); else video.current?.pause() }}><Icon name="activity"/>{playing ? 'Cine pausieren' : 'Cine abspielen'}</button><label>Tempo<select defaultValue="1" onChange={e => { if (video.current) video.current.playbackRate = Number(e.target.value) }}><option value="0.5">0,5×</option><option value="1">1×</option></select></label>{playError ? <a href={item.study} target="_blank" rel="noreferrer">Cine in der Originalserie öffnen</a> : null}</div> : null}
      <button type="button" className={styles.hintButton} onClick={() => setHints(value => !value)} aria-expanded={hints} aria-controls={`${prefix}-hints`}><Icon name="scan"/>{hints ? 'Bildhinweise ausblenden' : 'Bildhinweise einblenden'}<span aria-hidden="true">{hints ? '−' : '+'}</span></button>
      <div id={`${prefix}-hints`} hidden={!hints} className={styles.caseHints}><h4>Wohin schauen?</h4><p>{item.look}</p><h4>Was erklärt dieser Fall?</h4><p>{item.lesson}</p></div>
      <Note caution title="Einordnung des Bildbeispiels">{item.limit}</Note>
    </div>
    <footer className={styles.caseCredit}><p>Case courtesy of {item.creator}, <a href={item.url} target="_blank" rel="noreferrer">Radiopaedia.org · rID {item.id}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 3.0</a>. Originalaufnahmen unverändert.</p><p>{item.certainty}. Zahlen und klinische Angaben stammen aus der Originalbeschreibung.</p></footer>
    {image.type !== 'video' ? <dialog ref={dialog} className={styles.imageDialog} aria-label={`${item.title}: ${image.label}`} onClick={event => { if (event.target === dialog.current) dialog.current.close() }}><button type="button" autoFocus onClick={() => dialog.current?.close()}>Schließen ×</button><Image data-no-zoom unoptimized src={image.src} width={1200} height={1000} sizes="95vw" alt={image.alt}/><p>{image.sequence} · {item.creator} · Radiopaedia rID {item.id}</p></dialog> : null}
  </div>
}

export default function CaseAtlas() {
  const [selected, setSelected] = useState(0)
  return <>
    <p className={styles.lead}>Sechs originale Radiopaedia-Fälle: fünf MRT-Untersuchungen und ein ergänzender CT-Fall. <strong>Fall und Ansicht auswählen, das Bild betrachten, dann die Bildhinweise öffnen.</strong> Die Cine-Schleife in Fall 39806 lässt sich direkt abspielen.</p>
    <div className={styles.atlas}>
      <nav className={styles.caseList} aria-label="Radiopaedia-Lehrfälle">{CASES.map((item, index) => <button type="button" key={item.id} onClick={() => setSelected(index)} aria-pressed={selected === index}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item.label}</strong><small>{item.age} · rID {item.id}</small></div><Icon name="arrow"/></button>)}</nav>
      <SelectedCase key={CASES[selected].id} item={CASES[selected]}/>
    </div>
  </>
}
