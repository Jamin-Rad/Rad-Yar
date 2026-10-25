'use client'


import TopicAssessment from '@/components/lesson-template/TopicAssessment'
import { hccPhaseCheck } from '@/data/assessmentQuality/atvLiver'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'
import { HCC_PLANNING } from '@/data/abdomenHccPlanning'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from '../fnh/page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Leber · HCC",
    "title": "Hepatozelluläres Karzinom (HCC)",
    "subtitle": "Risikokontext, dynamische Bildgebung, LI-RADS-Merkmale und infiltrative Wachstumsmuster",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Merke",
    "caveLabel": "CAVE",
    "sections": [
      {
        "id": "grundlagen",
        "label": "Grundlagen",
        "icon": "🧬"
      },
      {
        "id": "ct",
        "label": "Dynamische CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRT & LI-RADS",
        "icon": "🧲"
      },
      {
        "id": "infiltrativ",
        "label": "Infiltratives HCC",
        "icon": "⚠️"
      },
      {
        "id": "fallbeispiele",
        "label": "Fallbeispiele",
        "icon": "🧪"
      },
      {
        "id": "therapieplanung",
        "label": "Therapieplanung",
        "icon": "◎"
      },
      {
        "id": "takehome",
        "label": "Take home message",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "APHE",
        "label": "arterielle Hypervaskularisation",
        "text": "non-rim arterial phase hyperenhancement"
      },
      {
        "value": "Wash-out",
        "label": "portalvenös oder spät",
        "text": "relativ zum Leberparenchym"
      },
      {
        "value": "LI-RADS",
        "label": "nur im passenden Risikokontext",
        "text": "CT/MRT-Standardisierung"
      }
    ],
    "basics": {
      "title": "Klinische Grundlagen",
      "lead": "Das HCC ist der häufigste primäre maligne Lebertumor. Die bildgebende Diagnose hängt entscheidend vom Risikokontext und vom dynamischen Kontrastmittelverhalten ab.",
      "items": [
        {
          "title": "Risikokontext",
          "text": "Diagnostisches LI-RADS gilt bei Erwachsenen mit Zirrhose, chronischer Hepatitis B oder aktuellem/früherem HCC. Ausnahmen sind kongenitale hepatische Fibrose und bestimmte vaskuläre Zirrhosen, etwa durch kardiale Stauung."
        },
        {
          "title": "Tumorbiologie",
          "text": "Bei der Hepatokarzinogenese kann die arterielle Versorgung zu- und die portalvenöse Versorgung abnehmen. APHE und Wash-out sind häufige Folgen, aber nicht jedes HCC zeigt dieses Muster."
        },
        {
          "title": "Klinische Bedeutung",
          "text": "Die Bildgebung berichtet Zahl, Größe, Gefäßinvasion und extrahepatische Ausbreitung. Klinisches Staging und Therapieplanung berücksichtigen zusätzlich Leberfunktion, Dekompensation und ECOG-Performance-Status."
        }
      ],
      "key": "Ein typisches Enhancement-Muster ist nur zusammen mit dem passenden Hochrisikokontext diagnostisch belastbar."
    },
    "ct": {
      "title": "Dynamische CT-Diagnostik",
      "lead": "Eine korrekt getimte Mehrphasenuntersuchung ist entscheidend. Das HCC kann in der Nativphase unauffällig sein und erst durch sein relatives Enhancement sichtbar werden.",
      "headers": [
        "Phase",
        "Typischer Befund",
        "Bedeutung"
      ],
      "rows": [
        [
          "Nativ",
          "iso- oder hypodens; ggf. Fett, Blutung oder Verkalkung",
          "Ausgangsdichte und intraläsionale Bestandteile"
        ],
        [
          "Spätarteriell",
          "non-rim APHE: stärkere Anreicherung als das umgebende Leberparenchym",
          "wichtiges Hauptmerkmal"
        ],
        [
          "Portalvenös/spät",
          "non-peripheral Wash-out",
          "zunehmende Hypodensität relativ zur Leber"
        ],
        [
          "Spätphase",
          "anreichernde Kapsel oder Kapselappearance möglich",
          "zusätzliches Malignitätsmerkmal"
        ]
      ],
      "highlightTitle": "Wash-out ist ein relativer Befund",
      "highlightText": "Wash-out bedeutet nicht zwingend absoluten Kontrastmittelverlust. Entscheidend ist, dass die Läsion gegenüber dem zunehmend anreichernden Leberparenchym relativ hypodens beziehungsweise hypointens wird.",
      "key": "Non-rim APHE plus non-peripheral Wash-out ist das klassische dynamische Muster eines HCC im Risikopatienten."
    },
    "mri": {
      "title": "MRT und LI-RADS-Merkmale",
      "lead": "Bei extrazellulärem Kontrastmittel ist nicht-peripheres Wash-out portalvenös oder spät beurteilbar, bei Gadoxetat nur portalvenös. Hypointensität erst in der Transitional- oder hepatobiliären Phase ersetzt dieses Major Feature nicht.",
      "headers": [
        "Sequenz/Merkmal",
        "Typischer Befund",
        "Einordnung"
      ],
      "rows": [
        [
          "T1/T2",
          "meist T1-hypointens, variabel T2-hyperintens",
          "nicht spezifisch"
        ],
        [
          "DWI/ADC",
          "Diffusionsrestriktion mit erniedrigtem ADC möglich",
          "unterstützendes Malignitätsmerkmal"
        ],
        [
          "Dynamisch",
          "non-rim APHE, Wash-out, anreichernde Kapsel",
          "zentrale LI-RADS-Merkmale"
        ],
        [
          "Hepatobiliäre Phase",
          "meist hypointens",
          "häufig verminderte Aufnahme über Transportproteine; erhaltene/vermehrte Aufnahme kann iso- oder hyperintenses HCC ergeben"
        ],
        [
          "Wachstum",
          "v2018: Größenzunahme einer Raumforderung ≥50 % in ≤6 Monaten bei geeigneter CT/MRT-Vergleichbarkeit",
          "erhöht den Malignitätsverdacht"
        ]
      ],
      "cards": [
        {
          "title": "LI-RADS richtig verwenden",
          "text": "Kategorie und Diagnose beruhen auf Zielpopulation, Läsionsgröße, Hauptmerkmalen und Begleitmerkmalen. Die exakte aktuelle LI-RADS-Tabelle ist maßgeblich."
        },
        {
          "title": "Tumor in vein",
          "text": "Eindeutig anreicherndes Weichteilgewebe in einer Vene erfüllt das Kriterium für Tumor in vein. Venen und Ausdehnung berichten; LR-TIV ist nicht HCC-spezifisch. Expansion oder Tumornachbarschaft allein reichen nicht."
        }
      ],
      "cave": "Eine arterielle Hypervaskularisation allein beweist kein HCC. FNH, Adenom, arterioportale Shunts und hypervaskuläre Metastasen können ähnlich erscheinen.",
      "key": "APHE, Wash-out, Kapselappearance, Wachstum und Tumor in vein müssen systematisch beschrieben werden."
    },
    "infiltrative": {
      "title": "Infiltratives und atypisches HCC",
      "lead": "Das infiltrative HCC wächst permeativ über mehrere Segmente oder einen ganzen Leberlappen und kann sich der zirrhotischen Parenchymstruktur angleichen.",
      "headers": [
        "Merkmal",
        "Infiltratives HCC"
      ],
      "rows": [
        [
          "Morphologie",
          "unscharfe, permeative Infiltration statt klarer solitärer Raumforderung"
        ],
        [
          "Enhancement",
          "heterogen; klassisches APHE/Wash-out kann nur fokal oder gar nicht erkennbar sein"
        ],
        [
          "Begleitbefunde",
          "Satellitenherde, Gefäßinvasion und Pfortader-Tumorthrombus häufig"
        ],
        [
          "Differenzialdiagnose",
          "konfluierende Fibrose, Perfusionsstörung, diffuse Metastasierung oder Entzündung"
        ]
      ],
      "cave": "Fehlendes klassisches Wash-out schließt ein infiltratives HCC nicht aus. Bei diffuser Architekturveränderung müssen Gefäße, DWI, Voraufnahmen und klinischer Risikokontext besonders sorgfältig bewertet werden.",
      "key": "Das infiltrative HCC ist aggressiv und wird häufig über die Kombination aus permeativem Wachstum, Satellitenherden und Gefäßinvasion erkannt."
    },
    "cases": {
      "title": "Bildgebungsfälle im Vergleich",
      "lead": "Zwei Radiopaedia-Fälle zeigen typische und infiltrative Muster. Das PDF-Beispiel darunter zeigt eine Läsion, deren Bildgebung allein nicht eindeutig war.",
      "open": "Originalfall öffnen",
      "pdfExample": {
        "title": "PDF-Beispiel: Malignitätsverdacht ohne eindeutiges HCC-Muster",
        "text": "Abdomen.pdf, Seite 19, beschreibt im Mehrphasen-CT einen malignitätsverdächtigen Herd mit Differenzialdiagnosen HCC, Metastase und CCC. Die charakteristische HCC-Kontrastmitteldynamik war laut Quelle nicht eindeutig; die im PDF berichtete Biopsie bestätigte HCC. Der Fall zeigt: Ein später bestätigter HCC-Befund macht das vorherige Bildmuster nicht rückwirkend spezifisch.",
        "alt": "Vier CT-Aufnahmen derselben Leberläsion in arterieller, portalvenöser und zwei Spätphasen; eine Spätphase markiert den Herd.",
        "credit": "Quelle: Abdomen.pdf, PDF-Seite 19 (Druckseite 18); Bildausschnitt aus dem vom Nutzer bereitgestellten PDF."
      },
      "items": [
        {
          "title": "HCC in der Mehrphasen-CT",
          "tags": [
            "CT",
            "APHE",
            "Wash-out",
            "Kapsel"
          ],
          "text": "60-jähriger Patient mit zirrhotischer Leber und Segment-5-HCC: frühe kräftige arterielle Anreicherung, portalvenöses Wash-out und periphere Kapselappearance.",
          "credit": "Michael P. Hartung · Radiopaedia rID-197181",
          "url": "https://radiopaedia.org/cases/hepatocellular-carcinoma-multiphase-exam"
        },
        {
          "title": "Infiltratives HCC mit Satellitenherden",
          "tags": [
            "CT",
            "infiltrativ",
            "Satelliten"
          ],
          "text": "80-jähriger Patient mit Alkoholvorgeschichte: große permeative Tumorkonglomerate, multiple arterielle Herde und teils heterogenes Wash-out.",
          "credit": "Michael P. Hartung · Radiopaedia rID-61803",
          "url": "https://radiopaedia.org/cases/infiltrative-hepatocellular-carcinoma-hcc"
        }
      ]
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Die wichtigsten Punkte für Befundung und Prüfung.",
      "items": [
        {
          "title": "Kontext zuerst",
          "text": "HCC-Bilddiagnostik und LI-RADS nur im geeigneten Hochrisikokontext anwenden."
        },
        {
          "title": "Klassisches Muster",
          "text": "Non-rim APHE plus non-peripheral Wash-out, oft ergänzt durch Kapselappearance."
        },
        {
          "title": "MRT-Zusatzzeichen",
          "text": "DWI-Restriktion und hepatobiliäre Hypointensität sind unterstützend und nicht HCC-spezifisch; Ancillary Features allein erlauben kein LR-5."
        },
        {
          "title": "Stagingrelevant",
          "text": "Immer Zahl, Größe, Satelliten, Gefäßinvasion und extrahepatische Ausbreitung angeben."
        }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Liver · HCC",
    "title": "Hepatocellular carcinoma (HCC)",
    "subtitle": "Risk context, dynamic imaging, LI-RADS features and infiltrative growth patterns",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Key point",
    "caveLabel": "Caution",
    "sections": [
      {
        "id": "grundlagen",
        "label": "Basics",
        "icon": "🧬"
      },
      {
        "id": "ct",
        "label": "Dynamic CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRI & LI-RADS",
        "icon": "🧲"
      },
      {
        "id": "infiltrativ",
        "label": "Infiltrative HCC",
        "icon": "⚠️"
      },
      {
        "id": "fallbeispiele",
        "label": "Cases",
        "icon": "🧪"
      },
      {
        "id": "therapieplanung",
        "label": "Treatment planning",
        "icon": "◎"
      },
      {
        "id": "takehome",
        "label": "Take home message",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "APHE",
        "label": "arterial hyperenhancement",
        "text": "non-rim arterial phase hyperenhancement"
      },
      {
        "value": "Wash-out",
        "label": "portal venous or delayed",
        "text": "relative to liver parenchyma"
      },
      {
        "value": "LI-RADS",
        "label": "only in the target population",
        "text": "CT/MRI standardisation"
      }
    ],
    "basics": {
      "title": "Clinical basics",
      "lead": "HCC is the most common primary malignant liver tumour. Imaging diagnosis depends on the risk context and dynamic enhancement pattern.",
      "items": [
        {
          "title": "Risk context",
          "text": "Diagnostic LI-RADS applies to adults with cirrhosis, chronic hepatitis B or current/prior HCC. Exceptions include congenital hepatic fibrosis and certain vascular causes of cirrhosis, such as cardiac congestion."
        },
        {
          "title": "Tumour biology",
          "text": "During hepatocarcinogenesis, arterial supply may increase and portal venous supply decrease. APHE and washout are common consequences, but not every HCC shows this pattern."
        },
        {
          "title": "Clinical impact",
          "text": "Imaging reports number, size, vascular invasion and extrahepatic spread. Clinical staging and treatment planning additionally consider liver function, decompensation and ECOG performance status."
        }
      ],
      "key": "A typical enhancement pattern is diagnostically reliable only in the appropriate high-risk context."
    },
    "ct": {
      "title": "Dynamic CT diagnosis",
      "lead": "Correctly timed multiphasic imaging is essential. HCC may be inconspicuous before contrast and become visible through relative enhancement.",
      "headers": [
        "Phase",
        "Typical finding",
        "Meaning"
      ],
      "rows": [
        [
          "Non-contrast",
          "iso- or hypodense; possible fat, haemorrhage or calcification",
          "baseline density and internal components"
        ],
        [
          "Late arterial",
          "non-rim APHE relative to background liver",
          "major feature"
        ],
        [
          "Portal venous/delayed",
          "non-peripheral wash-out",
          "increasing relative hypoattenuation"
        ],
        [
          "Delayed",
          "enhancing capsule or capsule appearance may be present",
          "additional malignant feature"
        ]
      ],
      "highlightTitle": "Wash-out is relative",
      "highlightText": "Wash-out does not necessarily mean absolute contrast loss. The lesion becomes relatively darker than the progressively enhancing liver.",
      "key": "Non-rim APHE plus non-peripheral wash-out is the classic dynamic HCC pattern in an at-risk patient."
    },
    "mri": {
      "title": "MRI and LI-RADS features",
      "lead": "With extracellular agents, nonperipheral washout can be assessed in the portal venous or delayed phase; with gadoxetate, only in the portal venous phase. Hypointensity first appearing in the transitional or hepatobiliary phase does not replace this major feature.",
      "headers": [
        "Sequence/feature",
        "Typical finding",
        "Interpretation"
      ],
      "rows": [
        [
          "T1/T2",
          "usually T1 hypointense, variably T2 hyperintense",
          "non-specific"
        ],
        [
          "DWI/ADC",
          "restricted diffusion with low ADC may occur",
          "ancillary malignant feature"
        ],
        [
          "Dynamic",
          "non-rim APHE, wash-out, enhancing capsule",
          "central LI-RADS features"
        ],
        [
          "Hepatobiliary phase",
          "usually hypointense",
          "often reduced transporter-mediated uptake; preserved/increased uptake can produce iso- or hyperintense HCC"
        ],
        [
          "Growth",
          "v2018: ≥50% size increase of a mass in ≤6 months with suitably comparable CT/MRI",
          "raises malignant suspicion"
        ]
      ],
      "cards": [
        {
          "title": "Use LI-RADS correctly",
          "text": "Category and diagnosis depend on target population, lesion size, major and ancillary features. Use the current official LI-RADS table."
        },
        {
          "title": "Tumour in vein",
          "text": "Unequivocally enhancing soft tissue in a vein meets the tumour-in-vein criterion. Report veins and extent; LR-TIV is not HCC-specific. Expansion or tumour adjacency alone is insufficient."
        }
      ],
      "cave": "Arterial hyperenhancement alone does not prove HCC. FNH, adenoma, arterioportal shunts and hypervascular metastases may mimic it.",
      "key": "Systematically report APHE, wash-out, capsule appearance, growth and tumour in vein."
    },
    "infiltrative": {
      "title": "Infiltrative and atypical HCC",
      "lead": "Infiltrative HCC permeates multiple segments or an entire lobe and may blend into cirrhotic parenchyma.",
      "headers": [
        "Feature",
        "Infiltrative HCC"
      ],
      "rows": [
        [
          "Morphology",
          "ill-defined permeative infiltration rather than a discrete solitary mass"
        ],
        [
          "Enhancement",
          "heterogeneous; classic APHE/wash-out may be focal or absent"
        ],
        [
          "Associated findings",
          "satellite lesions, vascular invasion and portal vein tumour thrombus are common"
        ],
        [
          "Differential",
          "confluent fibrosis, perfusion alteration, diffuse metastases or inflammation"
        ]
      ],
      "cave": "Absent classic wash-out does not exclude infiltrative HCC. Carefully assess vessels, DWI, prior imaging and the clinical risk context.",
      "key": "Permeative growth, satellite nodules and vascular invasion are key clues to aggressive infiltrative HCC."
    },
    "cases": {
      "title": "Imaging cases in comparison",
      "lead": "Two Radiopaedia cases show classic and infiltrative patterns. The PDF example below shows a lesion that was not definite on imaging alone.",
      "open": "Open original case",
      "pdfExample": {
        "title": "PDF example: suspected malignancy without a definitive HCC pattern",
        "text": "Abdomen.pdf page 19 describes a suspicious lesion on multiphasic CT, with HCC, metastasis and cholangiocarcinoma in the differential. The source says the characteristic HCC enhancement pattern was not definitive; the biopsy reported in the PDF confirmed HCC. A later confirmed diagnosis does not make the preceding imaging pattern specific in retrospect.",
        "alt": "Four CT images of the same liver lesion in arterial, portal venous and two delayed phases; the lesion is outlined on one delayed image.",
        "credit": "Source: Abdomen.pdf, PDF page 19 (printed page 18); crop from the user-supplied PDF."
      },
      "items": [
        {
          "title": "HCC on multiphasic CT",
          "tags": [
            "CT",
            "APHE",
            "wash-out",
            "capsule"
          ],
          "text": "60-year-old man with cirrhosis and a segment 5 HCC showing avid arterial enhancement, portal venous wash-out and capsule appearance.",
          "credit": "Michael P. Hartung · Radiopaedia rID-197181",
          "url": "https://radiopaedia.org/cases/hepatocellular-carcinoma-multiphase-exam"
        },
        {
          "title": "Infiltrative HCC with satellite lesions",
          "tags": [
            "CT",
            "infiltrative",
            "satellites"
          ],
          "text": "80-year-old man with alcohol history: large permeative tumour conglomerates, multiple arterial lesions and heterogeneous wash-out.",
          "credit": "Michael P. Hartung · Radiopaedia rID-61803",
          "url": "https://radiopaedia.org/cases/infiltrative-hepatocellular-carcinoma-hcc"
        }
      ]
    },
    "takehome": {
      "title": "Take home message",
      "lead": "The key points for reporting and exams.",
      "items": [
        {
          "title": "Context first",
          "text": "Use HCC imaging diagnosis and LI-RADS only in the appropriate high-risk population."
        },
        {
          "title": "Classic pattern",
          "text": "Non-rim APHE plus non-peripheral wash-out, often with capsule appearance."
        },
        {
          "title": "MRI clues",
          "text": "Restricted diffusion and hepatobiliary hypointensity are supportive and not HCC-specific; ancillary features alone cannot establish LR-5."
        },
        {
          "title": "Staging matters",
          "text": "Always report number, size, satellites, vascular invasion and extrahepatic spread."
        }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbAbdomen": "شکم",
    "breadcrumbCurrent": "کبد · HCC",
    "title": "کارسینوم هپاتوسلولار (HCC)",
    "subtitle": "زمینه خطر، تصویربرداری دینامیک، ویژگی‌های LI-RADS و الگوی رشد انفیلتراتیو",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "فلش‌کارت",
    "keyLabel": "نکته مهم",
    "caveLabel": "احتیاط",
    "sections": [
      {
        "id": "grundlagen",
        "label": "مبانی",
        "icon": "🧬"
      },
      {
        "id": "ct",
        "label": "CT دینامیک",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRI و LI-RADS",
        "icon": "🧲"
      },
      {
        "id": "infiltrativ",
        "label": "HCC انفیلتراتیو",
        "icon": "⚠️"
      },
      {
        "id": "fallbeispiele",
        "label": "نمونه کیس‌ها",
        "icon": "🧪"
      },
      {
        "id": "therapieplanung",
        "label": "برنامه‌ریزی درمان",
        "icon": "◎"
      },
      {
        "id": "takehome",
        "label": "Take home message",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "APHE",
        "label": "تقویت شریانی بیش از پارانشیم",
        "text": "الگوی غیرحلقوی"
      },
      {
        "value": "Wash-out",
        "label": "پورتال یا تأخیری",
        "text": "نسبت به پارانشیم کبد"
      },
      {
        "value": "LI-RADS",
        "label": "فقط در گروه پرخطر مناسب",
        "text": "استانداردسازی CT/MRI"
      }
    ],
    "basics": {
      "title": "مبانی بالینی",
      "lead": "HCC شایع‌ترین تومور بدخیم اولیه کبد است. تشخیص تصویربرداری به زمینه خطر و الگوی دینامیک کنتراست وابسته است.",
      "items": [
        {
          "title": "زمینه خطر",
          "text": "LI-RADS تشخیصی برای بزرگسالان مبتلا به سیروز، هپاتیت B مزمن یا HCC فعلی/قبلی کاربرد دارد. فیبروز مادرزادی کبد و برخی علل عروقی سیروز، مانند احتقان قلبی، مستثنا هستند."
        },
        {
          "title": "بیولوژی تومور",
          "text": "در روند ایجاد HCC ممکن است خون‌رسانی شریانی افزایش و خون‌رسانی پورت کاهش یابد. APHE و واش‌اوت از پیامدهای شایع‌اند، اما هر HCC این الگو را نشان نمی‌دهد."
        },
        {
          "title": "اهمیت بالینی",
          "text": "تصویربرداری تعداد، اندازه، تهاجم عروقی و انتشار خارج‌کبدی را گزارش می‌کند. مرحله‌بندی بالینی و برنامه‌ریزی درمان علاوه بر آن عملکرد کبد، دکمپنسیشن و وضعیت عملکردی ECOG را لحاظ می‌کنند."
        }
      ],
      "key": "الگوی تقویت پس از تزریق تیپیک فقط همراه با زمینه بالینی پرخطر مناسب ارزش تشخیصی قابل اعتماد دارد."
    },
    "ct": {
      "title": "تشخیص با CT دینامیک",
      "lead": "تصویربرداری چندفازی با زمان‌بندی صحیح ضروری است. HCC ممکن است بدون کنتراست نامشخص باشد و با تقویت پس از تزریق نسبی دیده شود.",
      "headers": [
        "فاز",
        "یافته تیپیک",
        "اهمیت"
      ],
      "rows": [
        [
          "بدون کنتراست",
          "ایزو یا هیپودنس؛ احتمال چربی، خونریزی یا کلسیفیکاسیون",
          "تراکم پایه و اجزای داخل ضایعه"
        ],
        [
          "شریانی دیررس",
          "افزایش سیگنال شریانی غیرحلقوی (APHE) نسبت به کبد",
          "ویژگی اصلی"
        ],
        [
          "پورتال/تأخیری",
          "واش‌اوت غیرمحیطی",
          "هیپودنسیته نسبی فزاینده"
        ],
        [
          "تأخیری",
          "کپسول دارای تقویت پس از تزریق یا نمای کپسول ممکن است",
          "ویژگی اضافی بدخیمی"
        ]
      ],
      "highlightTitle": "واش‌اوت یک یافته نسبی است",
      "highlightText": "واش‌اوت الزاماً به معنی خروج مطلق کنتراست نیست؛ ضایعه نسبت به کبدی که بیشتر تقویت پس از تزریق می‌یابد، تیره‌تر می‌شود.",
      "key": "افزایش سیگنال شریانی غیرحلقوی (APHE) همراه واش‌اوت غیرمحیطی الگوی دینامیک کلاسیک HCC در بیمار پرخطر است."
    },
    "mri": {
      "title": "MRI و ویژگی‌های LI-RADS",
      "lead": "با مادهٔ حاجب خارج‌سلولی، واش‌اوت غیرمحیطی در فاز پورتال یا تأخیری قابل ارزیابی است؛ با گادوکسیتات فقط در فاز پورتال. کم‌سیگنالی که نخست در فاز انتقالی یا هپاتوبیلیاری ظاهر شود، جای این ویژگی اصلی را نمی‌گیرد.",
      "headers": [
        "سکانس/ویژگی",
        "یافته تیپیک",
        "تفسیر"
      ],
      "rows": [
        [
          "T1/T2",
          "معمولاً T1 هیپواینتنس و T2 با هایپراینتنسیتی متغیر",
          "غیراختصاصی"
        ],
        [
          "DWI/ADC",
          "ممکن است محدودیت انتشار و ADC پایین وجود داشته باشد",
          "ویژگی کمکی بدخیمی"
        ],
        [
          "دینامیک",
          "افزایش سیگنال شریانی غیرحلقوی (APHE)، واش‌اوت، کپسول دارای تقویت پس از تزریق",
          "ویژگی‌های اصلی LI-RADS"
        ],
        [
          "فاز هپاتوبیلیاری",
          "معمولاً هیپواینتنس",
          "اغلب کاهش برداشت وابسته به پروتئین‌های ناقل؛ برداشت حفظ‌شده یا افزایش‌یافته می‌تواند HCC ایزواینتنس یا هایپراینتنس ایجاد کند"
        ],
        [
          "رشد",
          "نسخهٔ ۲۰۱۸: افزایش اندازهٔ توده ≥۵۰٪ طی ≤۶ ماه با قابلیت مقایسهٔ مناسب CT/MRI",
          "افزایش شک به بدخیمی"
        ]
      ],
      "cards": [
        {
          "title": "استفاده صحیح از LI-RADS",
          "text": "رده‌بندی به گروه هدف، اندازه ضایعه و ویژگی‌های اصلی و کمکی وابسته است. جدول رسمی و به‌روز LI-RADS ملاک است."
        },
        {
          "title": "تومور داخل ورید",
          "text": "بافت نرم داخل ورید با جذب قطعی مادهٔ حاجب معیار تومور داخل ورید را برآورده می‌کند. وریدها و وسعت گزارش شوند؛ LR-TIV اختصاصی HCC نیست. اتساع یا مجاورت تومور به‌تنهایی کافی نیست."
        }
      ],
      "cave": "تقویت شریانی بیش از پارانشیم به‌تنهایی HCC را اثبات نمی‌کند. FNH، آدنوم، شانت آرتریوپورتال و متاستازهای هیپرواسکولار می‌توانند مشابه باشند.",
      "key": "APHE، واش‌اوت، نمای کپسول، رشد و تومور داخل ورید باید سیستماتیک گزارش شوند."
    },
    "infiltrative": {
      "title": "HCC انفیلتراتیو و آتیپیک",
      "lead": "HCC انفیلتراتیو به‌صورت نفوذی چند سگمان یا یک لوب کامل را درگیر می‌کند و ممکن است با پارانشیم سیروتیک ادغام شود.",
      "headers": [
        "ویژگی",
        "HCC انفیلتراتیو"
      ],
      "rows": [
        [
          "مورفولوژی",
          "رشد نفوذی با حدود نامشخص به‌جای توده منفرد و مشخص"
        ],
        [
          "تقویت پس از تزریق",
          "ناهمگن؛ APHE یا واش‌اوت کلاسیک ممکن است فقط به‌صورت کانونی دیده شود یا وجود نداشته باشد"
        ],
        [
          "یافته‌های همراه",
          "ندول‌های ماهواره‌ای، تهاجم عروقی و ترومبوس توموری پورت شایع هستند"
        ],
        [
          "افتراق",
          "فیبروز همگرا، اختلال پرفیوژن، متاستاز منتشر یا التهاب"
        ]
      ],
      "cave": "نبود واش‌اوت کلاسیک HCC انفیلتراتیو را رد نمی‌کند. عروق، DWI، تصاویر قبلی و زمینه خطر باید دقیق بررسی شوند.",
      "key": "رشد نفوذی، ندول‌های ماهواره‌ای و تهاجم عروقی سرنخ‌های اصلی HCC انفیلتراتیو تهاجمی هستند."
    },
    "cases": {
      "title": "مقایسهٔ کیس‌های تصویربرداری",
      "lead": "دو کیس Radiopaedia الگوهای کلاسیک و انفیلتراتیو را نشان می‌دهند. نمونه PDF زیر ضایعه‌ای را نشان می‌دهد که فقط با تصویربرداری قطعی نبود.",
      "open": "باز کردن کیس اصلی",
      "pdfExample": {
        "title": "نمونه PDF: شک به بدخیمی بدون الگوی قطعی HCC",
        "text": "صفحه ۱۹ Abdomen.pdf در CT چندفازی ضایعه‌ای مشکوک به بدخیمی را توصیف می‌کند و HCC، متاستاز و کلانژیوکارسینوم را در افتراق می‌گذارد. طبق منبع، الگوی تیپیک جذب HCC قطعی نبود؛ بیوپسی گزارش‌شده در PDF، HCC را تأیید کرد. تشخیص نهایی، الگوی تصویری پیشین را به‌طور پس‌نگر اختصاصی نمی‌کند.",
        "alt": "چهار تصویر CT از یک ضایعه کبدی در فاز شریانی، پورتال و دو فاز تأخیری؛ ضایعه در یکی از تصاویر تأخیری مشخص شده است.",
        "credit": "منبع: Abdomen.pdf، صفحه PDF ۱۹ (صفحه چاپی ۱۸)؛ برش از PDF ارائه‌شده توسط کاربر."
      },
      "items": [
        {
          "title": "HCC در CT چندفازی",
          "tags": [
            "CT",
            "APHE",
            "wash-out",
            "کپسول"
          ],
          "text": "مرد ۶۰ ساله با سیروز و HCC سگمان ۵: تقویت شریانی قوی، واش‌اوت پورتال و نمای کپسول.",
          "credit": "Michael P. Hartung · Radiopaedia rID-197181",
          "url": "https://radiopaedia.org/cases/hepatocellular-carcinoma-multiphase-exam"
        },
        {
          "title": "HCC انفیلتراتیو با ضایعات ماهواره‌ای",
          "tags": [
            "CT",
            "انفیلتراتیو",
            "ماهواره‌ای"
          ],
          "text": "مرد ۸۰ ساله با سابقه الکل: کنگلومرای نفوذی بزرگ، ضایعات شریانی متعدد و واش‌اوت هتروژن.",
          "credit": "Michael P. Hartung · Radiopaedia rID-61803",
          "url": "https://radiopaedia.org/cases/infiltrative-hepatocellular-carcinoma-hcc"
        }
      ]
    },
    "takehome": {
      "title": "نکات کلیدی",
      "lead": "مهم‌ترین نکات برای گزارش و آزمون.",
      "items": [
        {
          "title": "ابتدا زمینه",
          "text": "تشخیص تصویربرداری HCC و LI-RADS فقط در گروه پرخطر مناسب استفاده شود."
        },
        {
          "title": "الگوی کلاسیک",
          "text": "افزایش سیگنال شریانی غیرحلقوی (APHE) همراه واش‌اوت غیرمحیطی و اغلب نمای کپسول."
        },
        {
          "title": "علائم MRI",
          "text": "محدودیت انتشار و کم‌سیگنالی هپاتوبیلیاری حمایتی و غیراختصاصی برای HCC هستند؛ ویژگی‌های کمکی به‌تنهایی اجازهٔ LR-5 نمی‌دهند."
        },
        {
          "title": "مرحله‌بندی",
          "text": "تعداد، اندازه، ضایعات ماهواره‌ای، تهاجم عروقی و گسترش خارج کبدی همیشه گزارش شوند."
        }
      ]
    }
  }
}

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={onClick}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  return <div className={styles.tableWrap}><table className={styles.table}><thead><tr>{headers.map(item => <th key={item}>{item}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function Callout({ type = 'note', label, children }) {
  return <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}><strong>{type === 'cave' ? '⚠️' : '💡'} {label}</strong><p>{children}</p></div>
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => {
    const applyHash = () => setOpen(window.location.hash === `#${id}`)
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}><h2>{title}</h2><span>{open ? '−' : '+'}</span></button>
      <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>
    </section>
  )
}

export default function HccPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('hcc')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveId(id) }, { rootMargin: '-18% 0px -72% 0px', threshold: .01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <LegacyLessonMigration className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang} lessonRoute="/abdomen/leber/hcc" lessonId="/abdomen/leber/hcc">
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}><Link href={withLang('/')}>RadYar</Link><span>›</span><Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link><span>›</span><span>{copy.breadcrumbCurrent}</span></div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span><h1>{copy.title}</h1><p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=hcc&from=${encodeURIComponent(withLang('/abdomen/leber/hcc'))}`)} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/hcc?from=${encodeURIComponent(withLang('/abdomen/leber/hcc'))}`)} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>{copy.heroCards.map(card => <div className={styles.heroStat} key={card.label}><strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small></div>)}</div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError}  migrationReadControl/></div>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button
              type="button"
              key={section.id}
              data-section-id={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => { window.location.hash = section.id; document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
            >
              <span>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead} migrationChapter>
            <div className={styles.cardsGrid}>{copy.basics.items.map(item => <div className={styles.infoCard} key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>
          <Section id="ct" title={copy.ct.title} lead={copy.ct.lead} migrationChapter>
            <Table headers={copy.ct.headers} rows={copy.ct.rows} />
            <div className={styles.highlightBox}><h3>{copy.ct.highlightTitle}</h3><p>{copy.ct.highlightText}</p></div>
            <Callout label={copy.keyLabel}>{copy.ct.key}</Callout>
          </Section>
          <Section id="mrt" title={copy.mri.title} lead={copy.mri.lead} migrationChapter>
            <Table headers={copy.mri.headers} rows={copy.mri.rows} />
            <div className={styles.splitGrid}>{copy.mri.cards.map(card => <div className={styles.infoCard} key={card.title}><h3>{card.title}</h3><p>{card.text}</p></div>)}</div>
            <Callout type="cave" label={copy.caveLabel}>{copy.mri.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.mri.key}</Callout>
            <TopicAssessment question={hccPhaseCheck[lang] || hccPhaseCheck.de} topic="hcc" lang={lang} returnTo="/abdomen/leber/hcc#mrt" fach="abdomen" />
            <p className={styles.source}><a href="https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf" target="_blank" rel="noopener noreferrer">ACR CT/MRI LI-RADS v2018 · 20–21, 24</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/20663969/" target="_blank" rel="noopener noreferrer">Kitao et al. 2010 · OATP8</a></p>
          </Section>
          <Section id="infiltrativ" title={copy.infiltrative.title} lead={copy.infiltrative.lead} migrationChapter>
            <Table headers={copy.infiltrative.headers} rows={copy.infiltrative.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.infiltrative.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.infiltrative.key}</Callout>
            <p className={styles.source}><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3538368/" target="_blank" rel="noopener noreferrer">Kneuertz et al. 2012</a></p>
          </Section>
          <Section id="fallbeispiele" title={copy.cases.title} lead={copy.cases.lead} migrationChapter>
            <figure className={styles.pdfCase}>
              <img src="/abdomen/hcc/abdomen-pdf-p19-multiphase.png" alt={copy.cases.pdfExample.alt} />
              <figcaption><strong>{copy.cases.pdfExample.title}</strong><p>{copy.cases.pdfExample.text}</p><small>{copy.cases.pdfExample.credit}</small></figcaption>
            </figure>
            <div className={styles.caseGrid}>{copy.cases.items.map(item => <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}><div className={styles.caseImage} aria-hidden="true">CT</div><div className={styles.caseBody}><div className={styles.caseLabelRow}>{item.tags.map(tag => <span key={tag} className={styles.caseLabel}>{tag}</span>)}</div><h3>{item.title}</h3><p>{item.text}</p><small>{item.credit}</small><strong>{copy.cases.open}</strong></div></a>)}</div>
          </Section>
          <Section id="therapieplanung" title={HCC_PLANNING.title[lang]} lead={HCC_PLANNING.intro[lang]} migrationChapter>
            <div className={styles.cardsGrid}>{HCC_PLANNING.rows.map(([title, text], i) => <div className={styles.infoCard} key={i}><h3>{title[lang]}</h3><p>{text[lang]}</p></div>)}</div>
            <p>{HCC_PLANNING.note[lang]}</p><p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/" target="_blank" rel="noopener noreferrer">AASLD2023</a> · <a href="https://easlcampus.eu/sites/default/files/2025-02/EASL_CPG_Management_HCC.pdf" target="_blank" rel="noopener noreferrer">EASL2025</a></p>
            <Link href={withLang('/abdomen/leber/fibrolamellaeres-karzinom')}>{({de:'Eigenständige Lektion: Fibrolamelläres Karzinom',en:'Separate lesson: fibrolamellar carcinoma',fa:'درس جداگانه: کارسینوم فیبرولاملار'})[lang]}</Link>
          </Section>
          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead} migrationChapter>
            <div className={styles.takeHomeGrid}>{copy.takehome.items.map((item, index) => <div className={styles.takeHomeItem} key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div>
          </Section>
          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError}  migrationReadControl/></div>
        </div>
      </div>
    </LegacyLessonMigration>
  )
}
