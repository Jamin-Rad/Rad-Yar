// Clinical additions complement (and do not suppress) the original lesson banks.
// Each item is a written clinical vignette; no unseen patient image is implied.
const L = (de, en, fa) => ({ de, en, fa })
const blocks = []
function block(topicId, route, title, source, items) {
  blocks.push({ topicId, route, title, source, items })
}
const accSource = 'https://doi.org/10.1148/radiology.155.2.3983387'
block('aq-balkenagenesie', '/gehirn/anatomie/balkenagenesie', L('Balkenagenesie', 'Callosal agenesis', 'آژنزی جسم پینه‌ای'), accSource, [
  {
    key: 'direct-assessment', goal: L('Indirekte Ventrikelzeichen durch direkte Balkendarstellung prüfen.', 'Check indirect ventricular signs by directly assessing the callosum.', 'نشانه‌های غیرمستقیم بطنی را با مشاهدهٔ مستقیم جسم پینه‌ای بررسی کنید.'),
    question: L('Axiales MRT: parallel verlaufende Seitenventrikel und betonte Hinterhörner. Welche Ergänzung klärt eine vermutete Balkenfehlbildung am gezieltesten?', 'Axial MRI shows parallel lateral ventricles and prominent occipital horns. Which addition most directly evaluates suspected callosal malformation?', 'MRI اکسیال بطن‌های جانبی موازی و شاخ‌های پس‌سری برجسته را نشان می‌دهد. کدام بررسی تکمیلی مستقیماً ناهنجاری احتمالی جسم پینه‌ای را ارزیابی می‌کند؟'),
    options: [L('Balkensegmente im echten mittsagittalen MRT nachverfolgen', 'Trace callosal segments on true mid-sagittal MRI', 'بخش‌های جسم پینه‌ای را در MRI دقیقاً ساژیتال میانی دنبال کنید'), L('Evans-Index auf dem axialen Bild bestimmen', 'Measure the Evans index on the axial image', 'شاخص ایوانز را در تصویر اکسیال اندازه بگیرید'), L('Aquäduktfluss mittels Phasenkontrast quantifizieren', 'Quantify aqueductal flow with phase-contrast imaging', 'جریان مایع مغزی‌نخاعی در آکوئداکت مغزی را با تصویربرداری فازکنتراست اندازه بگیرید'), L('Die Ventrikelweite im Verlauf allein vergleichen', 'Compare ventricular width alone over time', 'فقط پهنای بطن‌ها را در سیر زمانی مقایسه کنید')],
    correct: 'A', feedback: L('Die sagittale Darstellung prüft vorhandene oder fehlende Balkensegmente direkt; die Ventrikelform ist ein indirekter Hinweis.', 'Sagittal imaging directly assesses present or absent callosal segments; ventricular shape is an indirect clue.', 'تصویر ساژیتال وجود یا فقدان بخش‌های جسم پینه‌ای را مستقیماً بررسی می‌کند؛ شکل بطن‌ها نشانه‌ای غیرمستقیم است.'),
    wrong: [L('Der Evans-Index beschreibt Ventrikelweite, nicht die Balkensegmente.', 'The Evans index describes ventricular enlargement, not callosal segments.', 'شاخص ایوانز گشادشدگی بطن‌ها را توصیف می‌کند، نه بخش‌های جسم پینه‌ای را.'), L('Flussmessung untersucht Liquordynamik, zeigt aber die Balkenanatomie nicht direkt.', 'Flow measurement assesses CSF dynamics but does not directly establish callosal anatomy.', 'اندازه‌گیری جریان، دینامیک مایع مغزی‌نخاعی را می‌سنجد و آناتومی جسم پینه‌ای را مستقیماً مشخص نمی‌کند.'), L('Ein stabiler Ventrikelbefund bestätigt weder vollständiges noch partielles Fehlen des Balkens.', 'Stable ventricular size confirms neither complete nor partial callosal absence.', 'ثابت‌ماندن اندازهٔ بطن‌ها فقدان کامل یا ناقص جسم پینه‌ای را تأیید نمی‌کند.')],
    front: L('Welche MRT-Ebene prüft eine vermutete Balkenagenesie direkt?', 'Which MRI plane directly evaluates suspected callosal agenesis?', 'کدام صفحهٔ MRI آژنزی احتمالی جسم پینه‌ای را مستقیماً بررسی می‌کند؟'),
    answer: L('Die echte mittsagittale Ebene; sichtbare Balkensegmente systematisch verfolgen.', 'The true mid-sagittal plane; systematically trace visible callosal segments.', 'صفحهٔ دقیقاً ساژیتال میانی؛ بخش‌های قابل مشاهدهٔ جسم پینه‌ای را منظم دنبال کنید.'),
  },
  {
    key: 'extent', goal: L('Vollständige und partielle Balkenfehlbildung anhand sichtbarer Segmente unterscheiden.', 'Distinguish complete from partial callosal malformation using visible segments.', 'ناهنجاری کامل و ناقص جسم پینه‌ای را بر اساس بخش‌های قابل مشاهده تفکیک کنید.'),
    question: L('Bei Kolpozephalie ist im mittsagittalen MRT ein Balkenanteil erhalten, andere Abschnitte fehlen. Welche Formulierung passt am besten?', 'With colpocephaly, mid-sagittal MRI shows a preserved callosal portion and absent other segments. Which description fits best?', 'همراه با کولپوسفالیا، MRI ساژیتال میانی بخشی از جسم پینه‌ای را نشان می‌دهد و بخش‌های دیگر غایب‌اند. کدام توصیف مناسب‌تر است؟'),
    options: [L('Vollständige Balkenagenesie wegen der Kolpozephalie', 'Complete callosal agenesis because of colpocephaly', 'آژنزی کامل جسم پینه‌ای به‌دلیل کولپوسفالیا'), L('Partielle Balkenfehlbildung mit Angabe der erhaltenen Segmente', 'Partial callosal malformation, specifying the preserved segments', 'ناهنجاری ناقص جسم پینه‌ای با ذکر بخش‌های باقی‌مانده'), L('Normaler Balken bei vorhandener vorderer Komponente', 'Normal callosum because an anterior component is present', 'جسم پینه‌ای طبیعی به‌دلیل وجود بخش قدامی'), L('Erworbene Balkenatrophie allein aufgrund der Ventrikelform', 'Acquired callosal atrophy based on ventricular shape alone', 'آتروفی اکتسابی جسم پینه‌ای فقط بر اساس شکل بطن‌ها')], correct: 'B',
    feedback: L('Erhaltene und fehlende Segmente sprechen für eine partielle Fehlbildung; der Befund soll die tatsächlich sichtbare Anatomie benennen.', 'Preserved and absent segments support partial malformation; report the anatomy actually demonstrated.', 'وجود بعضی بخش‌ها و فقدان بخش‌های دیگر به نفع ناهنجاری ناقص است؛ گزارش باید آناتومی واقعاً مشاهده‌شده را بیان کند.'),
    wrong: [L('Kolpozephalie ersetzt die direkte Segmentbeurteilung nicht; ein erhaltener Anteil widerspricht vollständiger Agenesie.', 'Colpocephaly does not replace segment assessment; a preserved portion contradicts complete agenesis.', 'کولپوسفالیا جای ارزیابی مستقیم بخش‌ها را نمی‌گیرد؛ وجود یک بخش با آژنزی کامل سازگار نیست.'), L('Ein erhaltener Anteil schließt die Fehlbildung anderer Abschnitte nicht aus.', 'A preserved portion does not exclude malformation of other segments.', 'وجود یک بخش، ناهنجاری بخش‌های دیگر را رد نمی‌کند.'), L('Für eine erworbene Ursache braucht es passende Morphologie und Anamnese; die Ventrikelform allein genügt nicht.', 'An acquired cause requires compatible morphology and history; ventricular shape alone is insufficient.', 'علت اکتسابی به شکل‌شناسی و شرح حال سازگار نیاز دارد؛ شکل بطن‌ها به‌تنهایی کافی نیست.')],
    front: L('Was gehört beim partiell angelegten Balken in den Befund?', 'What should a report of partial callosal formation specify?', 'در گزارش تشکیل ناقص جسم پینه‌ای چه چیزی باید ذکر شود؟'), answer: L('Welche Segmente erhalten beziehungsweise nicht darstellbar sind.', 'Which segments are preserved and which are not demonstrated.', 'کدام بخش‌ها وجود دارند و کدام بخش‌ها قابل مشاهده نیستند.'),
  },
  {
    key: 'associated-anomalies', goal: L('Bei Balkenfehlbildung nach zusätzlichen Entwicklungsanomalien suchen.', 'Search for associated developmental anomalies in callosal malformation.', 'در ناهنجاری جسم پینه‌ای، ناهنجاری‌های تکاملی همراه را جست‌وجو کنید.'),
    question: L('Eine Balkenfehlbildung ist im MRT bestätigt. Welche zusätzliche Befundprüfung ist für die Einordnung besonders relevant?', 'MRI confirms a callosal malformation. Which additional assessment is particularly relevant to its interpretation?', 'ناهنجاری جسم پینه‌ای در MRI تأیید شده است. کدام ارزیابی تکمیلی برای تفسیر آن اهمیت ویژه دارد؟'),
    options: [L('Allein das Ausmaß der Kolpozephalie als Prognosemaß bestimmen', 'Use the degree of colpocephaly alone as a prognostic measure', 'فقط شدت کولپوسفالیا را معیار پیش‌آگهی قرار دهید'), L('Aus der Balkenform unmittelbar ein bestimmtes Syndrom benennen', 'Name a specific syndrome directly from callosal shape', 'از شکل جسم پینه‌ای مستقیماً نام یک سندرم مشخص را نتیجه بگیرید'), L('Kortexentwicklung, weitere Mittellinienstrukturen und assoziierte Zysten beurteilen', 'Assess cortical development, other midline structures, and associated cysts', 'تکامل قشر، دیگر ساختارهای خط میانی و کیست‌های همراه را بررسی کنید'), L('Den Befund als isoliert einstufen, sobald kein Hydrozephalus besteht', 'Classify the anomaly as isolated if hydrocephalus is absent', 'در نبود هیدروسفالی، ناهنجاری را منفرد طبقه‌بندی کنید')], correct: 'C',
    feedback: L('Die Unterscheidung einer isolierten von einer komplexen Fehlbildung erfordert eine systematische Suche nach Begleitanomalien.', 'Distinguishing isolated from complex malformation requires a systematic search for associated anomalies.', 'تفکیک ناهنجاری منفرد از نوع پیچیده به جست‌وجوی منظم ناهنجاری‌های همراه نیاز دارد.'),
    wrong: [L('Ventrikelform allein erlaubt keine belastbare individuelle Prognose.', 'Ventricular shape alone cannot establish individual prognosis.', 'شکل بطن‌ها به‌تنهایی پیش‌آگهی فردی قابل اتکا نمی‌دهد.'), L('Eine Syndromdiagnose benötigt weitere klinische und gegebenenfalls genetische Befunde.', 'Syndromic diagnosis requires additional clinical and, when appropriate, genetic findings.', 'تشخیص سندرم به یافته‌های بالینی و در صورت لزوم ژنتیکی بیشتری نیاز دارد.'), L('Auch ohne Hydrozephalus können kortikale oder andere Entwicklungsanomalien vorliegen.', 'Cortical or other developmental anomalies may be present without hydrocephalus.', 'ناهنجاری قشری یا دیگر ناهنجاری‌های تکاملی می‌توانند بدون هیدروسفالی وجود داشته باشند.')],
    front: L('Wann darf eine Balkenfehlbildung im MRT als isoliert beschrieben werden?', 'When may a callosal malformation be described as isolated on MRI?', 'چه زمانی می‌توان ناهنجاری جسم پینه‌ای را در MRI منفرد توصیف کرد؟'), answer: L('Nach systematischer Suche ohne weitere nachweisbare Hirnfehlbildung; klinische und genetische Einordnung bleiben zusätzlich nötig.', 'After systematic assessment finds no additional brain malformation; clinical and genetic interpretation remains additional.', 'پس از بررسی منظم بدون مشاهدهٔ ناهنجاری مغزی دیگر؛ تفسیر بالینی و ژنتیکی همچنان جداگانه لازم است.'),
  },
])

block('pres', '/gehirn/encephalopathie/pres', L('PRES', 'PRES', 'PRES'), 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7976914/', [
  {
    key: 'adc', goal: L('Vasogenes Ödem mit DWI und ADC einordnen.', 'Interpret vasogenic oedema using DWI and ADC.', 'ادم وازوژنیک را با DWI و ADC تفسیر کنید.'),
    question: L('Unter Immunsuppression treten Krampfanfälle auf. Beidseitige parieto-okzipitale FLAIR-Läsionen sind DWI-hyperintens, das ADC ist erhöht. Welche Deutung passt am besten?', 'A patient receiving immunosuppression develops seizures. Bilateral parieto-occipital FLAIR lesions are bright on DWI with increased ADC. Which interpretation fits best?', 'بیماری تحت درمان سرکوب ایمنی دچار تشنج می‌شود. ضایعات دوطرفهٔ آهیانه‌ای‌ـ‌پس‌سری در FLAIR و DWI روشن‌اند و ADC افزایش یافته است. کدام تفسیر مناسب‌تر است؟'),
    options: [L('Zytotoxisches Ödem aufgrund des hohen DWI-Signals', 'Cytotoxic oedema because DWI signal is high', 'ادم سیتوتوکسیک به‌دلیل سیگنال بالای DWI'), L('Vasogenes Ödem mit möglichem T2-shine-through, vereinbar mit PRES', 'Vasogenic oedema with possible T2 shine-through, compatible with PRES', 'ادم وازوژنیک با احتمال T2 shine-through، سازگار با PRES'), L('Beidseitige akute PCA-Infarkte wegen der posterioren Lage', 'Bilateral acute PCA infarction because of the posterior location', 'انفارکتوس حاد دوطرفهٔ شریان مغزی خلفی به‌دلیل محل خلفی'), L('Chronische Gliose als Erklärung des akuten klinischen Syndroms', 'Chronic gliosis explaining the acute clinical syndrome', 'گلیوز مزمن به‌عنوان توضیح سندرم بالینی حاد')], correct: 'B',
    feedback: L('Erhöhtes ADC unterstützt vasogenes Ödem. Hohes DWI-Signal allein beweist keine Restriktion; Muster und klinischer Auslöser sind mit PRES vereinbar.', 'Increased ADC supports vasogenic oedema. Bright DWI alone does not prove restriction; the pattern and clinical trigger are compatible with PRES.', 'ADC بالا از ادم وازوژنیک حمایت می‌کند. روشن‌بودن DWI به‌تنهایی محدودیت انتشار را ثابت نمی‌کند؛ الگو و زمینهٔ بالینی با PRES سازگارند.'),
    wrong: [L('Bei echter Restriktion erwartet man vermindertes ADC; die DWI-Helligkeit allein genügt nicht.', 'True restriction is associated with reduced ADC; DWI brightness alone is insufficient.', 'در محدودیت واقعی انتظار ADC پایین می‌رود؛ روشن‌بودن DWI کافی نیست.'), L('Ein akuter territorialer Infarkt zeigt typischerweise erniedrigtes ADC; hier sprechen ADC und Verteilung eher für vasogenes Ödem.', 'Acute territorial infarction typically has reduced ADC; here ADC and distribution favour vasogenic oedema.', 'انفارکتوس حاد قلمرویی معمولاً ADC پایین دارد؛ در اینجا ADC و توزیع بیشتر به نفع ادم وازوژنیک‌اند.'), L('Gliose erklärt das akute Syndrom nicht ausreichend; klinischer Verlauf und Ödemmuster müssen berücksichtigt werden.', 'Gliosis does not adequately explain this acute syndrome; consider the clinical course and oedema pattern.', 'گلیوز این سندرم حاد را به‌قدر کافی توضیح نمی‌دهد؛ سیر بالینی و الگوی ادم باید بررسی شوند.')],
    front: L('DWI hell und ADC erhöht bei vermutetem PRES: welche Ödemkomponente?', 'Bright DWI and increased ADC in suspected PRES: which oedema component?', 'DWI روشن و ADC بالا در PRES احتمالی: کدام نوع ادم؟'), answer: L('Überwiegend vasogenes Ödem; T2-shine-through kann die DWI-Helligkeit erklären.', 'Predominantly vasogenic oedema; T2 shine-through may explain DWI brightness.', 'ادم عمدتاً وازوژنیک؛ T2 shine-through می‌تواند روشن‌بودن DWI را توضیح دهد.'),
  },
  {
    key: 'distribution', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7977645/', goal: L('Nichtposteriore PRES-Beteiligung erkennen.', 'Recognise nonposterior involvement in PRES.', 'درگیری غیرخلفی در PRES را تشخیص دهید.'),
    question: L('Bei passendem akuten Syndrom liegen beidseitige posteriore vasogene Ödeme sowie frontale und zerebelläre FLAIR-Läsionen vor. Wie verändert die zusätzliche Verteilung die PRES-Einordnung?', 'With a compatible acute syndrome, bilateral posterior vasogenic oedema is accompanied by frontal and cerebellar FLAIR lesions. How does this additional distribution affect interpretation?', 'در یک سندرم حاد سازگار، ادم وازوژنیک خلفی دوطرفه همراه با ضایعات فرونتال و مخچه‌ای FLAIR دیده می‌شود. این توزیع اضافی چه اثری بر تفسیر PRES دارد؟'),
    options: [L('Sie schließt PRES aus, weil die Läsionen nicht rein posterior sind', 'It excludes PRES because lesions are not purely posterior', 'PRES را رد می‌کند چون ضایعات صرفاً خلفی نیستند'), L('Sie beweist eine demyelinisierende Erkrankung', 'It establishes a demyelinating disorder', 'بیماری دمیلینه‌کننده را ثابت می‌کند'), L('Sie kann zu PRES gehören und muss mit Diffusion und Klinik bewertet werden', 'It can occur in PRES and should be assessed with diffusion and clinical context', 'می‌تواند در PRES دیده شود و باید همراه با انتشار و زمینهٔ بالینی ارزیابی شود'), L('Sie erlaubt ohne Verlauf die Diagnose irreversibler Infarkte', 'It establishes irreversible infarction without follow-up', 'بدون پیگیری، تشخیص انفارکتوس برگشت‌ناپذیر را ممکن می‌کند')], correct: 'C',
    feedback: L('PRES kann frontale, zerebelläre und weitere Regionen betreffen. Eine rein posteriore Verteilung ist keine Voraussetzung.', 'PRES may involve frontal, cerebellar, and other regions. A purely posterior distribution is not required.', 'PRES می‌تواند نواحی فرونتال، مخچه و بخش‌های دیگر را درگیر کند. توزیع صرفاً خلفی شرط تشخیص نیست.'),
    wrong: [L('Der Name beschreibt eine häufige Betonung, keine ausschließliche Lokalisation.', 'The name describes a common predominance, not an exclusive location.', 'نام سندرم محل غالب شایع را توصیف می‌کند، نه محل انحصاری را.'), L('Zusätzliche Regionen sind nicht spezifisch für Demyelinisierung; Muster, Verlauf und Kontext entscheiden.', 'Additional regions are not specific for demyelination; pattern, course, and context matter.', 'درگیری نواحی اضافی اختصاصی دمیلیناسیون نیست؛ الگو، سیر و زمینه اهمیت دارند.'), L('Verteilung allein belegt weder Infarkt noch Irreversibilität.', 'Distribution alone proves neither infarction nor irreversibility.', 'توزیع به‌تنهایی نه انفارکتوس و نه برگشت‌ناپذیری را ثابت می‌کند.')],
    front: L('Schließen frontale oder zerebelläre Läsionen ein PRES aus?', 'Do frontal or cerebellar lesions exclude PRES?', 'آیا ضایعات فرونتال یا مخچه‌ای PRES را رد می‌کنند؟'), answer: L('Nein. PRES kann über die posterioren Regionen hinausreichen; Diffusion und klinischer Kontext bleiben entscheidend.', 'No. PRES may extend beyond posterior regions; diffusion and clinical context remain essential.', 'خیر. PRES می‌تواند فراتر از نواحی خلفی گسترش یابد؛ انتشار و زمینهٔ بالینی همچنان ضروری‌اند.'),
  },
  {
    key: 'restriction', source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7977645/', goal: L('Fokale echte Restriktion als Warnzeichen im PRES-Muster berichten.', 'Report focal true restriction as a warning within a PRES pattern.', 'محدودیت واقعی کانونی را به‌عنوان نشانهٔ هشدار در الگوی PRES گزارش کنید.'),
    question: L('Bei einem PRES-Muster ist das ADC überwiegend erhöht, in einem kortikalen Bezirk jedoch eindeutig erniedrigt bei hohem DWI-Signal. Welche Aussage ist am besten begründet?', 'Within a PRES pattern, ADC is mostly increased but clearly reduced in one cortical area with high DWI signal. Which statement is best supported?', 'در یک الگوی PRES، ADC عمدتاً بالاست ولی در یک ناحیهٔ قشری همراه با DWI بالا، به‌وضوح کاهش یافته است. کدام گزاره مستدل‌تر است؟'),
    options: [L('Überwiegend vasogenes Ödem mit fokaler Restriktion als möglicher zytotoxischer Komponente', 'Predominantly vasogenic oedema with focal restriction as a possible cytotoxic component', 'ادم عمدتاً وازوژنیک همراه با محدودیت کانونی به‌عنوان مؤلفهٔ احتمالی سیتوتوکسیک'), L('Einheitlich vasogenes Ödem; das fokale DWI-Hochsignal entspricht T2-shine-through', 'Uniformly vasogenic oedema; the focal DWI hyperintensity represents T2 shine-through', 'ادم یکدست وازوژنیک؛ سیگنال بالای کانونی DWI ناشی از T2 shine-through است'), L('Akute arterielle Infarzierung sämtlicher FLAIR-auffälliger Regionen', 'Acute arterial infarction of all FLAIR-abnormal regions', 'انفارکتوس حاد شریانی در همهٔ نواحی غیرطبیعی FLAIR'), L('Chronische kortikale Gliose im fokalen Bezirk bei sonst akutem vasogenem Ödem', 'Chronic cortical gliosis in the focal region with acute vasogenic oedema elsewhere', 'گلیوز مزمن قشری در ناحیهٔ کانونی همراه با ادم حاد وازوژنیک در دیگر نواحی')], correct: 'A',
    feedback: L('Echte fokale Restriktion ist von überwiegend vasogenem Ödem getrennt zu dokumentieren; zytotoxische Schädigung beziehungsweise Infarkt ist zu prüfen. Reversibilität ist nicht garantiert.', 'Document true focal restriction separately from predominantly vasogenic oedema; evaluate cytotoxic injury or infarction. Reversibility is not guaranteed.', 'محدودیت واقعی کانونی را جدا از ادم عمدتاً وازوژنیک ثبت کنید؛ آسیب سیتوتوکسیک یا انفارکتوس باید بررسی شود. برگشت‌پذیری تضمین‌شده نیست.'),
    wrong: [L('T2-shine-through allein erklärt kein eindeutig erniedrigtes ADC im selben Bezirk.', 'T2 shine-through alone does not explain clearly reduced ADC in the same region.', 'T2 shine-through به‌تنهایی ADC به‌وضوح پایین در همان ناحیه را توضیح نمی‌دهد.'), L('Die übrigen Regionen haben erhöhtes ADC; deren vasogenes Muster darf nicht mit dem fokal restringierten Bezirk gleichgesetzt werden.', 'Other regions have increased ADC; their vasogenic pattern should not be equated with the focally restricted region.', 'نواحی دیگر ADC بالا دارند؛ الگوی وازوژنیک آن‌ها نباید با ناحیهٔ دارای محدودیت کانونی یکسان تلقی شود.'), L('Chronische Gliose zeigt typischerweise erleichterte statt erniedrigter Diffusion; die geschilderte echte Restriktion verlangt eine akute Einordnung.', 'Chronic gliosis typically shows facilitated rather than reduced diffusion; the described true restriction requires an acute interpretation.', 'گلیوز مزمن معمولاً انتشار تسهیل‌شده دارد، نه کاهش‌یافته؛ محدودیت واقعی توصیف‌شده به تفسیر در زمینهٔ حاد نیاز دارد.')],
    front: L('Was bedeutet ein umschrieben erniedrigtes ADC innerhalb eines PRES-Musters?', 'What does focally reduced ADC within a PRES pattern imply?', 'کاهش کانونی ADC در یک الگوی PRES چه معنایی دارد؟'), answer: L('Mögliche zytotoxische Schädigung; separat berichten und Infarkt beziehungsweise Differenzialdiagnosen prüfen.', 'Possible cytotoxic injury; report separately and evaluate infarction or alternative diagnoses.', 'احتمال آسیب سیتوتوکسیک؛ جداگانه گزارش کنید و انفارکتوس یا تشخیص‌های افتراقی را بررسی کنید.'),
  },
])

