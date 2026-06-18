// ── Intrazerebrale Blutung (ICB) ─────────────────────────────────────────────
// Alle Inhalte: Lesson, MCQs, Flashcards, Lernfälle

const L = (de, en, fa) => ({ de, en, fa })

// ── LESSON ───────────────────────────────────────────────────────────────────

export const ICB_LESSON = {
  toc: L('Inhaltsverzeichnis', 'Contents', 'فهرست مطالب'),
  breadcrumbArea: L('Kopf', 'Head', 'سر'),
  breadcrumbCurrent: L(
    'Vaskuläre Erkrankungen · Intrazerebrale Blutung',
    'Vascular diseases · Intracerebral haemorrhage',
    'بیماری‌های عروقی · خونریزی داخل مغزی'
  ),
  title: L('Intrazerebrale Blutung', 'Intracerebral Haemorrhage', 'خونریزی داخل مغزی'),
  subtitle: L(
    'CT-Stadien, MRT-Signalverhalten, Swirl-/Spot-Sign und Differenzialdiagnostik',
    'CT stages, MRI signal evolution, swirl/spot sign and differential diagnosis',
    'مراحل CT، سیر سیگنال MRI، علامت Swirl/Spot و تشخیص افتراقی'
  ),
  sourceLabel: 'Dr. Zia',
  actionMcq: 'MCQ',
  actionFlash: L('Flashcards', 'Flashcards', 'فلش‌کارت'),
  keyLabel: L('Merke', 'Key point', 'نکته مهم'),
  caveLabel: L('CAVE', 'Caution', 'احتیاط'),
  openCase: L('Fall in Radiopaedia öffnen', 'Open case in Radiopaedia', 'باز کردن کیس در Radiopaedia'),
  sections: [
    { id: 'klinik', label: L('Klinik & Ätiologie', 'Clinical & aetiology', 'بالین و علت‌شناسی'), icon: '🩸' },
    { id: 'ct', label: L('CT-Diagnostik', 'CT diagnosis', 'تشخیص CT'), icon: '🖥️' },
    { id: 'mrt', label: L('MRT-Signalverhalten', 'MRI signal evolution', 'سیر سیگنال MRI'), icon: '🧲' },
    { id: 'sequenzen', label: L('Sequenzen & Praxis', 'Sequences & practice', 'سکانس‌ها و کاربرد بالینی'), icon: '📋' },
    { id: 'faelle', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'), icon: '🔬' },
    { id: 'takehome', label: L('Take home message', 'Take-home messages', 'نکات کلیدی'), icon: '💡' },
  ],
  heroCards: [
    {
      value: '50–80',
      label: L('HU akut', 'HU acute', 'HU حاد'),
      text: L('Frisches Blut ist nativ-CT hyperdens – das wichtigste erste Zeichen.', 'Fresh blood is hyperattenuating on NCCT — the key first sign.', 'خون تازه در CT بدون کنتراست هایپردنس است — اولین علامت کلیدی.'),
    },
    {
      value: 'T1↑',
      label: L('Früh subakut', 'Early subacute', 'اولیه زیرحاد'),
      text: L('T1-Hyperintensität durch Met-Hb ist das verlässlichste MRT-Zeichen für eine Blutung > 3 Tage.', 'T1 hyperintensity from metHb is the most reliable MRI sign of haemorrhage >3 days old.', 'هایپرانتنسیتی T1 از Met-Hb قابل اعتمادترین علامت MRI برای خونریزی > ۳ روز است.'),
    },
    {
      value: 'SWI',
      label: L('Chronisch sensitiv', 'Chronic detection', 'تشخیص مزمن'),
      text: L('Nur SWI/T2* erkennt alte Mikroblutungen – CT ist chronisch blind.', 'Only SWI/T2* detects old microbleeds — CT is blind to chronic haemorrhage.', 'فقط SWI/T2* خونریزی‌های کوچک قدیمی را تشخیص می‌دهد — CT در مرحله مزمن کور است.'),
    },
  ],

  // ── Section 1: Klinik & Ätiologie ─────────────────────────────────────────
  klinik: {
    title: L('Klinik & Ätiologie', 'Clinical features & aetiology', 'تظاهرات بالینی و علت‌شناسی'),
    lead: L(
      'Die ICB ist eine Einblutung ins Hirnparenchym. Sie macht etwa 10–15 % aller Schlaganfälle aus und hat eine 30-Tage-Mortalität von rund 40 %. Die genaue Ätiologie bestimmt Lokalisation, Verlauf und Therapie.',
      'ICB is bleeding into the brain parenchyma. It accounts for roughly 10–15 % of all strokes and carries a 30-day mortality of around 40 %. The aetiology determines location, course and treatment.',
      'ICB خونریزی داخل پارانشیم مغز است. حدود ۱۰-۱۵٪ از تمام سکته‌ها را تشکیل داده و مرگ‌ومیر ۳۰ روزه آن حدود ۴۰٪ است.'
    ),
    definitionTitle: L('Definition', 'Definition', 'تعریف'),
    definitionItems: [
      { title: L('Makroblutung', 'Macrobleed', 'ماکروبلید'), text: L('Durchmesser > 10 mm · klinisch symptomatisch', 'Diameter > 10 mm · clinically symptomatic', 'قطر > ۱۰ میلی‌متر · علامت‌دار بالینی') },
      { title: L('Mikroblutung', 'Microbleed', 'میکروبلید'), text: L('Durchmesser < 10 mm · oft nur auf SWI/T2* sichtbar · Marker für Mikroangiopathie oder CAA', 'Diameter < 10 mm · often visible only on SWI/T2* · marker of small-vessel disease or CAA', 'قطر < ۱۰ میلی‌متر · اغلب فقط روی SWI/T2* قابل رؤیت · نشانگر میکروآنژیوپاتی یا CAA') },
    ],
    aetiologyHeaders: [
      L('Ursache', 'Cause', 'علت'),
      L('Häufigkeit', 'Frequency', 'فراوانی'),
      L('Typische Lokalisation', 'Typical location', 'محل تیپیک'),
    ],
    aetiologyRows: [
      [L('Arterieller Hypertonus', 'Arterial hypertension', 'فشار خون شریانی'), '50–70 %', L('Putamen, Thalamus, Pons, Kleinhirn', 'Putamen, thalamus, pons, cerebellum', 'پوتامن، تالاموس، پونز، مخچه')],
      [L('Zerebrale Amyloidangiopathie (CAA)', 'Cerebral amyloid angiopathy (CAA)', 'آنژیوپاتی آمیلوئید مغزی (CAA)'), '15–20 %', L('Lobär (kortexnah), oft multipel', 'Lobar (cortical), often multiple', 'لوبار (نزدیک کورتکس)، اغلب چندگانه')],
      [L('Orale Antikoagulanzien (OAK)', 'Oral anticoagulants', 'ضدانعقادهای خوراکی'), '4–20 %', L('Meist lobär oder kleines Volumen', 'Usually lobar or small volume', 'معمولاً لوبار یا حجم کوچک')],
      [L('Einblutung in Tumor', 'Haemorrhage into tumour', 'خونریزی درون تومور'), '~5 %', L('Variabel, oft perifokal Ödem > Hämatom', 'Variable, perilesional oedema often > haematoma', 'متغیر، اغلب ادم اطراف > هماتوم')],
      [L('Vaskuläre Malformationen (AVM, Kavernom)', 'Vascular malformations (AVM, cavernoma)', 'مالفورماسیون‌های عروقی (AVM، کاورنوم)'), '1–2 %', L('Variabel, eher jüngere Patienten', 'Variable, younger patients more common', 'متغیر، بیماران جوان‌تر')],
    ],
    cave: L(
      'Ist das perifokale Ödem unverhältnismäßig groß im Vergleich zur Blutungsgröße, muss an eine sekundäre Ursache (Tumor, hämorrhagischer Infarkt) gedacht werden. Ist der Patient zu jung für eine CAA, sollte eine vaskuläre Malformation (AVM, Kavernom) mittels CTA ausgeschlossen werden.',
      'If perilesional oedema is disproportionately large relative to haematoma size, suspect a secondary cause (tumour, haemorrhagic infarct). If the patient is too young for CAA, exclude a vascular malformation (AVM, cavernoma) by CTA.',
      'اگر ادم اطراف ضایعه نسبت به اندازه خونریزی بیش از حد بزرگ باشد، باید به علت ثانویه (تومور، انفارکت هموراژیک) فکر کرد. اگر بیمار برای CAA خیلی جوان است، مالفورماسیون عروقی (AVM، کاورنوم) با CTA رد شود.'
    ),
    key: L(
      'Primäre ICB (80–85 %) ist meistens Folge von arteriellem Hypertonus oder CAA. Lokalisationsanalyse und Altersabschätzung im CT helfen, zwischen beiden zu unterscheiden.',
      'Primary ICB (80–85 %) is most commonly caused by hypertension or CAA. Location analysis and patient age help distinguish the two.',
      'ICB اولیه (۸۰-۸۵٪) معمولاً ناشی از فشار خون شریانی یا CAA است. آنالیز محل و سن بیمار در تفکیک این دو کمک می‌کند.'
    ),
  },

  // ── Section 2: CT-Diagnostik ───────────────────────────────────────────────
  ct: {
    title: L('CT-Diagnostik · Stadien und Zeichen', 'CT diagnosis · stages and signs', 'تشخیص CT · مراحل و علائم'),
    lead: L(
      'Die native CCT ist der erste und wichtigste Schritt bei Verdacht auf ICB. Sie ist schnell, sensitiv für akutes Blut und zeigt Hämatomvolumen, Ventrikeleinbruch und perifokales Ödem.',
      'NCCT is the first and most important step when ICB is suspected. It is fast, sensitive for acute blood and shows haematoma volume, intraventricular extension and perilesional oedema.',
      'CT بدون کنتراست اولین و مهم‌ترین قدم در شک به ICB است. سریع بوده، برای خون حاد حساس است و حجم هماتوم، ورود به بطن‌ها و ادم اطراف را نشان می‌دهد.'
    ),
    stagesHeaders: [
      L('Stadium', 'Stage', 'مرحله'),
      L('Zeitraum', 'Timeframe', 'بازه زمانی'),
      L('CT nativ', 'NCCT', 'CT بدون کنتراست'),
      L('CT + KM', 'CT + contrast', 'CT با کنتراست'),
    ],
    stagesRows: [
      [L('Akut', 'Acute', 'حاد'), '1–6 Tage', L('Hyperdens 50–80 HU · perifokales Ödem', 'Hyperattenuating 50–80 HU · perilesional oedema', 'هایپردنس ۵۰-۸۰ HU · ادم اطراف'), L('Spot Sign = aktive KM-Extravasation', 'Spot sign = active CM extravasation', 'Spot Sign = خروج فعال ماده حاجب')],
      [L('Subakut', 'Subacute', 'زیرحاد'), '1–6 Wochen', L('Dichte ↓ ~1,5–2 HU/Tag · isodens nach 3–6 Wo', 'Attenuation ↓ ~1.5–2 HU/day · isoattenuating at 3–6 weeks', 'دانسیته ↓ ~۱.۵-۲ HU/روز · ایزودنس پس از ۳-۶ هفته'), L('Ringenhancement im Randbereich', 'Ring enhancement at periphery', 'حلقوی در حاشیه')],
      [L('Chronisch', 'Chronic', 'مزمن'), L('> 6 Wochen', '> 6 weeks', '> ۶ هفته'), L('Hypodens · Resorptionshöhle', 'Hypoattenuating · resorption cavity', 'هیپودنس · حفره جذب'), L('Ringenhancement mögl. bis 6 Monate', 'Ring enhancement possible up to 6 months', 'حلقوی ممکن تا ۶ ماه')],
    ],
    signsTitle: L('Wichtige CT-Zeichen', 'Key CT signs', 'علائم مهم CT'),
    signs: [
      {
        title: L('Swirl Sign', 'Swirl Sign', 'Swirl Sign'),
        text: L('Hypodense (unkoagulierte) Areale innerhalb des hyperdensen Hämatoms. Zeigt aktive Blutung an. Unabhängiger Prädiktor für Hämatomexpansion und erhöhte Mortalität.', 'Hypodense (unclotted) areas within the hyperattenuating haematoma, indicating active bleeding. Independent predictor of haematoma expansion and increased mortality.', 'مناطق هیپودنس (لخته نشده) درون هماتوم هایپردنس، نشان‌دهنده خونریزی فعال. پیش‌بینی‌کننده مستقل گسترش هماتوم و مرگ‌ومیر بالا.')
      },
      {
        title: L('Spot Sign (CTA)', 'Spot Sign (CTA)', 'Spot Sign (CTA)'),
        text: L('Aktive Kontrastmittelextravasation innerhalb des Hämatoms in der CTA. Stärker prädiktiv als das Swirl Sign: Hohes Risiko für Hämatomexpansion in den ersten Stunden.', 'Active contrast-medium extravasation within the haematoma on CTA. Stronger predictor than swirl sign: high risk of haematoma expansion within hours.', 'خروج فعال ماده حاجب درون هماتوم در CTA. پیش‌بینی‌کننده قوی‌تر از Swirl Sign: خطر بالای گسترش هماتوم در ساعات اول.')
      },
      {
        title: L('Ventrikeleinbruch', 'Intraventricular extension', 'نفوذ به بطن'),
        text: L('Hämatom bricht in das Ventrikelsystem ein → Aufstau, Hydrozephalus, schlechtere Prognose.', 'Haematoma extends into the ventricular system → obstruction, hydrocephalus, worse prognosis.', 'هماتوم به سیستم بطنی نفوذ می‌کند → انسداد، هیدروسفالوس، پیش‌آگهی بدتر.')
      },
    ],
    key: L(
      'CT nativ: Blutung = hyperdens. Dichteabnahme ~1,5–2 HU/Tag. Isodens-Phase (Falle!) nach 3–6 Wochen. Ringenhancement bis zu 6 Monate möglich → Cave DD Abszess, Tumor.',
      'NCCT: haemorrhage = hyperattenuating. Attenuation falls ~1.5–2 HU/day. Isoattenuating phase (pitfall!) at 3–6 weeks. Ring enhancement possible up to 6 months → pitfall: abscess, tumour.',
      'CT بدون کنتراست: خونریزی = هایپردنس. کاهش دانسیته ~۱.۵-۲ HU/روز. فاز ایزودنس (دام!) در ۳-۶ هفته. حلقوی تا ۶ ماه ممکن → احتیاط: DD آبسه، تومور.'
    ),
  },

  // ── Section 3: MRT-Signalverhalten ────────────────────────────────────────
  mrt: {
    title: L('MRT-Signalverhalten · Pathophysiologie', 'MRI signal behaviour · pathophysiology', 'سیر سیگنال MRI · پاتوفیزیولوژی'),
    lead: L(
      'Das MRT-Signal einer ICB ist kein einfaches Befundmuster, sondern spiegelt die biochemische Umwandlung von Hämoglobin wider. Entscheidend ist die Oxidationsstufe des Hämoglobins und die Integrität der Erythrozyten.',
      'The MRI signal of ICB does not follow a simple pattern: it reflects the biochemical conversion of haemoglobin. The oxidation state of haemoglobin and erythrocyte integrity are the key determinants.',
      'سیگنال MRI در ICB یک الگوی ساده نیست، بلکه تبدیل بیوشیمیایی هموگلوبین را منعکس می‌کند. وضعیت اکسیداسیون هموگلوبین و یکپارچگی اریتروسیت‌ها تعیین‌کننده‌های اصلی هستند.'
    ),
    pathophysItems: [
      {
        title: L('Oxy-Hb · hyperakut', 'Oxy-Hb · hyperacute', 'Oxy-Hb · فوق‌حاد'),
        text: L('Diamagnetisch → kein Suszeptibilitätseffekt → T2 hell wie Wasser. T1 iso bis leicht hypo. Noch kein Blooming auf T2*/SWI.', 'Diamagnetic → no susceptibility effect → T2 bright like water. T1 iso to mildly hypointense. No blooming on T2*/SWI yet.', 'دیاماگنتیک → بدون اثر سوسپتیبیلیتی → T2 مانند آب روشن. T1 ایزو تا کمی هیپو. هنوز Blooming در T2*/SWI ندارد.')
      },
      {
        title: L('Deoxy-Hb · akut', 'Deoxy-Hb · acute', 'Deoxy-Hb · حاد'),
        text: L('Paramagnetisch + intrazellulär kompartimentiert → starker T2*-Effekt (Blooming), aber KEINE T1-Verkürzung, weil Wasser das Eisen nicht erreicht. T1 iso/hypo, T2 stark hypo.', 'Paramagnetic + compartmentalised intracellularly → strong T2* effect (blooming), but NO T1 shortening because water cannot reach the iron. T1 iso/hypo, T2 markedly hypointense.', 'پاراماگنتیک + در داخل سلول محدود → اثر قوی T2* (Blooming)، اما بدون کوتاه‌شدن T1 زیرا آب به آهن نمی‌رسد. T1 ایزو/هیپو، T2 شدیداً هیپو.')
      },
      {
        title: L('Met-Hb intrazellulär · früh subakut', 'Met-Hb intracellular · early subacute', 'Met-Hb داخل سلولی · زیرحاد اولیه'),
        text: L('T1 wird HELL → diagnostisch wichtigster Wendepunkt! Wasser kann nun das Fe³⁺ in Met-Hb erreichen → Dipol-Dipol-Relaxation. T2 bleibt hypo (Kompartimentierungseffekt).', 'T1 becomes BRIGHT → most important diagnostic turning point! Water can now access Fe³⁺ in metHb → dipole-dipole relaxation. T2 remains hypointense (compartmentalisation effect).', 'T1 روشن می‌شود → مهم‌ترین نقطه تشخیصی! آب اکنون می‌تواند به Fe³⁺ در Met-Hb دسترسی یابد. T2 هیپو می‌ماند.')
      },
      {
        title: L('Met-Hb extrazellulär · spät subakut', 'Met-Hb extracellular · late subacute', 'Met-Hb خارج سلولی · زیرحاد دیررس'),
        text: L('Erythrozytenlyse → Suszeptibilität verschwindet → klassisches „bright–bright": T1 hell + T2 hell. Imitiert Melanom-Metastase oder fettige Läsion!', 'Erythrocyte lysis → susceptibility disappears → classic "bright-bright": T1 bright + T2 bright. May mimic melanoma metastasis or fatty lesion!', 'لیز اریتروسیت → سوسپتیبیلیتی ناپدید می‌شود → "bright-bright": T1 روشن + T2 روشن. ممکن است متاستاز ملانوم یا ضایعه چربی را تقلید کند!')
      },
      {
        title: L('Hämosiderin · chronisch', 'Haemosiderin · chronic', 'هموسیدرین · مزمن'),
        text: L('In Makrophagen gebunden, persistiert lebenslang → Blooming-Saum auf SWI. Nur MRT (SWI/T2*) erkennt alte Blutung – CT ist blind.', 'Bound in macrophages, persists lifelong → blooming ring on SWI. Only MRI (SWI/T2*) detects old haemorrhage — CT is blind.', 'در ماکروفاژها محدود شده، تمام عمر باقی می‌ماند → حلقه Blooming در SWI. فقط MRI (SWI/T2*) خونریزی قدیمی را تشخیص می‌دهد — CT کور است.')
      },
    ],
    imageAlt: L('MRT-Signalverlauf der ICB – T1, T2, T2*/SWI über sechs Stadien', 'MRI signal evolution of ICB – T1, T2, T2*/SWI over six stages', 'سیر سیگنال MRI در ICB — T1، T2، T2*/SWI در شش مرحله'),
    cave: L(
      'Die Stadiengrenzen sind fließend und hämatomgrößenabhängig. Die Konversion läuft von peripher nach zentral: Das Zentrum eines großen Hämatoms kann noch akutes Deoxy-Hb zeigen, während die Peripherie bereits Met-Hb aufweist.',
      'Stage boundaries are not sharp and depend on haematoma size. Conversion proceeds from periphery to centre: the centre of a large haematoma may still show acute deoxyHb while the periphery already shows metHb.',
      'مرزهای مراحل قطعی نیستند و به اندازه هماتوم بستگی دارند. تبدیل از محیط به مرکز پیش می‌رود: مرکز یک هماتوم بزرگ ممکن است هنوز Deoxy-Hb حاد نشان دهد در حالی که محیط آن Met-Hb دارد.'
    ),
    key: L(
      'T1 hell (früh subakut) ist das älteste verlässliche MRT-Zeichen für eine Blutung > 3 Tage. Bright–Bright (T1+T2 hell) imitiert Melanommetastasen → immer SWI und Verlauf beachten.',
      'T1 hyperintensity (early subacute) is the oldest reliable MRI sign of haemorrhage >3 days. Bright-bright (T1+T2 hyperintense) mimics melanoma metastases → always check SWI and follow up.',
      'T1 روشن (زیرحاد اولیه) قدیمی‌ترین علامت قابل اعتماد MRI برای خونریزی > ۳ روز است. Bright-Bright (T1+T2 روشن) متاستاز ملانوم را تقلید می‌کند → همیشه SWI و پیگیری را در نظر بگیرید.'
    ),
  },

  // ── Section 4: Sequenzen & Praxis ─────────────────────────────────────────
  sequenzen: {
    title: L('Klinisch wertvolle Sequenzen je Stadium', 'Clinically useful sequences by stage', 'سکانس‌های مفید بالینی بر اساس مرحله'),
    lead: L(
      'Je nach klinischem Kontext und Stadium der Blutung sind unterschiedliche MRT-Sequenzen am aussagekräftigsten. Die Kombination mehrerer Sequenzen erhöht Sicherheit und Staging-Genauigkeit.',
      'Depending on the clinical context and stage of haemorrhage, different MRI sequences are most informative. Combining sequences improves confidence and staging accuracy.',
      'بسته به بافت بالینی و مرحله خونریزی، سکانس‌های مختلف MRI اطلاعات بیشتری می‌دهند. ترکیب چند سکانس اعتماد و دقت مرحله‌بندی را بهبود می‌دهد.'
    ),
    items: [
      {
        title: L('Hyperakut / akut → SWI / T2*', 'Hyperacute / acute → SWI / T2*', 'فوق‌حاد / حاد → SWI / T2*'),
        text: L('Sensitivste Sequenz: Blooming bereits vorhanden, wenn CT noch unsicher. Essentiell bei klinischem Schlaganfallverdacht und negativem CT.', 'Most sensitive sequence: blooming already present when CT is still uncertain. Essential when clinical stroke is suspected but CT is negative.', 'حساس‌ترین سکانس: Blooming موجود است حتی وقتی CT هنوز مبهم است. ضروری در شک بالینی به سکته با CT منفی.')
      },
      {
        title: L('Früh subakut → T1 w.o. KM', 'Early subacute → T1 without contrast', 'زیرحاد اولیه → T1 بدون کنتراست'),
        text: L('T1-Hyperintensität ist das älteste verlässliche Zeichen für „Blutung > 3 Tage". Periphere Aufhellung peripher vor zentral spricht für Hämatom, nicht Tumor.', 'T1 hyperintensity is the oldest reliable sign of "haemorrhage >3 days". Peripheral brightening before central supports haematoma rather than tumour.', 'هایپرانتنسیتی T1 قدیمی‌ترین علامت قابل اعتماد "خونریزی > ۳ روز" است.')
      },
      {
        title: L('Spät subakut → T1 + T2 + SWI', 'Late subacute → T1 + T2 + SWI', 'زیرحاد دیررس → T1 + T2 + SWI'),
        text: L('Bright–Bright imitiert Melanommetastase oder fettige Läsion → SWI zeigt charakteristischen Randsaum und schließt diese DDs weitgehend aus.', '"Bright-bright" mimics melanoma metastasis or fatty lesion → SWI shows a characteristic rim and largely excludes these DDs.', '"Bright-Bright" متاستاز ملانوم یا ضایعه چربی را تقلید می‌کند → SWI حلقه مشخصه‌ای نشان داده و این DDs را رد می‌کند.')
      },
      {
        title: L('Chronisch → nur MRT (SWI)', 'Chronic → MRI only (SWI)', 'مزمن → فقط MRI (SWI)'),
        text: L('CT ist chronisch blind für alte Blutungen. SWI ist die einzige Sequenz, die Hämosiderin-Saum und Mikroblutungen (z. B. bei CAA) verlässlich zeigt.', 'CT is blind to chronic haemorrhage. SWI is the only sequence that reliably shows the haemosiderin rim and microbleeds (e.g. in CAA).', 'CT در مرحله مزمن کور است. SWI تنها سکانسی است که حلقه هموسیدرین و میکروبلیدها (مثلاً در CAA) را به‌درستی نشان می‌دهد.')
      },
    ],
    ddItems: [
      {
        title: L('Bright–Bright → Melanommetastase?', '"Bright-bright" → melanoma metastasis?', 'Bright-Bright → متاستاز ملانوم؟'),
        text: L('SWI: Hämosiderin-Saum beim Hämatom. Klinik + MRT-Verlauf. Melanommetastasen zeigen meist kein ausgeprägtes Blooming auf SWI.', 'SWI: haemosiderin rim in haematoma. Clinical context + MRI follow-up. Melanoma metastases rarely show pronounced blooming on SWI.', 'SWI: حلقه هموسیدرین در هماتوم. بافت بالینی + پیگیری MRI.')
      },
      {
        title: L('Ringenhancement → Abszess? Tumor?', 'Ring enhancement → abscess? tumour?', 'حلقوی → آبسه؟ تومور؟'),
        text: L('DWI: Abszess zeigt Diffusionsrestriktion im Zentrum. Bei Tumor ist das Ödem oft größer als die Läsion und überproportional ausgeprägt.', 'DWI: abscess shows central diffusion restriction. In tumour, oedema is often larger than the lesion and disproportionate.', 'DWI: آبسه در مرکز محدودیت دیفیوژن نشان می‌دهد. در تومور، ادم اغلب بزرگ‌تر از ضایعه است.')
      },
    ],
    key: L(
      'Faustregel: Akut → SWI. Subakut → T1. Chronisch → SWI. Bei Unsicherheit immer SWI + T1 kombinieren.',
      'Rule of thumb: acute → SWI. Subacute → T1. Chronic → SWI. When in doubt always combine SWI + T1.',
      'قانون کلی: حاد → SWI. زیرحاد → T1. مزمن → SWI. در صورت شک همیشه SWI + T1 را ترکیب کنید.'
    ),
  },

  // ── Section 5: Fallbeispiele ──────────────────────────────────────────────
  cases: {
    title: L('Fallbeispiele · Radiopaedia', 'Cases · Radiopaedia', 'نمونه کیس‌ها · Radiopaedia'),
    lead: L(
      'Drei Fälle von Radiopaedia.org illustrieren CT und MRT der ICB in verschiedenen Stadien.',
      'Three Radiopaedia.org cases illustrate CT and MRI of ICB at different stages.',
      'سه کیس از Radiopaedia.org CT و MRI در مراحل مختلف ICB را نشان می‌دهند.'
    ),
  },

  // ── Section 6: Take home ──────────────────────────────────────────────────
  takehome: {
    title: L('Take home message', 'Take-home messages', 'نکات کلیدی'),
    lead: L('Die wichtigsten Merksätze zur ICB.', 'The key take-home points for ICB.', 'مهم‌ترین نکات کلیدی درباره ICB.'),
    items: [
      {
        title: L('CT-Dichte akut', 'Acute CT attenuation', 'دانسیته CT حاد'),
        text: L('Frische ICB = 50–80 HU (hyperdens). Dichteabnahme ~1,5–2 HU/Tag → nach 3–6 Wochen isodens (Falle!).', 'Fresh ICB = 50–80 HU (hyperattenuating). Attenuation decreases ~1.5–2 HU/day → isoattenuating at 3–6 weeks (pitfall!).', 'ICB تازه = ۵۰-۸۰ HU (هایپردنس). دانسیته ~۱.۵-۲ HU/روز کاهش → ایزودنس در ۳-۶ هفته (دام!).')
      },
      {
        title: L('Swirl & Spot Sign', 'Swirl & spot sign', 'Swirl و Spot Sign'),
        text: L('Swirl Sign (CT nativ): hypodense Areale im Hämatom = aktive Blutung → Expansion. Spot Sign (CTA): KM-Extravasation = noch stärkerer Prädiktor.', 'Swirl sign (NCCT): hypodense areas in haematoma = active bleeding → expansion. Spot sign (CTA): CM extravasation = even stronger predictor.', 'Swirl Sign (CT بدون کنتراست): مناطق هیپودنس = خونریزی فعال → گسترش. Spot Sign (CTA): خروج ماده حاجب = پیش‌بینی‌کننده قوی‌تر.')
      },
      {
        title: L('MRT-Wendepunkt früh subakut', 'MRI turning point – early subacute', 'نقطه عطف MRI — زیرحاد اولیه'),
        text: L('T1-Hyperintensität durch intrazelluläres Met-Hb = sicherstes Zeichen für Blutung > 3 Tage. Tritt zuerst an der Peripherie auf.', 'T1 hyperintensity from intracellular metHb = most reliable sign of haemorrhage >3 days. First appears at the periphery.', 'هایپرانتنسیتی T1 از Met-Hb داخل سلولی = مطمئن‌ترین علامت برای خونریزی > ۳ روز. ابتدا در محیط ظاهر می‌شود.')
      },
      {
        title: L('Bright–Bright = Falle', '"Bright-bright" = pitfall', 'Bright-Bright = دام'),
        text: L('Spät subakut: T1 und T2 beide hell → imitiert Melanommetastasen oder Fettläsionen. SWI zeigt Hämosiderin-Randsaum → entscheidende Differenzierung.', 'Late subacute: T1 and T2 both bright → mimics melanoma metastases or fatty lesions. SWI shows haemosiderin rim → the key differentiating feature.', 'زیرحاد دیررس: T1 و T2 هر دو روشن → متاستاز ملانوم یا ضایعات چربی را تقلید می‌کند. SWI حلقه هموسیدرین → تفکیک کلیدی.')
      },
      {
        title: L('SWI für Mikroblutungen', 'SWI for microbleeds', 'SWI برای میکروبلیدها'),
        text: L('Nur SWI (nicht CT) zeigt alte Mikroblutungen. Multiple lobäre Mikroblutungen → CAA. Tiefe Mikroblutungen (Basalganglien, Pons) → hypertensive Mikroangiopathie.', 'Only SWI (not CT) detects old microbleeds. Multiple lobar microbleeds → CAA. Deep microbleeds (basal ganglia, pons) → hypertensive microangiopathy.', 'فقط SWI (نه CT) میکروبلیدهای قدیمی را تشخیص می‌دهد. چندین میکروبلید لوبار → CAA. میکروبلیدهای عمقی (گانگلیون قاعده‌ای، پونز) → میکروآنژیوپاتی فشار خون.')
      },
    ],
  },
}

// ── LEARNING CASES (in der Lernseite) ─────────────────────────────────────────

export const ICB_LEARNING_CASES = [
  {
    id: 'icb-cerebellum-akut',
    // CT axial: hyperdens Kleinhirnblutung rechts – aus dem Lehrmaterial
    images: ['/icb/case-ct-cerebellum-akut.png', '/icb/case-ct-cerebellum-gross.png'],
    url: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
    label: L('CT · axial · nativ · akute Kleinhirnblutung', 'CT · axial · NCCT · acute cerebellar haemorrhage', 'CT · اکسیال · بدون کنتراست · خونریزی مخچه حاد'),
    title: L(
      'Hypertensive ICB · Kleinhirn · CT nativ',
      'Hypertensive ICB · Cerebellum · NCCT',
      'ICB هیپرتانسیو · مخچه · CT بدون کنتراست'
    ),
    text: L(
      '72-jährige Patientin mit arterieller Hypertonie, akutem Schwindel und Ataxie. Bild links (akut): Hyperdens imponierende Kleinhirnblutung rechts, ~1 cm, kein perifokales Ödem. Bild rechts (Folge-CT): Zunahme auf ~3 cm mit deutlichem Ödemsaum und beginnender Kompression des 4. Ventrikels – typische Expansion einer hypertensiven ICB.',
      'A 72-year-old woman with hypertension, acute dizziness and ataxia. Left image (acute): hyperattenuating right cerebellar haemorrhage, ~1 cm, no perilesional oedema. Right image (follow-up CT): expansion to ~3 cm with oedema rim and early compression of the 4th ventricle — typical progression of hypertensive ICB.',
      'خانم ۷۲ ساله با فشار خون بالا، سرگیجه حاد و آتاکسی. تصویر چپ (حاد): خونریزی هایپردنس مخچه راست، ~۱ سانتی‌متر. تصویر راست (CT پیگیری): گسترش به ~۳ سانتی‌متر با حلقه ادم و فشار روی بطن چهارم — پیشرفت تیپیک ICB هیپرتانسیو.'
    ),
    alt: L('CT axial akute Kleinhirnblutung hyperdens', 'CT axial acute cerebellar haemorrhage hyperattenuating', 'CT اکسیال خونریزی حاد مخچه هایپردنس'),
  },
  {
    id: 'icb-t1-subakut',
    // T1 MRT subakut: hell (Wendepunkt früh subakut)
    images: ['/icb/case-t1-subakut-bright.jpg', '/icb/case-swi-blooming.jpg'],
    url: 'https://radiopaedia.org/articles/mri-signal-characteristics-of-intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
    label: L('MRT · T1 · früh subakut → SWI · chronisch', 'MRI · T1 · early subacute → SWI · chronic', 'MRI · T1 · زیرحاد اولیه → SWI · مزمن'),
    title: L(
      'MRT-Signalwandel der ICB · T1 hell & SWI-Blooming',
      'MRI signal evolution · T1 bright & SWI blooming',
      'تغییر سیگنال MRI · T1 روشن و SWI Blooming'
    ),
    text: L(
      'Bild links (T1 nativ, früh subakut > 3 Tage): Hyperintense Kleinhirnläsion – das Met-Hb ist intrazellulär, Wasser erreicht Fe³⁺, T1 wird hell. Dies ist der wichtigste Wendepunkt im MRT. Bild rechts (SWI, spät subakut/chronisch): Charakteristischer dunkler „Blooming-Saum" durch Hämosiderin in Makrophagen. Persistiert lebenslang – nur SWI detektiert alte Blutungen.',
      'Left image (T1 without contrast, early subacute >3 days): Hyperintense cerebellar lesion — intracellular metHb allows water to access Fe³⁺, making T1 bright. This is the most important MRI turning point. Right image (SWI, late subacute/chronic): Characteristic dark "blooming rim" from haemosiderin in macrophages. Persists lifelong — only SWI detects old haemorrhage.',
      'تصویر چپ (T1 بدون کنتراست، زیرحاد اولیه > ۳ روز): ضایعه هایپرانتنس مخچه — Met-Hb داخل سلولی به آب اجازه دسترسی به Fe³⁺ می‌دهد، T1 روشن می‌شود. مهم‌ترین نقطه عطف MRI. تصویر راست (SWI، زیرحاد دیررس/مزمن): حلقه تاریک Blooming از هموسیدرین در ماکروفاژها. تمام عمر باقی می‌ماند.'
    ),
    alt: L('MRT T1 hell subakut ICB und SWI Blooming', 'MRI T1 bright subacute ICB and SWI blooming', 'MRI T1 روشن زیرحاد ICB و SWI Blooming'),
  },
  {
    id: 'icb-mrt-flowchart',
    // MRT-Signalflussdiagramm aus dem Lehrdokument
    image: '/icb/mrt-flowchart.png',
    url: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
    label: L('MRT · Signalverlauf · Übersichtsdiagramm', 'MRI · signal evolution · overview chart', 'MRI · سیر سیگنال · نمودار کامل'),
    title: L(
      'MR-Signalverhalten intrazerebraler Blutungen · 1,5 T',
      'MRI signal behaviour of intracerebral haemorrhage · 1.5 T',
      'رفتار سیگنال MRI در خونریزی داخل مغزی · ۱.۵ تسلا'
    ),
    text: L(
      'Übersichtsflussdiagramm: Das Staging der ICB erfolgt durch Bestimmung des Hämoglobinabbauprodukts und der Erythrozytenintegrität. Hyperakut: Oxy-Hb, iso/hypo T1. Akut: Deoxy-Hb, T2 hypo, SWI Blooming. Früh subakut: intraz. Met-Hb → T1 HELL (Wendepunkt). Spät subakut: extraz. Met-Hb → T1+T2 HELL. Chronisch: Hämosiderin → SWI Blooming-Saum persistiert.',
      'Overview flowchart: ICB staging is based on the haemoglobin degradation product and erythrocyte integrity. Hyperacute: oxyHb, iso/hypo T1. Acute: deoxyHb, T2 hypo, SWI blooming. Early subacute: intracellular metHb → T1 BRIGHT (turning point). Late subacute: extracellular metHb → T1+T2 BRIGHT. Chronic: haemosiderin → SWI blooming rim persists.',
      'نمودار کلی: مرحله‌بندی ICB بر اساس محصول تجزیه هموگلوبین و یکپارچگی اریتروسیت است. فوق‌حاد: Oxy-Hb. حاد: Deoxy-Hb، T2 هیپو، Blooming. زیرحاد اولیه: Met-Hb داخل سلولی → T1 روشن (نقطه عطف). زیرحاد دیررس: Met-Hb خارج سلولی → T1+T2 روشن. مزمن: هموسیدرین → حلقه SWI پایدار.'
    ),
    alt: L('MRT Signalflussdiagramm ICB alle Stadien', 'MRI signal flowchart ICB all stages', 'نمودار جریان سیگنال MRI ICB تمام مراحل'),
  },
]

// ── MCQ QUESTIONS (15) ────────────────────────────────────────────────────────

const ICB_QUESTION_SEEDS = [
  {
    id: 'icb-q01',
    question: L('Was unterscheidet eine Makroblutung von einer Mikroblutung?', 'What distinguishes a macrobleed from a microbleed?', 'تفاوت ماکروبلید و میکروبلید چیست؟'),
    options: [
      L('Makroblutung > 10 mm, klinisch relevant; Mikroblutung < 10 mm, oft nur auf SWI sichtbar', 'Macrobleed > 10 mm, clinically significant; microbleed < 10 mm, often visible only on SWI', 'ماکروبلید > ۱۰ میلی‌متر، بالینی مهم؛ میکروبلید < ۱۰ میلی‌متر، اغلب فقط روی SWI'),
      L('Mikroblutung tritt immer lobär auf, Makroblutung immer tief', 'Microbleed always occurs lobarly, macrobleed always deep', 'میکروبلید همیشه لوبار، ماکروبلید همیشه عمقی'),
      L('Makroblutung = venös, Mikroblutung = arteriell', 'Macrobleed = venous, microbleed = arterial', 'ماکروبلید = وریدی، میکروبلید = شریانی'),
      L('Kein klinisch relevanter Unterschied', 'No clinically relevant difference', 'تفاوت بالینی مرتبطی وجود ندارد'),
    ],
    correct: 'A',
    explanation: L(
      'Per Definition sind Makroblutungen > 10 mm und klinisch symptomatisch. Mikroblutungen (< 10 mm) sind häufig asymptomatisch und nur auf suszeptibilitätsgewichteten Sequenzen (SWI/T2*) sichtbar. Sie sind Marker für Mikroangiopathie oder CAA.',
      'By definition macrobleeds are >10 mm and clinically symptomatic. Microbleeds (<10 mm) are often asymptomatic and visible only on susceptibility-weighted sequences (SWI/T2*). They are markers of microangiopathy or CAA.',
      'ماکروبلیدها > ۱۰ میلی‌متر و بالینی علامت‌دار هستند. میکروبلیدها (< ۱۰ میلی‌متر) اغلب بدون علامت بوده و فقط روی SWI/T2* قابل رؤیت‌اند.'
    ),
  },
  {
    id: 'icb-q02',
    question: L('Was ist die häufigste Ursache einer primären ICB?', 'What is the most common cause of primary ICB?', 'شایع‌ترین علت ICB اولیه چیست؟'),
    options: [
      L('Arterieller Hypertonus (Putamen, Thalamus, Pons, Kleinhirn)', 'Arterial hypertension (putamen, thalamus, pons, cerebellum)', 'فشار خون شریانی (پوتامن، تالاموس، پونز، مخچه)'),
      L('Zerebrale Amyloidangiopathie (lobär)', 'Cerebral amyloid angiopathy (lobar)', 'آنژیوپاتی آمیلوئید مغزی (لوبار)'),
      L('Orale Antikoagulanzien', 'Oral anticoagulants', 'ضدانعقادهای خوراکی'),
      L('AVM und Kavernome', 'AVM and cavernomas', 'AVM و کاورنوم'),
    ],
    correct: 'A',
    explanation: L(
      'Arterieller Hypertonus ist mit 50–70 % die häufigste Ursache der primären ICB. Er führt zu Lipohyalinose kleiner penetrierender Arterien, bevorzugt im Putamen, Thalamus, Pons und Kleinhirn.',
      'Arterial hypertension is the most common cause of primary ICB (50–70 %). It causes lipohyalinosis of small penetrating arteries, predominantly in the putamen, thalamus, pons and cerebellum.',
      'فشار خون شریانی با ۵۰-۷۰٪ شایع‌ترین علت ICB اولیه است که باعث لیپوهیالینوز شریان‌های نفوذی کوچک در پوتامن، تالاموس، پونز و مخچه می‌شود.'
    ),
  },
  {
    id: 'icb-q03',
    question: L('Welche HU-Dichte hat eine frische ICB in der nativen CCT?', 'What HU attenuation does a fresh ICB show on NCCT?', 'دانسیته HU ICB تازه در CT بدون کنتراست چقدر است؟'),
    options: [
      L('0–10 HU (hypodens wie Wasser)', '0–10 HU (hypoattenuating like water)', '۰-۱۰ HU (هیپودنس مثل آب)'),
      L('20–35 HU (isodens wie Hirngewebe)', '20–35 HU (isoattenuating to brain)', '۲۰-۳۵ HU (ایزودنس مثل بافت مغز)'),
      L('50–80 HU (hyperdens)', '50–80 HU (hyperattenuating)', '۵۰-۸۰ HU (هایپردنس)'),
      L('> 120 HU (stark hyperdens wie Kalk)', '>120 HU (markedly hyperattenuating like calcification)', '> ۱۲۰ HU (مثل کلسیفیکاسیون)'),
    ],
    correct: 'C',
    explanation: L(
      'Frisches Blut ist in der nativen CCT hyperdens mit 50–80 HU. Die erhöhte Dichte ist auf den Proteingehalt des Hämoglobins (Globin) zurückzuführen. Die Dichte nimmt mit ~1,5–2 HU/Tag durch Hämolyse und Resorption ab.',
      'Fresh blood on NCCT is hyperattenuating at 50–80 HU. The high attenuation is caused by the protein content (globin) of haemoglobin. Attenuation falls by ~1.5–2 HU/day due to haemolysis and resorption.',
      'خون تازه در CT بدون کنتراست ۵۰-۸۰ HU هایپردنس است. دانسیته بالا به دلیل محتوای پروتئینی هموگلوبین (گلوبین) است. دانسیته ~۱.۵-۲ HU/روز کاهش می‌یابد.'
    ),
  },
  {
    id: 'icb-q04',
    question: L('Was bedeutet das Swirl Sign im CT?', 'What does the Swirl Sign indicate on CT?', 'Swirl Sign در CT به چه معناست؟'),
    options: [
      L('Ringförmige KM-Aufnahme als Zeichen einer Resorptionsphase', 'Ring enhancement indicating the resorption phase', 'حلقوی نشانگر فاز جذب'),
      L('Hypodense Areale innerhalb des hyperdensen Hämatoms als Zeichen einer aktiven Blutung', 'Hypodense areas within the hyperattenuating haematoma indicating active bleeding', 'مناطق هیپودنس درون هماتوم هایپردنس نشانگر خونریزی فعال'),
      L('Hyperdens imponiierendes Blut im Subarachnoidalraum', 'Hyperattenuating blood in the subarachnoid space', 'خون هایپردنس در فضای ساب‌آراکنوئید'),
      L('Diffuse Hypodensität des Hirnparenchyms als Zeichen eines Ödems', 'Diffuse parenchymal hypodensity indicating oedema', 'هیپودنسیتی منتشر پارانشیم نشانگر ادم'),
    ],
    correct: 'B',
    explanation: L(
      'Das Swirl Sign beschreibt hypodense (unkoagulierte) Areale innerhalb eines hyperdensen Hämatoms. Es zeigt aktive, noch ungeronnene Blutung an und ist ein unabhängiger Prädiktor für Hämatomexpansion und erhöhte Mortalität.',
      'The Swirl Sign describes hypodense (unclotted) areas within a hyperattenuating haematoma. It indicates active, still-liquid bleeding and is an independent predictor of haematoma expansion and increased mortality.',
      'Swirl Sign مناطق هیپودنس (لخته نشده) درون هماتوم هایپردنس را توصیف می‌کند. نشانگر خونریزی فعال و هنوز منعقد نشده است و پیش‌بینی‌کننده مستقل گسترش هماتوم و افزایش مرگ‌ومیر است.'
    ),
  },
  {
    id: 'icb-q05',
    question: L('Was ist das Spot Sign und welche Sequenz zeigt es?', 'What is the Spot Sign and which sequence shows it?', 'Spot Sign چیست و در کدام سکانس دیده می‌شود؟'),
    options: [
      L('Punktförmige Verkalkung im Hämatom · sichtbar in der nativen CCT', 'Punctate calcification in the haematoma · visible on NCCT', 'کلسیفیکاسیون نقطه‌ای در هماتوم · در CT بدون کنتراست'),
      L('Aktive KM-Extravasation im Hämatom · sichtbar in der CTA', 'Active CM extravasation in the haematoma · visible on CTA', 'خروج فعال ماده حاجب در هماتوم · در CTA'),
      L('Hämosiderin-Depot · sichtbar auf SWI', 'Haemosiderin deposit · visible on SWI', 'رسوب هموسیدرین · در SWI'),
      L('Ringenhancement im KM-CT · Zeichen der Resorption', 'Ring enhancement on contrast CT · sign of resorption', 'حلقوی در CT با کنتراست · نشانه جذب'),
    ],
    correct: 'B',
    explanation: L(
      'Das Spot Sign ist eine aktive Kontrastmittelextravasation innerhalb des Hämatoms, die in der CTA sichtbar ist. Es ist ein stärkerer Prädiktor für Hämatomexpansion als das Swirl Sign und korreliert mit erhöhter Mortalität.',
      'The Spot Sign is active contrast-medium extravasation within the haematoma, visible on CTA. It is a stronger predictor of haematoma expansion than the Swirl Sign and correlates with increased mortality.',
      'Spot Sign خروج فعال ماده حاجب درون هماتوم است که در CTA قابل رؤیت است. پیش‌بینی‌کننده قوی‌تری نسبت به Swirl Sign برای گسترش هماتوم است.'
    ),
  },
  {
    id: 'icb-q06',
    question: L('Mit welcher Rate nimmt die CT-Dichte einer ICB im subakuten Stadium ab?', 'At what rate does CT attenuation of an ICB decrease in the subacute stage?', 'دانسیته CT یک ICB در مرحله زیرحاد با چه سرعتی کاهش می‌یابد؟'),
    options: [
      L('~0,1–0,5 HU/Tag', '~0.1–0.5 HU/day', '~۰.۱-۰.۵ HU/روز'),
      L('~1,5–2 HU/Tag', '~1.5–2 HU/day', '~۱.۵-۲ HU/روز'),
      L('~5–10 HU/Tag', '~5–10 HU/day', '~۵-۱۰ HU/روز'),
      L('~15 HU/Tag', '~15 HU/day', '~۱۵ HU/روز'),
    ],
    correct: 'B',
    explanation: L(
      'Die CT-Dichte einer ICB nimmt durch Hämolyse und Resorption mit etwa 1,5–2 HU/Tag ab. Nach 3–6 Wochen erreicht das Hämatom isodens das Niveau des umgebenden Hirngewebes (Isodens-Phase = diagnostische Falle).',
      'CT attenuation of an ICB falls by approximately 1.5–2 HU/day due to haemolysis and resorption. After 3–6 weeks the haematoma becomes isoattenuating to the surrounding brain (isoattenuating phase = diagnostic pitfall).',
      'دانسیته CT یک ICB به دلیل همولیز و جذب ~۱.۵-۲ HU/روز کاهش می‌یابد. پس از ۳-۶ هفته هماتوم به دانسیته مغز اطراف می‌رسد (فاز ایزودنس = دام تشخیصی).'
    ),
  },
  {
    id: 'icb-q07',
    question: L('Warum erscheint eine hyperakute ICB (Oxy-Hb) auf T2 hyperintens?', 'Why does a hyperacute ICB (OxyHb) appear hyperintense on T2?', 'چرا ICB فوق‌حاد (Oxy-Hb) در T2 هایپرانتنس دیده می‌شود؟'),
    options: [
      L('Wegen des hohen Eisengehalts von Oxy-Hb', 'Because of the high iron content of oxyHb', 'به دلیل محتوای بالای آهن در Oxy-Hb'),
      L('Weil Oxy-Hb diamagnetisch ist und keinen Suszeptibilitätseffekt erzeugt – T2 bleibt wie Wasser hell', 'Because oxyHb is diamagnetic and produces no susceptibility effect — T2 remains bright like water', 'چون Oxy-Hb دیاماگنتیک است و اثر سوسپتیبیلیتی ندارد — T2 مثل آب روشن می‌ماند'),
      L('Wegen diffusiver Konversion zu Met-Hb', 'Due to diffuse conversion to metHb', 'به دلیل تبدیل منتشر به Met-Hb'),
      L('Wegen vasogenem Ödem um die Blutung', 'Due to vasogenic oedema around the bleed', 'به دلیل ادم واسوژنیک اطراف خونریزی'),
    ],
    correct: 'B',
    explanation: L(
      'Oxy-Hb ist diamagnetisch und erzeugt keinen Suszeptibilitätseffekt. Daher zeigt T2 ein hohes Signal – ähnlich wie Wasser. Im Gegensatz zu Deoxy-Hb (paramagnetisch) fehlt das Blooming auf T2*. Dies macht die hyperakute Phase im MRT schwer diagnostizierbar.',
      'OxyHb is diamagnetic and produces no susceptibility effect, so T2 remains bright — similar to water. Unlike deoxyHb (paramagnetic), there is no blooming on T2*. This makes the hyperacute stage difficult to diagnose on MRI.',
      'Oxy-Hb دیاماگنتیک است و اثر سوسپتیبیلیتی ندارد، پس T2 روشن می‌ماند — مثل آب. برخلاف Deoxy-Hb (پاراماگنتیک)، Blooming در T2* ندارد.'
    ),
  },
  {
    id: 'icb-q08',
    question: L('Warum zeigt akutes Deoxy-Hb kein T1-Signal trotz Paramagnetismus?', 'Why does acute deoxyHb show no T1 signal despite its paramagnetism?', 'چرا Deoxy-Hb حاد با وجود پاراماگنتیسم، سیگنال T1 ندارد؟'),
    options: [
      L('Weil Deoxy-Hb extrazellulär vorliegt', 'Because deoxyHb is extracellular', 'چون Deoxy-Hb خارج سلولی است'),
      L('Weil Deoxy-Hb intrazellulär kompartimentiert ist und Wasser das Fe²⁺ nicht erreichen kann', 'Because deoxyHb is intracellularly compartmentalised and water cannot access the Fe²⁺', 'چون Deoxy-Hb داخل سلول محدود است و آب نمی‌تواند به Fe²⁺ دسترسی داشته باشد'),
      L('Weil die Erythrozyten bei akuter ICB bereits lysiert sind', 'Because erythrocytes have already lysed in acute ICB', 'چون اریتروسیت‌ها در ICB حاد از قبل لیز شده‌اند'),
      L('Weil T1-KM das Signal überlagert', 'Because T1 contrast overwhelms the signal', 'چون کنتراست T1 سیگنال را پوشش می‌دهد'),
    ],
    correct: 'B',
    explanation: L(
      'Für eine T1-Verkürzung ist eine direkte Dipol-Dipol-Wechselwirkung zwischen Wasser und Fe²⁺ nötig. Im akuten Stadium liegt Deoxy-Hb jedoch noch innerhalb intakter Erythrozyten (intrazellulär), sodass Wasser keinen Zugang zum Eisen hat. Deshalb fehlt das T1-Signal trotz Paramagnetismus.',
      'T1 shortening requires direct dipole-dipole interaction between water and Fe²⁺. In the acute stage, deoxyHb is still within intact erythrocytes (intracellular), so water cannot access the iron. Hence there is no T1 signal despite paramagnetism.',
      'کوتاه‌شدن T1 نیازمند برهم‌کنش مستقیم دوقطبی-دوقطبی بین آب و Fe²⁺ است. در مرحله حاد، Deoxy-Hb هنوز درون اریتروسیت‌های سالم (داخل سلول) است، پس آب به آهن دسترسی ندارد.'
    ),
  },
  {
    id: 'icb-q09',
    question: L('Was ist das diagnostisch wichtigste MRT-Zeichen für eine Blutung > 3 Tage?', 'What is the most important MRI sign of haemorrhage >3 days?', 'مهم‌ترین علامت MRI برای خونریزی > ۳ روز چیست؟'),
    options: [
      L('T2-Hypointensität auf der DWI-Sequenz', 'T2 hypointensity on DWI', 'هیپوانتنسیتی T2 در سکانس DWI'),
      L('T1-Hyperintensität durch intrazelluläres Met-Hb (früh subakut)', 'T1 hyperintensity from intracellular metHb (early subacute)', 'هایپرانتنسیتی T1 از Met-Hb داخل سلولی (زیرحاد اولیه)'),
      L('Ringenhancement in der T1-KM-Sequenz', 'Ring enhancement on T1 post-contrast', 'حلقوی در T1 پس از کنتراست'),
      L('Blooming auf SWI/T2*', 'Blooming on SWI/T2*', 'Blooming در SWI/T2*'),
    ],
    correct: 'B',
    explanation: L(
      'Die T1-Hyperintensität durch intrazelluläres Met-Hb (früh subakutes Stadium) ist das älteste und verlässlichste MRT-Zeichen für eine Blutung > 3 Tage. Sie tritt zuerst an der Peripherie des Hämatoms auf (peripher nach zentral). Blooming auf SWI kann zwar früher auftreten, ist aber weniger blutungsspezifisch.',
      'T1 hyperintensity from intracellular metHb (early subacute) is the oldest and most reliable MRI sign of haemorrhage >3 days. It appears first at the periphery of the haematoma (periphery before centre). Blooming on SWI may appear earlier but is less specific for haemorrhage.',
      'هایپرانتنسیتی T1 از Met-Hb داخل سلولی (زیرحاد اولیه) قدیمی‌ترین و قابل اعتمادترین علامت MRI برای خونریزی > ۳ روز است. ابتدا در محیط هماتوم ظاهر می‌شود.'
    ),
  },
  {
    id: 'icb-q10',
    question: L('Was ist das „Bright–Bright"-Muster auf MRT und welche Differenzialdiagnose muss bedacht werden?', 'What is the "bright-bright" pattern on MRI and which differential diagnosis must be considered?', 'الگوی "Bright-Bright" در MRI چیست و تشخیص افتراقی آن کدام است؟'),
    options: [
      L('T1 hypo + T2 hypo · DD: Verkalkung', 'T1 hypo + T2 hypo · DD: calcification', 'T1 هیپو + T2 هیپو · DD: کلسیفیکاسیون'),
      L('T1 hell + T2 hell (spät subakut durch extrazelluläres Met-Hb) · DD: Melanommetastase, fettige Läsion', 'T1 bright + T2 bright (late subacute, extracellular metHb) · DD: melanoma metastasis, fatty lesion', 'T1 روشن + T2 روشن (زیرحاد دیررس از Met-Hb خارج سلولی) · DD: متاستاز ملانوم، ضایعه چربی'),
      L('T1 hypo + T2 hell · DD: Abszess', 'T1 hypo + T2 bright · DD: abscess', 'T1 هیپو + T2 روشن · DD: آبسه'),
      L('T1 hell + T2 hypo · DD: Fibrom', 'T1 bright + T2 hypo · DD: fibroma', 'T1 روشن + T2 هیپو · DD: فیبروم'),
    ],
    correct: 'B',
    explanation: L(
      'Im spät subakuten Stadium lysieren die Erythrozyten → Met-Hb liegt extrazellulär vor → kein Kompartimentierungseffekt mehr → T1 UND T2 werden hell (bright–bright). Dieses Muster imitiert Melanommetastasen (durch paramagnetsches Melanin) und fettige Läsionen. SWI mit typischem Hämosiderin-Randsaum ist die entscheidende Differenzierung.',
      'In the late subacute stage erythrocytes lyse → metHb is extracellular → no compartmentalisation effect → T1 AND T2 become bright ("bright-bright"). This mimics melanoma metastases (paramagnetic melanin) and fatty lesions. SWI with a typical haemosiderin rim is the decisive differentiator.',
      'در مرحله زیرحاد دیررس اریتروسیت‌ها لیز می‌شوند → Met-Hb خارج سلولی → بدون اثر محدودیت → T1 و T2 هر دو روشن (bright-bright). این الگو متاستاز ملانوم و ضایعات چربی را تقلید می‌کند. SWI با حلقه هموسیدرین تفکیک کلیدی است.'
    ),
  },
  {
    id: 'icb-q11',
    question: L('Welche Sequenz ist am sensitivsten für den Nachweis alter Mikroblutungen?', 'Which sequence is most sensitive for detecting old microbleeds?', 'کدام سکانس برای تشخیص میکروبلیدهای قدیمی حساس‌ترین است؟'),
    options: [
      L('T1-Wichtung ohne Kontrastmittel', 'T1-weighted without contrast', 'T1 بدون کنتراست'),
      L('FLAIR', 'FLAIR', 'FLAIR'),
      L('SWI (Suszeptibilitätsgewichtete Bildgebung) / T2*', 'SWI (susceptibility-weighted imaging) / T2*', 'SWI (تصویربرداری وزنی سوسپتیبیلیتی) / T2*'),
      L('Diffusionsgewichtete Bildgebung (DWI)', 'Diffusion-weighted imaging (DWI)', 'تصویربرداری وزنی دیفیوژن (DWI)'),
    ],
    correct: 'C',
    explanation: L(
      'Hämosiderin im chronischen Stadium erzeugt einen starken Suszeptibilitätseffekt, der sich als charakteristisches „Blooming" auf SWI/T2* manifestiert. CT ist für chronische Blutungen komplett blind. SWI ist auch die einzige Methode für den zuverlässigen Nachweis von Mikroblutungen (< 10 mm) bei z. B. CAA oder hypertensiver Mikroangiopathie.',
      'In the chronic stage, haemosiderin produces a strong susceptibility effect that manifests as characteristic blooming on SWI/T2*. CT is completely blind to chronic haemorrhage. SWI is also the only method for reliably detecting microbleeds (<10 mm) in e.g. CAA or hypertensive microangiopathy.',
      'هموسیدرین در مرحله مزمن اثر سوسپتیبیلیتی قوی ایجاد می‌کند که به صورت Blooming مشخصه در SWI/T2* ظاهر می‌شود. CT برای خونریزی‌های مزمن کاملاً کور است.'
    ),
  },
  {
    id: 'icb-q12',
    question: L('Welcher Befund sollte bei einer ICB an eine sekundäre Ursache (z. B. Tumor) denken lassen?', 'Which finding should raise suspicion of a secondary cause (e.g. tumour) in ICB?', 'کدام یافته در ICB باید به علت ثانویه (مثلاً تومور) فکر کرد؟'),
    options: [
      L('Hämatom in den Basalganglien bei bekanntem Hypertonus', 'Haematoma in the basal ganglia with known hypertension', 'هماتوم در گانگلیون‌های قاعده‌ای با فشار خون شناخته‌شده'),
      L('Perifokales Ödem unverhältnismäßig groß im Vergleich zur Blutungsgröße', 'Perilesional oedema disproportionately large relative to haematoma size', 'ادم اطراف ضایعه نسبت به اندازه هماتوم بیش از حد بزرگ'),
      L('Hämatom kleiner als 5 ml bei älterem Patienten', 'Haematoma smaller than 5 ml in an elderly patient', 'هماتوم کوچک‌تر از ۵ میلی‌لیتر در بیمار مسن'),
      L('Swirl Sign im CT', 'Swirl Sign on CT', 'Swirl Sign در CT'),
    ],
    correct: 'B',
    explanation: L(
      'Bei einer primären ICB ist das perifokale Ödem meist proportional zur Blutungsgröße. Ein unverhältnismäßig großes Ödem (viel größer als das Hämatom) ist ein Warnsignal für eine sekundäre ICB durch Tumor oder hämorrhagischen Infarkt. Auch atypische Lokalisation oder junges Alter ohne vaskuläre Risikofaktoren sollten an AVM/Kavernom denken lassen → CTA.',
      'In primary ICB, perilesional oedema is usually proportional to haematoma size. Disproportionately large oedema (much larger than the haematoma) is a warning sign for secondary ICB from tumour or haemorrhagic infarct. Atypical location or young age without vascular risk factors should raise suspicion of AVM/cavernoma → CTA.',
      'در ICB اولیه ادم اطراف معمولاً متناسب با اندازه هماتوم است. ادم بیش از حد بزرگ هشدار ICB ثانویه از تومور یا انفارکت هموراژیک است.'
    ),
  },
  {
    id: 'icb-q13',
    question: L('Was ist die typische Lokalisation einer CAA-bedingten ICB?', 'What is the typical location of CAA-related ICB?', 'محل تیپیک ICB ناشی از CAA کجاست؟'),
    options: [
      L('Tief gelegen: Putamen, Thalamus, Pons', 'Deep: putamen, thalamus, pons', 'عمقی: پوتامن، تالاموس، پونز'),
      L('Lobär (kortexnah), oft multipel, häufig okzipital und parietal', 'Lobar (cortical), often multiple, frequently occipital and parietal', 'لوبار (نزدیک کورتکس)، اغلب چندگانه، غالباً اکسیپیتال و پاریتال'),
      L('Ausschließlich periventrikulär', 'Exclusively periventricular', 'فقط پری‌ونتریکولار'),
      L('Immer im Kleinhirn', 'Always in the cerebellum', 'همیشه در مخچه'),
    ],
    correct: 'B',
    explanation: L(
      'Die zerebrale Amyloidangiopathie (CAA) führt zu Amyloidablagerungen in kleinen kortikalen und leptomeningealen Gefäßen. Typisch sind lobäre ICBs (kortexnah), die häufig multipel auftreten und eine Prädilektion für den Okzipital- und Parietallappen zeigen. Multiple lobäre Mikroblutungen auf SWI stärken den Verdacht auf CAA. Im Gegensatz dazu: Hypertensive ICBs sind tief (Putamen, Thalamus).',
      'Cerebral amyloid angiopathy causes amyloid deposits in small cortical and leptomeningeal vessels. Typical are lobar ICBs (cortical), often multiple with a predilection for the occipital and parietal lobes. Multiple lobar microbleeds on SWI support CAA. In contrast, hypertensive ICBs are deep (putamen, thalamus).',
      'CAA باعث رسوب آمیلوئید در عروق کوچک کورتیکال و لپتومنینژال می‌شود. تیپیک ICBهای لوبار (نزدیک کورتکس) که اغلب چندگانه هستند با تمایل به لوب اکسیپیتال و پاریتال. میکروبلیدهای لوبار متعدد در SWI از CAA حمایت می‌کند.'
    ),
  },
  {
    id: 'icb-q14',
    question: L('Bis zu wie vielen Monaten nach einer ICB kann ein Ringenhancement im CT nachweisbar sein?', 'For how many months after ICB can ring enhancement persist on CT?', 'تا چند ماه پس از ICB می‌توان حلقوی را در CT تشخیص داد؟'),
    options: [
      L('Bis zu 2 Wochen', 'Up to 2 weeks', 'تا ۲ هفته'),
      L('Bis zu 6 Wochen', 'Up to 6 weeks', 'تا ۶ هفته'),
      L('Bis zu 6 Monaten', 'Up to 6 months', 'تا ۶ ماه'),
      L('Dauerhaft persistierend', 'Persisting indefinitely', 'به‌طور دائمی باقی می‌ماند'),
    ],
    correct: 'C',
    explanation: L(
      'Ein Ringenhancement nach ICB ist durch die Blut-Hirn-Schrankenstörung am Rand der Resorptionszone bedingt. Es kann bis zu 6 Monate nach dem Blutungsereignis nachweisbar sein. Dieser Befund kann leicht mit einem Abszess oder einer Metastase verwechselt werden (Differenzialdiagnose!) und erfordert klinische Korrelation und ggf. MRT mit DWI.',
      'Ring enhancement after ICB results from blood-brain barrier disruption at the periphery of the resorption zone. It can persist for up to 6 months after the haemorrhagic event. This finding may easily be confused with an abscess or metastasis (differential diagnosis!) and requires clinical correlation and DWI on MRI.',
      'حلقوی پس از ICB ناشی از اختلال سد خونی-مغزی در لبه ناحیه جذب است. تا ۶ ماه پس از رویداد خونریزی قابل تشخیص است و ممکن است با آبسه یا متاستاز اشتباه گرفته شود.'
    ),
  },
  {
    id: 'icb-q15',
    question: L('Ein junger Patient ohne Hypertonus hat eine lobäre ICB. Was sollte als nächstes veranlasst werden?', 'A young patient without hypertension has a lobar ICB. What should be the next step?', 'یک بیمار جوان بدون فشار خون بالا ICB لوبار دارد. قدم بعدی چیست؟'),
    options: [
      L('Keine weitere Abklärung nötig – lobäre ICB immer benigne', 'No further workup needed – lobar ICB is always benign', 'نیازی به بررسی بیشتر نیست — ICB لوبار همیشه خوش‌خیم است'),
      L('CTA zum Ausschluss einer vaskulären Malformation (AVM, Kavernom)', 'CTA to exclude vascular malformation (AVM, cavernoma)', 'CTA برای رد مالفورماسیون عروقی (AVM، کاورنوم)'),
      L('Sofortige Antikoagulation', 'Immediate anticoagulation', 'ضدانعقاد فوری'),
      L('PET-CT zum Tumorausschluss', 'PET-CT for tumour exclusion', 'PET-CT برای رد تومور'),
    ],
    correct: 'B',
    explanation: L(
      'Bei einem jungen Patienten ohne klassische Risikofaktoren (arterieller Hypertonus) und ohne Antikoagulanzieneinnahme ist eine vaskuläre Malformation (AVM, Kavernom, dAVF) eine wichtige Ursache. CTA (und ggf. DSA) zum Ausschluss einer AVM oder eines Aneurysmas ist indiziert. Die MRT (SWI) kann ein Kavernom mit typischem Popcorn-Muster zeigen.',
      'In a young patient without classical risk factors (hypertension) and not on anticoagulants, a vascular malformation (AVM, cavernoma, dAVF) is an important cause. CTA (and possibly DSA) to exclude AVM or aneurysm is indicated. MRI (SWI) may show a cavernoma with a typical popcorn pattern.',
      'در بیمار جوان بدون فاکتورهای خطر کلاسیک، مالفورماسیون عروقی (AVM، کاورنوم) علت مهمی است. CTA (و در صورت لزوم DSA) برای رد AVM یا آنوریسم ضروری است.'
    ),
  },
]

export const ICB_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  ICB_QUESTION_SEEDS.map(item => ({
    id: item.id,
    tags: ['intrazerebrale-blutung', 'gehirn-blutung'],
    fach: 'gehirn',
    question: item.question[lang] || item.question.de,
    options: item.options.map((opt, i) => ({
      id: ['A', 'B', 'C', 'D'][i],
      text: opt[lang] || opt.de,
    })),
    correct: item.correct,
    explanation: item.explanation[lang] || item.explanation.de,
  })),
]))

