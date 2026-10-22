'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import { ADRENAL_LESSON_CHECK } from '@/data/abdomenAdrenalLessonMaterials'
import styles from './page.module.css'

const images = {
  adenoma: '/abdomen/nebenniere/source-pdf/adenoma-washout.jpg',
  myelolipomaNative: '/abdomen/nebenniere/source-pdf/myelolipoma-native.jpg',
  myelolipomaContrast: '/abdomen/nebenniere/source-pdf/myelolipoma-postcontrast.jpg',
  pheochromocytoma: '/abdomen/nebenniere/source-pdf/pheochromocytoma-four-phase.jpg',
  neuroblastoma: '/abdomen/nebenniere/source-pdf/neuroblastoma-mri-pair.jpg',
}

const C = {
  de: {
    title: 'Nebennierenraumforderungen',
    contentTitle: 'Vom Bildmuster zur Einordnung',
    goals: [
      'Zufallsbefund, Dichte, Fett und klinischen Kontext getrennt erfassen.',
      'Mikroskopisches Adenomfett von makroskopischem Fett im Myelolipom unterscheiden.',
      'Phäochromozytom und Neuroblastom anhand von Muster und Ursprung einordnen, ohne Einzelzeichen zu überdehnen.',
    ],
    summary: [
      '„Inzidentalom“ beschreibt den Entdeckungsweg, nicht die Gutartigkeit.',
      'Homogenität und native Dichte zuerst beurteilen; hormonelle Funktion ist damit nicht beantwortet.',
      'Adenom: intrazelluläres Fett mit Opposed-Phase-Signalabfall; Myelolipom: makroskopische Fettanteile mit Fettsuppression.',
      'Washout kann ein Phäochromozytom nicht sicher ausschließen; bei Kindern den Nebennierenursprung gegen den Nierenursprung abgrenzen.',
    ],
    incidentalomaTitle: 'Was bedeutet „Inzidentalom“?',
    incidentaloma: 'Eine Nebennierenraumforderung gilt als Inzidentalom, wenn sie zufällig und ohne gezielte klinische Fragestellung der Nebenniere entdeckt wurde. Der Begriff selbst sagt nichts über Histologie oder Hormonaktivität aus. Die im PDF gezeigte Größen- und Prozentgrafik mit Kontrollintervallen ist keine aktuelle Entscheidungsregel und wird hier nicht verwendet.',
    adenomaTitle: 'Adenom: mikroskopisches Fett in CT und MRT erkennen',
    adenoma: 'Ein lipidreiches Adenom enthält mikroskopisches intrazelluläres Fett. Im PDF-Beispiel sind die Messwerte der markierten Läsion nativ −3 HU, arteriell +3 HU, portalvenös +38 HU und spät +12 HU. Das Beispiel illustriert Phasen und ROI-Messungen; die alten Washout-Grenzen und Leistungsangaben der PDF werden nicht als aktuelle allgemeine Diagnosekriterien übernommen.',
    adenomaAlt: 'Vier axiale CT-Phasen mit ROI-Messungen einer markierten Nebennierenläsion: nativ minus 3 HU, arteriell plus 3 HU, portalvenös plus 38 HU und spät plus 12 HU.',
    adenomaCaption: 'Einzelfall aus Abdomen.pdf, PDF-Seite 59 (Druckseite 58). Die Phasenmesswerte gehören zu diesem Beispiel und definieren keine universelle Washout-Regel.',
    fatTitle: 'Mikroskopisches oder makroskopisches Fett?',
    fatRows: [
      ['Fettkomponente', 'Adenom: mikroskopisch, intrazellulär', 'Myelolipom: sichtbares makroskopisches Fett mit hämatopoetischen Anteilen'],
      ['T1-/T2-Signal', 'Meist isointens bis leicht hypointens zum Leberparenchym.', 'Fettanteile T1/T2 hyperintens; hämatopoetische Weichteilanteile intermediär.'],
      ['Chemical-shift-MRT', 'Homogener Signalabfall in Opposed-Phase kann auftreten.', 'Kein flächiger Signalabfall der gesamten Läsion; dunkler India-ink-Rand an Fett-Wasser-Grenzen möglich.'],
      ['Fettsättigung', 'Kein ausgeprägter Signalabfall, da die Sequenz vor allem makroskopisches Fett unterdrückt.', 'Makroskopische Fettanteile zeigen deutlichen Signalabfall.'],
    ],
    myelolipomaTitle: 'Myelolipom: makroskopisches Fett und Gewebeanteile',
    myelolipoma: 'Das PDF beschreibt eine meist gut abgrenzbare, heterogene Läsion aus reifem Fett und hämatopoetischem Gewebe. In den zwei axialen CT-Bildern bleibt die makroskopische Fettkomponente nativ sichtbar; nach Kontrastmittel ist heterogene Anreicherung der weichteildichten Anteile zu sehen. Die Bilder sind nicht als vollständiges Protokoll oder alleiniger Benignitätsnachweis zu verstehen.',
    myelolipomaNativeAlt: 'Axiales natives CT aus Abdomen.pdf, Seite 61: rechtsseitige Nebennierenraumforderung mit sichtbaren makroskopischen Fettanteilen.',
    myelolipomaContrastAlt: 'Axiales CT nach Kontrastmittel aus Abdomen.pdf, Seite 61: dieselbe rechtsseitige Nebennierenraumforderung mit heterogenen weichteildichten Anteilen.',
    nativeLabel: 'Nativ', contrastLabel: 'Nach Kontrastmittel',
    myelolipomaCaption: 'Quellpaar aus Abdomen.pdf, PDF-Seite 61 (Druckseite 60). Die PDF bezeichnet links als nativ und rechts als Post-KM; keine weitere Phase wird abgeleitet.',
    pheoTitle: 'Phäochromozytom: Washout schließt es nicht aus',
    pheo: 'Das PDF-Beispiel zeigt eine heterogene Nebennierenraumforderung mit nekrotischen beziehungsweise zystischen Anteilen und deutlicher Kontrastmittelaufnahme. Die portalvenöse Phase ist in der beschriebenen Falltafel stärker als die arterielle; später nimmt die Anreicherung ab. Da Phäochromozytome Adenome beim Washout imitieren können und hypervaskuläre Metastasen ähnlich aussehen können, ist das Muster nicht spezifisch. Die Bildgebung ersetzt bei entsprechendem Verdacht nicht die biochemische Abklärung, etwa mit freien Plasma-Metanephrinen oder fraktionierten Metanephrinen im Urin.',
    pheoAlt: 'Vierphasige CT-Falltafel aus Abdomen.pdf mit markierter linker Nebennierenraumforderung: natives CT, arterielle, portalvenöse und späte Phase.',
    pheoCaption: 'Falltafel aus Abdomen.pdf, PDF-Seite 63 (Druckseite 62). Gezeigt wird der konkrete Phasenverlauf dieser Läsion, keine eindeutige Diagnose durch eine einzelne Phase.',
    neuroTitle: 'Neuroblastom: den Ursprung von der Niere abgrenzen',
    neuro: [
      'Neuroblastome entstehen entlang des sympathischen Nervensystems, häufig in der Nebenniere oder in paraspinalen Ganglien. Eine sichtbare Abgrenzung zur Niere mit Verdrängung stützt einen extrarenalen Ursprung. Mittellinienüberschreitung und Gefäßummauerung sind zusätzliche Musterhinweise; die Ummauerung allein beweist keine Invasion der Gefäßwand.',
      'Das PDF nennt Verkalkungen als möglichen CT-Befund; sie sind in diesem MRT-Paar nicht dargestellt. Ein möglicher Spinalkanalbefall sowie retroperitoneale Lymphknoten- oder Knochenmetastasen beschreiben mögliche Ausbreitungsorte. Die Quelle benennt die MRT-Sequenzen nicht.',
    ],
    neuroAlt: 'Zwei axiale MRT-Bilder aus Abdomen.pdf, Seite 64: große markierte linke Oberbauchraumforderung, die die Mittellinie überschreitet und Gefäße umgibt; Sequenz nicht angegeben.',
    neuroCaption: 'Fallbeispiel aus Abdomen.pdf, PDF-Seite 64 (Druckseite 63): linksseitige zystisch-solide Raumforderung mit Mittellinienüberschreitung, Verdrängung der linken Niere und Ummauerung der Gefäße; Aorta und V. cava sind nach ventral verlagert. Die MRT-Sequenzen sind nicht angegeben.',
    wilmsLink: 'Nephroblastom (Wilms-Tumor): Nierenursprung und Claw sign',
    caveTitle: 'Grenzen der Quelle',
    cave: 'Das PDF enthält ältere Managementgrafiken, Washout-Schwellen und historische epidemiologische Faustregeln. Diese Angaben werden nicht als aktuelle Empfehlungen übernommen. Auf PDF-Seite 62 steht außerdem nur ein kurzer Hinweis: Nebennierenzysten sind selten und können auch ohne soliden Anteil neoplastisch sein; das ist keine vollständige Klassifikation oder Managementempfehlung. Bildgebung allein bestimmt keine hormonelle Aktivität: Eine relevante klinische und biochemische Abklärung gehört in den ärztlichen Kontext (Endocrine Society PPGL guideline, 2014). Nach ESE/ENSAT 2023 gelten homogene Nebenniereninzidentalome mit ≤10 HU in der Nativ-CT als benigne und benötigen unabhängig von der Größe keine weitere Bildgebung. Bei anderen Befunden werden Homogenität, native Dichte, Größe und klinischer Kontext zusammen bewertet; diese Lektion bildet keinen vollständigen Managementalgorithmus ab.',
    reference: 'Aktuelle Einordnung des Inzidentaloms: ESE/ENSAT Clinical Practice Guideline 2023. Die PPGL-Aussage zur biochemischen Abklärung stützt sich auf die Endocrine Society Clinical Practice Guideline 2014. Die Seitenzahlen in diesem Ledger beziehen sich auf physische PDF-Seiten; gedruckte Folios stehen jeweils in Klammern.',
    tableHeaders: ['Merkmal', 'Lipidreiches Adenom', 'Myelolipom'],
  },
  en: {
    title: 'Adrenal masses',
    contentTitle: 'From imaging pattern to assessment',
    goals: [
      'Separate incidental discovery, attenuation, fat and clinical context.',
      'Distinguish microscopic adenoma fat from macroscopic fat in myelolipoma.',
      'Assess pheochromocytoma and neuroblastoma by pattern and site of origin without overcalling a single sign.',
    ],
    summary: [
      '“Incidentaloma” describes how a lesion was found, not whether it is benign.',
      'Assess homogeneity and unenhanced attenuation first; this does not determine hormonal function.',
      'Adenoma: intracellular fat with opposed-phase signal loss; myelolipoma: macroscopic fat that suppresses on fat-saturated imaging.',
      'Washout cannot reliably exclude pheochromocytoma; in children, distinguish adrenal from renal origin.',
    ],
    incidentalomaTitle: 'What does “incidentaloma” mean?',
    incidentaloma: 'An adrenal mass is an incidentaloma when it is found by chance, without a targeted clinical question about the adrenal gland. The term itself says nothing about histology or hormonal activity. The size-based flowchart and follow-up percentages shown in the PDF are not current decision rules and are not used here.',
    adenomaTitle: 'Adenoma: recognise microscopic fat on CT and MRI',
    adenoma: 'A lipid-rich adenoma contains microscopic intracellular fat. In the PDF example, ROI values for the marked lesion are −3 HU unenhanced, +3 HU arterial, +38 HU portal venous and +12 HU delayed. This illustrates phase-specific measurements in one case; the PDF’s older washout cutoffs and performance estimates are not presented as current universal diagnostic criteria.',
    adenomaAlt: 'Four axial CT phases with ROI measurements of a marked adrenal lesion: unenhanced minus 3 HU, arterial plus 3 HU, portal venous plus 38 HU and delayed plus 12 HU.',
    adenomaCaption: 'Single case from Abdomen.pdf, PDF page 59 (printed page 58). These phase values belong to this example and do not define a universal washout rule.',
    fatTitle: 'Microscopic or macroscopic fat?',
    fatRows: [
      ['Fat component', 'Adenoma: microscopic, intracellular', 'Myelolipoma: visible macroscopic fat with haematopoietic components'],
      ['T1/T2 signal', 'Usually isointense to slightly hypointense relative to liver parenchyma.', 'Fatty components are T1/T2 hyperintense; haematopoietic soft-tissue components are intermediate in signal.'],
      ['Chemical-shift MRI', 'Homogeneous opposed-phase signal loss may occur.', 'No diffuse signal loss of the whole lesion; a dark India-ink rim may appear at fat–water boundaries.'],
      ['Fat suppression', 'No marked signal loss because the sequence mainly suppresses macroscopic fat.', 'Macroscopic fat shows marked signal loss.'],
    ],
    myelolipomaTitle: 'Myelolipoma: macroscopic fat and soft-tissue components',
    myelolipoma: 'The PDF describes a usually well-defined, heterogeneous lesion containing mature fat and haematopoietic tissue. In the two axial CT images, macroscopic fat remains visible on the unenhanced image; after contrast, the soft-tissue components enhance heterogeneously. These images are not a complete protocol or proof of benignity by themselves.',
    myelolipomaNativeAlt: 'Axial unenhanced CT from Abdomen.pdf, page 61: right adrenal mass with visible macroscopic fat.',
    myelolipomaContrastAlt: 'Axial post-contrast CT from Abdomen.pdf, page 61: the same right adrenal mass with heterogeneous soft-tissue components.',
    nativeLabel: 'Unenhanced', contrastLabel: 'Post-contrast',
    myelolipomaCaption: 'Source pair from Abdomen.pdf, PDF page 61 (printed page 60). The PDF labels the left image unenhanced and the right image post-contrast; no further phase is inferred.',
    pheoTitle: 'Pheochromocytoma: washout does not exclude it',
    pheo: 'The PDF example shows a heterogeneous adrenal mass with necrotic or cystic components and avid enhancement. In the described case panel, portal-venous enhancement exceeds arterial enhancement and decreases later. Pheochromocytomas can mimic adenomas on washout, and hypervascular metastases can have a similar appearance, so the pattern is not specific. When suspected, imaging does not replace biochemical assessment, for example with plasma-free or urinary-fractionated metanephrines.',
    pheoAlt: 'Four-phase CT case panel from Abdomen.pdf showing a marked left adrenal mass: unenhanced, arterial, portal venous and delayed phases.',
    pheoCaption: 'Case panel from Abdomen.pdf, PDF page 63 (printed page 62). It shows this lesion’s phase pattern, not a definitive diagnosis from any single phase.',
    neuroTitle: 'Neuroblastoma: distinguish its origin from the kidney',
    neuro: [
      'Neuroblastoma arises along the sympathetic nervous system, commonly in the adrenal gland or paraspinal ganglia. A visible plane from the kidney with displacement supports an extra-renal origin. Midline extension and vascular encasement are additional pattern clues; encasement alone does not prove vessel-wall invasion.',
      'The PDF notes calcification as a possible CT finding; it is not shown in this MRI pair. Possible spinal canal involvement and retroperitoneal nodal or bone metastases describe potential sites of spread. The source does not identify the MRI sequences.',
    ],
    neuroAlt: 'Two axial MRI images from Abdomen.pdf, page 64: a large marked left upper-abdominal mass crossing the midline and encasing vessels; sequence not specified.',
    neuroCaption: 'Case example from Abdomen.pdf, PDF page 64 (printed page 63): a left-sided cystic-solid mass crosses the midline, displaces the left kidney and encases vessels; the aorta and IVC are displaced anteriorly. MRI sequences are not specified.',
    wilmsLink: 'Nephroblastoma (Wilms tumour): renal origin and the claw sign',
    caveTitle: 'Limits of the source',
    cave: 'The PDF includes older management flowcharts, washout thresholds and historical epidemiological mnemonics. These are not carried over as current recommendations. PDF page 62 also briefly notes that adrenal cysts are rare and may be neoplastic even without a solid component; this is not a full classification or management pathway. Imaging alone does not establish hormonal activity: clinically relevant assessment, including biochemical evaluation, belongs in the clinical context (Endocrine Society PPGL guideline, 2014). Under the 2023 ESE/ENSAT guideline, homogeneous adrenal incidentalomas with unenhanced CT attenuation ≤10 HU are benign and need no further imaging, irrespective of size. Other findings are assessed using homogeneity, unenhanced attenuation, size and clinical context together; this lesson does not provide a complete management algorithm.',
    reference: 'Current incidentaloma framework: ESE/ENSAT Clinical Practice Guideline 2023. The PPGL biochemical-assessment caveat is based on the Endocrine Society Clinical Practice Guideline 2014. Page numbers in this ledger refer to physical PDF pages; printed folios are shown in parentheses.',
    tableHeaders: ['Feature', 'Lipid-rich adenoma', 'Myelolipoma'],
  },
  fa: {
    title: 'توده‌های آدرنال',
    contentTitle: 'از الگوی تصویربرداری تا ارزیابی',
    goals: [
      'کشف اتفاقی، دانسیته، چربی و زمینه بالینی را جداگانه ثبت کنید.',
      'چربی میکروسکوپیک آدنوم را از چربی ماکروسکوپیک مایلولیپوما افتراق دهید.',
      'فئوکروموسیتوم و نوروبلاستوما را با توجه به الگو و منشأ ارزیابی کنید و از تعمیم یک نشانه بپرهیزید.',
    ],
    summary: [
      '«اینسی‌دنتالوما» نحوه کشف ضایعه را توصیف می‌کند، نه خوش‌خیم‌بودن آن را.',
      'ابتدا همگنی و دانسیته بدون تزریق را بسنجید؛ این موارد عملکرد هورمونی را تعیین نمی‌کنند.',
      'آدنوم: چربی داخل‌سلولی با افت سیگنال opposed-phase؛ مایلولیپوما: چربی ماکروسکوپیک با افت سیگنال در توالی سرکوب چربی.',
      'Washout فئوکروموسیتوم را با اطمینان رد نمی‌کند؛ در کودکان منشأ آدرنال را از منشأ کلیوی جدا کنید.',
    ],
    incidentalomaTitle: '«اینسی‌دنتالوما» یعنی چه؟',
    incidentaloma: 'توده آدرنال زمانی اینسی‌دنتالوماست که به‌طور اتفاقی و بدون پرسش بالینی هدفمند درباره آدرنال کشف شود. این اصطلاح به‌خودی‌خود بافت‌شناسی یا فعالیت هورمونی را مشخص نمی‌کند. فلوچارت مبتنی بر اندازه و درصدهای پیگیری در PDF، قاعده تصمیم‌گیری جاری نیست و در اینجا به‌کار نرفته است.',
    adenomaTitle: 'آدنوم: چربی میکروسکوپیک را در CT و MRI بشناسید',
    adenoma: 'آدنوم پرچربی حاوی چربی میکروسکوپیک داخل‌سلولی است. در نمونه PDF، مقادیر ROI ضایعه مشخص‌شده عبارت‌اند از ۳− HU بدون تزریق، ۳+ HU شریانی، ۳۸+ HU پورت و ۱۲+ HU تأخیری. این نمونه اندازه‌گیری در فازهای مختلف را نشان می‌دهد؛ آستانه‌های قدیمی Washout و اعداد کارایی PDF معیار تشخیصی عمومی و جاری نیستند.',
    adenomaAlt: 'چهار فاز CT محوری با اندازه‌گیری ROI از ضایعه مشخص‌شده آدرنال: بدون تزریق منفی ۳ HU، شریانی مثبت ۳، پورت مثبت ۳۸ و تأخیری مثبت ۱۲ HU.',
    adenomaCaption: 'نمونه منفرد از Abdomen.pdf، صفحه ۵۹ فایل (صفحه چاپی ۵۸). مقادیر فازی مربوط به همین نمونه‌اند و قاعده عمومی Washout را تعریف نمی‌کنند.',
    fatTitle: 'چربی میکروسکوپیک یا ماکروسکوپیک؟',
    fatRows: [
      ['جزء چربی', 'آدنوم: میکروسکوپیک و داخل‌سلولی', 'مایلولیپوما: چربی ماکروسکوپیک قابل مشاهده همراه با اجزای خون‌ساز'],
      ['سیگنال T1/T2', 'معمولاً نسبت به پارانشیم کبد هم‌سیگنال تا کمی کم‌سیگنال.', 'اجزای چربی در T1/T2 پرسیگنال‌اند؛ اجزای بافت نرم خون‌ساز سیگنال میانی دارند.'],
      ['MRI جابه‌جایی شیمیایی', 'افت همگن سیگنال در opposed-phase ممکن است دیده شود.', 'افت منتشر سیگنال در کل ضایعه وجود ندارد؛ ممکن است حاشیه تیره India-ink در مرز چربی و آب دیده شود.'],
      ['سرکوب چربی', 'افت سیگنال بارز ندارد، چون توالی عمدتاً چربی ماکروسکوپیک را سرکوب می‌کند.', 'چربی ماکروسکوپیک افت سیگنال بارز دارد.'],
    ],
    myelolipomaTitle: 'مایلولیپوما: چربی ماکروسکوپیک و اجزای بافت نرم',
    myelolipoma: 'در PDF، ضایعه‌ای معمولاً مشخص و ناهمگون از چربی بالغ و بافت خون‌ساز توصیف شده است. در دو تصویر CT محوری، چربی ماکروسکوپیک در تصویر بدون تزریق دیده می‌شود؛ پس از تزریق، اجزای بافت نرم تقویت ناهمگون دارند. این تصاویر پروتکل کامل یا اثبات مستقل خوش‌خیمی نیستند.',
    myelolipomaNativeAlt: 'CT محوری بدون تزریق از صفحه ۶۱ Abdomen.pdf: توده آدرنال راست با چربی ماکروسکوپیک قابل مشاهده.',
    myelolipomaContrastAlt: 'CT محوری پس از تزریق از صفحه ۶۱ Abdomen.pdf: همان توده آدرنال راست با اجزای بافت نرم و تقویت ناهمگون.',
    nativeLabel: 'بدون تزریق', contrastLabel: 'پس از تزریق',
    myelolipomaCaption: 'دو تصویر منبع از Abdomen.pdf، صفحه ۶۱ فایل (صفحه چاپی ۶۰). تصویر چپ در PDF بدون تزریق و راست پس از تزریق برچسب خورده است؛ فاز دیگری استنباط نشده است.',
    pheoTitle: 'فئوکروموسیتوم: Washout آن را رد نمی‌کند',
    pheo: 'نمونه PDF توده‌ای ناهمگون در آدرنال با اجزای نکروتیک یا کیستیک و تقویت واضح نشان می‌دهد. در شرح همین نمونه، تقویت پورت از شریانی بیشتر است و در فاز تأخیری کاهش می‌یابد. فئوکروموسیتوم می‌تواند در الگوی Washout آدنوم را تقلید کند و متاستاز پرعروق نیز ممکن است ظاهر مشابهی داشته باشد؛ بنابراین این الگو اختصاصی نیست. در صورت شک بالینی، تصویربرداری جای بررسی بیوشیمیایی را نمی‌گیرد؛ برای نمونه، متانفرین آزاد پلاسما یا متانفرین‌های جزءبه‌جزء ادرار بررسی می‌شوند.',
    pheoAlt: 'مجموعه CT چهار فازی از صفحه ۶۳ Abdomen.pdf با توده مشخص‌شده آدرنال چپ: فاز بدون تزریق، شریانی، پورت و تأخیری.',
    pheoCaption: 'مجموعه موردی از Abdomen.pdf، صفحه ۶۳ فایل (صفحه چاپی ۶۲). الگوی فازی همین ضایعه را نشان می‌دهد، نه تشخیص قطعی بر پایه یک فاز.',
    neuroTitle: 'نوروبلاستوما: منشأ آن را از کلیه جدا کنید',
    neuro: [
      'نوروبلاستوما در امتداد دستگاه عصبی سمپاتیک ایجاد می‌شود و اغلب از آدرنال یا گانگلیون‌های پارااسپاینال منشأ می‌گیرد. وجود مرز قابل مشاهده با کلیه همراه با جابه‌جایی آن از منشأ خارج‌کلیوی حمایت می‌کند. عبور از خط وسط و احاطه عروق سرنخ‌های تکمیلی‌اند؛ احاطه عروق به‌تنهایی تهاجم به دیواره عروق را ثابت نمی‌کند.',
      'PDF کلسیفیکاسیون را به‌عنوان یافته احتمالی CT ذکر می‌کند؛ این یافته در این جفت تصویر MRI نشان داده نشده است. درگیری احتمالی کانال نخاعی و متاستاز غدد لنفاوی رتروپریتوئن یا استخوان، محل‌های ممکن گسترش بیماری‌اند. منبع توالی‌های MRI را مشخص نمی‌کند.',
    ],
    neuroAlt: 'دو تصویر MRI محوری از صفحه ۶۴ Abdomen.pdf: توده بزرگ مشخص‌شده در بخش فوقانی چپ شکم که از خط وسط عبور می‌کند و عروق را احاطه می‌کند؛ توالی مشخص نیست.',
    neuroCaption: 'نمونه موردی از Abdomen.pdf، صفحه ۶۴ فایل (صفحه چاپی ۶۳): توده کیستیک-جامد چپ از خط وسط عبور می‌کند، کلیه چپ را جابه‌جا می‌کند و عروق را احاطه کرده است؛ آئورت و ورید اجوف تحتانی به جلو جابه‌جا شده‌اند. توالی‌های MRI مشخص نیستند.',
    wilmsLink: 'نفروبلاستوما (تومور ویلمز): منشأ کلیوی و علامت چنگالی',
    caveTitle: 'محدودیت‌های منبع',
    cave: 'PDF شامل فلوچارت‌های قدیمی مدیریت، آستانه‌های Washout و میان‌برهای تاریخی اپیدمیولوژیک است. این موارد به‌عنوان توصیه جاری منتقل نشده‌اند. صفحه ۶۲ PDF همچنین به‌اختصار می‌گوید کیست آدرنال نادر است و حتی بدون جزء جامد ممکن است نئوپلاستیک باشد؛ این اشاره طبقه‌بندی یا مسیر مدیریت کامل نیست. تصویربرداری به‌تنهایی فعالیت هورمونی را مشخص نمی‌کند؛ ارزیابی بالینی مرتبط، از جمله بررسی بیوشیمیایی، باید در زمینه بالینی انجام شود (راهنمای PPGL انجمن غدد درون‌ریز، ۲۰۱۴). بر اساس راهنمای ESE/ENSAT سال ۲۰۲۳، اینسی‌دنتالوم همگن آدرنال با دانسیته بدون تزریق ≤۱۰ HU خوش‌خیم است و مستقل از اندازه به تصویربرداری بیشتر نیاز ندارد. سایر یافته‌ها با ارزیابی هم‌زمان همگنی، دانسیته بدون تزریق، اندازه و زمینه بالینی بررسی می‌شوند؛ این درس الگوریتم کامل مدیریت را ارائه نمی‌کند.',
    reference: 'چارچوب جاری اینسی‌دنتالوما: راهنمای بالینی ESE/ENSAT سال ۲۰۲۳. یادداشت بررسی بیوشیمیایی PPGL بر راهنمای بالینی انجمن غدد درون‌ریز در سال ۲۰۱۴ متکی است. شماره‌های این دفتر به صفحات واقعی PDF اشاره دارند و شماره چاپی داخل پرانتز آمده است.',
    tableHeaders: ['ویژگی', 'آدنوم پرچربی', 'مایلولیپوما'],
  },
}