block('aq-pvl', '/gehirn/anatomie/pvl', L('Periventrikuläre Leukomalazie', 'Periventricular leukomalacia', 'لوکومالاسی پیرابطنی'), 'https://pubmed.ncbi.nlm.nih.gov/3890765/', [
  {
    key: 'serial-imaging', goal: L('Serielle Sonographie zur Beurteilung einer vermuteten PVL nutzen.', 'Use serial ultrasound to assess suspected PVL.', 'برای ارزیابی PVL احتمالی از سونوگرافی سریال استفاده کنید.'),
    question: L('Ein Frühgeborenes hat periventrikuläre Echogenitätssteigerungen ohne Zysten. Welche Strategie beurteilt eine mögliche Entwicklung zur zystischen PVL am besten?', 'A preterm infant has periventricular echogenicity without cysts. Which strategy best assesses possible evolution to cystic PVL?', 'نوزادی نارس افزایش اکوژنیسیتهٔ پیرابطنی بدون کیست دارد. کدام راهبرد سیر احتمالی به PVL کیستیک را بهتر ارزیابی می‌کند؟'),
    options: [L('Einmalige CT zum Nachweis späterer Kavitation', 'A single CT to establish later cavitation', 'یک CT برای تعیین کیستی‌شدن دیررس'), L('PVL anhand dieser einen Echogenitätssteigerung bestätigen', 'Confirm PVL from this single echogenicity finding', 'تأیید PVL بر اساس همین یک یافتهٔ اکوژن'), L('Serielle kranielle Sonographie mit Dokumentation von Lokalisation und Verlauf', 'Serial cranial ultrasound documenting location and evolution', 'سونوگرافی سریال جمجمه همراه با ثبت محل و سیر یافته‌ها'), L('Eine normale Ventrikelweite als Ausschluss von Marklagerschädigung werten', 'Use normal ventricular size to exclude white-matter injury', 'طبیعی‌بودن اندازهٔ بطن را برای رد آسیب مادهٔ سفید کافی بدانید')], correct: 'C',
    feedback: L('Der Verlauf kann flüchtige Echogenität von persistierenden Veränderungen und späterer Zystenbildung unterscheiden. Ein Einzelbild erfasst diese Entwicklung nicht.', 'Follow-up can distinguish transient echogenicity from persistent changes and later cyst formation. A single examination cannot capture this evolution.', 'پیگیری می‌تواند اکوژنیسیتهٔ گذرا را از تغییرات پایدار و تشکیل بعدی کیست تفکیک کند. یک بررسی منفرد این سیر را نشان نمی‌دهد.'),
    wrong: [L('Eine einzelne CT zeigt keinen sonographischen Verlauf und verursacht Strahlenexposition.', 'A single CT cannot show the ultrasound evolution and involves radiation.', 'یک CT سیر سونوگرافیک را نشان نمی‌دهد و با پرتوگیری همراه است.'), L('Echogenität allein ist unspezifisch; Persistenz und weitere Entwicklung müssen beurteilt werden.', 'Echogenicity alone is nonspecific; assess persistence and evolution.', 'اکوژنیسیته به‌تنهایی غیراختصاصی است؛ پایداری و سیر آن باید ارزیابی شود.'), L('Frühe Marklagerschädigung kann ohne Ventrikelerweiterung vorliegen.', 'Early white-matter injury may occur without ventricular enlargement.', 'آسیب زودرس مادهٔ سفید می‌تواند بدون گشادشدگی بطن وجود داشته باشد.')],
    front: L('Warum ist ein einzelner echoreicher periventrikulärer Befund kein sicherer PVL-Nachweis?', 'Why does a single echogenic periventricular finding not establish PVL?', 'چرا یک یافتهٔ اکوژن پیرابطنی PVL را قطعی نمی‌کند؟'), answer: L('Echogenität ist unspezifisch; serielle Untersuchungen zeigen Persistenz, Zystenbildung oder Rückbildung.', 'Echogenicity is nonspecific; serial examinations demonstrate persistence, cyst formation, or resolution.', 'اکوژنیسیته غیراختصاصی است؛ بررسی‌های سریال پایداری، تشکیل کیست یا پسرفت را نشان می‌دهند.'),
  },
  {
    key: 'late-evolution', goal: L('Spätere Ventrikelerweiterung nach Rückbildung von PVL-Zysten einordnen.', 'Interpret late ventricular enlargement after PVL cysts resolve.', 'گشادشدگی دیررس بطن را پس از ناپدیدشدن کیست‌های PVL تفسیر کنید.'),
    question: L('Frühere Sonographien zeigen bilaterale periventrikuläre Zysten. Später sind diese nicht mehr sichtbar; die Ventrikel sind nun unregelmäßig erweitert und das Marklager vermindert. Welche Einordnung ist am besten?', 'Earlier ultrasound showed bilateral periventricular cysts. They are no longer visible, but ventricles are irregularly enlarged with reduced white matter. Which interpretation fits best?', 'سونوگرافی‌های قبلی کیست‌های پیرابطنی دوطرفه را نشان داده‌اند. اکنون کیست‌ها دیده نمی‌شوند، اما بطن‌ها نامنظم و گشادند و مادهٔ سفید کاهش یافته است. کدام تفسیر مناسب‌تر است؟'),
    options: [L('Spätfolge mit Gewebeverlust nach zystischer PVL', 'Late tissue loss following cystic PVL', 'کاهش دیررس بافت پس از PVL کیستیک'), L('Vollständige Heilung, weil keine Zysten mehr vorliegen', 'Complete recovery because cysts are no longer present', 'بهبودی کامل چون دیگر کیستی وجود ندارد'), L('Aquäduktverschluss als durch diese Befunde bewiesene Ursache', 'Aqueductal obstruction established by these findings', 'انسداد مجرای سیلویوس (آکوئداکت) به‌عنوان علت ثابت‌شده با این یافته‌ها'), L('Ein isoliertes normales Variantenmuster ohne Zusammenhang zum Vorbefund', 'An isolated normal variant unrelated to prior findings', 'یک واریانت طبیعی منفرد بدون ارتباط با یافته‌های قبلی')], correct: 'A',
    feedback: L('Zysten können im Verlauf verschwinden, während Gewebeverlust und Ventrikelerweiterung zurückbleiben. Der Vorbefund verhindert eine fälschliche Normalisierung.', 'Cysts may disappear while tissue loss and ventricular enlargement remain. Prior imaging prevents a false interpretation of normalisation.', 'کیست‌ها ممکن است ناپدید شوند ولی کاهش بافت و گشادشدگی بطن باقی بماند. تصاویر قبلی از تفسیر نادرست به‌عنوان طبیعی‌شدن جلوگیری می‌کنند.'),
    wrong: [L('Das Verschwinden der Zysten beweist keine Wiederherstellung des verlorenen Marklagers.', 'Disappearance of cysts does not demonstrate restoration of lost white matter.', 'ناپدیدشدن کیست‌ها بازسازی مادهٔ سفید ازدست‌رفته را ثابت نمی‌کند.'), L('Die geschilderte Entwicklung mit Marklagerverlust spricht für eine ex-vacuo-Komponente; ein Verschluss benötigt einen eigenen Nachweis.', 'The evolution with white-matter loss supports an ex-vacuo component; obstruction requires separate evidence.', 'سیر همراه با کاهش مادهٔ سفید به نفع مؤلفهٔ جبرانی است؛ انسداد به شواهد جداگانه نیاز دارد.'), L('Die dokumentierten früheren Zysten und der Gewebeverlust sprechen gegen eine unverbundene Normalvariante.', 'Documented earlier cysts and tissue loss argue against an unrelated normal variant.', 'کیست‌های ثبت‌شدهٔ قبلی و کاهش بافت با یک واریانت طبیعی بی‌ارتباط سازگار نیستند.')],
    front: L('Schließt das spätere Verschwinden periventrikulärer Zysten eine vorausgegangene PVL aus?', 'Does later disappearance of periventricular cysts exclude prior PVL?', 'آیا ناپدیدشدن دیررس کیست‌های پیرابطنی PVL قبلی را رد می‌کند؟'), answer: L('Nein; Zysten können zurückgehen, während Marklagerverlust und unregelmäßige Ventrikelerweiterung fortbestehen.', 'No; cysts can resolve while white-matter loss and irregular ventricular enlargement persist.', 'خیر؛ کیست‌ها می‌توانند ناپدید شوند و کاهش مادهٔ سفید و گشادشدگی نامنظم بطن باقی بماند.'),
  },
  {
    key: 'modality', source: 'https://pubmed.ncbi.nlm.nih.gov/10228300/', goal: L('Sonographische Echogenität und MRT-Diffusion sprachlich korrekt unterscheiden.', 'Distinguish ultrasound echogenicity from MRI diffusion terminology.', 'اصطلاحات اکوژنیسیتهٔ سونوگرافی و انتشار MRI را درست تفکیک کنید.'),
    question: L('Bei vermuteter akuter Marklagerschädigung eines Frühgeborenen zeigt das MRT periventrikuläres DWI-Hochsignal. Welche Zusatzinformation unterscheidet echte Restriktion am gezieltesten von T2-shine-through?', 'MRI in a preterm infant with suspected acute white-matter injury shows periventricular DWI hyperintensity. Which additional information most directly distinguishes true restriction from T2 shine-through?', 'MRI نوزاد نارس با احتمال آسیب حاد مادهٔ سفید، سیگنال بالای DWI پیرابطنی را نشان می‌دهد. کدام اطلاعات تکمیلی مستقیماً محدودیت واقعی را از T2 shine-through تفکیک می‌کند؟'),
    options: [L('T2-Signalintensität der betroffenen Region', 'T2 signal intensity in the affected region', 'شدت سیگنال T2 در ناحیهٔ درگیر'), L('Echogenität in einer früheren kraniellen Sonographie', 'Echogenicity on an earlier cranial ultrasound', 'اکوژنیسیته در سونوگرافی قبلی جمجمه'), L('T1-Signalintensität der betroffenen Region', 'T1 signal intensity in the affected region', 'شدت سیگنال T1 در ناحیهٔ درگیر'), L('ADC-Werte derselben DWI-auffälligen Region', 'ADC values in the same DWI-abnormal region', 'مقادیر ADC در همان ناحیهٔ غیرطبیعی DWI')], correct: 'D',
    feedback: L('DWI muss mit der zugehörigen ADC-Karte verglichen werden. Erniedrigtes ADC unterstützt echte Restriktion; sonographische Echogenität ist kein Ersatz für diese Prüfung.', 'Compare DWI with the corresponding ADC map. Reduced ADC supports true restriction; ultrasound echogenicity does not replace this assessment.', 'DWI را با نقشهٔ ADC متناظر مقایسه کنید. ADC پایین از محدودیت واقعی حمایت می‌کند؛ اکوژنیسیتهٔ سونوگرافی جای این ارزیابی را نمی‌گیرد.'),
    wrong: [L('T2-Hochsignal kann zum shine-through beitragen, beweist aber keine eingeschränkte Diffusion.', 'High T2 signal may contribute to shine-through but does not establish restricted diffusion.', 'سیگنال بالای T2 می‌تواند در shine-through نقش داشته باشد، اما محدودیت انتشار را ثابت نمی‌کند.'), L('Sonographie hilft beim Verlauf; ihre Echogenität quantifiziert die MR-Diffusion nicht.', 'Ultrasound helps with follow-up; its echogenicity does not quantify MR diffusion.', 'سونوگرافی در پیگیری مفید است؛ اکوژنیسیتهٔ آن انتشار MRI را کمی‌سازی نمی‌کند.'), L('T1-Signal charakterisiert das Gewebe, unterscheidet diese beiden DWI-Mechanismen aber nicht direkt.', 'T1 signal characterises tissue but does not directly distinguish these two DWI mechanisms.', 'سیگنال T1 بافت را توصیف می‌کند، ولی این دو سازوکار DWI را مستقیماً تفکیک نمی‌کند.')],
    front: L('Mit welchen MRT-Daten wird echte Diffusionsrestriktion geprüft?', 'Which MRI data are used to evaluate true diffusion restriction?', 'برای بررسی محدودیت واقعی انتشار از کدام داده‌های MRI استفاده می‌شود؟'), answer: L('DWI zusammen mit der ADC-Karte; DWI-Helligkeit allein genügt nicht.', 'DWI together with the ADC map; DWI brightness alone is insufficient.', 'DWI همراه با نقشهٔ ADC؛ روشن‌بودن DWI به‌تنهایی کافی نیست.'),
  },
])

block('chiari-malformation', '/gehirn/anatomie/chiari', L('Chiari-Malformation', 'Chiari malformation', 'مالفورماسیون کیاری'), 'https://www.cns.org/guidelines/browse-guidelines-detail/1-imaging', [
  {
    key: 'associated-syrinx', goal: L('Eine auf das Gehirn begrenzte Chiari-Abklärung gezielt ergänzen.', 'Target further imaging after a brain-only Chiari assessment.', 'بررسی کیاری محدود به مغز را هدفمند تکمیل کنید.'),
    question: L('Im kranialen MRT ist ein Chiari-I-Muster erkennbar. Bei Handparästhesien ist das Rückenmark bisher nicht untersucht. Welche Ergänzung ist am sinnvollsten?', 'Brain MRI shows a Chiari I pattern. The patient has hand paraesthesia, but the spinal cord has not been imaged. Which addition is most useful?', 'MRI مغز الگوی کیاری I را نشان می‌دهد. بیمار پارستزی دست دارد ولی نخاع هنوز بررسی نشده است. کدام بررسی تکمیلی سودمندتر است؟'),
    options: [L('Erneute kraniale MRT mit dünnschichtiger Tonsillenmessung', 'Repeat brain MRI with thin-section tonsillar measurement', 'تکرار MRI مغز با اندازه‌گیری لوزه‌ها در برش‌های نازک'), L('CT des kraniozervikalen Übergangs zur knöchernen Morphologie', 'CT of the craniocervical junction to assess osseous morphology', 'CT محل اتصال جمجمه و گردن برای بررسی شکل‌شناسی استخوانی'), L('Spinale MRT zur Suche insbesondere nach einer Syrinx', 'Spinal MRI to evaluate particularly for a syrinx', 'MRI نخاع برای بررسی به‌ویژه سیرنگومیلی'), L('Cine-Phasenkontrast-MRT am Foramen magnum', 'Cine phase-contrast MRI at the foramen magnum', 'MRI سینمایی فازکنتراست در سوراخ بزرگ پس‌سری')], correct: 'C',
    feedback: L('Eine Syrinx ist ein klinisch relevanter Begleitbefund. Die CNS-Leitlinie hält ergänzende Bildgebung von Gehirn und Wirbelsäule bei unvollständiger Ausgangsuntersuchung für hilfreich (Grad C).', 'A syrinx is a clinically relevant associated finding. The CNS guideline considers additional brain and spine imaging potentially helpful after incomplete initial imaging (Grade C).', 'سیرنگومیلی یافتهٔ همراه مهمی از نظر بالینی است. راهنمای CNS بررسی تکمیلی مغز و ستون فقرات را پس از بررسی اولیهٔ ناکامل بالقوه مفید می‌داند (درجهٔ C).'),
    wrong: [L('Die Tonsillenlage beantwortet die Frage nach einer Rückenmarkshöhle nicht.', 'Tonsillar position does not answer whether a spinal cord cavity is present.', 'موقعیت لوزه‌ها وجود حفره در نخاع را مشخص نمی‌کند.'), L('Die CT kann knöcherne Begleitveränderungen klären, beurteilt aber eine intramedulläre Syrinx nicht angemessen.', 'CT can clarify associated osseous abnormalities but does not adequately assess an intramedullary syrinx.', 'CT می‌تواند ناهنجاری‌های استخوانی همراه را روشن کند، ولی ارزیابی مناسبی برای سیرنگومیلی داخل نخاعی نیست.'), L('Cine-MRT ergänzt die Flussbeurteilung am Foramen magnum, ersetzt aber keine Darstellung des Rückenmarks.', 'Cine MRI adds foramen-magnum flow assessment but does not replace spinal cord imaging.', 'MRI سینمایی بررسی جریان در سوراخ بزرگ را تکمیل می‌کند، ولی جای تصویربرداری نخاع را نمی‌گیرد.')],
    front: L('Welcher spinale Begleitbefund ist bei Chiari I besonders wichtig?', 'Which spinal associated finding is especially important in Chiari I?', 'کدام یافتهٔ همراه نخاعی در کیاری I اهمیت ویژه دارد؟'), answer: L('Eine Syringomyelie; bei unvollständiger Ausgangsbildgebung kann eine spinale MRT die Abklärung ergänzen.', 'Syringomyelia; spinal MRI can supplement incomplete initial imaging.', 'سیرنگومیلی؛ MRI نخاع می‌تواند بررسی تصویربرداری اولیهٔ ناکامل را تکمیل کند.'),
  },
  {
    key: 'cine-limits', goal: L('Den prädiktiven Stellenwert der Cine-MRT begrenzen.', 'Recognise limits of cine MRI in predicting treatment benefit.', 'محدودیت MRI سینمایی در پیش‌بینی سود درمان را بشناسید.'),
    question: L('Bei Chiari I soll eine Cine-MRT über eine Dekompression entscheiden. Welche Aussage zum Untersuchungsergebnis ist korrekt?', 'In Chiari I, cine MRI is requested to guide a decompression decision. Which statement about its result is correct?', 'در کیاری I، MRI سینمایی برای کمک به تصمیم دکمپرشن درخواست شده است. کدام گزاره دربارهٔ نتیجهٔ آن درست است؟'),
    options: [L('Ein pathologischer Flussbefund garantiert einen klinischen Operationserfolg', 'Abnormal flow guarantees clinical surgical benefit', 'جریان غیرطبیعی سود بالینی جراحی را تضمین می‌کند'), L('Cine-MRT kann den Liquorfluss ergänzend darstellen; eine zuverlässige Vorhersage des Operationserfolgs ist nicht gesichert', 'Cine MRI can add CSF flow information; reliable prediction of surgical benefit is not established', 'MRI سینمایی اطلاعات تکمیلی جریان CSF می‌دهد؛ پیش‌بینی قابل اتکای سود جراحی ثابت نشده است'), L('Ein normaler Flussbefund schließt eine klinisch relevante Chiari-Konstellation aus', 'Normal flow excludes clinically relevant Chiari malformation', 'جریان طبیعی کیاری مهم از نظر بالینی را رد می‌کند'), L('Die Flussgeschwindigkeit ersetzt die Beurteilung von Symptomen und Syrinx', 'Flow velocity replaces assessment of symptoms and syrinx', 'سرعت جریان جای ارزیابی علائم و سیرنگومیلی را می‌گیرد')], correct: 'B',
    feedback: L('Die CNS-Leitlinie bewertet die Studien als uneinheitlich: Cine-MRT kann einen Nutzen vorhersagen oder auch nicht. Sie ergänzt Morphologie und Klinik, entscheidet aber nicht allein.', 'The CNS guideline finds mixed evidence: cine MRI may or may not predict benefit. It supplements morphology and clinical assessment rather than deciding alone.', 'راهنمای CNS شواهد را ناهمگون می‌داند: MRI سینمایی ممکن است سود را پیش‌بینی کند یا نکند. این روش مکمل شکل‌شناسی و ارزیابی بالینی است و به‌تنهایی تعیین‌کننده نیست.'),
    wrong: [L('Die Evidenz erlaubt keine Erfolgsgarantie aus einem Flussbefund.', 'The evidence does not support a guarantee of benefit from a flow finding.', 'شواهد اجازهٔ تضمین سود بر اساس یافتهٔ جریان را نمی‌دهند.'), L('Ein normaler Cine-Befund ist kein verlässlicher alleiniger Ausschlusstest.', 'A normal cine study is not a reliable standalone exclusion test.', 'MRI سینمایی طبیعی آزمون ردکنندهٔ قابل اتکایی به‌تنهایی نیست.'), L('Symptome und strukturelle Begleitbefunde bleiben für die Entscheidung wesentlich.', 'Symptoms and structural associated findings remain essential to the decision.', 'علائم و یافته‌های ساختاری همراه همچنان برای تصمیم ضروری‌اند.')],
    front: L('Kann Cine-MRT bei Chiari I den Erfolg einer Dekompression sicher vorhersagen?', 'Can cine MRI reliably guarantee decompression benefit in Chiari I?', 'آیا MRI سینمایی در کیاری I سود دکمپرشن را با قطعیت پیش‌بینی می‌کند؟'), answer: L('Nein. Die Evidenz ist uneinheitlich; Flussbefunde ergänzen Klinik, Morphologie und Begleitbefunde.', 'No. Evidence is mixed; flow findings supplement symptoms, morphology, and associated findings.', 'خیر. شواهد ناهمگون‌اند؛ یافته‌های جریان مکمل علائم، شکل‌شناسی و یافته‌های همراه‌اند.'),
  },
])