// ── FLASHCARDS ────────────────────────────────────────────────────────────────

export const ICB_FLASHCARD_TOPIC = {
  id: 'intrazerebrale-blutung',
  area: L('Gehirn', 'Brain', 'مغز'),
  chapter: L('Vaskuläre Erkrankungen', 'Vascular diseases', 'بیماری‌های عروقی'),
  icon: '🩸',
  iconImage: '/fach/gehirn.png',
  color: '#dc2626',
  href: '/flashcards/intrazerebrale-blutung',
  title: L('Intrazerebrale Blutung', 'Intracerebral Haemorrhage', 'خونریزی داخل مغزی'),
  subtitle: L(
    'CT-Stadien · MRT-Signal · Swirl/Spot-Sign · CAA vs. Hypertonus',
    'CT stages · MRI signal · Swirl/Spot Sign · CAA vs hypertension',
    'مراحل CT · سیگنال MRI · Swirl/Spot Sign · CAA در برابر فشار خون'
  ),
}

const ICB_FLASHCARD_SEEDS = [
  {
    front: L('Oxy-Hb (hyperakut) · T1 und T2?', 'OxyHb (hyperacute) · T1 and T2?', 'Oxy-Hb (فوق‌حاد) · T1 و T2؟'),
    back: L('T1: iso / leicht hypo\nT2: hyperintens (wie Wasser)\nT2*/SWI: leicht hypo\n→ diamagnetisch, kein Suszeptibilitätseffekt', 'T1: iso / mildly hypointense\nT2: hyperintense (like water)\nT2*/SWI: mildly hypointense\n→ diamagnetic, no susceptibility effect', 'T1: ایزو / کمی هیپو\nT2: هایپرانتنس (مثل آب)\nT2*/SWI: کمی هیپو\n→ دیاماگنتیک، بدون اثر سوسپتیبیلیتی'),
    tag: 'icb-mrt',
  },
  {
    front: L('Deoxy-Hb (akut) · T1 und T2?', 'DeoxyHb (acute) · T1 and T2?', 'Deoxy-Hb (حاد) · T1 و T2؟'),
    back: L('T1: iso / hypo (kein T1-Signal!)\nT2: stark hypo ↓↓\nT2*/SWI: Blooming ↓↓↓\n→ paramagnetisch, intrazellulär → kein Dipol-Dipol', 'T1: iso / hypointense (no T1 signal!)\nT2: markedly hypointense ↓↓\nT2*/SWI: blooming ↓↓↓\n→ paramagnetic, intracellular → no dipole-dipole', 'T1: ایزو / هیپو (بدون سیگنال T1)\nT2: شدیداً هیپو ↓↓\nT2*/SWI: Blooming ↓↓↓\n→ پاراماگنتیک، داخل سلولی → بدون دیپل-دیپل'),
    tag: 'icb-mrt',
  },
  {
    front: L('Met-Hb intrazellulär (früh subakut) · T1 und T2?', 'MetHb intracellular (early subacute) · T1 and T2?', 'Met-Hb داخل سلولی (زیرحاد اولیه) · T1 و T2؟'),
    back: L('T1: HELL ↑↑ ★ (wichtigster Wendepunkt!)\nT2: hypo (Kompartimentierung noch aktiv)\nT2*: stark hypo\n→ Wasser erreicht Fe³⁺ → Dipol-Dipol → T1↑', 'T1: BRIGHT ↑↑ ★ (most important turning point!)\nT2: hypointense (compartmentalisation still active)\nT2*: markedly hypointense\n→ water reaches Fe³⁺ → dipole-dipole → T1↑', 'T1: روشن ↑↑ ★ (مهم‌ترین نقطه عطف)\nT2: هیپو (محدودیت هنوز فعال)\nT2*: شدیداً هیپو\n→ آب به Fe³⁺ می‌رسد → دیپل-دیپل → T1↑'),
    tag: 'icb-mrt',
  },
  {
    front: L('Met-Hb extrazellulär (spät subakut) · T1 und T2?', 'MetHb extracellular (late subacute) · T1 and T2?', 'Met-Hb خارج سلولی (زیرحاد دیررس) · T1 و T2؟'),
    back: L('T1: HELL ↑↑\nT2: HELL ↑↑ → "bright–bright"!\nT2*/SWI: hypo Randsaum\n→ Erythrozytenlyse → kein Kompartimentierungseffekt\n⚠ imitiert Melanommetastase!', 'T1: BRIGHT ↑↑\nT2: BRIGHT ↑↑ → "bright-bright"!\nT2*/SWI: hypointense rim\n→ erythrocyte lysis → no compartmentalisation effect\n⚠ mimics melanoma metastasis!', 'T1: روشن ↑↑\nT2: روشن ↑↑ → "bright-bright"!\nT2*/SWI: حلقه هیپو\n→ لیز اریتروسیت → بدون اثر محدودیت\n⚠ متاستاز ملانوم را تقلید می‌کند!'),
    tag: 'icb-mrt',
  },
  {
    front: L('Hämosiderin (chronisch) · Welche Sequenz ist entscheidend?', 'Haemosiderin (chronic) · Which sequence is essential?', 'هموسیدرین (مزمن) · کدام سکانس ضروری است؟'),
    back: L('SWI / T2*: Blooming-Saum, persistiert lebenslang\nT1: iso / hypo\nT2: hypo\nCT: BLIND für chronische Blutung!\n→ Nur SWI zeigt alte Mikroblutungen zuverlässig', 'SWI / T2*: blooming rim, persists lifelong\nT1: iso / hypointense\nT2: hypointense\nCT: BLIND to chronic haemorrhage!\n→ Only SWI reliably shows old microbleeds', 'SWI / T2*: حلقه Blooming، تمام عمر باقی\nT1: ایزو / هیپو\nT2: هیپو\nCT: کور برای خونریزی مزمن!\n→ فقط SWI میکروبلیدهای قدیمی را قابل اعتماد نشان می‌دهد'),
    tag: 'icb-mrt',
  },
  {
    front: L('Swirl Sign · Was, Wo, Bedeutung?', 'Swirl Sign · What, where, significance?', 'Swirl Sign · چیست، کجا، اهمیت؟'),
    back: L('Was: Hypodense Areale innerhalb des hyperdensen CT-Hämatoms\nWo: Natives CCT\nBedeutung: Aktive, unkoagulierte Blutung → Risiko der Hämatomexpansion ↑\n→ unabhängiger Prädiktor für schlechte Prognose', 'What: Hypodense areas within the hyperattenuating haematoma\nWhere: NCCT\nSignificance: Active, unclotted bleeding → haematoma expansion risk ↑\n→ independent predictor of poor prognosis', 'چیست: مناطق هیپودنس درون هماتوم هایپردنس\nکجا: CT بدون کنتراست\nاهمیت: خونریزی فعال و لخته نشده → خطر گسترش هماتوم ↑\n→ پیش‌بینی‌کننده مستقل پیش‌آگهی بد'),
    tag: 'icb-ct',
  },
  {
    front: L('Spot Sign · Was, Wo, Bedeutung?', 'Spot Sign · What, where, significance?', 'Spot Sign · چیست، کجا، اهمیت؟'),
    back: L('Was: KM-Extravasation im Hämatom\nWo: CTA (nicht im nativen CT!)\nBedeutung: Aktive Blutung mit hohem Expansionsrisiko\n→ Stärker prädiktiv als Swirl Sign', 'What: CM extravasation in haematoma\nWhere: CTA (not on NCCT!)\nSignificance: Active bleeding with high expansion risk\n→ Stronger predictor than Swirl Sign', 'چیست: خروج ماده حاجب در هماتوم\nکجا: CTA (نه در CT بدون کنتراست)\nاهمیت: خونریزی فعال با خطر بالای گسترش\n→ پیش‌بینی‌کننده قوی‌تر از Swirl Sign'),
    tag: 'icb-ct',
  },
  {
    front: L('CT-Dichte ICB: Akut, Subakut, Chronisch?', 'CT attenuation ICB: acute, subacute, chronic?', 'دانسیته CT ICB: حاد، زیرحاد، مزمن؟'),
    back: L('Akut: 50–80 HU (hyperdens)\nSubakut: ↓ ~1,5–2 HU/Tag → isodens nach 3–6 Wo\nChronisch: hypodens (Resorptionshöhle)\n⚠ Isodens-Phase = Falle bei CT!', 'Acute: 50–80 HU (hyperattenuating)\nSubacute: ↓ ~1.5–2 HU/day → isoattenuating at 3–6 weeks\nChronic: hypoattenuating (resorption cavity)\n⚠ Isoattenuating phase = CT pitfall!', 'حاد: ۵۰-۸۰ HU (هایپردنس)\nزیرحاد: ↓ ~۱.۵-۲ HU/روز → ایزودنس پس از ۳-۶ هفته\nمزمن: هیپودنس (حفره جذب)\n⚠ فاز ایزودنس = دام در CT!'),
    tag: 'icb-ct',
  },
  {
    front: L('CAA vs. Hypertensive ICB · Lokalisation?', 'CAA vs. hypertensive ICB · location?', 'CAA در برابر ICB هیپرتانسیو · محل؟'),
    back: L('Hypertensiv: tief (Putamen, Thalamus, Pons, Kleinhirn)\nCAA: lobär, kortexnah, oft multipel\n  Prädilektion: okzipital + parietal\n  Multiple lobäre Mikroblutungen auf SWI → ✓ CAA', 'Hypertensive: deep (putamen, thalamus, pons, cerebellum)\nCAA: lobar, cortical, often multiple\n  Predilection: occipital + parietal\n  Multiple lobar microbleeds on SWI → ✓ CAA', 'هیپرتانسیو: عمقی (پوتامن، تالاموس، پونز، مخچه)\nCAA: لوبار، نزدیک کورتکس، اغلب چندگانه\n  تمایل: اکسیپیتال + پاریتال\n  میکروبلید لوبار متعدد در SWI → ✓ CAA'),
    tag: 'icb-aetiology',
  },
  {
    front: L('Ringenhancement bei ICB · Wie lange? · DD?', 'Ring enhancement in ICB · How long? · DD?', 'حلقوی در ICB · چقدر؟ · DD؟'),
    back: L('Dauer: bis zu 6 Monate nach Blutung\nUrsache: Blut-Hirn-Schrankenstörung am Resorptionsrand\nDD: Abszess → DWI Restriktion im Zentrum\n    Metastase → Ödem > Läsion\n→ Klinischer Kontext + DWI entscheidend!', 'Duration: up to 6 months after haemorrhage\nCause: BBB disruption at resorption rim\nDD: Abscess → DWI restriction in centre\n    Metastasis → oedema > lesion\n→ Clinical context + DWI are key!', 'مدت: تا ۶ ماه پس از خونریزی\nعلت: اختلال سد خونی-مغزی در لبه جذب\nDD: آبسه → محدودیت DWI در مرکز\n    متاستاز → ادم > ضایعه\n→ بافت بالینی + DWI کلیدی هستند!'),
    tag: 'icb-ct',
  },
  {
    front: L('CAVE: Ödem unverhältnismäßig groß – woran denken?', 'CAUTION: oedema disproportionately large – think of?', 'احتیاط: ادم بیش از حد بزرگ — به چه فکر کنید؟'),
    back: L('→ Sekundäre ICB!\nDD: Tumor mit Einblutung\n    Hämorrhagischer Infarkt\n    Vaskuläre Malformation (junger Patient)\nBei jungen Patienten ohne Hypertonus → CTA!', '→ Secondary ICB!\nDD: tumour with haemorrhage\n    haemorrhagic infarct\n    vascular malformation (young patient)\nIn young patients without hypertension → CTA!', '→ ICB ثانویه!\nDD: تومور با خونریزی\n    انفارکت هموراژیک\n    مالفورماسیون عروقی (بیمار جوان)\nدر بیمار جوان بدون فشار خون → CTA!'),
    tag: 'icb-aetiology',
  },
  {
    front: L('Welche Sequenz für welche ICB-Phase?', 'Which sequence for which ICB phase?', 'کدام سکانس برای کدام مرحله ICB؟'),
    back: L('Hyperakut/akut → SWI/T2* (Blooming!)\nFrüh subakut → T1 (hell!)\nSpät subakut → T1 + T2 + SWI\nChronisch → nur SWI (CT blind!)\nFaustregel: Akut=SWI · Subakut=T1 · Chronisch=SWI', 'Hyperacute/acute → SWI/T2* (blooming!)\nEarly subacute → T1 (bright!)\nLate subacute → T1 + T2 + SWI\nChronic → SWI only (CT blind!)\nRule: Acute=SWI · Subacute=T1 · Chronic=SWI', 'فوق‌حاد/حاد → SWI/T2* (Blooming)\nزیرحاد اولیه → T1 (روشن)\nزیرحاد دیررس → T1 + T2 + SWI\nمزمن → فقط SWI (CT کور است)\nقانون: حاد=SWI · زیرحاد=T1 · مزمن=SWI'),
    tag: 'icb-mrt',
  },
]

