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
  const normal = lang === 'de' ? ['Normaler Meniskus','Homogen hypointens, regelrechte dreieckige Form','kein pathologischer Oberflächenkontakt','Normalbefund, kein Riss'] : lang === 'fa' ? ['منیسک طبیعی','هیپواینتنس هموژن با شکل مثلثی طبیعی','بدون تماس سطحی پاتولوژیک','نمای طبیعی، بدون پارگی'] : ['Normal meniscus','Homogeneously hypointense with normal triangular morphology','no abnormal surface-reaching signal','Normal appearance, no tear']
  items.unshift({ id: '0', label: `${label.grade} 0`, category: normal[0], details: copy.tableHeaders.slice(1).map((heading,index) => ({ id: String(index), label: heading, text: normal[index+1] })) })
  const extended = lang === 'de' ? ['Erweiterung · deformierter / segmentierter Meniskus','Zerrissene oder segmentierte Meniskusform','Signalveränderung erreicht die Meniskusoberfläche','Strukturelle Schädigung mit Formveränderung','Erweiterung nach Jerosch, nicht klassischer Lotysch.'] : lang === 'fa' ? ['حالت توسعه‌یافته · منیسک تغییرشکل‌یافته / قطعه‌قطعه','شکل پاره یا قطعه‌قطعه‌شدهٔ منیسک','تغییر سیگنال به سطح منیسک می‌رسد','آسیب ساختاری همراه با تغییر شکل','توسعه‌یافته بر اساس Jerosch، نه Lotysch کلاسیک.'] : ['Extended · deformed / segmented meniscus','Torn or segmented meniscal morphology','Signal abnormality reaches the meniscal surface','Structural damage with altered morphology','Jerosch extension, not classical Lotysch.']
  items.push({ id: 'IV', label: `${label.grade} IV`, category: extended[0], text: extended[4], details: copy.tableHeaders.slice(1).map((heading,index) => ({ id: String(index), label: heading, text: extended[index+1] })) })
  const title = lang === 'de' ? 'Grade 0 bis IV' : lang === 'fa' ? 'درجات ۰ تا IV' : 'Grades 0 to IV'
  return <InteractiveTeachingGroups groups={[{ id: 'lotysch', title, items, categoryInTabs: true }]} direction={lang === 'fa' ? 'rtl' : 'ltr'} renderExtra={item => item.id === 'II' ? <>
    <div className={styles.subtypeTableWrap}><table className={`${styles.subtypeTable} ${styles.gradeComparison}`} aria-label={label.subtypes}>
      <thead><tr><th scope="col">{lang === 'fa' ? 'ویژگی' : lang === 'de' ? 'Merkmal' : 'Feature'}</th>{copy.tableRows.slice(1,4).map(row => <th key={row[0]} scope="col" dir="ltr">{row[0]}</th>)}</tr></thead>
      <tbody>{copy.tableHeaders.slice(1).map((heading,index) => <tr key={heading}><th scope="row">{heading}</th>{copy.tableRows.slice(1,4).map(row => <td key={row[0]}>{row[index+1]}</td>)}</tr>)}</tbody>
    </table></div>
  </> : null} />
}