block('aq-hsv-enzephalitis', '/gehirn/infektionen/herpes-enzephalitis', L('HSV-Enzephalitis', 'HSV encephalitis', 'آنسفالیت HSV'), 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4462661/', [
  {
    key: 'limbic-pattern', goal: L('Ein klinisch passendes limbisches Entzündungsmuster erkennen.', 'Recognise a limbic inflammatory pattern in a compatible clinical presentation.', 'الگوی التهابی لیمبیک را در تظاهر بالینی سازگار تشخیص دهید.'),
    question: L('Ein Erwachsener mit Fieber, Verwirrtheit und fokalen Anfällen: MRT zeigt asymmetrische mesiotemporale und insuläre FLAIR-Läsionen, teils mit Restriktion. Welche Diagnose muss vorrangig erwogen werden?', 'In an adult, fever, confusion, and focal seizures accompany asymmetric mesial temporal and insular FLAIR lesions, partly with restriction. Which diagnosis must be prioritised?', 'در یک بزرگسال، تب، گیجی و تشنج کانونی همراه با ضایعات نامتقارن FLAIR تمپورال داخلی و اینسولا با محدودیت انتشار در بعضی بخش‌ها دیده می‌شود. کدام تشخیص باید در اولویت باشد؟'),
    options: [L('HSV-Enzephalitis', 'HSV encephalitis', 'آنسفالیت HSV'), L('Autoimmune limbische Enzephalitis', 'Autoimmune limbic encephalitis', 'آنسفالیت لیمبیک خودایمنی'), L('Periiktale Signalveränderungen nach fokalen Anfällen', 'Peri-ictal signal changes after focal seizures', 'تغییرات سیگنال پری‌ایکتال پس از تشنج کانونی'), L('Ischämischer Infarkt im PCA-Territorium', 'Ischaemic infarction in the PCA territory', 'انفارکتوس ایسکمیک در قلمرو شریان مغزی خلفی')], correct: 'A',
    feedback: L('Der akute fieberhafte Verlauf mit limbisch-insulärer Beteiligung ist verdächtig auf HSV. Das MRT stützt den Verdacht, identifiziert den Erreger jedoch nicht allein.', 'The acute febrile course with limbic-insular involvement raises concern for HSV. MRI supports suspicion but does not identify the pathogen alone.', 'سیر حاد همراه با تب و درگیری لیمبیک‌ـ‌اینسولار شک به HSV را مطرح می‌کند. MRI از احتمال تشخیص حمایت می‌کند، ولی به‌تنهایی عامل بیماری را مشخص نمی‌کند.'),
    wrong: [L('Das ist eine wichtige Differenzialdiagnose. Beim akut fieberhaften temporoinsulären Syndrom muss ein behandelbarer HSV-Verdacht jedoch vorrangig abgeklärt werden; das MRT trennt beide nicht sicher.', 'This is an important differential. In an acute febrile temporoinsular syndrome, however, treatable HSV must be prioritised; MRI does not reliably separate the two.', 'این افتراق مهمی است. بااین‌حال در سندرم حاد همراه با تب و درگیری تمپورال‌ـ‌اینسولار، HSV قابل درمان باید در اولویت بررسی باشد؛ MRI این دو را با اطمینان جدا نمی‌کند.'), L('Periiktale Veränderungen können imitieren; sie erklären aber einen zugrunde liegenden fieberhaften Enzephalitisprozess nicht und dürfen dessen Abklärung nicht ersetzen.', 'Peri-ictal changes can mimic this pattern, but they do not explain an underlying febrile encephalitic process and must not replace its evaluation.', 'تغییرات پری‌ایکتال می‌توانند تقلیدکننده باشند، اما فرایند زمینه‌ای آنسفالیت همراه با تب را توضیح نمی‌دهند و نباید جای بررسی آن را بگیرند.'), L('Die insuläre und mesiotemporale Verteilung überschreitet hier ein typisches PCA-Muster; Infarktverteilung und Gefäßbefund wären gesondert zu prüfen.', 'The insular and mesial temporal distribution extends beyond a typical PCA pattern; assess infarct distribution and vessels separately.', 'توزیع اینسولار و تمپورال داخلی فراتر از الگوی معمول PCA است؛ توزیع انفارکتوس و عروق باید جداگانه بررسی شوند.')],
    front: L('Welche Lokalisationen unterstützen im akuten fieberhaften Syndrom einen HSV-Verdacht?', 'Which locations support HSV suspicion in an acute febrile syndrome?', 'در سندرم حاد همراه با تب، کدام محل‌ها از احتمال HSV حمایت می‌کنند؟'), answer: L('Asymmetrisch mesiotemporal, insulär und gegebenenfalls inferofrontal; nicht allein erregerspezifisch.', 'Asymmetric mesial temporal, insular, and sometimes inferofrontal involvement; not pathogen-specific alone.', 'درگیری نامتقارن تمپورال داخلی، اینسولا و گاهی فرونتال تحتانی؛ این الگو به‌تنهایی اختصاصی عامل بیماری نیست.'),
  },
  {
    key: 'mimic', goal: L('HSV-Muster von ätiologischem Nachweis unterscheiden.', 'Distinguish a suggestive HSV pattern from etiological proof.', 'الگوی مطرح‌کنندهٔ HSV را از اثبات علت تفکیک کنید.'),
    question: L('Bei einem Erwachsenen wird eine limbische Enzephalitis wegen temporaler MRT-Läsionen als HSV diskutiert. Welcher Befund würde die ätiologische Einordnung am direktesten ergänzen?', 'In an adult, HSV is considered in limbic encephalitis because of temporal MRI lesions. Which finding most directly adds etiological information?', 'در یک بزرگسال، به‌دلیل ضایعات تمپورال MRI، HSV در آنسفالیت لیمبیک مطرح شده است. کدام یافته مستقیماً اطلاعات علت‌شناختی بیشتری می‌دهد؟'),
    options: [L('EEG zur Erfassung epileptischer Aktivität', 'EEG to detect epileptic activity', 'EEG برای بررسی فعالیت صرعی'), L('Einzelner positiver HSV-IgG-Nachweis im Serum', 'A single positive serum HSV IgG result', 'یک نتیجهٔ مثبت IgG ویروس HSV در سرم'), L('HSV-PCR im Liquor, interpretiert mit Krankheitszeitpunkt und Klinik', 'CSF HSV PCR interpreted with illness timing and clinical findings', 'PCR ویروس HSV در مایع مغزی‌نخاعی با تفسیر بر اساس زمان بیماری و یافته‌های بالینی'), L('MR-Spektroskopie des betroffenen Temporallappens', 'MR spectroscopy of the affected temporal lobe', 'اسپکتروسکوپی MR لوب تمپورال درگیر')], correct: 'C', source: 'https://onlinelibrary.wiley.com/doi/10.1111/ene.70647',
    feedback: L('Liquor-PCR liefert Erregerinformation; frühe negative Ergebnisse müssen im klinischen Kontext bewertet werden. Autoimmune und andere infektiöse Ursachen können ähnliche temporale MRT-Muster haben.', 'CSF PCR provides pathogen information; early negative results require clinical interpretation. Autoimmune and other infectious causes can have similar temporal MRI patterns.', 'PCR مایع مغزی‌نخاعی اطلاعات عامل بیماری را فراهم می‌کند؛ نتیجهٔ منفی زودرس به تفسیر بالینی نیاز دارد. علل خودایمنی و دیگر عفونت‌ها می‌توانند الگوهای مشابه تمپورال در MRI داشته باشند.'),
    wrong: [L('EEG ist bei Anfällen wichtig, liefert aber keinen direkten HSV-Erregernachweis.', 'EEG is important for seizures but does not directly demonstrate HSV.', 'EEG در تشنج مهم است، ولی HSV را مستقیماً اثبات نمی‌کند.'), L('Serum-IgG kann eine frühere Exposition anzeigen und belegt keine aktuelle HSV-Infektion des ZNS.', 'Serum IgG may indicate prior exposure and does not establish current CNS HSV infection.', 'IgG سرم می‌تواند مواجههٔ قبلی را نشان دهد و عفونت فعلی HSV در دستگاه عصبی مرکزی را ثابت نمی‌کند.'), L('Spektroskopie beschreibt Stoffwechselveränderungen, identifiziert HSV jedoch nicht zuverlässig.', 'Spectroscopy describes metabolic changes but does not reliably identify HSV.', 'اسپکتروسکوپی تغییرات متابولیک را توصیف می‌کند، ولی HSV را با اطمینان مشخص نمی‌کند.')],
    front: L('Welche ätiologische Untersuchung ergänzt beim Erwachsenen ein HSV-verdächtiges MRT-Muster, und warum ist der Zeitpunkt wichtig?', 'Which etiological test complements an HSV-suspicious MRI pattern in an adult, and why does timing matter?', 'در بزرگسال، کدام آزمون علت‌شناختی مکمل الگوی MRI مشکوک به HSV است و چرا زمان انجام آن اهمیت دارد؟'), answer: L('Liquor-HSV-PCR im klinischen Kontext; der Krankheitszeitpunkt beeinflusst die Interpretation eines negativen Tests.', 'CSF HSV PCR, interpreted with clinical findings; timing affects interpretation of a negative test.', 'PCR ویروس HSV در مایع مغزی‌نخاعی همراه با یافته‌های بالینی؛ زمان بر تفسیر آزمون منفی اثر دارد.'),
  },
  {
    key: 'urgent-communication', goal: L('Zeitkritischen HSV-Verdacht unmittelbar kommunizieren.', 'Communicate time-critical HSV suspicion immediately.', 'احتمال زمان‌حساس HSV را بی‌درنگ اطلاع دهید.'),
    question: L('Bei einem Erwachsenen mit klinischem Enzephalitisverdacht zeigt das MRT ein passendes temporoinsuläres Muster. Die Liquor-PCR steht aus. Welche radiologische Empfehlung passt?', 'In an adult with clinically suspected encephalitis, MRI shows a compatible temporoinsular pattern. CSF PCR is pending. Which radiology recommendation fits?', 'در یک بزرگسال با شک بالینی به آنسفالیت، MRI الگوی سازگار تمپورال‌ـ‌اینسولار نشان می‌دهد. PCR مایع مغزی‌نخاعی هنوز آماده نیست. کدام توصیهٔ رادیولوژیک مناسب است؟'),
    options: [L('Zunächst CT-Perfusion zur Abgrenzung einer periiktalen Veränderung abwarten', 'First await CT perfusion to distinguish peri-ictal change', 'ابتدا برای افتراق تغییرات پری‌ایکتال منتظر CT پرفیوژن بمانید'), L('Den Verdacht unmittelbar dem Behandlungsteam melden, damit zeitkritische Abklärung und empirische Therapie erfolgen können', 'Immediately communicate the suspicion to enable time-critical evaluation and empirical treatment', 'احتمال را بی‌درنگ به تیم درمان اطلاع دهید تا ارزیابی و درمان تجربی زمان‌حساس انجام شود'), L('Die infektiologische Behandlung bis zur vollständigen EEG-Abklärung der Anfälle zurückstellen', 'Defer infection-directed treatment until EEG evaluation of seizures is complete', 'درمان ضدعفونت را تا تکمیل بررسی EEG تشنج‌ها به تعویق بیندازید'), L('Vor einer Behandlung zunächst das Ergebnis eines Autoantikörperpanels abwarten', 'Await an autoantibody panel result before treatment', 'پیش از درمان ابتدا منتظر نتیجهٔ پنل خودآنتی‌بادی بمانید')], correct: 'B', source: 'https://onlinelibrary.wiley.com/doi/10.1111/ene.70647',
    feedback: L('Bei vermuteter infektiöser Enzephalitis ist die Behandlung zeitkritisch. Die EAN/ESCMID-Leitlinie 2026 empfiehlt den raschen Beginn intravenösen Aciclovirs bei Verdacht; der radiologische Verdacht muss deshalb direkt kommuniziert werden.', 'Treatment of suspected infectious encephalitis is time-critical. The 2026 EAN/ESCMID guideline recommends prompt intravenous aciclovir when suspected; communicate the radiological concern directly.', 'درمان آنسفالیت عفونی احتمالی زمان‌حساس است. راهنمای EAN/ESCMID سال ۲۰۲۶ شروع سریع آسیکلوویر وریدی را در صورت شک توصیه می‌کند؛ بنابراین نگرانی رادیولوژیک باید مستقیم اطلاع داده شود.'),
    wrong: [L('Periiktale Veränderungen sind eine Differenzialdiagnose; zusätzliche Perfusion darf die Meldung des zeitkritischen HSV-Verdachts nicht verzögern.', 'Peri-ictal change is a differential, but additional perfusion must not delay communicating time-critical HSV suspicion.', 'تغییرات پری‌ایکتال یک افتراق‌اند، اما پرفیوژن تکمیلی نباید اطلاع‌رسانی احتمال زمان‌حساس HSV را به تأخیر بیندازد.'), L('EEG kann parallel für die Anfallsabklärung nötig sein; es ersetzt oder verzögert die empirische antiinfektive Behandlung nicht.', 'EEG may be needed in parallel for seizure assessment; it does not replace or delay empirical anti-infective treatment.', 'EEG ممکن است هم‌زمان برای ارزیابی تشنج لازم باشد؛ جای درمان تجربی ضدویروسی را نمی‌گیرد و آن را به تأخیر نمی‌اندازد.'), L('Autoimmune Enzephalitis bleibt eine Differenzialdiagnose, aber ausstehende Antikörperresultate sind kein Grund, einen behandelbaren HSV-Verdacht unbehandelt zu lassen.', 'Autoimmune encephalitis remains a differential, but pending antibody results do not justify leaving suspected treatable HSV untreated.', 'آنسفالیت خودایمنی همچنان یک افتراق است، ولی آماده‌نبودن نتیجهٔ آنتی‌بادی دلیل درمان‌نکردن HSV احتمالی و قابل درمان نیست.')],
    front: L('Welche unmittelbare Aufgabe hat die Radiologie bei einem HSV-verdächtigen MRT-Muster beim Erwachsenen?', 'What is radiology’s immediate role when MRI suggests HSV in an adult?', 'وظیفهٔ فوری رادیولوژی در الگوی MRI مشکوک به HSV در بزرگسال چیست؟'), answer: L('Den zeitkritischen Verdacht direkt kommunizieren; die klinische Abklärung und empirische Behandlung dürfen nicht auf eine spätere MRT warten.', 'Communicate the time-critical suspicion directly; clinical evaluation and empirical treatment must not wait for later MRI.', 'احتمال زمان‌حساس را مستقیم اطلاع دهید؛ ارزیابی بالینی و درمان تجربی نباید منتظر MRI دیرتر بمانند.'),
  },
])

block('aq-hirnabszess', '/gehirn/infektionen/hirnabszess', L('Hirnabszess', 'Brain abscess', 'آبسهٔ مغزی'), 'https://pubmed.ncbi.nlm.nih.gov/11673170/', [
  {
    key:'centre-diffusion', goal:L('Zentrale Diffusionsrestriktion in eine klinische Differenzialdiagnose einordnen.', 'Interpret central diffusion restriction in a clinical differential.', 'محدودیت انتشار مرکزی را در افتراق بالینی تفسیر کنید.'),
    question:L('Ein fieberhafter Patient mit Bakteriämie hat eine glatt ringförmig anreichernde Hirnläsion. Das Zentrum ist auf DWI hell und im ADC niedrig. Welche Diagnose wird dadurch am stärksten unterstützt?', 'A febrile patient with bacteraemia has a smoothly ring-enhancing brain lesion. Its centre is bright on DWI and low on ADC. Which diagnosis is most strongly supported?', 'بیماری تب‌دار با باکتریمی، ضایعهٔ مغزی با افزایش سیگنال حلقوی صاف دارد. مرکز در DWI روشن و در ADC پایین است. کدام تشخیص بیشتر حمایت می‌شود؟'),
    options:[L('Pyogener Hirnabszess','Pyogenic brain abscess','آبسهٔ چرکی مغز'),L('Nekrotische Hirnmetastase','Necrotic brain metastasis','متاستاز نکروتیک مغزی'),L('Nekrotisches Glioblastom','Necrotic glioblastoma','گلیوبلاستومای نکروتیک'),L('Tumefaktive demyelinisierende Läsion','Tumefactive demyelinating lesion','ضایعهٔ دمیلینه‌کنندهٔ تومورمانند')],correct:'A',
    feedback:L('Infektionskontext, glatte Kapsel und zentrale Restriktion stützen einen pyogenen Abszess. Restriktion allein ist nicht pathognomonisch; einzelne Tumoren können ebenfalls zentral niedrige ADC-Werte haben.', 'Infectious context, a smooth capsule, and central restriction support a pyogenic abscess. Restriction alone is not pathognomonic; some tumours also have centrally low ADC.', 'زمینهٔ عفونی، کپسول صاف و محدودیت مرکزی از آبسهٔ چرکی حمایت می‌کنند. محدودیت انتشار به‌تنهایی پاتوگنومونیک نیست؛ بعضی تومورها نیز ADC پایین مرکزی دارند.'),
    wrong:[L('Eine Metastase kann ausnahmsweise zentral restriktieren; im beschriebenen Infektionskontext ist der Abszess jedoch wahrscheinlicher.', 'A metastasis can occasionally restrict centrally, but abscess is more likely in the described infectious context.', 'متاستاز گاهی می‌تواند در مرکز محدودیت داشته باشد، ولی در زمینهٔ عفونی توصیف‌شده آبسه محتمل‌تر است.'),L('Nekrotische Tumorzentren zeigen häufiger erleichterte Diffusion; Klinik und Kapsel sprechen hier stärker für Abszess.', 'Necrotic tumour centres more often show facilitated diffusion; clinical context and capsule here favour abscess.', 'مراکز نکروتیک تومور اغلب انتشار تسهیل‌شده دارند؛ زمینهٔ بالینی و کپسول در اینجا بیشتر به نفع آبسه‌اند.'),L('Demyelinisierung kann ringförmig aufnehmen; die zentrale Restriktion mit Bakteriämie passt hier besser zum Abszess.', 'Demyelination can enhance in a ring, but central restriction with bacteraemia fits abscess better here.', 'دمیلیناسیون می‌تواند حلقوی افزایش سیگنال دهد، ولی محدودیت مرکزی همراه با باکتریمی در اینجا بیشتر با آبسه سازگار است.')],
    front:L('Wie wird zentrale DWI-Helligkeit mit niedrigem ADC bei einer Ringläsion eingeordnet?', 'How is central bright DWI with low ADC interpreted in a ring lesion?', 'DWI روشن مرکزی همراه ADC پایین در ضایعهٔ حلقوی چگونه تفسیر می‌شود؟'),answer:L('Als echte Restriktion, die einen Abszess unterstützt; kein alleiniger Erreger- oder Diagnosenachweis.', 'As true restriction supporting abscess; not standalone proof of diagnosis or pathogen.', 'به‌عنوان محدودیت واقعی که از آبسه حمایت می‌کند؛ نه اثبات مستقل تشخیص یا عامل بیماری.'),
  },
  {
    key:'protocol',goal:L('Eine ringförmige Läsion mit einem geeigneten MRT-Protokoll weiter abklären.', 'Investigate a ring lesion with an appropriate MRI protocol.', 'ضایعهٔ حلقوی را با پروتکل مناسب MRI بیشتر بررسی کنید.'),source:'https://pubmed.ncbi.nlm.nih.gov/37648062/',
    question:L('Das Kontrast-CT zeigt bei Abszessverdacht eine Ringläsion. Eine MRT ist verfügbar und möglich. Welche Ergänzung liefert die entscheidende Charakterisierung von Zentrum und Kontrastmittelaufnahme?', 'Contrast CT shows a ring lesion in suspected abscess. MRI is available and feasible. Which addition provides the key characterisation of the centre and enhancement?', 'CT با کنتراست در شک به آبسه ضایعه‌ای حلقوی نشان می‌دهد. MRI در دسترس و قابل انجام است. کدام بررسی تکمیلی مشخصات اصلی مرکز و افزایش سیگنال پس از کنتراست را فراهم می‌کند؟'),
    options:[L('T1 nach Kontrastmittel ohne native Vergleichsserie oder Diffusion','Postcontrast T1 without native comparison or diffusion','T1 پس از تزریق بدون مقایسهٔ پیش از تزریق یا انتشار'),L('T2/FLAIR und T1 vor/nach Kontrastmittel, ohne Diffusionssequenzen','T2/FLAIR and T1 before/after contrast, without diffusion sequences','T2/FLAIR و T1 پیش/پس از تزریق، بدون سکانس انتشار'),L('T1 vor/nach Kontrastmittel sowie DWI und ADC, ergänzt durch übrige Struktursequenzen','T1 before/after contrast with DWI and ADC, supplemented by other structural sequences','T1 پیش/پس از تزریق همراه DWI و ADC، تکمیل‌شده با سایر سکانس‌های ساختاری'),L('Perfusions-MRT ohne konventionelle Kontrast- oder Diffusionsbilder','Perfusion MRI without conventional contrast or diffusion images','MRI پرفیوژن بدون تصاویر معمول کنتراست یا انتشار')],correct:'C',
    feedback:L('Die ESCMID-Leitlinie empfiehlt MRT mit DWI/ADC und T1 vor/nach Gadolinium bei Abszessverdacht. Morphologie, Zentrum und Enhancement werden zusammen beurteilt.', 'ESCMID recommends MRI with DWI/ADC and T1 before/after gadolinium in suspected abscess. Assess morphology, the centre, and enhancement together.', 'ESCMID در شک به آبسه MRI با DWI/ADC و T1 پیش/پس از گادولینیوم را توصیه می‌کند. شکل‌شناسی، مرکز و افزایش سیگنال با هم ارزیابی می‌شوند.'),
    wrong:[L('Postkontrast-T1 zeigt den Ring, charakterisiert aber weder echte Restriktion noch vorbestehendes T1-Signal ausreichend.', 'Postcontrast T1 shows the ring but does not adequately assess true restriction or pre-existing T1 signal.', 'T1 پس از تزریق حلقه را نشان می‌دهد، ولی محدودیت واقعی یا سیگنال قبلی T1 را کافی ارزیابی نمی‌کند.'),L('Dieses Teilprotokoll zeigt Morphologie und Enhancement, lässt aber die zentrale Diffusion ohne DWI/ADC ungeprüft.', 'This partial protocol shows morphology and enhancement but leaves central diffusion unassessed without DWI/ADC.', 'این پروتکل ناقص شکل‌شناسی و افزایش سیگنال را نشان می‌دهد، ولی بدون DWI/ADC انتشار مرکزی را بررسی نمی‌کند.'),L('Perfusion kann ergänzen, ersetzt jedoch weder Basis-Morphologie noch DWI/ADC.', 'Perfusion can add information but replaces neither basic morphology nor DWI/ADC.', 'پرفیوژن می‌تواند اطلاعات بیشتری بدهد، ولی جای شکل‌شناسی پایه یا DWI/ADC را نمی‌گیرد.')],
    front:L('Welche Sequenzkombination gehört bei Hirnabszessverdacht zur MRT?', 'Which sequence combination belongs in MRI for suspected brain abscess?', 'کدام ترکیب سکانس در MRI شک به آبسهٔ مغزی لازم است؟'),answer:L('Insbesondere DWI/ADC und T1 vor/nach Kontrastmittel, zusammen mit den Struktursequenzen.', 'In particular DWI/ADC and T1 before/after contrast, together with structural sequences.', 'به‌ویژه DWI/ADC و T1 پیش/پس از تزریق، همراه با سکانس‌های ساختاری.'),
  },
  {
    key:'dual-rim',goal:L('Das SWI-Dual-Rim-Zeichen als unterstützendes, nicht obligates Merkmal erkennen.', 'Recognise the SWI dual-rim sign as supportive but not required.', 'علامت حاشیهٔ دوگانهٔ SWI را به‌عنوان ویژگی حمایتی ولی غیرالزامی بشناسید.'),source:'https://pubmed.ncbi.nlm.nih.gov/22422181/',
    question:L('Bei der Abgrenzung eines pyogenen Abszesses vom nekrotischen Glioblastom wird zusätzlich SWI ausgewertet. Welcher beschriebene Randbefund unterstützt den Abszess?', 'SWI is reviewed to help distinguish pyogenic abscess from necrotic glioblastoma. Which described rim feature supports abscess?', 'برای کمک به افتراق آبسهٔ چرکی از گلیوبلاستومای نکروتیک، SWI بررسی می‌شود. کدام یافتهٔ توصیف‌شدهٔ حاشیه از آبسه حمایت می‌کند؟'),
    options:[L('Unregelmäßige intraläsionale Suszeptibilitätsherde ohne geordnete Randstruktur','Irregular intralesional susceptibility foci without an organised rim','کانون‌های نامنظم حساسیت مغناطیسی داخل ضایعه بدون حاشیهٔ منظم'),L('Zwei konzentrische Ränder: außen hypointens, innen relativ zum Inhalt hyperintens','Two concentric rims: hypointense outside, hyperintense inside relative to the contents','دو حاشیهٔ متحدالمرکز: خارجی کم‌سیگنال و داخلی نسبت به محتویات پرسیگنال'),L('Nur ein T2-hypointenser Ring ohne besondere SWI-Konfiguration','A T2-hypointense ring alone without a distinct SWI configuration','صرفاً یک حلقهٔ کم‌سیگنال T2 بدون آرایش مشخص SWI'),L('Ein dicker nodulärer Kontrastmittelrand mit heterogener Suszeptibilität','A thick nodular enhancing rim with heterogeneous susceptibility','حاشیهٔ ضخیم و ندولار دارای افزایش سیگنال با حساسیت مغناطیسی ناهمگن')],correct:'B',
    feedback:L('Das Dual-Rim-Zeichen besteht aus diesen zwei konzentrischen SWI-Rändern. Es unterstützt einen pyogenen Abszess gegenüber nekrotischem Glioblastom; die kleine Vergleichsstudie belegt kein obligates Merkmal aller Abszesse.', 'The dual-rim sign consists of these two concentric SWI rims. It supports pyogenic abscess over necrotic glioblastoma; the small comparison study does not establish a required feature of every abscess.', 'علامت حاشیهٔ دوگانه از این دو حاشیهٔ متحدالمرکز SWI تشکیل می‌شود. از آبسهٔ چرکی در برابر گلیوبلاستومای نکروتیک حمایت می‌کند؛ مطالعهٔ مقایسه‌ای کوچک، آن را ویژگی الزامی همهٔ آبسه‌ها ثابت نمی‌کند.'),
    wrong:[L('Ungeordnete intraläsionale Suszeptibilität ist nicht das geordnete Dual-Rim-Muster.', 'Disorganised intralesional susceptibility is not the organised dual-rim pattern.', 'حساسیت مغناطیسی نامنظم داخل ضایعه الگوی منظم حاشیهٔ دوگانه نیست.'),L('Ein dunkler T2-Rand kann bei beiden Läsionen vorkommen und war in der Vergleichsstudie nicht ausreichend trennend.', 'A dark T2 rim can occur in both entities and did not adequately distinguish them in the comparison study.', 'حاشیهٔ تیرهٔ T2 در هر دو ضایعه دیده می‌شود و در مطالعهٔ مقایسه‌ای افتراق کافی ایجاد نکرد.'),L('Ein dicker nodulärer Rand ist eher tumorverdächtig; er beschreibt nicht das Dual-Rim-Zeichen.', 'A thick nodular rim is more concerning for tumour; it does not describe the dual-rim sign.', 'حاشیهٔ ضخیم و ندولار بیشتر شک به تومور ایجاد می‌کند؛ این توصیف علامت حاشیهٔ دوگانه نیست.')],
    front:L('Wie sieht das Dual-Rim-Zeichen auf SWI aus?', 'What does the dual-rim sign look like on SWI?', 'علامت حاشیهٔ دوگانه در SWI چه نمایی دارد؟'),answer:L('Zwei konzentrische Ränder: außen dunkel, innen relativ zum Höhleninhalt hell; unterstützend, nicht erforderlich.', 'Two concentric rims: dark outside, bright inside relative to cavity contents; supportive, not required.', 'دو حاشیهٔ متحدالمرکز: خارجی تیره و داخلی نسبت به محتویات حفره روشن؛ حمایتی است، نه الزامی.'),
  },
])

