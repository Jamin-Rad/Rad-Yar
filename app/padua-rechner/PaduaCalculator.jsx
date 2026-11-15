'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { assessPadua, categories } from './criteria.mjs'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const COPY = {
  title: L('Padua-Rechner', 'Padua calculator', 'محاسبه‌گر پادوا'),
  subtitle: L('Arrhythmogene Kardiomyopathie nach den Padua-Kriterien von 2020 einordnen.', 'Assess arrhythmogenic cardiomyopathy using the 2020 Padua criteria.', 'کاردیومیوپاتی آریتموژن را بر اساس معیارهای پادوا ۲۰۲۰ ارزیابی کنید.'),
  lesson: L('Zur ACM-Lektion', 'ACM lesson', 'درس ACM'),
  theme: L('Hell-/Dunkelmodus wechseln', 'Switch light or dark mode', 'تغییر حالت روشن یا تیره'),
  language: L('Sprache', 'Language', 'زبان'),
  categories: L('Kategorien', 'Categories', 'دسته‌ها'),
  checked: L('beurteilt', 'reviewed', 'ارزیابی‌شده'),
  outstanding: L('Offen', 'Pending', 'باز'),
  reviewed: L('Beurteilt', 'Reviewed', 'ارزیابی‌شده'),
  incomplete: L('Unvollständig beurteilt', 'Partially assessed', 'ارزیابی ناقص'),
  select: L('Alle sicher erfüllten Kriterien markieren.', 'Select all criteria that are confidently met.', 'همهٔ معیارهایی را که با اطمینان برآورده شده‌اند انتخاب کنید.'),
  next: L('Weiter', 'Next', 'بعدی'),
  negative: L('Keine Kriterien erfüllt', 'No criteria met', 'هیچ معیاری برآورده نشده'),
  skip: L('Offen lassen', 'Leave pending', 'باز بماند'),
  back: L('Zurück', 'Back', 'بازگشت'),
  result: L('Auswertung', 'Assessment', 'نتیجه'),
  provisional: L('Vorläufige Einordnung', 'Provisional assessment', 'نتیجهٔ موقت'),
  unknown: L('Offene Kategorien können die Einstufung oder den Phänotyp verändern.', 'Pending categories may change the tier or phenotype.', 'دسته‌های باز ممکن است رده یا فنوتیپ را تغییر دهند.'),
  reset: L('Neu beginnen', 'Start again', 'شروع دوباره'),
  rv: L('Rechter Ventrikel', 'Right ventricle', 'بطن راست'),
  lv: L('Linker Ventrikel', 'Left ventricle', 'بطن چپ'),
  shared: L('Familienanamnese und Genetik', 'Family history and genetics', 'سابقهٔ خانوادگی و ژنتیک'),
  gradeMajor: L('Major', 'Major', 'اصلی'),
  gradeMinor: L('Minor', 'Minor', 'فرعی'),
  points: L('Punkte', 'points', 'امتیاز'),
  right: L('Rechtsdominante ACM (ARVC)', 'Right-dominant ACM (ARVC)', 'ACM راست‌غالب (ARVC)'),
  biventricular: L('Biventrikuläre ACM', 'Biventricular ACM', 'ACM دوبطنی'),
  left: L('Isoliert linksventrikuläres Muster', 'Isolated LV pattern', 'الگوی محدود به بطن چپ'),
  definite: L('Gesichert', 'Definite', 'قطعی'),
  borderline: L('Grenzwertig', 'Borderline', 'مرزی'),
  possible: L('Möglich', 'Possible', 'ممکن'),
  belowThreshold: L('Unterhalb der diagnostischen Schwelle', 'Below the diagnostic threshold', 'زیر آستانهٔ تشخیصی'),
  noAnchor: L('Keine morphofunktionelle oder strukturelle Grundlage belegt', 'No morphofunctional or structural basis established', 'معیار شکل و عملکرد یا ساختاری ثبت نشده'),
  noAnchorWhy: L('Mindestens ein Kriterium aus Kategorie I oder II muss erfüllt sein.', 'At least one category I or II criterion must be met.', 'دست‌کم یک معیار از دستهٔ I یا II باید برآورده شود.'),
  alvcMet: L('ALVC-Kriterien erfüllt', 'ALVC criteria met', 'معیارهای ALVC برآورده شده‌اند'),
  alvcMissing: L('ALVC-Kriterien noch nicht belegt', 'ALVC criteria not established', 'معیارهای ALVC هنوز ثابت نشده‌اند'),
  lge: L('Strukturelles LV-Major-Kriterium (typisches LGE)', 'Major LV structural criterion (characteristic LGE)', 'معیار اصلی ساختاری بطن چپ (الگوی شاخص LGE)'),
  gene: L('Pathogene oder wahrscheinlich pathogene ACM-Genvariante', 'Pathogenic or likely pathogenic ACM variant', 'واریانت بیماری‌زا یا احتمالاً بیماری‌زای مرتبط با ACM'),
  met: L('Erfüllt', 'Met', 'برآورده شده'),
  notDocumented: L('Nicht belegt', 'Not established', 'ثابت نشده'),
  scoreRule: L('Pro Kategorie zählt das stärkste Kriterium. Major gibt 2 Punkte, Minor 1 Punkt.', 'Count the strongest criterion in each category. Major gives 2 points and minor 1 point.', 'در هر دسته قوی‌ترین معیار حساب می‌شود. معیار اصلی ۲ و معیار فرعی ۱ امتیاز دارد.'),
  rvExclusion: L('Bei rechtsdominanter ACM zählen linksventrikuläre EKG- und Arrhythmiekriterien nicht mit.', 'LV ECG and arrhythmia criteria are excluded for right-dominant ACM.', 'در ACM راست‌غالب، معیارهای نوار قلب و آریتمی بطن چپ حساب نمی‌شوند.'),
  excluded: L('Für den ermittelten Phänotyp ohne Wertung', 'Excluded for this phenotype', 'برای این فنوتیپ بدون امتیاز'),
  source: L('Padua-Kriterien 2020', '2020 Padua criteria', 'معیارهای پادوا ۲۰۲۰'),
  interpretation: L('Anwendung und Fallbeispiele', 'Application and case examples', 'کاربرد و نمونه‌های بالینی'),
  context: L('Für die fachliche Einordnung. Befunde im klinischen Kontext prüfen und Phänokopien berücksichtigen.', 'For professional interpretation. Review findings in clinical context and consider phenocopies.', 'برای تفسیر تخصصی. یافته‌ها را در زمینهٔ بالینی بررسی کنید و بیماری‌های مشابه را در نظر بگیرید.'),
}

