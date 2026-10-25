const q = (id, question, options, correct, explanation) => ({ id, tags: ['volvulus'], fach: 'abdomen', question, options, correct, explanation })
const option = (id, text) => ({ id, text })

export const VOLVULUS_QUESTIONS = {
  "de": [
    {
      "id": "volvulus-de-1",
      "tags": [
        "volvulus"
      ],
      "fach": "abdomen",
      "question": "Welches Röntgenmuster spricht am ehesten für einen Sigmavolvulus?",
      "options": [
        {
          "id": "A",
          "text": "Stark dilatierte, kaffeebohnenförmige Sigmaschlinge ohne erkennbare Haustren."
        },
        {
          "id": "B",
          "text": "Verlagertes dilatiertes Zökum mit kollabiertem distalem Kolon."
        },
        {
          "id": "C",
          "text": "Zentrale Dünndarmschlingen mit durchgehenden Querfalten und Stufenleiterkonfiguration."
        },
        {
          "id": "D",
          "text": "Diffuse Dilatation mehrerer Darmabschnitte mit Gas bis zum Rektum."
        }
      ],
      "correct": "A",
      "explanation": "Eine stark dilatierte kaffeebohnenförmige Sigmaschlinge ist ein typischer Hinweis auf Sigmavolvulus. Morphologie und Verlauf gemeinsam beurteilen; daraus allein folgt keine Aussage über Darmviabilität.",
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/",
      "wrongExplanations": {
        "B": "Ein verlagertes dilatiertes Zökum führt zur Differenzialdiagnose eines Zökumvolvulus, nicht zur beschriebenen Sigmaschlinge.",
        "C": "Das ist ein Dünndarmdilatationsmuster mit durchgehenden Querfalten, kein charakteristisches Sigmabild.",
        "D": "Diffuse gasgefüllte Darmabschnitte bis zum Rektum bilden nicht das typische fokale Kaffeebohnenmuster einer verdrehten Sigmaschlinge."
      }
    }
  ],
  "en": [
    {
      "id": "volvulus-en-1",
      "tags": [
        "volvulus"
      ],
      "fach": "abdomen",
      "question": "Which radiographic pattern most strongly suggests sigmoid volvulus?",
      "options": [
        {
          "id": "A",
          "text": "A markedly dilated coffee-bean-shaped sigmoid loop without visible haustra."
        },
        {
          "id": "B",
          "text": "A displaced dilated caecum with a decompressed distal colon."
        },
        {
          "id": "C",
          "text": "Central small-bowel loops with full-width folds in a step-ladder configuration."
        },
        {
          "id": "D",
          "text": "Diffuse dilatation of several bowel segments with gas extending to the rectum."
        }
      ],
      "correct": "A",
      "explanation": "A markedly dilated coffee-bean-shaped sigmoid loop is a typical clue to sigmoid volvulus. Assess morphology and course together; this alone does not establish bowel viability.",
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/",
      "wrongExplanations": {
        "B": "A displaced dilated caecum suggests the differential of caecal volvulus rather than the described sigmoid loop.",
        "C": "That is a small-bowel dilatation pattern with full-width folds, not the characteristic sigmoid pattern.",
        "D": "Diffuse gas-filled bowel extending to the rectum does not form the typical focal coffee-bean pattern of a twisted sigmoid loop."
      }
    }
  ],
  "fa": [
    {
      "id": "volvulus-fa-1",
      "tags": [
        "volvulus"
      ],
      "fach": "abdomen",
      "question": "کدام الگوی رادیوگرافی بیشتر به نفع ولولوس سیگموئید است؟",
      "options": [
        {
          "id": "A",
          "text": "لوپ سیگموئید بسیار متسع و دانه‌قهوه‌ای بدون هاوسترای قابل مشاهده."
        },
        {
          "id": "B",
          "text": "سکوم متسع و جابه‌جا با کولون دیستال فروریخته."
        },
        {
          "id": "C",
          "text": "لوپ‌های مرکزی رودهٔ باریک با چین‌های تمام‌عرض و آرایش نردبانی."
        },
        {
          "id": "D",
          "text": "اتساع منتشر چند بخش روده همراه گاز تا رکتوم."
        }
      ],
      "correct": "A",
      "explanation": "لوپ سیگموئید بسیار متسع و دانه‌قهوه‌ای سرنخ معمول ولولوس سیگموئید است. شکل و مسیر را با هم بررسی کنید؛ این یافته به‌تنهایی زنده‌مانی روده را تعیین نمی‌کند.",
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/",
      "wrongExplanations": {
        "B": "سکوم متسع و جابه‌جا تشخیص افتراقی ولولوس سکوم را مطرح می‌کند، نه لوپ سیگموئید توصیف‌شده.",
        "C": "این الگوی اتساع رودهٔ باریک با چین‌های تمام‌عرض است، نه الگوی مشخص سیگموئید.",
        "D": "گاز منتشر در بخش‌های روده تا رکتوم، الگوی کانونی و معمول دانه‌قهوه‌ایِ لوپ سیگموئید پیچ‌خورده را نمی‌سازد."
      }
    }
  ]
}

