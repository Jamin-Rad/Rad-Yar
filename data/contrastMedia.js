import { getContrastRevision, contrastRevisionForSeed } from './assessmentQuality/contrastRevisions'
export const CONTRAST_TOPICS = [
  {
    id: 'km-ultraschall',
    group: { de: 'Ultraschall-Kontrastmittel', en: 'Ultrasound contrast media', fa: 'مواد حاجب سونوگرافی' },
    title: { de: 'Mikrobläschen & CEUS', en: 'Microbubbles & CEUS', fa: 'میکروحباب‌ها و CEUS' },
    icon: '🫧',
  },
  {
    id: 'km-jod-typen',
    group: { de: 'Röntgen-Kontrastmittel', en: 'X-ray contrast media', fa: 'مواد حاجب اشعهٔ ایکس' },
    title: { de: 'Typen & Eigenschaften', en: 'Types & properties', fa: 'انواع و ویژگی‌ها' },
    icon: '🧪',
  },
  {
    id: 'km-jod-reaktionen',
    group: { de: 'Röntgen-Kontrastmittel', en: 'X-ray contrast media', fa: 'مواد حاجب اشعهٔ ایکس' },
    title: { de: 'Nebenwirkungen & Notfallmanagement', en: 'Adverse reactions & emergency management', fa: 'عوارض و مدیریت اورژانسی' },
    icon: '🚨',
  },
  {
    id: 'km-gastrointestinal',
    group: { de: 'Röntgen-Kontrastmittel', en: 'X-ray contrast media', fa: 'مواد حاجب اشعهٔ ایکس' },
    title: { de: 'Gastrointestinale KM', en: 'Gastrointestinal contrast media', fa: 'مواد حاجب گوارشی' },
    icon: '🥤',
  },
  {
    id: 'km-gadolinium',
    group: { de: 'MRT-Kontrastmittel', en: 'MRI contrast media', fa: 'مواد حاجب MRI' },
    title: { de: 'Gadolinium-Grundlagen', en: 'Gadolinium fundamentals', fa: 'مبانی گادولینیوم' },
    icon: '🧲',
  },
  {
    id: 'km-gadolinium-retention-nsf',
    group: { de: 'MRT-Kontrastmittel', en: 'MRI contrast media', fa: 'مواد حاجب MRI' },
    title: { de: 'Gadolinium-Retention & NSF', en: 'Gadolinium retention & NSF', fa: 'احتباس گادولینیوم و NSF' },
    icon: '🛡️',
  },
  {
    id: 'km-buscopan',
    group: { de: 'MRT-Begleitmedikation', en: 'MRI adjunct medication', fa: 'داروی همراه MRI' },
    title: { de: 'Buscopan®', en: 'Buscopan®', fa: 'Buscopan®' },
    icon: '💊',
  },
  {
    id: 'km-niereninsuffizienz',
    group: { de: 'Nierenfunktion und KM', en: 'Renal function and contrast media', fa: 'عملکرد کلیه و مواد حاجب' },
    title: { de: 'Nierenfunktion und KM', en: 'Renal function and contrast media', fa: 'عملکرد کلیه و مواد حاجب' },
    icon: '🫘',
  },
  {
    id: 'km-schilddruese',
    group: { de: 'Röntgen-Kontrastmittel', en: 'X-ray contrast media', fa: 'مواد حاجب اشعهٔ ایکس' },
    title: { de: 'Schilddrüsenerkrankungen', en: 'Thyroid disease', fa: 'بیماری‌های تیروئید' },
    icon: '🦋',
  },
  {
    id: 'km-schwangerschaft-stillzeit',
    group: { de: 'Schwangere und Stillende', en: 'Pregnancy and breastfeeding', fa: 'بارداری و شیردهی' },
    title: { de: 'Schwangere und Stillende', en: 'Pregnancy and breastfeeding', fa: 'بارداری و شیردهی' },
    icon: '🤰',
  },
]

export const CONTRAST_GROUPS = [
  {
    id: 'ultraschall',
    readId: 'kontrastmittel-ultraschall',
    flashcardId: 'kontrastmittel-ultraschall',
    icon: '🫧',
    tags: ['Sono'],
    title: { de: 'Ultraschall-Kontrastmittel', en: 'Ultrasound contrast media', fa: 'مواد حاجب سونوگرافی' },
    subtitle: { de: 'Mikrobläschen, CEUS-Mechanismus, Indikationen und Sicherheit', en: 'Microbubbles, CEUS mechanism, indications and safety', fa: 'میکروحباب‌ها، سازوکار CEUS، اندیکاسیون‌ها و ایمنی' },
    topicIds: ['km-ultraschall'],
  },
  {
    id: 'roentgen',
    readId: 'kontrastmittel-roentgen',
    flashcardId: 'kontrastmittel-roentgen',
    icon: '🧪',
    title: { de: 'Röntgen-Kontrastmittel', en: 'X-ray contrast media', fa: 'مواد حاجب اشعهٔ ایکس' },
    subtitle: {
      de: 'Arten, Applikation, Ausscheidung, Reaktionen und gastrointestinale Anwendung',
      en: 'Types, administration, elimination, reactions and gastrointestinal use',
      fa: 'انواع، تجویز، دفع، واکنش‌ها و کاربرد گوارشی',
    },
    topicIds: ['km-jod-typen', 'km-jod-reaktionen', 'km-gastrointestinal', 'km-schilddruese'],
  },
  {
    id: 'mrt',
    readId: 'kontrastmittel-mrt',
    flashcardId: 'kontrastmittel-mrt',
    icon: '🧲',
    title: { de: 'MRT-Kontrastmittel', en: 'MRI contrast media', fa: 'مواد حاجب MRI' },
    subtitle: {
      de: 'Gadolinium-Grundlagen, Retention und nephrogene systemische Fibrose',
      en: 'Gadolinium fundamentals, retention and nephrogenic systemic fibrosis',
      fa: 'مبانی گادولینیوم، احتباس و فیبروز سیستمیک نفروژنیک',
    },
    topicIds: ['km-gadolinium', 'km-gadolinium-retention-nsf', 'km-buscopan'],
  },
  {
    id: 'schwangerschaft',
    readId: 'kontrastmittel-schwangerschaft',
    flashcardId: 'kontrastmittel-schwangerschaft',
    icon: '🤰',
    title: { de: 'Schwangere und Stillende', en: 'Pregnancy and breastfeeding', fa: 'بارداری و شیردهی' },
    subtitle: {
      de: 'Jodhaltige und gadoliniumhaltige Kontrastmittel sicher abwägen',
      en: 'Balancing iodinated and gadolinium contrast safely',
      fa: 'ارزیابی ایمن مواد یددار و گادولینیومی',
    },
    topicIds: ['km-schwangerschaft-stillzeit'],
  },
  {
    id: 'nierenfunktion',
    readId: 'kontrastmittel-nierenfunktion',
    flashcardId: 'kontrastmittel-nierenfunktion',
    icon: '🫘',
    title: { de: 'Nierenfunktion und KM', en: 'Renal function and contrast media', fa: 'عملکرد کلیه و مواد حاجب' },
    subtitle: {
      de: 'Jodhaltige und gadoliniumhaltige Kontrastmittel gemeinsam beurteilen',
      en: 'Assessing iodinated and gadolinium agents together',
      fa: 'ارزیابی هم‌زمان مواد یددار و گادولینیومی',
    },
    topicIds: ['km-niereninsuffizienz'],
  },
]

export const getContrastGroup = groupId => CONTRAST_GROUPS.find(group => group.id === groupId)
export const getContrastGroupForTopic = topicId => CONTRAST_GROUPS.find(group => group.topicIds.includes(topicId))

