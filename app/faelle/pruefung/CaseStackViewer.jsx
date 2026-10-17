'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './DecisionExam.module.css'

const pick=(text,lang)=>typeof text==='string'?text:text?.[lang]||text?.de||''
const COPY={
  de:{slice:'Schicht',select:'Schicht auswählen',previous:'Vorherige Schicht',next:'Nächste Schicht',hint:'Mausrad · Pfeiltasten · Schieberegler',sequences:'Sequenzen',expand:'Bild vergrößern',close:'Schließen'},
  en:{slice:'Slice',select:'Select slice',previous:'Previous slice',next:'Next slice',hint:'Mouse wheel · arrow keys · slider',sequences:'Sequences',expand:'Enlarge image',close:'Close'},
  fa:{slice:'برش',select:'انتخاب برش',previous:'برش قبلی',next:'برش بعدی',hint:'اسکرول ماوس · کلیدهای جهت · نوار برش',sequences:'سکانس‌ها',expand:'بزرگ‌نمایی تصویر',close:'بستن'},
}

function StepArrow({back=false}){
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={back?{transform:'rotate(180deg)'}:undefined}><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
}

export default function CaseStackViewer({series,lang,credit}){
  const ui=COPY[lang]||COPY.de
  const [activeId,setActiveId]=useState(series[0].id)
  const active=series.find(entry=>entry.id===activeId)||series[0]
  const [index,setIndex]=useState(active.initialFrame)
  const count=active.frames.length
  const frame=Math.min(index,count-1)
  const viewport=useRef(null)
  const largeViewport=useRef(null)
  const dialog=useRef(null)
  const swipe=useRef(null)

  // Native non-passive listeners keep wheel scrolling inside the image, including the modal.
  useEffect(()=>{
    const elements=[viewport.current,largeViewport.current].filter(Boolean)
    const wheel=event=>{
      if(event.ctrlKey||event.deltaY===0)return
      event.preventDefault()
      setIndex(previous=>Math.max(0,Math.min(count-1,previous+(event.deltaY>0?1:-1))))
    }
    for(const element of elements)element.addEventListener('wheel',wheel,{passive:false})
    return ()=>{for(const element of elements)element.removeEventListener('wheel',wheel)}
  },[count])

  // Only neighbours of the current sequence are prefetched, never a later stage's images.
  useEffect(()=>{
    for(const neighbour of [frame-1,frame+1])if(active.frames[neighbour]){
      const image=new window.Image();image.src=active.frames[neighbour]
    }
  },[active,frame])

  const move=delta=>setIndex(previous=>Math.max(0,Math.min(count-1,previous+delta)))
  const keyboard=event=>{
    if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'].includes(event.key)){
      event.preventDefault()
      if(event.key==='Home')setIndex(0)
      else if(event.key==='End')setIndex(count-1)
      else move(event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1)
    }
  }
  const pointerDown=event=>{if(event.pointerType==='touch'){swipe.current=event.clientY;event.currentTarget.setPointerCapture(event.pointerId)}}
  const pointerMove=event=>{if(event.pointerType==='touch'&&swipe.current!==null&&Math.abs(event.clientY-swipe.current)>18){move(event.clientY<swipe.current?1:-1);swipe.current=event.clientY}}
  const pointerUp=()=>{swipe.current=null}
  const controls=()=><div className={styles.sliceControls} dir="ltr">
    <button type="button" aria-label={ui.previous} disabled={frame===0} onClick={()=>move(-1)}><StepArrow back/></button>
    <input type="range" min="0" max={count-1} value={frame} onChange={event=>setIndex(Number(event.target.value))} aria-label={ui.select} aria-valuetext={`${frame+1} / ${count}`} />
    <button type="button" aria-label={ui.next} disabled={frame===count-1} onClick={()=>move(1)}><StepArrow/></button>
    <output aria-live="polite" data-slice-index={frame}>{ui.slice} <bdi>{frame+1} / {count}</bdi></output>
  </div>
  const image=(large=false)=><div className={styles.stackViewport} ref={large?largeViewport:viewport} tabIndex={0} role="group" aria-label={`${pick(active.label,lang)} · ${ui.slice}`} onKeyDown={keyboard} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}>
    <Image src={active.frames[frame]} unoptimized alt={pick(active.label,lang)} width={512} height={512} sizes={large?'95vw':'(max-width: 800px) 95vw, 55vw'} priority />
    <span className={styles.sliceOverlay} dir="ltr">{frame+1} / {count}</span>
  </div>

  return <figure className={styles.figure} data-no-zoom data-stack-id={active.id}>
    {series.length>1&&<div className={styles.mediaTabs} role="group" aria-label={ui.sequences}>{series.map(entry=><button type="button" key={entry.id} aria-pressed={entry.id===active.id} onClick={()=>{setActiveId(entry.id);setIndex(entry.initialFrame)}}>{pick(entry.label,lang)}</button>)}</div>}
    <div className={styles.stackFrame}>{image()}{controls()}<div className={styles.stackTools}><span>{ui.hint}</span><button type="button" onClick={()=>dialog.current?.showModal()}>{ui.expand}<StepArrow/></button></div></div>
    <figcaption>{pick(active.label,lang)}<small>{credit}</small></figcaption>
    <dialog ref={dialog} className={`${styles.dialog} ${styles.stackDialog}`} onClick={event=>{if(event.target===dialog.current)dialog.current.close()}} aria-label={ui.expand}>
      <header><strong>{pick(active.label,lang)}</strong><button type="button" onClick={()=>dialog.current?.close()} autoFocus>{ui.close}</button></header>
      {image(true)}{controls()}
    </dialog>
  </figure>
}
