'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbThorax": "Thorax",
    "breadcrumbCurrent": "Lunge · Sarkoidose",
    "title": "Sarkoidose",
    "subtitle": "Scadding-Stadien, HRCT-Muster, Lymphknoten und wichtige Differentialdiagnosen",
    "sourceLabel": "RadYar · Thorax",
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
        "id": "roentgen",
        "label": "Röntgen / Scadding",
        "icon": "🩻"
      },
      {
        "id": "hrct",
        "label": "HRCT-Muster",
        "icon": "🫁"
      },
      {
        "id": "extrapulmonal",
        "label": "Extrapulmonal",
        "icon": "🧠"
      },
      {
        "id": "dd",
        "label": "Differentialdiagnosen",
        "icon": "⚖️"
      },
      {
        "id": "fallbeispiele",
        "label": "Fallbeispiele",
        "icon": "🧪"
      },
      {
        "id": "takehome",
        "label": "Take home",
        "icon": "☾"
      }
    ],
    "heroCards": [
      {
        "value": ">90 %",
        "label": "thorakaler Befall",
        "text": "Lunge oder intrathorakale Lymphknoten"
      },
      {
        "value": "1-2-3",
        "label": "Lymphknoten-Zeichen",
        "text": "beide Hili + rechter Paratrachealraum"
      },
      {
        "value": "2–4 mm",
        "label": "Mikronoduli",
        "text": "typisch perilymphatisch verteilt"
      }
    ],
    "basics": {
      "title": "Klinische Grundlagen",
      "lead": "Die Sarkoidose ist eine systemische granulomatöse Erkrankung unbekannter Ätiologie. Histologisch typisch sind nicht-verkäsende Granulome. Radiologisch ist der Thorax der wichtigste Befundort.",
      "items": [
        {
          "title": "Definition",
          "text": "Systemische granulomatöse Erkrankung mit nicht-verkäsenden Granulomen."
        },
        {
          "title": "Prädilektionsort",
          "text": "In über 90 % sind Lunge oder intrathorakales Lymphsystem betroffen."
        },
        {
          "title": "Verteilungsmuster",
          "text": "Typisch perilymphatisch entlang Pleura, Septen und bronchovaskulärem Bündel."
        },
        {
          "title": "Epidemiologie",
          "text": "Altersgipfel 20–40 Jahre und 60–70 Jahre; Frauen häufiger betroffen."
        }
      ],
      "key": "Das zentrale Bildmuster der thorakalen Sarkoidose ist die Kombination aus symmetrischer bihilärer Lymphadenopathie und perilymphatischen Mikronoduli."
    },
    "xray": {
      "title": "Konventioneller Röntgen-Thorax: Scadding-Stadien",
      "lead": "Die klassische Stadieneinteilung nach Scadding basiert auf dem Röntgen-Thorax und beschreibt Lymphknotenbefall, Parenchymbefall und Fibrose.",
      "headers": [
        "Stadium",
        "Befund",
        "Praktische Bedeutung"
      ],
      "rows": [
        [
          "0",
          "Normalbefund",
          "Sarkoidose trotzdem möglich, v. a. extrapulmonal"
        ],
        [
          "I",
          "isolierte bihiläre Lymphadenopathie",
          "typisch symmetrisch, Parenchym unauffällig"
        ],
        [
          "II",
          "BHL + Lungenparenchymveränderungen",
          "Lymphknoten plus retikulonoduläre Zeichnungsvermehrung"
        ],
        [
          "III",
          "Parenchymveränderungen ohne BHL",
          "disseminierte retikulonoduläre Veränderungen"
        ],
        [
          "IV",
          "Lungenfibrose",
          "irreguläre Retikulationen und Traktionsbronchiektasien"
        ]
      ],
      "key": "Stadium II bedeutet nicht „schwerer als III“, sondern beschreibt die Kombination aus Lymphknoten- und Parenchymbefall."
    },
    "hrct": {
      "title": "HRCT: Lymphknoten und Parenchymmuster",
      "lead": "Die HRCT ist der Goldstandard zur Beurteilung des Parenchymbefalls. Besonders wichtig sind Lymphknotenverteilung und perilymphatische Mikronoduli.",
      "lymphTitle": "Lymphknoten",
      "lymph": [
        {
          "title": "Bihiläre Lymphadenopathie",
          "text": "Meist symmetrisch und oft der erste auffällige Befund."
        },
        {
          "title": "Rechts paratracheal",
          "text": "Typisch zusätzlich zum hilären Befall, besonders rechtsseitig."
        },
        {
          "title": "1-2-3-Zeichen",
          "text": "Rechter Hilus, linker Hilus und rechter Paratrachealraum."
        },
        {
          "title": "Eggshell-Verkalkungen",
          "text": "Spätstadium; auch bei Silikose möglich und deshalb nicht spezifisch."
        }
      ],
      "parenchymaTitle": "Parenchym",
      "parenchyma": [
        {
          "title": "Mikronoduli",
          "text": "2–4 mm, scharf begrenzt und perilymphatisch verteilt."
        },
        {
          "title": "Typische Lage",
          "text": "Entlang Fissuren, Pleura, Septen und bronchovaskulärem Bündel."
        },
        {
          "title": "Verteilung",
          "text": "Bevorzugt Ober- und Mittelgeschosse."
        },
        {
          "title": "Bronchovaskuläre Verdickung",
          "text": "Peribronchovaskuläre Manschetten durch Granulombildung."
        }
      ],
      "signsTitle": "Spezielle Zeichen",
      "signHeaders": ["Zeichen", "Morphologie", "Hinweis"],
      "signRows": [
        [
          "Sarcoid Galaxy Sign",
          "größerer Knoten/Granulom-Aggregat mit vielen Satellitennoduli",
          "nicht spezifisch; kann auch bei Tuberkulose vorkommen"
        ],
        [
          "Cluster Sign",
          "viele kleine Noduli liegen dicht zusammen",
          "wirkt fast wie ein einzelner Herd"
        ]
      ],
      "key": "Perilymphatische Noduli an Fissuren und bronchovaskulären Bündeln sind deutlich typischer für Sarkoidose als zufällig verstreute zentrilobuläre Noduli."
    },
    "extra": {
      "title": "Extrapulmonale Manifestationen",
      "lead": "Sarkoidose ist systemisch. Extra-thorakale Manifestationen sind für die klinische Einordnung wichtig, auch wenn die Thoraxbildgebung oft dominiert.",
      "items": [
        {
          "title": "Morbus Jüngling",
          "text": "Zystische Ostitis multiplex mit tunnelartigen Osteolysen in Phalangen von Händen und Füßen."
        },
        {
          "title": "Kardiale Sarkoidose",
          "text": "Nachweis meist per MRT mit Late Gadolinium Enhancement; erhöhtes Risiko für Rhythmusstörungen."
        },
        {
          "title": "Neurosarkoidose",
          "text": "Häufige Beteiligung des N. facialis."
        },
        {
          "title": "Heerfordt-Syndrom",
          "text": "Kombination aus Uveitis, Parotitis und Fazialisparese."
        }
      ],
      "key": "Bei Rhythmusstörungen, Fazialisparese oder typischen Knochenläsionen sollte eine systemische Sarkoidose mitgedacht werden."
    },
    "dd": {
      "title": "Differentialdiagnosen",
      "lead": "Die wichtigste Aufgabe ist die Abgrenzung gegenüber anderen perilymphatischen oder nodulären Lungenerkrankungen.",
      "headers": [
        "DD",
        "Wichtige Hinweise gegen Sarkoidose"
      ],
      "rows": [
        [
          "Silikose",
          "ebenfalls perilymphatisch und Eggshell-Verkalkungen, aber typische Staubexposition und oft oberlappenbetont"
        ],
        [
          "Lymphangiosis carcinomatosa",
          "unregelmäßige knotige Septenverdickungen, oft einseitig/asymmetrisch, klinisch meist schwerer krank"
        ],
        [
          "Tuberkulose",
          "häufig asymmetrisch, verkäsende Granulome, Kavernenbildung; Galaxy-Zeichen nicht spezifisch"
        ],
        [
          "Lymphom",
          "oft massiv vergrößerte Lymphknoten, aber keine typische perilymphatische Parenchymknotung"
        ]
      ],
      "compareHeaders": [
        "Merkmal",
        "Asbestose",
        "Silikose",
        "Sarkoidose"
      ],
      "compareRows": [
        [
          "Ätiologie",
          "Asbestfasern",
          "Quarzstaub",
          "unbekannt"
        ],
        [
          "Verteilung",
          "basal und subpleural",
          "apikal / Oberlappen",
          "Ober- und Mittelfelder"
        ],
        [
          "Muster",
          "retikulär, eher Linien",
          "scharfe Noduli, teils Konglomerate",
          "perilymphatisch, peribronchovaskulär, Fissuren/Pleura"
        ],
        [
          "Pleura",
          "Pleuraplaques ± Verkalkungen",
          "meist unauffällig",
          "meist unauffällig"
        ],
        [
          "Lymphknoten",
          "keine/gering",
          "Eggshell-Verkalkungen möglich",
          "bihiläre Lymphadenopathie"
        ]
      ],
      "key": "Eggshell-Verkalkungen sind kein Alleinstellungsmerkmal der Sarkoidose; die Anamnese und das gesamte Verteilungsmuster sind entscheidend."
    },
    "cases": {
      "title": "Fallbeispiele",
      "lead": "Kurzfälle zum aktiven Wiederholen der wichtigsten Muster.",
      "items": [
        {
          "label": "Fall 1",
          "title": "Symmetrische bihiläre und rechts paratracheale LAP",
          "text": "Röntgen oder CT zeigt beidseitige hiläre Lymphknoten plus rechten Paratrachealraum, aber kein sicherer Parenchymbefall.",
          "answer": "Scadding Stadium I · 1-2-3-Zeichen"
        },
        {
          "label": "Fall 2",
          "title": "Perilymphatische Mikronoduli entlang der Fissuren",
          "text": "HRCT zeigt 2–4-mm-Noduli entlang Fissuren, Pleura und bronchovaskulären Bündeln, bevorzugt in Ober- und Mittelfeldern.",
          "answer": "Typisches HRCT-Muster der pulmonalen Sarkoidose"
        },
        {
          "label": "Fall 3",
          "title": "Eggshell-Lymphknotenverkalkungen bei Staubexposition",
          "text": "Schalenförmige Lymphknotenverkalkungen und Oberlappenbetonung bei beruflicher Quarzstaubexposition.",
          "answer": "DD Silikose mitdenken"
        }
      ]
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Die wichtigsten Befundungsregeln für die Praxis.",
      "items": [
        {
          "title": "Thorax dominiert",
          "text": "Bei über 90 % sind Lunge oder intrathorakale Lymphknoten betroffen."
        },
        {
          "title": "Röntgen-Merker",
          "text": "Scadding I = nur BHL, II = BHL + Parenchym, III = Parenchym ohne BHL, IV = Fibrose."
        },
        {
          "title": "HRCT-Schlüssel",
          "text": "Perilymphatische 2–4-mm-Mikronoduli entlang Fissuren, Pleura und bronchovaskulärem Bündel."
        },
        {
          "title": "DD-Falle",
          "text": "Eggshell-Verkalkungen und Galaxy Sign sind nicht spezifisch; immer Silikose und Tuberkulose mitdenken."
        }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbThorax": "Thorax",
    "breadcrumbCurrent": "Lung · Sarcoidosis",
    "title": "Sarcoidosis",
    "subtitle": "Scadding stages, HRCT pattern, lymph nodes and key differentials",
    "sourceLabel": "RadYar · Thorax",
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
        "id": "roentgen",
        "label": "X-ray / Scadding",
        "icon": "🩻"
      },
      {
        "id": "hrct",
        "label": "HRCT pattern",
        "icon": "🫁"
      },
      {
        "id": "extrapulmonal",
        "label": "Extrapulmonary",
        "icon": "🧠"
      },
      {
        "id": "dd",
        "label": "Differentials",
        "icon": "⚖️"
      },
      {
        "id": "fallbeispiele",
        "label": "Cases",
        "icon": "🧪"
      },
      {
        "id": "takehome",
        "label": "Take home",
        "icon": "☾"
      }
    ],
    "heroCards": [
      {
        "value": ">90%",
        "label": "thoracic involvement",
        "text": "lung or intrathoracic lymph nodes"
      },
      {
        "value": "1-2-3",
        "label": "lymph-node sign",
        "text": "both hila + right paratracheal nodes"
      },
      {
        "value": "2–4 mm",
        "label": "micronodules",
        "text": "typical perilymphatic distribution"
      }
    ],
    "basics": {
      "title": "Clinical basics",
      "lead": "Sarcoidosis is a systemic granulomatous disease of unknown cause. Histology typically shows non-caseating granulomas. The thorax is the most important imaging site.",
      "items": [
        {
          "title": "Definition",
          "text": "Systemic granulomatous disease with non-caseating granulomas."
        },
        {
          "title": "Predilection site",
          "text": "In more than 90%, the lung or intrathoracic lymphatic system is involved."
        },
        {
          "title": "Distribution pattern",
          "text": "Typically perilymphatic along pleura, septa and bronchovascular bundles."
        },
        {
          "title": "Epidemiology",
          "text": "Age peaks at 20–40 and 60–70 years; women are affected more often."
        }
      ],
      "key": "The key thoracic pattern is symmetric bilateral hilar lymphadenopathy combined with perilymphatic micronodules."
    },
    "xray": {
      "title": "Chest X-ray: Scadding stages",
      "lead": "The Scadding classification is based on chest radiography and describes lymph-node disease, parenchymal disease and fibrosis.",
      "headers": [
        "Stage",
        "Finding",
        "Practical meaning"
      ],
      "rows": [
        [
          "0",
          "normal chest radiograph",
          "sarcoidosis still possible, especially extrapulmonary"
        ],
        [
          "I",
          "isolated bilateral hilar lymphadenopathy",
          "typically symmetric, normal parenchyma"
        ],
        [
          "II",
          "BHL + lung parenchymal changes",
          "nodes plus reticulonodular abnormalities"
        ],
        [
          "III",
          "parenchymal changes without BHL",
          "disseminated reticulonodular abnormalities"
        ],
        [
          "IV",
          "pulmonary fibrosis",
          "irregular reticulation and traction bronchiectasis"
        ]
      ],
      "key": "Stage II does not simply mean “worse than III”; it describes combined lymph-node and parenchymal involvement."
    },
    "hrct": {
      "title": "HRCT: lymph nodes and parenchymal pattern",
      "lead": "HRCT is the gold standard for assessing parenchymal involvement. Lymph-node distribution and perilymphatic micronodules are central.",
      "lymphTitle": "Lymph nodes",
      "lymph": [
        {
          "title": "Bilateral hilar lymphadenopathy",
          "text": "Usually symmetric and often the first obvious finding."
        },
        {
          "title": "Right paratracheal nodes",
          "text": "Typical additional nodal station, especially on the right."
        },
        {
          "title": "1-2-3 sign",
          "text": "Right hilum, left hilum and right paratracheal region."
        },
        {
          "title": "Eggshell calcification",
          "text": "Late stage; also seen in silicosis and therefore not specific."
        }
      ],
      "parenchymaTitle": "Parenchyma",
      "parenchyma": [
        {
          "title": "Micronodules",
          "text": "2–4 mm, sharply marginated and perilymphatic."
        },
        {
          "title": "Typical location",
          "text": "Along fissures, pleura, septa and bronchovascular bundles."
        },
        {
          "title": "Distribution",
          "text": "Predominantly upper and middle lung zones."
        },
        {
          "title": "Bronchovascular thickening",
          "text": "Peribronchovascular cuffing caused by granuloma formation."
        }
      ],
      "signsTitle": "Specific signs",
      "signHeaders": ["Sign", "Morphology", "Comment"],
      "signRows": [
        [
          "Sarcoid galaxy sign",
          "larger nodule/granuloma aggregate surrounded by satellites",
          "not specific; can also occur in tuberculosis"
        ],
        [
          "Cluster sign",
          "many small nodules packed together",
          "may almost mimic one single lesion"
        ]
      ],
      "key": "Perilymphatic nodules along fissures and bronchovascular bundles are much more typical of sarcoidosis than randomly scattered centrilobular nodules."
    },
    "extra": {
      "title": "Extrapulmonary manifestations",
      "lead": "Sarcoidosis is systemic. Extrathoracic manifestations are important for clinical interpretation, even if thoracic imaging dominates.",
      "items": [
        {
          "title": "Morbus Jüngling",
          "text": "Cystic osteitis multiplex with tunnel-like osteolyses in hand and foot phalanges."
        },
        {
          "title": "Cardiac sarcoidosis",
          "text": "Usually detected by cardiac MRI with late gadolinium enhancement; increased risk of arrhythmias."
        },
        {
          "title": "Neurosarcoidosis",
          "text": "Facial nerve involvement is common."
        },
        {
          "title": "Heerfordt syndrome",
          "text": "Combination of uveitis, parotitis and facial palsy."
        }
      ],
      "key": "Arrhythmias, facial palsy or characteristic bone lesions should prompt consideration of systemic sarcoidosis."
    },
    "dd": {
      "title": "Differential diagnoses",
      "lead": "The key task is differentiating sarcoidosis from other perilymphatic or nodular lung diseases.",
      "headers": [
        "Differential",
        "Clues against sarcoidosis"
      ],
      "rows": [
        [
          "Silicosis",
          "also perilymphatic and may show eggshell calcifications, but typical dust exposure and often upper-lobe predominance"
        ],
        [
          "Lymphangitic carcinomatosis",
          "irregular nodular septal thickening, often unilateral/asymmetric, clinically sicker patient"
        ],
        [
          "Tuberculosis",
          "often asymmetric, caseating granulomas, cavitation; galaxy sign is not specific"
        ],
        [
          "Lymphoma",
          "often massive lymph-node enlargement but no typical perilymphatic parenchymal nodularity"
        ]
      ],
      "compareHeaders": [
        "Feature",
        "Asbestosis",
        "Silicosis",
        "Sarcoidosis"
      ],
      "compareRows": [
        [
          "Cause",
          "asbestos fibres",
          "quartz dust",
          "unknown"
        ],
        [
          "Distribution",
          "basal and subpleural",
          "apical / upper lobes",
          "upper and middle zones"
        ],
        [
          "Pattern",
          "reticular, more lines than nodules",
          "sharp nodules, sometimes conglomerates",
          "perilymphatic, peribronchovascular, fissures/pleura"
        ],
        [
          "Pleura",
          "pleural plaques ± calcification",
          "usually normal",
          "usually normal"
        ],
        [
          "Lymph nodes",
          "none/mild",
          "eggshell calcifications possible",
          "bilateral hilar lymphadenopathy"
        ]
      ],
      "key": "Eggshell calcification is not unique to sarcoidosis; exposure history and the full distribution pattern are decisive."
    },
    "cases": {
      "title": "Cases",
      "lead": "Short cases for active recall of the key patterns.",
      "items": [
        {
          "label": "Case 1",
          "title": "Symmetric bihilar and right paratracheal lymphadenopathy",
          "text": "X-ray or CT shows bilateral hilar nodes plus right paratracheal nodes, but no definite parenchymal disease.",
          "answer": "Scadding stage I · 1-2-3 sign"
        },
        {
          "label": "Case 2",
          "title": "Perilymphatic micronodules along the fissures",
          "text": "HRCT shows 2–4-mm nodules along fissures, pleura and bronchovascular bundles, predominantly in the upper/middle zones.",
          "answer": "Typical HRCT pattern of pulmonary sarcoidosis"
        },
        {
          "label": "Case 3",
          "title": "Eggshell nodal calcifications with dust exposure",
          "text": "Eggshell-like nodal calcifications and upper-lobe predominance in a patient with quartz dust exposure.",
          "answer": "Consider silicosis as differential"
        }
      ]
    },
    "takehome": {
      "title": "Take home message",
      "lead": "The most important practical reporting rules.",
      "items": [
        {
          "title": "Thorax dominates",
          "text": "In more than 90%, lung or intrathoracic lymph nodes are involved."
        },
        {
          "title": "X-ray memory hook",
          "text": "Scadding I = BHL only, II = BHL + parenchyma, III = parenchyma without BHL, IV = fibrosis."
        },
        {
          "title": "HRCT key",
          "text": "Perilymphatic 2–4-mm micronodules along fissures, pleura and bronchovascular bundles."
        },
        {
          "title": "DD pitfall",
          "text": "Eggshell calcification and galaxy sign are not specific; always consider silicosis and tuberculosis."
        }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbThorax": "توراکس",
    "breadcrumbCurrent": "ریه · سارکوئیدوز",
    "title": "سارکوئیدوز",
    "subtitle": "مراحل Scadding، الگوی HRCT، لنف‌نودها و تشخیص‌های افتراقی مهم",
    "sourceLabel": "RadYar · Thorax",
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
        "id": "roentgen",
        "label": "رادیوگرافی / Scadding",
        "icon": "🩻"
      },
      {
        "id": "hrct",
        "label": "الگوی HRCT",
        "icon": "🫁"
      },
      {
        "id": "extrapulmonal",
        "label": "خارج ریوی",
        "icon": "🧠"
      },
      {
        "id": "dd",
        "label": "تشخیص افتراقی",
        "icon": "⚖️"
      },
      {
        "id": "fallbeispiele",
        "label": "نمونه کیس‌ها",
        "icon": "🧪"
      },
      {
        "id": "takehome",
        "label": "Take home",
        "icon": "☾"
      }
    ],
    "heroCards": [
      {
        "value": ">۹۰٪",
        "label": "درگیری توراکس",
        "text": "ریه یا لنف‌نودهای داخل قفسه سینه"
      },
      {
        "value": "1-2-3",
        "label": "علامت لنف‌نود",
        "text": "دو هیلوم + پارا تراکئال راست"
      },
      {
        "value": "۲–۴ mm",
        "label": "میکروندول‌ها",
        "text": "توزیع تیپیک پری‌لنفاتیک"
      }
    ],
    "basics": {
      "title": "مبانی بالینی",
      "lead": "سارکوئیدوز یک بیماری سیستمیک گرانولوماتوز با علت ناشناخته است. از نظر هیستولوژی، گرانولوم‌های بدون نکروز پنیری تیپیک هستند. توراکس مهم‌ترین محل درگیری در تصویربرداری است.",
      "items": [
        {
          "title": "تعریف",
          "text": "بیماری سیستمیک گرانولوماتوز با گرانولوم‌های non-caseating."
        },
        {
          "title": "محل شایع",
          "text": "در بیش از ۹۰٪ موارد، ریه یا سیستم لنفاوی داخل قفسه سینه درگیر است."
        },
        {
          "title": "الگوی توزیع",
          "text": "تیپیک به صورت پری‌لنفاتیک در امتداد پلور، سپتا و دسته‌های برونکوواسکولار."
        },
        {
          "title": "اپیدمیولوژی",
          "text": "دو پیک سنی ۲۰–۴۰ و ۶۰–۷۰ سال؛ در زنان شایع‌تر."
        }
      ],
      "key": "الگوی اصلی سارکوئیدوز توراسیک، ترکیب لنفادنوپاتی بی‌هیلار متقارن و میکروندول‌های پری‌لنفاتیک است."
    },
    "xray": {
      "title": "رادیوگرافی قفسه سینه: مراحل Scadding",
      "lead": "تقسیم‌بندی Scadding بر اساس رادیوگرافی قفسه سینه است و درگیری لنف‌نود، پارانشیم و فیبروز را توصیف می‌کند.",
      "headers": [
        "مرحله",
        "یافته",
        "معنای عملی"
      ],
      "rows": [
        [
          "0",
          "طبیعی",
          "سارکوئیدوز هنوز ممکن است، مخصوصاً خارج ریوی"
        ],
        [
          "I",
          "فقط لنفادنوپاتی بی‌هیلار",
          "معمولاً متقارن و پارانشیم طبیعی"
        ],
        [
          "II",
          "BHL + تغییرات پارانشیم ریه",
          "لنف‌نود همراه با افزایش رتیکولوندولار"
        ],
        [
          "III",
          "تغییرات پارانشیمی بدون BHL",
          "تغییرات رتیکولوندولار منتشر"
        ],
        [
          "IV",
          "فیبروز ریه",
          "رتیکولاسیون نامنظم و برونشکتازی کششی"
        ]
      ],
      "key": "مرحله II الزاماً از III شدیدتر نیست؛ مرحله II یعنی درگیری همزمان لنف‌نود و پارانشیم."
    },
    "hrct": {
      "title": "HRCT: لنف‌نود و الگوی پارانشیم",
      "lead": "HRCT استاندارد طلایی برای ارزیابی درگیری پارانشیم است. توزیع لنف‌نودها و میکروندول‌های پری‌لنفاتیک بسیار مهم هستند.",
      "lymphTitle": "لنف‌نودها",
      "lymph": [
        {
          "title": "لنفادنوپاتی بی‌هیلار",
          "text": "اغلب متقارن و گاهی اولین یافته واضح."
        },
        {
          "title": "پارا تراکئال راست",
          "text": "درگیری تیپیک اضافی، به‌خصوص در سمت راست."
        },
        {
          "title": "علامت 1-2-3",
          "text": "هیلوم راست، هیلوم چپ و ناحیه پارا تراکئال راست."
        },
        {
          "title": "کلسیفیکاسیون Eggshell",
          "text": "در مراحل دیررس؛ در سیلیکوز هم دیده می‌شود و اختصاصی نیست."
        }
      ],
      "parenchymaTitle": "پارانشیم",
      "parenchyma": [
        {
          "title": "میکروندول‌ها",
          "text": "۲–۴ میلی‌متر، شارپ و با توزیع پری‌لنفاتیک."
        },
        {
          "title": "محل تیپیک",
          "text": "در امتداد فیشورها، پلور، سپتا و دسته‌های برونکوواسکولار."
        },
        {
          "title": "توزیع",
          "text": "بیشتر در نواحی فوقانی و میانی ریه."
        },
        {
          "title": "ضخیم‌شدن برونکوواسکولار",
          "text": "مانند cuffing اطراف برونکوواسکولار به علت تشکیل گرانولوم."
        }
      ],
      "signsTitle": "علائم خاص",
      "signHeaders": ["علامت", "مورفولوژی", "نکته"],
      "signRows": [
        [
          "Sarcoid Galaxy Sign",
          "ندول بزرگ‌تر/تجمع گرانولوم همراه با ندول‌های ماهواره‌ای",
          "اختصاصی نیست؛ در سل هم ممکن است دیده شود"
        ],
        [
          "Cluster Sign",
          "تعداد زیادی ندول کوچک نزدیک به هم",
          "تقریباً شبیه یک ضایعه واحد دیده می‌شود"
        ]
      ],
      "key": "ندول‌های پری‌لنفاتیک در امتداد فیشورها و دسته‌های برونکوواسکولار برای سارکوئیدوز تیپیک‌تر از ندول‌های سنترلوبولار پراکنده هستند."
    },
    "extra": {
      "title": "تظاهرات خارج ریوی",
      "lead": "سارکوئیدوز یک بیماری سیستمیک است. تظاهرات خارج توراکس برای تفسیر بالینی مهم هستند، حتی اگر تصویربرداری توراکس غالب باشد.",
      "items": [
        {
          "title": "Morbus Jüngling",
          "text": "استئیت کیستیک متعدد با استئولیزهای تونل‌مانند در فالانژهای دست و پا."
        },
        {
          "title": "سارکوئیدوز قلبی",
          "text": "معمولاً با MRI قلب و Late Gadolinium Enhancement تشخیص داده می‌شود؛ خطر آریتمی افزایش می‌یابد."
        },
        {
          "title": "نوروسارکوئیدوز",
          "text": "درگیری عصب فاسیال شایع است."
        },
        {
          "title": "سندرم Heerfordt",
          "text": "ترکیب یووئیت، پاروتیت و فلج فاسیال."
        }
      ],
      "key": "در آریتمی، فلج فاسیال یا ضایعات استخوانی تیپیک باید سارکوئیدوز سیستمیک را در نظر گرفت."
    },
    "dd": {
      "title": "تشخیص‌های افتراقی",
      "lead": "مهم‌ترین کار، افتراق سارکوئیدوز از سایر بیماری‌های پری‌لنفاتیک یا ندولار ریه است.",
      "headers": [
        "DD",
        "نکات علیه سارکوئیدوز"
      ],
      "rows": [
        [
          "سیلیکوز",
          "آن هم پری‌لنفاتیک است و ممکن است Eggshell داشته باشد، اما تماس با گرد و غبار و درگیری لوب فوقانی مهم است"
        ],
        [
          "لنفانژیوز کارسینوماتوز",
          "ضخیم‌شدن سپتای ندولار و نامنظم، اغلب یک‌طرفه یا نامتقارن، بیمار معمولاً بدحال‌تر است"
        ],
        [
          "سل",
          "اغلب نامتقارن، گرانولوم caseating و کاویته؛ Galaxy sign اختصاصی نیست"
        ],
        [
          "لنفوم",
          "لنف‌نودها ممکن است خیلی بزرگ باشند ولی ندول‌های پری‌لنفاتیک تیپیک در پارانشیم معمولاً وجود ندارد"
        ]
      ],
      "compareHeaders": [
        "ویژگی",
        "آزبستوز",
        "سیلیکوز",
        "سارکوئیدوز"
      ],
      "compareRows": [
        [
          "علت",
          "فیبر آزبست",
          "غبار کوارتز",
          "ناشناخته"
        ],
        [
          "توزیع",
          "بازال و ساب‌پلورال",
          "آپیکال / لوب‌های فوقانی",
          "نواحی فوقانی و میانی"
        ],
        [
          "الگو",
          "رتیکولار، بیشتر خطی",
          "ندول‌های شارپ، گاهی کونگلومره",
          "پری‌لنفاتیک، برونکوواسکولار، فیشور/پلور"
        ],
        [
          "پلور",
          "پلاک پلور ± کلسیفیکاسیون",
          "معمولاً طبیعی",
          "معمولاً طبیعی"
        ],
        [
          "لنف‌نود",
          "کم یا ندارد",
          "Eggshell ممکن است",
          "لنفادنوپاتی بی‌هیلار"
        ]
      ],
      "key": "کلسیفیکاسیون Eggshell مخصوص سارکوئیدوز نیست؛ شرح‌حال تماس و الگوی کامل توزیع تعیین‌کننده است."
    },
    "cases": {
      "title": "نمونه کیس‌ها",
      "lead": "کیس‌های کوتاه برای مرور فعال الگوهای مهم.",
      "items": [
        {
          "label": "کیس ۱",
          "title": "لنفادنوپاتی بی‌هیلار متقارن و پارا تراکئال راست",
          "text": "رادیوگرافی یا CT لنف‌نودهای دو هیلوم و ناحیه پارا تراکئال راست را نشان می‌دهد، بدون درگیری قطعی پارانشیم.",
          "answer": "Scadding مرحله I · علامت 1-2-3"
        },
        {
          "label": "کیس ۲",
          "title": "میکروندول‌های پری‌لنفاتیک در امتداد فیشورها",
          "text": "HRCT ندول‌های ۲–۴ میلی‌متری در امتداد فیشورها، پلور و دسته‌های برونکوواسکولار نشان می‌دهد، بیشتر در نواحی فوقانی و میانی.",
          "answer": "الگوی HRCT تیپیک سارکوئیدوز ریوی"
        },
        {
          "label": "کیس ۳",
          "title": "کلسیفیکاسیون Eggshell با سابقه تماس با غبار",
          "text": "کلسیفیکاسیون شبیه پوسته تخم‌مرغ در لنف‌نودها و درگیری لوب فوقانی در فرد با تماس شغلی با غبار کوارتز.",
          "answer": "DD سیلیکوز را در نظر بگیر"
        }
      ]
    },
    "takehome": {
      "title": "Take home message",
      "lead": "مهم‌ترین نکات گزارش‌نویسی برای عمل.",
      "items": [
        {
          "title": "توراکس غالب است",
          "text": "در بیش از ۹۰٪ موارد، ریه یا لنف‌نودهای داخل قفسه سینه درگیر هستند."
        },
        {
          "title": "نکته رادیوگرافی",
          "text": "Scadding I = فقط BHL، II = BHL + پارانشیم، III = پارانشیم بدون BHL، IV = فیبروز."
        },
        {
          "title": "کلید HRCT",
          "text": "میکروندول‌های ۲–۴ میلی‌متری پری‌لنفاتیک در امتداد فیشورها، پلور و دسته‌های برونکوواسکولار."
        },
        {
          "title": "دام DD",
          "text": "Eggshell و Galaxy sign اختصاصی نیستند؛ همیشه سیلیکوز و سل را هم در نظر بگیر."
        }
      ]
    }
  }
}

