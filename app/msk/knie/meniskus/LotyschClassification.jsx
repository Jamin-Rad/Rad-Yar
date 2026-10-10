'use client'

import { useId, useState } from 'react'
import styles from './content.module.css'

const LABELS = {
  de: { grade: 'Grad', early: 'frühe mukoide Degeneration', tear: 'echter Riss', advanced: 'Fortgeschrittene Degeneration', subtypes: 'Grad II wird in drei Untergruppen unterteilt', noTear: 'Kein sicherer Rissnachweis' },
  en: { grade: 'Grade', early: 'Early mucoid degeneration', tear: 'True tear', advanced: 'Advanced degeneration', subtypes: 'Grade II is divided into three subgroups', noTear: 'No definite tear demonstrated' },
  fa: { grade: 'درجه', early: 'دژنراسیون موکوئید اولیه', tear: 'پارگی واقعی', advanced: 'دژنراسیون پیشرفته', subtypes: 'درجهٔ II به سه زیرگروه تقسیم می‌شود', noTear: 'پارگی قطعی اثبات نشده است' },
}

function GradeDetails({ row, headers }) {
  return <dl className={styles.gradeDetails}>{headers.slice(1).map((label, index) => <div key={label}><dt>{label}</dt><dd>{row[index + 1]}</dd></div>)}</dl>
}

export default function LotyschClassification({ copy, lang }) {
  const label = LABELS[lang] || LABELS.de
  const [activeGrade, setActiveGrade] = useState('II')
  const [activeSubtype, setActiveSubtype] = useState('2a')
  const prefix = useId()
  return <div className={styles.gradeHierarchy}>
    {['I','II','III'].map(grade => <section key={grade} className={`${styles.gradeCard} ${grade === 'II' ? styles.gradeTwo : ''}`} data-active={activeGrade === grade}>
      <h4 className={styles.gradeHeading}><button type="button" className={styles.gradeSelect} onClick={() => setActiveGrade(current => current === grade ? null : grade)} aria-expanded={activeGrade === grade} aria-controls={`${prefix}-${grade}`}>
        <span className={styles.gradeBadge}>{label.grade} {grade}</span><strong>{grade === 'I' ? label.early : grade === 'II' ? label.advanced : label.tear}</strong><span className={styles.gradeChevron} aria-hidden="true">{activeGrade === grade ? '−' : '+'}</span>
      </button></h4>
      <div id={`${prefix}-${grade}`} className={styles.gradeBody} hidden={activeGrade !== grade}>
      {grade !== 'II' ? <GradeDetails row={copy.tableRows[grade === 'I' ? 0 : 4]} headers={copy.tableHeaders} /> : <>
      <p className={styles.gradeSubgroupLabel}>{label.subtypes}</p>
      <div className={styles.gradeSubgroups}>{copy.tableRows.slice(1,4).map(row => <section key={row[0]} className={styles.gradeSubtype}>
        <h5><button type="button" className={styles.subtypeSelect} onClick={() => setActiveSubtype(current => current === row[0] ? null : row[0])} aria-expanded={activeSubtype === row[0]} aria-controls={`${prefix}-${row[0]}`}><span dir="ltr">{row[0]}</span><span aria-hidden="true">{activeSubtype === row[0] ? '−' : '+'}</span></button></h5>
        <div id={`${prefix}-${row[0]}`} className={styles.subtypeBody} hidden={activeSubtype !== row[0]}><GradeDetails row={row[0] === '2a' ? [row[0], row[1], row[2], label.noTear] : row} headers={copy.tableHeaders} /></div>
      </section>)}</div>
      </>}
      </div>
    </section>)}
  </div>
}
