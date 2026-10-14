'use client'

import LessonCaseGallery from './LessonCaseGallery'
import { ToolHeader } from './CAALearningTools'
import { CAA_CASE_COPY as COPY, CAA_RADIOPAEDIA_CASES as CASES } from '@/data/caaRadiopaedia'
import styles from './CAALearningTools.module.css'

const cases=CASES.map(item=>({id:item.id,label:item.label,caseData:{...item,variant:'compact',heading:item.title,title:item.findings[0],description:[...item.findings.slice(1),...(Array.isArray(item.interpretation)?item.interpretation:[item.interpretation])].filter(Boolean),findings:undefined,interpretation:undefined,credit:item.publication ? <>{item.credit} · <a href={item.url} target="_blank" rel="noopener noreferrer">{item.publication}</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></> : <>{item.credit.split('Radiopaedia.org')[0]}<a href="https://radiopaedia.org/" target="_blank" rel="noopener noreferrer">Radiopaedia.org</a> · <a href={`https://radiopaedia.org/cases/${item.id}`} target="_blank" rel="noopener noreferrer">rID {item.id}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 3.0</a></>}}))
export default function CAACaseGallery({lang,headingLevel='h3',showTitle=true}) {
  return <div data-learning-tool="cases">
    {showTitle && <ToolHeader title={COPY.title} hint={COPY.hint} lang={lang} as={headingLevel} />}
    <LessonCaseGallery items={cases} lang={lang} label={COPY.title} idPrefix="caa-cases" />
    <p className={styles.help}>{COPY.subset[lang] || COPY.subset.de}</p>
  </div>
}
