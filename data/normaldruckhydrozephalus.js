const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const NPH_LESSON = {
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
      { icon: '🔒', title: L('Enge Hochkonvexität', 'Tight high convexity', 'تنگی تحدب فوقانی'), text: L('Enge hochparietale und parafalcine Sulci trotz Ventrikulomegalie.', 'Tight high-parietal and parafalcine sulci despite ventriculomegaly.', 'شیارهای پاریتال فوقانی و پارافالکس تنگ با وجود بزرگی بطن‌ها.') },
      { icon: '🌊', title: L('Weite Sylvische Fissuren', 'Enlarged Sylvian fissures', 'فیشورهای سیلوین گشاد'), text: L('Basale und Sylvische Liquorräume können prominent wirken; zusammen mit enger Konvexität ergibt sich DESH.', 'Basal and Sylvian CSF spaces may be prominent; with tight convexity this forms DESH.', 'فضاهای بازال و سیلوین ممکن است برجسته باشند؛ همراه با تحدب تنگ الگوی DESH می‌سازند.') },
      { icon: '⚪', title: L('Periventrikuläres Signal', 'Periventricular signal', 'سیگنال پیرابطنی'), text: L('„Polkappen“ können transependymalen Liquorfluss oder chronische Mikroangiopathie widerspiegeln.', 'Periventricular caps may reflect transependymal CSF flow or chronic small-vessel disease.', 'کلاهک‌های پیرابطنی می‌توانند ناشی از عبور ترانس‌اپاندیمال CSF یا میکروآنژیوپاتی باشند.') },
    ],
    key: L('DESH = Disproportionately Enlarged Subarachnoid-space Hydrocephalus: weite Sylvische Fissuren plus enge Hochkonvexität.', 'DESH combines enlarged Sylvian fissures with tight high-convexity sulci.', 'DESH ترکیب فیشورهای سیلوین گشاد و شیارهای تنگ تحدب فوقانی است.'),
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
      [L('Aquädukt-Flow-void', 'Aqueductal flow void', 'Flow void آکوئداکت'), L('Prominentes Strömungssignal in sagittaler T2/CISS', 'Prominent flow void on sagittal T2/CISS', 'سیگنال جریان برجسته در T2/CISS ساژیتال'), L('Unterstützend, aber nicht ausreichend spezifisch und nicht allein prognostisch', 'Supportive but insufficiently specific and not a stand-alone prognostic marker', 'حمایتی است اما اختصاصی یا پیش‌آگهی‌دهنده مستقل نیست')],
      [L('Cingulate sulcus sign', 'Cingulate sulcus sign', 'علامت شیار سینگولیت'), L('Mediosagittal enger Ramus marginalis relativ zu anterioren Anteilen', 'On midsagittal images, the marginal branch is tighter than anterior portions', 'در نمای میدساژیتال شاخه مارژینال از بخش‌های قدامی تنگ‌تر است'), L('Spiegelt die Enge der hohen Konvexität wider', 'Reflects high-convexity tightness', 'بازتاب تنگی تحدب فوقانی است')],
      [L('Periventrikuläre T2/FLAIR-Hyperintensität', 'Periventricular T2/FLAIR hyperintensity', 'هایپرسیگنال پیرابطنی T2/FLAIR'), L('Vor allem an Vorder- und Hinterhörnern', 'Especially around frontal and occipital horns', 'به‌ویژه اطراف شاخ‌های فرونتال و اکسیپیتال'), L('Liquorübertritt und Mikroangiopathie differenzieren', 'Distinguish CSF seepage from small-vessel disease', 'عبور CSF از بیماری عروق کوچک افتراق داده شود')],
    ],
    key: L('Ein kräftiger Aquädukt-Flow-void ist ein Puzzleteil – kein alleiniger Shunt-Prädiktor.', 'A strong aqueductal flow void is one piece of the puzzle, not a stand-alone shunt predictor.', 'Flow void قوی آکوئداکت تنها بخشی از پازل است و پیش‌بینی‌کننده مستقل شانت نیست.'),
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
      L('Sagittale CISS/T2: Aquädukt-Flow-void', 'Sagittal CISS/T2: aqueductal flow void', 'CISS/T2 ساژیتال: Flow void آکوئداکت'),
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
  Q('01', L('Welches Symptom tritt beim NPH typischerweise zuerst auf?', 'Which symptom typically appears first in NPH?', 'کدام علامت در NPH معمولاً زودتر ظاهر می‌شود؟'), [L('Gangstörung', 'Gait disturbance', 'اختلال راه‌رفتن'), L('Harninkontinenz', 'Urinary incontinence', 'بی‌اختیاری ادرار'), L('Kortikale Aphasie', 'Cortical aphasia', 'آفازی کورتیکال'), L('Ruhetremor', 'Resting tremor', 'ترمور استراحت')], 0, L('Die Gangstörung ist meist das früheste und am besten shunt-responsive Symptom.', 'Gait disturbance is usually the earliest and most shunt-responsive symptom.', 'اختلال راه‌رفتن معمولاً زودرس‌ترین و پاسخ‌گوترین علامت به شانت است.')),
  Q('02', L('Welche Kombination entspricht der Hakim-Trias?', 'Which combination is the Hakim triad?', 'کدام ترکیب تریاد حکیم است؟'), [L('Gangstörung, kognitive Störung, Blasenstörung', 'Gait disturbance, cognitive impairment, bladder dysfunction', 'اختلال راه‌رفتن، شناخت و مثانه'), L('Ataxie, Ophthalmoplegie, Verwirrtheit', 'Ataxia, ophthalmoplegia, confusion', 'آتاکسی، افتالموپلژی، گیجی'), L('Tremor, Rigor, Bradykinese', 'Tremor, rigidity, bradykinesia', 'ترمور، ریجیدیتی، برادی‌کینزی'), L('Kopfschmerz, Erbrechen, Papillenödem', 'Headache, vomiting, papilloedema', 'سردرد، استفراغ، پاپی‌ادم')], 0, L('Die klassische Trias umfasst Gang, Kognition und Blasenfunktion.', 'The classic triad comprises gait, cognition and bladder function.', 'تریاد کلاسیک شامل راه‌رفتن، شناخت و مثانه است.')),
  Q('03', L('Was misst der Evans-Index?', 'What does the Evans index measure?', 'شاخص ایوانز چه چیزی را می‌سنجد؟'), [L('Vorderhornbreite relativ zum inneren Schädeldurchmesser', 'Frontal horn width relative to inner skull diameter', 'عرض شاخ فرونتال نسبت به قطر داخلی جمجمه'), L('Breite des III. Ventrikels relativ zum Corpus callosum', 'Third-ventricle width relative to the corpus callosum', 'عرض بطن سوم نسبت به جسم پینه‌ای'), L('Aquäduktfläche relativ zur Ponsfläche', 'Aqueductal area relative to pontine area', 'سطح آکوئداکت نسبت به پونز'), L('Temporalhornbreite relativ zur Hippocampushöhe', 'Temporal horn width relative to hippocampal height', 'عرض شاخ تمپورال نسبت به ارتفاع هیپوکامپ')], 0, L('Gemessen wird die maximale Vorderhornbreite geteilt durch den maximalen inneren Schädeldurchmesser derselben Ebene.', 'It is maximal frontal horn width divided by maximal inner skull diameter on the same plane.', 'حداکثر عرض شاخ فرونتال بر حداکثر قطر داخلی جمجمه در همان برش تقسیم می‌شود.')),
  Q('04', L('Welche Aussage zu einem Evans-Index von 0,34 ist korrekt?', 'Which statement about an Evans index of 0.34 is correct?', 'کدام عبارت درباره شاخص ایوانز ۰٫۳۴ درست است؟'), [L('Er zeigt Ventrikulomegalie, ist aber nicht spezifisch für NPH.', 'It indicates ventriculomegaly but is not specific for NPH.', 'بزرگی بطن را نشان می‌دهد اما برای NPH اختصاصی نیست.'), L('Er beweist einen shunt-responsiven NPH.', 'It proves shunt-responsive NPH.', 'NPH پاسخ‌گو به شانت را ثابت می‌کند.'), L('Er ist bei generalisierter Atrophie ausgeschlossen.', 'It cannot occur in generalised atrophy.', 'در آتروفی منتشر رخ نمی‌دهد.'), L('Er zeigt einen obstruktiven Aquäduktverschluss.', 'It indicates aqueductal obstruction.', 'انسداد آکوئداکت را نشان می‌دهد.')], 0, L('Der Evans-Index ist ein sensitiver Marker der Ventrikulomegalie, aber unspezifisch.', 'The Evans index is a marker of ventriculomegaly but is nonspecific.', 'شاخص ایوانز نشانگر بزرگی بطن است اما اختصاصی نیست.')),
  Q('05', L('Welches Muster beschreibt DESH am besten?', 'Which pattern best describes DESH?', 'کدام الگو DESH را بهتر توصیف می‌کند؟'), [L('Weite Sylvische Fissuren bei engen Hochkonvexitätssulci', 'Enlarged Sylvian fissures with tight high-convexity sulci', 'فیشورهای سیلوین گشاد با شیارهای تنگ تحدب فوقانی'), L('Diffuse Erweiterung aller kortikalen Sulci', 'Diffuse widening of all cortical sulci', 'گشادی منتشر همه شیارهای کورتیکال'), L('Enge basale Zisternen bei Tonsillentiefstand', 'Tight basal cisterns with tonsillar descent', 'سیسترن‌های بازال تنگ با نزول لوزه'), L('Asymmetrische Sylvische Fissur mit Mittellinienverlagerung', 'Asymmetric Sylvian fissure with midline shift', 'فیشور سیلوین نامتقارن با شیفت خط میانی')], 0, L('DESH ist die disproportionale Verteilung äußerer Liquorräume mit weiter Sylvischer Fissur und enger hoher Konvexität.', 'DESH is disproportionate external CSF-space distribution with enlarged Sylvian fissures and tight high convexity.', 'DESH توزیع نامتناسب فضای CSF با فیشور سیلوین گشاد و تحدب فوقانی تنگ است.')),
  Q('06', L('Wie wird der Callosal angle korrekt gemessen?', 'How is the callosal angle measured correctly?', 'زاویه کالوزال چگونه درست اندازه‌گیری می‌شود؟'), [L('Koronar senkrecht zur AC-PC-Linie auf Höhe der Commissura posterior', 'Coronal, perpendicular to the AC-PC line at the posterior commissure', 'کرونال عمود بر خط AC-PC در سطح کمیسور خلفی'), L('Axial parallel zur Orbitomeatallinie', 'Axial, parallel to the orbitomeatal line', 'اکسیال موازی خط اربیتومئاتال'), L('Sagittal entlang des Aquädukts', 'Sagittal along the aqueduct', 'ساژیتال در امتداد آکوئداکت'), L('Koronar durch die Vorderhörner unabhängig von der AC-PC-Linie', 'Coronal through frontal horns regardless of AC-PC line', 'کرونال از شاخ‌های فرونتال مستقل از خط AC-PC')], 0, L('Die standardisierte Ebene ist entscheidend, da der Winkel stark von der Schichtführung abhängt.', 'The standardised plane is essential because the angle depends strongly on orientation.', 'صفحه استاندارد ضروری است چون زاویه به جهت برش وابسته است.')),
  Q('07', L('Welcher Callosal angle unterstützt bei passender Klinik einen NPH?', 'Which callosal angle supports NPH in the appropriate setting?', 'کدام زاویه کالوزال در زمینه مناسب به نفع NPH است؟'), [L('Etwa 70°', 'About 70°', 'حدود ۷۰ درجه'), L('Etwa 105°', 'About 105°', 'حدود ۱۰۵ درجه'), L('Etwa 125°', 'About 125°', 'حدود ۱۲۵ درجه'), L('Etwa 150°', 'About 150°', 'حدود ۱۵۰ درجه')], 0, L('Ein Winkel unter etwa 90° unterstützt NPH; bei Ex-vacuo-Erweiterung ist er meist weiter.', 'An angle below about 90° supports NPH; it is usually wider in ex-vacuo enlargement.', 'زاویه کمتر از حدود ۹۰ درجه مؤید NPH است؛ در ex vacuo معمولاً بازتر است.')),
  Q('08', L('Welche Befundkombination spricht eher für Atrophie als für NPH?', 'Which combination favours atrophy over NPH?', 'کدام ترکیب بیشتر به نفع آتروفی است تا NPH؟'), [L('Proportional weite Ventrikel und Sulci mit weitem Callosal angle', 'Proportionally enlarged ventricles and sulci with a wide callosal angle', 'اتساع متناسب بطن‌ها و شیارها با زاویه کالوزال باز'), L('Enge Hochkonvexität bei weiten Sylvischen Fissuren', 'Tight high convexity with enlarged Sylvian fissures', 'تحدب فوقانی تنگ با فیشورهای سیلوین گشاد'), L('Abgerundete Frontalhörner mit DESH', 'Rounded frontal horns with DESH', 'شاخ‌های فرونتال گرد با DESH'), L('Kleiner Callosal angle und magnetischer Gang', 'Small callosal angle and magnetic gait', 'زاویه کالوزال کوچک و راه‌رفتن مغناطیسی')], 0, L('Bei Atrophie erweitern sich innere und äußere Liquorräume typischerweise proportional.', 'In atrophy, internal and external CSF spaces typically enlarge proportionally.', 'در آتروفی فضاهای داخلی و خارجی CSF معمولاً متناسب گشاد می‌شوند.')),
  Q('09', L('Wie ist ein ausgeprägter Aquädukt-Flow-void zu bewerten?', 'How should a prominent aqueductal flow void be interpreted?', 'Flow void واضح آکوئداکت چگونه تفسیر می‌شود؟'), [L('Unterstützend, aber weder spezifisch noch allein prognostisch', 'Supportive but neither specific nor independently prognostic', 'حمایتی، اما نه اختصاصی و نه پیش‌آگهی‌دهنده مستقل'), L('Beweis eines obstruktiven Hydrozephalus', 'Proof of obstructive hydrocephalus', 'اثبات هیدروسفالی انسدادی'), L('Ausschluss eines NPH', 'Exclusion of NPH', 'رد NPH'), L('Sicherer Beweis einer Shunt-Response', 'Certain proof of shunt response', 'اثبات قطعی پاسخ به شانت')], 0, L('Flow-void ist ein unterstützendes Flussphänomen und darf nicht isoliert überbewertet werden.', 'Flow void is a supportive flow phenomenon and should not be overinterpreted in isolation.', 'Flow void یک پدیده حمایتی جریان است و نباید منفرد بیش‌تفسیر شود.')),
  Q('10', L('Was ist beim Tap-Test am wichtigsten?', 'What is most important in a tap test?', 'مهم‌ترین نکته در تست تخلیه چیست؟'), [L('Objektiver Vergleich des Gangs vor und nach Liquorablass', 'Objective comparison of gait before and after CSF removal', 'مقایسه عینی راه‌رفتن پیش و پس از تخلیه CSF'), L('Alleinige subjektive Gedächtniseinschätzung', 'Subjective memory assessment alone', 'فقط ارزیابی ذهنی حافظه'), L('Einmalige Messung des Öffnungsdrucks', 'A single opening-pressure measurement', 'یک‌بار اندازه‌گیری فشار بازشدن'), L('Nachweis eines Aquädukt-Flow-voids', 'Demonstration of aqueductal flow void', 'اثبات Flow void آکوئداکت')], 0, L('Standardisierte Gangzeit, Schrittzahl und Wendemanöver machen eine klinische Änderung messbar.', 'Standardised gait time, step count and turning make clinical change measurable.', 'زمان راه‌رفتن، تعداد قدم و چرخش استاندارد تغییر بالینی را قابل اندازه‌گیری می‌کند.')),
  Q('11', L('Welche Aussage zum negativen Tap-Test ist korrekt?', 'Which statement about a negative tap test is correct?', 'کدام عبارت درباره تست تخلیه منفی درست است؟'), [L('Er schließt einen Shunt-Nutzen nicht sicher aus.', 'It does not reliably exclude benefit from shunting.', 'سود از شانت را قطعی رد نمی‌کند.'), L('Er schließt NPH vollständig aus.', 'It completely excludes NPH.', 'NPH را کاملاً رد می‌کند.'), L('Er beweist Alzheimer-Krankheit.', 'It proves Alzheimer disease.', 'آلزایمر را ثابت می‌کند.'), L('Er macht weitere Funktionsdiagnostik überflüssig.', 'It makes further functional testing unnecessary.', 'بررسی عملکردی بیشتر را غیرضروری می‌کند.')], 0, L('Die Sensitivität eines einzelnen Tap-Tests ist begrenzt; bei weiterem Verdacht kann eine Lumbaldrainage erwogen werden.', 'A single tap test has limited sensitivity; lumbar drainage may be considered if suspicion remains.', 'حساسیت یک تست محدود است و در شک پایدار می‌توان درناژ کمری را بررسی کرد.')),
  Q('12', L('Welche Befundzusammenfassung ist am besten?', 'Which report conclusion is best?', 'کدام جمع‌بندی گزارش بهتر است؟'), [L('Disproportionale Ventrikulomegalie mit DESH und kleinem Callosal angle; bei passender Klinik NPH-Konstellation.', 'Disproportionate ventriculomegaly with DESH and a small callosal angle; compatible with NPH in the appropriate clinical setting.', 'بزرگی نامتناسب بطن‌ها با DESH و زاویه کالوزال کوچک؛ در زمینه مناسب سازگار با NPH.'), L('Evans-Index 0,32 beweist Normaldruckhydrozephalus.', 'Evans index 0.32 proves normal pressure hydrocephalus.', 'شاخص ایوانز ۰٫۳۲ NPH را ثابت می‌کند.'), L('Ventrikulomegalie ohne klinische Korrelation; Shunt zwingend.', 'Ventriculomegaly without clinical correlation; shunt mandatory.', 'بزرگی بطن بدون ارتباط بالینی؛ شانت الزامی.'), L('Aquädukt-Flow-void beweist gute Shunt-Prognose.', 'Aqueductal flow void proves a good shunt prognosis.', 'Flow void آکوئداکت پیش‌آگهی خوب شانت را ثابت می‌کند.')], 0, L('Die Formulierung beschreibt das vollständige Muster und wahrt die notwendige klinische Korrelation.', 'This wording describes the full pattern while preserving the need for clinical correlation.', 'این عبارت الگوی کامل را توصیف و نیاز به تطابق بالینی را حفظ می‌کند.')),
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
  })),
]))

