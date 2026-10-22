'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from './page.module.css'

const C = {
  de: {
    title: 'Fibromuskuläre Dysplasie', subtitle: 'Renale FMD: Gefäßmorphologie, typische Verteilung und Grenzen der Bildgebung.',
    intro: 'Die fibromuskuläre Dysplasie (FMD) ist eine nicht-atherosklerotische, nicht-entzündliche Erkrankung mittelgroßer Arterien. Für die Bildinterpretation ist wichtig: Eine typische Gefäßform kann FMD nahelegen, aber Morphologie allein zeigt nicht zuverlässig, wie hämodynamisch relevant eine Stenose ist.',
    definition: 'Die Gefäßwand zeigt eine abnorme Zellproliferation und veränderte Architektur. FMD kann fokale oder multifokale Läsionen verursachen; Aneurysmen, Dissektionen und Tortuosität können begleitend vorkommen.',
    patternTitle: 'Morphologie: fokal oder multifokal', pattern: [
      ['Multifokal', 'Abwechselnde Stenosen und Dilatationen erzeugen das „string-of-beads“- beziehungsweise Perlschnurmuster. Es liegt häufig im mittleren oder distalen Abschnitt der Nierenarterie.'],
      ['Fokal', 'Eine umschriebene oder längere tubuläre Stenose kann in unterschiedlichen Arterienabschnitten auftreten. Das Fehlen eines Perlschnurmusters schließt FMD nicht aus.'],
      ['Wichtige Grenze', 'Aneurysma, Dissektion oder Tortuosität allein reichen nach internationalem Konsens nicht zur Diagnose FMD; dafür ist eine fokale oder multifokale Läsion erforderlich.'],
    ],
    diagramTitle: 'Schematische Gefäßmorphologie', diagramCaption: 'Originale Lehrskizze: wechselnde Einengungen und Erweiterungen. Keine Patientendarstellung und kein Diagnosekriterium ohne Kontext.',
    locationTitle: 'Verteilung und klinischer Kontext', locations: [
      ['Nierenarterien', 'Häufig betroffen; die multifokale Form betrifft oft mittlere und distale Segmente, während ostiale Plaques eher an atherosklerotische Erkrankung denken lassen.'],
      ['Weitere Gefäßgebiete', 'Karotis- und Vertebralarterien sind ebenfalls häufig betroffen. Viszerale Arterien können beteiligt sein; die PDF nennt diese seltener.'],
      ['Klinische Hinweise', 'Renovaskuläre Hypertonie kann zur Abklärung führen. Kopfschmerz, puls-synchroner Tinnitus, TIA oder Schlaganfall sind mögliche Hinweise bei zervikaler Beteiligung, aber nicht spezifisch.'],
    ],
    imagingTitle: 'Bildgebung: CTA/MRA zuerst einordnen', imaging: [
      ['CTA', 'Der internationale Konsens nennt CTA als initiale Methode der Wahl bei Verdacht auf renale FMD; die räumliche Auflösung unterstützt die Darstellung von Läsionsmorphologie und Verkalkungen.'],
      ['MRA', 'Kontrastverstärkte MRA ist eine Alternative, wenn CTA kontraindiziert ist. Die Aussagekraft hängt von Technik und Gefäßgröße ab.'],
      ['Katheterangiographie', 'DSA ist invasiv. Sie kann erwogen werden, wenn nicht-invasive Bildgebung die Diagnose bestätigt oder ein hoher Verdacht trotz negativer CTA/MRA besteht und das Ergebnis voraussichtlich das Management beeinflusst.'],
      ['Hämodynamik', 'CTA/MRA-Morphologie allein bestimmt die hämodynamische Bedeutung einer renalen Stenose nicht zuverlässig. Eine interventionelle Entscheidung gehört in den klinischen und spezialisierten Kontext.'],
    ],
    caution: 'Die PDF nennt DSA und CTA unter „Methode der Wahl“. Der internationale Konsens von 2019 präzisiert die Reihenfolge: CTA initial, kontrastverstärkte MRA bei Kontraindikation; DSA nur selektiv, wenn das Ergebnis die Versorgung beeinflussen kann. Das ist eine Bildgebungszusammenfassung, keine Managementempfehlung.',
    source: 'Quellenumfang: Abdomen.pdf p. 92 visuell geprüft. p. 55 enthält nur eine Kapitelüberschrift und einen Platzhalter, keine zusätzliche FMD-Evidenz. Primärquelle: Gornik et al., First International Consensus on FMD, Vascular Medicine 2019, DOI 10.1177/1358863X18821816.',
    goals: ['Fokale und multifokale FMD-Morphologie unterscheiden.', 'Die typische Lokalisation in Nierenarterien und den Kontext weiterer Gefäßgebiete einordnen.', 'CTA/MRA und selektive DSA unterscheiden und morphologische von hämodynamischer Aussage trennen.'],
    checkQ: 'Welche Aussage zur Bildgebung bei vermuteter renaler FMD trifft den internationalen Konsens?',
    options: ['CTA ist initial bevorzugt; kontrastverstärkte MRA ist eine Alternative bei CTA-Kontraindikation.', 'DSA ist immer die erste Untersuchung, auch ohne geplante Intervention.', 'Die Stärke des Perlschnurmusters zeigt zuverlässig den hämodynamischen Schweregrad.'],
    explanation: 'Der Konsens nennt CTA als initiale Untersuchung; MRA ist bei CTA-Kontraindikation eine Alternative. DSA bleibt invasiv und wird selektiv erwogen. Morphologie allein bestimmt die hämodynamische Relevanz nicht sicher.',
    summary: ['FMD ist eine nicht-atherosklerotische Arteriopathie; multifokale Stenosen und Dilatationen bilden das Perlschnurmuster.', 'Renale FMD betrifft häufig mittlere/distale Segmente; ostiale Plaques sprechen eher für Atherosklerose.', 'CTA initial, MRA bei CTA-Kontraindikation; DSA selektiv. Bildmorphologie allein quantifiziert den Druckgradienten nicht.'],
  },
  en: {
    title: 'Fibromuscular dysplasia', subtitle: 'Renal FMD: vascular morphology, typical distribution, and limits of imaging.',
    intro: 'Fibromuscular dysplasia (FMD) is a non-atherosclerotic, non-inflammatory disease of medium-sized arteries. A characteristic vascular shape may suggest FMD, but morphology alone does not reliably show how haemodynamically significant a stenosis is.',
    definition: 'The arterial wall has abnormal cellular proliferation and distorted architecture. FMD may cause focal or multifocal lesions; aneurysms, dissections, and tortuosity may coexist.',
    patternTitle: 'Morphology: focal or multifocal', pattern: [
      ['Multifocal', 'Alternating stenoses and dilatations create the “string-of-beads” pattern. It commonly involves the middle or distal renal artery.'],
      ['Focal', 'A short or longer tubular stenosis may occur in different arterial segments. Absence of a beaded pattern does not exclude FMD.'],
      ['Important limit', 'Aneurysm, dissection, or tortuosity alone is insufficient to diagnose FMD under international consensus; a focal or multifocal lesion is required.'],
    ],
    diagramTitle: 'Schematic vascular morphology', diagramCaption: 'Original teaching schematic: alternating narrowings and dilatations. Not a patient image and not a stand-alone diagnostic criterion.',
    locationTitle: 'Distribution and clinical context', locations: [
      ['Renal arteries', 'Commonly involved; multifocal disease often affects the middle and distal segments, whereas ostial plaque is more suggestive of atherosclerotic disease.'],
      ['Other vascular beds', 'The carotid and vertebral arteries are also commonly affected. Visceral arteries may be involved; the PDF describes these as less common.'],
      ['Clinical clues', 'Renovascular hypertension may prompt evaluation. Headache, pulsatile tinnitus, TIA, or stroke can be clues to cervical involvement, but are not specific.'],
    ],
    imagingTitle: 'Imaging: interpret CTA/MRA first', imaging: [
      ['CTA', 'International consensus identifies CTA as the initial test of choice for suspected renal FMD; spatial resolution helps depict lesion morphology and calcification.'],
      ['MRA', 'Contrast-enhanced MRA is an alternative when CTA is contraindicated. Diagnostic performance depends on technique and vessel size.'],
      ['Catheter angiography', 'DSA is invasive. It may be considered when non-invasive imaging confirms FMD, or when suspicion remains high despite negative CTA/MRA and the result is expected to affect management.'],
      ['Haemodynamics', 'CTA/MRA morphology alone does not reliably determine the haemodynamic significance of a renal stenosis. An interventional decision requires specialist clinical context.'],
    ],
    caution: 'The PDF lists DSA and CTA under “method of choice.” The 2019 international consensus clarifies the sequence: CTA initially, contrast-enhanced MRA if CTA is contraindicated, and selective DSA only when results may affect care. This is an imaging summary, not a management recommendation.',
    source: 'Source scope: Abdomen.pdf p. 92, visually inspected. p. 55 contains only a chapter heading and placeholder, with no additional FMD evidence. Primary source: Gornik et al., First International Consensus on FMD, Vascular Medicine 2019, DOI 10.1177/1358863X18821816.',
    goals: ['Distinguish focal from multifocal FMD morphology.', 'Relate the typical renal artery location to other vascular beds.', 'Distinguish CTA/MRA from selective DSA and separate morphology from haemodynamic significance.'],
    checkQ: 'Which imaging statement for suspected renal FMD matches international consensus?',
    options: ['CTA is preferred initially; contrast-enhanced MRA is an alternative when CTA is contraindicated.', 'DSA is always the first test, even when no intervention is planned.', 'The degree of beading reliably shows haemodynamic severity.'],
    explanation: 'Consensus identifies CTA as the initial test; MRA is an alternative when CTA is contraindicated. DSA is invasive and considered selectively. Morphology alone does not reliably establish haemodynamic significance.',
    summary: ['FMD is a non-atherosclerotic arteriopathy; multifocal stenoses and dilatations create the string-of-beads pattern.', 'Renal FMD often affects middle/distal segments; ostial plaque is more suggestive of atherosclerosis.', 'CTA initially, MRA if CTA is contraindicated, and selective DSA. Morphology alone does not quantify a pressure gradient.'],
  },
  fa: {
    title: 'دیسپلازی فیبروماسکولار', subtitle: 'FMD کلیوی: مورفولوژی عروقی، محل‌های شایع و محدودیت‌های تصویربرداری.',
    intro: 'دیسپلازی فیبروماسکولار (FMD) بیماری غیرآترواسکلروتیک و غیرالتهابی عروق متوسط است. شکل شاخص عروق می‌تواند FMD را مطرح کند، اما مورفولوژی به‌تنهایی نشان نمی‌دهد تنگی از نظر همودینامیک چقدر اهمیت دارد.',
    definition: 'در دیواره شریان، تکثیر غیرطبیعی سلولی و معماری مختل‌شده دیده می‌شود. FMD می‌تواند ضایعات کانونی یا چندکانونی ایجاد کند؛ آنوریسم، دیسکشن و پیچ‌خوردگی عروق نیز ممکن است همراه باشند.',
    patternTitle: 'مورفولوژی: کانونی یا چندکانونی', pattern: [
      ['چندکانونی', 'تنگی‌ها و اتساع‌های متناوب نمای «رشته مروارید» ایجاد می‌کنند. این الگو اغلب بخش میانی یا دیستال شریان کلیوی را درگیر می‌کند.'],
      ['کانونی', 'تنگی کوتاه یا طولانی لوله‌ای می‌تواند در بخش‌های مختلف شریان دیده شود. نبود نمای رشته مروارید، FMD را رد نمی‌کند.'],
      ['محدودیت مهم', 'بر اساس اجماع بین‌المللی، آنوریسم، دیسکشن یا پیچ‌خوردگی به‌تنهایی برای تشخیص FMD کافی نیست؛ وجود ضایعه کانونی یا چندکانونی لازم است.'],
    ],
    diagramTitle: 'نمای شماتیک مورفولوژی عروق', diagramCaption: 'شماتیک آموزشی اصیل: تنگی و اتساع متناوب. تصویر بیمار نیست و به‌تنهایی معیار تشخیصی محسوب نمی‌شود.',
    locationTitle: 'توزیع و زمینه بالینی', locations: [
      ['شریان‌های کلیوی', 'از محل‌های شایع درگیری هستند؛ نوع چندکانونی اغلب بخش میانی و دیستال را درگیر می‌کند، در حالی که پلاک دهانه‌ای بیشتر بیماری آترواسکلروتیک را مطرح می‌کند.'],
      ['بسترهای عروقی دیگر', 'شریان‌های کاروتید و مهره‌ای نیز شایعاً درگیر می‌شوند. عروق احشایی هم ممکن است درگیر شوند؛ PDF آن‌ها را نادرتر توصیف می‌کند.'],
      ['سرنخ‌های بالینی', 'پرفشاری خون رنوواسکولار می‌تواند بررسی را مطرح کند. سردرد، وزوز هم‌زمان با نبض، TIA یا سکته ممکن است سرنخ درگیری گردنی باشند، اما اختصاصی نیستند.'],
    ],
    imagingTitle: 'تصویربرداری: ابتدا CTA/MRA را در نظر بگیرید', imaging: [
      ['CTA', 'اجماع بین‌المللی CTA را بررسی اولیه انتخابی برای شک به FMD کلیوی می‌داند؛ تفکیک فضایی به نمایش مورفولوژی ضایعه و کلسیفیکاسیون کمک می‌کند.'],
      ['MRA', 'اگر CTA منع مصرف داشته باشد، MRA با کنتراست جایگزین است. ارزش تشخیصی به تکنیک و اندازه عروق وابسته است.'],
      ['آنژیوگرافی کاتتری', 'DSA تهاجمی است. اگر تصویربرداری غیرتهاجمی FMD را تأیید کند، یا با وجود CTA/MRA منفی شک بالا باقی بماند و نتیجه احتمالاً بر مدیریت اثر بگذارد، می‌توان آن را در نظر گرفت.'],
      ['همودینامیک', 'مورفولوژی CTA/MRA به‌تنهایی اهمیت همودینامیک تنگی کلیوی را با اطمینان تعیین نمی‌کند. تصمیم مداخله‌ای به زمینه بالینی و ارزیابی تخصصی نیاز دارد.'],
    ],
    caution: 'PDF، DSA و CTA را زیر عنوان «روش انتخابی» آورده است. اجماع بین‌المللی ۲۰۱۹ ترتیب را دقیق‌تر می‌کند: ابتدا CTA؛ در صورت منع CTA، MRA با کنتراست؛ و DSA به‌صورت انتخابی، فقط وقتی نتیجه می‌تواند بر مراقبت اثر بگذارد. این خلاصه تصویربرداری است، نه توصیه درمانی.',
    source: 'دامنه منبع: Abdomen.pdf صفحه ۹۲ به‌صورت دیداری بررسی شد. صفحه ۵۵ فقط عنوان فصل و متن جایگزین دارد و شاهد محتوایی دیگری برای FMD نیست. منبع اولیه: Gornik و همکاران، اجماع بین‌المللی FMD، Vascular Medicine، ۲۰۱۹، DOI: 10.1177/1358863X18821816.',
    goals: ['مورفولوژی کانونی و چندکانونی FMD را از هم تشخیص دهید.', 'محل معمول در شریان کلیوی را در کنار احتمال درگیری بسترهای دیگر تفسیر کنید.', 'CTA/MRA را از DSA انتخابی تفکیک و مورفولوژی را از اهمیت همودینامیک جدا کنید.'],
    checkQ: 'کدام گزاره درباره تصویربرداری در شک به FMD کلیوی با اجماع بین‌المللی سازگار است؟',
    options: ['CTA در ابتدا ترجیح دارد؛ اگر CTA منع مصرف داشته باشد، MRA با کنتراست جایگزین است.', 'DSA همیشه بررسی اول است، حتی اگر مداخله‌ای برنامه‌ریزی نشده باشد.', 'شدت نمای رشته مروارید، شدت همودینامیک را با اطمینان نشان می‌دهد.'],
    explanation: 'اجماع، CTA را بررسی اولیه می‌داند؛ MRA در صورت منع CTA جایگزین است. DSA تهاجمی است و انتخابی انجام می‌شود. مورفولوژی به‌تنهایی اهمیت همودینامیک را با اطمینان مشخص نمی‌کند.',
    summary: ['FMD آرتریوپاتی غیرآترواسکلروتیک است؛ تنگی‌ها و اتساع‌های چندکانونی نمای رشته مروارید می‌سازند.', 'FMD کلیوی اغلب بخش میانی و دیستال را درگیر می‌کند؛ پلاک دهانه‌ای بیشتر به نفع آترواسکلروز است.', 'ابتدا CTA، در صورت منع CTA، MRA و DSA انتخابی. مورفولوژی به‌تنهایی گرادیان فشار را مشخص نمی‌کند.'],
  },
}

