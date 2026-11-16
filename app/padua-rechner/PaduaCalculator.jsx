'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/rechner/Icons'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { categories } from './criteria.mjs'
import { evaluateFindings, GROUPS, isReviewed, L, optionsFor, questionsFor, selectFinding, validMeasurements } from './workflow.mjs'
import kaiser from '@/app/kaiser-score/page.module.css'
import styles from './page.module.css'

const COPY = {
  title: L('ACM-Rechner', 'ACM calculator', 'محاسبه‌گر ACM'),
  subject: L('Arrhythmogene Kardiomyopathie', 'Arrhythmogenic cardiomyopathy', 'کاردیومیوپاتی آریتموژن'),
  accordingTo: L('nach', 'using', 'بر اساس'),
  systems: L('TFC 2010 und Padua 2020', 'TFC 2010 and Padua 2020', 'TFC ۲۰۱۰ و پادوا ۲۰۲۰'),
  lesson: L('Zur ACM-Lektion', 'ACM lesson', 'درس ACM'),
  theme: L('Hell-/Dunkelmodus wechseln', 'Switch light or dark mode', 'تغییر حالت روشن یا تیره'),
  language: L('Sprache', 'Language', 'زبان'),
  categories: L('Kategorien', 'Categories', 'دسته‌ها'),
  reviewed: L('Beurteilt', 'Reviewed', 'ارزیابی‌شده'),
  next: L('Weiter', 'Next', 'بعدی'),
  negative: L('Keiner dieser Befunde', 'None of these findings', 'هیچ‌کدام از این یافته‌ها'),
  skip: L('Nicht beurteilbar', 'Not assessable', 'قابل ارزیابی نیست'),
  back: L('Zurück', 'Back', 'بازگشت'),
  result: L('Auswertung', 'Assessment', 'نتیجه'),
  provisional: L('Vorläufige Einordnung', 'Provisional assessment', 'نتیجهٔ موقت'),
  reset: L('Neu beginnen', 'Start again', 'شروع دوباره'),
  gradeMajor: L('Major', 'Major', 'اصلی'),
  gradeMinor: L('Minor', 'Minor', 'فرعی'),
  points: L('Punkte', 'points', 'امتیاز'),
  point: L('Punkt', 'point', 'امتیاز'),
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
  comparison: L('TFC 2010 und Padua 2020 im Vergleich', 'Compare TFC 2010 and Padua 2020', 'مقایسهٔ TFC ۲۰۱۰ و پادوا ۲۰۲۰'),
  tfc: L('TFC 2010 · ARVC', 'TFC 2010 · ARVC', 'TFC ۲۰۱۰ · ARVC'),
  padua: L('Padua 2020 · ACM', 'Padua 2020 · ACM', 'پادوا ۲۰۲۰ · ACM'),
  comparisonHint: L('Beide Auswertungen verwenden dieselben Angaben. Die Kriterien werden pro System getrennt gewertet.', 'Both assessments use the same findings. Each system scores its own criteria independently.', 'هر دو ارزیابی از یافته‌های یکسان استفاده می‌کنند. هر سیستم معیارهای خود را جداگانه امتیاز می‌دهد.'),
  unknown: L('Unvollständige Angaben können die Einstufung oder den Phänotyp verändern.', 'Missing information can change the tier or phenotype.', 'اطلاعات ناقص ممکن است رده یا فنوتیپ را تغییر دهند.'),
  measurementsHint: L('TFC 2010 · Grenzwerte für Erwachsene', 'TFC 2010 · Adult thresholds', 'TFC ۲۰۱۰ · آستانه‌های بزرگسالان'),
  noMeasurements: L('Keine Messwerte verfügbar', 'Measurements unavailable', 'مقادیر اندازه‌گیری در دسترس نیست'),
  sex: L('Referenzgruppe für RVEDVi', 'RVEDVi reference group', 'گروه مرجع RVEDVi'),
  female: L('Weiblich', 'Female', 'زن'),
  male: L('Männlich', 'Male', 'مرد'),
  unspecified: L('Nicht angegeben', 'Not specified', 'مشخص نشده'),
  edvi: L('RVEDVi (ml/m²)', 'RVEDVi (mL/m²)', 'RVEDVi (میلی‌لیتر بر متر مربع)'),
  ef: L('RVEF (%)', 'RVEF (%)', 'RVEF (٪)'),
  invalid: L('RVEDVi muss größer als 0 sein. RVEF muss zwischen 0 und 100 % liegen. Bitte nur Zahlen eingeben.', 'RVEDVi must be above zero. RVEF must be between 0 and 100%. Enter numbers only.', 'RVEDVi باید بزرگ‌تر از صفر باشد. RVEF باید بین ۰ و ۱۰۰٪ باشد. فقط عدد وارد کنید.'),
  noneInCategory: L('Kein Kriterium belegt', 'No criterion established', 'معیاری ثبت نشده'),
  scoredFindings: L('Kriterien im Detail', 'Criteria breakdown', 'جزئیات معیارها'),
}

