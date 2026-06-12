export const CONTRAST_TOPICS = [
  {
    id: 'km-jod-typen',
    group: { de: 'Jodhaltige Kontrastmittel', en: 'Iodinated contrast media', fa: 'مواد حاجب یددار' },
    title: { de: 'Typen & Eigenschaften', en: 'Types & properties', fa: 'انواع و ویژگی‌ها' },
    icon: '🧪',
  },
  {
    id: 'km-jod-reaktionen',
    group: { de: 'Jodhaltige Kontrastmittel', en: 'Iodinated contrast media', fa: 'مواد حاجب یددار' },
    title: { de: 'Nebenwirkungen & Notfallmanagement', en: 'Adverse reactions & emergency management', fa: 'عوارض و مدیریت اورژانسی' },
    icon: '🚨',
  },
  {
    id: 'km-gastrointestinal',
    group: { de: 'Jodhaltige Kontrastmittel', en: 'Iodinated contrast media', fa: 'مواد حاجب یددار' },
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
    id: 'km-ultraschall',
    group: { de: 'Ultraschallkontrastmittel', en: 'Ultrasound contrast media', fa: 'مواد حاجب سونوگرافی' },
    title: { de: 'Ultraschallkontrastmittel (USKM)', en: 'Ultrasound contrast media (UCA)', fa: 'مواد حاجب سونوگرافی' },
    icon: '🫧',
  },
  {
    id: 'km-niereninsuffizienz',
    group: { de: 'Besondere Patientengruppen', en: 'Special patient groups', fa: 'گروه‌های ویژه بیماران' },
    title: { de: 'Niereninsuffizienz', en: 'Renal impairment', fa: 'نارسایی کلیه' },
    icon: '🫘',
  },
  {
    id: 'km-schilddruese',
    group: { de: 'Besondere Patientengruppen', en: 'Special patient groups', fa: 'گروه‌های ویژه بیماران' },
    title: { de: 'Schilddrüsenerkrankungen', en: 'Thyroid disease', fa: 'بیماری‌های تیروئید' },
    icon: '🦋',
  },
  {
    id: 'km-schwangerschaft-stillzeit',
    group: { de: 'Besondere Patientengruppen', en: 'Special patient groups', fa: 'گروه‌های ویژه بیماران' },
    title: { de: 'Schwangerschaft & Stillzeit', en: 'Pregnancy & breastfeeding', fa: 'بارداری و شیردهی' },
    icon: '🤰',
  },
]

