// dAVF lesson and original assessment pool; source and repair scope: packet17-davf-plan.md
export const DAVF_LESSON = {
  "pdfSourcePages": [
    35,
    36
  ],
  "breadcrumb": {
    "de": "Durale AV-Fistel (dAVF)",
    "en": "Dural Arteriovenous Fistula (dAVF)",
    "fa": "فیستول شریانی-وریدی دورال (dAVF)"
  },
  "title": {
    "de": "Durale AV-Fistel (dAVF)",
    "en": "Dural Arteriovenous Fistula (dAVF)",
    "fa": "فیستول شریانی-وریدی دورال (dAVF)"
  },
  "keyLabel": {
    "de": "Merke",
    "en": "Key point",
    "fa": "نکته کلیدی"
  },
  "caveLabel": {
    "de": "Cave",
    "en": "Warning",
    "fa": "هشدار"
  },
  "toc": {
    "de": "Inhalte",
    "en": "Contents",
    "fa": "فهرست"
  },
  "sections": [
    {
      "id": "grundlagen",
      "icon": "📌",
      "label": {
        "de": "Grundlagen",
        "en": "Basics",
        "fa": "مبانی"
      }
    },
    {
      "id": "klinik",
      "icon": "🩺",
      "label": {
        "de": "Klinik",
        "en": "Clinical",
        "fa": "بالین"
      }
    },
    {
      "id": "cognard",
      "icon": "📊",
      "label": {
        "de": "Cognard-Klassifikation",
        "en": "Cognard Classification",
        "fa": "طبقه‌بندی Cognard"
      },
      "emphasis": true
    },
    {
      "id": "bildgebung",
      "icon": "🧲",
      "label": {
        "de": "Bildgebung",
        "en": "Imaging",
        "fa": "تصویربرداری"
      }
    },
    {
      "id": "differenzial",
      "icon": "⚖️",
      "label": {
        "de": "Differenzialdiagnose",
        "en": "Differential",
        "fa": "افتراقی"
      }
    },
    {
      "id": "management",
      "icon": "🔧",
      "label": {
        "de": "Management",
        "en": "Management",
        "fa": "مدیریت"
      }
    },
    {
      "id": "takehome",
      "icon": "🏁",
      "label": {
        "de": "Take Home Message",
        "en": "Take Home Message",
        "fa": "پیام نهایی"
      },
      "emphasis": true
    }
  ],
  "grundlagen": {
    "title": {
      "de": "Grundlagen & Pathophysiologie",
      "en": "Basics & Pathophysiology",
      "fa": "مبانی و پاتوفیزیولوژی"
    },
    "lead": {
      "de": "Die durale AV-Fistel ist eine direkte arteriovenöse Verbindung innerhalb der Dura mater. Im Gegensatz zur zerebralen AVM entsteht sie meist erworben und besitzt keinen Nidus.",
      "en": "The dural arteriovenous fistula is a direct arteriovenous connection within the dura mater. Unlike cerebral AVM, it is mostly acquired and has no nidus.",
      "fa": "فیستول دورال AV یک اتصال مستقیم شریانی-وریدی درون دورامتر است. بر خلاف AVM مغزی، معمولاً اکتسابی است و نیدوس ندارد."
    },
    "items": [
      {
        "icon": "🔗",
        "title": {
          "de": "Definition",
          "en": "Definition",
          "fa": "تعریف"
        },
        "text": {
          "de": "Direkte Verbindung zwischen meningealen Arterien und einem duralen Sinus oder kortikaler Vene innerhalb der Dura mater. Kein Nidus — das ist der Hauptunterschied zur AVM.",
          "en": "Direct connection between meningeal arteries and a dural sinus or cortical vein within the dura mater. No nidus — the main difference from AVM.",
          "fa": "اتصال مستقیم بین شریان‌های مننژیال و سینوس دورال یا ورید کورتیکال درون دورامتر. بدون نیدوس — تفاوت اصلی با AVM."
        }
      },
      {
        "icon": "🧬",
        "title": {
          "de": "Ätiologie",
          "en": "Aetiology",
          "fa": "اتیولوژی"
        },
        "text": {
          "de": "Sinusthrombose und venöse Hypertension können die Entstehung duraler Shunts begünstigen. Auch Trauma, Operation oder Infektion sind Assoziationen. Die Ursache bleibt häufig unklar; eine Sinusthrombose ist weder Voraussetzung noch alleiniger Beweis einer dAVF.",
          "en": "Sinus thrombosis and venous hypertension can promote formation of dural shunts. Trauma, surgery and infection are also associations. The cause often remains unclear; sinus thrombosis is neither required for nor sufficient proof of dAVF.",
          "fa": "ترومبوز سینوس و پرفشاری وریدی می‌توانند به تشکیل شانت دورال کمک کنند. تروما، جراحی و عفونت نیز از عوامل همراه‌اند. علت اغلب نامشخص می‌ماند؛ ترومبوز سینوس نه پیش‌شرط و نه به‌تنهایی اثبات‌کنندهٔ dAVF است."
        }
      },
      {
        "icon": "👨‍⚕️",
        "title": {
          "de": "Epidemiologie",
          "en": "Epidemiology",
          "fa": "اپیدمیولوژی"
        },
        "text": {
          "de": "Auftreten meist im Erwachsenenalter (40.–60. Lebensjahr). Häufigste Lokalisation: Sinus transversus / sigmoideus. Eine kavernöse Sinus-dAVF ist meist eine indirekte durale Karotis-Kavernosus-Fistel (Barrow B–D); sie ist von der direkten ICA-Fistel (Barrow A) zu unterscheiden.",
          "en": "Typically presents in adulthood (40–60 years). Most common location: transverse/sigmoid sinus. A cavernous sinus dAVF is usually an indirect dural carotid-cavernous fistula (Barrow B–D), distinct from a direct ICA fistula (Barrow A).",
          "fa": "معمولاً در بزرگسالی (۴۰ تا ۶۰ سالگی) رخ می‌دهد. شایع‌ترین محل: سینوس ترانسورسوس/سیگموئیدوس. dAVF سینوس کاورنوسوس معمولاً فیستول غیرمستقیم دورال کاروتید–کاورنوسوس (Barrow B–D) است و با فیستول مستقیم ICA (Barrow A) تفاوت دارد."
        }
      },
      {
        "icon": "📍",
        "title": {
          "de": "Lokalisation",
          "en": "Location",
          "fa": "محل"
        },
        "text": {
          "de": "Sinus transversus/sigmoideus (häufigste) · Sinus cavernosus · Tentorium · Sinus sagittalis superior · Foramen magnum.",
          "en": "Transverse/sigmoid sinus (most common) · Cavernous sinus · Tentorium · Superior sagittal sinus · Foramen magnum.",
          "fa": "سینوس ترانسورسوس/سیگموئیدوس (شایع‌ترین) · سینوس کاورنوسوس · تنتوریوم · سینوس ساژیتال فوقانی · فورامن ماگنوم."
        }
      }
    ],
    "key": {
      "de": "dAVF: duraler Shunt ohne Nidus, meist erworben. Sinusthrombose und venöse Hypertension sind Assoziationen, keine Voraussetzung jeder Fistel.",
      "en": "dAVF: dural shunt without a nidus, usually acquired. Sinus thrombosis and venous hypertension are associations, not prerequisites for every fistula.",
      "fa": "dAVF: شانت دورال بدون نیدوس، معمولاً اکتسابی. ترومبوز سینوس و پرفشاری وریدی عوامل همراه‌اند، نه پیش‌شرط هر فیستول."
    }
  },
  "klinik": {
    "title": {
      "de": "Klinik",
      "en": "Clinical Presentation",
      "fa": "تظاهر بالینی"
    },
    "lead": {
      "de": "Die Symptome und das Risiko hängen vom venösen Abfluss ab. Kortikaler Reflux ist ein aggressives Muster; das individuelle Risiko hängt zusätzlich von Präsentation und venöser Ektasie ab.",
      "en": "Symptoms and risk depend on venous outflow. Cortical venous reflux is an aggressive pattern; individual risk also depends on presentation and venous ectasia.",
      "fa": "علائم و خطر به خروج وریدی بستگی دارند. رفلاکس وریدی کورتیکال الگویی پرخطر است؛ خطر فردی به نحوه تظاهر و اکتازی وریدی نیز بستگی دارد."
    },
    "headers": [
      {
        "de": "Lokalisation / Situation",
        "en": "Location / Situation",
        "fa": "محل / وضعیت"
      },
      {
        "de": "Symptome",
        "en": "Symptoms",
        "fa": "علائم"
      },
      {
        "de": "Risiko",
        "en": "Risk",
        "fa": "خطر"
      }
    ],
    "rows": [
      [
        {
          "de": "Sinus transversus-DAVF",
          "en": "Transverse sinus DAVF",
          "fa": "DAVF سینوس ترانسورسوس"
        },
        {
          "de": "Pulssynchroner Tinnitus",
          "en": "Pulsatile tinnitus",
          "fa": "تینیتوس سنکرون با نبض"
        },
        {
          "de": "Vom Drainagemuster abhängig; Tinnitus allein erlaubt keine Gradeinteilung",
          "en": "Depends on drainage pattern; tinnitus alone does not establish grade",
          "fa": "وابسته به الگوی درناژ؛ وزوز گوش به‌تنهایی درجه را مشخص نمی‌کند"
        }
      ],
      [
        {
          "de": "Sinus cavernosus-DAVF",
          "en": "Cavernous sinus DAVF",
          "fa": "DAVF سینوس کاورنوسوس"
        },
        {
          "de": "Exophthalmus, Chemose, Visusstörung, Ptosis",
          "en": "Proptosis, chemosis, visual disturbance, ptosis",
          "fa": "اگزوفتالموس، کموز، اختلال بینایی، پتوز"
        },
        {
          "de": "Variabel",
          "en": "Variable",
          "fa": "متغیر"
        }
      ],
      [
        {
          "de": "Kortikale venöse Drainage (CVD)",
          "en": "Cortical venous drainage (CVD)",
          "fa": "درناژ وریدی کورتیکال (CVD)"
        },
        {
          "de": "Intrakranielle Blutung, Krampfanfälle, neurologische Defizite, venöse Stauungsenzephalopathie",
          "en": "Intracranial haemorrhage, seizures, focal deficits, venous congestive encephalopathy",
          "fa": "خونریزی داخل جمجمه، تشنج، کسری‌های عصبی، آنسفالوپاتی احتقانی وریدی"
        },
        {
          "de": "Aggressives Muster; Risiko individuell beurteilen",
          "en": "Aggressive pattern; assess risk individually",
          "fa": "الگوی پرخطر؛ ارزیابی خطر به‌صورت فردی"
        }
      ]
    ],
    "cave": {
      "de": "Corticaler venöser Reflux kennzeichnet Cognard IIb, IIa+b, III und IV. Cognard V beschreibt spinalen venösen Abfluss. Blutungs- und neurologisches Risiko variieren unter anderem mit venöser Ektasie und klinischer Präsentation; pauschale Jahresraten sind hierfür nicht geeignet.",
      "en": "Cortical venous reflux defines Cognard IIb, IIa+b, III and IV. Cognard V describes spinal venous drainage. Haemorrhagic and neurological risk varies with factors including venous ectasia and clinical presentation; one annual rate cannot represent every grade.",
      "fa": "رفلاکس وریدی کورتیکال در درجات Cognard IIb، IIa+b، III و IV وجود دارد. Cognard V درناژ وریدی نخاعی را توصیف می‌کند. خطر خونریزی و علائم عصبی به عواملی مانند اکتازی وریدی و تظاهر بالینی وابسته است؛ یک نرخ سالانه برای همه درجات مناسب نیست."
    }
  },
  "cognard": {
    "title": {
      "de": "Cognard-Klassifikation",
      "en": "Cognard Classification",
      "fa": "طبقه‌بندی Cognard"
    },
    "lead": {
      "de": "Die Cognard-Klassifikation beschreibt das venöse Drainagemuster. CVD liegt bei IIb, IIa+b, III und IV vor; Grad V bezeichnet spinalen venösen Abfluss. Das Muster unterstützt die Risikoeinschätzung, ersetzt aber keine klinische Einzelfallbewertung.",
      "en": "The Cognard classification describes venous drainage. CVD occurs in IIb, IIa+b, III and IV; grade V denotes spinal venous drainage. The pattern informs risk assessment but does not replace individualized clinical evaluation.",
      "fa": "طبقه‌بندی Cognard الگوی درناژ وریدی را توصیف می‌کند. CVD در IIb، IIa+b، III و IV وجود دارد؛ درجه V درناژ وریدی نخاعی است. این الگو به ارزیابی خطر کمک می‌کند اما جای ارزیابی بالینی فردی را نمی‌گیرد."
    },
    "headers": [
      {
        "de": "Grad",
        "en": "Grade",
        "fa": "درجه"
      },
      {
        "de": "Drainagemuster",
        "en": "Drainage pattern",
        "fa": "الگوی درناژ"
      },
      {
        "de": "Risikoeinordnung",
        "en": "Risk interpretation",
        "fa": "ارزیابی خطر"
      }
    ],
    "rows": [
      [
        "I",
        {
          "de": "Antegrade Drainage in Sinus — kein CVD",
          "en": "Antegrade drainage into sinus — no CVD",
          "fa": "درناژ آنتروگراد به سینوس — بدون CVD"
        },
        {
          "de": "Ohne CVD; Management nach Symptomen und individuellem Befund",
          "en": "No CVD; management depends on symptoms and individual findings",
          "fa": "بدون CVD؛ مدیریت بر اساس علائم و یافته‌های فردی"
        }
      ],
      [
        "IIa",
        {
          "de": "Retrograde Drainage in Sinus — kein CVD",
          "en": "Retrograde drainage in sinus — no CVD",
          "fa": "درناژ رتروگراد در سینوس — بدون CVD"
        },
        {
          "de": "Kein CVD; venöse Abflussbehinderung/intrakranielle Hypertension mitbeurteilen",
          "en": "No CVD; assess venous outflow obstruction/intracranial hypertension",
          "fa": "بدون CVD؛ اختلال خروج وریدی/پرفشاری داخل جمجمه نیز بررسی شود"
        }
      ],
      [
        "IIb",
        {
          "de": "Antegrade Sinusdrainage + CVD",
          "en": "Antegrade sinus drainage + CVD",
          "fa": "درناژ آنتروگراد سینوس + CVD"
        },
        {
          "de": "Erhöht — CVD vorhanden!",
          "en": "Elevated — CVD present!",
          "fa": "بالا — CVD وجود دارد!"
        }
      ],
      [
        "IIa+b",
        {
          "de": "Retrograde Sinusdrainage + CVD",
          "en": "Retrograde sinus drainage + CVD",
          "fa": "درناژ رتروگراد سینوس + CVD"
        },
        {
          "de": "Hoch — CVD vorhanden!",
          "en": "High — CVD present!",
          "fa": "بالا — CVD وجود دارد!"
        }
      ],
      [
        "III",
        {
          "de": "Direkte CVD — keine venöse Ektasie",
          "en": "Direct CVD — no venous ectasia",
          "fa": "CVD مستقیم — بدون اکتازی وریدی"
        },
        {
          "de": "CVD ohne Ektasie; klinisches Risiko individuell bewerten",
          "en": "CVD without ectasia; assess clinical risk individually",
          "fa": "CVD بدون اکتازی؛ خطر بالینی فردی ارزیابی شود"
        }
      ],
      [
        "IV",
        {
          "de": "Direkte CVD + venöse Ektasie (Varize)",
          "en": "Direct CVD + venous ectasia (varix)",
          "fa": "CVD مستقیم + اکتازی وریدی (واریس)"
        },
        {
          "de": "CVD mit Ektasie; klinisches Risiko individuell bewerten",
          "en": "CVD with ectasia; assess clinical risk individually",
          "fa": "CVD همراه اکتازی؛ خطر بالینی فردی ارزیابی شود"
        }
      ],
      [
        "V",
        {
          "de": "Spinale venöse Drainage",
          "en": "Spinal venous drainage",
          "fa": "درناژ وریدی نخاعی"
        },
        {
          "de": "Progressives Myelopathierisiko",
          "en": "Progressive myelopathy risk",
          "fa": "خطر میلوپاتی پیشرونده"
        }
      ]
    ],
    "key": {
      "de": "CVD betrifft Cognard IIb, IIa+b, III und IV; V beschreibt spinalen perimedullären Abfluss. Borden I = Sinus ohne kortikalen Reflux (Cognard I/IIa), II = Sinus mit kortikalem Reflux (IIb/IIa+b), III = direkte kortikale Drainage ohne Sinusdrainage (III/IV). Klassifikation und klinische Präsentation gemeinsam beurteilen.",
      "en": "CVD occurs in Cognard IIb, IIa+b, III and IV; V denotes spinal perimedullary drainage. Borden I = sinus without cortical reflux (Cognard I/IIa), II = sinus with cortical reflux (IIb/IIa+b), III = direct cortical drainage without sinus drainage (III/IV). Assess classification together with clinical presentation.",
      "fa": "CVD در Cognard IIb، IIa+b، III و IV وجود دارد؛ V درناژ پری‌مدولاری نخاعی است. Borden I = سینوس بدون رفلاکس کورتیکال (Cognard I/IIa)، II = سینوس همراه رفلاکس کورتیکال (IIb/IIa+b)، III = درناژ مستقیم کورتیکال بدون درناژ سینوسی (III/IV). طبقه‌بندی همراه با تظاهر بالینی ارزیابی شود."
    }
  },
  "bildgebung": {
    "title": {
      "de": "Bildgebung: Schritt für Schritt",
      "en": "Imaging: Step by Step",
      "fa": "تصویربرداری: گام به گام"
    },
    "lead": {
      "de": "MRT/MRA für Screening und Stauungszeichen, CTA für Gefäßanatomie, DSA als Goldstandard zur definitiven Diagnose und Therapieplanung.",
      "en": "MRI/MRA for screening and congestion signs, CTA for vascular anatomy, DSA as gold standard for definitive diagnosis and treatment planning.",
      "fa": "MRI/MRA برای غربالگری و علائم احتقان، CTA برای آناتومی عروقی، DSA به‌عنوان استاندارد طلایی برای تشخیص قطعی و برنامه‌ریزی درمان."
    },
    "headers": [
      {
        "de": "Modalität",
        "en": "Modality",
        "fa": "روش"
      },
      {
        "de": "Befund",
        "en": "Finding",
        "fa": "یافته"
      },
      {
        "de": "Klinische Bedeutung",
        "en": "Clinical relevance",
        "fa": "اهمیت بالینی"
      }
    ],
    "rows": [
      [
        {
          "de": "T2 (MRT)",
          "en": "T2 (MRI)",
          "fa": "T2 (MRI)"
        },
        {
          "de": "Flow voids in Dura/Sinus; T2-Hyperintensität bei venöser Stauungsenzephalopathie",
          "en": "Flow voids in dura/sinus; T2 hyperintensity in venous congestive encephalopathy",
          "fa": "Flow voids در دورا/سینوس؛ هایپراینتنسیتی T2 در آنسفالوپاتی احتقانی وریدی"
        },
        {
          "de": "Ödem ist ein Stauungshinweis, kein alleiniger Nachweis von CVD",
          "en": "Oedema is a congestion clue, not proof of CVD by itself",
          "fa": "ادم سرنخ احتقان است، نه اثبات مستقل CVD"
        }
      ],
      [
        {
          "de": "SWI (MRT)",
          "en": "SWI (MRI)",
          "fa": "SWI (MRI)"
        },
        {
          "de": "Blutungsresiduen bei stattgehabter Hämorrhagie; erweiterte kortikale Venen",
          "en": "Haemorrhage residua; dilated cortical veins",
          "fa": "بقایای خونریزی؛ وریدهای کورتیکال گشاد"
        },
        {
          "de": "Auffällige Venen als Stauungshinweis; Reflux angiographisch klären",
          "en": "Abnormal veins are a congestion clue; characterize reflux angiographically",
          "fa": "وریدهای غیرطبیعی سرنخ احتقان‌اند؛ رفلاکس با آنژیوگرافی مشخص شود"
        }
      ],
      [
        {
          "de": "TOF-MRA",
          "en": "TOF-MRA",
          "fa": "TOF-MRA"
        },
        {
          "de": "Signal im Sinus (arterialisiertes Blut); Sinusthrombose möglich",
          "en": "Signal in sinus (arterialized blood); sinus thrombosis possible",
          "fa": "سیگنال در سینوس (خون شریانی‌شده)؛ ترومبوز سینوس ممکن"
        },
        {
          "de": "Arterielles Signal im venösen Sinus = Hinweis auf Fistel",
          "en": "Arterial signal in venous sinus = fistula clue",
          "fa": "سیگنال شریانی در سینوس وریدی = نشانه فیستول"
        }
      ],
      [
        "CTA",
        {
          "de": "Erweiterte meningeale Arterien; frühe Sinusanfüllung; geschlängelte kortikale Venen",
          "en": "Dilated meningeal arteries; early sinus filling; tortuous cortical veins",
          "fa": "شریان‌های مننژیال گشاد؛ پُرشدگی زودرس سینوس؛ وریدهای کورتیکال مارپیچ"
        },
        {
          "de": "Gut für Gefäßanatomie und präoperative Planung",
          "en": "Good for vascular anatomy and pre-operative planning",
          "fa": "مناسب برای آناتومی عروقی و برنامه‌ریزی قبل از عمل"
        }
      ],
      [
        {
          "de": "DSA (Goldstandard!)",
          "en": "DSA (Gold standard!)",
          "fa": "DSA (استاندارد طلایی!)"
        },
        {
          "de": "Direkter Fistelpunkt; frühe Sinusfüllung in arterieller Phase; selektive Feeder-Darstellung (meist A. carotis externa)",
          "en": "Direct fistula point; early sinus filling in arterial phase; selective feeder anatomy (mostly external carotid artery)",
          "fa": "نقطه مستقیم فیستول؛ پُرشدگی زودرس سینوس در فاز شریانی؛ تصویرسازی انتخابی تغذیه‌کنندگان (اغلب شریان کاروتید خارجی)"
        },
        {
          "de": "Referenz zur vollständigen Darstellung von Fistelpunkt, Feeder und Drainagemuster sowie zur Therapieplanung",
          "en": "Reference standard for full depiction of fistula point, feeders and drainage pattern and for treatment planning",
          "fa": "روش مرجع برای نمایش کامل نقطه فیستول، تغذیه‌کنندگان و الگوی درناژ و برنامه‌ریزی درمان"
        }
      ]
    ],
    "key": {
      "de": "Angiographisch bestehen geschlängelte kollaterale/kortikale Venen und verzögerte normale Hirnzirkulation. Das SWI-Signal hängt von Oxygenierung und Fluss ab; Shuntvenen können hyperintens, gestaute Venen hypointens sein. SWI kann Reflux übersehen oder unterschätzen und ersetzt die Drainagecharakterisierung durch DSA nicht.",
      "en": "Angiography shows tortuous collateral/cortical veins and delayed normal cerebral circulation. SWI signal depends on oxygenation and flow; shunt veins can be hyperintense and congested veins hypointense. SWI can miss or underestimate reflux and does not replace DSA characterization of drainage.",
      "fa": "در آنژیوگرافی وریدهای کولترال/کورتیکال پیچ‌خورده و تأخیر گردش طبیعی مغز دیده می‌شوند. سیگنال SWI به اکسیژناسیون و جریان وابسته است؛ وریدهای شانت ممکن است پرسیگنال و وریدهای دچار احتقان کم‌سیگنال باشند. SWI ممکن است رفلاکس را نشان ندهد یا کمتر از واقع برآورد کند و جای تعیین درناژ با DSA را نمی‌گیرد."
    }
  },
  "differenzial": {
    "title": {
      "de": "Differenzialdiagnose",
      "en": "Differential Diagnosis",
      "fa": "تشخیص افتراقی"
    },
    "lead": {
      "de": "Wichtig ist die Abgrenzung zu anderen intrakraniellen Gefäßmalformationen und zur venösen Sinusthrombose.",
      "en": "Important differential diagnoses include other intracranial vascular malformations and venous sinus thrombosis.",
      "fa": "تشخیص افتراقی مهم شامل سایر مالفورماسیون‌های عروقی داخل جمجمه و ترومبوز سینوس وریدی است."
    },
    "headers": [
      {
        "de": "Diagnose",
        "en": "Diagnosis",
        "fa": "تشخیص"
      },
      {
        "de": "Abgrenzung zur dAVF",
        "en": "Distinction from dAVF",
        "fa": "افتراق از dAVF"
      }
    ],
    "rows": [
      [
        {
          "de": "Zerebrale AVM",
          "en": "Cerebral AVM",
          "fa": "AVM مغزی"
        },
        {
          "de": "AVM hat Nidus; meist kongenital; liegt im Parenchym, nicht in der Dura; DSA zeigt typischen Nidus und Drainagevene",
          "en": "AVM has a nidus; mostly congenital; parenchymal not dural; DSA shows typical nidus and draining vein",
          "fa": "AVM نیدوس دارد؛ اغلب مادرزادی؛ پارانشیمی نه دورال؛ DSA نیدوس و ورید تخلیه را نشان می‌دهد"
        }
      ],
      [
        {
          "de": "Karotis-Cavernosus-Fistel (direkt)",
          "en": "Direct carotid-cavernous fistula",
          "fa": "فیستول مستقیم کاروتید-کاورنوسوس"
        },
        {
          "de": "Direkte ICA-Fistel (Barrow A; oft traumatisch) von indirekter duraler Karotis-Kavernosus-Fistel (Barrow B–D) unterscheiden.",
          "en": "Distinguish a direct ICA fistula (Barrow A; often traumatic) from an indirect dural carotid-cavernous fistula (Barrow B–D).",
          "fa": "فیستول مستقیم ICA (Barrow A؛ اغلب تروماتیک) را از فیستول غیرمستقیم دورال کاروتید–کاورنوسوس (Barrow B–D) افتراق دهید."
        }
      ],
      [
        {
          "de": "Sinusthrombose",
          "en": "Sinus thrombosis",
          "fa": "ترومبوز سینوس"
        },
        {
          "de": "Sinusthrombose kann ohne Shunt bestehen oder mit dAVF koexistieren. TOF-Sinus-Signal allein trennt Thrombus, Fluss und Shunt nicht sicher; entscheidend sind dynamische Shuntfüllung und gezielte Gefäßabklärung.",
          "en": "Sinus thrombosis may occur without a shunt or coexist with dAVF. TOF sinus signal alone does not reliably distinguish thrombus, flow and shunting; dynamic shunt filling and targeted vascular assessment are decisive.",
          "fa": "ترومبوز سینوس می‌تواند بدون شانت باشد یا همراه dAVF وجود داشته باشد. سیگنال سینوس در TOF به‌تنهایی ترومبوس، جریان و شانت را با اطمینان جدا نمی‌کند؛ پُرشدگی دینامیک شانت و بررسی هدفمند عروقی تعیین‌کننده‌اند."
        }
      ],
      [
        {
          "de": "Venöse Stauungsenzephalopathie (andere Ursachen)",
          "en": "Venous congestive encephalopathy (other causes)",
          "fa": "آنسفالوپاتی احتقانی وریدی (علل دیگر)"
        },
        {
          "de": "T2/FLAIR-Ödem ist unspezifisch. Bei auffälligen Venen oder fortbestehendem Shuntverdacht gezielte angiographische Abklärung einschließlich DSA.",
          "en": "T2/FLAIR oedema is nonspecific. Abnormal veins or persistent shunt suspicion warrant targeted angiographic assessment including DSA.",
          "fa": "ادم T2/FLAIR غیراختصاصی است. وریدهای غیرطبیعی یا تداوم شک به شانت نیازمند بررسی هدفمند آنژیوگرافیک، از جمله DSA، هستند."
        }
      ]
    ]
  },
  "management": {
    "title": {
      "de": "Management & Therapie",
      "en": "Management & Treatment",
      "fa": "مدیریت و درمان"
    },
    "lead": {
      "de": "Die Therapieentscheidung berücksichtigt Drainagemuster, Symptome, Blutungsanamnese, venöse Ektasie und den Gesamtzustand. CVD verlangt eine zeitnahe neurovaskuläre Fachbeurteilung; das Vorgehen wird individuell geplant.",
      "en": "Treatment decisions consider drainage pattern, symptoms, haemorrhage history, venous ectasia and overall condition. CVD warrants timely neurovascular specialist assessment; management is individualized.",
      "fa": "تصمیم درمان با توجه به الگوی درناژ، علائم، سابقه خونریزی، اکتازی وریدی و وضعیت کلی گرفته می‌شود. CVD نیازمند ارزیابی به‌موقع متخصص نوروعروقی است و برنامه درمان فردی تعیین می‌شود."
    },
    "items": [
      {
        "icon": "🎯",
        "title": {
          "de": "Endovaskuläre Embolisation",
          "en": "Endovascular embolisation",
          "fa": "آمبولیزاسیون اندوواسکولار"
        },
        "text": {
          "de": "Häufig eingesetzte Behandlung, transarteriell oder transvenös je nach Shuntanatomie. Ziel ist der Fistelverschluss unter Schutz des normalen Hirnvenenabflusses; der beteiligte Sinus darf nicht pauschal verschlossen werden.",
          "en": "Frequently used treatment, transarterial or transvenous according to shunt anatomy. The goal is fistula closure while protecting normal cerebral venous outflow; the involved sinus must not routinely be sacrificed.",
          "fa": "درمانی پرکاربرد، ترانس‌شریانی یا ترانس‌وریدی بر اساس آناتومی شانت. هدف بستن فیستول همراه با حفظ درناژ وریدی طبیعی مغز است؛ سینوس درگیر نباید به‌طور بی‌قیدوشرط بسته شود."
        }
      },
      {
        "icon": "🔪",
        "title": {
          "de": "Mikrochirurgie",
          "en": "Microsurgery",
          "fa": "میکروجراحی"
        },
        "text": {
          "de": "Bei geeigneter Anatomie wirksame Option, auch wenn ein endovaskulärer Zugang ungeeignet oder erfolglos ist. Ziel ist die gezielte Ausschaltung des Shunts unter Erhalt normaler venöser Drainage.",
          "en": "Effective option with suitable anatomy, including when endovascular access is unsuitable or unsuccessful. The aim is targeted shunt disconnection while preserving normal venous drainage.",
          "fa": "در آناتومی مناسب گزینه‌ای مؤثر است، از جمله زمانی که دسترسی اندوواسکولار نامناسب یا ناموفق باشد. هدف قطع هدفمند شانت همراه با حفظ درناژ وریدی طبیعی است."
        }
      },
      {
        "icon": "🛡️",
        "title": {
          "de": "Konservatives Management",
          "en": "Conservative management",
          "fa": "مدیریت محافظه‌کارانه"
        },
        "text": {
          "de": "Cognard I hat antegrade, IIa retrograde Sinusdrainage ohne kortikalen Reflux. Beschwerden, venöse Abflussbehinderung und Zeichen intrakranieller Hypertension sind mitzubeurteilen; Beobachtung erfordert geplante Verlaufskontrollen und erneute Abklärung bei veränderten Symptomen.",
          "en": "Cognard I has antegrade and IIa retrograde sinus drainage without cortical reflux. Assess symptoms, venous outflow obstruction and signs of intracranial hypertension; observation requires planned follow-up and reassessment if symptoms change.",
          "fa": "Cognard I درناژ آنتروگراد و IIa درناژ رتروگراد سینوس را بدون رفلاکس کورتیکال دارند. علائم، اختلال خروج وریدی و نشانه‌های پرفشاری داخل جمجمه نیز باید ارزیابی شوند؛ مشاهده به پیگیری برنامه‌ریزی‌شده و بررسی مجدد در صورت تغییر علائم نیاز دارد."
        }
      }
    ],
    "cave": {
      "de": "Bei CVD ist eine zeitnahe neurovaskuläre Beurteilung angezeigt. Dringlichkeit und Therapie hängen von Drainageanatomie, klinischer Präsentation und individuellen Risikomerkmalen ab; pauschale Jahresraten sind nicht übertragbar.",
      "en": "CVD warrants timely neurovascular assessment. Urgency and treatment depend on drainage anatomy, clinical presentation and individual risk features; blanket annual rates are not transferable.",
      "fa": "در CVD ارزیابی به‌موقع نوروعروقی لازم است. فوریت و درمان به آناتومی درناژ، تظاهر بالینی و عوامل خطر فردی بستگی دارد؛ نرخ سالانهٔ کلی قابل تعمیم نیست."
    }
  },
  "takehome": {
    "title": {
      "de": "Take Home Message",
      "en": "Take Home Message",
      "fa": "پیام نهایی"
    },
    "lead": {
      "de": "Drei Kernaussagen, die bei jeder dAVF entscheidend sind.",
      "en": "Three key points that are decisive in every dAVF.",
      "fa": "سه نکته کلیدی که در هر dAVF تعیین‌کننده است."
    },
    "items": [
      {
        "title": {
          "de": "Duraler Shunt ohne Nidus",
          "en": "Dural shunt without a nidus",
          "fa": "شانت دورال بدون نیدوس"
        },
        "text": {
          "de": "Das Gefäßkompartiment und der Nidus sind die entscheidenden strukturellen Merkmale. Die dAVF ist meist erworben; das Etikett kongenital/erworben ersetzt die Darstellung der Shuntanatomie nicht.",
          "en": "Vascular compartment and nidus are the decisive structural features. dAVF is usually acquired; a congenital/acquired label does not replace demonstration of shunt anatomy.",
          "fa": "کمپارتمان عروقی و نیدوس ویژگی‌های ساختاری تعیین‌کننده‌اند. dAVF معمولاً اکتسابی است؛ برچسب مادرزادی/اکتسابی جای نمایش آناتومی شانت را نمی‌گیرد."
        }
      },
      {
        "title": {
          "de": "CVD = zeitnahe Fachbeurteilung",
          "en": "CVD = timely specialist assessment",
          "fa": "CVD = ارزیابی به‌موقع تخصصی"
        },
        "text": {
          "de": "CVD liegt bei Cognard IIb, IIa+b, III und IV vor. Präsentation, Drainageanatomie und venöse Ektasie beeinflussen die individuelle Risikoeinschätzung und Therapieplanung.",
          "en": "CVD occurs in Cognard IIb, IIa+b, III and IV. Presentation, drainage anatomy and venous ectasia inform individualized risk assessment and treatment planning.",
          "fa": "CVD در درجات Cognard IIb، IIa+b، III و IV وجود دارد. تظاهر، آناتومی درناژ و اکتازی وریدی در ارزیابی خطر و برنامه‌ریزی درمان فردی نقش دارند."
        }
      },
      {
        "title": {
          "de": "DSA zur Therapieplanung",
          "en": "DSA for treatment planning",
          "fa": "DSA برای برنامه‌ریزی درمان"
        },
        "text": {
          "de": "MRT/CTA können die Diagnose nahelegen; die DSA dient als Referenz zur umfassenden Darstellung der Angioarchitektur und Therapieplanung.",
          "en": "MRI/CTA can suggest the diagnosis; DSA is the reference examination for comprehensive angiographic characterization and treatment planning.",
          "fa": "MRI و CTA می‌توانند تشخیص را مطرح کنند؛ DSA روش مرجع برای بررسی جامع آنژیوآناتومی و برنامه‌ریزی درمان است."
        }
      }
    ]
  },
  "learningObjectives": [
    {
      "de": "Duralen Shunt von parenchymalem Nidus unterscheiden.",
      "en": "Distinguish a dural shunt from a parenchymal nidus.",
      "fa": "شانت دورال را از نیدوس پارانشیمی تفکیک کنید."
    },
    {
      "de": "Sinus-, kortikalen und spinalen Abfluss klassifizieren und Borden/Cognard zuordnen.",
      "en": "Classify sinus, cortical and spinal drainage and relate Borden to Cognard.",
      "fa": "درناژ سینوسی، کورتیکال و نخاعی را طبقه‌بندی و Borden را با Cognard تطبیق دهید."
    },
    {
      "de": "MRT-Stauungshinweise von angiographisch gesichertem Reflux trennen.",
      "en": "Separate MRI congestion clues from angiographically established reflux.",
      "fa": "سرنخ‌های احتقان در MRI را از رفلاکس اثبات‌شده با آنژیوگرافی جدا کنید."
    },
    {
      "de": "Klinik und Angioarchitektur in die neurovaskuläre Behandlungsplanung einordnen.",
      "en": "Use clinical presentation and angioarchitecture to inform neurovascular treatment planning.",
      "fa": "تظاهر بالینی و آنژیوآناتومی را در برنامه‌ریزی درمان نوروعروقی به کار ببرید."
    }
  ],
  "sources": [
    {
      "label": "Gehirn.pdf · physical35–36 / printed34–35",
      "url": null
    },
    {
      "label": "Cognard et al. (1995)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/7862961/"
    },
    {
      "label": "Borden et al. (1995)",
      "url": "https://pubmed.ncbi.nlm.nih.gov/7815143/"
    },
    {
      "label": "AHA (2018)",
      "url": "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000567"
    },
    {
      "label": "Letourneau-Guillon & Krings (2012)",
      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7964792/"
    }
  ]
}