const EMPTY_VALUES = { sex: '', edvi: '', ef: '', unavailable: false }

function ResultSummary({ assessment, t }) {
  const left = assessment.phenotype === 'left'
  const scored = assessment.points !== null

  return <>
    <strong className={styles.outcome}>{t(assessment.outcome)}</strong>
    {assessment.phenotype && assessment.phenotype !== 'none' && <p>{t(assessment.phenotype)}</p>}
    {scored && <p className={styles.score}><bdi>{assessment.points}</bdi> {t(assessment.points === 1 ? 'point' : 'points')}</p>}
    {assessment.outcome === 'noAnchor' && <p>{t('noAnchorWhy')}</p>}
    {left && <dl className={styles.requirements}>
      <div><dt>{t('lge')}</dt><dd>{t(assessment.hasLge ? 'met' : 'notDocumented')}</dd></div>
      <div><dt>{t('gene')}</dt><dd>{t(assessment.hasGene ? 'met' : 'notDocumented')}</dd></div>
    </dl>}
  </>
}

function Result({ assessment, provisional, t, label }) {
  return <div className={kaiser.resultPanel}>
    <header className={styles.prompt}>
      <h2 id="padua-step">{t('comparison')}</h2>
      <p>{t('comparisonHint')}</p>
    </header>
    {provisional && <p className={`${kaiser.questionHelp} ${styles.hint}`}><strong>{t('provisional')}.</strong> {t('unknown')}</p>}
    <div className={styles.resultGrid}>
      {['tfc', 'padua'].map(system => <section key={system} className={styles.resultCard} aria-labelledby={`result-${system}`}>
        <h3 id={`result-${system}`}>{t(system)}</h3>
        <ResultSummary assessment={assessment[system]} t={t}/>
      </section>)}
    </div>
    <div className={styles.resultDetails}>
      {['tfc', 'padua'].map(system => <details key={system} className={styles.resultEvidence}>
        <summary>{t(system)} <span>{t('scoredFindings')}</span></summary>
        <div className={styles.breakdown}>
          {assessment[system].breakdown.map((category, index) => <details key={category.id}>
            <summary>
              <span className={styles.roman}>{categories[index].number}</span>
              <strong>{label(categories[index].title)}</strong>
              {assessment[system].points !== null && category.points > 0 && <span>{category.points} {t(category.points === 1 ? 'point' : 'points')}</span>}
            </summary>
            <ul>
              {category.matches.map((criterion, matchIndex) => <li key={criterion.id || matchIndex}>
                <strong>{t(criterion.grade === 2 ? 'gradeMajor' : 'gradeMinor')}</strong>{' '}
                {label(criterion.text || criterion.title)}
                {category.eligible && !category.eligible.includes(criterion) && <small>{t('excluded')}</small>}
              </li>)}
              {category.matches.length === 0 && <li>{t('noneInCategory')}</li>}
            </ul>
          </details>)}
        </div>
      </details>)}
    </div>
    <p className={styles.hint}>{t('scoreRule')} {assessment.padua.phenotype === 'right' && t('rvExclusion')}</p>
  </div>
}