export const CONTRAST_LESSON = {
  de: {
    title: 'Kontrastmittel',
    subtitle: 'Sichere Anwendung von Röntgen- und MRT-Kontrastmitteln in allgemeinen und besonderen Risikosituationen',
    intro: 'Kontrastmittel verbessern die diagnostische Aussagekraft, benötigen aber eine klare Indikation, passende Patientenselektion und ein vorbereitetes Reaktionsmanagement.',
    key: 'Immer zuerst fragen: Verändert die Kontrastmittelgabe die Diagnose oder das Management? Danach Wirkstoffklasse, Risikoprofil und niedrigste diagnostisch ausreichende Dosis wählen.',
    sections: {
      'km-ultraschall': {
        lead: 'Ultraschall-Kontrastmittel sind gasgefüllte Mikrobläschen. Sie verbessern das Echo aus dem Blutpool und werden überwiegend über die Lunge eliminiert.',
        points: [['Mechanismus', 'Mikrobläschen reflektieren Ultraschall stark; bei niedrigem mechanischem Index entstehen nichtlineare und harmonische Signale.'], ['Verteilung', 'Intravenös verabreichte Mikrobläschen bleiben intravasal; sie sind keine jod- oder gadoliniumhaltigen extrazellulären Kontrastmittel.'], ['Sicherheit', 'Zulassung, Kontraindikationen und Anwendung hängen vom Präparat und Applikationsweg ab. Die aktuelle Fachinformation ist maßgeblich.']],
        takeHome: 'CEUS ist eine eigene Kontrastmittelklasse: Indikation, Zulassung und Sicherheitsregeln präparat- und routenspezifisch prüfen.',
      },
      'km-jod-typen': {
        lead: 'Moderne intravaskuläre Röntgenkontrastmittel sind überwiegend nicht-ionisch und niedrig- oder isoosmolar.',
        points: [
          ['Grundprinzip', 'Jod absorbiert Röntgenstrahlung und erhöht dadurch die Dichte in CT, Angiographie und Durchleuchtung.'],
          ['Eigenschaften', 'Osmolalität, Viskosität, Jodkonzentration und Injektionsrate beeinflussen Verträglichkeit und Kontrastierung.'],
          ['Praxis', 'Präparat, Dosis, Flussrate, Zugang und Untersuchungsphase müssen zum klinischen Ziel passen.'],
        ],
        takeHome: 'Nicht-ionisch und niedrigosmolar ist heute der intravaskuläre Standard; hohe Viskosität kann durch Erwärmen reduziert werden.',
      },
      'km-jod-reaktionen': {
        lead: 'Akute Reaktionen werden als allergieähnlich oder physiologisch und nach Schweregrad eingeteilt.',
        points: [
          ['Mild', 'Begrenzte Urtikaria, Juckreiz, Übelkeit oder Wärmegefühl: beobachten und symptomorientiert behandeln.'],
          ['Moderat', 'Ausgeprägte Urtikaria, Bronchospasmus oder Gesichtsödem erfordern rasche ärztliche Beurteilung und Überwachung.'],
          ['Schwer', 'Bei Anaphylaxie: Kontrastmittel stoppen, Hilfe rufen, Atemweg/Atmung/Kreislauf sichern und intramuskuläres Adrenalin nach lokalem Notfallstandard geben.'],
        ],
        takeHome: 'Eine dokumentierte frühere schwere Reaktion ist der wichtigste Risikofaktor. Notfallausrüstung und geschultes Personal müssen verfügbar sein.',
      },
      'km-gastrointestinal': {
        lead: 'Enterale Kontrastmittel markieren oder distendieren den Gastrointestinaltrakt.',
        points: [
          ['Bariumsulfat', 'Sehr gute Schleimhautdarstellung in der Durchleuchtung. Bei vermuteter Leckage zunächst Jod-KM; auch kleine Aspirationsmengen können besonders bei Lungenerkrankung Beschwerden verursachen, verzögert abtransportiert werden und Entzündung fördern. Laut ESUR sind sie selten lebensbedrohlich; große Mengen können schwere Atemwegsfolgen haben.'],
          ['Wasserlösliches Jod-KM', 'Bei Leckverdacht meist zuerst; für orale Gabe bevorzugt ESUR nichtionische niedrig-/isoosmolale Mittel, wenn geeignet. Hyperosmolares ionisches Diatrizoat kann bei Aspiration schwere, laut ESUR äußerst seltene Lungenkomplikationen verursachen.'],
          ['Neutral/negativ', 'Wasser oder spezielle Lösungen werden etwa für CT- oder MR-Enterographie genutzt.'],
        ],
        takeHome: 'Die Wahl richtet sich nach Fragestellung, vermuteter Leckage, Aspirationsrisiko und dem konkreten Jod-Präparat samt Osmolarität.',
      },
      'km-gadolinium': {
        lead: 'Gadolinium verkürzt überwiegend die T1-Relaxationszeit und wird als stabiler Chelatkomplex verabreicht.',
        points: [
          ['Klassen', 'Makrozyklische Chelate sind stabiler als lineare Chelate und setzen weniger freies Gadolinium frei.'],
          ['Verteilung', 'Die meisten Präparate verteilen sich extrazellulär; Gadoxetsäure besitzt zusätzlich eine hepatobiliäre Aufnahme.'],
          ['Anwendung', 'Nur bei zusätzlichem diagnostischem Nutzen und in der niedrigsten ausreichend kontrastierenden Dosis einsetzen.'],
        ],
        takeHome: 'In der EU sind mehrere lineare intravenöse Präparate suspendiert oder eingeschränkt; makrozyklische Präparate werden bevorzugt.',
      },
      'km-gadolinium-retention-nsf': {
        lead: 'Gadolinium kann nach wiederholter Gabe in Geweben nachweisbar bleiben; ein klinischer Schaden durch Hirnablagerungen ist bisher nicht belegt.',
        points: [
          ['Retention', 'Lineare Präparate zeigen eine stärkere Retention als makrozyklische Präparate. Unnötige Wiederholungen vermeiden.'],
          ['NSF', 'Die nephrogene systemische Fibrose ist vor allem mit älteren, weniger stabilen Präparaten bei schwerer Niereninsuffizienz verbunden.'],
          ['Risikoreduktion', 'Bei AKI oder eGFR unter 30 Indikation streng prüfen und ein Präparat mit sehr niedrigem NSF-Risiko wählen.'],
        ],
        takeHome: 'Retention und NSF sind nicht dasselbe: NSF ist eine seltene fibrosierende Erkrankung bei Hochrisikokonstellation.',
      },
      'km-niereninsuffizienz': {
        lead: 'Das Risiko hängt von Nierenfunktion, akutem Nierenschaden, Applikationsweg und klinischer Gesamtsituation ab.',
        points: [
          ['Screening', 'Aktuelle eGFR und Hinweise auf AKI bei Risikopatienten prüfen.'],
          ['Jod-KM', 'Bei AKI oder eGFR unter 30 Nutzen und Risiko individuell abwägen; Volumenstatus optimieren und unnötige Mehrfachgaben vermeiden.'],
          ['Gadolinium', 'Ein Präparat mit niedrigem NSF-Risiko wählen. Dialyse nicht allein wegen einer Kontrastmittelgabe neu beginnen.'],
        ],
        takeHome: 'Eine eingeschränkte Nierenfunktion ist keine automatische Kontraindikation, sondern verlangt eine begründete, dokumentierte Strategie.',
      },
      'km-schilddruese': {
        lead: 'Die Jodlast kann bei disponierten Patienten eine Hyperthyreose auslösen oder verschlechtern.',
        points: [
          ['Hohes Risiko', 'Manifeste Hyperthyreose und funktionelle Autonomie sind besonders relevant.'],
          ['Vorbereitung', 'Bei klinischem Verdacht TSH und gegebenenfalls weitere Schilddrüsenwerte vor elektiver Gabe prüfen.'],
          ['Nachsorge', 'Bei Hochrisikopatienten auf verzögerte Symptome achten; Jod-KM kann außerdem nuklearmedizinische Schilddrüsenuntersuchungen beeinflussen.'],
        ],
        takeHome: 'Bei manifester Hyperthyreose jodhaltiges KM möglichst vermeiden; im Notfall interdisziplinär entscheiden.',
      },
      'km-schwangerschaft-stillzeit': {
        lead: 'Kontrastmittel nur einsetzen, wenn die zusätzliche Information klinisch notwendig ist.',
        points: [
          ['Schwangerschaft', 'Jodhaltiges KM passiert die Plazenta. Gadolinium sollte nur bei kritischer Indikation gegeben werden.'],
          ['Neugeborenes', 'ESUR 2026 empfiehlt nach mütterlichem Jod-KM eine Schilddrüsenkontrolle in der ersten Lebenswoche; ACR 2026 hält das übliche Neugeborenen-TSH für ausreichend und empfiehlt keine Zusatzkontrolle.'],
          ['Stillzeit', 'ACR 2026: Stillen kann nach Jod- oder Gadolinium-KM weitergehen; bei Sorge ist eine freiwillige Pause von 12–24 h mit Abpumpen und Verwerfen möglich. ESUR 2026: normale Fortsetzung nach Jod-KM und makrozyklischem GBCA.'],
        ],
        takeHome: 'Bei neonataler Schilddrüsenkontrolle die unterschiedliche ACR-/ESUR-Empfehlung und lokale Abläufe kenntlich machen; notwendige Diagnostik nicht unangemessen verzögern.',
      },
    },
  },
  en: {
    title: 'Contrast media',
    subtitle: 'Safe use of X-ray and MRI contrast media in general and special-risk settings',
    intro: 'Contrast agents improve diagnostic information but require a clear indication, appropriate patient selection and prepared reaction management.',
    key: 'First ask whether contrast will change diagnosis or management. Then select the agent class, assess risk and use the lowest diagnostically adequate dose.',
    sections: {
      'km-ultraschall': {
        lead: 'Ultrasound contrast agents are gas-filled microbubbles. They enhance echoes from the blood pool and are mainly eliminated through the lungs.',
        points: [['Mechanism', 'Microbubbles strongly reflect ultrasound; at a low mechanical index they produce nonlinear and harmonic signals.'], ['Distribution', 'Intravenous microbubbles remain intravascular; they are not iodine- or gadolinium-based extracellular agents.'], ['Safety', 'Authorisation, contraindications and use depend on the product and route. The current product information is decisive.']],
        takeHome: 'CEUS is a distinct contrast-agent class: check the indication, authorisation and safety rules for the specific product and route.',
      },
      'km-jod-typen': { lead: 'Modern intravascular X-ray contrast agents are predominantly non-ionic and low- or iso-osmolar.', points: [['Principle', 'Iodine attenuates X-rays and increases density on CT, angiography and fluoroscopy.'], ['Properties', 'Osmolality, viscosity, iodine concentration and injection rate affect tolerability and enhancement.'], ['Practice', 'Agent, dose, flow rate, access and phase must match the clinical objective.']], takeHome: 'Non-ionic low-osmolar agents are the intravascular standard; warming can reduce high viscosity.' },
      'km-jod-reaktionen': { lead: 'Acute reactions are classified as allergic-like or physiologic and by severity.', points: [['Mild', 'Limited urticaria, itching, nausea or warmth: observe and treat symptoms.'], ['Moderate', 'Diffuse urticaria, bronchospasm or facial oedema require rapid clinical assessment and monitoring.'], ['Severe', 'For anaphylaxis: stop contrast, call for help, support airway/breathing/circulation and give intramuscular epinephrine according to the local emergency protocol.']], takeHome: 'A previous severe reaction is the strongest risk factor. Emergency equipment and trained staff must be available.' },
      'km-gastrointestinal': { lead: 'Enteric agents mark or distend the gastrointestinal tract.', points: [['Barium sulphate', 'Excellent fluoroscopic mucosal detail. Use iodinated contrast first when a leak is suspected. Small-volume aspiration can cause symptoms, especially with underlying lung disease; delayed clearance may leave material and contribute to inflammation. ESUR says small-volume aspiration is rarely life-threatening; large volumes can cause serious airway complications.'], ['Water-soluble iodine', 'Usually first for suspected leaks; for oral use, ESUR prefers non-ionic low-/iso-osmolar agents when suitable. Aspiration of hyperosmolar ionic diatrizoate can cause serious, though ESUR describes extremely rare, pulmonary complications.'], ['Neutral/negative', 'Water or dedicated solutions are used for CT or MR enterography.']], takeHome: 'Choose by the imaging question, suspected leak, aspiration risk and the specific iodine agent and osmolality.' },
      'km-gadolinium': { lead: 'Gadolinium mainly shortens T1 relaxation and is administered as a stable chelate.', points: [['Classes', 'Macrocyclic chelates are more stable than linear chelates and release less free gadolinium.'], ['Distribution', 'Most agents are extracellular; gadoxetate also has hepatobiliary uptake.'], ['Use', 'Use only for added diagnostic value and at the lowest dose that provides adequate enhancement.']], takeHome: 'Several linear intravenous agents are suspended or restricted in the EU; macrocyclic agents are preferred.' },
      'km-gadolinium-retention-nsf': { lead: 'Gadolinium can remain detectable in tissues after repeated doses; clinical harm from brain deposition has not been established.', points: [['Retention', 'Linear agents show more retention than macrocyclic agents. Avoid unnecessary repeat doses.'], ['NSF', 'Nephrogenic systemic fibrosis is mainly linked to older, less stable agents in severe renal impairment.'], ['Risk reduction', 'In AKI or eGFR below 30, confirm necessity and select a very-low-NSF-risk agent.']], takeHome: 'Retention and NSF are different: NSF is a rare fibrosing disease in a high-risk setting.' },
      'km-niereninsuffizienz': { lead: 'Risk depends on renal function, acute kidney injury, route of administration and the overall clinical setting.', points: [['Screening', 'Check current eGFR and signs of AKI in at-risk patients.'], ['Iodine', 'In AKI or eGFR below 30, assess benefit and risk individually, optimise volume status and avoid unnecessary repeat doses.'], ['Gadolinium', 'Choose a low-NSF-risk agent. Do not initiate dialysis solely because contrast was administered.']], takeHome: 'Renal impairment is not an automatic contraindication; it requires a justified and documented strategy.' },
      'km-schilddruese': { lead: 'The iodine load may trigger or worsen hyperthyroidism in susceptible patients.', points: [['High risk', 'Overt hyperthyroidism and thyroid autonomy are particularly relevant.'], ['Preparation', 'If clinically suspected, check TSH and additional thyroid tests before elective administration.'], ['Follow-up', 'Watch high-risk patients for delayed symptoms; iodine also interferes with nuclear thyroid imaging.']], takeHome: 'Avoid iodinated contrast in overt hyperthyroidism when possible; make emergency decisions collaboratively.' },
      'km-schwangerschaft-stillzeit': { lead: 'Use contrast only when the additional information is clinically necessary.', points: [['Pregnancy', 'Iodinated contrast crosses the placenta. Gadolinium should be reserved for critical indications.'], ['Newborn', 'After maternal iodinated contrast, ESUR 2026 recommends a neonatal thyroid check in the first week; ACR 2026 considers routine newborn TSH screening sufficient and recommends no additional test.'], ['Breastfeeding', 'ACR 2026 supports continuing after iodinated or gadolinium contrast; if concerned, the mother may choose a 12–24 h pause with expressing and discarding. ESUR 2026 supports normal continuation after iodinated contrast and macrocyclic GBCA.']], takeHome: 'State the differing ACR/ESUR neonatal thyroid advice and follow local practice; do not inappropriately delay necessary imaging.' },
    },
  },
  fa: {
    title: 'مواد حاجب',
    subtitle: 'کاربرد ایمن مواد حاجب اشعهٔ ایکس و MRI در شرایط عمومی و گروه‌های پرخطر',
    intro: 'مواد حاجب ارزش تشخیصی را افزایش می‌دهند، اما به اندیکاسیون روشن، انتخاب درست بیمار و آمادگی برای واکنش‌های حاد نیاز دارند.',
    key: 'ابتدا بپرسید آیا تزریق ماده حاجب تشخیص یا درمان را تغییر می‌دهد؛ سپس نوع ماده، خطر بیمار و کمترین دوز تشخیصی کافی را انتخاب کنید.',
    sections: {
      'km-ultraschall': {
        lead: 'مواد حاجب سونوگرافی میکروحباب‌های پر از گاز هستند. آن‌ها پژواک خون را تقویت می‌کنند و عمدتاً از راه ریه دفع می‌شوند.',
        points: [['سازوکار', 'میکروحباب‌ها صوت را به‌خوبی بازتاب می‌دهند؛ در شاخص مکانیکی پایین، سیگنال‌های غیرخطی و هارمونیک ایجاد می‌کنند.'], ['توزیع', 'میکروحباب‌های تزریق‌شده به‌صورت وریدی داخل عروق می‌مانند؛ مادهٔ حاجب خارج‌سلولیِ یددار یا گادولینیومی نیستند.'], ['ایمنی', 'مجوز، منع مصرف و روش استفاده به فرآورده و مسیر تجویز وابسته است. اطلاعات رسمی و به‌روز همان فرآورده ملاک است.']],
        takeHome: 'CEUS دسته‌ای جداگانه از مواد حاجب است: اندیکاسیون، مجوز و نکات ایمنی را برای فرآورده و مسیر مشخص بررسی کنید.',
      },
      'km-jod-typen': { lead: 'مواد حاجب عروقی مدرن عمدتاً غیر یونی و کم‌اسمولار یا ایزواسمولار هستند.', points: [['اصل', 'ید اشعه ایکس را جذب می‌کند و دانسیته را در CT، آنژیوگرافی و فلوروسکوپی افزایش می‌دهد.'], ['ویژگی‌ها', 'اسمولالیته، ویسکوزیته، غلظت ید و سرعت تزریق بر تحمل و تقویت پس از تزریق اثر دارند.'], ['کاربرد', 'نوع ماده، دوز، سرعت تزریق، مسیر و فاز باید با هدف بالینی هماهنگ باشد.']], takeHome: 'مواد غیر یونی کم‌اسمولار استاندارد عروقی هستند؛ گرم‌کردن می‌تواند ویسکوزیته را کاهش دهد.' },
      'km-jod-reaktionen': { lead: 'واکنش‌های حاد به نوع آلرژی‌مانند یا فیزیولوژیک و بر اساس شدت تقسیم می‌شوند.', points: [['خفیف', 'کهیر محدود، خارش، تهوع یا احساس گرما: مشاهده و درمان علامتی.'], ['متوسط', 'کهیر منتشر، برونکواسپاسم یا ادم صورت نیازمند ارزیابی سریع و مانیتورینگ است.'], ['شدید', 'در آنافیلاکسی تزریق را قطع کنید، کمک بخواهید، راه هوایی/تنفس/گردش را حمایت و آدرنالین عضلانی را طبق پروتکل محلی بدهید.']], takeHome: 'واکنش شدید قبلی مهم‌ترین عامل خطر است؛ تجهیزات اورژانس و پرسنل آموزش‌دیده باید آماده باشند.' },
      'km-gastrointestinal': { lead: 'مواد حاجب خوراکی یا رکتال لومن دستگاه گوارش را مشخص یا متسع می‌کنند.', points: [['باریم سولفات', 'نمایش مخاط در فلوروسکوپی بسیار خوب است. در شک به نشت، ابتدا مادهٔ یددار به‌کار می‌رود. آسپیراسیون مقدار کم می‌تواند علامت‌دار باشد، به‌ویژه در بیماری زمینه‌ای ریه؛ پاک‌سازی با تأخیر ممکن است ماده را باقی بگذارد و التهاب ایجاد کند. طبق ESUR، آسپیراسیون مقدار کم به‌ندرت تهدیدکنندهٔ حیات است؛ مقدار زیاد می‌تواند عوارض جدی راه هوایی داشته باشد.'], ['ید محلول در آب', 'در شک به نشت معمولاً انتخاب اولیه است؛ برای مصرف خوراکی، ESUR در صورت مناسب‌بودن مواد غیر‌یونی کم‌اسمولار/هم‌اسمولار را ترجیح می‌دهد. آسپیراسیون دیاتریزوات یونی پُراسمولار می‌تواند عوارض ریوی شدید، هرچند به‌گفتهٔ ESUR بسیار نادر، ایجاد کند.'], ['خنثی/منفی', 'آب یا محلول‌های ویژه برای CT یا MR انتروگرافی استفاده می‌شوند.']], takeHome: 'انتخاب را بر اساس سؤال تصویربرداری، شک به نشت، خطر آسپیراسیون و نوع و اسمولاریتهٔ مادهٔ یددار انجام دهید.' },
      'km-gadolinium': { lead: 'گادولینیوم عمدتاً زمان T1 را کوتاه می‌کند و به شکل کلات پایدار تزریق می‌شود.', points: [['کلاس‌ها', 'کلات‌های ماکروسیکلیک از خطی پایدارترند و گادولینیوم آزاد کمتری رها می‌کنند.'], ['توزیع', 'بیشتر مواد خارج‌سلولی‌اند؛ گادوکسیتات جذب کبدی-صفراوی نیز دارد.'], ['کاربرد', 'فقط در صورت ارزش تشخیصی افزوده و با کمترین دوز کافی استفاده شود.']], takeHome: 'چند ماده خطی وریدی در اروپا محدود یا تعلیق شده‌اند؛ مواد ماکروسیکلیک ترجیح دارند.' },
      'km-gadolinium-retention-nsf': { lead: 'پس از تزریق‌های مکرر، گادولینیوم ممکن است در بافت قابل اندازه‌گیری بماند؛ آسیب بالینی ناشی از رسوب مغزی ثابت نشده است.', points: [['احتباس', 'مواد خطی احتباس بیشتری از ماکروسیکلیک دارند؛ تزریق‌های غیرضروری تکرار نشوند.'], ['NSF', 'فیبروز سیستمیک نفروژنیک عمدتاً با مواد قدیمی و ناپایدار در نارسایی شدید کلیه مرتبط است.'], ['کاهش خطر', 'در AKI یا eGFR زیر ۳۰، ضرورت را تأیید و ماده با خطر بسیار پایین NSF انتخاب کنید.']], takeHome: 'احتباس و NSF یکسان نیستند؛ NSF بیماری فیبروزان نادر در شرایط پرخطر است.' },
      'km-niereninsuffizienz': { lead: 'خطر به عملکرد کلیه، AKI، مسیر تزریق و وضعیت کلی بیمار بستگی دارد.', points: [['غربالگری', 'در بیماران پرخطر eGFR به‌روز و نشانه‌های AKI را بررسی کنید.'], ['ید', 'در AKI یا eGFR زیر ۳۰ سود و خطر را فردی بسنجید، وضعیت حجم را بهینه و تزریق تکراری غیرضروری را حذف کنید.'], ['گادولینیوم', 'ماده با خطر پایین NSF انتخاب شود؛ دیالیز فقط به علت تزریق آغاز نشود.']], takeHome: 'نارسایی کلیه منع مطلق نیست؛ به راهبرد مستند و منطقی نیاز دارد.' },
      'km-schilddruese': { lead: 'بار ید می‌تواند در افراد مستعد پرکاری تیروئید ایجاد یا تشدید کند.', points: [['خطر بالا', 'پرکاری آشکار و اتونومی تیروئید مهم‌اند.'], ['آمادگی', 'در شک بالینی، پیش از تزریق الکتیو TSH و آزمایش‌های تکمیلی بررسی شوند.'], ['پیگیری', 'در افراد پرخطر به علائم دیررس توجه کنید؛ ید بر تصویربرداری هسته‌ای تیروئید نیز اثر دارد.']], takeHome: 'در پرکاری آشکار تا حد امکان از ماده یددار اجتناب شود؛ در اورژانس تصمیم مشترک بگیرید.' },
      'km-schwangerschaft-stillzeit': { lead: 'ماده حاجب فقط زمانی استفاده شود که اطلاعات اضافی از نظر بالینی ضروری باشد.', points: [['بارداری', 'ماده یددار از جفت عبور می‌کند؛ گادولینیوم را به اندیکاسیون‌های حیاتی محدود کنید.'], ['نوزاد', 'پس از تزریق ید به مادر، ESUR 2026 بررسی تیروئید نوزاد را در هفتهٔ اول توصیه می‌کند؛ ACR 2026 غربالگری معمول TSH نوزاد را کافی می‌داند و آزمایش اضافه توصیه نمی‌کند.'], ['شیردهی', 'ACR 2026 ادامهٔ شیردهی پس از ید یا گادولینیوم را می‌پذیرد؛ در صورت نگرانی مادر، مکث اختیاری ۱۲ تا ۲۴ ساعته همراه با دوشیدن و دورریختن شیر ممکن است. ESUR 2026 ادامهٔ معمول را پس از مادهٔ یددار و گادولینیوم ماکروسیکلیک می‌پذیرد.']], takeHome: 'تفاوت توصیهٔ ACR و ESUR دربارهٔ تیروئید نوزاد را روشن کنید و رویهٔ محلی را دنبال کنید؛ تصویربرداری ضروری را بی‌دلیل به تأخیر نیندازید.' },
    },
  },
}

