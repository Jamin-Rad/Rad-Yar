export const KM_TOPICS = [
  {
    id: 'km-roentgen-grundlagen',
    slug: 'roentgen-kontrastmittel-grundlagen',
    icon: '☢️',
    color: '#f97316',
    titles: {
      de: 'Grundlagen jodhaltiger Röntgen-/CT-Kontrastmittel',
      en: 'Basics of iodinated X-ray / CT contrast media',
      fa: 'مبانی مواد حاجب یددار در رادیوگرافی و CT',
    },
    shortTitles: {
      de: 'Röntgen-Kontrastmittel Grundlagen',
      en: 'X-ray contrast media basics',
      fa: 'مبانی مواد حاجب رادیوگرافی / CT',
    },
    summary: {
      de: 'Einteilung, Jodkonzentration, Applikation, Ausscheidung, Paravasat und gastrointestinale Kontrastmittel.',
      en: 'Classification, iodine concentration, administration, elimination, extravasation and gastrointestinal contrast media.',
      fa: 'تقسیم‌بندی، غلظت ید، تزریق، دفع، پاراوازات و مواد حاجب گوارشی.',
    },
    stats: [
      { value: '300', label: { de: 'mg Iod/ml Standard', en: 'mg iodine/ml standard', fa: 'mg/ml ید، استاندارد' } },
      { value: '3–5', label: { de: 'ml/s Standardrate', en: 'ml/s standard rate', fa: 'ml/s سرعت معمول' } },
      { value: '90%', label: { de: 'renale Elimination', en: 'renal elimination', fa: 'دفع کلیوی' } },
    ],
    sections: [
      {
        id: 'klassifikation', icon: '🧪', title: { de: 'Einteilung', en: 'Classification', fa: 'تقسیم‌بندی' },
        blocks: [
          { type: 'cards', items: [
            { title: { de: 'Röntgennegative KM', en: 'Radiolucent contrast media', fa: 'مواد حاجب رادیونگاتیو' }, text: { de: 'Geringe oder fehlende Absorption der Röntgenstrahlen. Beispiele: Luft, Gas/CO₂ und Wasser.', en: 'Low or absent absorption of X-rays. Examples include air, gas/CO₂ and water.', fa: 'به دلیل جذب کم یا عدم جذب اشعه X، عبور اشعه را بیشتر می‌کنند؛ مانند هوا، گاز/CO₂ و آب.' } },
            { title: { de: 'Röntgenpositive KM', en: 'Radiopaque contrast media', fa: 'مواد حاجب رادیوپوزیتیو' }, text: { de: 'Vermehrte Absorption durch höhere Ordnungszahl. Wichtig: jodhaltige KM und Bariumsulfat.', en: 'Increased absorption due to a higher atomic number. Key examples are iodinated contrast media and barium sulfate.', fa: 'به علت عدد اتمی بالاتر، اشعه را بیشتر جذب می‌کنند؛ مهم‌ترین نمونه‌ها مواد یددار و باریوم سولفات هستند.' } },
          ]},
          { type: 'table', headers: { de: ['Gruppe', 'Beispiele', 'Anwendung'], en: ['Group', 'Examples', 'Use'], fa: ['گروه', 'مثال‌ها', 'کاربرد'] }, rows: [
            { de: ['Nicht-ionische wasserlösliche KM', 'Imeron®, Ultravist®', 'Standard für die intravasale Anwendung'], en: ['Non-ionic water-soluble CM', 'Imeron®, Ultravist®', 'Standard for intravascular use'], fa: ['مواد یددار غیر یونی محلول در آب', 'Imeron®, Ultravist®', 'استاندارد برای تزریق داخل‌عروقی'] },
            { de: ['Ionische wasserlösliche KM', 'Gastrografin®', 'Enterale Anwendung; nicht mehr intravasal'], en: ['Ionic water-soluble CM', 'Gastrografin®', 'Enteral use; no longer intravascular'], fa: ['مواد یددار یونی محلول در آب', 'Gastrografin®', 'کاربرد گوارشی؛ برای تزریق داخل‌عروقی مناسب نیست'] },
            { de: ['Wasserunlösliche KM', 'Bariumsulfat', 'Enterale Bildgebung'], en: ['Water-insoluble CM', 'Barium sulfate', 'Enteral imaging'], fa: ['نامحلول در آب', 'Bariumsulfat', 'تصویربرداری گوارشی'] },
          ]},
          { type: 'note', variant: 'key', title: { de: 'Merke', en: 'Key point', fa: 'نکته مهم' }, text: { de: 'Alle wasserlöslichen jodhaltigen Kontrastmittel besitzen als gemeinsame Grundstruktur einen Trijodbenzolring. Jod mit der Ordnungszahl 53 ist die eigentliche röntgenkontrastgebende Substanz.', en: 'All water-soluble iodinated contrast media share a triiodobenzene ring. Iodine, with atomic number 53, is the actual X-ray attenuating component.', fa: 'همه مواد حاجب یددار محلول در آب ساختار مشترک حلقه تری‌یدوبنزن دارند. خود ید با عدد اتمی ۵۳ عامل اصلی ایجاد کنتراست در CT است.' } },
        ],
      },
      {
        id: 'applikation', icon: '💉', title: { de: 'Applikation und Ausscheidung', en: 'Administration and elimination', fa: 'تزریق و دفع' },
        blocks: [
          { type: 'table', headers: { de: ['Untersuchung', 'Volumen', 'Injektionsrate'], en: ['Examination', 'Volume', 'Injection rate'], fa: ['بررسی', 'حجم معمول', 'سرعت تزریق'] }, rows: [
            { de: ['LAE-CT', 'ca. 50–70 ml', '5 ml/s'], en: ['CTPA', 'approx. 50–70 ml', '5 ml/s'], fa: ['CT آمبولی ریه', 'حدود ۵۰–۷۰ ml', '۵ ml/s'] },
            { de: ['CTA-Aorta / supraaortal', 'ca. 60–80 ml', '4–5 ml/s'], en: ['CTA aorta / supra-aortic', 'approx. 60–80 ml', '4–5 ml/s'], fa: ['CTA آئورت / عروق سوپرا‌آئورتیک', 'حدود ۶۰–۸۰ ml', '۴–۵ ml/s'] },
            { de: ['Abdomen portalvenös', '80–120 ml', '3–4 ml/s'], en: ['Abdomen portal venous', '80–120 ml', '3–4 ml/s'], fa: ['شکم فاز پورتال', '۸۰–۱۲۰ ml', '۳–۴ ml/s'] },
            { de: ['Biphasisches Abdomen', '100–140 ml', '3–5 ml/s'], en: ['Biphasic abdomen', '100–140 ml', '3–5 ml/s'], fa: ['شکم دو فازی', '۱۰۰–۱۴۰ ml', '۳–۵ ml/s'] },
          ]},
          { type: 'cards', items: [
            { title: { de: '18G grün', en: '18G green cannula', fa: 'کانول سبز 18G' }, text: { de: 'Für 3–5 ml/s geeignet und Standard für CT-Angiographien.', en: 'Suitable for 3–5 ml/s and standard for CT angiography.', fa: 'برای ۳–۵ ml/s مناسب و استاندارد CTA است.' } },
            { title: { de: '20G rosa', en: '20G pink cannula', fa: 'کانول صورتی 20G' }, text: { de: '3–4 ml/s möglich; für portalvenöse Untersuchungen meist ausreichend.', en: '3–4 ml/s possible; usually sufficient for portal venous examinations.', fa: '۳–۴ ml/s ممکن است و برای فاز پورتال معمولاً کافی است.' } },
            { title: { de: '22G blau / ZVK', en: '22G blue / CVC', fa: 'کانول آبی 22G / ZVK' }, text: { de: '2,5 ml/s möglichst vermeiden, da arterielle Abgrenzbarkeit schlechter wird.', en: 'Avoid 2.5 ml/s when possible because arterial delineation is reduced.', fa: 'در صورت امکان از ۲٫۵ ml/s پرهیز شود، چون کیفیت فاز شریانی کاهش می‌یابد.' } },
          ]},
          { type: 'note', variant: 'info', title: { de: 'Ausscheidung', en: 'Elimination', fa: 'دفع' }, text: { de: 'Jodhaltige KM werden zu etwa 90% renal eliminiert. Bei normaler Nierenfunktion sind ungefähr 50% nach 2 Stunden, 75% nach 4 Stunden und nahezu alles nach 24 Stunden ausgeschieden.', en: 'Iodinated contrast media are eliminated about 90% renally. With normal renal function, about 50% is excreted after 2 hours, 75% after 4 hours and nearly all after 24 hours.', fa: 'مواد حاجب یددار حدود ۹۰٪ از راه کلیه دفع می‌شوند؛ در عملکرد طبیعی کلیه، حدود ۵۰٪ پس از ۲ ساعت، ۷۵٪ پس از ۴ ساعت و تقریباً همه تا ۲۴ ساعت دفع می‌شود.' } },
        ],
      },
      {
        id: 'paravasat-gi', icon: '🩹', title: { de: 'Paravasat und gastrointestinale KM', en: 'Extravasation and GI contrast media', fa: 'پاراوازات و مواد حاجب گوارشی' },
        blocks: [
          { type: 'steps', items: {
            de: ['Injektion sofort stoppen, Zugang zunächst belassen und Aspiration versuchen.', 'Kanüle nach Aspiration entfernen, Extremität hochlagern.', 'Kalte Kompressen 20 Minuten, mehrfach wiederholen.', 'Umfang markieren, Durchblutung, Motorik, Sensorik, Spannung und Haut kontrollieren.', 'Menge, KM-Typ, Befund und Maßnahmen dokumentieren.'],
            en: ['Stop injection immediately, leave cannula in place initially and attempt aspiration.', 'Remove cannula after aspiration, elevate the limb.', 'Apply cold compresses for 20 minutes repeatedly.', 'Check perfusion, motor function, sensation, tissue tension and skin.', 'Document volume, contrast type, findings and measures.'],
            fa: ['تزریق را فوراً متوقف کنید، ابتدا مسیر وریدی را نگه دارید و آسپیراسیون را امتحان کنید.', 'پس از آسپیراسیون کانول را خارج و اندام را بالا نگه دارید.', 'کمپرس سرد ۲۰ دقیقه‌ای را چند بار تکرار کنید.', 'گردش خون، حرکت، حس، فشار بافتی و پوست را کنترل کنید.', 'حجم، نوع ماده حاجب، یافته بالینی و اقدامات را مستند کنید.'],
          }},
          { type: 'table', headers: { de: ['KM', 'Vorteil', 'CAVE'], en: ['CM', 'Advantage', 'Caution'], fa: ['ماده حاجب', 'مزیت', 'احتیاط'] }, rows: [
            { de: ['Bariumsulfat', 'Sehr gute Schleimhautdarstellung', 'Kontraindiziert bei Perforation, Aspiration und Ileus'], en: ['Barium sulfate', 'Excellent mucosal coating', 'Contraindicated in perforation, aspiration risk and ileus'], fa: ['باریوم سولفات', 'نمایش خوب مخاط', 'در پرفوراسیون، خطر آسپراسیون و ایلئوس ممنوع است'] },
            { de: ['Gastrografin®', 'Bei Perforationsverdacht besser, da resorbierbar', 'Hyperosmolar, kann abführend wirken'], en: ['Gastrografin®', 'Better when perforation is suspected because it can be resorbed', 'Hyperosmolar and may have a laxative effect'], fa: ['Gastrografin®', 'در شک به پرفوراسیون مناسب‌تر است چون جذب می‌شود', 'هیپراسمولار است و می‌تواند اثر ملین داشته باشد'] },
          ]},
        ],
      },
    ],
  },
  {
    id: 'km-mrt', slug: 'mrt-km', icon: '🧲', color: '#7c3aed',
    titles: { de: 'MRT-Kontrastmittel und Gadolinium-Grundlagen', en: 'MRI contrast media and gadolinium basics', fa: 'مواد حاجب MRI و مبانی گادولینیوم' },
    shortTitles: { de: 'MRT KM', en: 'MRI contrast media', fa: 'مواد حاجب MRI' },
    summary: { de: 'Gadolinium-Chelate, T1-/T2-Effekt, makrozyklische vs. lineare KM und leberspezifische Kontrastmittel.', en: 'Gadolinium chelates, T1/T2 effects, macrocyclic vs linear agents and liver-specific contrast media.', fa: 'کلات‌های گادولینیوم، اثر T1/T2، تفاوت ماکروسیکلیک و خطی و مواد حاجب اختصاصی کبد.' },
    stats: [
      { value: 'Gd³⁺', label: { de: 'toxisch als freies Ion', en: 'toxic as free ion', fa: 'در حالت آزاد سمی' } },
      { value: '0,1', label: { de: 'mmol/kg Standard', en: 'mmol/kg standard', fa: 'mmol/kg دوز استاندارد' } },
      { value: '20', label: { de: 'min Primovist-Spätphase', en: 'min Primovist delayed phase', fa: 'دقیقه فاز کبدی Primovist' } },
    ],
    sections: [
      { id: 'gadolinium', icon: '🧲', title: { de: 'Gadolinium und Chelate', en: 'Gadolinium and chelates', fa: 'گادولینیوم و کلات‌ها' }, blocks: [
        { type: 'cards', items: [
          { title: { de: 'Warum Chelat?', en: 'Why chelation?', fa: 'چرا کلات؟' }, text: { de: 'Freie Gadolinium-Ionen sind toxisch. Deshalb wird Gd³⁺ in einem Chelat-Käfig gebunden.', en: 'Free gadolinium ions are toxic. Therefore Gd³⁺ is bound inside a chelate cage.', fa: 'یون آزاد گادولینیوم سمی است، بنابراین Gd³⁺ باید داخل یک «قفس» کلاتی بسته شود.' } },
          { title: { de: 'Makrozyklisch', en: 'Macrocyclic', fa: 'ماکروسیکلیک' }, text: { de: 'Ringförmiger Käfig, sehr stabil, heutiger Routine-Standard; z. B. Gadovist® und Dotarem®.', en: 'Ring-shaped cage, highly stable and current routine standard; e.g. Gadovist® and Dotarem®.', fa: 'ساختار حلقوی و پایدارتر؛ استاندارد امروز، مانند Gadovist® و Dotarem®.' } },
          { title: { de: 'Linear', en: 'Linear', fa: 'خطی' }, text: { de: 'Offenkettige Struktur, weniger stabil, höheres Ablagerungsrisiko; heute stark eingeschränkt.', en: 'Open-chain structure, less stable and higher deposition risk; now strongly restricted.', fa: 'ساختار زنجیره‌ای باز، پایداری کمتر و خطر رسوب بیشتر؛ امروزه محدودتر استفاده می‌شود.' } },
        ]},
        { type: 'table', headers: { de: ['Effekt', 'Bildwirkung', 'Bedeutung'], en: ['Effect', 'Imaging effect', 'Meaning'], fa: ['اثر', 'تأثیر تصویری', 'اهمیت'] }, rows: [
          { de: ['T1-Effekt', 'T1-Verkürzung → Signalanstieg', 'klinisch wichtigster Effekt'], en: ['T1 effect', 'T1 shortening → signal increase', 'most important clinical effect'], fa: ['اثر T1', 'کوتاه شدن T1 → افزایش سیگنال', 'مهم‌ترین اثر بالینی'] },
          { de: ['T2-Effekt', 'T2-Verkürzung → Signalabfall', 'vor allem bei hoher Konzentration relevant'], en: ['T2 effect', 'T2 shortening → signal loss', 'relevant mainly at high concentration'], fa: ['اثر T2', 'کوتاه شدن T2 → کاهش سیگنال', 'بیشتر در غلظت بالا مهم است'] },
        ]},
      ]},
      { id: 'leber', icon: '🫀', title: { de: 'Leberspezifische KM', en: 'Liver-specific contrast media', fa: 'مواد حاجب اختصاصی کبد' }, blocks: [
        { type: 'table', headers: { de: ['KM', 'Hepatozyten-Aufnahme', 'Hepatobiliäre Phase'], en: ['CM', 'Hepatocyte uptake', 'Hepatobiliary phase'], fa: ['ماده حاجب', 'جذب توسط هپاتوسیت', 'فاز هپاتوبیلیاری'] }, rows: [
          { de: ['Primovist®', '~50%', 'nach ca. 20 min'], en: ['Primovist®', '~50%', 'after approx. 20 min'], fa: ['Primovist®', 'حدود ۵۰٪', 'پس از حدود ۲۰ دقیقه'] },
          { de: ['Multihance®', '~3–5%', 'nach ca. 40–120 min'], en: ['Multihance®', '~3–5%', 'after approx. 40–120 min'], fa: ['Multihance®', 'حدود ۳–۵٪', 'پس از حدود ۴۰–۱۲۰ دقیقه'] },
        ]},
        { type: 'note', variant: 'key', title: { de: 'Indikationen', en: 'Indications', fa: 'اندیکاسیون‌ها' }, text: { de: 'FNH vs. Adenom, HCC-Detektion bei Zirrhose, Nachweis kleiner Metastasen und Darstellung biliärer Leckagen.', en: 'FNH vs adenoma, HCC detection in cirrhosis, detection of small metastases and biliary leak assessment.', fa: 'افتراق FNH از آدنوم، تشخیص HCC در سیروز، کشف متاستازهای کوچک و نمایش نشت صفراوی.' } },
      ]},
      { id: 'buscopan', icon: '💊', title: { de: 'Begleitmedikation: Buscopan®', en: 'Adjunct medication: Buscopan®', fa: 'داروی همراه: Buscopan®' }, blocks: [
        { type: 'cards', items: [
          { title: { de: 'Wirkung', en: 'Effect', fa: 'اثر' }, text: { de: 'Parasympatholytikum; reduziert vorübergehend die glatte Muskulatur und damit Bewegungsartefakte im GI-Trakt.', en: 'Parasympatholytic agent; temporarily reduces smooth muscle activity and motion artefacts in the GI tract.', fa: 'پاراسمپاتولیتیک است؛ عضلات صاف دستگاه گوارش را موقتاً کاهش می‌دهد و آرتیفکت حرکتی کم می‌شود.' } },
          { title: { de: 'Kontraindikationen', en: 'Contraindications', fa: 'منع مصرف' }, text: { de: 'Glaukom, Prostatahyperplasie, Tachyarrhythmie, mechanischer Ileus. Alternative: Glucagon.', en: 'Glaucoma, prostatic hyperplasia, tachyarrhythmia and mechanical ileus. Alternative: glucagon.', fa: 'گلوکوم، هیپرپلازی پروستات، تاکی‌آریتمی و ایلئوس مکانیکی. جایگزین: گلوکاگون.' } },
        ]},
        { type: 'note', variant: 'warning', title: { de: 'Aufklärung', en: 'Patient information', fa: 'توضیح به بیمار' }, text: { de: 'Mydriasis und Akkommodationsstörung möglich: für 1–2 Stunden kein Autofahren und keine Maschinen bedienen.', en: 'Mydriasis and impaired accommodation may occur: no driving or operating machines for 1–2 hours.', fa: 'ممکن است مردمک گشاد شود و فوکوس نزدیک مختل گردد؛ تا ۱–۲ ساعت رانندگی و کار با دستگاه انجام نشود.' } },
      ]},
    ],
  },
  {
    id: 'km-nebenwirkung-jod', slug: 'nebenwirkung-jodhaltiger-km', icon: '⚠️', color: '#dc2626',
    titles: { de: 'Nebenwirkungen jodhaltiger Kontrastmittel', en: 'Adverse effects of iodinated contrast media', fa: 'عوارض مواد حاجب یددار' },
    shortTitles: { de: 'Nebenwirkung jodhaltiger KM', en: 'Adverse effects of iodinated CM', fa: 'عوارض مواد حاجب یددار' },
    summary: { de: 'Chemotoxische und allergieartige Reaktionen, Paravasat, PC-AKI, Metformin-Management und Schilddrüse.', en: 'Chemotoxic and allergy-like reactions, extravasation, PC-AKI, metformin management and thyroid issues.', fa: 'واکنش‌های شیمی‌توکسیک و شبه‌آلرژیک، پاراوازات، PC-AKI، متفورمین و تیروئید.' },
    stats: [
      { value: '0.01–0.04%', label: { de: 'schwere Reaktionen selten', en: 'severe reactions rare', fa: 'واکنش شدید نادر' } },
      { value: '48–72h', label: { de: 'PC-AKI-Zeitfenster', en: 'PC-AKI window', fa: 'بازه PC-AKI' } },
      { value: '<30', label: { de: 'eGFR Hochrisiko', en: 'eGFR high risk', fa: 'eGFR پرخطر' } },
    ],
    sections: [
      { id: 'reaktionen', icon: '🌡️', title: { de: 'Reaktionstypen', en: 'Types of reactions', fa: 'انواع واکنش‌ها' }, blocks: [
        { type: 'cards', items: [
          { title: { de: 'Chemotoxisch', en: 'Chemotoxic', fa: 'شیمی‌توکسیک' }, text: { de: 'Direkte chemische Wirkung, nicht immunologisch. Typisch: Wärmegefühl, Übelkeit, Erbrechen, vasovagale Reaktion, Arrhythmien, selten Krampfanfall.', en: 'Direct chemical effect, not immunological. Typical: warmth, nausea, vomiting, vasovagal reaction, arrhythmias, rarely seizure.', fa: 'اثر مستقیم شیمیایی و غیرایمونولوژیک؛ گرگرفتگی، تهوع، استفراغ، واکنش وازوواگال، آریتمی و به‌ندرت تشنج.' } },
          { title: { de: 'Allergieartig', en: 'Allergy-like', fa: 'شبه‌آلرژیک' }, text: { de: 'Nicht IgE-vermittelt. Mechanismus: unspezifische Mastzellaktivierung mit Histaminfreisetzung.', en: 'Not IgE-mediated. Mechanism: nonspecific mast cell activation with histamine release.', fa: 'IgE-mediated نیست؛ مکانیسم، فعال شدن غیر اختصاصی ماست‌سل و آزاد شدن هیستامین است.' } },
        ]},
        { type: 'table', headers: { de: ['Grad', 'Symptome'], en: ['Grade', 'Symptoms'], fa: ['درجه', 'علائم'] }, rows: [
          { de: ['1 mild', 'Juckreiz, leichte Urtikaria, Erythem'], en: ['1 mild', 'Pruritus, mild urticaria, erythema'], fa: ['۱ خفیف', 'خارش، کهیر خفیف، اریتم'] },
          { de: ['2 moderat', 'deutliche Urtikaria, Bronchospasmus, Larynxödem'], en: ['2 moderate', 'marked urticaria, bronchospasm, laryngeal edema'], fa: ['۲ متوسط', 'کهیر واضح، برونکواسپاسم، ادم حنجره'] },
          { de: ['3 schwer', 'Hypotonie, Schock'], en: ['3 severe', 'hypotension, shock'], fa: ['۳ شدید', 'افت فشار خون، شوک'] },
          { de: ['4 lebensbedrohlich', 'Atemstillstand, Herzstillstand'], en: ['4 life-threatening', 'respiratory arrest, cardiac arrest'], fa: ['۴ تهدیدکننده حیات', 'ایست تنفسی، ایست قلبی'] },
        ]},
        { type: 'note', variant: 'danger', title: { de: 'Keine Jodallergie', en: 'No iodine allergy', fa: 'آلرژی به ید وجود ندارد' }, text: { de: 'Die oft genannte „Jodallergie“ existiert nicht. Jod ist als kleines Molekül nicht allergen; Reaktionen richten sich gegen andere Molekülbestandteile.', en: 'The commonly mentioned “iodine allergy” does not exist. Iodine is a small non-allergenic molecule; reactions are directed against other components.', fa: 'اصطلاح «آلرژی به ید» از نظر پزشکی درست نیست. ید مولکول کوچکی است و آلرژن نیست؛ واکنش‌ها علیه سایر اجزای مولکول رخ می‌دهند.' } },
      ]},
      { id: 'pc-aki', icon: '🫘', title: { de: 'PC-AKI und Nierenschutz', en: 'PC-AKI and renal protection', fa: 'PC-AKI و حفاظت کلیه' }, blocks: [
        { type: 'note', variant: 'key', title: { de: 'Definition', en: 'Definition', fa: 'تعریف' }, text: { de: 'PC-AKI: Anstieg des Serumkreatinins innerhalb von 48–72 Stunden nach intravaskulärer KM-Gabe um ≥0,3 mg/dl oder auf das ≥1,5-fache.', en: 'PC-AKI: rise in serum creatinine within 48–72 hours after intravascular contrast administration by ≥0.3 mg/dl or to ≥1.5 times baseline.', fa: 'PC-AKI یعنی افزایش کراتینین سرم طی ۴۸–۷۲ ساعت پس از تزریق داخل‌عروقی ماده حاجب، به میزان ≥0.3 mg/dl یا ≥1.5 برابر پایه.' } },
        { type: 'table', headers: { de: ['Risikofaktor', 'Bedeutung'], en: ['Risk factor', 'Meaning'], fa: ['عامل خطر', 'اهمیت'] }, rows: [
          { de: ['eGFR <45 + First-Pass oder Intensivpatient', 'erhöhtes Risiko'], en: ['eGFR <45 + first-pass or ICU patient', 'increased risk'], fa: ['eGFR <45 همراه First-Pass یا بیمار ICU', 'خطر افزایش‌یافته'] },
          { de: ['eGFR <30 bei IV/Second-Pass', 'hohes Risiko'], en: ['eGFR <30 with IV/second-pass', 'high risk'], fa: ['eGFR <30 در تزریق IV/Second-Pass', 'خطر بالا'] },
          { de: ['Akutes Nierenversagen', 'bekannt oder vermutet: besonders kritisch'], en: ['Acute kidney injury', 'known or suspected: critical'], fa: ['نارسایی حاد کلیه', 'شناخته‌شده یا مشکوک: بسیار مهم'] },
        ]},
        { type: 'cards', items: [
          { title: { de: 'Hydrierung', en: 'Hydration', fa: 'هیدراتاسیون' }, text: { de: 'Bei eGFR <30 empfohlen, bevorzugt i.v. 0,9% NaCl; z. B. 100 ml/h je 4 Stunden vor und nach KM-Gabe. Vorsicht bei Herzinsuffizienz.', en: 'Recommended for eGFR <30, preferably IV 0.9% saline; e.g. 100 ml/h for 4 h before and after CM. Caution in heart failure.', fa: 'در eGFR <30 توصیه می‌شود، ترجیحاً نرمال‌سالین وریدی؛ مثلاً ۱۰۰ ml/h برای ۴ ساعت قبل و بعد. در نارسایی قلبی احتیاط شود.' } },
          { title: { de: 'Metformin', en: 'Metformin', fa: 'متفورمین' }, text: { de: 'Bei eGFR >30 weiterführen. Bei eGFR <30 oder akutem Nierenversagen zum Untersuchungszeitpunkt für 48 Stunden pausieren.', en: 'Continue if eGFR >30. If eGFR <30 or acute kidney injury, stop at the time of the examination for 48 hours.', fa: 'در eGFR >30 ادامه می‌یابد. در eGFR <30 یا نارسایی حاد کلیه، از زمان بررسی برای ۴۸ ساعت قطع شود.' } },
          { title: { de: 'Dialyse', en: 'Dialysis', fa: 'دیالیز' }, text: { de: 'Für jodhaltige KM ist keine zeitliche Abstimmung der Dialyse nötig.', en: 'No dialysis timing adjustment is required for iodinated contrast media.', fa: 'برای مواد یددار، زمان‌بندی خاص دیالیز لازم نیست.' } },
        ]},
      ]},
      { id: 'schilddruese', icon: '🦋', title: { de: 'Schilddrüse', en: 'Thyroid', fa: 'تیروئید' }, blocks: [
        { type: 'cards', items: [
          { title: { de: 'Latente Hyperthyreose', en: 'Latent hyperthyroidism', fa: 'هایپرتیروئیدی نهفته' }, text: { de: 'Natriumperchlorat/Irenat® vor KM und für 7–10 Tage weiter. Es blockiert die Jodaufnahme in die Schilddrüse.', en: 'Sodium perchlorate/Irenat® before CM and continued for 7–10 days. It blocks iodine uptake into the thyroid.', fa: 'Natriumperchlorat/Irenat® قبل از تزریق و ۷–۱۰ روز ادامه؛ ورود ید به تیروئید را مهار می‌کند.' } },
          { title: { de: 'Manifeste Hyperthyreose', en: 'Manifest hyperthyroidism', fa: 'هایپرتیروئیدی آشکار' }, text: { de: 'Absolute Kontraindikation, außer bei lebensbedrohlicher Indikation. Dann Irenat® plus Thiamazol/Carbimazol.', en: 'Absolute contraindication except in life-threatening situations. Then use Irenat® plus thiamazole/carbimazole.', fa: 'منع مطلق است مگر در وضعیت تهدیدکننده حیات؛ در این حالت Irenat® همراه Thiamazol/Carbimazol.' } },
          { title: { de: 'Schilddrüsenkarzinom', en: 'Thyroid carcinoma', fa: 'کارسینوم تیروئید' }, text: { de: 'Bei geplanter Radiojodtherapie jodhaltiges KM vermeiden, da Jodsättigung die Therapie behindert.', en: 'Avoid iodinated CM when radioiodine therapy is planned because iodine saturation interferes with therapy.', fa: 'در صورت برنامه‌ریزی رادیویُد، ماده حاجب یددار ممنوع/باید اجتناب شود چون اشباع ید درمان را مختل می‌کند.' } },
        ]},
      ]},
    ],
  },
  {
    id: 'km-nebenwirkung-gadolinium', slug: 'nebenwirkung-gadolinium', icon: '🛡️', color: '#0891b2',
    titles: { de: 'Nebenwirkungen von Gadolinium-Kontrastmitteln', en: 'Adverse effects of gadolinium contrast media', fa: 'عوارض مواد حاجب گادولینیوم' },
    shortTitles: { de: 'Nebenwirkung Gadolinium', en: 'Adverse effects of gadolinium', fa: 'عوارض گادولینیوم' },
    summary: { de: 'NSF, Gadolinium-Retention, Risikopatienten und warum makrozyklische Chelate bevorzugt werden.', en: 'NSF, gadolinium retention, risk patients and why macrocyclic chelates are preferred.', fa: 'NSF، رسوب گادولینیوم، بیماران پرخطر و دلیل ترجیح کلات‌های ماکروسیکلیک.' },
    stats: [
      { value: '<30', label: { de: 'GFR-Risiko für NSF', en: 'GFR risk for NSF', fa: 'GFR پرخطر برای NSF' } },
      { value: 'linear', label: { de: 'höheres Ablagerungsrisiko', en: 'higher deposition risk', fa: 'خطر رسوب بیشتر' } },
      { value: 'makro', label: { de: 'Routine-Standard', en: 'routine standard', fa: 'استاندارد روتین' } },
    ],
    sections: [
      { id: 'nsf', icon: '🧬', title: { de: 'Nephrogene systemische Fibrose (NSF)', en: 'Nephrogenic systemic fibrosis (NSF)', fa: 'فیبروز سیستمیک نفروژنیک (NSF)' }, blocks: [
        { type: 'note', variant: 'danger', title: { de: 'Klassische Risikokonstellation', en: 'Classic risk constellation', fa: 'شرایط کلاسیک پرخطر' }, text: { de: 'Schwere Niereninsuffizienz mit GFR <30 und Gabe eines linearen Gadolinium-Kontrastmittels.', en: 'Severe renal insufficiency with GFR <30 and administration of a linear gadolinium agent.', fa: 'نارسایی شدید کلیه با GFR <30 همراه با تجویز ماده حاجب گادولینیوم خطی.' } },
        { type: 'cards', items: [
          { title: { de: 'Mechanismus', en: 'Mechanism', fa: 'مکانیسم' }, text: { de: 'Freies Gadolinium kann Fibroblasten aktivieren und zu massiver Kollagenablagerung und Fibrosierung führen.', en: 'Free gadolinium may activate fibroblasts and cause massive collagen deposition and fibrosis.', fa: 'گادولینیوم آزاد می‌تواند فیبروبلاست‌ها را فعال کند و باعث رسوب کلاژن و فیبروز وسیع شود.' } },
          { title: { de: 'Status heute', en: 'Current status', fa: 'وضعیت امروز' }, text: { de: 'Dank makrozyklischer, stabiler KM ist NSF heute extrem selten.', en: 'Because stable macrocyclic agents are used, NSF is extremely rare today.', fa: 'به دلیل استفاده از مواد ماکروسیکلیک پایدار، NSF امروزه بسیار نادر است.' } },
        ]},
      ]},
      { id: 'retention', icon: '🧠', title: { de: 'Gadolinium-Retention im Gehirn', en: 'Gadolinium retention in the brain', fa: 'رسوب گادولینیوم در مغز' }, blocks: [
        { type: 'cards', items: [
          { title: { de: 'Bildgebung', en: 'Imaging', fa: 'تصویربرداری' }, text: { de: 'Nach mehrfacher Gabe linearer KM können T1-Hyperintensitäten im Nucleus dentatus und Globus pallidus auftreten.', en: 'After repeated administration of linear agents, T1 hyperintensities may appear in the dentate nucleus and globus pallidus.', fa: 'پس از تزریق‌های مکرر مواد خطی، ممکن است هایپراینتنسیتی T1 در Nucleus dentatus و Globus pallidus دیده شود.' } },
          { title: { de: 'Klinische Relevanz', en: 'Clinical relevance', fa: 'اهمیت بالینی' }, text: { de: 'Bisher unklare klinische Bedeutung ohne sicheres klinisches Korrelat.', en: 'Clinical significance remains unclear without a definite clinical correlate.', fa: 'اهمیت بالینی آن تاکنون نامشخص است و ارتباط قطعی بالینی ثابت نشده است.' } },
        ]},
        { type: 'note', variant: 'key', title: { de: 'Praktische Konsequenz', en: 'Practical consequence', fa: 'نتیجه عملی' }, text: { de: 'Makrozyklische KM bevorzugen und jede Gadolinium-Gabe indikationsgerecht begründen.', en: 'Prefer macrocyclic agents and justify each gadolinium administration by indication.', fa: 'مواد ماکروسیکلیک ترجیح داده شوند و هر تزریق گادولینیوم باید اندیکاسیون واضح داشته باشد.' } },
      ]},
    ],
  },
  {
    id: 'km-schwangerschaft-stillzeit', slug: 'schwangerschaft-stillzeit', icon: '🤰', color: '#db2777',
    titles: { de: 'Kontrastmittel in Schwangerschaft und Stillzeit', en: 'Contrast media in pregnancy and breastfeeding', fa: 'مواد حاجب در بارداری و شیردهی' },
    shortTitles: { de: 'Schwangerschaft und Stillzeit', en: 'Pregnancy and breastfeeding', fa: 'بارداری و شیردهی' },
    summary: { de: 'Strenge Indikationsstellung, Jod-KM, Gadolinium, fetale Schilddrüse und Stillpause.', en: 'Strict indication, iodinated CM, gadolinium, fetal thyroid and breastfeeding pause.', fa: 'اندیکاسیون سختگیرانه، مواد یددار، گادولینیوم، تیروئید جنین و شیردهی.' },
    stats: [
      { value: '10–12', label: { de: 'SSW: fetale Jodaufnahme', en: 'weeks: fetal iodine uptake', fa: 'هفته: جذب ید جنین' } },
      { value: 'TSH', label: { de: 'Kontrolle nach Geburt', en: 'check after birth', fa: 'کنترل پس از تولد' } },
      { value: '0h', label: { de: 'Stillpause meist nötig? nein', en: 'breast pause usually? no', fa: 'قطع شیردهی معمولاً؟ خیر' } },
    ],
    sections: [
      { id: 'grundprinzip', icon: '⚖️', title: { de: 'Grundprinzipien', en: 'Basic principles', fa: 'اصول کلی' }, blocks: [
        { type: 'note', variant: 'danger', title: { de: 'Strenge Indikation', en: 'Strict indication', fa: 'اندیکاسیون سختگیرانه' }, text: { de: 'Kontrastmittel nur, wenn die Untersuchung nicht verschiebbar ist und eine KM-freie Alternative diagnostisch nicht ausreicht. Aufklärung und Dokumentation sind obligat.', en: 'Use contrast only if the examination cannot be postponed and a non-contrast alternative is insufficient. Patient information and documentation are mandatory.', fa: 'ماده حاجب فقط زمانی استفاده شود که بررسی قابل تعویق نباشد و جایگزین بدون کنتراست کافی نباشد. توضیح به بیمار و مستندسازی الزامی است.' } },
      ]},
      { id: 'schwangerschaft', icon: '👶', title: { de: 'Schwangerschaft', en: 'Pregnancy', fa: 'بارداری' }, blocks: [
        { type: 'cards', items: [
          { title: { de: 'Jodhaltige KM', en: 'Iodinated CM', fa: 'مواد حاجب یددار' }, text: { de: 'Plazentagängig. Die fetale Schilddrüse kann ab etwa 10.–12. SSW Jod aufnehmen; nach Geburt TSH kontrollieren.', en: 'Cross the placenta. The fetal thyroid can take up iodine from about 10–12 weeks; check neonatal TSH after birth.', fa: 'از جفت عبور می‌کنند. تیروئید جنین از حدود هفته ۱۰–۱۲ می‌تواند ید جذب کند؛ پس از تولد TSH نوزاد کنترل شود.' } },
          { title: { de: 'Gadolinium', en: 'Gadolinium', fa: 'گادولینیوم' }, text: { de: 'Passiert die Plazenta, wird renal ins Fruchtwasser ausgeschieden und kann erneut vom Fetus aufgenommen werden. Möglichst vermeiden, besonders im 1. Trimester.', en: 'Crosses the placenta, is excreted into amniotic fluid and can be reabsorbed by the fetus. Avoid when possible, especially in the first trimester.', fa: 'از جفت عبور می‌کند، وارد مایع آمنیون می‌شود و ممکن است دوباره توسط جنین جذب شود. تا حد امکان خصوصاً سه‌ماهه اول اجتناب شود.' } },
        ]},
        { type: 'note', variant: 'key', title: { de: 'Wenn Gadolinium unvermeidbar ist', en: 'If gadolinium is unavoidable', fa: 'اگر گادولینیوم اجتناب‌ناپذیر باشد' }, text: { de: 'Makrozyklische Gadolinium-KM bevorzugen, weil sie stabiler sind und weniger Dissoziationsrisiko haben.', en: 'Prefer macrocyclic gadolinium agents because they are more stable and have a lower dissociation risk.', fa: 'مواد گادولینیوم ماکروسیکلیک ترجیح داده شوند چون پایدارترند و خطر آزاد شدن یون کمتر است.' } },
      ]},
      { id: 'stillzeit', icon: '🍼', title: { de: 'Stillzeit', en: 'Breastfeeding', fa: 'شیردهی' }, blocks: [
        { type: 'table', headers: { de: ['KM', 'Muttermilch', 'Empfehlung'], en: ['CM', 'Breast milk', 'Recommendation'], fa: ['ماده حاجب', 'ورود به شیر', 'توصیه'] }, rows: [
          { de: ['Jodhaltige KM', '~0,5% der Dosis', 'Stillpause nicht nötig'], en: ['Iodinated CM', '~0.5% of dose', 'No breastfeeding pause required'], fa: ['مواد یددار', 'حدود ۰٫۵٪ دوز', 'قطع شیردهی لازم نیست'] },
          { de: ['Gadolinium-KM', '<0,04% der Dosis', 'Stillpause nicht nötig'], en: ['Gadolinium CM', '<0.04% of dose', 'No breastfeeding pause required'], fa: ['گادولینیوم', 'کمتر از ۰٫۰۴٪ دوز', 'قطع شیردهی لازم نیست'] },
        ]},
        { type: 'note', variant: 'info', title: { de: 'Wenn die Mutter besorgt ist', en: 'If the mother is worried', fa: 'اگر مادر نگران باشد' }, text: { de: 'Medizinisch ist eine Stillpause nicht notwendig. Wenn die Mutter dennoch möchte, kann sie 24 Stunden pausieren und die Milch verwerfen.', en: 'A breastfeeding pause is not medically necessary. If the mother still prefers, she may pause for 24 hours and discard the milk.', fa: 'از نظر پزشکی قطع شیردهی لازم نیست. اگر مادر برای آرامش خود بخواهد، می‌تواند ۲۴ ساعت شیردهی را قطع و شیر را دور بریزد.' } },
      ]},
    ],
  },
]