function FmdSchematic({ lang }) {
  const labels = lang === 'fa'
    ? { title: 'شریان کلیوی', multifocal: 'چندکانونی: تنگی و اتساع متناوب', focal: 'کانونی: تنگی موضعی', accessible: 'نمای شماتیک FMD کانونی و چندکانونی' }
    : lang === 'de'
      ? { title: 'Nierenarterie', multifocal: 'multifokal: wechselnde Stenosen und Dilatationen', focal: 'fokal: umschriebene Stenose', accessible: 'Schematische Darstellung fokaler und multifokaler FMD' }
      : { title: 'renal artery', multifocal: 'multifocal: alternating stenoses and dilatations', focal: 'focal: short stenosis', accessible: 'Schematic focal and multifocal FMD patterns' }
  return <figure className={styles.figure}>
    <svg viewBox="0 0 760 260" role="img" aria-labelledby="fmd-svg-title" className={styles.svg}>
      <title id="fmd-svg-title">{labels.accessible}</title>
      <text x="380" y="28" textAnchor="middle" className={styles.label}>{labels.title}</text>
      <path d="M90 98 C240 98 330 98 670 98" fill="none" stroke="#38536b" strokeWidth="26" strokeLinecap="round"/>
      <path d="M90 98 C160 98 172 70 205 70 C238 70 245 126 280 126 C315 126 322 70 357 70 C392 70 399 126 434 126 C469 126 477 98 520 98" fill="none" stroke="#56b7b1" strokeWidth="16" strokeLinecap="round"/>
      <line x1="530" y1="98" x2="670" y2="98" stroke="#38536b" strokeWidth="26" strokeLinecap="round"/>
      <path d="M90 190H318" stroke="#38536b" strokeWidth="26" strokeLinecap="round"/>
      <path d="M318 190 C335 190 337 173 351 173 H395 C410 173 412 190 430 190" fill="none" stroke="#d97706" strokeWidth="17" strokeLinecap="round"/>
      <path d="M430 190H670" stroke="#38536b" strokeWidth="26" strokeLinecap="round"/>
      <text x="380" y="151" textAnchor="middle" className={styles.caption}>{labels.multifocal}</text>
      <text x="380" y="237" textAnchor="middle" className={styles.caption}>{labels.focal}</text>
    </svg>
    <figcaption>{(C[lang] || C.de).diagramCaption}</figcaption>
  </figure>
}