export const ICB_FLASHCARDS = ICB_FLASHCARD_SEEDS.map((item, index) => ({
  id: `icb-fc-${String(index + 1).padStart(2, '0')}`,
  topicId: 'intrazerebrale-blutung',
  front: item.front,
  back: item.back,
  tag: item.tag,
}))

// ── FALLPRÜFUNGS-CASES (für Homepage / faelle/pruefung) ─────────────────────

export const ICB_PRUEFUNG_CASES = [
  {
    id: 'icb-pruefung-swirl',
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    topicId: 'intrazerebrale-blutung',
    image: '/icb/case-ct-cerebellum-gross.png',
    modality: 'CT',
    plane: 'CT · axial · nativ',
    title: L('Hyperdenses Hämatom im Kleinhirn mit Ödemsaum', 'Hyperattenuating cerebellar haematoma with oedema rim', 'هماتوم هایپردنس مخچه با حلقه ادم'),
    vignette: L(
      '71-jähriger Patient unter Phenprocoumon-Therapie (INR 3,8). Plötzliche rechtsseitige Hemiparese und Sprachstörung. GCS 12. Was ist die bildgebende Diagnose und was zeigt das beschriebene Zeichen an?',
      'A 71-year-old man on phenprocoumon (INR 3.8) presents with sudden right hemiparesis and dysphasia. GCS 12. What is the imaging diagnosis and what does the described sign indicate?',
      'مرد ۷۱ ساله تحت درمان فنپروکومون (INR ۳.۸). همی‌پارزی راست ناگهانی و اختلال گفتار. GCS ۱۲. تشخیص تصویربرداری و معنی علامت توصیف‌شده چیست؟'
    ),
    question: L(
      'Welche Befundung und Interpretation passen am besten zu diesem CT-Bild?',
      'Which reporting and interpretation best match this CT image?',
      'کدام گزارش و تفسیر با این تصویر CT بهترین تطابق را دارد؟'
    ),
    options: [
      { id: 'A', text: L('ICB mit Swirl Sign · aktive Blutung · hohes Expansionsrisiko', 'ICB with Swirl Sign · active bleeding · high expansion risk', 'ICB با Swirl Sign · خونریزی فعال · خطر بالای گسترش') },
      { id: 'B', text: L('Ischämischer Infarkt mit perifokaler Hypodensität', 'Ischaemic infarct with perilesional hypodensity', 'انفارکت ایسکمیک با هیپودنسیتی اطراف') },
      { id: 'C', text: L('Abszess mit zentraler Nekrose · kein Hinweis auf Blutung', 'Abscess with central necrosis · no sign of haemorrhage', 'آبسه با نکروز مرکزی · بدون نشانه خونریزی') },
      { id: 'D', text: L('Subdurale Blutung über dem Parenchym', 'Subdural haematoma over the parenchyma', 'هماتوم ساب‌دورال روی پارانشیم') },
    ],
    correct: 'A',
    explanation: L(
      'Das hyperdense Hämatom mit eingestreuten hypodensen Arealen ist klassisch für das Swirl Sign. Es zeigt aktive, unkoagulierte Blutung an und gilt als unabhängiger Prädiktor für Hämatomexpansion. Bei OAK-Einnahme (INR 3,8) besteht ein hohes Blutungsrisiko und eine rasche Antagonisierung ist indiziert.',
      'A hyperattenuating haematoma with interspersed hypodense areas is classic for the Swirl Sign. It indicates active, unclotted bleeding and is an independent predictor of haematoma expansion. With anticoagulation (INR 3.8), rapid reversal is indicated.',
      'هماتوم هایپردنس با مناطق هیپودنس پراکنده کلاسیک برای Swirl Sign است. نشانگر خونریزی فعال و پیش‌بینی‌کننده مستقل گسترش هماتوم است. با مصرف ضدانعقاد (INR ۳.۸)، معکوس‌سازی سریع ضروری است.'
    ),
    source: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
  },
  {
    id: 'icb-pruefung-ring',
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    topicId: 'intrazerebrale-blutung',
    image: '/icb/case-t1-subakut-bright.jpg',
    modality: 'MRT',
    plane: 'MRT · T1 · axial · nativ · früh subakut',
    title: L('ICB früh subakut · T1 hyperintens · Wendepunkt', 'ICB early subacute · T1 hyperintense · turning point', 'ICB زیرحاد اولیه · T1 هایپرانتنس · نقطه عطف'),
    vignette: L(
      '58-jährige Patientin, bekannte Hypertonikerin, stationäre Aufnahme nach initialer CCT-Diagnose einer Kleinhirnblutung. Kontroll-MRT am Tag 5: T1-gewichtete Sequenz zeigt eine hyperintense Läsion im rechten Kleinhirn. Welche Interpretation ist korrekt?',
      'A 58-year-old woman with known hypertension, admitted after initial NCCT diagnosis of cerebellar haemorrhage. Follow-up MRI on day 5: T1-weighted sequence shows a hyperintense lesion in the right cerebellum. Which interpretation is correct?',
      'خانم ۵۸ ساله با فشار خون شناخته‌شده، بستری پس از تشخیص اولیه CT از خونریزی مخچه. MRI کنترل در روز ۵: سکانس T1 ضایعه هایپرانتنس در مخچه راست نشان می‌دهد. کدام تفسیر صحیح است؟'
    ),
    question: L(
      'Was ist die Ursache der T1-Hyperintensität in diesem MRT-Bild?',
      'What causes the T1 hyperintensity in this MRI image?',
      'علت هایپرانتنسیتی T1 در این تصویر MRI چیست؟'
    ),
    options: [
      { id: 'A', text: L('Akutes Deoxy-Hb · paramagnetisch · T1 immer hell', 'Acute deoxyHb · paramagnetic · T1 always bright', 'Deoxy-Hb حاد · پاراماگنتیک · T1 همیشه روشن') },
      { id: 'B', text: L('Intrazelluläres Met-Hb (früh subakut > 3 Tage) · Wasser erreicht Fe³⁺ → Dipol-Dipol → T1 hell', 'Intracellular metHb (early subacute >3 days) · water accesses Fe³⁺ → dipole-dipole → T1 bright', 'Met-Hb داخل سلولی (زیرحاد اولیه > ۳ روز) · آب به Fe³⁺ می‌رسد → T1 روشن') },
      { id: 'C', text: L('Hämosiderin in Makrophagen · SWI-Effekt', 'Haemosiderin in macrophages · SWI effect', 'هموسیدرین در ماکروفاژها · اثر SWI') },
      { id: 'D', text: L('Perifokales Ödem · T1 immer hyperintens', 'Perilesional oedema · T1 always hyperintense', 'ادم اطراف · T1 همیشه هایپرانتنس') },
    ],
    correct: 'B',
    explanation: L(
      'Im früh subakuten Stadium (> 3 Tage) liegt Hämoglobin als intrazelluläres Met-Hb (Fe³⁺) vor. Wasser kann nun das Eisen direkt erreichen → Dipol-Dipol-Relaxation → T1-Verkürzung → T1 hell. Dies ist der wichtigste Wendepunkt im MRT der ICB. T2 bleibt noch hypo (Kompartimentierungseffekt). Tritt zuerst peripher auf.',
      'In the early subacute stage (>3 days), haemoglobin is present as intracellular metHb (Fe³⁺). Water can now directly access the iron → dipole-dipole relaxation → T1 shortening → T1 bright. This is the most important turning point in ICB MRI. T2 remains hypointense (compartmentalisation effect). Appears peripherally first.',
      'در مرحله زیرحاد اولیه (> ۳ روز)، هموگلوبین به‌صورت Met-Hb داخل سلولی (Fe³⁺) است. آب می‌تواند مستقیماً به آهن دسترسی یابد → آرامش دیپل-دیپل → کوتاه‌شدن T1 → T1 روشن. این مهم‌ترین نقطه عطف در MRI ICB است.'
    ),
    source: 'https://radiopaedia.org/articles/intracerebral-haemorrhage?lang=us',
    credit: 'Bildmaterial aus dem Lehrmaterial · Radiopaedia CC BY-NC-SA 3.0',
  },
]
