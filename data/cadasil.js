const L = (de, en, fa) => ({ de, en, fa })

export const CADASIL_LESSON = {
  breadcrumb: L('CADASIL', 'CADASIL', 'CADASIL'),
  title: L(
    'CADASIL – hereditäre zerebrale Mikroangiopathie',
    'CADASIL – hereditary cerebral small-vessel disease',
    'CADASIL – بیماری ارثی عروق کوچک مغزی'
  ),
  definition: L(
    'Autosomal-dominante Arteriopathie durch pathogene NOTCH3-Varianten mit Migräne, rezidivierenden subkortikalen Infarkten und progredienter Leukoenzephalopathie.',
    'An autosomal-dominant arteriopathy caused by pathogenic NOTCH3 variants, characterised by migraine, recurrent subcortical infarcts and progressive leukoencephalopathy.',
    'آرتریوپاتی اتوزوم غالب ناشی از واریانت‌های بیماری‌زای NOTCH3 که با میگرن، انفارکت‌های ساب‌کورتیکال عودکننده و لوکوآنسفالوپاتی پیشرونده مشخص می‌شود.'
  ),
  sourceLabel: 'Dr. Zia · CADASIL',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),
  heroCards: [
    {
      value: 'NOTCH3',
      label: L('Chromosom 19', 'Chromosome 19', 'کروموزوم ۱۹'),
      text: L('autosomal-dominanter Erbgang', 'autosomal-dominant inheritance', 'وراثت اتوزوم غالب'),
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
    { id: 'fall', icon: '🖼️', label: L('Fall rID 22131', 'Case rID 22131', 'مورد rID 22131') },
    { id: 'management', icon: '🛡️', label: L('Management', 'Management', 'مدیریت') },
    { id: 'takehome', icon: '🏁', label: L('Take-home', 'Take-home', 'جمع‌بندی') },
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
    title: L('Fallbeispiel – Radiopaedia rID 22131', 'Teaching case – Radiopaedia rID 22131', 'مورد آموزشی – Radiopaedia rID 22131'),
    lead: L(
      'Die axialen FLAIR-Aufnahmen zeigen das typische Verteilungsmuster einer hereditären Mikroangiopathie. Öffne die Bilder und arbeite sie von kaudal nach kranial durch.',
      'Axial FLAIR images demonstrate the characteristic distribution of hereditary small-vessel disease. Open the images and review them from caudal to cranial.',
      'تصاویر محوری FLAIR الگوی تیپیک بیماری ارثی عروق کوچک را نشان می‌دهند. تصاویر را باز کرده و از کائودال به کرانیال بررسی کنید.'
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
    source: L(
      'Bildquelle: Radiopaedia, Fall rID 22131; bereitgestellt in der CADASIL-DOCX-Vorlage.',
      'Image source: Radiopaedia, case rID 22131; supplied in the CADASIL DOCX source.',
      'منبع تصاویر: Radiopaedia، مورد rID 22131؛ ارائه‌شده در فایل DOCX مربوط به CADASIL.'
    ),
    sourceUrl: 'https://radiopaedia.org/cases/22131',
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
    title: L('Take-home Messages', 'Take-home messages', 'نکات کلیدی'),
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

  references: [
    {
      label: 'GeneReviews: CADASIL',
      href: 'https://www.ncbi.nlm.nih.gov/books/NBK1500/',
    },
    {
      label: 'Radiopaedia case rID 22131',
      href: 'https://radiopaedia.org/cases/22131',
    },
  ],
}