const QUESTION_SEEDS = {
  'km-ultraschall': [
    ['Wo verbleiben intravenös verabreichte Ultraschall-Mikrobläschen?', 'Im Gefäßraum', ['Im Interstitium', 'Im Gefäßraum', 'Im Gallengang', 'Im Knochenmark'], 'B'],
    ['Welche Aussage zur Zulassung von SonoVue in der EU trifft zu?', 'CEUS-Anwendungen außerhalb der Fachinformation können off-label sein', ['Alle CEUS-Anwendungen sind zugelassen', 'Nierenzysten sind immer zugelassen', 'CEUS-Anwendungen außerhalb der Fachinformation können off-label sein', 'Eine Kontrastmittelgabe ist auch bei eindeutiger nativer Untersuchung erforderlich'], 'C'],
    ['Was hilft bei niedrigem MI, das CEUS-Signal von Mikrobläschen gegenüber Gewebe hervorzuheben?', 'Nichtlineare Bläschenschwingungen erzeugen harmonische Anteile; kontrastspezifische Modi unterdrücken Gewebesignale', ['Gewebe erzeugt grundsätzlich stärkere harmonische Signale als Mikrobläschen', 'Nichtlineare Bläschenschwingungen erzeugen harmonische Anteile; kontrastspezifische Modi unterdrücken Gewebesignale', 'Ein hoher MI verhindert die Zerstörung aller Mikrobläschen', 'Mikrobläschen verlassen vor der Bildgebung den Gefäßraum'], 'B'],
  ],
  'km-jod-typen': [
    ['Welche Eigenschaft entspricht modernen intravaskulären CT-Kontrastmitteln?', 'Nicht-ionisch und niedrig- oder isoosmolar', ['Nur ionisch und hochosmolar', 'Nicht-ionisch und niedrig- oder isoosmolar', 'Immer oral verabreicht', 'Ohne Jod'], 'B'],
    ['Welche Maßnahme kann die Viskosität jodhaltiger KM reduzieren?', 'Erwärmen auf Körpertemperatur', ['Abkühlen', 'Erwärmen auf Körpertemperatur', 'Verdünnen mit Luft', 'Einfrieren'], 'B'],
    ['Wie werden Jodkonzentration, Volumen und Flussrate für eine CT-Injektion gewählt?', 'Individuell nach Untersuchungsziel, Scanzeit, Patient, Zugang und lokalem Protokoll', ['Immer nach einem festen Standardwert', 'Individuell nach Untersuchungsziel, Scanzeit, Patient, Zugang und lokalem Protokoll', 'Nur nach dem Körpergewicht', 'Unabhängig von Zugang und Injektor'], 'B'],
  ],
  'km-jod-reaktionen': [
    ['Was ist bei schwerer anaphylaktischer KM-Reaktion das wichtigste Medikament?', 'Intramuskuläres Adrenalin', ['Orales Antihistaminikum', 'Intramuskuläres Adrenalin', 'Metformin', 'Bariumsulfat'], 'B'],
    ['Welche Anamneseangabe ist ein wichtiger Risikofaktor für eine erneute allergieartige KM-Reaktion?', 'Eine frühere allergieartige oder unklare Reaktion auf dieselbe KM-Klasse', ['Alter unter 30', 'Eine frühere allergieartige oder unklare Reaktion auf dieselbe KM-Klasse', 'Normale Nierenfunktion', 'Nüchternheit'], 'B'],
    ['Welche Aussage unterscheidet physiologische und allergieartige KM-Reaktionen korrekt?', 'Physiologische Reaktionen sind vorhersehbar; Hypersensitivität kann IgE- oder nicht-IgE-vermittelt sein.', ['Beide Reaktionstypen sind immer IgE-vermittelt.', 'Physiologische Reaktionen sind vorhersehbar; Hypersensitivität kann IgE- oder nicht-IgE-vermittelt sein.', 'Jede Hypersensitivitätsreaktion wird durch das Jodatom ausgelöst.', 'Physiologische Reaktionen sind grundsätzlich lebensbedrohlich.'], 'B'],
    ['Bei früherer schwerer unmittelbarer HSR und keiner akzeptablen Untersuchungsalternative: Was empfiehlt der ACR/AAAAI-Konsens 2025?', 'Wenn möglich Mittel wechseln, prämedizieren und im Krankenhaus mit Rapid-Response-Team untersuchen.', ['Das Auslösermittel ambulant mit einem Antihistaminikum allein erneut geben.', 'Wenn möglich Mittel wechseln, prämedizieren und im Krankenhaus mit Rapid-Response-Team untersuchen.', 'Prämedikation schließt eine erneute Reaktion aus; ein Wechsel ist unnötig.', 'Jodhaltiges KM ist auch bei fehlender Alternative dauerhaft absolut kontraindiziert.'], 'B'],
  ],
  'km-gastrointestinal': [
    ['Welches enterale KM ist bei vermuteter Perforation problematisch?', 'Bariumsulfat', ['Wasser', 'Bariumsulfat', 'Luft', 'Neutrale Lösung'], 'B'],
    ['Wovor warnt die Fachinformation bei Aspiration von Gastrografin®?', 'Lungenödem oder Pneumonitis; Tod ist möglich', ['NSF', 'Lungenödem oder Pneumonitis; Tod ist möglich', 'Hyperthyreose innerhalb Minuten', 'Gadolinium-Retention'], 'B'],
  ],
  'km-gadolinium': [
    ['Welche Gadolinium-Chelate sind stabiler?', 'Makrozyklische', ['Lineare', 'Makrozyklische', 'Ionische Jod-KM', 'Bariumsalze'], 'B'],
    ['Welches MRT-KM besitzt hepatobiliäre Aufnahme?', 'Gadoxetsäure', ['Gadodiamid', 'Gadoxetsäure', 'Bariumsulfat', 'Schwefelhexafluorid'], 'B'],
    ['Welche Aussage zur NSF-Risikoklassifikation von Gadoxetat und Gadobenat ist korrekt?', 'Beide sind linear; ACR 2026 führt sie in Gruppe II, ESUR 2026 stuft sie als intermediäres Risiko ein.', ['Jedes lineare GBCA gehört automatisch zur höchsten NSF-Risikogruppe.', 'Beide sind linear; ACR 2026 führt sie in Gruppe II, ESUR 2026 stuft sie als intermediäres Risiko ein.', 'ACR 2026 führt beide in Gruppe I und ESUR als niedrigstes Risiko.', 'Beide sind makrozyklisch und haben bei allen Leitlinien dieselbe Risikoklasse.'], 'B'],
  ],
  'km-gadolinium-retention-nsf': [
    ['Welche Konstellation ist klassisch mit NSF verbunden?', 'Schwere Niereninsuffizienz plus weniger stabiles GBCA', ['Normale Nierenfunktion plus USKM', 'Schwere Niereninsuffizienz plus weniger stabiles GBCA', 'Hyperthyreose plus Jod-KM', 'Stillzeit plus CT'], 'B'],
    ['Welche Aussage zur Gadolinium-Retention ist korrekt?', 'Retention ist nachweisbar, ein klinischer Hirnschaden aber nicht belegt', ['Sie tritt nur bei Niereninsuffizienz auf', 'Retention ist nachweisbar, ein klinischer Hirnschaden aber nicht belegt', 'Makrozyklische Präparate retinieren immer mehr', 'Sie ist identisch mit NSF'], 'B'],
    ['Welche Struktur zeigen die Pfeile im nativen T1-Panel der Technik-PDF?', 'Nucleus dentatus', ['Globus pallidus', 'Nucleus dentatus', 'Putamen', 'Capsula interna'], 'B'],
  ],
  'km-buscopan': [
    ['Welche Buscopan-Kontraindikation ist in der Fachinformation ausdrücklich genannt?', 'Engwinkelglaukom', ['Offenwinkelglaukom ohne weitere Befunde', 'Engwinkelglaukom', 'Kurzsichtigkeit', 'Trockene Augen'], 'B'],
    ['Welche Aussage zur Prostatahyperplasie unter Buscopan trifft laut Fachinformation zu?', 'Kontraindiziert bei Harnverhaltung durch subvesikale Obstruktion, zum Beispiel Prostataadenom', ['Jede Prostatahyperplasie ist ausnahmslos kontraindiziert', 'Nur bei gleichzeitiger Kurzsichtigkeit kontraindiziert', 'Kontraindiziert bei Harnverhaltung durch subvesikale Obstruktion, zum Beispiel Prostataadenom', 'Sie ist kein relevanter Sicherheitsaspekt'], 'C'],
  ],
  'km-niereninsuffizienz': [
    ['Ab welcher eGFR ist eine besonders sorgfältige Nutzen-Risiko-Abwägung üblich?', 'Unter 30 ml/min/1,73 m²', ['Unter 120', 'Unter 90', 'Unter 60 bei jedem Patienten', 'Unter 30 ml/min/1,73 m²'], 'D'],
    ['Welche Aussage zur Dialyse nach GBCA ist korrekt?', 'Eine neue Dialyse wird nicht routinemäßig allein wegen GBCA begonnen; bei bestehender Hämodialyse unterscheiden Empfehlungen nach Mitteltyp und Leitlinie.', ['Nach jedem GBCA sofort HD beginnen, auch ohne bestehende Dialyse.', 'Eine neue Dialyse wird nicht routinemäßig allein wegen GBCA begonnen; bei bestehender Hämodialyse unterscheiden Empfehlungen nach Mitteltyp und Leitlinie.', 'Dialyse verhindert NSF sicher, unabhängig vom Mittel.', 'Makrozyklische GBCA erfordern immer drei zusätzliche HD-Sitzungen.'], 'B'],
    ['Welche Aussage unterscheidet die ESUR- und ACR-Empfehlung zu Metformin korrekt?', 'ESUR unterbricht Metformin bei jeder intraarteriellen First-Pass-Gabe; ACR nennt AKI, eGFR <30 oder arterielle Katheterstudien mit möglicher Nierenarterien-Embolisation.', ['Beide empfehlen eine Pause bei jeder i.v. Gabe und eGFR 30–60.', 'ESUR unterbricht Metformin bei jeder intraarteriellen First-Pass-Gabe; ACR nennt AKI, eGFR <30 oder arterielle Katheterstudien mit möglicher Nierenarterien-Embolisation.', 'ACR empfiehlt, Metformin nach jeder KM-Gabe dauerhaft abzusetzen.', 'ESUR unterbricht nur bei eGFR <45, unabhängig von Applikationsweg oder AKI.'], 'B'],
  ],
  'km-schilddruese': [
    ['Welche Schilddrüsensituation ist für jodhaltiges KM besonders relevant?', 'Manifeste Hyperthyreose', ['Behandelte Hypothyreose', 'Manifeste Hyperthyreose', 'Normales TSH', 'Zustand nach Appendektomie'], 'B'],
    ['Was kann jodhaltiges KM nachfolgend beeinflussen?', 'Nuklearmedizinische Schilddrüsendiagnostik', ['Knie-MRT', 'Nuklearmedizinische Schilddrüsendiagnostik', 'Lungenfunktion dauerhaft', 'Knochendichte'], 'B'],
    ['Welche Aussage bildet den Unterschied zwischen ESUR und ACR bei Hyperthyreose am besten ab?', 'ESUR rät bei manifester Hyperthyreose ab; ACR empfiehlt keine pauschale Einschränkung allein wegen der Anamnese, vermeidet aber KM bei akutem thyroid storm.', ['Beide erklären jede frühere Hyperthyreose zur absoluten Kontraindikation.', 'ESUR rät bei manifester Hyperthyreose ab; ACR empfiehlt keine pauschale Einschränkung allein wegen der Anamnese, vermeidet aber KM bei akutem thyroid storm.', 'Beide schreiben Perchlorat für 7–10 Tage bei allen Risikopatienten vor.', 'Nur eine normale TSH-Konzentration erlaubt jodhaltiges KM.'], 'B'],
  ],
  'km-schwangerschaft-stillzeit': [
    ['Welche Aussage zur Stillzeit nach intravaskulärem KM ist korrekt?', 'Eine Stillpause ist normalerweise nicht erforderlich; bei Sorge ist nach ACR eine freiwillige Pause von 12–24 Stunden möglich.', ['Immer 48 Stunden pausieren', 'Eine Stillpause ist normalerweise nicht erforderlich; bei Sorge ist nach ACR eine freiwillige Pause von 12–24 Stunden möglich.', 'Nur nach USKM abstillen', 'Nach jedem KM muss die Milch eine Woche verworfen werden.'], 'B'],
    ['Wann sollte Gadolinium in der Schwangerschaft eingesetzt werden?', 'Nur wenn der erwartete klinische Nutzen das unbekannte Risiko überwiegt; dann nach ACR niedrigste diagnostisch ausreichende Dosis eines Präparats mit niedrigem NSF-Risiko, nach ESUR makrozyklisch und kleinstmöglich dosiert.', ['Bei jeder MRT, unabhängig vom Einfluss auf die Versorgung', 'Nur wenn der erwartete klinische Nutzen das unbekannte Risiko überwiegt; dann nach ACR niedrigste diagnostisch ausreichende Dosis eines Präparats mit niedrigem NSF-Risiko, nach ESUR makrozyklisch und kleinstmöglich dosiert.', 'Zur Routinevorsorge ohne klinische Konsequenz', 'Nie, auch bei zeitkritischer essenzieller Information'], 'B'],
    ['Welche Empfehlung zur neonatalen Schilddrüsenkontrolle nach mütterlichem Jod-KM ist richtig zugeordnet?', 'ESUR 2026: Kontrolle in der ersten Lebenswoche; ACR 2026: routinemäßiges Neugeborenen-TSH genügt, keine Zusatzkontrolle.', ['ESUR 2026: keine Kontrolle; ACR 2026: obligatorische Zusatzkontrolle in der ersten Woche.', 'ESUR 2026: Kontrolle in der ersten Lebenswoche; ACR 2026: routinemäßiges Neugeborenen-TSH genügt, keine Zusatzkontrolle.', 'Beide verlangen eine zusätzliche Kontrolle genau nach 24 Stunden.', 'Beide lehnen das routinemäßige Neugeborenen-Screening ab.'], 'B'],
  ],
}

