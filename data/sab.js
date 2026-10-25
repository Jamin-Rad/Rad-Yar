// Subarachnoid haemorrhage: canonical lesson, original6MCQs and8cards.
const L = (de, en, fa) => ({ de, en, fa })
export const SAB_LESSON = {
  "pdfSourcePages": [
    15,
    17
  ],
  "toc": {
    "de": "Inhaltsverzeichnis",
    "en": "Contents",
    "fa": "فهرست مطالب"
  },
  "breadcrumbArea": {
    "de": "Kopf",
    "en": "Head",
    "fa": "سر"
  },
  "breadcrumbCurrent": {
    "de": "Vaskuläre Erkrankungen · Subarachnoidalblutung",
    "en": "Vascular diseases · Subarachnoid haemorrhage",
    "fa": "بیماری‌های عروقی · خونریزی زیر عنکبوتیه"
  },
  "title": {
    "de": "Subarachnoidalblutung",
    "en": "Subarachnoid Haemorrhage",
    "fa": "خونریزی زیر عنکبوتیه"
  },
  "subtitle": {
    "de": "Blutverteilung, Gefäßsuche und Komplikationen im Verlauf",
    "en": "Blood distribution, vascular investigation and evolving complications",
    "fa": "توزیع خون، بررسی عروق و عوارض در سیر بیماری"
  },
  "sourceLabel": "Dr. Zia",
  "actionMcq": "MCQ",
  "actionFlash": {
    "de": "Flashcards",
    "en": "Flashcards",
    "fa": "فلش‌کارت"
  },
  "keyLabel": {
    "de": "Merke",
    "en": "Key point",
    "fa": "نکته مهم"
  },
  "caveLabel": {
    "de": "CAVE",
    "en": "Caution",
    "fa": "احتیاط"
  },
  "openCase": {
    "de": "Fall in Radiopaedia öffnen",
    "en": "Open case in Radiopaedia",
    "fa": "باز کردن کیس در Radiopaedia"
  },
  "sections": [
    {
      "id": "klinik",
      "label": {
        "de": "Klinik & Ätiologie",
        "en": "Clinical & aetiology",
        "fa": "بالین و علت‌شناسی"
      },
      "icon": "🩸"
    },
    {
      "id": "ct",
      "label": {
        "de": "CT-Diagnostik",
        "en": "CT diagnosis",
        "fa": "تشخیص CT"
      },
      "icon": "🖥️"
    },
    {
      "id": "fisher",
      "label": {
        "de": "Modifizierte Fisher-Skala",
        "en": "Modified Fisher Scale",
        "fa": "مقیاس فیشر اصلاح‌شده"
      },
      "icon": "📊"
    },
    {
      "id": "gefaesse",
      "label": {
        "de": "Gefäßdarstellung",
        "en": "Vascular imaging",
        "fa": "تصویربرداری عروقی"
      },
      "icon": "🫀"
    },
    {
      "id": "komplikationen",
      "label": {
        "de": "Komplikationen",
        "en": "Complications",
        "fa": "عوارض"
      },
      "icon": "⚠️"
    },
    {
      "id": "takehome",
      "label": {
        "de": "Take home message",
        "en": "Take-home messages",
        "fa": "نکات کلیدی"
      },
      "icon": "💡"
    }
  ],
  "heroCards": [
    {
      "value": "Verteilung",
      "label": {
        "de": "Quelle eingrenzen",
        "en": "Narrow the source",
        "fa": "منشأ را محدود کنید"
      },
      "text": {
        "de": "Zisternen, Sylvische Fissuren und kortikale Sulci systematisch vergleichen.",
        "en": "Compare the basal cisterns, Sylvian fissures and cortical sulci systematically.",
        "fa": "سیسترن‌های قاعده‌ای، شکاف‌های سیلویوس و شیارهای قشری را نظام‌مند مقایسه کنید."
      }
    },
    {
      "value": "IVH + Dicke",
      "label": {
        "de": "Modified Fisher Grad 4",
        "en": "Modified Fisher Grade 4",
        "fa": "درجهٔ ۴ فیشر اصلاح‌شده"
      },
      "text": {
        "de": "Modified-Fisher-Grad 4 kombiniert dickes Zisternenblut und IVH und bezeichnet die höchste Kategorie der Skala.",
        "en": "Modified Fisher Grade 4 combines thick cisternal blood and IVH and is the scale’s highest category.",
        "fa": "درجه ۴ فیشر اصلاح‌شده ترکیب خون ضخیم سیسترنی و IVH است و بالاترین گروه مقیاس محسوب می‌شود."
      }
    },
    {
      "value": "< 6 h",
      "label": {
        "de": "Diagnostischer Kontext",
        "en": "Diagnostic context",
        "fa": "زمینه تشخیصی"
      },
      "text": {
        "de": "Eine negative CT kann nur unter definierten Bedingungen zum Ausschluss reichen.",
        "en": "A negative CT can be used to exclude aSAH only under defined conditions.",
        "fa": "CT منفی فقط در شرایط مشخص می‌تواند برای رد aSAB کافی باشد."
      }
    }
  ],
  "klinik": {
    "title": {
      "de": "Klinik & Ätiologie",
      "en": "Clinical features & aetiology",
      "fa": "تظاهرات بالینی و علت‌شناسی"
    },
    "lead": {
      "de": "Die SAB ist eine Blutung in den Subarachnoidalraum. Ein plötzlich maximal starker Kopfschmerz ist ein Warnmuster, aber nicht die einzige mögliche Präsentation und nicht spezifisch für SAB.",
      "en": "SAH is bleeding into the subarachnoid space. A sudden, severe headache reaching maximal intensity is a warning pattern, but it is neither the only presentation nor specific to SAH.",
      "fa": "SAB خونریزی در فضای زیر عنکبوتیه است. سردرد ناگهانی و بسیار شدید که سریع به اوج می‌رسد الگویی هشداردهنده است، اما تنها تظاهر ممکن نیست و اختصاصی SAB هم نیست."
    },
    "definitionItems": [
      {
        "icon": "🔴",
        "title": {
          "de": "Vernichtungskopfschmerz",
          "en": "Thunderclap headache",
          "fa": "سردرد رعدآسا"
        },
        "text": {
          "de": "Plötzlich einsetzender, rasch maximaler Kopfschmerz – „wie eine Explosion im Kopf“. Ein dringliches Warnmuster mit breiter Differenzialdiagnose, nicht spezifisch für aneurysmatische SAB.",
          "en": "Sudden-onset headache reaching maximum intensity rapidly — “like an explosion in the head”. An urgent warning pattern with a broad differential, not specific to aneurysmal SAH.",
          "fa": "سردردی که ناگهانی آغاز می‌شود و سریع به بیشترین شدت می‌رسد («مثل انفجار در سر»). الگویی هشداردهنده و نیازمند بررسی فوری است، اما افتراق گسترده‌ای دارد و اختصاصی SAB آنوریسمی نیست."
        }
      },
      {
        "icon": "🤢",
        "title": {
          "de": "Übelkeit & Erbrechen",
          "en": "Nausea & vomiting",
          "fa": "تهوع و استفراغ"
        },
        "text": {
          "de": "Häufig bei akuter SAB durch Meningismus und erhöhten intrakraniellen Druck.",
          "en": "Common in acute SAH due to meningism and raised intracranial pressure.",
          "fa": "شایع در SAB حاد به دلیل مننژیسم و افزایش فشار داخل جمجمه."
        }
      },
      {
        "icon": "🔆",
        "title": {
          "de": "Meningismus",
          "en": "Meningism",
          "fa": "مننژیسم"
        },
        "text": {
          "de": "Nackensteifigkeit, Lichtscheu, Kernig/Brudzinski-Zeichen. Entwickelt sich typischerweise innerhalb von Stunden nach der Blutung.",
          "en": "Neck stiffness, photophobia, Kernig/Brudzinski signs. Typically develops within hours of the bleed.",
          "fa": "سفتی گردن، فوتوفوبی، علائم کرنیگ/برودزینسکی. معمولاً چند ساعت پس از خونریزی ظاهر می‌شوند."
        }
      },
      {
        "icon": "😵",
        "title": {
          "de": "Bewusstseinsstörung",
          "en": "Reduced consciousness",
          "fa": "کاهش سطح هوشیاری"
        },
        "text": {
          "de": "Kurze Bewusstlosigkeit zum Ictus möglich. Tiefes Koma bei massiver SAB. Die Bewusstseinslage bei Aufnahme ist ein wichtiger Prognosefaktor und Teil der klinischen Schweregradeinschätzung (Hunt-und-Hess-Skala).",
          "en": "Brief loss of consciousness at ictus is possible, with deep coma in massive SAH. Level of consciousness at admission is an important prognostic factor and part of clinical severity assessment (Hunt and Hess scale).",
          "fa": "بیهوشی کوتاه هنگام شروع خونریزی و کمای عمیق در خونریزی زیرعنکبوتیهٔ وسیع ممکن است. سطح هوشیاری هنگام پذیرش عامل مهم پیش‌آگهی و بخشی از ارزیابی شدت بالینی است (مقیاس هانت و هس)."
        }
      }
    ],
    "aetiologyHeaders": [
      {
        "de": "Ursache",
        "en": "Cause",
        "fa": "علت"
      },
      {
        "de": "Muster",
        "en": "Pattern",
        "fa": "الگو"
      },
      {
        "de": "Merkmale",
        "en": "Features",
        "fa": "ویژگی‌ها"
      }
    ],
    "aetiologyRows": [
      [
        {
          "de": "Aneurysmaruptur",
          "en": "Aneurysm rupture",
          "fa": "پارگی آنوریسم"
        },
        {
          "de": "häufige Ursache",
          "en": "common cause",
          "fa": "علت شایع"
        },
        {
          "de": "Sakkuläre Aneurysmen liegen häufig an Gefäßgabelungen; die Blutverteilung lenkt die Suche, beweist den Ursprung aber nicht.",
          "en": "Saccular aneurysms often arise at arterial branch points; blood distribution guides the search but does not prove the source.",
          "fa": "آنوریسم‌های ساکولار اغلب در محل انشعاب عروق رخ می‌دهند؛ توزیع خون جهت بررسی را مشخص می‌کند، اما منشأ را ثابت نمی‌کند."
        }
      ],
      [
        {
          "de": "Perimesenzephale SAB",
          "en": "Perimesencephalic SAH",
          "fa": "SAB پری‌مزنسفالیک"
        },
        {
          "de": "typisches Verteilungsmuster",
          "en": "typical distribution pattern",
          "fa": "الگوی توزیع تیپیک"
        },
        {
          "de": "Blut um das Mittelhirn ohne typische diffuse Sylvische oder interhemisphärische Ausbreitung; die Ursache muss dennoch abgeklärt werden.",
          "en": "Blood centred around the midbrain without typical diffuse Sylvian or interhemispheric extension; the source still requires evaluation.",
          "fa": "خون پیرامون مغز میانی بدون گسترش منتشر تیپیک به شکاف سیلویوس یا بین‌نیمکره‌ای؛ با این حال منشأ باید بررسی شود."
        }
      ],
      [
        {
          "de": "Traumatisch",
          "en": "Traumatic",
          "fa": "تروماتیک"
        },
        {
          "de": "traumatisches Muster",
          "en": "traumatic pattern",
          "fa": "الگوی تروماتیک"
        },
        {
          "de": "Konvexitäres (sulkales) Blut, oft unilateral – häufigste SAB-Ursache insgesamt wenn Trauma eingerechnet",
          "en": "Convexal (sulcal) blood, often unilateral — most common cause of SAH overall when trauma is included",
          "fa": "خون کانوکسیتال (سولکال)، اغلب یکطرفه — شایع‌ترین علت کلی SAB با احتساب تروما"
        }
      ],
      [
        {
          "de": "Kortikale SAB (cSAH)",
          "en": "Cortical SAH (cSAH)",
          "fa": "SAB کورتیکال"
        },
        {
          "de": "Selten",
          "en": "Rare",
          "fa": "نادر"
        },
        {
          "de": "Bei zerebraler Amyloidangiopathie (CAA), reversibler Vasokonstriktionssyndrom (RCVS), CVST, Vaskulitis",
          "en": "In cerebral amyloid angiopathy (CAA), reversible cerebral vasoconstriction syndrome (RCVS), CVST, vasculitis",
          "fa": "در آمیلوئید آنژیوپاتی مغزی (CAA)، RCVS، ترومبوز وریدی مغزی، واسکولیت"
        }
      ]
    ],
    "cave": {
      "de": "Ein vorausgehender Warnkopfschmerz kann vorkommen. Sein Fehlen schließt eine SAB nicht aus.",
      "en": "A preceding warning headache may occur. Its absence does not exclude SAH.",
      "fa": "سردرد هشداردهندهٔ پیشین ممکن است رخ دهد؛ نبود آن SAB را رد نمی‌کند."
    },
    "key": {
      "de": "Plötzlich maximal starker Kopfschmerz erfordert eine dringliche Abklärung. Die CT- und Liquorentscheidung richtet sich nach Zeitpunkt, neurologischem Befund, Bildqualität und klinischer Wahrscheinlichkeit.",
      "en": "Sudden severe headache reaching maximal intensity requires urgent evaluation. The CT and CSF pathway depends on timing, neurological findings, image quality and clinical probability.",
      "fa": "سردرد ناگهانی و بسیار شدیدی که به اوج می‌رسد نیازمند بررسی فوری است. مسیر CT و بررسی CSF به زمان، یافته‌های عصبی، کیفیت تصویر و احتمال بالینی بستگی دارد."
    }
  },
  "ct": {
    "title": {
      "de": "CT-Diagnostik",
      "en": "CT diagnosis",
      "fa": "تشخیص CT"
    },
    "lead": {
      "de": "Das native CT (ohne Kontrastmittel) ist der erste und wichtigste Schritt bei Verdacht auf SAB. Frisches Blut erscheint hyperdens in den Subarachnoidalräumen und basalen Zisternen.",
      "en": "Non-contrast CT is the first and most important step when SAH is suspected. Fresh blood appears hyperattenuating in the subarachnoid spaces and basal cisterns.",
      "fa": "CT بدون کنتراست اولین و مهم‌ترین قدم در مظنون به SAB است. خون تازه در فضاهای زیر عنکبوتیه و سیسترن‌های قاعده‌ای هایپردنس دیده می‌شود."
    },
    "stagesHeaders": [
      {
        "de": "Zeitfenster",
        "en": "Time window",
        "fa": "پنجره زمانی"
      },
      {
        "de": "Diagnostischer Kontext",
        "en": "Diagnostic context",
        "fa": "زمینه تشخیصی"
      },
      {
        "de": "Empfehlung",
        "en": "Recommendation",
        "fa": "توصیه"
      }
    ],
    "stagesRows": [
      [
        {
          "de": "Weniger als 6 Stunden",
          "en": "Less than 6 hours",
          "fa": "کمتر از ۶ ساعت"
        },
        {
          "de": "Hohe diagnostische Aussagekraft unter definierten Bedingungen",
          "en": "High diagnostic performance under defined conditions",
          "fa": "دقت تشخیصی بالا در شرایط مشخص"
        },
        {
          "de": "Bei akutem schwerem Kopfschmerz ohne neues Defizit ist ein hochwertiges, neuroradiologisch fachärztlich befundetes CT bei <6 h ein vertretbarer Ausschlussweg. Der Diagnosealgorithmus in Abbildung 2 der AHA/ASA-Leitlinie ordnet bereits ≥6 h dem weiteren Abklärungspfad mit LP nach negativem CT zu.",
          "en": "For acute severe headache without a new deficit, high-quality CT read by a board-certified neuroradiologist at <6 hours is a reasonable rule-out pathway. Figure 2 of the AHA/ASA guideline places patients at ≥6 hours in the further-work-up pathway with LP after negative CT.",
          "fa": "در سردرد حاد شدید بدون نقص جدید، CT باکیفیت با تفسیر نورورادیولوژیست دارای بورد در کمتر از ۶ ساعت مسیر قابل‌قبولی برای رد بیماری است. الگوریتم تشخیصی شکل ۲ راهنمای AHA/ASA، از ۶ ساعت به بعد را در مسیر بررسی بیشتر با LP پس از CT منفی قرار می‌دهد."
        }
      ],
      [
        {
          "de": "Ab 6 Stunden oder neues Defizit",
          "en": "At 6 hours or later, or a new deficit",
          "fa": "از ۶ ساعت به بعد یا نقص عصبی جدید"
        },
        {
          "de": "Die Aussagekraft nimmt mit der Zeit ab",
          "en": "Diagnostic performance declines over time",
          "fa": "دقت تشخیصی با گذشت زمان کاهش می‌یابد"
        },
        {
          "de": "Nach dem Diagnosealgorithmus der AHA/ASA 2023 (Abb. 2) folgt bei ≥6 h seit Beginn oder neuem neurologischem Defizit auf ein negatives CT eine LP zur weiteren Abklärung; klinische Voraussetzungen und lokale Durchführung beachten.",
          "en": "Under the AHA/ASA 2023 diagnostic algorithm (Figure 2), a negative CT at ≥6 hours after onset or with a new neurological deficit is followed by LP for further evaluation; consider clinical prerequisites and local procedures.",
          "fa": "طبق الگوریتم تشخیصی AHA/ASA 2023 (شکل ۲)، در۶ ساعت یا بیشتر از شروع یا در صورت نقص عصبی جدید، پس از CT منفی برای بررسی بیشتر LP انجام می‌شود؛ پیش‌شرط‌های بالینی و روش اجرای محلی لحاظ شوند."
        }
      ]
    ],
    "signItems": [
      {
        "icon": "🔺",
        "title": {
          "de": "Hyperdens in basalen Zisternen",
          "en": "Hyperdense basal cisterns",
          "fa": "هایپردنس در سیسترن‌های قاعده‌ای"
        },
        "text": {
          "de": "Blut füllt Cisterna ambiens, interpeduncularis und suprasellar. Sternförmiges Muster bei massiver aneurysmatischer SAB.",
          "en": "Blood fills the ambient, interpeduncular and suprasellar cisterns. Star-shaped pattern in massive aneurysmal SAH.",
          "fa": "خون سیسترن آمبینس، اینترپدونکولار و سوپراسلار را پر می‌کند. الگوی ستاره‌ای در SAB آنوریسمی ماسیو."
        }
      },
      {
        "icon": "🌿",
        "title": {
          "de": "Sulkale/Konvexitäre Ausfüllung",
          "en": "Sulcal / convexal filling",
          "fa": "پر شدن سولکوس‌ها"
        },
        "text": {
          "de": "Bei traumatischer oder kortikaler SAB Blut in kortikalen Sulci – oft unilateral. Unterschied zur aneurysmatischen SAB durch Blutverteilung und Klinik.",
          "en": "In traumatic or cortical SAH, blood in cortical sulci — often unilateral. Distinguished from aneurysmal SAH by blood distribution and clinical picture.",
          "fa": "در SAB تروماتیک یا کورتیکال، خون در سولکوس‌های قشری — اغلب یکطرفه. تمایز از SAB آنوریسمی با توزیع خون و تصویر بالینی."
        }
      },
      {
        "icon": "🔸",
        "title": {
          "de": "Perimesenzephale Verteilung",
          "en": "Perimesencephalic distribution",
          "fa": "توزیع پری‌مزنسفالیک"
        },
        "text": {
          "de": "Eine perimesenzephale Verteilung kann auf eine nichtaneurysmatische Ursache hinweisen. Das Muster allein beweist diese Ursache jedoch nicht.",
          "en": "A perimesencephalic distribution may suggest a non-aneurysmal cause, but the pattern alone does not prove the source.",
          "fa": "توزیع پری‌مزنسفالیک می‌تواند به علت غیرآنوریسمی اشاره کند، اما الگو به‌تنهایی منشأ را ثابت نمی‌کند."
        }
      },
      {
        "icon": "🧊",
        "title": {
          "de": "MRT-FLAIR als ergänzende Sequenz",
          "en": "MRI FLAIR as an adjunct sequence",
          "fa": "سکانس تکمیلی MRI-FLAIR"
        },
        "text": {
          "de": "FLAIR kann hyperintenses Signal in den Subarachnoidalräumen zeigen, ist aber störanfällig und ersetzt bei akuter Fragestellung nicht den diagnostischen CT-/Liquorpfad. Sauerstoffgabe und Meningitis können falsch-positive Signale verursachen.",
          "en": "FLAIR may show hyperintense signal in the subarachnoid spaces, but is susceptible to confounders and does not replace the CT/CSF pathway in acute evaluation. Supplemental oxygen and meningitis can cause false-positive signal.",
          "fa": "FLAIR ممکن است سیگنال هایپراینتنس در فضاهای زیرعنکبوتیه نشان دهد، اما مستعد عوامل مخدوش‌کننده است و در ارزیابی حاد جایگزین مسیر CT/CSF نیست. اکسیژن مکمل و مننژیت می‌توانند سیگنال مثبت کاذب ایجاد کنند."
        }
      }
    ],
    "key": {
      "de": "Ein negatives CT schließt eine SAB nicht unter allen Bedingungen aus. Bei Vorstellung 6 Stunden oder mehr nach Beginn oder bei neuem neurologischem Defizit empfiehlt die AHA/ASA-Leitlinie nach negativem CT eine Lumbalpunktion mit Liquoranalyse; lokale Präanalytik beachten.",
      "en": "A negative CT does not exclude SAH in every setting. For presentation 6 hours or later after onset or with a new neurological deficit, the AHA/ASA guideline recommends lumbar puncture with CSF analysis after a negative CT; follow local laboratory protocols.",
      "fa": "CT منفی در همه شرایط SAB را رد نمی‌کند. در مراجعه ۶ ساعت یا بیشتر پس از شروع یا وجود نقص عصبی جدید، راهنمای AHA/ASA پس از CT منفی پونکسیون کمری همراه با آنالیز CSF را توصیه می‌کند؛ پروتکل آزمایشگاه محلی باید رعایت شود."
    }
  },
  "fisher": {
    "title": {
      "de": "Modifizierte Fisher-Skala",
      "en": "Modified Fisher Scale",
      "fa": "مقیاس فیشر اصلاح‌شده"
    },
    "lead": {
      "de": "Die Modifizierte Fisher-Skala ordnet CT-Blutlast anhand von dünnem/dickem Subarachnoidalblut und IVH ein. Claassen 2001 lieferte die Grundlage; Frontera 2006 prüfte die 0–4-Skala für symptomatischen Vasospasmus. Die PDF-Tabelle zeigt dagegen die ursprüngliche Fisher-Skala I–IV.",
      "en": "The modified Fisher scale classifies CT blood burden using thin/thick subarachnoid blood and IVH. Claassen 2001 provided the basis; Frontera 2006 evaluated the 0–4 scale for symptomatic vasospasm. The PDF table instead shows the original Fisher I–IV scale.",
      "fa": "مقیاس فیشر اصلاح‌شده بار خون CT را بر پایهٔ خون زیرعنکبوتیهٔ نازک/ضخیم و IVH طبقه‌بندی می‌کند. Claassen 2001 مبنا را فراهم کرد؛ Frontera 2006 مقیاس ۰–۴ را برای وازواسپاسم علامت‌دار بررسی کرد. جدول PDF در مقابل، مقیاس اصلی فیشر I–IV را نشان می‌دهد."
    },
    "tableHeaders": [
      {
        "de": "Grad",
        "en": "Grade",
        "fa": "درجه"
      },
      {
        "de": "Blut-Dicke",
        "en": "Blood thickness",
        "fa": "ضخامت خون"
      },
      {
        "de": "IVH",
        "en": "IVH",
        "fa": "IVH"
      },
      {
        "de": "Einordnung",
        "en": "Interpretation",
        "fa": "تفسیر"
      },
      {
        "de": "CT-Befund",
        "en": "CT appearance",
        "fa": "یافته CT"
      }
    ],
    "tableRows": [
      [
        "0",
        {
          "de": "Kein sichtbares SAB-Blut",
          "en": "No visible SAH blood",
          "fa": "بدون خون زیرعنکبوتیهٔ قابل مشاهده"
        },
        {
          "de": "Nein",
          "en": "No",
          "fa": "خیر"
        },
        {
          "de": "kein Blut",
          "en": "no visible blood",
          "fa": "بدون خون قابل مشاهده"
        },
        {
          "de": "Normale Zisternen, kein Blut nachweisbar",
          "en": "Normal cisterns, no detectable blood",
          "fa": "سیسترن‌های طبیعی، بدون خون قابل تشخیص"
        }
      ],
      [
        "1",
        {
          "de": "Dünn",
          "en": "Thin",
          "fa": "نازک"
        },
        {
          "de": "Nein",
          "en": "No",
          "fa": "خیر"
        },
        {
          "de": "niedriger",
          "en": "lower",
          "fa": "کمتر"
        },
        {
          "de": "Dünne Blutschicht in Zisternen, kein Ventrikelblut",
          "en": "Thin blood layer in cisterns, no ventricular blood",
          "fa": "لایه نازک خون در سیسترن‌ها، بدون خون در بطن‌ها"
        }
      ],
      [
        "2",
        {
          "de": "Dünn",
          "en": "Thin",
          "fa": "نازک"
        },
        {
          "de": "Ja ✓",
          "en": "Yes ✓",
          "fa": "بله ✓"
        },
        {
          "de": "erhöht",
          "en": "elevated",
          "fa": "افزایش‌یافته"
        },
        {
          "de": "Dünnes Subarachnoidalblut mit IVH",
          "en": "Thin subarachnoid blood with IVH",
          "fa": "خون زیرعنکبوتیهٔ نازک همراه IVH"
        }
      ],
      [
        "3",
        {
          "de": "Dick",
          "en": "Thick",
          "fa": "ضخیم"
        },
        {
          "de": "Nein",
          "en": "No",
          "fa": "خیر"
        },
        {
          "de": "erhöht",
          "en": "elevated",
          "fa": "افزایش‌یافته"
        },
        {
          "de": "Dicke Blutansammlung / Zisternenverfüllung, kein IVH",
          "en": "Thick blood collection / cistern filling, no IVH",
          "fa": "تجمع خون ضخیم / پر شدن سیسترن، بدون IVH"
        }
      ],
      [
        "4",
        {
          "de": "Dick",
          "en": "Thick",
          "fa": "ضخیم"
        },
        {
          "de": "Ja ✓",
          "en": "Yes ✓",
          "fa": "بله ✓"
        },
        {
          "de": "höchster Grad der Skala",
          "en": "highest grade on the scale",
          "fa": "بالاترین درجهٔ مقیاس"
        },
        {
          "de": "Dickes Subarachnoidalblut mit IVH",
          "en": "Thick subarachnoid blood with IVH",
          "fa": "خون زیرعنکبوتیهٔ ضخیم همراه IVH"
        }
      ]
    ],
    "comparisonTitle": {
      "de": "Original vs. Modifizierte Fisher-Skala",
      "en": "Original vs. Modified Fisher Scale",
      "fa": "مقیاس فیشر اصلی در مقابل اصلاح‌شده"
    },
    "comparisonItems": [
      {
        "icon": "📋",
        "title": {
          "de": "Original Fisher-Skala (1980)",
          "en": "Original Fisher Scale (1980)",
          "fa": "مقیاس فیشر اصلی (۱۹۸۰)"
        },
        "text": {
          "de": "Die PDF zeigt die ursprünglichen Grade I–IV. Ihre Zahlen sind nicht mit Modified-Fisher 0–4 austauschbar; die ursprüngliche Skala bildet Blutdicke und IVH nicht als dieselbe getrennte Kombination ab.",
          "en": "The PDF shows the original grades I–IV. Their numbers are not interchangeable with modified Fisher 0–4; the original scale does not encode blood thickness and IVH using the same separate combination.",
          "fa": "PDF درجات اصلی I–IV را نشان می‌دهد. اعداد آن با فیشر اصلاح‌شدهٔ ۰–۴ قابل جایگزینی نیستند؛ مقیاس اصلی ضخامت خون و IVH را با همین ترکیب جداگانه ثبت نمی‌کند."
        }
      },
      {
        "icon": "✅",
        "title": {
          "de": "Modifiziert: Grundlage 2001, Prüfung 2006",
          "en": "Modified: basis 2001, evaluation 2006",
          "fa": "اصلاح‌شده: مبنا ۲۰۰۱، بررسی ۲۰۰۶"
        },
        "text": {
          "de": "Die 0–4-Skala kombiniert Blutdicke und IVH. Frontera 2006 untersuchte symptomatischen Vasospasmus in ausgewählten Studienkohorten; Grad 2 und 3 hatten ähnliche rohe Odds Ratios, keine festen individuellen Prozentwerte.",
          "en": "The 0–4 scale combines blood thickness and IVH. Frontera 2006 studied symptomatic vasospasm in selected trial cohorts; grades 2 and 3 had similar crude odds ratios, not fixed individual percentage risks.",
          "fa": "مقیاس ۰–۴ ضخامت خون و IVH را ترکیب می‌کند. Frontera 2006 وازواسپاسم علامت‌دار را در جمعیت‌های منتخب کارآزمایی بررسی کرد؛ درجات ۲ و ۳ نسبت شانس خام مشابه داشتند، نه درصد خطر ثابت فردی."
        }
      },
      {
        "icon": "⚡",
        "title": {
          "de": "Klinische Konsequenz",
          "en": "Clinical consequence",
          "fa": "پیامد بالینی"
        },
        "text": {
          "de": "Die modifizierte Skala berücksichtigt die Kombination aus Blutdicke und IVH. Sie unterstützt die Risikoeinordnung, ersetzt aber keine klinische Überwachung.",
          "en": "The modified scale accounts for the combination of blood thickness and IVH. It supports risk stratification but does not replace clinical monitoring.",
          "fa": "مقیاس اصلاح‌شده ترکیب ضخامت خون و IVH را در نظر می‌گیرد. این مقیاس به رده‌بندی خطر کمک می‌کند اما جای پایش بالینی را نمی‌گیرد."
        }
      }
    ],
    "cave": {
      "de": "Frontera 2006 ordnet auch IVH ohne sichtbares Subarachnoidalblut Grad 2 zu. Die Kategorien sind keine individuellen Wahrscheinlichkeiten. Die qualitative modifizierte Einteilung und die Kriterien der Original-Fisher-Skala nicht vermischen; Klinik und Verlauf bleiben maßgeblich.",
      "en": "Frontera 2006 also assigns IVH without visible subarachnoid blood to grade 2. Categories are not individual probabilities. Do not mix the qualitative modified classification with the original Fisher criteria; clinical findings and course remain essential.",
      "fa": "Frontera 2006، IVH بدون خون زیرعنکبوتیهٔ قابل مشاهده را نیز درجهٔ ۲ طبقه‌بندی می‌کند. رده‌ها احتمال فردی نیستند. طبقه‌بندی کیفی اصلاح‌شده با معیارهای اصلی فیشر مخلوط نشود؛ وضعیت و سیر بالینی همچنان تعیین‌کننده‌اند."
    },
    "key": {
      "de": "Dünnes oder dickes Blut plus IVH ja/nein ergeben Modified-Fisher 0–4. Grad 4 kombiniert dickes Blut und IVH. Dies ist eine Risikoeinordnung, keine individuelle Prognose oder harte Millimeter-Grenzfallentscheidung.",
      "en": "Thin or thick blood plus presence/absence of IVH determines modified Fisher 0–4. Grade 4 combines thick blood and IVH. This supports risk stratification, not an individual prognosis or a borderline millimetre decision.",
      "fa": "خون نازک یا ضخیم همراه وجود/نبود IVH درجات ۰–۴ فیشر اصلاح‌شده را تعیین می‌کند. درجهٔ ۴ ترکیب خون ضخیم و IVH است. این رده‌بندی خطر است، نه پیش‌بینی فردی یا تصمیم‌گیری در مرز میلی‌متری."
    }
  },
  "gefaesse": {
    "title": {
      "de": "Gefäßdarstellung",
      "en": "Vascular imaging",
      "fa": "تصویربرداری عروقی"
    },
    "lead": {
      "de": "Sobald eine SAB auf dem CT gesichert ist, muss die Ursache identifiziert werden. CT-Angiographie ist der schnelle erste Schritt. Die digitale Subtraktionsangiographie (DSA) ist der Goldstandard.",
      "en": "Once SAH is confirmed on CT, the source must be identified. CT angiography is the fast first step. Digital subtraction angiography (DSA) is the gold standard.",
      "fa": "پس از تأیید SAB در CT، باید منشأ را شناسایی کرد. CT آنژیوگرافی قدم اول سریع است. آنژیوگرافی تفریقی دیجیتال (DSA) استاندارد طلایی است."
    },
    "imagingItems": [
      {
        "icon": "🔭",
        "title": {
          "de": "CT-Angiographie (CTA)",
          "en": "CT angiography (CTA)",
          "fa": "CT آنژیوگرافی (CTA)"
        },
        "text": {
          "de": "CTA sucht rasch nach der vaskulären Blutungsquelle; kleine Läsionen können übersehen werden. Vorderes interhemisphärisches Blut lenkt die Suche besonders auf ACA/ACoA, beweist den Ursprung aber nicht. Die vollständige Gefäßauswertung bleibt nötig.",
          "en": "CTA rapidly evaluates the vascular bleeding source; small lesions may be missed. Anterior interhemispheric blood particularly directs attention to ACA/ACoA but does not prove the source. Complete vascular review remains necessary.",
          "fa": "CTA منشأ عروقی خونریزی را سریع بررسی می‌کند؛ ضایعات کوچک ممکن است دیده نشوند. خون بین‌نیمکره‌ای قدامی توجه را به‌ویژه به ACA/ACoA جلب می‌کند، اما منشأ را ثابت نمی‌کند. بررسی کامل عروق همچنان لازم است."
        }
      },
      {
        "icon": "🎯",
        "title": {
          "de": "DSA (Goldstandard)",
          "en": "DSA (gold standard)",
          "fa": "DSA (استاندارد طلایی)"
        },
        "text": {
          "de": "Invasiv, aber ermöglicht gleichzeitig interventionelle Therapie (endovaskuläres Coiling). Bei spontaner SAB und hoher aneurysmatischer Wahrscheinlichkeit ist DSA auch nach negativer oder unklarer CTA indiziert.",
          "en": "Invasive, but enables simultaneous intervention (endovascular coiling). In spontaneous SAH with high concern for an aneurysm, DSA is indicated even after a negative or inconclusive CTA.",
          "fa": "تهاجمی است، اما هم‌زمان امکان درمان مداخله‌ای (کویلینگ داخل عروقی) را فراهم می‌کند. در SAB خودبه‌خودی با احتمال بالای آنوریسم، حتی پس از CTA منفی یا نامشخص، DSA اندیکاسیون دارد."
        }
      },
      {
        "icon": "🧲",
        "title": {
          "de": "MR-Angiographie (MRA)",
          "en": "MR angiography (MRA)",
          "fa": "MR آنژیوگرافی (MRA)"
        },
        "text": {
          "de": "TOF-MRA kann zur Verlaufskontrolle behandelter Aneurysmen beitragen. Für die Akutdiagnostik einer Blutungsquelle ist sie kein Ersatz für die leitliniengerechte CTA/DSA-Abklärung.",
          "en": "TOF-MRA may contribute to follow-up of treated aneurysms. It does not replace guideline-directed CTA/DSA evaluation of an acute bleeding source.",
          "fa": "TOF-MRA می‌تواند در پیگیری آنوریسم‌های درمان‌شده کمک‌کننده باشد. برای بررسی حاد منشأ خونریزی جایگزین ارزیابی CTA/DSA طبق راهنما نیست."
        }
      },
      {
        "icon": "🔊",
        "title": {
          "de": "TCD-Monitoring (Vasospasmus)",
          "en": "TCD monitoring (vasospasm)",
          "fa": "مانیتورینگ TCD (وازواسپاسم)"
        },
        "text": {
          "de": "TCD kann im klinischen Kontext zur Erkennung eines Vasospasmus beitragen. Zeitpunkt und Frequenz der Untersuchungen richten sich nach Verlauf und lokalem neurointensivmedizinischem Protokoll.",
          "en": "TCD can help detect vasospasm in the clinical context. Timing and frequency of examinations depend on the course and local neurocritical-care protocol.",
          "fa": "TCD می‌تواند در زمینه بالینی به تشخیص وازواسپاسم کمک کند. زمان و تناوب بررسی‌ها به سیر بیمار و پروتکل مراقبت ویژه عصبی محلی بستگی دارد."
        }
      }
    ],
    "key": {
      "de": "Bei diffuser SAB und hoher aneurysmatischer Wahrscheinlichkeit kann trotz negativer oder unklarer CTA eine DSA erforderlich sein. Für eine typische perimesenzephale Verteilung ist der Weg CTA allein versus DSA laut AHA/ASA nicht abschließend geklärt.",
      "en": "With diffuse SAH and strong concern for an aneurysm, DSA may be indicated despite negative or inconclusive CTA. For a typical perimesencephalic pattern, AHA/ASA notes that the choice between CTA alone and DSA is not settled.",
      "fa": "در SAB منتشر و احتمال بالای آنوریسم، با وجود CTA منفی یا نامشخص ممکن است DSA لازم باشد. برای الگوی تیپیک پری‌مزنسفالیک، طبق AHA/ASA انتخاب بین CTA تنها و DSA هنوز قطعی نشده است."
    }
  },
  "komplikationen": {
    "title": {
      "de": "Komplikationen",
      "en": "Complications",
      "fa": "عوارض"
    },
    "lead": {
      "de": "Die SAB ist nicht nur ein einmaliges Ereignis – Komplikationen in den ersten Tagen bis Wochen bestimmen Morbidität und Mortalität wesentlich.",
      "en": "SAH is not just a one-time event — complications in the first days to weeks largely determine morbidity and mortality.",
      "fa": "SAB یک رویداد یک‌باره نیست — عوارض در روزها تا هفته‌های اول تا حد زیادی تعیین‌کننده عوارض و مرگ‌ومیر است."
    },
    "compItems": [
      {
        "icon": "💥",
        "title": {
          "de": "Rezidivblutung (früh)",
          "en": "Rebleeding (early)",
          "fa": "خونریزی مجدد (زود)"
        },
        "text": {
          "de": "Das Reblutungsrisiko ist früh besonders relevant. Eine neue Blutung oder Zunahme des Blutvolumens in der Kontrollbildgebung muss dringend kommuniziert werden. Bei rupturiertem Aneurysma wird die zügige Abklärung und Behandlung durch ein erfahrenes Team empfohlen, vorzugsweise innerhalb von 24 Stunden nach Blutungsbeginn.",
          "en": "Rebleeding is an important early risk. New haemorrhage or increased blood volume on follow-up imaging requires urgent communication. For a ruptured aneurysm, prompt evaluation and treatment by an experienced team is recommended, preferably within 24 hours of onset.",
          "fa": "خونریزی مجدد در ساعات اولیه اهمیت ویژه دارد. خونریزی جدید یا افزایش حجم خون در تصویربرداری پیگیری باید فوری گزارش شود. برای آنوریسم پاره‌شده، بررسی و درمان سریع توسط تیم باتجربه، ترجیحاً ظرف ۲۴ ساعت از شروع خونریزی، توصیه می‌شود."
        }
      },
      {
        "icon": "🫀",
        "title": {
          "de": "Vasospasmus und DCI unterscheiden",
          "en": "Distinguish vasospasm from DCI",
          "fa": "وازواسپاسم و DCI را تفکیک کنید"
        },
        "text": {
          "de": "DCI tritt meist an Tag 4–14 auf. Neue fokale Defizite oder ein GCS-Abfall um ≥2 Punkte über mindestens 1 Stunde nach Ausschluss anderer Ursachen sind verdächtig; die Störung darf nicht unmittelbar nach Aneurysmaausschaltung bestehen. Kein ausgeprägter proximaler CTA-Spasmus schließt DCI nicht aus. Frühes enterales Nimodipin dient der DCI-Prävention und besseren funktionellen Ergebnissen.",
          "en": "DCI occurs mostly on days 4–14. New focal deficits or a ≥2-point GCS fall lasting at least 1 hour after excluding other causes are concerning; the deterioration must not be present immediately after aneurysm occlusion. Absence of marked proximal CTA spasm does not exclude DCI. Early enteral nimodipine reduces DCI risk and improves functional outcomes.",
          "fa": "DCI بیشتر در روزهای ۴–۱۴ رخ می‌دهد. نقص کانونی جدید یا افت ≥۲ امتیاز GCS به‌مدت حداقل ۱ ساعت پس از کنارگذاشتن علل دیگر مطرح‌کننده است؛ بدترشدن نباید بلافاصله پس از انسداد آنوریسم وجود داشته باشد. نبود اسپاسم واضح پروگزیمال در CTA، DCI را رد نمی‌کند. نیمودیپین انتروال زودهنگام برای پیشگیری از DCI و بهبود پیامد عملکردی است."
        }
      },
      {
        "icon": "💧",
        "title": {
          "de": "Hydrozephalus",
          "en": "Hydrocephalus",
          "fa": "هیدروسفالی"
        },
        "text": {
          "de": "Ein akuter obstruktiver Hydrozephalus kann früh, oft bei IVH, auftreten. Ein chronisch kommunizierender Hydrozephalus kann Wochen später durch gestörte Liquorresorption entstehen. Je nach Befund kann akut eine EVD und bei persistierendem Verlauf ein VP-Shunt erforderlich sein.",
          "en": "Acute obstructive hydrocephalus can occur early, often with IVH. Chronic communicating hydrocephalus can develop weeks later from impaired CSF resorption. Depending on findings, acute EVD or a VP shunt for a persistent course may be required.",
          "fa": "هیدروسفالی انسدادی حاد ممکن است زودهنگام، اغلب همراه با IVH، رخ دهد. هیدروسفالی ارتباطی مزمن ممکن است چند هفته بعد به‌علت اختلال جذب CSF ایجاد شود. بسته به یافته‌ها، ممکن است در مرحله حاد درناژ بطنی خارجی (EVD) یا در صورت تداوم، شانت VP لازم باشد."
        }
      },
      {
        "icon": "❤️",
        "title": {
          "de": "Neurogene Herz- und Lungenschäden",
          "en": "Neurogenic cardiac and pulmonary injury",
          "fa": "آسیب قلبی-ریوی نوروژنیک"
        },
        "text": {
          "de": "Katecholaminsturm bei massiver SAB → Takotsubo-Kardiomyopathie, Arrhythmien, QT-Verlängerung. Neurogenes Lungenödem möglich. EKG und Troponin bei Aufnahme und im Verlauf kontrollieren.",
          "en": "Catecholamine surge in massive SAH → Takotsubo cardiomyopathy, arrhythmias, QT prolongation. Neurogenic pulmonary oedema possible. Monitor ECG and troponin on admission and serially.",
          "fa": "در SAB شدید، افزایش کاتکولامین‌ها می‌تواند باعث کاردیومیوپاتی تاکوتسوبو، آریتمی و طولانی‌شدن QT شود. ادم ریوی نوروژنیک نیز ممکن است رخ دهد. ECG و تروپونین را هنگام پذیرش و به‌صورت سریال پایش کنید."
        }
      }
    ],
    "cave": {
      "de": "Elektrolytstörungen können den Verlauf komplizieren; Beurteilung und Behandlung richten sich nach Gesamtzustand und neurointensivmedizinischem Protokoll. Prophylaktische Hypervolämie oder hämodynamische Augmentation wird nicht empfohlen.",
      "en": "Electrolyte disorders may complicate the course; assess and treat according to the overall condition and neurocritical-care protocol. Prophylactic hypervolaemia or haemodynamic augmentation is not recommended.",
      "fa": "اختلالات الکترولیتی می‌توانند سیر را پیچیده کنند؛ ارزیابی و درمان بر پایهٔ وضعیت کلی و پروتکل مراقبت ویژهٔ عصبی انجام می‌شود. افزایش پیشگیرانهٔ حجم یا تقویت همودینامیک توصیه نمی‌شود."
    },
    "key": {
      "de": "Reblutung ist früh besonders kritisch; DCI tritt meist später auf und ist nicht gleich Vasospasmus. Bei jeder neuen Verschlechterung auch Hydrozephalus, Reblutung, Anfälle und metabolische Ursachen prüfen; starre Tagesgrenzen ersetzen keine Abklärung.",
      "en": "Rebleeding is particularly critical early; DCI usually occurs later and is not synonymous with vasospasm. With any new deterioration, also assess hydrocephalus, rebleeding, seizures and metabolic causes; fixed day cutoffs do not replace evaluation.",
      "fa": "خونریزی مجدد در مرحلهٔ زودرس اهمیت ویژه دارد؛ DCI معمولاً دیرتر رخ می‌دهد و معادل وازواسپاسم نیست. در هر بدترشدن جدید، هیدروسفالی، خونریزی مجدد، تشنج و علل متابولیک نیز بررسی شوند؛ مرز روزهای ثابت جای بررسی را نمی‌گیرد."
    }
  },
  "takehome": {
    "title": {
      "de": "Take home messages",
      "en": "Take-home messages",
      "fa": "نکات کلیدی"
    },
    "lead": {
      "de": "Das Wichtigste auf einen Blick.",
      "en": "The key points at a glance.",
      "fa": "نکات مهم در یک نگاه."
    },
    "items": [
      {
        "title": {
          "de": "Vernichtungskopfschmerz = sofort CT",
          "en": "Thunderclap headache = immediate CT",
          "fa": "سردرد رعدآسا = CT فوری"
        },
        "text": {
          "de": "Plötzlich maximaler Kopfschmerz ist ein Warnmuster und muss dringlich abgeklärt werden; er ist nicht spezifisch für SAB.",
          "en": "A sudden maximal headache is a warning pattern requiring urgent evaluation; it is not specific to SAH.",
          "fa": "سردرد ناگهانی و شدید یک الگوی هشداردهنده است و باید فوری بررسی شود؛ اما اختصاصی SAB نیست."
        }
      },
      {
        "title": {
          "de": "CT-Sensitivität kennen",
          "en": "Know CT sensitivity",
          "fa": "حساسیت CT را بدانید"
        },
        "text": {
          "de": "Bei akutem schwerem Kopfschmerz und negativem CT hängt der nächste Schritt von Zeitpunkt, neurologischem Befund und CT-Qualität ab; ein negatives CT ist kein universeller Ausschluss.",
          "en": "With acute severe headache and a negative CT, the next step depends on timing, neurological findings and CT quality; a negative CT is not a universal rule-out.",
          "fa": "در سردرد حاد و شدید با CT منفی، گام بعدی به زمان، یافته‌های عصبی و کیفیت CT وابسته است؛ CT منفی برای همه شرایط ردکننده نیست."
        }
      },
      {
        "title": {
          "de": "Fisher-Grad bestimmen",
          "en": "Determine Fisher grade",
          "fa": "درجه فیشر را تعیین کنید"
        },
        "text": {
          "de": "Modified Fisher: dünnes/dickes Blut + IVH ja/nein → Grad 0–4. Die Originalskala I–IV ist anders aufgebaut. Grad 4 ist dick+IVH; kein Ersatz für klinische Überwachung.",
          "en": "Modified Fisher: thin/thick blood + IVH present/absent → grades 0–4. The original I–IV scale is structured differently. Grade 4 is thick+IVH; clinical monitoring remains necessary.",
          "fa": "فیشر اصلاح‌شده: خون نازک/ضخیم + وجود/نبود IVH ← درجات ۰–۴. مقیاس اصلی I–IV ساختار متفاوتی دارد. درجهٔ ۴ خون ضخیم+IVH است؛ پایش بالینی همچنان لازم است."
        }
      },
      {
        "title": {
          "de": "CTA sofort, dann Aneurysmaausschluss",
          "en": "CTA immediately, then exclude aneurysm",
          "fa": "CTA فوری، سپس رد آنوریسم"
        },
        "text": {
          "de": "Die CTA kann kleine oder schwer erkennbare Läsionen übersehen. Bei diffuser Blutung und hoher aneurysmatischer Wahrscheinlichkeit kann DSA trotz negativer CTA angezeigt sein; für perimesenzephale SAB ist der optimale Weg nicht abschließend geklärt.",
          "en": "CTA may miss small or difficult-to-visualise lesions. With diffuse haemorrhage and strong concern for an aneurysm, DSA may be indicated despite negative CTA; the optimal pathway for perimesencephalic SAH is not settled.",
          "fa": "CTA ممکن است ضایعات کوچک یا دشوار برای مشاهده را از دست بدهد. در خونریزی منتشر و احتمال بالای آنوریسم، با وجود CTA منفی ممکن است DSA لازم باشد؛ مسیر بهینه برای SAB پری‌مزنسفالیک هنوز قطعی نیست."
        }
      },
      {
        "title": {
          "de": "Komplikationen im Zeitfenster",
          "en": "Complications in their time windows",
          "fa": "عوارض در پنجره‌های زمانی"
        },
        "text": {
          "de": "Reblutung früh besonders relevant; DCI meist Tag 4–14, aber nicht gleich Vasospasmus. Neue Verschlechterung erfordert die Suche auch nach Hydrozephalus, Anfällen und Elektrolytstörungen.",
          "en": "Rebleeding is especially relevant early; DCI occurs mostly on days 4–14 but is not synonymous with vasospasm. New deterioration also requires evaluation for hydrocephalus, seizures and electrolyte disorders.",
          "fa": "خونریزی مجدد در مرحلهٔ زودرس اهمیت ویژه دارد؛ DCI بیشتر در روزهای ۴–۱۴ رخ می‌دهد، اما معادل وازواسپاسم نیست. در بدترشدن جدید، هیدروسفالی، تشنج و اختلالات الکترولیتی نیز باید بررسی شوند."
        }
      }
    ]
  },
  "goals": [
    {
      "de": "Nach negativem CT den weiteren Weg aus Zeitfenster, Neurostatus und CT-Qualität ableiten.",
      "en": "Choose the negative-CT pathway using timing, neurological status and CT quality.",
      "fa": "مسیر پس از CT منفی را بر پایهٔ زمان، وضعیت عصبی و کیفیت CT انتخاب کنید."
    },
    {
      "de": "Modified-Fisher-Grade aus Blutdicke und IVH zuordnen und von der Originalskala unterscheiden.",
      "en": "Assign modified Fisher grades from blood thickness and IVH and distinguish the original scale.",
      "fa": "درجات فیشر اصلاح‌شده را از ضخامت خون و IVH تعیین و از مقیاس اصلی تفکیک کنید."
    },
    {
      "de": "Blutverteilung als Suchhinweis nutzen und die kontextabhängige CTA-/DSA-Abklärung begründen.",
      "en": "Use blood distribution as a search clue and justify context-dependent CTA/DSA work-up.",
      "fa": "توزیع خون را سرنخ جست‌وجو بدانید و بررسی CTA/DSA متناسب با زمینه را توضیح دهید."
    },
    {
      "de": "Verzögerte klinische Verschlechterung auf DCI prüfen, ohne sie mit Vasospasmus gleichzusetzen.",
      "en": "Evaluate delayed clinical deterioration for DCI without equating it with vasospasm.",
      "fa": "بدترشدن بالینی تأخیری را از نظر DCI بررسی کنید، بدون همسان‌دانستن آن با وازواسپاسم."
    }
  ]
}
const SAB_QUESTION_CONTENT = [
  {
    "id": "sab-q1",
    "question": {
      "de": "Textvignette: Ein 48-jähriger Patient hat seit 45 Minuten einen plötzlich maximalen Kopfschmerz ohne neues neurologisches Defizit. Ein hochwertiges Nativ-CT wird neuroradiologisch fachärztlich als negativ beurteilt. Welcher diagnostische Weg ist nach AHA/ASA 2023 vertretbar?",
      "en": "Text vignette: A 48-year-old patient has had a sudden maximal headache for 45 minutes without a new neurological deficit. A high-quality noncontrast CT is read as negative by a board-certified neuroradiologist. Which diagnostic pathway is reasonable under AHA/ASA 2023?",
      "fa": "سناریوی متنی: بیمار ۴۸ ساله از ۴۵ دقیقه قبل سردرد ناگهانی با حداکثر شدت و بدون نقص عصبی جدید دارد. CT بدون کنتراست باکیفیت توسط نورورادیولوژیست دارای بورد منفی گزارش شده است. طبق AHA/ASA 2023 کدام مسیر تشخیصی قابل‌قبول است؟"
    },
    "options": [
      {
        "de": "Den negativen CT-Befund unter diesen definierten Bedingungen zum Ausschluss einer aSAB verwenden",
        "en": "Use the negative CT to exclude aSAH under these defined conditions",
        "fa": "استفاده از CT منفی برای رد aSAB در همین شرایط تعریف‌شده"
      },
      {
        "de": "Vor einem Ausschluss routinemäßig eine zweite Nativ-CT-Untersuchung nach 24 Stunden verlangen",
        "en": "Require a routine second noncontrast CT at 24 hours before exclusion",
        "fa": "الزام CT بدون کنتراست دوم پس از ۲۴ ساعت به‌صورت روتین پیش از رد بیماری"
      },
      {
        "de": "Den negativen CT-Befund erst nach einer zusätzlichen unauffälligen FLAIR-MRT werten",
        "en": "Accept the negative CT only after additional normal FLAIR MRI",
        "fa": "پذیرش CT منفی فقط پس از MRI-FLAIR طبیعی تکمیلی"
      },
      {
        "de": "Für den Ausschluss zunächst eine DSA anstelle der CT-basierten Beurteilung durchführen",
        "en": "Perform DSA first instead of CT-based assessment to exclude haemorrhage",
        "fa": "انجام DSA پیش از رد خونریزی به‌جای ارزیابی مبتنی بر CT"
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Die Empfehlung betrifft akuten schweren Kopfschmerz bei <6 Stunden, ohne neues Defizit und mit hochwertigem, neuroradiologisch fachärztlich befundetem CT. Dies ist kein allgemeiner Entlassungsautomatismus: atypische Präsentation, unzureichende Qualität oder fortbestehende Bedenken erfordern individuelle weitere Abklärung. Nach dem Diagnosealgorithmus (Abb. 2) bei ≥6 Stunden oder neuem Defizit empfiehlt die Leitlinie nach negativem CT eine LP.",
      "en": "The recommendation applies to acute severe headache at <6 hours, without a new deficit, with high-quality CT interpreted by a board-certified neuroradiologist. It is not an automatic discharge rule: atypical presentation, inadequate quality or persistent concern require individualized further evaluation. Under the diagnostic algorithm (Figure 2), at ≥6 hours or with a new deficit, the guideline recommends LP after negative CT.",
      "fa": "توصیه مربوط به سردرد حاد شدید در کمتر از ۶ ساعت، بدون نقص جدید و CT باکیفیت تفسیرشده توسط نورورادیولوژیست دارای بورد است. این قاعده ترخیص خودکار نیست: تظاهر غیرمعمول، کیفیت ناکافی یا نگرانی پایدار به ارزیابی تکمیلی فردی نیاز دارد. در ۶ ساعت یا بیشتر یا نقص جدید، راهنما پس از CT منفی LP را توصیه می‌کند."
    },
    "wrong": {
      "B": {
        "de": "Das Aufschieben der Ausschlussentscheidung bis zu einem Routine-Wiederholungs-CT ist für die beschriebenen Früh-CT-Bedingungen nicht der empfohlene diagnostische Weg.",
        "en": "Delaying exclusion until routine repeat CT is not the recommended diagnostic pathway under the early-CT conditions described.",
        "fa": "به‌تعویق‌انداختن تصمیم رد بیماری تا CT تکراری روتین، مسیر توصیه‌شده در شرایط CT زودهنگام توصیف‌شده نیست."
      },
      "C": {
        "de": "Die Leitlinie verlangt für diesen definierten CT-Ausschlussweg keine zusätzliche FLAIR-MRT; ein negatives FLAIR ist kein universeller Ersatz der zeitabhängigen Diagnostik.",
        "en": "The guideline does not require additional FLAIR MRI for this defined CT rule-out pathway; negative FLAIR is not a universal substitute for timing-dependent work-up.",
        "fa": "راهنما در این مسیر تعریف‌شدهٔ رد با CT، MRI-FLAIR تکمیلی را الزامی نمی‌داند؛ FLAIR منفی جایگزین عمومی بررسی وابسته به زمان نیست."
      },
      "D": {
        "de": "DSA untersucht die Gefäßanatomie und mögliche Blutungsquelle. Sie ersetzt hier nicht den empfohlenen CT-basierten Weg zur Beurteilung, ob eine aSAB vorliegt.",
        "en": "DSA evaluates vascular anatomy and a possible bleeding source. It does not replace the recommended CT-based pathway for determining whether aSAH is present here.",
        "fa": "DSA آناتومی عروق و منشأ احتمالی خونریزی را بررسی می‌کند و در اینجا جای مسیر توصیه‌شدهٔ مبتنی بر CT برای تعیین وجود aSAB را نمی‌گیرد."
      }
    },
    "source": "https://doi.org/10.1161/STR.0000000000000436",
    "difficulty": 2
  },
  {
    "id": "sab-q2",
    "question": {
      "de": "Textvignette: Das Nativ-CT zeigt dickes Zisternenblut und intraventrikuläres Blut. Welcher Modified-Fisher-Grad passt?",
      "en": "Text vignette: Noncontrast CT shows thick cisternal blood and intraventricular blood. Which modified Fisher grade fits?",
      "fa": "سناریوی متنی: CT بدون کنتراست خون سیسترنی ضخیم و خون داخل‌بطنی نشان می‌دهد. کدام درجهٔ فیشر اصلاح‌شده مناسب است؟"
    },
    "options": [
      {
        "de": "Grad 1",
        "en": "Grade 1",
        "fa": "درجه ۱"
      },
      {
        "de": "Grad 2",
        "en": "Grade 2",
        "fa": "درجه ۲"
      },
      {
        "de": "Grad 3",
        "en": "Grade 3",
        "fa": "درجه ۳"
      },
      {
        "de": "Grad 4",
        "en": "Grade 4",
        "fa": "درجه ۴"
      }
    ],
    "correct": "D",
    "explanation": {
      "de": "Dickes subarachnoidales Blut mit IVH entspricht Modified-Fisher-Grad 4. Dies ist die modifizierte Skala 0–4; die ursprüngliche Fisher-Skala I–IV ist anders aufgebaut.",
      "en": "Thick subarachnoid blood with IVH corresponds to modified Fisher grade 4. This is the modified 0–4 scale; the original Fisher I–IV scale is structured differently.",
      "fa": "خون ضخیم زیرعنکبوتیه همراه IVH با درجه ۴ فیشر اصلاح‌شده تطابق دارد. این مقیاس اصلاح‌شدهٔ۰–۴ است؛ مقیاس اصلی فیشر I–IV ساختار متفاوتی دارد."
    },
    "wrong": {
      "A": {
        "de": "Grad 1 bedeutet dünnes Blut ohne IVH; beide Merkmale passen hier nicht.",
        "en": "Grade 1 means thin blood without IVH; neither feature fits here.",
        "fa": "درجه ۱ خون نازک بدون IVH است؛ هیچ‌یک از دو ویژگی با این سناریو تطابق ندارد."
      },
      "B": {
        "de": "Grad 2 enthält IVH, aber dünnes statt des beschriebenen dicken Zisternenblutes.",
        "en": "Grade 2 includes IVH but thin rather than the thick cisternal blood described.",
        "fa": "درجه ۲ شامل IVH است، اما خون سیسترنی نازک دارد، نه خون ضخیم توصیف‌شده."
      },
      "C": {
        "de": "Grad 3 enthält dickes Blut, jedoch kein IVH; das Ventrikelblut führt hier zu Grad 4.",
        "en": "Grade 3 includes thick blood but no IVH; ventricular blood makes this grade 4.",
        "fa": "درجه ۳ خون ضخیم بدون IVH دارد؛ وجود خون بطنی این مورد را درجه ۴ می‌کند."
      }
    },
    "source": "https://doi.org/10.1227/01.NEU.0000218821.34014.1B",
    "difficulty": 1
  },
  {
    "id": "sab-q3",
    "question": {
      "de": "Textvignette: Fall X zeigt dünnes Zisternenblut mit IVH, Fall Y dickes Zisternenblut ohne IVH. Wie lautet die Zuordnung in der Modified-Fisher-Skala?",
      "en": "Text vignette: Case X shows thin cisternal blood with IVH; case Y shows thick cisternal blood without IVH. How are they classified on the modified Fisher scale?",
      "fa": "سناریوی متنی: مورد X خون سیسترنی نازک همراه IVH و مورد Y خون سیسترنی ضخیم بدون IVH دارد. در مقیاس فیشر اصلاح‌شده چگونه طبقه‌بندی می‌شوند؟"
    },
    "options": [
      {
        "de": "X: Grad 1; Y: Grad 3",
        "en": "X: grade 1; Y: grade 3",
        "fa": "X: درجه ۱؛ Y: درجه ۳"
      },
      {
        "de": "X: Grad 2; Y: Grad 3",
        "en": "X: grade 2; Y: grade 3",
        "fa": "X: درجه ۲؛ Y: درجه ۳"
      },
      {
        "de": "X: Grad 3; Y: Grad 2",
        "en": "X: grade 3; Y: grade 2",
        "fa": "X: درجه ۳؛ Y: درجه ۲"
      },
      {
        "de": "X: Grad 2; Y: Grad 4",
        "en": "X: grade 2; Y: grade 4",
        "fa": "X: درجه ۲؛ Y: درجه ۴"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Grad 2 kombiniert dünnes Blut mit IVH; Grad 3 dickes Blut ohne IVH. Die Kategorien sind keine individuellen Prozentprognosen; in Frontera 2006 hatten Grad 2 und 3 ähnliche rohe Odds Ratios für symptomatischen Vasospasmus.",
      "en": "Grade 2 combines thin blood with IVH; grade 3 combines thick blood without IVH. Categories are not individual percentage predictions; grades 2 and 3 had similar crude odds ratios for symptomatic vasospasm in Frontera 2006.",
      "fa": "درجه ۲ خون نازک همراه IVH و درجه ۳ خون ضخیم بدون IVH است. دسته‌ها پیش‌بینی درصدی فردی نیستند؛ در Frontera 2006 درجات ۲ و ۳ نسبت شانس خام مشابهی برای وازواسپاسم علامت‌دار داشتند."
    },
    "wrong": {
      "A": {
        "de": "Bei X ist IVH vorhanden; deshalb passt Grad 1 ohne IVH nicht. Y ist richtig als Grad 3 eingeordnet.",
        "en": "X has IVH, so grade 1 without IVH does not fit. Y is correctly classified as grade 3.",
        "fa": "در X، IVH وجود دارد؛ پس درجه ۱ِ بدون IVH مناسب نیست. طبقه‌بندی Y به درجه ۳ درست است."
      },
      "C": {
        "de": "Die Kombinationen wurden vertauscht: dünn + IVH ist Grad 2, dick ohne IVH ist Grad 3.",
        "en": "The combinations are reversed: thin blood with IVH is grade 2; thick blood without IVH is grade 3.",
        "fa": "ترکیب‌ها جابه‌جا شده‌اند: نازک+IVH درجه ۲ و ضخیم بدون IVH درجه ۳ است."
      },
      "D": {
        "de": "Y hat kein IVH; Grad 4 verlangt zusätzlich zum dicken Blut auch Ventrikelblut.",
        "en": "Y has no IVH; grade 4 requires ventricular blood as well as thick blood.",
        "fa": "Y فاقد IVH است؛ درجه ۴ علاوه بر خون ضخیم به خون داخل‌بطنی نیاز دارد."
      }
    },
    "source": "https://doi.org/10.1227/01.NEU.0000218821.34014.1B",
    "difficulty": 2
  },
  {
    "id": "sab-q4",
    "question": {
      "de": "Textvignette: Bei spontaner SAB wird nach vollständiger Bildprüfung ein klassisch perimesenzephales Muster beschrieben; eine hochwertige CTA ist negativ. Welche Aussage zur weiteren Gefäßabklärung entspricht AHA/ASA 2023?",
      "en": "Text vignette: After full image review, spontaneous SAH has a classic perimesencephalic pattern; high-quality CTA is negative. Which statement about further vascular work-up matches AHA/ASA 2023?",
      "fa": "سناریوی متنی: پس از بررسی کامل تصاویر، خونریزی خودبه‌خودی زیرعنکبوتیه الگوی کلاسیک پری‌مزنسفالیک دارد؛ CTA باکیفیت منفی است. کدام عبارت دربارهٔ بررسی عروقی بیشتر با AHA/ASA 2023 مطابقت دارد؟"
    },
    "options": [
      {
        "de": "Den DSA-Pfad diffuser aneurysmaverdächtiger SAB auf dieses Muster übertragen",
        "en": "Apply the DSA pathway for diffuse aneurysm-suspicious SAH to this pattern",
        "fa": "اعمال مسیر DSA خونریزی منتشر مشکوک به آنوریسم برای این الگو"
      },
      {
        "de": "CTA allein versus zusätzliche DSA als nicht abschließend geklärt behandeln und den Kontext einbeziehen",
        "en": "Treat CTA alone versus additional DSA as unresolved and consider the context",
        "fa": "درنظرگرفتن CTA تنها در برابر DSA اضافی به‌عنوان موضوع حل‌نشده با لحاظ زمینه"
      },
      {
        "de": "CTA allein als ausreichend belegten Abschluss der Gefäßsuche bevorzugen",
        "en": "Prefer CTA alone as a sufficiently established endpoint of vascular investigation",
        "fa": "ترجیح CTA تنها به‌عنوان پایان دارای پشتوانهٔ کافی برای بررسی عروقی"
      },
      {
        "de": "Eine TOF-MRA als bevorzugte zweite Stufe vor der DSA einsetzen",
        "en": "Use TOF MRA as the preferred second step before DSA",
        "fa": "به‌کارگیری TOF-MRA به‌عنوان مرحلهٔ دوم ترجیحی پیش از DSA"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Die Leitlinie nennt CTA allein versus DSA bei klassisch perimesenzephaler Blutverteilung als Wissenslücke. Bei diffuser SAB mit hoher aneurysmatischer Wahrscheinlichkeit ist DSA trotz negativer oder unklarer CTA angezeigt. Ein typisches Muster beweist keine venöse Quelle.",
      "en": "The guideline identifies CTA alone versus DSA for classic perimesencephalic blood distribution as a knowledge gap. With diffuse SAH and high concern for an aneurysm, DSA is indicated despite negative or inconclusive CTA. A typical pattern does not prove a venous source.",
      "fa": "راهنما CTA تنها در برابر DSA در الگوی کلاسیک پری‌مزنسفالیک را خلأ شواهد می‌داند. در خونریزی منتشر و نگرانی بالای آنوریسم، با وجود CTA منفی یا نامشخص DSA اندیکاسیون دارد. الگوی تیپیک منشأ وریدی را ثابت نمی‌کند."
    },
    "wrong": {
      "A": {
        "de": "Die hohe Aneurysmawahrscheinlichkeit einer diffusen SAB begründet einen anderen Pfad. Für klassisch perimesenzephale Verteilung beschreibt AHA/ASA 2023 gerade die offene CTA-versus-DSA-Frage.",
        "en": "High aneurysm concern in diffuse SAH supports a different pathway. For classic perimesencephalic distribution, AHA/ASA 2023 explicitly identifies the CTA-versus-DSA question as unresolved.",
        "fa": "احتمال بالای آنوریسم در خونریزی منتشر مسیر متفاوتی را توجیه می‌کند. برای توزیع کلاسیک پری‌مزنسفالیک، AHA/ASA 2023 صریحاً پرسش CTA در برابر DSA را حل‌نشده می‌داند."
      },
      "C": {
        "de": "CTA allein ist eine diskutierte Strategie, aber die Leitlinie bezeichnet ihre ausreichende Absicherung gegenüber zusätzlicher DSA für dieses Muster als Wissenslücke.",
        "en": "CTA alone is a debated strategy, but the guideline identifies its sufficiency compared with additional DSA for this pattern as an evidence gap.",
        "fa": "CTA تنها راهبردی مورد بحث است، اما راهنما کفایت آن در برابر DSA اضافی برای این الگو را خلأ شواهد می‌داند."
      },
      "D": {
        "de": "Die Leitlinie legt keine bevorzugte TOF-MRA-Zwischenstufe fest. Die hier benannte Unsicherheit betrifft CTA allein gegenüber zusätzlicher Katheter-DSA.",
        "en": "The guideline does not establish a preferred intermediate TOF MRA step. The stated uncertainty concerns CTA alone versus additional catheter DSA.",
        "fa": "راهنما مرحلهٔ میانی ترجیحی TOF-MRA تعیین نمی‌کند. عدم قطعیت ذکرشده مربوط به CTA تنها در برابر DSA کاتتری اضافی است."
      }
    },
    "source": "https://doi.org/10.1161/STR.0000000000000436",
    "difficulty": 2
  },
  {
    "id": "sab-q5",
    "question": {
      "de": "Textvignette: Am 8. Tag nach behandelter aSAB entwickelt eine Patientin eine über eine Stunde anhaltende neue Hemiparese. Nativ-CT und Labor erklären sie nicht; auf CTA ist kein ausgeprägter proximaler Vasospasmus erkennbar. Welche Einschätzung passt am besten?",
      "en": "Text vignette: On day 8 after treated aSAH, a patient develops new hemiparesis lasting over an hour. Noncontrast CT and laboratory findings do not explain it; CTA shows no marked proximal vasospasm. Which assessment fits best?",
      "fa": "سناریوی متنی: روز ۸ پس از درمان aSAB، بیمار دچار همی‌پارزی جدید بیش از یک ساعت می‌شود. CT بدون کنتراست و آزمایش‌ها علت را توضیح نمی‌دهند و CTA وازواسپاسم واضح پروگزیمال ندارد. کدام ارزیابی مناسب‌تر است؟"
    },
    "options": [
      {
        "de": "Fehlende proximale Verengung macht eine DCI als Erklärung ausreichend unwahrscheinlich",
        "en": "Absent proximal narrowing makes DCI sufficiently unlikely as the explanation",
        "fa": "نبود تنگی پروگزیمال احتمال DCI را به‌اندازهٔ کافی کم می‌کند"
      },
      {
        "de": "Der Zeitpunkt passt eher zu einer unmittelbaren prozeduralen Komplikation als zu einer verzögerten Ischämie",
        "en": "The timing fits an immediate procedural complication better than delayed ischaemia",
        "fa": "زمان‌بندی بیشتر با عارضهٔ بلافاصله پس از مداخله تطابق دارد تا ایسکمی تأخیری"
      },
      {
        "de": "DCI bleibt abklärungsbedürftig; klinische Ischämie und großgefäßiger Vasospasmus sind nicht gleichbedeutend",
        "en": "DCI still requires evaluation; clinical ischaemia and large-vessel vasospasm are not synonymous",
        "fa": "DCI همچنان نیازمند بررسی است؛ ایسکمی بالینی و وازواسپاسم عروق بزرگ هم‌معنا نیستند"
      },
      {
        "de": "Die Konstellation eher als verzögerten Hydrozephalus denn als DCI einordnen",
        "en": "Favour delayed hydrocephalus over DCI as the explanation",
        "fa": "ترجیح هیدروسفالی تأخیری بر DCI برای توضیح این وضعیت"
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Eine neue anhaltende fokale Verschlechterung im typischen DCI-Zeitraum verlangt dringliche Abklärung und Ausschluss anderer Ursachen. Kein ausgeprägter proximaler Vasospasmus auf CTA schließt DCI nicht aus. CTA/CTP und weitere Überwachung unterstützen die klinische Beurteilung; die Vignette beweist die Diagnose nicht allein.",
      "en": "New sustained focal deterioration in the usual DCI period requires urgent evaluation and exclusion of other causes. Absence of marked proximal vasospasm on CTA does not exclude DCI. CTA/CTP and further monitoring support clinical assessment; the vignette alone does not prove the diagnosis.",
      "fa": "بدترشدن کانونی جدید و پایدار در دورهٔ معمول DCI به بررسی فوری و کنارگذاشتن علل دیگر نیاز دارد. نبود وازواسپاسم واضح پروگزیمال در CTA، DCI را رد نمی‌کند. CTA/CTP و پایش بیشتر ارزیابی بالینی را تکمیل می‌کنند؛ سناریو به‌تنهایی تشخیص را ثابت نمی‌کند."
    },
    "wrong": {
      "A": {
        "de": "DCI beruht nicht ausschließlich auf sichtbarem proximalem Großgefäßspasmus; ein negatives solches Zeichen beendet die Abklärung nicht.",
        "en": "DCI is not explained solely by visible proximal large-vessel spasm; absence of that finding does not end evaluation.",
        "fa": "DCI فقط ناشی از اسپاسم قابل‌مشاهدهٔ عروق بزرگ پروگزیمال نیست؛ نبود این یافته بررسی را خاتمه نمی‌دهد."
      },
      "B": {
        "de": "Die Neuverschlechterung am 8. Tag ist verzögert; eine unmittelbar prozedurale Schädigung ist damit nicht die am besten gestützte zeitliche Zuordnung.",
        "en": "New deterioration on day 8 is delayed; immediate procedural injury is not the best-supported temporal attribution.",
        "fa": "بدترشدن جدید در روز ۸ تأخیری است؛ آسیب بلافاصله پس از مداخله مناسب‌ترین تطابق زمانی نیست."
      },
      "D": {
        "de": "Hydrozephalus bleibt eine wichtige Differenzialdiagnose, aber die Vignette nennt keinen erklärenden CT-Befund. Ohne entsprechenden Ventrikel-/Liquorbefund ist dieser Vorrang gegenüber DCI nicht begründet.",
        "en": "Hydrocephalus remains an important differential, but the vignette provides no explanatory CT finding. Without corresponding ventricular/CSF findings, prioritising it over DCI is unsupported.",
        "fa": "هیدروسفالی همچنان افتراق مهمی است، اما سناریو یافتهٔ توضیح‌دهنده‌ای در CT ارائه نمی‌کند. بدون یافتهٔ متناظر بطنی/CSF، اولویت‌دادن آن بر DCI پشتوانه ندارد."
      }
    },
    "source": "https://doi.org/10.1161/STR.0000000000000436",
    "difficulty": 2
  },
  {
    "id": "sab-q6",
    "question": {
      "de": "Textvignette: Das Nativ-CT zeigt spontane SAB mit deutlichem Schwerpunkt im vorderen Interhemisphärenspalt. Welcher Gefäßbereich verdient bei der vollständigen CTA-Auswertung besonders gezielte Aufmerksamkeit?",
      "en": "Text vignette: Noncontrast CT shows spontaneous SAH predominantly in the anterior interhemispheric fissure. Which vascular region warrants particular attention during complete CTA review?",
      "fa": "سناریوی متنی: CT بدون کنتراست خونریزی خودبه‌خودی زیرعنکبوتیه با تمرکز واضح در شکاف بین‌نیمکره‌ای قدامی نشان می‌دهد. هنگام بررسی کامل CTA به کدام ناحیهٔ عروقی باید توجه ویژه کرد؟"
    },
    "options": [
      {
        "de": "MCA-Bifurkation",
        "en": "MCA bifurcation",
        "fa": "انشعاب MCA"
      },
      {
        "de": "A. communicans anterior/angrenzender ACA-Komplex",
        "en": "Anterior communicating artery/adjacent ACA complex",
        "fa": "شریان ارتباطی قدامی/مجموعهٔ ACA مجاور"
      },
      {
        "de": "Basilarisspitze",
        "en": "Basilar tip",
        "fa": "نوک بازیلار"
      },
      {
        "de": "PICA-Ursprung",
        "en": "PICA origin",
        "fa": "منشأ PICA"
      }
    ],
    "correct": "B",
    "explanation": {
      "de": "Ein anterior-interhemisphärischer Schwerpunkt ist ein Suchhinweis auf ACA/ACoA. Die Originalstudie zeigt begrenzte Gesamtübereinstimmung und keine sichere Quellenbestimmung allein aus dem CT. Die vollständige Gefäßsuche bleibt erforderlich, besonders bei mehreren Aneurysmen.",
      "en": "An anterior interhemispheric predominance is a search clue for ACA/ACoA. The original study shows limited overall agreement and no definitive source assignment from CT alone. Complete vascular evaluation remains necessary, especially with multiple aneurysms.",
      "fa": "تمرکز بین‌نیمکره‌ای قدامی سرنخ جست‌وجوی ACA/ACoA است. مطالعهٔ اصلی توافق کلی محدود و نبود تعیین قطعی منشأ فقط با CT را نشان می‌دهد. بررسی کامل عروقی، به‌ویژه در آنوریسم‌های متعدد، همچنان لازم است."
    },
    "wrong": {
      "A": {
        "de": "Ein sylvischer Schwerpunkt würde den Blick stärker zur MCA lenken; die hier betonte vordere Interhemisphärenregion spricht eher für ACA/ACoA-Suche.",
        "en": "Sylvian predominance would focus attention more on MCA; the anterior interhemispheric region highlighted here favours ACA/ACoA review.",
        "fa": "تمرکز سیلوین توجه را بیشتر به MCA جلب می‌کند؛ ناحیهٔ بین‌نیمکره‌ای قدامی توصیف‌شده بیشتر جست‌وجوی ACA/ACoA را مطرح می‌کند."
      },
      "C": {
        "de": "Posterior-basale Blutverteilung kann die hintere Zirkulation betonen; sie ist nicht der beschriebene vordere Schwerpunkt.",
        "en": "Posterior basal blood can highlight the posterior circulation; that is not the anterior predominance described.",
        "fa": "توزیع خون در قاعدهٔ خلفی می‌تواند گردش خلفی را مطرح کند؛ این همان تمرکز قدامی توصیف‌شده نیست."
      },
      "D": {
        "de": "Der PICA-Ursprung gehört zur hinteren Zirkulation und ist kein bevorzugter lokalisierender Hinweis des anterior-interhemisphärischen Musters.",
        "en": "PICA origin belongs to the posterior circulation and is not the preferential localizing clue of this anterior interhemispheric pattern.",
        "fa": "منشأ PICA در گردش خلفی است و سرنخ موضع‌یابی ترجیحی این الگوی بین‌نیمکره‌ای قدامی نیست."
      }
    },
    "source": "https://pubmed.ncbi.nlm.nih.gov/9921845/",
    "difficulty": 2
  }
]
export const SAB_QUESTIONS = (lang = 'de') => SAB_QUESTION_CONTENT.map(item => ({
  id: item.id, tags: ['subarachnoidalblutung', 'fisher-skala'], fach: 'gehirn',
  question: item.question[lang] || item.question.de,
  options: item.options.map((option, index) => ({ id: 'ABCD'[index], text: option[lang] || option.de })),
  correct: item.correct, explanation: item.explanation[lang] || item.explanation.de,
  wrongExplanations: Object.fromEntries(Object.entries(item.wrong).map(([key, text]) => [key, text[lang] || text.de])),
  source: item.source, difficulty: item.difficulty,
}))
export const SAB_FLASHCARD_TOPIC = {
  "id": "subarachnoidalblutung",
  "area": {
    "de": "Gehirn",
    "en": "Brain",
    "fa": "مغز"
  },
  "chapter": {
    "de": "Vaskuläre Erkrankungen",
    "en": "Vascular diseases",
    "fa": "بیماری‌های عروقی"
  },
  "icon": "🩸",
  "iconImage": "/fach/gehirn.png",
  "color": "#b91c1c",
  "href": "/flashcards/subarachnoidalblutung",
  "title": {
    "de": "Subarachnoidalblutung",
    "en": "Subarachnoid Haemorrhage",
    "fa": "خونریزی زیر عنکبوتیه"
  },
  "subtitle": {
    "de": "CT-Diagnostik · Modif. Fisher-Skala · Vasospasmus · Komplikationen",
    "en": "CT diagnosis · Modif. Fisher Scale · vasospasm · complications",
    "fa": "تشخیص CT · مقیاس فیشر اصلاح‌شده · وازواسپاسم · عوارض"
  }
}
export const SAB_FLASHCARDS = [
  {
    "id": "sab-fc-1",
    "front": {
      "de": "Was sind die zwei Parameter der Modifizierten Fisher-Skala?",
      "en": "What are the two parameters of the Modified Fisher Scale?",
      "fa": "دو پارامتر مقیاس فیشر اصلاح‌شده کدامند؟"
    },
    "back": {
      "de": "Dünnes oder dickes Subarachnoidalblut und IVH vorhanden oder nicht.",
      "en": "Thin or thick subarachnoid blood and presence or absence of IVH.",
      "fa": "خون زیرعنکبوتیهٔ نازک یا ضخیم و وجود یا نبود IVH."
    },
    "explanation": {
      "de": "Diese Kombination ergibt Grade 0–4. Grad 2 und 3 unterscheiden sich morphologisch; die Zahlen sind keine lineare Blutvolumenmessung oder individuellen Prozentprognosen.",
      "en": "This combination determines grades 0–4. Grades 2 and 3 differ morphologically; the numbers are not a linear blood-volume measurement or individual percentage predictions.",
      "fa": "این ترکیب درجات ۰–۴ را تعیین می‌کند. درجات ۲ و ۳ از نظر مورفولوژی متفاوت‌اند؛ اعداد اندازه‌گیری خطی حجم خون یا پیش‌بینی درصدی فردی نیستند."
    },
    "diagram": {
      "de": "Blutdicke messen → dünn / dick → IVH? ja/nein → Grad 0–4",
      "en": "Measure blood thickness → thin / thick → IVH? yes/no → Grade 0–4",
      "fa": "ضخامت خون → نازک / ضخیم → IVH؟ بله/خیر → درجه ۰–۴"
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "fisher-skala",
      "vasospasmus"
    ],
    "source": "https://doi.org/10.1227/01.NEU.0000218821.34014.1B"
  },
  {
    "id": "sab-fc-2",
    "front": {
      "de": "Welche Merkmale kennzeichnen Modified-Fisher-Grad 4?",
      "en": "Which features define Modified Fisher Grade 4?",
      "fa": "چه یافته‌هایی درجه ۴ فیشر اصلاح‌شده را مشخص می‌کنند؟"
    },
    "back": {
      "de": "Dickes Subarachnoidalblut mit IVH.",
      "en": "Thick subarachnoid blood with IVH.",
      "fa": "خون زیرعنکبوتیهٔ ضخیم همراه IVH."
    },
    "explanation": {
      "de": "Grad 4 kombiniert dickes Zisternenblut und IVH. Die Skala beschreibt die Blutlast und ist kein individueller Wahrscheinlichkeitsrechner.",
      "en": "Grade 4 combines thick cisternal blood and IVH. The scale describes blood burden; it is not an individual probability calculator.",
      "fa": "درجه ۴ ترکیب خون ضخیم سیسترنی و IVH است. مقیاس میزان خون را توصیف می‌کند و محاسبه‌گر احتمال فردی نیست."
    },
    "diagram": {
      "de": "Blutdicke + IVH bestimmen Modified-Fisher-Grad 0–4",
      "en": "Blood thickness + IVH determine Modified Fisher Grade 0–4",
      "fa": "ضخامت خون + IVH درجه ۰ تا ۴ فیشر اصلاح‌شده را تعیین می‌کنند"
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "fisher-skala",
      "vasospasmus"
    ],
    "source": "https://doi.org/10.1227/01.NEU.0000218821.34014.1B"
  },
  {
    "id": "sab-fc-3",
    "front": {
      "de": "Wie lauten die morphologischen Kriterien für Modified-Fisher-Grad 2 und 3?",
      "en": "What are the morphological criteria for modified Fisher grades 2 and 3?",
      "fa": "معیارهای مورفولوژیک درجات ۲ و ۳ فیشر اصلاح‌شده چیست؟"
    },
    "back": {
      "de": "Grad 2: dünnes Blut + IVH. Grad 3: dickes Blut ohne IVH.",
      "en": "Grade 2: thin blood + IVH. Grade 3: thick blood without IVH.",
      "fa": "درجه ۲: خون نازک + IVH. درجه ۳: خون ضخیم بدون IVH."
    },
    "explanation": {
      "de": "Die Grade unterscheiden sich durch die Kombination von Blutdicke und IVH. Grad 2: dünn + IVH; Grad 3: dick + kein IVH.",
      "en": "The grades differ by the combination of blood thickness and IVH. Grade 2: thin + IVH; Grade 3: thick + no IVH.",
      "fa": "درجات با ترکیب ضخامت خون و IVH تفاوت دارند. درجه ۲: نازک + IVH؛ درجه ۳: ضخیم + بدون IVH."
    },
    "diagram": {
      "de": "Grad 2: dünn + IVH\nGrad 3: dick + kein IVH",
      "en": "Grade 2: thin + IVH\nGrade 3: thick + no IVH",
      "fa": "درجه ۲: نازک + IVH\nدرجه ۳: ضخیم + بدون IVH"
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "fisher-skala",
      "vasospasmus"
    ],
    "source": "https://doi.org/10.1227/01.NEU.0000218821.34014.1B"
  },
  {
    "id": "sab-fc-4",
    "front": {
      "de": "Wann kann ein negatives natives CT eine SAB ausschließen, und wann ist weitere Abklärung nötig?",
      "en": "When can a negative non-contrast CT exclude SAH, and when is further evaluation needed?",
      "fa": "چه زمانی CT منفی می‌تواند SAB را رد کند و چه وقت بررسی بیشتر لازم است؟"
    },
    "back": {
      "de": "Bei <6 h, ohne neues Defizit und mit hochwertigem, neuroradiologisch fachärztlich befundetem CT ist der CT-Ausschlussweg vertretbar. Ab 6 h oder bei neuem Defizit sieht der AHA/ASA-Diagnosealgorithmus (Abb. 2) nach negativem CT eine LP vor.",
      "en": "At <6 hours, with no new deficit and high-quality CT read by a board-certified neuroradiologist, CT-based exclusion is reasonable. At 6 hours or later, or with a new deficit, the AHA/ASA diagnostic algorithm (Figure 2) calls for LP after negative CT.",
      "fa": "در کمتر از ۶ ساعت، بدون نقص جدید و با CT باکیفیت و تفسیر نورورادیولوژیست دارای بورد، رد بیماری با CT قابل‌قبول است. از ۶ ساعت به بعد یا با نقص جدید، الگوریتم تشخیصی AHA/ASA (شکل ۲) پس از CT منفی LP را در نظر می‌گیرد."
    },
    "explanation": {
      "de": "Die Aussagekraft des CT nimmt mit der Zeit ab. Bei später Vorstellung oder unzureichender CT-Qualität umfasst die weitere Abklärung eine Lumbalpunktion mit Erythrozyten- und Xanthochromieanalyse nach lokalem Laborprotokoll; ein starres Zwei-Stunden-Fenster ist nicht allgemein gültig.",
      "en": "CT sensitivity decreases over time. With later presentation or inadequate CT quality, further evaluation includes lumbar puncture with red-cell and xanthochromia analysis according to the local laboratory protocol; a rigid two-hour rule is not generally valid.",
      "fa": "حساسیت CT با گذشت زمان کاهش می‌یابد. در مراجعه دیرهنگام یا کیفیت ناکافی CT، بررسی بیشتر شامل پونکسیون لومبار و ارزیابی گلبول قرمز و زانتوکرومی طبق پروتکل آزمایشگاه محلی است؛ قانون ثابت دو ساعته اعتبار عمومی ندارد."
    },
    "diagram": {
      "de": "Zeitpunkt + Neurostatus + CT-Qualität → diagnostischen Weg wählen",
      "en": "Timing + neurological examination + CT quality → choose the diagnostic pathway",
      "fa": "زمان + معاینه عصبی + کیفیت CT → انتخاب مسیر تشخیصی"
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "ct-diagnostik"
    ],
    "source": "https://doi.org/10.1161/STR.0000000000000436"
  },
  {
    "id": "sab-fc-5",
    "front": {
      "de": "Was ist die perimesenzephale SAB und was folgt daraus?",
      "en": "What is perimesencephalic SAH and what does it imply?",
      "fa": "SAB پری‌مزنسفالیک چیست و چه پیامدی دارد؟"
    },
    "back": {
      "de": "Blut konzentriert um das Mittelhirn; die Strategie CTA allein versus zusätzliche DSA ist nicht abschließend geklärt.",
      "en": "Blood centred around the midbrain; CTA alone versus additional DSA remains unresolved.",
      "fa": "خون متمرکز پیرامون مغز میانی؛ راهبرد CTA تنها در برابر DSA اضافی هنوز قطعی نیست."
    },
    "explanation": {
      "de": "Das typische Muster ist auf die perimesenzephalen Zisternen konzentriert. Die AHA/ASA-Leitlinie beschreibt Unsicherheit, ob bei klassischem Muster CTA allein oder zusätzlich DSA genügt.",
      "en": "The typical pattern is centred on the perimesencephalic cisterns. The AHA/ASA guideline notes uncertainty about CTA alone versus additional DSA for a classic pattern.",
      "fa": "الگوی تیپیک در سیسترن‌های پری‌مزنسفالیک متمرکز است. راهنمای AHA/ASA درباره کفایت CTA به‌تنهایی یا نیاز به DSA اضافی در الگوی کلاسیک عدم قطعیت را بیان می‌کند."
    },
    "diagram": {
      "de": "Perimesenzephales Muster → CTA; mögliche zusätzliche DSA im klinischen Kontext",
      "en": "Perimesencephalic pattern → CTA; consider additional DSA in clinical context",
      "fa": "الگوی پری‌مزنسفالیک → CTA؛ بررسی DSA اضافی با توجه به زمینه بالینی"
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "aetiologie",
      "ct-diagnostik"
    ],
    "source": "https://doi.org/10.1161/STR.0000000000000436"
  },
  {
    "id": "sab-fc-6",
    "front": {
      "de": "Wie unterscheiden sich frühes Reblutungsrisiko und DCI zeitlich und begrifflich?",
      "en": "How do early rebleeding risk and DCI differ in timing and meaning?",
      "fa": "خطر خونریزی مجدد زودرس و DCI از نظر زمان و مفهوم چه تفاوتی دارند؟"
    },
    "back": {
      "de": "Reblutung ist früh besonders kritisch; DCI meist Tag 4–14. DCI ist nicht mit angiographischem Vasospasmus gleichzusetzen.",
      "en": "Rebleeding is particularly critical early; DCI mostly occurs on days 4–14. DCI is not synonymous with angiographic vasospasm.",
      "fa": "خونریزی مجدد در مرحلهٔ زودرس اهمیت ویژه دارد؛ DCI بیشتر روزهای ۴–۱۴ رخ می‌دهد. DCI معادل وازواسپاسم آنژیوگرافیک نیست."
    },
    "explanation": {
      "de": "Zeitfenster sind Orientierung, keine Ausschlussgrenzen. Neue Verschlechterung dringlich nach anderen Ursachen abklären. Das rupturierte Aneurysma möglichst innerhalb von 24 Stunden nach Beginn sichern; frühes enterales Nimodipin vermindert DCI und verbessert funktionelle Ergebnisse.",
      "en": "Time windows guide attention, not exclusion. Urgently assess other causes of new deterioration. Secure the ruptured aneurysm preferably within 24 hours of onset; early enteral nimodipine reduces DCI and improves functional outcomes.",
      "fa": "بازه‌های زمانی راهنما هستند، نه مرز رد بیماری. علل دیگر بدترشدن جدید فوری بررسی شوند. آنوریسم پاره‌شده ترجیحاً ظرف ۲۴ ساعت از شروع ایمن‌سازی شود؛ نیمودیپین انتروال زودهنگام DCI را کاهش می‌دهد و پیامد عملکردی را بهتر می‌کند."
    },
    "diagram": {
      "de": "Früh: Reblutung beachten; später: DCI überwachen → bei Verschlechterung Ursachen prüfen",
      "en": "Early: watch for rebleeding; later: monitor for DCI → investigate deterioration",
      "fa": "زودرس: توجه به خونریزی مجدد؛ دیرتر: پایش DCI ← بررسی علت بدترشدن"
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "komplikationen"
    ],
    "source": "https://doi.org/10.1161/STR.0000000000000436"
  },
  {
    "id": "sab-fc-7",
    "front": {
      "de": "Was ist ein Vernichtungskopfschmerz und warum ist er ein Notfall?",
      "en": "What is the \"thunderclap headache\" and why is it an emergency?",
      "fa": "«سردرد رعدآسا» چیست و چرا اورژانس است؟"
    },
    "back": {
      "de": "Plötzlich einsetzender, innerhalb kurzer Zeit maximal starker Kopfschmerz – ein Warnmuster, das dringlich abgeklärt werden muss.",
      "en": "A headache that begins suddenly and reaches maximum intensity rapidly is a warning pattern requiring urgent evaluation.",
      "fa": "سردردی که ناگهانی آغاز می‌شود و در مدت کوتاهی به بیشترین شدت می‌رسد، یک الگوی هشداردهنده است و باید فوری بررسی شود."
    },
    "explanation": {
      "de": "Mögliche Ursachen umfassen SAB, RCVS, Dissektion und zerebrale Venenthrombose. Initiales natives CT; bei negativem CT richtet sich die weitere Abklärung nach Zeitpunkt, Neurostatus, Bildqualität und klinischem Verdacht.",
      "en": "Possible causes include SAH, RCVS, dissection and cerebral venous thrombosis. Start with non-contrast CT; after a negative CT, further evaluation depends on timing, neurological findings, image quality and clinical suspicion.",
      "fa": "علل احتمالی شامل SAB، RCVS، دیسکسیون و ترومبوز وریدی مغزی است. بررسی با CT بدون کنتراست آغاز می‌شود؛ پس از CT منفی، ارزیابی بیشتر به زمان، یافته‌های عصبی، کیفیت تصویر و شک بالینی بستگی دارد."
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "klinik"
    ],
    "source": "https://doi.org/10.1161/STR.0000000000000436"
  },
  {
    "id": "sab-fc-8",
    "front": {
      "de": "Was ist ein Sentinel-Kopfschmerz und welche Bedeutung hat er?",
      "en": "What is the \"sentinel headache\" and what danger does it carry?",
      "fa": "«سردرد هشداردهنده (sentinel headache)» چیست و چه خطری دارد؟"
    },
    "back": {
      "de": "Ein vorausgehender Warnkopfschmerz kann vorkommen; seine Häufigkeit ist variabel und sein Fehlen schließt SAB nicht aus.",
      "en": "A preceding warning headache may occur; reported frequency varies, and its absence does not exclude SAH.",
      "fa": "سردرد هشداردهنده ممکن است پیش از آن رخ دهد؛ فراوانی گزارش‌شده متغیر است و نبود آن SAB را رد نمی‌کند."
    },
    "explanation": {
      "de": "Ein Sentinel-Kopfschmerz kann bei einer kleinen vorausgehenden Blutung oder Aneurysmaveränderung auftreten; der Mechanismus ist nicht immer sicher feststellbar. Er ist ein Warnsymptom, aber weder ein Beweis für eine bevorstehende Ruptur noch eine Vorhersage einer Rezidivblutung. Plötzlich maximaler Kopfschmerz muss dringend abgeklärt werden.",
      "en": "A sentinel headache may occur with a small preceding leak or aneurysm change, although the mechanism is not always established. It is a warning symptom, but neither proof of an impending rupture nor a prediction of rebleeding. Sudden maximal headache requires urgent evaluation.",
      "fa": "سردرد هشداردهنده ممکن است با نشت خون اندک یا تغییر آنوریسم پیش از خونریزی عمده همراه باشد، اما سازوکار آن همیشه روشن نیست. این سردرد علامت هشدار است، نه اثبات پارگی قریب‌الوقوع و نه پیش‌بینی‌کنندهٔ خونریزی مجدد. سردرد ناگهانی که سریع به اوج می‌رسد باید فوری بررسی شود."
    },
    "diagram": {
      "de": "Mögliche vorausgehende Blutung/Veränderung → Warnkopfschmerz → dringliche Abklärung; Reblutung nicht zwangsläufig",
      "en": "Possible leak/change → warning headache → urgent assessment; rebleed is not inevitable",
      "fa": "نشت/تغییر احتمالی → سردرد هشداردهنده → بررسی فوری؛ خونریزی مجدد حتمی نیست"
    },
    "topicId": "subarachnoidalblutung",
    "tags": [
      "klinik"
    ],
    "source": "https://doi.org/10.1161/STR.0000000000000436"
  }
]
