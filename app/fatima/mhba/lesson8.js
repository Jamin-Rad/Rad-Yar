// Authored learning aids; original course pages and solutions remain private.
const c=(id,title,fa,start,de,translation,statementIds=[])=>({id,title,fa,start,summary:{de:[de],fa:[translation]},statementIds});
export const lesson8Chapters=[
 c("intro","Einführung und Gliederung","مقدمه و فهرست",1,"Produktion umfasst auch die Erstellung von Dienstleistungen im Gesundheitswesen.","تولید، ارائهٔ خدمات در نظام سلامت را هم در بر می‌گیرد.",[]),
 c("8.1","Grundlagen","مبانی",3,"Der Produktionsbegriff reicht von der Herstellung materieller Güter bis zur betrieblichen Leistungserstellung.","مفهوم تولید از ساخت کالای مادی تا ایجاد محصول و خدمت در بنگاه گسترده است.",[0]),
 c("8.1.1","Begriffsbestimmung","تعریف تولید",3,"Produktionsfaktoren werden kombiniert, um Güter oder Dienstleistungen zu erzeugen.","عوامل تولید برای ایجاد کالا یا خدمت با هم ترکیب می‌شوند.",[1, 2]),
 c("8.1.2","Einordnung der Produktion","جایگاه تولید در زنجیرهٔ ارزش",5,"Forschung und Entwicklung liegen im klassischen Schema vor der Produktion, Marketing und Vertrieb danach. Produktion umfasst Programmplanung, Arbeitsvorbereitung, Beschaffung und interne Logistik, Fertigung sowie Qualitätskontrolle.","در الگوی کلاسیک، پژوهش و توسعه پیش از تولید و بازاریابی و فروش پس از آن‌اند. تولید شامل برنامه‌ریزی محصول، آماده‌سازی کار، تأمین و لجستیک داخلی، ساخت و کنترل کیفیت است.",[3]),
 c("8.2","Die betriebliche Produktion","تولید در بنگاه",6,"Betriebliche Produktion verbindet Ressourcen, Organisation und Ziele.","تولید در بنگاه، منابع، سازمان‌دهی و اهداف را به هم پیوند می‌دهد.",[]),
 c("8.2.1","Das 5-Faktoren-Modell (nach Gutenberg)","مدل پنج‌عاملی گوتنبرگ",6,"Input, Personal, Sachmittel, Organisation und Output bilden das Modell. Die Organisation gestaltet das Zusammenwirken der Faktoren.","ورودی، کارکنان، امکانات مادی، سازمان‌دهی و خروجی، اجزای مدل‌اند. سازمان‌دهی نحوهٔ همکاری عوامل را مشخص می‌کند.",[4, 5]),
 c("8.2.2","Produktionsziele und -kriterien","اهداف و معیارهای تولید",7,"Kurze Durchlaufzeit, Termintreue, hohe Auslastung und geringe Kapitalbindung können Zielkonflikte erzeugen. Produktivität ist mengenbezogen, Wirtschaftlichkeit wertbezogen und Rentabilität eine Erfolgsrelation.","زمان عبور کوتاه، تحویل به‌موقع، بهره‌برداری بالا از ظرفیت و سرمایهٔ درگیر کم می‌توانند تعارض داشته باشند. بهره‌وری مقداری، صرفهٔ اقتصادی ارزشی و سودآوری نسبت موفقیت است.",[6, 7, 8, 9]),
 c("8.2.3","Die Produktionsplanung","برنامه‌ریزی تولید",10,"Produktionsplanung klärt Programm, Ablauf sowie Bedarf und Beschaffung.","برنامه‌ریزی تولید، برنامهٔ محصولات، فرایند اجرا و نیاز و تأمین را مشخص می‌کند.",[]),
 c("8.2.3.1","Die Planung des Produktionsprogramms","برنامه‌ریزی سبد و مقدار تولید",10,"Das Produktionsprogramm bestimmt Art, Menge, Verfahren und Zeitraum. Synchronisation folgt dem Absatz; Emanzipation glättet die Produktion trotz Absatzschwankungen.","برنامهٔ تولید، نوع، مقدار، روش و زمان را تعیین می‌کند. هم‌زمان‌سازی تولید از فروش پیروی می‌کند؛ مستقل‌سازی، تولید را با وجود نوسان فروش هموار می‌سازد.",[10, 11, 12]),
 c("8.2.3.2","Produktionsablaufplanung (Typologisierung von Produktionssystemen)","برنامه‌ریزی فرایند و گونه‌شناسی تولید",11,"Fertigungsverfahren klassifizieren die Wiederholung und Menge; Organisationstypen betreffen die räumliche und organisatorische Anordnung.","شیوهٔ تولید به مقدار و تکرار ساخت مربوط است؛ نوع سازمان‌دهی، چیدمان مکانی و سازمانی را توصیف می‌کند.",[13]),
 c("8.2.3.2.1","Fertigungsverfahren","شیوه‌های تولید",12,"Einzel-, Massen-, Serien-, Sorten- und Chargenfertigung unterscheiden sich. Kuppelproduktion erzeugt zwangsläufig mehrere Produkte aus einem Rohstoff.","تولید تکی، انبوه، سری، گونه‌ای و بچی متفاوت‌اند. در تولید توأم، چند محصول ناگزیر از یک مادهٔ اولیه به دست می‌آید.",[14, 15, 16, 17]),
 c("8.2.3.2.2","Organisationstypen","انواع سازمان‌دهی تولید",14,"Werkstattfertigung folgt dem Verrichtungsprinzip, Fließfertigung dem Ablauf- beziehungsweise Objektprinzip. Gruppenfertigung verbindet Vorteile beider Formen.","تولید کارگاهی بر فعالیت مشابه و تولید جریانی بر توالی فرایند یا محصول تکیه دارد. تولید گروهی، مزیت‌های این دو را ترکیب می‌کند.",[18, 19, 20, 21]),
 c("8.2.3.3","Die Planung des Bedarfs und der Beschaffung","برنامه‌ریزی نیاز و تأمین",17,"Im einfachen Modell gilt K(q) = cB × r/q + cL × q/2; qopt = √(2 × r × cB/cL). cL und r müssen zur gleichen Periode passen. Kaufkosten der Ware gehören nicht zum so definierten Kostenminimum.","در مدل ساده، هزینه برابر هزینهٔ سفارش به‌اضافهٔ نگهداری است: K(q) = cB × r/q + cL × q/2. مقدار بهینه qopt = √(2 × r × cB/cL) است. دورهٔ زمانی نرخ نگهداری و تقاضا باید یکسان باشد؛ قیمت خرید خود کالا در این کمینهٔ هزینه حساب نمی‌شود.",[22, 23, 24, 25, 26]),
 c("8.2.4","Fertigungstiefe bzw. vertikale Integration","عمق تولید و یکپارچگی عمودی",22,"Make or Buy beeinflusst Kernkompetenzen, Abhängigkeit, Skaleneffekte und Qualität. Vorwärtsintegration betrifft nachgelagerte, Rückwärtsintegration vorgelagerte Stufen.","ساخت یا خرید بر شایستگی محوری، وابستگی، صرفهٔ مقیاس و کیفیت اثر دارد. یکپارچگی رو به جلو مراحل پایین‌دست و رو به عقب مراحل بالادست را در بر می‌گیرد.",[27, 28]),
 c("8.3","Systeme zur Produktionsplanung und -steuerung (PPS)","سامانه‌های برنامه‌ریزی و کنترل تولید",24,"PPS unterstützt die Planung, Steuerung und Überwachung der Produktion.","PPS به برنامه‌ریزی، کنترل و پایش تولید کمک می‌کند.",[]),
 c("8.3.1","Traditionelle PPS-Systeme","سامانه‌های سنتی PPS",24,"Module reichen von Grunddaten und Produktionsprogramm über Mengen, Termine und Kapazitäten bis zur Werkstattsteuerung und Betriebsdatenerfassung. Datenintegration allein löst noch keine operative Optimierung.","ماژول‌ها از داده‌های پایه و برنامهٔ تولید تا مقدار، زمان و ظرفیت، کنترل کارگاه و ثبت داده‌های عملیات گسترده‌اند. یکپارچگی داده به‌تنهایی بهینه‌سازی عملیات را تضمین نمی‌کند.",[29, 30]),
 c("8.3.2","Neuere PPS-Systeme","سامانه‌های جدیدتر PPS",26,"Neuere Ansätze ergänzen die Datenverwaltung um verbesserte Planungs- und Steuerungstechniken.","رویکردهای جدیدتر، مدیریت داده را با روش‌های بهتر برنامه‌ریزی و کنترل تکمیل می‌کنند.",[]),
 c("8.3.2.1","Manufacturing Resource Planning (MRP II)","برنامه‌ریزی منابع ساخت؛ MRP II",26,"MRP II verknüpft Ebenen der Planung hierarchisch und nutzt Rückkopplung. Es ist von einer bloßen Materialbedarfsplanung zu unterscheiden.","MRP II سطوح برنامه‌ریزی را سلسله‌مراتبی و با بازخورد به هم وصل می‌کند و از برنامه‌ریزی صرفِ نیاز مواد گسترده‌تر است.",[31]),
 c("8.3.2.2","Belastungsorientierte Auftragsfreigabe (BoA)","آزادسازی سفارش بر اساس بار کاری",27,"Zu frühe Freigabe kann Warteschlangen und Durchlaufzeiten verlängern. BoA begrenzt die freigegebene Belastung entsprechend der verfügbaren Kapazität.","آزادسازی بیش‌ازحد زودِ سفارش می‌تواند صف و زمان عبور را زیاد کند. BoA بارِ سفارش‌های آزادشده را متناسب با ظرفیت موجود محدود می‌کند.",[32, 33, 34]),
 c("8.3.2.3","KANBAN","کانبان",29,"Ein nachgelagerter Verbrauch löst über Karten den Nachschub bei der vorgelagerten Stufe aus. Selbststeuernde Regelkreise folgen dem Pull-Prinzip.","مصرف در مرحلهٔ پایین‌دست، از طریق کارت، تأمین مجددِ مرحلهٔ بالادست را فعال می‌کند. حلقه‌های خودتنظیم از اصل کشش پیروی می‌کنند.",[35, 36, 37]),
 c("8.3.2.4","Computer Integrated Manufacturing (CIM)","ساخت یکپارچه با رایانه؛ CIM",30,"CIM integriert technische und organisatorische Funktionen über eine gemeinsame Datenbasis; dazu gehören CAD, CAP, CAM, CAQ und PPS.","CIM کارکردهای فنی و سازمانی را با پایگاه دادهٔ مشترک یکپارچه می‌کند؛ CAD، CAP، CAM، CAQ و PPS از اجزای آن‌اند.",[38, 39]),
 c("8.3.2.5","Optimized Production Technology (OPT)","فناوری تولید بهینه؛ OPT",32,"OPT konzentriert die Planung auf Engpässe und den Materialfluss. Ein Verlust am Engpass kann den Durchsatz des Gesamtsystems verringern.","OPT برنامه‌ریزی را بر گلوگاه و جریان مواد متمرکز می‌کند. اتلاف در گلوگاه می‌تواند توان خروجی کل نظام را کم کند.",[40, 41]),
 c("8.4","Bekannte Produktionsfunktionen","توابع شناخته‌شدهٔ تولید",34,"Produktionsfunktionen beschreiben den Zusammenhang zwischen Faktoreinsatz und Output. Substitutionale und limitationale Beziehungen unterscheiden sich.","توابع تولید، رابطهٔ مصرف عوامل و خروجی را نشان می‌دهند. رابطهٔ جانشین‌پذیر با رابطهٔ دارای نسبت‌های فنی محدودکننده تفاوت دارد.",[42]),
 c("8.4.1","Das klassische Ertragsgesetz (Produktionsfunktion des Typs A)","قانون کلاسیک بازده؛ تابع نوع A",35,"Bei partieller Faktorvariation bleiben andere Faktoren konstant. Grenzertrag ist die zusätzliche, Durchschnittsertrag die durchschnittliche Ausbringung; am Maximum des Gesamtertrags ist der Grenzertrag null.","در تغییر جزئی عوامل، دیگر عوامل ثابت‌اند. بازده نهایی خروجیِ واحد اضافی و بازده متوسط خروجی به‌ازای هر واحد عامل است؛ در بیشینهٔ بازده کل، بازده نهایی صفر است.",[43, 44, 45]),
 c("8.4.2","Gutenberg-Produktionsfunktion (Produktionsfunktion des Typs B)","تابع تولید گوتنبرگ؛ نوع B",39,"Typ B berücksichtigt technische Eigenschaften und Nutzungsintensität von Betriebsmitteln über Verbrauchsfunktionen. Intensitätsabhängige Koeffizienten sind mit Limitationalität vereinbar.","نوع B ویژگی فنی و شدت استفاده از تجهیزات را از طریق توابع مصرف در نظر می‌گیرد. وابستگی ضرایب به شدت استفاده با روابط فنی محدودکننده سازگار است.",[46]),
 c("8.4.3","Weitere bekannte Produktionsfunktionen","دیگر توابع تولید",41,"Cobb-Douglas verbindet Kapital und Arbeit mit Elastizitäten. Leontief begrenzt den Output durch den knappsten Faktor im festen Einsatzverhältnis.","کاب–داگلاس، سرمایه و کار را با کشش‌ها مرتبط می‌کند. در لئونتیف، کمبود یک عامل در نسبت فنی ثابت، خروجی را محدود می‌کند.",[47, 48]),
 c("8.5","Produktion von Dienstleistungen","تولید خدمات",42,"Dienstleistungen sind auch aus betriebswirtschaftlicher Sicht als Leistungserstellung zu analysieren.","خدمات را نیز می‌توان از منظر اقتصاد بنگاه به‌عنوان فرایند ایجاد خدمت بررسی کرد.",[]),
 c("8.5.1","Definition von Dienstleistung","تعریف خدمت",42,"Immaterialität, externer Faktor, Gleichzeitigkeit von Produktion und Konsum sowie fehlende Lagerfähigkeit kennzeichnen die Darstellung des Lehrtexts.","ناملموس بودن، عامل بیرونی، هم‌زمانی تولید و مصرف و نبود امکان انبار کردن، ویژگی‌های خدمت در بیان جزوه‌اند.",[49, 50]),
 c("8.5.2","Abgrenzung zum materiellen Gut","تفاوت خدمت و کالای مادی",44,"Beim Dienstleistungsprozess wirken interne und externe Faktoren zusammen. Kapazität kann bereitgehalten werden, die Behandlung selbst lässt sich nicht vorproduzieren und lagern.","در فرایند خدمت، عوامل داخلی و بیرونی با هم عمل می‌کنند. می‌توان ظرفیت را آماده نگه داشت، اما خودِ درمان را نمی‌توان از پیش تولید و انبار کرد.",[51]),
 c("8.5.3","Die ärztliche Tätigkeit als Dienstleistungserstellung","فعالیت پزشک به‌عنوان تولید خدمت",45,"Der Patient ist externer Faktor und wirkt am Behandlungsprozess mit. Individuelle Fälle und subjektive Bewertung erschweren Standardisierung und Kapazitätsplanung.","بیمار عامل بیرونی است و در فرایند درمان مشارکت دارد. تفاوت موارد و ارزیابی ذهنی، استانداردسازی و برنامه‌ریزی ظرفیت را دشوار می‌کنند.",[52, 53]),
 c("literatur","Literaturverzeichnis","فهرست منابع",47,"Die Quellen vertiefen Produktionswirtschaft, Produktionsfunktionen und PPS.","منابع به اقتصاد تولید، توابع تولید و سامانه‌های PPS می‌پردازند.",[]),
 c("fragen","Kontrollfragen","سؤال‌های کنترلیِ خود جزوه",48,"Die zehn Originalfragen verbinden Definitionen, Fertigungstypen, Bestellrechnung und Steuerungssysteme.","ده سؤال اصلی، تعریف‌ها، شیوه‌های تولید، محاسبهٔ سفارش و سامانه‌های کنترل را به هم وصل می‌کنند.",[]),
];
lesson8Chapters.forEach((chapter,i)=>{chapter.end=lesson8Chapters[i+1]?.start||48;});
lesson8Chapters.find(chapter=>chapter.id==='literatur').sourceHeadings={de:'a) Basisliteratur',fa:'الف) منابع پایه'};
export const lesson8Vocabulary=[
  [
    "Produktion|Leistungserstellung",
    "تولید؛ ایجاد کالا یا خدمت"
  ],
  [
    "Produktionsfaktor|Produktionsfaktoren",
    "عامل یا عوامل تولید"
  ],
  [
    "Werkstoffe",
    "مواد مصرفیِ تولید"
  ],
  [
    "Betriebsmittel",
    "تجهیزات و وسایل تولید"
  ],
  [
    "dispositiver Faktor|dispositive Faktoren",
    "عامل هدایت و سازمان‌دهی تولید"
  ],
  [
    "Sachmittel",
    "امکانات و ابزار مادی"
  ],
  [
    "Durchlaufzeit|Durchlaufzeiten",
    "زمان عبور از کل فرایند"
  ],
  [
    "Termintreue",
    "پایبندی به زمان مقرر"
  ],
  [
    "Kapazitätsauslastung",
    "میزان استفاده از ظرفیت"
  ],
  [
    "Kapitalbindung",
    "درگیر شدن سرمایه"
  ],
  [
    "Produktivität",
    "بهره‌وری مقداری"
  ],
  [
    "Wirtschaftlichkeit",
    "صرفهٔ اقتصادی"
  ],
  [
    "Rentabilität",
    "سودآوری؛ نسبت موفقیت به مبنا"
  ],
  [
    "Produktionsprogramm",
    "برنامهٔ نوع و مقدار محصولات"
  ],
  [
    "Synchronisation",
    "هم‌زمان‌سازی تولید با فروش"
  ],
  [
    "Emanzipation",
    "مستقل‌سازی و هموار کردن تولید نسبت به فروش"
  ],
  [
    "Einzelfertigung",
    "تولید تکی و سفارشی"
  ],
  [
    "Massenfertigung",
    "تولید انبوه"
  ],
  [
    "Serienfertigung",
    "تولید سری با تعداد محدود"
  ],
  [
    "Sortenfertigung",
    "تولید گونه‌های مشابه روی تجهیزات یکسان"
  ],
  [
    "Chargenfertigung|Partiefertigung",
    "تولید بچی یا محموله‌ای"
  ],
  [
    "Kuppelproduktion",
    "تولید توأم؛ چند خروجی از یک ماده"
  ],
  [
    "Werkstattfertigung",
    "تولید کارگاهی"
  ],
  [
    "Fließfertigung",
    "تولید جریانی و خطی"
  ],
  [
    "Gruppenfertigung",
    "تولید گروهی یا سلولی"
  ],
  [
    "Verrichtungsprinzip",
    "اصل گروه‌بندی بر اساس فعالیت مشابه"
  ],
  [
    "Objektprinzip",
    "اصل چیدمان بر اساس محصول و توالی ساخت"
  ],
  [
    "Losgröße|Bestellmenge",
    "اندازهٔ دسته یا مقدار سفارش"
  ],
  [
    "Bestellkostensatz",
    "هزینهٔ ثابت هر بار سفارش"
  ],
  [
    "Lagerkostensatz",
    "هزینهٔ نگهداری هر واحد در دوره"
  ],
  [
    "Fertigungstiefe|vertikale Integration",
    "عمق تولید داخلی؛ یکپارچگی عمودی"
  ],
  [
    "Rückwärtsintegration",
    "یکپارچگی رو به عقب و بالادست"
  ],
  [
    "Vorwärtsintegration",
    "یکپارچگی رو به جلو و پایین‌دست"
  ],
  [
    "Auftragsfreigabe",
    "اجازهٔ ورود سفارش به فرایند اجرا"
  ],
  [
    "Belastungsschranke",
    "حد بار کاری مجاز"
  ],
  [
    "Rückwärtsterminierung",
    "زمان‌بندی معکوس از موعد پایان"
  ],
  [
    "Pull-Prinzip|Holprinzip",
    "اصل کشش؛ شروع بر مبنای نیاز پایین‌دست"
  ],
  [
    "Regelkreis|Regelkreise",
    "حلقه یا حلقه‌های کنترل"
  ],
  [
    "Engpass|Engpässe",
    "گلوگاه؛ محدودیت ظرفیت"
  ],
  [
    "Rüstzeit|Rüstzeiten",
    "زمان آماده‌سازی یا تغییر تنظیمات"
  ],
  [
    "Grenzertrag",
    "بازده نهایی"
  ],
  [
    "Durchschnittsertrag",
    "بازده متوسط"
  ],
  [
    "Gesamtertrag",
    "بازده کل"
  ],
  [
    "Intensität",
    "شدت استفاده از عامل یا تجهیز"
  ],
  [
    "Verbrauchsfunktion|Verbrauchsfunktionen",
    "تابع یا توابع مصرف"
  ],
  [
    "Immaterialität",
    "ناملموس بودن"
  ],
  [
    "externer Faktor|externen Faktor",
    "عامل بیرونی؛ مانند بیمار"
  ],
  [
    "Lagerfähigkeit",
    "امکان انبار کردن"
  ]
];
