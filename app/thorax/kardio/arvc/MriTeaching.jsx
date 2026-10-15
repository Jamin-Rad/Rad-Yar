'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { CASES } from './lessonContent'
import styles from './page.module.css'

// Coordinates refer to the unchanged source frame, not a synthetic MRI or segmentation.
const SCENES = {
  cine: {
    caseId: '39806', view: 0,
    title: 'Wie bewegt sich die RV-Wand?',
    text: 'Im Originalfall sind Ausbuchtungen mit auffälliger RV-Wandbewegung beschrieben. Der LV bewegt sich normal.',
    steps: ['Cine starten und die freie RV-Wand bis zur Herzspitze verfolgen.', 'Dyskinesie bedeutet: Ein Wandabschnitt bewegt sich in der Systole nach außen.'],
    limit: 'Bekannte ARVC; Untersuchung nach einer früheren Ablation. Die Bewegung über den ganzen Herzzyklus beurteilen.',
  },
  lge4ch: {
    caseId: '194915', view: 0, width: 448, height: 448,
    title: 'Auch die linke Kammer ansehen',
    text: 'Die Originaluntersuchung beschreibt LGE in beiden Kammern. Eine LV-Beteiligung ist auch bei relativ guter Pumpfunktion möglich.',
    points: [{ x: 50, y: 45, label: 'RV-Lumen' }, { x: 50, y: 57, label: 'LV-Lumen' }],
    steps: ['RV und LV finden, dann die jeweilige Herzwand verfolgen.', 'Zum Vergleich die zweite Ebene öffnen.'],
    limit: 'Die Punkte dienen der Orientierung und markieren keine Narbe. LGE allein beweist keine ACM.',
  },
  lgesax: {
    caseId: '194915', view: 1, width: 432, height: 432,
    title: 'Dasselbe Herz in der kurzen Achse',
    text: 'Diese PSIR-Aufnahme gehört zum selben Patienten. Die Originalquelle markiert hier eine Anreicherung der LV-Wand.',
    points: [{ x: 53, y: 49, label: 'LV-Lumen' }],
    steps: ['Das runde LV-Lumen finden und die umgebende Muskelwand ansehen.', 'Die Auffälligkeit mit der Vierkammeraufnahme vergleichen.'],
    limit: 'Eine zweite Ebene hilft, echte Veränderungen von Artefakten zu unterscheiden.',
  },
}

function Orientation({ points, id }) {
  return <svg className={styles.mriOverlay} viewBox="0 0 100 100" preserveAspectRatio="none" aria-labelledby={id} role="img"><title id={id}>Orientierung im Originalbild: {points.map((point, index) => `${index + 1} ${point.label}`).join(', ')}</title>{points.map((point, index) => <g key={point.label}><circle cx={point.x} cy={point.y} r="2.6"/><text x={point.x} y={point.y} dy=".35em" textAnchor="middle">{index + 1}</text></g>)}</svg>
}

export default function MriTeaching({ scene, heading }) {
  const data = SCENES[scene]
  const item = CASES.find(entry => entry.id === data.caseId)
  const view = item.views[data.view]
  const [marked, setMarked] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [playError, setPlayError] = useState(false)
  const dialog = useRef(null)
  const video = useRef(null)
  const uid = useId().replaceAll(':', '')

  useEffect(() => {
    if (view.type !== 'video' || !video.current) return
    const element = video.current
    const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) element.pause() })
    observer.observe(element)
    return () => { observer.disconnect(); element.pause() }
  }, [view.type])

  const frame = (expanded = false) => <div className={styles.mriFrame} style={{ aspectRatio: `${data.width} / ${data.height}` }}><Image data-no-zoom unoptimized src={view.src} alt={view.alt} width={data.width} height={data.height} sizes={expanded ? '90vw' : '(max-width:760px) 90vw, 420px'} loading="lazy"/>{marked ? <Orientation points={data.points} id={`${uid}-${expanded ? 'zoom' : 'inline'}-orientation`}/> : null}</div>

  return <figure className={styles.mriTeaching} data-mri-teaching={scene}>
    <header><span>Am Originalbild lernen · Radiopaedia rID {item.id}</span><h4>{heading || data.title}</h4></header>
    <div className={styles.mriTeachingGrid}>
      <div className={styles.mriMedia}>
        {view.type === 'video' ? <video ref={video} controls loop playsInline preload="metadata" aria-label={`Lehr-Cine: ${view.alt}`} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setPlayError(true)}><source src={view.src} type="video/mp4"/></video> : frame()}
        <div className={styles.mriTools}>
          {view.type === 'video' ? <><button type="button" onClick={() => { if (video.current?.paused) video.current.play().catch(() => setPlayError(true)); else video.current?.pause() }}>{playing ? 'Cine pausieren' : 'Cine abspielen'} <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span></button><label>Tempo<select defaultValue="1" onChange={event => { if (video.current) video.current.playbackRate = Number(event.target.value) }}><option value="1">1×</option><option value="0.5">0,5×</option></select></label></> : <><button type="button" aria-pressed={marked} onClick={() => setMarked(value => !value)}>{marked ? 'Markierungen ausblenden' : 'Orientierung einblenden'}</button><button type="button" onClick={() => dialog.current?.showModal()}>Vergrößern ↗</button></>}
        </div>
        {marked ? <p className={styles.mriLegend}>{data.points.map((point, index) => <span key={point.label}><b>{index + 1}</b>{point.label}</span>)}</p> : null}
        <p className={styles.mriSequence}>{view.sequence}</p>
        {playError ? <a className={styles.mriFallback} href={item.study} target="_blank" rel="noreferrer">Cine in der Originalserie öffnen ↗</a> : null}
      </div>
      <div className={styles.mriReading}><p>{data.text}</p><ol>{data.steps.map(step => <li key={step}>{step}</li>)}</ol><p className={styles.mriLimit}>{data.limit}</p></div>
    </div>
    <figcaption className={styles.mriAttribution}>Case courtesy of {item.creator}, <a href={item.url} target="_blank" rel="noreferrer">Radiopaedia.org · rID {item.id}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noreferrer">CC BY-NC-SA 3.0</a>. Originalaufnahme unverändert{view.type !== 'video' ? '; einblendbare Orientierungspunkte von RadYar.' : '.'}</figcaption>
    {view.type !== 'video' ? <dialog ref={dialog} className={`${styles.imageDialog} ${styles.mriZoom}`} aria-label={`MRT vergrößert: ${data.title}`} onClick={event => { if (event.target === dialog.current) dialog.current.close() }}><button type="button" autoFocus onClick={() => dialog.current?.close()}>Schließen ×</button>{frame(true)}<p>{view.sequence} · {item.creator} · Radiopaedia rID {item.id}</p></dialog> : null}
  </figure>
}
