'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { CASES } from './lessonContent'
import styles from './page.module.css'

// Coordinates refer to the unchanged source frame, not a synthetic MRI or segmentation.
const SCENES = {
  morphology: {
    caseId: '87505', view: 0, width: 630, height: 630,
    title: 'Zuerst beide Kammern finden',
    text: 'Im Vierkammerblick fällt der stark vergrößerte RV auf. Die beiden Orientierungspunkte liegen in den Kammerhöhlen: RV und LV lassen sich direkt im Originalbild vergleichen.',
    points: [{ x: 55, y: 38, label: 'RV-Lumen' }, { x: 55, y: 51, label: 'LV-Lumen' }],
    steps: ['Am Trikuspidalring beginnen und die freie RV-Wand bis zum Apex verfolgen.', 'Größe und Form beurteilen; die Bewegung anschließend in der vollständigen Cine-Serie prüfen.'],
    limit: '14-jährige Patientin. Die EF lässt sich nicht aus diesem Standbild ablesen; feste Erwachsenen-Grenzwerte hier nicht ungeprüft anwenden.',
  },
  measure: {
    caseId: '57972', view: 0, width: 192, height: 192,
    title: 'Ein großer RV ist der Anfang der Messung',
    text: 'Der Vierkammerblick zeigt die auffällige RV-Größe. RVEDVi und RVEF werden dagegen aus der vollständigen Volumenserie bestimmt: Im Originalfall sind 116 ml/m² und unter 40 % angegeben.',
    points: [{ x: 47, y: 34, label: 'RV-Lumen' }, { x: 58, y: 46, label: 'LV-Lumen' }],
    steps: ['Enddiastole und Endsystole in der vollständigen Serie bestimmen und konsistent konturieren.', 'Das Volumen auf die Körperoberfläche beziehen und die regionale Bewegung getrennt prüfen.'],
    limit: 'Cine-Standbild mit begrenzter Auflösung. Laut Originalquelle beeinträchtigt Arrhythmie die Vierkammer-Serie. Die Zahlen stammen aus der Originalbeschreibung, nicht aus diesem Einzelbild.',
  },
  lge4ch: {
    caseId: '194915', view: 0, width: 432, height: 432,
    title: 'Den LV auch bei relativ erhaltener EF prüfen',
    text: 'Bei diesem Patienten beschreibt die Originaluntersuchung LGE in beiden Kammern. Die LVEF beträgt etwa 51 %. Die Orientierungspunkte zeigen die Kammerhöhlen; anschließend die jeweilige Wand verfolgen.',
    points: [{ x: 50, y: 45, label: 'RV-Lumen' }, { x: 50, y: 57, label: 'LV-Lumen' }],
    steps: ['Cine und PSIR unterscheiden: PSIR dient hier der Gewebebeurteilung.', 'In der LV-Wand nach nichtischämischer Anreicherung suchen und das Muster mit der kurzen Achse abgleichen.'],
    limit: 'Die Orientierungspunkte markieren keine Narbe. Das vollständige LGE-Muster und die Kriterien müssen in den Originalserien und im klinischen Zusammenhang geprüft werden.',
  },
  lgesax: {
    caseId: '194915', view: 1, width: 432, height: 432,
    title: 'Dasselbe Herz in einer zweiten Ebene',
    text: 'Kurze Achse desselben Patienten. Der ausgewählte Originalframe gehört zur Autorenannotation „Enhancement of LV wall“. Am LV-Lumen orientieren und die umgebende Muskelwand verfolgen.',
    points: [{ x: 53, y: 49, label: 'LV-Lumen' }],
    steps: ['Die kurze Achse mit der Vierkammeraufnahme desselben Falls vergleichen.', 'Prüfen, ob die Auffälligkeit räumlich zusammenpasst. Für Padua ist die Bestätigung in zwei orthogonalen Ebenen wesentlich.'],
    limit: 'Ein ausgewählter Frame ersetzt keine vollständige Serie. Der Punkt zeigt das LV-Lumen, nicht die Ausdehnung des LGE.',
  },
  negative: {
    caseId: '57972', view: 3, width: 192, height: 240,
    title: 'ARVC kann auch ohne auffälliges LGE vorliegen',
    text: 'Diese PSIR-Aufnahme stammt aus einem anderen Fall als die positiven LGE-Beispiele. Der Autor beschreibt kein auffälliges LGE, aber einen vergrößerten RV, reduzierte RVEF und regionale Bewegungsstörungen.',
    points: [{ x: 48, y: 49, label: 'LV-Lumen' }],
    steps: ['Fehlendes LGE nicht mit fehlender Erkrankung gleichsetzen.', 'Bewegung und globale RV-Messwerte unabhängig davon prüfen: TFC 2010 enthält kein LGE-Kriterium.'],
    limit: 'Begrenzte Auflösung und nur ein Standbild. Die Aussage „kein auffälliges LGE“ stammt aus der vollständigen Originaluntersuchung.',
  },
  cine: {
    caseId: '39806', view: 0,
    title: 'Dyskinesie im Herzzyklus beobachten',
    text: 'Die echte Vierkammer-Schleife zeigt die Bewegung. Der Originalfall beschreibt dyskinetische, aneurysmatische Ausbuchtungen des RV bei normaler LV-Wandbewegung.',
    steps: ['Cine starten, bei Bedarf das Tempo auf 0,5× reduzieren.', 'Zuerst auf die LV-Kontraktion achten. Dann freie RV-Wand und Apex im selben Herzzyklus verfolgen.', 'Dyskinesie bedeutet: Ein Wandabschnitt bewegt sich in der Systole paradox nach außen. Auffälligkeiten in einer weiteren Ebene bestätigen.'],
    limit: 'Bekannte ARVC nach RVOT-Ablation. Die vollständige Untersuchung enthält wichtige Zusatzinformationen; frühere Ablation bei der Narbenbeurteilung berücksichtigen.',
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
