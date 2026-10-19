'use client'

import { useState } from 'react'
import Image from 'next/image'
import StandardLessonShell, { LessonSection, LessonSources, TakeHomeList } from '@/components/lesson-template/StandardLessonShell'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })
const C = {
  de: {
    title: 'Gastrointestinale Stromatumoren (GIST)', subtitle: 'Wandursprung, exophytisches Wachstum und heterogene Kontrastierung gemeinsam lesen.',
    goals: ['Die typische CT-Morphologie eines GIST erkennen.', 'Primärtumor und mögliche Leber-/Peritonealmanifestationen systematisch erfassen.', 'Die Aussagekraft der Bildgebung bei Erstdiagnose und Therapieansprechen abgrenzen.'],
    intro: 'GIST sind mesenchymale Tumoren der GI-Wand. In der Bildgebung sind der abgerundete, oft nach außen wachsende Tumor und seine heterogene Binnenstruktur hilfreiche Hinweise; Bildgebung allein beweist die Histologie nicht.',
    searchTitle: 'Woher kommt die Masse, wohin wächst sie?', search: [
      ['Ursprung', 'GIST entstehen meist aus der GI-Wand und können submukös oder exophytisch wachsen. Die Schleimhaut kann darüber intakt erscheinen.'],
      ['Verteilung', 'Der Magen ist am häufigsten betroffen, danach der Dünndarm. Die GEIS-Leitlinie nennt ungefähr 55 % Magen und 31 % Dünndarm.'],
      ['Ausbreitung', 'Bei der Erstbeurteilung Abdomen und Becken gezielt auf Leber- und Peritonealmanifestationen prüfen; diese sind typische Metastasierungsorte.'],
    ],
    imagingTitle: 'CT: Form, Wachstum und Binnenstruktur', imaging: [
      ['Kontur und Wachstum', 'Häufig gut umschrieben, rund bis gelappt. Exophytisches Wachstum kann die Beziehung zum Magen oder Darm zunächst weniger offensichtlich machen.'],
      ['Kontrastierung', 'Die Läsion kann deutlich und heterogen anreichern. Größere Tumoren können zentrale hypodense Areale durch Nekrose, Einblutung oder Degeneration enthalten. Die PDF-Fallbeschreibung nennt solche Areale.'],
      ['Untersuchung', 'Kontrastverstärkte CT von Abdomen und Becken dient der Lokalisation und Ausdehnungsbeurteilung. Die GEIS-Leitlinie nennt CT als erste Wahl; für kleine hypervaskuläre Leberläsionen empfiehlt sie arterielle und portalvenöse Akquisitionen. Die Phasen der PDF-Fallbilder sind nicht gekennzeichnet.'],
    ],
    caseTitle: 'Fall aus der Vorlage: erst den Magenbezug suchen', caseAlt: 'Drei CT-Ansichten eines gelappten, vom Magen ausgehenden Tumors mit hypodensen Binnenarealen; originale Bildtafel aus Abdomen.pdf, PDF-Seite 68.', caseCaption: 'Abdomen.pdf, PDF-Seite 68 (gedruckte Seite 67): axiale und koronare CT-Ansichten eines gelappten, vom Magen ausgehenden Tumors mit hypodensen Arealen. Die Folie nennt keine eindeutige Phasenzuordnung der einzelnen Bilder; daher werden diese Bilder keiner bestimmten Phase zugeordnet.',
    ddTitle: 'Welche Alternativen bleiben wichtig?', dd: [
      ['Adenokarzinom', 'Magenkarzinome gehen typischerweise von der Mukosa aus und können die Wand infiltrativ verändern. Die Unterscheidung gelingt nicht zuverlässig anhand eines einzelnen CT-Merkmals.'],
      ['Lymphom', 'Kann eher eine längere, diffuse Wandverdickung verursachen; das Muster ist variabel und nicht allein diagnostisch.'],
      ['Lipom', 'Ein makroskopisch fetthaltiger Tumor zeigt Fettattenuation; die PDF nennt <−30 HU als Hinweis. Dieser historische Zahlenwert wird hier nicht als allgemeingültige Schwelle übernommen.'],
    ],
    responseTitle: 'Therapiekontrolle ist eine andere Frage', response: 'Unter Imatinib kann die Dichte eines GIST abnehmen, bevor sich der Durchmesser deutlich verändert. Die Choi-Kriterien wurden für das Therapieansprechen entwickelt: eine partielle Response erfordert eine Größenabnahme ≥10 % oder eine Abnahme der CT-Dichte ≥15 %, zugleich aber keine neuen Läsionen und keine offensichtliche Progression nicht messbarer Erkrankung. Das ist kein Kriterium zur Erstdiagnose; GEIS empfiehlt im metastasierten/unresektablen Kontext außerdem modified RECIST 1.1 zu berücksichtigen.',
    cave: 'Ein stark anreichernder, exophytischer und heterogener GI-Wandtumor kann GIST nahelegen, ist aber nicht beweisend. Histologische Sicherung und Management gehören in den klinischen, endoskopischen und interdisziplinären Kontext.',
    q: 'Eine gelappte, exophytische Magenwandmasse enthält zentrale hypodense Areale. Welche Aussage ist am besten begründet?',
    options: ['Die Morphologie ist mit GIST vereinbar; hypodense Areale können Degeneration/Nekrose widerspiegeln, beweisen die Diagnose aber nicht.', 'Das beweist ein GIST und erlaubt eine definitive histologische Diagnose aus CT.', 'Zentrale Hypodensität schließt GIST aus und beweist ein Adenokarzinom.'],
    good: 'Richtig. Form, exophytisches Wachstum und heterogene hypodense Areale passen zum beschriebenen GIST-Muster, bleiben aber bildgebende Hinweise ohne histologischen Beweis.',
    retry: 'Achte auf die Grenze der Bildgebung: Die Morphologie kann GIST nahelegen, aber weder Hypodensität noch exophytisches Wachstum beweisen Histologie oder schließen Alternativen aus.',
    summary: [['Wandbezug', 'Den Ursprung an der GI-Wand und das häufig exophytische Wachstum aktiv suchen.'], ['Binnenstruktur', 'Heterogene Kontrastierung und zentrale hypodense Areale können Nekrose/degenerative Veränderungen widerspiegeln.'], ['Ausdehnung', 'Leber und Peritoneum bei der Beurteilung des Abdomen/Beckens mitprüfen.'], ['Therapieantwort', 'Choi-Kriterien gehören zur Verlaufskontrolle, nicht zur Erstdiagnose.']],
    sourceNote: 'Quellenabdeckung: Abdomen.pdf, PDF-Seiten 67–68 (gedruckte Seiten 66–67), visuell geprüft. Behandlungsalgorithmus und pauschale PET/CT-„Goldstandard“-Aussage der PDF wurden nicht übernommen. Die PDF-Seite 66 enthält nur die Überschrift zur hypertrophen Pylorusstenose; sie reicht nicht als Quelle für eine entsprechende Lektion.',
  },
  en: {
    title: 'Gastrointestinal stromal tumours (GIST)', subtitle: 'Read wall origin, exophytic growth and heterogeneous enhancement together.',
    goals: ['Recognize the typical CT morphology of GIST.', 'Systematically assess the primary tumour and possible liver/peritoneal disease.', 'Separate imaging at diagnosis from assessment of treatment response.'],
    intro: 'GIST are mesenchymal tumours of the gastrointestinal wall. A rounded, often outward-growing mass with heterogeneous internal structure is a useful imaging pattern; imaging alone does not prove histology.',
    searchTitle: 'Where does the mass arise, and where does it grow?', search: [
      ['Origin', 'GIST usually arise from the GI wall and may grow submucosally or exophytically. The overlying mucosa can appear intact.'],
      ['Distribution', 'The stomach is the most common site, followed by the small bowel. The GEIS guideline reports approximately 55% gastric and 31% small-bowel locations.'],
      ['Spread', 'At initial assessment, deliberately review the abdomen and pelvis for liver and peritoneal disease, common metastatic sites.'],
    ],
    imagingTitle: 'CT: contour, growth and internal structure', imaging: [
      ['Contour and growth', 'Often well circumscribed, round to lobulated. Exophytic growth may initially make the relationship to the stomach or bowel less obvious.'],
      ['Enhancement', 'The lesion may enhance avidly and heterogeneously. Larger tumours may contain central low-attenuation areas from necrosis, haemorrhage or degeneration. The PDF case description notes such areas.'],
      ['Examination', 'Contrast-enhanced CT of the abdomen and pelvis is used to localize and assess extent. GEIS identifies CT as first choice and recommends arterial and portal acquisitions when assessing small hypervascular liver lesions. The PDF case images are not phase-labelled.'],
    ],
    caseTitle: 'Source case: look for the gastric attachment', caseAlt: 'Three CT views of a lobulated gastric-origin mass with low-attenuation internal areas; original image plate from Abdomen.pdf, PDF page 68.', caseCaption: 'Abdomen.pdf, PDF page 68 (printed page 67): axial and coronal CT views of a lobulated mass arising from the stomach, with low-attenuation areas. The slide does not assign a specific phase to each image, so no individual frame is labelled by phase.',
    ddTitle: 'Which alternatives still matter?', dd: [
      ['Adenocarcinoma', 'Gastric adenocarcinoma typically arises from the mucosa and can alter the wall infiltratively. A single CT feature cannot reliably distinguish it.'],
      ['Lymphoma', 'May produce longer-segment, diffuse wall thickening; appearances vary and are not diagnostic alone.'],
      ['Lipoma', 'A macroscopic fat-containing tumour shows fat attenuation; the PDF cites <−30 HU as a clue. That historical numeric value is not adopted here as a universal threshold.'],
    ],
    responseTitle: 'Treatment response is a different question', response: 'During imatinib therapy, GIST attenuation can decrease before the diameter changes substantially. Choi criteria were developed for treatment response: partial response requires ≥10% decrease in size or ≥15% decrease in CT attenuation, with no new lesions and no obvious progression of nonmeasurable disease. This is not a criterion for initial diagnosis; GEIS also recommends considering modified RECIST 1.1 in the unresectable/metastatic setting.',
    cave: 'An avidly enhancing, exophytic and heterogeneous GI-wall mass may suggest GIST but is not diagnostic. Histological confirmation and management belong in the clinical, endoscopic and multidisciplinary context.',
    q: 'A lobulated, exophytic gastric-wall mass contains central low-attenuation areas. Which statement is best supported?',
    options: ['The pattern is compatible with GIST; low-attenuation areas may reflect degeneration/necrosis but do not prove the diagnosis.', 'This proves GIST and provides a definitive histological diagnosis from CT.', 'Central low attenuation excludes GIST and proves adenocarcinoma.'],
    good: 'Correct. The contour, exophytic growth and heterogeneous low-attenuation areas fit the described GIST pattern, but remain imaging clues without histological proof.',
    retry: 'Keep the limit of imaging in mind: morphology may suggest GIST, but neither low attenuation nor exophytic growth proves histology or excludes alternatives.',
    summary: [['Wall relationship', 'Actively identify origin from the GI wall and the frequent exophytic growth.'], ['Internal structure', 'Heterogeneous enhancement and central low-attenuation areas may reflect necrosis or degeneration.'], ['Extent', 'Include the liver and peritoneum when assessing the abdomen and pelvis.'], ['Treatment response', 'Choi criteria belong to follow-up assessment, not initial diagnosis.']],
    sourceNote: 'Coverage: Abdomen.pdf, PDF pages 67–68 (printed pages 66–67), visually reviewed. The treatment algorithm and blanket PET/CT “gold standard” statement in the PDF were not carried forward. PDF page 66 contains only the heading for hypertrophic pyloric stenosis; it is not enough source material for a lesson on that topic.',
  },
  fa: {
    title: 'تومورهای استرومایی گوارشی (GIST)', subtitle: 'منشأ از دیواره، رشد برون‌گرا و تقویت ناهمگون را در کنار هم ارزیابی کنید.',
    goals: ['مورفولوژی معمول GIST در CT را تشخیص دهید.', 'تومور اولیه و درگیری احتمالی کبد و صفاق را منظم بررسی کنید.', 'ارزیابی تصویری هنگام تشخیص را از سنجش پاسخ درمانی جدا کنید.'],
    intro: 'GIST تومورهای مزانشیمی دیواره دستگاه گوارش هستند. توده گردی که اغلب به سمت بیرون رشد می‌کند و ساختار داخلی ناهمگون دارد، یک الگوی تصویری راهنماست؛ تصویربرداری به‌تنهایی بافت‌شناسی را ثابت نمی‌کند.',
    searchTitle: 'توده از کجا منشأ می‌گیرد و به کدام سمت رشد می‌کند؟', search: [
      ['منشأ', 'GIST معمولاً از دیواره دستگاه گوارش منشأ می‌گیرد و می‌تواند زیرمخاطی یا برون‌گرا رشد کند. مخاط روی ضایعه ممکن است سالم به نظر برسد.'],
      ['توزیع', 'معده شایع‌ترین محل و روده باریک محل بعدی است. راهنمای GEIS تقریباً ۵۵٪ محل معده‌ای و ۳۱٪ محل روده باریک را گزارش می‌کند.'],
      ['گسترش', 'در ارزیابی اولیه، کبد و صفاق را در CT شکم و لگن برای انتشار احتمالی بررسی کنید؛ این‌ها از محل‌های معمول متاستاز هستند.'],
    ],
    imagingTitle: 'CT: شکل، جهت رشد و ساختار داخلی', imaging: [
      ['حدود و رشد', 'اغلب خوش‌مرز، گرد تا لوبوله است. رشد برون‌گرا ممکن است در نگاه اول ارتباط توده با معده یا روده را پنهان کند.'],
      ['تقویت', 'ضایعه ممکن است به‌شدت و به‌طور ناهمگون تقویت شود. تومورهای بزرگ‌تر می‌توانند نواحی مرکزی کم‌دانسیته ناشی از نکروز، خونریزی یا تغییرات دژنراتیو داشته باشند. توصیف کیس PDF به چنین نواحی اشاره می‌کند.'],
      ['بررسی', 'CT با تزریق ماده حاجب از شکم و لگن برای تعیین محل و گسترش به‌کار می‌رود. GEIS، CT را روش انتخاب نخست می‌داند و برای ارزیابی ضایعات کوچک و پرعروق کبد، فاز شریانی و پورتوونوز را توصیه می‌کند. فاز تصاویر کیس PDF مشخص نشده است.'],
    ],
    caseTitle: 'کیس منبع: ابتدا اتصال به معده را پیدا کنید', caseAlt: 'سه نمای CT از توده لوبوله با منشأ معده‌ای و نواحی داخلی کم‌دانسیته؛ تصویر اصلی از Abdomen.pdf، صفحه PDF ۶۸.', caseCaption: 'Abdomen.pdf، صفحه PDF ۶۸ (صفحه چاپی ۶۷): نماهای محوری و کرونال از توده لوبوله با منشأ معده‌ای و نواحی کم‌دانسیته. اسلاید فاز دقیق هر تصویر را مشخص نمی‌کند؛ بنابراین هیچ نما به فاز خاصی نسبت داده نمی‌شود.',
    ddTitle: 'کدام تشخیص‌های جایگزین همچنان مهم‌اند؟', dd: [
      ['آدنوکارسینوم', 'آدنوکارسینوم معده معمولاً از مخاط آغاز می‌شود و می‌تواند دیواره را به‌صورت ارتشاحی تغییر دهد. یک ویژگی منفرد CT برای افتراق مطمئن کافی نیست.'],
      ['لنفوم', 'ممکن است ضخیم‌شدگی منتشر و طولانی‌تر دیواره ایجاد کند؛ ظاهر آن متغیر است و به‌تنهایی تشخیصی نیست.'],
      ['لیپوم', 'تومور دارای چربی ماکروسکوپی دانسیته چربی دارد؛ PDF عدد کمتر از ۳۰- HU را به‌عنوان سرنخ آورده است. این عدد قدیمی در این درس آستانه عمومی تلقی نمی‌شود.'],
    ],
    responseTitle: 'پاسخ به درمان پرسش جداگانه‌ای است', response: 'در طول درمان با ایماتینیب، دانسیته GIST ممکن است پیش از تغییر محسوس قطر کاهش یابد. معیارهای Choi برای سنجش پاسخ درمانی تدوین شدند: پاسخ نسبی به کاهش ≥۱۰٪ اندازه یا کاهش ≥۱۵٪ دانسیته CT نیاز دارد و هم‌زمان نباید ضایعه جدید یا پیشرفت آشکار بیماری غیرقابل‌اندازه‌گیری وجود داشته باشد. این معیار برای تشخیص اولیه نیست؛ GEIS همچنین توصیه می‌کند در زمینه بیماری غیرقابل‌جراحی یا متاستاتیک، modified RECIST 1.1 در نظر گرفته شود.',
    cave: 'توده دیواره گوارشی با تقویت زیاد، رشد برون‌گرا و ساختار ناهمگون می‌تواند مطرح‌کننده GIST باشد، اما تشخیصی نیست. تأیید بافت‌شناسی و مدیریت باید در زمینه بالینی، آندوسکوپی و تصمیم‌گیری چندتخصصی انجام شود.',
    q: 'توده لوبوله و برون‌گرای دیواره معده دارای نواحی مرکزی کم‌دانسیته است. کدام برداشت پشتوانه بهتری دارد؟',
    options: ['الگو با GIST سازگار است؛ نواحی کم‌دانسیته ممکن است بازتاب تغییرات دژنراتیو یا نکروز باشند، اما تشخیص را ثابت نمی‌کنند.', 'این یافته‌ها GIST را ثابت می‌کنند و تشخیص قطعی بافت‌شناسی از CT ممکن است.', 'کم‌دانسیته مرکزی GIST را رد می‌کند و آدنوکارسینوم را ثابت می‌کند.'],
    good: 'درست است. شکل، رشد برون‌گرا و نواحی ناهمگون کم‌دانسیته با الگوی توصیف‌شده برای GIST سازگارند، اما بدون بافت‌شناسی فقط سرنخ تصویری هستند.',
    retry: 'محدودیت تصویربرداری را در نظر بگیرید: مورفولوژی می‌تواند GIST را مطرح کند، اما کم‌دانسیته یا رشد برون‌گرا به‌تنهایی بافت‌شناسی را ثابت نمی‌کند و تشخیص‌های جایگزین را کنار نمی‌گذارد.',
    summary: [['ارتباط با دیواره', 'منشأ از دیواره گوارشی و رشد برون‌گرای شایع را فعالانه پیدا کنید.'], ['ساختار داخلی', 'تقویت ناهمگون و نواحی مرکزی کم‌دانسیته ممکن است بازتاب نکروز یا تغییرات دژنراتیو باشند.'], ['گسترش', 'کبد و صفاق را هنگام بررسی شکم و لگن در نظر بگیرید.'], ['پاسخ درمانی', 'معیارهای Choi برای پیگیری پاسخ درمانی‌اند، نه تشخیص اولیه.']],
    sourceNote: 'پوشش منبع: Abdomen.pdf، صفحات PDF ۶۷–۶۸ (صفحات چاپی ۶۶–۶۷)، با بازبینی تصویری. الگوریتم درمان و ادعای کلی PDF مبنی بر «استاندارد طلایی» بودن PET/CT وارد درس نشد. صفحه PDF ۶۶ فقط عنوان تنگی هیپرتروفیک پیلور را دارد و برای ساخت درس آن موضوع کافی نیست.',
  },
}