export default function FmdPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const L = ({ title, text }) => <article className={styles.card} key={title}><h3>{title}</h3><p>{text}</p></article>
  const check = { question: { de: C.de.checkQ, en: C.en.checkQ, fa: C.fa.checkQ }, options: C.de.options.map((_, i) => ({ de: C.de.options[i], en: C.en.options[i], fa: C.fa.options[i] })), answer: 0, explanation: { de: C.de.explanation, en: C.en.explanation, fa: C.fa.explanation }, diagramCaption: { de: C.de.diagramCaption, en: C.en.diagramCaption, fa: C.fa.diagramCaption } }
  const goals = C.de.goals.map((_, i) => ({ de: C.de.goals[i], en: C.en.goals[i], fa: C.fa.goals[i] }))
  const summary = C.de.summary.map((_, i) => ({ de: C.de.summary[i], en: C.en.summary[i], fa: C.fa.summary[i] }))
  const shellCopy = {
    contentTitle: { de: 'Von der Gefäßform zur Bildgebung', en: 'From vascular pattern to imaging choice', fa: 'از الگوی عروقی تا انتخاب تصویربرداری' },
    labels: {
      de: { selfCheck: 'Welche Methode beantwortet welche Frage?', summary: 'Drei Regeln zur Einordnung' },
      en: { selfCheck: 'Which test answers which question?', summary: 'Three interpretation rules' },
      fa: { selfCheck: 'کدام روش به کدام پرسش پاسخ می‌دهد؟', summary: 'سه قاعده برای تفسیر' },
    },
  }
  return <LessonReferenceShell lessonId="abdomen-fmd" lang={lang} title={{ de: C.de.title, en: C.en.title, fa: C.fa.title }} diagram="fmd" goals={goals} check={check} summary={summary} lessonCopy={shellCopy}
    quizHref="/ueben/quiz?fach=abdomen&n=3&themen=fibromuskulaere-dysplasie"
    flashcardsHref="/flashcards/fibromuskulaere-dysplasie">
    <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <p className={styles.lead}>{c.intro}</p>
      <section className={styles.section}><h2>{lang === 'fa' ? 'تعریف' : lang === 'de' ? 'Definition' : 'Definition'}</h2><p>{c.definition}</p></section>
      <section className={styles.section}><h2>{c.patternTitle}</h2><div className={styles.grid}>{c.pattern.map(([title, text]) => <L title={title} text={text} key={title}/>)}</div><h3>{c.diagramTitle}</h3><FmdSchematic lang={lang}/></section>
      <section className={styles.section}><h2>{c.locationTitle}</h2><div className={styles.grid}>{c.locations.map(([title, text]) => <L title={title} text={text} key={title}/>)}</div></section>
      <section className={styles.section}><h2>{c.imagingTitle}</h2>
        <figure className={styles.caseFigure}>
          <img src="/abdomen/fmd/renal-cta-source.png" width="476" height="540" loading="lazy"
            alt={lang === 'fa' ? 'برش CTA کلیه و آئورت از PDF آموزشی، نمونهٔ تصویری بدون تعیین شدت همودینامیک.' : lang === 'de' ? 'Nieren- und Aorten-CTA aus dem Lehr-PDF; das Bild allein bestimmt keine hämodynamische Relevanz.' : 'Renal and aortic CTA crop from the teaching PDF; the image alone does not establish haemodynamic significance.'}/>
          <figcaption>{lang === 'fa' ? 'نمونهٔ CTA کلیوی از Abdomen.pdf، صفحهٔ PDF ۹۲ (صفحهٔ چاپی ۹۱؛ rID: 31157 همان‌طور که در صفحه آمده است). برش برای یافتن شریان‌های کلیوی و الگوی عروقی است؛ شدت همودینامیک را به‌تنهایی نشان نمی‌دهد.' : lang === 'de' ? 'Renales CTA-Beispiel aus Abdomen.pdf, PDF-Seite 92 (Druckseite 91; rID 31157 wie auf der Seite angegeben). Nutzen Sie den Ausschnitt zur Orientierung an den Nierenarterien; die hämodynamische Bedeutung lässt sich daraus allein nicht ableiten.' : 'Renal CTA example from Abdomen.pdf, PDF p. 92 (printed p. 91; rID 31157 as printed on the page). Use the crop to orient to the renal arteries; haemodynamic significance cannot be determined from it alone.'}</figcaption>
        </figure>
        <div className={styles.grid}>{c.imaging.map(([title, text]) => <L title={title} text={text} key={title}/>)}</div><aside className={styles.caution}><strong>{lang === 'fa' ? 'محدودیت و اختلاف منبع' : lang === 'de' ? 'Quellenabgleich' : 'Source reconciliation'}</strong><p>{c.caution}</p></aside><p className={styles.source}>{c.source}</p><p><a href="https://doi.org/10.1177/1358863X18821816" target="_blank" rel="noreferrer">{lang === 'fa' ? 'اجماع بین‌المللی FMD، ۲۰۱۹ ↗' : 'First International Consensus on FMD, 2019 ↗'}</a></p></section>
    </main>
  </LessonReferenceShell>
}
