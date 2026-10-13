'use client'
import { useState } from 'react'
import { L, pick, UI, BASICS, CLINIC, PHENOTYPES, PROTOCOL, CINE_NOTE, LGE_PATTERNS, DIFFERENTIALS, CASES, REPORT_ITEMS, REPORT, TAKEHOME, evaluateTfcCmr } from '@/data/arrhythmogenicCardiomyopathy'
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
  return <div className={styles.tableScroll} role="region" aria-label={pick(headers[0], lang)} tabIndex={0}><table className={styles.table}><thead><tr>{headers.map((h, i) => <th scope="col" key={i}>{pick(h, lang)}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{pick(cell, lang)}</th> : <td key={j}>{pick(cell, lang)}</td>)}</tr>)}</tbody></table></div>
}
function Source({ href, children }) { return <p className={styles.sourceLine}><a href={href} target="_blank" rel="noopener noreferrer">{children} ↗</a></p> }
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
function ThresholdDiagram({ lang }) {
  return <figure className={styles.explorer}><h3>{pick(L('RVEDVi: Grenzen sichtbar machen', 'RVEDVi: visualise the thresholds', 'RVEDVi: آستانه‌ها را ببینید'), lang)}</h3><svg viewBox="0 0 620 180" role="img" aria-label={pick(L('Männer: Minor 100 bis unter 110, Major ab 110; Frauen: Minor 90 bis unter 100, Major ab 100 mL/m²', 'Male: minor 100 to below 110, major 110 and above; female: minor 90 to below 100, major 100 and above mL/m²', 'مرد: مینور از ۱۰۰ تا کمتر از ۱۱۰، ماژور از ۱۱۰؛ زن: مینور از ۹۰ تا کمتر از ۱۰۰، ماژور از ۱۰۰ mL/m²'), lang)} data-no-zoom>
    {[['M',100,110,42],['F',90,100,100]].map(([name,lower,upper,y]) => <g key={name}><text x="10" y={y+19}>{name}</text><rect x="70" y={y} width="500" height="28" rx="7" fill="var(--canvas)" /><rect x={70+(lower-70)*8} y={y} width="80" height="28" fill="#f3c59e" /><rect x={70+(upper-70)*8} y={y} width={500-(upper-70)*8} height="28" fill="#cb795b" /><text x={70+(lower-70)*8} y={y-7}>{lower}</text><text x={70+(upper-70)*8} y={y-7}>{upper}</text></g>)}<text x="70" y="161">70</text><text x="530" y="161">mL/m²</text></svg><figcaption>{pick(L('Hellorange = Minor; dunkelorange = Major. Zusätzlich ist eine regionale RV-Störung erforderlich. EF kann alternativ das quantitative Kriterium erfüllen.', 'Light orange = minor; dark orange = major. A regional RV abnormality is also required. EF can alternatively fulfil the quantitative criterion.', 'نارنجی روشن یعنی مینور و تیره یعنی ماژور. اختلال موضعی RV نیز لازم است. EF می‌تواند به‌جای حجم، شرط کمی را برآورده کند.'), lang)}</figcaption></figure>
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
const REPORT_CHECK = {
  question: L('RVEDVi 118, RVEF 38% und Dyskinesie: wie viele morphofunktionelle Major-Kriterien?', 'RVEDVi 118, RVEF 38% and dyskinesia: how many morphofunctional major criteria?', 'RVEDVi برابر ۱۱۸، RVEF برابر ۳۸٪ و دیسکینزی: چند معیار ماژور مورفولوژی/عملکرد؟'),
  options: [L('Drei', 'Three', 'سه'), L('Zwei', 'Two', 'دو'), L('Eines innerhalb einer Kategorie', 'One within one category', 'یک معیار در یک دسته')], correct: 2,
  explanation: L('Dilatation und EF sind alternative quantitative Wege innerhalb derselben Kategorie. Die endgültige Diagnose braucht Befunde aus unterschiedlichen Kategorien.', 'Dilatation and EF are alternative quantitative routes within the same category. Final diagnosis requires findings from different categories.', 'اتساع و EF دو مسیر کمی جایگزین در یک دسته‌اند. تشخیص نهایی به یافته‌های دسته‌های متفاوت نیاز دارد.'),
}
function CaseCard({ item, lang }) {
  const [open, setOpen] = useState(false)
  return <section className={styles.caseCard}><span className={styles.caseLabel}>Radiopaedia · rID {item.id}</span><h3>{pick(item.label, lang)}</h3><p>{pick(item.task, lang)}</p><div className={styles.caseLinks}><a href={item.viewer} target="_blank" rel="noopener noreferrer">{pick(L('Original-MRI ansehen', 'View original MRI', 'دیدن MRI اصلی'), lang)} ↗</a><a href={item.url} target="_blank" rel="noopener noreferrer">{pick(L('Fall & Quelle', 'Case & source', 'کیس و منبع'), lang)} ↗</a></div><p className={styles.credit}>{item.author} · Radiopaedia.org</p><button type="button" className={styles.inlineButton} aria-expanded={open} aria-controls={`case-${item.id}-answer`} onClick={() => setOpen(v => !v)}>{pick(open ? UI.hide : UI.reveal, lang)}</button><div id={`case-${item.id}-answer`} hidden={!open}><p>{pick(item.discussion, lang)}</p></div></section>
}
function ReportChecklist({ lang }) {
  const [checked, setChecked] = useState(new Set())
  return <section className={styles.explorer}><h3>{pick(L('Befund-Checkliste', 'Reporting checklist', 'چک‌لیست گزارش'), lang)}</h3>{REPORT_ITEMS.map((item, index) => <label className={styles.checkbox} key={index}><input type="checkbox" checked={checked.has(index)} onChange={() => setChecked(previous => { const next = new Set(previous); if (next.has(index)) next.delete(index); else next.add(index); return next })} />{pick(item, lang)}</label>)}<p aria-live="polite"><bdi>{checked.size} / {REPORT_ITEMS.length}</bdi> {pick(L('geprüft', 'checked', 'بررسی شد'), lang)}</p></section>
}
export default function ChapterContent({ id, lang }) {
  const c = value => pick(value, lang)
  if (id === 'spektrum') return <><p className={reference.lead}>{c(BASICS)}</p><PhenotypeExplorer lang={lang} /><p>{c(CLINIC)}</p><ol className={styles.pathway}>{[L('Erbliche Zellkontakt-Störung', 'Inherited cell-adhesion defect', 'اختلال ارثی اتصال سلولی'), L('Myokardschädigung und Narbe', 'Myocardial injury and scar', 'آسیب میوکارد و اسکار'), L('Elektrische Instabilität / VT', 'Electrical instability / VT', 'ناپایداری الکتریکی / VT')].map((item, i) => <li key={i}>{c(item)}</li>)}</ol><Note lang={lang}><p>{c(L('PKP2 und DSP sind Beispiele, keine vollständige Genliste. Eine Variante unklarer Signifikanz (VUS) ist kein krankheitsbeweisender Befund.', 'PKP2 and DSP are examples, not a complete gene list. A variant of uncertain significance (VUS) does not establish disease.', 'PKP2 و DSP نمونه‌اند و فهرست کامل ژن‌ها نیستند. واریانت با اهمیت نامشخص (VUS) اثبات‌کننده بیماری نیست.'))}</p></Note><Source href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8649536/">Corrado et al. · ACM spectrum</Source></>
  if (id === 'cine') return <><p className={reference.lead}>{c(L('Zuerst Bildqualität, dann beide Ventrikel: regionale Bewegung, indexierte Volumina und EF. Eine auffällige Kontur in nur einer Ebene genügt nicht.', 'Start with image quality, then both ventricles: regional motion, indexed volumes and EF. An abnormal contour in one plane is insufficient.', 'ابتدا کیفیت تصویر، سپس هر دو بطن: حرکت موضعی، حجم ایندکس‌شده و EF. کانتور غیرطبیعی در یک صفحه کافی نیست.'))}</p><Table headers={[L('Sequenz', 'Sequence', 'سکانس'), L('Frage / Aufgabe', 'Question / task', 'سؤال / هدف')]} rows={PROTOCOL} lang={lang} /><CineExplorer lang={lang} /><div className={styles.formula}><bdi>RVEF = (RVEDV − RVESV) / RVEDV × 100</bdi><bdi>RVEDVi = RVEDV / BSA</bdi></div><Note warning lang={lang}><p>{c(CINE_NOTE)}</p></Note><Source href="https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.840827">Marcus et al. · 2010 TFC</Source></>
  if (id === 'lge') return <><p className={reference.lead}>{c(L('LGE kartiert Ersatzfibrose und macht LV-Beteiligung sichtbar, auch wenn die EF erhalten ist. Eine Narbe muss in orthogonalen Ansichten bestätigt werden.', 'LGE maps replacement fibrosis and detects LV involvement even with preserved EF. Confirm scar in orthogonal views.', 'LGE فیبروز جایگزین و درگیری LV را حتی با EF حفظ‌شده نشان می‌دهد. اسکار را در نماهای عمود بر هم تأیید کنید.'))}</p><LgeExplorer lang={lang} /><Note warning lang={lang}><p>{c(L('Dünne RV-Wand: begrenzte räumliche Auflösung und Partialvolumen. Fehlendes RV-LGE schließt ARVC nicht aus; Fett allein ist kein diagnostisches Kriterium.', 'Thin RV wall: limited spatial resolution and partial volume. Absent RV LGE does not exclude ARVC; fat alone is not a diagnostic criterion.', 'دیواره RV نازک است: تفکیک مکانی محدود و partial volume مهم‌اند. نبود LGE در RV، ARVC را رد نمی‌کند؛ چربی به‌تنهایی معیار تشخیصی نیست.'))}</p></Note><Source href="https://doi.org/10.1016/j.ijcard.2020.06.005">Padua · tissue characterisation</Source></>
  if (id === 'kriterien') return <><p className={reference.lead}>{c(L('2010 TFC fokussiert auf ARVC; Padua 2020 erweitert auf LV und beide Ventrikel und integriert LGE. Die Zahlen unten sind ausschließlich die Erwachsenen-CMR-Grenzen der 2010 TFC.', '2010 TFC focuses on ARVC; Padua 2020 extends to LV/biventricular disease and incorporates LGE. The numbers below are exclusively adult 2010 TFC CMR thresholds.', 'TFC 2010 بر ARVC تمرکز دارد؛ Padua 2020 درگیری LV و دو بطنی و LGE را اضافه می‌کند. اعداد زیر فقط آستانه‌های CMR بزرگسالان در TFC 2010 هستند.'))}</p><Table headers={[L('2010 CMR', '2010 CMR', 'CMR 2010'), L('Quantitative Bedingung PLUS regionale Störung', 'Quantitative condition PLUS regional abnormality', 'شرط کمی همراه اختلال موضعی')]} rows={[
    ['Major', L('RVEDVi ≥110 (M) / ≥100 (F) mL/m² ODER RVEF ≤40%.', 'RVEDVi ≥110 (M) / ≥100 (F) mL/m² OR RVEF ≤40%.', 'RVEDVi ≥۱۱۰ در مرد / ≥۱۰۰ در زن یا RVEF ≤۴۰٪.')],
    ['Minor', L('RVEDVi ≥100 bis <110 (M) / ≥90 bis <100 (F) ODER RVEF >40 bis ≤45%.', 'RVEDVi ≥100 to <110 (M) / ≥90 to <100 (F) OR RVEF >40 to ≤45%.', 'RVEDVi از ≥۱۰۰ تا <۱۱۰ در مرد / از ≥۹۰ تا <۱۰۰ در زن، یا RVEF از >۴۰ تا ≤۴۵٪.')],
  ]} lang={lang} /><ThresholdDiagram lang={lang} /><CriteriaLab lang={lang} /><h3 className={styles.subheading}>{c(L('Was ändert Padua?', 'What does Padua change?', 'Padua چه چیزی را تغییر می‌دهد؟'))}</h3><Table headers={[L('Bereich', 'Domain', 'حیطه'), L('Padua 2020', 'Padua 2020', 'Padua 2020')]} rows={[
    ['RV', L('Regionale Akinesie/Dyskinesie/Bulging + globale Dilatation oder Dysfunktion: Major. Isolierte regionale Störung: Minor. Alters-, Geschlechts- und methodenspezifische Nomogramme.', 'Regional akinesia/dyskinesia/bulging + global dilatation or dysfunction: major. Isolated regional abnormality: minor. Use age-, sex- and method-specific nomograms.', 'آکینزی/دیسکینزی/bulging موضعی همراه اتساع یا اختلال عملکرد کلی: ماژور. اختلال موضعی منفرد: مینور. نوموگرام متناسب با سن، جنس و روش.')],
    ['LGE', L('RV-transmural und LV-nichtischämische Stria: strukturelle Major-Kriterien, in zwei Ebenen bestätigt.', 'Transmural RV and non-ischaemic LV stripe: major structural criteria, confirmed in two planes.', 'LGE ترانس‌مورال RV و نوار غیرایسکمیک LV: معیارهای ساختاری ماژور با تأیید در دو صفحه.')],
    ['ALVC', L('Ohne RV-Beteiligung: LV-Strukturmerkmal plus passende pathogene/wahrscheinlich pathogene Variante; Mimics ausschließen.', 'Without RV involvement: LV structural feature plus compatible pathogenic/likely pathogenic variant; exclude mimics.', 'بدون درگیری RV: یافته ساختاری LV همراه واریانت سازگار بیماری‌زا/احتمالاً بیماری‌زا؛ افتراق‌ها رد شوند.')],
  ]} lang={lang} /><Note lang={lang}><p>{c(L('Die sechs Kategorien: Morphologie/Funktion, Struktur, Repolarisation, Depolarisation, Arrhythmien, Familie/Genetik. Nach 2010: definite = 2 Major oder 1 Major + 2 Minor oder 4 Minor aus unterschiedlichen Kategorien.', 'Six categories: morphology/function, structure, repolarisation, depolarisation, arrhythmias, family/genetics. Under 2010: definite = 2 major, or 1 major + 2 minor, or 4 minor from different categories.', 'شش دسته: مورفولوژی/عملکرد، ساختار، رپولاریزاسیون، دپولاریزاسیون، آریتمی، خانواده/ژنتیک. در ۲۰۱۰: قطعی یعنی ۲ ماژور، یا ۱ ماژور و ۲ مینور، یا ۴ مینور از دسته‌های متفاوت.'))}</p><p>{c(L('Für Padua muss mindestens ein morphofunktionelles oder strukturelles Kriterium vorhanden sein. Der Rechner oben bewertet nur eine 2010-Kategorie.', 'Padua requires at least one morphofunctional or structural criterion. The lab above assesses only one 2010 category.', 'در Padua دست‌کم یک معیار مورفولوژی/عملکرد یا ساختاری لازم است. ابزار بالا فقط یک دسته از معیارهای ۲۰۱۰ را ارزیابی می‌کند.'))}</p></Note><Source href="https://doi.org/10.1016/j.ijcard.2020.06.005">Padua criteria · 2020</Source></>
  if (id === 'differenzial') return <><p className={reference.lead}>{c(L('Ist die RV-Vergrößerung eine Myokarderkrankung oder eine Reaktion auf Belastung? Und ist die LV-Narbe genetisch oder entzündlich bedingt?', 'Is RV enlargement myocardial disease or a response to loading? Is LV scar genetic or inflammatory?', 'بزرگی RV بیماری میوکارد است یا پاسخ به بار؟ اسکار LV منشأ ژنتیکی دارد یا التهابی؟'))}</p><Table headers={[L('Mimic', 'Mimic', 'افتراق'), L('Was trennt die Muster?', 'What separates the patterns?', 'چه چیزی الگوها را جدا می‌کند؟')]} rows={DIFFERENTIALS} lang={lang} /><SelfCheck item={MIMIC_CHECK} lang={lang} /><Source href="https://doi.org/10.1161/CIRCULATIONAHA.119.044934">Smith et al. · DSP cardiomyopathy</Source></>
  if (id === 'faelle') return <><p className={reference.lead}>{c(L('Die Originalserien öffnen, zuerst selbst beobachten und dann die Besprechung aufdecken. Die folgenden Fragen und Analysen sind RadYar-Lehrkommentare zu den verlinkten Fällen.', 'Open the original series, observe first and then reveal the discussion. The questions and analyses below are RadYar teaching commentary on the linked cases.', 'سری تصاویر اصلی را باز کنید، ابتدا خودتان مشاهده کنید و سپس تحلیل را ببینید. سؤال‌ها و تحلیل‌های زیر توضیحات آموزشی RadYar درباره کیس‌های لینک‌شده‌اند.'))}</p><div className={styles.caseGrid}>{CASES.map(item => <CaseCard key={item.id} item={item} lang={lang} />)}</div><Note warning lang={lang}><p>{c(L('Kinderfall: Die Erwachsenen-Grenzen des Rechners nicht als validierte pädiatrische Diagnose verwenden.', 'Paediatric case: do not use the lab’s adult thresholds as a validated paediatric diagnosis.', 'کیس کودک: آستانه‌های بزرگسالان در ابزار را به‌عنوان تشخیص معتبر کودکان استفاده نکنید.'))}</p></Note></>
  if (id === 'befund') return <><ReportChecklist lang={lang} /><div className={styles.report}><h3>{c(L('Synthetisches Befundbeispiel', 'Synthetic report example', 'نمونه گزارش ساختگی آموزشی'))}</h3><blockquote>{c(REPORT)}</blockquote></div><SelfCheck item={REPORT_CHECK} lang={lang} /></>
  return <ul className={styles.summary}>{TAKEHOME.map((point, i) => <li key={i}><Icon name="check" /><span>{c(point)}</span></li>)}</ul>
}