function Result({ assessment, review, reviewedCount, t, label, goTo }) {
  const left = assessment.phenotype === 'left'
  const scored = assessment.points !== null
  const provisional = reviewedCount < categories.length

  return <>
    <div className={styles.resultHero} data-outcome={assessment.outcome}>
      {provisional && <p className={styles.provisional}>{t('provisional')}</p>}
      <h2 id="padua-step">{t(assessment.outcome)}</h2>
      {assessment.phenotype !== 'none' && <p>{t(assessment.phenotype)}</p>}
      {scored && <strong className={styles.score}><bdi>{assessment.points}</bdi> {t('points')}</strong>}
      {assessment.outcome === 'noAnchor' && <p>{t('noAnchorWhy')}</p>}
    </div>
    {provisional && <p className={styles.hint}>{t('unknown')}</p>}
    {left && <dl className={styles.requirements}>
      <div><dt>{t('lge')}</dt><dd>{t(assessment.hasLge ? 'met' : 'notDocumented')}</dd></div>
      <div><dt>{t('gene')}</dt><dd>{t(assessment.hasGene ? 'met' : 'notDocumented')}</dd></div>
    </dl>}
    <div className={styles.breakdown}>
      {assessment.breakdown.map((category, index) => <details key={category.id}>
        <summary>
          <span className={styles.roman}>{categories[index].number}</span>
          <strong>{label(categories[index].title)}</strong>
          <span>{scored && category.points > 0 ? `${category.points} ${t('points')}` : t(review[category.id] === 'reviewed' ? 'reviewed' : 'outstanding')}</span>
        </summary>
        <ul>
          {category.matches.map(criterion => <li key={criterion.id}>
            <strong>{t(criterion.grade === 2 ? 'gradeMajor' : 'gradeMinor')}</strong>{' '}
            {label(criterion.text)}
            {scored && !category.eligible.includes(criterion) && <small>{t('excluded')}</small>}
          </li>)}
          {category.matches.length === 0 && <li>{t(review[category.id] === 'reviewed' ? 'negative' : 'notDocumented')}</li>}
        </ul>
        <button className={styles.textButton} type="button" onClick={() => goTo(index)}>{label(categories[index].title)} <span aria-hidden="true">↗</span></button>
      </details>)}
    </div>
    {scored && <p className={styles.hint}>{t('scoreRule')} {assessment.phenotype === 'right' && t('rvExclusion')}</p>}
  </>
}

