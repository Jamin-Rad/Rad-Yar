'use client'
import { useState } from 'react'
import { L, pick, UI, BASICS, CLINIC, PHENOTYPES, CINE_NOTE, LGE_PATTERNS, DIFFERENTIALS, CASES, REPORT_ITEMS, REPORT, TAKEHOME, evaluateTfcCmr } from '@/data/arrhythmogenicCardiomyopathy'
import reference from '@/app/andarun/test/page.module.css'
import styles from './page.module.css'

export function Icon({ name }) {
  const paths = {
    heart: 'M12 20S3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12 M4 11h4l2-4 4 8 2-4h4',
    scan: 'M3 7V3h4 M17 3h4v4 M21 17v4h-4 M7 21H3v-4 M5 12h4l2-5 3 10 2-5h3',
    layers: 'm3 7 9-4 9 4-9 4z M3 12l9 4 9-4 M3 17l9 4 9-4',
    chart: 'M4 20V10 M10 20V4 M16 20v-7 M2 20h20',
    branch: 'M5 3v18 M5 8h7l6-5 M5 16h7l6 5 M18 3v5 M18 21v-5',
    case: 'M5 5h14v15H5z M9 5V2h6v3 M8 10h8 M8 15h5',
    report: 'M5 3h14v18H5z M8 7h8 M8 11h8 M8 15h3 m3 2 2 2 4-5',
    spark: 'm12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
    check: 'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0 m4 0 3 3 7-7',
    arrow: 'M4 12h16 m-6-6 6 6-6 6', warning: 'm12 3 10 18H2z M12 9v5 M12 17v1',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}
function Note({ warning, lang, children }) {
  return <aside className={warning ? reference.warning : reference.rememberNote}><span className={reference.calloutLabel}><Icon name={warning ? 'warning' : 'spark'} />{pick(warning ? UI.cave : UI.key, lang)}</span><div className={reference.calloutBody}>{children}</div></aside>
}
function Table({ headers, rows, lang }) {
  const cellText = value => pick(value, lang).split(/((?:[≥≤<>]\s*)?[۰-۹0-9]+(?:[.,٫][۰-۹0-9]+)?[%٪]?|mL\/m²|RVEDVi|RVEF)/g).map((part, i) => i % 2 ? <bdi dir="ltr" key={i}>{part}</bdi> : part)
  return <div className={styles.tableScroll} role="region" aria-label={pick(headers[0], lang)} tabIndex={0}><table className={styles.table}><thead><tr>{headers.map((h, i) => <th scope="col" key={i}>{cellText(h)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{cellText(cell)}</th> : <td key={j}>{cellText(cell)}</td>)}</tr>)}</tbody></table></div>
}
function ChoiceBar({ items, value, onChange, lang, label }) {
  return <div className={styles.choiceBar} role="group" aria-label={pick(label, lang)}>{items.map(item => <button type="button" key={item.id} aria-pressed={value === item.id} onClick={() => onChange(item.id)}>{pick(item.name, lang)}</button>)}</div>
}
function HeartDiagram({ rv, lv, lang }) {
  return <svg viewBox="0 0 320 230" role="img" aria-label={pick(L('Schematischer Herzquerschnitt: RV links, LV rechts; orange = Narbe', 'Schematic cardiac cross-section: RV on left, LV on right; orange = scar', 'مقطع شماتیک قلب: RV در چپ تصویر، LV در راست؛ نارنجی یعنی اسکار'), lang)} data-no-zoom>
    <path d="M153 45C57 17 18 85 43 156c20 52 83 58 127 22-40-28-50-92-17-133Z" fill="var(--teal-100)" stroke={rv ? '#d56e2b' : 'var(--teal-700)'} strokeWidth={rv ? 13 : 5} />
    <ellipse cx="200" cy="116" rx="73" ry="86" fill="var(--plum-100)" stroke="var(--plum-700)" strokeWidth="20" />
    <ellipse cx="200" cy="116" rx="44" ry="59" fill="var(--paper)" />
    {lv ? <path d="M218 33c66 15 83 101 36 153" fill="none" stroke="#d56e2b" strokeWidth="10" strokeLinecap="round" /> : null}
    <text x="82" y="119" textAnchor="middle">RV</text><text x="200" y="121" textAnchor="middle">LV</text>
  </svg>
}
function PhenotypeExplorer({ lang }) {
  const [value, setValue] = useState('rv')
  const selected = PHENOTYPES.find(item => item.id === value)
  return <figure className={styles.explorer}><ChoiceBar items={PHENOTYPES} value={value} onChange={setValue} lang={lang} label={L('Phänotyp auswählen', 'Choose phenotype', 'انتخاب فنوتیپ')} /><div className={styles.visualSplit}><HeartDiagram rv={value !== 'lv'} lv={value !== 'rv'} lang={lang} /><div aria-live="polite"><h3>{pick(selected.name, lang)}</h3><p>{pick(selected.text, lang)}</p><small>{pick(UI.schematic, lang)}</small></div></div></figure>
}
const MOTIONS = [
  { id: 'normal', name: L('Normal', 'Normal', 'طبیعی'), text: L('Die freie Wand bewegt sich in der Systole nach innen.', 'The free wall moves inward in systole.', 'دیواره آزاد در سیستول به داخل حرکت می‌کند.') },
  { id: 'akinesia', name: L('Akinesie', 'Akinesia', 'آکینزی'), text: L('Ein fokaler Abschnitt bleibt stehen, während benachbarte Segmente kontrahieren.', 'A focal segment remains still while adjacent segments contract.', 'یک بخش موضعی ثابت می‌ماند، در حالی که قسمت‌های مجاور منقبض می‌شوند.') },
  { id: 'dyskinesia', name: L('Dyskinesie', 'Dyskinesia', 'دیسکینزی'), text: L('Der markierte Abschnitt wölbt sich während der Systole nach außen.', 'The marked segment bulges outward during systole.', 'بخش مشخص‌شده در سیستول به بیرون برجسته می‌شود.') },
]
function CineExplorer({ lang }) {
  const [motion, setMotion] = useState('dyskinesia')
  const [phase, setPhase] = useState(0)
  const inward = 24 * phase / 100
  const focus = motion === 'normal' ? inward : motion === 'dyskinesia' ? -inward : 0
  return <figure className={styles.explorer}><h3>{pick(L('Cine-Labor: die Systole selbst bewegen', 'Cine lab: move through systole', 'آزمایشگاه Cine: سیستول را خودتان تغییر دهید'), lang)}</h3><ChoiceBar items={MOTIONS} value={motion} onChange={setMotion} lang={lang} label={L('Bewegungsmuster', 'Motion pattern', 'الگوی حرکت')} /><svg viewBox="0 0 420 235" role="img" aria-label={pick(L('RV-Wandbewegung in Diastole und Systole', 'RV wall motion in diastole and systole', 'حرکت دیواره RV در دیاستول و سیستول'), lang)} data-no-zoom>
    <path d="M210 30C85 7 28 115 108 198c33 25 80 8 102-13-61-46-61-104 0-155Z" fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="5 5" />
    <path d={`M210 30C${85+inward} 7 ${28+inward} 115 ${108+inward} 198c33 25 80 8 102-13-61-46-61-104 0-155Z`} fill="var(--teal-100)" stroke="var(--teal-700)" strokeWidth="5" />
    <path d={`M${78+inward} 65 Q${20+focus} 115 ${78+inward} 161`} fill="none" stroke="#d56e2b" strokeWidth="9" strokeLinecap="round" />
    <ellipse cx="253" cy="117" rx={68-inward/2} ry={83-inward/3} fill="var(--plum-100)" stroke="var(--plum-700)" strokeWidth="17" /><text x="130" y="123">RV</text><text x="242" y="123">LV</text>
  </svg><label className={styles.rangeLabel}>{pick(L('Herzphase', 'Cardiac phase', 'فاز قلبی'), lang)}<input type="range" min="0" max="100" value={phase} onChange={event => setPhase(Number(event.target.value))} /><span><bdi>{phase}%</bdi> · {pick(phase < 50 ? L('Diastole', 'Diastole', 'دیاستول') : L('Systole', 'Systole', 'سیستول'), lang)}</span></label><figcaption>{pick(MOTIONS.find(item => item.id === motion).text, lang)} <small>{pick(UI.schematic, lang)}</small></figcaption></figure>
}
function LgeExplorer({ lang }) {
  const [pattern, setPattern] = useState('lv')
  return <figure className={styles.explorer}><ChoiceBar items={LGE_PATTERNS} value={pattern} onChange={setPattern} lang={lang} label={L('LGE-Muster auswählen', 'Choose LGE pattern', 'انتخاب الگوی LGE')} /><div className={styles.visualSplit}><svg viewBox="0 0 320 250" role="img" aria-label={pick(L('Schema des ausgewählten LGE-Musters', 'Schematic of the selected LGE pattern', 'شماتیک الگوی LGE انتخاب‌شده'), lang)} data-no-zoom>
    <rect width="320" height="250" rx="12" fill="#14202d" /><path d="M155 55C39 11 9 125 94 197l67-27c-50-37-56-79-6-115Z" fill="#304253" stroke={pattern === 'rv' ? '#ffbe71' : '#708596'} strokeWidth={pattern === 'rv' ? 9 : 4} />
    <circle cx="201" cy="125" r="78" fill="#304253" /><circle cx="201" cy="125" r="49" fill="#0b121a" />
    {pattern === 'lv' ? <circle cx="201" cy="125" r="71" fill="none" stroke="#ffbe71" strokeWidth="8" strokeDasharray="220 226" transform="rotate(-65 201 125)" /> : null}
    {pattern === 'insertion' ? <g fill="#ffbe71"><circle cx="144" cy="72" r="7" /><circle cx="144" cy="178" r="7" /></g> : null}
    {pattern === 'ischaemic' ? <path d="M204 75a50 50 0 0 1 44 75" fill="none" stroke="#ffbe71" strokeWidth="11" /> : null}
    <text x="86" y="126" fill="#fff">RV</text><text x="188" y="131" fill="#fff">LV</text>
  </svg><div aria-live="polite"><h3>{pick(LGE_PATTERNS.find(item => item.id === pattern).name, lang)}</h3><p>{pick(LGE_PATTERNS.find(item => item.id === pattern).text, lang)}</p><small>{pick(L('Orange = schematische Narbe, kein diagnostischer Scan.', 'Orange = schematic scar, not a diagnostic scan.', 'نارنجی یعنی اسکار شماتیک؛ اسکن تشخیصی نیست.'), lang)}</small></div></div></figure>
}
const RESULTS = {
  major: L('Major · CMR-Kategorie erfüllt', 'Major · CMR category fulfilled', 'ماژور · دسته CMR برقرار است'),
  minor: L('Minor · CMR-Kategorie erfüllt', 'Minor · CMR category fulfilled', 'مینور · دسته CMR برقرار است'),
  none: L('Kein morphofunktionelles CMR-Kriterium', 'No morphofunctional CMR criterion', 'معیار مورفولوژی/عملکرد CMR برقرار نیست'),
  invalid: L('Gültige Werte eingeben', 'Enter valid values', 'مقادیر معتبر وارد کنید'),
}
function CriteriaLab({ lang }) {
  const [sex, setSex] = useState('male')
  const [edvi, setEdvi] = useState('118')
  const [ef, setEf] = useState('38')
  const [regional, setRegional] = useState(true)
  const result = evaluateTfcCmr({ sex, edvi: edvi.trim() ? Number(edvi) : NaN, ef: ef.trim() ? Number(ef) : NaN, regional })
  return <section className={styles.explorer} aria-labelledby="criteria-lab"><h3 id="criteria-lab">{pick(L('2010 TFC · Erwachsenen-CMR-Labor', '2010 TFC · adult CMR lab', 'آزمایشگاه CMR بزرگسالان · TFC 2010'), lang)}</h3><div className={styles.formGrid}>
    <label>{pick(L('Referenzgruppe', 'Reference group', 'گروه مرجع'), lang)}<select value={sex} onChange={e => setSex(e.target.value)}><option value="male">{pick(L('Männlich', 'Male', 'مرد'), lang)}</option><option value="female">{pick(L('Weiblich', 'Female', 'زن'), lang)}</option></select></label>
    <label><bdi>RVEDVi (mL/m²)</bdi><input type="number" min="1" step="0.1" value={edvi} onChange={e => setEdvi(e.target.value)} /></label>
    <label><bdi>RVEF (%)</bdi><input type="number" min="0" max="100" step="0.1" value={ef} onChange={e => setEf(e.target.value)} /></label>
  </div><label className={styles.checkbox}><input type="checkbox" checked={regional} onChange={e => setRegional(e.target.checked)} />{pick(L('Regionale Akinesie, Dyskinesie oder dyssynchrone RV-Kontraktion bestätigt', 'Regional RV akinesia, dyskinesia or dyssynchronous contraction confirmed', 'آکینزی، دیسکینزی یا انقباض ناهماهنگ موضعی RV تأیید شده است'), lang)}</label>
    <div className={styles.result} aria-live="polite" aria-atomic="true" data-result={result}><strong>{pick(RESULTS[result], lang)}</strong><p>{pick(!regional ? L('Auch ein großer RV oder eine niedrige EF genügt ohne die regionale Störung nicht.', 'Even a large RV or low EF is insufficient without the regional abnormality.', 'حتی RV بزرگ یا EF پایین بدون اختلال موضعی کافی نیست.') : L('Volumen und EF innerhalb dieser Kategorie nur einmal zählen. Dies ist keine Gesamtklassifikation der ACM.', 'Count volume and EF only once within this category. This is not an overall ACM classification.', 'حجم و EF در این دسته فقط یک بار حساب می‌شوند. این نتیجه طبقه‌بندی کلی ACM نیست.'), lang)}</p></div>
    <button className={styles.inlineButton} type="button" onClick={() => { setSex('male'); setEdvi('118'); setEf('38'); setRegional(true) }}>{pick(UI.reset, lang)}</button>
  </section>
}
export function SelfCheck({ item, lang }) {
  const [answer, setAnswer] = useState(null)
  return <section className={styles.quiz}><h3>{pick(item.question, lang)}</h3><div className={styles.answers}>{item.options.map((option, index) => <button type="button" key={index} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{pick(option, lang)}</button>)}</div><div aria-live="polite" aria-atomic="true">{answer !== null ? <p className={styles.feedback}><strong>{pick(answer === item.correct ? UI.correct : UI.retry, lang)}</strong> {pick(item.explanation, lang)}</p> : null}</div></section>
}
const MIMIC_CHECK = {
  question: L('Ein Ausdauersportler: RVEDVi 120, RVEF 55%, keine regionale RV-Störung. Reicht das für das 2010-CMR-Kriterium?', 'Endurance athlete: RVEDVi 120, RVEF 55%, no regional RV abnormality. Is the 2010 CMR criterion met?', 'ورزشکار استقامتی: RVEDVi برابر ۱۲۰، RVEF برابر ۵۵٪، بدون اختلال موضعی RV. آیا معیار CMR 2010 برقرار است؟'),
  options: [L('Ja, Major wegen Volumen', 'Yes, major because of volume', 'بله، ماژور به‌دلیل حجم'), L('Nein; regionale Störung fehlt', 'No; regional abnormality is absent', 'خیر؛ اختلال موضعی وجود ندارد'), L('Sichere ALVC', 'Definite ALVC', 'ALVC قطعی')], correct: 1,
  explanation: L('Die regionale Störung ist obligat für diese CMR-Kategorie. Sport-spezifische Referenzen und Gesamtbefund prüfen; das ist kein genereller Ausschluss einer ACM.', 'Regional abnormality is mandatory in this CMR category. Review athlete-specific references and all findings; this does not generally exclude ACM.', 'اختلال موضعی برای این دسته CMR الزامی است. مرجع ویژه ورزشکار و کل یافته‌ها بررسی شوند؛ این نتیجه رد کلی ACM نیست.'),
}
function CaseCard({ item, lang }) {
  const [open, setOpen] = useState(false)
  return <section className={styles.caseCard}>
    <span className={styles.caseLabel}>MRI</span><h3>{pick(item.label, lang)}</h3>
    <p>{pick(item.task, lang)}</p>
    <div className={styles.caseLinks}><a href={item.viewer} target="_blank" rel="noopener noreferrer">{pick(L('Original-MRI ansehen', 'View original MRI', 'دیدن MRI اصلی'), lang)} ↗</a></div>
    <button type="button" className={styles.inlineButton} aria-expanded={open} aria-controls={'case-'+item.id+'-answer'} onClick={() => setOpen(v => !v)}>{pick(open ? UI.hide : UI.reveal, lang)}</button>
    <div id={'case-'+item.id+'-answer'} hidden={!open}><p>{pick(item.discussion, lang)}</p></div>
  </section>
}
function ReportChecklist({ lang }) {
  const [checked, setChecked] = useState(new Set())
  return <section className={styles.explorer}><h3>{pick(L('Befund-Checkliste', 'Reporting checklist', 'چک‌لیست گزارش'), lang)}</h3>{REPORT_ITEMS.map((item, index) => <label className={styles.checkbox} key={index}><input type="checkbox" checked={checked.has(index)} onChange={() => setChecked(previous => { const next = new Set(previous); if (next.has(index)) next.delete(index); else next.add(index); return next })} />{pick(item, lang)}</label>)}<p aria-live="polite"><bdi>{checked.size} / {REPORT_ITEMS.length}</bdi> {pick(L('geprüft', 'checked', 'بررسی شد'), lang)}</p></section>
}
export default function ChapterContent({ id, lang }) {
  const c = value => pick(value, lang)
  if (id === 'spektrum') return <>
    <p className={reference.lead}>{c(BASICS)}</p>
    <PhenotypeExplorer lang={lang} />
    <Note lang={lang}><p>{c(CLINIC)}</p></Note>
  </>
  if (id === 'cine') return <>
    <p className={reference.lead}>{c(L('Im Cine prüfen: regionale RV-Bewegung, indexiertes Volumen und EF beider Ventrikel.', 'On cine, assess regional RV motion, indexed volume and EF of both ventricles.', 'در Cine، حرکت موضعی RV، حجم ایندکس‌شده و EF هر دو بطن را بررسی کنید.'))}</p>
    <CineExplorer lang={lang} />
    <Note warning lang={lang}><p>{c(CINE_NOTE)}</p></Note>
  </>
  if (id === 'lge') return <>
    <p className={reference.lead}>{c(L('LGE zeigt Narbe, auch bei erhaltener EF. Die Lage der Narbe hilft bei der Einordnung.', 'LGE shows scar, even with preserved EF. Scar location helps interpretation.', 'LGE اسکار را حتی با EF حفظ‌شده نشان می‌دهد. محل اسکار به تفسیر کمک می‌کند.'))}</p>
    <LgeExplorer lang={lang} />
    <Note warning lang={lang}><p>{c(L('Fehlendes RV-LGE schließt ARVC nicht aus. Fett allein ist kein ACM-Kriterium.', 'Absent RV LGE does not exclude ARVC. Fat alone is not an ACM criterion.', 'نبود LGE در RV، ARVC را رد نمی‌کند. چربی به‌تنهایی معیار ACM نیست.'))}</p></Note>
  </>
  if (id === 'kriterien') return <>
    <Note lang={lang}><p><strong>{c(L('2010 TFC: regionale RV-Störung UND Volumen-/EF-Kriterium.', '2010 TFC: regional RV abnormality AND a volume/EF criterion.', 'TFC 2010: اختلال موضعی RV و شرط حجم/EF باید با هم وجود داشته باشند.'))}</strong></p><p>{c(L('Volumen und EF nur einmal zählen. Die folgenden Grenzwerte gelten für Erwachsenen-CMR.', 'Count volume and EF only once. These thresholds apply to adult CMR.', 'حجم و EF فقط یک بار حساب می‌شوند. آستانه‌های زیر برای CMR بزرگسالان‌اند.'))}</p></Note>
    <Table headers={[L('2010 CMR', '2010 CMR', 'CMR 2010'), L('Zusätzlich zur regionalen RV-Störung', 'In addition to regional RV abnormality', 'علاوه بر اختلال موضعی RV')]} rows={[
      ['Major', L('RVEDVi ≥110 (M) / ≥100 (F) mL/m² ODER RVEF ≤40%.', 'RVEDVi ≥110 (M) / ≥100 (F) mL/m² OR RVEF ≤40%.', 'RVEDVi ≥۱۱۰ در مرد / ≥۱۰۰ در زن (mL/m²)، یا RVEF ≤۴۰٪.')],
      ['Minor', L('RVEDVi ≥100 bis <110 (M) / ≥90 bis <100 (F) mL/m² ODER RVEF >40 bis ≤45%.', 'RVEDVi ≥100 to <110 (M) / ≥90 to <100 (F) mL/m² OR RVEF >40 to ≤45%.', 'RVEDVi از ≥۱۰۰ تا <۱۱۰ در مرد / از ≥۹۰ تا <۱۰۰ در زن (mL/m²)، یا RVEF از >۴۰ تا ≤۴۵٪.')],
    ]} lang={lang} />
    <h3 className={styles.subheading}>{c(L('Padua: was ist neu?', 'Padua: what is new?', 'Padua چه چیزی اضافه می‌کند؟'))}</h3>
    <p>{c(L('Padua 2020 ergänzt nichtischämische RV-/LV-Narbe im LGE und erfasst linksdominante sowie biventrikuläre Formen. Befunde in zwei orthogonalen Ebenen bestätigen; altersgerechte Normwerte verwenden.', 'Padua 2020 adds non-ischaemic RV/LV scar on LGE and covers left-dominant and biventricular disease. Confirm findings in two orthogonal planes and use age-appropriate reference values.', 'Padua 2020 اسکار غیرایسکمیک RV/LV در LGE و شکل‌های چپ‌غالب و دو بطنی را اضافه می‌کند. یافته‌ها را در دو صفحه عمود بر هم تأیید و از مرجع متناسب با سن استفاده کنید.'))}</p>
    <details className={styles.optional}><summary>{c(L('Kriterien selbst ausprobieren · optional', 'Try the criteria · optional', 'معیارها را امتحان کنید · اختیاری'))}</summary><CriteriaLab lang={lang} /></details>
    <details className={styles.optional}><summary>{c(L('Padua-Details · optional', 'Padua details · optional', 'جزئیات Padua · اختیاری'))}</summary>
      <ul>
        <li>{c(L('RV: regionale Akinesie/Dyskinesie/Bulging plus globale Dilatation oder Dysfunktion = Major; isolierte regionale Störung = Minor.', 'RV: regional akinesia/dyskinesia/bulging plus global dilatation or dysfunction = major; isolated regional abnormality = minor.', 'RV: آکینزی/دیسکینزی/bulging موضعی همراه اتساع یا اختلال عملکرد کلی = ماژور؛ اختلال موضعی منفرد = مینور.'))}</li>
        <li>{c(L('LGE: transmural in ≥1 RV-Region oder nichtischämische Stria in ≥1 LV-Segment. Junktionales LV-LGE zählt nicht; in zwei Ebenen bestätigen.', 'LGE: transmural in ≥1 RV region or non-ischaemic stripe in ≥1 LV segment. Junctional LV LGE is excluded; confirm in two planes.', 'LGE: ترانس‌مورال در ≥۱ ناحیه RV یا نوار غیرایسکمیک در ≥۱ سگمنت LV. LGE محل اتصال حساب نمی‌شود؛ تأیید در دو صفحه لازم است.'))}</li>
        <li>{c(L('Isolierte ALVC braucht eine passende pathogene/wahrscheinlich pathogene Variante; VUS genügt nicht. Mindestens ein morphofunktionelles oder strukturelles Kriterium ist für Padua erforderlich.', 'Isolated ALVC requires a compatible pathogenic/likely pathogenic variant; a VUS is insufficient. Padua requires at least one morphofunctional or structural criterion.', 'ALVC منفرد به واریانت سازگار بیماری‌زا/احتمالاً بیماری‌زا نیاز دارد؛ VUS کافی نیست. در Padua دست‌کم یک معیار مورفولوژی/عملکرد یا ساختاری لازم است.'))}</li>
      </ul>
    </details>
  </>
  if (id === 'differenzial') return <>
    <Table headers={[L('Mimic', 'Mimic', 'افتراق'), L('Wichtigster Hinweis', 'Key clue', 'سرنخ مهم')]} rows={DIFFERENTIALS} lang={lang} />
    <SelfCheck item={MIMIC_CHECK} lang={lang} />
  </>
  if (id === 'faelle') return <>
    <p className={reference.lead}>{c(L('MRI öffnen, selbst beobachten, dann die kurze Besprechung aufdecken.', 'Open the MRI, observe first, then reveal the short discussion.', 'MRI را باز کنید، ابتدا خودتان ببینید و سپس تحلیل کوتاه را نمایش دهید.'))}</p>
    <div className={styles.caseGrid}>{CASES.map(item => <CaseCard key={item.id} item={item} lang={lang} />)}</div>
  </>
  if (id === 'befund') return <>
    <ReportChecklist lang={lang} />
    <div className={styles.report}><h3>{c(L('Kurzes Lehrbeispiel', 'Short teaching example', 'نمونه کوتاه آموزشی'))}</h3><blockquote>{c(REPORT)}</blockquote></div>
  </>
  return <ul className={styles.summary}>{TAKEHOME.map((point, i) => <li key={i}><Icon name="check" /><span>{c(point)}</span></li>)}</ul>
}
