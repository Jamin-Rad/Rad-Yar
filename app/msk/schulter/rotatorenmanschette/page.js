'use client'
import LegacyLessonMigration from '@/components/lesson-template/LegacyLessonMigration'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import styles from './page.module.css'
import LessonHero from '@/components/LessonHero'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbMsk": "Muskuloskelettales",
    "breadcrumbCurrent": "Schulter · Rotatorenmanschette",
    "title": "Rotatorenmanschette: Tendinopathie, Partial- und Komplettrupturen",
    "heroAlt": "Schematische Darstellung der vier Sehnen der Rotatorenmanschette um den Humeruskopf",
    "heroCaption": "Schematische Orientierung der vier Sehnen um den Humeruskopf; keine diagnostische Aufnahme.",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "impingementLink": "Impingement-Muster gezielt vertiefen",
    "keyLabel": "Merke",
    "caveLabel": "CAVE",
    "sections": [
      { "id": "grundlagen", "label": "Anatomie & Grundlagen", "icon": "🦴" },
      { "id": "mrt", "label": "MRT-Technik", "icon": "🧲" },
      { "id": "partialruptur", "label": "Partialrupturen", "icon": "🔍" },
      { "id": "komplettruptur", "label": "Komplettrupturen", "icon": "⚠️" },
      { "id": "begleit", "label": "Begleitbefunde", "icon": "🩹" },
      { "id": "takehome", "label": "Zusammenfassung", "icon": "💡" }
    ],
    "heroCards": [
      { "value": "Supraspinatus", "label": "typische Befundregion", "text": "Ansatz, Oberflächen und Faserkontinuität prüfen" },
      { "value": "PD/T2 fs", "label": "Schlüsselsequenzen", "text": "flüssigkeitssensitiv und mehrplanar; T1 für Muskelqualität" },
      { "value": "Patte / Goutallier", "label": "getrennte Befundparameter", "text": "Retraktion und Fettinfiltration" }
    ],
    "basics": {
      "title": "Anatomie & Grundlagen",
      "lead": "Die Rotatorenmanschette besteht aus vier Muskel-Sehnen-Einheiten, die den Humeruskopf umschließen und für Stabilität und Bewegung im Glenohumeralgelenk sorgen.",
      "items": [
        { "title": "Die vier Muskeln", "text": "M. supraspinatus (Abduktion, kranialer Stabilisator), M. infraspinatus und M. teres minor (Außenrotation), M. subscapularis (Innenrotation)." },
        { "title": "Critical Zone", "text": "Ansatznaher Bereich der Supraspinatussehne, historisch als relativ minderdurchblutet beschrieben. Die Perfusion variiert regional und mit Belastung; keine stets avaskuläre Zone oder alleinige Rupturursache." },
        { "title": "Kräftepaare", "text": "Vordere und hintere Manschette tragen zu einem ausbalancierten Kraftpaar und zur Zentrierung des Humeruskopfes bei. Subscapularis und Infraspinatus sind dafür wichtige Komponenten; der Beitrag einzelner Muskeln hängt von Armstellung und Belastung ab." }
      ],
      "key": "Die Critical Zone bezeichnet eine ansatznahe Region, keinen bildgebenden Beweis einer Minderdurchblutung. Bei der Befundung Sehnenverlauf, Faserdefekt und Oberflächenkontakt beschreiben."
    },
    "mri": {
      "title": "MRT-Technik & Normalbefund",
      "lead": "Ein Schulter-MRT-Protokoll kombiniert flüssigkeitssensitive Aufnahmen in axialer, koronar-schräger und sagittal-schräger Ebene mit T1-Aufnahmen für Anatomie und Muskelqualität. Die Bausteine werden an die Fragestellung angepasst.",
      "tableHeaders": ["Sequenz", "Ebene", "Wertigkeit"],
      "tableRows": [["PD/T2 fs","koronar-schräg","Sehnendefekte und flüssigkeitssensitive Strukturbeurteilung"],["PD fs","axial","Subscapularissehne, lange Bizepssehne und Pulley"],["T1","sagittal-schräg (Y-Aufnahme)","Muskelvolumen, Fettinfiltration und Tangentenzeichen"],["PD/T2 fs","sagittal-schräg","Defektausdehnung und ergänzende Beurteilung von Muskulatur, Bursa und Marködem"]],
      "lightBulbTitle": "Normalbefund der Supraspinatussehne",
      "lightBulbText": "Normales Sehnengewebe ist auf üblichen Sequenzen überwiegend signalarm. Eine Signalzunahme auf kurzen TE-Aufnahmen kann orientierungsbedingt oder degenerativ sein. TE, Faserkontinuität und Defektmorphologie gemeinsam prüfen, bevor eine Ruptur angenommen wird.",
      "dwiTitle": "Magic-Angle-Phänomen",
      "dwiText": "Nahe55° zu B0 kann normales Sehnengewebe auf kurzen TE-Aufnahmen signalreich erscheinen. Bei längerem TE nimmt der Effekt ab. Entscheidend sind TE und Orientierung, nicht die Bezeichnung T1/PD/T2 allein; Morphologie und weitere Ebenen mitprüfen.",
      "key": "Mehrplanare flüssigkeitssensitive Bilder und T1-Aufnahmen ergänzen sich. Ein helles Sehnensignal allein ist kein Rupturbeweis; den Faserdefekt und seine Beziehung zu Gelenk und Bursa suchen."
    },
    "partial": {
      "title": "Partialrupturen & Tendinopathie",
      "lead": "Partialrupturen werden nach ihrer Lokalisation innerhalb der Sehne eingeteilt. Diese Unterscheidung ist entscheidend für Therapieentscheidung und Prognose.",
      "tableHeaders": ["Typ", "Lokalisation", "MRT-Befund"],
      "tableRows": [
        ["Bursaseitig", "oberflächliche (bursale) Faseranteile", "Flüssigkeitssignalreicher Defekt der oberflächlichen Sehnenfasern bis zur bursalen Oberfläche, bei erhaltenen artikulären Fasern; Bursaflüssigkeit allein beweist keinen Riss."],
        ["Gelenkseitig (PASTA)", "tiefe (artikuläre) Faseranteile am Footprint", "Gelenkseitige Partialablösung am Footprint; der Begriff allein beweist kein klinisches Impingement"],
        ["Intratendinös", "innerhalb der Sehne, ohne Oberflächenkontakt", "Flüssigkeitsäquivalenter Spalt mit Faserdefekt innerhalb der Sehne bei erhaltenen Oberflächen"],
        ["Tendinopathie", "degenerative Sehnenveränderung", "Signalzunahme unterhalb von Flüssigkeitssignal, teils auch auf T2; ohne klaren Faserdefekt, gegebenenfalls Verdickung"]
      ],
      "irisTitle": "Sehnendicke und klinischer Kontext",
      "irisText": "Bei PASTA-Läsionen die Defekttiefe als Anteil der Sehnendicke angeben, nicht als beliebige Footprint-Fläche oder anteroposteriore Breite. Der medial-laterale freiliegende Footprint kann die Tiefe arthroskopisch abschätzen. Eine Läsion > 50 % Sehnendicke ist ein Behandlungsfaktor, keine alleinige OP-Indikation: Symptome, Funktion und Ansprechen auf nichtoperative Therapie mitbeurteilen.",
      "key": "Die Einteilung richtet sich nach Faserdefekt und Oberflächenkontakt: bursaseitig, artikulär oder rein intratendinös. Unspezifische T2-Hyperintensität allein trennt diese Muster nicht von Degeneration oder Artefakt."
    },
    "full": {
      "title": "Komplettrupturen & Retraktion",
      "lead": "Eine Komplettruptur durchtrennt die Sehne über ihre gesamte Dicke und führt zu einer direkten Kommunikation zwischen Glenohumeralgelenk und Bursa subacromialis.",
      "tableHeaders": ["Merkmal", "MRT-Befund"],
      "tableRows": [
        ["Diskontinuität", "Durchgehender Faserdefekt von Gelenk- bis Bursaseite, typischerweise mit Flüssigkeitssignal"],
        ["Retraktion", "Abstand des Sehnenstumpfes vom Footprint - Einteilung nach Patte (Grad 1-3)"],
        ["Tangentenzeichen", "Auf der sagittal-schrägen Y-Aufnahme verbindet die Tangente den Oberrand der Spina scapulae mit dem Oberrand des Korakoids. Positiv: Der Supraspinatus-Muskelbauch reicht nicht über die Linie hinaus - Hinweis auf Atrophie."],
        ["Fettinfiltration", "Fettanteil gegenüber Muskelgewebe, in der MRT insbesondere auf nicht fettunterdrückten T1-Aufnahmen; Goutallier-Grad 0–4"],
        ["Humeruskopfhochstand", "verminderter akromiohumeraler Abstand (< 7 mm) bei chronischer Massenruptur"]
      ],
      "lightBulbTitle": "Patte-Retraktionsgrad",
      "lightBulbText": "Grad 1: Sehnenstumpf nahe am Footprint. Grad 2: Stumpf auf Höhe des Humeruskopfes. Grad 3: Stumpf auf Höhe des Glenoids - je höher der Grad, desto schwieriger die spannungsfreie Rekonstruktion.",
      "dwiTitle": "Goutallier: Fettinfiltration",
      "dwiText": "Grad 0: keine Fettinfiltration. Grad 1: vereinzelte Fettstreifen. Grad 2: Fett < Muskel. Grad 3: Fett = Muskel. Grad 4: Fett > Muskel. Ein hoher Fettinfiltrationsgrad erschwert die Planung, schließt eine funktionelle Besserung nach Rekonstruktion aber nicht pauschal aus. Ausgewählte Patientinnen und Patienten mit Grad 3–4 profitierten in einer klinischen Serie; Rekonstruierbarkeit und Behandlung bleiben individuell.",
      "key": "Retraktion, Muskelvolumen und Fettinfiltration getrennt dokumentieren. Sie beeinflussen gemeinsam mit Defektmorphologie und Klinik die Planung; kein einzelner Grad legt Rekonstruierbarkeit oder individuellen Nutzen allein fest."
    },
    "begleit": {
      "title": "Begleitbefunde",
      "lead": "Rotatorenmanschettenpathologien treten häufig im Kontext weiterer Befunde an der Schulter auf, die mitbeurteilt werden müssen.",
      "tableHeaders": ["Befund", "Beschreibung"],
      "tableRows": [
        ["Mögliche subakromiale Engefaktoren","Knöcherne Vorsprünge und Sehnen-/Bursabefund beschreiben; Akromionform allein ist keine klinische Impingement-Diagnose"],
        ["Bursitis subacromialis/subdeltoidea", "Flüssigkeitsansammlung oder Verdickung der Bursa, häufig begleitend bei bursaseitigen Partial- oder Komplettrupturen"],
        ["ACG-Arthrose", "kaudale Osteophyten können den Supraspinatus-Outlet einengen (Os acromiale beachten)"],
        ["Lange Bizepssehne (LBS)", "Insbesondere mediale Subluxation/Luxation lenkt den Blick auf oberen Subscapularis und Pulley; eine normale Lage schließt die Läsion nicht aus"]
      ],
      "cave": "Bei medialer Instabilität der langen Bizepssehne oberen Subscapularis und Pulley gezielt, insbesondere axial, prüfen. Das indirekte Zeichen ersetzt nicht die direkte Beurteilung von Kontinuität und Ausdehnung.",
      "key": "Impingement, Bursitis, ACG-Arthrose und Bizepssehnenpathologien sind häufige Begleitbefunde, die das klinische Bild und die Therapieentscheidung mitbestimmen."
    },
    "takehome": {
      "title": "Zusammenfassung",
      "lead": "Die wichtigsten Punkte für die Befundung.",
      "items": [
        { "title": "Anatomie", "text": "Vier SITS-Muskeln zuordnen. Ansatznahe Veränderungen nach Morphologie beurteilen; die Critical Zone allein ist keine Erklärung jeder Ruptur." },
        { "title": "Protokoll", "text": "Flüssigkeitssensitive Aufnahmen in mehreren Ebenen und T1 für Muskelqualität kombinieren; bei Signalauffälligkeit TE und Faserkontinuität prüfen." },
        { "title": "Partialrupturen", "text": "Bursaseitig, gelenkseitig (PASTA) und intratendinös unterscheiden." },
        { "title": "Komplettrupturen", "text": "Retraktion nach Patte, Atrophie anhand von Muskelvolumen/Tangentenzeichen und Fettinfiltration nach Goutallier getrennt berichten; individuelle Planung statt einer automatischen Operationsregel." }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbMsk": "Musculoskeletal",
    "breadcrumbCurrent": "Shoulder · Rotator Cuff",
    "title": "Rotator Cuff: Tendinopathy, Partial and Full-Thickness Tears",
    "heroAlt": "Schematic of the four rotator cuff tendons surrounding the humeral head",
    "heroCaption": "Orientation schematic of the four tendons around the humeral head; not a diagnostic image.",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "impingementLink": "Review impingement patterns",
    "keyLabel": "Key point",
    "caveLabel": "Caution",
    "sections": [
      { "id": "grundlagen", "label": "Anatomy & Basics", "icon": "🦴" },
      { "id": "mrt", "label": "MRI Technique", "icon": "🧲" },
      { "id": "partialruptur", "label": "Partial Tears", "icon": "🔍" },
      { "id": "komplettruptur", "label": "Full-Thickness Tears", "icon": "⚠️" },
      { "id": "begleit", "label": "Associated Findings", "icon": "🩹" },
      { "id": "takehome", "label": "Summary", "icon": "💡" }
    ],
    "heroCards": [
      { "value": "Supraspinatus", "label": "typical reporting region", "text": "assess insertion, surfaces and fibre continuity" },
      { "value": "PD/T2 fs", "label": "key sequences", "text": "multiplanar fluid-sensitive imaging; T1 for muscle quality" },
      { "value": "Patte / Goutallier", "label": "separate reporting parameters", "text": "retraction and fatty infiltration" }
    ],
    "basics": {
      "title": "Anatomy & basics",
      "lead": "The rotator cuff consists of four musculotendinous units that envelop the humeral head, providing stability and movement of the glenohumeral joint.",
      "items": [
        { "title": "The four muscles", "text": "Supraspinatus (abduction, superior stabiliser), infraspinatus and teres minor (external rotation), subscapularis (internal rotation)." },
        { "title": "Critical zone", "text": "An insertional region of supraspinatus historically described as relatively poorly vascularised. Perfusion varies by region and loading; this is not an invariably avascular zone or a sole cause of tearing." },
        { "title": "Force couples", "text": "Anterior and posterior cuff contribute to a balanced force couple and humeral-head centring. Subscapularis and infraspinatus are important components; individual contributions depend on arm position and loading." }
      ],
      "key": "The critical zone names an insertional region, not imaging proof of reduced blood flow. Report tendon course, fibre defect and surface communication."
    },
    "mri": {
      "title": "MRI technique & normal findings",
      "lead": "A shoulder MRI protocol combines fluid-sensitive axial, coronal-oblique and sagittal-oblique images with T1 acquisitions for anatomy and muscle quality. Tailor the components to the clinical question.",
      "tableHeaders": ["Sequence", "Plane", "Value"],
      "tableRows": [["PD/T2 fs","coronal oblique","tendon defects and fluid-sensitive structural assessment"],["PD fs","axial","subscapularis, long head of biceps and pulley"],["T1","sagittal oblique (Y view)","muscle bulk, fatty infiltration and tangent sign"],["PD/T2 fs","sagittal oblique","defect extent and complementary assessment of muscle, bursa and marrow oedema"]],
      "lightBulbTitle": "Normal appearance of the supraspinatus tendon",
      "lightBulbText": "Normal tendon is predominantly low signal on routine sequences. Short-TE signal increase may reflect orientation or degeneration. Assess TE, fibre continuity and defect morphology together before diagnosing a tear.",
      "dwiTitle": "Magic-angle phenomenon",
      "dwiText": "Near 55° to B0, normal tendon can appear bright on short-TE acquisitions. The effect decreases at longer TE. TE and orientation matter, rather than the T1/PD/T2 label alone; also check morphology and other planes.",
      "key": "Multiplanar fluid-sensitive images and T1 acquisitions are complementary. Bright tendon signal alone does not prove a tear; look for a fibre defect and its relationship to joint and bursa."
    },
    "partial": {
      "title": "Partial tears & tendinopathy",
      "lead": "Partial tears are classified according to their location within the tendon. This distinction is crucial for treatment decisions and prognosis.",
      "tableHeaders": ["Type", "Location", "MRI finding"],
      "tableRows": [
        ["Bursal-sided", "superficial (bursal) fibres", "Fluid-signal defect of superficial tendon fibres reaching the bursal surface, with preserved articular fibres; bursal fluid alone does not establish a tear."],
        ["Articular-sided (PASTA)", "deep (articular) fibres at the footprint", "Articular-sided partial avulsion at the footprint; the term alone does not establish clinical impingement"],
        ["Intratendinous", "within the tendon, no surface contact", "A fluid-equivalent cleft with an internal fibre defect and intact surfaces"],
        ["Tendinopathy", "degenerative tendon change", "Signal increase below fluid intensity, sometimes on T2 as well, without a clear fibre defect; possible thickening"]
      ],
      "irisTitle": "Tendon thickness and clinical context",
      "irisText": "For PASTA lesions, report tear depth as a proportion of tendon thickness, not arbitrary footprint area or anteroposterior width. Mediolateral exposed footprint can estimate depth arthroscopically. A tear >50% of tendon thickness is one treatment factor, not a stand-alone indication for surgery: also assess symptoms, function and response to nonoperative care.",
      "key": "Classification depends on fibre defect and surface communication: bursal, articular or purely intratendinous. Nonspecific T2 hyperintensity alone does not separate these patterns from degeneration or artefact."
    },
    "full": {
      "title": "Full-thickness tears & retraction",
      "lead": "A full-thickness tear traverses the entire thickness of the tendon, creating direct communication between the glenohumeral joint and the subacromial bursa.",
      "tableHeaders": ["Feature", "MRI finding"],
      "tableRows": [
        ["Discontinuity", "A through-thickness fibre defect from joint to bursal surface, typically with fluid signal"],
        ["Retraction", "distance of the tendon stump from the footprint - graded according to Patte (grade 1-3)"],
        ["Tangent sign", "On the oblique sagittal Y view, the line joins the superior scapular spine and superior coracoid margins. Positive: the supraspinatus muscle belly does not extend above the line, indicating atrophy."],
        ["Fatty infiltration", "Fat relative to muscle, on MRI particularly on non-fat-suppressed T1 images; Goutallier grades 0–4"],
        ["Superior migration of the humeral head", "decreased acromiohumeral distance (<7 mm) in chronic massive tears"]
      ],
      "lightBulbTitle": "Patte retraction grade",
      "lightBulbText": "Grade 1: tendon stump close to the footprint. Grade 2: stump at the level of the humeral head. Grade 3: stump at the level of the glenoid - the higher the grade, the more difficult a tension-free repair becomes.",
      "dwiTitle": "Goutallier: fatty infiltration",
      "dwiText": "Grade 0: no fatty infiltration. Grade 1: scattered fatty streaks. Grade 2: fat < muscle. Grade 3: fat = muscle. Grade 4: fat > muscle. High-grade fatty infiltration complicates planning but does not categorically exclude functional improvement after repair. Selected patients with grades 3–4 improved in a clinical series; repairability and treatment remain individual.",
      "key": "Document retraction, muscle bulk and fatty infiltration separately. Along with defect morphology and clinical assessment, they inform planning; no single grade alone determines repairability or individual benefit."
    },
    "begleit": {
      "title": "Associated findings",
      "lead": "Rotator cuff pathology frequently occurs alongside other shoulder findings that must be assessed together.",
      "tableHeaders": ["Finding", "Description"],
      "tableRows": [
        ["Possible subacromial narrowing factors","Describe bony projections and tendon/bursal findings; acromial shape alone is not a clinical diagnosis of impingement"],
        ["Subacromial/subdeltoid bursitis", "fluid accumulation or thickening of the bursa, often accompanying bursal-sided partial or full-thickness tears"],
        ["AC joint osteoarthritis", "inferior osteophytes can narrow the supraspinatus outlet (consider os acromiale)"],
        ["Long head of biceps (LHB)", "Medial subluxation/dislocation particularly directs attention to upper subscapularis and pulley; normal position does not exclude a lesion"]
      ],
      "cave": "With medial long-head biceps instability, assess upper subscapularis and pulley specifically, particularly axially. The indirect sign does not replace direct assessment of continuity and extent.",
      "key": "Impingement, bursitis, AC joint osteoarthritis and LHB pathology are common associated findings that influence the clinical picture and treatment decision."
    },
    "takehome": {
      "title": "Summary",
      "lead": "The most important points for reporting.",
      "items": [
        { "title": "Anatomy", "text": "Identify the four SITS muscles. Assess insertional change morphologically; the critical zone alone does not explain every tear." },
        { "title": "Protocol", "text": "Combine multiplanar fluid-sensitive images with T1 for muscle quality; check TE and fibre continuity when signal is abnormal." },
        { "title": "Partial tears", "text": "Distinguish bursal-sided, articular-sided (PASTA) and intratendinous." },
        { "title": "Full-thickness tears", "text": "Report Patte retraction, atrophy by muscle bulk/tangent sign and Goutallier fatty infiltration separately; planning remains individual rather than an automatic surgical rule." }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbMsk": "اسکلتی-عضلانی",
    "breadcrumbCurrent": "شانه · روتاتور کاف",
    "title": "روتاتور کاف: تاندینوپاتی، پارگی‌های جزئی و کامل",
    "heroAlt": "طرح شماتیک چهار تاندون روتاتور کاف پیرامون سر استخوان بازو",
    "heroCaption": "نمای شماتیک چهار تاندون پیرامون سر استخوان بازو؛ تصویر تشخیصی نیست.",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "فلش‌کارت",
    "impingementLink": "مرور متمرکز الگوهای ایمپینجمنت",
    "keyLabel": "نکته مهم",
    "caveLabel": "احتیاط",
    "sections": [
      { "id": "grundlagen", "label": "آناتومی و مبانی", "icon": "🦴" },
      { "id": "mrt", "label": "تکنیک MRI", "icon": "🧲" },
      { "id": "partialruptur", "label": "پارگی‌های جزئی", "icon": "🔍" },
      { "id": "komplettruptur", "label": "پارگی‌های کامل", "icon": "⚠️" },
      { "id": "begleit", "label": "یافته‌های همراه", "icon": "🩹" },
      { "id": "takehome", "label": "جمع‌بندی", "icon": "💡" }
    ],
    "heroCards": [
      { "value": "سوپراسپیناتوس", "label": "ناحیهٔ معمول ارزیابی", "text": "محل اتصال، سطوح و پیوستگی رشته‌ها را بررسی کنید" },
      { "value": "PD/T2 fs", "label": "سکانس‌های کلیدی", "text": "تصاویر چندنمایی حساس به مایع؛ T1 برای کیفیت عضله" },
      { "value": "Patte / Goutallier", "label": "پارامترهای جداگانهٔ گزارش", "text": "رتراکشن و نفوذ چربی" }
    ],
    "basics": {
      "title": "آناتومی و مبانی",
      "lead": "روتاتور کاف از چهار واحد عضله-تاندون تشکیل شده که سر هومروس را احاطه کرده و ثبات و حرکت مفصل گلنوهومرال را تأمین می‌کنند.",
      "items": [
        { "title": "چهار عضله", "text": "سوپراسپیناتوس (ابداکسیون، تثبیت‌کننده فوقانی)، اینفراسپیناتوس و ترس مینور (چرخش خارجی)، ساب‌اسکاپولاریس (چرخش داخلی)." },
        { "title": "ناحیه بحرانی (Critical Zone)", "text": "ناحیه‌ای نزدیک محل اتصال سوپراسپیناتوس که در توصیف‌های تاریخی خون‌رسانی نسبتاً کمتری داشته است. پرفیوژن با ناحیه و بارگذاری تغییر می‌کند؛ ناحیه‌ای همواره بدون عروق یا علت منفرد پارگی نیست." },
        { "title": "کوپل‌های نیرویی", "text": "بخش قدامی و خلفی کاف در زوج نیروی متعادل و مرکزی‌ماندن سر هومروس نقش دارند. ساب‌اسکاپولاریس و اینفراسپیناتوس اجزای مهم‌اند؛ سهم هر عضله به وضعیت بازو و بارگذاری وابسته است." }
      ],
      "key": "ناحیهٔ بحرانی نام ناحیه‌ای نزدیک اتصال است، نه اثبات تصویری کاهش خون‌رسانی. در گزارش مسیر تاندون، نقص رشته‌ها و ارتباط سطحی را توصیف کنید."
    },
    "mri": {
      "title": "تکنیک MRI و یافته‌های طبیعی",
      "lead": "پروتکل MRI شانه تصاویر حساس به مایع را در نماهای آگزیال، کرونال مایل و ساژیتال مایل با T1 برای آناتومی و کیفیت عضله ترکیب می‌کند. اجزا متناسب با سؤال بالینی تنظیم می‌شوند.",
      "tableHeaders": ["سکانس", "پلان", "ارزش تشخیصی"],
      "tableRows": [["PD/T2 fs","کرونال مایل","نقص‌های تاندون و ارزیابی ساختاری حساس به مایع"],["PD fs","آگزیال","ساب‌اسکاپولاریس، سر بلند بایسپس و پولی"],["T1","ساژیتال مایل، نمای Y","حجم عضله، نفوذ چربی و علامت تانژانت"],["PD/T2 fs","ساژیتال مایل","وسعت نقص و ارزیابی مکمل عضله، بورس و ادم مغز استخوان"]],
      "lightBulbTitle": "یافته طبیعی تاندون سوپراسپیناتوس",
      "lightBulbText": "تاندون طبیعی در سکانس‌های معمول عمدتاً کم‌سیگنال است. افزایش سیگنال در TE کوتاه می‌تواند وابسته به جهت یا ناشی از دژنراسیون باشد. پیش از تشخیص پارگی، TE، پیوستگی رشته‌ها و مورفولوژی نقص را با هم بررسی کنید.",
      "dwiTitle": "پدیده Magic Angle",
      "dwiText": "نزدیک زاویهٔ ۵۵ درجه نسبت به B0، تاندون طبیعی می‌تواند در TE کوتاه پُرسیگنال شود. اثر در TE طولانی‌تر کاهش می‌یابد. TE و جهت اهمیت دارند، نه صرفاً نام T1 یا PD یا T2؛ مورفولوژی و نماهای دیگر را نیز بررسی کنید.",
      "key": "تصاویر چندنمایی حساس به مایع و T1 مکمل یکدیگرند. سیگنال روشن تاندون به‌تنهایی پارگی را ثابت نمی‌کند؛ نقص رشته‌ها و ارتباط آن با مفصل و بورس را جست‌وجو کنید."
    },
    "partial": {
      "title": "پارگی‌های جزئی و تاندینوپاتی",
      "lead": "پارگی‌های جزئی بر اساس محل آن‌ها در داخل تاندون طبقه‌بندی می‌شوند. این تفاوت برای تصمیم درمانی و پیش‌آگهی حیاتی است.",
      "tableHeaders": ["نوع", "محل", "یافته MRI"],
      "tableRows": [
        ["سمت بورسال", "فیبرهای سطحی (بورسال)", "نقص با سیگنال مایع در الیاف سطحی تاندون تا سطح بورسال، با حفظ الیاف مفصلی؛ مایع بورس به‌تنهایی پارگی را ثابت نمی‌کند."],
        ["سمت مفصلی (PASTA)", "فیبرهای عمقی (مفصلی) در محل اتصال تاندون (footprint)", "جداشدگی جزئی سمت مفصلی در محل اتصال؛ اصطلاح به‌تنهایی ایمپینجمنت بالینی را ثابت نمی‌کند"],
        ["داخل تاندونی", "درون تاندون، بدون تماس با سطح", "شکاف با سیگنال هم‌ارز مایع و نقص رشته‌ها داخل تاندون، با حفظ سطوح"],
        ["تاندینوپاتی", "تغییر دژنراتیو تاندون", "افزایش سیگنال کمتر از مایع، گاهی در T2 نیز، بدون نقص واضح رشته‌ها؛ ممکن است ضخیم‌شدن وجود داشته باشد"]
      ],
      "irisTitle": "ضخامت تاندون و زمینهٔ بالینی",
      "irisText": "در ضایعهٔ PASTA، عمق نقص به‌صورت سهمی از ضخامت تاندون گزارش شود، نه مساحت دلخواه footprint یا عرض قدامی‌خلفی. پهنای داخلی‌خارجی footprint نمایان می‌تواند در آرتروسکوپی عمق را تخمین بزند. پارگی بیش از ۵۰٪ ضخامت تاندون یکی از عوامل تصمیم درمانی است، نه اندیکاسیون مستقل جراحی؛ علائم، عملکرد و پاسخ به درمان غیرجراحی نیز بررسی شوند.",
      "key": "طبقه‌بندی به نقص رشته‌ها و ارتباط سطحی وابسته است: بورسال، مفصلی یا صرفاً داخل تاندونی. هیپراینتنسیتهٔ غیراختصاصی T2 به‌تنهایی این الگوها را از دژنراسیون یا آرتیفکت جدا نمی‌کند."
    },
    "full": {
      "title": "پارگی‌های کامل و رتراکشن",
      "lead": "پارگی کامل تمام ضخامت تاندون را قطع می‌کند و ارتباط مستقیمی بین مفصل گلنوهومرال و بورس ساب‌آکرومیال ایجاد می‌کند.",
      "tableHeaders": ["ویژگی", "یافته MRI"],
      "tableRows": [
        ["عدم تداوم", "نقص رشته‌ای در تمام ضخامت از سمت مفصلی تا بورسال، معمولاً با سیگنال مایع"],
        ["رتراکشن", "فاصله انتهای تاندون از محل اتصال تاندون (footprint) - طبقه‌بندی Patte (درجه ۱ تا ۳)"],
        ["علامت تانژانت", "در نمای ساژیتال مایل Y، خط فرضی از لبه فوقانی خار اسکاپولا تا لبه فوقانی کوراکوئید کشیده می‌شود. مثبت بودن علامت یعنی شکم عضله سوپراسپیناتوس از خط بالاتر نمی‌رود و به نفع آتروفی است."],
        ["نفوذ چربی", "نسبت چربی به بافت عضله، در MRI به‌ویژه روی T1 بدون فت‌ساپرشن؛ درجات ۰ تا ۴ Goutallier"],
        ["بالا رفتن سر هومروس", "کاهش فاصله آکرومیوهومرال (< ۷ میلی‌متر) در پارگی‌های وسیع مزمن"]
      ],
      "lightBulbTitle": "درجهٔ رتراکشن Patte",
      "lightBulbText": "درجه ۱: انتهای تاندون نزدیک محل اتصال تاندون (footprint). درجه ۲: انتها در سطح سر هومروس. درجه ۳: انتها در سطح گلنوئید - هرچه درجه بالاتر، ترمیم بدون کشش دشوارتر می‌شود.",
      "dwiTitle": "Goutallier: نفوذ چربی",
      "dwiText": "درجه ۰: بدون نفوذ چربی. درجه ۱: رگه‌های پراکنده چربی. درجه ۲: چربی < عضله. درجه ۳: چربی = عضله. درجه ۴: چربی > عضله. نفوذ چربی با درجهٔ بالا برنامه‌ریزی را دشوار می‌کند، اما بهبود عملکرد پس از ترمیم را به‌طور کلی منتفی نمی‌کند. در یک مجموعهٔ بالینی، بیماران منتخب با درجات ۳ تا ۴ بهبود یافتند؛ قابلیت ترمیم و درمان باید فردی ارزیابی شوند.",
      "key": "رتراکشن، حجم عضله و نفوذ چربی را جداگانه ثبت کنید. این موارد همراه مورفولوژی نقص و بالین بر برنامه‌ریزی اثر دارند؛ هیچ درجهٔ منفردی به‌تنهایی قابلیت بازسازی یا منفعت فردی را تعیین نمی‌کند."
    },
    "begleit": {
      "title": "یافته‌های همراه",
      "lead": "پاتولوژی روتاتور کاف اغلب همراه با سایر یافته‌های شانه دیده می‌شود که باید هم‌زمان ارزیابی شوند.",
      "tableHeaders": ["یافته", "توضیح"],
      "tableRows": [
        ["عوامل احتمالی تنگی ساب‌آکرومیال","برجستگی‌های استخوانی و یافته‌های تاندون و بورس را توصیف کنید؛ شکل آکرومیون به‌تنهایی تشخیص ایمپینجمنت بالینی نیست"],
        ["بورسیت ساب‌آکرومیال/ساب‌دلتوئید", "تجمع مایع یا ضخیم‌شدن بورس، اغلب همراه پارگی‌های جزئی یا کامل سمت بورسال"],
        ["آرتروز مفصل ACG", "استئوفیت‌های تحتانی می‌توانند Outlet سوپراسپیناتوس را تنگ کنند (توجه به Os acromiale)"],
        ["تاندون سر بلند بایسپس (LHB)", "به‌ویژه نیمه‌دررفتگی یا دررفتگی مدیال توجه را به ساب‌اسکاپولاریس فوقانی و پولی جلب می‌کند؛ موقعیت طبیعی ضایعه را رد نمی‌کند"]
      ],
      "cave": "در ناپایداری مدیال سر بلند بایسپس، بخش فوقانی ساب‌اسکاپولاریس و پولی را به‌طور هدفمند، به‌ویژه در نمای آگزیال، بررسی کنید. علامت غیرمستقیم جای ارزیابی مستقیم پیوستگی و وسعت را نمی‌گیرد.",
      "key": "ایمپینجمنت، بورسیت، آرتروز ACG و پاتولوژی تاندون بایسپس یافته‌های همراه شایعی هستند که بر تصویر بالینی و تصمیم درمانی اثر می‌گذارند."
    },
    "takehome": {
      "title": "جمع‌بندی",
      "lead": "مهم‌ترین نکات برای گزارش‌نویسی.",
      "items": [
        { "title": "آناتومی", "text": "چهار عضلهٔ SITS را مشخص کنید. تغییرات نزدیک اتصال را مورفولوژیک بسنجید؛ ناحیهٔ بحرانی به‌تنهایی توضیح همهٔ پارگی‌ها نیست." },
        { "title": "پروتکل", "text": "تصاویر چندنمایی حساس به مایع را با T1 برای کیفیت عضله ترکیب کنید؛ در سیگنال غیرطبیعی، TE و پیوستگی رشته‌ها را بررسی کنید." },
        { "title": "پارگی‌های جزئی", "text": "افتراق سمت بورسال، سمت مفصلی (PASTA) و داخل تاندونی." },
        { "title": "پارگی‌های کامل", "text": "رتراکشن Patte، آتروفی بر اساس حجم عضله و علامت تانژانت و نفوذ چربی Goutallier را جداگانه گزارش کنید؛ برنامه‌ریزی فردی است، نه قانون خودکار جراحی." }
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
      <button className={styles.sectionHeader} type="button" onClick={onToggle} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className={styles.sectionBody}>
          {lead && <p className={styles.lead}>{lead}</p>}
          {children}
        </div>
      )}
    </section>
  )
}

export default function RotatorenmanschettePage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const [openId, setOpenId] = useState(copy.sections[0].id)
  const [selfCheckAnswer, setSelfCheckAnswer] = useState(null)
  const { isRead, toggleRead, authError } = useLessonReadStatus('rotatorenmanschette')
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  const scrollTo = (id) => {
    setOpenId(id)
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const sectionProps = (id) => ({ open: openId === id, onToggle: () => setOpenId(current => current === id ? null : id) })
  const checkCopy = {
    de: { title: 'Kurz prüfen', question: 'Woran wird ein positives Tangentenzeichen erkannt?', options: ['Der Humeruskopf liegt oberhalb der Linie Akromion–Korakoid.', 'Der Supraspinatus-Muskelbauch reicht nicht oberhalb der Linie zwischen Spina scapulae und Korakoid.', 'Die Sehne zeigt eine T2-hyperintense Unterbrechung.'], feedback: 'Richtig: Das Zeichen beurteilt die Supraspinatusatrophie in der sagittal-schrägen Y-Ebene; es ist kein Zeichen dafür, dass der Humeruskopf eine Linie überschreitet.' },
    en: { title: 'Quick check', question: 'What defines a positive tangent sign?', options: ['The humeral head lies above the acromion–coracoid line.', 'The supraspinatus muscle belly does not extend above the line between the scapular spine and coracoid.', 'The tendon has a T2-hyperintense discontinuity.'], feedback: 'Correct: the sign assesses supraspinatus atrophy on the oblique sagittal Y view; it does not describe the humeral head crossing a line.' },
    fa: { title: 'خودآزمایی کوتاه', question: 'علامت تانژانت مثبت چگونه تعریف می‌شود؟', options: ['سر هومروس بالاتر از خط آکرومیون–کوراکوئید قرار دارد.', 'شکم عضله سوپراسپیناتوس از خط بین خار اسکاپولا و کوراکوئید بالاتر نمی‌رود.', 'در تاندون قطع‌شدگی هیپراینتنس در T2 دیده می‌شود.'], feedback: 'درست است: این علامت آتروفی سوپراسپیناتوس را در نمای ساژیتال مایل Y ارزیابی می‌کند؛ منظور عبور سر هومروس از خط نیست.' }
  }[lang] || null
  const check = checkCopy || { title: 'Kurz prüfen', question: 'Woran wird ein positives Tangentenzeichen erkannt?', options: ['Der Humeruskopf liegt oberhalb der Linie Akromion–Korakoid.', 'Der Supraspinatus-Muskelbauch reicht nicht oberhalb der Linie zwischen Spina scapulae und Korakoid.', 'Die Sehne zeigt eine T2-hyperintense Unterbrechung.'], feedback: 'Richtig: Das Zeichen beurteilt die Supraspinatusatrophie in der sagittal-schrägen Y-Ebene.' }

  useEffect(() => {
    const syncFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!sectionIds.includes(id)) return
      setActiveId(id)
      setOpenId(id)
      window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }))
    }
    window.addEventListener('hashchange', syncFromHash)
    syncFromHash()
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id)
            setOpenId(id)
            window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
          }
        },
        { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })
    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      observers.forEach(observer => observer?.disconnect())
    }
  }, [sectionIds])

  return (
    <LegacyLessonMigration lessonRoute="/msk/schulter/rotatorenmanschette" lessonId="/msk/schulter/rotatorenmanschette" lang={lang}>
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link>
          <span>›</span>
          <Link href={withLang('/lernen/msk')}>{copy.breadcrumbMsk}</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <LessonHero title={copy.title} imageSrc="/educational/rotator-cuff-schematic.svg" imageAlt={copy.heroAlt} visualCaption={copy.heroCaption} lang={lang} />
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=msk&n=10&themen=rotatorenmanschette&from=${encodeURIComponent(withLang('/msk/schulter/rotatorenmanschette'))}`)} className={styles.actionBtn}>🎯 {copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/rotatorenmanschette?from=${encodeURIComponent(withLang('/msk/schulter/rotatorenmanschette'))}`)} className={styles.actionBtn}>🧠 {copy.actionFlash}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStat} key={card.label}>
                <strong>{card.value}</strong>
                <span>{card.label}</span>
                <small>{card.text}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.readBar}>
        <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button
              type="button"
              key={section.id}
              data-section-id={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => scrollTo(section.id)}
            >
              <span>{section.icon}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section migrationChapter id="grundlagen" title={copy.basics.title} lead={copy.basics.lead} {...sectionProps('grundlagen')}>
            <figure style={{maxWidth:650,margin:"1rem auto"}}><Image src="/educational/rotator-cuff-schematic.svg" alt={copy.heroAlt} width={840} height={520} style={{width:"100%",height:"auto"}} /><figcaption>{copy.heroCaption}</figcaption></figure>
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

          <Section migrationChapter id="mrt" title={copy.mri.title} lead={copy.mri.lead} {...sectionProps('mrt')}>
            <Table headers={copy.mri.tableHeaders} rows={copy.mri.tableRows} />
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

          <Section migrationChapter id="partialruptur" title={copy.partial.title} lead={copy.partial.lead} {...sectionProps('partialruptur')}>
            <Table headers={copy.partial.tableHeaders} rows={copy.partial.tableRows} />
            <div className={styles.highlightBox}>
              <h3>{copy.partial.irisTitle}</h3>
              <p>{copy.partial.irisText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.partial.key}</Callout>
          </Section>

          <Section migrationChapter id="komplettruptur" title={copy.full.title} lead={copy.full.lead} {...sectionProps('komplettruptur')}>
            <Table headers={copy.full.tableHeaders} rows={copy.full.tableRows} />
            <div className={styles.splitGrid}>
              <div className={styles.infoCard}>
                <h3>{copy.full.lightBulbTitle}</h3>
                <p>{copy.full.lightBulbText}</p>
              </div>
              <div className={styles.infoCard}>
                <h3>{copy.full.dwiTitle}</h3>
                <p>{copy.full.dwiText}</p>
              </div>
            </div>
            <Callout label={copy.keyLabel}>{copy.full.key}</Callout>
            <div className={styles.selfCheck}>
              <h3>{check.title}</h3><p>{check.question}</p>
              {check.options.map((option, index) => <button type="button" key={option} className={selfCheckAnswer === index ? styles.selfCheckSelected : ''} onClick={() => setSelfCheckAnswer(index)}>{option}</button>)}
              {selfCheckAnswer !== null && <p role="status" className={selfCheckAnswer === 1 ? styles.selfCheckCorrect : styles.selfCheckIncorrect}>{selfCheckAnswer === 1 ? check.feedback : (lang === 'fa' ? 'این گزینه درست نیست. به محل شکم عضله سوپراسپیناتوس و خط مرجع دقت کنید.' : lang === 'en' ? 'Not quite. Focus on the supraspinatus muscle belly and the reference line.' : 'Nicht ganz. Achte auf den Supraspinatus-Muskelbauch und die Referenzlinie.')}</p>}
            </div>
          </Section>

          <Section migrationChapter id="begleit" title={copy.begleit.title} lead={copy.begleit.lead} {...sectionProps('begleit')}>
            <Table headers={copy.begleit.tableHeaders} rows={copy.begleit.tableRows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.begleit.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.begleit.key}</Callout>
            <Link href={withLang('/msk/schulter/impingement-kalkschulter')} className={styles.relatedLessonLink}>{copy.impingementLink}</Link>
          </Section>

          <Section migrationChapter id="takehome" title={copy.takehome.title} lead={copy.takehome.lead} {...sectionProps('takehome')}>
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
