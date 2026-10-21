const L = (de, en, fa) => ({ de, en, fa })

export const PULMONARY_EDEMA_LESSON = {
  id: 'lungenoedem',
  title: L('Lungenödem im Thoraxbild', 'Pulmonary oedema on chest imaging', 'ادم ریوی در تصویربرداری قفسه سینه'),
  source: 'Thorax.pdf, PDF S. 17 and 48–49 (printed pp. 16 and 47–48); additional HRCT studies.',
  heroImage: '/educational/pulmonary-edema-patterns.svg',
  alt: L('Dreiteiliges Schema: Gefäßumverteilung, interstitielle Septalzeichen und perihiläre alveoläre Verschattung; keine Röntgenaufnahme', 'Three-part schematic: vascular redistribution, interstitial septal signs and perihilar alveolar opacity; not a radiograph', 'شماتیک سه‌بخشی: بازتوزیع عروق، نشانه‌های بینابینی سپتال و کدورت آلوئولی اطراف ناف ریه؛ تصویر رادیوگرافی نیست'),
  visualNote: L('Das Schema zeigt die Stufenfolge, kein diagnostisches Röntgenbild. Die Quellseiten 48–49 enthalten kein passendes Fallbild; drei Originalbeispiele von PDF S. 17 sind im HRCT-Abschnitt getrennt ausgewiesen.', 'The schematic shows a staged pattern, not a diagnostic radiograph. Source pp. 48–49 contain no matching case image; three original examples from PDF p. 17 are shown separately in the HRCT section.', 'این شماتیک توالی الگو را نشان می‌دهد، نه رادیوگرافی تشخیصی. صفحات منبع ۴۸–۴۹ تصویر موردی مناسبی ندارند؛ سه نمونهٔ اصلی از صفحهٔ ۱۷ PDF جداگانه در بخش HRCT آمده‌اند.'),
  visualLegend: [
    L('Gefäßumverteilung', 'Vascular redistribution', 'بازتوزیع عروق'),
    L('Interstitielle Septal- und peribronchiale Zeichen', 'Interstitial septal and peribronchial signs', 'نشانه‌های بینابینی سپتال و اطراف برونش'),
    L('Perihiläre alveoläre Verschattung', 'Perihilar alveolar opacity', 'کدورت آلوئولی اطراف ناف ریه'),
  ],
  references: [
    { tag: L('Globaler Konsens · Definition', 'Global consensus · definition', 'تعریف اجماعی جهانی'), label: L('Neue globale ARDS-Definition (2024), Konsensusbericht', 'A New Global Definition of ARDS (2024), consensus report', 'تعریف جهانی جدید ARDS (۲۰۲۴)، گزارش اجماعی'), url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10870872/' },
    { tag: L('PCWP · Hämodynamik', 'PCWP · haemodynamics', 'PCWP · همودینامیک'), label: L('Luchsinger et al.: Beziehung zwischen pulmonalem Verschlussdruck und linksatrialem Druck (1962)', 'Luchsinger et al.: Relationship between pulmonary artery wedge pressure and left atrial pressure (1962)', 'Luchsinger و همکاران: رابطهٔ فشار گوه‌ای شریان ریوی و فشار دهلیز چپ (۱۹۶۲)'), url: 'https://doi.org/10.1161/01.RES.2.5.434' },
    { tag: L('ARDS · Berlin-Definition', 'ARDS · Berlin definition', 'ARDS · تعریف برلین'), label: L('Berlin-Definition des ARDS (2012), Primärpublikation', 'Berlin Definition of ARDS (2012), primary publication', 'تعریف برلین ARDS (۲۰۱۲)، مقالهٔ اصلی'), url: 'https://pubmed.ncbi.nlm.nih.gov/22797452/' },
    { tag: L('Röntgen · Vergleichskohorte', 'Radiography · comparative cohort', 'رادیوگرافی · مطالعهٔ مقایسه‌ای'), label: L('Smith et al.: radiografische Differenzierung verschiedener Lungenödem-Ursachen (1987)', 'Smith et al.: radiographic differentiation of pulmonary oedema aetiologies (1987)', 'Smith و همکاران: افتراق رادیوگرافیک علت‌های مختلف ادم ریه (۱۹۸۷)'), url: 'https://doi.org/10.1097/00004424-198711000-00003' },
    { tag: L('HRCT · retrospektive Kohorte', 'HRCT · retrospective cohort', 'HRCT · مطالعهٔ هم‌گروهی گذشته‌نگر'), label: L('Ribeiro et al.: Hydrostatic pulmonary edema on HRCT (2006)', 'Ribeiro et al.: Hydrostatic pulmonary oedema on HRCT (2006)', 'Ribeiro و همکاران: ادم هیدروستاتیک در HRCT (۲۰۰۶)'), url: 'https://pubmed.ncbi.nlm.nih.gov/17440672/' },
    { tag: L('HRCT · Positionsstudie', 'HRCT · positional study', 'HRCT · مطالعهٔ تغییر وضعیت'), label: L('Kim et al.: Positional shifting of HRCT findings in pulmonary edema (2001)', 'Kim et al.: Positional shifting of HRCT findings in pulmonary oedema (2001)', 'Kim و همکاران: جابه‌جایی یافته‌های HRCT در ادم ریوی با تغییر وضعیت (۲۰۰۱)'), url: 'https://doi.org/10.3348/jkrs.2001.44.3.333' },
    { label: L('Thorax.pdf, PDF S. 48–49 (Druckseiten 47–48)', 'Thorax.pdf, PDF pp. 48–49 (printed pp. 47–48)', 'Thorax.pdf، صفحات PDF ۴۸–۴۹ (صفحات چاپی ۴۷–۴۸)'), url: null },
  ],
  chapters: [
    {
      id: 'sequence', icon: 'sequence',
      title: L('Wie entwickelt sich das kardiogene Muster?', 'How does the cardiogenic pattern evolve?', 'الگوی کاردیوژنیک چگونه پیشرفت می‌کند؟'),
      lead: L('Die PDF ordnet die Röntgenzeichen in eine Stufenfolge: zunächst Umverteilung und Gefäßprominenz, dann interstitielle und schließlich alveoläre Flüssigkeit. PCWP (pulmonary capillary wedge pressure) bezeichnet den invasiv gemessenen pulmonalkapillären Verschlussdruck und dient unter passenden hämodynamischen Bedingungen als Schätzer des linksatrialen Drucks. Als Normalbereich nennt die PDF 5–12 mmHg. Die stadienbezogenen Bereiche werden hier nicht als feste Schwellen übernommen: Sie überlappen sich bei 18 mmHg. Bildzeichen erlauben keine verlässliche Druckmessung.', 'The PDF arranges radiographic signs in stages: first redistribution and vascular prominence, then interstitial and finally alveolar fluid. PCWP (pulmonary capillary wedge pressure) is measured invasively by wedging a pulmonary artery catheter and, under appropriate haemodynamic conditions, estimates left atrial pressure. The PDF gives 5–12 mmHg as its reference range. Its stage ranges are not presented here as fixed thresholds because they overlap at 18 mmHg. Imaging signs do not provide a reliable pressure measurement.', 'PDF نشانه‌های رادیوگرافیک را مرحله‌بندی می‌کند: ابتدا بازتوزیع و برجستگی عروق، سپس مایع بینابینی و در نهایت مایع آلوئولی. PCWP (فشار گوه‌ای مویرگ ریوی) با روش تهاجمی اندازه‌گیری می‌شود و در شرایط همودینامیک مناسب، برآوردی از فشار دهلیز چپ است. PDF محدودهٔ مرجع را ۵ تا ۱۲ میلی‌متر جیوه ذکر می‌کند. محدوده‌های مرحله‌ای را به‌عنوان آستانهٔ ثابت نمی‌آوریم، چون در ۱۸ میلی‌متر جیوه هم‌پوشانی دارند. نشانه‌های تصویری فشار را به‌طور قابل اتکا اندازه نمی‌گیرند.'),
      rows: [
        [L('1 · Venöse Stauung', '1 · Venous congestion', '۱ · احتقان وریدی'), L('Kranialisation/Umverteilung der Gefäße und prominente zentrale Gefäße; die Gefäßkonturen können noch scharf sein.', 'Cephalisation/redistribution of vessels and prominent central vessels; vascular margins may remain sharp.', 'سفالیزاسیون/بازتوزیع عروق و برجستگی عروق مرکزی؛ حاشیهٔ عروق ممکن است هنوز واضح باشد.')],
        [L('۲ · Interstitielles Ödem', '2 · Interstitial oedema', '۲ · ادم بینابینی'), L('Kerley-B-Linien (kurz, basal, pleuraständig), Kerley-A-Linien, peribronchiale Manschetten und unscharfe Hilusgefäße.', 'Kerley B lines (short, basal, pleural), Kerley A lines, peribronchial cuffing and indistinct hilar vessels.', 'خطوط Kerley B (کوتاه، قاعده‌ای و نزدیک پلور)، خطوط Kerley A، ضخیم‌شدن اطراف برونش و محوشدن وضوح عروق ناف ریه.')],
        [L('۳ · Alveoläres Ödem', '3 · Alveolar oedema', '۳ · ادم آلوئولی'), L('Beidseitige perihiläre, konfluierende Verschattungen („Bat-wing“); Pleuraergüsse sind häufig und können rechts betont sein.', 'Bilateral perihilar confluent opacities (“bat-wing”); pleural effusions are common and may be right-predominant.', 'کدورت‌های همگرا و دوطرفهٔ اطراف ناف ریه («بال خفاشی»)؛ افیوژن پلور شایع است و ممکن است در راست بیشتر باشد.')],
      ],
      note: L('Stufen sind ein Modell, keine obligatorische lineare Abfolge. Voraufnahme, Projektion, Lagerung und klinischer Verlauf beeinflussen die Zeichen.', 'Stages are a model, not an obligatory linear sequence. Prior imaging, projection, positioning and clinical course affect the signs.', 'مراحل یک مدل آموزشی‌اند، نه توالی خطیِ الزامی. تصاویر قبلی، پروجکشن، وضعیت بیمار و سیر بالینی بر نشانه‌ها اثر می‌گذارند.'),
    },
    {
      id: 'hrct', icon: 'hrct',
      title: L('Welche Zeichen passen im HRCT zu hydrostatischem Ödem?', 'Which HRCT signs fit hydrostatic oedema?', 'کدام نشانه‌های HRCT با ادم هیدروستاتیک سازگارند؟'),
      lead: L('Wenn ein CT vorliegt, lies die Kombination aus Interstitium, Dichte und Verteilung. Kein Einzelzeichen beweist eine kardiale Ursache.', 'When CT is available, read the combination of interstitium, opacity and distribution. No single sign proves a cardiac cause.', 'اگر CT در دسترس است، ترکیب فضای بینابینی، دانسیته و توزیع را بخوانید. هیچ نشانهٔ منفردی علت قلبی را ثابت نمی‌کند.'),
      rows: [
        [L('Dominante Kombination', 'Dominant combination', 'ترکیب غالب'), L('Glatte interlobuläre Septenverdickung zusammen mit Milchglastrübung (GGO).', 'Smooth interlobular septal thickening together with ground-glass opacity (GGO).', 'ضخیم‌شدن صاف سپتاهای بین‌لوبولی همراه با کدورت شیشه‌مات (GGO).')],
        [L('Verteilung', 'Distribution', 'توزیع'), L('Häufig perihilär und lage-/schwerkraftabhängig, oft dorsal und basal betont; die Ausprägung verändert sich mit Lagerung und Volumenstatus.', 'Often perihilar and position/gravity dependent, frequently more conspicuous posteriorly and basally; appearance varies with positioning and volume status.', 'اغلب اطراف ناف ریه و وابسته به وضعیت/جاذبه است و ممکن است در بخش‌های خلفی و قاعده‌ای برجسته‌تر باشد؛ ظاهر با وضعیت بدن و حجم مایع تغییر می‌کند.')],
        [L('Begleitzeichen', 'Accompanying signs', 'نشانه‌های همراه'), L('Peribronchovaskuläre Interstitialverdickung, Fissurenverdickung, Kardiomegalie und Pleuraergüsse können hinzukommen.', 'Peribronchovascular interstitial thickening, fissural thickening, cardiomegaly and pleural effusions may accompany the pattern.', 'ضخیم‌شدن بینابینی اطراف برونکوواسکولار، ضخیم‌شدن فیسورها، کاردیومگالی و افیوژن پلور ممکن است همراه باشند.')],
        [L('Grenze der Aussage', 'Interpretive limit', 'محدودهٔ تفسیر'), L('Das Muster stützt ein hydrostatisches Ödem im passenden Kontext, ist aber kein alleiniger Beweis der Ursache; atypische und gemischte Muster kommen vor.', 'In the right context, the pattern supports hydrostatic oedema but does not prove the cause by itself; atypical and mixed patterns occur.', 'در زمینهٔ مناسب، الگو از ادم هیدروستاتیک حمایت می‌کند، اما به‌تنهایی علت را اثبات نمی‌کند؛ الگوهای آتیپیک و مختلط هم رخ می‌دهند.')],
      ],
      figure: {
        src: '/educational/pulmonary-edema/pdf-p17-examples.png',
        alt: L('Drei Originalbeispiele aus dem Abschnitt „Kardiogenes Lungenödem“ in Thorax.pdf Seite 17: axiale CT, koronare CT und Thoraxaufnahme.', 'Three original examples from the “Cardiogenic pulmonary oedema” section of Thorax.pdf p. 17: axial CT, coronal CT and chest radiograph.', 'سه نمونهٔ اصلی از بخش «ادم ریوی کاردیوژنیک» در صفحهٔ ۱۷ Thorax.pdf: CT محوری، CT کرونال و رادیوگرافی قفسه سینه.'),
        caption: L('Thorax.pdf, PDF S. 17 (Druck-S. 16). Die drei Abbildungen stehen unter dem kardiogenen Ödem-Abschnitt. Sie illustrieren die Quelle, sind aber keine isolierten Diagnosekriterien; mit dem Gesamtmuster und klinischem Kontext korrelieren.', 'Thorax.pdf, PDF p. 17 (printed p. 16). The three panels appear under the cardiogenic oedema section. They illustrate the source material but are not standalone diagnostic criteria; correlate with the overall pattern and clinical context.', 'Thorax.pdf، صفحهٔ ۱۷ (شمارهٔ چاپی ۱۶). این سه تصویر زیر بخش ادم کاردیوژنیک قرار دارند. آن‌ها محتوای منبع را نشان می‌دهند، اما معیار تشخیصی مستقل نیستند؛ با الگوی کلی و زمینهٔ بالینی تطبیق دهید.'),
        labels: [L('Axiale CT', 'Axial CT', 'CT محوری'), L('Koronare CT', 'Coronal CT', 'CT کرونال'), L('Thoraxaufnahme', 'Chest radiograph', 'رادیوگرافی قفسه سینه')],
      },
      note: L('Die HRCT-Zeichen überlappen mit anderen Ursachen diffuser Lungentrübung. In einer kleinen Positionsstudie war die Lageverschiebung glatter Septenverdickungen bei Ödem ausgeprägter; für eine entsprechende Verschiebung der GGO zeigte sich kein signifikanter Unterschied. Das ersetzt die klinische Einordnung nicht.', 'HRCT signs overlap with other causes of diffuse lung opacity. In a small positional study, shifting of smooth septal thickening was more pronounced in oedema; no significant difference was found for shifting of GGO. This does not replace clinical interpretation.', 'نشانه‌های HRCT با علت‌های دیگر کدورت منتشر ریه هم‌پوشانی دارند. در یک مطالعهٔ کوچکِ تغییر وضعیت، جابه‌جایی ضخیم‌شدن صاف سپتا در ادم بارزتر بود؛ برای جابه‌جایی GGO تفاوت معناداری دیده نشد. این یافته جایگزین تفسیر بالینی نیست.'),
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
  notice: L('Entwurf aus Thorax.pdf, PDF S. 17 und 48–49 (Druckseiten 16 und 47–48). Die HRCT-Zeichen beruhen auf der Morphologie und beweisen allein keine kardiale Ursache. PCWP-Stufen sind nicht als Messwerte aus dem Bild zu lesen. Die ARDS-Passage auf Druckseite 48 ist unvollständig und wurde nicht rekonstruiert.', 'Draft based on Thorax.pdf, PDF p. 17 and pp. 48–49 (printed pp. 16 and 47–48). HRCT signs describe morphology and do not alone prove a cardiac cause. PCWP stages should not be read as values measurable from imaging. The ARDS passage on printed p. 48 is incomplete and has not been reconstructed.', 'پیش‌نویس بر اساس صفحهٔ PDF ۱۷ و صفحات ۴۸–۴۹ (چاپی ۱۶ و ۴۷–۴۸) است. نشانه‌های HRCT مورفولوژی را توصیف می‌کنند و به‌تنهایی علت قلبی را ثابت نمی‌کنند. مراحل PCWP را نمی‌توان از تصویر اندازه گرفت. بخش ARDS در صفحهٔ چاپی ۴۸ ناقص است و بازسازی نشده است.'),
}

const pulmonaryEdemaQuestionOptions = lang => {
  const texts = lang === 'de' ? ['Glatte interlobuläre Septenverdickung.', 'Milchglastrübung (GGO).', 'Gefäßumverteilung.', 'Pleuraerguss.'] : lang === 'en' ? ['Smooth interlobular septal thickening.', 'Ground-glass opacity (GGO).', 'Vascular redistribution.', 'Pleural effusion.'] : ['ضخیم‌شدن صاف سپتاهای بین‌لوبولی.', 'کدورت شیشه‌مات (GGO).', 'بازتوزیع عروق.', 'افیوژن پلور.']
  return texts.map((text, index) => ({ id: String.fromCharCode(65 + index), text }))
}

const PULMONARY_EDEMA_HRCT_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `lungenoedem-${lang}-hrct-pattern`, fach: 'thorax', tags: ['lungenoedem'],
  question: lang === 'de' ? 'Welcher HRCT-Befund zeigte in einer kleinen Positionsstudie bei Lungenödem ein ausgeprägteres lageabhängiges Verschieben?' : lang === 'en' ? 'Which HRCT finding showed more pronounced positional shifting in a small study of pulmonary oedema?' : 'در یک مطالعهٔ کوچک ادم ریوی، جابه‌جایی وابسته به وضعیت کدام یافتهٔ HRCT بارزتر بود؟',
  options: pulmonaryEdemaQuestionOptions(lang),
  correct: 'A',
  explanation: lang === 'de' ? 'Kim et al. untersuchten nur 16 Patienten: Das lageabhängige Verschieben glatter Septenverdickungen war bei Ödem ausgeprägter; für GGO zeigte sich kein signifikanter Unterschied. Der Befund ist unterstützend, nicht beweisend.' : lang === 'en' ? 'Kim et al. studied only 16 patients: positional shifting of smooth septal thickening was more pronounced in oedema; GGO shifting did not differ significantly. This is supportive, not diagnostic proof.' : 'Kim و همکاران فقط ۱۶ بیمار را بررسی کردند: جابه‌جایی وابسته به وضعیتِ ضخیم‌شدن صاف سپتا در ادم بارزتر بود؛ جابه‌جایی GGO تفاوت معناداری نداشت. این یافته حمایتی است، نه اثبات‌کننده.',
  wrongExplanations: {
    B: lang === 'de' ? 'Kim et al. fanden für das lageabhängige Verschieben der GGO keinen signifikanten Unterschied; das Ergebnis betrifft die Septenverdickung.' : lang === 'en' ? 'Kim et al. found no significant difference in positional shifting of GGO; the result concerns septal thickening.' : 'Kim و همکاران برای جابه‌جایی وابسته به وضعیت GGO تفاوت معناداری نیافتند؛ یافته درباره ضخیم‌شدن سپتاست.',
    C: lang === 'de' ? 'Die Positionsstudie berichtete den deutlicheren Shift für glatte Septenverdickungen, nicht für die Gefäßumverteilung.' : lang === 'en' ? 'The positional study reported the more pronounced shift for smooth septal thickening, not vascular redistribution.' : 'مطالعه جابه‌جایی بارزتر را برای ضخیم‌شدن صاف سپتا گزارش کرد، نه بازتوزیع عروق.',
    D: lang === 'de' ? 'Pleuraergüsse sind mögliche Begleitzeichen, waren aber nicht der untersuchte lageabhängige HRCT-Befund.' : lang === 'en' ? 'Pleural effusions are possible accompanying signs, but were not the positional HRCT finding studied.' : 'افیوژن پلور می‌تواند یافته همراه باشد، اما یافته HRCT وابسته به وضعیت در آن مطالعه نبود.',
  },
  source: 'Thorax.pdf p. 17 (printed p. 16); Ribeiro et al. 2006; Kim et al. 2001',
}))