export const CONTRAST_LESSON = {
  de: {
    title: 'Kontrastmittel',
    subtitle: 'Sichere Anwendung von jodhaltigen, gadoliniumhaltigen und Ultraschall-Kontrastmitteln',
    intro: 'Kontrastmittel verbessern die diagnostische Aussagekraft, benötigen aber eine klare Indikation, passende Patientenselektion und ein vorbereitetes Reaktionsmanagement.',
    key: 'Immer zuerst fragen: Verändert die Kontrastmittelgabe die Diagnose oder das Management? Danach Wirkstoffklasse, Risikoprofil und niedrigste diagnostisch ausreichende Dosis wählen.',
    sections: {
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
          ['Bariumsulfat', 'Sehr gute Schleimhautdarstellung; bei vermuteter Perforation oder relevantem Aspirationsrisiko problematisch.'],
          ['Wasserlösliches Jod-KM', 'Bei möglicher Perforation häufig bevorzugt; hyperosmolare Präparate können bei Aspiration ein schweres Lungenödem verursachen.'],
          ['Neutral/negativ', 'Wasser oder spezielle Lösungen werden etwa für CT- oder MR-Enterographie genutzt.'],
        ],
        takeHome: 'Die Wahl richtet sich vor allem nach Fragestellung, Perforationsverdacht und Aspirationsrisiko.',
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
      'km-ultraschall': {
        lead: 'USKM bestehen aus gasgefüllten Mikrobläschen und bleiben intravaskulär.',
        points: [
          ['Signal', 'Die Mikrobläschen oszillieren im Schallfeld und ermöglichen eine Echtzeitdarstellung von Perfusion und Enhancement.'],
          ['Elimination', 'Das Gas wird überwiegend pulmonal abgeatmet; die Hülle wird metabolisiert. Eine renale Ausscheidung ist nicht erforderlich.'],
          ['Einsatz', 'Typisch sind Leberläsionscharakterisierung, Organperfusion und ausgewählte vaskuläre Fragestellungen.'],
        ],
        takeHome: 'USKM sind weder jod- noch gadoliniumhaltig und bei Niereninsuffizienz besonders hilfreich.',
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
          ['Neugeborenes', 'Nach jodhaltigem KM in der Schwangerschaft lokale Empfehlungen zur neonatalen Schilddrüsenkontrolle beachten.'],
          ['Stillzeit', 'Nach jodhaltigem oder gadoliniumhaltigem KM ist eine Stillpause nach aktuellen Leitlinien normalerweise nicht erforderlich.'],
        ],
        takeHome: 'Notwendige Diagnostik nicht unangemessen verzögern, aber Indikation, Alternativen und Aufklärung dokumentieren.',
      },
    },
  },
  en: {
    title: 'Contrast media',
    subtitle: 'Safe use of iodinated, gadolinium-based and ultrasound contrast agents',
    intro: 'Contrast agents improve diagnostic information but require a clear indication, appropriate patient selection and prepared reaction management.',
    key: 'First ask whether contrast will change diagnosis or management. Then select the agent class, assess risk and use the lowest diagnostically adequate dose.',
    sections: {
      'km-jod-typen': { lead: 'Modern intravascular X-ray contrast agents are predominantly non-ionic and low- or iso-osmolar.', points: [['Principle', 'Iodine attenuates X-rays and increases density on CT, angiography and fluoroscopy.'], ['Properties', 'Osmolality, viscosity, iodine concentration and injection rate affect tolerability and enhancement.'], ['Practice', 'Agent, dose, flow rate, access and phase must match the clinical objective.']], takeHome: 'Non-ionic low-osmolar agents are the intravascular standard; warming can reduce high viscosity.' },
      'km-jod-reaktionen': { lead: 'Acute reactions are classified as allergic-like or physiologic and by severity.', points: [['Mild', 'Limited urticaria, itching, nausea or warmth: observe and treat symptoms.'], ['Moderate', 'Diffuse urticaria, bronchospasm or facial oedema require rapid clinical assessment and monitoring.'], ['Severe', 'For anaphylaxis: stop contrast, call for help, support airway/breathing/circulation and give intramuscular epinephrine according to the local emergency protocol.']], takeHome: 'A previous severe reaction is the strongest risk factor. Emergency equipment and trained staff must be available.' },
      'km-gastrointestinal': { lead: 'Enteric agents mark or distend the gastrointestinal tract.', points: [['Barium sulphate', 'Excellent mucosal coating; problematic with suspected perforation or significant aspiration risk.'], ['Water-soluble iodine', 'Often preferred if perforation is possible; hyperosmolar agents can cause severe pulmonary oedema if aspirated.'], ['Neutral/negative', 'Water or dedicated solutions are used for CT or MR enterography.']], takeHome: 'Choice depends mainly on the question, suspected perforation and aspiration risk.' },
      'km-gadolinium': { lead: 'Gadolinium mainly shortens T1 relaxation and is administered as a stable chelate.', points: [['Classes', 'Macrocyclic chelates are more stable than linear chelates and release less free gadolinium.'], ['Distribution', 'Most agents are extracellular; gadoxetate also has hepatobiliary uptake.'], ['Use', 'Use only for added diagnostic value and at the lowest dose that provides adequate enhancement.']], takeHome: 'Several linear intravenous agents are suspended or restricted in the EU; macrocyclic agents are preferred.' },
      'km-gadolinium-retention-nsf': { lead: 'Gadolinium can remain detectable in tissues after repeated doses; clinical harm from brain deposition has not been established.', points: [['Retention', 'Linear agents show more retention than macrocyclic agents. Avoid unnecessary repeat doses.'], ['NSF', 'Nephrogenic systemic fibrosis is mainly linked to older, less stable agents in severe renal impairment.'], ['Risk reduction', 'In AKI or eGFR below 30, confirm necessity and select a very-low-NSF-risk agent.']], takeHome: 'Retention and NSF are different: NSF is a rare fibrosing disease in a high-risk setting.' },
      'km-ultraschall': { lead: 'Ultrasound agents are gas-filled microbubbles that remain intravascular.', points: [['Signal', 'Microbubbles oscillate in the ultrasound field and show perfusion and enhancement in real time.'], ['Elimination', 'Gas is mainly exhaled through the lungs and the shell is metabolised; renal excretion is not required.'], ['Use', 'Common uses include liver lesion characterisation, organ perfusion and selected vascular questions.']], takeHome: 'Ultrasound agents contain neither iodine nor gadolinium and are valuable in renal impairment.' },
      'km-niereninsuffizienz': { lead: 'Risk depends on renal function, acute kidney injury, route of administration and the overall clinical setting.', points: [['Screening', 'Check current eGFR and signs of AKI in at-risk patients.'], ['Iodine', 'In AKI or eGFR below 30, assess benefit and risk individually, optimise volume status and avoid unnecessary repeat doses.'], ['Gadolinium', 'Choose a low-NSF-risk agent. Do not initiate dialysis solely because contrast was administered.']], takeHome: 'Renal impairment is not an automatic contraindication; it requires a justified and documented strategy.' },
      'km-schilddruese': { lead: 'The iodine load may trigger or worsen hyperthyroidism in susceptible patients.', points: [['High risk', 'Overt hyperthyroidism and thyroid autonomy are particularly relevant.'], ['Preparation', 'If clinically suspected, check TSH and additional thyroid tests before elective administration.'], ['Follow-up', 'Watch high-risk patients for delayed symptoms; iodine also interferes with nuclear thyroid imaging.']], takeHome: 'Avoid iodinated contrast in overt hyperthyroidism when possible; make emergency decisions collaboratively.' },
      'km-schwangerschaft-stillzeit': { lead: 'Use contrast only when the additional information is clinically necessary.', points: [['Pregnancy', 'Iodinated contrast crosses the placenta. Gadolinium should be reserved for critical indications.'], ['Newborn', 'After iodinated contrast in pregnancy, follow local neonatal thyroid screening recommendations.'], ['Breastfeeding', 'Current guidance generally does not require interruption after iodinated or gadolinium contrast.']], takeHome: 'Do not inappropriately delay necessary imaging, but document indication, alternatives and counselling.' },
    },
  },
  fa: {
    title: 'مواد حاجب',
    subtitle: 'کاربرد ایمن مواد حاجب یددار، گادولینیوم و سونوگرافی',
    intro: 'مواد حاجب ارزش تشخیصی را افزایش می‌دهند، اما به اندیکاسیون روشن، انتخاب درست بیمار و آمادگی برای واکنش‌های حاد نیاز دارند.',
    key: 'ابتدا بپرسید آیا تزریق ماده حاجب تشخیص یا درمان را تغییر می‌دهد؛ سپس نوع ماده، خطر بیمار و کمترین دوز تشخیصی کافی را انتخاب کنید.',
    sections: {
      'km-jod-typen': { lead: 'مواد حاجب عروقی مدرن عمدتاً غیر یونی و کم‌اسمولار یا ایزواسمولار هستند.', points: [['اصل', 'ید اشعه ایکس را جذب می‌کند و دانسیته را در CT، آنژیوگرافی و فلوروسکوپی افزایش می‌دهد.'], ['ویژگی‌ها', 'اسمولالیته، ویسکوزیته، غلظت ید و سرعت تزریق بر تحمل و enhancement اثر دارند.'], ['کاربرد', 'نوع ماده، دوز، سرعت تزریق، مسیر و فاز باید با هدف بالینی هماهنگ باشد.']], takeHome: 'مواد غیر یونی کم‌اسمولار استاندارد عروقی هستند؛ گرم‌کردن می‌تواند ویسکوزیته را کاهش دهد.' },
      'km-jod-reaktionen': { lead: 'واکنش‌های حاد به نوع آلرژی‌مانند یا فیزیولوژیک و بر اساس شدت تقسیم می‌شوند.', points: [['خفیف', 'کهیر محدود، خارش، تهوع یا احساس گرما: مشاهده و درمان علامتی.'], ['متوسط', 'کهیر منتشر، برونکواسپاسم یا ادم صورت نیازمند ارزیابی سریع و مانیتورینگ است.'], ['شدید', 'در آنافیلاکسی تزریق را قطع کنید، کمک بخواهید، راه هوایی/تنفس/گردش را حمایت و آدرنالین عضلانی را طبق پروتکل محلی بدهید.']], takeHome: 'واکنش شدید قبلی مهم‌ترین عامل خطر است؛ تجهیزات اورژانس و پرسنل آموزش‌دیده باید آماده باشند.' },
      'km-gastrointestinal': { lead: 'مواد خوراکی یا رکتال لومن دستگاه گوارش را مشخص یا متسع می‌کنند.', points: [['باریم', 'پوشش مخاطی عالی؛ در شک به پرفوراسیون یا خطر مهم آسپیراسیون مشکل‌ساز است.'], ['ید محلول در آب', 'در احتمال پرفوراسیون اغلب ترجیح داده می‌شود؛ آسپیراسیون مواد هایپراسمولار خطر ادم ریه دارد.'], ['خنثی/منفی', 'آب یا محلول‌های ویژه در CT یا MR انتروگرافی استفاده می‌شوند.']], takeHome: 'انتخاب بر اساس سؤال بالینی، احتمال پرفوراسیون و خطر آسپیراسیون است.' },
      'km-gadolinium': { lead: 'گادولینیوم عمدتاً زمان T1 را کوتاه می‌کند و به شکل کلات پایدار تزریق می‌شود.', points: [['کلاس‌ها', 'کلات‌های ماکروسیکلیک از خطی پایدارترند و گادولینیوم آزاد کمتری رها می‌کنند.'], ['توزیع', 'بیشتر مواد خارج‌سلولی‌اند؛ گادوکسیتات جذب کبدی-صفراوی نیز دارد.'], ['کاربرد', 'فقط در صورت ارزش تشخیصی افزوده و با کمترین دوز کافی استفاده شود.']], takeHome: 'چند ماده خطی وریدی در اروپا محدود یا تعلیق شده‌اند؛ مواد ماکروسیکلیک ترجیح دارند.' },
      'km-gadolinium-retention-nsf': { lead: 'پس از تزریق‌های مکرر، گادولینیوم ممکن است در بافت قابل اندازه‌گیری بماند؛ آسیب بالینی ناشی از رسوب مغزی ثابت نشده است.', points: [['احتباس', 'مواد خطی احتباس بیشتری از ماکروسیکلیک دارند؛ تزریق‌های غیرضروری تکرار نشوند.'], ['NSF', 'فیبروز سیستمیک نفروژنیک عمدتاً با مواد قدیمی و ناپایدار در نارسایی شدید کلیه مرتبط است.'], ['کاهش خطر', 'در AKI یا eGFR زیر ۳۰، ضرورت را تأیید و ماده با خطر بسیار پایین NSF انتخاب کنید.']], takeHome: 'احتباس و NSF یکسان نیستند؛ NSF بیماری فیبروزان نادر در شرایط پرخطر است.' },
      'km-ultraschall': { lead: 'مواد حاجب سونوگرافی میکروبابل‌های گازی و داخل‌عروقی هستند.', points: [['سیگنال', 'میکروبابل‌ها در میدان صوتی نوسان می‌کنند و پرفیوژن را در زمان واقعی نشان می‌دهند.'], ['دفع', 'گاز عمدتاً از ریه دفع و پوسته متابولیزه می‌شود؛ دفع کلیوی لازم نیست.'], ['کاربرد', 'مشخص‌کردن ضایعات کبدی، پرفیوژن ارگان و برخی سؤالات عروقی.']], takeHome: 'USKM نه ید دارد نه گادولینیوم و در نارسایی کلیه بسیار مفید است.' },
      'km-niereninsuffizienz': { lead: 'خطر به عملکرد کلیه، AKI، مسیر تزریق و وضعیت کلی بیمار بستگی دارد.', points: [['غربالگری', 'در بیماران پرخطر eGFR به‌روز و نشانه‌های AKI را بررسی کنید.'], ['ید', 'در AKI یا eGFR زیر ۳۰ سود و خطر را فردی بسنجید، وضعیت حجم را بهینه و تزریق تکراری غیرضروری را حذف کنید.'], ['گادولینیوم', 'ماده با خطر پایین NSF انتخاب شود؛ دیالیز فقط به علت تزریق آغاز نشود.']], takeHome: 'نارسایی کلیه منع مطلق نیست؛ به راهبرد مستند و منطقی نیاز دارد.' },
      'km-schilddruese': { lead: 'بار ید می‌تواند در افراد مستعد پرکاری تیروئید ایجاد یا تشدید کند.', points: [['خطر بالا', 'پرکاری آشکار و اتونومی تیروئید مهم‌اند.'], ['آمادگی', 'در شک بالینی، پیش از تزریق الکتیو TSH و آزمایش‌های تکمیلی بررسی شوند.'], ['پیگیری', 'در افراد پرخطر به علائم دیررس توجه کنید؛ ید بر تصویربرداری هسته‌ای تیروئید نیز اثر دارد.']], takeHome: 'در پرکاری آشکار تا حد امکان از ماده یددار اجتناب شود؛ در اورژانس تصمیم مشترک بگیرید.' },
      'km-schwangerschaft-stillzeit': { lead: 'ماده حاجب فقط زمانی استفاده شود که اطلاعات اضافی از نظر بالینی ضروری باشد.', points: [['بارداری', 'ماده یددار از جفت عبور می‌کند؛ گادولینیوم برای اندیکاسیون‌های حیاتی محدود شود.'], ['نوزاد', 'پس از ماده یددار در بارداری، توصیه محلی غربالگری تیروئید نوزاد رعایت شود.'], ['شیردهی', 'طبق راهنماهای فعلی معمولاً پس از ید یا گادولینیوم نیازی به قطع شیردهی نیست.']], takeHome: 'تصویربرداری ضروری را بی‌دلیل به تأخیر نیندازید، اما اندیکاسیون، جایگزین‌ها و مشاوره را ثبت کنید.' },
    },
  },
}