export default function PaduaCalculator() {
  const { lang, setLang } = useLanguage()
  const { toggleTheme } = useTheme()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [values, setValues] = useState(EMPTY_VALUES)
  const panel = useRef(null)
  const label = value => value[lang] || value.de
  const t = key => label(COPY[key])
  const questions = questionsFor(answers)
  const measures = questions.find(item => item.id === 'rv-values')
  const rvGlobal = questions.find(item => item.id === 'rv-global')
  const steps = questions.filter(item => !measures || item !== rvGlobal)
  const current = steps[step]
  const isResult = !current
  const valid = validMeasurements(values)
  const hasAnswer = item => Boolean(answers[item.id]?.length)
  const canAdvance = isResult || (current === measures
    ? valid && (values.unavailable || values.ef || values.edvi) && (!rvGlobal || hasAnswer(rvGlobal))
    : hasAnswer(current))
  const assessment = isResult ? evaluateFindings(answers, values) : null
  const provisional = questions.some(item => !isReviewed(item, answers, values))
  const lessonHref = `/thorax/kardio/arvc${lang === 'de' ? '' : `?lang=${lang}`}#kriterien`

  function goTo(index) {
    setStep(index)
    requestAnimationFrame(() => {
      panel.current?.focus({ preventScroll: true })
      panel.current?.scrollIntoView({ block: 'start' })
    })
  }

  function choose(item, id) {
    setAnswers(previous => ({
      ...previous,
      [item.id]: selectFinding(item, previous[item.id] || [], id),
      ...(item.id === 'family' ? { 'family-arvc': [] } : {}),
      ...(item.id === 'rv-motion' ? { 'rv-global': [] } : {}),
    }))
    if (item.id === 'rv-motion') setValues(EMPTY_VALUES)
  }

  function renderChoices(item) {
    const selected = answers[item.id] || []
    return <div key={item.id}>
      <div className={`${kaiser.options} ${styles.options}`}>
        {optionsFor(item, answers).map(choice => {
          const marked = selected.includes(choice.id)
          return <button key={choice.id} type="button" className={marked ? kaiser.optionSelected : undefined} aria-pressed={marked} onClick={() => choose(item, choice.id)}>
            <i aria-hidden="true">{marked ? '✓' : ''}</i>
            <span className={kaiser.optionCopy}><strong>{label(choice.title)}</strong>{choice.text && <small>{label(choice.text)}</small>}</span>
          </button>
        })}
      </div>
      <div className={styles.alternatives}>
        <button type="button" aria-pressed={selected.includes('none')} onClick={() => choose(item, 'none')}>{t('negative')}</button>
        <button type="button" aria-pressed={selected.includes('unknown')} onClick={() => choose(item, 'unknown')}>{t('skip')}</button>
      </div>
    </div>
  }

  function changeMeasurement(event) {
    const { name, value } = event.target
    setValues(previous => ({ ...previous, [name]: value, unavailable: false }))
  }

  function reset() {
    setAnswers({})
    setValues(EMPTY_VALUES)
    goTo(0)
  }

  return <main className={`${kaiser.page} ${styles.page}`} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <header className={kaiser.topbar}>
      <Link href={lessonHref} className={kaiser.brand} title={t('lesson')}>
        <span className={styles.brandIcon}><Icon name="heart"/></span><span>{t('title')}</span>
      </Link>
      <nav>
        <button type="button" className={kaiser.themeToggle} onClick={toggleTheme} aria-label={t('theme')}>
          <svg className={kaiser.sunIcon} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
          <svg className={kaiser.moonIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A8.7 8.7 0 0 1 8.8 4a8.7 8.7 0 1 0 11.2 11.2Z"/></svg>
        </button>
        <div className={kaiser.languages} role="group" aria-label={t('language')}>
          {['de', 'en', 'fa'].map(code => <button type="button" key={code} onClick={() => setLang(code)} className={lang === code ? kaiser.langActive : undefined} aria-pressed={lang === code}>{code.toUpperCase()}</button>)}
        </div>
      </nav>
    </header>
    <div className={`${kaiser.shell} ${styles.shell}`} data-result={isResult}>
      <section className={`${kaiser.workspace} ${styles.workspace}`}>
        <div className={`${kaiser.intro} ${styles.intro}`}>
          <h1>{t('subject')}<span>{t('accordingTo')} <em>{t('systems')}</em></span></h1>
        </div>
        <div className={styles.navigation} role="group" aria-label={t('categories')}>
          <ol>
            {Object.entries(GROUPS).map(([id, name], index) => {
              const group = questions.filter(item => item.group === id)
              const completed = group.every(item => isReviewed(item, answers, values))
              return <li key={id} aria-current={current?.group === id ? 'step' : undefined}>
                <bdi>{categories[index].number}</bdi> {label(name)}{completed && <span aria-label={t('reviewed')}>✓</span>}
              </li>
            })}
          </ol>
        </div>
        <section ref={panel} className={`${kaiser.question} ${styles.panel}`} aria-labelledby="padua-step" tabIndex={-1}>
          {isResult ? <Result assessment={assessment} provisional={provisional} t={t} label={label}/> : <>
            <header className={styles.prompt} key={current.id}>
              <p className={styles.progress}><bdi>{step + 1}/{steps.length}</bdi> · {current.group === 'cine' && current.id !== 'other-imaging' ? 'Cine-MRT' : label(GROUPS[current.group])}</p>
              <h2 id="padua-step">{label(current === rvGlobal ? L('RV-Volumen und RVEF?', 'RV volume and RVEF?', 'حجم و کسر جهشی بطن راست؟') : current.title)}</h2>
            </header>
            {current === measures && <>
              <p className={styles.hint}>{t('measurementsHint')}</p>
              <div className={styles.measurements}>
                <label>{t('sex')}<select name="sex" value={values.sex} onChange={changeMeasurement}>
                  <option value="">{t('unspecified')}</option>
                  <option value="female">{t('female')}</option>
                  <option value="male">{t('male')}</option>
                </select></label>
                <label>{t('edvi')}<input name="edvi" value={values.edvi} onChange={changeMeasurement} inputMode="decimal" dir="ltr"/></label>
                <label>{t('ef')}<input name="ef" value={values.ef} onChange={changeMeasurement} inputMode="decimal" dir="ltr"/></label>
              </div>
              {!valid && <p className={styles.invalid} role="alert">{t('invalid')}</p>}
              <div className={styles.alternatives}>
                <button type="button" aria-pressed={values.unavailable} onClick={() => setValues(values.unavailable ? EMPTY_VALUES : { ...EMPTY_VALUES, unavailable: true })}>{t('noMeasurements')}</button>
              </div>
            </>}
            {current === measures && rvGlobal && <div className={styles.referenceFindings}>
              <h3>Padua 2020</h3>
              {renderChoices(rvGlobal)}
              <p className={styles.hint}>{label(rvGlobal.hint)}</p>
            </div>}
            {current !== measures && renderChoices(current)}
            {current.hint && <p className={`${kaiser.questionHelp} ${styles.hint}`}>{label(current.hint)}</p>}
          </>}
        </section>
        <footer className={`${kaiser.actions} ${styles.actions}`}>
          <button type="button" className={kaiser.backButton} onClick={() => goTo(step - 1)} disabled={step === 0}><Icon name="arrow" className={styles.backArrow}/>{t('back')}</button>
          <button type="button" className={kaiser.nextButton} disabled={!canAdvance} onClick={isResult ? reset : () => goTo(step + 1)}>
            {isResult ? t('reset') : step === steps.length - 1 ? t('result') : t('next')}<Icon name={isResult ? 'reset' : 'arrow'}/>
          </button>
        </footer>
      </section>
      <aside className={kaiser.visualStage} aria-hidden="true"><div className={`${kaiser.anatomyVisual} ${styles.anatomy}`}/></aside>
    </div>
    <footer className={`${kaiser.disclaimer} ${styles.sources}`}>
      <p>{t('context')}</p>
      <a href="https://pubmed.ncbi.nlm.nih.gov/20172911/">{t('tfc')}</a>
      <a href="https://doi.org/10.1016/j.ijcard.2020.06.005">{t('source')}</a>
      <a href="https://pubmed.ncbi.nlm.nih.gov/35012021/">{t('interpretation')}</a>
      <Link href={lessonHref}>{t('lesson')}</Link>
    </footer>
  </main>
}