function localize(value, lang) {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] || value.de || ''
}

function Table({ headers, rows, className = '' }) {
  return (
    <div className={styles.tableWrap}>
      <table className={`${styles.table} ${className}`.trim()}>
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ label, children, type = 'note' }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.calloutCave : ''}`.trim()}>
      <span>{type === 'cave' ? '⚠️' : '💡'} {label}</span>
      <p>{children}</p>
    </div>
  )
}

function CardGrid({ items }) {
  return (
    <div className={styles.cardGrid}>
      {items.map(item => (
        <div key={item.title} className={styles.infoCard}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <section id={id} className={styles.section}>
      <button type="button" className={styles.sectionToggle} onClick={() => setIsOpen(v => !v)} aria-expanded={isOpen}>
        <h2>{title}</h2>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className={styles.sectionBody}>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
        </div>
      )}
    </section>
  )
}

export default function SarkoidosePage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const sectionIds = useMemo(() => copy.sections.map(s => s.id), [copy.sections])
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveId(id) }, { rootMargin: '-20% 0px -70% 0px', threshold: 0.01 })
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sectionIds])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen')}>{copy.breadcrumbThorax}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.heroActions}>
              <Link href={withLang('/ueben/quiz?fach=thorax&n=10&themen=sarkoidose')} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
              <Link href={withLang('/flashcards/sarkoidose')} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div key={card.label} className={styles.statCard}>
                <strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button key={section.id} type="button" onClick={() => scrollTo(section.id)} className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`.trim()}>
              <span>{section.icon}</span>{section.label}
            </button>
          ))}
        </aside>

        <main className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
            <CardGrid items={copy.basics.items} />
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section id="roentgen" title={copy.xray.title} lead={copy.xray.lead}>
            <Table headers={copy.xray.headers} rows={copy.xray.rows} />
            <Callout label={copy.keyLabel}>{copy.xray.key}</Callout>
          </Section>

          <Section id="hrct" title={copy.hrct.title} lead={copy.hrct.lead}>
            <div className={styles.splitGrid}>
              <div>
                <h3 className={styles.subTitle}>{copy.hrct.lymphTitle}</h3>
                <CardGrid items={copy.hrct.lymph} />
              </div>
              <div>
                <h3 className={styles.subTitle}>{copy.hrct.parenchymaTitle}</h3>
                <CardGrid items={copy.hrct.parenchyma} />
              </div>
            </div>
            <h3 className={styles.subTitle}>{copy.hrct.signsTitle}</h3>
            <Table headers={copy.hrct.signHeaders || ['Sign', 'Morphologie', 'Hinweis']} rows={copy.hrct.signRows} />
            <Callout label={copy.keyLabel}>{copy.hrct.key}</Callout>
          </Section>

          <Section id="extrapulmonal" title={copy.extra.title} lead={copy.extra.lead}>
            <CardGrid items={copy.extra.items} />
            <Callout label={copy.keyLabel}>{copy.extra.key}</Callout>
          </Section>

          <Section id="dd" title={copy.dd.title} lead={copy.dd.lead}>
            <Table headers={copy.dd.headers} rows={copy.dd.rows} />
            <Table headers={copy.dd.compareHeaders} rows={copy.dd.compareRows} className={styles.compareTable} />
            <Callout label={copy.keyLabel} type="cave">{copy.dd.key}</Callout>
          </Section>

          <Section id="fallbeispiele" title={copy.cases.title} lead={copy.cases.lead}>
            <div className={styles.caseGrid}>
              {copy.cases.items.map(item => (
                <div key={item.title} className={styles.caseCard}>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <strong>{item.answer}</strong>
                </div>
              ))}
            </div>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeList}>
              {copy.takehome.items.map((item, idx) => (
                <div key={item.title} className={styles.takeHomeItem}>
                  <span>{String(idx + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  )
}
