'use client'

import Image from 'next/image'
import { useState } from 'react'
import { findings, L, pick } from './lessonContent'
import s from './page.module.css'

export default function ImageLesson({ lang }) {
  const [selected, setSelected] = useState(0)
  const t = value => pick(value, lang)
  const handleTabKey = event => {
    let index
    if (event.key === 'ArrowRight') index = (selected + (lang === 'fa' ? 2 : 1)) % findings.length
    else if (event.key === 'ArrowLeft') index = (selected + (lang === 'fa' ? 1 : 2)) % findings.length
    else if (event.key === 'Home') index = 0
    else if (event.key === 'End') index = findings.length - 1
    else return
    event.preventDefault()
    setSelected(index)
    document.getElementById(`finding-tab-${findings[index].id}`)?.focus()
  }
  return <div className={s.imageLesson}>
    <div className={s.findingTabs} role="tablist" aria-label={t(L('Frühe NCCT-Zeichen', 'Early NCCT signs', 'علائم اولیه NCCT'))} onKeyDown={handleTabKey}>
      {findings.map((item, index) => <button key={item.id} type="button" role="tab" id={`finding-tab-${item.id}`} aria-selected={index === selected} aria-controls={`finding-panel-${item.id}`} tabIndex={index === selected ? 0 : -1} onClick={() => setSelected(index)}>{t(item.label)}</button>)}
    </div>
    <div className={s.imageGrid}>
      <figure className={s.teachingFigure}>
        <div className={s.teachingImage}><Image src="/stroke/case-left-mca-ct-rid-78956.png" alt={t(L('Axiale NCCT eines linksseitigen MCA-Infarkts', 'Axial NCCT of a left MCA infarct', 'NCCT آگزیال انفارکت MCA چپ'))} width={512} height={512} sizes="(max-width: 760px) 90vw, 440px" /></div>
        <figcaption><span>NCCT · {t(L('Axial', 'Axial', 'آگزیال'))}</span><a href="https://radiopaedia.org/cases/78956" target="_blank" rel="noopener noreferrer">Radiopaedia · rID 78956</a><span>Case courtesy of Abdulrahman Abdo Ali Abbas · CC BY-NC-SA 3.0</span></figcaption>
      </figure>
      <div className={s.findingPanels}>{findings.map((item, index) => <div key={item.id} role="tabpanel" id={`finding-panel-${item.id}`} aria-labelledby={`finding-tab-${item.id}`} tabIndex={0} hidden={index !== selected}>
        <span className={s.findingCount}>{String(index + 1).padStart(2, '0')} / 03</span>
        <h3>{t(item.title)}</h3><p>{t(item.text)}</p>
        <aside className={s.imageHint}>{t(L('Immer mit der Gegenseite vergleichen.', 'Always compare with the opposite side.', 'همیشه با سمت مقابل مقایسه کنید.'))}</aside>
      </div>)}
      <button className={s.nextFinding} type="button" onClick={() => setSelected((selected + 1) % findings.length)}>{t(L('Nächsten Blickpunkt ansehen', 'Explore the next finding', 'بررسی نکته بعدی'))}<span aria-hidden="true">{selected + 1} / 3</span></button></div>
    </div>
  </div>
}
