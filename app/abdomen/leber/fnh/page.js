'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import Image from 'next/image'
import LessonHero from '@/components/LessonHero'
import reference from '@/app/andarun/test/page.module.css'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import styles from './page.module.css'
import InProgressBanner from '@/components/InProgressBanner'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Leber · FNH",
    "title": "Fokale noduläre Hyperplasie (FNH)",
    "subtitle": "Typische und atypische Bildgebung in Sonographie, CT und MRT",
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
        "id": "sono",
        "label": "Sonographie",
        "icon": "🔊"
      },
      {
        "id": "ct",
        "label": "CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRT",
        "icon": "🧲"
      },
      {
        "id": "atypisch",
        "label": "Atypische FNH",
        "icon": "⚠️"
      },
      {
        "id": "takehome",
        "label": "Merksätze",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "2.-häufigste",
        "label": "benigner solider Lebertumor",
        "text": "nach dem Hämangiom"
      },
      {
        "value": "Spoke-wheel",
        "label": "zentrales Gefäß + radiäre Äste",
        "text": "im Doppler"
      },
      {
        "value": "kein Wash-out",
        "label": "kräftige arterielle KM-Aufnahme",
        "text": "T1 C+ Muster"
      }
    ],
    "basics": {
      "title": "Klinische Grundlagen",
      "lead": "Die fokale noduläre Hyperplasie (FNH) ist eine benigne, regenerative Raumforderung der Leber. Sie ist meist asymptomatisch und erfordert in der Regel keine Therapie.",
      "items": [
        {
          "title": "Definition",
          "text": "Benigne regenerative Hyperplasie als lokale Reaktion auf veränderte arterielle Versorgung."
        },
        {
          "title": "Epidemiologie",
          "text": "Nach dem Hämangiom der zweithäufigste gutartige solide Lebertumor; bevorzugt bei jungen bis mittelalten Frauen. Demografie allein unterscheidet FNH und HCA nicht."
        },
        {
          "title": "Typische Lage",
          "text": "Solitäre, meist gut abgrenzbare Raumforderung im Leberparenchym."
        }
      ],
      "key": "Die FNH ist häufig ein Zufallsbefund. Das kombinierte native und dynamische Muster zählt; eine zentrale Narbe unterstützt die Diagnose, ist aber nicht erforderlich.",
      "learningGoals": [
        "FNH als benigne regenerative Läsion einordnen und die Aussagekraft von Demografie und Sonographie begrenzen.",
        "Das typische arterielle und spätere Muster von Angleichung, peripher-nodulärer Auffüllung und echtem Wash-out unterscheiden.",
        "Natives Signal, zentrale Narbe und hepatobiliäre Aufnahme zusammen bewerten, einschließlich fehlender Narbe und HCA-Überlappung.",
        "Sicher typische asymptomatische FNH von unklaren atypischen Befunden trennen und gezielte weitere Einordnung statt automatischer Resektion wählen."
      ],
      "goalsLabel": "Nach dieser Lektion"
    },
    "sono": {
      "title": "Sonographie",
      "lead": "In der Sonographie ist die FNH oft nur subtil von der übrigen Leber abgrenzbar.",
      "tableHeaders": [
        "Merkmal",
        "Typischer Befund"
      ],
      "tableRows": [
        [
          "Begrenzung",
          "meist glatt begrenzt, rund"
        ],
        [
          "Echogenität",
          "meist isoechogen bis leicht hypoechogen"
        ],
        [
          "Doppler",
          "zentrales Gefäß mit radiären Gefäßästen (Spoke-wheel-Muster)"
        ],
        [
          "Konsequenz",
          "bei unauffälligem Befund oft schwer abgrenzbar – MRT zur Charakterisierung"
        ]
      ],
      "key": "Das Spoke-wheel-Muster im Doppler – ein zentrales Gefäß mit radiär abgehenden Ästen – ist ein hilfreicher, aber nicht beweisender Hinweis auf eine FNH."
    },
    "ct": {
      "title": "CT-Diagnostik",
      "lead": "In der CT ist die FNH meist nur diskret von der Leber abgrenzbar.",
      "tableHeaders": [
        "Phase",
        "Befund"
      ],
      "tableRows": [
        [
          "Nativ",
          "meist iso- bis leicht hypodens zur Leber"
        ],
        [
          "Früharteriell",
          "kräftige, homogene Kontrastmittelaufnahme"
        ],
        [
          "Portalvenös/spät",
          "rasche Angleichung an das Leberparenchym, kein Wash-out"
        ],
        [
          "Zentrale Narbe",
          "hypodens nativ, verzögerte Kontrastmittelaufnahme in der Spätphase"
        ]
      ],
      "irisTitle": "Homogenes Enhancement statt Irisblende",
      "irisText": "Im Gegensatz zum Hämangiom füllt sich die FNH früharteriell rasch und homogen auf – ohne periphere noduläre Aufnahme und ohne zentripetale Auffüllung.",
      "key": "Eine Läsion, die früharteriell kräftig und homogen anflutet und sich anschließend dem Leberparenchym angleicht, ist verdächtig auf eine FNH."
    },
    "mri": {
      "title": "MRT-Diagnostik",
      "lead": "Die MRT zeigt das native Signal und das dynamische Kontrastmittelverhalten. Eine hepatobiliäre Kontrastmittelphase kann die Abgrenzung zum hepatozellulären Adenom unterstützen.",
      "sourceNote": "Ergänzende Leitlinien: ACG 2024 zur Bildgebung und EASL 2016 zur Einordnung typischer/atypischer FNH.",
      "figureCaption": "Abdomen.pdf, PDF-S. 14 (Druckseite 13), sichtbare Kennung rID:206026. Zeilenweise von links oben: T2 koronar, T2w axial (Kreis/Pfeil wie im PDF), T1 C+ und T1 C+ nach 10 Minuten. Die genaue dynamische Kontrastmittelphase der T1-C+-Aufnahme ohne Zeitangabe ist nicht bezeichnet.",
      "figureAlt": "Vier Leber-MRT-Bilder aus Abdomen.pdf: T2 koronar, T2 axial mit rotem Kreis und Pfeil an der Läsion, T1 nach Kontrastmittel und T1 nach 10 Minuten.",
      "check": {
        "question": "Welches früharterielle CT-Muster ist für eine typische FNH am ehesten zu erwarten?",
        "choose": "Wähle die beste Antwort.",
        "options": [
          "Diskontinuierliche periphere Kontrastknoten",
          "Kräftige, weitgehend homogene Anreicherung des Läsionsgewebes",
          "Ringförmige Randanreicherung um ein nicht anreicherndes Zentrum",
          "Keine messbare Anreicherung der gesamten Läsion"
        ],
        "answer": 1,
        "correctFeedback": "Richtig.",
        "incorrectFeedback": "Noch nicht.",
        "explanation": "Typische FNH zeigt eine rasche kräftige arterielle Anreicherung; eine zentrale Narbe kann davon ausgespart sein. Die Einordnung benötigt auch spätere Phasen und natives Signal.",
        "wrongExplanations": [
          "Diskontinuierliche periphere Knoten mit späterer zentripetaler Auffüllung passen eher zum klassischen Hämangiommuster.",
          "",
          "Eine ringförmige Randanreicherung ist ein anderes Muster als die arterielle Anreicherung des FNH-Gewebes und erfordert eine andere Differenzialdiagnose.",
          "Fehlende Anreicherung passt nicht zur typischen hypervaskulären FNH. Die solide oder flüssige Natur und weitere Sequenzen sind zu prüfen."
        ]
      },
      "tableHeaders": [
        "Sequenz",
        "Typischer Befund",
        "Praktische Bedeutung"
      ],
      "tableRows": [
        [
          "T1 nativ",
          "iso- bis leicht hypointens zum Leberparenchym",
          "unspezifisch"
        ],
        [
          "T2",
          "iso- bis leicht hyperintens zum Leberparenchym",
          "Läsion oft nur diskret abgrenzbar"
        ],
        [
          "T1 C+ arteriell",
          "scharf abgrenzbare, homogene, kräftige Kontrastmittelaufnahme",
          "Schlüsselbefund"
        ],
        [
          "T1 C+ portalvenös/spät",
          "fehlendes Wash-out, iso- bis leicht hyperintens",
          "passt zum typischen Muster, ist allein aber kein Ausschluss anderer Läsionen"
        ],
        [
          "Hepatobiliäre Phase",
          "FNH meist iso- bis hyperintens; Adenome häufiger hypointens",
          "ACG 2024 empfiehlt multiphasische MRT mit hepatobiliär-spezifischem Kontrastmittel zur Abgrenzung; Subtypen und Ausnahmen beachten"
        ],
        [
          "Zentrale Narbe – T2",
          "hyperintens",
          "charakteristisch, aber nicht obligat; besonders in kleinen Läsionen nicht erkennbar"
        ],
        [
          "Zentrale Narbe – T1 C+ spät",
          "verzögerte Kontrastmittelaufnahme",
          "bei extrazellulärem Kontrastmittel; von hepatobiliärer Aufnahme des Läsionsgewebes unterscheiden"
        ]
      ],
      "lightBulbTitle": "Zentrale Narbe",
      "lightBulbText": "Eine erkennbare zentrale Narbe ist meist T2-hyperintens und T1-hypointens und reichert extrazelluläres Kontrastmittel verzögert an. Sie kann fehlen oder nicht erkennbar sein, besonders bei kleinen FNH.",
      "dwiTitle": "Hepatobiliäre Phase und Adenom",
      "dwiText": "Die hepatobiliäre Phase unterstützt die FNH/HCA-Abgrenzung. Auch bestimmte HCA-Subtypen können iso-/hyperintens sein; HBP-Helligkeit allein beweist FNH nicht. Bei vermuteter FNH empfiehlt ACG zur HCA-Abgrenzung eine multiphasische MRT mit hepatobiliär-spezifischem Kontrastmittel.",
      "key": "Kräftige homogene arterielle Kontrastmittelaufnahme + fehlendes Wash-out + ggf. zentrale Narbe = typisches Muster der FNH."
    },
    "atypical": {
      "title": "Atypische FNH",
      "lead": "Abweichungen vom typischen Gesamtmuster erschweren die Abgrenzung zu HCA und anderen Leberläsionen. Eine fehlende Narbe allein ist kein Malignitätsbeweis.",
      "tableHeaders": [
        "Merkmal",
        "Typische FNH",
        "Atypische FNH"
      ],
      "tableRows": [
        [
          "Zentrale Narbe",
          "charakteristisch, nicht obligat",
          "kann fehlen"
        ],
        [
          "Erscheinungsbild",
          "homogen",
          "heterogen"
        ],
        [
          "Kapsel",
          "keine echte Kapsel",
          "Pseudokapsel möglich"
        ],
        [
          "Narbenanreicherung",
          "verzögerte Anreicherung mit extrazellulärem Kontrastmittel",
          "fehlende Narbenanreicherung"
        ],
        [
          "Fett",
          "typischerweise kein Fett; Ausnahmen möglich",
          "intraläsionales Fett möglich"
        ]
      ],
      "cave": "Bleibt die Zuordnung nach technisch ausreichender, geeigneter Bildgebung unklar, folgt die spezialisierte MDT-Einordnung; gegebenenfalls wird eine gezielte Biopsie erwogen. Heterogenität, Fett oder fehlende Narbe allein sind keine automatische Resektionsindikation.",
      "key": "Sicher typische asymptomatische FNH: keine Behandlung oder Routinekontrolle. EASL nennt vaskuläre Lebererkrankungen als Ausnahme. Unklare atypische Befunde und relevante Symptome getrennt spezialisiert beurteilen."
    },
    "takehome": {
      "title": "Merksätze",
      "lead": "Die wichtigsten Befundungsregeln für die Praxis.",
      "items": [
        {
          "title": "Definition",
          "text": "Benigne regenerative Läsion; Alter und Geschlecht allein sichern die Diagnose nicht."
        },
        {
          "title": "Kontrastmittelmuster",
          "text": "Kräftige, homogene arterielle KM-Aufnahme ohne typisches Wash-out passt zur FNH; das Muster allein schließt ein HCC nicht aus."
        },
        {
          "title": "Zentrale Narbe",
          "text": "Wenn erkennbar meist T2-hell, T1-dunkel und extrazellulär verzögert anreichernd; nicht obligat. Hepatobiliäre Aufnahme des FNH-Gewebes ist ein anderer Befund."
        },
        {
          "title": "Sicherheit entscheidet über das Vorgehen",
          "text": "Sicher typisch und asymptomatisch: keine Routinekontrolle (vaskuläre Lebererkrankung ausnehmen). Bleibt die Bildgebung atypisch oder unklar, MDT und gegebenenfalls Biopsie statt automatischer Resektion."
        }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbAbdomen": "Abdomen",
    "breadcrumbCurrent": "Liver · FNH",
    "title": "Focal Nodular Hyperplasia (FNH)",
    "subtitle": "Typical and atypical imaging in ultrasound, CT and MRI",
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
        "id": "sono",
        "label": "Ultrasound",
        "icon": "🔊"
      },
      {
        "id": "ct",
        "label": "CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRI",
        "icon": "🧲"
      },
      {
        "id": "atypisch",
        "label": "Atypical FNH",
        "icon": "⚠️"
      },
      {
        "id": "takehome",
        "label": "Take-home rules",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "2nd most common",
        "label": "benign solid liver tumour",
        "text": "after haemangioma"
      },
      {
        "value": "Spoke-wheel",
        "label": "central vessel + radiating branches",
        "text": "on Doppler"
      },
      {
        "value": "no wash-out",
        "label": "strong arterial enhancement",
        "text": "T1 C+ pattern"
      }
    ],
    "basics": {
      "title": "Clinical basics",
      "lead": "Focal nodular hyperplasia (FNH) is a benign, regenerative liver lesion. It is usually asymptomatic and generally does not require treatment.",
      "items": [
        {
          "title": "Definition",
          "text": "Benign regenerative hyperplasia as a local response to altered arterial supply."
        },
        {
          "title": "Epidemiology",
          "text": "The second most common benign solid liver tumour after haemangioma; predominantly in young to middle-aged women. Demographics alone do not distinguish FNH from HCA."
        },
        {
          "title": "Typical location",
          "text": "Solitary, usually well-defined lesion within the liver parenchyma."
        }
      ],
      "key": "FNH is often incidental. Combined native and dynamic features matter; a central scar supports diagnosis but is not required.",
      "learningGoals": [
        "Recognise FNH as a benign regenerative lesion and limit inferences from demographics and ultrasound.",
        "Distinguish typical arterial and later equalisation from peripheral nodular fill-in and true washout.",
        "Integrate native signal, central scar and hepatobiliary uptake, including absent scars and HCA overlap.",
        "Separate confidently typical asymptomatic FNH from indeterminate atypical findings and choose targeted evaluation rather than automatic resection."
      ],
      "goalsLabel": "After this lesson"
    },
    "sono": {
      "title": "Ultrasound",
      "lead": "On ultrasound, FNH is often only subtly different from the surrounding liver.",
      "tableHeaders": [
        "Feature",
        "Typical finding"
      ],
      "tableRows": [
        [
          "Margins",
          "usually well-defined, round"
        ],
        [
          "Echogenicity",
          "usually isoechoic to mildly hypoechoic"
        ],
        [
          "Doppler",
          "central vessel with radiating branches (spoke-wheel pattern)"
        ],
        [
          "Consequence",
          "often hard to delineate when inconspicuous – MRI for characterisation"
        ]
      ],
      "key": "The spoke-wheel pattern on Doppler – a central vessel with radiating branches – is a helpful but not definitive sign of FNH."
    },
    "ct": {
      "title": "CT diagnosis",
      "lead": "On CT, FNH is often only subtly different from the liver.",
      "tableHeaders": [
        "Phase",
        "Finding"
      ],
      "tableRows": [
        [
          "Non-contrast",
          "usually iso- to mildly hypodense to the liver"
        ],
        [
          "Early arterial",
          "strong, homogeneous enhancement"
        ],
        [
          "Portal venous/delayed",
          "rapid equalisation with the liver parenchyma, no wash-out"
        ],
        [
          "Central scar",
          "hypodense on non-contrast, delayed enhancement"
        ]
      ],
      "irisTitle": "Homogeneous enhancement instead of iris diaphragm",
      "irisText": "Unlike haemangioma, FNH enhances rapidly and homogeneously in the early arterial phase – without peripheral nodular enhancement or centripetal fill-in.",
      "key": "A lesion that enhances strongly and homogeneously in the early arterial phase and then equalises with the liver parenchyma is suspicious for FNH."
    },
    "mri": {
      "title": "MRI diagnosis",
      "lead": "MRI shows native signal and dynamic enhancement. A hepatobiliary contrast phase can help distinguish FNH from hepatocellular adenoma.",
      "figureCaption": "Abdomen.pdf, PDF p. 14 (printed p. 13), visible identifier rID:206026. In reading order: coronal T2, axial T2w (circle/arrow as marked in the PDF), post-contrast T1 and post-contrast T1 after 10 minutes. The exact dynamic phase of the untimed T1 C+ image is not labelled.",
      "sourceNote": "Supplemental guidance: ACG 2024 on imaging and EASL 2016 on typical and atypical FNH management.",
      "figureAlt": "Four liver MRI images from Abdomen.pdf: coronal T2, axial T2 with a red circle and arrow at the lesion, post-contrast T1, and T1 after 10 minutes.",
      "check": {
        "question": "Which early arterial CT pattern is most expected in typical FNH?",
        "choose": "Choose the best answer.",
        "options": [
          "Discontinuous peripheral enhancing nodules",
          "Avid, largely homogeneous enhancement of the lesion tissue",
          "Rim enhancement around a nonenhancing centre",
          "No measurable enhancement throughout the lesion"
        ],
        "answer": 1,
        "correctFeedback": "Correct.",
        "incorrectFeedback": "Not quite.",
        "explanation": "Typical FNH enhances rapidly and avidly in the arterial phase; a central scar may remain unenhanced. Interpretation also requires later phases and native signal.",
        "wrongExplanations": [
          "Discontinuous peripheral nodules followed by centripetal fill-in favour the classic haemangioma pattern.",
          "",
          "Rim enhancement differs from arterial enhancement of FNH tissue and requires a different differential diagnosis.",
          "Absent enhancement does not fit typical hypervascular FNH. Solid versus fluid nature and other sequences need assessment."
        ]
      },
      "tableHeaders": [
        "Sequence",
        "Typical finding",
        "Practical meaning"
      ],
      "tableRows": [
        [
          "Native T1",
          "iso- to mildly hypointense to liver parenchyma",
          "non-specific"
        ],
        [
          "T2",
          "iso- to mildly hyperintense to liver parenchyma",
          "lesion often only subtly visible"
        ],
        [
          "T1 C+ arterial",
          "sharply defined, homogeneous, strong enhancement",
          "key finding"
        ],
        [
          "T1 C+ portal venous/delayed",
          "no wash-out, iso- to mildly hyperintense",
          "fits the typical pattern but does not by itself exclude other lesions"
        ],
        [
          "Hepatobiliary phase",
          "FNH is usually iso- to hyperintense; adenomas are more often hypointense",
          "ACG 2024 recommends multiphase MRI with hepatobiliary-specific contrast to distinguish them; consider subtype and exceptions"
        ],
        [
          "Central scar – T2",
          "hyperintense",
          "characteristic but not obligatory; may not be visible especially in small lesions"
        ],
        [
          "Central scar – T1 C+ delayed",
          "delayed enhancement",
          "with extracellular contrast; distinguish from hepatobiliary uptake of lesion tissue"
        ]
      ],
      "lightBulbTitle": "Central scar",
      "lightBulbText": "A visible central scar is usually T2 hyperintense and T1 hypointense and shows delayed enhancement with extracellular contrast. It may be absent or not visible, particularly in small FNH.",
      "dwiTitle": "Hepatobiliary phase and adenoma",
      "dwiText": "The hepatobiliary phase supports FNH/HCA differentiation. Certain HCA subtypes can also be iso-/hyperintense; HBP brightness alone does not prove FNH. When FNH is suspected, ACG recommends multiphase MRI with hepatobiliary-specific contrast to distinguish it from HCA.",
      "key": "Strong homogeneous arterial enhancement + no wash-out + possible central scar = typical pattern of FNH."
    },
    "atypical": {
      "title": "Atypical FNH",
      "lead": "Departures from the typical combined pattern make distinction from HCA and other liver lesions more difficult. An absent scar alone does not prove malignancy.",
      "tableHeaders": [
        "Feature",
        "Typical FNH",
        "Atypical FNH"
      ],
      "tableRows": [
        [
          "Central scar",
          "characteristic, not obligatory",
          "may be absent"
        ],
        [
          "Appearance",
          "homogeneous",
          "heterogeneous"
        ],
        [
          "Capsule",
          "no true capsule",
          "pseudocapsule possible"
        ],
        [
          "Scar enhancement",
          "delayed enhancement with extracellular contrast",
          "absent scar enhancement"
        ],
        [
          "Fat",
          "usually no fat; exceptions occur",
          "intralesional fat possible"
        ]
      ],
      "cave": "If classification remains uncertain after technically adequate, appropriate imaging, obtain specialist MDT review; targeted biopsy may be considered. Heterogeneity, fat or an absent scar alone do not automatically indicate resection.",
      "key": "Confidently typical asymptomatic FNH: no treatment or routine follow-up. EASL identifies vascular liver disease as an exception. Indeterminate atypical findings and relevant symptoms need separate specialist assessment."
    },
    "takehome": {
      "title": "Take-home rules",
      "lead": "The most important reporting rules for practice.",
      "items": [
        {
          "title": "Definition",
          "text": "Benign regenerative lesion; age and sex alone do not establish the diagnosis."
        },
        {
          "title": "Enhancement pattern",
          "text": "Strong, homogeneous arterial enhancement without typical wash-out fits FNH; the pattern alone does not exclude HCC."
        },
        {
          "title": "Central scar",
          "text": "When visible, usually T2 bright, T1 dark and delayed-enhancing with extracellular contrast; not obligatory. Hepatobiliary uptake of FNH tissue is a different finding."
        },
        {
          "title": "Diagnostic certainty guides management",
          "text": "Confidently typical and asymptomatic: no routine follow-up (except underlying vascular liver disease). If imaging remains atypical or uncertain, MDT review and possible biopsy rather than automatic resection."
        }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbAbdomen": "شکم",
    "breadcrumbCurrent": "کبد · FNH",
    "title": "هیپرپلازی ندولار فوکال (FNH)",
    "subtitle": "تصویربرداری تیپیک و آتیپیک در سونوگرافی، CT و MRI",
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
        "id": "sono",
        "label": "سونوگرافی",
        "icon": "🔊"
      },
      {
        "id": "ct",
        "label": "CT",
        "icon": "🩻"
      },
      {
        "id": "mrt",
        "label": "MRI",
        "icon": "🧲"
      },
      {
        "id": "atypisch",
        "label": "FNH آتیپیک",
        "icon": "⚠️"
      },
      {
        "id": "takehome",
        "label": "نکته‌های کلیدی",
        "icon": "💡"
      }
    ],
    "heroCards": [
      {
        "value": "دومین شایع‌ترین",
        "label": "تومور جامد خوش‌خیم کبد",
        "text": "بعد از همانژیوم"
      },
      {
        "value": "Spoke-wheel",
        "label": "عروق مرکزی + شاخه‌های رادیال",
        "text": "در داپلر"
      },
      {
        "value": "بدون واش‌اوت",
        "label": "تقویت شریانی قوی",
        "text": "الگوی T1 C+"
      }
    ],
    "basics": {
      "title": "مبانی بالینی",
      "lead": "هیپرپلازی ندولار فوکال (FNH) یک ضایعه خوش‌خیم و رژنراتیو کبد است. معمولاً بدون علامت است و معمولاً نیاز به درمان ندارد.",
      "items": [
        {
          "title": "تعریف",
          "text": "هیپرپلازی رژنراتیو خوش‌خیم به‌عنوان پاسخ موضعی به خون‌رسانی شریانی تغییریافته."
        },
        {
          "title": "اپیدمیولوژی",
          "text": "پس از همانژیوم، دومین تومور جامد خوش‌خیم شایع کبد؛ بیشتر در زنان جوان تا میانسال. جمعیت‌شناسی به‌تنهایی FNH را از HCA جدا نمی‌کند."
        },
        {
          "title": "محل تیپیک",
          "text": "ضایعه منفرد و معمولاً خوش‌حد در پارانشیم کبد."
        }
      ],
      "key": "FNH اغلب اتفاقی کشف می‌شود. مجموعهٔ ویژگی‌های پایه و دینامیک اهمیت دارد؛ اسکار مرکزی از تشخیص حمایت می‌کند، اما الزامی نیست.",
      "learningGoals": [
        "FNH را ضایعه‌ای خوش‌خیم و رژنراتیو بدانید و استنباط از جمعیت‌شناسی و سونوگرافی را محدود کنید.",
        "الگوی شریانی و تطابق بعدی را از پرشدگی ندولار محیطی و واش‌اوت واقعی تفکیک کنید.",
        "سیگنال پایه، اسکار مرکزی و جذب هپاتوبیلیاری را با توجه به اسکار غایب و همپوشانی با HCA یکجا بسنجید.",
        "FNH بی‌علامت و با تشخیص تیپیک مطمئن را از یافتهٔ آتیپیک نامشخص جدا کنید و بررسی هدفمند را به‌جای رزکسیون خودکار برگزینید."
      ],
      "goalsLabel": "پس از این درس"
    },
    "sono": {
      "title": "سونوگرافی",
      "lead": "در سونوگرافی، FNH اغلب فقط به‌طور خفیف از بافت کبد قابل افتراق است.",
      "tableHeaders": [
        "ویژگی",
        "یافته تیپیک"
      ],
      "tableRows": [
        [
          "حاشیه",
          "معمولاً واضح و گرد"
        ],
        [
          "اکوژنیسیته",
          "معمولاً ایزواکوژن تا کمی هیپواکوژن"
        ],
        [
          "داپلر",
          "عروق مرکزی با شاخه‌های رادیال (الگوی spoke-wheel)"
        ],
        [
          "نتیجه",
          "اغلب با ظاهر غیراختصاصی، افتراق دشوار است – MRI برای کاراکتریزاسیون"
        ]
      ],
      "key": "الگوی spoke-wheel در داپلر، یعنی یک رگ مرکزی با شاخه‌های شعاعی، یافته‌ای کمک‌کننده اما غیرقطعی برای FNH است."
    },
    "ct": {
      "title": "تشخیص در CT",
      "lead": "در CT، FNH اغلب فقط به‌طور خفیف از کبد قابل افتراق است.",
      "tableHeaders": [
        "فاز",
        "یافته"
      ],
      "tableRows": [
        [
          "بدون کنتراست",
          "معمولاً ایزودنس تا کمی هیپودنس نسبت به کبد"
        ],
        [
          "شریانی زودرس",
          "تقویت پس از تزریق قوی و هموژن"
        ],
        [
          "پورتال/تأخیری",
          "تطابق سریع با پارانشیم کبد، بدون واش‌اوت"
        ],
        [
          "اسکار مرکزی",
          "هیپودنس در فاز بدون کنتراست، تقویت تأخیری"
        ]
      ],
      "irisTitle": "تقویت همگن در برابر ندول‌های محیطی همانژیوم",
      "irisText": "برخلاف همانژیوم، FNH در فاز شریانی زودرس به‌سرعت و به‌صورت هموژن تقویت پس از تزریق می‌یابد – بدون تقویت پس از تزریق ندولار محیطی یا پرشدگی مرکزگرا.",
      "key": "ضایعه‌ای که در فاز شریانی زودرس تقویت پس از تزریق قوی و هموژن دارد و سپس با پارانشیم کبد تطابق می‌یابد، به نفع FNH است."
    },
    "mri": {
      "title": "تشخیص در MRI",
      "lead": "MRI سیگنال پایه و رفتار تقویت پویای مادهٔ حاجب را نشان می‌دهد. فاز هپاتوبیلیاری می‌تواند به افتراق FNH از آدنوم هپاتوسلولار کمک کند.",
      "figureCaption": "Abdomen.pdf، صفحهٔ PDF شمارهٔ ۱۴ (صفحهٔ چاپی ۱۳)، شناسهٔ قابل‌مشاهده rID:206026. به‌ترتیب ردیفی: T2 کرونال، T2 محوری (دایره/پیکان مطابق PDF)، T1 پس از تزریق و T1 پس از تزریق در تأخیر ۱۰ دقیقه‌ای. فاز پویای دقیقِ تصویر T1 C+ که زمان ندارد، مشخص نشده است.",
      "sourceNote": "راهنمای تکمیلی: ACG 2024 برای تصویربرداری و EASL 2016 برای ارزیابی FNH تیپیک و آتیپیک.",
      "figureAlt": "چهار تصویر MRI کبد از Abdomen.pdf: T2 کرونال، T2 محوری با دایره و پیکان قرمز روی ضایعه، T1 پس از تزریق و T1 پس از ۱۰ دقیقه.",
      "check": {
        "question": "کدام الگوی CT شریانی زودرس بیشتر برای FNH تیپیک انتظار می‌رود؟",
        "choose": "بهترین پاسخ را انتخاب کنید.",
        "options": [
          "ندول‌های محیطی ناپیوسته با جذب مادهٔ حاجب",
          "جذب واضح و عمدتاً همگن مادهٔ حاجب در بافت ضایعه",
          "جذب حلقوی حاشیه‌ای پیرامون مرکز فاقد جذب",
          "نبود جذب قابل‌اندازه‌گیری در سراسر ضایعه"
        ],
        "answer": 1,
        "correctFeedback": "درست است.",
        "incorrectFeedback": "هنوز درست نیست.",
        "explanation": "FNH تیپیک در فاز شریانی سریع و واضح مادهٔ حاجب می‌گیرد؛ اسکار مرکزی ممکن است در این فاز جذب نداشته باشد. تفسیر به فازهای بعدی و سیگنال پایه نیز نیاز دارد.",
        "wrongExplanations": [
          "ندول‌های محیطی ناپیوسته با پرشدگی مرکزگرای بعدی بیشتر با الگوی کلاسیک همانژیوم سازگارند.",
          "",
          "جذب حلقوی حاشیه‌ای با جذب شریانی بافت FNH متفاوت است و افتراق دیگری می‌طلبد.",
          "نبود جذب با FNH تیپیک پرعروق سازگار نیست؛ ماهیت جامد یا مایع و سایر توالی‌ها باید بررسی شوند."
        ]
      },
      "tableHeaders": [
        "سکانس",
        "یافته تیپیک",
        "معنای عملی"
      ],
      "tableRows": [
        [
          "T1 نیتیو",
          "ایزو تا کمی هیپواینتنس نسبت به پارانشیم کبد",
          "غیراختصاصی"
        ],
        [
          "T2",
          "ایزو تا کمی هایپراینتنس نسبت به پارانشیم کبد",
          "ضایعه اغلب فقط به‌طور خفیف قابل مشاهده است"
        ],
        [
          "T1 C+ شریانی",
          "تقویت پس از تزریق واضح، هموژن و قوی",
          "یافته کلیدی"
        ],
        [
          "T1 C+ پورتال/تأخیری",
          "بدون واش‌اوت، ایزو تا کمی هایپراینتنس",
          "با الگوی تیپیک سازگار است، اما به‌تنهایی ضایعات دیگر را رد نمی‌کند"
        ],
        [
          "فاز هپاتوبیلیاری",
          "FNH معمولاً ایزو تا هایپراینتنس؛ آدنوم‌ها بیشتر هیپواینتنس",
          "ACG 2024 برای افتراق از آدنوم، MRI چندفازی با ماده حاجب اختصاصی هپاتوبیلیاری را توصیه می‌کند؛ زیرگروه‌ها و استثناها را در نظر بگیرید"
        ],
        [
          "اسکار مرکزی – T2",
          "هایپراینتنس",
          "مشخصهٔ ضایعه، اما الزامی نیست؛ به‌ویژه در ضایعات کوچک ممکن است دیده نشود"
        ],
        [
          "اسکار مرکزی – T1 C+ تأخیری",
          "تقویت تأخیری",
          "با مادهٔ حاجب خارج‌سلولی؛ با جذب هپاتوبیلیاری بافت ضایعه متفاوت است"
        ]
      ],
      "lightBulbTitle": "اسکار مرکزی",
      "lightBulbText": "اسکار مرکزی قابل‌مشاهده معمولاً در T2 هایپرسیگنال و در T1 هیپوسیگنال است و مادهٔ حاجب خارج‌سلولی را با تأخیر جذب می‌کند. اسکار ممکن است وجود نداشته باشد یا دیده نشود، به‌ویژه در FNH کوچک.",
      "dwiTitle": "فاز هپاتوبیلیاری و آدنوم",
      "dwiText": "فاز هپاتوبیلیاری به افتراق FNH از HCA کمک می‌کند. برخی زیرگروه‌های HCA نیز می‌توانند ایزو/هایپرسیگنال باشند؛ روشن‌بودن HBP به‌تنهایی FNH را ثابت نمی‌کند. هنگام شک به FNH، راهنمای ACG برای افتراق از HCA انجام MRI چندفازی با مادهٔ حاجب اختصاصی هپاتوبیلیاری را توصیه می‌کند.",
      "key": "تقویت شریانی قوی و هموژن + بدون واش‌اوت + احتمال اسکار مرکزی = الگوی تیپیک FNH."
    },
    "atypical": {
      "title": "FNH آتیپیک",
      "lead": "انحراف از مجموعهٔ الگوی تیپیک، افتراق از HCA و سایر ضایعات کبدی را دشوار می‌کند. نبود اسکار به‌تنهایی بدخیمی را ثابت نمی‌کند.",
      "tableHeaders": [
        "ویژگی",
        "FNH تیپیک",
        "FNH آتیپیک"
      ],
      "tableRows": [
        [
          "اسکار مرکزی",
          "مشخصهٔ ضایعه، نه الزامی",
          "ممکن است وجود نداشته باشد"
        ],
        [
          "ظاهر",
          "هموژن",
          "هتروژن"
        ],
        [
          "کپسول",
          "کپسول واقعی ندارد",
          "پسودوکپسول ممکن است"
        ],
        [
          "تقویت پس از تزریق اسکار",
          "جذب تأخیری با مادهٔ حاجب خارج‌سلولی",
          "فقدان تقویت اسکار"
        ],
        [
          "چربی",
          "معمولاً بدون چربی؛ استثناها ممکن‌اند",
          "چربی داخل ضایعه ممکن است"
        ]
      ],
      "cave": "اگر پس از تصویربرداری مناسب با کیفیت کافی تعیین ماهیت نامشخص بماند، ارزیابی در تیم تخصصی انجام می‌شود و ممکن است بیوپسی هدفمند مطرح شود. ناهمگنی، چربی یا نبود اسکار به‌تنهایی اندیکاسیون خودکار رزکسیون نیستند.",
      "key": "FNH بی‌علامت و تیپیک با تشخیص مطمئن: بدون درمان یا پیگیری روتین. EASL بیماری عروقی کبد را استثنا می‌داند. یافته‌های آتیپیک نامشخص و علائم مرتبط نیازمند ارزیابی تخصصی جداگانه‌اند."
    },
    "takehome": {
      "title": "نکته‌های کلیدی",
      "lead": "مهم‌ترین قوانین گزارش‌نویسی برای عمل روزمره.",
      "items": [
        {
          "title": "تعریف",
          "text": "ضایعهٔ رژنراتیو خوش‌خیم؛ سن و جنس به‌تنهایی تشخیص را قطعی نمی‌کنند."
        },
        {
          "title": "الگوی تقویت پس از تزریق",
          "text": "تقویت شریانی قوی و هموژن بدون واش‌اوت تیپیک با FNH سازگار است؛ این الگو به‌تنهایی HCC را رد نمی‌کند."
        },
        {
          "title": "اسکار مرکزی",
          "text": "در صورت مشاهده معمولاً در T2 روشن و T1 تیره، با جذب تأخیری خارج‌سلولی؛ الزامی نیست. جذب هپاتوبیلیاری بافت FNH یافتهٔ دیگری است."
        },
        {
          "title": "اطمینان تشخیصی راهنمای مدیریت است",
          "text": "تیپیک، بی‌علامت و با تشخیص مطمئن: بدون پیگیری روتین، با استثنای بیماری زمینه‌ای عروقی کبد. در تصویربرداری آتیپیک یا نامشخص، ارزیابی تیمی و احتمال بیوپسی به‌جای رزکسیون خودکار."
        }
      ]
    }
  }
}