block('aq-hiv-enzephalopathie','/gehirn/infektionen/hiv-enzephalopathie',L('HIV-assoziierte Hirnveränderungen','HIV-associated brain changes','تغییرات مغزی مرتبط با HIV'),'https://pmc.ncbi.nlm.nih.gov/articles/PMC3657494/',[
 {key:'diffuse-pattern',source:'https://pubmed.ncbi.nlm.nih.gov/2315479/',goal:L('Ein diffuses HIV-kompatibles Muster von fokalen opportunistischen Läsionen abgrenzen.','Distinguish a diffuse HIV-compatible pattern from focal opportunistic lesions.','الگوی منتشر سازگار با HIV را از ضایعات کانونی فرصت‌طلب تفکیک کنید.'),
 question:L('Bei HIV und langsam zunehmender kognitiver Verlangsamung zeigt die MRT relativ symmetrische tiefe/periventrikuläre FLAIR-Veränderungen und diffuse Atrophie ohne expansiven Herd. Welches Muster passt am ehesten?','In HIV with gradually progressive cognitive slowing, MRI shows relatively symmetric deep/periventricular FLAIR change and diffuse atrophy without an expansile lesion. Which pattern fits best?','در HIV همراه با کندی شناختی تدریجی، MRI تغییرات نسبتاً متقارن FLAIR در مادهٔ سفید عمقی/پیرابطنی و آتروفی منتشر را بدون ضایعهٔ فضاگیر نشان می‌دهد. کدام الگو مناسب‌تر است؟'),
 options:[L("HIV-assoziierte Enzephalopathie", "HIV-associated encephalopathy", "آنسفالوپاتی مرتبط با HIV"),L("Zerebrale Toxoplasmose", "Cerebral toxoplasmosis", "توکسوپلاسموز مغزی"),L("Primäres ZNS-Lymphom", "Primary CNS lymphoma", "لنفوم اولیهٔ دستگاه عصبی مرکزی"),L("Progressive multifokale Leukenzephalopathie", "Progressive multifocal leukoencephalopathy", "لکوانسفالوپاتی چندکانونی پیشرونده")],correct:'A',
 feedback:L('Ein symmetrisches tiefes Marklagermuster mit Volumenverlust kann zu HIV-assoziierter Enzephalopathie passen. Es ist unspezifisch; andere infektiöse, vaskuläre und metabolische Ursachen sowie die klinische Funktion müssen mitbeurteilt werden.','Symmetric deep white-matter change with volume loss may fit HIV-associated encephalopathy. It is nonspecific; assess other infectious, vascular, and metabolic causes and clinical function.','تغییرات متقارن مادهٔ سفید عمقی همراه با کاهش حجم می‌تواند با آنسفالوپاتی مرتبط با HIV سازگار باشد. این الگو غیراختصاصی است؛ علل عفونی، عروقی و متابولیک دیگر و عملکرد بالینی نیز باید بررسی شوند.'),
 wrong:[L('Toxoplasmose zeigt eher fokale, häufig ringförmig anreichernde Läsionen mit Ödem; ein solcher Herd ist nicht beschrieben.','Toxoplasmosis more often produces focal, frequently ring-enhancing lesions with oedema; none is described.','توکسوپلاسموز بیشتر ضایعات کانونی، اغلب با افزایش سیگنال حلقوی پس از تزریق و همراه با ادم ایجاد می‌کند؛ چنین ضایعه‌ای توصیف نشده است.'),L('Ein solider expansiver Herd ist hier nicht vorhanden; ein Lymphom darf nicht aus diffuser Atrophie allein abgeleitet werden.','No solid expansile lesion is described; lymphoma cannot be inferred from diffuse atrophy alone.','ضایعهٔ جامد فضاگیر توصیف نشده است؛ لنفوم را نمی‌توان فقط از آتروفی منتشر نتیجه گرفت.'),L('PML bleibt eine Differenzialdiagnose, ist klassisch aber fokal/asymmetrischer als das beschriebene diffuse Muster.','PML remains a differential but is classically more focal/asymmetric than the described diffuse pattern.','PML همچنان یک افتراق است، ولی به‌طور کلاسیک از الگوی منتشر توصیف‌شده کانونی‌تر/نامتقارن‌تر است.')],
 front:L('Wie ordnet man symmetrische Marklagerveränderungen mit Atrophie bei HIV ein?','How should symmetric white-matter change with atrophy in HIV be interpreted?','تغییرات متقارن مادهٔ سفید همراه آتروفی در HIV چگونه تفسیر می‌شوند؟'),answer:L('Das Muster ist kompatibel mit HIV-Enzephalopathie, aber unspezifisch; klinische Einordnung und Ausschluss anderer Ursachen sind nötig.','The pattern is compatible with HIV encephalopathy but nonspecific; clinical assessment and exclusion of other causes are required.','الگو با آنسفالوپاتی HIV سازگار ولی غیراختصاصی است؛ ارزیابی بالینی و رد علل دیگر لازم‌اند.')},
 {key:'pml-differential',goal:L('Asymmetrische subkortikale Veränderungen bei HIV als PML-verdächtig erkennen.','Recognise asymmetric subcortical changes in HIV as suspicious for PML.','تغییرات نامتقارن زیرقشری در HIV را مشکوک به PML بشناسید.'),source:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/progressive?view=full',
 question:L('Bei fortgeschrittenem HIV nehmen fokale Ausfälle über Wochen zu. MRT: asymmetrische subkortikale FLAIR-Läsionen mit U-Faser-Beteiligung, wenig Masseneffekt und kaum Enhancement. Welche Ursache muss gezielt geprüft werden?','In advanced HIV, focal deficits progress over weeks. MRI shows asymmetric subcortical FLAIR lesions involving U-fibres, with little mass effect and enhancement. Which cause should be specifically evaluated?','در HIV پیشرفته، نقص‌های کانونی طی هفته‌ها پیشرفت می‌کنند. MRI ضایعات نامتقارن زیرقشری FLAIR با درگیری فیبرهای U، اثر فشاری اندک و افزایش سیگنال اندک پس از تزریق را نشان می‌دهد. کدام علت باید به‌طور هدفمند بررسی شود؟'),
    options:[L('Diffuse HIV-assoziierte Enzephalopathie','Diffuse HIV-associated encephalopathy','آنسفالوپاتی منتشر مرتبط با HIV'),L('Progressive multifokale Leukenzephalopathie','Progressive multifocal leukoencephalopathy','لکوانسفالوپاتی چندکانونی پیشرونده'),L('Zerebrale Toxoplasmose','Cerebral toxoplasmosis','توکسوپلاسموز مغزی'),L('Primäres ZNS-Lymphom','Primary CNS lymphoma','لنفوم اولیهٔ دستگاه عصبی مرکزی')],correct:'B',
 feedback:L('Der subakut progrediente fokale Verlauf und das asymmetrische Marklagermuster sind PML-verdächtig. JCV-PCR im Liquor kann die Diagnose im passenden Kontext stützen; ein negatives Ergebnis schließt sie nicht sicher aus.','The subacute progressive focal course and asymmetric white-matter pattern raise concern for PML. CSF JCV PCR can support diagnosis in context; a negative result does not reliably exclude it.','سیر کانونی پیشروندهٔ زیرحاد و الگوی نامتقارن مادهٔ سفید شک به PML را مطرح می‌کنند. PCR ویروس JCV در مایع مغزی‌نخاعی می‌تواند در زمینهٔ مناسب از تشخیص حمایت کند؛ نتیجهٔ منفی آن را با اطمینان رد نمی‌کند.'),
    wrong:[L('Die fokale Progression mit asymmetrischer subkortikaler Beteiligung passt besser zu PML als zum typischen diffusen HIV-Muster.','Focal progression with asymmetric subcortical involvement fits PML better than the typical diffuse HIV pattern.','پیشرفت کانونی همراه درگیری نامتقارن زیرقشری بیشتر با PML سازگار است تا الگوی منتشر معمول HIV.'),L('Toxoplasmose bildet typischerweise fokale Herde mit mehr Ödem/Masseneffekt und Kontrastierung als hier beschrieben.','Toxoplasmosis typically forms focal lesions with more oedema/mass effect and enhancement than described here.','توکسوپلاسموز معمولاً ضایعات کانونی با ادم/اثر فشاری و افزایش سیگنال بیشتری پس از تزریق از آنچه اینجا توصیف شده ایجاد می‌کند.'),L('Ein Lymphom zeigt eher eine expansive, häufig anreichernde Läsion; das nicht expansive subkortikale Muster spricht hier stärker für PML.','Lymphoma more often produces an expansile, frequently enhancing lesion; the nonexpansile subcortical pattern here favours PML.','لنفوم بیشتر ضایعه‌ای فضاگیر و اغلب دارای افزایش سیگنال پس از تزریق ایجاد می‌کند؛ الگوی زیرقشری بدون اثر فشاری در اینجا بیشتر به نفع PML است.')],
 front:L('Welches MRT-Muster sollte bei HIV fokale PML-Abklärung auslösen?','Which MRI pattern should prompt focal PML workup in HIV?','کدام الگوی MRI در HIV باید بررسی هدفمند PML را مطرح کند؟'),answer:L('Subakut progrediente, asymmetrische subkortikale Marklagerläsionen, oft mit wenig Masseneffekt; JCV-Diagnostik im Kontext.','Subacute progressive asymmetric subcortical white-matter lesions, often with little mass effect; assess JCV in context.','ضایعات زیرحاد پیشرونده و نامتقارن زیرقشری مادهٔ سفید، اغلب با اثر فشاری اندک؛ JCV در زمینه بررسی شود.')},
 {key:'pml-iris',goal:L('Entzündliche PML nach Immunrekonstitution als Ausnahme zum typischen Muster einordnen.','Recognise inflammatory PML after immune reconstitution as an exception to the typical pattern.','PML التهابی پس از بازسازی ایمنی را استثنایی بر الگوی معمول بدانید.'),source:'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/progressive?view=full',
 question:L('Bei bekannter PML treten nach Beginn wirksamer ART neue klinische Verschlechterung, Enhancement und Ödem an den bekannten Läsionen auf. Welche Erklärung muss vorrangig erwogen werden?','With known PML, new clinical deterioration, enhancement, and oedema develop at established lesions after effective ART begins. Which explanation must be prioritised?','در PML شناخته‌شده، پس از شروع ART مؤثر، بدترشدن بالینی همراه با افزایش سیگنال پس از تزریق و ادم در ضایعات قبلی ایجاد می‌شود. کدام توضیح باید در اولویت بررسی باشد؟'),
    options:[L('Nichtentzündliche Progression der klassischen PML','Non-inflammatory progression of classic PML','پیشرفت غیرالتهابی PML کلاسیک'),L('Diffuse HIV-Enzephalopathie','Diffuse HIV encephalopathy','آنسفالوپاتی منتشر HIV'),L('PML-assoziiertes Immunrekonstitutionssyndrom (PML-IRIS)','PML-associated immune reconstitution inflammatory syndrome (PML-IRIS)','سندرم التهابی بازسازی ایمنی مرتبط با PML (PML-IRIS)'),L('Zusätzliche zerebrale Toxoplasmose','Concurrent cerebral toxoplasmosis','توکسوپلاسموز مغزی هم‌زمان')],correct:'C',
 feedback:L('PML-IRIS kann nach ART mit entzündlicher Kontrastmittelaufnahme, Ödem und Masseneffekt auftreten. Die zeitliche Beziehung und bekannte PML sind entscheidend; die Einordnung bleibt klinisch und schließt eine zusätzliche Erkrankung nicht aus.','PML-IRIS can occur after ART with inflammatory enhancement, oedema, and mass effect. Timing and established PML are essential; interpretation remains clinical and does not exclude concurrent disease.','PML-IRIS می‌تواند پس از ART با افزایش سیگنال التهابی پس از تزریق، ادم و اثر فشاری رخ دهد. رابطهٔ زمانی و PML شناخته‌شده مهم‌اند؛ تفسیر بالینی است و بیماری هم‌زمان را رد نمی‌کند.'),
    wrong:[L('Neue Entzündungszeichen nach wirksamer ART verlangen die Prüfung auf IRIS statt einer rein nichtentzündlichen Erklärung.','New inflammatory features after effective ART require assessment for IRIS rather than a purely non-inflammatory explanation.','نشانه‌های التهابی جدید پس از ART مؤثر به بررسی IRIS نیاز دارند، نه توضیح صرفاً غیرالتهابی.'),L('Diffuse HIV-Enzephalopathie erklärt diese entzündliche Veränderung bekannter PML-Herde nicht gut.','Diffuse HIV encephalopathy poorly explains inflammatory change at known PML lesions.','آنسفالوپاتی منتشر HIV تغییرات التهابی در ضایعات شناخته‌شدهٔ PML را خوب توضیح نمی‌دهد.'),L('Eine zusätzliche Infektion bleibt möglich; die neue Entzündung an bereits bekannten PML-Herden nach Immunrekonstitution passt jedoch unmittelbarer zu PML-IRIS.','Concurrent infection remains possible, but new inflammation at known PML lesions after immune reconstitution fits PML-IRIS more directly.','عفونت هم‌زمان ممکن است؛ بااین‌حال التهاب جدید در ضایعات شناخته‌شدهٔ PML پس از بازسازی ایمنی مستقیماً بیشتر با PML-IRIS سازگار است.')],
 front:L("Welche entzündliche Veränderung kann nach wirksamer ART bei bekannter PML auftreten, und wie wird sie eingeordnet?", "Which inflammatory change may occur after effective ART in established PML, and how is it interpreted?", "پس از ART مؤثر در PML شناخته‌شده، کدام تغییر التهابی ممکن است رخ دهد و چگونه تفسیر می‌شود؟"),answer:L('Bei PML-IRIS nach Immunrekonstitution sind entzündliches Enhancement, Ödem und Masseneffekt möglich.','PML-IRIS after immune reconstitution may cause inflammatory enhancement, oedema, and mass effect.','در PML-IRIS پس از بازسازی ایمنی، افزایش سیگنال التهابی پس از تزریق، ادم و اثر فشاری ممکن است.')},
])

