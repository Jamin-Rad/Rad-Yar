'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/rechner/Icons'
import { useLanguage } from '@/providers/LanguageProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { assessPadua, categories, criterionTitles } from './criteria.mjs'
import kaiser from '@/app/kaiser-score/page.module.css'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const COPY = {
  title: L('Padua-Rechner', 'Padua calculator', 'محاسبه‌گر پادوا'),
  subject: L('Arrhythmogene Kardiomyopathie', 'Arrhythmogenic cardiomyopathy', 'کاردیومیوپاتی آریتموژن'),
  accordingTo: L('nach den', 'using the', 'بر اساس'),
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

const STEPS = categories.flatMap(category => (
  ['rv', 'lv', 'shared'].flatMap(side => {
    const criteria = category.criteria.filter(criterion => criterion.side === side)
    return criteria.length ? [{ id: `${category.id}-${side}`, category, side, criteria }] : []
  })
))

function Result({ assessment, review, reviewedCount, t, label, goTo }) {
  const left = assessment.phenotype === 'left'
  const scored = assessment.points !== null
  const provisional = reviewedCount < categories.length

  return <div className={kaiser.resultPanel}>
    <div className={`${kaiser.resultHero} ${styles.resultHero}`} data-outcome={assessment.outcome}>
      {provisional && <p className={styles.provisional}>{t('provisional')}</p>}
      <h2 id="padua-step">{t(assessment.outcome)}</h2>
      {assessment.phenotype !== 'none' && <p>{t(assessment.phenotype)}</p>}
      {scored && <strong className={styles.score}><bdi>{assessment.points}</bdi> {t('points')}</strong>}
      {scored && <dl className={styles.scale}>
        {[[2, 'possible'], [3, 'borderline'], ['≥ 4', 'definite']].map(([points, outcome]) => <div key={outcome} data-current={outcome === assessment.outcome}>
          <dt><bdi>{points}</bdi></dt><dd>{t(outcome)}</dd>
        </div>)}
      </dl>}
      {assessment.outcome === 'noAnchor' && <p>{t('noAnchorWhy')}</p>}
    </div>
    {provisional && <p className={styles.hint}>{t('unknown')}</p>}
    {left && <dl className={styles.requirements}>
      <div><dt>{t('lge')}</dt><dd>{t(assessment.hasLge ? 'met' : 'notDocumented')}</dd></div>
      <div><dt>{t('gene')}</dt><dd>{t(assessment.hasGene ? 'met' : 'notDocumented')}</dd></div>
    </dl>}
    <div className={`${kaiser.reportBox} ${styles.breakdown}`}>
      <header><strong>{t('categories')}</strong></header>
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
        <button className={styles.textButton} type="button" onClick={() => goTo(STEPS.findIndex(step => step.category.id === category.id))}>{label(categories[index].title)} <span aria-hidden="true">↗</span></button>
      </details>)}
    </div>
    {scored && <p className={styles.hint}>{t('scoreRule')} {assessment.phenotype === 'right' && t('rvExclusion')}</p>}
  </div>
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
  const current = STEPS[step]
  const isResult = !current
  const hasMatches = current?.criteria.some(criterion => selected.has(criterion.id))
  const categoryReview = Object.fromEntries(categories.map(category => {
    const parts = STEPS.filter(part => part.category.id === category.id)
    return [category.id, parts.every(part => review[part.id] === 'reviewed') ? 'reviewed' : parts.some(part => review[part.id]) ? 'pending' : undefined]
  }))
  const reviewedCount = Object.values(categoryReview).filter(status => status === 'reviewed').length
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
    setReview(previous => ({ ...previous, [current.id]: undefined }))
  }

  function finishCategory(complete) {
    setReview(previous => ({ ...previous, [current.id]: complete ? 'reviewed' : 'pending' }))
    goTo(step + 1)
  }

  function reset() {
    setSelected(new Set())
    setReview({})
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
    <div className={kaiser.shell}>
      <section className={`${kaiser.workspace} ${styles.workspace}`}>
        <div className={`${kaiser.intro} ${styles.intro}`}>
          <h1>{t('subject')}<span>{t('accordingTo')} <em>{t('source')}</em></span></h1>
        </div>
        <nav className={styles.navigation} aria-label={t('categories')}>
          <ol>
            {categories.map(entry => <li key={entry.id}>
              <button type="button" onClick={() => goTo(STEPS.findIndex(part => part.category.id === entry.id))}
                aria-label={label(entry.title)} title={label(entry.title)}
                aria-current={current?.category.id === entry.id ? 'step' : undefined}
                data-status={categoryReview[entry.id]}>
                <bdi>{entry.number}</bdi>
                {categoryReview[entry.id] === 'reviewed' && <span aria-label={t('reviewed')}>✓</span>}
                {categoryReview[entry.id] === 'pending' && <span aria-label={t('incomplete')}>·</span>}
              </button>
            </li>)}
          </ol>
          <button className={styles.resultLink} type="button" onClick={() => goTo(STEPS.length)} aria-current={isResult ? 'step' : undefined}>{t('result')}</button>
          <span className={styles.progress}><bdi>{reviewedCount}/{categories.length}</bdi> {t('checked')}</span>
        </nav>
        <section ref={panel} className={`${kaiser.question} ${styles.panel}`} aria-labelledby="padua-step" tabIndex={-1}>
          {isResult ? <Result assessment={assessment} review={categoryReview} reviewedCount={reviewedCount} t={t} label={label} goTo={goTo}/> : <>
            <header className={styles.prompt} key={current.id}>
              <h2 id="padua-step">{label(current.category.title)}</h2>
              {current.side !== 'shared' && <strong>{t(current.side)}</strong>}
              <p>{t('select')}</p>
            </header>
            <div className={`${kaiser.options} ${styles.options}`} key={`${current.id}-options`}>
              {current.criteria.map(criterion => {
                const active = selected.has(criterion.id)
                return <button type="button" key={criterion.id} className={active ? kaiser.optionSelected : undefined} aria-pressed={active} onClick={() => toggleFinding(criterion.id)}>
                  <i aria-hidden="true">{active ? '✓' : ''}</i>
                  <span className={styles.grade} data-major={criterion.grade === 2}>{t(criterion.grade === 2 ? 'gradeMajor' : 'gradeMinor')}</span>
                  <span className={kaiser.optionCopy}>
                    <strong>{label(criterionTitles[criterion.id])}</strong>
                    <small>{label(criterion.text)}</small>
                  </span>
                </button>
              })}
            </div>
            {current.category.hint && <p className={`${kaiser.questionHelp} ${styles.hint}`}>{label(current.category.hint)}</p>}
            <button type="button" className={styles.skip} onClick={() => finishCategory(false)}>{t('skip')}</button>
          </>}
        </section>
        <footer className={`${kaiser.actions} ${styles.actions}`}>
          <button type="button" className={kaiser.backButton} onClick={() => goTo(step - 1)} disabled={step === 0}><Icon name="arrow" className={styles.backArrow}/>{t('back')}</button>
          <button type="button" className={kaiser.nextButton} onClick={isResult ? reset : () => finishCategory(true)}>
            {isResult ? t('reset') : t(hasMatches ? 'next' : 'negative')}<Icon name={isResult ? 'reset' : 'arrow'}/>
          </button>
        </footer>
      </section>
      <aside className={kaiser.visualStage} aria-hidden="true"><div className={`${kaiser.anatomyVisual} ${styles.anatomy}`}/></aside>
    </div>
    <footer className={`${kaiser.disclaimer} ${styles.sources}`}>
      <p>{t('context')}</p>
      <a href="https://doi.org/10.1016/j.ijcard.2020.06.005">{t('source')}</a>
      <a href="https://pubmed.ncbi.nlm.nih.gov/35012021/">{t('interpretation')}</a>
      <Link href={lessonHref}>{t('lesson')}</Link>
    </footer>
  </main>
}