export const KM_UI = {
  de: {
    dir: 'ltr', home: 'RadYar', learn: 'Technik & Physik', title: 'Kontrastmittel', badge: 'Lehrbuch · Dr. Zia',
    lead: 'Die Kontrastmittel-Einheit ist jetzt in fünf kurze, prüfungsnahe Lernseiten gegliedert.',
    choose: 'Thema auswählen', toc: 'Inhaltsverzeichnis', mcq: 'MCQs starten', overview: 'Zur KM-Übersicht', open: 'Öffnen', next: 'Nächstes Thema', prev: 'Vorheriges Thema',
  },
  en: {
    dir: 'ltr', home: 'RadYar', learn: 'Physics & Tech', title: 'Contrast media', badge: 'Textbook · Dr. Zia',
    lead: 'The contrast media unit is now split into five concise, exam-oriented learning pages.',
    choose: 'Choose topic', toc: 'Table of contents', mcq: 'Start MCQs', overview: 'Back to CM overview', open: 'Open', next: 'Next topic', prev: 'Previous topic',
  },
  fa: {
    dir: 'rtl', home: 'RadYar', learn: 'تکنیک و فیزیک', title: 'مواد حاجب', badge: 'جزوه آموزشی · Dr. Zia',
    lead: 'درس مواد حاجب اکنون به پنج صفحه کوتاه و مرتب برای مطالعه و آزمون تقسیم شده است.',
    choose: 'انتخاب موضوع', toc: 'فهرست درس', mcq: 'شروع MCQ', overview: 'بازگشت به فهرست KM', open: 'باز کردن', next: 'موضوع بعدی', prev: 'موضوع قبلی',
  },
}

export function getLangValue(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || ''
}

export function getTopicBySlug(slug) {
  return KM_TOPICS.find(topic => topic.slug === slug)
}

export function getTopicById(id) {
  return KM_TOPICS.find(topic => topic.id === id)
}

export function withLang(href, lang) {
  if (!href || lang === 'de') return href
  return href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`
}

export function topicHref(topic, lang) {
  return withLang(`/technik/kontrastmittel/${topic.slug}`, lang)
}

export function topicQuizHref(topic, lang) {
  return withLang(`/ueben/quiz?fach=technik&n=10&themen=${topic.id}`, lang)
}
