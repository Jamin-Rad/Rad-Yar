const L = (de, en, fa) => ({ de, en, fa })
const Q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })
const F = (id, category, front, answer, explanation) => ({ id, category, front, answer, explanation })

export const DVA_LESSON = {
  pdfSourcePages: [30,30], // user PDF page range; coverage still requires content comparison

  breadcrumb: L('Developmental Venous Anomaly', 'Developmental Venous Anomaly', 'آنومالی وریدی تکاملی'),
  title: L('DVA', 'DVA', 'DVA'),
  definition: L(
    'Persistierende embryonale venöse Drainage einer ansonsten normalen Hirnregion.',
    'Persistent embryonic venous drainage of otherwise normal brain tissue.',
    'تداوم تخلیه وریدی جنینی در ناحیه‌ای با بافت مغزی طبیعی.'
  ),
  sourceLabel: 'Dr. Zia',
  keyLabel: L('Merke', 'Key point', 'نکته کلیدی'),
  caveLabel: L('Cave', 'Warning', 'هشدار'),
  toc: L('Inhalte', 'Contents', 'فهرست'),
  heroCards: [
    { value: L('Häufigste', 'Most common', 'شایع‌ترین'), label: L('zerebrale Gefäßanomalie', 'cerebral vascular anomaly', 'آنومالی عروقی مغز'), text: L('meist inzidentell und benign', 'usually incidental and benign', 'اغلب اتفاقی و خوش‌خیم') },
    { value: 'Caput medusae', label: L('konvergierende Medullarvenen', 'converging medullary veins', 'وریدهای مدولاری همگرا'), text: L('charakteristisches C+-Muster', 'characteristic post-contrast pattern', 'الگوی مشخص پس از کنتراست') },
    { value: L('~20 %', '~20%', 'حدود ۲۰٪'), label: L('assoziiertes Kavernom', 'associated cavernoma', 'کاورنوم همراه'), text: L('SWI/T2* gezielt prüfen', 'check SWI/T2* carefully', 'بررسی دقیق SWI/T2*') },
  ],
  sections: [
    { id: 'grundlagen', icon: '🩸', label: L('Grundlagen', 'Basics', 'مبانی') },
    { id: 'anatomie', icon: '🕸️', label: L('Venöse Anatomie', 'Venous anatomy', 'آناتومی وریدی') },
    { id: 'bildgebung', icon: '🧲', label: L('Bildgebung', 'Imaging', 'تصویربرداری') },
    { id: 'assoziationen', icon: '🔎', label: L('Assoziationen', 'Associations', 'همراهی‌ها') },
    { id: 'komplikationen', icon: '⚠️', label: L('Komplikationen', 'Complications', 'عوارض') },
    { id: 'differenzial', icon: '⚖️', label: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی') },
    { id: 'fall', icon: '🖼️', label: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها') },
    { id: 'management', icon: '🛡️', label: L('Management', 'Management', 'مدیریت') },
    { id: 'takehome', icon: '🏁', label: L('TAKE HOME MESSAGE', 'TAKE HOME MESSAGE', 'TAKE HOME MESSAGE'), emphasis: true },
  ],
  grundlagen: {
    title: L('Definition & Epidemiologie', 'Definition & epidemiology', 'تعریف و اپیدمیولوژی'),
    lead: L('Eine DVA ist eine Variante der normalen venösen Drainage und keine arteriovenöse Malformation.', 'A DVA is a variant of normal venous drainage, not an arteriovenous malformation.', 'DVA نوعی واریانت تخلیه طبیعی وریدی است، نه مالفورماسیون شریانی‌وریدی.'),
    items: [
      { icon: '🧠', title: L('Normvariante', 'Normal variant', 'واریانت طبیعی'), text: L('Die Drainagevene versorgt normales Hirnparenchym. Eine DVA ist keine echte Gefäßfehlbildung im Sinne eines AV-Shunts.', 'The collector drains normal brain parenchyma. A DVA is not a true vascular malformation with an AV shunt.', 'ورید جمع‌کننده بافت طبیعی مغز را تخلیه می‌کند و DVA شانت AV واقعی نیست.') },
      { icon: '📊', title: L('Häufigkeit', 'Frequency', 'فراوانی'), text: L('Häufigste zerebrale Gefäßanomalie; in kontrastverstärkten MRT-Untersuchungen häufig als Zufallsbefund sichtbar.', 'The most common cerebral vascular anomaly and a frequent incidental finding on contrast-enhanced MRI.', 'شایع‌ترین آنومالی عروقی مغز و یافته اتفاقی رایج در MRI با کنتراست.') },
      { icon: '🙂', title: L('Klinik', 'Clinical presentation', 'تظاهر بالینی'), text: L('Fast immer asymptomatisch. Seltene Symptome sind meist durch eine Komplikation oder assoziierte Läsion erklärbar.', 'Almost always asymptomatic. Rare symptoms are usually due to a complication or an associated lesion.', 'تقریباً همیشه بدون علامت است؛ علائم نادر معمولاً ناشی از عارضه یا ضایعه همراه‌اند.') },
    ],
    key: L('DVA = funktionell notwendige venöse Drainage. Nicht mit AVM verwechseln und nicht prophylaktisch entfernen.', 'DVA = functionally necessary venous drainage. Do not confuse it with an AVM or remove it prophylactically.', 'DVA = تخلیه وریدی ضروری. با AVM اشتباه نشود و پیشگیرانه برداشته نشود.'),
  },
  anatomie: {
    title: L('Venöse Architektur', 'Venous architecture', 'معماری وریدی'),
    lead: L('Das klassische Muster besteht aus kleinen radialen Medullarvenen, die in eine größere Sammelvene konvergieren.', 'The classic pattern consists of small radial medullary veins converging into a larger collector vein.', 'الگوی کلاسیک شامل وریدهای کوچک شعاعی مدولاری است که به یک ورید جمع‌کننده بزرگ‌تر می‌ریزند.'),
    headers: [L('Komponente', 'Component', 'جزء'), L('Morphologie', 'Morphology', 'مورفولوژی'), L('Funktion', 'Function', 'عملکرد')],
    rows: [
      [L('Medullarvenen', 'Medullary veins', 'وریدهای مدولاری'), L('Mehrere feine, sternförmig angeordnete Venen', 'Multiple fine radially arranged veins', 'وریدهای ظریف متعدد با آرایش شعاعی'), L('Sammeln das venöse Blut des Drainagegebiets', 'Collect venous blood from the drainage territory', 'جمع‌آوری خون وریدی ناحیه')],
      [L('Sammelvene', 'Collector vein', 'ورید جمع‌کننده'), L('Eine größere lineare Vene', 'A larger linear vein', 'یک ورید خطی بزرگ‌تر'), L('Drainiert oberflächlich oder tief', 'Drains into superficial or deep veins', 'تخلیه به سیستم سطحی یا عمقی')],
      [L('Caput medusae', 'Caput medusae', 'نمای سر مدوزا (Caput medusae)'), L('Konvergierendes, quallenartiges Gesamtbild', 'Converging jellyfish-like appearance', 'نمای همگرای شبیه عروس دریایی'), L('Bildgebendes Erkennungszeichen der DVA', 'Imaging hallmark of a DVA', 'نشانه تصویربرداری DVA')],
    ],
    key: L('Die Sammelvene darf nicht ligiert werden: Sie kann die einzige venöse Drainage des betroffenen Parenchyms darstellen.', 'Never ligate the collector vein: it may be the only venous outflow of the involved brain tissue.', 'ورید جمع‌کننده نباید بسته شود؛ ممکن است تنها مسیر تخلیه وریدی بافت باشد.'),
  },
  bildgebung: {
    title: L('Bildgebung: Sequenz für Sequenz', 'Imaging: sequence by sequence', 'تصویربرداری بر اساس سکانس'),
    lead: L('Kontrastverstärkte T1-Sequenzen zeigen die Architektur am deutlichsten; SWI/T2* dient besonders der Suche nach Begleitbefunden.', 'Post-contrast T1 best demonstrates the architecture; SWI/T2* is particularly important for associated findings.', 'T1 پس از کنتراست معماری را بهتر نشان می‌دهد؛ SWI/T2* برای یافتن ضایعات همراه مهم است.'),
    headers: [L('Sequenz', 'Sequence', 'سکانس'), L('Typischer Befund', 'Typical finding', 'یافته تیپیک'), L('Prüfungspunkt', 'Exam point', 'نکته آزمونی')],
    rows: [
      [L('T1/T2', 'T1/T2', 'T1/T2'), L('Oft unauffällig; lineare Flow-Voids der Sammelvene möglich', 'Often normal; linear flow voids of the collector may be seen', 'اغلب طبیعی؛ احتمال افت سیگنال ناشی از جریان (flow void) خطی ورید جمع‌کننده'), L('Unauffällige Nativsequenzen schließen DVA nicht aus', 'Normal non-contrast sequences do not exclude DVA', 'سکانس‌های بدون کنتراست طبیعی DVA را رد نمی‌کنند')],
      [L('T1 C+', 'T1 post-contrast', 'T1 پس از کنتراست'), L('Homogene Anreicherung der radialen Venen und Sammelvene', 'Homogeneous enhancement of radial veins and collector', 'افزایش سیگنال همگن وریدهای شعاعی و جمع‌کننده پس از تزریق'), L('Caput medusae ist das charakteristische Muster', 'Caput medusae is the characteristic pattern', 'نمای سر مدوزا الگوی مشخص است')],
      [L('SWI/T2*', 'SWI/T2*', 'SWI/T2*'), L('Hypointenses venöses Gefäßmuster', 'Hypointense venous vascular pattern', 'الگوی وریدی هیپواینتنس'), L('Kavernom, Hämosiderin und Mikroblutungen suchen', 'Look for cavernoma, haemosiderin and microbleeds', 'جستجوی کاورنوم، هموسیدرین و میکروخونریزی')],
      [L('DWI/ADC', 'DWI/ADC', 'DWI/ADC'), L('Bei unkomplizierter DVA unauffällig', 'Normal in uncomplicated DVA', 'در DVA بدون عارضه طبیعی'), L('Restriktion spricht für venösen Infarkt oder andere Pathologie', 'Restriction suggests venous infarction or another pathology', 'محدودیت انتشار به نفع انفارکت وریدی یا پاتولوژی دیگر')],
      [L('CT C+', 'Contrast CT', 'CT با کنتراست'), L('Lineare bzw. sternförmige venöse Anreicherung', 'Linear or stellate venous enhancement', 'افزایش سیگنال وریدی خطی یا ستاره‌ای پس از تزریق'), L('Keine arterielle Nidus-Komponente', 'No arterial nidus', 'فاقد نیدوس شریانی')],
    ],
  },
  assoziationen: {
    title: L('Assoziierte Befunde', 'Associated findings', 'یافته‌های همراه'),
    lead: L('Der wichtigste Begleitbefund ist ein Kavernom im Drainagegebiet der DVA.', 'The most important association is a cavernoma within the DVA drainage territory.', 'مهم‌ترین همراهی، کاورنوم در قلمرو تخلیه DVA است.'),
    items: [
      { icon: '🫐', title: L('Kavernom', 'Cavernoma', 'کاورنوم'), text: L('In etwa 10–20 % beschrieben. Das Blutungsrisiko stammt häufig eher vom Kavernom als von der DVA selbst.', 'Reported in roughly 10–20%. Haemorrhagic risk often arises from the cavernoma rather than the DVA itself.', 'در حدود ۱۰ تا ۲۰٪؛ خطر خونریزی اغلب بیشتر از کاورنوم است تا خود DVA.') },
      { icon: '🩸', title: L('Mikroblutungen / Hämosiderin', 'Microbleeds / haemosiderin', 'میکروخونریزی / هموسیدرین'), text: L('SWI kann kleine Blutungsresiduen im Drainagegebiet sichtbar machen.', 'SWI may reveal small haemorrhagic residues in the drainage territory.', 'SWI می‌تواند بقایای کوچک خونریزی را در قلمرو تخلیه نشان دهد.') },
      { icon: '🌫️', title: L('Parenchymveränderungen', 'Parenchymal changes', 'تغییرات پارانشیم'), text: L('Selten T2/FLAIR-Signalsteigerung, Atrophie oder Verkalkung bei chronischer venöser Stauung.', 'Rare T2/FLAIR hyperintensity, atrophy or calcification from chronic venous congestion.', 'به‌ندرت افزایش سیگنال T2/FLAIR، آتروفی یا کلسیفیکاسیون ناشی از احتقان مزمن وریدی.') },
    ],
    cave: L('Bei einem „symptomatischen DVA-Fall“ zuerst nach Kavernom, Thrombose, Abflussstenose oder venösem Infarkt suchen.', 'In a “symptomatic DVA”, first look for a cavernoma, thrombosis, outflow stenosis or venous infarction.', 'در DVA علامت‌دار ابتدا کاورنوم، ترومبوز، تنگی خروجی یا انفارکت وریدی را جستجو کنید.'),
  },
  komplikationen: {
    title: L('Seltene Komplikationen', 'Rare complications', 'عوارض نادر'),
    lead: L('Eine isolierte unkomplizierte DVA ist benign. Komplikationen entstehen durch gestörten venösen Abfluss oder Begleitläsionen.', 'An isolated uncomplicated DVA is benign. Complications result from impaired venous outflow or associated lesions.', 'DVA منفرد و بدون عارضه خوش‌خیم است؛ عوارض از اختلال خروج وریدی یا ضایعات همراه ناشی می‌شوند.'),
    headers: [L('Komplikation', 'Complication', 'عارضه'), L('Bildgebung', 'Imaging', 'تصویربرداری'), L('Mechanismus', 'Mechanism', 'مکانیسم')],
    rows: [
      [L('Thrombose der Sammelvene', 'Collector-vein thrombosis', 'ترومبوز ورید جمع‌کننده'), L('Fehlende/verminderte Kontrastierung, T1-Signal, Suszeptibilität', 'Absent/reduced enhancement, T1 signal, susceptibility', 'کاهش/فقدان کنتراست، سیگنال T1، اثر حساسیت مغناطیسی'), L('Akute Abflussobstruktion', 'Acute outflow obstruction', 'انسداد حاد خروجی')],
      [L('Venöser Infarkt', 'Venous infarction', 'انفارکت وریدی'), L('Ödem, DWI-Veränderung, ggf. Hämorrhagie', 'Oedema, DWI abnormality, possible haemorrhage', 'ادم، تغییر DWI، احتمال خونریزی'), L('Venöse Hypertension und Stauung', 'Venous hypertension and congestion', 'فشار و احتقان وریدی')],
      [L('Blutung', 'Haemorrhage', 'خونریزی'), L('Parenchymblutung oder Hämosiderin', 'Parenchymal haemorrhage or haemosiderin', 'خونریزی پارانشیمی یا هموسیدرین'), L('Oft assoziiertes Kavernom statt isolierter DVA', 'Often an associated cavernoma rather than the DVA alone', 'اغلب ناشی از کاورنوم همراه نه خود DVA')],
      [L('Mechanische Kompression', 'Mechanical compression', 'فشار مکانیکی'), L('Große Sammelvene an Aquädukt oder Hirnnerv', 'Large collector near aqueduct or cranial nerve', 'ورید بزرگ کنار آکوئداکت یا عصب مغزی'), L('Seltene lokale Masseneinwirkung', 'Rare local mass effect', 'اثر فشاری موضعی نادر')],
    ],
  },
  differenzial: {
    title: L('Differenzialdiagnose', 'Differential diagnosis', 'تشخیص افتراقی'),
    lead: L('Die zentrale Frage lautet: reine venöse Drainagevariante oder echte Shunt-/Blutungsmalformation?', 'The central question is whether this is a venous drainage variant or a true shunting/haemorrhagic malformation.', 'پرسش اصلی: واریانت تخلیه وریدی یا مالفورماسیون واقعی شانت‌دار/خونریزی‌دهنده؟'),
    headers: [L('Diagnose', 'Diagnosis', 'تشخیص'), L('Abgrenzung', 'Distinction', 'افتراق')],
    rows: [
      [L('Arteriovenöse Malformation', 'Arteriovenous malformation', 'AVM'), L('Arterielle Zuflüsse, Nidus und frühe venöse Drainage; bei DVA kein Shunt', 'Arterial feeders, nidus and early venous drainage; no shunt in DVA', 'فیدر شریانی، نیدوس و تخلیه زودرس وریدی؛ در DVA شانت وجود ندارد')],
      [L('Durale AV-Fistel', 'Dural AV fistula', 'dAVF'), L('Durale Shuntstelle und häufig retrograder kortikaler Venenfluss', 'Dural shunt point and often retrograde cortical venous flow', 'محل شانت دورال و اغلب جریان رتروگراد ورید کورتیکال')],
      [L('Kavernom', 'Cavernoma', 'کاورنوم'), L('Popcorn-Läsion mit Hämosiderinring und ohne prominente Zuflussgefäße', 'Popcorn lesion with haemosiderin rim and no prominent feeding vessels', 'ضایعه پاپ‌کورنی با حلقه هموسیدرین و بدون عروق تغذیه‌کننده برجسته')],
      [L('Kapilläre Teleangiektasie', 'Capillary telangiectasia', 'تلانژکتازی مویرگی'), L('Pinselartige schwache Anreicherung, häufig im Pons, ohne Sammelvenenarchitektur', 'Brush-like faint enhancement, often pontine, without collector architecture', 'افزایش ظریف برس‌مانند، اغلب در پونز، بدون معماری ورید جمع‌کننده')],
      [L('Normale kortikale Vene', 'Normal cortical vein', 'ورید کورتیکال طبیعی'), L('Keine radial konvergierenden Medullarvenen', 'No radially converging medullary veins', 'فاقد وریدهای مدولاری شعاعی همگرا')],
    ],
  },
  fall: {
    title: L('Fallbeispiele', 'Cases', 'نمونه کیس‌ها'),
    lead: L('Echter MRT-Fall rID 91621 einer rechts-zerebellären DVA.', 'Real MRI case rID 91621 of a right cerebellar DVA.', 'مورد واقعی MRI با شناسه rID 91621 از DVA مخچه راست.'),
    caseTitle: L('Rechts-zerebelläre DVA', 'Right cerebellar DVA', 'DVA مخچه راست'),
    caseLabel: 'DVA',
    caseMeta: L('35-jährige Patientin mit Kopfschmerzen. Zahlreiche kleine Venen im rechten Kleinhirn konvergieren in eine Sammelvene mit Drainage zum Torcular; kein assoziiertes Kavernom.', '35-year-old woman with headaches. Numerous small veins in the right cerebellum converge into a collector draining to the torcular; no associated cavernoma.', 'خانم ۳۵ ساله با سردرد؛ وریدهای متعدد کوچک در مخچه راست به ورید جمع‌کننده با تخلیه به تورکولار همگرا می‌شوند؛ کاورنوم همراه وجود ندارد.'),
    images: [
      { src: '/dva/case-91621-t1-postcontrast-coronal.jpeg', alt: L('Koronare kontrastverstärkte T1-MRT des DVA-Falls', 'Coronal post-contrast T1 MRI of the DVA case', 'MRI کرونال T1 پس از کنتراست مورد DVA') },
      { src: '/dva/case-91621-t1-postcontrast-axial.jpeg', alt: L('Sagittale kontrastverstärkte T1-MRT des DVA-Falls', 'Sagittal post-contrast T1 MRI of the DVA case', 'MRI ساژیتال T1 پس از کنتراست مورد DVA') },
      { src: '/dva/case-91621-swi.jpeg', alt: L('Axiale MRT des DVA-Falls', 'Axial MRI of the DVA case', 'MRI محوری مورد DVA') },
    ],
    findingsTitle: L('Strukturierte Befundung', 'Structured interpretation', 'تفسیر ساختاریافته'),
    findings: [
      L('Lokalisation: rechts zerebellär.', 'Location: right cerebellar hemisphere.', 'محل: نیمکره راست مخچه.'),
      L('Morphologie: zahlreiche kleine, konvergierende Medullarvenen.', 'Morphology: numerous small converging medullary veins.', 'مورفولوژی: وریدهای کوچک متعدد مدولاری و همگرا.'),
      L('Drainage: größere Sammelvene mit Abfluss zum Torcular.', 'Drainage: larger collector vein draining to the torcular.', 'تخلیه: ورید جمع‌کننده بزرگ‌تر با خروج به تورکولار.'),
      L('Begleitbefund: kein assoziiertes Kavernom.', 'Associated finding: no cavernous malformation.', 'یافته همراه: کاورنوم وجود ندارد.'),
    ],
    diagnosis: L('Inzidentelle rechts-zerebelläre DVA mit Caput-medusae-Architektur.', 'Incidental right cerebellar DVA with caput-medusae architecture.', 'DVA اتفاقی مخچه راست با نمای سر مدوزا (Caput medusae).'),
  },
  management: {
    title: L('Management & Befundung', 'Management & reporting', 'مدیریت و گزارش'),
    lead: L('Eine typische asymptomatische DVA benötigt keine Therapie und meist keine Verlaufskontrolle.', 'A typical asymptomatic DVA requires no treatment and usually no follow-up.', 'DVA تیپیک بدون علامت نیاز به درمان و معمولاً پیگیری ندارد.'),
    items: [
      { icon: '✅', title: L('Typische DVA', 'Typical DVA', 'DVA تیپیک'), text: L('Als benigne venöse Drainagevariante benennen; keine interventionelle Empfehlung.', 'Describe as a benign venous drainage variant; do not recommend intervention.', 'به‌عنوان واریانت خوش‌خیم تخلیه وریدی گزارش شود؛ مداخله توصیه نشود.') },
      { icon: '🔎', title: L('SWI prüfen', 'Review SWI', 'بررسی SWI'), text: L('Nach Kavernom, Mikroblutungen oder Hämosiderin im Drainagegebiet suchen.', 'Look for cavernoma, microbleeds or haemosiderin in the drainage territory.', 'کاورنوم، میکروخونریزی یا هموسیدرین در قلمرو تخلیه جستجو شود.') },
      { icon: '🚨', title: L('Atypische Symptome', 'Atypical symptoms', 'علائم غیرتیپیک'), text: L('Bei Ödem, Blutung oder DWI-Läsion an Thrombose bzw. venöse Abflussstörung denken.', 'With oedema, haemorrhage or DWI abnormality, consider thrombosis or venous outflow obstruction.', 'در ادم، خونریزی یا ضایعه DWI به ترومبوز یا اختلال خروج وریدی فکر کنید.') },
      { icon: '✋', title: L('Nicht resezieren', 'Do not resect', 'رزکسیون نکنید'), text: L('Die Sammelvene ist funktionell notwendig; Verletzung kann einen venösen Infarkt verursachen.', 'The collector is functionally necessary; injury may cause venous infarction.', 'ورید جمع‌کننده ضروری است و آسیب آن می‌تواند انفارکت وریدی ایجاد کند.') },
    ],
    cave: L('Bei Operation einer benachbarten Läsion die funktionell notwendige venöse Drainage einschließlich Sammelvene erhalten und die individuelle Anatomie berücksichtigen.', 'When operating on an adjacent lesion, preserve essential venous drainage including the collector and account for individual anatomy.', 'در جراحی ضایعهٔ مجاور، تخلیهٔ وریدی ضروری از جمله ورید جمع‌کننده حفظ و آناتومی فردی لحاظ شود.'),
  },
  takehome: {
    title: 'TAKE HOME MESSAGE',
    lead: L('Die sechs prüfungsentscheidenden Punkte.', 'Six exam-critical points.', 'شش نکته کلیدی آزمون.'),
    items: [
      { title: L('Normvariante, kein Shunt', 'Normal variant, no shunt', 'واریانت طبیعی، بدون شانت'), text: L('DVA ist eine persistierende venöse Drainage, keine AVM.', 'A DVA is persistent venous drainage, not an AVM.', 'DVA تخلیه وریدی پایدار است، نه AVM.') },
      { title: 'Caput medusae', text: L('Radiale Medullarvenen konvergieren in eine Sammelvene.', 'Radial medullary veins converge into a collector.', 'وریدهای مدولاری شعاعی به یک ورید جمع‌کننده همگرا می‌شوند.') },
      { title: L('T1 C+ zeigt es am besten', 'Best seen on post-contrast T1', 'بهترین نمایش در T1 پس از کنتراست'), text: L('Homogene Anreicherung der venösen Architektur.', 'Homogeneous enhancement of the venous architecture.', 'افزایش همگن معماری وریدی.') },
      { title: L('SWI nach Kavernom prüfen', 'Check SWI for cavernoma', 'SWI برای کاورنوم'), text: L('Der wichtigste Begleitbefund erklärt viele Blutungen.', 'The key association explains many haemorrhages.', 'مهم‌ترین همراهی و علت بسیاری از خونریزی‌ها.') },
      { title: L('Symptomatisch = Komplikation suchen', 'Symptoms = seek a complication', 'علامت‌دار = جستجوی عارضه'), text: L('Thrombose, Stauung, venöser Infarkt oder Kavernom.', 'Thrombosis, congestion, venous infarction or cavernoma.', 'ترومبوز، احتقان، انفارکت وریدی یا کاورنوم.') },
      { title: L('Sammelvene erhalten', 'Preserve the collector', 'حفظ ورید جمع‌کننده'), text: L('Ligatur oder Resektion kann einen venösen Infarkt auslösen.', 'Ligation or resection may cause venous infarction.', 'بستن یا رزکسیون می‌تواند انفارکت وریدی ایجاد کند.') },
    ],
  },
}

const DVA_Q = [
  {
    "id": "01",
    "question": {
      "de": "Welcher Befund ist am charakteristischsten für eine DVA?",
      "en": "Which finding is most characteristic of a DVA?",
      "fa": "کدام یافته بیشترین تطابق را با DVA دارد؟"
    },
    "options": [
      {
        "de": "Radial konvergierende, anreichernde Medullarvenen mit Sammelvene",
        "en": "Radially converging enhancing medullary veins with a collector",
        "fa": "وریدهای مدولاری شعاعیِ همگرا با افزایش سیگنال پس از تزریق با ورید جمع‌کننده"
      },
      {
        "de": "Kompakter arterieller Nidus mit früher venöser Drainage",
        "en": "Compact arterial nidus with early venous drainage",
        "fa": "نیدوس شریانی فشرده با تخلیه زودرس وریدی"
      },
      {
        "de": "Popcorn-Läsion mit komplettem Hämosiderinring",
        "en": "Popcorn lesion with a complete haemosiderin rim",
        "fa": "ضایعه پاپ‌کورنی با حلقه کامل هموسیدرین"
      },
      {
        "de": "Pinselartige pontine Kontrastmittelaufnahme",
        "en": "Brush-like pontine enhancement",
        "fa": "افزایش برس‌مانند پونز"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Das Caput-medusae-Muster aus konvergierenden Medullarvenen und Sammelvene ist das Kennzeichen der DVA.",
      "en": "The caput-medusae pattern of converging medullary veins and a collector is the hallmark of DVA.",
      "fa": "الگوی نمای سر مدوزا (Caput medusae) از وریدهای مدولاری همگرا و ورید جمع‌کننده مشخصه DVA است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein Nidus mit früher Vene beschreibt eine AV-Shuntläsion, nicht das typische venöse Sammelmuster.",
        "en": "A nidus with an early vein describes an AV shunt rather than the typical venous collection pattern.",
        "fa": "نیدوس با ورید زودرس ضایعهٔ شانت‌دار را توصیف می‌کند، نه الگوی جمع‌شدن وریدی تیپیک."
      },
      "C": {
        "de": "Dieses Blutproduktmuster passt zu einem Kavernom; eine DVA ist eine venöse Architektur.",
        "en": "This blood-product pattern fits cavernoma; a DVA is venous architecture.",
        "fa": "این الگوی فرآوردهٔ خونی با کاورنوم سازگار است؛ DVA معماری وریدی است."
      },
      "D": {
        "de": "Pinselartige pontine Aufnahme weist eher auf eine kapilläre Teleangiektasie als auf radial konvergierende Venen.",
        "en": "Brush-like pontine enhancement suggests capillary telangiectasia rather than radially converging veins.",
        "fa": "افزایش سیگنال برس‌مانند پونز پس از تزریق بیشتر تلانژکتازی مویرگی را مطرح می‌کند تا وریدهای همگرای شعاعی."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "02",
    "question": {
      "de": "Welche Aussage beschreibt eine DVA am besten?",
      "en": "Which statement best describes a DVA?",
      "fa": "کدام عبارت DVA را بهتر توصیف می‌کند؟"
    },
    "options": [
      {
        "de": "Variante der venösen Drainage ohne arteriovenösen Shunt",
        "en": "A venous drainage variant without an arteriovenous shunt",
        "fa": "واریانت تخلیهٔ وریدی بدون شانت شریانی‌وریدی"
      },
      {
        "de": "Arteriovenöse Shuntmalformation mit venösem Abfluss",
        "en": "An arteriovenous shunting malformation with venous outflow",
        "fa": "مالفورماسیون شانت شریانی‌وریدی با خروج وریدی"
      },
      {
        "de": "Thrombotisch verschlossene Kortikalvene mit Kollateralen",
        "en": "A thrombosed cortical vein with collateral drainage",
        "fa": "ورید کورتیکال ترومبوزه همراه تخلیهٔ کولترال"
      },
      {
        "de": "Erworbene Kollateralvene bei Sinusvenenthrombose",
        "en": "An acquired collateral vein in venous sinus thrombosis",
        "fa": "ورید کولترال اکتسابی در ترومبوز سینوس وریدی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Eine DVA ist persistierende embryonale Drainage von normalem Hirngewebe und keine Shuntmalformation.",
      "en": "A DVA is persistent embryonic drainage of normal brain tissue, not a shunting malformation.",
      "fa": "DVA تخلیه جنینی پایدار بافت طبیعی مغز است، نه مالفورماسیون شانت‌دار."
    },
    "wrongExplanations": {
      "B": {
        "de": "Eine isolierte DVA ist keine Shuntläsion; ein zusätzlicher AV-Shunt wäre gesondert zu charakterisieren.",
        "en": "An isolated DVA is not a shunting lesion; an additional AV shunt requires separate characterization.",
        "fa": "DVA منفرد شانت نیست؛ شانت اضافه به بررسی جداگانه نیاز دارد."
      },
      "C": {
        "de": "Ein Verschluss mit neuem Kollateralnetz wäre eine erworbene Abflussstörung, nicht die Definition einer DVA.",
        "en": "Occlusion with new collateral drainage is an acquired outflow disorder rather than the definition of a DVA.",
        "fa": "انسداد همراه کولترال جدید اختلال اکتسابی خروج است، نه تعریف DVA."
      },
      "D": {
        "de": "Eine DVA ist eine entwicklungsbedingte Drainagevariante; sie darf nicht ohne Verschlussnachweis als Sinusthrombose-Kollaterale bezeichnet werden.",
        "en": "A DVA is a developmental drainage variant; it should not be called a sinus-thrombosis collateral without evidence of occlusion.",
        "fa": "DVA واریانت تخلیهٔ تکاملی است؛ بدون شواهد انسداد نباید کولترال ترومبوز سینوس نامیده شود."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "03",
    "question": {
      "de": "Zur Operationsplanung eines benachbarten Kavernoms soll die feine DVA-Architektur vollständig erfasst werden. Welche Sequenz ist hier die bevorzugte Referenz für die detaillierte venöse Architektur?",
      "en": "For surgery planning of an adjacent cavernoma, detailed DVA architecture needs to be mapped. Which sequence is the preferred reference for detailed venous architecture here?",
      "fa": "برای برنامه‌ریزی جراحی کاورنوم مجاور، معماری ظریف DVA باید ترسیم شود. کدام سکانس در اینجا مرجع ترجیحی برای معماری دقیق وریدی است؟"
    },
    "options": [
      {
        "de": "T1 nach intravenösem Kontrastmittel",
        "en": "T1 after intravenous contrast",
        "fa": "T1 پس از تزریق وریدی مادهٔ حاجب"
      },
      {
        "de": "Suszeptibilitätsgewichtete Bildgebung ohne Kontrastmittel",
        "en": "Noncontrast susceptibility-weighted imaging",
        "fa": "تصویربرداری حساس به سوسپتیبیلیتی بدون کنتراست"
      },
      {
        "de": "Arterielle TOF-MRA ohne Kontrastmittel",
        "en": "Noncontrast arterial TOF MRA",
        "fa": "TOF-MRA شریانی بدون کنتراست"
      },
      {
        "de": "Diffusionsgewichtete Bildgebung mit ADC-Karte",
        "en": "Diffusion-weighted imaging with ADC map",
        "fa": "تصویربرداری انتشار همراه نقشهٔ ADC"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Kontrastverstärkte T1 ist eine etablierte Referenz für die venöse Konnektivität. SWI ergänzt die Suche nach Kavernom und Blutungsresiduen, kann aber kleine DVA-Gefäße übersehen; die Methoden sind nicht austauschbar.",
      "en": "Contrast-enhanced T1 is an established reference for venous connectivity. SWI complements assessment for cavernoma and haemorrhagic residues but may miss small DVA vessels; the methods are not interchangeable.",
      "fa": "T1 پس از تزریق مرجع شناخته‌شده‌ای برای ارتباطات وریدی است. SWI جست‌وجوی کاورنوم و بقایای خونریزی را تکمیل می‌کند ولی ممکن است عروق کوچک DVA را نشان ندهد؛ این روش‌ها جایگزین هم نیستند."
    },
    "wrongExplanations": {
      "B": {
        "de": "SWI ist wichtig für Begleitläsionen, kann kleine DVA-Gefäße jedoch übersehen und ersetzt die kontrastverstärkte Architekturbeurteilung nicht sicher.",
        "en": "SWI is useful for associated lesions but can miss small DVA vessels and does not reliably replace contrast-enhanced architectural mapping.",
        "fa": "SWI برای ضایعات همراه مهم است ولی ممکن است عروق کوچک DVA را نشان ندهد و جای ترسیم معماری پس از تزریق را با اطمینان نمی‌گیرد."
      },
      "C": {
        "de": "Arterielle TOF untersucht vor allem arteriellen Fluss; sie ist nicht die hier gesuchte venöse postkontrast Referenz.",
        "en": "Arterial TOF primarily assesses arterial flow; it is not the requested venous postcontrast reference.",
        "fa": "TOF شریانی عمدتاً جریان شریانی را بررسی می‌کند و مرجع وریدی پس از تزریق مورد پرسش نیست."
      },
      "D": {
        "de": "DWI/ADC prüft Gewebediffusion und mögliche Infarktkomplikationen, nicht die detaillierte kontrastierte Venenarchitektur.",
        "en": "DWI/ADC assesses tissue diffusion and possible infarction complications rather than detailed enhanced venous architecture.",
        "fa": "DWI/ADC انتشار بافت و عارضهٔ احتمالی انفارکت را ارزیابی می‌کند، نه معماری ظریف وریدهای پس از تزریق."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/40512378/"
  },
  {
    "id": "04",
    "question": {
      "de": "Bei einer DVA fällt auf SWI eine separate rundliche Läsion mit Hämosiderinrand auf; T2 zeigt einen retikulär gemischten Kern. Welche Begleitläsion ist am ehesten gemeint?",
      "en": "Near a DVA, SWI shows a separate rounded lesion with a haemosiderin rim, while T2 shows a mixed reticular core. Which associated lesion is most likely?",
      "fa": "نزدیک DVA، در SWI ضایعهٔ گرد جداگانه با حاشیهٔ هموسیدرین دیده می‌شود و T2 هستهٔ رتیکولار با سیگنال مختلط نشان می‌دهد. محتمل‌ترین ضایعهٔ همراه چیست؟"
    },
    "options": [
      {
        "de": "Kavernöse Malformation",
        "en": "Cavernous malformation",
        "fa": "مالفورماسیون کاورنوس"
      },
      {
        "de": "Thrombose der Sammelvene",
        "en": "Collector-vein thrombosis",
        "fa": "ترومبوز ورید جمع‌کننده"
      },
      {
        "de": "Kompakte arteriovenöse Malformation",
        "en": "Compact arteriovenous malformation",
        "fa": "مالفورماسیون شریانی‌وریدی فشرده"
      },
      {
        "de": "Kapilläre Teleangiektasie",
        "en": "Capillary telangiectasia",
        "fa": "تلانژکتازی مویرگی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ein assoziiertes Kavernom kann Blutungsereignisse erklären; im Drainagegebiet und auf blutproduktsensitiven Sequenzen gezielt danach suchen.",
      "en": "An associated cavernoma can explain haemorrhagic events; search the drainage territory and blood-product-sensitive sequences carefully.",
      "fa": "کاورنوم همراه می‌تواند رویدادهای خونریزی را توضیح دهد؛ در قلمرو تخلیه و سکانس‌های حساس به فرآورده‌های خونی هدفمند جست‌وجو شود."
    },
    "wrongExplanations": {
      "B": {
        "de": "Eine Venenthrombose folgt dem betroffenen Gefäß; ein separater retikulärer Kern mit Hämosiderinrand passt eher zum Kavernom.",
        "en": "Venous thrombosis follows the affected vessel; a separate reticular core with a haemosiderin rim favours cavernoma.",
        "fa": "ترومبوز وریدی از مسیر رگ پیروی می‌کند؛ هستهٔ رتیکولار جداگانه با حاشیهٔ هموسیدرین بیشتر به نفع کاورنوم است."
      },
      "C": {
        "de": "Für eine AVM wären Nidus, arterielle Feeder und Shuntzeichen zu beurteilen; beschrieben ist ein Blutproduktkern.",
        "en": "An AVM requires assessment of nidus, feeders and shunting; a blood-product core is described here.",
        "fa": "برای AVM نیدوس، فیدر و نشانهٔ شانت بررسی می‌شوند؛ اینجا هستهٔ فرآورده‌های خونی توصیف شده است."
      },
      "D": {
        "de": "Eine Teleangiektasie zeigt typischerweise kein retikuläres Popcorn-Muster mit vollständigem Hämosiderinrand.",
        "en": "Telangiectasia does not typically produce a reticular popcorn-like core with a complete haemosiderin rim.",
        "fa": "تلانژکتازی معمولاً هستهٔ رتیکولار پاپ‌کورنی با حاشیهٔ کامل هموسیدرین ایجاد نمی‌کند."
      }
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12680281/"
  },
  {
    "id": "05",
    "question": {
      "de": "Bei einer asymptomatischen erwachsenen Person findet sich eine typische DVA ohne Kavernom, Blutung, Ödem oder Shuntverdacht. Welche Empfehlung passt?",
      "en": "An asymptomatic adult has a typical DVA without cavernoma, haemorrhage, oedema or suspected shunting. Which recommendation fits?",
      "fa": "در بزرگسال بدون علامت، DVA تیپیک بدون کاورنوم، خونریزی، ادم یا شک به شانت یافت می‌شود. کدام توصیه مناسب است؟"
    },
    "options": [
      {
        "de": "Befund dokumentieren; aus dieser DVA allein keine Behandlung oder invasive Routinekontrolle ableiten",
        "en": "Document the finding; this DVA alone does not indicate treatment or routine invasive follow-up",
        "fa": "یافته ثبت شود؛ این DVA به‌تنهایی اندیکاسیون درمان یا پیگیری تهاجمی روتین نیست"
      },
      {
        "de": "Jährliche kontrastverstärkte MRT zur Überwachung einer erwarteten DVA-Progression",
        "en": "Annual contrast-enhanced MRI to monitor expected DVA progression",
        "fa": "MRI سالانه پس از تزریق برای پایش پیشرفت مورد انتظار DVA"
      },
      {
        "de": "DSA zur routinemäßigen Bestätigung trotz eindeutiger MRT-Morphologie",
        "en": "Routine confirmatory DSA despite unequivocal MRI morphology",
        "fa": "DSA تأییدی روتین با وجود مورفولوژی واضح MRI"
      },
      {
        "de": "Regelmäßige MR-Venografie zur Kontrolle eines vermuteten chronischen Sinusverschlusses",
        "en": "Regular MR venography to monitor presumed chronic sinus occlusion",
        "fa": "MR-ونوگرافی منظم برای پایش انسداد مزمن فرضی سینوس"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Eine typische asymptomatische DVA benötigt weder Therapie noch routinemäßige invasive Kontrolle.",
      "en": "A typical asymptomatic DVA needs neither treatment nor routine invasive follow-up.",
      "fa": "DVA تیپیک بدون علامت نیاز به درمان یا پیگیری تهاجمی روتین ندارد."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die typische asymptomatische DVA ist meist stabil und benign; aus diesem isolierten Befund folgt keine erwartete Progression mit jährlicher Kontrollpflicht.",
        "en": "Typical asymptomatic DVA is generally stable and benign; this isolated finding does not imply expected progression requiring annual surveillance.",
        "fa": "DVA تیپیکِ بدون علامت معمولاً پایدار و خوش‌خیم است؛ این یافتهٔ منفرد به معنای پیشرفت مورد انتظار و الزام پایش سالانه نیست."
      },
      "C": {
        "de": "Ohne Shuntverdacht oder atypischen Befund ergibt sich aus der eindeutigen MRT keine Routineindikation zur invasiven Bestätigung.",
        "en": "Without suspected shunting or atypical findings, unequivocal MRI does not indicate routine invasive confirmation.",
        "fa": "بدون شک به شانت یا یافتهٔ غیرتیپیک، MRI واضح اندیکاسیون تأیید تهاجمی روتین ایجاد نمی‌کند."
      },
      "D": {
        "de": "Ein chronischer Sinusverschluss ist nicht beschrieben. Die DVA darf nicht ohne weitere Hinweise als Verschlusskollaterale umgedeutet werden.",
        "en": "No chronic sinus occlusion is described. A DVA should not be reclassified as an occlusion collateral without additional evidence.",
        "fa": "انسداد مزمن سینوس توصیف نشده است؛ DVA بدون شواهد اضافه نباید کولترال انسداد تلقی شود."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/19390075/"
  },
  {
    "id": "06",
    "question": {
      "de": "Eine DVA liegt am Rand einer zu operierenden Läsion. Welche funktionelle Information muss die Planung besonders berücksichtigen?",
      "en": "A DVA lies at the edge of a lesion scheduled for surgery. Which functional information particularly matters for planning?",
      "fa": "DVA در حاشیهٔ ضایعه‌ای قرار دارد که برای جراحی برنامه‌ریزی شده است. کدام اطلاعات عملکردی به‌ویژه در برنامه‌ریزی مهم است؟"
    },
    "options": [
      {
        "de": "Die Sammelvene kann den wesentlichen venösen Abfluss normalen Hirngewebes bilden",
        "en": "The collector may form the essential venous outflow of normal brain tissue",
        "fa": "ورید جمع‌کننده ممکن است مسیر اصلی خروج وریدی بافت طبیعی مغز باشد"
      },
      {
        "de": "Die Sammelvene ist nur ein zusätzlicher entbehrlicher Abfluss des Operationsbefunds",
        "en": "The collector is only an expendable accessory outflow of the surgical lesion",
        "fa": "ورید جمع‌کننده صرفاً مسیر فرعی و قابل حذفِ خروج از ضایعهٔ جراحی است"
      },
      {
        "de": "Die Sammelvene drainiert nur das Kavernom, nicht das benachbarte Parenchym",
        "en": "The collector drains only the cavernoma rather than surrounding parenchyma",
        "fa": "ورید جمع‌کننده فقط کاورنوم و نه پارانشیم مجاور را تخلیه می‌کند"
      },
      {
        "de": "Die Sammelvene ersetzt eine arterielle Zuflussbahn der benachbarten Läsion",
        "en": "The collector replaces an arterial inflow route to the adjacent lesion",
        "fa": "ورید جمع‌کننده جای مسیر ورودی شریانی ضایعهٔ مجاور را می‌گیرد"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Verletzung oder Ligatur kann eine akute venöse Stauung und einen venösen Infarkt verursachen.",
      "en": "Injury or ligation can cause acute venous congestion and venous infarction.",
      "fa": "آسیب یا بستن آن می‌تواند احتقان حاد وریدی و انفارکت وریدی ایجاد کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die DVA ist nicht nur ein entbehrlicher Tumorabfluss; ihre Verletzung kann normales Parenchym venös gefährden.",
        "en": "The DVA is not merely expendable lesion drainage; injury can jeopardize venous outflow of normal tissue.",
        "fa": "DVA صرفاً خروج قابل حذفِ ضایعه نیست؛ آسیب به آن می‌تواند خروج وریدی بافت طبیعی را به خطر بیندازد."
      },
      "C": {
        "de": "Die DVA drainiert auch normales Parenchym; ein benachbartes Kavernom macht die Sammelvene nicht verzichtbar.",
        "en": "The DVA also drains normal parenchyma; an adjacent cavernoma does not make the collector expendable.",
        "fa": "DVA بافت طبیعی را نیز تخلیه می‌کند؛ کاورنوم مجاور ورید جمع‌کننده را قابل حذف نمی‌کند."
      },
      "D": {
        "de": "Die Sammelvene führt Blut ab; sie ist keine arterielle Zuflussbahn.",
        "en": "The collector provides venous outflow rather than arterial inflow.",
        "fa": "ورید جمع‌کننده مسیر خروج وریدی است، نه ورود شریانی."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "07",
    "question": {
      "de": "Bei bekannter DVA treten neue fokale Ausfälle auf. Welche Konstellation macht eine venöse Abflusskomplikation besonders verdächtig?",
      "en": "New focal deficits develop in a patient with a known DVA. Which pattern particularly raises concern for a venous outflow complication?",
      "fa": "در بیمار با DVA شناخته‌شده، نقص کانونی جدید ایجاد می‌شود. کدام الگو به‌ویژه شک به عارضهٔ خروج وریدی ایجاد می‌کند؟"
    },
    "options": [
      {
        "de": "Neues Ödem und ADC-Abfall im Drainagegebiet bei verminderter Füllung der Sammelvene",
        "en": "New oedema and low ADC in the drainage territory with reduced collector filling",
        "fa": "ادم جدید و ADC پایین در قلمرو تخلیه همراه کاهش پرشدن ورید جمع‌کننده"
      },
      {
        "de": "Unverändert durchgängige Sammelvene ohne neue Parenchymveränderung",
        "en": "Unchanged patent collector without new parenchymal abnormality",
        "fa": "ورید جمع‌کنندهٔ باز و بدون تغییر، بدون یافتهٔ جدید پارانشیمی"
      },
      {
        "de": "Stabiles kleines Kavernom ohne neue Blutungs- oder Ödemzeichen",
        "en": "Stable small cavernoma without new haemorrhage or oedema",
        "fa": "کاورنوم کوچک پایدار بدون نشانهٔ جدید خونریزی یا ادم"
      },
      {
        "de": "Unveränderte radiale Venen mit regelrechter venöser Kontrastierung",
        "en": "Unchanged radial veins with normal venous enhancement",
        "fa": "وریدهای شعاعی بدون تغییر با افزایش سیگنال طبیعی پس از تزریق در فاز وریدی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ödem, Diffusionsstörung oder Blutung im Drainagegebiet erfordern die Suche nach Thrombose oder Abflussobstruktion.",
      "en": "Oedema, diffusion abnormality or haemorrhage in the drainage territory requires evaluation for thrombosis or outflow obstruction.",
      "fa": "ادم، اختلال انتشار یا خونریزی در قلمرو تخلیه نیازمند بررسی ترومبوز یا انسداد خروجی است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein stabiler offener Abfluss ohne neues Parenchymsignal stützt die hier gefragte akute Abflusskomplikation nicht.",
        "en": "Stable patent outflow without new tissue signal does not support the acute outflow complication asked for.",
        "fa": "خروج باز و پایدار بدون سیگنال جدید بافتی از عارضهٔ حاد خروج مورد پرسش حمایت نمی‌کند."
      },
      "C": {
        "de": "Ein stabiles Kavernom ohne neue Blutungszeichen erklärt keine neue Abflussstörung der Sammelvene.",
        "en": "A stable cavernoma without new haemorrhage does not establish a new collector outflow disorder.",
        "fa": "کاورنوم پایدار بدون خونریزی جدید اختلال خروج جدیدِ ورید جمع‌کننده را ثابت نمی‌کند."
      },
      "D": {
        "de": "Regelrechte unveränderte Kontrastierung spricht für erhaltenen Abfluss; neue Stauungsfolgen sind nicht beschrieben.",
        "en": "Normal unchanged enhancement supports preserved outflow; new congestion effects are not described.",
        "fa": "افزایش سیگنال طبیعی و بدون تغییر پس از تزریق از حفظ خروج حمایت می‌کند؛ پیامد جدید احتقان توصیف نشده است."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "08",
    "question": {
      "de": "Welche zusätzliche Gefäßarchitektur spricht gegen eine isolierte unkomplizierte DVA und für eine AVM?",
      "en": "Which additional vascular architecture argues against an isolated uncomplicated DVA and for an AVM?",
      "fa": "کدام معماری عروقی اضافه برخلاف DVA منفردِ بدون عارضه و به نفع AVM است؟"
    },
    "options": [
      {
        "de": "Arterieller Nidus mit früher venöser Drainage",
        "en": "An arterial nidus with early venous drainage",
        "fa": "نیدوس شریانی با تخلیه زودرس وریدی"
      },
      {
        "de": "Eine größere Sammelvene",
        "en": "A larger collector vein",
        "fa": "یک ورید جمع‌کننده بزرگ‌تر"
      },
      {
        "de": "Lineare Kontrastmittelaufnahme",
        "en": "Linear enhancement",
        "fa": "افزایش خطی کنتراست"
      },
      {
        "de": "Hypointense Gefäße in SWI",
        "en": "Hypointense vessels on SWI",
        "fa": "عروق هیپواینتنس در SWI"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ein kompakter Nidus mit arteriellen Feedern und früher venöser Füllung spricht für eine AV-Shuntläsion wie AVM. Eine isolierte unkomplizierte DVA zeigt diese Architektur nicht; selten kann eine DVA mit einem zusätzlichen Shunt verbunden sein.",
      "en": "A compact nidus with arterial feeders and early venous filling supports an AV shunting lesion such as AVM. An isolated uncomplicated DVA lacks this architecture; rarely, a DVA may be associated with an additional shunt.",
      "fa": "نیدوس فشرده همراه فیدرهای شریانی و پرشدن زودرس وریدی به نفع ضایعهٔ شانت‌دار مانند AVM است. DVA منفردِ بدون عارضه این معماری را ندارد؛ به‌ندرت DVA ممکن است با شانت اضافه همراه باشد."
    },
    "wrongExplanations": {
      "B": {
        "de": "Eine Sammelvene allein ist Teil einer DVA und belegt keinen AV-Shunt.",
        "en": "A collector alone is part of DVA and does not establish an AV shunt.",
        "fa": "ورید جمع‌کننده به‌تنهایی بخشی از DVA است و شانت را ثابت نمی‌کند."
      },
      "C": {
        "de": "Lineare venöse Kontrastierung kann bei DVA vorkommen; entscheidend sind Nidus und frühe venöse Füllung.",
        "en": "Linear venous enhancement can occur in DVA; nidus and early venous filling are decisive here.",
        "fa": "افزایش سیگنال خطی وریدی پس از تزریق در DVA ممکن است؛ نیدوس و پرشدن زودرس وریدی اینجا تعیین‌کننده‌اند."
      },
      "D": {
        "de": "Venöse SWI-Hypointensität zeigt Suszeptibilität, nicht allein einen arteriovenösen Shunt.",
        "en": "Venous SWI hypointensity reflects susceptibility rather than establishing an AV shunt by itself.",
        "fa": "هیپوسیگنال وریدی SWI سوسپتیبیلیتی را نشان می‌دهد و به‌تنهایی شانت را ثابت نمی‌کند."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "09",
    "question": {
      "de": "Welche Rolle hat SWI bei DVA?",
      "en": "What is the role of SWI in DVA?",
      "fa": "نقش SWI در DVA چیست؟"
    },
    "options": [
      {
        "de": "Venöse Suszeptibilität und begleitende Kavernome oder Blutungsresiduen beurteilen",
        "en": "Assess venous susceptibility and associated cavernomas or haemorrhagic residues",
        "fa": "ارزیابی سوسپتیبیلیتی وریدی و کاورنوم یا بقایای خونریزی همراه"
      },
      {
        "de": "Arterielle Zuflüsse zeitaufgelöst und frühe venöse Füllung voneinander trennen",
        "en": "Separate arterial inflow from early venous filling with temporal resolution",
        "fa": "تفکیک ورود شریانی از پرشدن زودرس وریدی با تفکیک زمانی"
      },
      {
        "de": "Die Richtung und Geschwindigkeit des venösen Flusses quantitativ messen",
        "en": "Quantitatively measure direction and velocity of venous flow",
        "fa": "اندازه‌گیری کمی جهت و سرعت جریان وریدی"
      },
      {
        "de": "Die Permeabilität der Blut-Hirn-Schranke quantitativ bestimmen",
        "en": "Quantitatively determine blood–brain barrier permeability",
        "fa": "تعیین کمی نفوذپذیری سد خونی‌ـ‌مغزی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "SWI zeigt venöse Suszeptibilität und ist besonders wertvoll für begleitende Kavernome und Blutungsresiduen.",
      "en": "SWI shows venous susceptibility and is especially valuable for associated cavernomas and haemorrhagic residues.",
      "fa": "SWI اثر حساسیت مغناطیسی وریدها را نشان می‌دهد و برای کاورنوم همراه و بقایای خونریزی ارزشمند است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die zeitliche Trennung arterieller und venöser Füllung verlangt zeitaufgelöste Angiografie; SWI allein liefert diese Dynamik nicht.",
        "en": "Temporal separation of arterial and venous filling requires time-resolved angiography; SWI alone does not provide that dynamic information.",
        "fa": "تفکیک زمانی پرشدن شریانی و وریدی به آنژیوگرافی با تفکیک زمانی نیاز دارد؛ SWI به‌تنهایی این پویایی را ارائه نمی‌کند."
      },
      "C": {
        "de": "Flussrichtung und Geschwindigkeit sind nicht die direkte Messgröße einer konventionellen SWI.",
        "en": "Flow direction and velocity are not the direct measurement of conventional SWI.",
        "fa": "جهت و سرعت جریان کمیت اندازه‌گیری مستقیم SWI معمول نیستند."
      },
      "D": {
        "de": "Eine Permeabilitätsmessung erfordert ein entsprechendes dynamisches Protokoll; SWI zeigt Suszeptibilität.",
        "en": "Permeability measurement requires an appropriate dynamic protocol; SWI depicts susceptibility.",
        "fa": "اندازه‌گیری نفوذپذیری به پروتکل پویای مناسب نیاز دارد؛ SWI سوسپتیبیلیتی را نشان می‌دهد."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/28667359/"
  },
  {
    "id": "10",
    "question": {
      "de": "Eine intrazerebrale Blutung liegt nahe einer DVA. Welche nächste Bildauswertung vermeidet eine vorschnelle Ursachenzuordnung?",
      "en": "An intracerebral haemorrhage lies near a DVA. Which next imaging review avoids premature attribution of the cause?",
      "fa": "خونریزی داخل مغزی نزدیک DVA قرار دارد. کدام بازبینی تصویری از نسبت‌دادن زودرس علت جلوگیری می‌کند؟"
    },
    "options": [
      {
        "de": "Nach begleitendem Kavernom und Störung des venösen Abflusses suchen",
        "en": "Look for associated cavernoma and impaired venous outflow",
        "fa": "جست‌وجوی کاورنوم همراه و اختلال خروج وریدی"
      },
      {
        "de": "Die Blutung aufgrund räumlicher Nähe direkt der unkomplizierten DVA zuordnen",
        "en": "Attribute haemorrhage directly to uncomplicated DVA based on proximity",
        "fa": "نسبت‌دادن مستقیم خونریزی به DVA بدون عارضه به‌علت نزدیکی مکانی"
      },
      {
        "de": "Die Sammelvene als arterielle Blutungsquelle einer AVM interpretieren",
        "en": "Interpret the collector as the arterial bleeding source of an AVM",
        "fa": "تفسیر ورید جمع‌کننده به‌عنوان منبع شریانی خونریزی AVM"
      },
      {
        "de": "Ein unauffälliges Cavernom-Screening als Nachweis einer DVA-Ruptur werten",
        "en": "Treat a negative cavernoma screen as proof of DVA rupture",
        "fa": "تلقی بررسی منفی کاورنوم به‌عنوان اثبات پارگی DVA"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Das spontane Blutungsrisiko einer isolierten DVA ist sehr niedrig; ein Kavernom oder eine Abflussstörung ist häufiger verantwortlich.",
      "en": "The spontaneous haemorrhage risk of an isolated DVA is very low; a cavernoma or outflow problem is more often responsible.",
      "fa": "خطر خونریزی خودبه‌خودی DVA منفرد بسیار کم است و کاورنوم یا اختلال خروجی بیشتر مسئول است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Räumliche Nähe beweist die Blutungsursache nicht; Begleitläsionen und Abfluss müssen geprüft werden.",
        "en": "Proximity does not prove the cause of haemorrhage; assess associated lesions and outflow.",
        "fa": "نزدیکی مکانی علت خونریزی را ثابت نمی‌کند؛ ضایعات همراه و خروج باید بررسی شوند."
      },
      "C": {
        "de": "Eine venöse Sammelstruktur ist nicht mit einem arteriellen Feeder oder AVM-Nidus gleichzusetzen.",
        "en": "A venous collector is not equivalent to an arterial feeder or AVM nidus.",
        "fa": "ساختار جمع‌کنندهٔ وریدی معادل فیدر شریانی یا نیدوس AVM نیست."
      },
      "D": {
        "de": "Ein negativer Kavernomnachweis beweist keine DVA-Ruptur; Abflussstörung und andere Blutungsursachen bleiben zu prüfen.",
        "en": "Failure to identify a cavernoma does not prove DVA rupture; outflow obstruction and other causes still require evaluation.",
        "fa": "دیده‌نشدن کاورنوم پارگی DVA را ثابت نمی‌کند؛ انسداد خروج و علل دیگر خونریزی همچنان باید بررسی شوند."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "11",
    "question": {
      "de": "Postkontrast-MRT zeigt radiale Medullarvenen mit oberflächlich drainierender Sammelvene. SWI zeigt kein Kavernom oder Blutungsresiduum, FLAIR kein Ödem. Welche Zusammenfassung passt?",
      "en": "Postcontrast MRI shows radial medullary veins with a superficially draining collector. SWI shows no cavernoma or haemorrhagic residue, and FLAIR no oedema. Which summary fits?",
      "fa": "MRI پس از تزریق وریدهای مدولاری شعاعی با ورید جمع‌کننده دارای تخلیهٔ سطحی نشان می‌دهد. SWI کاورنوم یا بقایای خونریزی و FLAIR ادم نشان نمی‌دهند. کدام جمع‌بندی مناسب است؟"
    },
    "options": [
      {
        "de": "Typische DVA mit oberflächlicher Drainage ohne dargestellte Begleitläsion oder Komplikation",
        "en": "Typical DVA with superficial drainage and no demonstrated associated lesion or complication",
        "fa": "DVA تیپیک با تخلیهٔ سطحی، بدون ضایعهٔ همراه یا عارضهٔ قابل مشاهده"
      },
      {
        "de": "AVM mit oberflächlicher Drainage und kompaktem Nidus",
        "en": "AVM with superficial drainage and a compact nidus",
        "fa": "AVM با تخلیهٔ سطحی و نیدوس فشرده"
      },
      {
        "de": "Kavernöse Malformation mit sekundär erweiterter Abflussvene",
        "en": "Cavernous malformation with a secondarily enlarged draining vein",
        "fa": "مالفورماسیون کاورنوس با گشادی ثانویهٔ ورید خروجی"
      },
      {
        "de": "Thrombosierte kortikale Vene mit venösem Ödem",
        "en": "Thrombosed cortical vein with venous oedema",
        "fa": "ورید کورتیکال ترومبوزه همراه ادم وریدی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Der Befund soll die benigne Drainagevariante, Lokalisation, Drainage und fehlende Komplikationen klar benennen.",
      "en": "The report should clearly state the benign drainage variant, location, drainage and absence of complications.",
      "fa": "گزارش باید واریانت خوش‌خیم، محل، مسیر تخلیه و نبود عارضه را روشن بیان کند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein Nidus oder frühe venöse Füllung sind nicht beschrieben; oberflächliche Drainage allein macht keine AVM.",
        "en": "No nidus or early venous filling is described; superficial drainage alone does not imply AVM.",
        "fa": "نیدوس یا پرشدن زودرس وریدی توصیف نشده است؛ تخلیهٔ سطحی به‌تنهایی AVM نیست."
      },
      "C": {
        "de": "Die SWI zeigt keine entsprechende Blutproduktläsion; das radiale Venenmuster spricht für DVA.",
        "en": "SWI shows no corresponding blood-product lesion; the radial venous pattern supports DVA.",
        "fa": "SWI ضایعهٔ متناسب فرآوردهٔ خونی نشان نمی‌دهد؛ الگوی وریدی شعاعی از DVA حمایت می‌کند."
      },
      "D": {
        "de": "Ein Verschluss oder venöses Ödem ist nicht beschrieben; die Venen kontrastieren und FLAIR ist unauffällig.",
        "en": "No occlusion or venous oedema is described; veins enhance and FLAIR is unremarkable.",
        "fa": "انسداد یا ادم وریدی توصیف نشده است؛ وریدها پس از تزریق افزایش سیگنال دارند و FLAIR طبیعی است."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "12",
    "question": {
      "de": "Wann ist eine DSA bei typischer DVA meist nicht erforderlich?",
      "en": "When is DSA usually unnecessary in a typical DVA?",
      "fa": "چه زمانی DSA در DVA تیپیک معمولاً لازم نیست؟"
    },
    "options": [
      {
        "de": "Bei klassischem Caput-medusae-Muster ohne Shuntzeichen oder Komplikation",
        "en": "With classic caput-medusae pattern and no shunt signs or complication",
        "fa": "در الگوی کلاسیک نمای سر مدوزا (Caput medusae) بدون نشانه شانت یا عارضه"
      },
      {
        "de": "Bei nachgewiesener früher venöser Füllung",
        "en": "With proven early venous filling",
        "fa": "در پرشدن زودرس وریدی اثبات‌شده"
      },
      {
        "de": "Bei Verdacht auf durale AV-Fistel",
        "en": "When a dural AV fistula is suspected",
        "fa": "در شک به dAVF"
      },
      {
        "de": "Bei unklarer intrakranieller Blutung mit Gefäßverdacht",
        "en": "With unexplained intracranial haemorrhage and vascular suspicion",
        "fa": "در خونریزی داخل جمجمه نامشخص با شک عروقی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Die typische kontrastverstärkte MRT ist diagnostisch. DSA bleibt unklaren Shuntkonstellationen oder atypischen Komplikationen vorbehalten.",
      "en": "Typical post-contrast MRI is diagnostic. DSA is reserved for uncertain shunting or atypical complications.",
      "fa": "MRI تیپیک پس از کنتراست تشخیصی است و DSA برای شانت نامشخص یا عوارض غیرتیپیک باقی می‌ماند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Frühe venöse Füllung ist ein Shunthinweis und rechtfertigt die gezielte weitere Gefäßabklärung.",
        "en": "Early venous filling suggests shunting and warrants targeted further vascular assessment.",
        "fa": "پرشدن زودرس وریدی شک به شانت ایجاد می‌کند و بررسی عروقی تکمیلی هدفمند را توجیه می‌کند."
      },
      "C": {
        "de": "Bei dAVF-Verdacht muss eine Shuntverbindung gezielt charakterisiert werden; das ist keine unkomplizierte typische DVA-Situation.",
        "en": "Suspected dAVF requires targeted shunt characterization rather than being a typical uncomplicated DVA situation.",
        "fa": "شک به dAVF نیازمند تعیین هدفمند شانت است و وضعیت DVA تیپیکِ بدون عارضه نیست."
      },
      "D": {
        "de": "Ungeklärte Blutung mit vaskulärem Verdacht kann weiterführende Angiografie begründen; hier fehlt die Sicherheit eines isolierten Routinebefunds.",
        "en": "Unexplained haemorrhage with vascular suspicion can justify further angiography; this is not an unequivocal isolated routine finding.",
        "fa": "خونریزی نامشخص با شک عروقی می‌تواند آنژیوگرافی تکمیلی را توجیه کند؛ این وضعیت یافتهٔ منفرد و واضح روتین نیست."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  }
]

export const DVA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, DVA_Q.map(seed => ({
  id: `dva-${lang}-${seed.id}`, tags: ['dva', 'gefaessmalformationen', 'gehirn'], fach: 'gehirn',
  question: seed.question[lang],
  options: seed.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: String.fromCharCode(65 + seed.correct), explanation: seed.explanation[lang],
  source: seed.source, wrongExplanations: Object.fromEntries(Object.entries(seed.wrongExplanations).map(([id,text])=>[id,text[lang]])),
}))]))

const DVA_F = [
  {
    "id": "definition",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Was ist eine DVA?",
      "en": "What is a DVA?",
      "fa": "DVA چیست؟"
    },
    "answer": {
      "de": "Persistierende embryonale venöse Drainage normalen Hirngewebes.",
      "en": "Persistent embryonic venous drainage of normal brain tissue.",
      "fa": "تداوم تخلیه وریدی جنینی بافت طبیعی مغز."
    },
    "explanation": {
      "de": "Normvariante ohne arteriovenösen Shunt.",
      "en": "A normal variant without an AV shunt.",
      "fa": "واریانت طبیعی بدون شانت AV."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "häufigkeit",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Häufigste zerebrale Gefäßanomalie?",
      "en": "Most common cerebral vascular anomaly?",
      "fa": "شایع‌ترین آنومالی عروقی مغز؟"
    },
    "answer": {
      "de": "Developmental Venous Anomaly.",
      "en": "Developmental venous anomaly.",
      "fa": "آنومالی وریدی تکاملی."
    },
    "explanation": {
      "de": "Meist asymptomatischer Zufallsbefund.",
      "en": "Usually an asymptomatic incidental finding.",
      "fa": "اغلب یافته اتفاقی بدون علامت."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/19390075/"
  },
  {
    "id": "caput",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Was bedeutet Caput medusae?",
      "en": "What is the caput-medusae sign?",
      "fa": "نمای سر مدوزا (Caput medusae) چیست؟"
    },
    "answer": {
      "de": "Radial konvergierende Medullarvenen mit zentraler Sammelvene.",
      "en": "Radially converging medullary veins with a central collector.",
      "fa": "وریدهای مدولاری شعاعی همگرا با ورید جمع‌کننده مرکزی."
    },
    "explanation": {
      "de": "Charakteristische venöse Architektur; bei atypischen Befunden nach zusätzlichem Shunt oder Begleitläsion suchen.",
      "en": "Characteristic venous architecture; assess for an additional shunt or associated lesion if atypical findings are present.",
      "fa": "معماری وریدی مشخص؛ در یافته‌های غیرتیپیک شانت اضافه یا ضایعهٔ همراه بررسی شود."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "sequenz",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Welche Referenzsequenz zeigt die kontrastierte DVA-Architektur, und was ergänzt SWI?",
      "en": "Which reference sequence depicts enhanced DVA architecture, and what does SWI add?",
      "fa": "کدام سکانس مرجع معماری DVA پس از تزریق را نشان می‌دهد و SWI چه چیزی اضافه می‌کند؟"
    },
    "answer": {
      "de": "Postkontrast-T1 für die venöse Konnektivität; SWI ergänzt Kavernom- und Blutproduktnachweis, ersetzt kleine Venen nicht sicher.",
      "en": "Postcontrast T1 for venous connectivity; SWI adds cavernoma and blood-product assessment but does not reliably replace small-vein mapping.",
      "fa": "T1 پس از تزریق برای ارتباطات وریدی؛ SWI بررسی کاورنوم و فرآورده‌های خونی را تکمیل می‌کند ولی جای ترسیم وریدهای کوچک را با اطمینان نمی‌گیرد."
    },
    "explanation": {
      "de": "Die venösen Strukturen reichern sich homogen an.",
      "en": "The venous structures enhance homogeneously.",
      "fa": "ساختارهای وریدی پس از تزریق به‌طور همگن افزایش سیگنال دارند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/40512378/"
  },
  {
    "id": "swi",
    "category": "SWI",
    "front": {
      "de": "Warum SWI bei DVA?",
      "en": "Why use SWI in DVA?",
      "fa": "چرا SWI در DVA؟"
    },
    "answer": {
      "de": "Venöses Muster sowie Kavernom, Mikroblutung und Hämosiderin erkennen.",
      "en": "To depict venous anatomy and detect cavernoma, microbleeds and haemosiderin.",
      "fa": "برای نمایش آناتومی وریدی و تشخیص کاورنوم، میکروخونریزی و هموسیدرین."
    },
    "explanation": {
      "de": "Der wichtigste Zusatz zur C+-Morphologie.",
      "en": "The key complement to post-contrast morphology.",
      "fa": "مکمل کلیدی مورفولوژی پس از کنتراست."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/28667359/"
  },
  {
    "id": "kavernom",
    "category": {
      "de": "Assoziation",
      "en": "Association",
      "fa": "همراهی"
    },
    "front": {
      "de": "Wichtigste DVA-Assoziation?",
      "en": "Most important DVA association?",
      "fa": "مهم‌ترین همراهی DVA؟"
    },
    "answer": {
      "de": "Kavernom im Drainagegebiet.",
      "en": "A cavernoma in the drainage territory.",
      "fa": "کاورنوم در قلمرو تخلیه."
    },
    "explanation": {
      "de": "Erklärt häufig Blutung oder Anfälle.",
      "en": "Often explains haemorrhage or seizures.",
      "fa": "اغلب خونریزی یا تشنج را توضیح می‌دهد."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/28667359/"
  },
  {
    "id": "dwi",
    "category": "DWI",
    "front": {
      "de": "DWI bei unkomplizierter DVA?",
      "en": "DWI in uncomplicated DVA?",
      "fa": "DWI در DVA بدون عارضه؟"
    },
    "answer": {
      "de": "Unauffällig.",
      "en": "Normal.",
      "fa": "طبیعی."
    },
    "explanation": {
      "de": "Restriktion spricht für venösen Infarkt oder andere Pathologie.",
      "en": "Restriction suggests venous infarction or another pathology.",
      "fa": "محدودیت انتشار به نفع انفارکت وریدی یا پاتولوژی دیگر است."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "avm",
    "category": {
      "de": "Differenzialdiagnose",
      "en": "Differential",
      "fa": "افتراقی"
    },
    "front": {
      "de": "DVA vs. AVM?",
      "en": "DVA vs AVM?",
      "fa": "DVA در برابر AVM؟"
    },
    "answer": {
      "de": "DVA: kein Nidus, kein AV-Shunt. AVM: arterielle Feeder + Nidus + frühe Vene.",
      "en": "DVA: no nidus or AV shunt. AVM: arterial feeders + nidus + early vein.",
      "fa": "DVA: بدون نیدوس یا شانت؛ AVM: فیدر شریانی + نیدوس + ورید زودرس."
    },
    "explanation": {
      "de": "Die Sammelvene allein macht keine AVM.",
      "en": "A collector vein alone does not make an AVM.",
      "fa": "وجود ورید جمع‌کننده به‌تنهایی AVM نیست."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "symptome",
    "category": {
      "de": "Klinik",
      "en": "Clinical",
      "fa": "بالینی"
    },
    "front": {
      "de": "Typische Klinik einer isolierten DVA?",
      "en": "Typical clinical presentation of isolated DVA?",
      "fa": "تظاهر تیپیک DVA منفرد؟"
    },
    "answer": {
      "de": "Asymptomatischer Zufallsbefund.",
      "en": "Asymptomatic incidental finding.",
      "fa": "یافته اتفاقی بدون علامت."
    },
    "explanation": {
      "de": "Bei Symptomen nach Komplikation oder Kavernom suchen.",
      "en": "With symptoms, seek a complication or cavernoma.",
      "fa": "در علائم به دنبال عارضه یا کاورنوم باشید."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/19390075/"
  },
  {
    "id": "thrombose",
    "category": {
      "de": "Komplikation",
      "en": "Complication",
      "fa": "عارضه"
    },
    "front": {
      "de": "Folge einer Sammelvenenthrombose?",
      "en": "Consequence of collector-vein thrombosis?",
      "fa": "پیامد ترومبوز ورید جمع‌کننده؟"
    },
    "answer": {
      "de": "Venöse Stauung, Ödem, venöser Infarkt ± Blutung.",
      "en": "Venous congestion, oedema, venous infarction ± haemorrhage.",
      "fa": "احتقان وریدی، ادم، انفارکت وریدی ± خونریزی."
    },
    "explanation": {
      "de": "DWI und Kontrastierung der Sammelvene prüfen.",
      "en": "Assess DWI and collector enhancement.",
      "fa": "DWI و کنتراست ورید جمع‌کننده بررسی شود."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "therapie",
    "category": {
      "de": "Management",
      "en": "Management",
      "fa": "مدیریت"
    },
    "front": {
      "de": "Therapie der typischen inzidentellen DVA?",
      "en": "Treatment of a typical incidental DVA?",
      "fa": "درمان DVA تیپیک اتفاقی؟"
    },
    "answer": {
      "de": "Keine Therapie.",
      "en": "No treatment.",
      "fa": "بدون درمان."
    },
    "explanation": {
      "de": "Meist auch keine routinemäßige Verlaufskontrolle.",
      "en": "Usually no routine follow-up either.",
      "fa": "معمولاً پیگیری روتین هم لازم نیست."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/19390075/"
  },
  {
    "id": "sammelvene",
    "category": {
      "de": "Management",
      "en": "Management",
      "fa": "مدیریت"
    },
    "front": {
      "de": "Warum Sammelvene erhalten?",
      "en": "Why preserve the collector?",
      "fa": "چرا ورید جمع‌کننده حفظ شود؟"
    },
    "answer": {
      "de": "Sie drainiert normales Hirngewebe und kann dessen einziger Abfluss sein.",
      "en": "It drains normal brain and may be its only outflow.",
      "fa": "بافت طبیعی مغز را تخلیه می‌کند و ممکن است تنها مسیر خروج باشد."
    },
    "explanation": {
      "de": "Ligatur kann venösen Infarkt verursachen.",
      "en": "Ligation may cause venous infarction.",
      "fa": "بستن آن می‌تواند انفارکت وریدی ایجاد کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "dsa",
    "category": {
      "de": "Diagnostik",
      "en": "Diagnosis",
      "fa": "تشخیص"
    },
    "front": {
      "de": "Wann ist bei DVA-Morphologie eine zusätzliche angiografische Shuntabklärung zu erwägen?",
      "en": "When should additional angiographic shunt assessment be considered with DVA morphology?",
      "fa": "در مورفولوژی DVA، چه زمانی بررسی آنژیوگرافیک تکمیلیِ شانت مطرح می‌شود؟"
    },
    "answer": {
      "de": "Bei Shuntzeichen oder atypischer ungeklärter Komplikation; eine eindeutige unkomplizierte DVA benötigt keine routinemäßige DSA.",
      "en": "With shunt features or an atypical unexplained complication; an unequivocal uncomplicated DVA does not need routine DSA.",
      "fa": "در نشانه‌های شانت یا عارضهٔ غیرتیپیکِ نامشخص؛ DVA واضح و بدون عارضه به DSA روتین نیاز ندارد."
    },
    "explanation": {
      "de": "DSA bei unklarer Shuntkonstellation.",
      "en": "Use DSA for uncertain shunting.",
      "fa": "DSA در شانت نامشخص."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "befund",
    "category": {
      "de": "Befundung",
      "en": "Reporting",
      "fa": "گزارش"
    },
    "front": {
      "de": "Was gehört in den DVA-Befund?",
      "en": "What belongs in a DVA report?",
      "fa": "چه مواردی در گزارش DVA؟"
    },
    "answer": {
      "de": "Lokalisation, Caput-medusae-Muster, Drainageweg, Komplikationen und Kavernom.",
      "en": "Location, caput-medusae pattern, drainage route, complications and cavernoma.",
      "fa": "محل، الگوی نمای سر مدوزا (Caput medusae)، مسیر تخلیه، عوارض و کاورنوم."
    },
    "explanation": {
      "de": "Die Benignität der unkomplizierten DVA klar machen.",
      "en": "Make the benign nature of uncomplicated DVA clear.",
      "fa": "خوش‌خیم بودن DVA بدون عارضه روشن شود."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/18988912/"
  },
  {
    "id": "operation",
    "category": {
      "de": "Management",
      "en": "Management",
      "fa": "مدیریت"
    },
    "front": {
      "de": "Regel bei Operation einer benachbarten Läsion?",
      "en": "Rule during surgery of an adjacent lesion?",
      "fa": "قاعده در جراحی ضایعه مجاور؟"
    },
    "answer": {
      "de": "Die funktionell notwendige Drainage normalen Hirngewebes einschließlich Sammelvene erhalten; die individuelle Anatomie für die Operationsplanung darstellen.",
      "en": "Preserve essential drainage of normal brain tissue, including the collector; map individual anatomy for surgical planning.",
      "fa": "تخلیهٔ ضروری بافت طبیعی مغز، از جمله ورید جمع‌کننده، حفظ شود؛ آناتومی فردی برای برنامه‌ریزی جراحی ترسیم شود."
    },
    "explanation": {
      "de": "Ein DVA-Abfluss ist kein beliebig entbehrlicher Teil einer benachbarten Läsion. Die Planung erfolgt individuell; kontrollierte Daten zur DVA-Resektion bei Kavernomoperation fehlen.",
      "en": "DVA outflow is not an automatically expendable part of an adjacent lesion. Planning is individual; controlled data on DVA resection during cavernoma surgery are lacking.",
      "fa": "خروج DVA بخشی از ضایعهٔ مجاور نیست که خودبه‌خود قابل حذف باشد. برنامه‌ریزی فردی است؛ دادهٔ کنترل‌شده دربارهٔ رزکسیون DVA هنگام جراحی کاورنوم وجود ندارد."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12680281/"
  }
]

export const DVA_FLASHCARDS = DVA_F.map((item, index) => ({ id: `dva-${String(index + 1).padStart(2, '0')}-${item.id}`, topicId: 'dva', category: item.category, front: item.front, answer: item.answer, explanation: item.explanation, source: item.source }))
export const DVA_FLASHCARD_TOPIC = {
  id: 'dva', area: 'Kopf', chapter: 'Vaskuläre Erkrankungen', icon: '🕸️', iconImage: '/fach/gehirn.png', color: '#7c3aed', href: '/flashcards/dva',
  title: L('Developmental Venous Anomaly', 'Developmental Venous Anomaly', 'آنومالی وریدی تکاملی'),
  subtitle: L('Caput medusae · Sammelvene · Kavernom · Komplikationen · Management', 'Caput medusae · collector vein · cavernoma · complications · management', "نمای سر مدوزا (Caput medusae) · ورید جمع‌کننده · کاورنوم · عوارض · مدیریت"),
}