const t = (value, lang) => value?.[lang] || value?.de || ''
function Icon({ id }) { return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={id === 'self-check' ? 'M5 12h14M12 5v14' : 'M5 6h14M5 12h14M5 18h14'} /></svg> }
function Content({ c, lang }) {
  const [answer, setAnswer] = useState(null)
  const sections = [
    ['pattern', t(L('Ursprung und Verteilung', 'Origin and distribution', 'منشأ و توزیع'), lang)],
    ['ct', t(L('CT-Muster', 'CT pattern', 'الگوی CT'), lang)],
    ['case', t(L('Fall aus der Vorlage', 'Source case', 'کیس منبع'), lang)],
    ['dd', t(L('Differenzialdiagnosen', 'Differential diagnosis', 'تشخیص‌های افتراقی'), lang)],
    ['response', t(L('Therapieansprechen', 'Treatment response', 'پاسخ درمانی'), lang)],
    ['self-check', t(L('Selbstcheck', 'Self-check', 'خودآزمایی'), lang)],
    ['takehome', t(L('Vier Bildgebungsregeln', 'Four imaging rules', 'چهار قاعده تصویربرداری'), lang)],
  ]
  return <div className={styles.content} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <LessonSection id="pattern" title={sections[0][1]} icon="pattern" bodyClassName={styles.body}><p className={styles.lead}>{c.intro}</p><div className={styles.cards}>{c.search.map(([heading, text]) => <article key={heading}><h3>{heading}</h3><p>{text}</p></article>)}</div></LessonSection>
    <LessonSection id="ct" title={sections[1][1]} icon="ct" bodyClassName={styles.body}><div className={styles.cards}>{c.imaging.map(([heading, text]) => <article key={heading}><h3>{heading}</h3><p>{text}</p></article>)}</div><aside className={styles.cave}><strong>CAVE</strong><p>{c.cave}</p></aside></LessonSection>
    <LessonSection id="case" title={sections[2][1]} icon="case" bodyClassName={styles.body}><p>{t(L('Suchen Sie zuerst die Kontaktfläche zwischen Tumor und Magenwand; der Tumor wächst in dieser Falltafel überwiegend nach außen.', 'First identify the tumour–gastric wall interface; in this source plate, the mass predominantly grows outward.', 'ابتدا محل اتصال توده به دیواره معده را پیدا کنید؛ در این تصویر منبع، توده عمدتاً به سمت بیرون رشد می‌کند.'), lang)}</p><figure className={styles.figure}><Image src="/educational/gist/source-case-p68.png" width={1260} height={347} alt={c.caseAlt} sizes="(max-width: 800px) 100vw, 920px"/><figcaption>{c.caseCaption}</figcaption></figure></LessonSection>
    <LessonSection id="dd" title={sections[3][1]} icon="dd" bodyClassName={styles.body}><div className={styles.cards}>{c.dd.map(([heading, text]) => <article key={heading}><h3>{heading}</h3><p>{text}</p></article>)}</div></LessonSection>
    <LessonSection id="response" title={sections[4][1]} icon="response" bodyClassName={styles.body}><p>{c.response}</p></LessonSection>
    <LessonSection id="self-check" title={sections[5][1]} icon="self-check" bodyClassName={styles.body}><div className={styles.quiz}><h3>{c.q}</h3>{c.options.map((option, index) => <button type="button" key={option} className={answer === index ? styles.selected : ''} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{option}</button>)}{answer !== null ? <p className={answer === 0 ? styles.correct : styles.feedback} role="status" aria-live="polite">{answer === 0 ? c.good : c.retry}</p> : null}</div></LessonSection>
    <LessonSection id="takehome" title={sections[6][1]} icon="takehome" bodyClassName={styles.body} emphasis><TakeHomeList items={c.summary.map(([title, detail]) => ({ title, detail }))}/></LessonSection>
  </div>
}