const QUESTION_SEEDS = {
  'km-jod-typen': [
    ['Welche Eigenschaft entspricht modernen intravaskulären CT-Kontrastmitteln?', 'Nicht-ionisch und niedrig- oder isoosmolar', ['Nur ionisch und hochosmolar', 'Nicht-ionisch und niedrig- oder isoosmolar', 'Immer oral verabreicht', 'Ohne Jod'], 'B'],
    ['Welche Maßnahme kann die Viskosität jodhaltiger KM reduzieren?', 'Erwärmen auf Körpertemperatur', ['Abkühlen', 'Erwärmen auf Körpertemperatur', 'Verdünnen mit Luft', 'Einfrieren'], 'B'],
  ],
  'km-jod-reaktionen': [
    ['Was ist bei schwerer anaphylaktischer KM-Reaktion das wichtigste Medikament?', 'Intramuskuläres Adrenalin', ['Orales Antihistaminikum', 'Intramuskuläres Adrenalin', 'Metformin', 'Bariumsulfat'], 'B'],
    ['Welcher Faktor erhöht das Risiko einer erneuten allergieähnlichen Reaktion am stärksten?', 'Eine frühere Reaktion auf dieselbe KM-Klasse', ['Alter unter 30', 'Eine frühere Reaktion auf dieselbe KM-Klasse', 'Normale Nierenfunktion', 'Nüchternheit'], 'B'],
  ],
  'km-gastrointestinal': [
    ['Welches enterale KM ist bei vermuteter Perforation problematisch?', 'Bariumsulfat', ['Wasser', 'Bariumsulfat', 'Luft', 'Neutrale Lösung'], 'B'],
    ['Welche Gefahr besteht bei Aspiration hyperosmolarer wasserlöslicher KM?', 'Schweres Lungenödem', ['NSF', 'Schweres Lungenödem', 'Hyperthyreose innerhalb Minuten', 'Gadolinium-Retention'], 'B'],
  ],
  'km-gadolinium': [
    ['Welche Gadolinium-Chelate sind stabiler?', 'Makrozyklische', ['Lineare', 'Makrozyklische', 'Ionische Jod-KM', 'Bariumsalze'], 'B'],
    ['Welches MRT-KM besitzt hepatobiliäre Aufnahme?', 'Gadoxetsäure', ['Gadodiamid', 'Gadoxetsäure', 'Bariumsulfat', 'Schwefelhexafluorid'], 'B'],
  ],
  'km-gadolinium-retention-nsf': [
    ['Welche Konstellation ist klassisch mit NSF verbunden?', 'Schwere Niereninsuffizienz plus weniger stabiles GBCA', ['Normale Nierenfunktion plus USKM', 'Schwere Niereninsuffizienz plus weniger stabiles GBCA', 'Hyperthyreose plus Jod-KM', 'Stillzeit plus CT'], 'B'],
    ['Welche Aussage zur Gadolinium-Retention ist korrekt?', 'Retention ist nachweisbar, ein klinischer Hirnschaden aber nicht belegt', ['Sie tritt nur bei Niereninsuffizienz auf', 'Retention ist nachweisbar, ein klinischer Hirnschaden aber nicht belegt', 'Makrozyklische Präparate retinieren immer mehr', 'Sie ist identisch mit NSF'], 'B'],
  ],
  'km-ultraschall': [
    ['Wo verbleiben diagnostische Ultraschall-Mikrobläschen?', 'Im Gefäßraum', ['Intrazellulär', 'Im Gefäßraum', 'Nur im Gallengang', 'Im Knochenmark'], 'B'],
    ['Wie wird der Gasanteil von USKM überwiegend eliminiert?', 'Über die Lunge', ['Über die Niere', 'Über die Lunge', 'Über die Schilddrüse', 'Über die Haut'], 'B'],
  ],
  'km-niereninsuffizienz': [
    ['Ab welcher eGFR ist eine besonders sorgfältige Nutzen-Risiko-Abwägung üblich?', 'Unter 30 ml/min/1,73 m²', ['Unter 120', 'Unter 90', 'Unter 60 bei jedem Patienten', 'Unter 30 ml/min/1,73 m²'], 'D'],
    ['Soll wegen einer einmaligen KM-Gabe routinemäßig neu mit Dialyse begonnen werden?', 'Nein', ['Ja, immer', 'Nur nach USKM', 'Nein', 'Nur nach oralem Barium'], 'C'],
  ],
  'km-schilddruese': [
    ['Welche Schilddrüsensituation ist für jodhaltiges KM besonders relevant?', 'Manifeste Hyperthyreose', ['Behandelte Hypothyreose', 'Manifeste Hyperthyreose', 'Normales TSH', 'Zustand nach Appendektomie'], 'B'],
    ['Was kann jodhaltiges KM nachfolgend beeinflussen?', 'Nuklearmedizinische Schilddrüsendiagnostik', ['Knie-MRT', 'Nuklearmedizinische Schilddrüsendiagnostik', 'Lungenfunktion dauerhaft', 'Knochendichte'], 'B'],
  ],
  'km-schwangerschaft-stillzeit': [
    ['Welche Aussage zur Stillzeit nach intravaskulärem KM ist korrekt?', 'Eine Stillpause ist normalerweise nicht erforderlich', ['Immer 48 Stunden pausieren', 'Eine Stillpause ist normalerweise nicht erforderlich', 'Nur nach USKM abstillen', 'Das Kind benötigt Aktivkohle'], 'B'],
    ['Wann sollte Gadolinium in der Schwangerschaft eingesetzt werden?', 'Nur bei kritischer Indikation und relevantem Zusatznutzen', ['Bei jeder MRT', 'Nur bei kritischer Indikation und relevantem Zusatznutzen', 'Zur Routinevorsorge', 'Nie, auch nicht im Notfall'], 'B'],
  ],
}