const NF = [
  F('definition', L('Grundlagen', 'Basics', 'مبانی'), L('Was ist NPH?', 'What is NPH?', 'NPH چیست؟'), L('Kommunizierender Hydrozephalus mit klinisch-radiologischer Konstellation bei oft normaler Einzelmessung des Liquordrucks.', 'A communicating hydrocephalus with a clinicoradiological syndrome despite often normal single pressure measurement.', 'هیدروسفالی ارتباطی با سندرم بالینی-تصویری، با وجود فشار اغلب طبیعی در اندازه‌گیری منفرد.'), L('Die Liquordynamik ist trotzdem gestört.', 'CSF dynamics are nevertheless abnormal.', 'دینامیک CSF همچنان مختل است.')),
  F('trias', L('Klinik', 'Clinical', 'بالینی'), L('Hakim-Trias?', 'Hakim triad?', 'تریاد حکیم؟'), L('Gangstörung, kognitive Störung, Blasenstörung.', 'Gait disturbance, cognitive impairment and bladder dysfunction.', 'اختلال راه‌رفتن، شناخت و مثانه.'), L('Die Trias muss nicht vollständig sein.', 'The triad need not be complete.', 'وجود کامل تریاد الزامی نیست.')),
  F('gang', L('Klinik', 'Clinical', 'بالینی'), L('Typischer NPH-Gang?', 'Typical NPH gait?', 'راه‌رفتن تیپیک NPH؟'), L('Breitbasig, kleinschrittig, magnetisch, mit Start- und Wendestörung.', 'Broad-based, short-stepped and magnetic with initiation and turning difficulty.', 'قاعده پهن، قدم کوتاه و مغناطیسی با دشواری شروع و چرخش.'), L('Meist frühestes und shunt-responsivstes Symptom.', 'Usually the earliest and most shunt-responsive symptom.', 'معمولاً زودرس‌ترین و پاسخ‌گوترین علامت به شانت.')),
  F('evans', L('Messung', 'Measurement', 'اندازه‌گیری'), L('Evans-Index?', 'Evans index?', 'شاخص ایوانز؟'), L('Maximale Vorderhornbreite / maximaler innerer Schädeldurchmesser; > 0,30 = Ventrikulomegalie.', 'Maximal frontal horn width / maximal inner skull diameter; >0.30 = ventriculomegaly.', 'حداکثر عرض شاخ فرونتال / حداکثر قطر داخلی جمجمه؛ بیش از ۰٫۳۰ = بزرگی بطن.'), L('Unspezifisch und nicht allein diagnostisch.', 'Nonspecific and not diagnostic alone.', 'اختصاصی و تشخیصی مستقل نیست.')),
  F('callosal', L('Messung', 'Measurement', 'اندازه‌گیری'), L('Callosal angle bei NPH?', 'Callosal angle in NPH?', 'زاویه کالوزال در NPH؟'), L('Oft < 90°, korrekt koronar senkrecht zur AC-PC-Linie gemessen.', 'Often <90°, measured on a coronal plane perpendicular to the AC-PC line.', 'اغلب کمتر از ۹۰ درجه، در کرونال عمود بر خط AC-PC.'), L('Bei Atrophie meist weiter.', 'Usually wider in atrophy.', 'در آتروفی معمولاً بازتر است.')),
  F('desh', 'DESH', L('DESH-Muster?', 'DESH pattern?', 'الگوی DESH؟'), L('Weite Sylvische Fissuren und enge Sulci der hohen Konvexität.', 'Enlarged Sylvian fissures and tight high-convexity sulci.', 'فیشورهای سیلوین گشاد و شیارهای تنگ تحدب فوقانی.'), L('Disproportionale Verteilung der äußeren Liquorräume.', 'Disproportionate distribution of external CSF spaces.', 'توزیع نامتناسب فضاهای خارجی CSF.')),
  F('atrophie', L('Differenzial', 'Differential', 'افتراقی'), L('NPH vs. Atrophie?', 'NPH vs atrophy?', 'NPH در برابر آتروفی؟'), L('NPH: disproportionale Ventrikulomegalie/DESH; Atrophie: Ventrikel und Sulci proportional weit.', 'NPH: disproportionate ventriculomegaly/DESH; atrophy: proportional enlargement of ventricles and sulci.', 'NPH: بزرگی نامتناسب/DESH؛ آتروفی: اتساع متناسب بطن‌ها و شیارها.'), L('Callosal angle unterstützt die Abgrenzung.', 'The callosal angle supports differentiation.', 'زاویه کالوزال به افتراق کمک می‌کند.')),
  F('polkappen', L('MRT', 'MRI', 'MRI'), L('Periventrikuläre „Polkappen“?', 'Periventricular “caps”?', 'کلاهک‌های پیرابطنی؟'), L('T2/FLAIR-Hyperintensitäten durch Liquorübertritt oder Mikroangiopathie.', 'T2/FLAIR hyperintensities from CSF seepage or small-vessel disease.', 'هایپرسیگنال T2/FLAIR ناشی از عبور CSF یا بیماری عروق کوچک.'), L('Ätiologie im Gesamtbild einordnen.', 'Interpret the cause in the full context.', 'علت در کل تصویر تفسیر شود.')),
  F('flowvoid', L('MRT', 'MRI', 'MRI'), L('Aquädukt-Flow-void?', 'Aqueductal flow void?', 'Flow void آکوئداکت؟'), L('Unterstützendes Zeichen erhöhten pulsierenden Liquorflusses.', 'A supportive sign of increased pulsatile CSF flow.', 'علامت حمایتی جریان ضربانی بیشتر CSF.'), L('Weder spezifisch noch sicherer Shunt-Prädiktor.', 'Neither specific nor a reliable shunt predictor.', 'نه اختصاصی و نه پیش‌بینی‌کننده قطعی شانت.')),
  F('cingulate', L('MRT', 'MRI', 'MRI'), L('Cingulate sulcus sign?', 'Cingulate sulcus sign?', 'علامت شیار سینگولیت؟'), L('Mediosagittal relativ enger Ramus marginalis des Sulcus cinguli.', 'Relative narrowing of the marginal branch of the cingulate sulcus on midsagittal images.', 'تنگی نسبی شاخه مارژینال شیار سینگولیت در میدساژیتال.'), L('Spiegelt die enge Hochkonvexität wider.', 'Reflects tight high convexity.', 'بازتاب تحدب فوقانی تنگ است.')),
  F('tap', L('Diagnostik', 'Work-up', 'تشخیص'), L('Tap-Test?', 'Tap test?', 'تست تخلیه؟'), L('Objektiver Gangvergleich vor und nach großvolumiger Lumbalpunktion.', 'Objective gait comparison before and after large-volume lumbar puncture.', 'مقایسه عینی راه‌رفتن قبل و بعد از LP با حجم بالا.'), L('Besserung unterstützt Shunt-Response; negatives Ergebnis schließt sie nicht aus.', 'Improvement supports shunt response; a negative result does not exclude it.', 'بهبود مؤید پاسخ به شانت است؛ نتیجه منفی آن را رد نمی‌کند.')),
  F('drainage', L('Diagnostik', 'Work-up', 'تشخیص'), L('Wann externe Lumbaldrainage?', 'When use external lumbar drainage?', 'چه زمانی درناژ کمری خارجی؟'), L('Bei weiterem klinischem Verdacht und unklarem oder negativem Tap-Test.', 'When suspicion remains after an equivocal or negative tap test.', 'در شک پایدار پس از تست مبهم یا منفی.'), L('Kann zusätzliche prognostische Information liefern.', 'May provide additional prognostic information.', 'می‌تواند اطلاعات پیش‌آگهی بیشتری بدهد.')),
  F('shunt', L('Therapie', 'Treatment', 'درمان'), L('Standardtherapie?', 'Standard treatment?', 'درمان استاندارد؟'), L('Ventrikuloperitonealer Shunt bei geeigneter Gesamtkonstellation.', 'Ventriculoperitoneal shunt in appropriately selected patients.', 'شانت بطنی-صفاقی در بیمار منتخب مناسب.'), L('Gang bessert sich meist verlässlicher als Kognition oder Blase.', 'Gait improves more reliably than cognition or bladder function.', 'راه‌رفتن معمولاً قابل‌اعتمادتر از شناخت یا مثانه بهبود می‌یابد.')),
  F('komplikation', L('Therapie', 'Treatment', 'درمان'), L('Wichtige Shunt-Komplikationen?', 'Important shunt complications?', 'عوارض مهم شانت؟'), L('Überdrainage, Subduralhämatom, Infektion, Obstruktion und Fehlfunktion.', 'Overdrainage, subdural haematoma, infection, obstruction and malfunction.', 'بیش‌درناژی، هماتوم ساب‌دورال، عفونت، انسداد و اختلال عملکرد.'), L('Nutzen und Risiko interdisziplinär abwägen.', 'Balance benefits and risks in a multidisciplinary team.', 'سود و خطر چندتخصصی سنجیده شود.')),
  F('befund', L('Befundung', 'Reporting', 'گزارش'), L('Was gehört in den NPH-Befund?', 'What belongs in an NPH report?', 'چه مواردی در گزارش NPH؟'), L('Ventrikelweite, Evans-Index, Callosal angle, DESH, Temporalhörner, periventrikuläres Signal und Differenzialdiagnosen.', 'Ventricular size, Evans index, callosal angle, DESH, temporal horns, periventricular signal and differentials.', 'اندازه بطن، شاخص ایوانز، زاویه کالوزال، DESH، شاخ تمپورال، سیگنال پیرابطنی و افتراق‌ها.'), L('Immer klinische Korrelation formulieren.', 'Always state the need for clinical correlation.', 'همیشه نیاز به تطابق بالینی ذکر شود.')),
]

export const NPH_FLASHCARDS = NF.map((item, index) => ({
  id: `normaldruckhydrozephalus-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'normaldruckhydrozephalus',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
}))

export const NPH_FLASHCARD_TOPIC = {
  id: 'normaldruckhydrozephalus',
  area: 'Kopf',
  chapter: 'Liquorzirkulationsstörungen & Hirndruck',
  icon: '💧',
  iconImage: '/fach/gehirn.png',
  color: '#2563eb',
  href: '/flashcards/normaldruckhydrozephalus',
  title: L('Normaldruckhydrozephalus', 'Normal pressure hydrocephalus', 'هیدروسفالی فشار طبیعی'),
  subtitle: L('Hakim-Trias · DESH · Evans-Index · Callosal angle · Tap-Test', 'Hakim triad · DESH · Evans index · callosal angle · tap test', 'تریاد حکیم · DESH · شاخص ایوانز · زاویه کالوزال · تست تخلیه'),
}