block('aq-meningitis-enzephalitis','/gehirn/infektionen/meningitis-enzephalitis',L('Meningitis und Enzephalitis','Meningitis and encephalitis','مننژیت و آنسفالیت'),'https://pubmed.ncbi.nlm.nih.gov/14716235/',[
 {key:'compartments',goal:L('Meningeale und parenchymale Befunde anatomisch zuordnen.','Localise meningeal and parenchymal findings anatomically.','یافته‌های مننژی و پارانشیمی را از نظر آناتومیک تعیین محل کنید.'),
 question:L('Ein Erwachsener mit Fieber und Verwirrtheit hat dünne sulkale Kontrastmittelaufnahme und zusätzliche intraparenchymale temporale FLAIR-Herde. Welche Beschreibung erfasst beide Kompartimente?','An adult with fever and confusion has thin sulcal enhancement and additional intraparenchymal temporal FLAIR lesions. Which description captures both compartments?','بزرگسالی با تب و گیجی، افزایش سیگنال نازک پس از تزریق در شیارها و ضایعات FLAIR تمپورال داخل پارانشیم دارد. کدام توصیف هر دو بخش را بیان می‌کند؟'),
 options:[L('Meningeale und parenchymale Beteiligung','Meningeal and parenchymal involvement','درگیری مننژی و پارانشیمی'),L('Isolierte meningeale Beteiligung','Isolated meningeal involvement','درگیری منفرد مننژی'),L('Isolierte parenchymale Beteiligung','Isolated parenchymal involvement','درگیری منفرد پارانشیمی'),L('Ausschließlich pachymeningeale Durabeteiligung','Exclusively pachymeningeal dural involvement','درگیری صرفاً پاکی‌مننژیال سخت‌شامه')],correct:'A',
 feedback:L('Sulkale Aufnahme betrifft den leptomeningealen Raum; die ausdrücklich intraparenchymalen Herde liegen im Hirngewebe. Das ist eine anatomische Musterbeschreibung, kein Nachweis einer infektiösen Ursache oder eines bestimmten Erregers.','Sulcal enhancement involves the leptomeningeal space; the explicitly intraparenchymal lesions lie in brain tissue. This is anatomical pattern description, not proof of infection or a particular pathogen.','افزایش سیگنال پس از تزریق در شیارها به فضای لپتومننژی مربوط است؛ ضایعات داخل پارانشیم در بافت مغز قرار دارند. این توصیف آناتومیک الگو است، نه اثبات عفونت یا عامل مشخص.'),
 wrong:[L('Die temporalen Parenchymherde fehlen in dieser Beschreibung.','This description omits the temporal parenchymal lesions.','این توصیف ضایعات پارانشیمی تمپورال را حذف می‌کند.'),L('Die zusätzliche sulkale Aufnahme gehört ebenfalls in den Befund.','The additional sulcal enhancement also belongs in the report.','افزایش سیگنال اضافهٔ پس از تزریق در شیارها نیز باید گزارش شود.'),L('Sulkale Aufnahme folgt den Leptomeningen; außerdem sind Parenchymherde beschrieben.','Sulcal enhancement follows the leptomeninges; parenchymal lesions are also described.','افزایش سیگنال پس از تزریق در شیارها از لپتومننژ پیروی می‌کند؛ ضایعات پارانشیمی نیز توصیف شده‌اند.')],
 front:L('Welche Kompartimente beschreibt man bei einem Meningoenzephalitis-Muster getrennt?','Which compartments are described separately in a meningoencephalitic pattern?','در الگوی مننگوآنسفالیت کدام بخش‌ها جداگانه توصیف می‌شوند؟'),answer:L('Meningen/Liquorräume und Hirnparenchym; Verteilung, Sequenzen und Enhancement angeben, ohne daraus allein einen Erreger abzuleiten.','Meninges/CSF spaces and brain parenchyma; state distribution, sequences and enhancement without inferring a pathogen from these alone.','مننژ/فضاهای مایع مغزی‌نخاعی و پارانشیم مغز؛ توزیع، سکانس‌ها و افزایش سیگنال پس از تزریق را بیان کنید، بدون تعیین عامل صرفاً بر اساس آن‌ها.')},
 {key:'normal-mri',goal:L('Eine normale MRT bei Meningitisverdacht korrekt begrenzen.','State the limits of normal MRI in suspected meningitis.','محدودیت MRI طبیعی در شک به مننژیت را بیان کنید.'),
 question:L('Ein Erwachsener mit Fieber und Meningismus hat unauffällige FLAIR- und kontrastverstärkte T1-Bilder. Welche Schlussfolgerung ist angemessen?','An adult with fever and meningism has unremarkable FLAIR and contrast-enhanced T1 images. Which conclusion is appropriate?','بزرگسالی با تب و علائم مننژی، تصاویر طبیعی FLAIR و T1 پس از تزریق دارد. کدام نتیجه مناسب است؟'),
 options:[L('Eine bakterielle Ursache ist ausgeschlossen, eine virale bleibt möglich','A bacterial cause is excluded while a viral cause remains possible','علت باکتریایی رد شده ولی علت ویروسی ممکن است'),L('Eine virale Ursache ist ausgeschlossen, eine bakterielle bleibt möglich','A viral cause is excluded while a bacterial cause remains possible','علت ویروسی رد شده ولی علت باکتریایی ممکن است'),L('Keine entsprechenden MRT-Zeichen; Meningitis bleibt klinisch und im Liquor zu prüfen','No corresponding MRI signs; meningitis still requires clinical and CSF assessment','نشانهٔ مربوط در MRI وجود ندارد؛ مننژیت همچنان با ارزیابی بالینی و مایع مغزی‌نخاعی بررسی شود'),L('Die Beschwerden sind damit als nichtentzündlich einzuordnen','The symptoms can therefore be classified as non-inflammatory','بر این اساس علائم غیرالتهابی طبقه‌بندی می‌شوند')],correct:'C',
 feedback:L('Die kleine Originalstudie enthielt normale MRT bei viraler und bakterieller Meningitis. Eine normale MRT schließt die Erkrankung nicht aus und bestimmt ihre Ursache nicht; Klinik und Liquor bleiben wesentlich.','The small original study included normal MRI in viral and bacterial meningitis. Normal MRI neither excludes the disease nor determines its cause; clinical and CSF findings remain essential.','مطالعهٔ اصلی کوچک، MRI طبیعی را در مننژیت ویروسی و باکتریایی گزارش کرد. MRI طبیعی نه بیماری را رد و نه علت را تعیین می‌کند؛ یافته‌های بالینی و مایع مغزی‌نخاعی همچنان ضروری‌اند.'),
 wrong:[L('Auch bakterielle Meningitis kann ohne diese MRT-Zeichen vorliegen.','Bacterial meningitis can also occur without these MRI signs.','مننژیت باکتریایی نیز می‌تواند بدون این نشانه‌های MRI وجود داشته باشد.'),L('Auch virale Meningitis kann bei unauffälliger MRT vorliegen.','Viral meningitis can also occur with unremarkable MRI.','مننژیت ویروسی نیز می‌تواند با MRI طبیعی وجود داشته باشد.'),L('Fehlende MRT-Zeichen legen keine nichtentzündliche Ursache fest.','Absent MRI signs do not establish a non-inflammatory cause.','نبود نشانه در MRI علت غیرالتهابی را تعیین نمی‌کند.')],
 front:L('Welche diagnostische Grenze hat eine normale MRT bei Meningitisverdacht?','What diagnostic limit does normal MRI have in suspected meningitis?','MRI طبیعی در شک به مننژیت چه محدودیت تشخیصی دارد؟'),answer:L('Sie schließt Meningitis nicht aus und bestimmt keinen Erreger; klinische und Liquorbefunde bleiben entscheidend.','It does not exclude meningitis or identify a pathogen; clinical and CSF findings remain essential.','مننژیت را رد نمی‌کند و عامل را تعیین نمی‌کند؛ یافته‌های بالینی و مایع مغزی‌نخاعی همچنان ضروری‌اند.')},
 {key:'ventricular-complication',goal:L('Ventrikulären Debris im Infektionskontext als Komplikationshinweis erkennen.','Recognise ventricular debris in infectious context as a complication clue.','دبری بطنی در زمینهٔ عفونی را سرنخ عارضه بدانید.'),source:'https://pubmed.ncbi.nlm.nih.gov/11559498/',
 question:L('Bei bakterieller Meningitis und klinischer Verschlechterung zeigt die MRT neu unregelmäßig sedimentierendes Material in den Hinterhörnern, ependymale Aufnahme und zunehmende Ventrikelweite. Welche Komplikation ist besonders verdächtig?','With bacterial meningitis and clinical deterioration, MRI shows new irregular dependent material in the occipital horns, ependymal enhancement and increasing ventricular size. Which complication is particularly concerning?','در مننژیت باکتریایی همراه بدترشدن بالینی، MRI مواد رسوب‌کردهٔ نامنظم جدید در شاخ‌های پس‌سری، افزایش سیگنال اپاندیمی پس از تزریق و افزایش اندازهٔ بطن‌ها نشان می‌دهد. کدام عارضه به‌ویژه مطرح است؟'),
 options:[L('Kommunizierender Hydrozephalus ohne intraventrikuläre Entzündung','Communicating hydrocephalus without intraventricular inflammation','هیدروسفالی ارتباطی بدون التهاب داخل بطن'),L('Pyogene Ventrikulitis mit begleitendem Hydrozephalus','Pyogenic ventriculitis with accompanying hydrocephalus','ونتریکولیت چرکی همراه با هیدروسفالی'),L('Subependymale Tumoraussaat','Subependymal tumour spread','انتشار تومور زیر اپاندیم'),L('Ex-vacuo-Erweiterung bei chronischer Hirnatrophie','Ex-vacuo enlargement in chronic brain atrophy','اتساع اکس‌واکو در آتروفی مزمن مغز')],correct:'B',
 feedback:L('Unregelmäßiger ventrikulärer Debris ist im passenden Infektionskontext verdächtig auf Ventrikulitis. Ependymale Aufnahme und Hydrozephalus können begleiten. Material und Differenzialdiagnosen einschließlich Blutprodukte in der gesamten Untersuchung prüfen und den Komplikationsverdacht rasch kommunizieren.','Irregular ventricular debris is suspicious for ventriculitis in the appropriate infectious context. Ependymal enhancement and hydrocephalus may accompany it. Assess the material and alternatives including blood products across the examination and communicate concern promptly.','دبری نامنظم داخل بطن در زمینهٔ عفونی مناسب شک به ونتریکولیت را مطرح می‌کند. افزایش سیگنال اپاندیمی پس از تزریق و هیدروسفالی ممکن است همراه باشند. مواد و افتراق‌ها از جمله فرآورده‌های خونی در کل بررسی ارزیابی و احتمال عارضه سریع اطلاع داده شود.'),
 wrong:[L('Die Erweiterung allein erklärt den neuen Debris und die ependymale Aufnahme nicht ausreichend.','Enlargement alone does not adequately explain the new debris and ependymal enhancement.','اتساع به‌تنهایی دبری جدید و افزایش سیگنال اپاندیمی پس از تزریق را کافی توضیح نمی‌دهد.'),L('Tumorbefall kann ependymale Befunde verursachen; akute Infektion und sedimentierender Debris sprechen hier stärker für die infektiöse Komplikation.','Tumour can cause ependymal findings, but acute infection and dependent debris here favour an infectious complication.','تومور می‌تواند یافتهٔ اپاندیمی ایجاد کند، ولی عفونت حاد و دبری رسوب‌کرده در اینجا بیشتر به نفع عارضهٔ عفونی‌اند.'),L('Atrophie erklärt weder neuen Debris noch entzündungsverdächtige Aufnahme.','Atrophy explains neither new debris nor enhancement suspicious for inflammation.','آتروفی نه دبری جدید و نه افزایش سیگنال پس از تزریق مشکوک به التهاب را توضیح می‌دهد.')],
 front:L('Welche ventrikulären MRT-Befunde lassen bei ZNS-Infektion an Ventrikulitis denken?','Which ventricular MRI findings raise concern for ventriculitis in CNS infection?','در عفونت دستگاه عصبی مرکزی، کدام یافته‌های بطنی MRI شک به ونتریکولیت را مطرح می‌کنند؟'),answer:L('Besonders unregelmäßig sedimentierender Debris; ependymale Aufnahme und Hydrozephalus können hinzukommen. Blutprodukte differenzieren; kein Einzelzeichen ist obligat.','Especially irregular dependent debris; ependymal enhancement and hydrocephalus may accompany it. Differentiate blood products; no single sign is required.','به‌ویژه دبری رسوب‌کردهٔ نامنظم؛ افزایش سیگنال اپاندیمی پس از تزریق و هیدروسفالی ممکن است همراه باشند. فرآورده‌های خونی افتراق داده شوند؛ هیچ علامت منفردی الزامی نیست.')},
])

block('aq-cjd','/gehirn/neurodegeneration/cjd',L('CJK: Diffusionsmuster','CJD diffusion patterns','الگوهای انتشار در CJD'),'https://pmc.ncbi.nlm.nih.gov/articles/PMC3100134/',[
 {key:'clinical-pattern',goal:L('Ein CJK-verdächtiges Grau-Substanz-Muster klinisch einordnen.','Interpret a CJD-suspicious grey-matter pattern clinically.','الگوی مشکوک به CJD در مادهٔ خاکستری را در زمینهٔ بالینی تفسیر کنید.'),
 question:L('Ein Erwachsener entwickelt über Wochen kognitiven Abbau und Myoklonien. MRT: multifokales kortikales Ribboning und Caudatussignal, auf DWI deutlicher als auf FLAIR, mit korrespondierend niedrigem ADC und ohne Gefäßterritorium. Welche Diagnose sollte vorrangig abgeklärt werden?','An adult develops cognitive decline and myoclonus over weeks. MRI shows multifocal cortical ribboning and caudate signal, more conspicuous on DWI than FLAIR, with corresponding low ADC and no vascular territory. Which diagnosis should be prioritised for evaluation?','بزرگسالی طی هفته‌ها دچار افت شناختی و میوکلونوس می‌شود. MRI افزایش سیگنال نواری چندکانونی قشر و سیگنال هستهٔ دمی را نشان می‌دهد که در DWI از FLAIR واضح‌تر است، ADC متناظر پایین دارد و از قلمرو عروقی پیروی نمی‌کند. کدام تشخیص در اولویت بررسی است؟'),
 options:[L("Sporadische Creutzfeldt-Jakob-Krankheit", "Sporadic Creutzfeldt–Jakob disease", "بیماری کروتزفلد–یاکوب اسپورادیک"),L("Hypoxisch-ischaemische Hirnschädigung", "Hypoxic–ischaemic brain injury", "آسیب هیپوکسیک‌ـ‌ایسکمیک مغز"),L("Autoimmune Enzephalitis", "Autoimmune encephalitis", "آنسفالیت خودایمنی"),L("Periiktale Signalveränderungen", "Peri-ictal signal changes", "تغییرات سیگنال پری‌ایکتال")],correct:'A',
 feedback:L('Rascher Verlauf und nichtterritoriale kortiko-striatale Restriktion sind CJK-verdächtig. MRT ist ein diagnostischer Baustein; Klinik, weitere Diagnostik und behandelbare Differenzialdiagnosen bleiben erforderlich.','Rapid progression and nonterritorial cortical-striatal restriction raise concern for CJD. MRI is one diagnostic component; clinical assessment, further testing and treatable alternatives remain essential.','سیر سریع و محدودیت انتشار قشری‌ـ‌استریاتال خارج از قلمرو عروقی شک به CJD را مطرح می‌کنند. MRI بخشی از تشخیص است؛ ارزیابی بالینی، بررسی تکمیلی و افتراق علل قابل درمان همچنان ضروری‌اند.'),
 wrong:[L("Hypoxie kann kortiko-striatale Restriktion verursachen. Ohne berichtetes hypoxisches Ereignis und bei über Wochen progredientem Abbau mit Myoklonien ist hier CJK vorrangig abzuklären.", "Hypoxia can cause cortical–striatal restriction. Without a reported hypoxic event, progressive decline over weeks with myoclonus prioritises CJD evaluation here.", "هیپوکسی می‌تواند محدودیت انتشار قشری‌ـ‌استریاتال ایجاد کند. بدون رویداد هیپوکسیک گزارش‌شده و با افت پیشرونده طی هفته‌ها همراه میوکلونوس، بررسی CJD در اینجا در اولویت است."),L("Autoimmune Enzephalitis bleibt eine behandelbare Differenzialdiagnose. Das DWI-betonte kortiko-striatale Muster mit niedrigem ADC und raschem Abbau stützt hier stärker den CJK-Verdacht; klinisch weiter abklären.", "Autoimmune encephalitis remains a treatable differential. DWI-predominant cortical–striatal change with low ADC and rapid decline more strongly supports CJD suspicion here; continue clinical evaluation.", "آنسفالیت خودایمنی همچنان افتراقی قابل درمان است. الگوی قشری‌ـ‌استریاتال غالب در DWI با ADC پایین و افت سریع در اینجا بیشتر از شک به CJD حمایت می‌کند؛ بررسی بالینی ادامه یابد."),L("Anfälle können kortikale Diffusionsveränderungen imitieren. Der fortschreitende Verlauf über Wochen mit multifokaler kortiko-striataler Beteiligung verlangt hier vorrangig CJK-Abklärung; Anfallsanamnese und EEG bleiben relevant.", "Seizures can mimic cortical diffusion changes. Progressive decline over weeks with multifocal cortical–striatal involvement prioritises CJD evaluation here; seizure history and EEG remain relevant.", "تشنج می‌تواند تغییرات انتشار قشری را تقلید کند. سیر پیشرونده طی هفته‌ها با درگیری چندکانونی قشری‌ـ‌استریاتال، بررسی CJD را در اینجا در اولویت قرار می‌دهد؛ شرح حال تشنج و EEG همچنان مهم‌اند.")],
 front:L('Wie formuliert man ein CJK-verdächtiges MRT-Muster, ohne die Diagnose allein bildgebend festzulegen?','How do you report a CJD-suspicious MRI pattern without establishing diagnosis from imaging alone?','الگوی MRI مشکوک به CJD چگونه بدون تعیین تشخیص صرفاً با تصویر گزارش می‌شود؟'),answer:L('DWI/ADC-korrelierte kortikale und/oder striatale Verteilung beschreiben und bei rascher Progression CJK-Abklärung anregen; MRT allein ist keine definitive Diagnose.','Describe DWI/ADC-concordant cortical and/or striatal distribution and suggest CJD evaluation in rapid progression; MRI alone is not a definitive diagnosis.','توزیع قشری و/یا استریاتال با تطابق DWI/ADC توصیف و در سیر سریع بررسی CJD پیشنهاد شود؛ MRI به‌تنهایی تشخیص قطعی نیست.')},
 {key:'limbic-mimic',goal:L('Ein vorwiegend limbisches FLAIR-Muster als Anlass zur Differenzialdiagnose erkennen.','Recognise a predominantly limbic FLAIR pattern as a reason to broaden the differential.','الگوی عمدتاً لیمبیک FLAIR را دلیلی برای گسترش افتراق بدانید.'),
 question:L("Bei rasch progredienter Demenz wird sporadische CJK diskutiert. Welches MRT-Muster sollte besonders zur Prüfung limbischer entzündlicher oder periiktaler Alternativen führen?", "Sporadic CJD is considered in rapidly progressive dementia. Which MRI pattern should particularly prompt evaluation of limbic inflammatory or peri-ictal alternatives?", "در دمانس سریع‌پیشرونده، CJD اسپورادیک مطرح است. کدام الگوی MRI باید به‌ویژه به بررسی علل التهابی لیمبیک یا پری‌ایکتال منجر شود؟"),
 options:[L("Caudatus und Putamen DWI-betont hyperintens mit korrespondierend niedrigem ADC", "DWI-predominant caudate and putamen hyperintensity with corresponding low ADC", "هایپرسیگنال غالب در DWI هستهٔ دمی و پوتامن با ADC متناظر پایین"),L("Parietales und okzipitales kortikales Ribboning mit niedrigem ADC", "Parietal and occipital cortical ribboning with low ADC", "افزایش سیگنال نواری قشر آهیانه‌ای و پس‌سری با ADC پایین"),L("Isoliert mesiotemporale FLAIR-Betonung bei nicht erniedrigtem ADC", "Isolated mesial temporal FLAIR predominance without reduced ADC", "غلبهٔ منفرد FLAIR تمپورال داخلی بدون کاهش ADC"),L("Multifokale kortikale und striatale DWI-Betonung mit ADC-Abfall", "Multifocal cortical and striatal DWI predominance with ADC reduction", "غلبهٔ چندکانونی DWI قشری و استریاتال با افت ADC")],correct:'C',
 feedback:L('Isolierte limbische FLAIR-Betonung ohne ADC-Abfall verlangt andere Ursachen, darunter autoimmune oder infektiöse Enzephalitis und Anfallsfolgen. Bildgebung allein trennt diese nicht sicher; DWI-Helligkeit ist nicht automatisch Restriktion.','Isolated limbic FLAIR predominance without ADC reduction requires consideration of other causes, including autoimmune or infectious encephalitis and seizure effects. Imaging alone does not reliably separate these; bright DWI is not automatically restriction.','غلبهٔ منفرد FLAIR لیمبیک بدون افت ADC نیازمند بررسی علل دیگر، از جمله آنسفالیت خودایمنی یا عفونی و پیامد تشنج است. تصویربرداری به‌تنهایی این‌ها را با اطمینان جدا نمی‌کند؛ DWI روشن لزوماً محدودیت انتشار نیست.'),
 wrong:[L("Striatale DWI-Betonung mit ADC-Abfall kann ein CJK-verdächtiges Muster stützen; sie ist nicht der hier gesuchte isoliert limbische FLAIR-Befund.", "Striatal DWI predominance with low ADC can support a CJD-suspicious pattern; it is not the isolated limbic FLAIR finding asked for.", "غلبهٔ DWI استریاتال با ADC پایین می‌تواند از الگوی مشکوک به CJD حمایت کند؛ یافتهٔ منفرد لیمبیک FLAIR مورد پرسش نیست."),L("Mehrregionale neokortikale Restriktion kann im passenden Verlauf CJK-verdächtig sein. Gesucht ist das hiervon abweichende isolierte limbische Muster.", "Multiregional neocortical restriction may raise concern for CJD in context. The question asks for the differing isolated limbic pattern.", "محدودیت انتشار چندناحیه‌ای نئوکورتکس در سیر مناسب می‌تواند مشکوک به CJD باشد. الگوی متفاوت و منفرد لیمبیک مورد پرسش است."),L("Die Kombination aus kortikaler und striataler Restriktion kann CJK stützen, beweist sie aber nicht. Sie entspricht nicht dem isoliert limbischen Vergleichsmuster.", "Combined cortical and striatal restriction can support CJD but does not prove it. It differs from the isolated limbic comparison pattern.", "ترکیب محدودیت انتشار قشری و استریاتال می‌تواند از CJD حمایت کند ولی آن را ثابت نمی‌کند. با الگوی مقایسه‌ای منفرد لیمبیک متفاوت است.")],
 front:L('Warum ist DWI-Helligkeit bei rascher Demenz kein ausreichender CJK-Nachweis?','Why is bright DWI in rapid dementia insufficient to establish CJD?','چرا DWI روشن در دمانس سریع برای اثبات CJD کافی نیست؟'),answer:L('ADC-Korrelation, Verteilung und Klinik prüfen; Anfälle, Enzephalitis, Ischämie oder Stoffwechselstörungen können imitieren.','Check ADC, distribution and clinical context; seizures, encephalitis, ischaemia or metabolic disorders may mimic it.','ADC، توزیع و زمینهٔ بالینی بررسی شوند؛ تشنج، آنسفالیت، ایسکمی یا اختلال متابولیک می‌توانند تقلیدکننده باشند.')},
 {key:'pulvinar-comparator',goal:L('Das klassische Pulvinar-Zeichen der vCJK von unspezifischem Thalamussignal abgrenzen.','Distinguish the classic vCJD pulvinar sign from nonspecific thalamic signal.','علامت کلاسیک پول‌وینار vCJD را از سیگنال غیراختصاصی تالاموس جدا کنید.'),source:'https://pubmed.ncbi.nlm.nih.gov/13679271/',
 question:L('In einer Prion-Abklärung wird ein klassisches Pulvinar-Zeichen auf FLAIR beschrieben. Welcher Signalvergleich gehört zur Definition dieses besonders mit vCJK verbundenen Zeichens?','During a prion workup, a classic pulvinar sign is described on FLAIR. Which signal comparison belongs to the definition of this sign particularly associated with vCJD?','در بررسی بیماری پریونی، علامت کلاسیک پول‌وینار در FLAIR توصیف می‌شود. کدام مقایسهٔ سیگنال در تعریف این علامت، که به‌ویژه با vCJD مرتبط است، قرار دارد؟'),
 options:[L('Pulvinar beidseits heller als das vordere Putamen','Bilateral pulvinar brighter than the anterior putamen','پول‌وینار دوطرفه روشن‌تر از پوتامن قدامی'),L('Pulvinar heller als der Caudatus als definierende Referenz','Pulvinar brighter than the caudate as the defining reference','پول‌وینار روشن‌تر از هستهٔ دمی به‌عنوان مرجع تعریف‌کننده'),L('Pulvinar heller als das übrige Thalamusgewebe allein','Pulvinar brighter than the remaining thalamus alone','پول‌وینار صرفاً روشن‌تر از سایر بافت تالاموس'),L('Caudatus heller als der Pulvinar','Caudate brighter than the pulvinar','هستهٔ دمی روشن‌تر از پول‌وینار')],correct:'A',
 feedback:L('Der beidseitige Pulvinar-Vergleich mit dem vorderen Putamen präzisiert das klassische Zeichen. Ein hellerer Pulvinar gegenüber anderen Thalamuskernen allein ist damit nicht gleichzusetzen. Das Zeichen gehört in den klinischen vCJK-Kontext, nicht als allgemeines sCJK-Leitzeichen.','Bilateral pulvinar comparison with the anterior putamen defines the classic sign more precisely. Pulvinar brightness relative only to other thalamic nuclei is not equivalent. Interpret it in the clinical vCJD context rather than as a general sCJD hallmark.','مقایسهٔ پول‌وینار دوطرفه با پوتامن قدامی علامت کلاسیک را دقیق‌تر تعریف می‌کند. روشن‌بودن پول‌وینار صرفاً نسبت به سایر هسته‌های تالاموس معادل آن نیست. علامت در زمینهٔ بالینی vCJD تفسیر می‌شود، نه به‌عنوان نشانهٔ عمومی sCJD.'),
 wrong:[L('Der Caudatus ist nicht der definierende Referenzvergleich; die klassische Definition vergleicht beidseitigen Pulvinar mit dem vorderen Putamen.','The caudate is not the defining reference; the classic definition compares bilateral pulvinar with anterior putamen.','هستهٔ دمی مرجع تعریف‌کننده نیست؛ تعریف کلاسیک پول‌وینار دوطرفه را با پوتامن قدامی مقایسه می‌کند.'),L('Dieser Vergleich kann auffälliges Thalamussignal beschreiben, erfüllt aber nicht die präzisierte Definition gegenüber dem vorderen Putamen.','This may describe conspicuous thalamic signal but does not meet the more precise comparison with anterior putamen.','این مقایسه می‌تواند سیگنال برجستهٔ تالاموس را توصیف کند، ولی تعریف دقیق‌تر مقایسه با پوتامن قدامی را برآورده نمی‌کند.'),L('Das Verhältnis ist umgekehrt formuliert und benutzt zudem Caudatus statt vorderem Putamen als Referenz.','This reverses the relationship and uses caudate rather than anterior putamen as reference.','رابطه برعکس بیان شده و هستهٔ دمی به‌جای پوتامن قدامی مرجع قرار گرفته است.')],
 front:L('Welche Referenz und welcher klinische Kontext definieren das klassische Pulvinar-Zeichen?','Which reference and clinical context define the classic pulvinar sign?','کدام مرجع و زمینهٔ بالینی علامت کلاسیک پول‌وینار را تعریف می‌کنند؟'),answer:L('Beidseitiges Pulvinar-Signal höher als im vorderen Putamen, besonders im vCJK-Kontext; nicht jede thalamische Hyperintensität ist dieses Zeichen.','Bilateral pulvinar signal higher than anterior putamen, particularly in vCJD context; not every thalamic hyperintensity is this sign.','سیگنال پول‌وینار دوطرفه بالاتر از پوتامن قدامی، به‌ویژه در زمینهٔ vCJD؛ هر هایپرسیگنال تالاموس این علامت نیست.')},
])

