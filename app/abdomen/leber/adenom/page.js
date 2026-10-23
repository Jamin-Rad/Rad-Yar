'use client'

import LessonReferenceShell from '@/components/LessonReferenceShell'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const C = {
  de: {
    title: 'Hepatozelluläres Adenom', contentTitle: 'Bildmuster verstehen und sicher einordnen',
    goals: ['CT- und MRT-Merkmale eines hepatozellulären Adenoms im Gesamtmuster erkennen.', 'Chemical-shift- und hepatobiliäre Phase für die Differenzialdiagnose nutzen, ohne sie als Einzelbeweis zu behandeln.', 'Die Bildgebung mit der aktuellen klinischen Einordnung verbinden und ältere PDF-Empfehlungen nicht ungeprüft übernehmen.'],
    summary: ['Arterielle Hyperanreicherung mit späterer Angleichung ist ein typisches, aber nicht allein beweisendes Muster.', 'T1-Out-of-phase-Signalabfall kann intrazelluläres Fett anzeigen; T2-Signal und Enhancement variieren.', 'Adenome sind in der hepatobiliären Phase meist hypointens; Subtypen und Überschneidungen mit FNH beachten.', 'Größe, Geschlecht, Wachstum, Subtyp und Schwangerschaft verändern die klinische Einordnung; aktuelle Leitlinie heranziehen.'],
    introTitle: 'Klinische Einordnung', intro: 'Das hepatozelluläre Adenom (HCA) ist ein seltener gutartiger epithelialer Lebertumor. Es tritt häufiger bei Frauen im gebärfähigen Alter auf. Exogene Hormone wie orale Kontrazeptiva und anabole Steroide sowie Adipositas, metabolisches Syndrom und Glykogenspeicherkrankheiten sind relevante Risikofaktoren. Trotz benignen Grundcharakters sind Blutung und – bei bestimmten biologischen Merkmalen – maligne Transformation wichtige Komplikationen.',
    riskTitle: 'Worauf es für die Einordnung ankommt', risk: ['Hormonexposition und metabolische Risikofaktoren aktiv erfragen.', 'Das PDF beschreibt einen Zusammenhang von Dauer und Dosis der Hormonexposition mit dem Risiko, nennt dafür aber keine quantitative Schätzung.', 'Die Läsion nicht allein anhand eines einzelnen Signals oder einer Kontrastphase benennen.', 'Bildgebung kann Subtypen nahelegen, aber nicht jede β-Catenin-aktivierte Läsion sicher von HCC abgrenzen.'],
    ctTitle: 'CT: dynamisches Muster', ctHeaders: ['Phase', 'Typischer Befund', 'Einordnung'], ctRows: [
      ['Nativ', 'Iso- bis hypodens zum Leberparenchym; bei Fettanteilen teils hypodens.', 'Unspezifisch; mit den Kontrastphasen vergleichen.'],
      ['Arteriell', 'Kräftige, manchmal heterogene Hyperanreicherung.', 'Kann die Läsion sichtbar machen; nicht spezifisch für HCA.'],
      ['Portalvenös / Gleichgewicht', 'Häufig Angleichung an das Leberparenchym.', 'Im PDF meist kein klassisches HCC-Wash-out beschrieben; Einzelmuster nicht als Ausschlussregel verwenden.'],
    ],
    mriTitle: 'MRT: Fett, dynamische Phasen und hepatobiliäre Phase', mriText: 'Die multiphasische MRT ist für die Charakterisierung besonders hilfreich. Natives T1 kann durch Fett oder Glykogen hyperintens sein; ein Signalabfall in der Out-of-phase-Aufnahme spricht für intrazelluläres Fett. T2 ist meist leicht hyperintens. Diese Merkmale variieren zwischen Läsionen und Subtypen.',
    figureAlt: 'Sechs MRT-Aufnahmen des Leberadenoms aus Abdomen.pdf, Seite 17: T2, T1 In-phase, T1 Out-of-phase sowie arterielle, portalvenöse und verzögerte T1-Aufnahme nach Kontrastmittel.', figureCaption: 'Abdomen.pdf, physische PDF-Seite 17 (Druckseite 16). Die sechs Bilder sind in der Reihenfolge und mit den Sequenz-/Phasenlabels der Quelle übernommen. Die hepatobiliäre Phase ist auf dieser Bildtafel nicht enthalten.',
    mriHeaders: ['Sequenz / Phase', 'Befundhinweis', 'Grenze'], mriRows: [
      ['T1 In-/Out-of-phase', 'T1 kann durch Fett oder Glykogen hyperintens sein; Signalabfall Out-of-phase kann intrazelluläres Fett anzeigen.', 'Kein alleiniger Beweis für ein Adenom oder einen Subtyp.'],
      ['T2', 'Meist leicht hyperintens.', 'Variabel und nicht spezifisch.'],
      ['T1 nach Kontrastmittel: arteriell', 'Kräftige, teils heterogene Anreicherung.', 'Kann anderen hypervaskulären Läsionen ähneln.'],
      ['Portalvenös / verzögert', 'Häufig anhaltende Anreicherung mit Angleichung; kein typisches HCC-Wash-out im dargestellten PDF-Muster.', 'Subtyp, Kontrastmittel und Verlauf berücksichtigen.'],
      ['Hepatobiliäre Phase', 'Adenome sind meist hypointens; FNH ist meist iso- bis hyperintens.', 'Ausnahmen und Subtyp-Überschneidungen bestehen; Gesamtbild beurteilen.'],
    ],
    ddTitle: 'Differenzialdiagnose: HCA oder FNH?', dd: 'Die hepatobiliäre Phase hilft besonders: FNH nimmt gadoxetat-/hepatobiliär-spezifisches Kontrastmittel meist auf und bleibt iso- bis hyperintens; die meisten Adenome bleiben hypointens. Das Muster ist nicht absolut. Manche Adenom-Subtypen können atypisch aufnehmen, und β-Catenin-aktivierte Adenome können bildmorphologisch mit HCC überlappen. Bei untypischem oder malignitätsverdächtigem Befund ist die Bildgebung nicht immer abschließend; die weitere Einordnung gehört in den klinischen und multidisziplinären Kontext.',
    clinicalTitle: 'Klinische Faktoren verändern die Konsequenz', clinical: 'Die ältere Managementgrafik im PDF wird nicht als aktuelle Empfehlung übernommen. Die ACG-Leitlinie 2024 ordnet die Entscheidung nach Geschlecht, Größe, Wachstum, Risikoprofil und Schwangerschaft: Bei Frauen mit Läsionen <5 cm nennt sie Hormonabsetzen, Gewichtsreduktion falls angezeigt und kontrastverstärkte Kontrollen alle 6 Monate für 2 Jahre, danach jährlich. Bei Frauen mit Läsionen ≥5 cm zunächst Risikofaktoren anpassen und 6–12 Monate beobachten; bleibt die Läsion danach ≥5 cm, soll eine definitive Behandlung erfolgen. Bei Männern wird definitive Behandlung unabhängig von der Größe empfohlen. In der Schwangerschaft wird Ultraschall alle 6–12 Wochen als Überwachungsstrategie genannt. Das ist ein Lernüberblick und keine individuelle Therapieanweisung.',
    sourcesTitle: 'Quellen und Bildherkunft', source: 'Bildgebungsmerkmale: Abdomen.pdf, physische Seiten 16–18. Aktuelle diagnostische und klinische Einordnung: ACG Clinical Guideline: Focal Liver Lesions (2024).', guideline: 'ACG-Leitlinie 2024 öffnen', imageProvenance: 'Bild aus dem vom Nutzer bereitgestellten Abdomen.pdf, physische Seite 17. Beitragende/Autorenschaft im PDF nicht ausgewiesen; Wiederverwendung im RadYar durch den Nutzer ausdrücklich genehmigt.',
    check: { question: 'Welche Kombination passt am ehesten zu einem hepatozellulären Adenom?', options: ['Kräftige arterielle Anreicherung; in der hepatobiliären Phase meist hypointens, mit möglichen Subtyp-Ausnahmen.', 'Typische periphere noduläre Anreicherung mit zentripetaler Auffüllung.', 'Hepatobiliäre Phase immer hyperintens und damit beweisend für FNH.', 'Wash-out in einer Einzelphase beweist unabhängig vom Kontext HCC.'], answer: 0, explanation: 'HCA zeigt häufig arterielle Hyperanreicherung und ist meist hypointens in der hepatobiliären Phase. Beide Merkmale haben Ausnahmen und müssen im Gesamtmuster beurteilt werden.' },
  },
  en: {
    title: 'Hepatocellular adenoma', contentTitle: 'Read the imaging pattern in context',
    goals: ['Recognise CT and MRI features of hepatocellular adenoma as a combined pattern.', 'Use chemical-shift and hepatobiliary-phase imaging for the differential without treating either as proof on its own.', 'Connect imaging with current clinical context and avoid copying older PDF recommendations uncritically.'],
    summary: ['Arterial phase hyperenhancement with later equalisation is a common pattern, not proof by itself.', 'T1 out-of-phase signal loss may indicate intracellular fat; T2 signal and enhancement vary.', 'Adenomas are usually hypointense on the hepatobiliary phase; consider subtype variation and overlap with FNH.', 'Size, sex, growth, subtype and pregnancy affect clinical decisions; consult current guidance.'],
    introTitle: 'Clinical context', intro: 'Hepatocellular adenoma (HCA) is an uncommon benign epithelial liver tumour. It occurs more often in women of reproductive age. Exogenous hormones such as oral contraceptives and anabolic steroids, as well as obesity, metabolic syndrome and glycogen-storage disease, are relevant risk factors. Despite its benign baseline classification, haemorrhage and, for some biological subtypes, malignant transformation are important complications.',
    riskTitle: 'What matters for interpretation', risk: ['Ask about hormone exposure and metabolic risk factors.', 'The PDF describes risk as correlating with hormone-exposure duration and dose, but gives no quantitative estimate.', 'Do not label the lesion from one signal feature or one contrast phase alone.', 'Imaging may suggest subtypes, but cannot reliably separate every β-catenin-activated lesion from HCC.'],
    ctTitle: 'CT: dynamic pattern', ctHeaders: ['Phase', 'Typical finding', 'Interpretation'], ctRows: [
      ['Unenhanced', 'Iso- to hypoattenuating relative to liver; fat may make it hypoattenuating.', 'Nonspecific; compare with contrast phases.'],
      ['Arterial', 'Avid, sometimes heterogeneous hyperenhancement.', 'May reveal the lesion; not specific for HCA.'],
      ['Portal venous / equilibrium', 'Often becomes similar in attenuation to the liver.', 'The PDF describes no classic HCC wash-out in this pattern; do not use one pattern as a rule-out criterion.'],
    ],
    mriTitle: 'MRI: fat, dynamic phases and hepatobiliary phase', mriText: 'Multiphasic MRI is particularly useful for characterisation. Native T1 signal may be high because of fat or glycogen; signal loss on out-of-phase imaging supports intracellular fat. T2 is usually mildly hyperintense. These features vary among lesions and subtypes.',
    figureAlt: 'Six MRI images of a hepatic adenoma from Abdomen.pdf, page 17: T2, T1 in-phase, T1 out-of-phase, and arterial, portal venous and delayed post-contrast T1 images.', figureCaption: 'Abdomen.pdf, physical PDF page 17 (printed page 16). The six images retain the source order and sequence/phase labels. The hepatobiliary phase is not included in this figure.',
    mriHeaders: ['Sequence / phase', 'Imaging clue', 'Limit'], mriRows: [
      ['T1 in-/out-of-phase', 'Native T1 may be high from fat or glycogen; out-of-phase signal loss may indicate intracellular fat.', 'Not proof of HCA or of a specific subtype.'],
      ['T2', 'Usually mildly hyperintense.', 'Variable and nonspecific.'],
      ['Post-contrast T1: arterial', 'Avid, sometimes heterogeneous enhancement.', 'May overlap with other hypervascular lesions.'],
      ['Portal venous / delayed', 'Often persistent enhancement with equalisation; the illustrated PDF pattern has no classic HCC wash-out.', 'Consider subtype, contrast agent and interval change.'],
      ['Hepatobiliary phase', 'Adenomas are usually hypointense; FNH is usually iso- to hyperintense.', 'Exceptions and subtype overlap occur; assess the full pattern.'],
    ],
    ddTitle: 'Differential: HCA or FNH?', dd: 'The hepatobiliary phase is especially useful: FNH usually takes up hepatobiliary-specific contrast and remains iso- to hyperintense, while most adenomas remain hypointense. This is not absolute. Some adenoma subtypes may show atypical uptake, and β-catenin-activated adenomas may overlap with HCC on imaging. When findings are atypical or concerning for malignancy, imaging may not be definitive; further assessment belongs in the clinical and multidisciplinary context.',
    clinicalTitle: 'Clinical factors change management', clinical: 'The older management diagram in the PDF is not carried forward as current advice. The 2024 ACG guideline frames decisions by sex, size, growth, risk profile and pregnancy: for women with lesions <5 cm, it describes hormone cessation, weight reduction when appropriate and contrast-enhanced surveillance every 6 months for 2 years, then annually. For women with lesions ≥5 cm, risk-factor modification and 6–12 months of observation come first; definitive treatment should be pursued if size remains ≥5 cm. Definitive treatment is recommended for men regardless of lesion size. During pregnancy, ultrasound every 6–12 weeks is a suggested monitoring strategy. This is an educational overview, not individual treatment advice.',
    sourcesTitle: 'Sources and image provenance', source: 'Imaging features: Abdomen.pdf, physical pages 16–18. Current diagnostic and clinical context: ACG Clinical Guideline: Focal Liver Lesions (2024).', guideline: 'Open the 2024 ACG guideline', imageProvenance: 'Image from the user-supplied Abdomen.pdf, physical page 17. The PDF does not identify the contributor/author; the user explicitly authorised its reuse in RadYar.',
    check: { question: 'Which combination best fits hepatocellular adenoma?', options: ['Avid arterial enhancement; usually hypointense on the hepatobiliary phase, with subtype exceptions.', 'Discontinuous peripheral nodular enhancement with centripetal fill-in.', 'Always hyperintense on the hepatobiliary phase, proving FNH.', 'Wash-out in one phase proves HCC regardless of context.'], answer: 0, explanation: 'HCA commonly shows arterial hyperenhancement and is usually hypointense on the hepatobiliary phase. Both features have exceptions and must be assessed in the overall pattern.' },
  },
  fa: {
    title: 'آدنوم هپاتوسلولار', contentTitle: 'الگوی تصویربرداری را در زمینه تفسیر کنید',
    goals: ['یافته‌های CT و MRI آدنوم هپاتوسلولار را به‌صورت یک الگوی ترکیبی بشناسید.', 'از chemical-shift و فاز هپاتوبیلیاری برای افتراق کمک بگیرید، اما هیچ‌کدام را به‌تنهایی اثبات‌کننده ندانید.', 'تصویربرداری را با زمینه بالینی و راهنمای جاری پیوند دهید و توصیه‌های قدیمی PDF را بدون بررسی کپی نکنید.'],
    summary: ['تقویت شریانی واضح همراه با هم‌سطح‌شدن بعدی الگویی شایع است، نه اثبات تشخیص.', 'افت سیگنال T1 در out-of-phase می‌تواند نشان‌دهنده چربی داخل‌سلولی باشد؛ سیگنال T2 و تقویت متغیرند.', 'آدنوم‌ها معمولاً در فاز هپاتوبیلیاری کم‌سیگنال‌اند؛ تفاوت زیرگروه‌ها و همپوشانی با FNH را در نظر بگیرید.', 'اندازه، جنس، رشد، زیرگروه و بارداری بر تصمیم بالینی اثر دارند؛ به راهنمای جاری رجوع کنید.'],
    introTitle: 'زمینه بالینی', intro: 'آدنوم هپاتوسلولار (HCA) تومور اپی‌تلیالی خوش‌خیم و نادری در کبد است و در زنان سن باروری شایع‌تر است. هورمون‌های خارجی مانند قرص‌های ضدبارداری و استروئیدهای آنابولیک، و نیز چاقی، سندرم متابولیک و بیماری ذخیره گلیکوژن از عوامل خطر مهم‌اند. با وجود ماهیت پایه خوش‌خیم، خون‌ریزی و در برخی زیرگروه‌های زیستی، تبدیل بدخیم از عوارض مهم هستند.',
    riskTitle: 'در تفسیر به چه نکته‌هایی توجه کنیم؟', risk: ['درباره مصرف هورمون و عوامل خطر متابولیک پرس‌وجو کنید.', 'PDF ارتباط مدت و دوز مواجههٔ هورمونی را با خطر ذکر می‌کند، اما برآورد کمّی ارائه نمی‌دهد.', 'ضایعه را فقط بر اساس یک ویژگی سیگنال یا یک فاز تزریق نام‌گذاری نکنید.', 'تصویربرداری ممکن است زیرگروه را مطرح کند، اما هر ضایعه فعال‌شده با β-catenin را با اطمینان از HCC جدا نمی‌کند.'],
    ctTitle: 'CT: الگوی دینامیک', ctHeaders: ['فاز', 'یافته معمول', 'تفسیر'], ctRows: [
      ['بدون تزریق', 'نسبت به کبد ایزو تا کم‌دانسیته؛ وجود چربی ممکن است دانسیته را کاهش دهد.', 'غیراختصاصی؛ با فازهای تزریق مقایسه شود.'],
      ['شریانی', 'تقویت واضح و گاهی ناهمگون.', 'ممکن است ضایعه را آشکار کند؛ اختصاصی HCA نیست.'],
      ['پورت / تعادل', 'اغلب دانسیته به پارانشیم کبد نزدیک می‌شود.', 'در الگوی توصیف‌شده PDF، wash-out کلاسیک HCC دیده نمی‌شود؛ یک الگو را معیار رد قرار ندهید.'],
    ],
    mriTitle: 'MRI: چربی، فازهای دینامیک و فاز هپاتوبیلیاری', mriText: 'MRI چندفازی برای مشخصه‌یابی بسیار کمک‌کننده است. سیگنال T1 ناتیو ممکن است به‌علت چربی یا گلیکوژن بالا باشد؛ افت سیگنال در out-of-phase از وجود چربی داخل‌سلولی حمایت می‌کند. T2 معمولاً کمی پرسیگنال است. این ویژگی‌ها بین ضایعات و زیرگروه‌ها تفاوت دارند.',
    figureAlt: 'شش تصویر MRI آدنوم کبدی از Abdomen.pdf صفحه ۱۷: T2، T1 in-phase، T1 out-of-phase و تصاویر T1 پس از تزریق در فاز شریانی، پورت و تأخیری.', figureCaption: 'Abdomen.pdf، صفحهٔ فیزیکی ۱۷ (صفحهٔ چاپی ۱۶). ترتیب و برچسب توالی/فاز شش تصویر مطابق منبع حفظ شده است. فاز هپاتوبیلیاری در این تصویر وجود ندارد.',
    mriHeaders: ['توالی / فاز', 'نکته تصویری', 'محدودیت'], mriRows: [
      ['T1 in-/out-of-phase', 'T1 ناتیو ممکن است به‌علت چربی یا گلیکوژن بالا باشد؛ افت out-of-phase می‌تواند نشان‌دهنده چربی داخل‌سلولی باشد.', 'به‌تنهایی HCA یا زیرگروه مشخصی را ثابت نمی‌کند.'],
      ['T2', 'معمولاً کمی پرسیگنال است.', 'متغیر و غیراختصاصی است.'],
      ['T1 پس از تزریق: شریانی', 'تقویت واضح و گاهی ناهمگون.', 'ممکن است با ضایعات پرعروق دیگر همپوشانی داشته باشد.'],
      ['پورت / تأخیری', 'اغلب تقویت پایدار با هم‌سطح‌شدن؛ الگوی نمایشی PDF فاقد wash-out کلاسیک HCC است.', 'زیرگروه، نوع ماده حاجب و تغییرات زمانی را در نظر بگیرید.'],
      ['فاز هپاتوبیلیاری', 'آدنوم‌ها معمولاً کم‌سیگنال‌اند؛ FNH معمولاً ایزو تا پرسیگنال است.', 'استثنا و همپوشانی زیرگروهی وجود دارد؛ الگوی کامل را ارزیابی کنید.'],
    ],
    ddTitle: 'افتراق: HCA یا FNH؟', dd: 'فاز هپاتوبیلیاری به‌ویژه کمک‌کننده است: FNH معمولاً ماده حاجب اختصاصی هپاتوبیلیاری را جذب می‌کند و ایزو تا پرسیگنال می‌ماند؛ بیشتر آدنوم‌ها کم‌سیگنال می‌مانند. این قاعده مطلق نیست. برخی زیرگروه‌های آدنوم ممکن است جذب غیرمعمول داشته باشند و آدنوم‌های فعال‌شده با β-catenin در تصویربرداری با HCC همپوشانی کنند. اگر یافته‌ها آتیپیک یا مشکوک به بدخیمی باشند، تصویربرداری ممکن است قطعی نباشد؛ ارزیابی بیشتر باید در زمینه بالینی و تیم چندرشته‌ای انجام شود.',
    clinicalTitle: 'عوامل بالینی بر پیامد اثر می‌گذارند', clinical: 'نمودار مدیریت قدیمی PDF به‌عنوان توصیه جاری منتقل نشده است. راهنمای ACG سال ۲۰۲۴ تصمیم را بر اساس جنس، اندازه، رشد، عوامل خطر و بارداری تنظیم می‌کند: برای زنان با ضایعات کوچک‌تر از ۵ سانتی‌متر، قطع هورمون، کاهش وزن در صورت لزوم و پایش با تصویربرداری تزریقی هر ۶ ماه به‌مدت ۲ سال و سپس سالانه مطرح است. برای زنان با ضایعات ۵ سانتی‌متر یا بزرگ‌تر، ابتدا اصلاح عوامل خطر و ۶ تا ۱۲ ماه مشاهده مطرح می‌شود؛ اگر اندازه پس از آن همچنان حداقل ۵ سانتی‌متر باشد، درمان قطعی باید انجام شود. برای مردان، درمان قطعی مستقل از اندازه توصیه می‌شود. در بارداری، سونوگرافی هر ۶ تا ۱۲ هفته به‌عنوان راهبرد پایش مطرح است. این مرور آموزشی است، نه توصیه درمانی فردی.',
    sourcesTitle: 'منابع و منشأ تصویر', source: 'ویژگی‌های تصویری: Abdomen.pdf، صفحات فیزیکی ۱۶ تا ۱۸. چارچوب تشخیصی و بالینی جاری: راهنمای بالینی ACG درباره ضایعات کانونی کبد (۲۰۲۴).', guideline: 'بازکردن راهنمای ACG سال ۲۰۲۴', imageProvenance: 'تصویر از Abdomen.pdf ارائه‌شده توسط کاربر، صفحهٔ فیزیکی ۱۷. نام مشارکت‌کننده/نویسنده در PDF ذکر نشده است؛ کاربر استفاده مجدد از تصویر در رادیار را صریحاً مجاز دانسته است.',
    check: { question: 'کدام ترکیب بیشتر با آدنوم هپاتوسلولار سازگار است؟', options: ['تقویت شریانی واضح؛ معمولاً کم‌سیگنال در فاز هپاتوبیلیاری، با استثناهای زیرگروهی.', 'تقویت ندولی محیطی ناپیوسته با پرشدن مرکزگرا.', 'همیشه پرسیگنال بودن در فاز هپاتوبیلیاری که FNH را ثابت می‌کند.', 'wash-out در یک فاز بدون توجه به زمینه، HCC را ثابت می‌کند.'], answer: 0, explanation: 'HCA اغلب تقویت شریانی واضح دارد و معمولاً در فاز هپاتوبیلیاری کم‌سیگنال است. برای هر دو یافته استثنا وجود دارد و باید در الگوی کلی ارزیابی شوند.' },
  },
}

