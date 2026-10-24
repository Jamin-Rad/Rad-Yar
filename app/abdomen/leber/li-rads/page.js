'use client'

import LessonReferenceShell from '@/components/LessonReferenceShell'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'
import { LIRADS_NEXT } from '@/data/abdomenHccPlanning'

const C = {
  de: {
    title: 'LI-RADS CT/MRT: erst Zielgruppe, dann Kategorie',
    goals: ['Prüfen, ob die diagnostische CT/MRT-LI-RADS-Zielgruppe erfüllt ist.', 'Major Features systematisch erfassen und die passende Tabelle anwenden.', 'LR-5 von LR-M und LR-TIV unterscheiden; Ancillary Features nicht überbewerten.'],
    intro: 'LI-RADS standardisiert die Befundung unbehandelter Leberbeobachtungen in einer definierten HCC-Risikogruppe. Die Kategorie ist kein allgemeines Leberläsionssystem: zuerst Zielgruppe und Untersuchungsqualität prüfen, dann die diagnostischen Schritte durchlaufen.',
    flowTitle: 'Der sichere Weg zur Kategorie', flowLabels: ['Zielgruppe & Untersuchung', 'Sonderkategorien zuerst', 'Major Features & Größe', 'Kategorie + Plausibilitätscheck'], flowCaption: 'Schematische Reihenfolge für die CT/MRT-Diagnostik; keine vollständige LI-RADS-Tabelle.',
    eligibleTitle: 'Für wen gilt diese CT/MRT-Diagnostik?', eligible: 'ACR v2018: Erwachsene mit Zirrhose, chronischer Hepatitis B oder aktuellem/früherem HCC. Nicht anwenden unter 18 Jahren, ohne diese Risikofaktoren, bei kongenitaler hepatischer Fibrose oder Zirrhose durch vaskuläre Erkrankungen. Erforderlich ist eine Mehrphasen-CT oder -MRT mit geeignetem Kontrastmittel. Pathologisch gesicherte Malignome und benigne Läsionen nicht-hepatozellulären Ursprungs (z. B. Hämangiome) erhalten keine LI-RADS-Kategorie; die Pathologiediagnose wird berichtet. Bei pathologisch gesicherten benignen hepatozellulären Läsionen (z. B. regenerativen oder dysplastischen Knoten) wird die LI-RADS-Kategorie zusätzlich zur Pathologiediagnose angegeben.',
    classifyTitle: 'Vor der Merkmaltabelle: drei Abzweigungen',
    categories: [
      ['LR-NC', 'Wegen fehlender oder degradierter Bildinformation nicht sinnvoll kategorisierbar.'],
      ['LR-TIV', 'Eindeutiger Tumor in einer Vene; mögliche Ursache angeben, wenn beurteilbar.'],
      ['LR-M', 'Wahrscheinlich oder sicher maligne, aber nicht HCC-spezifisch (z. B. targetoid).'],
      ['LR-1 / LR-2', 'Sicher bzw. wahrscheinlich benigne.'],
      ['LR-3 / LR-4 / LR-5', 'Mittlere Malignitätswahrscheinlichkeit / wahrscheinlich HCC / sicher HCC innerhalb der Zielgruppe.'],
    ],
    majorTitle: 'Welche Hauptmerkmale fließen ein?', majorFeatures: [
      ['Nicht-randständiges APHE', 'Arterielle Hyperanreicherung, die nicht nur randständig ist.'],
      ['Nicht-peripheres Wash-out', 'Relative Abnahme der Anreicherung in zulässiger späterer Phase.'],
      ['Enhancing capsule', 'Anreichernde kapselartige Begrenzung.'],
      ['Größe', 'Größenklasse der Beobachtung; an der Phase mit bester Begrenzbarkeit messen, möglichst nicht arteriell.'],
      ['Threshold growth', 'Durchmesserzunahme ≥50 % innerhalb von höchstens 6 Monaten (v2018-Definition).'],
    ],
    lr5Title: 'LR-5: die kompakte Entscheidungsregel', lr5: [
      'Für eine Beobachtung von 10–19 mm: nicht-randständiges APHE plus nicht-peripheres Wash-out reicht für LR-5. APHE plus Threshold Growth erreicht ebenfalls LR-5. Eine Kapsel allein statt Wash-out/Threshold Growth reicht in dieser Größenklasse nicht.',
      'Ab 20 mm: nicht-randständiges APHE plus mindestens ein weiteres Major Feature (Wash-out, Kapsel oder Threshold Growth) erfüllt LR-5.',
      'Ohne nicht-randständiges APHE oder unter 10 mm wird LR-5 nicht über die diagnostische Tabelle erreicht. Bei Unsicherheit ein Major Feature als nicht vorhanden werten.',
    ],
    cautionTitle: 'Ancillary Features sind keine Abkürzung', caution: 'Ancillary Features können die Kategorie nach ACR-Regeln höchstens bis LR-4 hochstufen; sie dürfen nicht zu LR-5 führen. Wenn Merkmale für Malignität und Benignität zugleich vorliegen, wird nicht angepasst. LR-5 bedeutet innerhalb der geeigneten Zielgruppe „sicher HCC“; das ist keine Aussage über Patienten außerhalb dieser Zielgruppe.',
    reportTitle: 'Was gehört in den Bericht?', report: 'Beobachtung einzeln lokalisieren und messen, relevante Major Features nennen und die Kategorie mit der verwendeten CT/MRT- und LI-RADS-Version angeben. Bei LR-M die wahrscheinliche Ätiologie nennen, falls möglich; bei LR-TIV betroffene Vene und wahrscheinlichen Ursprung beschreiben. Empfehlungen zu Verlauf, Biopsie oder Therapie hängen vom klinischen Kontext und multidisziplinärer Entscheidung ab.',
    source: 'Quellen: Abdomen.pdf, PDF-Seiten 20–23 (Druckseiten 19–22); ACR LI-RADS CT/MRI v2018 Core, Diagnostic Algorithm / Getting Started / Diagnostic Table / Ancillary Features. Die nächsten Schritte sind mit AASLD2023 ergänzt; die Therapieplanung ist separat verlinkt.',
    checkQ: 'Erwachsene Person mit Zirrhose, unbehandelte 15-mm-Beobachtung: nicht-randständiges APHE und nicht-peripheres Wash-out. Welche Kategorie ergibt sich nach CT/MRT LI-RADS v2018?',
    options: ['LR-5', 'LR-4, weil die Beobachtung nur 15 mm misst', 'LR-3, weil Beobachtungen unter 20 mm nicht LR-5 sein können'],
    why: 'In der 10–19-mm-Klasse erreicht nicht-randständiges APHE plus nicht-peripheres Wash-out LR-5. Das gilt nur, wenn Zielgruppe und technische Voraussetzungen erfüllt sind.',
    summary: ['Zielgruppe und Mehrphasenqualität zuerst prüfen.', 'LR-M und LR-TIV vor der HCC-Merkmaltabelle erkennen.', 'Major Features, Größe und Schwellenwachstum nach ACR v2018 kombinieren.', 'Ancillary Features können LR-5 nicht erzeugen.'],
  },
  en: {
    title: 'CT/MRI LI-RADS: population first, category next',
    goals: ['Check whether the diagnostic CT/MRI LI-RADS target population is met.', 'Record major features systematically and apply the appropriate table.', 'Distinguish LR-5 from LR-M and LR-TIV; do not overstate ancillary features.'],
    intro: 'LI-RADS standardises reporting of untreated liver observations in a defined HCC-risk population. It is not a general liver-lesion system: check the target population and examination quality first, then follow the diagnostic steps.',
    flowTitle: 'A safe route to the category', flowLabels: ['Population & examination', 'Special categories first', 'Major features & size', 'Category + plausibility check'], flowCaption: 'Schematic order for CT/MRI diagnosis; not the complete LI-RADS table.',
    eligibleTitle: 'Who is eligible for this CT/MRI diagnostic system?', eligible: 'ACR v2018: adults with cirrhosis, chronic hepatitis B, or current/prior HCC. Do not apply below age 18, without these risk factors, with congenital hepatic fibrosis, or with cirrhosis due to vascular disorders. A multiphase CT or MRI with an appropriate contrast agent is required. Do not assign a LI-RADS category to path-proven malignancies or benign lesions of non-hepatocellular origin (e.g., hemangiomas); report the pathology diagnosis. For path-proven benign hepatocellular lesions (e.g., regenerative or dysplastic nodules), report the LI-RADS category in addition to the pathology diagnosis.',
    classifyTitle: 'Before the feature table: three branches',
    categories: [
      ['LR-NC', 'Cannot be meaningfully categorised because images are omitted or degraded.'],
      ['LR-TIV', 'Definite tumour in vein; state the likely aetiology if assessable.'],
      ['LR-M', 'Probably or definitely malignant, but not HCC-specific (for example, targetoid).'],
      ['LR-1 / LR-2', 'Definitely / probably benign.'],
      ['LR-3 / LR-4 / LR-5', 'Intermediate malignancy probability / probably HCC / definitely HCC within the target population.'],
    ],
    majorTitle: 'Which major features are assessed?', majorFeatures: [
      ['Nonrim APHE', 'Arterial phase hyperenhancement that is not confined to the rim.'],
      ['Nonperipheral washout', 'Relative reduction in enhancement on an eligible later phase.'],
      ['Enhancing capsule', 'An enhancing capsule-like border.'],
      ['Size', 'Observation size class; measure in the phase where the margin is best defined, preferably not the arterial phase.'],
      ['Threshold growth', 'At least 50% diameter increase within 6 months (v2018 definition).'],
    ],
    lr5Title: 'LR-5: the concise decision rule', lr5: [
      'For a 10–19 mm observation: nonrim APHE plus nonperipheral washout is sufficient for LR-5. APHE plus threshold growth also reaches LR-5. In this size class, capsule alone instead of washout/threshold growth is insufficient.',
      'At 20 mm or larger: nonrim APHE plus at least one other major feature (washout, capsule, or threshold growth) meets LR-5.',
      'Without nonrim APHE or below 10 mm, the diagnostic table does not yield LR-5. If uncertain, treat a major feature as absent.',
    ],
    cautionTitle: 'Ancillary features are not a shortcut', caution: 'Under ACR rules, ancillary features may upgrade a category only as far as LR-4; they cannot produce LR-5. If features favouring malignancy and benignity are both present, do not adjust. LR-5 means “definitely HCC” within the eligible target population; it does not apply to patients outside that population.',
    reportTitle: 'What belongs in the report?', report: 'Localise and measure each observation, state relevant major features, and give the category together with the CT/MRI and LI-RADS version used. For LR-M, name the likely aetiology if possible; for LR-TIV, describe the involved vein and likely origin. Follow-up, biopsy, or treatment recommendations depend on clinical context and multidisciplinary discussion.',
    source: 'Sources: Abdomen.pdf, PDF pp.20–23 (printed pp.19–22); ACR LI-RADS CT/MRI v2018 Core, Diagnostic Algorithm / Getting Started / Diagnostic Table / Ancillary Features. Next-step guidance is supplemented by AASLD2023; treatment planning is linked separately.',
    checkQ: 'An adult with cirrhosis has an untreated 15-mm observation with nonrim APHE and nonperipheral washout. Which category follows CT/MRI LI-RADS v2018?',
    options: ['LR-5', 'LR-4, because the observation measures only 15 mm', 'LR-3, because observations below 20 mm cannot be LR-5'],
    why: 'In the 10–19 mm class, nonrim APHE plus nonperipheral washout meets LR-5. This applies only when the target population and technical requirements are met.',
    summary: ['Check the target population and multiphase quality first.', 'Recognise LR-M and LR-TIV before the HCC feature table.', 'Combine major features, size and threshold growth under ACR v2018.', 'Ancillary features cannot create LR-5.'],
  },
  fa: {
    title: 'LI-RADS در CT/MRI: ابتدا گروه هدف، سپس رده',
    goals: ['بررسی کنید که بیمار در گروه هدف LI-RADS تشخیصی CT/MRI قرار دارد.', 'ویژگی‌های اصلی را منظم ثبت و جدول درست را اعمال کنید.', 'LR-5 را از LR-M و LR-TIV تفکیک کنید و ویژگی‌های کمکی را بیش‌ازحد تفسیر نکنید.'],
    intro: 'LI-RADS گزارش ضایعات درمان‌نشده کبد را در گروه مشخصی از بیماران پرخطر HCC استاندارد می‌کند. این یک سیستم عمومی برای همه ضایعات کبدی نیست: ابتدا گروه هدف و کیفیت بررسی را بسنجید، سپس مراحل تشخیصی را اجرا کنید.',
    flowTitle: 'مسیر مطمئن برای رسیدن به رده', flowLabels: ['گروه هدف و بررسی', 'ابتدا رده‌های ویژه', 'ویژگی‌های اصلی و اندازه', 'رده و بازبینی منطقی بودن'], flowCaption: 'ترتیب شماتیک برای تشخیص CT/MRI؛ جدول کامل LI-RADS نیست.',
    eligibleTitle: 'این سیستم تشخیصی CT/MRI برای چه کسانی است؟', eligible: 'طبق ACR v2018، این سیستم برای بزرگسالان مبتلا به سیروز، هپاتیت B مزمن یا HCC فعلی/قبلی به‌کار می‌رود؛ در افراد زیر ۱۸ سال، بدون این عوامل خطر، در فیبروز مادرزادی کبد یا سیروز ناشی از اختلالات عروقی به‌کار نمی‌رود. CT یا MRI چندفازی با ماده حاجب مناسب لازم است. برای بدخیمیِ اثبات‌شده با پاتولوژی یا ضایعهٔ خوش‌خیم با منشأ غیرهپاتوسلولار (مثل همانژیوم)، ردهٔ LI-RADS تعیین نکنید و تشخیص پاتولوژی را گزارش کنید. برای ضایعهٔ خوش‌خیم هپاتوسلولارِ اثبات‌شده با پاتولوژی (مثل ندول بازسازی‌شونده یا دیسپلاستیک)، ردهٔ LI-RADS را علاوه بر تشخیص پاتولوژی گزارش کنید.',
    classifyTitle: 'پیش از جدول ویژگی‌ها: سه مسیر جداگانه',
    categories: [
      ['LR-NC', 'به‌علت حذف یا افت کیفیت تصاویر، رده‌بندی معنادار ممکن نیست.'],
      ['LR-TIV', 'وجود قطعی تومور در ورید؛ در صورت امکان منشأ محتمل را ذکر کنید.'],
      ['LR-M', 'احتمالاً یا قطعاً بدخیم، اما اختصاصی HCC نیست (برای نمونه الگوی targetoid).'],
      ['LR-1 / LR-2', 'قطعاً / احتمالاً خوش‌خیم.'],
      ['LR-3 / LR-4 / LR-5', 'احتمال متوسط بدخیمی / احتمالاً HCC / قطعاً HCC در گروه هدف.'],
    ],
    majorTitle: 'کدام ویژگی‌های اصلی بررسی می‌شوند؟', majorFeatures: [
      ['APHE غیرحاشیه‌ای', 'تقویت شریانی که فقط به حاشیه محدود نیست.'],
      ['Wash-out غیرمحیطی', 'کاهش نسبی تقویت در فاز تأخیری مجاز.'],
      ['کپسول دارای تقویت', 'حدّ شبه‌کپسولی که پس از تزریق تقویت می‌شود.'],
      ['اندازه', 'رده اندازه ضایعه؛ در فازی اندازه بگیرید که حدود بهتر مشخص است و ترجیحاً نه در فاز شریانی.'],
      ['رشد آستانه‌ای', 'افزایش قطر دست‌کم ۵۰٪ طی حداکثر ۶ ماه (تعریف v2018).'],
    ],
    lr5Title: 'LR-5: قاعده تصمیم‌گیری فشرده', lr5: [
      'برای ضایعه ۱۰ تا ۱۹ میلی‌متری: APHE غیرحاشیه‌ای به‌همراه wash-out غیرمحیطی برای LR-5 کافی است. APHE به‌همراه رشد آستانه‌ای نیز به LR-5 می‌رسد. در این اندازه، کپسول به‌تنهایی به‌جای wash-out/رشد آستانه‌ای کافی نیست.',
      'از ۲۰ میلی‌متر به بالا: APHE غیرحاشیه‌ای همراه دست‌کم یک ویژگی اصلی دیگر (wash-out، کپسول یا رشد آستانه‌ای) معیار LR-5 را برآورده می‌کند.',
      'بدون APHE غیرحاشیه‌ای یا در اندازه کمتر از ۱۰ میلی‌متر، جدول تشخیصی به LR-5 نمی‌رسد. اگر وجود ویژگی اصلی نامطمئن است، آن را غایب در نظر بگیرید.',
    ],
    cautionTitle: 'ویژگی‌های کمکی راه میان‌بُر نیستند', caution: 'طبق قواعد ACR، ویژگی کمکی می‌تواند رده را حداکثر تا LR-4 بالا ببرد و نمی‌تواند LR-5 ایجاد کند. اگر هم ویژگی به نفع بدخیمی و هم ویژگی به نفع خوش‌خیمی وجود دارد، رده را تغییر ندهید. LR-5 در گروه هدف واجد شرایط به معنای «قطعاً HCC» است؛ این رده برای افراد خارج از گروه هدف کاربرد ندارد.',
    reportTitle: 'چه مواردی در گزارش بیاید؟', report: 'هر ضایعه را مکان‌یابی و اندازه‌گیری کنید، ویژگی‌های اصلی مرتبط را بنویسید و رده را همراه نسخه CT/MRI و LI-RADS ذکر کنید. برای LR-M در صورت امکان منشأ محتمل را بنویسید؛ در LR-TIV ورید درگیر و منشأ احتمالی را توصیف کنید. توصیه پیگیری، نمونه‌برداری یا درمان به زمینه بالینی و تصمیم چندتخصصی وابسته است.',
    source: 'منابع: Abdomen.pdf، صفحات PDF ۲۰–۲۳ (صفحات چاپی ۱۹–۲۲)؛ ACR LI-RADS CT/MRI v2018 Core، الگوریتم تشخیصی / گروه هدف / جدول تشخیصی / ویژگی‌های کمکی. اقدام بعدی با AASLD2023 تکمیل شده است؛ برنامه‌ریزی درمان در پیوند جداگانه آمده است.',
    checkQ: 'در فرد بزرگسال مبتلا به سیروز، یک ضایعه درمان‌نشده ۱۵ میلی‌متری دارای APHE غیرحاشیه‌ای و wash-out غیرمحیطی است. طبق LI-RADS CT/MRI v2018 کدام رده مناسب است؟',
    options: ['LR-5', 'LR-4، چون اندازه ضایعه فقط ۱۵ میلی‌متر است', 'LR-3، چون ضایعات کوچک‌تر از ۲۰ میلی‌متر نمی‌توانند LR-5 باشند'],
    why: 'در رده اندازه ۱۰ تا ۱۹ میلی‌متر، APHE غیرحاشیه‌ای همراه wash-out غیرمحیطی معیار LR-5 است. این نتیجه فقط با برقرار بودن گروه هدف و شرایط فنی معتبر است.',
    summary: ['ابتدا گروه هدف و کیفیت چندفازی را بررسی کنید.', 'پیش از جدول ویژگی‌های HCC، LR-M و LR-TIV را تشخیص دهید.', 'ویژگی‌های اصلی، اندازه و رشد آستانه‌ای را طبق ACR v2018 ترکیب کنید.', 'ویژگی‌های کمکی نمی‌توانند LR-5 ایجاد کنند.'],
  },
}