function Figure({ src, alt, caption, width, height }) {
  return <figure className={styles.figure}>
    <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    <figcaption>{caption}</figcaption>
  </figure>
}

export default function AdrenalMassesPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  const [feature, adenoma, myelolipoma] = c.fatRows
  const headings = c.tableHeaders

  return <LessonReferenceShell
    lessonId="abdomen-adrenal-masses"
    lang={lang}
    title={c.title}
    diagram="adrenal"
    goals={c.goals}
    copy={{ contentTitle: c.contentTitle, diagramCaption: {
      de: 'Schematische Lagebeziehung der Nebennieren; keine Patientendarstellung.',
      en: 'Schematic adrenal location; not patient imaging.',
      fa: 'شماتیک محل آدرنال‌ها؛ تصویر بیمار نیست.',
    } }}
    summary={c.summary}
    quizHref="/ueben/quiz?fach=abdomen&n=5&themen=nebennieren-inzidentalom,nebennierenadenom,phaeochromozytom,myelolipom,neuroblastom-nebenniere"
    flashcardsHref="/flashcards/nebennierenraumforderungen"
    check={ADRENAL_LESSON_CHECK}
  >
    <div className={styles.lesson}>
      <section className={styles.section}>
        <h3>{c.incidentalomaTitle}</h3>
        <p>{c.incidentaloma}</p>
        <aside className={styles.cave}>
          <h4>{c.caveTitle}</h4>
          <p>{c.cave}</p>
        </aside>
      </section>

      <section className={styles.section}>
        <h3>{c.adenomaTitle}</h3>
        <p>{c.adenoma}</p>
        <Figure src={images.adenoma} width={876} height={798} alt={c.adenomaAlt} caption={c.adenomaCaption} />
      </section>

      <section className={styles.section}>
        <h3>{c.fatTitle}</h3>
        <div className={styles.tableScroll} role="region" tabIndex={0} aria-label={c.fatTitle}>
          <table>
            <thead><tr>{headings.map((heading, index) => <th key={index} scope="col">{heading}</th>)}</tr></thead>
            <tbody>{[feature, adenoma, myelolipoma].map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, columnIndex) => columnIndex === 0 ? <th key={columnIndex} scope="row">{cell}</th> : <td key={columnIndex}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h3>{c.myelolipomaTitle}</h3>
        <p>{c.myelolipoma}</p>
        <div className={styles.imagePair}>
          <Figure src={images.myelolipomaNative} width={307} height={250} alt={c.myelolipomaNativeAlt} caption={c.nativeLabel} />
          <Figure src={images.myelolipomaContrast} width={289} height={237} alt={c.myelolipomaContrastAlt} caption={c.contrastLabel} />
        </div>
        <p className={styles.credit}>{c.myelolipomaCaption}</p>
      </section>

      <section className={styles.section}>
        <h3>{c.pheoTitle}</h3>
        <p>{c.pheo}</p>
        <Figure src={images.pheochromocytoma} width={656} height={488} alt={c.pheoAlt} caption={c.pheoCaption} />
      </section>

      <section className={styles.section}>
        <h3>{c.neuroTitle}</h3>
        {c.neuro.map((paragraph, index) => <p key={`neuro-${index}`}>{paragraph}</p>)}
        <Figure src={images.neuroblastoma} width={1062} height={356} alt={c.neuroAlt} caption={c.neuroCaption} />
        <p className={styles.related}><a href="/abdomen/niere/wilms-tumour">{c.wilmsLink} →</a></p>
      </section>

      <section className={styles.section}>
        <h3>{lang === 'fa' ? 'منبع و چارچوب جاری' : lang === 'en' ? 'Source and current framework' : 'Quelle und aktueller Rahmen'}</h3>
        <p>{c.reference} <a href="https://academic.oup.com/jcem/article/99/6/1915/2537399" target="_blank" rel="noreferrer">{lang === 'fa' ? 'منبع راهنمای PPGL' : lang === 'en' ? 'PPGL guideline source' : 'PPGL-Leitlinie'}</a></p>
        <a href="https://www.ese-hormones.org/publications/directory/ese-clinical-practice-guideline-on-the-management-of-adrenal-incidentalomas-in-collaboration-with-the-european-network-for-the-study-of-adrenal-tumors/" target="_blank" rel="noreferrer">ESE/ENSAT adrenal incidentaloma guideline 2023 ↗</a>
      </section>
    </div>
  </LessonReferenceShell>
}
