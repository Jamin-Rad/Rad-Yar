const L = (de, en, fa) => ({ de, en, fa })

export const STROKE_LESSON = {
  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L(
    'Vaskuläre Erkrankungen · Ischämischer Schlaganfall',
    'Vascular diseases · Ischaemic stroke',
    'بیماری‌های عروقی · سکته مغزی ایسکمیک'
  ),
  title: L('Ischämischer Schlaganfall', 'Ischaemic stroke', 'سکته مغزی ایسکمیک'),
  subtitle: L(
    'Akutbildgebung, Gefäßverschluss, ASPECTS, Perfusions-Mismatch und zeitlicher Verlauf',
    'Acute imaging, vessel occlusion, ASPECTS, perfusion mismatch and temporal evolution',
    'تصویربرداری حاد، انسداد عروقی، ASPECTS، عدم تطابق پرفیوژن و سیر زمانی'
  ),
  sourceLabel: 'Dr. Zia',
  actionMcq: 'MCQ',
  actionFlash: L('Flashcards', 'Flashcards', 'فلش‌کارت'),
  keyLabel: L('Merke', 'Key point', 'نکته مهم'),
  caveLabel: L('CAVE', 'Caution', 'احتیاط'),
  openCase: L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'),
  sections: [
    { id: 'grundlagen', label: L('Grundlagen & Territorien', 'Basics & territories', 'مبانی و قلمروهای عروقی'), icon: '🧠' },
    { id: 'akut-ct', label: L('Akut-CT, CTA & CTP', 'Acute CT, CTA & CTP', 'CT حاد، CTA و CTP'), icon: '🩻' },
    { id: 'aspects', label: L('ASPECTS', 'ASPECTS', 'ASPECTS'), icon: '🔟' },
    { id: 'ct-verlauf', label: L('CT-Zeitverlauf', 'CT evolution', 'سیر زمانی CT'), icon: '⏱️' },
    { id: 'mrt', label: L('MRT-Protokoll', 'MRI protocol', 'پروتکل MRI'), icon: '🧲' },
    { id: 'mrt-verlauf', label: L('MRT-Zeitverlauf', 'MRI evolution', 'سیر زمانی MRI'), icon: '📈' },
    { id: 'verlauf', label: L('Fallstricke & Komplikationen', 'Pitfalls & complications', 'دام‌ها و عوارض'), icon: '⚠️' },
    { id: 'therapie', label: L('Therapie & Befundung', 'Treatment & reporting', 'درمان و گزارش'), icon: '🚑' },
    { id: 'faelle', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'), icon: '🔬' },
    { id: 'takehome', label: L('Take home message', 'Take-home messages', 'نکات کلیدی'), icon: '💡' },
  ],
  heroCards: [
    {
      value: 'TIME',
      label: L('Zeitpunkt sichern', 'establish timing', 'تعیین زمان'),
      text: L('Last known well steuert die Reperfusionsauswahl', 'Last known well guides reperfusion selection', 'آخرین زمان سالم انتخاب بازپرفیوژن را هدایت می‌کند'),
    },
    {
      value: 'LVO',
      label: L('Verschluss lokalisieren', 'localise occlusion', 'تعیین محل انسداد'),
      text: L('Verschlusshöhe, Tandemläsion und Kollateralen', 'Occlusion level, tandem lesion and collaterals', 'سطح انسداد، ضایعه تاندوم و کولترال‌ها'),
    },
    {
      value: 'CORE ↔',
      label: L('Penumbra erkennen', 'identify penumbra', 'شناسایی پنومبرا'),
      text: L('Irreversiblen Kern von rettbarem Gewebe trennen', 'Separate irreversible core from salvageable tissue', 'تفکیک هسته غیرقابل برگشت از بافت قابل نجات'),
    },
  ],
  basics: {
    title: L('Klinische Merkmale', 'Clinical features', 'ویژگی‌های بالینی'),
    lead: L(
      'Der Schlaganfall ist ein klinisches Syndrom, das radiologisch in zwei Hauptformen unterteilt wird: ischämischer Schlaganfall durch akute arterielle Durchblutungsstörung etwa 80-85% und hämorrhagischer Schlaganfall etwa 15-20%, davon intrazerebrale Blutung 10-15% und Subarachnoidalblutung etwa 5%. Die klinische Schwere wird primär mit dem NIHSS beurteilt.',
      'Stroke is a clinical syndrome that is radiologically divided into two main forms: ischaemic stroke from acute arterial perfusion failure in about 80-85% and haemorrhagic stroke in about 15-20%, including intracerebral haemorrhage in 10-15% and subarachnoid haemorrhage in about 5%. Clinical severity is primarily assessed with the NIHSS.',
      'سکته مغزی یک سندرم بالینی است که از نظر تصویربرداری به دو شکل اصلی تقسیم می‌شود: سکته ایسکمیک ناشی از اختلال حاد خون‌رسانی شریانی در حدود ۸۰ تا ۸۵٪ و سکته هموراژیک در حدود ۱۵ تا ۲۰٪، شامل خونریزی داخل مغزی ۱۰ تا ۱۵٪ و خونریزی ساب‌آراکنوئید حدود ۵٪. شدت بالینی عمدتاً با NIHSS ارزیابی می‌شود.'
    ),
    headers: [
      L('Gefäß', 'Vessel', 'رگ'),
      L('Versorgungsgebiet', 'Territory', 'قلمرو خون‌رسانی'),
      L('Typische Klinik', 'Typical presentation', 'تظاهرات تیپیک'),
    ],
    rows: [
      [
        'ACA',
        L('Medialer Frontal- und Parietallappen', 'Medial frontal and parietal lobes', 'لوب فرونتال و پاریتال مدیال'),
        L('Kontralaterale beinbetonte Hemiparese, ggf. Harninkontinenz', 'Contralateral leg-predominant hemiparesis, sometimes urinary incontinence', 'همی‌پارزی غالب پا در سمت مقابل، گاهی بی‌اختیاری ادرار'),
      ],
      [
        'MCA',
        L('Lateraler Frontal-, Parietal- und Temporallappen, tiefe Kerne', 'Lateral frontal, parietal and temporal lobes; deep nuclei', 'لوب‌های فرونتال، پاریتال و تمپورال لترال و هسته‌های عمقی'),
        L('Arm- und gesichtsbetonte Hemiparese, homonyme Hemianopsie. Dominante Hemisphäre: Aphasie; nicht dominante Hemisphäre: Neglect. Meist gilt links Aphasie, rechts Neglect.', 'Arm- and face-predominant hemiparesis, homonymous hemianopia. Dominant hemisphere: aphasia; non-dominant hemisphere: neglect. Usually left-sided lesions cause aphasia and right-sided lesions cause neglect.', 'همی‌پارزی غالب دست و صورت، همی‌آنوپی هومونیم. نیمکره غالب: آفازی؛ نیمکره غیرغالب: نگلکت. معمولاً ضایعه چپ باعث آفازی و ضایعه راست باعث نگلکت می‌شود.'),
      ],
      [
        'PCA',
        L('Okzipitallappen, inferomedialer Temporallappen, Thalamus', 'Occipital lobe, inferomedial temporal lobe and thalamus', 'لوب اکسیپیتال، تمپورال اینفرومدیال و تالاموس'),
        L('Kontralaterale homonyme Hemianopsie, ggf. Sensibilitätsstörung bei Thalamusbeteiligung', 'Contralateral homonymous hemianopia, sometimes sensory disturbance with thalamic involvement', 'همی‌آنوپی هومونیم مقابل، گاهی اختلال حسی در درگیری تالاموس'),
      ],
      [
        L('A. basilaris / Vertebralis', 'Basilar / vertebral arteries', 'شریان بازیلار / ورتبرال'),
        L('Hirnstamm und Kleinhirn', 'Brainstem and cerebellum', 'ساقه مغز و مخچه'),
        L('Schwindel, Ataxie, Diplopie, Dysarthrie, Bewusstseinsstörungen', 'Vertigo, ataxia, diplopia, dysarthria, impaired consciousness', 'سرگیجه، آتاکسی، دوبینی، دیزآرتری، اختلال هوشیاری'),
      ],
      [
        L('PICA (Wallenberg-Syndrom)', 'PICA (Wallenberg syndrome)', 'PICA (سندرم والنبرگ)'),
        L('Kleinhirnunterfläche, Medulla oblongata', 'Inferior cerebellar surface and medulla oblongata', 'سطح تحتانی مخچه و بصل‌النخاع'),
        L('Ipsilateral Horner-Syndrom und Ataxie; kontralaterale dissoziierte Sensibilitätsstörung für Schmerz und Temperatur', 'Ipsilateral Horner syndrome and ataxia; contralateral dissociated sensory loss for pain and temperature', 'سندرم هورنر و آتاکسی همان‌طرف؛ اختلال حسی تفکیک‌شده سمت مقابل برای درد و حرارت'),
      ],
    ],
    items: [
      {
        title: L('Sprachdominanz', 'Language dominance', 'غلبه زبانی'),
        text: L('Bei etwa 95% der Rechtshänder liegt das Sprachzentrum links. Auch bei den meisten Linkshändern ist die linke Hemisphäre sprachdominant; häufiger als bei Rechtshändern kann Sprache aber rechts oder beidseitig organisiert sein.', 'In about 95% of right-handed people, language is left-dominant. Most left-handed people are also left-dominant, although right-sided or bilateral language organisation is more common than in right-handed people.', 'در حدود ۹۵٪ راست‌دست‌ها مرکز زبان در نیمکره چپ است. در بیشتر چپ‌دست‌ها نیز نیمکره چپ غالب زبانی است، اما سازمان‌دهی راست‌طرفه یا دوطرفه زبان نسبت به راست‌دست‌ها شایع‌تر است.'),
      },
      {
        title: 'NIHSS',
        text: L('Standardisierte Schweregradeinschätzung von 0 bis 42. Ein Wert > 6 deutet auf eine deutliche funktionelle Beeinträchtigung hin; ein niedriger Wert schließt ein behinderndes Defizit nicht aus.', 'Standardised severity score from 0 to 42. A score > 6 suggests relevant functional impairment; a low score does not exclude a disabling deficit.', 'مقیاس استاندارد شدت از ۰ تا ۴۲. نمره بیش از ۶ به ناتوانی عملکردی قابل توجه اشاره دارد؛ نمره پایین نقص ناتوان‌کننده را رد نمی‌کند.'),
      },
      {
        title: L('Homonyme Hemianopsie', 'Homonymous hemianopia', 'همی‌آنوپی هومونیم'),
        text: L('Ausfall der gleichseitigen Gesichtsfeldhälften beider Augen.', 'Loss of the same-sided visual field halves in both eyes.', 'از بین رفتن نیمه‌های هم‌نام میدان بینایی در هر دو چشم.'),
      },
      {
        title: L('Mimics bedenken', 'Consider mimics', 'در نظر گرفتن تقلیدکننده‌ها'),
        text: L('Hypoglykämie, postiktale Parese, Migräne, Tumor, Enzephalitis und funktionelle Symptome können einen Schlaganfall imitieren.', 'Hypoglycaemia, postictal paresis, migraine, tumour, encephalitis and functional symptoms may mimic stroke.', 'هیپوگلیسمی، پارزی پس از تشنج، میگرن، تومور، انسفالیت و علائم عملکردی ممکن است سکته را تقلید کنند.'),
      },
    ],
    key: L('Dominante Hemisphäre: Aphasie. Nicht dominante Hemisphäre: Neglect. Meist gilt: links Aphasie, rechts Neglect.', 'Dominant hemisphere: aphasia. Non-dominant hemisphere: neglect. In most patients: left means aphasia, right means neglect.', 'نیمکره غالب: آفازی. نیمکره غیرغالب: نگلکت. در بیشتر بیماران: چپ یعنی آفازی، راست یعنی نگلکت.'),
  },
  acuteCt: {
    title: L('Multimodale CT im Akutsetting', 'Multimodal CT in the acute setting', 'CT چندوجهی در فاز حاد'),
    lead: L('Die Standardstrategie kombiniert native CCT, CT-Angiografie und bei ausgewählten Patienten CT-Perfusion.', 'The standard strategy combines non-contrast CT, CT angiography and, in selected patients, CT perfusion.', 'راهبرد استاندارد شامل CT بدون کنتراست، CTA و در بیماران منتخب CTP است.'),
    headers: [
      L('Baustein', 'Component', 'جزء'),
      L('Hauptfrage', 'Main question', 'سؤال اصلی'),
      L('Wichtige Befunde', 'Key findings', 'یافته‌های مهم'),
    ],
    rows: [
      ['NCCT', L('Blutung? Frühe Ischämie? Großer Kern?', 'Haemorrhage? Early ischaemia? Large core?', 'خونریزی؟ ایسکمی زودرس؟ هسته بزرگ؟'), L('Hyperdenses Gefäß, Verlust der Grau-Weiß-Grenze, Insular ribbon, Sulcusverstrich, ASPECTS', 'Hyperdense vessel, loss of grey-white differentiation, insular ribbon loss, sulcal effacement, ASPECTS', 'رگ هایپردنس، از بین رفتن تمایز خاکستری-سفید، محوشدن نوار اینسولا، محوشدن سولکوس و ASPECTS')],
      ['CTA', L('Wo liegt der Verschluss?', 'Where is the occlusion?', 'انسداد کجاست؟'), L('ICA-/M1-/M2-/Basilarisverschluss, Tandemläsion, Stenose, Dissektion, Kollateralen', 'ICA/M1/M2/basilar occlusion, tandem lesion, stenosis, dissection and collaterals', 'انسداد ICA/M1/M2/بازیلار، ضایعه تاندوم، تنگی، دیسکسیون و کولترال‌ها')],
      ['CTP', L('Kern oder Penumbra?', 'Core or penumbra?', 'هسته یا پنومبرا؟'), L('Kern: stark reduziertes CBF; Penumbra: verzögertes Tmax/MTT bei relativ erhaltenem Blutvolumen', 'Core: markedly reduced CBF; penumbra: delayed Tmax/MTT with relatively preserved blood volume', 'هسته: کاهش شدید CBF؛ پنومبرا: تأخیر Tmax/MTT با حجم خون نسبتاً حفظ‌شده')],
    ],
    earlySigns: [
      { title: L('Dense artery sign', 'Dense artery sign', 'علامت رگ هایپردنس'), text: L('Hyperdenses thrombosiertes Gefäß, klassisch als Dense-MCA-Zeichen.', 'Hyperdense thrombosed vessel, classically the dense MCA sign.', 'رگ ترومبوزه هایپردنس، به‌طور کلاسیک علامت MCA هایپردنس.') },
      { title: L('Insular ribbon', 'Insular ribbon', 'نوار اینسولا'), text: L('Verlust der Grau-Weiß-Differenzierung der Insula als frühes MCA-Zeichen.', 'Loss of insular grey-white differentiation as an early MCA sign.', 'از بین رفتن تمایز خاکستری-سفید اینسولا به‌عنوان علامت زودرس MCA.') },
      { title: L('Nucleus lentiformis', 'Lentiform nucleus', 'هسته لنتی‌فرم'), text: L('Verwaschene Kontur oder Hypodensität bei tiefem MCA-Befall.', 'Obscuration or low attenuation with deep MCA involvement.', 'محو شدن یا هیپودنس شدن در درگیری عمقی MCA.') },
      { title: L('Sulcal effacement', 'Sulcal effacement', 'محو شدن سولکوس'), text: L('Fokale Gyrusschwellung durch frühes zytotoxisches Ödem.', 'Focal gyral swelling caused by early cytotoxic oedema.', 'تورم فوکال ژیروس در اثر ادم سیتوتوکسیک اولیه.') },
    ],
    cave: L('Eine unauffällige frühe NCCT schließt akute Ischämie nicht aus. Bei passender Klinik Gefäßbildgebung und gegebenenfalls MRT/Perfusion fortführen.', 'A normal early NCCT does not exclude acute ischaemia. Continue with vascular imaging and, where appropriate, MRI/perfusion.', 'CT اولیه طبیعی ایسکمی حاد را رد نمی‌کند؛ در صورت تطابق بالینی CTA و در صورت لزوم MRI/پرفیوژن ادامه یابد.'),
  },
  aspects: {
    title: L('ASPECTS richtig anwenden', 'Using ASPECTS correctly', 'کاربرد صحیح ASPECTS'),
    lead: L('ASPECTS bewertet zehn definierte Regionen des MCA-Territoriums. Ausgangswert 10; für jede Region mit frühen ischämischen Veränderungen wird ein Punkt abgezogen.', 'ASPECTS evaluates ten defined MCA-territory regions. Start at 10 and subtract one point for each region with early ischaemic change.', 'ASPECTS ده ناحیه مشخص در قلمرو MCA را ارزیابی می‌کند؛ از ۱۰ شروع و برای هر ناحیه ایسکمیک یک امتیاز کم می‌شود.'),
    items: [
      { title: L('Tiefe Regionen', 'Deep regions', 'نواحی عمقی'), text: L('C = Nucleus caudatus, L = Nucleus lentiformis, IC = Capsula interna, I = Insula.', 'C = caudate, L = lentiform nucleus, IC = internal capsule, I = insula.', 'C = کودیت، L = لنتی‌فرم، IC = کپسول داخلی و I = اینسولا.') },
      { title: L('Kortikale Regionen', 'Cortical regions', 'نواحی کورتیکال'), text: L('M1–M3 auf Basalganglienhöhe und M4–M6 supraganglionär.', 'M1–M3 at basal ganglia level and M4–M6 supraganglionic.', 'M1 تا M3 در سطح گانگلیون‌های قاعده‌ای و M4 تا M6 در سطح سوپراگانگلیونیک.') },
      { title: L('Interpretation', 'Interpretation', 'تفسیر'), text: L('Je niedriger der Score, desto größer die frühe Infarktausdehnung. Kein isoliertes absolutes Ausschlusskriterium.', 'The lower the score, the larger the early infarct extent. It is not an isolated absolute exclusion criterion.', 'هرچه نمره پایین‌تر باشد وسعت انفارکت بیشتر است؛ این نمره به‌تنهایی معیار مطلق حذف درمان نیست.') },
    ],
    imageAlt: L('ASPECTS-Schema mit den zehn MCA-Regionen', 'ASPECTS diagram showing the ten MCA regions', 'نمودار ASPECTS با ده ناحیه MCA'),
    key: L('ASPECTS bewertet Parenchymveränderungen, nicht den Gefäßverschluss selbst.', 'ASPECTS scores parenchymal change, not the vessel occlusion itself.', 'ASPECTS تغییرات پارانشیم را امتیازدهی می‌کند، نه خود انسداد عروقی را.'),
  },
  ctTimeline: {
    title: L('CT-Veränderungen im Zeitverlauf', 'CT changes over time', 'تغییرات CT در طول زمان'),
    lead: L('Parenchymdichte, Ödem, Kontrastmittelaufnahme und Raumforderung verändern sich charakteristisch.', 'Parenchymal density, oedema, enhancement and mass effect evolve in a characteristic pattern.', 'دانسیته پارانشیم، ادم، جذب کنتراست و اثر فضاگیر به‌صورت مشخص تغییر می‌کنند.'),
    imageAlt: L('CT-Veränderungen beim ischämischen Schlaganfall im Zeitverlauf', 'Temporal CT changes in ischaemic stroke', 'تغییرات زمانی CT در سکته ایسکمیک'),
    items: [
      { title: '< 6 h', text: L('CT kann unauffällig sein; Gefäß- und Parenchymfrühzeichen aktiv suchen.', 'CT may be normal; actively search for vascular and parenchymal early signs.', 'CT ممکن است طبیعی باشد؛ علائم زودرس عروقی و پارانشیمی فعالانه جستجو شوند.') },
      { title: '12–24 h', text: L('Territoriale Hypodensität und Schwellung werden deutlicher.', 'Territorial low attenuation and swelling become more conspicuous.', 'هیپودنسیتی قلمرویی و تورم واضح‌تر می‌شوند.') },
      { title: 'Tag 1–5', text: L('Ödem und Raumforderung maximal; Herniationsgefahr und hämorrhagische Transformation.', 'Oedema and mass effect peak; risk of herniation and haemorrhagic transformation.', 'ادم و اثر فضاگیر به اوج می‌رسند؛ خطر هرنیاسیون و تبدیل هموراژیک.') },
      { title: 'Woche 2–3', text: L('Fogging-Effekt kann den Infarkt vorübergehend isodens erscheinen lassen.', 'Fogging may make the infarct temporarily isodense.', 'اثر Fogging ممکن است انفارکت را موقتاً ایزودنس نشان دهد.') },
      { title: 'Ab Woche 6', text: L('Enzephalomalazie mit liquordichtem Defekt und Ex-vacuo-Erweiterung.', 'Encephalomalacia with CSF-density tissue loss and ex-vacuo dilatation.', 'انسفالومالاسی با نقص هم‌دانسیته CSF و اتساع ex-vacuo.') },
    ],
  },
  mri: {
    title: L('MRT-Schlaganfallprotokoll', 'MRI stroke protocol', 'پروتکل MRI سکته'),
    lead: L('Die MRT ist besonders sensitiv für kleine, frühe und posterior gelegene Infarkte sowie bei unklarem Symptombeginn.', 'MRI is particularly sensitive for small, early and posterior circulation infarcts and when onset is unknown.', 'MRI برای انفارکت‌های کوچک، زودرس، گردش خلفی و زمان شروع نامشخص حساسیت بالایی دارد.'),
    headers: [L('Sequenz', 'Sequence', 'سکانس'), L('Akutbefund', 'Acute finding', 'یافته حاد'), L('Nutzen', 'Purpose', 'کاربرد')],
    rows: [
      ['DWI + ADC', L('DWI hyperintens, ADC vermindert', 'DWI high, ADC low', 'DWI بالا و ADC پایین'), L('Frühester Nachweis des zytotoxischen Ödems; echte Restriktion bestätigen', 'Earliest detection of cytotoxic oedema; confirms true restriction', 'زودترین تشخیص ادم سیتوتوکسیک و تأیید محدودیت واقعی')],
      ['FLAIR/T2', L('Früh oft unauffällig, später hyperintens und geschwollen', 'Often normal early, then high signal and swelling', 'ابتدا اغلب طبیعی و سپس هایپراینتنس و متورم'), L('Infarktalter, Ödem und DWI-FLAIR-Mismatch', 'Infarct age, oedema and DWI-FLAIR mismatch', 'سن انفارکت، ادم و عدم تطابق DWI-FLAIR')],
      ['T2*/SWI', L('Suszeptibilitätszeichen oder Einblutung', 'Susceptibility vessel sign or haemorrhage', 'علامت حساسیت عروقی یا خونریزی'), L('Blutung, Mikroblutungen und Thrombus erkennen', 'Detect haemorrhage, microbleeds and thrombus', 'تشخیص خونریزی، میکروبلید و ترومبوس')],
      ['MRA', L('Fehlender Flow im verschlossenen Gefäß', 'Absent flow in the occluded vessel', 'عدم جریان در رگ مسدود'), L('Nicht-invasive Gefäßdarstellung, häufig TOF', 'Non-invasive vascular imaging, often TOF', 'تصویربرداری غیرتهاجمی عروق، اغلب TOF')],
      ['PWI', L('Perfusionsdefizit größer als DWI-Kern', 'Perfusion deficit larger than DWI core', 'نقص پرفیوژن بزرگ‌تر از هسته DWI'), L('DWI-PWI-Mismatch als Hinweis auf Penumbra', 'DWI-PWI mismatch suggests penumbra', 'عدم تطابق DWI-PWI به نفع پنومبرا')],
    ],
    mismatchTitle: L('DWI-FLAIR-Mismatch', 'DWI-FLAIR mismatch', 'عدم تطابق DWI-FLAIR'),
    mismatchText: L('DWI positiv bei noch fehlender deutlicher FLAIR-Hyperintensität spricht für einen wahrscheinlich frühen Infarkt und kann bei unbekanntem Beginn die Reperfusionsauswahl unterstützen.', 'Positive DWI without marked FLAIR hyperintensity suggests an early infarct and may support reperfusion selection when onset is unknown.', 'DWI مثبت بدون هایپراینتنس واضح FLAIR به نفع انفارکت زودرس است و در شروع نامشخص می‌تواند به انتخاب بازپرفیوژن کمک کند.'),
    cave: L('DWI-Hyperintensität allein beweist keine fortbestehende Restriktion: ADC prüfen, da ab etwa Tag 10 T2-shine-through auftreten kann.', 'DWI hyperintensity alone does not prove ongoing restriction: check ADC because T2 shine-through may occur from about day 10.', 'هایپراینتنس DWI به‌تنهایی محدودیت فعال را ثابت نمی‌کند؛ ADC بررسی شود زیرا از حدود روز ۱۰ T2 shine-through ممکن است رخ دهد.'),
  },
  mriTimeline: {
    title: L('MRT-Signalverlauf', 'MRI signal evolution', 'سیر سیگنال MRI'),
    lead: L('DWI reagiert zuerst; ADC pseudonormalisiert später, während T2/FLAIR und Enhancement länger persistieren.', 'DWI changes first; ADC later pseudonormalises while T2/FLAIR abnormality and enhancement persist longer.', 'DWI زودتر تغییر می‌کند؛ ADC بعداً شبه‌طبیعی می‌شود و تغییرات T2/FLAIR و enhancement طولانی‌تر باقی می‌مانند.'),
    imageAlt: L('MRT-Signalveränderungen beim ischämischen Schlaganfall im Zeitverlauf', 'Temporal MRI signal changes in ischaemic stroke', 'تغییرات زمانی سیگنال MRI در سکته ایسکمیک'),
  },
  pitfalls: {
    title: L('Fallstricke und Verlaufskomplikationen', 'Pitfalls and complications', 'دام‌ها و عوارض سیر بیماری'),
    lead: L('Subakute Veränderungen können Blutung oder Tumor imitieren und verlangen die gemeinsame Bewertung aller Sequenzen und des zeitlichen Verlaufs.', 'Subacute changes may mimic haemorrhage or tumour and require combined assessment of all sequences and the timeline.', 'تغییرات تحت‌حاد ممکن است خونریزی یا تومور را تقلید کنند و نیازمند ارزیابی همزمان سکانس‌ها و سیر زمانی هستند.'),
    items: [
      { title: L('Hämorrhagische Transformation', 'Haemorrhagic transformation', 'تبدیل هموراژیک'), text: L('Petechiale Einblutung bis Parenchymhämatom; in NCCT hyperdens und in T2*/SWI suszeptibel.', 'Ranges from petechial haemorrhage to parenchymal haematoma; hyperdense on NCCT and susceptible on T2*/SWI.', 'از خونریزی پتشیال تا هماتوم پارانشیمی؛ در NCCT هایپردنس و در T2*/SWI دارای susceptibility.') },
      { title: L('Fogging-Effekt', 'Fogging effect', 'اثر Fogging'), text: L('Vorübergehende Normalisierung der CT-Dichte beziehungsweise Abschwächung des T2-Signals in der subakuten Phase.', 'Temporary normalisation of CT density or attenuation of T2 abnormality in the subacute phase.', 'طبیعی‌شدن موقت دانسیته CT یا کاهش تغییرات T2 در فاز تحت‌حاد.') },
      { title: L('Luxusperfusion', 'Luxury perfusion', 'پرفیوژن لوکس'), text: L('Hyperämie nach Reperfusion bei gestörter Autoregulation; Enhancement und erhöhtes CBF sind nicht automatisch Tumor.', 'Post-reperfusion hyperaemia from impaired autoregulation; enhancement and raised CBF do not automatically indicate tumour.', 'هایپرمی پس از بازپرفیوژن به‌دلیل اختلال اتورگولاسیون؛ enhancement و CBF بالا الزاماً تومور نیستند.') },
      { title: L('Maligner MCA-Infarkt', 'Malignant MCA infarction', 'انفارکت بدخیم MCA'), text: L('Ausgedehntes Ödem mit Mittellinienverlagerung und Herniationsgefahr, typischerweise in den ersten Tagen.', 'Extensive oedema with midline shift and risk of herniation, typically during the first days.', 'ادم وسیع با شیفت خط وسط و خطر هرنیاسیون، معمولاً در روزهای نخست.') },
    ],
    cave: L('Gyriformes Enhancement in einem passenden vaskulären Territorium kann subakut normal sein. Klinischer Verlauf, DWI/ADC und Voraufnahmen verhindern die Fehldiagnose eines Tumors.', 'Gyriform enhancement in an appropriate vascular territory may be normal subacutely. Clinical course, DWI/ADC and prior imaging help avoid a false tumour diagnosis.', 'enhancement ژیری‌فرم در قلمرو عروقی مناسب می‌تواند در فاز تحت‌حاد طبیعی باشد؛ سیر بالینی، DWI/ADC و تصاویر قبلی مانع تشخیص اشتباه تومور می‌شوند.'),
  },
  treatment: {
    title: L('Reperfusion und strukturierte Befundung', 'Reperfusion and structured reporting', 'بازپرفیوژن و گزارش ساختاریافته'),
    lead: L('Die Bildgebung soll die schnellste sichere Therapieentscheidung ermöglichen. Nach der AHA/ASA-Leitlinie 2026 sind Alteplase oder Tenecteplase innerhalb des geeigneten intravenösen Lysefensters Optionen; die Thrombektomieauswahl kann bei geeigneter Bildgebung bis 24 Stunden reichen.', 'Imaging should enable the fastest safe treatment decision. The 2026 AHA/ASA guideline supports alteplase or tenecteplase in eligible patients within the intravenous thrombolysis window; selected patients may undergo thrombectomy up to 24 hours with appropriate imaging.', 'تصویربرداری باید سریع‌ترین تصمیم درمانی ایمن را ممکن کند. بر اساس راهنمای AHA/ASA سال ۲۰۲۶، آلتپلاز یا تنکتپلاز در بیماران واجد شرایط در پنجره ترومبولیز وریدی قابل استفاده‌اند و ترومبکتومی در بیماران منتخب با تصویربرداری مناسب تا ۲۴ ساعت ممکن است.')
    ,
    items: [
      { title: L('IV-Thrombolyse', 'IV thrombolysis', 'ترومبولیز وریدی'), text: L('Bei geeignetem behinderndem Defizit und fehlenden Kontraindikationen so früh wie möglich; Standardfenster bis 4,5 Stunden, erweiterte Auswahl in definierten Mismatch-Situationen.', 'For eligible disabling deficits without contraindications, treat as early as possible; standard window up to 4.5 hours with extended selection in defined mismatch settings.', 'در نقص ناتوان‌کننده واجد شرایط و بدون منع، هرچه زودتر؛ پنجره استاندارد تا ۴٫۵ ساعت و انتخاب گسترده‌تر در شرایط مشخص mismatch.') },
      { title: L('Mechanische Thrombektomie', 'Mechanical thrombectomy', 'ترومبکتومی مکانیکی'), text: L('Standard bei geeignetem Großgefäßverschluss; bei ausgewählten Patienten einschließlich bestimmter großer Infarktkerne bis 24 Stunden.', 'Standard for eligible large-vessel occlusion; selected patients, including some with large cores, may benefit up to 24 hours.', 'استاندارد برای انسداد عروق بزرگ واجد شرایط؛ در بیماران منتخب از جمله برخی هسته‌های بزرگ تا ۲۴ ساعت.') },
      { title: L('Nicht verzögern', 'Do not delay', 'عدم تأخیر'), text: L('Perfusions- oder MRT-Zusatzbildgebung darf eine klar indizierte Therapie im frühen Zeitfenster nicht unnötig verzögern.', 'Additional perfusion or MRI must not unnecessarily delay clearly indicated early-window treatment.', 'CTP یا MRI اضافی نباید درمان واضح در پنجره زودرس را بی‌دلیل به تأخیر اندازد.') },
    ],
    reportItems: [
      { title: L('1. Blutung und Mimic', '1. Haemorrhage and mimic', '۱. خونریزی و تقلیدکننده'), text: L('Intrakranielle Blutung, Raumforderung oder andere akute Alternative?', 'Any intracranial haemorrhage, mass lesion or alternative acute diagnosis?', 'آیا خونریزی داخل جمجمه، توده یا تشخیص حاد دیگری وجود دارد؟') },
      { title: L('2. Frühischämie', '2. Early ischaemia', '۲. ایسکمی زودرس'), text: L('Seite, Gefäßterritorium, betroffene Strukturen und ASPECTS angeben.', 'Report side, vascular territory, involved structures and ASPECTS.', 'سمت، قلمرو عروقی، ساختارهای درگیر و ASPECTS ذکر شود.') },
      { title: L('3. Gefäßverschluss', '3. Vessel occlusion', '۳. انسداد عروقی'), text: L('Exakte Verschlusshöhe, Tandemläsion, Stenose/Dissektion und Kollateralstatus.', 'Exact occlusion site, tandem lesion, stenosis/dissection and collateral status.', 'محل دقیق انسداد، ضایعه تاندوم، تنگی/دیسکسیون و وضعیت کولترال‌ها.') },
      { title: L('4. Kern und Penumbra', '4. Core and penumbra', '۴. هسته و پنومبرا'), text: L('Bei Perfusion: Kernvolumen, Mismatch und technische Limitationen nennen.', 'For perfusion imaging, state core volume, mismatch and technical limitations.', 'در پرفیوژن، حجم هسته، mismatch و محدودیت‌های فنی ذکر شوند.') },
      { title: L('5. Komplikationen', '5. Complications', '۵. عوارض'), text: L('Ödem, Mittellinienverlagerung, Herniation oder hämorrhagische Transformation.', 'Oedema, midline shift, herniation or haemorrhagic transformation.', 'ادم، شیفت خط وسط، هرنیاسیون یا تبدیل هموراژیک.') },
    ],
    key: L('Ein guter Akutbefund beantwortet drei Fragen: Blutung? Verschluss? Wie viel Gewebe ist bereits infarziert und wie viel potenziell rettbar?', 'A good acute report answers three questions: haemorrhage? occlusion? how much tissue is infarcted and how much may still be salvageable?', 'گزارش حاد خوب به سه سؤال پاسخ می‌دهد: خونریزی؟ انسداد؟ چه مقدار بافت انفارکت شده و چه مقدار قابل نجات است؟'),
  },
  cases: {
    title: L('Zwei Radiopaedia-Fallbeispiele', 'Two Radiopaedia cases', 'دو کیس Radiopaedia'),
    lead: L('Die Fälle ergänzen sich: ein klassisches frühes CT-Zeichen und ein subtiler CT-Befund mit deutlich positiver DWI.', 'The cases complement each other: a classic early CT sign and subtle CT changes with clearly positive DWI.', 'این دو کیس مکمل یکدیگرند: علامت کلاسیک اولیه CT و یافته ظریف CT با DWI واضحاً مثبت.'),
  },
  takehome: {
    title: L('Take home message', 'Take-home messages', 'نکات کلیدی'),
    lead: L('Die wichtigsten Regeln für die Akutdiagnostik.', 'The essential rules for acute imaging.', 'قواعد اصلی تصویربرداری حاد.'),
    items: [
      { title: L('NCCT kann früh normal sein', 'Early NCCT may be normal', 'NCCT اولیه ممکن است طبیعی باشد'), text: L('Klinik und Gefäßbildgebung bleiben entscheidend.', 'Clinical findings and vascular imaging remain decisive.', 'علائم بالینی و تصویربرداری عروقی تعیین‌کننده می‌مانند.') },
      { title: L('CTA lokalisiert die LVO', 'CTA localises LVO', 'CTA محل LVO را مشخص می‌کند'), text: L('Verschlusshöhe, Tandemläsion und Kollateralen beeinflussen die Therapie.', 'Occlusion level, tandem lesions and collaterals affect treatment.', 'سطح انسداد، ضایعه تاندوم و کولترال‌ها بر درمان اثر دارند.') },
      { title: L('DWI immer mit ADC', 'Always pair DWI with ADC', 'DWI همیشه همراه ADC'), text: L('Nur DWI hoch plus ADC niedrig beweist echte akute Restriktion.', 'Only high DWI with low ADC confirms true acute restriction.', 'فقط DWI بالا همراه ADC پایین محدودیت واقعی حاد را تأیید می‌کند.') },
      { title: L('Zeitverlauf verhindert Fehler', 'Timeline prevents errors', 'سیر زمانی از خطا جلوگیری می‌کند'), text: L('Fogging, Enhancement und Shine-through sind ohne zeitlichen Kontext irreführend.', 'Fogging, enhancement and shine-through are misleading without temporal context.', 'Fogging، enhancement و shine-through بدون زمینه زمانی گمراه‌کننده‌اند.') },
      { title: L('Therapie nicht unnötig verzögern', 'Do not delay treatment unnecessarily', 'درمان را بی‌دلیل به تأخیر نیندازید'), text: L('Zusatzbildgebung gezielt einsetzen und Reperfusionskandidaten rasch erkennen.', 'Use additional imaging selectively and identify reperfusion candidates rapidly.', 'تصویربرداری تکمیلی هدفمند و شناسایی سریع کاندیدهای بازپرفیوژن.') },
    ],
  },
}

export const STROKE_LEARNING_CASES = [
  {
    id: 'dense-mca',
    image: '/stroke/case-dense-mca-rid-45310.png',
    url: 'https://radiopaedia.org/cases/acute-ischaemic-stroke-dense-mca-sign?lang=us',
    credit: 'Case courtesy of Gaurav Som Prakash Gupta, Radiopaedia.org · rID-45310 · CC BY-NC-SA 3.0',
    label: L('CT-Frühzeichen', 'Early CT sign', 'علامت زودرس CT'),
    title: L('Akuter linker MCA-Infarkt mit Dense-MCA-Zeichen', 'Acute left MCA infarct with dense MCA sign', 'انفارکت حاد MCA چپ با علامت MCA هایپردنس'),
    text: L(
      '80-jährige Patientin mit akuter Aphasie und rechtsseitiger Schwäche. NCCT zeigt ein hyperdenses linkes MCA-Segment, Verlust des Insular ribbon und beginnende Hypodensität im linken MCA-Territorium.',
      'An 80-year-old woman with acute aphasia and right-sided weakness. NCCT shows a dense left MCA segment, loss of the insular ribbon and early low attenuation in the left MCA territory.',
      'خانم ۸۰ ساله با آفازی حاد و ضعف سمت راست؛ NCCT سگمان هایپردنس MCA چپ، محوشدن نوار اینسولا و هیپودنسیتی اولیه در قلمرو MCA چپ را نشان می‌دهد.'
    ),
    alt: L('Native CCT mit hyperdensem linken MCA-Zeichen', 'Non-contrast CT with a dense left MCA sign', 'CT بدون کنتراست با علامت MCA هایپردنس چپ'),
  },
  {
    id: 'ct-dwi',
    images: ['/stroke/case-left-mca-ct-rid-78956.png', '/stroke/case-left-mca-dwi-rid-78956.jpg'],
    url: 'https://radiopaedia.org/cases/left-mca-acute-ischaemic-stroke?lang=us',
    credit: 'Case courtesy of Abdulrahman Abdo Ali Abbas, Radiopaedia.org · rID-78956 · CC BY-NC-SA 3.0',
    label: L('CT–DWI-Korrelation', 'CT–DWI correlation', 'همبستگی CT و DWI'),
    title: L('Subtiler CT-Befund, deutliche DWI-Restriktion', 'Subtle CT findings with clear DWI restriction', 'یافته ظریف CT با محدودیت واضح DWI'),
    text: L(
      '30-jährige Patientin fünf Tage postpartal mit akuter Aphasie und rechtsseitiger Parese. CT zeigt nur diskrete Grau-Weiß-Verwaschung; DWI/ADC bestätigt den akuten distalen linken MCA-Infarkt.',
      'A 30-year-old woman five days postpartum presents with aphasia and right-sided paresis. CT shows only subtle grey-white blurring; DWI/ADC confirms an acute distal left MCA infarct.',
      'خانم ۳۰ ساله پنج روز پس از زایمان با آفازی و پارزی راست؛ CT فقط محوشدگی ظریف خاکستری-سفید و DWI/ADC انفارکت حاد دیستال MCA چپ را تأیید می‌کند.'
    ),
    alt: L('CT und DWI eines akuten linken MCA-Infarkts', 'CT and DWI of an acute left MCA infarct', 'CT و DWI انفارکت حاد MCA چپ'),
  },
]

const QUESTION_SEEDS = [
  {
    id: 'first-imaging',
    question: L('Welche Untersuchung ist beim akuten Schlaganfall typischerweise der erste Bildgebungsschritt?', 'What is typically the first imaging step in acute stroke?', 'در سکته حاد معمولاً اولین روش تصویربرداری کدام است؟'),
    options: [
      L('Native kraniale CT', 'Non-contrast head CT', 'CT بدون کنتراست مغز'),
      L('Kontrastverstärkte T1-MRT', 'Contrast-enhanced T1 MRI', 'MRI T1 با کنتراست'),
      L('Konventionelle Angiografie ohne Vorbildgebung', 'Catheter angiography without prior imaging', 'آنژیوگرافی کاتتر بدون تصویربرداری قبلی'),
      L('PET-CT', 'PET-CT', 'PET-CT'),
    ],
    correct: 'A',
    explanation: L('Die native CCT ist schnell verfügbar und dient primär zum Ausschluss einer intrakraniellen Blutung sowie zur Erfassung früher Ischämiezeichen.', 'NCCT is rapidly available and primarily excludes intracranial haemorrhage while assessing early ischaemic change.', 'NCCT سریع در دسترس است و برای رد خونریزی داخل جمجمه و بررسی علائم اولیه ایسکمی استفاده می‌شود.'),
  },
  {
    id: 'dense-mca',
    question: L('Was bedeutet ein Dense-MCA-Zeichen in der nativen CCT?', 'What does a dense MCA sign on NCCT represent?', 'علامت MCA هایپردنس در NCCT نشان‌دهنده چیست؟'),
    options: [
      L('Verkalkung des Plexus choroideus', 'Choroid plexus calcification', 'کلسیفیکاسیون شبکه کوروئید'),
      L('Akuter Thrombus in der A. cerebri media', 'Acute thrombus in the middle cerebral artery', 'ترومبوس حاد در شریان مغزی میانی'),
      L('Subarachnoidalblutung', 'Subarachnoid haemorrhage', 'خونریزی ساب‌آراکنوئید'),
      L('Chronische Mikroangiopathie', 'Chronic small-vessel disease', 'میکروآنژیوپاتی مزمن'),
    ],
    correct: 'B',
    explanation: L('Das hyperdense Gefäß entspricht häufig einem akuten intraluminalen Thrombus und ist ein frühes indirektes Zeichen eines MCA-Verschlusses.', 'The hyperdense vessel commonly reflects acute intraluminal thrombus and is an early indirect sign of MCA occlusion.', 'رگ هایپردنس معمولاً ناشی از ترومبوس حاد داخل‌لومنی و علامت غیرمستقیم انسداد MCA است.'),
  },
  {
    id: 'insular-ribbon',
    question: L('Welcher frühe CT-Befund wird als „Insular-ribbon-Zeichen“ bezeichnet?', 'Which early CT finding is called the insular ribbon sign?', 'کدام یافته زودرس CT علامت نوار اینسولا نام دارد؟'),
    options: [
      L('Hyperdensität der Falx', 'Hyperdensity of the falx', 'هایپردنسیتی فالکس'),
      L('Verlust der Grau-Weiß-Differenzierung der Insula', 'Loss of insular grey-white differentiation', 'از بین رفتن تمایز خاکستری-سفید اینسولا'),
      L('Erweiterung des Seitenventrikels', 'Lateral ventricular enlargement', 'اتساع بطن جانبی'),
      L('Verkalkung der Basalganglien', 'Basal ganglia calcification', 'کلسیفیکاسیون گانگلیون‌های قاعده‌ای'),
    ],
    correct: 'B',
    explanation: L('Die Insula ist bei MCA-Ischämie häufig früh betroffen; ihre normale kortikale Abgrenzung geht verloren.', 'The insula is often affected early in MCA ischaemia and its normal cortical definition is lost.', 'اینسولا در ایسکمی MCA اغلب زود درگیر شده و مرزبندی طبیعی کورتکس آن از بین می‌رود.'),
  },
  {
    id: 'aspects',
    question: L('Wie wird der ASPECTS berechnet?', 'How is ASPECTS calculated?', 'ASPECTS چگونه محاسبه می‌شود؟'),
    options: [
      L('Start bei 0, pro normale Region +1', 'Start at 0 and add 1 for each normal region', 'شروع از ۰ و افزودن ۱ برای هر ناحیه طبیعی'),
      L('Start bei 10, pro ischämische Region −1', 'Start at 10 and subtract 1 for each ischaemic region', 'شروع از ۱۰ و کم کردن ۱ برای هر ناحیه ایسکمیک'),
      L('Anzahl hyperdenser Gefäße', 'Number of hyperdense vessels', 'تعداد عروق هایپردنس'),
      L('Volumen des Perfusionsdefizits in Millilitern', 'Perfusion deficit volume in millilitres', 'حجم نقص پرفیوژن به میلی‌لیتر'),
    ],
    correct: 'B',
    explanation: L('ASPECTS beginnt bei 10. Jede der zehn MCA-Regionen mit frühen ischämischen Veränderungen reduziert den Score um einen Punkt.', 'ASPECTS begins at 10; each of ten MCA regions with early ischaemic change reduces the score by one.', 'ASPECTS از ۱۰ شروع می‌شود و هر ناحیه ایسکمیک از ده ناحیه MCA یک امتیاز کم می‌کند.'),
  },
  {
    id: 'cta',
    question: L('Welche Hauptinformation liefert die CT-Angiografie im Akutsetting?', 'What is the main information provided by CTA in acute stroke?', 'اطلاعات اصلی CTA در سکته حاد چیست؟'),
    options: [
      L('Exakte ADC-Werte', 'Exact ADC values', 'مقادیر دقیق ADC'),
      L('Verschlusshöhe, Stenosen und Kollateralstatus', 'Occlusion level, stenoses and collateral status', 'سطح انسداد، تنگی‌ها و وضعیت کولترال‌ها'),
      L('Histologische Infarktart', 'Histological infarct type', 'نوع هیستولوژیک انفارکت'),
      L('NIHSS-Score', 'NIHSS score', 'نمره NIHSS'),
    ],
    correct: 'B',
    explanation: L('CTA lokalisiert den Gefäßverschluss und zeigt zusätzliche vaskuläre Befunde, die für die Thrombektomieplanung wichtig sind.', 'CTA localises the occlusion and shows additional vascular findings important for thrombectomy planning.', 'CTA محل انسداد و یافته‌های عروقی مهم برای برنامه‌ریزی ترومبکتومی را نشان می‌دهد.'),
  },
  {
    id: 'perfusion-mismatch',
    question: L('Was beschreibt ein relevantes Perfusions-Mismatch?', 'What does a relevant perfusion mismatch indicate?', 'عدم تطابق مهم پرفیوژن چه چیزی را نشان می‌دهد؟'),
    options: [
      L('Perfusionsdefizit und Infarktkern sind gleich groß', 'Perfusion deficit and infarct core are identical', 'نقص پرفیوژن و هسته انفارکت هم‌اندازه‌اند'),
      L('Perfusionsdefizit ist größer als der irreversible Kern', 'Perfusion deficit is larger than the irreversible core', 'نقص پرفیوژن بزرگ‌تر از هسته غیرقابل برگشت است'),
      L('Nur eine Blutung ist sichtbar', 'Only haemorrhage is visible', 'فقط خونریزی دیده می‌شود'),
      L('Normale Perfusion bei großem DWI-Kern', 'Normal perfusion with a large DWI core', 'پرفیوژن طبیعی با هسته بزرگ DWI'),
    ],
    correct: 'B',
    explanation: L('Die Differenz entspricht potenziell rettbarer Penumbra und kann die Reperfusionsauswahl im erweiterten Zeitfenster unterstützen.', 'The difference represents potentially salvageable penumbra and may support reperfusion selection in extended windows.', 'این اختلاف نمایانگر پنومبرای قابل نجات است و در پنجره زمانی گسترده به انتخاب بازپرفیوژن کمک می‌کند.'),
  },
  {
    id: 'dwi-adc',
    question: L('Welche Kombination beweist eine echte akute Diffusionsrestriktion?', 'Which combination confirms true acute diffusion restriction?', 'کدام ترکیب محدودیت واقعی انتشار حاد را تأیید می‌کند؟'),
    options: [
      L('DWI dunkel, ADC hoch', 'Low DWI, high ADC', 'DWI پایین و ADC بالا'),
      L('DWI hell, ADC niedrig', 'High DWI, low ADC', 'DWI بالا و ADC پایین'),
      L('DWI hell, ADC hoch', 'High DWI, high ADC', 'DWI بالا و ADC بالا'),
      L('FLAIR dunkel, T1 hell', 'Low FLAIR, high T1', 'FLAIR پایین و T1 بالا'),
    ],
    correct: 'B',
    explanation: L('Akutes zytotoxisches Ödem führt zu hoher DWI-Signalintensität und erniedrigtem ADC.', 'Acute cytotoxic oedema produces high DWI signal and low ADC.', 'ادم سیتوتوکسیک حاد باعث افزایش DWI و کاهش ADC می‌شود.'),
  },
  {
    id: 'dwi-flair',
    question: L('Was spricht ein DWI-FLAIR-Mismatch typischerweise an?', 'What does a DWI-FLAIR mismatch typically suggest?', 'عدم تطابق DWI-FLAIR معمولاً به نفع چیست؟'),
    options: [
      L('Wahrscheinlich früher Infarkt bei unklarem Beginn', 'Likely early infarct when onset is unknown', 'احتمال انفارکت زودرس با زمان شروع نامشخص'),
      L('Chronische Enzephalomalazie', 'Chronic encephalomalacia', 'انسفالومالاسی مزمن'),
      L('Sichere intrazerebrale Blutung', 'Definite intracerebral haemorrhage', 'خونریزی قطعی داخل مغزی'),
      L('Normalbefund', 'Normal examination', 'یافته طبیعی'),
    ],
    correct: 'A',
    explanation: L('DWI-positive und noch nicht deutlich FLAIR-positive Läsionen sind häufig relativ frisch und können bei Wake-up-Stroke relevant sein.', 'A DWI-positive lesion without marked FLAIR change is often relatively recent and may be relevant in wake-up stroke.', 'ضایعه DWI مثبت بدون تغییر واضح FLAIR اغلب تازه است و در Wake-up stroke اهمیت دارد.'),
  },
  {
    id: 'swi',
    question: L('Welche Sequenz ist besonders wichtig zum Nachweis von Einblutung und Suszeptibilitätszeichen?', 'Which sequence is particularly important for haemorrhage and susceptibility signs?', 'کدام سکانس برای خونریزی و علائم susceptibility مهم است؟'),
    options: [L('T1 ohne KM', 'Unenhanced T1', 'T1 بدون کنتراست'), L('T2*/SWI', 'T2*/SWI', 'T2*/SWI'), L('TOF allein', 'TOF alone', 'فقط TOF'), L('MRCP', 'MRCP', 'MRCP')],
    correct: 'B',
    explanation: L('T2*-gewichtete und suszeptibilitätsgewichtete Sequenzen reagieren empfindlich auf Blutabbauprodukte und thrombotisches Suszeptibilitätssignal.', 'T2*-weighted and susceptibility-weighted sequences are sensitive to blood products and thrombus susceptibility.', 'T2* و SWI به محصولات خون و susceptibility ترومبوس حساس‌اند.'),
  },
  {
    id: 'fogging',
    question: L('Was ist der Fogging-Effekt?', 'What is the fogging effect?', 'اثر Fogging چیست؟'),
    options: [
      L('Vorübergehende scheinbare Normalisierung eines subakuten Infarkts', 'Temporary apparent normalisation of a subacute infarct', 'طبیعی به نظر رسیدن موقت انفارکت تحت‌حاد'),
      L('Dauerhafte Verkalkung des Infarkts', 'Permanent infarct calcification', 'کلسیفیکاسیون دائمی انفارکت'),
      L('Akute Kontrastmittelallergie', 'Acute contrast allergy', 'حساسیت حاد به کنتراست'),
      L('Artefakt durch Metall', 'Metal artefact', 'آرتیفکت فلزی'),
    ],
    correct: 'A',
    explanation: L('In der subakuten Phase kann die Läsion vorübergehend isodens beziehungsweise weniger T2-auffällig werden und dadurch übersehen werden.', 'In the subacute phase the lesion may temporarily become isodense or less conspicuous on T2 and be overlooked.', 'در فاز تحت‌حاد ضایعه ممکن است موقتاً ایزودنس یا در T2 کم‌واضح شود و نادیده بماند.'),
  },
  {
    id: 'shine-through',
    question: L('Woran erkennt man T2-shine-through statt echter Restriktion?', 'How is T2 shine-through distinguished from true restriction?', 'چگونه T2 shine-through از محدودیت واقعی افتراق داده می‌شود؟'),
    options: [
      L('DWI hell und ADC ebenfalls normal/erhöht', 'High DWI with normal or high ADC', 'DWI بالا با ADC طبیعی یا بالا'),
      L('DWI hell und ADC deutlich niedrig', 'High DWI with markedly low ADC', 'DWI بالا با ADC به‌شدت پایین'),
      L('T1 hyperintens und SWI normal', 'High T1 and normal SWI', 'T1 بالا و SWI طبیعی'),
      L('Nur durch CTA', 'Only by CTA', 'فقط با CTA'),
    ],
    correct: 'A',
    explanation: L('Beim Shine-through bleibt DWI wegen des T2-Anteils hell, während ADC nicht mehr erniedrigt ist.', 'With shine-through DWI remains bright because of T2 contribution while ADC is no longer reduced.', 'در Shine-through، DWI به علت مؤلفه T2 روشن می‌ماند ولی ADC دیگر کاهش ندارد.'),
  },
  {
    id: 'oedema-peak',
    question: L('Wann sind Ödem und Raumforderung eines großen Infarkts typischerweise am stärksten?', 'When do oedema and mass effect from a large infarct typically peak?', 'ادم و اثر فضاگیر انفارکت بزرگ معمولاً چه زمانی به اوج می‌رسند؟'),
    options: [L('In den ersten 10 Minuten', 'Within the first 10 minutes', 'در ۱۰ دقیقه اول'), L('Etwa Tag 3–5', 'Around days 3–5', 'حدود روز ۳ تا ۵'), L('Nach 6 Monaten', 'After 6 months', 'پس از ۶ ماه'), L('Nur nach Kontrastmittel', 'Only after contrast', 'فقط پس از کنتراست')],
    correct: 'B',
    explanation: L('Das Infarktödem nimmt über die ersten Tage zu und erreicht häufig um Tag 3–5 sein Maximum.', 'Infarct oedema increases over the first days and often peaks around days 3–5.', 'ادم انفارکت طی روزهای اول افزایش یافته و اغلب در روز ۳ تا ۵ بیشینه می‌شود.'),
  },
  {
    id: 'haemorrhagic-transformation',
    question: L('Welche Methode erkennt kleine hämorrhagische Transformationen besonders sensitiv?', 'Which method is particularly sensitive for small haemorrhagic transformation?', 'کدام روش برای تبدیل هموراژیک کوچک حساس‌تر است؟'),
    options: [L('T2*/SWI', 'T2*/SWI', 'T2*/SWI'), L('Nur FLAIR', 'FLAIR only', 'فقط FLAIR'), L('Ultraschall', 'Ultrasound', 'سونوگرافی'), L('Röntgen Schädel', 'Skull radiograph', 'رادیوگرافی جمجمه')],
    correct: 'A',
    explanation: L('Suszeptibilitätssequenzen zeigen auch kleine Blutprodukte als Signalverlust.', 'Susceptibility sequences demonstrate even small blood products as signal loss.', 'سکانس‌های susceptibility حتی محصولات خون کوچک را به‌صورت افت سیگنال نشان می‌دهند.'),
  },
  {
    id: 'thrombolysis',
    question: L('Welche Aussage zur intravenösen Thrombolyse entspricht der AHA/ASA-Leitlinie 2026?', 'Which statement about intravenous thrombolysis reflects the 2026 AHA/ASA guideline?', 'کدام عبارت درباره ترومبولیز وریدی با راهنمای AHA/ASA سال ۲۰۲۶ مطابقت دارد؟'),
    options: [
      L('Nur Alteplase ist zulässig', 'Only alteplase may be used', 'فقط آلتپلاز مجاز است'),
      L('Alteplase oder Tenecteplase können bei geeigneten Patienten eingesetzt werden', 'Alteplase or tenecteplase may be used in eligible patients', 'آلتپلاز یا تنکتپلاز در بیماران واجد شرایط قابل استفاده‌اند'),
      L('NIHSS unter 6 schließt Therapie immer aus', 'NIHSS below 6 always excludes treatment', 'NIHSS کمتر از ۶ همیشه درمان را رد می‌کند'),
      L('Bildgebung ist vor Lyse nicht erforderlich', 'Imaging is unnecessary before thrombolysis', 'تصویربرداری قبل از ترومبولیز لازم نیست'),
    ],
    correct: 'B',
    explanation: L('Die Leitlinie 2026 unterstützt beide Thrombolytika bei geeigneten Patienten; entscheidend sind behinderndes Defizit, Zeitfenster und Kontraindikationen.', 'The 2026 guideline supports either thrombolytic in eligible patients; disabling deficit, timing and contraindications are key.', 'راهنمای ۲۰۲۶ هر دو دارو را در بیماران واجد شرایط می‌پذیرد؛ نقص ناتوان‌کننده، زمان و منع‌ها تعیین‌کننده‌اند.'),
  },
  {
    id: 'thrombectomy',
    question: L('Bis zu welchem Zeitpunkt kann eine mechanische Thrombektomie bei ausgewählten Patienten mit geeigneter Bildgebung sinnvoll sein?', 'Up to what time may mechanical thrombectomy benefit selected patients with appropriate imaging?', 'ترومبکتومی مکانیکی در بیماران منتخب با تصویربرداری مناسب تا چه زمانی ممکن است مفید باشد؟'),
    options: [L('30 Minuten', '30 minutes', '۳۰ دقیقه'), L('4,5 Stunden absolut', 'An absolute 4.5 hours', 'فقط ۴٫۵ ساعت'), L('Bis 24 Stunden', 'Up to 24 hours', 'تا ۲۴ ساعت'), L('Erst nach 72 Stunden', 'Only after 72 hours', 'فقط پس از ۷۲ ساعت')],
    correct: 'C',
    explanation: L('Bei ausgewählten Großgefäßverschlüssen kann die Thrombektomie anhand klinischer und bildgebender Kriterien bis 24 Stunden nach last known well erfolgen.', 'Selected patients with large-vessel occlusion may undergo thrombectomy up to 24 hours from last known well based on clinical and imaging criteria.', 'در انسداد عروق بزرگ منتخب، بر اساس معیارهای بالینی و تصویربرداری ترومبکتومی تا ۲۴ ساعت پس از آخرین زمان سالم ممکن است انجام شود.'),
  },
]

export const STROKE_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  QUESTION_SEEDS.map((item, index) => ({
    id: `ischaemischer-schlaganfall-${lang}-${String(index + 1).padStart(2, '0')}`,
    tags: ['ischaemischer-schlaganfall', 'schlaganfall', 'gehirn'],
    fach: 'gehirn',
    question: item.question[lang],
    options: item.options.map((text, optionIndex) => ({ id: ['A', 'B', 'C', 'D'][optionIndex], text: text[lang] })),
    correct: item.correct,
    explanation: item.explanation[lang],
  })),
]))