const CASE_COPY = {
  de: {
    label: 'Weiterführende Quellen',
    title: 'Weiterführende Quellen',
    lead: 'Hintergrundartikel von Radiopaedia.org; keine zusätzlichen Patientenkasus.',
    openCase: 'Artikel öffnen',
    cases: [
      {
        title: 'Focal nodular hyperplasia',
        label: 'Radiopaedia · Hintergrund',
        tags: ['FNH'],
        icon: '⭐',
        meta: 'Ergänzende Übersicht; die eingebettete Bildtafel oben stammt aus dem bereitgestellten Abdomen.pdf.',
        credit: 'Quelle: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/focal-nodular-hyperplasia',
      },
      {
        title: 'Hepatocellular adenoma',
        label: 'Radiopaedia · Hintergrund',
        tags: ['Differenzialdiagnose'],
        icon: '🔬',
        meta: 'Ergänzende Differenzialdiagnose. Zur FNH/HCA-Abgrenzung kann eine hepatobiliäre MRT-Phase beitragen.',
        credit: 'Quelle: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/hepatocellular-adenoma',
      },
    ],
  },
  en: {
    label: 'Further reading',
    title: 'Further reading',
    lead: 'Background articles from Radiopaedia.org; these are not additional patient cases.',
    openCase: 'Open article',
    cases: [
      {
        title: 'Focal nodular hyperplasia',
        label: 'Radiopaedia · background',
        tags: ['FNH'],
        icon: '⭐',
        meta: 'Supplementary overview; the embedded image above is from the supplied Abdomen.pdf.',
        credit: 'Source: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/focal-nodular-hyperplasia',
      },
      {
        title: 'Hepatocellular adenoma',
        label: 'Radiopaedia · background',
        tags: ['Differential diagnosis'],
        icon: '🔬',
        meta: 'Supplementary differential diagnosis. A hepatobiliary MRI phase can help distinguish FNH from HCA.',
        credit: 'Source: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/hepatocellular-adenoma',
      },
    ],
  },
  fa: {
    label: 'مطالعهٔ بیشتر',
    title: 'مطالعهٔ بیشتر',
    lead: 'مقاله‌های مروری Radiopaedia.org؛ این‌ها نمونهٔ بیمار اضافه نیستند.',
    openCase: 'باز کردن مقاله',
    cases: [
      {
        title: 'هیپرپلازی ندولار فوکال (FNH)',
        label: 'Radiopaedia · مرور',
        tags: ['FNH'],
        icon: '⭐',
        meta: 'مرور تکمیلی؛ تصویر بالای صفحه از Abdomen.pdf ارائه‌شده گرفته شده است.',
        credit: 'منبع: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/focal-nodular-hyperplasia',
      },
      {
        title: 'آدنوم هپاتوسلولار',
        label: 'Radiopaedia · مرور',
        tags: ['تشخیص افتراقی'],
        icon: '🔬',
        meta: "تشخیص افتراقی تکمیلی؛ فاز هپاتوبیلیاری MRI می‌تواند به افتراق FNH از HCA کمک کند.",
        credit: 'منبع: Radiopaedia.org',
        url: 'https://radiopaedia.org/articles/hepatocellular-adenoma',
      },
    ],
  },
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

function FnhHeroDiagram({ lang }) {
  const copy = {
    de: { alt: 'Lehrschema einer FNH: zentrales Gefäß mit radiär ausstrahlenden Ästen', caption: 'Lehrschema, keine Patientenaufnahme. Das Spoke-wheel-Muster ist ein Hinweis, kein alleiniger Beweis.' },
    en: { alt: 'FNH teaching schematic: a central vessel with radiating branches', caption: 'Teaching schematic, not a patient image. The spoke-wheel pattern is a clue, not proof on its own.' },
    fa: { alt: 'شماتیک آموزشی FNH: رگ مرکزی با شاخه‌های شعاعی', caption: 'شماتیک آموزشی است، نه تصویر بیمار. الگوی spoke-wheel سرنخ است و به‌تنهایی اثبات‌کننده نیست.' },
  }[lang] || { alt: 'FNH teaching schematic: a central vessel with radiating branches', caption: 'Teaching schematic, not a patient image. The spoke-wheel pattern is a clue, not proof on its own.' }
  return <svg viewBox="0 0 420 250" role="img" aria-label={copy.alt} className={styles.fnhHeroDiagram}>
    <rect x="12" y="12" width="396" height="226" rx="22" fill="var(--canvas)" />
    <path d="M64 106c20-49 91-70 157-51 34 10 74-2 119 19 27 12 38 35 31 65-8 38-43 62-94 68-61 7-114-5-164 8-38 10-72-4-78-34-4-24 7-54 29-75Z" fill="var(--fnh-liver)" stroke="var(--teal-700)" strokeWidth="3" />
    <circle cx="218" cy="124" r="55" fill="var(--fnh-lesion)" stroke="var(--plum-700)" strokeWidth="2.5" />
    <path d="M218 122V79M218 122l-35-31M218 122l38-29M218 122l-43 5M218 122l40 9M218 122l-27 38M218 122l26 39" fill="none" stroke="var(--teal-700)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="218" cy="122" r="7" fill="var(--plum-800)" />
    <text x="218" y="218" textAnchor="middle" fill="var(--body)" fontSize="14">{lang === 'fa' ? 'رگ مرکزی ← شاخه‌های شعاعی' : lang === 'de' ? 'zentrales Gefäß → radiäre Äste' : 'central vessel → radiating branches'}</text>
  </svg>
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(header => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{type === 'cave' ? '⚠️' : '💡'} {label}</strong>
      <p>{children}</p>
    </div>
  )
}

function Section({ id, title, lead, children, open, onToggle }) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionHeading}>
      <button className={styles.sectionHeader} type="button" onClick={() => onToggle(id)} aria-expanded={open} aria-controls={`${id}-panel`}>
        <span className={styles.sectionTitle}>{title}</span>
        <span>{open ? '−' : '+'}</span>
      </button>
      </h2>
      <div id={`${id}-panel`} className={styles.sectionBody} hidden={!open}>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
      </div>
    </section>
  )
}