const translateQuestion = (seed, lang) => {
  const revision = contrastRevisionForSeed(seed, QUESTION_SEEDS)
  if (revision) {
    const options = revision.options.map(option => option[lang])
    return [revision.question[lang], options['ABCD'.indexOf(revision.correct)], options, revision.correct]
  }
  if (lang === 'de') return seed
  const translations = {
    en: {
      'Wo verbleiben intravenös verabreichte Ultraschall-Mikrobläschen?': ['Where do intravenously administered ultrasound microbubbles remain?', 'In the vascular space', ['In the interstitium', 'In the vascular space', 'In the bile duct', 'In bone marrow']],
      'Welche Aussage zur Zulassung von SonoVue in der EU trifft zu?': ['Which statement about SonoVue authorisation in the EU is correct?', 'CEUS uses outside the product information may be off-label', ['All CEUS uses are authorised', 'Renal cyst assessment is always authorised', 'CEUS uses outside the product information may be off-label', 'Contrast is required even when unenhanced imaging is conclusive']],
      'Was hilft bei niedrigem MI, das CEUS-Signal von Mikrobläschen gegenüber Gewebe hervorzuheben?': ['At low MI, what helps distinguish the CEUS microbubble signal from tissue?', 'Nonlinear bubble oscillations generate harmonic components; contrast-specific modes suppress tissue signals', ['Tissue always generates stronger harmonic signals than microbubbles', 'Nonlinear bubble oscillations generate harmonic components; contrast-specific modes suppress tissue signals', 'A high MI prevents all microbubble destruction', 'Microbubbles leave the vascular space before imaging']],
      'Welche Eigenschaft entspricht modernen intravaskulären CT-Kontrastmitteln?': ['Which property describes modern intravascular CT contrast agents?', 'Non-ionic and low- or iso-osmolar', ['Ionic and high-osmolar only', 'Non-ionic and low- or iso-osmolar', 'Always administered orally', 'Iodine-free']],
      'Welche Maßnahme kann die Viskosität jodhaltiger KM reduzieren?': ['Which measure can reduce iodinated contrast viscosity?', 'Warming to body temperature', ['Cooling', 'Warming to body temperature', 'Diluting with air', 'Freezing']],
      'Wie werden Jodkonzentration, Volumen und Flussrate für eine CT-Injektion gewählt?': ['How should iodine concentration, volume and flow rate be selected for a CT injection?', 'Individually, according to the examination goal, scan duration, patient, access and local protocol', ['Always by one fixed standard value', 'Individually, according to the examination goal, scan duration, patient, access and local protocol', 'Only according to body weight', 'Regardless of access and injector']],
      'Was ist bei schwerer anaphylaktischer KM-Reaktion das wichtigste Medikament?': ['What is the key medication in a severe anaphylactic contrast reaction?', 'Intramuscular epinephrine', ['Oral antihistamine', 'Intramuscular epinephrine', 'Metformin', 'Barium sulphate']],
      'Welche Anamneseangabe ist ein wichtiger Risikofaktor für eine erneute allergieartige KM-Reaktion?': ['Which history is an important risk factor for another allergic-like contrast reaction?', 'A previous allergic-like or unknown-type reaction to the same contrast class', ['Age below 30', 'A previous allergic-like or unknown-type reaction to the same contrast class', 'Normal renal function', 'Fasting']],
      'Welche Aussage unterscheidet physiologische und allergieartige KM-Reaktionen korrekt?': ['Which statement correctly distinguishes physiologic from allergic-like contrast reactions?', 'Physiologic reactions are predictable; hypersensitivity can be IgE-mediated or non-IgE-mediated.', ['Both reaction types are always IgE-mediated.', 'Physiologic reactions are predictable; hypersensitivity can be IgE-mediated or non-IgE-mediated.', 'Every hypersensitivity reaction is triggered by the iodine atom.', 'Physiologic reactions are always life-threatening.']],
      'Bei früherer schwerer unmittelbarer HSR und keiner akzeptablen Untersuchungsalternative: Was empfiehlt der ACR/AAAAI-Konsens 2025?': ['After a previous severe immediate HSR with no acceptable alternative examination, what does the 2025 ACR/AAAAI consensus recommend?', 'If feasible, switch agents, premedicate, and perform the examination in hospital with a rapid-response team.', ['Repeat the culprit agent as an outpatient with antihistamine alone.', 'If feasible, switch agents, premedicate, and perform the examination in hospital with a rapid-response team.', 'Premedication rules out another reaction, so switching is unnecessary.', 'Iodinated contrast is permanently and absolutely contraindicated even when no alternative exists.']],
      'Welches enterale KM ist bei vermuteter Perforation problematisch?': ['Which enteric agent is problematic when perforation is suspected?', 'Barium sulphate', ['Water', 'Barium sulphate', 'Air', 'Neutral solution']],
      'Wovor warnt die Fachinformation bei Aspiration von Gastrografin®?': ['What does the product information warn may occur if Gastrografin® is aspirated?', 'Pulmonary oedema or pneumonitis; death is possible', ['NSF', 'Pulmonary oedema or pneumonitis; death is possible', 'Hyperthyroidism within minutes', 'Gadolinium retention']],
      'Welche Gadolinium-Chelate sind stabiler?': ['Which gadolinium chelates are more stable?', 'Macrocyclic agents', ['Linear agents', 'Macrocyclic agents', 'Ionic iodine agents', 'Barium salts']],
      'Welches MRT-KM besitzt hepatobiliäre Aufnahme?': ['Which MRI agent has hepatobiliary uptake?', 'Gadoxetate', ['Gadodiamide', 'Gadoxetate', 'Barium sulphate', 'Sulphur hexafluoride']],
      'Welche Aussage zur NSF-Risikoklassifikation von Gadoxetat und Gadobenat ist korrekt?': ['Which statement about the NSF risk classification of gadoxetate and gadobenate is correct?', 'Both are linear; ACR 2026 lists them in Group II, while ESUR 2026 classifies them as intermediate risk.', ['Every linear GBCA automatically belongs to the highest NSF risk group.', 'Both are linear; ACR 2026 lists them in Group II, while ESUR 2026 classifies them as intermediate risk.', 'ACR 2026 lists both in Group I and ESUR in the lowest-risk group.', 'Both are macrocyclic and have the same risk class in every guideline.']],
      'Welche Konstellation ist klassisch mit NSF verbunden?': ['Which setting is classically associated with NSF?', 'Severe renal impairment plus a less stable GBCA', ['Normal kidneys plus UCA', 'Severe renal impairment plus a less stable GBCA', 'Hyperthyroidism plus iodine', 'Breastfeeding plus CT']],
      'Welche Aussage zur Gadolinium-Retention ist korrekt?': ['Which statement about gadolinium retention is correct?', 'Retention is detectable, but clinical brain harm has not been established', ['It occurs only in renal impairment', 'Retention is detectable, but clinical brain harm has not been established', 'Macrocyclic agents always retain more', 'It is identical to NSF']],
      'Welche Struktur zeigen die Pfeile im nativen T1-Panel der Technik-PDF?': ['Which structure is indicated by the arrows in the native T1 panel of the technology PDF?', 'Dentate nucleus', ['Globus pallidus', 'Dentate nucleus', 'Putamen', 'Internal capsule']],
      'Welche Buscopan-Kontraindikation ist in der Fachinformation ausdrücklich genannt?': ['Which Buscopan contraindication is explicitly listed in the product information?', 'Narrow-angle glaucoma', ['Open-angle glaucoma without other findings', 'Narrow-angle glaucoma', 'Short-sightedness', 'Dry eyes']],
      'Welche Aussage zur Prostatahyperplasie unter Buscopan trifft laut Fachinformation zu?': ['According to the product information, which statement about prostatic hyperplasia with Buscopan is correct?', 'Contraindicated with urinary retention due to subvesical obstruction, for example prostatic adenoma', ['Every case of prostatic hyperplasia is unconditionally contraindicated', 'Only contraindicated with concurrent short-sightedness', 'Contraindicated with urinary retention due to subvesical obstruction, for example prostatic adenoma', 'It is not a relevant safety consideration']],
      'Wo verbleiben diagnostische Ultraschall-Mikrobläschen?': ['Where do diagnostic ultrasound microbubbles remain?', 'Intravascularly', ['Intracellularly', 'Intravascularly', 'Only in bile ducts', 'In bone marrow']],
      'Wie wird der Gasanteil von USKM überwiegend eliminiert?': ['How is the gas component of UCA mainly eliminated?', 'Through the lungs', ['Through the kidneys', 'Through the lungs', 'Through the thyroid', 'Through the skin']],
      'Ab welcher eGFR ist eine besonders sorgfältige Nutzen-Risiko-Abwägung üblich?': ['At which eGFR is especially careful benefit-risk assessment customary?', 'Below 30 ml/min/1.73 m²', ['Below 120', 'Below 90', 'Below 60 in every patient', 'Below 30 ml/min/1.73 m²']],
      'Welche Aussage zur Dialyse nach GBCA ist korrekt?': ['Which statement about dialysis after a GBCA is correct?', 'Do not routinely start dialysis solely for a GBCA; recommendations for patients already on haemodialysis vary by agent type and guideline.', ['Start immediate haemodialysis after every GBCA, even if the patient is not on dialysis.', 'Do not routinely start dialysis solely for a GBCA; recommendations for patients already on haemodialysis vary by agent type and guideline.', 'Dialysis reliably prevents NSF, regardless of agent.', 'Macrocyclic GBCAs always require three extra haemodialysis sessions.']],
      'Welche Aussage unterscheidet die ESUR- und ACR-Empfehlung zu Metformin korrekt?': ['Which statement correctly distinguishes ESUR and ACR metformin recommendations?', 'ESUR withholds metformin for any intra-arterial first-pass administration; ACR specifies AKI, eGFR <30, or arterial catheter studies that could embolise the renal arteries.', ['Both recommend withholding it for every IV study at eGFR 30–60.', 'ESUR withholds metformin for any intra-arterial first-pass administration; ACR specifies AKI, eGFR <30, or arterial catheter studies that could embolise the renal arteries.', 'ACR recommends permanently stopping metformin after any contrast administration.', 'ESUR withholds it only below eGFR 45, regardless of route or AKI.']],
      'Welche Schilddrüsensituation ist für jodhaltiges KM besonders relevant?': ['Which thyroid condition is particularly relevant for iodinated contrast?', 'Overt hyperthyroidism', ['Treated hypothyroidism', 'Overt hyperthyroidism', 'Normal TSH', 'Previous appendectomy']],
      'Was kann jodhaltiges KM nachfolgend beeinflussen?': ['What can iodinated contrast subsequently interfere with?', 'Nuclear thyroid imaging', ['Knee MRI', 'Nuclear thyroid imaging', 'Lung function permanently', 'Bone density']],
      'Welche Aussage bildet den Unterschied zwischen ESUR und ACR bei Hyperthyreose am besten ab?': ['Which statement best reflects the difference between ESUR and ACR on hyperthyroidism?', 'ESUR advises against contrast in overt hyperthyroidism; ACR does not recommend blanket restriction based on history alone, but avoids contrast in acute thyroid storm.', ['Both make any past hyperthyroidism an absolute contraindication.', 'ESUR advises against contrast in overt hyperthyroidism; ACR does not recommend blanket restriction based on history alone, but avoids contrast in acute thyroid storm.', 'Both require perchlorate for 7–10 days in every at-risk patient.', 'Iodinated contrast is allowed only when TSH is normal.']],
      'Welche Aussage zur Stillzeit nach intravaskulärem KM ist korrekt?': ['Which statement about breastfeeding after intravascular contrast is correct?', 'Routine interruption is not required; if concerned, ACR allows an optional 12–24-hour pause.', ['Always pause for 48 hours', 'Routine interruption is not required; if concerned, ACR allows an optional 12–24-hour pause.', 'Stop only after UCA', 'Discard milk for a week after every agent']],
      'Wann sollte Gadolinium in der Schwangerschaft eingesetzt werden?': ['When should gadolinium be used in pregnancy?', 'Only when expected clinical benefit outweighs unknown risk; use the lowest dose and agent specified by the guideline.', ['For every MRI, regardless of effect on care', 'Only when expected clinical benefit outweighs unknown risk; use the lowest dose and agent specified by the guideline.', 'For routine screening without clinical consequence', 'Never, even for essential time-critical information']],
      'Welche Empfehlung zur neonatalen Schilddrüsenkontrolle nach mütterlichem Jod-KM ist richtig zugeordnet?': ['Which neonatal thyroid-check recommendation after maternal iodine contrast is correctly attributed?', 'ESUR 2026: check in the first week; ACR 2026: routine newborn TSH screening is sufficient, with no additional test.', ['ESUR 2026: no check; ACR 2026: mandatory additional check in the first week.', 'ESUR 2026: check in the first week; ACR 2026: routine newborn TSH screening is sufficient, with no additional test.', 'Both require an additional test exactly 24 hours later.', 'Both reject routine newborn screening.']],
    },
    fa: {
      'Wo verbleiben intravenös verabreichte Ultraschall-Mikrobläschen?': ['میکروحباب‌های وریدی سونوگرافی کجا می‌مانند؟', 'در فضای عروقی', ['در فضای بینابینی', 'در فضای عروقی', 'در مجرای صفراوی', 'در مغز استخوان']],
      'Welche Aussage zur Zulassung von SonoVue in der EU trifft zu?': ['کدام عبارت درباره مجوز SonoVue در اتحادیه اروپا درست است؟', 'کاربرد CEUS خارج از اطلاعات رسمی فرآورده ممکن است off-label باشد', ['همه کاربردهای CEUS مجازند', 'بررسی کیست کلیه همیشه مجاز است', 'کاربرد CEUS خارج از اطلاعات رسمی فرآورده ممکن است off-label باشد', 'حتی با تشخیص قطعی در سونوگرافی بدون کنتراست هم باید ماده حاجب داد']],
      'Was hilft bei niedrigem MI, das CEUS-Signal von Mikrobläschen gegenüber Gewebe hervorzuheben?': ['در MI پایین، چه چیزی به برجسته‌شدن سیگنال میکروحباب‌ها نسبت به بافت کمک می‌کند؟', 'نوسان غیرخطی حباب مؤلفه‌های هارمونیک می‌سازد و حالت‌های اختصاصی کنتراست سیگنال بافت را سرکوب می‌کنند', ['بافت همیشه سیگنال هارمونیک قوی‌تری از میکروحباب می‌سازد', 'نوسان غیرخطی حباب مؤلفه‌های هارمونیک می‌سازد و حالت‌های اختصاصی کنتراست سیگنال بافت را سرکوب می‌کنند', 'MI بالا از تخریب همهٔ میکروحباب‌ها جلوگیری می‌کند', 'میکروحباب‌ها پیش از تصویربرداری از فضای عروقی خارج می‌شوند']],
      'Welche Eigenschaft entspricht modernen intravaskulären CT-Kontrastmitteln?': ['کدام ویژگی مربوط به مواد حاجب عروقی مدرن CT است؟', 'غیر یونی و کم‌اسمولار یا ایزواسمولار', ['فقط یونی و پُراسمولار', 'غیر یونی و کم‌اسمولار یا ایزواسمولار', 'همیشه خوراکی', 'بدون ید']],
      'Welche Maßnahme kann die Viskosität jodhaltiger KM reduzieren?': ['کدام اقدام ویسکوزیته ماده حاجب یددار را کاهش می‌دهد؟', 'گرم‌کردن تا دمای بدن', ['سردکردن', 'گرم‌کردن تا دمای بدن', 'رقیق‌کردن با هوا', 'منجمدکردن']],
      'Wie werden Jodkonzentration, Volumen und Flussrate für eine CT-Injektion gewählt?': ['غلظت ید، حجم و سرعت تزریق CT چگونه انتخاب می‌شوند؟', 'بر اساس هدف بررسی، زمان اسکن، بیمار، مسیر تزریق و پروتکل محلی به‌طور فردی', ['همیشه بر اساس یک عدد ثابت', 'بر اساس هدف بررسی، زمان اسکن، بیمار، مسیر تزریق و پروتکل محلی به‌طور فردی', 'فقط بر اساس وزن بدن', 'بدون توجه به مسیر تزریق یا انژکتور']],
      'Was ist bei schwerer anaphylaktischer KM-Reaktion das wichtigste Medikament?': ['مهم‌ترین دارو در واکنش آنافیلاکسی شدید چیست؟', 'آدرنالین عضلانی', ['آنتی‌هیستامین خوراکی', 'آدرنالین عضلانی', 'متفورمین', 'باریم']],
      'Welche Anamneseangabe ist ein wichtiger Risikofaktor für eine erneute allergieartige KM-Reaktion?': ['کدام سابقه عامل خطر مهمی برای تکرار واکنش شبه‌آلرژیک به مادهٔ حاجب است؟', 'سابقهٔ واکنش شبه‌آلرژیک یا نامشخص به همان گروه مادهٔ حاجب', ['سن زیر ۳۰', 'سابقهٔ واکنش شبه‌آلرژیک یا نامشخص به همان گروه مادهٔ حاجب', 'عملکرد طبیعی کلیه', 'ناشتایی']],
      'Welche Aussage unterscheidet physiologische und allergieartige KM-Reaktionen korrekt?': ['کدام عبارت تفاوت واکنش فیزیولوژیک و شبه‌آلرژیک به مادهٔ حاجب را درست بیان می‌کند؟', 'واکنش فیزیولوژیک قابل‌پیش‌بینی است؛ حساسیت می‌تواند با یا بدون واسطه‌گری IgE رخ دهد.', ['هر دو نوع واکنش همیشه با واسطه‌گری IgE رخ می‌دهند.', 'واکنش فیزیولوژیک قابل‌پیش‌بینی است؛ حساسیت می‌تواند با یا بدون واسطه‌گری IgE رخ دهد.', 'هر واکنش حساسیتی به‌وسیلهٔ اتم ید ایجاد می‌شود.', 'واکنش‌های فیزیولوژیک همیشه تهدیدکنندهٔ حیات هستند.']],
      'Bei früherer schwerer unmittelbarer HSR und keiner akzeptablen Untersuchungsalternative: Was empfiehlt der ACR/AAAAI-Konsens 2025?': ['در سابقهٔ واکنش حساسیتی فوریِ شدید و نبود روش جایگزین پذیرفتنی، اجماع ACR/AAAAI در ۲۰۲۵ چه توصیه می‌کند؟', 'در صورت امکان ماده را عوض کنید، پیش‌دارودرمانی دهید و بررسی را در بیمارستان با تیم پاسخ سریع انجام دهید.', ['مادهٔ عامل را فقط با آنتی‌هیستامین و به‌صورت سرپایی دوباره تزریق کنید.', 'در صورت امکان ماده را عوض کنید، پیش‌دارودرمانی دهید و بررسی را در بیمارستان با تیم پاسخ سریع انجام دهید.', 'پیش‌دارودرمانی واکنش دوباره را منتفی می‌کند؛ تعویض ماده لازم نیست.', 'مادهٔ یددار حتی در نبود جایگزین، برای همیشه و به‌طور مطلق ممنوع است.']],
      'Welches enterale KM ist bei vermuteter Perforation problematisch?': ['در شک به پرفوراسیون کدام ماده گوارشی مشکل‌ساز است؟', 'باریم سولفات', ['آب', 'باریم سولفات', 'هوا', 'محلول خنثی']],
      'Wovor warnt die Fachinformation bei Aspiration von Gastrografin®?': ['اطلاعات دارویی در صورت آسپیراسیون Gastrografin® دربارهٔ چه عارضه‌ای هشدار می‌دهد؟', 'ادم ریه یا پنومونیت؛ مرگ نیز ممکن است', ['NSF', 'ادم ریه یا پنومونیت؛ مرگ نیز ممکن است', 'پرکاری تیروئید فوری', 'احتباس گادولینیوم']],
      'Welche Gadolinium-Chelate sind stabiler?': ['کدام کلات‌های گادولینیوم پایدارترند؟', 'ماکروسیکلیک', ['خطی', 'ماکروسیکلیک', 'مواد یددار یونی', 'نمک باریم']],
      'Welches MRT-KM besitzt hepatobiliäre Aufnahme?': ['کدام ماده MRI جذب کبدی-صفراوی دارد؟', 'گادوکسیتات', ['گادودیامید', 'گادوکسیتات', 'باریم سولفات', 'هگزافلوراید گوگرد']],
      'Welche Aussage zur NSF-Risikoklassifikation von Gadoxetat und Gadobenat ist korrekt?': ['کدام عبارت دربارهٔ طبقه‌بندی خطر NSF برای Gadoxetate و Gadobenate درست است؟', 'هر دو خطی‌اند؛ ACR 2026 آن‌ها را در گروه II می‌گذارد، درحالی‌که ESUR 2026 خطر را میانی طبقه‌بندی می‌کند.', ['هر GBCA خطی خودبه‌خود در بالاترین گروه خطر NSF قرار می‌گیرد.', 'هر دو خطی‌اند؛ ACR 2026 آن‌ها را در گروه II می‌گذارد، درحالی‌که ESUR 2026 خطر را میانی طبقه‌بندی می‌کند.', 'ACR 2026 هر دو را گروه I و ESUR آن‌ها را کم‌خطرترین گروه می‌داند.', 'هر دو ماکروسیکلیک‌اند و در همهٔ راهنماها یک گروه خطر دارند.']],
      'Welche Konstellation ist klassisch mit NSF verbunden?': ['کدام وضعیت به طور کلاسیک با NSF مرتبط است؟', 'نارسایی شدید کلیه همراه ماده گادولینیوم کم‌ثبات', ['کلیه طبیعی همراه USKM', 'نارسایی شدید کلیه همراه ماده گادولینیوم کم‌ثبات', 'پرکاری تیروئید همراه ید', 'شیردهی همراه CT']],
      'Welche Aussage zur Gadolinium-Retention ist korrekt?': ['کدام عبارت درباره احتباس گادولینیوم درست است؟', 'احتباس قابل اندازه‌گیری است، اما آسیب بالینی مغزی ثابت نشده', ['فقط در نارسایی کلیه رخ می‌دهد', 'احتباس قابل اندازه‌گیری است، اما آسیب بالینی مغزی ثابت نشده', 'مواد ماکروسیکلیک همیشه بیشتر باقی می‌مانند', 'با NSF یکسان است']],
      'Welche Struktur zeigen die Pfeile im nativen T1-Panel der Technik-PDF?': ['فلش‌ها در تصویر T1 نیتیو PDF به کدام ساختار اشاره می‌کنند؟', 'هستهٔ دندانه‌ای', ['گلوبوس پالیدوس', 'هستهٔ دندانه‌ای', 'پوتامن', 'کپسول داخلی']],
      'Welche Buscopan-Kontraindikation ist in der Fachinformation ausdrücklich genannt?': ['کدام مورد منع Buscopan به‌صراحت در اطلاعات دارو آمده است؟', 'گلوکوم زاویه‌بسته', ['گلوکوم زاویه‌باز بدون یافتهٔ دیگر', 'گلوکوم زاویه‌بسته', 'نزدیک‌بینی', 'خشکی چشم']],
      'Welche Aussage zur Prostatahyperplasie unter Buscopan trifft laut Fachinformation zu?': ['طبق اطلاعات دارو، کدام عبارت دربارهٔ هیپرپلازی پروستات و Buscopan درست است؟', 'در احتباس ادرار ناشی از انسداد زیر مثانه، مانند آدنوم پروستات، منع مصرف دارد', ['هر نوع هیپرپلازی پروستات بدون استثنا منع مصرف است', 'فقط همراه نزدیک‌بینی منع مصرف دارد', 'در احتباس ادرار ناشی از انسداد زیر مثانه، مانند آدنوم پروستات، منع مصرف دارد', 'نکتهٔ ایمنی مهمی نیست']],
      'Wo verbleiben diagnostische Ultraschall-Mikrobläschen?': ['میکروبابل‌های تشخیصی سونوگرافی کجا باقی می‌مانند؟', 'داخل عروق', ['داخل سلول', 'داخل عروق', 'فقط مجاری صفراوی', 'مغز استخوان']],
      'Wie wird der Gasanteil von USKM überwiegend eliminiert?': ['گاز USKM عمدتاً چگونه دفع می‌شود؟', 'از راه ریه', ['از راه کلیه', 'از راه ریه', 'از راه تیروئید', 'از راه پوست']],
      'Ab welcher eGFR ist eine besonders sorgfältige Nutzen-Risiko-Abwägung üblich?': ['در چه eGFR ارزیابی دقیق سود و خطر مهم است؟', 'کمتر از ۳۰ ml/min/1.73 m²', ['کمتر از ۱۲۰', 'کمتر از ۹۰', 'کمتر از ۶۰ در همه بیماران', 'کمتر از ۳۰ ml/min/1.73 m²']],
      'Welche Aussage zur Dialyse nach GBCA ist korrekt?': ['کدام عبارت دربارهٔ دیالیز پس از GBCA درست است؟', 'صرفاً به‌دلیل GBCA دیالیز جدید را به‌طور معمول آغاز نکنید؛ توصیه برای بیمار از قبل همودیالیزی به نوع ماده و راهنما وابسته است.', ['پس از هر GBCA همودیالیز فوری شروع شود، حتی اگر بیمار دیالیزی نیست.', 'صرفاً به‌دلیل GBCA دیالیز جدید را به‌طور معمول آغاز نکنید؛ توصیه برای بیمار از قبل همودیالیزی به نوع ماده و راهنما وابسته است.', 'دیالیز مستقل از نوع ماده با اطمینان از NSF پیشگیری می‌کند.', 'GBCA ماکروسیکلیک همیشه به سه جلسهٔ اضافهٔ همودیالیز نیاز دارد.']],
      'Welche Aussage unterscheidet die ESUR- und ACR-Empfehlung zu Metformin korrekt?': ['کدام عبارت تفاوت توصیهٔ ESUR و ACR دربارهٔ متفورمین را درست بیان می‌کند؟', 'ESUR در هر تزریق داخل‌شریانی با عبور اول متفورمین را موقتاً قطع می‌کند؛ ACR در AKI، ‏eGFR کمتر از ۳۰ یا بررسی کاتتری شریانی با خطر آمبولی شریان کلیه توقف را مطرح می‌کند.', ['هر دو در همهٔ بررسی‌های وریدی با eGFR بین ۳۰ تا ۶۰ قطع دارو را توصیه می‌کنند.', 'ESUR در هر تزریق داخل‌شریانی با عبور اول متفورمین را موقتاً قطع می‌کند؛ ACR در AKI، ‏eGFR کمتر از ۳۰ یا بررسی کاتتری شریانی با خطر آمبولی شریان کلیه توقف را مطرح می‌کند.', 'ACR توصیه می‌کند پس از هر تزریق مادهٔ حاجب متفورمین برای همیشه قطع شود.', 'ESUR فقط در eGFR کمتر از ۴۵ و بدون توجه به مسیر یا AKI دارو را قطع می‌کند.']],
      'Welche Schilddrüsensituation ist für jodhaltiges KM besonders relevant?': ['کدام وضعیت تیروئید برای ماده یددار مهم‌تر است؟', 'پرکاری آشکار تیروئید', ['کم‌کاری درمان‌شده', 'پرکاری آشکار تیروئید', 'TSH طبیعی', 'آپاندکتومی قبلی']],
      'Was kann jodhaltiges KM nachfolgend beeinflussen?': ['ماده یددار کدام بررسی بعدی را مختل می‌کند؟', 'تصویربرداری هسته‌ای تیروئید', ['MRI زانو', 'تصویربرداری هسته‌ای تیروئید', 'عملکرد دائمی ریه', 'تراکم استخوان']],
      'Welche Aussage bildet den Unterschied zwischen ESUR und ACR bei Hyperthyreose am besten ab?': ['کدام عبارت تفاوت ESUR و ACR دربارهٔ پرکاری تیروئید را بهتر بیان می‌کند؟', 'ESUR در پرکاری آشکار توصیه به پرهیز می‌کند؛ ACR محدودیت همگانی را صرفاً بر اساس سابقه توصیه نمی‌کند، اما در بحران حاد تیروتوکسیک از مادهٔ حاجب پرهیز می‌دهد.', ['هر دو هر سابقهٔ پرکاری را منع مطلق می‌دانند.', 'ESUR در پرکاری آشکار توصیه به پرهیز می‌کند؛ ACR محدودیت همگانی را صرفاً بر اساس سابقه توصیه نمی‌کند، اما در بحران حاد تیروتوکسیک از مادهٔ حاجب پرهیز می‌دهد.', 'هر دو پرکلرات را به‌مدت ۷ تا ۱۰ روز برای همهٔ افراد پرخطر الزامی می‌دانند.', 'مادهٔ یددار فقط با TSH طبیعی مجاز است.']],
      'Welche Aussage zur Stillzeit nach intravaskulärem KM ist korrekt?': ['کدام عبارت دربارهٔ شیردهی پس از تزریق عروقی مادهٔ حاجب درست است؟', 'قطع روتین لازم نیست؛ در صورت نگرانی، ACR مکث اختیاری ۱۲ تا ۲۴ ساعته را مجاز می‌داند.', ['همیشه ۴۸ ساعت قطع شود', 'قطع روتین لازم نیست؛ در صورت نگرانی، ACR مکث اختیاری ۱۲ تا ۲۴ ساعته را مجاز می‌داند.', 'فقط پس از USKM قطع شود', 'پس از هر ماده‌ای شیر یک هفته دور ریخته شود']],
      'Wann sollte Gadolinium in der Schwangerschaft eingesetzt werden?': ['گادولینیوم در بارداری چه زمانی استفاده شود؟', 'فقط وقتی سود بالینی مورد انتظار بر خطر ناشناخته بچربد؛ کمترین دوز و مادهٔ توصیه‌شده در راهنما انتخاب شود.', ['در هر MRI، بدون توجه به اثر بر مراقبت', 'فقط وقتی سود بالینی مورد انتظار بر خطر ناشناخته بچربد؛ کمترین دوز و مادهٔ توصیه‌شده در راهنما انتخاب شود.', 'برای غربالگری روتین بدون پیامد بالینی', 'هرگز، حتی برای اطلاعات ضروری و زمان‌حساس']],
      'Welche Empfehlung zur neonatalen Schilddrüsenkontrolle nach mütterlichem Jod-KM ist richtig zugeordnet?': ['کدام توصیه دربارهٔ کنترل تیروئید نوزاد پس از تزریق ید به مادر درست نسبت داده شده است؟', 'ESUR 2026: بررسی در هفتهٔ اول؛ ACR 2026: غربالگری معمول TSH نوزاد کافی است و آزمایش اضافه لازم نیست.', ['ESUR 2026: بررسی لازم نیست؛ ACR 2026: آزمایش اضافه در هفتهٔ اول اجباری است.', 'ESUR 2026: بررسی در هفتهٔ اول؛ ACR 2026: غربالگری معمول TSH نوزاد کافی است و آزمایش اضافه لازم نیست.', 'هر دو آزمایش اضافه را دقیقاً ۲۴ ساعت بعد لازم می‌دانند.', 'هر دو غربالگری معمول نوزاد را رد می‌کنند.']],
    },
  }
  const [question, answer, options] = translations[lang][seed[0]]
  return [question, answer, options, seed[3]]
}

