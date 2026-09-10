import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })

export function LessonIcon({ id }) {
  const paths = {
    geltung: 'M12 3 20 6v6c0 5-8 9-8 9s-8-4-8-9V6z M8 12l3 3 5-6',
    einordnen: 'M12 3v7 M12 8 8 11 M12 8l4 3 M9 8C4 8 2 16 4 20c2 2 6 0 6-3V9 M15 8c5 0 7 8 5 12-2 2-6 0-6-3V9',
    messen: 'm4 16 12-12 4 4L8 20z M9 11l3 3 M12 8l3 3 M6 14l3 3',
    solide: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16 M9 9h6v6H9z',
    subsolide: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16 M14 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
    befund: 'M7 3h8l4 4v14H5V3z M14 3v5h5 M8 12h8 M8 16h6',
    cases: 'M9 3h6v3H9z M9 5H5v16h14V5h-4 M8 11l2 2 5-4 M8 17h8',
    summary: 'm12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z',
  }
  return <svg className={styles.lessonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[id] || paths.einordnen}/></svg>
}

export function MeasurementIllustration({ c }) {
  return <figure className={styles.measureFigure}>
    <svg viewBox="0 0 760 280" role="img" aria-label={c(L('Messschema: 8 mal 6 Millimeter ergeben 7 Millimeter mittleren Durchmesser; soliden Anteil separat messen', 'Measurement diagram: 8 by 6 millimeters gives a mean diameter of 7 millimeters; measure the solid component separately', 'شماتیک اندازه‌گیری: ۸ در ۶ میلی‌متر، قطر میانگین ۷ میلی‌متر؛ جزء جامد جداگانه اندازه‌گیری شود'))}>
      <rect width="760" height="280" rx="18" fill="#0b2331"/>
      <ellipse cx="170" cy="122" rx="72" ry="54" fill="#bfe9f4"/>
      <path d="M98 122h144 M170 68v108 M98 115v14m144-14v14M163 68h14m-14 108h14" stroke="#087e9d" strokeWidth="3"/>
      <text x="170" y="50" textAnchor="middle" fill="#e5f7ff" fontSize="20">8 mm</text><text x="258" y="128" fill="#e5f7ff" fontSize="20">6 mm</text>
      <text x="170" y="231" textAnchor="middle" fill="#67d5ed" fontSize="24">(8 + 6) / 2 = 7 mm</text>
      <path d="M380 30v215" stroke="#345565"/>
      <ellipse cx="570" cy="122" rx="77" ry="60" fill="#a7dce8" opacity=".25"/>
      <circle cx="587" cy="126" r="28" fill="#e0f7ff"/>
      <path d="M493 45h154m-154-6v12m154-12v12M559 126h56m-56-6v12m56-12v12" stroke="#67d5ed" strokeWidth="2"/>
      <text x="570" y="29" textAnchor="middle" fill="#e5f7ff" fontSize="16">{c(L('Gesamtherd', 'Whole nodule', 'کل ندول'))}</text>
      <path d="m600 153 30 28" stroke="#67d5ed" strokeWidth="2"/>
      <text x="570" y="223" textAnchor="middle" fill="#e5f7ff" fontSize="17">{c(L('Soliden Anteil separat messen', 'Measure the solid part separately', 'جزء جامد را جداگانه اندازه بگیرید'))}</text>
    </svg>
    <figcaption>{c(L('Eigene Messskizze: lange und senkrechte kurze Achse in derselben Ebene; beim teilsoliden Herd zusätzlich den soliden Anteil erfassen.', 'Original measurement sketch: long and perpendicular short axes in the same plane; additionally measure the solid component of a part-solid nodule.', 'طرح اختصاصی: محور بلند و کوتاه عمود در یک صفحه؛ در ندول بخشی جامد، جزء جامد نیز جداگانه اندازه‌گیری شود.'))}</figcaption>
  </figure>
}
