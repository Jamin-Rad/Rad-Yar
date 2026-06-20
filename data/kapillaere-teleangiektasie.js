const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const TELEANGIEKTASIE_LESSON = {
  breadcrumb: L('Kapilläre Teleangiektasie', 'Capillary telangiectasia', 'تلانژکتازی مویرگی'),
  title: L('Kapilläre Teleangiektasie', 'Capillary Telangiectasia', 'تلانژکتازی مویرگی'),
  definition: L('Benigne Low-flow-Gefäßmalformation mit zartem Enhancement und fehlendem Masseneffekt.', 'A benign low-flow vascular malformation with faint enhancement and no mass effect.', 'مالفورماسیون عروقی خوش‌خیم کم‌جریان با افزایش ظریف و بدون اثر فشاری.'),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),
  heroCards: [
    { value: L('~⅔', '~⅔', 'حدود ⅔'), label: L('im Pons', 'in the pons', 'در پونز'), text: L('klassische Prädilektionsstelle', 'classic predilection site', 'محل تیپیک') },
    { value: L('Brush-like', 'Brush-like', 'برس‌مانند'), label: L('T1 C+ Enhancement', 'post-contrast T1 enhancement', 'افزایش T1 پس از کنتراست'), text: L('zart und unscharf begrenzt', 'faint and ill-defined', 'ظریف و با حدود نامشخص') },
    { value: 'SWI/T2*', label: L('Signalabfall', 'signal loss', 'افت سیگنال'), text: L('langsamer Fluss mit Deoxy-Hb', 'slow flow with deoxyhaemoglobin', 'جریان آهسته با دئوکسی‌هموگلوبین') },
  ],
  sections: [
    { id: 'grundlagen', icon: '🩸', label: L('Grundlagen', 'Basics', 'مبانی') },
    { id: 'klinik', icon: '🙂', label: L('Klinik & Lokalisation', 'Clinical & location', 'بالین و محل') },
    { id: 'bildgebung', icon: '🧲', label: L('MRT-Muster', 'MRI pattern', 'الگوی MRI') },
    { id: 'trias', icon: '🔺', label: L('Diagnostische Trias', 'Diagnostic triad', 'تریاد تشخیصی') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی') },
    { id: 'fall', icon: '🖼️', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها') },
    { id: 'management', icon: '🛡️', label: L('Management', 'Management', 'مدیریت') },
    { id: 'befundung', icon: '📝', label: L('Befundung', 'Reporting', 'گزارش') },
    { id: 'takehome', icon: '🏁', label: L('TAKE HOME MESSAGE', 'TAKE HOME MESSAGE', 'TAKE HOME MESSAGE'), emphasis: true },
  ],
  grundlagen: {
    title: L('Definition & Pathologie', 'Definition & pathology', 'تعریف و پاتولوژی'),
    lead: L('Kapilläre Teleangiektasien bestehen aus erweiterten, dünnwandigen Kapillaren mit normalem Hirnparenchym zwischen den Gefäßen.', 'Capillary telangiectasias consist of dilated thin-walled capillaries with normal brain tissue between the vessels.', 'تلانژکتازی مویرگی از مویرگ‌های گشاد و نازک‌دیواره با بافت طبیعی مغز در میان عروق تشکیل می‌شود.'),
    items: [
      { icon: '🔬', title: L('Histologie', 'Histology', 'بافت‌شناسی'), text: L('Das zwischenliegende Hirnparenchym unterscheidet die Läsion wesentlich vom Kavernom.', 'Intervening normal brain tissue is a key distinction from cavernoma.', 'وجود بافت طبیعی بین عروق تفاوت اصلی با کاورنوم است.') },
      { icon: '🐢', title: L('Low-flow', 'Low flow', 'کم‌جریان'), text: L('Sehr langsamer kapillärer Blutfluss ohne arteriovenösen Shunt oder Nidus.', 'Very slow capillary blood flow without an arteriovenous shunt or nidus.', 'جریان بسیار آهسته مویرگی بدون شانت AV یا نیدوس.') },
      { icon: '🧠', title: L('Nicht raumfordernd', 'Non-expansile', 'بدون اثر فشاری'), text: L('Typischerweise kein Ödem, keine Schwellung und keine Verdrängung angrenzender Strukturen.', 'Typically no oedema, swelling or displacement of adjacent structures.', 'معمولاً بدون ادم، تورم یا جابه‌جایی ساختارهای مجاور.') },
      { icon: '🧬', title: L('Assoziationen', 'Associations', 'همراهی‌ها'), text: L('Eine DVA oder ein Kavernom kann in derselben Region vorkommen.', 'A DVA or cavernoma may coexist in the same region.', 'ممکن است DVA یا کاورنوم در همان ناحیه همراه باشد.') },
    ],
    key: L('Normales Hirnparenchym zwischen den erweiterten Kapillaren = wichtiger Unterschied zum Kavernom.', 'Normal brain tissue between dilated capillaries is the key distinction from cavernoma.', 'وجود بافت طبیعی مغز بین مویرگ‌های گشاد، تفاوت کلیدی با کاورنوم است.'),
  },
  klinik: {
    title: L('Klinik & typische Lokalisation', 'Clinical presentation & typical location', 'تظاهر بالینی و محل تیپیک'),
    lead: L('Die meisten Läsionen sind kleine, asymptomatische Zufallsbefunde.', 'Most lesions are small, asymptomatic incidental findings.', 'بیشتر ضایعات کوچک، بدون علامت و اتفاقی هستند.'),
    headers: [L('Aspekt', 'Aspect', 'جنبه'), L('Typisch', 'Typical', 'تیپیک'), L('Relevanz', 'Relevance', 'اهمیت')],
    rows: [
      [L('Lokalisation', 'Location', 'محل'), L('Pons in etwa zwei Dritteln; seltener supratentoriell, Kleinhirn oder Rückenmark', 'Pons in about two thirds; less often supratentorial, cerebellar or spinal', 'پونز در حدود دو سوم؛ کمتر سوپراتنتوریال، مخچه یا نخاع'), L('Pontine Läsion mit typischem Muster zuerst benign einordnen', 'Recognise a pontine lesion with the typical pattern as benign', 'ضایعه پونز با الگوی تیپیک ابتدا خوش‌خیم تلقی شود')],
      [L('Symptome', 'Symptoms', 'علائم'), L('Meist keine; Beschwerden häufig nicht kausal', 'Usually none; symptoms are often unrelated', 'معمولاً بدون علامت؛ شکایات اغلب غیرمرتبط'), L('Klinische Korrelation und Alternativursachen prüfen', 'Assess clinical correlation and alternative causes', 'ارتباط بالینی و علل جایگزین بررسی شود')],
      [L('Blutung', 'Haemorrhage', 'خونریزی'), L('Isoliert extrem selten', 'Extremely rare in an isolated lesion', 'در ضایعه منفرد بسیار نادر'), L('Bei Blutprodukten an assoziiertes Kavernom denken', 'Consider an associated cavernoma when blood products are present', 'در محصولات خون به کاورنوم همراه فکر کنید')],
      [L('Verlauf', 'Course', 'سیر'), L('Stabil und benign', 'Stable and benign', 'پایدار و خوش‌خیم'), L('Bei typischem Befund meist keine Kontrolle nötig', 'Typical lesions usually need no follow-up', 'در یافته تیپیک معمولاً پیگیری لازم نیست')],
    ],
    cave: L('Deutlicher Masseneffekt, ausgeprägtes Ödem oder Wachstum sind untypisch und verlangen eine alternative Diagnose.', 'Marked mass effect, substantial oedema or growth are atypical and require an alternative diagnosis.', 'اثر فشاری واضح، ادم قابل‌توجه یا رشد غیرتیپیک است و نیاز به تشخیص جایگزین دارد.'),
  },
  bildgebung: {
    title: L('MRT: Sequenz für Sequenz', 'MRI: sequence by sequence', 'MRI بر اساس سکانس'),
    lead: L('Die Kombination aus diskreter Nativmorphologie, zarter Anreicherung und Suszeptibilität ist charakteristisch.', 'The combination of subtle non-contrast morphology, faint enhancement and susceptibility is characteristic.', 'ترکیب مورفولوژی ظریف بدون کنتراست، افزایش خفیف و حساسیت مشخصه است.'),
    headers: [L('Sequenz', 'Sequence', 'سکانس'), L('Befund', 'Finding', 'یافته'), L('Fallstrick', 'Pitfall', 'دام تشخیصی')],
    rows: [
      ['T1', L('Meist iso- oder unauffällig', 'Usually iso-intense or occult', 'اغلب ایزواینتنس یا نامشهود'), L('Kann in Nativsequenzen vollständig übersehen werden', 'May be completely occult before contrast', 'ممکن است قبل از کنتراست کاملاً دیده نشود')],
      ['T2/FLAIR', L('Normal oder diskret hyperintens', 'Normal or subtly hyperintense', 'طبیعی یا کمی هایپراینتنس'), L('Kein relevantes Ödem oder Masseneffekt', 'No relevant oedema or mass effect', 'بدون ادم یا اثر فشاری مهم')],
      [L('T1 C+', 'Post-contrast T1', 'T1 پس از کنتراست'), L('Zarte, fleckige oder pinselartige Anreicherung mit unscharfer Begrenzung', 'Faint patchy or brush-like ill-defined enhancement', 'افزایش ظریف لکه‌ای یا برس‌مانند با حدود نامشخص'), L('Kann Tumor oder Entzündung vortäuschen', 'May mimic tumour or inflammation', 'ممکن است تومور یا التهاب را تقلید کند')],
      ['SWI/T2*', L('Korrespondierender hypointenser Fokus beziehungsweise Blooming', 'Corresponding hypointense focus or blooming', 'کانون هیپواینتنس یا Blooming متناظر'), L('Signalabfall beruht meist auf Deoxy-Hb im langsamen Fluss, nicht auf Blutung', 'Signal loss usually reflects deoxyhaemoglobin in slow flow, not haemorrhage', 'افت سیگنال معمولاً ناشی از دئوکسی‌هموگلوبین جریان آهسته است نه خونریزی')],
      ['DWI/ADC', L('Keine Restriktion', 'No restriction', 'بدون محدودیت انتشار'), L('Restriktion spricht gegen eine unkomplizierte Teleangiektasie', 'Restriction argues against an uncomplicated telangiectasia', 'محدودیت انتشار علیه تلانژکتازی ساده است')],
      ['DSA', L('Meist angiographisch okkult', 'Usually angiographically occult', 'معمولاً در آنژیوگرافی مخفی'), L('Negative DSA schließt die Diagnose nicht aus', 'Negative DSA does not exclude the diagnosis', 'DSA منفی تشخیص را رد نمی‌کند')],
    ],
    key: L('SWI-Signalabfall + zartes T1-C+-Enhancement ohne Masseneffekt ist die entscheidende Kombination.', 'SWI signal loss plus faint post-contrast enhancement without mass effect is the decisive combination.', 'افت سیگنال SWI همراه افزایش ظریف پس از کنتراست و بدون اثر فشاری، ترکیب کلیدی است.'),
  },
  trias: {
    title: L('Diagnostische Trias', 'Diagnostic triad', 'تریاد تشخیصی'),
    lead: L('Drei zusammengehörige Merkmale verhindern unnötige Biopsie oder Verlaufskontrollen.', 'Three linked features help avoid unnecessary biopsy or follow-up.', 'سه ویژگی مرتبط از بیوپسی یا پیگیری غیرضروری جلوگیری می‌کنند.'),
    items: [
      { icon: '🖌️', title: L('Brush-like Enhancement', 'Brush-like enhancement', 'افزایش برس‌مانند'), text: L('Zart, fleckig und unscharf auf kontrastverstärktem T1.', 'Faint, patchy and ill-defined on post-contrast T1.', 'ظریف، لکه‌ای و با حدود نامشخص در T1 پس از کنتراست.') },
      { icon: '⚫', title: L('SWI-Hypointensität', 'SWI hypointensity', 'هیپواینتنس SWI'), text: L('Signalabfall am exakt korrespondierenden Ort.', 'Signal loss at the exact corresponding location.', 'افت سیگنال دقیقاً در محل متناظر.') },
      { icon: '🫥', title: L('Keine Raumforderung', 'No mass effect', 'بدون اثر فشاری'), text: L('T1/T2 weitgehend unauffällig, kein Ödem und keine Verdrängung.', 'T1/T2 largely unremarkable, without oedema or displacement.', 'T1/T2 عمدتاً طبیعی، بدون ادم یا جابه‌جایی.') },
    ],
    key: L('Fehlt ein Teil der Trias, muss die Differenzialdiagnose breiter bleiben.', 'If one element of the triad is missing, keep the differential diagnosis broader.', 'اگر بخشی از تریاد وجود ندارد، تشخیص افتراقی باید گسترده‌تر بماند.'),
  },
  differenzial: {
    title: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی'),
    lead: L('Die häufigste Gefahr ist die Fehlinterpretation als kleiner Tumor oder entzündliche Läsion.', 'The main pitfall is mistaking it for a small tumour or inflammatory lesion.', 'مهم‌ترین دام، اشتباه با تومور کوچک یا ضایعه التهابی است.'),
    headers: [L('Diagnose', 'Diagnosis', 'تشخیص'), L('Abgrenzung', 'Distinction', 'افتراق')],
    rows: [
      [L('Kavernom', 'Cavernoma', 'کاورنوم'), L('Popcorn-Kern und kompletter Hämosiderinsaum; kein normales Parenchym zwischen Gefäßräumen', 'Popcorn core and complete haemosiderin rim; no intervening normal tissue', 'هسته پاپ‌کورنی و حاشیه کامل هموسیدرین؛ بدون بافت طبیعی بین فضاهای عروقی')],
      ['DVA', L('Konvergierende Medullarvenen und erkennbare Sammelvene statt fleckigem Enhancement', 'Converging medullary veins and a collector rather than patchy enhancement', 'وریدهای مدولاری همگرا و ورید جمع‌کننده به‌جای افزایش لکه‌ای')],
      [L('Gliom', 'Glioma', 'گلیوم'), L('T2-Läsion, Expansion und häufig zunehmender Masseneffekt; kein typischer SWI-C+-Match', 'T2 lesion, expansion and often progressive mass effect; no typical SWI/enhancement match', 'ضایعه T2، اتساع و اثر فشاری پیشرونده؛ بدون تطابق تیپیک SWI و کنتراست')],
      [L('Demyelinisierung', 'Demyelination', 'دمیلیناسیون'), L('Deutlichere T2/FLAIR-Läsion, klinischer Kontext und häufig kein punktgenauer SWI-Signalabfall', 'More conspicuous T2/FLAIR lesion, clinical context and usually no exact SWI signal loss', 'ضایعه واضح‌تر T2/FLAIR، زمینه بالینی و معمولاً بدون افت دقیق SWI')],
      [L('Subakuter Infarkt', 'Subacute infarct', 'انفارکت تحت‌حاد'), L('Vaskuläres Territorium, DWI-/ADC-Verlauf und gyriformes Enhancement', 'Vascular territory, DWI/ADC evolution and gyriform enhancement', 'قلمرو عروقی، سیر DWI/ADC و افزایش ژیری‌فرم')],
    ],
  },
  fall: {
    title: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'),
    lead: L('Je ein Einzelbild der Radiopaedia-Fälle rID 58408 und rID 9732.', 'One representative image from each Radiopaedia case, rID 58408 and rID 9732.', 'یک تصویر نماینده از هر کیس Radiopaedia با rID 58408 و rID 9732.'),
    cases: [
      {
        title: L('Kleine pontine kapilläre Teleangiektasie', 'Small pontine capillary telangiectasia', 'تلانژکتازی مویرگی کوچک پونز'),
        tags: ['MRT', 'T1 C+', 'rID 58408'],
        image: '/kapillaere-teleangiektasie/case-58408/t1-postcontrast.jpeg',
        alt: L('Kontrastverstärkte T1-MRT einer kleinen pontinen kapillären Teleangiektasie', 'Post-contrast T1 MRI of a small pontine capillary telangiectasia', 'MRI T1 پس از کنتراست تلانژکتازی مویرگی کوچک پونز'),
        meta: L('Punktförmige Anreicherung in der posterioren paramedianen rechten Hemipons ohne Masseneffekt.', 'Punctate enhancement in the posterior paramedian right hemipons without mass effect.', 'افزایش نقطه‌ای در نیمه راست خلفی پارامدیان پونز بدون اثر فشاری.'),
        credit: 'Radiopaedia.org · rID 58408',
        url: 'https://radiopaedia.org/cases/58408/play',
      },
      {
        title: L('Kapilläre Teleangiektasie des ventralen Pons', 'Ventral pontine capillary telangiectasia', 'تلانژکتازی مویرگی پونز ونترال'),
        tags: ['MRT', 'T1 C+', 'rID 9732'],
        image: '/kapillaere-teleangiektasie/case-9732/t1-postcontrast.jpeg',
        alt: L('Kontrastverstärkte T1-MRT einer kapillären Teleangiektasie des ventralen Pons', 'Post-contrast T1 MRI of a ventral pontine capillary telangiectasia', 'MRI T1 پس از کنتراست تلانژکتازی مویرگی پونز ونترال'),
        meta: L('Unscharf fleckige, die Mittellinie überschreitende Anreicherung ohne raumfordernden Effekt.', 'Ill-defined patchy enhancement crossing the midline without mass effect.', 'افزایش لکه‌ای با حدود نامشخص و عبور از خط میانی بدون اثر فشاری.'),
        credit: 'Radiopaedia.org · rID 9732',
        url: 'https://radiopaedia.org/cases/9732/play',
      },
    ],
    findingsTitle: L('Strukturierte Bildanalyse', 'Structured image analysis', 'تحلیل ساختاری تصویر'),
    findings: [
      L('Lokalisation und exakte Größe dokumentieren.', 'Document location and exact size.', 'محل و اندازه دقیق ثبت شود.'),
      L('Enhancement-Muster auf zarte, pinselartige Morphologie prüfen.', 'Assess whether enhancement is faint and brush-like.', 'الگوی افزایش از نظر ظریف و برس‌مانند بودن بررسی شود.'),
      L('SWI/T2* auf exakt korrespondierenden Signalabfall prüfen.', 'Check SWI/T2* for exactly corresponding signal loss.', 'SWI/T2* برای افت سیگنال دقیقاً متناظر بررسی شود.'),
      L('Ödem, Expansion, DWI-Restriktion und Begleitmalformationen ausschließen.', 'Exclude oedema, expansion, diffusion restriction and associated malformations.', 'ادم، اتساع، محدودیت انتشار و مالفورماسیون همراه رد شود.'),
    ],
    diagnosis: L('Bei typischer Trias vereinbar mit benigner kapillärer Teleangiektasie.', 'With the typical triad, compatible with a benign capillary telangiectasia.', 'با تریاد تیپیک، سازگار با تلانژکتازی مویرگی خوش‌خیم.'),
  },
  management: {
    title: L('Management', 'Management', 'مدیریت'),
    lead: L('Eine typische asymptomatische kapilläre Teleangiektasie ist eine „Do-not-touch“-Läsion.', 'A typical asymptomatic capillary telangiectasia is a do-not-touch lesion.', 'تلانژکتازی مویرگی تیپیک و بدون علامت ضایعه‌ای است که نباید دستکاری شود.'),
    items: [
      { icon: '✅', title: L('Keine Therapie', 'No treatment', 'بدون درمان'), text: L('Ein typischer Zufallsbefund erfordert keine operative oder interventionelle Behandlung.', 'A typical incidental lesion needs no surgery or intervention.', 'یافته تیپیک اتفاقی نیاز به جراحی یا مداخله ندارد.') },
      { icon: '📅', title: L('Keine Routinekontrolle', 'No routine follow-up', 'بدون پیگیری روتین'), text: L('Bei vollständiger typischer MRT-Trias ist meist keine Verlaufskontrolle nötig.', 'With the complete typical MRI triad, routine follow-up is usually unnecessary.', 'با تریاد کامل تیپیک MRI، معمولاً پیگیری روتین لازم نیست.') },
      { icon: '🔎', title: L('Atypischer Befund', 'Atypical finding', 'یافته غیرتیپیک'), text: L('Bei Wachstum, Ödem, Restriktion oder deutlichem T2-Signal gezielte Kontrolle beziehungsweise weitere Abklärung.', 'Growth, oedema, restriction or marked T2 signal warrants targeted follow-up or further work-up.', 'رشد، ادم، محدودیت یا سیگنال واضح T2 نیازمند بررسی یا پیگیری هدفمند است.') },
      { icon: '✋', title: L('Keine Biopsie', 'Avoid biopsy', 'بیوپسی نکنید'), text: L('Eine Biopsie ist bei typischer Bildgebung unnötig und birgt Blutungsrisiko.', 'Biopsy is unnecessary with typical imaging and carries bleeding risk.', 'با تصویر تیپیک بیوپسی غیرضروری و همراه خطر خونریزی است.') },
    ],
    cave: L('„Benigne und nicht blutungsfreudig“ bedeutet nicht, dass eine Biopsie gefahrlos wäre.', '“Benign and not prone to spontaneous bleeding” does not mean biopsy is safe.', 'خوش‌خیم و کم‌خطر از نظر خونریزی خودبه‌خودی بودن به معنی ایمن بودن بیوپسی نیست.'),
  },
  befundung: {
    title: L('Befundung', 'Reporting', 'گزارش'),
    lead: L('Eine klare Formulierung verhindert unnötige onkologische Abklärung.', 'Clear wording prevents unnecessary oncological work-up.', 'عبارت روشن از بررسی انکولوژیک غیرضروری جلوگیری می‌کند.'),
    items: [
      { icon: '1️⃣', title: L('Ort & Größe', 'Location & size', 'محل و اندازه'), text: L('Pontin, para-/median, supratentoriell oder zerebellär; maximale Ausdehnung.', 'Pontine, para-/midline, supratentorial or cerebellar; maximum dimensions.', 'پونز، پارامدیان/میانی، سوپراتنتوریال یا مخچه؛ حداکثر ابعاد.') },
      { icon: '2️⃣', title: L('Muster', 'Pattern', 'الگو'), text: L('Zarte fleckige/pinselartige Anreicherung mit korrespondierender Suszeptibilität.', 'Faint patchy/brush-like enhancement with corresponding susceptibility.', 'افزایش ظریف لکه‌ای/برس‌مانند با حساسیت متناظر.') },
      { icon: '3️⃣', title: L('Negative Zeichen', 'Negative signs', 'علائم منفی'), text: L('Kein Masseneffekt, kein Ödem, keine Restriktion und keine relevante T2-Läsion.', 'No mass effect, oedema, restriction or substantial T2 lesion.', 'بدون اثر فشاری، ادم، محدودیت یا ضایعه قابل‌توجه T2.') },
      { icon: '4️⃣', title: L('Schlussfolgerung', 'Conclusion', 'نتیجه'), text: L('MRT-typische kapilläre Teleangiektasie; bei klassischer Konstellation keine Kontrolle erforderlich.', 'MRI-typical capillary telangiectasia; no follow-up required when classic.', 'تلانژکتازی مویرگی تیپیک MRI؛ در حالت کلاسیک بدون نیاز به پیگیری.') },
    ],
  },
  takehome: {
    title: L('TAKE HOME MESSAGE', 'TAKE HOME MESSAGE', 'TAKE HOME MESSAGE'),
    lead: L('Die vier prüfungsrelevanten Kernpunkte.', 'The four core exam points.', 'چهار نکته اصلی آزمونی.'),
    items: [
      { title: L('Pons', 'Pons', 'پونز'), text: L('Etwa zwei Drittel liegen im Pons und sind meist inzidentell.', 'About two thirds are pontine and usually incidental.', 'حدود دو سوم در پونز و معمولاً اتفاقی هستند.') },
      { title: L('Trias', 'Triad', 'تریاد'), text: L('Brush-like C+-Enhancement + SWI-Signalabfall + kein Ödem/Masseneffekt.', 'Brush-like enhancement + SWI signal loss + no oedema/mass effect.', 'افزایش برس‌مانند + افت SWI + بدون ادم/اثر فشاری.') },
      { title: L('Nicht Blutung', 'Not haemorrhage', 'نه خونریزی'), text: L('SWI-Hypointensität entsteht überwiegend durch langsamen Fluss und Deoxy-Hb.', 'SWI hypointensity mainly reflects slow flow and deoxyhaemoglobin.', 'هیپواینتنس SWI عمدتاً ناشی از جریان آهسته و دئوکسی‌هموگلوبین است.') },
      { title: L('Do not touch', 'Do not touch', 'دستکاری نکنید'), text: L('Typischer Befund: keine Therapie, meist keine Kontrolle und keine Biopsie.', 'Typical finding: no treatment, usually no follow-up and no biopsy.', 'یافته تیپیک: بدون درمان، معمولاً بدون پیگیری و بدون بیوپسی.') },
    ],
  },
}

const TQ = [
  Q('01', L('Welche histologische Eigenschaft unterscheidet die kapilläre Teleangiektasie vom Kavernom?', 'Which histological feature distinguishes capillary telangiectasia from cavernoma?', 'کدام ویژگی بافت‌شناسی تلانژکتازی مویرگی را از کاورنوم جدا می‌کند؟'), [L('Normales Hirnparenchym zwischen erweiterten Kapillaren', 'Normal brain tissue between dilated capillaries', 'بافت طبیعی مغز بین مویرگ‌های گشاد'), L('Kompletter Hämosiderinsaum', 'Complete haemosiderin rim', 'حاشیه کامل هموسیدرین'), L('Arterieller Nidus', 'Arterial nidus', 'نیدوس شریانی'), L('Fehlende Endothelwand', 'Absent endothelial wall', 'فقدان دیواره اندوتلیال')], 0, L('Bei der Teleangiektasie bleibt normales Parenchym zwischen den Gefäßen erhalten.', 'Normal intervening tissue is retained in telangiectasia.', 'در تلانژکتازی بافت طبیعی بین عروق حفظ می‌شود.')),
  Q('02', L('Wo liegt die klassische Prädilektionsstelle?', 'What is the classic predilection site?', 'محل تیپیک کجاست؟'), [L('Pons', 'Pons', 'پونز'), L('Corpus callosum', 'Corpus callosum', 'جسم پینه‌ای'), L('Hypophyse', 'Pituitary gland', 'هیپوفیز'), L('Cauda equina', 'Cauda equina', 'کودا اکوینا')], 0, L('Etwa zwei Drittel der zerebralen kapillären Teleangiektasien liegen im Pons.', 'About two thirds of cerebral capillary telangiectasias are pontine.', 'حدود دو سوم تلانژکتازی‌های مغزی در پونز قرار دارند.')),
  Q('03', L('Welches T1-C+-Muster ist typisch?', 'Which post-contrast T1 pattern is typical?', 'کدام الگوی T1 پس از کنتراست تیپیک است؟'), [L('Zart fleckig beziehungsweise pinselartig', 'Faint patchy or brush-like enhancement', 'افزایش ظریف لکه‌ای یا برس‌مانند'), L('Dicker geschlossener Ring', 'Thick complete ring', 'حلقه ضخیم کامل'), L('Homogener solider Knoten', 'Homogeneous solid nodule', 'ندول جامد همگن'), L('Keine Anreicherung', 'No enhancement', 'بدون افزایش')], 0, L('Die Anreicherung ist typischerweise zart, fleckig und unscharf begrenzt.', 'Enhancement is typically faint, patchy and ill-defined.', 'افزایش معمولاً ظریف، لکه‌ای و با حدود نامشخص است.')),
  Q('04', L('Warum ist die Läsion in SWI/T2* hypointens?', 'Why is the lesion hypointense on SWI/T2*?', 'چرا ضایعه در SWI/T2* هیپواینتنس است؟'), [L('Erhöhter Deoxy-Hb-Anteil bei langsamem Fluss', 'Increased deoxyhaemoglobin in slow-flow blood', 'افزایش دئوکسی‌هموگلوبین در جریان آهسته'), L('Immer wegen rezidivierender Makroblutung', 'Always due to recurrent macrohaemorrhage', 'همیشه به علت خونریزی ماکروسکوپی مکرر'), L('Verkalkung in allen Fällen', 'Calcification in every case', 'کلسیفیکاسیون در همه موارد'), L('Hoher arterieller Fluss', 'High arterial flow', 'جریان شریانی بالا')], 0, L('Der langsame Fluss erhöht den relativen Deoxy-Hb-Anteil und erzeugt Suszeptibilität.', 'Slow flow increases the relative deoxyhaemoglobin content and susceptibility.', 'جریان آهسته نسبت دئوکسی‌هموگلوبین و حساسیت را افزایش می‌دهد.')),
  Q('05', L('Welche Kombination ist die diagnostische Trias?', 'Which combination is the diagnostic triad?', 'کدام ترکیب تریاد تشخیصی است؟'), [L('Brush-like Enhancement, SWI-Signalabfall, kein Masseneffekt', 'Brush-like enhancement, SWI signal loss, no mass effect', 'افزایش برس‌مانند، افت SWI، بدون اثر فشاری'), L('Ring-Enhancement, Restriktion, Ödem', 'Ring enhancement, restriction, oedema', 'افزایش حلقوی، محدودیت، ادم'), L('Flow-Voids, Nidus, frühe Vene', 'Flow voids, nidus, early vein', 'Flow void، نیدوس، ورید زودرس'), L('Popcorn-Kern, Hämosiderinsaum, Blutung', 'Popcorn core, haemosiderin rim, haemorrhage', 'هسته پاپ‌کورنی، حاشیه هموسیدرین، خونریزی')], 0, L('Die Kombination aus zarter Anreicherung, Suszeptibilität und fehlender Raumforderung ist charakteristisch.', 'Faint enhancement, susceptibility and absent mass effect are characteristic.', 'افزایش ظریف، حساسیت و نبود اثر فشاری مشخصه است.')),
  Q('06', L('Welcher Befund ist für eine unkomplizierte Teleangiektasie untypisch?', 'Which finding is atypical for an uncomplicated telangiectasia?', 'کدام یافته برای تلانژکتازی ساده غیرتیپیک است؟'), [L('Deutlicher Masseneffekt', 'Marked mass effect', 'اثر فشاری واضح'), L('Diskrete FLAIR-Hyperintensität', 'Subtle FLAIR hyperintensity', 'هایپرسیگنال خفیف FLAIR'), L('Zartes Enhancement', 'Faint enhancement', 'افزایش ظریف'), L('SWI-Signalabfall', 'SWI signal loss', 'افت سیگنال SWI')], 0, L('Expansion, relevantes Ödem oder Masseneffekt verlangen eine alternative Diagnose.', 'Expansion, substantial oedema or mass effect require an alternative diagnosis.', 'اتساع، ادم قابل‌توجه یا اثر فشاری نیاز به تشخیص جایگزین دارد.')),
  Q('07', L('Welche Aussage zur spontanen Blutung ist korrekt?', 'Which statement about spontaneous haemorrhage is correct?', 'کدام عبارت درباره خونریزی خودبه‌خودی درست است؟'), [L('Bei isolierter typischer Läsion ist sie extrem selten.', 'It is extremely rare in an isolated typical lesion.', 'در ضایعه تیپیک منفرد بسیار نادر است.'), L('Sie ist häufiger als beim Kavernom.', 'It is more common than with cavernoma.', 'از کاورنوم شایع‌تر است.'), L('Jeder SWI-Fokus beweist eine Blutung.', 'Every SWI focus proves haemorrhage.', 'هر کانون SWI خونریزی را ثابت می‌کند.'), L('Antikoagulation ist absolut kontraindiziert.', 'Anticoagulation is absolutely contraindicated.', 'ضدانعقاد مطلقاً ممنوع است.')], 0, L('Die Läsion ist eine benigne Low-flow-Malformation; spontane Blutung ist bei isolierter Form außerordentlich selten.', 'It is a benign low-flow malformation; spontaneous haemorrhage is exceptionally rare when isolated.', 'این ضایعه خوش‌خیم و کم‌جریان است و خونریزی خودبه‌خودی در نوع منفرد بسیار نادر است.')),
  Q('08', L('Welche Läsion zeigt eher ein Caput-medusae-Muster?', 'Which lesion is more likely to show a caput-medusae pattern?', 'کدام ضایعه بیشتر الگوی Caput medusae دارد؟'), ['DVA', L('Kapilläre Teleangiektasie', 'Capillary telangiectasia', 'تلانژکتازی مویرگی'), L('Kavernom', 'Cavernoma', 'کاورنوم'), L('Mikroblutung', 'Microbleed', 'میکروخونریزی')], 0, L('Konvergierende Medullarvenen und Sammelvene sind typisch für DVA.', 'Converging medullary veins and a collector are typical of DVA.', 'وریدهای مدولاری همگرا و ورید جمع‌کننده برای DVA تیپیک‌اند.')),
  Q('09', L('Welche DWI-Konstellation ist typisch?', 'Which DWI pattern is typical?', 'کدام الگوی DWI تیپیک است؟'), [L('Keine Diffusionsrestriktion', 'No diffusion restriction', 'بدون محدودیت انتشار'), L('Deutliche zentrale Restriktion', 'Marked central restriction', 'محدودیت مرکزی واضح'), L('Kortikales Ribboning', 'Cortical ribboning', 'ریبونینگ کورتیکال'), L('ADC-Abfall im gesamten Pons', 'ADC reduction throughout the pons', 'کاهش ADC در کل پونز')], 0, L('Eine unkomplizierte kapilläre Teleangiektasie verursacht keine echte Restriktion.', 'An uncomplicated capillary telangiectasia does not cause true restriction.', 'تلانژکتازی ساده محدودیت واقعی انتشار ایجاد نمی‌کند.')),
  Q('10', L('Was ist bei vollständiger typischer MRT-Trias meist angemessen?', 'What is usually appropriate with the complete typical MRI triad?', 'در تریاد کامل تیپیک MRI چه اقدامی مناسب است؟'), [L('Keine Therapie und meist keine Verlaufskontrolle', 'No treatment and usually no follow-up', 'بدون درمان و معمولاً بدون پیگیری'), L('Stereotaktische Biopsie', 'Stereotactic biopsy', 'بیوپسی استریوتاکتیک'), L('Dringliche Resektion', 'Urgent resection', 'رزکسیون فوری'), L('Embolisation', 'Embolisation', 'آمبولیزاسیون')], 0, L('Die typische Läsion ist benign und eine Do-not-touch-Läsion.', 'The typical lesion is benign and should not be touched.', 'ضایعه تیپیک خوش‌خیم است و نباید دستکاری شود.')),
  Q('11', L('Warum sollte eine typische Läsion nicht biopsiert werden?', 'Why should a typical lesion not be biopsied?', 'چرا ضایعه تیپیک نباید بیوپسی شود؟'), [L('Bildgebung ist diagnostisch und die Biopsie birgt Blutungsrisiko.', 'Imaging is diagnostic and biopsy carries bleeding risk.', 'تصویربرداری تشخیصی است و بیوپسی خطر خونریزی دارد.'), L('Sie ist immer hochmaligne.', 'It is always highly malignant.', 'همیشه بسیار بدخیم است.'), L('Sie verschwindet nach Steroiden.', 'It disappears after steroids.', 'پس از استروئید ناپدید می‌شود.'), L('Histologie kann Gefäße nicht darstellen.', 'Histology cannot show vessels.', 'هیستولوژی عروق را نشان نمی‌دهد.')], 0, L('Bei klassischer MRT ist invasive Diagnostik unnötig und potenziell gefährlich.', 'With classic MRI, invasive diagnosis is unnecessary and potentially hazardous.', 'در MRI کلاسیک تشخیص تهاجمی غیرضروری و بالقوه خطرناک است.')),
  Q('12', L('Welche Befundformulierung ist am besten?', 'Which report conclusion is best?', 'کدام جمع‌بندی گزارش بهتر است؟'), [L('Zarte pontine C+-Anreicherung mit korrespondierender SWI-Hypointensität ohne Masseneffekt, MRT-typisch für kapilläre Teleangiektasie.', 'Faint pontine enhancement with corresponding SWI hypointensity and no mass effect, MRI-typical of capillary telangiectasia.', 'افزایش ظریف پونز با هیپواینتنس متناظر SWI و بدون اثر فشاری، تیپیک MRI برای تلانژکتازی مویرگی.'), L('Pontiner Tumor bis zum Beweis des Gegenteils.', 'Pontine tumour until proven otherwise.', 'تومور پونز تا اثبات خلاف.'), L('Hochfluss-AVM mit dringlicher Embolisation.', 'High-flow AVM requiring urgent embolisation.', 'AVM پرجریان نیازمند آمبولیزاسیون فوری.'), L('Akuter Infarkt trotz fehlender Restriktion.', 'Acute infarct despite absent restriction.', 'انفارکت حاد با وجود نبود محدودیت.')], 0, L('Die Formulierung nennt die charakteristische Trias und vermeidet unnötige Eskalation.', 'This wording states the characteristic triad and avoids unnecessary escalation.', 'این عبارت تریاد مشخصه را ذکر و از اقدامات غیرضروری جلوگیری می‌کند.')),
]

export const TELEANGIEKTASIE_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, TQ.map(seed => ({
  id: `kapillaere-teleangiektasie-${lang}-${seed.id}`,
  tags: ['kapillaere-teleangiektasie', 'gefaessmalformationen', 'gehirn'],
  fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: typeof text === 'string' ? text : text[lang] })),
  correct: String.fromCharCode(65 + seed.correct),
  explanation: seed.explanation[lang],
}))]))

