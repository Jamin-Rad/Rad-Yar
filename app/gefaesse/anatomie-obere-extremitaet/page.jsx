'use client'

import { useState } from 'react'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { UPPER_ARTERY_ID, UPPER_ARTERY_PATH, UPPER_ARTERY_TITLE, UPPER_ARTERY_SECTIONS, UPPER_ARTERY_LABELS as LABELS, UPPER_ARTERY_CHECKS } from '@/data/upperLimbArteriesLesson'
import styles from './page.module.css'

const L=(de,en,fa)=>({de,en,fa})
const v=(value,lang)=>value[lang]
function iconFor(name) {
  const paths={artery:'M12 3v18M12 7l-5 4M12 13l5 4',branches:'M12 3v7m0 0L5 19m7-9 7 9',hand:'M7 12V6a1 1 0 0 1 2 0v4-6a1 1 0 0 1 2 0v6-7a1 1 0 0 1 2 0v7-5a1 1 0 0 1 2 0v9l2-2c2-1 3 0 2 2l-4 6H9l-5-7c-1-2 1-3 3-1',check:'m4 12 5 5L20 6'}
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]||paths.artery}/></svg>
}
function MainPath({lang}) {
  return <figure className={styles.diagram}>
    <ol className={styles.trunk} aria-label={v(UPPER_ARTERY_SECTIONS[0].title,lang)}>
      <li><strong>{v(LABELS.subclavian,lang)}</strong><span className={styles.boundary}><span aria-hidden="true">↓ </span>{v(LABELS.firstRib,lang)}</span></li>
      <li><strong>{v(LABELS.axillary,lang)}</strong><span className={styles.boundary}><span aria-hidden="true">↓ </span>{v(LABELS.teres,lang)}</span></li>
      <li><strong>{v(LABELS.brachial,lang)}</strong></li>
    </ol><figcaption>{v(LABELS.diagram,lang)}</figcaption>
  </figure>
}
function DistalPath({lang,arches=false}) {
  const t=key=>v(LABELS[key],lang)
  return <figure className={styles.diagram}>
    <div className={styles.rootNode}><strong>{t('brachial')}</strong><span>{t('elbow')}</span></div>
    <div className={styles.branchLine} aria-hidden="true"><span>↓</span><span>↓</span></div>
    <div className={styles.branchGrid}>
      <div className={styles.branch}><strong>{t('radial')}</strong>{arches&&<><span aria-hidden="true">↓</span><p>{t('deep')}</p></>}</div>
      <div className={styles.branch}><strong>{t('ulnar')}</strong>{arches&&<><span aria-hidden="true">↓</span><p>{t('superficial')}</p></>}</div>
    </div>
    {arches&&<p className={styles.connection}>{t('connection')}</p>}
    <figcaption>{t('diagram')}</figcaption>
  </figure>
}
function Check({item,lang}) {
  const [answer,setAnswer]=useState(null), id=`${UPPER_ARTERY_ID}-${item.slug}-check`
  return <div className={styles.check}><p id={id} className={styles.question}>{v(item.question,lang)}</p><div role="group" aria-labelledby={id} className={styles.options}>{item.options.map((option,i)=><button type="button" key={i} aria-pressed={answer===i} onClick={()=>setAnswer(i)}><b aria-hidden="true">{'ABCD'[i]}</b><span>{v(option,lang)}</span></button>)}</div>{answer!==null&&<p role="status" className={styles.feedback}>{v(item.feedback[answer],lang)}</p>}</div>
}
const takeaways=[
  {title:L('Namenswechsel','Name changes','تغییر نام'),detail:L('Erste Rippe: Subclavia → Axillaris. Teres-major-Unterrand: Axillaris → Brachialis.','First rib: subclavian → axillary. Inferior teres-major border: axillary → brachial.','دندهٔ اول: ساب‌کلاوین به آگزیلاری. لبهٔ تحتانی ترس ماژور: آگزیلاری به براکیال.')},
  {title:L('Unterarm','Forearm','ساعد'),detail:L('Radialis zur Daumenseite, Ulnaris zur Kleinfingerseite verfolgen; hohe Abgänge sind möglich.','Trace radial to the thumb side and ulnar to the little-finger side; high origins are possible.','رادیال را به سمت شست و اولنار را به سمت انگشت کوچک دنبال کنید؛ منشأ بالا ممکن است.')},
  {title:L('Handbögen','Palmar arches','قوس‌های کف‌دستی'),detail:L('Radialis überwiegend tief, Ulnaris überwiegend oberflächlich. Die tatsächliche Verbindung individuell beurteilen.','Radial mainly deep, ulnar mainly superficial. Assess actual connections individually.','رادیال عمدتاً عمقی و اولنار عمدتاً سطحی است. ارتباط واقعی را در هر فرد ارزیابی کنید.')},
]
export default function UpperLimbArteriesLesson() {
  const {lang}=useLanguage(),t=key=>v(LABELS[key],lang)
  const langPath=path=>lang==='de'?path:`${path}${path.includes('?')?'&':'?'}lang=${lang}`
  const returnPath=langPath(UPPER_ARTERY_PATH)
  const sections=UPPER_ARTERY_SECTIONS.map(s=>({...s,label:v(s.title,lang)}))
  return <StandardLessonShell lessonId={UPPER_ARTERY_ID} lang={lang} title={v(UPPER_ARTERY_TITLE,lang)} author="Dr. Zia"
    breadcrumbs={[{label:'RadYar',href:langPath('/')},{label:t('chapter'),href:langPath('/lernen/gefaesse-ir')},{label:v(UPPER_ARTERY_TITLE,lang)}]}
    sections={sections} labels={Object.fromEntries(Object.entries(LABELS).map(([key,value])=>[key,v(value,lang)]))} renderIcon={iconFor} syncHashNavigation
    actions={{mcq:{label:t('practice'),href:langPath(`/ueben/quiz?fach=gefaesse-ir&n=2&themen=${UPPER_ARTERY_ID}&from=${encodeURIComponent(returnPath)}`)},flashcards:{label:t('cards'),href:langPath(`/flashcards/${UPPER_ARTERY_ID}?from=${encodeURIComponent(returnPath)}`)}}}
    theme={{backgroundImage:'/andarun-galaxy-v3.png',heroImage:'/educational/upper-limb-arteries/hero.png',heroImageOpacity:.55,accent:'#9d5353',accentStrong:'#793b3b',accentSoft:'#f7eded',secondary:'#537f89',secondaryStrong:'#315c66',heroBase:'#152a35'}}
    heroImageAlt={t('heroAlt')} className={styles.page}
    sources={<LessonSources title={t('sources')} note={t('scope')} items={[{tag:'Anatomy',href:'https://pmc.ncbi.nlm.nih.gov/articles/PMC11736060/',title:'Friedman et al. · RadioGraphics · 2025',citation:'doi:10.1148/rg.240077 · Normal and Variant Anatomy',scope:v(L('Arterienverlauf, Landmarken, Unterarmäste und variable Hohlhandbögen.','Arterial course, landmarks, forearm branches and variable palmar arches.','مسیر شریان‌ها، نشانه‌های آناتومیک، شاخه‌های ساعد و قوس‌های کف‌دستی متغیر.'),lang)}]}/>}>
    <div className={styles.copy} lang={lang} dir={lang==='fa'?'rtl':'ltr'}>
      {sections.map((section,i)=><LessonSection key={section.id} id={section.id} title={section.label} icon={section.icon}>
        {i<3&&section.text.map((text,j)=><p key={j} className={j===0?styles.lead:undefined}>{v(text,lang)}</p>)}
        {i===0&&<><MainPath lang={lang}/><Check item={UPPER_ARTERY_CHECKS[0]} lang={lang}/></>}
        {i===1&&<DistalPath lang={lang}/>}
        {i===2&&<><DistalPath lang={lang} arches/><Check item={UPPER_ARTERY_CHECKS[1]} lang={lang}/></>}
        {i===3&&<TakeHomeList items={takeaways.map(item=>({title:v(item.title,lang),detail:v(item.detail,lang)}))}/>}
      </LessonSection>)}
    </div>
  </StandardLessonShell>
}