function DecisionFlow({ c }) {
  return <ol className={styles.flow} aria-label={c.flowTitle}>{c.flowLabels.map((label, i) => <li key={label}><span>{i+1}</span>{label}</li>)}</ol>
}

export default function LiRadsPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const t = value => value[lang] || value.de
  const local = path => `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
  const from = encodeURIComponent(local('/abdomen/leber/li-rads'))
  const check = { question:c.checkQ, options:c.options, answer:0, explanation:c.why, diagramCaption:c.flowCaption }
  return <LessonReferenceShell lessonId="li-rads" lang={lang} title={c.title} quizHref={local(`/ueben/quiz?fach=abdomen&n=2&themen=li-rads&from=${from}`)} flashcardsHref={local(`/flashcards/li-rads?from=${from}`)} diagram="liver" goals={c.goals} check={check} summary={c.summary} copy={{ contentTitle:{ de:'Die diagnostische Kategorie sicher anwenden', en:'Applying the diagnostic category safely', fa:'کاربرد ایمن رده تشخیصی' } }}>
    <main className={styles.content}>
      <p className={styles.lead}>{c.intro}</p>
      <section className={styles.panel}><h2>{c.flowTitle}</h2><DecisionFlow c={c}/><p className={styles.caption}>{c.flowCaption}</p></section>
      <section className={styles.panel}><h2>{c.eligibleTitle}</h2><p>{c.eligible}</p></section>
      <section className={styles.panel}><h2>{c.classifyTitle}</h2><dl className={styles.categories}>{c.categories.map(([term, desc])=><div key={term}><dt>{term}</dt><dd>{desc}</dd></div>)}</dl></section>
      <section className={styles.panel}><h2>{c.majorTitle}</h2><dl className={styles.features}>{c.majorFeatures.map(([term, desc])=><div key={term}><dt>{term}</dt><dd>{desc}</dd></div>)}</dl></section>
      <section className={styles.decision}><h2>{c.lr5Title}</h2><ol>{c.lr5.map(point=><li key={point}>{point}</li>)}</ol></section>
      <aside className={styles.cave}><h2>{c.cautionTitle}</h2><p>{c.caution}</p></aside>
      <section className={styles.panel}><h2>{c.reportTitle}</h2><p>{c.report}</p></section>
      <section className={styles.panel}><h2>{t(LIRADS_NEXT.title)}</h2><dl className={styles.categories}>{LIRADS_NEXT.rows.map(([term, text]) => <div key={term}><dt>{term}</dt><dd>{t(text)}</dd></div>)}</dl><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/" target="_blank" rel="noopener noreferrer">AASLD2023 · 19–21</a><p><a href={`${local('/abdomen/leber/hcc')}#therapieplanung`}>{t({de:'Zur HCC-Therapieplanung',en:'HCC treatment planning',fa:'برنامه‌ریزی درمان HCC'})}</a></p></section>
      <small className={styles.source}>{c.source}</small>
    </main>
  </LessonReferenceShell>
}
