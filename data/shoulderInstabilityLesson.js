const L = (de, en, fa) => ({ de, en, fa })

export const SHOULDER_INSTABILITY_LESSON = {
  id: 'schulterinstabilitaet',
  alt: L(
    'Abstrakte, nichtdiagnostische Liniengrafik, inspiriert von der Geometrie des Schultergelenks; keine anatomische oder medizinische Aufnahme.',
    'Abstract, non-diagnostic line art inspired by shoulder-joint geometry; not an anatomical or medical image.',
    'طرح خطی انتزاعی و غیرتشخیصی با الهام از هندسهٔ مفصل شانه؛ تصویر آناتومیک یا پزشکی نیست.'
  ),
  intro: L(
    'Bei vermuteter glenohumeraler Instabilität beschreibt der Bildbefund die betroffenen Stabilisatoren und begleitenden Knochenläsionen. Ein typisches Verletzungsmuster kann eine vordere Luxation stützen, beweist aber allein weder Richtung noch klinische Vorgeschichte.',
    'When glenohumeral instability is suspected, the report describes affected stabilisers and associated bone lesions. A typical injury pattern may support anterior dislocation, but by itself proves neither direction nor clinical history.',
    'در شک به ناپایداری گلنوهومرال، گزارش تصویربرداری ساختارهای پایدارکنندهٔ درگیر و ضایعات استخوانی همراه را توصیف می‌کند. یک الگوی تیپیک می‌تواند از دررفتگی قدامی حمایت کند، اما به‌تنهایی جهت یا سابقهٔ بالینی را ثابت نمی‌کند.'
  ),
  goals: [
    L('Weichteilige Bankart-Läsion, knöcherne Bankart-Läsion und Hill-Sachs-Impression räumlich unterscheiden.', 'Distinguish soft-tissue Bankart, bony Bankart and Hill-Sachs impaction by location.', 'ضایعهٔ بانكارت بافت نرم، بانكارت استخوانی و فرورفتگی هیل‌ساکس را بر اساس محل از هم تشخیص دهید.'),
    L('Labrum, Kapsel/IGHL sowie Glenoidrand und Humeruskopf systematisch beschreiben.', 'Systematically describe the labrum, capsule/IGHL, glenoid rim and humeral head.', 'لابروم، کپسول/رباط گلنوهومرال تحتانی، لبهٔ گلنوئید و سر هومروس را به‌صورت نظام‌مند توصیف کنید.'),
    L('Befund und klinische Einordnung sprachlich trennen.', 'Separate imaging description from clinical interpretation.', 'توصیف تصویربرداری را از تفسیر بالینی جدا کنید.'),
  ],
  content: {
    title: L('Das vordere Verletzungsmuster', 'The anterior injury pattern', 'الگوی آسیب قدامی'),
    body: L(
      'Die anteroinferiore Labrum-Kapsel-Verbindung ist ein zentraler Stabilisator. Bei einer Bankart-Läsion ist das anteroinferiore Labrum abgelöst; bei einer knöchernen Bankart-Läsion ist zusätzlich ein Fragment am vorderen unteren Glenoidrand vorhanden. Eine Hill-Sachs-Läsion ist eine Impaktion am posterolateralen Humeruskopf. Diese Befunde können zusammen nach einer vorderen Luxation auftreten. Beurteile jede Struktur direkt und vermeide, aus der Skizze oder einem Einzelfund eine Luxationsrichtung abzuleiten.',
      'The anteroinferior labrum-capsule complex is an important stabiliser. A Bankart lesion is detachment of the anteroinferior labrum; a bony Bankart also includes a fragment at the anteroinferior glenoid rim. A Hill-Sachs lesion is an impaction at the posterolateral humeral head. These findings may occur together after anterior dislocation. Assess each structure directly and do not infer dislocation direction from the sketch or a single finding.',
      'اتصال لابروم و کپسول در بخش قدامی‌ـ‌تحتانی یک پایدارکنندهٔ مهم است. ضایعهٔ بانكارت جداشدگی لابروم قدامی‌ـ‌تحتانی است؛ در بانكارت استخوانی، قطعه‌ای از لبهٔ قدامی‌ـ‌تحتانی گلنوئید نیز وجود دارد. ضایعهٔ هیل‌ساکس فرورفتگی در بخش خلفی‌ـ‌جانبی سر هومروس است. این یافته‌ها ممکن است پس از دررفتگی قدامی با هم دیده شوند. هر ساختار را مستقیماً بررسی کنید و جهت دررفتگی را از طرح یا یک یافتهٔ منفرد نتیجه نگیرید.'
    ),
    note: L('Die Skizze ist ein räumlicher Lernanker, keine anatomisch maßstabsgetreue Darstellung und kein diagnostischer Bildbefund.', 'The sketch is a spatial learning aid, not a scale anatomical drawing or diagnostic image finding.', 'این طرح فقط کمک‌آموزشی برای درک فضایی است؛ نه تصویر آناتومیک دقیق و نه یافتهٔ تشخیصی.'),
    reportTitle: L('Eine knappe Befund-Checkliste', 'A concise reporting checklist', 'چک‌لیست کوتاه گزارش'),
    report: [
      L('Seite und klinisch angegebene Luxations-/Instabilitätsrichtung nennen.', 'State the side and the dislocation/instability direction given clinically.', 'سمت و جهت دررفتگی/ناپایداریِ ذکرشده در شرح حال را بیان کنید.'),
      L('Labrum: Lokalisation, Ablösung/Dislokation und soweit beurteilbar die periostale Kontinuität beschreiben.', 'Labrum: describe location, detachment/displacement and, where assessable, periosteal continuity.', 'لابروم: محل، جداشدگی/جابجایی و در صورت امکان تداوم پریوست را توصیف کنید.'),
      L('Kapsel und inferiores glenohumerales Ligament (IGHL) auf Kontinuität und humeralen Abriss (HAGL) prüfen.', 'Assess capsule and inferior glenohumeral ligament (IGHL) continuity and humeral avulsion (HAGL).', 'تداوم کپسول و رباط گلنوهومرال تحتانی را بررسی کنید و به جداشدگی هومرال (HAGL) توجه داشته باشید.'),
      L('Glenoidrand und Humeruskopf auf knöcherne Defekte/Impressionen prüfen; nur beurteilbare Befunde benennen.', 'Assess the glenoid rim and humeral head for osseous defects/impaction; report only findings that can be evaluated.', 'لبهٔ گلنوئید و سر هومروس را از نظر نقص استخوانی/فرورفتگی بررسی کنید؛ فقط یافته‌های قابل ارزیابی را گزارش دهید.'),
    ],
    modality: L('Nach akutem Trauma sind Röntgenaufnahmen Teil der initialen Abklärung. Die ACR-Leitlinie bewertet MRT ohne intravenöses Kontrastmittel bei klinischem Verdacht auf Instabilität als meist geeignete nächste Bildgebung. Eine MR-Arthrographie kann in ausgewählten Situationen zur detaillierten Labrumbeurteilung sinnvoll sein; CT kann helfen, wenn knöcherner Verlust im MRT nicht ausreichend beurteilbar ist. Das sind Leitlinienhinweise, keine individuelle Untersuchungsanordnung.', 'After acute trauma, radiographs are part of initial assessment. The ACR guideline rates MRI without IV contrast as usually appropriate next imaging when clinical findings suggest instability. MR arthrography may be useful in selected situations for detailed labral assessment; CT can help when osseous loss is not adequately assessed by MRI. These are guideline context, not an individual imaging order.', 'پس از تروما، رادیوگرافی بخشی از ارزیابی اولیه است. راهنمای ACR در صورت شک بالینی به ناپایداری، MRI بدون کنتراست وریدی را معمولاً تصویربرداری بعدی مناسب می‌داند. آرتروگرافی MRI در برخی موارد برای ارزیابی دقیق لابروم مفید است؛ CT نیز زمانی کمک می‌کند که ارزیابی نقص استخوانی در MRI کافی نباشد. این‌ها نکات راهنما هستند، نه دستور تصویربرداری برای یک بیمار مشخص.'),
  },
  check: {
    question: L('Im MRT sind ein abgelöstes anteroinferiores Labrum, ein kleiner Fragmentdefekt am vorderen unteren Glenoidrand und eine posterolaterale Humeruskopf-Impression beschrieben. Welche Formulierung ist am besten?', 'MRI describes a detached anteroinferior labrum, a small fragment defect at the anteroinferior glenoid rim and a posterolateral humeral-head impaction. Which wording is best?', 'در MRI جداشدگی لابروم قدامی‌ـ‌تحتانی، نقص قطعه‌ای کوچک در لبهٔ قدامی‌ـ‌تحتانی گلنوئید و فرورفتگی خلفی‌ـ‌جانبی سر هومروس توصیف شده است. بهترین عبارت کدام است؟'),
    options: [
      L('Die Kombination ist vereinbar mit einer vorderen Instabilitätsverletzung; Richtung und klinische Bedeutung mit der Vorgeschichte korrelieren.', 'The combination is compatible with an anterior instability injury; correlate direction and clinical significance with the history.', 'این مجموعه با آسیب ناشی از ناپایداری قدامی سازگار است؛ جهت و اهمیت بالینی را با شرح حال تطبیق دهید.'),
      L('Die Bildgebung beweist eine aktuelle vordere Luxation.', 'Imaging proves a current anterior dislocation.', 'تصویربرداری دررفتگی قدامی فعلی را ثابت می‌کند.'),
      L('Eine Bankart-Läsion schließt eine Hill-Sachs-Läsion aus.', 'A Bankart lesion excludes a Hill-Sachs lesion.', 'ضایعهٔ بانكارت وجود ضایعهٔ هیل‌ساکس را رد می‌کند.'),
      L('Der Glenoiddefekt sollte ohne Messung als klinisch relevant eingestuft werden.', 'The glenoid defect should be classified as clinically significant without measurement.', 'نقص گلنوئید باید بدون اندازه‌گیری از نظر بالینی مهم تلقی شود.'),
    ],
    answer: 0,
    explanation: L('Die Läsionen bilden ein typisches zusammenpassendes Muster, doch Bildgebung allein beweist weder einen aktuellen Luxationszustand noch die klinische Relevanz eines nicht quantifizierten Defekts.', 'The lesions form a typical coherent pattern, but imaging alone proves neither a current dislocation nor the clinical significance of an unquantified defect.', 'ضایعات یک الگوی هماهنگ و تیپیک می‌سازند، اما تصویربرداری به‌تنهایی نه دررفتگی فعلی را ثابت می‌کند و نه اهمیت بالینی نقص اندازه‌گیری‌نشده را.'),
    wrongExplanations: [null,
      L('Die Bildgebung kann eine typische Verletzungskonstellation zeigen, beweist aber keinen aktuellen Luxationszustand.', 'Imaging can show a typical injury constellation, but does not prove a current dislocation.', 'تصویربرداری ممکن است مجموعهٔ تیپیک آسیب را نشان دهد، اما دررفتگی فعلی را ثابت نمی‌کند.'),
      L('Bankart- und Hill-Sachs-Läsionen können gemeinsam auftreten; der eine Befund schließt den anderen nicht aus.', 'Bankart and Hill-Sachs lesions may coexist; one finding does not exclude the other.', 'ضایعات بانكارت و هیل‌ساکس ممکن است هم‌زمان باشند؛ یکی وجود دیگری را رد نمی‌کند.'),
      L('Ohne belastbare Beurteilung oder Quantifizierung lässt sich die klinische Relevanz des Defekts nicht pauschal festlegen.', 'Without reliable assessment or quantification, the clinical significance of the defect cannot be stated categorically.', 'بدون ارزیابی یا اندازه‌گیری قابل اتکا، نمی‌توان اهمیت بالینی نقص را به‌طور قطعی تعیین کرد.'),
    ],
  },
  takeHome: [
    L('Labrum und Kapsel gemeinsam beurteilen; eine Ablösung präzise lokalisieren.', 'Assess labrum and capsule together; localise detachment precisely.', 'لابروم و کپسول را با هم ارزیابی کنید و محل جداشدگی را دقیق بنویسید.'),
    L('Glenoidrand und Humeruskopf gezielt auf knöcherne Begleitläsionen prüfen.', 'Specifically assess the glenoid rim and humeral head for associated osseous lesions.', 'لبهٔ گلنوئید و سر هومروس را به‌طور هدفمند از نظر ضایعات استخوانی همراه بررسی کنید.'),
    L('Befundmuster als vereinbar/typisch beschreiben, nicht als Beweis der Anamnese.', 'Describe a pattern as compatible/typical, not as proof of the history.', 'الگو را سازگار/تیپیک توصیف کنید، نه به‌عنوان اثبات شرح حال.'),
    L('Unklare beziehungsweise nicht quantifizierte Befunde nicht überinterpretieren.', 'Do not overinterpret uncertain or unquantified findings.', 'یافته‌های نامطمئن یا اندازه‌گیری‌نشده را بیش از حد تفسیر نکنید.'),
  ],
}
