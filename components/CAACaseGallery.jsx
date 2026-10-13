'use client'

import { useId, useState } from 'react'
import LessonCaseFile from './LessonCaseFile'
import { Tabs, ToolHeader } from './CAALearningTools'
import { CAA_CASE_COPY as COPY, CAA_RADIOPAEDIA_CASES as CASES } from '@/data/caaRadiopaedia'
import styles from './CAALearningTools.module.css'

export default function CAACaseGallery({ lang }) {
  const [selected, setSelected] = useState(0)
  const id = 'caa-cases-' + useId().replaceAll(':', '')
  const item = CASES[selected]
  return <div className={styles.panel} data-learning-tool="cases">
    <ToolHeader title={COPY.title} hint={COPY.hint} lang={lang} />
    <Tabs items={CASES.map(item => item.label)} value={selected} onChange={setSelected} id={id} label={COPY.title} lang={lang} />
    <div id={id + '-panel'} role="tabpanel" aria-labelledby={id + '-tab-' + selected} data-case-id={item.id}>
      <LessonCaseFile key={item.id} lang={lang} caseData={{ ...item, credit: <>{item.credit.split('Radiopaedia.org')[0]}<a href="https://radiopaedia.org/" target="_blank" rel="noopener noreferrer">Radiopaedia.org</a> · <a href={`https://radiopaedia.org/cases/${item.id}`} target="_blank" rel="noopener noreferrer">rID {item.id}</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 3.0</a></> }} />
      <p className={styles.help}>{COPY.subset[lang] || COPY.subset.de}</p>
    </div>
  </div>
}
