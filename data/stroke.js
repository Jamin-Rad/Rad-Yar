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
  actionCases: L('Falltraining', 'Case training', 'تمرین کیس'),
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
      value: 'NCCT',
      label: L('erster Schritt', 'first step', 'گام اول'),
      text: L('Blutung ausschließen, Frühzeichen und ASPECTS erfassen', 'Exclude haemorrhage; assess early signs and ASPECTS', 'رد خونریزی و بررسی علائم اولیه و ASPECTS'),
    },
    {
      value: 'CTA',
      label: L('Gefäßstatus', 'vessel status', 'وضعیت عروق'),
      text: L('LVO, Stenose und Kollateralen beurteilen', 'Assess LVO, stenosis and collaterals', 'بررسی انسداد عروق بزرگ، تنگی و کولترال‌ها'),
    },
    {
      value: 'DWI↓ADC',
      label: L('frühester MRT-Marker', 'earliest MRI marker', 'زودترین مارکر MRI'),
      text: L('echte Diffusionsrestriktion binnen Minuten', 'true diffusion restriction within minutes', 'محدودیت واقعی انتشار طی چند دقیقه'),
    },
  ],
  basics: {
    title: L('Klinik und Gefäßterritorien', 'Clinical presentation and vascular territories', 'تظاهرات بالینی و قلمروهای عروقی'),
    lead: L(
      'Der ischämische Schlaganfall entsteht durch einen akuten arteriellen Gefäßverschluss. Die Klinik lokalisiert häufig das betroffene Stromgebiet; die Bildgebung schließt Blutung aus, zeigt den Verschluss und schätzt Infarktkern sowie rettbare Penumbra.',
      'Ischaemic stroke results from acute arterial occlusion. Clinical findings often localise the vascular territory; imaging excludes haemorrhage, identifies the occlusion and estimates infarct core and salvageable penumbra.',
      'سکته ایسکمیک در اثر انسداد حاد شریانی ایجاد می‌شود. علائم بالینی اغلب قلمرو درگیر را مشخص می‌کنند و تصویربرداری خونریزی را رد، محل انسداد را تعیین و هسته انفارکت و پنومبرای قابل نجات را برآورد می‌کند.'
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
        L('Kontralaterale beinbetonte Parese, Antriebsstörung, ggf. Harninkontinenz', 'Contralateral leg-predominant weakness, abulia, sometimes urinary incontinence', 'ضعف بیشتر در پای مقابل، ابولیا و گاهی بی‌اختیاری ادرار'),
      ],
      [
        'MCA',
        L('Lateraler Frontal-, Parietal- und Temporallappen, tiefe Kerne', 'Lateral frontal, parietal and temporal lobes; deep nuclei', 'لوب‌های فرونتال، پاریتال و تمپورال لترال و هسته‌های عمقی'),
        L('Gesichts-/armbetonte Hemiparese; dominant Aphasie, nicht dominant Neglect; Hemianopsie', 'Face/arm-predominant hemiparesis; aphasia if dominant, neglect if non-dominant; hemianopia', 'همی‌پارزی غالب صورت و دست؛ آفازی در نیمکره غالب، نگلکت در غیرغالب و همی‌آنوپی'),
      ],
      [
        'PCA',
        L('Okzipitallappen, inferomedialer Temporallappen, Thalamus', 'Occipital lobe, inferomedial temporal lobe and thalamus', 'لوب اکسیپیتال، تمپورال اینفرومدیال و تالاموس'),
        L('Kontralaterale homonyme Hemianopsie, Gedächtnis- oder thalamische Sensibilitätsstörung', 'Contralateral homonymous hemianopia, memory deficit or thalamic sensory syndrome', 'همی‌آنوپی هومونیم مقابل، اختلال حافظه یا سندرم حسی تالامیک'),
      ],
      [
        L('Vertebrobasilär', 'Vertebrobasilar', 'ورتبروبازیلار'),
        L('Hirnstamm und Kleinhirn', 'Brainstem and cerebellum', 'ساقه مغز و مخچه'),
        L('Schwindel, Ataxie, Diplopie, Dysarthrie, gekreuzte Defizite oder Bewusstseinsstörung', 'Vertigo, ataxia, diplopia, dysarthria, crossed deficits or impaired consciousness', 'سرگیجه، آتاکسی، دوبینی، دیزآرتری، نقص متقاطع یا اختلال هوشیاری'),
      ],
    ],
    items: [
      {
        title: 'NIHSS',
        text: L('Standardisierte Schweregradeinschätzung von 0 bis 42. Ein niedriger Wert schließt ein behinderndes Defizit nicht aus.', 'Standardised severity score from 0 to 42. A low score does not exclude a disabling deficit.', 'مقیاس استاندارد شدت از ۰ تا ۴۲؛ نمره پایین، نقص ناتوان‌کننده را رد نمی‌کند.'),
      },
      {
        title: L('Zeitpunkt sichern', 'Establish timing', 'تعیین زمان'),
        text: L('„Last known well“ ist der letzte sicher symptomfreie Zeitpunkt und steuert die zeitbasierte Therapieauswahl.', '“Last known well” is the last definitely symptom-free time and guides time-based treatment selection.', 'آخرین زمان قطعاً بدون علامت، مبنای انتخاب درمان بر اساس زمان است.'),
      },
      {
        title: L('Mimics bedenken', 'Consider mimics', 'در نظر گرفتن تقلیدکننده‌ها'),
        text: L('Hypoglykämie, postiktale Parese, Migräne, Tumor, Enzephalitis und funktionelle Symptome können einen Schlaganfall imitieren.', 'Hypoglycaemia, postictal paresis, migraine, tumour, encephalitis and functional symptoms may mimic stroke.', 'هیپوگلیسمی، پارزی پس از تشنج، میگرن، تومور، انسفالیت و علائم عملکردی ممکن است سکته را تقلید کنند.'),
      },
    ],
    key: L('Zeit ist Hirn: Akutbildgebung soll schnell erfolgen, ohne eine indizierte Reperfusion unnötig zu verzögern.', 'Time is brain: perform acute imaging rapidly without unnecessarily delaying indicated reperfusion.', 'زمان یعنی مغز: تصویربرداری حاد باید سریع انجام شود بدون تأخیر غیرضروری در بازپرفیوژن لازم.'),
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
  ['Akutdiagnostik', 'Acute imaging', 'تصویربرداری حاد', 'Was ist der erste Bildgebungsschritt beim akuten Schlaganfall?', 'What is the first imaging step in acute stroke?', 'اولین روش تصویربرداری در سکته حاد چیست؟', 'Native CCT zum Blutungsausschluss und zur Suche nach Frühzeichen.', 'NCCT to exclude haemorrhage and assess early signs.', 'NCCT برای رد خونریزی و بررسی علائم اولیه.'],
  ['CT-Frühzeichen', 'Early CT signs', 'علائم زودرس CT', 'Was bedeutet das Dense-MCA-Zeichen?', 'What does the dense MCA sign mean?', 'علامت MCA هایپردنس به چه معناست؟', 'Ein hyperdenser akuter Thrombus in der A. cerebri media.', 'An acute hyperdense thrombus in the middle cerebral artery.', 'ترومبوس حاد هایپردنس در شریان مغزی میانی.'],
  ['CT-Frühzeichen', 'Early CT signs', 'علائم زودرس CT', 'Was ist das Insular-ribbon-Zeichen?', 'What is the insular ribbon sign?', 'علامت نوار اینسولا چیست؟', 'Verlust der Grau-Weiß-Differenzierung der Insula.', 'Loss of grey-white differentiation of the insula.', 'از بین رفتن تمایز خاکستری-سفید اینسولا.'],
  ['ASPECTS', 'ASPECTS', 'ASPECTS', 'Wie wird ASPECTS berechnet?', 'How is ASPECTS calculated?', 'ASPECTS چگونه محاسبه می‌شود؟', 'Bei 10 beginnen und für jede ischämische MCA-Region einen Punkt abziehen.', 'Start at 10 and subtract one point for each ischaemic MCA region.', 'از ۱۰ شروع و برای هر ناحیه ایسکمیک MCA یک امتیاز کم می‌شود.'],
  ['CTA', 'CTA', 'CTA', 'Welche drei Kerninformationen liefert die CTA?', 'Which three core findings does CTA provide?', 'CTA کدام سه یافته اصلی را ارائه می‌دهد؟', 'Verschlusshöhe, Kollateralstatus und zusätzliche Gefäßläsionen wie Stenose oder Dissektion.', 'Occlusion level, collateral status and additional vascular lesions such as stenosis or dissection.', 'سطح انسداد، وضعیت کولترال‌ها و ضایعات عروقی مانند تنگی یا دیسکسیون.'],
  ['Perfusion', 'Perfusion', 'پرفیوژن', 'Was ist die Penumbra?', 'What is the penumbra?', 'پنومبرا چیست؟', 'Hypoperfundiertes, funktionell beeinträchtigtes, aber potenziell rettbares Gewebe um den Infarktkern.', 'Hypoperfused, dysfunctional but potentially salvageable tissue surrounding the infarct core.', 'بافت کم‌خون و مختل اما قابل نجات در اطراف هسته انفارکت.'],
  ['MRT', 'MRI', 'MRI', 'Welche Kombination bestätigt echte akute Diffusionsrestriktion?', 'Which combination confirms true acute diffusion restriction?', 'کدام ترکیب محدودیت واقعی انتشار حاد را تأیید می‌کند؟', 'DWI hyperintens und ADC erniedrigt.', 'High DWI signal with low ADC.', 'DWI بالا همراه ADC پایین.'],
  ['MRT', 'MRI', 'MRI', 'Was bedeutet ein DWI-FLAIR-Mismatch?', 'What does a DWI-FLAIR mismatch suggest?', 'عدم تطابق DWI-FLAIR به چه معناست؟', 'DWI-positive, noch nicht deutlich FLAIR-positive Ischämie; Hinweis auf einen wahrscheinlich frühen Infarkt.', 'DWI-positive ischaemia without marked FLAIR change, suggesting a likely early infarct.', 'ایسکمی DWI مثبت بدون تغییر واضح FLAIR؛ به نفع انفارکت زودرس.'],
  ['MRT', 'MRI', 'MRI', 'Wozu dienen T2*/SWI im Schlaganfallprotokoll?', 'Why are T2*/SWI included in a stroke protocol?', 'کاربرد T2*/SWI در پروتکل سکته چیست؟', 'Nachweis von Blutung, Mikroblutungen und thrombotischen Suszeptibilitätszeichen.', 'Detection of haemorrhage, microbleeds and thrombus susceptibility signs.', 'تشخیص خونریزی، میکروبلید و علائم susceptibility ترومبوس.'],
  ['Zeitverlauf', 'Timeline', 'سیر زمانی', 'Wann erreicht das Infarktödem typischerweise sein Maximum?', 'When does infarct oedema typically peak?', 'ادم انفارکت معمولاً چه زمانی به اوج می‌رسد؟', 'Etwa an Tag 3–5.', 'Around days 3–5.', 'حدود روز ۳ تا ۵.'],
  ['Zeitverlauf', 'Timeline', 'سیر زمانی', 'Was ist der Fogging-Effekt?', 'What is the fogging effect?', 'اثر Fogging چیست؟', 'Vorübergehende scheinbare Normalisierung eines subakuten Infarkts, besonders in der CT.', 'Temporary apparent normalisation of a subacute infarct, especially on CT.', 'طبیعی به نظر رسیدن موقت انفارکت تحت‌حاد، به‌ویژه در CT.'],
  ['Zeitverlauf', 'Timeline', 'سیر زمانی', 'Wie unterscheidet man T2-shine-through von echter Restriktion?', 'How is T2 shine-through distinguished from true restriction?', 'چگونه T2 shine-through از محدودیت واقعی افتراق داده می‌شود؟', 'Beim Shine-through ist DWI hell, der ADC aber normal oder erhöht.', 'With shine-through DWI is bright but ADC is normal or high.', 'در Shine-through، DWI روشن ولی ADC طبیعی یا بالا است.'],
  ['Komplikationen', 'Complications', 'عوارض', 'Wie zeigt sich eine hämorrhagische Transformation?', 'How does haemorrhagic transformation appear?', 'تبدیل هموراژیک چگونه دیده می‌شود؟', 'Hyperdens in der NCCT und als Suszeptibilitätsverlust in T2*/SWI.', 'Hyperdense on NCCT and as susceptibility signal loss on T2*/SWI.', 'در NCCT هایپردنس و در T2*/SWI به‌صورت افت سیگنال susceptibility.'],
  ['Therapie', 'Treatment', 'درمان', 'Welches Standardzeitfenster gilt für die IV-Thrombolyse?', 'What is the standard time window for IV thrombolysis?', 'پنجره زمانی استاندارد ترومبولیز وریدی چیست؟', 'Bis 4,5 Stunden bei geeigneten Patienten; erweiterte Auswahl ist in definierten Mismatch-Situationen möglich.', 'Up to 4.5 hours in eligible patients; extended selection is possible in defined mismatch settings.', 'تا ۴٫۵ ساعت در بیماران واجد شرایط؛ در شرایط مشخص mismatch انتخاب گسترده‌تر ممکن است.'],
  ['Therapie', 'Treatment', 'درمان', 'Bis wann kann eine Thrombektomie bei ausgewählten LVO-Patienten erfolgen?', 'How late may thrombectomy be performed in selected LVO patients?', 'ترومبکتومی در بیماران منتخب LVO تا چه زمانی ممکن است؟', 'Bei geeigneter klinischer und bildgebender Auswahl bis 24 Stunden nach last known well.', 'With appropriate clinical and imaging selection, up to 24 hours from last known well.', 'با انتخاب مناسب بالینی و تصویربرداری تا ۲۴ ساعت پس از آخرین زمان سالم.'],
]