const rows = (headers, data) => <div className={styles.tableWrap}><table><thead><tr>{headers.map((item) => <th key={item}>{item}</th>)}</tr></thead><tbody>{data.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>

export default function HepaticAdenomaPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell
    lessonId="abdomen-hepatic-adenoma"
    lang={lang}
    title={c.title}
    diagram="liver"
    goals={c.goals}
    copy={{ contentTitle: c.contentTitle, diagramCaption: { de: 'Lagebeziehung der Leber; Schema, keine Patientendarstellung.', en: 'Liver location; schematic, not patient imaging.', fa: 'نمای شماتیک موقعیت کبد؛ تصویر بیمار نیست.' } }}
    summary={c.summary}
    quizHref="/ueben/quiz?fach=abdomen&n=4&themen=leberadenom"
    flashcardsHref="/flashcards/leberadenom"
    check={{ question: c.check.question, options: c.check.options, answer: c.check.answer, explanation: c.check.explanation, diagramCaption: { de: 'Schematische Lagebeziehung der Leber; keine Patientendarstellung.', en: 'Schematic liver location; not patient imaging.', fa: 'نمای شماتیک موقعیت کبد؛ تصویر بیمار نیست.' } }}
  >
    <main className={styles.page}>
      <section className={styles.section}>
        <h3>{c.introTitle}</h3><p>{c.intro}</p>
        <h3>{c.riskTitle}</h3><ul>{c.risk.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className={styles.section}><h3>{c.ctTitle}</h3>{rows(c.ctHeaders, c.ctRows)}</section>
      <section className={styles.section}>
        <h3>{c.mriTitle}</h3><p>{c.mriText}</p>
        <figure><img src="/educational/hepatic-adenoma/source-mri-p17.jpg" alt={c.figureAlt} width="1200" height="585" loading="lazy" /><figcaption>{c.figureCaption}</figcaption></figure>
        {rows(c.mriHeaders, c.mriRows)}
      </section>
      <section className={styles.section}><h3>{c.ddTitle}</h3><p>{c.dd}</p></section>
      <section className={styles.callout}><h3>{c.clinicalTitle}</h3><p>{c.clinical}</p><a href="https://doi.org/10.14309/ajg.0000000000002857" target="_blank" rel="noreferrer">{c.guideline}</a></section>
      <section className={styles.sources}><h3>{c.sourcesTitle}</h3><p>{c.source}</p><a href="https://doi.org/10.14309/ajg.0000000000002857" target="_blank" rel="noreferrer">{c.guideline}</a><p>{c.imageProvenance}</p></section>
    </main>
  </LessonReferenceShell>
}