export default function PaduaCalculator() {
  const { lang, setLang } = useLanguage()
  const { toggleTheme } = useTheme()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(() => new Set())
  const [review, setReview] = useState({})
  const panel = useRef(null)
  const label = value => value[lang] || value.de
  const t = key => label(COPY[key])
  const category = categories[step]
  const isResult = !category
  const hasMatches = category?.criteria.some(criterion => selected.has(criterion.id))
  const reviewedCount = Object.values(review).filter(status => status === 'reviewed').length
  const assessment = isResult ? assessPadua(selected) : null
  const lessonHref = `/thorax/kardio/arvc${lang === 'de' ? '' : `?lang=${lang}`}#kriterien`

  function goTo(index) {
    setStep(index)
    requestAnimationFrame(() => {
      panel.current?.focus({ preventScroll: true })
      panel.current?.scrollIntoView({ block: 'start' })
    })
  }

  function toggleFinding(id) {
    setSelected(previous => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setReview(previous => ({ ...previous, [category.id]: undefined }))
  }

  function finishCategory(complete) {
    setReview(previous => ({ ...previous, [category.id]: complete ? 'reviewed' : 'pending' }))
    goTo(step + 1)
  }

  function reset() {
    setSelected(new Set())
    setReview({})
    goTo(0)
  }

  return <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href={lessonHref} className={styles.backLink}><span aria-hidden="true" className={styles.backArrow}>←</span>{t('lesson')}</Link>
        <div className={styles.preferences}>
          <label className={styles.language}><span className={styles.srOnly}>{t('language')}</span>
            <select value={lang} onChange={event => setLang(event.target.value)}>
              <option value="de">DE</option><option value="en">EN</option><option value="fa">FA</option>
            </select>
          </label>
          <button type="button" className={styles.themeButton} onClick={toggleTheme} aria-label={t('theme')}>◐</button>
        </div>
      </header>
      <div className={styles.hero}>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
      </div>
      <div className={styles.layout}>
        <nav className={styles.navigation} aria-label={t('categories')}>
          <div className={styles.progress}>
            <span><bdi>{reviewedCount} / {categories.length}</bdi> {t('checked')}</span>
            <progress max={categories.length} value={reviewedCount} aria-label={t('checked')}/>
          </div>
          <ol>
            {categories.map((entry, index) => <li key={entry.id}>
              <button type="button" onClick={() => goTo(index)} aria-current={step === index ? 'step' : undefined}>
                <span className={styles.roman}>{entry.number}</span><span>{label(entry.title)}</span>
                {review[entry.id] === 'reviewed' && <span className={styles.check} aria-label={t('reviewed')}>✓</span>}
                {review[entry.id] === 'pending' && <span className={styles.check} aria-label={t('incomplete')}>–</span>}
              </button>
            </li>)}
          </ol>
          <button className={styles.resultLink} type="button" onClick={() => goTo(categories.length)} aria-current={isResult ? 'step' : undefined}>
            {t('result')} <span aria-hidden="true">↗</span>
          </button>
        </nav>
        <section ref={panel} className={styles.panel} aria-labelledby="padua-step" tabIndex={-1}>
          {isResult ? <Result assessment={assessment} review={review} reviewedCount={reviewedCount} t={t} label={label} goTo={goTo}/> : <>
            <header className={styles.panelHeader}>
              <span className={styles.roman}>{category.number}</span>
              <h2 id="padua-step">{label(category.title)}</h2>
            </header>
            <p>{t('select')}</p>
            {category.hint && <p className={styles.hint}>{label(category.hint)}</p>}
            {['rv', 'lv', 'shared'].map(side => {
              const criteria = category.criteria.filter(criterion => criterion.side === side)
              return criteria.length > 0 && <fieldset key={side} className={styles.fieldset}>
                <legend>{t(side)}</legend>
                {criteria.map(criterion => <label className={styles.choice} key={criterion.id}>
                  <input type="checkbox" checked={selected.has(criterion.id)} onChange={() => toggleFinding(criterion.id)}/>
                  <span><strong className={styles.grade} data-major={criterion.grade === 2}>{t(criterion.grade === 2 ? 'gradeMajor' : 'gradeMinor')}</strong>{label(criterion.text)}</span>
                </label>)}
              </fieldset>
            })}
          </>}
          <footer className={styles.controls}>
            {step > 0 && <button type="button" className={styles.secondary} onClick={() => goTo(step - 1)}>{t('back')}</button>}
            {isResult ? <button type="button" className={styles.primary} onClick={reset}>{t('reset')}</button> : <>
              <button type="button" className={styles.secondary} onClick={() => finishCategory(false)}>{t('skip')}</button>
              <button type="button" className={styles.primary} onClick={() => finishCategory(true)}>{hasMatches ? t('next') : t('negative')}</button>
            </>}
          </footer>
        </section>
      </div>
      <footer className={styles.sources}>
        <p>{t('context')}</p>
        <a href="https://doi.org/10.1016/j.ijcard.2020.06.005">{t('source')}</a>
        <a href="https://pubmed.ncbi.nlm.nih.gov/35012021/">{t('interpretation')}</a>
      </footer>
    </div>
  </main>
}