export default function GistPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const local = path => lang === 'de' ? path : `${path}?lang=${lang}`
  const labels = Object.fromEntries(Object.entries({ complete: L('Als gelesen markieren', 'Mark as read', 'به‌عنوان خوانده‌شده علامت بزنید'), completed: L('Gelesen', 'Read', 'خوانده شد'), continue: L('Weiter', 'Continue', 'ادامه'), path: L('Lernpfad', 'Learning path', 'مسیر یادگیری'), progress: L('Fortschritt', 'Progress', 'پیشرفت'), takeHome: L('Vier Bildgebungsregeln', 'Four imaging rules', 'چهار قاعده تصویربرداری'), sources: L('Quellen', 'Sources', 'منابع'), close: L('Schließen', 'Close', 'بستن'), contents: L('Seitenpfad', 'Breadcrumb', 'مسیر صفحه'), open: L('Öffnen', 'Open', 'بازکردن'), completeLesson: L('Lektion abschließen', 'Complete lesson', 'درس را کامل کنید'), lessonCompleted: L('Lektion abgeschlossen', 'Lesson completed', 'درس کامل شد') }).map(([key, value]) => [key, t(value, lang)]))
  const sectionDefs = [['pattern', L('Ursprung und Verteilung', 'Origin and distribution', 'منشأ و توزیع')], ['ct', L('CT-Muster', 'CT pattern', 'الگوی CT')], ['case', L('Fall aus der Vorlage', 'Source case', 'کیس منبع')], ['dd', L('Differenzialdiagnosen', 'Differential diagnosis', 'تشخیص‌های افتراقی')], ['response', L('Therapieansprechen', 'Treatment response', 'پاسخ درمانی')], ['self-check', L('Selbstcheck', 'Self-check', 'خودآزمایی')], ['takehome', L('Vier Regeln', 'Four rules', 'چهار قاعده')]]
  const sections = sectionDefs.map(([id, label]) => ({ id, label: t(label, lang), icon: id, emphasis: id === 'takehome' }))
  const sources = [
    { tag: t(L('Leitlinie', 'Guideline', 'راهنما'), lang), title: 'Serrano C, et al. 2023 GEIS Guidelines for gastrointestinal stromal tumors. Ther Adv Med Oncol. 2023;15. doi:10.1177/17588359231192388.', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10467260/', citation: t(L('Aktuelle Primärleitlinie: Verteilung, CT-Erstwahl, Metastasierung und Response-Bewertung.', 'Current primary guideline: distribution, CT first choice, metastases and response assessment.', 'راهنمای اولیه به‌روز: توزیع، انتخاب نخست CT، متاستاز و ارزیابی پاسخ درمانی.'), lang) },
    { tag: t(L('Response-Kriterien', 'Response criteria', 'معیارهای پاسخ'), lang), title: 'Choi H, et al. Correlation of Computed Tomography and Positron Emission Tomography in Patients With Metastatic Gastrointestinal Stromal Tumor Treated at a Single Institution With Imatinib Mesylate: Proposal of New Computed Tomography Response Criteria. J Clin Oncol. 2007;25:1753–1759. doi:10.1200/JCO.2006.07.3049.', href: 'https://doi.org/10.1200/JCO.2006.07.3049', citation: t(L('Primärpublikation zur CT-basierten Bewertung des Therapieansprechens unter Imatinib; nicht für die Erstdiagnose.', 'Primary publication on CT-based response assessment during imatinib therapy; not for initial diagnosis.', 'مقاله اولیه درباره ارزیابی پاسخ بر پایه CT طی درمان با ایماتینیب؛ نه برای تشخیص اولیه.'), lang) },
  ]
  return <StandardLessonShell lessonId="abdomen-gist" lang={lang} title={c.title} author="RadYar" breadcrumbs={[{ label: 'RadYar', href: local('/') }, { label: t(L('Abdomen', 'Abdomen', 'شکم'), lang), href: local('/lernen/abdomen') }, { label: t(L('Gastrointestinaltrakt', 'Gastrointestinal tract', 'دستگاه گوارش'), lang) }, { label: c.title }]} sections={sections} labels={labels} renderIcon={id => <Icon id={id}/>} actions={{}} syncHashNavigation theme={{ backgroundImage: '/andarun-galaxy-v3.png', heroImage: '/educational/gist/hero.svg', heroImageOpacity: .95, accent: '#55a5b4', accentStrong: '#185967', accentSoft: '#e1f3f4', secondary: '#d69553', secondaryStrong: '#784316', heroBase: '#101b2d' }} heroImageAlt={t(L('Schematische Darstellung eines exophytischen Tumors aus der Magenwand, keine Patientenaufnahme.', 'Schematic of an exophytic tumour arising from the gastric wall; not patient data.', 'شماتیک تومور برون‌گرا با منشأ دیواره معده؛ نه تصویر بیمار.'), lang)} sources={<LessonSources title={labels.sources} items={sources} note={c.sourceNote}/>}><Content c={c} lang={lang}/></StandardLessonShell>
}