const translateQuestion = (seed, lang) => {
  if (lang === 'de') return seed
  const translations = {
    en: {
      'Welche Eigenschaft entspricht modernen intravaskulären CT-Kontrastmitteln?': ['Which property describes modern intravascular CT contrast agents?', 'Non-ionic and low- or iso-osmolar', ['Ionic and high-osmolar only', 'Non-ionic and low- or iso-osmolar', 'Always administered orally', 'Iodine-free']],
      'Welche Maßnahme kann die Viskosität jodhaltiger KM reduzieren?': ['Which measure can reduce iodinated contrast viscosity?', 'Warming to body temperature', ['Cooling', 'Warming to body temperature', 'Diluting with air', 'Freezing']],
      'Was ist bei schwerer anaphylaktischer KM-Reaktion das wichtigste Medikament?': ['What is the key medication in a severe anaphylactic contrast reaction?', 'Intramuscular epinephrine', ['Oral antihistamine', 'Intramuscular epinephrine', 'Metformin', 'Barium sulphate']],
      'Welcher Faktor erhöht das Risiko einer erneuten allergieähnlichen Reaktion am stärksten?': ['Which factor most increases the risk of another allergic-like reaction?', 'A previous reaction to the same contrast class', ['Age below 30', 'A previous reaction to the same contrast class', 'Normal renal function', 'Fasting']],
      'Welches enterale KM ist bei vermuteter Perforation problematisch?': ['Which enteric agent is problematic when perforation is suspected?', 'Barium sulphate', ['Water', 'Barium sulphate', 'Air', 'Neutral solution']],
      'Welche Gefahr besteht bei Aspiration hyperosmolarer wasserlöslicher KM?': ['What is the danger of aspirating hyperosmolar water-soluble contrast?', 'Severe pulmonary oedema', ['NSF', 'Severe pulmonary oedema', 'Hyperthyroidism within minutes', 'Gadolinium retention']],
      'Welche Gadolinium-Chelate sind stabiler?': ['Which gadolinium chelates are more stable?', 'Macrocyclic agents', ['Linear agents', 'Macrocyclic agents', 'Ionic iodine agents', 'Barium salts']],
      'Welches MRT-KM besitzt hepatobiliäre Aufnahme?': ['Which MRI agent has hepatobiliary uptake?', 'Gadoxetate', ['Gadodiamide', 'Gadoxetate', 'Barium sulphate', 'Sulphur hexafluoride']],
      'Welche Konstellation ist klassisch mit NSF verbunden?': ['Which setting is classically associated with NSF?', 'Severe renal impairment plus a less stable GBCA', ['Normal kidneys plus UCA', 'Severe renal impairment plus a less stable GBCA', 'Hyperthyroidism plus iodine', 'Breastfeeding plus CT']],
      'Welche Aussage zur Gadolinium-Retention ist korrekt?': ['Which statement about gadolinium retention is correct?', 'Retention is detectable, but clinical brain harm has not been established', ['It occurs only in renal impairment', 'Retention is detectable, but clinical brain harm has not been established', 'Macrocyclic agents always retain more', 'It is identical to NSF']],
      'Wo verbleiben diagnostische Ultraschall-Mikrobläschen?': ['Where do diagnostic ultrasound microbubbles remain?', 'Intravascularly', ['Intracellularly', 'Intravascularly', 'Only in bile ducts', 'In bone marrow']],
      'Wie wird der Gasanteil von USKM überwiegend eliminiert?': ['How is the gas component of UCA mainly eliminated?', 'Through the lungs', ['Through the kidneys', 'Through the lungs', 'Through the thyroid', 'Through the skin']],
      'Ab welcher eGFR ist eine besonders sorgfältige Nutzen-Risiko-Abwägung üblich?': ['At which eGFR is especially careful benefit-risk assessment customary?', 'Below 30 ml/min/1.73 m²', ['Below 120', 'Below 90', 'Below 60 in every patient', 'Below 30 ml/min/1.73 m²']],
      'Soll wegen einer einmaligen KM-Gabe routinemäßig neu mit Dialyse begonnen werden?': ['Should dialysis routinely be initiated because of one contrast dose?', 'No', ['Yes, always', 'Only after UCA', 'No', 'Only after oral barium']],
      'Welche Schilddrüsensituation ist für jodhaltiges KM besonders relevant?': ['Which thyroid condition is particularly relevant for iodinated contrast?', 'Overt hyperthyroidism', ['Treated hypothyroidism', 'Overt hyperthyroidism', 'Normal TSH', 'Previous appendectomy']],
      'Was kann jodhaltiges KM nachfolgend beeinflussen?': ['What can iodinated contrast subsequently interfere with?', 'Nuclear thyroid imaging', ['Knee MRI', 'Nuclear thyroid imaging', 'Lung function permanently', 'Bone density']],
      'Welche Aussage zur Stillzeit nach intravaskulärem KM ist korrekt?': ['Which statement about breastfeeding after intravascular contrast is correct?', 'Interruption is usually not required', ['Always pause for 48 hours', 'Interruption is usually not required', 'Stop only after UCA', 'The infant needs activated charcoal']],
      'Wann sollte Gadolinium in der Schwangerschaft eingesetzt werden?': ['When should gadolinium be used in pregnancy?', 'Only for a critical indication with meaningful added value', ['For every MRI', 'Only for a critical indication with meaningful added value', 'For routine screening', 'Never, even in an emergency']],
    },
    fa: {
      'Welche Eigenschaft entspricht modernen intravaskulären CT-Kontrastmitteln?': ['کدام ویژگی مربوط به مواد حاجب عروقی مدرن CT است؟', 'غیر یونی و کم‌اسمولار یا ایزواسمولار', ['فقط یونی و پُراسمولار', 'غیر یونی و کم‌اسمولار یا ایزواسمولار', 'همیشه خوراکی', 'بدون ید']],
      'Welche Maßnahme kann die Viskosität jodhaltiger KM reduzieren?': ['کدام اقدام ویسکوزیته ماده حاجب یددار را کاهش می‌دهد؟', 'گرم‌کردن تا دمای بدن', ['سردکردن', 'گرم‌کردن تا دمای بدن', 'رقیق‌کردن با هوا', 'منجمدکردن']],
      'Was ist bei schwerer anaphylaktischer KM-Reaktion das wichtigste Medikament?': ['مهم‌ترین دارو در واکنش آنافیلاکسی شدید چیست؟', 'آدرنالین عضلانی', ['آنتی‌هیستامین خوراکی', 'آدرنالین عضلانی', 'متفورمین', 'باریم']],
      'Welcher Faktor erhöht das Risiko einer erneuten allergieähnlichen Reaktion am stärksten?': ['مهم‌ترین عامل خطر واکنش مجدد آلرژی‌مانند چیست؟', 'واکنش قبلی به همان کلاس ماده حاجب', ['سن زیر ۳۰', 'واکنش قبلی به همان کلاس ماده حاجب', 'عملکرد طبیعی کلیه', 'ناشتایی']],
      'Welches enterale KM ist bei vermuteter Perforation problematisch?': ['در شک به پرفوراسیون کدام ماده گوارشی مشکل‌ساز است؟', 'باریم سولفات', ['آب', 'باریم سولفات', 'هوا', 'محلول خنثی']],
      'Welche Gefahr besteht bei Aspiration hyperosmolarer wasserlöslicher KM?': ['خطر آسپیراسیون ماده محلول در آب هایپراسمولار چیست؟', 'ادم شدید ریه', ['NSF', 'ادم شدید ریه', 'پرکاری تیروئید فوری', 'احتباس گادولینیوم']],
      'Welche Gadolinium-Chelate sind stabiler?': ['کدام کلات‌های گادولینیوم پایدارترند؟', 'ماکروسیکلیک', ['خطی', 'ماکروسیکلیک', 'مواد یددار یونی', 'نمک باریم']],
      'Welches MRT-KM besitzt hepatobiliäre Aufnahme?': ['کدام ماده MRI جذب کبدی-صفراوی دارد؟', 'گادوکسیتات', ['گادودیامید', 'گادوکسیتات', 'باریم سولفات', 'هگزافلوراید گوگرد']],
      'Welche Konstellation ist klassisch mit NSF verbunden?': ['کدام وضعیت به طور کلاسیک با NSF مرتبط است؟', 'نارسایی شدید کلیه همراه ماده گادولینیوم کم‌ثبات', ['کلیه طبیعی همراه USKM', 'نارسایی شدید کلیه همراه ماده گادولینیوم کم‌ثبات', 'پرکاری تیروئید همراه ید', 'شیردهی همراه CT']],
      'Welche Aussage zur Gadolinium-Retention ist korrekt?': ['کدام عبارت درباره احتباس گادولینیوم درست است؟', 'احتباس قابل اندازه‌گیری است، اما آسیب بالینی مغزی ثابت نشده', ['فقط در نارسایی کلیه رخ می‌دهد', 'احتباس قابل اندازه‌گیری است، اما آسیب بالینی مغزی ثابت نشده', 'مواد ماکروسیکلیک همیشه بیشتر باقی می‌مانند', 'با NSF یکسان است']],
      'Wo verbleiben diagnostische Ultraschall-Mikrobläschen?': ['میکروبابل‌های تشخیصی سونوگرافی کجا باقی می‌مانند؟', 'داخل عروق', ['داخل سلول', 'داخل عروق', 'فقط مجاری صفراوی', 'مغز استخوان']],
      'Wie wird der Gasanteil von USKM überwiegend eliminiert?': ['گاز USKM عمدتاً چگونه دفع می‌شود؟', 'از راه ریه', ['از راه کلیه', 'از راه ریه', 'از راه تیروئید', 'از راه پوست']],
      'Ab welcher eGFR ist eine besonders sorgfältige Nutzen-Risiko-Abwägung üblich?': ['در چه eGFR ارزیابی دقیق سود و خطر مهم است؟', 'کمتر از ۳۰ ml/min/1.73 m²', ['کمتر از ۱۲۰', 'کمتر از ۹۰', 'کمتر از ۶۰ در همه بیماران', 'کمتر از ۳۰ ml/min/1.73 m²']],
      'Soll wegen einer einmaligen KM-Gabe routinemäßig neu mit Dialyse begonnen werden?': ['آیا فقط به دلیل یک تزریق باید دیالیز جدید آغاز شود؟', 'خیر', ['بله، همیشه', 'فقط پس از USKM', 'خیر', 'فقط پس از باریم خوراکی']],
      'Welche Schilddrüsensituation ist für jodhaltiges KM besonders relevant?': ['کدام وضعیت تیروئید برای ماده یددار مهم‌تر است؟', 'پرکاری آشکار تیروئید', ['کم‌کاری درمان‌شده', 'پرکاری آشکار تیروئید', 'TSH طبیعی', 'آپاندکتومی قبلی']],
      'Was kann jodhaltiges KM nachfolgend beeinflussen?': ['ماده یددار کدام بررسی بعدی را مختل می‌کند؟', 'تصویربرداری هسته‌ای تیروئید', ['MRI زانو', 'تصویربرداری هسته‌ای تیروئید', 'عملکرد دائمی ریه', 'تراکم استخوان']],
      'Welche Aussage zur Stillzeit nach intravaskulärem KM ist korrekt?': ['کدام عبارت درباره شیردهی پس از ماده حاجب درست است؟', 'معمولاً قطع شیردهی لازم نیست', ['همیشه ۴۸ ساعت قطع شود', 'معمولاً قطع شیردهی لازم نیست', 'فقط پس از USKM قطع شود', 'نوزاد زغال فعال نیاز دارد']],
      'Wann sollte Gadolinium in der Schwangerschaft eingesetzt werden?': ['گادولینیوم در بارداری چه زمانی استفاده شود؟', 'فقط با اندیکاسیون حیاتی و ارزش افزوده مهم', ['در هر MRI', 'فقط با اندیکاسیون حیاتی و ارزش افزوده مهم', 'برای غربالگری روتین', 'هرگز حتی در اورژانس']],
    },
  }
  const [question, answer, options] = translations[lang][seed[0]]
  return [question, answer, options, seed[3]]
}