export const STROKE_FLASHCARDS = FLASHCARD_SEEDS.map((item, index) => ({
  id: `ischaemischer-schlaganfall-${String(index + 1).padStart(2, '0')}`,
  topicId: 'ischaemischer-schlaganfall',
  category: L(item[0], item[1], item[2]),
  front: L(item[3], item[4], item[5]),
  answer: L(item[6], item[7], item[8]),
  explanation: L(item[6], item[7], item[8]),
  diagram: L(item[6], item[7], item[8]),
}))

const EXAM_CASE_SEEDS = [
  {
    id: 'stroke-dense-mca-45310',
    image: '/stroke/case-dense-mca-rid-45310.png',
    modality: 'CT',
    plane: L('NCCT · axial', 'NCCT · axial', 'NCCT · اکسیال'),
    title: L('Dense-MCA-Zeichen bei akutem linksseitigem MCA-Infarkt', 'Dense MCA sign in acute left MCA infarction', 'علامت MCA هایپردنس در انفارکت حاد MCA چپ'),
    prompt: L('80-jährige Patientin mit akuter Aphasie und rechtsseitiger Schwäche. Welcher Befund ist im nativen CCT am wichtigsten?', 'An 80-year-old woman presents with acute aphasia and right-sided weakness. Which NCCT finding is most important?', 'خانم ۸۰ ساله با آفازی حاد و ضعف سمت راست. مهم‌ترین یافته NCCT چیست؟'),
    options: [
      L('Hyperdenses linkes MCA-Segment als Hinweis auf akuten Thrombus', 'Dense left MCA segment indicating acute thrombus', 'سگمان هایپردنس MCA چپ به نفع ترومبوس حاد'),
      L('Chronische symmetrische Basalganglienverkalkung', 'Chronic symmetric basal ganglia calcification', 'کلسیفیکاسیون مزمن و متقارن گانگلیون‌های قاعده‌ای'),
      L('Subarachnoidalblutung in den basalen Zisternen', 'Subarachnoid haemorrhage in the basal cisterns', 'خونریزی ساب‌آراکنوئید در سیسترن‌های قاعده‌ای'),
      L('Normale Gefäßdarstellung ohne Frühzeichen', 'Normal vessels without early signs', 'عروق طبیعی بدون علائم اولیه'),
    ],
    correct: 'A',
    explanation: L('Das hyperdense linke MCA-Segment entspricht einem akuten intraluminalen Thrombus. Zusammen mit Insular-ribbon-Verlust und passender Klinik spricht es für einen akuten linken MCA-Infarkt.', 'The dense left MCA segment represents acute intraluminal thrombus. Together with insular ribbon loss and the clinical presentation it indicates acute left MCA infarction.', 'سگمان هایپردنس MCA چپ نشان‌دهنده ترومبوس حاد داخل‌لومنی است و همراه با محوشدن نوار اینسولا و علائم بالینی به نفع انفارکت حاد MCA چپ است.'),
    source: 'https://radiopaedia.org/cases/acute-ischaemic-stroke-dense-mca-sign?lang=us',
    credit: 'Case courtesy of Gaurav Som Prakash Gupta, Radiopaedia.org · rID-45310 · CC BY-NC-SA 3.0',
  },
  {
    id: 'stroke-ct-dwi-78956',
    image: '/stroke/case-left-mca-dwi-rid-78956.jpg',
    images: [
      { src: '/stroke/case-left-mca-ct-rid-78956.png', label: L('NCCT', 'NCCT', 'NCCT') },
      { src: '/stroke/case-left-mca-dwi-rid-78956.jpg', label: L('DWI', 'DWI', 'DWI') },
    ],
    modality: 'MRT',
    plane: L('CT/DWI · axial', 'CT/DWI · axial', 'CT/DWI · اکسیال'),
    title: L('Subtile CT-Frühzeichen mit deutlicher DWI-Läsion', 'Subtle early CT signs with a conspicuous DWI lesion', 'علائم ظریف اولیه CT با ضایعه واضح DWI'),
    prompt: L('30-jährige Patientin fünf Tage postpartal mit Aphasie und rechtsseitiger Parese. CT ist nur diskret auffällig, DWI deutlich positiv. Welche Interpretation ist richtig?', 'A 30-year-old woman five days postpartum presents with aphasia and right-sided paresis. CT changes are subtle but DWI is clearly positive. Which interpretation is correct?', 'خانم ۳۰ ساله پنج روز پس از زایمان با آفازی و پارزی راست؛ CT ظریف ولی DWI واضحاً مثبت است. تفسیر صحیح کدام است؟'),
    options: [
      L('Akuter distaler linker MCA-Infarkt mit echter Diffusionsrestriktion', 'Acute distal left MCA infarction with true diffusion restriction', 'انفارکت حاد دیستال MCA چپ با محدودیت واقعی انتشار'),
      L('Chronische Enzephalomalazie ohne akute Ischämie', 'Chronic encephalomalacia without acute ischaemia', 'انسفالومالاسی مزمن بدون ایسکمی حاد'),
      L('DWI-Artefakt; eine unauffällige CT schließt Ischämie aus', 'DWI artefact; a normal CT excludes ischaemia', 'آرتیفکت DWI؛ CT طبیعی ایسکمی را رد می‌کند'),
      L('Primäre intrazerebrale Blutung', 'Primary intracerebral haemorrhage', 'خونریزی اولیه داخل مغزی'),
    ],
    correct: 'A',
    explanation: L('Eine frühe NCCT kann trotz akuter Ischämie nahezu unauffällig sein. Die fokale DWI-Hyperintensität mit passender ADC-Minderung bestätigt den akuten distalen linken MCA-Infarkt.', 'Early NCCT may be nearly normal despite acute ischaemia. Focal DWI hyperintensity with corresponding ADC reduction confirms acute distal left MCA infarction.', 'NCCT اولیه ممکن است با وجود ایسکمی حاد تقریباً طبیعی باشد. افزایش کانونی DWI همراه کاهش ADC انفارکت حاد دیستال MCA چپ را تأیید می‌کند.'),
    source: 'https://radiopaedia.org/cases/left-mca-acute-ischaemic-stroke?lang=us',
    credit: 'Case courtesy of Abdulrahman Abdo Ali Abbas, Radiopaedia.org · rID-78956 · CC BY-NC-SA 3.0',
  },
]

export const STROKE_EXAM_CASES = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  EXAM_CASE_SEEDS.map(item => ({
    id: item.id,
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    topicId: 'ischaemischer-schlaganfall',
    image: item.image,
    images: item.images?.map(image => ({ src: image.src, label: image.label[lang] })),
    modality: item.modality,
    plane: item.plane[lang],
    title: item.title[lang],
    vignette: item.prompt[lang],
    prompt: item.prompt[lang],
    options: item.options.map((text, index) => ({ id: ['A', 'B', 'C', 'D'][index], text: text[lang] })),
    correct: item.correct,
    explanation: item.explanation[lang],
    source: item.source,
    credit: item.credit,
  })),
]))
