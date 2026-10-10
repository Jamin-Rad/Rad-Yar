'use client'

import InteractiveTeachingGroups from '@/components/lesson-template/InteractiveTeachingGroups'
import styles from './content.module.css'

const LABELS = {
  de: { grade: 'Grad', early: 'frühe mukoide Degeneration', tear: 'echter Riss', advanced: 'Fortgeschrittene Degeneration', subtypes: 'Grad II wird in drei Untergruppen unterteilt', noTear: 'Kein sicherer Rissnachweis' },
  en: { grade: 'Grade', early: 'Early mucoid degeneration', tear: 'True tear', advanced: 'Advanced degeneration', subtypes: 'Grade II is divided into three subgroups', noTear: 'No definite tear demonstrated' },
  fa: { grade: 'درجه', early: 'دژنراسیون موکوئید اولیه', tear: 'پارگی واقعی', advanced: 'دژنراسیون پیشرفته', subtypes: 'درجهٔ II به سه زیرگروه تقسیم می‌شود', noTear: 'پارگی قطعی اثبات نشده است' },
}

export default function LotyschClassification({ copy, lang }) {
  const label = LABELS[lang] || LABELS.de
  const items = ['I','II','III'].map(grade => ({ id: grade, label: `${label.grade} ${grade}`, category: grade === 'I' ? label.early : grade === 'II' ? label.advanced : label.tear,
    details: grade === 'II' ? null : copy.tableHeaders.slice(1).map((heading,index) => ({ id: String(index), label: heading, text: copy.tableRows[grade === 'I' ? 0 : 4][index+1] })),
  }))
  const title = lang === 'de' ? 'Grade I bis III' : lang === 'fa' ? 'درجات I تا III' : 'Grades I to III'
  const intro = lang === 'de' ? 'Wähle einen Grad, um Morphologie, Oberflächenkontakt und klinische Bedeutung zu vergleichen.' : lang === 'fa' ? 'یک درجه را انتخاب کنید تا مورفولوژی، تماس سطحی و اهمیت بالینی آن را ببینید.' : 'Select a grade to compare morphology, surface contact and clinical significance.'
  return <InteractiveTeachingGroups groups={[{ id: 'lotysch', title, intro, items }]} direction={lang === 'fa' ? 'rtl' : 'ltr'} renderExtra={item => item.id === 'II' ? <>
    <p className={styles.gradeSubgroupLabel}>{label.subtypes}</p>
    <div className={styles.subtypeTableWrap}><table className={styles.subtypeTable}>
      <thead><tr>{copy.tableHeaders.map(heading => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
      <tbody>{copy.tableRows.slice(1,4).map(row => <tr key={row[0]}><th scope="row" dir="ltr">{row[0]}</th>{row.slice(1).map((cell,index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
    </table></div>
  </> : null} />
}