export const CONTRAST_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  CONTRAST_TOPICS.flatMap(topic => QUESTION_SEEDS[topic.id].map((seed, index) => {
    const translated = translateQuestion(seed, lang)
    return {
      id: `${topic.id}-${lang}-${index + 1}`,
      tags: [topic.id],
      fach: 'technik',
      question: translated[0],
      options: translated[2].map((text, optionIndex) => ({ id: ['A', 'B', 'C', 'D'][optionIndex], text })),
      correct: translated[3],
      explanation: translated[1],
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
        explanation: CONTRAST_LESSON[lang].sections[topic.id].takeHome,
      }
    }
    return {
      id: `${topic.id}-card-${index + 1}`,
      topicId: topic.id,
      category: topic.title,
      front: Object.fromEntries(Object.entries(content).map(([lang, value]) => [lang, value.front])),
      answer: Object.fromEntries(Object.entries(content).map(([lang, value]) => [lang, value.answer])),
      explanation: Object.fromEntries(Object.entries(content).map(([lang, value]) => [lang, value.explanation])),
      diagram: {
        de: `${topic.group.de} → ${topic.title.de}`,
        en: `${topic.group.en} → ${topic.title.en}`,
        fa: `${topic.group.fa} → ${topic.title.fa}`,
      },
    }
  })
})
