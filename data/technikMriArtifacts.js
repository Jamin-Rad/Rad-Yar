const L = (de, en, fa) => ({ de, en, fa })

export const MRI_ARTIFACT_BLOCKS = [
  {
    id: 'artifact-pattern-cause-correction',
    title: L('MRT-Artefakte: Muster, Ursache und gezielte Maßnahme', 'MRI artefacts: pattern, cause and targeted response', 'آرتیفکت‌های MRI: الگو، علت و اقدام هدفمند'),
    lead: L('Ordnen Sie zuerst Form und Richtung ein. Ein einzelnes Artefaktzeichen beweist keine Läsion; vergleichen Sie das Muster mit der Kodierachse und den übrigen Sequenzen.', 'First identify the pattern and its direction. A single artefact sign does not prove a lesion; compare its pattern with the encoding axis and the other sequences.', 'ابتدا شکل و جهت الگو را مشخص کنید. یک نشانهٔ آرتیفکت به‌تنهایی وجود ضایعه را ثابت نمی‌کند؛ الگو را با محور کدگذاری و سایر توالی‌ها مقایسه کنید.'),
    rows: [
      [L('1 · Suszeptibilität', '1 · Susceptibility', '۱ · susceptibility'), L('Ursache: lokale Feldgradienten an Luft-Gewebe-, Blut-Gewebe- oder Metallgrenzen. Muster: Signalauslöschung und geometrische Verzerrung, besonders in GRE. Maßnahme: SE/TSE oder kürzeres TE; bei Metall ggf. spezialisierte Metallartefakt-Reduktionssequenzen. Die Wahl bleibt protokollabhängig.', 'Cause: local field gradients at air–tissue, blood–tissue or metal interfaces. Pattern: signal loss and geometric distortion, especially on GRE. Response: SE/TSE or shorter TE; metal artefact-reduction sequences may be considered. Choice remains protocol-dependent.', 'علت: گرادیان موضعی میدان در مرز هوا و بافت، خون و بافت یا فلز. الگو: افت سیگنال و اعوجاج هندسی، به‌ویژه در GRE. اقدام: SE/TSE یا TE کوتاه‌تر؛ در فلز ممکن است توالی‌های کاهش آرتیفکت فلزی مطرح شوند. انتخاب به پروتکل وابسته است.')],
      [L('2 · Bewegung und Pulsation', '2 · Motion and pulsation', '۲ · حرکت و ضربان'), L('Ursache: Lageänderung während der Aufnahme oder pulsierender Blut-/Liquorfluss. Muster: Unschärfe oder wiederholte Geisterbilder, typischerweise entlang der Phasenkodierrichtung. Maßnahme: Atemanhalten/Triggerung, Phasenrichtung ändern oder Sättigungsband passend zur Ursache; nicht jede Lösung passt zu jeder Untersuchung.', 'Cause: position change during acquisition or pulsatile blood/CSF flow. Pattern: blur or repeated ghost copies, commonly along the phase-encoding direction. Response: breath-hold/triggering, change phase direction, or place a saturation band for the relevant source; no single fix fits every examination.', 'علت: تغییر موقعیت حین تصویربرداری یا جریان ضربانی خون/CSF. الگو: تاری یا تصاویر شبح‌مانند تکراری، معمولاً در راستای کدگذاری فاز. اقدام: حبس نفس/تریگر، تغییر جهت فاز یا نوار اشباع متناسب با منبع؛ یک راهکار برای همهٔ بررسی‌ها مناسب نیست.')],
      [L('3 · Aliasing / Faltung', '3 · Aliasing / wrap-around', '۳ · aliasing / تاخوردگی'), L('Ursache: Anatomie außerhalb des gewählten FOV wird in der Phasenkodierrichtung fehlzugeordnet. Muster: Strukturen erscheinen auf der gegenüberliegenden Bildseite (z. B. Nase am Hinterkopf). Maßnahme: Phasen-FOV erweitern oder Phase-oversampling/no-phase-wrap verwenden; Oversampling kann die Messzeit verlängern.', 'Cause: anatomy outside the selected FOV is mislocated along the phase-encoding direction. Pattern: anatomy appears on the opposite side (for example, the nose at the back of the head). Response: enlarge phase FOV or use phase oversampling/no-phase-wrap; oversampling can increase scan time.', 'علت: آناتومی خارج از FOV انتخاب‌شده در راستای کدگذاری فاز به‌اشتباه مکان‌یابی می‌شود. الگو: ساختار در سمت مقابل تصویر ظاهر می‌شود (برای نمونه بینی در پشت سر). اقدام: افزایش FOV فاز یا استفاده از phase oversampling/no-phase-wrap؛ oversampling ممکن است زمان تصویربرداری را بیشتر کند.')],
      [L('4 · Zipper / RF-Störung', '4 · Zipper / RF interference', '۴ · zipper / تداخل RF'), L('Ursache: RF-Leckage, etwa an einer nicht korrekt geschlossenen oder defekten Faraday-Kabinentür, oder externe Störquelle. Muster: schmale, scharf begrenzte Linie durch das Bild, senkrecht zur Frequenzkodierung und parallel zur Phasenkodierung; Position hängt von der Störfrequenz ab. Maßnahme: Untersuchung abbrechen bzw. gemäß lokalem Ablauf prüfen lassen; Tür/Kabine und mögliche externe Quelle durch zuständiges Technik-/Medizintechnikteam untersuchen lassen.', 'Cause: RF leakage, such as a poorly closed or faulty Faraday-cage door, or an external interference source. Pattern: a narrow, sharply defined line through the image, perpendicular to frequency encoding and parallel to phase encoding; location depends on the interference frequency. Response: pause and follow the local escalation process; have the door/cage and possible source checked by the responsible MRI/engineering team.', 'علت: نشت RF، مثلاً از درِ درست‌بسته‌نشده یا معیوب قفس فارادی، یا منبع تداخل خارجی. الگو: خط باریک و واضح در تصویر، عمود بر کدگذاری فرکانس و موازی با کدگذاری فاز؛ مکان آن به فرکانس مزاحم وابسته است. اقدام: طبق فرایند محلی بررسی را متوقف/پیگیری کنید و بررسی در، قفس و منبع احتمالی را به تیم فنی مسئول بسپارید.')],
      [L('5 · Gibbs / Truncation', '5 · Gibbs / truncation', '۵ · Gibbs / truncation'), L('Ursache: begrenzte Abtastung hoher Ortsfrequenzen an einer scharfen Grenze. Muster: parallele Ringing-Linien neben dem Intensitätssprung. Maßnahme: Matrix bzw. räumliche Auflösung passend erhöhen; die zusätzliche Detailauflösung kann SNR oder Messzeit beeinflussen.', 'Cause: finite sampling of high spatial frequencies at a sharp boundary. Pattern: parallel ringing lines beside the intensity transition. Response: increase matrix/spatial resolution appropriately; added detail can affect SNR or scan time.', 'علت: نمونه‌برداری محدود از فرکانس‌های مکانی بالا در مرز تند. الگو: خطوط زنگ‌مانند موازی کنار جهش شدت. اقدام: ماتریس/وضوح مکانی را به‌تناسب افزایش دهید؛ جزئیات بیشتر می‌تواند بر SNR یا زمان اسکن اثر بگذارد.')],
      [L('6 · Chemical Shift', '6 · Chemical shift', '۶ · chemical shift'), L('Ursache: Wasser und Fett haben leicht unterschiedliche Resonanzfrequenzen. Muster: gegeneinander verschobene oder doppelte Konturen vor allem in Frequenzkodierungsrichtung; in Opposed-Phase kann eine dunkle Fett-Wasser-Grenze zusätzlich betont sein. Maßnahme: höhere Empfängerbandbreite, Fettsuppression oder Frequenzrichtung ändern; jede Änderung hat Sequenz- und SNR-Folgen.', 'Cause: water and fat have slightly different resonance frequencies. Pattern: displaced or paired edges, mainly along frequency encoding; opposed-phase imaging may also accentuate a dark fat–water boundary. Response: increase receiver bandwidth, use fat suppression, or change frequency direction; each choice has sequence and SNR consequences.', 'علت: فرکانس تشدید آب و چربی اندکی متفاوت است. الگو: جابه‌جایی یا دوخطی‌شدن لبه‌ها، بیشتر در راستای کدگذاری فرکانس؛ تصویر opposed-phase ممکن است مرز آب و چربی را نیز تیره‌تر نشان دهد. اقدام: افزایش پهنای باند گیرنده، سرکوب چربی یا تغییر جهت فرکانس؛ هر انتخاب پیامدهای توالی و SNR دارد.')],
    ],
    visual: {
      src: '/technik/mri-artifact-patterns.svg',
      alt: L('Sechs nummerierte schematische Artefaktmuster; darunter drei echte MRT-Beispiele aus der Quelle: Bewegungs-/Pulsationsartefakt, Faltung und Chemical Shift.', 'Six numbered schematic artefact patterns, followed by three genuine MRI examples from the source: motion/pulsation, wrap-around and chemical shift.', 'شش الگوی شماتیک شماره‌گذاری‌شده و سپس سه نمونهٔ واقعی MRI از منبع: آرتیفکت حرکت/ضربان، تاخوردگی و chemical shift.'),
      caption: L('Die Schemata vermitteln die Form; die folgenden Originalbeispiele zeigen Bewegung/Pulsation, Faltung und Chemical Shift. Quelle der MRT-Bilder: Technik.pdf, PDF-S. 91 (Druck-S. 90).', 'The diagrams teach the pattern; the source examples below show motion/pulsation, wrap-around and chemical shift. MRI image source: Technik.pdf, PDF p. 91 (printed p. 90).', 'شماتیک‌ها شکل الگو را آموزش می‌دهند؛ نمونه‌های اصلی زیر حرکت/ضربان، تاخوردگی و chemical shift را نشان می‌دهند. منبع تصاویر MRI: Technik.pdf، صفحهٔ PDF ۹۱ (صفحهٔ چاپی ۹۰).'),
      images: [
        { src: '/technik/mri-artifacts/motion-pulsation.png', alt: L('Dreiteilige MRT-Bildtafel: sagittaler Kopf mit Bewegungsartefakt, axiales Gehirn mit Pulsationsartefakt und sagittale Wirbelsäule mit Liquorpulsationsartefakt; Technik.pdf, PDF-S. 91.', 'Three-panel MRI montage: sagittal head with motion artefact, axial brain with pulsation artefact, and sagittal spine with CSF pulsation artefact; Technik.pdf, PDF p. 91.', 'مونتاژ سه‌تصویری MRI: سر ساژیتال با آرتیفکت حرکت، مغز محوری با آرتیفکت ضربان، و ستون فقرات ساژیتال با آرتیفکت ضربان CSF؛ Technik.pdf، صفحهٔ PDF ۹۱.'), caption: L('Bewegung / Pulsation · Technik.pdf, S. 91', 'Motion / pulsation · Technik.pdf, p. 91', 'حرکت / ضربان · Technik.pdf، ص. ۹۱') },
        { src: '/technik/mri-artifacts/aliasing.png', alt: L('Axiale Kopf-MRT mit frontalem Wrap-around-Artefakt; Originalbeispiel aus Technik.pdf, PDF-S. 91.', 'Axial head MRI showing frontal wrap-around artefact; source example from Technik.pdf, PDF p. 91.', 'MRI محوری سر با آرتیفکت تاخوردگی در ناحیهٔ فرونتال؛ نمونهٔ منبع از Technik.pdf، صفحهٔ PDF ۹۱.'), caption: L('Faltung / Aliasing · Technik.pdf, S. 91', 'Wrap-around / aliasing · Technik.pdf, p. 91', 'تاخوردگی / aliasing · Technik.pdf، ص. ۹۱') },
        { src: '/technik/mri-artifacts/chemical-shift.png', alt: L('Axiale Oberbauch-MRT mit Chemical-Shift-Artefakt (out of phase); Originalbeispiel aus Technik.pdf, PDF-S. 91.', 'Axial upper-abdominal MRI showing chemical-shift artefact (out of phase); source example from Technik.pdf, PDF p. 91.', 'MRI محوری قسمت فوقانی شکم با آرتیفکت chemical shift (out of phase)؛ نمونهٔ منبع از Technik.pdf، صفحهٔ PDF ۹۱.'), caption: L('Chemical Shift (Out-of-Phase) · Technik.pdf, S. 91', 'Chemical shift (out of phase) · Technik.pdf, p. 91', 'chemical shift (out of phase) · Technik.pdf، ص. ۹۱') },
      ],
      legend: [
        L('1 · Suszeptibilität: Signalauslöschung/Verzerrung an einer Grenzfläche.', '1 · Susceptibility: signal void/distortion at an interface.', '۱ · susceptibility: افت سیگنال/اعوجاج در مرز.'),
        L('2 · Bewegung/Pulsation: wiederholte Geisterbilder entlang der Phasenkodierung.', '2 · Motion/pulsation: repeated ghost copies along phase encoding.', '۲ · حرکت/ضربان: تصاویر شبح‌مانند در راستای کدگذاری فاز.'),
        L('3 · Aliasing: außerhalb des FOV liegende Struktur erscheint auf der Gegenseite.', '3 · Aliasing: anatomy outside the FOV appears on the opposite side.', '۳ · aliasing: ساختار خارج FOV در سمت مقابل ظاهر می‌شود.'),
        L('4 · Zipper: schmale RF-Störlinie, senkrecht zur Frequenz- und parallel zur Phasenkodierung.', '4 · Zipper: narrow RF-interference line, perpendicular to frequency and parallel to phase encoding.', '۴ · zipper: خط باریک تداخل RF، عمود بر کدگذاری فرکانس و موازی با کدگذاری فاز.'),
        L('5 · Gibbs: paralleles Ringing neben einer scharfen Grenze.', '5 · Gibbs: parallel ringing beside a sharp boundary.', '۵ · Gibbs: ringing موازی کنار مرز تند.'),
        L('6 · Chemical Shift: gegeneinander verschobene Wasser-/Fettkonturen.', '6 · Chemical shift: displaced water/fat edges.', '۶ · chemical shift: لبه‌های جابه‌جاشدهٔ آب/چربی.'),
      ],
    },
  },
]

