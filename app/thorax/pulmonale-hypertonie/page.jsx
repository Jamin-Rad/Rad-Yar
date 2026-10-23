'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import PulmonaryHypertensionDiagram, { PulmonaryHypertensionFigureCaption } from '@/components/PulmonaryHypertensionDiagram'
import styles from './page.module.css'

const ID = 'pulmonale-hypertonie'
const L = (de, en, fa) => ({ de, en, fa })
const t = (value, lang) => value?.[lang] || value?.de || ''
const COPY = {
  title: L('Pulmonale Hypertonie im Bild erkennen', 'Recognising pulmonary hypertension on imaging', 'شناخت پرفشاری ریوی در تصویربرداری'),
  thorax: L('Thorax', 'Thorax', 'قفسه سینه'),
  chapter: L( 'Pulmonale Gefäßerkrankungen', 'Pulmonary vascular diseases','بیماری‌های عروقی ریه'),
  contents: L( 'Lektionsinhalt', 'Lesson content','محتوای درس'),
  path: L( 'Lernpfad', 'Learning path','مسیر یادگیری'),
  progress: L( 'gelesen', 'read','خوانده‌شده'),
  continue: L( 'Lektion fortsetzen', 'Continue lesson','ادامه درس'),
  completeLesson: L( 'Ganze Lektion als gelesen markieren', 'Mark full lesson as read','علامت‌گذاری کل درس به‌عنوان خوانده‌شده'),
  lessonCompleted: L( 'Ganze Lektion gelesen', 'Full lesson marked as read','کل درس خوانده شد'),
  complete: L( 'Abschnitt als gelesen markieren', 'Mark section as read','علامت‌گذاری بخش به‌عنوان خوانده‌شده'),
  completed: L( 'Als gelesen markiert', 'Marked as read','خوانده‌شده'),
  open: L( 'Abschnitt öffnen', 'Open section','باز کردن بخش'),
  close: L( 'Schließen', 'Close','بستن'),
  takeHome: L( 'Kernaussagen', 'Take-home points','نکات کلیدی'),
}
const SECTIONS = [
  { id: 'hemodynamics', label: L( 'Was definiert die Erkrankung?', 'What establishes the diagnosis?','چه چیزی تعریف را قطعی می‌کند؟'), icon: 'definition' },
  { id: 'imaging', label: L( 'Worauf achten Sie in der Bildgebung?', 'What should you look for on imaging?','در تصاویر به دنبال چه بگردیم؟'), icon: 'imaging' },
  { id: 'groups', label: L( 'Muster einer möglichen Gruppe zuordnen', 'Connect the pattern to a likely group','الگو را با علت احتمالی پیوند دهید'), icon: 'groups' },
  { id: 'check', label: L( 'Ein Entscheidungsschritt', 'A decision check','یک گام تصمیم‌گیری'), icon: 'check' },
  { id: 'take-home', label: L( 'Drei Regeln für den Befund', 'Three rules for reporting','سه قاعده برای گزارش'), icon: 'take-home', emphasis: true },
]
const GROUPS = [
  [L( '1 · Pulmonale arterielle Hypertonie (PAH)', '1 · Pulmonary arterial hypertension (PAH)', '۱ · هایپرتانسیون شریانی ریوی (PAH)'), L( 'Eine vergrößerte Pulmonalarterie kann bei relativ erhaltenem Lungenparenchym auftreten. Dieses Muster bestimmt die Ursache nicht allein.', 'Pulmonary-artery enlargement may occur with relatively preserved lung parenchyma. This pattern alone does not identify the cause.', 'اتساع شریان ریوی ممکن است با پارانشیم نسبتاً حفظ‌شده دیده شود؛ این الگو به‌تنهایی علت را تعیین نمی‌کند.')],
  [L( '2 · Pulmonale Hypertonie bei Linksherzerkrankung', '2 · Pulmonary hypertension associated with left-heart disease', '۲ · پرفشاری ریوی ناشی از بیماری قلب چپ'), L( 'Linksatriale Vergrößerung, Stauungszeichen und Pleuraergüsse können Hinweise sein; mit Echokardiographie und klinischem Kontext abgleichen.', 'Left-atrial enlargement, congestion, and pleural effusions may provide clues; correlate imaging with echocardiography and clinical context.', 'بزرگی دهلیز چپ، احتقان و افیوژن پلور می‌توانند سرنخ باشند؛ تصویر را با اکو و زمینه بالینی تطبیق دهید.')],
  [L( '3 · Pulmonale Hypertonie bei Lungenerkrankung/Hypoxie', '3 · Pulmonary hypertension associated with lung disease/hypoxia', '۳ · پرفشاری ریوی همراه بیماری ریه/هیپوکسی'), L( 'Die zugrunde liegende Parenchymerkrankung, etwa Emphysem oder Fibrose, und Zeichen der Rechtsherzbelastung beurteilen.', 'Look for the underlying parenchymal disease, such as emphysema or fibrosis, alongside signs of right-heart pressure load.', 'در کنار نشانه‌های فشار بر قلب راست، خود بیماری پارانشیم مانند آمفیزم یا فیبروز را بررسی کنید.')],
  [L( '4 · PH bei Obstruktionen der Pulmonalarterien', '4 · PH associated with pulmonary artery obstructions', '۴ · PH همراه با انسداد شریان‌های ریوی'), L( 'CTEPH ist Subgruppe 4.1 und die Hauptform dieser Gruppe. Auf organisiertes thrombotisches Material, Webs/Bänder, Stenosen oder abrupten Gefäßabbruch, Mosaikperfusion und hypertrophierte Bronchialarterien als Kollateralen achten; eine gezielte Abklärung ist erforderlich.', 'CTEPH is subtype 4.1 and the principal form in this group. Look for organised thrombus, webs/bands, stenosis or abrupt vessel cut-off, mosaic perfusion, and hypertrophied bronchial arteries as collaterals; dedicated evaluation is required.', 'CTEPH زیرگروه 4.1 و شکل اصلی این گروه است. ترومبوس سازمان‌یافته، وب/بند، تنگی یا قطع ناگهانی شریان، پرفیوژن موزاییکی و هیپرتروفی شریان‌های برونشی به‌عنوان کولترال را بررسی کنید؛ ارزیابی اختصاصی لازم است.')],
  [L( '5 · Pulmonale Hypertonie mit unklarem oder multifaktoriellem Mechanismus', '5 · Pulmonary hypertension with unclear or multifactorial mechanisms', '۵ · پرفشاری ریوی با مکانیسم نامشخص یا چندعاملی'), L( 'Systemerkrankungen oder mehrere gleichzeitig wirkende Mechanismen sind möglich; die Thoraxbildgebung allein ordnet die Gruppe nicht zu.', 'Systemic disorders or multiple contributing mechanisms may be present; chest imaging alone cannot assign the group.', 'بیماری سیستمیک یا چند عامل هم‌زمان ممکن‌اند؛ تصویر قفسه سینه به‌تنهایی گروه را تعیین نمی‌کند.')],
]
const REFERENCES = [
  ['2022 ESC/ERS Guidelines for the diagnosis and treatment of pulmonary hypertension', 'https://academic.oup.com/eurheartj/article/43/38/3618/6673929', 'ESC/ERS 2022; haemodynamic definitions, diagnostic pathway, imaging findings.'],
  ['Kovacs G, et al. Definition, classification and diagnosis of pulmonary hypertension', 'https://doi.org/10.1183/13993003.01324-2024', 'ERS review (2024); confirms the 2022 haemodynamic definitions.'],
]