const QUESTION_EXPLANATIONS = {
  'Welche Aussage zur NSF-Risikoklassifikation von Gadoxetat und Gadobenat ist korrekt?': {
    de: 'Chelatstruktur und NSF-Risikogruppe sind nicht gleichbedeutend. ACR 2026 führt die linearen Wirkstoffe Gadoxetat und Gadobenat in Gruppe II; ESUR 2026 stuft beide als intermediäres Risiko ein. Die Klassifikationen sind systemspezifisch und sollten nicht zu einer einzigen Rangfolge vermischt werden.',
    en: 'Chelate structure and NSF risk group are not interchangeable. ACR 2026 lists the linear agents gadoxetate and gadobenate in Group II; ESUR 2026 classifies both as intermediate risk. These are system-specific classifications and should not be collapsed into one universal ranking.',
    fa: 'ساختار شلات و گروه خطر NSF مترادف نیستند. ACR 2026 مواد خطی Gadoxetate و Gadobenate را در گروه II قرار می‌دهد؛ ESUR 2026 هر دو را خطر میانی طبقه‌بندی می‌کند. این طبقه‌بندی‌ها مختص هر نظام‌اند و نباید به یک رتبه‌بندی همگانی تبدیل شوند.',
  },
  'Welches enterale KM ist bei vermuteter Perforation problematisch?': {
    de: 'Barium außerhalb des Darmlumens kann eine anhaltende Entzündung mit Granulomen und Adhäsionen verursachen. Bei Leckverdacht wird deshalb üblicherweise zunächst wasserlösliches Jod-KM verwendet; bleibt der Verdacht trotz negativer Untersuchung bestehen, kann Barium in ausgewählten Fällen kleine, zuvor übersehene Lecks zeigen.',
    en: 'Barium outside the bowel lumen can cause persistent inflammation, granulomas and adhesions. When a leak is suspected, water-soluble iodinated contrast is therefore usually used first; if suspicion remains after a negative study, selected follow-up with barium may reveal small leaks that were missed.',
    fa: 'باریم خارج از لومن روده می‌تواند التهاب پایدار، گرانولوم و چسبندگی ایجاد کند. بنابراین در شک به نشت معمولاً ابتدا مادهٔ یددار محلول در آب به‌کار می‌رود؛ اگر پس از بررسی منفی همچنان شک باقی باشد، در موارد منتخب بررسی تکمیلی با باریم ممکن است نشت‌های کوچکِ دیده‌نشده را آشکار کند.',
  },
  'Wovor warnt die Fachinformation bei Aspiration von Gastrografin®?': {
    de: 'Die Fachinformation nennt Lungenödem, Pneumonitis und möglichen Tod nach Aspiration. ESUR bewertet pulmonale Komplikationen nach Aspiration hochosmolarer ionischer Mittel insgesamt als äußerst selten. Das Label-Risiko gilt für Diatrizoat und nicht pauschal für alle wasserlöslichen Mittel.',
    en: 'The product information lists pulmonary oedema, pneumonitis and possible death after aspiration. ESUR considers pulmonary complications after aspiration of high-osmolar ionic agents extremely rare overall. The label warning is specific to diatrizoate and should not be generalized to every water-soluble agent.',
    fa: 'اطلاعات دارویی ادم ریه، پنومونیت و احتمال مرگ پس از آسپیراسیون را ذکر می‌کند. ESUR عوارض ریوی پس از آسپیراسیون مواد یونی پُراسمولار را در مجموع بسیار نادر می‌داند. این هشدار مربوط به دیاتریزوات است و نباید به همهٔ مواد محلول در آب تعمیم داده شود.',
  },
  'Welche Aussage unterscheidet die ESUR- und ACR-Empfehlung zu Metformin korrekt?': {
    de: 'ESUR bindet den First-Pass-Fall an eine vorübergehende Pause, während ACR auf AKI, eGFR <30 und ein mögliches renales Embolierisiko bei arterieller Katheteruntersuchung abstellt. Beide nennen 48 Stunden; die Wiederaufnahme hängt von der jeweiligen Nierenkontrolle ab. Produktinformation und lokale Vorgaben können strenger sein.',
    en: 'ESUR includes first-pass exposure as a reason for temporary interruption, whereas ACR focuses on AKI, eGFR <30 and possible renal embolic risk from an arterial catheter study. Both specify 48 hours; restart depends on the relevant renal reassessment. Product information and local policy may be more restrictive.',
    fa: 'ESUR عبور اول را دلیلی برای وقفهٔ موقت می‌داند؛ ACR بر AKI، ‏eGFR کمتر از ۳۰ و احتمال آمبولی کلیوی در بررسی کاتتری شریانی تمرکز می‌کند. هر دو ۴۸ ساعت را ذکر می‌کنند؛ شروع مجدد به ارزیابی کلیه طبق همان راهنما بستگی دارد. اطلاعات دارو و سیاست محلی ممکن است محدودکننده‌تر باشند.',
  },
  'Welche Aussage bildet den Unterschied zwischen ESUR und ACR bei Hyperthyreose am besten ab?': {
    de: 'ESUR rät bei manifester Hyperthyreose von jodhaltigem KM ab und erlaubt Prophylaxe nur ausgewählt unter endokrinologischer Leitung. ACR betrachtet eine Hyperthyreose-Anamnese allein nicht als Grund für pauschale Einschränkung oder Prämedikation, empfiehlt aber, KM bei akutem thyroid storm zu vermeiden.',
    en: 'ESUR advises against iodinated contrast in overt hyperthyroidism and allows prophylaxis only for selected patients under endocrinology supervision. ACR does not treat history alone as a reason for blanket restriction or premedication, but advises avoiding contrast during acute thyroid storm.',
    fa: 'ESUR در پرکاری آشکار از مادهٔ یددار پرهیز می‌دهد و پیشگیری را فقط در موارد منتخب زیر نظر متخصص غدد مجاز می‌داند. ACR سابقهٔ پرکاری را به‌تنهایی دلیل محدودیت یا پیش‌درمانی همگانی نمی‌داند، اما در بحران حاد تیروتوکسیک توصیه به پرهیز می‌کند.',
  },
  'Welche Aussage zur Dialyse nach GBCA ist korrekt?': {
    de: 'ESUR unterscheidet bei bereits bestehender Hämodialyse zwischen makrozyklischen und linearen GBCA. ACR rät davon ab, Dialyse allein wegen einer Gruppe-II/III-GBCA-Gabe einzuleiten oder zu ändern. Bei Peritonealdialyse und linearem GBCA muss der mögliche NSF-Nutzen gegen das Katheterrisiko abgewogen werden.',
    en: 'For patients already on haemodialysis, ESUR distinguishes macrocyclic from linear GBCAs. ACR advises against initiating or changing dialysis solely because a group II/III GBCA was given. With peritoneal dialysis and a linear GBCA, weigh possible NSF benefit against catheter risk.',
    fa: 'برای بیمار از قبل همودیالیزی، ESUR بین GBCA ماکروسیکلیک و خطی تفاوت می‌گذارد. ACR آغاز یا تغییر دیالیز را صرفاً به‌دلیل GBCA گروه II/III توصیه نمی‌کند. در دیالیز صفاقی همراه GBCA خطی، سود احتمالی NSF را در برابر خطر کاتتر بسنجید.',
  },
  'Welche Aussage zur Stillzeit nach intravaskulärem KM ist korrekt?': {
    de: 'Eine Pause ist nicht routinemäßig nötig. ACR 2026 erlaubt bei Sorge eine freiwillige Pause von 12–24 Stunden; währenddessen soll die Mutter abpumpen und die Milch verwerfen. ESUR 2026 empfiehlt normale Fortsetzung nach Jod-KM und makrozyklischem GBCA. Die ACR-Aussage zur normalen Stillzeit ist nicht mit der neonatalen Exposition im Mutterleib zu verwechseln.',
    en: 'Routine interruption is unnecessary. If concerned, ACR 2026 allows an optional 12–24-hour pause; during it, express and discard milk. ESUR 2026 supports normal continuation after iodinated contrast and macrocyclic GBCA. Breast-milk exposure is distinct from fetal exposure in utero.',
    fa: 'قطع روتین لازم نیست. اگر مادر نگران باشد، ACR 2026 مکث اختیاری ۱۲ تا ۲۴ ساعته را مجاز می‌داند؛ در این مدت باید شیر را بدوشد و دور بریزد. ESUR 2026 ادامهٔ معمول را پس از مادهٔ یددار و GBCA ماکروسیکلیک توصیه می‌کند. مواجهه از راه شیر با مواجههٔ جنین در رحم متفاوت است.',
  },
  'Wann sollte Gadolinium in der Schwangerschaft eingesetzt werden?': {
    de: 'Die Formulierungen unterscheiden sich: ACR 2026 verlangt eine kritische Indikation und einen potenziell erheblichen Nutzen, der das unbekannte Risiko überwiegt; die Information darf nicht ohne Weiteres bis nach der Schwangerschaft warten. ESUR 2026 spricht von einer sehr starken Indikation und empfiehlt die kleinstmögliche Dosis eines makrozyklischen Mittels. Beide Leitlinien verlangen eine individuelle Nutzen-Risiko-Abwägung.',
    en: 'The wording differs: ACR 2026 requires a critical indication and potential significant benefit that outweighs unknown risk; the information should not prudently wait until after pregnancy. ESUR 2026 requires a very strong indication and recommends the smallest possible dose of a macrocyclic agent. Both require an individual benefit–risk assessment.',
    fa: 'عبارت راهنماها کمی متفاوت است: ACR 2026 اندیکاسیون حیاتی و سود بالقوهٔ مهمی می‌خواهد که بر خطر ناشناخته بچربد؛ دریافت اطلاعات نباید به‌سادگی تا پس از بارداری به تعویق افتد. ESUR 2026 اندیکاسیون بسیار قوی و کمترین دوز ممکن از مادهٔ ماکروسیکلیک را توصیه می‌کند. هر دو ارزیابی فردی سود و خطر را لازم می‌دانند.',
  },
  'Welche Empfehlung zur neonatalen Schilddrüsenkontrolle nach mütterlichem Jod-KM ist richtig zugeordnet?': {
    de: 'ESUR 2026 empfiehlt nach Jod-KM in der Schwangerschaft eine neonatale Schilddrüsenkontrolle in der ersten Lebenswoche. ACR 2026 hält das übliche Neugeborenen-Screening mit TSH für ausreichend und empfiehlt keine Zusatzkontrolle. Das sind unterschiedliche Leitlinienempfehlungen; nicht als einheitlichen Konsens darstellen und lokale Abläufe beachten.',
    en: 'After iodinated contrast during pregnancy, ESUR 2026 recommends neonatal thyroid testing in the first week. ACR 2026 considers routine newborn TSH screening sufficient and recommends no additional test. These recommendations differ; do not present them as a single consensus, and follow local practice.',
    fa: 'پس از مادهٔ یددار در بارداری، ESUR 2026 بررسی تیروئید نوزاد را در هفتهٔ اول توصیه می‌کند. ACR 2026 غربالگری معمول TSH نوزاد را کافی می‌داند و آزمایش اضافه توصیه نمی‌کند. این توصیه‌ها متفاوت‌اند؛ آن‌ها را به‌صورت اجماع واحد بیان نکنید و رویهٔ محلی را دنبال کنید.',
  },
  'Welche Aussage unterscheidet physiologische und allergieartige KM-Reaktionen korrekt?': {
    de: 'Physiologische Reaktionen sind vorhersehbare Wirkungen des Kontrastmittels. Hypersensitivitätsreaktionen sind davon getrennt zu beurteilen und können IgE- oder andere Mechanismen haben.',
    en: 'Physiologic reactions are predictable effects of the contrast medium. Hypersensitivity reactions are a separate category and may involve IgE or other mechanisms.',
    fa: 'واکنش‌های فیزیولوژیک اثرهای قابل‌پیش‌بینی مادهٔ حاجب‌اند. واکنش‌های حساسیتی دسته‌ای جداگانه هستند و ممکن است با IgE یا سازوکارهای دیگری رخ دهند.',
  },
  'Bei früherer schwerer unmittelbarer HSR und keiner akzeptablen Untersuchungsalternative: Was empfiehlt der ACR/AAAAI-Konsens 2025?': {
    de: 'Der gemeinsame ACR/AAAAI-Konsens 2025 empfiehlt zuerst, eine alternative Bildgebung zu prüfen. Wenn keine akzeptable Alternative ohne dieselbe Kontrastmittelklasse besteht, soll prämediziert und das Mittel wenn möglich gewechselt werden. Die Untersuchung erfolgt im Krankenhaus mit rasch verfügbarem Team und Material zur Anaphylaxiebehandlung. Prämedikation beseitigt das Risiko nicht.',
    en: 'The joint 2025 ACR/AAAAI consensus says to consider alternative imaging first. If no acceptable study avoids the same contrast class, premedicate and switch agents when feasible. Perform the examination in hospital with a rapid-response team and anaphylaxis equipment available. Premedication does not eliminate risk.',
    fa: 'اجماع مشترک ACR/AAAAI در ۲۰۲۵ ابتدا بررسی جایگزین را توصیه می‌کند. اگر روش پذیرفتنی‌ای بدون همان گروه مادهٔ حاجب وجود ندارد، پیش‌دارودرمانی دهید و در صورت امکان ماده را عوض کنید. بررسی باید در بیمارستان و با دسترسی سریع به تیم و تجهیزات درمان آنافیلاکسی انجام شود. پیش‌دارودرمانی خطر را حذف نمی‌کند.',
  },
}

