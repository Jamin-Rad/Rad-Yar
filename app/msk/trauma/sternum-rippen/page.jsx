'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { STERNUM_RIB_ID, STERNUM_RIB_PATH, STERNUM_RIB_COPY as C, STERNUM_RIB_LABELS as LABELS, STERNUM_RIB_SECTIONS, STERNUM_RIB_SOURCES, STERNUM_RIB_CHECKS } from '@/data/sternumRibLesson'
import styles from './page.module.css'

const v = (value, lang) => value[lang]
function iconFor(name) {
  const paths={scan:'M4 8V4h4m8 0h4v4M20 16v4h-4M8 20H4v-4M7 12h10M12 7v10',bone:'M10 3h4v6l-2 2 2 2v8h-4v-8l2-2-2-2V3',ribs:'M12 3v18M12 6C3 3 3 10 9 10m3-4c9-3 9 4 3 4m-3 0c-9-3-9 4-3 4m3-4c9-3 9 4 3 4m-3 0c-7-2-7 4-2 4m2-4c7-2 7 4 2 4',check:'m4 12 5 5L20 6'}
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name] || paths.scan}/></svg>
}
function ClinicalFigure({kind,lang}) {
  const sternum=kind==='sternum', src=`/educational/sternum-rippen/${sternum?'sternum-ct':'ribs-associated-ct'}.jpg`
  return <figure className={styles.figure}>
    <a href={src} target="_blank" rel="noopener noreferrer" aria-label={v(LABELS.view,lang)}><img src={src} alt={v(sternum?C.sternumAlt:C.ribsAlt,lang)} width="683" height={sternum?706:392} loading="lazy" /></a>
    <figcaption><p>{v(sternum?C.sternumCaption:C.ribsCaption,lang)}</p><a href={`https://pmc.ncbi.nlm.nih.gov/articles/PMC9254712/#${sternum?'f3':'f2'}`} target="_blank" rel="noopener noreferrer">{v(LABELS.attribution,lang)} {sternum?'3':'2'}</a></figcaption>
  </figure>
}
function Check({item,lang}) {
  const [answer,setAnswer]=useState(null), id=`${STERNUM_RIB_ID}-${item.slug}-check`
  return <div className={styles.check}>
    <p id={id} className={styles.question}>{v(item.question,lang)}</p>
    <div role="group" aria-labelledby={id} className={styles.options}>{item.options.map((option,i)=><button type="button" key={i} aria-pressed={answer===i} onClick={()=>setAnswer(i)}><b aria-hidden="true">{String.fromCharCode(65+i)}</b><span>{v(option,lang)}</span></button>)}</div>
    {answer!==null&&<p role="status" className={styles.feedback}>{v(item.feedback[answer],lang)}</p>}
  </div>
}
export default function SternumRibLesson() {
  const {lang}=useLanguage(), t=key=>v(LABELS[key],lang)
  const langPath=path=>lang==='de'?path:`${path}${path.includes('?')?'&':'?'}lang=${lang}`
  const returnPath=langPath(STERNUM_RIB_PATH)
  const sections=STERNUM_RIB_SECTIONS.map(s=>({...s,label:v(s.label,lang)}))
  return <StandardLessonShell lessonId={STERNUM_RIB_ID} lang={lang} title={v(C.title,lang)} author="Dr. Zia"
    breadcrumbs={[{label:'RadYar',href:langPath('/')},{label:v(C.chapter,lang),href:langPath('/lernen/msk')},{label:v(C.title,lang)}]}
    sections={(sections).map(section=>({...section,emphasis:section.emphasis||["traumabefund"].includes(section.id)}))} labels={Object.fromEntries(Object.entries(LABELS).map(([k,val])=>[k,v(val,lang)]))} renderIcon={iconFor} syncHashNavigation
    actions={{mcq:{label:t('practice'),href:langPath(`/ueben/quiz?fach=msk&n=2&themen=${STERNUM_RIB_ID}&from=${encodeURIComponent(returnPath)}`)},flashcards:{label:t('cards'),href:langPath(`/flashcards/${STERNUM_RIB_ID}?from=${encodeURIComponent(returnPath)}`)}}}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/educational/sternum-rippen/hero.png',heroImageOpacity:.55,accent:'#537f89',accentStrong:'#315c66',accentSoft:'#e8f2f3',secondary:'#bd8d61',secondaryStrong:'#765237',heroBase:'#132b32'}}
    heroImageAlt={v(C.heroAlt,lang)} className={styles.page}
    sources={<LessonSources title={t('sources')} items={STERNUM_RIB_SOURCES.map(s=>({...s,scope:v(s.scope,lang)}))} note={v(C.scope,lang)}/>}>
    <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>
      <LessonSection id="bildgebung" title={sections[0].label} icon="scan"><p className={styles.lead}>{v(C.intro,lang)}</p><p>{v(C.imaging,lang)}</p><aside className={styles.note}>{v(C.limit,lang)}</aside><Check item={STERNUM_RIB_CHECKS[0]} lang={lang}/></LessonSection>
      <LessonSection id="sternum" title={sections[1].label} icon="bone"><p className={styles.lead}>{v(C.sternum,lang)}</p><ClinicalFigure kind="sternum" lang={lang}/><aside className={styles.note}>{v(C.pitfall,lang)}</aside><Check item={STERNUM_RIB_CHECKS[1]} lang={lang}/></LessonSection>
      <LessonSection id="rippen" title={sections[2].label} icon="ribs"><p className={styles.lead}>{v(C.ribs,lang)}</p><ClinicalFigure kind="ribs" lang={lang}/><div className={styles.tableWrap}><table><thead><tr><th scope="col">{t('area')}</th><th scope="col">{t('task')}</th></tr></thead><tbody>{C.rows.map(([label,text],i)=><tr key={i}><th scope="row">{v(label,lang)}</th><td>{v(text,lang)}</td></tr>)}</tbody></table></div></LessonSection>
      <LessonSection id="traumabefund" title={sections[3].label} icon="check"><TakeHomeList items={C.takeaways.map(item=>({title:v(item.title,lang),detail:v(item.detail,lang)}))}/></LessonSection>
    </div>
  </StandardLessonShell>
}