export const VOLVULUS_FLASHCARD_TOPIC = {
  id: 'volvulus', area: 'Abdomen', chapter: 'Gastrointestinaltrakt', icon: 'CT', iconImage: '/fach/abdomen.png', color: '#f97316', href: '/flashcards/volvulus',
  title: { de: 'Sigmoid- und Zökumvolvulus', en: 'Sigmoid and caecal volvulus', fa: 'ولولوس سیگموئید و سکوم' },
  subtitle: { de: 'Röntgenmuster · Haustren · CT-Whirl · Bird-beak', en: 'Radiographic patterns · haustra · CT whirl · bird-beak', fa: 'الگوهای رادیوگرافی · هاوسترا · Whirl در CT · Bird-beak' },
}

export const VOLVULUS_FLASHCARDS = [
  {
    "id": "volvulus-pattern",
    "topicId": "volvulus",
    "category": {
      "de": "Röntgen",
      "en": "Radiograph",
      "fa": "رادیوگرافی"
    },
    "front": {
      "de": "Welches Röntgenmuster spricht für Sigmavolvulus?",
      "en": "Which radiographic pattern suggests sigmoid volvulus?",
      "fa": "کدام الگوی رادیوگرافی مطرح‌کننده ولولوس سیگموئید است؟"
    },
    "answer": {
      "de": "Eine stark dilatierte, kaffeebohnenförmige Sigmaschlinge ohne erkennbare Haustren.",
      "en": "A markedly dilated, coffee-bean-shaped sigmoid loop without visible haustra.",
      "fa": "لوپ سیگموئید بسیار متسع و دانه‌قهوه‌ای بدون هاوسترای قابل مشاهده."
    },
    "explanation": {
      "de": "Die morphologische Konfiguration unterstützt den Verdacht; sie allein beurteilt weder Durchblutung noch Viabilität.",
      "en": "The configuration supports suspicion but does not alone establish perfusion or viability.",
      "fa": "این آرایش از شک تشخیصی حمایت می‌کند، اما به‌تنهایی خون‌رسانی یا زنده‌مانی را تعیین نمی‌کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/"
  },
  {
    "id": "volvulus-cecum",
    "topicId": "volvulus",
    "category": {
      "de": "Röntgen",
      "en": "Radiograph",
      "fa": "رادیوگرافی"
    },
    "front": {
      "de": "Welche Hinweise sprechen für einen Zökumvolvulus?",
      "en": "Which features suggest caecal volvulus?",
      "fa": "کدام یافته‌ها به نفع ولولوس سکوم‌اند؟"
    },
    "answer": {
      "de": "Ein verlagertes, dilatiertes Zökum; Haustren können erhalten sein. Dünndarm kann mitdilatiert und das distale Kolon kollabiert sein.",
      "en": "A displaced, dilated caecum; haustra may remain visible. Small bowel may be dilated and the distal colon collapsed.",
      "fa": "سکوم متسع و جابه‌جا؛ هاوسترا ممکن است باقی بماند. روده باریک ممکن است متسع و کولون دیستال فروریخته باشد."
    },
    "explanation": {
      "de": "Die Lage kann bis ins Epigastrium oder den linken Oberbauch reichen; die ungewöhnliche Lage ist für die Zuordnung wichtig.",
      "en": "The caecum may extend into the epigastrium or left upper abdomen; its abnormal position helps localisation.",
      "fa": "سکوم ممکن است تا اپی‌گاستر یا ربع فوقانی چپ امتداد یابد؛ محل غیرعادی به مکان‌یابی کمک می‌کند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/20574094/"
  },
  {
    "id": "volvulus-ct",
    "topicId": "volvulus",
    "category": {
      "de": "CT",
      "en": "CT",
      "fa": "CT"
    },
    "front": {
      "de": "Was zeigen Whirl- und Bird-beak-Zeichen beim Sigmavolvulus?",
      "en": "What do the whirl and bird-beak signs show in sigmoid volvulus?",
      "fa": "نشانه‌های Whirl و Bird-beak در ولولوس سیگموئید چه چیزی را نشان می‌دهند؟"
    },
    "answer": {
      "de": "Whirl: spiralförmig verdrehter Darm mit zugehörigem Mesenterium. Bird-beak: schnabelförmige Zuspitzung am Übergang.",
      "en": "Whirl: twisted bowel and its mesentery in a spiral configuration. Bird-beak: tapering at the transition.",
      "fa": "Whirl: روده و مزانتر همراه آن با آرایش پیچ‌خورده و مارپیچی. Bird-beak: باریک‌شدن نوک‌دار در محل گذار."
    },
    "explanation": {
      "de": "Beide Zeichen lokalisieren Verdrehung und Übergang, sind aber allein kein Beweis für eine Ischämie.",
      "en": "Both signs localise the twist and transition but do not alone prove ischaemia.",
      "fa": "هر دو نشانه پیچش و نقطه گذار را مکان‌یابی می‌کنند، اما به‌تنهایی ایسکمی را ثابت نمی‌کنند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/"
  }
]

export const VOLVULUS_COPY = {
  de: {
    title: 'Mechanischer Ileus und Volvulus',
    volvulusTitle: 'Sigmoid- und Zökumvolvulus unterscheiden',
    goals: ['Sigmoid- und Zökumvolvulus in der Bildgebung unterscheiden.', 'Whirl- und Bird-beak-Zeichen am CT räumlich zuordnen.'],
    summary: ['Sigmoid: kaffeebohnenförmig und typischerweise ohne erkennbare Haustren; Verlauf vom linken Unterbauch nach kranial/rechts.', 'Zökum: Beginn im rechten Unterbauch, kann nach kranial bis epigastrisch oder links oben wandern; Haustren können erhalten sein.', 'Whirl und Bird-beak lokalisieren Verdrehung und Übergang, beweisen allein aber keine Ischämie.'],
    definition: 'Ein Volvulus ist die pathologische Verdrehung eines Darmabschnitts um seine eigene mesenteriale Achse. Die Verdrehung kann eine mechanische Obstruktion verursachen und mesenteriale Gefäße komprimieren; daraus entsteht ein Ischämie- oder Infarktrisiko.',
    sigmoid: 'Das Sigma ist massiv dilatiert und kaffeebohnenförmig; erkennbare Haustren fehlen typischerweise. Die Schlinge steigt meist aus dem linken Unterbauch nach kranial/rechts. Das proximale Kolon kann dilatiert sein.',
    cecum: 'Das Zökumvolvulus beginnt im rechten Unterbauch, kann aber nach kranial bis ins Epigastrium oder den linken Oberbauch wandern. Im Gegensatz zum Sigmavolvulus können Haustren sichtbar bleiben.',
    cecumAssociated: 'Dünndarm kann beteiligt und das distale Kolon ab dem Colon transversum luftleer/kollabiert sein. Die Folie führt den begleitenden Dünndarmileus mit Spiegelbildung darauf zurück, dass die Ileozökalklappe mitbetroffen ist. Eine offene oder kompetente Klappe wird im lesbaren Folientext nicht ausdrücklich benannt.',
    ct: 'Das Whirl-Zeichen beschreibt die spiralförmige Anordnung des verdrehten Darms und seines Mesenteriums. Am Übergang zwischen kollabiertem Colon descendens und rotiertem Sigma kann sich der Darm schnabelförmig zuspitzen (Bird-beak). CT kann zur Bestätigung beitragen, wenn klinische Beurteilung und Röntgen nicht ausreichen, und bei Verdacht auf Ischämie oder Perforation zur Komplikationsbeurteilung eingesetzt werden. Die Zeichen lokalisieren Befunde, beweisen aber für sich keine Ischämie.',
    reportTitle: 'Was im Befund benennen?',
    report: ['Betroffenes Segment, Ausdehnung und Lage der dilatierten Schlinge', 'Übergangszone und, falls sichtbar, Whirl- oder Bird-beak-Zeichen', 'Kaliber und Verteilung von Dünndarm und distalem Kolon', 'Wand- und Gefäßzeichen sowie freie Flüssigkeit oder Luft, ohne Ischämie aus der Schlingenform allein abzuleiten'],
    cave: 'Die PDF benennt die Gefäßkompression als Risiko. Ein einzelnes Morphologiezeichen allein beweist keine Ischämie oder Infarzierung.',
    source: 'Quelle: Abdomen.pdf, physische S. 76–78 (Druckseiten 75–77). CT-Einordnung: WSES consensus guidelines on sigmoid volvulus management, Recommendation 3 (2023); ASCRS Clinical Practice Guideline (2021).',
    reference: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/',
    reference2: 'https://fascrs.org/getattachment/Healthcare-Providers/Education/Clinical-Practice-Guidelines/2021-Colonic-Volvulus-CPG.pdf?lang=en-US',
    caseCheck: {"diagramCaption":"Lehrschema: Kolonverlauf und vereinfachte Volvulus-Konfigurationen; kein diagnostisches Patientenbild.","question":"Welches Röntgenmuster spricht am ehesten für einen Sigmavolvulus?","options":["Stark dilatierte, kaffeebohnenförmige Sigmaschlinge ohne erkennbare Haustren.","Verlagertes dilatiertes Zökum mit kollabiertem distalem Kolon.","Zentrale Dünndarmschlingen mit durchgehenden Querfalten und Stufenleiterkonfiguration.","Diffuse Dilatation mehrerer Darmabschnitte mit Gas bis zum Rektum."],"answer":0,"explanation":"Eine stark dilatierte kaffeebohnenförmige Sigmaschlinge ist ein typischer Hinweis auf Sigmavolvulus. Morphologie und Verlauf gemeinsam beurteilen; daraus allein folgt keine Aussage über Darmviabilität."},
    xrayAlt: 'Zwei Abdomen-Röntgenaufnahmen mit deutlich dilatierter, kaffeebohnenförmiger Sigmaschlinge.',
    xrayCaption: 'Typisches Sigmavolvulus-Muster im Abdomen-Röntgen: dilatierte kaffeebohnenförmige Schlinge ohne erkennbare Haustren. Abdomen.pdf, physische S. 76 (Druckseite 75). Die kleine Quellenzeile unter der Abbildung ist im gelieferten PDF-Raster nicht zuverlässig lesbar. Bildmaterial vom Nutzer bereitgestellt und zur Wiederverwendung freigegeben.',
    ctAlt: 'Axiale und koronare CT-Ansichten eines Sigmavolvulus; pinke Pfeile markieren mesenteriale Verdrehung und Übergangszone.',
    ctCaption: 'CT-Beispiel mit markiertem Whirl- und Bird-beak-Zeichen. Abdomen.pdf, physische S. 78 (Druckseite 77); sichtbare Bildkennung: rID:199019. Im PDF ist kein Beitragender oder gesonderter Lizenztext lesbar; Wiederverwendung beruht auf der ausdrücklichen Freigabe des Nutzers für die PDF-Abbildungen.',
  },
  en: {
    title: 'Mechanical ileus and volvulus',
    volvulusTitle: 'Distinguishing sigmoid and caecal volvulus',
    goals: ['Distinguish sigmoid and caecal volvulus on imaging.', 'Localise the whirl and bird-beak signs on CT.'],
    summary: ['Sigmoid: coffee-bean-shaped, usually without visible haustra; extends cranially/rightward from the left lower abdomen.', 'Caecum: starts in the right lower abdomen and may migrate to the epigastrium or left upper abdomen; haustra may remain visible.', 'Whirl and bird-beak localise the twist and transition but alone do not prove ischaemia.'],
    definition: 'A volvulus is pathological twisting of a bowel segment around its own mesenteric axis. The twist may cause mechanical obstruction and compress mesenteric vessels, creating a risk of ischaemia or infarction.',
    sigmoid: 'The sigmoid is markedly dilated and coffee-bean-shaped; visible haustra are typically absent. The loop usually rises cranially/rightward from the left lower abdomen. The proximal colon may also be dilated.',
    cecum: 'Caecal volvulus starts in the right lower abdomen but may migrate cranially to the epigastrium or left upper abdomen. Unlike sigmoid volvulus, haustra may remain visible.',
    cecumAssociated: 'The small bowel may be involved and the distal colon, from the transverse colon onward, may be gasless/collapsed. The slide attributes accompanying small-bowel ileus with air-fluid levels to involvement of the ileocaecal valve. The legible slide text does not explicitly state that the valve is open or competent.',
    ct: 'The whirl sign describes a spiral configuration of twisted bowel and its mesentery. At the transition between collapsed descending colon and rotated sigmoid, the bowel may taper to a beak (bird-beak sign). CT can help confirm the diagnosis when clinical assessment and radiographs are insufficient, and assess for complications when ischaemia or perforation is suspected. The signs localise findings but do not alone prove ischaemia.',
    reportTitle: 'What to include in the report',
    report: ['Affected segment, extent and position of the dilated loop', 'Transition zone and, when visible, whirl or bird-beak signs', 'Calibre and distribution of small bowel and distal colon', 'Bowel-wall and vascular findings, plus free fluid or air, without inferring ischaemia from loop shape alone'],
    cave: 'The PDF identifies vascular compression as a risk. A single morphology sign alone does not prove ischaemia or infarction.',
    source: 'Source: Abdomen.pdf, physical pp. 76–78 (printed pp. 75–77). CT context: WSES consensus guidelines on sigmoid volvulus management, Recommendation 3 (2023); ASCRS Clinical Practice Guideline (2021).',
    reference: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/',
    reference2: 'https://fascrs.org/getattachment/Healthcare-Providers/Education/Clinical-Practice-Guidelines/2021-Colonic-Volvulus-CPG.pdf?lang=en-US',
    caseCheck: {"diagramCaption":"Teaching schematic of the colon and simplified volvulus configurations; not diagnostic patient imaging.","question":"Which radiographic pattern most strongly suggests sigmoid volvulus?","options":["A markedly dilated coffee-bean-shaped sigmoid loop without visible haustra.","A displaced dilated caecum with a decompressed distal colon.","Central small-bowel loops with full-width folds in a step-ladder configuration.","Diffuse dilatation of several bowel segments with gas extending to the rectum."],"answer":0,"explanation":"A markedly dilated coffee-bean-shaped sigmoid loop is a typical clue to sigmoid volvulus. Assess morphology and course together; this alone does not establish bowel viability."},
    xrayAlt: 'Two abdominal radiographs showing a markedly dilated, coffee-bean-shaped sigmoid loop.',
    xrayCaption: 'Typical sigmoid-volvulus pattern on abdominal radiographs: a dilated coffee-bean-shaped loop without visible haustra. Abdomen.pdf, physical p. 76 (printed p. 75). The small source line beneath the figure is not reliably legible in the supplied PDF raster. Image supplied by the user and authorised for reuse.',
    ctAlt: 'Axial and coronal CT views of sigmoid volvulus; pink arrows mark the mesenteric twist and transition zone.',
    ctCaption: 'CT example with the whirl and bird-beak signs marked. Abdomen.pdf, physical p. 78 (printed p. 77); visible image identifier: rID:199019. No contributor or separate licence text is legible in the PDF; reuse is based on the user’s explicit authorisation for images in the supplied PDFs.',
  },
  fa: {
    title: 'ایلئوس مکانیکی و ولولوس',
    volvulusTitle: 'افتراق ولولوس سیگموئید و سکوم',
    goals: ['ولولوس سیگموئید و سکوم را در تصویربرداری افتراق دهید.', 'نشانه‌های Whirl و Bird-beak را در CT مکان‌یابی کنید.'],
    summary: ['سیگموئید: دانه‌قهوه‌ای و معمولاً بدون هاوسترای واضح؛ امتداد از پایین چپ شکم به سمت بالا/راست.', 'سکوم: آغاز از پایین راست شکم و امکان جابه‌جایی به اپی‌گاستر یا ربع فوقانی چپ؛ هاوسترا ممکن است باقی بماند.', 'Whirl و Bird-beak پیچش و گذار را مکان‌یابی می‌کنند، اما به‌تنهایی ایسکمی را ثابت نمی‌کنند.'],
    definition: 'ولولوس پیچش پاتولوژیک بخشی از روده حول محور مزانتریک خودش است. این پیچش می‌تواند انسداد مکانیکی ایجاد کند و عروق مزانتریک را بفشارد؛ در نتیجه خطر ایسکمی یا انفارکتوس وجود دارد.',
    sigmoid: 'سیگموئید به‌شدت متسع و دانه‌قهوه‌ای است؛ معمولاً هاوسترای قابل مشاهده ندارد. لوپ معمولاً از پایین چپ شکم به سمت بالا/راست می‌رود. کولون پروگزیمال نیز ممکن است متسع باشد.',
    cecum: 'ولولوس سکوم از پایین راست شکم آغاز می‌شود، اما ممکن است به سمت بالا تا اپی‌گاستر یا ربع فوقانی چپ جابه‌جا شود. برخلاف ولولوس سیگموئید، هاوسترا ممکن است قابل مشاهده بماند.',
    cecumAssociated: 'روده باریک ممکن است درگیر شود و کولون دیستال از کولون عرضی به بعد بدون هوا و فروریخته باشد. اسلاید ایلئوس همراه روده باریک و سطوح مایع‌ـ‌هوا را به درگیری دریچه ایلئوسکال نسبت می‌دهد. متن خوانای اسلاید صریحاً از باز یا competent بودن دریچه نام نمی‌برد.',
    ct: 'علامت Whirl آرایش مارپیچی رودهٔ پیچ‌خورده و مزانتر آن را توصیف می‌کند. در محل گذار بین کولون نزولی فروریخته و سیگموئید چرخیده، روده ممکن است به‌شکل منقار باریک شود (Bird-beak). اگر ارزیابی بالینی و رادیوگرافی برای تأیید کافی نباشند، CT می‌تواند به تأیید تشخیص کمک کند؛ در صورت شک به ایسکمی یا سوراخ‌شدگی نیز برای ارزیابی عوارض به‌کار می‌رود. این نشانه‌ها محل یافته‌ها را مشخص می‌کنند، اما به‌تنهایی ایسکمی را ثابت نمی‌کنند.',
    reportTitle: 'چه مواردی در گزارش ذکر شوند؟',
    report: ['سگمان درگیر، وسعت و محل لوپ متسع', 'ناحیه گذار و در صورت مشاهده علائم Whirl یا Bird-beak', 'قطر و توزیع روده باریک و کولون دیستال', 'یافته‌های دیواره و عروق، مایع یا هوای آزاد؛ بدون استنتاج ایسکمی فقط از شکل لوپ'],
    cave: 'PDF فشردگی عروق را به‌عنوان یک خطر مطرح می‌کند. یک نشانه مورفولوژیک منفرد به‌تنهایی ایسکمی یا انفارکتوس را ثابت نمی‌کند.',
    source: 'منبع: Abdomen.pdf، صفحات فیزیکی ۷۶–۷۸ (شماره چاپی ۷۵–۷۷). زمینهٔ CT: راهنمای اجماعی WSES دربارهٔ ولولوس سیگموئید، توصیهٔ ۳ (۲۰۲۳)؛ راهنمای بالینی ASCRS (۲۰۲۱).',
    reference: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10186802/',
    reference2: 'https://fascrs.org/getattachment/Healthcare-Providers/Education/Clinical-Practice-Guidelines/2021-Colonic-Volvulus-CPG.pdf?lang=en-US',
    caseCheck: {"diagramCaption":"شماتیک آموزشی مسیر کولون و نمای ساده‌شده ولولوس؛ تصویر تشخیصی بیمار نیست.","question":"کدام الگوی رادیوگرافی بیشتر به نفع ولولوس سیگموئید است؟","options":["لوپ سیگموئید بسیار متسع و دانه‌قهوه‌ای بدون هاوسترای قابل مشاهده.","سکوم متسع و جابه‌جا با کولون دیستال فروریخته.","لوپ‌های مرکزی رودهٔ باریک با چین‌های تمام‌عرض و آرایش نردبانی.","اتساع منتشر چند بخش روده همراه گاز تا رکتوم."],"answer":0,"explanation":"لوپ سیگموئید بسیار متسع و دانه‌قهوه‌ای سرنخ معمول ولولوس سیگموئید است. شکل و مسیر را با هم بررسی کنید؛ این یافته به‌تنهایی زنده‌مانی روده را تعیین نمی‌کند."},
    xrayAlt: 'دو رادیوگرافی شکم با لوپ سیگموئید به‌شدت متسع و دانه‌قهوه‌ای.',
    xrayCaption: 'الگوی تیپیک ولولوس سیگموئید در رادیوگرافی شکم: لوپ متسع دانه‌قهوه‌ای بدون هاوسترای قابل مشاهده. Abdomen.pdf، صفحه فیزیکی ۷۶ (شماره چاپی ۷۵). خط منبع کوچک زیر تصویر در نسخه رستری PDF به‌طور قابل اطمینان خوانا نیست. تصویر را کاربر فراهم کرده و برای استفاده مجدد مجاز دانسته است.',
    ctAlt: 'نماهای محوری و کرونال CT از ولولوس سیگموئید؛ فلش‌های صورتی پیچش مزانتریک و ناحیه گذار را نشان می‌دهند.',
    ctCaption: 'نمونه CT با نشانه‌های Whirl و Bird-beak مشخص‌شده. Abdomen.pdf، صفحه فیزیکی ۷۸ (شماره چاپی ۷۷)؛ شناسه تصویری خوانا: rID:199019. نام مشارکت‌کننده یا متن مجوز جداگانه در PDF خوانا نیست؛ استفاده بر اساس اجازه صریح کاربر برای تصاویر PDFهای تحویلی است.',
  },
}

export const VOLVULUS_SHELL = {
  goals: [
  {
    "de": "Kaliberwechsel und Closed-loop-Muster räumlich lokalisieren.",
    "en": "Localise transition and closed-loop configuration.",
    "fa": "نقطهٔ گذار و نمای لوپ بسته را مکان‌یابی کنید."
  },
  {
    "de": "Sigmoid- und Zökumvolvulus sowie die CT-Zeichen der Verdrehung unterscheiden.",
    "en": "Distinguish sigmoid/caecal volvulus and CT signs of twisting.",
    "fa": "ولولوس سیگموئید و سکوم و نشانه‌های پیچش در CT را تفکیک کنید."
  },
  {
    "de": "Gallensteinileus und kindliche Invagination anhand von Muster und passender Erstbildgebung einordnen.",
    "en": "Interpret gallstone ileus and childhood intussusception using pattern and appropriate initial imaging.",
    "fa": "ایلئوس سنگ صفراوی و انواژیناسیون کودکان را با الگو و تصویربرداری اولیهٔ مناسب ارزیابی کنید."
  },
  {
    "de": "Verdacht auf Ischämie aus Wand-, Mesenterial- und Schlingenbefund dringlich kommunizieren.",
    "en": "Urgently communicate suspected ischaemia from mural, mesenteric and loop findings.",
    "fa": "شک به ایسکمی را بر اساس دیواره، مزانتر و نمای لوپ فوری اعلام کنید."
  }
],
  summary: [
    { de: VOLVULUS_COPY.de.summary[0], en: VOLVULUS_COPY.en.summary[0], fa: VOLVULUS_COPY.fa.summary[0] },
    { de: VOLVULUS_COPY.de.summary[1], en: VOLVULUS_COPY.en.summary[1], fa: VOLVULUS_COPY.fa.summary[1] },
    { de: VOLVULUS_COPY.de.summary[2], en: VOLVULUS_COPY.en.summary[2], fa: VOLVULUS_COPY.fa.summary[2] },
  ],
  check: {
    diagramCaption: { de: VOLVULUS_COPY.de.caseCheck.diagramCaption, en: VOLVULUS_COPY.en.caseCheck.diagramCaption, fa: VOLVULUS_COPY.fa.caseCheck.diagramCaption },
    question: { de: VOLVULUS_COPY.de.caseCheck.question, en: VOLVULUS_COPY.en.caseCheck.question, fa: VOLVULUS_COPY.fa.caseCheck.question },
    options: [
      { de: VOLVULUS_COPY.de.caseCheck.options[0], en: VOLVULUS_COPY.en.caseCheck.options[0], fa: VOLVULUS_COPY.fa.caseCheck.options[0] },
      { de: VOLVULUS_COPY.de.caseCheck.options[1], en: VOLVULUS_COPY.en.caseCheck.options[1], fa: VOLVULUS_COPY.fa.caseCheck.options[1] },
      { de: VOLVULUS_COPY.de.caseCheck.options[2], en: VOLVULUS_COPY.en.caseCheck.options[2], fa: VOLVULUS_COPY.fa.caseCheck.options[2] },
      { de: VOLVULUS_COPY.de.caseCheck.options[3], en: VOLVULUS_COPY.en.caseCheck.options[3], fa: VOLVULUS_COPY.fa.caseCheck.options[3] },
    ],
    answer: 0,
    wrongFeedback: Object.fromEntries([1,2,3].map(i => [i, Object.fromEntries(['de','en','fa'].map(lang => [lang, VOLVULUS_QUESTIONS[lang][0].wrongExplanations['ABCD'[i]]]))])),
    explanation: { de: VOLVULUS_COPY.de.caseCheck.explanation, en: VOLVULUS_COPY.en.caseCheck.explanation, fa: VOLVULUS_COPY.fa.caseCheck.explanation },
  },
}
