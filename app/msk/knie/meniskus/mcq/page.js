'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const QUESTIONS = {
  "de": [
    {
      "id": 1,
      "question": "Warum ist der Innenmeniskus (Meniscus medialis) im Vergleich zum Außenmeniskus signifikant häufiger von traumatischen Rissen betroffen?",
      "options": [
        {
          "id": "A",
          "text": "Er ist durch seine C-Form anatomisch instabiler geformt."
        },
        {
          "id": "B",
          "text": "Er ist fest mit der Gelenkkapsel und dem medialen Seitenband verwachsen und dadurch weniger beweglich."
        },
        {
          "id": "C",
          "text": "Er besitzt eine rein avaskuläre Versorgung über die gesamte Breite."
        },
        {
          "id": "D",
          "text": "Er artikuliert im Gegensatz zum Außenmeniskus nicht mit den Femurkondylen."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Die C-Form des Innenmeniskus und die O-Form des Außenmeniskus sind normale anatomische Varianten, die sich an die Form der jeweiligen Tibiaplateaus anpassen. Sie bedingen keine intrinsische mechanische Instabilität des Gewebes.\n\nB ist richtig: Die feste ligamentäre Fixierung des Innenmeniskus an der Gelenkkapsel und dem Innenband (MCL) schränkt seine Mobilität stark ein. Bei plötzlichen Rotations- oder Scherbewegungen kann er – anders als der mobile Außenmeniskus – nicht flexibel ausweichen und reißt deutlich schneller.\n\nC ist falsch: Beide Menisken weisen eine ähnliche vaskuläre Architektur auf. Sie sind in der Peripherie (rote Zone) gut durchblutet und werden nach zentral hin avaskulär. Der Innenmeniskus ist nicht komplett gefäßfrei.\n\nD ist falsch: Beide Menisken artikulieren proximal mit den Femurkondylen und distal mit dem Tibiaplateau, um ihre Hauptfunktion der Kraftübertragung und Stoßdämpfung im Gelenk zu erfüllen."
    },
    {
      "id": 2,
      "question": "Welches Kriterium muss laut der etablierten „Two-slice-touch“-Regel erfüllt sein, um die Diagnose eines Meniskusrisses im MRT mit hoher Spezifität zu sichern?",
      "options": [
        {
          "id": "A",
          "text": "Das Signal muss sowohl die superiore als auch die inferiore Gelenkfläche berühren."
        },
        {
          "id": "B",
          "text": "Die Signalsteigerung muss auf mindestens zwei aufeinanderfolgenden Schichtbildern mit Oberflächenkontakt nachweisbar sein."
        },
        {
          "id": "C",
          "text": "Der Riss muss in zwei unterschiedlichen Sequenzen (z. B. T1w und T2w) sichtbar sein."
        },
        {
          "id": "D",
          "text": "Die Läsion muss eine Ausdehnung von mindestens 3 mm in der Sagittalebene aufweisen."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Ein Riss muss nicht die gesamte Höhe des Meniskus durchbauen. Es reicht völlig aus, wenn das pathologische Signal entweder nur die obere (superiore) oder nur die untere (inferiore) Gelenkfläche schneidet.\n\nB ist richtig: Die Regel besagt, dass die intrameniskale Signalsteigerung auf mindestens zwei direkt benachbarten Schnittbildern (Slices) Kontakt zur Oberfläche haben muss. Dies eliminiert das Risiko, ein rein technisches Rauschen oder einen Volumenmitteleffekt auf einer Einzelschicht fälschlicherweise als Riss zu interpretieren.\n\nC ist falsch: Obwohl Risse idealerweise in mehreren Sequenzen und Ebenen (sagittal/koronar) evaluiert werden, bezieht sich die spezifische „Two-slice-touch“-Regel rein auf die Kontinuität über aufeinanderfolgende Schichten derselben Sequenz.\n\nD ist falsch: Die Regel ist unabhängig von einer absoluten Millimeter-Metrik. Sie definiert sich ausschließlich über die Anzahl der betroffenen Schichten, auch wenn die Standard-Schnittdicke im Protokoll meist 3 mm beträgt."
    },
    {
      "id": 3,
      "question": "In welcher vaskulären Zone zeigt eine Meniskusruptur die besten biologischen Voraussetzungen für eine erfolgreiche Meniskusnaht?",
      "options": [
        {
          "id": "A",
          "text": "Weiße Zone (Zone III)"
        },
        {
          "id": "B",
          "text": "Rot-Weiße Zone (Zone II)"
        },
        {
          "id": "C",
          "text": "Rote Zone (Zone I)"
        },
        {
          "id": "D",
          "text": "Meniskuswurzel (Root)"
        }
      ],
      "correct": "C",
      "explanation": "A ist falsch: Die weiße Zone bildet das zentral gelegene Drittel des Meniskus. Sie ist komplett avaskulär (gefäßfrei) und wird rein per Diffusion durch die Synovialflüssigkeit ernährt. Eine Naht bleibt hier aufgrund fehlender Heilungspotenz fast immer erfolglos.\n\nB ist falsch: Die rot-weiße Zone ist ein Übergangsbereich (ca. 3–5 mm von der Kapsel entfernt). Hier liegt nur noch eine sehr eingeschränkte, kapillare Blutversorgung vor, weshalb die Heilungstendenz nach einer Naht unsicher ist.\n\nC ist richtig: Die rote Zone (Zone I) umfasst den kapsennahen Außenrand (<3 mm). Sie wird direkt über den perimeniskalen Plexus reichlich mit Blut versorgt. Die biologischen Voraussetzungen für die Einwanderung von Fibroblasten und die Gewebeheilung sind hier optimal, was eine Refixation (Naht) begünstigt.\n\nD ist falsch: Die Meniskuswurzeln (Roots) stellen die ligamentäre Verankerung der Meniskushörner am Tibiaplateau dar. Sie beschreiben keine vaskuläre Zone des funktionellen Meniskuskörpers."
    },
    {
      "id": 4,
      "question": "Welche MRT-Sequenz eignet sich laut Protokoll am besten für den definitiven Nachweis von akuten Meniskusrissen, begleitenden Knochenödemen und Kontinuitätsunterbrechungen der Bänder?",
      "options": [
        {
          "id": "A",
          "text": "Native T1-Wichtung ohne Fettsättigung."
        },
        {
          "id": "B",
          "text": "T2-gewichtete oder PD-fettgesättigte (fs) Sequenzen."
        },
        {
          "id": "C",
          "text": "3D-Gradienechosequenzen mit einer Schichtdicke von 6 mm."
        },
        {
          "id": "D",
          "text": "T2*-gewichtete Phasenkontrast-Angiographie."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Die native T1-Wichtung bietet zwar eine exzellente anatomische Übersicht und zeigt chronische Fibrosen gut an, ist jedoch nicht flüssigkeitssensitiv. Akuter Riss-induzierter Flüssigkeitseinstrom oder Knochenmarködeme lassen sich darin kaum differenzieren.\n\nB ist richtig: T2-w oder PD-fs (Protonendichte mit Fettsättigung) Sequenzen sind extrem sensitiv für freies Wasser. Da pathologische Veränderungen wie ein Rissspalt (gefüllt mit Synovialflüssigkeit) oder Ödeme viel Wasser enthalten, leuchten sie hyperintens (hell) vor dem unterdrückten, dunklen Hintergrundgewebe auf.\n\nC ist falsch: Eine Schichtdicke von 6 mm ist für die Kniebinnendiagnostik deutlich zu grob. Kleine Risse würden durch den Volumenmitteleffekt komplett maskiert. Der Standard liegt bei maximal 3 mm Schnittdicke.\n\nD ist falsch: Die Phasenkontrast-Angiographie dient der funktionellen Darstellung von Blutströmen in Gefäßen. Für die Beurteilung der statischen, fibrocartilaginären Gewebestrukturen des Kniegelenks ist sie ungeeignet."
    },
    {
      "id": 5,
      "question": "Wie unterscheidet sich die Verteilung von Rissen im Hinterhorn des Außenmeniskus im Vergleich zum Innenmeniskus?",
      "options": [
        {
          "id": "A",
          "text": "Beim Außenmeniskus betreffen praktisch alle Risse das Vorderhorn."
        },
        {
          "id": "B",
          "text": "Beim Außenmeniskus liegen etwa 50 % der Risse im Hinterhorn, während beim Innenmeniskus ca. 98 % das Hinterhorn betreffen."
        },
        {
          "id": "C",
          "text": "Risse im Hinterhorn des Außenmeniskus treten aufgrund der O-Form überhaupt nicht auf."
        },
        {
          "id": "D",
          "text": "Die Verteilung ist bei beiden Menisken absolut identisch."
        }
      ],
      "correct": "B",
      "explanation": "A ist falsch: Das Vorderhorn des Außenmeniskus ist zwar häufiger betroffen als das des Innenmeniskus, macht aber keineswegs die Gesamtheit aller Außenmeniskusrisse aus.\n\nB ist richtig: Das Hinterhorn des Innenmeniskus ist durch seine posteriore Fixierung der mechanische Drehpunkt bei Kniebewegungen und extremen Belastungen ausgesetzt – daher liegen hier nahezu 98 % der Risse. Der Außenmeniskus ist mobiler; bei ihm entfällt nur die Hälfte der Risse auf das Hinterhorn, während der Rest auf das Vorderhorn und den Corpus (Mittelabschnitt) verteilt ist.\n\nC ist falsch: Die geometrische O-Form schützt den Außenmeniskus nicht vor Pathologien. Das Hinterhorn bleibt auch hier mit 50 % der Fälle statistisch die häufigste Lokalisation für Risse.\n\nD ist falsch: Aufgrund der stark unterschiedlichen biomechanischen Fixierungen und Beweglichkeiten weisen Innen- und Außenmeniskus völlig unterschiedliche Verteilungsmuster bei Läsionen auf."
    },
    {
      "id": 6,
      "question": "Ein radiologischer Befund beschreibt ein keilförmiges/globuläres Signal im Meniskusgewebe, das die Gelenkfläche im vorliegenden Schnittbild knapp nicht erreicht. Welchem Subtyp nach Lotysch ist dies zuzuordnen?",
      "options": [
        {
          "id": "A",
          "text": "Grad 2a"
        },
        {
          "id": "B",
          "text": "Grad 2b"
        },
        {
          "id": "C",
          "text": "Grad 2c"
        },
        {
          "id": "D",
          "text": "Grad 3"
        }
      ],
      "correct": "C",
      "explanation": "A ist falsch: Grad 2a ist definiert als ein rein lineares (strichförmiges) Signal im Meniskusinneren, das keinen Kontakt zur superioren oder inferioren Oberfläche aufweist. Es zeigt keine flächige Ausdehnung.\n\nB ist falsch: Grad 2b beschreibt ebenfalls ein lineares Signal, welches jedoch die Gelenkoberfläche auf genau einem einzigen Bild berührt, was den Befund inkonklusiv für einen echten Riss macht.\n\nC ist richtig: Ein keilförmiges, flächiges oder kugelförmiges (globuläres) Signal im Gewebe ohne eindeutigen Oberflächenkontakt entspricht dem Stadium Grad 2c nach Lotysch. Es repräsentiert eine fortgeschrittene mukoide Degeneration mit einem sehr hohen Risiko für das Vorliegen eines okkulten (versteckten) Risses.\n\nD ist falsch: Grad 3 setzt voraus, dass das Signal die Gelenkoberfläche eindeutig und reproduzierbar durchbricht (auf mindestens zwei aufeinanderfolgenden Schichten). Solange kein Oberflächenkontakt vorliegt, darf kein Grad 3 diagnostiziert werden."
    }
  ],
  "en": [
    {
      "id": 1,
      "question": "Why is the medial meniscus significantly more frequently affected by traumatic tears compared to the lateral meniscus?",
      "options": [
        {
          "id": "A",
          "text": "It is anatomically less stable due to its C-shape."
        },
        {
          "id": "B",
          "text": "It is firmly attached to the joint capsule and the medial collateral ligament, making it less mobile."
        },
        {
          "id": "C",
          "text": "It has a purely avascular supply across its entire width."
        },
        {
          "id": "D",
          "text": "Unlike the lateral meniscus, it does not articulate with the femoral condyles."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: The C-shape of the medial meniscus and the O-shape of the lateral meniscus are normal anatomical variations matching their respective tibial plateaus. They do not cause intrinsic mechanical tissue instability.\n\nB is correct: The firm ligamentous anchoring of the medial meniscus to the capsule and the medial collateral ligament (MCL) severely limits its mobility. Under rotational or shearing stress, it cannot glide out of the way like the mobile lateral meniscus, making it highly susceptible to tears.\n\nC is incorrect: Both menisci share a similar vascular layout, featuring a well-perfused periphery (red zone) and an avascular central region. The medial meniscus is not entirely devoid of blood vessels.\n\nD is incorrect: Both menisci articulate with the femoral condyles superiorly and the tibial plateau inferiorly to perform their primary load-bearing and shock-absorbing functions within the joint."
    },
    {
      "id": 2,
      "question": "According to the established \"two-slice-touch\" rule, which criterion must be met to diagnose a meniscus tear on MRI with high specificity?",
      "options": [
        {
          "id": "A",
          "text": "The signal must touch both the superior and inferior articular surfaces."
        },
        {
          "id": "B",
          "text": "The signal increase must be detectable with surface contact on at least two consecutive slices."
        },
        {
          "id": "C",
          "text": "The tear must be visible in two different sequences (e.g., T1w and T2w)."
        },
        {
          "id": "D",
          "text": "The lesion must have an extension of at least 3 mm in the sagittal plane."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: A tear does not need to span the entire height of the meniscus. It is completely sufficient if the pathological signal intersects either the superior or the inferior articular surface.\n\nB is correct: This rule dictates that the intrameniscal signal abnormality must communicate with the articular surface on at least two directly adjacent images (slices). This eliminates the risk of misinterpreting technical noise or volume averaging artifacts on a single slice as a true tear.\n\nC is incorrect: While tears should ideally be verified across multiple planes (sagittal/coronal) and sequences, the \"two-slice-touch\" rule specifically demands continuity across successive slices within the same sequence.\n\nD is incorrect: The rule is independent of absolute millimeter measurements. It relies solely on the number of involved slices, regardless of the protocol's standard slice thickness (which is typically 3 mm)."
    },
    {
      "id": 3,
      "question": "In which vascular zone does a meniscus tear present the best biological conditions for a successful meniscus repair (suture)?",
      "options": [
        {
          "id": "A",
          "text": "White zone (Zone III)"
        },
        {
          "id": "B",
          "text": "Red-white zone (Zone II)"
        },
        {
          "id": "C",
          "text": "Red zone (Zone I)"
        },
        {
          "id": "D",
          "text": "Meniscal root"
        }
      ],
      "correct": "C",
      "explanation": "A is incorrect: The white zone comprises the central third of the meniscus and is completely avascular, relying purely on diffusion from synovial fluid. Suturing here almost always fails due to the lack of healing potential.\n\nB is incorrect: The red-white zone is a transitional area (approx. 3–5 mm from the capsule). It contains only a sparse, capillary blood supply, making the predictability of tissue healing after suturing highly uncertain.\n\nC is correct: The red zone (Zone I) represents the peripheral outer rim (<3 mm from the capsule) and receives a rich blood supply from the perimeniscal capillary plexus. The biological prerequisites for fibroblast migration and tissue repair are optimal here, favoring anatomical reconstruction.\n\nD is incorrect: The meniscal roots anchor the anterior and posterior horns to the tibial plateau. They represent specific ligamentous attachments rather than a vascular zone of the functional meniscal body."
    },
    {
      "id": 4,
      "question": "According to standard protocols, which MRI sequence is best suited for the definitive detection of acute meniscus tears, accompanying bone marrow edema, and ligament disruptions?",
      "options": [
        {
          "id": "A",
          "text": "Native T1-weighting without fat saturation."
        },
        {
          "id": "B",
          "text": "T2-weighted or PD fat-saturated (fs) sequences."
        },
        {
          "id": "C",
          "text": "3D gradient-echo sequences with a slice thickness of 6 mm."
        },
        {
          "id": "D",
          "text": "T2*-weighted phase-contrast angiography."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: Native T1-weighting provides excellent anatomical details and screens well for chronic fibrosis, but it lacks fluid sensitivity. Acute fluid entering a tear cleft or bone marrow edema cannot be reliably differentiated.\n\nB is correct: T2-w or PD-fs (proton density fat-saturated) sequences are highly sensitive to free fluid. Pathological changes like a tear gap (filled with synovial fluid) or marrow edema contain high amounts of water and appear hyperintense (bright) against the suppressed, dark background.\n\nC is incorrect: A 6 mm slice thickness is far too thick for internal knee derangement diagnostics. Small tears would be completely hidden due to volume averaging effects. The standard protocol requires a maximum thickness of 3 mm.\n\nD is incorrect: Phase-contrast angiography is designed to image fluid dynamics within vessels. It is entirely unsuited for evaluating the static, fibrocartilaginous tissue components of the knee joint."
    },
    {
      "id": 5,
      "question": "How does the distribution of tears in the posterior horn of the lateral meniscus differ compared to the medial meniscus?",
      "options": [
        {
          "id": "A",
          "text": "In the lateral meniscus, practically all tears affect the anterior horn."
        },
        {
          "id": "B",
          "text": "In the lateral meniscus, about 50% of tears are located in the posterior horn, whereas in the medial meniscus, approximately 98% affect the posterior horn."
        },
        {
          "id": "C",
          "text": "Tears in the posterior horn of the lateral meniscus do not occur at all due to its O-shape."
        },
        {
          "id": "D",
          "text": "The distribution is absolutely identical in both menisci."
        }
      ],
      "correct": "B",
      "explanation": "A is incorrect: Although the anterior horn of the lateral meniscus is torn more often than that of the medial meniscus, it does not account for all or even the majority of lateral meniscal tears.\n\nB is correct: Because the posterior horn of the medial meniscus is rigidly fixed, it acts as a mechanical pivot during knee movement, absorbing immense stress—causing roughly 98% of its tears to occur there. The lateral meniscus is less constrained; only half of its tears affect the posterior horn, with the remainder distributed among the body (corpus) and anterior horn.\n\nC is incorrect: The geometric O-shape does not immunize the lateral meniscus against injury. Statistically, the posterior horn remains the most common site for tears, accounting for 50% of cases.\n\nD is incorrect: Due to completely different biomechanical fixations and mobility profiles, the medial and lateral menisci display entirely distinct lesion distribution patterns."
    },
    {
      "id": 6,
      "question": "A radiology report describes a wedge-shaped/globular signal within the meniscus tissue that just falls short of reaching the articular surface on the current image. Which Lotysch subtype does this represent?",
      "options": [
        {
          "id": "A",
          "text": "Grade 2a"
        },
        {
          "id": "B",
          "text": "Grade 2b"
        },
        {
          "id": "C",
          "text": "Grade 2c"
        },
        {
          "id": "D",
          "text": "Grade 3"
        }
      ],
      "correct": "C",
      "explanation": "A is incorrect: Grade 2a is strictly defined as a purely linear (line-like) intrameniscal signal that shows absolutely no communication with either the superior or inferior articular surface. It lacks any broad or expanding morphology.\n\nB is incorrect: Grade 2b also describes a linear signal, but one that touches the articular surface on exactly a single slice, rendering the imaging finding inconclusive for a definitive tear.\n\nC is correct: A wedge-shaped, wide, or rounded (globular) intrameniscal signal that does not definitively break through the surface is classified as Lotysch Grade 2c. This indicates severe mucoid degeneration carrying an exceptionally high risk of an underlying occult (hidden) tear.\n\nD is incorrect: Grade 3 requires the signal to clearly and reproducibly breach the articular surface on at least two consecutive slices. Without objective surface contact, a Grade 3 diagnosis is not permitted."
    }
  ],
  "fa": [
    {
      "id": 1,
      "question": "چرا منیسک داخلی (Meniscus medialis) در مقایسه با منیسک خارجی به طور معناداری بیشتر دچار پارگی‌های تروماتیک (ناشی از ضربه) می‌شود؟",
      "options": [
        {
          "id": "A",
          "text": "به دلیل شکل C مانند خود، از نظر آناتومیک پایداری کمتری دارد."
        },
        {
          "id": "B",
          "text": "به کپسول مفصلی و رباط جانبی داخلی (MCL) چسبیده است و در نتیجه تحرک کمتری دارد."
        },
        {
          "id": "C",
          "text": "در تمام پهنای خود دارای خون‌رسانی کاملاً غیرعروقی (بدون رگ) است."
        },
        {
          "id": "D",
          "text": "برعکس منیسک خارجی، با کندیل‌های فمور (استخوان ران) مفصل نمی‌شود."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: شکل C در منیسک داخلی و شکل O در منیسک خارجی، واریانت‌های آناتومیک نرمال هستند که با شکل پلاتوی تیبیا مطابقت دارند. این اشکال هندسی به خودی خود باعث ناپایداری مکانیکی بافت نمی‌شوند.\n\nب صحیح است: اتصال محکم منیسک داخلی به کپسول مفصلی و رباط جانبی داخلی (MCL) تحرک آن را به شدت محدود می‌کند. در هنگام حرکات چرخشی یا اعمال نیروهای برشی ناگهانی، این منیسک – برخلاف منیسک خارجی که آزاد و متحرک است – نمی‌تواند جابجا شود و پاره می‌شود.\n\nج غلط است: هر دو منیسک ساختار عروقی مشابهی دارند؛ یعنی در محیط (ناحیه قرمز) دارای رگ‌های خونی هستند و به سمت مرکز بدون رگ (آواسکولار) می‌شوند. منیسک داخلی کاملاً فاقد عروق نیست.\n\nد غلط است: هر دو منیسک از سمت بالا (پروکسیمال) با کندیل‌های فمور و از سمت پایین (دیستال) با پلاتوی تیبیا مفصل می‌شوند تا وظیفه اصلی خود یعنی توزیع بار و جذب ضربه را در مفصل انجام دهند."
    },
    {
      "id": 2,
      "question": "طبق قانون شناخته‌شده‌ی \"Two-slice-touch\" (تماس در دو تصویر)، چه معیاری باید وجود داشته باشد تا تشخیص پارگی منیسک در MRI با دقت و ویژگی بالا تایید شود؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال باید هم با سطح مفصلی بالایی (سوپریور) و هم پایینی (اینفریور) تماس داشته باشد."
        },
        {
          "id": "B",
          "text": "افزایش سیگنال باید حداقل در دو تصویر (برش) متوالی که با سطح مفصلی تماس دارند، دیده شود."
        },
        {
          "id": "C",
          "text": "پارگی باید در دو سکانس مختلف (مانند T1w و T2w) قابل رویت باشد."
        },
        {
          "id": "D",
          "text": "طول ضایعه در صفحه ساجیتال باید حداقل ۳ میلی‌متر باشد."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: یک پارگی نیازی ندارد که کل ارتفاع منیسک را طی کند. اگر سیگنال پاتولوژیک فقط به سطح مفصلی بالایی (سوپریور) یا فقط به سطح پایینی (اینفریور) رسیده باشد، برای تشخیص کفایت می‌کند.\n\nب صحیح است: این قانون تصریح می‌کند که سیگنال افزایش‌یافته‌ی داخل منیسک باید حداقل در دو برش مجاور و پشت‌سرهم با سطح مفصل تماس داشته باشد. این معیار خطر اشتباه گرفتن نویزهای تکنیکی دستگاه یا پدیده حجم متوسط (Volume Averaging) در یک تک‌برش را با پارگی واقعی از بین می‌برد.\n\nج غلط است: اگرچه بررسی پارگی در سکانس‌ها و صفحات مختلف (ساجیتال/کورونال) ایده‌آل است، اما قانون خاص \"Two-slice-touch\" صرفاً بر تداوم ضایعه در برش‌های متوالی یک سکانس واحد تاکید دارد.\n\nد غلط است: این قانون مستقل از اندازه‌گیری‌های مطلق به میلی‌متر است و فقط بر اساس تعداد برش‌های درگیر تعریف می‌شود، حتی اگر ضخامت استاندارد برش‌ها در پروتکل معمولاً ۳ میلی‌متر باشد."
    },
    {
      "id": 3,
      "question": "پارگی منیسک در کدام ناحیه عروقی (خون‌رسانی)، بهترین شرایط بیولوژیکی را برای یک جراحی ترمیم و دوختن موفقیت‌آمیز (Suture) دارد؟",
      "options": [
        {
          "id": "A",
          "text": "ناحیه سفید (Zone III)"
        },
        {
          "id": "B",
          "text": "ناحیه قرمز-سفید (Zone II)"
        },
        {
          "id": "C",
          "text": "ناحیه قرمز (Zone I)"
        },
        {
          "id": "D",
          "text": "ریشه منیسک (Root)"
        }
      ],
      "correct": "C",
      "explanation": "الف غلط است: ناحیه سفید یک‌سوم مرکزی منیسک را تشکیل می‌دهد، کاملاً آواسکولار (بدون رگ) است و تغذیه آن صرفاً از طریق انتشار (دیفیوژن) مایع سینوویال انجام می‌شود. بخیه زدن در این ناحیه به دلیل عدم پتانسیل ترمیم بافتی تقریباً همیشه شکست می‌خورد.\n\nب غلط است: ناحیه قرمز-سفید یک منطقه بینابینی است (حدود ۳ تا ۵ میلی‌متر از کپسول). در این ناحیه خون‌رسانی مویرگی بسیار محدودی وجود دارد، به همین دلیل پیش‌آگهی و روند ترمیم بافت پس از بخیه زدن نامشخص و نامطمئن است.\n\nج صحیح است: ناحیه قرمز (Zone I) شامل لبه بیرونی و مجاور کپسول مفصلی است (فاصله کمتر از ۳ میلی‌متر). این ناحیه مستقیماً از طریق شبکه مویرگی دور منیسکی خون‌رسانی می‌شود. شرایط بیولوژیک برای مهاجرت فیبروبلاست‌ها و ترمیم بافت در اینجا ایده‌آل است و جوش خوردن بخیه را تسهیل می‌کند.\n\nد غلط است: ریشه‌های منیسک (Roots) محل اتصال لیگامانی شاخ‌های منیسک به پلاتوی تیبیا هستند. این بخش‌ها یک ناحیه عروقی در تنه کارکردی منیسک محسوب نمی‌شوند."
    },
    {
      "id": 4,
      "question": "طبق پروتکل‌های استاندارد، کدام سکانس MRI بهترین گزینه برای تشخیص قطعی پارگی‌های حاد منیسک، ادم (تجمع مایع) مغز استخوان و پارگی رباط‌ها است؟",
      "options": [
        {
          "id": "A",
          "text": "سکانس T1 معمولی بدون حذف چربی."
        },
        {
          "id": "B",
          "text": "سکانس‌های T2-weighted یا فشرده با حذف چربی (PD-fs)."
        },
        {
          "id": "C",
          "text": "سکانس‌های سه‌بعدی Gradient-Echo با ضخامت برش ۶ میلی‌متر."
        },
        {
          "id": "D",
          "text": "آنژیوگرافی تداخل فاز با وزن T2*."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: سکانس T1 معمولی اگرچه آناتومی را به خوبی نشان می‌دهد و برای ارزیابی فیبروز مزمن مفید است، اما به مایعات حساس نیست. مایع حاد وارد شده به خط پارگی یا ادم مغز استخوان در این سکانس به درستی تفکیک نمی‌شوند.\n\nب صحیح است: سکانس‌های T2 یا PD-fs (پروتون دنسیتی با حذف چربی) به شدت به آب آزاد حساس هستند. از آنجا که پاتولوژی‌هایی مانند خط پارگی (پر شده با مایع سینوویال) یا ادم حاوی آب زیادی هستند، در این سکانس‌ها به صورت هایپرینتنس (روشن و سفید) در یک پس‌زمینه تاریک و حذف‌شده به خوبی دیده می‌شوند.\n\nج غلط است: ضخامت برش ۶ میلی‌متر برای تشخیص ضایعات داخلی زانو بسیار ضخیم است. پارگی‌های کوچک به دلیل پدیده حجم متوسط کاملاً محو می‌شوند. استاندارد پروتکل حداکثر ۳ میلی‌متر است.\n\nد غلط است: آنژیوگرافی تداخل فاز برای نشان دادن دینامیک جریان خون در رگ‌ها کاربرد دارد و برای ارزیابی بافت‌های استاتیک و غضروفی-فیبری مفصل زانو کاملاً بی‌استفاده است."
    },
    {
      "id": 5,
      "question": "نحوه توزیع و پخش شدن پارگی‌ها در شاخ پشتی (Hinterhorn) منیسک خارجی چه تفاوتی با منیسک داخلی دارد؟",
      "options": [
        {
          "id": "A",
          "text": "در منیسک خارجی، تقریباً تمام پارگی‌ها شاخ جلویی را درگیر می‌کنند."
        },
        {
          "id": "B",
          "text": "در منیسک خارجی حدود ۵۰٪ پارگی‌ها در شاخ پشتی رخ می‌دهد، در حالی که در منیسک داخلی حدود ۹۸٪ پارگی‌ها مربوط به شاخ پشتی است."
        },
        {
          "id": "C",
          "text": "پارگی در شاخ پشتی منیسک خارجی به دلیل شکل O مانند آن اصلاً رخ نمی‌دهد."
        },
        {
          "id": "D",
          "text": "میزان توزیع پارگی در هر دو منیسک کاملاً یکسان و مشابه است."
        }
      ],
      "correct": "B",
      "explanation": "الف غلط است: اگرچه شاخ جلویی منیسک خارجی بیشتر از منیسک داخلی دچار پارگی می‌شود، اما به هیچ وجه شامل تمام یا حتی اکثریت پارگی‌های منیسک خارجی نیست.\n\nب صحیح است: شاخ پشتی منیسک داخلی به دلیل تثبیت بودن، نقطه اتکای مکانیکی در حرکات زانو است و استرس شدیدی را تحمل می‌کند؛ به همین دلیل نزدیک به ۹۸٪ پارگی‌های آن در این ناحیه است. منیسک خارجی متحرک‌تر است؛ بنابراین تنها نیمی از پارگی‌های آن در شاخ پشتی رخ می‌دهد و بقیه در بدنه (Corpus) و شاخ جلویی پخش می‌شوند.\n\nج غلط است: شکل هندسی O مانند، منیسک خارجی را در برابر آسیب مصون نمی‌کند. از نظر آماری، شاخ پشتی همچنان با ۵۰٪ موارد، شایع‌ترین محل پارگی در منیسک خارجی است.\n\nد غلط است: به دلیل تفاوت‌های ساختاری و بیومکانیکی در میزان تثبیت و تحرک، منیسک داخلی و خارجی الگوهای توزیع ضایعه کاملاً متفاوتی را نشان می‌دهند."
    },
    {
      "id": 6,
      "question": "یک گزارش رادیولوژی، وجود یک سیگنال گوهه‌ای شکل یا گرد (Globular) را در بافت منیسک توصیف می‌کند که در تصویر موجود، پاره شده و به سطح مفصل نرسیده است. این وضعیت با کدام ساب‌تایپ (زیرگروه) سیستم درجه‌بندی Lotysch مطابقت دارد؟",
      "options": [
        {
          "id": "A",
          "text": "درجه 2a"
        },
        {
          "id": "B",
          "text": "درجه 2b"
        },
        {
          "id": "C",
          "text": "درجه 2c"
        },
        {
          "id": "D",
          "text": "درجه ۳"
        }
      ],
      "correct": "C",
      "explanation": "الف غلط است: درجه 2a دقیقاً به عنوان یک سیگنال خطی (خط‌مانند) در داخل منیسک تعریف می‌شود که هیچ اتصالی با سطح مفصلی بالایی یا پایینی ندارد و فاقد هرگونه گسترش وسیع یا گرد است.\n\nب غلط است: درجه 2b نیز یک سیگنال خطی را توصیف می‌کند، با این تفاوت که سیگنال دقیقاً در یک تک‌برش با سطح مفصل تماس پیدا می‌کند که این یافته را برای پارگی قطعی غیرقابل استناد (Inconclusive) می‌سازد.\n\nج صحیح است: یک سیگنال درون‌منیسکی به شکل گوهه‌ای، وسیع یا گرد (Globular) که به طور قطعی سطح را قطع نکرده است، طبق سیستم لوتیش درجه 2c نامیده می‌شود. این حالت نشان‌دهنده دژنراسیون موکوئید پیشرفته است و ریسک بسیار بالایی برای یک پارگی مخفی (Occult) دارد.\n\nد غلط است: درجه ۳ مستلزم آن است که سیگنال به طور واضح و تکرارپذیر (حداقل در دو برش متوالی) سطح مفصلی را قطع کرده باشد. تا زمانی که تماس با سطح احراز نشود، تشخیص درجه ۳ مجاز نیست."
    }
  ]
}

const GRADE_DATA = {
  de: [
    { min: 6, label: 'Ausgezeichnet!', sub: 'Perfekte Punktzahl – Meniskusdiagnostik sitzt sehr sicher.', emoji: '🏆', color: '#059669' },
    { min: 5, label: 'Sehr gut!', sub: 'Starkes Wissen mit nur kleinen Lücken.', emoji: '🎯', color: '#0ea5e9' },
    { min: 3, label: 'Gut gemacht', sub: 'Grundlagen sitzen – Details weiter vertiefen.', emoji: '📖', color: '#f97316' },
    { min: 0, label: 'Weiter üben', sub: 'Lernseite nochmal durcharbeiten und erneut testen.', emoji: '💪', color: '#ef4444' },
  ],
  en: [
    { min: 6, label: 'Excellent!', sub: 'Perfect score – meniscus MRI diagnostics are very solid.', emoji: '🏆', color: '#059669' },
    { min: 5, label: 'Very good!', sub: 'Strong knowledge with only minor gaps.', emoji: '🎯', color: '#0ea5e9' },
    { min: 3, label: 'Well done', sub: 'Core knowledge is solid – deepen the details further.', emoji: '📖', color: '#f97316' },
    { min: 0, label: 'Keep practicing', sub: 'Review the learning page and try again.', emoji: '💪', color: '#ef4444' },
  ],
  fa: [
    { min: 6, label: 'عالی!', sub: 'نمره کامل – تشخیص MRI منیسک را خیلی خوب بلد هستید.', emoji: '🏆', color: '#059669' },
    { min: 5, label: 'خیلی خوب!', sub: 'دانش قوی با چند نکته کوچک برای مرور.', emoji: '🎯', color: '#0ea5e9' },
    { min: 3, label: 'خوب بود', sub: 'اصول پایه خوب است – جزئیات را بیشتر مرور کنید.', emoji: '📖', color: '#f97316' },
    { min: 0, label: 'ادامه تمرین', sub: 'صفحه آموزشی را دوباره مرور کنید و مجدداً امتحان دهید.', emoji: '💪', color: '#ef4444' },
  ],
}

const UI = {
  de: {
    breadMsk: 'Muskuloskelettales',
    breadTopic: 'Knie · Meniskus',
    title: 'MCQ · Meniskus',
    subtitle: '6 Prüfungsfragen · MRT · Anatomie · Rissdiagnostik',
    questionOf: (c, t) => `Frage ${c} von ${t}`,
    checkBtn: 'Antwort prüfen',
    nextBtn: 'Nächste Frage',
    resultBtn: 'Ergebnis anzeigen',
    restartBtn: 'Nochmal starten',
    learnBtn: '← Zur Lernseite',
    correct: 'Richtig!',
    incorrect: 'Leider falsch',
    correctAnswer: 'Richtige Antwort:',
    explanation: 'Erklärung',
    scoreLabel: (s, t) => `${s} von ${t} Fragen richtig`,
    summaryTitle: 'Zusammenfassung',
    wrongOnly: 'Nur falsche Fragen',
    allQ: 'Alle Fragen',
    correctTag: '✓ Richtig',
    wrongTag: '✗ Falsch',
    yourAnswer: 'Deine Antwort:',
    rightAnswer: 'Richtige Antwort:',
    progressLabel: (c, t) => `${c}/${t}`,
  },
  en: {
    breadMsk: 'Musculoskeletal',
    breadTopic: 'Knee · Meniscus',
    title: 'MCQ · Meniscus',
    subtitle: '6 exam questions · MRI · Anatomy · tear diagnosis',
    questionOf: (c, t) => `Question ${c} of ${t}`,
    checkBtn: 'Check Answer',
    nextBtn: 'Next Question',
    resultBtn: 'Show Results',
    restartBtn: 'Restart',
    learnBtn: '← Back to Learning',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    correctAnswer: 'Correct answer:',
    explanation: 'Explanation',
    scoreLabel: (s, t) => `${s} out of ${t} correct`,
    summaryTitle: 'Summary',
    wrongOnly: 'Wrong only',
    allQ: 'All questions',
    correctTag: '✓ Correct',
    wrongTag: '✗ Wrong',
    yourAnswer: 'Your answer:',
    rightAnswer: 'Correct answer:',
    progressLabel: (c, t) => `${c}/${t}`,
  },
  fa: {
    breadMsk: 'اسکلتی-عضلانی',
    breadTopic: 'زانو · منیسک',
    title: 'MCQ · منیسک',
    subtitle: '۶ سوال امتحانی · MRI · آناتومی · تشخیص پارگی',
    questionOf: (c, t) => `سوال ${c} از ${t}`,
    checkBtn: 'بررسی پاسخ',
    nextBtn: 'سوال بعدی',
    resultBtn: 'نمایش نتیجه',
    restartBtn: 'شروع مجدد',
    learnBtn: '← به صفحه آموزش',
    correct: 'درست!',
    incorrect: 'متأسفانه اشتباه',
    correctAnswer: 'پاسخ صحیح:',
    explanation: 'توضیح',
    scoreLabel: (s, t) => `${s} از ${t} سوال درست`,
    summaryTitle: 'خلاصه',
    wrongOnly: 'فقط اشتباه‌ها',
    allQ: 'همه سوالات',
    correctTag: '✓ درست',
    wrongTag: '✗ اشتباه',
    yourAnswer: 'پاسخ شما:',
    rightAnswer: 'پاسخ صحیح:',
    progressLabel: (c, t) => `${c}/${t}`,
  },
}

function withLang(href, lang) {
  return lang === 'de' ? href : `${href}?lang=${lang}`
}

function getGrade(score, lang) {
  const grades = GRADE_DATA[lang] || GRADE_DATA.de
  return grades.find(g => score >= g.min) || grades[grades.length - 1]
}

export default function MeniskusMCQPage() {
  const { lang } = useLanguage()
  const ui = UI[lang] || UI.de
  const questions = QUESTIONS[lang] || QUESTIONS.de
  const isRTL = lang === 'fa'

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [answers, setAnswers] = useState([])
  const [phase, setPhase] = useState('quiz')
  const [summaryFilter, setSummaryFilter] = useState('all')

  const q = questions[current]
  const total = questions.length
  const isLast = current === total - 1

  const handleCheck = () => {
    if (!selected) return
    setChecked(true)
    setAnswers(prev => [
      ...prev.filter(a => a.qId !== q.id),
      { qId: q.id, selected, correct: selected === q.correct },
    ])
  }

  const handleNext = () => {
    if (isLast) {
      setPhase('result')
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setChecked(false)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setChecked(false)
    setAnswers([])
    setPhase('quiz')
    setSummaryFilter('all')
  }

  const score = answers.filter(a => a.correct).length
  const grade = getGrade(score, lang)
  const progressPct = ((current + (checked ? 1 : 0)) / total) * 100
  const learnHref = withLang('/msk/knie/meniskus', lang)
  const mskHref = withLang('/lernen/msk', lang)

  if (phase === 'result') {
    const filtered = summaryFilter === 'wrong'
      ? questions.filter(sq => answers.find(a => a.qId === sq.id && !a.correct))
      : questions

    return (
      <div className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
        <div className={styles.topBar}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadLink}>RadYar</Link>
            <span className={styles.sep}>›</span>
            <Link href={mskHref} className={styles.breadLink}>{ui.breadMsk}</Link>
            <span className={styles.sep}>›</span>
            <Link href={learnHref} className={styles.breadLink}>{ui.breadTopic}</Link>
            <span className={styles.sep}>›</span>
            <span className={styles.breadCurrent}>MCQ</span>
          </div>
          <h1 className={styles.pageTitle}>{ui.title}</h1>
        </div>

        <div className={styles.resultWrap}>
          <div className={styles.scoreCard} style={{ borderColor: grade.color }}>
            <div className={styles.scoreEmoji}>{grade.emoji}</div>
            <div className={styles.scoreNumber} style={{ color: grade.color }}>
              {score}<span className={styles.scoreTotal}>/{total}</span>
            </div>
            <div className={styles.gradeLabel} style={{ color: grade.color }}>{grade.label}</div>
            <div className={styles.gradeSub}>{grade.sub}</div>
            <div className={styles.scoreBarWrap}>
              <div className={styles.scoreBar} style={{ width: `${(score / total) * 100}%`, background: grade.color }} />
            </div>
            <p className={styles.scoreDesc}>{ui.scoreLabel(score, total)}</p>
          </div>

          <div className={styles.summaryWrap}>
            <div className={styles.summaryHeader}>
              <span className={styles.summaryTitle}>{ui.summaryTitle}</span>
              <div className={styles.filterBtns}>
                <button className={`${styles.filterBtn} ${summaryFilter === 'all' ? styles.filterActive : ''}`}
                  onClick={() => setSummaryFilter('all')}>{ui.allQ}</button>
                <button className={`${styles.filterBtn} ${summaryFilter === 'wrong' ? styles.filterActiveWrong : ''}`}
                  onClick={() => setSummaryFilter('wrong')}>{ui.wrongOnly}</button>
              </div>
            </div>

            <div className={styles.summaryList}>
              {filtered.map((sq, idx) => {
                const ans = answers.find(a => a.qId === sq.id)
                const isCorrect = ans?.correct
                const correctOpt = sq.options.find(o => o.id === sq.correct)
                const selectedOpt = sq.options.find(o => o.id === ans?.selected)
                return (
                  <div key={sq.id} className={`${styles.summaryItem} ${isCorrect ? styles.summaryCorrect : styles.summaryWrong}`}>
                    <div className={styles.summaryItemHead}>
                      <span className={`${styles.summaryTag} ${isCorrect ? styles.tagCorrect : styles.tagWrong}`}>
                        {isCorrect ? ui.correctTag : ui.wrongTag}
                      </span>
                      <span className={styles.summaryQ}>{idx + 1}. {sq.question}</span>
                    </div>
                    {!isCorrect && (
                      <div className={styles.summaryAnswers}>
                        <span className={styles.yourAns}>{ui.yourAnswer} <strong>{ans?.selected}) {selectedOpt?.text}</strong></span>
                        <span className={styles.rightAns}>{ui.rightAnswer} <strong>{sq.correct}) {correctOpt?.text}</strong></span>
                      </div>
                    )}
                    <div className={styles.summaryExp}>{sq.explanation}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.resultActions}>
            <button className={styles.restartBtn} onClick={handleRestart}>{ui.restartBtn}</button>
            <Link href={learnHref} className={styles.learnBtn}>{ui.learnBtn}</Link>
          </div>
        </div>
      </div>
    )
  }

  const isCorrect = checked && selected === q.correct
  const isWrong = checked && selected !== q.correct
  const correctOpt = q.options.find(o => o.id === q.correct)

  return (
    <div className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <Link href={mskHref} className={styles.breadLink}>{ui.breadMsk}</Link>
          <span className={styles.sep}>›</span>
          <Link href={learnHref} className={styles.breadLink}>{ui.breadTopic}</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>MCQ</span>
        </div>
        <div className={styles.titleRow}>
          <h1 className={styles.pageTitle}>{ui.title}</h1>
          <span className={styles.subtitle}>{ui.subtitle}</span>
        </div>
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>
          <span className={styles.progressLabel}>{ui.progressLabel(current + 1, total)}</span>
        </div>
      </div>

      <div className={styles.quizBody}>
        <div className={styles.quizCard}>
          <div className={styles.qNum}>{ui.questionOf(current + 1, total)}</div>
          <div className={styles.qText}>{q.question}</div>

          <div className={styles.options}>
            {q.options.map(opt => {
              let cls = styles.option
              if (selected === opt.id && !checked) cls = `${styles.option} ${styles.optSelected}`
              if (checked && opt.id === q.correct) cls = `${styles.option} ${styles.optCorrect}`
              if (checked && selected === opt.id && opt.id !== q.correct) cls = `${styles.option} ${styles.optWrong}`
              return (
                <button
                  key={opt.id}
                  className={cls}
                  disabled={checked}
                  onClick={() => setSelected(opt.id)}
                >
                  <span className={styles.optLetter}>{opt.id}</span>
                  <span className={styles.optText}>{opt.text}</span>
                  {checked && opt.id === q.correct && <span className={styles.optIcon}>✓</span>}
                  {checked && selected === opt.id && opt.id !== q.correct && <span className={styles.optIcon}>✗</span>}
                </button>
              )
            })}
          </div>

          {checked && (
            <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
              <div className={styles.feedbackHead}>
                <span className={styles.feedbackIcon}>{isCorrect ? '✅' : '❌'}</span>
                <span className={styles.feedbackTitle}>
                  {isCorrect ? ui.correct : ui.incorrect}
                  {isWrong && <span className={styles.feedbackCorrectAns}> – {ui.correctAnswer} <strong>{q.correct}) {correctOpt?.text}</strong></span>}
                </span>
              </div>
              <div className={styles.feedbackExpLabel}>{ui.explanation}</div>
              <div className={styles.feedbackExp}>{q.explanation}</div>
            </div>
          )}

          <div className={styles.actionRow}>
            {!checked ? (
              <button
                className={`${styles.checkBtn} ${!selected ? styles.checkBtnDisabled : ''}`}
                onClick={handleCheck}
                disabled={!selected}
              >
                {ui.checkBtn}
              </button>
            ) : (
              <button className={styles.nextBtn} onClick={handleNext}>
                {isLast ? ui.resultBtn : ui.nextBtn}
                <span>{isRTL ? '←' : '→'}</span>
              </button>
            )}
          </div>
        </div>

        <div className={styles.tracker}>
          <div className={styles.trackerTitle}>Score</div>
          <div className={styles.trackerDots}>
            {questions.map((_, i) => {
              const ans = answers.find(a => a.qId === questions[i].id)
              let dotCls = styles.trackerDot
              if (i === current) dotCls = `${styles.trackerDot} ${styles.dotCurrent}`
              else if (ans?.correct) dotCls = `${styles.trackerDot} ${styles.dotCorrect}`
              else if (ans && !ans.correct) dotCls = `${styles.trackerDot} ${styles.dotWrong}`
              return <div key={i} className={dotCls}>{i + 1}</div>
            })}
          </div>
          <div className={styles.trackerScore}>
            <span className={styles.trackerScoreNum} style={{ color: '#10b981' }}>{answers.filter(a => a.correct).length}</span>
            <span className={styles.trackerScoreSep}>/</span>
            <span className={styles.trackerScoreNum} style={{ color: '#ef4444' }}>{answers.filter(a => !a.correct).length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