const PULMONARY_EDEMA_RETRIEVAL_QUESTIONS = ['de', 'en', 'fa'].flatMap(lang => {
  const L = (de, en, fa) => ({ de, en, fa })[lang]
  const makeOptions = values => values.map((text, i) => ({ id: String.fromCharCode(65 + i), text }))
  const comparative = {
    id: `lungenoedem-${lang}-radiograph-differentiation`, fach: 'thorax', tags: ['lungenoedem'],
    question: L('Welche Merkmalskombination spricht im PDF-Vergleich eher für ein hydrostatisches/kardiogenes Ödem, ohne es allein zu beweisen?', 'In the PDF comparison, which combination is more suggestive of hydrostatic/cardiogenic oedema without proving it on its own?', 'در مقایسهٔ PDF کدام ترکیب بیشتر به نفع ادم هیدروستاتیک/کاردیوژنیک است، اما به‌تنهایی آن را ثابت نمی‌کند؟'),
    options: makeOptions([
      L('Vergrößerte Herzsilhouette, zentrale/perihiläre Verteilung und erweiterte Gefäßkaliber mit Kerley-Linien.', 'Enlarged cardiac silhouette, central/perihilar distribution and increased vessel calibre with Kerley lines.', 'بزرگی سایهٔ قلب، توزیع مرکزی/اطراف ناف ریه، قطر افزایش‌یافتهٔ عروق و خطوط Kerley.'),
      L('Normale Herzgröße, fleckig-periphere Verschattungen und normale oder schmale Gefäße.', 'Normal heart size, patchy peripheral opacities and normal or narrow vessels.', 'اندازهٔ طبیعی قلب، کدورت‌های لکه‌ای محیطی و عروق طبیعی یا باریک.'),
      L('Normale Herzgröße und periphere Verschattungen, aber zugleich erweiterte Gefäße und häufige Kerley-Linien.', 'Normal heart size and peripheral opacities, but also increased vessel calibre and frequent Kerley lines.', 'اندازهٔ طبیعی قلب و کدورت‌های محیطی، همراه با قطر افزایش‌یافتهٔ عروق و خطوط شایع Kerley.'),
      L('Vergrößerte Herzsilhouette und zentrale Verschattungen, aber normale oder schmale Gefäße und seltene Kerley-Linien.', 'Enlarged cardiac silhouette and central opacities, but normal or narrow vessels and infrequent Kerley lines.', 'بزرگی سایهٔ قلب و کدورت‌های مرکزی، اما عروق طبیعی یا باریک و خطوط Kerley نادر.'),
    ]),
    correct: 'A',
    explanation: L('Die Tabelle nennt Kardiomegalie, Gefäßumverteilung und Kerley-Linien als eher kardiogene Hinweise. Sie sind Wahrscheinlichkeitsmerkmale; Mischbilder und klinische Korrelation bleiben wichtig.', 'The table lists cardiomegaly, vascular redistribution and Kerley lines as features that may favour a cardiogenic cause. They shift likelihood; mixed patterns and clinical correlation remain important.', 'جدول کاردیومگالی، بازتوزیع عروق و خطوط Kerley را سرنخ‌هایی بیشتر به نفع علت کاردیوژنیک می‌داند. این‌ها احتمال را تغییر می‌دهند؛ الگوهای مختلط و تطبیق بالینی همچنان مهم‌اند.'),
    wrongExplanations: {
      B: L('Diese Kombination entspricht eher der permeabilitätsbedingten Spalte der Tabelle.', 'This combination better matches the permeability-oedema column of the table.', 'این ترکیب بیشتر با ستون ادم ناشی از افزایش نفوذپذیری در جدول مطابقت دارد.'),
      C: L('Die Merkmale widersprechen sich: Herzgröße und Verteilung sprechen eher für die permeabilitätsbedingte Seite, Gefäßkaliber und Kerley-Linien eher für die hydrostatische Seite.', 'The features conflict: heart size and distribution lean toward the permeability pattern, while vessel calibre and Kerley lines lean toward the hydrostatic pattern.', 'یافته‌ها با هم تعارض دارند: اندازهٔ قلب و توزیع بیشتر به نفع الگوی افزایش نفوذپذیری‌اند، درحالی‌که قطر عروق و خطوط Kerley بیشتر به نفع الگوی هیدروستاتیک‌اند.'),
      D: L('Auch hier ist die Kombination gemischt: Herzgröße und Verteilung passen eher zum hydrostatischen Muster, Gefäßkaliber und Kerley-Linien jedoch weniger.', 'This is also a mixed combination: heart size and distribution lean hydrostatic, but vessel calibre and Kerley lines do not.', 'این ترکیب نیز مختلط است: اندازهٔ قلب و توزیع بیشتر با الگوی هیدروستاتیک جورند، اما قطر عروق و خطوط Kerley کمتر سازگارند.'),
    },
    source: 'Thorax.pdf p. 49 (printed p. 48), cardiogenic vs non-cardiogenic comparison; PCWP limitation clarified with primary haemodynamic literature.',
  }
  const ards = {
    id: `lungenoedem-${lang}-ards-imaging-boundary`, fach: 'thorax', tags: ['ards'],
    question: L('Was folgt aus beidseitigen Verschattungen im passenden Bildkriterium der globalen ARDS-Definition?', 'What follows from bilateral opacities in the imaging criterion of the global ARDS definition?', 'از کدورت‌های دوطرفه در معیار تصویری تعریف جهانی ARDS چه نتیجه‌ای می‌گیریم؟'),
    options: makeOptions([
      L('Sie erfüllen das Bildkriterium nur, wenn sie nicht vollständig durch Ergüsse, Kollaps oder Noduli erklärt sind; klinische und Oxygenierungs-Kriterien sind zusätzlich nötig.', 'They meet the imaging criterion only when not fully explained by effusions, collapse or nodules; clinical and oxygenation criteria are also required.', 'فقط اگر کدورت‌ها کاملاً با افیوژن، کلاپس یا ندول توضیح داده نشوند، معیار تصویری را برآورده می‌کنند؛ معیارهای بالینی و اکسیژناسیون نیز لازم‌اند.'),
      L('Beidseitige Verschattungen und Hypoxämie reichen aus, auch wenn Beginn und klinischer Kontext nicht passen.', 'Bilateral opacities and hypoxaemia are sufficient even when onset and clinical context do not fit.', 'کدورت‌های دوطرفه و هیپوکسمی کافی‌اند، حتی اگر زمان شروع و زمینهٔ بالینی سازگار نباشند.'),
      L('Beidseitige Verschattungen, die vollständig durch Pleuraergüsse und Atelektasen erklärt werden, erfüllen das Bildkriterium dennoch.', 'Bilateral opacities fully explained by pleural effusions and atelectasis still meet the imaging criterion.', 'کدورت‌های دوطرفه‌ای که کاملاً با افیوژن پلور و آتلکتازی توضیح داده می‌شوند، باز هم معیار تصویری را برآورده می‌کنند.'),
      L('Eine einseitige lobäre Konsolidierung erfüllt das bilaterale Bildkriterium, sofern die Hypoxämie schwer ist.', 'A unilateral lobar consolidation meets the bilateral imaging criterion when hypoxaemia is severe.', 'یک کنسولیدیشن لوبار یک‌طرفه در صورت هیپوکسمی شدید، معیار تصویری دوطرفه را برآورده می‌کند.'),
    ]),
    correct: 'A',
    explanation: L('Die globale Definition verlangt neben dem Bildkriterium auch klinische und Oxygenierungs-Kriterien. Bilaterale Verschattungen allein sind kein vollständiger ARDS-Nachweis.', 'The global definition requires clinical and oxygenation criteria in addition to the imaging criterion. Bilateral opacities alone do not establish ARDS.', 'تعریف جهانی علاوه بر معیار تصویری، معیارهای بالینی و اکسیژناسیون را هم لازم می‌داند. کدورت‌های دوطرفه به‌تنهایی ARDS را اثبات نمی‌کنند.'),
    wrongExplanations: {
      B: L('Hypoxämie allein deckt weder die erforderliche Akuität noch den klinischen Definitionsrahmen ab.', 'Hypoxaemia alone does not establish the required acute timing or the full clinical definition.', 'هیپوکسمی به‌تنهایی حادبودن موردنیاز یا چارچوب کامل بالینی تعریف را مشخص نمی‌کند.'),
      C: L('Verschattungen, die vollständig durch Ergüsse oder Kollaps erklärt sind, erfüllen das Bildkriterium nicht.', 'Opacities fully explained by effusions or collapse do not meet the imaging criterion.', 'کدورت‌هایی که کاملاً با افیوژن یا کلاپس توضیح داده می‌شوند، معیار تصویری را برآورده نمی‌کنند.'),
      D: L('Das Bildkriterium verlangt beidseitige Verschattungen; schwere Hypoxämie macht ein einseitiges Muster nicht bilateral.', 'The imaging criterion requires bilateral opacities; severe hypoxaemia does not make a unilateral pattern bilateral.', 'معیار تصویری به کدورت دوطرفه نیاز دارد؛ هیپوکسمی شدید الگوی یک‌طرفه را دوطرفه نمی‌کند.'),
    },
    source: 'Global ARDS Definition consensus paper (2024), imaging and diagnostic criteria.',
  }
  return [comparative, ards]
})