block('aq-parkinson','/gehirn/neurodegeneration/parkinson',L('Parkinson-Bildgebung','Imaging in parkinsonism','تصویربرداری سندرم پارکینسونی'),'https://pmc.ncbi.nlm.nih.gov/articles/PMC8323030/',[
  {
    "key": "technical-confidence",
    "source": "https://doi.org/10.1371/journal.pone.0231010",
    "goal": {
      "de": "Technisch eingeschränkte Nigrosom-Sichtbarkeit angemessen berichten.",
      "en": "Report technically limited nigrosome visibility appropriately.",
      "fa": "دیده‌شدن نیگروزوم با محدودیت فنی را مناسب گزارش کنید."
    },
    "question": {
      "de": "Bei einem Erwachsenen mit klinischem Parkinson-Syndrom verwischt Bewegung die dorsolaterale Substantia nigra auf SWI. Nigrosom 1 lässt sich beidseits nicht sicher abgrenzen. Welche Befundkategorie passt?",
      "en": "In an adult with clinical parkinsonism, motion blurs the dorsolateral substantia nigra on SWI. Nigrosome 1 cannot be confidently delineated on either side. Which reporting category fits?",
      "fa": "در بزرگسالی با سندرم پارکینسونی بالینی، حرکت ناحیهٔ دورسولترال جسم سیاه را در SWI محو کرده است. نیگروزوم ۱ در هیچ‌یک از دو سمت با اطمینان قابل تفکیک نیست. کدام طبقه‌بندی برای گزارش مناسب است؟"
    },
    "options": [
      {
        "de": "Beidseitig pathologischer Nigrosom-Befund",
        "en": "Bilateral abnormal nigrosome finding",
        "fa": "یافتهٔ غیرطبیعی دوطرفهٔ نیگروزوم"
      },
      {
        "de": "Regelrechte Nigrosom-Sichtbarkeit ohne relevante Seitendifferenz",
        "en": "Normal nigrosome visibility without relevant asymmetry",
        "fa": "دیده‌شدن طبیعی نیگروزوم بدون عدم تقارن مهم"
      },
      {
        "de": "Technisch eingeschränkte, nicht sicher klassifizierbare Nigrosom-Sichtbarkeit",
        "en": "Technically limited nigrosome visibility that cannot be confidently classified",
        "fa": "ارزیابی نیگروزوم از نظر فنی محدود است و طبقه‌بندی قطعی ممکن نیست"
      },
      {
        "de": "Aus klinischer Asymmetrie abgeleiteter einseitig pathologischer Nigrosom-Befund",
        "en": "Unilateral abnormal nigrosome finding inferred from clinical asymmetry",
        "fa": "استنباط یافتهٔ غیرطبیعی یک‌طرفهٔ نیگروزوم از عدم تقارن بالینی"
      }
    ],
    "correct": "C",
    "feedback": {
      "de": "Nicht sicher sichtbar ist bei Bewegungsunschärfe nicht gleichbedeutend mit sicher fehlend. Technische Einschränkung dokumentieren; aus diesem Befund keine positive oder negative Parkinson-Diagnose ableiten. Auch bei guter Qualität bleibt die Aussage eines isolierten Nigrosom-Zeichens begrenzt.",
      "en": "Not confidently visible under motion blur does not mean confirmed absence. Document the technical limitation; derive neither a positive nor a negative Parkinson diagnosis from this finding. Even at adequate quality, an isolated nigrosome sign has limited interpretation.",
      "fa": "دیده‌نشدن با اطمینان در حضور محوشدگی حرکتی معادل نبودِ تأییدشده نیست. محدودیت فنی را ثبت کنید و از این یافته نه تشخیص مثبت و نه منفی پارکینسون نتیجه بگیرید. حتی با کیفیت مناسب نیز تفسیر نشانهٔ منفرد نیگروزوم محدودیت دارد."
    },
    "wrong": [
      {
        "de": "Für eine beidseitig pathologische Klassifikation müsste die Struktur bei ausreichender Bildqualität beurteilbar sein; hier verhindert Bewegung diese Zuordnung.",
        "en": "A bilateral abnormal classification requires adequate image quality for assessment; motion prevents that classification here.",
        "fa": "طبقه‌بندی غیرطبیعی دوطرفه نیازمند کیفیت کافی برای ارزیابی ساختار است؛ حرکت در اینجا مانع آن است."
      },
      {
        "de": "Fehlende sicher erkennbare Asymmetrie unter Bewegungsunschärfe belegt keine regelrechte Struktur. Beide Seiten sind technisch unsicher.",
        "en": "Lack of confidently seen asymmetry under motion blur does not establish normal structure. Both sides are technically uncertain.",
        "fa": "نبودِ عدم تقارن قابل تشخیص با اطمینان در محوشدگی حرکتی، ساختار طبیعی را ثابت نمی‌کند؛ ارزیابی هر دو سمت از نظر فنی نامطمئن است."
      },
      {
        "de": "Die klinische Seitigkeit kann den bildgebenden Nachweis nicht ersetzen; aus beidseits unzureichender Sichtbarkeit lässt sich keine einseitige Läsion zuordnen.",
        "en": "Clinical laterality cannot replace imaging evidence; bilateral inadequate visibility cannot assign a unilateral abnormality.",
        "fa": "سمت درگیری بالینی جای شواهد تصویری را نمی‌گیرد؛ دیده‌شدن ناکافی دوطرفه، ضایعهٔ یک‌طرفه را تعیین نمی‌کند."
      }
    ],
    "front": {
      "de": "Wie wird ein bewegungsbedingt nicht sicher sichtbares Nigrosom-Zeichen berichtet?",
      "en": "How is a nigrosome sign that cannot be confidently seen because of motion reported?",
      "fa": "نشانهٔ نیگروزوم که به‌علت حرکت با اطمینان دیده نمی‌شود چگونه گزارش می‌شود؟"
    },
    "answer": {
      "de": "Als technisch nicht sicher beurteilbar, nicht als bestätigt fehlend oder normal; Bildqualität und klinischen Kontext nennen.",
      "en": "As technically indeterminate, rather than confirmed absent or normal; state image quality and clinical context.",
      "fa": "به‌صورت غیرقابل ارزیابی با اطمینان به‌دلایل فنی، نه غایبِ تأییدشده یا طبیعی؛ کیفیت تصویر و زمینهٔ بالینی ذکر شوند."
    }
  },
  {
    "key": "dat-limits",
    "source": "https://www.ema.europa.eu/en/documents/product-information/datscan-epar-product-information_en.pdf",
    "goal": {
      "de": "Eine reduzierte DAT-Bindung von einer spezifischen Parkinson-Syndromdiagnose trennen.",
      "en": "Separate reduced DAT binding from a specific parkinsonian syndrome diagnosis.",
      "fa": "کاهش اتصال DAT را از تشخیص سندرم پارکینسونی مشخص جدا کنید."
    },
    "question": {
      "de": "Bei einem Erwachsenen mit unklarem Parkinson-Syndrom zeigt eine technisch adäquate DaTSCAN-SPECT reduzierte striatale Bindung. Welche Aussage beantwortet diese Untersuchung am ehesten?",
      "en": "In an adult with uncertain parkinsonism, technically adequate DaTSCAN SPECT shows reduced striatal binding. Which statement best describes what the examination establishes?",
      "fa": "در بزرگسالی با سندرم پارکینسونی نامشخص، DaTSCAN-SPECT با کیفیت فنی مناسب کاهش اتصال استریاتال نشان می‌دهد. کدام عبارت بهتر بیانگر نتیجهٔ این بررسی است؟"
    },
    "options": [
      {
        "de": "Das Bindungsmuster unterscheidet idiopathischen Parkinson von MSA und PSP",
        "en": "The binding pattern distinguishes idiopathic Parkinson disease from MSA and PSP",
        "fa": "الگوی اتصال، پارکینسون ایدیوپاتیک را از MSA و PSP تفکیک می‌کند"
      },
      {
        "de": "Es spricht für ein präsynaptisches dopaminerges Defizit; PD, MSA und PSP werden damit nicht zuverlässig voneinander getrennt",
        "en": "It supports a presynaptic dopaminergic deficit; it does not reliably distinguish PD, MSA and PSP",
        "fa": "از نقص دوپامینرژیک پیش‌سیناپسی حمایت می‌کند؛ PD، MSA و PSP را با اطمینان از هم جدا نمی‌کند"
      },
      {
        "de": "Es beschreibt primär die postsynaptische Dopaminrezeptorverfügbarkeit",
        "en": "It primarily describes postsynaptic dopamine receptor availability",
        "fa": "عمدتاً دسترسی گیرندهٔ دوپامین پس‌سیناپسی را توصیف می‌کند"
      },
      {
        "de": "Es beschreibt primär das regionale Glukosestoffwechselmuster",
        "en": "It primarily describes the regional glucose metabolism pattern",
        "fa": "عمدتاً الگوی منطقه‌ای متابولیسم گلوکز را توصیف می‌کند"
      }
    ],
    "correct": "B",
    "feedback": {
      "de": "DaTSCAN beurteilt funktionelle präsynaptische dopaminerge Endigungen. Die zugelassene Aussage umfasst nicht die Trennung von PD, MSA und PSP. Klinisches Syndrom, Verlauf und ergänzende Untersuchungen bleiben entscheidend.",
      "en": "DaTSCAN assesses functional presynaptic dopaminergic terminals. Its approved interpretation does not include distinguishing PD, MSA and PSP. Clinical syndrome, course and additional tests remain essential.",
      "fa": "DaTSCAN پایانه‌های عملکردی دوپامینرژیک پیش‌سیناپسی را ارزیابی می‌کند. کاربرد تأییدشدهٔ آن شامل تفکیک PD، MSA و PSP نیست. سندرم بالینی، سیر بیماری و بررسی‌های تکمیلی همچنان تعیین‌کننده‌اند."
    },
    "wrong": [
      {
        "de": "Alle drei Syndrome können eine reduzierte striatale DAT-Bindung zeigen; die EMA-Produktinformation schließt diese spezifische Trennung ausdrücklich aus.",
        "en": "All three syndromes can show reduced striatal DAT binding; the EMA product information explicitly excludes this specific distinction.",
        "fa": "هر سه سندرم می‌توانند کاهش اتصال DAT استریاتال داشته باشند؛ اطلاعات فرآوردهٔ EMA صراحتاً این تفکیک مشخص را خارج از توان بررسی می‌داند."
      },
      {
        "de": "Ioflupan bindet an den Dopamintransporter an präsynaptischen Endigungen; ein postsynaptischer Rezeptortracer beantwortet eine andere Frage.",
        "en": "Ioflupane binds dopamine transporters at presynaptic terminals; a postsynaptic receptor tracer addresses a different question.",
        "fa": "یوفلوپان به ناقل دوپامین در پایانهٔ پیش‌سیناپسی متصل می‌شود؛ ردیاب گیرندهٔ پس‌سیناپسی پرسش دیگری را بررسی می‌کند."
      },
      {
        "de": "Regionale Glukosestoffwechselmuster werden mit FDG-PET beurteilt; sie sind nicht die Messgröße der DaTSCAN-SPECT.",
        "en": "Regional glucose metabolism patterns are assessed with FDG PET; they are not the measurement made by DaTSCAN SPECT.",
        "fa": "الگوهای منطقه‌ای متابولیسم گلوکز با FDG-PET ارزیابی می‌شوند؛ کمیت اندازه‌گیری‌شده در DaTSCAN-SPECT نیستند."
      }
    ],
    "front": {
      "de": "Welche zentrale Aussagegrenze hat ein pathologischer DaTSCAN bei Parkinson-Syndrom?",
      "en": "What is the central interpretive limitation of an abnormal DaTSCAN in parkinsonism?",
      "fa": "محدودیت اصلی تفسیر DaTSCAN غیرطبیعی در سندرم پارکینسونی چیست؟"
    },
    "answer": {
      "de": "Ein präsynaptisches dopaminerges Defizit stützt keine sichere Trennung von PD, MSA und PSP; die Syndromzuordnung bleibt klinisch.",
      "en": "A presynaptic dopaminergic deficit does not reliably distinguish PD, MSA and PSP; syndrome classification remains clinical.",
      "fa": "نقص دوپامینرژیک پیش‌سیناپسی PD، MSA و PSP را با اطمینان از هم جدا نمی‌کند؛ طبقه‌بندی سندرم همچنان بالینی است."
    }
  },
  {
    "key": "fdg-measurement",
    "source": "https://doi.org/10.2967/jnumed.124.268754",
    "goal": {
      "de": "FDG-PET als ergänzende Stoffwechselmuster-Beurteilung einordnen.",
      "en": "Interpret FDG PET as complementary metabolic-pattern assessment.",
      "fa": "FDG-PET را بررسی تکمیلی الگوی متابولیسم بدانید."
    },
    "question": {
      "de": "Trotz reduzierter DAT-Bindung bleibt die klinische Abgrenzung von PD gegenüber atypischem Parkinson-Syndrom offen. Eine ergänzende FDG-PET wird diskutiert. Welche zusätzliche Messgröße kann diese Untersuchung für die Differenzialdiagnose liefern?",
      "en": "Despite reduced DAT binding, clinical differentiation of PD from atypical parkinsonism remains uncertain. Complementary FDG PET is discussed. Which additional measurement can it provide for the differential?",
      "fa": "با وجود کاهش اتصال DAT، افتراق بالینی PD از سندرم پارکینسونی غیرمعمول همچنان نامشخص است. FDG-PET تکمیلی مطرح می‌شود. این بررسی کدام کمیت تکمیلی را برای افتراق ارائه می‌کند؟"
    },
    "options": [
      {
        "de": "Regionale Verteilung des Glukosestoffwechsels",
        "en": "Regional distribution of glucose metabolism",
        "fa": "توزیع منطقه‌ای متابولیسم گلوکز"
      },
      {
        "de": "Regionale Verfügbarkeit präsynaptischer Dopamintransporter",
        "en": "Regional availability of presynaptic dopamine transporters",
        "fa": "دسترسی منطقه‌ای ناقل‌های دوپامین پیش‌سیناپسی"
      },
      {
        "de": "Regionale Verfügbarkeit postsynaptischer D2-Rezeptoren",
        "en": "Regional availability of postsynaptic D2 receptors",
        "fa": "دسترسی منطقه‌ای گیرنده‌های D2 پس‌سیناپسی"
      },
      {
        "de": "Regionale Amyloidablagerung",
        "en": "Regional amyloid deposition",
        "fa": "رسوب منطقه‌ای آمیلوئید"
      }
    ],
    "correct": "A",
    "feedback": {
      "de": "FDG-PET beurteilt regionale Glukosestoffwechselmuster und kann die klinische Differenzialdiagnose von PD und atypischen Syndromen ergänzen. Relative Zu- und Abnahmen sind möglich; Therapie und klinischer Kontext beeinflussen die Einordnung. Sie wiederholt keine DAT-Messung.",
      "en": "FDG PET assesses regional glucose metabolism patterns and may complement clinical differentiation of PD and atypical syndromes. Relative increases and decreases can occur; treatment and clinical context affect interpretation. It does not repeat a DAT measurement.",
      "fa": "FDG-PET الگوهای منطقه‌ای متابولیسم گلوکز را ارزیابی می‌کند و می‌تواند افتراق بالینی PD و سندرم‌های غیرمعمول را تکمیل کند. افزایش و کاهش نسبی ممکن‌اند؛ درمان و زمینهٔ بالینی بر تفسیر اثر می‌گذارند. این روش تکرار اندازه‌گیری DAT نیست."
    },
    "wrong": [
      {
        "de": "Das ist die Zielgröße einer DAT-Untersuchung, nicht der FDG-PET. Ein zweiter Tracer muss nach seiner eigenen Zielstruktur interpretiert werden.",
        "en": "That is the target of DAT imaging, not FDG PET. Interpret a second tracer according to its own target.",
        "fa": "این کمیت هدف تصویربرداری DAT است، نه FDG-PET. ردیاب دوم باید بر اساس هدف خودش تفسیر شود."
      },
      {
        "de": "D2-Rezeptorverfügbarkeit erfordert einen dafür geeigneten Rezeptortracer; FDG misst keine D2-Bindung.",
        "en": "D2 receptor availability requires an appropriate receptor tracer; FDG does not measure D2 binding.",
        "fa": "دسترسی گیرندهٔ D2 به ردیاب مناسب گیرنده نیاز دارد؛ FDG اتصال D2 را اندازه نمی‌گیرد."
      },
      {
        "de": "Amyloid-PET verwendet eigene Tracer. FDG zeigt Stoffwechselverteilung, nicht direkt Amyloidablagerung.",
        "en": "Amyloid PET uses dedicated tracers. FDG shows metabolic distribution rather than directly depicting amyloid deposition.",
        "fa": "PET آمیلوئید از ردیاب‌های مخصوص استفاده می‌کند؛ FDG توزیع متابولیسم را نشان می‌دهد، نه رسوب مستقیم آمیلوئید."
      }
    ],
    "front": {
      "de": "Was ergänzt FDG-PET gegenüber DAT-SPECT in der Parkinson-Differenzialdiagnostik?",
      "en": "What does FDG PET add to DAT SPECT in the parkinsonian differential?",
      "fa": "FDG-PET در افتراق سندرم‌های پارکینسونی چه چیزی به DAT-SPECT اضافه می‌کند؟"
    },
    "answer": {
      "de": "Regionale Glukosestoffwechselmuster statt Transporterbindung; als Ergänzung zu Klinik und MRT, unter Beachtung von Therapieeinflüssen.",
      "en": "Regional glucose metabolism patterns rather than transporter binding; as a complement to clinical assessment and MRI, accounting for treatment effects.",
      "fa": "الگوهای منطقه‌ای متابولیسم گلوکز به‌جای اتصال ناقل؛ مکمل بالین و MRI، با توجه به اثر درمان."
    }
  }
])