export const MRI_ARTIFACT_QUESTIONS = ['de', 'en', 'fa'].map(lang => {
  const content = {
    de: {
      question: 'Welche Erklärung passt zu Anatomie, die entlang der Phasenkodierrichtung auf der gegenüberliegenden Bildseite erscheint?',
      options: ['Aliasing durch Anatomie außerhalb des gewählten Phasen-FOV.', 'Zipper durch RF-Störung außerhalb der Faraday-Kabine.', 'Chemical Shift durch Frequenzunterschied von Wasser und Fett.', 'Suszeptibilität mit Signalauslöschung an einer Grenzfläche.'],
      explanation: 'Außerhalb des FOV liegende Anatomie kann entlang der Phasenkodierung auf die Gegenseite gefaltet werden. Ein größeres Phasen-FOV oder Phase-oversampling kann helfen; Oversampling kann die Messzeit verlängern.',
      wrong: {
        B: 'Zipper zeigt sich als schmale RF-Störlinie, nicht als auf die Gegenseite gefaltete Anatomie.',
        C: 'Chemical Shift verschiebt Wasser- und Fettkanten vor allem entlang der Frequenzkodierung.',
        D: 'Suszeptibilität verursacht Signalauslöschung und geometrische Verzerrung nahe einer Feldgrenze.',
      },
    },
    en: {
      question: 'Which explanation fits anatomy appearing on the opposite side of the image along the phase-encoding direction?',
      options: ['Aliasing from anatomy outside the selected phase FOV.', 'Zipper from RF interference outside the Faraday cage.', 'Chemical shift from the frequency difference between water and fat.', 'Susceptibility with signal loss at an interface.'],
      explanation: 'Anatomy outside the FOV can wrap to the opposite side along phase encoding. A larger phase FOV or phase oversampling may help; oversampling can increase scan time.',
      wrong: {
        B: 'Zipper appears as a narrow RF-interference line, not anatomy wrapped to the opposite side.',
        C: 'Chemical shift displaces water and fat edges mainly along frequency encoding.',
        D: 'Susceptibility causes signal loss and geometric distortion near a field interface.',
      },
    },
    fa: {
      question: 'کدام توضیح با ظاهرشدن آناتومی در سمت مقابل تصویر، در راستای کدگذاری فاز، سازگار است؟',
      options: ['aliasing ناشی از قرارگرفتن آناتومی خارج از FOV فاز انتخاب‌شده.', 'zipper ناشی از تداخل RF در بیرون قفس فارادی.', 'chemical shift ناشی از تفاوت فرکانس آب و چربی.', 'susceptibility همراه با افت سیگنال در یک مرز.'],
      explanation: 'آناتومی خارج از FOV ممکن است در راستای کدگذاری فاز به سمت مقابل تصویر تا بخورد. افزایش FOV فاز یا phase oversampling می‌تواند کمک کند؛ oversampling ممکن است زمان تصویربرداری را افزایش دهد.',
      wrong: {
        B: 'الگوی zipper به‌صورت خط باریک ناشی از تداخل RF دیده می‌شود، نه آناتومی تاخورده در سمت مقابل.',
        C: 'chemical shift لبه‌های آب و چربی را عمدتاً در راستای کدگذاری فرکانس جابه‌جا می‌کند.',
        D: 'susceptibility نزدیک مرز میدان باعث افت سیگنال و اعوجاج هندسی می‌شود.',
      },
    },
  }[lang]
  return {
    id: `mri-artifacts-${lang}-aliasing`, fach: 'technik', tags: ['mrt-bildqualitaet-artefakte-snr'],
    question: content.question,
    options: content.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text })),
    correct: 'A', explanation: content.explanation, wrongExplanations: content.wrong,
    source: 'Technik.pdf p. 89 (printed p. 88); artifact teaching block sourced from pp. 87–91',
  }
})

