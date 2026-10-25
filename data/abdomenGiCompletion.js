const L = (de, en, fa) => ({ de, en, fa })
const assets = '/educational/abdomen-gi-completion/'
const ulcerCase = { title: 'Tonolini et al. (2017), original clinical example, Fig. 2 · CC BY 4.0', href: 'https://doi.org/10.1007/s13244-017-0562-5' }
const guideline = { title: 'Tarasconi et al. WSES guideline (2020)', href: 'https://doi.org/10.1186/s13017-019-0283-9' }
const diverticulumSeries = { title: 'Macari et al. (2003), CT/MRI findings in seven patients', href: 'https://doi.org/10.2214/ajr.180.1.1800195' }
const cystCases = { title: 'Ng et al. (2016), three diagnostic pitfall cases', href: 'https://doi.org/10.12659/AJCR.896944' }
const typicalCase = { title: 'Pavan et al. (2022), original incidental CT example, Fig. 13 · CC BY 4.0', href: 'https://doi.org/10.1590/0100-3984.2021.0106' }
const largeCase = { title: 'Khan, Chetan & D’Costa (2022), Fig. 3 · CC BY 4.0', href: 'https://doi.org/10.1259/bjrcr.20210196' }
const perforationCase = { title: 'Vasin et al. (2024), surgically confirmed diverticular perforation', href: 'https://doi.org/10.7759/cureus.65494' }
const scope = L('Abdomen.pdf, S. 66: Themenüberschrift. Die Bilddiagnostik wird durch die unten genannten Publikationen ergänzt.', 'Abdomen.pdf, p. 66 supplies the topic heading. Imaging teaching is supplemented by the publications below.', 'صفحهٔ ۶۶ فایل Abdomen.pdf عنوان موضوع را دارد. آموزش تصویربرداری با مقالات زیر تکمیل شده است.')
const q = (slug, prompt, options, answer, explanation, retry) => ({ slug, prompt, options, answer, explanation, retry })
const ulcerChecks = [
  {
    "slug": "negative-ct",
    "source": "https://doi.org/10.1186/s13017-019-0283-9",
    "cardSource": "https://pubmed.ncbi.nlm.nih.gov/25015399/",
    "prompt": {
      "de": "Ein kreislaufstabiler Erwachsener hat Meläna und epigastrische Beschwerden bei Ulkusverdacht. Die CT zeigt keinen Krater. Welche Untersuchung ist zur gezielten Schleimhaut- und Blutungsquellenabklärung am sinnvollsten?",
      "en": "A haemodynamically stable adult has melaena and epigastric symptoms with suspected peptic ulcer. CT shows no crater. Which examination is most appropriate for targeted mucosal and bleeding-source assessment?",
      "fa": "بزرگسال با وضعیت همودینامیک پایدار، ملنا و علائم اپی‌گاستر با شک به زخم پپتیک دارد. CT دهانهٔ زخم نشان نمی‌دهد. برای ارزیابی هدفمند مخاط و منشأ خونریزی کدام بررسی مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Erneute routinemäßige CT des Oberbauchs.",
        "en": "Repeat routine upper-abdominal CT.",
        "fa": "تکرار CT معمول قسمت فوقانی شکم."
      },
      {
        "de": "Ösophagogastroduodenoskopie.",
        "en": "Oesophagogastroduodenoscopy.",
        "fa": "اندوسکوپی مری، معده و دوازدهه."
      },
      {
        "de": "Kontrastmittelpassage des oberen Gastrointestinaltrakts.",
        "en": "Upper gastrointestinal contrast study.",
        "fa": "بررسی عبور مادهٔ حاجب در دستگاه گوارش فوقانی."
      },
      {
        "de": "Sonografie zur Beurteilung der Magenwanddicke.",
        "en": "Ultrasound focused on gastric wall thickness.",
        "fa": "سونوگرافی با تمرکز بر ضخامت دیوارهٔ معده."
      }
    ],
    "answer": 1,
    "explanation": {
      "de": "Ein fehlender CT-Krater schließt ein Schleimhautulkus nicht aus. Bei Verdacht auf eine obere gastrointestinale Blutungsquelle erlaubt die Endoskopie direkte Schleimhautbeurteilung und gegebenenfalls Blutstillung.",
      "en": "Absence of a CT crater does not exclude a mucosal ulcer. With suspected upper gastrointestinal bleeding, endoscopy permits direct mucosal assessment and haemostasis when needed.",
      "fa": "نبود دهانهٔ زخم در CT، زخم مخاطی را رد نمی‌کند. در شک به منشأ خونریزی گوارشی فوقانی، اندوسکوپی ارزیابی مستقیم مخاط و در صورت نیاز هموستاز را ممکن می‌کند."
    },
    "wrongFeedback": {
      "0": {
        "de": "Eine weitere Routine-CT behebt die begrenzte Schleimhautempfindlichkeit nicht zuverlässig und ermöglicht keine endoskopische Blutstillung.",
        "en": "Another routine CT does not reliably overcome limited mucosal sensitivity and cannot provide endoscopic haemostasis.",
        "fa": "CT معمول دیگر محدودیت حساسیت مخاطی را به‌طور قابل‌اعتماد برطرف نمی‌کند و هموستاز اندوسکوپیک نیز ممکن نیست."
      },
      "2": {
        "de": "Eine Kontrastpassage bietet keine direkte endoskopische Schleimhautbeurteilung oder Behandlung der vermuteten Blutungsquelle.",
        "en": "A contrast study does not provide direct endoscopic mucosal assessment or treatment of the suspected bleeding source.",
        "fa": "بررسی عبور مادهٔ حاجب، ارزیابی مستقیم اندوسکوپیک مخاط یا درمان منشأ خونریزی مشکوک را فراهم نمی‌کند."
      },
      "3": {
        "de": "Wanddicke ist unspezifisch; Sonografie ersetzt hier die direkte Schleimhaut- und Blutungsquellenabklärung nicht.",
        "en": "Wall thickness is nonspecific; ultrasound does not replace direct mucosal and bleeding-source assessment here.",
        "fa": "ضخامت دیواره غیراختصاصی است؛ سونوگرافی اینجا جای ارزیابی مستقیم مخاط و منشأ خونریزی را نمی‌گیرد."
      }
    },
    "cardExplanation": {
      "de": "In der endoskopisch kontrollierten Originalstudie blieben zahlreiche Ulzera in der CT unsichtbar. Die Endoskopie beurteilt die Schleimhaut direkt; CT und Endoskopie beantworten unterschiedliche Fragen.",
      "en": "In the original endoscopy-correlated study, many ulcers remained occult on CT. Endoscopy assesses mucosa directly; CT and endoscopy answer different questions.",
      "fa": "در مطالعهٔ اصلی با تطبیق اندوسکوپیک، بسیاری از زخم‌ها در CT دیده نشدند. اندوسکوپی مخاط را مستقیم بررسی می‌کند؛ CT و اندوسکوپی به پرسش‌های متفاوت پاسخ می‌دهند."
    },
    "retry": {
      "de": "Ein fehlender CT-Krater schließt ein Schleimhautulkus nicht aus. Bei Verdacht auf eine obere gastrointestinale Blutungsquelle erlaubt die Endoskopie direkte Schleimhautbeurteilung und gegebenenfalls Blutstillung.",
      "en": "Absence of a CT crater does not exclude a mucosal ulcer. With suspected upper gastrointestinal bleeding, endoscopy permits direct mucosal assessment and haemostasis when needed.",
      "fa": "نبود دهانهٔ زخم در CT، زخم مخاطی را رد نمی‌کند. در شک به منشأ خونریزی گوارشی فوقانی، اندوسکوپی ارزیابی مستقیم مخاط و در صورت نیاز هموستاز را ممکن می‌کند."
    }
  },
  {
    "slug": "perforation",
    "source": "https://doi.org/10.1186/s13017-019-0283-9",
    "prompt": {
      "de": "Akuter Oberbauchschmerz: Die CT zeigt einen fokalen gastroduodenalen Wanddefekt mit angrenzenden extraluminalen Gasbläschen. Welche Komplikation muss vorrangig erwogen und kommuniziert werden?",
      "en": "Acute upper abdominal pain: CT shows a focal gastroduodenal wall defect with adjacent extraluminal gas bubbles. Which complication should be considered and communicated first?",
      "fa": "درد حاد بالای شکم: CT نقص موضعی دیوارهٔ معده یا دوازدهه همراه حباب‌های گاز خارج لومن در مجاورت آن نشان می‌دهد. کدام عارضه باید در اولویت مطرح و اعلام شود؟"
    },
    "options": [
      {
        "de": "Gastroduodenale Perforation.",
        "en": "Gastroduodenal perforation.",
        "fa": "پرفوراسیون معده یا دوازدهه."
      },
      {
        "de": "Gastritis mit submukösem Wandödem.",
        "en": "Gastritis with submucosal oedema.",
        "fa": "گاستریت همراه ادم زیرمخاطی."
      },
      {
        "de": "Gasgefülltes Duodenaldivertikel mit erhaltener Wand.",
        "en": "A gas-filled duodenal diverticulum with an intact wall.",
        "fa": "دیورتیکول دوازدههٔ حاوی گاز با دیوارهٔ سالم."
      },
      {
        "de": "Narbiges pyloroduodenales Passagehindernis.",
        "en": "Scar-related pyloroduodenal outlet obstruction.",
        "fa": "انسداد خروجی پیلور یا دوازدهه به علت اسکار."
      }
    ],
    "answer": 0,
    "explanation": {
      "de": "Wanddefekt und benachbartes extraluminales Gas begründen einen dringlichen Perforationsverdacht. Klinisch-chirurgisch kommunizieren; eine große freie Luftmenge ist dafür keine notwendige Voraussetzung.",
      "en": "A wall defect with adjacent extraluminal gas raises urgent concern for perforation. Communicate for clinical and surgical assessment; a large volume of free air is not required.",
      "fa": "نقص دیواره همراه گاز خارج لومن مجاور، شک فوری به پرفوراسیون ایجاد می‌کند. برای ارزیابی بالینی و جراحی اطلاع دهید؛ وجود حجم زیادی هوای آزاد شرط لازم نیست."
    },
    "wrongFeedback": {
      "1": {
        "de": "Ödem kann die Wand verdicken, erklärt aber einen Defekt mit extraluminalem Gas nicht ausreichend.",
        "en": "Oedema can thicken the wall but does not adequately explain a defect with extraluminal gas.",
        "fa": "ادم می‌تواند دیواره را ضخیم کند، اما نقص همراه گاز خارج لومن را به‌خوبی توضیح نمی‌دهد."
      },
      "2": {
        "de": "Intradivertikuläres Gas liegt innerhalb einer luminal verbundenen Tasche; hier ist Gas außerhalb einer defekten Wand beschrieben.",
        "en": "Intradiverticular gas lies inside a luminally connected pouch; gas outside a disrupted wall is described here.",
        "fa": "گاز داخل دیورتیکول در کیسهٔ مرتبط با لومن قرار دارد؛ اینجا گاز خارج دیوارهٔ گسسته توصیف شده است."
      },
      "3": {
        "de": "Eine narbige Engstelle kann den Magen aufweiten, erklärt aber nicht den beschriebenen Wanddurchbruch mit extraluminalem Gas.",
        "en": "A scar-related narrowing can distend the stomach but does not explain the described wall breach with extraluminal gas.",
        "fa": "تنگی اسکاری می‌تواند معده را متسع کند، اما گسست دیواره همراه گاز خارج لومن را توضیح نمی‌دهد."
      }
    },
    "cardExplanation": {
      "de": "Die Größe der freien Luftmenge ist kein verlässliches Ausschlusskriterium. Bei passendem Wanddefekt, Leckage oder fortbestehendem klinischem Verdacht gezielt weiter abklären und die Dringlichkeit kommunizieren.",
      "en": "The volume of free air is not a reliable exclusion criterion. With a matching wall defect, leakage or persistent clinical suspicion, pursue targeted assessment and communicate urgency.",
      "fa": "حجم هوای آزاد معیار قابل‌اعتماد برای رد نیست. در نقص دیوارهٔ سازگار، نشت یا شک بالینی ماندگار، بررسی هدفمند را ادامه دهید و فوریت را اعلام کنید."
    },
    "retry": {
      "de": "Wanddefekt und benachbartes extraluminales Gas begründen einen dringlichen Perforationsverdacht. Klinisch-chirurgisch kommunizieren; eine große freie Luftmenge ist dafür keine notwendige Voraussetzung.",
      "en": "A wall defect with adjacent extraluminal gas raises urgent concern for perforation. Communicate for clinical and surgical assessment; a large volume of free air is not required.",
      "fa": "نقص دیواره همراه گاز خارج لومن مجاور، شک فوری به پرفوراسیون ایجاد می‌کند. برای ارزیابی بالینی و جراحی اطلاع دهید؛ وجود حجم زیادی هوای آزاد شرط لازم نیست."
    }
  }
]
const diverticulumChecks = [
  q('communication', L('Eine flüssigkeitsreiche Struktur liegt zwischen Pankreaskopf und D2. Welcher zusätzliche Befund stützt ein Divertikel?', 'A fluid-rich structure lies between the pancreatic head and D2. Which additional finding supports a diverticulum?', 'ساختاری پر از مایع بین سر پانکراس و D2 دیده می‌شود. کدام یافتهٔ اضافی به نفع دیورتیکول است؟'), [
    L('T2-Hyperintensität allein.', 'T2 hyperintensity alone.', 'سیگنال بالای T2 به‌تنهایی.'),
    L('Fehlendes Enhancement allein.', 'Absent enhancement alone.', 'نبود افزایش سیگنال پس از تزریق به‌تنهایی.'),
    L('Nachweisbare Verbindung zum Duodenallumen.', 'Demonstrable connection to the duodenal lumen.', 'ارتباط قابل‌مشاهده با لومن دوازدهه.'),
    L('Lage am Pankreaskopf ohne weitere Merkmale.', 'Location at the pancreatic head without other features.', 'قرارگیری کنار سر پانکراس بدون ویژگی دیگری.')
  ], 2, L('Die Verbindung lokalisiert die Struktur zum Darm. Gas oder Speisereste und passende Voraufnahmen können zusätzlich helfen.', 'The connection localises the structure to the bowel. Gas or enteric debris and prior imaging may add support.', 'ارتباط با لومن، منشأ روده‌ای ساختار را مشخص می‌کند. گاز، محتویات روده‌ای و تصاویر قبلی نیز کمک‌کننده‌اند.'), L('Flüssigkeitssignal und fehlendes Enhancement kommen auch in Pankreaszysten vor. Die Beziehung zum Duodenum ist entscheidend.', 'Fluid signal and absent enhancement also occur in pancreatic cysts. The relationship to the duodenum is decisive.', 'سیگنال مایع و نبود افزایش سیگنال پس از تزریق در کیست‌های پانکراس هم دیده می‌شوند. رابطه با دوازدهه تعیین‌کننده است.')),
  q('gas-location', L('Gas in einem Duodenaldivertikel: Welche Einordnung ist richtig?', 'Gas within a duodenal diverticulum: which interpretation is correct?', 'گاز داخل دیورتیکول دوازدهه: کدام تفسیر درست است؟'), [
    L('Gas innerhalb der Tasche beweist eine Perforation.', 'Gas inside the pouch proves perforation.', 'گاز داخل کیسه، پرفوراسیون را اثبات می‌کند.'),
    L('Intradivertikuläres Gas von extraluminalem Gas und Entzündungszeichen unterscheiden.', 'Distinguish intradiverticular gas from extraluminal gas and inflammatory changes.', 'گاز داخل دیورتیکول را از گاز خارج لومن و نشانه‌های التهاب تفکیک کنید.'),
    L('Jedes periampulläre Divertikel ist ein Lemmel-Syndrom.', 'Every periampullary diverticulum is Lemmel syndrome.', 'هر دیورتیکول اطراف آمپول، سندرم لمل است.'),
    L('Ein Gas-Flüssigkeitsspiegel schließt eine begleitende Entzündung aus.', 'An air-fluid level excludes associated inflammation.', 'سطح هوا–مایع، التهاب همراه را رد می‌کند.')
  ], 1, L('Die Tasche gehört zum Darmlumen. Eine Perforation braucht passende Zusatzbefunde; Lemmel bezeichnet eine durch das Divertikel verursachte biliäre Obstruktion.', 'The pouch is part of the bowel lumen. Perforation needs supporting findings; Lemmel syndrome denotes biliary obstruction caused by the diverticulum.', 'کیسه بخشی از لومن روده است. پرفوراسیون به یافته‌های مؤید نیاز دارد؛ سندرم لمل به انسداد صفراوی ناشی از دیورتیکول گفته می‌شود.'), L('Gas kann normaler Divertikelinhalt sein. Weder Perforation noch biliäre Obstruktion darf allein aus der Existenz der Tasche abgeleitet werden.', 'Gas may be normal pouch content. Neither perforation nor biliary obstruction follows merely from the presence of a pouch.', 'گاز می‌تواند محتوای طبیعی دیورتیکول باشد. وجود کیسه به‌تنهایی نه پرفوراسیون را اثبات می‌کند و نه انسداد صفراوی را.'))
]