block('aq-demenzmuster','/gehirn/neurodegeneration/demenzmuster',L('Demenzmuster im MRT','Dementia patterns on MRI','الگوهای دمانس در MRI'),'https://pmc.ncbi.nlm.nih.gov/articles/PMC8305846/',[
  {
    "key": "mta-components",
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8305846/",
    "correct": "A",
    "goal": {
      "de": "Den MTA-Score mit seinen anatomischen Komponenten und diagnostischen Grenzen anwenden.",
      "en": "Apply the MTA score using its anatomical components and diagnostic limits.",
      "fa": "امتیاز MTA را با اجزای آناتومیک و محدودیت‌های تشخیصی آن به کار ببرید."
    },
    "question": {
      "de": "Bei einer Gedächtnisstörung wird die mediale Temporallappenatrophie auf koronaren T1-Aufnahmen visuell bewertet. Welche Strukturgruppe geht unmittelbar in den MTA-Score ein?",
      "en": "In a patient with memory impairment, medial temporal atrophy is rated visually on coronal T1 images. Which group of structures directly contributes to the MTA score?",
      "fa": "در بیمار دچار اختلال حافظه، آتروفی تمپورال داخلی در تصاویر کرونال T1 به‌صورت دیداری امتیازدهی می‌شود. کدام گروه ساختاری مستقیماً در امتیاز MTA نقش دارد؟"
    },
    "options": [
      {
        "de": "Hippocampushöhe sowie Weite von Fissura choroidea und Temporalhorn",
        "en": "Hippocampal height and widths of the choroid fissure and temporal horn",
        "fa": "ارتفاع هیپوکامپ و پهنای شکاف کوروئید و شاخ تمپورال"
      },
      {
        "de": "Frontale Ventrikelweite, Balkenwinkel und Weite der Konvexitätssulci",
        "en": "Frontal ventricular width, callosal angle and convexity sulcal width",
        "fa": "پهنای بطن‌های پیشانی، زاویهٔ جسم پینه‌ای و پهنای شیارهای تحدب"
      },
      {
        "de": "Mittelhirnfläche, Ponsfläche und Breite des oberen Kleinhirnstiels",
        "en": "Midbrain area, pontine area and superior cerebellar peduncle width",
        "fa": "مساحت مغز میانی، مساحت پونز و پهنای پایهٔ فوقانی مخچه"
      },
      {
        "de": "Weite der frontalen und anteriortemporalen Sulci sowie Insulavolumen",
        "en": "Frontal and anterior temporal sulcal widths and insular volume",
        "fa": "پهنای شیارهای فرونتال و تمپورال قدامی و حجم اینسولا"
      }
    ],
    "feedback": {
      "de": "MTA erfasst Hippocampusformation und angrenzende Liquorräume: mit zunehmender Atrophie erweitern sich Fissura choroidea und Temporalhorn, die Hippocampushöhe nimmt ab. Beide Seiten beurteilen. Alter und verwendete Referenz beeinflussen die Einordnung; der Score allein beweist keine Alzheimer-Erkrankung.",
      "en": "MTA assesses the hippocampal formation and adjacent CSF spaces: with increasing atrophy, the choroid fissure and temporal horn widen and hippocampal height decreases. Assess both sides. Age and the chosen reference affect interpretation; the score alone does not establish Alzheimer disease.",
      "fa": "MTA ساختار هیپوکامپ و فضاهای مجاور مایع مغزی‌نخاعی را ارزیابی می‌کند: با افزایش آتروفی، شکاف کوروئید و شاخ تمپورال گشاد و ارتفاع هیپوکامپ کم می‌شود. دو طرف را بسنجید. سن و مرجع به‌کاررفته بر تفسیر اثر دارند؛ امتیاز به‌تنهایی آلزایمر را ثابت نمی‌کند."
    },
    "wrong": [
      {
        "de": "Diese Größen dienen der Ventrikel-/Liquorraumbeurteilung; sie ersetzen die hippokampalen MTA-Komponenten nicht.",
        "en": "These parameters assess ventricles and CSF spaces; they do not replace the hippocampal MTA components.",
        "fa": "این پارامترها برای ارزیابی بطن‌ها و فضاهای مایع‌اند و جای اجزای هیپوکامپی MTA را نمی‌گیرند."
      },
      {
        "de": "Diese Strukturen gehören zu einer infratentoriellen Musterbeurteilung, nicht zur visuellen MTA-Skala.",
        "en": "These structures belong to infratentorial pattern assessment rather than the visual MTA scale.",
        "fa": "این ساختارها مربوط به ارزیابی الگوهای زیرچادرینه‌ای‌اند، نه مقیاس دیداری MTA."
      },
      {
        "de": "Diese Regionen können für andere Atrophiemuster relevant sein; die MTA-Skala richtet sich auf Hippocampus und angrenzende Liquorräume.",
        "en": "These regions may matter in other atrophy patterns; MTA specifically rates the hippocampus and adjacent CSF spaces.",
        "fa": "این نواحی ممکن است در الگوهای دیگر آتروفی مهم باشند؛ MTA مشخصاً هیپوکامپ و فضاهای مایع مجاور را می‌سنجد."
      }
    ],
    "front": {
      "de": "Welche drei anatomischen Komponenten beurteilt der visuelle MTA-Score, und was beweist er nicht?",
      "en": "Which three anatomical components does the visual MTA score assess, and what does it not establish?",
      "fa": "امتیاز دیداری MTA کدام سه جزء آناتومیک را می‌سنجد و چه چیزی را ثابت نمی‌کند؟"
    },
    "answer": {
      "de": "Hippocampushöhe, Fissura-choroidea-Weite und Temporalhornweite auf koronaren T1-Aufnahmen; allein kein Alzheimer-Nachweis, alters- und referenzbezogen bewerten.",
      "en": "Hippocampal height, choroid fissure width and temporal horn width on coronal T1 images; not proof of Alzheimer disease alone, interpreted with age and reference.",
      "fa": "ارتفاع هیپوکامپ، پهنای شکاف کوروئید و شاخ تمپورال در T1 کرونال؛ به‌تنهایی اثبات آلزایمر نیست و با سن و مرجع تفسیر می‌شود."
    }
  },
  {
    "key": "dlb-biomarker",
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5496518/",
    "correct": "C",
    "goal": {
      "de": "Strukturelle Hinweise bei DLB von einem indikativen nuklearmedizinischen Biomarker unterscheiden.",
      "en": "Distinguish structural clues in DLB from an indicative nuclear-medicine biomarker.",
      "fa": "سرنخ‌های ساختاری DLB را از نشانگر زیستی شاخص در پزشکی هسته‌ای متمایز کنید."
    },
    "question": {
      "de": "Bei klinischem Verdacht auf Lewy-Körper-Demenz ist der mediale Temporallappen im MRT relativ erhalten. Welcher zusätzliche Bildbefund zählt nach dem DLB-Konsensus 2017 als indikativer Biomarker?",
      "en": "With clinical concern for dementia with Lewy bodies, MRI shows relative medial temporal preservation. Which additional imaging finding is an indicative biomarker in the 2017 DLB consensus?",
      "fa": "در شک بالینی به دمانس با اجسام لویی، تمپورال داخلی در MRI نسبتاً حفظ شده است. طبق اجماع DLB سال ۲۰۱۷، کدام یافتهٔ تصویری اضافی در گروه نشانگرهای زیستی شاخص قرار می‌گیرد؟"
    },
    "options": [
      {
        "de": "Okzipital betonter Minderstoffwechsel im FDG-PET",
        "en": "Occipital-predominant hypometabolism on FDG PET",
        "fa": "کاهش متابولیسم با غلبهٔ اکسیپیتال در FDG-PET"
      },
      {
        "de": "Relative Erhaltung des Hippocampusvolumens im MRT",
        "en": "Relative preservation of hippocampal volume on MRI",
        "fa": "حفظ نسبی حجم هیپوکامپ در MRI"
      },
      {
        "de": "Verminderte striatale Dopamintransporteraufnahme in SPECT/PET",
        "en": "Reduced striatal dopamine-transporter uptake on SPECT/PET",
        "fa": "کاهش برداشت ناقل دوپامین استریاتال در SPECT/PET"
      },
      {
        "de": "Diffuse Minderperfusion mit okzipitaler Betonung in der SPECT",
        "en": "Diffuse hypoperfusion with occipital predominance on SPECT",
        "fa": "کاهش منتشر پرفیوژن با غلبهٔ اکسیپیتال در SPECT"
      }
    ],
    "feedback": {
      "de": "Verminderte striatale DAT-Aufnahme gehört zu den indikativen Biomarkern; relative MTL-Erhaltung und das genannte Perfusions-/Stoffwechselmuster sind unterstützende Hinweise. Auch DAT-Bildgebung wird mit Klinik und Differenzialdiagnosen interpretiert; sie beweist DLB nicht allein und trennt nicht jede degenerative Parkinson-Erkrankung.",
      "en": "Reduced striatal DAT uptake is an indicative biomarker; relative MTL preservation and the stated perfusion/metabolic patterns are supportive clues. DAT imaging still requires clinical and differential-diagnostic correlation; it does not establish DLB alone or distinguish every degenerative parkinsonian disorder.",
      "fa": "کاهش برداشت استریاتال DAT در گروه نشانگرهای شاخص است؛ حفظ نسبی تمپورال داخلی و الگوهای پرفیوژن/متابولیسم ذکرشده یافته‌های حمایتی‌اند. تصویربرداری DAT نیز با بالین و افتراق‌ها تفسیر می‌شود؛ به‌تنهایی DLB را ثابت نمی‌کند و همهٔ اختلالات پارکینسونی دژنراتیو را از هم جدا نمی‌کند."
    },
    "wrong": [
      {
        "de": "Okzipital betonter Minderstoffwechsel ist ein unterstützender Biomarker, nicht die hier gesuchte indikative DAT-Kategorie.",
        "en": "Occipital-predominant hypometabolism is supportive, rather than the indicative DAT category asked for here.",
        "fa": "کاهش متابولیسم با غلبهٔ اکسیپیتال یافته‌ای حمایتی است، نه گروه شاخص مربوط به DAT که اینجا پرسیده شده است."
      },
      {
        "de": "Relative MTL-Erhaltung ist ein struktureller unterstützender Hinweis; sie ersetzt den indikativen DAT-Biomarker nicht.",
        "en": "Relative MTL preservation is a structural supportive clue; it does not replace the indicative DAT biomarker.",
        "fa": "حفظ نسبی تمپورال داخلی سرنخ ساختاری حمایتی است و جای نشانگر شاخص مربوط به DAT را نمی‌گیرد."
      },
      {
        "de": "Die Perfusions-/Stoffwechselkategorie ist unterstützend und weniger spezifisch; gefragt ist die indikative striatale DAT-Veränderung.",
        "en": "The perfusion/metabolism category is supportive and less specific; the question asks for the indicative striatal DAT finding.",
        "fa": "گروه پرفیوژن/متابولیسم حمایتی و کم‌اختصاص‌تر است؛ سؤال یافتهٔ استریاتال DAT در گروه شاخص را می‌خواهد."
      }
    ],
    "front": {
      "de": "Wie unterscheiden sich relative MTL-Erhaltung und verminderte DAT-Aufnahme im DLB-Konsensus 2017?",
      "en": "How do relative MTL preservation and reduced DAT uptake differ in the 2017 DLB consensus?",
      "fa": "حفظ نسبی تمپورال داخلی و کاهش برداشت DAT در اجماع DLB سال ۲۰۱۷ چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "MTL-Erhaltung: unterstützender struktureller Hinweis. Reduzierte striatale DAT-Aufnahme: indikativer Biomarker; beide benötigen klinische Einordnung, keine alleinige Diagnose.",
      "en": "MTL preservation: supportive structural clue. Reduced striatal DAT uptake: indicative biomarker; both require clinical interpretation and neither establishes the diagnosis alone.",
      "fa": "حفظ تمپورال داخلی: سرنخ ساختاری حمایتی. کاهش برداشت استریاتال DAT: نشانگر شاخص؛ هر دو به تفسیر بالینی نیاز دارند و هیچ‌یک به‌تنهایی تشخیص را تعیین نمی‌کند."
    }
  },
  {
    "key": "ftd-pattern",
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3170532/",
    "correct": "B",
    "goal": {
      "de": "Ein frontotemporales Atrophiemuster im passenden klinischen Kontext erkennen und die Diagnosegrenze benennen.",
      "en": "Recognise frontotemporal atrophy in its clinical context and state its diagnostic limit.",
      "fa": "الگوی آتروفی فرونتوتمپورال را در زمینهٔ بالینی مناسب بشناسید و محدودیت تشخیصی آن را بیان کنید."
    },
    "question": {
      "de": "Eine Person entwickelt fortschreitend Enthemmung und verändertes Sozialverhalten. Welche MRT-Verteilung würde eine klinisch vermutete frontotemporale Degeneration am ehesten unterstützen?",
      "en": "A person develops progressive disinhibition and altered social behaviour. Which MRI distribution would most strongly support the clinically suspected frontotemporal degeneration?",
      "fa": "فردی به‌تدریج دچار مهارگسیختگی و تغییر رفتار اجتماعی می‌شود. کدام توزیع MRI بیشتر از دژنراسیون فرونتوتمپورالِ مطرح‌شده در بالین حمایت می‌کند؟"
    },
    "options": [
      {
        "de": "Vorwiegend beidseitige mesiotemporale Atrophie",
        "en": "Predominantly bilateral medial temporal atrophy",
        "fa": "آتروفی عمدتاً دوطرفهٔ تمپورال داخلی"
      },
      {
        "de": "Betonte, oft asymmetrische frontale und/oder anteriortemporale Atrophie",
        "en": "Prominent, often asymmetric frontal and/or anterior temporal atrophy",
        "fa": "آتروفی برجسته و اغلب نامتقارن فرونتال و/یا تمپورال قدامی"
      },
      {
        "de": "Vorwiegend parietookzipitale Atrophie bei relativ erhaltenen vorderen Regionen",
        "en": "Predominantly parieto-occipital atrophy with relatively preserved anterior regions",
        "fa": "آتروفی عمدتاً پاریتواُکسیپیتال با حفظ نسبی نواحی قدامی"
      },
      {
        "de": "Gleichmäßig verteilte globale Atrophie ohne regionalen Schwerpunkt",
        "en": "Uniform global atrophy without a regional predominance",
        "fa": "آتروفی منتشر یکنواخت بدون غلبهٔ ناحیه‌ای"
      }
    ],
    "feedback": {
      "de": "Frontal und anteriortemporal betonte Atrophie unterstützt das passende klinische Syndrom. Bildgebung allein legt weder die Variante noch eine gesicherte bvFTD fest. Für die wahrscheinliche bvFTD werden passende klinische Kriterien, funktioneller Abbau und unterstützende Bildgebung zusammengeführt; andere Ursachen müssen berücksichtigt werden.",
      "en": "Frontal and anterior temporal-predominant atrophy supports the matching clinical syndrome. Imaging alone establishes neither the variant nor definite bvFTD. Probable bvFTD integrates compatible clinical criteria, functional decline and supportive imaging, with competing causes considered.",
      "fa": "آتروفی با غلبهٔ فرونتال و تمپورال قدامی از سندرم بالینی سازگار حمایت می‌کند. تصویربرداری به‌تنهایی نه گونه و نه bvFTD قطعی را تعیین می‌کند. در bvFTD محتمل، معیارهای بالینی سازگار، افت عملکرد و تصویربرداری حمایتی با هم ارزیابی و علل دیگر در نظر گرفته می‌شوند."
    },
    "wrong": [
      {
        "de": "Mesiotemporale Atrophie ist unter anderem im amnestischen Alzheimer-Spektrum relevant, aber nicht das hier gesuchte frontotemporal betonte Unterstützungsmuster.",
        "en": "Medial temporal atrophy matters, among other contexts, in the amnestic Alzheimer spectrum, but is not the frontal/anterior temporal support pattern requested here.",
        "fa": "آتروفی تمپورال داخلی از جمله در طیف آلزایمرِ همراه اختلال حافظه مهم است، ولی الگوی حمایتی فرونتال/تمپورال قدامیِ مورد سؤال نیست."
      },
      {
        "de": "Eine posterior betonte Verteilung verlangt eine andere Muster- und klinische Einordnung; sie ist nicht das typische vordere Unterstützungsmuster dieses Falls.",
        "en": "A posterior-predominant distribution calls for different pattern and clinical assessment; it is not the typical anterior support pattern in this vignette.",
        "fa": "توزیع با غلبهٔ خلفی به تفسیر الگویی و بالینی دیگری نیاز دارد و الگوی حمایتی قدامیِ تیپیک این سناریو نیست."
      },
      {
        "de": "Globale Atrophie ohne Schwerpunkt ist unspezifischer; die regionale frontale/anteriortemporale Betonung ist hier der gezieltere Hinweis.",
        "en": "Global atrophy without a predominance is less specific; frontal/anterior temporal regional emphasis is the more targeted clue here.",
        "fa": "آتروفی منتشر بدون غلبهٔ ناحیه‌ای کم‌اختصاص‌تر است؛ تأکید فرونتال/تمپورال قدامی اینجا سرنخ هدفمندتری است."
      }
    ],
    "front": {
      "de": "Welche Atrophieverteilung unterstützt ein frontotemporales Syndrom, und was braucht die wahrscheinliche bvFTD zusätzlich?",
      "en": "Which atrophy distribution supports a frontotemporal syndrome, and what else is needed for probable bvFTD?",
      "fa": "کدام توزیع آتروفی از سندرم فرونتوتمپورال حمایت می‌کند و bvFTD محتمل به چه موارد دیگری نیاز دارد؟"
    },
    "answer": {
      "de": "Frontal und/oder anteriortemporal betonte, oft asymmetrische Atrophie; zusätzlich passende klinische Kriterien und funktioneller Abbau. Kein gesicherter Nachweis durch MRT allein.",
      "en": "Frontal and/or anterior temporal-predominant, often asymmetric atrophy; also compatible clinical criteria and functional decline. MRI alone is not definitive proof.",
      "fa": "آتروفی برجستهٔ فرونتال و/یا تمپورال قدامی، اغلب نامتقارن؛ همراه معیارهای بالینی سازگار و افت عملکرد. MRI به‌تنهایی اثبات قطعی نیست."
    }
  }
])