const TQ = [
  {
    "id": "01",
    "question": {
      "de": "Die DSA zeigt einen Shunt meningealer Arterien in einen duralen Sinus ohne parenchymalen Nidus. Welche Diagnose passt am besten?",
      "en": "DSA shows a shunt from meningeal arteries into a dural sinus without a parenchymal nidus. Which diagnosis fits best?",
      "fa": "DSA شانتی از شریان‌های مننژیال به سینوس دورال بدون نیدوس پارانشیمی نشان می‌دهد. کدام تشخیص سازگارتر است؟"
    },
    "options": [
      {
        "de": "Durale AV-Fistel",
        "en": "Dural AV fistula",
        "fa": "فیستول AV دورال"
      },
      {
        "de": "Parenchymale AVM",
        "en": "Parenchymal AVM",
        "fa": "AVM پارانشیمی"
      },
      {
        "de": "Entwicklungsvenenanomalie (DVA)",
        "en": "Developmental venous anomaly (DVA)",
        "fa": "آنومالی وریدی تکاملی (DVA)"
      },
      {
        "de": "Isolierte Sinusvenenthrombose",
        "en": "Isolated venous sinus thrombosis",
        "fa": "ترومبوز منفرد سینوس وریدی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Der durale Shunt ohne Nidus entspricht einer dAVF. Eine parenchymale AVM besitzt einen Nidus; eine unkomplizierte DVA ist eine venöse Drainagevariante ohne arteriellen Shunt. Eine isolierte Sinusthrombose erklärt keine frühe arteriovenöse Shuntfüllung.",
      "en": "A dural shunt without a nidus fits dAVF. A parenchymal AVM has a nidus; an uncomplicated DVA is a venous drainage variant without an arterial shunt. Isolated sinus thrombosis does not explain early arteriovenous shunt filling.",
      "fa": "شانت دورال بدون نیدوس با dAVF سازگار است. AVM پارانشیمی نیدوس دارد؛ DVA بدون عارضه یک واریانت درناژ وریدی بدون شانت شریانی است. ترومبوز منفرد سینوس پُرشدگی زودرس ناشی از شانت شریانی‌وریدی را توضیح نمی‌دهد."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/7815143/",
    "wrongExplanations": {
      "B": {
        "de": "Ein parenchymaler Nidus wäre das Merkmal einer AVM. Der durale Shunt ohne Nidus entspricht einer dAVF. Eine parenchymale AVM besitzt einen Nidus; eine unkomplizierte DVA ist eine venöse Drainagevariante ohne arteriellen Shunt. Eine isolierte Sinusthrombose erklärt keine frühe arteriovenöse Shuntfüllung.",
        "en": "A parenchymal nidus would be the feature of an AVM. A dural shunt without a nidus fits dAVF. A parenchymal AVM has a nidus; an uncomplicated DVA is a venous drainage variant without an arterial shunt. Isolated sinus thrombosis does not explain early arteriovenous shunt filling.",
        "fa": "نیدوس پارانشیمی ویژگی AVM خواهد بود. شانت دورال بدون نیدوس با dAVF سازگار است. AVM پارانشیمی نیدوس دارد؛ DVA بدون عارضه یک واریانت درناژ وریدی بدون شانت شریانی است. ترومبوز منفرد سینوس پُرشدگی زودرس ناشی از شانت شریانی‌وریدی را توضیح نمی‌دهد."
      },
      "C": {
        "de": "Eine unkomplizierte DVA besitzt keinen arteriellen Shunt. Der durale Shunt ohne Nidus entspricht einer dAVF. Eine parenchymale AVM besitzt einen Nidus; eine unkomplizierte DVA ist eine venöse Drainagevariante ohne arteriellen Shunt. Eine isolierte Sinusthrombose erklärt keine frühe arteriovenöse Shuntfüllung.",
        "en": "An uncomplicated DVA has no arterial shunt. A dural shunt without a nidus fits dAVF. A parenchymal AVM has a nidus; an uncomplicated DVA is a venous drainage variant without an arterial shunt. Isolated sinus thrombosis does not explain early arteriovenous shunt filling.",
        "fa": "DVA بدون عارضه شانت شریانی ندارد. شانت دورال بدون نیدوس با dAVF سازگار است. AVM پارانشیمی نیدوس دارد؛ DVA بدون عارضه یک واریانت درناژ وریدی بدون شانت شریانی است. ترومبوز منفرد سینوس پُرشدگی زودرس ناشی از شانت شریانی‌وریدی را توضیح نمی‌دهد."
      },
      "D": {
        "de": "Thrombose allein erklärt keine frühe Shuntfüllung. Der durale Shunt ohne Nidus entspricht einer dAVF. Eine parenchymale AVM besitzt einen Nidus; eine unkomplizierte DVA ist eine venöse Drainagevariante ohne arteriellen Shunt. Eine isolierte Sinusthrombose erklärt keine frühe arteriovenöse Shuntfüllung.",
        "en": "Thrombosis alone does not explain early shunt filling. A dural shunt without a nidus fits dAVF. A parenchymal AVM has a nidus; an uncomplicated DVA is a venous drainage variant without an arterial shunt. Isolated sinus thrombosis does not explain early arteriovenous shunt filling.",
        "fa": "ترومبوز به‌تنهایی پُرشدگی زودرس شانت را توضیح نمی‌دهد. شانت دورال بدون نیدوس با dAVF سازگار است. AVM پارانشیمی نیدوس دارد؛ DVA بدون عارضه یک واریانت درناژ وریدی بدون شانت شریانی است. ترومبوز منفرد سینوس پُرشدگی زودرس ناشی از شانت شریانی‌وریدی را توضیح نمی‌دهد."
      }
    }
  },
  {
    "id": "02",
    "question": {
      "de": "Eine dAVF drainiert ausschließlich in einen duralen Sinus, dort retrograd, ohne kortikalen Reflux. Welche Zuordnung ist richtig?",
      "en": "A dAVF drains exclusively into a dural sinus with retrograde sinus flow and no cortical reflux. Which classification is correct?",
      "fa": "یک dAVF فقط به سینوس دورال و با جریان رتروگراد در سینوس، بدون رفلاکس کورتیکال، تخلیه می‌شود. کدام طبقه‌بندی درست است؟"
    },
    "options": [
      {
        "de": "Cognard IIa / Borden I",
        "en": "Cognard IIa / Borden I",
        "fa": "Cognard IIa / Borden I"
      },
      {
        "de": "Cognard IIb / Borden II",
        "en": "Cognard IIb / Borden II",
        "fa": "Cognard IIb / Borden II"
      },
      {
        "de": "Cognard III / Borden III",
        "en": "Cognard III / Borden III",
        "fa": "Cognard III / Borden III"
      },
      {
        "de": "Cognard I / Borden I",
        "en": "Cognard I / Borden I",
        "fa": "Cognard I / Borden I"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Cognard IIa bezeichnet retrograden Sinusfluss ohne kortikalen Reflux; Borden I umfasst die Sinusdrainage ohne kortikalen Reflux unabhängig von der Sinusflussrichtung. Cognard I verlangt antegraden Sinusfluss, IIb kortikalen Reflux und III direkte kortikale Drainage. Sinusreflux allein ist nicht CVD.",
      "en": "Cognard IIa denotes retrograde sinus flow without cortical reflux; Borden I includes sinus drainage without cortical reflux regardless of sinus flow direction. Cognard I requires antegrade sinus flow, IIb cortical reflux, and III direct cortical drainage. Sinus reflux alone is not CVD.",
      "fa": "Cognard IIa یعنی جریان رتروگراد سینوس بدون رفلاکس کورتیکال؛ Borden I درناژ سینوسی بدون رفلاکس کورتیکال را مستقل از جهت جریان سینوس دربر می‌گیرد. Cognard I نیازمند جریان آنتروگراد سینوس، IIb رفلاکس کورتیکال و III درناژ مستقیم کورتیکال است. رفلاکس سینوسی به‌تنهایی CVD نیست."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/7862961/; https://pubmed.ncbi.nlm.nih.gov/7815143/",
    "wrongExplanations": {
      "B": {
        "de": "IIb/Borden II setzt kortikalen Reflux voraus. Cognard IIa bezeichnet retrograden Sinusfluss ohne kortikalen Reflux; Borden I umfasst die Sinusdrainage ohne kortikalen Reflux unabhängig von der Sinusflussrichtung. Cognard I verlangt antegraden Sinusfluss, IIb kortikalen Reflux und III direkte kortikale Drainage. Sinusreflux allein ist nicht CVD.",
        "en": "IIb/Borden II requires cortical reflux. Cognard IIa denotes retrograde sinus flow without cortical reflux; Borden I includes sinus drainage without cortical reflux regardless of sinus flow direction. Cognard I requires antegrade sinus flow, IIb cortical reflux, and III direct cortical drainage. Sinus reflux alone is not CVD.",
        "fa": "IIb/Borden II نیازمند رفلاکس کورتیکال است. Cognard IIa یعنی جریان رتروگراد سینوس بدون رفلاکس کورتیکال؛ Borden I درناژ سینوسی بدون رفلاکس کورتیکال را مستقل از جهت جریان سینوس دربر می‌گیرد. Cognard I نیازمند جریان آنتروگراد سینوس، IIb رفلاکس کورتیکال و III درناژ مستقیم کورتیکال است. رفلاکس سینوسی به‌تنهایی CVD نیست."
      },
      "C": {
        "de": "III/Borden III bezeichnet direkte kortikale Drainage. Cognard IIa bezeichnet retrograden Sinusfluss ohne kortikalen Reflux; Borden I umfasst die Sinusdrainage ohne kortikalen Reflux unabhängig von der Sinusflussrichtung. Cognard I verlangt antegraden Sinusfluss, IIb kortikalen Reflux und III direkte kortikale Drainage. Sinusreflux allein ist nicht CVD.",
        "en": "III/Borden III denotes direct cortical drainage. Cognard IIa denotes retrograde sinus flow without cortical reflux; Borden I includes sinus drainage without cortical reflux regardless of sinus flow direction. Cognard I requires antegrade sinus flow, IIb cortical reflux, and III direct cortical drainage. Sinus reflux alone is not CVD.",
        "fa": "III/Borden III درناژ مستقیم کورتیکال است. Cognard IIa یعنی جریان رتروگراد سینوس بدون رفلاکس کورتیکال؛ Borden I درناژ سینوسی بدون رفلاکس کورتیکال را مستقل از جهت جریان سینوس دربر می‌گیرد. Cognard I نیازمند جریان آنتروگراد سینوس، IIb رفلاکس کورتیکال و III درناژ مستقیم کورتیکال است. رفلاکس سینوسی به‌تنهایی CVD نیست."
      },
      "D": {
        "de": "Cognard I verlangt antegraden statt retrograden Sinusfluss. Cognard IIa bezeichnet retrograden Sinusfluss ohne kortikalen Reflux; Borden I umfasst die Sinusdrainage ohne kortikalen Reflux unabhängig von der Sinusflussrichtung. Cognard I verlangt antegraden Sinusfluss, IIb kortikalen Reflux und III direkte kortikale Drainage. Sinusreflux allein ist nicht CVD.",
        "en": "Cognard I requires antegrade rather than retrograde sinus flow. Cognard IIa denotes retrograde sinus flow without cortical reflux; Borden I includes sinus drainage without cortical reflux regardless of sinus flow direction. Cognard I requires antegrade sinus flow, IIb cortical reflux, and III direct cortical drainage. Sinus reflux alone is not CVD.",
        "fa": "Cognard I نیازمند جریان آنتروگراد سینوس است، نه رتروگراد. Cognard IIa یعنی جریان رتروگراد سینوس بدون رفلاکس کورتیکال؛ Borden I درناژ سینوسی بدون رفلاکس کورتیکال را مستقل از جهت جریان سینوس دربر می‌گیرد. Cognard I نیازمند جریان آنتروگراد سینوس، IIb رفلاکس کورتیکال و III درناژ مستقیم کورتیکال است. رفلاکس سینوسی به‌تنهایی CVD نیست."
      }
    }
  },
  {
    "id": "03",
    "question": {
      "de": "Zwei dAVF liegen am Sinus transversus. Welche zusätzliche Information ist für die Einordnung eines aggressiven Drainagemusters am wichtigsten?",
      "en": "Two dAVFs are located at the transverse sinus. Which additional information is most important for identifying an aggressive drainage pattern?",
      "fa": "دو dAVF در سینوس ترانسورسوس قرار دارند. کدام اطلاعات تکمیلی برای تشخیص الگوی درناژ پرخطر مهم‌تر است؟"
    },
    "options": [
      {
        "de": "Nachweis kortikaler venöser Drainage bzw. Reflux",
        "en": "Presence of cortical venous drainage or reflux",
        "fa": "وجود درناژ یا رفلاکس وریدی کورتیکال"
      },
      {
        "de": "Rechts- oder linksseitige Lage",
        "en": "Right- or left-sided location",
        "fa": "محل راست یا چپ"
      },
      {
        "de": "Zahl der Feeder aus der A. carotis externa",
        "en": "Number of external carotid feeders",
        "fa": "تعداد تغذیه‌کنندگان از کاروتید خارجی"
      },
      {
        "de": "Vorliegen eines pulssynchronen Tinnitus",
        "en": "Presence of pulsatile tinnitus",
        "fa": "وجود وزوز گوش هم‌زمان با نبض"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Kortikale Drainage/Reflux ist ein wesentliches Risikomerkmal. Seite, Feederzahl und Tinnitus bestimmen den Grad nicht. Auch bei gleichem Drainagegrad beeinflussen Blutungsanamnese, neurologische Präsentation und venöse Ektasie das individuelle Risiko; eine einheitliche Jahresrate ist daraus nicht abzuleiten.",
      "en": "Cortical drainage/reflux is a major risk feature. Side, feeder count and tinnitus do not determine the grade. Even within the same drainage grade, haemorrhage history, neurological presentation and venous ectasia influence individual risk; one universal annual rate cannot be inferred.",
      "fa": "درناژ یا رفلاکس کورتیکال از ویژگی‌های مهم خطر است. سمت، تعداد تغذیه‌کنندگان و وزوز گوش درجه را تعیین نمی‌کنند. حتی در یک درجهٔ درناژ، سابقهٔ خونریزی، تظاهر عصبی و اکتازی وریدی بر خطر فردی اثر دارند؛ نمی‌توان یک نرخ سالانهٔ یکسان نتیجه گرفت."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/7862961/; https://pubmed.ncbi.nlm.nih.gov/22610384/",
    "wrongExplanations": {
      "B": {
        "de": "Die Seite definiert kein aggressives Drainagemuster. Kortikale Drainage/Reflux ist ein wesentliches Risikomerkmal. Seite, Feederzahl und Tinnitus bestimmen den Grad nicht. Auch bei gleichem Drainagegrad beeinflussen Blutungsanamnese, neurologische Präsentation und venöse Ektasie das individuelle Risiko; eine einheitliche Jahresrate ist daraus nicht abzuleiten.",
        "en": "Side does not define an aggressive drainage pattern. Cortical drainage/reflux is a major risk feature. Side, feeder count and tinnitus do not determine the grade. Even within the same drainage grade, haemorrhage history, neurological presentation and venous ectasia influence individual risk; one universal annual rate cannot be inferred.",
        "fa": "سمت، الگوی درناژ پرخطر را تعیین نمی‌کند. درناژ یا رفلاکس کورتیکال از ویژگی‌های مهم خطر است. سمت، تعداد تغذیه‌کنندگان و وزوز گوش درجه را تعیین نمی‌کنند. حتی در یک درجهٔ درناژ، سابقهٔ خونریزی، تظاهر عصبی و اکتازی وریدی بر خطر فردی اثر دارند؛ نمی‌توان یک نرخ سالانهٔ یکسان نتیجه گرفت."
      },
      "C": {
        "de": "Die Feederzahl ersetzt die Beurteilung des venösen Abflusses nicht. Kortikale Drainage/Reflux ist ein wesentliches Risikomerkmal. Seite, Feederzahl und Tinnitus bestimmen den Grad nicht. Auch bei gleichem Drainagegrad beeinflussen Blutungsanamnese, neurologische Präsentation und venöse Ektasie das individuelle Risiko; eine einheitliche Jahresrate ist daraus nicht abzuleiten.",
        "en": "Feeder count does not replace assessment of venous drainage. Cortical drainage/reflux is a major risk feature. Side, feeder count and tinnitus do not determine the grade. Even within the same drainage grade, haemorrhage history, neurological presentation and venous ectasia influence individual risk; one universal annual rate cannot be inferred.",
        "fa": "تعداد تغذیه‌کنندگان جای ارزیابی خروج وریدی را نمی‌گیرد. درناژ یا رفلاکس کورتیکال از ویژگی‌های مهم خطر است. سمت، تعداد تغذیه‌کنندگان و وزوز گوش درجه را تعیین نمی‌کنند. حتی در یک درجهٔ درناژ، سابقهٔ خونریزی، تظاهر عصبی و اکتازی وریدی بر خطر فردی اثر دارند؛ نمی‌توان یک نرخ سالانهٔ یکسان نتیجه گرفت."
      },
      "D": {
        "de": "Tinnitus kann auch ohne kortikalen Reflux vorkommen. Kortikale Drainage/Reflux ist ein wesentliches Risikomerkmal. Seite, Feederzahl und Tinnitus bestimmen den Grad nicht. Auch bei gleichem Drainagegrad beeinflussen Blutungsanamnese, neurologische Präsentation und venöse Ektasie das individuelle Risiko; eine einheitliche Jahresrate ist daraus nicht abzuleiten.",
        "en": "Tinnitus may occur without cortical reflux. Cortical drainage/reflux is a major risk feature. Side, feeder count and tinnitus do not determine the grade. Even within the same drainage grade, haemorrhage history, neurological presentation and venous ectasia influence individual risk; one universal annual rate cannot be inferred.",
        "fa": "وزوز گوش می‌تواند بدون رفلاکس کورتیکال رخ دهد. درناژ یا رفلاکس کورتیکال از ویژگی‌های مهم خطر است. سمت، تعداد تغذیه‌کنندگان و وزوز گوش درجه را تعیین نمی‌کنند. حتی در یک درجهٔ درناژ، سابقهٔ خونریزی، تظاهر عصبی و اکتازی وریدی بر خطر فردی اثر دارند؛ نمی‌توان یک نرخ سالانهٔ یکسان نتیجه گرفت."
      }
    }
  },
  {
    "id": "04",
    "question": {
      "de": "Welches bildgebende Verfahren ist der Goldstandard zur Diagnostik und Therapieplanung der dAVF?",
      "en": "Which imaging modality is the gold standard for diagnosis and treatment planning of dAVF?",
      "fa": "کدام روش تصویربرداری استاندارد طلایی برای تشخیص و برنامه‌ریزی درمان dAVF است؟"
    },
    "options": [
      {
        "de": "Digitale Subtraktionsangiographie (DSA)",
        "en": "Digital subtraction angiography (DSA)",
        "fa": "آنژیوگرافی تفریق دیجیتال (DSA)"
      },
      {
        "de": "MRT mit Gadolinium",
        "en": "MRI with gadolinium",
        "fa": "MRI با گادولینیوم"
      },
      {
        "de": "CTA",
        "en": "CTA",
        "fa": "CTA"
      },
      {
        "de": "TOF-MRA",
        "en": "TOF-MRA",
        "fa": "TOF-MRA"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "DSA zeigt Fistelpunkt, Feeder und zeitlichen venösen Abfluss als Grundlage der Klassifikation und Therapieplanung. MRT mit Kontrastmittel, CTA und TOF-MRA können wichtige Hinweise liefern; eine unauffällige oder unvollständige Untersuchung ersetzt bei fortbestehendem Verdacht keine gezielte angiographische Abklärung.",
      "en": "DSA depicts the fistula point, feeders and temporal venous outflow for classification and treatment planning. Contrast-enhanced MRI, CTA and TOF-MRA can provide important clues; a normal or incomplete study does not replace targeted angiographic assessment when suspicion persists.",
      "fa": "DSA نقطهٔ فیستول، تغذیه‌کنندگان و توالی زمانی خروج وریدی را برای طبقه‌بندی و برنامه‌ریزی درمان نشان می‌دهد. MRI با مادهٔ حاجب، CTA و TOF-MRA می‌توانند سرنخ‌های مهمی بدهند؛ بررسی طبیعی یا ناکامل، در صورت تداوم شک، جای ارزیابی هدفمند آنژیوگرافیک را نمی‌گیرد."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/26047821/",
    "wrongExplanations": {
      "B": {
        "de": "Kontrast-MRT kann Hinweise liefern; gefragt ist die umfassende dynamische Shuntcharakterisierung. DSA zeigt Fistelpunkt, Feeder und zeitlichen venösen Abfluss als Grundlage der Klassifikation und Therapieplanung. MRT mit Kontrastmittel, CTA und TOF-MRA können wichtige Hinweise liefern; eine unauffällige oder unvollständige Untersuchung ersetzt bei fortbestehendem Verdacht keine gezielte angiographische Abklärung.",
        "en": "Contrast MRI can provide clues; the question asks about comprehensive dynamic shunt characterization. DSA depicts the fistula point, feeders and temporal venous outflow for classification and treatment planning. Contrast-enhanced MRI, CTA and TOF-MRA can provide important clues; a normal or incomplete study does not replace targeted angiographic assessment when suspicion persists.",
        "fa": "MRI با مادهٔ حاجب سرنخ می‌دهد؛ پرسش دربارهٔ تعیین جامع و دینامیک شانت است. DSA نقطهٔ فیستول، تغذیه‌کنندگان و توالی زمانی خروج وریدی را برای طبقه‌بندی و برنامه‌ریزی درمان نشان می‌دهد. MRI با مادهٔ حاجب، CTA و TOF-MRA می‌توانند سرنخ‌های مهمی بدهند؛ بررسی طبیعی یا ناکامل، در صورت تداوم شک، جای ارزیابی هدفمند آنژیوگرافیک را نمی‌گیرد."
      },
      "C": {
        "de": "CTA kann Shuntzeichen darstellen, ersetzt die DSA-Angioarchitektur aber nicht generell. DSA zeigt Fistelpunkt, Feeder und zeitlichen venösen Abfluss als Grundlage der Klassifikation und Therapieplanung. MRT mit Kontrastmittel, CTA und TOF-MRA können wichtige Hinweise liefern; eine unauffällige oder unvollständige Untersuchung ersetzt bei fortbestehendem Verdacht keine gezielte angiographische Abklärung.",
        "en": "CTA can depict shunt signs but does not generally replace DSA characterization. DSA depicts the fistula point, feeders and temporal venous outflow for classification and treatment planning. Contrast-enhanced MRI, CTA and TOF-MRA can provide important clues; a normal or incomplete study does not replace targeted angiographic assessment when suspicion persists.",
        "fa": "CTA می‌تواند نشانه‌های شانت را نشان دهد اما به‌طور کلی جای تعیین آنژیوآناتومی با DSA را نمی‌گیرد. DSA نقطهٔ فیستول، تغذیه‌کنندگان و توالی زمانی خروج وریدی را برای طبقه‌بندی و برنامه‌ریزی درمان نشان می‌دهد. MRI با مادهٔ حاجب، CTA و TOF-MRA می‌توانند سرنخ‌های مهمی بدهند؛ بررسی طبیعی یا ناکامل، در صورت تداوم شک، جای ارزیابی هدفمند آنژیوگرافیک را نمی‌گیرد."
      },
      "D": {
        "de": "TOF-MRA kann Flusshinweise zeigen, den zeitlichen Abfluss aber nicht umfassend abbilden. DSA zeigt Fistelpunkt, Feeder und zeitlichen venösen Abfluss als Grundlage der Klassifikation und Therapieplanung. MRT mit Kontrastmittel, CTA und TOF-MRA können wichtige Hinweise liefern; eine unauffällige oder unvollständige Untersuchung ersetzt bei fortbestehendem Verdacht keine gezielte angiographische Abklärung.",
        "en": "TOF-MRA can show flow clues but cannot comprehensively depict temporal outflow. DSA depicts the fistula point, feeders and temporal venous outflow for classification and treatment planning. Contrast-enhanced MRI, CTA and TOF-MRA can provide important clues; a normal or incomplete study does not replace targeted angiographic assessment when suspicion persists.",
        "fa": "TOF-MRA می‌تواند سرنخ جریان نشان دهد اما توالی زمانی خروج را به‌طور جامع مشخص نمی‌کند. DSA نقطهٔ فیستول، تغذیه‌کنندگان و توالی زمانی خروج وریدی را برای طبقه‌بندی و برنامه‌ریزی درمان نشان می‌دهد. MRI با مادهٔ حاجب، CTA و TOF-MRA می‌توانند سرنخ‌های مهمی بدهند؛ بررسی طبیعی یا ناکامل، در صورت تداوم شک، جای ارزیابی هدفمند آنژیوگرافیک را نمی‌گیرد."
      }
    }
  },
  {
    "id": "05",
    "question": {
      "de": "Welches Symptom ist typisch für eine Sinus-transversus-dAVF?",
      "en": "Which symptom is typical of a transverse sinus dAVF?",
      "fa": "کدام علامت برای dAVF سینوس ترانسورسوس تیپیک است؟"
    },
    "options": [
      {
        "de": "Pulssynchroner Tinnitus",
        "en": "Pulsatile tinnitus",
        "fa": "وزوز گوش هم‌زمان با نبض"
      },
      {
        "de": "Chemose mit Proptosis",
        "en": "Chemosis with proptosis",
        "fa": "کموز همراه پروپتوز"
      },
      {
        "de": "Rasch progrediente Myelopathie",
        "en": "Rapidly progressive myelopathy",
        "fa": "میلوپاتی سریعاً پیشرونده"
      },
      {
        "de": "Stauungspapillen mit transienten Sehstörungen",
        "en": "Papilloedema with transient visual obscurations",
        "fa": "ادم پاپی همراه تاری گذرای بینایی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Pulssynchroner Tinnitus ist ein klassischer Hinweis auf eine transversosigmoidale dAVF. Chemose/Proptosis lenken eher zum Sinus cavernosus; Myelopathie zu spinalem Abfluss. Stauungspapillen sprechen für intrakranielle Hypertension und lokalisieren den Shunt nicht zuverlässig. Tinnitus allein bestimmt weder Drainagegrad noch Blutungsrisiko.",
      "en": "Pulsatile tinnitus is a classic clue to a transverse-sigmoid dAVF. Chemosis/proptosis point more toward the cavernous sinus; myelopathy toward spinal drainage. Papilloedema suggests intracranial hypertension and does not reliably localize the shunt. Tinnitus alone establishes neither drainage grade nor haemorrhage risk.",
      "fa": "وزوز گوش هم‌زمان با نبض سرنخی کلاسیک برای dAVF ترانسورسوس–سیگموئیدوس است. کموز و پروپتوز بیشتر به سینوس کاورنوسوس و میلوپاتی به درناژ نخاعی اشاره دارند. ادم پاپی مطرح‌کنندهٔ پرفشاری داخل جمجمه است و محل شانت را با اطمینان تعیین نمی‌کند. وزوز گوش به‌تنهایی درجهٔ درناژ یا خطر خونریزی را مشخص نمی‌کند."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/7862961/",
    "wrongExplanations": {
      "B": {
        "de": "Chemose und Proptosis sprechen eher für eine kavernöse Fistel. Pulssynchroner Tinnitus ist ein klassischer Hinweis auf eine transversosigmoidale dAVF. Chemose/Proptosis lenken eher zum Sinus cavernosus; Myelopathie zu spinalem Abfluss. Stauungspapillen sprechen für intrakranielle Hypertension und lokalisieren den Shunt nicht zuverlässig. Tinnitus allein bestimmt weder Drainagegrad noch Blutungsrisiko.",
        "en": "Chemosis and proptosis suggest a cavernous fistula. Pulsatile tinnitus is a classic clue to a transverse-sigmoid dAVF. Chemosis/proptosis point more toward the cavernous sinus; myelopathy toward spinal drainage. Papilloedema suggests intracranial hypertension and does not reliably localize the shunt. Tinnitus alone establishes neither drainage grade nor haemorrhage risk.",
        "fa": "کموز و پروپتوز بیشتر به نفع فیستول کاورنوسوس‌اند. وزوز گوش هم‌زمان با نبض سرنخی کلاسیک برای dAVF ترانسورسوس–سیگموئیدوس است. کموز و پروپتوز بیشتر به سینوس کاورنوسوس و میلوپاتی به درناژ نخاعی اشاره دارند. ادم پاپی مطرح‌کنندهٔ پرفشاری داخل جمجمه است و محل شانت را با اطمینان تعیین نمی‌کند. وزوز گوش به‌تنهایی درجهٔ درناژ یا خطر خونریزی را مشخص نمی‌کند."
      },
      "C": {
        "de": "Myelopathie lenkt zur spinalen perimedullären Drainage. Pulssynchroner Tinnitus ist ein klassischer Hinweis auf eine transversosigmoidale dAVF. Chemose/Proptosis lenken eher zum Sinus cavernosus; Myelopathie zu spinalem Abfluss. Stauungspapillen sprechen für intrakranielle Hypertension und lokalisieren den Shunt nicht zuverlässig. Tinnitus allein bestimmt weder Drainagegrad noch Blutungsrisiko.",
        "en": "Myelopathy points toward spinal perimedullary drainage. Pulsatile tinnitus is a classic clue to a transverse-sigmoid dAVF. Chemosis/proptosis point more toward the cavernous sinus; myelopathy toward spinal drainage. Papilloedema suggests intracranial hypertension and does not reliably localize the shunt. Tinnitus alone establishes neither drainage grade nor haemorrhage risk.",
        "fa": "میلوپاتی به درناژ پری‌مدولاری نخاعی اشاره دارد. وزوز گوش هم‌زمان با نبض سرنخی کلاسیک برای dAVF ترانسورسوس–سیگموئیدوس است. کموز و پروپتوز بیشتر به سینوس کاورنوسوس و میلوپاتی به درناژ نخاعی اشاره دارند. ادم پاپی مطرح‌کنندهٔ پرفشاری داخل جمجمه است و محل شانت را با اطمینان تعیین نمی‌کند. وزوز گوش به‌تنهایی درجهٔ درناژ یا خطر خونریزی را مشخص نمی‌کند."
      },
      "D": {
        "de": "Stauungspapillen sind ein Druckzeichen, kein typischer lokalisierender Hinweis am Sinus transversus. Pulssynchroner Tinnitus ist ein klassischer Hinweis auf eine transversosigmoidale dAVF. Chemose/Proptosis lenken eher zum Sinus cavernosus; Myelopathie zu spinalem Abfluss. Stauungspapillen sprechen für intrakranielle Hypertension und lokalisieren den Shunt nicht zuverlässig. Tinnitus allein bestimmt weder Drainagegrad noch Blutungsrisiko.",
        "en": "Papilloedema is a pressure sign, not a typical localizing clue to the transverse sinus. Pulsatile tinnitus is a classic clue to a transverse-sigmoid dAVF. Chemosis/proptosis point more toward the cavernous sinus; myelopathy toward spinal drainage. Papilloedema suggests intracranial hypertension and does not reliably localize the shunt. Tinnitus alone establishes neither drainage grade nor haemorrhage risk.",
        "fa": "ادم پاپی نشانهٔ فشار است، نه سرنخ موضع‌یابی تیپیک برای سینوس ترانسورسوس. وزوز گوش هم‌زمان با نبض سرنخی کلاسیک برای dAVF ترانسورسوس–سیگموئیدوس است. کموز و پروپتوز بیشتر به سینوس کاورنوسوس و میلوپاتی به درناژ نخاعی اشاره دارند. ادم پاپی مطرح‌کنندهٔ پرفشاری داخل جمجمه است و محل شانت را با اطمینان تعیین نمی‌کند. وزوز گوش به‌تنهایی درجهٔ درناژ یا خطر خونریزی را مشخص نمی‌کند."
      }
    }
  },
  {
    "id": "06",
    "question": {
      "de": "Eine Patientin klagt über Exophthalmus, Chemose, Rötung des Auges und Visusstörung. Welche dAVF-Lokalisation ist am wahrscheinlichsten?",
      "en": "A patient presents with proptosis, chemosis, ocular redness and visual disturbance. Which dAVF location is most likely?",
      "fa": "بیماری با اگزوفتالموس، کموز، قرمزی چشم و اختلال بینایی مراجعه می‌کند. کدام محل dAVF محتمل‌تر است؟"
    },
    "options": [
      {
        "de": "Sinus cavernosus",
        "en": "Cavernous sinus",
        "fa": "سینوس کاورنوسوس"
      },
      {
        "de": "Sinus transversus",
        "en": "Transverse sinus",
        "fa": "سینوس ترانسورسوس"
      },
      {
        "de": "Sinus sagittalis superior",
        "en": "Superior sagittal sinus",
        "fa": "سینوس ساژیتال فوقانی"
      },
      {
        "de": "Tentorium cerebelli",
        "en": "Tentorium cerebelli",
        "fa": "تنتوریوم سربلی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Eine dAVF am Sinus cavernosus kann über erhöhten orbitalen Venendruck diese Symptome auslösen. Die übrigen genannten Lokalisationen sind keine typische Erklärung dieser orbitalen Kombination. Die Symptome allein unterscheiden eine indirekte durale Fistel (Barrow B–D) nicht sicher von einer direkten ICA-Fistel (Barrow A); dafür ist Gefäßdiagnostik nötig.",
      "en": "A cavernous sinus dAVF can cause this syndrome through increased orbital venous pressure. The other listed sites do not typically explain this orbital combination. Symptoms alone do not reliably distinguish an indirect dural fistula (Barrow B–D) from a direct ICA fistula (Barrow A); vascular assessment is needed.",
      "fa": "dAVF سینوس کاورنوسوس می‌تواند با افزایش فشار وریدی اربیت این علائم را ایجاد کند. محل‌های دیگرِ ذکرشده توضیح تیپیک این ترکیب علائم چشمی نیستند. علائم به‌تنهایی فیستول غیرمستقیم دورال (Barrow B–D) را با اطمینان از فیستول مستقیم ICA (Barrow A) جدا نمی‌کنند؛ بررسی عروقی لازم است."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/3968564/",
    "wrongExplanations": {
      "B": {
        "de": "Eine transversale Fistel erklärt typischerweise Tinnitus statt dieser orbitalen Kombination. Eine dAVF am Sinus cavernosus kann über erhöhten orbitalen Venendruck diese Symptome auslösen. Die übrigen genannten Lokalisationen sind keine typische Erklärung dieser orbitalen Kombination. Die Symptome allein unterscheiden eine indirekte durale Fistel (Barrow B–D) nicht sicher von einer direkten ICA-Fistel (Barrow A); dafür ist Gefäßdiagnostik nötig.",
        "en": "A transverse fistula typically explains tinnitus rather than this orbital combination. A cavernous sinus dAVF can cause this syndrome through increased orbital venous pressure. The other listed sites do not typically explain this orbital combination. Symptoms alone do not reliably distinguish an indirect dural fistula (Barrow B–D) from a direct ICA fistula (Barrow A); vascular assessment is needed.",
        "fa": "فیستول ترانسورسوس به‌طور تیپیک وزوز گوش را توضیح می‌دهد، نه این ترکیب علائم چشمی. dAVF سینوس کاورنوسوس می‌تواند با افزایش فشار وریدی اربیت این علائم را ایجاد کند. محل‌های دیگرِ ذکرشده توضیح تیپیک این ترکیب علائم چشمی نیستند. علائم به‌تنهایی فیستول غیرمستقیم دورال (Barrow B–D) را با اطمینان از فیستول مستقیم ICA (Barrow A) جدا نمی‌کنند؛ بررسی عروقی لازم است."
      },
      "C": {
        "de": "Der Sinus sagittalis superior ist nicht die typische Lokalisation dieses orbitalen Syndroms. Eine dAVF am Sinus cavernosus kann über erhöhten orbitalen Venendruck diese Symptome auslösen. Die übrigen genannten Lokalisationen sind keine typische Erklärung dieser orbitalen Kombination. Die Symptome allein unterscheiden eine indirekte durale Fistel (Barrow B–D) nicht sicher von einer direkten ICA-Fistel (Barrow A); dafür ist Gefäßdiagnostik nötig.",
        "en": "The superior sagittal sinus is not the typical site for this orbital syndrome. A cavernous sinus dAVF can cause this syndrome through increased orbital venous pressure. The other listed sites do not typically explain this orbital combination. Symptoms alone do not reliably distinguish an indirect dural fistula (Barrow B–D) from a direct ICA fistula (Barrow A); vascular assessment is needed.",
        "fa": "سینوس ساژیتال فوقانی محل تیپیک این سندرم چشمی نیست. dAVF سینوس کاورنوسوس می‌تواند با افزایش فشار وریدی اربیت این علائم را ایجاد کند. محل‌های دیگرِ ذکرشده توضیح تیپیک این ترکیب علائم چشمی نیستند. علائم به‌تنهایی فیستول غیرمستقیم دورال (Barrow B–D) را با اطمینان از فیستول مستقیم ICA (Barrow A) جدا نمی‌کنند؛ بررسی عروقی لازم است."
      },
      "D": {
        "de": "Eine tentorielle Fistel ist keine typische Erklärung dieser orbitalen Kombination. Eine dAVF am Sinus cavernosus kann über erhöhten orbitalen Venendruck diese Symptome auslösen. Die übrigen genannten Lokalisationen sind keine typische Erklärung dieser orbitalen Kombination. Die Symptome allein unterscheiden eine indirekte durale Fistel (Barrow B–D) nicht sicher von einer direkten ICA-Fistel (Barrow A); dafür ist Gefäßdiagnostik nötig.",
        "en": "A tentorial fistula is not a typical explanation for this orbital combination. A cavernous sinus dAVF can cause this syndrome through increased orbital venous pressure. The other listed sites do not typically explain this orbital combination. Symptoms alone do not reliably distinguish an indirect dural fistula (Barrow B–D) from a direct ICA fistula (Barrow A); vascular assessment is needed.",
        "fa": "فیستول تنتوریال توضیح تیپیک این ترکیب علائم چشمی نیست. dAVF سینوس کاورنوسوس می‌تواند با افزایش فشار وریدی اربیت این علائم را ایجاد کند. محل‌های دیگرِ ذکرشده توضیح تیپیک این ترکیب علائم چشمی نیستند. علائم به‌تنهایی فیستول غیرمستقیم دورال (Barrow B–D) را با اطمینان از فیستول مستقیم ICA (Barrow A) جدا نمی‌کنند؛ بررسی عروقی لازم است."
      }
    }
  },
  {
    "id": "07",
    "question": {
      "de": "Welche venöse Veränderung ist mit der Entstehung erworbener dAVF assoziiert?",
      "en": "Which venous change is associated with the development of acquired dAVF?",
      "fa": "کدام تغییر وریدی با پیدایش dAVF اکتسابی ارتباط دارد؟"
    },
    "options": [
      {
        "de": "Sinusthrombose mit venöser Hypertension und möglicher Angiogenese",
        "en": "Sinus thrombosis with venous hypertension and possible angiogenesis",
        "fa": "ترومبوز سینوس همراه پرفشاری وریدی و آنژیوژنز احتمالی"
      },
      {
        "de": "Unkomplizierte DVA mit regelrechtem venösem Abfluss",
        "en": "Uncomplicated DVA with normal venous outflow",
        "fa": "DVA بدون عارضه با خروج وریدی طبیعی"
      },
      {
        "de": "Isolierte Aplasie eines Sinus transversus ohne Shunt",
        "en": "Isolated transverse sinus aplasia without a shunt",
        "fa": "آپلازی منفرد سینوس ترانسورسوس بدون شانت"
      },
      {
        "de": "Kapilläre Teleangiektasie mit regelrechtem venösem Abfluss",
        "en": "Capillary telangiectasia with normal venous drainage",
        "fa": "تلانژکتازی مویرگی با درناژ وریدی طبیعی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Die Ursache bleibt bei vielen dAVF unklar. Sinusthrombose und venöse Hypertension sind jedoch gut belegte Assoziationen: venöser Rückstau kann Angiogenese und die Öffnung duraler arteriovenöser Verbindungen fördern.",
      "en": "The cause remains unclear in many dAVFs. Sinus thrombosis and venous hypertension are well-recognised associations: venous congestion can promote angiogenesis and opening of dural arteriovenous channels.",
      "fa": "علت بسیاری از dAVFها نامشخص می‌ماند. با این حال ترومبوز سینوس و پرفشاری وریدی ارتباط شناخته‌شده‌ای دارند؛ احتقان وریدی می‌تواند آنژیوژنز و باز شدن ارتباطات شریانی‌وریدی دورال را تحریک کند."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://www.ahajournals.org/doi/10.1161/CIR.0000000000000567",
    "wrongExplanations": {
      "B": {
        "de": "Eine unkomplizierte DVA ist keine typische Ursache eines erworbenen duralen Shunts. Die Ursache bleibt bei vielen dAVF unklar. Sinusthrombose und venöse Hypertension sind jedoch gut belegte Assoziationen: venöser Rückstau kann Angiogenese und die Öffnung duraler arteriovenöser Verbindungen fördern.",
        "en": "An uncomplicated DVA is not a typical cause of an acquired dural shunt. The cause remains unclear in many dAVFs. Sinus thrombosis and venous hypertension are well-recognised associations: venous congestion can promote angiogenesis and opening of dural arteriovenous channels.",
        "fa": "DVA بدون عارضه علت تیپیک شانت دورال اکتسابی نیست. علت بسیاری از dAVFها نامشخص می‌ماند. با این حال ترومبوز سینوس و پرفشاری وریدی ارتباط شناخته‌شده‌ای دارند؛ احتقان وریدی می‌تواند آنژیوژنز و باز شدن ارتباطات شریانی‌وریدی دورال را تحریک کند."
      },
      "C": {
        "de": "Eine isolierte Sinusaplasie beweist keine erworbene Shuntbildung. Die Ursache bleibt bei vielen dAVF unklar. Sinusthrombose und venöse Hypertension sind jedoch gut belegte Assoziationen: venöser Rückstau kann Angiogenese und die Öffnung duraler arteriovenöser Verbindungen fördern.",
        "en": "Isolated sinus aplasia does not establish acquired shunt formation. The cause remains unclear in many dAVFs. Sinus thrombosis and venous hypertension are well-recognised associations: venous congestion can promote angiogenesis and opening of dural arteriovenous channels.",
        "fa": "آپلازی منفرد سینوس تشکیل شانت اکتسابی را اثبات نمی‌کند. علت بسیاری از dAVFها نامشخص می‌ماند. با این حال ترومبوز سینوس و پرفشاری وریدی ارتباط شناخته‌شده‌ای دارند؛ احتقان وریدی می‌تواند آنژیوژنز و باز شدن ارتباطات شریانی‌وریدی دورال را تحریک کند."
      },
      "D": {
        "de": "Eine unkomplizierte kapilläre Teleangiektasie ist keine typische Ursache eines duralen Shunts. Die Ursache bleibt bei vielen dAVF unklar. Sinusthrombose und venöse Hypertension sind jedoch gut belegte Assoziationen: venöser Rückstau kann Angiogenese und die Öffnung duraler arteriovenöser Verbindungen fördern.",
        "en": "Uncomplicated capillary telangiectasia is not a typical cause of a dural shunt. The cause remains unclear in many dAVFs. Sinus thrombosis and venous hypertension are well-recognised associations: venous congestion can promote angiogenesis and opening of dural arteriovenous channels.",
        "fa": "تلانژکتازی مویرگی بدون عارضه علت تیپیک شانت دورال نیست. علت بسیاری از dAVFها نامشخص می‌ماند. با این حال ترومبوز سینوس و پرفشاری وریدی ارتباط شناخته‌شده‌ای دارند؛ احتقان وریدی می‌تواند آنژیوژنز و باز شدن ارتباطات شریانی‌وریدی دورال را تحریک کند."
      }
    }
  },
  {
    "id": "08",
    "question": {
      "de": "Eine symptomatische dAVF mit kortikalem Reflux ist angiographisch bestätigt. Welcher nächste Ansatz ist am angemessensten?",
      "en": "Angiography confirms a symptomatic dAVF with cortical reflux. Which next approach is most appropriate?",
      "fa": "آنژیوگرافی یک dAVF علامت‌دار همراه رفلاکس کورتیکال را تأیید کرده است. کدام رویکرد بعدی مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Zeitnahe neurovaskuläre Therapieplanung nach Shuntanatomie und normalem venösem Abfluss",
        "en": "Timely neurovascular treatment planning based on shunt anatomy and normal venous drainage",
        "fa": "برنامه‌ریزی به‌موقع درمان نوروعروقی بر اساس آناتومی شانت و درناژ وریدی طبیعی"
      },
      {
        "de": "Jede solche Fistel durch Okklusion des gesamten betroffenen Sinus behandeln",
        "en": "Treat every such fistula by occluding the entire involved sinus",
        "fa": "درمان همهٔ این فیستول‌ها با انسداد تمام سینوس درگیر"
      },
      {
        "de": "Ohne weitere Planung ausschließlich jährliche Beobachtung",
        "en": "Annual observation alone without further planning",
        "fa": "صرفاً مشاهدهٔ سالانه بدون برنامه‌ریزی بیشتر"
      },
      {
        "de": "Primär Radiochirurgie wählen, da der Shunt sofort verschlossen wird",
        "en": "Choose radiosurgery first because it immediately closes the shunt",
        "fa": "انتخاب رادیوسرجری در ابتدا، چون شانت را فوراً می‌بندد"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "CVD und Symptome sprechen für eine Behandlungsplanung im neurovaskulären Team. Endovaskuläre Verfahren werden häufig eingesetzt; Zugang und ggf. Mikrochirurgie richten sich nach der Anatomie. Normaler Hirnvenenabfluss muss erhalten bleiben: eine pauschale Sinusokklusion kann schaden. Beobachtung allein ist hier keine angemessene Standardstrategie; Radiochirurgie verschließt den Shunt nicht sofort.",
      "en": "CVD and symptoms support treatment planning by a neurovascular team. Endovascular procedures are frequently used; the access route and possible microsurgery depend on anatomy. Normal cerebral venous drainage must be preserved: blanket sinus occlusion can cause harm. Observation alone is not an appropriate default here; radiosurgery does not close the shunt immediately.",
      "fa": "CVD و علائم، برنامه‌ریزی درمان توسط تیم نوروعروقی را ایجاب می‌کنند. روش‌های اندوواسکولار کاربرد فراوان دارند؛ مسیر دسترسی و احتمال میکروجراحی به آناتومی وابسته است. درناژ طبیعی وریدی مغز باید حفظ شود: انسداد بی‌قیدوشرط سینوس می‌تواند زیان‌آور باشد. صرفاً مشاهده رویکرد پیش‌فرض مناسبی در این وضعیت نیست؛ رادیوسرجری شانت را فوراً نمی‌بندد."
    },
    "source": "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000567",
    "wrongExplanations": {
      "B": {
        "de": "Eine pauschale Sinusokklusion kann normalen Hirnvenenabfluss gefährden. CVD und Symptome sprechen für eine Behandlungsplanung im neurovaskulären Team. Endovaskuläre Verfahren werden häufig eingesetzt; Zugang und ggf. Mikrochirurgie richten sich nach der Anatomie. Normaler Hirnvenenabfluss muss erhalten bleiben: eine pauschale Sinusokklusion kann schaden. Beobachtung allein ist hier keine angemessene Standardstrategie; Radiochirurgie verschließt den Shunt nicht sofort.",
        "en": "Blanket sinus occlusion can compromise normal cerebral venous drainage. CVD and symptoms support treatment planning by a neurovascular team. Endovascular procedures are frequently used; the access route and possible microsurgery depend on anatomy. Normal cerebral venous drainage must be preserved: blanket sinus occlusion can cause harm. Observation alone is not an appropriate default here; radiosurgery does not close the shunt immediately.",
        "fa": "انسداد بی‌قیدوشرط سینوس می‌تواند درناژ طبیعی وریدی مغز را به خطر اندازد. CVD و علائم، برنامه‌ریزی درمان توسط تیم نوروعروقی را ایجاب می‌کنند. روش‌های اندوواسکولار کاربرد فراوان دارند؛ مسیر دسترسی و احتمال میکروجراحی به آناتومی وابسته است. درناژ طبیعی وریدی مغز باید حفظ شود: انسداد بی‌قیدوشرط سینوس می‌تواند زیان‌آور باشد. صرفاً مشاهده رویکرد پیش‌فرض مناسبی در این وضعیت نیست؛ رادیوسرجری شانت را فوراً نمی‌بندد."
      },
      "C": {
        "de": "Symptomatische CVD erfordert eine zeitnahe Behandlungsplanung statt routinemäßiger Beobachtung allein. CVD und Symptome sprechen für eine Behandlungsplanung im neurovaskulären Team. Endovaskuläre Verfahren werden häufig eingesetzt; Zugang und ggf. Mikrochirurgie richten sich nach der Anatomie. Normaler Hirnvenenabfluss muss erhalten bleiben: eine pauschale Sinusokklusion kann schaden. Beobachtung allein ist hier keine angemessene Standardstrategie; Radiochirurgie verschließt den Shunt nicht sofort.",
        "en": "Symptomatic CVD requires timely treatment planning instead of routine observation alone. CVD and symptoms support treatment planning by a neurovascular team. Endovascular procedures are frequently used; the access route and possible microsurgery depend on anatomy. Normal cerebral venous drainage must be preserved: blanket sinus occlusion can cause harm. Observation alone is not an appropriate default here; radiosurgery does not close the shunt immediately.",
        "fa": "CVD علامت‌دار به برنامه‌ریزی به‌موقع درمان نیاز دارد، نه صرفاً مشاهدهٔ معمول. CVD و علائم، برنامه‌ریزی درمان توسط تیم نوروعروقی را ایجاب می‌کنند. روش‌های اندوواسکولار کاربرد فراوان دارند؛ مسیر دسترسی و احتمال میکروجراحی به آناتومی وابسته است. درناژ طبیعی وریدی مغز باید حفظ شود: انسداد بی‌قیدوشرط سینوس می‌تواند زیان‌آور باشد. صرفاً مشاهده رویکرد پیش‌فرض مناسبی در این وضعیت نیست؛ رادیوسرجری شانت را فوراً نمی‌بندد."
      },
      "D": {
        "de": "Radiochirurgie wirkt verzögert; der angenommene Sofortverschluss ist falsch. CVD und Symptome sprechen für eine Behandlungsplanung im neurovaskulären Team. Endovaskuläre Verfahren werden häufig eingesetzt; Zugang und ggf. Mikrochirurgie richten sich nach der Anatomie. Normaler Hirnvenenabfluss muss erhalten bleiben: eine pauschale Sinusokklusion kann schaden. Beobachtung allein ist hier keine angemessene Standardstrategie; Radiochirurgie verschließt den Shunt nicht sofort.",
        "en": "Radiosurgery acts with delay; the assumed immediate closure is incorrect. CVD and symptoms support treatment planning by a neurovascular team. Endovascular procedures are frequently used; the access route and possible microsurgery depend on anatomy. Normal cerebral venous drainage must be preserved: blanket sinus occlusion can cause harm. Observation alone is not an appropriate default here; radiosurgery does not close the shunt immediately.",
        "fa": "رادیوسرجری با تأخیر اثر می‌کند؛ فرض بستن فوری نادرست است. CVD و علائم، برنامه‌ریزی درمان توسط تیم نوروعروقی را ایجاب می‌کنند. روش‌های اندوواسکولار کاربرد فراوان دارند؛ مسیر دسترسی و احتمال میکروجراحی به آناتومی وابسته است. درناژ طبیعی وریدی مغز باید حفظ شود: انسداد بی‌قیدوشرط سینوس می‌تواند زیان‌آور باشد. صرفاً مشاهده رویکرد پیش‌فرض مناسبی در این وضعیت نیست؛ رادیوسرجری شانت را فوراً نمی‌بندد."
      }
    }
  },
  {
    "id": "09",
    "question": {
      "de": "Bei dAVF-Verdacht zeigt die SWI erweiterte, geschlängelte kortikale und medulläre Venen. Welche Interpretation ist am besten?",
      "en": "In suspected dAVF, SWI shows dilated, tortuous cortical and medullary veins. Which interpretation is best?",
      "fa": "در شک به dAVF، SWI وریدهای کورتیکال و مدولاری گشاد و پیچ‌خورده نشان می‌دهد. کدام تفسیر بهتر است؟"
    },
    "options": [
      {
        "de": "Hinweis auf venöse Stauung; Reflux und Drainageweg angiographisch charakterisieren",
        "en": "Clue to venous congestion; characterize reflux and drainage angiographically",
        "fa": "سرنخی از احتقان وریدی؛ رفلاکس و مسیر درناژ با آنژیوگرافی مشخص شوند"
      },
      {
        "de": "Damit ist Cognard IV auch ohne Nachweis einer Ektasie gesichert",
        "en": "This establishes Cognard IV even without evidence of ectasia",
        "fa": "این یافته حتی بدون اثبات اکتازی، Cognard IV را قطعی می‌کند"
      },
      {
        "de": "Damit ist eine Sinusvenenthrombose als alleinige Ursache gesichert",
        "en": "This establishes venous sinus thrombosis as the sole cause",
        "fa": "این یافته ترومبوز سینوس وریدی را به‌عنوان تنها علت قطعی می‌کند"
      },
      {
        "de": "Ein unauffälliges TOF-MRA würde eine dAVF sicher ausschließen",
        "en": "A normal TOF-MRA would reliably exclude dAVF",
        "fa": "TOF-MRA طبیعی، dAVF را با اطمینان رد می‌کند"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Auffällige Venen können eine venöse Hypertension anzeigen und sollen zur gezielten Gefäßabklärung führen. SWI allein beweist weder kortikalen Reflux noch einen Cognard-Grad oder dessen Ursache. Das pseudophlebitische Muster ist ursprünglich ein angiographisches Stauungsmuster; SWI kann korrespondierende Venen zeigen, Reflux aber unterschätzen. Ein negatives TOF-MRA schließt die Fistel bei fortbestehendem Verdacht nicht sicher aus.",
      "en": "Abnormal veins can indicate venous hypertension and should prompt targeted vascular assessment. SWI alone proves neither cortical reflux, a Cognard grade nor the cause. The pseudophlebitic pattern is originally an angiographic congestion pattern; SWI may show corresponding veins but underestimate reflux. Negative TOF-MRA does not reliably exclude a fistula when suspicion persists.",
      "fa": "وریدهای غیرطبیعی می‌توانند نشان‌دهندهٔ پرفشاری وریدی باشند و باید به بررسی هدفمند عروقی منجر شوند. SWI به‌تنهایی نه رفلاکس کورتیکال، نه درجهٔ Cognard و نه علت را اثبات می‌کند. الگوی سودوفلبیتیک در اصل الگویی آنژیوگرافیک از احتقان است؛ SWI می‌تواند وریدهای متناظر را نشان دهد اما رفلاکس را کمتر از واقع برآورد کند. TOF-MRA منفی در صورت تداوم شک، فیستول را با اطمینان رد نمی‌کند."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7964792/; https://pubmed.ncbi.nlm.nih.gov/26047821/; https://pmc.ncbi.nlm.nih.gov/articles/PMC7963232/",
    "wrongExplanations": {
      "B": {
        "de": "Cognard IV verlangt direkte kortikale Drainage und Ektasie, angiographisch charakterisiert. Auffällige Venen können eine venöse Hypertension anzeigen und sollen zur gezielten Gefäßabklärung führen. SWI allein beweist weder kortikalen Reflux noch einen Cognard-Grad oder dessen Ursache. Das pseudophlebitische Muster ist ursprünglich ein angiographisches Stauungsmuster; SWI kann korrespondierende Venen zeigen, Reflux aber unterschätzen. Ein negatives TOF-MRA schließt die Fistel bei fortbestehendem Verdacht nicht sicher aus.",
        "en": "Cognard IV requires direct cortical drainage and ectasia characterized angiographically. Abnormal veins can indicate venous hypertension and should prompt targeted vascular assessment. SWI alone proves neither cortical reflux, a Cognard grade nor the cause. The pseudophlebitic pattern is originally an angiographic congestion pattern; SWI may show corresponding veins but underestimate reflux. Negative TOF-MRA does not reliably exclude a fistula when suspicion persists.",
        "fa": "Cognard IV به درناژ مستقیم کورتیکال و اکتازی نیاز دارد که با آنژیوگرافی مشخص می‌شوند. وریدهای غیرطبیعی می‌توانند نشان‌دهندهٔ پرفشاری وریدی باشند و باید به بررسی هدفمند عروقی منجر شوند. SWI به‌تنهایی نه رفلاکس کورتیکال، نه درجهٔ Cognard و نه علت را اثبات می‌کند. الگوی سودوفلبیتیک در اصل الگویی آنژیوگرافیک از احتقان است؛ SWI می‌تواند وریدهای متناظر را نشان دهد اما رفلاکس را کمتر از واقع برآورد کند. TOF-MRA منفی در صورت تداوم شک، فیستول را با اطمینان رد نمی‌کند."
      },
      "C": {
        "de": "Die Venenerscheinung beweist keine isolierte Thrombose als Ursache. Auffällige Venen können eine venöse Hypertension anzeigen und sollen zur gezielten Gefäßabklärung führen. SWI allein beweist weder kortikalen Reflux noch einen Cognard-Grad oder dessen Ursache. Das pseudophlebitische Muster ist ursprünglich ein angiographisches Stauungsmuster; SWI kann korrespondierende Venen zeigen, Reflux aber unterschätzen. Ein negatives TOF-MRA schließt die Fistel bei fortbestehendem Verdacht nicht sicher aus.",
        "en": "The venous appearance does not establish isolated thrombosis as the cause. Abnormal veins can indicate venous hypertension and should prompt targeted vascular assessment. SWI alone proves neither cortical reflux, a Cognard grade nor the cause. The pseudophlebitic pattern is originally an angiographic congestion pattern; SWI may show corresponding veins but underestimate reflux. Negative TOF-MRA does not reliably exclude a fistula when suspicion persists.",
        "fa": "نمای وریدی، ترومبوز منفرد را به‌عنوان علت اثبات نمی‌کند. وریدهای غیرطبیعی می‌توانند نشان‌دهندهٔ پرفشاری وریدی باشند و باید به بررسی هدفمند عروقی منجر شوند. SWI به‌تنهایی نه رفلاکس کورتیکال، نه درجهٔ Cognard و نه علت را اثبات می‌کند. الگوی سودوفلبیتیک در اصل الگویی آنژیوگرافیک از احتقان است؛ SWI می‌تواند وریدهای متناظر را نشان دهد اما رفلاکس را کمتر از واقع برآورد کند. TOF-MRA منفی در صورت تداوم شک، فیستول را با اطمینان رد نمی‌کند."
      },
      "D": {
        "de": "Negatives TOF-MRA kann eine Fistel bei fortbestehendem Verdacht nicht sicher ausschließen. Auffällige Venen können eine venöse Hypertension anzeigen und sollen zur gezielten Gefäßabklärung führen. SWI allein beweist weder kortikalen Reflux noch einen Cognard-Grad oder dessen Ursache. Das pseudophlebitische Muster ist ursprünglich ein angiographisches Stauungsmuster; SWI kann korrespondierende Venen zeigen, Reflux aber unterschätzen. Ein negatives TOF-MRA schließt die Fistel bei fortbestehendem Verdacht nicht sicher aus.",
        "en": "Negative TOF-MRA cannot reliably exclude a fistula when suspicion persists. Abnormal veins can indicate venous hypertension and should prompt targeted vascular assessment. SWI alone proves neither cortical reflux, a Cognard grade nor the cause. The pseudophlebitic pattern is originally an angiographic congestion pattern; SWI may show corresponding veins but underestimate reflux. Negative TOF-MRA does not reliably exclude a fistula when suspicion persists.",
        "fa": "TOF-MRA منفی در صورت تداوم شک، فیستول را با اطمینان رد نمی‌کند. وریدهای غیرطبیعی می‌توانند نشان‌دهندهٔ پرفشاری وریدی باشند و باید به بررسی هدفمند عروقی منجر شوند. SWI به‌تنهایی نه رفلاکس کورتیکال، نه درجهٔ Cognard و نه علت را اثبات می‌کند. الگوی سودوفلبیتیک در اصل الگویی آنژیوگرافیک از احتقان است؛ SWI می‌تواند وریدهای متناظر را نشان دهد اما رفلاکس را کمتر از واقع برآورد کند. TOF-MRA منفی در صورت تداوم شک، فیستول را با اطمینان رد نمی‌کند."
      }
    }
  },
  {
    "id": "10",
    "question": {
      "de": "Aus welcher Gefäßgruppe stammen häufig meningeale Feeder einer dAVF am Sinus transversus/sigmoideus?",
      "en": "Which vessel group commonly supplies meningeal feeders to a transverse/sigmoid sinus dAVF?",
      "fa": "تغذیه‌کنندگان مننژیال dAVF سینوس ترانسورسوس/سیگموئیدوس اغلب از کدام گروه عروقی می‌آیند؟"
    },
    "options": [
      {
        "de": "Äste der A. carotis externa",
        "en": "Branches of the external carotid artery",
        "fa": "شاخه‌های شریان کاروتید خارجی"
      },
      {
        "de": "A. cerebri media",
        "en": "Middle cerebral artery",
        "fa": "شریان مغزی میانی"
      },
      {
        "de": "A. cerebri posterior",
        "en": "Posterior cerebral artery",
        "fa": "شریان مغزی خلفی"
      },
      {
        "de": "A. cerebri anterior",
        "en": "Anterior cerebral artery",
        "fa": "شریان مغزی قدامی"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Häufig stammen Feeder aus der A. carotis externa, etwa A. meningea media oder A. occipitalis. Die genannten pialen Hirnarterien sind nicht die typische meningeale Versorgung dieser Lokalisation. ICA- oder Vertebralisäste können ebenfalls beteiligt sein; eine ECA-Zufuhr allein beschreibt die gesamte Angioarchitektur nicht.",
      "en": "Feeders commonly arise from the external carotid artery, such as the middle meningeal or occipital artery. The listed pial cerebral arteries are not the typical meningeal supply at this site. ICA or vertebral branches may also contribute; identifying ECA supply alone does not describe the entire angioarchitecture.",
      "fa": "تغذیه‌کنندگان اغلب از کاروتید خارجی، مانند شریان مننژیال میانی یا اکسیپیتال، می‌آیند. شریان‌های پیال مغزیِ ذکرشده تأمین مننژیال تیپیک این محل نیستند. شاخه‌های ICA یا ورتبرال نیز می‌توانند مشارکت داشته باشند؛ یافتن تغذیهٔ ECA به‌تنهایی کل آنژیوآناتومی را مشخص نمی‌کند."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/7815143/",
    "wrongExplanations": {
      "B": {
        "de": "Die A. cerebri media ist eine piale Hirnarterie, nicht der typische meningeale Feeder dieser Lokalisation. Häufig stammen Feeder aus der A. carotis externa, etwa A. meningea media oder A. occipitalis. Die genannten pialen Hirnarterien sind nicht die typische meningeale Versorgung dieser Lokalisation. ICA- oder Vertebralisäste können ebenfalls beteiligt sein; eine ECA-Zufuhr allein beschreibt die gesamte Angioarchitektur nicht.",
        "en": "The middle cerebral artery is a pial cerebral artery, not the typical meningeal feeder at this site. Feeders commonly arise from the external carotid artery, such as the middle meningeal or occipital artery. The listed pial cerebral arteries are not the typical meningeal supply at this site. ICA or vertebral branches may also contribute; identifying ECA supply alone does not describe the entire angioarchitecture.",
        "fa": "شریان مغزی میانی یک شریان پیال مغزی است، نه تغذیه‌کنندهٔ مننژیال تیپیک این محل. تغذیه‌کنندگان اغلب از کاروتید خارجی، مانند شریان مننژیال میانی یا اکسیپیتال، می‌آیند. شریان‌های پیال مغزیِ ذکرشده تأمین مننژیال تیپیک این محل نیستند. شاخه‌های ICA یا ورتبرال نیز می‌توانند مشارکت داشته باشند؛ یافتن تغذیهٔ ECA به‌تنهایی کل آنژیوآناتومی را مشخص نمی‌کند."
      },
      "C": {
        "de": "Die A. cerebri posterior ist eine piale Hirnarterie; häufige durale Feeder sind ECA-Äste. Häufig stammen Feeder aus der A. carotis externa, etwa A. meningea media oder A. occipitalis. Die genannten pialen Hirnarterien sind nicht die typische meningeale Versorgung dieser Lokalisation. ICA- oder Vertebralisäste können ebenfalls beteiligt sein; eine ECA-Zufuhr allein beschreibt die gesamte Angioarchitektur nicht.",
        "en": "The posterior cerebral artery is a pial cerebral artery; common dural feeders are ECA branches. Feeders commonly arise from the external carotid artery, such as the middle meningeal or occipital artery. The listed pial cerebral arteries are not the typical meningeal supply at this site. ICA or vertebral branches may also contribute; identifying ECA supply alone does not describe the entire angioarchitecture.",
        "fa": "شریان مغزی خلفی یک شریان پیال مغزی است؛ تغذیه‌کنندگان دورال رایج شاخه‌های ECA هستند. تغذیه‌کنندگان اغلب از کاروتید خارجی، مانند شریان مننژیال میانی یا اکسیپیتال، می‌آیند. شریان‌های پیال مغزیِ ذکرشده تأمین مننژیال تیپیک این محل نیستند. شاخه‌های ICA یا ورتبرال نیز می‌توانند مشارکت داشته باشند؛ یافتن تغذیهٔ ECA به‌تنهایی کل آنژیوآناتومی را مشخص نمی‌کند."
      },
      "D": {
        "de": "Die A. cerebri anterior ist eine piale Hirnarterie; häufige durale Feeder sind ECA-Äste. Häufig stammen Feeder aus der A. carotis externa, etwa A. meningea media oder A. occipitalis. Die genannten pialen Hirnarterien sind nicht die typische meningeale Versorgung dieser Lokalisation. ICA- oder Vertebralisäste können ebenfalls beteiligt sein; eine ECA-Zufuhr allein beschreibt die gesamte Angioarchitektur nicht.",
        "en": "The anterior cerebral artery is a pial cerebral artery; common dural feeders are ECA branches. Feeders commonly arise from the external carotid artery, such as the middle meningeal or occipital artery. The listed pial cerebral arteries are not the typical meningeal supply at this site. ICA or vertebral branches may also contribute; identifying ECA supply alone does not describe the entire angioarchitecture.",
        "fa": "شریان مغزی قدامی یک شریان پیال مغزی است؛ تغذیه‌کنندگان دورال رایج شاخه‌های ECA هستند. تغذیه‌کنندگان اغلب از کاروتید خارجی، مانند شریان مننژیال میانی یا اکسیپیتال، می‌آیند. شریان‌های پیال مغزیِ ذکرشده تأمین مننژیال تیپیک این محل نیستند. شاخه‌های ICA یا ورتبرال نیز می‌توانند مشارکت داشته باشند؛ یافتن تغذیهٔ ECA به‌تنهایی کل آنژیوآناتومی را مشخص نمی‌کند."
      }
    }
  },
  {
    "id": "11",
    "question": {
      "de": "Welcher Cognard-Grad hat eine direkte kortikale venöse Drainage OHNE venöse Ektasie?",
      "en": "Which Cognard grade has direct cortical venous drainage WITHOUT venous ectasia?",
      "fa": "کدام درجه Cognard درناژ وریدی کورتیکال مستقیم بدون اکتازی وریدی دارد؟"
    },
    "options": [
      {
        "de": "Cognard III",
        "en": "Cognard III",
        "fa": "Cognard III"
      },
      {
        "de": "Cognard IIa",
        "en": "Cognard IIa",
        "fa": "Cognard IIa"
      },
      {
        "de": "Cognard IV",
        "en": "Cognard IV",
        "fa": "Cognard IV"
      },
      {
        "de": "Cognard V",
        "en": "Cognard V",
        "fa": "Cognard V"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Direkte kortikale Drainage ohne Ektasie ist Cognard III (Borden III). Mit Ektasie wäre es Cognard IV, ebenfalls Borden III. IIa ist Sinusreflux ohne kortikalen Reflux; V bezeichnet spinalen perimedullären Abfluss. Die römischen Zahlen der beiden Systeme sind daher nicht austauschbar.",
      "en": "Direct cortical drainage without ectasia is Cognard III (Borden III). With ectasia it would be Cognard IV, also Borden III. IIa is sinus reflux without cortical reflux; V denotes spinal perimedullary drainage. The Roman numerals of the two systems are therefore not interchangeable.",
      "fa": "درناژ مستقیم کورتیکال بدون اکتازی، Cognard III (Borden III) است. با اکتازی، Cognard IV خواهد بود که آن هم Borden III است. IIa رفلاکس سینوسی بدون رفلاکس کورتیکال است؛ V خروج وریدی پری‌مدولاری نخاعی را نشان می‌دهد. بنابراین اعداد رومی دو سیستم قابل جایگزینی نیستند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/7862961/; https://pubmed.ncbi.nlm.nih.gov/7815143/",
    "wrongExplanations": {
      "B": {
        "de": "IIa ist Sinusreflux ohne kortikale Drainage. Direkte kortikale Drainage ohne Ektasie ist Cognard III (Borden III). Mit Ektasie wäre es Cognard IV, ebenfalls Borden III. IIa ist Sinusreflux ohne kortikalen Reflux; V bezeichnet spinalen perimedullären Abfluss. Die römischen Zahlen der beiden Systeme sind daher nicht austauschbar.",
        "en": "IIa is sinus reflux without cortical drainage. Direct cortical drainage without ectasia is Cognard III (Borden III). With ectasia it would be Cognard IV, also Borden III. IIa is sinus reflux without cortical reflux; V denotes spinal perimedullary drainage. The Roman numerals of the two systems are therefore not interchangeable.",
        "fa": "IIa رفلاکس سینوسی بدون درناژ کورتیکال است. درناژ مستقیم کورتیکال بدون اکتازی، Cognard III (Borden III) است. با اکتازی، Cognard IV خواهد بود که آن هم Borden III است. IIa رفلاکس سینوسی بدون رفلاکس کورتیکال است؛ V خروج وریدی پری‌مدولاری نخاعی را نشان می‌دهد. بنابراین اعداد رومی دو سیستم قابل جایگزینی نیستند."
      },
      "C": {
        "de": "IV setzt zusätzlich venöse Ektasie voraus. Direkte kortikale Drainage ohne Ektasie ist Cognard III (Borden III). Mit Ektasie wäre es Cognard IV, ebenfalls Borden III. IIa ist Sinusreflux ohne kortikalen Reflux; V bezeichnet spinalen perimedullären Abfluss. Die römischen Zahlen der beiden Systeme sind daher nicht austauschbar.",
        "en": "IV additionally requires venous ectasia. Direct cortical drainage without ectasia is Cognard III (Borden III). With ectasia it would be Cognard IV, also Borden III. IIa is sinus reflux without cortical reflux; V denotes spinal perimedullary drainage. The Roman numerals of the two systems are therefore not interchangeable.",
        "fa": "IV علاوه بر این به اکتازی وریدی نیاز دارد. درناژ مستقیم کورتیکال بدون اکتازی، Cognard III (Borden III) است. با اکتازی، Cognard IV خواهد بود که آن هم Borden III است. IIa رفلاکس سینوسی بدون رفلاکس کورتیکال است؛ V خروج وریدی پری‌مدولاری نخاعی را نشان می‌دهد. بنابراین اعداد رومی دو سیستم قابل جایگزینی نیستند."
      },
      "D": {
        "de": "V bezeichnet spinalen perimedullären Abfluss. Direkte kortikale Drainage ohne Ektasie ist Cognard III (Borden III). Mit Ektasie wäre es Cognard IV, ebenfalls Borden III. IIa ist Sinusreflux ohne kortikalen Reflux; V bezeichnet spinalen perimedullären Abfluss. Die römischen Zahlen der beiden Systeme sind daher nicht austauschbar.",
        "en": "V denotes spinal perimedullary drainage. Direct cortical drainage without ectasia is Cognard III (Borden III). With ectasia it would be Cognard IV, also Borden III. IIa is sinus reflux without cortical reflux; V denotes spinal perimedullary drainage. The Roman numerals of the two systems are therefore not interchangeable.",
        "fa": "V درناژ پری‌مدولاری نخاعی است. درناژ مستقیم کورتیکال بدون اکتازی، Cognard III (Borden III) است. با اکتازی، Cognard IV خواهد بود که آن هم Borden III است. IIa رفلاکس سینوسی بدون رفلاکس کورتیکال است؛ V خروج وریدی پری‌مدولاری نخاعی را نشان می‌دهد. بنابراین اعداد رومی دو سیستم قابل جایگزینی نیستند."
      }
    }
  },
  {
    "id": "12",
    "question": {
      "de": "Bei bekannter dAVF treten neue fokale Defizite auf. Die MRT zeigt ein nicht auf ein arterielles Territorium begrenztes T2/FLAIR-Ödem mit erweiterten kortikalen Venen, ohne territoriales DWI/ADC-Infarktmuster. Welche Komplikation wird dadurch besonders nahegelegt?",
      "en": "A patient with known dAVF develops new focal deficits. MRI shows T2/FLAIR oedema beyond a single arterial territory with dilated cortical veins and no territorial DWI/ADC infarct pattern. Which complication is particularly suggested?",
      "fa": "بیمار دارای dAVF شناخته‌شده دچار نقایص عصبی کانونی جدید شده است. MRI ادم T2/FLAIR فراتر از یک قلمرو شریانی، همراه وریدهای کورتیکال گشاد و بدون الگوی انفارکتوس قلمرویی در DWI/ADC نشان می‌دهد. کدام عارضه بیشتر مطرح است؟"
    },
    "options": [
      {
        "de": "Venöse Stauungsenzephalopathie",
        "en": "Venous congestive encephalopathy",
        "fa": "آنسفالوپاتی احتقانی وریدی"
      },
      {
        "de": "Territorialer arterieller MCA-Infarkt",
        "en": "Territorial arterial MCA infarction",
        "fa": "انفارکتوس شریانی قلمرو MCA"
      },
      {
        "de": "Unkomplizierte spontane Fistelokklusion",
        "en": "Uncomplicated spontaneous fistula occlusion",
        "fa": "انسداد خودبه‌خودی و بدون عارضهٔ فیستول"
      },
      {
        "de": "Unkomplizierte DVA ohne Shunt",
        "en": "Uncomplicated DVA without a shunt",
        "fa": "DVA بدون عارضه و بدون شانت"
      }
    ],
    "correct": 0,
    "explanation": {
      "de": "Ödem jenseits einer arteriellen Grenze und auffällige Venen stützen bei dAVF eine venöse Stauung. Ein territorialer MCA-Infarkt passt weniger gut zum beschriebenen Muster; unkomplizierte Okklusion oder DVA erklären die neue Kombination nicht. T2-Signal allein beweist weder Reflux noch einen bestimmten Blutungsgrad. Neue Defizite verlangen dringliche Abklärung einschließlich Blutungs-/Ischämiebeurteilung und erneuter Drainagecharakterisierung.",
      "en": "Oedema beyond an arterial boundary and abnormal veins support venous congestion in dAVF. Territorial MCA infarction fits the described pattern less well; uncomplicated occlusion or DVA do not explain the new combination. T2 signal alone proves neither reflux nor a specific haemorrhage risk grade. New deficits require urgent assessment, including haemorrhage/ischaemia evaluation and renewed drainage characterization.",
      "fa": "ادم فراتر از مرز شریانی و وریدهای غیرطبیعی در dAVF به نفع احتقان وریدی‌اند. انفارکتوس قلمرویی MCA با الگوی توصیف‌شده کمتر سازگار است؛ انسداد بدون عارضه یا DVA این ترکیب جدید را توضیح نمی‌دهند. سیگنال T2 به‌تنهایی نه رفلاکس و نه درجهٔ مشخص خطر خونریزی را اثبات می‌کند. نقایص جدید نیازمند ارزیابی فوری، شامل بررسی خونریزی/ایسکمی و تعیین مجدد الگوی درناژ هستند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/26047821/; https://pmc.ncbi.nlm.nih.gov/articles/PMC7963232/; https://www.ahajournals.org/doi/10.1161/CIR.0000000000000567",
    "wrongExplanations": {
      "B": {
        "de": "Das Ödem überschreitet eine arterielle Grenze und zeigt kein territoriales DWI/ADC-Muster. Ödem jenseits einer arteriellen Grenze und auffällige Venen stützen bei dAVF eine venöse Stauung. Ein territorialer MCA-Infarkt passt weniger gut zum beschriebenen Muster; unkomplizierte Okklusion oder DVA erklären die neue Kombination nicht. T2-Signal allein beweist weder Reflux noch einen bestimmten Blutungsgrad. Neue Defizite verlangen dringliche Abklärung einschließlich Blutungs-/Ischämiebeurteilung und erneuter Drainagecharakterisierung.",
        "en": "The oedema crosses an arterial boundary and lacks a territorial DWI/ADC pattern. Oedema beyond an arterial boundary and abnormal veins support venous congestion in dAVF. Territorial MCA infarction fits the described pattern less well; uncomplicated occlusion or DVA do not explain the new combination. T2 signal alone proves neither reflux nor a specific haemorrhage risk grade. New deficits require urgent assessment, including haemorrhage/ischaemia evaluation and renewed drainage characterization.",
        "fa": "ادم از مرز شریانی فراتر رفته و الگوی قلمرویی DWI/ADC ندارد. ادم فراتر از مرز شریانی و وریدهای غیرطبیعی در dAVF به نفع احتقان وریدی‌اند. انفارکتوس قلمرویی MCA با الگوی توصیف‌شده کمتر سازگار است؛ انسداد بدون عارضه یا DVA این ترکیب جدید را توضیح نمی‌دهند. سیگنال T2 به‌تنهایی نه رفلاکس و نه درجهٔ مشخص خطر خونریزی را اثبات می‌کند. نقایص جدید نیازمند ارزیابی فوری، شامل بررسی خونریزی/ایسکمی و تعیین مجدد الگوی درناژ هستند."
      },
      "C": {
        "de": "Unkomplizierte Okklusion erklärt neue Defizite mit Ödem und auffälligen Venen nicht. Ödem jenseits einer arteriellen Grenze und auffällige Venen stützen bei dAVF eine venöse Stauung. Ein territorialer MCA-Infarkt passt weniger gut zum beschriebenen Muster; unkomplizierte Okklusion oder DVA erklären die neue Kombination nicht. T2-Signal allein beweist weder Reflux noch einen bestimmten Blutungsgrad. Neue Defizite verlangen dringliche Abklärung einschließlich Blutungs-/Ischämiebeurteilung und erneuter Drainagecharakterisierung.",
        "en": "Uncomplicated occlusion does not explain new deficits with oedema and abnormal veins. Oedema beyond an arterial boundary and abnormal veins support venous congestion in dAVF. Territorial MCA infarction fits the described pattern less well; uncomplicated occlusion or DVA do not explain the new combination. T2 signal alone proves neither reflux nor a specific haemorrhage risk grade. New deficits require urgent assessment, including haemorrhage/ischaemia evaluation and renewed drainage characterization.",
        "fa": "انسداد بدون عارضه، نقایص جدید همراه ادم و وریدهای غیرطبیعی را توضیح نمی‌دهد. ادم فراتر از مرز شریانی و وریدهای غیرطبیعی در dAVF به نفع احتقان وریدی‌اند. انفارکتوس قلمرویی MCA با الگوی توصیف‌شده کمتر سازگار است؛ انسداد بدون عارضه یا DVA این ترکیب جدید را توضیح نمی‌دهند. سیگنال T2 به‌تنهایی نه رفلاکس و نه درجهٔ مشخص خطر خونریزی را اثبات می‌کند. نقایص جدید نیازمند ارزیابی فوری، شامل بررسی خونریزی/ایسکمی و تعیین مجدد الگوی درناژ هستند."
      },
      "D": {
        "de": "Eine unkomplizierte DVA erklärt diese neue Stauungskonstellation bei bekannter dAVF nicht. Ödem jenseits einer arteriellen Grenze und auffällige Venen stützen bei dAVF eine venöse Stauung. Ein territorialer MCA-Infarkt passt weniger gut zum beschriebenen Muster; unkomplizierte Okklusion oder DVA erklären die neue Kombination nicht. T2-Signal allein beweist weder Reflux noch einen bestimmten Blutungsgrad. Neue Defizite verlangen dringliche Abklärung einschließlich Blutungs-/Ischämiebeurteilung und erneuter Drainagecharakterisierung.",
        "en": "An uncomplicated DVA does not explain this new congestion pattern in known dAVF. Oedema beyond an arterial boundary and abnormal veins support venous congestion in dAVF. Territorial MCA infarction fits the described pattern less well; uncomplicated occlusion or DVA do not explain the new combination. T2 signal alone proves neither reflux nor a specific haemorrhage risk grade. New deficits require urgent assessment, including haemorrhage/ischaemia evaluation and renewed drainage characterization.",
        "fa": "DVA بدون عارضه این الگوی جدید احتقان را در dAVF شناخته‌شده توضیح نمی‌دهد. ادم فراتر از مرز شریانی و وریدهای غیرطبیعی در dAVF به نفع احتقان وریدی‌اند. انفارکتوس قلمرویی MCA با الگوی توصیف‌شده کمتر سازگار است؛ انسداد بدون عارضه یا DVA این ترکیب جدید را توضیح نمی‌دهند. سیگنال T2 به‌تنهایی نه رفلاکس و نه درجهٔ مشخص خطر خونریزی را اثبات می‌کند. نقایص جدید نیازمند ارزیابی فوری، شامل بررسی خونریزی/ایسکمی و تعیین مجدد الگوی درناژ هستند."
      }
    }
  }
]

export const DAVF_QUESTIONS = Object.fromEntries(['de','en','fa'].map(lang=>[lang,TQ.map(seed=>({
  id:`davf-${lang}-${seed.id}`,tags:['davf','gefaessmalformationen','gehirn'],fach:'gehirn',question:seed.question[lang],
  options:seed.options.map((text,index)=>({id:String.fromCharCode(65+index),text:text[lang]})),correct:String.fromCharCode(65+seed.correct),
  explanation:seed.explanation[lang],wrongExplanations:Object.fromEntries(Object.entries(seed.wrongExplanations).map(([id,t])=>[id,t[lang]])),source:seed.source,
}))]))

export const DAVF_FLASHCARDS = [
  {
    "id": "davf-01-definition",
    "topicId": "davf",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Was ist eine durale AV-Fistel (dAVF)?",
      "en": "What is a dural arteriovenous fistula (dAVF)?",
      "fa": "فیستول دورال AV (dAVF) چیست؟"
    },
    "answer": {
      "de": "Meist erworbene AV-Shuntverbindung in der Dura ohne parenchymalen Nidus.",
      "en": "Usually acquired AV shunt in the dura without a parenchymal nidus.",
      "fa": "شانت AV معمولاً اکتسابی در دورا، بدون نیدوس پارانشیمی."
    },
    "explanation": {
      "de": "Direkte Verbindung zwischen meningealen Arterien und einem duralen Sinus oder kortikaler Vene. Kein Nidus ist der wichtigste Unterschied zur AVM.",
      "en": "Direct connection between meningeal arteries and a dural sinus or cortical vein. No nidus is the key distinction from AVM.",
      "fa": "اتصال مستقیم بین شریان‌های مننژیال و سینوس دورال یا ورید کورتیکال. نبود نیدوس مهم‌ترین تفاوت با AVM است."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/7815143/"
  },
  {
    "id": "davf-02-avm-unterschied",
    "topicId": "davf",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Wichtigster Unterschied dAVF vs. AVM?",
      "en": "Most important difference dAVF vs. AVM?",
      "fa": "مهم‌ترین تفاوت dAVF در مقابل AVM؟"
    },
    "answer": {
      "de": "dAVF: duraler Shunt ohne Nidus. Parenchymale AVM: Gefäßnidus.",
      "en": "dAVF: dural shunt without a nidus. Parenchymal AVM: vascular nidus.",
      "fa": "dAVF: شانت دورال بدون نیدوس. AVM پارانشیمی: نیدوس عروقی."
    },
    "explanation": {
      "de": "Das Gefäßkompartiment und der Nidus sind die entscheidenden strukturellen Merkmale. Die dAVF ist meist erworben; das Etikett kongenital/erworben ersetzt die Darstellung der Shuntanatomie nicht.",
      "en": "Vascular compartment and nidus are the decisive structural features. dAVF is usually acquired; a congenital/acquired label does not replace demonstration of shunt anatomy.",
      "fa": "کمپارتمان عروقی و نیدوس ویژگی‌های ساختاری تعیین‌کننده‌اند. dAVF معمولاً اکتسابی است؛ برچسب مادرزادی/اکتسابی جای نمایش آناتومی شانت را نمی‌گیرد."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/7815143/"
  },
  {
    "id": "davf-03-aetiologie",
    "topicId": "davf",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Welche venöse Erkrankung ist mit erworbenen dAVF assoziiert?",
      "en": "Which venous disorder is associated with acquired dAVF?",
      "fa": "کدام بیماری وریدی با dAVF اکتسابی ارتباط دارد؟"
    },
    "answer": {
      "de": "Eine zerebrale Sinusthrombose; eine solche Assoziation ist nicht bei jeder dAVF nachweisbar.",
      "en": "Cerebral venous sinus thrombosis; this association is not demonstrated in every dAVF.",
      "fa": "ترومبوز سینوس وریدی مغز؛ این ارتباط در همهٔ dAVFها اثبات نمی‌شود."
    },
    "explanation": {
      "de": "Sinusthrombose und venöse Hypertension können die Entstehung duraler Shunts begünstigen. Auch Trauma, Operation oder Infektion sind Assoziationen. Die Ursache bleibt häufig unklar; eine Sinusthrombose ist weder Voraussetzung noch alleiniger Beweis einer dAVF.",
      "en": "Sinus thrombosis and venous hypertension can promote formation of dural shunts. Trauma, surgery and infection are also associations. The cause often remains unclear; sinus thrombosis is neither required for nor sufficient proof of dAVF.",
      "fa": "ترومبوز سینوس و پرفشاری وریدی می‌توانند به تشکیل شانت دورال کمک کنند. تروما، جراحی و عفونت نیز از عوامل همراه‌اند. علت اغلب نامشخص می‌ماند؛ ترومبوز سینوس نه پیش‌شرط و نه به‌تنهایی اثبات‌کنندهٔ dAVF است."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://www.ahajournals.org/doi/10.1161/CIR.0000000000000567"
  },
  {
    "id": "davf-04-lokalisation",
    "topicId": "davf",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Häufigste Lokalisation der dAVF?",
      "en": "Most common dAVF location?",
      "fa": "شایع‌ترین محل dAVF؟"
    },
    "answer": {
      "de": "Sinus transversus / sigmoideus.",
      "en": "Transverse / sigmoid sinus.",
      "fa": "سینوس ترانسورسوس / سیگموئیدوس."
    },
    "explanation": {
      "de": "Weitere Lokalisationen: Sinus cavernosus (meist indirekte durale Barrow-B–D-Fistel), Tentorium, Sinus sagittalis superior, Foramen magnum.",
      "en": "Other locations: cavernous sinus (usually an indirect dural Barrow B–D fistula), tentorium, superior sagittal sinus, foramen magnum.",
      "fa": "محل‌های دیگر: سینوس کاورنوسوس (معمولاً فیستول دورال غیرمستقیم Barrow B–D)، تنتوریوم، سینوس ساژیتال فوقانی، فورامن ماگنوم."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35"
  },
  {
    "id": "davf-05-cognard-cvd",
    "topicId": "davf",
    "category": {
      "de": "Klassifikation",
      "en": "Classification",
      "fa": "طبقه‌بندی"
    },
    "front": {
      "de": "Warum ist kortikale venöse Drainage/Reflux bei dAVF entscheidend?",
      "en": "Why is cortical venous drainage/reflux important in dAVF?",
      "fa": "چرا درناژ/رفلاکس وریدی کورتیکال در dAVF مهم است؟"
    },
    "answer": {
      "de": "Sie kennzeichnet ein aggressives Drainagemuster mit erhöhtem Risiko venöser Hirnschädigung und Blutung.",
      "en": "It marks an aggressive drainage pattern with increased risk of venous brain injury and haemorrhage.",
      "fa": "نشان‌دهندهٔ الگوی درناژ پرخطر با افزایش خطر آسیب وریدی مغز و خونریزی است."
    },
    "explanation": {
      "de": "Cognard IIb, IIa+b, III und IV weisen kortikale Drainage/Reflux auf. Bei III/IV ist sie direkt, ohne Sinusdrainage. Präsentation und venöse Ektasie beeinflussen das individuelle Risiko zusätzlich; V bezeichnet spinalen Abfluss.",
      "en": "Cognard IIb, IIa+b, III and IV have cortical drainage/reflux. In III/IV it is direct, without sinus drainage. Presentation and venous ectasia further influence individual risk; V denotes spinal drainage.",
      "fa": "در Cognard IIb، IIa+b، III و IV درناژ/رفلاکس کورتیکال وجود دارد. در III/IV این درناژ مستقیم و بدون درناژ سینوسی است. تظاهر بالینی و اکتازی وریدی نیز بر خطر فردی اثر دارند؛ V درناژ نخاعی است."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/7862961/; https://pubmed.ncbi.nlm.nih.gov/22610384/"
  },
  {
    "id": "davf-06-cognard-grading",
    "topicId": "davf",
    "category": {
      "de": "Klassifikation",
      "en": "Classification",
      "fa": "طبقه‌بندی"
    },
    "front": {
      "de": "Wie ordnet Borden Sinusdrainage ohne bzw. mit kortikalem Reflux und direkte kortikale Drainage ein?",
      "en": "How does Borden classify sinus drainage without or with cortical reflux, and direct cortical drainage?",
      "fa": "Borden درناژ سینوسی بدون یا همراه رفلاکس کورتیکال و درناژ مستقیم کورتیکال را چگونه طبقه‌بندی می‌کند؟"
    },
    "answer": {
      "de": "I: Sinus ohne kortikalen Reflux. II: Sinus mit kortikalem Reflux. III: direkte kortikale Drainage ohne Sinusdrainage.",
      "en": "I: sinus without cortical reflux. II: sinus with cortical reflux. III: direct cortical drainage without sinus drainage.",
      "fa": "I: سینوس بدون رفلاکس کورتیکال. II: سینوس همراه رفلاکس کورتیکال. III: درناژ مستقیم کورتیکال بدون درناژ سینوسی."
    },
    "explanation": {
      "de": "Cognard I/IIa entsprechen Borden I, IIb/IIa+b Borden II und III/IV Borden III. Cognard unterscheidet zusätzlich Sinusflussrichtung und venöse Ektasie; V bezeichnet spinalen perimedullären Abfluss. Die Nummern sind nicht austauschbar.",
      "en": "Cognard I/IIa correspond to Borden I, IIb/IIa+b to Borden II and III/IV to Borden III. Cognard additionally distinguishes sinus flow direction and venous ectasia; V denotes spinal perimedullary drainage. The numbers are not interchangeable.",
      "fa": "Cognard I/IIa با Borden I، IIb/IIa+b با Borden II و III/IV با Borden III متناظرند. Cognard جهت جریان سینوس و اکتازی وریدی را نیز تفکیک می‌کند؛ V درناژ پری‌مدولاری نخاعی است. اعداد قابل جایگزینی نیستند."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/7815143/; https://pubmed.ncbi.nlm.nih.gov/7862961/"
  },
  {
    "id": "davf-07-tinnitus",
    "topicId": "davf",
    "category": {
      "de": "Klinik",
      "en": "Clinical",
      "fa": "بالینی"
    },
    "front": {
      "de": "Welches Symptom ist klassisch für eine Sinus-transversus-dAVF?",
      "en": "Which symptom is classic for transverse sinus dAVF?",
      "fa": "کدام علامت برای dAVF سینوس ترانسورسوس کلاسیک است؟"
    },
    "answer": {
      "de": "Pulssynchroner Tinnitus.",
      "en": "Pulsatile tinnitus.",
      "fa": "تینیتوس سنکرون با نبض."
    },
    "explanation": {
      "de": "Die Fistel am Sinus transversus/sigmoideus leitet arterielles Blut in den Sinus → Turbulenzen → Tinnitus synchron mit dem Herzschlag. Meist einseitig.",
      "en": "The fistula at the transverse/sigmoid sinus routes arterial blood into the sinus → turbulence → tinnitus synchronous with heartbeat. Usually unilateral.",
      "fa": "فیستول در سینوس ترانسورسوس/سیگموئیدوس خون شریانی را به سینوس هدایت می‌کند → توربولانس → تینیتوس سنکرون با ضربان قلب. معمولاً یک‌طرفه."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35"
  },
  {
    "id": "davf-08-cavernosus",
    "topicId": "davf",
    "category": {
      "de": "Klinik",
      "en": "Clinical",
      "fa": "بالینی"
    },
    "front": {
      "de": "Typische Symptomtrias der Sinus-cavernosus-dAVF?",
      "en": "Typical symptom triad of cavernous sinus dAVF?",
      "fa": "تریاد علائم تیپیک dAVF سینوس کاورنوسوس؟"
    },
    "answer": {
      "de": "Exophthalmus, Chemose, Visusstörung.",
      "en": "Proptosis, chemosis, visual disturbance.",
      "fa": "اگزوفتالموس، کموز، اختلال بینایی."
    },
    "explanation": {
      "de": "Die Arterialisierung des Sinus cavernosus erhöht den Druck in der V. ophthalmika → Stauung → Exophthalmus, Chemose, Rötung, Visusstörung. Auch Ptosis und Doppelbilder möglich.",
      "en": "Arterialisation of the cavernous sinus raises ophthalmic vein pressure → congestion → proptosis, chemosis, redness, visual disturbance. Ptosis and diplopia also possible.",
      "fa": "شریانی‌شدن سینوس کاورنوسوس فشار ورید چشمی را افزایش می‌دهد → احتقان → اگزوفتالموس، کموز، قرمزی، اختلال بینایی. پتوز و دیپلوپی نیز ممکن است."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/3968564/"
  },
  {
    "id": "davf-09-mrt-befunde",
    "topicId": "davf",
    "category": {
      "de": "Bildgebung",
      "en": "Imaging",
      "fa": "تصویربرداری"
    },
    "front": {
      "de": "Welcher T2-Befund deutet auf eine venöse Stauungsenzephalopathie bei dAVF?",
      "en": "Which T2 finding suggests venous congestive encephalopathy in dAVF?",
      "fa": "کدام یافته T2 به آنسفالوپاتی احتقانی وریدی در dAVF اشاره دارد؟"
    },
    "answer": {
      "de": "T2/FLAIR-Ödem, ggf. mit erweiterten kortikalen/medullären Venen.",
      "en": "T2/FLAIR oedema, potentially with dilated cortical/medullary veins.",
      "fa": "ادم T2/FLAIR، گاه همراه وریدهای کورتیکال/مدولاری گشاد."
    },
    "explanation": {
      "de": "Venöse Hypertension kann ein Ödem außerhalb eines einzelnen arteriellen Territoriums verursachen. Das Signal ist unspezifisch und beweist den Reflux nicht. Neue neurologische Defizite erfordern dringliche Abklärung; Blutung und Ischämie mitbeurteilen und den Drainageweg angiographisch klären.",
      "en": "Venous hypertension can cause oedema beyond a single arterial territory. The signal is nonspecific and does not prove reflux. New neurological deficits require urgent assessment; evaluate haemorrhage and ischaemia and characterize drainage angiographically.",
      "fa": "پرفشاری وریدی می‌تواند ادمی فراتر از یک قلمرو شریانی ایجاد کند. این سیگنال غیراختصاصی است و رفلاکس را اثبات نمی‌کند. نقایص عصبی جدید نیازمند بررسی فوری‌اند؛ خونریزی و ایسکمی نیز بررسی و مسیر درناژ با آنژیوگرافی مشخص شود."
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/26047821/; https://pmc.ncbi.nlm.nih.gov/articles/PMC7963232/"
  },
  {
    "id": "davf-10-pseudophlebitisch",
    "topicId": "davf",
    "category": {
      "de": "Bildgebung",
      "en": "Imaging",
      "fa": "تصویربرداری"
    },
    "front": {
      "de": "Was beschreibt das pseudophlebitische Muster, und was kann SWI dazu zeigen?",
      "en": "What does the pseudophlebitic pattern describe, and what can SWI show?",
      "fa": "الگوی سودوفلبیتیک چه چیزی را توصیف می‌کند و SWI چه چیزی می‌تواند نشان دهد؟"
    },
    "answer": {
      "de": "Angiographisches venöses Stauungsmuster; SWI kann korrespondierende erweiterte, geschlängelte Venen zeigen.",
      "en": "Angiographic venous congestion pattern; SWI can show corresponding dilated, tortuous veins.",
      "fa": "الگوی آنژیوگرافیک احتقان وریدی؛ SWI می‌تواند وریدهای گشاد و پیچ‌خوردهٔ متناظر را نشان دهد."
    },
    "explanation": {
      "de": "Angiographisch bestehen geschlängelte kollaterale/kortikale Venen und verzögerte normale Hirnzirkulation. Das SWI-Signal hängt von Oxygenierung und Fluss ab; Shuntvenen können hyperintens, gestaute Venen hypointens sein. SWI kann Reflux übersehen oder unterschätzen und ersetzt die Drainagecharakterisierung durch DSA nicht.",
      "en": "Angiography shows tortuous collateral/cortical veins and delayed normal cerebral circulation. SWI signal depends on oxygenation and flow; shunt veins can be hyperintense and congested veins hypointense. SWI can miss or underestimate reflux and does not replace DSA characterization of drainage.",
      "fa": "در آنژیوگرافی وریدهای کولترال/کورتیکال پیچ‌خورده و تأخیر گردش طبیعی مغز دیده می‌شوند. سیگنال SWI به اکسیژناسیون و جریان وابسته است؛ وریدهای شانت ممکن است پرسیگنال و وریدهای دچار احتقان کم‌سیگنال باشند. SWI ممکن است رفلاکس را نشان ندهد یا کمتر از واقع برآورد کند و جای تعیین درناژ با DSA را نمی‌گیرد."
    },
    "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC7964792/; https://pmc.ncbi.nlm.nih.gov/articles/PMC7963232/"
  },
  {
    "id": "davf-11-dsa",
    "topicId": "davf",
    "category": {
      "de": "Bildgebung",
      "en": "Imaging",
      "fa": "تصویربرداری"
    },
    "front": {
      "de": "Warum ist DSA die Referenzuntersuchung bei dAVF?",
      "en": "Why is DSA the reference examination for dAVF?",
      "fa": "چرا DSA روش مرجع بررسی dAVF است؟"
    },
    "answer": {
      "de": "Referenzstandard zur vollständigen Charakterisierung von Fistelpunkt, Feeder und Drainagemuster.",
      "en": "Reference standard for full characterization of fistula point, feeders and drainage pattern.",
      "fa": "استاندارد مرجع برای مشخص‌کردن کامل نقطه فیستول، تغذیه‌کنندگان و الگوی درناژ."
    },
    "explanation": {
      "de": "MRT und CTA können einen Verdacht liefern; DSA ist die Referenz zur umfassenden Charakterisierung von Fistelpunkt, Feeder und Drainagemuster sowie für die Therapieplanung.",
      "en": "MRI and CTA can raise suspicion; DSA is the reference examination for comprehensive characterization of fistula point, feeders and drainage pattern and for treatment planning.",
      "fa": "MRI و CTA می‌توانند شک ایجاد کنند؛ DSA روش مرجع برای مشخص‌کردن جامع نقطه فیستول، تغذیه‌کنندگان و الگوی درناژ و برنامه‌ریزی درمان است."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35; https://pubmed.ncbi.nlm.nih.gov/26047821/"
  },
  {
    "id": "davf-12-feeder",
    "topicId": "davf",
    "category": {
      "de": "Bildgebung",
      "en": "Imaging",
      "fa": "تصویربرداری"
    },
    "front": {
      "de": "Aus welchen Arterien stammen die meisten dAVF-Feeder?",
      "en": "From which arteries do most dAVF feeders arise?",
      "fa": "اغلب تغذیه‌کنندگان dAVF از کدام شریان‌ها می‌آیند؟"
    },
    "answer": {
      "de": "Äste der A. carotis externa (A. meningea media, A. occipitalis).",
      "en": "External carotid artery branches (middle meningeal, occipital arteries).",
      "fa": "شاخه‌های شریان کاروتید خارجی (مننژ میانی، اکسیپیتال)."
    },
    "explanation": {
      "de": "Die häufigsten Feeder sind: A. meningea media, A. occipitalis, A. pharyngea ascendens — alle aus der A. carotis externa. Gelegentlich auch Äste der A. carotis interna oder A. vertebralis beteiligt.",
      "en": "The most common feeders are: middle meningeal, occipital, ascending pharyngeal arteries — all from the external carotid. Branches from the internal carotid or vertebral arteries may also contribute.",
      "fa": "شایع‌ترین تغذیه‌کنندگان: شریان مننژ میانی، اکسیپیتال، فارنکس صعودی — همه از کاروتید خارجی. شاخه‌های کاروتید داخلی یا ورتبرال نیز ممکن است مشارکت داشته باشند."
    },
    "source": "Gehirn.pdf physical35–36 / printed34–35"
  },
  {
    "id": "davf-13-therapie",
    "topicId": "davf",
    "category": {
      "de": "Management",
      "en": "Management",
      "fa": "مدیریت"
    },
    "front": {
      "de": "Wie wird bei symptomatischer dAVF mit kortikaler Drainage die Therapie geplant?",
      "en": "How is treatment planned for symptomatic dAVF with cortical drainage?",
      "fa": "در dAVF علامت‌دار با درناژ کورتیکال، درمان چگونه برنامه‌ریزی می‌شود؟"
    },
    "answer": {
      "de": "Zeitnahe neurovaskuläre Beurteilung; Shuntverschluss je nach Anatomie endovaskulär und/oder mikrochirurgisch.",
      "en": "Timely neurovascular assessment; endovascular and/or microsurgical shunt closure according to anatomy.",
      "fa": "ارزیابی به‌موقع نوروعروقی؛ بستن شانت بر اساس آناتومی از راه اندوواسکولار و/یا میکروجراحی."
    },
    "explanation": {
      "de": "Transarterielle und transvenöse Verfahren sind wichtige Optionen. Die Behandlung zielt auf den Shunt und muss den normalen Hirnvenenabfluss schützen; eine pauschale Okklusion jedes beteiligten Sinus ist keine Regel. Radiochirurgie wirkt verzögert und ist bei dringlichem Verschlussbedarf keine sofortige Lösung.",
      "en": "Transarterial and transvenous procedures are important options. Treatment targets the shunt and must protect normal cerebral venous outflow; routine occlusion of every involved sinus is not a rule. Radiosurgery has a delayed effect and is not an immediate solution when urgent closure is needed.",
      "fa": "روش‌های ترانس‌شریانی و ترانس‌وریدی گزینه‌های مهمی هستند. درمان شانت را هدف می‌گیرد و باید درناژ وریدی طبیعی مغز را حفظ کند؛ انسداد هر سینوس درگیر قاعدهٔ عمومی نیست. اثر رادیوسرجری تأخیری است و در نیاز به بستن فوری شانت راه‌حل آنی نیست."
    },
    "source": "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000567"
  },
  {
    "id": "davf-14-konservativ",
    "topicId": "davf",
    "category": {
      "de": "Management",
      "en": "Management",
      "fa": "مدیریت"
    },
    "front": {
      "de": "Wann ist konservatives Management bei dAVF akzeptabel?",
      "en": "When is conservative management acceptable in dAVF?",
      "fa": "چه زمانی مدیریت محافظه‌کارانه در dAVF قابل قبول است؟"
    },
    "answer": {
      "de": "Bei ausgewählten Cognard-I- oder IIa-Fisteln ohne kortikalen venösen Reflux nach individueller Beurteilung.",
      "en": "For selected Cognard I or IIa fistulas without cortical venous reflux, following individual assessment.",
      "fa": "در فیستول‌های منتخب Cognard I یا IIa بدون رفلاکس وریدی کورتیکال، پس از ارزیابی فردی."
    },
    "explanation": {
      "de": "Cognard I hat antegrade, IIa retrograde Sinusdrainage ohne kortikalen Reflux. Beschwerden, venöse Abflussbehinderung und Zeichen intrakranieller Hypertension sind mitzubeurteilen; Beobachtung erfordert geplante Verlaufskontrollen und erneute Abklärung bei veränderten Symptomen.",
      "en": "Cognard I has antegrade and IIa retrograde sinus drainage without cortical reflux. Assess symptoms, venous outflow obstruction and signs of intracranial hypertension; observation requires planned follow-up and reassessment if symptoms change.",
      "fa": "Cognard I درناژ آنتروگراد و IIa درناژ رتروگراد سینوس را بدون رفلاکس کورتیکال دارند. علائم، اختلال خروج وریدی و نشانه‌های پرفشاری داخل جمجمه نیز باید ارزیابی شوند؛ مشاهده به پیگیری برنامه‌ریزی‌شده و بررسی مجدد در صورت تغییر علائم نیاز دارد."
    },
    "source": "https://www.ahajournals.org/doi/10.1161/CIR.0000000000000567; https://pubmed.ncbi.nlm.nih.gov/34628528/"
  }
]

export const DAVF_FLASHCARD_TOPIC = {
  "id": "davf",
  "area": "Kopf",
  "chapter": "Vaskuläre Erkrankungen",
  "icon": "🔗",
  "iconImage": "/fach/gehirn.png",
  "color": "#dc2626",
  "href": "/flashcards/davf",
  "title": {
    "de": "Durale AV-Fistel (dAVF)",
    "en": "Dural Arteriovenous Fistula (dAVF)",
    "fa": "فیستول دورال AV (dAVF)"
  },
  "subtitle": {
    "de": "Cognard-Klassifikation · CVD · DSA · Embolisation · Differenzialdiagnose",
    "en": "Cognard classification · CVD · DSA · embolisation · differential",
    "fa": "طبقه‌بندی Cognard · CVD · DSA · آمبولیزاسیون · افتراقی"
  }
}