const TF = [
  F('definition', L('Grundlagen', 'Basics', 'مبانی'), L('Histologische Definition?', 'Histological definition?', 'تعریف بافت‌شناسی؟'), L('Erweiterte dünnwandige Kapillaren mit normalem Hirnparenchym dazwischen.', 'Dilated thin-walled capillaries with intervening normal brain tissue.', 'مویرگ‌های گشاد نازک‌دیواره با بافت طبیعی مغز در میان آن‌ها.'), L('Wichtiger Unterschied zum Kavernom.', 'Key distinction from cavernoma.', 'تفاوت کلیدی با کاورنوم.')),
  F('lokalisation', L('Klinik', 'Clinical', 'بالینی'), L('Prädilektionsstelle?', 'Predilection site?', 'محل تیپیک؟'), L('Pons, etwa zwei Drittel der Fälle.', 'Pons, about two thirds of cases.', 'پونز، حدود دو سوم موارد.'), L('Andere Lokalisationen sind möglich.', 'Other locations are possible.', 'محل‌های دیگر نیز ممکن‌اند.')),
  F('enhancement', L('MRT', 'MRI', 'MRI'), L('Typisches T1-C+-Muster?', 'Typical post-contrast T1 pattern?', 'الگوی تیپیک T1 پس از کنتراست؟'), L('Zartes fleckiges oder pinselartiges Enhancement.', 'Faint patchy or brush-like enhancement.', 'افزایش ظریف لکه‌ای یا برس‌مانند.'), L('Meist unscharf begrenzt.', 'Usually ill-defined.', 'معمولاً با حدود نامشخص.')),
  F('swi', L('MRT', 'MRI', 'MRI'), L('Typischer SWI-Befund?', 'Typical SWI finding?', 'یافته تیپیک SWI؟'), L('Korrespondierender hypointenser Fokus.', 'Corresponding hypointense focus.', 'کانون هیپواینتنس متناظر.'), L('Durch Deoxy-Hb im langsamen Fluss.', 'Due to deoxyhaemoglobin in slow flow.', 'ناشی از دئوکسی‌هموگلوبین در جریان آهسته.')),
  F('trias', L('Diagnostik', 'Diagnosis', 'تشخیص'), L('Diagnostische Trias?', 'Diagnostic triad?', 'تریاد تشخیصی؟'), L('Brush-like Enhancement + SWI-Signalabfall + kein Ödem/Masseneffekt.', 'Brush-like enhancement + SWI signal loss + no oedema/mass effect.', 'افزایش برس‌مانند + افت SWI + بدون ادم/اثر فشاری.'), L('Verhindert Verwechslung mit Tumor.', 'Helps avoid mistaking it for tumour.', 'از اشتباه با تومور جلوگیری می‌کند.')),
  F('t2', L('MRT', 'MRI', 'MRI'), L('T2/FLAIR-Befund?', 'T2/FLAIR finding?', 'یافته T2/FLAIR؟'), L('Meist normal oder nur diskret hyperintens.', 'Usually normal or subtly hyperintense.', 'معمولاً طبیعی یا کمی هایپراینتنس.'), L('Keine Expansion oder relevantes Ödem.', 'No expansion or substantial oedema.', 'بدون اتساع یا ادم مهم.')),
  F('dwi', L('MRT', 'MRI', 'MRI'), L('DWI/ADC?', 'DWI/ADC?', 'DWI/ADC؟'), L('Keine echte Diffusionsrestriktion.', 'No true diffusion restriction.', 'بدون محدودیت واقعی انتشار.'), L('Restriktion verlangt eine andere Erklärung.', 'Restriction requires another explanation.', 'محدودیت نیاز به توضیح دیگری دارد.')),
  F('blutung', L('Risiko', 'Risk', 'خطر'), L('Spontanes Blutungsrisiko?', 'Spontaneous haemorrhage risk?', 'خطر خونریزی خودبه‌خودی؟'), L('Bei isolierter typischer Läsion extrem niedrig.', 'Extremely low in an isolated typical lesion.', 'در ضایعه تیپیک منفرد بسیار پایین.'), L('SWI-Hypointensität ist nicht automatisch Blutung.', 'SWI hypointensity is not automatically haemorrhage.', 'هیپواینتنس SWI الزاماً خونریزی نیست.')),
  F('dva', L('Differenzial', 'Differential', 'افتراقی'), L('Teleangiektasie vs. DVA?', 'Telangiectasia vs DVA?', 'تلانژکتازی در برابر DVA؟'), L('Teleangiektasie: fleckig/pinselartig; DVA: konvergierende Venen und Sammelvene.', 'Telangiectasia: patchy/brush-like; DVA: converging veins and a collector.', 'تلانژکتازی: لکه‌ای/برس‌مانند؛ DVA: وریدهای همگرا و جمع‌کننده.'), L('Beide können gemeinsam vorkommen.', 'They may coexist.', 'ممکن است همراه باشند.')),
  F('kavernom', L('Differenzial', 'Differential', 'افتراقی'), L('Teleangiektasie vs. Kavernom?', 'Telangiectasia vs cavernoma?', 'تلانژکتازی در برابر کاورنوم؟'), L('Kavernom mit Popcorn-Kern und Hämosiderinsaum; Teleangiektasie ohne Masseneffekt und mit zartem Enhancement.', 'Cavernoma has a popcorn core and haemosiderin rim; telangiectasia has faint enhancement without mass effect.', 'کاورنوم هسته پاپ‌کورنی و حاشیه هموسیدرین دارد؛ تلانژکتازی افزایش ظریف بدون اثر فشاری.'), L('Histologisch fehlt beim Kavernom normales Zwischenparenchym.', 'Cavernoma lacks normal intervening parenchyma.', 'در کاورنوم بافت طبیعی بینابینی وجود ندارد.')),
  F('management', L('Management', 'Management', 'مدیریت'), L('Typisches Management?', 'Typical management?', 'مدیریت تیپیک؟'), L('Keine Therapie und meist keine Verlaufskontrolle.', 'No treatment and usually no follow-up.', 'بدون درمان و معمولاً بدون پیگیری.'), L('Do-not-touch-Läsion.', 'A do-not-touch lesion.', 'ضایعه بدون دستکاری.')),
  F('biopsie', L('Management', 'Management', 'مدیریت'), L('Biopsie?', 'Biopsy?', 'بیوپسی؟'), L('Bei typischer Bildgebung vermeiden.', 'Avoid when imaging is typical.', 'در تصویر تیپیک اجتناب شود.'), L('Unnötig und mit Blutungsrisiko.', 'Unnecessary and carries bleeding risk.', 'غیرضروری و همراه خطر خونریزی.')),
  F('atypisch', L('Cave', 'Cave', 'هشدار'), L('Welche Zeichen sind atypisch?', 'Which features are atypical?', 'کدام علائم غیرتیپیک‌اند؟'), L('Wachstum, deutlicher Masseneffekt, Ödem oder Restriktion.', 'Growth, marked mass effect, oedema or restriction.', 'رشد، اثر فشاری واضح، ادم یا محدودیت.'), L('Dann Differentialdiagnose erweitern.', 'Then broaden the differential.', 'در این صورت افتراق گسترده شود.')),
  F('befund', L('Befundung', 'Reporting', 'گزارش'), L('Kernformulierung im Befund?', 'Core report wording?', 'عبارت اصلی گزارش؟'), L('Zarte C+-Anreicherung mit korrespondierender Suszeptibilität ohne Masseneffekt, typisch für kapilläre Teleangiektasie.', 'Faint enhancement with corresponding susceptibility and no mass effect, typical of capillary telangiectasia.', 'افزایش ظریف با حساسیت متناظر و بدون اثر فشاری، تیپیک تلانژکتازی مویرگی.'), L('Die negative Zeichen ausdrücklich nennen.', 'State the negative signs explicitly.', 'علائم منفی صریحاً ذکر شوند.')),
  F('assoziation', L('Assoziation', 'Association', 'همراهی'), L('Mögliche Begleitmalformationen?', 'Possible associated malformations?', 'مالفورماسیون‌های همراه؟'), L('DVA und Kavernom.', 'DVA and cavernoma.', 'DVA و کاورنوم.'), L('Bei Blutprodukten gezielt nach Kavernom suchen.', 'Look specifically for cavernoma when blood products are present.', 'در محصولات خون به‌طور هدفمند کاورنوم جستجو شود.')),
]

export const TELEANGIEKTASIE_FLASHCARDS = TF.map((item, index) => ({ id: `kapillaere-teleangiektasie-${String(index + 1).padStart(2, '0')}-${item.id}`, topicId: 'kapillaere-teleangiektasie', category: item.category, front: item.front, answer: item.answer, explanation: item.explanation }))
export const TELEANGIEKTASIE_FLASHCARD_TOPIC = {
  id: 'kapillaere-teleangiektasie', area: 'Kopf', chapter: 'Vaskuläre Erkrankungen', icon: '🖌️', iconImage: '/fach/gehirn.png', color: '#7c3aed', href: '/flashcards/kapillaere-teleangiektasie',
  title: L('Kapilläre Teleangiektasie', 'Capillary telangiectasia', 'تلانژکتازی مویرگی'),
  subtitle: L('Pons · Brush-like Enhancement · SWI · Differenzialdiagnose · Management', 'Pons · brush-like enhancement · SWI · differential · management', 'پونز · افزایش برس‌مانند · SWI · افتراق · مدیریت'),
}