export function newQuestions(lang = 'de') {
  const locale = ['de', 'en', 'fa'].includes(lang) ? lang : 'de'
  return blocks.flatMap(b => b.items.map(item => {
    const ids = ['A', 'B', 'C', 'D']
    const wrongIds = ids.filter(id => id !== item.correct)
    return { id: `aq-brain-${b.topicId}-${locale}-${item.key}`, fach: 'gehirn', tags: [b.topicId], question: item.question[locale], options: item.options.map((text, i) => ({ id: ids[i], text: text[locale] })), correct: item.correct, explanation: item.feedback[locale], wrongExplanations: Object.fromEntries(wrongIds.map((id, i) => [id, item.wrong[i][locale]])), source: item.source || b.source }
  }))
}
export const newCards = blocks.flatMap(b => b.items.map(item => ({ id: `aq-brain-${b.topicId}-${item.key}`, topicId: b.topicId, category: b.title, front: item.front, answer: item.answer, explanation: item.feedback, diagram: L('', '', ''), source: item.source || b.source })))
newCards.push({ id: 'aq-brain-chiari-landmark-context', topicId: 'chiari-malformation', category: L('Chiari-Malformation', 'Chiari malformation', 'مالفورماسیون کیاری'), front: L('An welchen Landmarken wird die Tonsillenlage gemessen, und was muss zusätzlich beurteilt werden?', 'Which landmarks define tonsillar-position measurement, and what else must be assessed?', 'موقعیت لوزه‌ها نسبت به کدام نشانه‌های آناتومیک اندازه‌گیری می‌شود و چه چیزهای دیگری باید بررسی شوند؟'), answer: L('Senkrecht zur McRae-Linie zwischen Basion und Opisthion; zusätzlich Tonsillenform, Enge, Begleitbefunde und erworbene Ursachen beurteilen.', 'Perpendicular to McRae’s line from basion to opisthion; also assess tonsillar shape, crowding, associated findings, and acquired causes.', 'عمود بر خط مک‌ری بین بازیون و اوپیستیون؛ شکل لوزه‌ها، ازدحام، یافته‌های همراه و علل اکتسابی را نیز بررسی کنید.'), explanation: L('Eine Distanz allein stellt keine klinische Chiari-Diagnose. Bei unklarer oder asymmetrischer Tonsillenlage helfen multiplanare Rekonstruktionen.', 'A distance alone does not establish clinical Chiari diagnosis. Multiplanar reformats help with uncertain or asymmetric tonsillar position.', 'یک فاصله به‌تنهایی تشخیص بالینی کیاری را ثابت نمی‌کند. بازسازی‌های چندصفحه‌ای در موقعیت نامطمئن یا نامتقارن لوزه‌ها کمک‌کننده‌اند.'), source: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9130617/' })
export const topics = blocks.map(b => ({ id: b.topicId, title: b.title, subject: 'gehirn', description: L('Klinische Bildinterpretation und Befundentscheidungen', 'Clinical image interpretation and reporting decisions', 'تفسیر بالینی تصاویر و تصمیم‌های گزارش‌نویسی'), href: `/flashcards/${b.topicId}` }))
export const routeCoverage = blocks.map(b => ({ route: b.route, topicId: b.topicId, learningGoals: b.items.map(item => ({ id: item.key, text: item.goal, questionIds: [`aq-brain-${b.topicId}-de-${item.key}`], cardIds: [`aq-brain-${b.topicId}-${item.key}`] })), status: 'AUTHORED_REVIEW_PENDING' }))
routeCoverage.find(x => x.topicId === 'chiari-malformation').learningGoals.unshift({ id: 'measure-and-context', text: L('Tonsillenlage mit Landmarken, Morphologie und erworbenen Ursachen einordnen.', 'Interpret tonsillar position with landmarks, morphology, and acquired causes.', 'موقعیت لوزه‌ها را با نشانه‌های آناتومیک، شکل‌شناسی و علل اکتسابی تفسیر کنید.'), questionIds: ['chiari-malformation-de-1'], cardIds: ['aq-brain-chiari-landmark-context'] })
routeCoverage.push({
  "route": "/gehirn/anatomie/normaldruckhydrozephalus",
  "topicId": "normaldruckhydrozephalus",
  "learningGoals": [
    {
      "id": "ventriculomegaly-pattern",
      "text": {
        "de": "Ventrikulomegalie und DESH von proportionaler Atrophie abgrenzen und angemessen berichten.",
        "en": "Distinguish ventriculomegaly/DESH from proportional atrophy and report appropriately.",
        "fa": "بزرگی بطن و DESH را از آتروفی متناسب تفکیک و مناسب گزارش کنید."
      },
      "questionIds": [
        "normaldruckhydrozephalus-de-04",
        "normaldruckhydrozephalus-de-05",
        "normaldruckhydrozephalus-de-08",
        "normaldruckhydrozephalus-de-12"
      ],
      "cardIds": [
        "normaldruckhydrozephalus-06-desh",
        "normaldruckhydrozephalus-07-atrophie",
        "normaldruckhydrozephalus-15-befund"
      ]
    },
    {
      "id": "standard-measurement",
      "text": {
        "de": "Evans-Index und Balkenwinkel in standardisierten Ebenen beurteilen.",
        "en": "Assess Evans index and callosal angle in standardised planes.",
        "fa": "شاخص ایوانز و زاویهٔ کالوزال را در صفحات استاندارد ارزیابی کنید."
      },
      "questionIds": [
        "normaldruckhydrozephalus-de-03",
        "normaldruckhydrozephalus-de-06",
        "normaldruckhydrozephalus-de-07"
      ],
      "cardIds": [
        "normaldruckhydrozephalus-04-evans",
        "normaldruckhydrozephalus-05-callosal"
      ]
    },
    {
      "id": "supporting-imaging-limits",
      "text": {
        "de": "Flusszeichen, periventrikuläres Signal und Cingulum-Morphologie als unterstützend und begrenzt einordnen.",
        "en": "Interpret flow signs, periventricular signal and cingulate morphology as supportive and limited.",
        "fa": "نشانه‌های جریان، سیگنال پیرابطنی و مورفولوژی سینگولیت را حمایتی و دارای محدودیت تفسیر کنید."
      },
      "questionIds": [
        "normaldruckhydrozephalus-de-09"
      ],
      "cardIds": [
        "normaldruckhydrozephalus-08-polkappen",
        "normaldruckhydrozephalus-09-flowvoid",
        "normaldruckhydrozephalus-10-cingulate"
      ]
    },
    {
      "id": "clinical-profile",
      "text": {
        "de": "Das typische Gang-/Triasprofil und die klinisch-radiologische Definition nennen.",
        "en": "Recall the typical gait/triad profile and clinical-radiological definition.",
        "fa": "الگوی معمول راه‌رفتن/تریاد و تعریف بالینی‌ـ‌تصویری را بیان کنید."
      },
      "questionIds": [
        "normaldruckhydrozephalus-de-01",
        "normaldruckhydrozephalus-de-02"
      ],
      "cardIds": [
        "normaldruckhydrozephalus-01-definition",
        "normaldruckhydrozephalus-02-trias",
        "normaldruckhydrozephalus-03-gang"
      ]
    },
    {
      "id": "functional-selection",
      "text": {
        "de": "Tap-Test methodisch bewerten und Nutzen/Risiko der individuellen Shunt-Auswahl einordnen.",
        "en": "Evaluate tap-test methodology and interpret benefit/risk in individual shunt selection.",
        "fa": "روش آزمون تخلیه را ارزیابی و سود و خطر را در انتخاب فردی شانت تفسیر کنید."
      },
      "questionIds": [
        "normaldruckhydrozephalus-de-10",
        "normaldruckhydrozephalus-de-11",
        "normaldruckhydrozephalus-de-12"
      ],
      "cardIds": [
        "normaldruckhydrozephalus-11-tap",
        "normaldruckhydrozephalus-12-drainage",
        "normaldruckhydrozephalus-13-shunt",
        "normaldruckhydrozephalus-14-komplikation"
      ]
    }
  ],
  "status": "AUTHOR_FULL_ORIGINAL_BANK_REVIEW_READY"
})

routeCoverage.push({
  "route": "/gehirn/vaskulaer/dva",
  "topicId": "dva",
  "status": "AUTHOR_FULL_ORIGINAL_BANK_REVIEW_READY",
  "learningGoals": [
    {
      "id": "recognise-architecture",
      "text": {
        "de": "Die typische venöse Architektur erkennen und von Shuntläsionen abgrenzen.",
        "en": "Recognise typical venous architecture and distinguish shunting lesions.",
        "fa": "معماری وریدی تیپیک را بشناسید و از ضایعات شانت‌دار تفکیک کنید."
      },
      "questionIds": [
        "dva-de-01",
        "dva-de-02",
        "dva-de-08"
      ],
      "cardIds": [
        "dva-01-definition",
        "dva-02-häufigkeit",
        "dva-03-caput",
        "dva-08-avm"
      ]
    },
    {
      "id": "choose-complementary-sequences",
      "text": {
        "de": "Postkontrast-T1, SWI und DWI ihren unterschiedlichen diagnostischen Aufgaben zuordnen.",
        "en": "Assign postcontrast T1, SWI and DWI to their distinct diagnostic tasks.",
        "fa": "T1 پس از تزریق، SWI و DWI را به نقش‌های تشخیصی متفاوتشان مرتبط کنید."
      },
      "questionIds": [
        "dva-de-03",
        "dva-de-04",
        "dva-de-09"
      ],
      "cardIds": [
        "dva-04-sequenz",
        "dva-05-swi",
        "dva-06-kavernom",
        "dva-07-dwi"
      ]
    },
    {
      "id": "evaluate-symptomatic-dva",
      "text": {
        "de": "Bei neuen Symptomen oder Blutung Begleitläsion und venösen Abfluss gezielt prüfen.",
        "en": "Evaluate associated lesions and venous outflow with new symptoms or haemorrhage.",
        "fa": "در علائم یا خونریزی جدید، ضایعات همراه و خروج وریدی را هدفمند بررسی کنید."
      },
      "questionIds": [
        "dva-de-07",
        "dva-de-10"
      ],
      "cardIds": [
        "dva-09-symptome",
        "dva-10-thrombose"
      ]
    },
    {
      "id": "report-and-preserve-drainage",
      "text": {
        "de": "Eine unkomplizierte DVA angemessen berichten und notwendige Drainage bei Eingriffen berücksichtigen.",
        "en": "Report uncomplicated DVA appropriately and account for essential drainage during interventions.",
        "fa": "DVA بدون عارضه را مناسب گزارش کنید و در مداخلات تخلیهٔ ضروری را لحاظ کنید."
      },
      "questionIds": [
        "dva-de-05",
        "dva-de-06",
        "dva-de-11",
        "dva-de-12"
      ],
      "cardIds": [
        "dva-11-therapie",
        "dva-12-sammelvene",
        "dva-13-dsa",
        "dva-14-befund",
        "dva-15-operation"
      ]
    }
  ]
})

routeCoverage.push({
  "route": "/gehirn/vaskulaer/kapillaere-teleangiektasie",
  "topicId": "kapillaere-teleangiektasie",
  "status": "AUTHOR_FULL_ORIGINAL_BANK_REVIEW_READY",
  "learningGoals": [
    {
      "id": "recognise-morphology",
      "text": {
        "de": "Die typische Morphologie, Lokalisation und Grundhistologie mit Sequenzkorrelation erkennen.",
        "en": "Recognise typical morphology, location and basic histology with sequence correlation.",
        "fa": "مورفولوژی، محل و بافت‌شناسی پایهٔ تیپیک را با تطبیق سکانس‌ها بشناسید."
      },
      "questionIds": [
        "kapillaere-teleangiektasie-de-01",
        "kapillaere-teleangiektasie-de-02",
        "kapillaere-teleangiektasie-de-03",
        "kapillaere-teleangiektasie-de-05"
      ],
      "cardIds": [
        "kapillaere-teleangiektasie-01-definition",
        "kapillaere-teleangiektasie-02-lokalisation",
        "kapillaere-teleangiektasie-03-enhancement",
        "kapillaere-teleangiektasie-05-trias",
        "kapillaere-teleangiektasie-06-t2"
      ]
    },
    {
      "id": "interpret-susceptibility-and-associations",
      "text": {
        "de": "Suszeptibilität von Blutungsnachweis trennen und DVA/Kavernom als Begleitbefunde einordnen.",
        "en": "Separate susceptibility from proven haemorrhage and interpret associated DVA/cavernoma.",
        "fa": "سوسپتیبیلیتی را از اثبات خونریزی جدا و DVA/کاورنوم همراه را تفسیر کنید."
      },
      "questionIds": [
        "kapillaere-teleangiektasie-de-04",
        "kapillaere-teleangiektasie-de-07",
        "kapillaere-teleangiektasie-de-08"
      ],
      "cardIds": [
        "kapillaere-teleangiektasie-04-swi",
        "kapillaere-teleangiektasie-08-blutung",
        "kapillaere-teleangiektasie-09-dva",
        "kapillaere-teleangiektasie-10-kavernom",
        "kapillaere-teleangiektasie-15-assoziation"
      ]
    },
    {
      "id": "recognise-limits-and-red-flags",
      "text": {
        "de": "DWI/ADC mit technischer Qualität beurteilen und atypische Expansion oder Restriktion erkennen.",
        "en": "Interpret DWI/ADC with technical quality and recognise atypical expansion or restriction.",
        "fa": "DWI/ADC را با توجه به کیفیت فنی تفسیر و گسترش یا محدودیت غیرتیپیک را شناسایی کنید."
      },
      "questionIds": [
        "kapillaere-teleangiektasie-de-06",
        "kapillaere-teleangiektasie-de-09"
      ],
      "cardIds": [
        "kapillaere-teleangiektasie-07-dwi",
        "kapillaere-teleangiektasie-13-atypisch"
      ]
    },
    {
      "id": "report-and-correlate-clinically",
      "text": {
        "de": "Typische stabile Befunde angemessen berichten, klinische Kausalität prüfen und unnötige Eskalation vermeiden.",
        "en": "Report typical stable findings appropriately, assess clinical causality and avoid unnecessary escalation.",
        "fa": "یافتهٔ تیپیک و پایدار را مناسب گزارش کنید، رابطهٔ علّی بالینی را بررسی و از تشدید غیرضروری اقدامات پرهیز کنید."
      },
      "questionIds": [
        "kapillaere-teleangiektasie-de-10",
        "kapillaere-teleangiektasie-de-11",
        "kapillaere-teleangiektasie-de-12"
      ],
      "cardIds": [
        "kapillaere-teleangiektasie-11-management",
        "kapillaere-teleangiektasie-12-biopsie",
        "kapillaere-teleangiektasie-14-befund"
      ]
    }
  ]
})

newCards.push(...[
  {
    "id": "aq-brain-nf1-fasi",
    "topicId": "neurofibromatose-typ1",
    "category": {
      "de": "NF1",
      "en": "NF1",
      "fa": "NF1"
    },
    "front": {
      "de": "Welche Befunde stützen typische FASI bei NF1, und was beweisen sie nicht?",
      "en": "Which findings support typical FASI in NF1, and what do they not establish?",
      "fa": "کدام یافته‌ها از FASI تیپیک در NF1 حمایت می‌کنند و چه چیزی را ثابت نمی‌کنند؟"
    },
    "answer": {
      "de": "T2/FLAIR-helle, meist nicht expansive und nicht anreichernde Herde in typischer Verteilung; kein eigenständiges NF1-Kriterium und kein sicherer Gliomausschluss.",
      "en": "T2/FLAIR-bright, usually nonexpansile and nonenhancing foci in a typical distribution; not an independent NF1 criterion or a definitive glioma exclusion.",
      "fa": "کانون‌های روشن T2/FLAIR، معمولاً بدون گسترش یا جذب مادهٔ حاجب در توزیع تیپیک؛ نه معیار مستقل NF1 و نه رد قطعی گلیوم."
    },
    "explanation": {
      "de": "Verteilung, Symmetrie und fehlende Expansion passen zu typischen FASI. Die Einordnung bleibt morphologisch und im Verlauf zu prüfen: Auch Gliome können nicht anreichern, und FASI sind kein NF1-Diagnosekriterium.",
      "en": "Distribution, symmetry and lack of expansion fit typical FASI. Interpretation still requires morphology and evolution: gliomas may also lack enhancement, and FASI are not an NF1 diagnostic criterion.",
      "fa": "توزیع، تقارن و نبود گسترش با FASI تیپیک سازگارند. تفسیر همچنان به مورفولوژی و سیر وابسته است؛ گلیوم نیز ممکن است جذب مادهٔ حاجب نداشته باشد و FASI معیار تشخیصی NF1 نیست."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8041008/"
  },
  {
    "id": "aq-brain-nf1-pathway",
    "topicId": "neurofibromatose-typ1",
    "category": {
      "de": "NF1",
      "en": "NF1",
      "fa": "NF1"
    },
    "front": {
      "de": "Wann ist bei einem Kind mit NF1 eine MRT zur OPG-Abklärung angezeigt?",
      "en": "When is MRI for OPG evaluation indicated in a child with NF1?",
      "fa": "در کودک مبتلا به NF1، چه زمانی MRI برای بررسی OPG لازم می‌شود؟"
    },
    "answer": {
      "de": "Bei verdächtigem Augenbefund, etwa neuer Visusminderung; Gehirn/Orbitae und die gesamte Sehbahn erfassen und mit Augen-/NF1-Experten einordnen.",
      "en": "With suspicious ophthalmological findings such as new visual loss; cover brain/orbits and the full pathway and correlate with ophthalmology/NF1 experts.",
      "fa": "در یافتهٔ مشکوک چشم‌پزشکی مانند کاهش جدید بینایی؛ مغز/اربیت و تمام مسیر بررسی و با متخصصان چشم و NF1 تفسیر شود."
    },
    "explanation": {
      "de": "Ein verdächtiger Augenbefund rechtfertigt eine MRT von Gehirn und Orbitae. Nerven, Chiasma und Tractus im Verlauf beurteilen; ein symptomatisches OPG gehört zeitnah in ein erfahrenes Team. Bildmorphologie allein bestimmt die Behandlung nicht.",
      "en": "A suspicious ophthalmological finding warrants brain and orbital MRI. Assess the nerves, chiasm and tracts along their course; symptomatic OPG requires prompt review by an experienced team. Morphology alone does not determine treatment.",
      "fa": "یافتهٔ مشکوک چشم‌پزشکی MRI مغز و اربیت را توجیه می‌کند. عصب‌ها، کیاسما و تراکت‌ها در امتداد مسیر بررسی شوند؛ OPG علامت‌دار نیازمند ارزیابی به‌موقع تیم باتجربه است. مورفولوژی به‌تنهایی درمان را تعیین نمی‌کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9845795/"
  },
  {
    "id": "aq-brain-nf1-systemic",
    "topicId": "neurofibromatose-typ1",
    "category": {
      "de": "NF1",
      "en": "NF1",
      "fa": "NF1"
    },
    "front": {
      "de": "Welche neuen Zeichen eines plexiformen Neurofibroms lösen eine gezielte Abklärung aus?",
      "en": "Which new features of plexiform neurofibroma trigger targeted investigation?",
      "fa": "کدام ویژگی‌های جدید نوروفیبروم پلکس‌فرم بررسی هدفمند را ضروری می‌کنند؟"
    },
    "answer": {
      "de": "Anhaltende neue Schmerzen, rasches Wachstum oder neue neurologische Defizite: regionales MRT und spezialisiertes NF1-/Tumorteam; keine Diagnose aus dem Target-Zeichen allein.",
      "en": "Persistent new pain, rapid growth or new neurological deficits: regional MRI and specialist NF1/tumour assessment; do not diagnose from the target sign alone.",
      "fa": "درد جدید و پایدار، رشد سریع یا نقص عصبی جدید: MRI ناحیه‌ای و ارزیابی تخصصی NF1/تومور؛ تشخیص صرفاً بر اساس نشانهٔ هدف تعیین نشود."
    },
    "explanation": {
      "de": "Neue persistierende Schmerzen und beschleunigtes Wachstum sind Warnzeichen für eine atypische oder maligne Veränderung und verlangen gezielte Abklärung. Die Leitlinie beginnt mit regionaler MRT und spezialisiertem Team; weitere metabolische Bildgebung und Gewebegewinnung werden individuell geplant. Ein einzelnes MRT-Zeichen beweist Malignität nicht.",
      "en": "New persistent pain and accelerated growth are warning signs of atypical or malignant change requiring targeted investigation. The guideline starts with regional MRI and an expert team; further metabolic imaging and tissue sampling are planned individually. No single MRI sign establishes malignancy.",
      "fa": "درد جدیدِ پایدار و رشد شتاب‌گرفته علائم هشدار تغییر آتیپیک یا بدخیم و نیازمند بررسی هدفمندند. راهنما با MRI ناحیه‌ای و تیم تخصصی شروع می‌کند؛ تصویربرداری متابولیک و نمونه‌برداری بعدی فردی برنامه‌ریزی می‌شوند. هیچ نشانهٔ منفرد MRI بدخیمی را ثابت نمی‌کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9845795/"
  },
  {
    "id": "aq-brain-nf1-enhancing-fasi",
    "topicId": "neurofibromatose-typ1",
    "category": {
      "de": "NF1",
      "en": "NF1",
      "fa": "NF1"
    },
    "front": {
      "de": "Welche Verlaufsänderungen eines möglichen anreichernden FASI sollten eine Tumor-Neubewertung auslösen?",
      "en": "Which interval changes in possible enhancing FASI should trigger tumour reassessment?",
      "fa": "کدام تغییرات زمانی در FASI احتمالیِ دارای جذب مادهٔ حاجب باید بازبینی از نظر تومور را مطرح کنند؟"
    },
    "answer": {
      "de": "Neue zystische Anteile oder erneute deutliche Progression nach Rückbildung; seltene anreichernde FASI und niedriggradige Gliome können sich überlappen.",
      "en": "New cystic components or renewed clear progression after regression; rare enhancing FASI and low-grade glioma can overlap.",
      "fa": "اجزای کیستیک جدید یا پیشرفت واضح دوباره پس از پسرفت؛ FASI نادرِ دارای جذب مادهٔ حاجب و گلیوم کم‌درجه می‌توانند هم‌پوشانی داشته باشند."
    },
    "explanation": {
      "de": "Seltene anreichernde FASI können regressieren, sodass Enhancement allein keinen Tumor beweist. Neue Zysten oder eine zweite Wachstums-/Enhancementphase waren in der Originalserie Anlass für die Tumorabklärung. Das Muster erfordert spezialisierte Neubewertung; DWI/ADC allein trennt FASI und niedriggradiges Gliom nicht zuverlässig.",
      "en": "Rare enhancing FASI can regress, so enhancement alone does not prove tumour. New cysts or a second growth/enhancement phase prompted tumour evaluation in the original series. Specialist reassessment is required; DWI/ADC alone does not reliably distinguish FASI from low-grade glioma.",
      "fa": "FASI نادرِ دارای جذب مادهٔ حاجب می‌تواند پسرفت کند؛ جذب به‌تنهایی تومور را ثابت نمی‌کند. کیست جدید یا مرحلهٔ دوم رشد/افزایش جذب در مجموعهٔ اصلی علت بررسی تومور بود. بازبینی تخصصی لازم است؛ DWI/ADC به‌تنهایی FASI را از گلیوم کم‌درجه با اطمینان جدا نمی‌کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8041008/"
  }
])

topics.push({
  "id": "neurofibromatose-typ1",
  "title": {
    "de": "NF1: Bildmuster und klinische Warnzeichen",
    "en": "NF1: imaging patterns and clinical warning signs",
    "fa": "NF1: الگوهای تصویری و علائم هشدار بالینی"
  },
  "subject": "gehirn",
  "description": {
    "de": "FASI, Sehbahn und plexiforme Neurofibrome",
    "en": "FASI, optic pathway and plexiform neurofibromas",
    "fa": "FASI، مسیر بینایی و نوروفیبروم پلکس‌فرم"
  },
  "href": "/flashcards/neurofibromatose-typ1"
})
routeCoverage.push({
  "route": "/gehirn/neurofibromatose/nf1",
  "topicId": "neurofibromatose-typ1",
  "status": "AUTHOR_FULL_ORIGINAL_BANK_PLUS_GAP_READY",
  "learningGoals": [
    {
      "id": "fasi",
      "text": {
        "de": "Ein typisches FASI-Muster erkennen, ohne Gliom oder NF1-Diagnose allein aus dem Signal abzuleiten.",
        "en": "Recognise a typical FASI pattern without establishing glioma or NF1 diagnosis from signal alone.",
        "fa": "الگوی تیپیک FASI را بشناسید، بدون تعیین تشخیص گلیوم یا NF1 صرفاً از سیگنال."
      },
      "questionIds": [
        "neurofibromatose-typ1-de-fasi"
      ],
      "cardIds": [
        "aq-brain-nf1-fasi"
      ]
    },
    {
      "id": "pathway",
      "text": {
        "de": "Neue Sehstörung bei NF1 mit gezielter Sehbahn-Bildgebung und Fachbeurteilung abklären.",
        "en": "Investigate new visual dysfunction in NF1 with targeted visual-pathway imaging and specialist assessment.",
        "fa": "اختلال بینایی جدید در NF1 را با تصویربرداری هدفمند مسیر بینایی و ارزیابی تخصصی بررسی کنید."
      },
      "questionIds": [
        "neurofibromatose-typ1-de-pathway"
      ],
      "cardIds": [
        "aq-brain-nf1-pathway"
      ]
    },
    {
      "id": "systemic",
      "text": {
        "de": "Neue Schmerz-/Wachstumszeichen eines plexiformen Neurofibroms als fachübergreifenden Abklärungsanlass erkennen.",
        "en": "Recognise new pain/growth in plexiform neurofibroma as a reason for cross-specialty evaluation.",
        "fa": "درد یا رشد جدید نوروفیبروم پلکس‌فرم را نیازمند بررسی بین‌رشته‌ای بدانید."
      },
      "questionIds": [
        "neurofibromatose-typ1-de-systemic"
      ],
      "cardIds": [
        "aq-brain-nf1-systemic"
      ]
    },
    {
      "id": "enhancing-fasi",
      "text": {
        "de": "Atypische Verlaufsmerkmale einer zunächst FASI-verdächtigen Läsion erkennen.",
        "en": "Recognise atypical evolution of a lesion initially considered FASI.",
        "fa": "سیر غیرتیپیک ضایعه‌ای را که ابتدا مشکوک به FASI بوده شناسایی کنید."
      },
      "questionIds": [
        "neurofibromatose-typ1-de-enhancing-fasi"
      ],
      "cardIds": [
        "aq-brain-nf1-enhancing-fasi"
      ]
    }
  ]
})
