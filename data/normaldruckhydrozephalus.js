const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation, wrongExplanations) => ({ id, question, options, correct, explanation, wrongExplanations })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const NPH_LESSON = {
  pdfSourcePages: [69,71], // user PDF page range; see the source coverage ledger

  breadcrumb: L('Normaldruckhydrozephalus', 'Normal pressure hydrocephalus', 'هیدروسفالی فشار طبیعی'),
  title: L('Normaldruckhydrozephalus', 'Normal Pressure Hydrocephalus', 'هیدروسفالی فشار طبیعی'),
  definition: L(
    'Potenziell behandelbare Gang- und Kognitionsstörung mit disproportionaler Ventrikulomegalie.',
    'A potentially treatable gait and cognitive disorder with disproportionate ventriculomegaly.',
    'اختلال بالقوه قابل‌درمان راه‌رفتن و شناخت با بزرگی نامتناسب بطن‌ها.'
  ),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),
  heroCards: [
    { value: 'Hakim', label: L('klinische Trias', 'clinical triad', 'تریاد بالینی'), text: L('Gang · Kognition · Blase', 'gait · cognition · bladder', 'راه‌رفتن · شناخت · مثانه') },
    { value: L('> 0,30', '> 0.30', 'EI > 0.30'), label: L('Evans-Index', 'Evans index', 'شاخص ایوانز'), text: L('Ventrikulomegalie, nicht beweisend', 'ventriculomegaly, not diagnostic alone', 'بزرگی بطن، به‌تنهایی تشخیصی نیست') },
    { value: L('< 90°', '< 90°', 'CA < 90°'), label: L('Callosal angle', 'Callosal angle', 'زاویه کالوزال'), text: L('unterstützt NPH bei passender Klinik', 'supports NPH in the right context', 'در زمینه مناسب به نفع NPH') },
  ],
  sections: [
    { id: 'grundlagen', icon: '💧', label: L('Grundlagen', 'Basics', 'مبانی') },
    { id: 'klinik', icon: '🚶', label: L('Hakim-Trias', 'Hakim triad', 'تریاد حکیم') },
    { id: 'morphologie', icon: '🧠', label: L('Morphologie & DESH', 'Morphology & DESH', 'مورفولوژی و DESH') },
    { id: 'messungen', icon: '📐', label: L('Messungen', 'Measurements', 'اندازه‌گیری‌ها') },
    { id: 'mrt', icon: '🧲', label: L('MRT-Zeichen', 'MRI signs', 'علائم MRI') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی') },
    { id: 'fall', icon: '🖼️', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها') },
    { id: 'diagnostik', icon: '🩺', label: L('Diagnostik & Therapie', 'Work-up & treatment', 'تشخیص و درمان') },
    { id: 'takehome', icon: '🏁', label: L('TAKE HOME MESSAGE', 'TAKE HOME MESSAGE', 'TAKE HOME MESSAGE'), emphasis: true },
  ],
  grundlagen: {
    title: L('Definition & Pathophysiologie', 'Definition & pathophysiology', 'تعریف و پاتوفیزیولوژی'),
    lead: L(
      'Der idiopathische NPH ist ein kommunizierender Hydrozephalus des höheren Lebensalters; einzelne Druckmessungen können normal sein.',
      'Idiopathic NPH is a communicating hydrocephalus of older adults; single pressure measurements may be normal.',
      'NPH ایدیوپاتیک نوعی هیدروسفالی ارتباطی در سالمندان است و اندازه‌گیری منفرد فشار ممکن است طبیعی باشد.'
    ),
    items: [
      { icon: '🔄', title: L('Liquordynamik', 'CSF dynamics', 'دینامیک CSF'), text: L('Gestörte Resorption und veränderte intrakranielle Pulsatilität führen zur chronischen Ventrikelerweiterung.', 'Impaired resorption and altered intracranial pulsatility contribute to chronic ventricular enlargement.', 'اختلال جذب و تغییر ضربان‌پذیری داخل جمجمه به اتساع مزمن بطن‌ها کمک می‌کند.') },
      { icon: '🧓', title: L('Epidemiologie', 'Epidemiology', 'اپیدمیولوژی'), text: L('Typischerweise ältere Erwachsene; vaskuläre Komorbiditäten sind häufig.', 'Typically affects older adults; vascular comorbidity is common.', 'معمولاً سالمندان را درگیر می‌کند و بیماری‌های عروقی همراه شایع‌اند.') },
      { icon: '📈', title: L('Potenziell reversibel', 'Potentially reversible', 'بالقوه برگشت‌پذیر'), text: L('Im Gegensatz zu vielen Demenzen können ausgewählte Patienten von einer Shunt-Therapie profitieren.', 'Unlike many dementias, selected patients may benefit from shunt treatment.', 'برخلاف بسیاری از دمانس‌ها، بیماران منتخب ممکن است از شانت سود ببرند.') },
      { icon: '🧩', title: L('Klinisch-radiologische Diagnose', 'Clinicoradiological diagnosis', 'تشخیص بالینی-تصویری'), text: L('Kein einzelnes Bildzeichen beweist NPH; Klinik, Morphologie und Funktionsprüfung werden zusammen bewertet.', 'No single imaging sign proves NPH; symptoms, morphology and functional testing are assessed together.', 'هیچ علامت تصویری منفردی NPH را ثابت نمی‌کند؛ بالین، مورفولوژی و آزمون عملکردی با هم سنجیده می‌شوند.') },
    ],
    key: L('Die Bezeichnung „Normaldruck“ bedeutet nicht, dass die Liquordynamik normal ist.', '“Normal pressure” does not mean that CSF dynamics are normal.', 'اصطلاح «فشار طبیعی» به معنای طبیعی بودن دینامیک CSF نیست.'),
  },
  klinik: {
    title: L('Hakim-Trias', 'Hakim triad', 'تریاد حکیم'),
    lead: L('Die Gangstörung ist meist das früheste und shunt-responsivste Symptom.', 'Gait disturbance is usually the earliest and most shunt-responsive symptom.', 'اختلال راه‌رفتن معمولاً زودرس‌ترین و پاسخ‌گوترین علامت به شانت است.'),
    headers: [L('Komponente', 'Component', 'جزء'), L('Typisches Muster', 'Typical pattern', 'الگوی تیپیک'), L('Prüfungsrelevanz', 'Exam relevance', 'اهمیت آزمونی')],
    rows: [
      [L('Gang', 'Gait', 'راه‌رفتن'), L('Breitbasig, kleinschrittig, „magnetisch“, Starthemmung und Wendeschwierigkeit', 'Broad-based, short-stepped, “magnetic,” with initiation and turning difficulty', 'قاعده پهن، قدم‌های کوتاه، مغناطیسی، دشواری شروع و چرخش'), L('Oft zuerst und am deutlichsten gebessert', 'Often first and most improved after treatment', 'اغلب نخستین و بیشترین بهبود را دارد')],
      [L('Kognition', 'Cognition', 'شناخت'), L('Subkortikal-frontal: Verlangsamung, Aufmerksamkeits- und Exekutivstörung', 'Subcortical-frontal slowing with attention and executive dysfunction', 'کندی ساب‌کورتیکال-فرونتال با اختلال توجه و اجرایی'), L('Nicht mit Alzheimer-Muster gleichsetzen', 'Do not equate with an Alzheimer pattern', 'با الگوی آلزایمر یکسان ندانید')],
      [L('Blase', 'Bladder', 'مثانه'), L('Drang, Pollakisurie, später Inkontinenz', 'Urgency and frequency, later incontinence', 'فوریت و تکرر، سپس بی‌اختیاری'), L('Meist später als die Gangstörung', 'Usually later than gait disturbance', 'معمولاً دیرتر از اختلال راه‌رفتن')],
    ],
    cave: L('Eine vollständige Trias ist für die Verdachtsdiagnose nicht erforderlich.', 'The complete triad is not required to suspect NPH.', 'برای شک به NPH وجود هر سه جزء تریاد الزامی نیست.'),
  },
  morphologie: {
    title: L('Ventrikulomegalie & DESH-Muster', 'Ventriculomegaly & DESH pattern', 'بزرگی بطن‌ها و الگوی DESH'),
    lead: L('Entscheidend ist die Disproportion zwischen erweiterten inneren und charakteristisch verteilten äußeren Liquorräumen.', 'The key is disproportion between enlarged ventricles and the characteristic distribution of external CSF spaces.', 'نکته کلیدی عدم تناسب بین بطن‌های گشاد و توزیع مشخص فضاهای خارجی CSF است.'),
    items: [
      { icon: '↔️', title: L('Ventrikulomegalie', 'Ventriculomegaly', 'بزرگی بطن‌ها'), text: L('Symmetrische Erweiterung der Seitenventrikel und des III. Ventrikels, häufig mit abgerundeten Frontalhörnern.', 'Symmetric enlargement of the lateral and third ventricles, often with rounded frontal horns.', 'اتساع متقارن بطن‌های جانبی و سوم، اغلب با شاخ‌های فرونتال گرد.') },
      { icon: '↕️', title: L('Konfiguration des IV. Ventrikels', 'Fourth-ventricle configuration', 'پیکربندی بطن چهارم'), text: L('Der IV. Ventrikel kann normal weit bleiben, während Seitenventrikel und III. Ventrikel erweitert sind. Aquädukt und mögliche Abflussbehinderung im Gesamtbild prüfen; dieses Muster allein beweist kein NPH und schließt eine Obstruktion nicht aus.', 'The fourth ventricle may remain normal in size while the lateral and third ventricles are enlarged. Assess the aqueduct and possible outflow obstruction in context; this pattern alone does not establish NPH or exclude obstruction.', 'ممکن است بطن چهارم طبیعی بماند، در حالی که بطن‌های جانبی و سوم گشاد شده‌اند. آکوئداکت و احتمال انسداد مسیر خروج را در کل الگو ارزیابی کنید؛ این الگو به‌تنهایی NPH را ثابت نمی‌کند و انسداد را رد نمی‌کند.') },
      { icon: '🔒', title: L('Enge Hochkonvexität', 'Tight high convexity', 'تنگی تحدب فوقانی'), text: L('Enge hochparietale und parafalcine Sulci trotz Ventrikulomegalie.', 'Tight high-parietal and parafalcine sulci despite ventriculomegaly.', 'شیارهای پاریتال فوقانی و پارافالکس تنگ با وجود بزرگی بطن‌ها.') },
      { icon: '🌊', title: L('Weite Sylvische Fissuren', 'Enlarged Sylvian fissures', 'فیشورهای سیلوین گشاد'), text: L('Basale und Sylvische Liquorräume können prominent wirken; zusammen mit enger Konvexität ergibt sich DESH.', 'Basal and Sylvian CSF spaces may be prominent; with tight convexity this forms DESH.', 'فضاهای بازال و سیلوین ممکن است برجسته باشند؛ همراه با تحدب تنگ الگوی DESH می‌سازند.') },
      { icon: '⚪', title: L('Periventrikuläres Signal', 'Periventricular signal', 'سیگنال پیرابطنی'), text: L('„Polkappen“ können transependymalen Liquorfluss oder chronische Mikroangiopathie widerspiegeln.', 'Periventricular caps may reflect transependymal CSF flow or chronic small-vessel disease.', 'کلاهک‌های پیرابطنی می‌توانند ناشی از عبور ترانس‌اپاندیمال CSF یا میکروآنژیوپاتی باشند.') },
    ],
    key: L('DESH = Disproportionately Enlarged Subarachnoid-space Hydrocephalus: weite Sylvische Fissuren plus enge Hochkonvexität.', 'DESH combines enlarged Sylvian fissures with tight high-convexity sulci.', 'DESH ترکیب فیشورهای سیلوین گشاد و شیارهای تنگ تحدب فوقانی است.'),
    reference: { label: L('Einordnung der Ventrikelkonfiguration: Kiefer & Unterberg, Dtsch Arztebl Int 2012.', 'Context for ventricular configuration: Kiefer & Unterberg, Dtsch Arztebl Int 2012.', 'برای تفسیر پیکربندی بطن‌ها: Kiefer و Unterberg، مجله Dtsch Arztebl Int در سال ۲۰۱۲.'), url: 'https://doi.org/10.3238/arztebl.2012.0015' },
  },
  messungen: {
    title: L('Messungen richtig anwenden', 'Using measurements correctly', 'کاربرد صحیح اندازه‌گیری‌ها'),
    lead: L('Messwerte stützen die Morphologie, ersetzen aber weder die Mustererkennung noch die Klinik.', 'Measurements support morphology but do not replace pattern recognition or clinical assessment.', 'اندازه‌گیری‌ها از مورفولوژی حمایت می‌کنند اما جای تشخیص الگو و بالین را نمی‌گیرند.'),
    headers: [L('Parameter', 'Parameter', 'پارامتر'), L('Messung', 'Measurement', 'اندازه‌گیری'), L('Interpretation', 'Interpretation', 'تفسیر')],
    rows: [
      [L('Evans-Index', 'Evans index', 'شاخص ایوانز'), L('Maximale Vorderhornbreite / maximaler innerer Schädeldurchmesser, gleiche axiale Ebene', 'Maximal frontal horn width / maximal inner skull diameter on the same axial plane', 'حداکثر عرض شاخ‌های فرونتال / حداکثر قطر داخلی جمجمه در همان برش'), L('> 0,30 zeigt Ventrikulomegalie, ist aber unspezifisch', '>0.30 indicates ventriculomegaly but is nonspecific', 'بیش از ۰٫۳۰ نشان‌دهنده بزرگی بطن است اما اختصاصی نیست')],
      [L('Callosal angle', 'Callosal angle', 'زاویه کالوزال'), L('Koronar senkrecht zur AC-PC-Linie auf Höhe der Commissura posterior', 'Coronal plane perpendicular to the AC-PC line at the posterior commissure', 'کرونال عمود بر خط AC-PC در سطح کمیسور خلفی'), L('< 90° unterstützt NPH; bei Atrophie meist weiter', '<90° supports NPH; usually wider in atrophy', 'کمتر از ۹۰ درجه به نفع NPH؛ در آتروفی معمولاً بازتر')],
      [L('Temporalhörner', 'Temporal horns', 'شاخ‌های تمپورال'), L('Breite und Verlauf im Seitenvergleich', 'Assess width and course bilaterally', 'عرض و مسیر دوطرفه بررسی شود'), L('Frühe Erweiterung kann Hydrozephalus stützen, ist allein nicht spezifisch', 'Early enlargement may support hydrocephalus but is not specific alone', 'اتساع زودرس می‌تواند مؤید باشد ولی اختصاصی نیست')],
    ],
    cave: L('Evans-Index > 0,30 allein diagnostiziert keinen NPH und trennt ihn nicht sicher von Atrophie.', 'An Evans index >0.30 alone does not diagnose NPH or reliably separate it from atrophy.', 'شاخص ایوانز بیش از ۰٫۳۰ به‌تنهایی NPH را تشخیص نمی‌دهد و از آتروفی جدا نمی‌کند.'),
  },
  mrt: {
    title: L('Spezifische und unterstützende MRT-Zeichen', 'Specific and supportive MRI signs', 'علائم اختصاصی و حمایتی MRI'),
    lead: L('Die MRT zeigt Morphologie, Begleiterkrankungen und potenziell unterstützende Flussphänomene.', 'MRI shows morphology, comorbidity and potentially supportive flow phenomena.', 'MRI مورفولوژی، بیماری‌های همراه و پدیده‌های جریان حمایتی را نشان می‌دهد.'),
    headers: [L('Zeichen', 'Sign', 'علامت'), L('Darstellung', 'Appearance', 'ظاهر'), L('Einordnung', 'Interpretation', 'تفسیر')],
    rows: [
      [L('Aquädukt-Flow-void', 'Aqueductal flow void', 'افت سیگنال ناشی از جریان (flow void) آکوئداکت'), L('Flussbedingte Signalabsenkung in sagittaler T2', 'Flow-related signal loss on sagittal T2', 'افت سیگنال ناشی از جریان در T2 ساژیتال'), L('Unterstützend, aber nicht ausreichend spezifisch und nicht allein prognostisch', 'Supportive but insufficiently specific and not a stand-alone prognostic marker', 'حمایتی است اما اختصاصی یا پیش‌آگهی‌دهنده مستقل نیست')],
      [L('Cingulate sulcus sign', 'Cingulate sulcus sign', 'علامت شیار سینگولیت'), L('Paramediansagittal relativ enger posteriorer gegenüber anteriorem Anteil des Sulcus cinguli', 'On paramedian sagittal images, the posterior cingulate sulcus is tighter than its anterior part', 'در تصاویر پارامدیان ساژیتال، بخش خلفی شیار سینگولیت از بخش قدامی تنگ‌تر است'), L('Spiegelt die Enge der hohen Konvexität wider', 'Reflects high-convexity tightness', 'بازتاب تنگی تحدب فوقانی است')],
      [L('Periventrikuläre T2/FLAIR-Hyperintensität', 'Periventricular T2/FLAIR hyperintensity', 'هایپرسیگنال پیرابطنی T2/FLAIR'), L('Vor allem an Vorder- und Hinterhörnern', 'Especially around frontal and occipital horns', 'به‌ویژه اطراف شاخ‌های فرونتال و اکسیپیتال'), L('Liquorübertritt und Mikroangiopathie differenzieren', 'Distinguish CSF seepage from small-vessel disease', 'عبور CSF از بیماری عروق کوچک افتراق داده شود')],
    ],
    key: L('Ein kräftiger Aquädukt-Flow-void ist ein Puzzleteil – kein alleiniger Shunt-Prädiktor.', 'A strong aqueductal flow void is one piece of the puzzle, not a stand-alone shunt predictor.', 'افت سیگنال ناشی از جریان (flow void) قوی آکوئداکت تنها بخشی از پازل است و پیش‌بینی‌کننده مستقل شانت نیست.'),
  },
  differenzial: {
    title: L('NPH versus Atrophie und andere Gangstörungen', 'NPH versus atrophy and other gait disorders', 'NPH در برابر آتروفی و سایر اختلالات راه‌رفتن'),
    lead: L('Die häufigste Bildgebungsfrage ist Hydrozephalus oder Ex-vacuo-Erweiterung.', 'The most common imaging question is hydrocephalus versus ex-vacuo enlargement.', 'شایع‌ترین پرسش تصویری افتراق هیدروسفالی از اتساع ex vacuo است.'),
    headers: [L('Diagnose', 'Diagnosis', 'تشخیص'), L('Hinweisende Merkmale', 'Suggestive features', 'ویژگی‌های مؤید')],
    rows: [
      [L('NPH', 'NPH', 'NPH'), L('Disproportionale Ventrikulomegalie, kleiner Callosal angle, DESH, abgerundete Frontalhörner', 'Disproportionate ventriculomegaly, smaller callosal angle, DESH, rounded frontal horns', 'بزرگی نامتناسب بطن‌ها، زاویه کالوزال کوچک، DESH و شاخ‌های فرونتال گرد')],
      [L('Generaliserte Atrophie', 'Generalised atrophy', 'آتروفی منتشر'), L('Ventrikel und kortikale Sulci proportional weit; Callosal angle meist weiter', 'Proportional enlargement of ventricles and cortical sulci; usually wider callosal angle', 'اتساع متناسب بطن‌ها و شیارها؛ زاویه کالوزال معمولاً بازتر')],
      [L('Alzheimer-Krankheit', 'Alzheimer disease', 'بیماری آلزایمر'), L('Medial-temporale Atrophie und amnestisches Profil; Mischbilder möglich', 'Medial temporal atrophy and amnestic profile; mixed disease is possible', 'آتروفی تمپورال داخلی و الگوی آمنستیک؛ هم‌زمانی ممکن است')],
      [L('Vaskuläre Enzephalopathie', 'Vascular encephalopathy', 'انسفالوپاتی عروقی'), L('Infarkte, Lakunen und konfluierende Marklagerläsionen; kann NPH begleiten', 'Infarcts, lacunes and confluent white-matter disease; may coexist with NPH', 'انفارکت، لاکون و ضایعات همگرا ماده سفید؛ ممکن است همراه NPH باشد')],
      [L('Parkinson-Syndrom', 'Parkinsonism', 'پارکینسونیسم'), L('Rigor, Tremor, asymmetrische Bradykinese; Gangbild kann überlappen', 'Rigidity, tremor and asymmetric bradykinesia; gait may overlap', 'ریجیدیتی، ترمور و برادی‌کینزی نامتقارن؛ همپوشانی راه‌رفتن ممکن است')],
    ],
  },
  fall: {
    title: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'),
    lead: L('Radiopaedia-Fall rID 73685 als scrollbare MRT-Sequenz.', 'Radiopaedia case rID 73685 as a scrollable MRI sequence.', 'کیس Radiopaedia با rID 73685 به‌صورت توالی قابل پیمایش MRI.'),
    caseTitle: L('Bildmorphologie eines Normaldruckhydrozephalus', 'Imaging morphology of normal pressure hydrocephalus', 'مورفولوژی تصویری هیدروسفالی فشار طبیعی'),
    caseLabel: 'NPH',
    tags: ['MRT', 'DESH', 'rID 73685'],
    frames: [
      '/normaldruckhydrozephalus/case-73685/axial-t2.jpeg',
      '/normaldruckhydrozephalus/case-73685/sagittal-t1.jpeg',
      '/normaldruckhydrozephalus/case-73685/coronal-t2.jpeg',
      '/normaldruckhydrozephalus/case-73685/sagittal-ciss.jpeg',
      '/normaldruckhydrozephalus/case-73685/cingulate-sulcus.jpeg',
    ],
    frameLabels: [
      L('Axiale T2: symmetrische Ventrikulomegalie', 'Axial T2: symmetric ventriculomegaly', 'T2 اکسیال: بزرگی متقارن بطن‌ها'),
      L('Sagittale T1: erweiterter III. Ventrikel', 'Sagittal T1: enlarged third ventricle', 'T1 ساژیتال: بطن سوم گشاد'),
      L('Koronare T2: kleiner Callosal angle', 'Coronal T2: small callosal angle', 'T2 کرونال: زاویه کالوزال کوچک'),
      L('Sagittale CISS/T2: Aquädukt-Flow-void', 'Sagittal CISS/T2: aqueductal flow void', 'CISS/T2 ساژیتال: افت سیگنال ناشی از جریان (flow void) آکوئداکت'),
      L('Mediosagittal: Cingulate sulcus sign', 'Midsagittal: cingulate sulcus sign', 'میدساژیتال: علامت شیار سینگولیت'),
    ],
    imageAlt: L('MRT-Sequenz eines Normaldruckhydrozephalus', 'MRI sequence of normal pressure hydrocephalus', 'توالی MRI هیدروسفالی فشار طبیعی'),
    meta: L('Ventrikulomegalie mit engem Callosal angle, enger Hochkonvexität und unterstützenden Flusszeichen.', 'Ventriculomegaly with a narrow callosal angle, tight high convexity and supportive flow signs.', 'بزرگی بطن‌ها با زاویه کالوزال تنگ، تحدب فوقانی تنگ و علائم جریان حمایتی.'),
    credit: 'Radiopaedia.org · rID 73685',
    url: 'https://radiopaedia.org/cases/73685/play',
    findingsTitle: L('Strukturierte Bildanalyse', 'Structured image analysis', 'تحلیل ساختاری تصویر'),
    findings: [
      L('Ventrikelweite und Evans-Index beurteilen.', 'Assess ventricular size and Evans index.', 'اندازه بطن و شاخص ایوانز ارزیابی شود.'),
      L('Callosal angle in korrekter koronaler Ebene messen.', 'Measure the callosal angle in the correct coronal plane.', 'زاویه کالوزال در صفحه کرونال صحیح اندازه‌گیری شود.'),
      L('Hochkonvexität, parafalcine Sulci und Sylvische Fissuren auf DESH prüfen.', 'Assess high-convexity and parafalcine sulci and Sylvian fissures for DESH.', 'تحدب فوقانی، شیارهای پارافالکس و فیشورهای سیلوین برای DESH بررسی شوند.'),
      L('Begleitende Atrophie, Mikroangiopathie und alternative Ursachen dokumentieren.', 'Document coexisting atrophy, small-vessel disease and alternative causes.', 'آتروفی، بیماری عروق کوچک و علل جایگزین ثبت شوند.'),
    ],
    diagnosis: L('Bei passender Klinik bildmorphologisch vereinbar mit Normaldruckhydrozephalus.', 'In the appropriate clinical setting, imaging is compatible with normal pressure hydrocephalus.', 'در زمینه بالینی مناسب، تصویر با هیدروسفالی فشار طبیعی سازگار است.'),
  },
  diagnostik: {
    title: L('Erweiterte Diagnostik & Therapie', 'Further work-up & treatment', 'بررسی تکمیلی و درمان'),
    lead: L('Die Shunt-Entscheidung ist interdisziplinär und basiert nicht allein auf der Bildgebung.', 'The decision to shunt is multidisciplinary and is not based on imaging alone.', 'تصمیم برای شانت چندتخصصی است و فقط بر تصویربرداری تکیه ندارد.'),
    items: [
      { icon: '🧪', title: L('Tap-Test', 'Tap test', 'تست تخلیه'), text: L('Vor und nach großvolumiger Lumbalpunktion objektive Gangtests durchführen; eine Besserung unterstützt die Shunt-Indikation.', 'Perform objective gait testing before and after large-volume lumbar puncture; improvement supports shunting.', 'پیش و پس از LP با حجم بالا آزمون عینی راه‌رفتن انجام شود؛ بهبود از شانت حمایت می‌کند.') },
      { icon: '⏱️', title: L('Externe Lumbaldrainage', 'External lumbar drainage', 'درناژ کمری خارجی'), text: L('Bei unklarem Tap-Test kann eine mehrtägige Drainage zusätzliche prognostische Information liefern.', 'When the tap test is equivocal, several days of drainage may add prognostic information.', 'در تست نامشخص، درناژ چندروزه می‌تواند اطلاعات پیش‌آگهی بیشتری بدهد.') },
      { icon: '🔧', title: L('Ventrikuloperitonealer Shunt', 'Ventriculoperitoneal shunt', 'شانت بطنی-صفاقی'), text: L('Standardtherapie bei geeigneter Konstellation; Gang bessert sich meist verlässlicher als Kognition oder Blase.', 'Standard treatment in suitable patients; gait tends to improve more reliably than cognition or bladder function.', 'درمان استاندارد در بیمار مناسب؛ راه‌رفتن معمولاً قابل‌اعتمادتر از شناخت یا مثانه بهبود می‌یابد.') },
      { icon: '⚠️', title: L('Komplikationen', 'Complications', 'عوارض'), text: L('Überdrainage, Subduralhämatom, Infektion, Obstruktion und Fehlfunktion müssen berücksichtigt werden.', 'Consider overdrainage, subdural haematoma, infection, obstruction and malfunction.', 'بیش‌درناژی، هماتوم ساب‌دورال، عفونت، انسداد و اختلال عملکرد باید مدنظر باشند.') },
    ],
    cave: L('Ein negativer Tap-Test schließt einen späteren Shunt-Nutzen nicht sicher aus.', 'A negative tap test does not reliably exclude later benefit from shunting.', 'تست تخلیه منفی، سود احتمالی بعدی از شانت را قطعی رد نمی‌کند.'),
  },
  takehome: {
    title: L('TAKE HOME MESSAGE', 'TAKE HOME MESSAGE', 'TAKE HOME MESSAGE'),
    lead: L('Die prüfungs- und befundungsrelevanten Kernaussagen.', 'The core points for exams and reporting.', 'نکات اصلی برای آزمون و گزارش.'),
    items: [
      { title: L('Trias', 'Triad', 'تریاد'), text: L('Gangstörung ist meist früh und besonders shunt-responsiv; Kognition und Blase folgen häufig später.', 'Gait disturbance is often early and particularly shunt-responsive; cognition and bladder symptoms often follow.', 'اختلال راه‌رفتن اغلب زودرس و پاسخ‌گو به شانت است؛ شناخت و مثانه معمولاً بعدتر.') },
      { title: L('Nicht nur Evans', 'Not Evans alone', 'فقط ایوانز نیست'), text: L('Evans-Index > 0,30 zeigt Ventrikulomegalie, beweist aber keinen NPH.', 'An Evans index >0.30 shows ventriculomegaly but does not prove NPH.', 'شاخص ایوانز بیش از ۰٫۳۰ بزرگی بطن را نشان می‌دهد اما NPH را ثابت نمی‌کند.') },
      { title: L('DESH suchen', 'Look for DESH', 'DESH را جست‌وجو کنید'), text: L('Weite Sylvische Fissuren plus enge Hochkonvexität und kleiner Callosal angle stützen die Diagnose.', 'Enlarged Sylvian fissures plus tight high convexity and a small callosal angle support the diagnosis.', 'فیشورهای سیلوین گشاد، تحدب فوقانی تنگ و زاویه کالوزال کوچک مؤیدند.') },
      { title: L('Klinik entscheidet mit', 'Clinical context matters', 'بالین مهم است'), text: L('Bildgebung, objektive Gangprüfung und Liquorablass-Test werden gemeinsam beurteilt.', 'Imaging, objective gait assessment and CSF drainage testing are interpreted together.', 'تصویربرداری، ارزیابی عینی راه‌رفتن و تست تخلیه CSF با هم تفسیر می‌شوند.') },
    ],
  },
}

const NQ = [
  {
    "id": "01",
    "question": {
      "de": "Welches Symptom tritt beim NPH typischerweise zuerst auf?",
      "en": "Which symptom typically appears first in NPH?",
      "fa": "کدام علامت در NPH معمولاً زودتر ظاهر می‌شود؟"
    },
    "options": [
      {
        "de": "Gangstörung",
        "en": "Gait disturbance",
        "fa": "اختلال راه‌رفتن"
      },
      {
        "de": "Harninkontinenz",
        "en": "Urinary incontinence",
        "fa": "بی‌اختیاری ادرار"
      },
      {
        "de": "Kortikale Aphasie",
        "en": "Cortical aphasia",
        "fa": "آفازی کورتیکال"
      },
      {
        "de": "Ruhetremor",
        "en": "Resting tremor",
        "fa": "ترمور استراحت"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Die Gangstörung ist meist das früheste und am besten shunt-responsive Symptom.",
      "en": "Gait disturbance is usually the earliest and most shunt-responsive symptom.",
      "fa": "اختلال راه‌رفتن معمولاً زودرس‌ترین و پاسخ‌گوترین علامت به شانت است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Blasenstörung gehört zur Trias, tritt aber typischerweise nicht als erstes Merkmal auf.",
        "en": "Bladder dysfunction belongs to the triad but is usually not its earliest feature.",
        "fa": "اختلال مثانه جزئی از تریاد است، ولی معمولاً زودرس‌ترین جزء نیست."
      },
      "C": {
        "de": "Eine fokale kortikale Aphasie verlangt eine andere oder zusätzliche Erklärung als das typische NPH-Profil.",
        "en": "Focal cortical aphasia requires an alternative or additional explanation beyond the typical NPH profile.",
        "fa": "آفازی کورتیکال کانونی به توضیحی دیگر یا همراه با الگوی معمول NPH نیاز دارد."
      },
      "D": {
        "de": "Ruhetremor ist kein typisches führendes Triasmerkmal; parkinsonische Differenziale mitprüfen.",
        "en": "Rest tremor is not a typical leading triad feature; assess parkinsonian alternatives.",
        "fa": "ترمور استراحت جزء غالب معمول تریاد نیست؛ افتراق‌های پارکینسونی بررسی شوند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "02",
    "question": {
      "de": "Welche Kombination entspricht der Hakim-Trias?",
      "en": "Which combination is the Hakim triad?",
      "fa": "کدام ترکیب تریاد حکیم است؟"
    },
    "options": [
      {
        "de": "Gangstörung, kognitive Störung, Blasenstörung",
        "en": "Gait disturbance, cognitive impairment, bladder dysfunction",
        "fa": "اختلال راه‌رفتن، شناخت و مثانه"
      },
      {
        "de": "Ataxie, Ophthalmoplegie, Verwirrtheit",
        "en": "Ataxia, ophthalmoplegia, confusion",
        "fa": "آتاکسی، افتالموپلژی، گیجی"
      },
      {
        "de": "Tremor, Rigor, Bradykinese",
        "en": "Tremor, rigidity, bradykinesia",
        "fa": "ترمور، ریجیدیتی، برادی‌کینزی"
      },
      {
        "de": "Kopfschmerz, Erbrechen, Papillenödem",
        "en": "Headache, vomiting, papilloedema",
        "fa": "سردرد، استفراغ، پاپی‌ادم"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Die klassische Trias umfasst Gang, Kognition und Blasenfunktion.",
      "en": "The classic triad comprises gait, cognition and bladder function.",
      "fa": "تریاد کلاسیک شامل راه‌رفتن، شناخت و مثانه است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Diese Kombination gehört zur Wernicke-Differenzialdiagnose, nicht zur Hakim-Trias.",
        "en": "This combination belongs to the Wernicke differential, not the Hakim triad.",
        "fa": "این ترکیب مربوط به افتراق ورنیکه است، نه تریاد حکیم."
      },
      "C": {
        "de": "Dies beschreibt ein parkinsonisches motorisches Syndrom.",
        "en": "This describes a parkinsonian motor syndrome.",
        "fa": "این ترکیب سندرم حرکتی پارکینسونی را توصیف می‌کند."
      },
      "D": {
        "de": "Dies ist eine Konstellation intrakranieller Druckzeichen, nicht die typische Hakim-Trias.",
        "en": "This is a constellation of raised-pressure features, not the typical Hakim triad.",
        "fa": "این مجموعه نشانه‌های افزایش فشار داخل جمجمه است، نه تریاد معمول حکیم."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "03",
    "question": {
      "de": "Was misst der Evans-Index?",
      "en": "What does the Evans index measure?",
      "fa": "شاخص ایوانز چه چیزی را می‌سنجد؟"
    },
    "options": [
      {
        "de": "Vorderhornbreite relativ zum inneren Schädeldurchmesser",
        "en": "Frontal horn width relative to inner skull diameter",
        "fa": "عرض حداکثری شاخ‌های فرونتال نسبت به قطر داخلی جمجمه"
      },
      {
        "de": "Breite des III. Ventrikels relativ zum Corpus callosum",
        "en": "Third-ventricle width relative to the corpus callosum",
        "fa": "عرض بطن سوم نسبت به جسم پینه‌ای"
      },
      {
        "de": "Aquäduktfläche relativ zur Ponsfläche",
        "en": "Aqueductal area relative to pontine area",
        "fa": "سطح آکوئداکت نسبت به پونز"
      },
      {
        "de": "Temporalhornbreite relativ zur Hippocampushöhe",
        "en": "Temporal horn width relative to hippocampal height",
        "fa": "عرض شاخ تمپورال نسبت به ارتفاع هیپوکامپ"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Gemessen wird die maximale Vorderhornbreite geteilt durch den maximalen inneren Schädeldurchmesser derselben Ebene.",
      "en": "It is maximal frontal horn width divided by maximal inner skull diameter on the same plane.",
      "fa": "عرض حداکثری شاخ‌های فرونتال بر حداکثر قطر داخلی جمجمه در همان صفحه تقسیم می‌شود."
    },
    "wrongExplanations": {
      "B": {
        "de": "Der III.Ventrikel und das Corpus callosum sind nicht Zähler und Nenner des Evans-Index.",
        "en": "Third-ventricle and callosal dimensions are not the numerator and denominator of the Evans index.",
        "fa": "ابعاد بطن سوم و جسم پینه‌ای صورت و مخرج شاخص ایوانز نیستند."
      },
      "C": {
        "de": "Aquädukt- und Ponsflächen gehören nicht zu diesem Breitenverhältnis.",
        "en": "Aqueductal and pontine areas do not form this width ratio.",
        "fa": "سطح آکوئداکت و پونز این نسبت عرض را تشکیل نمی‌دهند."
      },
      "D": {
        "de": "Temporalhorn und Hippocampus sind morphologisch wichtig, bilden aber nicht den Evans-Index.",
        "en": "Temporal horns and hippocampus matter morphologically but do not define the Evans index.",
        "fa": "شاخ تمپورال و هیپوکامپ از نظر مورفولوژی مهم‌اند، ولی شاخص ایوانز را تعریف نمی‌کنند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "04",
    "question": {
      "de": "Ein älterer Patient wird wegen Gangstörung untersucht; der Evans-Index beträgt 0,34. Welche zusätzliche Information ist am wichtigsten, bevor der Befund als iNPH eingeordnet wird?",
      "en": "An older patient is investigated for gait impairment; the Evans index is 0.34. Which additional information matters most before interpreting the findings as iNPH?",
      "fa": "سالمندی به‌دلیل اختلال راه‌رفتن بررسی می‌شود؛ شاخص ایوانز۰٫۳۴ است. پیش از تفسیر یافته‌ها به‌عنوان iNPH، کدام اطلاعات تکمیلی مهم‌تر است؟"
    },
    "options": [
      {
        "de": "Verteilung der äußeren Liquorräume und klinischer Verlauf, einschließlich anderer Ursachen",
        "en": "External CSF-space distribution and clinical course, including other causes",
        "fa": "توزیع فضاهای خارجی مایع مغزی‌نخاعی و سیر بالینی، از جمله علل دیگر"
      },
      {
        "de": "Eine geringfügige Zunahme des Evans-Index gegenüber der Voruntersuchung",
        "en": "A slight Evans-index increase compared with prior imaging",
        "fa": "افزایش جزئی شاخص ایوانز نسبت به بررسی قبلی"
      },
      {
        "de": "Ein ausgeprägter Aquädukt-Flow-void auf einer T2-Sequenz",
        "en": "A prominent aqueductal flow void on a T2 sequence",
        "fa": "فقدان سیگنال واضح جریان آکوئداکت در سکانس T2"
      },
      {
        "de": "Periventrikuläre FLAIR-Hyperintensitäten ohne weitere Musterbewertung",
        "en": "Periventricular FLAIR hyperintensity without further pattern assessment",
        "fa": "هایپرسیگنال FLAIR پیرابطنی بدون ارزیابی بیشتر الگو"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ein EI von0,34 beschreibt Ventrikulomegalie, trennt aber iNPH nicht sicher von Atrophie oder anderen Ursachen. DESH-Verteilung, weitere Morphologie und Klinik gemeinsam beurteilen.",
      "en": "An EI of0.34 describes ventriculomegaly but does not reliably distinguish iNPH from atrophy or other causes. Assess DESH distribution, other morphology and clinical findings together.",
      "fa": "شاخص۰٫۳۴ بزرگی بطن‌ها را توصیف می‌کند، اما iNPH را با اطمینان از آتروفی یا علل دیگر جدا نمی‌کند. توزیع DESH، سایر ویژگی‌ها و بالین با هم ارزیابی شوند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Eine geringe Größenänderung ist kein ätiologischer Nachweis; Standardisierung und Gesamtmuster sind nötig.",
        "en": "A small size change is not etiological proof; standardisation and the overall pattern are required.",
        "fa": "تغییر کوچک اندازه اثبات علت نیست؛ استانداردسازی و کل الگو لازم‌اند."
      },
      "C": {
        "de": "Ein qualitatives Flusszeichen ist unspezifisch und kann die klinisch-morphologische Einordnung nicht ersetzen.",
        "en": "A qualitative flow sign is nonspecific and does not replace clinical-morphological interpretation.",
        "fa": "علامت کیفی جریان غیراختصاصی است و جای تفسیر بالینی‌ـ‌مورفولوژیک را نمی‌گیرد."
      },
      "D": {
        "de": "Periventrikuläres Signal kann unter anderem Liquorübertritt oder vaskuläre Veränderungen abbilden; es ist kein alleiniger iNPH-Nachweis.",
        "en": "Periventricular signal may reflect CSF seepage or vascular changes among other causes; it is not stand-alone proof of iNPH.",
        "fa": "سیگنال پیرابطنی از جمله ممکن است عبور مایع یا تغییرات عروقی را نشان دهد؛ اثبات مستقل iNPH نیست."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "05",
    "question": {
      "de": "Bei Ventrikulomegalie wird nach DESH gesucht. Welche Verteilung der äußeren Liquorräume unterstützt dieses Muster?",
      "en": "With ventriculomegaly, DESH is being assessed. Which external CSF-space distribution supports this pattern?",
      "fa": "در بزرگی بطن‌ها، DESH بررسی می‌شود. کدام توزیع فضاهای خارجی مایع مغزی‌نخاعی از این الگو حمایت می‌کند؟"
    },
    "options": [
      {
        "de": "Weite Sylvische Fissuren und enge Hochkonvexitäts-/Mittelliniensulci",
        "en": "Enlarged Sylvian fissures with tight high-convexity/midline sulci",
        "fa": "شیارهای سیلوین گشاد با شیارهای تنگ تحدب فوقانی/خط میانی"
      },
      {
        "de": "Weite Sylvische Fissuren und proportional weite Hochkonvexitätssulci",
        "en": "Enlarged Sylvian fissures with proportionately enlarged high-convexity sulci",
        "fa": "شیارهای سیلوین گشاد با شیارهای تحدب فوقانی به‌طور متناسب گشاد"
      },
      {
        "de": "Enge Sylvische Fissuren und deutlich erweiterte Hochkonvexitätssulci",
        "en": "Narrow Sylvian fissures with markedly enlarged high-convexity sulci",
        "fa": "شیارهای سیلوین تنگ با شیارهای تحدب فوقانی به‌وضوح گشاد"
      },
      {
        "de": "Proportional weite innere und äußere Liquorräume ohne regionale Enge",
        "en": "Proportionately enlarged internal and external CSF spaces without regional tightness",
        "fa": "فضاهای داخلی و خارجی مایع مغزی‌نخاعی متناسب گشاد و بدون تنگی ناحیه‌ای"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "DESH verbindet Ventrikulomegalie mit weiten Sylvischen Fissuren und engen hochkonvexitären/mittelliniennahen Räumen. Die Disproportion ist entscheidend; sie wird klinisch eingeordnet.",
      "en": "DESH combines ventriculomegaly with enlarged Sylvian fissures and tight high-convexity/midline spaces. Disproportion is the key and requires clinical interpretation.",
      "fa": "DESH بزرگی بطن‌ها را با شیارهای سیلوین گشاد و فضاهای تنگ تحدب فوقانی/نزدیک خط میانی ترکیب می‌کند. عدم تناسب نکتهٔ اصلی است و به تفسیر بالینی نیاز دارد."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die Hochkonvexität ist hier ebenfalls weit; die für DESH gesuchte regionale Enge fehlt.",
        "en": "High-convexity sulci are also enlarged here; the regional tightness sought in DESH is absent.",
        "fa": "شیارهای تحدب فوقانی نیز گشادند؛ تنگی ناحیه‌ای مورد انتظار DESH وجود ندارد."
      },
      "C": {
        "de": "Das ist die umgekehrte Verteilung der äußeren Räume.",
        "en": "This reverses the expected external-space distribution.",
        "fa": "این توزیع برعکس الگوی مورد انتظار فضاهای خارجی است."
      },
      "D": {
        "de": "Proportionale Erweiterung passt eher zu einem Atrophiemuster als zur DESH-Disproportion.",
        "en": "Proportionate enlargement fits an atrophic pattern better than DESH disproportion.",
        "fa": "اتساع متناسب بیشتر با الگوی آتروفی سازگار است تا عدم تناسب DESH."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "06",
    "question": {
      "de": "Zwei Messungen des Balkenwinkels unterscheiden sich deutlich. Welche Rekonstruktion schafft die standardisierte Vergleichsbasis?",
      "en": "Two callosal-angle measurements differ substantially. Which reformat provides a standardised basis for comparison?",
      "fa": "دو اندازه‌گیری زاویهٔ کالوزال تفاوت زیادی دارند. کدام بازسازی مبنای استاندارد مقایسه را فراهم می‌کند؟"
    },
    "options": [
      {
        "de": "Koronar senkrecht zur AC-PC-Linie auf Höhe der Commissura posterior",
        "en": "Coronal perpendicular to the AC-PC line at the posterior commissure",
        "fa": "کرونال عمود بر خط AC-PC در سطح کمیسور خلفی"
      },
      {
        "de": "Koronar senkrecht zur AC-PC-Linie auf Höhe der Commissura anterior",
        "en": "Coronal perpendicular to the AC-PC line at the anterior commissure",
        "fa": "کرونال عمود بر خط AC-PC در سطح کمیسور قدامی"
      },
      {
        "de": "Koronar zur Lagerungsebene ohne Ausrichtung an der AC-PC-Linie",
        "en": "Coronal to patient positioning without AC-PC alignment",
        "fa": "کرونال بر اساس وضعیت بیمار بدون هم‌راستایی با AC-PC"
      },
      {
        "de": "Koronar auf Höhe der Hinterhörner statt der Commissura posterior",
        "en": "Coronal at the occipital horns rather than the posterior commissure",
        "fa": "کرونال در سطح شاخ‌های پس‌سری به‌جای کمیسور خلفی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Balkenwinkel am Niveau der Commissura posterior in einer zur AC-PC-Linie senkrechten koronalen Ebene messen. Abweichende Höhe oder Neigung kann den Wert verändern.",
      "en": "Measure at the posterior commissure on a coronal plane perpendicular to the AC-PC line. Different levels or angulation can change the value.",
      "fa": "زاویه در سطح کمیسور خلفی و در صفحهٔ کرونال عمود بر خط AC-PC اندازه‌گیری شود. تغییر سطح یا زاویهٔ برش می‌تواند مقدار را تغییر دهد."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die vordere Commissur ist nicht das standardisierte PC-Messniveau.",
        "en": "The anterior commissure is not the standard posterior-commissure measurement level.",
        "fa": "کمیسور قدامی سطح استاندارد اندازه‌گیری در PC نیست."
      },
      "C": {
        "de": "Lagerungsabhängige Neigung erschwert die Vergleichbarkeit; AC-PC-standardisiert rekonstruieren.",
        "en": "Position-dependent angulation limits comparability; use AC-PC-standardised reformats.",
        "fa": "زاویهٔ وابسته به وضعیت بیمار مقایسه را محدود می‌کند؛ بازسازی استاندارد AC-PC به‌کار رود."
      },
      "D": {
        "de": "Ein weiter posteriores Messniveau ist nicht mit der standardisierten PC-Ebene austauschbar.",
        "en": "A more posterior level is not interchangeable with the standard PC plane.",
        "fa": "سطح خلفی‌تر با صفحهٔ استاندارد PC قابل تعویض نیست."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "07",
    "question": {
      "de": "Welcher Callosal angle unterstützt bei passender Klinik einen NPH?",
      "en": "Which callosal angle supports NPH in the appropriate setting?",
      "fa": "کدام زاویه کالوزال در زمینه مناسب به نفع NPH است؟"
    },
    "options": [
      {
        "de": "Etwa 70°",
        "en": "About 70°",
        "fa": "حدود ۷۰ درجه"
      },
      {
        "de": "Etwa 105°",
        "en": "About 105°",
        "fa": "حدود ۱۰۵ درجه"
      },
      {
        "de": "Etwa 125°",
        "en": "About 125°",
        "fa": "حدود ۱۲۵ درجه"
      },
      {
        "de": "Etwa 150°",
        "en": "About 150°",
        "fa": "حدود ۱۵۰ درجه"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ein Winkel unter etwa 90° unterstützt NPH; bei Ex-vacuo-Erweiterung ist er meist weiter.",
      "en": "An angle below about 90° supports NPH; it is usually wider in ex-vacuo enlargement.",
      "fa": "زاویه کمتر از حدود ۹۰ درجه مؤید NPH است؛ در ex vacuo معمولاً بازتر است."
    },
    "wrongExplanations": {
      "B": {
        "de": "105° liegt nicht im hier gesuchten kleinen Winkelbereich; Ebene und Gesamtmuster bleiben wichtig.",
        "en": "105° is outside the small-angle range sought here; plane and overall pattern still matter.",
        "fa": "۱۰۵درجه خارج از محدودهٔ زاویهٔ کوچک مورد پرسش است؛ صفحه و کل الگو همچنان مهم‌اند."
      },
      "C": {
        "de": "125° ist ein weiter Winkel und stützt für sich nicht das typische enge iNPH-Muster.",
        "en": "125° is a wide angle and does not itself support the typical narrow iNPH pattern.",
        "fa": "۱۲۵درجه زاویه‌ای باز است و به‌تنهایی از الگوی تنگ معمول iNPH حمایت نمی‌کند."
      },
      "D": {
        "de": "150° ist deutlich weit; ein Einzelwinkel ersetzt dennoch keine klinische Einordnung.",
        "en": "150° is markedly wide; nevertheless, a single angle does not replace clinical interpretation.",
        "fa": "۱۵۰درجه به‌وضوح باز است؛ بااین‌حال زاویهٔ منفرد جای تفسیر بالینی را نمی‌گیرد."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "08",
    "question": {
      "de": "Welche Befundkombination spricht eher für Atrophie als für NPH?",
      "en": "Which combination favours atrophy over NPH?",
      "fa": "کدام ترکیب بیشتر به نفع آتروفی است تا NPH؟"
    },
    "options": [
      {
        "de": "Proportional weite Ventrikel und Sulci mit weitem Callosal angle",
        "en": "Proportionally enlarged ventricles and sulci with a wide callosal angle",
        "fa": "اتساع متناسب بطن‌ها و شیارها با زاویه کالوزال باز"
      },
      {
        "de": "Enge Hochkonvexität bei weiten Sylvischen Fissuren",
        "en": "Tight high convexity with enlarged Sylvian fissures",
        "fa": "تحدب فوقانی تنگ با فیشورهای سیلوین گشاد"
      },
      {
        "de": "Abgerundete Frontalhörner mit DESH",
        "en": "Rounded frontal horns with DESH",
        "fa": "شاخ‌های فرونتال گرد با DESH"
      },
      {
        "de": "Kleiner Callosal angle und magnetischer Gang",
        "en": "Small callosal angle and magnetic gait",
        "fa": "زاویه کالوزال کوچک و راه‌رفتن مغناطیسی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Bei Atrophie erweitern sich innere und äußere Liquorräume typischerweise proportional.",
      "en": "In atrophy, internal and external CSF spaces typically enlarge proportionally.",
      "fa": "در آتروفی فضاهای داخلی و خارجی CSF معمولاً متناسب گشاد می‌شوند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Diese Disproportion ist eher DESH-verdächtig als ein reines proportionales Atrophiemuster.",
        "en": "This disproportion is more suspicious for DESH than pure proportional atrophy.",
        "fa": "این عدم تناسب بیشتر مشکوک به DESH است تا آتروفی متناسب صرف."
      },
      "C": {
        "de": "DESH beschreibt gerade keine proportionale Erweiterung aller Liquorräume.",
        "en": "DESH specifically does not describe proportionate enlargement of all CSF spaces.",
        "fa": "DESH دقیقاً اتساع متناسب همهٔ فضاهای مایع مغزی‌نخاعی را توصیف نمی‌کند."
      },
      "D": {
        "de": "Kleiner Winkel und passender Gang stützen iNPH im Kontext stärker als eine reine Atrophieerklärung.",
        "en": "A small angle and compatible gait support iNPH in context more than pure atrophy.",
        "fa": "زاویهٔ کوچک و راه‌رفتن سازگار در زمینهٔ مناسب بیشتر از آتروفی صرف از iNPH حمایت می‌کنند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "09",
    "question": {
      "de": "Bei iNPH-Verdacht fällt auf T2 ein ausgeprägter Aquädukt-Flow-void auf. Welche Bedeutung sollte der Befundbericht diesem Zeichen geben?",
      "en": "T2 shows a prominent aqueductal flow void in suspected iNPH. How should the report interpret this sign?",
      "fa": "در شک به iNPH، افت سیگنال ناشی از جریان (flow void) واضح آکوئداکت در T2 دیده می‌شود. گزارش باید چه معنایی به این علامت بدهد؟"
    },
    "options": [
      {
        "de": "Flussphänomen im Gesamtmuster; daraus allein keine individuelle Shunt-Prognose ableiten",
        "en": "A flow phenomenon within the overall pattern; do not infer individual shunt prognosis from it alone",
        "fa": "پدیدهٔ جریان در کل الگو؛ پیش‌آگهی فردی شانت صرفاً از آن نتیجه‌گیری نشود"
      },
      {
        "de": "Als dominantes Kriterium für die Shunt-Auswahl gegenüber Klinik und Morphologie gewichten",
        "en": "Weight it as the dominant shunt-selection criterion over symptoms and morphology",
        "fa": "آن را معیار غالب انتخاب شانت نسبت به بالین و مورفولوژی بدانید"
      },
      {
        "de": "Als Nachweis einer festen Abflussblockade im Aquädukt einordnen",
        "en": "Interpret it as evidence of fixed aqueductal outflow obstruction",
        "fa": "آن را شاهد انسداد ثابت مسیر خروج آکوئداکت بدانید"
      },
      {
        "de": "Den Flow-void bevorzugt als Surrogat einer ex-vacuo-Erweiterung bei Atrophie verwenden",
        "en": "Preferentially use the flow void as a surrogate for ex-vacuo enlargement in atrophy",
        "fa": "افت سیگنال ناشی از جریان (flow void) را ترجیحاً نشانگر اتساع اکس‌واکو در آتروفی بدانید"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Das qualitative T2-Flusszeichen ergänzt die Untersuchung, ist aber kein alleiniger Diagnose- oder Shunt-Response-Test. Klinische Konstellation und übrige Morphologie bleiben maßgeblich.",
      "en": "The qualitative T2 flow sign supplements the examination but is not a stand-alone diagnostic or shunt-response test. Clinical findings and other morphology remain essential.",
      "fa": "علامت کیفی جریان T2 مکمل بررسی است، اما آزمون مستقل تشخیص یا پاسخ به شانت نیست. بالین و سایر ویژگی‌های مورفولوژیک همچنان ضروری‌اند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein isoliertes Flusszeichen darf die mehrdimensionale Patientenauswahl nicht ersetzen.",
        "en": "An isolated flow sign must not replace multidimensional patient selection.",
        "fa": "علامت منفرد جریان نباید جای انتخاب چندبعدی بیمار را بگیرد."
      },
      "C": {
        "de": "Signalverlust durch Fluss beweist keine fixe Blockade; Durchgängigkeit und mögliche Obstruktion gesondert prüfen.",
        "en": "Flow-related signal loss does not establish fixed obstruction; assess patency and possible obstruction separately.",
        "fa": "فقدان سیگنال ناشی از جریان انسداد ثابت را اثبات نمی‌کند؛ بازبودن مسیر و انسداد احتمالی جداگانه بررسی شوند."
      },
      "D": {
        "de": "Das Flussphänomen kann bei iNPH auftreten und ist kein ausschließliches Atrophiezeichen.",
        "en": "The flow phenomenon can occur in iNPH and is not exclusive to atrophy.",
        "fa": "این پدیدهٔ جریان می‌تواند در iNPH رخ دهد و مختص آتروفی نیست."
      }
    },
    "source": "https://doi.org/10.1097/00006123-199701000-00015"
  },
  {
    "id": "10",
    "question": {
      "de": "Vor einem Tap-Test soll die Gangantwort objektiv dokumentiert werden. Welches Vorgehen liefert den aussagekräftigsten Vergleich?",
      "en": "Gait response needs objective documentation for a tap test. Which approach provides the most informative comparison?",
      "fa": "برای آزمون تخلیه باید پاسخ راه‌رفتن عینی ثبت شود. کدام روش مقایسهٔ گویاتری فراهم می‌کند؟"
    },
    "options": [
      {
        "de": "Standardisierten Gangtest vor und nach Liquorentnahme unter vergleichbaren Bedingungen durchführen",
        "en": "Perform a standardised gait test before and after CSF removal under comparable conditions",
        "fa": "آزمون استاندارد راه‌رفتن پیش و پس از تخلیهٔ مایع در شرایط قابل‌مقایسه انجام شود"
      },
      {
        "de": "Nur die Gangzeit nach der Punktion dokumentieren und mit einem allgemeinen Normwert vergleichen",
        "en": "Document only post-puncture gait time and compare it with a general reference value",
        "fa": "فقط زمان راه‌رفتن پس از پونکسیون ثبت و با مقدار مرجع عمومی مقایسه شود"
      },
      {
        "de": "Vorher die Gehstrecke, nachher nur die subjektive Gedächtnisbesserung dokumentieren",
        "en": "Document walking before and only subjective memory improvement afterwards",
        "fa": "پیش از آزمون راه‌رفتن و پس از آن فقط بهبود ذهنی حافظه ثبت شود"
      },
      {
        "de": "Vorher mit Gehhilfe, nachher ohne Gehhilfe testen und die Rohzeiten direkt vergleichen",
        "en": "Test with a walking aid before and without it afterwards and directly compare raw times",
        "fa": "پیش از آزمون با وسیلهٔ کمکی و پس از آن بدون آن آزمایش و زمان‌های خام مستقیم مقایسه شوند"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Objektive, vergleichbare Vorher-/Nachher-Messungen erfassen die individuelle Änderung. Die Leitlinie empfiehlt quantitative Gangbewertung und zeitlich passende Verlaufsevaluation; auch Wenden und Schrittmuster beachten.",
      "en": "Objective comparable pre/post measures capture individual change. Guidance recommends quantitative gait assessment and appropriately timed follow-up; also assess turning and step pattern.",
      "fa": "اندازه‌گیری عینی و قابل‌مقایسهٔ پیش/پس، تغییر فردی را ثبت می‌کند. راهنما ارزیابی کمّی راه‌رفتن و پیگیری در زمان مناسب را توصیه می‌کند؛ چرخش و الگوی گام نیز بررسی شوند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ohne individuellen Ausgangswert lässt sich die Änderung nach Entnahme nicht verlässlich bestimmen.",
        "en": "Without an individual baseline, change after drainage cannot be reliably determined.",
        "fa": "بدون مقدار پایهٔ فردی، تغییر پس از تخلیه با اطمینان تعیین نمی‌شود."
      },
      "C": {
        "de": "Verschiedene Zielgrößen und ausschließlich subjektive Nachbewertung ersetzen keinen objektiven Gangvergleich.",
        "en": "Different outcomes and subjective follow-up alone do not replace objective gait comparison.",
        "fa": "شاخص‌های متفاوت و پیگیری صرفاً ذهنی جای مقایسهٔ عینی راه‌رفتن را نمی‌گیرند."
      },
      "D": {
        "de": "Ein Wechsel der Hilfsmittel verändert die Testbedingungen und kann einen vermeintlichen Behandlungseffekt erzeugen.",
        "en": "Changing walking aids changes test conditions and may create an apparent treatment effect.",
        "fa": "تغییر وسیلهٔ کمکی شرایط آزمون را عوض می‌کند و ممکن است اثر درمانی ظاهری ایجاد کند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "11",
    "question": {
      "de": "Bei passender Gangstörung und DESH zeigt ein einzelner Tap-Test keine klare Besserung. Welche Schlussfolgerung ist am besten begründet?",
      "en": "With compatible gait impairment and DESH, one tap test shows no clear improvement. Which conclusion is best supported?",
      "fa": "با اختلال راه‌رفتن سازگار و DESH، یک آزمون تخلیه بهبود روشنی نشان نمی‌دهد. کدام نتیجه توجیه بیشتری دارد؟"
    },
    "options": [
      {
        "de": "Timing, Messqualität, Komorbidität und Gesamtbefund erneut einordnen; ein negativer Test schließt Shunt-Nutzen nicht sicher aus",
        "en": "Reassess timing, measurement quality, comorbidity and overall findings; a negative test does not reliably exclude shunt benefit",
        "fa": "زمان‌بندی، کیفیت اندازه‌گیری، بیماری همراه و کل یافته‌ها بازبینی شوند؛ آزمون منفی سود شانت را با اطمینان رد نمی‌کند"
      },
      {
        "de": "Die weitere iNPH-Abklärung aufgrund dieses Einzeltests beenden",
        "en": "End further iNPH evaluation on the basis of this single test",
        "fa": "بررسی بیشتر iNPH بر اساس همین آزمون منفرد پایان یابد"
      },
      {
        "de": "Die Bildkonstellation ohne weitere klinische Bewertung direkt in eine Shunt-Anordnung übersetzen",
        "en": "Translate the imaging pattern directly into a shunt instruction without further clinical evaluation",
        "fa": "الگوی تصویر بدون ارزیابی بالینی بیشتر مستقیماً به دستور شانت تبدیل شود"
      },
      {
        "de": "Die weitere Auswahl ausschließlich von einer erhöhten aquäduktalen Flussmessung abhängig machen",
        "en": "Base further selection exclusively on an elevated aqueductal flow measurement",
        "fa": "انتخاب بعدی صرفاً به اندازه‌گیری بالای جریان آکوئداکت وابسته شود"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ein einzelner Tap-Test kann falsch negativ sein. Die Leitlinie betont Messmethode, zeitlichen Verlauf und individuelle Einordnung. Wiederholung oder Drainagetests können im Team erwogen werden; kontinuierliche Drainage ist nicht allgemein als überlegen belegt.",
      "en": "A single tap test can be falsely negative. Guidance emphasises measurement method, timing and individual assessment. Repeat or drainage testing may be considered by the team; continuous drainage is not generally established as superior.",
      "fa": "آزمون تخلیهٔ منفرد می‌تواند منفی کاذب باشد. راهنما بر روش اندازه‌گیری، زمان و تفسیر فردی تأکید دارد. تکرار یا آزمون درناژ می‌تواند در تیم بررسی شود؛ برتری همگانی درناژ مداوم اثبات نشده است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die begrenzte Sensitivität lässt einen solchen sicheren Ausschluss nicht zu.",
        "en": "Limited sensitivity does not permit this definitive exclusion.",
        "fa": "حساسیت محدود چنین رد قطعی‌ای را اجازه نمی‌دهد."
      },
      "C": {
        "de": "DESH stützt die Konstellation, ersetzt aber keine Nutzen-Risiko- und klinische Patientenauswahl.",
        "en": "DESH supports the pattern but does not replace benefit-risk and clinical patient selection.",
        "fa": "DESH از الگو حمایت می‌کند، ولی جای سنجش سود و خطر و انتخاب بالینی بیمار را نمی‌گیرد."
      },
      "D": {
        "de": "Aquäduktale Flusswerte sind kein verlässlicher alleiniger Prädiktor der individuellen Shunt-Wirkung.",
        "en": "Aqueductal flow values are not reliable stand-alone predictors of individual shunt response.",
        "fa": "مقادیر جریان آکوئداکت پیش‌بینی‌کنندهٔ مستقل قابل‌اعتماد پاسخ فردی شانت نیستند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "12",
    "question": {
      "de": "Ein 76-Jähriger mit kleinschrittigem Gang hat weite Ventrikel, weite Sylvische Fissuren, enge Hochkonvexitätssulci und einen kleinen Balkenwinkel. Welche Befundzusammenfassung passt am besten?",
      "en": "A 76-year-old with a short-stepped gait has enlarged ventricles, widened Sylvian fissures, tight high-convexity sulci, and a small callosal angle. Which report conclusion fits best?",
      "fa": "مردی ۷۶ ساله با گام‌های کوتاه، بطن‌ها و شیارهای سیلوین گشاد، شیارهای تنگ تحدب فوقانی و زاویهٔ کالوزال کوچک دارد. کدام جمع‌بندی گزارش مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Generalisierte Atrophie mit proportionaler Erweiterung aller Liquorräume",
        "en": "Generalised atrophy with proportionate enlargement of all CSF spaces",
        "fa": "آتروفی منتشر با گشادشدگی متناسب همهٔ فضاهای مایع مغزی‌نخاعی"
      },
      {
        "de": "Obstruktiver Hydrozephalus mit nachgewiesenem Aquäduktverschluss",
        "en": "Obstructive hydrocephalus with established aqueductal obstruction",
        "fa": "هیدروسفالی انسدادی با انسداد اثبات‌شدهٔ مجرای سیلویوس (آکوئداکت)"
      },
      {
        "de": "Disproportionale Ventrikulomegalie mit DESH; bei passender Klinik iNPH-Konstellation",
        "en": "Disproportionate ventriculomegaly with DESH; an iNPH pattern in the appropriate clinical context",
        "fa": "گشادشدگی نامتناسب بطن‌ها همراه با DESH؛ الگوی iNPH در زمینهٔ بالینی سازگار"
      },
      {
        "de": "Überwiegend temporomediale Atrophie als Erklärung der Ventrikelerweiterung",
        "en": "Predominantly medial temporal atrophy explaining ventricular enlargement",
        "fa": "آتروفی عمدتاً تمپورال داخلی به‌عنوان توضیح گشادشدگی بطن‌ها"
      }
    ],
    "correct": 2,
    "explanation": {
      "de": "Die Kombination aus Ventrikulomegalie, weiten Sylvischen Fissuren und engen Hochkonvexitätssulci entspricht DESH. Sie unterstützt mit passender Klinik iNPH, ersetzt aber keine klinische Abklärung oder individuelle Shunt-Auswahl.",
      "en": "Ventriculomegaly with widened Sylvian fissures and tight high-convexity sulci constitutes DESH. With compatible symptoms it supports iNPH, but does not replace clinical assessment or individual shunt selection.",
      "fa": "ترکیب گشادشدگی بطن‌ها و شیارهای سیلوین با تنگی شیارهای تحدب فوقانی، DESH است. همراه با علائم سازگار از iNPH حمایت می‌کند، ولی جای ارزیابی بالینی یا انتخاب فردی برای شانت را نمی‌گیرد."
    },
    "wrongExplanations": {
      "A": {
        "de": "Enge Hochkonvexitätssulci widersprechen einer proportionalen Erweiterung aller Liquorräume.",
        "en": "Tight high-convexity sulci contradict proportionate enlargement of all CSF spaces.",
        "fa": "تنگی شیارهای تحدب فوقانی با گشادشدگی متناسب همهٔ فضاهای مایع مغزی‌نخاعی ناسازگار است."
      },
      "B": {
        "de": "Ein Aquäduktverschluss ist hier nicht nachgewiesen; die beschriebene Verteilung entspricht DESH.",
        "en": "Aqueductal obstruction has not been demonstrated; the described distribution is DESH.",
        "fa": "انسداد مجرا در اینجا اثبات نشده است؛ توزیع توصیف‌شده با DESH سازگار است."
      },
      "D": {
        "de": "Temporomediale Atrophie erklärt weder enge Hochkonvexitätssulci noch das vollständige DESH-Muster.",
        "en": "Medial temporal atrophy does not explain tight high-convexity sulci or the full DESH pattern.",
        "fa": "آتروفی تمپورال داخلی تنگی شیارهای تحدب فوقانی یا الگوی کامل DESH را توضیح نمی‌دهد."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  }
]

export const NPH_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  NQ.map(seed => ({
    id: `normaldruckhydrozephalus-${lang}-${seed.id}`,
    tags: ['normaldruckhydrozephalus', 'hydrozephalus', 'gehirn'],
    fach: 'gehirn',
    question: seed.question[lang],
    options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: typeof text === 'string' ? text : text[lang] })),
    correct: String.fromCharCode(65 + seed.correct),
    explanation: seed.explanation[lang],
    ...(seed.source ? {source:seed.source} : {}),
    ...(seed.wrongExplanations ? { wrongExplanations: Object.fromEntries(Object.entries(seed.wrongExplanations).map(([id, text]) => [id, text[lang]])) } : {}),
  })),
]))

const NF = [
  {
    "id": "definition",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Was ist NPH?",
      "en": "What is NPH?",
      "fa": "NPH چیست؟"
    },
    "answer": {
      "de": "Kommunizierender Hydrozephalus mit klinisch-radiologischer Konstellation bei oft normaler Einzelmessung des Liquordrucks.",
      "en": "A communicating hydrocephalus with a clinicoradiological syndrome despite often normal single pressure measurement.",
      "fa": "هیدروسفالی ارتباطی با سندرم بالینی-تصویری، با وجود فشار اغلب طبیعی در اندازه‌گیری منفرد."
    },
    "explanation": {
      "de": "Die Liquordynamik ist trotzdem gestört.",
      "en": "CSF dynamics are nevertheless abnormal.",
      "fa": "دینامیک CSF همچنان مختل است."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "trias",
    "category": {
      "de": "Klinik",
      "en": "Clinical",
      "fa": "بالینی"
    },
    "front": {
      "de": "Hakim-Trias?",
      "en": "Hakim triad?",
      "fa": "تریاد حکیم؟"
    },
    "answer": {
      "de": "Gangstörung, kognitive Störung, Blasenstörung.",
      "en": "Gait disturbance, cognitive impairment and bladder dysfunction.",
      "fa": "اختلال راه‌رفتن، شناخت و مثانه."
    },
    "explanation": {
      "de": "Die Trias muss nicht vollständig sein.",
      "en": "The triad need not be complete.",
      "fa": "وجود کامل تریاد الزامی نیست."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "gang",
    "category": {
      "de": "Klinik",
      "en": "Clinical",
      "fa": "بالینی"
    },
    "front": {
      "de": "Typischer NPH-Gang?",
      "en": "Typical NPH gait?",
      "fa": "راه‌رفتن تیپیک NPH؟"
    },
    "answer": {
      "de": "Breitbasig, kleinschrittig, magnetisch, mit Start- und Wendestörung.",
      "en": "Broad-based, short-stepped and magnetic with initiation and turning difficulty.",
      "fa": "قاعده پهن، قدم کوتاه و مغناطیسی با دشواری شروع و چرخش."
    },
    "explanation": {
      "de": "Meist frühestes und shunt-responsivstes Symptom.",
      "en": "Usually the earliest and most shunt-responsive symptom.",
      "fa": "معمولاً زودرس‌ترین و پاسخ‌گوترین علامت به شانت."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "evans",
    "category": {
      "de": "Messung",
      "en": "Measurement",
      "fa": "اندازه‌گیری"
    },
    "front": {
      "de": "Evans-Index?",
      "en": "Evans index?",
      "fa": "شاخص ایوانز؟"
    },
    "answer": {
      "de": "Maximale Vorderhornbreite / maximaler innerer Schädeldurchmesser; > 0,30 = Ventrikulomegalie.",
      "en": "Maximal frontal horn width / maximal inner skull diameter; >0.30 = ventriculomegaly.",
      "fa": "عرض حداکثری شاخ‌های فرونتال / حداکثر قطر داخلی جمجمه در همان صفحه؛ بیش از۰٫۳۰ نشان‌دهندهٔ بزرگی بطن است، نه اثبات iNPH."
    },
    "explanation": {
      "de": "Unspezifisch und nicht allein diagnostisch.",
      "en": "Nonspecific and not diagnostic alone.",
      "fa": "اختصاصی و تشخیصی مستقل نیست."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "callosal",
    "category": {
      "de": "Messung",
      "en": "Measurement",
      "fa": "اندازه‌گیری"
    },
    "front": {
      "de": "Callosal angle bei NPH?",
      "en": "Callosal angle in NPH?",
      "fa": "زاویه کالوزال در NPH؟"
    },
    "answer": {
      "de": "Oft <90°; koronar senkrecht zur AC-PC-Linie auf Höhe der Commissura posterior messen.",
      "en": "Often <90°; measure on a coronal plane perpendicular to AC-PC at the posterior commissure.",
      "fa": "اغلب کمتر از۹۰درجه؛ در صفحهٔ کرونال عمود بر AC-PC در سطح کمیسور خلفی اندازه‌گیری شود."
    },
    "explanation": {
      "de": "Bei Atrophie meist weiter.",
      "en": "Usually wider in atrophy.",
      "fa": "در آتروفی معمولاً بازتر است."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "desh",
    "category": "DESH",
    "front": {
      "de": "DESH-Muster?",
      "en": "DESH pattern?",
      "fa": "الگوی DESH؟"
    },
    "answer": {
      "de": "Ventrikulomegalie mit weiten Sylvischen Fissuren und engen Hochkonvexitäts-/Mittelliniensulci.",
      "en": "Ventriculomegaly with enlarged Sylvian fissures and tight high-convexity/midline sulci.",
      "fa": "بزرگی بطن‌ها همراه شیارهای سیلوین گشاد و شیارهای تنگ تحدب فوقانی/خط میانی."
    },
    "explanation": {
      "de": "Disproportionale Verteilung der äußeren Liquorräume.",
      "en": "Disproportionate distribution of external CSF spaces.",
      "fa": "توزیع نامتناسب فضاهای خارجی CSF."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "atrophie",
    "category": {
      "de": "Differenzial",
      "en": "Differential",
      "fa": "افتراقی"
    },
    "front": {
      "de": "NPH vs. Atrophie?",
      "en": "NPH vs atrophy?",
      "fa": "NPH در برابر آتروفی؟"
    },
    "answer": {
      "de": "NPH: disproportionale Ventrikulomegalie/DESH; Atrophie: Ventrikel und Sulci proportional weit.",
      "en": "NPH: disproportionate ventriculomegaly/DESH; atrophy: proportional enlargement of ventricles and sulci.",
      "fa": "NPH: بزرگی نامتناسب/DESH؛ آتروفی: اتساع متناسب بطن‌ها و شیارها."
    },
    "explanation": {
      "de": "Callosal angle unterstützt die Abgrenzung.",
      "en": "The callosal angle supports differentiation.",
      "fa": "زاویه کالوزال به افتراق کمک می‌کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "polkappen",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Periventrikuläre „Polkappen“?",
      "en": "Periventricular “caps”?",
      "fa": "کلاهک‌های پیرابطنی؟"
    },
    "answer": {
      "de": "T2/FLAIR-Hyperintensitäten durch Liquorübertritt oder Mikroangiopathie.",
      "en": "T2/FLAIR hyperintensities from CSF seepage or small-vessel disease.",
      "fa": "هایپرسیگنال T2/FLAIR ناشی از عبور CSF یا بیماری عروق کوچک."
    },
    "explanation": {
      "de": "Ätiologie im Gesamtbild einordnen.",
      "en": "Interpret the cause in the full context.",
      "fa": "علت در کل تصویر تفسیر شود."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "flowvoid",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Aquädukt-Flow-void?",
      "en": "Aqueductal flow void?",
      "fa": "افت سیگنال ناشی از جریان (flow void) آکوئداکت؟"
    },
    "answer": {
      "de": "Unterstützendes Zeichen erhöhten pulsierenden Liquorflusses.",
      "en": "A supportive sign of increased pulsatile CSF flow.",
      "fa": "علامت حمایتی جریان ضربانی بیشتر CSF."
    },
    "explanation": {
      "de": "Weder spezifisch noch sicherer Shunt-Prädiktor.",
      "en": "Neither specific nor a reliable shunt predictor.",
      "fa": "نه اختصاصی و نه پیش‌بینی‌کننده قطعی شانت."
    },
    "source": "https://doi.org/10.1097/00006123-199701000-00015"
  },
  {
    "id": "cingulate",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Wie wird das Cingulate-sulcus-Zeichen beschrieben, und welche Grenze hat es?",
      "en": "How is the cingulate sulcus sign described, and what limits it?",
      "fa": "علامت شیار سینگولیت چگونه توصیف می‌شود و چه محدودیتی دارد؟"
    },
    "answer": {
      "de": "Relativ enger posteriorer gegenüber anteriorem Anteil des Sulcus cinguli auf paramediansagittalen Bildern; kein alleiniger iNPH-Nachweis.",
      "en": "Relatively tight posterior compared with anterior cingulate sulcus on paramedian sagittal images; not stand-alone proof of iNPH.",
      "fa": "بخش خلفی شیار سینگولیت نسبت به بخش قدامی در تصاویر پارامدیان ساژیتال تنگ‌تر است؛ اثبات مستقل iNPH نیست."
    },
    "explanation": {
      "de": "Die ursprüngliche kleine Studie beschrieb die posteriore Enge, nicht nur den Ramus marginalis. Der Befund wird im übrigen Bildmuster und klinischen Kontext bewertet.",
      "en": "The original small study described posterior tightness, not just the marginal branch. Interpret within the other imaging findings and clinical context.",
      "fa": "مطالعهٔ اصلی کوچک تنگی بخش خلفی را توصیف کرد، نه صرفاً شاخهٔ مارژینال. یافته در کنار سایر تصاویر و زمینهٔ بالینی تفسیر می‌شود."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "tap",
    "category": {
      "de": "Diagnostik",
      "en": "Work-up",
      "fa": "تشخیص"
    },
    "front": {
      "de": "Wie wird eine klinische Gangantwort auf einen Tap-Test objektiv beurteilt?",
      "en": "How is clinical gait response to a tap test assessed objectively?",
      "fa": "پاسخ بالینی راه‌رفتن به آزمون تخلیه چگونه عینی ارزیابی می‌شود؟"
    },
    "answer": {
      "de": "Mit standardisierten vergleichbaren Gangtests vor/nach Entnahme und passend terminierten Nachbewertungen.",
      "en": "Using standardised comparable gait tests before/after drainage and appropriately timed follow-up.",
      "fa": "با آزمون‌های استاندارد و قابل‌مقایسهٔ راه‌رفتن پیش/پس از تخلیه و پیگیری در زمان مناسب."
    },
    "explanation": {
      "de": "Ein einzelner Tap-Test kann falsch negativ sein. Die Leitlinie betont Messmethode, zeitlichen Verlauf und individuelle Einordnung. Wiederholung oder Drainagetests können im Team erwogen werden; kontinuierliche Drainage ist nicht allgemein als überlegen belegt.",
      "en": "A single tap test can be falsely negative. Guidance emphasises measurement method, timing and individual assessment. Repeat or drainage testing may be considered by the team; continuous drainage is not generally established as superior.",
      "fa": "آزمون تخلیهٔ منفرد می‌تواند منفی کاذب باشد. راهنما بر روش اندازه‌گیری، زمان و تفسیر فردی تأکید دارد. تکرار یا آزمون درناژ می‌تواند در تیم بررسی شود؛ برتری همگانی درناژ مداوم اثبات نشده است."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "drainage",
    "category": {
      "de": "Diagnostik",
      "en": "Work-up",
      "fa": "تشخیص"
    },
    "front": {
      "de": "Wann externe Lumbaldrainage?",
      "en": "When use external lumbar drainage?",
      "fa": "چه زمانی درناژ کمری خارجی؟"
    },
    "answer": {
      "de": "Im Einzelfall bei fortbestehendem Verdacht nach unklarem/negativem Tap-Test im Team erwägen; keine automatische Folgemaßnahme.",
      "en": "Consider individually with the team when suspicion persists after an equivocal/negative tap test; not an automatic next step.",
      "fa": "در شک پایدار پس از آزمون مبهم/منفی، بر حسب مورد در تیم بررسی شود؛ اقدام بعدی خودکار نیست."
    },
    "explanation": {
      "de": "Wiederholung, Drainage und weitere Auswahl werden individuell abgewogen; eine generelle Überlegenheit kontinuierlicher Drainage ist nicht belegt.",
      "en": "Repeat testing, drainage and further selection are weighed individually; general superiority of continuous drainage is unproven.",
      "fa": "تکرار آزمون، درناژ و انتخاب بعدی فردی سنجیده می‌شوند؛ برتری همگانی درناژ مداوم اثبات نشده است."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "shunt",
    "category": {
      "de": "Therapie",
      "en": "Treatment",
      "fa": "درمان"
    },
    "front": {
      "de": "Welche Liquorableitung kommt bei geeigneter iNPH-Gesamtkonstellation infrage?",
      "en": "Which CSF diversion may be considered in appropriately selected iNPH?",
      "fa": "در iNPH با مجموعهٔ یافته‌های مناسب، کدام روش انحراف مایع مطرح است؟"
    },
    "answer": {
      "de": "Zum Beispiel ein ventrikuloperitonealer Shunt nach individueller Nutzen-Risiko-Abwägung.",
      "en": "For example, a ventriculoperitoneal shunt after individual benefit-risk assessment.",
      "fa": "برای مثال شانت بطنی‌ـ‌صفاقی پس از سنجش فردی سود و خطر."
    },
    "explanation": {
      "de": "Gang bessert sich meist verlässlicher als Kognition oder Blase.",
      "en": "Gait improves more reliably than cognition or bladder function.",
      "fa": "راه‌رفتن معمولاً قابل‌اعتمادتر از شناخت یا مثانه بهبود می‌یابد."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "komplikation",
    "category": {
      "de": "Therapie",
      "en": "Treatment",
      "fa": "درمان"
    },
    "front": {
      "de": "Wichtige Shunt-Komplikationen?",
      "en": "Important shunt complications?",
      "fa": "عوارض مهم شانت؟"
    },
    "answer": {
      "de": "Überdrainage, Subduralhämatom, Infektion, Obstruktion und Fehlfunktion.",
      "en": "Overdrainage, subdural haematoma, infection, obstruction and malfunction.",
      "fa": "بیش‌درناژی، هماتوم ساب‌دورال، عفونت، انسداد و اختلال عملکرد."
    },
    "explanation": {
      "de": "Nutzen und Risiko interdisziplinär abwägen.",
      "en": "Balance benefits and risks in a multidisciplinary team.",
      "fa": "سود و خطر چندتخصصی سنجیده شود."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  },
  {
    "id": "befund",
    "category": {
      "de": "Befundung",
      "en": "Reporting",
      "fa": "گزارش"
    },
    "front": {
      "de": "Was gehört in den NPH-Befund?",
      "en": "What belongs in an NPH report?",
      "fa": "چه مواردی در گزارش NPH؟"
    },
    "answer": {
      "de": "Ventrikelweite, Evans-Index, Callosal angle, DESH, Temporalhörner, periventrikuläres Signal und Differenzialdiagnosen.",
      "en": "Ventricular size, Evans index, callosal angle, DESH, temporal horns, periventricular signal and differentials.",
      "fa": "اندازه بطن، شاخص ایوانز، زاویه کالوزال، DESH، شاخ تمپورال، سیگنال پیرابطنی و افتراق‌ها."
    },
    "explanation": {
      "de": "Immer klinische Korrelation formulieren.",
      "en": "Always state the need for clinical correlation.",
      "fa": "همیشه نیاز به تطابق بالینی ذکر شود."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7905302/"
  }
]

export const NPH_FLASHCARDS = NF.map((item, index) => ({
  id: `normaldruckhydrozephalus-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'normaldruckhydrozephalus',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  ...(item.source ? {source:item.source} : {}),
}))

export const NPH_FLASHCARD_TOPIC = {
  id: 'normaldruckhydrozephalus',
  area: 'Kopf',
  chapter: 'Liquorzirkulationsstörungen & intrakranieller Druck',
  icon: '💧',
  iconImage: '/fach/gehirn.png',
  color: '#2563eb',
  href: '/flashcards/normaldruckhydrozephalus',
  title: L('Normaldruckhydrozephalus', 'Normal pressure hydrocephalus', 'هیدروسفالی فشار طبیعی'),
  subtitle: L('Hakim-Trias · DESH · Evans-Index · Callosal angle · Tap-Test', 'Hakim triad · DESH · Evans index · callosal angle · tap test', 'تریاد حکیم · DESH · شاخص ایوانز · زاویه کالوزال · تست تخلیه'),
}
