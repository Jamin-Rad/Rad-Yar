const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const CADASIL_LESSON = {
  breadcrumb: L('CADASIL', 'CADASIL', 'CADASIL'),
  title: L('CADASIL', 'CADASIL', 'CADASIL'),
  definition: L(
    'Hereditäre Mikroangiopathie mit Migräne, lakunären Infarkten und progredienten Marklagerläsionen.',
    'Hereditary small-vessel disease with migraine, lacunar infarcts and progressive white-matter lesions.',
    'بیماری ارثی عروق کوچک با میگرن، انفارکت‌های لاکونار و ضایعات پیشرونده ماده سفید.'
  ),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),
  heroCards: [
    {
      value: L('30–40 %', '30–40%', '۳۰–۴۰٪'),
      label: L('Mikroblutungen', 'Microbleeds', 'میکروخونریزی‌ها'),
      text: L('SWI/T2*: lobär und tief möglich', 'SWI/T2*: lobar and deep locations', 'SWI/T2*: لوبار و عمقی'),
    },
    {
      value: 'FLAIR',
      label: L('Temporalpol + Capsula externa', 'Temporal pole + external capsule', 'قطب تمپورال + کپسول خارجی'),
      text: L('klassische MRT-Prädilektionsstellen', 'classic MRI predilection sites', 'محل‌های کلاسیک در MRI'),
    },
    {
      value: L('3.–5. Dekade', '3rd–5th decade', 'دهه ۳ تا ۵'),
      label: L('typische Manifestation', 'typical presentation', 'تظاهر معمول'),
      text: L('Migräne oft vor ersten Schlaganfällen', 'migraine often precedes first strokes', 'میگرن اغلب پیش از نخستین سکته‌ها'),
    },
  ],
  sections: [
    { id: 'grundlagen', icon: '🧬', label: L('Grundlagen', 'Basics', 'مبانی') },
    { id: 'klinik', icon: '🩺', label: L('Klinik', 'Clinical features', 'تظاهرات بالینی') },
    { id: 'mrt', icon: '🧲', label: L('MRT-Muster', 'MRI pattern', 'الگوی MRI') },
    { id: 'diagnostik', icon: '🔬', label: L('Diagnostik', 'Diagnosis', 'تشخیص') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی') },
    { id: 'fall', icon: '🖼️', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها') },
    { id: 'management', icon: '🛡️', label: L('Management', 'Management', 'مدیریت') },
    { id: 'takehome', icon: '🏁', label: L('TAKE HOME MESSAGE', 'TAKE HOME MESSAGE', 'TAKE HOME MESSAGE'), emphasis: true },
  ],

  grundlagen: {
    title: L('Grundlagen & Pathophysiologie', 'Basics & pathophysiology', 'مبانی و پاتوفیزیولوژی'),
    lead: L(
      'CADASIL steht für „Cerebral Autosomal Dominant Arteriopathy with Subcortical Infarcts and Leukoencephalopathy“ und ist die häufigste monogene zerebrale Mikroangiopathie.',
      'CADASIL stands for “Cerebral Autosomal Dominant Arteriopathy with Subcortical Infarcts and Leukoencephalopathy” and is the most common monogenic cerebral small-vessel disease.',
      'CADASIL مخفف «آرتریوپاتی مغزی اتوزوم غالب همراه با انفارکت‌های ساب‌کورتیکال و لوکوآنسفالوپاتی» و شایع‌ترین بیماری تک‌ژنی عروق کوچک مغزی است.'
    ),
    items: [
      {
        icon: '🧬',
        title: L('Genetik', 'Genetics', 'ژنتیک'),
        text: L('Pathogene Varianten im NOTCH3-Gen auf Chromosom 19. Autosomal-dominant: Kinder einer betroffenen Person haben ein Risiko von 50 %, die Variante zu erben.', 'Pathogenic variants in the NOTCH3 gene on chromosome 19. Autosomal dominant: each child of an affected individual has a 50% chance of inheriting the variant.', 'واریانت‌های بیماری‌زا در ژن NOTCH3 روی کروموزوم ۱۹. وراثت اتوزوم غالب: هر فرزند فرد مبتلا ۵۰٪ احتمال به ارث بردن واریانت را دارد.'),
      },
      {
        icon: '🫀',
        title: L('Gefäßpathologie', 'Vascular pathology', 'پاتولوژی عروقی'),
        text: L('Degeneration glatter Gefäßmuskelzellen und Ablagerung von granular osmiophilic material (GOM) in kleinen und mittelgroßen Arterien führen zu chronischer Hypoperfusion.', 'Degeneration of vascular smooth-muscle cells and deposition of granular osmiophilic material (GOM) in small and medium-sized arteries cause chronic hypoperfusion.', 'دژنراسیون سلول‌های عضله صاف عروقی و رسوب ماده گرانولار اسمیوفیلیک (GOM) در شریان‌های کوچک و متوسط موجب هیپوپرفیوژن مزمن می‌شود.'),
      },
      {
        icon: '🚫',
        title: L('Nicht klassische Atherosklerose', 'Not classic atherosclerosis', 'نه آترواسکلروز کلاسیک'),
        text: L('Die Erkrankung kann ohne klassische vaskuläre Risikofaktoren auftreten. Hypertonie, Rauchen und Diabetes können den Verlauf dennoch ungünstig beeinflussen.', 'The disease can occur without traditional vascular risk factors, although hypertension, smoking and diabetes may worsen the course.', 'بیماری می‌تواند بدون عوامل خطر عروقی کلاسیک رخ دهد؛ با این حال فشار خون، سیگار و دیابت می‌توانند سیر را بدتر کنند.'),
      },
    ],
    key: L(
      'Junger Patient + autosomal-dominante Familienanamnese + Migräne mit Aura + typische MRT-Verteilung = CADASIL aktiv ausschließen.',
      'Young patient + autosomal-dominant family history + migraine with aura + typical MRI distribution = actively exclude CADASIL.',
      'بیمار جوان + سابقه خانوادگی اتوزوم غالب + میگرن با اورا + توزیع تیپیک MRI = CADASIL را فعالانه بررسی کنید.'
    ),
  },

  klinik: {
    title: L('Klinisches Spektrum', 'Clinical spectrum', 'طیف بالینی'),
    lead: L(
      'Die Ausprägung ist selbst innerhalb einer Familie variabel. Migräne kann Jahre vor ischämischen Ereignissen beginnen; mit zunehmendem Alter dominieren Schlaganfälle, Gangstörung und kognitiver Abbau.',
      'Severity varies even within the same family. Migraine may begin years before ischaemic events; later, strokes, gait disturbance and cognitive decline dominate.',
      'شدت بیماری حتی در یک خانواده متغیر است. میگرن ممکن است سال‌ها پیش از حوادث ایسکمیک آغاز شود؛ در سنین بالاتر سکته‌ها، اختلال راه رفتن و افت شناختی غالب می‌شوند.'
    ),
    headers: [
      L('Manifestation', 'Manifestation', 'تظاهر'),
      L('Typischer Verlauf', 'Typical course', 'سیر معمول'),
      L('Radiologische Relevanz', 'Radiological relevance', 'اهمیت رادیولوژیک'),
    ],
    rows: [
      [L('Migräne mit Aura', 'Migraine with aura', 'میگرن با اورا'), L('Häufig frühes Symptom im 3.–4. Lebensjahrzehnt', 'Often an early feature in the 3rd–4th decade', 'اغلب علامت زودرس در دهه ۳ تا ۴'), L('Bei ungewöhnlich ausgedehnten WMH an CADASIL denken', 'Consider CADASIL when WMH burden is disproportionate', 'در WMH نامتناسب به CADASIL فکر کنید')],
      [L('Subkortikale Ischämien', 'Subcortical ischaemia', 'ایسکمی ساب‌کورتیکال'), L('Rezidivierende lakunäre Infarkte, häufig ab mittlerem Erwachsenenalter', 'Recurrent lacunar infarcts, often from mid-adulthood', 'انفارکت‌های لاکونار عودکننده، اغلب از میانسالی'), L('DWI für akute Läsionen; chronisch Lakunen auf T2/FLAIR', 'DWI for acute lesions; chronic lacunes on T2/FLAIR', 'DWI برای ضایعات حاد؛ لاکون‌های مزمن در T2/FLAIR')],
      [L('Psychiatrische Symptome', 'Psychiatric symptoms', 'علائم روان‌پزشکی'), L('Depression, Apathie, emotionale Labilität', 'Depression, apathy and emotional lability', 'افسردگی، بی‌تفاوتی و نوسان عاطفی'), L('Kann der neurologischen Diagnose vorausgehen', 'May precede the neurological diagnosis', 'ممکن است پیش از تشخیص عصبی ظاهر شود')],
      [L('Kognitiver Abbau', 'Cognitive decline', 'افت شناختی'), L('Exekutive Dysfunktion bis vaskuläre Demenz', 'Executive dysfunction progressing to vascular dementia', 'اختلال عملکرد اجرایی تا دمانس عروقی'), L('Korrelat: Lakunen, WMH und Hirnatrophie', 'Correlates: lacunes, WMH and brain atrophy', 'همبسته با لاکون‌ها، WMH و آتروفی مغز')],
    ],
    cave: L(
      'Eine fehlende bekannte Familienanamnese schließt CADASIL nicht aus: kleine Familien, Fehldiagnosen, variable Penetranz und de-novo-Varianten können das Erbmuster verschleiern.',
      'A negative known family history does not exclude CADASIL: small families, misdiagnosis, variable expression and de-novo variants may obscure inheritance.',
      'نبود سابقه خانوادگی شناخته‌شده CADASIL را رد نمی‌کند؛ خانواده کوچک، تشخیص‌های اشتباه، بیان متغیر و واریانت‌های de novo می‌توانند الگوی وراثت را پنهان کنند.'
    ),
  },

  mrt: {
    title: L('MRT: das diagnostische Muster', 'MRI: the diagnostic pattern', 'MRI: الگوی تشخیصی'),
    lead: L(
      'Die MRT ist sensitiv, aber nicht allein beweisend. Entscheidend ist die Kombination aus symmetrischen Marklagerläsionen, charakteristischen Prädilektionsstellen und lakunären Infarkten.',
      'MRI is sensitive but not diagnostic on its own. The combination of symmetric white-matter lesions, characteristic predilection sites and lacunar infarcts is key.',
      'MRI حساس است اما به‌تنهایی قطعی نیست. ترکیب ضایعات متقارن ماده سفید، محل‌های تیپیک و انفارکت‌های لاکونار کلیدی است.'
    ),
    headers: [
      L('Befund', 'Finding', 'یافته'),
      L('Sequenz / Lokalisation', 'Sequence / location', 'سکانس / محل'),
      L('Bedeutung', 'Significance', 'اهمیت'),
    ],
    rows: [
      [L('WMH / Leukoenzephalopathie', 'WMH / leukoencephalopathy', 'WMH / لوکوآنسفالوپاتی'), L('T2/FLAIR: symmetrisch, periventrikulär und tief subkortikal', 'T2/FLAIR: symmetric, periventricular and deep subcortical', 'T2/FLAIR: متقارن، پری‌ونتریکولار و ساب‌کورتیکال عمقی'), L('Früh diskret, später konfluierend', 'Initially subtle, later confluent', 'ابتدا خفیف، سپس کانفلوئنت')],
      [L('Anteriorer Temporalpol', 'Anterior temporal pole', 'قطب قدامی تمپورال'), L('T2/FLAIR-Hyperintensität der temporopolaren weißen Substanz', 'T2/FLAIR hyperintensity in temporopolar white matter', 'هایپراینتنسیتی T2/FLAIR ماده سفید تمپوروپولار'), L('Sehr charakteristisch; O’Sullivan-Zeichen', 'Highly characteristic; O’Sullivan sign', 'بسیار تیپیک؛ علامت O’Sullivan')],
      [L('Capsula externa', 'External capsule', 'کپسول خارجی'), L('Bandförmige FLAIR-Hyperintensität lateral des Putamens', 'Band-like FLAIR hyperintensity lateral to the putamen', 'هایپراینتنسیتی نواری FLAIR در لترال پوتامن'), L('Sensitiver, aber weniger spezifisch als Temporalpolbefall', 'Sensitive but less specific than temporal-pole involvement', 'حساس‌تر ولی اختصاصیت کمتر از درگیری قطب تمپورال')],
      [L('Lakunäre Infarkte', 'Lacunar infarcts', 'انفارکت‌های لاکونار'), L('Centrum semiovale, Basalganglien, Thalamus und Pons', 'Centrum semiovale, basal ganglia, thalamus and pons', 'سنتروم سمی‌اووال، بازال گانگلیا، تالاموس و پونز'), L('Akut DWI-positiv; chronisch liquoräquivalente Lakunen', 'Acute DWI-positive; chronic CSF-like lacunes', 'حاد DWI مثبت؛ مزمن لاکون با سیگنال مشابه CSF')],
      [L('Mikroblutungen', 'Microbleeds', 'میکروخونریزی‌ها'), L('SWI/T2*: punktförmige Suszeptibilitätsartefakte', 'SWI/T2*: punctate susceptibility foci', 'SWI/T2*: کانون‌های نقطه‌ای حساسیت مغناطیسی'), L('Lobär und tief möglich; relevant für antithrombotische Entscheidungen', 'May be lobar or deep; relevant to antithrombotic decisions', 'می‌تواند لوبار یا عمقی باشد؛ مهم برای تصمیم ضدترومبوتیک')],
      [L('Hirnatrophie', 'Brain atrophy', 'آتروفی مغز'), L('Progrediente Volumenminderung', 'Progressive volume loss', 'کاهش پیشرونده حجم'), L('Assoziiert mit kognitivem und funktionellem Abbau', 'Associated with cognitive and functional decline', 'مرتبط با افت شناختی و عملکردی')],
    ],
    key: L(
      'Temporalpolbefall ist der stärkste Bildhinweis. Capsula externa unterstützt die Diagnose, ist aber allein nicht spezifisch.',
      'Anterior temporal-pole involvement is the strongest imaging clue. External-capsule involvement supports the diagnosis but is not specific by itself.',
      'درگیری قطب قدامی تمپورال قوی‌ترین سرنخ تصویربرداری است. درگیری کپسول خارجی تشخیص را حمایت می‌کند اما به‌تنهایی اختصاصی نیست.'
    ),
  },

  diagnostik: {
    title: L('Diagnostischer Weg', 'Diagnostic pathway', 'مسیر تشخیصی'),
    lead: L(
      'Die Bildgebung begründet den Verdacht; die Diagnose wird molekulargenetisch gesichert. Eine gezielte Anamnese spart unnötige breite Diagnostik.',
      'Imaging raises suspicion; molecular genetic testing confirms the diagnosis. A focused history helps avoid unnecessary broad investigations.',
      'تصویربرداری شک را مطرح می‌کند؛ آزمایش ژنتیک مولکولی تشخیص را تأیید می‌کند. شرح‌حال هدفمند از بررسی‌های گسترده غیرضروری جلوگیری می‌کند.'
    ),
    steps: [
      { icon: '1', title: L('Klinischen Verdacht erkennen', 'Recognise the clinical pattern', 'شناخت الگوی بالینی'), text: L('Migräne mit Aura, frühe lakunäre Schlaganfälle, psychiatrische oder kognitive Symptome und autosomal-dominante Familienanamnese erfassen.', 'Assess migraine with aura, early lacunar strokes, psychiatric or cognitive symptoms and an autosomal-dominant family history.', 'میگرن با اورا، سکته‌های لاکونار زودرس، علائم روان‌پزشکی یا شناختی و سابقه خانوادگی اتوزوم غالب را بررسی کنید.') },
      { icon: '2', title: L('MRT vollständig protokollieren', 'Use a complete MRI protocol', 'پروتکل کامل MRI'), text: L('T1, T2, FLAIR, DWI/ADC und SWI/T2*. Temporalpole, Capsula externa, Lakunen und Mikroblutungen ausdrücklich beurteilen.', 'Include T1, T2, FLAIR, DWI/ADC and SWI/T2*. Explicitly assess temporal poles, external capsules, lacunes and microbleeds.', 'T1، T2، FLAIR، DWI/ADC و SWI/T2*. قطب‌های تمپورال، کپسول‌های خارجی، لاکون‌ها و میکروخونریزی‌ها را صریحاً ارزیابی کنید.') },
      { icon: '3', title: L('NOTCH3 testen', 'Test NOTCH3', 'آزمایش NOTCH3'), text: L('Nachweis einer heterozygoten pathogenen bzw. wahrscheinlich pathogenen NOTCH3-Variante bestätigt die Diagnose.', 'A heterozygous pathogenic or likely pathogenic NOTCH3 variant confirms the diagnosis.', 'یافتن واریانت هتروزیگوت بیماری‌زا یا احتمالاً بیماری‌زای NOTCH3 تشخیص را تأیید می‌کند.') },
      { icon: '4', title: L('Bei unklarem Ergebnis', 'If testing is inconclusive', 'اگر نتیجه نامشخص باشد'), text: L('Je nach Konstellation erweitertes Genpanel und/oder Hautbiopsie mit Nachweis von GOM bzw. NOTCH3-Immunfärbung erwägen.', 'Depending on the context, consider an expanded gene panel and/or skin biopsy for GOM or NOTCH3 immunostaining.', 'بسته به شرایط، پنل ژنی گسترده و/یا بیوپسی پوست برای GOM یا رنگ‌آمیزی NOTCH3 در نظر گرفته شود.') },
    ],
    cave: L(
      'Ein MRT-Muster allein beweist CADASIL nicht. Genetische Befunde müssen nach aktueller Variantklassifikation und im klinischen Kontext interpretiert werden.',
      'An MRI pattern alone does not prove CADASIL. Genetic findings must be interpreted using current variant classification and clinical context.',
      'الگوی MRI به‌تنهایی CADASIL را ثابت نمی‌کند. یافته‌های ژنتیکی باید بر اساس طبقه‌بندی روز و در زمینه بالینی تفسیر شوند.'
    ),
  },

  differenzial: {
    title: L('Wichtige Differenzialdiagnosen', 'Important differential diagnoses', 'تشخیص‌های افتراقی مهم'),
    lead: L(
      'Alter, Verteilungsmuster, Blutungsmarker und systemische Begleitbefunde helfen, CADASIL von erworbenen und anderen hereditären Leukoenzephalopathien abzugrenzen.',
      'Age, distribution, haemorrhagic markers and systemic features help distinguish CADASIL from acquired and other hereditary leukoencephalopathies.',
      'سن، الگوی توزیع، مارکرهای خونریزی و یافته‌های سیستمیک به افتراق CADASIL از لوکوآنسفالوپاتی‌های اکتسابی و ارثی دیگر کمک می‌کنند.'
    ),
    headers: [
      L('Diagnose', 'Diagnosis', 'تشخیص'),
      L('Abgrenzung zu CADASIL', 'Distinguishing feature', 'ویژگی افتراقی'),
    ],
    rows: [
      [L('Sporadische hypertensive Mikroangiopathie', 'Sporadic hypertensive small-vessel disease', 'بیماری عروق کوچک ناشی از فشار خون'), L('Höheres Alter und vaskuläre Risikofaktoren; Temporalpole meist ausgespart', 'Older age and vascular risk factors; temporal poles usually spared', 'سن بالاتر و عوامل خطر عروقی؛ قطب تمپورال معمولاً سالم')],
      [L('Multiple Sklerose', 'Multiple sclerosis', 'مولتیپل اسکلروزیس'), L('Ovoid, perivenulär, juxtakortikal, infratentoriell und Rückenmark; aktive KM-Aufnahme möglich', 'Ovoid, perivenular, juxtacortical, infratentorial and spinal lesions; active enhancement may occur', 'ضایعات بیضوی، پری‌ونولار، جوکستاکورتیکال، اینفراتنتوریال و نخاعی؛ امکان جذب کنتراست فعال')],
      [L('CARASIL / HTRA1-Erkrankung', 'CARASIL / HTRA1-related disease', 'CARASIL / بیماری مرتبط با HTRA1'), L('Rezessiver oder dominanter HTRA1-Erbgang; Alopezie und Spondylose bei klassischem CARASIL', 'Recessive or dominant HTRA1 inheritance; alopecia and spondylosis in classic CARASIL', 'وراثت مغلوب یا غالب HTRA1؛ آلوپسی و اسپوندیلوز در CARASIL کلاسیک')],
      [L('Morbus Fabry', 'Fabry disease', 'بیماری فابری'), L('Systemische Zeichen wie Nieren-, Herz- und Hautbeteiligung; X-chromosomaler Erbgang', 'Systemic renal, cardiac and skin features; X-linked inheritance', 'درگیری سیستمیک کلیه، قلب و پوست؛ وراثت وابسته به X')],
      [L('MELAS / mitochondriale Erkrankung', 'MELAS / mitochondrial disease', 'MELAS / بیماری میتوکندریایی'), L('Kortikale, nicht vaskulär-territoriale stroke-like lesions, Laktaterhöhung und maternale Vererbung', 'Cortical non-territorial stroke-like lesions, elevated lactate and maternal inheritance', 'ضایعات کورتیکال شبیه سکته خارج از قلمرو عروقی، افزایش لاکتات و وراثت مادری')],
      [L('ZNS-Vaskulitis', 'CNS vasculitis', 'واسکولیت CNS'), L('Entzündliche Klinik/Laborwerte, multifokale kortikale Infarkte und Gefäßwand- oder Angiografiebefunde', 'Inflammatory features, multifocal cortical infarcts and vessel-wall or angiographic abnormalities', 'یافته‌های التهابی، انفارکت‌های کورتیکال چندکانونی و ناهنجاری دیواره عروق یا آنژیوگرافی')],
    ],
  },

  fall: {
    title: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'),
    lead: L(
      'Echter MRT-Fall rID 22131 mit dem typischen Verteilungsmuster von CADASIL.',
      'Real MRI case rID 22131 demonstrating the characteristic CADASIL distribution.',
      'مورد واقعی MRI با شناسه rID 22131 و الگوی تیپیک CADASIL.'
    ),
    caseTitle: L('CADASIL in der FLAIR-MRT', 'CADASIL on FLAIR MRI', 'CADASIL در MRI FLAIR'),
    caseLabel: L('CADASIL', 'CADASIL', 'CADASIL'),
    caseMeta: L(
      'Drei axiale FLAIR-Schichten zeigen die charakteristische Beteiligung der anterioren Temporalpole und Capsula externa sowie konfluierende Marklagerläsionen.',
      'Three axial FLAIR levels show characteristic anterior temporal-pole and external-capsule involvement with confluent white-matter lesions.',
      'سه سطح محوری FLAIR درگیری تیپیک قطب‌های قدامی تمپورال و کپسول خارجی همراه با ضایعات کانفلوئنت ماده سفید را نشان می‌دهند.'
    ),
    images: [
      {
        src: '/cadasil/case-22131-temporal-poles.jpeg',
        alt: L('Axiale FLAIR-MRT mit beidseitiger Beteiligung der anterioren Temporalpole', 'Axial FLAIR MRI with bilateral anterior temporal-pole involvement', 'MRI محوری FLAIR با درگیری دوطرفه قطب‌های قدامی تمپورال'),
        label: L('01 · Temporallappen', '01 · Temporal lobes', '۰۱ · لوب‌های تمپورال'),
        caption: L('Beidseitige FLAIR-Hyperintensitäten der anterioren Temporalpole – das charakteristische O’Sullivan-Zeichen.', 'Bilateral FLAIR hyperintensity of the anterior temporal poles – the characteristic O’Sullivan sign.', 'هایپراینتنسیتی دوطرفه FLAIR در قطب‌های قدامی تمپورال – علامت مشخص O’Sullivan.'),
      },
      {
        src: '/cadasil/case-22131-external-capsule.jpeg',
        alt: L('Axiale FLAIR-MRT mit Marklagerläsionen und Beteiligung der Capsula externa', 'Axial FLAIR MRI with white-matter lesions and external-capsule involvement', 'MRI محوری FLAIR با ضایعات ماده سفید و درگیری کپسول خارجی'),
        label: L('02 · Capsula externa', '02 · External capsule', '۰۲ · کپسول خارجی'),
        caption: L('Symmetrische periventrikuläre und tiefe Marklagerläsionen mit bandförmiger Beteiligung der Capsula externa.', 'Symmetric periventricular and deep white-matter lesions with band-like external-capsule involvement.', 'ضایعات متقارن پری‌ونتریکولار و ماده سفید عمقی همراه با درگیری نواری کپسول خارجی.'),
      },
      {
        src: '/cadasil/case-22131-centrum-semiovale.jpeg',
        alt: L('Axiale FLAIR-MRT mit konfluierenden Läsionen im Centrum semiovale', 'Axial FLAIR MRI with confluent lesions in the centrum semiovale', 'MRI محوری FLAIR با ضایعات کانفلوئنت در سنتروم سمی‌اووال'),
        label: L('03 · Centrum semiovale', '03 · Centrum semiovale', '۰۳ · سنتروم سمی‌اووال'),
        caption: L('Konfluierende, annähernd symmetrische Marklagerhyperintensitäten als Ausdruck der fortgeschrittenen Leukoenzephalopathie.', 'Confluent, approximately symmetric white-matter hyperintensities indicating advanced leukoencephalopathy.', 'هایپراینتنسیتی‌های کانفلوئنت و تقریباً متقارن ماده سفید، نشان‌دهنده لوکوآنسفالوپاتی پیشرفته.'),
      },
    ],
    findingsTitle: L('Strukturierte Befundung', 'Structured interpretation', 'تفسیر ساختاریافته'),
    findings: [
      L('Sequenz: axial FLAIR; Liquor regelrecht supprimiert.', 'Sequence: axial FLAIR with appropriate CSF suppression.', 'سکانس: FLAIR محوری با سرکوب مناسب CSF.'),
      L('Verteilung: bilateral, multifokal bis konfluierend, periventrikulär und tief subkortikal.', 'Distribution: bilateral, multifocal-to-confluent, periventricular and deep subcortical.', 'توزیع: دوطرفه، چندکانونی تا کانفلوئنت، پری‌ونتریکولار و ساب‌کورتیکال عمقی.'),
      L('Prädilektionsstellen: anteriore Temporalpole und Capsula externa.', 'Predilection sites: anterior temporal poles and external capsules.', 'محل‌های تیپیک: قطب‌های قدامی تمپورال و کپسول‌های خارجی.'),
      L('Gesamteindruck: hochgradiger Bildverdacht auf CADASIL bei passender Klinik und Familienanamnese.', 'Overall impression: high imaging suspicion for CADASIL with compatible clinical and family history.', 'جمع‌بندی: شک تصویربرداری بالا به CADASIL در صورت تطابق بالینی و سابقه خانوادگی.'),
    ],
    diagnosis: L(
      'Bilddiagnose: CADASIL-typische Leukoenzephalopathie. Bestätigung durch molekulargenetischen NOTCH3-Nachweis.',
      'Imaging diagnosis: CADASIL-pattern leukoencephalopathy. Confirm with molecular genetic NOTCH3 testing.',
      'تشخیص تصویربرداری: لوکوآنسفالوپاتی با الگوی CADASIL. تأیید با آزمایش ژنتیک مولکولی NOTCH3.'
    ),
  },

  management: {
    title: L('Management & Beratung', 'Management & counselling', 'مدیریت و مشاوره'),
    lead: L(
      'Eine kausale Therapie steht derzeit nicht zur Verfügung. Ziel sind Risikoreduktion, symptomatische Behandlung und informierte genetische Beratung.',
      'No disease-modifying treatment is currently available. Management focuses on risk reduction, symptomatic treatment and informed genetic counselling.',
      'در حال حاضر درمان تعدیل‌کننده بیماری وجود ندارد. مدیریت بر کاهش خطر، درمان علامتی و مشاوره ژنتیک آگاهانه متمرکز است.'
    ),
    items: [
      { icon: '🩺', title: L('Risikofaktoren', 'Risk factors', 'عوامل خطر'), text: L('Blutdruck, Diabetes, Lipide und Rauchen konsequent behandeln, obwohl CADASIL primär genetisch bedingt ist.', 'Treat blood pressure, diabetes, lipids and smoking aggressively even though CADASIL is primarily genetic.', 'فشار خون، دیابت، چربی خون و سیگار را با جدیت کنترل کنید، هرچند CADASIL اساساً ژنتیکی است.') },
      { icon: '💊', title: L('Antithrombotika', 'Antithrombotics', 'ضدترومبوتیک‌ها'), text: L('Thrombozytenhemmer können nach ischämischem Ereignis erwogen werden; der Nutzen ist nicht spezifisch belegt. Mikroblutungsbelastung berücksichtigen.', 'Antiplatelets may be considered after an ischaemic event, although CADASIL-specific benefit is unproven. Consider microbleed burden.', 'پس از رویداد ایسکمیک می‌توان ضدپلاکت را در نظر گرفت، هرچند سود اختصاصی در CADASIL ثابت نشده است. بار میکروخونریزی را لحاظ کنید.') },
      { icon: '⚠️', title: L('Antikoagulation / Lyse', 'Anticoagulation / thrombolysis', 'ضدانعقاد / ترومبولیز'), text: L('Nur bei zwingender Indikation und individueller Nutzen-Risiko-Abwägung; bei hoher Mikroblutungsbelastung besteht Blutungsgefahr.', 'Use only for compelling indications after individual risk–benefit assessment; heavy microbleed burden increases haemorrhagic risk.', 'فقط در اندیکاسیون قوی و پس از سنجش فردی سود-خطر؛ بار بالای میکروخونریزی خطر خونریزی را افزایش می‌دهد.') },
      { icon: '🧬', title: L('Genetische Beratung', 'Genetic counselling', 'مشاوره ژنتیک'), text: L('Prädiktive Testung asymptomatischer Angehöriger nur nach qualifizierter Beratung; psychosoziale und versicherungsrechtliche Folgen besprechen.', 'Predictive testing of asymptomatic relatives should follow specialist counselling, including psychosocial and insurance implications.', 'آزمایش پیش‌بینی‌کننده بستگان بدون علامت فقط پس از مشاوره تخصصی و بحث پیامدهای روانی‌اجتماعی و بیمه‌ای.') },
    ],
    cave: L(
      'Therapieentscheidungen sind individuell und gehören in neurologische bzw. neurovaskuläre Betreuung; die Lernseite ersetzt keine patientenspezifische Behandlungsempfehlung.',
      'Treatment decisions are individual and require neurological or neurovascular care; this lesson is not a patient-specific treatment recommendation.',
      'تصمیم‌های درمانی فردی‌اند و باید تحت مراقبت نورولوژی یا نوروواسکولار انجام شوند؛ این درس جایگزین توصیه درمانی اختصاصی بیمار نیست.'
    ),
  },

  takehome: {
    title: L('TAKE HOME MESSAGE', 'TAKE HOME MESSAGE', 'TAKE HOME MESSAGE'),
    lead: L('Die sechs Punkte, die im Befund und in der Prüfung sitzen müssen.', 'Six points to remember for reporting and exams.', 'شش نکته ضروری برای گزارش و آزمون.'),
    items: [
      { title: L('NOTCH3 + autosomal dominant', 'NOTCH3 + autosomal dominant', 'NOTCH3 + اتوزوم غالب'), text: L('CADASIL ist die häufigste monogene zerebrale Mikroangiopathie.', 'CADASIL is the most common monogenic cerebral small-vessel disease.', 'CADASIL شایع‌ترین بیماری تک‌ژنی عروق کوچک مغزی است.') },
      { title: L('Temporalpol ist der Schlüssel', 'Temporal pole is the key', 'قطب تمپورال کلیدی است'), text: L('Anteriore temporopolare WMH sind hochcharakteristisch.', 'Anterior temporopolar WMH are highly characteristic.', 'WMH قطب قدامی تمپورال بسیار تیپیک است.') },
      { title: L('Capsula externa stützt', 'External capsule supports', 'کپسول خارجی حمایت می‌کند'), text: L('Häufig beteiligt, aber weniger spezifisch.', 'Often involved, but less specific.', 'اغلب درگیر است، اما اختصاصیت کمتری دارد.') },
      { title: L('Mehr als Leukoenzephalopathie', 'More than leukoencephalopathy', 'بیش از لوکوآنسفالوپاتی'), text: L('Suche gezielt nach Lakunen, akuten DWI-Läsionen, Mikroblutungen und Atrophie.', 'Actively look for lacunes, acute DWI lesions, microbleeds and atrophy.', 'فعالانه به دنبال لاکون، ضایعات حاد DWI، میکروخونریزی و آتروفی باشید.') },
      { title: L('MRT macht den Verdacht', 'MRI raises suspicion', 'MRI شک را مطرح می‌کند'), text: L('Die Sicherung erfolgt durch NOTCH3-Diagnostik, nicht durch Bildgebung allein.', 'Confirmation is by NOTCH3 testing, not imaging alone.', 'تأیید با آزمایش NOTCH3 است، نه صرفاً تصویربرداری.') },
      { title: L('Familie mitdenken', 'Think family', 'خانواده را در نظر بگیرید'), text: L('Stammbaum und genetische Beratung sind Teil der Diagnostik.', 'Pedigree assessment and genetic counselling are part of diagnosis.', 'بررسی شجره و مشاوره ژنتیک بخشی از تشخیص است.') },
    ],
  },

}

const CADASIL_QUESTION_SEEDS = [
  Q('01', L('Welcher MRT-Befund ist für CADASIL am spezifischsten?', 'Which MRI finding is most specific for CADASIL?', 'کدام یافته MRI برای CADASIL اختصاصی‌تر است؟'), [
    L('Symmetrische FLAIR-Hyperintensitäten der anterioren Temporalpole', 'Symmetric FLAIR hyperintensity of the anterior temporal poles', 'هایپراینتنسیتی متقارن FLAIR قطب‌های قدامی تمپورال'),
    L('Symmetrische FLAIR-Hyperintensitäten der Capsula externa', 'Symmetric FLAIR hyperintensity of the external capsules', 'هایپراینتنسیتی متقارن FLAIR کپسول‌های خارجی'),
    L('Konfluierende periventrikuläre FLAIR-Hyperintensitäten', 'Confluent periventricular FLAIR hyperintensities', 'هایپراینتنسیتی‌های کانفلوئنت پری‌ونتریکولار'),
    L('Multiple Lakunen der Basalganglien', 'Multiple basal-ganglia lacunes', 'لاکون‌های متعدد بازال گانگلیا'),
  ], 0, L('Der anteriore Temporalpol ist der stärkste Bildhinweis. Die Capsula externa ist häufig beteiligt, aber weniger spezifisch.', 'Anterior temporal-pole involvement is the strongest imaging clue. External-capsule involvement is common but less specific.', 'درگیری قطب قدامی تمپورال قوی‌ترین سرنخ تصویربرداری است؛ درگیری کپسول خارجی شایع ولی کم‌اختصاص‌تر است.')),
  Q('02', L('Welche Aussage zur Capsula externa bei CADASIL trifft am besten zu?', 'Which statement about the external capsule in CADASIL is most accurate?', 'کدام عبارت درباره کپسول خارجی در CADASIL دقیق‌تر است؟'), [
    L('Sie ist sensitiver, aber weniger spezifisch als der Temporalpolbefall.', 'It is more sensitive but less specific than temporal-pole involvement.', 'حساس‌تر ولی کم‌اختصاص‌تر از درگیری قطب تمپورال است.'),
    L('Sie ist spezifischer, aber weniger sensitiv als der Temporalpolbefall.', 'It is more specific but less sensitive than temporal-pole involvement.', 'اختصاصی‌تر ولی کم‌حساس‌تر از درگیری قطب تمپورال است.'),
    L('Ihr Befall beweist CADASIL unabhängig von Klinik und Genetik.', 'Its involvement proves CADASIL regardless of clinical and genetic findings.', 'درگیری آن مستقل از بالین و ژنتیک CADASIL را ثابت می‌کند.'),
    L('Sie bleibt bei CADASIL typischerweise ausgespart.', 'It is typically spared in CADASIL.', 'در CADASIL معمولاً سالم می‌ماند.'),
  ], 0, L('Die Capsula externa ist ein sensitiver unterstützender Marker, besitzt aber nicht die Spezifität des anterioren Temporalpolbefalls.', 'The external capsule is a sensitive supportive marker but lacks the specificity of anterior temporal-pole involvement.', 'کپسول خارجی مارکر حمایتی حساس است اما اختصاصیت درگیری قطب قدامی تمپورال را ندارد.')),
  Q('03', L('Welche Konstellation sollte den stärksten Verdacht auf CADASIL auslösen?', 'Which constellation should raise the strongest suspicion for CADASIL?', 'کدام ترکیب بیشترین شک به CADASIL را ایجاد می‌کند؟'), [
    L('38 Jahre, Migräne mit Aura, lakunärer Infarkt, Vater mit frühem Schlaganfall', 'Age 38, migraine with aura, lacunar infarct, father with early stroke', '۳۸ سال، میگرن با اورا، انفارکت لاکونار، پدر با سکته زودرس'),
    L('68 Jahre, Hypertonie, tiefe Mikroblutungen, keine Migräne', 'Age 68, hypertension, deep microbleeds, no migraine', '۶۸ سال، فشار خون، میکروخونریزی عمقی، بدون میگرن'),
    L('31 Jahre, Optikusneuritis, oligoklonale Banden, Dawson-Finger', 'Age 31, optic neuritis, oligoclonal bands, Dawson fingers', '۳۱ سال، نوریت اپتیک، باندهای الیگوکلونال، Dawson finger'),
    L('52 Jahre, Niereninsuffizienz, Kardiomyopathie, Angiokeratome', 'Age 52, renal failure, cardiomyopathy, angiokeratomas', '۵۲ سال، نارسایی کلیه، کاردیومیوپاتی، آنژیوکراتوم'),
  ], 0, L('Frühe lakunäre Ereignisse, Migräne mit Aura und autosomal-dominant wirkende Familienanamnese bilden die klassische Verdachtskonstellation.', 'Early lacunar events, migraine with aura and an apparently autosomal-dominant family history form the classic suspicion pattern.', 'حوادث لاکونار زودرس، میگرن با اورا و سابقه خانوادگی شبیه اتوزوم غالب، ترکیب کلاسیک شک است.')),
  Q('04', L('Welcher Test sichert die Diagnose bei typischer Klinik und MRT?', 'Which test confirms the diagnosis when clinical and MRI findings are typical?', 'کدام آزمایش در بالین و MRI تیپیک تشخیص را تأیید می‌کند؟'), [
    L('Nachweis einer pathogenen heterozygoten NOTCH3-Variante', 'Detection of a pathogenic heterozygous NOTCH3 variant', 'یافتن واریانت هتروزیگوت بیماری‌زای NOTCH3'),
    L('Nachweis einer biallelischen HTRA1-Variante', 'Detection of a biallelic HTRA1 variant', 'یافتن واریانت دوآللی HTRA1'),
    L('Nachweis einer GLA-Variante ohne systemische Manifestation', 'Detection of a GLA variant without systemic manifestations', 'یافتن واریانت GLA بدون تظاهرات سیستمیک'),
    L('Nachweis oligoklonaler Banden im Liquor', 'Detection of CSF oligoclonal bands', 'یافتن باندهای الیگوکلونال در CSF'),
  ], 0, L('Die molekulargenetische Sicherung erfolgt durch eine pathogene oder wahrscheinlich pathogene heterozygote NOTCH3-Variante.', 'Molecular confirmation is by a pathogenic or likely pathogenic heterozygous NOTCH3 variant.', 'تأیید مولکولی با واریانت هتروزیگوت بیماری‌زا یا احتمالاً بیماری‌زای NOTCH3 انجام می‌شود.')),
  Q('05', L('Welche Aussage zu Mikroblutungen bei CADASIL ist korrekt?', 'Which statement about microbleeds in CADASIL is correct?', 'کدام عبارت درباره میکروخونریزی در CADASIL صحیح است؟'), [
    L('Sie können sowohl lobär als auch tief auftreten.', 'They may occur in both lobar and deep locations.', 'می‌توانند هم لوبار و هم عمقی باشند.'),
    L('Sie sind definitionsgemäß ausschließlich lobär.', 'By definition they are exclusively lobar.', 'طبق تعریف فقط لوبار هستند.'),
    L('Sie sind definitionsgemäß ausschließlich tief.', 'By definition they are exclusively deep.', 'طبق تعریف فقط عمقی هستند.'),
    L('Ihr Nachweis schließt eine antithrombotische Therapie immer aus.', 'Their presence always excludes antithrombotic therapy.', 'وجودشان همیشه درمان ضدترومبوتیک را منع می‌کند.'),
  ], 0, L('CADASIL-Mikroblutungen können lobär und tief verteilt sein. Ihre Last beeinflusst die individuelle Blutungsrisikoabwägung.', 'CADASIL microbleeds may be lobar or deep. Their burden informs individual haemorrhagic-risk assessment.', 'میکروخونریزی‌های CADASIL می‌توانند لوبار یا عمقی باشند و بار آن‌ها در ارزیابی خطر خونریزی اهمیت دارد.')),
  Q('06', L('Welche Läsion ist bei einem akuten CADASIL-bedingten lakunären Infarkt am hilfreichsten?', 'Which sequence is most useful for an acute CADASIL-related lacunar infarct?', 'کدام سکانس برای انفارکت لاکونار حاد مرتبط با CADASIL مفیدتر است؟'), [
    L('DWI mit korrespondierend erniedrigtem ADC', 'DWI with corresponding low ADC', 'DWI با ADC کاهش‌یافته متناظر'),
    L('FLAIR ohne DWI-Korrelat', 'FLAIR without a DWI correlate', 'FLAIR بدون همبستگی DWI'),
    L('SWI mit Blooming ohne DWI-Signal', 'SWI blooming without DWI signal', 'Blooming در SWI بدون سیگنال DWI'),
    L('T1 nach Kontrastmittel mit homogener Aufnahme', 'Post-contrast T1 with homogeneous enhancement', 'T1 پس از کنتراست با جذب همگن'),
  ], 0, L('Akute lakunäre Ischämien zeigen Diffusionsrestriktion mit DWI-Hyperintensität und ADC-Abfall.', 'Acute lacunar ischaemia shows restricted diffusion with DWI hyperintensity and low ADC.', 'ایسکمی لاکونار حاد با محدودیت انتشار، DWI بالا و ADC پایین دیده می‌شود.')),
  Q('07', L('Welche Differenzialdiagnose passt bei Alopezie, früher Spondylose und diffuser Mikroangiopathie am besten?', 'Which differential best fits alopecia, early spondylosis and diffuse small-vessel disease?', 'کدام تشخیص افتراقی با آلوپسی، اسپوندیلوز زودرس و بیماری منتشر عروق کوچک سازگارتر است؟'), [
    L('CARASIL / HTRA1-assoziierte Erkrankung', 'CARASIL / HTRA1-related disease', 'CARASIL / بیماری مرتبط با HTRA1'),
    L('Morbus Fabry', 'Fabry disease', 'بیماری فابری'),
    L('MELAS', 'MELAS', 'MELAS'),
    L('Zerebrale Amyloidangiopathie', 'Cerebral amyloid angiopathy', 'آنژیوپاتی آمیلوئید مغزی'),
  ], 0, L('Alopezie und frühe Spondylose sind klassische extrazerebrale Hinweise auf CARASIL.', 'Alopecia and early spondylosis are classic extracerebral clues to CARASIL.', 'آلوپسی و اسپوندیلوز زودرس سرنخ‌های خارج‌مغزی کلاسیک CARASIL هستند.')),
  Q('08', L('Welche Aussage zur Familienanamnese ist korrekt?', 'Which statement about family history is correct?', 'کدام عبارت درباره سابقه خانوادگی صحیح است؟'), [
    L('Eine unauffällige Familienanamnese schließt CADASIL nicht sicher aus.', 'A negative family history does not reliably exclude CADASIL.', 'سابقه خانوادگی منفی CADASIL را با اطمینان رد نمی‌کند.'),
    L('Ohne betroffenen Elternteil ist CADASIL ausgeschlossen.', 'CADASIL is excluded without an affected parent.', 'بدون والد مبتلا CADASIL رد می‌شود.'),
    L('Nur maternale Vererbung ist mit CADASIL vereinbar.', 'Only maternal inheritance is compatible with CADASIL.', 'فقط وراثت مادری با CADASIL سازگار است.'),
    L('Nur männliche Nachkommen können betroffen sein.', 'Only male offspring can be affected.', 'فقط فرزندان پسر می‌توانند مبتلا شوند.'),
  ], 0, L('Kleine Familien, Fehldiagnosen, variable Expression und selten de-novo-Varianten können das dominante Muster verschleiern.', 'Small families, misdiagnosis, variable expression and rare de-novo variants can obscure dominant inheritance.', 'خانواده کوچک، تشخیص اشتباه، بیان متغیر و واریانت‌های نادر de novo می‌توانند الگوی غالب را پنهان کنند.')),
  Q('09', L('Welche Aussage zur Hautbiopsie bei CADASIL trifft zu?', 'Which statement about skin biopsy in CADASIL is correct?', 'کدام عبارت درباره بیوپسی پوست در CADASIL صحیح است؟'), [
    L('Sie kann GOM oder eine charakteristische NOTCH3-Immunreaktion nachweisen.', 'It may demonstrate GOM or characteristic NOTCH3 immunoreactivity.', 'می‌تواند GOM یا واکنش ایمونوهیستوشیمی تیپیک NOTCH3 را نشان دهد.'),
    L('Sie ersetzt bei jeder Konstellation die molekulargenetische Untersuchung.', 'It replaces molecular genetic testing in every setting.', 'در همه شرایط جایگزین آزمایش ژنتیک مولکولی است.'),
    L('Sie weist β-Amyloid in leptomeningealen Gefäßen nach.', 'It demonstrates beta-amyloid in leptomeningeal vessels.', 'β-آمیلوئید را در عروق لپتومننژیال نشان می‌دهد.'),
    L('Sie zeigt demyelinisierende Plaques mit oligodendroglialem Verlust.', 'It shows demyelinating plaques with oligodendroglial loss.', 'پلاک‌های دمیلینه با کاهش الیگودندروگلیا را نشان می‌دهد.'),
  ], 0, L('Bei unklarer Genetik kann eine Hautbiopsie mit Nachweis von granular osmiophilic material oder NOTCH3-Immunfärbung unterstützen.', 'When genetics are inconclusive, skin biopsy may support diagnosis by showing granular osmiophilic material or NOTCH3 immunostaining.', 'در ژنتیک نامشخص، بیوپسی پوست با نشان دادن GOM یا رنگ‌آمیزی NOTCH3 می‌تواند کمک‌کننده باشد.')),
  Q('10', L('Welches Befundmuster spricht eher gegen CADASIL und für Multiple Sklerose?', 'Which pattern argues against CADASIL and for multiple sclerosis?', 'کدام الگو بیشتر علیه CADASIL و به نفع MS است؟'), [
    L('Ovoide perivenuläre Läsionen mit Dawson-Fingern und Rückenmarksherden', 'Ovoid perivenular lesions with Dawson fingers and spinal-cord lesions', 'ضایعات بیضوی پری‌ونولار با Dawson finger و ضایعات نخاعی'),
    L('Symmetrischer Temporalpol- und External-capsule-Befall', 'Symmetric temporal-pole and external-capsule involvement', 'درگیری متقارن قطب تمپورال و کپسول خارجی'),
    L('Lakunäre Infarkte in Pons und Thalamus', 'Lacunar infarcts in the pons and thalamus', 'انفارکت‌های لاکونار در پونز و تالاموس'),
    L('Konfluierende tiefe Marklagerläsionen mit Migräneanamnese', 'Confluent deep white-matter lesions with migraine history', 'ضایعات کانفلوئنت ماده سفید عمقی با سابقه میگرن'),
  ], 0, L('Dawson-Finger, juxtakortikale/infratentorielle Herde und Rückenmarksbeteiligung sind typisch entzündlich-demyelinisierend.', 'Dawson fingers, juxtacortical/infratentorial lesions and spinal involvement favour inflammatory demyelination.', 'Dawson finger و ضایعات جوکستاکورتیکال/اینفراتنتوریال و نخاعی به نفع دمیلیناسیون التهابی‌اند.')),
  Q('11', L('Welche Aussage zur antithrombotischen Therapie ist am präzisesten?', 'Which statement about antithrombotic therapy is most precise?', 'کدام عبارت درباره درمان ضدترومبوتیک دقیق‌تر است؟'), [
    L('Sie erfordert eine individuelle Abwägung von Ischämie- und Blutungsrisiko.', 'It requires individual balancing of ischaemic and haemorrhagic risk.', 'نیازمند سنجش فردی خطر ایسکمی و خونریزی است.'),
    L('Thrombozytenhemmer sind bei jedem genetisch bestätigten Fall obligat.', 'Antiplatelets are mandatory in every genetically confirmed case.', 'ضدپلاکت در هر مورد ژنتیکی تأییدشده اجباری است.'),
    L('Antikoagulation ist wegen des dominanten Erbgangs grundsätzlich kontraindiziert.', 'Anticoagulation is absolutely contraindicated because of dominant inheritance.', 'ضدانعقاد به علت وراثت غالب مطلقاً ممنوع است.'),
    L('Mikroblutungen haben keinen Einfluss auf die Therapieentscheidung.', 'Microbleeds do not affect treatment decisions.', 'میکروخونریزی‌ها بر تصمیم درمانی اثری ندارند.'),
  ], 0, L('Es gibt keine pauschale Regel. Indikation, vorausgegangene Ischämie, Mikroblutungsbelastung und individuelles Blutungsrisiko müssen gemeinsam bewertet werden.', 'There is no universal rule. Indication, prior ischaemia, microbleed burden and individual bleeding risk must be weighed together.', 'قاعده کلی وجود ندارد؛ اندیکاسیون، ایسکمی قبلی، بار میکروخونریزی و خطر فردی خونریزی باید با هم سنجیده شوند.')),
  Q('12', L('Welche Befundformulierung ist bei typischem MRT-Muster am besten?', 'Which report conclusion is best for a typical MRI pattern?', 'کدام جمع‌بندی گزارش برای الگوی تیپیک MRI مناسب‌تر است؟'), [
    L('Verteilungsmuster hochgradig verdächtig auf CADASIL; klinisch-genetische Korrelation und NOTCH3-Diagnostik empfohlen.', 'Distribution highly suspicious for CADASIL; recommend clinical-genetic correlation and NOTCH3 testing.', 'الگوی توزیع بسیار مشکوک به CADASIL؛ تطابق بالینی-ژنتیکی و آزمایش NOTCH3 توصیه می‌شود.'),
    L('Bildmorphologisch gesichertes CADASIL; weitere Diagnostik nicht erforderlich.', 'Imaging-proven CADASIL; no further testing required.', 'CADASIL قطعی بر اساس تصویر؛ بررسی بیشتر لازم نیست.'),
    L('Unspezifische Mikroangiopathie ohne Hinweis auf eine hereditäre Ursache.', 'Non-specific small-vessel disease without evidence of hereditary disease.', 'بیماری غیراختصاصی عروق کوچک بدون شواهد علت ارثی.'),
    L('Primär demyelinisierende Erkrankung; Liquorpunktion obligat.', 'Primary demyelinating disease; lumbar puncture mandatory.', 'بیماری اولیه دمیلینه؛ پونکسیون کمری الزامی است.'),
  ], 0, L('Die MRT begründet einen hochgradigen Verdacht, sichert die Diagnose aber nicht. Die Formulierung soll die klinisch-genetische Abklärung auslösen.', 'MRI creates high suspicion but does not confirm the diagnosis. The report should prompt clinical-genetic evaluation.', 'MRI شک بالا ایجاد می‌کند اما تشخیص را قطعی نمی‌کند؛ گزارش باید بررسی بالینی-ژنتیکی را هدایت کند.')),
]

export const CADASIL_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  CADASIL_QUESTION_SEEDS.map(seed => ({
    id: `cadasil-${lang}-${seed.id}`,
    tags: ['cadasil', 'mikroangiopathie', 'gehirn'],
    fach: 'gehirn',
    question: seed.question[lang],
    options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
    correct: String.fromCharCode(65 + seed.correct),
    explanation: seed.explanation[lang],
  })),
]))