export const PULMONARY_EDEMA_QUESTIONS = [...PULMONARY_EDEMA_HRCT_QUESTIONS, ...PULMONARY_EDEMA_RETRIEVAL_QUESTIONS]

export const PULMONARY_EDEMA_FLASHCARD_TOPIC = {
  id: 'lungenoedem', area: 'Thorax', chapter: 'Lungenparenchymerkrankungen', icon: 'CT', color: '#4b8994',
  href: '/flashcards/lungenoedem', title: L('Lungenödem', 'Pulmonary oedema', 'ادم ریوی'),
  subtitle: L('HRCT · Septen · Verteilung · Kontext', 'HRCT · septa · distribution · context', 'HRCT · سپتا · توزیع · زمینه'),
}

export const PULMONARY_EDEMA_FLASHCARDS = [{
  id: 'lungenoedem-hrct-pattern', topicId: 'lungenoedem', category: L('HRCT-Muster', 'HRCT pattern', 'الگوی HRCT'),
  front: L('Welche HRCT-Kombination stützt ein hydrostatisches Ödem?', 'Which HRCT combination supports hydrostatic oedema?', 'کدام ترکیب HRCT از ادم هیدروستاتیک حمایت می‌کند؟'),
  answer: L('Glatte interlobuläre Septenverdickung plus GGO, oft mit perihilärer/schwerkraftabhängiger Verteilung und möglichen Begleitzeichen; kein Einzelzeichen beweist die kardiale Ursache.', 'Smooth interlobular septal thickening plus GGO, often with perihilar/gravity-dependent distribution and possible accompanying signs; no single sign proves a cardiac cause.', 'ضخیم‌شدن صاف سپتاهای بین‌لوبولی همراه GGO، اغلب با توزیع اطراف ناف ریه/وابسته به جاذبه و نشانه‌های همراه احتمالی؛ هیچ نشانهٔ منفردی علت قلبی را ثابت نمی‌کند.'),
  source: 'Thorax.pdf p. 17 (printed p. 16); Ribeiro et al. 2006; Kim et al. 2001',
}, {
  id: 'lungenoedem-cardiogenic-vs-permeability', topicId: 'lungenoedem', category: L('Röntgen · Differenzialmuster', 'Radiography · differential pattern', 'رادیوگرافی · الگوی افتراقی'),
  front: L('Welche Röntgenmerkmale verschieben die Gewichtung eher zum kardiogenen Muster?', 'Which radiographic features shift the likelihood toward a cardiogenic pattern?', 'کدام ویژگی‌های رادیوگرافیک احتمال الگوی کاردیوژنیک را بیشتر می‌کنند؟'),
  answer: L('Kardiomegalie, Gefäßumverteilung, Kerley-Linien und Pleuraergüsse können dafür sprechen. Es sind keine allein beweisenden Kriterien; Mischbilder und Kontext beachten.', 'Cardiomegaly, vascular redistribution, Kerley lines and pleural effusions may support it. They are not proof on their own; consider mixed patterns and context.', 'کاردیومگالی، بازتوزیع عروق، خطوط Kerley و افیوژن پلور می‌توانند مؤید باشند. این‌ها به‌تنهایی اثبات‌کننده نیستند؛ الگوهای مختلط و زمینه را در نظر بگیرید.'),
  source: 'Thorax.pdf p. 49 (printed p. 48), cardiogenic vs non-cardiogenic comparison.',
}, {
  id: 'lungenoedem-pcwp-definition', topicId: 'lungenoedem', category: L('Hämodynamik', 'Haemodynamics', 'همودینامیک'),
  front: L('Was bedeutet PCWP, und was misst es nicht?', 'What does PCWP mean, and what does it not measure?', 'PCWP به چه معناست و چه چیزی را اندازه‌گیری نمی‌کند؟'),
  answer: L('Pulmonary capillary wedge pressure (pulmonalkapillärer Verschlussdruck): ein invasiver hämodynamischer Messwert, der unter passenden Bedingungen den linksatrialen Druck abschätzt. Er ist nicht aus einem Röntgen- oder CT-Bild ablesbar.', 'Pulmonary capillary wedge pressure: an invasive haemodynamic measurement that estimates left atrial pressure under appropriate conditions. It cannot be read from a radiograph or CT image.', 'Pulmonary capillary wedge pressure (فشار گوه‌ای مویرگ ریوی): اندازه‌گیری همودینامیک تهاجمی که در شرایط مناسب فشار دهلیز چپ را برآورد می‌کند. از تصویر رادیوگرافی یا CT قابل خواندن نیست.'),
  source: 'Thorax.pdf p. 48 (printed p. 47); Luchsinger et al., Circulation Research, primary haemodynamic study.',
}, {
  id: 'ards-imaging-boundary', topicId: 'lungenoedem', category: L('ARDS · Bildkriterium', 'ARDS · imaging criterion', 'ARDS · معیار تصویری'),
  front: L('Beweisen beidseitige Verschattungen allein ein ARDS?', 'Do bilateral opacities alone prove ARDS?', 'آیا کدورت‌های دوطرفه به‌تنهایی ARDS را ثابت می‌کنند؟'),
  answer: L('Nein. Sie erfüllen ein Bildkriterium; die globale Definition verlangt zusätzlich klinische und Oxygenierungs-Kriterien.', 'No. They meet an imaging criterion; the global definition also requires clinical and oxygenation criteria.', 'خیر. آن‌ها معیار تصویری را برآورده می‌کنند؛ تعریف جهانی علاوه بر آن، معیارهای بالینی و اکسیژناسیون را لازم می‌داند.'),
  source: 'Global ARDS Definition consensus paper (2024).',
}]
