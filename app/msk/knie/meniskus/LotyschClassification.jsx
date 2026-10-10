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
  const extended = lang === 'de' ? ['Erweiterung nach Jerosch', 'Vollständige Destruktion oder komplexe Risskonfiguration'] : lang === 'fa' ? ['حالت توسعه‌یافته بر اساس Jerosch', 'تخریب کامل یا الگوی پارگی پیچیده'] : ['Jerosch extension', 'Complete destruction or complex tear configuration']
  const title = lang === 'de' ? 'Grade I bis III' : lang === 'fa' ? 'درجات I تا III' : 'Grades I to III'
  return <div className={styles.lotyschLayout} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <div className={styles.gradeDefinition} data-grade-definition="0"><h3 className={styles.gradeSquare}>{label.grade} 0</h3><p>{normal}</p></div>
    <InteractiveTeachingGroups groups={[{ id: 'lotysch', title, items, categoryInTabs: true }]} direction={lang === 'fa' ? 'rtl' : 'ltr'} renderExtra={item => item.id === 'II' ? <>
    <table className={styles.gradeSubtypeTable} aria-label={label.subtypes}>
      <tbody>{copy.tableRows.slice(1,4).map(row => <tr key={row[0]}>
        <th scope="row"><span dir="ltr">{row[0]}</span></th>
        <td><dl>{copy.tableHeaders.slice(1).map((heading,index) => <div key={heading}><dt>{heading}</dt><dd>{row[index+1]}</dd></div>)}</dl></td>
      </tr>)}</tbody>
    </table>
  </> : null} />
    <div className={styles.gradeDefinition} data-grade-definition="IV"><h3 className={styles.gradeSquare}>{label.grade} IV</h3><p><span className={styles.extensionLabel}>{extended[0]}</span>{extended[1]}</p></div>
  </div>
}