function Icon({ id }) {
  const d = { definition: 'M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h5', imaging: 'M3 12h18 M12 3v18 M5 5l14 14 M19 5 5 19', groups: 'M12 3v6m0 0-6 4m6-4 6 4M6 13v6m12-6v6', check: 'M5 12h14m-6-6 6 6-6 6', 'take-home': 'M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z' }[id] || 'M4 12h16'
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
}
function Section({ id, title, children }) { return <LessonSection id={id} title={title} icon={id} bodyClassName={styles.sectionBody}>{children}</LessonSection> }

function TeachingContent({ lang }) {
  const [answer, setAnswer] = useState(null)
  const fa = lang === 'fa'
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const yes = L( 'Richtig. Pulmonalarteriendurchmesser und Verhältnis zur Aorta sind Hinweise; die hämodynamische Diagnose wird im Rechtsherzkatheter gestellt.', 'Correct. Pulmonary-artery size and its ratio to the aorta are clues; haemodynamic diagnosis is established by right-heart catheterisation.','درست. قطر شریان ریوی و نسبت آن به آئورت سرنخ‌اند؛ تشخیص همودینامیک با کاتتریزاسیون راست قلب انجام می‌شود.')
  const no = L( 'Nicht allein. Durchmesser und Verhältnis können den Verdacht stützen, beweisen die pulmonale Hypertonie aber nicht.', 'Not by itself. Pulmonary-artery size and ratio raise suspicion but do not establish pulmonary hypertension.','نه. قطر و نسبت شریان ریوی احتمال را مطرح می‌کنند، اما به‌تنهایی پرفشاری ریوی را اثبات نمی‌کنند.')
  return <>
    <Section id="hemodynamics" title={t(SECTIONS[0].label, lang)}>
      <p className={styles.lead}>{L( 'Pulmonale Hypertonie ist eine hämodynamische Diagnose, kein CT-Zeichen. In Ruhe definiert ein mittlerer pulmonalarterieller Druck (mPAP) >20 mmHg eine PH; zur Einteilung in prä- oder postkapillär sind zusätzlich PAWP und PVR erforderlich.', 'Pulmonary hypertension is a haemodynamic diagnosis, not a CT sign. At rest, mean pulmonary arterial pressure (mPAP) >20 mmHg defines PH; PAWP and PVR are also required to classify pre- versus post-capillary disease.','پرفشاری ریوی یک تشخیص همودینامیک است، نه یک علامت CT. در استراحت، فشار متوسط شریان ریوی (mPAP) بیش از ۲۰ mmHg تعریف‌کنندهٔ PH است؛ برای دسته‌بندی پیش‌مویرگی یا پس‌مویرگی، PAWP و PVR هم لازم‌اند.')[lang]}</p>
      <div className={styles.definitionGrid}>
        <article><small>PH</small><strong><bdi dir="ltr">mPAP &gt; 20 mmHg</bdi></strong><p>{L( 'In Ruhe mittels Rechtsherzkatheter gemessen', 'Measured at rest by right-heart catheterisation','در کاتتریزاسیون راست قلب، در استراحت')[lang]}</p></article>
        <article><small>{L( 'Präkapillär', 'Pre-capillary','پیش‌مویرگی')[lang]}</small><strong><bdi dir="ltr">PAWP ≤ 15 mmHg · PVR &gt; 2 WU</bdi></strong><p>{L( 'Alle drei Kriterien müssen gemeinsam erfüllt sein: mPAP, PAWP und PVR.', 'All three criteria must be met together: mPAP, PAWP, and PVR.','هر سه معیار باید با هم برقرار باشند: mPAP، PAWP و PVR.')[lang]}</p></article>
        <article><small>{L( 'Isoliert postkapillär (IpcPH)', 'Isolated post-capillary (IpcPH)','پس‌مویرگی منفرد (IpcPH)')[lang]}</small><strong><bdi dir="ltr">PAWP &gt; 15 mmHg · PVR ≤ 2 WU</bdi></strong><p>{L( 'Zusammen mit mPAP &gt;20 mmHg; erhöhter pulmonaler Druck bei erhöhtem linksseitigem Füllungsdruck.', 'Together with mPAP &gt;20 mmHg; elevated pulmonary pressure with raised left-sided filling pressure.', 'همراه با mPAP بیش از ۲۰؛ فشار ریوی بالا با افزایش فشار پرشدگی سمت چپ قلب.')[lang]}</p></article>
        <article><small>{L( 'Kombiniert post- und präkapillär (CpcPH)', 'Combined post- and pre-capillary (CpcPH)','پس‌مویرگی و پیش‌مویرگی ترکیبی (CpcPH)')[lang]}</small><strong><bdi dir="ltr">PAWP &gt; 15 mmHg · PVR &gt; 2 WU</bdi></strong><p>{L( 'Zusammen mit mPAP &gt;20 mmHg; der erhöhte PVR zeigt eine zusätzliche präkapilläre Komponente.', 'Together with mPAP &gt;20 mmHg; raised PVR indicates an additional pre-capillary component.', 'همراه با mPAP بیش از ۲۰؛ افزایش PVR وجود مؤلفهٔ پیش‌مویرگی را هم نشان می‌دهد.')[lang]}</p></article>
      </div>
      <aside className={styles.cave}><strong>{L( 'Wichtig', 'Important','نکتهٔ مهم')[lang]}</strong><p>{L( 'Die Echokardiographie schätzt die Wahrscheinlichkeit und lenkt die weitere Abklärung; definitive hämodynamische Diagnose und Einteilung erfordern den Rechtsherzkatheter. mPAP allein reicht weder zur Definition einer PAH noch zur Therapiewahl.', 'Echocardiography estimates probability and guides further work-up; definitive haemodynamic diagnosis and classification require right-heart catheterisation. mPAP alone is not sufficient to define PAH or select treatment.','اکو احتمال را برآورد می‌کند و به تصمیم برای بررسی بیشتر کمک می‌کند؛ تشخیص نهایی و طبقه‌بندی همودینامیک با کاتتریزاسیون راست قلب است. عدد mPAP به‌تنهایی برای تعریف PAH یا انتخاب درمان کافی نیست.')[lang]}</p></aside>
    </Section>
    <Section id="imaging" title={t(SECTIONS[1].label, lang)}>
      <figure className={styles.figure}>
        <PulmonaryHypertensionDiagram lang={lang} />
        <figcaption><PulmonaryHypertensionFigureCaption lang={lang} /></figcaption>
      </figure>
      <div className={styles.signGrid}>
        <article><h3>{L( 'Röntgen-Thorax', 'Chest radiograph', 'رادیوگرافی')[lang]}</h3><p>{L( 'Im p.-a.-Bild prominente Hili und zentrale Pulmonalarterien, peripheres „Pruning“ sowie gegebenenfalls ein angehobener Apex. In der Seitenaufnahme kann der Retrosternalraum eingeengt sein; dieser getrennte Projektionsbefund stützt die Beurteilung der Rechtsherzvergrößerung.', 'On the PA view, look for prominent hila and central pulmonary arteries, peripheral “pruning” and, when present, an upturned apex. On the lateral view, the retrosternal space may be narrowed; this is a separate projection-specific clue to right-heart enlargement.', 'در نمای PA به برجستگی ناف و شریان‌های مرکزی، «pruning» محیطی و در صورت وجود بالا رفتن اپکس توجه کنید. در نمای لترال ممکن است فضای رتروسترنال تنگ باشد؛ این یافتهٔ جداگانهٔ نمای لترال به ارزیابی بزرگی قلب راست کمک می‌کند.')[lang]}</p></article>
        <article><h3>CT</h3><p>{t(L( 'Hauptpulmonalarterie und PA/Ao-Verhältnis messen; ein ', 'Measure the main pulmonary artery and PA/Ao ratio; an ','قطر تنهٔ شریان ریوی و نسبت PA/Ao را اندازه بگیرید؛ '), lang)}<bdi dir="ltr">RV/LV &gt; 1</bdi>{t(L( '-Verhältnis und eine Abflachung/Verlagerung des Septums sind weitere Hinweise auf eine Rechtsherzbelastung. Einzelne Durchmesser- oder Verhältnisgrenzwerte berücksichtigen Patient, Bildqualität und klinischen Kontext nicht.', ' ratio and septal flattening/bowing are also clues to right-heart load. A single diameter or ratio cut-off ignores patient, image and clinical context.',' و صاف‌شدن/انحراف سپتوم نیز سرنخ‌های بار قلب راست‌اند. آستانهٔ ثابت قطر یا نسبت منفرد در همهٔ افراد، کیفیت تصویر و زمینهٔ بالینی را نادیده می‌گیرد.'), lang)}</p></article>
      </div>
      <p className={styles.cave}>{L( 'Das PDF nennt für den Truncus pulmonalis >29 mm und für PA/Aorta >1,0. Die ESC/ERS-Leitlinie führt ein Verhältnis >0,9 und eine vergrößerte Pulmonalarterie als Bildgebungshinweise auf; sie sind keine definitiven Diagnosekriterien. Grenzwerte immer anhand der passenden Quelle und des klinischen Kontexts einordnen.','The PDF gives specific values of pulmonary-trunk diameter >29 mm and PA/Aorta >1.0. ESC/ERS lists a ratio >0.9 and an enlarged pulmonary artery as imaging clues; these are not definitive diagnostic criteria. Interpret thresholds in the appropriate source and context.','PDF برای تنهٔ شریان ریوی >29 mm و PA/Aorta >1.0 اعداد مشخصی می‌دهد. راهنمای ESC/ERS نسبت >0.9 و بزرگ‌شدن شریان ریوی را سرنخ تصویری می‌داند؛ این‌ها معیار تشخیص قطعی نیستند و باید در زمینه و منبع مناسب تفسیر شوند.')[lang]}</p>
    </Section>
    <Section id="groups" title={t(SECTIONS[2].label, lang)}>
      <p>{L( 'Die WHO/ESC-Klassifikation unterscheidet fünf Gruppen mit unterschiedlichen Mechanismen. Beschreiben Sie zunächst die sichtbaren Ursachen und gleichen Sie den Befund dann mit kardialen, pulmonalen und klinischen Daten ab.', 'The WHO/ESC five-group classification separates different mechanisms. First describe visible causes on imaging, then correlate with cardiac, pulmonary and clinical data.', 'طبقه‌بندی پنج‌گروهی WHO/ESC مکانیسم‌های متفاوت را جدا می‌کند. ابتدا علت‌های قابل مشاهده در تصویر را توصیف و سپس با داده‌های قلبی، ریوی و بالینی تطبیق دهید.')[lang]}</p>
      <div className={styles.groupList}>{GROUPS.map(([title, body]) => <article key={t(title, lang)}><h3>{t(title, lang)}</h3><p>{t(body, lang)}</p></article>)}</div>
      <aside className={styles.cave}><strong>{L( 'Stolperfalle', 'Pitfall', 'دام تشخیصی')[lang]}</strong><p>{L( 'Eine vergrößerte Pulmonalarterie bedeutet nicht automatisch PAH. Linksherzerkrankung, Lungenerkrankung, CTEPH und multifaktorielle Mechanismen unterscheiden; die Bildgebung zeigt möglicherweise nur einen Teil des klinischen Kontexts.', 'Pulmonary-artery enlargement does not mean PAH. Distinguish left-heart disease, parenchymal lung disease, CTEPH and multifactorial mechanisms; imaging may reveal only part of the context.', 'بزرگی شریان ریوی به معنی PAH نیست. بیماری قلب چپ، بیماری پارانشیم ریه، CTEPH و مکانیسم‌های چندعاملی را افتراق دهید؛ تصویر ممکن است فقط بخشی از زمینه را نشان دهد.')[lang]}</p></aside>
    </Section>
    <Section id="check" title={t(SECTIONS[3].label, lang)}>
      <div className={styles.quiz} dir={fa ? 'rtl' : 'ltr'}>
        <small>{L( 'Selbstcheck · kein Patientenbild', 'Self-check · no patient image', 'خودآزمایی · بدون تصویر بیمار')[lang]}</small>
        <h3>{L( 'Im CT sind der Truncus pulmonalis erweitert und das PA/Ao-Verhältnis beträgt 1,05. Welche Schlussfolgerung ist richtig?', 'CT shows an enlarged pulmonary trunk and PA/Ao ratio of 1.05. Which conclusion is sound?', 'در CT، تنهٔ شریان ریوی بزرگ و PA/Ao برابر ۱٫۰۵ است. کدام نتیجه درست است؟')[lang]}</h3>
        {[L( 'Diese Befunde beweisen eine PH und weisen Gruppe 1 nach.', 'These findings prove PH and identify group 1.', 'این یافته‌ها PH را ثابت می‌کنند و گروه ۱ را تعیین می‌کنند.'), L( 'Die Befunde erhöhen den Verdacht; für die hämodynamische Diagnose und Gruppenzuordnung ist eine weitere Abklärung nötig.', 'These findings increase suspicion; further work-up is needed for haemodynamic diagnosis and group assignment.', 'این یافته‌ها ظن را افزایش می‌دهند؛ برای تشخیص همودینامیک و تعیین گروه، بررسی تکمیلی لازم است.'), L( 'Das PA/Ao-Verhältnis spielt bei der Beurteilung einer PH keine Rolle.', 'The PA/Ao ratio has no role in PH assessment.', 'نسبت PA/Ao در تفسیر PH کاربرد ندارد.')].map((option, index) => <button type="button" key={index} className={answer === index ? styles.selected : ''} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{t(option, lang)}</button>)}
        {answer !== null && <p className={answer === 1 ? styles.correct : styles.feedback} aria-live="polite">{t(answer === 1 ? yes : no, lang)}</p>}
      </div>
    </Section>
    <nav className={styles.actions} aria-label={t(L('Weitere Übungen', 'More practice', 'تمرین‌های بیشتر'), lang)}>
      <Link href={langHref('/ueben/quiz?fach=thorax&n=2&themen=pulmonale-hypertonie&from=%2Fthorax%2Fpulmonale-hypertonie')}>
        {t(L('MCQ üben', 'Practise the MCQs', 'تمرین پرسش‌های چندگزینه‌ای'), lang)}
      </Link>
      <Link href={langHref('/flashcards/pulmonale-hypertonie?from=%2Fthorax%2Fpulmonale-hypertonie')}>
        {t(L('Lernkarten öffnen', 'Open flashcards', 'بازکردن فلش‌کارت‌ها'), lang)}
      </Link>
    </nav>
    <Section id="take-home" title={t(SECTIONS[4].label, lang)}>
      <TakeHomeList items={[
        { title: t(L( 'CT liefert Hinweise; die hämodynamische Diagnose wird im Rechtsherzkatheter gestellt.', 'CT raises clues; RHC establishes the haemodynamic diagnosis.', 'CT سرنخ می‌دهد؛ RHC تشخیص همودینامیک را تثبیت می‌کند.'), lang), detail: t(L( 'Zur Definition und Einteilung der PH Drücke und Gefäßwiderstand im passenden Kontext beurteilen.', 'Use pressures and vascular resistance in the appropriate context to define and classify PH.', 'برای تعریف PH و گروه‌بندی، فشارها و مقاومت عروقی را در زمینه مناسب بررسی کنید.'), lang) },
        { title: t(L( 'PA, Aorta, RV und Septum gemeinsam beurteilen.', 'Read the PA, aorta, RV and septum together.', 'PA، آئورت، RV و سپتوم را با هم بخوانید.'), lang), detail: t(L( 'Ein einzelnes Verhältnis oder einen einzelnen Durchmesser nicht überinterpretieren.', 'Do not overinterpret a single ratio or diameter.', 'نسبت یا قطر منفرد را بیش‌ازحد تفسیر نکنید.'), lang) },
        { title: t(L( 'Gezielt nach dem zugrunde liegenden Mechanismus suchen.', 'Actively look for the underlying mechanism.', 'مکانیسم زمینه‌ای را فعالانه جست‌وجو کنید.'), lang), detail: t(L( 'Linksherzerkrankung, Lungenparenchymerkrankung, chronisch thromboembolische Erkrankung und Systemerkrankungen sind wichtige bildgebende Differenzialdiagnosen.', 'Left-heart disease, lung parenchymal disease, chronic thromboembolic disease and systemic disorders are key imaging differentials.', 'بیماری قلب چپ، پارانشیم ریه، بیماری ترومبوآمبولیک مزمن و اختلال سیستمیک از افتراق‌های مهم‌اند.'), lang) },
      ]} />
    </Section>
  </>
}

