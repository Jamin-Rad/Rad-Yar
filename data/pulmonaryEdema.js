const L = (de, en, fa) => ({ de, en, fa })

export const PULMONARY_EDEMA_LESSON = {
  id: 'lungenoedem',
  title: L('Lungenödem im Thoraxbild', 'Pulmonary oedema on chest imaging', 'ادم ریوی در تصویربرداری قفسه سینه'),
  source: 'Thorax.pdf, PDF S. 48–49 (printed pp. 47–48); Global Definition of ARDS (2024).',
  heroImage: '/educational/pulmonary-edema-patterns.svg',
  alt: L('Dreiteiliges Schema: Gefäßumverteilung, interstitielle Septalzeichen und perihiläre alveoläre Verschattung; keine Röntgenaufnahme', 'Three-part schematic: vascular redistribution, interstitial septal signs and perihilar alveolar opacity; not a radiograph', 'شماتیک سه‌بخشی: بازتوزیع عروق، نشانه‌های بینابینی سپتال و کدورت آلوئولی اطراف ناف ریه؛ تصویر رادیوگرافی نیست'),
  visualNote: L('Didaktisches Schema der Verteilung, kein diagnostisches Röntgenbild. Die PDF-Seiten enthalten kein passendes Fallbild.', 'Teaching schematic of distribution, not a diagnostic radiograph. The PDF pages contain no matching case image.', 'شماتیک آموزشیِ توزیع کدورت‌هاست، نه رادیوگرافی تشخیصی. صفحات PDF تصویر موردی مناسب ندارند.'),
  visualLegend: [
    L('Gefäßumverteilung', 'Vascular redistribution', 'بازتوزیع عروق'),
    L('Interstitielle Septal- und peribronchiale Zeichen', 'Interstitial septal and peribronchial signs', 'نشانه‌های بینابینی سپتال و اطراف برونش'),
    L('Perihiläre alveoläre Verschattung', 'Perihilar alveolar opacity', 'کدورت آلوئولی اطراف ناف ریه'),
  ],
  references: [
    { label: L('Neue globale ARDS-Definition (2024), Konsensusbericht', 'A New Global Definition of ARDS (2024), consensus report', 'تعریف جهانی جدید ARDS (۲۰۲۴)، گزارش اجماعی'), url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10870872/' },
    { label: L('Berlin-Definition des ARDS (2012), Primärpublikation', 'Berlin Definition of ARDS (2012), primary publication', 'تعریف برلین ARDS (۲۰۱۲)، مقالهٔ اصلی'), url: 'https://pubmed.ncbi.nlm.nih.gov/22797452/' },
    { label: L('Smith et al.: radiografische Differenzierung verschiedener Lungenödem-Ursachen (1987)', 'Smith et al.: radiographic differentiation of pulmonary oedema aetiologies (1987)', 'Smith و همکاران: افتراق رادیوگرافیک علت‌های مختلف ادم ریه (۱۹۸۷)'), url: 'https://doi.org/10.1097/00004424-198711000-00003' },
    { label: L('Thorax.pdf, PDF S. 48–49 (Druckseiten 47–48)', 'Thorax.pdf, PDF pp. 48–49 (printed pp. 47–48)', 'Thorax.pdf، صفحات PDF ۴۸–۴۹ (صفحات چاپی ۴۷–۴۸)'), url: null },
  ],
  chapters: [
    {
      id: 'sequence', icon: 'sequence',
      title: L('Wie entwickelt sich das kardiogene Muster?', 'How does the cardiogenic pattern evolve?', 'الگوی کاردیوژنیک چگونه پیشرفت می‌کند؟'),
      lead: L('Die PDF ordnet die Röntgenzeichen in eine Stufenfolge: zunächst Umverteilung und Gefäßprominenz, dann interstitielle und schließlich alveoläre Flüssigkeit. Die angegebenen PCWP-Bereiche sind eine Lehrvereinfachung; Bildzeichen erlauben keine verlässliche Druckmessung.', 'The PDF arranges radiographic signs in stages: first redistribution and vascular prominence, then interstitial and finally alveolar fluid. The listed PCWP ranges are a teaching simplification; imaging signs do not provide a reliable pressure measurement.', 'PDF نشانه‌های رادیوگرافیک را مرحله‌بندی می‌کند: ابتدا بازتوزیع و برجستگی عروق، سپس مایع بینابینی و در نهایت مایع آلوئولی. محدوده‌های PCWP ارائه‌شده ساده‌سازی آموزشی‌اند؛ نشانه‌های تصویری فشار را به‌طور قابل اتکا اندازه نمی‌گیرند.'),
      rows: [
        [L('1 · Venöse Stauung', '1 · Venous congestion', '۱ · احتقان وریدی'), L('Kranialisation/Umverteilung der Gefäße und prominente zentrale Gefäße; die Gefäßkonturen können noch scharf sein.', 'Cephalisation/redistribution of vessels and prominent central vessels; vascular margins may remain sharp.', 'سفالیزاسیون/بازتوزیع عروق و برجستگی عروق مرکزی؛ حاشیهٔ عروق ممکن است هنوز واضح باشد.')],
        [L('۲ · Interstitielles Ödem', '2 · Interstitial oedema', '۲ · ادم بینابینی'), L('Kerley-B-Linien (kurz, basal, pleuraständig), Kerley-A-Linien, peribronchiale Manschetten und unscharfe Hilusgefäße.', 'Kerley B lines (short, basal, pleural), Kerley A lines, peribronchial cuffing and indistinct hilar vessels.', 'خطوط Kerley B (کوتاه، قاعده‌ای و نزدیک پلور)، خطوط Kerley A، ضخیم‌شدن اطراف برونش و محوشدن وضوح عروق ناف ریه.')],
        [L('۳ · Alveoläres Ödem', '3 · Alveolar oedema', '۳ · ادم آلوئولی'), L('Beidseitige perihiläre, konfluierende Verschattungen („Bat-wing“); Pleuraergüsse sind häufig und können rechts betont sein.', 'Bilateral perihilar confluent opacities (“bat-wing”); pleural effusions are common and may be right-predominant.', 'کدورت‌های همگرا و دوطرفهٔ اطراف ناف ریه («بال خفاشی»)؛ افیوژن پلور شایع است و ممکن است در راست بیشتر باشد.')],
      ],
      note: L('Stufen sind ein Modell, keine obligatorische lineare Abfolge. Voraufnahme, Projektion, Lagerung und klinischer Verlauf beeinflussen die Zeichen.', 'Stages are a model, not an obligatory linear sequence. Prior imaging, projection, positioning and clinical course affect the signs.', 'مراحل یک مدل آموزشی‌اند، نه توالی خطیِ الزامی. تصاویر قبلی، پروجکشن، وضعیت بیمار و سیر بالینی بر نشانه‌ها اثر می‌گذارند.'),
    },
    {
      id: 'differentiate', icon: 'differentiate',
      title: L('Welche Merkmale verschieben die Gewichtung?', 'Which features shift the likelihood?', 'کدام ویژگی‌ها احتمال را تغییر می‌دهند؟'),
      lead: L('Vergleiche Verteilung, Herzgröße, Gefäße, Septen und Pleuraergüsse gemeinsam. Kein Einzelmerkmal trennt die Ursachen sicher; Mischbilder sind möglich.', 'Compare distribution, heart size, vessels, septa and pleural effusions together. No single feature reliably separates causes; mixed patterns occur.', 'توزیع، اندازهٔ قلب، عروق، سپتا و افیوژن پلور را با هم مقایسه کنید. هیچ ویژگی منفردی علت را با اطمینان جدا نمی‌کند؛ الگوهای مختلط ممکن‌اند.'),
      rows: [
        [L('Eher hydrostatisch/kardiogen', 'More suggestive of hydrostatic/cardiogenic oedema', 'بیشتر به نفع ادم هیدروستاتیک/کاردیوژنیک'), L('Kardiomegalie, Gefäßumverteilung/-weite, Kerley-Linien und Pleuraergüsse können dafür sprechen; Ausprägung hängt u. a. von Chronizität und Lagerung ab.', 'Cardiomegaly, vascular redistribution/calibre, Kerley lines and pleural effusions may support this; appearance also depends on chronicity and positioning.', 'کاردیومگالی، بازتوزیع/قطر عروق، خطوط Kerley و افیوژن پلور می‌توانند مؤید باشند؛ ظاهر به مزمن‌بودن و وضعیت بیمار نیز وابسته است.')],
        [L('Eher permeabilitätsbedingt', 'More suggestive of permeability oedema', 'بیشتر به نفع ادم ناشی از افزایش نفوذپذیری'), L('Herzgröße oft normal und Verschattungen eher fleckig/peripher; Gefäßüberladung, Kerley-Linien und Pleuraergüsse können weniger prominent sein.', 'Heart size is often normal and opacities may be patchy/peripheral; vascular overload, Kerley lines and effusions may be less prominent.', 'اندازهٔ قلب اغلب طبیعی و کدورت‌ها لکه‌ای/محیطی‌اند؛ اضافه‌بار عروقی، خطوط Kerley و افیوژن ممکن است کمتر برجسته باشند.')],
        [L('Einordnung', 'Interpretation', 'تفسیر'), L('Die Merkmale sind Wahrscheinlichkeitszeichen, keine diagnostischen Kriterien. Klinik, Herzfunktion, Volumenstatus und Verlauf korrelieren.', 'These are likelihood features, not diagnostic criteria. Correlate with clinical context, cardiac function, volume status and course.', 'این ویژگی‌ها سرنخ‌های احتمالی‌اند، نه معیار تشخیصی. با زمینهٔ بالینی، عملکرد قلب، وضعیت حجم و سیر بیماری تطبیق دهید.')],
      ],
      note: L('Die dichotome Tabelle im PDF ist nützlich zur Orientierung, bildet Überlappungen und gemischte Ursachen jedoch nicht ab.', 'The PDF’s binary table is a useful orientation aid but does not represent overlap or mixed causes.', 'جدول دوگانهٔ PDF برای جهت‌یابی مفید است، اما همپوشانی و علت‌های مختلط را نشان نمی‌دهد.'),
    },
    {
      id: 'ards', icon: 'ards',
      title: L('Wo endet die Bilddiagnose bei ARDS?', 'Where does imaging stop in ARDS?', 'تشخیص تصویری در ARDS کجا متوقف می‌شود؟'),
      lead: L('ARDS ist ein klinisches Syndrom mit akuter Hypoxämie und beidseitigen pulmonalen Verschattungen. Die Bildgebung kann bilaterale Ödeme zeigen, beweist aber weder ARDS noch dessen Ursache.', 'ARDS is a clinical syndrome involving acute hypoxaemia and bilateral pulmonary opacities. Imaging can show bilateral oedema but proves neither ARDS nor its cause.', 'ARDS یک سندرم بالینی با هیپوکسمی حاد و کدورت‌های دوطرفهٔ ریوی است. تصویربرداری می‌تواند ادم دوطرفه را نشان دهد، اما به‌تنهایی ARDS یا علت آن را اثبات نمی‌کند.'),
      rows: [
        [L('Was die PDF tatsächlich enthält', 'What the PDF actually contains', 'آنچه واقعاً در PDF آمده'), L('Auf Druckseite 48 stehen nur die Überschrift „ARDS: Diffuser Alveolarschaden“ und unleserliche Platzhalterzeichen. Es gibt dort keine weitere Definition, Kriterien oder Fallabbildung.', 'Printed page 48 contains only the heading “ARDS: diffuse alveolar damage” and unreadable placeholder characters. It provides no further definition, criteria or case image.', 'در صفحهٔ چاپی ۴۸ فقط تیتر «ARDS: آسیب منتشر آلوئولی» و نویسه‌های ناخوانا/جای‌نگهدار دیده می‌شود؛ تعریف، معیار یا تصویر موردی دیگری ندارد.')],
        [L('Aktueller Definitionsrahmen', 'Current definition framework', 'چارچوب تعریف کنونی'), L('Die globale Konsensusdefinition 2024 hält beidseitige Verschattungen als Bildkriterium fest, die nicht vollständig durch Ergüsse, Lappen-/Lungenkollaps oder Noduli erklärt sind. Klinische Kriterien und Oxygenierung gehören ebenfalls dazu.', 'The 2024 global consensus definition retains bilateral opacities as an imaging criterion, not fully explained by effusions, lobar/lung collapse or nodules. Clinical and oxygenation criteria are also required.', 'تعریف اجماعی جهانی ۲۰۲۴ کدورت‌های دوطرفه را معیار تصویری می‌داند که کاملاً با افیوژن، کلاپس لوب/ریه یا ندول توضیح داده نشوند؛ معیارهای بالینی و اکسیژناسیون نیز لازم‌اند.')],
      ],
      note: L('Diese Lektion behandelt ARDS nur als Abgrenzungsrahmen zur Ödemmorphologie. Sie ersetzt keine vollständige klinische ARDS-Definition oder intensivmedizinische Beurteilung.', 'This lesson treats ARDS only as a boundary for oedema morphology. It does not replace a full clinical ARDS definition or critical-care assessment.', 'این درس ARDS را فقط در حد چارچوب افتراق مورفولوژی ادم پوشش می‌دهد و جایگزین تعریف بالینی کامل یا ارزیابی مراقبت ویژه نیست.'),
    },
  ],
  check: {
    title: L('Kurz prüfen: Muster oder Diagnose?', 'Quick check: pattern or diagnosis?', 'بررسی کوتاه: الگو یا تشخیص؟'),
    prompt: L('Beidseitige perihiläre Verschattungen, Kerley-B-Linien und Pleuraergüsse. Welche Aussage ist am besten?', 'Bilateral perihilar opacities, Kerley B lines and pleural effusions. Which statement is best?', 'کدورت‌های دوطرفه اطراف ناف ریه، خطوط Kerley B و افیوژن پلور دیده می‌شود. بهترین گزاره کدام است؟'),
    options: [L('Das beweist ein kardiogenes Ödem und erlaubt die Angabe eines PCWP.', 'This proves cardiogenic oedema and allows PCWP to be stated.', 'این یافته‌ها ادم کاردیوژنیک را ثابت می‌کنند و اجازهٔ تعیین PCWP می‌دهند.'), L('Das Muster stützt ein hydrostatisches Ödem, muss aber mit Klinik und Herzbefund korreliert werden.', 'The pattern supports hydrostatic oedema but must be correlated with clinical and cardiac findings.', 'الگو از ادم هیدروستاتیک حمایت می‌کند، اما باید با وضعیت بالینی و یافته‌های قلبی تطبیق داده شود.')],
    answerIndex: 1,
    correct: L('Richtig. Die Zeichen erhöhen die Plausibilität, messen den PCWP aber nicht und sichern die Ursache nicht allein.', 'Correct. The signs increase plausibility but neither measure PCWP nor establish the cause alone.', 'درست است. این نشانه‌ها احتمال را افزایش می‌دهند، اما PCWP را اندازه نمی‌گیرند و علت را به‌تنهایی قطعی نمی‌کنند.'),
    retry: L('Noch einmal: Röntgenzeichen sind keine direkte Druckmessung und kein alleiniger Ätiologienachweis.', 'Try again: radiographic signs are not a direct pressure measurement or standalone proof of cause.', 'دوباره فکر کنید: نشانه‌های رادیوگرافیک اندازه‌گیری مستقیم فشار یا اثبات مستقل علت نیستند.'),
  },
  takeHome: [
    L('Pulmonalvenöse Umverteilung, interstitielle Zeichen und alveoläre Verschattungen als Musterfolge erkennen.', 'Recognise vascular redistribution, interstitial signs and alveolar opacities as a pattern sequence.', 'بازتوزیع عروق ریوی، نشانه‌های بینابینی و کدورت‌های آلوئولی را به‌صورت یک توالی الگویی بشناسید.'),
    L('Herzgröße, Gefäße, Septen, Verteilung und Pleura gemeinsam beurteilen.', 'Assess heart size, vessels, septa, distribution and pleura together.', 'اندازهٔ قلب، عروق، سپتا، توزیع و پلور را با هم ارزیابی کنید.'),
    L('Die Morphologie verschiebt Wahrscheinlichkeiten; sie beweist weder Ursache noch PCWP.', 'Morphology shifts likelihood; it proves neither cause nor PCWP.', 'مورفولوژی احتمال‌ها را تغییر می‌دهد؛ نه علت را ثابت می‌کند و نه PCWP را.'),
    L('ARDS ist eine klinische Diagnose mit Bildkriterium, kein Synonym für jedes bilaterale Ödem.', 'ARDS is a clinical diagnosis with an imaging criterion, not a synonym for every bilateral oedema.', 'ARDS تشخیصی بالینی با معیار تصویری است و مترادف هر ادم دوطرفه نیست.'),
  ],
  notice: L('Entwurf aus Thorax.pdf, PDF S. 48–49 (Druckseiten 47–48). PCWP-Stufen sind nicht als Messwerte aus dem Bild zu lesen. Die Seiten liefern keine diagnostischen Fallbilder; das gezeigte Diagramm ist ein Schema. Die ARDS-Passage auf Druckseite 48 ist unvollständig und wurde nicht rekonstruiert.', 'Draft based on Thorax.pdf, PDF pp. 48–49 (printed pp. 47–48). PCWP stages should not be read as values measurable from imaging. The pages provide no diagnostic case images; the displayed diagram is schematic. The ARDS passage on printed p. 48 is incomplete and has not been reconstructed.', 'پیش‌نویس بر اساس صفحات PDF ۴۸–۴۹ (صفحات چاپی ۴۷–۴۸) Thorax.pdf است. مراحل PCWP نباید به‌عنوان مقادیر قابل اندازه‌گیری از تصویر تلقی شوند. این صفحات تصویر تشخیصی موردی ندارند و نمودار صرفاً شماتیک است. بخش ARDS در صفحهٔ چاپی ۴۸ ناقص است و بازسازی نشده است.'),
}
