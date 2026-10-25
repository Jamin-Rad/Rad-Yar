'use client'


import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from '../../gi/divertikulitis/page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const LEARNING_GOALS = [{"de":"Biliäre Abflussstörung und Alkoholmechanismus einordnen sowie das benannte CT-Zeitfenster mit dringlichen Ausnahmen begründen.","en":"Interpret biliary obstruction and alcohol mechanisms and justify the specified CT window and urgent exceptions.","fa":"اختلال تخلیهٔ صفراوی و مکانیسم الکل را تفسیر کنید و بازهٔ مشخص CT و استثناهای فوری را توضیح دهید."},{"de":"Interstitielle und nekrotisierende Formen sowie APFC/Pseudozyste/ANC/WON aus Inhalt, Wand, Zeit und Kontext unterscheiden.","en":"Distinguish interstitial and necrotising forms and APFC/pseudocyst/ANC/WON from contents, wall, time and context.","fa":"انواع بینابینی و نکروزان و نیز APFC/پسودوسیست/ANC/WON را بر پایهٔ محتوا، دیواره، زمان و زمینه افتراق دهید."},{"de":"Den morphologischen CTSI von klinischer Atlanta-Schwere anhand Organversagen und Dauer trennen.","en":"Separate morphological CTSI from clinical Atlanta severity using organ failure and duration.","fa":"CTSI مورفولوژیک را با توجه به نارسایی عضو و مدت آن از شدت بالینی آتلانتا جدا کنید."},{"de":"Arterielle Komplikationen und Infektionshinweise erkennen und bei Gangunterbrechung den vitalen vorgeschalteten Pankreasanteil berücksichtigen.","en":"Recognise arterial complications and infection clues and consider viable upstream pancreas in duct disruption.","fa":"عوارض شریانی و سرنخ‌های عفونت را بشناسید و در قطع مجرا بخش زندهٔ بالادست پانکراس را در نظر بگیرید."},{"de":"Chronische Gang-/Parenchymzeichen und tumorverdächtige Muster gewichten; bei möglicher Autoimmunpankreatitis die notwendige Tumorabklärung vor Steroidprobe benennen.","en":"Weigh chronic ductal/parenchymal and tumour-suspicious patterns; name the required malignancy evaluation before a steroid trial in possible autoimmune pancreatitis.","fa":"الگوهای مزمن مجرا/پارانشیم و الگوهای مشکوک به تومور را بسنجید؛ در احتمال پانکراتیت خودایمنی، بررسی لازم بدخیمی پیش از آزمون استروئید را بیان کنید."}]

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Pankreas · Pankreatitis",
    "title": "Pankreatitis",
    "subtitle": "Akute und chronische Pankreatitis: Atlanta-Klassifikation, CTSI, Komplikationen und wichtige Differenzialdiagnosen",
    "sourceLabel": "Lernnotizen",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Merke",
    "caveLabel": "CAVE",
    "sections": [
      {
        "id": "grundlagen",
        "label": "Klinische Grundlagen",
        "icon": "🧪"
      },
      {
        "id": "atlanta",
        "label": "Atlanta-Klassifikation",
        "icon": "📋"
      },
      {
        "id": "ctsi",
        "label": "CTSI/Balthazar",
        "icon": "🧮"
      },
      {
        "id": "komplikationen",
        "label": "Komplikationen",
        "icon": "⚠️"
      },
      {
        "id": "chronisch",
        "label": "Chronische Pankreatitis",
        "icon": "🧱"
      },
      {
        "id": "dd",
        "label": "Differenzialdiagnosen",
        "icon": "🔎"
      },
      {
        "id": "takehome",
        "label": "Take home message",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "40–50 %",
        "label": "biliär",
        "text": "Choledocholithiasis oder Mikrolithiasis"
      },
      {
        "value": "72–96 h",
        "label": "Schwere Pankreatitis",
        "text": "Erste CT-Beurteilung ab Symptombeginn; früher bei dringlicher Indikation"
      },
      {
        "value": "CTSI 0–10",
        "label": "Schweregrad",
        "text": "Balthazar-Grad plus Nekrose-Score"
      }
    ],
    "basics": {
      "title": "Klinische Grundlagen der akuten Pankreatitis",
      "lead": "Die häufigsten Ursachen sind biliär und alkoholtoxisch. Bildgebung dient nicht nur der Diagnose, sondern vor allem der Einordnung von Morphologie, Nekrose und Komplikationen.",
      "items": [
        {
          "title": "Biliäre Genese",
          "text": "Gallensteine und Mikrolithiasis sind häufige Ursachen. Ein Stein an der Papillenregion kann den pankreatischen Abfluss beeinträchtigen; Choledocholithiasis und Obstruktion gezielt abklären."
        },
        {
          "title": "Alkoholtoxische Genese",
          "text": "Alkohol ist eine wichtige mögliche Ursache; der Anteil variiert zwischen Populationen. Nichtoxidative Alkoholmetaboliten können in experimentellen Modellen Azinuszellen über gestörte Kalziumsignale schädigen. Eine Alkoholanamnese ersetzt keine vollständige Ursachenabklärung."
        },
        {
          "title": "Seltene Ursachen",
          "text": "Weitere Ursachen sind unter anderem Hypertriglyzeridämie, Hyperkalzämie, Medikamente, Autoimmunerkrankung und iatrogene Auslöser. Medikamentenanamnese und zeitlichen Zusammenhang prüfen; eine zeitliche Assoziation allein beweist keine Arzneimittelursache."
        },
        {
          "title": "Post-ERCP",
          "text": "Pankreatitis ist eine wichtige Komplikation nach ERCP. Nach einem Eingriff Schmerzen, Enzyme und den klinischen Verlauf zusammen beurteilen; nicht jede Beschwerde bedeutet automatisch Pankreatitis."
        }
      ],
      "key": "Eine frühe CT kann Nekrose unterschätzen. Bei schwerer Pankreatitis ist die erste kontrastverstärkte CT zur Beurteilung idealerweise 72–96 Stunden nach Symptombeginn vorgesehen; diagnostische Unsicherheit oder dringliche Komplikationen können frühere Bildgebung erfordern."
    },
    "atlanta": {
      "title": "Atlanta-Klassifikation: Morphologie und Kollektionen",
      "lead": "Atlanta trennt die interstitiell-ödematöse von der nekrotisierenden Pankreatitis und benennt peripankreatische Kollektionen nach Morphologie und Zeitverlauf.",
      "morphology": [
        {
          "title": "Interstitiell-ödematös",
          "text": "Diffuse Parenchymschwellung, homogene Kontrastmittelaufnahme und peripankreatisches Fett-Stranding."
        },
        {
          "title": "Nekrotisierend",
          "text": "Nekrose kann pankreatisch, peripankreatisch oder kombiniert sein. Fehlendes Parenchym-Enhancement spricht für pankreatische Nekrose; bei isolierter peripankreatischer Nekrose kann die Drüse normal kontrastieren. Nichtflüssiges nekrotisches Material und Verlauf mitbeurteilen."
        }
      ],
      "collectionHeaders": [
        "Form",
        "< 4 Wochen",
        "> 4 Wochen"
      ],
      "collections": [
        [
          "Ödematöse Pankreatitis",
          "APFC: Acute Peripancreatic Fluid Collection, keine Kapsel",
          "Pseudozyste: definierte Wand/Kapsel, rein flüssig"
        ],
        [
          "Nekrotisierende Pankreatitis",
          "ANC: Acute Necrotic Collection, inhomogen, fest/flüssig gemischt",
          "WON: Walled-Off Necrosis, organisierte Kapsel um Nekroseareal"
        ]
      ],
      "key": "Zeit, Inhalt, Wand und Pankreatitisform gemeinsam beurteilen. APFC ist frühe reine Flüssigkeit bei interstitieller Pankreatitis; ANC enthält Nekrose. Eine reife Wand entsteht gewöhnlich über etwa vier Wochen: reine Flüssigkeit spricht für Pseudozyste, Nekrose für WON."
    },
    "ctsi": {
      "title": "CT-Schweregrad-Index nach Balthazar",
      "lead": "CTSI kombiniert Balthazar-Grad und Nekrose-Score zu 0–10 Punkten; die nachstehende Tabelle folgt der WSES2019-Wiedergabe. Er beschreibt CT-Morphologie, nicht den klinischen Atlanta-Schweregrad. Klinisch schwere akute Pankreatitis verlangt persistierendes Organversagen >48 Stunden.",
      "balthazarHeaders": [
        "Grad",
        "CT-Befund",
        "Punkte"
      ],
      "balthazarRows": [
        [
          "A",
          "Normal",
          "0"
        ],
        [
          "B",
          "Pankreasschwellung",
          "1"
        ],
        [
          "C",
          "Peripankreatisches Fett-Stranding",
          "2"
        ],
        [
          "D",
          "Eine peripankreatische Flüssigkeitskollektion",
          "3"
        ],
        [
          "E",
          "Mindestens zwei Kollektionen oder retroperitoneales Gas",
          "4"
        ]
      ],
      "necrosisHeaders": [
        "Nekrose",
        "Zusatzpunkte"
      ],
      "necrosisRows": [
        [
          "Keine Nekrose",
          "+0 Punkte"
        ],
        [
          "< 30 % Nekrose",
          "+2 Punkte"
        ],
        [
          "30–50 % Nekrose",
          "+4 Punkte"
        ],
        [
          "> 50 % Nekrose",
          "+6 Punkte"
        ]
      ],
      "interpretationHeaders": [
        "CTSI",
        "Interpretation"
      ],
      "interpretationRows": [
        [
          "0–3 Punkte",
          "Niedriger morphologischer CT-Score"
        ],
        [
          "4–6 Punkte",
          "Mittlerer morphologischer CT-Score"
        ],
        [
          "7–10 Punkte",
          "Hoher morphologischer CT-Score; klinische Organfunktion separat einordnen"
        ]
      ]
    },
    "complications": {
      "title": "Komplikationen gezielt suchen",
      "lead": "Komplikationen verändern das Management. Gefäße, Kollektionen, Nekrosen und Gangintegrität müssen aktiv geprüft werden.",
      "items": [
        {
          "title": "Pseudoaneurysma",
          "text": "Umschriebene arterielle Anreicherung in/nahe einer Kollektion mit Anschluss an einen Arterienast ist verdächtig auf ein Pseudoaneurysma. Wegen möglicher Blutung zeitnah fachübergreifend abklären."
        },
        {
          "title": "Venenthrombose",
          "text": "Entzündliche Infiltrate und Druck durch Ödeme verlangsamen den Fluss und reizen die Venenwand. Häufig V. lienalis und V. portae."
        },
        {
          "title": "Infizierte Nekrose",
          "text": "Gas in Nekrose ohne vorausgegangene Intervention oder enterische Fistel ist ein starker Infektionshinweis. Fehlendes Gas schließt eine Infektion nicht aus; Klinik und Verlauf mitbewerten."
        },
        {
          "title": "Gangruptur",
          "text": "T2-gewichtete MRCP beurteilt die Gangkontinuität und mögliche Disconnection. Sekretin-MRCP kann den Nachweis eines Flüssigkeitsaustritts unterstützen; dies ist kein Kontrastmittelextravasat in der Standard-MRCP."
        }
      ],
      "cave": "Ein Pseudoaneurysma darf nicht als „kleine hyperdense Struktur“ übersehen werden: arterielle Phase und Lage zur Kollektion sind entscheidend."
    },
    "chronic": {
      "title": "Chronische Pankreatitis",
      "lead": "Verkalkungen, Parenchymatrophie und unregelmäßige Gangveränderungen stützen chronische Pankreatitis. Eine normale MRT schließt frühe Erkrankung nicht aus.",
      "items": [
        {
          "title": "Pankreasverkalkungen",
          "text": "Intraduktale und parenchymale Verkalkungen können die chronische Pankreatitis stützen; Verteilung und übrige Morphologie gemeinsam beurteilen."
        },
        {
          "title": "Parenchymatrophie",
          "text": "Ausdruck chronischer Destruktion und Fibrose."
        },
        {
          "title": "Ductus pancreaticus",
          "text": "Unregelmäßiges Gangkaliber mit Strikturen und Erweiterungen; Messort und Projektion beachten, statt eine einzelne pauschale Millimetergrenze zu verwenden."
        }
      ],
      "key": "Die Kombination aus Verkalkungen und unregelmäßig erweitertem Gang spricht stark für chronische Pankreatitis."
    },
    "dd": {
      "title": "Wichtige Differenzialdiagnosen",
      "lead": "Chronische Pankreatitis kann ein Karzinom imitieren; Autoimmunpankreatitis kann wie ein Tumor wirken. Gangzeichen und Enhancement-Muster helfen.",
      "headers": [
        "Entität",
        "Hinweise"
      ],
      "rows": [
        [
          "Chronische Pankreatitis",
          "Verkalkungen und ein sichtbar durch die Masse verlaufender, längs verengter Gang (Duct-penetrating-Zeichen) gewichten Entzündung, schließen Karzinom aber nicht sicher aus."
        ],
        [
          "Pankreaskarzinom",
          "Abrupter fokaler Gangabbruch mit vorgeschalteter Atrophie und verdächtigem Gefäßkontakt erhöht den Karzinomverdacht. Ein Karzinom kann auch bei chronischer Pankreatitis mit Verkalkungen auftreten."
        ],
        [
          "Autoimmunpankreatitis Typ 1",
          "Diffuse oder fokale Vergrößerung, kapselartiger Randsaum und verzögerte Anreicherung können passen. Diagnose aus Klinik, Serologie, Bildgebung und gegebenenfalls Histologie; ein diagnostischer Steroidversuch gehört nur in erfahrene Hände nach negativer Malignitätsabklärung."
        ]
      ],
      "cave": "Abrupter Gangabbruch mit vorgeschalteter Atrophie ist malignomverdächtig, auch bei vermuteter Pankreatitis. Bildmorphologie oder Steroidantwort allein darf die gezielte Tumorabklärung nicht ersetzen."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Die wichtigsten Regeln für Prüfung und Befundung.",
      "items": [
        {
          "title": "Ursache mitdenken",
          "text": "Biliär und alkoholtoxisch sind die häufigsten Ursachen; post-ERCP ist iatrogen besonders wichtig."
        },
        {
          "title": "Atlanta korrekt benennen",
          "text": "Interstitiell versus nekrotisierend und APFC/Pseudozyste/ANC/WON nach Zeit und Inhalt unterscheiden."
        },
        {
          "title": "CTSI systematisch",
          "text": "Balthazar plus Nekrose ergibt den morphologischen CT-Score; klinische Atlanta-Schwere separat anhand Organversagen und Verlauf bestimmen."
        },
        {
          "title": "Komplikationen suchen",
          "text": "Gefäßkomplikationen, infizierte Nekrose und Gangunterbrechung gezielt prüfen; klinischen Verlauf und technische Grenzen berücksichtigen."
        },
        {
          "title": "Karzinom nicht verpassen",
          "text": "Abrupter Gangabbruch, Schwanzatrophie und Gefäßinfiltration sprechen gegen reine Pankreatitis."
        }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Pancreas · Pancreatitis",
    "title": "Pancreatitis",
    "subtitle": "Acute and chronic pancreatitis: Atlanta classification, CTSI, complications and key differentials",
    "sourceLabel": "Study notes",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Key point",
    "caveLabel": "Caution",
    "sections": [
      {
        "id": "grundlagen",
        "label": "Clinical basics",
        "icon": "🧪"
      },
      {
        "id": "atlanta",
        "label": "Atlanta classification",
        "icon": "📋"
      },
      {
        "id": "ctsi",
        "label": "CTSI/Balthazar",
        "icon": "🧮"
      },
      {
        "id": "komplikationen",
        "label": "Complications",
        "icon": "⚠️"
      },
      {
        "id": "chronisch",
        "label": "Chronic pancreatitis",
        "icon": "🧱"
      },
      {
        "id": "dd",
        "label": "Differentials",
        "icon": "🔎"
      },
      {
        "id": "takehome",
        "label": "Take home message",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "40–50%",
        "label": "biliary",
        "text": "choledocholithiasis or microlithiasis"
      },
      {
        "value": "72–96 h",
        "label": "Severe pancreatitis",
        "text": "Initial CT assessment from symptom onset; earlier for urgent indications"
      },
      {
        "value": "CTSI 0–10",
        "label": "severity",
        "text": "Balthazar grade plus necrosis score"
      }
    ],
    "basics": {
      "title": "Clinical basics of acute pancreatitis",
      "lead": "The main causes are biliary and alcohol-related. Imaging defines morphology, necrosis and complications.",
      "items": [
        {
          "title": "Biliary cause",
          "text": "Gallstones and microlithiasis are common causes. A stone at the papillary region can impair pancreatic drainage; assess choledocholithiasis and obstruction."
        },
        {
          "title": "Alcohol-related cause",
          "text": "Alcohol is an important possible cause, with frequency varying between populations. In experimental models, nonoxidative alcohol metabolites can injure acinar cells through disturbed calcium signalling. An alcohol history does not replace a full aetiological assessment."
        },
        {
          "title": "Rare causes",
          "text": "Other causes include hypertriglyceridaemia, hypercalcaemia, medication, autoimmune disease and iatrogenic triggers. Review medication exposure and timing; temporal association alone does not establish drug causation."
        },
        {
          "title": "Post-ERCP",
          "text": "Pancreatitis is an important complication after ERCP. After a procedure, interpret pain, enzymes and clinical evolution together; symptoms alone do not automatically establish pancreatitis."
        }
      ],
      "key": "Early CT can underestimate necrosis. In severe pancreatitis, initial contrast-enhanced CT assessment is ideally performed 72–96 hours after symptom onset; diagnostic uncertainty or urgent complications may require earlier imaging."
    },
    "atlanta": {
      "title": "Atlanta classification: morphology and collections",
      "lead": "Atlanta separates interstitial oedematous from necrotising pancreatitis and names peripancreatic collections according to time and content.",
      "morphology": [
        {
          "title": "Interstitial oedematous",
          "text": "Diffuse pancreatic swelling, homogeneous enhancement and peripancreatic fat stranding."
        },
        {
          "title": "Necrotising",
          "text": "Necrosis may be pancreatic, peripancreatic or both. Absent parenchymal enhancement supports pancreatic necrosis; gland enhancement may remain normal with isolated peripancreatic necrosis. Assess nonliquid necrotic contents and evolution."
        }
      ],
      "collectionHeaders": [
        "Type",
        "< 4 weeks",
        "> 4 weeks"
      ],
      "collections": [
        [
          "Oedematous pancreatitis",
          "APFC: acute peripancreatic fluid collection, no capsule",
          "Pseudocyst: defined wall/capsule, purely fluid"
        ],
        [
          "Necrotising pancreatitis",
          "ANC: acute necrotic collection, heterogeneous solid/fluid material",
          "WON: walled-off necrosis, organised capsule around necrosis"
        ]
      ],
      "key": "Assess time, contents, wall and pancreatitis type together. APFC is early pure fluid in interstitial pancreatitis; ANC contains necrosis. A mature wall usually develops over about four weeks: pure fluid favours pseudocyst, necrosis favours WON."
    },
    "ctsi": {
      "title": "CT severity index by Balthazar",
      "lead": "CTSI combines Balthazar grade and necrosis score into 0–10 points; the table below follows the WSES2019 reproduction. It describes CT morphology, not clinical Atlanta severity. Clinically severe acute pancreatitis requires persistent organ failure >48 hours.",
      "balthazarHeaders": [
        "Grade",
        "CT finding",
        "Points"
      ],
      "balthazarRows": [
        [
          "A",
          "Normal",
          "0"
        ],
        [
          "B",
          "Pancreatic swelling",
          "1"
        ],
        [
          "C",
          "Peripancreatic fat stranding",
          "2"
        ],
        [
          "D",
          "One peripancreatic fluid collection",
          "3"
        ],
        [
          "E",
          "At least two collections or retroperitoneal gas",
          "4"
        ]
      ],
      "necrosisHeaders": [
        "Necrosis",
        "Additional points"
      ],
      "necrosisRows": [
        [
          "No necrosis",
          "+0 points"
        ],
        [
          "< 30% necrosis",
          "+2 points"
        ],
        [
          "30–50% necrosis",
          "+4 points"
        ],
        [
          "> 50% necrosis",
          "+6 points"
        ]
      ],
      "interpretationHeaders": [
        "CTSI",
        "Interpretation"
      ],
      "interpretationRows": [
        [
          "0–3 points",
          "Low morphological CT score"
        ],
        [
          "4–6 points",
          "Intermediate morphological CT score"
        ],
        [
          "7–10 points",
          "High morphological CT score; assess clinical organ function separately"
        ]
      ]
    },
    "complications": {
      "title": "Actively search for complications",
      "lead": "Complications alter management. Vessels, collections, necrosis and duct integrity must be reviewed actively.",
      "items": [
        {
          "title": "Pseudoaneurysm",
          "text": "Focal arterial enhancement within/near a collection with continuity to an arterial branch raises concern for a pseudoaneurysm. Obtain timely multidisciplinary evaluation because of possible bleeding."
        },
        {
          "title": "Venous thrombosis",
          "text": "Inflammation and oedema slow flow and irritate adjacent veins. The splenic and portal veins are commonly affected."
        },
        {
          "title": "Infected necrosis",
          "text": "Gas in necrosis without prior intervention or enteric fistula is a strong infection clue. No gas does not exclude infection; assess clinical status and evolution."
        },
        {
          "title": "Duct rupture",
          "text": "T2-weighted MRCP assesses duct continuity and possible disconnection. Secretin-enhanced MRCP may support detection of fluid leakage; this is not contrast extravasation on standard MRCP."
        }
      ],
      "cave": "Do not miss a pseudoaneurysm as a small hyperdense focus: arterial phase and relation to a collection are essential."
    },
    "chronic": {
      "title": "Chronic pancreatitis",
      "lead": "Calcifications, parenchymal atrophy and irregular ductal changes support chronic pancreatitis. Normal MRI does not exclude early disease.",
      "items": [
        {
          "title": "Pancreatic calcifications",
          "text": "Intraductal and parenchymal calcifications can support chronic pancreatitis; assess their distribution and the remaining morphology together."
        },
        {
          "title": "Parenchymal atrophy",
          "text": "Reflects chronic destruction and fibrosis."
        },
        {
          "title": "Pancreatic duct",
          "text": "Irregular duct calibre with strictures and dilatation; consider measurement site and projection rather than one universal millimetre cutoff."
        }
      ],
      "key": "Calcifications plus an irregularly dilated duct strongly support chronic pancreatitis."
    },
    "dd": {
      "title": "Important differential diagnoses",
      "lead": "Chronic pancreatitis may mimic carcinoma; autoimmune pancreatitis may mimic a mass. Duct signs and enhancement patterns help.",
      "headers": [
        "Entity",
        "Clues"
      ],
      "rows": [
        [
          "Chronic pancreatitis",
          "Calcifications and a visibly traversing, longitudinally narrowed duct (duct-penetrating sign) favour inflammation but do not safely exclude carcinoma."
        ],
        [
          "Pancreatic carcinoma",
          "Abrupt focal duct cut-off with upstream atrophy and suspicious vascular contact raises concern for carcinoma. Carcinoma can coexist with calcific chronic pancreatitis."
        ],
        [
          "Autoimmune pancreatitis type 1",
          "Diffuse or focal enlargement, a capsule-like rim and delayed enhancement may fit. Integrate clinical findings, serology, imaging and, when indicated, histology; a diagnostic steroid trial requires specialist supervision after a negative malignancy workup."
        ]
      ],
      "cave": "Abrupt duct cut-off with upstream atrophy raises concern for malignancy even when pancreatitis is suspected. Morphology or steroid response alone must not replace targeted tumour evaluation."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Core rules for exams and reporting.",
      "items": [
        {
          "title": "Think of the cause",
          "text": "Biliary and alcohol-related causes dominate; post-ERCP pancreatitis is the key iatrogenic setting."
        },
        {
          "title": "Name Atlanta correctly",
          "text": "Separate interstitial from necrotising disease and APFC/pseudocyst/ANC/WON by time and content."
        },
        {
          "title": "Use CTSI systematically",
          "text": "Balthazar plus necrosis gives the morphological CT score; assess clinical Atlanta severity separately from organ failure and duration."
        },
        {
          "title": "Search complications",
          "text": "Assess vascular complications, infected necrosis and duct disruption, considering clinical evolution and technical limitations."
        },
        {
          "title": "Do not miss carcinoma",
          "text": "Abrupt duct cut-off, tail atrophy and vascular infiltration argue against pure pancreatitis."
        }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbAbdomen": "شکم",
    "breadcrumbCurrent": "پانکراس · پانکراتیت",
    "title": "پانکراتیت",
    "subtitle": "پانکراتیت حاد و مزمن: طبقه‌بندی آتلانتا، CTSI، عوارض و تشخیص‌های افتراقی مهم",
    "sourceLabel": "یادداشت آموزشی",
    "actionMcq": "MCQ",
    "actionFlash": "فلش‌کارت",
    "keyLabel": "نکته مهم",
    "caveLabel": "احتیاط",
    "sections": [
      {
        "id": "grundlagen",
        "label": "مبانی بالینی",
        "icon": "🧪"
      },
      {
        "id": "atlanta",
        "label": "طبقه‌بندی آتلانتا",
        "icon": "📋"
      },
      {
        "id": "ctsi",
        "label": "CTSI/Balthazar",
        "icon": "🧮"
      },
      {
        "id": "komplikationen",
        "label": "عوارض",
        "icon": "⚠️"
      },
      {
        "id": "chronisch",
        "label": "پانکراتیت مزمن",
        "icon": "🧱"
      },
      {
        "id": "dd",
        "label": "تشخیص افتراقی",
        "icon": "🔎"
      },
      {
        "id": "takehome",
        "label": "نکات کلیدی",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "۴۰–۵۰٪",
        "label": "صفراوی",
        "text": "کلدوکولیتیازیس یا میکرولیتیازیس"
      },
      {
        "value": "۷۲–۹۶ ساعت",
        "label": "پانکراتیت شدید",
        "text": "ارزیابی اولیه CT از شروع علائم؛ زودتر در اندیکاسیون فوری"
      },
      {
        "value": "CTSI 0–10",
        "label": "شدت",
        "text": "گرید Balthazar به‌علاوه امتیاز نکروز"
      }
    ],
    "basics": {
      "title": "مبانی بالینی پانکراتیت حاد",
      "lead": "علل اصلی، صفراوی و الکلی هستند. تصویربرداری برای تعیین مورفولوژی، نکروز و عوارض اهمیت دارد.",
      "items": [
        {
          "title": "علت صفراوی",
          "text": "سنگ صفرا و میکرولیتیازیس از علل شایع‌اند. سنگ ناحیهٔ پاپیلا می‌تواند تخلیهٔ پانکراس را مختل کند؛ کلدوکولیتیاز و انسداد هدفمند بررسی شوند."
        },
        {
          "title": "علت الکلی",
          "text": "الکل علت احتمالی مهمی است و فراوانی آن میان جمعیت‌ها تفاوت دارد. در مدل‌های آزمایشگاهی، متابولیت‌های غیر اکسیداتیو الکل می‌توانند از راه اختلال پیام‌رسانی کلسیم به سلول آسینار آسیب بزنند. سابقهٔ الکل جای ارزیابی کامل علت را نمی‌گیرد."
        },
        {
          "title": "علل نادر",
          "text": "علل دیگر از جمله هیپرتری‌گلیسریدمی، هیپرکلسمی، دارو، بیماری خودایمنی و عوامل یاتروژنیک‌اند. سابقهٔ دارویی و ارتباط زمانی بررسی شوند؛ همراهی زمانی به‌تنهایی علت دارویی را ثابت نمی‌کند."
        },
        {
          "title": "پس از ERCP",
          "text": "پانکراتیت از عوارض مهم ERCP است. پس از مداخله، درد، آنزیم‌ها و سیر بالینی با هم تفسیر شوند؛ هر علامتی خودبه‌خود پانکراتیت را ثابت نمی‌کند."
        }
      ],
      "key": "CT زودهنگام ممکن است نکروز را کمتر نشان دهد. در پانکراتیت شدید، ارزیابی اولیه با CT کنتراست‌دار ترجیحاً ۷۲–۹۶ ساعت پس از شروع علائم انجام می‌شود؛ ابهام تشخیصی یا عوارض فوری ممکن است تصویربرداری زودتر را ضروری کند."
    },
    "atlanta": {
      "title": "طبقه‌بندی آتلانتا: مورفولوژی و تجمعات",
      "lead": "آتلانتا پانکراتیت ادماتوی بینابینی را از نوع نکروزان جدا می‌کند و تجمعات اطراف پانکراس را بر اساس زمان و محتوا نام‌گذاری می‌کند.",
      "morphology": [
        {
          "title": "ادماتوی بینابینی",
          "text": "تورم منتشر پانکراس، تقویت همگن پس از تزریق و استرندینگ چربی اطراف پانکراس."
        },
        {
          "title": "نکروزان",
          "text": "نکروز می‌تواند در پانکراس، اطراف آن یا هر دو باشد. نبود جذب پارانشیم به نفع نکروز پانکراس است؛ در نکروز منفرد اطراف پانکراس، جذب غده می‌تواند طبیعی بماند. محتوای نکروتیک غیرمایع و سیر نیز ارزیابی شوند."
        }
      ],
      "collectionHeaders": [
        "نوع",
        "< ۴ هفته",
        "> ۴ هفته"
      ],
      "collections": [
        [
          "پانکراتیت ادماتوی",
          "APFC: تجمع مایع حاد اطراف پانکراس، بدون کپسول",
          "پسودوسیست: دیواره/کپسول مشخص، کاملاً مایع"
        ],
        [
          "پانکراتیت نکروزان",
          "ANC: تجمع نکروتیک حاد، ناهمگن و مخلوط جامد/مایع",
          "WON: نکروز محصور با کپسول سازمان‌یافته"
        ]
      ],
      "key": "زمان، محتوا، دیواره و نوع پانکراتیت با هم ارزیابی شوند. APFC مایع خالص زودرس در پانکراتیت بینابینی است؛ ANC محتوای نکروتیک دارد. دیوارهٔ بالغ معمولاً طی حدود چهار هفته ایجاد می‌شود: مایع خالص به نفع پسودوسیست و نکروز به نفع WON است."
    },
    "ctsi": {
      "title": "شاخص شدت CT بر اساس Balthazar",
      "lead": "CTSI درجهٔ بالتازار و امتیاز نکروز را در ۰ تا ۱۰ امتیاز ترکیب می‌کند؛ جدول زیر بر پایهٔ بازنشر WSES۲۰۱۹ است. این شاخص مورفولوژی CT را توصیف می‌کند، نه شدت بالینی آتلانتا. پانکراتیت حاد از نظر بالینی شدید نیازمند نارسایی پایدار عضو بیش از ۴۸ ساعت است.",
      "balthazarHeaders": [
        "گرید",
        "یافته CT",
        "امتیاز"
      ],
      "balthazarRows": [
        [
          "A",
          "طبیعی",
          "0"
        ],
        [
          "B",
          "تورم پانکراس",
          "1"
        ],
        [
          "C",
          "stranding چربی اطراف پانکراس",
          "2"
        ],
        [
          "D",
          "یک تجمع مایع اطراف پانکراس",
          "3"
        ],
        [
          "E",
          "حداقل دو تجمع یا گاز رتروپریتوئن",
          "4"
        ]
      ],
      "necrosisHeaders": [
        "نکروز",
        "امتیاز اضافه"
      ],
      "necrosisRows": [
        [
          "بدون نکروز",
          "+0"
        ],
        [
          "نکروز کمتر از ۳۰٪",
          "+2"
        ],
        [
          "نکروز ۳۰–۵۰٪",
          "+4"
        ],
        [
          "نکروز بیش از ۵۰٪",
          "۶+ امتیاز"
        ]
      ],
      "interpretationHeaders": [
        "CTSI",
        "تفسیر"
      ],
      "interpretationRows": [
        [
          "۰–۳ امتیاز",
          "امتیاز مورفولوژیک پایین CT"
        ],
        [
          "۴–۶ امتیاز",
          "امتیاز مورفولوژیک متوسط CT"
        ],
        [
          "۷–۱۰ امتیاز",
          "امتیاز مورفولوژیک بالای CT؛ عملکرد بالینی اعضا جداگانه ارزیابی شود"
        ]
      ]
    },
    "complications": {
      "title": "جست‌وجوی فعال عوارض",
      "lead": "عوارض درمان را تغییر می‌دهند. عروق، تجمعات، نکروز و پیوستگی مجرا باید فعالانه بررسی شوند.",
      "items": [
        {
          "title": "پسودوآنوریسم",
          "text": "جذب کانونی شریانی مادهٔ حاجب داخل/کنار تجمع با اتصال به شاخهٔ شریانی به پسودوآنوریسم مشکوک است. به‌دلیل احتمال خونریزی، بررسی چندتخصصی به‌موقع لازم است."
        },
        {
          "title": "ترومبوز وریدی",
          "text": "التهاب و فشار ادم جریان خون را کند و دیواره ورید را تحریک می‌کند. ورید طحالی و ورید پورت شایع‌تر درگیر می‌شوند."
        },
        {
          "title": "نکروز عفونی",
          "text": "گاز در نکروز بدون مداخلهٔ قبلی یا فیستول روده‌ای سرنخ قوی عفونت است. نبود گاز عفونت را رد نمی‌کند؛ وضعیت بالینی و سیر نیز ارزیابی شوند."
        },
        {
          "title": "پارگی مجرا",
          "text": "MRCP با وزن T2 پیوستگی مجرا و احتمال قطع ارتباط را ارزیابی می‌کند. MRCP با سکرتین ممکن است به شناسایی نشت مایع کمک کند؛ این یافته نشت مادهٔ حاجب در MRCP معمول نیست."
        }
      ],
      "cave": "پسودوآنوریسم نباید با یک کانون هایپردنس کوچک اشتباه گرفته شود؛ فاز شریانی و ارتباط با تجمع بسیار مهم است."
    },
    "chronic": {
      "title": "پانکراتیت مزمن",
      "lead": "کلسیفیکاسیون، آتروفی پارانشیم و تغییرات نامنظم مجرا از پانکراتیت مزمن حمایت می‌کنند. MRI طبیعی بیماری زودرس را رد نمی‌کند.",
      "items": [
        {
          "title": "کلسیفیکاسیون پانکراس",
          "text": "کلسیفیکاسیون داخل‌مجرایی و پارانشیمی می‌تواند از پانکراتیت مزمن حمایت کند؛ توزیع و سایر یافته‌های مورفولوژیک با هم ارزیابی شوند."
        },
        {
          "title": "آتروفی پارانشیم",
          "text": "نشانه تخریب مزمن و فیبروز."
        },
        {
          "title": "مجرای پانکراس",
          "text": "قطر نامنظم مجرا با تنگی و اتساع؛ محل و نمای اندازه‌گیری لحاظ شوند، نه یک مرز میلی‌متری همگانی."
        }
      ],
      "key": "کلسیفیکاسیون همراه با مجرای نامنظم و گشاد به‌شدت به نفع پانکراتیت مزمن است."
    },
    "dd": {
      "title": "تشخیص‌های افتراقی مهم",
      "lead": "پانکراتیت مزمن می‌تواند شبیه کارسینوم باشد؛ پانکراتیت خودایمنی نیز می‌تواند نمای توده‌ای بدهد.",
      "headers": [
        "بیماری",
        "نکات افتراقی"
      ],
      "rows": [
        [
          "پانکراتیت مزمن",
          "کلسیفیکاسیون و مجرای قابل مشاهده‌ای که با تنگی طولانی از توده می‌گذرد (علامت عبور مجرا) بیشتر به نفع التهاب‌اند، اما سرطان را با اطمینان رد نمی‌کنند."
        ],
        [
          "کارسینوم پانکراس",
          "قطع ناگهانی کانونی مجرا همراه آتروفی بالادست و تماس عروقی مشکوک، شک به سرطان را افزایش می‌دهد. سرطان می‌تواند هم‌زمان با پانکراتیت مزمن کلسیفیه وجود داشته باشد."
        ],
        [
          "پانکراتیت خودایمنی نوع ۱",
          "بزرگ‌شدگی منتشر یا کانونی، حاشیهٔ کپسول‌مانند و جذب تأخیری می‌توانند سازگار باشند. تشخیص با ترکیب بالین، سرولوژی، تصویربرداری و در صورت لزوم بافت‌شناسی است؛ آزمون تشخیصی استروئید فقط زیر نظر متخصص باتجربه پس از بررسی منفی بدخیمی انجام می‌شود."
        ]
      ],
      "cave": "قطع ناگهانی مجرا با آتروفی بالادست حتی در شک به پانکراتیت، به بدخیمی مشکوک است. مورفولوژی یا پاسخ به استروئید به‌تنهایی نباید جای بررسی هدفمند تومور را بگیرد."
    },
    "takehome": {
      "title": "نکات کلیدی",
      "lead": "قواعد اصلی برای امتحان و گزارش.",
      "items": [
        {
          "title": "علت را در نظر بگیر",
          "text": "علل صفراوی و الکلی شایع‌ترین‌اند؛ پانکراتیت پس از ERCP علت یاتروژنیک مهم است."
        },
        {
          "title": "آتلانتا را درست نام‌گذاری کن",
          "text": "بینابینی را از نکروزان جدا کن و APFC/پسودوسیست/ANC/WON را بر اساس زمان و محتوا تشخیص بده."
        },
        {
          "title": "CTSI را سیستماتیک حساب کن",
          "text": "بالتازار به‌علاوهٔ نکروز امتیاز مورفولوژیک CT را می‌دهد؛ شدت بالینی آتلانتا جداگانه بر پایهٔ نارسایی عضو و مدت آن تعیین شود."
        },
        {
          "title": "عوارض را فعالانه بجوی",
          "text": "عوارض عروقی، نکروز عفونی و قطع مجرا هدفمند بررسی شوند و سیر بالینی و محدودیت‌های فنی لحاظ شوند."
        },
        {
          "title": "کارسینوم را از دست نده",
          "text": "قطع ناگهانی مجرا، آتروفی دم و درگیری عروقی علیه پانکراتیت ساده است."
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
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{label}</strong>
      <p>{children}</p>
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(false), [id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>
    </section>
  )
}

function Cards({ items }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default function PankreatitisPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('pankreatitis')
  const lessonPath = '/abdomen/pankreas/pankreatitis'
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <LegacyLessonMigration className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang} lessonRoute="/abdomen/pankreas/pankreatitis" lessonId="/abdomen/pankreas/pankreatitis">
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=pankreatitis&from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>{copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/pankreatitis?from=${encodeURIComponent(withLang(lessonPath))}`)} className={styles.actionBtn}>{copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStat} key={card.label}>
                <strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small>
              </div>
            ))}
          </div>
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
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead} migrationChapter>
            <aside><h3>{({de:"Lernziele",en:"Learning goals",fa:"هدف‌های یادگیری"})[lang]}</h3><ul>{LEARNING_GOALS.map((goal,index)=><li key={index}>{goal[lang] || goal.de}</li>)}</ul></aside>
            <Cards items={copy.basics.items} />
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section id="atlanta" title={copy.atlanta.title} lead={copy.atlanta.lead} migrationChapter>
            <Cards items={copy.atlanta.morphology} />
            <Table headers={copy.atlanta.collectionHeaders} rows={copy.atlanta.collections} />
            <Callout label={copy.keyLabel}>{copy.atlanta.key}</Callout>
          </Section>

          <Section id="ctsi" title={copy.ctsi.title} lead={copy.ctsi.lead} migrationChapter>
            <Table headers={copy.ctsi.balthazarHeaders} rows={copy.ctsi.balthazarRows} />
            <Table headers={copy.ctsi.necrosisHeaders} rows={copy.ctsi.necrosisRows} />
            <Table headers={copy.ctsi.interpretationHeaders} rows={copy.ctsi.interpretationRows} />
          </Section>

          <Section id="komplikationen" title={copy.complications.title} lead={copy.complications.lead} migrationChapter>
            <Cards items={copy.complications.items} />
            <Callout type="cave" label={copy.caveLabel}>{copy.complications.cave}</Callout>
          </Section>

          <Section id="chronisch" title={copy.chronic.title} lead={copy.chronic.lead} migrationChapter>
            <Cards items={copy.chronic.items} />
            <Callout label={copy.keyLabel}>{copy.chronic.key}</Callout>
          </Section>

          <Section id="dd" title={copy.dd.title} lead={copy.dd.lead} migrationChapter>
            <Table headers={copy.dd.headers} rows={copy.dd.rows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.dd.cave}</Callout>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead} migrationChapter>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <p><a href="https://gut.bmj.com/content/62/1/102">Revised Atlanta 2012</a> · <a href="https://doi.org/10.1186/s13017-019-0247-0">WSES 2019</a> · <a href="https://gastro.org/clinical-guidance/management-of-pancreatic-necrosis/">AGA: Pancreatic necrosis</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8068672/">Secretin-MRCP expert panel</a> · <a href="https://doi.org/10.1016/j.pan.2025.04.020">IAP 2025</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5349368/">HaPanEU 2017</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8938398/">Japanese AIP 2020/2022</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/11568327/">Ichikawa 2001</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC490004/">Criddle 2004</a></p><div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError}  migrationReadControl/></div>
        </div>
      </div>
    </LegacyLessonMigration>
  )
}