export const ABDOMEN_GI_LESSONS = [
  {
    id: 'ulkuserkrankung', path: '/abdomen/gi/ulkuserkrankung', title: L('Ulkuserkrankung', 'Peptic ulcer disease', 'بیماری زخم پپتیک'),
    hero: assets + 'ulcer-hero.webp', heroAlt: L('Konzeptillustration eines Schleimhautulkus im Magen; keine diagnostische Aufnahme.', 'Concept illustration of a gastric mucosal ulcer; not a diagnostic image.', 'تصویر مفهومی زخم مخاط معده؛ تصویر تشخیصی نیست.'), scope,
    sources: [ulcerCase, { title: 'Allen et al. (2015), blinded CT/endoscopy study, 114 patients', href: 'https://pubmed.ncbi.nlm.nih.gov/25015399/' }, guideline], checks: ulcerChecks,
    chapters: [
      { id: 'pattern', icon: 'layers', title: L('Vom Schleimhautdefekt zum CT-Zeichen', 'From mucosal defect to CT sign', 'از نقص مخاط تا نشانهٔ CT'), paragraphs: [
        L('Ein peptisches Ulkus ist ein tieferer Schleimhautdefekt in Magen oder Duodenum. Endoskopie beurteilt die Schleimhaut direkt; CT hilft vor allem bei akuten Beschwerden und Komplikationsverdacht.', 'A peptic ulcer is a deeper mucosal defect in the stomach or duodenum. Endoscopy assesses the mucosa directly; CT is particularly useful in acute presentations and suspected complications.', 'زخم پپتیک نقصی عمقی در مخاط معده یا دوازدهه است. اندوسکوپی مخاط را مستقیم بررسی می‌کند؛ CT به‌ویژه در تظاهرات حاد و شک به عارضه کمک‌کننده است.'),
        L('Suche zuerst einen umschriebenen Krater oder eine Unterbrechung der anreichernden Schleimhaut. Wandverdickung, submuköses Ödem und entzündliche Fettgewebsreaktion sind unterstützend, aber allein nicht beweisend.', 'First look for a focal crater or interrupted enhancing mucosa. Wall thickening, submucosal oedema and surrounding fat stranding support the finding but do not establish the diagnosis alone.', 'ابتدا به دنبال دهانهٔ موضعی زخم یا قطع پیوستگی مخاطِ دارای افزایش جذب مادهٔ حاجب باشید. ضخیم‌شدن دیواره، ادم زیرمخاط و التهاب چربی اطراف مؤیدند، اما به‌تنهایی تشخیص را قطعی نمی‌کنند.')
      ] },
      { id: 'ct', icon: 'scope', title: L('Den Krater in mehreren Ebenen suchen', 'Find the crater in several planes', 'دهانهٔ زخم را در چند نما جست‌وجو کنید'), paragraphs: [
        L('Verfolge Antrum, Pylorus und Duodenalbulbus in axialen und multiplanaren Rekonstruktionen. Ein kollabierter Magen kann eine Wandverdickung vortäuschen; deshalb nicht nur die Wanddicke bewerten.', 'Follow the antrum, pylorus and duodenal bulb on axial and multiplanar images. Gastric collapse can mimic wall thickening, so do not assess thickness in isolation.', 'آنتروم، پیلور و بولب دوازدهه را در تصاویر محوری و بازسازی‌های چندصفحه‌ای دنبال کنید. کلاپس معده می‌تواند ضخیم‌شدن دیواره را تقلید کند؛ ضخامت را به‌تنهایی ملاک قرار ندهید.')
      ], image: { src: assets + 'ulcer-ct.png', width: 709, height: 233, alt: L('Drei CT-Ebenen mit Pfeilen auf einen präpylorischen Ulkuskrater und Sternchen im Wandödem.', 'Three CT planes with arrows at a prepyloric ulcer crater and asterisks within mural oedema.', 'سه نمای CT با فلش روی دهانهٔ زخم پیش‌پیلوری و ستاره روی ادم دیواره.'), caption: L('Originalfall: tiefer präpylorischer Krater (breite Pfeile), umgebendes Wandödem (*). Der Krater wurde endoskopisch bestätigt. Die Originalmarkierungen sind unverändert.', 'Original case: deep prepyloric crater (broad arrows) and surrounding mural oedema (*). Endoscopy confirmed the crater. Original annotations are unchanged.', 'کیس اصلی: دهانهٔ عمقی زخم پیش‌پیلوری (فلش‌های پهن) و ادم دیوارهٔ اطراف (*). زخم با اندوسکوپی تأیید شد. علامت‌های اصلی تغییر نکرده‌اند.'), source: ulcerCase },
        cave: L('Ein unauffälliges CT schließt ein oberflächliches Ulkus nicht aus. Eine verdächtige irreguläre Magenwand braucht endoskopische Abklärung, gegebenenfalls mit Biopsie; CT beweist keine Gutartigkeit.', 'Normal CT does not exclude a superficial ulcer. Suspicious irregular gastric wall requires endoscopic assessment, with biopsy where indicated; CT cannot establish benignity.', 'CT طبیعی زخم سطحی را رد نمی‌کند. دیوارهٔ نامنظم و مشکوک معده به ارزیابی اندوسکوپیک و در صورت لزوم بیوپسی نیاز دارد؛ CT خوش‌خیمی را اثبات نمی‌کند.'), checks: [0] },
      { id: 'complications', icon: 'scope', title: L('Komplikationen ändern die Dringlichkeit', 'Complications change urgency', 'عارضه، فوریت را تغییر می‌دهد'), rows: [
        [L('Perforation', 'Perforation', 'پرفوراسیون'), L('Wanddefekt, angrenzendes extraluminales Gas oder Leckage: sofort kommunizieren. Fehlende freie Luft schließt eine gedeckte Perforation nicht sicher aus.', 'Wall defect, adjacent extraluminal gas or leakage: communicate promptly. Absent free air does not reliably exclude contained perforation.', 'نقص دیواره، گاز خارج لومن مجاور یا نشت: فوری اطلاع دهید. نبود هوای آزاد، پرفوراسیون محدودشده را با اطمینان رد نمی‌کند.')],
        [L('Blutung', 'Bleeding', 'خونریزی'), L('Intraluminale Kontrastmittelextravasation spricht für aktive Blutung. Endoskopie hat eine zentrale diagnostische und therapeutische Rolle.', 'Intraluminal contrast extravasation suggests active bleeding. Endoscopy has a central diagnostic and therapeutic role.', 'خروج مادهٔ حاجب به داخل لومن به نفع خونریزی فعال است. اندوسکوپی نقش محوری تشخیصی و درمانی دارد.')],
        [L('Passagehindernis', 'Outlet obstruction', 'انسداد خروجی معده'), L('Magenüberdehnung und pyloroduodenale Engstelle beschreiben; entzündliche, narbige und neoplastische Ursachen unterscheiden.', 'Describe gastric distension and pyloroduodenal narrowing; distinguish inflammatory, scar-related and neoplastic causes.', 'اتساع معده و تنگی پیلور یا دوازدهه را توصیف کنید؛ علل التهابی، اسکاری و نئوپلاستیک را تفکیک کنید.')]
      ], checks: [1] },
      { id: 'takehome', icon: 'summary', emphasis: true, title: L('Take Home Message', 'Take Home Message', 'نکات کلیدی'), takeaways: [L('Krater suchen, Begleitentzündung einordnen.', 'Find the crater; interpret associated inflammation.', 'دهانهٔ زخم را پیدا کنید و التهاب همراه را تفسیر کنید.'), L('Negatives CT ersetzt keine indizierte Endoskopie.', 'Negative CT does not replace indicated endoscopy.', 'CT منفی جای اندوسکوپیِ موردنیاز را نمی‌گیرد.'), L('Perforation und aktive Blutung sofort mitteilen.', 'Communicate perforation and active bleeding immediately.', 'پرفوراسیون و خونریزی فعال را فوراً اطلاع دهید.')] }
    ]
  },
  {
    id: 'duodenaldivertikel', path: '/abdomen/gi/duodenaldivertikel', title: L('Duodenaldivertikel', 'Duodenal diverticulum', 'دیورتیکول دوازدهه'),
    hero: assets + 'diverticulum-hero.webp', heroAlt: L('Konzeptillustration des Duodenums mit einer nach außen gerichteten Wandtasche; keine CT.', 'Concept illustration of a duodenal wall pouch; not CT.', 'تصویر مفهومی کیسه‌ای در دیوارهٔ دوازدهه؛ CT نیست.'), scope,
    sources: [diverticulumSeries, cystCases, typicalCase, largeCase, perforationCase], checks: diverticulumChecks,
    chapters: [
      { id: 'pattern', icon: 'layers', title: L('Eine Tasche mit Verbindung zum Darm', 'A pouch connected to the bowel', 'کیسه‌ای مرتبط با روده'), paragraphs: [
        L('Ein extraluminal gelegenes Duodenaldivertikel ist eine Ausstülpung mit Verbindung zum Duodenallumen. Häufig liegt es medial an D2, nahe dem Pankreaskopf. Viele werden zufällig entdeckt.', 'An extraluminal duodenal diverticulum is an outpouching connected to the duodenal lumen. It often lies medially along D2, near the pancreatic head. Many are incidental findings.', 'دیورتیکول خارج‌لومنی دوازدهه، بیرون‌زدگی‌ای است که با لومن دوازدهه ارتباط دارد. اغلب در سمت داخلی D2 و کنار سر پانکراس قرار دارد. بسیاری به‌طور اتفاقی کشف می‌شوند.')
      ], image: { src: assets + 'diverticulum-typical.jpg', width: 385, height: 314, alt: L('Axiale native CT: Pfeil auf eine gas- und flüssigkeitshaltige duodenale Tasche neben dem Pankreaskopf.', 'Axial unenhanced CT: arrow indicates a gas- and fluid-containing duodenal pouch near the pancreatic head.', 'CT محوری بدون تزریق: فلش کیسهٔ حاوی گاز و مایع دوازدهه را کنار سر پانکراس نشان می‌دهد.'), caption: L('Typischer Zufallsbefund: Gas über Flüssigkeit in der markierten Tasche. Die Aufnahme zeigt den Inhalt; die Verbindung zum Duodenum muss zusätzlich über benachbarte Schichten verfolgt werden. Originalabbildung unverändert.', 'Typical incidental finding: gas above fluid within the marked pouch. This image shows the contents; assess the duodenal connection across adjacent slices. Original figure unchanged.', 'یافتهٔ اتفاقی تیپیک: گاز بالای مایع در کیسهٔ علامت‌گذاری‌شده. این تصویر محتویات را نشان می‌دهد؛ ارتباط با دوازدهه باید در برش‌های مجاور نیز دنبال شود. تصویر اصلی بدون تغییر است.'), source: typicalCase } },
      { id: 'differentiate', icon: 'scope', title: L('Nicht mit einer Pankreaszyste verwechseln', 'Avoid mistaking it for a pancreatic cyst', 'با کیست پانکراس اشتباه نکنید'), paragraphs: [
        L('Verfolge den Hals der Tasche in mehreren Ebenen. Gas, Speisereste oder wechselnde Füllung unterstützen die Darmzugehörigkeit. Vergleiche Voraufnahmen, nicht nur alte Befundtexte.', 'Trace the neck of the pouch in several planes. Gas, enteric debris or changing filling support bowel origin. Compare prior images, not just prior reports.', 'گردن کیسه را در چند نما دنبال کنید. گاز، محتویات روده‌ای یا تغییر پُرشدگی به نفع منشأ روده‌ای است. خود تصاویر قبلی را مقایسه کنید، نه فقط گزارش‌ها را.'),
        L('Bei rein flüssigem Inhalt kann die Tasche einer Pankreaszyste ähneln. T2-Hyperintensität oder fehlendes Enhancement allein lösen diese Frage nicht. Bleibt die Zuordnung unklar, ist gezielte weitere Abklärung erforderlich.', 'When filled only with fluid, the pouch may resemble a pancreatic cyst. T2 hyperintensity or absent enhancement alone does not resolve the distinction. Uncertain origin requires targeted further assessment.', 'وقتی کیسه فقط از مایع پُر باشد، ممکن است شبیه کیست پانکراس شود. سیگنال بالای T2 یا نبود افزایش سیگنال پس از تزریق به‌تنهایی افتراق‌دهنده نیست. اگر منشأ نامشخص بماند، بررسی تکمیلی هدفمند لازم است.')
      ], checks: [0] },
      { id: 'complications', icon: 'scope', title: L('Inhalt oder Komplikation?', 'Contents or complication?', 'محتویات طبیعی یا عارضه؟'), paragraphs: [
        L('Gas innerhalb der Tasche ist nicht dasselbe wie Gas außerhalb des Darmlumens. Wandödem und entzündliche Umgebungsreaktion sprechen für Divertikulitis; zusätzliche extraluminale Luft oder eine Kollektion können eine Perforation anzeigen.', 'Gas inside the pouch differs from gas outside the bowel lumen. Mural oedema and surrounding inflammation suggest diverticulitis; additional extraluminal air or a collection may indicate perforation.', 'گاز داخل کیسه با گاز خارج لومن روده متفاوت است. ادم دیواره و التهاب اطراف، دیورتیکولیت را مطرح می‌کنند؛ هوای خارج لومن یا تجمع مایع همراه می‌تواند نشانهٔ پرفوراسیون باشد.'),
        L('Ein periampulläres Divertikel allein ist kein Lemmel-Syndrom. Dafür muss eine durch das Divertikel verursachte biliäre Obstruktion vorliegen; andere Ursachen wie Steine oder Tumor sind zu prüfen.', 'A periampullary diverticulum alone is not Lemmel syndrome. There must be biliary obstruction attributable to the diverticulum; assess alternatives such as stones or tumour.', 'وجود دیورتیکول اطراف آمپول به‌تنهایی سندرم لمل نیست. باید انسداد صفراوی ناشی از دیورتیکول وجود داشته باشد؛ علل دیگری مانند سنگ یا تومور را بررسی کنید.')
      ], image: { src: assets + 'diverticulum-fluoro.jpg', width: 520, height: 347, alt: L('Zwei Durchleuchtungsaufnahmen eines kontrastmittelgefüllten großen Duodenaldivertikels.', 'Two fluoroscopic images of a large contrast-filled duodenal diverticulum.', 'دو تصویر فلوروسکوپی از دیورتیکول بزرگ دوازدهه که با مادهٔ حاجب پُر شده است.'), caption: L('Bewusst großes Gegenbeispiel: In diesem Fall füllte sich ein Divertikel vom Duodenum aus, ohne nachgewiesene extraluminale Leckage. Es war zunächst als gedeckte Perforation fehlgedeutet worden. Nicht als typische Größe verstehen. Originalabbildung unverändert.', 'Deliberately large pitfall example: this pouch filled from the duodenum without demonstrated extraluminal leakage. It had initially been mistaken for contained perforation. Its size is not typical. Original figure unchanged.', 'نمونهٔ بزرگ برای نشان‌دادن دام تشخیصی: کیسه از دوازدهه پُر شد، بدون نشت اثبات‌شده به خارج لومن. ابتدا به‌اشتباه پرفوراسیون محدودشده تلقی شده بود. اندازهٔ آن تیپیک نیست. تصویر اصلی بدون تغییر است.'), source: largeCase }, checks: [1] },
      { id: 'takehome', icon: 'summary', emphasis: true, title: L('Take Home Message', 'Take Home Message', 'نکات کلیدی'), takeaways: [L('Verbindung zum Duodenum suchen.', 'Look for connection to the duodenum.', 'ارتباط با دوازدهه را جست‌وجو کنید.'), L('Flüssigkeitsgefüllte Taschen können Pankreaszysten imitieren.', 'Fluid-filled pouches can mimic pancreatic cysts.', 'کیسه‌های پُر از مایع می‌توانند کیست پانکراس را تقلید کنند.'), L('Divertikelinhalt, Entzündung und extraluminale Luft getrennt beurteilen.', 'Assess pouch contents, inflammation and extraluminal air separately.', 'محتویات کیسه، التهاب و هوای خارج لومن را جداگانه ارزیابی کنید.')] }
    ]
  }
]