export default function LeberFnhPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const caseCopy = CASE_COPY[lang] || CASE_COPY.de
  const pageSections = useMemo(() => {
    const exists = copy.sections.some(section => section.id === 'fallbeispiele')
    if (exists) return copy.sections
    const takeHomeIndex = copy.sections.findIndex(section => section.id === 'takehome')
    const caseSection = { id: 'fallbeispiele', label: caseCopy.label, icon: '🧪' }
    if (takeHomeIndex === -1) return [...copy.sections, caseSection]
    return [...copy.sections.slice(0, takeHomeIndex), caseSection, ...copy.sections.slice(takeHomeIndex)]
  }, [copy.sections, caseCopy.label])
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(pageSections[0].id)
  const [openSectionId, setOpenSectionId] = useState(pageSections[0].id)
  const [mobilePathOpen, setMobilePathOpen] = useState(false)
  const [selectedFnhAnswer, setSelectedFnhAnswer] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('fnh')
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const sectionIds = useMemo(() => pageSections.map(section => section.id), [pageSections])
  const toggleSection = (id) => setOpenSectionId(current => current === id ? null : id)

  const scrollTo = (id) => {
    const section = document.getElementById(id)
    setActiveId(id)
    setOpenSectionId(id)
    setMobilePathOpen(false)
    if (typeof window !== 'undefined') window.history.replaceState(null, '', `#${id}`)
    requestAnimationFrame(() => section?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  useEffect(() => {
    const syncHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!sectionIds.includes(id)) return
      setActiveId(id)
      setOpenSectionId(id)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    }
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [sectionIds])



  return (
    <LegacyLessonMigration lessonRoute="/abdomen/leber/fnh" lessonId="/abdomen/leber/fnh" lang={lang} summaryFallback={copy.takehome.items.map(item => ({ title: item.title, detail: item.text }))}>
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={`${styles.header} ${reference.header}`}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.sharedHeroFrame}>
          <span className={reference.author}>{copy.sourceLabel}</span>
          <LessonHero title={copy.title} lang={lang} visual={<FnhHeroDiagram lang={lang} />} visualCaption={({ de: 'Lehrschema, kein Patientenbild; das Spoke-wheel-Muster ist ein Hinweis, kein Beweis.', en: 'Teaching schematic, not a patient image; the spoke-wheel pattern is a clue, not proof.', fa: 'شماتیک آموزشی، نه تصویر بیمار؛ الگوی spoke-wheel سرنخ است و اثبات‌کننده نیست.' })[lang]} />
          <div className={styles.sharedHeroActions}>
            <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=fnh&from=${encodeURIComponent(withLang('/abdomen/leber/fnh'))}`)} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
            <Link href={withLang(`/flashcards/fnh?from=${encodeURIComponent(withLang('/abdomen/leber/fnh'))}`)} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
          </div>
        </div>
      </header>

      <div className={styles.readBar}>
        <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
      </div>

      <div className={styles.mobilePath}>
        <button type="button" aria-expanded={mobilePathOpen} aria-controls="fnh-mobile-path" onClick={() => setMobilePathOpen(value => !value)}>{copy.toc}: {pageSections.find(section => section.id === activeId)?.label || copy.sections[0].label}</button>
        {mobilePathOpen ? <nav id="fnh-mobile-path" aria-label={copy.toc}>{pageSections.map(section => <button type="button" key={section.id} aria-current={activeId === section.id ? 'location' : undefined} onClick={() => scrollTo(section.id)}>{section.icon} {section.label}</button>)}</nav> : null}
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {pageSections.map(section => (
            <button
              type="button"
              key={section.id}
              data-section-id={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              aria-current={activeId === section.id ? 'location' : undefined}
              onClick={() => scrollTo(section.id)}
            >
              <span>{section.icon}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section migrationChapter id="grundlagen" title={copy.basics.title} lead={copy.basics.lead} open={openSectionId === 'grundlagen'} onToggle={toggleSection}>
            <h3>{copy.basics.goalsLabel}</h3>
            <ul>{copy.basics.learningGoals.map(goal => <li key={goal}>{goal}</li>)}</ul>
            <div className={styles.cardsGrid}>
              {copy.basics.items.map(item => (
                <div className={styles.infoCard} key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section migrationChapter id="sono" title={copy.sono.title} lead={copy.sono.lead} open={openSectionId === 'sono'} onToggle={toggleSection}>
            <Table headers={copy.sono.tableHeaders} rows={copy.sono.tableRows} />
            <Callout label={copy.keyLabel}>{copy.sono.key}</Callout>
          </Section>

          <Section migrationChapter id="ct" title={copy.ct.title} lead={copy.ct.lead} open={openSectionId === 'ct'} onToggle={toggleSection}>
            <Table headers={copy.ct.tableHeaders} rows={copy.ct.tableRows} />
            <div className={styles.highlightBox}>
              <h3>{copy.ct.irisTitle}</h3>
              <p>{copy.ct.irisText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.ct.key}</Callout>
          </Section>

          <Section migrationChapter id="mrt" title={copy.mri.title} lead={copy.mri.lead} open={openSectionId === 'mrt'} onToggle={toggleSection}>
            <Table headers={copy.mri.tableHeaders} rows={copy.mri.tableRows} />
            <figure className={styles.pdfCase}>
              <Image src="/educational/fnh/source-mri-p14.jpg" alt={copy.mri.figureAlt} width={565} height={488} sizes="(max-width: 760px) calc(100vw - 64px), 60vw" />
              <figcaption>
                <strong>{({ de: 'MRT-Beispiel aus der Zusammenfassung', en: 'MRI example from the supplied summary', fa: 'نمونه MRI از خلاصهٔ آموزشی' })[lang]}</strong>
                <p>{copy.mri.figureCaption}</p>
              </figcaption>
            </figure>
            <p className={styles.sourceNote}>{copy.mri.sourceNote} <a href="https://doi.org/10.14309/ajg.0000000000002857" target="_blank" rel="noopener noreferrer">ACG Guideline 2024</a> · <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7206317/" target="_blank" rel="noopener noreferrer">EASL Guideline 2016</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/35920706/" target="_blank" rel="noopener noreferrer">Kim et al. 2023</a></p>
            <div className={styles.inlineCheck}>
              <h3>{copy.mri.check.question}</h3>
              <fieldset>
                <legend>{copy.mri.check.choose}</legend>
                {copy.mri.check.options.map((option, index) => (
                  <label className={selectedFnhAnswer === index ? styles.checkSelected : ''} key={option}>
                    <input type="radio" name="fnh-pattern-check" checked={selectedFnhAnswer === index} onChange={() => setSelectedFnhAnswer(index)} />
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
              {selectedFnhAnswer !== null && <p className={`${styles.checkFeedback} ${selectedFnhAnswer === copy.mri.check.answer ? styles.checkCorrect : styles.checkIncorrect}`} role="status"><strong>{selectedFnhAnswer === copy.mri.check.answer ? copy.mri.check.correctFeedback : copy.mri.check.incorrectFeedback}</strong> {selectedFnhAnswer === copy.mri.check.answer ? copy.mri.check.explanation : copy.mri.check.wrongExplanations[selectedFnhAnswer]}</p>}
            </div>
            <div className={styles.splitGrid}>
              <div className={styles.infoCard}>
                <h3>{copy.mri.lightBulbTitle}</h3>
                <p>{copy.mri.lightBulbText}</p>
              </div>
              <div className={styles.infoCard}>
                <h3>{copy.mri.dwiTitle}</h3>
                <p>{copy.mri.dwiText}</p>
              </div>
            </div>
            <Callout label={copy.keyLabel}>{copy.mri.key}</Callout>
          </Section>

          <Section migrationChapter id="atypisch" title={copy.atypical.title} lead={copy.atypical.lead} open={openSectionId === 'atypisch'} onToggle={toggleSection}>
            <Table headers={copy.atypical.tableHeaders} rows={copy.atypical.tableRows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.atypical.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.atypical.key}</Callout>
          </Section>


          <Section migrationChapter id="fallbeispiele" title={caseCopy.title} lead={caseCopy.lead} open={openSectionId === 'fallbeispiele'} onToggle={toggleSection}>
            <div className={styles.caseGrid}>
              {caseCopy.cases.map(item => (
                <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseCardLink}>
                  <div className={styles.caseBody}>
                    <div className={styles.caseLabelRow}>
                      <span className={styles.caseLabel}>{item.label}</span>
                      {item.tags?.map(tag => <span key={tag} className={styles.caseLabel}>{tag}</span>)}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <small>{item.credit}</small>
                    <strong>{caseCopy.openCase}</strong>
                  </div>
                </a>
              ))}
            </div>
          </Section>

          <Section migrationChapter id="takehome" title={copy.takehome.title} lead={copy.takehome.lead} open={openSectionId === 'takehome'} onToggle={toggleSection}>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <div className={styles.readBarBottom}>
            <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
          </div>
        </div>
      </div>
    </main>
    </LegacyLessonMigration>
  )
}