const CADASIL_FLASH_SEEDS = [
  F('definition', L('Grundlagen', 'Basics', 'مبانی'), L('Wofür steht CADASIL?', 'What does CADASIL stand for?', 'CADASIL مخفف چیست؟'), L('Cerebral Autosomal Dominant Arteriopathy with Subcortical Infarcts and Leukoencephalopathy.', 'Cerebral Autosomal Dominant Arteriopathy with Subcortical Infarcts and Leukoencephalopathy.', 'آرتریوپاتی مغزی اتوزوم غالب همراه با انفارکت‌های ساب‌کورتیکال و لوکوآنسفالوپاتی.'), L('Es ist die häufigste monogene zerebrale Mikroangiopathie.', 'It is the most common monogenic cerebral small-vessel disease.', 'شایع‌ترین بیماری تک‌ژنی عروق کوچک مغزی است.')),
  F('gen', L('Genetik', 'Genetics', 'ژنتیک'), L('Gen, Chromosom und Erbgang?', 'Gene, chromosome and inheritance?', 'ژن، کروموزوم و نوع وراثت؟'), L('NOTCH3 auf Chromosom 19; autosomal-dominant.', 'NOTCH3 on chromosome 19; autosomal dominant.', 'NOTCH3 روی کروموزوم ۱۹؛ اتوزوم غالب.'), L('Das Risiko für jedes Kind einer betroffenen Person beträgt 50 %.', 'Each child of an affected person has a 50% inheritance risk.', 'خطر انتقال به هر فرزند فرد مبتلا ۵۰٪ است.')),
  F('pathologie', L('Pathologie', 'Pathology', 'پاتولوژی'), L('Was ist GOM?', 'What is GOM?', 'GOM چیست؟'), L('Granular osmiophilic material in der Gefäßwand.', 'Granular osmiophilic material in the vessel wall.', 'ماده گرانولار اسمیوفیلیک در دیواره عروق.'), L('GOM und Degeneration glatter Muskelzellen stützen die Diagnose in der Hautbiopsie.', 'GOM and smooth-muscle-cell degeneration support diagnosis on skin biopsy.', 'GOM و دژنراسیون سلول‌های عضله صاف در بیوپسی پوست تشخیص را حمایت می‌کنند.')),
  F('temporalpol', L('MRT', 'MRI', 'MRI'), L('Spezifischster MRT-Hinweis?', 'Most specific MRI clue?', 'اختصاصی‌ترین سرنخ MRI؟'), L('Bilaterale FLAIR-Hyperintensitäten der anterioren Temporalpole.', 'Bilateral anterior temporal-pole FLAIR hyperintensity.', 'هایپراینتنسیتی دوطرفه FLAIR قطب‌های قدامی تمپورال.'), L('Auch O’Sullivan-Zeichen genannt.', 'Also called the O’Sullivan sign.', 'علامت O’Sullivan نیز نامیده می‌شود.')),
  F('capsula', L('MRT', 'MRI', 'MRI'), L('Bedeutung der Capsula externa?', 'Significance of the external capsule?', 'اهمیت کپسول خارجی؟'), L('Häufig und sensitiv beteiligt, aber weniger spezifisch als der Temporalpol.', 'Common and sensitive involvement, but less specific than the temporal pole.', 'درگیری شایع و حساس، اما کم‌اختصاص‌تر از قطب تمپورال.'), L('Ein isolierter Befall beweist CADASIL nicht.', 'Isolated involvement does not prove CADASIL.', 'درگیری منفرد CADASIL را ثابت نمی‌کند.')),
  F('lakunen', L('MRT', 'MRI', 'MRI'), L('Typische Lokalisationen der Lakunen?', 'Typical lacune locations?', 'محل‌های تیپیک لاکون؟'), L('Centrum semiovale, Basalganglien, Thalamus und Pons.', 'Centrum semiovale, basal ganglia, thalamus and pons.', 'سنتروم سمی‌اووال، بازال گانگلیا، تالاموس و پونز.'), L('Akute Lakunen sind DWI-positiv; chronische werden liquoräquivalent.', 'Acute lacunes are DWI-positive; chronic lacunes become CSF-like.', 'لاکون حاد DWI مثبت و مزمن شبیه CSF می‌شود.')),
  F('mikroblutungen', L('SWI', 'SWI', 'SWI'), L('Verteilung der Mikroblutungen?', 'Distribution of microbleeds?', 'توزیع میکروخونریزی‌ها؟'), L('Lobär und tief möglich.', 'Both lobar and deep locations are possible.', 'هم لوبار و هم عمقی ممکن است.'), L('Die Mikroblutungslast ist für antithrombotische Entscheidungen relevant.', 'Microbleed burden matters for antithrombotic decisions.', 'بار میکروخونریزی برای تصمیم ضدترومبوتیک مهم است.')),
  F('klinik', L('Klinik', 'Clinical', 'بالینی'), L('Vier zentrale klinische Manifestationen?', 'Four central clinical manifestations?', 'چهار تظاهر بالینی اصلی؟'), L('Migräne mit Aura, lakunäre Schlaganfälle, psychiatrische Symptome, kognitiver Abbau.', 'Migraine with aura, lacunar strokes, psychiatric symptoms and cognitive decline.', 'میگرن با اورا، سکته لاکونار، علائم روان‌پزشکی و افت شناختی.'), L('Migräne kann den Schlaganfällen um Jahre vorausgehen.', 'Migraine may precede strokes by years.', 'میگرن ممکن است سال‌ها پیش از سکته‌ها باشد.')),
  F('familie', L('Diagnostik', 'Diagnosis', 'تشخیص'), L('Schließt fehlende Familienanamnese CADASIL aus?', 'Does a negative family history exclude CADASIL?', 'آیا سابقه خانوادگی منفی CADASIL را رد می‌کند؟'), L('Nein.', 'No.', 'خیر.'), L('Kleine Familien, Fehldiagnosen, variable Expression und de-novo-Varianten können das Muster verschleiern.', 'Small families, misdiagnosis, variable expression and de-novo variants may obscure the pattern.', 'خانواده کوچک، تشخیص اشتباه، بیان متغیر و de novo می‌توانند الگو را پنهان کنند.')),
  F('sicherung', L('Diagnostik', 'Diagnosis', 'تشخیص'), L('Wie wird CADASIL gesichert?', 'How is CADASIL confirmed?', 'CADASIL چگونه تأیید می‌شود؟'), L('Durch eine pathogene/wahrscheinlich pathogene heterozygote NOTCH3-Variante.', 'By a pathogenic/likely pathogenic heterozygous NOTCH3 variant.', 'با واریانت هتروزیگوت بیماری‌زا/احتمالاً بیماری‌زای NOTCH3.'), L('Das MRT allein ist nicht beweisend.', 'MRI alone is not diagnostic.', 'MRI به‌تنهایی قطعی نیست.')),
  F('protokoll', L('MRT', 'MRI', 'MRI'), L('Minimales MRT-Protokoll?', 'Minimum MRI protocol?', 'حداقل پروتکل MRI؟'), L('T1, T2, FLAIR, DWI/ADC und SWI/T2*.', 'T1, T2, FLAIR, DWI/ADC and SWI/T2*.', 'T1، T2، FLAIR، DWI/ADC و SWI/T2*.'), L('So werden WMH, akute Infarkte, Lakunen, Atrophie und Mikroblutungen erfasst.', 'This assesses WMH, acute infarcts, lacunes, atrophy and microbleeds.', 'این پروتکل WMH، انفارکت حاد، لاکون، آتروفی و میکروخونریزی را بررسی می‌کند.')),
  F('dd-carasil', L('Differenzialdiagnose', 'Differential', 'افتراقی'), L('CADASIL vs. CARASIL?', 'CADASIL vs CARASIL?', 'CADASIL در برابر CARASIL؟'), L('CADASIL: NOTCH3, dominant. CARASIL: HTRA1, klassisch rezessiv, Alopezie + Spondylose.', 'CADASIL: NOTCH3, dominant. CARASIL: HTRA1, classically recessive, alopecia + spondylosis.', 'CADASIL: NOTCH3 غالب. CARASIL: HTRA1 معمولاً مغلوب، آلوپسی + اسپوندیلوز.'), L('Dominante HTRA1-Erkrankungen sind ebenfalls möglich.', 'Dominant HTRA1-related disease also exists.', 'بیماری غالب مرتبط با HTRA1 نیز وجود دارد.')),
  F('dd-ms', L('Differenzialdiagnose', 'Differential', 'افتراقی'), L('Bildhinweise für MS statt CADASIL?', 'Imaging clues for MS rather than CADASIL?', 'سرنخ‌های MRI به نفع MS؟'), L('Dawson-Finger, juxtakortikale und Rückenmarksherde, aktive KM-Aufnahme.', 'Dawson fingers, juxtacortical and spinal lesions, active enhancement.', 'Dawson finger، ضایعات جوکستاکورتیکال و نخاعی، جذب فعال کنتراست.'), L('CADASIL ist eher symmetrisch und mikroangiopathisch verteilt.', 'CADASIL is more symmetric and follows a small-vessel pattern.', 'CADASIL متقارن‌تر و با الگوی عروق کوچک است.')),
  F('therapie', L('Management', 'Management', 'مدیریت'), L('Gibt es eine kausale Therapie?', 'Is there disease-modifying treatment?', 'آیا درمان علّی وجود دارد؟'), L('Nein; Behandlung ist symptomatisch und risikoorientiert.', 'No; treatment is symptomatic and risk-oriented.', 'خیر؛ درمان علامتی و مبتنی بر کاهش خطر است.'), L('Vaskuläre Risikofaktoren konsequent behandeln und genetisch beraten.', 'Treat vascular risk factors and provide genetic counselling.', 'عوامل خطر عروقی را کنترل و مشاوره ژنتیک ارائه کنید.')),
  F('befund', L('Befundung', 'Reporting', 'گزارش'), L('Prüfungssichere Schlussformulierung?', 'Exam-ready report conclusion?', 'جمع‌بندی مناسب گزارش؟'), L('Muster hochgradig verdächtig auf CADASIL; klinisch-genetische Korrelation und NOTCH3-Testung empfohlen.', 'Pattern highly suspicious for CADASIL; recommend clinical-genetic correlation and NOTCH3 testing.', 'الگو بسیار مشکوک به CADASIL؛ تطابق بالینی-ژنتیکی و آزمایش NOTCH3 توصیه می‌شود.'), L('Nicht „bildmorphologisch gesichert“ formulieren.', 'Do not call it imaging-confirmed.', 'از عبارت تأیید قطعی بر اساس تصویر استفاده نکنید.')),
]

export const CADASIL_FLASHCARDS = CADASIL_FLASH_SEEDS.map((item, index) => ({
  id: `cadasil-${String(index + 1).padStart(2, '0')}-${item.id}`,
  topicId: 'cadasil',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
}))

export const CADASIL_FLASHCARD_TOPIC = {
  id: 'cadasil',
  area: 'Kopf',
  chapter: 'Vaskuläre Erkrankungen',
  icon: '🧬',
  iconImage: '/fach/gehirn.png',
  color: '#7c3aed',
  href: '/flashcards/cadasil',
  title: L('CADASIL', 'CADASIL', 'CADASIL'),
  subtitle: L(
    'NOTCH3 · Temporalpol · Capsula externa · Lakunen · Mikroblutungen',
    'NOTCH3 · temporal pole · external capsule · lacunes · microbleeds',
    'NOTCH3 · قطب تمپورال · کپسول خارجی · لاکون · میکروخونریزی'
  ),
}
