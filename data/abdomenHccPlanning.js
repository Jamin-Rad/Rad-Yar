// Canonical liver-planning and diagnostic LI-RADS pools. No shared-bank override.
export const HCC_PLANNING = {
  "title": {
    "de": "Was braucht die Therapieplanung?",
    "en": "What does treatment planning need?",
    "fa": "برای برنامه‌ریزی درمان چه لازم است؟"
  },
  "intro": {
    "de": "Tumorlast, Gefäßinvasion, extrahepatische Ausbreitung, Leberfunktion und Allgemeinzustand gemeinsam im Tumorboard bewerten. Die Bildgebung liefert dafür die anatomische Grundlage.",
    "en": "The tumour board integrates tumour burden, vascular invasion, extrahepatic spread, liver function and performance status. Imaging provides the anatomical basis.",
    "fa": "تیم توموربورد بار تومور، تهاجم عروقی، انتشار خارج‌کبدی، عملکرد کبد و وضعیت عمومی را با هم ارزیابی می‌کند. تصویربرداری پایهٔ آناتومیک این تصمیم است."
  },
  "rows": [
    [
      {
        "de": "Resektion",
        "en": "Resection",
        "fa": "رزکسیون"
      },
      {
        "de": "Tumorbezug zu Gefäßen sowie Volumen und Funktion der verbleibenden Leber beurteilen. Portalhypertonie und Leberreserve beeinflussen die Eignung.",
        "en": "Assess vascular relationships and the volume and function of the future liver remnant. Portal hypertension and liver reserve affect suitability.",
        "fa": "ارتباط با عروق و حجم و عملکرد کبد باقی‌مانده ارزیابی شود. پرفشاری پورت و ذخیرهٔ عملکردی کبد بر مناسب‌بودن جراحی اثر دارند."
      }
    ],
    [
      {
        "de": "Thermische Ablation",
        "en": "Thermal ablation",
        "fa": "ابلیشن حرارتی"
      },
      {
        "de": "Radiofrequenz oder Mikrowellen zerstören Gewebe durch Hitze. Die MWA-Antenne wird bildgesteuert platziert. Größe, sichere Zugangswege, Gefäße und Gallengangsnähe sind wichtig; eine pauschale 5-cm-Regel reicht nicht.",
        "en": "Radiofrequency or microwave energy destroys tissue by heat. The microwave antenna is placed under imaging guidance. Size, safe access, vessels and bile-duct proximity matter; a universal 5-cm rule is insufficient.",
        "fa": "انرژی رادیوفرکانسی یا مایکروویو با گرما بافت را تخریب می‌کند. آنتن مایکروویو با هدایت تصویربرداری جای‌گذاری می‌شود. اندازه، مسیر ایمن دسترسی، عروق و مجاورت مجاری صفراوی مهم‌اند؛ قاعدهٔ عمومی ۵ سانتی‌متر کافی نیست."
      }
    ],
    [
      {
        "de": "TACE",
        "en": "TACE",
        "fa": "TACE"
      },
      {
        "de": "Arterielle Chemotherapie plus Embolisation. Selektive Versorgung, erhaltener Portalfluss, Tumorverteilung und ausreichende Leberfunktion bestimmen die Eignung. Eine starre Prozentgrenze der Tumorlast ersetzt diese Prüfung nicht.",
        "en": "Arterial chemotherapy plus embolisation. Selective access, preserved portal flow, tumour distribution and adequate liver function determine suitability. A fixed percentage of tumour burden does not replace this assessment.",
        "fa": "شیمی‌درمانی شریانی همراه آمبولیزاسیون است. دسترسی انتخابی، حفظ جریان پورت، توزیع تومور و عملکرد کافی کبد تعیین‌کننده‌اند. درصد ثابت بار تومور جای این ارزیابی را نمی‌گیرد."
      }
    ],
    [
      {
        "de": "SIRT / TARE",
        "en": "SIRT / TARE",
        "fa": "SIRT / TARE"
      },
      {
        "de": "Radioaktive Mikrosphären werden über die tumorversorgende Arterie appliziert. Bei ausgewählten HCC ist SIRT eine Option, auch ohne vorheriges TACE-Versagen; Gefäßplanung und Dosimetrie sind erforderlich.",
        "en": "Radioactive microspheres are delivered through the tumour-feeding artery. SIRT is an option in selected HCC, including without prior TACE failure; vascular planning and dosimetry are required.",
        "fa": "میکروسفرهای رادیواکتیو از طریق شریان تغذیه‌کنندهٔ تومور تزریق می‌شوند. SIRT در HCC منتخب، حتی بدون شکست قبلی TACE، یک گزینه است؛ برنامه‌ریزی عروقی و دوزیمتری لازم‌اند."
      }
    ]
  ],
  "note": {
    "de": "Keine vollständige Therapieempfehlung: Transplantation und systemische Verfahren gehören je nach Stadium ebenfalls zur Auswahl. Grundlage: AASLD2023 und EASL2025; die starren Regeln des PDF wurden qualifiziert.",
    "en": "This is not a complete treatment algorithm: transplantation and systemic options also enter selection according to stage. Based on AASLD2023 and EASL2025; rigid PDF rules have been qualified.",
    "fa": "این الگوریتم کامل درمان نیست؛ پیوند و درمان‌های سیستمیک نیز بسته به مرحله مطرح‌اند. مبنا AASLD2023 و EASL2025 است؛ قواعد ثابت PDF با قیدهای لازم اصلاح شده‌اند."
  }
}
export const LIRADS_NEXT = {
  "title": {
    "de": "Von der Kategorie zum nächsten Schritt",
    "en": "From category to next step",
    "fa": "از رده به اقدام بعدی"
  },
  "rows": [
    [
      "LR-3",
      {
        "de": "Erneute kontrastverstärkte CT oder MRT in 3–6 Monaten (AASLD2023).",
        "en": "Repeat contrast-enhanced CT or MRI in 3–6 months (AASLD2023).",
        "fa": "تکرار CT یا MRI با تزریق طی ۳ تا ۶ ماه (AASLD2023)."
      }
    ],
    [
      "LR-4",
      {
        "de": "Interdisziplinär entscheiden: erneute Bildgebung innerhalb von 3 Monaten oder Biopsie. Wenn eine sofortige Diagnose die Behandlung verändert, Biopsie bevorzugen.",
        "en": "Multidisciplinary choice: repeat imaging within 3 months or biopsy. Prefer biopsy when an immediate diagnosis would change management.",
        "fa": "تصمیم چندرشته‌ای: تکرار تصویربرداری طی ۳ ماه یا بیوپسی. اگر تشخیص فوری درمان را تغییر می‌دهد، بیوپسی ترجیح دارد."
      }
    ],
    [
      "LR-5",
      {
        "de": "In der geeigneten Risikopopulation ist meist eine nichtinvasive HCC-Diagnose möglich. Staging und Therapieplanung anschließen; eine Biopsie kann für ausgewählte diagnostische oder molekulare Fragen dennoch sinnvoll sein.",
        "en": "In the eligible risk population, a noninvasive HCC diagnosis is usually possible. Proceed to staging and treatment planning; biopsy may still be useful for selected diagnostic or molecular questions.",
        "fa": "در جمعیت پرخطر واجد شرایط، معمولاً تشخیص غیرتهاجمی HCC ممکن است. مرحله‌بندی و برنامه‌ریزی درمان دنبال شود؛ بیوپسی برای پرسش‌های تشخیصی یا مولکولی منتخب همچنان ممکن است مفید باشد."
      }
    ]
  ]
}
export const LIRADS_QUESTIONS = {
  "de": [
    {
      "id": "li-rads-de-eligible",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "Bei welcher erwachsenen Person ist diagnostisches CT/MRT-LI-RADS v2018 anwendbar? In allen Fällen liegt eine technisch geeignete Mehrphasenuntersuchung einer unbehandelten, nicht biopsierten Beobachtung vor; Hepatitis B und früheres HCC sind ausgeschlossen.",
      "options": [
        {
          "id": "A",
          "text": "Zirrhose nach chronischer Hepatitis C"
        },
        {
          "id": "B",
          "text": "Steatotische Leber ohne Zirrhose"
        },
        {
          "id": "C",
          "text": "Zirrhose durch kardiale Stauung"
        },
        {
          "id": "D",
          "text": "Kongenitale hepatische Fibrose"
        }
      ],
      "correct": "A",
      "explanation": "Die HCV-bedingte Zirrhose erfüllt hier die erwachsene Risikopopulation. Vor jeder Kategorie müssen zusätzlich Technik und unbehandelter Status passen.",
      "wrongExplanations": {
        "B": "Steatose ohne Zirrhose erfüllt bei ausgeschlossener Hepatitis B und fehlendem HCC in der Vorgeschichte die Zielpopulation nicht.",
        "C": "Kardial bedingte vaskuläre Zirrhose ist ausdrücklich ausgenommen: benigne hyperplastische Knoten können die Spezifität beeinträchtigen.",
        "D": "Kongenitale hepatische Fibrose ist eine ausdrückliche Ausnahme, auch wenn eine Leberbeobachtung technisch gut untersucht ist."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "li-rads-de-lr4",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "Bei Zirrhose bleibt eine Beobachtung nach technisch vollständiger Bildgebung LR-4. Die jetzt anstehende Therapieentscheidung hängt davon ab, ob tatsächlich HCC vorliegt; Gewebe fehlt. Welche Strategie ist nach AASLD2023 vorrangig im Tumorboard zu besprechen?",
      "options": [
        {
          "id": "A",
          "text": "Erneute Kontrast-MRT innerhalb von 3 Monaten"
        },
        {
          "id": "B",
          "text": "Erneute Mehrphasen-CT nach 6 Monaten"
        },
        {
          "id": "C",
          "text": "Zeitnahe gezielte Biopsie nach multidisziplinärer Abwägung"
        },
        {
          "id": "D",
          "text": "Lokale HCC-Therapie auf Grundlage der Kategorie beginnen"
        }
      ],
      "correct": "C",
      "explanation": "AASLD empfiehlt bei LR-4 eine individuelle Wahl zwischen Kontrastbildgebung innerhalb von 3 Monaten und Biopsie. Wenn die sofortige Diagnose das Management verändert, wird die Biopsie gegenüber bloßer Verlaufskontrolle bevorzugt.",
      "wrongExplanations": {
        "A": "Die 3-Monats-Bildgebung ist eine LR-4-Option; hier würde jedoch die jetzt benötigte Diagnose die Therapie ändern, weshalb Gewebeklärung vorrangig besprochen wird.",
        "B": "Sechs Monate überschreiten das empfohlene enge LR-4-Intervall und lösen die aktuelle diagnoseabhängige Entscheidung nicht.",
        "D": "LR-4 bedeutet wahrscheinlich, nicht sicher HCC. Im beschriebenen Fall ist die Diagnose noch zu klären, bevor eine darauf gestützte Therapie festgelegt wird."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/"
    },
    {
      "id": "aq-atv-li-rads-de-major-rule",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "Zirrhose, geeignete Mehrphasen-MRT mit extrazellulärem Kontrastmittel: zwei unbehandelte 15-mm-Beobachtungen, beide mit nonrim APHE, ohne LR-M-Merkmale oder Tumor in vein. X zeigt nicht-peripheres portalvenöses Wash-out; Y eine anreichernde Kapsel, aber kein Wash-out und kein Schwellenwachstum. Welche Kategorien gelten nach v2018?",
      "options": [
        {
          "id": "A",
          "text": "X: LR-5; Y: LR-5"
        },
        {
          "id": "B",
          "text": "X: LR-5; Y: LR-4"
        },
        {
          "id": "C",
          "text": "X: LR-4; Y: LR-5"
        },
        {
          "id": "D",
          "text": "X: LR-4; Y: LR-4"
        }
      ],
      "correct": "B",
      "explanation": "Bei 10–19 mm erreicht nonrim APHE plus nicht-peripheres Wash-out LR-5. APHE plus anreichernde Kapsel allein bleibt in dieser Größenklasse LR-4; Schwellenwachstum wäre ebenfalls ein Weg zu LR-5.",
      "wrongExplanations": {
        "A": "X ist LR-5, aber Y erreicht mit der Kapsel allein bei 15 mm nicht LR-5.",
        "C": "Die Kombinationen sind vertauscht: Wash-out bei X trägt hier LR-5, die Kapsel allein bei Y LR-4.",
        "D": "Y ist LR-4; X erfüllt jedoch trotz seiner Größe unter 20 mm die spezielle LR-5-Regel."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "aq-atv-li-rads-de-ancillary-limit",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "Eine nach Major Features zunächst LR-3 eingeordnete Beobachtung zeigt nicht-targetoide Diffusionsrestriktion und hepatobiliäre Hypointensität. Keine benignitätsstützenden Ancillary Features, kein Tumor in vein oder LR-M-Merkmal. Welche höchste Kategorie ist durch diese Zusatzzeichen nach ACR v2018 zulässig?",
      "options": [
        {
          "id": "A",
          "text": "LR-2"
        },
        {
          "id": "B",
          "text": "LR-3"
        },
        {
          "id": "C",
          "text": "LR-4"
        },
        {
          "id": "D",
          "text": "LR-5"
        }
      ],
      "correct": "C",
      "explanation": "Malignitätsstützende Ancillary Features dürfen optional um eine Kategorie, höchstens bis LR-4, hochstufen. Sie erlauben kein LR-5. Bei gleichzeitigen benignitäts- und malignitätsstützenden Ancillary Features wird nicht angepasst.",
      "wrongExplanations": {
        "A": "Die genannten Zusatzzeichen sprechen für Malignität und begründen keine Herabstufung auf LR-2.",
        "B": "LR-3 beizubehalten ist bei optionaler Anwendung möglich; gefragt ist aber die höchste erlaubte Einstufung, hier LR-4.",
        "D": "LR-5 verlangt die entsprechenden Hauptmerkmalsregeln; Diffusion und hepatobiliäres Signal ersetzen diese nicht."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "aq-atv-li-rads-de-tiv-specificity",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "In der geeigneten LI-RADS-Zielgruppe zeigt eine vollständige MRT eindeutig anreicherndes Weichteilgewebe in einem Pfortaderast. Eine zugehörige parenchymale Masse lässt sich nicht sicher charakterisieren. Welche Befundformulierung passt am besten?",
      "options": [
        {
          "id": "A",
          "text": "LR-5: HCC mit venöser Ausbreitung"
        },
        {
          "id": "B",
          "text": "LR-M: intrahepatisches Cholangiokarzinom mit venöser Ausbreitung"
        },
        {
          "id": "C",
          "text": "LR-NC: wegen fehlender abgrenzbarer Parenchymmasse"
        },
        {
          "id": "D",
          "text": "LR-TIV: Tumor in der Vene; Ursprung anhand weiterer Befunde einordnen"
        }
      ],
      "correct": "D",
      "explanation": "Eindeutig anreicherndes Weichteilgewebe in einer Vene ist LR-TIV, auch ohne sichtbare Parenchymmasse. Die Kategorie ist nicht HCC-spezifisch; betroffene Vene, Ausdehnung und vermuteten Ursprung berichten, soweit beurteilbar.",
      "wrongExplanations": {
        "A": "Tumor in vein wird als LR-TIV kategorisiert; der venöse Befund allein beweist keine HCC-Ätiologie.",
        "B": "Auch nicht-HCC-Malignome können Tumor in vein verursachen, doch hier ist ein Cholangiokarzinom nicht nachgewiesen; die Sonderkategorie ist LR-TIV.",
        "C": "LR-NC betrifft unzureichende Information zur Kategorisierung. Der hier eindeutig beurteilbare venöse Tumor erlaubt LR-TIV auch ohne abgrenzbare Masse."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    }
  ],
  "en": [
    {
      "id": "li-rads-en-eligible",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "In which adult is diagnostic CT/MRI LI-RADS v2018 applicable? Each has an adequate multiphasic study of an untreated, non-biopsied observation; hepatitis B and prior HCC are excluded.",
      "options": [
        {
          "id": "A",
          "text": "Cirrhosis after chronic hepatitis C"
        },
        {
          "id": "B",
          "text": "Steatotic liver without cirrhosis"
        },
        {
          "id": "C",
          "text": "Cirrhosis due to cardiac congestion"
        },
        {
          "id": "D",
          "text": "Congenital hepatic fibrosis"
        }
      ],
      "correct": "A",
      "explanation": "HCV-related cirrhosis meets the adult risk population here. Technical adequacy and untreated status must also be checked before categorisation.",
      "wrongExplanations": {
        "B": "Steatosis without cirrhosis does not meet the target population when hepatitis B and prior HCC are absent.",
        "C": "Cardiac vascular cirrhosis is explicitly excluded: benign hyperplastic nodules can reduce specificity.",
        "D": "Congenital hepatic fibrosis is an explicit exclusion even when the liver observation is well imaged."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "li-rads-en-lr4",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "In cirrhosis, an observation remains LR-4 after technically complete imaging. The treatment decision now depends on whether it is HCC, and tissue is unavailable. Which strategy should be prioritised for multidisciplinary discussion under AASLD2023?",
      "options": [
        {
          "id": "A",
          "text": "Repeat contrast MRI within 3 months"
        },
        {
          "id": "B",
          "text": "Repeat multiphasic CT after 6 months"
        },
        {
          "id": "C",
          "text": "Prompt targeted biopsy after multidisciplinary assessment"
        },
        {
          "id": "D",
          "text": "Begin local HCC treatment based on the category"
        }
      ],
      "correct": "C",
      "explanation": "For LR-4, AASLD recommends individual selection between repeat contrast imaging within 3 months and biopsy. When an immediate diagnosis changes management, biopsy is preferred over repeat imaging alone.",
      "wrongExplanations": {
        "A": "Three-month imaging is an LR-4 option, but here the diagnosis needed now would change treatment, prioritising tissue clarification.",
        "B": "Six months exceeds the recommended close LR-4 interval and does not resolve the current diagnosis-dependent decision.",
        "D": "LR-4 means probably, not definitely HCC. In this case, diagnosis still needs clarification before selecting diagnosis-dependent treatment."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/"
    },
    {
      "id": "aq-atv-li-rads-en-major-rule",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "Cirrhosis and adequate multiphasic extracellular-agent MRI: two untreated 15-mm observations, both with nonrim APHE, no LR-M features or tumour in vein. X has nonperipheral portal venous washout; Y has an enhancing capsule but no washout or threshold growth. Which v2018 categories apply?",
      "options": [
        {
          "id": "A",
          "text": "X: LR-5; Y: LR-5"
        },
        {
          "id": "B",
          "text": "X: LR-5; Y: LR-4"
        },
        {
          "id": "C",
          "text": "X: LR-4; Y: LR-5"
        },
        {
          "id": "D",
          "text": "X: LR-4; Y: LR-4"
        }
      ],
      "correct": "B",
      "explanation": "At 10–19 mm, nonrim APHE plus nonperipheral washout reaches LR-5. APHE plus an enhancing capsule alone remains LR-4 in this size group; threshold growth is another route to LR-5.",
      "wrongExplanations": {
        "A": "X is LR-5, but capsule alone does not make the 15-mm Y observation LR-5.",
        "C": "The combinations are reversed: washout supports LR-5 for X, whereas capsule alone yields LR-4 for Y.",
        "D": "Y is LR-4, but X meets the specific LR-5 rule despite being under 20 mm."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "aq-atv-li-rads-en-ancillary-limit",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "An observation is initially LR-3 by major features and shows nontargetoid diffusion restriction and hepatobiliary hypointensity. There are no benignity-favouring ancillary features, tumour in vein or LR-M features. What is the highest category permitted by these additional signs under ACR v2018?",
      "options": [
        {
          "id": "A",
          "text": "LR-2"
        },
        {
          "id": "B",
          "text": "LR-3"
        },
        {
          "id": "C",
          "text": "LR-4"
        },
        {
          "id": "D",
          "text": "LR-5"
        }
      ],
      "correct": "C",
      "explanation": "Malignancy-favouring ancillary features may optionally upgrade by one category, no higher than LR-4. They cannot establish LR-5. When benignity- and malignancy-favouring ancillary features coexist, do not adjust.",
      "wrongExplanations": {
        "A": "These additional signs favour malignancy and do not support downgrading to LR-2.",
        "B": "Retaining LR-3 is possible because use is optional, but the question asks for the highest permitted category, LR-4.",
        "D": "LR-5 requires the relevant major-feature rules; diffusion and hepatobiliary signal do not replace them."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "aq-atv-li-rads-en-tiv-specificity",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "In the eligible LI-RADS population, a complete MRI shows unequivocally enhancing soft tissue in a portal vein branch. An associated parenchymal mass cannot be confidently characterised. Which report statement is most appropriate?",
      "options": [
        {
          "id": "A",
          "text": "LR-5: HCC with venous spread"
        },
        {
          "id": "B",
          "text": "LR-M: intrahepatic cholangiocarcinoma with venous spread"
        },
        {
          "id": "C",
          "text": "LR-NC: because no discrete parenchymal mass is delineated"
        },
        {
          "id": "D",
          "text": "LR-TIV: tumour in vein; assess origin using additional findings"
        }
      ],
      "correct": "D",
      "explanation": "Unequivocally enhancing soft tissue in a vein is LR-TIV even without a visible parenchymal mass. The category is not HCC-specific; report involved vein, extent and suspected origin when assessable.",
      "wrongExplanations": {
        "A": "Tumour in vein is categorised LR-TIV; the venous finding alone does not prove HCC aetiology.",
        "B": "Non-HCC malignancies can also cause tumour in vein, but cholangiocarcinoma is not established here; the special category is LR-TIV.",
        "C": "LR-NC denotes inadequate information for categorisation. The unequivocal venous tumour permits LR-TIV even without a discrete mass."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    }
  ],
  "fa": [
    {
      "id": "li-rads-fa-eligible",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "LI-RADS تشخیصی CT/MRI نسخهٔ ۲۰۱۸ در کدام بزرگسال کاربرد دارد؟ در همهٔ موارد بررسی چندفازی مناسبِ ضایعه‌ای درمان‌نشده و بیوپسی‌نشده موجود است؛ هپاتیت B و HCC قبلی رد شده‌اند.",
      "options": [
        {
          "id": "A",
          "text": "سیروز پس از هپاتیت C مزمن"
        },
        {
          "id": "B",
          "text": "کبد استئاتوتیک بدون سیروز"
        },
        {
          "id": "C",
          "text": "سیروز ناشی از احتقان قلبی"
        },
        {
          "id": "D",
          "text": "فیبروز مادرزادی کبد"
        }
      ],
      "correct": "A",
      "explanation": "سیروز ناشی از HCV در اینجا جمعیت پرخطر بزرگسال را برآورده می‌کند. پیش از تعیین رده، کفایت فنی و درمان‌نشده‌بودن نیز باید بررسی شوند.",
      "wrongExplanations": {
        "B": "استئاتوز بدون سیروز، با نبود هپاتیت B و سابقهٔ HCC، گروه هدف را برآورده نمی‌کند.",
        "C": "سیروز عروقی ناشی از بیماری قلبی صریحاً مستثناست؛ ندول‌های هیپرپلاستیک خوش‌خیم می‌توانند اختصاصیت را کاهش دهند.",
        "D": "فیبروز مادرزادی کبد صریحاً مستثناست، حتی اگر ضایعهٔ کبد به‌خوبی تصویربرداری شده باشد."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "li-rads-fa-lr4",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "در بیمار سیروتیک، ضایعه پس از تصویربرداری کامل از نظر فنی همچنان LR-4 است. تصمیم درمانی فعلی به وجود واقعی HCC وابسته است و بافت در دسترس نیست. طبق AASLD2023 کدام راهبرد باید در بحث چندتخصصی در اولویت باشد؟",
      "options": [
        {
          "id": "A",
          "text": "تکرار MRI با حاجب طی ۳ ماه"
        },
        {
          "id": "B",
          "text": "تکرار CT چندفازی پس از ۶ ماه"
        },
        {
          "id": "C",
          "text": "بیوپسی هدفمند زودهنگام پس از ارزیابی چندتخصصی"
        },
        {
          "id": "D",
          "text": "شروع درمان موضعی HCC بر پایهٔ رده"
        }
      ],
      "correct": "C",
      "explanation": "AASLD در LR-4 انتخاب فردی بین تصویربرداری با حاجب طی ۳ ماه و بیوپسی را توصیه می‌کند. اگر تشخیص فوری مدیریت را تغییر دهد، بیوپسی بر صرف پیگیری تصویربرداری ترجیح دارد.",
      "wrongExplanations": {
        "A": "تصویربرداری سه‌ماهه یکی از گزینه‌های LR-4 است، اما اینجا تشخیص موردنیاز فعلی درمان را تغییر می‌دهد و بررسی بافت در اولویت است.",
        "B": "شش ماه از فاصلهٔ کوتاه توصیه‌شده برای LR-4 بیشتر است و تصمیم فعلی وابسته به تشخیص را حل نمی‌کند.",
        "D": "LR-4 به معنی HCC محتمل است، نه قطعی. در این مورد، پیش از انتخاب درمان وابسته به تشخیص باید ماهیت ضایعه روشن شود."
      },
      "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/"
    },
    {
      "id": "aq-atv-li-rads-fa-major-rule",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "در سیروز و MRI چندفازی مناسب با حاجب خارج‌سلولی، دو ضایعهٔ درمان‌نشدهٔ ۱۵ میلی‌متری هر دو APHE غیرحاشیه‌ای دارند و فاقد ویژگی LR-M یا تومور داخل وریدند. X واش‌اوت غیرمحیطی پورتال دارد؛ Y کپسول دارای جذب دارد، ولی واش‌اوت و رشد آستانه‌ای ندارد. طبق نسخهٔ ۲۰۱۸ رده‌ها کدام‌اند؟",
      "options": [
        {
          "id": "A",
          "text": "X: LR-5؛ Y: LR-5"
        },
        {
          "id": "B",
          "text": "X: LR-5؛ Y: LR-4"
        },
        {
          "id": "C",
          "text": "X: LR-4؛ Y: LR-5"
        },
        {
          "id": "D",
          "text": "X: LR-4؛ Y: LR-4"
        }
      ],
      "correct": "B",
      "explanation": "در اندازهٔ ۱۰ تا ۱۹ میلی‌متر، APHE غیرحاشیه‌ای همراه واش‌اوت غیرمحیطی به LR-5 می‌رسد. APHE همراه کپسول دارای جذب به‌تنهایی در این گروه LR-4 می‌ماند؛ رشد آستانه‌ای نیز راه دیگری برای LR-5 است.",
      "wrongExplanations": {
        "A": "X برابر LR-5 است، اما کپسول به‌تنهایی ضایعهٔ ۱۵ میلی‌متری Y را LR-5 نمی‌کند.",
        "C": "ترکیب‌ها جابه‌جا شده‌اند: واش‌اوت در X اینجا LR-5 و کپسول به‌تنهایی در Y ردهٔ LR-4 می‌دهد.",
        "D": "Y برابر LR-4 است؛ اما X با وجود اندازهٔ زیر ۲۰ میلی‌متر قاعدهٔ ویژهٔ LR-5 را برآورده می‌کند."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "aq-atv-li-rads-fa-ancillary-limit",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "ضایعه طبق ویژگی‌های اصلی ابتدا LR-3 است و محدودیت انتشار غیرهدف‌مانند و کم‌سیگنالی هپاتوبیلیاری دارد. ویژگی کمکی به نفع خوش‌خیمی، تومور داخل ورید یا ویژگی LR-M وجود ندارد. طبق ACR2018 این علائم تکمیلی حداکثر چه رده‌ای را مجاز می‌کنند؟",
      "options": [
        {
          "id": "A",
          "text": "LR-2"
        },
        {
          "id": "B",
          "text": "LR-3"
        },
        {
          "id": "C",
          "text": "LR-4"
        },
        {
          "id": "D",
          "text": "LR-5"
        }
      ],
      "correct": "C",
      "explanation": "ویژگی‌های کمکی به نفع بدخیمی می‌توانند به‌صورت اختیاری یک رده ارتقا دهند، حداکثر تا LR-4. آن‌ها LR-5 ایجاد نمی‌کنند. با هم‌زمانی ویژگی کمکی به نفع خوش‌خیمی و بدخیمی، رده تغییر نمی‌کند.",
      "wrongExplanations": {
        "A": "این علائم تکمیلی به نفع بدخیمی‌اند و کاهش به LR-2 را توجیه نمی‌کنند.",
        "B": "حفظ LR-3 به‌دلیل اختیاری‌بودن کاربرد ممکن است، اما سؤال بالاترین ردهٔ مجاز، یعنی LR-4 را می‌خواهد.",
        "D": "LR-5 به قواعد مربوط به ویژگی‌های اصلی نیاز دارد؛ دیفیوژن و سیگنال هپاتوبیلیاری جای آن‌ها را نمی‌گیرند."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    },
    {
      "id": "aq-atv-li-rads-fa-tiv-specificity",
      "fach": "abdomen",
      "tags": [
        "li-rads"
      ],
      "question": "در جمعیت مناسب LI-RADS، MRI کامل بافت نرم داخل شاخهٔ ورید پورت با جذب قطعی نشان می‌دهد. تودهٔ پارانشیمی همراه را نمی‌توان با اطمینان مشخص کرد. کدام عبارت گزارش مناسب‌تر است؟",
      "options": [
        {
          "id": "A",
          "text": "LR-5: HCC با انتشار وریدی"
        },
        {
          "id": "B",
          "text": "LR-M: کلانژیوکارسینوم داخل‌کبدی با انتشار وریدی"
        },
        {
          "id": "C",
          "text": "LR-NC: به‌علت نبود تودهٔ پارانشیمی قابل تفکیک"
        },
        {
          "id": "D",
          "text": "LR-TIV: تومور داخل ورید؛ منشأ با یافته‌های تکمیلی ارزیابی شود"
        }
      ],
      "correct": "D",
      "explanation": "بافت نرم داخل ورید با جذب قطعی، حتی بدون تودهٔ پارانشیمی قابل مشاهده، LR-TIV است. این رده اختصاصی HCC نیست؛ ورید درگیر، وسعت و منشأ احتمالی تا حد قابل ارزیابی گزارش شوند.",
      "wrongExplanations": {
        "A": "تومور داخل ورید LR-TIV طبقه‌بندی می‌شود؛ یافتهٔ وریدی به‌تنهایی منشأ HCC را اثبات نمی‌کند.",
        "B": "بدخیمی‌های غیر HCC نیز می‌توانند تومور داخل ورید ایجاد کنند، اما اینجا کلانژیوکارسینوم ثابت نشده است؛ ردهٔ ویژه LR-TIV است.",
        "C": "LR-NC به اطلاعات ناکافی برای تعیین رده مربوط است. تومور وریدی قطعی اینجا حتی بدون تودهٔ مجزا، تعیین LR-TIV را ممکن می‌کند."
      },
      "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
    }
  ]
}
export const LIRADS_CARDS = [
  {
    "id": "li-rads-eligible",
    "topicId": "li-rads",
    "category": {
      "de": "LI-RADS",
      "en": "LI-RADS",
      "fa": "LI-RADS"
    },
    "front": {
      "de": "Welche Patienten und Untersuchungen gehören zur diagnostischen CT/MRT-LI-RADS-Zielgruppe?",
      "en": "Which patients and examinations are eligible for diagnostic CT/MRI LI-RADS?",
      "fa": "کدام بیماران و بررسی‌ها برای LI-RADS تشخیصی CT/MRI مناسب‌اند؟"
    },
    "answer": {
      "de": "Erwachsene mit Zirrhose, chronischer Hepatitis B oder aktuellem/früherem HCC und geeigneter Mehrphasen-CT/MRT.",
      "en": "Adults with cirrhosis, chronic hepatitis B or current/prior HCC and suitable multiphasic CT/MRI.",
      "fa": "بزرگسالان مبتلا به سیروز، هپاتیت B مزمن یا HCC فعلی/قبلی با CT/MRI چندفازی مناسب."
    },
    "explanation": {
      "de": "Kongenitale hepatische Fibrose und bestimmte vaskuläre Zirrhosen, etwa durch kardiale Stauung, sind ausgenommen. Erst Eignung prüfen, dann eine unbehandelte Beobachtung kategorisieren.",
      "en": "Congenital hepatic fibrosis and certain vascular causes of cirrhosis, such as cardiac congestion, are excluded. Check eligibility before categorising an untreated observation.",
      "fa": "فیبروز مادرزادی کبد و برخی علل عروقی سیروز، مانند احتقان قلبی، مستثنا هستند. پیش از رده‌بندی ضایعهٔ درمان‌نشده، مناسب‌بودن شرایط بررسی شود."
    },
    "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf",
    "diagram": null
  },
  {
    "id": "li-rads-lr4",
    "topicId": "li-rads",
    "category": {
      "de": "LI-RADS",
      "en": "LI-RADS",
      "fa": "LI-RADS"
    },
    "front": {
      "de": "LR-4 nach vollständiger Bildgebung: Wann eher Biopsie statt erneuter Bildgebung?",
      "en": "LR-4 after complete imaging: when is biopsy favoured over repeat imaging?",
      "fa": "LR-4 پس از تصویربرداری کامل: چه زمانی بیوپسی بر تکرار تصویربرداری ترجیح دارد؟"
    },
    "answer": {
      "de": "Wenn die jetzt benötigte Diagnose die Behandlung verändern würde: zeitnahe Biopsie im multidisziplinären Kontext erwägen.",
      "en": "When an immediate diagnosis would change treatment: consider prompt biopsy in a multidisciplinary context.",
      "fa": "اگر تشخیص فوری درمان را تغییر دهد: بیوپسی زودهنگام در زمینهٔ چندتخصصی در نظر گرفته شود."
    },
    "explanation": {
      "de": "AASLD2023 nennt für LR-4 Biopsie oder erneute Kontrastbildgebung innerhalb von 3 Monaten. Die konkrete klinische Entscheidung bestimmt die Wahl; LR-4 bedeutet nicht sicher HCC.",
      "en": "AASLD2023 lists biopsy or repeat contrast imaging within 3 months for LR-4. The clinical decision determines the choice; LR-4 is not definite HCC.",
      "fa": "AASLD2023 برای LR-4 بیوپسی یا تکرار تصویربرداری با حاجب طی ۳ ماه را مطرح می‌کند. تصمیم بالینی مشخص انتخاب را تعیین می‌کند؛ LR-4 به معنی HCC قطعی نیست."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/",
    "diagram": null
  },
  {
    "id": "aq-atv-li-rads-major-rule",
    "topicId": "li-rads",
    "front": {
      "de": "10–19 mm mit nonrim APHE: Was unterscheidet Wash-out von Kapsel allein für LR-5?",
      "en": "At 10–19 mm with nonrim APHE, how does washout differ from capsule alone for LR-5?",
      "fa": "در اندازهٔ ۱۰ تا ۱۹ میلی‌متر همراه APHE غیرحاشیه‌ای، تفاوت واش‌اوت و کپسول به‌تنهایی برای LR-5 چیست؟"
    },
    "answer": {
      "de": "Nicht-peripheres Wash-out → LR-5; anreichernde Kapsel allein → LR-4 (v2018).",
      "en": "Nonperipheral washout → LR-5; enhancing capsule alone → LR-4 (v2018).",
      "fa": "واش‌اوت غیرمحیطی ← LR-5؛ کپسول دارای جذب به‌تنهایی ← LR-4 (نسخهٔ ۲۰۱۸)."
    },
    "explanation": {
      "de": "Zielgruppe, Technik und Ausschluss vorrangiger Sonderkategorien müssen stimmen. APHE plus Schwellenwachstum ist in dieser Größenklasse ebenfalls ein LR-5-Weg.",
      "en": "Eligibility, technique and exclusion of preceding special categories must be satisfied. APHE plus threshold growth is another LR-5 route in this size group.",
      "fa": "گروه هدف، کفایت فنی و نبود رده‌های ویژهٔ مقدم باید تأیید شوند. APHE همراه رشد آستانه‌ای نیز در این گروه اندازه راه دیگری به LR-5 است."
    },
    "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf",
    "diagram": null
  },
  {
    "id": "aq-atv-li-rads-ancillary-limit",
    "topicId": "li-rads",
    "front": {
      "de": "Wie weit dürfen malignitätsstützende Ancillary Features hochstufen?",
      "en": "How far may malignancy-favouring ancillary features upgrade an observation?",
      "fa": "ویژگی‌های کمکی به نفع بدخیمی تا چه حد اجازهٔ ارتقا می‌دهند؟"
    },
    "answer": {
      "de": "Optional um eine Kategorie, höchstens bis LR-4; nie allein zu LR-5.",
      "en": "Optionally by one category, no higher than LR-4; never to LR-5 by themselves.",
      "fa": "به‌صورت اختیاری یک رده، حداکثر تا LR-4؛ به‌تنهایی هرگز تا LR-5."
    },
    "explanation": {
      "de": "Malignitätsstützende Ancillary Features dürfen optional um eine Kategorie, höchstens bis LR-4, hochstufen. Sie erlauben kein LR-5. Bei gleichzeitigen benignitäts- und malignitätsstützenden Ancillary Features wird nicht angepasst.",
      "en": "Malignancy-favouring ancillary features may optionally upgrade by one category, no higher than LR-4. They cannot establish LR-5. When benignity- and malignancy-favouring ancillary features coexist, do not adjust.",
      "fa": "ویژگی‌های کمکی به نفع بدخیمی می‌توانند به‌صورت اختیاری یک رده ارتقا دهند، حداکثر تا LR-4. آن‌ها LR-5 ایجاد نمی‌کنند. با هم‌زمانی ویژگی کمکی به نفع خوش‌خیمی و بدخیمی، رده تغییر نمی‌کند."
    },
    "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf",
    "diagram": null
  },
  {
    "id": "aq-atv-li-rads-tiv-specificity",
    "topicId": "li-rads",
    "front": {
      "de": "Was definiert LR-TIV, und beweist es HCC?",
      "en": "What defines LR-TIV, and does it prove HCC?",
      "fa": "چه چیزی LR-TIV را تعریف می‌کند و آیا HCC را اثبات می‌کند؟"
    },
    "answer": {
      "de": "Eindeutig anreicherndes Weichteilgewebe in einer Vene; es ist nicht HCC-spezifisch.",
      "en": "Unequivocally enhancing soft tissue within a vein; it is not HCC-specific.",
      "fa": "بافت نرم داخل ورید با جذب قطعی مادهٔ حاجب؛ اختصاصی HCC نیست."
    },
    "explanation": {
      "de": "Eine sichtbare parenchymale Masse ist nicht erforderlich. Betroffene Vene, Ausdehnung und vermuteten Ursprung berichten; Expansion oder Restriktion allein definiert LR-TIV nicht.",
      "en": "A visible parenchymal mass is not required. Report involved vein, extent and suspected origin; expansion or restriction alone does not define LR-TIV.",
      "fa": "وجود تودهٔ پارانشیمی قابل مشاهده الزامی نیست. ورید درگیر، وسعت و منشأ احتمالی گزارش شوند؛ اتساع یا محدودیت انتشار به‌تنهایی LR-TIV را تعریف نمی‌کند."
    },
    "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf",
    "diagram": null
  }
]
export const LIRADS_CARD_TOPIC = {
  "id": "li-rads",
  "href": "/flashcards/li-rads",
  "title": {
    "de": "LI-RADS",
    "en": "LI-RADS",
    "fa": "LI-RADS"
  },
  "description": {
    "de": "Population und nächste Schritte",
    "en": "Population and next steps",
    "fa": "گروه هدف و اقدام بعدی"
  },
  "icon": "◉",
  "color": "#477e85"
}
export const LIRADS_TOPIC_GROUP = {
  "fachId": "abdomen",
  "kapitelId": "abdomen-leber",
  "title": {
    "de": "LI-RADS",
    "en": "LI-RADS",
    "fa": "LI-RADS"
  },
  "topics": [
    {
      "id": "li-rads",
      "title": {
        "de": "LI-RADS",
        "en": "LI-RADS",
        "fa": "LI-RADS"
      }
    }
  ]
}