export const CONTRAST_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  CONTRAST_TOPICS.flatMap(topic => QUESTION_SEEDS[topic.id].map((seed, index) => {
    const translated = translateQuestion(seed, lang)
    const revision = getContrastRevision(topic.id, index)
    return {
      id: `${topic.id}-${lang}-${index + 1}`,
      tags: [topic.id],
      fach: 'technik',
      question: translated[0],
      options: translated[2].map((text, optionIndex) => ({ id: ['A', 'B', 'C', 'D'][optionIndex], text })),
      correct: translated[3],
      explanation: revision?.explanation[lang] || QUESTION_EXPLANATIONS[seed[0]]?.[lang] || translated[1],
      ...(revision ? { source: revision.source, wrongExplanations: Object.fromEntries(revision.feedback.flatMap((feedback, i) => feedback ? [['ABCD'[i], feedback[lang]]] : [])) } : {}),
    }
  })),
]))

export const CONTRAST_FLASHCARD_TOPICS = CONTRAST_TOPICS.map(topic => ({
  id: topic.id,
  area: 'Technik',
  chapter: 'Kontrastmittel',
  icon: topic.icon,
  iconImage: '/fach/technik.png',
  color: '#4ade80',
  href: `/flashcards/${topic.id}`,
  title: topic.title,
  subtitle: topic.group,
}))