const fourthFeedback = [
 L('Wandödem ist unspezifisch und schließt ein Ulkus nicht aus.', 'Mural oedema is nonspecific and does not exclude an ulcer.', 'ادم دیواره غیراختصاصی است و زخم را رد نمی‌کند.'),
 L('Auch kleine extraluminale Gasbläschen neben einem Wanddefekt können eine Perforation anzeigen.', 'Even small extraluminal gas bubbles beside a wall defect may indicate perforation.', 'حتی حباب‌های کوچک گاز خارج لومن کنار نقص دیواره می‌توانند نشانهٔ پرفوراسیون باشند.'),
 L('Die Nähe zum Pankreaskopf allein trennt Divertikel und Pankreaszyste nicht; die Verbindung zum Darm hilft.', 'Proximity to the pancreatic head alone does not distinguish diverticulum from pancreatic cyst; bowel connection helps.', 'نزدیکی به سر پانکراس به‌تنهایی دیورتیکول را از کیست پانکراس جدا نمی‌کند؛ ارتباط با روده کمک‌کننده است.'),
 L('Ein Gas-Flüssigkeitsspiegel beschreibt den Inhalt und schließt Entzündung nicht aus. Wand und Umgebung zusätzlich beurteilen.', 'An air-fluid level describes contents and does not exclude inflammation. Assess the wall and surrounding tissues too.', 'سطح هوا–مایع فقط محتویات را توصیف می‌کند و التهاب را رد نمی‌کند. دیواره و بافت اطراف را نیز بررسی کنید.')
]
ABDOMEN_GI_LESSONS.flatMap(lesson => lesson.checks).forEach((check, index) => { if (!ulcerChecks.includes(check)) check.wrongFeedback = { 3: fourthFeedback[index] } })
// Revised text-only differential vignettes: no claim about an uninspected case frame.
diverticulumChecks[0].options=[L('Homogen hohes T2-Signal.','Homogeneous high T2 signal.','سیگنال بالای همگن در T2.'),L('Fehlendes Binnen-Enhancement.','Absent internal enhancement.','نبود تقویت داخلی.'),L('Nachweisbare Verbindung zum Duodenallumen.','Demonstrable connection to the duodenal lumen.','ارتباط قابل‌مشاهده با لومن دوازدهه.'),L('Lage zwischen D2 und Pankreaskopf.','Location between D2 and the pancreatic head.','قرارگیری بین D2 و سر پانکراس.')]
diverticulumChecks[1].prompt=L('Textfall: CT zeigt eine dünnwandige Gas-Flüssigkeits-Tasche mit sichtbarer Verbindung zu D2, ohne Umgebungsentzündung, extraluminale Luft oder Gallenstau. Welche Einordnung passt am besten?','Text vignette: CT shows a thin-walled gas-fluid pouch visibly connected to D2, without surrounding inflammation, extraluminal air or biliary dilatation. Which interpretation fits best?','سناریوی متنی: CT کیسه‌ای با دیوارهٔ نازک و حاوی گاز و مایع با ارتباط قابل‌مشاهده با D2 نشان می‌دهد، بدون التهاب اطراف، هوای خارج لومن یا اتساع صفراوی. کدام تفسیر مناسب‌تر است؟')
diverticulumChecks[1].options=[L('Gedeckte Duodenalperforation mit Abszess.','Contained duodenal perforation with abscess.','پرفوراسیون محدودشدهٔ دوازدهه همراه با آبسه.'),L('Duodenaldivertikel mit Darminhalt ohne beschriebene Komplikationszeichen.','A duodenal diverticulum containing bowel contents without described complication signs.','دیورتیکول دوازدهه حاوی محتویات روده‌ای، بدون نشانهٔ عارضه در توصیف.'),L('Primär pankreatischer Abszess.','A primary pancreatic abscess.','آبسهٔ اولیهٔ پانکراس.'),L('Biliär obstruierendes periampulläres Divertikel (Lemmel-Syndrom).','A periampullary diverticulum causing biliary obstruction (Lemmel syndrome).','دیورتیکول اطراف آمپول همراه با انسداد صفراوی، سندرم لمل.')]
diverticulumChecks[1].explanation=L('Die nachgewiesene Darmverbindung erklärt Gas und Flüssigkeit als Divertikelinhalt. Der Text nennt keine peridivertikulären Entzündungs-, Leckage- oder Obstruktionszeichen. Diese Bereiche dennoch getrennt prüfen; eine Tasche oder Gas darin allein definiert weder Perforation noch Lemmel-Syndrom.','The demonstrated bowel connection explains gas and fluid as diverticular contents. The vignette describes no peridiverticular inflammation, leak or obstruction signs. Still assess these separately; a pouch or gas within it alone defines neither perforation nor Lemmel syndrome.','ارتباط نشان‌داده‌شده با روده، گاز و مایع را به‌عنوان محتوای دیورتیکول توضیح می‌دهد. سناریو نشانه‌ای از التهاب اطراف دیورتیکول، نشت یا انسداد ذکر نمی‌کند. با این حال این موارد را جداگانه بررسی کنید؛ کیسه یا گاز داخل آن به‌تنهایی نه پرفوراسیون را مشخص می‌کند و نه سندرم لمل را.')
// Per-option explanations remain shared by inline checks and the canonical quiz producer.
diverticulumChecks[0].wrongFeedback={
0:L('Flüssigkeit ist in Divertikeln und Pankreaszysten T2-hell; das lokalisiert die Struktur nicht.','Fluid is T2-bright in both diverticula and pancreatic cysts; this does not localise the structure.','مایع هم در دیورتیکول و هم در کیست پانکراس در T2 پرسیگنال است؛ این ویژگی محل منشأ را مشخص نمی‌کند.'),
1:L('Fehlendes Enhancement kann bei beiden vorkommen; die Lumenkontinuität ist hier hilfreicher.','Absent enhancement can occur in both; luminal continuity is more helpful here.','نبود تقویت در هر دو ممکن است؛ پیوستگی با لومن در اینجا کمک‌کننده‌تر است.'),
3:L('Beide Strukturen können am Pankreaskopf liegen; die Nachbarschaft allein trennt sie nicht.','Both structures can lie near the pancreatic head; proximity alone does not distinguish them.','هر دو ساختار می‌توانند کنار سر پانکراس باشند؛ مجاورت به‌تنهایی آن‌ها را جدا نمی‌کند.')}
diverticulumChecks[1].wrongFeedback={
0:L('Der Text lokalisiert das Gas in der dünnwandigen, mit dem Darm verbundenen Tasche; Zeichen eines Abszesses oder einer Leckage werden nicht beschrieben.','The vignette places the gas in a thin-walled bowel-connected pouch; abscess or leak signs are not described.','سناریو گاز را در کیسهٔ نازک‌دیوارهٔ مرتبط با روده قرار می‌دهد؛ نشانهٔ آبسه یا نشت توصیف نشده است.'),
2:L('Die sichtbare D2-Verbindung lokalisiert die Struktur zum Darm; eine primär pankreatische infizierte Kollektion ist hier nicht beschrieben.','The visible D2 connection localises the structure to bowel; a primary infected pancreatic collection is not described.','ارتباط قابل‌مشاهده با D2 ساختار را به روده مکان‌یابی می‌کند؛ کالکشن عفونی اولیهٔ پانکراس در اینجا توصیف نشده است.'),
3:L('Für Lemmel braucht es eine durch das Divertikel verursachte biliäre Obstruktion; der Text beschreibt keinen Gallenstau.','Lemmel syndrome requires biliary obstruction caused by the diverticulum; no biliary dilatation is described.','سندرم لمل به انسداد صفراوی ناشی از دیورتیکول نیاز دارد؛ در متن اتساع صفراوی توصیف نشده است.')}
diverticulumChecks.find(check=>check.slug==='gas-location').source='https://doi.org/10.2214/ajr.180.1.1800195; https://doi.org/10.1259/bjrcr.20210196; https://doi.org/10.1016/j.radcr.2022.11.013'
ABDOMEN_GI_LESSONS.find(lesson=>lesson.id==='duodenaldivertikel').sources.push({ title:'El Houssni et al. (2023): two original Lemmel syndrome cases', href:'https://doi.org/10.1016/j.radcr.2022.11.013' })
export const ABDOMEN_GI_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, ABDOMEN_GI_LESSONS.flatMap(lesson => lesson.checks.map(c => ({
  id: `${lesson.id}-${c.slug}-${lang}`, fach: 'abdomen', tags: [lesson.id], question: c.prompt[lang], options: c.options.map((o, i) => ({ id: 'ABCD'[i], text: o[lang] })), correct: 'ABCD'[c.answer], explanation: c.explanation[lang], wrongExplanations: Object.fromEntries(c.options.flatMap((_, i) => i === c.answer ? [] : [['ABCD'[i], c.wrongFeedback?.[i]?.[lang] || c.retry[lang]]])), source: c.source || lesson.sources.map(s => s.href).join('; ')
})))]))
const cardPrompts = [
  [L('Warum schließt ein unauffälliges CT ein peptisches Ulkus nicht sicher aus?', 'Why does normal CT not reliably exclude peptic ulcer disease?', 'چرا CT طبیعی نمی‌تواند زخم پپتیک را با اطمینان رد کند؟'), L('Welche CT-Zeichen bei akutem Oberbauchschmerz lassen an eine gastroduodenale Perforation denken?', 'Which CT signs in acute upper abdominal pain suggest gastroduodenal perforation?', 'در درد حاد بالای شکم، کدام نشانه‌های CT پرفوراسیون معده یا دوازدهه را مطرح می‌کنند؟')],
  [L('Welche Befunde helfen, ein Duodenaldivertikel von einer Pankreaszyste abzugrenzen?', 'Which findings help distinguish a duodenal diverticulum from a pancreatic cyst?', 'کدام یافته‌ها به افتراق دیورتیکول دوازدهه از کیست پانکراس کمک می‌کنند؟'), L('Warum beweist Gas in einem Duodenaldivertikel keine Perforation?', 'Why does gas in a duodenal diverticulum not prove perforation?', 'چرا گاز داخل دیورتیکول دوازدهه، پرفوراسیون را اثبات نمی‌کند؟')]
]
const cardAnswers = [
  [ulcerChecks[0].explanation, L('Fokaler Wanddefekt mit angrenzendem extraluminalem Gas oder Kontrastmittelleckage. Den Verdacht dringlich kommunizieren; fehlende freie Luft schließt eine gedeckte Perforation nicht sicher aus.', 'Focal wall defect with adjacent extraluminal gas or contrast leakage. Communicate suspicion urgently; absent free air does not reliably exclude contained perforation.', 'نقص موضعی دیواره با گاز خارج لومن مجاور یا نشت مادهٔ حاجب. شک را فوری اطلاع دهید؛ نبود هوای آزاد، پرفوراسیون محدودشده را با اطمینان رد نمی‌کند.')],
  [L('Verbindung zum Duodenallumen, Gas oder enterischer Inhalt, passende Voraufnahmen und wechselnde Füllung. Flüssigkeitssignal allein reicht nicht.', 'Duodenal luminal connection, gas or enteric contents, matching prior images and changing filling. Fluid signal alone is insufficient.', 'ارتباط با لومن دوازدهه، گاز یا محتویات روده‌ای، تصاویر قبلی سازگار و تغییر پُرشدگی. سیگنال مایع به‌تنهایی کافی نیست.'), L('Die Tasche kommuniziert mit dem Darm und darf Gas enthalten. Extraluminale Luft, Wanddefekt und entzündliche Veränderungen getrennt auf Komplikationen prüfen.', 'The pouch communicates with bowel and may contain gas. Assess extraluminal air, wall defect and inflammatory changes separately for complications.', 'کیسه با روده ارتباط دارد و می‌تواند حاوی گاز باشد. هوای خارج لومن، نقص دیواره و تغییرات التهابی را جداگانه از نظر عارضه بررسی کنید.')]
]
diverticulumChecks[1].cardExplanation=L('Eine luminal verbundene duodenale Tasche kann Gas und Flüssigkeit als Darminhalt enthalten. Intradivertikulären Inhalt von extraluminaler Leckage und Umgebungsentzündung unterscheiden. Ein Lemmel-Syndrom setzt eine entsprechende biliäre Obstruktion voraus; die Tasche allein reicht nicht.','A luminally connected duodenal pouch may contain gas and fluid as bowel contents. Distinguish intradiverticular contents from extraluminal leakage and surrounding inflammation. Lemmel syndrome requires corresponding biliary obstruction; the pouch alone is insufficient.','کیسهٔ دوازدهه‌ایِ مرتبط با لومن می‌تواند گاز و مایعِ محتویات روده داشته باشد. محتوای داخل دیورتیکول را از نشت خارج لومن و التهاب اطراف تفکیک کنید. سندرم لمل به انسداد صفراوی متناظر نیاز دارد؛ وجود کیسه به‌تنهایی کافی نیست.')
export const ABDOMEN_GI_CARDS = ABDOMEN_GI_LESSONS.flatMap((lesson, n) => lesson.checks.map((c, i) => ({ id: `${lesson.id}-${c.slug}`, topicId: lesson.id, category: lesson.title, front: cardPrompts[n][i], answer: cardAnswers[n][i], explanation: c.cardExplanation || c.explanation, source: c.cardSource || c.source || lesson.sources.map(s => s.href).join('; ') })))
export const ABDOMEN_GI_CARD_TOPICS = ABDOMEN_GI_LESSONS.map(lesson => ({ id: lesson.id, href: `/flashcards/${lesson.id}`, title: lesson.title, description: lesson.title, icon: '◉', color: '#477e85' }))
export const ABDOMEN_GI_TOPIC_GROUPS = ABDOMEN_GI_LESSONS.map(lesson => ({ fachId: 'abdomen', kapitelId: 'abdomen-gi-trakt', title: lesson.title, topics: [{ id: lesson.id, title: lesson.title }] }))
