// Canonical haemangioma assessment pool; packet06 full-pool independent review pending.
export const HEMANGIOMA_QUESTIONS = {
  "de": [
    {
      "id": "haemangiom-de-01",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Welche Gewebebeschreibung passt zum Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Gutartige vaskuläre Läsion mit kavernösen blutgefüllten Räumen"
        },
        {
          "id": "B",
          "text": "Hepatozelluläre Hyperplasie mit zentraler fibröser Narbe"
        },
        {
          "id": "C",
          "text": "Umschriebene Fettablagerung bei erhaltener Leberarchitektur"
        },
        {
          "id": "D",
          "text": "Epithelial ausgekleideter flüssigkeitsgefüllter Hohlraum"
        }
      ],
      "correct": "A",
      "explanation": "Das Hämangiom besteht aus endothelial ausgekleideten, blutgefüllten Gefäßräumen. Die vaskuläre Natur erklärt sein charakteristisches Kontrastverhalten; die Lage allein bestimmt die Diagnose nicht.",
      "wrongExplanations": {
        "B": "Das beschreibt eher eine fokale noduläre Hyperplasie. Beim Hämangiom stehen vaskuläre Räume im Vordergrund, nicht eine Hepatozytenhyperplasie.",
        "C": "Eine fokale Verfettung ist eine Parenchymveränderung/Pseudoläsion und keine kavernöse vaskuläre Läsion.",
        "D": "Eine epitheliale Auskleidung gehört zur echten Zyste; sie ist von den blutgefüllten endothelialen Gefäßräumen des Hämangioms zu unterscheiden."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-de-02",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "In welcher Textkonstellation genügt nach EASL2016 die Sonographie zur Diagnose eines typischen Hämangioms?",
      "options": [
        {
          "id": "A",
          "text": "2,5-cm-Herd, homogen echoreich, scharf begrenzt, dorsale Verstärkung und kein Halo; bekannte Zirrhose"
        },
        {
          "id": "B",
          "text": "2,5-cm-Herd mit derselben typischen Morphologie; gesunde Leber und keine Tumoranamnese"
        },
        {
          "id": "C",
          "text": "2,5-cm-Herd mit derselben typischen Morphologie; bekannte extrahepatische Tumorerkrankung"
        },
        {
          "id": "D",
          "text": "2,5-cm-Herd mit heterogenem Echo und Halo; gesunde Leber ohne Tumoranamnese"
        }
      ],
      "correct": "B",
      "explanation": "EASL2016 verbindet <3 cm, typische Morphologie und gesunde Leber ohne Tumoranamnese. ACG2024 verwendet eine andere Größenregel (<2 cm); die benannte EASL-Regel darf nicht stillschweigend mit ihr vermischt werden.",
      "wrongExplanations": {
        "A": "Bei zugrunde liegender Lebererkrankung fordert EASL eine kontrastverstärkte Charakterisierung trotz scheinbar typischer Sonographie.",
        "C": "Die Tumoranamnese verändert den diagnostischen Kontext; kontrastverstärkte Charakterisierung ist erforderlich.",
        "D": "Heterogenität und Halo erfüllen die hier geforderte klassische Morphologie nicht. Die kleine Größe allein genügt nicht."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-de-03",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Welche Mehrphasen-Dynamik entspricht dem klassischen peripher-nodulären Hämangiommuster?",
      "options": [
        {
          "id": "A",
          "text": "Durchgehender anreichernder Randsaum mit progredienter zentraler Anreicherung"
        },
        {
          "id": "B",
          "text": "Homogene arterielle Hyperanreicherung mit späterer Angleichung an das Leberparenchym"
        },
        {
          "id": "C",
          "text": "Diskontinuierliche periphere Kontrastknoten mit zentripetaler Auffüllung und persistierender blutpoolähnlicher Anreicherung"
        },
        {
          "id": "D",
          "text": "Nicht-randständiges APHE mit anschließendem nicht-peripherem Wash-out"
        }
      ],
      "correct": "C",
      "explanation": "Einzelne periphere Kontrastknoten breiten sich nach innen aus und folgen dem Blutpool. Das ist von einem durchgehenden Randsaum zu trennen. Große Läsionen müssen auch spät nicht vollständig gefüllt sein.",
      "wrongExplanations": {
        "A": "Ein durchgehender Rim ist nicht gleichbedeutend mit getrennten Kontrastknoten. Ein solches Muster verlangt eine andere oder weiterführende Charakterisierung.",
        "B": "Homogene arterielle Hyperanreicherung ist ein anderes Muster und kann mehrere Diagnosen haben. Für die gesuchte klassische Variante fehlen die getrennten peripheren Knoten.",
        "D": "Nicht-peripheres Wash-out gewichtet im passenden Risikokontext HCC, nicht das gesuchte persistierende blutpoolähnliche Hämangiommuster."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-de-04",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Welche räumlich-zeitliche Kontrastverteilung beschreibt das Irisblendenphänomen?",
      "options": [
        {
          "id": "A",
          "text": "Progressive Ausbreitung der Anreicherung vom Zentrum zum Rand"
        },
        {
          "id": "B",
          "text": "Früh bereits homogene Anreicherung ohne erkennbare peripher-zentrale Ausbreitung"
        },
        {
          "id": "C",
          "text": "Anreicherung eines peripheren Randsaums ohne fortschreitende zentrale Füllung"
        },
        {
          "id": "D",
          "text": "Progressive Ausbreitung der Anreicherung vom Rand zur Mitte"
        }
      ],
      "correct": "D",
      "explanation": "Zentripetale Füllung bedeutet vom Rand zur Mitte. Geschwindigkeit und Vollständigkeit variieren; das benannte Muster verlangt nicht in jeder Läsion eine komplette späte Füllung.",
      "wrongExplanations": {
        "A": "Das ist die umgekehrte, zentrifugale Richtung. Das Irisblendenphänomen beschreibt die zentripetale Füllung.",
        "B": "Eine sehr rasche homogene Anreicherung kann bei Flash-filling vorkommen, zeigt aber nicht die hier gefragte sichtbare zentripetale Abfolge.",
        "C": "Ein statischer anreichernder Rim ohne zunehmende zentrale Füllung entspricht nicht der beschriebenen Irisblenden-Dynamik."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-de-05",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Welche kombinierte MRT-Konstellation unterstützt ein klassisches Hämangiom am stärksten?",
      "options": [
        {
          "id": "A",
          "text": "Sehr hohes T2-Signal, periphere Kontrastknoten und progressive zentripetale Füllung"
        },
        {
          "id": "B",
          "text": "Mäßig hohes T2-Signal, arterieller Randsaum und verzögerte zentrale Anreicherung"
        },
        {
          "id": "C",
          "text": "Flüssigkeitsähnliches T2-Signal ohne Anreicherung in den Kontrastphasen"
        },
        {
          "id": "D",
          "text": "Mäßig hohes T2-Signal, nicht-randständiges APHE und nachfolgendes Wash-out"
        }
      ],
      "correct": "A",
      "explanation": "Ausgeprägte T2-Helligkeit und die passende noduläre Mehrphasendynamik ergeben das klassische Gesamtmuster. T2 allein ist nicht spezifisch und atypische Varianten können davon abweichen.",
      "wrongExplanations": {
        "B": "Ein arterieller Rim ist von diskontinuierlichen Kontrastknoten zu unterscheiden. Dieses Muster ist nicht die gesuchte klassische Hämangiomkonstellation.",
        "C": "Flüssigkeit kann sehr T2-hell sein. Fehlende Anreicherung passt eher zu einer einfachen Zyste als zum vaskulären Hämangiommuster.",
        "D": "APHE mit Wash-out verlangt eine andere Einordnung, insbesondere im HCC-Risikokontext. Das persistierende blutpoolähnliche Füllungsmuster fehlt."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-de-06",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Welche Sequenzkombination unterstützt T2-shine-through statt gesicherter Diffusionsrestriktion bei einem sehr T2-hellen Herd?",
      "options": [
        {
          "id": "A",
          "text": "Hohes DWI-Signal mit korrespondierend niedrigem ADC"
        },
        {
          "id": "B",
          "text": "Hohes DWI-Signal mit erhaltenem oder hohem ADC"
        },
        {
          "id": "C",
          "text": "Niedriges DWI-Signal mit hohem ADC"
        },
        {
          "id": "D",
          "text": "Hohes DWI-Signal bei artefaktbedingt nicht beurteilbarem ADC"
        }
      ],
      "correct": "B",
      "explanation": "Starkes T2-Signal kann zur DWI-Helligkeit beitragen, ohne dass der ADC erniedrigt ist. Das unterstützt Shine-through, beweist aber keine Gutartigkeit: Morphologie und Mehrphasendynamik mitbewerten.",
      "wrongExplanations": {
        "A": "Ein korrespondierend niedriger ADC unterstützt echte Restriktion. Auch sie ist nicht automatisch malignitätsspezifisch.",
        "C": "Niedriges DWI-Signal mit hohem ADC ist eher mit freierer Diffusion vereinbar und zeigt gerade nicht die gefragte DWI-Aufhellung durch T2.",
        "D": "Ohne verwertbare ADC-Karte ist die gefragte Unterscheidung nicht zuverlässig möglich. Artefakte nicht als normalen ADC werten."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
    },
    {
      "id": "haemangiom-de-07",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Welches Referenzkompartiment ist für die anreichernden Gefäßräume eines Hämangioms über die Kontrastphasen besonders hilfreich?",
      "options": [
        {
          "id": "A",
          "text": "Leberparenchym derselben Phase"
        },
        {
          "id": "B",
          "text": "Paraspinale Muskulatur derselben Phase"
        },
        {
          "id": "C",
          "text": "Blutpool derselben Phase"
        },
        {
          "id": "D",
          "text": "Gallenblasenflüssigkeit derselben Phase"
        }
      ],
      "correct": "C",
      "explanation": "Die anreichernden Gefäßräume folgen typischerweise dem Blutpool. Eine Läsion muss deshalb spät nicht genau so hell wie die Leber oder vollständig aufgefüllt sein.",
      "wrongExplanations": {
        "A": "Der Lebervergleich beschreibt unter anderem relatives Wash-out, ist aber nicht der spezifische Vergleich für die persistierende vaskuläre Hämangiomanreicherung.",
        "B": "Muskel ist kein intravaskuläres Referenzkompartiment und bildet den Blutpoolverlauf nicht ab.",
        "D": "Galle kann als Flüssigkeitsvergleich auf T2 dienen, folgt aber nicht der intravaskulären Mehrphasenanreicherung."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
    },
    {
      "id": "haemangiom-de-08",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Zwei Textbefunde: (1) kleine Läsion mit früh homogener kräftiger Anreicherung und späterem Blutpoolverhalten; (2) fibrotisch veränderte Läsion mit geringerem T2-Signal und fehlender typischer Auffüllung. Welche Varianten-Zuordnung passt am besten?",
      "options": [
        {
          "id": "A",
          "text": "(1) sklerosiert; (2) Flash-filling"
        },
        {
          "id": "B",
          "text": "(1) klassisch peripher-nodulär; (2) klassisch peripher-nodulär"
        },
        {
          "id": "C",
          "text": "(1) klassisch peripher-nodulär; (2) Flash-filling"
        },
        {
          "id": "D",
          "text": "(1) Flash-filling; (2) sklerosiert/hyalinisiert"
        }
      ],
      "correct": "D",
      "explanation": "Flash-filling bezeichnet rasche homogene Füllung; die späteren Phasen bleiben wichtig. Sklerosierung kann T2-Signal und typische Anreicherung vermindern. Die zweite Konstellation ist nicht allein beweisend für Gutartigkeit und kann weitere Charakterisierung erfordern.",
      "wrongExplanations": {
        "A": "Die Zuordnung ist vertauscht: frühe homogene Füllung passt zu Flash-filling, nicht zum fibrosebedingten Verlust des typischen Musters.",
        "B": "Bei keinem der beiden Textbefunde ist die klassische Abfolge getrennter peripherer Knoten mit sichtbarer progressiver Füllung beschrieben.",
        "C": "Befund1 beschreibt frühe homogene Füllung; Befund2 gerade den Verlust typischer Füllung bei Fibrose. Das entspricht nicht dieser Paarung."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/34041675/"
    }
  ],
  "en": [
    {
      "id": "haemangiom-en-01",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Which tissue description fits a hepatic haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "A benign vascular lesion with cavernous blood-filled spaces"
        },
        {
          "id": "B",
          "text": "Hepatocellular hyperplasia with a central fibrous scar"
        },
        {
          "id": "C",
          "text": "Focal fat deposition with preserved hepatic architecture"
        },
        {
          "id": "D",
          "text": "An epithelial-lined fluid-filled cavity"
        }
      ],
      "correct": "A",
      "explanation": "A haemangioma contains endothelial-lined blood-filled vascular spaces. Its vascular nature explains the characteristic enhancement behaviour; location alone does not determine the diagnosis.",
      "wrongExplanations": {
        "B": "This instead describes focal nodular hyperplasia. Vascular spaces, rather than hepatocellular hyperplasia, define haemangioma.",
        "C": "Focal steatosis is a parenchymal change/pseudolesion, not a cavernous vascular lesion.",
        "D": "An epithelial lining belongs to a true cyst and differs from a haemangioma’s endothelial vascular spaces filled with blood."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-en-02",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "In which text-based setting is ultrasound sufficient to diagnose a typical haemangioma under EASL2016?",
      "options": [
        {
          "id": "A",
          "text": "A 2.5 cm homogeneous hyperechoic, well-defined lesion with posterior enhancement and no halo; known cirrhosis"
        },
        {
          "id": "B",
          "text": "A 2.5 cm lesion with the same typical morphology; healthy liver and no cancer history"
        },
        {
          "id": "C",
          "text": "A 2.5 cm lesion with the same typical morphology; known extrahepatic cancer"
        },
        {
          "id": "D",
          "text": "A 2.5 cm lesion with heterogeneous echotexture and a halo; healthy liver without cancer history"
        }
      ],
      "correct": "B",
      "explanation": "EASL2016 combines <3 cm, typical morphology and a healthy liver without cancer history. ACG2024 uses a different size rule (<2 cm); do not silently merge it with the named EASL rule.",
      "wrongExplanations": {
        "A": "With underlying liver disease, EASL requires contrast-enhanced characterisation despite apparently typical ultrasound.",
        "C": "Cancer history changes the diagnostic context; contrast-enhanced characterisation is required.",
        "D": "Heterogeneity and a halo do not meet the classic morphology specified here. Small size alone is insufficient."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-en-03",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Which multiphasic pattern matches the classic peripheral nodular haemangioma pattern?",
      "options": [
        {
          "id": "A",
          "text": "A continuous enhancing rim with progressive central enhancement"
        },
        {
          "id": "B",
          "text": "Homogeneous arterial hyperenhancement followed by equilibration with liver parenchyma"
        },
        {
          "id": "C",
          "text": "Discontinuous peripheral enhancing nodules with centripetal fill-in and persistent blood-pool-like enhancement"
        },
        {
          "id": "D",
          "text": "Nonrim APHE followed by nonperipheral washout"
        }
      ],
      "correct": "C",
      "explanation": "Separate peripheral enhancing nodules extend inward and follow the blood pool. Distinguish this from a continuous rim. Large lesions need not fill completely even on delayed imaging.",
      "wrongExplanations": {
        "A": "A continuous rim is not equivalent to separate enhancing nodules. Such a pattern requires a different or additional characterisation.",
        "B": "Homogeneous arterial hyperenhancement is a different pattern with several possible diagnoses. The separate peripheral nodules required for this classic variant are absent.",
        "D": "Nonperipheral washout favours HCC in an appropriate risk context rather than the persistent blood-pool-like haemangioma pattern sought here."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-en-04",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Which spatial-temporal enhancement pattern describes the iris diaphragm phenomenon?",
      "options": [
        {
          "id": "A",
          "text": "Progressive enhancement spreading from the centre to the edge"
        },
        {
          "id": "B",
          "text": "Early homogeneous enhancement without visible peripheral-to-central progression"
        },
        {
          "id": "C",
          "text": "Enhancement of a peripheral rim without progressive central fill-in"
        },
        {
          "id": "D",
          "text": "Progressive enhancement spreading from the edge to the centre"
        }
      ],
      "correct": "D",
      "explanation": "Centripetal filling means from the edge toward the centre. Speed and completeness vary; this pattern does not require complete delayed filling in every lesion.",
      "wrongExplanations": {
        "A": "This is the opposite, centrifugal direction. The iris diaphragm phenomenon describes centripetal filling.",
        "B": "Very rapid homogeneous enhancement may occur in flash-filling, but it does not show the visible centripetal sequence asked here.",
        "C": "A static enhancing rim without progressive central filling does not match the iris diaphragm dynamics described."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-en-05",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Which combined MRI pattern most strongly supports a classic haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Marked T2 brightness, peripheral enhancing nodules and progressive centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Moderate T2 hyperintensity, arterial rim enhancement and delayed central enhancement"
        },
        {
          "id": "C",
          "text": "Fluid-like T2 signal without enhancement in the contrast phases"
        },
        {
          "id": "D",
          "text": "Moderate T2 hyperintensity, nonrim APHE and subsequent washout"
        }
      ],
      "correct": "A",
      "explanation": "Marked T2 brightness plus compatible nodular multiphasic enhancement form the classic overall pattern. T2 alone is not specific, and atypical variants may differ.",
      "wrongExplanations": {
        "B": "An arterial rim differs from discontinuous enhancing nodules. This is not the classic haemangioma pattern sought here.",
        "C": "Fluid can be markedly T2 bright. Absent enhancement instead favours a simple cyst over the vascular haemangioma pattern.",
        "D": "APHE with washout requires a different interpretation, particularly in an HCC risk context. The persistent blood-pool-like fill-in pattern is absent."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-en-06",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Which sequence combination supports T2 shine-through rather than established restricted diffusion in a markedly T2-bright lesion?",
      "options": [
        {
          "id": "A",
          "text": "High DWI signal with corresponding low ADC"
        },
        {
          "id": "B",
          "text": "High DWI signal with preserved or high ADC"
        },
        {
          "id": "C",
          "text": "Low DWI signal with high ADC"
        },
        {
          "id": "D",
          "text": "High DWI signal with ADC rendered nondiagnostic by artefact"
        }
      ],
      "correct": "B",
      "explanation": "Strong T2 signal can contribute to DWI brightness without low ADC. This supports shine-through but does not establish benignity; also assess morphology and multiphasic enhancement.",
      "wrongExplanations": {
        "A": "A corresponding low ADC supports true restriction, which is itself not automatically specific for malignancy.",
        "C": "Low DWI signal with high ADC instead fits freer diffusion and does not show the DWI brightness from T2 being asked about.",
        "D": "Without an interpretable ADC map the requested distinction cannot be made reliably. Do not treat artefact as normal ADC."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
    },
    {
      "id": "haemangiom-en-07",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Which reference compartment is particularly useful for the enhancing vascular spaces of a haemangioma across contrast phases?",
      "options": [
        {
          "id": "A",
          "text": "Liver parenchyma in the same phase"
        },
        {
          "id": "B",
          "text": "Paraspinal muscle in the same phase"
        },
        {
          "id": "C",
          "text": "Blood pool in the same phase"
        },
        {
          "id": "D",
          "text": "Gallbladder fluid in the same phase"
        }
      ],
      "correct": "C",
      "explanation": "The enhancing vascular spaces typically follow the blood pool. The lesion therefore need not match liver brightness or fill completely on delayed imaging.",
      "wrongExplanations": {
        "A": "Comparison with liver helps describe relative washout, but it is not the specific reference for persistent vascular haemangioma enhancement.",
        "B": "Muscle is not an intravascular reference compartment and does not represent the blood-pool enhancement course.",
        "D": "Bile can provide a fluid comparison on T2 but does not follow intravascular multiphasic enhancement."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
    },
    {
      "id": "haemangiom-en-08",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "Two text findings: (1) a small lesion with early intense homogeneous enhancement and later blood-pool behaviour; (2) a fibrotic lesion with lower T2 signal and absent typical fill-in. Which variant pairing fits best?",
      "options": [
        {
          "id": "A",
          "text": "(1) sclerosed; (2) flash-filling"
        },
        {
          "id": "B",
          "text": "(1) classic peripheral nodular; (2) classic peripheral nodular"
        },
        {
          "id": "C",
          "text": "(1) classic peripheral nodular; (2) flash-filling"
        },
        {
          "id": "D",
          "text": "(1) flash-filling; (2) sclerosed/hyalinised"
        }
      ],
      "correct": "D",
      "explanation": "Flash-filling means rapid homogeneous fill-in; later phases remain important. Sclerosis may reduce T2 signal and typical enhancement. The second pattern alone does not establish benignity and may require further characterisation.",
      "wrongExplanations": {
        "A": "The pairing is reversed: early homogeneous filling fits flash-filling, not fibrosis-related loss of the typical pattern.",
        "B": "Neither text finding describes the classic sequence of separate peripheral nodules with visible progressive filling.",
        "C": "Finding1 describes early homogeneous filling; finding2 describes loss of typical filling with fibrosis. This does not match the proposed pairing."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/34041675/"
    }
  ],
  "fa": [
    {
      "id": "haemangiom-fa-01",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "کدام توصیف بافتی با همانژیوم کبدی سازگار است؟",
      "options": [
        {
          "id": "A",
          "text": "ضایعهٔ عروقی خوش‌خیم با فضاهای کاورنوز پُر از خون"
        },
        {
          "id": "B",
          "text": "هیپرپلازی هپاتوسلولار با اسکار فیبروزی مرکزی"
        },
        {
          "id": "C",
          "text": "رسوب موضعی چربی با معماری حفظ‌شدهٔ کبد"
        },
        {
          "id": "D",
          "text": "حفرهٔ پُر از مایع با پوشش اپی‌تلیالی"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم حاوی فضاهای عروقی پُر از خون با پوشش اندوتلیالی است. ماهیت عروقی رفتار مشخصهٔ آن در جذب مادهٔ حاجب را توضیح می‌دهد؛ محل به‌تنهایی تشخیص را تعیین نمی‌کند.",
      "wrongExplanations": {
        "B": "این توصیف بیشتر با هیپرپلازی ندولار کانونی سازگار است. در همانژیوم فضاهای عروقی مطرح‌اند، نه هیپرپلازی هپاتوسیت‌ها.",
        "C": "چربی کانونی تغییر پارانشیمی/شبه‌ضایعه است، نه ضایعهٔ عروقی کاورنوز.",
        "D": "پوشش اپی‌تلیالی مربوط به کیست واقعی است و با فضاهای عروقی اندوتلیالی پُر از خونِ همانژیوم تفاوت دارد."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-fa-02",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "در کدام وضعیت متنی، طبق EASL۲۰۱۶ سونوگرافی برای تشخیص همانژیوم تیپیک کافی است؟",
      "options": [
        {
          "id": "A",
          "text": "ضایعهٔ ۲٫۵ سانتی‌متری همگن و اکوژن، با مرز مشخص، تقویت صوتی خلفی و بدون هاله؛ سیروز شناخته‌شده"
        },
        {
          "id": "B",
          "text": "ضایعهٔ ۲٫۵ سانتی‌متری با همان مورفولوژی تیپیک؛ کبد سالم و بدون سابقهٔ سرطان"
        },
        {
          "id": "C",
          "text": "ضایعهٔ ۲٫۵ سانتی‌متری با همان مورفولوژی تیپیک؛ سرطان خارج‌کبدی شناخته‌شده"
        },
        {
          "id": "D",
          "text": "ضایعهٔ ۲٫۵ سانتی‌متری با اکوی ناهمگن و هاله؛ کبد سالم بدون سابقهٔ سرطان"
        }
      ],
      "correct": "B",
      "explanation": "EASL۲۰۱۶ اندازهٔ کمتر از ۳ سانتی‌متر، مورفولوژی تیپیک و کبد سالم بدون سابقهٔ سرطان را با هم در نظر می‌گیرد. ACG۲۰۲۴ قاعدهٔ اندازهٔ متفاوتی دارد (کمتر از ۲ سانتی‌متر)؛ نباید این دو قاعده را بی‌توضیح با هم ادغام کرد.",
      "wrongExplanations": {
        "A": "در بیماری زمینه‌ای کبد، EASL با وجود ظاهر ظاهراً تیپیک سونوگرافی، مشخصه‌یابی با مادهٔ حاجب را لازم می‌داند.",
        "C": "سابقهٔ سرطان زمینهٔ تشخیصی را تغییر می‌دهد؛ مشخصه‌یابی با مادهٔ حاجب لازم است.",
        "D": "ناهمگنی و هاله با مورفولوژی کلاسیک موردنیاز اینجا تطابق ندارند. اندازهٔ کوچک به‌تنهایی کافی نیست."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-fa-03",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "کدام الگوی چندفازی با الگوی کلاسیک ندولار محیطی همانژیوم مطابقت دارد؟",
      "options": [
        {
          "id": "A",
          "text": "حلقهٔ محیطی پیوسته با جذب پیشروندهٔ مرکزی"
        },
        {
          "id": "B",
          "text": "جذب شریانی همگن و بیشتر از کبد و سپس همسان‌شدن با پارانشیم کبد"
        },
        {
          "id": "C",
          "text": "ندول‌های محیطی ناپیوسته با جذب مادهٔ حاجب، پرشدن مرکزگرا و جذب پایدار مشابه مخزن خون"
        },
        {
          "id": "D",
          "text": "APHE غیرحاشیه‌ای و سپس واش‌اوت غیرمحیطی"
        }
      ],
      "correct": "C",
      "explanation": "ندول‌های مجزای محیطی جذب‌کنندهٔ مادهٔ حاجب به داخل گسترش می‌یابند و از مخزن خون پیروی می‌کنند. این الگو با حلقهٔ پیوسته متفاوت است. ضایعات بزرگ حتی در تصاویر تأخیری الزاماً کامل پُر نمی‌شوند.",
      "wrongExplanations": {
        "A": "حلقهٔ پیوسته معادل ندول‌های مجزای جذب‌کننده نیست. این الگو به مشخصه‌یابی متفاوت یا تکمیلی نیاز دارد.",
        "B": "جذب شریانی همگن الگوی دیگری با چند تشخیص ممکن است. ندول‌های محیطی مجزای لازم برای نوع کلاسیک مورد سؤال وجود ندارند.",
        "D": "واش‌اوت غیرمحیطی در زمینهٔ خطر مناسب بیشتر به نفع HCC است، نه الگوی پایدار مشابه مخزن خون همانژیوم که اینجا مورد سؤال است."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-fa-04",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "کدام توزیع مکانی-زمانی جذب مادهٔ حاجب، پدیدهٔ دیافراگم عنبیه را توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "گسترش پیشروندهٔ جذب از مرکز به محیط"
        },
        {
          "id": "B",
          "text": "جذب همگن از همان ابتدا، بدون گسترش قابل مشاهده از محیط به مرکز"
        },
        {
          "id": "C",
          "text": "جذب یک حلقهٔ محیطی بدون پرشدن پیشروندهٔ مرکزی"
        },
        {
          "id": "D",
          "text": "گسترش پیشروندهٔ جذب از محیط به مرکز"
        }
      ],
      "correct": "D",
      "explanation": "پرشدن مرکزگرا یعنی از محیط به‌سمت مرکز. سرعت و کامل‌بودن پرشدن متفاوت است؛ این الگو به معنی پرشدن کامل تأخیری در همهٔ ضایعات نیست.",
      "wrongExplanations": {
        "A": "این جهت برعکس و مرکزگریز است. پدیدهٔ دیافراگم عنبیه پرشدن مرکزگرا را توصیف می‌کند.",
        "B": "جذب بسیار سریع و همگن می‌تواند در نوع پرشدن سریع دیده شود، اما توالی قابل مشاهدهٔ مرکزگرای مورد سؤال را نشان نمی‌دهد.",
        "C": "حلقهٔ دارای جذب ثابت بدون پرشدن افزایشی مرکزی با دینامیک دیافراگم عنبیه تطابق ندارد."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-fa-05",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "کدام ترکیب یافته‌های MRI بیش از بقیه از همانژیوم کلاسیک حمایت می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال بسیار بالای T2، ندول‌های محیطی دارای جذب مادهٔ حاجب و پرشدن پیشروندهٔ مرکزگرا"
        },
        {
          "id": "B",
          "text": "سیگنال نسبتاً بالای T2، حلقهٔ شریانی دارای جذب و جذب تأخیری مرکزی"
        },
        {
          "id": "C",
          "text": "سیگنال T2 مشابه مایع بدون جذب در فازهای پس از تزریق"
        },
        {
          "id": "D",
          "text": "سیگنال نسبتاً بالای T2، APHE غیرحاشیه‌ای و واش‌اوت پس از آن"
        }
      ],
      "correct": "A",
      "explanation": "روشنایی شدید T2 همراه دینامیک چندفازی ندولار سازگار، الگوی کلی کلاسیک را می‌سازد. T2 به‌تنهایی اختصاصی نیست و انواع آتیپیک می‌توانند متفاوت باشند.",
      "wrongExplanations": {
        "B": "حلقهٔ شریانی با ندول‌های ناپیوستهٔ دارای جذب تفاوت دارد. این الگوی کلاسیک همانژیوم مورد سؤال نیست.",
        "C": "مایع می‌تواند در T2 بسیار روشن باشد. نبود جذب بیشتر به نفع کیست ساده است تا الگوی عروقی همانژیوم.",
        "D": "APHE همراه واش‌اوت تفسیر دیگری می‌خواهد، به‌ویژه در زمینهٔ خطر HCC. الگوی پرشدن پایدار مشابه مخزن خون وجود ندارد."
      },
      "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
    },
    {
      "id": "haemangiom-fa-06",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "در ضایعهٔ بسیار روشن در T2، کدام ترکیب سکانس‌ها از T2 shine-through به‌جای محدودیت انتشار اثبات‌شده حمایت می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال بالای DWI همراه ADC پایین متناظر"
        },
        {
          "id": "B",
          "text": "سیگنال بالای DWI همراه ADC حفظ‌شده یا بالا"
        },
        {
          "id": "C",
          "text": "سیگنال پایین DWI همراه ADC بالا"
        },
        {
          "id": "D",
          "text": "سیگنال بالای DWI همراه ADC غیرقابل ارزیابی به‌علت آرتیفکت"
        }
      ],
      "correct": "B",
      "explanation": "سیگنال قوی T2 می‌تواند بدون کاهش ADC در روشنایی DWI نقش داشته باشد. این از shine-through حمایت می‌کند، اما خوش‌خیمی را ثابت نمی‌کند؛ مورفولوژی و دینامیک چندفازی نیز ارزیابی شوند.",
      "wrongExplanations": {
        "A": "ADC پایین متناظر از محدودیت واقعی حمایت می‌کند؛ این یافته نیز خودبه‌خود اختصاصی بدخیمی نیست.",
        "C": "سیگنال پایین DWI با ADC بالا بیشتر با انتشار آزادتر سازگار است و روشنایی DWI ناشی از T2 مورد سؤال را نشان نمی‌دهد.",
        "D": "بدون نقشهٔ ADC قابل تفسیر، این افتراق با اطمینان ممکن نیست. آرتیفکت را ADC طبیعی تلقی نکنید."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
    },
    {
      "id": "haemangiom-fa-07",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "کدام بخش مرجع برای مقایسهٔ فضاهای عروقی دارای جذب مادهٔ حاجب در همانژیوم طی فازهای مختلف به‌ویژه مفید است؟",
      "options": [
        {
          "id": "A",
          "text": "پارانشیم کبد در همان فاز"
        },
        {
          "id": "B",
          "text": "عضلهٔ کنار ستون فقرات در همان فاز"
        },
        {
          "id": "C",
          "text": "مخزن خون در همان فاز"
        },
        {
          "id": "D",
          "text": "مایع کیسهٔ صفرا در همان فاز"
        }
      ],
      "correct": "C",
      "explanation": "فضاهای عروقی دارای جذب معمولاً از مخزن خون پیروی می‌کنند. بنابراین ضایعه در فاز تأخیری الزاماً دقیقاً هم‌سیگنال کبد یا کاملاً پُرشده نیست.",
      "wrongExplanations": {
        "A": "مقایسه با کبد در توصیف واش‌اوت نسبی کمک می‌کند، اما مرجع اختصاصی جذب عروقی پایدار همانژیوم نیست.",
        "B": "عضله بخش مرجع داخل‌عروقی نیست و سیر جذب مخزن خون را بازنمایی نمی‌کند.",
        "D": "صفرا می‌تواند در T2 مرجع مقایسهٔ مایع باشد، اما از جذب داخل‌عروقی چندفازی پیروی نمی‌کند."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
    },
    {
      "id": "haemangiom-fa-08",
      "tags": [
        "haemangiom"
      ],
      "fach": "abdomen",
      "question": "دو یافتهٔ متنی: (۱) ضایعهٔ کوچک با جذب شدید و همگن زودرس و رفتار مشابه مخزن خون در فازهای بعد؛ (۲) ضایعهٔ فیبروتیک با سیگنال T2 کمتر و فقدان پرشدن تیپیک. کدام تطبیق انواع مناسب‌تر است؟",
      "options": [
        {
          "id": "A",
          "text": "(۱) اسکلروزه؛ (۲) پرشدن سریع"
        },
        {
          "id": "B",
          "text": "(۱) ندولار محیطی کلاسیک؛ (۲) ندولار محیطی کلاسیک"
        },
        {
          "id": "C",
          "text": "(۱) ندولار محیطی کلاسیک؛ (۲) پرشدن سریع"
        },
        {
          "id": "D",
          "text": "(۱) پرشدن سریع؛ (۲) اسکلروزه/هیالینیزه"
        }
      ],
      "correct": "D",
      "explanation": "پرشدن سریع به معنی پُرشدن همگن و سریع است؛ فازهای بعد همچنان مهم‌اند. اسکلروز می‌تواند سیگنال T2 و جذب تیپیک را کاهش دهد. الگوی دوم به‌تنهایی خوش‌خیمی را ثابت نمی‌کند و ممکن است بررسی تکمیلی لازم داشته باشد.",
      "wrongExplanations": {
        "A": "تطبیق برعکس است؛ پرشدن همگن زودرس با نوع پرشدن سریع سازگار است، نه ازبین‌رفتن الگوی تیپیک بر اثر فیبروز.",
        "B": "هیچ‌یک از این دو یافتهٔ متنی توالی کلاسیک ندول‌های محیطی مجزا با پرشدن پیشروندهٔ قابل مشاهده را توصیف نمی‌کند.",
        "C": "یافتهٔ ۱ پرشدن همگن زودرس را توصیف می‌کند؛ یافتهٔ ۲ ازبین‌رفتن پرشدن تیپیک همراه فیبروز را. این با تطبیق پیشنهادی سازگار نیست."
      },
      "source": "https://pubmed.ncbi.nlm.nih.gov/34041675/"
    }
  ]
}
export const HEMANGIOMA_FLASHCARDS = [
  {
    "id": "haemangiom-01-definition",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Was ist ein Leberhämangiom?",
      "en": "What is a hepatic haemangioma?",
      "fa": "همانژیوم کبدی چیست؟"
    },
    "answer": {
      "de": "Eine gutartige vaskuläre Läsion mit kavernösen blutgefüllten Räumen.",
      "en": "A benign vascular lesion with cavernous blood-filled spaces.",
      "fa": "ضایعه عروقی خوش‌خیم با فضاهای کاورنوز پُر از خون."
    },
    "explanation": {
      "de": "Die Diagnose beruht auf dem passenden Gesamtmuster und dem klinischen Kontext.",
      "en": "Diagnosis depends on a compatible overall pattern and clinical context.",
      "fa": "تشخیص بر مجموعه یافته‌های سازگار و زمینه بالینی تکیه دارد."
    },
    "diagram": null,
    "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
  },
  {
    "id": "haemangiom-02-epidemiologie",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Welche gutartige solide Leberläsion ist am häufigsten?",
      "en": "What is the most common benign solid liver lesion?",
      "fa": "شایع‌ترین ضایعه جامد خوش‌خیم کبد چیست؟"
    },
    "answer": {
      "de": "Das Leberhämangiom.",
      "en": "Hepatic haemangioma.",
      "fa": "همانژیوم کبدی."
    },
    "explanation": {
      "de": "Oft ein Zufallsbefund, bei Frauen häufiger. Eine periphere Lage ist kein Diagnosekriterium.",
      "en": "Often incidental and more frequent in women. Peripheral location is not a diagnostic criterion.",
      "fa": "اغلب اتفاقی کشف می‌شود و در زنان شایع‌تر است. قرارگیری محیطی معیار تشخیص نیست."
    },
    "diagram": null,
    "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
  },
  {
    "id": "haemangiom-03-sono-klassisch",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Welche Größenlimits nennen EASL und ACG 2024 für eine typische sonographische Diagnose?",
      "en": "Which size thresholds do EASL and ACG 2024 use for a typical ultrasound diagnosis?",
      "fa": "EASL و ACG 2024 برای تشخیص تیپیک با سونوگرافی چه حد اندازه‌ای ذکر می‌کنند؟"
    },
    "answer": {
      "de": "EASL 2016: <3 cm; ACG 2024: <2 cm, jeweils nur bei passender typischer Morphologie und klinischem Kontext.",
      "en": "EASL 2016: <3 cm; ACG 2024: <2 cm, each only with appropriate typical morphology and clinical context.",
      "fa": "EASL 2016: کمتر از ۳ سانتی‌متر؛ ACG 2024: کمتر از ۲ سانتی‌متر؛ هر کدام فقط با مورفولوژی تیپیک و زمینه بالینی مناسب."
    },
    "explanation": {
      "de": "Bei Lebererkrankung, Tumoranamnese oder atypischem Befund kontrastverstärkt charakterisieren.",
      "en": "Use contrast-enhanced characterisation for liver disease, cancer history or atypical findings.",
      "fa": "در بیماری کبدی، سابقه سرطان یا یافته غیرتیپیک، بررسی با ماده حاجب لازم است."
    },
    "diagram": null,
    "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
  },
  {
    "id": "haemangiom-04-ct-muster",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Welches dynamische CT-Muster ist typisch?",
      "en": "Which dynamic CT pattern is typical?",
      "fa": "کدام الگوی دینامیک CT تیپیک است؟"
    },
    "answer": {
      "de": "Periphere diskontinuierliche Kontrastknoten mit progressiver zentripetaler Auffüllung.",
      "en": "Discontinuous peripheral enhancing nodules with progressive centripetal fill-in.",
      "fa": "ندول‌های محیطی ناپیوسته جذب‌کننده کنتراست با پرشدن تدریجی به‌سمت مرکز."
    },
    "explanation": {
      "de": "Nicht mit einem glatten durchgehenden Randsaum verwechseln.",
      "en": "Do not confuse this with a smooth continuous enhancing rim.",
      "fa": "این الگو را با حاشیه صاف و پیوسته جذب کنتراست اشتباه نگیرید."
    },
    "diagram": null,
    "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
  },
  {
    "id": "haemangiom-05-iris",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Was bedeutet Irisblendenphänomen?",
      "en": "What does the iris diaphragm phenomenon mean?",
      "fa": "پدیده دیافراگم عنبیه یعنی چه؟"
    },
    "answer": {
      "de": "Auffüllung vom Rand zur Mitte.",
      "en": "Filling from the edge to the centre.",
      "fa": "پرشدن از محیط به مرکز."
    },
    "explanation": {
      "de": "Die Füllung muss spät nicht vollständig sein, besonders bei großen Läsionen.",
      "en": "Delayed filling need not be complete, especially in large lesions.",
      "fa": "پرشدن در فاز تأخیری، به‌ویژه در ضایعات بزرگ، لزوماً کامل نیست."
    },
    "diagram": null,
    "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
  },
  {
    "id": "haemangiom-06-t2",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Was ist das Light-Bulb-Zeichen?",
      "en": "What is the light-bulb sign?",
      "fa": "علامت لامپ روشن چیست؟"
    },
    "answer": {
      "de": "Sehr hohes T2-Signal eines klassischen Hämangioms.",
      "en": "Marked T2 brightness of a classic haemangioma.",
      "fa": "سیگنال بسیار بالای T2 در همانژیوم تیپیک."
    },
    "explanation": {
      "de": "Ein hilfreicher Hinweis, aber zusammen mit der Kontrastdynamik bewerten.",
      "en": "A useful clue, but assess it together with enhancement dynamics.",
      "fa": "سرنخ مفیدی است، اما باید همراه الگوی جذب کنتراست ارزیابی شود."
    },
    "diagram": null,
    "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
  },
  {
    "id": "haemangiom-07-dwi-adc",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Helles DWI ohne niedrigen ADC: wie einordnen?",
      "en": "Bright DWI without low ADC: how to interpret it?",
      "fa": "DWI روشن بدون ADC پایین را چگونه تفسیر می‌کنیم؟"
    },
    "answer": {
      "de": "Bei T2-heller Läsion spricht das für T2-shine-through, nicht für bewiesene Restriktion.",
      "en": "In a T2-bright lesion this supports T2 shine-through, not proven restriction.",
      "fa": "در ضایعه با T2 روشن، به نفع T2 shine-through است؛ محدودیت انتشار اثبات نشده است."
    },
    "explanation": {
      "de": "ADC allein beweist keine Gutartigkeit; mit Morphologie und Dynamik kombinieren.",
      "en": "ADC alone does not prove benignity; combine it with morphology and dynamics.",
      "fa": "ADC به‌تنهایی خوش‌خیمی را ثابت نمی‌کند؛ آن را با مورفولوژی و الگوی دینامیک ترکیب کنید."
    },
    "diagram": null,
    "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
  },
  {
    "id": "haemangiom-08-t1c-dynamik",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Welche Referenz gilt für die Kontrastanreicherung?",
      "en": "What is the reference for enhancement?",
      "fa": "مرجع مقایسه جذب کنتراست چیست؟"
    },
    "answer": {
      "de": "Der Blutpool derselben Phase.",
      "en": "The blood pool in the same phase.",
      "fa": "مخزن خون در همان فاز."
    },
    "explanation": {
      "de": "Anreichernde Anteile folgen typischerweise dem Blutpool; sie müssen spät nicht isointens zur Leber sein.",
      "en": "Enhancing components typically follow the blood pool; they need not be isointense to liver on delayed images.",
      "fa": "بخش‌های جذب‌کننده کنتراست معمولاً از مخزن خون پیروی می‌کنند؛ در فاز تأخیری لزوماً با کبد هم‌سیگنال نیستند."
    },
    "diagram": null,
    "source": "https://pubmed.ncbi.nlm.nih.gov/18830105/"
  },
  {
    "id": "haemangiom-09-gross",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Warum können große Hämangiome inhomogen sein?",
      "en": "Why may large haemangiomas be heterogeneous?",
      "fa": "چرا همانژیوم‌های بزرگ ممکن است ناهمگن باشند؟"
    },
    "answer": {
      "de": "Durch Thromben, Fibrose und gelegentlich Verkalkungen.",
      "en": "Because of thrombus, fibrosis and occasional calcification.",
      "fa": "به‌علت ترومبوز، فیبروز و گاهی کلسیفیکاسیون."
    },
    "explanation": {
      "de": "Das T2-Signal und die Füllung können dadurch heterogen bleiben; fehlende komplette Füllung allein beweist keine Malignität.",
      "en": "T2 signal and filling may remain heterogeneous; incomplete filling alone does not prove malignancy.",
      "fa": "به همین دلیل سیگنال T2 و پرشدن می‌توانند ناهمگن بمانند؛ پرشدن ناقص به‌تنهایی بدخیمی را ثابت نمی‌کند."
    },
    "diagram": null,
    "source": "https://doi.org/10.1016/j.jhep.2016.04.001"
  },
  {
    "id": "haemangiom-10-atypisch-definition",
    "topicId": "haemangiom",
    "category": {
      "de": "Leberhämangiom",
      "en": "Hepatic haemangioma",
      "fa": "همانژیوم کبدی"
    },
    "front": {
      "de": "Wie unterscheiden sich Flash-filling und Sklerosierung?",
      "en": "How do flash-filling and sclerosis differ?",
      "fa": "نوع پرشدن سریع و نوع اسکلروزه چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "Flash-filling: früh homogen kräftig anreichernd. Sklerosierung: oft weniger T2-Signal und weniger typische Anreicherung.",
      "en": "Flash-filling: early intense homogeneous enhancement. Sclerosis: often reduced T2 signal and less typical enhancement.",
      "fa": "پرشدن سریع: جذب شدید و همگن زودرس. اسکلروز: اغلب کاهش سیگنال T2 و الگوی جذب کمتر تیپیک."
    },
    "explanation": {
      "de": "Atypische Hämangiome haben kein einheitliches Muster. Eine unklare Läsion nicht allein durch dieses Etikett für gutartig erklären.",
      "en": "Atypical haemangiomas have no single pattern. Do not declare an indeterminate lesion benign merely by using this label.",
      "fa": "همانژیوم‌های غیرتیپیک الگوی واحدی ندارند. فقط با این برچسب، ضایعه نامعین را خوش‌خیم اعلام نکنید."
    },
    "diagram": null,
    "source": "https://pubmed.ncbi.nlm.nih.gov/34041675/"
  }
]