export default function PulmonaryHypertensionPage() {
  const { lang } = useLanguage()
  const localized = SECTIONS.map(section => ({ ...section, label: t(section.label, lang) }))
  const sources = REFERENCES.map(([title, href, citation]) => ({ tag: t(L( 'Leitlinie','Guideline','راهنما'), lang), title, href, citation }))
  const labels = Object.fromEntries(['contents', 'path', 'progress', 'continue', 'completeLesson', 'lessonCompleted', 'complete', 'completed', 'open', 'close', 'takeHome'].map(key => [key, t(COPY[key], lang)]))
  const fa = lang === 'fa'
  const langHref = path => lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  return <StandardLessonShell
    lessonId={ID} lang={lang} title={t(COPY.title, lang)} author="Dr. Zia"
    breadcrumbs={[{ label: 'RadYar', href: langHref('/') }, { label: t(COPY.thorax, lang), href: langHref('/lernen/thorax') }, { label: t(COPY.chapter, lang) }, { label: t(COPY.title, lang) }]}
    sections={localized} labels={labels} renderIcon={id => <Icon id={id} />}
    actions={{}}
    theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/thorax/pulmonale-hypertonie/hero.svg', heroImageOpacity: .9, accent: '#38c8c0', accentStrong: '#155d70', accentSoft: '#d9f4f0', secondary: '#f39aba', secondaryStrong: '#8b3458', heroBase: '#101b2d' }}
    className={styles.page}
    sources={<LessonSources title={t(L( 'Quellen', 'Sources', 'منابع'), lang)} items={sources} note={t(L( 'Das PDF dient als Abdeckungsquelle; Definition und ausgewählte Bildzeichen wurden mit ESC/ERS abgeglichen. PDF-Seite 47 setzt die Bildzeichen mit RV/LV >1 und Septumverlagerung fort.', 'The PDF is the coverage source; the definition and selected imaging signs were checked against ESC/ERS. PDF p. 47 continues the imaging signs with RV/LV >1 and septal deviation.', 'PDF مبنای پوشش است؛ تعریف و نشانه‌های تصویری منتخب با ESC/ERS تطبیق داده شدند. صفحهٔ ۴۷ نشانه‌های تصویری را با RV/LV >1 و انحراف سپتوم ادامه می‌دهد.'), lang)} />}
  >
    <div lang={lang} dir={fa ? 'rtl' : 'ltr'}><TeachingContent lang={lang} /></div>
  </StandardLessonShell>
}
