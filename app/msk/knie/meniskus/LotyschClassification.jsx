import styles from './content.module.css'

const LABELS = {
  de: { grade: 'Grad', advanced: 'Fortgeschrittene Degeneration', subtypes: 'Grad II wird in drei Untergruppen unterteilt', noTear: 'Kein sicherer Rissnachweis' },
  en: { grade: 'Grade', advanced: 'Advanced degeneration', subtypes: 'Grade II is divided into three subgroups', noTear: 'No definite tear demonstrated' },
  fa: { grade: 'درجه', advanced: 'دژنراسیون پیشرفته', subtypes: 'درجهٔ II به سه زیرگروه تقسیم می‌شود', noTear: 'پارگی قطعی اثبات نشده است' },
}

function GradeDetails({ row, headers }) {
  return <dl className={styles.gradeDetails}>{headers.slice(1).map((label, index) => <div key={label}><dt>{label}</dt><dd>{row[index + 1]}</dd></div>)}</dl>
}

export default function LotyschClassification({ copy, lang }) {
  const label = LABELS[lang] || LABELS.de
  return <div className={styles.gradeHierarchy}>
    <section className={styles.gradeCard}><h4>{label.grade} I</h4><GradeDetails row={copy.tableRows[0]} headers={copy.tableHeaders} /></section>
    <section className={`${styles.gradeCard} ${styles.gradeTwo}`} aria-labelledby="lotysch-grade-two">
      <header className={styles.gradeParent}><h4 id="lotysch-grade-two">{label.grade} II</h4><strong>{label.advanced}</strong></header>
      <p className={styles.gradeSubgroupLabel}>{label.subtypes}</p>
      <div className={styles.gradeSubgroups}>{copy.tableRows.slice(1,4).map(row => <section key={row[0]} className={styles.gradeSubtype}>
        <h5 dir="ltr">{row[0]}</h5>
        <GradeDetails row={row[0] === '2a' ? [row[0], row[1], row[2], label.noTear] : row} headers={copy.tableHeaders} />
      </section>)}</div>
    </section>
    <section className={styles.gradeCard}><h4>{label.grade} III</h4><GradeDetails row={copy.tableRows[4]} headers={copy.tableHeaders} /></section>
  </div>
}
