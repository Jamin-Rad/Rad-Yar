const L = (de, en, fa) => ({ de, en, fa })

export const UIP_IPF_LESSON = {
  id: 'uip-ipf',
  title: L('UIP-Muster erkennen: wann ist es IPF?', 'Recognising a UIP pattern: when is it IPF?', 'شناخت الگوی UIP: چه زمانی IPF است؟'),
  heroImage: '/educational/uip-ipf/uip-pattern.svg',
  heroAlt: L('Konzeptschema einer basal-subpleural betonten Lungenfibrose mit Traktionsbronchiektasen und subpleuralen zystischen Räumen; keine CT-Aufnahme.', 'Concept schematic of basal-subpleural fibrosis with traction bronchiectasis and subpleural cystic spaces; not a CT image.', 'شماتیک مفهومی فیبروز قاعده‌ای و ساب‌پلورال همراه با برونشکتازی کششی و فضاهای کیستیک ساب‌پلورال؛ تصویر CT نیست.'),
  intro: L('Ein UIP-Muster ist ein Bildgebungs- und Histologiemuster, keine Ursache. Die idiopathische Lungenfibrose (IPF) ist eine klinische Diagnose, die erst nach Ausschluss bekannter Ursachen und im passenden Gesamtkontext gestellt wird.', 'UIP is an imaging and histological pattern, not an aetiology. Idiopathic pulmonary fibrosis (IPF) is a clinical diagnosis made only after excluding known causes and considering the full clinical context.', 'UIP یک الگوی تصویربرداری و بافت‌شناسی است، نه علت بیماری. فیبروز ریوی ایدیوپاتیک (IPF) پس از رد علت‌های شناخته‌شده و با درنظرگرفتن کل زمینهٔ بالینی تشخیص داده می‌شود.'),
  scope: L('Quelle: Thorax.pdf, PDF-S. 17 (Druck-S. 16). Die CT-Beispiele im oberen Folienteil zeigen ein kardiales Lungenödem, keine UIP. Die UIP-Aussagen unten auf der Seite sind hier von aktuellen Konsensuskriterien abgegrenzt und ergänzt.', 'Source: Thorax.pdf, PDF p. 17 (printed p. 16). The CT examples in the upper part of the slide show cardiogenic pulmonary oedema, not UIP. The UIP notes lower on the page are distinguished from and supplemented by current consensus criteria.', 'منبع: Thorax.pdf، صفحهٔ PDF ۱۷ (چاپی ۱۶). نمونه‌های CT در بخش بالایی اسلاید ادم ریوی کاردیوژنیک را نشان می‌دهند، نه UIP. نکات UIP در پایین صفحه از معیارهای اجماعی کنونی تفکیک و با آن‌ها تکمیل شده‌اند.'),
  chapters: [
    {
      id: 'pattern', icon: 'pattern',
      title: L('Welche Architektur spricht für UIP?', 'Which architecture supports a UIP pattern?', 'کدام معماری به نفع الگوی UIP است؟'),
      lead: L('Beginne mit der Verteilung: UIP ist typischerweise basal und subpleural betont, oft mit ungleichmäßiger Ausprägung. Suche dann nach Fibrosezeichen statt nach einer einzelnen Opazität.', 'Start with distribution: UIP is typically basal and subpleural predominant, often with heterogeneous involvement. Then look for signs of fibrosis rather than a single opacity.', 'از توزیع شروع کنید: UIP معمولاً در قاعده و نواحی ساب‌پلورال غالب است و اغلب شدت ناهمگونی دارد. سپس به‌جای یک کدورت منفرد، نشانه‌های فیبروز را جست‌وجو کنید.'),
      points: [
        L('Retikulation und architektonische Verzerrung zeigen ein fibrotisches Gerüst.', 'Reticulation and architectural distortion indicate a fibrotic framework.', 'رتیکولاسیون و تغییرشکل معماری، چارچوب فیبروتیک را نشان می‌دهند.'),
        L('Traktionsbronchiektasen/-bronchiolektasen sind unregelmäßig erweitert und verlaufen im fibrotischen Gewebe.', 'Traction bronchiectasis/bronchiolectasis is irregularly dilated and runs within fibrotic lung.', 'برونشکتازی/برونکیولکتازی کششی به‌طور نامنظم گشاد شده و درون بافت فیبروتیک امتداد می‌یابد.'),
        L('Honeycombing sind gruppierte subpleurale zystische Lufträume, häufig in mehreren Schichten. Einzelne Zysten allein genügen nicht.', 'Honeycombing consists of clustered subpleural cystic airspaces, often in multiple layers. Isolated cysts alone are insufficient.', 'هانی‌کامبینگ از فضاهای هوایی کیستیک خوشه‌ای در زیر پلور تشکیل می‌شود و اغلب چندلایه است. وجود یک کیست منفرد کافی نیست.'),
      ],
      visualNote: L('Das Schema zeigt die räumliche Idee, keinen Patientenbefund. Die Musterklassifikation erfolgt an einer geeigneten HRCT mit axialen und koronaren Ebenen.', 'The schematic shows the spatial concept, not a patient finding. Pattern classification uses appropriate HRCT with axial and coronal views.', 'شماتیک فقط مفهوم فضایی را نشان می‌دهد، نه یافتهٔ بیمار را. طبقه‌بندی الگو با HRCT مناسب در نماهای محوری و کرونال انجام می‌شود.'),
    },
    {
      id: 'categories', icon: 'categories',
      title: L('Wie wird das HRCT-Muster eingeordnet?', 'How is the HRCT pattern categorised?', 'الگوی HRCT چگونه طبقه‌بندی می‌شود؟'),
      lead: L('Die aktuelle ATS/ERS/JRS/ALAT-Leitlinie behält vier HRCT-Kategorien bei. Entscheidend sind Fibrosemerkmale, Verteilung und ob Hinweise auf eine Alternative vorliegen.', 'The current ATS/ERS/JRS/ALAT guideline retains four HRCT categories. Classification depends on fibrotic features, distribution and whether an alternative is suggested.', 'راهنمای کنونی ATS/ERS/JRS/ALAT چهار دستهٔ HRCT را حفظ کرده است. طبقه‌بندی به نشانه‌های فیبروز، توزیع و وجود یا نبود سرنخ برای تشخیص جایگزین وابسته است.'),
      rows: [
        [L('UIP', 'UIP', 'UIP'), L('Basal-subpleurale Fibrose mit Honeycombing, mit oder ohne Traktionsbronchiektasen; keine Merkmale, die eine Alternative nahelegen.', 'Basal-subpleural fibrosis with honeycombing, with or without traction bronchiectasis; no features suggesting an alternative.', 'فیبروز قاعده‌ای-ساب‌پلورال همراه با هانی‌کامبینگ، با یا بدون برونشکتازی کششی؛ بدون ویژگی‌های مطرح‌کنندهٔ تشخیص جایگزین.')],
        [L('Wahrscheinliche UIP', 'Probable UIP', 'UIP محتمل'), L('Ähnliche Verteilung mit Retikulation und peripheren Traktionsbronchiektasen/-bronchiolektasen, jedoch ohne Honeycombing.', 'Similar distribution with reticulation and peripheral traction bronchiectasis/bronchiolectasis, but without honeycombing.', 'توزیع مشابه همراه با رتیکولاسیون و برونشکتازی/برونکیولکتازی کششی محیطی، اما بدون هانی‌کامبینگ.')],
        [L('Unbestimmt für UIP', 'Indeterminate for UIP', 'نامعین برای UIP'), L('Fibrose ist erkennbar, erfüllt aber weder UIP noch wahrscheinliche UIP und weist nicht klar auf eine andere Ursache.', 'Fibrosis is present but does not meet UIP or probable UIP and does not clearly suggest another cause.', 'فیبروز وجود دارد، اما معیارهای UIP یا UIP محتمل را ندارد و به‌روشنی به علت دیگری اشاره نمی‌کند.')],
        [L('Alternative Diagnose', 'Alternative diagnosis', 'تشخیص جایگزین'), L('Beispielsweise überwiegendes Milchglas, ausgeprägte Mosaikattenuation/drei Dichten, zentrilobuläre Mikronoduli oder eine nichtbasale bzw. peribronchovaskuläre Verteilung.', 'Examples include predominant ground-glass opacity, marked mosaic attenuation/three-density pattern, centrilobular micronodules, or a non-basal/peribronchovascular distribution.', 'برای نمونه، غلبهٔ شیشه‌مات، کاهش دانسیته با توزیع موزاییکی (mosaic attenuation)/الگوی سه‌دانسیتهٔ واضح، میکروندول‌های سانتری‌لوبولار یا توزیع غیرقاعده‌ای/پری‌برونکوواسکولار.')],
      ],
      note: L('Die Kategorien beschreiben die HRCT-Wahrscheinlichkeit eines UIP-Musters; sie sind keine eigenständige IPF-Diagnose.', 'These categories describe the likelihood of a UIP pattern on HRCT; they are not an IPF diagnosis by themselves.', 'این دسته‌ها احتمال الگوی UIP در HRCT را توصیف می‌کنند و به‌تنهایی تشخیص IPF نیستند.'),
    },
    {
      id: 'interpretation', icon: 'interpretation',
      title: L('Wann darf man IPF daraus ableiten?', 'When can IPF be inferred?', 'چه زمانی می‌توان IPF را از این یافته‌ها نتیجه گرفت؟'),
      lead: L('UIP kann auch bei anderen Erkrankungen vorkommen, darunter fibrotische Hypersensitivitätspneumonitis und Bindegewebserkrankungen. Ein UIP-Muster allein belegt daher keine idiopathische Ursache.', 'UIP can also occur with other diseases, including fibrotic hypersensitivity pneumonitis and connective-tissue disease. A UIP pattern alone therefore does not establish an idiopathic cause.', 'UIP در بیماری‌های دیگری مانند پنومونیت حساسیتی فیبروتیک و بیماری‌های بافت همبند نیز دیده می‌شود. بنابراین، الگوی UIP به‌تنهایی ایدیوپاتیک‌بودن علت را ثابت نمی‌کند.'),
      points: [
        L('Expositionen, Medikamente und systemische Erkrankungen müssen als Ursachen geprüft werden.', 'Exposure, medications and systemic disease must be assessed as potential causes.', 'مواجهه‌های محیطی، داروها و بیماری‌های سیستمیک باید به‌عنوان علت احتمالی بررسی شوند.'),
        L('HRCT-Muster und klinischer Kontext werden bei Bedarf multidisziplinär zusammengeführt.', 'HRCT pattern and clinical context are integrated in multidisciplinary discussion when needed.', 'در صورت نیاز، الگوی HRCT و زمینهٔ بالینی در بحث چندتخصصی کنار هم قرار می‌گیرند.'),
        L('Auch ein Muster „wahrscheinliche UIP“ kann im passenden Kontext Teil einer IPF-Diagnose sein; die Entscheidung folgt nicht aus dem Bild allein.', 'A probable UIP pattern can contribute to an IPF diagnosis in the appropriate context; the decision does not come from imaging alone.', 'الگوی «UIP محتمل» نیز در زمینهٔ مناسب می‌تواند بخشی از تشخیص IPF باشد؛ تصمیم فقط از روی تصویر گرفته نمی‌شود.'),
      ],
      cave: L('Nicht mit dem Ödemmuster der oberen PDF-Hälfte verwechseln: glatte Septenverdickung plus Milchglas und perihiläre, schwerkraftabhängige Verteilung sprechen für ein anderes Muster als basal-subpleurale Retikulation, Traktionsbronchiektasen und Honeycombing. Die Folien-CTs sind Ödembeispiele, keine UIP-Fälle.', 'Do not confuse this with the oedema pattern in the upper half of the PDF: smooth septal thickening with ground-glass opacity and perihilar, gravity-dependent distribution differs from basal-subpleural reticulation, traction bronchiectasis and honeycombing. The slide CTs are oedema examples, not UIP cases.', 'این الگو را با ادم در نیمهٔ بالایی PDF اشتباه نگیرید: ضخیم‌شدن صاف سپتا همراه با شیشه‌مات و توزیع اطراف ناف ریه وابسته به جاذبه، با رتیکولاسیون قاعده‌ای-ساب‌پلورال، برونشکتازی کششی و هانی‌کامبینگ تفاوت دارد. CTهای اسلاید نمونهٔ ادم‌اند، نه UIP.'),
    },
  ],
  check: {
    title: L('Kurzcheck: Muster oder Diagnose?', 'Quick check: pattern or diagnosis?', 'خودآزمایی: الگو یا تشخیص؟'),
    prompt: L('HRCT با رتیکولاسیون و برونشکتازی کششی زیرپلورال و قاعده‌ای دیده می‌شود؛ هانی‌کامبینگ وجود ندارد و سرنخ آشکاری از تشخیص جایگزین دیده نمی‌شود. کدام طبقه‌بندی تصویری مناسب‌تر است؟', 'HRCT shows basal-subpleural reticulation and traction bronchiectasis, without honeycombing or an obvious alternative feature. Which imaging category is most appropriate?', 'در HRCT رتیکولاسیون و برونشکتازی کششی قاعده‌ای-ساب‌پلورال دیده می‌شود؛ هانی‌کامبینگ یا سرنخ واضحی برای تشخیص جایگزین وجود ندارد. کدام دسته‌بندی تصویری مناسب‌تر است؟'),
    options: [
      L('Wahrscheinliche UIP; eine IPF-Diagnose erfordert zusätzlich den passenden klinischen Kontext und den Ausschluss anderer Ursachen.', 'Probable UIP; an IPF diagnosis additionally requires the appropriate clinical context and exclusion of other causes.', 'UIP محتمل؛ تشخیص IPF علاوه بر آن به زمینهٔ بالینی مناسب و رد علت‌های دیگر نیاز دارد.'),
      L('UIP, weil Traktionsbronchiektasen Honeycombing ersetzen.', 'UIP, because traction bronchiectasis substitutes for honeycombing.', 'UIP، چون برونشکتازی کششی جایگزین هانی‌کامبینگ می‌شود.'),
      L('IPF ist allein durch die basale Verteilung bewiesen.', 'IPF is proven by basal distribution alone.', 'توزیع قاعده‌ای به‌تنهایی IPF را ثابت می‌کند.'),
      L('Alternative Diagnose, weil Honeycombing fehlt.', 'Alternative diagnosis, because honeycombing is absent.', 'تشخیص جایگزین، چون هانی‌کامبینگ وجود ندارد.'),
    ],
    answerIndex: 0,
    feedback: [
      L('Richtig. Retikulation mit Traktionsbronchiektasen bei passender basal-subpleuraler Verteilung, aber ohne Honeycombing, passt zur Kategorie „wahrscheinliche UIP“. IPF ist davon getrennt zu beurteilen.', 'Correct. Reticulation with traction bronchiectasis in a basal-subpleural distribution but without honeycombing fits the probable UIP category. IPF is assessed separately.', 'درست است. رتیکولاسیون همراه برونشکتازی کششی با توزیع قاعده‌ای-ساب‌پلورال، اما بدون هانی‌کامبینگ، با دستهٔ UIP محتمل سازگار است. IPF جداگانه ارزیابی می‌شود.'),
      L('Nicht ganz. Ohne Honeycombing entspricht das hier nicht der HRCT-Kategorie UIP; die übrigen Merkmale passen eher zur wahrscheinlichen UIP.', 'Not quite. Without honeycombing, this does not meet the HRCT UIP category here; the other features fit probable UIP.', 'نه کاملاً. بدون هانی‌کامبینگ، این یافته‌ها در اینجا در دستهٔ HRCT از نوع UIP قرار نمی‌گیرند؛ سایر ویژگی‌ها بیشتر با UIP محتمل سازگارند.'),
      L('Nein. Verteilung ist wichtig, aber allein weder ein UIP-Kriterium noch ein Beweis für IPF.', 'No. Distribution matters, but alone it is neither a UIP classification nor proof of IPF.', 'خیر. توزیع مهم است، اما به‌تنهایی نه طبقه‌بندی UIP است و نه اثبات IPF.'),
      L('Nein. Fehlendes Honeycombing schließt wahrscheinliche UIP nicht aus; andere Fibrosemerkmale und die Verteilung zählen.', 'No. Absence of honeycombing does not exclude probable UIP; other fibrotic features and distribution matter.', 'خیر. نبود هانی‌کامبینگ UIP محتمل را رد نمی‌کند؛ سایر نشانه‌های فیبروز و توزیع نیز مهم‌اند.'),
    ],
  },
  takeHome: [
    L('UIP ist ein Muster; IPF ist eine Diagnose nach Ausschluss bekannter Ursachen.', 'UIP is a pattern; IPF is a diagnosis made after excluding known causes.', 'UIP یک الگو است؛ IPF پس از رد علت‌های شناخته‌شده تشخیص داده می‌شود.'),
    L('Basal-subpleurale Retikulation, Traktionsbronchiektasen und Honeycombing sind zentrale Fibrosezeichen.', 'Basal-subpleural reticulation, traction bronchiectasis and honeycombing are key signs of fibrosis.', 'رتیکولاسیون قاعده‌ای-ساب‌پلورال، برونشکتازی کششی و هانی‌کامبینگ از نشانه‌های اصلی فیبروزند.'),
    L('Honeycombing fehlt bei wahrscheinlicher UIP; seine Abwesenheit allein weist nicht auf eine Alternative.', 'Honeycombing is absent in probable UIP; its absence alone does not indicate an alternative.', 'در UIP محتمل هانی‌کامبینگ وجود ندارد؛ نبود آن به‌تنهایی نشان‌دهندهٔ تشخیص جایگزین نیست.'),
    L('Verteilung, Fibrosezeichen und mögliche Alternativmerkmale gemeinsam beurteilen.', 'Assess distribution, fibrotic signs and possible alternative features together.', 'توزیع، نشانه‌های فیبروز و ویژگی‌های احتمالیِ تشخیص جایگزین را با هم بسنجید.'),
  ],
  sources: [
    { tag: L('Kurs-PDF · Seite 17', 'Course PDF · page 17', 'PDF درسی · صفحهٔ ۱۷'), title: L('Thorax.pdf, PDF S. 17 (Druck-S. 16)', 'Thorax.pdf, PDF p. 17 (printed p. 16)', 'Thorax.pdf، صفحهٔ PDF ۱۷ (چاپی ۱۶)'), href: null, citation: L('UIP-Notizen und Vergleichsgrafik im unteren Folienteil. Die CT-Beispiele oben zeigen Lungenödem und werden nicht als UIP-Fälle verwendet.', 'UIP notes and comparison graphic in the lower slide. The CT examples above show pulmonary oedema and are not used as UIP cases.', 'نکات UIP و نمودار مقایسه‌ای در بخش پایینی اسلاید است. نمونه‌های CT بالای صفحه ادم ریوی را نشان می‌دهند و به‌عنوان کیس UIP استفاده نمی‌شوند.') },
    { tag: L('ATS/ERS/JRS/ALAT · Leitlinie', 'ATS/ERS/JRS/ALAT · guideline', 'ATS/ERS/JRS/ALAT · راهنما'), title: L('ATS/ERS/JRS/ALAT-Leitlinie 2022: IPF und progressive pulmonale Fibrose', 'ATS/ERS/JRS/ALAT 2022 guideline: IPF and progressive pulmonary fibrosis', 'راهنمای ATS/ERS/JRS/ALAT سال ۲۰۲۲: IPF و فیبروز پیشرونده'), href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9851481/', citation: L('Bestätigt vier HRCT-Kategorien und unterscheidet UIP-Muster von IPF-Diagnose; Tabelle 3.', 'Retains four HRCT categories and distinguishes UIP pattern from IPF diagnosis; Table 3.', 'چهار دستهٔ HRCT را حفظ و الگوی UIP را از تشخیص IPF متمایز می‌کند؛ جدول ۳.') },
    { tag: L('ATS/ERS/JRS/ALAT · Leitlinie', 'ATS/ERS/JRS/ALAT · guideline', 'ATS/ERS/JRS/ALAT · راهنما'), title: L('ATS/ERS/JRS/ALAT-Leitlinie 2018: IPF-Diagnose', 'ATS/ERS/JRS/ALAT 2018 guideline: IPF diagnosis', 'راهنمای ATS/ERS/JRS/ALAT سال ۲۰۱۸: تشخیص IPF'), href: 'https://doi.org/10.1164/rccm.201807-1255ST', citation: L('Diagnostischer Rahmen und vier HRCT-Kategorien; IPF setzt den Ausschluss bekannter Ursachen voraus.', 'Diagnostic framework and four HRCT categories; IPF requires exclusion of known causes.', 'چارچوب تشخیصی و چهار دستهٔ HRCT؛ IPF مستلزم رد علت‌های شناخته‌شده است.') },
  ],
  notice: L('Die PDF-Seite enthält UIP-Notizen, aber die zugehörigen CT-Panels auf derselben Seite zeigen ein kardiales Lungenödem. Diese Panels sind daher keine Bildbelege für UIP. Das Schema ist eigens gezeichnet und nichtdiagnostisch.', 'The PDF page contains UIP notes, but its CT panels show cardiogenic pulmonary oedema. They are not evidence images for UIP. The schematic is purpose-drawn and non-diagnostic.', 'صفحهٔ PDF نکات UIP دارد، اما پنل‌های CT همان صفحه ادم ریوی کاردیوژنیک را نشان می‌دهند؛ بنابراین شاهد تصویری UIP نیستند. شماتیک اختصاصی و غیرتشخیصی است.'),
}

export const UIP_IPF_QUESTIONS = ['de', 'en', 'fa'].map(lang => ({
  id: `uip-ipf-${lang}-probable-pattern`, fach: 'thorax', tags: ['uip-ipf'],
  question: UIP_IPF_LESSON.check.prompt[lang],
  options: UIP_IPF_LESSON.check.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: 'A', explanation: UIP_IPF_LESSON.check.feedback[0][lang],
  wrongExplanations: { B: UIP_IPF_LESSON.check.feedback[1][lang], C: UIP_IPF_LESSON.check.feedback[2][lang], D: UIP_IPF_LESSON.check.feedback[3][lang] },
  source: 'Thorax.pdf p. 17 (printed p. 16); ATS/ERS/JRS/ALAT 2022 Table 3',
}))

export const UIP_IPF_FLASHCARD_TOPIC = {
  id: 'uip-ipf', area: 'Thorax', chapter: 'Interstitielle Lungenerkrankungen', icon: 'CT', color: '#487f8d',
  href: '/flashcards/uip-ipf', title: L('UIP / IPF', 'UIP / IPF', 'UIP / IPF'),
  subtitle: L('HRCT-Muster · vier Kategorien · UIP ist nicht gleich IPF', 'HRCT pattern · four categories · UIP is not IPF', 'الگوی HRCT · چهار دسته · UIP با IPF یکی نیست'),
}

export const UIP_IPF_FLASHCARDS = [{
  id: 'uip-hrct-core', topicId: 'uip-ipf', category: L('HRCT-Kernmuster', 'HRCT core pattern', 'الگوی اصلی HRCT'),
  front: L('Welche drei Bildmerkmale und welche Verteilung stützen ein UIP-Muster?', 'Which three imaging features and distribution support a UIP pattern?', 'کدام سه ویژگی تصویری و کدام توزیع از الگوی UIP حمایت می‌کنند؟'),
  answer: L('Basal-subpleurale Retikulation, Traktionsbronchiektasen und Honeycombing (bei UIP, nicht zwingend bei wahrscheinlicher UIP). UIP ist ein Muster; IPF setzt den Ausschluss anderer Ursachen voraus.', 'Basal-subpleural reticulation, traction bronchiectasis and honeycombing (for UIP, not required for probable UIP). UIP is a pattern; IPF requires exclusion of other causes.', 'رتیکولاسیون قاعده‌ای-ساب‌پلورال، برونشکتازی کششی و هانی‌کامبینگ (در UIP، اما نه الزاماً در UIP محتمل). UIP یک الگو است؛ IPF مستلزم رد علت‌های دیگر است.'),
  source: 'Thorax.pdf p. 17 (printed p. 16); ATS/ERS/JRS/ALAT 2022 Table 3',
}]