export const MRI_ARTIFACT_TOPIC_GROUP = {
  fachId: 'technik', kapitelId: 'technik-mrt-sicherheit',
  title: L('MRT-Sicherheit und Bildqualität', 'MRI safety and image quality', 'ایمنی و کیفیت تصویر MRI'),
  topics: [{ id: 'mrt-bildqualitaet-artefakte-snr', title: L('MRT-Artefakte', 'MRI artefacts', 'آرتیفکت‌های MRI') }],
}

export const MRI_ARTIFACT_FLASHCARD_TOPIC = {
  id: 'mrt-bildqualitaet-artefakte-snr', area: 'Technik', chapter: 'MRT', icon: 'MR', color: '#3d8894',
  href: '/flashcards/mrt-bildqualitaet-artefakte-snr',
  title: L('MRT-Artefakte', 'MRI artefacts', 'آرتیفکت‌های MRI'),
  subtitle: L('Muster · Kodierachse · Ursache · Korrektur', 'Pattern · encoding axis · cause · response', 'الگو · محور کدگذاری · علت · اقدام'),
}

export const MRI_ARTIFACT_FLASHCARDS = [
  {
    id: 'mri-artifact-aliasing', topicId: 'mrt-bildqualitaet-artefakte-snr', category: L('Faltung / Aliasing', 'Wrap-around / aliasing', 'تاخوردگی / aliasing'),
    front: L('Warum erscheint Anatomie beim Aliasing auf der gegenüberliegenden Bildseite?', 'Why can anatomy appear on the opposite side of the image in aliasing?', 'چرا در aliasing آناتومی در سمت مقابل تصویر ظاهر می‌شود؟'),
    answer: L('Anatomie außerhalb des Phasen-FOV wird entlang der Phasenkodierung fehlzugeordnet. Ein größeres Phasen-FOV oder Oversampling kann helfen; Oversampling kann die Messzeit verlängern.', 'Anatomy outside the phase FOV is mislocated along phase encoding. A larger phase FOV or oversampling may help; oversampling can increase scan time.', 'آناتومی خارج از FOV فاز در راستای کدگذاری فاز به‌اشتباه مکان‌یابی می‌شود. افزایش FOV فاز یا oversampling می‌تواند کمک کند؛ oversampling ممکن است زمان تصویربرداری را افزایش دهد.'),
    source: 'Technik.pdf p. 89 (printed p. 88)',
  },
  {
    id: 'mri-artifact-zipper', topicId: 'mrt-bildqualitaet-artefakte-snr', category: L('Zipper / RF-Störung', 'Zipper / RF interference', 'zipper / تداخل RF'),
    front: L('Wie verläuft eine typische Zipper-Linie relativ zu den Kodierachsen?', 'How does a typical zipper line run relative to the encoding axes?', 'خط zipper معمولاً نسبت به محورهای کدگذاری چه جهتی دارد؟'),
    answer: L('Sie verläuft senkrecht zur Frequenzkodierung und parallel zur Phasenkodierung; mögliche RF-Quellen sollten nach lokalem Ablauf technisch geprüft werden.', 'It is perpendicular to frequency encoding and parallel to phase encoding; possible RF sources should be checked by the technical team through the local process.', 'خط عمود بر کدگذاری فرکانس و موازی با کدگذاری فاز است؛ منبع احتمالی RF باید طبق فرایند محلی به‌صورت فنی بررسی شود.'),
    source: 'Technik.pdf pp. 89–90 (printed pp. 88–89)',
  },
]