export const STROKE_FLASHCARD_TOPIC = {
  id: 'ischaemischer-schlaganfall',
  area: 'Kopf',
  chapter: 'Vaskuläre Erkrankungen',
  icon: '🧠',
  iconImage: '/fach/gehirn.png',
  color: '#7c3aed',
  href: '/flashcards/ischaemischer-schlaganfall',
  title: STROKE_LESSON.title,
  subtitle: L(
    'NCCT · CTA · CTP · ASPECTS · DWI/ADC · Zeitverlauf',
    'NCCT · CTA · CTP · ASPECTS · DWI/ADC · timeline',
    'NCCT · CTA · CTP · ASPECTS · DWI/ADC · سیر زمانی'
  ),
}

const FLASHCARD_SEEDS = [
  {
    category: L('Akutdiagnostik', 'Acute imaging', 'تصویربرداری حاد'),
    front: L('Was ist der erste Bildgebungsschritt beim akuten Schlaganfall?', 'What is the first imaging step in acute stroke?', 'اولین روش تصویربرداری در سکته حاد چیست؟'),
    answer: L('Native kraniale CT (NCCT).', 'Non-contrast head CT (NCCT).', 'CT بدون کنتراست مغز (NCCT).'),
    explanation: L('Sie ist schnell verfügbar, schließt eine intrakranielle Blutung aus und zeigt frühe Ischämiezeichen. Bei möglicher Großgefäßokklusion folgt ohne unnötige Verzögerung die CTA.', 'It is rapidly available, excludes intracranial haemorrhage and may show early ischaemic change. If large-vessel occlusion is possible, CTA follows without unnecessary delay.', 'این روش سریع است، خونریزی داخل جمجمه را رد می‌کند و ممکن است علائم اولیه ایسکمی را نشان دهد. در شک به انسداد عروق بزرگ، CTA بدون تأخیر غیرضروری انجام می‌شود.'),
    diagram: L('NCCT → Blutung ausschließen\nCTA → Verschluss lokalisieren\n± CTP → Kern/Penumbra', 'NCCT → exclude haemorrhage\nCTA → localise occlusion\n± CTP → core/penumbra', 'NCCT → رد خونریزی\nCTA → تعیین محل انسداد\n± CTP → هسته/پنومبرا'),
  },
  {
    category: L('CT-Frühzeichen', 'Early CT signs', 'علائم زودرس CT'),
    front: L('Was bedeutet das Dense-MCA-Zeichen?', 'What does the dense MCA sign mean?', 'علامت MCA هایپردنس به چه معناست؟'),
    answer: L('Akuter Thrombus in der A. cerebri media.', 'Acute thrombus in the middle cerebral artery.', 'ترومبوس حاد در شریان مغزی میانی.'),
    explanation: L('Das Gefäß erscheint durch den frischen intraluminalen Thrombus hyperdens. Das Zeichen ist ein früher indirekter Hinweis auf einen MCA-Verschluss, muss aber von Verkalkung und hohem Hämatokrit abgegrenzt werden.', 'The vessel appears hyperdense because of fresh intraluminal thrombus. It is an early indirect sign of MCA occlusion, but calcification and high haematocrit are important mimics.', 'رگ به علت ترومبوس تازه داخل‌لومنی هایپردنس می‌شود. این علامت نشانه غیرمستقیم زودرس انسداد MCA است، اما باید از کلسیفیکاسیون و هماتوکریت بالا افتراق داده شود.'),
  },
  {
    category: L('CT-Frühzeichen', 'Early CT signs', 'علائم زودرس CT'),
    front: L('Was ist das Insular-ribbon-Zeichen?', 'What is the insular ribbon sign?', 'علامت نوار اینسولا چیست؟'),
    answer: L('Verlust der Grau-Weiß-Differenzierung der Insula.', 'Loss of insular grey-white differentiation.', 'از بین رفتن تمایز خاکستری-سفید اینسولا.'),
    explanation: L('Die Insula wird im MCA-Territorium häufig früh ischämisch. Zytotoxisches Ödem lässt die normale kortikale Abgrenzung verschwimmen; deshalb ist das Zeichen ein sensibles frühes Parenchymmerkmal.', 'The insula is often affected early in MCA ischaemia. Cytotoxic oedema blurs its normal cortical outline, making this a sensitive early parenchymal sign.', 'اینسولا در ایسکمی MCA اغلب زود درگیر می‌شود. ادم سیتوتوکسیک مرز طبیعی کورتکس را محو می‌کند و این علامت را به یک یافته زودرس حساس تبدیل می‌کند.'),
  },
  {
    category: L('ASPECTS', 'ASPECTS', 'ASPECTS'),
    front: L('Wie wird ASPECTS berechnet?', 'How is ASPECTS calculated?', 'ASPECTS چگونه محاسبه می‌شود؟'),
    answer: L('Start bei 10; pro ischämische MCA-Region −1 Punkt.', 'Start at 10; subtract 1 per ischaemic MCA region.', 'شروع از ۱۰؛ برای هر ناحیه ایسکمیک MCA یک امتیاز کم می‌شود.'),
    explanation: L('Bewertet werden zehn definierte Regionen: C, L, IC, I sowie M1–M6. Ein niedriger Score bedeutet eine größere frühe Infarktausdehnung; ASPECTS bewertet das Parenchym, nicht den Gefäßverschluss.', 'Ten regions are assessed: C, L, IC, I and M1–M6. A lower score means more extensive early infarction; ASPECTS scores parenchymal change, not the vessel occlusion.', 'ده ناحیه C، L، IC، I و M1 تا M6 ارزیابی می‌شوند. نمره پایین‌تر به معنی وسعت بیشتر انفارکت اولیه است؛ ASPECTS پارانشیم را می‌سنجد، نه خود انسداد عروقی را.'),
    diagram: L('10 = keine Region betroffen\njede betroffene Region → −1\n0 = gesamtes MCA-Gebiet', '10 = no region involved\neach involved region → −1\n0 = entire MCA territory', '۱۰ = بدون ناحیه درگیر\nهر ناحیه درگیر → ۱−\n۰ = کل قلمرو MCA'),
  },
  {
    category: L('CTA', 'CTA', 'CTA'),
    front: L('Welche drei Kerninformationen liefert die CTA?', 'Which three core findings does CTA provide?', 'CTA کدام سه یافته اصلی را ارائه می‌دهد؟'),
    answer: L('Verschlusshöhe, Gefäßursache und Kollateralstatus.', 'Occlusion level, vascular cause and collateral status.', 'سطح انسداد، علت عروقی و وضعیت کولترال‌ها.'),
    explanation: L('Die CTA zeigt beispielsweise ICA-, M1-, M2- oder Basilarisverschlüsse, Tandemläsionen, Stenosen und Dissektionen. Diese Angaben sind zentral für Thrombektomieplanung und Prognose.', 'CTA demonstrates ICA, M1, M2 or basilar occlusion, tandem lesions, stenosis and dissection. These findings are central to thrombectomy planning and prognosis.', 'CTA انسداد ICA، M1، M2 یا بازیلار، ضایعات تاندوم، تنگی و دیسکسیون را نشان می‌دهد. این اطلاعات برای برنامه‌ریزی ترومبکتومی و پیش‌آگهی مهم‌اند.'),
    diagram: L('Wo? → Verschlusshöhe\nWarum? → Stenose/Dissektion\nWie versorgt? → Kollateralen', 'Where? → occlusion level\nWhy? → stenosis/dissection\nAlternative supply? → collaterals', 'کجا؟ → سطح انسداد\nچرا؟ → تنگی/دیسکسیون\nخون‌رسانی جایگزین؟ → کولترال‌ها'),
  },
  {
    category: L('Perfusion', 'Perfusion', 'پرفیوژن'),
    front: L('Was ist die Penumbra?', 'What is the penumbra?', 'پنومبرا چیست؟'),
    answer: L('Hypoperfundiertes, aber potenziell rettbares Hirngewebe.', 'Hypoperfused but potentially salvageable brain tissue.', 'بافت مغزی کم‌خون اما بالقوه قابل نجات.'),
    explanation: L('Die Penumbra ist funktionell gestört, aber noch nicht irreversibel infarziert. Ein Perfusionsdefizit, das größer als der Infarktkern ist, spricht für ein Mismatch und damit für rettbares Gewebe.', 'The penumbra is dysfunctional but not yet irreversibly infarcted. A perfusion deficit larger than the infarct core represents mismatch and suggests salvageable tissue.', 'پنومبرا عملکرد مختل دارد اما هنوز به‌طور برگشت‌ناپذیر انفارکت نشده است. بزرگ‌تر بودن نقص پرفیوژن از هسته انفارکت نشان‌دهنده mismatch و بافت قابل نجات است.'),
    diagram: L('Infarktkern = irreversibel\nPerfusionsdefizit − Kern = Penumbra', 'Infarct core = irreversible\nPerfusion deficit − core = penumbra', 'هسته انفارکت = برگشت‌ناپذیر\nنقص پرفیوژن − هسته = پنومبرا'),
  },
  {
    category: L('MRT', 'MRI', 'MRI'),
    front: L('Welche Kombination bestätigt echte akute Diffusionsrestriktion?', 'Which combination confirms true acute diffusion restriction?', 'کدام ترکیب محدودیت واقعی انتشار حاد را تأیید می‌کند؟'),
    answer: L('DWI hoch und ADC niedrig.', 'High DWI and low ADC.', 'DWI بالا و ADC پایین.'),
    explanation: L('Akutes zytotoxisches Ödem schränkt die Wasserbewegung ein. DWI allein genügt nicht, weil auch T2-shine-through hell erscheinen kann; erst der erniedrigte ADC bestätigt die Restriktion.', 'Acute cytotoxic oedema restricts water motion. DWI alone is insufficient because T2 shine-through can also appear bright; low ADC confirms true restriction.', 'ادم سیتوتوکسیک حاد حرکت آب را محدود می‌کند. DWI به‌تنهایی کافی نیست، زیرا T2 shine-through نیز روشن است؛ ADC پایین محدودیت واقعی را تأیید می‌کند.'),
    diagram: L('DWI ↑ + ADC ↓ → echte Restriktion\nDWI ↑ + ADC ↔/↑ → Shine-through', 'DWI ↑ + ADC ↓ → true restriction\nDWI ↑ + ADC ↔/↑ → shine-through', 'DWI ↑ + ADC ↓ → محدودیت واقعی\nDWI ↑ + ADC ↔/↑ → Shine-through'),
  },
  {
    category: L('MRT', 'MRI', 'MRI'),
    front: L('Was bedeutet ein DWI-FLAIR-Mismatch?', 'What does a DWI-FLAIR mismatch suggest?', 'عدم تطابق DWI-FLAIR به چه معناست؟'),
    answer: L('DWI positiv, FLAIR noch ohne deutliche Läsion: wahrscheinlich früher Infarkt.', 'DWI positive with no marked FLAIR lesion: likely early infarct.', 'DWI مثبت و FLAIR هنوز بدون ضایعه واضح: احتمال انفارکت زودرس.'),
    explanation: L('DWI reagiert innerhalb von Minuten, während die FLAIR-Veränderung später sichtbar wird. Bei unbekanntem Symptombeginn kann dieses Muster die Auswahl für eine Reperfusion unterstützen.', 'DWI changes within minutes, whereas FLAIR abnormality appears later. When onset is unknown, this pattern may support selection for reperfusion treatment.', 'DWI طی چند دقیقه تغییر می‌کند، اما تغییر FLAIR دیرتر ظاهر می‌شود. در شروع نامشخص، این الگو می‌تواند به انتخاب بیمار برای بازپرفیوژن کمک کند.'),
    diagram: L('DWI + / FLAIR − → eher früh\nDWI + / FLAIR + → eher später', 'DWI + / FLAIR − → likely early\nDWI + / FLAIR + → likely later', 'DWI + / FLAIR − → احتمالاً زودرس\nDWI + / FLAIR + → احتمالاً دیرتر'),
  },
  {
    category: L('MRT', 'MRI', 'MRI'),
    front: L('Wozu dienen T2*/SWI im Schlaganfallprotokoll?', 'Why are T2*/SWI included in a stroke protocol?', 'کاربرد T2*/SWI در پروتکل سکته چیست؟'),
    answer: L('Zum Nachweis von Blutung und Suszeptibilitätszeichen.', 'To detect haemorrhage and susceptibility signs.', 'برای تشخیص خونریزی و علائم susceptibility.'),
    explanation: L('Blutprodukte, Mikroblutungen und ein thrombotisches Suszeptibilitätszeichen führen zu Signalverlust. Die Sequenzen helfen damit beim Blutungsausschluss und bei der Erkennung hämorrhagischer Transformationen.', 'Blood products, microbleeds and thrombus susceptibility cause signal loss. These sequences help exclude haemorrhage and detect haemorrhagic transformation.', 'محصولات خون، میکروبلید و susceptibility ترومبوس باعث افت سیگنال می‌شوند. این سکانس‌ها به رد خونریزی و تشخیص تبدیل هموراژیک کمک می‌کنند.'),
  },
  {
    category: L('Zeitverlauf', 'Timeline', 'سیر زمانی'),
    front: L('Wann erreicht das Infarktödem typischerweise sein Maximum?', 'When does infarct oedema typically peak?', 'ادم انفارکت معمولاً چه زمانی به اوج می‌رسد؟'),
    answer: L('Etwa an Tag 3–5.', 'Around days 3–5.', 'حدود روز ۳ تا ۵.'),
    explanation: L('In den ersten Tagen nehmen Schwellung und Raumforderung zu. Bei großen MCA-Infarkten ist in dieser Phase die Gefahr von Mittellinienverlagerung und Herniation besonders hoch.', 'Swelling and mass effect increase during the first days. In large MCA infarcts, the risk of midline shift and herniation is greatest during this period.', 'در روزهای نخست تورم و اثر فضاگیر افزایش می‌یابد. در انفارکت بزرگ MCA خطر شیفت خط وسط و هرنیاسیون در این دوره بیشتر است.'),
  },
  {
    category: L('Zeitverlauf', 'Timeline', 'سیر زمانی'),
    front: L('Was ist der Fogging-Effekt?', 'What is the fogging effect?', 'اثر Fogging چیست؟'),
    answer: L('Vorübergehende scheinbare Normalisierung eines subakuten Infarkts.', 'Temporary apparent normalisation of a subacute infarct.', 'طبیعی به نظر رسیدن موقت انفارکت تحت‌حاد.'),
    explanation: L('Meist in der zweiten bis dritten Woche wird der Infarkt in der CT vorübergehend isodens und kann übersehen werden. Voraufnahmen, Klinik und gegebenenfalls MRT verhindern die Fehlinterpretation.', 'Usually during weeks 2–3, the infarct may become temporarily isodense on CT and be overlooked. Prior imaging, clinical context and MRI help prevent misinterpretation.', 'معمولاً در هفته دوم تا سوم انفارکت در CT موقتاً ایزودنس می‌شود و ممکن است دیده نشود. تصاویر قبلی، زمینه بالینی و MRI از تفسیر اشتباه جلوگیری می‌کنند.'),
    diagram: L('akut → hypodens\nWoche 2–3 → scheinbar isodens\nchronisch → Enzephalomalazie', 'acute → hypoattenuating\nweeks 2–3 → apparently isodense\nchronic → encephalomalacia', 'حاد → هیپودنس\nهفته ۲–۳ → ظاهراً ایزودنس\nمزمن → انسفالومالاسی'),
  },
  {
    category: L('Zeitverlauf', 'Timeline', 'سیر زمانی'),
    front: L('Wie unterscheidet man T2-shine-through von echter Restriktion?', 'How is T2 shine-through distinguished from true restriction?', 'چگونه T2 shine-through از محدودیت واقعی افتراق داده می‌شود؟'),
    answer: L('ADC prüfen: beim Shine-through ist er normal oder erhöht.', 'Check ADC: it is normal or high in shine-through.', 'ADC را بررسی کنید: در Shine-through طبیعی یا بالا است.'),
    explanation: L('DWI kann durch seinen T2-Anteil noch lange hyperintens bleiben, obwohl keine aktive Restriktion mehr besteht. Ein niedriger ADC spricht für echte Restriktion, ein pseudonormaler oder hoher ADC für Shine-through.', 'DWI may remain bright because of its T2 component even after restriction has resolved. Low ADC indicates true restriction; pseudonormal or high ADC indicates shine-through.', 'DWI به علت مؤلفه T2 ممکن است پس از رفع محدودیت نیز روشن بماند. ADC پایین نشان‌دهنده محدودیت واقعی و ADC شبه‌طبیعی یا بالا نشان‌دهنده Shine-through است.'),
    diagram: L('echte Restriktion → DWI ↑ / ADC ↓\nShine-through → DWI ↑ / ADC ↔ oder ↑', 'true restriction → DWI ↑ / ADC ↓\nshine-through → DWI ↑ / ADC ↔ or ↑', 'محدودیت واقعی → DWI ↑ / ADC ↓\nShine-through → DWI ↑ / ADC ↔ یا ↑'),
  },
  {
    category: L('Komplikationen', 'Complications', 'عوارض'),
    front: L('Wie zeigt sich eine hämorrhagische Transformation?', 'How does haemorrhagic transformation appear?', 'تبدیل هموراژیک چگونه دیده می‌شود؟'),
    answer: L('Hyperdens in der NCCT, suszeptibel in T2*/SWI.', 'Hyperdense on NCCT and susceptible on T2*/SWI.', 'در NCCT هایپردنس و در T2*/SWI دارای susceptibility.'),
    explanation: L('Das Spektrum reicht von petechialen Einblutungen bis zum raumfordernden Parenchymhämatom. T2*/SWI ist besonders empfindlich für kleine Blutprodukte; die klinische Relevanz hängt von Typ und Raumforderung ab.', 'The spectrum ranges from petechial haemorrhage to space-occupying parenchymal haematoma. T2*/SWI is particularly sensitive to small blood products; clinical significance depends on type and mass effect.', 'طیف از خونریزی پتشیال تا هماتوم پارانشیمی فضاگیر است. T2*/SWI برای محصولات خون کوچک حساس است و اهمیت بالینی به نوع و اثر فضاگیر بستگی دارد.'),
  },
  {
    category: L('Therapie', 'Treatment', 'درمان'),
    front: L('Welches Standardzeitfenster gilt für die IV-Thrombolyse?', 'What is the standard time window for IV thrombolysis?', 'پنجره زمانی استاندارد ترومبولیز وریدی چیست؟'),
    answer: L('Bis 4,5 Stunden bei geeigneten Patienten.', 'Up to 4.5 hours in eligible patients.', 'تا ۴٫۵ ساعت در بیماران واجد شرایط.'),
    explanation: L('Die Behandlung soll so früh wie möglich erfolgen. Entscheidend sind ein behinderndes Defizit, fehlende Kontraindikationen und der Ausschluss einer Blutung; bei definiertem Mismatch ist eine erweiterte Auswahl möglich.', 'Treatment should be given as early as possible. A disabling deficit, absence of contraindications and exclusion of haemorrhage are key; defined mismatch patterns may allow extended selection.', 'درمان باید هرچه زودتر انجام شود. نقص ناتوان‌کننده، نبود منع و رد خونریزی مهم‌اند؛ در الگوهای مشخص mismatch انتخاب گسترده‌تر ممکن است.'),
  },
  {
    category: L('Therapie', 'Treatment', 'درمان'),
    front: L('Bis wann kann eine Thrombektomie bei ausgewählten LVO-Patienten erfolgen?', 'How late may thrombectomy be performed in selected LVO patients?', 'ترومبکتومی در بیماران منتخب LVO تا چه زمانی ممکن است؟'),
    answer: L('Bis 24 Stunden nach „last known well“.', 'Up to 24 hours from last known well.', 'تا ۲۴ ساعت پس از آخرین زمان سالم.'),
    explanation: L('Das erweiterte Zeitfenster gilt nicht automatisch für jede LVO. Klinische Schwere, Verschlusshöhe, Infarktkern und potenziell rettbares Gewebe bestimmen die Auswahl; im frühen Fenster darf Zusatzbildgebung die Therapie nicht unnötig verzögern.', 'The extended window does not automatically apply to every LVO. Clinical severity, occlusion site, infarct core and salvageable tissue guide selection; in the early window, additional imaging must not unnecessarily delay treatment.', 'پنجره گسترده برای هر LVO به‌طور خودکار صدق نمی‌کند. شدت بالینی، محل انسداد، هسته انفارکت و بافت قابل نجات انتخاب را تعیین می‌کنند؛ در پنجره زودرس تصویربرداری اضافی نباید درمان را بی‌دلیل به تأخیر اندازد.'),
    diagram: L('LVO + kleiner/geeigneter Kern + rettbares Gewebe → Thrombektomie erwägen', 'LVO + suitable core + salvageable tissue → consider thrombectomy', 'LVO + هسته مناسب + بافت قابل نجات → بررسی ترومبکتومی'),
  },
]

export const STROKE_FLASHCARDS = FLASHCARD_SEEDS.map((item, index) => ({
  id: `ischaemischer-schlaganfall-${String(index + 1).padStart(2, '0')}`,
  topicId: 'ischaemischer-schlaganfall',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  diagram: item.diagram || null,
}))
