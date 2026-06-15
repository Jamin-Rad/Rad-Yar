'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from './page.module.css'

const CONTENT = {
  "de": {
    "toc": "Inhaltsverzeichnis",
    "breadcrumbMsk": "Muskuloskelettales",
    "breadcrumbCurrent": "Schulter · Rotatorenmanschette",
    "title": "Rotatorenmanschette: Tendinopathie, Partial- und Komplettrupturen",
    "subtitle": "Anatomie, MRT-Protokoll, Rupturmuster und die Klassifikationen nach Patte und Goutallier für die Schulter-MRT",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Merke",
    "caveLabel": "CAVE",
    "sections": [
      { "id": "grundlagen", "label": "Anatomie & Grundlagen", "icon": "🦴" },
      { "id": "mrt", "label": "MRT-Technik", "icon": "🧲" },
      { "id": "partialruptur", "label": "Partialrupturen", "icon": "🔍" },
      { "id": "komplettruptur", "label": "Komplettrupturen", "icon": "⚠️" },
      { "id": "begleit", "label": "Begleitbefunde", "icon": "🩹" },
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "Supraspinatus", "label": "häufigste betroffene Sehne", "text": "v. a. in der „Critical Zone“ vor dem Ansatz" },
      { "value": "PD/T2 fs", "label": "Schlüsselsequenzen", "text": "fettunterdrückt, flüssigkeitssensitiv, mind. 2 Ebenen" },
      { "value": "Patte / Goutallier", "label": "wichtigste Klassifikationen", "text": "Retraktionsgrad und Muskelatrophie" }
    ],
    "basics": {
      "title": "Anatomie & Grundlagen",
      "lead": "Die Rotatorenmanschette besteht aus vier Muskel-Sehnen-Einheiten, die den Humeruskopf umschließen und für Stabilität und Bewegung im Glenohumeralgelenk sorgen.",
      "items": [
        { "title": "Die vier Muskeln", "text": "M. supraspinatus (Abduktion, kranialer Stabilisator), M. infraspinatus und M. teres minor (Außenrotation), M. subscapularis (Innenrotation)." },
        { "title": "Critical Zone", "text": "Hypovaskuläre Zone der Supraspinatussehne ca. 1-2 cm proximal des Ansatzes am Tuberculum majus - Prädilektionsstelle für Degeneration und Rupturen." },
        { "title": "Kräftepaare", "text": "Subscapularis/Infraspinatus stabilisieren den Humeruskopf in der Transversalebene, Deltoideus/Supraspinatus in der Koronarebene - eine Dysbalance führt zur Dezentrierung des Humeruskopfes." }
      ],
      "key": "Die Supraspinatussehne ist mit Abstand am häufigsten betroffen, insbesondere in der hypovaskulären Critical Zone kurz vor ihrem Ansatz am Tuberculum majus."
    },
    "mri": {
      "title": "MRT-Technik & Normalbefund",
      "lead": "Die MRT ist die Methode der Wahl zur Beurteilung der Rotatorenmanschette. Ein standardisiertes Protokoll mit fettunterdrückten, flüssigkeitssensitiven Sequenzen in mindestens zwei Ebenen ist essenziell.",
      "tableHeaders": ["Sequenz", "Ebene", "Wertigkeit"],
      "tableRows": [
        ["PD/T2 fs", "koronar schräg", "Goldstandard zur Detektion von Rupturen und Tendinopathie"],
        ["T1/PD", "axial", "Subscapularissehne, Bizepssehne, Muskelvolumen"],
        ["T2 fs", "sagittal schräg (Y-View)", "Muskelatrophie (Goutallier), Tangentenzeichen"],
        ["PD/T1", "alle Ebenen", "Knochenmarködem, ACG, Labrum"]
      ],
      "lightBulbTitle": "Normalbefund der Supraspinatussehne",
      "lightBulbText": "Eine gesunde Sehne zeigt eine homogen niedrige Signalintensität in allen Sequenzen. Eine intratendinöse Signalanhebung in PD/T1 ohne T2-Korrelat entspricht meist einer Tendinopathie.",
      "dwiTitle": "Magic-Angle-Phänomen",
      "dwiText": "Verläuft die Sehne in einem Winkel von ca. 55° zum Hauptmagnetfeld (häufig nahe dem Ansatz), kann es zu einer artifiziellen Signalanhebung in kurzen TE-Sequenzen (T1, PD) kommen, die in T2-gewichteten Sequenzen verschwindet - keine echte Pathologie.",
      "key": "Mindestens zwei Ebenen mit fettunterdrückten, flüssigkeitssensitiven Sequenzen sind notwendig, um eine Ruptur sicher von einer Tendinopathie oder einem Magic-Angle-Artefakt zu unterscheiden."
    },
    "partial": {
      "title": "Partialrupturen & Tendinopathie",
      "lead": "Partialrupturen werden nach ihrer Lokalisation innerhalb der Sehne eingeteilt. Diese Unterscheidung ist entscheidend für Therapieentscheidung und Prognose.",
      "tableHeaders": ["Typ", "Lokalisation", "MRT-Befund"],
      "tableRows": [
        ["Bursaseitig", "oberflächliche (bursale) Faseranteile", "fokaler Flüssigkeitssaum zwischen Sehne und Bursa subacromialis in T2 fs"],
        ["Gelenkseitig (PASTA)", "tiefe (artikuläre) Faseranteile am Footprint", "Partial Articular Surface Tendon Avulsion - fokaler Defekt am Footprint, oft mit Impingement assoziiert"],
        ["Intratendinös", "innerhalb der Sehne, ohne Oberflächenkontakt", "lineare/fokale T2-hyperintense Signalanhebung ohne Kontakt zur Bursa oder zum Gelenk"],
        ["Tendinopathie", "diffuse Degeneration", "intratendinöse Signalanhebung in PD/T1, kein eindeutiges T2-Flüssigkeitssignal, ggf. Sehnenverdickung"]
      ],
      "irisTitle": "Wann ist eine Naht sinnvoll? - die Footprint-Beteiligung",
      "irisText": "Bei der PASTA-Läsion ist das Ausmaß der Footprint-Beteiligung (in % der Sehnenbreite bzw. -tiefe) entscheidend: Bei > 50 % wird häufig eine operative Refixation erwogen, bei < 50 % oft konservativ behandelt oder debridiert.",
      "key": "Bursaseitige, gelenkseitige (PASTA) und intratendinöse Partialrupturen unterscheiden sich durch ihre Lage relativ zu Bursa und Gelenkspalt - alle drei zeigen eine fokale T2-hyperintense Signalanhebung."
    },
    "full": {
      "title": "Komplettrupturen & Retraktion",
      "lead": "Eine Komplettruptur durchtrennt die Sehne über ihre gesamte Dicke und führt zu einer direkten Kommunikation zwischen Glenohumeralgelenk und Bursa subacromialis.",
      "tableHeaders": ["Merkmal", "MRT-Befund"],
      "tableRows": [
        ["Diskontinuität", "vollständige T2-hyperintense Unterbrechung der Sehne mit Flüssigkeit im Sehnendefekt"],
        ["Retraktion", "Abstand des Sehnenstumpfes vom Footprint - Einteilung nach Patte (Grad 1-3)"],
        ["Tangentenzeichen", "Humeruskopf überschreitet die Tangente zwischen Akromion und Korakoid - Hinweis auf eine massive Ruptur"],
        ["Muskelatrophie", "fettige Degeneration des Muskelbauchs - Klassifikation nach Goutallier (Grad 0-4)"],
        ["Humeruskopfhochstand", "verminderter akromiohumeraler Abstand (< 7 mm) bei chronischer Massenruptur"]
      ],
      "lightBulbTitle": "Klassifikation nach Patte",
      "lightBulbText": "Grad 1: Sehnenstumpf nahe am Footprint. Grad 2: Stumpf auf Höhe des Humeruskopfes. Grad 3: Stumpf auf Höhe des Glenoids - je höher der Grad, desto schwieriger die spannungsfreie Rekonstruktion.",
      "dwiTitle": "Goutallier-Klassifikation der Muskelatrophie",
      "dwiText": "Grad 0: keine Fettinfiltration. Grad 1: vereinzelte Fettstreifen. Grad 2: Fett < Muskel. Grad 3: Fett = Muskel. Grad 4: Fett > Muskel. Ab Grad 3-4 gilt eine Rekonstruktion meist als nicht mehr erfolgsversprechend.",
      "key": "Die Patte-Klassifikation (Retraktion) und die Goutallier-Klassifikation (Fettatrophie) sind entscheidend für die OP-Planung - eine hochgradige Atrophie limitiert die Erfolgsaussichten einer Rekonstruktion unabhängig vom Retraktionsgrad."
    },
    "begleit": {
      "title": "Begleitbefunde",
      "lead": "Rotatorenmanschettenpathologien treten häufig im Kontext weiterer Befunde an der Schulter auf, die mitbeurteilt werden müssen.",
      "tableHeaders": ["Befund", "Beschreibung"],
      "tableRows": [
        ["Subakromiales Impingement", "Einengung des Subakromialraums durch Akromionform (Bigliani-Typ), Osteophyten oder Bursaverdickung"],
        ["Bursitis subacromialis/subdeltoidea", "Flüssigkeitsansammlung oder Verdickung der Bursa, häufig begleitend bei bursaseitigen Partial- oder Komplettrupturen"],
        ["ACG-Arthrose", "kaudale Osteophyten können den Supraspinatus-Outlet einengen (Os acromiale beachten)"],
        ["Lange Bizepssehne (LBS)", "Pathologien der LBS-Sehne (Tendinopathie, Subluxation) häufig assoziiert mit Subscapularisrupturen"]
      ],
      "cave": "Eine Dislokation der langen Bizepssehne aus dem Sulcus bicipitalis ist ein indirektes Zeichen für eine begleitende Subscapularisruptur - die Subscapularissehne sollte gezielt in axialen Sequenzen untersucht werden.",
      "key": "Impingement, Bursitis, ACG-Arthrose und Bizepssehnenpathologien sind häufige Begleitbefunde, die das klinische Bild und die Therapieentscheidung mitbestimmen."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "Die wichtigsten Punkte für die Befundung.",
      "items": [
        { "title": "Anatomie", "text": "Vier Muskeln (SSP, ISP, TM, SSC) - die Supraspinatussehne ist in der Critical Zone am häufigsten betroffen." },
        { "title": "Protokoll", "text": "Mindestens zwei Ebenen mit fettunterdrückten, flüssigkeitssensitiven Sequenzen." },
        { "title": "Partialrupturen", "text": "Bursaseitig, gelenkseitig (PASTA) und intratendinös unterscheiden." },
        { "title": "Komplettrupturen", "text": "Retraktion nach Patte und Muskelatrophie nach Goutallier bestimmen die OP-Planung." }
      ]
    }
  },
  "en": {
    "toc": "Contents",
    "breadcrumbMsk": "Musculoskeletal",
    "breadcrumbCurrent": "Shoulder · Rotator Cuff",
    "title": "Rotator Cuff: Tendinopathy, Partial and Full-Thickness Tears",
    "subtitle": "Anatomy, MRI protocol, tear patterns and the Patte and Goutallier classifications for shoulder MRI",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "Flashcards",
    "keyLabel": "Key point",
    "caveLabel": "Caution",
    "sections": [
      { "id": "grundlagen", "label": "Anatomy & Basics", "icon": "🦴" },
      { "id": "mrt", "label": "MRI Technique", "icon": "🧲" },
      { "id": "partialruptur", "label": "Partial Tears", "icon": "🔍" },
      { "id": "komplettruptur", "label": "Full-Thickness Tears", "icon": "⚠️" },
      { "id": "begleit", "label": "Associated Findings", "icon": "🩹" },
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "Supraspinatus", "label": "most commonly affected tendon", "text": "especially in the \"critical zone\" near its insertion" },
      { "value": "PD/T2 fs", "label": "key sequences", "text": "fat-suppressed, fluid-sensitive, at least 2 planes" },
      { "value": "Patte / Goutallier", "label": "key classifications", "text": "tendon retraction and muscle atrophy" }
    ],
    "basics": {
      "title": "Anatomy & basics",
      "lead": "The rotator cuff consists of four musculotendinous units that envelop the humeral head, providing stability and movement of the glenohumeral joint.",
      "items": [
        { "title": "The four muscles", "text": "Supraspinatus (abduction, superior stabiliser), infraspinatus and teres minor (external rotation), subscapularis (internal rotation)." },
        { "title": "Critical zone", "text": "Hypovascular zone of the supraspinatus tendon about 1-2 cm proximal to its insertion on the greater tuberosity - a predilection site for degeneration and tears." },
        { "title": "Force couples", "text": "Subscapularis/infraspinatus stabilise the humeral head in the transverse plane, deltoid/supraspinatus in the coronal plane - imbalance leads to decentring of the humeral head." }
      ],
      "key": "The supraspinatus tendon is by far the most frequently affected, particularly in the hypovascular critical zone just proximal to its insertion on the greater tuberosity."
    },
    "mri": {
      "title": "MRI technique & normal findings",
      "lead": "MRI is the method of choice for assessing the rotator cuff. A standardised protocol with fat-suppressed, fluid-sensitive sequences in at least two planes is essential.",
      "tableHeaders": ["Sequence", "Plane", "Value"],
      "tableRows": [
        ["PD/T2 fs", "oblique coronal", "gold standard for detecting tears and tendinopathy"],
        ["T1/PD", "axial", "subscapularis tendon, biceps tendon, muscle volume"],
        ["T2 fs", "oblique sagittal (Y-view)", "muscle atrophy (Goutallier), tangent sign"],
        ["PD/T1", "all planes", "bone marrow oedema, AC joint, labrum"]
      ],
      "lightBulbTitle": "Normal appearance of the supraspinatus tendon",
      "lightBulbText": "A healthy tendon shows homogeneously low signal intensity on all sequences. Intratendinous signal elevation on PD/T1 without a T2 correlate usually represents tendinopathy.",
      "dwiTitle": "Magic-angle phenomenon",
      "dwiText": "When a tendon runs at an angle of about 55° to the main magnetic field (often near the insertion), short-TE sequences (T1, PD) can show an artefactual signal increase that disappears on T2-weighted sequences - not a true pathology.",
      "key": "At least two planes with fat-suppressed, fluid-sensitive sequences are needed to reliably distinguish a tear from tendinopathy or a magic-angle artefact."
    },
    "partial": {
      "title": "Partial tears & tendinopathy",
      "lead": "Partial tears are classified according to their location within the tendon. This distinction is crucial for treatment decisions and prognosis.",
      "tableHeaders": ["Type", "Location", "MRI finding"],
      "tableRows": [
        ["Bursal-sided", "superficial (bursal) fibres", "focal fluid rim between the tendon and subacromial bursa on T2 fs"],
        ["Articular-sided (PASTA)", "deep (articular) fibres at the footprint", "Partial Articular Surface Tendon Avulsion - focal defect at the footprint, often associated with impingement"],
        ["Intratendinous", "within the tendon, no surface contact", "linear/focal T2-hyperintense signal without contact to the bursa or joint"],
        ["Tendinopathy", "diffuse degeneration", "intratendinous signal elevation on PD/T1, no clear T2 fluid signal, possible tendon thickening"]
      ],
      "irisTitle": "When is repair indicated? - footprint involvement",
      "irisText": "For PASTA lesions, the extent of footprint involvement (as a percentage of tendon width/thickness) is decisive: >50% often prompts surgical refixation, <50% is often managed conservatively or with debridement.",
      "key": "Bursal-sided, articular-sided (PASTA) and intratendinous partial tears differ by their location relative to the bursa and joint space - all three show focal T2-hyperintense signal."
    },
    "full": {
      "title": "Full-thickness tears & retraction",
      "lead": "A full-thickness tear traverses the entire thickness of the tendon, creating direct communication between the glenohumeral joint and the subacromial bursa.",
      "tableHeaders": ["Feature", "MRI finding"],
      "tableRows": [
        ["Discontinuity", "complete T2-hyperintense interruption of the tendon with fluid in the tendon gap"],
        ["Retraction", "distance of the tendon stump from the footprint - graded according to Patte (grade 1-3)"],
        ["Tangent sign", "humeral head crosses the tangent line between acromion and coracoid - sign of a massive tear"],
        ["Muscle atrophy", "fatty degeneration of the muscle belly - graded according to Goutallier (grade 0-4)"],
        ["Superior migration of the humeral head", "decreased acromiohumeral distance (<7 mm) in chronic massive tears"]
      ],
      "lightBulbTitle": "Patte classification",
      "lightBulbText": "Grade 1: tendon stump close to the footprint. Grade 2: stump at the level of the humeral head. Grade 3: stump at the level of the glenoid - the higher the grade, the more difficult a tension-free repair becomes.",
      "dwiTitle": "Goutallier classification of muscle atrophy",
      "dwiText": "Grade 0: no fatty infiltration. Grade 1: scattered fatty streaks. Grade 2: fat < muscle. Grade 3: fat = muscle. Grade 4: fat > muscle. From grade 3-4 onwards, repair is generally considered unlikely to succeed.",
      "key": "The Patte classification (retraction) and the Goutallier classification (fatty atrophy) are decisive for surgical planning - significant atrophy limits the chance of a successful repair regardless of the degree of retraction."
    },
    "begleit": {
      "title": "Associated findings",
      "lead": "Rotator cuff pathology frequently occurs alongside other shoulder findings that must be assessed together.",
      "tableHeaders": ["Finding", "Description"],
      "tableRows": [
        ["Subacromial impingement", "narrowing of the subacromial space due to acromion shape (Bigliani type), osteophytes or bursal thickening"],
        ["Subacromial/subdeltoid bursitis", "fluid accumulation or thickening of the bursa, often accompanying bursal-sided partial or full-thickness tears"],
        ["AC joint osteoarthritis", "inferior osteophytes can narrow the supraspinatus outlet (consider os acromiale)"],
        ["Long head of biceps (LHB)", "LHB tendon pathology (tendinopathy, subluxation) frequently associated with subscapularis tears"]
      ],
      "cave": "Dislocation of the LHB tendon from the bicipital groove is an indirect sign of an associated subscapularis tear - the subscapularis tendon should be specifically assessed on axial sequences.",
      "key": "Impingement, bursitis, AC joint osteoarthritis and LHB pathology are common associated findings that influence the clinical picture and treatment decision."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "The most important points for reporting.",
      "items": [
        { "title": "Anatomy", "text": "Four muscles (SSP, ISP, TM, SSC) - the supraspinatus tendon in the critical zone is most commonly affected." },
        { "title": "Protocol", "text": "At least two planes with fat-suppressed, fluid-sensitive sequences." },
        { "title": "Partial tears", "text": "Distinguish bursal-sided, articular-sided (PASTA) and intratendinous." },
        { "title": "Full-thickness tears", "text": "Retraction (Patte) and muscle atrophy (Goutallier) determine surgical planning." }
      ]
    }
  },
  "fa": {
    "toc": "فهرست مطالب",
    "breadcrumbMsk": "اسکلتی-عضلانی",
    "breadcrumbCurrent": "شانه · روتاتور کاف",
    "title": "روتاتور کاف: تاندینوپاتی، پارگی‌های جزئی و کامل",
    "subtitle": "آناتومی، پروتکل MRI، الگوهای پارگی و طبقه‌بندی‌های Patte و Goutallier در MRI شانه",
    "sourceLabel": "Dr. Zia",
    "actionMcq": "MCQ",
    "actionFlash": "فلش‌کارت",
    "keyLabel": "نکته مهم",
    "caveLabel": "احتیاط",
    "sections": [
      { "id": "grundlagen", "label": "آناتومی و مبانی", "icon": "🦴" },
      { "id": "mrt", "label": "تکنیک MRI", "icon": "🧲" },
      { "id": "partialruptur", "label": "پارگی‌های جزئی", "icon": "🔍" },
      { "id": "komplettruptur", "label": "پارگی‌های کامل", "icon": "⚠️" },
      { "id": "begleit", "label": "یافته‌های همراه", "icon": "🩹" },
      { "id": "takehome", "label": "Take home", "icon": "☾" }
    ],
    "heroCards": [
      { "value": "سوپراسپیناتوس", "label": "شایع‌ترین تاندون درگیر", "text": "به‌ویژه در «Critical Zone» نزدیک محل اتصال" },
      { "value": "PD/T2 fs", "label": "سکانس‌های کلیدی", "text": "فت‌ساپرس، حساس به مایع، حداقل ۲ پلان" },
      { "value": "Patte / Goutallier", "label": "مهم‌ترین طبقه‌بندی‌ها", "text": "درجه رتراکشن و آتروفی عضلانی" }
    ],
    "basics": {
      "title": "آناتومی و مبانی",
      "lead": "روتاتور کاف از چهار واحد عضله-تاندون تشکیل شده که سر هومروس را احاطه کرده و ثبات و حرکت مفصل گلنوهومرال را تأمین می‌کنند.",
      "items": [
        { "title": "چهار عضله", "text": "سوپراسپیناتوس (ابداکسیون، تثبیت‌کننده فوقانی)، اینفراسپیناتوس و ترس مینور (چرخش خارجی)، ساب‌اسکاپولاریس (چرخش داخلی)." },
        { "title": "Critical Zone", "text": "ناحیه هیپوواسکولار تاندون سوپراسپیناتوس حدود ۱ تا ۲ سانتی‌متر قبل از محل اتصال به توبرکل بزرگ - محل شایع دژنراسیون و پارگی." },
        { "title": "کوپل‌های نیرویی", "text": "ساب‌اسکاپولاریس/اینفراسپیناتوس سر هومروس را در صفحه ترانسورس و دلتوئید/سوپراسپیناتوس در صفحه کرونال تثبیت می‌کنند - عدم تعادل منجر به جابه‌جایی سر هومروس می‌شود." }
      ],
      "key": "تاندون سوپراسپیناتوس به‌طور قابل توجهی شایع‌ترین تاندون درگیر است، به‌ویژه در Critical Zone هیپوواسکولار درست قبل از محل اتصال آن به توبرکل بزرگ."
    },
    "mri": {
      "title": "تکنیک MRI و یافته‌های طبیعی",
      "lead": "MRI روش انتخابی برای ارزیابی روتاتور کاف است. یک پروتکل استاندارد با سکانس‌های فت‌ساپرس و حساس به مایع در حداقل دو پلان ضروری است.",
      "tableHeaders": ["سکانس", "پلان", "ارزش تشخیصی"],
      "tableRows": [
        ["PD/T2 fs", "کرونال مایل", "استاندارد طلایی برای تشخیص پارگی و تاندینوپاتی"],
        ["T1/PD", "آگزیال", "تاندون ساب‌اسکاپولاریس، تاندون بایسپس، حجم عضله"],
        ["T2 fs", "ساژیتال مایل (Y-view)", "آتروفی عضلانی (Goutallier)، Tangent sign"],
        ["PD/T1", "همه پلان‌ها", "ادم مغز استخوان، مفصل ACG، لابروم"]
      ],
      "lightBulbTitle": "یافته طبیعی تاندون سوپراسپیناتوس",
      "lightBulbText": "تاندون سالم سیگنال یکنواخت و پایین در همه سکانس‌ها دارد. افزایش سیگنال داخل تاندونی در PD/T1 بدون معادل در T2 معمولاً به معنای تاندینوپاتی است.",
      "dwiTitle": "پدیده Magic Angle",
      "dwiText": "وقتی تاندون با زاویه حدود ۵۵ درجه نسبت به میدان مغناطیسی اصلی قرار گیرد (اغلب نزدیک محل اتصال)، سکانس‌های TE کوتاه (T1، PD) ممکن است افزایش سیگنال کاذب نشان دهند که در سکانس‌های T2 ناپدید می‌شود - یک پاتولوژی واقعی نیست.",
      "key": "حداقل دو پلان با سکانس‌های فت‌ساپرس و حساس به مایع برای افتراق مطمئن پارگی از تاندینوپاتی یا آرتیفکت Magic Angle لازم است."
    },
    "partial": {
      "title": "پارگی‌های جزئی و تاندینوپاتی",
      "lead": "پارگی‌های جزئی بر اساس محل آن‌ها در داخل تاندون طبقه‌بندی می‌شوند. این تفاوت برای تصمیم درمانی و پیش‌آگهی حیاتی است.",
      "tableHeaders": ["نوع", "محل", "یافته MRI"],
      "tableRows": [
        ["سمت بورسال", "فیبرهای سطحی (بورسال)", "حاشیه کانونی مایع بین تاندون و بورس ساب‌آکرومیال در T2 fs"],
        ["سمت مفصلی (PASTA)", "فیبرهای عمقی (مفصلی) در Footprint", "Partial Articular Surface Tendon Avulsion - نقص کانونی در Footprint، اغلب همراه با ایمپینجمنت"],
        ["داخل تاندونی", "درون تاندون، بدون تماس با سطح", "سیگنال خطی/کانونی هیپراینتنس T2 بدون تماس با بورس یا مفصل"],
        ["تاندینوپاتی", "دژنراسیون منتشر", "افزایش سیگنال داخل تاندونی در PD/T1، بدون سیگنال مایع واضح در T2، احتمال ضخیم‌شدن تاندون"]
      ],
      "irisTitle": "ترمیم جراحی چه زمانی مناسب است؟ - میزان درگیری Footprint",
      "irisText": "در ضایعات PASTA، میزان درگیری Footprint (به درصد عرض/عمق تاندون) تعیین‌کننده است: در درگیری > ۵۰٪ معمولاً ترمیم جراحی در نظر گرفته می‌شود، در < ۵۰٪ اغلب درمان محافظه‌کارانه یا دبریدمان انجام می‌شود.",
      "key": "پارگی‌های سمت بورسال، سمت مفصلی (PASTA) و داخل تاندونی بر اساس محل خود نسبت به بورس و فضای مفصلی متفاوت‌اند - هر سه با سیگنال کانونی هیپراینتنس T2 مشخص می‌شوند."
    },
    "full": {
      "title": "پارگی‌های کامل و رتراکشن",
      "lead": "پارگی کامل تمام ضخامت تاندون را قطع می‌کند و ارتباط مستقیمی بین مفصل گلنوهومرال و بورس ساب‌آکرومیال ایجاد می‌کند.",
      "tableHeaders": ["ویژگی", "یافته MRI"],
      "tableRows": [
        ["عدم تداوم", "قطع کامل و هیپراینتنس در T2 با مایع در محل نقص تاندون"],
        ["رتراکشن", "فاصله انتهای تاندون از Footprint - طبقه‌بندی Patte (درجه ۱ تا ۳)"],
        ["Tangent sign", "سر هومروس از خط فرضی بین آکرومیون و کوراکوئید عبور می‌کند - نشانه پارگی وسیع"],
        ["آتروفی عضلانی", "دژنراسیون چربی شکم عضله - طبقه‌بندی Goutallier (درجه ۰ تا ۴)"],
        ["بالا رفتن سر هومروس", "کاهش فاصله آکرومیوهومرال (< ۷ میلی‌متر) در پارگی‌های وسیع مزمن"]
      ],
      "lightBulbTitle": "طبقه‌بندی Patte",
      "lightBulbText": "درجه ۱: انتهای تاندون نزدیک Footprint. درجه ۲: انتها در سطح سر هومروس. درجه ۳: انتها در سطح گلنوئید - هرچه درجه بالاتر، ترمیم بدون کشش دشوارتر می‌شود.",
      "dwiTitle": "طبقه‌بندی Goutallier برای آتروفی عضلانی",
      "dwiText": "درجه ۰: بدون نفوذ چربی. درجه ۱: رگه‌های پراکنده چربی. درجه ۲: چربی < عضله. درجه ۳: چربی = عضله. درجه ۴: چربی > عضله. از درجه ۳ تا ۴ به بعد، ترمیم معمولاً کم‌احتمال در نظر گرفته می‌شود.",
      "key": "طبقه‌بندی Patte (رتراکشن) و طبقه‌بندی Goutallier (آتروفی چربی) برای برنامه‌ریزی جراحی تعیین‌کننده‌اند - آتروفی شدید شانس ترمیم موفق را مستقل از درجه رتراکشن محدود می‌کند."
    },
    "begleit": {
      "title": "یافته‌های همراه",
      "lead": "پاتولوژی روتاتور کاف اغلب همراه با سایر یافته‌های شانه دیده می‌شود که باید هم‌زمان ارزیابی شوند.",
      "tableHeaders": ["یافته", "توضیح"],
      "tableRows": [
        ["ایمپینجمنت ساب‌آکرومیال", "تنگی فضای ساب‌آکرومیال به دلیل شکل آکرومیون (تیپ Bigliani)، استئوفیت یا ضخیم‌شدن بورس"],
        ["بورسیت ساب‌آکرومیال/ساب‌دلتوئید", "تجمع مایع یا ضخیم‌شدن بورس، اغلب همراه پارگی‌های جزئی یا کامل سمت بورسال"],
        ["آرتروز مفصل ACG", "استئوفیت‌های تحتانی می‌توانند Outlet سوپراسپیناتوس را تنگ کنند (توجه به Os acromiale)"],
        ["تاندون سر بلند بایسپس (LHB)", "پاتولوژی تاندون LHB (تاندینوپاتی، ساب‌لوکساسیون) اغلب همراه با پارگی ساب‌اسکاپولاریس است"]
      ],
      "cave": "دیسلوکیشن تاندون سر بلند بایسپس از Sulcus bicipitalis نشانه غیرمستقیم پارگی همراه ساب‌اسکاپولاریس است - تاندون ساب‌اسکاپولاریس باید به‌طور هدفمند در سکانس‌های آگزیال بررسی شود.",
      "key": "ایمپینجمنت، بورسیت، آرتروز ACG و پاتولوژی تاندون بایسپس یافته‌های همراه شایعی هستند که بر تصویر بالینی و تصمیم درمانی اثر می‌گذارند."
    },
    "takehome": {
      "title": "Take home message",
      "lead": "مهم‌ترین نکات برای گزارش‌نویسی.",
      "items": [
        { "title": "آناتومی", "text": "چهار عضله (SSP, ISP, TM, SSC) - تاندون سوپراسپیناتوس در Critical Zone شایع‌ترین محل درگیری است." },
        { "title": "پروتکل", "text": "حداقل دو پلان با سکانس‌های فت‌ساپرس و حساس به مایع." },
        { "title": "پارگی‌های جزئی", "text": "افتراق سمت بورسال، سمت مفصلی (PASTA) و داخل تاندونی." },
        { "title": "پارگی‌های کامل", "text": "رتراکشن (Patte) و آتروفی عضلانی (Goutallier) برنامه‌ریزی جراحی را تعیین می‌کنند." }
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

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
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
  const { isRead, toggleRead, authError } = useLessonReadStatus('rotatorenmanschette')
  const withLang = (href) => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
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
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
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
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => scrollTo(section.id)}
            >
              <span>{section.icon}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
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

          <Section id="mrt" title={copy.mri.title} lead={copy.mri.lead}>
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

          <Section id="partialruptur" title={copy.partial.title} lead={copy.partial.lead}>
            <Table headers={copy.partial.tableHeaders} rows={copy.partial.tableRows} />
            <div className={styles.highlightBox}>
              <h3>{copy.partial.irisTitle}</h3>
              <p>{copy.partial.irisText}</p>
            </div>
            <Callout label={copy.keyLabel}>{copy.partial.key}</Callout>
          </Section>

          <Section id="komplettruptur" title={copy.full.title} lead={copy.full.lead}>
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
          </Section>

          <Section id="begleit" title={copy.begleit.title} lead={copy.begleit.lead}>
            <Table headers={copy.begleit.tableHeaders} rows={copy.begleit.tableRows} />
            <Callout type="cave" label={copy.caveLabel}>{copy.begleit.cave}</Callout>
            <Callout label={copy.keyLabel}>{copy.begleit.key}</Callout>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
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
  )
}
