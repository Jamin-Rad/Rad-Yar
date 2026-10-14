'use client'
import { useId, useState } from 'react'
import LessonCaseFile from './LessonCaseFile'
import styles from './LessonCaseGallery.module.css'
const pick=(value,lang)=>typeof value === 'string' ? value : value[lang] || value.de
export default function LessonCaseGallery({items,lang,label,idPrefix='lesson-cases'}) {
  const [selected,setSelected]=useState(0)
  const id=idPrefix+'-'+useId().replaceAll(':','')
  const item=items[selected] || items[0]
  const selectByKey=(event,index)=>{
    const delta=lang === 'fa' ? -1 : 1
    let next=index
    if(event.key==='ArrowRight')next=(index+delta+items.length)%items.length
    else if(event.key==='ArrowLeft')next=(index-delta+items.length)%items.length
    else if(event.key==='Home')next=0
    else if(event.key==='End')next=items.length-1
    else return
    event.preventDefault();setSelected(next);event.currentTarget.parentElement.children[next].focus()
  }
  return <div className={styles.gallery} data-case-gallery={idPrefix} dir={lang==='fa'?'rtl':'ltr'}>
    <div className={styles.tabs} role="tablist" aria-label={pick(label,lang)} style={{'--case-count':items.length}}>{items.map((entry,index)=><button type="button" key={entry.id} role="tab" id={id+'-tab-'+index} aria-selected={index===selected} aria-controls={id+'-panel'} tabIndex={index===selected?0:-1} onClick={()=>setSelected(index)} onKeyDown={event=>selectByKey(event,index)}>{pick(entry.label,lang)}</button>)}</div>
    <div id={id+'-panel'} role="tabpanel" aria-labelledby={id+'-tab-'+selected} data-case-id={item.id}>
      <LessonCaseFile key={item.id} lang={lang} caseData={{...item.caseData,heading:item.caseData.heading ? pick(item.caseData.heading,lang) : undefined}} />
    </div>
  </div>
}
