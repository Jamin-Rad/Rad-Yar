import { QUESTION_CONTENT } from './mammaBasicsClinical'
const L = (de, en, fa) => ({ de, en, fa })

export const MAMMA_MRT_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, QUESTION_CONTENT.map(item => ({
  id: `mamma-mrt-basics-${lang}-${item.id}`,
  tags: ['mamma-mrt-basics', 'mamma', 'mrt'],
  fach: 'mamma',
  question: item.question[lang],
  options: item.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: item.correct,
  explanation: item.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(item.wrongExplanations).map(([id,text]) => [id,text[lang]])),
  source: item.source,
}))]))

const FLASHCARD_CONTENT = [
  ['Protokoll', 'Welche Funktionen hat die T1-Sequenz vor Kontrastmittel in einem Mamma-MRT-Protokoll?', 'Sie dient als Ausgangsbasis und ermöglicht die spätere Subtraktion.', 'Zusätzlich hilft sie, Fett, Blutprodukte und vorbestehend hohes T1-Signal zu erkennen.', 'Protocol', 'What are the functions of the pre-contrast T1 sequence in a breast MRI protocol?', 'It provides the baseline and enables subsequent subtraction.', 'It also helps identify fat, blood products and pre-existing high T1 signal.', 'پروتکل', 'سکانس T1 پیش از تزریق در پروتکل MRI پستان چه کاربردهایی دارد؟', 'تصویر پایه را فراهم می‌کند و تفریق تصاویر بعدی را امکان‌پذیر می‌سازد.', 'همچنین در تشخیص چربی، محصولات خونی و سیگنال بالای T1 که پیش از تزریق وجود داشته کمک‌کننده است.'],
  ['Subtraktion', 'Welchen diagnostischen Zweck erfüllt die Subtraktion in der kontrastmittelgestützten Mamma-MRT?', 'Sie macht echtes Kontrastmittel-Enhancement deutlich besser sichtbar.', 'Dazu wird das Präkontrastbild vereinfacht vom Postkontrastbild abgezogen.', 'Subtraction', 'What diagnostic purpose does subtraction serve in contrast-enhanced breast MRI?', 'It makes true contrast enhancement much more conspicuous.', 'The pre-contrast image is subtracted from the post-contrast image.', 'تفریق تصاویر', 'تفریق تصاویر در MRI پستان با تزریق چه هدف تشخیصی دارد؟', 'تقویت واقعی پس از تزریق را بسیار واضح‌تر می‌کند.', 'برای این کار تصویر پیش از تزریق از تصویر پس از تزریق کم می‌شود.'],
  ['MIP', 'Wofür wird die MIP bei der systematischen Auswertung einer Mamma-MRT eingesetzt?', 'Für einen schnellen Überblick über beide Brüste und zum Suchen auffälliger Enhancements.', 'Die endgültige Beurteilung muss in den Quellbildern erfolgen.', 'MIP', 'How is the MIP used during systematic breast MRI interpretation?', 'For a rapid bilateral overview and to search for suspicious enhancement.', 'Final assessment must be performed on the source images.', 'MIP', 'MIP در ارزیابی سیستماتیک MRI پستان چه کاربردی دارد؟', 'برای مرور سریع هر دو پستان و جست‌وجوی نواحی مشکوک دارای تقویت پس از تزریق.', 'ارزیابی نهایی باید در تصاویر اصلی انجام شود.'],
  ['Diffusion', 'Wie wird ein niedriger ADC einer Brustläsion klinisch eingeordnet?', 'Als ergänzender Befund zusammen mit Morphologie und übrigen Sequenzen.', 'DWI und ADC sind zusätzliche Bausteine und müssen mit Morphologie, T2-Signal und Kinetik korreliert werden.', 'Diffusion', 'How is a low ADC in a breast lesion interpreted clinically?', 'As an adjunct interpreted with morphology and the other sequences.', 'DWI and ADC are adjuncts and must be correlated with morphology, T2 signal and kinetics.', 'انتشار', 'ADC پایین ضایعهٔ پستان از نظر بالینی چگونه تفسیر می‌شود؟', 'به‌عنوان یافتهٔ مکمل همراه با مورفولوژی و سکانس‌های دیگر.', 'DWI و ADC یافته‌های تکمیلی‌اند و باید با مورفولوژی، سیگنال T2 و کینتیک تطبیق داده شوند.'],
  ['FGT', 'Was beschreibt FGT bei der Befundung einer Mamma-MRT?', 'Die Menge des fibroglandulären Brustgewebes.', 'FGT ist unabhängig davon, wie stark dieses Gewebe nach Kontrastmittelgabe anreichert.', 'FGT', 'What does FGT describe in breast MRI reporting?', 'The amount of fibroglandular breast tissue.', 'FGT is independent of how strongly that tissue enhances after contrast.', 'FGT', 'FGT در گزارش MRI پستان چه چیزی را توصیف می‌کند؟', 'مقدار بافت فیبروگلاندولار پستان.', 'FGT مستقل از میزان تقویت این بافت پس از تزریق است.'],
  ['BPE', 'Was beschreibt BPE bei der Befundung einer kontrastmittelgestützten Mamma-MRT?', 'Die Kontrastmittelanreicherung des normalen fibroglandulären Gewebes.', 'Die BI-RADS-Kategorien sind minimal, mild, moderate und marked.', 'BPE', 'What does BPE describe in contrast-enhanced breast MRI reporting?', 'Contrast enhancement of normal fibroglandular tissue.', 'The BI-RADS categories are minimal, mild, moderate and marked.', 'BPE', 'BPE در گزارش MRI پستان با تزریق چه چیزی را توصیف می‌کند؟', 'میزان تقویت بافت طبیعی فیبروگلاندولار پس از تزریق.', 'دسته‌های BI-RADS شامل حداقل، خفیف، متوسط و شدید هستند.'],
  ['Focus', 'Was bezeichnete ein Focus im historischen BI-RADS-MRT-Lexikon?', 'Ein punktförmiges Enhancement kleiner als 5 mm.', 'Historische Definition; in BI-RADS v2025 entfällt Focus als eigenständige Befundkategorie.', 'Focus', 'What did a focus describe in the historical BI-RADS MRI lexicon?', 'A punctate enhancement smaller than 5 mm.', 'Historical definition; BI-RADS v2025 removes focus as a separate finding category.', 'کانون', 'کانون در واژه‌نامهٔ تاریخی MRI در BI-RADS چه معنایی داشت؟', 'یک افزایش سیگنال پس از تزریق نقطه‌ای کوچک‌تر از ۵ میلی‌متر.', 'این تعریف تاریخی است؛ در BI-RADS v2025 کانون دیگر دستهٔ مستقل یافته نیست.'],
  ['Mass', 'Wie ist eine Mass in der Mamma-MRT definiert und welche Merkmale werden beurteilt?', 'Eine Mass ist eine echte dreidimensionale Läsion.', 'Beurteilt werden Form, Rand, internes Enhancement und nach BI-RADS v2025 auch die T2-Signalintensität.', 'Mass', 'How is a mass defined in breast MRI and which features are assessed?', 'A mass is a true three-dimensional lesion.', 'Shape, margin and internal enhancement are assessed, together with T2 signal intensity in BI-RADS v2025.', 'توده', 'توده در MRI پستان چگونه تعریف می‌شود و چه ویژگی‌هایی ارزیابی می‌شوند؟', 'توده یک ضایعهٔ واقعی و سه‌بعدی است.', 'شکل، حاشیه و الگوی تقویت داخلی پس از تزریق و در BI-RADS v2025 شدت سیگنال T2 نیز ارزیابی می‌شوند.'],
  ['NME', 'Wie ist ein Non-Mass Enhancement in der Mamma-MRT definiert?', 'Ein vom normalen BPE abgrenzbares Enhancement ohne dreidimensionale Mass.', 'Es bildet keine dreidimensionale Mass und hebt sich vom BPE ab.', 'NME', 'How is non-mass enhancement defined in breast MRI?', 'Enhancement distinguishable from normal BPE without a three-dimensional mass.', 'It does not form a three-dimensional mass and is distinct from BPE.', 'NME', 'افزایش سیگنال غیرتوده‌ای (NME) در MRI پستان چگونه تعریف می‌شود؟', 'افزایش سیگنال پس از تزریق قابل تفکیک از BPE طبیعی که توده سه‌بعدی تشکیل نمی‌دهد.', 'این یافته تودهٔ سه‌بعدی تشکیل نمی‌دهد و از BPE متمایز است.'],
]