export const CONTRAST_FLASHCARDS = CONTRAST_TOPICS.flatMap(topic => {
  const cards = QUESTION_SEEDS[topic.id]
  return cards.map((seed, index) => {
    const content = {}
    for (const lang of ['de', 'en', 'fa']) {
      const translated = translateQuestion(seed, lang)
      content[lang] = {
        front: translated[0],
        answer: translated[1],
        explanation: getContrastRevision(topic.id, index)?.explanation[lang] || (topic.id === 'km-jod-typen' && index === 2
          ? {
              de: 'Die Werte aus der PDF sind Beispiele, keine festen Vorgaben. Untersuchungsziel, Scanzeit, Patient, venöser Zugang, Injektor und lokales Protokoll bestimmen die Parameter; die diagnostische Dosis nicht unter die erforderliche Schwelle senken.',
              en: 'The PDF values are examples, not fixed instructions. The examination goal, scan duration, patient, venous access, injector and local protocol determine the parameters; do not lower the diagnostic dose below the required threshold.',
              fa: 'اعداد PDF نمونه‌اند و دستور ثابت نیستند. هدف بررسی، زمان اسکن، بیمار، مسیر وریدی، انژکتور و پروتکل محلی پارامترها را تعیین می‌کنند؛ دوز تشخیصی را از حد لازم پایین‌تر نبرید.',
            }[lang]
          : QUESTION_EXPLANATIONS[seed[0]]?.[lang] || (topic.id === 'km-ultraschall' ? translated[1] : (CONTRAST_LESSON[lang].sections[topic.id]?.takeHome || translated[1]))),
      }
    }
    return {
      id: `${topic.id}-card-${index + 1}`,
      topicId: topic.id,
      ...(getContrastRevision(topic.id, index) ? { source: getContrastRevision(topic.id, index).source } : {}),
      category: topic.title,
      front: Object.fromEntries(Object.entries(content).map(([lang, value]) => [lang, value.front])),
      answer: Object.fromEntries(Object.entries(content).map(([lang, value]) => [lang, value.answer])),
      explanation: Object.fromEntries(Object.entries(content).map(([lang, value]) => [lang, value.explanation])),

    }
  })
})
