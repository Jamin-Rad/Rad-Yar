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
  const normal = lang === 'de' ? 'Normaler Meniskus mit homogen hypointensem Signal und regelrechter dreieckiger Form, ohne pathologische Signalsteigerung.' : lang === 'fa' ? 'منیسک طبیعی با سیگنال هیپواینتنس هموژن و شکل مثلثی طبیعی، بدون افزایش سیگنال پاتولوژیک.' : 'Normal meniscus with homogeneous hypointense signal and normal triangular shape, without abnormal signal increase.'
  const extended = lang === 'de' ? 'Deformierter oder segmentierter Meniskus mit Signalveränderung bis zur Oberfläche. Erweiterung nach Jerosch, nicht Teil der klassischen Lotysch-Klassifikation.' : lang === 'fa' ? 'منیسک تغییرشکل‌یافته یا قطعه‌قطعه با تغییر سیگنال تا سطح منیسک؛ حالت توسعه‌یافته بر اساس Jerosch و نه بخشی از طبقه‌بندی کلاسیک Lotysch.' : 'Deformed or segmented meniscus with signal abnormality reaching the surface. Jerosch extension, not part of the classical Lotysch classification.'
  const title = lang === 'de' ? 'Grade I bis III' : lang === 'fa' ? 'درجات I تا III' : 'Grades I to III'
  return <div className={styles.lotyschLayout} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <div className={styles.gradeDefinition} data-grade-definition="0"><h3 className={styles.gradeSquare}>{label.grade} 0</h3><p>{normal}</p></div>
    <InteractiveTeachingGroups groups={[{ id: 'lotysch', title, items, categoryInTabs: true }]} direction={lang === 'fa' ? 'rtl' : 'ltr'} renderExtra={item => item.id === 'II' ? <>
    <div className={styles.subtypeTableWrap}><table className={`${styles.subtypeTable} ${styles.gradeComparison}`} aria-label={label.subtypes}>
      <thead><tr><th scope="col">{lang === 'fa' ? 'ویژگی' : lang === 'de' ? 'Merkmal' : 'Feature'}</th>{copy.tableRows.slice(1,4).map(row => <th key={row[0]} scope="col" dir="ltr">{row[0]}</th>)}</tr></thead>
      <tbody>{copy.tableHeaders.slice(1).map((heading,index) => <tr key={heading}><th scope="row">{heading}</th>{copy.tableRows.slice(1,4).map(row => <td key={row[0]}>{row[index+1]}</td>)}</tr>)}</tbody>
    </table></div>
  </> : null} />
    <div className={styles.gradeDefinition} data-grade-definition="IV"><h3 className={styles.gradeSquare}>{label.grade} IV</h3><p>{extended}</p></div>
  </div>
}