export const MAMMA_MRT_FLASHCARDS = FLASHCARD_CONTENT.map((item, index) => ({
  id: `mamma-mrt-basics-${String(index + 1).padStart(2, '0')}`,
  topicId: 'mamma-mrt-basics',
  category: L(item[0], item[4], item[8]),
  front: L(item[1], item[5], item[9]),
  answer: L(item[2], item[6], item[10]),
  explanation: L(item[3], item[7], item[11]),
  ...(index === 6 ? { source: 'https://cs.acr.org/-/media/ACR/NOINDEX/Research/ACRIN/Legacy-Trials/ACRIN-6667_Protocol.pdf', references: ['https://edge.sitecorecloud.io/americancoldf5f-acrorgf92a-productioncb02-3650/media/ACR/Files/RADS/BI-RADS/BI-RADS-Summary-Form-MRI.pdf'] } : {}),
}))

export const MAMMA_MRT_FLASHCARD_TOPIC = {
  id: 'mamma-mrt-basics', area: 'Mamma', chapter: 'Bildgebung · MRT', icon: 'MR', iconImage: '/fach/mamma.png', color: '#db2777', href: '/flashcards/mamma-mrt-basics',
  title: L('Mamma-MRT: Basics', 'Breast MRI: Basics', 'MRI پستان: مبانی'),
  subtitle: L('Indikationen · Sequenzen · FGT/BPE · Enhancement-Typen', 'Indications · sequences · FGT/BPE · enhancement types', 'موارد کاربرد · MRI سکانس‌ها · FGT/BPE · انواع افزایش سیگنال پس از تزریق'),
}

MAMMA_MRT_FLASHCARDS.push(
  {
    id:'mamma-mrt-basics-risk-context', topicId:'mamma-mrt-basics', category:L('Indikation','Indication','اندیکاسیون'),
    front:L('Warum ist Symptomfreiheit bei genetischem Hochrisiko kein Grund, die MRT-Vorsorge zurückzustellen?','Why is absence of symptoms not a reason to defer MRI surveillance in genetic high risk?','چرا بی‌علامت بودن در خطر ژنتیکی بالا دلیل تعویق پایش MRI نیست؟'),
    answer:L('Screening untersucht asymptomatische Personen mit definiertem Risiko. Genetisches Hochrisiko kann regelmäßige MRT-Überwachung begründen.','Screening addresses asymptomatic people at defined risk. Genetic high risk can support regular MRI surveillance.','غربالگری برای افراد بدون علامت با خطر مشخص است. خطر ژنتیکی بالا می‌تواند پایش منظم MRI را توجیه کند.'),
    explanation:L('Nach ACR beginnt diese Überwachung typischerweise mit 25–30 Jahren; zusätzliche Mammographie hängt von Risikotyp und Alter ab.','Under ACR guidance this surveillance typically begins at 25–30 years; additional mammography depends on risk type and age.','طبق ACR این پایش معمولاً از ۲۵ تا ۳۰سالگی آغاز می‌شود؛ ماموگرافی همراه به نوع خطر و سن بستگی دارد.'),source:'https://pubmed.ncbi.nlm.nih.gov/37150275/',
  },
  {
    id:'mamma-mrt-basics-biopsy-limit', topicId:'mamma-mrt-basics', category:L('Abklärung','Workup','بررسی تشخیصی'),
    front:L('Was ändert eine negative MRT an der Biopsieindikation gut zugänglicher suspekter mammographischer Verkalkungen?','How does negative MRI affect biopsy of accessible suspicious mammographic calcifications?','MRI منفی چه اثری بر اندیکاسیون بیوپسی کلسیفیکاسیون مشکوک و قابل دسترس در ماموگرافی دارد؟'),
    answer:L('Sie hebt die begründete Biopsieindikation nicht auf.','It does not cancel the established biopsy indication.','اندیکاسیون بیوپسیِ دارای مبنا را برطرف نمی‌کند.'),
    explanation:L('Die Bildführung richtet sich nach der zuverlässigen Sichtbarkeit des Zielbefunds; fehlendes Enhancement ersetzt keine Gewebeabklärung.','Guidance follows reliable visibility of the target; absent enhancement does not replace tissue assessment.','هدایت بر اساس رؤیت قابل اعتماد هدف است؛ نبود تقویت جای بررسی بافتی را نمی‌گیرد.'),source:'https://www.acr.org/-/media/ACR/Files/Practice-Parameters/MR-Contrast-Breast.pdf',
  },
  {
    id:'mamma-mrt-basics-adc-roi', topicId:'mamma-mrt-basics', category:L('ADC-Messung','ADC measurement','اندازه‌گیری ADC'),
    front:L('Wo liegt eine gezielte kleine ADC-ROI in einer heterogenen anreichernden Brustläsion?','Where is a targeted small ADC ROI placed in a heterogeneous enhancing breast lesion?','ROI کوچک هدفمند ADC در ضایعهٔ ناهمگن پستان با تقویت کجا قرار می‌گیرد؟'),
    answer:L('Im geeigneten dunkelsten ADC-Bereich des anreichernden soliden Anteils, korreliert mit DWI.','In the appropriate darkest ADC region of the enhancing solid component, correlated with DWI.','در تیره‌ترین ناحیهٔ مناسب ADC در بخش جامد دارای تقویت، با تطبیق DWI.'),
    explanation:L('Nekrose, nicht anreichernde oder verrauschte Voxel und Artefakte vermeiden; ROI vollständig in der Läsion. ADC mit übriger Bildgebung interpretieren.','Avoid necrosis, non-enhancing or noisy voxels and artifact; keep the ROI entirely within the lesion. Interpret ADC with the other imaging.','از نکروز، وکسل‌های بدون تقویت یا پرنویز و آرتیفکت اجتناب کنید؛ ROI کاملاً داخل ضایعه باشد. ADC همراه سایر تصاویر تفسیر شود.'),source:'https://pmc.ncbi.nlm.nih.gov/articles/PMC7033067/',
  },
  {
    id:'mamma-mrt-basics-subtraction-motion', topicId:'mamma-mrt-basics', category:L('Subtraktion','Subtraction','تفریق'),
    front:L('Warum müssen benachbarte helle und dunkle Subtraktionskanten nach Bewegung in den Quellbildern geprüft werden?','Why should adjacent bright and dark subtraction edges after motion be checked on source images?','چرا لبه‌های روشن و تیرهٔ مجاور در تفریق پس از حرکت باید در تصاویر اصلی بررسی شوند؟'),
    answer:L('Sie können durch Fehlregistrierung statt durch echtes Enhancement entstehen.','They may result from misregistration rather than true enhancement.','ممکن است ناشی از ناهم‌ترازی باشند، نه تقویت واقعی.'),
    explanation:L('Prä-/Postkontrastbilder und Ausrichtung vergleichen, bevor eine Läsionskinetik aus dem Rand gemessen wird.','Compare pre/post-contrast images and alignment before measuring lesion kinetics from the edge.','پیش از اندازه‌گیری کینتیک ضایعه از لبه، تصاویر پیش/پس از تزریق و هم‌ترازی مقایسه شوند.'),source:'https://www.acr.org/-/media/ACR/Files/Practice-Parameters/MR-Contrast-Breast.pdf',
  },
)
